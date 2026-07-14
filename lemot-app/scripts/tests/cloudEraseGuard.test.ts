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

describe("PR-I1 — arm never replaces another operation's marker", () => {
  test("operation B cannot replace operation A's pending marker (conflict, marker intact)", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    await armCloudErase({ userId: "user-a", opId: "op-A", store: kv, drainTimeoutMs: 10_000 });

    const asB = await armCloudErase({ userId: "user-b", opId: "op-B", store: kv, drainTimeoutMs: 10_000 });
    assert(asB === "conflict", "a different user's arm is refused");
    const otherOp = await armCloudErase({ userId: "user-a", opId: "op-C", store: kv, drainTimeoutMs: 10_000 });
    assert(otherOp === "conflict", "a different operation id is refused even for the same user");
    assert(cloudErasePendingOpId() === "op-A", "operation A's marker is untouched");
    assert(cloudErasePendingUserId() === "user-a", "operation A's owner is untouched");
  });

  test("arm while another arm is mid-persist → busy (no marker write)", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    let releasePersist!: () => void;
    const gatedStore: CloudEraseKv = {
      getItem: (k) => kv.getItem(k),
      setItem: async (k, v) => {
        await new Promise<void>((r) => {
          releasePersist = r;
        });
        kv.setItem(k, v);
      },
      removeItem: (k) => kv.removeItem(k),
    };
    const armA = armCloudErase({ userId: "user-a", opId: "op-A", store: gatedStore, drainTimeoutMs: 10_000 });
    const armB = await armCloudErase({ userId: "user-a", opId: "op-B", store: kv, drainTimeoutMs: 10_000 });
    assert(armB === "busy", "an arm during another's persist window is refused");
    assert(!kv.map.has(LM_CLOUD_ERASE_PENDING_KEY), "the busy arm wrote nothing");
    releasePersist();
    assert((await armA) === "armed", "the original arm completes normally");
    assert(cloudErasePendingOpId() === "op-A", "only operation A's marker exists");
  });

  test("re-arm cannot REGRESS an advanced phase; same-op restart retry at `armed` remains supported", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    await armCloudErase({ userId: "user-a", opId: "op-A", store: kv, drainTimeoutMs: 10_000 });

    // Same-op retry at phase `armed` is the supported path.
    const retry = await armCloudErase({ userId: "user-a", opId: "op-A", store: kv, drainTimeoutMs: 10_000 });
    assert(retry === "armed", "same owned operation may re-arm while still at phase armed");

    // After the phase advanced, even the SAME op must not re-arm (would regress).
    await advanceCloudErasePhase({ phase: "cloud_deleted", serverGeneration: 3, store: kv });
    const regress = await armCloudErase({ userId: "user-a", opId: "op-A", store: kv, drainTimeoutMs: 10_000 });
    assert(regress === "conflict", "re-arming an advanced operation is refused");
    assert(cloudErasePendingPhase() === "cloud_deleted", "the durable phase is not regressed");
  });

  test("a retry-arm persist failure keeps the PENDING state (marker still on disk)", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    await armCloudErase({ userId: "user-a", opId: "op-A", store: kv, drainTimeoutMs: 10_000 });
    const failing: CloudEraseKv = {
      getItem: (k) => kv.getItem(k),
      setItem: () => {
        throw new Error("persist failed");
      },
      removeItem: (k) => kv.removeItem(k),
    };
    const r = await armCloudErase({ userId: "user-a", opId: "op-A", store: failing, drainTimeoutMs: 10_000 });
    assert(r === "persist_failed", "retry-arm persist failure reported");
    assert(cloudEraseState() === "pending", "admission stays CLOSED — the durable marker is still on disk");
    assert(kv.map.has(LM_CLOUD_ERASE_PENDING_KEY), "operation A's marker survives");
  });
});

describe("PR-I1 — phase advance / finish are operation-identity protected", () => {
  test("a stale task cannot advance another operation's phase", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    await armCloudErase({ userId: "user-a", opId: "op-A", store: kv, drainTimeoutMs: 10_000 });

    for (const expected of [
      { expectedUserId: "user-b", expectedOperationId: "op-A" }, // wrong user
      { expectedUserId: "user-a", expectedOperationId: "op-STALE" }, // wrong op
    ]) {
      let threw = false;
      try {
        await advanceCloudErasePhase({ phase: "cloud_deleted", serverGeneration: 9, store: kv, ...expected });
      } catch {
        threw = true;
      }
      assert(threw, "mismatched identity is refused");
    }
    assert(cloudErasePendingPhase() === "armed", "the phase was not advanced by the stale task");

    // The owning operation advances normally with its identity attached.
    await advanceCloudErasePhase({
      phase: "cloud_deleted",
      serverGeneration: 2,
      expectedUserId: "user-a",
      expectedOperationId: "op-A",
      store: kv,
    });
    assert(cloudErasePendingPhase() === "cloud_deleted", "the owner's advance succeeds");
  });

  test("a stale task cannot clear another operation's marker", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    await armCloudErase({ userId: "user-a", opId: "op-A", store: kv, drainTimeoutMs: 10_000 });

    let threw = false;
    try {
      await finishCloudErase(kv, { userId: "user-a", operationId: "op-STALE" });
    } catch {
      threw = true;
    }
    assert(threw, "a mismatched finish is refused");
    assert(kv.map.has(LM_CLOUD_ERASE_PENDING_KEY), "operation A's marker survives the stale finish");
    assert(!isCloudSyncAdmitted(), "admission stays closed");

    await finishCloudErase(kv, { userId: "user-a", operationId: "op-A" });
    assert(!kv.map.has(LM_CLOUD_ERASE_PENDING_KEY), "the owning operation clears its own marker");
    assert(isCloudSyncAdmitted(), "admission reopens after the legitimate finish");
  });
});

