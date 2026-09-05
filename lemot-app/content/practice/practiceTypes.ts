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

/**
 * How the learner physically works, which is NOT the same question as what
 * cognitive job they are doing. Retrieve can be a fill, a build or a dictation;
 * repair can be a choice or a production. Keeping the two axes apart is what
 * lets a session vary the widget without repeating the pedagogy, and vary the
 * pedagogy without repeating the widget.
 *
 * Authored rather than inferred, because the difference between `choice` and
 * `fill` is whether a French frame is printed around the gap — a real
 * difference in the task that a renderer check could not see.
 */
export type PracticeSurface =
  | "choice"
  | "fill"
  | "build"
  | "typed"
  | "context"
  | "listen"
  | "dictation";

export const PRACTICE_SURFACES: readonly PracticeSurface[] = [
  "choice",
  "fill",
  "build",
  "typed",
  "context",
  "listen",
  "dictation",
];

/** One tile in a reconstruction. Item-backed: tiles are pieces, never letters. */
export type PracticeBuildTile = {
  /** The canonical item this piece IS. Grading compares item sequences. */
  itemId: string;
  /** The surface as it appears in this sentence (casing differs from the item). */
  text: string;
  /** 0-based position in the answer. Omitted marks the tile a distractor. */
  answerIndex?: number;
};

/**
 * Reconstruct an owned sentence from its pieces.
 *
 * Practice-only: it is deliberately NOT added to `LessonScreen`, so no lesson
 * validator, taxonomy or renderer learns about it. Grading is the shipped
 * `gradeBuildSequence` — an ITEM SEQUENCE comparison, never a string rebuild —
 * so punctuation can never block a correct answer and tiles stay atomic.
 */
export type PracticeBuildScreen = {
  id: string;
  type: "practice-build";
  targetItemIds?: string[];
  weakPointTags?: WeakPointTag[];
  payload: {
    prompt: string;
    context?: string;
    tiles: PracticeBuildTile[];
    /** What the answer tiles spell. Reveal + validation only, never grading. */
    targetText: string;
    reveal: { ifCorrect: string; ifWrong?: string };
  };
};

/** A practice exercise is a v1 screen, plus the one surface v1 lacks. */
export type PracticeExercise =
  | FillWithTrapsScreen
  | WeaveScreen
  | PracticeBuildScreen;

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
  /** The physical interaction. Checked against the exercise shape, not trusted. */
  surface: PracticeSurface;
  /**
   * French to SPEAK before the learner answers, for the two listening surfaces.
   *
   * Its presence is what makes an exercise a listening one: the shipped Fill and
   * Weave components render unchanged, and the runner puts a listen control
   * above them. That is real reuse rather than a relabel, because the task
   * genuinely changes — with audio present the exercise prints no French, so the
   * only way to answer is to have heard it.
   */
  audio?: string;
  exercise: PracticeExercise;
  /**
   * Present only on repair seeds: the confusion this seed exists to work on.
   * The in-session repair queue matches a learner's miss to a seed by this tag.
   */
  repairsTag?: WeakPointTag;
};
