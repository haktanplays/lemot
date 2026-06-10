/**
 * Grade + answer-check regression tests (PR-T1).
 *
 * Locks the behavior of the two existing PURE seams in the learning-engine:
 *   - `normalizeAnswer` / `checkAnswer` (content/learning-engine/answer-check)
 *   - `grade` (content/learning-engine/grade)
 *
 * These guard accepted answers, lenient normalization (case, accents, trailing
 * punctuation, curly-vs-straight apostrophe), answer matching, and the
 * deterministic feedback classification. No production logic is changed; the
 * expected outputs below are derived from the current implementation so a future
 * regression in normalization or grade precedence fails here.
 *
 * Pure tsx: both modules are AI-free / storage-free / React-free, so NO React
 * Native / Expo / device layer is loaded.
 */
import { describe, test, assert, assertEqual, deepEqual } from "./harness";
import {
  normalizeAnswer,
  checkAnswer,
} from "../../content/learning-engine/answer-check";
import { grade } from "../../content/learning-engine/grade";
import type { GradeInput } from "../../content/learning-engine/grade";

describe("answer-check normalizeAnswer", () => {
  test("strips diacritics and lowercases", () => {
    assertEqual(normalizeAnswer("CAFÉ"), "cafe", "CAFÉ folds to cafe");
  });

  test("collapses and trims whitespace", () => {
    assertEqual(
      normalizeAnswer("  Je   SUIS  ici "),
      "je suis ici",
      "extra whitespace collapses, lowercased, trimmed",
    );
  });

  test("drops trailing punctuation only", () => {
    assertEqual(normalizeAnswer("Bonjour!"), "bonjour", "trailing ! dropped");
    assertEqual(
      normalizeAnswer("Je suis ici."),
      "je suis ici",
      "trailing . dropped",
    );
  });

  test("preserves internal punctuation", () => {
    assertEqual(
      normalizeAnswer("L'addition, s'il vous plaît"),
      "l'addition, s'il vous plait",
      "internal comma and apostrophes preserved; only accents/case/trailing change",
    );
  });

  test("folds typographic apostrophes to ASCII", () => {
    assertEqual(
      normalizeAnswer("s’il vous plaît"),
      normalizeAnswer("s'il vous plait"),
      "curly and straight apostrophe compare equal after fold",
    );
  });

  test("empty / whitespace-only normalizes to empty string", () => {
    assertEqual(normalizeAnswer("   "), "", "whitespace-only is empty");
    assertEqual(normalizeAnswer(""), "", "empty stays empty");
  });

  test("is idempotent", () => {
    for (const s of ["CAFÉ", "  Je SUIS ici. ", "s’il vous plaît", "   "]) {
      assertEqual(
        normalizeAnswer(normalizeAnswer(s)),
        normalizeAnswer(s),
        `idempotent for ${JSON.stringify(s)}`,
      );
    }
  });
});

describe("answer-check checkAnswer", () => {
  test("accepts an exact answer", () => {
    assert(checkAnswer("Je suis ici", "Je suis ici"), "exact match accepted");
  });

  test("accepts leniently (case, accent, trailing punctuation, apostrophe)", () => {
    assert(checkAnswer("je suis ici.", "Je suis ici"), "case + trailing dot");
    assert(checkAnswer("CAFÉ", "cafe"), "case + accent");
    assert(
      checkAnswer("s'il vous plait", "s’il vous plaît"),
      "straight vs curly apostrophe + accent",
    );
  });

  test("rejects an incorrect answer", () => {
    assert(!checkAnswer("je suis là", "je suis ici"), "different word rejected");
  });

  test("rejects empty / whitespace-only input", () => {
    assert(!checkAnswer("", "je suis ici"), "empty input rejected");
    assert(!checkAnswer("   ", "je suis ici"), "whitespace-only input rejected");
  });

  test("rejects when target is undefined", () => {
    assert(!checkAnswer("anything", undefined), "undefined target rejected");
  });
});

// Banned learner-facing terms must never leak into a grade result code (the
// codes are an internal machine vocabulary, not learner copy).
const BANNED = [
  "xp",
  "streak",
  "level",
  "reward",
  "unlocked",
  "perfect",
  "amazing",
  "score",
];

