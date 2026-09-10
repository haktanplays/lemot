/**
 * L0 -> L1 truthful progression guard (Product Polish, first implementation PR).
 *
 * Locks the four learner-facing corrections this PR makes, so a later content
 * pass cannot quietly reintroduce them:
 *
 *   1. L1 no longer re-teaches L0's first contact through duplicate Meet cards.
 *   2. `un thé` is introduced before PM-011 asks for it, as ONE package, in a
 *      Supported frame that never claims ownership.
 *   3. The Weave support boundary is labelled by availability, not ownership.
 *   4. Lesson Zero's primary control is gated on what the step actually needs,
 *      and no chip is inert.
 *
 * It also CHARACTERIZES the existing PM-011 typed evaluation (accents) rather
 * than changing it: the assertions below record today's behaviour so any future
 * change to `normalize` is a deliberate, visible decision.
 *
 * Pure tsx: lesson data + the pure matcher, plus node:fs source reads for the
 * two TSX surfaces (the same pattern componentCopyGuard.test.ts already uses).
 * No React Native / Expo / device layer is loaded.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { isFirstTasteLesson, isV1LessonInStageScope } from "../../config/productStage";
import { lesson000 } from "../../content/lessons/v1/lesson-000";
import { lesson001 } from "../../content/lessons/v1/lesson-001";
import type {
  LessonScreen,
  MeetCardScreen,
  RecapScreen,
  WeaveScreen,
} from "../../content/lessonTypes";
import { matchExpected } from "../../components/lesson-v1/screens/normalizeAnswer";
import { reviewProductionQuality } from "../../content/lessons/productionQuality";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";

const APP_ROOT = process.cwd();
const readSource = (rel: string) => readFileSync(join(APP_ROOT, rel), "utf8");

/**
 * PAGES vs ACTIONS. A chain is one page holding several actions, so the two
 * questions this file asks need different lists: "what does the learner do, and
 * in what order?" is about actions, and "how is the lesson paced?" is about
 * pages. Conflating them would let chaining silently change an answer.
 */
const pages = lesson001.screens;
const screens = flattenLessonScreens(lesson001);
const ids = screens.map((s) => s.id);
const types = pages.map((s) => s.type);
const actionTypes = screens.map((s) => s.type);

const byId = <T extends LessonScreen>(id: string): T => {
  const found = screens.find((s) => s.id === id);
  assert(found, `lesson-001 is missing screen ${id}`);
  return found as T;
};


describe("L1 sequence — Content Bible rhythm after the truthful re-cut", () => {
  // Band widened by the L1-L3 content pass: the second-opener arc (meet,
  // choose, produce unsupported, reflect) adds four screens to L1. Widened
  // again by the corpus-closure pass, by exactly two: the second survival
  // formula needs a meet and one real use, which is the minimum the Payload
  // Economy surface ceiling allows for a supported item. The band still exists
  // so an unbounded lesson fails.
  // Counted in ACTIONS, not pages. The band exists so an unbounded lesson
  // fails, and what would make a lesson unbounded is how much it asks -- which
  // is exactly what chaining does not change. Measuring pages here would have
  // made grouping four actions onto one page look like deleting three of them.
  test("action count stays inside the authored 11-19 band", () => {
    assert(
      screens.length >= 11 && screens.length <= 19,
      `expected 11-19 learner actions, got ${screens.length}`,
    );
  });

  test("the lesson is still paced across pages, not collapsed into a few", () => {
    // The other half of the band, now that actions and pages are counted
    // separately: chaining may group actions, but it may not turn the lesson
    // into three dense screens.
    assert(pages.length >= 8, `expected at least 8 pages, got ${pages.length}`);
  });

  test("Goal is first and Recap is last", () => {
    assertEqual(types[0], "showcase", "first screen is the language world");
    assertEqual(types[1], "insight-card", "the goal card follows it");
    assertEqual(
      (pages[1] as { payload: { insightType?: string } }).payload.insightType,
      "lesson-goal",
      "first screen is specifically the lesson-goal insight",
    );
    assertEqual(types[types.length - 1], "recap", "last screen is the recap");
  });

  test("no three consecutive screens share one archetype", () => {
    // On actions: a chain is a container the learner never feels, so three
    // chains holding three different sequences are varied, and three meet-cards
    // are not -- whether or not a chain happens to hold them.
    for (let i = 2; i < actionTypes.length; i++) {
      assert(
        !(actionTypes[i] === actionTypes[i - 1] && actionTypes[i] === actionTypes[i - 2]),
        `three consecutive ${actionTypes[i]} screens at index ${i - 2}`,
      );
    }
  });

  // The "3-5 production actions" band is RETIRED: it was the retired global
  // production floor in disguise, and it is not replaced by another number.
  // Structure is now guarded by PQ-2 (scripts/tests/productionQuality.test.ts),
  // which asks whether the lesson ever demands unsupplied generation rather
  // than how many screens it spends doing so.
  test("the lesson demands genuine unsupplied generation (PQ-2)", () => {
    assertEqual(
      reviewProductionQuality([lesson001]).filter((d) => d.code === "PQ-2"),
      [],
      "retrieval floor satisfied",
    );
  });

  test("registered pilot screen ids are unchanged and still precede Say It", () => {
    const pm009 = ids.indexOf("s10-weave-merci-thanks");
    const pm011 = ids.indexOf("s11-weave-the-order");
    const sayIt = ids.indexOf("s08-sayit-cafe-order");
    assert(pm009 >= 0, "PM-009 screen id preserved");
    assert(pm011 >= 0, "PM-011 screen id preserved");
    assert(pm009 < pm011, "PM-009 still comes before PM-011");
    assert(pm011 < sayIt, "both registered payloads still sit before Say It");
  });
});

