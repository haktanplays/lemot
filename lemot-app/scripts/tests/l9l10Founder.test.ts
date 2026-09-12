/**
 * L9 and L10 after the founder's device pass.
 *
 * ── L9: A THESIS THAT WAS ONLY EVER READ ────────────────────────────────────
 *
 * L9's whole expansion is that an engine the learner already owns starts
 * carrying a different kind of thing: Je voudrais un café asks for an object,
 * Je voudrais faire une pause asks for an action. That was stated in a
 * paragraph and nowhere else. The screen next to it asked which WORD carries
 * the action and offered faire / vais / suis, which tests conjugation the
 * lesson does not teach, and every production after it was the same sentence
 * with something added. Four weaves, one idea.
 *
 * ── L10: A CAPSTONE THAT ENDED IN A TEXTBOX ─────────────────────────────────
 *
 * The last screen's model was five sentences concatenated, asked for at once,
 * after the lesson had already had the learner produce each beat in its own
 * scene. The founder read it as cheesy, and the reason is in the model: it
 * showed them a day they had not written. The day itself was already there,
 * beat by beat; only the wall at the end had to go.
 */
import { describe, test, assert } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { knownPieces } from "../../content/lessons/showcasePieces";
import type { Lesson, WeaveScreen } from "../../content/lessonTypes";

const L9 = V1_LESSONS.find((l) => l.number === 9)! as Lesson;
const L10 = V1_LESSONS.find((l) => l.number === 10)! as Lesson;
const s9 = flattenLessonScreens(L9);
const s10 = flattenLessonScreens(L10);
const find = (list: typeof s9, id: string) => list.find((s) => s.id === id);

/** itemId -> first lesson that teaches it. */
const FIRST = new Map<string, number>();
for (const lesson of [...V1_LESSONS].sort((a, b) => a.number - b.number)) {
  for (const item of lesson.learningItems ?? []) {
    if (!FIRST.has(item.id)) FIRST.set(item.id, lesson.number);
  }
}

describe("L9 makes the learner do the substitution", () => {
  test("the goal names the expansion, not the materials", () => {
    const body = (find(s9, "s00-goal-pause")!.payload as { body: string }).body;
    assert(!/Main pieces/i.test(body), "it is still a shopping list");
    assert(/Je voudrais un café/.test(body), "the thing it already owns is not shown");
    assert(/Je voudrais faire une pause/.test(body), "and neither is the new job");
  });

  test("the learner swaps the cargo rather than picking a verb form", () => {
    const fill = find(s9, "s03-fill-faire-blank")!;
    const payload = fill.payload as {
      prompt: string;
      options: { text: string; isCorrect: boolean }[];
    };
    // The old options were faire / vais / suis: three conjugated forms, which
    // is a question about a paradigm L9 does not teach.
    const texts = payload.options.map((o) => o.text);
    assert(!texts.includes("vais") && !texts.includes("suis"), "it still tests conjugation");
    assert(
      payload.options.find((o) => o.isCorrect)!.text === "faire une pause",
      "the answer is not the whole package",
    );
    assert(/Je voudrais un café/.test(payload.prompt), "the sentence they own is not the starting point");
  });

  test("the card draws engine and cargo as pieces", () => {
    const card = find(s9, "s02-insight-voudrais-carries-actions")!;
    const examples = (card.payload as { examples?: { pieces?: string[] }[] }).examples ?? [];
    assert(examples.length >= 2, "the contrast is gone");
    for (const ex of examples) {
      assert((ex.pieces ?? []).includes("Je voudrais"), "the engine is not drawn as a piece");
    }
  });

  test("faire une pause is never split", () => {
    // §B. It stays whole until the curriculum has somewhere for bare faire to
    // go, and nothing in L0-L10 does.
    const pieces = knownPieces("Je voudrais faire une pause.").map((p) => p.text);
    assert(pieces.includes("faire une pause"), `it was split: ${pieces.join(" | ")}`);
    assert(!pieces.includes("faire"), "bare faire became a piece");
    const whole = JSON.stringify(s9);
    assert(!/"faire"/.test(whole), "an L9 screen offers bare faire as an option");
  });

  test("the first production carries a meaning rather than a scene", () => {
    // The operation L3-L10 had none of: here is a thought, put it in French.
    const weave = find(s9, "s04-weave-ask-for-a-break") as WeaveScreen;
    assert(weave.payload.weaveType === "supported", `tier is ${weave.payload.weaveType}`);
    assert(/Write it in French/i.test(weave.payload.prompt), "it still hands over a situation only");
  });

  test("the softener is chosen because one sentence asks and the other announces", () => {
    const fill = find(s9, "s08-fill-softener")!;
    const reveal = (fill.payload as { reveal: { explanation?: string } }).reveal;
    assert(/Je fais une pause/.test(reveal.explanation ?? ""), "the announce form is never contrasted");
    assert(/asks rather than announces/i.test(reveal.explanation ?? ""), "and the distinction is not named");
  });

  test("every L9 production uses only French reached by L9", () => {
    for (const screen of s9) {
      if (screen.type !== "weave" && screen.type !== "say-it-your-way") continue;
      const payload = screen.payload as Record<string, unknown>;
      const model = String(
        (payload.expectedAnswers as string[] | undefined)?.[0] ?? payload.modelAnswer ?? "",
      );
      for (const piece of knownPieces(model)) {
        const taught = FIRST.get(piece.itemId);
        assert(
          taught !== undefined && taught <= 9,
          `${screen.id} asks for ${piece.text}, first taught ${taught === undefined ? "never" : `L${taught}`}`,
        );
      }
    }
  });

  test("besoin is not demanded, because nothing registers it", () => {
    // MEASURED, and the reason the want/need contrast is want-vs-announce
    // instead. "J'ai besoin de cinq minutes." lives on L9's showcase as
    // exposure and has no canonical identity anywhere in the curriculum, so it
    // can be read and never asked for.
    assert(
      !Object.values(ITEM_REGISTRY as Record<string, { text: string }>).some((i) =>
        /besoin/i.test(i.text),
      ),
      "besoin became an item — the contrast can now be active and this guard is stale",
    );
    for (const screen of s9) {
      if (screen.type === "showcase") continue;
      assert(!/besoin/i.test(JSON.stringify(screen.payload)), `${screen.id} demands besoin`);
    }
  });
});

