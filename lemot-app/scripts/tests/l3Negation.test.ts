/**
 * L3 teaches a frame, and the screens have to show one.
 *
 * The founder's report on this lesson was consistent across five separate
 * notes: the app explains negation in prose and the structure disappears
 * visually. ne ... pas is the first thing in this course that is NOT a chunk —
 * two halves that open around a verb, never adjacent, with a different thing
 * inside each time — and every surface that drew it as ordinary prose, or worse
 * as one pill, was teaching the opposite of that.
 */
import { describe, test, assert } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens, reviewSplitFrames } from "../../content/lessons/lessonStructure";
import { knownPieces } from "../../content/lessons/showcasePieces";
import type { InsightCardScreen, Lesson } from "../../content/lessonTypes";

const L3 = V1_LESSONS.find((l) => l.number === 3) as Lesson;
const screens = flattenLessonScreens(L3);
const byId = (id: string) => screens.find((s) => s.id === id);

describe("the negation is drawn, not only described", () => {
  test("the teaching card carries a split frame", () => {
    const card = byId("s01-insight-ne-pas-sandwich") as InsightCardScreen | undefined;
    assert(card !== undefined, "L3 must keep its negation card");
    const framed = (card!.payload.examples ?? []).filter((e) => e.frame);
    assert(
      framed.length >= 2,
      `only ${framed.length} example is drawn as a frame; the card argues in prose otherwise`,
    );
  });

  test("both halves are authored apart, with the verb between them", () => {
    for (const screen of screens) {
      if (screen.type !== "insight-card") continue;
      for (const ex of screen.payload.examples ?? []) {
        if (!ex.frame) continue;
        assert(ex.frame.inside.trim().length > 0, `${screen.id}: a frame must close around something`);
        assert(
          ex.frame.open.trim() !== "" && ex.frame.close.trim() !== "",
          `${screen.id}: both halves must exist`,
        );
        assert(
          !ex.frame.open.includes(ex.frame.close),
          `${screen.id}: the halves must not be one token`,
        );
      }
    }
  });

  test("elision is authored rather than assumed", () => {
    // ce n'est pas is the same move wearing an apostrophe. A renderer that
    // hard-coded "ne" would have to lie about it, so the opening half is a
    // field — and the lesson has to actually use it, or the claim is untested.
    const card = byId("s01-insight-ne-pas-sandwich") as InsightCardScreen;
    const opens = (card.payload.examples ?? []).map((e) => e.frame?.open).filter(Boolean);
    assert(opens.includes("n'"), "L3 must show the elided half somewhere");
    assert(opens.includes("ne"), "and the unelided one beside it");
  });

  test("every drawn frame still is the sentence it claims to be", () => {
    // The structural guard, run here too so a drift in L3 fails a targeted test
    // and not only the corpus-wide validator.
    const findings = reviewSplitFrames(L3);
    assert(findings.length === 0, findings.map((f) => f.message).join("\n"));
  });
});

describe("ne ... pas never becomes a chunk", () => {
  test("no L3 chip, highlight or tray piece carries both halves", () => {
    const offenders: string[] = [];
    for (const screen of screens) {
      const p = screen.payload as Record<string, unknown>;
      const chips = [
        ...(((p.highlights as { text?: string }[]) ?? []).map((h) => h.text ?? "")),
        ...(((p.suggestedPieces as { text?: string }[]) ?? []).map((h) => h.text ?? "")),
      ];
      for (const chip of chips) {
        const f = chip.toLowerCase();
        // "je ne suis pas" and "je ne comprends pas" ARE canonical chunks in the
        // registry and are allowed to be chips; what must never appear is the
        // frame on its own, as though ne...pas travelled together.
        if (/^\s*ne\s*\.\.\.\s*pas\s*$/.test(f) || /^\s*ne\s+pas\s*$/.test(f)) {
          offenders.push(`${screen.id}: "${chip}"`);
        }
      }
    }
    assert(offenders.length === 0, `the frame shown as a travelling piece:\n${offenders.join("\n")}`);
  });
});

