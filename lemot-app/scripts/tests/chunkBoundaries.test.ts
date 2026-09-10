/**
 * The same French always breaks into the same pieces.
 *
 * Founder device evidence, all four visible without scrolling:
 *
 *   "Je suis ici."             je suis · ici
 *   "Bonjour, je suis ici."    Bonjour · je suis ici      <- one chip
 *   "C'est où ?"               c'est · où
 *   "Excusez-moi, c'est où ?"  excusez-moi · c'est où ?   <- one chip, with
 *                                                            the question mark
 *                                                            baked inside it
 *   "J'ai une question."       j'ai · une question
 *   "Bonjour, j'ai une q..."   Bonjour · j'ai une question <- one chip
 *   "Vous avez du thé ?"       vous avez · thé            <- "du" vanished
 *
 * The learner is being told that the same French is two pieces and one piece at
 * once, and in the last case that a word they can plainly see is not part of the
 * sentence at all. These pin the contract that removes all four.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { knownPieces, pieceLabel, showcasePieces } from "../../content/lessons/showcasePieces";
import {
  showcaseSentencesOf,
  shownPieces,
} from "../../content/lessons/showcaseClassification";

const fold = (s: string) =>
  s
    .normalize("NFC")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[.,!?;:«»"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const ALL = V1_LESSONS.flatMap((l) => showcaseSentencesOf(l).map((s) => ({ lesson: l.id, s })));

describe("one piece of French, one boundary", () => {
  test("a run of chips is never also shown as a single chip elsewhere", () => {
    // Every text that the corpus presents as ONE piece.
    const whole = new Set<string>();
    for (const { s } of ALL) for (const p of shownPieces(s)) whole.add(fold(pieceLabel(p)));

    for (const { lesson, s } of ALL) {
      const pieces = shownPieces(s).map((p) => fold(pieceLabel(p)));
      for (let i = 0; i < pieces.length; i += 1) {
        for (let j = i + 2; j <= pieces.length; j += 1) {
          const run = pieces.slice(i, j).join(" ");
          assert(
            !whole.has(run),
            `${lesson} "${s.fr}" splits "${run}", which another line shows as one piece`,
          );
        }
      }
    }
  });

  test("the four reported lines break the way their siblings do", () => {
    const same = (a: string, b: string) => {
      const first = ALL.find((x) => x.s.fr === a);
      const second = ALL.find((x) => x.s.fr === b);
      assert(first !== undefined && second !== undefined, `${a} / ${b} should be authored`);
      const fa = shownPieces(first!.s).map((p) => fold(pieceLabel(p)));
      const fb = shownPieces(second!.s).map((p) => fold(pieceLabel(p)));
      // The shorter line's pieces must appear intact inside the longer one.
      const joined = fb.join(" ");
      assert(
        joined.includes(fa.join(" ")),
        `"${a}" is ${fa.join(" · ")} but "${b}" is ${fb.join(" · ")}`,
      );
    };
    same("Je suis ici.", "Bonjour, je suis ici.");
    same("C'est où ?", "Excusez-moi, c'est où ?");
    same("J'ai une question.", "Bonjour, j'ai une question.");
  });

  test("no chip carries sentence punctuation", () => {
    for (const { lesson, s } of ALL) {
      for (const p of shownPieces(s)) {
        assert(
          !/[.?!]$/.test(pieceLabel(p)),
          `${lesson} "${s.fr}" has a chip ending in punctuation: "${pieceLabel(p)}"`,
        );
      }
    }
  });
});

describe("the chips are the sentence, taken apart", () => {
  test("every breakdown rebuilds its line exactly", () => {
    for (const { lesson, s } of ALL) {
      const pieces = shownPieces(s);
      if (pieces.length < 2) continue;
      assertEqual(
        fold(pieces.join(" ")),
        fold(s.fr),
        `${lesson} "${s.fr}" loses words: ${pieces.join(" · ")}`,
      );
    }
  });

  test('"Vous avez du thé ?" no longer drops "du"', () => {
    const line = ALL.find((x) => x.s.fr === "Vous avez du thé ?");
    assert(line !== undefined, "the line should be authored");
    const pieces = shownPieces(line!.s);
    assert(
      pieces.some((p) => fold(p).includes("du")),
      `"du" is missing from ${pieces.join(" · ")}`,
    );
  });

  test("a line that cannot be rebuilt gets no breakdown rather than a lossy one", () => {
    // "loin" is not a registry item, so nothing honest can be shown here.
    assertEqual(showcasePieces("C'est loin ?").length, 0, "a lossy breakdown is worse than none");
  });
});

describe("grading is never finer than the screen", () => {
  test("every line's grading view is at most as fine as its display view", () => {
    for (const { lesson, s } of ALL) {
      const display = showcasePieces(s.fr);
      if (display.length === 0) continue;
      const grading = knownPieces(s.fr);
      assert(
        grading.length <= display.length,
        `${lesson} "${s.fr}" grades finer (${grading.length}) than it shows (${display.length})`,
      );
    }
  });

  test("a protected pair stays whole for grading even where the screen splits it", () => {
    // The direction that matters: crediting "merci" alone as a component of
    // "non merci" turns a wrong-intent answer into partial credit.
    const grading = knownPieces("Non merci.");
    assert(
      grading.some((p) => fold(p.text) === "non merci"),
      `grading should hold the pair together, got ${grading.map((p) => p.text).join(" · ")}`,
    );
  });
});
