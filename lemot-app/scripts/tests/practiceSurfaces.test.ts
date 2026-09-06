/**
 * Practice Hub V1.5 — surface contracts.
 *
 * V1 had four pedagogical jobs and two things the learner's hands could do, so
 * a session could vary its intent and still feel like "choose, or type, again".
 * These are the rules that keep the new surfaces honest rather than decorative:
 * a label only counts when the interaction really differs, listening must
 * actually require listening, a reconstruction must reconstruct the sentence it
 * claims, and none of it may quietly become stronger evidence than it is.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv } from "./helpers";
import { V1_LESSONS } from "../../content/lessons/v1";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import { LocalRepository } from "../../content/learning-engine/repository/local";
import { createLearningEngineRuntime } from "../../content/learning-engine/runtime";
import { scoreEvents } from "../../content/learning-engine/mastery";
import { selectLessonProgress } from "../../content/learning-engine/lesson-progress";
import { makeRegisteredEventSurface } from "../../content/identity/payloadRegistry";
import {
  choiceInteraction,
  typedAttemptInteraction,
} from "../../content/lesson-v1-evidence/interactions";
import { expectedTileSequence } from "../../components/learning-engine/buildSequence";
import type { Lesson, LearningItem } from "../../content/lessonTypes";
import { PRACTICE_SEEDS } from "../../content/practice/seeds";
import {
  reviewPracticeSeeds,
  reviewPracticeSurfaces,
} from "../../content/practice/practiceLawfulness";
import {
  PRACTICE_SURFACES,
  type PracticeSurface,
} from "../../content/practice/practiceTypes";
import {
  planPracticeSession,
  reachedItemIds,
  reachedLessonIds,
  type PracticeSessionAction,
  seedIsLawfulFor,
  MAX_CONSECUTIVE_SAME_SURFACE,
} from "../../content/practice/practicePlanner";
import { selectRepairSeed } from "../../content/practice/practiceRepair";
import {
  PRACTICE_MOMENTS,
  momentSeeds,
} from "../../content/practice/practiceMoments";
import {
  PRACTICE_HUB_SURFACE,
  practiceBuildAttempt,
  practiceChoiceAttempt,
  practiceTypedAttempt,
} from "../../content/practice/practiceInteractions";
import { PRACTICE_SESSION_LESSON_ID } from "../../content/practice/practiceIdentity";

const NOW = 1_800_000_000_000;
const DAY = 86_400_000;
const ITEMS = ITEM_REGISTRY as Readonly<Record<string, LearningItem>>;
const TERRITORIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const lessonOf = (id: string): Lesson =>
  V1_LESSONS.find((l) => l.id === id) as Lesson;

const seedsOf = (n: number) =>
  PRACTICE_SEEDS.filter((s) => Number(s.originLessonId.slice(-3)) === n);

async function learnerAfter(lessonNumbers: readonly number[]) {
  const repo = new LocalRepository(makeFakeKv());
  const runtime = createLearningEngineRuntime({
    repository: repo,
    appBuild: "test",
    deviceInfo: { platform: "test" },
    makeSessionId: () => "sess-lesson",
  });
  let tick = 0;
  for (const n of lessonNumbers) {
    const lesson = V1_LESSONS.find((l) => l.number === n) as Lesson;
    const controller = runtime.createSessionController({
      lessonId: lesson.id,
      contentVersion: lesson.version,
      resolveEventSurface: makeRegisteredEventSurface("lesson_path"),
      now: () => NOW + (tick += 1_000),
      makeClientEventId: () => `evt-lesson-${tick}`,
    });
    for (const screen of flattenLessonScreens(lesson)) {
      if (screen.type === "fill-with-traps") {
        const correct = screen.payload.options.find((o) => o.isCorrect);
        if (correct) {
          controller.recordGradedAttempt(
            choiceInteraction(lesson, screen, { optionId: correct.id }),
          );
        }
      } else if (screen.type === "weave") {
        controller.recordGradedAttempt(
          typedAttemptInteraction(lesson, screen, {
            text: screen.payload.expectedAnswers[0],
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
    repo,
    events,
    snapshot: scoreEvents(events),
    lessons: reachedLessonIds(events),
  };
}

const planFor = (
  l: Awaited<ReturnType<typeof learnerAfter>>,
  budget = 6,
  now = NOW + DAY * 40,
) =>
  planPracticeSession({
    snapshot: l.snapshot,
    reachedLessons: l.lessons,
    items: ITEMS,
    lessons: V1_LESSONS,
    seeds: PRACTICE_SEEDS,
    now,
    budget,
  });

// ── the pool ────────────────────────────────────────────────────────────────

describe("the pool is broad enough that a territory cannot starve a session", () => {
  test("the surface labels are all honest", () => {
    assertEqual(reviewPracticeSurfaces(PRACTICE_SEEDS), [], "no surface findings");
  });

  test("the content rules still hold across the widened pool", () => {
    assertEqual(reviewPracticeSeeds(PRACTICE_SEEDS, V1_LESSONS), [], "no findings");
  });

  test("every territory carries real weight", () => {
    for (const n of TERRITORIES) {
      const seeds = seedsOf(n);
      assert(seeds.length >= 10, `L${n} has only ${seeds.length} seeds`);
    }
  });

  test("every territory offers at least three ways to work", () => {
    // The V1.5 goal in one assertion: no lesson's language can be reachable
    // through one interaction only.
    for (const n of TERRITORIES) {
      const surfaces = new Set(seedsOf(n).map((s) => s.surface));
      assert(surfaces.size >= 3, `L${n} offers only ${[...surfaces].join(", ")}`);
    }
  });

  test("every territory covers more than one cognitive job", () => {
    for (const n of TERRITORIES) {
      const jobs = new Set(seedsOf(n).map((s) => s.operation));
      assert(jobs.size >= 3, `L${n} only does ${[...jobs].join(", ")}`);
    }
  });

  test("every surface in the vocabulary is actually authored", () => {
    const used = new Set(PRACTICE_SEEDS.map((s) => s.surface));
    for (const surface of PRACTICE_SURFACES) {
      assert(used.has(surface), `no seed uses the "${surface}" surface`);
    }
  });
});

// ── reconstruction ──────────────────────────────────────────────────────────

describe("reconstruction is pieces, not a word puzzle", () => {
  const builds = PRACTICE_SEEDS.filter((s) => s.exercise.type === "practice-build");

  test("there are real reconstructions to do", () => {
    assert(builds.length >= 15, `only ${builds.length} build seeds`);
  });

  test("every tile is a canonical item the learner owns", () => {
    // The rule that stops a build becoming spelling: tiles are ITEMS. A chunk
    // the curriculum owns whole is one tile, so it can never be assembled from
    // fragments the learner was never taught.
    for (const seed of builds) {
      if (seed.exercise.type !== "practice-build") continue;
      for (const tile of seed.exercise.payload.tiles) {
        assert(
          Object.prototype.hasOwnProperty.call(ITEM_REGISTRY, tile.itemId),
          `${seed.id}: tile "${tile.itemId}" is not a canonical item`,
        );
      }
    }
  });

  test("the shipped grader accepts the authored answer, and only in order", () => {
    for (const seed of builds) {
      if (seed.exercise.type !== "practice-build") continue;
      const tiles = seed.exercise.payload.tiles.map((t) => ({
        itemId: t.itemId as never,
        ...(t.answerIndex !== undefined ? { answerIndex: t.answerIndex } : {}),
      }));
      const answer = expectedTileSequence(tiles);
      assert(answer.length >= 2, `${seed.id} has nothing to order`);
      const origin = lessonOf(seed.originLessonId);
      const order = seed.exercise.payload.tiles
        .map((tile, index) => ({ tile, index }))
        .filter((t) => t.tile.answerIndex !== undefined)
        .sort((a, b) => (a.tile.answerIndex as number) - (b.tile.answerIndex as number))
        .map((t) => t.index);
      const right = practiceBuildAttempt(seed, origin, { picked: order });
      assertEqual(right.gradeResult.result, "correct", `${seed.id} correct order`);
      if (order.length >= 2) {
        const scrambled = practiceBuildAttempt(seed, origin, {
          picked: [...order].reverse(),
        });
        assert(
          scrambled.gradeResult.result !== "correct",
          `${seed.id} accepts a reversed answer`,
        );
      }
    }
  });

  test("a distractor never belongs to the answer", () => {
    for (const seed of builds) {
      if (seed.exercise.type !== "practice-build") continue;
      const distractors = seed.exercise.payload.tiles.filter(
        (t) => t.answerIndex === undefined,
      );
      assert(distractors.length > 0, `${seed.id} offers no wrong piece at all`);
    }
  });
});

// ── listening ───────────────────────────────────────────────────────────────

describe("listening actually requires listening", () => {
  const listening = PRACTICE_SEEDS.filter(
    (s) => s.surface === "listen" || s.surface === "dictation",
  );

  test("there is a real amount of it", () => {
    assert(listening.length >= 20, `only ${listening.length} listening seeds`);
  });

  test("nothing spoken is also printed before the answer", () => {
    // The whole claim of the surface. If the French is on screen, the learner
    // is reading and the audio is decoration.
    for (const seed of listening) {
      const payload = JSON.stringify({
        ...(seed.exercise.payload as Record<string, unknown>),
        reveal: null,
        expectedAnswers: null,
        acceptedAlternatives: null,
      });
      assert(
        !payload.includes(seed.audio as string),
        `${seed.id} prints the sentence it speaks`,
      );
    }
  });

  test("a dictation writes back exactly what was spoken", () => {
    for (const seed of listening.filter((s) => s.surface === "dictation")) {
      assert(seed.exercise.type === "weave", `${seed.id} is not typed`);
      if (seed.exercise.type !== "weave") continue;
      assertEqual(
        seed.exercise.payload.expectedAnswers[0],
        seed.audio,
        `${seed.id} expects something other than the audio`,
      );
    }
  });

  test("listening options are meanings, never the French", () => {
    for (const seed of listening.filter((s) => s.surface === "listen")) {
      if (seed.exercise.type !== "fill-with-traps") continue;
      for (const option of seed.exercise.payload.options) {
        assert(
          option.text !== seed.audio,
          `${seed.id} offers the spoken line as an option`,
        );
      }
    }
  });
});

// ── evidence weight ─────────────────────────────────────────────────────────

describe("a new surface does not become new mastery", () => {
  test("reconstruction is capped at recognition, production is not", async () => {
    // The §26 concern, checked on real events rather than assumed: `build`
    // resolves to a SELECTION primitive through the shipped controller, so
    // putting owned pieces in order can never read as independent production.
    const learner = await learnerAfter([1, 2, 3]);
    const runtime = createLearningEngineRuntime({
      repository: learner.repo,
      appBuild: "test",
      deviceInfo: { platform: "test" },
      makeSessionId: () => "sess-surfaces",
    });
    let tick = 0;
    const controller = runtime.createSessionController({
      lessonId: PRACTICE_SESSION_LESSON_ID,
      contentVersion: "practice-v1",
      resolveEventSurface: PRACTICE_HUB_SURFACE,
      now: () => NOW + DAY * 40 + (tick += 1_000),
      makeClientEventId: () => `evt-surface-${tick}`,
    });

    const build = PRACTICE_SEEDS.find((s) => s.id === "p-l3-build-answer-no");
    const dictation = PRACTICE_SEEDS.find((s) => s.id === "p-l3-dictation-not-understand");
    assert(build && dictation, "both fixtures exist");
    if (!build || !dictation || build.exercise.type !== "practice-build") return;

    const order = build.exercise.payload.tiles
      .map((tile, index) => ({ tile, index }))
      .filter((t) => t.tile.answerIndex !== undefined)
      .sort((a, b) => (a.tile.answerIndex as number) - (b.tile.answerIndex as number))
      .map((t) => t.index);
    controller.recordGradedAttempt(
      practiceBuildAttempt(build, lessonOf(build.originLessonId), { picked: order }),
    );
    controller.recordGradedAttempt(
      practiceTypedAttempt(dictation, lessonOf(dictation.originLessonId), {
        text: dictation.audio as string,
        hintRung: 0,
        constitutiveSupportRendered: false,
      }),
    );
    await controller.flush();

    const events = await learner.repo.readAllEvents();
    const find = (seedId: string) =>
      events.find((e) => e.exerciseId === `practice/${seedId}`) as
        | (typeof events)[number]
        | undefined;
    const buildEvent = find(build.id);
    const dictationEvent = find(dictation.id);
    assert(buildEvent && dictationEvent, "both attempts landed");
    assertEqual(
      (buildEvent as { primitive?: string }).primitive,
      "selection",
      "reconstruction is a selection",
    );
    assertEqual(
      (buildEvent as { evidenceCeiling?: string }).evidenceCeiling,
      "recognition",
      "reconstruction is capped at recognition",
    );
    assertEqual(
      (dictationEvent as { primitive?: string }).primitive,
      "production",
      "dictation is production",
    );
    assertEqual(
      (dictationEvent as { evidenceCeiling?: string }).evidenceCeiling,
      "controlled_production",
      "dictation reaches controlled production",
    );
  });

  test("no surface can mark a lesson screen attempted", async () => {
    // The V1 landmine, re-checked now that three more surfaces exist.
    const learner = await learnerAfter([1]);
    const runtime = createLearningEngineRuntime({
      repository: learner.repo,
      appBuild: "test",
      deviceInfo: { platform: "test" },
      makeSessionId: () => "sess-iso",
    });
    let tick = 0;
    const controller = runtime.createSessionController({
      lessonId: PRACTICE_SESSION_LESSON_ID,
      contentVersion: "practice-v1",
      resolveEventSurface: PRACTICE_HUB_SURFACE,
      now: () => NOW + DAY * 41 + (tick += 1_000),
      makeClientEventId: () => `evt-iso-${tick}`,
    });
    for (const seed of PRACTICE_SEEDS.filter((s) => s.originLessonId === "v1-lesson-001")) {
      const origin = lessonOf(seed.originLessonId);
      if (seed.exercise.type === "practice-build") {
        controller.recordGradedAttempt(practiceBuildAttempt(seed, origin, { picked: [0] }));
      } else if (seed.exercise.type === "weave") {
        controller.recordGradedAttempt(
          practiceTypedAttempt(seed, origin, {
            text: seed.exercise.payload.expectedAnswers[0],
            hintRung: 0,
            constitutiveSupportRendered: false,
          }),
        );
      }
    }
    await controller.flush();

    const events = await learner.repo.readAllEvents();
    for (const n of [2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      const lesson = V1_LESSONS.find((l) => l.number === n) as Lesson;
      const progress = selectLessonProgress({
        events,
        lessonId: lesson.id,
        exerciseIds: flattenLessonScreens(lesson).map((s) => `${lesson.id}/${s.id}`),
      });
      assertEqual(progress.attempted, 0, `practice touched L${n}`);
    }
  });
});

// ── the session ─────────────────────────────────────────────────────────────

describe("a session stops feeling like one exercise repeated", () => {
  test("a mixed learner meets at least three different interactions", async () => {
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const surfaces = new Set(planFor(learner).actions.map((a) => a.seed.surface));
    assert(surfaces.size >= 3, `only ${[...surfaces].join(", ")}`);
  });

  test("even an L1-only learner meets more than one interaction", async () => {
    const learner = await learnerAfter([1]);
    const surfaces = new Set(planFor(learner).actions.map((a) => a.seed.surface));
    assert(surfaces.size >= 3, `L1 alone gives only ${[...surfaces].join(", ")}`);
  });

  test("no three consecutive actions share an interaction", async () => {
    for (const reach of [[1], [1, 2, 3, 4], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]) {
      const learner = await learnerAfter(reach);
      const surfaces = planFor(learner).actions.map((a) => a.seed.surface);
      for (let i = MAX_CONSECUTIVE_SAME_SURFACE; i < surfaces.length; i++) {
        const window = surfaces.slice(i - MAX_CONSECUTIVE_SAME_SURFACE, i + 1);
        assert(
          new Set(window).size > 1,
          `L${reach.join("")}: ${window.join(", ")} in a row`,
        );
      }
    }
  });

  test("planning stays deterministic with the wider pool", async () => {
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6]);
    const a = planFor(learner).actions.map((x) => x.seed.id).join(",");
    const b = planFor(learner).actions.map((x) => x.seed.id).join(",");
    assertEqual(a, b, "identical plans");
  });
});

describe("a repair changes the work, not just the question", () => {
  test("a missed typed production is answered by a different interaction", async () => {
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6]);
    const reached = reachedItemIds(learner.snapshot);
    const missed = PRACTICE_SEEDS.find((s) => s.id === "p-l6-apply-whole-moment");
    assert(missed, "the fixture exists");
    if (!missed) return;
    const repair = selectRepairSeed({
      missed,
      seeds: PRACTICE_SEEDS,
      reachedItems: reached,
      reachedLessons: learner.lessons,
      usedSeedIds: new Set([missed.id]),
    });
    assert(repair !== null, "a repair exists");
    assert(
      repair!.surface !== missed.surface,
      `repair reused the ${missed.surface} surface`,
    );
    assert(repair!.operation !== missed.operation, "and a different job");
    assert(
      seedIsLawfulFor(repair!, reached, learner.lessons),
      "the repair is lawful for this learner",
    );
  });

  test("every lawful miss can find a lawful repair for a reached learner", async () => {
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6]);
    const reached = reachedItemIds(learner.snapshot);
    let withRepair = 0;
    let total = 0;
    for (const missed of PRACTICE_SEEDS.filter((s) =>
      seedIsLawfulFor(s, reached, learner.lessons),
    )) {
      total += 1;
      const repair = selectRepairSeed({
        missed,
        seeds: PRACTICE_SEEDS,
        reachedItems: reached,
        reachedLessons: learner.lessons,
        usedSeedIds: new Set([missed.id]),
      });
      if (repair !== null) {
        withRepair += 1;
        assert(repair.operation !== missed.operation, `${missed.id} repair repeats the job`);
      }
    }
    assert(total > 0, "the learner has material");
    assert(
      withRepair / total >= 0.9,
      `only ${withRepair}/${total} misses have a repair`,
    );
  });
});

// ── micro-moments ───────────────────────────────────────────────────────────

describe("a micro-moment is one situation, not a roleplay session", () => {
  test("every authored moment resolves to real, ordered seeds", () => {
    for (const moment of PRACTICE_MOMENTS) {
      const steps = momentSeeds(moment, PRACTICE_SEEDS);
      assert(steps !== null, `${moment.id} names a seed that does not exist`);
      if (!steps) continue;
      assert(steps.length >= 2 && steps.length <= 3, `${moment.id} has ${steps.length} beats`);
      assert(moment.intro.trim().length > 0, `${moment.id} frames nothing`);
      // A scene whose beats are all the same interaction is a drill with a
      // caption on it.
      const surfaces = new Set(steps.map((s) => s.surface));
      assert(surfaces.size >= 2, `${moment.id} is ${[...surfaces][0]} three times`);
    }
  });

  test("a moment's beats all belong to one learner's reach", async () => {
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const reached = reachedItemIds(learner.snapshot);
    for (const moment of PRACTICE_MOMENTS) {
      const steps = momentSeeds(moment, PRACTICE_SEEDS);
      if (!steps) continue;
      for (const step of steps) {
        assert(
          seedIsLawfulFor(step, reached, learner.lessons),
          `${moment.id}: ${step.id} is unreachable even at full reach`,
        );
      }
    }
  });

  test("at most one moment per session, played whole and in order", async () => {
    for (const reach of [[1], [1, 2, 3, 4], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]) {
      const learner = await learnerAfter(reach);
      const actions = planFor(learner).actions;
      const moments = new Set(
        actions.filter((a) => a.moment !== undefined).map((a) => a.moment?.id),
      );
      assert(moments.size <= 1, `L${reach.join("")}: ${moments.size} moments in one session`);
      if (moments.size === 0) continue;

      const steps = actions.filter((a) => a.moment !== undefined);
      const first = actions.findIndex((a) => a.moment !== undefined);
      // Contiguous: a scene interrupted by unrelated work is not a scene.
      for (let i = 0; i < steps.length; i += 1) {
        assertEqual(
          actions[first + i]?.seed.id,
          steps[i].seed.id,
          `L${reach.join("")}: the moment is not contiguous`,
        );
      }
      const moment = steps[0].moment;
      assertEqual(
        steps.map((s) => s.seed.id).join(","),
        (moment?.seedIds ?? []).join(","),
        "played whole, in authored order",
      );
      assert(actions.length <= 8, `session grew to ${actions.length}`);
      const ids = actions.map((a) => a.seed.id);
      assertEqual(new Set(ids).size, ids.length, "a moment duplicated a seed");
    }
  });
});

// ── across sessions ─────────────────────────────────────────────────────────

/** Per-item last-practised times, exactly as the runtime projection derives them. */
function historyFrom(events: readonly { exerciseId?: string; timestamp?: number }[]) {
  const out = new Map<string, number>();
  for (const e of events) {
    const id = e.exerciseId;
    if (typeof id !== "string" || !id.startsWith("practice/")) continue;
    const seedId = id.slice("practice/".length);
    const at = e.timestamp ?? 0;
    if (at >= (out.get(seedId) ?? -1)) out.set(seedId, at);
  }
  return out;
}

