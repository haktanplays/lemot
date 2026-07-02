/**
 * Carryover Selector v0 (spec §65.6) — pure, deterministic, RN-free.
 *
 * Selects which OLD chips may return inside a lesson, from candidates whose
 * Lexique Memory state was already derived (Faz 4B `deriveLexiqueMemory`).
 * This is the module that produces the query-time `recycled` ROLE — it never
 * writes anything back: lifecycle stays intrinsic, mastery stays frozen
 * (spec §65.5: "recycled is a query-time carryover role produced by the
 * Carryover Selector, not a stored mastery mutation").
 *
 * v0 scope decisions (locked for this phase):
 *  - Lesson `contextTags` are EXPLICIT CALLER INPUT. The selector never
 *    parses lesson files, registry, screen text, or UI content to infer
 *    context. Empty lessonContextTags → fail-closed (nothing context-fits).
 *  - `now` is an explicit argument (house rule; needed for the
 *    too-recent-and-strong exclusion). No Date.now().
 *  - Sentence-level caps (recycled/exposure/weak "per sentence") are applied
 *    at the selection-unit level in v0 — the Sentence Builder does not exist
 *    yet, so one selection = one screen/sentence unit.
 *  - clutterPenalty from the §65.6 priority formula is 0 in v0: the hard
 *    caps ARE the clutter control.
 *  - Zero lesson targets → zero carryover ("Recycle cannot steal the
 *    lesson" has nothing to protect; fail-closed).
 *
 * Hard boundaries (house pattern): pure functions only — no storage, no
 * React, no network, no AI, no repository, no mutation of inputs. Same
 * inputs → same selection.
 */
import type { LexiqueMemoryState } from "./lexique-memory";
import {
  RECENT_USE_DAYS,
  REFRESH_DUE_THRESHOLD,
  TARGET_LOAD_MIN_SHARE,
  daysBetween,
} from "./lexique-memory";

// ── Budget defaults (spec §65.3 / §65.6) ────────────────────────────────────

export const DEFAULT_MAX_VISIBLE_CARRYOVER_CHIPS = 3;
export const DEFAULT_MAX_RECYCLED_ITEMS_PER_SENTENCE = 2;
export const DEFAULT_MAX_EXPOSURE_ITEMS_PER_UNIT = 2;
export const DEFAULT_MAX_WEAK_ITEMS_PER_SENTENCE = 1;

// ── Types ───────────────────────────────────────────────────────────────────

/** Why a selected old chip is returning (spec §10.3 return modes, v0 subset). */
export type CarryoverRole =
  | "refreshDue"
  | "weaknessReturn"
  | "transferReady"
  | "recentCarryIn";

export type CarryoverCandidate = {
  itemId: string;
  /** Learner-facing surface (caller-resolved; the selector reads no registry). */
  surface: string;
  /** Context tags of the ITEM (caller-resolved). */
  contextTags: string[];
  /** Derived Lexique Memory state for this item (Faz 4B output; read-only). */
  memory: LexiqueMemoryState;
  /** True when the slot this candidate would fill requires production. */
  requiresProduction?: boolean;
  /** Sentence/clause-level chip — never a carryover chip (chip taxonomy). */
  isFullSentenceChip?: boolean;
  /** Known identity split (e.g. noun-cafe vs chunk-un-cafe, spec §55.2). */
  hasIdentityAmbiguity?: boolean;
  /** Candidate is itself one of the lesson's targets. */
  targetOverlap?: boolean;
  /** Introduced/used in the immediately preceding lesson(s) — caller-known
   *  lesson adjacency; not derivable from memory (no lesson ids there). */
  recentCarryIn?: boolean;
};

export type CarryoverSelectionInput = {
  candidates: CarryoverCandidate[];
  /** Lesson context tags — explicit input; empty means nothing fits (v0). */
  lessonContextTags: string[];
  /** The lesson's target item ids — the load the selection must not steal. */
  targetItemIds: string[];
  /** Explicit clock (house rule). Used only for too-recent-and-strong. */
  now: number;
  maxVisibleCarryoverChips?: number;
  maxRecycledItemsPerSentence?: number;
  maxExposureItemsPerUnit?: number;
  maxWeakItemsPerSentence?: number;
  targetLoadMinShare?: number;
};

