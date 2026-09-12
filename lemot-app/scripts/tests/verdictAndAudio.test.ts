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

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");
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

  test("playing it records nothing", () => {
    // Listening is not producing. No mastery, no progress, no event.
    const code = codeOf(reveal);
    for (const write of ["recordEvent", "appendEvent", "writeMastery", "submitAttempt", "onProductionLanded"]) {
      assert(!code.includes(write), `playback must not ${write}`);
    }
  });
});
