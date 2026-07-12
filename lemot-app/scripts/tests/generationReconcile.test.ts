/**
 * PR-I1 — startup generation-reconcile decisions (audit C1).
 *
 * The pure decision matrix behind the AppProvider first-pull effect:
 * missing/malformed sync-state rows fail closed (never baseline 0, no pull, no
 * merge, no push, no silent row creation); the fresh-install shortcut
 * ACKNOWLEDGES then CONTINUES the normal pull so valid post-deletion cloud data
 * is still pulled and merged; a nonempty device enters explicit recovery and
 * never pulls; equal generations (including a legitimate 0 from an existing
 * row) proceed normally. Merge algorithms are untouched — the decision only
 * chooses whether the unchanged pull/merge path runs.
 */
import { describe, test, assert } from "./harness";
import { makeFakeKv } from "./helpers";
import {
  decideGenerationReconcile,
  resolveGenerationReconcile,
} from "../../lib/generationReconcile";
import {
  hydrateSyncGeneration,
  isSyncGenerationReady,
  blockSyncGeneration,
  setSyncGeneration,
  syncGeneration,
  __resetSyncGenerationForTest,
} from "../../lib/syncGeneration";
import {
  LM_REMOTE_ERASE_RECOVERY_KEY,
  persistRemoteEraseRecovery,
  markRemoteEraseBlocked,
  remoteEraseStatusFor,
  isRemoteErasePending,
  hydrateRemoteEraseRecovery,
  __resetRemoteEraseRecoveryForTest,
  type RecoveryKv,
} from "../../lib/remoteEraseRecovery";

describe("PR-I1 — reconcile decision matrix", () => {
  test("missing/failed/malformed server generation (null) → fail closed", () => {
    const d = decideGenerationReconcile({
      serverGeneration: null, // fetch error, MISSING row, or malformed value
      localGeneration: 0,
      hasLearnerData: false,
    });
    assert(d.kind === "fail_closed" && d.reason === "fetch_failed", "null → fail closed, never baseline 0");
  });

  test("valid generation 0 from an EXISTING row remains valid (normal proceed)", () => {
    const d = decideGenerationReconcile({
      serverGeneration: 0,
      localGeneration: 0,
      hasLearnerData: true,
    });
    assert(d.kind === "proceed", "an existing row's legitimate 0 is not an anomaly");
  });

  test("server ahead + EMPTY device → acknowledge_and_pull (no recovery confirmation)", () => {
    const d = decideGenerationReconcile({
      serverGeneration: 1,
      localGeneration: 0,
      hasLearnerData: false,
    });
    assert(
      d.kind === "acknowledge_and_pull" && d.generation === 1,
      "truly empty device adopts the current generation and continues the pull",
    );
  });

  test("server ahead + NONEMPTY device → explicit recovery; no pull/apply", () => {
    const d = decideGenerationReconcile({
      serverGeneration: 1,
      localGeneration: 0,
      hasLearnerData: true,
    });
    assert(d.kind === "recovery" && d.targetGeneration === 1, "data present → recovery, never auto-pull");
  });

  test("local ahead of server → fail closed (never silently downgrade)", () => {
    const d = decideGenerationReconcile({
      serverGeneration: 1,
      localGeneration: 3,
      hasLearnerData: false,
    });
    assert(d.kind === "fail_closed" && d.reason === "local_ahead", "local>server anomaly fails closed");
  });
});

