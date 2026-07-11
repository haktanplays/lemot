/**
 * PR-I1 — cloud-erase sync coordinator (audit C1).
 *
 * Real behavioral tests over the coordinator + an injected in-memory KV: fail
 * closed before hydration / on read failure; a persisted marker (VALUE = delete
 * op id) blocks sync across a "restart" and is reused on retry; the corrected arm
 * order (close admission synchronously → persist op-id marker → drain in-flight
 * writes); persist failure reopens admission unarmed; drain waits/times out; and
 * the erase generation drives the pull apply-boundary staleness check.
 */
import { describe, test, assert } from "./harness";
import { makeFakeKv } from "./helpers";
import {
  LM_CLOUD_ERASE_PENDING_KEY,
  isCloudSyncAdmitted,
  cloudEraseState,
  cloudEraseGeneration,
  isEraseGenerationStale,
  cloudErasePendingOpId,
  cloudErasePendingUserId,
  cloudErasePendingPhase,
  cloudErasePendingServerGeneration,
  advanceCloudErasePhase,
  admitCloudWrite,
  releaseCloudWrite,
  activeCloudWriteCount,
  hydrateCloudEraseGuard,
  armCloudErase,
  finishCloudErase,
  __resetCloudEraseGuardForTest,
  type CloudEraseKv,
} from "../../lib/cloudEraseGuard";

const tick = () => new Promise<void>((r) => setTimeout(r, 0));

const throwingKv: CloudEraseKv = {
  getItem: () => {
    throw new Error("kv read blew up");
  },
  setItem: () => {
    throw new Error("kv write blew up");
  },
  removeItem: () => {},
};

describe("PR-I1 — coordinator fails closed until proven clear", () => {
  test("before hydration, sync is BLOCKED and no write is admitted", () => {
    __resetCloudEraseGuardForTest();
    assert(cloudEraseState() === "unknown", "starts un-hydrated");
    assert(!isCloudSyncAdmitted(), "un-hydrated → not admitted");
    assert(admitCloudWrite() === null, "un-hydrated → no write admitted");
  });

  test("hydrate with no marker → ready; writes admitted; no pending op id", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    assert(cloudEraseState() === "ready", "absent marker hydrates ready");
    assert(cloudErasePendingOpId() === null, "no pending op id when clear");
    const token = admitCloudWrite();
    assert(token !== null, "ready → write admitted");
    releaseCloudWrite(token!);
  });

  test("hydrate with a persisted op-id marker → pending, op id reused (restart)", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv({
      [LM_CLOUD_ERASE_PENDING_KEY]: JSON.stringify({
        version: 2,
        userId: "user-a",
        operationId: "op-xyz",
        phase: "armed",
      }),
    });
    await hydrateCloudEraseGuard(kv);
    assert(cloudEraseState() === "pending", "present marker hydrates pending");
    assert(cloudErasePendingOpId() === "op-xyz", "the op id is loaded for an idempotent retry");
    assert(admitCloudWrite() === null, "interrupted erase keeps sync blocked after restart");
  });

  test("hydrate read failure → pending (fail closed)", async () => {
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(throwingKv);
    assert(cloudEraseState() === "pending", "unreadable guard → fail closed");
    assert(!isCloudSyncAdmitted(), "cannot prove clear → blocked");
  });
});

describe("PR-I1 — corrected arm order + drain", () => {
  test("admission closes SYNCHRONOUSLY at arm start; op id persisted as the marker", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    const armP = armCloudErase({ userId: "user-a", opId: "op-1", store: kv, drainTimeoutMs: 10_000 });
    assert(admitCloudWrite() === null, "no new write can start the instant an erase begins");
    const r = await armP;
    assert(r === "armed", "arm completes armed with no writes in flight");
    assert(kv.map.has(LM_CLOUD_ERASE_PENDING_KEY), "marker persisted");
    assert(cloudErasePendingOpId() === "op-1", "op id is exposed for the RPC");
  });

  test("marker persisted BEFORE the drain; arm waits for in-flight writes", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    const token = admitCloudWrite();
    assert(token !== null && activeCloudWriteCount() === 1, "a write is in flight");
    let armedSeq = 0;
    let seq = 0;
    const armP = armCloudErase({ userId: "user-a", opId: "op-2", store: kv, drainTimeoutMs: 10_000 }).then((r) => {
      armedSeq = ++seq;
      return r;
    });
    await tick();
    assert(kv.map.has(LM_CLOUD_ERASE_PENDING_KEY), "marker persisted before drain settles");
    assert(armedSeq === 0, "arm does NOT resolve while a write is still in flight");
    releaseCloudWrite(token!);
    const r = await armP;
    assert(r === "armed" && armedSeq > 0, "arm resolves armed only after the write drains");
  });

  test("persist failure reopens admission unarmed (nothing persisted)", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    const r = await armCloudErase({ userId: "user-a", opId: "op-3", store: throwingKv, drainTimeoutMs: 10_000 });
    assert(r === "persist_failed", "arm reports persist failure");
    assert(cloudEraseState() === "ready", "admission reopened after persist failure");
    assert(!kv.map.has(LM_CLOUD_ERASE_PENDING_KEY), "no marker written");
    assert(admitCloudWrite() !== null, "writes admitted again after a failed arm");
  });

  test("drain timeout → drain_failed; marker stays set, sync stays blocked", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    const token = admitCloudWrite(); // never released → drain times out
    const r = await armCloudErase({ userId: "user-a", opId: "op-4", store: kv, drainTimeoutMs: 5 });
    assert(r === "drain_failed", "an unsettled write times out the drain");
    assert(cloudErasePendingOpId() === "op-4", "op-id stays set after drain failure");
    assert(!isCloudSyncAdmitted(), "sync stays blocked after drain failure");
    releaseCloudWrite(token!); // cleanup
  });
});

