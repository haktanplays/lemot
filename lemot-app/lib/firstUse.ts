/**
 * First use — one flag, one meaning.
 *
 * The flag records that the first taste is FINISHED, not that it was opened.
 * The difference is the whole behaviour of an interrupted first run:
 *
 *   written on entry      → a learner who meets Bonjour and puts the phone
 *                           down comes back to the Journey with the first
 *                           taste gone. L0 is not a step on the path, so it is
 *                           gone for good.
 *   written on completion → the same learner is sent back to L0 and the
 *                           ordinary lesson cursor resumes them at the beat
 *                           they were on. Nothing replays, nothing is lost.
 *
 * So the redirect asks "has the first taste been finished?", and resumption is
 * left to the cursor that already does it for every other lesson.
 */
import { kvStorage } from "@/lib/storage";

export const SEEN_LESSON_ZERO_KEY = "lm7_seen_lesson_zero";

/** True once the learner has reached the end of the first taste. */
export function hasFinishedFirstTaste(): boolean {
  try {
    return kvStorage.getItem(SEEN_LESSON_ZERO_KEY) === "true";
  } catch {
    // Storage that cannot be read should not trap a learner in onboarding.
    return true;
  }
}

/** Record that the first taste is done. Called once, from its last screen. */
export function markFirstTasteFinished(): void {
  try {
    kvStorage.setItem(SEEN_LESSON_ZERO_KEY, "true");
  } catch (e) {
    console.warn("[FirstUse] Failed to save first-use flag:", e);
  }
}
