/**
 * Pool & lesson content validator (v2).
 *
 * Errors block the pipeline (exit 1):
 * - missing `fr` on Weave Fill items (L1-L5 only — Dev APK scope)
 * - placeholders ([___] / ___) leaking into `fr`
 * - English remnants inside `fr` (e.g. " the ", " a coffee")
 * - repeated negation tokens (pas pas, ne ne) in s/fr
 * - obviously English answers in `a` or `blanks[]`
 * - FlashCard.lessonId missing, non-integer, or referencing a non-existent lesson
 *
 * Warnings print but do not block:
 * - BuildSentence `c[]` contains a multi-word lexical chunk split across
 *   adjacent tiles (e.g. "au", "revoir" instead of "au revoir"). These
 *   are visible-fragment bugs that match the in-app pattern observed
 *   for "Pouvez-vous répéter" / "au revoir" rendering. Several legacy
 *   items still trip this rule pending a content pass — keeping it as
 *   a warning surfaces them in CI without blocking unrelated work.
 * - Placeholder count in `s` does not match `blanks.length` (or 1 when no
 *   blanks). The "ne...pas" split-answer teaching pattern (recognized via
 *   `a` containing literal "...") is exempted. A few legacy items have a
 *   missing-blank `s` that still trips this — same treatment as above.
 *
 * Run:
 *   npm run validate:pools
 *
 * Exits 1 on any error (prints all errors and warnings first).
 */
import { LESSONS } from "../data/lessons";
import { LESSON_POOLS } from "../data/pools";
import { FLASH } from "../data/flashcards";
import type { FillItem } from "../lib/types";

// Dev APK scope — only these lessons must have populated fr on fillFG.
// L6-L24 fr will be populated during content expansion (see CANON).
const DEV_APK_MAX_LESSON = 5;

const ENGLISH_ANSWER_BLACKLIST = new Set([
  "go",
  "want",
  "understand",
  "where",
  "hello",
  "thanks",
  "coffee",
  "please",
]);

const HYBRID_FR_PHRASES = [" me,", " me ", " the ", " a coffee"];

const NEGATION_REPEATS = ["pas pas", "ne ne"];

type Severity = "error" | "warning";

interface Issue {
  source: string;
  rule: string;
  detail: string;
  severity: Severity;
}

const issues: Issue[] = [];

// Multi-word lexical chunks that should travel as a single tile in
// BuildSentence `c[]`. Splitting them ("au", "revoir") creates the
// visible-fragment bug — at any intermediate step the on-screen
// arrangement reads only the first piece while TTS speaks the whole.
const PROTECTED_PHRASES: string[][] = [
  ["au", "revoir"],
  ["à", "bientôt"],
  ["s'il", "vous", "plaît"],
  ["s'il", "vous", "plait"],
  ["excusez", "moi"],
  ["pouvez", "vous"],
  ["parce", "que"],
  ["est-ce", "que"],
];

function fillPlaceholders(s: string, item: FillItem): string {
  // Replace [___] or bare ___ groups with the actual answers for negation scanning.
  // Multi-blank items carry the correct sequence in `blanks[]`; single-blank items use `a`.
  const fillers =
    item.blanks && item.blanks.length > 0 ? item.blanks : [item.a];
  let idx = 0;
  return s.replace(/\[_+\]|_{2,}/g, () => {
    const v = fillers[idx] ?? item.a;
    idx++;
    return v;
  });
}

function checkFillItem(
  source: string,
  item: FillItem,
  requireFr: boolean
): void {
  // Rule 1 — fr presence (only enforced where the canon requires it).
  if (requireFr && (!item.fr || item.fr.trim().length === 0)) {
    issues.push({
      source,
      rule: "missing-fr",
      detail: `s="${item.s}", a="${item.a}"`,
      severity: "error",
    });
  }

  // Rule 2 — fr must not contain blank placeholders.
  if (item.fr && (item.fr.includes("[___]") || /_{2,}/.test(item.fr))) {
    issues.push({
      source,
      rule: "fr-has-placeholder",
      detail: `fr="${item.fr}"`,
      severity: "error",
    });
  }

  // Rule 3 — fr must not contain obvious English remnants.
  // (s legitimately mixes English in Weave items, so we only scan fr.)
  if (item.fr) {
    for (const phrase of HYBRID_FR_PHRASES) {
      if (item.fr.includes(phrase)) {
        issues.push({
          source,
          rule: "hybrid-english-in-fr",
          detail: `phrase="${phrase.trim()}", fr="${item.fr}"`,
          severity: "error",
        });
      }
    }
  }

  // Rule 4 — repeated negation tokens (data bug, not a teaching pattern).
  const filledS = fillPlaceholders(item.s, item);
  for (const repeat of NEGATION_REPEATS) {
    if (filledS.includes(repeat)) {
      issues.push({
        source,
        rule: "double-negation-s",
        detail: `pattern="${repeat}", filled="${filledS}"`,
        severity: "error",
      });
    }
    if (item.fr && item.fr.includes(repeat)) {
      issues.push({
        source,
        rule: "double-negation-fr",
        detail: `pattern="${repeat}", fr="${item.fr}"`,
        severity: "error",
      });
    }
  }

  // Rule 5 — answers should not be obvious English words.
  const answers = [item.a, ...(item.blanks ?? [])];
  for (const ans of answers) {
    const lower = ans.toLowerCase().trim();
    if (ENGLISH_ANSWER_BLACKLIST.has(lower)) {
      issues.push({
        source,
        rule: "english-answer",
        detail: `answer="${ans}"`,
        severity: "error",
      });
    }
  }

  // Rule 6 — placeholder count in `s` must match the answer slot count.
  // Multi-blank: blanks.length placeholders. Single-blank: exactly 1.
  // Skip the "split answer" teaching pattern where `a` carries the literal
  // ellipsis (e.g. "ne...pas", "ne...jamais") — the two placeholders fill
  // around a verb that is not itself a blank, which is intentional.
  // Demoted to warning because legacy items still trip this — surface them
  // for a future content pass without blocking the pipeline.
  const isSplitAnswerPattern = item.a.includes("...");
  if (!isSplitAnswerPattern) {
    const placeholderCount = (item.s.match(/\[_+\]|_{2,}/g) || []).length;
    const expectedCount = item.blanks?.length ?? 1;
    if (placeholderCount !== expectedCount) {
      issues.push({
        source,
        rule: "placeholder-count-mismatch",
        detail: `s has ${placeholderCount} placeholder(s), expected ${expectedCount} (s="${item.s}")`,
        severity: "warning",
      });
    }
  }
}

