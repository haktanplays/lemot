/**
 * Round 1.2 Weave UX copy + the display-only prompt -> target transform.
 *
 * Locks the learner-facing strings the Weave screen now shows (branded badge,
 * "Say this:" target label, mixed-language helper) and the prefix-stripping
 * transform in components/lesson-v1/screens/weaveCopy.ts. Pure tsx: the module
 * is string-only (no React Native / Expo / device deps).
 *
 * Scope guard: this batch is copy/label/salience only. It must NOT introduce
 * red/error/auto-correct wording (mixed/partial attempts stay neutral compare).
 */
import { describe, test, assert, assertEqual } from "./harness";
import {
  WEAVE_BADGE,
  WEAVE_TARGET_LABEL,
  WEAVE_HELPER,
  WEAVE_INPUT_LABEL,
  weaveTargetMeaning,
  shouldShowWeaveTargetLabel,
} from "../../components/lesson-v1/screens/weaveCopy";

describe("weave copy (Round 1.2 UX)", () => {
  test("badge restores the branded mechanic name", () => {
    assertEqual(WEAVE_BADGE, "Weave", "badge should read 'Weave'");
  });

  test("target label is 'Say this:'", () => {
    assertEqual(WEAVE_TARGET_LABEL, "Say this:", "target label");
  });

  test("helper keeps the mixed-language + compare framing", () => {
    assertEqual(
      WEAVE_HELPER,
      "Use the French pieces you know. Leave the rest in English for now. Then compare with the model.",
      "helper copy",
    );
  });

  test("helper carries no red/error or auto-grade wording", () => {
    const lower = WEAVE_HELPER.toLowerCase();
    assert(!lower.includes("wrong"), "helper must not say 'wrong'");
    assert(!lower.includes("error"), "helper must not say 'error'");
    assert(!lower.includes("correct"), "helper must not imply auto-grading");
  });

  test("input label is the non-final 'Your try'", () => {
    assertEqual(WEAVE_INPUT_LABEL, "Your try", "input label");
    // Guard against the graded-sounding "answer" wording.
    assert(
      !WEAVE_INPUT_LABEL.toLowerCase().includes("answer"),
      "input label must avoid graded 'answer' wording",
    );
  });
});

describe("weaveTargetMeaning transform (display only)", () => {
  test("strips the 'Write it in French:' instruction prefix", () => {
    assertEqual(
      weaveTargetMeaning("Write it in French: I am here."),
      "I am here.",
      "prefix stripped",
    );
  });

  test("keeps the Tester 1 look-alike negation pair distinct", () => {
    // The pair that caused the carry-over signal must each surface clearly.
    assertEqual(
      weaveTargetMeaning("Write it in French: I am not here."),
      "I am not here.",
      "neg target 1",
    );
    assertEqual(
      weaveTargetMeaning("Write it in French: It is not here."),
      "It is not here.",
      "neg target 2",
    );
  });

  test("is case-insensitive and trims whitespace after the prefix", () => {
    assertEqual(
      weaveTargetMeaning("write it in FRENCH:   No, I am not here."),
      "No, I am not here.",
      "case-insensitive + trimmed",
    );
  });

  test("passes scenario / open prompts through unchanged", () => {
    const open = "Close the moment in French: thank them and say goodbye.";
    assertEqual(weaveTargetMeaning(open), open, "scenario prompt unchanged");
  });

  test("only strips a leading prefix, never a mid-string occurrence", () => {
    const p = "Tell them, then write it in French: later.";
    assertEqual(weaveTargetMeaning(p), p, "non-leading occurrence preserved");
  });
});

describe("shouldShowWeaveTargetLabel (open-weave label suppression)", () => {
  test("supported / mid / context weaves keep the 'Say this:' label", () => {
    for (const t of ["supported", "mid", "context"] as const) {
      assert(shouldShowWeaveTargetLabel(t), `${t} should show the target label`);
    }
  });

  test("open weave suppresses the label (avoids double instruction)", () => {
    assert(
      !shouldShowWeaveTargetLabel("open"),
      "open weave must not show 'Say this:'",
    );
  });
});
