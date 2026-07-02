/**
 * Lexique Memory v0.1 — pure derived layer over frozen mastery-v0.2 (spec §65).
 *
 * Option A (LOCKED, spec §65.1): the reducer in ./mastery.ts remains the
 * canonical event fold; everything here is a PROJECTION computed from an
 * `ItemMastery` plus an explicit `now`. Deriving is a read — no stored
 * mutation, no migration, no new event types, no reducer change.
 *
 * Hard boundaries (house pattern, same as mon-lexique.ts / practice-pool.ts):
 *  - Pure: no `Date.now()` (a `now` is PASSED IN), no storage, no React, no
 *    network, no AI, no repository. Same inputs → same output. Never mutates
 *    the input `ItemMastery`.
 *  - Counters whose source events do not exist yet (transfer, recombination,
 *    repair, late-success ordering) are NOT inferred heuristically: they enter
 *    via the optional `future` argument and default to 0/null (spec §65.2
 *    "[new event needed]" rows). Nothing is faked.
 *  - `recycled` is NOT an intrinsic lifecycle status: it is a query-time
 *    carryover role produced by the future Carryover Selector (spec §65.5).
 *  - Opening Mon Lexique must not move mastery: this module cannot — it takes
 *    no event log and writes nothing (spec §49.4 / §65.5 invariants).
 */
import type { ItemMastery } from "./mastery";
import { isItemDue } from "./practice-pool";

// ── Constants (spec §65.3; lock status recorded there) ─────────────────────

export const STRENGTH_K = 2.5;
export const WEIGHT_PRODUCTION = 1.0;
export const WEIGHT_RECOGNITION = 0.25;
export const WEIGHT_TRANSFER = 0.7;
export const WEIGHT_RECOMBINATION = 0.7;
export const WEIGHT_REPAIR = 0.5;
export const SUPPORTED_THRESHOLD = 0.4;
export const STRONG_THRESHOLD = 0.7;
export const WEAKNESS_K = 2.0;
export const REPAIR_DISCOUNT = 0.5;
export const WEAK_RESIDUAL_FLOOR = 0.15;
export const HALF_LIFE_DEFAULT_DAYS = 5;
export const HALF_LIFE_STRONG_DAYS = 14;
export const REFRESH_DUE_THRESHOLD = 0.5;
export const DORMANT_DECAY_THRESHOLD = 0.5;
export const RECENT_USE_DAYS = 1;
export const RECENT_USE_PENALTY = 0.5;
export const CONSOLIDATION_REST_DAYS = 1;
export const TARGET_LOAD_MIN_SHARE = 0.5;

const DAY_MS = 24 * 60 * 60 * 1000;

// ── Types (spec §65.2 / §65.5 / §65.7) ─────────────────────────────────────

export type LexiqueLifecycleStatus =
  | "unknown"
  | "ghost"
  | "recognition"
  | "activeNew"
  | "supported"
  | "strong"
  | "dormant"
  | "refreshDue";

/** The 8 intrinsic states, exported so tests can assert "recycled" is absent. */
export const LEXIQUE_LIFECYCLE_STATUSES: readonly LexiqueLifecycleStatus[] = [
  "unknown",
  "ghost",
  "recognition",
  "activeNew",
  "supported",
  "strong",
  "dormant",
  "refreshDue",
];

export type CarryoverEligibility = "excluded" | "eligible" | "priority";

export type FlashcardEligibility = "none" | "eligible" | "due";

export type MonLexiqueFriendlyStatus =
  | "Seen in model answers"
  | "Seen"
  | "Tried"
  | "Getting stronger"
  | "Known"
  | "Try again soon";

/**
 * Counters whose source events do not exist yet (spec §65.8 "[new event
 * needed]"). They default to 0/null; a caller may pass real values once the
 * named events ship. They must never be inferred from existing aggregates.
 */
export type FutureCounters = {
  repairCount?: number;
  transferCount?: number;
  recombinationCount?: number;
  lastRepairedAt?: number | null;
  /** Successful productions AFTER the most recent failure — needs per-event
   *  ordering the aggregate substrate does not carry. */
  lateSuccessCount?: number;
};

export type LexiqueMemoryState = {
  itemId: string;

  seenCount: number;
  recognitionCount: number;
  productionCount: number;
  successfulProductionCount: number;

  repairCount: number;
  transferCount: number;
  recombinationCount: number;

  lastSeenAt: number | null;
  lastProducedAt: number | null;
  lastRepairedAt: number | null;

  strengthScore: number;
  weaknessScore: number;
  decayScore: number;
  refreshDueScore: number;

  carryoverEligibility: CarryoverEligibility;
  flashcardEligibility: FlashcardEligibility;

  exposureOnly: boolean;
  lifecycleStatus: LexiqueLifecycleStatus;
  /** Learner-facing band (§65.7). `null` only for `unknown` — real snapshots
   *  never produce it (every reducer event marks the item seen). */
  friendlyStatus: MonLexiqueFriendlyStatus | null;
};

// ── Small pure helpers ──────────────────────────────────────────────────────

export function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

