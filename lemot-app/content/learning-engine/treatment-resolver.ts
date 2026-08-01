/**
 * Contract → curriculum treatment resolution (PR-03) — pure and deterministic.
 *
 * The fixture controller previously stamped `legacy_unknown` on every target
 * even though `LearnerRendererShell` already held the validated `LessonContract`
 * that states each item's bucket. That was an honest placeholder in PR-02, but
 * it silently capped every fixture attempt at supported production. This module
 * reads the authored contract instead of guessing.
 *
 * Bucket mapping (the contract's own vocabulary → the event's):
 *   activeNew       → active
 *   recycled        → active      (recycled material is still actively demanded)
 *   supported       → supported
 *   recognitionOnly → recognition
 *
 * Never infers from surface text, never touches an item registry, and never
 * invents Ghost / model / meta treatments — the fixture contract has no such
 * buckets, and fabricating one would be exactly the "measurement invents
 * pedagogy" failure the Mastery Bible forbids.
 */
import type { CurriculumTreatment } from "./events";
import type { ItemId, LessonContract } from "./types";

export class TreatmentResolutionError extends Error {
  readonly itemId: ItemId;
  constructor(itemId: ItemId, detail: string) {
    super(`cannot resolve curriculum treatment for "${itemId}": ${detail}`);
    this.name = "TreatmentResolutionError";
    this.itemId = itemId;
  }
}

type Bucket = "activeNew" | "supported" | "recognitionOnly" | "recycled";

const BUCKET_TREATMENT: Readonly<Record<Bucket, CurriculumTreatment>> = Object.freeze({
  activeNew: "active",
  recycled: "active",
  supported: "supported",
  recognitionOnly: "recognition",
});

const BUCKET_ORDER: readonly Bucket[] = [
  "activeNew",
  "supported",
  "recognitionOnly",
  "recycled",
];

/**
 * Resolve ONE target's treatment from the contract.
 *
 * @throws {TreatmentResolutionError} when the item appears in no bucket (the
 *   contract never claimed ownership) or in more than one (the contract is
 *   ambiguous). Both are authoring defects that must be loud, not smoothed over.
 */
export function resolveTreatmentForItem(
  itemId: ItemId,
  contract: LessonContract,
): CurriculumTreatment {
  const owning = BUCKET_ORDER.filter((bucket) => contract.items[bucket].includes(itemId));
  if (owning.length === 0) {
    throw new TreatmentResolutionError(
      itemId,
      "the lesson contract lists it in no item bucket",
    );
  }
  if (owning.length > 1) {
    throw new TreatmentResolutionError(
      itemId,
      `the lesson contract lists it in ${owning.length} buckets (${owning.join(", ")}) — one target must own exactly one bucket`,
    );
  }
  return BUCKET_TREATMENT[owning[0]];
}

/**
 * Resolve every target, index-aligned with `itemIds`.
 *
 * An EMPTY target list is valid and returns an empty array: the controller
 * deliberately emits zero targets for a repeated context-chain success (the B23
 * bounded-credit rule), and that is not a resolution failure.
 */
export function resolveTargetTreatments(
  itemIds: readonly ItemId[],
  contract: LessonContract,
): CurriculumTreatment[] {
  return itemIds.map((id) => resolveTreatmentForItem(id, contract));
}
