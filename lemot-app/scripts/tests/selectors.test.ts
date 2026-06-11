/**
 * Mon Lexique + Practice Pool selector tests (PR-T follow-up).
 *
 * Locks two pure projector functions over the mastery snapshot:
 *   - `selectMonLexiqueEntries` (content/learning-engine/mon-lexique.ts)
 *   - `selectPracticePoolBuckets` (content/learning-engine/practice-pool.ts)
 *
 * Both are pure (no Date.now, storage, React, network, AI). Fixtures are built
 * with small LOCAL helpers (kept here, not in shared helpers.ts): a full
 * `ItemMastery` factory mirroring the engine's internal `emptyItem` defaults, a
 * snapshot builder, and a minimal `RawItem` registry entry. No production file
 * is changed; expected outputs are derived from the documented contracts so a
 * regression in inclusion, ordering, or learner-safe shape fails here.
 *
 * Pure tsx: type-only imports from the engine; no React Native / Expo loaded.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { selectMonLexiqueEntries } from "../../content/learning-engine/mon-lexique";
import { selectPracticePoolBuckets } from "../../content/learning-engine/practice-pool";
import type { ItemMastery, MasterySnapshot } from "../../content/learning-engine/mastery";
import type { ItemId, RawItem } from "../../content/learning-engine/types";

// ── Local fixture helpers (intentionally NOT exported / NOT shared) ──────────

/** Full `ItemMastery` with the engine's `emptyItem` defaults, then overrides. */
function makeItemMastery(
  itemId: string,
  overrides: Partial<ItemMastery> = {},
): ItemMastery {
  return {
    itemId,
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

function makeSnapshot(...items: ItemMastery[]): MasterySnapshot {
  const map: Record<ItemId, ItemMastery> = {};
  for (const it of items) map[it.itemId] = it;
  return {
    version: "test",
    items: map,
    processedClientEventIds: [],
    updatedAt: null,
  };
}

// Only `.text.{fr,en}` is read by the selectors; a partial cast keeps the
// fixture minimal (same idiom as the boundary test).
function makeRawItem(fr: string, en: string): RawItem {
  return { text: { fr, en } } as unknown as RawItem;
}

function ids<T extends { itemId: string }>(rows: T[]): string[] {
  return rows.map((r) => r.itemId);
}

// ── A. selectMonLexiqueEntries ──────────────────────────────────────────────

describe("selectMonLexiqueEntries", () => {
  test("hidden monLexiqueStatus is excluded", () => {
    const snapshot = makeSnapshot(
      makeItemMastery("h", { monLexiqueStatus: "hidden" }),
    );
    const out = selectMonLexiqueEntries({
      items: { h: makeRawItem("fr", "en") },
      snapshot,
    });
    assertEqual(out.length, 0, "hidden item must not appear");
  });

  test("item missing from registry is excluded", () => {
    const snapshot = makeSnapshot(
      makeItemMastery("a", { monLexiqueStatus: "added" }),
    );
    const out = selectMonLexiqueEntries({ items: {}, snapshot });
    assertEqual(out.length, 0, "no registry surface → excluded");
  });

  test("malformed registry text with empty fr or en is excluded", () => {
    const snapshot = makeSnapshot(
      makeItemMastery("a", { monLexiqueStatus: "added" }),
      makeItemMastery("b", { monLexiqueStatus: "added" }),
    );
    const out = selectMonLexiqueEntries({
      items: { a: makeRawItem("", "hello"), b: makeRawItem("bonjour", "") },
      snapshot,
    });
    assertEqual(out.length, 0, "empty fr or en → excluded");
  });

  test("weak entries sort before added entries", () => {
    const snapshot = makeSnapshot(
      makeItemMastery("a", { monLexiqueStatus: "added" }),
      makeItemMastery("b", { monLexiqueStatus: "weak" }),
    );
    const out = selectMonLexiqueEntries({
      items: { a: makeRawItem("fa", "ea"), b: makeRawItem("fb", "eb") },
      snapshot,
    });
    assertEqual(ids(out), ["b", "a"], "weak before added");
    assertEqual(out[0].status, "weak", "first is weak");
  });

  test("within a status group, lastProducedAt sorts descending", () => {
    const snapshot = makeSnapshot(
      makeItemMastery("a", { monLexiqueStatus: "added", lastProducedAt: 100 }),
      makeItemMastery("b", { monLexiqueStatus: "added", lastProducedAt: 200 }),
    );
    const out = selectMonLexiqueEntries({
      items: { a: makeRawItem("fa", "ea"), b: makeRawItem("fb", "eb") },
      snapshot,
    });
    assertEqual(ids(out), ["b", "a"], "higher lastProducedAt first");
  });

  test("null lastProducedAt sorts last", () => {
    const snapshot = makeSnapshot(
      makeItemMastery("a", { monLexiqueStatus: "added", lastProducedAt: 50 }),
      makeItemMastery("b", { monLexiqueStatus: "added", lastProducedAt: null }),
    );
    const out = selectMonLexiqueEntries({
      items: { a: makeRawItem("fa", "ea"), b: makeRawItem("fb", "eb") },
      snapshot,
    });
    assertEqual(ids(out), ["a", "b"], "null lastProducedAt last");
  });

  test("itemId tie-breaker for equal sort values", () => {
    const snapshot = makeSnapshot(
      makeItemMastery("b", { monLexiqueStatus: "added", lastProducedAt: 100 }),
      makeItemMastery("a", { monLexiqueStatus: "added", lastProducedAt: 100 }),
    );
    const out = selectMonLexiqueEntries({
      items: { a: makeRawItem("fa", "ea"), b: makeRawItem("fb", "eb") },
      snapshot,
    });
    assertEqual(ids(out), ["a", "b"], "equal → itemId ascending");
  });

  test("learner-safe output shape only", () => {
    const snapshot = makeSnapshot(
      makeItemMastery("a", {
        monLexiqueStatus: "added",
        // internal fields that must NEVER be emitted:
        isWeak: true,
        precisionCount: 5,
        wrongCount: 3,
        weakTags: { incorrect_but_understandable: 2 },
      }),
    );
    const out = selectMonLexiqueEntries({
      items: { a: makeRawItem("bonjour", "hello") },
      snapshot,
    });
    assertEqual(out.length, 1, "one entry");
    const entry = out[0];
    assertEqual(
      Object.keys(entry).sort(),
      [
        "dueAt",
        "en",
        "fr",
        "itemId",
        "lastProducedAt",
        "lastSeenAt",
        "needsPractice",
        "practiceEligibility",
        "status",
      ],
      "entry exposes exactly the learner-safe key set",
    );
    for (const banned of ["weakTags", "precisionCount", "wrongCount", "isWeak"]) {
      assert(!(banned in entry), `internal field "${banned}" must not be emitted`);
    }
  });
});

// ── B. selectPracticePoolBuckets ────────────────────────────────────────────

describe("selectPracticePoolBuckets", () => {
  test("practiceEligibility 'none' is excluded from all buckets", () => {
    const snapshot = makeSnapshot(makeItemMastery("a", { practiceEligibility: "none" }));
    const b = selectPracticePoolBuckets({ snapshot });
    assertEqual(b.build.length + b.stretch.length + b.challenge.length, 0, "none → excluded");
  });

  test("practiceEligibility 'build' goes to build bucket", () => {
    const snapshot = makeSnapshot(makeItemMastery("a", { practiceEligibility: "build" }));
    const b = selectPracticePoolBuckets({ snapshot });
    assertEqual(ids(b.build), ["a"], "build bucket");
    assertEqual(b.stretch.length + b.challenge.length, 0, "only build");
  });

  test("practiceEligibility 'stretch' goes to stretch bucket", () => {
    const snapshot = makeSnapshot(makeItemMastery("a", { practiceEligibility: "stretch" }));
    const b = selectPracticePoolBuckets({ snapshot });
    assertEqual(ids(b.stretch), ["a"], "stretch bucket");
    assertEqual(b.build.length + b.challenge.length, 0, "only stretch");
  });

  test("practiceEligibility 'challenge' with isWeak true goes to challenge bucket", () => {
    const snapshot = makeSnapshot(
      makeItemMastery("a", { practiceEligibility: "challenge", isWeak: true }),
    );
    const b = selectPracticePoolBuckets({ snapshot });
    assertEqual(ids(b.challenge), ["a"], "challenge bucket");
    assert(b.challenge[0].needsPractice, "challenge item needsPractice");
  });

  test("challenge with isWeak false is excluded (selector guard, synthetic state)", () => {
    // The reducer invariant is challenge ⇔ isWeak, so this is a synthetic state;
    // the test verifies the selector's belt-and-suspenders guard, not a real path.
    const snapshot = makeSnapshot(
      makeItemMastery("a", { practiceEligibility: "challenge", isWeak: false }),
    );
    const b = selectPracticePoolBuckets({ snapshot });
    assertEqual(b.build.length + b.stretch.length + b.challenge.length, 0, "guarded out");
  });

  test("isDue is false when now is omitted", () => {
    const snapshot = makeSnapshot(makeItemMastery("a", { practiceEligibility: "build", dueAt: 50 }));
    const b = selectPracticePoolBuckets({ snapshot });
    assert(!b.build[0].isDue, "no now → never due");
  });

  test("isDue is true only when dueAt <= now", () => {
    const snapshot = makeSnapshot(
      makeItemMastery("a", { practiceEligibility: "build", dueAt: 50 }),
      makeItemMastery("b", { practiceEligibility: "build", dueAt: 150 }),
      makeItemMastery("c", { practiceEligibility: "build", dueAt: null }),
    );
    const b = selectPracticePoolBuckets({ snapshot, now: 100 });
    const byId = Object.fromEntries(b.build.map((i) => [i.itemId, i.isDue]));
    assert(byId.a === true, "dueAt 50 <= 100 → due");
    assert(byId.b === false, "dueAt 150 > 100 → not due");
    assert(byId.c === false, "null dueAt → not due");
  });

  test("due items sort before not-due items", () => {
    const snapshot = makeSnapshot(
      makeItemMastery("a", { practiceEligibility: "build", dueAt: 200 }), // not due
      makeItemMastery("b", { practiceEligibility: "build", dueAt: 50 }), // due
    );
    const b = selectPracticePoolBuckets({ snapshot, now: 100 });
    assertEqual(ids(b.build), ["b", "a"], "due before not-due");
  });

  test("dueAt sorts ascending within due items", () => {
    const snapshot = makeSnapshot(
      makeItemMastery("a", { practiceEligibility: "build", dueAt: 80 }),
      makeItemMastery("b", { practiceEligibility: "build", dueAt: 20 }),
    );
    const b = selectPracticePoolBuckets({ snapshot, now: 100 });
    assertEqual(ids(b.build), ["b", "a"], "lower dueAt first among due");
  });

  test("null dueAt sorts last", () => {
    // now omitted → all isDue false, so ordering is by dueAt ascending, null last.
    const snapshot = makeSnapshot(
      makeItemMastery("a", { practiceEligibility: "build", dueAt: 50 }),
      makeItemMastery("b", { practiceEligibility: "build", dueAt: null }),
    );
    const b = selectPracticePoolBuckets({ snapshot });
    assertEqual(ids(b.build), ["a", "b"], "null dueAt last");
  });

  test("itemId tie-breaker for equal sort values", () => {
    const snapshot = makeSnapshot(
      makeItemMastery("b", { practiceEligibility: "build", dueAt: null }),
      makeItemMastery("a", { practiceEligibility: "build", dueAt: null }),
    );
    const b = selectPracticePoolBuckets({ snapshot });
    assertEqual(ids(b.build), ["a", "b"], "equal → itemId ascending");
  });

  test("fr/en attach only when registry is passed and resolves", () => {
    const snapshot = makeSnapshot(makeItemMastery("a", { practiceEligibility: "build" }));
    const b = selectPracticePoolBuckets({
      snapshot,
      items: { a: makeRawItem("bonjour", "hello") },
    });
    assertEqual(b.build[0].fr, "bonjour", "fr attached");
    assertEqual(b.build[0].en, "hello", "en attached");
  });

  test("fr/en are absent when registry omitted or item missing from registry", () => {
    const snapshot = makeSnapshot(makeItemMastery("a", { practiceEligibility: "build" }));

    const noRegistry = selectPracticePoolBuckets({ snapshot });
    assert(!("fr" in noRegistry.build[0]), "no registry → no fr");
    assert(!("en" in noRegistry.build[0]), "no registry → no en");

    const missing = selectPracticePoolBuckets({ snapshot, items: {} });
    assert(!("fr" in missing.build[0]), "item missing from registry → no fr");
    assert(!("en" in missing.build[0]), "item missing from registry → no en");
  });
});
