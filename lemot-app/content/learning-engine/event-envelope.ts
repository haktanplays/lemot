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
import {
  ADMISSIBILITY_STATES,
  ASSISTANCE_CAPTURE_STATES,
  ATTRIBUTION_STATES,
  CURRICULUM_TREATMENTS,
  ERROR_TAG_CODES,
  EVIDENCE_CLASSES,
  LEARNING_EVENT_PRIMITIVES,
  LEARNING_EVENT_SCHEMA_VERSION,
  LEARNING_EVENT_SYNC_ORIGINS,
  LEARNING_EVENT_SYNC_STATUSES,
  LEARNING_OUTCOMES,
  LEARNING_PLACEMENTS,
  OPERATION_IDS,
  PROMPT_FADE_LEVELS,
} from "./events";
import { isSentenceId } from "../identity/sentenceIdentity";

/** Membership sets built once from the single-home vocabulary arrays in ./events. */
const SET = {
  primitive: new Set<string>(LEARNING_EVENT_PRIMITIVES),
  placement: new Set<string>(LEARNING_PLACEMENTS),
  treatment: new Set<string>(CURRICULUM_TREATMENTS),
  evidence: new Set<string>(EVIDENCE_CLASSES),
  outcome: new Set<string>(LEARNING_OUTCOMES),
  assistance: new Set<string>(ASSISTANCE_CAPTURE_STATES),
  attribution: new Set<string>(ATTRIBUTION_STATES),
  admissibility: new Set<string>(ADMISSIBILITY_STATES),
  syncStatus: new Set<string>(LEARNING_EVENT_SYNC_STATUSES),
  syncOrigin: new Set<string>(LEARNING_EVENT_SYNC_ORIGINS),
  operation: new Set<string>(OPERATION_IDS),
  promptLevel: new Set<string>(PROMPT_FADE_LEVELS),
  errorTag: new Set<string>(ERROR_TAG_CODES),
} as const;

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

/** A plain (non-array, non-null) object. */
const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * Validate an event. Returns findings (empty = valid) so callers can report
 * everything at once. Used by the constructor, by the migration, and by the
 * repository's write boundary.
 *
 * Takes `unknown` ON PURPOSE. Persisted JSON carries no type information, so a
 * TypeScript cast proves nothing about a value read back from storage: every
 * enum, nested object, and array element is checked at RUNTIME here. This is the
 * one boundary that decides whether a v2 event is trustworthy.
 */
