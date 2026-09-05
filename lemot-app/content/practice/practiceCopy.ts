/**
 * Learner-facing practice copy — pure, and the boundary the internals stop at.
 *
 * Everything the planner works with is unfit to show: `practiceEligibility`,
 * `build` / `stretch` / `challenge`, weak tags, wrong counts, due timestamps,
 * item ids, and the operation names. None of it appears here. What the learner
 * gets instead is the French they actually worked on, which is both truthful
 * and the only summary that means anything to them.
 *
 * The preview deliberately does NOT list the French. A session preview that
 * printed its own answers would make the first half of every session a reading
 * exercise.
 */
import type { PracticeSessionAction } from "./practicePlanner";
import { expectedAnswerOf } from "./practicePlanner";

/**
 * The exact resting-state copy, for a learner with nothing lawful to practise.
 *
 * It points forward to the lesson rather than reporting an absence, because the
 * honest reason the surface is empty is that Practice is built from language the
 * learner has used and they have not used any yet.
 */
export const PRACTICE_EMPTY_LINE =
  "Finish your first lesson and Practice will build itself from the French you have used.";

/** A calm, leak-free sense of the session about to start. */
export function previewLine(actions: readonly PracticeSessionAction[]): string {
  const count = actions.length;
  const lessons = new Set(actions.map((a) => a.seed.originLessonId)).size;
  if (count === 0) return "";
  const actionWord = count === 1 ? "1 thing" : `${count} things`;
  if (lessons <= 1) return `${actionWord} to bring back.`;
  return `${actionWord} to bring back, from across what you have learned.`;
}

/** The French the learner produced or chose, in session order, de-duplicated. */
export function workedOnLines(actions: readonly PracticeSessionAction[]): string[] {
  const out: string[] = [];
  for (const action of actions) {
    const line = expectedAnswerOf(action.seed);
    if (line.length > 0 && !out.includes(line)) out.push(line);
  }
  return out;
}

/**
 * The one honest closing note.
 *
 * Only ever "worth another look", never a count, a score or a verdict, and
 * only when the learner actually missed something in this session.
 */
export function closingNote(missCount: number): string | null {
  if (missCount <= 0) return null;
  if (missCount === 1) return "One of these is worth another look.";
  return "A couple of these are worth another look.";
}
