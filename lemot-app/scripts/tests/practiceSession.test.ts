/**
 * Practice Hub V1 — eligibility, planning, and the lesson→practice→mastery loop.
 *
 * The learner states here are not hand-built snapshots. Each one is produced by
 * actually PLAYING lessons through the shipped controller and interaction
 * builders, then scoring the real event log. That matters: a hand-built snapshot
 * would let this file assert whatever it liked about eligibility, and the one
 * thing worth proving is that eligibility follows from evidence a learner could
 * really have generated.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv } from "./helpers";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import type { LearningItem } from "../../content/lessonTypes";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import { LocalRepository } from "../../content/learning-engine/repository/local";
import { createLearningEngineRuntime } from "../../content/learning-engine/runtime";
import { scoreEvents, type MasterySnapshot } from "../../content/learning-engine/mastery";
import { selectLessonProgress } from "../../content/learning-engine/lesson-progress";
import { makeRegisteredEventSurface } from "../../content/identity/payloadRegistry";
import {
  choiceInteraction,
  typedAttemptInteraction,
} from "../../content/lesson-v1-evidence/interactions";
import type { LearningEvent } from "../../content/learning-engine/events";
import type { Lesson } from "../../content/lessonTypes";
import { PRACTICE_SEEDS } from "../../content/practice/seeds";
import { reviewPracticeSeeds } from "../../content/practice/practiceLawfulness";
import {
  planPracticeSession,
  reachedItemIds,
  reachedLessonIds,
  seedIsLawfulFor,
  expectedAnswerOf,
} from "../../content/practice/practicePlanner";
import { selectRepairSeed } from "../../content/practice/practiceRepair";
import { closingNote, workedOnLines } from "../../content/practice/practiceCopy";
import {
  PRACTICE_HUB_SURFACE,
  practiceChoiceAttempt,
  practiceTypedAttempt,
} from "../../content/practice/practiceInteractions";
import {
  PRACTICE_SESSION_LESSON_ID,
  isPracticeExerciseId,
  qualifyPracticeSeedId,
} from "../../content/practice/practiceIdentity";

/** Widened once: the tests index it by a runtime item id, not a literal key. */
const ITEMS = ITEM_REGISTRY as Readonly<Record<string, LearningItem>>;

const NOW = 1_800_000_000_000;
const DAY = 86_400_000;
const LESSON_SURFACE = makeRegisteredEventSurface("lesson_path");

const byNumber = (n: number): Lesson => {
  const l = V1_LESSONS.find((x) => x.number === n);
  assert(l, `lesson ${n} is registered`);
  return l as Lesson;
};

type Learner = {
  snapshot: MasterySnapshot;
  events: LearningEvent[];
  repo: LocalRepository;
  /** The reach ceiling, derived from the log exactly as the app derives it. */
  lessons: Set<string>;
};

/** Play the graded screens of the given lessons, correctly unless told otherwise. */
async function learnerAfter(
  lessonNumbers: readonly number[],
  opts: { missScreenIds?: readonly string[]; now?: number } = {},
): Promise<Learner> {
  const repo = new LocalRepository(makeFakeKv());
  const runtime = createLearningEngineRuntime({
    repository: repo,
    appBuild: "test",
    deviceInfo: { platform: "test" },
    makeSessionId: () => "sess-lesson",
  });
  const miss = new Set(opts.missScreenIds ?? []);
  let tick = 0;
  const base = opts.now ?? NOW;

  for (const n of lessonNumbers) {
    const lesson = byNumber(n);
    const controller = runtime.createSessionController({
      lessonId: lesson.id,
      contentVersion: lesson.version,
      resolveEventSurface: LESSON_SURFACE,
      now: () => base + (tick += 1_000),
      makeClientEventId: () => `evt-lesson-${tick}`,
    });
    for (const screen of flattenLessonScreens(lesson)) {
      if (screen.type === "fill-with-traps") {
        const p = screen.payload;
        const correct = p.options.find((o) => o.isCorrect);
        const wrong = p.options.find((o) => !o.isCorrect);
        const chosen = miss.has(screen.id) ? wrong : correct;
        if (!chosen) continue;
        controller.recordGradedAttempt(
          choiceInteraction(lesson, screen, { optionId: chosen.id }),
        );
      } else if (screen.type === "weave") {
        const text = miss.has(screen.id) ? "zzz" : screen.payload.expectedAnswers[0];
        controller.recordGradedAttempt(
          typedAttemptInteraction(lesson, screen, {
            text,
            hintRung: 0,
            constitutiveSupportRendered: false,
          }),
        );
      }
    }
    await controller.flush();
  }
  const events = await repo.readAllEvents();
  return {
    snapshot: scoreEvents(events),
    events,
    repo,
    lessons: reachedLessonIds(events),
  };
}