describe("PR-I1 — fresh-install acknowledge CONTINUES into the normal pull", () => {
  /**
   * Models the AppProvider effect's execution of the decision: only
   * `acknowledge_and_pull` and `proceed` reach the (unchanged) pull/merge path,
   * acknowledgement happens BEFORE the pull, and hasPulled is set only after the
   * pull path completes.
   */
  async function runReconcileFlow(args: {
    serverGeneration: number | null;
    localGeneration: number;
    hasLearnerData: boolean;
    cloudProgress: Record<string, boolean> | null;
  }) {
    const calls: string[] = [];
    const state = { hasPulled: false, applied: null as Record<string, boolean> | null };
    const decision = decideGenerationReconcile(args);
    if (decision.kind === "fail_closed") {
      calls.push("block");
      return { calls, state };
    }
    if (decision.kind === "recovery") {
      calls.push(`recovery:${decision.targetGeneration}`);
      state.hasPulled = true;
      return { calls, state };
    }
    if (decision.kind === "acknowledge_and_pull") {
      calls.push(`ack:${decision.generation}`);
    }
    // Normal (unchanged) pull/apply path:
    calls.push("pull");
    if (args.cloudProgress) {
      state.applied = args.cloudProgress; // merge/apply of pulled data
      calls.push("apply");
    }
    state.hasPulled = true;
    return { calls, state };
  }

  test("server 1 / local 0 / empty device / EMPTY cloud → acknowledge, pull, complete normally", async () => {
    const { calls, state } = await runReconcileFlow({
      serverGeneration: 1,
      localGeneration: 0,
      hasLearnerData: false,
      cloudProgress: null,
    });
    assert(calls.join(",") === "ack:1,pull", "acknowledged FIRST, then the normal pull ran");
    assert(state.hasPulled, "hasPulled set only after the pull path completed");
  });

  test("server 1 / local 0 / empty device / cloud HAS generation-1 progress → acknowledge, pull, APPLY it", async () => {
    const { calls, state } = await runReconcileFlow({
      serverGeneration: 1,
      localGeneration: 0,
      hasLearnerData: false,
      cloudProgress: { "1-read_listen": true },
    });
    assert(calls.join(",") === "ack:1,pull,apply", "post-deletion cloud data is pulled and applied");
    assert(state.applied?.["1-read_listen"] === true, "the generation-1 progress reached the device");
  });

  test("nonempty device: recovery only — the pull/apply path never runs", async () => {
    const { calls, state } = await runReconcileFlow({
      serverGeneration: 1,
      localGeneration: 0,
      hasLearnerData: true,
      cloudProgress: { "1-read_listen": true },
    });
    assert(calls.join(",") === "recovery:1", "no pull, no apply while recovery is pending");
    assert(state.applied === null, "cloud data is not applied over a device awaiting recovery");
  });

  test("missing row: block only — nothing pulls, merges, writes, or pushes", async () => {
    const { calls, state } = await runReconcileFlow({
      serverGeneration: null,
      localGeneration: 0,
      hasLearnerData: false,
      cloudProgress: { "1-read_listen": true },
    });
    assert(calls.join(",") === "block", "fail closed performs no sync side effects");
    assert(!state.hasPulled && state.applied === null, "no pull state, no applied data");
  });
});

describe("PR-I1 — fail-closed resolver: fetch first, inventory only when needed", () => {
  function harness(server: number | null | "throws", local: number, hasData: boolean | "throws") {
    let inventoryCalls = 0;
    const deps = {
      fetchServerGeneration: async () => {
        if (server === "throws") throw new Error("fetch blew up");
        return server;
      },
      localGeneration: () => local,
      hasLearnerData: async () => {
        inventoryCalls += 1;
        if (hasData === "throws") throw new Error("inventory read blew up");
        return hasData;
      },
    };
    return { deps, inventoryCalls: () => inventoryCalls };
  }

  test("server fetch null → fail closed, learner inventory NOT called", async () => {
    const h = harness(null, 0, true);
    const d = await resolveGenerationReconcile(h.deps);
    assert(d.kind === "fail_closed" && d.reason === "fetch_failed", "null fetch fails closed");
    assert(h.inventoryCalls() === 0, "inventory never scanned on a failed fetch");
  });

  test("server fetch THROWS → fail closed, inventory NOT called", async () => {
    const h = harness("throws", 0, true);
    const d = await resolveGenerationReconcile(h.deps);
    assert(d.kind === "fail_closed" && d.reason === "fetch_failed", "thrown fetch fails closed");
    assert(h.inventoryCalls() === 0, "inventory never scanned");
  });

  test("server == local → proceed, inventory NOT called", async () => {
    const h = harness(2, 2, true);
    const d = await resolveGenerationReconcile(h.deps);
    assert(d.kind === "proceed", "equal generations proceed");
    assert(h.inventoryCalls() === 0, "the empty-vs-recovery split is not needed");
  });

  test("server < local → fail closed, inventory NOT called", async () => {
    const h = harness(1, 3, true);
    const d = await resolveGenerationReconcile(h.deps);
    assert(d.kind === "fail_closed" && d.reason === "local_ahead", "local-ahead fails closed");
    assert(h.inventoryCalls() === 0, "inventory never scanned");
  });

  test("server > local → inventory checked; empty/nonempty behavior unchanged", async () => {
    const empty = harness(1, 0, false);
    const de = await resolveGenerationReconcile(empty.deps);
    assert(de.kind === "acknowledge_and_pull" && de.generation === 1, "empty device → acknowledge_and_pull");
    assert(empty.inventoryCalls() === 1, "inventory scanned exactly once");

    const full = harness(1, 0, true);
    const df = await resolveGenerationReconcile(full.deps);
    assert(df.kind === "recovery" && df.targetGeneration === 1, "nonempty device → recovery");
  });

  test("inventory read THROWS → fail closed (no pull/merge/write/push), exception contained", async () => {
    const h = harness(1, 0, "throws");
    const d = await resolveGenerationReconcile(h.deps);
    assert(
      d.kind === "fail_closed" && d.reason === "inventory_unreadable",
      "an unreadable inventory fails closed instead of escaping the effect",
    );
  });
});

