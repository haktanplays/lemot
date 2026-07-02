/**
 * Error Engine v0 tests (Cairn spec §13; roadmap Faz 3).
 *
 * Covers:
 *  - taxonomy completeness and the deterministic / ai_assisted partition
 *  - the fallback ladder (availableErrorIds)
 *  - the migration mapping ErrorTagCode → FeedbackVerdict (every grade code)
 *  - every deterministic detector, positive and negative cases
 *  - resolveFeedback precedence (accepted never demoted; leading diagnosis
 *    decides; migration mapping as fallback)
 *  - learner-facing copy tone (no red/failure language)
 */
import { describe, test, assert } from "./harness";
import {
  ERROR_TAXONOMY,
  DETERMINISTIC_ERROR_IDS,
  AI_ASSISTED_ERROR_IDS,
  DIAGNOSIS_PRECEDENCE,
  availableErrorIds,
  feedbackVerdictFromGrade,
  diagnoseDeterministic,
  resolveFeedback,
} from "../../content/learning-engine/error-engine";
import type {
  ErrorTaxonomyId,
  FeedbackVerdict,
  DiagnosisInput,
} from "../../content/learning-engine/error-engine";
import type { ErrorTagCode } from "../../content/learning-engine/events";

const ALL_GRADE_CODES: ErrorTagCode[] = [
  "correct",
  "accepted_variant",
  "punctuation_only",
  "accent_only",
  "spelling_near_miss",
  "wrong_item",
  "wrong_order",
  "missing_word",
  "extra_word",
  "wrong_register",
  "meaning_shift",
  "blocked_form_used",
  "recognition_only_form_used",
  "overproduction_unseen_form",
  "incorrect_but_understandable",
  "empty_or_skip",
];

const ALL_VERDICTS: FeedbackVerdict[] = [
  "accepted",
  "accepted_with_note",
  "neutral_compare",
  "precision_issue",
  "wrong_target",
  "repair_opportunity",
  "not_yet",
];

function ids(input: DiagnosisInput): ErrorTaxonomyId[] {
  return diagnoseDeterministic(input).map((d) => d.id);
}

describe("error engine › taxonomy", () => {
  test("has exactly the 11 spec §13.2 entries, keys matching ids", () => {
    const keys = Object.keys(ERROR_TAXONOMY);
    assert(keys.length === 11, `expected 11 entries, got ${keys.length}`);
    for (const key of keys) {
      assert(
        ERROR_TAXONOMY[key as ErrorTaxonomyId].id === key,
        `entry key ${key} does not match its id`,
      );
    }
  });

  test("modes partition into deterministic and ai_assisted", () => {
    assert(
      DETERMINISTIC_ERROR_IDS.length + AI_ASSISTED_ERROR_IDS.length === 11,
      "modes must partition the taxonomy",
    );
    assert(
      AI_ASSISTED_ERROR_IDS.includes("overliteral_translation") &&
        AI_ASSISTED_ERROR_IDS.includes("register_mismatch"),
      "overliteral_translation and register_mismatch are ai_assisted in v0",
    );
  });

  test("every entry's verdict is a known FeedbackVerdict", () => {
    for (const entry of Object.values(ERROR_TAXONOMY)) {
      assert(
        ALL_VERDICTS.includes(entry.verdict),
        `${entry.id}: unknown verdict ${entry.verdict}`,
      );
    }
  });

  test("precedence list covers every taxonomy id exactly once", () => {
    assert(DIAGNOSIS_PRECEDENCE.length === 11, "precedence must list all 11 ids");
    assert(
      new Set(DIAGNOSIS_PRECEDENCE).size === 11,
      "precedence must not repeat ids",
    );
  });

  test("fallback ladder: deterministic subset without AI, full set with AI", () => {
    const withoutAi = availableErrorIds(false);
    assert(
      withoutAi.length === DETERMINISTIC_ERROR_IDS.length &&
        withoutAi.every((id) => ERROR_TAXONOMY[id].mode === "deterministic"),
      "without AI only deterministic ids are diagnosable",
    );
    assert(
      availableErrorIds(true).length === 11,
      "with AI the full taxonomy is diagnosable",
    );
  });

  test("learner-facing copy stays calm (no red/failure language)", () => {
    const banned = /\b(wrong|fail|failed|incorrect|error|bad)\b/i;
    for (const entry of Object.values(ERROR_TAXONOMY)) {
      assert(
        !banned.test(entry.learnerResponse),
        `${entry.id}: learnerResponse contains banned tone: ${entry.learnerResponse}`,
      );
    }
  });
});

