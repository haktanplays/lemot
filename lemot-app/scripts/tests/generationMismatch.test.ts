/**
 * PR-I1 — write-RPC generation-mismatch recovery (audit C1).
 *
 * When `upsert_user_progress` / `insert_user_error` reject with a stale
 * generation, the device must not merely log and wait: it stops sync admission,
 * fetches the current server generation, and either enters explicit remote-erase
 * recovery (learner data present) or safely acknowledges the current generation
 * (empty device). The rejected payload is never restamped or resent.
 */
import { describe, test, assert } from "./harness";
import { makeFakeKv } from "./helpers";
import {
  handleGenerationMismatch,
  type GenerationMismatchDeps,
} from "../../lib/generationMismatch";
import {
  persistRemoteEraseRecovery,
  markRemoteEraseBlocked,
  remoteEraseStatusFor,
  isRemoteErasePending,
  hydrateRemoteEraseRecovery,
  __resetRemoteEraseRecoveryForTest,
} from "../../lib/remoteEraseRecovery";

function harness(over: Partial<GenerationMismatchDeps> = {}) {
  const calls: string[] = [];
  const deps: GenerationMismatchDeps = {
    userId: "user-a",
    localGeneration: 1,
    blockGeneration: () => {
      calls.push("block");
    },
    fetchServerGeneration: async () => {
      calls.push("fetch");
      return 2;
    },
    hasLearnerData: async () => true,
    persistRecovery: async (a) => {
      calls.push(`recovery:${a.userId}:${a.targetGeneration}`);
    },
    acknowledgeGeneration: async (g) => {
      calls.push(`ack:${g}`);
    },
    ...over,
  };
  return { calls, deps };
}

describe("PR-I1 — write-RPC generation mismatch recovery", () => {
  test("learner data present → admission blocked FIRST, recovery marker persisted, no ack, no resend", async () => {
    const { calls, deps } = harness();
    const outcome = await handleGenerationMismatch(deps);
    assert(outcome === "recovery", "device with data enters explicit recovery");
    assert(calls[0] === "block", "sync admission is stopped before anything async");
    assert(calls.includes("recovery:user-a:2"), "user-bound recovery marker persisted with the fetched generation");
    assert(!calls.some((c) => c.startsWith("ack")), "no automatic acknowledgement while data exists");
  });

  test("device empty → current generation safely acknowledged (fresh-install shortcut)", async () => {
    const { calls, deps } = harness({ hasLearnerData: async () => false });
    const outcome = await handleGenerationMismatch(deps);
    assert(outcome === "acknowledged", "empty device adopts the current generation");
    assert(calls.includes("ack:2"), "acknowledged the FETCHED generation");
    assert(!calls.some((c) => c.startsWith("recovery")), "no recovery marker for an empty device");
  });

  test("generation fetch failure → stays blocked; no recovery, no ack", async () => {
    const { calls, deps } = harness({ fetchServerGeneration: async () => null });
    const outcome = await handleGenerationMismatch(deps);
    assert(outcome === "blocked", "fetch failure fails closed");
    assert(calls[0] === "block", "admission stopped");
    assert(calls.filter((c) => c !== "block" && c !== "fetch").length === 0, "no side effects");
  });

  test("fetched BELOW the local generation → never downgrade; stays blocked", async () => {
    const { calls, deps } = harness({
      localGeneration: 5,
      fetchServerGeneration: async () => 3,
    });
    const outcome = await handleGenerationMismatch(deps);
    assert(outcome === "blocked", "a lower server generation is an anomaly — fail closed");
    assert(!calls.some((c) => c.startsWith("ack") || c.startsWith("recovery")), "no downgrade side effects");
  });

  test("recovery/ack persistence failure → stays blocked", async () => {
    const { deps } = harness({
      persistRecovery: async () => {
        throw new Error("marker persist failed");
      },
    });
    assert((await handleGenerationMismatch(deps)) === "blocked", "persist failure fails closed");
  });

  test("Codex P2-3: marker persist failure via the provider wrapper → blocked-NOT-actionable surfaced, exception contained", async () => {
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
    const failingStore = {
      getItem: () => null,
      setItem: () => {
        throw new Error("marker persist failed");
      },
      removeItem: () => {},
    };
    const { calls, deps } = harness({
      // Exactly the AppProvider wiring: mark the runtime blocked-not-actionable,
      // then rethrow so the pure machine still resolves "blocked".
      persistRecovery: async (args) => {
        try {
          await persistRemoteEraseRecovery({ ...args, store: failingStore });
        } catch (e) {
          markRemoteEraseBlocked();
          throw e;
        }
      },
    });
    const outcome = await handleGenerationMismatch(deps); // must resolve — never reject
    assert(outcome === "blocked", "persist failure fails closed");
    assert(calls[0] === "block", "admission was stopped BEFORE the persistence attempt");
    assert(isRemoteErasePending(), "the runtime learner/sync gate stays blocked");
    assert(remoteEraseStatusFor("user-a") === "blocked", "UI sees blocked — never an actionable recovery without a durable marker");
    assert(!calls.some((c) => c.startsWith("ack")), "no acknowledgement after the failure");
    // Leave the module in a clean hydrated state for later suites.
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
  });
});