/** Whole days from `from` to `to`, floored at 0 (never negative). */
export function daysBetween(from: number, to: number): number {
  return Math.max(0, (to - from) / DAY_MS);
}

// ── Scoring formulas (spec §65.4) ───────────────────────────────────────────

export type StrengthInputs = {
  successfulProductionCount: number;
  recognitionCount: number;
  transferCount?: number;
  recombinationCount?: number;
  repairCount?: number;
};

/** strength = 1 − e^(−W / STRENGTH_K); monotone in every success input. */
export function calculateStrengthScore(inputs: StrengthInputs): number {
  const w =
    WEIGHT_PRODUCTION * inputs.successfulProductionCount +
    WEIGHT_TRANSFER * (inputs.transferCount ?? 0) +
    WEIGHT_RECOMBINATION * (inputs.recombinationCount ?? 0) +
    WEIGHT_REPAIR * (inputs.repairCount ?? 0) +
    WEIGHT_RECOGNITION * inputs.recognitionCount;
  return clamp01(1 - Math.exp(-w / STRENGTH_K));
}

export type WeaknessInputs = {
  /** Real failures only — the reducer already excludes near-misses
   *  (precision policy) and skips, so precision/exposure inputs can never
   *  raise this. `exposure_gap_allowed` is not an event outcome and must
   *  never be fed here (spec §65.4). */
  wrongCount: number;
  /** Ever crossed the weak threshold (reducer `isWeak` is monotone —
   *  counts never decrease — so it doubles as everWeak). */
  everWeak: boolean;
  repairCount?: number;
  lateSuccessCount?: number;
};

/** Errors raise it, recovery lowers it, everWeak keeps an internal floor. */
export function calculateWeaknessScore(inputs: WeaknessInputs): number {
  const offset =
    REPAIR_DISCOUNT *
    ((inputs.repairCount ?? 0) + (inputs.lateSuccessCount ?? 0));
  const activeFailures = Math.max(0, inputs.wrongCount - offset);
  const raw = clamp01(1 - Math.exp(-activeFailures / WEAKNESS_K));
  return inputs.everWeak ? Math.max(raw, WEAK_RESIDUAL_FLOOR) : raw;
}

/**
 * Two-bucket exponential staleness. Never lowers strength — it only feeds
 * refreshDueScore and the dormant gate. Separate clock from the Leitner
 * `dueAt` (spec §65.4: two clocks, two jobs).
 */
export function calculateDecayScore(
  strengthScore: number,
  lastSeenAt: number | null,
  now: number,
): number {
  if (lastSeenAt === null) return 0;
  const halfLife =
    strengthScore >= STRONG_THRESHOLD
      ? HALF_LIFE_STRONG_DAYS
      : HALF_LIFE_DEFAULT_DAYS;
  return clamp01(1 - Math.pow(0.5, daysBetween(lastSeenAt, now) / halfLife));
}

/**
 * Lesson-side refresh signal (NOT flashcard scheduling): decayed-but-owned or
 * weak items surface; a just-used item is suppressed for RECENT_USE_DAYS.
 */
export function calculateRefreshDueScore(args: {
  strengthScore: number;
  weaknessScore: number;
  decayScore: number;
  lastSeenAt: number | null;
  now: number;
}): number {
  const ownedGate = args.strengthScore >= SUPPORTED_THRESHOLD ? 1 : 0;
  const recentPenalty =
    args.lastSeenAt !== null &&
    daysBetween(args.lastSeenAt, args.now) < RECENT_USE_DAYS
      ? RECENT_USE_PENALTY
      : 0;
  return clamp01(
    Math.max(args.weaknessScore, args.decayScore * ownedGate) - recentPenalty,
  );
}

// ── Lifecycle derivation (spec §65.5) ───────────────────────────────────────

type LifecycleInputs = {
  mastery: ItemMastery;
  now: number;
  strengthScore: number;
  decayScore: number;
  refreshDueScore: number;
  exposureOnly: boolean;
};

/**
 * Derive the intrinsic status. Evaluated top-down; recomputed per query,
 * never stored.
 *
 * Consolidation guard (§65.5): strengthScore ≥ STRONG_THRESHOLD alone is NOT
 * enough for `strong` — the production evidence must also have survived
 * CONSOLIDATION_REST_DAYS since `lastProducedAt`. Same-session drilling parks
 * at `supported`; the already-strong re-produce "flicker" is intentional and
 * view-only.
 *
 * Note on `dormant`: with the v0.1 defaults (DORMANT_DECAY_THRESHOLD ==
 * REFRESH_DUE_THRESHOLD == 0.5 and refresh ≥ decay for owned, non-recent
 * items) the refreshDue branch always fires first, so `dormant` is currently
 * unreachable — kept as a tunable resting state per the spec (§65.9 pins
 * strong-but-stale → refreshDue).
 */