const plan = (learner: Learner, now = NOW + DAY * 40, budget = 6) =>
  planPracticeSession({
    snapshot: learner.snapshot,
    reachedLessons: learner.lessons,
    items: ITEMS,
    lessons: V1_LESSONS,
    seeds: PRACTICE_SEEDS,
    now,
    budget,
  });

// ── the pool ────────────────────────────────────────────────────────────────

describe("the static pool is lawful before anything selects from it", () => {
  test("every seed passes the practice content rules", () => {
    assertEqual(reviewPracticeSeeds(PRACTICE_SEEDS, V1_LESSONS), [], "no findings");
  });

  test("the pool has real breadth, not demo volume", () => {
    assert(PRACTICE_SEEDS.length >= 70, `only ${PRACTICE_SEEDS.length} seeds`);
    const ops = new Set(PRACTICE_SEEDS.map((s) => s.operation));
    assertEqual(ops.size, 4, "all four learner jobs are represented");
  });

  test("no two seeds share an id", () => {
    const ids = PRACTICE_SEEDS.map((s) => s.id);
    assertEqual(new Set(ids).size, ids.length, "unique seed ids");
  });
});

// ── STATE A: fresh user ─────────────────────────────────────────────────────

describe("STATE A — a learner with no evidence gets no practice", () => {
  test("an empty snapshot plans nothing at all", () => {
    const session = plan({
      snapshot: scoreEvents([]),
      events: [],
      repo: null as never,
      lessons: new Set<string>(),
    });
    assertEqual(session.actions.length, 0, "nothing is offered");
  });

  test("no seed is lawful when nothing has been reached", () => {
    const reached = reachedItemIds(scoreEvents([]));
    assertEqual(reached.size, 0, "nothing reached");
    const lawful = PRACTICE_SEEDS.filter((s) =>
      seedIsLawfulFor(s, reached, new Set<string>()),
    );
    assertEqual(lawful.length, 0, "no seed can be built");
  });
});

// ── STATE B / C: reach ──────────────────────────────────────────────────────

describe("STATE B and C — practice never runs ahead of the learner", () => {
  test("after L1 only, every planned action is L1 language", async () => {
    const learner = await learnerAfter([1]);
    const session = plan(learner);
    assert(session.actions.length > 0, "an L1 learner gets a session");
    for (const action of session.actions) {
      assertEqual(action.seed.originLessonId, "v1-lesson-001", `${action.seed.id} is L1`);
    }
  });

  test("after L1-L4, nothing from L5 or later can appear", async () => {
    const learner = await learnerAfter([1, 2, 3, 4]);
    const reached = reachedItemIds(learner.snapshot);
    const lawful = PRACTICE_SEEDS.filter((s) =>
      seedIsLawfulFor(s, reached, learner.lessons),
    );
    assert(lawful.length > 0, "an L1-L4 learner has real material");
    for (const seed of lawful) {
      const n = Number(seed.originLessonId.slice(-3));
      assert(n <= 4, `${seed.id} belongs to lesson ${n}, beyond this learner's reach`);
    }
  });

  test("the L8 question forms are unreachable before L8", async () => {
    const learner = await learnerAfter([1, 2, 3, 4]);
    const reached = reachedItemIds(learner.snapshot);
    assert(!reached.has("chunk-c-est-ou"), "c'est où has not been met");
    assert(!reached.has("chunk-est-ce-que"), "est-ce que has not been met");
    const l8 = PRACTICE_SEEDS.filter((s) => s.originLessonId === "v1-lesson-008");
    for (const seed of l8) {
      assert(
        !seedIsLawfulFor(seed, reached, learner.lessons),
        `${seed.id} must not be buildable`,
      );
    }
  });

  test("future language a lesson only PREVIEWS is never demanded", async () => {
    // L10 declares chunk-vous-pouvez / chunk-m-aider `supported`, but only ever
    // shows them on a "Just listen." card. L11 owns their production.
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const reached = reachedItemIds(learner.snapshot);
    for (const seed of PRACTICE_SEEDS.filter((s) =>
      seedIsLawfulFor(s, reached, learner.lessons),
    )) {
      for (const id of seed.targetItemIds) {
        assert(
          id !== "chunk-vous-pouvez" && id !== "chunk-m-aider",
          `${seed.id} demands preview-only language (${id})`,
        );
      }
    }
  });
});

