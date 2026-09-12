/**
 * Serving practice from inside a lesson.
 *
 * ── THE MEASUREMENT THAT PROMPTED THIS ──────────────────────────────────────
 *
 * 632 authored practice seeds exist, covering L1-L10, indexed by the items they
 * work. Nineteen of the twenty-nine acquisition demands across L0-L10 have at
 * least one. Before this module, not one of them could be reached from inside a
 * lesson — the Practice Hub tab was the only door — so a learner who missed the
 * thing a lesson exists to teach saw the model, tapped Continue, and never met
 * the item again inside that lesson.
 *
 * These tests pin the policy that closes that, and the three things that keep
 * it from turning into filler: it chases only declared demands, it never serves
 * the same seed twice, and it offers nothing rather than something weak.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import { PRACTICE_SEEDS } from "../../content/practice/seeds";
import {
  lessonStepMiss,
  selectLessonStepPractice,
  LESSON_STEP_SENTINEL_ID,
  LESSON_STEP_SENTINEL_OPERATION,
  LESSON_STEP_SENTINEL_SURFACE,
} from "../../content/practice/lessonStepPractice";
import type { Lesson, LessonScreen } from "../../content/lessonTypes";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");
const codeOf = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

const seeds = PRACTICE_SEEDS;
const lessons = V1_LESSONS as unknown as Lesson[];

/** Every graded screen, activity-chain steps included. */
function allSteps(lesson: Lesson): LessonScreen[] {
  const out: LessonScreen[] = [];
  for (const screen of lesson.screens) {
    if (screen.type === "activity-chain") {
      for (const step of screen.payload.steps) out.push(step as LessonScreen);
    } else out.push(screen);
  }
  return out;
}

/** The ceiling: everything authored has been reached. */
const ALL_ITEMS: ReadonlySet<string> = new Set(
  seeds.flatMap((s) => [...s.requiredItemIds, ...s.targetItemIds]),
);
const ALL_LESSONS: ReadonlySet<string> = new Set(seeds.map((s) => s.originLessonId));

/** Every lesson step the policy is allowed to chase, paired with its lesson. */
function chaseableSteps(): { lesson: Lesson; screen: LessonScreen }[] {
  const out: { lesson: Lesson; screen: LessonScreen }[] = [];
  for (const lesson of lessons) {
    const demands = new Set(lesson.acquisitionDemandItemIds ?? []);
    for (const screen of allSteps(lesson)) {
      const miss = lessonStepMiss(lesson, screen);
      if (miss === null) continue;
      if (!miss.targetItemIds.some((id) => demands.has(id))) continue;
      out.push({ lesson, screen });
    }
  }
  return out;
}

describe("the pool is reachable from a lesson at last", () => {
  test("the shipped slice can answer every step it is allowed to chase", () => {
    // L0-L10 is the authored slice. Measured at the ceiling — everything
    // reached — because that is the question this asks: does the CONTENT
    // exist? What a particular learner may lawfully be served is narrower, and
    // is the lawfulness gate's job, tested below.
    const slice = chaseableSteps().filter((s) => (s.lesson.number ?? 0) <= 10);
    assert(slice.length > 0, "no chaseable steps found at all");
    const unanswered = slice.filter(
      ({ lesson, screen }) =>
        selectLessonStepPractice({
          miss: lessonStepMiss(lesson, screen)!,
          seeds,
          reachedItems: ALL_ITEMS,
          reachedLessons: ALL_LESSONS,
          offeredSeedIds: new Set(),
        }) === null,
    );
    assert(
      unanswered.length === 0,
      `${unanswered.length} of ${slice.length} steps in L0-L10 have nothing to offer: ` +
        unanswered.slice(0, 3).map((u) => `${u.lesson.id}/${u.screen.id}`).join(", "),
    );
  });

  test("and beyond the authored slice it says so by offering nothing", () => {
    // L11+ have no seeds. The right behaviour is silence, not a loose match
    // pulled from a lesson the learner has nothing to do with.
    const beyond = chaseableSteps().filter((s) => (s.lesson.number ?? 0) >= 11);
    assert(beyond.length > 0, "expected chaseable steps past the authored slice");
    for (const { lesson, screen } of beyond) {
      assert(
        selectLessonStepPractice({
          miss: lessonStepMiss(lesson, screen)!,
          seeds,
          reachedItems: ALL_ITEMS,
          reachedLessons: ALL_LESSONS,
          offeredSeedIds: new Set(),
        }) === null,
        `${lesson.id}/${screen.id} was offered a seed from outside the authored slice`,
      );
    }
  });
});

