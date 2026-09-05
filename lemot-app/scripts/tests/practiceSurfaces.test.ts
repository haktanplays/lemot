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
  seedIsLawfulFor,
  MAX_CONSECUTIVE_SAME_SURFACE,
} from "../../content/practice/practicePlanner";
import { selectRepairSeed } from "../../content/practice/practiceRepair";
import {
  PRACTICE_HUB_SURFACE,
  practiceBuildAttempt,
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
