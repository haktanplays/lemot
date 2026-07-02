/**
 * Carryover Selector v0 tests (Faz 4C; spec §65.6).
 *
 * Candidates are built from REAL derived states (`deriveLexiqueMemory` over
 * hand-built ItemMastery), so the selector is exercised against genuine
 * Faz 4B output, not mocks. Covers: every exclusion gate, role assignment,
 * §65.6 priority ordering, all four budget caps, the target-share hard
 * check ("recycle cannot steal the lesson"), fail-closed edges (empty
 * lesson tags, zero targets), determinism, and no-mutation.
 */
import { describe, test, assert } from "./harness";
import type { ItemMastery } from "../../content/learning-engine/mastery";
import { deriveLexiqueMemory } from "../../content/learning-engine/lexique-memory";
import type { LexiqueMemoryState } from "../../content/learning-engine/lexique-memory";
import {
  selectCarryover,
  DEFAULT_MAX_VISIBLE_CARRYOVER_CHIPS,
  DEFAULT_MAX_RECYCLED_ITEMS_PER_SENTENCE,
  DEFAULT_MAX_EXPOSURE_ITEMS_PER_UNIT,
  DEFAULT_MAX_WEAK_ITEMS_PER_SENTENCE,
} from "../../content/learning-engine/carryover-selector";
import type {
  CarryoverCandidate,
  CarryoverSelectionInput,
} from "../../content/learning-engine/carryover-selector";

const DAY_MS = 24 * 60 * 60 * 1000;
const NOW = 1_800_000_000_000;

function mkMastery(overrides: Partial<ItemMastery> = {}): ItemMastery {
  return {
    itemId: "chunk:test",
    seenCount: 0,
    recognitionAttempts: 0,
    recognitionSuccess: 0,
    recognitionFailure: 0,
    productionAttempts: 0,
    productionSuccess: 0,
    productionFailure: 0,
    wrongCount: 0,
    skipCount: 0,
    precisionCount: 0,
    precisionTags: {},
    lastSeenAt: null,
    lastProducedAt: null,
    weakTags: {},
    isWeak: false,
    promptFadeLevel: "PF0",
    leitnerBox: 0,
    dueAt: null,
    monLexiqueStatus: "hidden",
    practiceEligibility: "none",
    ...overrides,
  };
}

function mem(overrides: Partial<ItemMastery>): LexiqueMemoryState {
  return deriveLexiqueMemory(mkMastery(overrides), NOW);
}

/** Weak owned item (weaknessReturn): P=2, 3 wrongs, seen 2 days ago. */
const weakMem = () =>
  mem({
    seenCount: 8,
    productionAttempts: 5,
    productionSuccess: 2,
    productionFailure: 3,
    wrongCount: 3,
    isWeak: true,
    lastSeenAt: NOW - 2 * DAY_MS,
    lastProducedAt: NOW - 2 * DAY_MS,
  });

/** Strong-but-stale item (decay-driven refreshDue): P=4, 20 days ago. */
const staleStrongMem = () =>
  mem({
    seenCount: 4,
    productionAttempts: 4,
    productionSuccess: 4,
    lastSeenAt: NOW - 20 * DAY_MS,
    lastProducedAt: NOW - 20 * DAY_MS,
  });

/** Healthy strong item (transferReady): P=4, 2 days ago. */
const strongMem = () =>
  mem({
    seenCount: 4,
    productionAttempts: 4,
    productionSuccess: 4,
    lastSeenAt: NOW - 2 * DAY_MS,
    lastProducedAt: NOW - 2 * DAY_MS,
  });

/** Supported item (no role unless recentCarryIn): P=2, 2 days ago. */
const supportedMem = () =>
  mem({
    seenCount: 2,
    productionAttempts: 2,
    productionSuccess: 2,
    lastSeenAt: NOW - 2 * DAY_MS,
    lastProducedAt: NOW - 2 * DAY_MS,
  });

/** Exposure-only ghost: seen in model answers only. */
const exposureMem = () =>
  mem({ seenCount: 3, lastSeenAt: NOW - 2 * DAY_MS });

