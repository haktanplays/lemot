/**
 * Error Engine v0 (Cairn spec §13) — pure, AI-free, no storage/network.
 *
 * Two vocabularies exist in the engine and this module is the single bridge
 * between them, so the codebase never grows two learner-facing feedback
 * languages:
 *
 *  - `ErrorTagCode` (./events) — the GRADING/event vocabulary. It is what
 *    `grade()` computes, what the event log stores, and what the mastery
 *    reducer consumes. It stays.
 *  - `FeedbackVerdict` (spec §13.1, here) — the LEARNER-FACING feedback
 *    vocabulary. Anything that renders feedback to the learner must consume a
 *    `FeedbackVerdict` (via `resolveFeedback` / `feedbackVerdictFromGrade`),
 *    never a raw `ErrorTagCode`.
 *
 * The error taxonomy (spec §13.2) is data + narrow deterministic detectors.
 * Every taxonomy id carries a mode:
 *
 *  - `deterministic` — detected here, in pure code, always available.
 *  - `ai_assisted` — needs semantic judgment; v0 has NO AI path, so these ids
 *    never fire. Fallback ladder (spec/roadmap): when AI is absent, disabled,
 *    or rate-limited, diagnosis falls back to the deterministic subset —
 *    `availableErrorIds(false)`. AI may later REFINE a diagnosis; it never
 *    overrides a deterministic one (deterministic engine first).
 *
 * Hard boundaries: pure functions only. No Date.now(), no storage, no network,
 * no React, no AI. Registry-free like grade(): all context arrives as surface
 * forms provided by the caller.
 */
import type { OperationId } from "./types";
import type { ErrorTagCode } from "./events";
import { normalizeAnswer } from "./answer-check";

// ── Feedback verdicts (spec §13.1) ─────────────────────────────────────────

/** Learner-facing feedback verdict. UI tone per spec §13.1. */
export type FeedbackVerdict =
  | "accepted" // answer satisfies target — calm success
  | "accepted_with_note" // correct enough + nuance — supportive note
  | "neutral_compare" // partial/mixed/valid learning attempt — no red/error
  | "precision_issue" // specific near-miss — small correction
  | "wrong_target" // answered a different prompt — attention redirect
  | "repair_opportunity" // known error worth practice — guided repair
  | "not_yet"; // too early/unknown — "not required yet"

// ── Error taxonomy (spec §13.2) ────────────────────────────────────────────

export type ErrorEngineMode = "deterministic" | "ai_assisted";

export type ErrorTaxonomyId =
  | "wrong_auxiliary_faim"
  | "partitive_negative"
  | "sentence_replay"
  | "target_missing"
  | "exposure_gap_allowed"
  | "overliteral_translation"
  | "register_mismatch"
  | "article_gender_mismatch"
  | "negation_frame_missing"
  | "protected_chunk_split"
  | "ghost_required_by_mistake";

export type ErrorTaxonomyEntry = {
  id: ErrorTaxonomyId;
  mode: ErrorEngineMode;
  /** The feedback verdict this diagnosis resolves to when it fires. */
  verdict: FeedbackVerdict;
  /** Canonical example from spec §13.2. */
  example: string;
  /** Diagnosis note (authoring/dev facing, not learner copy). */
  diagnosis: string;
  /** Learner-facing response copy (calm tone; no red/failure language). */
  learnerResponse: string;
};

/**
 * The 11-entry taxonomy, verbatim from spec §13.2. Verdict assignments follow
 * the spec's Response column and §13.3 Weave rules:
 *  - guided-repair responses → repair_opportunity
 *  - attention redirects → wrong_target
 *  - small contrasts → precision_issue
 *  - allowed partials / "gentle prompt or compare" → neutral_compare
 *  - register nuance ("may be feedback rather than wrong", §34.2)
 *    → accepted_with_note
 */
