/**
 * Evidence admission + assistance scoping (PR-03) — pure and deterministic.
 *
 * Answers three questions for one attempt, in order:
 *   1. Who or what is the result attributable to?   → AttributionState
 *   2. May it inform mastery at all?                → AdmissibilityState
 *   3. What may it prove?                           → EvidenceClass
 *
 * Binding Canonical rules (Mastery & Evidence Bible v1.0):
 *  - §6: admissibility needs all six conditions; **correctness is not
 *    admissibility** — a `correct` result on an inadmissible opportunity is not
 *    positive evidence.
 *  - §7: only a VERIFIED learner-sourced error may create weakness; the seven
 *    non-learner sources never become learner weakness.
 *  - FQ-3: assistance scopes the claim, not the existence. Unknown assistance
 *    stays admissible and simply cannot establish independent production.
 *
 * Hard boundaries: no storage, no clock, no React, no network, no AI, and
 * **no numeric weights** — every rule below is categorical. This module decides
 * admission and the evidence CLASS; how admitted supported evidence changes the
 * mastery snapshot remains PR-04's question.
 */
import type { EvidenceClass, LearningEventPrimitive } from "./events";
import type {
  AdmissibilityState,
  AdmissionBlockReason,
  AssistanceSnapshot,
  AttributionState,
  EvidenceOpportunityContext,
} from "./evidence-context";
import { freezeAdmissibility, freezeAttribution } from "./evidence-context";
import type { CurriculumTreatment } from "./events";

export type AdmissionInput = {
  readonly assessed: boolean;
  readonly primitive: LearningEventPrimitive;
  readonly evidenceCeiling: EvidenceClass;
  readonly targetTreatments: readonly CurriculumTreatment[];
  readonly assistance: AssistanceSnapshot;
  readonly opportunity: EvidenceOpportunityContext;
};

export type AdmissionResult = {
  readonly attribution: AttributionState;
  readonly admissibility: AdmissibilityState;
  readonly evidenceClass: EvidenceClass;
};

/**
 * What each authored ceiling may yield. Deliberately a MAP, not a scalar
 * ordering: "recognition" and "controlled_production" are not points on one
 * scale, and inventing a rank would smuggle in a weighting the founder never
 * ratified. `no_mastery_evidence` is reachable from every ceiling.
 */
const CEILING_ALLOWS: Readonly<Record<EvidenceClass, readonly EvidenceClass[]>> =
  Object.freeze({
    recall: ["recall", "supported_production", "self_correction", "no_mastery_evidence"],
    controlled_production: [
      "controlled_production",
      "supported_production",
      "self_correction",
      "no_mastery_evidence",
    ],
    supported_production: [
      "supported_production",
      "self_correction",
      "no_mastery_evidence",
    ],
    recognition: ["recognition", "no_mastery_evidence"],
    exposure: ["exposure", "no_mastery_evidence"],
    audio_exposure: ["audio_exposure", "exposure", "no_mastery_evidence"],
    comparison_only: ["comparison_only", "no_mastery_evidence"],
    open_production_attempt: [
      "open_production_attempt",
      "comparison_only",
      "no_mastery_evidence",
    ],
    self_correction: ["self_correction", "no_mastery_evidence"],
    self_report: ["self_report", "no_mastery_evidence"],
    no_mastery_evidence: ["no_mastery_evidence"],
  });

/** Evidence classes that assert an INDEPENDENT production claim. */
const INDEPENDENT_PRODUCTION: ReadonlySet<EvidenceClass> = new Set<EvidenceClass>([
  "recall",
  "controlled_production",
]);

/** Classes that carry a mastery claim at all (used by validation + the reducer gate). */
export const MASTERY_BEARING_EVIDENCE: ReadonlySet<EvidenceClass> = new Set<EvidenceClass>([
  "recall",
  "controlled_production",
  "supported_production",
  "recognition",
  "self_correction",
]);

/** Clamp an observation to what the authored ceiling permits. */
export function clampToCeiling(
  observation: EvidenceClass,
  ceiling: EvidenceClass,
): EvidenceClass {
  const allowed = CEILING_ALLOWS[ceiling];
  if (!allowed) return "no_mastery_evidence";
  if (allowed.includes(observation)) return observation;
  // Prefer the strongest still-permitted fallback that does not overclaim.
  if (allowed.includes("supported_production") && INDEPENDENT_PRODUCTION.has(observation)) {
    return "supported_production";
  }
  return "no_mastery_evidence";
}

/** True when the assistance snapshot forbids an independent production claim. */
export function assistanceBlocksIndependentProduction(a: AssistanceSnapshot): boolean {
  if (a.capture !== "known") return true; // FQ-3: unknown never establishes independence
  return (
    a.constitutive.length > 0 ||
    a.hintRung > 0 ||
    a.retryIndex > 0 ||
    a.selfCorrection ||
    a.priorAnswerExposure !== "none"
  );
}

/**
 * Scope an authored ceiling down to what THIS attempt may actually prove.
 *
 * Accessibility (replay / slow playback) is deliberately absent from every rule:
 * it is never a negative signal and never downgrades otherwise independent
 * evidence.
 */
