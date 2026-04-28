/**
 * Pool & lesson content validator (v1).
 *
 * Catches obvious content mistakes before they reach the runtime:
 * - missing `fr` on Weave Fill items (L1-L5 only — Dev APK scope)
 * - placeholders ([___] / ___) leaking into `fr`
 * - English remnants inside `fr` (e.g. " the ", " a coffee")
 * - repeated negation tokens (pas pas, ne ne) in s/fr
 * - obviously English answers in `a` or `blanks[]`
 *
 * Run:
 *   npm run validate:pools
 *
 * Exits 1 on any issue (prints file/item context first).
 */
import { LESSONS } from "../data/lessons";
import { LESSON_POOLS } from "../data/pools";
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

interface Issue {
  source: string;
  rule: string;
  detail: string;
}

const issues: Issue[] = [];

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
    });
  }

  // Rule 2 — fr must not contain blank placeholders.
  if (item.fr && (item.fr.includes("[___]") || /_{2,}/.test(item.fr))) {
    issues.push({
      source,
      rule: "fr-has-placeholder",
      detail: `fr="${item.fr}"`,
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
      });
    }
    if (item.fr && item.fr.includes(repeat)) {
      issues.push({
        source,
        rule: "double-negation-fr",
        detail: `pattern="${repeat}", fr="${item.fr}"`,
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
      });
    }
  }
}

// ── Walk lessons ──
for (const lesson of LESSONS) {
  const requireFr = lesson.id <= DEV_APK_MAX_LESSON;
  lesson.fillFG.forEach((item, i) => {
    checkFillItem(`lesson${lesson.id}.fillFG[${i}]`, item, requireFr);
  });
  lesson.fillBlanks.forEach((item, i) => {
    // fillBlanks `s` is already French — fr is only a TTS clarifier, not required.
    checkFillItem(`lesson${lesson.id}.fillBlanks[${i}]`, item, false);
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

// ── Report ──
if (issues.length > 0) {
  console.error(`✗ Pool validation failed: ${issues.length} issue(s)\n`);
  for (const issue of issues) {
    console.error(`  [${issue.rule}] ${issue.source}: ${issue.detail}`);
  }
  process.exit(1);
}

console.log("✓ Pool validation passed");
