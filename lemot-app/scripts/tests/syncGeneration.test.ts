/**
 * PR-I1 — user-bound local sync-generation mirror (audit C1 durability).
 *
 * The device stamps outgoing writes with the acknowledged server generation,
 * bound to the authenticated user. These verify hydration (absent/own/foreign/
 * corrupt/unreadable), that acknowledging persists a user-bound record, and that
 * `blockSyncGeneration` fails closed.
 */
import { describe, test, assert } from "./harness";
import { makeFakeKv } from "./helpers";
import {
  LM_SYNC_GENERATION_KEY,
  syncGeneration,
  isSyncGenerationReady,
  hydrateSyncGeneration,
  setSyncGeneration,
  blockSyncGeneration,
  __resetSyncGenerationForTest,
} from "../../lib/syncGeneration";

const rec = (userId: string, generation: number) =>
  JSON.stringify({ version: 1, userId, generation });

describe("PR-I1 — user-bound sync generation mirror", () => {
  test("absent → baseline 0, ready for this user", async () => {
    __resetSyncGenerationForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
    assert(syncGeneration() === 0 && isSyncGenerationReady(), "fresh baseline is ready at 0");
  });

  test("own valid record → adopted + ready", async () => {
    __resetSyncGenerationForTest();
    await hydrateSyncGeneration({
      userId: "user-a",
      store: makeFakeKv({ [LM_SYNC_GENERATION_KEY]: rec("user-a", 5) }),
    });
    assert(syncGeneration() === 5 && isSyncGenerationReady(), "own record adopted");
  });

  test("another user's record → NOT ready (fail closed), not overwritten", async () => {
    __resetSyncGenerationForTest();
    const kv = makeFakeKv({ [LM_SYNC_GENERATION_KEY]: rec("user-b", 9) });
    await hydrateSyncGeneration({ userId: "user-a", store: kv });
    assert(!isSyncGenerationReady(), "foreign generation is not usable for this user");
    assert(kv.map.get(LM_SYNC_GENERATION_KEY) === rec("user-b", 9), "foreign record not overwritten");
  });

  test("corrupt record → NOT ready (fail closed)", async () => {
    __resetSyncGenerationForTest();
    await hydrateSyncGeneration({
      userId: "user-a",
      store: makeFakeKv({ [LM_SYNC_GENERATION_KEY]: "{not json" }),
    });
    assert(!isSyncGenerationReady(), "corrupt record fails closed");
  });

  test("read failure → NOT ready (fail closed)", async () => {
    __resetSyncGenerationForTest();
    await hydrateSyncGeneration({
      userId: "user-a",
      store: {
        getItem: () => {
          throw new Error("read failed");
        },
        setItem: () => {},
      },
    });
    assert(!isSyncGenerationReady(), "unreadable → fail closed");
  });

  test("setSyncGeneration persists a user-bound record and adopts it", async () => {
    __resetSyncGenerationForTest();
    const kv = makeFakeKv();
    await setSyncGeneration({ userId: "user-a", generation: 3, store: kv });
    assert(kv.map.get(LM_SYNC_GENERATION_KEY) === rec("user-a", 3), "persisted user-bound record");
    assert(syncGeneration() === 3 && isSyncGenerationReady(), "adopted + ready");
  });

  test("blockSyncGeneration fails closed (local > server / fetch failure)", async () => {
    __resetSyncGenerationForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
    assert(isSyncGenerationReady(), "ready before block");
    blockSyncGeneration();
    assert(!isSyncGenerationReady(), "blocked → not ready");
  });
});
