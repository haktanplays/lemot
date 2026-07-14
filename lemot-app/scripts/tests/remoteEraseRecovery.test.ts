/**
 * PR-I1 — remote-erase recovery marker (audit C1, no automatic second-device wipe).
 *
 * The marker is user-bound and blocks sync until the OWNING user explicitly
 * confirms. These verify hydration (absent/own/foreign/corrupt/unreadable),
 * persist/clear, and that a foreign/corrupt marker blocks but is not actionable
 * and is never reinterpreted.
 */
import { describe, test, assert } from "./harness";
import { makeFakeKv } from "./helpers";
import {
  LM_REMOTE_ERASE_RECOVERY_KEY,
  isRemoteErasePending,
  isRemoteEraseRecoveryHydrated,
  remoteEraseRecovery,
  remoteEraseStatusFor,
  markRemoteEraseBlocked,
  hydrateRemoteEraseRecovery,
  persistRemoteEraseRecovery,
  clearRemoteEraseRecovery,
  __resetRemoteEraseRecoveryForTest,
  type RecoveryKv,
} from "../../lib/remoteEraseRecovery";

const rec = (userId: string, targetGeneration: number) =>
  JSON.stringify({ version: 1, userId, targetGeneration });

describe("PR-I1 — remote-erase recovery marker", () => {
  test("absent → no recovery pending", async () => {
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
    assert(!isRemoteErasePending(), "no marker → not pending");
    assert(remoteEraseRecovery() === null, "no actionable record");
  });

  test("own valid marker → actionable pending", async () => {
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({
      userId: "user-a",
      store: makeFakeKv({ [LM_REMOTE_ERASE_RECOVERY_KEY]: rec("user-a", 4) }),
    });
    assert(isRemoteErasePending(), "own marker → pending");
    const r = remoteEraseRecovery();
    assert(r != null && r.userId === "user-a" && r.targetGeneration === 4, "actionable record for owner");
  });

  test("foreign marker → pending (blocked) but NOT actionable, not overwritten", async () => {
    __resetRemoteEraseRecoveryForTest();
    const kv = makeFakeKv({ [LM_REMOTE_ERASE_RECOVERY_KEY]: rec("user-b", 7) });
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: kv });
    assert(isRemoteErasePending(), "foreign marker still blocks sync (fail closed)");
    assert(remoteEraseRecovery() === null, "not actionable under a different user");
    assert(kv.map.get(LM_REMOTE_ERASE_RECOVERY_KEY) === rec("user-b", 7), "foreign marker not reinterpreted/overwritten");
  });

  test("corrupt marker → pending (blocked), not actionable", async () => {
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({
      userId: "user-a",
      store: makeFakeKv({ [LM_REMOTE_ERASE_RECOVERY_KEY]: "{broken" }),
    });
    assert(isRemoteErasePending() && remoteEraseRecovery() === null, "corrupt → blocked, not actionable");
  });

  test("read failure → pending (fail closed)", async () => {
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({
      userId: "user-a",
      store: {
        getItem: () => {
          throw new Error("read failed");
        },
        setItem: () => {},
        removeItem: () => {},
      },
    });
    assert(isRemoteErasePending(), "unreadable → fail closed (blocked)");
  });

  test("persist then clear", async () => {
    __resetRemoteEraseRecoveryForTest();
    const kv = makeFakeKv();
    await persistRemoteEraseRecovery({ userId: "user-a", targetGeneration: 2, store: kv });
    assert(isRemoteErasePending(), "persisted → pending");
    assert(kv.map.get(LM_REMOTE_ERASE_RECOVERY_KEY) === rec("user-a", 2), "user-bound marker persisted");
    await clearRemoteEraseRecovery(kv);
    assert(!isRemoteErasePending() && !kv.map.has(LM_REMOTE_ERASE_RECOVERY_KEY), "cleared");
  });
});

