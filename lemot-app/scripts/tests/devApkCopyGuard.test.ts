/**
 * Dev APK v1 learner-facing copy guard (inventory finding F1).
 *
 * `validate:content` only checks the learning-engine fixture, so the v1 lesson
 * path has no automated guard against learner-facing copy regressions (e.g. the
 * em-dash leak fixed in lesson 001, or gamification/internal terms slipping into
 * rendered strings). This locks the v1 Lesson 1 content against those.
 *
 * Conservative by design:
 *   - Imports STRUCTURED lesson data (every lesson in `V1_LESSONS`) instead of
 *     raw-scanning files, so comments and non-rendered code can never cause a
 *     false positive.
 *   - Walks only each lesson's `screens` (the rendered content). Lesson-level
 *     `designNotes` / `qaChecks` are siblings of `screens` and are NOT walked —
 *     those intentionally contain negative references like "No XP / streak ...".
 *   - Skips internal identifier / enum keys (ids, type tags, item refs) so slugs
 *     such as `s06-insight-shape-noticed` cannot trip a banned-word check.
 *   - Banned alphabetic terms are matched whole-word, so French hyphenated forms
 *     (pouvez-vous, est-ce que, allez-y) and substrings (e.g. "label") are safe.
 *
 * The RULES THEMSELVES now live in `content/lessons/learnerCopy.ts` so the
 * Content Factory candidate facade can enforce the same policy on a lesson that
 * is not in `V1_LESSONS` yet. This file keeps the per-lesson shipping
 * assertions; it no longer owns a private copy of the policy.
 *
 * Pure tsx: the v1 content import graph is type-only (no React Native / Expo /
 * device layer is loaded). Component-embedded copy (CompletionView, Lesson Zero,
 * How Weave Works) is intentionally NOT covered here — see the gap note at the
 * end of this file.
 */
import { describe, test, assert } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import {
  COPY_BANNED_PHRASES,
  COPY_BANNED_WORDS,
  COPY_DASH,
  lessonLearnerStrings,
} from "../../content/lessons/learnerCopy";

describe("dev-apk v1 copy guard", () => {
  // Covers every registered v1 lesson, so L1-L6 content PRs are born guarded
  // (Round 1 slice spec, PR B). Previously only lesson-001 was scanned.
  for (const lesson of V1_LESSONS) {
    const strings = lessonLearnerStrings(lesson);
    const L = lesson.id;

    test(`${L} exposes learner-facing screen strings to check`, () => {
      assert(
        strings.length > 0,
        `no learner-facing strings collected from ${L} screens — walk or import is broken`,
      );
    });

    test(`${L} learner copy has no em dash or en dash`, () => {
      for (const s of strings) {
        assert(
          !COPY_DASH.test(s),
          `${L} learner string contains an em/en dash: ${JSON.stringify(s)}`,
        );
      }
    });

    test(`${L} learner copy has no banned gamification / internal terms`, () => {
      for (const s of strings) {
        for (const word of COPY_BANNED_WORDS) {
          const re = new RegExp(`\\b${word}\\b`, "i");
          assert(
            !re.test(s),
            `${L} learner string contains banned term "${word}": ${JSON.stringify(s)}`,
          );
        }
        const lower = s.toLowerCase();
        for (const phrase of COPY_BANNED_PHRASES) {
          assert(
            !lower.includes(phrase.toLowerCase()),
            `${L} learner string contains banned phrase "${phrase}": ${JSON.stringify(s)}`,
          );
        }
      }
    });
  }
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