describe("the pieces the learner already owns stay visible", () => {
  // Founder finding: ici kept disappearing on surfaces that were showing chunks
  // for everything else in the same sentence.
  const MEET_CARDS_WITH_ICI = ["s00-meet-je-ne-suis-pas-ici", "s03-meet-ce-n-est-pas-ici"];

  for (const id of MEET_CARDS_WITH_ICI) {
    test(`${id} marks ici as its own piece`, () => {
      const screen = byId(id);
      assert(screen !== undefined, `${id} must exist`);
      const highlights = (screen!.payload as { highlights?: { text: string }[] }).highlights ?? [];
      const texts = highlights.map((h) => h.text.toLowerCase());
      assert(
        texts.includes("ici"),
        `${id} highlights ${JSON.stringify(texts)} — ici is left looking like part of the negative`,
      );
    });
  }

  test("a meet card's highlights account for what the registry can segment", () => {
    // The general rule behind the two cases above: if the registry breaks a
    // meet card's sentence into pieces and the card marks some of them, it must
    // not silently drop the rest.
    for (const screen of screens) {
      if (screen.type !== "meet-card") continue;
      const p = screen.payload as { fr: string; highlights?: { text: string }[] };
      const marked = (p.highlights ?? []).map((h) => h.text.toLowerCase());
      if (marked.length === 0) continue;
      const segmented = knownPieces(p.fr).map((x) => x.text.toLowerCase());
      if (segmented.length < 2) continue;
      const missing = segmented.filter((piece) => !marked.includes(piece));
      assert(
        missing.length === 0,
        `${screen.id} marks ${JSON.stringify(marked)} but the registry also sees ${JSON.stringify(missing)}`,
      );
    }
  });
});

describe("the big formula is opened, not memorised whole", () => {
  test("L3 carries a chunk-noticing screen for je ne comprends pas", () => {
    const screen = byId("s17-fill-what-travels");
    assert(screen !== undefined, "the chunk-separation exercise must exist");
    assert(screen!.type === "fill-with-traps", "it reuses an existing family, not a new engine");
  });

  test("it asks what travels, not which word sits in the middle", () => {
    // s02 already asks the fill-the-verb question. Asking it again with a longer
    // word would be the same cognitive operation a second time.
    const screen = byId("s17-fill-what-travels")!;
    const p = screen.payload as { prompt: string; options: { text: string; isCorrect: boolean }[] };
    const correct = p.options.find((o) => o.isCorrect);
    assert(correct !== undefined, "it must have an answer");
    assert(
      /ne\s*\.\.\.\s*pas/.test(correct!.text),
      `the reusable part is the frame, not "${correct!.text}"`,
    );
    const s02 = byId("s02-fill-verb-in-sandwich")!;
    assert(
      (s02.payload as { prompt: string }).prompt !== p.prompt,
      "the two chunk screens must not ask the same question",
    );
  });

  test("the dropped-ne form is not called wrong", () => {
    // "comprends pas" is real spoken French. It is a trap here because it is not
    // a piece you can carry, and the copy has to say that rather than imply the
    // learner would never hear it.
    const screen = byId("s17-fill-what-travels")!;
    const p = screen.payload as { options: { text: string; trapReason?: string }[] };
    const spoken = p.options.find((o) => o.text.toLowerCase().includes("comprends pas"));
    assert(spoken !== undefined, "the spoken form should be one of the choices");
    assert(
      /hear/i.test(spoken!.trapReason ?? ""),
      "the trap must acknowledge that this is really said, not mark it as bad French",
    );
  });
});

describe("the prompt with two honest answers accepts both", () => {
  const sayIt = byId("s09-sayit-not-here")!;
  const payload = sayIt.payload as {
    communicativeGoal: string;
    modelAnswer?: string;
    acceptedAlternatives?: string[];
    hintDirection?: string;
    suggestedPieces?: { text: string }[];
  };

  test("the goal offers two exits", () => {
    assert(
      /\bor\b/.test(payload.communicativeGoal),
      "this screen's whole problem was a goal that names two answers and a reveal that knew one",
    );
  });

  test("je ne comprends pas is an accepted path", () => {
    const accepted = (payload.acceptedAlternatives ?? []).map((a) => a.toLowerCase());
    assert(
      accepted.some((a) => a.includes("je ne comprends pas")),
      `the founder wrote this and was told nothing landed; accepted: ${JSON.stringify(accepted)}`,
    );
  });

  test("acceptance does not claim the answers mean the same thing", () => {
    // Every accepted path must be a real answer to THIS scene. "Non, ce n'est
    // pas ici." is about the place; the question is about the person.
    for (const alt of payload.acceptedAlternatives ?? []) {
      assert(
        !alt.toLowerCase().includes("ce n'est pas"),
        `"${alt}" answers a different question than the one the scene asks`,
      );
    }
  });

  test("the first rung of help contains no French", () => {
    const direction = payload.hintDirection ?? "";
    assert(direction.length > 0, "this screen must author a direction rung");
    for (const piece of payload.suggestedPieces ?? []) {
      assert(
        !direction.toLowerCase().includes(piece.text.toLowerCase()),
        `the direction hands over "${piece.text}" before the learner asks for a piece`,
      );
    }
  });
});
