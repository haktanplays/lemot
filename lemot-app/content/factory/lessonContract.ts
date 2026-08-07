/**
 * Content Factory V0 — the lesson contract and its pre-flight check.
 *
 * A `LessonContract` is THE BOUNDED GENERATION INPUT FOR ONE LESSON. That is
 * all it is. It is not runtime lesson metadata, not a replacement for canon,
 * not a second item registry, not a second acquisition model, and not a
 * serialized copy of a lesson spec. It points generation at an intent that has
 * ALREADY been decided.
 *
 * The point of pre-flight is to answer one question before a single screen is
 * authored: can this lesson be generated without inventing a curriculum
 * decision nobody made? The L16 dry run is why this exists — its spec's chosen
 * reading opens on `Je suis fatigué.` while no `fatigué` identity exists in the
 * registry, so "known-items-only" and the authored line are unsatisfiable
 * together. That is a founder decision, not a generation problem, and the
 * factory must stop rather than quietly swap in a word it does own.
 *
 * Prose stays prose. `authoringBrief`, `prohibited` and `forwardHook` carry
 * real pedagogical meaning that does not survive being flattened into enums —
 * the dry run showed roughly half the necessary inputs are of that kind.
 */
import { ITEM_REGISTRY } from "../itemRegistry";
import { validateAcquisitionDemands } from "../lessons/acquisitionDemands";
import {
  JOURNEY_ROLE_DEMAND_BANDS,
  JOURNEY_ROLE_DEMAND_EXCEPTIONS,
} from "../lessons/journeyRoleDemandBudgets";
import type {
  JourneyRole,
  LearningItem,
  Lesson,
  LessonArchetype,
} from "../lessonTypes";

/** A canonical decision the contract itself records as unresolved. */
export type OpenDecision = {
  /** Short stable handle, e.g. "L16-FATIGUE-IDENTITY". */
  code: string;
  description: string;
};

export type LessonContract = {
  // ── identity ────────────────────────────────────────────────────────────
  lessonId: string;
  number: number;
  version: "v1";

  // ── pedagogical intent (decided before the contract, never by generation)
  canDo: string;
  whyItExists: string;
  primaryArchetype: LessonArchetype;
  secondaryArchetype?: LessonArchetype;
  /** Omitted only for a pre-curriculum lesson such as L0. */
  journeyRole?: JourneyRole;

  // ── acquisition ─────────────────────────────────────────────────────────
  /** The lesson's new demands. `[]` means adjudicated zero. */
  acquisitionDemandItemIds: readonly string[];
  /** Owned material the lesson is expected to recombine. */
  recycledItemIds: readonly string[];
  /** Declared only where the spec actually says so. */
  supportedItemIds?: readonly string[];
  recognitionItemIds?: readonly string[];

  // ── scope ───────────────────────────────────────────────────────────────
  /**
   * Every canonical identity the authored content REQUIRES. This is the field
   * that catches the `fatigué` class of blocker: if the intended French needs
   * an identity, name it here and pre-flight will refuse to proceed without it.
   */
  requiredItemIds: readonly string[];
  /** Deferred language and structures, as prose. Generation must not use these. */
  prohibited: readonly string[];

  // ── continuity / prose guidance ─────────────────────────────────────────
  authoringBrief: string;
  forwardHook?: string;

  /** Unresolved canonical choices. Any entry blocks generation-readiness. */
  openDecisions?: readonly OpenDecision[];
};

export type PreflightSeverity = "blocker" | "founder-decision";

export type PreflightDiagnostic = {
  code: "CF-001" | "CF-002" | "CF-003" | "CF-004" | "CF-005";
  severity: PreflightSeverity;
  lessonId: string;
  subject: string;
  message: string;
};