describe("it chases only what the lesson says it teaches", () => {
  test("a step whose target is not a declared demand is never chased", () => {
    // A lesson carries supported and exposure language it never claims to
    // install. Chasing a miss on that is asking for production of material the
    // lesson deliberately only showed.
    let checked = 0;
    for (const lesson of lessons) {
      const demands = new Set(lesson.acquisitionDemandItemIds ?? []);
      for (const screen of allSteps(lesson)) {
        const miss = lessonStepMiss(lesson, screen);
        if (miss === null) continue;
        if (miss.targetItemIds.some((id) => demands.has(id))) continue;
        checked++;
        assert(
          selectLessonStepPractice({
            miss,
            seeds,
            reachedItems: ALL_ITEMS,
            reachedLessons: ALL_LESSONS,
            offeredSeedIds: new Set(),
          }) === null,
          `${lesson.id}/${screen.id} chased an item the lesson does not declare`,
        );
      }
    }
    assert(checked > 0, "no undeclared-target steps exist to check the rule against");
  });

  test("a screen with no target cannot be missed at all", () => {
    // Showcase and Pattern Reel report nothing and claim nothing. A policy that
    // offered practice off them would be inventing a miss.
    const breadth = lessons
      .flatMap((l) => allSteps(l).map((s) => ({ l, s })))
      .filter(({ s }) => s.type === "showcase" || s.type === "pattern-reel");
    assert(breadth.length > 0, "expected breadth screens in the corpus");
    for (const { l, s } of breadth) {
      assert(lessonStepMiss(l, s) === null, `${l.id}/${s.id} was treated as missable`);
    }
  });
});

describe("lawfulness still decides, not the lesson", () => {
  const sample = chaseableSteps().find((s) => (s.lesson.number ?? 0) >= 1 && (s.lesson.number ?? 0) <= 10)!;

  test("a learner who has reached nothing is offered nothing", () => {
    assert(
      selectLessonStepPractice({
        miss: lessonStepMiss(sample.lesson, sample.screen)!,
        seeds,
        reachedItems: new Set(),
        reachedLessons: new Set(),
        offeredSeedIds: new Set(),
      }) === null,
      "an unreached learner must not be served a seed on prerequisites they lack",
    );
  });

  test("every seed it can ever return is lawful for the learner it returned to", () => {
    // The delegation is the whole point of this module, so prove the gate
    // survived it rather than assuming the call passed the sets through.
    for (const { lesson, screen } of chaseableSteps()) {
      const seed = selectLessonStepPractice({
        miss: lessonStepMiss(lesson, screen)!,
        seeds,
        reachedItems: ALL_ITEMS,
        reachedLessons: ALL_LESSONS,
        offeredSeedIds: new Set(),
      });
      if (seed === null) continue;
      assert(
        ALL_LESSONS.has(seed.originLessonId),
        `${seed.id} came from a lesson outside the reached set`,
      );
      for (const required of seed.requiredItemIds) {
        assert(ALL_ITEMS.has(required), `${seed.id} requires unreached ${required}`);
      }
    }
  });
});

describe("one offer, and never the same one twice", () => {
  const sample = chaseableSteps().find((s) => (s.lesson.number ?? 0) >= 1 && (s.lesson.number ?? 0) <= 10)!;
  const ask = (offered: ReadonlySet<string>) =>
    selectLessonStepPractice({
      miss: lessonStepMiss(sample.lesson, sample.screen)!,
      seeds,
      reachedItems: ALL_ITEMS,
      reachedLessons: ALL_LESSONS,
      offeredSeedIds: offered,
    });

  test("an already-offered seed is not offered again", () => {
    const first = ask(new Set());
    assert(first !== null, "the sample step must have something to offer");
    const second = ask(new Set([first!.id]));
    assert(second?.id !== first!.id, "the same seed came back after being offered");
  });

  test("the offer is deterministic", () => {
    // No clock, no shuffle. The same state gives the same answer, which is what
    // makes a failure reproducible and a test meaningful.
    assert(ask(new Set())?.id === ask(new Set())?.id, "two identical asks disagreed");
  });

  test("exhausting the pool yields nothing rather than a repeat", () => {
    const exhausted = ask(new Set(seeds.map((s) => s.id)));
    assert(exhausted === null, "a fully-used pool must offer nothing");
  });
});

