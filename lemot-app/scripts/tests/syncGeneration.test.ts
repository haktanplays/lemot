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
  syncGenerationUserId,
  isSyncGenerationReady,
  hydrateSyncGeneration,
  setSyncGeneration,
  blockSyncGeneration,
  __resetSyncGenerationForTest,
  type SyncGenerationKv,
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

describe("PR-I1 — stale generation hydrations are discarded (Codex P1)", () => {
  /** A KV whose read resolves/rejects only when the test says so. */
  function deferredKv() {
    let resolveRead!: (v: string | null) => void;
    let rejectRead!: (e: unknown) => void;
    const gate = new Promise<string | null>((res, rej) => {
      resolveRead = res;
      rejectRead = rej;
    });
    let writes = 0;
    const kv: SyncGenerationKv = {
      getItem: () => gate,
      setItem: () => {
        writes += 1;
      },
    };
    return { kv, resolveRead, rejectRead, writes: () => writes };
  }

  test("A stalls → B resolves own → A's own-success lands late: final state is exactly B; B's start closes admission", async () => {
    __resetSyncGenerationForTest();
    await hydrateSyncGeneration({
      userId: "user-a",
      store: makeFakeKv({ [LM_SYNC_GENERATION_KEY]: rec("user-a", 4) }),
    });
    assert(syncGeneration() === 4 && isSyncGenerationReady(), "precondition: A was ready at 4");

    const dA = deferredKv();
    const a = hydrateSyncGeneration({ userId: "user-a", store: dA.kv }); // A re-hydration in flight
    const b = hydrateSyncGeneration({
      userId: "user-b",
      store: makeFakeKv({ [LM_SYNC_GENERATION_KEY]: rec("user-b", 7) }),
    });
    // B's start is SYNCHRONOUSLY fail-closed: no window where B's user id is
    // bound while A's ready generation is still exposed.
    assert(
      syncGenerationUserId() === "user-b" && !isSyncGenerationReady() && syncGeneration() === 0,
      "B's hydration start immediately closes admission and drops A's generation",
    );
    await b;
    assert(syncGeneration() === 7 && isSyncGenerationReady(), "B's own record adopted");

    dA.resolveRead(rec("user-a", 4)); // A's stale own-SUCCESS lands late
    const aResult = await a;
    assert(
      syncGenerationUserId() === "user-b" && syncGeneration() === 7 && isSyncGenerationReady(),
      "final state remains exactly B — stale A success cannot overwrite newer B success",
    );
    assert(aResult.generation === 7 && aResult.ready, "the stale call returns the current authoritative snapshot");
    assert(dA.writes() === 0, "a discarded hydration performs no storage writes");
  });

  test("stale A absence cannot overwrite B's own record; stale foreign/corrupt/rejected results cannot block B's ready state", async () => {
    __resetSyncGenerationForTest();
    const dAbsent = deferredKv(); // would say "absent → baseline ready"
    const pAbsent = hydrateSyncGeneration({ userId: "user-a", store: dAbsent.kv });
    const dForeign = deferredKv(); // would say "foreign → fail closed"
    const pForeign = hydrateSyncGeneration({ userId: "user-a", store: dForeign.kv });
    const dReject = deferredKv(); // would say "read failure → fail closed"
    const pReject = hydrateSyncGeneration({ userId: "user-a", store: dReject.kv });

    await hydrateSyncGeneration({
      userId: "user-b",
      store: makeFakeKv({ [LM_SYNC_GENERATION_KEY]: rec("user-b", 7) }),
    });
    assert(syncGeneration() === 7 && isSyncGenerationReady(), "B ready at 7");

    dAbsent.resolveRead(null);
    dForeign.resolveRead(rec("user-x", 9));
    dReject.rejectRead(new Error("slow read died"));
    await Promise.all([pAbsent, pForeign, pReject]);
    assert(
      syncGenerationUserId() === "user-b" && syncGeneration() === 7 && isSyncGenerationReady(),
      "no stale result — success, foreign, or REJECTION — touched B's state",
    );
  });

  test("same-user acknowledgement during an older hydration is never rolled back", async () => {
    __resetSyncGenerationForTest();
    const d = deferredKv(); // would resolve A's OLD durable record (generation 2)
    const p = hydrateSyncGeneration({ userId: "user-a", store: d.kv });
    await setSyncGeneration({ userId: "user-a", generation: 7, store: makeFakeKv() });
    assert(syncGeneration() === 7 && isSyncGenerationReady(), "newer acknowledgement adopted");
    d.resolveRead(rec("user-a", 2)); // the old read lands late
    await p;
    assert(
      syncGeneration() === 7 && isSyncGenerationReady(),
      "the stale read cannot roll back the durably acknowledged generation",
    );
  });

  test("blockSyncGeneration during an older hydration is never reopened by the stale result", async () => {
    __resetSyncGenerationForTest();
    const d = deferredKv(); // would resolve "absent → ready baseline"
    const p = hydrateSyncGeneration({ userId: "user-a", store: d.kv });
    blockSyncGeneration();
    d.resolveRead(null);
    await p;
    assert(!isSyncGenerationReady(), "the stale result cannot reopen a blocked generation");

    // Leave a clean hydrated baseline for later suites.
    __resetSyncGenerationForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
  });
});

