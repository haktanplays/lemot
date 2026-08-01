/**
 * Shipped-lesson evidence identity + targeting (PR-06) — pure, deterministic.
 *
 * Two questions the shipped lesson path could not previously answer honestly:
 *
 * 1. WHICH exercise is this? Screen ids repeat across lessons — `s00-meet-bonjour`
 *    exists in more than one v1 lesson — so a bare screen id is not a safe global
 *    exercise/payload identity. Qualifying it with the lesson id makes it unique
 *    without inventing a registry.
 *
 * 2. WHICH items did the learner's action actually demonstrate? `targetItemIds`
 *    says what a screen INVOLVES, which legitimately includes frame words around
 *    a blank. Crediting all of them for a one-slot choice would inflate
 *    recognition evidence for items the learner never chose.
 *
 * Hard boundaries: no clock, no randomness, no French surface text, no
 * `L1-PM-###` planning id, no sentence id, no EV id, no fixture alias, no
 * surface-text lookup, no fuzzy matching. Every evidence target must resolve
 * through the canonical runtime item boundary.
 */
import type { ItemId } from "../learning-engine/types";
import { isCanonicalItemId } from "../identity/canonicalItems";
import { hasFixtureAlias } from "../identity/fixtureCompat";
import type { LessonScreen } from "../lessonTypes";

/** Thrown when a shipped screen's evidence targeting cannot be trusted. */
export class LessonEvidenceTargetError extends Error {
  constructor(message: string) {
    super(`lesson evidence targets: ${message}`);
    this.name = "LessonEvidenceTargetError";
  }
}

/**
 * The globally-unique identity of one shipped lesson screen.
 *
 * Deterministic and content-free: same lesson + same screen always yields the
 * same string, and the string names no French, no planning id and no future
 * registry entry. It becomes `ExerciseBlueprint.id`, and therefore the event's
 * `payloadId` through the PR-05 surface resolver.
 */
export function qualifyLessonScreenId(lessonId: string, screenId: string): string {
  return `${lessonId}/${screenId}`;
}

/**
 * Resolve the item ids that may receive evidence from one screen action.
 *
 * `evidenceTargetItemIds` narrows `targetItemIds` when the two genuinely differ;
 * absent, the full target list is used. Everything is checked rather than
 * trusted: a fixture alias, an unknown id, a duplicate or a non-subset entry
 * throws instead of quietly writing a wrong item id into the append-only log.
 */
export function resolveEvidenceTargetItemIds(screen: LessonScreen): ItemId[] {
  const declared = screen.targetItemIds ?? [];
  const narrowed = screen.evidenceTargetItemIds;
  const where = `screen "${screen.id}"`;

  if (narrowed !== undefined) {
    if (narrowed.length === 0) {
      throw new LessonEvidenceTargetError(
        `${where} declares an empty evidenceTargetItemIds — omit the field instead of ` +
          `claiming the action demonstrates nothing`,
      );
    }
    if (new Set(narrowed).size !== narrowed.length) {
      throw new LessonEvidenceTargetError(`${where} repeats an evidence target`);
    }
    const declaredSet = new Set(declared);
    for (const id of narrowed) {
      if (!declaredSet.has(id)) {
        throw new LessonEvidenceTargetError(
          `${where} narrows evidence to "${id}", which is not among its targetItemIds`,
        );
      }
    }
  }

  const chosen = narrowed ?? declared;
  return chosen.map((id) => {
    // A fixture alias must never reach the shipped event log: the sandbox and the
    // shipped path would then persist two different ids for one acquisition.
    if (!isCanonicalItemId(id)) {
      const hint = hasFixtureAlias(id)
        ? " — it is a FIXTURE alias, which may not enter the shipped lesson path"
        : "";
      throw new LessonEvidenceTargetError(
        `${where} names "${id}", which is not a canonical runtime item${hint}`,
      );
    }
    return id;
  });
}
