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
  TODAYS_SET_MAX,
  type PracticeCandidate,
  type WeakTagSignal,
} from "../learning-engine/practice-selector";
import type { LearningItem, Lesson } from "../lessonTypes";
import type { PracticeDifficulty, PracticeOperation, PracticeSeed } from "./practiceTypes";
import {
  PRACTICE_MOMENTS,
  momentSeeds,
  type PracticeMoment,
} from "./practiceMoments";

/** One action in a planned session. */
export type PracticeSessionAction = {
  seed: PracticeSeed;
  /** @internal keying and follow-up only — never rendered raw. */
  itemId: string;
  /** @internal reducer-owned coarse path — never rendered raw. */
  path: PracticePoolPath;
  /** Set on every step of a micro-moment, so the runner can frame the scene. */
  moment?: PracticeMoment;
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
  /**
   * When the learner last met each seed, by bare seed id. Absent = never.
   *
   * Without it "which exercise have I already done?" was per-session state:
   * every item returned through its single highest-ranked seed, forever. A
   * full-reach learner met 34 of 143 seeds across twelve sessions, saw no
   * listening at all, and met one reconstruction in seventy-two actions.
   */
  seedHistory?: ReadonlyMap<string, number>;
  items: Readonly<Record<string, LearningItem>>;
  lessons: readonly Lesson[];
  seeds: readonly PracticeSeed[];
  now: number;
  budget: number;
};

export const MAX_CONSECUTIVE_SAME_OPERATION = 2;
export const MAX_CONSECUTIVE_SAME_SURFACE = 2;

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

/**
 * Surfaces where the learner GENERATES the French rather than selecting it.
 *
 * This is the evidence line, not a UI one: typed, context and dictation all
 * resolve to a production primitive, while choice, fill, build and listen are
 * capped at recognition. It matters for Stretch — an item the learner has
 * already produced should not be handed selection work just because the session
 * wanted variety.
 */
const PRODUCTION_SURFACES: ReadonlySet<string> = new Set(["typed", "context", "dictation"]);

const DIFFICULTY_PREFERENCE: Readonly<Record<PracticePoolPath, readonly PracticeDifficulty[]>> =
  Object.freeze({
    build: ["easy", "medium", "hard"],
    stretch: ["hard", "medium", "easy"],
    challenge: ["easy", "medium", "hard"],
  });

/** The French a seed expects. Used only for the "not twice in a row" guard. */
export function expectedAnswerOf(seed: PracticeSeed): string {
  if (seed.exercise.type === "weave") return seed.exercise.payload.expectedAnswers[0] ?? "";
  if (seed.exercise.type === "practice-build") return seed.exercise.payload.targetText;
  const correct = seed.exercise.payload.options.find((o) => o.isCorrect);
  return correct?.text ?? "";
}

/**
 * The French to SHOW the learner for a seed, which is not always what was
 * graded. A choice grades one word — "un", "voudrais" — and listing that under
 * "You brought back" reads as noise rather than as language. The reveal's short
 * form is the sentence the word completed, and that is what they actually made.
 */
export function summaryLineOf(seed: PracticeSeed): string {
  if (seed.exercise.type === "weave") return seed.exercise.payload.expectedAnswers[0] ?? "";
  if (seed.exercise.type === "practice-build") return seed.exercise.payload.targetText;
  return seed.exercise.payload.reveal.short ?? "";
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
  const seedHistory = input.seedHistory ?? new Map<string, number>();
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

  // ── spacing across sessions ───────────────────────────────────────────
  //
  // `selectTodaysSet` orders due items oldest-first, which is right, and has
  // one consequence it cannot see: an item that never leaves a low Leitner box
  // is permanently the most overdue thing the learner owns. Six such items were
  // taking roughly 85% of every session -- `adverb-ou-where` appeared in all
  // sixty -- while three items were never selected at all and sixty-five seeds
  // were dead content.
  //
  // So when there is more eligible material than the session needs, the items
  // practised most recently step aside for this sitting. It is spacing, not a
  // second priority model: due-ness and weakness still order everything that
  // remains, a WEAK item is never set aside, and enough candidates are always
  // kept to fill the budget.
  const spaced = withoutJustPractised(candidates, snapshot, seedsForItem, seedHistory, budget);
  const todays = selectTodaysSet({ due: spaced, weakTags, budget, now });

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
    const seed = pickSeed(pool, info.path, actions, usedSeedIds, seedHistory);
    if (!seed) continue; // every seed for this item is spent — a shorter set is fine
    if (breaksAnyRunRule(seed, actions) && !deferred.has(itemId) && queue.length > 0) {
      deferred.add(itemId);
      queue.push(itemId);
      continue;
    }
    usedSeedIds.add(seed.id);
    actions.push({ seed, itemId, path: info.path });
  }

  return {
    actions: withMicroMoment(actions, seeds, reached, reachedLessons, seedHistory),
    requested: todays.requested,
  };
}

