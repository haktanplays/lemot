/**
 * Lesson progress projection (pure) — attempt coverage over the event log.
 *
 * `selectLessonProgress` is a deterministic projection of the append-only
 * `LearningEvent[]` (the engine spine) against a lesson's required exercise-id
 * list. It answers one question — "which of this lesson's exercises has the
 * learner attempted, and is the lesson fully covered?" — without reading
 * storage, touching the clock, or importing any UI / React Native.
 *
 * v1 semantics = ATTEMPT COVERAGE, not correctness or mastery:
 *  - An exercise is "attempted" once at least one event carries its `exerciseId`
 *    (ANY `result`, including `empty_or_skip` and recognition reveals).
 *  - `completed` = every required exercise attempted at least once AND the
 *    required list is non-empty. It is deliberately NOT "mastered" — correctness
 *    and mastery are separate projections (see ./mastery.ts).
 *  - `started` = at least one required exercise attempted.
 *
 * Matching is by `exerciseId` membership only. `lessonId` is echoed into the
 * result as a label and is NOT used to filter: exercise ids are globally unique
 * (the validator's `duplicate_exercise_id` rule), and skipping a `lessonId`
 * filter sidesteps casing drift between blueprint ids ("L1") and runtime event
 * lessonIds ("l1").
 *
 * Hard boundaries: pure + deterministic. No storage, no `Date.now`, no network,
 * no React / React Native, no UI. Imports only the `LearningEvent` type.
 */
import type { LearningEvent } from "./events";

export interface LessonProgress {
  lessonId: string;
  started: boolean;
  attempted: number;
  total: number;
  completed: boolean;
  attemptedExerciseIds: string[];
  remainingExerciseIds: string[];
}

export interface SelectLessonProgressInput {
  events: readonly LearningEvent[];
  lessonId: string;
  exerciseIds: readonly string[];
}

/**
 * Project a lesson's attempt coverage from the raw event log. Pure and
 * deterministic: output array order follows the de-duplicated `exerciseIds`
 * order, never event order.
 */
export function selectLessonProgress(
  input: SelectLessonProgressInput,
): LessonProgress {
  const { events, lessonId, exerciseIds } = input;

  // Required ids, de-duplicated with first-seen order preserved, so the output
  // is stable regardless of event order or caller-supplied duplicates.
  const required: string[] = [];
  const requiredSeen = new Set<string>();
  for (const id of exerciseIds) {
    if (!requiredSeen.has(id)) {
      requiredSeen.add(id);
      required.push(id);
    }
  }

  // Every exercise id that appears in at least one event. In v1 any result
  // counts as an attempt (coverage, not correctness).
  const attemptedInEvents = new Set<string>();
  for (const event of events) {
    attemptedInEvents.add(event.exerciseId);
  }

  const attemptedExerciseIds = required.filter((id) => attemptedInEvents.has(id));
  const remainingExerciseIds = required.filter((id) => !attemptedInEvents.has(id));

  const total = required.length;
  const attempted = attemptedExerciseIds.length;

  return {
    lessonId,
    started: attempted > 0,
    attempted,
    total,
    completed: total > 0 && attempted === total,
    attemptedExerciseIds,
    remainingExerciseIds,
  };
}
