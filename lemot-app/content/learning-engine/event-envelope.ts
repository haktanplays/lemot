/**
 * Learning-event v2 construction + validation (PR-02) — pure, no I/O, no clock.
 *
 * The single deterministic boundary for building a v2 `LearningEvent`, so screens
 * never assemble raw event objects field by field. It enforces the invariants
 * that make the log honest:
 *
 *  - an assessed event MUST carry its grading result;
 *  - a non-assessed event has NO place to put one (enforced by the union) and is
 *    rejected if a caller smuggles grading facets through an untyped path;
 *  - outcome and grading result can never contradict each other;
 *  - primitive and evidence class must be structurally compatible;
 *  - treatments are index-aligned with `itemIds`;
 *  - identifiers stay machine identifiers, never display strings.
 *
 * Hard boundaries: no `Date.now()`, no id generation, no storage, no network, no
 * React. Timestamps and ids stay caller-supplied (the session controller owns the
 * one allowed clock impurity). Inputs are never mutated; outputs are frozen.
 *
 * NOT here: assistance capture, attribution resolution, admissibility decisions,
 * Supported-vs-independent production, or any pedagogical/content validation.
 * Those are PR-03 / PR-04 and content authoring respectively.
 */
import type {
  AdmissibilityState,
  AssessedLearningEvent,
  AssistanceCaptureState,
  AttributionState,
  CurriculumTreatment,
  ErrorTagCode,
  EvidenceClass,
  LearningEvent,
  LearningEventPrimitive,
  LearningEventSequence,
  LearningOutcome,
  LearningPlacement,
  NonAssessedLearningEvent,
} from "./events";
import { LEARNING_EVENT_SCHEMA_VERSION } from "./events";
import { isSentenceId } from "../identity/sentenceIdentity";

/** `EV-###` — the Exercise Variation Inventory's id shape. */
export const EV_ID_PATTERN = /^EV-\d{3}$/;

/** Thrown when an event would be structurally or semantically incoherent. */
export class InvalidLearningEventError extends Error {
  readonly issues: readonly string[];
  constructor(issues: readonly string[]) {
    super(`invalid learning event: ${issues.join("; ")}`);
    this.name = "InvalidLearningEventError";
    this.issues = issues;
  }
}

/**
 * Primitives that may be assessed at all. Exposure, self-report, reveal, and
 * issue reports are never graded; production may be EITHER (a graded weave vs an
 * ungraded open attempt under W1).
 */
const ASSESSABLE_PRIMITIVES: ReadonlySet<LearningEventPrimitive> =
  new Set<LearningEventPrimitive>(["selection", "production"]);

/** Structural (not pedagogical) compatibility between primitive and evidence class. */
const PRIMITIVE_EVIDENCE: Readonly<
  Record<LearningEventPrimitive, ReadonlySet<EvidenceClass>>
> = {
  exposure: new Set<EvidenceClass>([
    "exposure",
    "audio_exposure",
    "no_mastery_evidence",
  ]),
  selection: new Set<EvidenceClass>([
    "recognition",
    "audio_exposure",
    "no_mastery_evidence",
  ]),
  production: new Set<EvidenceClass>([
    "recall",
    "controlled_production",
    "supported_production",
    "open_production_attempt",
    "self_correction",
    "no_mastery_evidence",
  ]),
  self_report: new Set<EvidenceClass>(["self_report", "no_mastery_evidence"]),
  reveal: new Set<EvidenceClass>(["comparison_only", "no_mastery_evidence"]),
  issue_report: new Set<EvidenceClass>(["no_mastery_evidence"]),
};

/** Outcomes that assert something about grading, so a non-assessed event may not claim them. */
const GRADED_OUTCOMES: ReadonlySet<LearningOutcome> = new Set<LearningOutcome>([
  "correct",
  "incorrect",
  "acceptable_variant",
  "near_miss",
]);

/**
 * The single canonical outcome for a grading result. Deterministic and total, so
 * "outcome contradicts result" is a decidable check rather than a judgement call.
 */
export function outcomeForResult(result: ErrorTagCode): LearningOutcome {
  switch (result) {
    case "correct":
      return "correct";
    case "accepted_variant":
      return "acceptable_variant";
    case "punctuation_only":
    case "accent_only":
    case "spelling_near_miss":
      return "near_miss";
    case "empty_or_skip":
      return "skipped";
    default:
      return "incorrect";
  }
}

