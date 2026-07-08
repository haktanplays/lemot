/**
 * PR-B1 (audit B21) — context_chain progression must not dead-end on an
 * accent/punctuation slip.
 *
 * The ContextChainCard renders its Next/Finish button on `canAdvance(result)`.
 * A missing accent ("ca va" for "ça va") grades as `accent_only`, which must be
 * advanceable — otherwise the learner is trapped on the step. Genuinely wrong
 * answers stay blocked. We test the pure `canAdvance` predicate and prove the
 * real grader produces an advanceable result for the accent case.
 */
import { describe, test, assert } from "./harness";
import { canAdvance, isPositive } from "../../components/learning-engine/feedbackCopy";
import { grade } from "../../content/learning-engine/grade";

describe("PR-B1 — context_chain progression (B21)", () => {
  test("positive grades are advanceable", () => {
    assert(canAdvance("correct"), "correct advances");
    assert(canAdvance("accepted_variant"), "accepted_variant advances");
  });

  test("accent/punctuation near-misses are advanceable (no dead-end)", () => {
    assert(canAdvance("accent_only"), "a missing accent must not block progression");
    assert(canAdvance("punctuation_only"), "a trailing-punctuation slip must not block");
  });

  test("genuinely wrong grades stay blocked", () => {
    assert(!canAdvance("incorrect_but_understandable"), "wrong answer stays blocked");
    assert(!canAdvance("missing_word"), "missing a word stays blocked");
    assert(!canAdvance("empty_or_skip"), "empty submission stays blocked");
    assert(!canAdvance("spelling_near_miss"), "a real spelling miss is not an accent/punct slip");
  });

  test("near-miss is advanceable but NOT marked as a calm success", () => {
    // The green/amber feedback still distinguishes it — advanceable ≠ correct.
    assert(canAdvance("accent_only"), "advanceable");
    assert(!isPositive("accent_only"), "still reads as 'almost', not a green success");
  });

  test("grader: 'ca va' for 'ça va' grades accent_only and is advanceable", () => {
    const graded = grade({
      operation: "context_chain",
      userAnswer: "ca va",
      expectedAnswer: "ça va",
    });
    assert(graded.result === "accent_only", `expected accent_only, got ${graded.result}`);
    assert(canAdvance(graded.result), "the accent slip must let the learner advance");
  });

  test("grader: an unrelated wrong answer for 'ça va' is NOT advanceable", () => {
    const graded = grade({
      operation: "context_chain",
      userAnswer: "bonjour",
      expectedAnswer: "ça va",
    });
    assert(!canAdvance(graded.result), `wrong answer (${graded.result}) must stay blocked`);
  });
});
