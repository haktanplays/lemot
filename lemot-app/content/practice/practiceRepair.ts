/**
 * In-session repair — pure, deterministic, and deliberately small.
 *
 * This is NOT an adaptive engine. It answers one question with one rule: the
 * learner just got something wrong, so is there a lawful seed in the pool that
 * works on THAT confusion, which they have not already done today?
 *
 * The rule that makes it worth having is the last filter: a repair must change
 * the cognitive job. Serving the identical question again is not repair, it is
 * a retry, and the learner learns the answer to a screen rather than the
 * language. So a missed choice is followed by production, and a missed
 * production by a contrast — never by itself.
 */
import type { PracticeSeed } from "./practiceTypes";
import { seedIsLawfulFor } from "./practicePlanner";

export type RepairSearch = {
  missed: PracticeSeed;
  seeds: readonly PracticeSeed[];
  reachedItems: ReadonlySet<string>;
  reachedLessons: ReadonlySet<string>;
  usedSeedIds: ReadonlySet<string>;
};

/** The best lawful repair for a miss, or null when the pool has nothing. */
export function selectRepairSeed(search: RepairSearch): PracticeSeed | null {
  const { missed, seeds, reachedItems, reachedLessons, usedSeedIds } = search;
  const missedTags = new Set(missed.exercise.weakPointTags ?? []);
  const missedTargets = new Set(missed.targetItemIds);

  const usable = seeds.filter(
    (seed) =>
      seed.id !== missed.id &&
      !usedSeedIds.has(seed.id) &&
      seed.operation !== missed.operation &&
      seedIsLawfulFor(seed, reachedItems, reachedLessons),
  );

  // 1. A seed authored to repair exactly this confusion.
  const byTag = usable.filter(
    (seed) => seed.repairsTag !== undefined && missedTags.has(seed.repairsTag),
  );
  if (byTag.length > 0) return byTag[0];

  // 2. Otherwise, other work on the same language — a different way in.
  const byItem = usable.filter((seed) =>
    seed.targetItemIds.some((id) => missedTargets.has(id)),
  );
  return byItem[0] ?? null;
}
