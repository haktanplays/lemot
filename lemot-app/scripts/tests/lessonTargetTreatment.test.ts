/**
 * Every screen target a shipped lesson names must be a target that lesson can
 * state a treatment for.
 *
 * This is the crash class, not a style rule. `targetItemIds` is a plain string
 * array — nothing type-checks it against `learningItems` — while the evidence
 * layer resolves EVERY target through `resolveLessonTreatmentForItem`, which
 * fails closed rather than guessing "active". So a lesson that targets an item
 * it never declares does not degrade: it throws `LessonTreatmentError` out of
 * `recordExposure` partway through play, and the lesson becomes unplayable from
 * that screen on. L3 shipped that way, and so did L4.
 *
 * The check is a RATCHET, not a scoped-away subset. Every lesson is walked; the
 * only tolerated failures are the exact pinned pairs below. A new occurrence
 * anywhere fails, and repairing a pinned one fails until it is removed from the
 * pin — the baseline can only shrink.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import {
  LessonTreatmentError,
  resolveLessonTreatmentForItem,
} from "../../content/lesson-v1-evidence/treatment";
import type { ItemId } from "../../content/itemRegistry";

/**
 * Known-open occurrences, as `lessonId/itemId`.
 *
 * L3 was repaired by the L1-L3 content pass and L4 by the L1-L6 founder-usable
 * pass. L10 carries the same defect and is deliberately NOT repaired here: it
 * sits outside that phase's scope. It is pinned so it stays visible and cannot
 * be joined by a new one.
 */
const KNOWN_UNRESOLVED: readonly string[] = ["v1-lesson-010/chunk-je-suis"];

/** Every `lessonId/itemId` whose treatment the lesson cannot state. */
function unresolvedTargets(): string[] {
  const found: string[] = [];
  for (const lesson of V1_LESSONS) {
    const seen = new Set<string>();
    for (const screen of lesson.screens) {
      for (const id of screen.targetItemIds ?? []) {
        if (seen.has(id)) continue;
        seen.add(id);
        try {
          resolveLessonTreatmentForItem(id as ItemId, lesson);
        } catch (error) {
          assert(
            error instanceof LessonTreatmentError,
            `${lesson.id}/${id} failed with an unexpected error: ${String(error)}`,
          );
          found.push(`${lesson.id}/${id}`);
        }
      }
    }
  }
  return found.sort();
}

describe("a lesson can state a treatment for every target it names", () => {
  test("no shipped lesson gained a new undeclared target", () => {
    assertEqual(
      unresolvedTargets(),
      [...KNOWN_UNRESOLVED].sort(),
      "targets whose treatment the lesson cannot state — the pin may only shrink",
    );
  });

  test("the whole learner-visible L0-L6 path resolves every target", () => {
    // The Home path opens L1-L24 under a linear unlock, so this is not the only
    // reachable range; it is the range this phase hardened, asserted separately
    // so a regression in it is named for what it is rather than folded into the
    // pin above.
    const early = unresolvedTargets().filter((entry) => {
      const number = Number(entry.slice("v1-lesson-".length, "v1-lesson-".length + 3));
      return number <= 6;
    });
    assertEqual(early, [], "L0-L6 must be playable end to end");
  });

  test("the pin names only real, still-present occurrences", () => {
    // A stale pin is dead policy: it would silently absorb the next regression
    // in that lesson. Repairing L10 must therefore fail this test until the
    // entry is deleted.
    const live = new Set(unresolvedTargets());
    for (const entry of KNOWN_UNRESOLVED) {
      assert(
        live.has(entry),
        `pinned occurrence "${entry}" is fixed — delete it from KNOWN_UNRESOLVED`,
      );
    }
  });

  test("L4's three repaired targets stay declared", () => {
    // The exact regression this test was written for: an insight, a fill and a
    // weave each named an owned recycle that learningItems never listed.
    const lesson = V1_LESSONS.find((l) => l.id === "v1-lesson-004");
    assert(lesson !== undefined, "L4 is shipped");
    for (const id of ["chunk-je-suis", "chunk-je-suis-ici", "chunk-bonjour"] as ItemId[]) {
      assertEqual(
        resolveLessonTreatmentForItem(id, lesson),
        "active",
        `L4 states a treatment for ${id}`,
      );
    }
  });
});
