import type { PracticeSeed } from "./practiceTypes";

/**
 * The browse door. Every lawful seed, in a stable order, a page at a time.
 *
 * WHY THIS EXISTS, measured rather than assumed. The corpus holds 632 authored
 * seeds. For a learner who has walked L0-L6, 251 of them are lawful, and not
 * one seed anywhere is unroutable — the routing was never the problem. What was
 * missing is a door: the Hub only ever served a SESSION, capped at eight
 * actions, so a learner entitled to 251 practices could see 3.2% of them and
 * concluded that was the product.
 *
 * A session and a catalogue are different things and both should exist. The
 * planner still owns the session — it balances families, avoids runs, respects
 * SRS. This owns browsing, and it deliberately does almost nothing: no
 * scheduling, no mastery, no difficulty judgement. It orders and it paginates.
 *
 * DETERMINISTIC, including the rotation. Tests must be able to assert what a
 * learner sees, so nothing here calls Math.random or reads a clock; variety
 * comes from a caller-supplied key. Two learners see different orders, the same
 * learner sees a stable one, and a test passing a fixed key sees the same list
 * every run.
 */

export type CataloguePage = {
  seeds: PracticeSeed[];
  /** Cursor for the next page, or null when the pool is exhausted. */
  nextCursor: number | null;
  /** How many lawful seeds exist behind this page. Diagnostics and "see all". */
  total: number;
};

/**
 * A small stable hash. Not cryptographic and not trying to be: it turns a
 * string key into a rotation offset, and the only property that matters is
 * that the same key always gives the same number.
 */
function keyOffset(key: string, modulo: number): number {
  if (modulo <= 0) return 0;
  let h = 2166136261;
  for (let i = 0; i < key.length; i += 1) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % modulo;
}

/**
 * Lawful seeds in browse order.
 *
 * The order is the authored order ROTATED by the learner's key, not shuffled.
 * Rotation keeps authored neighbours together — seeds are written in
 * pedagogical runs, and interleaving them would scatter a family across a
 * scroll for no gain — while guaranteeing that two learners do not both start
 * at seed one. It is also trivially reversible, so a starvation test can prove
 * every seed is reachable rather than sampling and hoping.
 */
export function catalogueOrder(
  lawful: readonly PracticeSeed[],
  key: string,
): PracticeSeed[] {
  if (lawful.length === 0) return [];
  const start = keyOffset(key, lawful.length);
  return [...lawful.slice(start), ...lawful.slice(0, start)];
}

/**
 * One page of the catalogue.
 *
 * `cursor` is an index into the rotated order, so paging is a pure function of
 * (pool, key, cursor) and a learner who scrolls, leaves and returns lands where
 * they were without anything being stored.
 */
export function cataloguePage(
  lawful: readonly PracticeSeed[],
  key: string,
  cursor = 0,
  pageSize = 12,
): CataloguePage {
  return cataloguePageOf(catalogueOrder(lawful, key), cursor, pageSize);
}

/**
 * One page of a list that has ALREADY been ordered.
 *
 * The rotation must happen exactly once, and this is what makes that possible.
 * A caller that orders a pool, then hands positions out of it — a browse surface
 * where tapping the fourth card must start the fourth practice — cannot let a
 * paginator rotate it a second time underneath, or the index it reports back
 * names a different seed than the one on screen. Splitting the two halves means
 * the ordering decision has one owner and the paging is pure arithmetic.
 */
export function cataloguePageOf(
  ordered: readonly PracticeSeed[],
  cursor = 0,
  pageSize = 12,
): CataloguePage {
  const from = Math.max(0, Math.trunc(cursor));
  const seeds = ordered.slice(from, from + Math.max(1, pageSize));
  const next = from + seeds.length;
  return {
    seeds,
    nextCursor: next < ordered.length ? next : null,
    total: ordered.length,
  };
}

/**
 * What a browse card says, taken from what the seed already carries.
 *
 * Seeds author a scene and a job — "The coffee is set down in front of you." /
 * "Thank them." — which is exactly the card the learner needs in order to
 * choose. Nothing is generated: a seed with no scene shows its job alone rather
 * than having one invented for it.
 */
export function catalogueCard(seed: PracticeSeed): { scene: string | null; job: string } {
  const payload = (seed.exercise as { payload?: Record<string, unknown> }).payload ?? {};
  const scene =
    typeof payload.context === "string" && payload.context.length > 0
      ? payload.context
      : typeof payload.situation === "string" && payload.situation.length > 0
        ? payload.situation
        : null;
  const job =
    typeof payload.prompt === "string" && payload.prompt.length > 0
      ? payload.prompt
      : typeof payload.communicativeGoal === "string"
        ? payload.communicativeGoal
        : "Practise this";
  return { scene, job };
}
