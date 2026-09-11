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

describe("the rescue formula breaks the same way on every surface", () => {
  // Founder report: the UI treated "Vous pouvez répéter" as ONE chunk. The
  // canonical segmentation is vous pouvez | répéter, because vous pouvez is a
  // reusable request engine and répéter is the action it carries. L1's own
  // Showcase already listed the pieces that way; the meet-card highlight and
  // the weave chip tray did not, so the same French broke two ways inside one
  // lesson. These pin all three surfaces to one answer.
  const L1 = V1_LESSONS.find((l) => l.id === "v1-lesson-001");

  /** Every screen in L1, chain steps included. */
  type AnyScreen = {
    id: string;
    type: string;
    targetItemIds?: readonly string[];
    payload: Record<string, unknown>;
  };
  const screensOf = (lesson: typeof L1): AnyScreen[] =>
    ((lesson?.screens ?? []) as unknown as AnyScreen[]).flatMap((s) =>
      s.type === "activity-chain"
        ? [s, ...((s.payload.steps as AnyScreen[]) ?? [])]
        : [s],
    );

  test("the meet-card shows two pieces, not one pill", () => {
    const meet = screensOf(L1).find((s) => s.id === "s17-meet-vous-pouvez-repeter");
    assert(meet !== undefined && meet.type === "meet-card", "the meet screen is authored");
    const highlights =
      (meet.payload.highlights as { text: string; itemId?: string }[]) ?? [];
    assertEqual(
      highlights.map((h) => h.text),
      ["Vous pouvez", "répéter"],
      "the engine and the action are separate pieces",
    );
    assertEqual(
      highlights.map((h) => h.itemId),
      ["chunk-vous-pouvez", "verb-repeter"],
      "each piece carries its own identity, so both are tappable",
    );
  });

  test("the weave tray offers the engine and the action separately", () => {
    const weave = screensOf(L1).find((s) => s.id === "s19-weave-excuse-and-repeat");
    assert(weave !== undefined && weave.type === "weave", "the weave screen is authored");
    const pieces =
      (weave.payload.suggestedPieces as { text: string; itemId?: string }[]) ?? [];
    assert(
      !pieces.some((p) => fold(p.text) === fold("vous pouvez répéter")),
      "the whole formula must not come back as one chip",
    );
    assertEqual(
      pieces.map((p) => p.itemId),
      ["chunk-excusez-moi", "chunk-vous-pouvez", "verb-repeter"],
      "three pieces, each with an identity",
    );
  });

  test("no L1 surface shows the formula as a single piece", () => {
    for (const s of screensOf(L1)) {
      const p = s.payload ?? {};
      const texts = [
        ...(((p.highlights as { text: string }[]) ?? []).map((h) => h.text)),
        ...(((p.suggestedPieces as { text: string }[]) ?? []).map((x) => x.text)),
      ];
      for (const t of texts) {
        assert(
          fold(t) !== fold("vous pouvez répéter"),
          `${s.id} shows the formula as one piece: "${t}"`,
        );
      }
    }
  });

  test("the whole formula keeps its identity for ownership and evidence", () => {
    // The split is a SEGMENTATION fix, not a re-ownership. The registered
    // formula is frozen, L10 uses it, and it remains what the screens target —
    // so nothing about acquisition or evidence moved.
    const meet = screensOf(L1).find((s) => s.id === "s17-meet-vous-pouvez-repeter");
    assertEqual(
      meet?.targetItemIds,
      ["chunk-vous-pouvez-repeter"],
      "the formula is still the acquisition identity",
    );
  });
});