describe("error engine › migration mapping (grade → verdict)", () => {
  test("every ErrorTagCode maps to a FeedbackVerdict", () => {
    for (const code of ALL_GRADE_CODES) {
      const v = feedbackVerdictFromGrade(code);
      assert(ALL_VERDICTS.includes(v), `${code} mapped to unknown verdict ${v}`);
    }
  });

  const expectations: Array<[ErrorTagCode, FeedbackVerdict]> = [
    ["correct", "accepted"],
    ["accepted_variant", "accepted_with_note"],
    ["punctuation_only", "accepted_with_note"],
    ["accent_only", "precision_issue"],
    ["spelling_near_miss", "precision_issue"],
    ["wrong_order", "precision_issue"],
    ["wrong_item", "wrong_target"],
    ["meaning_shift", "wrong_target"],
    ["wrong_register", "accepted_with_note"],
    ["blocked_form_used", "repair_opportunity"],
    ["recognition_only_form_used", "not_yet"],
    ["overproduction_unseen_form", "not_yet"],
    ["incorrect_but_understandable", "neutral_compare"],
    ["empty_or_skip", "neutral_compare"],
  ];
  for (const [code, verdict] of expectations) {
    test(`${code} → ${verdict}`, () => {
      assert(
        feedbackVerdictFromGrade(code) === verdict,
        `${code} should map to ${verdict}, got ${feedbackVerdictFromGrade(code)}`,
      );
    });
  }

  test("missing/extra word: neutral compare in open operations, precision in constrained", () => {
    assert(
      feedbackVerdictFromGrade("missing_word", "open_production") ===
        "neutral_compare",
      "open_production missing_word must be neutral_compare",
    );
    assert(
      feedbackVerdictFromGrade("extra_word", "free_conversation") ===
        "neutral_compare",
      "free_conversation extra_word must be neutral_compare",
    );
    assert(
      feedbackVerdictFromGrade("missing_word", "fill") === "precision_issue",
      "fill missing_word must be precision_issue",
    );
    assert(
      feedbackVerdictFromGrade("extra_word", "build") === "precision_issue",
      "build extra_word must be precision_issue",
    );
  });
});

