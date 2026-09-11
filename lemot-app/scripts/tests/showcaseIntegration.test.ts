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
 * L1/L2 would empty the lesson that teaches them. What is guarded instead is
 * the class the founder actually pointed at: a line the lesson calls its own
 * (core or supported) that no screen anywhere ever works.
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
