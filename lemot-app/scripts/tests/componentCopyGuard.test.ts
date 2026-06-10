/**
 * Dev APK component learner-copy guard (inventory finding N2 / F1 remainder).
 *
 * `devApkCopyGuard.test.ts` guards structured `lesson001.screens` only. The
 * learner copy that lives INSIDE the first-run TSX components is not structured
 * data, so this guard scans those specific files for the same banned terms and
 * em/en dashes that the lesson guard blocks.
 *
 * Scanned files (Dev APK first-test path only):
 *   - components/lesson-v1/LessonRendererV1.tsx  (header + CompletionView copy)
 *   - app/lesson-zero.tsx                         (Lesson Zero interstitial copy)
 *   - app/how-weave-works.tsx                     (How Weave Works interstitial)
 *
 * How false positives are avoided:
 *   - Comments are stripped first (block, line, and JSX comment bodies), so the
 *     intentional negative references in code comments (e.g. the
 *     LessonRenderer comment "No XP, level, streak, score, or percent.") and the
 *     `// Build —` em dash in lesson-zero never trip the scan.
 *   - Alphabetic banned terms are matched WHOLE-WORD, so identifiers like
 *     `accessibilityLabel` ("lab") or CSS `overflow` ("flow") do not match.
 *   - "score" is allowlisted ONLY for the intentional anti-gamification learner
 *     string "No score." in how-weave-works.tsx; any other "score" fails.
 *
 * Narrow by design: it does NOT scan the whole repo, app/dev/*, Founder/paywall
 * surfaces, or lesson metadata (already covered by devApkCopyGuard). Pure tsx:
 * reads files with node:fs; no React Native / Expo / device layer is loaded.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// `npm run test:learning-engine` always runs from lemot-app, so cwd is the app
// root. A wrong path throws ENOENT below (a loud failure, never a silent pass).
const APP_ROOT = process.cwd();

const TARGETS = [
  "components/lesson-v1/LessonRendererV1.tsx",
  "app/lesson-zero.tsx",
  "app/how-weave-works.tsx",
];

// Alphabetic banned terms, matched whole-word, case-insensitive. "score" is
// handled separately because of the allowlisted "No score." learner string.
const BANNED_WORDS = [
  "XP",
  "streak",
  "level",
  "reward",
  "Unlocked",
  "Perfect",
  "Amazing",
  "scaffold",
  "flow",
  "lab",
  "premium",
  "paywall",
];

const BANNED_PHRASES = ["Mini Mission", "Mini Chat"];

// En dash (U+2013) and em dash (U+2014). ASCII hyphen is allowed so French
// orthography (s'il vous plaît, pouvez-vous) is never flagged.
const DASH = /[–—]/;

// Intentional, allowlisted learner strings per file. Removed before the "score"
// check so the calm anti-gamification copy "No score." is permitted, but only in
// How Weave Works and nowhere else.
const SCORE_ALLOWLIST: Record<string, string[]> = {
  "app/how-weave-works.tsx": ["No score."],
};

/** Strip block, JSX, and line comments before scanning. */
function stripComments(src: string): string {
  // Block comments (this also removes the inner body of a JSX comment).
  let out = src.replace(/\/\*[\s\S]*?\*\//g, " ");
  // Line comments. The `[^:]` guard avoids eating `://` inside a URL string.
  out = out.replace(/(^|[^:])\/\/[^\n]*/g, "$1");
  return out;
}

describe("dev-apk component copy guard", () => {
  for (const rel of TARGETS) {
    const code = stripComments(readFileSync(join(APP_ROOT, rel), "utf8"));

    test(`${rel}: has content to scan`, () => {
      assert(code.trim().length > 0, `${rel} read empty (path/cwd problem)`);
    });

    test(`${rel}: no em dash or en dash in component copy`, () => {
      assert(!DASH.test(code), `${rel}: contains an em/en dash outside comments`);
    });

    test(`${rel}: no banned gamification / internal terms`, () => {
      for (const word of BANNED_WORDS) {
        const re = new RegExp(`\\b${word}\\b`, "i");
        assert(!re.test(code), `${rel}: contains banned term "${word}"`);
      }
      const lower = code.toLowerCase();
      for (const phrase of BANNED_PHRASES) {
        assert(
          !lower.includes(phrase.toLowerCase()),
          `${rel}: contains banned phrase "${phrase}"`,
        );
      }
    });

    test(`${rel}: no "score" except the allowlisted "No score."`, () => {
      let scrubbed = code;
      for (const allowed of SCORE_ALLOWLIST[rel] ?? []) {
        scrubbed = scrubbed.split(allowed).join(" ");
      }
      assert(
        !/\bscore\b/i.test(scrubbed),
        `${rel}: contains "score" outside the allowlisted "No score." learner string`,
      );
    });
  }
});
