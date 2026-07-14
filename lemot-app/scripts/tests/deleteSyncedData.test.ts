/**
 * PR-I1 — phase-aware "delete synced learning data" orchestration + in-flight
 * race safety (audit C1).
 *
 * Real async behavioral tests over the REAL coordinator (in-memory KV), with
 * deferred promises modeling in-flight cloud writes. Proves:
 *  - the happy-path order: arm → RPC → record cloud_deleted(+generation) →
 *    reset → record local_reset_done → acknowledge → finish;
 *  - resume semantics: `cloud_deleted` skips arm + RPC; `local_reset_done` NEVER
 *    invokes `resetLocal` again and preserves post-reset state;
 *  - restart hydration resumes from the durable phase (not the full sequence);
 *  - every failure keeps the marker at the last durable phase, retry converges;
 *  - the delete RPC never runs while a pre-existing cloud write is in flight.
 */
import { describe, test, assert } from "./harness";
import { makeFakeKv } from "./helpers";
import {
  runDeleteSyncedData,
  type DeleteSyncedDeps,
} from "../../lib/deleteSyncedData";
import {
  LM_CLOUD_ERASE_PENDING_KEY,
  isCloudSyncAdmitted,
  cloudEraseState,
  cloudEraseGeneration,
  isEraseGenerationStale,
  cloudErasePendingOpId,
  cloudErasePendingPhase,
  cloudErasePendingServerGeneration,
  admitCloudWrite,
  releaseCloudWrite,
  hydrateCloudEraseGuard,
  armCloudErase,
  advanceCloudErasePhase,
  finishCloudErase,
  __resetCloudEraseGuardForTest,
  type CloudEraseKv,
  type PendingErasePhase,
} from "../../lib/cloudEraseGuard";
import {
  hydrateSyncGeneration,
  setSyncGeneration,
  syncGeneration,
  isSyncGenerationReady,
  blockSyncGeneration,
  __resetSyncGenerationForTest,
} from "../../lib/syncGeneration";
import {
  isRemoteErasePending,
  persistRemoteEraseRecovery,
  hydrateRemoteEraseRecovery,
  __resetRemoteEraseRecoveryForTest,
} from "../../lib/remoteEraseRecovery";

