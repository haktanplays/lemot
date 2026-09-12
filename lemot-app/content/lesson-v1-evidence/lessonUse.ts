import type { LearningEvent } from "../learning-engine/events";
import type { LearningItem } from "../lessonTypes";

/**
 * Which French the learner actually USED in this sitting.
 *
 * ── THE DEFECT THIS ANSWERS ─────────────────────────────────────────────────
 *
 * The recap said "Pieces you used" over a list authored by hand, per lesson, in
 * `piecesUsed`. It is a real and useful list — it is what the lesson worked —
 * but it is not a statement about the learner, and the recap deliberately
 * receives no learner state, so nothing could check the claim. A learner who
 * skipped a screen was still told they had used its piece, and a learner who
 * reached back for French from L1 saw none of it, because the authored list
 * belongs to one lesson.
 *
 * ── WHAT COUNTS AS USE ──────────────────────────────────────────────────────
 *
 * Only an interaction where the learner PRODUCED or CHOSE the French and it
 * landed. Explicitly not:
 *
 *   exposure     seeing it on a Showcase or a meet card
 *   reveal       the model being shown after an attempt
 *   a hint       support offered is not French produced
 *   presence     the item being declared on a screen they walked past
 *
 * That list is the whole point. A recap that inflates is worse than one that
 * under-reports, because the learner reads it as a record of what they did.
 *
 * ── WHY EARLIER LESSONS' FRENCH BELONGS HERE ────────────────────────────────
 *
 * It comes from the events, so it is whatever the learner actually worked. If
 * they used `excusez-moi` inside an L8 question, `excusez-moi` is French they
 * used, and saying so is the point: Cairn remembers what they already have.
 *
 * Pure: events in, display strings out. No clock, no storage, no runtime.
 */

/** Interactions where the learner supplied the French, rather than met it. */
const USE_PRIMITIVES: ReadonlySet<string> = new Set(["selection", "production"]);

/**
 * Outcomes that mean it landed.
 *
 * `acceptable_variant` counts: an accepted alternative is French the learner
 * produced and the grader approved, and the pass that replaced "Accepted." with
 * "That works." settled that it is a success rather than a tolerated miss.
 */
const LANDED: ReadonlySet<string> = new Set(["correct", "acceptable_variant"]);

/**
 * The canonical pieces this session's events show the learner using.
 *
 * Returns display surfaces (the registry's own `text`), in first-use order, so
 * the row reads as the sitting happened rather than as a sorted inventory.
 * An item the registry does not know is dropped rather than rendered raw —
 * the same rule every other piece surface follows.
 */
export function piecesUsedInSession(
  events: readonly LearningEvent[],
  items: Readonly<Record<string, LearningItem>>,
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const event of events) {
    if (!USE_PRIMITIVES.has(event.primitive)) continue;
    if (!LANDED.has(event.outcome)) continue;
    for (const itemId of event.itemIds) {
      if (seen.has(itemId)) continue;
      const item = items[itemId];
      if (!item) continue;
      const surface = (item.fr ?? item.text ?? "").trim();
      if (surface.length === 0) continue;
      seen.add(itemId);
      out.push(surface);
    }
  }
  return out;
}
