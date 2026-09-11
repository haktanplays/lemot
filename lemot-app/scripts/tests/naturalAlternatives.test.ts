/**
 * "Other ways" must say why each way exists.
 *
 * The founder read the old surface as a stack of text: alternatives arrived as
 * identical italic lines under one heading, and nothing told a learner when to
 * reach for the second rather than the first. Labels answer that — but only if
 * they stay TRUE. The founder's own constraint was the sharper half of the
 * note: do not use linguistically inaccurate labels just because they sound
 * neat. Street / Polite / Formal belong only where register is really what
 * differs.
 *
 * So this file guards two things that pull against each other: the labelled
 * shape must survive, and it must not spread by imitation into register claims
 * the content does not support.
 */
import { describe, test, assert } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import {
  alternativeFrench,
  alternativeLabel,
  alternativeStrings,
} from "../../content/lessons/naturalAlternatives";
import type { NaturalAlternative } from "../../content/lessonTypes";

type Entry = { id: string; alt: string | NaturalAlternative };

function allAlternatives(lessonNumbers?: number[]): Entry[] {
  const out: Entry[] = [];
  for (const lesson of V1_LESSONS) {
    if (lessonNumbers && !lessonNumbers.includes(lesson.number)) continue;
    for (const screen of flattenLessonScreens(lesson)) {
      const p = screen.payload as Record<string, unknown>;
      const reveal = p.reveal as Record<string, unknown> | undefined;
      for (const list of [p.naturalAlternatives, reveal?.naturalAlternatives]) {
        if (!Array.isArray(list)) continue;
        for (const alt of list as (string | NaturalAlternative)[]) {
          out.push({ id: `${lesson.id}/${screen.id}`, alt });
        }
      }
    }
  }
  return out;
}

describe("the normalizer reads both authored shapes", () => {
  test("a bare string is its own French and carries no label", () => {
    assert(
      alternativeFrench("Un café, s'il vous plaît.") === "Un café, s'il vous plaît.",
      "a string is its own French",
    );
    assert(alternativeLabel("Un café, s'il vous plaît.") === null, "a string has no label");
  });

  test("a labelled variant yields its French and its situation", () => {
    const v = { when: "Quick at the counter", fr: "Un café, s'il vous plaît." };
    assert(alternativeFrench(v) === "Un café, s'il vous plaît.", "fr is the French");
    assert(alternativeLabel(v) === "Quick at the counter", "when is the label");
  });

  test("an empty label is no label, so the renderer draws the quiet line", () => {
    assert(
      alternativeLabel({ when: "", fr: "C'est bon." }) === null,
      "an empty situation is not a heading",
    );
  });

  test("alternativeStrings drops nothing and invents nothing", () => {
    const list = ["A.", { when: "w", fr: "B." }];
    const fr = alternativeStrings(list);
    assert(
      fr.length === 2 && fr[0] === "A." && fr[1] === "B.",
      "both shapes survive the walk, in authored order",
    );
    assert(alternativeStrings(undefined).length === 0, "no list is no alternatives");
  });
});

describe("every authored alternative still reaches the learner", () => {
  const all = allAlternatives();

  test("nothing in the corpus normalizes to an empty sentence", () => {
    const empty = all.filter((e) => alternativeFrench(e.alt).trim().length === 0);
    assert(
      empty.length === 0,
      `these alternatives render as blank lines:\n${empty.map((e) => e.id).join("\n")}`,
    );
  });

  test("the corpus is large enough that this file is reading real content", () => {
    assert(all.length > 40, `only ${all.length} alternatives found — check the walk`);
  });
});

describe("a label names a situation, and only claims register where register differs", () => {
  const labelled = allAlternatives().filter((e) => alternativeLabel(e.alt) !== null);

  test("L1's reveal surfaces carry labels — this is the founder's redesign", () => {
    const l1 = allAlternatives([1]).filter((e) => alternativeLabel(e.alt) !== null);
    assert(
      l1.length >= 4,
      `L1 should carry the labelled variants; found ${l1.length}`,
    );
  });

  test("no two variants on one screen share a label", () => {
    const byScreen = new Map<string, string[]>();
    for (const e of labelled) {
      const list = byScreen.get(e.id) ?? [];
      list.push(alternativeLabel(e.alt) as string);
      byScreen.set(e.id, list);
    }
    for (const [id, labels] of byScreen) {
      assert(
        new Set(labels).size === labels.length,
        `${id}: two variants carry the same label, so the label distinguishes nothing`,
      );
    }
  });

  test("a label is a short heading, not a second explanation", () => {
    for (const e of labelled) {
      const label = alternativeLabel(e.alt) as string;
      const words = label.trim().split(/\s+/).length;
      assert(words <= 6, `${e.id}: "${label}" is a sentence, not a heading`);
      assert(!label.endsWith("."), `${e.id}: "${label}" reads as prose`);
    }
  });

  // The founder's rule, mechanised. These words assert a register, and a
  // register claim is only true when the variants really differ in register —
  // which none of L1's do: they differ in opener and in length. If a future
  // lesson genuinely teaches register, this list is the place to say so
  // deliberately, by naming the screen, not by quietly reaching for the word.
  const REGISTER_WORDS = ["street", "slang", "formal", "informal", "casual", "familiar"];
  const REGISTER_JUSTIFIED: string[] = [];

  test("no variant claims a register the lesson has not taught", () => {
    const claims = labelled.filter((e) => {
      if (REGISTER_JUSTIFIED.includes(e.id)) return false;
      const label = (alternativeLabel(e.alt) as string).toLowerCase();
      return REGISTER_WORDS.some((w) => new RegExp(`\\b${w}\\b`).test(label));
    });
    assert(
      claims.length === 0,
      `a register label must be earned by content that teaches register:\n${claims
        .map((e) => `${e.id}: "${alternativeLabel(e.alt)}"`)
        .join("\n")}`,
    );
  });
});
