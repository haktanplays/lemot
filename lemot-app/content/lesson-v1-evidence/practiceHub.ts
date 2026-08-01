/**
 * Practice Hub selection + authored-source resolution (PR-08) — pure.
 *
 * The Practice Hub is a PROJECTION, not a curriculum. It answers exactly two
 * questions from data that already exists:
 *
 *   1. Which items should return today?      — from the shared MasterySnapshot,
 *      through the reducer-owned `practiceEligibility` (Practice Pool semantics)
 *      and the existing `selectTodaysSet` priority/diversity/budget rules.
 *   2. What can the learner actually DO with each? — an already-authored shipped
 *      lesson screen whose evidence targets include the item, returned BY
 *      REFERENCE. Nothing is synthesized: no French, no prompt, no distractor,
 *      no cloze, no answer, no alternative.
 *
 * This is deliberately NOT the carryover selector. Carryover picks old material
 * to weave INSIDE a lesson under target-load budgets; the Hub picks learner
 * practice FROM the snapshot. The two projections stay separate (`recycled` is a
 * lesson-side role, `practiceEligibility` a reducer derivation) and neither
 * reuses the other's logic.
 *
 * Learner-safe by construction: the entry carries fr/en, a calm return reason
 * derived only from the reducer-owned path, and a due flag. Weak tags, counters,
 * failure counts and error tags are consumed internally for the existing
 * priority rule and never appear on the output type.
 *
 * Hard boundaries: no clock (explicit `now`), no storage, no React, no AI, no
 * randomness; same inputs → same set, ties break deterministically.
 */
import type { MasterySnapshot } from "../learning-engine/mastery";
import {
  selectPracticePoolBuckets,
  type PracticePoolPath,
} from "../learning-engine/practice-pool";
import {
  selectTodaysSet,
  type PracticeCandidate,
  type WeakTagSignal,
} from "../learning-engine/practice-selector";
import type { ItemId } from "../learning-engine/types";
import type {
  FillWithTrapsScreen,
  LearningItem,
  Lesson,
  WeaveScreen,
} from "../lessonTypes";
import { resolveEvidenceTargetItemIds } from "./identity";
import { resolveLessonTreatmentForItem } from "./treatment";

// ── learner-safe vocabulary ─────────────────────────────────────────────────

/** Why an item returned — derived ONLY from the reducer-owned path. */
export type PracticeReturnReason =
  | "keep_building"
  | "ready_to_stretch"
  | "needs_another_look";

const REASON_FOR_PATH: Readonly<Record<PracticePoolPath, PracticeReturnReason>> =
  Object.freeze({
    build: "keep_building",
    stretch: "ready_to_stretch",
    challenge: "needs_another_look",
  });

/**
 * Calm learner-facing English for each reason, plus the separate due
 * supplement. No weakness, failure, count, score or overdue language — the
 * reason names a path forward, never a verdict about the learner.
 */
export const PRACTICE_RETURN_COPY: Readonly<Record<PracticeReturnReason, string>> =
  Object.freeze({
    keep_building: "A useful piece to keep active.",
    ready_to_stretch: "You’ve used this before. Try it once more.",
    needs_another_look: "This one could use another calm pass.",
  });

export const PRACTICE_DUE_COPY = "Ready to revisit today.";

// ── authored-source resolution ──────────────────────────────────────────────

/** A reusable Wave A screen — the ONLY primitives the Hub supports in PR-08. */
export type ReusableHubScreen = FillWithTrapsScreen | WeaveScreen;

/**
 * An existing authored practice opportunity: the original lesson and the
 * original screen object, by reference. Copying either would fork the payload
 * identity the event log records.
 */
export type ReusablePracticeSource = {
  lesson: Lesson;
  screen: ReusableHubScreen;
  itemId: ItemId;
};

/**
 * Per-path screen-type preference. Build leads with the gentle recognition
 * choice; Stretch and Challenge lead with typed production. Deterministic —
 * ties resolve by lesson-registry order, then screen order.
 */
const SCREEN_PREFERENCE: Readonly<
  Record<PracticePoolPath, readonly ReusableHubScreen["type"][]>
> = Object.freeze({
  build: ["fill-with-traps", "weave"],
  stretch: ["weave", "fill-with-traps"],
  challenge: ["weave", "fill-with-traps"],
});

/**
 * May THIS screen safely ask for THIS item, given the lesson's authored
 * treatment? This is where a projection could quietly become a curriculum, so
 * the rules are conservative:
 *
 *  - An item the lesson never declares (including every ghost) resolves no
 *    treatment → excluded. Practising it would demand what was never taught.
 *  - A choice screen (recognition demand) is safe for any declared treatment —
 *    recognition never over-claims.
 *  - A Weave (production demand) is safe for an `active` item, or for a
 *    `supported` item ONLY when the screen itself supplies that item as a piece
 *    — otherwise the Hub would convert Supported material into independent
 *    recall, exactly the upgrade the treatment system forbids.
 *  - `recognition`-treated items never get a production screen.
 */
function screenIsSafeForItem(
  screen: ReusableHubScreen,
  itemId: ItemId,
  lesson: Lesson,
): boolean {
  let treatment: ReturnType<typeof resolveLessonTreatmentForItem>;
  try {
    treatment = resolveLessonTreatmentForItem(itemId, lesson);
  } catch {
    return false; // undeclared (ghost / model-only) — never a demanded answer
  }
  if (screen.type === "fill-with-traps") return true;
  if (treatment === "active") return true;
  if (treatment === "supported") {
    return (screen.payload.suggestedPieces ?? []).some((p) => p.itemId === itemId);
  }
  return false; // recognition-treated → no production demand
}

