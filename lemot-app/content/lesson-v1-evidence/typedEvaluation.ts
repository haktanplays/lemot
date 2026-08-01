/**
 * Shared deterministic evaluation for typed lesson answers (PR-06) — pure.
 *
 * Before PR-06 the Weave screen graded the learner with `matchExpected()` for
 * its own feedback, and nothing else. Once the same answer also becomes a
 * persisted event, running the UI matcher and the event grader independently
 * would let the two disagree — the learner reads "Correct." while the log
 * records a miss, or the reverse. That divergence would be invisible and
 * permanent, because the log is append-only.
 *
 * So there is ONE function, and its single result drives both. It preserves the
 * existing harmless-normalization behaviour exactly: `matchExpected` remains the
 * authority on what counts as a match (folding accents, commas and periods but
 * keeping `?`, `!` and the apostrophe meaning-bearing), and the deterministic
 * `grade()` engine is consulted only to DIAGNOSE an answer that already failed
 * to match — never to overturn a match.
 *
 * Hard boundaries: no clock, no storage, no React, no AI. AI feedback may
 * explain afterwards; it never produces or overrides a result here.
 */
import type { GradeResultLike } from "../learning-engine/session-controller";
import type { OperationId } from "../learning-engine/types";
import { grade } from "../learning-engine/grade";
import { normalizeAnswer } from "../learning-engine/answer-check";
import {
  matchExpected,
  type MatchResult,
} from "../../components/lesson-v1/screens/normalizeAnswer";

export type TypedEvaluation = {
  /** What the SCREEN shows. Unchanged from the pre-PR-06 behaviour. */
  match: MatchResult;
  /** What the EVENT records. Derived from the same decision. */
  grade: GradeResultLike;
};

export type TypedEvaluationInput = {
  userAnswer: string;
  expectedAnswers: string[];
  acceptedAlternatives?: string[];
  /** The blueprint's operation, so diagnostics stay operation-appropriate. */
  operation?: OperationId;
};

/**
 * Evaluate one typed answer once.
 *
 * - exact normalized match      → UI `exact`,       event `correct`
 * - explicit accepted variant   → UI `alternative`, event `accepted_variant`
 * - no match                    → UI `none`,        event = `grade()`'s diagnosis
 *   (empty_or_skip · missing_word · extra_word · spelling_near_miss · …)
 *
 * The no-match branch cannot resurrect a success: `grade()` is strictly less
 * lenient than `matchExpected`, so an answer that failed to match can never come
 * back as `correct`. The `errorTags` array mirrors `grade()`'s own contract of
 * `[result]`; an assessed event may never carry zero tags.
 */
export function evaluateTypedAnswer(input: TypedEvaluationInput): TypedEvaluation {
  const { userAnswer, expectedAnswers, acceptedAlternatives } = input;
  const match = matchExpected(userAnswer, expectedAnswers, acceptedAlternatives);
  const normalizedAnswer = normalizeAnswer(userAnswer);
  const expectedAnswer = expectedAnswers[0] ?? null;

  if (match === "exact") {
    return {
      match,
      grade: { result: "correct", errorTags: ["correct"], normalizedAnswer },
    };
  }
  if (match === "alternative") {
    return {
      match,
      grade: {
        result: "accepted_variant",
        errorTags: ["accepted_variant"],
        normalizedAnswer,
      },
    };
  }

  const diagnosed = grade({
    operation: input.operation ?? "fill",
    userAnswer,
    expectedAnswer,
    acceptedAnswers: acceptedAlternatives,
  });
  return {
    match,
    grade: {
      result: diagnosed.result,
      errorTags: [...diagnosed.errorTags],
      normalizedAnswer: diagnosed.normalizedAnswer,
    },
  };
}
