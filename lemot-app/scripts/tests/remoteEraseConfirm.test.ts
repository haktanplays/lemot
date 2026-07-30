/**
 * PR-I1 — second-device recovery confirmation with generation REVALIDATION
 * (audit C1).
 *
 * The recorded targetGeneration may be stale by confirmation time (another
 * deletion can advance the server first). These prove the confirmed flow
 * acknowledges the FRESHLY FETCHED generation, resets exactly once, keeps the
 * marker until after acknowledgement, and fails fully closed on fetch failure
 * or a foreign marker.
 */
import { describe, test, assert } from "./harness";
import { makeFakeKv } from "./helpers";
import { runRemoteEraseConfirm } from "../../lib/remoteEraseConfirm";
import {
  LM_REMOTE_ERASE_RECOVERY_KEY,
  remoteEraseRecovery,
  isRemoteErasePending,
  persistRemoteEraseRecovery,
  clearRemoteEraseRecovery,
  hydrateRemoteEraseRecovery,
  __resetRemoteEraseRecoveryForTest,
} from "../../lib/remoteEraseRecovery";

function val<T>(x: T): T {
  return x;
}

function spies() {
  const calls: string[] = [];
  return {
    calls,
    resetLocal: async () => {
      calls.push("reset");
    },
    acknowledgeGeneration: async (g: number) => {
      calls.push(`ack:${g}`);
    },
    clearRecovery: async () => {
      calls.push("clear");
    },
  };
}

describe("PR-I1 — remote-erase confirmation revalidates the generation", () => {
  test("marker targets N, server advanced to N+1 → resets once, acknowledges N+1, never N", async () => {
    const s = spies();
    const outcome = await runRemoteEraseConfirm({
      recovery: { userId: "user-a", targetGeneration: 4 }, // recorded N
      currentUserId: "user-a",
      fetchServerGeneration: async () => 5, // server advanced to N+1 before confirm
      ...s,
    });
    assert(outcome === "done", "confirmation completes");
    assert(
      s.calls.join(",") === "reset,ack:5,clear",
      `reset ONCE, then ack the FETCHED generation, then clear (got ${s.calls.join(",")})`,
    );
    assert(!s.calls.includes("ack:4"), "the stale recorded target is never acknowledged");
  });

  test("generation fetch failure → recovery stays pending; NO reset/ack/clear", async () => {
    const s = spies();
    const outcome = await runRemoteEraseConfirm({
      recovery: { userId: "user-a", targetGeneration: 4 },
      currentUserId: "user-a",
      fetchServerGeneration: async () => null, // fetch failed
      ...s,
    });
    assert(outcome === "fetch_failed", "fetch failure reported");
    assert(s.calls.length === 0, "no reset, no acknowledgement, no marker clear, no reopen");
  });

  test("fetch THROWING is the same as failing", async () => {
    const s = spies();
    const outcome = await runRemoteEraseConfirm({
      recovery: { userId: "user-a", targetGeneration: 4 },
      currentUserId: "user-a",
      fetchServerGeneration: async () => {
        throw new Error("network down");
      },
      ...s,
    });
    assert(outcome === "fetch_failed" && s.calls.length === 0, "thrown fetch fails closed");
  });

  test("fetched generation BELOW the recorded target is an anomaly → fail closed", async () => {
    const s = spies();
    const outcome = await runRemoteEraseConfirm({
      recovery: { userId: "user-a", targetGeneration: 4 },
      currentUserId: "user-a",
      fetchServerGeneration: async () => 2, // impossible for a monotonic server
      ...s,
    });
    assert(outcome === "fetch_failed" && s.calls.length === 0, "anomalous fetch fails closed");
  });

  test("foreign / missing marker → not_owner; nothing executes", async () => {
    const s = spies();
    const foreign = await runRemoteEraseConfirm({
      recovery: { userId: "user-b", targetGeneration: 4 },
      currentUserId: "user-a",
      fetchServerGeneration: async () => 5,
      ...s,
    });
    assert(foreign === "not_owner" && s.calls.length === 0, "another user's recovery is never executed");
    const missing = await runRemoteEraseConfirm({
      recovery: null,
      currentUserId: "user-a",
      fetchServerGeneration: async () => 5,
      ...s,
    });
    assert(missing === "not_owner" && s.calls.length === 0, "no marker → nothing to confirm");
  });

  test("reset failure keeps the marker; finalize failure keeps the marker (ack before clear)", async () => {
    const s = spies();
    const r1 = await runRemoteEraseConfirm({
      recovery: { userId: "user-a", targetGeneration: 4 },
      currentUserId: "user-a",
      fetchServerGeneration: async () => 4,
      ...s,
      resetLocal: async () => {
        throw new Error("reset failed");
      },
    });
    assert(r1 === "reset_failed", "reset failure reported");
    assert(!s.calls.includes("ack:4") && !s.calls.includes("clear"), "no ack/clear after a failed reset");

    const s2 = spies();
    const r2 = await runRemoteEraseConfirm({
      recovery: { userId: "user-a", targetGeneration: 4 },
      currentUserId: "user-a",
      fetchServerGeneration: async () => 4,
      ...s2,
      acknowledgeGeneration: async () => {
        throw new Error("ack failed");
      },
    });
    assert(r2 === "finalize_failed", "ack failure → finalize_failed");
    assert(!s2.calls.includes("clear"), "the marker is cleared ONLY after acknowledgement succeeds");
  });
});

