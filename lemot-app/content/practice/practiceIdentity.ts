/**
 * Practice-origin evidence identity — pure.
 *
 * THE INVARIANT THIS FILE EXISTS FOR. `selectLessonProgress` decides whether a
 * lesson is complete by testing `exerciseId` membership against the lesson's
 * required ids, and it deliberately does NOT filter by `lessonId` (exercise ids
 * are globally unique, and skipping the filter sidesteps casing drift). So the
 * ONLY thing standing between "the learner practised" and "the learner
 * completed lesson 4" is the shape of the exercise id.
 *
 * A lesson screen's id is `<lessonId>/<screenId>`. A practice seed's is
 * `practice/<seedId>`. No lesson requires an id under the `practice/` prefix, so
 * no amount of practice can ever complete a lesson screen, a lesson, or an
 * acquisition doorway. That is a structural guarantee, not a policy someone has
 * to remember.
 */

/** The reserved namespace. Nothing outside Practice may mint an id under it. */
export const PRACTICE_ID_PREFIX = "practice/";

/** The controller-level lesson id practice sessions run under. */
export const PRACTICE_SESSION_LESSON_ID = "practice-hub";

/** The globally-unique evidence identity of one practice seed. */
export function qualifyPracticeSeedId(seedId: string): string {
  return `${PRACTICE_ID_PREFIX}${seedId}`;
}

/** True when an exercise id was minted by Practice rather than by a lesson. */
export function isPracticeExerciseId(exerciseId: string): boolean {
  return exerciseId.startsWith(PRACTICE_ID_PREFIX);
}
