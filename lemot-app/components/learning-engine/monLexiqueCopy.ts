/**
 * Mon Lexique learner copy — pure, framework-free, testable.
 *
 * The ONLY learner-facing vocabulary for Mon Lexique. One entry resolves to
 * exactly ONE of four calm bands:
 *
 *   Yours · Becoming yours · You’ve met this · Worth another look
 *
 * This replaces the earlier two-chip model (a membership chip "Collected" /
 * "Needs another look" beside a separate claim line "Used independently" /
 * "Growing with support"). Two labels on one row read as two verdicts about the
 * same word; one band is the whole truth about where that piece currently
 * stands. The retired words are gone from the learner surface entirely —
 * Collected, Needs another look, Growing with support, Used independently,
 * Recognition, Supported, Independent, Mastered, Due, Weak.
 *
 * Internal enums are UNCHANGED: `status` is still `added` / `weak` and
 * `productionClaim` is still `none` / `supported` / `independent`. The mapping
 * below is the presentation boundary and nothing else — no mastery is derived,
 * no counter is read, no scheduler rule exists here.
 *
 * Truthfulness boundary for "Becoming yours": it means the current evidence
 * supports a Supported-level production claim but does not establish
 * independent production. It does NOT always mean a specific hint or piece tray
 * was used — migrated history with unknown assistance is conservatively capped
 * to Supported. The copy therefore names where the piece stands, never a
 * mechanism: no "you used a hint", "you needed help", "you could not do it
 * alone".
 *
 * Also banned here, as everywhere learner-facing: mastery / evidence / score /
 * weak / failed / assisted-attempt / ownership-level terminology, counters, and
 * any raw internal field.
 */
import type { MonLexiqueEntry } from "@/content/learning-engine/mon-lexique";

/** The four learner-facing bands. Internal names; only the copy is visible. */
export type MonLexiqueBand = "yours" | "becoming" | "met" | "revisit";

/** The canonical band wording. These four strings are the whole vocabulary. */
export const MON_LEXIQUE_BAND_COPY: Readonly<Record<MonLexiqueBand, string>> =
  Object.freeze({
    yours: "Yours",
    becoming: "Becoming yours",
    met: "You’ve met this",
    revisit: "Worth another look",
  });

/** Ordered strongest-claim-first; used by tests and by any future grouping. */
export const MON_LEXIQUE_BANDS: readonly MonLexiqueBand[] = Object.freeze([
  "yours",
  "becoming",
  "met",
  "revisit",
] as const);

/** Local-calendar day key for a timestamp. Pure — the caller supplies both. */
function localDayKey(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

/**
 * Was this piece SUCCESSFULLY produced on the same local day as `now`?
 *
 * `lastProducedAt` is written by the reducer only on a successful production
 * (see `mastery.ts`), so this reads exactly "the learner used this today", with
 * no new field, no invented timestamp and no storage key.
 */
export function usedSuccessfullyToday(
  entry: Pick<MonLexiqueEntry, "lastProducedAt">,
  now: number,
): boolean {
  const produced = entry.lastProducedAt;
  if (produced === null) return false;
  return localDayKey(produced) === localDayKey(now);
}

/**
 * Resolve the ONE band an entry displays.
 *
 * `weak` normally surfaces as "Worth another look". The one suppression: a
 * piece the learner successfully used TODAY never reads as needing another look
 * in the same sitting — it falls back to the band its production claim already
 * earned. This is display only. The reducer's weak state, `practiceEligibility`
 * and every scheduling rule are untouched, so the piece still returns through
 * Practice exactly when it did before.
 */
export function resolveMonLexiqueBand(
  entry: Pick<MonLexiqueEntry, "status" | "productionClaim" | "lastProducedAt">,
  now: number,
): MonLexiqueBand {
  if (entry.status === "weak" && !usedSuccessfullyToday(entry, now)) {
    return "revisit";
  }
  if (entry.productionClaim === "independent") return "yours";
  if (entry.productionClaim === "supported") return "becoming";
  return "met";
}