export const ERROR_TAXONOMY: Record<ErrorTaxonomyId, ErrorTaxonomyEntry> = {
  wrong_auxiliary_faim: {
    id: "wrong_auxiliary_faim",
    mode: "deterministic",
    verdict: "repair_opportunity",
    example: "je suis faim",
    diagnosis: "English transfer: to be + hungry instead of avoir + faim.",
    learnerResponse: "French uses j'ai with faim: j'ai faim.",
  },
  partitive_negative: {
    id: "partitive_negative",
    mode: "deterministic",
    verdict: "repair_opportunity",
    example: "pas de l'eau",
    diagnosis: "Negative partitive edge: de l'/du/de la does not follow pas.",
    learnerResponse: "After pas, French often uses de / d'. de l'eau becomes pas d'eau.",
  },
  sentence_replay: {
    id: "sentence_replay",
    mode: "deterministic",
    verdict: "wrong_target",
    example: "repeats a previous weave answer for a new target",
    diagnosis: "Attention / target salience: old accepted answer replayed.",
    learnerResponse: "New target. Read the situation again.",
  },
  target_missing: {
    id: "target_missing",
    mode: "deterministic",
    verdict: "neutral_compare",
    example: "answer contains none of the target pieces",
    diagnosis: "Target not attempted.",
    learnerResponse: "Compare with the model answer. Try using the new piece.",
  },
  exposure_gap_allowed: {
    id: "exposure_gap_allowed",
    mode: "deterministic",
    verdict: "neutral_compare",
    example: "je ne suis pas ici to talk",
    diagnosis: "Allowed partial: known pieces present, English gap left.",
    learnerResponse: "Compare with the model answer.",
  },
  overliteral_translation: {
    id: "overliteral_translation",
    mode: "ai_assisted",
    verdict: "neutral_compare",
    example: "word-by-word unnatural French",
    diagnosis: "Translation transfer; needs semantic judgment (AI-assisted).",
    learnerResponse: "Compare with the model answer. Notice how French says it.",
  },
  register_mismatch: {
    id: "register_mismatch",
    mode: "ai_assisted",
    verdict: "accepted_with_note",
    example: "tu in a formal context",
    diagnosis: "Context/register nuance; needs context judgment (AI-assisted).",
    learnerResponse: "Notice: with strangers, French usually uses vous.",
  },
  article_gender_mismatch: {
    id: "article_gender_mismatch",
    mode: "deterministic",
    verdict: "precision_issue",
    example: "un question",
    diagnosis: "Gender/article mismatch on a known package noun.",
    learnerResponse: "Notice the package: une question.",
  },
  negation_frame_missing: {
    id: "negation_frame_missing",
    mode: "deterministic",
    verdict: "precision_issue",
    example: "je suis pas",
    diagnosis: "Missing ne in a taught ne...pas frame.",
    learnerResponse: "The taught frame keeps both parts: ne ... pas.",
  },
  protected_chunk_split: {
    id: "protected_chunk_split",
    mode: "deterministic",
    verdict: "repair_opportunity",
    example: "si il vous plaît",
    diagnosis: "Elision chunk split in production.",
    learnerResponse: "si + il becomes s'il. You say: s'il.",
  },
  ghost_required_by_mistake: {
    id: "ghost_required_by_mistake",
    mode: "deterministic",
    verdict: "neutral_compare",
    example: "missing exposure word marked as an error",
    diagnosis:
      "SYSTEM BUG guard, not a learner error: an exposure/ghost form was configured as required. Exposure must never be required for correctness.",
    learnerResponse: "Compare with the model answer.",
  },
};

export const DETERMINISTIC_ERROR_IDS: readonly ErrorTaxonomyId[] = (
  Object.values(ERROR_TAXONOMY) as ErrorTaxonomyEntry[]
)
  .filter((e) => e.mode === "deterministic")
  .map((e) => e.id);

export const AI_ASSISTED_ERROR_IDS: readonly ErrorTaxonomyId[] = (
  Object.values(ERROR_TAXONOMY) as ErrorTaxonomyEntry[]
)
  .filter((e) => e.mode === "ai_assisted")
  .map((e) => e.id);

