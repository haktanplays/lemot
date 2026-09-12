/**
 * L7: the destination has a pattern, and the lesson now says so.
 *
 * ── WHAT WAS WRONG ──────────────────────────────────────────────────────────
 *
 * The card taught that French "picks one of three shapes", that "there is no
 * rule you can hear your way to", and that "the shape belongs to the place, not
 * to you". All three are false. à + le contracts to au; à + la does not
 * contract at all; l' is an article that has already elided before a vowel
 * sound. A learner told there is no rule cannot apply one to a place the lesson
 * never showed them, so the language was made bigger than it is.
 *
 * ── AND WHAT WAS RIGHT, AND HAD TO STAY RIGHT ───────────────────────────────
 *
 * The destination is still ONE reusable piece. Teaching the pattern inside it
 * and handing out its halves as pieces are different claims, and only the first
 * is true — which is why the breakdown stopped splitting "au café" in the same
 * pass. These rules hold both halves at once.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { flattenLessonScreens, reviewShowcaseProvenance } from "../../content/lessons/lessonStructure";
import { knownPieces, showcasePieces, wholeSentencePiece } from "../../content/lessons/showcasePieces";
import { matchExpected } from "../../components/lesson-v1/screens/normalizeAnswer";
import { learnerVerdict } from "../../components/lesson-v1/screens/verdictCopy";
import type { InsightCardScreen, Lesson, WeaveScreen } from "../../content/lessonTypes";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");
const codeOf = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

const L7 = V1_LESSONS.find((l) => l.number === 7)! as Lesson;
const SCREENS = flattenLessonScreens(L7);
const screen = (id: string) => SCREENS.find((s) => s.id === id);

/** Every learner-facing string in L7, for copy-level claims. */
const L7_COPY = JSON.stringify(SCREENS);

// ── §26: the destination pattern ────────────────────────────────────────────