// ── STATE D / E / F: priority ───────────────────────────────────────────────

describe("STATE D, E, F — what returns, and in what shape", () => {
  test("a weak item is prioritised, and the session stays varied", async () => {
    const learner = await learnerAfter([1, 2, 3], {
      // Three misses on one screen is the reducer's weak threshold.
      missScreenIds: ["s03-fill-polite-verb"],
    });
    const session = plan(learner);
    assert(session.actions.length >= 5, `expected a full session, got ${session.actions.length}`);
    const families = new Set(session.actions.map((a) => ITEMS[a.itemId]?.type));
    assert(families.size >= 2, "the session is not one family end to end");
  });

  test("a strong produced item reaches Stretch rather than endless recognition", async () => {
    const learner = await learnerAfter([1]);
    // Everything produced correctly in L1 should be produced-tier, not build.
    const stretched = Object.entries(learner.snapshot.items).filter(
      ([, m]) => m.practiceEligibility === "stretch",
    );
    assert(stretched.length > 0, "clean production reaches stretch");
    const session = plan(learner);
    const stretchActions = session.actions.filter((a) => a.path === "stretch");
    assert(stretchActions.length > 0, "the session offers stretch work");
    // The precise claim: where a produced item HAS lower-scaffold work available,
    // Stretch takes it. An item whose only lawful seed is a retrieval still gets
    // that retrieval — a thin pool is a reason for a smaller session, never a
    // reason to serve nothing.
    const reached = reachedItemIds(learner.snapshot);
    // Seeds already spent on an earlier item do not count as available: no seed
    // repeats inside one session, and an item arriving late can legitimately
    // find its best work already taken.
    const spent = new Set(session.actions.map((a) => a.seed.id));
    for (const action of stretchActions) {
      const alternatives = PRACTICE_SEEDS.filter(
        (s) =>
          s.targetItemIds.includes(action.itemId) &&
          seedIsLawfulFor(s, reached, learner.lessons) &&
          !spent.has(s.id) &&
          (s.operation === "apply" || s.operation === "produce"),
      );
      if (alternatives.length === 0) continue;
      assert(
        action.seed.operation === "apply" || action.seed.operation === "produce",
        `stretch served ${action.seed.operation} for ${action.itemId} despite ${alternatives.length} lower-scaffold seed(s)`,
      );
    }
  });

  test("sessions stay inside the 5-8 canon band", async () => {
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6]);
    const session = plan(learner);
    assert(session.actions.length >= 5 && session.actions.length <= 8, `${session.actions.length}`);
  });
});

// ── variety ─────────────────────────────────────────────────────────────────

describe("a session is not ten weaves", () => {
  test("a full session uses at least three cognitive jobs", async () => {
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6]);
    const session = plan(learner);
    const ops = new Set(session.actions.map((a) => a.seed.operation));
    assert(ops.size >= 3, `only ${[...ops].join(", ")}`);
  });

  test("no three consecutive actions share one job", async () => {
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6]);
    const ops = plan(learner).actions.map((a) => a.seed.operation);
    for (let i = 2; i < ops.length; i++) {
      assert(!(ops[i] === ops[i - 1] && ops[i] === ops[i - 2]), `three ${ops[i]} at ${i - 2}`);
    }
  });

  test("no seed appears twice in one session, and no answer twice running", async () => {
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6]);
    const actions = plan(learner).actions;
    const ids = actions.map((a) => a.seed.id);
    assertEqual(new Set(ids).size, ids.length, "no repeated seed");
    for (let i = 1; i < actions.length; i++) {
      assert(
        expectedAnswerOf(actions[i].seed) !== expectedAnswerOf(actions[i - 1].seed),
        `the same French twice running at ${i}`,
      );
    }
  });

  test("planning is deterministic — same state, same session", async () => {
    const learner = await learnerAfter([1, 2, 3, 4]);
    const a = plan(learner).actions.map((x) => x.seed.id);
    const b = plan(learner).actions.map((x) => x.seed.id);
    assertEqual(a.join(","), b.join(","), "identical plans");
  });

  test("practice is cross-lesson, not a lesson folder", async () => {
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6]);
    const lessons = new Set(plan(learner).actions.map((a) => a.seed.originLessonId));
    assert(lessons.size >= 2, `session drew from only ${[...lessons].join(", ")}`);
  });
});

