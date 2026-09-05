/**
 * Practice session planner — pure, deterministic, explicit `now`.
 *
 * WHAT IT REUSES. Everything about WHO returns today: the reducer-owned
 * `practiceEligibility` through `selectPracticePoolBuckets`, and the canon
 * priority in `selectTodaysSet` (due oldest-first, then weakness, then family
 * diversity, clamped to the 5-8 band). None of that is reimplemented and none
 * of it is re-weighted here. Selection decides what is OFFERED; the reducer
 * decides what the learner KNOWS, and this file never writes to the second.
 *
 * WHAT IT ADDS. Only the question the Practice Pool never had to answer: given
 * an item that should return, WHICH seed does the learner actually meet? That
 * is where a session stops being ten weaves — the same item on a second visit
 * should change the cognitive job, not repeat the sentence.
 *
 * ELIGIBILITY has two parts, and they answer different questions.
 *
 * REACH is a ceiling: a seed's origin lesson must be one the learner has
 * actually been inside. Without it, item-level reach alone leaks — `chunk-c-est`
 * is met in L3 inside "Ce n'est pas ici.", which would make L8's "C'est ici."
 * buildable for an L3 learner who has never seen the affirmative form. Lesson
 * reach is derived from the event log, never assumed from the registry.
 *
 * EVIDENCE decides what happens inside that ceiling: every id in
 * `requiredItemIds` must already carry evidence in the snapshot. So reaching L4
 * does not mean owning all of L4 — the reducer says which of it needs work, and
 * an item that merely exists in the registry is not "reached" by existing.
 *
 * Neither half is "lesson completed = mastered". A learner can be four lessons
 * in and still owe practice on the first one.
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
import type { LearningItem, Lesson } from "../lessonTypes";
import type { PracticeDifficulty, PracticeOperation, PracticeSeed } from "./practiceTypes";

/** One action in a planned session. */
export type PracticeSessionAction = {
  seed: PracticeSeed;
  /** @internal keying and follow-up only — never rendered raw. */
  itemId: string;
  /** @internal reducer-owned coarse path — never rendered raw. */
  path: PracticePoolPath;
};

export type PracticeSessionPlan = {
  actions: PracticeSessionAction[];
  /** The 5-8 clamp the selector applied. A plan may legitimately be shorter. */
  requested: number;
};

export type PlanPracticeSessionInput = {
  snapshot: MasterySnapshot;
  /**
   * Lesson ids the learner has real evidence in. The reach ceiling; derived
   * from the append-only log by `reachedLessonIds`, never guessed.
   */
  reachedLessons: ReadonlySet<string>;
  items: Readonly<Record<string, LearningItem>>;
  lessons: readonly Lesson[];
  seeds: readonly PracticeSeed[];
  now: number;
  budget: number;
};

export const MAX_CONSECUTIVE_SAME_OPERATION = 2;

/**
 * Per-path seed preference.
 *
 * BUILD is language the learner has met but does not independently own, so it
 * leads with retrieval and contrast. STRETCH is already produced, so it leads
 * with application and unscaffolded production. CHALLENGE is a real weakness,
 * and a weak learner needs a good repair path rather than a harder question —
 * so it leads with repair and follows with ordinary use, never with "hard".
 */
const OPERATION_PREFERENCE: Readonly<Record<PracticePoolPath, readonly PracticeOperation[]>> =
  Object.freeze({
    build: ["retrieve", "repair", "produce", "apply"],
    stretch: ["apply", "produce", "repair", "retrieve"],
    challenge: ["repair", "retrieve", "produce", "apply"],
  });

const DIFFICULTY_PREFERENCE: Readonly<Record<PracticePoolPath, readonly PracticeDifficulty[]>> =
  Object.freeze({
    build: ["easy", "medium", "hard"],
    stretch: ["hard", "medium", "easy"],
    challenge: ["easy", "medium", "hard"],
  });

/** The French a seed expects. Used only for the "not twice in a row" guard. */
export function expectedAnswerOf(seed: PracticeSeed): string {
  if (seed.exercise.type === "weave") return seed.exercise.payload.expectedAnswers[0] ?? "";
  const correct = seed.exercise.payload.options.find((o) => o.isCorrect);
  return correct?.text ?? "";
}

/** Every item the snapshot has ANY evidence for. The reach boundary. */
export function reachedItemIds(snapshot: MasterySnapshot): Set<string> {
  const out = new Set<string>();
  for (const [itemId, item] of Object.entries(snapshot.items)) {
    if (item.practiceEligibility !== "none") out.add(itemId);
  }
  return out;
}

/**
 * Lesson ids the learner has been inside, from the append-only log.
 *
 * Practice's own events carry `lessonId: "practice-hub"`, which matches no
 * seed's origin, so practising can never widen the learner's reach.
 */
export function reachedLessonIds(events: readonly { lessonId?: string | null }[]): Set<string> {
  const out = new Set<string>();
  for (const event of events) {
    if (typeof event.lessonId === "string" && event.lessonId.length > 0) {
      out.add(event.lessonId);
    }
  }
  return out;
}

/** True when the learner has reached the seed's lesson AND owns every piece. */
export function seedIsLawfulFor(
  seed: PracticeSeed,
  reachedItems: ReadonlySet<string>,
  reachedLessons: ReadonlySet<string>,
): boolean {
  if (!reachedLessons.has(seed.originLessonId)) return false;
  return seed.requiredItemIds.every((id) => reachedItems.has(id));
}

