/**
 * A Showcase sentence is the lesson's sentence bank, not its wallpaper.
 *
 * The founder's finding: Showcase lines are shown and then, often, never
 * required again in any learner action — which makes them decorative and
 * forgettable. The rule this file holds is his: a sentence may repeat, but the
 * learner OPERATION should change.
 *
 * It deliberately does not enforce "every line is used". Exposure lines exist
 * to enlarge the French world and may never be a graded answer, and several
 * L1/L2 lines are forward seeds a later lesson owns as an acquisition demand —
 * Ça va is L17's, Comment ça va is L18's, ne ... pas is L3's. Wiring those into
 * L1/L2 as PRODUCTION would empty the lesson that teaches them.
 *
 * But the founder's follow-up corrected the lens this file first used, and the
 * correction is the important part: future ownership justifies not demanding
 * production yet. It does not justify pure display. A forward seed may still be
 * recognised, chosen, contrasted or read inside the lesson that shows it, and
 * "L17 owns it" is not on its own a reason for a sentence to sit in a gallery.
 *
 * So there are two rules here, not one. A line a lesson calls its OWN must be
 * worked somewhere in the corpus. And a lesson's Showcase as a whole must
 * participate in its own lesson: the count of lines that never appear on any
 * screen of the lesson that shows them is capped, per lesson, at a number
 * recorded below with the reason each survivor is still display-only.
 */
import { describe, test, assert } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import type { Lesson, ShowcaseScreen, ShowcaseSentence } from "../../content/lessonTypes";

