/**
 * PR-I1 — learner-mutation gate (audit C1, deletion/recovery finalization).
 *
 * Real behavioral tests over the REAL coordinator + recovery modules. The gate
 * FAILS CLOSED until the LOCAL control records hydrate and prove clean: no new
 * learner state may persist while either record is unhydrated, unreadable,
 * corrupt, pending (any durable phase), or foreign-owned — and clean LOCAL
 * hydration reopens learning WITHOUT any network / server-generation fetch.
 * Includes the crash-window regression: reset done, `local_reset_done` persist
 * failed, restart — zero learner mutations are admitted before/after hydration,
 * so the resumed idempotent reset has nothing legitimate to destroy.
 */
import { describe, test, assert } from "./harness";
import { makeFakeKv } from "./helpers";
import { isLearnerMutationBlocked } from "../../lib/learnerMutationGate";
import { runDeleteSyncedData } from "../../lib/deleteSyncedData";
import {
  LM_CLOUD_ERASE_PENDING_KEY,
  hydrateCloudEraseGuard,
  armCloudErase,
  advanceCloudErasePhase,
  finishCloudErase,
  cloudErasePendingOpId,
  cloudErasePendingPhase,
  cloudErasePendingServerGeneration,
  __resetCloudEraseGuardForTest,
  type CloudEraseKv,
} from "../../lib/cloudEraseGuard";
import {
  persistRemoteEraseRecovery,
  clearRemoteEraseRecovery,
  hydrateRemoteEraseRecovery,
  probeRemoteEraseRecovery,
  LM_REMOTE_ERASE_RECOVERY_KEY,
  __resetRemoteEraseRecoveryForTest,
} from "../../lib/remoteEraseRecovery";

/** Clean LOCAL hydration of both control records (what the app does at mount). */
async function hydrateClean(kv = makeFakeKv()) {
  await hydrateCloudEraseGuard(kv);
  await probeRemoteEraseRecovery(kv);
  return kv;
}