/** Strong but seen again very recently (too-recent exclusion). */
const tooRecentStrongMem = () =>
  mem({
    seenCount: 5,
    productionAttempts: 4,
    productionSuccess: 4,
    lastSeenAt: NOW - DAY_MS / 2,
    lastProducedAt: NOW - 2 * DAY_MS,
  });

function cand(
  itemId: string,
  memory: LexiqueMemoryState,
  extra: Partial<CarryoverCandidate> = {},
): CarryoverCandidate {
  return {
    itemId,
    surface: itemId.replace(/^chunk:/, ""),
    contextTags: ["cafe"],
    memory,
    ...extra,
  };
}

function run(
  candidates: CarryoverCandidate[],
  overrides: Partial<CarryoverSelectionInput> = {},
) {
  return selectCarryover({
    candidates,
    lessonContextTags: ["cafe"],
    targetItemIds: ["chunk:target-a", "chunk:target-b", "chunk:target-c"],
    now: NOW,
    ...overrides,
  });
}

function exclusionReason(result: ReturnType<typeof selectCarryover>, itemId: string): string | null {
  return result.excluded.find((e) => e.itemId === itemId)?.reason ?? null;
}

describe("carryover selector › exclusion gates", () => {
  test("context-fit is a hard gate", () => {
    const r = run([cand("chunk:hotel-item", strongMem(), { contextTags: ["hotel"] })]);
    assert(r.selected.length === 0, "no selection expected");
    assert(
      exclusionReason(r, "chunk:hotel-item") === "not context-fit",
      `got ${exclusionReason(r, "chunk:hotel-item")}`,
    );
  });

  test("empty lessonContextTags fails closed", () => {
    const r = run([cand("chunk:a", strongMem())], { lessonContextTags: [] });
    assert(r.selected.length === 0, "fail-closed: nothing fits an untagged lesson");
    assert(exclusionReason(r, "chunk:a") === "not context-fit", "reason");
  });

  test("lesson targets are never carryover", () => {
    const r = run([
      cand("chunk:target-a", strongMem()),
      cand("chunk:flagged", strongMem(), { targetOverlap: true }),
    ]);
    assert(exclusionReason(r, "chunk:target-a") === "is a lesson target", "by id");
    assert(exclusionReason(r, "chunk:flagged") === "is a lesson target", "by flag");
  });

  test("full-sentence chips and ambiguous identities are excluded", () => {
    const r = run([
      cand("chunk:je-suis-ici", strongMem(), { isFullSentenceChip: true }),
      cand("chunk:un-cafe", strongMem(), { hasIdentityAmbiguity: true }),
    ]);
    assert(exclusionReason(r, "chunk:je-suis-ici") === "full-sentence chip", "sentence chip");
    assert(exclusionReason(r, "chunk:un-cafe") === "identity ambiguity", "ambiguity");
  });

  test("exposure-only never fills a production slot", () => {
    const r = run([cand("chunk:pour-parler", exposureMem(), { requiresProduction: true })]);
    assert(
      exclusionReason(r, "chunk:pour-parler") === "exposure-only in a production slot",
      `got ${exclusionReason(r, "chunk:pour-parler")}`,
    );
  });

  test("unknown lifecycle is never selectable, even flagged recentCarryIn", () => {
    // Never-contacted item with matching context and a (wrong) caller flag:
    // must be hard-excluded before role assignment and consume no budget.
    const unknown = mem({}); // no contact at all → lifecycleStatus "unknown"
    const r = run([
      cand("chunk:never-taught", unknown, { recentCarryIn: true }),
      cand("chunk:weak", weakMem()),
    ]);
    assert(
      exclusionReason(r, "chunk:never-taught") === "never contacted",
      `got ${exclusionReason(r, "chunk:never-taught")}`,
    );
    assert(
      r.selected.every((s) => s.itemId !== "chunk:never-taught"),
      "unknown item must never be selected",
    );
    assert(
      r.selected.length === 1 && r.selected[0].itemId === "chunk:weak",
      "budget must remain fully available to real candidates",
    );
  });

  test("too recent and already strong is excluded", () => {
    const r = run([cand("chunk:bonjour", tooRecentStrongMem())]);
    assert(
      exclusionReason(r, "chunk:bonjour") === "too recent and already strong",
      `got ${exclusionReason(r, "chunk:bonjour")}`,
    );
  });

  test("supported item without recentCarryIn has no role; with it, it is selected", () => {
    const bare = run([cand("chunk:je-suis", supportedMem())]);
    assert(exclusionReason(bare, "chunk:je-suis") === "no carryover role", "no role");
    const flagged = run([cand("chunk:je-suis", supportedMem(), { recentCarryIn: true })]);
    assert(flagged.selected.length === 1, "recentCarryIn admits it");
    assert(flagged.selected[0].role === "recentCarryIn", `got ${flagged.selected[0].role}`);
  });
});

