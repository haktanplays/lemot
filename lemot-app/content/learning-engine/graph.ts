/**
 * Derived item / lesson graph (P0.1) — pure.
 *
 * `buildItemGraph` folds the lesson contracts + the merged item registry into a
 * queryable ownership / carry-in lineage graph. It makes EXPLICIT the relationships
 * that are today only implicit across `lessons/*.contract.ts`, `SHARED_ITEMS`, and
 * each `RawItem.firstIntroducedIn` — e.g. that L11 first-teaches the pouvoir-light
 * base clauses, L12 consumes them as `supported`, and L16 recombines L11/L12/L15
 * carry-in with zero new items.
 *
 * Hard boundaries (P0.1):
 *  - PURE: no `Date.now()`, no storage, no network, no React, no AI.
 *  - Does NOT mutate its input (reads arrays, returns fresh sorted copies).
 *  - Deterministic: every output array is de-duplicated and sorted, so two runs
 *    over the same input produce identical structures (test/report friendly).
 *  - Adds NO validator checks (that is P0.2) and NO runtime / storage / UI.
 *
 * It reuses the existing fixture shape — `{ items, contracts }`, a subset of
 * `ValidationInput` — so `LEARNING_ENGINE_FIXTURE` (and any `*_CONTENT_FIXTURE`)
 * can be passed straight in.
 */
import type { ItemId, LessonContract, RawItem, ValidationInput } from "./types";

/** Derived facts about a single item across all lessons that reference it. */
export type ItemGraphNode = {
  itemId: ItemId;
  /** From `RawItem.firstIntroducedIn`; `null` if the id is not in the registry. */
  firstIntroducedIn: string | null;
  /** Lessons listing the item in `contract.items.activeNew`. */
  activeNewIn: string[];
  /** Lessons listing the item in `contract.items.supported`. */
  supportedIn: string[];
  /** Lessons listing the item in `contract.items.recycled`. */
  recycledIn: string[];
  /** Lessons listing the item in `contract.items.recognitionOnly`. */
  recognitionOnlyIn: string[];
  /** Lessons listing the item in `contract.production.blockedProduction`. */
  blockedProductionIn: string[];
  /**
   * Lessons that OWN the item — i.e. list it in any of the four ownership buckets
   * (activeNew / supported / recycled / recognitionOnly). This mirrors the `owned`
   * set used by `validate.ts`. `blockedProductionIn` is a production list, NOT an
   * ownership bucket, so it is tracked separately and never folded into `ownedIn`.
   */
  ownedIn: string[];
};

/** Derived facts about a single lesson. */
export type LessonGraphNode = {
  lessonId: string;
  activeNew: ItemId[];
  supported: ItemId[];
  recycled: ItemId[];
  recognitionOnly: ItemId[];
  blockedProduction: ItemId[];
  /**
   * Items the lesson uses as `supported`/`recycled` whose `firstIntroducedIn` is
   * NOT this lesson (carried in from an earlier lesson / SHARED).
   */
  carryIn: ItemId[];
  /**
   * Items first-introduced in this lesson that are reused as `supported`/`recycled`
   * by at least one OTHER lesson. "Later" is interpreted as "in another lesson":
   * the graph does not assume a numeric lesson ordering, so reuse by any other
   * lesson counts. For the current fixtures this matches forward reuse (e.g. L11's
   * base clauses reused by L12 and L16).
   */
  carryOut: ItemId[];
};

export type ItemGraph = {
  items: Record<ItemId, ItemGraphNode>;
  lessons: Record<string, LessonGraphNode>;
};

/** Minimal input: the registry + contracts. A subset of `ValidationInput`. */
export type ItemGraphInput = Pick<ValidationInput, "items" | "contracts">;

/** De-duplicate and sort a list of strings (new array; input untouched). */
function sortedUnique(values: readonly string[]): string[] {
  return Array.from(new Set(values)).sort();
}

/**
 * Build the derived item / lesson graph from the registry + contracts.
 *
 * Item nodes are created for every id REFERENCED by a contract (in any of the four
 * ownership buckets or in `blockedProduction`). Registry items that no contract
 * references are intentionally omitted — the graph is about ownership/carry
 * lineage, and unreferenced registry entries carry no lineage. `firstIntroducedIn`
 * is still resolved from the registry for every referenced id.
 */