export function planPracticeSession(input: PlanPracticeSessionInput): PracticeSessionPlan {
  const { snapshot, items, seeds, now, budget, reachedLessons } = input;
  const reached = reachedItemIds(snapshot);

  // Lawful seeds, indexed by the items they can practise.
  const lawful = seeds.filter((s) => seedIsLawfulFor(s, reached, reachedLessons));
  const seedsForItem = new Map<string, PracticeSeed[]>();
  for (const seed of lawful) {
    for (const target of seed.targetItemIds) {
      const list = seedsForItem.get(target);
      if (list) list.push(seed);
      else seedsForItem.set(target, [seed]);
    }
  }

  // Candidates: reducer-eligible AND actually practisable with the static pool.
  const meta = new Map<string, { path: PracticePoolPath; isDue: boolean }>();
  const candidates: PracticeCandidate[] = [];
  const buckets = selectPracticePoolBuckets({ snapshot, now });
  for (const path of ["build", "stretch", "challenge"] as const) {
    for (const poolItem of buckets[path]) {
      if (!seedsForItem.has(poolItem.itemId)) continue; // nothing to do → not offered
      const registryItem = items[poolItem.itemId];
      if (!registryItem) continue;
      meta.set(poolItem.itemId, { path, isDue: poolItem.isDue });
      candidates.push({
        itemId: poolItem.itemId,
        family: registryItem.type,
        dueAt: poolItem.dueAt,
        weakPointTags: registryItem.weakPointTags ?? [],
      });
    }
  }

  // Internal-only weakness signal, exactly as the Hub projection derives it.
  const weakTags: WeakTagSignal[] = [];
  for (const candidate of candidates) {
    const wrongCount = snapshot.items[candidate.itemId]?.wrongCount ?? 0;
    if (wrongCount === 0) continue;
    for (const tag of candidate.weakPointTags) weakTags.push({ tag, errorCount: wrongCount });
  }

  const todays = selectTodaysSet({ due: candidates, weakTags, budget, now });

  // One seed per selected item, varying the cognitive job across the session.
  const actions: PracticeSessionAction[] = [];
  const usedSeedIds = new Set<string>();
  // One deferral per item, and only when taking it NOW would break the run
  // rule. A thin pool can leave an item whose every seed shares the job the
  // session just did twice; moving it later usually fixes that, and bounding
  // the retry at one pass keeps the planner finite and deterministic.
  const queue = [...todays.itemIds];
  const deferred = new Set<string>();
  while (queue.length > 0) {
    const itemId = queue.shift() as string;
    const info = meta.get(itemId);
    const pool = seedsForItem.get(itemId);
    if (!info || !pool) continue;
    const seed = pickSeed(pool, info.path, actions, usedSeedIds);
    if (!seed) continue; // every seed for this item is spent — a shorter set is fine
    if (breaksRunRule(seed, actions) && !deferred.has(itemId) && queue.length > 0) {
      deferred.add(itemId);
      queue.push(itemId);
      continue;
    }
    usedSeedIds.add(seed.id);
    actions.push({ seed, itemId, path: info.path });
  }

  return { actions, requested: todays.requested };
}

/** Would appending this seed make three consecutive actions share one job? */
function breaksRunRule(
  seed: PracticeSeed,
  soFar: readonly PracticeSessionAction[],
): boolean {
  const tail = soFar.slice(-MAX_CONSECUTIVE_SAME_OPERATION);
  return (
    tail.length === MAX_CONSECUTIVE_SAME_OPERATION &&
    tail.every((a) => a.seed.operation === seed.operation)
  );
}

/**
 * Choose the seed for one item.
 *
 * Ranked by path preference, then filtered by what the session has already
 * done. The two session rules are hard filters rather than tie-breakers,
 * because "no three identical jobs in a row" and "not the same French twice
 * running" are the difference between a session and a drill.
 */
function pickSeed(
  pool: readonly PracticeSeed[],
  path: PracticePoolPath,
  soFar: readonly PracticeSessionAction[],
  usedSeedIds: ReadonlySet<string>,
): PracticeSeed | null {
  const opPref = OPERATION_PREFERENCE[path];
  const diffPref = DIFFICULTY_PREFERENCE[path];
  const rank = (seed: PracticeSeed): number => {
    const op = opPref.indexOf(seed.operation);
    const diff = diffPref.indexOf(seed.difficulty);
    return (op < 0 ? opPref.length : op) * 10 + (diff < 0 ? diffPref.length : diff);
  };

  const tail = soFar.slice(-MAX_CONSECUTIVE_SAME_OPERATION);
  const runWouldRepeat = (op: PracticeOperation): boolean =>
    tail.length === MAX_CONSECUTIVE_SAME_OPERATION &&
    tail.every((a) => a.seed.operation === op);
  const lastAnswer = soFar.length > 0 ? expectedAnswerOf(soFar[soFar.length - 1].seed) : null;

  // Ties break on pool order, which is authored order — so the same learner
  // state produces the same session every time it is planned.
  const ordered = [...pool]
    .map((seed, index) => ({ seed, index }))
    .sort((a, b) => rank(a.seed) - rank(b.seed) || a.index - b.index)
    .map((x) => x.seed)
    .filter((seed) => !usedSeedIds.has(seed.id));

  const acceptable = ordered.filter(
    (seed) =>
      !runWouldRepeat(seed.operation) && expectedAnswerOf(seed) !== lastAnswer,
  );
  // Falling back to `ordered` keeps a thin pool usable: a diversity rule that
  // empties the session is worse than a session with one repeated job in it.
  return acceptable[0] ?? ordered[0] ?? null;
}