describe("PR-I1 — recovery marker persistence fails closed (Codex P2-3)", () => {
  /**
   * Mirrors the AppProvider recovery branch (the source scan in
   * deleteSyncedDataWiring.test pins the real wiring to the same shape):
   * admission is blocked synchronously BEFORE the marker write is attempted; a
   * write failure is caught in place (never an unhandled rejection) and
   * surfaces the runtime blocked-not-actionable state; the pull/merge path
   * never runs from this branch in either outcome.
   */
  async function runRecoveryBranch(args: {
    store: RecoveryKv;
    order: string[];
  }): Promise<"own" | "blocked"> {
    args.order.push("block");
    blockSyncGeneration();
    try {
      await persistRemoteEraseRecovery({
        userId: "user-a",
        targetGeneration: 2,
        store: args.store,
      });
      args.order.push("own");
      return "own";
    } catch {
      markRemoteEraseBlocked();
      args.order.push("blocked");
      return "blocked";
    }
    // returns WITHOUT ever reaching a pull
  }

  test("persist FAILURE: blocked before the attempt, exception contained, sync stays blocked, UI blocked-not-actionable", async () => {
    __resetSyncGenerationForTest();
    __resetRemoteEraseRecoveryForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
    assert(isSyncGenerationReady(), "precondition: sync generation was admitted");

    const order: string[] = [];
    const failingStore: RecoveryKv = {
      getItem: () => null,
      setItem: () => {
        order.push("persist_attempt");
        throw new Error("marker persist failed");
      },
      removeItem: () => {},
    };
    const status = await runRecoveryBranch({ store: failingStore, order }); // resolves — never rejects
    assert(status === "blocked", "persistence failure yields the blocked outcome");
    assert(
      order.join(",") === "block,persist_attempt,blocked",
      "blockSyncGeneration ran BEFORE marker persistence began",
    );
    assert(!isSyncGenerationReady(), "sync generation stays blocked (no pull, no merge, no write, no push)");
    assert(isRemoteErasePending(), "the learner-mutation gate stays blocked");
    assert(
      remoteEraseStatusFor("user-a") === "blocked",
      "UI reports blocked — no owned durable marker exists, so no clear-this-device CTA",
    );

    // Clean re-hydrate for later suites.
    __resetSyncGenerationForTest();
    __resetRemoteEraseRecoveryForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
  });

  test("persist SUCCESS: still blocked until explicit confirmation, but the recovery is OWNED and actionable", async () => {
    __resetSyncGenerationForTest();
    __resetRemoteEraseRecoveryForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });

    const order: string[] = [];
    const kv = makeFakeKv();
    const recordingStore: RecoveryKv = {
      getItem: (k) => kv.getItem(k),
      setItem: (k, v) => {
        order.push("persist_attempt");
        return kv.setItem(k, v);
      },
      removeItem: (k) => kv.removeItem(k),
    };
    const status = await runRecoveryBranch({ store: recordingStore, order });
    assert(status === "own", "successful persistence yields the owned outcome");
    assert(order.join(",") === "block,persist_attempt,own", "block still precedes the persistence attempt");
    assert(kv.map.has(LM_REMOTE_ERASE_RECOVERY_KEY), "the user-bound marker was durably written");
    assert(remoteEraseStatusFor("user-a") === "own", "owned actionable recovery for the current user");
    assert(!isSyncGenerationReady(), "sync stays blocked until the user explicitly confirms");
    assert(isRemoteErasePending(), "learning stays gated until the confirmation completes");

    // Clean re-hydrate for later suites.
    __resetSyncGenerationForTest();
    __resetRemoteEraseRecoveryForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
  });
});