/**
 * Turn part of the session into one small connected scene, when the selector
 * has already chosen to work that language today.
 *
 * Emergent rather than forced: no item is ever selected BECAUSE a moment wanted
 * it. The trigger is what the session already contains.
 *
 * The trigger is the ITEM, not the seed, and that distinction is the whole
 * reason moments were unreliable. The selector chooses an item first and only
 * then an exercise for it, so requiring the exact authored seed to be drawn
 * meant a learner could be working `chunk-je-voudrais` today, have a scene
 * built on `chunk-je-voudrais` sitting in the pool, and still never see it —
 * the planner had simply picked that item's dictation instead. Matching on the
 * item asks the honest question: is this session already about this language?
 *
 * Where several scenes qualify, the one the session covers most is played, so
 * frequency never comes at the cost of coherence — a scene sharing two of
 * today's items is more truly today's session than one sharing a single item.
 * Ties go to the scene least recently played, and a scene the learner has just
 * been through steps aside if any other qualifies. When none does, the session
 * has none. That is a real outcome, not a failure to fill a quota.
 *
 * At most one per session, never past the canon ceiling, and only when every
 * step is lawful for this learner and not already spent elsewhere.
 */
/**
 * When the learner's most recent practice SITTING began.
 *
 * A sitting, not an event: the steps of one session are seconds apart and the
 * next session is a day later, so anything inside this window was part of the
 * same visit. Comparing against the single newest event instead was wrong in a
 * way that quietly halved the effect — a scene is rarely the last thing played
 * in a sitting, so a scene played moments ago did not look recent.
 */
const SITTING_WINDOW_MS = 60 * 60 * 1000;

function lastSittingStart(seedHistory: ReadonlyMap<string, number>): number {
  let latest = Number.NEGATIVE_INFINITY;
  for (const at of seedHistory.values()) if (at > latest) latest = at;
  return latest === Number.NEGATIVE_INFINITY ? latest : latest - SITTING_WINDOW_MS;
}

/**
 * When this scene last played AS A SCENE, or -Infinity if it never has.
 *
 * Every step within one sitting, not merely each step seen at some point. The
 * looser reading silenced scenes that had never actually been played: a scene's
 * exercises are ordinary pool seeds and get drawn individually all the time, so
 * having met one of them yesterday made the whole scene look freshly played and
 * a mid-path learner received none at all.
 */
function lastPlayedAsScene(
  steps: readonly PracticeSeed[],
  seedHistory: ReadonlyMap<string, number>,
): number {
  const times = steps.map((s) => seedHistory.get(s.id));
  if (times.some((t) => t === undefined)) return Number.NEGATIVE_INFINITY;
  const played = times as number[];
  const latest = Math.max(...played);
  const earliest = Math.min(...played);
  return latest - earliest <= SITTING_WINDOW_MS ? latest : Number.NEGATIVE_INFINITY;
}

/** The session as it would be with this scene spliced in. */
function withScene(
  actions: readonly PracticeSessionAction[],
  covered: readonly number[],
  steps: readonly PracticeSeed[],
  moment: PracticeMoment,
): PracticeSessionAction[] {
  const at = covered[0];
  const replaced = new Set(covered);
  const path = actions[at].path;
  return [
    ...actions.filter((_, i) => i < at && !replaced.has(i)),
    ...steps.map((seed) => ({
      seed,
      itemId: seed.targetItemIds[0],
      path,
      moment,
    })),
    ...actions.filter((_, i) => i > at && !replaced.has(i)),
  ];
}

/**
 * Does a strong learner still spend this session mostly producing?
 *
 * The selector is capped at one recognition action for items the learner
 * already produces cleanly. A scene cannot honour that number, because almost
 * every authored scene opens on a beat of understanding before it asks for
 * language, so a fixed cap of one silenced scenes almost entirely. The number
 * was never the point: it stood in for "a strong learner should not spend the
 * sitting being shown answers". That is what is checked here, and a scene may
 * spend its narrative beat as long as production still outweighs it.
 */
