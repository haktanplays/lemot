/**
 * Weakness has to be able to let go.
 *
 * `wrongCount` and `weakTags` only ever increment -- correctly, because the
 * history of failures is a fact about the append-only log and must not be
 * rewritten. But `isWeak` was computed straight off them, so it LATCHED: once
 * an item crossed the threshold it was weak for the life of the profile, no
 * matter how well the learner went on to use it.
 *
 * A learner who fumbled "je vais" three times in L7 and has produced it
 * correctly a dozen times since was still being shown it under "Things to look
 * at again". That is wrong, it is discouraging, and it is the pool Practice's
 * error mode draws from, so the mode could only ever grow.
 *
 * These pin the founder's rule -- error priority decreases and resolves after
 * later successful evidence -- and, just as importantly, that it is a CURRENT
 * state rather than a pardon: relapse re-flags immediately.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeEvent } from "./helpers";
import type { LearningEvent } from "../../content/learning-engine/events";
import {
  RECOVERY_BOX,
  WEAK_THRESHOLD,
  scoreEvents,
} from "../../content/learning-engine/mastery";

const ITEM = "item-a";

const attempt = (result: "correct" | "wrong_item"): LearningEvent =>
  makeEvent({ result, itemIds: [ITEM], operation: "open_production" });

const weakAfter = (...results: ("correct" | "wrong_item")[]): boolean => {
  const snap = scoreEvents(results.map(attempt));
  return snap.items[ITEM].isWeak;
};

describe("an item can stop being weak", () => {
  test("enough failures still make it weak", () => {
    const results = Array.from({ length: WEAK_THRESHOLD }, () => "wrong_item" as const);
    assert(weakAfter(...results), "the threshold must still do its job");
  });

  test("one success is not enough to clear it", () => {
    const results = [
      ...Array.from({ length: WEAK_THRESHOLD }, () => "wrong_item" as const),
      "correct" as const,
    ];
    assert(
      weakAfter(...results),
      "a single correct answer after repeated trouble is not evidence the trouble is over",
    );
  });

  test("a clean run clears it", () => {
    const results = [
      ...Array.from({ length: WEAK_THRESHOLD }, () => "wrong_item" as const),
      ...Array.from({ length: RECOVERY_BOX }, () => "correct" as const),
    ];
    assert(
      !weakAfter(...results),
      "after producing it correctly enough times, the learner has shown the trouble is over",
    );
  });

  test("relapse brings it straight back", () => {
    const results = [
      ...Array.from({ length: WEAK_THRESHOLD }, () => "wrong_item" as const),
      ...Array.from({ length: RECOVERY_BOX }, () => "correct" as const),
      "wrong_item" as const,
    ];
    assert(
      weakAfter(...results),
      "recovery is a current state, not a pardon: getting it wrong again is trouble again",
    );
  });

  test("the failure history itself is never rewritten", () => {
    const snap = scoreEvents([
      ...Array.from({ length: WEAK_THRESHOLD }, () => attempt("wrong_item")),
      ...Array.from({ length: RECOVERY_BOX }, () => attempt("correct")),
    ]);
    const m = snap.items[ITEM];
    assertEqual(
      m.wrongCount,
      WEAK_THRESHOLD,
      "recovery must not erase what the log says happened",
    );
    assert(
      Object.values(m.weakTags).some((c) => (c ?? 0) >= WEAK_THRESHOLD),
      "the weak tags stay too; only the learner-facing verdict moves",
    );
  });

  test("an item that was never trouble is never weak", () => {
    assert(!weakAfter("correct"), "success alone must not flag anything");
    assert(!weakAfter("wrong_item"), "one slip is not a pattern");
  });
});