describe("carryover selector › roles and priority", () => {
  test("roles: weaknessReturn / refreshDue / transferReady derive from memory", () => {
    const r = run(
      [
        cand("chunk:weak", weakMem()),
        cand("chunk:stale", staleStrongMem()),
        cand("chunk:strong", strongMem()),
      ],
      { maxRecycledItemsPerSentence: 3 },
    );
    const roleOf = (id: string) => r.selected.find((s) => s.itemId === id)?.role;
    assert(roleOf("chunk:weak") === "weaknessReturn", `weak → ${roleOf("chunk:weak")}`);
    assert(roleOf("chunk:stale") === "refreshDue", `stale → ${roleOf("chunk:stale")}`);
    assert(roleOf("chunk:strong") === "transferReady", `strong → ${roleOf("chunk:strong")}`);
  });

  test("priority ordering follows §65.6: weakness > refreshDue/transfer > recentCarryIn", () => {
    const r = run(
      [
        cand("chunk:recent", supportedMem(), { recentCarryIn: true }),
        cand("chunk:strong", strongMem()),
        cand("chunk:weak", weakMem()),
        cand("chunk:stale", staleStrongMem()),
      ],
      {
        targetItemIds: ["t1", "t2", "t3", "t4"],
        maxVisibleCarryoverChips: 4,
        maxRecycledItemsPerSentence: 4,
      },
    );
    const order = r.selected.map((s) => s.itemId);
    assert(order[0] === "chunk:weak", `weakness must lead, got ${order.join(", ")}`);
    assert(
      order[order.length - 1] === "chunk:recent",
      `recentCarryIn must rank last, got ${order.join(", ")}`,
    );
    for (let i = 1; i < r.selected.length; i++) {
      assert(
        r.selected[i - 1].priorityScore >= r.selected[i].priorityScore,
        "selected must be priority-ordered",
      );
    }
  });

  test("deterministic tie-break by itemId", () => {
    const r = run(
      [cand("chunk:b", strongMem()), cand("chunk:a", strongMem())],
      { targetItemIds: ["t1", "t2"] },
    );
    assert(
      r.selected.map((s) => s.itemId).join(",") === "chunk:a,chunk:b",
      `got ${r.selected.map((s) => s.itemId).join(",")}`,
    );
  });
});

