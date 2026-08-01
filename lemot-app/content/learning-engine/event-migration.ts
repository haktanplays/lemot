/**
 * Learning-event v1 → v2 migration (PR-02) — pure, deterministic, YASA 1.
 *
 * The FIRST real learning-event schema migration. It rides the migration rails
 * in ./migrations.ts through a DEDICATED registry rather than the shipped
 * `defaultMigrationRegistry`: that registry is shared by every persisted
 * structure (compaction snapshot, telemetry log), so registering an event step
 * there would tell those structures they are one version behind. Event-log
 * versioning is scoped to the event log.
 *
 * Granularity is PER EVENT: the log is a JSON array, and each event object
 * carries its own `schemaVersion`. Absent ⇒ v1 (ADR-0014 / K1), and stored data
 * is never rewritten just to stamp the field — the first legitimate append
 * persists the normalized array.
 *
 * Conservative over confident: anything v1 could not know becomes an explicit
 * `legacy_unknown` / `unresolved` state. The migration never fabricates an EV id,
 * a sentence identity, a placement, a treatment, or a Supported claim, and it
 * never touches the frozen error tags or any shipped item id.
 *
 * Hard boundaries: no clock, no storage, no network, no React. Input is never
 * mutated.
 */
import type {
  CurriculumTreatment,
  ErrorTagCode,
  EvidenceClass,
  LearningEvent,
  LearningEventPrimitive,
} from "./events";
import { LEARNING_EVENT_SCHEMA_VERSION } from "./events";
import {
  createLearningEvent,
  outcomeForResult,
  validateLearningEvent,
} from "./event-envelope";
import { createMigrationRegistry, readSchemaVersion } from "./migrations";
import type { OperationId } from "./types";

/** Operations whose v1 events represent the learner assembling or selecting an answer. */
const SELECTION_OPS: ReadonlySet<OperationId> = new Set<OperationId>([
  "build",
  "recognition",
]);

/**
 * The exact signature `LearningSessionController.recordRecognitionReveal` wrote
 * before PR-02: a `recognition` operation with no learner answer, no normalized
 * answer, and a fabricated `result: "correct"`. Narrow on purpose — a genuine
 * graded recognition attempt always carried the learner's answer.
 */
export function isLegacyRevealEvent(v1: Record<string, unknown>): boolean {
  return (
    v1.operation === "recognition" &&
    v1.userAnswer === null &&
    v1.normalizedAnswer === null &&
    v1.result === "correct"
  );
}

/** Conservative primitive for a v1 event. Never guesses beyond the operation. */
function primitiveForV1(v1: Record<string, unknown>): LearningEventPrimitive {
  if (isLegacyRevealEvent(v1)) return "reveal";
  const op = v1.operation as OperationId;
  return SELECTION_OPS.has(op) ? "selection" : "production";
}

/**
 * Conservative evidence classification. v1 cannot distinguish supported from
 * independent production and recorded no assistance, so the migration NEVER
 * claims `supported_production`; it records what the v1 reducer already treated
 * the event as, and PR-03/PR-04 refine live events going forward.
 */
function evidenceForV1(primitive: LearningEventPrimitive): EvidenceClass {
  switch (primitive) {
    case "reveal":
      return "comparison_only";
    case "selection":
      return "recognition";
    default:
      return "controlled_production";
  }
}

const isStringOrNull = (v: unknown): v is string | null =>
  v === null || typeof v === "string";