export type PreflightResult = {
  lessonId: string;
  journeyRole: JourneyRole | undefined;
  acquisitionDemandCount: number;
  /** Required identities that exist / were named. */
  requiredIdentitiesPresent: number;
  requiredIdentitiesNamed: number;
  missingIdentities: readonly string[];
  diagnostics: readonly PreflightDiagnostic[];
  /**
   * True only when nothing blocks and no founder decision is outstanding.
   *
   * DISTINCT from candidate validity: a generated lesson can pass every
   * deterministic validator while its contract was never generation-ready —
   * that is exactly what happened when the L16 dry run substituted an owned
   * line for the missing one.
   */
  generationReady: boolean;
};

/**
 * Every declared role bucket an identity may appear in, for the CF-004 check.
 * Only buckets the contract actually declares are considered.
 */
function roleBuckets(contract: LessonContract): [string, readonly string[]][] {
  const buckets: [string, readonly string[]][] = [
    ["acquisition demand", contract.acquisitionDemandItemIds],
    ["recycled", contract.recycledItemIds],
  ];
  if (contract.supportedItemIds !== undefined) {
    buckets.push(["supported", contract.supportedItemIds]);
  }
  if (contract.recognitionItemIds !== undefined) {
    buckets.push(["recognition-only", contract.recognitionItemIds]);
  }
  return buckets;
}

/**
 * A minimal synthetic lesson used ONLY to reuse the real AD-001/AD-003/AD-004
 * rules against a contract. It is never returned, never validated as content,
 * and exists so this module does not reimplement acquisition semantics.
 *
 * AD-002 (duplicates) and AD-005 (reachability) are excluded on purpose: the
 * probe screen references every demand, so AD-005 cannot fire, and duplicate
 * detection belongs to CF-004's stronger cross-bucket check.
 */
function acquisitionProbe(contract: LessonContract): Lesson {
  return {
    id: contract.lessonId,
    acquisitionDemandItemIds: contract.acquisitionDemandItemIds,
    learningItems: [],
    screens: [
      {
        id: "cf-probe",
        type: "meet-card",
        targetItemIds: [...contract.acquisitionDemandItemIds],
        payload: { fr: "" },
      },
    ],
  } as unknown as Lesson;
}

/**
 * CF-001..CF-005 over one contract. Pure; nothing is mutated or substituted.
 *
 * CF-001 a required canonical identity does not exist · CF-002 an illegal
 * acquisition demand (reusing AD semantics) · CF-003 the demands cannot satisfy
 * the journey-role band · CF-004 an identity is declared in two roles at once ·
 * CF-005 the contract records an unresolved founder decision.
 */
