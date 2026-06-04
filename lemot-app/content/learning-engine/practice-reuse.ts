/**
 * Practice Pool exercise reuse resolver (P4.6) — pure, deterministic, RN-free.
 *
 * The Practice Pool does NOT generate exercises. To let a learner practice a
 * suggested item, it finds an EXISTING exercise from the CURRENT fixture whose
 * `targetItemIds` include the item's id, then the renderer reuses the same P3
 * card for that exercise (same graded/reveal callbacks, same serialized append).
 *
 * Pure: no `Date.now`, no storage, no React, no network, no AI, no
 * `LocalRepository`, no `scoreEvents`. Same inputs → same exercise out. Never
 * mutates `exercises` and never synthesizes a new `ExerciseBlueprint`.
 */
import type { ExerciseBlueprint, ItemId, OperationId } from "./types";
import type { PracticePoolItem, PracticePoolPath } from "./practice-pool";

/**
 * Per-path operation preference (deterministic). Build leads with recognition
 * (gentle); Stretch / Challenge lead with production. Every fixture operation is
 * listed, so a matching candidate always has a defined rank.
 */
const OP_PREFERENCE: Record<PracticePoolPath, readonly OperationId[]> = {
  build: ["recognition", "fill", "build", "register_switch", "context_chain"],
  stretch: ["fill", "build", "register_switch", "context_chain", "recognition"],
  challenge: ["fill", "build", "register_switch", "context_chain", "recognition"],
};

/**
 * Pick the existing fixture exercise to reuse for a Practice Pool item, or
 * `null` when none targets the item. A candidate must list the item's id in
 * `targetItemIds`. Among candidates, the one whose operation ranks earliest in
 * the path preference wins; ties break by original fixture order (stable,
 * deterministic). Returns the existing object by reference — never a copy or a
 * synthesized blueprint.
 */
export function selectReusablePracticeExercise(args: {
  item: Pick<PracticePoolItem, "itemId">;
  exercises: ExerciseBlueprint[];
  path: PracticePoolPath;
}): ExerciseBlueprint | null {
  const { item, exercises, path } = args;
  const preference = OP_PREFERENCE[path];
  const targetId: ItemId = item.itemId;

  let best: ExerciseBlueprint | null = null;
  let bestRank = Number.POSITIVE_INFINITY;
  let bestIdx = Number.POSITIVE_INFINITY;

  exercises.forEach((ex, idx) => {
    if (!Array.isArray(ex.targetItemIds) || !ex.targetItemIds.includes(targetId)) {
      return;
    }
    const r = preference.indexOf(ex.operation);
    const rank = r < 0 ? preference.length : r;
    if (rank < bestRank || (rank === bestRank && idx < bestIdx)) {
      best = ex;
      bestRank = rank;
      bestIdx = idx;
    }
  });

  return best;
}
