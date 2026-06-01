/**
 * Pure learner-answer checker (v0).
 *
 * Used by the dev-only interactive renderer slice to grade a TYPED answer. It is
 * deliberately tiny, pure, and AI-free: no network, no model, no contract logic,
 * no React. v0 grades against a single canonical `targetText` via normalized
 * exact match.
 *
 * NOT implemented yet (by design): `expected-bank` semantics (no bank data
 * exists), and a recognition `displayAnswer` is a meaning gloss — never a
 * production answer, so it is never passed here as a target.
 */

// Combining diacritical marks (U+0300–U+036F): left after NFD decomposition.
const COMBINING_MARKS = /[̀-ͯ]/g;
// Trailing punctuation to ignore (only at the end, never internal).
const TRAILING_PUNCT = /[.,;:!?…]+$/;
// Typographic apostrophes / quote-like marks folded to a plain ASCII apostrophe
// (U+2019 ’, U+2018 ‘, U+02BC ʼ, U+00B4 ´) so a curly and a straight apostrophe
// in "s'il" compare equal. Internal apostrophes are otherwise preserved — the
// fold rewrites them, it does NOT strip them.
const APOSTROPHE_LIKE = /[’‘ʼ´]/g;

/**
 * Normalize an answer for lenient comparison: fold typographic apostrophes to
 * ASCII, strip diacritics, lowercase, collapse internal whitespace, trim, and
 * drop trailing punctuation. Mirrors the app's "flexible accept" rule (accents /
 * curly-vs-straight apostrophe / trailing comma or period optional). Internal
 * punctuation (e.g. the apostrophe in "s'il", internal commas) is preserved.
 */
export function normalizeAnswer(value: string): string {
  const collapsed = value
    .replace(APOSTROPHE_LIKE, "'")
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
  return collapsed.replace(TRAILING_PUNCT, "").trim();
}

/**
 * True when `input` matches `target` after normalization. Returns false for an
 * empty input or an undefined target (nothing to check against).
 */
export function checkAnswer(
  input: string,
  target: string | undefined,
): boolean {
  if (target === undefined) return false;
  const normalizedInput = normalizeAnswer(input);
  if (normalizedInput.length === 0) return false;
  return normalizedInput === normalizeAnswer(target);
}
