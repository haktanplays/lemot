/**
 * Shared test fixtures: an in-memory KV adapter and a LearningEvent factory.
 *
 * The KV adapter satisfies every storage seam the modules under test inject —
 * `KvLike` (LocalRepository: get/set), `KvRemovable` (delete primitive: remove),
 * and `KvFull` (privacy-local: get/set/remove) — so no native storage loads.
 */
import type { ErrorTagCode, LearningEvent } from "../../content/learning-engine/events";
import type { ItemId, OperationId, PromptFadeLevel } from "../../content/learning-engine/types";

/** Backing map is exposed so tests can assert exactly which keys were touched. */
export type FakeKv = {
  readonly map: Map<string, string>;
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

export function makeFakeKv(initial?: Record<string, string>): FakeKv {
  const map = new Map<string, string>(Object.entries(initial ?? {}));
  return {
    map,
    getItem: (key) => (map.has(key) ? (map.get(key) as string) : null),
    setItem: (key, value) => {
      map.set(key, value);
    },
    removeItem: (key) => {
      map.delete(key);
    },
  };
}

let seq = 0;

/**
 * Build a full `LearningEvent` with sensible defaults. Only `result` is
 * required; any field can be overridden. `clientEventId` is unique per call
 * unless overridden, so idempotency tests can force collisions deliberately.
 */
export function makeEvent(
  over: Partial<LearningEvent> & { result: ErrorTagCode },
): LearningEvent {
  seq += 1;
  const operation: OperationId = over.operation ?? "fill";
  const itemIds: ItemId[] = over.itemIds ?? ["item-a"];
  const promptLevel: PromptFadeLevel = over.promptLevel ?? "PF0";
  return {
    clientEventId: over.clientEventId ?? `evt-${seq}`,
    sessionId: over.sessionId ?? "sess-1",
    lessonId: over.lessonId ?? "l1",
    exerciseId: over.exerciseId ?? "ex-1",
    operation,
    itemIds,
    promptLevel,
    attemptNumber: over.attemptNumber ?? 1,
    userAnswer: over.userAnswer ?? "bonjour",
    expectedAnswer: over.expectedAnswer ?? "bonjour",
    normalizedAnswer: over.normalizedAnswer ?? "bonjour",
    result: over.result,
    errorTags: over.errorTags ?? [],
    timestamp: over.timestamp ?? 1_000,
    contentVersion: over.contentVersion ?? "content-v1",
    appBuild: over.appBuild ?? "test",
    deviceInfo: over.deviceInfo ?? { platform: "test" },
    sync: over.sync ?? { status: "pending", origin: "local", queuedAt: 1_000 },
  };
}
