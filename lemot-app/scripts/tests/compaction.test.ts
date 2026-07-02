/**
 * Event compaction v0 tests (Faz 6A Slice C; policy in
 * CONTENT_FACTORY_CONTRACT §5). Pure, local-only; the central invariant is
 * replay equivalence: snapshot + remaining events === full replay.
 */
import { describe, test, assert } from "./harness";
import type { LearningEvent } from "../../content/learning-engine/events";
import { scoreEvents } from "../../content/learning-engine/mastery";
import {
  COMPACTION_SNAPSHOT_VERSION,
  COMPACTION_EVENT_THRESHOLD,
  shouldRecommendCompaction,
  planCompaction,
  createSnapshot,
  restoreFromSnapshot,
} from "../../content/learning-engine/compaction";

const NOW = 1_800_000_000_000;

function mkEvent(n: number, result: LearningEvent["result"] = "correct"): LearningEvent {
  return {
    clientEventId: `evt-${n}`,
    sessionId: "s1",
    lessonId: "v1-lesson-002",
    exerciseId: `ex-${n % 5}`,
    operation: n % 3 === 0 ? "recognition" : "fill",
    itemIds: [n % 2 === 0 ? "chunk-je-suis" : "chunk-bonjour"],
    promptLevel: "PF0",
    attemptNumber: 1,
    userAnswer: null,
    expectedAnswer: null,
    normalizedAnswer: null,
    result,
    errorTags: [result],
    timestamp: NOW + n * 1000,
    contentVersion: "test",
    appBuild: "test",
    deviceInfo: { platform: "test" },
    sync: { status: "pending", origin: "local", queuedAt: NOW + n * 1000 },
  };
}

const events = Array.from({ length: 40 }, (_, i) =>
  mkEvent(i, i % 7 === 0 ? "missing_word" : "correct"),
);

describe("compaction › policy", () => {
  test("below threshold: no compaction recommended", () => {
    assert(!shouldRecommendCompaction(0), "empty log");
    assert(
      !shouldRecommendCompaction(COMPACTION_EVENT_THRESHOLD - 1),
      "one below threshold",
    );
    const plan = planCompaction(events);
    assert(plan.recommend === false, "40 events < 1000 must not recommend");
  });

  test("at/above threshold: compaction recommended", () => {
    assert(shouldRecommendCompaction(COMPACTION_EVENT_THRESHOLD), "at threshold");
    const plan = planCompaction(events, 10);
    assert(plan.recommend === true, "40 events vs threshold 10 must recommend");
    assert(plan.threshold === 10 && plan.eventCount === 40, "plan echoes sizes");
  });

  test("source events are always retained (v0 never deletes)", () => {
    const before = JSON.stringify(events);
    const plan = planCompaction(events, 10);
    assert(plan.retainedEvents.length === events.length, "all events retained");
    assert(JSON.stringify(events) === before, "input not mutated");
    assert(plan.retainedEvents !== events, "returns a copy, not the input array");
  });

  test("cursor points at the last folded event", () => {
    const plan = planCompaction(events);
    assert(plan.cursor.eventCount === 40, "count");
    assert(plan.cursor.lastClientEventId === "evt-39", "last id");
    assert(plan.cursor.upToEventTimestamp === NOW + 39 * 1000, "last timestamp");
    const empty = planCompaction([]);
    assert(
      empty.cursor.lastClientEventId === null &&
        empty.cursor.upToEventTimestamp === null,
      "empty log cursor is null",
    );
  });
});

describe("compaction › snapshot + restore", () => {
  test("snapshot is versioned and stamped with explicit now", () => {
    const snap = createSnapshot(events.slice(0, 20), NOW);
    assert(snap.version === COMPACTION_SNAPSHOT_VERSION, "version stamped");
    assert(snap.createdAt === NOW, "createdAt from explicit now");
    assert(snap.cursor.eventCount === 20, "cursor count");
  });

  test("unknown snapshot version is rejected, never migrated", () => {
    const snap = createSnapshot(events.slice(0, 5), NOW);
    const stale = { ...snap, version: "compaction-v9.9" };
    let threw = false;
    try {
      restoreFromSnapshot(stale, events.slice(5));
    } catch {
      threw = true;
    }
    assert(threw, "unknown version must throw");
  });

  test("INVARIANT: snapshot + remaining events replays to identical mastery", () => {
    const baseline = scoreEvents(events);
    for (const k of [0, 1, 13, 20, 39, 40]) {
      const snap = createSnapshot(events.slice(0, k), NOW);
      const restored = restoreFromSnapshot(snap, events.slice(k));
      assert(
        JSON.stringify(restored) === JSON.stringify(baseline),
        `split at ${k}: restored mastery must equal full replay`,
      );
    }
  });

  test("overlapping split cannot double-count (reducer idempotency)", () => {
    const baseline = scoreEvents(events);
    const snap = createSnapshot(events.slice(0, 25), NOW);
    const restored = restoreFromSnapshot(snap, events.slice(20)); // 5-event overlap
    assert(
      JSON.stringify(restored) === JSON.stringify(baseline),
      "overlap must not change derived mastery",
    );
  });

  test("compaction never changes derived mastery for the weak/error path either", () => {
    const errorHeavy = Array.from({ length: 12 }, (_, i) =>
      mkEvent(100 + i, "wrong_item"),
    );
    const all = [...events, ...errorHeavy];
    const baseline = scoreEvents(all);
    const snap = createSnapshot(all.slice(0, 45), NOW);
    const restored = restoreFromSnapshot(snap, all.slice(45));
    assert(
      JSON.stringify(restored) === JSON.stringify(baseline),
      "weak-path replay equivalence",
    );
  });
});