function mostlyProductionOnStretch(actions: readonly PracticeSessionAction[]): boolean {
  const stretch = actions.filter((a) => a.path === "stretch");
  const produced = stretch.filter((a) => PRODUCTION_SURFACES.has(a.seed.surface)).length;
  return produced > stretch.length - produced;
}

function withMicroMoment(
  actions: readonly PracticeSessionAction[],
  seeds: readonly PracticeSeed[],
  reachedItems: ReadonlySet<string>,
  reachedLessons: ReadonlySet<string>,
  seedHistory: ReadonlyMap<string, number>,
): PracticeSessionAction[] {
  const todaysItems = new Set(actions.map((a) => a.itemId));

  type Candidate = {
    moment: PracticeMoment;
    steps: PracticeSeed[];
    covered: number[];
    lastPlayed: number;
  };
  const candidates: Candidate[] = [];

  for (const moment of PRACTICE_MOMENTS) {
    const steps = momentSeeds(moment, seeds);
    if (!steps) continue;
    if (!steps.every((s) => seedIsLawfulFor(s, reachedItems, reachedLessons))) continue;

    // Which of today's actions this scene is already about.
    const momentItems = new Set(steps.map((s) => s.targetItemIds[0]));
    const covered = actions
      .map((a, i) => (momentItems.has(a.itemId) ? i : -1))
      .filter((i) => i >= 0);
    if (covered.length === 0) continue;

    // Those actions give way to the scene; the rest of the session must still fit.
    if (actions.length - covered.length + steps.length > TODAYS_SET_MAX) continue;

    // A step already being practised elsewhere in the session would appear twice.
    const elsewhere = new Set(
      actions.filter((_, i) => !covered.includes(i)).map((a) => a.seed.id),
    );
    if (steps.some((s) => elsewhere.has(s.id))) continue;

    // A scene may not turn a strong learner's sitting into recognition work.
    // The test is the invariant rather than a fixed count: whatever the scene
    // adds, a learner who produces this language cleanly must still spend more
    // of the session producing it than picking it out of a list.
    if (!mostlyProductionOnStretch(withScene(actions, covered, steps, moment))) continue;

    candidates.push({
      moment,
      steps,
      covered,
      lastPlayed: lastPlayedAsScene(steps, seedHistory),
    });
  }

  if (candidates.length === 0) return [...actions];

  // Most of today's session first, then least recently played.
  candidates.sort(
    (a, b) => b.covered.length - a.covered.length || a.lastPlayed - b.lastPlayed,
  );

  // A scene just played steps aside, so a learner practising daily does not
  // walk into the same café every morning. Where another scene qualifies it
  // takes the slot; where none does the session simply has no scene, which is
  // the right answer for an early learner who has only met one situation. An
  // L1 learner alternating scene, none, scene reads as a life; the same café
  // five mornings running reads as a loop.
  const freshest = candidates[0];
  const alternatives = candidates.filter((c) => c.lastPlayed < freshest.lastPlayed);
  const justPlayed =
    freshest.lastPlayed !== Number.NEGATIVE_INFINITY &&
    freshest.lastPlayed >= lastSittingStart(seedHistory);
  if (alternatives.length === 0 && justPlayed) return [...actions];
  const chosen = alternatives.length > 0 && justPlayed ? alternatives[0] : freshest;

  return withScene(actions, chosen.covered, chosen.steps, chosen.moment);
}

/**
 * Drop the most recently practised items when the pool is bigger than the
 * session, so a perpetually-overdue few cannot own every sitting.
 *
 * Bounded twice over, because both bounds were learned the hard way. Shrinking
 * the pool toward the budget collapsed sessions to two actions: most items
 * share the `chunk` family, so the survivors could be family-homogeneous and
 * the canon diversity pass then had nothing legal left to place. So at most ONE
 * session's worth of just-practised material steps aside, and never below twice
 * the budget. A short session is a worse outcome than a repeated one.
 *
 * A weak item is never set aside.
 */
