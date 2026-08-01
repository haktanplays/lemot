/**
 * Shipped-lesson curriculum treatment resolution (PR-06) — pure, deterministic.
 *
 * The engine's `treatment-resolver` reads a `LessonContract`'s four item buckets;
 * shipped v1 lessons carry the same authored fact in a different shape — a
 * `learningItems` list where each entry already declares its `status`. This
 * reads THAT, rather than falling back to the global item registry: the lesson
 * states how it treats an item in ITS context, and a registry-wide status would
 * silently override an authored per-lesson placement.
 *
 * Fails closed. A target with no lesson record, or with two, is a content defect
 * — guessing "active" would manufacture an independent-production claim the
 * lesson never authorised.
 *
 * NOT here: Ghost / model / meta target ownership. The shipped lesson type does
 * not express it yet, and PR-06 does not invent it.
 */
import type { CurriculumTreatment } from "../learning-engine/events";
import type { ItemId } from "../learning-engine/types";
import type { Lesson, LearningItemStatus } from "../lessonTypes";

/** Thrown when a shipped lesson cannot state how it treats one of its targets. */
export class LessonTreatmentError extends Error {
  constructor(message: string) {
    super(`lesson treatment: ${message}`);
    this.name = "LessonTreatmentError";
  }
}

/**
 * Authored lesson status → curriculum treatment.
 *
 * `recycled` maps to `active` for the same reason the engine's contract resolver
 * does: a returning item is still the learner's to produce, not a supported one.
 */
const STATUS_TREATMENT: Readonly<Record<LearningItemStatus, CurriculumTreatment>> =
  Object.freeze({
    active: "active",
    recycled: "active",
    supported: "supported",
    recognition: "recognition",
  });

/** Resolve ONE target's treatment from the lesson's own authored item list. */
export function resolveLessonTreatmentForItem(
  itemId: ItemId,
  lesson: Lesson,
): CurriculumTreatment {
  const matches = lesson.learningItems.filter((i) => i.id === itemId);
  if (matches.length === 0) {
    throw new LessonTreatmentError(
      `lesson "${lesson.id}" targets "${itemId}" but declares no learningItems entry for it — ` +
        `an unstated treatment must not be guessed`,
    );
  }
  if (matches.length > 1) {
    throw new LessonTreatmentError(
      `lesson "${lesson.id}" declares "${itemId}" ${matches.length} times — ambiguous treatment`,
    );
  }
  return STATUS_TREATMENT[matches[0].status];
}

/**
 * Resolve treatments for a target list, INDEX-ALIGNED with the input.
 *
 * Alignment matters: the event stores `targetTreatments` positionally against
 * `itemIds`, so a reordering here would silently mis-attribute treatment.
 */
export function resolveLessonTreatments(
  itemIds: readonly ItemId[],
  lesson: Lesson,
): CurriculumTreatment[] {
  return itemIds.map((id) => resolveLessonTreatmentForItem(id, lesson));
}
