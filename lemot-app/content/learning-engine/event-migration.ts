/**
 * Learning-event schema migration chain v1 → v2 → v3 — pure, deterministic, YASA 1.
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
  createMigratedLearningEvent,
  outcomeForResult,
  validateLearningEvent,
} from "./event-envelope";
import { clampToCeiling } from "./evidence-admission";
import { LEGACY_UNKNOWN_ASSISTANCE } from "./evidence-context";
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
 * Convert one validated v1 event object into a plain **v2-shaped** record.
 *
 * Deliberately NOT built through `createLearningEvent`: that constructor now
 * produces v3, and a v1 → v3 shortcut would skip the v2 rung of the chain. The
 * rails are sequential (v1 → v2 → v3) so each step stays independently
 * inspectable and testable.
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
export function migrateV1EventToV2(v1: Record<string, unknown>): Record<string, unknown> {
  const primitive = primitiveForV1(v1);
  const itemIds = [...(v1.itemIds as string[])];
  const targetTreatments: CurriculumTreatment[] = itemIds.map(() => "legacy_unknown");
  const evidenceClass = evidenceForV1(primitive);

  const shared: Record<string, unknown> = {
    schemaVersion: 2,
    clientEventId: v1.clientEventId,
    sessionId: v1.sessionId,
    lessonId: v1.lessonId,
    exerciseId: v1.exerciseId,
    operation: v1.operation,
    itemIds,
    promptLevel: v1.promptLevel,
    attemptNumber: v1.attemptNumber,
    timestamp: v1.timestamp,
    contentVersion: (v1.contentVersion as string) ?? "legacy-unknown",
    appBuild: (v1.appBuild as string) ?? "legacy-unknown",
    deviceInfo: v1.deviceInfo,
    sync: v1.sync,
    primitive,
    // v1 never recorded these facts. They must stay unknown, not be invented.
    placement: "legacy_unknown",
    evId: null,
    payloadId: (v1.exerciseId as string) ?? null,
    sentenceId: null,
    targetTreatments,
    evidenceCeiling: evidenceClass,
    evidenceClass,
    userAnswer: v1.userAnswer,
    expectedAnswer: v1.expectedAnswer,
    sequence: null,
    // The v2 scalar seams. v3 replaces them with structured state below.
    assistance: "not_captured",
    attribution: "unresolved",
    admissibility: "legacy_admitted",
  };

  if (primitive === "reveal") {
    return {
      ...shared,
      assessed: false,
      outcome: "completed_unassessed",
      legacyGrading: {
        result: v1.result,
        errorTags: [...(v1.errorTags as ErrorTagCode[])],
      },
    };
  }

  return {
    ...shared,
    assessed: true,
    normalizedAnswer: v1.normalizedAnswer,
    result: v1.result,
    errorTags: [...(v1.errorTags as ErrorTagCode[])],
    outcome: outcomeForResult(v1.result as ErrorTagCode),
  };
}

/**
 * Version-specific v2 structural validation.
 *
 * The v3 validator must NOT be used to check v2 data: the two shapes disagree on
 * exactly the fields this PR restructured, so running the v3 rules over a v2
 * record would either reject valid history or (worse) accept it by accident.
 * This check proves a record is genuinely valid v2 before the v2 → v3 step runs.
 */
export function isValidV2Event(data: unknown): data is Record<string, unknown> {
  if (!data || typeof data !== "object" || Array.isArray(data)) return false;
  const e = data as Record<string, unknown>;
  if (e.schemaVersion !== 2) return false;
  if (typeof e.clientEventId !== "string" || e.clientEventId.length === 0) return false;
  for (const field of ["sessionId", "lessonId", "exerciseId", "operation", "promptLevel"]) {
    if (typeof e[field] !== "string") return false;
  }
  if (typeof e.primitive !== "string" || !V2_PRIMITIVES.has(e.primitive)) return false;
  if (typeof e.placement !== "string") return false;
  if (typeof e.evidenceClass !== "string" || !V2_EVIDENCE.has(e.evidenceClass)) return false;
  if (typeof e.evidenceCeiling !== "string" || !V2_EVIDENCE.has(e.evidenceCeiling)) return false;
  if (typeof e.outcome !== "string") return false;
  if (!Array.isArray(e.itemIds) || !e.itemIds.every((i) => typeof i === "string")) return false;
  if (!Array.isArray(e.targetTreatments)) return false;
  if (e.targetTreatments.length !== e.itemIds.length) return false;
  if (!Number.isInteger(e.attemptNumber) || (e.attemptNumber as number) < 1) return false;
  if (!Number.isFinite(e.timestamp)) return false;
  if (!e.deviceInfo || typeof e.deviceInfo !== "object") return false;
  if (!e.sync || typeof e.sync !== "object") return false;
  // v2's scalar seams — their exact values are the signature of the v2 shape.
  if (e.assistance !== "not_captured") return false;
  if (e.attribution !== "unresolved") return false;
  if (e.admissibility !== "unresolved" && e.admissibility !== "legacy_admitted") return false;
  if (e.assessed === true) {
    return (
      typeof e.result === "string" &&
      Array.isArray(e.errorTags) &&
      e.errorTags.length > 0 &&
      e.legacyGrading === undefined
    );
  }
  if (e.assessed === false) {
    return e.result === undefined && e.errorTags === undefined;
  }
  return false;
}