export type SelectedCarryoverItem = {
  itemId: string;
  surface: string;
  role: CarryoverRole;
  priorityScore: number;
};

export type ExcludedCarryoverItem = {
  itemId: string;
  reason: string;
};

export type CarryoverSelectionResult = {
  selected: SelectedCarryoverItem[];
  excluded: ExcludedCarryoverItem[];
  budget: {
    maxVisibleCarryoverChips: number;
    maxRecycledItemsPerSentence: number;
    maxExposureItemsPerUnit: number;
    maxWeakItemsPerSentence: number;
    targetLoadMinShare: number;
  };
};

// ── Internals ───────────────────────────────────────────────────────────────

/** Case-sensitive tag intersection — deterministic; callers own tag hygiene. */
function contextFits(itemTags: string[], lessonTags: string[]): boolean {
  if (lessonTags.length === 0) return false; // fail-closed (v0 decision)
  return itemTags.some((t) => lessonTags.includes(t));
}

/** Weakness-driven return signal (spec §65.6 "weaknessReturn"). */
function isWeaknessReturn(memory: LexiqueMemoryState): boolean {
  return memory.weaknessScore >= REFRESH_DUE_THRESHOLD;
}

/**
 * Role assignment, most urgent first. A candidate with no role is excluded —
 * plain supported/activeNew items are the lesson author's dense carry-in
 * (spec §10.2), which callers express via `recentCarryIn`.
 */
function assignRole(candidate: CarryoverCandidate): CarryoverRole | null {
  const m = candidate.memory;
  if (isWeaknessReturn(m)) return "weaknessReturn";
  if (m.lifecycleStatus === "refreshDue") return "refreshDue";
  if (m.lifecycleStatus === "strong") return "transferReady";
  if (candidate.recentCarryIn === true) return "recentCarryIn";
  return null;
}

/** §65.6 priority: 3·weakness + 2·refreshDue + 1·transferReady + 0.5·recent. */
function priorityScore(candidate: CarryoverCandidate, role: CarryoverRole): number {
  const m = candidate.memory;
  return (
    (isWeaknessReturn(m) ? 3 : 0) +
    2 * m.refreshDueScore +
    (m.lifecycleStatus === "strong" ? 1 : 0) +
    (candidate.recentCarryIn === true ? 0.5 : 0)
    // clutterPenalty: 0 in v0 — the hard caps below are the clutter control.
  );
}

/** Max selections that keep target load-share ≥ `share`: S ≤ T·(1−s)/s. */
function maxSelectionsByTargetShare(targetCount: number, share: number): number {
  if (targetCount <= 0) return 0; // no target to protect → no carryover
  if (share <= 0) return Number.MAX_SAFE_INTEGER;
  if (share >= 1) return 0;
  return Math.floor((targetCount * (1 - share)) / share);
}

// ── Selector ────────────────────────────────────────────────────────────────

/**
 * Select carryover chips for one lesson unit. Deterministic: exclusion gates
 * per candidate, then priority ranking (ties broken by itemId), then greedy
 * acceptance under the §65.6 budget caps and the target-share hard check.
 * Never mutates candidates or their memory states.
 */
