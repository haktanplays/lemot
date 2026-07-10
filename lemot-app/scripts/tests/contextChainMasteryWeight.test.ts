/**
 * PR-E2 — context_chain mastery credit is bounded (audit B23).
 *
 * A context_chain emits one graded event PER internal step, and every step event
 * used to carry the exercise's FULL target set — so an N-step chain over M targets
 * credited each target N times (N×M), "mastering" every item off a single chain.
 * The controller now attributes the chain's targets only on its FIRST recorded
 * event; later step events persist but carry no item attribution. Non-chain
 * operations are unchanged, and the PR-E1 near-miss/skip due-timing is preserved.
 *
 * Exercised end-to-end through the real `LearningSessionController` +
 * `LocalRepository` (in-memory KV) + the pure `scoreEvents` reducer.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv } from "./helpers";
import { LocalRepository } from "../../content/learning-engine/repository/local";
import { LearningSessionController } from "../../content/learning-engine/session-controller";
import { scoreEvents } from "../../content/learning-engine/mastery";
import type { ExerciseBlueprint } from "../../content/learning-engine/types";
import type { ErrorTagCode } from "../../content/learning-engine/events";

function makeController(repo: LocalRepository): LearningSessionController {
  let t = 0;
  let n = 0;
  return new LearningSessionController({
    repository: repo,
    sessionId: "sess-1",
    lessonId: "l1",
    contentVersion: "content-v1",
    now: () => (t += 1_000), // deterministic clock
    makeClientEventId: () => `evt-${(n += 1)}`, // deterministic id (no Math.random)
  });
}

const chain = (targetItemIds: string[]): ExerciseBlueprint => ({
  id: "cc-1",
  lessonId: "l1",
  operation: "context_chain",
  targetItemIds,
  prompt: "A small moment",
  steps: [
    { prompt: "s1", answer: "a1" },
    { prompt: "s2", answer: "a2" },
    { prompt: "s3", answer: "a3" },
  ],
});

const fill = (id: string, targetItemIds: string[]): ExerciseBlueprint => ({
  id,
  lessonId: "l1",
  operation: "fill",
  targetItemIds,
});

const graded = (result: ErrorTagCode) => ({
  userAnswer: "x",
  expectedAnswer: "x",
  gradeResult: { result, errorTags: [] as ErrorTagCode[], normalizedAnswer: "x" },
});

describe("PR-E2 B23 — context_chain mastery credit is bounded", () => {
  test("1. multiple steps × multiple targets do NOT create N×M mastery credit", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    const ex = chain(["a", "b"]);
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    await c.flush();

    const events = await repo.readAllEvents();
    assert(events.length === 3, "one event per step is still recorded (history preserved)");
    assertEqual(events[0].itemIds, ["a", "b"], "the first step carries the chain targets");
    assertEqual(events[1].itemIds, [], "later steps carry no item attribution");
    assertEqual(events[2].itemIds, [], "later steps carry no item attribution");

    const snap = scoreEvents(events);
    assert(Object.keys(snap.items).length === 2, "no item inflation");
    assert(snap.items["a"].productionAttempts === 1, "target a credited once, not 3×");
    assert(snap.items["b"].productionAttempts === 1, "target b credited once, not 3×");
  });

  test("2. completing a chain still gives bounded positive credit", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    const ex = chain(["a"]);
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    await c.flush();

    const snap = scoreEvents(await repo.readAllEvents());
    const a = snap.items["a"];
    assert(a.productionSuccess === 1, "a completed chain credits the target once");
    assert(a.leitnerBox === 1, "the box advances once (not to 4 off a single chain)");
    assert(a.monLexiqueStatus === "added", "a completed chain still adds the item");
  });

  test("3. a failed chain still records a bounded, meaningful failure/weak signal", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    const ex = chain(["a"]);
    c.recordGradedAttempt({ exercise: ex, ...graded("wrong_item") }); // first step wrong
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    await c.flush();

    const a = scoreEvents(await repo.readAllEvents()).items["a"];
    assert(a.productionFailure === 1, "the chain's failure is recorded (bounded to once)");
    assert(a.wrongCount === 1, "wrongCount reflects the failed step");
    assert((a.weakTags.wrong_item ?? 0) === 1, "the failing tag accrues weakness (meaningful)");
  });

  test("4. non-context_chain operations are unchanged (fill credits every attempt)", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    const ex = fill("f-1", ["c"]);
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    await c.flush();

    const events = await repo.readAllEvents();
    assertEqual(events[0].itemIds, ["c"], "fill keeps its target set on every attempt");
    assertEqual(events[1].itemIds, ["c"], "fill keeps its target set on every attempt");
    assert(scoreEvents(events).items["c"].productionAttempts === 2, "fill credits each attempt");
  });

  test("5. PR-E1 near-miss / skip due-timing is preserved through the controller", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    // A fill skip must keep the item due now (PR-E1 B12), unaffected by the B23 change.
    c.recordGradedAttempt({ exercise: fill("f-skip", ["d"]), ...graded("empty_or_skip") });
    await c.flush();

    const events = await repo.readAllEvents();
    const d = scoreEvents(events).items["d"];
    assert(d.skipCount === 1, "skip is counted");
    assert(d.leitnerBox === 0, "skip neither advances nor demotes the box");
    assert(d.dueAt === events[0].timestamp, "skip keeps the item due now (PR-E1 B12 preserved)");
  });
});
