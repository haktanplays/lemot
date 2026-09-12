/**
 * Two things the learner never found, and one operation the product stopped
 * performing.
 *
 * ── THE AFFORDANCE NOBODY FOUND ─────────────────────────────────────────────
 *
 * The founder reached L9 before discovering that pieces are tappable. The
 * feature had been on every Showcase since L0, doing nothing for eight lessons
 * because nothing ever said it was there. A capable affordance nobody finds is
 * not a feature; it is a cost. Orientation now teaches it by requiring it, and
 * the first Showcase carries one line until any piece is tapped anywhere.
 *
 * ── THE OPERATION THAT DISAPPEARED ──────────────────────────────────────────
 *
 * Measured: of 53 weaves across L0-L10, five gave the learner an English
 * meaning to carry into French, and all five were in L1, L2 and L7. From L3
 * onward every single weave handed over a SCENE. The founder's "I only ever
 * see context Weaves" is the accurate description of that, whatever the
 * authored tier names say.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import type { Lesson, WeaveScreen } from "../../content/lessonTypes";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");
const codeOf = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

const PATH = V1_LESSONS.filter((l) => l.number >= 0 && l.number <= 10) as Lesson[];
const WEAVES = PATH.flatMap((l) =>
  flattenLessonScreens(l).filter((s): s is WeaveScreen => s.type === "weave").map((s) => ({
    lesson: l.number,
    screen: s,
  })),
);
/** A prompt that hands over an English thought rather than a situation. */
const TRANSFER = /write it in french|say it in french/i;

describe("meaning transfer is an operation the product still performs", () => {
  test("it exists after L2, where it had vanished entirely", () => {
    const late = WEAVES.filter(
      (w) => w.lesson >= 3 && TRANSFER.test(w.screen.payload.prompt),
    );
    assert(late.length >= 2, `only ${late.length} meaning-transfer weaves from L3 on`);
    const lessons = new Set(late.map((w) => w.lesson));
    assert(lessons.size >= 2, `they are all in one lesson: L${[...lessons].join(", L")}`);
  });

  test("it is never the only thing a lesson does", () => {
    // §B: do not force every lesson to contain translation. The operation
    // should be visible across the arc, not stamped on every page.
    for (const lesson of PATH) {
      const ws = flattenLessonScreens(lesson).filter(
        (s): s is WeaveScreen => s.type === "weave",
      );
      if (ws.length === 0) continue;
      const transfer = ws.filter((w) => TRANSFER.test(w.payload.prompt)).length;
      assert(
        transfer < ws.length,
        `L${lesson.number} is nothing but meaning transfer`,
      );
    }
  });

  test("a meaning-transfer prompt is tiered as supported, because it gives the meaning", () => {
    for (const { lesson, screen } of WEAVES) {
      if (!TRANSFER.test(screen.payload.prompt)) continue;
      assert(
        screen.payload.weaveType === "supported",
        `L${lesson} ${screen.id} hands over the meaning but claims tier ${screen.payload.weaveType}`,
      );
    }
  });

  test("scene-led production is still the majority, and still works", () => {
    // The fix is variety, not replacement. Most weaves should still put the
    // learner in a situation.
    const scenes = WEAVES.filter(
      (w) => !TRANSFER.test(w.screen.payload.prompt) && (w.screen.payload.context ?? "").length > 0,
    );
    assert(scenes.length > WEAVES.length / 2, `only ${scenes.length} of ${WEAVES.length} are scene-led`);
  });

  test("every weave still has somewhere to stand", () => {
    for (const { lesson, screen } of WEAVES) {
      const payload = screen.payload;
      const hasScene = (payload.context ?? "").trim().length > 0;
      const hasMeaning = TRANSFER.test(payload.prompt);
      assert(
        hasScene || hasMeaning,
        `L${lesson} ${screen.id} gives neither a situation nor a meaning`,
      );
    }
  });
});

describe("a learner meets the tap before lesson nine", () => {
  const orientation = codeOf(read("app/orientation.tsx"));
  const showcase = codeOf(read("components/lesson-v1/screens/Showcase.tsx"));

  test("orientation's pieces are real controls, not pictures of controls", () => {
    assert(orientation.includes("markPieceTapped"), "tapping one records nothing");
    const demo = orientation.slice(orientation.indexOf("function PiecesDemo"));
    assert(demo.includes("<Pressable"), "the chips are inert");
    assert(demo.includes("setTapped"), "nothing happens when one is tapped");
  });

  test("the rest of the demo waits for the tap", () => {
    // Teaching the affordance by describing it would repeat the original
    // mistake in a nicer font.
    const demo = orientation.slice(orientation.indexOf("function PiecesDemo"));
    assert(demo.includes("tapped !== null &&"), "the swap demo does not wait for a tap");
    assert(/Tap one and it will tell you/.test(demo), "nothing invites the tap");
  });

  test("the early hint exists and is one line", () => {
    assert(showcase.includes("Tap a piece to see what it is."), "no invitation anywhere");
    assert(showcase.includes("showTapHint && first"), "it is not limited to the first line");
    assert(showcase.includes("ci === 0"), "nor to the first cluster");
  });

  test("the hint disappears the moment a piece is tapped, and never returns", () => {
    assert(showcase.includes("hasTappedAPiece()"), "the screen does not check whether they know");
    assert(showcase.includes("markPieceTapped()"), "tapping does not record it");
    const note = showcase.slice(showcase.indexOf("const notePieceTapped"), showcase.indexOf("const notePieceTapped") + 250);
    assert(note.includes("setShowTapHint(false)"), "the hint outlives its job");
  });

  test("the flag fails safe, like every other first-use flag", () => {
    // An unreadable store must not turn a one-time hint into furniture.
    const firstUse = read("lib/firstUse.ts");
    const block = firstUse.slice(firstUse.indexOf("export function hasTappedAPiece"));
    assert(/catch\s*\{\s*return true;/.test(block), "a failed read would show the hint forever");
  });

  test("it is a UI fact, not a claim about what the learner knows", () => {
    // The flag says "have they discovered this control". It is not evidence,
    // it is not mastery, and the Showcase still grades and records nothing.
    const code = codeOf(read("components/lesson-v1/screens/Showcase.tsx"));
    for (const banned of ["MasterySnapshot", "recordEvent", "targetItemIds", "useReachedItemIds"]) {
      assert(!code.includes(banned), `the Showcase must not reach for ${banned}`);
    }
  });
});
