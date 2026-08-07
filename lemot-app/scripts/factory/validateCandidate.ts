/**
 * Content Factory V0 — one stable facade over the validators a candidate must
 * survive, plus a deterministic report.
 *
 * This module adds NO rules. Every check below already existed and, as the L16
 * dry run proved, already accepts an isolated candidate — they all take
 * `readonly Lesson[]`. The only thing missing was one place to call them from
 * and one shape to read the answer out of.
 *
 * CORPUS CONTEXT. `validateJourneyRoleDemandBudgets` is evaluated over
 * `[...shippedLessons, candidate]`, never the candidate alone. JB-004 reports a
 * named exception whose lesson is absent as STALE POLICY, so validating a
 * candidate in isolation would wrongly flag L6's exception. The corpus is
 * supplied rather than the rule weakened. The acquisition-demand drift review
 * also needs the corpus, for a different reason: "first worked here" is only
 * meaningful against the lessons that came before.
 *
 * WHAT THIS CANNOT TELL YOU. Deterministic validation says nothing about
 * whether the French is natural, whether a reading feels like a human moment,
 * whether the register holds, or whether the exit proof convinces. Those stay
 * semantic review. No score is invented for them.
 */
import { reviewAcquisitionDemandDrift } from "../../content/lessons/acquisitionDemandDrift";
import { validateAcquisitionDemands } from "../../content/lessons/acquisitionDemands";
import { validateJourneyRoles } from "../../content/lessons/journeyRoles";
import { validateJourneyRoleDemandBudgets } from "../../content/lessons/journeyRoleDemandBudgets";
import {
  countProductionActions,
  productionActions,
  reviewProductionQuality,
} from "../../content/lessons/productionQuality";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import type { LearningItem, Lesson } from "../../content/lessonTypes";
import { checkCanonRules } from "../canonRules";
import { checkLessonEvidenceRules } from "../lessonEvidenceRules";

export type CandidateFinding = {
  /** Originating rule code, e.g. "AD-001", "JB-002", "PQ-2", "DD-002". */
  code: string;
  source: string;
  message: string;
};

export type CandidateResult = {
  lessonId: string;
  journeyRole: string;
  acquisitionDemandCount: number;
  /** Meaningful production actions, per the canonical shared helper. */
  productionActionCount: number;
  /** Authored support ranks in screen order — lower is less scaffolding. */
  productionSupportRanks: readonly number[];
  journeyRoleBudget: "pass" | "fail";

  blockingErrors: readonly CandidateFinding[];
  warnings: readonly CandidateFinding[];
  authorReview: readonly CandidateFinding[];

  /** True when no blocking validator error remains. */
  candidateValid: boolean;
  /** True when anything advisory surfaced, or sampling policy says look anyway. */
  humanReviewRecommended: boolean;
};

const byCodeThenMessage = (a: CandidateFinding, b: CandidateFinding) =>
  a.code.localeCompare(b.code) || a.message.localeCompare(b.message);

/** Pull a leading rule code such as `AD-001` out of an existing error string. */
function leadingCode(message: string, fallback: string): string {
  const match = /^([A-Z]{2}-\d{3}|[A-Z]{2}-\d)\b/.exec(message);
  return match ? match[1] : fallback;
}

/**
 * Run every deterministic validator a factory candidate must survive.
 *
 * `shippedLessons` supplies corpus context (see the module note) and is never
 * modified; the candidate is not added to any shipped index by calling this.
 */
