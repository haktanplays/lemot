/**
 * What the learner can actually do — pure, deterministic, no clock.
 *
 * ── THE CLAIM THIS REPLACES ────────────────────────────────────────────────
 *
 * "My journey" listed a lesson's `canDo` line for every lesson in
 * `reachedLessonIds`, which is "lesson ids with real learner evidence" — ONE
 * event is enough. So a learner who opened Lesson 5, answered a single thing,
 * and closed the app was told, in the lesson's own confident words, that they
 * could now do what Lesson 5 promises.
 *
 * That is a fabricated capability claim, and it is the exact thing the product
 * is not allowed to do: only make claims supported by real state.
 *
 * ── WHAT IT IS GROUNDED IN NOW ─────────────────────────────────────────────
 *
 * A lesson declares what it installs — `acquisitionDemandItemIds`. The engine
 * already decides, per item, whether the learner has produced it and how:
 * `deriveProductionClaim` answers `independent`, `supported` or `none` from
 * scoped evidence. So the canDo line is claimable when every item the lesson
 * says it teaches has been produced.
 *
 * Three decisions inside that, each deliberate:
 *
 *  - SUPPORTED COUNTS. A learner who produced the French with the lesson's own
 *    scaffolding in front of them did produce it. Requiring `independent` would
 *    make the journey empty for most of A1 and would quietly redefine the
 *    lesson's promise as something harder than the lesson taught.
 *
 *  - EVERY DEMAND, NOT MOST. A canDo line is one sentence about one ability,
 *    and a lesson's demands are the parts of it. Two of three is not the
 *    ability, and a partial claim has no honest wording.
 *
 *  - A LESSON THAT DECLARES NOTHING CLAIMS NOTHING. "Every demand is met" is
 *    vacuously true of an empty list. L10 declares none today (it is the
 *    capstone), and it must not be handed a free claim by a quantifier.
 */
import { deriveProductionClaim } from "../learning-engine/mastery";
import type { MasterySnapshot } from "../learning-engine/mastery";
import type { Lesson } from "../lessonTypes";

export type CanDoLine = {
  readonly lessonId: string;
  readonly text: string;
};

/**
 * True when the learner has produced every item this lesson says it installs.
 *
 * Exported so the rule can be pinned directly, rather than only through the
 * list it produces.
 */
export function lessonCanDoIsEarned(lesson: Lesson, snapshot: MasterySnapshot): boolean {
  const demands = lesson.acquisitionDemandItemIds ?? [];
  if (demands.length === 0) return false;
  const items = snapshot.items ?? {};
  return demands.every((itemId) => {
    const mastery = items[itemId];
    if (mastery === undefined) return false;
    return deriveProductionClaim(mastery.production) !== "none";
  });
}

/**
 * The journey, in the lessons' own words, in authored order.
 *
 * Returns only lines the learner has earned. An empty result is a real answer
 * and the caller says so plainly — it is not a failure state.
 */
export function selectCanDoLines(input: {
  readonly lessons: readonly Lesson[];
  readonly snapshot: MasterySnapshot;
}): readonly CanDoLine[] {
  const out: CanDoLine[] = [];
  for (const lesson of input.lessons) {
    if (!lessonCanDoIsEarned(lesson, input.snapshot)) continue;
    const text = String((lesson as { canDo?: string }).canDo ?? "");
    if (text.length === 0) continue;
    out.push({ lessonId: lesson.id, text });
  }
  return out;
}