describe("L1 no longer replays L0's first contact", () => {
  test("the duplicate Meet cards are gone", () => {
    assert(
      !ids.includes("s00-meet-bonjour"),
      "L1 must not re-meet bonjour: L0 owns that first contact",
    );
    assert(
      !ids.includes("s02-meet-je-voudrais-cafe"),
      "L1 must not re-meet je voudrais + un café: L0 owns that first contact",
    );
  });

  test("no L1 Meet card re-introduces an item L0 already met", () => {
    const l0MeetItems = new Set(
      lesson000.screens
        .filter((s) => s.type === "meet-card")
        .flatMap((s) => (s as MeetCardScreen).targetItemIds ?? []),
    );
    // L0's rendered first-run flow owns bonjour, je voudrais and un café.
    for (const item of ["chunk-bonjour", "chunk-je-voudrais", "noun-cafe"]) {
      assert(l0MeetItems.has(item), `precondition: L0 meets ${item}`);
    }
    for (const screen of screens) {
      if (screen.type !== "meet-card") continue;
      for (const item of (screen as MeetCardScreen).targetItemIds ?? []) {
        assert(
          !["chunk-bonjour", "chunk-je-voudrais", "noun-cafe"].includes(item),
          `${screen.id} re-introduces ${item}, which L0 already met`,
        );
      }
    }
  });

  test("no L1 Meet title is a near-duplicate of an L0 Meet title", () => {
    const normalizeTitle = (t: string) =>
      t.toLowerCase().replace(/[^a-z ]/g, "").replace(/\b(a|the|your)\b/g, "").replace(/\s+/g, " ").trim();
    const l0Titles = lesson000.screens
      .filter((s) => s.type === "meet-card")
      .map((s) => normalizeTitle((s as MeetCardScreen).payload.title ?? ""));
    for (const screen of screens) {
      if (screen.type !== "meet-card") continue;
      const title = normalizeTitle((screen as MeetCardScreen).payload.title ?? "");
      assert(
        !l0Titles.includes(title),
        `${screen.id} title "${(screen as MeetCardScreen).payload.title}" restates an L0 Meet title`,
      );
    }
  });
});

