/**
 * L8: three questions with three different jobs, written the way French writes
 * them, and a recap that only claims what it can check.
 *
 * ── THE THREE DEFECTS THIS PASS CLOSES ──────────────────────────────────────
 *
 * SOUND. Twenty learner-facing notes across L0-L10 spelled French in English
 * letters: say-OO, zhay FA(n), ess-kuh. The founder caught them one at a time
 * and each time the answer was to fix that one. They are gone as a class now,
 * and audio is the authority. The teaching stayed: what a note says is the
 * phenomenon (a nasal vowel, a liaison, where the weight falls), which is the
 * part a learner can actually use.
 *
 * WRITING. The founder typed "C'est ou" and read "Correct." They had written a
 * different real word — ou means "or". Cairn taught French by meaning and sound
 * and had nothing to say about orthography, so an accent that changes the word
 * sat at the same level as one that is merely tidy.
 *
 * RECAP. "Pieces you used" sat over a list authored by hand per lesson, which
 * the screen had no way to check and which could not include the earlier French
 * the learner had actually reached for.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import { matchExpected, writingSlip } from "../../components/lesson-v1/screens/normalizeAnswer";
import { learnerVerdict } from "../../components/lesson-v1/screens/verdictCopy";
import { piecesUsedInSession } from "../../content/lesson-v1-evidence/lessonUse";
import type { Lesson, ShowcaseSentence, WeaveScreen } from "../../content/lessonTypes";
import type { LearningEvent } from "../../content/learning-engine/events";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");
const codeOf = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

const L8 = V1_LESSONS.find((l) => l.number === 8)! as Lesson;
const SCREENS = flattenLessonScreens(L8);
const screen = (id: string) => SCREENS.find((s) => s.id === id);
const L8_COPY = JSON.stringify(SCREENS);

/** Every learner-facing depth string in L0-L10. */
function allDepthText(): { lesson: number; fr: string; text: string }[] {
  const out: { lesson: number; fr: string; text: string }[] = [];
  for (const lesson of V1_LESSONS) {
    if (lesson.number < 0 || lesson.number > 10) continue;
    for (const s of flattenLessonScreens(lesson as Lesson)) {
      if (s.type !== "showcase") continue;
      for (const c of (s.payload as { clusters: { sentences: ShowcaseSentence[] }[] }).clusters) {
        for (const sentence of c.sentences) {
          if (!sentence.depth) continue;
          out.push({
            lesson: lesson.number,
            fr: sentence.fr,
            text: Object.values(sentence.depth).filter(Boolean).join(" "),
          });
        }
      }
    }
  }
  return out;
}

// ── §34: sound ──────────────────────────────────────────────────────────────