export function preflightLessonContract(args: {
  contract: LessonContract;
  registry?: Readonly<Record<string, LearningItem>>;
}): PreflightResult {
  const { contract } = args;
  const registry = args.registry ?? (ITEM_REGISTRY as Readonly<Record<string, LearningItem>>);
  const diagnostics: PreflightDiagnostic[] = [];
  const lessonId = contract.lessonId;

  // CF-001 — every identity the authored content requires must already exist.
  // No substitution, ever: swapping in an owned word changes lesson intent.
  const missing = [...new Set(contract.requiredItemIds)]
    .filter((id) => registry[id] === undefined)
    .sort();
  for (const id of missing) {
    diagnostics.push({
      code: "CF-001",
      severity: "blocker",
      lessonId,
      subject: id,
      message:
        `required canonical identity "${id}" does not exist in the registry. ` +
        `Create it as a founder decision, or change the authored intent — the factory ` +
        `must not substitute a different owned identity.`,
    });
  }

  // CF-002 — reuse the real acquisition-demand rules rather than restating them.
  for (const error of validateAcquisitionDemands([acquisitionProbe(contract)], registry)) {
    if (error.startsWith("AD-002") || error.startsWith("AD-005")) continue;
    diagnostics.push({
      code: "CF-002",
      severity: "blocker",
      lessonId,
      subject: "acquisitionDemandItemIds",
      message: `illegal acquisition demand — ${error}`,
    });
  }

  // CF-003 — the declared demands must fit the role's band, using the same
  // band source and the same named-exception policy as JB-002/JB-003.
  const role = contract.journeyRole;
  const count = contract.acquisitionDemandItemIds.length;
  if (role !== undefined) {
    const exception = JOURNEY_ROLE_DEMAND_EXCEPTIONS[lessonId];
    if (exception !== undefined && exception.expectedRole === role) {
      const allowed = [...exception.allowedDemandItemIds].sort().join(",");
      const declared = [...contract.acquisitionDemandItemIds].sort().join(",");
      if (allowed !== declared) {
        diagnostics.push({
          code: "CF-003",
          severity: "blocker",
          lessonId,
          subject: "journeyRole",
          message:
            `"${lessonId}" may declare exactly [${exception.allowedDemandItemIds.join(", ")}] ` +
            `under its named exception, but the contract declares [${contract.acquisitionDemandItemIds.join(", ")}]`,
        });
      }
    } else {
      const band = JOURNEY_ROLE_DEMAND_BANDS[role];
      if (count < band.min || count > band.max) {
        const expected = band.min === band.max ? `${band.min}` : `${band.min}-${band.max}`;
        diagnostics.push({
          code: "CF-003",
          severity: "blocker",
          lessonId,
          subject: "journeyRole",
          message:
            `journeyRole "${role}" allows ${expected} acquisition demand(s) but the contract declares ${count}`,
        });
      }
    }
  }

  // CF-004 — one identity, one declared role.
  const buckets = roleBuckets(contract);
  const seenIn = new Map<string, string[]>();
  for (const [label, ids] of buckets) {
    for (const id of new Set(ids)) {
      seenIn.set(id, [...(seenIn.get(id) ?? []), label]);
    }
  }
  for (const [id, labels] of [...seenIn.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    if (labels.length < 2) continue;
    diagnostics.push({
      code: "CF-004",
      severity: "blocker",
      lessonId,
      subject: id,
      message: `"${id}" is declared as ${labels.join(" AND ")} — an identity carries one contractual role`,
    });
  }

  // CF-005 — the contract itself says a canonical choice is open.
  for (const decision of contract.openDecisions ?? []) {
    diagnostics.push({
      code: "CF-005",
      severity: "founder-decision",
      lessonId,
      subject: decision.code,
      message: decision.description,
    });
  }

  diagnostics.sort(
    (a, b) => a.code.localeCompare(b.code) || a.subject.localeCompare(b.subject),
  );

  const named = new Set(contract.requiredItemIds).size;
  return {
    lessonId,
    journeyRole: role,
    acquisitionDemandCount: count,
    requiredIdentitiesNamed: named,
    requiredIdentitiesPresent: named - missing.length,
    missingIdentities: missing,
    diagnostics,
    generationReady: diagnostics.length === 0,
  };
}

/** Stable one-lesson pre-flight summary. Structured data in, plain text out. */
export function formatPreflightReport(result: PreflightResult): string {
  const lines = [
    `Pre-flight ${result.lessonId}`,
    `  journeyRole: ${result.journeyRole ?? "unset"}`,
    `  acquisition demands: ${result.acquisitionDemandCount}`,
    `  required identities: ${result.requiredIdentitiesPresent}/${result.requiredIdentitiesNamed} present`,
  ];
  if (result.missingIdentities.length > 0) {
    lines.push(`  missing: ${result.missingIdentities.join(", ")}`);
  }
  // Blockers before founder decisions; diagnostics are already code-sorted.
  const blockers = result.diagnostics.filter((d) => d.severity === "blocker");
  const founder = result.diagnostics.filter((d) => d.severity === "founder-decision");
  for (const d of blockers) lines.push(`  BLOCKER ${d.code} ${d.subject}: ${d.message}`);
  for (const d of founder) lines.push(`  FOUNDER-DECISION ${d.code} ${d.subject}: ${d.message}`);
  lines.push(`  generationReady: ${result.generationReady ? "yes" : "no"}`);
  return lines.join("\n");
}
