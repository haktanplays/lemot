/**
 * Practice-origin evidence — pure, and deliberately thin.
 *
 * A practice attempt is ordinary learning evidence. It goes down the same
 * append-only path, through the same admission rules, into the same reducer, so
 * the mastery a learner builds by practising is the same mastery they build by
 * learning. There is no `practiceScore`, no second database and no direct write
 * into a `MasterySnapshot`.
 *
 * So this file does NOT re-derive grading, targets, treatments, assistance or
 * the authored opportunity: it calls the SHIPPED lesson interaction builders and
 * replaces exactly two fields — the exercise identity and the lesson label.
 * Duplicating those builders to change a string would have been the beginning of
 * a second evidence path, and the second path is always the one that drifts.
 *
 * The two replaced fields are the whole of the lesson/practice boundary:
 *
 *   exerciseId  `practice/<seedId>`, never `<lessonId>/<screenId>`. This is the
 *               §23 invariant. `selectLessonProgress` decides completion by
 *               `exerciseId` membership and ignores `lessonId`, so an id in this
 *               namespace cannot complete a lesson screen, a lesson or a
 *               doorway, no matter how much of it a learner practises.
 *   lessonId    `practice-hub`, which matches no lesson contract.
 *
 * `placement: "practice_hub"` already existed in the event vocabulary. Nothing
 * about the event schema needed to change.
 */
import type {
  EventSurfaceResolver,
  RecordGradedAttemptInput,
} from "../learning-engine/session-controller";
import {
  choiceInteraction,
  typedAttemptInteraction,
  type ChoiceFacts,
  type TypedAttemptFacts,
} from "../lesson-v1-evidence/interactions";
import type { Lesson } from "../lessonTypes";
import { PRACTICE_SESSION_LESSON_ID, qualifyPracticeSeedId } from "./practiceIdentity";
import type { PracticeSeed } from "./practiceTypes";

/** Where practice events happen. The qualified SEED id is the payload identity. */
export const PRACTICE_HUB_SURFACE: EventSurfaceResolver = (exercise) => ({
  placement: "practice_hub",
  // No registered payload (PR-07) is reachable from Practice: the registry keys
  // on qualified LESSON screen ids, and a practice id is never one. Claiming an
  // evId or sentenceId here would be a guess, so both stay honestly null.
  evId: null,
  payloadId: exercise.id,
  sentenceId: null,
  sequence: null,
});

/** Re-identify a lesson-built interaction as practice-origin. */
function asPracticeOrigin(
  input: RecordGradedAttemptInput,
  seed: PracticeSeed,
): RecordGradedAttemptInput {
  return {
    ...input,
    exercise: {
      ...input.exercise,
      id: qualifyPracticeSeedId(seed.id),
      lessonId: PRACTICE_SESSION_LESSON_ID,
    },
  };
}

/**
 * One choice made in Practice.
 *
 * `originLesson` is the lesson that OWNS the language, and it is passed for one
 * reason: `treatmentFor`. An item's curriculum treatment is a fact about the
 * lesson that teaches it, and practising it later does not change that fact.
 */
export function practiceChoiceAttempt(
  seed: PracticeSeed,
  originLesson: Lesson,
  facts: ChoiceFacts,
): RecordGradedAttemptInput {
  if (seed.exercise.type !== "fill-with-traps") {
    throw new Error(`practice seed "${seed.id}" is not a choice`);
  }
  return asPracticeOrigin(choiceInteraction(originLesson, seed.exercise, facts), seed);
}

/** One typed production in Practice. */
export function practiceTypedAttempt(
  seed: PracticeSeed,
  originLesson: Lesson,
  facts: TypedAttemptFacts,
): RecordGradedAttemptInput {
  if (seed.exercise.type !== "weave") {
    throw new Error(`practice seed "${seed.id}" is not a typed production`);
  }
  return asPracticeOrigin(typedAttemptInteraction(originLesson, seed.exercise, facts), seed);
}
