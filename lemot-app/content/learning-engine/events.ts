/**
 * Learning-engine event types (P1.1) — pure types, no runtime.
 *
 * The append-only `LearningEvent` is the spine of the Founder Self-Learning
 * Build: everything downstream (mastery, Mon Lexique, Practice Pool, Daily
 * Review, dashboard analytics) is a PROJECTION of the event log, never primary
 * state. This file defines the event shape and the deterministic grading
 * outcome vocabulary (`ErrorTagCode`) only — no storage, no repository, no
 * reducer, no UI. Those land in later steps (P1.2 LocalRepository, P2 grade /
 * mastery).
 *
 * Hard boundaries (P1.1):
 *  - Types only. No runtime side effects, no `Date.now()`, no storage, no
 *    network, no React, no AI.
 *  - Reuses `ItemId` / `OperationId` / `PromptFadeLevel` from ./types.ts.
 *
 * `ErrorTagCode` is the GRADING outcome vocabulary (per the architecture note
 * §7 / the Sprint13 SW.1 workstream). It is intentionally distinct from the
 * validator's `FindingCode` (content authoring) in ./types.ts — they describe
 * different things (a learner's answer vs. a content defect).
 */
import type { ItemId, OperationId, PromptFadeLevel } from "./types";

/**
 * Deterministic grading outcome for a single learner answer. One code is the
 * PRIMARY `result`; additional cheap signals may ride along in `errorTags`.
 * `meaning_shift` / `incorrect_but_understandable` are deliberately COARSE
 * fallback heuristics — the only codes a future AI layer may later refine,
 * never override (deterministic engine first). Computed by P2's `grade()`.
 */
export type ErrorTagCode =
  | "correct"
  | "accepted_variant"
  | "punctuation_only"
  | "accent_only"
  | "spelling_near_miss"
  | "wrong_item"
  | "wrong_order"
  | "missing_word"
  | "extra_word"
  | "wrong_register"
  | "meaning_shift"
  | "blocked_form_used"
  | "recognition_only_form_used"
  | "overproduction_unseen_form"
  | "incorrect_but_understandable"
  | "empty_or_skip";

/**
 * Runtime mirror of `ErrorTagCode` (YASA 3 rails). Both directions are
 * compile-time locked below: removing a code from the type breaks the
 * array's element check; removing it from the array breaks the
 * exhaustiveness check. The shipped-error-tags manifest freezes these
 * values forever — learner evidence references them by string.
 */
export const ERROR_TAG_CODES = [
  "correct",
  "accepted_variant",
  "punctuation_only",
  "accent_only",
  "spelling_near_miss",
  "wrong_item",
  "wrong_order",
  "missing_word",
  "extra_word",
  "wrong_register",
  "meaning_shift",
  "blocked_form_used",
  "recognition_only_form_used",
  "overproduction_unseen_form",
  "incorrect_but_understandable",
  "empty_or_skip",
] as const;

// Every array member is a valid ErrorTagCode…
const _codesAreValid: readonly ErrorTagCode[] = ERROR_TAG_CODES;
void _codesAreValid;
// …and every ErrorTagCode is in the array (exhaustive).
type MissingErrorTagCodes = Exclude<ErrorTagCode, (typeof ERROR_TAG_CODES)[number]>;
const _allCodesListed: MissingErrorTagCodes extends never ? true : never = true;
void _allCodesListed;

// ── Envelope v2 vocabulary (PR-02) ──────────────────────────────────────────
//
// v2 extends the ONE spine so the log can honestly represent non-assessed
// interactions (exposure, reveal, self-report, issue reports) and open
// production, without a parallel attempt model and without storing a fake
// `correct` for something that was never graded. `ERROR_TAG_CODES` above is
// FROZEN (YASA 3) and is deliberately NOT where the new outcome vocabulary
// lives — grading facets and interaction outcomes are different questions.

/** Current envelope version. Absent on persisted data ⇒ v1 (ADR-0014 / K1). */
export const LEARNING_EVENT_SCHEMA_VERSION = 2;

/**
 * The six shared semantic primitives. Deliberately NOT one type per exercise
 * variation — an EV is carried as a field (`evId`), not as an event type.
 * Audio playback and sequence membership are facets; skip is an outcome.
 */
export type LearningEventPrimitive =
  | "exposure"
  | "selection"
  | "production"
  | "self_report"
  | "reveal"
  | "issue_report";

