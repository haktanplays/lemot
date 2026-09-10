/**
 * Does an attempt show evidence that the learner understood the task?
 *
 * A non-empty response is not evidence of correctness. Before this existed the
 * runtime had two outcomes for a typed answer — matched, or not matched — and
 * the not-matched branch rendered a note authored as "understandable but
 * wrong". "Aaa" is not understandable, so the learner was told their meaning
 * landed on the strength of having typed something.
 *
 * The fix is to make "understandable" a fact the system can actually check.
 * The expected answer is segmented into the pieces the registry knows, and the
 * attempt is credited only for the pieces it genuinely contains. No NLP, no
 * runtime AI, no new content authoring: the components come from the same
 * registry-backed segmenter that draws the Showcase piece line, so what the
 * learner is shown and what they are credited for cannot drift apart.
 */
import { knownPieces } from "../lessons/showcasePieces";
import { normalize } from "@/components/lesson-v1/screens/normalizeAnswer";

/**
 * What the system is willing to claim about an attempt.
 *
 * `unknown` is deliberately distinct from `mismatch`: it means the task carried
 * no components this system can check, so nothing may be asserted either way.
 * Both route to neutral compare copy; only the reason differs.
 */
export type AnswerVerdict = "full" | "partial" | "mismatch" | "empty" | "unknown";

export type ComponentEvidence = {
  verdict: AnswerVerdict;
  /** Component texts the expected answer is built from. */
  expected: string[];
  /** Component texts actually present in the attempt. */
  matched: string[];
  /** True only where the system can positively vouch for the meaning. */
  meaningEvidenced: boolean;
};

/** Word-boundary-aware containment over normalized French. */
function contains(haystack: string, needle: string): boolean {
  if (needle.length === 0) return false;
  const i = haystack.indexOf(needle);
  if (i === -1) return false;
  const before = i === 0 ? " " : haystack[i - 1];
  const afterIndex = i + needle.length;
  const after = afterIndex >= haystack.length ? " " : haystack[afterIndex];
  return !/[a-z']/.test(before) && !/[a-z']/.test(after);
}

export function componentEvidence(
  userAnswer: string,
  expectedAnswers: readonly string[],
  matchedExactly: boolean,
): ComponentEvidence {
  const input = normalize(userAnswer);
  if (input === "") {
    return { verdict: "empty", expected: [], matched: [], meaningEvidenced: false };
  }
  if (matchedExactly) {
    return { verdict: "full", expected: [], matched: [], meaningEvidenced: true };
  }

  // Components of the closest authored answer. Longest expected answer first so
  // a richer model is not scored against a stub.
  const model = [...expectedAnswers].sort((a, b) => b.length - a.length)[0] ?? "";
  const expected = knownPieces(model).map((p) => normalize(p.text)).filter(Boolean);

  if (expected.length === 0) {
    // Nothing checkable. Assert nothing rather than guess in either direction.
    return { verdict: "unknown", expected: [], matched: [], meaningEvidenced: false };
  }

  const matched = expected.filter((c) => contains(input, c));
  if (matched.length === 0) {
    return { verdict: "mismatch", expected, matched, meaningEvidenced: false };
  }
  if (matched.length === expected.length) {
    // Every component is present but the whole did not match: word order,
    // an extra word, a missing apostrophe. The meaning is evidenced.
    return { verdict: "partial", expected, matched, meaningEvidenced: true };
  }
  return { verdict: "partial", expected, matched, meaningEvidenced: false };
}
