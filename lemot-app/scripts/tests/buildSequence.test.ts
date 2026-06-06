/**
 * Area 6 — BuildCard tile-sequence grading.
 *
 * Guards the founder-smoke High fix: build correctness is the ANSWER TILE
 * SEQUENCE (tiles with an `answerIndex`, ordered by it), NOT a string match on
 * `targetText`. Punctuation that the tiles cannot reproduce — L1's internal comma
 * ("Bonjour, je voudrais un café"), L12/L16's trailing "?" — must never block a
 * correct build. Distractors (no `answerIndex`) are never part of a correct
 * answer, and the H-1 duplicate-Check guard still records each distinct selection
 * once. These tests exercise the pure `gradeBuildSequence` helper + the
 * `fingerprintAnswer` guard the card uses (no React renderer needed).
 */
import { describe, test, assert } from "./harness";
import {
  gradeBuildSequence,
  expectedTileSequence,
} from "../../components/learning-engine/buildSequence";
import { fingerprintAnswer } from "../../components/learning-engine/gradedAttemptGuard";
import type { BuildTile } from "../../content/learning-engine/types";

// L1 build: targetText has an INTERNAL COMMA; 3 answer tiles + 1 distractor.
const L1_TILES: BuildTile[] = [
  { itemId: "chunk:bonjour", answerIndex: 0 },
  { itemId: "chunk:je-voudrais", answerIndex: 1 },
  { itemId: "noun_phrase:un-cafe", answerIndex: 2 },
  { itemId: "chunk:je-veux" }, // distractor — no answerIndex
];
const L1_TARGET = "Bonjour, je voudrais un café";

// L12 build: targetText has a TRAILING "?"; 2 answer tiles + 1 distractor.
const L12_TILES: BuildTile[] = [
  { itemId: "chunk:est-ce-que", answerIndex: 0 },
  { itemId: "chunk:je-peux-faire-ca", answerIndex: 1 },
  { itemId: "chunk:je-veux" }, // distractor
];
const L12_TARGET = "Est-ce que je peux faire ça ?";

describe("Area 6 — BuildCard tile-sequence grading", () => {
  test("expectedTileSequence ignores distractors and orders by answerIndex", () => {
    assert(
      JSON.stringify(expectedTileSequence(L1_TILES)) ===
        JSON.stringify(["chunk:bonjour", "chunk:je-voudrais", "noun_phrase:un-cafe"]),
      "expected ordered answer itemIds without the distractor",
    );
  });

  test("correct sequence with internal-comma targetText returns correct (L1)", () => {
    const g = gradeBuildSequence({
      tiles: L1_TILES,
      picked: [0, 1, 2],
      expectedAnswer: L1_TARGET,
    });
    assert(g.result === "correct", `expected correct, got ${g.result}`);
    assert(
      g.errorTags.length === 1 && g.errorTags[0] === "correct",
      "errorTags must be [correct]",
    );
  });

  test("correct sequence with trailing-? targetText returns correct (L12)", () => {
    const g = gradeBuildSequence({
      tiles: L12_TILES,
      picked: [0, 1],
      expectedAnswer: L12_TARGET,
    });
    assert(g.result === "correct", `expected correct, got ${g.result}`);
  });

  test("wrong tile order does not return correct (wrong_order)", () => {
    const g = gradeBuildSequence({
      tiles: L1_TILES,
      picked: [1, 0, 2],
      expectedAnswer: L1_TARGET,
    });
    assert(g.result !== "correct", "reordered answer must not be correct");
    assert(g.result === "wrong_order", `expected wrong_order, got ${g.result}`);
  });

  test("distractor-only selection does not return correct", () => {
    const g = gradeBuildSequence({
      tiles: L1_TILES,
      picked: [3],
      expectedAnswer: L1_TARGET,
    });
    assert(g.result !== "correct", "distractor-only must not be correct");
    assert(
      g.result === "incorrect_but_understandable",
      `expected incorrect_but_understandable, got ${g.result}`,
    );
  });

  test("answer plus a trailing distractor is not correct", () => {
    const g = gradeBuildSequence({
      tiles: L1_TILES,
      picked: [0, 1, 2, 3],
      expectedAnswer: L1_TARGET,
    });
    assert(g.result !== "correct", "extra distractor must not be correct");
  });

  test("empty selection is empty_or_skip, not correct", () => {
    const g = gradeBuildSequence({ tiles: L1_TILES, picked: [] });
    assert(g.result === "empty_or_skip", `expected empty_or_skip, got ${g.result}`);
  });

  test("repeated unchanged Check records once; a changed selection records again", () => {
    // Mirrors the BuildCard H-1 guard: fingerprint the picked index sequence and
    // only hand the attempt up when the fingerprint changes.
    let recorded = 0;
    let lastFp: string | null = null;
    const check = (picked: number[]): string => {
      const g = gradeBuildSequence({
        tiles: L1_TILES,
        picked,
        expectedAnswer: L1_TARGET,
      });
      const fp = fingerprintAnswer(picked.join(","));
      if (lastFp !== fp) {
        lastFp = fp;
        recorded += 1;
      }
      return g.result;
    };
    assert(check([0, 1, 2]) === "correct", "first check is correct");
    check([0, 1, 2]); // unchanged — suppressed
    check([0, 1, 2]); // unchanged — suppressed
    const afterUnchanged: number = recorded;
    assert(afterUnchanged === 1, `unchanged re-checks must record once, got ${afterUnchanged}`);
    assert(check([1, 0, 2]) === "wrong_order", "changed selection grades wrong_order");
    const afterChanged: number = recorded;
    assert(afterChanged === 2, `changed selection must record again, got ${afterChanged}`);
  });
});
