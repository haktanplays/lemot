import type { ReviewItem } from "./types";

/**
 * Total scorable units in a Review section (audit B11).
 *
 * A `weave` item is scored one point PER blank (each blank is checked and
 * rewarded independently), while every other item type contributes exactly one
 * point. The denominator must therefore count blanks for weave items so the
 * numerator (per-blank + per-item increments) and denominator share the same
 * unit — otherwise a multi-blank weave item pushes the score above the total
 * (e.g. 4/2). Max achievable score now equals this total, so a perfect section
 * reads as 100%, never more.
 */
export function reviewTotalScorable(items: ReviewItem[]): number {
  return items.reduce(
    (sum, item) =>
      sum + (item.type === "weave" && "blanks" in item ? item.blanks.length : 1),
    0,
  );
}