describe("grade deterministic classifier", () => {
  const cases: { name: string; input: GradeInput; expected: string }[] = [
    {
      name: "exact correct",
      input: { operation: "fill", userAnswer: "Je suis ici", expectedAnswer: "Je suis ici" },
      expected: "correct",
    },
    {
      name: "correct despite case (case-insensitive default)",
      input: { operation: "fill", userAnswer: "JE SUIS ICI", expectedAnswer: "je suis ici" },
      expected: "correct",
    },
    {
      name: "accepted_variant from acceptedAnswers",
      input: {
        operation: "fill",
        userAnswer: "coucou",
        expectedAnswer: "bonjour",
        acceptedAnswers: ["coucou"],
      },
      expected: "accepted_variant",
    },
    {
      name: "blocked_form_used",
      input: {
        operation: "fill",
        userAnswer: "voudrais",
        expectedAnswer: "suis",
        blockedForms: ["voudrais"],
      },
      expected: "blocked_form_used",
    },
    {
      name: "recognition_only_form_used",
      input: {
        operation: "fill",
        userAnswer: "bonjour",
        expectedAnswer: "suis",
        recognitionOnlyForms: ["bonjour"],
      },
      expected: "recognition_only_form_used",
    },
    {
      name: "punctuation_only (trailing punctuation difference)",
      input: { operation: "fill", userAnswer: "je suis ici", expectedAnswer: "je suis ici!" },
      expected: "punctuation_only",
    },
    {
      name: "accent_only (accent difference)",
      input: { operation: "fill", userAnswer: "cafe", expectedAnswer: "café" },
      expected: "accent_only",
    },
    {
      name: "wrong_order (build, same tokens reordered)",
      input: { operation: "build", userAnswer: "ici suis je", expectedAnswer: "je suis ici" },
      expected: "wrong_order",
    },
    {
      name: "missing_word",
      input: { operation: "fill", userAnswer: "je suis", expectedAnswer: "je suis ici" },
      expected: "missing_word",
    },
    {
      name: "extra_word",
      input: { operation: "fill", userAnswer: "je suis ici maintenant", expectedAnswer: "je suis ici" },
      expected: "extra_word",
    },
    {
      name: "spelling_near_miss (single token, small edit distance)",
      input: { operation: "fill", userAnswer: "bonjor", expectedAnswer: "bonjour" },
      expected: "spelling_near_miss",
    },
    {
      name: "incorrect_but_understandable (fallback)",
      input: { operation: "fill", userAnswer: "le chat noir", expectedAnswer: "je suis ici" },
      expected: "incorrect_but_understandable",
    },
    {
      name: "empty_or_skip (null answer)",
      input: { operation: "fill", userAnswer: null, expectedAnswer: "je suis ici" },
      expected: "empty_or_skip",
    },
    {
      name: "empty_or_skip (whitespace-only answer)",
      input: { operation: "fill", userAnswer: "   ", expectedAnswer: "je suis ici" },
      expected: "empty_or_skip",
    },
    {
      name: "null expected answer is handled safely",
      input: { operation: "fill", userAnswer: "hello", expectedAnswer: null },
      expected: "incorrect_but_understandable",
    },
  ];

  for (const c of cases) {
    test(`classifies: ${c.name}`, () => {
      const r = grade(c.input);
      assertEqual(r.result, c.expected, `${c.name}: result`);
    });
  }

  test("result shape stays stable", () => {
    const input: GradeInput = {
      operation: "fill",
      userAnswer: "Je suis ici",
      expectedAnswer: "Je suis ici",
    };
    const r = grade(input);
    assert(
      deepEqual(r.errorTags, [r.result]),
      "errorTags is exactly [result] in P2.1",
    );
    assertEqual(
      r.normalizedAnswer,
      normalizeAnswer("Je suis ici"),
      "normalizedAnswer echoes the normalized user answer",
    );
    assertEqual(
      r.expectedAnswer,
      "Je suis ici",
      "expectedAnswer echoes the input",
    );
  });

  test("normalizedAnswer is null for a null user answer", () => {
    const r = grade({ operation: "fill", userAnswer: null, expectedAnswer: "x" });
    assert(r.normalizedAnswer === null, "null user answer yields null normalizedAnswer");
  });

  test("result codes carry no learner-facing score/reward wording", () => {
    for (const c of cases) {
      const r = grade(c.input);
      assert(
        /^[a-z_]+$/.test(r.result),
        `result "${r.result}" is a snake_case machine code, not prose`,
      );
      const lower = r.result.toLowerCase();
      for (const word of BANNED) {
        assert(
          !lower.includes(word),
          `result code "${r.result}" must not contain "${word}"`,
        );
      }
    }
  });
});
