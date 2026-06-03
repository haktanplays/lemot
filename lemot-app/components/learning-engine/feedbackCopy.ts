import type { ErrorTagCode } from "@/content/learning-engine/events";

/**
 * Learner-facing feedback copy (P3.4) — UI only, shared by the input cards
 * (fill / build / register_switch).
 *
 * Maps a deterministic `ErrorTagCode` from `grade()` to calm, friendly text.
 * Raw tag names are NEVER rendered; an unmapped code falls back to a gentle
 * default. No engine logic lives here — it is purely presentational copy.
 */
const FRIENDLY: Partial<Record<ErrorTagCode, string>> = {
  correct: "That's it.",
  accepted_variant: "That works too.",
  punctuation_only: "Almost — just punctuation.",
  accent_only: "Almost — watch the accents.",
  spelling_near_miss: "Almost — small spelling slip.",
  wrong_order: "Right pieces, different order.",
  missing_word: "Something's missing.",
  extra_word: "One word too many.",
  blocked_form_used: "That form comes later.",
  recognition_only_form_used: "You'll build that one later.",
  empty_or_skip: "Try something first.",
  incorrect_but_understandable: "Not quite yet.",
};

const POSITIVE: ReadonlySet<ErrorTagCode> = new Set<ErrorTagCode>([
  "correct",
  "accepted_variant",
]);

/** Friendly, non-technical feedback line for a graded result. */
export function friendlyFeedback(result: ErrorTagCode): string {
  return FRIENDLY[result] ?? "Not quite yet.";
}

/** True when the result should read as a calm success (green), not a near-miss. */
export function isPositive(result: ErrorTagCode): boolean {
  return POSITIVE.has(result);
}