export function validateFactoryCandidate(args: {
  candidate: Lesson;
  shippedLessons: readonly Lesson[];
  registry?: Readonly<Record<string, LearningItem>>;
}): CandidateResult {
  const { candidate, shippedLessons } = args;
  const registry = args.registry ?? (ITEM_REGISTRY as Readonly<Record<string, LearningItem>>);
  const corpus = [...shippedLessons, candidate];

  const blockingErrors: CandidateFinding[] = [];
  const warnings: CandidateFinding[] = [];
  const authorReview: CandidateFinding[] = [];

  // AD-001..AD-005 — structural coherence of the declaration.
  for (const message of validateAcquisitionDemands([candidate], registry)) {
    blockingErrors.push({ code: leadingCode(message, "AD"), source: "acquisitionDemands", message });
  }

  // JR-001 — the journey role names a canonical value.
  for (const message of validateJourneyRoles([candidate])) {
    blockingErrors.push({ code: leadingCode(message, "JR"), source: "journeyRoles", message });
  }

  // JB-001..JB-004 — over the FULL corpus, so L6's exception stays live.
  const budget = validateJourneyRoleDemandBudgets(corpus);
  const budgetErrors = budget.errors.filter((e) => e.includes(`"${candidate.id}"`));
  for (const message of budgetErrors) {
    blockingErrors.push({ code: leadingCode(message, "JB"), source: "journeyRoleBudget", message });
  }

  // PR-06 evidence metadata + Lesson Flow Canon V3/V4/V5.
  for (const finding of checkLessonEvidenceRules([candidate])) {
    blockingErrors.push({ code: "PR-06", source: "lessonEvidenceRules", message: finding.message });
  }
  for (const finding of checkCanonRules([candidate], registry as never)) {
    const entry = { code: "CANON", source: "canonRules", message: finding.message };
    if (finding.severity === "error") blockingErrors.push(entry);
    else warnings.push(entry);
  }

  // PQ-2 blocks; PQ-3 advises.
  for (const d of reviewProductionQuality([candidate])) {
    const entry = {
      code: d.code,
      source: "productionQuality",
      message: `${d.message}${d.screenIds.length > 0 ? ` [${d.screenIds.join(", ")}]` : ""}`,
    };
    if (d.severity === "error") blockingErrors.push(entry);
    else warnings.push(entry);
  }

  // DD-001..DD-004 — advisory only, and corpus-scoped for "first worked here".
  for (const d of reviewAcquisitionDemandDrift(corpus, registry)) {
    if (d.lessonId !== candidate.id) continue;
    const entry = { code: d.code, source: "acquisitionDemandDrift", message: d.message };
    if (d.severity === "warning") warnings.push(entry);
    else authorReview.push(entry);
  }

  blockingErrors.sort(byCodeThenMessage);
  warnings.sort(byCodeThenMessage);
  authorReview.sort(byCodeThenMessage);

  return {
    lessonId: candidate.id,
    journeyRole: candidate.journeyRole ?? "unset",
    acquisitionDemandCount: candidate.acquisitionDemandItemIds?.length ?? -1,
    productionActionCount: countProductionActions(candidate),
    productionSupportRanks: productionActions(candidate).map((a) => a.supportRank),
    journeyRoleBudget: budgetErrors.length === 0 ? "pass" : "fail",
    blockingErrors,
    warnings,
    authorReview,
    candidateValid: blockingErrors.length === 0,
    humanReviewRecommended: warnings.length > 0 || authorReview.length > 0,
  };
}

/** Stable candidate report. Blockers first, then warnings, then author review. */
export function formatCandidateReport(result: CandidateResult): string {
  const lines = [
    `Candidate ${result.lessonId}`,
    `  journeyRole: ${result.journeyRole}`,
    `  acquisition demands: ${result.acquisitionDemandCount}`,
    `  journey-role budget: ${result.journeyRoleBudget}`,
    `  meaningful production actions: ${result.productionActionCount}` +
      ` (support ranks ${result.productionSupportRanks.join(",") || "none"})`,
  ];
  for (const f of result.blockingErrors) lines.push(`  ERROR ${f.code}: ${f.message}`);
  for (const f of result.warnings) lines.push(`  WARNING ${f.code}: ${f.message}`);
  for (const f of result.authorReview) lines.push(`  AUTHOR-REVIEW ${f.code}: ${f.message}`);
  lines.push(`  candidateValid: ${result.candidateValid ? "yes" : "no"}`);
  lines.push(`  humanReviewRecommended: ${result.humanReviewRecommended ? "yes" : "no"}`);
  lines.push(
    "  note: naturalness, communicative coherence, register and exit-proof conviction" +
      " are NOT checked here and remain semantic review.",
  );
  return lines.join("\n");
}
