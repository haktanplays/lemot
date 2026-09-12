/**
 * Mon Lexique as a record of where the learner has been.
 *
 * The founder's words: it reads as "a tab containing French entries" rather
 * than "my French accumulating". Orientation now promises that the French you
 * meet and use is kept here, and a promise made on a card has to be redeemed
 * at the destination.
 *
 * The danger in redeeming it is invention. Every field that makes a surface
 * feel personal — where you met it, what you have seen it in, what it travels
 * with — is a claim about the learner's own history, and a wrong one is worse
 * than an empty section. So these rules are almost entirely about provenance:
 * authored or state-derived, reach-bounded, and never rounded up into mastery.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import { sentencesForPiece } from "../../content/learning-engine/pieceSentences";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");

/**
 * Source with its comments removed.
 *
 * Every rule below is about what the CODE does — what it renders, what it
 * writes, what it reaches for. Scanning raw source made two of them fail on
 * the doc comments that state the rule: pieceSentences says it reads no
 * snapshot, and the detail says it deliberately does not render dueAt. A guard
 * that cannot tell a prohibition from a violation is worse than no guard.
 */
const codeOf = (src: string): string =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");
const L1 = V1_LESSONS.find((l) => l.number === 1)!;
const L2 = V1_LESSONS.find((l) => l.number === 2)!;
const reachedL1 = new Set([L1.id]);

describe("a piece shows sentences it really appeared in", () => {
  test("a reached lesson yields real sentences", () => {
    const found = sentencesForPiece("je voudrais", reachedL1);
    assert(found.length > 0, "je voudrais is all over L1 and must find something");
    for (const s of found) {
      assert(
        s.fr.toLowerCase().includes("je voudrais"),
        `"${s.fr}" does not contain the piece it is shown under`,
      );
      assert(s.lessonId === L1.id, "a reached-L1 query must not return other lessons");
      assert(s.en.length > 0, "a sentence without its meaning is a flashcard, not a memory");
    }
  });

  test("nothing is returned before the learner has been anywhere", () => {
    assert(
      sentencesForPiece("je voudrais", new Set()).length === 0,
      "an empty footprint must show an empty record, not the curriculum",
    );
  });

  test("a lesson the learner has not opened is not previewed", () => {
    // je suis is L2's engine. A learner who has only reached L1 must not see
    // L2's sentences through it, however well the string matches.
    const found = sentencesForPiece("je suis", reachedL1);
    for (const s of found) {
      assert(s.lessonId !== L2.id, `L2's "${s.fr}" leaked to a learner who has not reached it`);
    }
  });

  test("the piece alone is not shown back as a sentence", () => {
    // "Bonjour." under the piece "Bonjour" is the piece again, not a place it
    // has been.
    const found = sentencesForPiece("bonjour", reachedL1);
    for (const s of found) {
      const bare = s.fr.toLowerCase().replace(/[.!?,;:]/g, "").trim();
      assert(bare !== "bonjour", "a sentence identical to the piece teaches nothing");
    }
  });

  test("matching is exact, never fuzzy", () => {
    // A near-miss would attach the learner's memory to a sentence they never
    // saw, which is the precise failure this surface cannot afford.
    assert(sentencesForPiece("je voudrai", reachedL1).every((s) => s.fr.toLowerCase().includes("je voudrai")), "substring match only");
    assert(sentencesForPiece("qqq zzz", reachedL1).length === 0, "nonsense matches nothing");
    assert(sentencesForPiece("", reachedL1).length === 0, "empty matches nothing");
  });

  test("the list stays short enough to read", () => {
    // A record, not a concordance. "je voudrais" appears many times in L1.
    assert(sentencesForPiece("je voudrais", reachedL1).length <= 3, "at most three");
  });

  test("it reads no clock, no storage and no snapshot", () => {
    const src = codeOf(read("content/learning-engine/pieceSentences.ts"));
    for (const impurity of ["Date.now", "kvStorage", "snapshot", "mastery", "await"]) {
      assert(!src.includes(impurity), `the resolver must not reach for ${impurity}`);
    }
  });
});

describe("nothing here improves what the learner owns", () => {
  const route = codeOf(read("app/(tabs)/mon-lexique.tsx"));
  const detail = codeOf(read("components/learning-engine/MonLexiqueEntryDetail.tsx"));

  test("opening the tab records nothing", () => {
    // §3: opening Mon Lexique does not improve mastery, and viewing a detail is
    // not practice. The route reads a snapshot and never writes one.
    for (const write of ["recordEvent", "appendEvent", "writeMastery", "emit(", "submitAttempt"]) {
      assert(!route.includes(write), `the route must not ${write}`);
    }
  });

  test("the detail records nothing either", () => {
    for (const write of ["recordEvent", "appendEvent", "writeMastery", "emit(", "submitAttempt"]) {
      assert(!detail.includes(write), `the detail must not ${write}`);
    }
  });

  test("the arrival tip is the only thing that writes, and it writes one flag", () => {
    assert(route.includes("markLexiqueIntroSeen"), "the tip must persist its dismissal");
    // A tip that marks itself seen on RENDER has not been seen — it can be
    // recorded while the learner is still looking at the loading state.
    const dismiss = route.slice(route.indexOf("const dismissIntro"), route.indexOf("const dismissIntro") + 200);
    assert(dismiss.includes("markLexiqueIntroSeen()"), "written on dismissal");
    assert(
      !/useEffect\([^)]*markLexiqueIntroSeen/.test(route),
      "the flag must not be written by an effect on mount",
    );
  });

  test("no stronger claim than the four bands is introduced", () => {
    // The band vocabulary already exists and is the whole learner-facing
    // truth about where a piece stands. This pass must not invent a fifth.
    for (const overclaim of ["Mastered", "You know this", "Fluent", "Fully learned", "forever"]) {
      assert(!detail.includes(overclaim), `the detail claims "${overclaim}"`);
      assert(!route.includes(overclaim), `the route claims "${overclaim}"`);
    }
  });

  test("no counters reach the learner", () => {
    // §6: a memory, not telemetry. The detail may say where and what, never
    // how many.
    for (const counter of ["seenCount", "productionAttempts", "recognitionSuccess", "leitnerBox", "dueAt"]) {
      assert(!detail.includes(counter), `the detail renders the raw field ${counter}`);
    }
  });
});

describe("empty sections do not exist", () => {
  const detail = codeOf(read("components/learning-engine/MonLexiqueEntryDetail.tsx"));

  test("the sentence section is omitted rather than emptied", () => {
    // §16: prefer omission. A learner three pieces in should see a short card
    // that grows, not headings with nothing under them.
    assert(
      /\(sentences \?\? \[\]\)\.length > 0 && \(/.test(detail),
      "the heading must be inside the guard, not beside it",
    );
    for (const emptyState of ["No sentences yet", "Used 0", "Nothing here"]) {
      assert(!detail.includes(emptyState), `the detail announces emptiness with "${emptyState}"`);
    }
  });

  test("the arrival tip waits until there is something to point at", () => {
    const route = codeOf(read("app/(tabs)/mon-lexique.tsx"));
    assert(
      /showIntro && entries\.length > 0/.test(route),
      "a tip above an empty list explains a room with nothing in it",
    );
  });
});

describe("Mon Lexique speaks the lesson's visual language", () => {
  test("sentences are set in the shared French style", () => {
    // §13: the learner should recognise the pink box from the lesson as this
    // thing. A second French typography here would be a second product.
    const detail = codeOf(read("components/learning-engine/MonLexiqueEntryDetail.tsx"));
    assert(detail.includes("frenchSerif("), "French here uses the shared serif style");
  });
});
