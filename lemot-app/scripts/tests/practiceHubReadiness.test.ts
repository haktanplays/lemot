/**
 * Practice Hub readiness matrix for L1-L10.
 *
 * The question this answers: when a learner finishes the early path, can the
 * Hub actually offer them something real for every item those lessons claimed?
 * The Hub synthesises nothing -- it returns an already-authored screen by
 * reference -- so an item with no reusable source silently drops out of
 * practice forever, and nothing else in the repo would say so.
 *
 * The classification below is HAND-MADE and exhaustive by construction: the
 * last test fails if an L1-L10 lesson declares an item this table does not
 * mention. That is deliberate. Deciding whether an item is practisable is a
 * pedagogical judgment about what the learner is asked to produce, and it is
 * not the kind of thing to infer from a heuristic and then trust.
 *
 * Three verdicts, and only three:
 *
 *   PRACTISABLE   the learner produces or chooses this themselves, so a
 *                 reusable authored screen must resolve for it.
 *
 *   VIA_CARRIER   a sub-lexical piece that never stands alone. "faim" is not
 *                 something a beginner says; "J'ai faim." is. Practising it in
 *                 isolation would invent an exercise the lessons never teach,
 *                 so the carrier chunk is what must resolve instead.
 *
 *   META          a concept rather than a producible surface -- a grammar
 *                 nugget, a micro-contrast, a sound pattern. Nothing to
 *                 produce, so nothing to practise. Note this is a claim about
 *                 the ITEM, not about meta items in general: L5's un/une
 *                 package nugget IS practisable, through a recognition fill,
 *                 and is listed as PRACTISABLE below.
 *
 *   EXPOSURE      a real surface the lesson SHOWS and never works. The
 *                 Showcase names it, no screen asks for it, and the Showcase
 *                 emits no evidence, so the learner never reaches it and no
 *                 seed may require it. Practising it would be teaching new
 *                 language in the Hub, which the pool rules forbid.
 *
 *                 This category was added when L7 declared the fourteen items
 *                 its own Showcase introduces. Declaring them is the lesson
 *                 keeping an honest record of its language; it is NOT a claim
 *                 that the learner can practise them, and the assertion below
 *                 is deliberately the negative one. An EXPOSURE item that
 *                 starts resolving means a screen began asking for something
 *                 the lesson never taught.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { resolvePracticeHubSource } from "../../content/lesson-v1-evidence/practiceHub";
import { PRACTICE_SEEDS } from "../../content/practice/seeds";
import type { ItemId } from "../../content/learning-engine/types";
import type { Lesson } from "../../content/lessonTypes";

const PATH: readonly Lesson[] = V1_LESSONS.filter((l) => l.number >= 1 && l.number <= 10);
const POOL_PATHS = ["build", "stretch", "challenge"] as const;

const resolves = (itemId: string): boolean =>
  POOL_PATHS.some((p) => resolvePracticeHubSource(itemId as ItemId, p, V1_LESSONS) !== null);

/** Items the learner produces or chooses. A source must exist. */
const PRACTISABLE: readonly string[] = [
  "chunk-bonjour",
  "chunk-merci",
  "chunk-sil-vous-plait",
  "chunk-je-voudrais",
  "noun-cafe",
  "chunk-un-the",
  "chunk-excusez-moi",
  "chunk-vous-pouvez-repeter",
  "chunk-je-suis",
  "chunk-je-suis-ici",
  "chunk-non",
  "chunk-oui",
  "chunk-je-ne-suis-pas",
  "chunk-ce-n-est-pas",
  "chunk-non-merci",
  "chunk-je-ne-comprends-pas",
  "chunk-c-est",
  "chunk-j-ai",
  "chunk-j-ai-faim",
  "chunk-j-ai-une-question",
  "noun-idee",
  "chunk-un-cafe",
  "chunk-une-question",
  "grammar-un-une-package",
  "chunk-au-revoir",
  "chunk-je-vais",
  "chunk-a-la-maison",
  "chunk-c-est-ou",
  "adverb-ou-where",
  "chunk-est-ce-que",
  "chunk-faire-une-pause",
  "chunk-vous-pouvez",
  "chunk-m-aider",
  // L7 production pass. Each is produced by the learner inside L7 itself, so
  // each resolves to an authored source there. The destinations are frozen
  // chunks rather than a productive contraction, which is why they are listed
  // separately: `au café` and `à la gare` are two things to own, not one rule
  // applied twice. L7's wider leaving vocabulary is Showcase material and is
  // deliberately NOT listed — a lesson may only work about four new actions,
  // and an item the lesson never asks for is not practisable through it.
  "chunk-au-cafe",
  "chunk-a-la-gare",
  "chunk-bonne-soiree",
  "chunk-merci-beaucoup",
  "chunk-je-dois-partir",
  "chunk-desole",
];

