/**
 * Item-registry merge helper (v0.1).
 *
 * `mergeItemMapsStrict` combines several NAMED item maps into one registry and
 * HARD-FAILS on a duplicate item id across maps — turning what used to be a
 * silent last-wins object spread (`{ ...A, ...B }`) into a loud, named error at
 * construction time. Keeping the maps named makes the failure message actionable
 * ("defined in both X and Y") and the helper trivially testable.
 *
 * Used by index.ts to build every standalone fixture and the aggregate, so an
 * accidental duplicate id (e.g. a lesson redefining a SHARED_ITEMS carry-in)
 * fails at import — and therefore fails `npm run validate:content` — instead of
 * silently overwriting.
 */
import type { ItemId, RawItem } from "./types";

export type NamedItemMap = {
  name: string;
  items: Record<ItemId, RawItem>;
};

/**
 * Merge named item maps into a single registry.
 *
 * @throws if the same item id appears in more than one map. The message names
 *   both maps and the colliding id.
 */
export function mergeItemMapsStrict(
  maps: NamedItemMap[],
): Record<ItemId, RawItem> {
  const merged: Record<ItemId, RawItem> = {};
  const sourceOf = new Map<ItemId, string>();

  for (const { name, items } of maps) {
    for (const id of Object.keys(items)) {
      const existing = sourceOf.get(id);
      if (existing !== undefined) {
        throw new Error(
          `Duplicate item id "${id}" defined in both "${existing}" and "${name}". ` +
            `Each item id must be defined in exactly one map — move shared carry-in to SHARED_ITEMS.`,
        );
      }
      sourceOf.set(id, name);
      merged[id] = items[id];
    }
  }

  return merged;
}