describe("PR-I1 — recovery cleanup revalidates the ACTIVE account (Codex P1, round 3)", () => {
  /**
   * Mirrors the AppProvider confirmRemoteErase wiring (pinned by the source
   * scan in deleteSyncedDataWiring.test): every destructive / acknowledging /
   * clearing dep re-checks the LIVE auth identity against the initiating
   * `uidNow` and throws on a switch — the machine then reports the retryable
   * failure with the durable marker fully pending, so the original owner can
   * complete the recovery later. The new account's device data is never reset,
   * no generation is written under the stale user id, and the marker is never
   * cleared under a different identity.
   */
  function ownerGuardedHarness() {
    const uidNow = "user-a";
    const live = { activeUid: "user-a" };
    const calls: string[] = [];
    const assertOwnerActive = () => {
      if (live.activeUid !== uidNow) {
        throw new Error("auth changed during recovery; leaving recovery pending");
      }
    };
    const deps = {
      recovery: { userId: "user-a", targetGeneration: 2 },
      currentUserId: uidNow,
      fetchServerGeneration: async () => 2,
      resetLocal: async () => {
        assertOwnerActive();
        calls.push("reset");
      },
      acknowledgeGeneration: async (g: number) => {
        assertOwnerActive();
        calls.push(`ack:${g}`);
      },
      clearRecovery: async () => {
        assertOwnerActive();
        calls.push("clear");
      },
    };
    return { deps, live, calls };
  }

  test("auth switches DURING the generation fetch → no reset, no ack, no clear; owner retries the SAME marker later", async () => {
    const h = ownerGuardedHarness();
    let switched = false;
    h.deps.fetchServerGeneration = async () => {
      if (!switched) {
        switched = true;
        h.live.activeUid = "user-b"; // sign-out + another sign-in mid-fetch
      }
      return 2;
    };
    const outcome = await runRemoteEraseConfirm(h.deps);
    assert(outcome === "reset_failed", "the guarded reset threw → retryable failure, marker intact");
    assert(h.calls.length === 0, "ZERO destructive/acknowledging/clearing steps ran after the switch");

    // The original owner becomes active again → the SAME durable marker completes.
    h.live.activeUid = "user-a";
    const retry = await runRemoteEraseConfirm(h.deps);
    assert(retry === "done", "the owner's retry completes the recovery");
    assert(h.calls.join(",") === "reset,ack:2,clear", "the full sequence ran exactly once, for the owner");
  });

  test("auth switches AFTER the reset, before finalization → no ack under the stale user, marker NOT cleared", async () => {
    const h = ownerGuardedHarness();
    const origReset = h.deps.resetLocal;
    h.deps.resetLocal = async () => {
      await origReset();
      h.live.activeUid = "user-b"; // switch lands between reset and finalization
    };
    const outcome = await runRemoteEraseConfirm(h.deps);
    assert(outcome === "finalize_failed", "finalization is refused under the switched identity");
    assert(h.calls.join(",") === "reset", "no acknowledgement was written and the marker was NOT cleared");
  });
});

