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
import { decideGenerationReconcile } from "../../lib/generationReconcile";

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
