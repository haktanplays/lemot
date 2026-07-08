/**
 * PR-B1 (audit B11) — Review scoring denominator.
 *
 * A weave review item is scored one point PER blank, so the section total must
 * count blanks for weave items. Otherwise the numerator (per-blank increments)
 * exceeds the denominator (per-item count) and the score can read above 100%
 * (e.g. 4/2). These tests pin that the total equals the maximum achievable
 * score, so score ≤ total always holds.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { reviewTotalScorable } from "../../lib/reviewScore";
import type { ReviewItem } from "../../lib/types";

const listen: ReviewItem = { type: "listen", audio: "a", q: "q", a: "x", o: ["x", "y"] };
const context: ReviewItem = { type: "context", situation: "s", a: "x", o: ["x", "y"] };
const weave3: ReviewItem = {
  type: "weave",
  en: "I want a coffee",
  full: "Je voudrais un café",
  blanks: [
    { word: "want", answer: "voudrais" },
    { word: "a", answer: "un" },
    { word: "coffee", answer: "café" },
  ],
};
const weaveKnownSample: ReviewItem = {
  type: "weave",
  en: "hello",
  known: ["bonjour"],
  sample: "Bonjour",
};

describe("PR-B1 — Review total scorable units (B11)", () => {
  test("empty review has zero scorable units", () => {
    assertEqual(reviewTotalScorable([]), 0, "no items → 0");
  });

  test("non-weave items count one unit each", () => {
    assertEqual(reviewTotalScorable([listen, context]), 2, "two MCQ-style items → 2");
  });

  test("a blank-weave item counts one unit PER blank", () => {
    assertEqual(reviewTotalScorable([weave3]), 3, "3 blanks → 3 units");
  });

  test("mixed set: blanks + per-item units share one denominator", () => {
    // Max achievable score: all 3 blanks + the listen item = 4, denominator = 4.
    assertEqual(
      reviewTotalScorable([listen, weave3]),
      4,
      "1 (listen) + 3 (blanks) = 4 — numerator can never exceed this",
    );
  });

  test("the known/sample weave variant (no blanks) counts as one unit", () => {
    assertEqual(reviewTotalScorable([weaveKnownSample]), 1, "no blanks field → 1 unit");
  });

  test("score can never exceed total: per-item max increments sum to the total", () => {
    const items: ReviewItem[] = [listen, weave3, context, weaveKnownSample];
    // Model the component's max numerator: +1 per non-weave item, +1 per weave blank.
    const maxScore = items.reduce(
      (sum, it) => sum + (it.type === "weave" && "blanks" in it ? it.blanks.length : 1),
      0,
    );
    assert(
      maxScore === reviewTotalScorable(items),
      "maximum achievable score must equal the denominator (no >100%)",
    );
  });
});