describe("PR-I1 — gate fails closed until local control records prove clean", () => {
  test("1. pre-hydration learner mutations are BLOCKED", () => {
    __resetCloudEraseGuardForTest();
    __resetRemoteEraseRecoveryForTest();
    assert(isLearnerMutationBlocked(), "unhydrated control records → fail closed");
  });

  test("2+9. clean LOCAL hydration reopens mutations with NO network / generation fetch", async () => {
    __resetCloudEraseGuardForTest();
    __resetRemoteEraseRecoveryForTest();
    // Ordinary offline startup: only local kv reads — no user, no server fetch,
    // no sync-generation hydration. (Sync admission stays independently closed.)
    await hydrateClean();
    assert(!isLearnerMutationBlocked(), "clean local markers → local learning admitted offline");
  });

  test("3. every pending phase (armed / cloud_deleted / local_reset_done) stays blocked; finish reopens", async () => {
    __resetCloudEraseGuardForTest();
    __resetRemoteEraseRecoveryForTest();
    const kv = await hydrateClean();
    assert(!isLearnerMutationBlocked(), "open before the erase");

    const armP = armCloudErase({ userId: "user-a", opId: "op-1", store: kv, drainTimeoutMs: 10_000 });
    assert(isLearnerMutationBlocked(), "arming blocks SYNCHRONOUSLY");
    await armP;
    assert(isLearnerMutationBlocked(), "phase armed → blocked");
    await advanceCloudErasePhase({ phase: "cloud_deleted", serverGeneration: 2, store: kv });
    assert(isLearnerMutationBlocked(), "phase cloud_deleted → blocked");
    await advanceCloudErasePhase({ phase: "local_reset_done", store: kv });
    assert(isLearnerMutationBlocked(), "phase local_reset_done → blocked (finalization pending)");
    await finishCloudErase(kv);
    assert(!isLearnerMutationBlocked(), "after finalization, learner mutations resume");
  });

  test("4. a pending remote-erase recovery blocks (own marker)", async () => {
    __resetCloudEraseGuardForTest();
    __resetRemoteEraseRecoveryForTest();
    const kv = await hydrateClean();
    await persistRemoteEraseRecovery({ userId: "user-a", targetGeneration: 3, store: kv });
    assert(isLearnerMutationBlocked(), "own recovery pending → blocked (device will be wiped on confirm)");
    await clearRemoteEraseRecovery(kv);
    assert(!isLearnerMutationBlocked(), "cleared → open");
  });

  test("5. corrupt / unreadable markers stay blocked", async () => {
    // Corrupt ERASE marker.
    __resetCloudEraseGuardForTest();
    __resetRemoteEraseRecoveryForTest();
    await hydrateCloudEraseGuard(makeFakeKv({ [LM_CLOUD_ERASE_PENDING_KEY]: "{not-json" }));
    await probeRemoteEraseRecovery(makeFakeKv());
    assert(isLearnerMutationBlocked(), "corrupt erase marker → blocked");

    // Unreadable RECOVERY marker.
    __resetCloudEraseGuardForTest();
    __resetRemoteEraseRecoveryForTest();
    await hydrateCloudEraseGuard(makeFakeKv());
    const throwing: CloudEraseKv = {
      getItem: () => {
        throw new Error("kv read blew up");
      },
      setItem: () => {},
      removeItem: () => {},
    };
    await probeRemoteEraseRecovery(throwing);
    assert(isLearnerMutationBlocked(), "unreadable recovery marker → blocked");

    // Corrupt RECOVERY marker (user-bound hydrate).
    __resetCloudEraseGuardForTest();
    __resetRemoteEraseRecoveryForTest();
    await hydrateCloudEraseGuard(makeFakeKv());
    await hydrateRemoteEraseRecovery({
      userId: "user-a",
      store: makeFakeKv({ [LM_REMOTE_ERASE_RECOVERY_KEY]: "{broken" }),
    });
    assert(isLearnerMutationBlocked(), "corrupt recovery marker → blocked");
  });

  test("6. foreign-user markers stay blocked (never executed here)", async () => {
    __resetCloudEraseGuardForTest();
    __resetRemoteEraseRecoveryForTest();
    // Foreign ERASE marker.
    await hydrateCloudEraseGuard(
      makeFakeKv({
        [LM_CLOUD_ERASE_PENDING_KEY]: JSON.stringify({
          version: 2,
          userId: "user-b",
          operationId: "op-x",
          phase: "armed",
        }),
      }),
    );
    await probeRemoteEraseRecovery(makeFakeKv());
    assert(isLearnerMutationBlocked(), "foreign pending deletion → blocked");

    // Foreign RECOVERY marker.
    __resetCloudEraseGuardForTest();
    __resetRemoteEraseRecoveryForTest();
    await hydrateCloudEraseGuard(makeFakeKv());
    await hydrateRemoteEraseRecovery({
      userId: "user-a",
      store: makeFakeKv({
        [LM_REMOTE_ERASE_RECOVERY_KEY]: JSON.stringify({
          version: 1,
          userId: "user-b",
          targetGeneration: 9,
        }),
      }),
    });
    assert(isLearnerMutationBlocked(), "foreign recovery marker → blocked");
  });

  test("7+8. CRASH WINDOW: reset done, local_reset_done persist failed, restart — zero mutations admitted; resumed reset destroys nothing", async () => {
    __resetCloudEraseGuardForTest();
    __resetRemoteEraseRecoveryForTest();
    // The device crashed after: cloud_deleted was durably recorded, the local
    // reset SUCCEEDED, but persisting `local_reset_done` FAILED. The durable
    // marker therefore still says cloud_deleted.
    const kv = makeFakeKv({
      [LM_CLOUD_ERASE_PENDING_KEY]: JSON.stringify({
        version: 2,
        userId: "user-a",
        operationId: "op-crash",
        phase: "cloud_deleted",
        serverGeneration: 4,
      }),
    });

    // Restart: the modeled learner persisters (progress/SRS/events/telemetry all
    // share this exact gate check) attempt writes BEFORE hydration…
    const persisted: string[] = [];
    const persist = (v: string) => {
      if (isLearnerMutationBlocked()) return;
      persisted.push(v);
    };
    persist("progress-before-hydration");
    persist("srs-before-hydration");
    persist("event-before-hydration");
    persist("telemetry-before-hydration");
    assert(persisted.length === 0, "pre-hydration writes are ALL dropped (fail closed)");

    // …and after hydration the pending marker keeps them dropped.
    await hydrateCloudEraseGuard(kv);
    await probeRemoteEraseRecovery(kv);
    persist("progress-after-hydration");
    assert(persisted.length === 0, "pending cloud_deleted keeps mutations blocked");

    // The retry resumes from durable cloud_deleted and re-runs the idempotent
    // reset — legitimately, because NO learner state was ever admitted for it
    // to erase.
    let resetRan = 0;
    const status = await runDeleteSyncedData({
      resume: {
        phase: cloudErasePendingPhase()!,
        serverGeneration: cloudErasePendingServerGeneration() ?? undefined,
      },
      armErase: async () => {
        throw new Error("must not re-arm from cloud_deleted");
      },
      deleteCloud: async () => {
        throw new Error("must not re-RPC from cloud_deleted");
      },
      markCloudDeleted: async () => {
        throw new Error("unreachable");
      },
      resetLocal: async () => {
        resetRan += 1;
        assert(persisted.length === 0, "the re-run reset finds NO admitted learner state to destroy");
      },
      markLocalResetDone: () =>
        advanceCloudErasePhase({ phase: "local_reset_done", store: kv }),
      acknowledgeGeneration: async () => {},
      finishErase: () => finishCloudErase(kv),
    });
    assert(status === "success", "retry converges");
    assert(resetRan === 1, "the idempotent reset re-ran once from durable cloud_deleted");
    assert(cloudErasePendingOpId() === null, "marker cleared after finalization");
    persist("fresh-after-finalization");
    assert(persisted.join(",") === "fresh-after-finalization", "learning resumes only after finalization");
  });
});

describe("PR-I1 — mutation-gate test-state cleanup", () => {
  test("re-hydrate a clean baseline so later suites see an open gate", async () => {
    __resetCloudEraseGuardForTest();
    __resetRemoteEraseRecoveryForTest();
    await hydrateClean();
    assert(!isLearnerMutationBlocked(), "clean baseline restored for subsequent suites");
  });
});