function deriveLifecycleStatus(inputs: LifecycleInputs): LexiqueLifecycleStatus {
  const m = inputs.mastery;

  const neverContacted =
    m.seenCount === 0 &&
    m.recognitionAttempts === 0 &&
    m.productionAttempts === 0;
  if (neverContacted) return "unknown";

  if (inputs.exposureOnly) return "ghost";

  if (m.productionAttempts === 0) return "recognition";

  // Production branch — surfacing signal first, then ownership bands.
  if (
    inputs.strengthScore >= SUPPORTED_THRESHOLD &&
    inputs.refreshDueScore >= REFRESH_DUE_THRESHOLD
  ) {
    return "refreshDue";
  }

  if (inputs.strengthScore >= STRONG_THRESHOLD) {
    const rested =
      m.lastProducedAt !== null &&
      daysBetween(m.lastProducedAt, inputs.now) >= CONSOLIDATION_REST_DAYS;
    if (!rested) return "supported"; // consolidation window
    return inputs.decayScore >= DORMANT_DECAY_THRESHOLD ? "dormant" : "strong";
  }

  if (inputs.strengthScore >= SUPPORTED_THRESHOLD) return "supported";

  return "activeNew";
}

// ── Mon Lexique friendly projection (spec §65.7) ────────────────────────────

/**
 * Learner-facing band. Raw scores/counts stay internal — never render them,
 * never use "weak / failed / decay" wording (spec §49.3 / §65.7). `dormant`
 * still reads "Known": resting is not a learner-facing demotion.
 */
export function projectMonLexiqueFriendlyStatus(
  status: LexiqueLifecycleStatus,
): MonLexiqueFriendlyStatus | null {
  switch (status) {
    case "unknown":
      return null;
    case "ghost":
      return "Seen in model answers";
    case "recognition":
      return "Seen";
    case "activeNew":
      return "Tried";
    case "supported":
      return "Getting stronger";
    case "strong":
    case "dormant":
      return "Known";
    case "refreshDue":
      return "Try again soon";
  }
}

// ── Main derivation ─────────────────────────────────────────────────────────

/**
 * Project one `ItemMastery` into a `LexiqueMemoryState` at time `now`.
 * Pure read: never mutates `mastery`, appends nothing, stores nothing.
 *
 * `carryoverEligibility` is always "excluded" here: real eligibility needs
 * lesson context (contextTags) and belongs to the future Carryover Selector
 * (spec §65.6). `flashcardEligibility` derives from the shipped Leitner
 * clock (`dueAt`) + `practiceEligibility`, NOT from refreshDueScore —
 * lesson-side refresh and flashcard scheduling stay separate systems
 * (spec §9.1 / §65.4).
 */
export function deriveLexiqueMemory(
  mastery: ItemMastery,
  now: number,
  future?: FutureCounters,
): LexiqueMemoryState {
  const repairCount = future?.repairCount ?? 0;
  const transferCount = future?.transferCount ?? 0;
  const recombinationCount = future?.recombinationCount ?? 0;
  const lastRepairedAt = future?.lastRepairedAt ?? null;
  const lateSuccessCount = future?.lateSuccessCount ?? 0;

  // §65.2: exposureOnly = seen without any production attempt or successful
  // recognition. (A failed-recognition-only item classifies as ghost in
  // v0.1 — seen, but recognition not yet demonstrated.)
  const exposureOnly =
    mastery.seenCount > 0 &&
    mastery.productionAttempts === 0 &&
    mastery.recognitionSuccess === 0;

  const strengthScore = calculateStrengthScore({
    successfulProductionCount: mastery.productionSuccess,
    recognitionCount: mastery.recognitionSuccess,
    transferCount,
    recombinationCount,
    repairCount,
  });

  const weaknessScore = calculateWeaknessScore({
    wrongCount: mastery.wrongCount,
    everWeak: mastery.isWeak,
    repairCount,
    lateSuccessCount,
  });

  const decayScore = calculateDecayScore(strengthScore, mastery.lastSeenAt, now);

  const refreshDueScore = calculateRefreshDueScore({
    strengthScore,
    weaknessScore,
    decayScore,
    lastSeenAt: mastery.lastSeenAt,
    now,
  });

  const lifecycleStatus = deriveLifecycleStatus({
    mastery,
    now,
    strengthScore,
    decayScore,
    refreshDueScore,
    exposureOnly,
  });

  const flashcardEligibility: FlashcardEligibility =
    mastery.practiceEligibility === "none"
      ? "none"
      : isItemDue({ dueAt: mastery.dueAt }, now)
        ? "due"
        : "eligible";

  return {
    itemId: mastery.itemId,

    seenCount: mastery.seenCount,
    recognitionCount: mastery.recognitionSuccess,
    productionCount: mastery.productionAttempts,
    successfulProductionCount: mastery.productionSuccess,

    repairCount,
    transferCount,
    recombinationCount,

    lastSeenAt: mastery.lastSeenAt,
    lastProducedAt: mastery.lastProducedAt,
    lastRepairedAt,

    strengthScore,
    weaknessScore,
    decayScore,
    refreshDueScore,

    carryoverEligibility: "excluded",
    flashcardEligibility,

    exposureOnly,
    lifecycleStatus,
    friendlyStatus: projectMonLexiqueFriendlyStatus(lifecycleStatus),
  };
}