/** Fields shared by both construction inputs. */
type BaseInput = {
  clientEventId: string;
  sessionId: string;
  lessonId: string;
  exerciseId: string;
  operation: AssessedLearningEvent["operation"];
  itemIds: readonly AssessedLearningEvent["itemIds"][number][];
  promptLevel: AssessedLearningEvent["promptLevel"];
  attemptNumber: number;
  timestamp: number;
  contentVersion: string;
  appBuild: string;
  deviceInfo: AssessedLearningEvent["deviceInfo"];
  sync: AssessedLearningEvent["sync"];
  primitive: LearningEventPrimitive;
  placement: LearningPlacement;
  evId?: string | null;
  payloadId?: string | null;
  sentenceId?: string | null;
  targetTreatments: readonly CurriculumTreatment[];
  evidenceCeiling: EvidenceClass;
  evidenceClass: EvidenceClass;
  userAnswer?: string | null;
  expectedAnswer?: string | null;
  sequence?: LearningEventSequence | null;
  assistance?: AssistanceCaptureState;
  attribution?: AttributionState;
  admissibility?: AdmissibilityState;
};

export type AssessedEventInput = BaseInput & {
  assessed: true;
  result: ErrorTagCode;
  errorTags: readonly ErrorTagCode[];
  normalizedAnswer?: string | null;
  /** Optional: defaults to the canonical outcome for `result`. */
  outcome?: LearningOutcome;
};

export type NonAssessedEventInput = BaseInput & {
  assessed: false;
  /** Defaults to `completed_unassessed`; may never be a graded outcome. */
  outcome?: LearningOutcome;
  legacyGrading?: { result: ErrorTagCode; errorTags: readonly ErrorTagCode[] };
};

export type LearningEventInput = AssessedEventInput | NonAssessedEventInput;

const isNonEmptyString = (v: unknown): v is string =>
  typeof v === "string" && v.length > 0;

/** Machine identifiers must be compact tokens, never display copy. */
const isMachineId = (v: string): boolean => v.length > 0 && !/\s/.test(v);

/**
 * Validate an already-built event. Returns findings (empty = valid) so callers
 * can report everything at once. Used by the constructor and by the migration.
 */
export function validateLearningEvent(event: LearningEvent): string[] {
  const issues: string[] = [];

  if (!Number.isInteger(event.schemaVersion) || event.schemaVersion < 1) {
    issues.push(`schemaVersion must be a positive integer`);
  }
  for (const [field, value] of [
    ["clientEventId", event.clientEventId],
    ["sessionId", event.sessionId],
    ["lessonId", event.lessonId],
    ["exerciseId", event.exerciseId],
  ] as const) {
    if (!isNonEmptyString(value)) issues.push(`${field} must be a non-empty string`);
  }
  if (!Number.isFinite(event.timestamp)) issues.push("timestamp must be a number");
  if (!Number.isInteger(event.attemptNumber) || event.attemptNumber < 1) {
    issues.push("attemptNumber must be a positive integer");
  }

  if (!Array.isArray(event.itemIds)) {
    issues.push("itemIds must be an array");
  } else if (
    !Array.isArray(event.targetTreatments) ||
    event.targetTreatments.length !== event.itemIds.length
  ) {
    issues.push(
      `targetTreatments must be index-aligned with itemIds ` +
        `(${event.itemIds.length} item(s), ${
          Array.isArray(event.targetTreatments) ? event.targetTreatments.length : "none"
        } treatment(s)) — a mixed-treatment payload must never be flattened`,
    );
  }

  if (event.evId !== null && event.evId !== undefined && !EV_ID_PATTERN.test(event.evId)) {
    issues.push(`evId "${event.evId}" is malformed — expected EV-### or null`);
  }
  if (
    event.payloadId !== null &&
    event.payloadId !== undefined &&
    !isMachineId(event.payloadId)
  ) {
    issues.push("payloadId must be a machine identifier (no whitespace), or null");
  }
  if (
    event.sentenceId !== null &&
    event.sentenceId !== undefined &&
    !isSentenceId(event.sentenceId)
  ) {
    issues.push(`sentenceId "${event.sentenceId}" is not a valid sent:lNN-… identity`);
  }

  const allowed = PRIMITIVE_EVIDENCE[event.primitive];
  if (!allowed) {
    issues.push(`unknown primitive "${event.primitive}"`);
  } else if (!allowed.has(event.evidenceClass)) {
    issues.push(
      `evidenceClass "${event.evidenceClass}" is not structurally compatible with primitive "${event.primitive}"`,
    );
  }

  if (event.sequence !== null && event.sequence !== undefined) {
    const s = event.sequence;
    if (!isNonEmptyString(s.sequenceId)) issues.push("sequence.sequenceId must be non-empty");
    if (!Number.isInteger(s.stepIndex) || s.stepIndex < 0) {
      issues.push("sequence.stepIndex must be a non-negative integer");
    }
    if (s.stepCount !== null && (!Number.isInteger(s.stepCount) || s.stepCount < 1)) {
      issues.push("sequence.stepCount must be a positive integer or null");
    }
    if (
      s.stepCount !== null &&
      Number.isInteger(s.stepIndex) &&
      s.stepIndex >= s.stepCount
    ) {
      issues.push("sequence.stepIndex must be less than sequence.stepCount");
    }
    if (s.parentEventId !== null && !isNonEmptyString(s.parentEventId)) {
      issues.push("sequence.parentEventId must be a non-empty string or null");
    }
  }

  if (event.assessed === true) {
    if (!ASSESSABLE_PRIMITIVES.has(event.primitive)) {
      issues.push(
        `primitive "${event.primitive}" can never be assessed — only selection and production may be graded`,
      );
    }
    if (!isNonEmptyString(event.result)) {
      issues.push("an assessed event must carry a grading result");
    } else {
      const canonical = outcomeForResult(event.result);
      if (event.outcome !== canonical) {
        issues.push(
          `outcome "${event.outcome}" contradicts grading result "${event.result}" (expected "${canonical}")`,
        );
      }
    }
    if (!Array.isArray(event.errorTags) || event.errorTags.length === 0) {
      issues.push("an assessed event must carry at least one error tag");
    }
  } else {
    // Defence in depth: the union forbids these, but events also arrive from
    // JSON (storage, migration) where the compiler cannot help.
    const smuggled = event as unknown as Record<string, unknown>;
    if (smuggled.result !== undefined) {
      issues.push(
        "a non-assessed event must not carry a grading result — a reveal, exposure, " +
          "self-report or issue report was never graded",
      );
    }
    if (smuggled.errorTags !== undefined) {
      issues.push("a non-assessed event must not carry error tags");
    }
    if (smuggled.normalizedAnswer !== undefined) {
      issues.push("a non-assessed event must not carry a normalized answer");
    }
    if (GRADED_OUTCOMES.has(event.outcome)) {
      issues.push(
        `outcome "${event.outcome}" claims a grading verdict on a non-assessed event`,
      );
    }
  }

  return issues;
}

