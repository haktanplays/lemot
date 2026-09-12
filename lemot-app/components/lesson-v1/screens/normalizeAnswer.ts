export type MatchResult = "exact" | "alternative" | "none";

// Combining diacritical marks (U+0300–U+036F), left after NFD decomposition.
const DIACRITICS = /[̀-ͯ]/g;
// Smart single quotes (U+2018/U+2019) folded to a straight apostrophe.
const SMART_APOSTROPHES = /[‘’]/g;

// Deterministic, lenient normalization for typed Weave answers. Folds harmless
// orthography so a learner is never marked wrong for a missing accent, an
// internal comma, a trailing or internal period, extra spaces, or casing.
// Meaning-bearing marks are kept: "?" and "!" stay significant (a statement is
// not a question), and the apostrophe is preserved (only smart quotes fold to a
// straight one), so a missing apostrophe is NOT silently accepted as correct.
export function normalize(value: string): string {
  return value
    .replace(SMART_APOSTROPHES, "'") // apostrophe stays significant; only smart quotes fold
    .normalize("NFD") // decompose accented letters
    .replace(DIACRITICS, "") // strip diacritics: café -> cafe, plaît -> plait
    .replace(/[.,]/g, "") // drop commas and periods (orthographic, not meaning)
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function matchExpected(
  input: string,
  expectedAnswers: string[],
  acceptedAlternatives?: string[]
): MatchResult {
  const normInput = normalize(input);
  if (normInput === "") return "none";

  if (expectedAnswers.some((e) => normalize(e) === normInput)) {
    return "exact";
  }

  if (
    acceptedAlternatives !== undefined &&
    acceptedAlternatives.some((a) => normalize(a) === normInput)
  ) {
    return "alternative";
  }

  return "none";
}

/**
 * Accents that change WHICH WORD it is.
 *
 * `normalize` strips diacritics on purpose, and that is right for almost all of
 * them: a learner who writes "cafe" for "café" has produced the word and missed
 * a mark, and failing them for it would be punishing typing rather than French.
 *
 * A few accents are not decoration. Drop the one on `où` and you have written
 * `ou`, which is a different word meaning "or" — the learner has not mistyped
 * the word they meant, they have written another real one. So this list is
 * deliberately tiny and holds only pairs where BOTH forms are real French words
 * with different meanings. It is a writing distinction, not a grading
 * tightening: the answer is still accepted, and the note says what to fix.
 *
 * `à` / `a` is the other early one, and L7 already teaches it on the destination
 * card. It is listed here so the same note can reach it when a lesson asks for
 * it in writing.
 */
const LEXICAL_ACCENTS: readonly { accented: string; bare: string; note: string }[] =
  Object.freeze([
    {
      accented: "où",
      bare: "ou",
      note: "In writing, où keeps its accent. Without it, ou is the word for \"or\".",
    },
    {
      accented: "à",
      bare: "a",
      note: "In writing, à keeps its accent. Without it, a is a form of the verb \"to have\".",
    },
  ]);

export type WritingSlip = { word: string; note: string };

/**
 * The learner wrote the right French and spelled one meaning-bearing accent
 * away.
 *
 * Returns null unless the two answers are the SAME ANSWER under normalization
 * (so this can never turn a wrong answer into a near-right one) and the only
 * thing separating them is a listed lexical accent. That order matters: this is
 * a note about writing, laid on top of an answer the grader already accepted,
 * and it must never become a second grader.
 */
export function writingSlip(input: string, expected: string): WritingSlip | null {
  if (normalize(input) !== normalize(expected)) return null;
  const words = (v: string) =>
    v.toLowerCase().replace(/[’]/g, "'").split(/[^a-zà-ÿ']+/u).filter(Boolean);
  const wrote = new Set(words(input));
  const wanted = new Set(words(expected));
  for (const pair of LEXICAL_ACCENTS) {
    if (wanted.has(pair.accented) && wrote.has(pair.bare) && !wrote.has(pair.accented)) {
      return { word: pair.accented, note: pair.note };
    }
  }
  return null;
}