export function scopeEvidenceClass(input: {
  readonly assessed: boolean;
  readonly primitive: LearningEventPrimitive;
  readonly evidenceCeiling: EvidenceClass;
  readonly targetTreatments: readonly CurriculumTreatment[];
  readonly assistance: AssistanceSnapshot;
  readonly admitted: boolean;
}): EvidenceClass {
  // A non-admitted event proves nothing, however correct it looked (Bible §6).
  if (!input.admitted) return "no_mastery_evidence";

  const ceiling = input.evidenceCeiling;

  // Non-production ceilings are not touched by production assistance rules —
  // assistance must never silently turn recognition into production, or upgrade
  // an ungraded open attempt.
  if (
    ceiling === "recognition" ||
    ceiling === "exposure" ||
    ceiling === "audio_exposure" ||
    ceiling === "comparison_only" ||
    ceiling === "open_production_attempt" ||
    ceiling === "self_report" ||
    ceiling === "no_mastery_evidence"
  ) {
    return clampToCeiling(ceiling, ceiling);
  }

  const a = input.assistance;

  // An explicit revision step is its own evidence class — never independent
  // first-pass production, and never "controlled production" for a copied answer.
  if (a.capture === "known" && a.selfCorrection) {
    return clampToCeiling("self_correction", ceiling);
  }
  if (a.capture === "known" && a.priorAnswerExposure !== "none") {
    // The answer/model was already visible: this cannot be independent, and
    // outside an authored self-correction flow it proves nothing.
    return clampToCeiling("supported_production", ceiling);
  }

  const supportedTarget = input.targetTreatments.some(
    (t) => t === "supported" || t === "legacy_unknown",
  );
  if (supportedTarget || assistanceBlocksIndependentProduction(a)) {
    return clampToCeiling("supported_production", ceiling);
  }

  return clampToCeiling(ceiling, ceiling);
}

/**
 * Resolve attribution + admissibility + the final evidence class for one attempt.
 *
 * Non-assessed interactions short-circuit: nothing was graded, so attribution is
 * not applicable and admissibility is `no_evidence`.
 */
export function resolveEvidenceAdmission(input: AdmissionInput): AdmissionResult {
  const { opportunity: ctx } = input;

  if (!input.assessed) {
    return Object.freeze({
      attribution: freezeAttribution({ status: "not_applicable" }),
      admissibility: freezeAdmissibility({
        status: "no_evidence",
        reasons: ["non_assessed_interaction"],
      }),
      evidenceClass: clampToCeiling(input.evidenceCeiling, input.evidenceCeiling),
    });
  }

  const blocks: AdmissionBlockReason[] = [];
  if (!ctx.authored) blocks.push("opportunity_not_authored");
  if (!ctx.prerequisitesSafe) blocks.push("prerequisites_unsafe");
  if (ctx.evaluator !== "approved_deterministic") blocks.push("evaluator_unapproved");

  // A required support that was not actually rendered is a UI-flow defect: the
  // learner was asked for something the authored opportunity never gave them.
  const presentSupport =
    input.assistance.capture === "known" ? input.assistance.constitutive : null;
  const missingSupport =
    presentSupport === null
      ? [] // unknown capture cannot prove absence — do not invent a defect
      : ctx.requiredConstitutiveSupport.filter((s) => !presentSupport.includes(s));
  if (missingSupport.length > 0) blocks.push("required_support_missing");

  const incident = ctx.qualityIncident;
  if (incident) blocks.push("non_learner_incident");

  // Authorship decides WHO, so it is handled after the defect scan: a concrete
  // non-learner defect outranks an unresolved learner question.
  const authorshipUnresolved = ctx.learnerAuthorship !== "verified";
  if (authorshipUnresolved) blocks.push("learner_authorship_unresolved");

  let attribution: AttributionState;
  let admissibility: AdmissibilityState;

  if (incident) {
    // A concrete non-learner source exists → it owns the result, never the learner.
    attribution = { status: "resolved", source: incident.source };
    admissibility = { status: "quarantined", reasons: blocks };
  } else if (missingSupport.length > 0) {
    attribution = { status: "resolved", source: "ui_flow" };
    admissibility = { status: "quarantined", reasons: blocks };
  } else if (!ctx.authored || !ctx.prerequisitesSafe || ctx.evaluator !== "approved_deterministic") {
    // The opportunity itself is defective, but no single source is implicated:
    // do not guess a culprit.
    attribution = { status: "unresolved" };
    admissibility = { status: "quarantined", reasons: blocks };
  } else if (authorshipUnresolved) {
    attribution = { status: "unresolved" };
    admissibility = { status: "unresolved", reasons: blocks };
  } else {
    // All six admissibility conditions hold. Note that unknown ASSISTANCE does
    // not appear here — per FQ-3 it scopes the claim below, it does not block.
    attribution = { status: "resolved", source: "learner" };
    admissibility = { status: "admitted" };
  }

  const admitted = admissibility.status === "admitted";
  const evidenceClass = scopeEvidenceClass({
    assessed: input.assessed,
    primitive: input.primitive,
    evidenceCeiling: input.evidenceCeiling,
    targetTreatments: input.targetTreatments,
    assistance: input.assistance,
    admitted,
  });

  return Object.freeze({
    attribution: freezeAttribution(attribution),
    admissibility: freezeAdmissibility(admissibility),
    evidenceClass,
  });
}