const fold = (s: string) =>
  s.normalize("NFC").toLowerCase().replace(/[.!?,;:«»"'’]/g, " ").replace(/\s+/g, " ").trim();

/** Every string a screen carries, with the field that carried it. */
function strings(v: unknown, key = "", out: [string, string][] = []): [string, string][] {
  if (typeof v === "string") { out.push([key, v]); return out; }
  if (Array.isArray(v)) { for (const x of v) strings(x, key, out); return out; }
  if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) strings(x, k, out);
  return out;
}

/**
 * What a screen puts in front of the learner, INCLUDING what it composes.
 *
 * A pattern reel stores its stem once and its complements as bare rows, so a
 * plain string walk sees "Je suis" and "fatigué" and never the sentence the
 * learner actually reads. That made the participation scan report two lines as
 * untouched gallery pieces when the reel shows both. Reassembling here is the
 * difference between measuring the data and measuring the screen.
 */
function rendered(screen: { type: string; payload: unknown }): string[] {
  const out = strings(screen.payload).map(([, v]) => v);
  const p = screen.payload as { stem?: string; rows?: { fr?: string }[] };
  if (screen.type === "pattern-reel" && typeof p.stem === "string") {
    for (const row of p.rows ?? []) {
      if (typeof row.fr === "string") out.push(`${p.stem} ${row.fr}`);
    }
  }
  return out;
}

/**
 * Fields where a sentence's presence means the learner DID something with it:
 * produced it, was offered it as a choice, completed it, or had it modelled
 * back after an attempt. Prose about a sentence is not a use of it, which is
 * the distinction the whole finding turns on.
 */
const OPERATIVE = new Set([
  "expectedAnswers", "acceptedAlternatives", "modelAnswer", "modelAnswers",
  "text", "hintCloze", "sentenceBefore", "sentenceAfter", "fr", "answers",
]);

function showcaseOf(lesson: Lesson): ShowcaseSentence[] {
  const out: ShowcaseSentence[] = [];
  for (const screen of lesson.screens) {
    if (screen.type !== "showcase") continue;
    for (const cluster of (screen as ShowcaseScreen).payload.clusters) out.push(...cluster.sentences);
  }
  return out;
}

/** Screens anywhere in the corpus that operate on this sentence. */
function operations(fr: string): string[] {
  const key = fold(fr);
  const out: string[] = [];
  if (key.length < 3) return out;
  for (const lesson of V1_LESSONS) {
    for (const screen of flattenLessonScreens(lesson)) {
      if (screen.type === "showcase") continue;
      const hits = strings(screen.payload).filter(([, v]) => fold(v).includes(key));
      if (hits.some(([k]) => OPERATIVE.has(k))) out.push(`L${lesson.number}/${screen.id}`);
    }
  }
  return out;
}

describe("what a lesson calls its own, it uses", () => {
  for (const number of [1, 2]) {
    const lesson = V1_LESSONS.find((l) => l.number === number);

    test(`L${number} owns Showcase lines and works every one of them`, () => {
      assert(lesson !== undefined, `L${number} must exist`);
      const owned = showcaseOf(lesson!).filter((s) => s.role === "core" || s.role === "supported");
      assert(owned.length >= 6, `L${number} declares only ${owned.length} core/supported lines`);
      const dead = owned.filter((s) => operations(s.fr).length === 0);
      assert(
        dead.length === 0,
        `L${number} shows these as its own and never asks the learner to do anything with them:\n${dead
          .map((s) => `  "${s.fr}"`)
          .join("\n")}`,
      );
    });
  }
});

describe("a repeated sentence changes the learner's job", () => {
  // The founder's bad case, stated precisely: the same sentence appearing in
  // three static cards is not repetition with a purpose. A sentence worked four
  // or more times must reach at least two DIFFERENT screen families, so the
  // repetition is a progression rather than the same card again.
  const FAMILY_OF_SCREEN = (t: string) => t;

  for (const number of [1, 2]) {
    test(`L${number} does not drill one sentence through one kind of screen`, () => {
      const lesson = V1_LESSONS.find((l) => l.number === number)!;
      const offenders: string[] = [];
      for (const s of showcaseOf(lesson).filter((x) => x.role === "core" || x.role === "supported")) {
        const key = fold(s.fr);
        const families = new Set<string>();
        let worked = 0;
        for (const screen of flattenLessonScreens(lesson)) {
          if (screen.type === "showcase") continue;
          const hits = strings(screen.payload).filter(([, v]) => fold(v).includes(key));
          if (!hits.some(([k]) => OPERATIVE.has(k))) continue;
          worked += 1;
          families.add(FAMILY_OF_SCREEN(screen.type));
        }
        if (worked >= 4 && families.size < 2) offenders.push(`"${s.fr}" worked ${worked}x in only ${[...families]}`);
      }
      assert(offenders.length === 0, `same operation, repeated:\n${offenders.join("\n")}`);
    });
  }
});

describe("ne ... pas is shown as a frame, never as one piece", () => {
  // L2 now shows the negation so the learner recognises it before L3 builds it.
  // The one way to show it wrongly is as a single chip beside "je suis", which
  // would have the learner storing a fourth memorised block instead of seeing
  // that two halves open around a verb.
  const L2 = V1_LESSONS.find((l) => l.number === 2)!;

  test("no L2 chip, highlight or tray piece carries the whole negative", () => {
    const offenders: string[] = [];
    for (const screen of flattenLessonScreens(L2)) {
      const p = screen.payload as Record<string, unknown>;
      const chips = [
        ...(((p.highlights as { text?: string }[]) ?? []).map((h) => h.text ?? "")),
        ...(((p.suggestedPieces as { text?: string }[]) ?? []).map((h) => h.text ?? "")),
        ...(((p.constitutivePieces as { text?: string }[]) ?? []).map((h) => h.text ?? "")),
      ];
      for (const chip of chips) {
        const f = fold(chip);
        if (f.includes("ne ") && f.includes("pas")) offenders.push(`${screen.id}: "${chip}"`);
      }
    }
    assert(offenders.length === 0, `negation shown as a contiguous chunk:\n${offenders.join("\n")}`);
  });

  test("L2 shows the frame opening around the verb", () => {
    const card = flattenLessonScreens(L2).find((s) => s.id === "s27-insight-not-yet");
    assert(card !== undefined, "L2 must carry the negation recognition card");
    const text = JSON.stringify(card!.payload);
    assert(text.includes("Je ne suis pas prêt."), "the negative of the readiness line must be shown");
    assert(text.includes("Je suis prêt."), "the affirmative must be shown beside it");
    assert(/ne \[ suis \] pas/.test(text), "the split frame must be drawn, not only described");
  });

  test("L2 does not claim the negation as a target", () => {
    // L3 demands chunk-je-ne-suis-pas and teaches it across seven screens.
    // Recognition here must not start emitting evidence for it.
    for (const screen of flattenLessonScreens(L2)) {
      const ids = [
        ...((screen as { targetItemIds?: string[] }).targetItemIds ?? []),
        ...((screen as { evidenceTargetItemIds?: string[] }).evidenceTargetItemIds ?? []),
      ];
      assert(
        !ids.includes("chunk-je-ne-suis-pas"),
        `${screen.id} claims the negation L3 teaches`,
      );
    }
  });
});

describe("L2 stopped calling je suis the learner's first engine", () => {
  // It is the second. je voudrais was reusable, was transferred to a word
  // nobody taught, and the learner did that two lessons ago.
  const L2 = V1_LESSONS.find((l) => l.number === 2)!;

  test("no L2 copy claims a first engine", () => {
    for (const screen of flattenLessonScreens(L2)) {
      const text = JSON.stringify(screen.payload).toLowerCase();
      assert(
        !/first (french )?(sentence )?engine/.test(text),
        `${screen.id} still calls je suis the learner's first engine`,
      );
    }
  });

  test("the goal card names the shape the learner already carries", () => {
    const goal = flattenLessonScreens(L2).find((s) => s.id === "s00-goal-etre")!;
    assert(
      JSON.stringify(goal.payload).includes("Je voudrais"),
      "L2 should open by connecting to the engine the learner already has",
    );
  });
});

describe("the je suis reveal shows whole complements", () => {
  const reel = V1_LESSONS.find((l) => l.number === 2)!.screens.find(
    (s) => s.id === "s25-reel-je-suis-pattern",
  );

  test("the reel exists and pins the engine", () => {
    assert(reel !== undefined, "L2 must carry the je suis Engine Reveal");
    assert(
      (reel!.payload as { stem?: string }).stem === "Je suis",
      "the stem is what must stay still",
    );
  });

  test("it rotates states, not a grammar chart", () => {
    const rows = (reel!.payload as { rows: { fr: string }[] }).rows;
    assert(rows.length >= 5, `a reel of ${rows.length} rows is a list, not a pattern`);
    // "en retard" is two words and still one complement; what must not appear is
    // a row that is a bare article-less noun or a second verb, which would model
    // a plug-and-play grammar French does not have.
    for (const row of rows) {
      assert(!/^je\b/i.test(row.fr), `"${row.fr}" repeats the stem`);
      assert(row.fr.trim().length > 0, "a reel row must carry something");
    }
  });

  test("it grades nothing and claims nothing", () => {
    assert(
      (reel as { targetItemIds?: unknown }).targetItemIds === undefined,
      "the reveal is a showcase surface: it must not claim targets",
    );
  });

  test("it lands after the learner has already used the shape", () => {
    // "Look what you just learned", not "here is the answer before you try".
    const order = flattenLessonScreens(V1_LESSONS.find((l) => l.number === 2)!).map((s) => s.id);
    const at = order.indexOf("s25-reel-je-suis-pattern");
    const productionsBefore = flattenLessonScreens(V1_LESSONS.find((l) => l.number === 2)!)
      .slice(0, at)
      .filter((s) => s.type === "weave" || s.type === "say-it-your-way").length;
    assert(
      productionsBefore >= 3,
      `the reveal arrives after only ${productionsBefore} productions — it should crystallize, not pre-empt`,
    );
  });
});

describe("ça va is one reusable piece, shown as one", () => {
  const L2 = V1_LESSONS.find((l) => l.number === 2)!;
  const lines = showcaseOf(L2);
  const bare = lines.find((l) => l.fr === "Ça va.");
  const longer = lines.find((l) => l.fr.startsWith("Ça va bien"));

  test("both lines are present, so the learner meets the piece twice", () => {
    assert(bare !== undefined, "L2 must show the bare check-in");
    assert(longer !== undefined, "L2 must show it inside a longer sentence");
  });

  test("the longer line shows Ça va as its own piece", () => {
    const pieces = longer!.pieces ?? [];
    assert(pieces.includes("Ça va"), `Ça va must be a visible piece, got ${JSON.stringify(pieces)}`);
  });

  test("nothing splits the inside of ça va", () => {
    // The founder's constraint: show it as a reusable chunk, and do not invent
    // a seam between ça and va. The pieces of the longer line must never name
    // either half on its own.
    for (const line of lines) {
      for (const piece of line.pieces ?? []) {
        const f = fold(piece);
        assert(f !== "ça" && f !== "va", `"${line.fr}" splits ça va into "${piece}"`);
      }
    }
  });

  test("the bare line says in words what it cannot show in chips", () => {
    // A one-unit sentence has no breakdown to render — showcasePieces refuses a
    // single-piece list on purpose, because a lone chip under its own sentence
    // is noise. So the gap the founder saw (a piece here, nothing there) closes
    // in the depth note rather than by faking a split.
    assert(bare!.flat === "formula", "ça va is one thing; the flat reason must say so");
    const structure = bare!.depth?.structure ?? "";
    assert(
      /one piece|whole/i.test(structure),
      "the bare line must name ça va as a reusable whole",
    );
  });
});

// ── WITHIN-LESSON PARTICIPATION ─────────────────────────────────────────────

/**
 * How many Showcase lines a lesson is allowed to show and never touch, and why
 * each survivor is display-only.
 *
 * This is a ratchet, not a budget to spend. It exists so the next pass has to
 * look at the list rather than quietly adding a tenth gallery line, and every
 * number here should only ever go down.
 */
const DISPLAY_ONLY_ALLOWANCE: Readonly<Record<number, { max: number; why: string }>> = {
  // Bonjour madame / Bonjour monsieur: the addressed greeting. L1 teaches the
  // bare Bonjour and the choice between openers; adding a third variable
  // (whom you are addressing) to that choice would blur the one it makes.
  // Pardon ?: a correct repair that is never WRONG beside "Vous pouvez
  // répéter ?", so it cannot be a trap, and a screen where every option is
  // right teaches nothing.
  // Je ne parle pas très bien français: negation plus a verb, both beyond L1.
  // It is on the Showcase because it is the one sentence that buys a beginner
  // patience from a stranger, and recognising it is the whole point.
  // Au revoir: leaving is L6's lesson, whose own insight card is called
  // "bonjour to au revoir". L1 is the arriving half of that arc on purpose.
  1: { max: 5, why: "addressed greetings, an un-trappable repair, one sentence two lessons out of reach, and the goodbye L6 is built around" },
  // Je suis là: a near-synonym of the anchor sentence. Teaching the là/ici
  // distinction is a real lesson and it is not this one.
  // Vous êtes là ?: the same distinction, incoming.
  // Une minute, s'il vous plaît: not a je suis sentence at all; it belongs to
  // the lesson that teaches asking someone to wait.
  // Je suis fatigué / Je suis content: L17 demands both and meets them together
  // as a pair. They ride the reel here, which is a real appearance, but the
  // reel holds stem and complement separately so this scan cannot see them.
  2: { max: 3, why: "the là/ici distinction and one line that is not a je suis sentence at all" },
};

describe("a Showcase participates in its own lesson", () => {
  for (const number of [1, 2]) {
    test(`L${number} keeps its gallery inside the recorded allowance`, () => {
      const lesson = V1_LESSONS.find((l) => l.number === number)!;
      const own = flattenLessonScreens(lesson);
      const untouched = showcaseOf(lesson).filter((line) => {
        const key = fold(line.fr);
        return !own.some(
          (screen) =>
            screen.type !== "showcase" &&
            rendered(screen).some((v) => fold(v).includes(key)),
        );
      });
      const { max, why } = DISPLAY_ONLY_ALLOWANCE[number];
      assert(
        untouched.length <= max,
        `L${number} shows ${untouched.length} lines it never touches (allowed ${max}: ${why}):\n${untouched
          .map((l) => `  "${l.fr}"`)
          .join("\n")}`,
      );
    });
  }
});

describe("the anchor sentence is not the wallpaper", () => {
  // L2's whole risk is that one sentence IS the lesson. It was on 17 of 20
  // screens; the founder read that as monotony even where the operations
  // differed, and he is right that a learner experiences the surface before
  // they experience the taxonomy.
  //
  // Deliberately a ratio and not an exact count, so a future pass can add or
  // move screens without editing this, and deliberately not zero-tolerance:
  // je suis ici is the anchor and every appearance left has a job named in the
  // batch report.
  test("Je suis ici carries at most three quarters of L2's screens", () => {
    const L2 = V1_LESSONS.find((l) => l.number === 2)!;
    const screens = flattenLessonScreens(L2);
    const key = fold("je suis ici");
    const carrying = screens.filter((s) =>
      strings(s.payload).some(([, v]) => fold(v).includes(key)),
    );
    const ratio = carrying.length / screens.length;
    assert(
      ratio <= 0.75,
      `Je suis ici is on ${carrying.length} of ${screens.length} L2 screens:\n${carrying
        .map((s) => `  ${s.id}`)
        .join("\n")}`,
    );
  });

  test("L2 asks for more than one thing", () => {
    // The other half: reducing the surface must not come from deleting
    // productions. L2 still has to make the learner produce.
    const L2 = V1_LESSONS.find((l) => l.number === 2)!;
    const productions = flattenLessonScreens(L2).filter(
      (s) => s.type === "weave" || s.type === "say-it-your-way",
    );
    assert(productions.length >= 4, `L2 produces only ${productions.length} times`);
  });
});
