import { normalize, writingSlip, type MatchResult } from "./normalizeAnswer";

/**
 * What the learner reads after an answer. One source of truth.
 *
 * The founder wrote "Je ne comprends pas, vous pouvez répéter" against a model
 * of "Je ne comprends pas. Vous pouvez répéter ?" and the screen said
 * "Accepted." That is a validation library talking, not a teacher — and worse,
 * it is inaccurate: nothing about that answer was merely tolerated. The only
 * difference was a comma where the model has a full stop and a missing question
 * mark.
 *
 * WHY THIS IS A PROJECTION AND NOT A GRADER CHANGE. The matcher keeps "?" and
 * "!" significant deliberately, and it must: L8 teaches that "C'est ici." and
 * "C'est ici ?" are the same three words told apart by the voice, so a matcher
 * that folded the mark away would erase a distinction the curriculum spends a
 * lesson on. Nothing here loosens that. An answer the grader does not accept is
 * still not accepted; this only decides what to CALL something already accepted.
 *
 * THE THREE THINGS A LEARNER CAN BE TOLD:
 *
 *   Correct        the answer is the model, give or take orthography.
 *   That works.    a genuinely different expression the author declared valid.
 *   compare        anything else — unchanged, and still never a verdict.
 */

/**
 * Equality after folding everything that carries no meaning in writing.
 *
 * Stricter than the matcher's normalization in one respect only: terminal
 * punctuation goes too. This is safe here BECAUSE it never admits an answer —
 * it is asked only about a pair the author already declared equivalent, and it
 * decides whether to say "Correct" or "That works".
 */
export function canonicallyEquivalent(a: string, b: string): boolean {
  const fold = (v: string) =>
    normalize(v)
      .replace(/[?!¿¡]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  const left = fold(a);
  return left.length > 0 && left === fold(b);
}

export type LearnerVerdict = {
  /** What the learner reads. */
  text: string;
  /** Presentation tone, unchanged from the existing feedback vocabulary. */
  tone: "ok" | "warm" | "soft";
  /**
   * Whether this reads as approval. Used by callers that need to know without
   * parsing the copy — and by the tests, so "Correct" can never quietly become
   * a tone the screen styles as a correction.
   */
  approves: boolean;
};

const CORRECT: LearnerVerdict = { text: "Correct.", tone: "ok", approves: true };
const ANOTHER_WAY: LearnerVerdict = { text: "That works.", tone: "warm", approves: true };

/**
 * The learner-facing verdict for an accepted answer.
 *
 * `match` is the grader's word. `answer` and `model` decide which kind of
 * acceptance it was: same sentence differently punctuated, or a different
 * sentence the author allowed.
 *
 * Returns null when the answer was not accepted at all, because "not accepted"
 * is not a verdict — the existing compare-with-the-model path owns that, and it
 * deliberately asserts nothing about what the learner wrote.
 */
export function learnerVerdict(
  match: MatchResult,
  answer: string,
  model: string | null | undefined,
): LearnerVerdict | null {
  // A WRITING SLIP, on top of an accepted answer.
  //
  // The founder typed "C'est ou" for "C'est où ?" and read "Correct." They had
  // in fact written a different real word: ou means "or". Telling them it was
  // correct teaches that the accent is optional, which is the one thing it is
  // not on this word.
  //
  // It stays ACCEPTED. The grader is untouched, the recorded evidence is
  // untouched, and only the sentence the learner reads changes: the French
  // landed, and one mark did not. Harsh failure for an accent would punish
  // typing, and this list holds only accents where dropping the mark produces
  // another real French word.
  const slip = typeof model === "string" ? writingSlip(answer, model) : null;
  if (slip !== null) {
    return {
      text: `Almost. ${slip.note}`,
      tone: "warm",
      approves: true,
    };
  }
  if (match === "exact") return CORRECT;
  if (match !== "alternative") return null;
  // An authored alternative that is the model in different clothes is not a
  // second-best answer, and calling it one teaches the learner to distrust
  // their own punctuation.
  if (typeof model === "string" && canonicallyEquivalent(answer, model)) return CORRECT;
  return ANOTHER_WAY;
}