// ── evidence ────────────────────────────────────────────────────────────────

/** Play planned actions through a practice-origin controller on the SAME log. */
async function practiceThrough(
  learner: Learner,
  actions: readonly { seed: (typeof PRACTICE_SEEDS)[number] }[],
  opts: { miss?: boolean; now?: number } = {},
): Promise<Learner> {
  const runtime = createLearningEngineRuntime({
    repository: learner.repo,
    appBuild: "test",
    deviceInfo: { platform: "test" },
    makeSessionId: () => "sess-practice",
  });
  let tick = 0;
  const base = opts.now ?? NOW + DAY * 40;
  const controller = runtime.createSessionController({
    lessonId: PRACTICE_SESSION_LESSON_ID,
    contentVersion: "practice-v1",
    resolveEventSurface: PRACTICE_HUB_SURFACE,
    now: () => base + (tick += 1_000),
    makeClientEventId: () => `evt-practice-${tick}`,
  });

  for (const { seed } of actions) {
    const origin = V1_LESSONS.find((l) => l.id === seed.originLessonId) as Lesson;
    if (seed.exercise.type === "fill-with-traps") {
      const options = seed.exercise.payload.options;
      const chosen = opts.miss
        ? options.find((o) => !o.isCorrect)
        : options.find((o) => o.isCorrect);
      if (chosen) {
        controller.recordGradedAttempt(practiceChoiceAttempt(seed, origin, { optionId: chosen.id }));
      }
    } else {
      controller.recordGradedAttempt(
        practiceTypedAttempt(seed, origin, {
          text: opts.miss ? "zzz" : seed.exercise.payload.expectedAnswers[0],
          hintRung: 0,
          constitutiveSupportRendered: false,
        }),
      );
    }
  }
  await controller.flush();
  const events = await learner.repo.readAllEvents();
  return {
    snapshot: scoreEvents(events),
    events,
    repo: learner.repo,
    lessons: reachedLessonIds(events),
  };
}

describe("practice writes real evidence, and only its own", () => {
  test("every practice event carries a practice-namespaced exercise id", async () => {
    const learner = await learnerAfter([1, 2, 3]);
    const after = await practiceThrough(learner, plan(learner).actions);
    const practiceEvents = after.events.filter(
      (e) => e.lessonId === PRACTICE_SESSION_LESSON_ID,
    );
    assert(practiceEvents.length > 0, "practice appended events");
    for (const event of practiceEvents) {
      assert(
        isPracticeExerciseId(event.exerciseId),
        `${event.exerciseId} is not in the practice namespace`,
      );
    }
  });

  test("PRACTICE MUST NOT COMPLETE LESSONS", async () => {
    // The §23 invariant, tested where it would actually break:
    // `selectLessonProgress` matches on exerciseId and ignores lessonId, so a
    // practice event wearing a lesson id would silently complete a lesson.
    const learner = await learnerAfter([1]);
    const required = flattenLessonScreens(byNumber(4)).map((s) => `v1-lesson-004/${s.id}`);
    const before = selectLessonProgress({
      events: learner.events,
      lessonId: "v1-lesson-004",
      exerciseIds: required,
    });
    assertEqual(before.attempted, 0, "L4 untouched to begin with");

    // Practise everything lawful, many times over.
    let after = learner;
    for (let round = 0; round < 4; round += 1) {
      after = await practiceThrough(after, plan(after).actions, {
        now: NOW + DAY * (40 + round),
      });
    }
    const progress = selectLessonProgress({
      events: after.events,
      lessonId: "v1-lesson-004",
      exerciseIds: required,
    });
    assertEqual(progress.attempted, 0, "practice attempted no L4 screen");
    assertEqual(progress.completed, false, "practice completed no lesson");
    assertEqual(progress.started, false, "practice started no lesson");
  });

  test("a practice id can never collide with a lesson screen id", () => {
    const lessonIds = new Set(
      V1_LESSONS.flatMap((l) => flattenLessonScreens(l).map((s) => `${l.id}/${s.id}`)),
    );
    for (const seed of PRACTICE_SEEDS) {
      assert(
        !lessonIds.has(qualifyPracticeSeedId(seed.id)),
        `${seed.id} collides with a lesson screen id`,
      );
    }
  });

  test("re-recording the same attempt does not double-count", async () => {
    const learner = await learnerAfter([1]);
    const one = plan(learner).actions.slice(0, 1);
    const after = await practiceThrough(learner, one);
    const seedId = qualifyPracticeSeedId(one[0].seed.id);
    const matching = after.events.filter((e) => e.exerciseId === seedId);
    assertEqual(matching.length, 1, "one attempt produced exactly one event");
    const clientIds = after.events.map((e) => e.clientEventId);
    assertEqual(new Set(clientIds).size, clientIds.length, "no duplicate client event ids");
  });
});

