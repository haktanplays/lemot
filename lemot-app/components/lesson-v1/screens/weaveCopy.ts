/**
 * Weave screen learner copy + the prompt -> target-meaning transform.
 *
 * Round 1.2 Weave UX batch: restore the branded "Weave" mechanic name, make the
 * target meaning visually dominant, and add one compact helper line. Kept as a
 * pure, dependency-free module (no React Native / Expo) so the strings and the
 * prompt transform can be locked by the tsx test harness, exactly like
 * normalizeAnswer.ts.
 *
 * Display-only: nothing here changes lesson content, the evaluator, or schema.
 */
import type { WeaveType } from "@/content/lessonTypes";

/** Branded mechanic name, shown as a small badge on every Weave screen. */
export const WEAVE_BADGE = "Weave";

/** Label sitting directly above the (now dominant) target meaning. */
export const WEAVE_TARGET_LABEL = "Say this:";

/**
 * Compact helper line: the mixed-language permission, and nothing else.
 *
 * It used to close with "Then compare with the model.", which narrated the
 * button directly beneath it — and every verdict note after the tap says
 * "Compare with the model." too, so the same sentence arrived three times
 * around one action. The founder read the screen as telling him the same job
 * twice in competing blocks. What stays is the half of the line no other
 * element says: French where you have it, English where you do not.
 *
 * Stays consistent with the one-time "How Weave works" interstitial, which
 * carries the fuller explanation. Mixed or partial attempts still route to
 * neutral compare (no red, never auto-correct); this copy does not touch the
 * evaluator.
 */
export const WEAVE_HELPER =
  "Use the French pieces you know. Leave the rest in English for now.";

/**
 * Label above the answer field. "Your try" (not "Your answer") keeps the Weave
 * mechanic non-final/non-graded, matching the neutral-compare flow.
 */
export const WEAVE_INPUT_LABEL = "Your try";

/**
 * Helper line for a dictation, where the standard one is actively wrong.
 *
 * "Leave the rest in English for now" is good advice when the learner is
 * building a sentence from a meaning, and nonsense when they are writing down
 * French they just heard — there is no English in the task to leave.
 */
export const WEAVE_DICTATION_HELPER =
  "Play it as many times as you like, then write the French you hear.";

// Authored Round 1 weave prompts use the form "Write it in French: <meaning>".
// With the new "Say this:" label + helper, that instruction prefix is redundant
// and would contradict "leave the rest in English", so strip it for DISPLAY and
// show the bare target meaning prominently. Prompts without the prefix (scenario
// / open weaves) pass through unchanged.
const WRITE_IN_FRENCH_PREFIX = /^\s*write it in french\s*:\s*/i;

/**
 * Display-only: return the bare target meaning for the "Say this:" line.
 * Strips a leading "Write it in French:" instruction; leaves every other prompt
 * (scenario/open weaves) exactly as authored.
 */
export function weaveTargetMeaning(prompt: string): string {
  return prompt.replace(WRITE_IN_FRENCH_PREFIX, "").trim();
}

/**
 * Whether to show the "Say this:" label above the target.
 *
 * The label promises that the line beneath it is a thing to SAY, so it belongs
 * only where that line is a target meaning. It reads wrong the moment the
 * prompt is a directive: "Say this: Tell them you are not there" asks the
 * learner to say an instruction.
 *
 * This used to key off the tier, suppressing the label for `open` alone, and
 * that was right while every other tier's prompt was authored as
 * "Write it in French: <meaning>" and displayed as the bare meaning. Once hard
 * weaves stopped handing over the English, their prompts became directives too
 * and the tier stopped predicting the shape. So the PROMPT decides: the label
 * appears exactly when a target meaning was stated and stripped for display.
 *
 * `weaveType` is kept in the signature because a caller that has a tier and no
 * prompt is a caller that cannot answer this question, and should not compile.
 */
export function shouldShowWeaveTargetLabel(
  weaveType: WeaveType,
  prompt: string,
): boolean {
  if (weaveType === "open") return false;
  return WRITE_IN_FRENCH_PREFIX.test(prompt);
}