export function validateLearningEvent(candidate: unknown): string[] {
  const issues: string[] = [];

  if (!isPlainObject(candidate)) {
    return ["event must be a non-array object"];
  }
  const event = candidate;

  // ── enums ────────────────────────────────────────────────────────────────
  const enumChecks: [string, unknown, ReadonlySet<string>][] = [
    ["primitive", event.primitive, SET.primitive],
    ["placement", event.placement, SET.placement],
    ["operation", event.operation, SET.operation],
    ["promptLevel", event.promptLevel, SET.promptLevel],
    ["outcome", event.outcome, SET.outcome],
    ["evidenceCeiling", event.evidenceCeiling, SET.evidence],
    ["evidenceClass", event.evidenceClass, SET.evidence],
    ["assistance", event.assistance, SET.assistance],
    ["attribution", event.attribution, SET.attribution],
    ["admissibility", event.admissibility, SET.admissibility],
  ];
  for (const [field, value, allowed] of enumChecks) {
    if (typeof value !== "string" || !allowed.has(value)) {
      issues.push(`${field} "${String(value)}" is not a recognised value`);
    }
  }

  // ── scalars and ids ──────────────────────────────────────────────────────
  if (event.schemaVersion !== LEARNING_EVENT_SCHEMA_VERSION) {
    issues.push(
      `schemaVersion must be ${LEARNING_EVENT_SCHEMA_VERSION} for a current event (got ${String(event.schemaVersion)})`,
    );
  }
  for (const field of ["clientEventId", "sessionId", "lessonId", "exerciseId"] as const) {
    if (!isNonEmptyString(event[field])) issues.push(`${field} must be a non-empty string`);
  }
  if (!Number.isFinite(event.timestamp)) issues.push("timestamp must be a finite number");
  if (!Number.isInteger(event.attemptNumber) || (event.attemptNumber as number) < 1) {
    issues.push("attemptNumber must be a positive integer");
  }
  for (const field of ["contentVersion", "appBuild"] as const) {
    if (typeof event[field] !== "string") issues.push(`${field} must be a string`);
  }
  for (const field of ["userAnswer", "expectedAnswer"] as const) {
    const v = event[field];
    if (v !== null && typeof v !== "string") {
      issues.push(`${field} must be a string or null`);
    }
  }

  // ── itemIds + index-aligned treatments ───────────────────────────────────
  const itemIds = event.itemIds;
  if (!Array.isArray(itemIds) || !itemIds.every((id) => isNonEmptyString(id))) {
    issues.push("itemIds must be an array of non-empty strings");
  }
  const treatments = event.targetTreatments;
  if (!Array.isArray(treatments)) {
    issues.push("targetTreatments must be an array");
  } else {
    for (const t of treatments) {
      if (typeof t !== "string" || !SET.treatment.has(t)) {
        issues.push(`targetTreatments contains an unrecognised value "${String(t)}"`);
        break;
      }
    }
    if (Array.isArray(itemIds) && treatments.length !== itemIds.length) {
      issues.push(
        `targetTreatments must be index-aligned with itemIds ` +
          `(${itemIds.length} item(s), ${treatments.length} treatment(s)) — ` +
          `a mixed-treatment payload must never be flattened`,
      );
    }
  }

  // ── optional machine identifiers ─────────────────────────────────────────
  if (event.evId !== null && event.evId !== undefined) {
    if (typeof event.evId !== "string" || !EV_ID_PATTERN.test(event.evId)) {
      issues.push(`evId "${String(event.evId)}" is malformed — expected EV-### or null`);
    }
  }
  if (event.payloadId !== null && event.payloadId !== undefined) {
    if (typeof event.payloadId !== "string" || !isMachineId(event.payloadId)) {
      issues.push("payloadId must be a machine identifier (no whitespace), or null");
    }
  }
  if (event.sentenceId !== null && event.sentenceId !== undefined) {
    if (typeof event.sentenceId !== "string" || !isSentenceId(event.sentenceId)) {
      issues.push(
        `sentenceId "${String(event.sentenceId)}" is not a valid sent:lNN-… identity`,
      );
    }
  }

  // ── nested objects ───────────────────────────────────────────────────────
  const device = event.deviceInfo;
  if (!isPlainObject(device)) {
    issues.push("deviceInfo must be a non-array object");
  } else {
    if (!isNonEmptyString(device.platform)) {
      issues.push("deviceInfo.platform must be a non-empty string");
    }
    for (const field of ["osVersion", "expoRuntime"] as const) {
      if (device[field] !== undefined && typeof device[field] !== "string") {
        issues.push(`deviceInfo.${field} must be a string when present`);
      }
    }
  }

  const sync = event.sync;
  if (!isPlainObject(sync)) {
    issues.push("sync must be a non-array object");
  } else {
    if (typeof sync.status !== "string" || !SET.syncStatus.has(sync.status)) {
      issues.push(`sync.status "${String(sync.status)}" is not a recognised value`);
    }
    if (typeof sync.origin !== "string" || !SET.syncOrigin.has(sync.origin)) {
      issues.push(`sync.origin "${String(sync.origin)}" is not a recognised value`);
    }
    if (!Number.isFinite(sync.queuedAt)) {
      issues.push("sync.queuedAt must be a finite number");
    }
  }

  const sequence = event.sequence;
  if (sequence !== null && sequence !== undefined) {
    if (!isPlainObject(sequence)) {
      issues.push("sequence must be a non-array object or null");
    } else {
      if (!isNonEmptyString(sequence.sequenceId)) {
        issues.push("sequence.sequenceId must be non-empty");
      }
      if (!Number.isInteger(sequence.stepIndex) || (sequence.stepIndex as number) < 0) {
        issues.push("sequence.stepIndex must be a non-negative integer");
      }
      const stepCount = sequence.stepCount;
      if (stepCount !== null && (!Number.isInteger(stepCount) || (stepCount as number) < 1)) {
        issues.push("sequence.stepCount must be a positive integer or null");
      }
      if (
        typeof stepCount === "number" &&
        Number.isInteger(sequence.stepIndex) &&
        (sequence.stepIndex as number) >= stepCount
      ) {
        issues.push("sequence.stepIndex must be less than sequence.stepCount");
      }
      if (sequence.parentEventId !== null && !isNonEmptyString(sequence.parentEventId)) {
        issues.push("sequence.parentEventId must be a non-empty string or null");
      }
    }
  }

  // ── primitive ↔ evidence compatibility ───────────────────────────────────
  if (typeof event.primitive === "string" && SET.primitive.has(event.primitive)) {
    const allowed = PRIMITIVE_EVIDENCE[event.primitive as LearningEventPrimitive];
    if (typeof event.evidenceClass === "string" && !allowed.has(event.evidenceClass as EvidenceClass)) {
      issues.push(
        `evidenceClass "${event.evidenceClass}" is not structurally compatible with primitive "${event.primitive}"`,
      );
    }
  }

  // ── assessed / non-assessed coherence ────────────────────────────────────
  if (event.assessed === true) {
    if (
      typeof event.primitive === "string" &&
      !ASSESSABLE_PRIMITIVES.has(event.primitive as LearningEventPrimitive)
    ) {
      issues.push(
        `primitive "${event.primitive}" can never be assessed — only selection and production may be graded`,
      );
    }
    if (typeof event.result !== "string" || !SET.errorTag.has(event.result)) {
      issues.push(
        `an assessed event must carry a grading result from the frozen taxonomy (got "${String(event.result)}")`,
      );
    } else {
      const canonical = outcomeForResult(event.result as ErrorTagCode);
      if (event.outcome !== canonical) {
        issues.push(
          `outcome "${String(event.outcome)}" contradicts grading result "${event.result}" (expected "${canonical}")`,
        );
      }
    }
    if (!Array.isArray(event.errorTags) || event.errorTags.length === 0) {
      issues.push("an assessed event must carry at least one error tag");
    } else if (!event.errorTags.every((t) => typeof t === "string" && SET.errorTag.has(t))) {
      issues.push("errorTags may contain only frozen ErrorTagCode values");
    }
    if (event.normalizedAnswer !== null && typeof event.normalizedAnswer !== "string") {
      issues.push("an assessed event must carry normalizedAnswer as a string or null");
    }
    if (event.legacyGrading !== undefined) {
      issues.push("legacyGrading must never appear on an assessed event");
    }
  } else if (event.assessed === false) {
    // Defence in depth: the union forbids these, but events also arrive from
    // JSON (storage, migration) where the compiler cannot help.
    if (event.result !== undefined) {
      issues.push(
        "a non-assessed event must not carry a grading result — a reveal, exposure, " +
          "self-report or issue report was never graded",
      );
    }
    if (event.errorTags !== undefined) {
      issues.push("a non-assessed event must not carry error tags");
    }
    if (event.normalizedAnswer !== undefined) {
      issues.push("a non-assessed event must not carry a normalized answer");
    }
    if (typeof event.outcome === "string" && GRADED_OUTCOMES.has(event.outcome as LearningOutcome)) {
      issues.push(
        `outcome "${event.outcome}" claims a grading verdict on a non-assessed event`,
      );
    }
    if (event.legacyGrading !== undefined) {
      // The migrated legacy reveal is the ONLY case that may carry it today.
      if (event.primitive !== "reveal") {
        issues.push(
          "legacyGrading is only accepted on a migrated reveal — a newly created " +
            "non-assessed event must never acquire it",
        );
      }
      const lg = event.legacyGrading;
      if (!isPlainObject(lg)) {
        issues.push("legacyGrading must be a non-array object");
      } else {
        if (typeof lg.result !== "string" || !SET.errorTag.has(lg.result)) {
          issues.push("legacyGrading.result must be a frozen ErrorTagCode");
        }
        if (
          !Array.isArray(lg.errorTags) ||
          !lg.errorTags.every((t) => typeof t === "string" && SET.errorTag.has(t))
        ) {
          issues.push("legacyGrading.errorTags may contain only frozen ErrorTagCode values");
        }
      }
    }
  } else {
    issues.push("assessed must be exactly true or false");
  }

  return issues;
}