describe("PR-I1 — pending erase phases (durable resume points)", () => {
  test("arm records phase 'armed'; advance persists cloud_deleted + generation, then local_reset_done inherits it", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    await armCloudErase({ userId: "user-a", opId: "op-p1", store: kv, drainTimeoutMs: 10_000 });
    assert(cloudErasePendingPhase() === "armed", "arm starts at phase armed");
    assert(cloudErasePendingServerGeneration() === null, "no server generation before the RPC confirms");

    await advanceCloudErasePhase({ phase: "cloud_deleted", serverGeneration: 6, store: kv });
    assert(cloudErasePendingPhase() === "cloud_deleted", "advanced to cloud_deleted");
    assert(cloudErasePendingServerGeneration() === 6, "confirmed generation recorded");

    await advanceCloudErasePhase({ phase: "local_reset_done", store: kv });
    assert(cloudErasePendingPhase() === "local_reset_done", "advanced to local_reset_done");
    assert(cloudErasePendingServerGeneration() === 6, "generation carried forward");
  });

  test("restart hydration restores the durable phase + generation (resume, not restart)", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    await armCloudErase({ userId: "user-a", opId: "op-p2", store: kv, drainTimeoutMs: 10_000 });
    await advanceCloudErasePhase({ phase: "cloud_deleted", serverGeneration: 3, store: kv });
    await advanceCloudErasePhase({ phase: "local_reset_done", store: kv });

    __resetCloudEraseGuardForTest(); // "app restart"
    await hydrateCloudEraseGuard(kv);
    assert(cloudErasePendingPhase() === "local_reset_done", "phase survives restart");
    assert(cloudErasePendingServerGeneration() === 3, "generation survives restart");
    assert(cloudErasePendingOpId() === "op-p2", "op id survives restart");
    assert(!isCloudSyncAdmitted(), "sync stays blocked until finalization");
  });

  test("advance without a pending erase or without a generation fails (throws)", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    let threw = false;
    try {
      await advanceCloudErasePhase({ phase: "cloud_deleted", serverGeneration: 1, store: kv });
    } catch {
      threw = true;
    }
    assert(threw, "cannot advance a non-existent pending erase");

    await armCloudErase({ userId: "user-a", opId: "op-p3", store: kv, drainTimeoutMs: 10_000 });
    threw = false;
    try {
      await advanceCloudErasePhase({ phase: "cloud_deleted", store: kv }); // no generation
    } catch {
      threw = true;
    }
    assert(threw, "cloud_deleted requires the confirmed server generation");
  });

  test("a past-armed record MISSING its generation is treated as corrupt (fail closed)", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv({
      [LM_CLOUD_ERASE_PENDING_KEY]: JSON.stringify({
        version: 2,
        userId: "user-a",
        operationId: "op-x",
        phase: "local_reset_done", // but no serverGeneration — cannot finalize
      }),
    });
    await hydrateCloudEraseGuard(kv);
    assert(cloudEraseState() === "pending", "still blocks sync");
    assert(cloudErasePendingPhase() === null, "not actionable without a generation");
  });
});

describe("PR-I1 — pending erase is user-bound", () => {
  test("arm records the owning user; hydrate loads it; foreign marker exposes its owner", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    await armCloudErase({ userId: "user-a", opId: "op-1", store: kv, drainTimeoutMs: 10_000 });
    assert(cloudErasePendingUserId() === "user-a", "arm records the owning user");

    // Simulate a restart under a DIFFERENT user: the marker still belongs to A.
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(kv);
    assert(cloudErasePendingUserId() === "user-a", "hydrate loads the owning user id");
    assert(cloudErasePendingOpId() === "op-1", "the same op id is reused (idempotent retry by A)");
    // AppProvider compares this to the current user and refuses to run under B.
  });

  test("a corrupt marker blocks but exposes no owner/op (fail closed, not reinterpreted)", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv({ [LM_CLOUD_ERASE_PENDING_KEY]: "{not-json" });
    await hydrateCloudEraseGuard(kv);
    assert(cloudEraseState() === "pending", "corrupt marker still blocks sync");
    assert(cloudErasePendingOpId() === null && cloudErasePendingUserId() === null, "no actionable op/user");
  });
});

describe("PR-I1 — erase generation + finish", () => {
  test("generation bumps at arm start; a pre-erase capture becomes stale", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    const captured = cloudEraseGeneration();
    assert(!isEraseGenerationStale(captured), "no erase yet → not stale");
    await armCloudErase({ userId: "user-a", opId: "op-5", store: kv, drainTimeoutMs: 10_000 });
    assert(isEraseGenerationStale(captured), "a pull captured before the erase is stale once it begins");
  });

  test("finishCloudErase clears the marker + op id + reopens admission; idempotent", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    await armCloudErase({ userId: "user-a", opId: "op-6", store: kv, drainTimeoutMs: 10_000 });
    await finishCloudErase(kv);
    assert(!kv.map.has(LM_CLOUD_ERASE_PENDING_KEY), "marker removed");
    assert(cloudErasePendingOpId() === null, "op id cleared");
    assert(isCloudSyncAdmitted(), "admission reopened after completion");
    await finishCloudErase(kv); // idempotent
    assert(isCloudSyncAdmitted(), "idempotent clear");
  });
});

describe("PR-I1 — coordinator test-state cleanup", () => {
  test("re-hydrate a clean baseline so later suites see an unblocked gate", async () => {
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(makeFakeKv());
    assert(cloudEraseState() === "ready", "clean-hydrated baseline for subsequent suites");
  });
});