describe("no second selector, no second database", () => {
  const src = codeOf(read("content/practice/lessonStepPractice.ts"));

  test("it delegates to the shipped repair selector", () => {
    assert(src.includes("selectRepairSeed"), "the rule must be the one that already exists");
    // The tiers that decide WHICH seed — authored repair tag first, then other
    // work on the same item, preferring a changed surface — live in
    // practiceRepair.ts. Re-deriving any of that here is how two rules start
    // disagreeing about what a repair is.
    for (const rebuild of ["repairsTag", ".sort(", "seedIsLawfulFor"]) {
      assert(!src.includes(rebuild), `this module must not re-implement ${rebuild}`);
    }
  });

  test("it owns no exercises of its own", () => {
    assert(!src.includes("exercise: {\n"), "no seed may be minted here");
    assert(
      !/from "\.\/seeds/.test(src),
      "the pool is passed in, never reached for",
    );
  });

  test("it invents no operation for a lesson step", () => {
    // A seed AUTHORS its operation because it cannot be read off the widget.
    // Guessing one here would put a pedagogy claim into the evidence that
    // nobody made. The sentinel is the honest stand-in, and it must stay one.
    assert(
      src.includes("LESSON_STEP_SENTINEL_OPERATION"),
      "a lesson step must declare no real operation",
    );
    for (const real of ["retrieve", "produce", "repair", "apply"]) {
      assert(
        !new RegExp(`operation: "${real}"`).test(src),
        `a lesson step must not be labelled as ${real} work`,
      );
    }
  });

  test("the sentinels cannot collide with authored content", () => {
    // If a seed ever carried one, the shared selector's filters would start
    // excluding real candidates instead of being inert.
    for (const seed of seeds) {
      assert(seed.id !== LESSON_STEP_SENTINEL_ID, `${seed.id} collides with the id sentinel`);
      assert(
        (seed.operation as string) !== (LESSON_STEP_SENTINEL_OPERATION as string),
        `${seed.id} collides with the operation sentinel`,
      );
      assert(
        (seed.surface as string) !== (LESSON_STEP_SENTINEL_SURFACE as string),
        `${seed.id} collides with the surface sentinel`,
      );
    }
  });

  test("practice-origin evidence still cannot complete a lesson", () => {
    // The structural guarantee this whole feature rides on: a served seed's
    // evidence is minted under `practice/`, and no lesson requires an id there.
    // Serving inside a lesson does not change that, and must not.
    const identity = codeOf(read("content/practice/practiceIdentity.ts"));
    assert(identity.includes('PRACTICE_ID_PREFIX = "practice/"'), "the namespace stands");
    assert(
      !src.includes("qualifyPracticeSeedId") || src.includes("practice/"),
      "this module must not mint an id outside that namespace",
    );
    for (const lesson of lessons) {
      for (const screen of allSteps(lesson)) {
        assert(
          !screen.id.startsWith("practice/"),
          `${lesson.id}/${screen.id} sits in the practice namespace`,
        );
      }
    }
  });
});

describe("only a graded screen can be missed", () => {
  test("screens the learner reads are never treated as answered", () => {
    // A meet-card, an insight-card and a natural-reveal all declare targets and
    // none of them is answered. Offering practice off one would be inventing a
    // miss out of the fact that the learner read something.
    const read = lessons
      .flatMap((l) => allSteps(l).map((s) => ({ l, s })))
      .filter(({ s }) =>
        ["meet-card", "insight-card", "natural-reveal", "say-it-your-way"].includes(s.type),
      );
    assert(read.length > 0, "expected unanswered screens with targets in the corpus");
    for (const { l, s } of read) {
      assert(lessonStepMiss(l, s) === null, `${l.id}/${s.id} was treated as answerable`);
    }
  });

  test("the two deterministic graders are", () => {
    const graded = lessons
      .flatMap((l) => allSteps(l).map((s) => ({ l, s })))
      .filter(({ s }) => s.type === "weave" || s.type === "fill-with-traps");
    assert(graded.length > 0, "expected graded screens");
    assert(
      graded.some(({ l, s }) => lessonStepMiss(l, s) !== null),
      "no graded screen is missable, which cannot be right",
    );
  });
});

