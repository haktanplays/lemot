import type { NaturalAlternative } from "@/content/lessonTypes";

/**
 * Reading `naturalAlternatives` when an entry may be a bare string or a
 * labelled variant.
 *
 * Every consumer that only wants the French — the negation scanner, the corpus
 * counters, the exposure tally — goes through `alternativeFrench`, so widening
 * the authored shape stayed a one-line change in each of them rather than a
 * `typeof` in every call site. `alternativeLabel` returns null for a bare
 * string, which is the renderer's signal to draw the old quiet line instead of
 * a labelled block.
 *
 * Pure. No clock, no storage, no throwing: an entry that is neither shape
 * yields an empty string, because a diagnostic script must not crash on
 * unexpected authored data — the content validators are what report it.
 */
export function alternativeFrench(entry: string | NaturalAlternative): string {
  if (typeof entry === "string") return entry;
  if (entry && typeof entry.fr === "string") return entry.fr;
  return "";
}

export function alternativeLabel(
  entry: string | NaturalAlternative,
): string | null {
  if (typeof entry === "string") return null;
  if (entry && typeof entry.when === "string" && entry.when.length > 0) {
    return entry.when;
  }
  return null;
}

/** The French of every alternative in a list, in authored order. */
export function alternativeStrings(
  entries: readonly (string | NaturalAlternative)[] | undefined,
): string[] {
  return (entries ?? []).map(alternativeFrench).filter((s) => s.length > 0);
}
