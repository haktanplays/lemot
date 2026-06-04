/**
 * Practice Pool selector (P4.4) — pure, deterministic, RN-free.
 *
 * Projects a `MasterySnapshot` (and, optionally, the item registry for learner
 * surfaces) into the three Practice Pool paths — Build / Stretch / Challenge —
 * by reading the reducer-derived `practiceEligibility`. The Practice Pool is a
 * VIEW over derived mastery; it does not recompute mastery and does not generate
 * content (it selects from items the snapshot already knows about).
 *
 * Hard boundaries (per Sprint13 SW.3 spec + precision policy):
 *  - Pure: no `Date.now` (a `now` is PASSED IN for due filtering), no storage,
 *    no React, no network, no AI, no `LocalRepository`, no `scoreEvents`. Same
 *    inputs → same buckets out. Does NOT mutate the snapshot or registry.
 *  - Learner-safe output ONLY: path + coarse scheduling. NEVER weakTags /
 *    precisionTags / precisionCount / wrongCount / success/failure counters /
 *    raw mastery JSON / operation labels / bucket-ownership names / validator
 *    language. `itemId` and `dueAt` are carried `@internal` (keying / scheduling),
 *    never for raw rendering.
 *  - Precision policy: Challenge is driven by `isWeak` / `practiceEligibility`,
 *    NEVER by precision. Precision-only items sit at `practiceEligibility:"build"`
 *    with `isWeak:false`, so they can appear in Build but NEVER in Challenge.
 *    `precisionTags` / `precisionCount` are never read.
 */
import type { ItemId, RawItem } from "./types";
import type { MasterySnapshot, PracticeEligibility } from "./mastery";

export type PracticePoolPath = "build" | "stretch" | "challenge";

/** A single learner-safe practice candidate. */
export type PracticePoolItem = {
  /** @internal React key / follow-up linking only — NOT learner-facing. */
  itemId: ItemId;
  path: PracticePoolPath;
  practiceEligibility: PracticeEligibility;
  /** @internal scheduling only — never render the raw number. */
  dueAt: number | null;
  /** True only when a `now` was provided AND `dueAt` is non-null and `<= now`. */
  isDue: boolean;
  /** Convenience flag for the Challenge path (a calm "needs another look"). */
  needsPractice: boolean;
  /** Learner-facing French surface, if a registry was passed and it resolved. */
  fr?: string;
  /** Learner-facing English meaning, if a registry was passed and it resolved. */
  en?: string;
};

export type PracticePoolBuckets = {
  build: PracticePoolItem[];
  stretch: PracticePoolItem[];
  challenge: PracticePoolItem[];
};

export type SelectPracticePoolInput = {
  snapshot: MasterySnapshot;
  /** Optional registry — when present, resolvable items get learner-safe fr/en. */
  items?: Record<ItemId, RawItem>;
  /** Optional clock for due filtering. Omit for an unfiltered, due-agnostic pool. */
  now?: number;
};

/** Pure due check: due iff a real `dueAt` is at or before `now`. No `Date.now`. */
export function isItemDue(
  item: Pick<PracticePoolItem, "dueAt">,
  now: number,
): boolean {
  return item.dueAt !== null && item.dueAt <= now;
}

/** Resolve a learner-safe surface from the registry, or null if unusable. */
function resolveSurface(
  raw: RawItem | undefined,
): { fr: string; en: string } | null {
  if (!raw || !raw.text) return null;
  const { fr, en } = raw.text;
  if (typeof fr !== "string" || typeof en !== "string") return null;
  if (fr.length === 0 || en.length === 0) return null;
  return { fr, en };
}

/**
 * Deterministic order within a path: due items first (only meaningful when a
 * `now` was provided — otherwise every `isDue` is false), then lower `dueAt`
 * first (nulls last), then `itemId` ascending.
 */
function comparePoolItems(a: PracticePoolItem, b: PracticePoolItem): number {
  if (a.isDue !== b.isDue) return a.isDue ? -1 : 1;
  const at = a.dueAt ?? Infinity; // null → last in ascending order
  const bt = b.dueAt ?? Infinity;
  if (at !== bt) return at - bt;
  return a.itemId < b.itemId ? -1 : a.itemId > b.itemId ? 1 : 0;
}

/**
 * Project the snapshot into Build / Stretch / Challenge buckets.
 *
 * Bucketing by reducer-derived `practiceEligibility`:
 *  - Build:     `practiceEligibility === "build"`     (seen / recognized /
 *               near-miss-only / non-weak items).
 *  - Stretch:   `practiceEligibility === "stretch"`   (produced items;
 *               item-level Stretch only — no recombination synthesis in P4.4).
 *  - Challenge: `practiceEligibility === "challenge"` AND `isWeak === true`
 *               (weak items only). The extra `isWeak` guard is belt-and-suspenders
 *               over the reducer invariant (challenge ⇔ isWeak), so precision can
 *               never reach Challenge.
 *  - `"none"` (never-seen) items are excluded from every bucket.
 *
 * Registry policy: items are selected purely from the snapshot. When `items` is
 * passed and an item resolves, `fr`/`en` are attached; an item missing from /
 * unresolvable in the registry is STILL selectable with its internal `itemId`
 * only (the UI layer decides how to resolve or skip it).
 */
export function selectPracticePoolBuckets(
  input: SelectPracticePoolInput,
): PracticePoolBuckets {
  const { snapshot, items, now } = input;
  const buckets: PracticePoolBuckets = { build: [], stretch: [], challenge: [] };

  for (const itemId of Object.keys(snapshot.items)) {
    const m = snapshot.items[itemId];
    const eligibility = m.practiceEligibility;

    let path: PracticePoolPath;
    if (eligibility === "build") path = "build";
    else if (eligibility === "stretch") path = "stretch";
    else if (eligibility === "challenge" && m.isWeak) path = "challenge";
    else continue; // "none", or an inconsistent challenge-without-weak → excluded

    const surface = items ? resolveSurface(items[itemId]) : null;

    const item: PracticePoolItem = {
      itemId,
      path,
      practiceEligibility: eligibility,
      dueAt: m.dueAt,
      isDue: now !== undefined && isItemDue({ dueAt: m.dueAt }, now),
      needsPractice: path === "challenge",
      ...(surface ? { fr: surface.fr, en: surface.en } : {}),
    };

    buckets[path].push(item);
  }

  buckets.build.sort(comparePoolItems);
  buckets.stretch.sort(comparePoolItems);
  buckets.challenge.sort(comparePoolItems);

  return buckets;
}
