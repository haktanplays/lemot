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
 */
import { describe, test, assert, assertEqual } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { resolvePracticeHubSource } from "../../content/lesson-v1-evidence/practiceHub";
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
];

/** Sub-lexical pieces, mapped to the chunk that actually carries them. */
const VIA_CARRIER: Readonly<Record<string, string>> = {
  "word-ici": "chunk-je-suis-ici",
  "noun-faim": "chunk-j-ai-faim",
  "noun-question": "chunk-j-ai-une-question",
  "noun-pause": "chunk-faire-une-pause",
};

/** Concepts, not surfaces. Nothing to produce. */
const META: readonly string[] = [
  "grammar-ne-pas-sandwich",
  "micro-je-suis-vs-j-ai",
  "sound-elision",
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

describe("the matrix covers the path exhaustively", () => {
  test("every item L1-L10 declares carries a verdict", () => {
    // The self-maintaining half. A new item on the early path cannot ship
    // without someone deciding, in this file, whether the learner can practise
    // it -- which is the decision that would otherwise be made by nobody.
    const classified = new Set([...PRACTISABLE, ...Object.keys(VIA_CARRIER), ...META]);
    const missing: string[] = [];
    for (const lesson of PATH) {
      for (const item of lesson.learningItems) {
        if (!classified.has(item.id)) missing.push(`${lesson.id}: ${item.id}`);
      }
    }
    assertEqual(
      missing,
      [],
      "unclassified L1-L10 items -- add each to PRACTISABLE, VIA_CARRIER or META",
    );
  });

  test("the matrix names nothing the path does not declare", () => {
    const declared = new Set(PATH.flatMap((l) => l.learningItems.map((i) => i.id)));
    const stale = [...PRACTISABLE, ...Object.keys(VIA_CARRIER), ...META].filter(
      (id) => !declared.has(id),
    );
    assertEqual(stale, [], "matrix rows for items no L1-L10 lesson declares any more");
  });

  test("readiness is total: no item on the path is unreachable in practice", () => {
    // The headline the matrix exists to state, and the one worth reading in a
    // report: 33 items resolve directly, 4 through a carrier, 3 need nothing.
    const unreachable = PATH.flatMap((l) => l.learningItems.map((i) => i.id))
      .filter((id) => !META.includes(id))
      .filter((id) => !resolves(id) && !resolves(VIA_CARRIER[id] ?? ""));
    assertEqual(unreachable, [], "items with no practice route at all");
  });
});
