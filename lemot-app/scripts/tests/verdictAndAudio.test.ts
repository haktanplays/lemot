/**
 * What the learner is told, and whether they can hear the answer.
 *
 * Two founder findings from the same screen. They wrote
 *
 *   Je ne comprends pas, vous pouvez répéter
 *
 * against a model of
 *
 *   Je ne comprends pas. Vous pouvez répéter ?
 *
 * and were told "Accepted." That is a validation library speaking, and it is
 * also wrong: nothing there was tolerated. The only differences were a comma
 * for a full stop and a missing question mark.
 *
 * And the model itself was only readable. It is the one line on the screen that
 * carries pronunciation, rhythm, linking and the shape of a whole utterance,
 * and the learner could not hear it.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { learnerVerdict, canonicallyEquivalent } from "../../components/lesson-v1/screens/verdictCopy";
import { matchExpected } from "../../components/lesson-v1/screens/normalizeAnswer";
import { V1_LESSONS } from "../../content/lessons/v1";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");

/** Every authored model answer in the shipped v1 lessons. */
function allModelAnswers(): string[] {
  const out: string[] = [];
  const walk = (node: unknown): void => {
    if (Array.isArray(node)) {
      for (const child of node) walk(child);
      return;
    }
    if (node === null || typeof node !== "object") return;
    const record = node as Record<string, unknown>;
    if (typeof record.modelAnswer === "string") out.push(record.modelAnswer);
    for (const value of Object.values(record)) walk(value);
  };
  walk(V1_LESSONS);
  return out;
}
const codeOf = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

/** The founder's exact answer and model, kept as a fixture. */
const L6_MODEL = "Je ne comprends pas. Vous pouvez répéter ?";
const L6_ANSWER = "Je ne comprends pas, vous pouvez répéter";

describe("the founder's repair answer reads as Correct", () => {
  test("it differs from the model only in orthography", () => {
    assert(
      canonicallyEquivalent(L6_ANSWER, L6_MODEL),
      "a comma for a full stop and a missing question mark is not a different sentence",
    );
  });

  test("and the screen says so", () => {
    const verdict = learnerVerdict("alternative", L6_ANSWER, L6_MODEL);
    assert(verdict !== null, "an accepted answer must get a verdict");
    assert(verdict!.text === "Correct.", `it said "${verdict!.text}"`);
    assert(verdict!.approves, "and it reads as approval");
  });

  test("the grader is untouched: it still does not accept this on its own", () => {
    // The projection decides what to CALL something already accepted. It must
    // never be what admits an answer — otherwise "?" quietly stops mattering
    // and L8, which teaches that C'est ici. and C'est ici ? differ only by the
    // voice, loses the distinction it spends a lesson on.
    assert(
      matchExpected(L6_ANSWER, [L6_MODEL]) === "none",
      "without an authored alternative the matcher must still refuse it",
    );
  });
});

describe("Correct and That works mean different things", () => {
  test("an exact answer is Correct", () => {
    const v = learnerVerdict("exact", "Merci.", "Merci.");
    assert(v?.text === "Correct.", `exact said "${v?.text}"`);
  });

  test("capitalisation alone is Correct", () => {
    const v = learnerVerdict("alternative", "merci", "Merci.");
    assert(v?.text === "Correct.", `case-only said "${v?.text}"`);
  });

  test("a genuinely different authored answer is not called Correct", () => {
    // "Au revoir." against a model of "Merci, au revoir." is a different
    // sentence the author allowed. Calling it Correct would tell the learner
    // they wrote the model, which they did not.
    const v = learnerVerdict("alternative", "Au revoir.", "Merci, au revoir.");
    assert(v?.text === "That works.", `alternate said "${v?.text}"`);
    assert(v?.approves, "it is still approval, just not identity");
  });

  test("nothing unaccepted gets a verdict at all", () => {
    // "Not accepted" is not a verdict. The compare-with-the-model path owns
    // that, and it deliberately asserts nothing about what was written.
    assert(learnerVerdict("none", "qqq", "Merci.") === null, "a refused answer gets no verdict");
    assert(
      learnerVerdict("alternative", "Au revoir.", null)?.text === "That works.",
      "with no model to compare against, an accepted answer is another way, not identity",
    );
  });

  test("an empty answer is never canonically equivalent to anything", () => {
    assert(!canonicallyEquivalent("", "Merci."), "empty must not fold into a match");
    assert(!canonicallyEquivalent("   ", "Merci."), "nor whitespace");
  });

  test("the projection never loosens meaning-bearing differences", () => {
    // Different words are different answers, however similar.
    assert(!canonicallyEquivalent("Je suis ici.", "Je suis prêt."), "different words");
    assert(!canonicallyEquivalent("un café", "une café"), "a different little word");
  });
});

