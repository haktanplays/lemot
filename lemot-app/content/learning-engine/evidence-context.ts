/**
 * Attempt-level evidence context (PR-03) — pure types + runtime vocabulary.
 *
 * PR-02 reserved three SCALAR seams (`assistance: "not_captured"`,
 * `attribution: "unresolved"`, `admissibility: "unresolved" | "legacy_admitted"`).
 * They marked the right places but cannot tell the truth: one attempt can carry
 * constitutive support AND a hint rung AND a retry AND prior answer exposure at
 * the same time, and flattening that into one string ("assisted", "mixed") loses
 * exactly the distinctions the Mastery & Evidence Bible reasons about. This
 * module replaces them with structured, immutable state — the reason the
 * persisted schema moves to v3.
 *
 * Canonical anchors (Mastery & Evidence Bible v1.0):
 *  - §6 admissibility: six conditions; correctness is NOT admissibility.
 *  - §7 attribution: the error-source classes are EXACTLY EIGHT — learner ·
 *    content · validator · UI-flow · tone · AI-generator · system ·
 *    mastery-mapping. Only a verified learner-sourced error may create weakness.
 *  - FQ-3: assistance scopes the CLAIM, not the existence of the event. An event
 *    with unknown assistance is still admissible; it simply may not establish
 *    independent production.
 *
 * Hard boundaries: types + vocabulary + deep-freeze constructors only. No clock,
 * no storage, no network, no React, no AI, no numeric weights. Resolution logic
 * lives in ./evidence-admission.ts.
 */

// ── Assistance ──────────────────────────────────────────────────────────────

/**
 * Support without which the authored opportunity is INVALID. Constitutive
 * support is not an optional hint the learner reached for — it is part of the
 * task, and it permanently scopes what the attempt can prove.
 */
export type ConstitutiveSupport =
  | "visible_tray"
  | "supplied_package"
  | "formula_card"
  | "immediately_prior_model";

export const CONSTITUTIVE_SUPPORTS = [
  "visible_tray",
  "supplied_package",
  "formula_card",
  "immediately_prior_model",
] as const;

/** Canonical hint ladder (Exercise Canon): 0 none · 1 light cue · 2 stronger cue. */
export type HintRung = 0 | 1 | 2;
export const HINT_RUNGS = [0, 1, 2] as const;

/** Whether the answer/model was already visible before this attempt. */
export type PriorAnswerExposure = "none" | "answer" | "model";
export const PRIOR_ANSWER_EXPOSURES = ["none", "answer", "model"] as const;

/**
 * Accessibility behaviour. Never a negative signal, never weakness, and never a
 * reason on its own to downgrade otherwise independent evidence. Recorded so the
 * later audio pass (PR-11) has real data; PR-03 only fixes the shape.
 */
export type AccessibilitySignals = {
  readonly replayCount: number;
  readonly slowPlayback: boolean;
};

/** How well the assistance at the moment of the attempt is known. */
export type AssistanceCapture = "known" | "unknown" | "legacy_unknown";
export const ASSISTANCE_CAPTURES = ["known", "unknown", "legacy_unknown"] as const;

/**
 * What assistance was present at the EXACT moment of the attempt.
 *
 * `known` carries the full picture; `unknown` (live path that failed to capture)
 * and `legacy_unknown` (migrated history) carry no fabricated detail. Both
 * unknown forms stay admissible and simply cap the claim (FQ-3).
 */
export type AssistanceSnapshot =
  | {
      readonly capture: "known";
      readonly constitutive: readonly ConstitutiveSupport[];
      readonly hintRung: HintRung;
      /** Zero-based: first attempt = 0, second = 1, … */
      readonly retryIndex: number;
      readonly selfCorrection: boolean;
      readonly priorAnswerExposure: PriorAnswerExposure;
      readonly accessibility: AccessibilitySignals;
    }
  | { readonly capture: "unknown" | "legacy_unknown" };

// ── Attribution ─────────────────────────────────────────────────────────────

/**
 * The Canonical EIGHT error/credit sources (Bible §7). This list is closed:
 * audio, network and storage are structured FACETS under `system`, never new
 * top-level sources, and an authored distractor is not a source at all — a
 * malformed one is a `content` defect.
 */
export type AttributionSource =
  | "learner"
  | "content"
  | "validator"
  | "ui_flow"
  | "tone"
  | "ai_generator"
  | "system"
  | "mastery_mapping";

export const ATTRIBUTION_SOURCES = [
  "learner",
  "content",
  "validator",
  "ui_flow",
  "tone",
  "ai_generator",
  "system",
  "mastery_mapping",
] as const;

/** Machine facet codes for a quality incident. No free-form text, ever. */
export type QualityIncidentReason =
  | "content_defect"
  | "malformed_distractor"
  | "validator_defect"
  | "accepted_answer_rejected"
  | "ui_defect"
  | "required_support_missing"
  | "tone_interference"
  | "generator_defect"
  | "unsafe_generated_form"
  | "audio_failure"
  | "network_failure"
  | "storage_failure"
  | "system_failure"
  | "mapping_defect";

