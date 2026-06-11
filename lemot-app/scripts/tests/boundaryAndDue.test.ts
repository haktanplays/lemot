/**
 * Boundary classifier + due-check regression tests (PR-T follow-up).
 *
 * Locks two tiny pure seams in the learning-engine that had no coverage:
 *   - `isBoundaryLaterForm` (content/learning-engine/boundary.ts): which
 *     recognition exercises are "A form for later" boundary cards.
 *   - `isItemDue` (content/learning-engine/practice-pool.ts): the SRS due check
 *     the Practice Pool ordering relies on.
 *
 * Both are pure, deterministic, AI-/storage-/React-free. Minimal fixtures: the
 * `ExerciseBlueprint` / `LessonContract` inputs are built as small partials cast
 * to their full types, since the classifier reads only a few fields and building
 * full objects would add irrelevant noise. No production file is changed.
 */
import { describe, test, assert } from "./harness";
import { isBoundaryLaterForm } from "../../content/learning-engine/boundary";
import { isItemDue } from "../../content/learning-engine/practice-pool";
import type {
  ExerciseBlueprint,
  LessonContract,
} from "../../content/learning-engine/types";

// Minimal partials: only the fields `isBoundaryLaterForm` reads are populated.
function makeEx(operation: string, targetItemIds?: string[]): ExerciseBlueprint {
  return { operation, targetItemIds } as unknown as ExerciseBlueprint;
}

function makeContract(
  recognitionOnly: string[],
  blockedProduction: string[],
): LessonContract {
  return {
    items: { recognitionOnly },
    production: { blockedProduction },
  } as unknown as LessonContract;
}

describe("boundary isBoundaryLaterForm", () => {
  test("recognition + target id in both recognitionOnly and blocked → true", () => {
    const ex = makeEx("recognition", ["a"]);
    const contract = makeContract(["a"], ["a"]);
    assert(isBoundaryLaterForm(ex, contract), "should be a later-form card");
  });

  test("non-recognition operation → false", () => {
    const ex = makeEx("fill", ["a"]);
    const contract = makeContract(["a"], ["a"]);
    assert(!isBoundaryLaterForm(ex, contract), "only recognition can be a boundary card");
  });

  test("empty targetItemIds → false", () => {
    const ex = makeEx("recognition", []);
    const contract = makeContract(["a"], ["a"]);
    assert(!isBoundaryLaterForm(ex, contract), "no targets → not a boundary card");
  });

  test("missing targetItemIds → false", () => {
    const ex = makeEx("recognition", undefined);
    const contract = makeContract(["a"], ["a"]);
    assert(!isBoundaryLaterForm(ex, contract), "missing targets → safe default false");
  });

  test("id only in recognitionOnly (not blocked) → false", () => {
    const ex = makeEx("recognition", ["a"]);
    const contract = makeContract(["a"], []);
    assert(!isBoundaryLaterForm(ex, contract), "shown but not blocked → not a later form");
  });

  test("id only in blockedProduction (not recognitionOnly) → false", () => {
    const ex = makeEx("recognition", ["a"]);
    const contract = makeContract([], ["a"]);
    assert(!isBoundaryLaterForm(ex, contract), "blocked but not recognition-shown → false");
  });

  test("multi-id: all ids qualify → true", () => {
    const ex = makeEx("recognition", ["a", "b"]);
    const contract = makeContract(["a", "b", "c"], ["a", "b"]);
    assert(isBoundaryLaterForm(ex, contract), "every target qualifies → true");
  });

  test("multi-id: one non-qualifying id → false", () => {
    // "b" is recognition-shown but NOT blocked, so the whole set fails.
    const ex = makeEx("recognition", ["a", "b"]);
    const contract = makeContract(["a", "b"], ["a"]);
    assert(!isBoundaryLaterForm(ex, contract), "one non-qualifying id breaks the set");
  });
});

describe("practice-pool isItemDue", () => {
  test("dueAt null → false", () => {
    assert(!isItemDue({ dueAt: null }, 100), "no dueAt → never due");
  });

  test("dueAt less than now → true", () => {
    assert(isItemDue({ dueAt: 50 }, 100), "past due → due");
  });

  test("dueAt equal to now → true (boundary)", () => {
    assert(isItemDue({ dueAt: 100 }, 100), "due exactly at now → due");
  });

  test("dueAt greater than now → false", () => {
    assert(!isItemDue({ dueAt: 150 }, 100), "future due → not due yet");
  });
});