describe("error engine › deterministic detectors", () => {
  test("wrong_auxiliary_faim: je suis faim fires; j'ai faim does not", () => {
    assert(
      ids({ userAnswer: "Je suis faim.", expectedAnswer: "J'ai faim." }).includes(
        "wrong_auxiliary_faim",
      ),
      "je suis faim must fire",
    );
    assert(
      !ids({ userAnswer: "J'ai faim.", expectedAnswer: "J'ai faim." }).includes(
        "wrong_auxiliary_faim",
      ),
      "j'ai faim must not fire",
    );
  });

  test("partitive_negative: pas de l'eau fires only when the exercise teaches pas d'", () => {
    assert(
      ids({
        userAnswer: "Je ne voudrais pas de l'eau.",
        expectedAnswer: "Je ne voudrais pas d'eau.",
      }).includes("partitive_negative"),
      "pas de l'eau must fire against a pas d'eau target",
    );
    assert(
      !ids({
        userAnswer: "Il vient pas de la gare.",
        expectedAnswer: "Il vient de la gare.",
      }).includes("partitive_negative"),
      "must not fire when the exercise does not teach the pas de/d' shape",
    );
  });

  test("sentence_replay: replaying a previous accepted answer for a new target", () => {
    assert(
      ids({
        userAnswer: "Je ne suis pas ici.",
        expectedAnswer: "Je ne suis pas ici pour parler.",
        previousAcceptedAnswers: ["Je ne suis pas ici."],
      }).includes("sentence_replay"),
      "replayed answer must fire",
    );
    assert(
      !ids({
        userAnswer: "Je ne suis pas ici pour parler.",
        expectedAnswer: "Je ne suis pas ici pour parler.",
        previousAcceptedAnswers: ["Je ne suis pas ici."],
      }).includes("sentence_replay"),
      "an answer matching the current target must not fire",
    );
  });

  test("target_missing: none of the target pieces attempted", () => {
    assert(
      ids({
        userAnswer: "Bonjour merci.",
        expectedAnswer: "Je voudrais un café.",
        targetForms: ["je voudrais"],
      }).includes("target_missing"),
      "answer without the target must fire",
    );
    assert(
      !ids({
        userAnswer: "Je voudrais un thé.",
        expectedAnswer: "Je voudrais un café.",
        targetForms: ["je voudrais"],
      }).includes("target_missing"),
      "answer containing the target must not fire",
    );
  });

  test("exposure_gap_allowed: known pieces + English gap in an open operation (§13.3)", () => {
    const weave: DiagnosisInput = {
      userAnswer: "je ne suis pas ici to talk",
      expectedAnswer: "Je ne suis pas ici pour parler.",
      operation: "open_production",
      targetForms: ["je ne suis pas", "ici"],
    };
    assert(
      ids(weave).includes("exposure_gap_allowed"),
      "mixed attempt with all targets present must be an allowed gap",
    );
    assert(
      !ids({ ...weave, operation: "fill" }).includes("exposure_gap_allowed"),
      "constrained operations do not grant the exposure gap",
    );
  });

  test("article_gender_mismatch: un question fires; une question does not", () => {
    assert(
      ids({
        userAnswer: "J'ai un question.",
        expectedAnswer: "J'ai une question.",
      }).includes("article_gender_mismatch"),
      "un question must fire",
    );
    assert(
      !ids({
        userAnswer: "J'ai une question.",
        expectedAnswer: "J'ai une question.",
      }).includes("article_gender_mismatch"),
      "une question must not fire",
    );
  });

  test("negation_frame_missing: je suis pas against a taught ne...pas frame", () => {
    assert(
      ids({
        userAnswer: "Je suis pas ici.",
        expectedAnswer: "Je ne suis pas ici.",
      }).includes("negation_frame_missing"),
      "pas without ne must fire when the frame is taught",
    );
    assert(
      !ids({
        userAnswer: "Je ne suis pas ici.",
        expectedAnswer: "Je ne suis pas ici.",
      }).includes("negation_frame_missing"),
      "complete frame must not fire",
    );
  });

  test("protected_chunk_split: si il / je ai splits fire against the whole chunk", () => {
    assert(
      ids({
        userAnswer: "Un café, si il vous plaît.",
        expectedAnswer: "Un café, s'il vous plaît.",
      }).includes("protected_chunk_split"),
      "si il must fire",
    );
    assert(
      ids({
        userAnswer: "Je ai faim.",
        expectedAnswer: "J'ai faim.",
      }).includes("protected_chunk_split"),
      "je ai must fire",
    );
    assert(
      !ids({
        userAnswer: "S'il vous plaît.",
        expectedAnswer: "S'il vous plaît.",
      }).includes("protected_chunk_split"),
      "the whole chunk must not fire",
    );
  });

  test("ghost_required_by_mistake: exposure form configured as a target", () => {
    assert(
      ids({
        userAnswer: "je ne suis pas ici",
        expectedAnswer: "Je ne suis pas ici pour parler.",
        targetForms: ["pour parler"],
        exposureForms: ["pour parler"],
      }).includes("ghost_required_by_mistake"),
      "an exposure form listed as a target is a system bug and must fire",
    );
  });

  test("ai_assisted ids never fire in the deterministic pass", () => {
    const sample: DiagnosisInput[] = [
      { userAnswer: "Je suis faim.", expectedAnswer: "J'ai faim." },
      {
        userAnswer: "tu peux m'aider",
        expectedAnswer: "Vous pouvez m'aider ?",
      },
      { userAnswer: "je suis froid word by word", expectedAnswer: "J'ai froid." },
    ];
    for (const input of sample) {
      for (const id of ids(input)) {
        assert(
          ERROR_TAXONOMY[id].mode === "deterministic",
          `ai_assisted id ${id} fired in the deterministic pass`,
        );
      }
    }
  });

  test("empty answers produce no diagnoses", () => {
    assert(ids({ userAnswer: null }).length === 0, "null answer");
    assert(ids({ userAnswer: "   " }).length === 0, "whitespace answer");
  });
});

