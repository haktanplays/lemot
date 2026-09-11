/**
 * A lesson must remember where the learner was.
 *
 * Founder device behaviour: leaving a lesson briefly and coming back restarted
 * it from page one, and pressing back around page 10 threw the learner out of
 * the lesson instead of moving to page 9. The position lived only in component
 * state, and the back affordance only ever left the lesson.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  backTarget,
  backwardEntryStep,
  parseCursor,
  resumeIndexFor,
  resumeStepFor,
  serializeCursor,
  LESSON_CURSOR_KEY,
} from "../../content/lessons/lessonCursor";

describe("lesson cursor survives the round trip", () => {
  test("a written cursor reads back identically", () => {
    const c = { lessonId: "v1-lesson-007", screenIndex: 9 };
    assertEqual(parseCursor(serializeCursor(c))?.screenIndex, 9, "index must survive");
    assertEqual(parseCursor(serializeCursor(c))?.lessonId, "v1-lesson-007", "lesson must survive");
  });

  test("unreadable records degrade to the old behaviour instead of throwing", () => {
    // Anything here must be survivable: a lesson is a bad place to crash.
    for (const bad of [null, undefined, "", "{", "null", "[]", '{"lessonId":""}', '{"lessonId":"x"}',
      '{"lessonId":"x","screenIndex":-1}', '{"lessonId":"x","screenIndex":1.5}', '{"screenIndex":2}']) {
      assertEqual(parseCursor(bad as never), null, `"${String(bad)}" should parse to null`);
    }
  });
});

describe("resume opens the right page", () => {
  const N = 12;
  test("resumes this lesson at its stored page", () => {
    assertEqual(resumeIndexFor("v1-lesson-007", N, { lessonId: "v1-lesson-007", screenIndex: 9 }), 9,
      "a stored page for this lesson must be reopened");
  });

  test("a cursor for another lesson never leaks into this one", () => {
    assertEqual(resumeIndexFor("v1-lesson-008", N, { lessonId: "v1-lesson-007", screenIndex: 9 }), 0,
      "another lesson's cursor must not open this one mid-way");
  });

  test("a finished or out-of-range cursor starts the lesson over", () => {
    // Landing on a completion screen you cannot move forward from is worse than
    // starting again.
    assertEqual(resumeIndexFor("v1-lesson-007", N, { lessonId: "v1-lesson-007", screenIndex: 12 }), 0,
      "a cursor at the end means finished, so start again");
    assertEqual(resumeIndexFor("v1-lesson-007", N, { lessonId: "v1-lesson-007", screenIndex: 99 }), 0,
      "an out-of-range cursor must not open a page that does not exist");
  });

  test("no cursor is simply page one", () => {
    assertEqual(resumeIndexFor("v1-lesson-007", N, null), 0, "no cursor means page one");
  });
});

describe("a chain resumes at the step the learner was on", () => {
  test("the step survives the round trip", () => {
    const c = { lessonId: "v1-lesson-007", screenIndex: 4, chainScreenId: "s31", stepIndex: 1 };
    const back = parseCursor(serializeCursor(c));
    assertEqual(back?.chainScreenId, "s31", "the chain id must survive");
    assertEqual(back?.stepIndex, 1, "the step must survive");
  });

  test("a cursor with no step is still valid", () => {
    const back = parseCursor(serializeCursor({ lessonId: "v1-lesson-007", screenIndex: 4 }));
    assertEqual(back?.screenIndex, 4, "a page-only cursor must still parse");
    assertEqual(back?.stepIndex, undefined, "no step means no step");
  });

  test("resumes the step for this chain", () => {
    assertEqual(
      resumeStepFor("s31", 2, { lessonId: "l", screenIndex: 4, chainScreenId: "s31", stepIndex: 1 }),
      1,
      "step 2 of 2 must reopen at step 2",
    );
  });

  test("a step recorded for another chain never leaks", () => {
    assertEqual(
      resumeStepFor("s32", 2, { lessonId: "l", screenIndex: 4, chainScreenId: "s31", stepIndex: 1 }),
      0,
      "another chain's step must not apply here",
    );
  });

  test("a step past the end starts the chain over", () => {
    // Content can change under a stored cursor.
    assertEqual(
      resumeStepFor("s31", 2, { lessonId: "l", screenIndex: 4, chainScreenId: "s31", stepIndex: 9 }),
      0,
      "a step that no longer exists must not be opened",
    );
  });

  test("no answer is ever persisted, only the position", () => {
    // Restoring an attempt would hand the next mount a stale answer, which is
    // exactly what the chain key exists to prevent.
    const raw = serializeCursor({
      lessonId: "l", screenIndex: 4, chainScreenId: "s31", stepIndex: 1,
    });
    for (const forbidden of ["answer", "text", "selected", "input", "attempt"]) {
      assert(!raw.includes(forbidden), `the cursor must not carry "${forbidden}"`);
    }
  });

  test("the player threads the step through the chain", () => {
    const src = readFileSync(join(process.cwd(), "components/lesson-v1/LessonRendererV1.tsx"), "utf8");
    assert(src.includes("resumeStepFor("), "the player must resume the chain step");
    // Re-pointed, not dropped: the prop became CONTROLLED. `initialStep` only
    // seeded the chain's own state once, which is exactly why Back could compute
    // the right step and the chain would ignore it.
    assert(src.includes("stepIndex={chainStep}"), "the chain must render the player's step");
    assert(src.includes("onStepChange={onChainStep}"), "the chain must report step changes");
    assert(
      !src.includes("initialStep={"),
      "the chain step must not go back to being seeded once",
    );
  });

  test("the chain no longer owns where it is", () => {
    const src = readFileSync(join(process.cwd(), "components/lesson-v1/screens/ActivityChain.tsx"), "utf8");
    // A CALL, not the word: the file explains in prose why the old useState was
    // the bug, and a test that cannot tell code from commentary is not a test.
    assert(
      !/\buseState\s*[(<]/.test(src),
      "a chain holding its own step index is the bug: two owners, and the player loses",
    );
  });
});

describe("back moves one authored page", () => {
  test("page 10 goes back to page 9, not to the lesson start", () => {
    const t = backTarget(9); // 0-based: page 10
    assert(t.kind === "page", "back inside a lesson must stay in the lesson");
    assertEqual(t.kind === "page" ? t.index : -1, 8, "one page back, not to zero");
  });

  test("back steps one page at a time all the way down", () => {
    for (let i = 11; i > 0; i -= 1) {
      const t = backTarget(i);
      assertEqual(t.kind === "page" ? t.index : -1, i - 1, `page ${i + 1} should go back to ${i}`);
    }
  });

  test("back on the first page leaves the lesson", () => {
    assertEqual(backTarget(0).kind, "exit", "there is no page before the first");
  });
});

describe("back inside a chain moves one STEP, not one page", () => {
  test("step 3 goes back to step 2, not to the start of the exercise", () => {
    // The reported regression, stated as the founder saw it. A chain is several
    // actions wearing one page number, so back measured in pages walked out of
    // the exercise and lost every step at once.
    const t = backTarget(5, 2); // page 6, chain step 3 (0-based: 2)
    assert(t.kind === "step", "back inside a chain must stay inside the chain");
    assertEqual(t.kind === "step" ? t.stepIndex : -1, 1, "one step back");
  });

  test("back steps down the chain one at a time", () => {
    for (let step = 3; step > 0; step -= 1) {
      const t = backTarget(5, step);
      assertEqual(
        t.kind === "step" ? t.stepIndex : -1,
        step - 1,
        `step ${step + 1} should go back to ${step}`,
      );
    }
  });

  test("back from the chain's first step leaves the page", () => {
    const t = backTarget(5, 0);
    assert(t.kind === "page", "step 1 is the page, so back is a page move");
    assertEqual(t.kind === "page" ? t.index : -1, 4, "one page back");
  });

  test("an ordinary page is unaffected by the new rung", () => {
    // Every pre-existing one-argument call site must behave exactly as before.
    for (let i = 11; i > 0; i -= 1) {
      assertEqual(backTarget(i, 0).kind === "page" ? (backTarget(i, 0) as { index: number }).index : -1, i - 1, `page ${i}`);
    }
    assertEqual(backTarget(0, 0).kind, "exit", "first page still exits");
  });

  test("entering a chain backwards opens its LAST step, not its first", () => {
    // The other half of the same symptom: stepping back onto a previous chain
    // used to reset the step to 0, so the learner landed on step 1 of an
    // exercise they had already finished.
    assertEqual(backwardEntryStep(4), 3, "a four-step chain opens at step 4");
    assertEqual(backwardEntryStep(2), 1, "a two-step chain opens at step 2");
  });

  test("a page that is not a chain opens at step zero", () => {
    assertEqual(backwardEntryStep(null), 0, "ordinary pages have no steps");
    assertEqual(backwardEntryStep(1), 0, "a one-step chain has nowhere to land but the start");
    assertEqual(backwardEntryStep(0), 0, "an empty chain cannot open past its end");
  });

  test("the player asks for the step rung only when it is on a chain", () => {
    const src = readFileSync(join(process.cwd(), "components/lesson-v1/LessonRendererV1.tsx"), "utf8");
    assert(
      src.includes('screen?.type === "activity-chain" ? chainStep : 0'),
      "an ordinary page must pass step 0 so its back behaviour is unchanged",
    );
    assert(src.includes("backwardEntryStep("), "stepping back onto a chain must land on its last step");
    assert(
      !src.includes("setChainStep(0);\n          setScreenIndex(target.index)"),
      "the unconditional step reset is what opened previous chains at step 1",
    );
  });
});

describe("the player is actually wired to all of this", () => {
  const src = readFileSync(join(process.cwd(), "components/lesson-v1/LessonRendererV1.tsx"), "utf8");

  test("the header's back affordance pages back rather than exiting", () => {
    assert(src.includes("onBack={goBack}"), "the header must be given the paging handler");
    // Scoped to the header: the completion screen's "Back to Home" is a
    // deliberate exit and must keep working.
    const header = src.slice(src.indexOf("function LessonHeader"), src.indexOf("function CompletionView"));
    assert(header.length > 0, "LessonHeader must exist");
    assert(
      !header.includes("exitToPrevious"),
      "the back chevron must page back, not exit the lesson unconditionally",
    );
    assert(header.includes("onPress={onBack}"), "the chevron must call the paging handler");
  });

  test("the position is read on mount and written on change", () => {
    assert(src.includes("resumeIndexFor("), "the player must resume from the stored cursor");
    assert(src.includes("serializeCursor("), "the player must persist the cursor");
    assert(src.includes(LESSON_CURSOR_KEY.split(".")[0]), "the storage key must be used");
  });

  test("finishing clears the cursor rather than leaving a stale one", () => {
    assert(src.includes("removeItem(LESSON_CURSOR_KEY)"), "completion must clear the position");
  });
});
