/**
 * Deterministic answer grader (P2.1) — pure, AI-free, no storage/network.
 *
 * `grade()` maps a single learner answer to one primary `ErrorTagCode` (the P1.1
 * grading vocabulary) plus echo fields. It is the deterministic core the future
 * mastery reducer (P2.2) and renderer (P3) build on — "deterministic engine
 * first; AI may explain later but never overrides".
 *
 * Reuse: the canonical `normalizedAnswer` output and the token / boundary /
 * accepted-variant comparisons reuse `normalizeAnswer` from ./answer-check (the
 * app's lenient fold: case + accents + trailing punctuation + apostrophes). The
 * finer `accent_only` / `punctuation_only` distinctions need LAYERED
 * normalization (toggling one dimension at a time), so a small parameterized
 * normalizer lives here. The tiny `COMBINING` / `TRAILING_PUNCT` / `APOSTROPHE`
 * regexes mirror answer-check intentionally — answer-check is left untouched.
 *
 * Hard boundaries (P2.1): pure functions only. No `Date.now()`, no storage, no
 * network, no React, no AI, no mastery reducer (that is P2.2). Reuses `ItemId` /
 * `OperationId` from ./types and `ErrorTagCode` / `normalizeAnswer` already in
 * the engine.
 *
 * Boundary inputs are SURFACE FORMS (`blockedForms` / `recognitionOnlyForms`),
 * not item ids: `grade()` is registry-free and cannot resolve an `ItemId` to its
 * French text, so the caller (which has the graph + item registry) resolves
 * ids → forms before calling. `targetItemIds` is carried as passthrough context
 * only. (This refines the workstream's *suggested* `blockedItemIds` /
 * `recognitionOnlyItemIds` fields — see the PR note.)
 */
import type { ItemId, OperationId } from "./types";
import type { ErrorTagCode } from "./events";
import { normalizeAnswer } from "./answer-check";

/** Which dimensions count against correctness. Defaults: case-insensitive, accent- and punctuation-sensitive. */
export type GradeSupport = {
  caseSensitive?: boolean;
  accentSensitive?: boolean;
  punctuationSensitive?: boolean;
};

export type GradeInput = {
  operation: OperationId;
  userAnswer: string | null;
  expectedAnswer: string | null;
  /** Explicitly-allowed alternative forms (matched leniently) → accepted_variant. */
  acceptedAnswers?: string[];
  /** Passthrough context only; not used for text matching (grade is registry-free). */
  targetItemIds?: ItemId[];
  /** Surface forms the learner must NOT produce → blocked_form_used. */
  blockedForms?: string[];
  /** Surface forms shown but not yet produced → recognition_only_form_used. */
  recognitionOnlyForms?: string[];
  support?: GradeSupport;
};

export type GradeResult = {
  result: ErrorTagCode;
  /** All applicable tags; for P2.1 this is `[result]` (richer multi-tagging may come later). */
  errorTags: ErrorTagCode[];
  normalizedAnswer: string | null;
  expectedAnswer: string | null;
};

// Mirrors of answer-check's internals (kept local so answer-check stays untouched).
const COMBINING_MARKS = /[̀-ͯ]/g;
const TRAILING_PUNCT = /[.,;:!?…]+$/;
const APOSTROPHE_LIKE = /[’‘ʼ´]/g;

type NormOpts = {
  caseSensitive: boolean;
  accentSensitive: boolean;
  punctuationSensitive: boolean;
};

/** Layered normalizer: each dimension can be kept (sensitive) or folded (insensitive). */
function normalizeLayered(value: string, opts: NormOpts): string {
  let x = value.replace(APOSTROPHE_LIKE, "'").normalize("NFD");
  if (!opts.accentSensitive) x = x.replace(COMBINING_MARKS, "");
  if (!opts.caseSensitive) x = x.toLowerCase();
  x = x.replace(/\s+/g, " ").trim();
  if (!opts.punctuationSensitive) x = x.replace(TRAILING_PUNCT, "").trim();
  return x;
}

function tokens(value: string): string[] {
  const n = normalizeAnswer(value);
  return n.length === 0 ? [] : n.split(" ");
}

function freq(list: string[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const t of list) m.set(t, (m.get(t) ?? 0) + 1);
  return m;
}

/** Iterative Levenshtein distance (small inputs; deterministic). */
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = cur;
  }
  return prev[n];
}

