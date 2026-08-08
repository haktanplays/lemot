/**
 * Recap chip taxonomy (chip-taxonomy-and-lexique-lifecycle-v0.3 §7/§11) — the
 * single source of truth.
 *
 * EXTRACTED, NOT AUTHORED. The heuristic, the regexes and the protected-chunk
 * set below previously lived inline in `scripts/tests/v1LessonStructure.test.ts`
 * and are reproduced here unchanged. No entry became legal or illegal by moving.
 *
 * Why it moved: the first Content Factory lesson (L16) passed candidate
 * validation carrying the recap chip `"on y va"` — a subject pronoun plus three
 * tokens — and was only caught at shipping time, then corrected to `"y"` (which
 * is what L14, the lesson that owns `on y va`, had already done). The rule could
 * not see a candidate because it only ran over `V1_LESSONS`. Both the shipping
 * test and the factory facade now call the same function.
 *
 * `piecesUsed` is a primary UI chip surface: entries must be atomic chips or
 * approved formula/package chunks — never full sentences or clauses (those
 * belong in model answers). This is the mechanical form of the rule whose
 * prose-only status caused the §29 L4/L6 sentence-chip regression.
 *
 * Heuristic: an entry is sentence-like when it starts with a French subject
 * pronoun (including elided j'/c'/qu' forms) and runs to 3+ word tokens
 * (apostrophe splits count: "j'ai une question" = j' + ai + une + question).
 * Two-token spine chips ("je suis", "j'ai", "je voudrais") stay legal.
 */
import type { Lesson } from "../lessonTypes";

// Elided forms (j'/c') attach straight to the verb, so only the full pronouns
// require a following space.
const SUBJECT_START =
  /^(?:(?:je|tu|il|elle|on|nous|vous|ils|elles|ce)(?:\s|$)|[jc]')/i;
const TERMINAL_PUNCTUATION = /[.!?]\s*$/;

/**
 * Canonical multi-token chunks allowed as UI chips even though they trip the
 * subject-start + 3-token heuristic (negation frames per the v0.3 verdict
 * table). Extend deliberately — additions mean the chunk is approved canon.
 */
export const PROTECTED_CHUNKS: ReadonlySet<string> = new Set([
  "je ne suis pas",
  "ce n'est pas",
]);

export function chipTokenCount(entry: string): number {
  // Split on whitespace, then split elisions so "j'ai" counts as two tokens.
  return entry
    .trim()
    .split(/\s+/)
    .flatMap((w) => w.split(/(?<=')/))
    .filter((t) => t.length > 0).length;
}

/** The reason `entry` is not an atomic chip, or `null` when it is legal. */
export function sentenceChipProblem(entry: string): string | null {
  const normalized = entry.trim().toLowerCase();
  if (TERMINAL_PUNCTUATION.test(entry)) {
    return "ends with sentence punctuation";
  }
  if (PROTECTED_CHUNKS.has(normalized)) return null;
  if (SUBJECT_START.test(normalized) && chipTokenCount(normalized) >= 3) {
    return "subject pronoun + 3+ tokens (sentence/clause)";
  }
  return null;
}

export type ChipTaxonomyDiagnostic = {
  code: "CHIP-TAXONOMY";
  lessonId: string;
  screenId: string;
  message: string;
};

/**
 * Report every illegal recap chip in one lesson.
 *
 * Scope is deliberately unchanged from the shipping guard: `recap.piecesUsed`
 * only. Weave `suggestedPieces` are NOT covered here, and widening to them
 * would be a policy change, not an alignment.
 */
export function reviewRecapChips(lesson: Lesson): ChipTaxonomyDiagnostic[] {
  const found: ChipTaxonomyDiagnostic[] = [];
  for (const screen of lesson.screens) {
    if (screen.type !== "recap") continue;
    const where = `${lesson.id}/${screen.id}`;
    for (const entry of screen.payload.piecesUsed ?? []) {
      if (entry.trim().length === 0) {
        found.push({
          code: "CHIP-TAXONOMY",
          lessonId: lesson.id,
          screenId: screen.id,
          message: `${where}: piecesUsed has an empty entry`,
        });
        continue;
      }
      const problem = sentenceChipProblem(entry);
      if (problem === null) continue;
      found.push({
        code: "CHIP-TAXONOMY",
        lessonId: lesson.id,
        screenId: screen.id,
        message:
          `${where}: piecesUsed chip ${JSON.stringify(entry)} is not atomic (${problem}). ` +
          "piecesUsed must be atomic chips or approved formula/package chunks; " +
          "full sentences belong in model answers (chip taxonomy v0.3 §7).",
      });
    }
  }
  return found;
}
