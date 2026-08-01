/**
 * Canonical runtime item boundary (PR-01) — pure, no I/O, no React.
 *
 * D-2 (fixed for this PR, correcting the earlier planning recommendation):
 * `content/itemRegistry.ts` IS the canonical runtime item registry. Its
 * `ITEM_REGISTRY` / `ItemId` are the authoritative runtime item-identity source
 * for the L1 pilot, and every shipped id is immutable forever per
 * ADR-0012 (YASA 2) — no rename, no delete-and-recreate, no colon migration.
 * `content/learning-engine/items.ts` is FIXTURE INPUT, never a second canonical
 * registry (see ./fixtureCompat.ts).
 *
 * This module deliberately adds no data. It re-exports the registry's own
 * accessors and supplies only what was missing for a validation boundary: a
 * stable id list/set and a deterministic assertion. Duplicating registry rows
 * into another file — or building a third registry — is exactly the failure
 * this boundary exists to prevent.
 */
import { ITEM_REGISTRY, getItem, hasItem } from "../itemRegistry";
import type { ItemId } from "../itemRegistry";
import type { LearningItem } from "../lessonTypes";

export type { ItemId };

/** Thrown when a string is required to be a canonical shipped item id and is not. */
export class UnknownCanonicalItemError extends Error {
  readonly id: string;
  constructor(id: string, context?: string) {
    super(
      `"${id}" is not a canonical item id in ITEM_REGISTRY` +
        (context ? ` (${context})` : "") +
        ". Canonical ids are the shipped hyphen-style ids; fixture ids must be " +
        "resolved through the fixture compatibility boundary before use.",
    );
    this.name = "UnknownCanonicalItemError";
    this.id = id;
  }
}

/** Every canonical shipped item id, sorted for deterministic output. */
export const CANONICAL_ITEM_IDS: readonly ItemId[] = Object.freeze(
  (Object.keys(ITEM_REGISTRY) as ItemId[]).slice().sort(),
);

/** Set form of {@link CANONICAL_ITEM_IDS} for O(1) membership checks. */
export const CANONICAL_ITEM_ID_SET: ReadonlySet<string> = new Set<string>(
  CANONICAL_ITEM_IDS,
);

/** How many items the canonical registry currently ships. */
export const CANONICAL_ITEM_COUNT = CANONICAL_ITEM_IDS.length;

/**
 * Narrow an arbitrary string to `ItemId`. Delegates to the registry's own
 * `hasItem` so there is one membership rule, not two.
 */
export function isCanonicalItemId(id: string): id is ItemId {
  return hasItem(id);
}

/**
 * Assert and narrow, failing loudly and deterministically on anything that is
 * not a shipped canonical id (including fixture-only colon ids).
 */
export function assertCanonicalItemId(id: string, context?: string): ItemId {
  if (!isCanonicalItemId(id)) throw new UnknownCanonicalItemError(id, context);
  return id;
}

/** Look up a canonical item, failing deterministically when the id is unknown. */
export function getCanonicalItem(id: string, context?: string): LearningItem {
  return getItem(assertCanonicalItemId(id, context));
}