describe("PR-I1 — async acknowledgement vs in-flight hydration (Codex follow-up)", () => {
  /** A KV whose READ resolves only when the test says so. */
  function deferredReadKv() {
    let resolveRead!: (v: string | null) => void;
    const gate = new Promise<string | null>((res) => {
      resolveRead = res;
    });
    const kv: SyncGenerationKv = { getItem: () => gate, setItem: () => {} };
    return { kv, resolveRead };
  }
  /** A KV whose WRITE settles only when the test says so. */
  function deferredWriteKv() {
    let resolveWrite!: () => void;
    let rejectWrite!: (e: unknown) => void;
    const gate = new Promise<void>((res, rej) => {
      resolveWrite = res;
      rejectWrite = rej;
    });
    const kv: SyncGenerationKv = { getItem: () => null, setItem: () => gate };
    return { kv, resolveWrite, rejectWrite };
  }

  test("setSyncGeneration: fail-closed at start; a pre-set read resolving mid-persist is discarded; a mid-persist read cannot overwrite the adopted result", async () => {
    __resetSyncGenerationForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
    assert(isSyncGenerationReady(), "precondition: ready baseline");

    // (1) old hydration H in flight; (2) acknowledgement begins with a
    // deferred durable write.
    const dH = deferredReadKv();
    const h = hydrateSyncGeneration({ userId: "user-a", store: dH.kv });
    const w = deferredWriteKv();
    const setP = setSyncGeneration({ userId: "user-a", generation: 7, store: w.kv });
    // (3) immediately after the set starts: fail closed.
    assert(!isSyncGenerationReady(), "ready dropped synchronously when the acknowledgement began");

    // (4) H resolves BEFORE the durable write completes → (5) discarded.
    dH.resolveRead(rec("user-a", 2));
    await h;
    assert(!isSyncGenerationReady(), "the stale read cannot reopen readiness mid-persist");

    // A hydration started DURING the persist window…
    const dH2 = deferredReadKv();
    const h2 = hydrateSyncGeneration({ userId: "user-a", store: dH2.kv });

    // (6) the durable write resolves → (7) the new generation is adopted.
    w.resolveWrite();
    await setP;
    assert(syncGeneration() === 7 && isSyncGenerationReady(), "adopted + ready after durable persistence");

    // …cannot overwrite the successfully adopted generation afterwards.
    dH2.resolveRead(rec("user-a", 2));
    await h2;
    assert(
      syncGeneration() === 7 && isSyncGenerationReady(),
      "a mid-persist hydration cannot overwrite the adopted generation",
    );
  });

  test("setSyncGeneration REJECTION: not adopted, stays blocked; an older read resolving after the rejection cannot reopen", async () => {
    __resetSyncGenerationForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
    const dH = deferredReadKv(); // would resolve "absent → ready baseline"
    const h = hydrateSyncGeneration({ userId: "user-a", store: dH.kv });
    const w = deferredWriteKv();
    const setP = setSyncGeneration({ userId: "user-a", generation: 7, store: w.kv });
    w.rejectWrite(new Error("persist failed"));
    let threw = false;
    try {
      await setP;
    } catch {
      threw = true;
    }
    assert(threw, "a persistence failure still throws");
    assert(!isSyncGenerationReady() && syncGeneration() === 0, "the requested generation was NOT adopted; stays blocked");

    dH.resolveRead(null); // the older read lands after the rejection
    await h;
    assert(!isSyncGenerationReady(), "the stale read cannot reopen readiness after the failed acknowledgement");

    // Leave a clean hydrated baseline for later suites.
    __resetSyncGenerationForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
  });
});

describe("PR-I1 — failure-side invalidation of the acknowledgement window (Codex follow-up)", () => {
  test("a hydration STARTED DURING a failing acknowledgement is discarded by the failure-side bump", async () => {
    __resetSyncGenerationForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
    assert(isSyncGenerationReady(), "precondition: ready baseline");

    // The acknowledgement starts (start-side bump) and stalls in setItem…
    let rejectWrite!: (e: unknown) => void;
    const writeGate = new Promise<void>((res, rej) => {
      rejectWrite = rej;
    });
    const w: SyncGenerationKv = { getItem: () => null, setItem: () => writeGate };
    const setP = setSyncGeneration({ userId: "user-a", generation: 7, store: w });

    // …then a hydration starts AFTER the start-side bump, DURING the window.
    let resolveRead!: (v: string | null) => void;
    const readGate = new Promise<string | null>((res) => {
      resolveRead = res;
    });
    let staleWrites = 0;
    const h = hydrateSyncGeneration({
      userId: "user-a",
      store: {
        getItem: () => readGate,
        setItem: () => {
          staleWrites += 1;
        },
      },
    });

    rejectWrite(new Error("persist failed"));
    let threw = false;
    try {
      await setP;
    } catch {
      threw = true;
    }
    assert(threw, "the acknowledgement failure still throws");

    // The mid-window read resolves with an OWN record that would normally
    // become ready — the failure-side bump discards it.
    resolveRead(rec("user-a", 4));
    await h;
    assert(!isSyncGenerationReady(), "ready remains false after the failed acknowledgement");
    assert(syncGeneration() === 0, "neither the requested 7 nor the stale durable 4 was adopted");
    assert(staleWrites === 0, "no storage write happened beyond the failed set attempt");

    // Leave a clean hydrated baseline for later suites.
    __resetSyncGenerationForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
  });
});
