/**
 * No Showcase line is flat by accident.
 *
 * The device pass surfaced this as an inconsistency the learner can see in one
 * screen: "J'ai faim." showed its two pieces and "J'ai soif." showed none, with
 * no teaching reason for the difference — the registry simply happened to know
 * one filler and not the other. The learner reads that as "this one is a rule
 * and this one is a word to swallow", which is the opposite of what L4 teaches.
 *
 * These pin the contract rather than the current numbers: every line either
 * shows its seams or states why it does not, and the two can never both be true.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { pieceLabel } from "../../content/lessons/showcasePieces";
import {
  classifyShowcaseSentence,
  reviewShowcaseClassification,
  showcaseSentencesOf,
  shownPieces,
  summarizeShowcaseClassification,
} from "../../content/lessons/showcaseClassification";
import type { ShowcaseSentence } from "../../content/lessonTypes";

const line = (over: Partial<ShowcaseSentence>): ShowcaseSentence => ({
  fr: "Bonjour.",
  en: "Hello.",
  role: "core",
  ...over,
});

describe("every showcase sentence is classified", () => {
  test("zero unclassified across the authored corpus", () => {
    const counts = summarizeShowcaseClassification(V1_LESSONS);
    assertEqual(counts.UNCLASSIFIED, 0, "a flat line with no declared reason is the accident");
  });

  test("the classification validator reports nothing", () => {
    const findings = reviewShowcaseClassification(V1_LESSONS);
    assertEqual(
      findings.length,
      0,
      `showcase classification errors: ${findings.map((f) => `${f.code} ${f.fr}`).join("; ")}`,
    );
  });

  test("every line lands in exactly one of the four classes", () => {
    const legal = new Set([
      "BREAKDOWN_PRESENT",
      "WHOLE_FIRST_FORMULA",
      "INPUT_EXPOSURE",
      "INTENTIONALLY_UNSEGMENTED",
    ]);
    for (const lesson of V1_LESSONS) {
      for (const s of showcaseSentencesOf(lesson)) {
        assert(
          legal.has(classifyShowcaseSentence(s)),
          `${lesson.id} "${s.fr}" is not classified`,
        );
      }
    }
  });
});

describe("the frame-plus-filler lines show their seam", () => {
  // The specific inconsistency the founder saw. These are not decorative
  // assertions: each pair is one lesson making one claim, and the learner can
  // see both lines at once.
  const pairs: [string, string][] = [
    ["J'ai faim.", "J'ai soif."],
    ["J'ai faim.", "J'ai froid."],
  ];
  const all = V1_LESSONS.flatMap((l) => showcaseSentencesOf(l));

  for (const [a, b] of pairs) {
    test(`"${a}" and "${b}" are broken down the same way`, () => {
      const first = all.find((s) => s.fr === a);
      const second = all.find((s) => s.fr === b);
      assert(first !== undefined && second !== undefined, "both lines should be authored");
      assert(
        shownPieces(first!).length >= 2 && shownPieces(second!).length >= 2,
        "one showing its pieces while the other does not is the accidental flatness",
      );
    });
  }
});

describe("the classification rules cannot be satisfied dishonestly", () => {
  test("a flat line with no declaration is an error", () => {
    assertEqual(
      classifyShowcaseSentence(line({ fr: "Zzz." })),
      "UNCLASSIFIED",
      "a line with no pieces and no reason has not been classified",
    );
  });

  test("a declaration that contradicts a real breakdown is an error", () => {
    const findings = reviewShowcaseClassification([
      fakeLesson(line({ fr: "J'ai soif.", pieces: ["J'ai", "soif"], flat: "formula" })),
    ]);
    assert(
      findings.some((f) => f.code === "SC-002"),
      "a stale flat label must not outlive the breakdown appearing",
    );
  });

  test("authored pieces must rebuild the sentence", () => {
    const findings = reviewShowcaseClassification([
      fakeLesson(line({ fr: "J'ai soif.", pieces: ["J'ai", "faim"] })),
    ]);
    assert(findings.some((f) => f.code === "SC-003"), "invented pieces must be caught");
  });

  test("a one-piece authored breakdown is not a breakdown", () => {
    const findings = reviewShowcaseClassification([
      fakeLesson(line({ fr: "Bonjour.", pieces: ["Bonjour"] })),
    ]);
    assert(findings.some((f) => f.code === "SC-004"), "one chip teaches nothing");
  });

  test("exposure is a claim about the line, not a way out", () => {
    const findings = reviewShowcaseClassification([
      fakeLesson(line({ fr: "Zzz.", role: "core", flat: "exposure" })),
    ]);
    assert(
      findings.some((f) => f.code === "SC-005"),
      "a core line cannot be excused as exposure",
    );
  });
});

describe("a chip is written as a fragment, not as a sentence", () => {
  test("the sentence-initial capital does not survive onto the chip", () => {
    assertEqual(pieceLabel("Je suis"), "je suis", "a chip is not the start of a sentence");
    assertEqual(pieceLabel("Bonjour"), "bonjour", "the lone capitalised item follows the same rule");
  });

  test("an interior capital is left alone", () => {
    assertEqual(pieceLabel("un McDo"), "un McDo", "lowercasing a name would be a spelling error");
  });

  test("the same French never appears in two cases in one lesson", () => {
    for (const lesson of V1_LESSONS) {
      const seen = new Map<string, string>();
      for (const s of showcaseSentencesOf(lesson)) {
        for (const raw of shownPieces(s)) {
          const label = pieceLabel(raw);
          const key = label.toLowerCase();
          const prior = seen.get(key);
          assert(
            prior === undefined || prior === label,
            `${lesson.id} writes the same piece two ways: "${prior}" and "${label}"`,
          );
          seen.set(key, label);
        }
      }
    }
  });
});

function fakeLesson(sentence: ShowcaseSentence) {
  return {
    id: "test-lesson",
    screens: [
      {
        id: "s1",
        type: "showcase",
        payload: { intro: "x", clusters: [{ label: "c", sentences: [sentence] }] },
      },
    ],
  } as unknown as (typeof V1_LESSONS)[number];
}