/** Structural check that a raw object is a plausible v1 event before converting. */
export function isPlausibleV1Event(data: unknown): data is Record<string, unknown> {
  if (!data || typeof data !== "object" || Array.isArray(data)) return false;
  const e = data as Record<string, unknown>;
  return (
    typeof e.clientEventId === "string" &&
    e.clientEventId.length > 0 &&
    typeof e.sessionId === "string" &&
    typeof e.lessonId === "string" &&
    typeof e.exerciseId === "string" &&
    typeof e.operation === "string" &&
    Array.isArray(e.itemIds) &&
    typeof e.promptLevel === "string" &&
    typeof e.attemptNumber === "number" &&
    typeof e.result === "string" &&
    Array.isArray(e.errorTags) &&
    typeof e.timestamp === "number" &&
    isStringOrNull(e.userAnswer) &&
    isStringOrNull(e.expectedAnswer) &&
    isStringOrNull(e.normalizedAnswer) &&
    !!e.sync &&
    typeof e.sync === "object"
  );
}

/**
 * Convert one validated v1 event object to a v2 `LearningEvent`.
 *
 * Preserved byte-for-byte: `clientEventId`, `timestamp`, session/lesson/exercise,
 * operation, item ids, all three answer fields, sync metadata, and — for assessed
 * events — `result` and `errorTags`.
 *
 * A legacy reveal is reclassified as a NON-assessed reveal (its `result:
 * "correct"` was fabricated, never earned). To destroy nothing, the original
 * grading is preserved verbatim under `legacyGrading`; the mastery reducer never
 * reads it. This deliberately changes historical mastery for those events — that
 * is the point of the correction, and it is recorded rather than hidden.
 */
export function migrateV1EventToV2(v1: Record<string, unknown>): LearningEvent {
  const primitive = primitiveForV1(v1);
  const itemIds = [...(v1.itemIds as LearningEvent["itemIds"])];
  const targetTreatments: CurriculumTreatment[] = itemIds.map(() => "legacy_unknown");
  const evidenceClass = evidenceForV1(primitive);

  const shared = {
    clientEventId: v1.clientEventId as string,
    sessionId: v1.sessionId as string,
    lessonId: v1.lessonId as string,
    exerciseId: v1.exerciseId as string,
    operation: v1.operation as OperationId,
    itemIds,
    promptLevel: v1.promptLevel as LearningEvent["promptLevel"],
    attemptNumber: v1.attemptNumber as number,
    timestamp: v1.timestamp as number,
    contentVersion: (v1.contentVersion as string) ?? "legacy-unknown",
    appBuild: (v1.appBuild as string) ?? "legacy-unknown",
    deviceInfo: v1.deviceInfo as LearningEvent["deviceInfo"],
    sync: v1.sync as LearningEvent["sync"],
    primitive,
    // v1 never recorded these facts. They must stay unknown, not be invented.
    placement: "legacy_unknown" as const,
    evId: null,
    payloadId: (v1.exerciseId as string) ?? null,
    sentenceId: null,
    targetTreatments,
    evidenceCeiling: evidenceClass,
    evidenceClass,
    userAnswer: v1.userAnswer as string | null,
    expectedAnswer: v1.expectedAnswer as string | null,
    sequence: null,
    assistance: "not_captured" as const,
    attribution: "unresolved" as const,
    // The v1 reducer already scored assessed events; preserve that fact rather
    // than silently re-opening admissibility for history.
    admissibility: "legacy_admitted" as const,
  };

  if (primitive === "reveal") {
    return createLearningEvent({
      ...shared,
      assessed: false,
      outcome: "completed_unassessed",
      legacyGrading: {
        result: v1.result as ErrorTagCode,
        errorTags: [...(v1.errorTags as ErrorTagCode[])],
      },
    });
  }

  const result = v1.result as ErrorTagCode;
  return createLearningEvent({
    ...shared,
    assessed: true,
    normalizedAnswer: v1.normalizedAnswer as string | null,
    result,
    errorTags: [...(v1.errorTags as ErrorTagCode[])],
    outcome: outcomeForResult(result),
  });
}

/**
 * Event-log migration registry — one v1 → v2 step, scoped to learning events so
 * the shipped `defaultMigrationRegistry` stays empty for other structures.
 */
export const eventMigrationRegistry = createMigrationRegistry();

