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
  punctuation_only: "Almost. Just punctuation.",
  accent_only: "Almost. Watch the accents.",
  spelling_near_miss: "Almost. Small spelling slip.",
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

// Harmless slips the learner may keep and still move on from: a missing accent
// or trailing punctuation. Aligned with the product's accent-optional philosophy
// ("a learner is never blocked for a missing accent"). These still show their own
// gentle feedback — they are advanceable, not silently marked correct.
const ADVANCEABLE_NEAR_MISS: ReadonlySet<ErrorTagCode> = new Set<ErrorTagCode>([
  "accent_only",
  "punctuation_only",
]);

/** Friendly, non-technical feedback line for a graded result. */
export function friendlyFeedback(result: ErrorTagCode): string {
  return FRIENDLY[result] ?? "Not quite yet.";
}

/** True when the result should read as a calm success (green), not a near-miss. */
export function isPositive(result: ErrorTagCode): boolean {
  return POSITIVE.has(result);
}

/**
 * True when the learner may progress past this result — a positive grade OR a
 * harmless accent/punctuation near-miss. Progression must not dead-end on a
 * recoverable slip (audit B21); genuinely wrong answers stay blocked.
 */
export function canAdvance(result: ErrorTagCode): boolean {
  return POSITIVE.has(result) || ADVANCEABLE_NEAR_MISS.has(result);
}