/** Coarse learning surface. Never display copy. */
export type LearningPlacement =
  | "lesson_path"
  | "practice_hub"
  | "return_review"
  | "audio_layer"
  | "flashcard_projection"
  | "cross_surface_validation"
  /** The flag-gated learning-engine fixture path — the only emitter today. */
  | "engine_fixture_sandbox"
  /** Migrated v1 data: the surface was never recorded and must not be guessed. */
  | "legacy_unknown";

/**
 * Authored curriculum treatment of ONE required target. Authored, never
 * mutated by learner performance and never inferred from a score.
 */
export type CurriculumTreatment =
  | "active"
  | "supported"
  | "recognition"
  | "ghost"
  | "model_reveal"
  | "meta"
  | "legacy_unknown";

/** Approved evidence vocabulary. No numeric weights anywhere. */
export type EvidenceClass =
  | "exposure"
  | "audio_exposure"
  | "recognition"
  | "recall"
  | "controlled_production"
  | "supported_production"
  | "open_production_attempt"
  | "comparison_only"
  | "self_correction"
  | "self_report"
  | "no_mastery_evidence";

/**
 * What happened in the interaction — distinct from `ErrorTagCode`, which stays
 * the deterministic GRADING facet for assessed answers only.
 */
export type LearningOutcome =
  | "correct"
  | "incorrect"
  | "acceptable_variant"
  | "near_miss"
  | "completed_unassessed"
  | "skipped"
  | "abandoned"
  | "system_failure"
  | "indeterminate";

/**
 * Neutral seams reserved for PR-03. They exist so capturing assistance and
 * resolving attribution does NOT force a second persisted-schema redesign:
 * PR-03 widens these unions and replaces the construction defaults with real
 * captured values. They carry no logic and no scoring behaviour here.
 */
export type AssistanceCaptureState = "not_captured";
export type AttributionState = "unresolved";
export type AdmissibilityState =
  /** Not yet resolved — PR-03 decides. */
  | "unresolved"
  /** Migrated v1 data that the v1 reducer already scored; preserved as-is. */
  | "legacy_admitted";

/** Optional sequence membership. Orchestration itself is NOT implemented here. */
export type LearningEventSequence = {
  sequenceId: string;
  parentEventId: string | null;
  stepIndex: number;
  stepCount: number | null;
};

// ── Runtime vocabulary mirrors ──────────────────────────────────────────────
//
// Persisted JSON carries no type information, so the validator needs RUNTIME
// membership sets, not just TypeScript unions. Each array below is locked to its
// union in BOTH directions with the same idiom `ERROR_TAG_CODES` uses: removing
// a value from the type breaks the array's element check, and removing it from
// the array breaks the exhaustiveness check. This is the single home for these
// strings — tests import from here rather than re-declaring them.
//
// `OPERATION_IDS` / `PROMPT_FADE_LEVELS` mirror unions that live in ./types.ts;
// they are declared here (not there) so the event vocabulary has one home and
// ./types.ts stays untouched.
//
// PR-03 widens ASSISTANCE / ATTRIBUTION / ADMISSIBILITY: adding a value to the
// union and to its array is the whole change — the validator needs no edit.

export const LEARNING_EVENT_PRIMITIVES = [
  "exposure",
  "selection",
  "production",
  "self_report",
  "reveal",
  "issue_report",
] as const;

export const LEARNING_PLACEMENTS = [
  "lesson_path",
  "practice_hub",
  "return_review",
  "audio_layer",
  "flashcard_projection",
  "cross_surface_validation",
  "engine_fixture_sandbox",
  "legacy_unknown",
] as const;

export const CURRICULUM_TREATMENTS = [
  "active",
  "supported",
  "recognition",
  "ghost",
  "model_reveal",
  "meta",
  "legacy_unknown",
] as const;

export const EVIDENCE_CLASSES = [
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
] as const;

export const LEARNING_OUTCOMES = [
  "correct",
  "incorrect",
  "acceptable_variant",
  "near_miss",
  "completed_unassessed",
  "skipped",
  "abandoned",
  "system_failure",
  "indeterminate",
] as const;

/** PR-03 widens this. */
export const ASSISTANCE_CAPTURE_STATES = ["not_captured"] as const;
/** PR-03 widens this. */
export const ATTRIBUTION_STATES = ["unresolved"] as const;
/** PR-03 widens this. */
export const ADMISSIBILITY_STATES = ["unresolved", "legacy_admitted"] as const;