/**
 * Run consecutive sessions the way the product does: plan, PLAY, re-read.
 *
 * Playing matters and an earlier version of these tests got it wrong. Recording
 * seed ids without writing real evidence leaves `dueAt` frozen, so the same few
 * items stay permanently overdue and the run looks far more repetitive than the
 * product is. Practising has to move mastery for the next plan to be honest.
 */
async function runSessions(
  learner: Awaited<ReturnType<typeof learnerAfter>>,
  count: number,
  budget = 6,
) {
  const runtime = createLearningEngineRuntime({
    repository: learner.repo,
    appBuild: "test",
    deviceInfo: { platform: "test" },
    makeSessionId: () => "sess-run",
  });
  const sessions: PlannedSession[] = [];

  for (let i = 0; i < count; i += 1) {
    const now = NOW + DAY * (40 + i);
    const events = await learner.repo.readAllEvents();
    const plan = planPracticeSession({
      snapshot: scoreEvents(events),
      reachedLessons: reachedLessonIds(events),
      seedHistory: historyFrom(events),
      items: ITEMS,
      lessons: V1_LESSONS,
      seeds: PRACTICE_SEEDS,
      now,
      budget,
    });
    sessions.push({ actions: [...plan.actions] });

    let tick = 0;
    const controller = runtime.createSessionController({
      lessonId: PRACTICE_SESSION_LESSON_ID,
      contentVersion: "practice-pool-v1",
      resolveEventSurface: PRACTICE_HUB_SURFACE,
      now: () => now + (tick += 1_000),
      makeClientEventId: () => `evt-run-${i}-${tick}`,
    });
    for (const action of plan.actions) {
      const origin = lessonOf(action.seed.originLessonId);
      const exercise = action.seed.exercise;
      if (exercise.type === "fill-with-traps") {
        const correct = exercise.payload.options.find((o) => o.isCorrect);
        if (correct) {
          controller.recordGradedAttempt(
            practiceChoiceAttempt(action.seed, origin, { optionId: correct.id }),
          );
        }
      } else if (exercise.type === "practice-build") {
        const order = exercise.payload.tiles
          .map((tile, index) => ({ tile, index }))
          .filter((t) => t.tile.answerIndex !== undefined)
          .sort((a, b) => (a.tile.answerIndex as number) - (b.tile.answerIndex as number))
          .map((t) => t.index);
        controller.recordGradedAttempt(
          practiceBuildAttempt(action.seed, origin, { picked: order }),
        );
      } else {
        controller.recordGradedAttempt(
          practiceTypedAttempt(action.seed, origin, {
            text: exercise.payload.expectedAnswers[0],
            hintRung: 0,
            constitutiveSupportRendered: false,
          }),
        );
      }
    }
    await controller.flush();
  }
  return sessions;
}