const V2_PRIMITIVES: ReadonlySet<string> = new Set([
  "exposure",
  "selection",
  "production",
  "self_report",
  "reveal",
  "issue_report",
]);
const V2_EVIDENCE: ReadonlySet<string> = new Set([
  "exposure",
  "audio_exposure",
  "recognition",
  "recall",
  "controlled_production",
  "supported_production",
  "open_production_attempt",
  "comparison_only",
  "self_correction",
  "self_report",
  "no_mastery_evidence",
]);

/**
 * How this record entered the migration — the version it was actually PERSISTED
 * as, not the rung it happens to be on right now.
 *
 * Passed explicitly rather than read off the record, because after the v1 → v2
 * step a converted record declares `schemaVersion: 2` and is indistinguishable
 * from history that was genuinely written as v2. Inferring origin from content
 * (`placement: "legacy_unknown"`, `contentVersion: "legacy-unknown"`, …) would be
 * a guess, and adding a provenance field to the intermediate v2 shape would
 * invent a persisted field that never existed.
 */
export type EventSourceVersion = 1 | 2;

/**
 * v2 → v3: replace the scalar seams with structured attempt-level state.
 *
 * Conservative by construction. v2 recorded NO assistance, so:
 *  - assistance becomes `legacy_unknown` — never a fabricated "known" snapshot;
 *  - a production observation is capped to `supported_production`, because
 *    unknown assistance can never establish independent production (FQ-3);
 *  - recognition stays recognition — assistance rules must not reclassify it;
 *  - prior historical admission is preserved as `legacy_admitted`, carrying the
 *    ORIGINAL `sourceVersion` so v1 history stays distinguishable from v2
 *    history; either way it keeps counting exactly as it did rather than being
 *    re-opened or silently discarded;
 *  - non-assessed events become `not_applicable` / `no_evidence`.
 *
 * Nothing is fabricated: no EV id, no sentence identity, no item treatment.
 */
export function migrateV2EventToV3(
  v2: Record<string, unknown>,
  sourceVersion: EventSourceVersion,
): LearningEvent {
  const assessed = v2.assessed === true;
  const ceiling = v2.evidenceCeiling as EvidenceClass;
  const observed = v2.evidenceClass as EvidenceClass;

  // Unknown assistance can never support an independent production claim.
  const scoped: EvidenceClass =
    observed === "recall" || observed === "controlled_production"
      ? clampToCeiling("supported_production", ceiling)
      : observed;

  const shared = {
    clientEventId: v2.clientEventId as string,
    sessionId: v2.sessionId as string,
    lessonId: v2.lessonId as string,
    exerciseId: v2.exerciseId as string,
    operation: v2.operation as OperationId,
    itemIds: [...(v2.itemIds as string[])],
    promptLevel: v2.promptLevel as LearningEvent["promptLevel"],
    attemptNumber: v2.attemptNumber as number,
    timestamp: v2.timestamp as number,
    contentVersion: v2.contentVersion as string,
    appBuild: v2.appBuild as string,
    deviceInfo: v2.deviceInfo as LearningEvent["deviceInfo"],
    sync: v2.sync as LearningEvent["sync"],
    primitive: v2.primitive as LearningEvent["primitive"],
    placement: v2.placement as LearningEvent["placement"],
    evId: (v2.evId as string | null) ?? null,
    payloadId: (v2.payloadId as string | null) ?? null,
    sentenceId: (v2.sentenceId as string | null) ?? null,
    targetTreatments: [...(v2.targetTreatments as CurriculumTreatment[])],
    evidenceCeiling: ceiling,
    userAnswer: (v2.userAnswer as string | null) ?? null,
    expectedAnswer: (v2.expectedAnswer as string | null) ?? null,
    sequence: (v2.sequence as LearningEvent["sequence"]) ?? null,
    assistance: LEGACY_UNKNOWN_ASSISTANCE,
  };

  if (!assessed) {
    const legacyGrading = v2.legacyGrading as
      | { result: ErrorTagCode; errorTags: ErrorTagCode[] }
      | undefined;
    return createMigratedLearningEvent({
      ...shared,
      assessed: false,
      evidenceClass: scoped,
      outcome: v2.outcome as LearningEvent["outcome"],
      attribution: { status: "not_applicable" },
      admissibility: { status: "no_evidence", reasons: ["non_assessed_interaction"] },
      ...(legacyGrading
        ? {
            legacyGrading: {
              result: legacyGrading.result,
              errorTags: [...legacyGrading.errorTags],
            },
          }
        : {}),
    });
  }

  return createMigratedLearningEvent({
    ...shared,
    assessed: true,
    evidenceClass: scoped,
    normalizedAnswer: (v2.normalizedAnswer as string | null) ?? null,
    result: v2.result as ErrorTagCode,
    errorTags: [...(v2.errorTags as ErrorTagCode[])],
    outcome: v2.outcome as LearningEvent["outcome"],
    // History was already scored under the v1/v2 reducer; preserve that fact
    // instead of re-opening admissibility for events we cannot re-examine.
    attribution: { status: "resolved", source: "learner" },
    admissibility: { status: "legacy_admitted", sourceVersion },
  });
}

