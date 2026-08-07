/**
 * Lesson acquisition-demand validation (AD-001..AD-005) — pure, structural only.
 *
 * `acquisitionDemandItemIds` is the SOURCE OF TRUTH for active-new: the distinct
 * new learner-facing active production demands a lesson introduces (PRJ-015
 * IC-002). It is authored, not derived. The previous audit established why —
 * presentation structure answers "how does the learner interact with this?",
 * never "what does the curriculum intend to newly own?", and IC-001 keeps those
 * in separate counting contexts.
 *
 * So this module checks only that a declaration is STRUCTURALLY COHERENT. It
 * does NOT infer, second-guess or reconstruct demand from `targetItemIds`,
 * screen type, first production, or registry `status`. In particular a lesson
 * may legitimately declare an item whose global status is `supported` or
 * `recognition`: that is exactly IC-002's promotion case, and status is
 * descriptive metadata, not an accounting authority.
 *
 * What this deliberately is NOT: an active-new counter or a journey-role budget
 * check. Once declarations are trusted the count is simply the array's length,
 * and comparing it to the per-role band (with L6's named exception) is a
 * separate, later pass.
 */
import { ITEM_REGISTRY } from "../itemRegistry";
import type { Lesson, LearningItem, LessonScreen } from "../lessonTypes";

/**
 * Every canonical item id a lesson references through STRUCTURED fields.
 *
 * Deliberately id-based: learner-facing strings are never matched, so renaming
 * French copy cannot change which demands are reachable. Collected from the
 * lesson's own item list, every screen's targets and narrowed evidence targets,
 * and the item ids carried by suggested pieces and card highlights — the places
 * a canonical id can legitimately appear. No screen type is privileged; the
 * point is reachability, not pedagogy.
 */
export function collectLessonItemIds(lesson: Lesson): Set<string> {
  const ids = new Set<string>();
  for (const item of lesson.learningItems ?? []) ids.add(item.id);
  for (const screen of lesson.screens ?? []) {
    for (const id of screen.targetItemIds ?? []) ids.add(id);
    for (const id of screen.evidenceTargetItemIds ?? []) ids.add(id);
    const payload = (screen as LessonScreen & { payload?: unknown }).payload as
      | {
          suggestedPieces?: readonly { itemId?: string }[];
          highlights?: readonly { itemId?: string }[];
        }
      | undefined;
    for (const piece of payload?.suggestedPieces ?? []) {
      if (piece.itemId !== undefined) ids.add(piece.itemId);
    }
    for (const highlight of payload?.highlights ?? []) {
      if (highlight.itemId !== undefined) ids.add(highlight.itemId);
    }
  }
  return ids;
}

/** How many of the given lessons declare acquisition demands (`[]` counts). */
export function countLessonsDeclaringDemands(lessons: readonly Lesson[]): number {
  return lessons.filter((lesson) => lesson.acquisitionDemandItemIds !== undefined).length;
}

/** Total declared demands across the given lessons. */
export function totalAcquisitionDemands(lessons: readonly Lesson[]): number {
  return lessons.reduce(
    (sum, lesson) => sum + (lesson.acquisitionDemandItemIds?.length ?? 0),
    0,
  );
}

/**
 * Structural checks over every declared acquisition-demand list.
 *
 * Returns a sorted list of hard errors; empty means every declaration is
 * well-formed. A lesson that declares nothing is valid (absence = unadjudicated
 * or legacy), and so is `[]` (adjudicated zero) — the two are distinguishable
 * on purpose, and neither is an error here.
 *
 * AD-001 every declared id exists · AD-002 no duplicates within a lesson ·
 * AD-003 no `acquisitionComponents` whole · AD-004 no `acquisitionLink`
 * linked-only identity · AD-005 the declared id is structurally present in the
 * lesson.
 */
export function validateAcquisitionDemands(
  lessons: readonly Lesson[],
  registry: Readonly<Record<string, LearningItem>> = ITEM_REGISTRY,
): string[] {
  const errors: string[] = [];

  for (const lesson of lessons) {
    const declared = lesson.acquisitionDemandItemIds;
    if (declared === undefined) continue;

    const present = collectLessonItemIds(lesson);
    const seen = new Set<string>();

    for (const id of declared) {
      // AD-002 — a repeated demand claims the same novelty twice.
      if (seen.has(id)) {
        errors.push(`AD-002 "${lesson.id}" declares acquisition demand "${id}" more than once`);
        continue;
      }
      seen.add(id);

      // AD-001 — an id that does not exist cannot be demanded.
      const item = registry[id];
      if (!item) {
        errors.push(
          `AD-001 "${lesson.id}" declares acquisition demand "${id}", which is not a canonical item`,
        );
        continue;
      }

      // AD-003 — the whole was already ratified as adding no independent demand;
      // its independently introduced component belongs here instead.
      if (item.acquisitionComponents !== undefined) {
        errors.push(
          `AD-003 "${lesson.id}" declares "${id}", which carries acquisitionComponents — declare the independently introduced component instead`,
        );
      }

      // AD-004 — linked sub-identities are evidence-routing granularity and are
      // barred from being ordinary targets, so they never carry demand. A
      // "primary" identity is structurally legal here.
      if (item.acquisitionLink?.role === "linked") {
        errors.push(
          `AD-004 "${lesson.id}" declares "${id}", which is an acquisitionLink "linked" sub-identity`,
        );
      }

      // AD-005 — a demand the lesson never references anywhere is unreachable.
      if (!present.has(id)) {
        errors.push(
          `AD-005 "${lesson.id}" declares "${id}", which appears nowhere in the lesson's structured item references`,
        );
      }
    }
  }

  return errors.sort();
}