function withoutJustPractised(
  candidates: readonly PracticeCandidate[],
  snapshot: MasterySnapshot,
  seedsForItem: ReadonlyMap<string, PracticeSeed[]>,
  seedHistory: ReadonlyMap<string, number>,
  budget: number,
): PracticeCandidate[] {
  const floor = budget * 2;
  if (candidates.length <= floor) return [...candidates];

  const lastPractised = (itemId: string): number => {
    let latest = Number.NEGATIVE_INFINITY;
    for (const seed of seedsForItem.get(itemId) ?? []) {
      const at = seedHistory.get(seed.id);
      if (at !== undefined && at > latest) latest = at;
    }
    return latest;
  };

  const weak = (itemId: string): boolean => snapshot.items[itemId]?.isWeak === true;
  const droppable = candidates
    .filter((c) => !weak(c.itemId) && lastPractised(c.itemId) > Number.NEGATIVE_INFINITY)
    .sort(
      (a, b) =>
        lastPractised(b.itemId) - lastPractised(a.itemId) ||
        (a.itemId < b.itemId ? -1 : 1),
    );

  // At most one session's worth steps aside, so the pool stays varied enough
  // for the family-diversity pass to actually place a full set.
  const room = Math.min(candidates.length - floor, budget);
  const setAside = new Set(droppable.slice(0, room).map((c) => c.itemId));
  return candidates.filter((c) => !setAside.has(c.itemId));
}

/** Would appending this seed make three consecutive actions share a job or a surface? */
function breaksAnyRunRule(
  seed: PracticeSeed,
  soFar: readonly PracticeSessionAction[],
): boolean {
  const opTail = soFar.slice(-MAX_CONSECUTIVE_SAME_OPERATION);
  const surfaceTail = soFar.slice(-MAX_CONSECUTIVE_SAME_SURFACE);
  const sameJob =
    opTail.length === MAX_CONSECUTIVE_SAME_OPERATION &&
    opTail.every((a) => a.seed.operation === seed.operation);
  const sameSurface =
    surfaceTail.length === MAX_CONSECUTIVE_SAME_SURFACE &&
    surfaceTail.every((a) => a.seed.surface === seed.surface);
  return sameJob || sameSurface;
}

/**
 * Choose the seed for one item.
 *
 * Two axes are kept apart deliberately. The JOB (retrieve / produce / repair /
 * apply) is pedagogy and is ranked by the reducer-owned path. The SURFACE
 * (choice / fill / build / typed / context / listen / dictation) is what the
 * learner's hands do, and it is a QUALITY constraint — never a reason to pass
 * over a weak or due item. So surface never changes WHICH item returns, only
 * which of that item's seeds it returns through.
 *
 * The run rules are hard filters rather than tie-breakers, because "no three
 * identical jobs in a row" and "not the same French twice running" are the
 * difference between a session and a drill. Preferring an unseen surface is a
 * soft preference underneath them: it makes a varied session without ever
 * emptying a thin one.
 */
