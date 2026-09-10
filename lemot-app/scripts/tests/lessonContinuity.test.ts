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
  parseCursor,
  resumeIndexFor,
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