/**
 * Fallback ladder (roadmap Faz 3.4): the diagnosable subset given AI
 * availability. v0 always runs with `aiAvailable = false`; when an AI lane
 * exists and is up, the full taxonomy becomes diagnosable, and any AI
 * outage/rate limit drops back to the deterministic subset.
 */
export function availableErrorIds(aiAvailable: boolean): readonly ErrorTaxonomyId[] {
  return aiAvailable
    ? (Object.keys(ERROR_TAXONOMY) as ErrorTaxonomyId[])
    : DETERMINISTIC_ERROR_IDS;
}

// ── Migration mapping: ErrorTagCode → FeedbackVerdict (roadmap Faz 3.3) ───

/** Operations where a partial/mixed attempt is a valid learning move (§13.3). */
const OPEN_OPERATIONS: ReadonlySet<OperationId> = new Set([
  "open_production",
  "free_conversation",
]);

/**
 * Map a grade() outcome to the learner-facing verdict. This is the migration
 * mapping: renderers consume its output, never the raw ErrorTagCode.
 *
 * Notes on the non-obvious rows:
 *  - accepted_variant / punctuation_only → accepted_with_note: correct enough,
 *    with room for a supportive "also natural: ..." note.
 *  - missing_word / extra_word: in OPEN operations a gap is a valid partial
 *    attempt (→ neutral_compare, §13.3); in constrained operations it is a
 *    specific near-miss (→ precision_issue).
 *  - wrong_register → accepted_with_note (§34.2: register feedback rather
 *    than wrong).
 *  - blocked_form_used → repair_opportunity: producing a taught trap is a
 *    known error worth practice.
 *  - recognition_only / overproduction of unseen forms → not_yet: the learner
 *    reached for something not required yet — never punished.
 *  - empty_or_skip → neutral_compare: show the model, no red.
 */
export function feedbackVerdictFromGrade(
  result: ErrorTagCode,
  operation?: OperationId,
): FeedbackVerdict {
  switch (result) {
    case "correct":
      return "accepted";
    case "accepted_variant":
    case "punctuation_only":
      return "accepted_with_note";
    case "accent_only":
    case "spelling_near_miss":
    case "wrong_order":
      return "precision_issue";
    case "missing_word":
    case "extra_word":
      return operation !== undefined && OPEN_OPERATIONS.has(operation)
        ? "neutral_compare"
        : "precision_issue";
    case "wrong_item":
    case "meaning_shift":
      return "wrong_target";
    case "wrong_register":
      return "accepted_with_note";
    case "blocked_form_used":
      return "repair_opportunity";
    case "recognition_only_form_used":
    case "overproduction_unseen_form":
      return "not_yet";
    case "incorrect_but_understandable":
    case "empty_or_skip":
      return "neutral_compare";
  }
}

// ── Deterministic diagnosis ────────────────────────────────────────────────

export type DiagnosisInput = {
  /** Raw learner answer (null/empty answers produce no diagnoses). */
  userAnswer: string | null;
  /** The model/expected answer, if the exercise has one. */
  expectedAnswer?: string | null;
  operation?: OperationId;
  /**
   * Surface forms of the lesson's target pieces (registry-free, like grade()).
   * Used by target_missing / exposure_gap_allowed.
   */
  targetForms?: string[];
  /** Exposure/ghost surface forms — never required for correctness. */
  exposureForms?: string[];
  /** Normalized-or-raw previously ACCEPTED answers (sentence_replay). */
  previousAcceptedAnswers?: string[];
};

export type ErrorDiagnosis = {
  id: ErrorTaxonomyId;
  entry: ErrorTaxonomyEntry;
};