/**
 * Event-log migration registry — the v1 → v2 → v3 chain, scoped to learning
 * events so the shipped `defaultMigrationRegistry` stays empty for other
 * persisted structures (compaction snapshot, telemetry log).
 */
export const eventMigrationRegistry = createMigrationRegistry();

eventMigrationRegistry.registerMigration(1, 2, (data) => {
  if (!isPlausibleV1Event(data)) {
    throw new Error(
      "event migration v1 -> v2: input is not a plausible v1 learning event",
    );
  }
  return migrateV1EventToV2(data);
});

// The rails carry a version number, not a migration ORIGIN, and the v2 shape must
// not gain a provenance field just to smuggle one through. So this step can only
// speak for input that genuinely declares `schemaVersion: 2` — which is exactly
// what `isValidV2Event` requires of it. Chaining v1 → v2 → v3 through
// `runMigrations` would reach here with a converted record that also declares
// version 2 and would be stamped `sourceVersion: 2` incorrectly. That is why
// `migrateEventToCurrent` below owns the real chain and passes the origin
// explicitly; it is the only entry point the repository uses.
eventMigrationRegistry.registerMigration(2, 3, (data) => {
  if (!isValidV2Event(data)) {
    throw new Error("event migration v2 -> v3: input is not a valid v2 learning event");
  }
  return migrateV2EventToV3(data, 2) as unknown as Record<string, unknown>;
});

export type EventMigrationResult =
  | { status: "ok"; event: LearningEvent; migrated: boolean }
  | { status: "unsupported"; reason: string; schemaVersion: number | null };

/**
 * Bring one persisted event object to the current version.
 *
 * - absent `schemaVersion` ⇒ v1 ⇒ migrated through v2 to v3, `sourceVersion: 1`;
 * - `schemaVersion: 2` ⇒ validated as v2, then migrated to v3, `sourceVersion: 2`;
 * - `schemaVersion: 3` ⇒ validated and returned as-is (never re-migrated);
 * - a newer version ⇒ `unsupported`, original untouched (fail-closed, YASA 1);
 * - malformed at any rung ⇒ `unsupported`; never partially accepted.
 *
 * The origin is taken from the version detected HERE, at the entry boundary, and
 * handed to the v2 → v3 step. Every rung after the first sees a record claiming
 * version 2, so this is the last place the truth is still available.
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
    // `as LearningEvent` cast would let a malformed v3 event (unknown enum,
    // smuggled grading fields, misaligned treatments, an admitted event with no
    // learner attribution) enter the log and be treated as supported. Validate
    // it with the SAME runtime boundary newly constructed events pass through.
    //
    // A failing event is reported `unsupported` and left byte-for-byte alone:
    // never silently repaired, and never migrated into some other v3 shape.
    const issues = validateLearningEvent(data);
    if (issues.length > 0) {
      return {
        status: "unsupported",
        reason: `malformed v3 event: ${issues.join("; ")}`,
        schemaVersion: version,
      };
    }
    return { status: "ok", event: data as LearningEvent, migrated: false };
  }

  if (version === 1 && !isPlausibleV1Event(data)) {
    return {
      status: "unsupported",
      reason: "malformed v1 event (missing or wrongly typed required fields)",
      schemaVersion: version,
    };
  }
  if (version === 2 && !isValidV2Event(data)) {
    return {
      status: "unsupported",
      reason: "malformed v2 event (missing or wrongly typed required fields)",
      schemaVersion: version,
    };
  }

  // The version this event was PERSISTED as — captured before the v1 → v2 step
  // makes it indistinguishable from native v2 history.
  const sourceVersion: EventSourceVersion = version === 1 ? 1 : 2;

  try {
    const v2 = version === 1 ? migrateV1EventToV2(data as Record<string, unknown>) : data;
    if (!isValidV2Event(v2)) {
      return {
        status: "unsupported",
        reason: "v1 -> v2 migration produced an invalid v2 event",
        schemaVersion: version,
      };
    }
    const v3 = migrateV2EventToV3(v2, sourceVersion);
    const issues = validateLearningEvent(v3);
    if (issues.length > 0) {
      return {
        status: "unsupported",
        reason: `migration produced an invalid v3 event: ${issues.join("; ")}`,
        schemaVersion: version,
      };
    }
    return { status: "ok", event: v3, migrated: true };
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
 * Bring a whole persisted event array to the current version, deterministically.
 *
 * Mixed v1/v2/v3 logs are handled event by event, in append order. A single
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
