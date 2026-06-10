/**
 * Dev APK v1 learner-facing copy guard (inventory finding F1).
 *
 * `validate:content` only checks the learning-engine fixture, so the v1 lesson
 * path has no automated guard against learner-facing copy regressions (e.g. the
 * em-dash leak fixed in lesson 001, or gamification/internal terms slipping into
 * rendered strings). This locks the v1 Lesson 1 content against those.
 *
 * Conservative by design:
 *   - Imports STRUCTURED lesson data (`lesson001`) instead of raw-scanning files,
 *     so comments and non-rendered code can never cause a false positive.
 *   - Walks only `lesson001.screens` (the rendered content). Lesson-level
 *     `designNotes` / `qaChecks` are siblings of `screens` and are NOT walked —
 *     those intentionally contain negative references like "No XP / streak ...".
 *   - Skips internal identifier / enum keys (ids, type tags, item refs) so slugs
 *     such as `s06-insight-shape-noticed` cannot trip a banned-word check.
 *   - Banned alphabetic terms are matched whole-word, so French hyphenated forms
 *     (pouvez-vous, est-ce que, allez-y) and substrings (e.g. "label") are safe.
 *
 * Pure tsx: the v1 content import graph is type-only (no React Native / Expo /
 * device layer is loaded). Component-embedded copy (CompletionView, Lesson Zero,
 * How Weave Works) is intentionally NOT covered here — see the gap note at the
 * end of this file.
 */
import { describe, test, assert } from "./harness";
import { lesson001 } from "../../content/lessons/v1/lesson-001";

// Keys whose string values are internal identifiers / enums, not learner copy.
const EXCLUDE_KEYS = new Set([
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

// Gamification / internal terms that must never appear in learner-facing copy.
// Matched whole-word, case-insensitive.
const BANNED_WORDS = [
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

// Banned multi-word phrases (case-insensitive substring).
const BANNED_PHRASES = ["Mini Mission", "Mini Chat"];

// En dash (U+2013) and em dash (U+2014). Plain ASCII hyphen is allowed so French
// orthography (s'il vous plaît stays untouched; pouvez-vous, allez-y) is safe.
const DASH = /[–—]/;

/** Collect every learner-facing string under `node`, skipping EXCLUDE_KEYS. */
function collectLearnerStrings(node: unknown, out: string[]): void {
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
      if (EXCLUDE_KEYS.has(key)) continue;
      collectLearnerStrings(value, out);
    }
  }
}

describe("dev-apk v1 copy guard", () => {
  const strings: string[] = [];
  collectLearnerStrings(lesson001.screens, strings);

  test("lesson 001 exposes learner-facing screen strings to check", () => {
    assert(
      strings.length > 0,
      "no learner-facing strings collected from lesson001.screens — walk or import is broken",
    );
  });

  test("lesson 001 learner copy has no em dash or en dash", () => {
    for (const s of strings) {
      assert(
        !DASH.test(s),
        `lesson 001 learner string contains an em/en dash: ${JSON.stringify(s)}`,
      );
    }
  });

  test("lesson 001 learner copy has no banned gamification / internal terms", () => {
    for (const s of strings) {
      for (const word of BANNED_WORDS) {
        const re = new RegExp(`\\b${word}\\b`, "i");
        assert(
          !re.test(s),
          `lesson 001 learner string contains banned term "${word}": ${JSON.stringify(s)}`,
        );
      }
      const lower = s.toLowerCase();
      for (const phrase of BANNED_PHRASES) {
        assert(
          !lower.includes(phrase.toLowerCase()),
          `lesson 001 learner string contains banned phrase "${phrase}": ${JSON.stringify(s)}`,
        );
      }
    }
  });
});

/*
 * Guardrail gap (intentional, reported for a later PR):
 * CompletionView (LessonRendererV1.tsx), Lesson Zero, and How Weave Works hold
 * learner copy inside TSX, not importable structured data. A raw file scan is
 * unsafe here because:
 *   - LessonRendererV1.tsx has a comment that lists banned words on purpose
 *     ("No XP, level, streak, score, or percent.").
 *   - how-weave-works.tsx has the intended learner string "No score." which a
 *     banned-word scan would wrongly flag.
 *   - lesson-zero.tsx has an em dash inside a code comment.
 * Guarding these safely needs either extracting their copy into importable
 * constants (a runtime change, out of scope here) or a comment-aware scanner.
 */