/** Word-boundary containment on normalized text. */
function containsForm(normalizedAnswer: string, form: string): boolean {
  const n = normalizeAnswer(form);
  if (n.length === 0) return false;
  const escaped = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|[^\\p{L}'])${escaped}(?:$|[^\\p{L}'])`, "u").test(
    ` ${normalizedAnswer} `,
  );
}

// être-conjugation + faim (English "to be hungry" transfer). normalizeAnswer
// folds accents, so "êtes" arrives as "etes".
const AUXILIARY_FAIM = /\b(suis|es|est|sommes|etes|sont)\s+faim\b/;

// pas + du / de la / de l' / des — only meaningful when the exercise itself
// teaches the negative partitive (expected contains "pas d" ), which guards
// against false positives like "venir de la France".
const PARTITIVE_AFTER_PAS = /\bpas\s+(du|de\s+la|de\s+l'|des)\b/;
const EXPECTED_NEGATIVE_PARTITIVE = /\bpas\s+d['e]/;

// "ne/n' ... pas" frame present in the expected answer.
const NEGATION_FRAME = /(?:\bne\s+\S+|n'\S*)\s+pas\b/;

// Elision chunks a beginner may split in production (normalized, accentless).
const ELISION_SPLITS: ReadonlyArray<{ split: RegExp; whole: string }> = [
  { split: /\bsi\s+il\b/, whole: "s'il" },
  { split: /\bje\s+ai\b/, whole: "j'ai" },
  { split: /\bce\s+est\b/, whole: "c'est" },
  { split: /\bla\s+eau\b/, whole: "l'eau" },
  { split: /\bne\s+est\b/, whole: "n'est" },
];

// Known package nouns with their correct articles (normalized, accentless).
// Narrow v0 table — extend only with taught packages.
const ARTICLE_GENDER_PAIRS: ReadonlyArray<{ wrong: RegExp; correct: string }> = [
  { wrong: /\bun\s+question\b/, correct: "une question" },
  { wrong: /\bune\s+cafe\b/, correct: "un café" },
];

/**
 * Deterministic diagnosis pass (v0 — the only pass that exists). Returns every
 * deterministic taxonomy id whose narrow detector fires, in the taxonomy's
 * severity/precedence order (first entry is the one `resolveFeedback` uses).
 *
 * AI_ASSISTED ids never fire here; see `availableErrorIds` for the ladder.
 */
export function diagnoseDeterministic(input: DiagnosisInput): ErrorDiagnosis[] {
  const raw = input.userAnswer;
  if (raw === null || raw.trim().length === 0) return [];
  const answer = normalizeAnswer(raw);
  if (answer.length === 0) return [];
  const expected =
    input.expectedAnswer === null || input.expectedAnswer === undefined
      ? ""
      : normalizeAnswer(input.expectedAnswer);

  const hits: ErrorTaxonomyId[] = [];

  // 1. ghost_required_by_mistake — config guard: an exposure form listed as a
  // target form is a system bug (exposure must never be required).
  const exposure = (input.exposureForms ?? []).map(normalizeAnswer);
  const targets = (input.targetForms ?? []).map(normalizeAnswer);
  if (exposure.length > 0 && targets.some((t) => exposure.includes(t))) {
    hits.push("ghost_required_by_mistake");
  }

  // 2. sentence_replay — replayed a previously accepted answer for a new target.
  if (
    expected.length > 0 &&
    answer !== expected &&
    (input.previousAcceptedAnswers ?? []).some(
      (p) => normalizeAnswer(p) === answer,
    )
  ) {
    hits.push("sentence_replay");
  }

  // 3. wrong_auxiliary_faim — "je suis faim" family.
  if (AUXILIARY_FAIM.test(answer)) hits.push("wrong_auxiliary_faim");

  // 4. protected_chunk_split — split elision chunk, only when the expected
  // answer actually uses the whole form.
  for (const { split, whole } of ELISION_SPLITS) {
    if (split.test(answer) && (expected.length === 0 || expected.includes(normalizeAnswer(whole)))) {
      hits.push("protected_chunk_split");
      break;
    }
  }

  // 5. partitive_negative — pas + du/de la/de l'/des where the exercise
  // teaches "pas de/d'".
  if (
    PARTITIVE_AFTER_PAS.test(answer) &&
    EXPECTED_NEGATIVE_PARTITIVE.test(expected)
  ) {
    hits.push("partitive_negative");
  }

  // 6. negation_frame_missing — expected teaches ne...pas; answer has pas
  // without ne/n'.
  if (
    NEGATION_FRAME.test(expected) &&
    /\bpas\b/.test(answer) &&
    !/(?:\bne\b|n')/.test(answer)
  ) {
    hits.push("negation_frame_missing");
  }

  // 7. article_gender_mismatch — known package noun with the wrong article.
  if (ARTICLE_GENDER_PAIRS.some(({ wrong }) => wrong.test(answer))) {
    hits.push("article_gender_mismatch");
  }

  // 8/9. target presence: exposure_gap_allowed vs target_missing.
  if (targets.length > 0) {
    const present = targets.filter((t) => containsForm(answer, t));
    if (present.length === 0) {
      hits.push("target_missing");
    } else if (
      present.length === targets.length &&
      expected.length > 0 &&
      answer !== expected &&
      input.operation !== undefined &&
      OPEN_OPERATIONS.has(input.operation)
    ) {
      // All known targets present, answer differs from model in an open
      // operation → allowed partial (English gaps welcome). §13.3.
      hits.push("exposure_gap_allowed");
    }
  }

  return DIAGNOSIS_PRECEDENCE.filter((id) => hits.includes(id)).map((id) => ({
    id,
    entry: ERROR_TAXONOMY[id],
  }));
}

/**
 * Precedence when several diagnoses fire at once: system guard first, then
 * attention, then guided repairs, then small precisions, then allowed
 * partials. `resolveFeedback` uses the FIRST diagnosis in this order.
 */
export const DIAGNOSIS_PRECEDENCE: readonly ErrorTaxonomyId[] = [
  "ghost_required_by_mistake",
  "sentence_replay",
  "wrong_auxiliary_faim",
  "protected_chunk_split",
  "partitive_negative",
  "negation_frame_missing",
  "article_gender_mismatch",
  "exposure_gap_allowed",
  "target_missing",
  "register_mismatch",
  "overliteral_translation",
];

// ── Combined resolution ────────────────────────────────────────────────────

export type FeedbackResolution = {
  verdict: FeedbackVerdict;
  /** All deterministic diagnoses that fired, precedence-ordered. */
  diagnoses: ErrorDiagnosis[];
  /** Learner-facing copy of the leading diagnosis, if any. */
  learnerResponse?: string;
};

export type ResolveFeedbackInput = {
  /** grade() primary result for this answer. */
  gradeResult: ErrorTagCode;
  operation?: OperationId;
  diagnosis: DiagnosisInput;
};

/**
 * One entry point: grade outcome + deterministic diagnoses → the single
 * learner-facing verdict.
 *
 * Rules:
 *  - Accepted-family grades stay accepted (a correct answer is never demoted
 *    by a diagnosis) — except the ghost_required_by_mistake system guard,
 *    which can only ever soften, and sentence_replay, which by construction
 *    cannot fire on a correct answer.
 *  - Otherwise the leading diagnosis (DIAGNOSIS_PRECEDENCE) decides.
 *  - With no diagnosis, the migration mapping decides.
 */
export function resolveFeedback(input: ResolveFeedbackInput): FeedbackResolution {
  const diagnoses = diagnoseDeterministic(input.diagnosis);
  const fromGrade = feedbackVerdictFromGrade(input.gradeResult, input.operation);

  if (fromGrade === "accepted" || fromGrade === "accepted_with_note") {
    return { verdict: fromGrade, diagnoses };
  }

  const lead = diagnoses[0];
  if (lead !== undefined) {
    return {
      verdict: lead.entry.verdict,
      diagnoses,
      learnerResponse: lead.entry.learnerResponse,
    };
  }

  return { verdict: fromGrade, diagnoses };
}