describe("PR-I1 — fresh-install acknowledgement fails closed (Codex P2, round 2)", () => {
  /**
   * Mirrors the AppProvider acknowledge_and_pull branch (the source scan in
   * deleteSyncedDataWiring.test pins the real wiring to the same shape):
   * blockSyncGeneration runs BEFORE the durable acknowledgement is attempted;
   * on success the branch FALLS THROUGH into exactly one normal pull; on
   * failure the exception is contained, nothing pulls/merges/writes/pushes,
   * and the runtime surfaces blocked-not-actionable.
   */
  async function runAckBranch(args: {
    store: Parameters<typeof setSyncGeneration>[0]["store"];
    order: string[];
    pull: () => void;
  }): Promise<"pulled" | "blocked"> {
    args.order.push("block");
    blockSyncGeneration();
    try {
      await setSyncGeneration({ userId: "user-a", generation: 1, store: args.store });
    } catch {
      markRemoteEraseBlocked();
      args.order.push("blocked");
      return "blocked"; // no pull, no merge, no local write, no push
    }
    // Success: fall through into the (unchanged) normal pull path.
    args.pull();
    args.order.push("pulled");
    return "pulled";
  }

  test("ack persist FAILURE: blocked before the attempt, contained, zero pull, gates blocked, status blocked not own", async () => {
    __resetSyncGenerationForTest();
    __resetRemoteEraseRecoveryForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
    assert(isSyncGenerationReady(), "precondition: the old baseline was admitted after hydration");

    const order: string[] = [];
    let pulls = 0;
    const failingStore = {
      getItem: () => null,
      setItem: () => {
        order.push("persist_attempt");
        throw new Error("acknowledgement persist failed");
      },
      removeItem: () => {},
    };
    const outcome = await runAckBranch({
      store: failingStore,
      order,
      pull: () => {
        pulls += 1;
      },
    }); // resolves — never rejects
    assert(outcome === "blocked", "the failure outcome is blocked");
    assert(
      order.join(",") === "block,persist_attempt,blocked",
      "blockSyncGeneration ran BEFORE the acknowledgement persistence began",
    );
    assert(pulls === 0, "zero pull/merge/local-write/push after the failure");
    assert(!isSyncGenerationReady(), "sync generation stays NOT ready");
    assert(isRemoteErasePending(), "the learner-mutation gate stays blocked");
    assert(
      remoteEraseStatusFor("user-a") === "blocked",
      "UI reports blocked, NOT own — no owned marker exists, so no clear-this-device",
    );

    __resetSyncGenerationForTest();
    __resetRemoteEraseRecoveryForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
  });

  test("ack persist SUCCESS: still blocked-then-acknowledged, and exactly ONE normal pull runs", async () => {
    __resetSyncGenerationForTest();
    __resetRemoteEraseRecoveryForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });

    const order: string[] = [];
    let pulls = 0;
    const kv = makeFakeKv();
    const recordingStore = {
      getItem: (k: string) => kv.getItem(k),
      setItem: (k: string, v: string) => {
        order.push("persist_attempt");
        return kv.setItem(k, v);
      },
      removeItem: (k: string) => kv.removeItem(k),
    };
    const outcome = await runAckBranch({
      store: recordingStore,
      order,
      pull: () => {
        pulls += 1;
      },
    });
    assert(outcome === "pulled", "successful acknowledgement continues into the pull");
    assert(
      order.join(",") === "block,persist_attempt,pulled",
      "block still precedes the persistence attempt; the pull runs after success",
    );
    assert(pulls === 1, "exactly one normal pull");
    assert(isSyncGenerationReady() && syncGeneration() === 1, "the acknowledged generation is ready");
    assert(!isRemoteErasePending(), "no recovery state on the success path");

    __resetSyncGenerationForTest();
    __resetRemoteEraseRecoveryForTest();
    await hydrateSyncGeneration({ userId: "user-a", store: makeFakeKv() });
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
  });
});
