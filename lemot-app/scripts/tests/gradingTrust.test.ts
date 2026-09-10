/**
 * A non-empty response is not evidence of correctness.
 *
 * Founder device evidence: typing "Aaa" into a Weave whose task was "Turn the
 * offer down, then say where you're heading" produced the model answer and the
 * note "Your meaning lands." The cause was one branch — the reveal treated
 * every non-matching answer as `ifUnderstandableButWrong`, a note that asserts
 * the meaning came through, on the strength of the field being non-empty.
 *
 * These tests are written against that exact task so the repro cannot silently
 * come back.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { componentEvidence } from "../../content/lesson-v1-evidence/answerComponents";
import { evaluateTypedAnswer } from "../../content/lesson-v1-evidence/typedEvaluation";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const TASK = ["Non merci. Je vais à la maison."];
const ev = (text: string) => componentEvidence(text, TASK, false);

describe("grading cannot praise what it cannot verify", () => {
  test('"Aaa" is a mismatch and evidences nothing', () => {
    const r = ev("Aaa");
    assertEqual(r.verdict, "mismatch", '"Aaa" must not be credited');
    assert(!r.meaningEvidenced, '"Aaa" must never evidence meaning');
  });

  test('"Merci, à bientôt" is French-looking and still the wrong intent', () => {
    // Real French, correct spelling, wrong job: it neither refuses nor names a
    // destination. Looking like French is not evidence of doing the task.
    const r = ev("Merci, à bientôt");
    assertEqual(r.verdict, "mismatch", "wrong intent must not be credited");
    assert(!r.meaningEvidenced, "wrong intent must not evidence meaning");
  });

  test('"Non merci." is partial: the refusal landed, the destination did not', () => {
    const r = ev("Non merci.");
    assertEqual(r.verdict, "partial", "a real component must be recognised");
    assert(r.matched.includes("non merci"), "the refusal should be credited");
    assert(
      r.matched.length < r.expected.length,
      "a partial answer must not be credited with every component",
    );
    assert(!r.meaningEvidenced, "half an answer does not evidence the whole meaning");
  });

  test("the full answer passes", () => {
    const full = evaluateTypedAnswer({ userAnswer: "Non merci. Je vais à la maison.", expectedAnswers: TASK });
    assertEqual(full.match, "exact", "the authored answer must match");
    assertEqual(full.evidence.verdict, "full", "an exact match is full credit");
    assert(full.evidence.meaningEvidenced, "an exact match evidences meaning");
  });

  test("empty input is not an attempt", () => {
    assertEqual(ev("").verdict, "empty", "empty must be its own verdict");
    assertEqual(ev("   ").verdict, "empty", "whitespace is still empty");
  });

  test("accents and casing stay learner-friendly", () => {
    const r = ev("non merci. je vais a la maison");
    assertEqual(r.verdict, "partial", "a missing accent must not destroy credit");
    assertEqual(r.matched.length, r.expected.length, "every component should still be found");
  });

  test("a task with no checkable components asserts nothing rather than guessing", () => {
    const r = componentEvidence("something", ["Zzz qqq wxy."], false);
    assertEqual(r.verdict, "unknown", "unverifiable tasks must not be graded either way");
    assert(!r.meaningEvidenced, "unknown must never evidence meaning");
  });
});

describe("the reveal only claims understanding when it has been checked", () => {
  const reveal = readFileSync(join(process.cwd(), "components/lesson-v1/screens/NaturalReveal.tsx"), "utf8");
  const weave = readFileSync(join(process.cwd(), "components/lesson-v1/screens/Weave.tsx"), "utf8");

  test("mismatch renders no notice at all", () => {
    // The regression, pinned structurally: the mismatch branch must not reach
    // for ifUnderstandableButWrong.
    const branch = reveal.slice(reveal.indexOf('case "mismatch":'), reveal.indexOf('case "general":'));
    assert(branch.length > 0, "the mismatch branch must exist");
    assert(
      !branch.includes("ifUnderstandableButWrong"),
      "mismatch must not print a note that asserts the meaning landed",
    );
  });

  test("partial is the only branch allowed to claim understanding", () => {
    const branch = reveal.slice(reveal.indexOf('case "partial":'), reveal.indexOf('case "mismatch":'));
    assert(
      branch.includes("ifUnderstandableButWrong"),
      "partial should carry the authored understandable-but-wrong note",
    );
  });

  test("Weave keys its verdict copy on evidence, not on match alone", () => {
    assert(weave.includes("VERDICT_NOTES"), "verdict copy must be keyed by verdict");
    const notes = weave.slice(weave.indexOf("const VERDICT_NOTES"), weave.indexOf("const ACCEPTED_NOTE"));
    for (const banned of ["Correct.", "Accepted."]) {
      const mismatchLine = notes.slice(notes.indexOf("mismatch:"), notes.indexOf("unknown:"));
      assert(!mismatchLine.includes(banned), `mismatch must not read "${banned}"`);
    }
  });
});
