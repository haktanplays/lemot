/**
 * Where "met in Context Cards" is kept, deliberately apart.
 *
 * The brief's hardest line about Context Cards is not about the cards at all:
 * "Do not collapse exposure and production into one dishonest state." So this
 * is its OWN store, under its own key, holding nothing but card ids and when
 * they were met. The separation is structural rather than a convention:
 *
 *   - it is not the mastery snapshot, so nothing here can reach a mastery
 *     channel, a Leitner box, a weakness verdict or a production claim;
 *   - Context Card vocabulary is not in the item registry, so it cannot become
 *     a Practice target or a lesson demand even by accident;
 *   - nothing in this file records a result, because a card has no answer.
 *
 * It honours the privacy-reset epoch like every other runtime persister: a
 * write captured before a reset is suppressed rather than resurrecting data the
 * user asked to delete.
 *
 * The merge rules live in `content/context-cards/exposure.ts`, which imports
 * nothing, so they can be tested without a device.
 */
import { kvStorage } from "@/lib/storage";
import { isPersistSuppressed, privacyResetEpoch } from "@/lib/privacyResetEpoch";
import {
  parseExposure,
  withCardMet,
  type ContextCardExposure,
} from "@/content/context-cards/exposure";

export const CONTEXT_CARD_EXPOSURE_KEY = "lm_context_cards_met";

export type { ContextCardExposure };
export { EMPTY_EXPOSURE, parseExposure, withCardMet } from "@/content/context-cards/exposure";

export function readContextCardExposure(): ContextCardExposure {
  return parseExposure(kvStorage.getItem(CONTEXT_CARD_EXPOSURE_KEY));
}

/**
 * Record that a card was met. Returns the new state.
 *
 * `capturedEpoch` is the privacy epoch the caller last acknowledged; a write
 * from before a reset is dropped, exactly like every other runtime persister.
 */
export function recordCardMet(
  cardId: string,
  at: number,
  capturedEpoch: number,
): ContextCardExposure {
  const current = readContextCardExposure();
  const next = withCardMet(current, cardId, at);
  if (next === current) return current;
  if (isPersistSuppressed(capturedEpoch)) return current;
  kvStorage.setItem(CONTEXT_CARD_EXPOSURE_KEY, JSON.stringify(next));
  return next;
}

/** Drop everything met. Used by the local privacy reset. */
export function clearContextCardExposure(): void {
  kvStorage.removeItem(CONTEXT_CARD_EXPOSURE_KEY);
}

export { privacyResetEpoch };