describe("error engine › resolveFeedback", () => {
  test("accepted grades are never demoted by diagnoses", () => {
    const r = resolveFeedback({
      gradeResult: "correct",
      operation: "fill",
      diagnosis: {
        userAnswer: "J'ai une question.",
        expectedAnswer: "J'ai une question.",
      },
    });
    assert(r.verdict === "accepted", `expected accepted, got ${r.verdict}`);
  });

  test("leading diagnosis decides the verdict and carries learner copy", () => {
    const r = resolveFeedback({
      gradeResult: "incorrect_but_understandable",
      operation: "fill",
      diagnosis: { userAnswer: "Je suis faim.", expectedAnswer: "J'ai faim." },
    });
    assert(
      r.verdict === "repair_opportunity",
      `expected repair_opportunity, got ${r.verdict}`,
    );
    assert(
      r.learnerResponse === ERROR_TAXONOMY.wrong_auxiliary_faim.learnerResponse,
      "learnerResponse must come from the leading diagnosis",
    );
  });

  test("precedence: wrong_auxiliary_faim leads over article_gender_mismatch", () => {
    const r = resolveFeedback({
      gradeResult: "incorrect_but_understandable",
      operation: "fill",
      diagnosis: {
        userAnswer: "Je suis faim et j'ai un question.",
        expectedAnswer: "J'ai faim et j'ai une question.",
      },
    });
    assert(
      r.diagnoses.length >= 2,
      `expected both diagnoses to fire, got ${r.diagnoses.map((d) => d.id).join(", ")}`,
    );
    assert(
      r.diagnoses[0].id === "wrong_auxiliary_faim",
      `expected wrong_auxiliary_faim to lead, got ${r.diagnoses[0].id}`,
    );
    assert(r.verdict === "repair_opportunity", "leading diagnosis sets the verdict");
  });

  test("weave mixed attempt routes to neutral compare (§13.3)", () => {
    const r = resolveFeedback({
      gradeResult: "missing_word",
      operation: "open_production",
      diagnosis: {
        userAnswer: "je ne suis pas ici to talk",
        expectedAnswer: "Je ne suis pas ici pour parler.",
        operation: "open_production",
        targetForms: ["je ne suis pas", "ici"],
      },
    });
    assert(
      r.verdict === "neutral_compare",
      `expected neutral_compare, got ${r.verdict}`,
    );
  });

  test("no diagnosis falls back to the migration mapping", () => {
    const r = resolveFeedback({
      gradeResult: "spelling_near_miss",
      operation: "fill",
      diagnosis: { userAnswer: "bonjoure", expectedAnswer: "bonjour" },
    });
    assert(
      r.verdict === "precision_issue",
      `expected precision_issue, got ${r.verdict}`,
    );
    assert(r.diagnoses.length === 0, "no diagnosis expected for a typo");
  });

  test("empty answer resolves to neutral compare", () => {
    const r = resolveFeedback({
      gradeResult: "empty_or_skip",
      operation: "fill",
      diagnosis: { userAnswer: null, expectedAnswer: "Bonjour." },
    });
    assert(r.verdict === "neutral_compare", `got ${r.verdict}`);
  });
});