describe("PR-I1 — stale hydrations never overwrite live coordinator state (Codex P1)", () => {
  const marker = (userId: string, operationId: string) =>
    JSON.stringify({ version: 2, userId, operationId, phase: "armed" });

  /** A KV whose read resolves/rejects only when the test says so. */
  function deferredReadKv() {
    let resolveRead!: (v: string | null) => void;
    let rejectRead!: (e: unknown) => void;
    const gate = new Promise<string | null>((res, rej) => {
      resolveRead = res;
      rejectRead = rej;
    });
    let writes = 0;
    let removes = 0;
    const kv: CloudEraseKv = {
      getItem: () => gate,
      setItem: () => {
        writes += 1;
      },
      removeItem: () => {
        removes += 1;
      },
    };
    return { kv, resolveRead, rejectRead, writes: () => writes, removes: () => removes };
  }

  test("1+7. empty read in flight → arm reaches pending → stale result is discarded (no state change, no storage write)", async () => {
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(makeFakeKv()); // baseline ready
    const d = deferredReadKv();
    const stale = hydrateCloudEraseGuard(d.kv); // read in flight (would say "empty")
    const armKv = makeFakeKv();
    const arm = await armCloudErase({
      opId: "op-A",
      userId: "user-a",
      store: armKv,
      drainTimeoutMs: 50,
    });
    assert(arm === "armed", "the erase armed while the old read was in flight");
    d.resolveRead(null); // the stale "clean" result lands AFTER pending
    const returned = await stale;
    assert(returned === "pending", "a discarded hydration returns the CURRENT live state");
    assert(cloudEraseState() === "pending" && !isCloudSyncAdmitted(), "admission stays CLOSED mid-erase");
    assert(
      cloudErasePendingOpId() === "op-A" &&
        cloudErasePendingUserId() === "user-a" &&
        cloudErasePendingPhase() === "armed",
      "pending identity (owner / op / phase) is intact",
    );
    assert(d.writes() === 0 && d.removes() === 0, "discarding performed no storage write or delete");

    // 2. old-marker read in flight → finish completes → stale marker is NOT resurrected.
    const d2 = deferredReadKv();
    const stale2 = hydrateCloudEraseGuard(d2.kv);
    await finishCloudErase(armKv, { userId: "user-a", operationId: "op-A" });
    d2.resolveRead(marker("user-a", "op-A")); // the finished marker's content lands late
    assert((await stale2) === "ready", "stale hydration reports the live (finished) state");
    assert(
      cloudEraseState() === "ready" && cloudErasePendingOpId() === null,
      "the finished marker is NOT resurrected in memory",
    );
  });

  test("3. an older hydration cannot overwrite a newer authoritative hydration", async () => {
    __resetCloudEraseGuardForTest();
    const dA = deferredReadKv();
    const a = hydrateCloudEraseGuard(dA.kv); // attempt A in flight
    const b = await hydrateCloudEraseGuard(
      makeFakeKv({ [LM_CLOUD_ERASE_PENDING_KEY]: marker("user-a", "op-B") }),
    ); // attempt B (newer) applies authoritatively
    assert(b === "pending", "B applied the valid marker");
    dA.resolveRead(null); // A's stale empty result lands afterwards
    assert((await a) === "pending", "A resolves to the authoritative state");
    assert(
      cloudEraseState() === "pending" && cloudErasePendingOpId() === "op-B",
      "A did not overwrite B's result",
    );
  });

  test("4. a stale REJECTED read cannot turn newer ready state into fail-closed", async () => {
    __resetCloudEraseGuardForTest();
    const dR = deferredReadKv();
    const r = hydrateCloudEraseGuard(dR.kv); // will reject late
    await hydrateCloudEraseGuard(makeFakeKv()); // newer clean hydration → ready
    dR.rejectRead(new Error("slow storage died"));
    assert((await r) === "ready", "the stale rejection is discarded, not applied");
    assert(cloudEraseState() === "ready" && isCloudSyncAdmitted(), "ready state survives the stale failure");
  });

  test("5+6. normal hydrations still work: clean → ready; valid marker → pending", async () => {
    __resetCloudEraseGuardForTest();
    assert((await hydrateCloudEraseGuard(makeFakeKv())) === "ready", "clean hydration reaches ready");
    __resetCloudEraseGuardForTest();
    assert(
      (await hydrateCloudEraseGuard(
        makeFakeKv({ [LM_CLOUD_ERASE_PENDING_KEY]: marker("user-a", "op-C") }),
      )) === "pending",
      "valid-marker hydration reaches pending",
    );
    assert(cloudErasePendingOpId() === "op-C", "marker identity loaded normally");
  });
});

describe("PR-I1 — coordinator test-state cleanup", () => {
  test("re-hydrate a clean baseline so later suites see an unblocked gate", async () => {
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(makeFakeKv());
    assert(cloudEraseState() === "ready", "clean-hydrated baseline for subsequent suites");
  });
});