/**
 * Find the existing authored screen to reuse for one item on one path, or null.
 *
 * A screen qualifies only when the item is one of its actual EVIDENCE targets
 * (`evidenceTargetItemIds` when present, else `targetItemIds`) — an item merely
 * printed in the surrounding frame is not practisable through that screen. A
 * screen whose targets fail canonical resolution is skipped rather than trusted.
 */
export function resolvePracticeHubSource(
  itemId: ItemId,
  path: PracticePoolPath,
  lessons: readonly Lesson[],
): ReusablePracticeSource | null {
  const preference = SCREEN_PREFERENCE[path];
  let best: ReusablePracticeSource | null = null;
  let bestRank = Number.POSITIVE_INFINITY;

  for (const lesson of lessons) {
    for (const screen of lesson.screens) {
      if (screen.type !== "fill-with-traps" && screen.type !== "weave") continue;
      let targets: ItemId[];
      try {
        targets = resolveEvidenceTargetItemIds(screen);
      } catch {
        continue; // unresolvable targeting — never guess
      }
      if (!targets.includes(itemId)) continue;
      if (!screenIsSafeForItem(screen, itemId, lesson)) continue;

      const rank = preference.indexOf(screen.type);
      if (rank < bestRank) {
        best = { lesson, screen, itemId };
        bestRank = rank;
        if (rank === 0) return best; // first-preference in registry order wins
      }
    }
  }
  return best;
}

// ── the Hub set ─────────────────────────────────────────────────────────────

/** One learner-safe, actionable Practice Hub entry. */
export type PracticeHubEntry = {
  /** @internal keying/linking only — never rendered raw. */
  itemId: ItemId;
  fr: string;
  en: string;
  path: PracticePoolPath;
  reason: PracticeReturnReason;
  isDue: boolean;
  source: ReusablePracticeSource;
};

export type PracticeHubSet = {
  entries: PracticeHubEntry[];
  /** Budget after the existing 5–8 clamp; the set may be shorter. */
  requested: number;
};

export type SelectPracticeHubSetInput = {
  snapshot: MasterySnapshot;
  /** The canonical runtime item registry (learner surfaces + stable metadata). */
  items: Readonly<Record<string, LearningItem>>;
  /** The current V1 lesson registry (authored screens to reuse). */
  lessons: readonly Lesson[];
  /** Explicit clock — the selector never reads one. */
  now: number;
  budget: number;
};

/**
 * Select today's Practice Hub set.
 *
 * Flow: snapshot → Practice Pool buckets (reducer eligibility; never-seen
 * excluded) → resolve learner surface + authored source (anything without both
 * is silently excluded — an item that cannot be practised is not displayed) →
 * the EXISTING `selectTodaysSet` for due-first priority, weakness priority,
 * family diversity and the 5–8 budget clamp. No parallel scheduler exists.
 *
 * Family for the diversity rule is the canonical item's authored `type`
 * (chunk / noun / verb …) — stable authored metadata, never derived from
 * surface text, never randomised.
 */
export function selectPracticeHubSet(input: SelectPracticeHubSetInput): PracticeHubSet {
  const { snapshot, items, lessons, now, budget } = input;
  const buckets = selectPracticePoolBuckets({ snapshot, now });

  // Actionable candidates: eligible AND renderable AND practisable.
  const byId = new Map<
    string,
    { path: PracticePoolPath; isDue: boolean; fr: string; en: string; source: ReusablePracticeSource }
  >();
  const candidates: PracticeCandidate[] = [];

  for (const path of ["build", "stretch", "challenge"] as const) {
    for (const poolItem of buckets[path]) {
      const registryItem = items[poolItem.itemId];
      const fr = registryItem?.fr ?? registryItem?.text;
      const en = registryItem?.en;
      if (!registryItem || !fr || !en) continue; // no learner-safe surface → not shown
      const source = resolvePracticeHubSource(poolItem.itemId, path, lessons);
      if (source === null) continue; // nothing safe to practise → not shown

      byId.set(poolItem.itemId, { path, isDue: poolItem.isDue, fr, en, source });
      candidates.push({
        itemId: poolItem.itemId,
        family: registryItem.type,
        dueAt: poolItem.dueAt,
        weakPointTags: registryItem.weakPointTags ?? [],
      });
    }
  }

  // Internal-only weakness signals for the existing priority rule: an item's
  // snapshot wrongCount projected onto its authored weak-point tags. These
  // numbers never reach the output type.
  const weakTags: WeakTagSignal[] = [];
  for (const candidate of candidates) {
    const wrongCount = snapshot.items[candidate.itemId]?.wrongCount ?? 0;
    if (wrongCount === 0) continue;
    for (const tag of candidate.weakPointTags) {
      weakTags.push({ tag, errorCount: wrongCount });
    }
  }

  const todays = selectTodaysSet({ due: candidates, weakTags, budget, now });

  const entries: PracticeHubEntry[] = [];
  for (const itemId of todays.itemIds) {
    const meta = byId.get(itemId);
    if (!meta) continue; // structurally impossible; defensive
    entries.push({
      itemId,
      fr: meta.fr,
      en: meta.en,
      path: meta.path,
      reason: REASON_FOR_PATH[meta.path],
      isDue: meta.isDue,
      source: meta.source,
    });
  }
  return { entries, requested: todays.requested };
}
