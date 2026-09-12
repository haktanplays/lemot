/**
 * The door to Context Cards, and the room behind it.
 *
 * ── THE DEFECT ─────────────────────────────────────────────────────────────
 *
 * The Journey drew a Context Cards entry unconditionally: "Explore a little
 * more French. Nothing is tested." A set only appears once its ENGINE is
 * genuinely the learner's, and there are four engines, so a learner who has
 * reached none of them tapped that and arrived at "These open up as your
 * sentences do." A door, offered in the product's own calm voice, into an empty
 * room — and on a fresh install that is every learner.
 *
 * ── THE TRAP UNDERNEATH IT ─────────────────────────────────────────────────
 *
 * The obvious fix — ask whether anything is available before drawing the door —
 * has a trap: the app carries TWO plausible reach projections that disagree.
 * `reachedItemIds` keys on practice eligibility; `selectMonLexiqueEntries` keys
 * on Mon Lexique status and a resolvable registry surface. Answering with the
 * wrong one moves the defect rather than fixing it, and the new version is
 * harder to see because it only shows up for learners in the gap.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  CONTEXT_CARD_SETS,
  availableContextCardSets,
} from "../../content/context-cards/cards";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");
const codeOf = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

describe("the door is drawn only when the room has something in it", () => {
  const home = codeOf(read("app/(tabs)/index.tsx"));

  test("a learner who has reached nothing has nothing to open", () => {
    // The premise of the whole fix, asserted rather than assumed: this is what
    // a fresh install actually sees.
    assert(
      availableContextCardSets(new Set()).length === 0,
      "an empty reach must open no sets",
    );
    assert(CONTEXT_CARD_SETS.length > 0, "and there must be sets to open later");
  });

  test("the entry is behind a real count", () => {
    assert(
      home.includes("{contextCardSetCount > 0 && ("),
      "the door must be conditional on something actually being there",
    );
    assert(
      home.includes("useContextCardDoor()"),
      "and the count must come from the shared hook",
    );
  });

  test("it asks with the destination's own derivation", () => {
    // Agreement by construction. Both the door and the room must go through
    // the same read and the same two pure functions; anything else and the two
    // can disagree for learners in the gap between the projections.
    const hook = codeOf(read("hooks/useContextCardDoor.ts"));
    const route = codeOf(read("app/context-cards.tsx"));
    for (const step of ["readPracticeReach", "reachedItemIds", "availableContextCardSets"]) {
      assert(hook.includes(step), `the door must use ${step}`);
      assert(route.includes(step), `the room must use ${step}`);
    }
    assert(
      !hook.includes("selectMonLexiqueEntries") && !hook.includes("useReachedItemIds"),
      "the door must not answer with the OTHER reach projection",
    );
  });

  test("a failed or pending read hides the door rather than guessing", () => {
    const hook = codeOf(read("hooks/useContextCardDoor.ts"));
    assert(/useState\(0\)/.test(hook), "it starts at zero, so nothing is drawn first");
    assert(/\.catch\(\(\) => \{/.test(hook), "and a failed read leaves it there");
  });

  test("there is still exactly one entry to Context Cards", () => {
    // The brief was explicit that these must not be scattered as redundant
    // buttons around the app. Gating the one entry must not have grown a
    // second one somewhere else as a consolation.
    let doors = 0;
    for (const rel of [
      "app/(tabs)/index.tsx",
      "app/(tabs)/mon-lexique.tsx",
      "app/(tabs)/my-french.tsx",
      "app/(tabs)/practice-hub.tsx",
    ]) {
      doors += codeOf(read(rel)).split('router.push("/context-cards').length - 1;
    }
    assert(doors === 1, `${doors} entries to Context Cards; there must be one`);
  });
});

describe("the entry reads as part of the Journey", () => {
  const home = codeOf(read("app/(tabs)/index.tsx"));
  const block = home.slice(
    home.indexOf("{contextCardSetCount > 0 && ("),
    home.indexOf("{aheadStates.length > 0 && ("),
  );

  test("it is an anchor block like the offers above it", () => {
    assert(block.includes("<AnchorBlock>"), "it must use the shared block");
    assert(block.includes("<Kicker text=\"Context Cards\""), "and the shared label");
  });

  test("it is not a card any more", () => {
    for (const chrome of ["backgroundColor: P.paper", "borderRadius", 'className="mb-6 border"']) {
      assert(!block.includes(chrome), `the entry must not draw ${chrome}`);
    }
  });

  test("the promise on it is still the honest one", () => {
    assert(
      block.includes("Nothing is tested."),
      "the one thing this door has to say about itself must survive",
    );
  });
});