export const LEARNING_EVENT_SYNC_STATUSES = ["pending", "synced"] as const;
export const LEARNING_EVENT_SYNC_ORIGINS = ["local"] as const;

export const OPERATION_IDS = [
  "recognition",
  "fill",
  "build",
  "register_switch",
  "context_chain",
  "free_conversation",
  "open_production",
] as const;

export const PROMPT_FADE_LEVELS = ["PF0", "PF1", "PF2", "PF3"] as const;

// Bidirectional compile-time locks: every array member is a valid union member…
const _primitivesValid: readonly LearningEventPrimitive[] = LEARNING_EVENT_PRIMITIVES;
const _placementsValid: readonly LearningPlacement[] = LEARNING_PLACEMENTS;
const _treatmentsValid: readonly CurriculumTreatment[] = CURRICULUM_TREATMENTS;
const _evidenceValid: readonly EvidenceClass[] = EVIDENCE_CLASSES;
const _outcomesValid: readonly LearningOutcome[] = LEARNING_OUTCOMES;
const _assistanceValid: readonly AssistanceCaptureState[] = ASSISTANCE_CAPTURE_STATES;
const _attributionValid: readonly AttributionState[] = ATTRIBUTION_STATES;
const _admissibilityValid: readonly AdmissibilityState[] = ADMISSIBILITY_STATES;
const _syncStatusValid: readonly LearningEventSyncStatus[] = LEARNING_EVENT_SYNC_STATUSES;
const _operationsValid: readonly OperationId[] = OPERATION_IDS;
const _promptLevelsValid: readonly PromptFadeLevel[] = PROMPT_FADE_LEVELS;
void _primitivesValid;
void _placementsValid;
void _treatmentsValid;
void _evidenceValid;
void _outcomesValid;
void _assistanceValid;
void _attributionValid;
void _admissibilityValid;
void _syncStatusValid;
void _operationsValid;
void _promptLevelsValid;

// …and every union member is in its array (exhaustive).
type MissingPrimitives = Exclude<
  LearningEventPrimitive,
  (typeof LEARNING_EVENT_PRIMITIVES)[number]
>;
type MissingPlacements = Exclude<LearningPlacement, (typeof LEARNING_PLACEMENTS)[number]>;
type MissingTreatments = Exclude<CurriculumTreatment, (typeof CURRICULUM_TREATMENTS)[number]>;
type MissingEvidence = Exclude<EvidenceClass, (typeof EVIDENCE_CLASSES)[number]>;
type MissingOutcomes = Exclude<LearningOutcome, (typeof LEARNING_OUTCOMES)[number]>;
type MissingAssistance = Exclude<
  AssistanceCaptureState,
  (typeof ASSISTANCE_CAPTURE_STATES)[number]
>;
type MissingAttribution = Exclude<AttributionState, (typeof ATTRIBUTION_STATES)[number]>;
type MissingAdmissibility = Exclude<
  AdmissibilityState,
  (typeof ADMISSIBILITY_STATES)[number]
>;
type MissingSyncStatus = Exclude<
  LearningEventSyncStatus,
  (typeof LEARNING_EVENT_SYNC_STATUSES)[number]
>;
type MissingOperations = Exclude<OperationId, (typeof OPERATION_IDS)[number]>;
type MissingPromptLevels = Exclude<PromptFadeLevel, (typeof PROMPT_FADE_LEVELS)[number]>;

const _allListed: [
  MissingPrimitives extends never ? true : never,
  MissingPlacements extends never ? true : never,
  MissingTreatments extends never ? true : never,
  MissingEvidence extends never ? true : never,
  MissingOutcomes extends never ? true : never,
  MissingAssistance extends never ? true : never,
  MissingAttribution extends never ? true : never,
  MissingAdmissibility extends never ? true : never,
  MissingSyncStatus extends never ? true : never,
  MissingOperations extends never ? true : never,
  MissingPromptLevels extends never ? true : never,
] = [true, true, true, true, true, true, true, true, true, true, true];
void _allListed;

/** Grading facets a v1 reveal carried before the PR-02 correction, kept for recovery. */
export type LegacyGrading = {
  result: ErrorTagCode;
  errorTags: readonly ErrorTagCode[];
};

/** Local sync state of an event. Remote phase (P6/P7) drains "pending". */
export type LearningEventSyncStatus = "pending" | "synced";

/** Minimal device / build provenance captured with each event. */
export type DeviceInfo = {
  platform: string;
  osVersion?: string;
  expoRuntime?: string;
};

