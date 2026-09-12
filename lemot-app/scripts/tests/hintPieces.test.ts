/**
 * A hint must be a piece of the answer the learner is being asked for.
 *
 * The founder opened the hint on L5's "J'ai une idée." and was shown
 * "une question", under a label reading "One of the pieces you need". Both
 * halves of that were wrong, and neither was a typo.
 *
 * The tray held "une question" on purpose, labelled "the other package", as a
 * contrast for a screen about choosing. But the weave is `open`, so no tray is
 * shown up front and the contrast only ever appeared BEHIND a hint — and the
 * ladder reverses what it is given, so that the single piece it offers is never
 * copy-ready. Reversing a two-item array whose second item is the distractor
 * hands the distractor over first.
 *
 * So the class is: a tray is two different things at once. It is the set of
 * pieces the answer is made of, and it is whatever the author wanted on screen.
 * The rule below separates them — anything not marked as contrast must belong
 * to an authored answer — and the renderer keeps contrast pieces out of the
 * rungs entirely.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import type { Lesson } from "../../content/lessonTypes";

const PATH = V1_LESSONS.filter((l) => l.number >= 1 && l.number <= 10);
const fold = (s: string) =>
  s.normalize("NFC").toLowerCase().replace(/[.!?,;:«»"'’]/g, " ").replace(/\s+/g, " ").trim();

type Piece = { text: string; contrast?: boolean };

/**
 * Everything a screen accepts or shows back as a good answer.
 *
 * Includes the reveal's alternatives, and that inclusion is the difference
 * between a useful guard and a noisy one: the first version of this audit
 * flagged three Say It screens whose trays offer "Excusez-moi" and "un thé",
 * which ARE authored answers — they live in the reveal's labelled variants
 * rather than in expectedAnswers. Reading only the graded fields would have
 * had those screens "fixed" and made them worse.
 */
function authoredAnswers(payload: Record<string, unknown>): string[] {
  const reveal = payload.reveal as
    | { modelAnswer?: string; naturalAlternatives?: (string | { fr?: string })[] }
    | undefined;
  const alts = (reveal?.naturalAlternatives ?? []).map((a) =>
    typeof a === "string" ? a : (a?.fr ?? ""),
  );
  return [
    ...((payload.expectedAnswers as string[]) ?? []),
    ...((payload.acceptedAlternatives as string[]) ?? []),
    payload.modelAnswer as string | undefined,
    reveal?.modelAnswer,
    ...alts,
  ]
    .filter((a): a is string => typeof a === "string" && a.length > 0)
    .map(fold);
}

function offeredPieces(lesson: Lesson) {
  const out: { screenId: string; type: string; piece: Piece; answers: string[] }[] = [];
  for (const screen of flattenLessonScreens(lesson)) {
    if (screen.type !== "weave" && screen.type !== "say-it-your-way") continue;
    const payload = screen.payload as Record<string, unknown>;
    const answers = authoredAnswers(payload);
    for (const piece of ((payload.suggestedPieces as Piece[]) ?? [])) {
      out.push({ screenId: screen.id, type: screen.type, piece, answers });
    }
  }
  return out;
}

describe("every offered piece belongs to an answer, or says it does not", () => {
  for (const lesson of PATH) {
    test(`L${lesson.number} offers nothing stale`, () => {
      const stray = offeredPieces(lesson).filter(
        ({ piece, answers }) =>
          piece.contrast !== true && !answers.some((a) => a.includes(fold(piece.text))),
      );
      assert(
        stray.length === 0,
        `these are handed to the learner as help for answers they are not part of:\n${stray
          .map((s) => `  ${s.screenId}: "${s.piece.text}"`)
          .join("\n")}`,
      );
    });
  }

  test("the audit is really reading trays", () => {
    const all = PATH.flatMap(offeredPieces);
    assert(all.length >= 40, `only ${all.length} offered pieces found across L1-L10`);
  });
});

describe("a contrast piece is never offered as a hint", () => {
  const weave = readFileSync(join(process.cwd(), "components/lesson-v1/screens/Weave.tsx"), "utf8");

  test("the ladder filters it out", () => {
    assert(
      /p\.contrast !== true/.test(weave),
      "the hint ladder must exclude contrast pieces, not just avoid authoring them",
    );
  });

  test("the filter sits where the rungs are built, not where the tray is rendered", () => {
    // It has to be gone before `orderHintPieces` reverses anything; filtering
    // later would still let a distractor reach a rung.
    const build = weave.slice(weave.indexOf("const constitutivePieces"), weave.indexOf("orderHintPieces(pieces)"));
    assert(build.includes("contrast !== true"), "contrast must be removed before the rungs are cut");
  });
});