export function selectCarryover(
  input: CarryoverSelectionInput,
): CarryoverSelectionResult {
  const budget = {
    maxVisibleCarryoverChips:
      input.maxVisibleCarryoverChips ?? DEFAULT_MAX_VISIBLE_CARRYOVER_CHIPS,
    maxRecycledItemsPerSentence:
      input.maxRecycledItemsPerSentence ?? DEFAULT_MAX_RECYCLED_ITEMS_PER_SENTENCE,
    maxExposureItemsPerUnit:
      input.maxExposureItemsPerUnit ?? DEFAULT_MAX_EXPOSURE_ITEMS_PER_UNIT,
    maxWeakItemsPerSentence:
      input.maxWeakItemsPerSentence ?? DEFAULT_MAX_WEAK_ITEMS_PER_SENTENCE,
    targetLoadMinShare: input.targetLoadMinShare ?? TARGET_LOAD_MIN_SHARE,
  };

  const targetSet = new Set(input.targetItemIds);
  const excluded: ExcludedCarryoverItem[] = [];
  const ranked: Array<{
    candidate: CarryoverCandidate;
    role: CarryoverRole;
    score: number;
  }> = [];

  // 1. Per-candidate exclusion gates (spec §65.6 "Always excluded").
  for (const candidate of input.candidates) {
    const m = candidate.memory;
    if (candidate.isFullSentenceChip === true) {
      excluded.push({ itemId: candidate.itemId, reason: "full-sentence chip" });
      continue;
    }
    if (candidate.hasIdentityAmbiguity === true) {
      excluded.push({ itemId: candidate.itemId, reason: "identity ambiguity" });
      continue;
    }
    if (candidate.targetOverlap === true || targetSet.has(candidate.itemId)) {
      excluded.push({ itemId: candidate.itemId, reason: "is a lesson target" });
      continue;
    }
    if (!contextFits(candidate.contextTags, input.lessonContextTags)) {
      excluded.push({ itemId: candidate.itemId, reason: "not context-fit" });
      continue;
    }
    if (m.exposureOnly && candidate.requiresProduction === true) {
      // Mirrors the Error Engine's ghost_required_by_mistake guard.
      excluded.push({
        itemId: candidate.itemId,
        reason: "exposure-only in a production slot",
      });
      continue;
    }
    if (
      m.lifecycleStatus === "strong" &&
      m.lastSeenAt !== null &&
      daysBetween(m.lastSeenAt, input.now) < RECENT_USE_DAYS
    ) {
      excluded.push({
        itemId: candidate.itemId,
        reason: "too recent and already strong",
      });
      continue;
    }
    const role = assignRole(candidate);
    if (role === null) {
      excluded.push({ itemId: candidate.itemId, reason: "no carryover role" });
      continue;
    }
    ranked.push({ candidate, role, score: priorityScore(candidate, role) });
  }

  // 2. Deterministic ranking: priority desc, then itemId asc.
  ranked.sort((a, b) =>
    a.score !== b.score
      ? b.score - a.score
      : a.candidate.itemId < b.candidate.itemId
        ? -1
        : a.candidate.itemId > b.candidate.itemId
          ? 1
          : 0,
  );

  // 3. Greedy acceptance under caps + target-share hard check (§65.6:
  // "Recycle cannot steal the lesson" — budget arithmetic, not judgment).
  const shareCap = maxSelectionsByTargetShare(
    input.targetItemIds.length,
    budget.targetLoadMinShare,
  );
  const selected: SelectedCarryoverItem[] = [];
  let recycledCount = 0; // owned (non-exposure) selections
  let exposureCount = 0;
  let weakCount = 0;

  for (const { candidate, role, score } of ranked) {
    const isExposure = candidate.memory.exposureOnly;
    const isWeak = role === "weaknessReturn";

    if (selected.length >= budget.maxVisibleCarryoverChips) {
      excluded.push({ itemId: candidate.itemId, reason: "visible carryover cap" });
      continue;
    }
    if (selected.length >= shareCap) {
      excluded.push({
        itemId: candidate.itemId,
        reason: "target load share protection",
      });
      continue;
    }
    if (isExposure && exposureCount >= budget.maxExposureItemsPerUnit) {
      excluded.push({ itemId: candidate.itemId, reason: "exposure cap" });
      continue;
    }
    if (!isExposure && recycledCount >= budget.maxRecycledItemsPerSentence) {
      excluded.push({ itemId: candidate.itemId, reason: "recycled items cap" });
      continue;
    }
    if (isWeak && weakCount >= budget.maxWeakItemsPerSentence) {
      excluded.push({ itemId: candidate.itemId, reason: "weak items cap" });
      continue;
    }

    selected.push({
      itemId: candidate.itemId,
      surface: candidate.surface,
      role,
      priorityScore: score,
    });
    if (isExposure) exposureCount += 1;
    else recycledCount += 1;
    if (isWeak) weakCount += 1;
  }

  return { selected, excluded, budget };
}
