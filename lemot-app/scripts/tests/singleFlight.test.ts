/**
 * PR-I1 — single-flight serialization of the destructive privacy operations
 * (audit C1).
 *
 * Deferred-promise behavioral tests proving: concurrent delete-synced-data calls
 * join ONE operation (one UUID, one arm, one RPC, one reset/ack/finish, same
 * outcome for both callers); concurrent remote-erase confirmations join ONE
 * operation (one fetch/reset/ack/clear; no reset after the marker clears; the
 * gate stays blocked until the sole operation completes); and the lock releases
 * on settle/failure so genuine later retries can start.
 */
import { describe, test, assert } from "./harness";
import { randomUUID } from "node:crypto";
import { makeFakeKv } from "./helpers";
import { createSingleFlight } from "../../lib/singleFlight";
import { runDeleteSyncedData, type DeleteSyncedStatus } from "../../lib/deleteSyncedData";
import { runRemoteEraseConfirm } from "../../lib/remoteEraseConfirm";
import { makeOperationId, __setUuidSourceForTest } from "../../lib/operationId";
import { isLearnerMutationBlocked } from "../../lib/learnerMutationGate";
import {
  hydrateCloudEraseGuard,
  armCloudErase,
  advanceCloudErasePhase,
  finishCloudErase,
  cloudErasePendingOpId,
  __resetCloudEraseGuardForTest,
} from "../../lib/cloudEraseGuard";
import {
  persistRemoteEraseRecovery,
  clearRemoteEraseRecovery,
  remoteEraseRecovery,
  isRemoteErasePending,
  probeRemoteEraseRecovery,
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

describe("PR-I1 — single-flight primitive", () => {
  test("concurrent calls join the same promise; the lock releases on settle", async () => {
    const flight = createSingleFlight<number>();
    const gate = deferred<void>();
    let runs = 0;
    const task = async () => {
      runs += 1;
      await gate.promise;
      return runs;
    };
    const p1 = flight.run(task);
    const p2 = flight.run(task);
    assert(p1 === p2, "the second caller JOINS the in-flight promise");
    assert(flight.isActive(), "lock held while in flight");
    gate.resolve();
    const [r1, r2] = await Promise.all([p1, p2]);
    assert(r1 === 1 && r2 === 1, "the task ran exactly once; both callers got its result");
    assert(!flight.isActive(), "lock released after settle");
    await flight.run(async () => 99); // a later genuine retry starts fresh
    assert(runs === 1, "the retry ran its own task (previous task not re-run)");
  });

  test("a failed first execution releases the lock", async () => {
    const flight = createSingleFlight<number>();
    let failed = false;
    try {
      await flight.run(async () => {
        throw new Error("boom");
      });
    } catch {
      failed = true;
    }
    assert(failed && !flight.isActive(), "failure propagates and releases the lock");
    const v = await flight.run(async () => 7);
    assert(v === 7, "a later retry runs normally");
  });

  test("a synchronous throw in the task factory also releases the lock", async () => {
    const flight = createSingleFlight<number>();
    let failed = false;
    try {
      await flight.run(() => {
        throw new Error("sync boom");
      });
    } catch {
      failed = true;
    }
    assert(failed && !flight.isActive(), "sync throw does not wedge the lock");
  });
});

describe("PR-I1 — delete-synced-data is single-flight (one UUID/arm/RPC/reset/ack/finish)", () => {
  test("two immediate calls: every step runs once; both callers get the same outcome; retry allowed after", async () => {
    __resetCloudEraseGuardForTest();
    __setUuidSourceForTest(() => randomUUID());
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);

    const counts = { uuid: 0, arm: 0, rpc: 0, reset: 0, ack: 0, finish: 0 };
    const rpcGate = deferred<void>();
    const flight = createSingleFlight<DeleteSyncedStatus>();

    // Mirrors the provider: EACH call constructs its own task (which would mint
    // its own op id) — the single-flight discards the joiner's task entirely.
    const call = () =>
      flight.run(async () => {
        counts.uuid += 1;
        const opId = cloudErasePendingOpId() ?? (await makeOperationId());
        return runDeleteSyncedData({
          resume: null,
          armErase: async () => {
            counts.arm += 1;
            return armCloudErase({ userId: "user-a", opId, store: kv, drainTimeoutMs: 10_000 });
          },
          deleteCloud: async () => {
            counts.rpc += 1;
            await rpcGate.promise; // hold the operation in flight
            return { ok: true, generation: 1 };
          },
          markCloudDeleted: (gen) =>
            advanceCloudErasePhase({ phase: "cloud_deleted", serverGeneration: gen, store: kv }),
          resetLocal: async () => {
            counts.reset += 1;
          },
          markLocalResetDone: () =>
            advanceCloudErasePhase({ phase: "local_reset_done", store: kv }),
          acknowledgeGeneration: async () => {
            counts.ack += 1;
          },
          finishErase: async () => {
            counts.finish += 1;
            await finishCloudErase(kv);
          },
        });
      });

    const p1 = call();
    const p2 = call(); // immediate second call while the first is in flight
    assert(p1 === p2, "second deleteSyncedData call joins the in-flight operation");
    await tick();
    assert(val(counts.uuid) === 1, "one UUID generated");
    assert(val(counts.arm) === 1, "arm ran once");
    assert(val(counts.rpc) === 1, "delete RPC issued once");

    rpcGate.resolve();
    const [s1, s2] = await Promise.all([p1, p2]);
    assert(s1 === "success" && s2 === "success", "both callers receive the same final outcome");
    assert(
      val(counts.reset) === 1 && val(counts.ack) === 1 && val(counts.finish) === 1,
      "reset / acknowledgement / finish each ran once",
    );

    // After settling, a later genuine retry may start (fresh operation).
    const s3 = await call();
    assert(s3 === "success", "a later retry starts a new operation");
    assert(val(counts.uuid) === 2, "the retry generated its own (single) UUID");

    __setUuidSourceForTest(null);
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(makeFakeKv());
  });
});

