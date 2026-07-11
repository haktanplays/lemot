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
import { runRemoteEraseConfirm } from "../../lib/remoteEraseConfirm";

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
