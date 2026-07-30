/**
 * PR-I1 — auth-PINNED cloud deletion (Codex P1, cross-account deletion race).
 *
 * Proves the verify-then-pin step: a deletion armed by user A can never fire
 * under user B's session. The live identity is checked before AND after the
 * async session read, the pending-marker identity must match the operation,
 * and the RPC receives the CAPTURED token — later changes to the (fake) global
 * session cannot reach the request. Every abort resolves { ok: false } so the
 * machine reports cloud_failed with the armed marker retained and retryable.
 */
import { describe, test, assert } from "./harness";
import {
  runPinnedCloudDelete,
  type PinnedDeleteDeps,
  type PinnedSession,
} from "../../lib/pinnedDelete";

function val<T>(x: T): T {
  return x;
}

type Call = { token: string; opId: string };

function harness(over: Partial<PinnedDeleteDeps> = {}) {
  const rpcCalls: Call[] = [];
  const deps: PinnedDeleteDeps = {
    ownerUserId: "user-a",
    operationId: "op-x",
    latestAuthUserId: () => "user-a",
    getSession: async () => ({ userId: "user-a", accessToken: "token-a" }),
    pendingOwner: () => "user-a",
    pendingOpId: () => "op-x",
    rpcWithToken: async (token, opId) => {
      rpcCalls.push({ token, opId });
      return { ok: true, generation: 3 };
    },
    ...over,
  };
  return { deps, rpcCalls };
}

describe("PR-I1 — pinned deletion aborts before the RPC on any identity break", () => {
  test("auth switched to B before verification → abort; NO request of any kind", async () => {
    let sessionReads = 0;
    const { deps, rpcCalls } = harness({
      latestAuthUserId: () => "user-b", // A armed; B is now signed in
      getSession: async () => {
        sessionReads += 1;
        return { userId: "user-b", accessToken: "token-b" };
      },
    });
    const res = await runPinnedCloudDelete(deps);
    assert(!res.ok, "aborts with a retryable failure");
    assert(rpcCalls.length === 0, "no deletion request was sent — B's rows cannot be targeted");
    assert(val(sessionReads) === 0, "aborted before even reading the session");
  });

  test("missing session → abort before RPC", async () => {
    const { deps, rpcCalls } = harness({ getSession: async () => null });
    assert(!(await runPinnedCloudDelete(deps)).ok, "no session → abort");
    assert(rpcCalls.length === 0, "no request sent");
  });

  test("session belongs to B → abort; B's token is never used", async () => {
    const { deps, rpcCalls } = harness({
      getSession: async () => ({ userId: "user-b", accessToken: "token-b" }),
    });
    assert(!(await runPinnedCloudDelete(deps)).ok, "foreign session → abort");
    assert(rpcCalls.length === 0, "no request was sent with B's token");
  });

  test("session read throws → abort before RPC", async () => {
    const { deps, rpcCalls } = harness({
      getSession: async () => {
        throw new Error("auth storage unreadable");
      },
    });
    assert(!(await runPinnedCloudDelete(deps)).ok, "unreadable session fails closed");
    assert(rpcCalls.length === 0, "no request sent");
  });

  test("auth switches DURING the session read (check-to-use) → abort", async () => {
    let reads = 0;
    const { deps, rpcCalls } = harness({
      // First check (pre-session) sees A; the re-check after the await sees B.
      latestAuthUserId: () => (reads++ === 0 ? "user-a" : "user-b"),
    });
    assert(!(await runPinnedCloudDelete(deps)).ok, "post-read identity re-check aborts");
    assert(rpcCalls.length === 0, "no request sent");
  });

  test("pending marker owned by another user → abort", async () => {
    const { deps, rpcCalls } = harness({ pendingOwner: () => "user-b" });
    assert(!(await runPinnedCloudDelete(deps)).ok, "foreign marker → abort");
    assert(rpcCalls.length === 0, "no request sent");
  });

  test("pending marker is a DIFFERENT operation → abort", async () => {
    const { deps, rpcCalls } = harness({ pendingOpId: () => "op-y" });
    assert(!(await runPinnedCloudDelete(deps)).ok, "operation-id mismatch → abort");
    assert(rpcCalls.length === 0, "no request sent");
  });

  test("pending marker gone (owner null) → abort", async () => {
    const { deps, rpcCalls } = harness({
      pendingOwner: () => null,
      pendingOpId: () => null,
    });
    assert(!(await runPinnedCloudDelete(deps)).ok, "no marker → abort");
    assert(rpcCalls.length === 0, "no request sent");
  });
});

describe("PR-I1 — pinned deletion executes as the VERIFIED owner or not at all", () => {
  test("valid A session → exactly ONE RPC, pinned to A's token and the operation id", async () => {
    const { deps, rpcCalls } = harness();
    const res = await runPinnedCloudDelete(deps);
    assert(res.ok && res.generation === 3, "the RPC result is returned unchanged");
    assert(rpcCalls.length === 1, "exactly one RPC");
    assert(rpcCalls[0].token === "token-a" && rpcCalls[0].opId === "op-x", "pinned to A's token + this op id");
  });

  test("token captured, THEN the global session switches to B → the request still carries A's token", async () => {
    // A mutable fake "global session" — switched to B after verification, the
    // way the real client's session changes on sign-out/sign-in.
    const globalSession = { current: { userId: "user-a", accessToken: "token-a" } as PinnedSession };
    const { deps, rpcCalls } = harness({
      getSession: async () => globalSession.current,
      rpcWithToken: async (token, opId) => {
        // By the time the request fires, the global session is B's — but the
        // pinned token was captured at verification time.
        assert(
          globalSession.current.accessToken === "token-b",
          "precondition: the global session HAS switched before the request fired",
        );
        rpcCalls.push({ token, opId });
        return { ok: true, generation: 1 };
      },
    });
    const pending = runPinnedCloudDelete(deps);
    // Switch the global session while the verify/pin step is in flight — after
    // getSession resolved A (microtask ordering: this runs before rpcWithToken).
    globalSession.current = { userId: "user-b", accessToken: "token-b" };
    const res = await pending;
    assert(res.ok, "the pinned request completed");
    assert(rpcCalls.length === 1 && rpcCalls[0].token === "token-a", "outgoing request carried A's CAPTURED token, not B's");
  });

  test("pinned request fails (expired token / network) → { ok: false }, retryable", async () => {
    const { deps, rpcCalls } = harness({
      rpcWithToken: async () => {
        throw new Error("401 expired token");
      },
    });
    const res = await runPinnedCloudDelete(deps);
    assert(!res.ok, "a failed pinned request resolves ok:false (machine → cloud_failed, marker retained)");
    assert(rpcCalls.length === 0, "the failing transport recorded nothing");
  });
});