describe("PR-I1 — post-ack / pre-clear races (Codex P1, round 3 completion)", () => {
  /**
   * Full-fidelity mirror of the AppProvider confirmRemoteErase wiring, over the
   * REAL recovery-marker module: owner guard on every destructive/finalizing
   * dep, PLUS the marker re-verification immediately before the clear (the
   * shared key must still hold THIS user's actionable marker), PLUS the
   * provider's reopen model (syncEpoch bump / hasPulled reset ONLY on "done").
   */
  function providerMirror(kv: ReturnType<typeof makeFakeKv>) {
    const uidNow = "user-a";
    const live = { activeUid: "user-a" };
    const calls: string[] = [];
    const reopen = { syncEpoch: 0, hasPulled: true };
    const assertOwnerActive = () => {
      if (live.activeUid !== uidNow) {
        throw new Error("auth changed during recovery; leaving recovery pending");
      }
    };
    const deps = {
      recovery: remoteEraseRecovery(),
      currentUserId: uidNow,
      fetchServerGeneration: async () => 2,
      resetLocal: async () => {
        assertOwnerActive();
        calls.push("reset");
      },
      acknowledgeGeneration: async (g: number) => {
        assertOwnerActive();
        calls.push(`ack:${g}`);
      },
      clearRecovery: async () => {
        assertOwnerActive();
        const marker = remoteEraseRecovery();
        if (!marker || marker.userId !== uidNow) {
          throw new Error("recovery marker changed; refusing to clear");
        }
        calls.push("clear");
        await clearRemoteEraseRecovery(kv);
      },
    };
    const run = async () => {
      const outcome = await runRemoteEraseConfirm({ ...deps, recovery: remoteEraseRecovery() });
      if (outcome === "done") {
        reopen.hasPulled = false;
        reopen.syncEpoch += 1; // the provider reopens ONLY on "done"
      }
      return outcome;
    };
    return { live, calls, reopen, deps, run };
  }

  test("ack SUCCEEDS, active user switches A→B before clear → marker intact, clear never runs, no reopen; A's retry completes", async () => {
    __resetRemoteEraseRecoveryForTest();
    const kv = makeFakeKv();
    await persistRemoteEraseRecovery({ userId: "user-a", targetGeneration: 2, store: kv });
    const m = providerMirror(kv);
    // The switch lands AFTER the acknowledgement succeeded, BEFORE the clear.
    const origAck = m.deps.acknowledgeGeneration;
    let switchOnce = true;
    m.deps.acknowledgeGeneration = async (g: number) => {
      await origAck(g); // acknowledgement itself succeeds for A
      if (switchOnce) {
        switchOnce = false;
        m.live.activeUid = "user-b";
      }
    };

    const outcome = await m.run();
    assert(outcome === "finalize_failed", "the existing retryable finalize failure is reported");
    assert(!m.calls.includes("clear"), "clearRemoteEraseRecovery was called 0 times");
    assert(kv.map.has(LM_REMOTE_ERASE_RECOVERY_KEY), "the durable recovery marker remains intact");
    assert(isRemoteErasePending(), "recovery (and the mutation gate) stays pending/blocked");
    assert(val(m.reopen.syncEpoch) === 0, "syncEpoch was NOT incremented");
    assert(val(m.reopen.hasPulled) === true, "hasPulled was NOT reopened/reset as completed");
    assert(m.calls.join(",") === "reset,ack:2", "B's session performed nothing — only A's pre-switch steps ran");

    // A returns → the SAME durable marker completes; the repeat reset/ack is the
    // existing idempotent retry behavior (empty, mutation-gated device).
    m.live.activeUid = "user-a";
    const retry = await m.run();
    assert(retry === "done", "the owner's retry completes");
    assert(m.calls.join(",") === "reset,ack:2,reset,ack:2,clear", "clear ran exactly once, at the end of A's own retry");
    assert(!kv.map.has(LM_REMOTE_ERASE_RECOVERY_KEY) && !isRemoteErasePending(), "the marker cleared on the owner path");
    assert(val(m.reopen.syncEpoch) === 1 && val(m.reopen.hasPulled) === false, "reopen happened only after the owner's completed retry");

    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
  });

  test("marker-owner mismatch immediately before clear blocks the clear even when the auth identity still matches", async () => {
    __resetRemoteEraseRecoveryForTest();
    const kv = makeFakeKv();
    await persistRemoteEraseRecovery({ userId: "user-a", targetGeneration: 2, store: kv });
    const m = providerMirror(kv);
    // Auth identity NEVER changes (stays user-a) — but the shared recovery key
    // is re-occupied by ANOTHER user's marker after the acknowledgement.
    const origAck = m.deps.acknowledgeGeneration;
    m.deps.acknowledgeGeneration = async (g: number) => {
      await origAck(g);
      await persistRemoteEraseRecovery({ userId: "user-b", targetGeneration: 9, store: kv });
    };

    const outcome = await m.run();
    assert(outcome === "finalize_failed", "the marker re-check refuses the clear");
    assert(!m.calls.includes("clear"), "clear never ran despite the matching auth identity");
    assert(kv.map.has(LM_REMOTE_ERASE_RECOVERY_KEY), "the occupying marker was NOT cleared from storage");
    assert(remoteEraseRecovery()?.userId === "user-b", "the foreign marker is untouched (not reinterpreted)");
    assert(val(m.reopen.syncEpoch) === 0 && val(m.reopen.hasPulled) === true, "sync was not reopened");

    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
  });
});