describe("L5 no longer hands over the other package", () => {
  const L5 = PATH.find((l) => l.number === 5)!;
  const screen = flattenLessonScreens(L5).find((s) => s.id === "s09b-weave-pick-the-package");

  test("the screen still exists and still asks for the idea", () => {
    assert(screen !== undefined, "the retrieval weave must survive");
    const answers = authoredAnswers(screen!.payload as Record<string, unknown>);
    assert(answers.some((a) => a.includes("une idée")), "its answer is still J'ai une idée.");
  });

  test("no piece on it names the other package", () => {
    const pieces = ((screen!.payload as { suggestedPieces?: Piece[] }).suggestedPieces ?? []);
    for (const piece of pieces) {
      assert(
        !fold(piece.text).includes("une question"),
        `"${piece.text}" is the package this screen is not asking for`,
      );
    }
  });

  test("what it does offer is the package, not the bare noun", () => {
    // §9: the operation is retrieving the noun WITH its little word. A hint of
    // "idée" would teach the learner to assemble the article themselves, which
    // is the strategy this lesson exists to replace.
    const pieces = ((screen!.payload as { suggestedPieces?: Piece[] }).suggestedPieces ?? []);
    assert(pieces.length > 0, "it still offers something");
    for (const piece of pieces) {
      assert(
        /^une |^un /.test(piece.text.trim()),
        `"${piece.text}" is a naked noun; L5 hands over packages`,
      );
    }
  });
});

describe("L5 teaches packages, not a meaning-based rule", () => {
  const L5 = PATH.find((l) => l.number === 5)!;
  const copy = flattenLessonScreens(L5)
    .map((s) => JSON.stringify(s.payload))
    .join("\n");

  test("it never says the choice is easy", () => {
    // It is not. Every abstract noun the early course teaches happens to take
    // une, so a learner told this is easy will infer a rule from meaning and be
    // wrong the first time they meet un problème.
    assert(!/\beasy\b/i.test(copy), "L5 must not claim un/une is easy to choose");
    assert(!/just choose/i.test(copy), "nor that you simply pick one");
  });

  test("it does not group the packages into semantic families", () => {
    // "Two in the un family, two in the une family" reads as beverage-family
    // and idea-family, which is the false shortcut this lesson has to prevent.
    assert(!/un family|une family/i.test(copy), "families imply a meaning rule");
  });

  test("it says outright that meaning does not decide it", () => {
    // The positive half. Refusing the false rule is not enough on its own: a
    // lesson that simply never mentions it leaves the learner to infer one.
    assert(
      /meaning does not decide|cannot (always )?(tell|guess)/i.test(copy),
      "L5 must state that the little word cannot be read off the meaning",
    );
  });

  /**
   * The packages card, selected by its exact title.
   *
   * A loose /small packages/ match found the GOAL card first — "Little words,
   * small packages" — and reported that the lesson showed no packages at all,
   * which was a fact about the selector rather than about L5.
   */
  const packagesCard = () =>
    flattenLessonScreens(L5).find(
      (s) =>
        s.type === "insight-card" &&
        (s.payload as { title: string }).title === "Words come in small packages.",
    );

  test("the counterexample is present and is shown, never asked for", () => {
    const card = packagesCard();
    assert(card !== undefined, "the packages card must exist");
    const examples = (card!.payload as { examples?: { fr?: string; pieces?: string[] }[] }).examples ?? [];
    const counter = examples.find((e) => (e.fr ?? "").includes("problème"));
    assert(counter !== undefined, "an abstract noun taking un is what breaks the pattern");
    // Recognition only: the course does not teach it as a unit, so it must not
    // be claimed as a target anywhere on the screen.
    const ids = (card as { targetItemIds?: string[] }).targetItemIds ?? [];
    assert(
      !ids.some((id) => id.includes("probleme")),
      "the counterexample is shown, not taught",
    );
  });

  test("the packages card shows packages", () => {
    // A card that says words travel together and prints flat italic lines is
    // arguing against itself on the one screen where the visual language IS
    // the lesson.
    const card = packagesCard()!;
    const examples = (card.payload as { examples?: { pieces?: string[] }[] }).examples ?? [];
    const chipped = examples.filter((e) => (e.pieces ?? []).length > 0);
    assert(chipped.length >= 3, `only ${chipped.length} examples render as pieces`);
    // And at least one shows the package inside a sentence, which is where the
    // learner has to recognise it.
    assert(
      examples.some((e) => (e.pieces ?? []).length > 1),
      "one example must show a package sitting inside a sentence",
    );
  });

  test("gender is named once, and handed back to the strategy", () => {
    const mentions = (copy.match(/gender/gi) ?? []).length;
    assert(mentions >= 1, "pretending French has no gender leaves a learner to invent a rule");
    assert(mentions <= 2, `gender is discussed ${mentions} times; this is not a grammar lesson`);
    for (const overreach of ["masculine", "feminine", "agreement"]) {
      assert(!new RegExp(overreach, "i").test(copy), `L5 must not open ${overreach}`);
    }
  });
});
