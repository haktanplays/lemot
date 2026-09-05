/**
 * Practice seed model — the static content layer behind Practice Hub V1.
 *
 * WHY A SEPARATE LAYER, and not "replay the lesson screen". P4.6's
 * `selectReusablePracticeExercise` finds an authored lesson exercise and hands
 * it back. That was right for a fixture preview and is wrong for a product: the
 * learner would meet the same six screens forever, and — far worse — the
 * evidence would carry a LESSON exercise id. `selectLessonProgress` matches on
 * `exerciseId` alone and ignores `lessonId`, so replaying a lesson screen from
 * Practice would mark that lesson screen attempted and could complete a lesson
 * the learner never opened. Practice therefore owns its own exercises.
 *
 * WHAT IT REUSES. Everything that matters: the exercise IS a v1 screen
 * (`FillWithTrapsScreen` / `WeaveScreen`), so the shipped renderers draw it and
 * the shipped deterministic graders grade it. There is no second grading engine,
 * no second renderer and no second item registry — `targetItemIds` and
 * `requiredItemIds` resolve through the canonical boundary like any lesson
 * target, and treatment resolves against the lesson that actually owns the
 * language.
 *
 * OPERATION vs SCREEN TYPE. A fill and a weave are two *interfaces*; retrieve /
 * produce / repair / apply are four *cognitive jobs*, and a session is varied
 * when the jobs vary, not when the widgets do. The operation is therefore
 * authored, never inferred from the screen type: "translate this" and "you are
 * at the door, say the thing" are both weaves and are not the same work.
 */
import type { FillWithTrapsScreen, WeaveScreen } from "../lessonTypes";
import type { WeakPointTag } from "../weakPointTags";

/**
 * The four learner jobs. Internal vocabulary: these names are used for session
 * variety and are never rendered — a learner is not told they are "applying".
 */
export type PracticeOperation = "retrieve" | "produce" | "repair" | "apply";

export const PRACTICE_OPERATIONS: readonly PracticeOperation[] = [
  "retrieve",
  "produce",
  "repair",
  "apply",
];

/** Lesson difficulty contract, unchanged: HARD is context-only, no translation. */
export type PracticeDifficulty = "easy" | "medium" | "hard";

/** A practice exercise is a v1 screen, so shipped renderers and graders apply. */
export type PracticeExercise = FillWithTrapsScreen | WeaveScreen;

export type PracticeSeed = {
  /** Stable and globally unique. Namespaced into an exercise id at record time. */
  id: string;
  operation: PracticeOperation;
  difficulty: PracticeDifficulty;
  /**
   * The lesson that OWNS this language. Two jobs: it resolves curriculum
   * treatment for every target, and it fixes how far along the path a learner
   * must be before the seed may appear at all.
   */
  originLessonId: string;
  /**
   * Everything the learner must already own to have a fair shot. Includes the
   * targets plus any frame language the prompt leans on. Eligibility reads this,
   * so a seed can never demand a piece the learner has not lawfully reached.
   */
  requiredItemIds: string[];
  /** What a correct attempt actually demonstrates. Becomes the evidence targets. */
  targetItemIds: string[];
  exercise: PracticeExercise;
  /**
   * Present only on repair seeds: the confusion this seed exists to work on.
   * The in-session repair queue matches a learner's miss to a seed by this tag.
   */
  repairsTag?: WeakPointTag;
};
