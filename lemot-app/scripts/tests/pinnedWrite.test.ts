/**
 * PR-I1 — auth-PINNED generation-aware cloud writes (Codex P1, round 4 —
 * cross-account write race).
 *
 * Proves the verify-then-pin write step and its hook wiring shape: a payload
 * created by user A executes as a VERIFIED A (captured token + captured
 * generation) or not at all — it never follows a mutable global session into
 * account B; a ready generation owned by another user is rejected locally
 * before any session lookup; skipped writes send nothing and never trigger the
 * stale-generation handoff; and the cloud-write admission/release (erase
 * drain) semantics hold on every path, including thrown ones.
 */
import { describe, test, assert } from "./harness";
import { makeFakeKv } from "./helpers";
import { runPinnedCloudWrite, type PinnedWriteDeps } from "../../lib/pinnedWrite";
import {
  admitCloudWrite,
  releaseCloudWrite,
  activeCloudWriteCount,
  hydrateCloudEraseGuard,
  __resetCloudEraseGuardForTest,
} from "../../lib/cloudEraseGuard";

function val<T>(x: T): T {
  return x;
}

type Sent = { token: string; generation: number };

function harness(over: Partial<PinnedWriteDeps> = {}) {
  const sent: Sent[] = [];
  const deps: PinnedWriteDeps = {
    expectedUserId: "user-a",
    generationUserId: () => "user-a",
    generation: () => 3,
    getSession: async () => ({ userId: "user-a", accessToken: "token-a" }),
    send: async (token, generation) => {
      sent.push({ token, generation });
      return { errorMessage: null };
    },
    ...over,
  };
  return { deps, sent };
}

describe("PR-I1 — pinned writes skip on any identity break (nothing sent)", () => {
  test("1. stale A callback while the session is B's → no request; B receives no payload", async () => {
    const { deps, sent } = harness({
      getSession: async () => ({ userId: "user-b", accessToken: "token-b" }),
    });
    const r = await runPinnedCloudWrite(deps);
    assert(r.kind === "skipped", "switched session → skipped");
    assert(sent.length === 0, "no request was sent — B cannot receive A's payload");
  });

  test("2. missing session → no request", async () => {
    const { deps, sent } = harness({ getSession: async () => null });
    assert((await runPinnedCloudWrite(deps)).kind === "skipped", "no session → skipped");
    assert(sent.length === 0, "nothing sent");
  });

  test("2b. session read THROWS → no request (treated as missing)", async () => {
    const { deps, sent } = harness({
      getSession: async () => {
        throw new Error("auth storage unreadable");
      },
    });
    assert((await runPinnedCloudWrite(deps)).kind === "skipped", "thrown session read → skipped");
    assert(sent.length === 0, "nothing sent");
  });

  test("3. generation owned by B while the payload is A's → rejected locally, no session lookup", async () => {
    let sessionReads = 0;
    const { deps, sent } = harness({
      generationUserId: () => "user-b",
      getSession: async () => {
        sessionReads += 1;
        return { userId: "user-a", accessToken: "token-a" };
      },
    });
    assert((await runPinnedCloudWrite(deps)).kind === "skipped", "foreign generation → skipped");
    assert(sent.length === 0 && val(sessionReads) === 0, "rejected BEFORE any session lookup or request");
  });
});

