/**
 * What "met in Context Cards" means, as pure data.
 *
 * Kept apart from the storage call in `lib/contextCardExposure.ts` for the
 * usual reason -- the merge rules are the part worth testing, and they should
 * be testable without a device -- and for one specific to this file: the whole
 * point of Context Card exposure is that it is NOT the mastery projection, so
 * the module that defines it imports nothing from the learning engine and
 * nothing from React Native.
 *
 * Meeting a word on a card is the weakest honest record there is. It says the
 * word was on screen. It does not say the learner understood it, could recall
 * it, or could ever produce it.
 */

/** cardId -> the first time it was met. First contact is the honest timestamp. */
export type ContextCardExposure = Readonly<Record<string, number>>;

export const EMPTY_EXPOSURE: ContextCardExposure = Object.freeze({});

/**
 * Merge a newly met card into what was already met.
 *
 * FIRST contact wins: a card met today and looked at again next week was still
 * first met today, and overwriting the timestamp would quietly make old
 * exposure look fresh in every surface that reads it. Returns the SAME object
 * when nothing changed, so a caller can skip the write.
 */
export function withCardMet(
  current: ContextCardExposure,
  cardId: string,
  at: number,
): ContextCardExposure {
  if (current[cardId] !== undefined) return current;
  return Object.freeze({ ...current, [cardId]: at });
}

/** Parse stored JSON, discarding anything that is not a card id and a time. */
export function parseExposure(raw: string | null): ContextCardExposure {
  if (raw === null) return EMPTY_EXPOSURE;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      return EMPTY_EXPOSURE;
    }
    const out: Record<string, number> = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof key === "string" && typeof value === "number" && Number.isFinite(value)) {
        out[key] = value;
      }
    }
    return Object.freeze(out);
  } catch {
    // Corrupt storage is not a crash and not a reason to lose the rest of the
    // app: exposure is the least valuable data here, so it starts over.
    return EMPTY_EXPOSURE;
  }
}