const tick = () => new Promise<void>((r) => setTimeout(r, 0));
function val<T>(x: T): T {
  return x;
}
function deferred<T>() {
  let resolve!: (v: T | PromiseLike<T>) => void;
  let reject!: (e?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

/** Resume point straight from the REAL hydrated guard (as AppProvider builds it). */
function resumeFromGuard(): { phase: PendingErasePhase; serverGeneration?: number } | null {
  const phase = cloudErasePendingPhase();
  return phase
    ? { phase, serverGeneration: cloudErasePendingServerGeneration() ?? undefined }
    : null;
}

/** Live-coordinator deps over `kv`, with injectable cloud/local/ack spies. */
function deps(
  kv: ReturnType<typeof makeFakeKv>,
  opId: string,
  over: Partial<DeleteSyncedDeps> = {},
  drainTimeoutMs = 10_000,
): DeleteSyncedDeps {
  return {
    resume: resumeFromGuard(),
    armErase: () => armCloudErase({ userId: "user-a", opId, store: kv, drainTimeoutMs }),
    deleteCloud: async () => ({ ok: true, generation: 1 }),
    markCloudDeleted: (gen) =>
      advanceCloudErasePhase({ phase: "cloud_deleted", serverGeneration: gen, store: kv }),
    resetLocal: async () => {},
    markLocalResetDone: () =>
      advanceCloudErasePhase({ phase: "local_reset_done", store: kv }),
    acknowledgeGeneration: async () => {},
    finishErase: () => finishCloudErase(kv),
    ...over,
  };
}

describe("PR-I1 — phase-aware state machine (real coordinator)", () => {
  test("full success order: arm → RPC → cloud_deleted → reset → local_reset_done → ack → finish", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    const order: string[] = [];
    const status = await runDeleteSyncedData(
      deps(kv, "op-1", {
        deleteCloud: async () => {
          order.push("rpc");
          assert(cloudErasePendingPhase() === "armed", "RPC runs at phase armed");
          return { ok: true, generation: 7 };
        },
        markCloudDeleted: async (gen) => {
          order.push("markCloud");
          await advanceCloudErasePhase({ phase: "cloud_deleted", serverGeneration: gen, store: kv });
        },
        resetLocal: async () => {
          order.push("reset");
          assert(cloudErasePendingPhase() === "cloud_deleted", "reset runs only after cloud_deleted is durable");
        },
        markLocalResetDone: async () => {
          order.push("markReset");
          await advanceCloudErasePhase({ phase: "local_reset_done", store: kv });
        },
        acknowledgeGeneration: async (gen) => {
          order.push(`ack:${gen}`);
          assert(cloudErasePendingPhase() === "local_reset_done", "ack runs after local_reset_done is durable");
        },
      }),
    );
    assert(status === "success", "full success");
    assert(
      order.join(",") === "rpc,markCloud,reset,markReset,ack:7",
      `strict phase order (got ${order.join(",")})`,
    );
    assert(!kv.map.has(LM_CLOUD_ERASE_PENDING_KEY), "marker cleared only at the very end");
    assert(isCloudSyncAdmitted(), "sync re-opens after full success");
  });

  test("ambiguous RPC (ok but no generation) → cloud_failed; marker stays armed", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    const status = await runDeleteSyncedData(
      deps(kv, "op-1", { deleteCloud: async () => ({ ok: true }) }),
    );
    assert(status === "cloud_failed", "no generation → ambiguous → retryable failure");
    assert(cloudErasePendingPhase() === "armed", "durable phase stays armed");
  });

  test("markCloudDeleted persist failure → cloud_failed; retry replays the SAME op id", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    const rpcOps: string[] = [];
    const first = await runDeleteSyncedData(
      deps(kv, "op-1", {
        deleteCloud: async () => {
          rpcOps.push("op-1");
          return { ok: true, generation: 2 };
        },
        markCloudDeleted: async () => {
          throw new Error("phase persist failed");
        },
      }),
    );
    assert(first === "cloud_failed", "phase-persist failure aborts before any local reset");
    assert(cloudErasePendingPhase() === "armed", "phase still armed (durable)");
    // Retry: same durable op id → the server op-log replay is idempotent.
    const retryOpId = cloudErasePendingOpId();
    assert(retryOpId === "op-1", "retry reuses the same op id");
    const second = await runDeleteSyncedData(
      deps(kv, retryOpId!, {
        deleteCloud: async () => {
          rpcOps.push(retryOpId!);
          return { ok: true, generation: 2 };
        },
      }),
    );
    assert(second === "success", "retry converges");
    assert(rpcOps.every((o) => o === "op-1"), "never a NEW operation id");
  });

  test("resume from cloud_deleted: arm + RPC are SKIPPED; reset runs", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    await armCloudErase({ userId: "user-a", opId: "op-1", store: kv, drainTimeoutMs: 10_000 });
    await advanceCloudErasePhase({ phase: "cloud_deleted", serverGeneration: 4, store: kv });

    let armCalls = 0;
    let rpcCalls = 0;
    let resetCalls = 0;
    let acked = -1;
    const status = await runDeleteSyncedData(
      deps(kv, "op-1", {
        armErase: async () => {
          armCalls += 1;
          return "armed";
        },
        deleteCloud: async () => {
          rpcCalls += 1;
          return { ok: true, generation: 99 };
        },
        resetLocal: async () => {
          resetCalls += 1;
        },
        acknowledgeGeneration: async (gen) => {
          acked = gen;
        },
      }),
    );
    assert(status === "success", "resume completes");
    assert(val(armCalls) === 0 && val(rpcCalls) === 0, "cloud deletion already confirmed → arm + RPC skipped");
    assert(val(resetCalls) === 1, "local reset runs once");
    assert(acked === 4, "the RECORDED confirmed generation is acknowledged, not a fresh RPC's");
  });

  test("resume from local_reset_done NEVER invokes resetLocal; post-reset state is preserved", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    await armCloudErase({ userId: "user-a", opId: "op-1", store: kv, drainTimeoutMs: 10_000 });
    await advanceCloudErasePhase({ phase: "cloud_deleted", serverGeneration: 5, store: kv });
    await advanceCloudErasePhase({ phase: "local_reset_done", store: kv });

    // Any state that legitimately exists after the completed reset must survive
    // a finalization retry — resetLocal would destroy it if wrongly re-invoked.
    const postResetState = { intact: true };
    let acked = -1;
    const status = await runDeleteSyncedData(
      deps(kv, "op-1", {
        armErase: async () => {
          throw new Error("must not re-arm");
        },
        deleteCloud: async () => {
          throw new Error("must not re-RPC");
        },
        resetLocal: async () => {
          postResetState.intact = false; // would be destruction — must never run
        },
        acknowledgeGeneration: async (gen) => {
          acked = gen;
        },
      }),
    );
    assert(status === "success", "finalization-only retry succeeds");
    assert(postResetState.intact, "resetLocal was NEVER invoked from local_reset_done");
    assert(acked === 5, "recorded generation acknowledged");
    assert(!kv.map.has(LM_CLOUD_ERASE_PENDING_KEY), "marker cleared after acknowledgement");
  });

  test("RESTART: hydrate the durable marker, resume finalization only (no reset, no RPC)", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv({
      [LM_CLOUD_ERASE_PENDING_KEY]: JSON.stringify({
        version: 2,
        userId: "user-a",
        operationId: "op-r",
        phase: "local_reset_done",
        serverGeneration: 9,
      }),
    });
    await hydrateCloudEraseGuard(kv); // the app restarts mid-finalization
    assert(cloudEraseState() === "pending", "sync blocked on restart");
    let resetCalls = 0;
    let rpcCalls = 0;
    let acked = -1;
    const status = await runDeleteSyncedData(
      deps(kv, cloudErasePendingOpId()!, {
        deleteCloud: async () => {
          rpcCalls += 1;
          return { ok: true, generation: 9 };
        },
        resetLocal: async () => {
          resetCalls += 1;
        },
        acknowledgeGeneration: async (gen) => {
          acked = gen;
        },
      }),
    );
    assert(status === "success", "restart resume completes");
    assert(val(resetCalls) === 0 && val(rpcCalls) === 0, "no destructive step re-runs after restart");
    assert(acked === 9, "durable generation acknowledged");
    assert(isCloudSyncAdmitted(), "sync reopens only after finalization");
  });

  test("cloud ok + local RESET fails → local_reset_failed; phase stays cloud_deleted; retry resets", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    let attempt = 0;
    const flaky = async () => {
      attempt += 1;
      if (attempt === 1) throw new Error("local kv failure");
    };
    const first = await runDeleteSyncedData(
      deps(kv, "op-1", {
        deleteCloud: async () => ({ ok: true, generation: 2 }),
        resetLocal: flaky,
      }),
    );
    assert(first === "local_reset_failed", "device data NOT cleared → local_reset_failed");
    assert(cloudErasePendingPhase() === "cloud_deleted", "durable phase records the confirmed cloud delete");

    const second = await runDeleteSyncedData(
      deps(kv, "op-1", {
        deleteCloud: async () => {
          throw new Error("must not re-RPC from cloud_deleted");
        },
        resetLocal: flaky,
      }),
    );
    assert(second === "success", "retry resumes at the reset and completes");
  });

  test("ack failure → guard_finalize_failed; phase local_reset_done retained for the retry", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    const first = await runDeleteSyncedData(
      deps(kv, "op-1", {
        deleteCloud: async () => ({ ok: true, generation: 3 }),
        acknowledgeGeneration: async () => {
          throw new Error("generation persist failed");
        },
      }),
    );
    assert(first === "guard_finalize_failed", "ack failure → guard_finalize_failed");
    assert(cloudErasePendingPhase() === "local_reset_done", "phase durably past the reset");
    assert(!isCloudSyncAdmitted(), "sync stays blocked until finalization");

    let resetCalls = 0;
    const second = await runDeleteSyncedData(
      deps(kv, "op-1", {
        resetLocal: async () => {
          resetCalls += 1;
        },
      }),
    );
    assert(second === "success", "finalization retry completes");
    assert(val(resetCalls) === 0, "the retry never resets again");
  });

  test("arm persist failure → abort BEFORE the RPC; admission reopens", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    const throwingSet: CloudEraseKv = {
      getItem: (k) => kv.getItem(k),
      setItem: () => {
        throw new Error("cannot persist marker");
      },
      removeItem: (k) => kv.removeItem(k),
    };
    let cloudCalls = 0;
    const status = await runDeleteSyncedData(
      deps(kv, "op-1", {
        armErase: () =>
          armCloudErase({ userId: "user-a", opId: "op-1", store: throwingSet, drainTimeoutMs: 10_000 }),
        deleteCloud: async () => {
          cloudCalls += 1;
          return { ok: true, generation: 1 };
        },
      }),
    );
    assert(status === "cloud_failed", "unarmed guard → cloud_failed");
    assert(val(cloudCalls) === 0, "the delete RPC never runs if the marker could not be persisted");
    assert(isCloudSyncAdmitted(), "admission reopened after a failed arm");
  });
});

