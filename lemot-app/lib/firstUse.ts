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

/**
 * The first time Mon Lexique is opened — a third fact, and the last one.
 *
 * Orientation promised that the French the learner meets and uses is kept
 * here. The promise is made on a card; it has to be redeemed on arrival, when
 * they are looking at a piece they recognise from the lesson they just
 * finished. One line, once, at the moment it is true.
 *
 * Separate from orientation because they answer different questions and a
 * learner can reach either one first: someone who skipped orientation should
 * still get the line when they land here, and someone who read orientation
 * three lessons ago should not be assumed to remember it.
 */
export const SEEN_LEXIQUE_INTRO_KEY = "lm7_seen_lexique_intro";

/** True once the learner has been shown what this place is. */
export function hasSeenLexiqueIntro(): boolean {
  try {
    return kvStorage.getItem(SEEN_LEXIQUE_INTRO_KEY) === "true";
  } catch {
    // A tip is the smallest thing in the product. An unreadable store must
    // never make it the thing that keeps reappearing.
    return true;
  }
}

/** Record that the tip has been shown and dismissed. */
export function markLexiqueIntroSeen(): void {
  try {
    kvStorage.setItem(SEEN_LEXIQUE_INTRO_KEY, "true");
  } catch (e) {
    console.warn("[FirstUse] Failed to save Mon Lexique intro flag:", e);
  }
}

/**
 * Whether the learner has ever tapped a piece.
 *
 * ── WHY THIS FLAG EXISTS ────────────────────────────────────────────────────
 *
 * The founder reached L9 before discovering that pieces are tappable. The
 * feature had been there the whole time, on every Showcase since L0, doing
 * nothing for eight lessons because nothing ever said it was there. A capable
 * affordance nobody finds is not a feature; it is a cost.
 *
 * So the first few lessons carry one quiet line inviting the tap, and the
 * moment a piece is actually tapped the line is gone for good. Tutorial chrome
 * that outlives its job becomes furniture, and Cairn does not keep furniture.
 *
 * Failure reads TRUE, deliberately, like every other first-use flag here: a
 * store that cannot be read must not turn a one-time hint into the thing that
 * never stops appearing.
 */
export const TAPPED_A_PIECE_KEY = "lm7_tapped_a_piece";

export function hasTappedAPiece(): boolean {
  try {
    return kvStorage.getItem(TAPPED_A_PIECE_KEY) === "true";
  } catch {
    return true;
  }
}

export function markPieceTapped(): void {
  try {
    kvStorage.setItem(TAPPED_A_PIECE_KEY, "true");
  } catch (e) {
    console.warn("[FirstUse] Failed to save piece-tap flag:", e);
  }
}
