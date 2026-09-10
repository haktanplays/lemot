/**
 * The first hint must not be the answer, and the ask must survive the keyboard.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const WEAVE = readFileSync(join(process.cwd(), "components/lesson-v1/screens/Weave.tsx"), "utf8");
const FRAME = readFileSync(join(process.cwd(), "components/ui/LessonScreenFrame.tsx"), "utf8");

describe("the hint ladder has rungs worth climbing", () => {
  test("the first rung shows part of the set, not all of it", () => {
    // Handing over both pieces of a two-piece answer made the first tap the
    // last one.
    assert(WEAVE.includes("firstRungCount"), "rung 1 must show a bounded subset");
    assert(
      /Math\.max\(1, Math\.floor\(hintPieces\.length \/ 2\)\)/.test(WEAVE),
      "rung 1 should be about half, and never fewer than one",
    );
    assert(
      WEAVE.includes("hintLevel >= 2 ? hintPieces"),
      "the full set belongs to a later rung",
    );
  });

  test("there is a way to ask for the rest", () => {
    assert(WEAVE.includes('label="Show the rest"'), "a partial hint needs a next rung");
  });

  test("the recorded rung stays inside the existing evidence schema", () => {
    // Widening 0|1|2 would change what every past attempt means.
    assert(WEAVE.includes("hintRung: hintLevel as 0 | 1 | 2"), "the rung schema must not widen");
  });
});

describe("the task stays visible while the learner types", () => {
  test("the frame accepts an anchor and shows it only with the keyboard up", () => {
    assert(FRAME.includes("taskAnchor"), "the frame must accept a task anchor");
    assert(
      /taskAnchor != null && keyboardOverlap > 0/.test(FRAME),
      "the anchor must appear only while the keyboard is actually open",
    );
  });

  test("Weave supplies the ask, not the whole header", () => {
    assert(WEAVE.includes("taskAnchor={"), "Weave must supply an anchor");
    const anchor = WEAVE.slice(WEAVE.indexOf("taskAnchor={"), WEAVE.indexOf("footer={"));
    assert(anchor.includes("targetMeaning"), "the anchor must carry what to say");
    assert(
      !anchor.includes("WEAVE_HELPER"),
      "the long helper paragraph may scroll away; it must not be pinned",
    );
    assert(anchor.includes("!isRevealed"), "the anchor is for the input phase only");
  });
});