export const QUALITY_INCIDENT_REASONS = [
  "content_defect",
  "malformed_distractor",
  "validator_defect",
  "accepted_answer_rejected",
  "ui_defect",
  "required_support_missing",
  "tone_interference",
  "generator_defect",
  "unsafe_generated_form",
  "audio_failure",
  "network_failure",
  "storage_failure",
  "system_failure",
  "mapping_defect",
] as const;

/**
 * Which facets belong to which Canonical source. Audio/network/storage sit under
 * `system` precisely so the eight-source set stays closed.
 */
export const INCIDENT_REASONS_BY_SOURCE: Readonly<
  Record<AttributionSource, readonly QualityIncidentReason[]>
> = Object.freeze({
  learner: [],
  content: ["content_defect", "malformed_distractor"],
  validator: ["validator_defect", "accepted_answer_rejected"],
  ui_flow: ["ui_defect", "required_support_missing"],
  tone: ["tone_interference"],
  ai_generator: ["generator_defect", "unsafe_generated_form"],
  system: ["audio_failure", "network_failure", "storage_failure", "system_failure"],
  mastery_mapping: ["mapping_defect"],
});

/** A concrete non-learner defect implicated in this attempt. */
export type QualityIncident = {
  readonly source: Exclude<AttributionSource, "learner">;
  readonly reason: QualityIncidentReason;
};

/** Whether the response can be attributed to the learner at all (Bible §6.2). */
export type LearnerAuthorship = "verified" | "unresolved" | "not_applicable";
export const LEARNER_AUTHORSHIPS = ["verified", "unresolved", "not_applicable"] as const;

/** Whether the result came from an approved evaluation path (Bible §6.5). */
export type EvaluatorStatus = "approved_deterministic" | "unapproved" | "not_applicable";
export const EVALUATOR_STATUSES = [
  "approved_deterministic",
  "unapproved",
  "not_applicable",
] as const;

/**
 * The authored opportunity + evaluation path behind one attempt. Supplied by the
 * integration layer, never invented by the controller.
 */
export type EvidenceOpportunityContext = {
  readonly authored: boolean;
  readonly prerequisitesSafe: boolean;
  readonly evaluator: EvaluatorStatus;
  readonly learnerAuthorship: LearnerAuthorship;
  /** Support the authored opportunity REQUIRES; absence is a ui_flow defect. */
  readonly requiredConstitutiveSupport: readonly ConstitutiveSupport[];
  readonly qualityIncident: QualityIncident | null;
};

/** Structured attribution outcome. */
export type AttributionState =
  | { readonly status: "resolved"; readonly source: AttributionSource }
  | { readonly status: "unresolved" }
  | { readonly status: "not_applicable" };

export const ATTRIBUTION_STATUSES = ["resolved", "unresolved", "not_applicable"] as const;

// ── Admissibility ───────────────────────────────────────────────────────────

/** Deterministic machine reasons an event may not inform mastery. */
export type AdmissionBlockReason =
  | "opportunity_not_authored"
  | "learner_authorship_unresolved"
  | "prerequisites_unsafe"
  | "evaluator_unapproved"
  | "non_learner_incident"
  | "required_support_missing"
  | "outcome_indeterminate"
  | "admission_context_incomplete";

export const ADMISSION_BLOCK_REASONS = [
  "opportunity_not_authored",
  "learner_authorship_unresolved",
  "prerequisites_unsafe",
  "evaluator_unapproved",
  "non_learner_incident",
  "required_support_missing",
  "outcome_indeterminate",
  "admission_context_incomplete",
] as const;

/** Why an interaction legitimately carries an event but no mastery evidence. */
export type NoEvidenceReason =
  | "non_assessed_interaction"
  | "authored_no_evidence_contract";

export const NO_EVIDENCE_REASONS = [
  "non_assessed_interaction",
  "authored_no_evidence_contract",
] as const;

/** Structured admissibility outcome. `legacy_admitted` is migration-only. */
export type AdmissibilityState =
  | { readonly status: "admitted" }
  | { readonly status: "quarantined"; readonly reasons: readonly AdmissionBlockReason[] }
  | { readonly status: "unresolved"; readonly reasons: readonly AdmissionBlockReason[] }
  | { readonly status: "no_evidence"; readonly reasons: readonly NoEvidenceReason[] }
  | { readonly status: "legacy_admitted"; readonly sourceVersion: 1 | 2 };

export const ADMISSIBILITY_STATUSES = [
  "admitted",
  "quarantined",
  "unresolved",
  "no_evidence",
  "legacy_admitted",
] as const;

/** Statuses whose events may reach the mastery reducer's item-level scoring. */
export const MASTERY_BEARING_ADMISSION_STATUSES: ReadonlySet<string> = new Set([
  "admitted",
  "legacy_admitted",
]);

// ── Deep-freeze constructors ────────────────────────────────────────────────
//
// Same contract as the PR-02 immutability correction: defensive clone THEN
// freeze, so a caller mutating its own input can never reach into a persisted
// event, and no object outside the event is ever frozen on the caller's behalf.

