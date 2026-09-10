/**
 * Three ways in, one pool.
 *
 * The risk with modes is three divergent exercise sets: a seed lawful in one
 * and not another, or a mode quietly demanding French the learner never met.
 * These pin that every mode NARROWS the same corpus and can never widen it.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { PRACTICE_SEEDS } from "../../content/practice/seeds";
import { V1_LESSONS } from "../../content/lessons/v1";
import { seedsForMode, weakItemIds, hasErrorsToPractise } from "../../content/practice/practiceModes";
import type { MasterySnapshot } from "../../content/learning-engine/mastery";

const snapshot = (weak: string[]): MasterySnapshot =>
  ({
    version: "test",
    items: Object.fromEntries(weak.map((id) => [id, { isWeak: true }])) as never,
    processedClientEventIds: [],
    updatedAt: null,
  }) as MasterySnapshot;

describe("modes narrow one pool and never widen it", () => {
  test("freestyle is the whole authored corpus", () => {
    assertEqual(
      seedsForMode("freestyle", { seeds: PRACTICE_SEEDS, snapshot: snapshot([]) }).length,
      PRACTICE_SEEDS.length,
      "freestyle must not drop anything",
    );
  });

  test("every mode returns a subset of the same corpus", () => {
    const all = new Set(PRACTICE_SEEDS.map((s) => s.id));
    const lesson = (V1_LESSONS as { id: string }[])[6].id;
    for (const pool of [
      seedsForMode("errors", { seeds: PRACTICE_SEEDS, snapshot: snapshot(["chunk-je-vais"]) }),
      seedsForMode("byLesson", { seeds: PRACTICE_SEEDS, snapshot: snapshot([]), lessonId: lesson }),
    ]) {
      for (const s of pool) assert(all.has(s.id), `${s.id} is not from the authored corpus`);
    }
  });

  test("errors selects only seeds that work a weak item", () => {
    const pool = seedsForMode("errors", {
      seeds: PRACTICE_SEEDS,
      snapshot: snapshot(["chunk-je-vais"]),
    });
    assert(pool.length > 0, "a weak item the corpus covers should yield work");
    for (const s of pool)
      assert(s.targetItemIds.includes("chunk-je-vais"), `${s.id} does not work the weak item`);
  });

  test("no weak items means no work, rather than invented work", () => {
    assertEqual(
      seedsForMode("errors", { seeds: PRACTICE_SEEDS, snapshot: snapshot([]) }).length,
      0,
      "errors must not fabricate material",
    );
    assertEqual(
      hasErrorsToPractise(snapshot([]), PRACTICE_SEEDS),
      false,
      "the entry must be able to say there is nothing waiting",
    );
  });

  test("by lesson stays inside the lesson asked for", () => {
    const lesson = (V1_LESSONS as { id: string; number: number }[]).find((l) => l.number === 7)!;
    const pool = seedsForMode("byLesson", {
      seeds: PRACTICE_SEEDS,
      snapshot: snapshot([]),
      lessonId: lesson.id,
    });
    assert(pool.length > 0, "a reached lesson should have practice material");
    for (const s of pool)
      assertEqual(s.originLessonId, lesson.id, `${s.id} came from another lesson`);
  });

  test("by lesson with no lesson chosen offers nothing", () => {
    assertEqual(
      seedsForMode("byLesson", { seeds: PRACTICE_SEEDS, snapshot: snapshot([]), lessonId: null }).length,
      0,
      "an unchosen lesson must not silently mean all lessons",
    );
  });

  test("weakness is read from mastery, not from a second store", () => {
    const w = weakItemIds(snapshot(["chunk-merci", "chunk-je-vais"]));
    assertEqual(w.size, 2, "both weak items should be read");
    assert(w.has("chunk-merci") && w.has("chunk-je-vais"), "weak ids must come through");
  });
});