describe("carryover selector › budget caps", () => {
  test("visible carryover cap binds at 3", () => {
    const r = run(
      [
        cand("chunk:weak", weakMem()),
        cand("chunk:stale", staleStrongMem()),
        cand("chunk:strong", strongMem()),
        cand("chunk:recent", supportedMem(), { recentCarryIn: true }),
      ],
      {
        targetItemIds: ["t1", "t2", "t3", "t4", "t5"],
        maxRecycledItemsPerSentence: 4,
      },
    );
    assert(r.selected.length === 3, `expected 3 selected, got ${r.selected.length}`);
    assert(
      exclusionReason(r, "chunk:recent") === "visible carryover cap",
      `lowest priority must hit the visible cap, got ${exclusionReason(r, "chunk:recent")}`,
    );
  });

  test("recycled (owned) items cap binds at 2", () => {
    const r = run(
      [
        cand("chunk:weak", weakMem()),
        cand("chunk:stale", staleStrongMem()),
        cand("chunk:strong", strongMem()),
      ],
      { targetItemIds: ["t1", "t2", "t3", "t4"] },
    );
    assert(r.selected.length === 2, `expected 2 owned selections, got ${r.selected.length}`);
    assert(
      exclusionReason(r, "chunk:strong") === "recycled items cap",
      `got ${exclusionReason(r, "chunk:strong")}`,
    );
  });

  test("weak items cap binds at 1", () => {
    const weakA = cand("chunk:weak-a", weakMem());
    const weakB = cand("chunk:weak-b", weakMem());
    const r = run([weakA, weakB], { targetItemIds: ["t1", "t2", "t3"] });
    assert(r.selected.length === 1, `expected 1 weak selection, got ${r.selected.length}`);
    assert(
      exclusionReason(r, "chunk:weak-b") === "weak items cap",
      `got ${exclusionReason(r, "chunk:weak-b")}`,
    );
  });

  test("exposure cap is separate from the recycled cap", () => {
    const r = run(
      [
        cand("chunk:exp-a", exposureMem(), { recentCarryIn: true }),
        cand("chunk:exp-b", exposureMem(), { recentCarryIn: true }),
        cand("chunk:exp-c", exposureMem(), { recentCarryIn: true }),
      ],
      { targetItemIds: ["t1", "t2", "t3"], maxVisibleCarryoverChips: 3 },
    );
    assert(r.selected.length === 2, `exposure cap 2, got ${r.selected.length}`);
    assert(
      exclusionReason(r, "chunk:exp-c") === "exposure cap",
      `got ${exclusionReason(r, "chunk:exp-c")}`,
    );
  });
});

describe("carryover selector › target load protection", () => {
  test("recycle cannot steal the lesson: selections ≤ target count at share 0.50", () => {
    const r = run(
      [cand("chunk:weak", weakMem()), cand("chunk:stale", staleStrongMem())],
      { targetItemIds: ["chunk:only-target"] },
    );
    assert(r.selected.length === 1, `one target allows one carryover, got ${r.selected.length}`);
    assert(
      exclusionReason(r, "chunk:stale") === "target load share protection",
      `got ${exclusionReason(r, "chunk:stale")}`,
    );
  });

  test("zero targets → zero carryover (fail-closed)", () => {
    const r = run([cand("chunk:weak", weakMem())], { targetItemIds: [] });
    assert(r.selected.length === 0, "nothing to protect → nothing selected");
    assert(
      exclusionReason(r, "chunk:weak") === "target load share protection",
      `got ${exclusionReason(r, "chunk:weak")}`,
    );
  });
});

describe("carryover selector › purity and result shape", () => {
  test("deterministic and non-mutating (query-time role, no stored mutation)", () => {
    const candidates = [
      cand("chunk:weak", weakMem()),
      cand("chunk:strong", strongMem()),
    ];
    const before = JSON.stringify(candidates);
    const a = run(candidates);
    const b = run(candidates);
    assert(JSON.stringify(a) === JSON.stringify(b), "same input must select identically");
    assert(JSON.stringify(candidates) === before, "candidates/memory must not be mutated");
    for (const s of a.selected) {
      const c = candidates.find((x) => x.itemId === s.itemId)!;
      assert(
        (c.memory.lifecycleStatus as string) !== "recycled",
        "lifecycle must never become recycled — the role lives only on the selection",
      );
    }
  });

  test("budget echo carries the §65.6 defaults", () => {
    const r = run([]);
    assert(r.budget.maxVisibleCarryoverChips === DEFAULT_MAX_VISIBLE_CARRYOVER_CHIPS, "visible");
    assert(
      r.budget.maxRecycledItemsPerSentence === DEFAULT_MAX_RECYCLED_ITEMS_PER_SENTENCE,
      "recycled",
    );
    assert(r.budget.maxExposureItemsPerUnit === DEFAULT_MAX_EXPOSURE_ITEMS_PER_UNIT, "exposure");
    assert(r.budget.maxWeakItemsPerSentence === DEFAULT_MAX_WEAK_ITEMS_PER_SENTENCE, "weak");
    assert(r.budget.targetLoadMinShare === 0.5, "share");
  });
});
