/**
 * Mon Lexique learner copy (PR-09) — pure, framework-free, testable.
 *
 * The ONLY learner-facing vocabulary for a Mon Lexique entry's two SEPARATE
 * concepts:
 *
 *  1. membership/status — `added` (Collected) or `weak` (Needs another look);
 *  2. production-claim context — the strongest claim the scoped evidence
 *     currently supports. `none` has NO copy on purpose: the absence of a
 *     production claim is not a verdict, so nothing is rendered for it.
 *
 * Truthfulness boundary for `supported`: it means "the current evidence
 * supports a Supported-level production claim but does not establish
 * independent production". It does NOT always mean a specific hint or piece
 * tray was used — migrated history with unknown assistance is conservatively
 * capped to Supported. The copy therefore names the claim level calmly and
 * never a mechanism: no "you used a hint", "you needed help", "you copied
 * this", "the tray gave you this", "you could not do it alone".
 *
 * Also banned here, as everywhere learner-facing: mastery / evidence / score /
 * weak / failed / assisted-attempt / ownership-level terminology, counters,
 * and any raw internal field.
 */
import type { MonLexiqueEntry } from "@/content/learning-engine/mon-lexique";

/** Calm membership chip copy — `added` and `weak` are separate from the claim. */
export const MON_LEXIQUE_STATUS_COPY: Readonly<
  Record<MonLexiqueEntry["status"], string>
> = Object.freeze({
  added: "Collected",
  weak: "Needs another look",
});

/**
 * Calm claim-level copy. Deliberately has NO `none` key: an entry without a
 * qualifying production success renders no claim line at all, and a component
 * indexing this map with `none` fails typecheck rather than fabricating copy.
 */
export const PRODUCTION_CLAIM_COPY: Readonly<
  Record<Exclude<MonLexiqueEntry["productionClaim"], "none">, string>
> = Object.freeze({
  independent: "Used independently",
  supported: "Growing with support",
});
