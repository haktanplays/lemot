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

/**
 * Orientation — a SECOND fact, deliberately not folded into the first.
 *
 * L0 being finished and the product having been explained are different
 * things, and collapsing them breaks in both directions: a learner who skips
 * orientation must not look like they skipped the first taste, and a learner
 * who finishes L0 on a device whose storage then fails must not be pushed
 * through orientation forever.
 *
 * Written on LEAVING, whether that was Continue or Skip, because orientation
 * has nothing to resume. It is four short cards; a learner who puts the phone
 * down halfway through has lost nothing worth restoring, and replaying four
 * cards is a smaller harm than never showing them.
 */
export const SEEN_ORIENTATION_KEY = "lm7_seen_orientation";

/** True once the learner has been through, or past, the orientation. */
export function hasSeenOrientation(): boolean {
  try {
    return kvStorage.getItem(SEEN_ORIENTATION_KEY) === "true";
  } catch {
    // Same failure posture as the first taste: storage that cannot be read
    // must never trap someone in onboarding.
    return true;
  }
}

/** Record that orientation is done. Called on Continue and on Skip alike. */
export function markOrientationSeen(): void {
  try {
    kvStorage.setItem(SEEN_ORIENTATION_KEY, "true");
  } catch (e) {
    console.warn("[FirstUse] Failed to save orientation flag:", e);
  }
}