describe("un thé is introduced truthfully before PM-011", () => {
  const meetThe = byId<MeetCardScreen>("s12-meet-un-the");
  const pm011 = byId<WeaveScreen>("s11-weave-the-order");

  test("the tea package is met before the Supported weave asks for it", () => {
    assert(
      ids.indexOf("s12-meet-un-the") < ids.indexOf("s11-weave-the-order"),
      "un thé must be introduced before PM-011",
    );
  });

  test("un thé stays ONE package on the introduction screen", () => {
    const highlights = meetThe.payload.highlights ?? [];
    assertEqual(highlights.length, 1, "exactly one highlighted package");
    assertEqual(highlights[0].text, "un thé", "the whole package, never split");
    assertEqual(highlights[0].itemId, "chunk-un-the", "primary tea identity");
    for (const h of highlights) {
      assert(h.text !== "thé" && h.text !== "un", "never split into un + thé");
    }
  });

  test("un thé stays ONE constitutive package on PM-011", () => {
    const constitutive = (pm011.payload.suggestedPieces ?? []).filter(
      (p) => p.supportRole === "constitutive",
    );
    assertEqual(constitutive.length, 1, "exactly one constitutive piece");
    assertEqual(constitutive[0].text, "un thé", "the whole package");
    assertEqual(constitutive[0].itemId, "chunk-un-the", "primary tea identity");
  });

  test("the introduction screen requests no production", () => {
    assertEqual(meetThe.type, "meet-card", "exposure archetype, not a weave");
  });

  test("PM-011 stays Supported, so no independent tea claim is possible", () => {
    assertEqual(pm011.payload.weaveType, "supported", "Supported weave");
    assertEqual(
      JSON.stringify(pm011.evidenceTargetItemIds),
      JSON.stringify(["chunk-un-the"]),
      "evidence target unchanged",
    );
  });

  test("no L1 screen names the linked sub-identity noun-the", () => {
    for (const screen of screens) {
      const targets = [
        ...((screen as { targetItemIds?: string[] }).targetItemIds ?? []),
        ...((screen as { evidenceTargetItemIds?: string[] }).evidenceTargetItemIds ?? []),
      ];
      assert(
        !targets.includes("noun-the"),
        `${screen.id} must not name noun-the: it is linked-only and receives no event`,
      );
    }
  });
});

describe("PM-009 reads as a reaction, with identity untouched", () => {
  const pm009 = byId<WeaveScreen>("s10-weave-merci-thanks");

  test("it now carries a situational context like its neighbours", () => {
    const context = pm009.payload.context ?? "";
    assert(context.trim().length > 0, "PM-009 has a scene line");
    assert(
      !/lesson|L\d|write it in french|type /i.test(context),
      "the scene never uses internal numbering or instructional language",
    );
  });

  test("prompt, answers and evidence are unchanged", () => {
    assertEqual(pm009.payload.prompt, "The coffee arrives. Thank them.", "prompt intent");
    assertEqual(
      JSON.stringify(pm009.payload.expectedAnswers),
      JSON.stringify(["Merci."]),
      "preferred answer",
    );
    assertEqual(
      JSON.stringify(pm009.payload.acceptedAlternatives),
      JSON.stringify(["Merci", "Merci !"]),
      "accepted alternatives",
    );
    assertEqual(
      JSON.stringify(pm009.targetItemIds),
      JSON.stringify(["chunk-merci"]),
      "evidence target",
    );
  });

  test("it stays unscaffolded: no pieces and no cloze", () => {
    assert(
      (pm009.payload.suggestedPieces ?? []).length === 0,
      "no support pieces, so the attempt stays independent",
    );
    assertEqual(pm009.payload.hintCloze, undefined, "no cloze rung");
  });
});

describe("Weave support boundary is labelled by availability, not ownership", () => {
  const source = readSource("components/lesson-v1/screens/Weave.tsx");

  test("the ownership claim is gone from every Weave surface", () => {
    assert(
      !source.includes("Pieces you already own"),
      "no Weave surface may claim the learner already owns an offered piece",
    );
  });

  test("the canonical truthful label is used on both surfaces", () => {
    const occurrences = source.split("Pieces you can use here:").length - 1;
    assertEqual(occurrences, 2, "constitutive support AND the hint rung");
  });
});