describe("audio is the authority, not English letters", () => {
  /**
   * A homemade respelling: syllables joined by hyphens with a shouted one, or a
   * nasal marked with a parenthesised consonant. Deliberately narrow — ordinary
   * hyphenated English ("end-of-group", "second-person") and real French
   * hyphens ("Excusez-moi", "est-ce que") must pass untouched.
   */
  const RESPELLING = /\b[a-zà-ÿ]{1,7}(?:-[a-zà-ÿ']{1,7}){1,}\b(?=[^a-zà-ÿ]*[A-Z]{2,})|[A-Z]+\([a-z]\)|\b[a-zà-ÿ]{1,7}-[A-Z]{2,}\b/;

  test("no learner-facing depth note spells French in English letters", () => {
    for (const row of allDepthText()) {
      assert(
        !RESPELLING.test(row.text),
        `L${row.lesson} ${row.fr}: ${row.text.slice(0, 120)}`,
      );
    }
  });

  test("the scanner would still catch the ones that were there", () => {
    // A guard that cannot fail is not a guard. These are the exact strings the
    // audit removed.
    for (const gone of ["say-OO", "zhay FA(n)", "ess-kuh say-t-ee-SEE", "bon-ZHOOR", "kess-tee-O(n)"]) {
      assert(RESPELLING.test(gone), `the scanner would have missed "${gone}"`);
    }
  });

  test("and it does not catch ordinary English or real French hyphens", () => {
    for (const fine of [
      "French leans on the end of the group rather than on a chosen syllable.",
      "Excusez-moi keeps its hyphen in writing.",
      "Est-ce que is written with a hyphen between est and ce.",
      "The silent t in c'est wakes up before ici and carries into it.",
    ]) {
      assert(!RESPELLING.test(fine), `the scanner wrongly flags: ${fine}`);
    }
  });

  test("the sound teaching survived the transcriptions", () => {
    // §4: keep the phenomenon, drop the fake transcription. Every note that
    // had one still says something a learner can act on.
    const notes = allDepthText();
    assert(notes.length >= 20, `only ${notes.length} depth notes remain`);
    const all = notes.map((r) => r.text).join(" ");
    for (const phenomenon of ["nasal", "silent", "liaison|z that nobody wrote", "vowel"]) {
      assert(new RegExp(phenomenon, "i").test(all), `no note teaches ${phenomenon} any more`);
    }
  });

  test("L8's où note is about the vowel, not a spelling of it", () => {
    const row = allDepthText().find((r) => r.lesson === 8 && r.fr === "C'est où ?");
    assert(row !== undefined, "the où line lost its depth");
    assert(!/say-OO/.test(row!.text), "the respelling is back");
    assert(/not.*oh.*not.*ow|Not oh, and not ow/i.test(row!.text), "the useful contrast was lost with it");
  });

  test("the connected-speech point between C'est où ? and C'est ici is reachable", () => {
    // §5. The founder noticed these do not flow alike, and they do not. The
    // note describes what is audible and leaves the rule alone.
    const all = allDepthText().filter((r) => r.lesson === 8).map((r) => r.text).join(" ");
    assert(/Listen to the join/i.test(all), "the contrast is not drawn at all");
    assert(/hear the t link/i.test(all), "and what to listen for is not named");
  });

  test("no note claims où begins with a consonant", () => {
    // THE FACTUAL ERROR THE LAST PASS SHIPPED. It read "the t in c'est only
    // wakes up before a vowel, and où does not start with one". où is /u/: it
    // begins with a vowel, and the sentence was teaching the opposite of the
    // truth while sounding like a rule. The liaison in c'est où ? is variable
    // rather than forbidden, which is exactly why the note now describes what
    // is audible and lets the audio be the authority.
    const everything = JSON.stringify(V1_LESSONS);
    for (const falsehood of [
      "où does not start with one",
      "où does not start with a vowel",
      "où begins with a consonant",
      "only wakes up before a vowel, and où",
    ]) {
      assert(!everything.includes(falsehood), `a lesson claims: "${falsehood}"`);
    }
    // And the true statement about où's vowel is still somewhere reachable.
    assert(/one long vowel|one long oo/i.test(everything), "où's vowel is no longer described at all");
  });
});

// ── §35: writing ────────────────────────────────────────────────────────────

describe("où is not ou", () => {
  test("the slip is detected, and only on the same answer", () => {
    const slip = writingSlip("C'est ou ?", "C'est où ?");
    assert(slip !== null, "writing ou for où goes unnoticed");
    assert(slip!.word === "où", `it reported ${slip!.word}`);
    assert(/accent/i.test(slip!.note), "and the note does not say what to fix");
    // Never a second grader: a different answer is not a writing slip.
    assert(writingSlip("C'est ici.", "C'est où ?") === null, "it must not fire on a wrong answer");
  });

  test("the learner is told, and still accepted", () => {
    const verdict = learnerVerdict("exact", "C'est ou ?", "C'est où ?");
    assert(verdict !== null, "no verdict at all");
    assert(verdict!.text !== "Correct.", "it still says the accent does not matter");
    assert(/Almost/.test(verdict!.text), `it said "${verdict!.text}"`);
    assert(/ou is the word for/i.test(verdict!.text), "and never says what ou means");
    assert(verdict!.approves, "and it must not punish: the French landed");
  });

  test("a correctly written answer is still simply Correct", () => {
    const verdict = learnerVerdict("exact", "C'est où ?", "C'est où ?");
    assert(verdict?.text === "Correct.", `it said "${verdict?.text}"`);
  });

  test("an ordinary missing accent is not treated as a lexical one", () => {
    // The list holds only accents where dropping the mark produces another real
    // French word. "cafe" for "café" is a typo, not a different word, and
    // failing it would punish typing rather than French.
    assert(writingSlip("Je vais au cafe.", "Je vais au café.") === null, "café was tightened");
    assert(writingSlip("Merci beaucoup", "Merci beaucoup") === null, "nothing to report");
  });

  test("a missing question mark is a different class from a wrong accent", () => {
    // §9. Both are writing, and they are not the same error: one drops a
    // convention of the page, the other writes a different word. The screens
    // accept the first as an authored alternative and the Writing note teaches
    // it; only the second reaches the slip path.
    assert(writingSlip("C'est où", "C'est où ?") === null, "punctuation must not use the accent path");
    const ask = screen("s04-weave-ask-where") as WeaveScreen;
    assert(
      matchExpected("C'est où", ask.payload.expectedAnswers, ask.payload.acceptedAlternatives) !== "none",
      "omitting the question mark refuses good French",
    );
  });

  test("the writing notes sit where the learner just typed the thing", () => {
    for (const [id, needle] of [
      ["s04-weave-ask-where", /accent/i],
      ["s13-weave-cut-in-and-ask", /hyphen/i],
      ["s19-weave-ask-it-back", /hyphen/i],
    ] as const) {
      const s = screen(id) as WeaveScreen | undefined;
      assert(s !== undefined, `${id} is gone`);
      const writing = (s!.payload.reveal as { writing?: string }).writing ?? "";
      assert(needle.test(writing), `${id} carries no writing note: "${writing}"`);
    }
  });

  test("L8 is not a spelling course", () => {
    // §33. Writing notes appear on results, never as a rules page up front.
    const writingScreens = SCREENS.filter((s) =>
      JSON.stringify((s.payload as { reveal?: unknown }).reveal ?? {}).includes('"writing"'),
    );
    assert(writingScreens.length <= 4, `${writingScreens.length} screens lecture about writing`);
    for (const s of SCREENS) {
      if (s.type !== "insight-card") continue;
      assert(
        !/hyphen|apostrophe|accent keeps/i.test(JSON.stringify(s.payload)),
        `${s.id} front-loads a writing rules page`,
      );
    }
  });

  test("the canonical written forms keep their marks", () => {
    for (const form of ["Excusez-moi", "Est-ce que", "c'est", "où"]) {
      assert(L8_COPY.includes(form), `L8 lost the canonical form ${form}`);
    }
    assert(!/C'est ne pas ici/.test(L8_COPY), "malformed negation appeared");
    assert(L8_COPY.includes("Ce n'est pas ici"), "and the correct one is still taught");
  });
});

// ── §36: question semantics ─────────────────────────────────────────────────

describe("three questions, three jobs", () => {
  test("the goal card names the jobs, not the materials", () => {
    const goal = screen("s00-goal-ou");
    const body = (goal!.payload as { body: string }).body;
    assert(!/Main pieces/i.test(body), "it is still a materials list");
    assert(/asks for a place/i.test(body), "où's job is not named");
    assert(/yes or no/i.test(body), "the yes/no job is not named");
    assert(/your voice does the asking|voice/i.test(body), "intonation is not named");
  });

  test("the opening thesis matches what the lesson teaches first", () => {
    // §2. It used to open on est-ce que ("one small frame turns almost any
    // sentence into a question") and then teach C'est où ?.
    const showcase = SCREENS.find((s) => s.type === "showcase");
    const intro = (showcase!.payload as { intro: string }).intro;
    assert(!/^.*One small frame turns almost any sentence/.test(intro), "the old thesis is back");
    assert(/Add où/.test(intro), "it does not open on où");
  });

  test("où is taught as asking for a place", () => {
    const card = screen("s02-insight-ou-frozen");
    const body = (card!.payload as { body: string }).body;
    assert(/PLACE|place/.test(body), "où's job is not stated");
    assert(!/Take the question whole/.test(body), "the take-it-whole framing is back");
  });

  test("the choice distinguishes the KIND of answer, not the string", () => {
    // §14/§32. The wrong option must be wrong for a reason about meaning.
    const fill = screen("s18-fill-which-question");
    const options = (fill!.payload as { options: { text: string; trapReason?: string }[] }).options;
    const ou = options.find((o) => /C'est où/.test(o.text));
    assert(ou !== undefined, "the où option is gone");
    assert(/asks for a PLACE/i.test(ou!.trapReason ?? ""), `the reason is generic: "${ou!.trapReason}"`);
    assert(/yes or a no/i.test(ou!.trapReason ?? ""), "and does not name what is wanted instead");
  });

  test("neither question is accepted for the other's job", () => {
    const yesNo = screen("s19-weave-ask-it-back") as WeaveScreen;
    assert(
      matchExpected("C'est où ?", yesNo.payload.expectedAnswers, yesNo.payload.acceptedAlternatives) === "none",
      "a place question passes a yes/no task",
    );
    const place = screen("s04-weave-ask-where") as WeaveScreen;
    assert(
      matchExpected("Est-ce que c'est ici ?", place.payload.expectedAnswers, place.payload.acceptedAlternatives) === "none",
      "a yes/no question passes a place task",
    );
  });

  test("the repair choice names the job and respects true French", () => {
    // §18/§19. "Je ne comprends pas." is real French that answers the
    // situation; it just does not ask for a repeat. The screen used to mark it
    // wrong and then explain that it was true.
    const fill = screen("s15-fill-directions-too-fast");
    const payload = fill!.payload as {
      prompt: string;
      options: { text: string; isCorrect: boolean; trapReason?: string }[];
    };
    assert(/say it again|repeat/i.test(payload.prompt), "the task is still implicit");
    const comprends = payload.options.find((o) => /comprends/.test(o.text))!;
    assert(/Real French/i.test(comprends.trapReason ?? ""), "it is still called simply wrong");
    assert(/not a request/i.test(comprends.trapReason ?? ""), "and the difference is not named");
  });
});

// ── §37: recap ──────────────────────────────────────────────────────────────

describe("the recap says only what it can check", () => {
  const items = ITEM_REGISTRY;
  const event = (over: Partial<LearningEvent>): LearningEvent =>
    ({
      primitive: "production",
      outcome: "correct",
      itemIds: ["chunk-c-est-ou"],
      ...over,
    }) as unknown as LearningEvent;

  test("a landed production counts as use", () => {
    const used = piecesUsedInSession([event({})], items);
    assert(used.length === 1, `got ${used.join(" | ")}`);
  });

  test("passive exposure never does", () => {
    // §21, the whole list. Seeing it, being shown a model, and walking past a
    // screen that declares it are all not using it.
    for (const over of [
      { primitive: "exposure" as const },
      { primitive: "reveal" as const },
      { outcome: "incorrect" as const },
      { outcome: "skipped" as const },
      { outcome: "completed_unassessed" as const },
    ]) {
      assert(
        piecesUsedInSession([event(over)], items).length === 0,
        `${JSON.stringify(over)} was counted as use`,
      );
    }
  });

  test("an accepted alternative counts, because the learner produced it", () => {
    assert(
      piecesUsedInSession([event({ outcome: "acceptable_variant" })], items).length === 1,
      "an accepted answer is not a tolerated miss",
    );
  });

  test("a selection counts, and reused earlier French comes with it", () => {
    // §23. It comes from the events, so it is whatever they actually worked.
    const used = piecesUsedInSession(
      [
        event({ primitive: "selection", itemIds: ["chunk-excusez-moi"] }),
        event({ itemIds: ["chunk-c-est-ou"] }),
      ],
      items,
    );
    assert(used.length === 2, `got ${used.join(" | ")}`);
    assert(used[0] === "excusez-moi", "earlier French must not be filtered out");
  });

  test("it reports first-use order, and never repeats", () => {
    const used = piecesUsedInSession(
      [event({}), event({}), event({ itemIds: ["chunk-merci"] })],
      items,
    );
    assert(used.length === 2, `got ${used.join(" | ")}`);
  });

  test("an unregistered item is dropped, never rendered raw", () => {
    assert(piecesUsedInSession([event({ itemIds: ["not-an-item"] })], items).length === 0, "raw id leaked");
  });

  test("the heading follows the list", () => {
    const recap = codeOf(read("components/lesson-v1/screens/RecapCard.tsx"));
    assert(
      recap.includes('derived ? "Pieces you used" : "The pieces in this one"'),
      "the claim is no longer tied to the derivation",
    );
    // And a learner who landed nothing gets the authored list with the
    // truthful heading, rather than an empty row.
    assert(recap.includes("usedPieces.length > 0"), "an empty derivation must fall back");
  });

  test("it is derived at the wiring layer, and the screen still asks nothing", () => {
    const renderer = codeOf(read("components/lesson-v1/LessonRendererV1.tsx"));
    assert(renderer.includes("piecesUsedInSession(session.state.events"), "the renderer derives it");
    const recap = codeOf(read("components/lesson-v1/screens/RecapCard.tsx"));
    for (const banned of ["session", "snapshot", "useReachedItemIds", "MasterySnapshot"]) {
      assert(!recap.includes(banned), `RecapCard must not reach for ${banned}`);
    }
  });

  test("the derivation is pure", () => {
    const code = codeOf(read("content/lesson-v1-evidence/lessonUse.ts"));
    for (const banned of ["Date.now", "Math.random", "useState", "react", "AsyncStorage", "appendEvent"]) {
      assert(!code.includes(banned), `it must not use ${banned}`);
    }
  });
});

describe("the French on disk is the French the registry knows", () => {
  test("every content file is NFC-normalised", () => {
    // FOUND BY BREAKING IT. An edit in this pass wrote a decomposed "où" into
    // L8 — an o followed by a combining grave. It renders identically and is a
    // different string, so `showcasePieces`, `wholeSentencePiece` and
    // `pieceItemId` would all have failed to recognise the word while the page
    // looked perfectly correct. Grading survived only because `normalize`
    // decomposes anyway, which made the bug invisible from the one direction
    // anyone would have checked.
    const { readdirSync, statSync } = require("node:fs") as typeof import("node:fs");
    const walk = (dir: string): string[] =>
      readdirSync(dir).flatMap((entry) => {
        const full = join(dir, entry);
        return statSync(full).isDirectory() ? walk(full) : full.endsWith(".ts") ? [full] : [];
      });
    const offenders = walk(join(process.cwd(), "content")).filter((file) => {
      const src = readFileSync(file, "utf8");
      return src.normalize("NFC") !== src;
    });
    assert(
      offenders.length === 0,
      `decomposed accents in: ${offenders.map((f) => f.split("/content/")[1]).join(", ")}`,
    );
  });
});

describe("L8's shared surfaces did not regress", () => {
  test("the reveal keeps audio and canonical pieces", () => {
    const reveal = read("components/lesson-v1/screens/NaturalReveal.tsx");
    assert(reveal.includes("say(reveal.modelAnswer as string)"), "audio regressed");
    assert(reveal.includes("showcasePieces(reveal.modelAnswer)"), "model pieces regressed");
    assert(!/text: "Accepted/.test(reveal), "grader language returned");
  });

  test("L8's own reveal goes through it", () => {
    const shared = SCREENS.filter((s) => s.type === "natural-reveal");
    assert(shared.length > 0, "L8 bypasses the shared reveal entirely");
  });

  test("plus lentement stays one piece", () => {
    // §6. Two words, one phrase-level meaning, and nothing in canon says to
    // split it. Not split merely because it is two words.
    const showcase = SCREENS.find((s) => s.type === "showcase");
    const line = (
      (showcase!.payload as { clusters: { sentences: ShowcaseSentence[] }[] }).clusters
    )
      .flatMap((c) => c.sentences)
      .find((s) => s.fr.startsWith("Plus lentement"));
    assert(line !== undefined, "the line is gone");
    assert(
      (line!.pieces ?? []).includes("Plus lentement"),
      `it was split: ${JSON.stringify(line!.pieces)}`,
    );
  });
});
