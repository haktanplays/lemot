/**
 * The first hint must not be the answer, and the ask must survive the keyboard.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const WEAVE = readFileSync(join(process.cwd(), "components/lesson-v1/screens/Weave.tsx"), "utf8");
const FRAME = readFileSync(join(process.cwd(), "components/ui/LessonScreenFrame.tsx"), "utf8");

describe("the hint ladder has rungs worth climbing", () => {
  test("the smallest help available does not contain French", () => {
    // The first tap used to hand over pieces. For a two-piece answer that is
    // most of the answer, so the smallest help was already large and a learner
    // who wanted a nudge had to take a shove. Rung 1 is a shape cue: how many
    // pieces, and that they are already the learner's.
    assert(
      WEAVE.includes("comes apart into"),
      "rung 1 must describe the shape rather than show the words",
    );
    assert(
      WEAVE.includes("hintLevel === 1 &&"),
      "rung 1 must be its own rung, not folded into the pieces rung",
    );
  });

  test("the pieces rung shows part of the set, not all of it", () => {
    assert(WEAVE.includes("firstRungCount"), "the pieces rung must show a bounded subset");
    assert(
      /Math\.max\(1, Math\.floor\(hintPieces\.length \/ 2\)\)/.test(WEAVE),
      "it should be about half, and never fewer than one",
    );
    assert(
      WEAVE.includes("hintLevel >= 3 ? hintPieces"),
      "the full set belongs to the last rung",
    );
  });

  test("there is a way to ask for the rest", () => {
    assert(WEAVE.includes('label="Show me a piece"'), "the shape cue needs a next rung");
    assert(WEAVE.includes('label="Show the rest"'), "a partial hint needs a next rung");
  });

  test("the recorded rung stays inside the existing evidence schema", () => {
    // Widening 0|1|2 would change what every past attempt means, and the
    // envelope rejects anything else ("there is no copy-ready rung"). A third
    // UI rung therefore MAPS onto the schema rather than extending it: none,
    // partial, or everything this screen had to give.
    assert(
      WEAVE.includes("const reportedRung: 0 | 1 | 2 ="),
      "the rung schema must not widen",
    );
    assert(
      WEAVE.includes("hintLevel >= topRung ? 2 : 1"),
      "full support must report 2 whatever the screen's top rung happens to be",
    );
    assert(
      WEAVE.includes("hintRung: reportedRung"),
      "the reported rung must be the mapped one, not the raw UI level",
    );
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

describe("rung 2 does not promise a starting point it deliberately withholds", () => {
  // Found on device, 2026-09-10: rung 2 said "A piece to start with:" and then
  // showed s'il vous plaît -- the sentence's tail. The order is reversed ON
  // PURPOSE so the hint is never copy-ready, so the label was promising the one
  // thing the design refuses to give.
  test("the hint order stays deliberately not the answer's order", () => {
    assert(
      WEAVE.includes("return [...input].reverse();"),
      "hint pieces must not be shown in copy-ready sequence",
    );
  });

  test("the label counts the pieces instead of claiming a first one", () => {
    assert(
      !WEAVE.includes("A piece to start with"),
      "no label may imply the first chip is where the sentence starts",
    );
    assert(
      WEAVE.includes("of the pieces you need:"),
      "the partial rung says how many were shown, not which came first",
    );
  });
});