describe("L10 is a day walked, not a day recited", () => {
  test("the whole-day textbox is gone", () => {
    assert(s10.every((s) => s.id !== "s13-sayit-the-whole-day"), "it came back");
  });

  test("no single answer holds three or more beats of the day", () => {
    for (const screen of s10) {
      const payload = screen.payload as Record<string, unknown>;
      for (const answer of [
        ...((payload.expectedAnswers as string[] | undefined) ?? []),
        String(payload.modelAnswer ?? ""),
      ]) {
        const beats = ["Bonjour", "où", "faire une pause", "Je vais"].filter((b) =>
          answer.includes(b),
        );
        assert(beats.length < 3, `${screen.id} concatenates ${beats.length} beats`);
      }
    }
  });

  test("the four beats each keep their own scene", () => {
    for (const id of [
      "s02-weave-arrive-ask-where",
      "s04-weave-midday-break",
      "s12-weave-say-so-and-ask-again",
      "s05-weave-close-the-day",
    ]) {
      const screen = find(s10, id);
      assert(screen !== undefined, `the beat ${id} is gone`);
      assert(
        String((screen!.payload as { context?: string }).context ?? "").trim().length > 0,
        `${id} lost its scene`,
      );
    }
  });

  test("the assembled reflection comes after the work, not instead of it", () => {
    const close = find(s10, "s05-weave-close-the-day")!;
    const explanation = String(
      (close.payload as { reveal: { explanation?: string } }).reveal.explanation ?? "",
    );
    assert(explanation.length > 0, "the day is never gathered up at all");
    assert(/asked where to go/i.test(explanation), "it does not name what they did");
    // And it is on the LAST beat, so everything it names has happened.
    const order = s10.map((s) => s.id);
    assert(
      order.indexOf("s05-weave-close-the-day") > order.indexOf("s04-weave-midday-break"),
      "the reflection is not on the final beat",
    );
  });

  test("no claim that nothing is new", () => {
    // m'aider arrives here as recognition-only preview, so "nothing new" and
    // "everything was yours already" were both false.
    const copy = JSON.stringify(s10);
    for (const claim of [
      "Today: nothing new",
      "Everything here is yours already",
      "Nothing was new",
      "Everything was yours already",
    ]) {
      assert(!copy.includes(claim), `L10 still claims: "${claim}"`);
    }
  });

  test("the recap does not congratulate the learner", () => {
    const recap = find(s10, "s08-recap-full-day")!;
    const payload = recap.payload as { title?: string; lines: string[] };
    const all = [payload.title ?? "", ...payload.lines].join(" ");
    for (const theatre of ["You lived a day in French", "Ten lessons", "every piece of this came"]) {
      assert(!all.includes(theatre), `the recap still performs: "${theatre}"`);
    }
    assert(/You arrived, asked where/.test(all), "and it no longer says what happened");
  });

  test("m'aider is previewed, explained, and never demanded", () => {
    const preview = find(s10, "s06-meet-preview-help")!;
    const payload = preview.payload as { note?: string; fr: string };
    assert(payload.fr === "Vous pouvez m'aider ?", "the preview sentence moved");
    assert(payload.note !== undefined, "it is still a wall with a label on it");
    assert(/aider means to help/i.test(payload.note!), "the verb is not named");
    assert(/m'aider/.test(payload.note!), "the elided form is not shown");
    assert(/do not need to use it yet/i.test(payload.note!), "the learner is not told they are off the hook");
    // Never produced anywhere.
    for (const screen of s10) {
      if (screen.id === preview.id || screen.type === "showcase") continue;
      const payloadText = JSON.stringify(screen.payload);
      assert(!/m'aider/.test(payloadText), `${screen.id} uses m'aider outside the preview`);
    }
  });

  test("the engines are chosen by job, not by the sentence giving it away", () => {
    const fill = find(s10, "s03-fill-engine-chooser")!;
    const payload = fill.payload as {
      prompt: string;
      options: { text: string; trapReason?: string }[];
    };
    assert(/which engine does that job/i.test(payload.prompt), "the prompt does not ask about the job");
    for (const option of payload.options) {
      if (option.trapReason === undefined) continue;
      assert(
        /engine for/i.test(option.trapReason),
        `a reason does not name what its engine is for: "${option.trapReason}"`,
      );
    }
  });

  test("the three engines are still named without textbook parentheses", () => {
    const card = find(s10, "s01-insight-three-engines")!;
    const body = String((card.payload as { body: string }).body);
    for (const ugly of ["(being)", "(asking)", "(moving)"]) {
      assert(!body.includes(ugly), `the parenthetical label ${ugly} is back`);
    }
    for (const engine of ["Je suis", "Je voudrais", "Je vais"]) {
      assert(body.includes(engine), `${engine} is no longer named`);
    }
  });
});