describe("Lesson Zero interaction truthfulness", () => {
  // These three guarantees were originally written against the bespoke
  // first-use screen: the primary control must not look available when it
  // cannot proceed, the requirement must be visible before a failed tap, and a
  // chip that looks tappable must be tappable.
  //
  // First use now plays L0 through the ordinary lesson engine, so all three are
  // inherited rather than re-implemented -- which is the point of the change,
  // and is why the assertions moved from the screen's internals to the fact
  // that the screen HAS no internals of its own any more.
  const source = readSource("app/lesson-zero.tsx");
  const weave = readSource("components/lesson-v1/screens/Weave.tsx");

  test("first use renders the real lesson engine, not a second one", () => {
    assert(source.includes("LessonRendererV1"), "the engine renders the first taste");
    assert(
      source.includes("getV1LessonByNumber(0)"),
      "and it renders L0, the authored first taste, rather than inline content",
    );
    for (const bespoke of ["TextInput", "acceptsRebuild", "acceptsCoffeeRemainder", "setStep"]) {
      assert(
        !source.includes(bespoke),
        `first use must not carry its own ${bespoke}: that is how a second system starts`,
      );
    }
  });

  test("the primary control is gated on what the step actually needs", () => {
    assert(weave.includes("disabled={!canCheck}"), "Check is disabled until there is an attempt");
    assert(
      weave.includes("const canCheck = text.trim().length > 0"),
      "and the gate is real input, not a tap count",
    );
  });

  test("support is available before a failed attempt, not only after one", () => {
    assert(
      weave.includes('label="Need a hint?"') && weave.includes("hintLevel === 0"),
      "the hint entry is offered from first render",
    );
    assert(
      !weave.includes("setNudge"),
      "no post-tap-only explanation path remains",
    );
  });

  test("no chip is inert: a piece that looks tappable is tappable", () => {
    const showcase = readSource("components/lesson-v1/screens/Showcase.tsx");
    const chips = showcase.slice(
      showcase.indexOf("{pieces.length >= 2 &&"),
      showcase.indexOf("openPiece !== null"),
    );
    assert(chips.includes("<Pressable"), "the Showcase chips respond");
    assert(
      chips.includes('accessibilityRole="button"'),
      "and they say so to assistive technology",
    );
  });

  test("L0 is playable but is not a step on the path", () => {
    assert(!isV1LessonInStageScope(0), "L0 never appears in the Journey or the picker");
    assert(isFirstTasteLesson(0), "but the lesson route admits it");
    assert(!isFirstTasteLesson(1), "and nothing else is the first taste");
  });
});

describe("PM-011 typed evaluation — accent characterization (behaviour recorded, not changed)", () => {
  const pm011 = byId<WeaveScreen>("s11-weave-the-order");
  const expected = pm011.payload.expectedAnswers;
  const alternatives = pm011.payload.acceptedAlternatives;

  test("the exact accented target matches", () => {
    assertEqual(
      matchExpected("Je voudrais un thé, s'il vous plaît.", expected, alternatives),
      "exact",
      "the accented path must stay green",
    );
  });

  test("a smart apostrophe still matches", () => {
    assertEqual(
      matchExpected("Je voudrais un thé, s’il vous plaît.", expected, alternatives),
      "exact",
      "smart quotes fold to a straight apostrophe",
    );
  });

  test("unaccented `the` is ALREADY accepted as exact (diacritics are folded)", () => {
    assertEqual(
      matchExpected("Je voudrais un the, s'il vous plait.", expected, alternatives),
      "exact",
      "normalize() strips diacritics, so a missing accent is never a miss",
    );
  });

  test("a mixed-language attempt does NOT match, and that is why it records no supported production", () => {
    assertEqual(
      matchExpected("Je voudrais un the, please", expected, alternatives),
      "none",
      "the English remainder, not the accent, is what fails the match",
    );
    assertEqual(
      matchExpected("Bonjour, je voudrais un the, please", expected, alternatives),
      "none",
      "an extra greeting plus an English word is still no match",
    );
  });
});

describe("L1 recap separates what was recycled from what was extended", () => {
  const recap = byId<RecapScreen>("s09-recap-survival-kit");
  const lines = recap.payload.lines;
  const joined = lines.join(" ");

  test("it does not repeat an L0 recap line verbatim", () => {
    const l0Recap = flattenLessonScreens(lesson000).find((s) => s.type === "recap") as RecapScreen;
    for (const line of lines) {
      assert(
        !l0Recap.payload.lines.includes(line),
        `recap line "${line}" is copied verbatim from L0`,
      );
    }
  });

  test("it names the newly extended ground honestly", () => {
    assert(joined.includes("merci"), "merci is named");
    assert(joined.includes("un thé"), "the tea variation is named");
  });

  test("it never claims the tea piece is owned", () => {
    assert(
      !/\b(you own|yours|mastered|learned un thé)\b/i.test(joined),
      "the tea line must stay a supported-use statement",
    );
  });

  test("it carries no engine terminology or formula notation", () => {
    assert(!joined.includes(" + "), "no formula notation in learner copy");
    assert(
      !/\b(engine|wrapper|sandwich|sibling|cargo|payload|event|evidence)\b/i.test(joined),
      "no engine terminology in learner copy",
    );
  });
});
