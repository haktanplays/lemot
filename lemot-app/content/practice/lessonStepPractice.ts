/**
 * Serving practice INSIDE a lesson — pure, deterministic, no clock.
 *
 * ── THE MEASURED PROBLEM ────────────────────────────────────────────────────
 *
 * There are 632 authored practice seeds covering L1-L10, indexed by the items
 * they work and by the cognitive job they ask for. Nineteen of the twenty-nine
 * acquisition demands in L0-L10 have at least one. Not one of them can be
 * reached from inside a lesson: the only door is the Practice Hub tab.
 *
 * So a learner who misses the thing a lesson exists to teach sees the model,
 * taps Continue, and the lesson moves on. The item does not come back. The
 * material to bring it back was already written and already lawful; nothing
 * asked for it.
 *
 * ── WHY THIS IS NOT A SECOND SELECTOR ───────────────────────────────────────
 *
 * `selectRepairSeed` already answers "the learner just missed something, what
 * lawful seed works that confusion a different way?" — and its rule is the one
 * this needs: change the JOB, prefer to change the SURFACE, never serve the
 * same question twice. The only thing it cannot take is a miss that was a
 * LESSON screen rather than a practice seed.
 *
 * So this describes a lesson miss in the shape that selector already
 * understands, and delegates. There is no second pool, no second rule and no
 * second notion of lawful.
 *
 * ── WHAT IS DELIBERATELY NOT INFERRED ───────────────────────────────────────
 *
 * A practice seed authors its `operation` — retrieve / produce / repair / apply
 * — precisely because it cannot be read off the widget: "translate this" and
 * "you are at the door, say the thing" are both weaves and are not the same
 * work. A lesson screen authors no operation, and guessing one here would put a
 * pedagogy claim into the evidence that nobody made.
 *
 * So a lesson miss declares no operation. It declares the SURFACE, which is an
 * interface fact and genuinely readable — a weave is typed, a fill is a choice
 * — and the selector's "prefer a different surface" tier does the rest. The
 * result is weaker than a seed-to-seed repair, and honestly so.
 */
import type { Lesson, LessonScreen } from "../lessonTypes";
import type { PracticeSeed, PracticeSurface } from "./practiceTypes";
import { selectRepairSeed } from "./practiceRepair";

/**
 * What a lesson step just asked of the learner, in the terms practice uses.
 *
 * `surface` is null when the screen's interface has no practice counterpart, in
 * which case the selector simply has one fewer preference to apply.
 */
export type LessonStepMiss = {
  readonly lesson: Lesson;
  readonly screen: LessonScreen;
  readonly targetItemIds: readonly string[];
  readonly weakPointTags: readonly string[];
  readonly surface: PracticeSurface | null;
};

/**
 * The interface a lesson screen presents, where practice names the same one.
 *
 * Only two lesson screen types are graded productions with a practice
 * equivalent. Everything else returns null rather than being forced onto the
 * nearest label.
 */
function surfaceOf(screen: LessonScreen): PracticeSurface | null {
  if (screen.type === "weave") return "typed";
  if (screen.type === "fill-with-traps") return "choice";
  return null;
}

/**
 * The screen types a learner can actually get WRONG.
 *
 * Deliberately narrower than "has a target". A meet-card, an insight-card and a
 * natural-reveal all declare targets and none of them is answered, so treating
 * a target as a miss would offer practice off screens the learner only read.
 * Say It Your Way is answered but is open-ended by design and has no verdict to
 * miss. That leaves the two deterministic graders.
 */
const MISSABLE = new Set(["weave", "fill-with-traps"]);

/** Describe a missed lesson step, or null when the screen cannot be missed. */
export function lessonStepMiss(
  lesson: Lesson,
  screen: LessonScreen,
): LessonStepMiss | null {
  if (!MISSABLE.has(screen.type)) return null;
  const targets = (screen as { targetItemIds?: readonly string[] }).targetItemIds;
  if (targets === undefined || targets.length === 0) return null;
  const tags =
    (screen as { payload?: { weakPointTags?: readonly string[] } }).payload
      ?.weakPointTags ?? [];
  return {
    lesson,
    screen,
    targetItemIds: targets,
    weakPointTags: tags,
    surface: surfaceOf(screen),
  };
}