describe("PR-I1 — pinned writes execute as the VERIFIED owner with captured values", () => {
  test("4. token captured, then the global session switches to B → the request still carries A's token", async () => {
    const globalSession = {
      current: { userId: "user-a", accessToken: "token-a" },
    };
    const { deps, sent } = harness({
      getSession: async () => globalSession.current,
      send: async (token, generation) => {
        assert(
          globalSession.current.accessToken === "token-b",
          "precondition: the global session switched before the request fired",
        );
        sent.push({ token, generation });
        return { errorMessage: null };
      },
    });
    const pending = runPinnedCloudWrite(deps);
    globalSession.current = { userId: "user-b", accessToken: "token-b" }; // switch mid-flight
    const r = await pending;
    assert(r.kind === "sent" && r.errorMessage === null, "the pinned request completed");
    assert(sent.length === 1 && sent[0].token === "token-a", "outgoing request carried A's CAPTURED token, never B's");
  });

  test("5+6. exactly one request with A's token and A's generation (progress and error shapes share this step)", async () => {
    const { deps, sent } = harness();
    const r = await runPinnedCloudWrite(deps);
    assert(r.kind === "sent" && r.errorMessage === null, "sent");
    assert(sent.length === 1, "exactly one request");
    assert(sent[0].token === "token-a" && sent[0].generation === 3, "captured token + captured generation");
  });

  test("7. the generation changes in memory during the session lookup → the PRE-await captured value is sent", async () => {
    const gen = { current: 3 };
    const { deps, sent } = harness({
      generation: () => gen.current,
      getSession: async () => {
        gen.current = 9; // an account transition mutates the in-memory generation
        return { userId: "user-a", accessToken: "token-a" };
      },
    });
    await runPinnedCloudWrite(deps);
    assert(sent.length === 1 && sent[0].generation === 3, "the generation captured BEFORE the await was sent");
  });

  test("a thrown transport resolves as a sent-failure (never an unhandled rejection)", async () => {
    const { deps } = harness({
      send: async () => {
        throw new Error("network died");
      },
    });
    const r = await runPinnedCloudWrite(deps);
    assert(r.kind === "sent" && r.errorMessage === "network died", "thrown transport becomes an error result");
  });
});

describe("PR-I1 — hook-shaped mismatch + admission/release semantics", () => {
  /** Mirrors the useProgressSync write path (pinned by the wiring source scan):
   * admit → runPinnedCloudWrite → stale-signal handoff only on a SENT result
   * whose error carries the existing signal → release in finally, always. */
  async function pushMirror(args: {
    deps: PinnedWriteDeps;
    onGenerationMismatch: () => void;
  }): Promise<{ released: number }> {
    let released = 0;
    const token = admitCloudWrite();
    if (token === null) return { released };
    try {
      const result = await runPinnedCloudWrite(args.deps);
      if (result.kind === "sent" && result.errorMessage !== null) {
        if (result.errorMessage.includes("stale sync generation")) {
          args.onGenerationMismatch();
        }
      }
    } finally {
      released += 1;
      releaseCloudWrite(token);
    }
    return { released };
  }

  test("8+9. stale-generation response → handoff exactly once; skips and non-stale failures → never", async () => {
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(makeFakeKv());
    let mismatches = 0;
    const onGenerationMismatch = () => {
      mismatches += 1;
    };
    // Stale-generation rejection → exactly one handoff.
    const stale = harness({
      send: async () => ({ errorMessage: 'rpc failed (400): {"message":"stale sync generation (0 <> 1)"}' }),
    });
    await pushMirror({ deps: stale.deps, onGenerationMismatch });
    assert(val(mismatches) === 1, "stale-generation response → handoff exactly once");
    // Skipped write (switched session) → no handoff.
    const skipped = harness({ getSession: async () => null });
    await pushMirror({ deps: skipped.deps, onGenerationMismatch });
    assert(val(mismatches) === 1, "a skipped write never triggers the handoff");
    // Non-stale failure (expired token / network / server error) → no handoff.
    const nonStale = harness({
      send: async () => ({ errorMessage: "rpc failed (401): JWT expired" }),
    });
    await pushMirror({ deps: nonStale.deps, onGenerationMismatch });
    assert(val(mismatches) === 1, "non-stale failures never trigger the handoff");
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(makeFakeKv());
  });

  test("10+11. release runs exactly once on every path; an in-flight pinned write stays DRAIN-visible until it settles", async () => {
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(makeFakeKv());

    // Thrown session path → released exactly once, nothing left active.
    const thrown = harness({
      getSession: async () => {
        throw new Error("boom");
      },
    });
    const r1 = await pushMirror({ deps: thrown.deps, onGenerationMismatch: () => {} });
    assert(r1.released === 1, "released exactly once on the thrown-session path");
    assert(activeCloudWriteCount() === 0, "no write left registered");

    // Deferred transport → the admitted write is COUNTED ACTIVE until settle
    // (the erase drain still sees pinned writes).
    let settle!: () => void;
    const gate = new Promise<void>((res) => {
      settle = res;
    });
    const slow = harness({
      send: async (token, generation) => {
        slow.sent.push({ token, generation });
        await gate;
        return { errorMessage: null };
      },
    });
    const inFlight = pushMirror({ deps: slow.deps, onGenerationMismatch: () => {} });
    await new Promise<void>((res) => setTimeout(res, 0));
    assert(activeCloudWriteCount() === 1, "the pinned write is drain-visible while its request is in flight");
    settle();
    const r2 = await inFlight;
    assert(r2.released === 1 && activeCloudWriteCount() === 0, "released exactly once after settle");

    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(makeFakeKv());
  });
});