describe("PR-I1 — remote-erase UI status (Codex P2-2/P2-3)", () => {
  test('own valid marker → "own" for the owner only; anyone else sees "blocked"', async () => {
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({
      userId: "user-a",
      store: makeFakeKv({ [LM_REMOTE_ERASE_RECOVERY_KEY]: rec("user-a", 4) }),
    });
    assert(remoteEraseStatusFor("user-a") === "own", "owner sees the actionable status");
    assert(remoteEraseStatusFor("user-b") === "blocked", "any other user sees blocked, never actionable");
    assert(remoteEraseStatusFor(undefined) === "blocked", "no signed-in user → blocked, never actionable");
  });

  test('foreign / corrupt marker → "blocked"; absent → "none"', async () => {
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({
      userId: "user-a",
      store: makeFakeKv({ [LM_REMOTE_ERASE_RECOVERY_KEY]: rec("user-b", 7) }),
    });
    assert(remoteEraseStatusFor("user-a") === "blocked", "foreign marker → blocked, no CTA");
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({
      userId: "user-a",
      store: makeFakeKv({ [LM_REMOTE_ERASE_RECOVERY_KEY]: "{broken" }),
    });
    assert(remoteEraseStatusFor("user-a") === "blocked", "corrupt marker → blocked, no CTA");
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
    assert(remoteEraseStatusFor("user-a") === "none", "no marker → none (no recovery panel)");
  });

  test("markRemoteEraseBlocked: runtime fail-closed — blocked + pending, nothing durable written", async () => {
    __resetRemoteEraseRecoveryForTest();
    const kv = makeFakeKv();
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: kv });
    markRemoteEraseBlocked();
    assert(isRemoteErasePending(), "sync + learner mutations stay blocked");
    assert(remoteEraseStatusFor("user-a") === "blocked", "blocked, NOT actionable — no owned durable marker exists");
    assert(remoteEraseRecovery() === null, "no actionable record is fabricated");
    assert(!kv.map.has(LM_REMOTE_ERASE_RECOVERY_KEY), "nothing durable was written or overwritten");
    // Leave the module in a clean hydrated state for later suites.
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
  });
});

