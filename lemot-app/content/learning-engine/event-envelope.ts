/**
 * Learning-event v3 construction + validation — pure, no I/O, no clock.
 *
 * The single deterministic boundary for building a `LearningEvent`, so screens
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
 * There are TWO construction modes, and the difference is deliberate:
 *
 *  - {@link createLearningEvent} — the ordinary, application-facing boundary.
 *    Everything the running app creates goes through it, and it REFUSES the two
 *    states that exist only to rehydrate pre-v3 history.
 *  - {@link createMigratedLearningEvent} — migration-only rehydration, imported
 *    by ./event-migration.ts and nowhere else.
 *
 * Both share one builder, one validator and one freeze implementation, so the
 * historical path can never drift from the live one.
 *
 * Hard boundaries: no `Date.now()`, no id generation, no storage, no network, no
 * React. Timestamps and ids stay caller-supplied (the session controller owns the
 * one allowed clock impurity). Inputs are never mutated; outputs are frozen.
 *
 * NOT here: assistance capture, attribution resolution, admissibility decisions,
 * Supported-vs-independent production, or any pedagogical/content validation.
 * Those live in ./evidence-admission.ts, PR-04, and content authoring.
 */
import type {
  AdmissibilityState,
  AssessedLearningEvent,
  AssistanceSnapshot,
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
import {
  freezeAdmissibility,
  freezeAssistance,
  freezeAttribution,
} from "./evidence-context";
import {
  ADMISSIBILITY_STATUSES,
  ADMISSION_BLOCK_REASONS,
  ASSISTANCE_CAPTURES,
  ATTRIBUTION_SOURCES,
  ATTRIBUTION_STATUSES,
  CONSTITUTIVE_SUPPORTS,
  NO_EVIDENCE_REASONS,
  PRIOR_ANSWER_EXPOSURES,
} from "./evidence-context";
import { MASTERY_BEARING_EVIDENCE, clampToCeiling } from "./evidence-admission";
import { isSentenceId } from "../identity/sentenceIdentity";

/** Membership sets built once from the single-home vocabulary arrays in ./events. */
const SET = {
  primitive: new Set<string>(LEARNING_EVENT_PRIMITIVES),
  placement: new Set<string>(LEARNING_PLACEMENTS),
  treatment: new Set<string>(CURRICULUM_TREATMENTS),
  evidence: new Set<string>(EVIDENCE_CLASSES),
  outcome: new Set<string>(LEARNING_OUTCOMES),
  assistanceCapture: new Set<string>(ASSISTANCE_CAPTURES),
  constitutive: new Set<string>(CONSTITUTIVE_SUPPORTS),
  priorExposure: new Set<string>(PRIOR_ANSWER_EXPOSURES),
  attributionStatus: new Set<string>(ATTRIBUTION_STATUSES),
  attributionSource: new Set<string>(ATTRIBUTION_SOURCES),
  admissibilityStatus: new Set<string>(ADMISSIBILITY_STATUSES),
  admissionBlock: new Set<string>(ADMISSION_BLOCK_REASONS),
  noEvidence: new Set<string>(NO_EVIDENCE_REASONS),
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
 * Thrown when a LIVE caller tries to author a state that only historical
 * rehydration may produce.
 *
 * Extends {@link InvalidLearningEventError} so existing `instanceof` handling
 * still catches it, while the distinct type keeps the two questions separable:
 * "is this a well-formed v3 event?" (structural validity — persisted history
 * must keep passing) versus "may this be created live?" (authoring eligibility).
 */
export class MigrationOnlyEventStateError extends InvalidLearningEventError {
  constructor(issues: readonly string[]) {
    super(issues);
    this.name = "MigrationOnlyEventStateError";
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

/** Fields shared by every construction input. */
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
  /**
   * Attempt-level evidence context — supplied explicitly, never defaulted.
   *
   * `admissibility` is typed WIDE here on purpose. `resolveEvidenceAdmission`
   * declares `AdmissibilityState` as its return type, so narrowing this field to
   * exclude `legacy_admitted` would reject the session controller's own (always
   * legitimate) value. The migration-only seal on it is therefore enforced at
   * RUNTIME, in `migrationOnlyStateIssues` — which is the boundary that matters,
   * since an untyped cast defeats a type-level seal anyway.
   */
  assistance: AssistanceSnapshot;
  attribution: AttributionState;
  admissibility: AdmissibilityState;
};

/** The grading arm, identical for live and migrated construction. */
type AssessedFields = {
  assessed: true;
  result: ErrorTagCode;
  errorTags: readonly ErrorTagCode[];
  normalizedAnswer?: string | null;
  /** Optional: defaults to the canonical outcome for `result`. */
  outcome?: LearningOutcome;
};

/** The ungraded arm. Note the ABSENCE of `legacyGrading` — see below. */
type NonAssessedFields = {
  assessed: false;
  /** Defaults to `completed_unassessed`; may never be a graded outcome. */
  outcome?: LearningOutcome;
};

// ── Live construction input ─────────────────────────────────────────────────

export type AssessedEventInput = BaseInput & AssessedFields;

/**
 * A live non-assessed event. `legacyGrading` is deliberately not a field here:
 * a reveal created today has no historical grading to preserve, so the property
 * does not exist for ordinary callers to reach for. This one IS sealed at
 * compile time as well as at runtime.
 */
export type NonAssessedEventInput = BaseInput & NonAssessedFields;

export type LearningEventInput = AssessedEventInput | NonAssessedEventInput;

// ── Migration-only construction input ───────────────────────────────────────

export type MigratedAssessedEventInput = BaseInput & AssessedFields;

export type MigratedNonAssessedEventInput = BaseInput &
  NonAssessedFields & {
    /**
     * The v1 reveal's fabricated grading, preserved verbatim for recovery. Only
     * the migration has one of these; the mastery reducer never reads it.
     */
    legacyGrading?: { result: ErrorTagCode; errorTags: readonly ErrorTagCode[] };
  };

export type MigratedLearningEventInput =
  | MigratedAssessedEventInput
  | MigratedNonAssessedEventInput;

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

  // ── assistance (structured, PR-03) ───────────────────────────────────────
  const assistance = event.assistance;
  if (!isPlainObject(assistance)) {
    issues.push("assistance must be a non-array object");
  } else if (
    typeof assistance.capture !== "string" ||
    !SET.assistanceCapture.has(assistance.capture)
  ) {
    issues.push(`assistance.capture "${String(assistance.capture)}" is not a recognised value`);
  } else if (assistance.capture === "known") {
    const constitutive = assistance.constitutive;
    if (!Array.isArray(constitutive)) {
      issues.push("assistance.constitutive must be an array");
    } else {
      if (!constitutive.every((c) => typeof c === "string" && SET.constitutive.has(c))) {
        issues.push("assistance.constitutive contains an unrecognised support");
      }
      if (new Set(constitutive).size !== constitutive.length) {
        issues.push("assistance.constitutive must not contain duplicates");
      }
    }
    if (assistance.hintRung !== 0 && assistance.hintRung !== 1 && assistance.hintRung !== 2) {
      issues.push("assistance.hintRung must be 0, 1 or 2 (there is no copy-ready rung)");
    }
    if (!Number.isInteger(assistance.retryIndex) || (assistance.retryIndex as number) < 0) {
      issues.push("assistance.retryIndex must be a non-negative integer (first attempt = 0)");
    }
    if (typeof assistance.selfCorrection !== "boolean") {
      issues.push("assistance.selfCorrection must be a boolean");
    }
    if (
      typeof assistance.priorAnswerExposure !== "string" ||
      !SET.priorExposure.has(assistance.priorAnswerExposure)
    ) {
      issues.push("assistance.priorAnswerExposure must be none, answer or model");
    }
    const access = assistance.accessibility;
    if (!isPlainObject(access)) {
      issues.push("assistance.accessibility must be a non-array object");
    } else {
      if (!Number.isInteger(access.replayCount) || (access.replayCount as number) < 0) {
        issues.push("assistance.accessibility.replayCount must be a non-negative integer");
      }
      if (typeof access.slowPlayback !== "boolean") {
        issues.push("assistance.accessibility.slowPlayback must be a boolean");
      }
    }
  } else {
    // unknown / legacy_unknown must not carry invented detail
    for (const field of [
      "constitutive",
      "hintRung",
      "retryIndex",
      "selfCorrection",
      "priorAnswerExposure",
      "accessibility",
    ]) {
      if (assistance[field] !== undefined) {
        issues.push(
          `assistance.capture "${assistance.capture}" must not carry "${field}" — unknown assistance may not be dressed up as known`,
        );
      }
    }
  }

  // ── attribution (structured, PR-03) ──────────────────────────────────────
  const attribution = event.attribution;
  if (!isPlainObject(attribution)) {
    issues.push("attribution must be a non-array object");
  } else if (
    typeof attribution.status !== "string" ||
    !SET.attributionStatus.has(attribution.status)
  ) {
    issues.push(`attribution.status "${String(attribution.status)}" is not a recognised value`);
  } else if (attribution.status === "resolved") {
    if (
      typeof attribution.source !== "string" ||
      !SET.attributionSource.has(attribution.source)
    ) {
      issues.push(
        `attribution.source "${String(attribution.source)}" is not one of the Canonical eight error sources`,
      );
    }
  } else if (attribution.source !== undefined) {
    issues.push(`attribution.status "${attribution.status}" must not carry a resolved source`);
  }

  // ── admissibility (structured, PR-03) ────────────────────────────────────
  const admissibility = event.admissibility;
  if (!isPlainObject(admissibility)) {
    issues.push("admissibility must be a non-array object");
  } else if (
    typeof admissibility.status !== "string" ||
    !SET.admissibilityStatus.has(admissibility.status)
  ) {
    issues.push(
      `admissibility.status "${String(admissibility.status)}" is not a recognised value`,
    );
  } else {
    const status = admissibility.status;
    const checkReasons = (allowed: ReadonlySet<string>, label: string): void => {
      const reasons = admissibility.reasons;
      if (!Array.isArray(reasons)) {
        issues.push(`admissibility.reasons must be an array for status "${status}"`);
        return;
      }
      if (!reasons.every((r) => typeof r === "string" && allowed.has(r))) {
        issues.push(`admissibility.reasons contains an unrecognised ${label} reason`);
      }
      if (new Set(reasons).size !== reasons.length) {
        issues.push("admissibility.reasons must not contain duplicates");
      }
    };
    if (status === "admitted") {
      if (admissibility.reasons !== undefined) {
        issues.push("an admitted event must not carry admission-block reasons");
      }
    } else if (status === "legacy_admitted") {
      if (admissibility.sourceVersion !== 1 && admissibility.sourceVersion !== 2) {
        issues.push("legacy_admitted must carry sourceVersion 1 or 2");
      }
    } else if (status === "no_evidence") {
      checkReasons(SET.noEvidence, "no-evidence");
    } else {
      checkReasons(SET.admissionBlock, "admission-block");
      const reasons = Array.isArray(admissibility.reasons) ? admissibility.reasons : [];
      if (reasons.length === 0) {
        issues.push(`status "${status}" must name at least one machine reason`);
      }
    }
  }

  // ── cross-field coherence (PR-03) ────────────────────────────────────────
  const admissionStatus = isPlainObject(admissibility)
    ? (admissibility.status as string | undefined)
    : undefined;
  const attributionStatus = isPlainObject(attribution)
    ? (attribution.status as string | undefined)
    : undefined;
  const attributionSource = isPlainObject(attribution)
    ? (attribution.source as string | undefined)
    : undefined;
  const evidenceIsMasteryBearing =
    typeof event.evidenceClass === "string" &&
    MASTERY_BEARING_EVIDENCE.has(event.evidenceClass as EvidenceClass);

  if (event.assessed === true) {
    if (admissionStatus === "admitted" && attributionSource !== "learner") {
      issues.push(
        "an admitted assessed event must be attributed to the learner — admission means the result is theirs",
      );
    }
    if (
      admissionStatus === "quarantined" &&
      attributionSource === "learner" &&
      // a learner-attributed quarantine is only coherent if some non-learner
      // block reason explains it
      Array.isArray((admissibility as Record<string, unknown>).reasons) &&
      !((admissibility as { reasons: string[] }).reasons.some(
        (r) => r !== "learner_authorship_unresolved",
      ))
    ) {
      issues.push("a quarantined event attributed to the learner needs a non-learner reason");
    }
    if (
      (admissionStatus === "quarantined" ||
        admissionStatus === "unresolved" ||
        admissionStatus === "no_evidence") &&
      evidenceIsMasteryBearing
    ) {
      issues.push(
        `a ${admissionStatus} event must carry no_mastery_evidence — correctness is not admissibility`,
      );
    }
    // Assistance must be able to support the claim being made.
    const independent =
      event.evidenceClass === "recall" || event.evidenceClass === "controlled_production";
    if (independent && isPlainObject(assistance)) {
      if (assistance.capture !== "known") {
        issues.push(
          "independent production cannot be claimed with unknown assistance (FQ-3)",
        );
      } else {
        if ((assistance.hintRung as number) > 0) {
          issues.push("independent production cannot be claimed after a hint");
        }
        if ((assistance.retryIndex as number) > 0) {
          issues.push("independent production cannot be claimed on a retry");
        }
        if (assistance.priorAnswerExposure !== "none") {
          issues.push(
            "independent production cannot be claimed after answer/model exposure",
          );
        }
        if (assistance.selfCorrection === true) {
          issues.push("a self-correction is not independent first-pass production");
        }
        if (Array.isArray(assistance.constitutive) && assistance.constitutive.length > 0) {
          issues.push(
            "independent production cannot be claimed with constitutive support present",
          );
        }
      }
    }
    if (independent && Array.isArray(event.targetTreatments)) {
      if (event.targetTreatments.some((t) => t === "supported" || t === "legacy_unknown")) {
        issues.push(
          "independent production cannot be claimed for a Supported or unknown-treatment target",
        );
      }
    }
  } else if (event.assessed === false) {
    if (admissionStatus === "admitted" || admissionStatus === "legacy_admitted") {
      issues.push("a non-assessed event must never be admitted as learning evidence");
    }
    if (attributionSource === "learner") {
      issues.push("a non-assessed event must not be attributed to the learner");
    }
    void attributionStatus;
  }

  // Ceiling containment: the observation may never exceed what was authored.
  if (
    typeof event.evidenceClass === "string" &&
    typeof event.evidenceCeiling === "string" &&
    SET.evidence.has(event.evidenceClass) &&
    SET.evidence.has(event.evidenceCeiling)
  ) {
    const clamped = clampToCeiling(
      event.evidenceClass as EvidenceClass,
      event.evidenceCeiling as EvidenceClass,
    );
    if (clamped !== event.evidenceClass) {
      issues.push(
        `evidenceClass "${event.evidenceClass}" exceeds authored evidenceCeiling "${event.evidenceCeiling}"`,
      );
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
      // The migrated legacy reveal is the ONLY case that may carry it today, and
      // the whole surrounding state has to agree that this is migrated history —
      // otherwise `legacyGrading` becomes a place to smuggle a grading verdict
      // onto an event nobody graded.
      if (event.primitive !== "reveal") {
        issues.push(
          "legacyGrading is only accepted on a migrated reveal — a newly created " +
            "non-assessed event must never acquire it",
        );
      }
      if (attributionStatus !== "not_applicable") {
        issues.push(
          "a legacyGrading reveal must carry not_applicable attribution — nothing was graded",
        );
      }
      if (admissionStatus !== "no_evidence") {
        issues.push("a legacyGrading reveal must carry no_evidence admissibility");
      } else {
        const reasons = (admissibility as Record<string, unknown>).reasons;
        if (!Array.isArray(reasons) || !reasons.includes("non_assessed_interaction")) {
          issues.push(
            "a legacyGrading reveal must name non_assessed_interaction as a no-evidence reason",
          );
        }
      }
      if (!isPlainObject(assistance) || assistance.capture !== "legacy_unknown") {
        issues.push(
          "a legacyGrading reveal must carry legacy_unknown assistance — it comes from " +
            "history that recorded none",
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
 * Live-authoring eligibility — a DIFFERENT question from structural validity.
 *
 * `validateLearningEvent` answers "is this a well-formed v3 event?", and it must
 * keep saying yes to migrated history the repository reads back. This answers
 * "may a live caller author this state right now?". Two states fail that
 * question because they exist only to rehydrate pre-v3 history:
 *
 *  - `legacy_admitted` — mastery-bearing, so authoring it live would score an
 *    attempt that never passed through `resolveEvidenceAdmission`;
 *  - `legacyGrading`   — a preserved v1 reveal grading; nothing created today has
 *    a historical grading to preserve.
 *
 * Checked at RUNTIME, not only in the type system: an untyped cast is exactly how
 * this boundary would otherwise be crossed.
 */
function migrationOnlyStateIssues(event: Record<string, unknown>): string[] {
  const issues: string[] = [];
  const admissibility = event.admissibility;
  if (isPlainObject(admissibility) && admissibility.status === "legacy_admitted") {
    issues.push(
      'admissibility "legacy_admitted" is migration-only — a live event must be admitted ' +
        "through resolveEvidenceAdmission (rehydration uses createMigratedLearningEvent)",
    );
  }
  if (event.legacyGrading !== undefined) {
    issues.push(
      "legacyGrading is migration-only — a newly created event has no historical grading " +
        "to preserve",
    );
  }
  return issues;
}

/**
 * The one builder behind both construction modes.
 *
 * Immutability is deep for everything the event OWNS: `itemIds`,
 * `targetTreatments`, `errorTags`, `deviceInfo`, `sync`, `sequence`,
 * `legacyGrading` (and its `errorTags`) are each defensively cloned and frozen.
 * Cloning matters as much as freezing here: the session controller passes ONE
 * shared `deviceInfo` into every event, so freezing the caller's object in place
 * would freeze application state that does not belong to the event. Nothing
 * outside the event is ever frozen.
 *
 * `mode` changes exactly one thing: whether migration-only state is eligible.
 * Structural validation, cloning and freezing are identical, so the historical
 * path can never drift into a weaker contract than the live one.
 */
function buildLearningEvent(
  input: MigratedLearningEventInput,
  mode: "live" | "migration",
): LearningEvent {
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
    assistance: freezeAssistance(input.assistance),
    attribution: freezeAttribution(input.attribution),
    admissibility: freezeAdmissibility(input.admissibility),
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

  // Eligibility first, so a live caller reaching for migration-only state is told
  // exactly that rather than receiving a downstream structural complaint.
  if (mode === "live") {
    const blocked = migrationOnlyStateIssues(event as unknown as Record<string, unknown>);
    if (blocked.length > 0) throw new MigrationOnlyEventStateError(blocked);
  }

  const issues = validateLearningEvent(event);
  if (issues.length > 0) throw new InvalidLearningEventError(issues);

  return Object.freeze(event);
}

/**
 * Build a validated, IMMUTABLE v3 event — the ordinary application boundary.
 *
 * Everything the running app records goes through here: the session controller,
 * the sandbox hook, and any future renderer. Throws
 * {@link MigrationOnlyEventStateError} for historical-only state and
 * {@link InvalidLearningEventError} for anything malformed; either way nothing
 * reaches the append-only log.
 */
export function createLearningEvent(input: LearningEventInput): LearningEvent {
  return buildLearningEvent(input, "live");
}

/**
 * MIGRATION ONLY — build a v3 event while rehydrating pre-v3 persisted history.
 *
 * Imported by ./event-migration.ts and nothing else; `importBoundary.test.ts`
 * pins that. It is the only path allowed to produce `legacy_admitted`
 * admissibility and a preserved `legacyGrading`, and it is NOT re-exported from
 * the learning-engine barrel, so ordinary code cannot reach it by autocomplete.
 *
 * It is not a weaker constructor: the same structural validator, the same
 * defensive cloning and the same deep freeze apply. The only difference is that
 * historical state is eligible here.
 */
export function createMigratedLearningEvent(
  input: MigratedLearningEventInput,
): LearningEvent {
  return buildLearningEvent(input, "migration");
}