/**
 * Copy + freeze one array the event owns. Cloning first is what makes the event
 * independent of its caller; freezing is what stops a consumer mutating it back.
 */
const frozenCopy = <T>(values: readonly T[]): readonly T[] =>
  Object.freeze([...values]) as readonly T[];

/**
 * Build a validated, IMMUTABLE v2 event. Newly created events always carry the
 * current schema version. Throws {@link InvalidLearningEventError} on any issue —
 * a malformed event must never reach the append-only log.
 *
 * Immutability is deep for everything the event OWNS: `itemIds`,
 * `targetTreatments`, `errorTags`, `deviceInfo`, `sync`, `sequence`,
 * `legacyGrading` (and its `errorTags`) are each defensively cloned and frozen.
 * Cloning matters as much as freezing here: the session controller passes ONE
 * shared `deviceInfo` into every event, so freezing the caller's object in place
 * would freeze application state that does not belong to the event. Nothing
 * outside the event is ever frozen.
 */
export function createLearningEvent(input: LearningEventInput): LearningEvent {
  const base = {
    schemaVersion: LEARNING_EVENT_SCHEMA_VERSION,
    clientEventId: input.clientEventId,
    sessionId: input.sessionId,
    lessonId: input.lessonId,
    exerciseId: input.exerciseId,
    operation: input.operation,
    itemIds: frozenCopy(input.itemIds),
    promptLevel: input.promptLevel,
    attemptNumber: input.attemptNumber,
    userAnswer: input.userAnswer ?? null,
    expectedAnswer: input.expectedAnswer ?? null,
    timestamp: input.timestamp,
    contentVersion: input.contentVersion,
    appBuild: input.appBuild,
    deviceInfo: Object.freeze({ ...input.deviceInfo }),
    sync: Object.freeze({ ...input.sync }),
    primitive: input.primitive,
    placement: input.placement,
    evId: input.evId ?? null,
    payloadId: input.payloadId ?? null,
    sentenceId: input.sentenceId ?? null,
    targetTreatments: frozenCopy(input.targetTreatments),
    evidenceCeiling: input.evidenceCeiling,
    evidenceClass: input.evidenceClass,
    assistance: input.assistance ?? "not_captured",
    attribution: input.attribution ?? "unresolved",
    admissibility: input.admissibility ?? "unresolved",
    sequence: input.sequence ? Object.freeze({ ...input.sequence }) : null,
  };

  const event: LearningEvent = input.assessed
    ? ({
        ...base,
        assessed: true,
        normalizedAnswer: input.normalizedAnswer ?? null,
        result: input.result,
        errorTags: frozenCopy(input.errorTags),
        outcome: input.outcome ?? outcomeForResult(input.result),
      } satisfies AssessedLearningEvent)
    : ({
        ...base,
        assessed: false,
        outcome: input.outcome ?? "completed_unassessed",
        ...(input.legacyGrading
          ? {
              legacyGrading: Object.freeze({
                result: input.legacyGrading.result,
                errorTags: frozenCopy(input.legacyGrading.errorTags),
              }),
            }
          : {}),
      } satisfies NonAssessedLearningEvent);

  const issues = validateLearningEvent(event);
  if (issues.length > 0) throw new InvalidLearningEventError(issues);

  return Object.freeze(event);
}
