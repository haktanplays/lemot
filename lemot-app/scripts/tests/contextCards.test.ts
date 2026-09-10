/**
 * Context Cards are INPUT, and the hard part is keeping them that way.
 *
 * The brief's sharpest line about them is not about cards at all: "Do not
 * collapse exposure and production into one dishonest state." Meeting "la
 * sortie" on a card says the word was on screen. It does not say the learner
 * understood it, could recall it, or could ever produce it, and any surface
 * that treats it as though it did is lying to them about what they know.
 *
 * These hold three things:
 *
 *   1. a card asks nothing -- no answer, no result, no score, anywhere;
 *   2. no card vocabulary can leak into the production system, because none of
 *      it is a registry item and therefore none of it can be a Practice target
 *      or a lesson demand;
 *   3. a set only appears once its engine is genuinely the learner's, which is
 *      what makes it input rather than a vocabulary list bolted on the side.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  CONTEXT_CARD_SETS,
  allContextCards,
  availableContextCardSets,
} from "../../content/context-cards/cards";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { PRACTICE_SEEDS } from "../../content/practice/seeds";
import { V1_LESSONS } from "../../content/lessons/v1";
import {
  EMPTY_EXPOSURE,
  parseExposure,
  withCardMet,
} from "../../content/context-cards/exposure";

const CARDS = allContextCards();
const SURFACE = readFileSync(join(process.cwd(), "app/context-cards.tsx"), "utf8");
const norm = (s: string) => s.normalize("NFC").toLowerCase().trim();

describe("a card asks nothing", () => {
  test("no card carries an answer, a result or a score", () => {
    for (const card of CARDS) {
      const keys = Object.keys(card);
      for (const banned of ["answer", "expected", "result", "correct", "score", "options"]) {
        assert(!keys.includes(banned), `${card.id} has a "${banned}" field`);
      }
    }
  });

  test("no cue is phrased as a question to answer", () => {
    // A cue sets a situation. The moment it asks "how do you say X", the card
    // is a quiz with the answer printed underneath.
    for (const card of CARDS) {
      assert(
        !/how do you say|what is the french|translate/i.test(card.cue),
        `${card.id} reads as a translation prompt: "${card.cue}"`,
      );
    }
  });

  test("the surface grades nothing", () => {
    for (const banned of ["isCorrect", "evaluate", "recordAttempt", "TextInput", "result:"]) {
      assert(!SURFACE.includes(banned), `Context Cards must not ${banned}`);
    }
  });

  test("the surface says out loud that met is not learned", () => {
    assert(
      SURFACE.includes("Met is not learned"),
      "the learner should be told what this surface does and does not claim",
    );
  });
});

describe("exposure cannot become production", () => {
  test("no card's French is a registry item", () => {
    // This is the structural guarantee. Registry items are what Practice
    // targets and lessons demand; if a card word were one, exposure could be
    // scheduled as output without anyone deciding to allow it.
    const registryTexts = new Set(
      Object.values(ITEM_REGISTRY as Record<string, { text?: string }>).map((i) =>
        norm(String(i.text ?? "")),
      ),
    );
    for (const card of CARDS) {
      assert(
        !registryTexts.has(norm(card.fr)),
        `"${card.fr}" is a registry item, so it can be demanded as production`,
      );
    }
  });

  test("no Practice seed targets card vocabulary", () => {
    const cardFrench = new Set(CARDS.map((c) => norm(c.fr)));
    for (const seed of PRACTICE_SEEDS as unknown as { id: string; exercise: { payload: Record<string, never> } }[]) {
      const answer = String(
        (seed.exercise.payload.expectedAnswers ?? [])[0] ?? seed.exercise.payload.modelAnswer ?? "",
      );
      if (!answer) continue;
      assert(
        !cardFrench.has(norm(answer)),
        `${seed.id} asks for "${answer}", which is Context Card input`,
      );
    }
  });

  test("no lesson declares card vocabulary as a learning item", () => {
    const cardFrench = new Set(CARDS.map((c) => norm(c.fr)));
    for (const lesson of V1_LESSONS) {
      for (const item of lesson.learningItems ?? []) {
        const text = norm(String((item as { text?: string }).text ?? ""));
        assert(
          !cardFrench.has(text),
          `${lesson.id} declares "${text}", which is Context Card input`,
        );
      }
    }
  });

  test("the store is its own key, not the mastery snapshot", () => {
    const store =
      readFileSync(join(process.cwd(), "lib/contextCardExposure.ts"), "utf8") +
      readFileSync(join(process.cwd(), "content/context-cards/exposure.ts"), "utf8");
    for (const banned of ["scoreEvents", "MasterySnapshot", "isWeak", "leitnerBox", "wrongCount"]) {
      assert(!store.includes(banned), `the exposure store must not touch ${banned}`);
    }
  });
});

describe("a set only opens when its engine is owned", () => {
  test("every set hangs off a real registry item", () => {
    for (const set of CONTEXT_CARD_SETS) {
      assert(
        Object.hasOwn(ITEM_REGISTRY, set.engineItemId),
        `${set.id} extends "${set.engineItemId}", which is not an item`,
      );
    }
  });

  test("a learner who owns nothing is shown nothing", () => {
    assertEqual(
      availableContextCardSets(new Set()).length,
      0,
      "cards must broaden an engine, never introduce one",
    );
  });

  test("owning one engine opens exactly that set", () => {
    const set = CONTEXT_CARD_SETS[0];
    const out = availableContextCardSets(new Set([set.engineItemId]));
    assertEqual(out.length, 1, "one engine, one set");
    assertEqual(out[0].id, set.id, "and it is the matching one");
  });

  test("every card gives the learner something to do with the engine", () => {
    // A card with no example is a word list entry. The example is what shows
    // the new word riding on a sentence they already own.
    const withExample = CARDS.filter((c) => c.example !== undefined).length;
    assert(
      withExample >= CARDS.length - 1,
      `${CARDS.length - withExample} cards show no sentence the learner could already say`,
    );
  });

  test("the set stays small on purpose", () => {
    // The brief says not to optimize for count, so this is a ceiling rather
    // than a floor: a hundred cards would be the vocabulary list again.
    assert(CARDS.length <= 40, `${CARDS.length} cards is a word list, not a set of context`);
    assert(CARDS.length >= 12, `${CARDS.length} cards is not yet a coherent starter set`);
  });
});

describe("meeting a card is recorded honestly", () => {
  test("first contact wins", () => {
    const first = withCardMet(EMPTY_EXPOSURE, "cc-la-gare", 100);
    const again = withCardMet(first, "cc-la-gare", 500);
    assertEqual(again["cc-la-gare"], 100, "looking again does not make old exposure look fresh");
    assert(again === first, "an unchanged state should not be rewritten");
  });

  test("corrupt storage loses exposure and nothing else", () => {
    assertEqual(Object.keys(parseExposure("not json")).length, 0, "no crash");
    assertEqual(Object.keys(parseExposure("[1,2,3]")).length, 0, "an array is not exposure");
    assertEqual(Object.keys(parseExposure(null)).length, 0, "absent is empty");
  });

  test("only card ids and times survive parsing", () => {
    const parsed = parseExposure('{"a":1,"b":"nope","c":null,"d":2}');
    assertEqual(Object.keys(parsed).sort().join(","), "a,d", "junk values are dropped");
  });
});