// ── STATE G / the loop ──────────────────────────────────────────────────────

describe("the lesson → practice → mastery loop", () => {
  test("a practice success moves the item and changes what is offered next", async () => {
    // Build a learner with a genuinely weak item: three misses on L1's polite
    // verb takes chunk-je-voudrais to `challenge` through the reducer.
    const learner = await learnerAfter([1, 2, 3], {
      missScreenIds: ["s03-fill-polite-verb"],
    });

    const first = plan(learner);
    assert(first.actions.length > 0, "the weak learner gets a session");

    const after = await practiceThrough(learner, first.actions);

    // Evidence really landed, through the ordinary reducer.
    assert(
      after.events.length > learner.events.length,
      "practice appended to the same append-only log",
    );
    const practised = first.actions.flatMap((a) => a.seed.targetItemIds);
    let moved = 0;
    for (const itemId of new Set(practised)) {
      const before = learner.snapshot.items[itemId];
      const now = after.snapshot.items[itemId];
      if (!before || !now) continue;
      if (
        now.practiceEligibility !== before.practiceEligibility ||
        now.dueAt !== before.dueAt ||
        now.leitnerBox !== before.leitnerBox ||
        now.productionSuccess !== before.productionSuccess ||
        now.recognitionSuccess !== before.recognitionSuccess
      ) {
        moved += 1;
      }
    }
    assert(moved > 0, "practising changed the learner's mastery state");

    // And the next session is not the same session.
    const second = planPracticeSession({
      snapshot: after.snapshot,
      reachedLessons: after.lessons,
      items: ITEMS,
      lessons: V1_LESSONS,
      seeds: PRACTICE_SEEDS,
      now: NOW + DAY * 41,
      budget: 6,
    });
    assert(
      second.actions.map((a) => a.seed.id).join(",") !==
        first.actions.map((a) => a.seed.id).join(","),
      "future selection reflects what was just practised",
    );
  });

  test("a practice miss is recorded as a real miss", async () => {
    const learner = await learnerAfter([1, 2]);
    const session = plan(learner);
    const after = await practiceThrough(learner, session.actions.slice(0, 1), { miss: true });
    const target = session.actions[0].seed.targetItemIds[0];
    const before = learner.snapshot.items[target];
    const now = after.snapshot.items[target];
    assert(now !== undefined, "the item is tracked");
    assert(
      (now?.wrongCount ?? 0) > (before?.wrongCount ?? 0),
      "the miss reached the reducer",
    );
  });
});

// ── STATE H + the repair loop ───────────────────────────────────────────────

describe("STATE H — nothing due is still a session, never a dead end", () => {
  test("a learner with nothing due gets calm reinforcement rather than an empty screen", async () => {
    const learner = await learnerAfter([1, 2, 3]);
    // `now` immediately after the lesson: the Leitner intervals have not
    // elapsed, so nothing is due. The pool orders by due-ness but never filters
    // on it, which is what keeps this from being a dead end.
    const session = plan(learner, NOW + 60_000);
    assert(session.actions.length > 0, "reinforcement is still offered");
    assert(session.actions.length >= 5, `expected a full set, got ${session.actions.length}`);
  });
});