const frozenList = <T>(values: readonly T[]): readonly T[] =>
  Object.freeze([...values]) as readonly T[];

export function freezeAssistance(a: AssistanceSnapshot): AssistanceSnapshot {
  if (a.capture !== "known") return Object.freeze({ capture: a.capture });
  return Object.freeze({
    capture: "known" as const,
    constitutive: frozenList(a.constitutive),
    hintRung: a.hintRung,
    retryIndex: a.retryIndex,
    selfCorrection: a.selfCorrection,
    priorAnswerExposure: a.priorAnswerExposure,
    accessibility: Object.freeze({ ...a.accessibility }),
  });
}

export function freezeAttribution(s: AttributionState): AttributionState {
  return s.status === "resolved"
    ? Object.freeze({ status: "resolved" as const, source: s.source })
    : Object.freeze({ status: s.status });
}

export function freezeAdmissibility(s: AdmissibilityState): AdmissibilityState {
  switch (s.status) {
    case "admitted":
      return Object.freeze({ status: "admitted" as const });
    case "legacy_admitted":
      return Object.freeze({
        status: "legacy_admitted" as const,
        sourceVersion: s.sourceVersion,
      });
    case "no_evidence":
      return Object.freeze({
        status: "no_evidence" as const,
        reasons: frozenList(s.reasons),
      });
    default:
      return Object.freeze({ status: s.status, reasons: frozenList(s.reasons) });
  }
}

/** The assistance snapshot for a path that genuinely captured nothing. */
export const UNKNOWN_ASSISTANCE: AssistanceSnapshot = Object.freeze({
  capture: "unknown" as const,
});
/** The assistance snapshot migration stamps on pre-v3 history. */
export const LEGACY_UNKNOWN_ASSISTANCE: AssistanceSnapshot = Object.freeze({
  capture: "legacy_unknown" as const,
});

// ── Compile-time locks (same idiom as ERROR_TAG_CODES) ──────────────────────

const _constitutiveValid: readonly ConstitutiveSupport[] = CONSTITUTIVE_SUPPORTS;
const _hintValid: readonly HintRung[] = HINT_RUNGS;
const _exposureValid: readonly PriorAnswerExposure[] = PRIOR_ANSWER_EXPOSURES;
const _captureValid: readonly AssistanceCapture[] = ASSISTANCE_CAPTURES;
const _sourcesValid: readonly AttributionSource[] = ATTRIBUTION_SOURCES;
const _reasonsValid: readonly QualityIncidentReason[] = QUALITY_INCIDENT_REASONS;
const _authorshipValid: readonly LearnerAuthorship[] = LEARNER_AUTHORSHIPS;
const _evaluatorValid: readonly EvaluatorStatus[] = EVALUATOR_STATUSES;
const _blockValid: readonly AdmissionBlockReason[] = ADMISSION_BLOCK_REASONS;
const _noEvidenceValid: readonly NoEvidenceReason[] = NO_EVIDENCE_REASONS;
void _constitutiveValid;
void _hintValid;
void _exposureValid;
void _captureValid;
void _sourcesValid;
void _reasonsValid;
void _authorshipValid;
void _evaluatorValid;
void _blockValid;
void _noEvidenceValid;

type MissingConstitutive = Exclude<ConstitutiveSupport, (typeof CONSTITUTIVE_SUPPORTS)[number]>;
type MissingHint = Exclude<HintRung, (typeof HINT_RUNGS)[number]>;
type MissingExposure = Exclude<PriorAnswerExposure, (typeof PRIOR_ANSWER_EXPOSURES)[number]>;
type MissingCapture = Exclude<AssistanceCapture, (typeof ASSISTANCE_CAPTURES)[number]>;
type MissingSources = Exclude<AttributionSource, (typeof ATTRIBUTION_SOURCES)[number]>;
type MissingIncidentReasons = Exclude<
  QualityIncidentReason,
  (typeof QUALITY_INCIDENT_REASONS)[number]
>;
type MissingAuthorship = Exclude<LearnerAuthorship, (typeof LEARNER_AUTHORSHIPS)[number]>;
type MissingEvaluator = Exclude<EvaluatorStatus, (typeof EVALUATOR_STATUSES)[number]>;
type MissingBlock = Exclude<AdmissionBlockReason, (typeof ADMISSION_BLOCK_REASONS)[number]>;
type MissingNoEvidence = Exclude<NoEvidenceReason, (typeof NO_EVIDENCE_REASONS)[number]>;

const _allEvidenceVocabListed: [
  MissingConstitutive extends never ? true : never,
  MissingHint extends never ? true : never,
  MissingExposure extends never ? true : never,
  MissingCapture extends never ? true : never,
  MissingSources extends never ? true : never,
  MissingIncidentReasons extends never ? true : never,
  MissingAuthorship extends never ? true : never,
  MissingEvaluator extends never ? true : never,
  MissingBlock extends never ? true : never,
  MissingNoEvidence extends never ? true : never,
] = [true, true, true, true, true, true, true, true, true, true];
void _allEvidenceVocabListed;