/** Per-event local sync metadata. `origin` is "local" for device-emitted events. */
export type LearningEventSync = {
  status: LearningEventSyncStatus;
  origin: "local";
  queuedAt: number;
};

/**
 * Fields every learning event carries, assessed or not. `clientEventId` (a
 * device-generated id) is the idempotency key / spine for offline replay and
 * de-duplicated remote ingestion. `userAnswer` is raw learner text — its storage
 * is a privacy concern disclosed in consent (later phases).
 *
 * `userAnswer` / `expectedAnswer` stay on the BASE (both existed in v1, both
 * nullable): a migrated legacy reveal legitimately carries the authored text it
 * revealed, and dropping it would destroy data. The learner-GRADING facets
 * (`result`, `errorTags`, `normalizedAnswer`) live only on the assessed arm.
 */
export type LearningEventBase = {
  /** Always {@link LEARNING_EVENT_SCHEMA_VERSION} on newly created events. */
  schemaVersion: number;
  clientEventId: string;
  sessionId: string;
  lessonId: string;
  exerciseId: string;
  operation: OperationId;
  itemIds: readonly ItemId[];
  promptLevel: PromptFadeLevel;
  attemptNumber: number;
  userAnswer: string | null;
  expectedAnswer: string | null;
  timestamp: number;
  contentVersion: string;
  appBuild: string;
  deviceInfo: DeviceInfo;
  sync: LearningEventSync;

  // ── v2 semantic dimensions ───────────────────────────────────────────────
  primitive: LearningEventPrimitive;
  placement: LearningPlacement;
  /** Exercise variation (`EV-###`), or null when genuinely unknown (migrated v1). */
  evId: string | null;
  /** Authored payload/exercise instance identity, or null when unknown. */
  payloadId: string | null;
  /** Validated `sent:lNN-…` identity when the interaction has one. */
  sentenceId: string | null;
  /**
   * Authored treatment PER required target, index-aligned with `itemIds` and
   * length-validated. An explicit per-item array rather than one treatment for
   * the whole event, so a mixed-treatment payload can never be flattened.
   */
  targetTreatments: readonly CurriculumTreatment[];
  /** The payload's authored strongest allowed claim (immutable at runtime). */
  evidenceCeiling: EvidenceClass;
  /** What THIS interaction may support. PR-03/PR-04 narrow it further. */
  evidenceClass: EvidenceClass;
  outcome: LearningOutcome;
  /** PR-03 seams — neutral here (see the type docs). */
  assistance: AssistanceCaptureState;
  attribution: AttributionState;
  admissibility: AdmissibilityState;
  sequence: LearningEventSequence | null;
};

/**
 * An assessed attempt: the learner produced or selected something and the
 * deterministic grader ran. `result` (one code) drives the mastery reducer;
 * `errorTags` (many) feed analytics.
 */
export type AssessedLearningEvent = LearningEventBase & {
  assessed: true;
  normalizedAnswer: string | null;
  result: ErrorTagCode;
  errorTags: readonly ErrorTagCode[];
  legacyGrading?: undefined;
};

/**
 * A non-assessed interaction: exposure, reveal, self-report, issue report, or
 * an ungraded open-production attempt (W1). The grading facets are absent by
 * CONSTRUCTION — there is no place to put a fake `correct`.
 */
export type NonAssessedLearningEvent = LearningEventBase & {
  assessed: false;
  normalizedAnswer?: undefined;
  result?: undefined;
  errorTags?: undefined;
  /**
   * Only set by migration, only for a v1 reveal that carried a fabricated
   * `result: "correct"`. Preserved verbatim for recovery; never read by the
   * mastery reducer.
   */
  legacyGrading?: LegacyGrading;
};

/** One immutable, append-only learning event — ONE spine, two honest arms. */
export type LearningEvent = AssessedLearningEvent | NonAssessedLearningEvent;

/**
 * The fields a caller supplies before the local repository stamps the
 * append-only bookkeeping (`clientEventId`, `timestamp`, `sync`). Distributed
 * over the union so each arm keeps its own grading shape.
 */
export type LearningEventDraft =
  | Omit<AssessedLearningEvent, "clientEventId" | "timestamp" | "sync">
  | Omit<NonAssessedLearningEvent, "clientEventId" | "timestamp" | "sync">;

/** Narrow to the assessed arm — the only events the mastery reducer may score. */
export function isAssessedEvent(
  event: LearningEvent,
): event is AssessedLearningEvent {
  return event.assessed === true;
}