describe("the three shapes are one rule, shown", () => {
  const card = screen("s02-insight-je-vais-frozen") as InsightCardScreen;

  test("the card still exists and still owns the destination", () => {
    assert(card !== undefined, "the destination card is gone");
    assert((card.payload.examples ?? []).length >= 3, "it still shows the three shapes");
  });

  test("à + le → au is derived, not asserted", () => {
    const d = (card.payload.examples ?? []).find((e) => e.derivation?.to === "au café");
    assert(d !== undefined, "no derivation produces au café");
    assert(d!.derivation!.from === "le café", `it starts from ${d!.derivation!.from}`);
    assert(d!.derivation!.via === "à + le", `via ${d!.derivation!.via}`);
  });

  test("à + la stays à la, and the note says why nothing merges", () => {
    const d = (card.payload.examples ?? []).find((e) => e.derivation?.to === "à la maison");
    assert(d !== undefined, "no derivation produces à la maison");
    assert(d!.derivation!.via === "à + la", `via ${d!.derivation!.via}`);
    assert(/nothing merges/i.test(d!.note ?? ""), `the note reads: ${d!.note}`);
  });

  test("l'hôtel gets its own step: the article elides before à is involved", () => {
    const elision = (card.payload.examples ?? []).find((e) => e.derivation?.to === "l'hôtel");
    assert(elision !== undefined, "the article step is missing");
    assert(
      elision!.derivation!.from === "le hôtel",
      `it must show the form French refuses, not ${elision!.derivation!.from}`,
    );
    assert(elision!.fr === undefined, "that step is about the article, not a sentence");
    assert(/silent/i.test(elision!.note ?? ""), "and the silent h is named once");
    const withA = (card.payload.examples ?? []).find((e) => e.derivation?.to === "à l'hôtel");
    assert(withA !== undefined, "and then à is added");
    assert(withA!.derivation!.from === "l'hôtel", "starting from the already-elided article");
  });

  test("no learner-facing copy claims the shapes are arbitrary", () => {
    for (const claim of [
      "no rule",
      "belongs to the place",
      "picks one of three shapes",
      "never changes",
      "take each destination whole",
    ]) {
      assert(
        !L7_COPY.toLowerCase().includes(claim.toLowerCase()),
        `L7 still tells the learner: "${claim}"`,
      );
    }
  });

  test("L7 never shows the learner à le", () => {
    // The one form the rule exists to prevent. It may be NAMED as what French
    // refuses ("French never says à le"), and must never appear as French.
    for (const bad of ["à le café", "a le café", "Je vais à le"]) {
      assert(!L7_COPY.includes(bad), `L7 contains "${bad}"`);
    }
    assert(/never says à le/i.test(L7_COPY), "and the rule is stated where the learner reads it");
  });

  test("hôtel is only ever written l'hôtel outside the one refused form", () => {
    const shown = L7_COPY.match(/(le|la|l') ?h[oô]tel/gi) ?? [];
    for (const form of shown) {
      const ok = /l'h[oô]tel/i.test(form) || form.toLowerCase().startsWith("le h");
      assert(ok, `L7 writes "${form}"`);
    }
    // And "le hôtel" appears exactly once: as the thing being derived away.
    assert(
      (L7_COPY.match(/le h[oô]tel/gi) ?? []).length === 1,
      "the refused form must appear once, in the derivation, and nowhere else",
    );
  });
});

describe("the noticing moment runs the rule", () => {
  test("the shape choice asks about the article, not about the place", () => {
    const fill = screen("s31a-fill-which-shape");
    assert(fill !== undefined, "the noticing fill is gone");
    const payload = fill!.payload as { prompt: string; options: { trapReason?: string }[] };
    assert(/la gare/i.test(payload.prompt), "the prompt hands over the article");
    for (const option of payload.options) {
      if (option.trapReason === undefined) continue;
      assert(
        !/is the shape for|does not take it|is for places/i.test(option.trapReason),
        `a reason still lists places instead of naming the rule: "${option.trapReason}"`,
      );
    }
  });
});

// ── §1, §25: the destination is one piece ───────────────────────────────────

describe("a destination is one reusable piece", () => {
  test("all four destination shapes break the same way", () => {
    for (const fr of [
      "Je vais au café.",
      "Je vais à la maison.",
      "Je vais à la gare.",
      "Je vais à l'hôtel.",
    ]) {
      const pieces = showcasePieces(fr).map((p) => p.text);
      assert(
        pieces.length === 2 && pieces[0] === "je vais",
        `${fr} breaks into ${pieces.length}: ${pieces.join(" | ")}`,
      );
    }
  });

  test("no bare preposition is ever a learner-facing piece", () => {
    // The defect: `prep-au` and `noun-cafe` together rebuilt "au café", so it
    // split into [au] and [café] while the other three destinations stayed
    // whole — and the second chip resolved to `noun-cafe`, whose meaning is
    // COFFEE. A learner following it into Mon Lexique got the drink.
    for (const fr of ["Je vais au café.", "au café", "Je vais au travail."]) {
      for (const piece of showcasePieces(fr)) {
        assert(!piece.itemId.startsWith("prep-"), `${fr} renders the bare ${piece.itemId}`);
        assert(piece.itemId !== "noun-cafe", `${fr} renders the drink, not the place`);
      }
    }
  });

  test("the prepositions are still real entries, just not surfaces", () => {
    // They are what the grammar card teaches with. Removing them from the
    // registry would be a different and much worse fix.
    for (const id of ["prep-au", "prep-a-la"]) {
      assert(Object.prototype.hasOwnProperty.call(ITEM_REGISTRY, id), `${id} was deleted`);
    }
  });

  test("grading still sees the destination whole", () => {
    assert(
      knownPieces("Je vais au café.").map((p) => p.text).join(" | ") === "je vais | au café",
      "the grading view must not have moved with the display one",
    );
  });
});

// ── §27: pars / partir ──────────────────────────────────────────────────────

describe("the leaving family is connected, and not overclaimed", () => {
  const card = screen("s10-insight-leaving-two-moves") as InsightCardScreen;

  test("partir is named as the verb behind both forms", () => {
    const note = (card.payload.examples ?? []).map((e) => e.note ?? "").join(" ");
    assert(/partir/.test(note), "partir is never named");
    assert(/je pars/i.test(note), "je pars is not connected to it");
    assert(/je dois partir/i.test(note), "and neither is je dois partir");
  });

  test("departure is offered as a memory hook, never as a cognate claim", () => {
    const copy = L7_COPY;
    assert(/departure/i.test(copy), "the English hook is missing");
    for (const overclaim of [
      "same word",
      "comes from",
      "cognate",
      "root of",
      "literally",
    ]) {
      assert(
        !new RegExp(overclaim, "i").test(copy),
        `L7 claims more than it can: "${overclaim}"`,
      );
    }
    assert(/think of the english/i.test(copy), "it is framed as something to think of");
  });

  test("the card did not become a table", () => {
    assert(
      (card.payload.examples ?? []).length <= 4,
      `${(card.payload.examples ?? []).length} examples; a card is not a table`,
    );
  });

  test("the three ways out are told apart by what they do", () => {
    const fill = screen("s32z-fill-which-one-explains");
    assert(fill !== undefined, "the leaving contrast is gone");
    const payload = fill!.payload as {
      options: { text: string; isCorrect: boolean }[];
      reveal: { explanation?: string };
    };
    const texts = payload.options.map((o) => o.text);
    assert(texts.some((t) => /je vais/i.test(t)), "je vais is one of the three");
    assert(texts.some((t) => /je pars/i.test(t)), "je pars is another");
    assert(texts.some((t) => /je dois partir/i.test(t)), "and je dois partir the third");
    const correct = payload.options.find((o) => o.isCorrect)!;
    assert(/dois partir/i.test(correct.text), "the one that explains is je dois partir");
    assert(
      /not spares for each other|are not spares/i.test(payload.reveal.explanation ?? ""),
      "the reveal must say they are not interchangeable",
    );
  });

  test("it teaches no conjugation", () => {
    for (const banned of ["tu pars", "il part", "nous partons", "vous partez", "conjugat"]) {
      assert(!new RegExp(banned, "i").test(L7_COPY), `L7 drifted into conjugation: ${banned}`);
    }
  });
});

// ── §28: context and open destinations ──────────────────────────────────────

describe("an open task is graded as an open task", () => {
  const decline = screen("s12-weave-decline-and-go") as WeaveScreen;

  test("the scene no longer implies a destination it never named", () => {
    const context = decline.payload.context ?? "";
    assert(!/café|cafe/i.test(context), `the scene names the model's place: "${context}"`);
    assert(context.trim().length > 0, "and it still sets a scene");
  });

  test("every destination L7 teaches is accepted there", () => {
    for (const destination of ["au café", "à la maison", "à la gare", "à l'hôtel", "au travail"]) {
      const answer = `Non merci. Je vais ${destination}.`;
      const match = matchExpected(
        answer,
        decline.payload.expectedAnswers,
        decline.payload.acceptedAlternatives,
      );
      assert(match !== "none", `"${answer}" is still refused`);
    }
  });

  test("and a different destination reads as That works, never as partial", () => {
    const answer = "Non merci, je vais à la maison.";
    const match = matchExpected(
      answer,
      decline.payload.expectedAnswers,
      decline.payload.acceptedAlternatives,
    );
    const verdict = learnerVerdict(match, answer, decline.payload.expectedAnswers[0] ?? null);
    assert(verdict?.text === "That works.", `it said "${verdict?.text}"`);
    assert(verdict!.approves, "and it approves");
  });

  test("the model is unchanged, so the learner still meets one", () => {
    assert(
      decline.payload.expectedAnswers[0] === "Non merci. Je vais au café.",
      "the anchor moved",
    );
    assert(decline.payload.reveal.modelAnswer === "Non merci. Je vais au café.", "and so did the reveal");
  });

  test("the hint stops at the engine and leaves the destination to the learner", () => {
    // §23. The tray used to hand over "au café" and the cloze used to hide the
    // whole second half, both answering the question the task exists to ask.
    const pieces = (decline.payload.suggestedPieces ?? []).map((p) => p.text);
    assert(!pieces.includes("au café"), "the tray still gives a destination away");
    assert(pieces.includes("je vais"), "it still gives the engine");
    assert(
      decline.payload.hintCloze === "Non merci. Je vais ___.",
      `the cloze is "${decline.payload.hintCloze}"`,
    );
  });

  test("a task that DOES name its destination stays specific", () => {
    // The other half of the rule. s31b says "I'm going to the café" in the
    // prompt, so café is the answer and nothing else is.
    const cafe = screen("s31b-weave-going-to-the-cafe") as WeaveScreen;
    assert(/café/i.test(cafe.payload.prompt), "the prompt names the place");
    assert(
      matchExpected(
        "Je vais à la maison.",
        cafe.payload.expectedAnswers,
        cafe.payload.acceptedAlternatives,
      ) === "none",
      "a different destination must not pass a task that named one",
    );
  });

  test("the ungraded close is open too", () => {
    const sayIt = screen("s06-sayit-take-your-leave");
    const payload = sayIt!.payload as { acceptedAlternatives?: string[]; modelAnswer?: string };
    assert(
      (payload.acceptedAlternatives ?? []).length >= 3,
      "the comparison reveal still reads one destination only",
    );
    assert(payload.modelAnswer === "Merci. Je vais à la maison. Au revoir.", "the model is unchanged");
  });
});

// ── §18: exposure becoming a learning item ──────────────────────────────────

describe("a line the learner previewed says so, once", () => {
  test("À bientôt carries the note, and canon backs it", () => {
    const showcase = SCREENS.find((s) => s.type === "showcase");
    const sentences = (
      (showcase?.payload as { clusters?: { sentences: { fr: string; seenBefore?: string; role: string }[] }[] })
        ?.clusters ?? []
    ).flatMap((c) => c.sentences);
    const line = sentences.find((s) => s.fr === "À bientôt !");
    assert(line !== undefined, "the line is gone");
    assert(line!.seenBefore !== undefined, "it does not say the learner has met it");
    assert(line!.role !== "exposure", "and it really has graduated");
  });

  test("no unearned claim exists anywhere in the corpus", () => {
    const findings = reviewShowcaseProvenance(V1_LESSONS as Lesson[]);
    assert(
      findings.length === 0,
      findings.map((f) => f.message).join("\n"),
    );
  });

  test("it is not applied mechanically", () => {
    // §18. One line in L7 has provable prior exposure; the rest must not be
    // wearing the note because it reads nicely.
    const claims = (JSON.stringify(V1_LESSONS).match(/"seenBefore"/g) ?? []).length;
    assert(claims <= 3, `${claims} lines claim prior exposure; provenance proves far fewer`);
  });
});

// ── §29: pieces, recap, reveal ──────────────────────────────────────────────

describe("L7's reusable expressions look reusable", () => {
  test("the one-piece closings carry the shared affordance", () => {
    // The founder saw these flat. The L6 whole-sentence work already fixed it
    // at HEAD; this pins that it stays fixed rather than patching it twice.
    for (const fr of ["À bientôt !", "À tout à l'heure !", "De rien."]) {
      assert(
        wholeSentencePiece(fr) !== undefined,
        `${fr} has no piece identity, so it renders flat`,
      );
    }
  });

  test("the recap lists canonical pieces and nothing truncated", () => {
    const recap = SCREENS.find((s) => s.type === "recap");
    const pieces = (recap!.payload as { piecesUsed?: string[] }).piecesUsed ?? [];
    assert(pieces.includes("Au revoir"), "the closing is listed whole");
    assert(!pieces.includes("Au"), "and never as the fragment the screenshot showed");
    for (const piece of pieces) {
      assert(
        knownPieces(piece).length > 0,
        `"${piece}" is not a canonical piece`,
      );
    }
  });

  test("the chip that produced Au cannot truncate French any more", () => {
    // Root cause, and it is not in the data: piecesUsed already said
    // "Au revoir". PieceChip capped French at one line, so a chip too narrow
    // for the phrase showed its first word — a different piece the learner
    // also owns. Fixed in the L4 pass; this is the regression pin.
    const chip = read("components/ui/PieceChip.tsx");
    const french = chip.slice(chip.indexOf("{text}") - 500, chip.indexOf("{text}") + 20);
    assert(!french.includes("numberOfLines"), "French in a chip must be free to wrap");
  });

  test("the recap heading claims only what the screen can know", () => {
    // §21. `piecesUsed` is authored per lesson and the recap receives no
    // learner state, so "Pieces you used" asserted something nothing checked.
    const recap = codeOf(read("components/lesson-v1/screens/RecapCard.tsx"));
    assert(!recap.includes("Pieces you used"), "the unverifiable claim is back");
    assert(recap.includes("The pieces in this one"), "and the truthful heading is gone");
  });

  test("the reveal keeps its audio and its canonical pieces", () => {
    const reveal = read("components/lesson-v1/screens/NaturalReveal.tsx");
    assert(reveal.includes("say(reveal.modelAnswer as string)"), "audio regressed");
    assert(reveal.includes("showcasePieces(reveal.modelAnswer)"), "model pieces regressed");
    assert(!/text: "Accepted/.test(reveal), "grader language returned");
  });

  test("L7's own reveals go through the shared path", () => {
    // §22: if a screen bypassed NaturalReveal it would silently lose both.
    const lessonScreens = SCREENS.filter((s) => s.type === "natural-reveal");
    assert(lessonScreens.length > 0, "L7 has no shared reveal at all");
    for (const s of lessonScreens) {
      const payload = s.payload as { modelAnswer?: string };
      assert(
        typeof payload.modelAnswer === "string" && payload.modelAnswer.length > 0,
        `${s.id} reveals nothing to hear`,
      );
    }
  });
});