type PlannedSession = { actions: PracticeSessionAction[] };

describe("consecutive sessions are not the first one shuffled", () => {
  test("a repeatedly practising learner keeps meeting new work", async () => {
    // The defect this protects against was severe and invisible to every other
    // test: seed choice had no memory across sessions, so each item returned
    // through its single highest-ranked exercise forever. A full-reach learner
    // met 34 of 143 seeds in twelve sessions, saw ZERO listening, and met one
    // reconstruction in seventy-two actions.
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const sessions = await runSessions(learner, 8);

    const seen = new Set<string>();
    const surfaces = new Set<string>();
    for (const [i, session] of sessions.entries()) {
      assert(
        session.actions.length >= 5,
        `session ${i + 1} collapsed to ${session.actions.length} actions`,
      );
      for (const a of session.actions) {
        seen.add(a.seed.id);
        surfaces.add(a.seed.surface);
      }
    }
    assert(seen.size >= 30, `only ${seen.size} distinct seeds across eight sessions`);
    assert(
      surfaces.size >= 5,
      `only ${surfaces.size} interactions across eight sessions: ${[...surfaces].join(", ")}`,
    );
  });

  test("no single item can own every session", async () => {
    // `selectTodaysSet` orders due-oldest-first, which cannot see that an item
    // stuck in a low Leitner box is permanently the most overdue thing a
    // learner owns. Six such items were taking ~85% of every session, and three
    // items were never selected at all.
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const sessions = await runSessions(learner, 10);

    const picks = new Map<string, number>();
    for (const session of sessions) {
      for (const a of session.actions) picks.set(a.itemId, (picks.get(a.itemId) ?? 0) + 1);
    }
    const worst = Math.max(...picks.values());
    assert(
      worst < sessions.length,
      `one item appeared in ${worst} of ${sessions.length} sessions — a monopoly is back`,
    );
    assert(
      picks.size >= 15,
      `only ${picks.size} distinct items across ${sessions.length} sessions`,
    );
  });

  test("listening is present without becoming the session", async () => {
    // Listening is the input CHANNEL, not a scaffolded route to production, so
    // it is not penalised on the Stretch path. It is capped at one per session
    // so it stays a moment rather than a mode.
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const sessions = await runSessions(learner, 8);

    let listeningSessions = 0;
    for (const [i, session] of sessions.entries()) {
      const listens = session.actions.filter((a) => a.seed.surface === "listen");
      assert(listens.length <= 1, `session ${i + 1} served ${listens.length} listening actions`);
      if (listens.length === 1) listeningSessions += 1;
    }
    assert(listeningSessions > 0, "listening never appeared across eight sessions");
  });

  test("production stays the centre of gravity across a run of sessions", async () => {
    const PRODUCES = new Set(["typed", "context", "dictation"]);
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const sessions = await runSessions(learner, 8);

    let produced = 0;
    let total = 0;
    for (const session of sessions) {
      for (const a of session.actions) {
        total += 1;
        if (PRODUCES.has(a.seed.surface)) produced += 1;
      }
    }
    assert(
      produced / total >= 0.5,
      `only ${produced}/${total} actions asked the learner to produce`,
    );
  });
});