// Rule 7 — protected lexical chunks must travel as a single tile.
function checkPhraseFragments(source: string, c: string[]): void {
  const lower = c.map((t) => t.toLowerCase());
  for (const phrase of PROTECTED_PHRASES) {
    if (phrase.length < 2 || lower.length < phrase.length) continue;
    for (let i = 0; i <= lower.length - phrase.length; i++) {
      let match = true;
      for (let j = 0; j < phrase.length; j++) {
        if (lower[i + j] !== phrase[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        issues.push({
          source,
          rule: "phrase-fragmented",
          detail: `split "${phrase.join(" ")}" across tiles ${i}..${
            i + phrase.length - 1
          }, c=[${c.map((t) => `"${t}"`).join(", ")}]`,
          severity: "warning",
        });
      }
    }
  }
}

// ── Walk lessons ──
const VALID_LESSON_IDS = new Set(LESSONS.map((l) => l.id));

for (const lesson of LESSONS) {
  const requireFr = lesson.id <= DEV_APK_MAX_LESSON;
  lesson.fillFG.forEach((item, i) => {
    checkFillItem(`lesson${lesson.id}.fillFG[${i}]`, item, requireFr);
  });
  lesson.fillBlanks.forEach((item, i) => {
    // fillBlanks `s` is already French — fr is only a TTS clarifier, not required.
    checkFillItem(`lesson${lesson.id}.fillBlanks[${i}]`, item, false);
  });
  lesson.buildSentences.forEach((item, i) => {
    checkPhraseFragments(`lesson${lesson.id}.buildSentences[${i}].c`, item.c);
    if (item.trap) {
      checkPhraseFragments(
        `lesson${lesson.id}.buildSentences[${i}].trap`,
        item.trap
      );
    }
  });
}

// ── Walk pools ──
for (const [idStr, pool] of Object.entries(LESSON_POOLS)) {
  const lessonId = parseInt(idStr, 10);
  const requireFr = lessonId <= DEV_APK_MAX_LESSON;
  pool.fillFG.forEach((item, i) => {
    checkFillItem(`pool${lessonId}.fillFG[${i}]`, item, requireFr);
  });
  pool.fillBlanks.forEach((item, i) => {
    checkFillItem(`pool${lessonId}.fillBlanks[${i}]`, item, false);
  });
}

// ── Walk flashcards ──
// Rule 8 — every FlashCard must carry an integer lessonId in the
// curriculum range so Daily Review's lesson-scope filter works correctly.
FLASH.forEach((card, i) => {
  const source = `flashcards[${i}] (fr="${card.fr}")`;
  if (typeof card.lessonId !== "number" || !Number.isInteger(card.lessonId)) {
    issues.push({
      source,
      rule: "flashcard-bad-lessonId",
      detail: `lessonId=${JSON.stringify(card.lessonId)} (must be an integer)`,
      severity: "error",
    });
    return;
  }
  if (!VALID_LESSON_IDS.has(card.lessonId)) {
    issues.push({
      source,
      rule: "flashcard-unknown-lessonId",
      detail: `lessonId=${card.lessonId} does not match any lesson in LESSONS`,
      severity: "error",
    });
  }
});

// ── Report ──
const errors = issues.filter((i) => i.severity === "error");
const warnings = issues.filter((i) => i.severity === "warning");

if (warnings.length > 0) {
  console.warn(`! ${warnings.length} warning(s):`);
  for (const w of warnings) {
    console.warn(`  [${w.rule}] ${w.source}: ${w.detail}`);
  }
  console.warn("");
}

if (errors.length > 0) {
  console.error(`✗ Pool validation failed: ${errors.length} error(s)`);
  for (const e of errors) {
    console.error(`  [${e.rule}] ${e.source}: ${e.detail}`);
  }
  process.exit(1);
}

console.log(
  warnings.length > 0
    ? `✓ Pool validation passed (${warnings.length} warning(s) above)`
    : "✓ Pool validation passed"
);
