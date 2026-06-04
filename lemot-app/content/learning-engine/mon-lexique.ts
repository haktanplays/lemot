/**
 * Mon Lexique selector (P4.2) — pure, deterministic, RN-free.
 *
 * Projects the item registry + a `MasterySnapshot` into learner-safe Mon Lexique
 * entries. Mon Lexique is a VIEW over existing data (registry + derived mastery),
 * NOT a separate wordbook / vocabulary store — there is no second source of truth.
 *
 * Hard boundaries (per Sprint13 SW.3 spec + boundary-recognition decision):
 *  - Pure: no `Date.now`, no storage, no React, no network, no AI, no
 *    `LocalRepository`, no `scoreEvents` call. Same snapshot+registry in →
 *    same entries out. Does NOT mutate either input.
 *  - Learner-safe output ONLY: the surface French / English meaning + coarse
 *    status. NEVER weakTags / precisionTags / precisionCount / wrongCount /
 *    success/failure counters / raw mastery JSON / operation labels / bucket
 *    names / validator language. `itemId` and `dueAt` ARE carried for internal
 *    keying / scheduling but are flagged `@internal` — not for raw rendering.
 *  - Precision policy: precision-only items normally stay `hidden`
 *    (precision is never a production success and never weakness), so they do not
 *    appear here. No precision→added / precision→weak path is created.
 */
import type { ItemId, RawItem } from "./types";
import type { MasterySnapshot, PracticeEligibility } from "./mastery";

/** A single learner-safe Mon Lexique row. */
export type MonLexiqueEntry = {
  /** @internal React key / follow-up linking only — NOT learner-facing. */
  itemId: ItemId;
  /** Learner-facing French surface (from the item registry). */
  fr: string;
  /** Learner-facing English meaning (from the item registry). */
  en: string;
  /** Coarse status only — `added` (collected) or `weak` (needs another look). */
  status: "added" | "weak";
  lastSeenAt: number | null;
  lastProducedAt: number | null;
  practiceEligibility: PracticeEligibility;
  /** @internal scheduling only — never render the raw number. */
  dueAt: number | null;
  /** Convenience flag: a calm "needs another look", derived from `status`. */
  needsPractice: boolean;
};

export type SelectMonLexiqueInput = {
  items: Record<ItemId, RawItem>;
  snapshot: MasterySnapshot;
};

/** A registry entry is usable only if it resolves to non-empty fr + en strings. */
function resolvableSurface(
  raw: RawItem | undefined,
): { fr: string; en: string } | null {
  if (!raw || !raw.text) return null;
  const { fr, en } = raw.text;
  if (typeof fr !== "string" || typeof en !== "string") return null;
  if (fr.length === 0 || en.length === 0) return null;
  return { fr, en };
}

/** Group rank for ordering: weak entries surface before added ones. */
const STATUS_RANK: Record<"weak" | "added", number> = { weak: 0, added: 1 };

/**
 * Project snapshot + registry into Mon Lexique entries.
 *
 * Inclusion: an item appears iff its `monLexiqueStatus` is `added` or `weak`
 * AND it resolves to a usable registry surface. `hidden` items, items missing
 * from the registry, and malformed/unresolvable registry entries are excluded.
 *
 * Ordering (deterministic, stable): weak before added; within a group by
 * `lastProducedAt` descending (null last), then `itemId` ascending.
 */
export function selectMonLexiqueEntries(
  input: SelectMonLexiqueInput,
): MonLexiqueEntry[] {
  const { items, snapshot } = input;
  const entries: MonLexiqueEntry[] = [];

  for (const itemId of Object.keys(snapshot.items)) {
    const m = snapshot.items[itemId];
    const status = m.monLexiqueStatus;
    if (status !== "added" && status !== "weak") continue; // excludes "hidden"

    const surface = resolvableSurface(items[itemId]);
    if (!surface) continue; // missing / malformed registry entry → excluded

    entries.push({
      itemId,
      fr: surface.fr,
      en: surface.en,
      status,
      lastSeenAt: m.lastSeenAt,
      lastProducedAt: m.lastProducedAt,
      practiceEligibility: m.practiceEligibility,
      dueAt: m.dueAt,
      needsPractice: status === "weak",
    });
  }

  entries.sort((a, b) => {
    const rank = STATUS_RANK[a.status] - STATUS_RANK[b.status];
    if (rank !== 0) return rank;
    const at = a.lastProducedAt ?? -Infinity;
    const bt = b.lastProducedAt ?? -Infinity;
    if (at !== bt) return bt - at; // most recently produced first; nulls last
    return a.itemId < b.itemId ? -1 : a.itemId > b.itemId ? 1 : 0;
  });

  return entries;
}