describe("PR-I1 — in-flight cloud write cannot recreate deleted rows", () => {
  test("in-flight push: RPC waits for it to settle before deleting", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    const token = admitCloudWrite();
    assert(token !== null, "push admitted while ready");
    const net = deferred<void>();
    void net.promise.then(() => releaseCloudWrite(token!));

    let rpcAt = 0;
    let seq = 0;
    const runP = runDeleteSyncedData(
      deps(kv, "op-1", {
        deleteCloud: async () => {
          rpcAt = ++seq;
          return { ok: true, generation: 1 };
        },
      }),
    );
    await tick();
    assert(admitCloudWrite() === null, "no NEW push can start once the erase begins");
    assert(rpcAt === 0, "delete RPC NOT called while the pre-existing push is in flight");

    net.resolve();
    const status = await runP;
    assert(status === "success", "operation succeeds");
    assert(rpcAt > 0, "delete RPC ran ONLY after the in-flight push settled");
  });

  test("drain timeout → cloud_failed; RPC not invoked; retry converges after the write settles", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    const token = admitCloudWrite(); // never settles → drain times out
    let rpcCalls = 0;
    const status = await runDeleteSyncedData(
      deps(
        kv,
        "op-1",
        {
          deleteCloud: async () => {
            rpcCalls += 1;
            return { ok: true, generation: 1 };
          },
        },
        5,
      ),
    );
    assert(status === "cloud_failed", "drain failure → retryable cloud failure");
    assert(val(rpcCalls) === 0, "RPC not invoked while a write hasn't drained");
    assert(!isCloudSyncAdmitted(), "sync stays blocked");

    releaseCloudWrite(token!);
    const retry = await runDeleteSyncedData(
      deps(kv, cloudErasePendingOpId()!, {
        deleteCloud: async () => {
          rpcCalls += 1;
          return { ok: true, generation: 1 };
        },
      }),
    );
    assert(retry === "success", "retry completes once the write has drained");
    assert(val(rpcCalls) === 1, "RPC ran exactly once, on the successful retry");
  });
});