describe("PR-I1 — stale recovery-marker hydrations are discarded (Codex P2)", () => {
  /** A KV whose read resolves/rejects only when the test says so. */
  function deferredKv() {
    let resolveRead!: (v: string | null) => void;
    let rejectRead!: (e: unknown) => void;
    const gate = new Promise<string | null>((res, rej) => {
      resolveRead = res;
      rejectRead = rej;
    });
    let writes = 0;
    let removes = 0;
    const kv: RecoveryKv = {
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

  test("A stalls → B resolves an OWNED actionable marker → A's late foreign result cannot flip B to blocked", async () => {
    __resetRemoteEraseRecoveryForTest();
    const dA = deferredKv(); // A's read of the (B-owned) shared marker, in flight
    const a = hydrateRemoteEraseRecovery({ userId: "user-a", store: dA.kv });
    await hydrateRemoteEraseRecovery({
      userId: "user-b",
      store: makeFakeKv({ [LM_REMOTE_ERASE_RECOVERY_KEY]: rec("user-b", 3) }),
    });
    assert(remoteEraseStatusFor("user-b") === "own", "B's marker is actionable");

    dA.resolveRead(rec("user-b", 3)); // foreign-for-A result lands late
    await a;
    assert(remoteEraseStatusFor("user-b") === "own", "stale foreign hydration cannot convert B's own → blocked");
    assert(remoteEraseRecovery()?.userId === "user-b", "B's actionable marker is unchanged");
    assert(dA.writes() === 0 && dA.removes() === 0, "a discarded hydration performs no storage write or delete");
  });

  test("an old A-OWNED read cannot become actionable under a newer user context", async () => {
    __resetRemoteEraseRecoveryForTest();
    const dA = deferredKv(); // would resolve an A-owned marker
    const a = hydrateRemoteEraseRecovery({ userId: "user-a", store: dA.kv });
    await hydrateRemoteEraseRecovery({ userId: "user-b", store: makeFakeKv() }); // B: none
    assert(remoteEraseStatusFor("user-b") === "none", "B sees no recovery state");

    dA.resolveRead(rec("user-a", 5)); // A's owned marker lands late
    await a;
    assert(remoteEraseRecovery() === null && !isRemoteErasePending(), "the stale OWN result did not become actionable");
    assert(remoteEraseStatusFor("user-b") === "none", "B's none state is untouched");
  });

  test("a stale read REJECTION cannot overwrite a newer valid result", async () => {
    __resetRemoteEraseRecoveryForTest();
    const dA = deferredKv();
    const a = hydrateRemoteEraseRecovery({ userId: "user-a", store: dA.kv });
    await hydrateRemoteEraseRecovery({
      userId: "user-b",
      store: makeFakeKv({ [LM_REMOTE_ERASE_RECOVERY_KEY]: rec("user-b", 3) }),
    });
    dA.rejectRead(new Error("slow read died"));
    await a; // must not reject
    assert(remoteEraseStatusFor("user-b") === "own", "B's owned actionable state survives the stale rejection");
    assert(isRemoteEraseRecoveryHydrated(), "the resolved hydrated state is not dropped");
  });

  test("persist / clear / runtime-block during an older read are never undone", async () => {
    // Persisting an owned marker: the old read cannot erase/replace it.
    __resetRemoteEraseRecoveryForTest();
    let d = deferredKv();
    let p = hydrateRemoteEraseRecovery({ userId: "user-a", store: d.kv });
    await persistRemoteEraseRecovery({ userId: "user-a", targetGeneration: 2, store: makeFakeKv() });
    d.resolveRead(null); // stale "absent" lands late
    await p;
    assert(remoteEraseStatusFor("user-a") === "own", "the old read cannot erase the newly persisted marker");

    // Clearing: the old read cannot resurrect the cleared marker.
    d = deferredKv();
    p = hydrateRemoteEraseRecovery({ userId: "user-a", store: d.kv });
    await clearRemoteEraseRecovery(makeFakeKv());
    d.resolveRead(rec("user-a", 2)); // the cleared marker's old content lands late
    await p;
    assert(
      remoteEraseRecovery() === null && !isRemoteErasePending(),
      "the old read cannot resurrect the cleared marker",
    );

    // Runtime block: the old read cannot clear or downgrade it.
    d = deferredKv();
    p = hydrateRemoteEraseRecovery({ userId: "user-a", store: d.kv });
    markRemoteEraseBlocked();
    d.resolveRead(null); // stale "absent" lands late
    await p;
    assert(
      isRemoteErasePending() && remoteEraseStatusFor("user-a") === "blocked",
      "the old read cannot undo the runtime blocked state",
    );

    // Leave the module in a clean hydrated state for later suites.
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
  });
});

describe("PR-I1 — async persist/clear vs in-flight hydration (Codex follow-up)", () => {
  /** A KV whose READ resolves only when the test says so. */
  function deferredReadKv() {
    let resolveRead!: (v: string | null) => void;
    const gate = new Promise<string | null>((res) => {
      resolveRead = res;
    });
    const kv: RecoveryKv = { getItem: () => gate, setItem: () => {}, removeItem: () => {} };
    return { kv, resolveRead };
  }
  /** A KV whose WRITE (setItem) settles only when the test says so. */
  function deferredWriteKv() {
    let resolveWrite!: () => void;
    let rejectWrite!: (e: unknown) => void;
    const gate = new Promise<void>((res, rej) => {
      resolveWrite = res;
      rejectWrite = rej;
    });
    const kv: RecoveryKv = { getItem: () => null, setItem: () => gate, removeItem: () => {} };
    return { kv, resolveWrite, rejectWrite };
  }
  /** A KV whose REMOVE settles only when the test says so. */
  function deferredRemoveKv() {
    let resolveRemove!: () => void;
    let rejectRemove!: (e: unknown) => void;
    const gate = new Promise<void>((res, rej) => {
      resolveRemove = res;
      rejectRemove = rej;
    });
    const kv: RecoveryKv = { getItem: () => null, setItem: () => {}, removeItem: () => gate };
    return { kv, resolveRemove, rejectRemove };
  }

  test("PERSIST: fail-closed (never none) while unresolved; pre-persist and mid-persist reads are both discarded", async () => {
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });

    const dH = deferredReadKv(); // old hydration, would resolve "absent → none"
    const h = hydrateRemoteEraseRecovery({ userId: "user-a", store: dH.kv });
    const w = deferredWriteKv();
    const persistP = persistRemoteEraseRecovery({ userId: "user-a", targetGeneration: 2, store: w.kv });
    assert(
      isRemoteErasePending() && remoteEraseStatusFor("user-a") === "blocked" && remoteEraseRecovery() === null,
      "synchronously fail-closed NON-actionable while the persist is unresolved — never a false none",
    );

    dH.resolveRead(null); // the old read lands mid-persist
    await h;
    assert(isRemoteErasePending(), "the stale read cannot restore none mid-persist");

    const dH2 = deferredReadKv(); // a hydration started DURING the persist
    const h2 = hydrateRemoteEraseRecovery({ userId: "user-a", store: dH2.kv });

    w.resolveWrite();
    await persistP;
    assert(remoteEraseStatusFor("user-a") === "own", "the owned marker is adopted after durable persistence");

    dH2.resolveRead(null);
    await h2;
    assert(
      remoteEraseStatusFor("user-a") === "own" && remoteEraseRecovery()?.userId === "user-a",
      "a mid-persist hydration cannot overwrite the adopted marker",
    );
  });

  test("PERSIST failure: throws, stays blocked-not-actionable; a stale read cannot undo the blocked state", async () => {
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
    const dH = deferredReadKv(); // would resolve "absent → none"
    const h = hydrateRemoteEraseRecovery({ userId: "user-a", store: dH.kv });
    const w = deferredWriteKv();
    const persistP = persistRemoteEraseRecovery({ userId: "user-a", targetGeneration: 2, store: w.kv });
    w.rejectWrite(new Error("marker persist failed"));
    let threw = false;
    try {
      await persistP;
    } catch {
      threw = true;
    }
    assert(threw, "a persistence failure still throws");
    assert(
      isRemoteErasePending() && remoteEraseStatusFor("user-a") === "blocked" && remoteEraseRecovery() === null,
      "remains blocked-not-actionable — no durable marker fabricated",
    );
    dH.resolveRead(null); // the older read lands after the failure
    await h;
    assert(
      isRemoteErasePending() && remoteEraseStatusFor("user-a") === "blocked",
      "the stale read cannot undo the blocked failure state",
    );
  });

  test("CLEAR: marker not reported cleared before durable removal; mid-remove reads cannot resurrect; failure keeps it pending", async () => {
    // Not reported cleared while the removal is unresolved (no concurrent read).
    __resetRemoteEraseRecoveryForTest();
    await persistRemoteEraseRecovery({ userId: "user-a", targetGeneration: 2, store: makeFakeKv() });
    const r1 = deferredRemoveKv();
    const clearP1 = clearRemoteEraseRecovery(r1.kv);
    assert(
      isRemoteErasePending() && remoteEraseStatusFor("user-a") === "own",
      "the marker is NOT reported cleared before the durable removal succeeds",
    );
    // A read started DURING the removal…
    const dH = deferredReadKv(); // would resolve the old marker content
    const h = hydrateRemoteEraseRecovery({ userId: "user-a", store: dH.kv });
    r1.resolveRemove();
    await clearP1;
    assert(!isRemoteErasePending() && remoteEraseRecovery() === null, "cleared after the durable removal");
    // …cannot resurrect the cleared marker afterwards.
    dH.resolveRead(rec("user-a", 2));
    await h;
    assert(
      !isRemoteErasePending() && remoteEraseRecovery() === null && remoteEraseStatusFor("user-a") === "none",
      "a mid-remove read cannot resurrect the cleared marker",
    );

    // Removal FAILURE without a concurrent read: the OWNED pending state is
    // retained as-is.
    await persistRemoteEraseRecovery({ userId: "user-a", targetGeneration: 2, store: makeFakeKv() });
    const r2 = deferredRemoveKv();
    const clearP2 = clearRemoteEraseRecovery(r2.kv);
    r2.rejectRemove(new Error("remove failed"));
    let threw = false;
    try {
      await clearP2;
    } catch {
      threw = true;
    }
    assert(threw, "a removal failure still throws");
    assert(
      isRemoteErasePending() && remoteEraseStatusFor("user-a") === "own",
      "the owned pending state is retained after the failed removal",
    );

    // Removal FAILURE with an OLD read in flight: the read's fail-closed start
    // suppressed the in-memory marker, so the failure restores a blocked-not-
    // actionable state (never none; the durable marker survives and the next
    // hydration refines it back to own), and the stale read is discarded.
    const dH2 = deferredReadKv(); // old read in flight (would resolve "absent")
    const h2 = hydrateRemoteEraseRecovery({ userId: "user-a", store: dH2.kv });
    const r3 = deferredRemoveKv();
    const clearP3 = clearRemoteEraseRecovery(r3.kv);
    r3.rejectRemove(new Error("remove failed again"));
    threw = false;
    try {
      await clearP3;
    } catch {
      threw = true;
    }
    assert(threw, "the interleaved removal failure also throws");
    assert(
      isRemoteErasePending() && remoteEraseStatusFor("user-a") === "blocked",
      "a failed removal is fail-closed (pending/blocked), never none",
    );
    dH2.resolveRead(null);
    await h2;
    assert(
      isRemoteErasePending() && remoteEraseStatusFor("user-a") !== "none",
      "the stale read cannot turn the failed removal into none",
    );
    // The durable marker survived, so a fresh hydration restores OWN.
    await hydrateRemoteEraseRecovery({
      userId: "user-a",
      store: makeFakeKv({ [LM_REMOTE_ERASE_RECOVERY_KEY]: rec("user-a", 2) }),
    });
    assert(remoteEraseStatusFor("user-a") === "own", "a fresh hydration refines the surviving marker back to own");

    // Leave the module in a clean hydrated state for later suites.
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
  });
});

