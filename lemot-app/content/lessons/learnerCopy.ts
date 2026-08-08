/**
 * Learner-facing copy policy for v1 lessons — the single source of truth.
 *
 * EXTRACTED, NOT AUTHORED. Every rule below previously lived inline in
 * `scripts/tests/devApkCopyGuard.test.ts` and is reproduced here unchanged:
 * same excluded keys, same banned words, same banned phrases, same dash class,
 * same walk. The policy is not widened by this move — it is only made callable
 * from more than one place.
 *
 * Why it moved: the first Content Factory lesson (L16) passed candidate
 * validation and then failed this guard at shipping time on em dashes. A rule
 * that can only run over `V1_LESSONS` cannot protect a candidate that is not in
 * `V1_LESSONS` yet. Both the shipping test and the factory facade now call the
 * same function, so "the factory accepted it" and "the repo will accept it"
 * cannot drift apart again.
 *
 * Conservative by design, exactly as before:
 *   - walks STRUCTURED lesson data, never raw files, so comments and
 *     non-rendered code can never cause a false positive;
 *   - walks only `screens`. Lesson-level `designNotes` / `qaChecks` are
 *     siblings and are NOT walked — those intentionally contain negative
 *     references like "No XP / streak ...";
 *   - skips internal identifier / enum keys so slugs such as
 *     `s06-insight-shape-noticed` cannot trip a banned-word check;
 *   - matches banned alphabetic terms whole-word, so French hyphenated forms
 *     (pouvez-vous, est-ce que, allez-y) and substrings (e.g. "label") are safe.
 */
import type { Lesson } from "../lessonTypes";

/** Keys whose string values are internal identifiers / enums, not learner copy. */
export const COPY_EXCLUDED_KEYS: ReadonlySet<string> = new Set([
  "id",
  "type",
  "insightType",
  "weaveType",
  "validationMode",
  "targetItemIds",
  "weakPointTags",
  "itemId",
  "answer",
]);

/**
 * Gamification / internal terms that must never appear in learner-facing copy.
 * Matched whole-word, case-insensitive.
 */
export const COPY_BANNED_WORDS: readonly string[] = [
  "XP",
  "streak",
  "level",
  "reward",
  "Unlocked",
  "Perfect",
  "Amazing",
  "score",
  "percent",
  "scaffold",
  "flow",
  "lab",
];

/** Banned multi-word phrases (case-insensitive substring). */
export const COPY_BANNED_PHRASES: readonly string[] = ["Mini Mission", "Mini Chat"];

/**
 * En dash (U+2013) and em dash (U+2014). Plain ASCII hyphen is allowed so
 * French orthography (s'il vous plaît, pouvez-vous, allez-y) stays safe.
 */
export const COPY_DASH = /[–—]/;

/** Collect every learner-facing string under `node`, skipping excluded keys. */
export function collectLearnerStrings(node: unknown, out: string[]): void {
  if (typeof node === "string") {
    out.push(node);
    return;
  }
  if (Array.isArray(node)) {
    for (const v of node) collectLearnerStrings(v, out);
    return;
  }
  if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (COPY_EXCLUDED_KEYS.has(key)) continue;
      collectLearnerStrings(value, out);
    }
  }
}

/** Every learner-facing string in one lesson's rendered screens. */
export function lessonLearnerStrings(lesson: Lesson): string[] {
  const out: string[] = [];
  collectLearnerStrings(lesson.screens, out);
  return out;
}

export type LearnerCopyDiagnostic = {
  code: "COPY-GUARD";
  lessonId: string;
  message: string;
};

/**
 * Report every learner-copy violation in one lesson.
 *
 * Messages are byte-identical to the ones the shipping test raises, so a
 * factory rejection and a repo test failure read the same.
 */
export function reviewLearnerCopy(lesson: Lesson): LearnerCopyDiagnostic[] {
  const found: LearnerCopyDiagnostic[] = [];
  const L = lesson.id;
  for (const s of lessonLearnerStrings(lesson)) {
    if (COPY_DASH.test(s)) {
      found.push({
        code: "COPY-GUARD",
        lessonId: L,
        message: `${L} learner string contains an em/en dash: ${JSON.stringify(s)}`,
      });
    }
    for (const word of COPY_BANNED_WORDS) {
      if (new RegExp(`\\b${word}\\b`, "i").test(s)) {
        found.push({
          code: "COPY-GUARD",
          lessonId: L,
          message: `${L} learner string contains banned term "${word}": ${JSON.stringify(s)}`,
        });
      }
    }
    const lower = s.toLowerCase();
    for (const phrase of COPY_BANNED_PHRASES) {
      if (lower.includes(phrase.toLowerCase())) {
        found.push({
          code: "COPY-GUARD",
          lessonId: L,
          message: `${L} learner string contains banned phrase "${phrase}": ${JSON.stringify(s)}`,
        });
      }
    }
  }
  return found;
}