describe("PR-I1 — in-flight pull is discarded at the apply boundary", () => {
  test("a pull captured before the erase does not merge / updateStoredData / push", async () => {
    __resetCloudEraseGuardForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);

    const capturedGen = cloudEraseGeneration();
    await armCloudErase({ userId: "user-a", opId: "op-1", store: kv, drainTimeoutMs: 10_000 });

    const applied: number[] = [];
    const len = (a: unknown[]): number => a.length;
    const applyPullResult = (gen: number) => {
      if (isEraseGenerationStale(gen)) return;
      applied.push(1);
    };
    applyPullResult(capturedGen);
    assert(len(applied) === 0, "a pull that started before the erase is discarded (no merge/update/push)");

    await finishCloudErase(kv);
    applyPullResult(cloudEraseGeneration());
    assert(len(applied) === 1, "a pull with no erase in flight applies normally");
  });
});

describe("PR-I1 — Codex P2: REMOTE erase state is re-checked at the apply boundary", () => {
  /**
   * A remotely discovered erase can land while `pullFromCloud()` is in flight
   * (a stale-generation write rejection blocks the generation and persists a
   * recovery marker) WITHOUT touching the local erase generation or the reset
   * epoch. The apply boundary must therefore re-check the authoritative remote
   * state AFTER the await, before any merge/updateStoredData/push. This mirrors
   * the effect's post-pull guard order (the wiring test pins the real source),
   * driven by REAL module state over a deterministic deferred pull — no sleeps.
   */
  type Deferred<T> = { promise: Promise<T>; resolve: (v: T) => void };
  function deferred<T>(): Deferred<T> {
    let resolve!: (v: T) => void;
    const promise = new Promise<T>((r) => {
      resolve = r;
    });
    return { promise, resolve };
  }

  async function freshReadyBaseline(): Promise<void> {
    __resetSyncGenerationForTest();
    __resetRemoteEraseRecoveryForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
  }

  // The post-pull apply boundary (same order as AppProvider): remote re-check
  // runs after the await and before the !cloud / merge / push path.
  async function runPullApply(pull: Promise<{ v: number } | null>) {
    const effects = { applied: 0, pushed: 0 };
    const cloud = await pull;
    if (!isSyncGenerationReady() || isRemoteErasePending()) {
      return { outcome: "discarded" as const, effects };
    }
    if (!cloud) return { outcome: "no-cloud" as const, effects };
    effects.applied += 1; // updateStoredData(merge)
    effects.pushed += 1; // pushToCloud(merged)
    return { outcome: "applied" as const, effects };
  }

  test("generation becomes NOT ready mid-flight → pull discarded (no merge/update/push)", async () => {
    await freshReadyBaseline();
    const pull = deferred<{ v: number } | null>();
    const run = runPullApply(pull.promise);
    blockSyncGeneration(); // e.g. handleGenerationMismatch on a stale write rejection
    pull.resolve({ v: 1 }); // stale pre-deletion cloud row arrives afterwards
    const r = await run;
    assert(r.outcome === "discarded", "stale pull must be discarded once the generation is blocked");
    assert(r.effects.applied === 0 && r.effects.pushed === 0, "no merge, no updateStoredData, no push");
  });

  test("remote-erase recovery becomes PENDING mid-flight → pull discarded", async () => {
    await freshReadyBaseline();
    const store = makeFakeKv();
    await hydrateRemoteEraseRecovery({ userId: "user-a", store });
    const pull = deferred<{ v: number } | null>();
    const run = runPullApply(pull.promise);
    await persistRemoteEraseRecovery({ userId: "user-a", targetGeneration: 2, store });
    pull.resolve({ v: 1 });
    const r = await run;
    assert(isRemoteErasePending(), "precondition: recovery became pending mid-flight");
    assert(r.outcome === "discarded", "a pull racing a pending recovery must be discarded");
    assert(r.effects.applied === 0 && r.effects.pushed === 0, "no stale application side effect");
  });

  test("unchanged ready / no-pending state → the pull applies exactly once", async () => {
    await freshReadyBaseline();
    const pull = deferred<{ v: number } | null>();
    const run = runPullApply(pull.promise);
    pull.resolve({ v: 1 });
    const r = await run;
    assert(r.outcome === "applied", "normal pull application still proceeds");
    assert(r.effects.applied === 1 && r.effects.pushed === 1, "applied exactly once");
    await freshReadyBaseline(); // leave a clean baseline for later suites
  });
});