export function buildItemGraph(input: ItemGraphInput): ItemGraph {
  const registry: Record<ItemId, RawItem> = input.items;
  const contracts: readonly LessonContract[] = input.contracts;

  const firstIntroducedIn = (id: ItemId): string | null =>
    registry[id]?.firstIntroducedIn ?? null;

  // Per-item membership accumulators (built from contracts, never from input mutation).
  type Acc = {
    activeNewIn: string[];
    supportedIn: string[];
    recycledIn: string[];
    recognitionOnlyIn: string[];
    blockedProductionIn: string[];
  };
  const acc: Record<ItemId, Acc> = {};
  const ensure = (id: ItemId): Acc => {
    const existing = acc[id];
    if (existing) return existing;
    const fresh: Acc = {
      activeNewIn: [],
      supportedIn: [],
      recycledIn: [],
      recognitionOnlyIn: [],
      blockedProductionIn: [],
    };
    acc[id] = fresh;
    return fresh;
  };

  // Cross-lesson index: which lessons list an item as supported OR recycled.
  // Used to compute carryOut without assuming any lesson ordering.
  const supportedOrRecycledLessons: Record<ItemId, string[]> = {};
  const noteSupportedOrRecycled = (id: ItemId, lessonId: string): void => {
    const list = supportedOrRecycledLessons[id] ?? [];
    list.push(lessonId);
    supportedOrRecycledLessons[id] = list;
  };

  for (const contract of contracts) {
    const lessonId = contract.id;
    for (const id of contract.items.activeNew) ensure(id).activeNewIn.push(lessonId);
    for (const id of contract.items.supported) {
      ensure(id).supportedIn.push(lessonId);
      noteSupportedOrRecycled(id, lessonId);
    }
    for (const id of contract.items.recycled) {
      ensure(id).recycledIn.push(lessonId);
      noteSupportedOrRecycled(id, lessonId);
    }
    for (const id of contract.items.recognitionOnly) {
      ensure(id).recognitionOnlyIn.push(lessonId);
    }
    for (const id of contract.production.blockedProduction) {
      ensure(id).blockedProductionIn.push(lessonId);
    }
  }

  // ── Item nodes ──────────────────────────────────────────────────────────
  const items: Record<ItemId, ItemGraphNode> = {};
  for (const id of Object.keys(acc)) {
    const a = acc[id];
    items[id] = {
      itemId: id,
      firstIntroducedIn: firstIntroducedIn(id),
      activeNewIn: sortedUnique(a.activeNewIn),
      supportedIn: sortedUnique(a.supportedIn),
      recycledIn: sortedUnique(a.recycledIn),
      recognitionOnlyIn: sortedUnique(a.recognitionOnlyIn),
      blockedProductionIn: sortedUnique(a.blockedProductionIn),
      ownedIn: sortedUnique([
        ...a.activeNewIn,
        ...a.supportedIn,
        ...a.recycledIn,
        ...a.recognitionOnlyIn,
      ]),
    };
  }

  // ── Lesson nodes ────────────────────────────────────────────────────────
  const lessons: Record<string, LessonGraphNode> = {};
  for (const contract of contracts) {
    const lessonId = contract.id;

    const supportedPlusRecycled = sortedUnique([
      ...contract.items.supported,
      ...contract.items.recycled,
    ]);
    const carryIn = supportedPlusRecycled.filter(
      (id) => firstIntroducedIn(id) !== lessonId,
    );

    const carryOut = sortedUnique(
      Object.keys(registry).filter(
        (id) =>
          firstIntroducedIn(id) === lessonId &&
          (supportedOrRecycledLessons[id] ?? []).some((l) => l !== lessonId),
      ),
    );

    lessons[lessonId] = {
      lessonId,
      activeNew: sortedUnique(contract.items.activeNew),
      supported: sortedUnique(contract.items.supported),
      recycled: sortedUnique(contract.items.recycled),
      recognitionOnly: sortedUnique(contract.items.recognitionOnly),
      blockedProduction: sortedUnique(contract.production.blockedProduction),
      carryIn: sortedUnique(carryIn),
      carryOut,
    };
  }

  return { items, lessons };
}
