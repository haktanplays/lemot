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
 * Compact action/helper line. Restores the Weave mixed-language framing and
 * stays consistent with the one-time "How Weave works" interstitial. Mixed or
 * partial attempts still route to neutral compare (no red, never auto-correct);
 * this copy does not touch the evaluator.
 */
export const WEAVE_HELPER =
  "Use the French pieces you know. Leave the rest in English for now. Then compare with the model.";

/**
 * Label above the answer field. "Your try" (not "Your answer") keeps the Weave
 * mechanic non-final/non-graded, matching the neutral-compare flow.
 */
export const WEAVE_INPUT_LABEL = "Your try";

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
 * Open weaves are freer production (no single fixed phrase to "say"), and their
 * authored prompt is already a directive, e.g. "Close the moment in French:
 * thank them and say goodbye." Pairing that with "Say this:" doubles the
 * instruction, so the label is suppressed for open weaves; the directive is
 * shown prominently on its own. Every other weave type keeps the label.
 */
export function shouldShowWeaveTargetLabel(weaveType: WeaveType): boolean {
  return weaveType !== "open";
}
