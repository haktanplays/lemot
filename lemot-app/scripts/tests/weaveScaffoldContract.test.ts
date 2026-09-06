/**
 * The Weave scaffold contract.
 *
 * A Weave declares a difficulty tier and then asks the learner for something.
 * Those two must agree, and for a long time they did not: twelve screens
 * declared a hard tier and then handed over the exact English sentence, so a
 * learner who thought they were producing from a situation was translating.
 * The tier is load-bearing (`productionQuality` ranks scaffolding by it), so
 * the prompt is what has to tell the truth.
 *
 * The ladder, and the only thing that changes between rungs, is HOW MUCH OF THE
 * ANSWER THE PROMPT GIVES AWAY:
 *
 *   supported  EASY    the exact meaning, in English. "Write it in French: X"
 *   mid        MEDIUM  the communicative intention. "Tell them you are not there."
 *   context    HARD    the situation. The learner decides what to say and how.
 *   open       HARD+   the situation, with no scaffold pieces either.
 *
 * Detection is deliberately narrow. "Does this prompt state the exact target
 * meaning?" is a semantic question in general and a lexical one here, because
 * the corpus states exact meanings through one formula. Guarding the formula
 * catches the whole defect class without pretending to judge meaning.
 */
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import { describe, test, assert } from "./harness";
import type { LessonScreen } from "../../content/lessonTypes";

/** The corpus formula for handing the learner an exact target meaning. */
const GIVES_EXACT_MEANING = /write it in french\s*:/i;

const SCAFFOLDED_TIERS = new Set(["supported"]);

const L1_L10 = V1_LESSONS.filter((l) => l.number >= 1 && l.number <= 10);

type Weave = {
  lessonNumber: number;
  screenId: string;
  tier: string;
  prompt: string;
  /** A piece visible from first render, which IS the support on an easy weave. */
  constitutive: boolean;
};

function everyWeave(): Weave[] {
  const out: Weave[] = [];
  for (const lesson of L1_L10) {
    for (const screen of flattenLessonScreens(lesson) as LessonScreen[]) {
      if (screen.type !== "weave") continue;
      out.push({
        lessonNumber: lesson.number,
        screenId: screen.id,
        tier: screen.payload.weaveType,
        prompt: screen.payload.prompt,
        constitutive: (screen.payload.suggestedPieces ?? []).some(
          (piece) => piece.supportRole === "constitutive",
        ),
      });
    }
  }
  return out;
}

describe("Weave scaffold contract", () => {
  test("there are weaves to check", () => {
    assert(everyWeave().length > 30, "the weave walk is broken");
  });

  test("no hard weave is secretly a translation", () => {
    // The original defect: `context` and `mid` screens whose prompt read
    // "Write it in French: I don't understand." The learner was told the tier
    // was hard and then given the sentence.
    for (const w of everyWeave()) {
      if (SCAFFOLDED_TIERS.has(w.tier)) continue;
      assert(
        !GIVES_EXACT_MEANING.test(w.prompt),
        `L${w.lessonNumber} ${w.screenId} declares "${w.tier}" but hands over the exact meaning: ${JSON.stringify(w.prompt)}`,
      );
    }
  });

  test("every easy weave actually supplies the support it claims", () => {
    // The mirror defect, and just as dishonest: a screen declaring the most
    // scaffolded tier while supplying nothing is a harder weave wearing an easy
    // label, and `productionQuality` ranks it as the easiest thing in the lesson.
    //
    // Support arrives two ways, and an early version of this rule only knew the
    // first. PM-011 asks "Order a tea politely" and is legitimately Supported,
    // because its pieces are constitutive: visible from first render, part of
    // the task. Demanding an English gloss there would have broken a screen
    // whose scaffold was already correct.
    for (const w of everyWeave()) {
      if (!SCAFFOLDED_TIERS.has(w.tier)) continue;
      assert(
        GIVES_EXACT_MEANING.test(w.prompt) || w.constitutive,
        `L${w.lessonNumber} ${w.screenId} declares "supported" but supplies neither the target meaning nor constitutive pieces: ${JSON.stringify(w.prompt)}`,
      );
    }
  });

  test("no weave prompt is empty or malformed", () => {
    for (const w of everyWeave()) {
      assert(w.prompt.trim().length > 0, `L${w.lessonNumber} ${w.screenId} has an empty prompt`);
      assert(
        w.prompt.trim().length > 8,
        `L${w.lessonNumber} ${w.screenId} prompt is too short to be a real request: ${JSON.stringify(w.prompt)}`,
      );
    }
  });

  test("each lesson progresses from more scaffolding to less", () => {
    // Not a fixed count per tier: lessons differ, and some language does not
    // support a full ladder. The claim is only that a lesson does not consist
    // entirely of its most scaffolded rung.
    for (const lesson of L1_L10) {
      const tiers = everyWeave()
        .filter((w) => w.lessonNumber === lesson.number)
        .map((w) => w.tier);
      if (tiers.length < 2) continue;
      assert(
        new Set(tiers).size > 1,
        `L${lesson.number} has ${tiers.length} weaves all at "${tiers[0]}" — no progression`,
      );
      assert(
        tiers.some((t) => t === "context" || t === "open"),
        `L${lesson.number} never asks the learner to produce from a situation`,
      );
    }
  });
});