describe("only acceptance is projected; everything else keeps its own words", () => {
  test("partial does not become Correct", () => {
    // §16: differentiated feedback survives. `partial` is a real verdict about
    // what was found, and the projection has no opinion on it — it only ever
    // sees `exact` and `alternative`, so a partial answer cannot be promoted
    // into approval by the copy layer.
    const weave = codeOf(read("components/lesson-v1/screens/Weave.tsx"));
    const table = weave.slice(weave.indexOf("const VERDICT_NOTES"), weave.indexOf("export function Weave"));
    assert(table.includes("Part of it is there."), "the partial line is still authored");
    assert(
      /partial: \{ text: "Part of it is there/.test(table),
      "and it is still what a partial answer reads",
    );
    for (const verdict of ["mismatch", "unknown", "empty"]) {
      assert(
        new RegExp(`${verdict}: \\{ text: "Compare with the model`).test(table),
        `${verdict} still asserts nothing about the answer`,
      );
    }
  });

  test("the projection is reached only on an accepted answer", () => {
    const weave = codeOf(read("components/lesson-v1/screens/Weave.tsx"));
    assert(
      weave.includes('match === "alternative" && spoken !== null'),
      "an unaccepted answer keeps the verdict table's words",
    );
    // And the function itself refuses everything else, whatever it is handed.
    assert(learnerVerdict("none", "Merci.", "Merci.") === null, "none is not a verdict");
  });

  test("an incorrect answer never reads as another good way", () => {
    const v = learnerVerdict("none", "Je suis un banane", "Je voudrais un café.");
    assert(v === null, "a wrong answer gets the correction path, not approval");
  });
});

describe("no learner-facing surface says Accepted", () => {
  test("the word is gone from the result path", () => {
    const weave = codeOf(read("components/lesson-v1/screens/Weave.tsx"));
    assert(
      !/text: "Accepted/.test(weave),
      "Accepted is grader language and must not reach the learner",
    );
  });

  test("the internal band name is deliberately untouched", () => {
    // §17: do not force an architecture rename. The append-only log's
    // presentation mapping still calls this band `accepted`, and only the copy
    // the learner reads changed.
    const weave = read("components/lesson-v1/screens/Weave.tsx");
    assert(weave.includes('"accepted" as FeedbackTone'), "the band stays as it was");
  });
});

describe("the model answer can be heard", () => {
  const reveal = read("components/lesson-v1/screens/NaturalReveal.tsx");

  test("the shared reveal offers audio", () => {
    assert(reveal.includes("useSpeech"), "it must use the existing audio stack");
    assert(!/expo-speech|new Tts|Speech\.speak/.test(codeOf(reveal)), "and not a second one");
  });

  test("it plays exactly the visible model, whole", () => {
    // §19: not a hidden older answer, not a truncated first sentence, not
    // another alternative, and never the English support copy.
    assert(
      /say\(reveal\.modelAnswer as string\)/.test(reveal),
      "the string sent to audio must be the string on screen",
    );
    const call = reveal.slice(reveal.indexOf("say(reveal.modelAnswer"), reveal.indexOf("say(reveal.modelAnswer") + 120);
    for (const mangling of ["split(", "slice(", ".en", "alternatives"]) {
      assert(!call.includes(mangling), `the model must not be ${mangling} before playing`);
    }
  });

  test("audio survives a correct answer", () => {
    // §20: the value is not correction. The affordance sits inside the block
    // that renders whenever there is a model, so it is bounded by that element
    // rather than by a character count — and it is not inside a branch keyed
    // on how the learner did.
    const open = reveal.indexOf("{reveal.modelAnswer && (");
    const nextBlock = reveal.indexOf("{reveal.modelAnswer && hasNotes && (");
    assert(open !== -1 && nextBlock > open, "the model must still be its own element");
    const block = codeOf(reveal.slice(open, nextBlock));
    assert(block.includes("say(reveal.modelAnswer"), "audio belongs to the model, not to being wrong");
    for (const gate of ["isCorrect", "wasWrong", "mode ===", "match ===", "verdict"]) {
      assert(!block.includes(gate), `the audio must not sit behind ${gate}`);
    }
  });

  test("multi-sentence models exist, and nothing cuts them down", () => {
    // The structural rule above (no split, no slice) only means something if
    // the corpus actually authors a model of more than one sentence. The
    // founder's own example is one: "Je ne comprends pas. Vous pouvez répéter ?"
    const multi = allModelAnswers().filter((m) => /[.!?]\s+\S/.test(m));
    assert(multi.length > 0, "no authored model runs to two sentences");
    assert(
      multi.some((m) => m.includes("Je ne comprends pas.")),
      "the repair model is still authored as two sentences",
    );
  });

  test("both reveal surfaces get the audio, not just the one that was reported", () => {
    // §18: Weave result AND Say It result. They are the same component, which
    // is why one change covered both — assert that rather than assume it.
    for (const rel of [
      "components/lesson-v1/screens/Weave.tsx",
      "components/lesson-v1/screens/SayItYourWayV1.tsx",
    ]) {
      assert(
        codeOf(read(rel)).includes("<NaturalReveal"),
        `${rel} must reveal through the shared component`,
      );
    }
  });

  test("an alternate-good answer still gets the model to listen to", () => {
    // The audio hangs off `reveal.modelAnswer`, which is present regardless of
    // how the learner's own answer was judged, so "That works." does not cost
    // the learner the natural version.
    const reveal2 = codeOf(read("components/lesson-v1/screens/NaturalReveal.tsx"));
    const open = reveal2.indexOf("{reveal.modelAnswer && (");
    const block = reveal2.slice(open, reveal2.indexOf("{reveal.modelAnswer && hasNotes && ("));
    assert(!block.includes("alternative"), "the model block does not branch on the match");
    assert(!block.includes("naturalAlternatives"), "and does not play an alternative instead");
  });

  test("playing it records nothing", () => {
    // Listening is not producing. No mastery, no progress, no event.
    const code = codeOf(reveal);
    for (const write of ["recordEvent", "appendEvent", "writeMastery", "submitAttempt", "onProductionLanded"]) {
      assert(!code.includes(write), `playback must not ${write}`);
    }
  });
});
