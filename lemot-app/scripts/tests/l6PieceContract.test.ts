/**
 * A piece looks like a piece, wherever the learner meets it.
 *
 * THE FOUNDER'S READING, which these rules exist to keep true. On L6's
 * synthesis surfaces — the screens whose entire purpose is to show reusable
 * material — the three expressions a beginner most needs to recognise as pieces
 * were the three rendered as flat text, because each is too small to break
 * down. And the recap's chips were white pills with wide padding, which read as
 * filters rather than as the same objects the lesson had been handing out.
 *
 * Both are one defect: two visual languages for one concept is two concepts,
 * whatever the code calls them.
 *
 * Source-level where it must be — there is no component renderer here — and
 * behavioural wherever the decision is pure, which for segmentation is all of
 * it.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import {
  pieceItemId,
  showcasePieces,
  wholeSentencePiece,
} from "../../content/lessons/showcasePieces";
import type { Lesson } from "../../content/lessonTypes";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");
const codeOf = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

const CHIP = "components/ui/PieceChip.tsx";
const SHOWCASE = "components/lesson-v1/screens/Showcase.tsx";
const RECAP = "components/lesson-v1/screens/RecapCard.tsx";
const REVEAL = "components/lesson-v1/screens/NaturalReveal.tsx";
const MEET = "components/lesson-v1/screens/MeetCard.tsx";

const L6 = V1_LESSONS.find((l) => l.number === 6)! as Lesson;
const L6_SCREENS = flattenLessonScreens(L6);

describe("a one-piece expression still reads as a piece", () => {
  test("the whole-sentence question is asked separately from the breakdown one", () => {
    // `showcasePieces` answers "is there a breakdown worth showing" and is
    // right to say no for "Bonjour." — a lone chip repeating the line above it
    // is noise. The affordance question is a different one.
    assert(showcasePieces("Bonjour.").length === 0, "still no breakdown");
    assert(wholeSentencePiece("Bonjour.")?.itemId === "chunk-bonjour", "but it IS a piece");
  });

  test("the principle holds for one-piece expressions generally, not just Bonjour", () => {
    // §6: protect the product principle, not one hard-coded word.
    for (const [fr, itemId] of [
      ["Bonjour.", "chunk-bonjour"],
      ["Merci.", "chunk-merci"],
      ["Au revoir.", "chunk-au-revoir"],
      ["Excusez-moi.", "chunk-excusez-moi"],
      ["Je ne comprends pas.", "chunk-je-ne-comprends-pas"],
    ] as const) {
      const whole = wholeSentencePiece(fr);
      assert(whole !== undefined, `${fr} lost its piece identity`);
      assert(whole!.itemId === itemId, `${fr} resolved to ${whole!.itemId}`);
    }
  });

  test("it refuses to dress up a line it cannot account for", () => {
    // The same honesty bar the breakdown applies. A sentence with an
    // unaccounted-for word is not one piece just because only one was found.
    for (const fr of [
      "Merci, au revoir.",
      "Je suis ici.",
      "Pardon, je n'ai pas compris.",
      "Vous pouvez répéter ?",
    ]) {
      assert(wholeSentencePiece(fr) === undefined, `${fr} was wrongly called one piece`);
    }
  });

  test("the Showcase gives the line itself the treatment, without repeating it", () => {
    const code = codeOf(read(SHOWCASE));
    assert(code.includes("wholeSentencePiece"), "the synthesis surface asks the question");
    // And it is the LINE that becomes the piece: one object, not a line plus a
    // chip below it saying the same thing.
    const block = code.slice(code.indexOf("{whole ? ("), code.indexOf("{whole ? (") + 900);
    assert(block.includes("{sentence.fr}"), "the line itself is what is wrapped");
    assert(block.includes("P.rl"), "in the piece language");
    assert(!block.includes("<PieceChip"), "and not duplicated as a separate chip");
  });

  test("L6's synthesis surface no longer strips Bonjour of its affordance", () => {
    const showcase = L6_SCREENS.find((s) => s.type === "showcase");
    const sentences = (
      (showcase?.payload as { clusters?: { sentences: { fr: string }[] }[] })?.clusters ?? []
    ).flatMap((c) => c.sentences);
    const lone = sentences.filter(
      (s) => showcasePieces(s.fr).length === 0 && wholeSentencePiece(s.fr) !== undefined,
    );
    assert(lone.length > 0, "L6's showcase holds no one-piece expression at all");
    assert(
      lone.some((s) => /^bonjour/i.test(s.fr)),
      `Bonjour is not among them: ${lone.map((s) => s.fr).join(" | ")}`,
    );
  });
});

describe("one visual language for pieces", () => {
  test("the chip is the pale pink family, not a filter tag", () => {
    const code = codeOf(read(CHIP));
    assert(code.includes("backgroundColor: P.rl"), "pale pink fill");
    assert(code.includes("borderColor: P.rb"), "rose hairline");
    assert(!code.includes("backgroundColor: P.paper"), "the white pill is gone");
  });

  test("and it matches the treatment the learner met first", () => {
    // MeetCard's highlights are where a learner sees a piece for the first
    // time. If the recap draws the same word differently, it is a different
    // object to them.
    const meet = codeOf(read(MEET));
    const chip = codeOf(read(CHIP));
    for (const token of ["P.rl", "P.rb"]) {
      assert(meet.includes(token) && chip.includes(token), `both surfaces use ${token}`);
    }
  });

  test("geometry is tight and content-sized", () => {
    const code = codeOf(read(CHIP));
    assert(code.includes("alignSelf: \"flex-start\""), "width follows content");
    assert(code.includes("maxWidth: \"100%\""), "and never exceeds the row");
    const padding = code.match(/paddingHorizontal:\s*(\d+)/)?.[1];
    assert(
      padding !== undefined && Number(padding) <= 10,
      `horizontal padding is ${padding}, which makes a balloon of a two-syllable piece`,
    );
  });

  test("French in a chip is never truncated into a different piece", () => {
    // §17, and the exact defect the founder read off a recap: cut "je suis"
    // and the chip shows "je", which is a piece the learner also owns.
    const code = read(CHIP);
    const french = code.slice(code.indexOf("{text}") - 400, code.indexOf("{text}") + 20);
    assert(!french.includes("numberOfLines"), "the French line must be free to wrap");
    // The label may cap, because a label is not lexical identity.
    assert(code.includes("numberOfLines={1}"), "the label still caps at one line");
  });

  test("every surface that draws a piece draws the same component", () => {
    for (const rel of [RECAP, REVEAL]) {
      assert(codeOf(read(rel)).includes("<PieceChip"), `${rel} draws pieces through PieceChip`);
    }
  });
});

describe("the recap shows what it says it shows", () => {
  test("every recap piece in L1-L10 is a canonical item", () => {
    for (const lesson of V1_LESSONS.filter((l) => l.number >= 1 && l.number <= 10)) {
      for (const screen of flattenLessonScreens(lesson as Lesson)) {
        if (screen.type !== "recap") continue;
        const pieces = (screen.payload as { piecesUsed?: string[] }).piecesUsed ?? [];
        for (const piece of pieces) {
          const itemId = pieceItemId(piece);
          assert(
            itemId !== undefined,
            `${lesson.id}/${screen.id}: "${piece}" is not a canonical piece`,
          );
          assert(
            Object.prototype.hasOwnProperty.call(ITEM_REGISTRY, itemId as string),
            `${lesson.id}/${screen.id}: "${piece}" resolves to an unregistered item`,
          );
        }
      }
    }
  });

  test("no recap piece is a prefix of another piece's identity", () => {
    // "je suis" truncated to "je" would still resolve, which is exactly what
    // makes a visual truncation dangerous rather than merely ugly. Both exist
    // in the registry, so the guard is on rendering, not on the data — and this
    // proves the pair really is ambiguous, so the rendering rule above matters.
    const recap = L6_SCREENS.find((s) => s.type === "recap");
    const pieces = (recap?.payload as { piecesUsed?: string[] })?.piecesUsed ?? [];
    const multi = pieces.filter((p) => p.trim().includes(" "));
    assert(multi.length > 0, "L6's recap holds no multi-word piece to protect");
    assert(multi.includes("je suis"), `expected "je suis" among ${multi.join(" | ")}`);
    assert(pieceItemId("je") !== undefined, "and its truncation is itself a real piece");
  });
});

describe("the model reveal shows truthful pieces", () => {
  test("segmentation comes from the canonical source, never from whitespace", () => {
    const code = codeOf(read(REVEAL));
    assert(code.includes("showcasePieces(reveal.modelAnswer)"), "canonical segmentation");
    assert(!code.includes(".split(\" \")"), "never split on spaces");
    assert(!code.includes("modelAnswer.split"), "and never on the model at all");
  });

  test("a model the segmentation cannot account for renders no chips", () => {
    // §10. A false contiguous chip teaches a boundary that does not exist.
    for (const fr of ["Pardon, je n'ai pas compris.", "Bonjour, madame."]) {
      assert(showcasePieces(fr).length === 0, `${fr} must not be drawn as pieces`);
    }
    assert(codeOf(read(REVEAL)).includes("modelPieces.length > 0 &&"), "and the screen honours that");
  });

  test("a split frame is never emitted as two contiguous chips", () => {
    // L3's ne … pas travels inside its own chunk. Either it is one piece or
    // the sentence is not drawn as pieces at all; it is never two halves.
    const pieces = showcasePieces("Je ne suis pas ici.");
    assert(pieces.length > 0, "this one does segment");
    assert(
      pieces.some((p) => p.text === "je ne suis pas"),
      `the frame was broken up: ${pieces.map((p) => p.text).join(" | ")}`,
    );
    for (const p of pieces) {
      assert(p.text !== "ne" && p.text !== "pas", `"${p.text}" is half a frame`);
    }
  });

  test("L6's repair model breaks down the way the learner will reuse it", () => {
    const pieces = showcasePieces("Je ne comprends pas. Vous pouvez répéter ?");
    assert(
      pieces.map((p) => p.text).join(" | ") === "je ne comprends pas | vous pouvez | répéter",
      `got: ${pieces.map((p) => p.text).join(" | ")}`,
    );
    for (const p of pieces) {
      assert(
        Object.prototype.hasOwnProperty.call(ITEM_REGISTRY, p.itemId),
        `${p.text} is not a registered item`,
      );
    }
  });

  test("the audio from the previous pass survived the pieces", () => {
    const code = read(REVEAL);
    assert(code.includes("say(reveal.modelAnswer as string)"), "still plays the whole model");
    assert((code.match(/<Volume2/g) ?? []).length === 1, "one playback, not one per piece");
    assert(!/PieceChip[\s\S]{0,200}Volume2/.test(code), "no speaker rides on a chip");
  });

  test("no learner-facing surface says Accepted", () => {
    for (const rel of [REVEAL, "components/lesson-v1/screens/Weave.tsx"]) {
      assert(!/text: "Accepted/.test(codeOf(read(rel))), `${rel} reintroduced grader language`);
    }
  });
});

describe("L6 still carries one small moment", () => {
  test("every production screen says where the learner is", () => {
    const production = L6_SCREENS.filter(
      (s) => s.type === "weave" || s.type === "say-it-your-way",
    );
    for (const screen of production) {
      const payload = screen.payload as { context?: string; situation?: string };
      const scene = payload.context ?? payload.situation ?? "";
      assert(scene.trim().length > 0, `${screen.id} drops the learner into no scene at all`);
    }
  });

  test("the arc runs arrival, purpose, offer, repair, close", () => {
    const order = L6_SCREENS.map((s) => s.id);
    const at = (fragment: string) => order.findIndex((id) => id.includes(fragment));
    const arrival = at("bonjour-je-suis-ici");
    const offer = at("decline-offer");
    const repair = at("did-not-catch-it");
    const close = at("close-open");
    for (const [name, i] of [["arrival", arrival], ["offer", offer], ["repair", repair], ["close", close]] as const) {
      assert(i >= 0, `${name} beat is missing from L6`);
    }
    assert(arrival < offer, "you arrive before you are offered anything");
    assert(offer < repair, "the offer comes before the misunderstanding");
    assert(repair < close, "and the repair before the goodbye");
  });

  test("the lesson does not claim all of its French is already owned", () => {
    // §14. au revoir is new in L6, and three showcase lines are L7 exposure.
    const text = JSON.stringify(L6_SCREENS);
    assert(!/Nothing here is new/.test(text), "the absolute claim is back");
    assert(!/just the pieces you already built/i.test(text), "and so is the recap's");
  });

  test("exposure-only later French stays exposure-only", () => {
    // §15. These three may be read; they may never be asked for, hinted, or
    // offered as a model.
    const later = ["À bientôt", "Bonne journée", "n'ai pas compris"];
    for (const screen of L6_SCREENS) {
      if (screen.type === "showcase") continue; // the one surface allowed to show them
      const payload = JSON.stringify(screen.payload);
      for (const phrase of later) {
        assert(
          !payload.includes(phrase),
          `${screen.id} uses "${phrase}" outside the showcase's exposure tier`,
        );
      }
    }
  });
});
