/**
 * A lesson the learner is inside is offered back to them.
 *
 * ── ROOT CAUSE, MEASURED ────────────────────────────────────────────────────
 *
 * The founder left the app mid-lesson, came back, and landed on Home — then
 * found that re-entering the lesson resumed it correctly. Both halves of that
 * are true and they point at one gap: `LESSON_CURSOR_KEY` is written on every
 * move and cleared exactly on completion, and the lesson route reads it. NO
 * SURFACE OUTSIDE THE LESSON EVER READ IT. The position was never lost, only
 * unmentioned.
 *
 * ── WHY THIS IS AN OFFER AND NOT A REDIRECT ─────────────────────────────────
 *
 * A cold start carries no evidence that the learner still wants to be where
 * they were. Auto-opening a lesson they walked away from three days ago is a
 * worse failure than the silence it replaces, and it is the one the brief
 * names. So Journey shows a dominant "Continue · part N of M" and the learner
 * decides.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import {
  LESSON_CURSOR_KEY,
  resumePointFor,
  serializeCursor,
} from "../../content/lessons/lessonCursor";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");
const codeOf = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

const L8 = V1_LESSONS.find((l) => l.number === 8)!;

describe("the resume point is derived, never guessed", () => {
  test("a mid-lesson cursor becomes a learner-facing part number", () => {
    const point = resumePointFor(
      serializeCursor({ lessonId: L8.id, screenIndex: 3 }),
      V1_LESSONS,
    );
    assert(point !== null, "a real cursor produced no resume point");
    assert(point!.lessonId === L8.id, "it points at the wrong lesson");
    assert(point!.part === 4, `it says part ${point!.part}, not 4`);
    assert(point!.partCount === L8.screens.length, "the total is wrong");
  });

  test("it is 1-based, because a learner does not count from zero", () => {
    const point = resumePointFor(
      serializeCursor({ lessonId: L8.id, screenIndex: 1 }),
      V1_LESSONS,
    );
    assert(point!.part === 2, `it says part ${point!.part}`);
  });

  test("nothing to continue produces nothing to offer", () => {
    for (const raw of [null, undefined, "", "not json", "{}"]) {
      assert(resumePointFor(raw, V1_LESSONS) === null, `"${raw}" produced an offer`);
    }
  });

  test("the first page is not a resume point", () => {
    // Offering to continue a lesson the learner has not moved inside would be
    // the "next step" anchor wearing a different word.
    const point = resumePointFor(
      serializeCursor({ lessonId: L8.id, screenIndex: 0 }),
      V1_LESSONS,
    );
    assert(point === null, "page one was offered as a continuation");
  });

  test("a cursor past the end is refused, not clamped", () => {
    // The cursor is removed on completion. If that removal ever fails, the
    // stale value must not offer to continue INTO a completion screen.
    for (const index of [L8.screens.length, L8.screens.length + 5]) {
      assert(
        resumePointFor(serializeCursor({ lessonId: L8.id, screenIndex: index }), V1_LESSONS) === null,
        `index ${index} was offered`,
      );
    }
  });

  test("a cursor for a lesson that no longer exists is refused", () => {
    assert(
      resumePointFor(serializeCursor({ lessonId: "v1-lesson-999", screenIndex: 2 }), V1_LESSONS) === null,
      "a deleted lesson was offered",
    );
  });

  test("it is pure: it cannot reach storage itself", () => {
    const code = codeOf(read("content/lessons/lessonCursor.ts"));
    for (const banned of ["kvStorage", "AsyncStorage", "localStorage", "Date.now"]) {
      assert(!code.includes(banned), `the cursor module must not use ${banned}`);
    }
  });
});

describe("Journey offers it, and does not force it", () => {
  const home = codeOf(read("app/(tabs)/index.tsx"));

  test("the anchor exists and reads the persisted cursor", () => {
    assert(home.includes("resumePointFor"), "Journey does not derive a resume point");
    assert(home.includes("LESSON_CURSOR_KEY"), "and does not read the cursor");
    assert(home.includes("Where you left off"), "there is no learner-facing anchor");
  });

  test("it names the part, so the offer is specific", () => {
    assert(/part \$\{resumePoint\.part\} of \$\{resumePoint\.partCount\}/.test(home), "the offer is vague");
  });

  test("it never navigates on its own", () => {
    // The one rule that keeps a cold start safe. Journey may PUSH when the
    // learner taps; it may not redirect because a cursor exists.
    // Bounded FORWARD from the anchor. "Your next step" also appears earlier in
    // the file on the legacy path, so an unanchored indexOf ran the slice
    // backwards and silently measured nothing.
    const from = home.indexOf("resumePoint !== null");
    assert(from !== -1, "the anchor is missing entirely");
    const to = home.indexOf("Your next step", from);
    const block = home.slice(from, to === -1 ? from + 1200 : to);
    assert(block.includes("onPress"), "the anchor is not a control at all");
    for (const banned of ["router.replace", "useEffect", "Redirect"]) {
      assert(!block.includes(banned), `the anchor must not ${banned}`);
    }
  });

  test("it is read once, not on every render", () => {
    // A re-read on each render fights the learner's own paging the moment they
    // walk back into the lesson from here.
    assert(
      /useState\(\(\) =>\s*resumePointFor/.test(home),
      "the resume point must be read once, lazily",
    );
  });

  test("the cursor is still cleared exactly on completion", () => {
    const renderer = codeOf(read("components/lesson-v1/LessonRendererV1.tsx"));
    assert(
      renderer.includes("kvStorage.removeItem(LESSON_CURSOR_KEY)"),
      "a finished lesson would keep offering to continue",
    );
    assert(
      (renderer.match(/removeItem\(LESSON_CURSOR_KEY\)/g) ?? []).length === 1,
      "the cursor is cleared in more than one place",
    );
  });

  test("the storage key did not move", () => {
    assert(LESSON_CURSOR_KEY === "lm.lessonCursor.v1", "an existing learner would lose their place");
  });
});