describe("PR-I1 — Codex P1: mismatch handoff is bound to the REJECTED write's user", () => {
  /**
   * Mirrors the OWNER-QUALIFIED hook shape (pinned by the wiring source scan):
   * the stale-generation handoff passes the userId CAPTURED for the rejected
   * payload — never the account active when the response resolves — and the
   * provider side runs recovery only when that owner is still the active user.
   */
  const STALE = 'rpc failed (400): {"message":"stale sync generation (0 <> 1)"}';

  async function qualifiedPushMirror(args: {
    writeUserId: string;
    deps: PinnedWriteDeps;
    onGenerationMismatch: (rejectedUserId: string) => void;
  }): Promise<void> {
    const token = admitCloudWrite();
    if (token === null) return;
    try {
      const result = await runPinnedCloudWrite(args.deps);
      if (result.kind === "sent" && result.errorMessage !== null) {
        if (result.errorMessage.includes("stale sync generation")) {
          args.onGenerationMismatch(args.writeUserId);
        }
      }
    } finally {
      releaseCloudWrite(token);
    }
  }

  // Mirrors the provider-side owner gate: recovery runs ONLY for the still-active owner.
  function providerGate(activeUser: () => string | null, recoveries: string[]) {
    return (rejectedUserId: string) => {
      const active = activeUser();
      if (!active || rejectedUserId !== active) return; // A-bound rejection under B → ignored
      recoveries.push(rejectedUserId);
    };
  }

  test("A's stale response after an A→B switch carries A and is IGNORED by the gate", async () => {
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(makeFakeKv());

    let active: string | null = "user-a";
    const recoveries: string[] = [];
    const received: string[] = [];
    const gate = providerGate(() => active, recoveries);

    let settle!: () => void;
    const wait = new Promise<void>((res) => {
      settle = res;
    });
    const slow = harness({
      send: async () => {
        await wait; // A's request stays in flight…
        return { errorMessage: STALE };
      },
    });
    const run = qualifiedPushMirror({
      writeUserId: "user-a",
      deps: slow.deps,
      onGenerationMismatch: (rejected) => {
        received.push(rejected);
        gate(rejected);
      },
    });
    active = "user-b"; // …the account switches to B before the rejection returns
    settle();
    await run;

    assert(received.length === 1 && received[0] === "user-a", "the handoff carries the REJECTED write's user (A), not the active account");
    assert(recoveries.length === 0, "no recovery runs for B from A's rejected write");
  });

  test("stale response while the owner is STILL active → recovery runs exactly once for that owner", async () => {
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(makeFakeKv());
    const recoveries: string[] = [];
    const gate = providerGate(() => "user-a", recoveries);
    const stale = harness({ send: async () => ({ errorMessage: STALE }) });
    await qualifiedPushMirror({ writeUserId: "user-a", deps: stale.deps, onGenerationMismatch: gate });
    assert(recoveries.length === 1 && recoveries[0] === "user-a", "same-user mismatch recovery runs exactly once");
  });

  test("non-stale failures never invoke the qualified handoff (both write paths share the shape)", async () => {
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(makeFakeKv());
    const received: string[] = [];
    const nonStale = harness({ send: async () => ({ errorMessage: "rpc failed (401): JWT expired" }) });
    await qualifiedPushMirror({ writeUserId: "user-a", deps: nonStale.deps, onGenerationMismatch: (u) => received.push(u) });
    assert(received.length === 0, "auth/network failures do not trigger mismatch recovery");
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(makeFakeKv());
  });
});
