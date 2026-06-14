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