describe("the repair loop", () => {
  test("a missed choice is answered by different work on the same confusion", async () => {
    const learner = await learnerAfter([1, 2, 3]);
    const reached = reachedItemIds(learner.snapshot);
    // L3's negation contrast is the canonical miss on the early path.
    const missed = PRACTICE_SEEDS.find((s) => s.id === "p-l3-repair-verb-in-sandwich");
    assert(missed, "the negation contrast seed exists");
    const repair = selectRepairSeed({
      missed: missed!,
      seeds: PRACTICE_SEEDS,
      reachedItems: reached,
      reachedLessons: learner.lessons,
      usedSeedIds: new Set([missed!.id]),
    });
    assert(repair !== null, "the pool offers a repair");
    assert(
      repair!.operation !== missed!.operation,
      "repair changes the cognitive job rather than repeating the question",
    );
    assert(repair!.id !== missed!.id, "never the identical exercise again");
    assert(
      seedIsLawfulFor(repair!, reached, learner.lessons),
      "the repair is itself lawful for this learner",
    );
  });

  test("a repair is never drawn from language the learner has not reached", async () => {
    const learner = await learnerAfter([1]);
    const reached = reachedItemIds(learner.snapshot);
    for (const missed of PRACTICE_SEEDS.filter((s) =>
      seedIsLawfulFor(s, reached, learner.lessons),
    )) {
      const repair = selectRepairSeed({
        missed,
        seeds: PRACTICE_SEEDS,
        reachedItems: reached,
        reachedLessons: learner.lessons,
        usedSeedIds: new Set([missed.id]),
      });
      if (repair === null) continue;
      assert(
        seedIsLawfulFor(repair, reached, learner.lessons),
        `${repair.id} is beyond this learner`,
      );
    }
  });

  test("every repair-tagged seed repairs something a seed can actually miss", () => {
    // A repair tag nothing carries is a repair that can never be triggered.
    const carried = new Set(
      PRACTICE_SEEDS.flatMap((s) => s.exercise.weakPointTags ?? []),
    );
    for (const seed of PRACTICE_SEEDS) {
      if (seed.repairsTag === undefined) continue;
      assert(
        carried.has(seed.repairsTag),
        `${seed.id} repairs "${seed.repairsTag}", which no seed carries`,
      );
    }
  });
});

// ── the learner surface ─────────────────────────────────────────────────────

describe("the Practice surface shows French, never internals", () => {
  /** Source with comment lines removed — a prose mention is not a render. */
  const read = (rel: string): string =>
    readFileSync(join(process.cwd(), rel), "utf8")
      .split("\n")
      .filter(
        (l) =>
          !l.trim().startsWith("*") &&
          !l.trim().startsWith("//") &&
          !l.trim().startsWith("/*"),
      )
      .join("\n");

  test("the shipped route plans a session and imports no legacy v7 practice", () => {
    const route = read("app/(tabs)/practice-hub.tsx");
    assert(route.includes("planPracticeSession"), "the route plans a session");
    for (const legacy of [
      "useSRS",
      "practiceScenarios",
      "@/data/flashcards",
      "LessonPractice",
      "PracticeHubPractice",
    ]) {
      assert(!route.includes(legacy), `the route must not import ${legacy}`);
    }
  });

  test("the legacy v7 practice route stays unreachable", () => {
    const layout = read("app/(tabs)/_layout.tsx");
    assert(
      layout.includes('<Tabs.Screen name="practice" options={{ href: null }} />'),
      "the legacy route is still hidden from the tab bar",
    );
  });

  test("no practice component renders a reducer internal", () => {
    for (const rel of [
      "app/(tabs)/practice-hub.tsx",
      "components/practice/PracticeStart.tsx",
      "components/practice/PracticeRunner.tsx",
      "components/practice/PracticeComplete.tsx",
      "content/practice/practiceCopy.ts",
    ]) {
      const code = read(rel);
      for (const banned of [
        "practiceEligibility",
        "weakTags",
        "wrongCount",
        "precisionCount",
        "isWeak",
        "leitnerBox",
      ]) {
        assert(!code.includes(banned), `${rel} renders ${banned}`);
      }
    }
  });

  test("completion is capability language, never a score", () => {
    const code = read("components/practice/PracticeComplete.tsx");
    assert(code.includes("You brought back"), "the summary names what was practised");
    for (const banned of ["correct!", "Mastered", "%", "XP", "streak", "score"]) {
      assert(!code.includes(banned), `completion must not show ${banned}`);
    }
  });

  test("the session summary is derived from the session that actually ran", async () => {
    const learner = await learnerAfter([1, 2, 3]);
    const session = plan(learner);
    const lines = workedOnLines(session.actions);
    assert(lines.length > 0, "there is something to report");
    const expected = new Set(session.actions.map((a) => expectedAnswerOf(a.seed)));
    for (const line of lines) {
      assert(expected.has(line), `"${line}" was not part of this session`);
    }
    assertEqual(closingNote(0), null, "a clean session gets no worry note");
    assert(closingNote(1) !== null, "a real miss is acknowledged");
  });
});