describe("the wiring keeps its boundaries", () => {
  const renderer = codeOf(read("components/lesson-v1/LessonRendererV1.tsx"));
  const offer = codeOf(read("components/lesson-v1/LessonStepPractice.tsx"));
  const hook = codeOf(read("hooks/useLessonStepPractice.ts"));

  test("the offer is never a gate", () => {
    // A learner who missed a step may be tired, or about to close the app. A
    // product that made them earn the next screen would punish them for getting
    // something wrong. Both doors, always, one tap each.
    assert(offer.includes('label="Try it another way"'), "the offer must be takeable");
    assert(offer.includes('label="Move on"'), "and declinable, on the same screen");
    assert(
      !/disabled|locked|required|mustComplete/.test(offer),
      "nothing here may gate the lesson",
    );
  });

  test("one offer per miss, and never the same seed twice", () => {
    assert(
      renderer.includes("noteOffered(seed.id)"),
      "an offered seed must be recorded so it cannot come back",
    );
    assert(
      renderer.includes("missed.current.delete(current.id)"),
      "a step that has been asked about must not be asked about again",
    );
    for (const quota of ["MAX_OFFERS", "offerCount", "remaining", "quota"]) {
      assert(!renderer.includes(quota), `there is no ${quota}: it is one offer or none`);
    }
  });

  test("the screen still knows nothing", () => {
    // PR-05: a screen receives surface facts only. `onProductionMissed` is a
    // nullary callback — it carries no seed, no pool, no policy and no verdict
    // object, so no lesson screen can learn that practice exists.
    assert(
      /onProductionMissed: \(\) => void/.test(renderer),
      "the miss signal must carry nothing",
    );
    for (const rel of [
      "components/lesson-v1/screens/Weave.tsx",
      "components/lesson-v1/screens/FillWithTraps.tsx",
    ]) {
      const screen = codeOf(read(rel));
      for (const leak of ["PracticeSeed", "practice/seeds", "lessonStepPractice"]) {
        assert(!screen.includes(leak), `${rel} must not know about ${leak}`);
      }
    }
  });

  test("reach is read once, not between the answer and the offer", () => {
    // An await between a wrong answer and the offer is the one stall the lesson
    // cannot afford. Reach is a fact about everything BEFORE this lesson and
    // does not move while the learner is inside it.
    assert(hook.includes("readPracticeReach"), "reach comes from the shipped projection");
    assert(
      hook.slice(hook.indexOf("const offerFor")).indexOf("await") === -1 &&
        !hook.slice(hook.indexOf("const offerFor")).includes(".then("),
      "asking for an offer must be synchronous",
    );
  });

  test("a failed read offers nothing rather than something wrong", () => {
    assert(
      /catch\(\(\) => \{/.test(hook) && hook.includes("if (reach === null) return null"),
      "an unreadable store must mean silence, not a guess",
    );
  });

  test("the evidence is practice-origin and says where it happened", () => {
    assert(offer.includes('"lesson-step"'), "the run must stamp its own placement");
    const interactions = codeOf(read("content/practice/practiceInteractions.ts"));
    assert(
      interactions.includes('placement: "lesson_step_practice"'),
      "the placement must exist and be its own value",
    );
    // Not folded into practice_hub: learning-stats counts those into a number
    // the learner can see, and this is not a visit to that tab.
    const stats = codeOf(read("content/learning-engine/learning-stats.ts"));
    assert(
      !stats.includes('placement === "lesson_step_practice"'),
      "a mid-lesson go must not be counted as a Practice Hub moment",
    );
    assert(
      interactions.includes("qualifyPracticeSeedId(seed.id)"),
      "and the id must stay in the practice namespace",
    );
  });

  test("the lesson can only be offered what it can draw", () => {
    assert(
      hook.includes("seedsRenderableInALesson(PRACTICE_SEEDS)"),
      "the pool must be narrowed before the policy sees it",
    );
    assert(
      offer.includes('seed.exercise.type !== "weave"'),
      "and the component must refuse a shape it cannot draw rather than guess",
    );
  });
});
