import type { BuildTile, ItemId } from "@/content/learning-engine/types";
import type { ErrorTagCode } from "@/content/learning-engine/events";
import type { GradeResult } from "@/content/learning-engine/grade";

/**
 * Pure build-sequence grader — fixes the founder-smoke High (L1 build unpassable).
 *
 * Build correctness is the ANSWER TILE SEQUENCE, not a string reconstruction of
 * `targetText`. The learner taps tiles; `picked` is the chosen tile indices in
 * order. The correct answer = the tiles that carry an `answerIndex`, ordered by
 * that index (see `BuildTile`). We compare the chosen tile *itemId* sequence to
 * the expected itemId sequence, so:
 *   - punctuation in `targetText` can never block a correct build — tiles cannot
 *     reproduce punctuation that is not inside a single tile (L1's internal comma
 *     in "Bonjour, je voudrais un café"; L12/L16's trailing "?");
 *   - distractors (tiles with no `answerIndex`) are never part of a correct
 *     answer;
 *   - multi-word chunk tiles ("un café") stay atomic.
 *
 * It returns a `GradeResult` so the existing `friendlyFeedback` + `onGradedAttempt`
 * paths are unchanged. It does NOT call `grade()`, does NOT parse `targetText`,
 * and does NOT change the event shape — `normalizedAnswer` / `expectedAnswer` are
 * pass-through echoes for the event only and are never used for correctness.
 */

/** Expected answer = tiles with an `answerIndex`, ordered ascending → their itemIds. */
export function expectedTileSequence(tiles: readonly BuildTile[]): ItemId[] {
  return tiles
    .filter((t): t is BuildTile & { answerIndex: number } => t.answerIndex !== undefined)
    .sort((a, b) => a.answerIndex - b.answerIndex)
    .map((t) => t.itemId);
}

function sequenceEqual(a: readonly ItemId[], b: readonly ItemId[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

/** Same items regardless of order (multiset equality). */
function sameMultiset(a: readonly ItemId[], b: readonly ItemId[]): boolean {
  if (a.length !== b.length) return false;
  const counts = new Map<ItemId, number>();
  for (const v of a) counts.set(v, (counts.get(v) ?? 0) + 1);
  for (const v of b) {
    const n = counts.get(v);
    if (n === undefined) return false;
    if (n === 1) counts.delete(v);
    else counts.set(v, n - 1);
  }
  return counts.size === 0;
}

/** Classify a chosen tile sequence against the expected answer sequence. */
export function classifyBuildSequence(
  expected: readonly ItemId[],
  selected: readonly ItemId[],
): ErrorTagCode {
  if (selected.length === 0) return "empty_or_skip";
  if (sequenceEqual(expected, selected)) return "correct";
  // Right pieces, wrong order — only when the multiset matches exactly (no
  // distractor, nothing missing). Anything else is a coarse "not quite".
  if (sameMultiset(expected, selected)) return "wrong_order";
  return "incorrect_but_understandable";
}

export function gradeBuildSequence(args: {
  tiles: readonly BuildTile[];
  picked: readonly number[];
  /** Echo only — stored on the event, never used for correctness. */
  normalizedAnswer?: string | null;
  /** Echo only — stored on the event, never used for correctness. */
  expectedAnswer?: string | null;
}): GradeResult {
  const expected = expectedTileSequence(args.tiles);
  const selected = args.picked
    .map((i) => args.tiles[i]?.itemId)
    .filter((id): id is ItemId => id !== undefined);
  const result = classifyBuildSequence(expected, selected);
  return {
    result,
    errorTags: [result],
    normalizedAnswer: args.normalizedAnswer ?? null,
    expectedAnswer: args.expectedAnswer ?? null,
  };
}