// ── micro-moments ───────────────────────────────────────────────────────────

describe("micro-moments are reliable without being forced", () => {
  test("a session already working a scene's language receives the scene", async () => {
    // The trigger is the ITEM, not the seed. A learner can be working
    // `chunk-je-voudrais` today and have a scene built on it sitting in the
    // pool, and under seed-level matching still never see it, because the
    // planner had simply picked that item's dictation instead.
    const learner = await learnerAfter([1]);
    let events = [...learner.events];
    let carried = 0;

    for (let i = 0; i < 5; i += 1) {
      const plan = planPracticeSession({
        snapshot: scoreEvents(events),
        reachedLessons: reachedLessonIds(events),
        seedHistory: historyFrom(events),
        items: ITEMS,
        lessons: V1_LESSONS,
        seeds: PRACTICE_SEEDS,
        now: NOW + DAY * (40 + i),
        budget: 6,
      });
      if (plan.actions.some((a) => a.moment)) carried += 1;
      events = [
        ...events,
        ...plan.actions.map((a, n) => ({
          exerciseId: `practice/${a.seed.id}`,
          timestamp: NOW + DAY * (40 + i) + n,
        })),
      ] as typeof events;
    }
    assert(carried > 0, "an L1 learner met no scene in five sessions");
  });

  test("a scene never introduces language the learner has not reached", async () => {
    // The reliability work must not have bought frequency with unlawful
    // language: an L1 learner cannot be handed the L10 corridor scene.
    const learner = await learnerAfter([1]);
    const reached = reachedItemIds(learner.snapshot);
    const plan = planPracticeSession({
      snapshot: scoreEvents(learner.events),
      reachedLessons: reachedLessonIds(learner.events),
      seedHistory: new Map(),
      items: ITEMS,
      lessons: V1_LESSONS,
      seeds: PRACTICE_SEEDS,
      now: NOW + DAY * 40,
      budget: 6,
    });
    for (const action of plan.actions.filter((a) => a.moment)) {
      for (const itemId of action.seed.requiredItemIds) {
        assert(
          reached.has(itemId),
          `scene ${action.moment?.id} required unreached ${itemId}`,
        );
      }
    }
  });

  test("a session that is about none of the scenes is allowed to have none", () => {
    // Reliability is not a quota. A learner whose session works entirely
    // different language should not have a scene bolted onto it.
    const scenes = new Set(PRACTICE_MOMENTS.flatMap((m) => m.seedIds));
    assert(scenes.size > 0, "there are scenes to avoid");
    assert(
      PRACTICE_SEEDS.filter((s) => !scenes.has(s.id)).length > PRACTICE_SEEDS.length / 2,
      "most of the pool is outside any scene, so empty sessions are normal",
    );
  });

  test("the same scene does not run on consecutive sittings", async () => {
    // A learner practising daily should not walk into the same café every
    // morning. Where another scene qualifies it takes the slot; where none
    // does, the session has none.
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const sessions = await runSessions(learner, 6);
    const played = sessions.map((s) => s.actions.find((a) => a.moment)?.moment?.id ?? null);

    for (let i = 1; i < played.length; i += 1) {
      if (played[i] === null) continue;
      assert(
        played[i] !== played[i - 1],
        `scene ${played[i]} ran twice in a row (sessions ${i} and ${i + 1})`,
      );
    }
    assert(
      played.filter((p) => p !== null).length >= 2,
      `only ${played.filter((p) => p !== null).length} of six sessions carried a scene`,
    );
    assert(
      new Set(played.filter((p) => p !== null)).size >= 2,
      "one scene dominated every session that had one",
    );
  });

  test("a scene plays its beats in the authored order", async () => {
    const learner = await learnerAfter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const sessions = await runSessions(learner, 6);
    for (const session of sessions) {
      const beats = session.actions.filter((a) => a.moment);
      if (beats.length === 0) continue;
      const moment = beats[0].moment;
      assert(moment !== undefined, "a beat without its scene");
      assertEqual(
        beats.map((b) => b.seed.id).join(","),
        moment.seedIds.join(","),
        "scene beats were reordered or dropped",
      );
      // Contiguous, or it is not a scene.
      const first = session.actions.findIndex((a) => a.moment);
      for (let i = 0; i < beats.length; i += 1) {
        assert(
          session.actions[first + i]?.moment?.id === moment.id,
          "another action was spliced into the middle of a scene",
        );
      }
    }
  });
});