export type LessonStepPracticeSearch = {
  readonly miss: LessonStepMiss;
  readonly seeds: readonly PracticeSeed[];
  readonly reachedItems: ReadonlySet<string>;
  readonly reachedLessons: ReadonlySet<string>;
  /** Seeds already offered this sitting. Nothing is offered twice. */
  readonly offeredSeedIds: ReadonlySet<string>;
};

/**
 * One more go at the thing the lesson is FOR, or nothing at all.
 *
 * ── THE TWO RULES THAT KEEP THIS FROM BECOMING FILLER ───────────────────────
 *
 * 1. The missed item must be something this lesson DECLARES it is teaching.
 *    A lesson carries supported and exposure language it never claims to
 *    install, and chasing a miss on that would be asking for production of
 *    material the lesson deliberately only showed. (Lawfulness would refuse
 *    most of it anyway; this refuses it for the product reason too.)
 *
 * 2. One offer, and the caller is told which seed so it can refuse a repeat.
 *    There is no quota, no target count, no "three more to go". A lesson with
 *    nothing lawful to offer offers nothing and says nothing.
 */
export function selectLessonStepPractice(
  search: LessonStepPracticeSearch,
): PracticeSeed | null {
  const { miss, seeds, reachedItems, reachedLessons, offeredSeedIds } = search;

  const demands = new Set(miss.lesson.acquisitionDemandItemIds ?? []);
  const chased = miss.targetItemIds.filter((id) => demands.has(id));
  if (chased.length === 0) return null;

  // Described as a miss the shared selector understands. `id` is a synthetic
  // sentinel that no seed can carry, so its "not the same seed" filter is a
  // no-op here rather than an accidental exclusion; `operation` is deliberately
  // a value no seed uses, so its "change the job" filter passes everything and
  // the surface tier decides. Both are stated rather than left to luck.
  const asSeed = {
    id: LESSON_STEP_SENTINEL_ID,
    operation: LESSON_STEP_SENTINEL_OPERATION,
    surface: miss.surface ?? LESSON_STEP_SENTINEL_SURFACE,
    targetItemIds: chased,
    exercise: { weakPointTags: miss.weakPointTags },
  } as unknown as PracticeSeed;

  return selectRepairSeed({
    missed: asSeed,
    seeds,
    reachedItems,
    reachedLessons,
    usedSeedIds: offeredSeedIds,
  });
}

/**
 * Sentinels, named so they are visibly not data.
 *
 * They exist because the shared selector filters against the miss's own id,
 * operation and surface, and a lesson step has none of those in practice's
 * vocabulary. Giving them values that cannot collide with an authored seed is
 * what makes those filters inert instead of silently wrong — a guard pins that
 * no seed ever carries them.
 */
export const LESSON_STEP_SENTINEL_ID = "lesson-step/not-a-seed";
export const LESSON_STEP_SENTINEL_OPERATION = "lesson-step" as never;
export const LESSON_STEP_SENTINEL_SURFACE = "lesson-step" as never;

/**
 * The seeds a LESSON can actually draw.
 *
 * Practice Hub has its own runner and draws every seed shape. A lesson has the
 * v1 screen renderers and nothing else, so the 52 `practice-build` seeds have
 * no surface inside a lesson today. Filtering them here, visibly, is the honest
 * version: the alternative is a policy that returns a seed the caller silently
 * cannot draw, which reads as "nothing to offer" for reasons nobody can see.
 *
 * 464 of the 516 seeds are weaves, so this costs the coverage almost nothing —
 * a guard measures exactly how much.
 */
export function seedsRenderableInALesson(
  seeds: readonly PracticeSeed[],
): readonly PracticeSeed[] {
  return seeds.filter((seed) => seed.exercise.type === "weave");
}