eventMigrationRegistry.registerMigration(1, 2, (data) => {
  if (!isPlausibleV1Event(data)) {
    throw new Error(
      "event migration v1 -> v2: input is not a plausible v1 learning event",
    );
  }
  return migrateV1EventToV2(data) as unknown as Record<string, unknown>;
});

export type EventMigrationResult =
  | { status: "ok"; event: LearningEvent; migrated: boolean }
  | { status: "unsupported"; reason: string; schemaVersion: number | null };

/**
 * Bring one persisted event object to v2.
 *
 * - absent `schemaVersion` ⇒ v1 ⇒ migrated;
 * - `schemaVersion: 2` ⇒ returned as-is after validation (never re-migrated);
 * - a newer version ⇒ `unsupported`, original untouched (fail-closed, YASA 1);
 * - malformed ⇒ `unsupported`; never partially accepted.
 */
export function migrateEventToCurrent(data: unknown): EventMigrationResult {
  const version = readSchemaVersion(data);
  if (version === null) {
    return {
      status: "unsupported",
      reason: "event is not an object or carries an unreadable schemaVersion",
      schemaVersion: null,
    };
  }
  if (version > LEARNING_EVENT_SCHEMA_VERSION) {
    return {
      status: "unsupported",
      reason: `event schemaVersion ${version} is newer than the supported version ${LEARNING_EVENT_SCHEMA_VERSION}`,
      schemaVersion: version,
    };
  }

  if (version === LEARNING_EVENT_SCHEMA_VERSION) {
    // Already current — but "current version" is a claim the data makes about
    // itself, not a guarantee. Persisted JSON has no types, so a blind
    // `as LearningEvent` cast would let a malformed v2 event (unknown enum,
    // smuggled grading fields on a non-assessed event, misaligned treatments,
    // broken sequence) enter the log and be treated as supported. Validate it
    // with the SAME runtime boundary newly constructed events pass through.
    //
    // A failing event is reported `unsupported` and left byte-for-byte alone:
    // never silently repaired, and never migrated into some other v2 shape.
    const issues = validateLearningEvent(data);
    if (issues.length > 0) {
      return {
        status: "unsupported",
        reason: `malformed v2 event: ${issues.join("; ")}`,
        schemaVersion: version,
      };
    }
    return { status: "ok", event: data as LearningEvent, migrated: false };
  }

  if (!isPlausibleV1Event(data)) {
    return {
      status: "unsupported",
      reason: "malformed v1 event (missing or wrongly typed required fields)",
      schemaVersion: version,
    };
  }

  try {
    return { status: "ok", event: migrateV1EventToV2(data), migrated: true };
  } catch (e) {
    return {
      status: "unsupported",
      reason: `event migration failed: ${(e as Error).message}`,
      schemaVersion: version,
    };
  }
}

export type EventLogMigrationResult =
  | { status: "ok"; events: LearningEvent[]; migratedAny: boolean }
  | { status: "unsupported"; reason: string; index: number };

/**
 * Bring a whole persisted event array to v2, deterministically.
 *
 * Mixed v1/v2 logs are handled event by event, in append order. A single
 * unsupported or malformed event makes the WHOLE log unsupported (fail-closed):
 * silently dropping one event would corrupt an append-only history that mastery
 * is derived from, and the corruption policy for this log is preserve-and-refuse,
 * never partial acceptance.
 */
export function migrateEventLogToCurrent(raw: unknown): EventLogMigrationResult {
  if (!Array.isArray(raw)) {
    return { status: "unsupported", reason: "event log is not an array", index: -1 };
  }
  const events: LearningEvent[] = [];
  let migratedAny = false;
  for (let i = 0; i < raw.length; i += 1) {
    const res = migrateEventToCurrent(raw[i]);
    if (res.status === "unsupported") {
      return { status: "unsupported", reason: res.reason, index: i };
    }
    if (res.migrated) migratedAny = true;
    events.push(res.event);
  }
  return { status: "ok", events, migratedAny };
}