/**
 * Build a validated, frozen v2 event. Newly created events always carry the
 * current schema version. Throws {@link InvalidLearningEventError} on any issue —
 * a malformed event must never reach the append-only log.
 */
export function createLearningEvent(input: LearningEventInput): LearningEvent {
  const base = {
    schemaVersion: LEARNING_EVENT_SCHEMA_VERSION,
    clientEventId: input.clientEventId,
    sessionId: input.sessionId,
    lessonId: input.lessonId,
    exerciseId: input.exerciseId,
    operation: input.operation,
    itemIds: [...input.itemIds],
    promptLevel: input.promptLevel,
    attemptNumber: input.attemptNumber,
    userAnswer: input.userAnswer ?? null,
    expectedAnswer: input.expectedAnswer ?? null,
    timestamp: input.timestamp,
    contentVersion: input.contentVersion,
    appBuild: input.appBuild,
    deviceInfo: input.deviceInfo,
    sync: input.sync,
    primitive: input.primitive,
    placement: input.placement,
    evId: input.evId ?? null,
    payloadId: input.payloadId ?? null,
    sentenceId: input.sentenceId ?? null,
    targetTreatments: [...input.targetTreatments],
    evidenceCeiling: input.evidenceCeiling,
    evidenceClass: input.evidenceClass,
    assistance: input.assistance ?? "not_captured",
    attribution: input.attribution ?? "unresolved",
    admissibility: input.admissibility ?? "unresolved",
    sequence: input.sequence ?? null,
  };

  const event: LearningEvent = input.assessed
    ? ({
        ...base,
        assessed: true,
        normalizedAnswer: input.normalizedAnswer ?? null,
        result: input.result,
        errorTags: [...input.errorTags],
        outcome: input.outcome ?? outcomeForResult(input.result),
      } satisfies AssessedLearningEvent)
    : ({
        ...base,
        assessed: false,
        outcome: input.outcome ?? "completed_unassessed",
        ...(input.legacyGrading
          ? {
              legacyGrading: {
                result: input.legacyGrading.result,
                errorTags: [...input.legacyGrading.errorTags],
              },
            }
          : {}),
      } satisfies NonAssessedLearningEvent);

  const issues = validateLearningEvent(event);
  if (issues.length > 0) throw new InvalidLearningEventError(issues);

  return Object.freeze(event);
}
