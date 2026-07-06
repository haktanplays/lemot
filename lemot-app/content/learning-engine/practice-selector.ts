/**
 * Practice selector — pure "today's set" logic (Lesson Flow Canon §5.1/§5.2).
 *
 * SELECTION weight only: this module decides what is OFFERED today. It never
 * scores anything — evidence weighting lives in the mastery reducer and the
 * two must not be mixed (canon §5.3).
 *
 * House rules: pure, deterministic (same input → same output; all ties break
 * on itemId), explicit `now`, no storage, no clock reads, no AI. Fail
 * behavior: an out-of-range budget is clamped to the canon band; an
 * unsatisfiable diversity constraint ends the set early (a shorter set is a
 * natural end, never a rule break).
 *
 * Canon §5.2 priority order:
 *   1. SRS due, oldest first
 *   2. weakest weakPointTag (highest error count)
 *   3. diversity: never more than 2 consecutive picks from the same family
 * (The "approaching integration lesson needs" input arrives with the
 * Readiness Gate phase — Faz C — and slots between 2 and 3 when it exists.)
 */

export const TODAYS_SET_MIN = 5;
export const TODAYS_SET_MAX = 8;
export const MAX_CONSECUTIVE_SAME_FAMILY = 2;

export type PracticeCandidate = {
  itemId: string;
  /** Payload-family key (engine/cargo family); drives the diversity rule. */
  family: string;
  /** Epoch ms when the item became/becomes due; null = not scheduled. */
  dueAt: number | null;
  weakPointTags: readonly string[];
};

export type WeakTagSignal = { tag: string; errorCount: number };

export type TodaysSet = {
  itemIds: string[];
  /** How many actions were requested after clamping (the set may be shorter). */
  requested: number;
};

export function selectTodaysSet(input: {
  due: readonly PracticeCandidate[];
  weakTags: readonly WeakTagSignal[];
  budget: number;
  now: number;
}): TodaysSet {
  const requested = Math.min(
    TODAYS_SET_MAX,
    Math.max(TODAYS_SET_MIN, Number.isFinite(input.budget) ? Math.floor(input.budget) : TODAYS_SET_MIN),
  );

  const weakness = new Map<string, number>();
  for (const signal of input.weakTags) {
    weakness.set(signal.tag, Math.max(weakness.get(signal.tag) ?? 0, signal.errorCount));
  }
  const weaknessOf = (candidate: PracticeCandidate): number => {
    let max = 0;
    for (const tag of candidate.weakPointTags) max = Math.max(max, weakness.get(tag) ?? 0);
    return max;
  };

  // Dedupe by itemId (first occurrence wins) — a corrupted double entry must
  // not produce a double drill.
  const seen = new Set<string>();
  const pool = input.due.filter((c) => {
    if (seen.has(c.itemId)) return false;
    seen.add(c.itemId);
    return true;
  });

  const dueNow = pool
    .filter((c) => c.dueAt !== null && c.dueAt <= input.now)
    .sort((a, b) => (a.dueAt! - b.dueAt!) || (a.itemId < b.itemId ? -1 : 1));
  const rest = pool
    .filter((c) => !(c.dueAt !== null && c.dueAt <= input.now))
    .sort((a, b) => (weaknessOf(b) - weaknessOf(a)) || (a.itemId < b.itemId ? -1 : 1));

  const ordered = [...dueNow, ...rest];

  // Greedy diversity pass: honor priority order, defer a candidate that
  // would create a 3rd consecutive same-family pick, retry deferred ones
  // as soon as the family streak breaks.
  const picked: PracticeCandidate[] = [];
  const deferred: PracticeCandidate[] = [];
  const violates = (candidate: PracticeCandidate): boolean => {
    const n = picked.length;
    return (
      n >= MAX_CONSECUTIVE_SAME_FAMILY &&
      picked[n - 1].family === candidate.family &&
      picked[n - 2].family === candidate.family
    );
  };
  let cursor = 0;
  while (picked.length < requested) {
    const deferredIndex = deferred.findIndex((c) => !violates(c));
    if (deferredIndex >= 0) {
      picked.push(deferred.splice(deferredIndex, 1)[0]);
      continue;
    }
    if (cursor >= ordered.length) break; // pool + deferred exhausted or blocked
    const candidate = ordered[cursor];
    cursor += 1;
    if (violates(candidate)) {
      deferred.push(candidate);
      continue;
    }
    picked.push(candidate);
  }

  return { itemIds: picked.map((c) => c.itemId), requested };
}