/** Sub-lexical pieces, mapped to the chunk that actually carries them. */
const VIA_CARRIER: Readonly<Record<string, string>> = {
  "word-ici": "chunk-je-suis-ici",
  "noun-faim": "chunk-j-ai-faim",
  "noun-question": "chunk-j-ai-une-question",
  "noun-pause": "chunk-faire-une-pause",
  // The pronoun L2 breaks "je suis" open to show. Practised every time the
  // carrier is, never on its own.
  "pronoun-je": "chunk-je-suis",
  // The two destination shapes. They are carried by the destinations L7 already
  // works, and deliberately NOT treated as a productive contraction: L7 teaches
  // "au café" and "à la maison" whole, and these identities exist so the depth
  // layer can say why the two shapes differ, not to license composing them.
  "prep-au": "chunk-au-cafe",
  "prep-a-la": "chunk-a-la-maison",
  // être is a surface type, so it cannot be META. L1-L10 never conjugates it;
  // the learner meets it entirely inside "je suis", which is its carrier.
  "verb-etre": "chunk-je-suis",
  // The action half L1 breaks "vous pouvez répéter ?" open to show, exactly as
  // pronoun-je is broken out of "je suis". Nobody asks for "répéter" on its
  // own, so it is practised whenever the whole formula is and never alone.
  "verb-repeter": "chunk-vous-pouvez-repeter",
};

/**
 * Shown, never worked. Reachable only if a future pass gives them a screen.
 *
 * L7 introduces these in its Showcase and has no room in its 20-screen budget
 * to work them. They are the honest measure of the distance between a lesson's
 * language WORLD and what it can actually teach in one sitting.
 */
const EXPOSURE: readonly string[] = [
  "chunk-au-travail",
  "chunk-au-restaurant",
  "chunk-a-l-hotel",
  "chunk-bonne-journee",
  "chunk-a-demain",
  "chunk-a-bientot",
  "chunk-a-tout-a-l-heure",
  "chunk-je-pars",
  "chunk-une-autre-fois",
  "chunk-peut-etre",
  "adverb-maintenant",
  "adverb-plus-tard",
  "adverb-ce-soir",
  "adverb-demain",
  "chunk-de-rien",
  "chunk-encore-merci",
  "chunk-bonne-nuit",
  "chunk-bon-week-end",
  "chunk-bon-voyage",
  // L2's readiness pair, declared when the Showcase's "Vous êtes prêt ?"
  // finally got a job. The lesson SHOWS both and works neither: s26 quotes the
  // question and offers the answer as a whole-sentence choice, and its target
  // is chunk-je-suis, the engine underneath. States are L17's to demand, so
  // neither of these may start resolving here — if one does, a screen has begun
  // asking L2 for language L2 does not teach.
  "chunk-vous-etes-pret",
  "chunk-je-suis-pret",
];

/** Concepts, not surfaces. Nothing to produce. */
const META: readonly string[] = [
  "grammar-ne-pas-sandwich",
  "micro-je-suis-vs-j-ai",
  "sound-elision",
  // The note that frames L2's engine. A concept, not a surface.
  "grammar-etre-identity",
  // Demonstrated by "Vous êtes prêt ?" on L2's Showcase. A pronunciation
  // pattern, not a thing to say.
  "sound-liaison",
];

describe("Practice Hub can offer something real for every practisable item", () => {
  for (const itemId of PRACTISABLE) {
    test(`${itemId} resolves to an authored source`, () => {
      assert(
        resolves(itemId),
        `${itemId} is classified practisable but the Hub can offer nothing for it`,
      );
    });
  }
});