describe("PR-I1 — Codex P1 (round 4): server generation is REVALIDATED before applying pulls", () => {
  /**
   * A deletion completed on ANOTHER device while `pullFromCloud()` read an old
   * MVCC snapshot leaves every LOCAL mirror untouched (ready stays true, no
   * recovery pending, no erase-generation/reset-epoch movement) — so the P2
   * local re-check alone cannot see it. The boundary must therefore re-read
   * the AUTHORITATIVE server generation after the pull resolves and require
   * it to still equal the locally acknowledged one before anything applies.
   * Mirrors the effect's post-pull order (the wiring test pins the source);
   * deterministic deferred pull + stateful fake server — no sleeps.
   */
  type Deferred<T> = { promise: Promise<T>; resolve: (v: T) => void };
  function deferred<T>(): Deferred<T> {
    let resolve!: (v: T) => void;
    const promise = new Promise<T>((r) => {
      resolve = r;
    });
    return { promise, resolve };
  }

  async function readyAt(generation: number): Promise<void> {
    __resetSyncGenerationForTest();
    __resetRemoteEraseRecoveryForTest();
    const store = makeFakeKv();
    await hydrateSyncGeneration({ userId: "user-a", store });
    if (generation > 0) await setSyncGeneration({ userId: "user-a", generation, store });
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
  }

  // Post-pull boundary, effect order: local P2 re-check FIRST (no server fetch
  // when a local signal already blocks), THEN the authoritative revalidation.
  async function runPullApply(args: {
    pull: Promise<{ v: number } | null>;
    fetchServerGeneration: () => Promise<number | null>;
  }) {
    const effects = { applied: 0, pushed: 0, fetches: 0 };
    const cloud = await args.pull;
    if (!isSyncGenerationReady() || isRemoteErasePending()) {
      return { outcome: "discarded-local" as const, effects };
    }
    let serverNow: number | null;
    try {
      effects.fetches += 1;
      serverNow = await args.fetchServerGeneration();
    } catch {
      serverNow = null;
    }
    if (serverNow === null || serverNow !== syncGeneration()) {
      return { outcome: "discarded-stale" as const, effects };
    }
    if (!cloud) return { outcome: "no-cloud" as const, effects };
    effects.applied += 1; // merge + updateStoredData
    effects.pushed += 1; // follow-up push
    return { outcome: "applied" as const, effects };
  }

  test("another device deletes mid-pull (g→g+1) → stale snapshot discarded, nothing applied", async () => {
    await readyAt(2);
    const server = { current: 2 };
    const pull = deferred<{ v: number } | null>();
    const run = runPullApply({
      pull: pull.promise,
      fetchServerGeneration: async () => server.current,
    });
    server.current = 3; // remote delete bumps the server while the pull is in flight
    pull.resolve({ v: 1 }); // …and the pull returns a pre-delete MVCC snapshot
    const r = await run;
    assert(r.outcome === "discarded-stale", "revalidation must reject the stale snapshot");
    assert(r.effects.fetches === 1, "the server generation is re-read AFTER the pull");
    assert(r.effects.applied === 0 && r.effects.pushed === 0, "no merge, no updateStoredData, no push");
  });

  test("EMPTY device + mid-pull delete → stale cloud data is NOT silently adopted (gen 0 case)", async () => {
    await readyAt(0); // fresh baseline: merged === cloud would produce NO push to wake recovery
    const server = { current: 0 };
    const pull = deferred<{ v: number } | null>();
    const run = runPullApply({
      pull: pull.promise,
      fetchServerGeneration: async () => server.current,
    });
    server.current = 1;
    pull.resolve({ v: 42 });
    const r = await run;
    assert(r.outcome === "discarded-stale", "the silent-adoption path is closed on an empty device");
    assert(r.effects.applied === 0, "stale pre-delete rows never reach local storage");
  });

  test("server generation unchanged → normal apply proceeds exactly once (valid gen 0 too)", async () => {
    await readyAt(0);
    const r0 = await runPullApply({
      pull: Promise.resolve({ v: 1 }),
      fetchServerGeneration: async () => 0,
    });
    assert(r0.outcome === "applied" && r0.effects.applied === 1, "legitimate generation-0 pull applies");
    await readyAt(2);
    const r2 = await runPullApply({
      pull: Promise.resolve({ v: 1 }),
      fetchServerGeneration: async () => 2,
    });
    assert(r2.outcome === "applied" && r2.effects.applied === 1 && r2.effects.pushed === 1, "unchanged generation applies exactly once");
  });

  test("post-pull fetch returns null or THROWS → fail closed, nothing applied", async () => {
    await readyAt(2);
    const rNull = await runPullApply({
      pull: Promise.resolve({ v: 1 }),
      fetchServerGeneration: async () => null,
    });
    assert(rNull.outcome === "discarded-stale" && rNull.effects.applied === 0, "null revalidation fails closed");
    const rThrow = await runPullApply({
      pull: Promise.resolve({ v: 1 }),
      fetchServerGeneration: async () => {
        throw new Error("network died");
      },
    });
    assert(rThrow.outcome === "discarded-stale" && rThrow.effects.applied === 0, "a thrown revalidation fails closed");
  });

  test("a LOCAL signal (P2 guards) still short-circuits BEFORE the server re-read", async () => {
    await readyAt(2);
    const pull = deferred<{ v: number } | null>();
    const run = runPullApply({
      pull: pull.promise,
      fetchServerGeneration: async () => 2,
    });
    blockSyncGeneration(); // local mirror flips mid-flight
    pull.resolve({ v: 1 });
    const r = await run;
    assert(r.outcome === "discarded-local", "P2 local re-check still fires first");
    assert(r.effects.fetches === 0, "no server round-trip when a local signal already blocks");
    await readyAt(0); // clean baseline for later suites
  });
});

describe("PR-I1 — state-machine test-state cleanup", () => {
  test("re-hydrate a clean baseline so later suites see an unblocked gate", async () => {
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(makeFakeKv());
    assert(cloudEraseState() === "ready", "clean-hydrated baseline for subsequent suites");
  });
});