describe("PR-I1 — remote-erase confirmation is single-flight", () => {
  test("two simultaneous confirmations: one fetch/reset/ack/clear; gate blocked until done; no reset after clear", async () => {
    __resetCloudEraseGuardForTest();
    __resetRemoteEraseRecoveryForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    await probeRemoteEraseRecovery(kv);
    await persistRemoteEraseRecovery({ userId: "user-a", targetGeneration: 2, store: kv });
    assert(isLearnerMutationBlocked(), "recovery pending → gate blocked");

    const counts = { fetch: 0, reset: 0, ack: 0, clear: 0 };
    const fetchGate = deferred<number | null>();
    const flight = createSingleFlight<void>();
    const call = () =>
      flight.run(async () => {
        await runRemoteEraseConfirm({
          recovery: remoteEraseRecovery(),
          currentUserId: "user-a",
          fetchServerGeneration: async () => {
            counts.fetch += 1;
            return fetchGate.promise;
          },
          resetLocal: async () => {
            counts.reset += 1;
            assert(isRemoteErasePending(), "the marker never clears while a reset is outstanding");
          },
          acknowledgeGeneration: async () => {
            counts.ack += 1;
          },
          clearRecovery: async () => {
            counts.clear += 1;
            await clearRemoteEraseRecovery(kv);
          },
        });
      });

    const p1 = call();
    const p2 = call();
    assert(p1 === p2, "the second confirmation joins the in-flight one");
    await tick();
    assert(val(counts.fetch) === 1, "one generation fetch");
    assert(isLearnerMutationBlocked(), "gate remains blocked until the sole operation completes");

    fetchGate.resolve(2);
    await Promise.all([p1, p2]);
    assert(val(counts.reset) === 1, "reset ran once");
    assert(val(counts.ack) === 1, "acknowledgement ran once");
    assert(val(counts.clear) === 1, "marker cleared once");
    assert(!isRemoteErasePending(), "recovery cleared, at the end");
    assert(!isLearnerMutationBlocked(), "gate reopens only after completion");

    // A DELAYED further invocation after completion: no owned marker remains →
    // not_owner → it can never reset learner data again.
    await call();
    assert(val(counts.reset) === 1, "no reset after the marker was cleared");
  });

  test("a failed confirmation releases the lock but leaves recovery pending", async () => {
    __resetCloudEraseGuardForTest();
    __resetRemoteEraseRecoveryForTest();
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    await probeRemoteEraseRecovery(kv);
    await persistRemoteEraseRecovery({ userId: "user-a", targetGeneration: 2, store: kv });

    const counts = { reset: 0 };
    const flight = createSingleFlight<void>();
    const call = (fetch: () => Promise<number | null>) =>
      flight.run(async () => {
        await runRemoteEraseConfirm({
          recovery: remoteEraseRecovery(),
          currentUserId: "user-a",
          fetchServerGeneration: fetch,
          resetLocal: async () => {
            counts.reset += 1;
          },
          acknowledgeGeneration: async () => {},
          clearRecovery: () => clearRemoteEraseRecovery(kv),
        });
      });

    await call(async () => null); // fetch fails → confirmation fails closed
    assert(val(counts.reset) === 0, "no reset on a failed confirmation");
    assert(isRemoteErasePending(), "recovery stays pending after the failure");
    assert(!flight.isActive(), "the failure released the single-flight lock");

    await call(async () => 2); // genuine retry completes
    assert(val(counts.reset) === 1 && !isRemoteErasePending(), "retry completes the recovery");

    __resetRemoteEraseRecoveryForTest();
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(makeFakeKv());
    await probeRemoteEraseRecovery(makeFakeKv());
  });
});