function pickSeed(
  pool: readonly PracticeSeed[],
  path: PracticePoolPath,
  soFar: readonly PracticeSessionAction[],
  usedSeedIds: ReadonlySet<string>,
  seedHistory: ReadonlyMap<string, number>,
): PracticeSeed | null {
  const opPref = OPERATION_PREFERENCE[path];
  const diffPref = DIFFICULTY_PREFERENCE[path];
  const seenSurfaces = new Set(soFar.map((a) => a.seed.surface));
  const seenOperations = new Set(soFar.map((a) => a.seed.operation));
  // Two separate allowances, because they ration different things.
  //
  // Listening is the INPUT channel, not another recognition widget, so it gets
  // its own slot. Sharing one selection budget with reconstruction and choice
  // starved it completely: every item carries a single listen seed against two
  // to five competing selection seeds, so listening sat at the back of a queue
  // it never reached — zero listening actions in seventy-two.
  const spentStretchSelection = soFar.some(
    (a) =>
      a.path === "stretch" &&
      !PRODUCTION_SURFACES.has(a.seed.surface) &&
      a.seed.surface !== "listen",
  );
  // One listening moment per session, whatever path it came from. Present, and
  // never the shape of the session.
  const spentListening = soFar.some((a) => a.seed.surface === "listen");
  const rank = (seed: PracticeSeed): number => {
    const op = opPref.indexOf(seed.operation);
    const diff = diffPref.indexOf(seed.difficulty);
    const opRank = op < 0 ? opPref.length : op;
    const diffRank = diff < 0 ? diffPref.length : diff;
    const freshJob = seenOperations.has(seed.operation) ? 1 : 0;
    const freshSurface = seenSurfaces.has(seed.surface) ? 1 : 0;
    // Work the learner has never met leads everything else. Within one item
    // that is what makes the pool rotate instead of replaying its favourite.
    const doneBefore = seedHistory.has(seed.id) ? 1 : 0;

    // CHALLENGE is the weak path, and there variety must not dilute pedagogy:
    // a weak item needs its repair first, whatever the session has already
    // done. Surface freshness still breaks ties underneath.
    // One listening moment per session, on any path.
    if (seed.surface === "listen" && spentListening) return Number.MAX_SAFE_INTEGER;

    // CHALLENGE keeps repair first — a weak item needs its repair whatever the
    // session has done — but prefers a repair the learner has not just seen.
    if (path === "challenge") {
      return opRank * 10_000 + doneBefore * 1_000 + freshSurface * 100 + diffRank;
    }

    // STRETCH is language the learner has already produced, so it keeps
    // producing — but "keeps producing" is not "never anything else". Banning
    // selection outright here made a quarter of the pool unreachable: after a
    // clean run through the lessons THIRTY of thirty-one items sit on Stretch,
    // so no reconstruction and no listening recognition could ever be offered
    // to a learner who had simply done well. The rule is therefore a budget,
    // not a ban: at most ONE selection action per session may come from a
    // strong item, and a production surface still wins whenever both are
    // equally fresh.
    if (path === "stretch") {
      // Listening is NOT penalised here, and that is the point. Choice, fill
      // and build are lower-scaffold routes to the same retrieval, so a strong
      // item should not be handed them instead of producing. Listening is a
      // different CHANNEL: producing "Merci." independently says nothing about
      // recognising it by ear. Treating it as scaffolding kept it at zero
      // actions in seventy-two, which is not "distinct", it is absent.
      const selection =
        PRODUCTION_SURFACES.has(seed.surface) || seed.surface === "listen" ? 0 : 1;
      // Listening spends its own allowance, checked above, not this one.
      if (selection === 1 && seed.surface !== "listen" && spentStretchSelection) {
        return Number.MAX_SAFE_INTEGER;
      }
      return (
        doneBefore * 100_000 +
        freshJob * 1000 +
        selection * 500 +
        freshSurface * 100 +
        opRank * 10 +
        diffRank
      );
    }

    // BUILD is language met but not yet owned, and there every surface is fair.
    // Leading with work the session has not done yet is what stopped a
    // clean-run learner receiving four applies out of six.
    return doneBefore * 100_000 + freshJob * 1000 + freshSurface * 100 + opRank * 10 + diffRank;
  };

  const opTail = soFar.slice(-MAX_CONSECUTIVE_SAME_OPERATION);
  const surfaceTail = soFar.slice(-MAX_CONSECUTIVE_SAME_SURFACE);
  const opRunWouldRepeat = (seed: PracticeSeed): boolean =>
    opTail.length === MAX_CONSECUTIVE_SAME_OPERATION &&
    opTail.every((a) => a.seed.operation === seed.operation);
  const surfaceRunWouldRepeat = (seed: PracticeSeed): boolean =>
    surfaceTail.length === MAX_CONSECUTIVE_SAME_SURFACE &&
    surfaceTail.every((a) => a.seed.surface === seed.surface);
  const lastAnswer = soFar.length > 0 ? expectedAnswerOf(soFar[soFar.length - 1].seed) : null;

  // Ties break on pool order, which is authored order — so the same learner
  // state produces the same session every time it is planned.
  const lastSeen = (seed: PracticeSeed): number =>
    seedHistory.get(seed.id) ?? Number.NEGATIVE_INFINITY;
  const ordered = [...pool]
    .map((seed, index) => ({ seed, index }))
    .sort(
      (a, b) =>
        rank(a.seed) - rank(b.seed) ||
        // Equal on every quality term: the one met longest ago returns first.
        lastSeen(a.seed) - lastSeen(b.seed) ||
        a.index - b.index,
    )
    .map((x) => x.seed)
    .filter((seed) => !usedSeedIds.has(seed.id));

  const acceptable = ordered.filter(
    (seed) =>
      !opRunWouldRepeat(seed) &&
      !surfaceRunWouldRepeat(seed) &&
      expectedAnswerOf(seed) !== lastAnswer,
  );
  // Falling back to `ordered` keeps a thin pool usable: a diversity rule that
  // empties the session is worse than a session with one repeated job in it.
  return acceptable[0] ?? ordered[0] ?? null;
}