describe("PR-I1 — failure-side invalidation of the persist window (Codex follow-up)", () => {
  test("a hydration STARTED DURING a failing persist is discarded — blocked, never none, nothing fabricated", async () => {
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });

    // The persist starts (start-side bump, blocked-not-actionable) and stalls…
    let rejectWrite!: (e: unknown) => void;
    const writeGate = new Promise<void>((res, rej) => {
      rejectWrite = rej;
    });
    const persistStore: RecoveryKv = {
      getItem: () => null,
      setItem: () => writeGate,
      removeItem: () => {},
    };
    const persistP = persistRemoteEraseRecovery({
      userId: "user-a",
      targetGeneration: 2,
      store: persistStore,
    });

    // …then a hydration starts AFTER the start-side bump, DURING the window.
    let resolveRead!: (v: string | null) => void;
    const readGate = new Promise<string | null>((res) => {
      resolveRead = res;
    });
    let staleWrites = 0;
    let staleRemoves = 0;
    const h = hydrateRemoteEraseRecovery({
      userId: "user-a",
      store: {
        getItem: () => readGate,
        setItem: () => {
          staleWrites += 1;
        },
        removeItem: () => {
          staleRemoves += 1;
        },
      },
    });

    rejectWrite(new Error("marker persist failed"));
    let threw = false;
    try {
      await persistP;
    } catch {
      threw = true;
    }
    assert(threw, "the persist failure still throws");
    assert(
      isRemoteErasePending() && remoteEraseStatusFor("user-a") === "blocked" && remoteEraseRecovery() === null,
      "blocked-not-actionable re-asserted after the failure — no durable marker fabricated",
    );

    // The mid-window read resolves with "absent" — normally none — and is discarded.
    resolveRead(null);
    await h;
    assert(
      isRemoteErasePending() && remoteEraseStatusFor("user-a") === "blocked",
      "the mid-persist hydration was discarded — status remains blocked, never none",
    );
    assert(remoteEraseRecovery() === null, "no actionable marker is exposed");
    assert(staleWrites === 0 && staleRemoves === 0, "the stale hydration performed no storage write or remove");

    // Leave the module in a clean hydrated state for later suites.
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
  });
});
