/**
 * Acquisition primary ↔ linked relationship validation (PR-07) — pure.
 *
 * The tea concept ships as two runtime ids — `chunk-un-the` (primary) and
 * `noun-the` (linked) — and the relationship is DATA on the registry rows, not
 * prose. This validator makes the data trustworthy:
 *
 *  - every referenced id exists in the registry;
 *  - no item links to itself;
 *  - a primary's linked items each point back to that primary (reciprocal);
 *  - a linked item's primary declares it (reciprocal, other direction);
 *  - a linked item has exactly ONE primary (its own declaration), and no other
 *    primary claims it.
 *
 * What this deliberately is NOT: an id-remapping layer. Nothing here rewrites
 * persisted history or merges mastery rows — evidence routing stays exactly
 * where events put it, which for L1 is the PRIMARY tea id only. It also does not
 * link `noun-cafe` and `chunk-un-cafe`: those are INTENTIONALLY separate
 * acquisition identities (L0 owns the lexical item, L5 the package demand), so
 * linking them would erase a ratified demand rather than fix anything.
 */
import { ITEM_REGISTRY } from "../itemRegistry";
import type { LearningItem } from "../lessonTypes";

export function validateAcquisitionLinks(
  registry: Readonly<Record<string, LearningItem>> = ITEM_REGISTRY,
): string[] {
  const errors: string[] = [];
  const primaryOf = new Map<string, string[]>(); // linked id → primary ids claiming it

  for (const [id, item] of Object.entries(registry)) {
    const link = item.acquisitionLink;
    if (!link) continue;

    if (link.role === "primary") {
      if (link.linkedItemIds.length === 0) {
        errors.push(`"${id}" declares role "primary" with no linked items`);
      }
      for (const linkedId of link.linkedItemIds) {
        if (linkedId === id) {
          errors.push(`"${id}" links to itself`);
          continue;
        }
        const linked = registry[linkedId];
        if (!linked) {
          errors.push(`"${id}" links to "${linkedId}", which does not exist`);
          continue;
        }
        const list = primaryOf.get(linkedId) ?? [];
        list.push(id);
        primaryOf.set(linkedId, list);
        const back = linked.acquisitionLink;
        if (!back || back.role !== "linked" || back.primaryItemId !== id) {
          errors.push(
            `"${id}" declares "${linkedId}" as linked, but "${linkedId}" does not point back — the relationship must be reciprocal`,
          );
        }
      }
    } else {
      if (link.primaryItemId === id) {
        errors.push(`"${id}" names itself as its primary`);
        continue;
      }
      const primary = registry[link.primaryItemId];
      if (!primary) {
        errors.push(
          `"${id}" names primary "${link.primaryItemId}", which does not exist`,
        );
        continue;
      }
      const forward = primary.acquisitionLink;
      if (
        !forward ||
        forward.role !== "primary" ||
        !forward.linkedItemIds.includes(id)
      ) {
        errors.push(
          `"${id}" names primary "${link.primaryItemId}", but that primary does not declare it — the relationship must be reciprocal`,
        );
      }
    }
  }

  for (const [linkedId, primaries] of primaryOf) {
    if (primaries.length > 1) {
      errors.push(
        `"${linkedId}" is claimed by ${primaries.length} primaries (${primaries.sort().join(", ")}) — a linked identity has exactly one primary`,
      );
    }
  }

  return errors;
}