/**
 * Grade one answer. Precedence:
 *   empty_or_skip → correct → accepted_variant → boundary (blocked /
 *   recognition_only) → punctuation_only → accent_only → wrong_order →
 *   missing_word / extra_word → spelling_near_miss → incorrect_but_understandable.
 *
 * `meaning_shift` is intentionally NOT emitted (no safe deterministic trigger yet).
 */
export function grade(input: GradeInput): GradeResult {
  const support: NormOpts = {
    caseSensitive: input.support?.caseSensitive ?? false,
    accentSensitive: input.support?.accentSensitive ?? true,
    punctuationSensitive: input.support?.punctuationSensitive ?? true,
  };

  const userRaw = input.userAnswer;
  const normalizedAnswer =
    userRaw === null ? null : normalizeAnswer(userRaw);
  const expectedAnswer = input.expectedAnswer;

  const make = (result: ErrorTagCode): GradeResult => ({
    result,
    errorTags: [result],
    normalizedAnswer,
    expectedAnswer,
  });

  // 1. empty / whitespace / null answer
  if (userRaw === null || userRaw.trim().length === 0) return make("empty_or_skip");
  const lenientUser = normalizeAnswer(userRaw);
  if (lenientUser.length === 0) return make("empty_or_skip");

  const expRaw = expectedAnswer ?? "";

  // 2. correct — strict match under the configured sensitivity
  const strict = (s: string) => normalizeLayered(s, support);
  if (expRaw.length > 0 && strict(userRaw) === strict(expRaw)) return make("correct");

  // 3. accepted_variant — explicitly allowed alternative (lenient match)
  if (
    input.acceptedAnswers?.some((a) => normalizeAnswer(a) === lenientUser)
  ) {
    return make("accepted_variant");
  }

  // 4. boundary tags — produced a form that must not be produced / not yet taught
  if (input.blockedForms?.some((f) => normalizeAnswer(f) === lenientUser)) {
    return make("blocked_form_used");
  }
  if (
    input.recognitionOnlyForms?.some((f) => normalizeAnswer(f) === lenientUser)
  ) {
    return make("recognition_only_form_used");
  }

  // With no expected answer to compare against, we cannot diagnose further.
  if (normalizeAnswer(expRaw).length === 0) return make("incorrect_but_understandable");

  // 5. punctuation_only — equal once trailing punctuation is folded (only meaningful when punctuation is sensitive)
  if (
    support.punctuationSensitive &&
    normalizeLayered(userRaw, { ...support, punctuationSensitive: false }) ===
      normalizeLayered(expRaw, { ...support, punctuationSensitive: false })
  ) {
    return make("punctuation_only");
  }

  // 6. accent_only — equal once accents are folded (only meaningful when accents are sensitive)
  if (
    support.accentSensitive &&
    normalizeLayered(userRaw, { ...support, accentSensitive: false }) ===
      normalizeLayered(expRaw, { ...support, accentSensitive: false })
  ) {
    return make("accent_only");
  }

  // Token-based diagnostics (lenient tokens)
  const userTokens = tokens(userRaw);
  const expTokens = tokens(expRaw);

  // 7. wrong_order — build only: same token multiset, different order
  if (input.operation === "build") {
    const sameMultiset =
      userTokens.length === expTokens.length &&
      [...freq(userTokens).entries()].every(
        ([t, c]) => (freq(expTokens).get(t) ?? 0) === c,
      );
    if (sameMultiset && userTokens.join(" ") !== expTokens.join(" ")) {
      return make("wrong_order");
    }
  }

  // 8. missing_word / extra_word — one-sided token multiset difference
  const ef = freq(expTokens);
  const uf = freq(userTokens);
  let missing = 0;
  let extra = 0;
  for (const [t, c] of ef) missing += Math.max(0, c - (uf.get(t) ?? 0));
  for (const [t, c] of uf) extra += Math.max(0, c - (ef.get(t) ?? 0));
  if (missing > 0 && extra === 0) return make("missing_word");
  if (extra > 0 && missing === 0) return make("extra_word");

  // 9. spelling_near_miss — conservative: single token each, small edit distance
  if (userTokens.length === 1 && expTokens.length === 1) {
    const u = userTokens[0];
    const e = expTokens[0];
    const maxDist = e.length <= 4 ? 1 : 2;
    const dist = levenshtein(u, e);
    if (dist > 0 && dist <= maxDist) return make("spelling_near_miss");
  }

  // 10. fallback — wrong but communicative (no safe meaning_shift trigger yet)
  return make("incorrect_but_understandable");
}