describe("sub-lexical items are practised through their carrier", () => {
  for (const [itemId, carrier] of Object.entries(VIA_CARRIER)) {
    test(`${itemId} rides on ${carrier}`, () => {
      // Both halves matter. If the piece started resolving on its own, some
      // screen began demanding it in isolation and the classification is stale.
      // If the carrier stopped resolving, the piece is unreachable in practice
      // by any route at all.
      assert(
        !resolves(itemId),
        `${itemId} now resolves on its own -- a screen is demanding it in isolation`,
      );
      assert(
        resolves(carrier),
        `${itemId} is unreachable: its carrier ${carrier} has no source either`,
      );
    });
  }
});

describe("meta items are concepts, and are not offered as production", () => {
  for (const itemId of META) {
    test(`${itemId} is a non-surface type with no production source`, () => {
      const item = ITEM_REGISTRY[itemId as keyof typeof ITEM_REGISTRY] as
        | { type?: string }
        | undefined;
      assert(item !== undefined, `${itemId} is not registered`);
      assert(
        ["grammar-nugget", "micro-contrast", "sound-pattern", "culture-bite"].includes(
          item!.type ?? "",
        ),
        `${itemId} has surface type ${JSON.stringify(item!.type)} -- reclassify it`,
      );
      assert(!resolves(itemId), `${itemId} is offered as practice despite being a concept`);
    });
  }
});

describe("exposure items are shown, and never demanded", () => {
  for (const itemId of EXPOSURE) {
    test(`${itemId} is shown but never asked for`, () => {
      assert(
        !resolves(itemId),
        `${itemId} is classified exposure but a screen is demanding it -- either it is taught now, or the screen is asking for something the lesson never gave`,
      );
    });
  }

  test("no seed requires exposure-only language", () => {
    // The other half, and the one that would bite a learner: a seed requiring
    // an item nobody ever taught is unservable forever, because the reach check
    // asks whether they own it and the answer stays no.
    const exposure = new Set(EXPOSURE);
    const offenders = PRACTICE_SEEDS.filter((seed) =>
      seed.requiredItemIds.some((id) => exposure.has(id)),
    ).map((seed) => seed.id);
    assertEqual(offenders, [], "seeds requiring language no lesson works");
  });
});

describe("the matrix covers the path exhaustively", () => {
  test("every item L1-L10 declares carries a verdict", () => {
    // The self-maintaining half. A new item on the early path cannot ship
    // without someone deciding, in this file, whether the learner can practise
    // it -- which is the decision that would otherwise be made by nobody.
    const classified = new Set([...PRACTISABLE, ...Object.keys(VIA_CARRIER), ...META, ...EXPOSURE]);
    const missing: string[] = [];
    for (const lesson of PATH) {
      for (const item of lesson.learningItems) {
        if (!classified.has(item.id)) missing.push(`${lesson.id}: ${item.id}`);
      }
    }
    assertEqual(
      missing,
      [],
      "unclassified L1-L10 items -- add each to PRACTISABLE, VIA_CARRIER, META or EXPOSURE",
    );
  });

  test("the matrix names nothing the path does not declare", () => {
    const declared = new Set(PATH.flatMap((l) => l.learningItems.map((i) => i.id)));
    const stale = [...PRACTISABLE, ...Object.keys(VIA_CARRIER), ...META, ...EXPOSURE].filter(
      (id) => !declared.has(id),
    );
    assertEqual(stale, [], "matrix rows for items no L1-L10 lesson declares any more");
  });

  test("readiness is total: no item on the path is unreachable in practice", () => {
    // The headline the matrix exists to state, and the one worth reading in a
    // report: 33 items resolve directly, 4 through a carrier, 3 need nothing.
    const unreachable = PATH.flatMap((l) => l.learningItems.map((i) => i.id))
      .filter((id) => !META.includes(id))
      // Exposure items have no practice route BY CLASSIFICATION, which is the
      // point of the category rather than an exemption from the check: the
      // assertion that they must not resolve lives in its own block above.
      .filter((id) => !EXPOSURE.includes(id))
      .filter((id) => !resolves(id) && !resolves(VIA_CARRIER[id] ?? ""));
    assertEqual(unreachable, [], "items with no practice route at all");
  });
});
