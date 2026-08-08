/**
 * Practice selector contracts (Lesson Flow Canon §5.1/§5.2) — selection
 * weight only, never evidence weight (§5.3 separation).
 */
import { describe, test, assert, assertEqual } from "./harness";
import {
  selectTodaysSet,
  TODAYS_SET_MIN,
  TODAYS_SET_MAX,
  type PracticeCandidate,
} from "../../content/learning-engine/practice-selector";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { WEAK_POINT_TAGS } from "../../content/weakPointTags";

const NOW = 1_720_000_000_000;
const DAY = 86_400_000;

function c(
  itemId: string,
  family: string,
  dueAt: number | null,
  weakPointTags: string[] = [],
): PracticeCandidate {
  return { itemId, family, dueAt, weakPointTags };
}

describe("practice selector (today's set, canon §5.2)", () => {
  test("due items come first, oldest first, itemId tiebreak", () => {
    const set = selectTodaysSet({
      due: [
        c("b", "f1", NOW - 1 * DAY),
        c("a", "f2", NOW - 3 * DAY),
        c("d", "f3", NOW - 1 * DAY),
        c("e", "f4", NOW), // dueAt === now counts as due
        c("z", "f5", null),
      ],
      weakTags: [],
      budget: 5,
      now: NOW,
    });
    assertEqual(set.itemIds, ["a", "b", "d", "e", "z"], "oldest due first; ties on itemId");
  });

  test("after due: weakest tag wins (highest error count), then itemId", () => {
    const set = selectTodaysSet({
      due: [
        c("mild", "f1", null, ["politeness"]),
        c("severe", "f2", null, ["negation"]),
        c("none", "f3", null, []),
        c("also-severe", "f4", null, ["negation", "politeness"]),
        c("due-one", "f5", NOW - DAY),
      ],
      weakTags: [
        { tag: "negation", errorCount: 7 },
        { tag: "politeness", errorCount: 2 },
      ],
      budget: 5,
      now: NOW,
    });
    assertEqual(
      set.itemIds,
      ["due-one", "also-severe", "severe", "mild", "none"],
      "due first, then weakness descending, itemId tiebreak",
    );
  });

  test("diversity: never 3 consecutive picks from the same family; deferred item returns", () => {
    const set = selectTodaysSet({
      due: [
        c("a1", "fam-a", NOW - 5 * DAY),
        c("a2", "fam-a", NOW - 4 * DAY),
        c("a3", "fam-a", NOW - 3 * DAY),
        c("b1", "fam-b", NOW - 2 * DAY),
        c("a4", "fam-a", NOW - 1 * DAY),
      ],
      weakTags: [],
      budget: 5,
      now: NOW,
    });
    assertEqual(set.itemIds, ["a1", "a2", "b1", "a3", "a4"], "third same-family pick defers until the streak breaks");
    for (let i = 2; i < set.itemIds.length; i += 1) {
      const fam = (id: string) => (id.startsWith("a") ? "fam-a" : "fam-b");
      assert(
        !(fam(set.itemIds[i]) === fam(set.itemIds[i - 1]) && fam(set.itemIds[i]) === fam(set.itemIds[i - 2])),
        "no 3-in-a-row family streak anywhere in the set",
      );
    }
  });

  test("unsatisfiable diversity ends the set early (natural end, never a rule break)", () => {
    const set = selectTodaysSet({
      due: [
        c("a1", "fam-a", NOW - 4 * DAY),
        c("a2", "fam-a", NOW - 3 * DAY),
        c("a3", "fam-a", NOW - 2 * DAY),
        c("a4", "fam-a", NOW - 1 * DAY),
      ],
      weakTags: [],
      budget: 6,
      now: NOW,
    });
    assertEqual(set.itemIds, ["a1", "a2"], "the cap holds even when the pool is single-family");
  });

  test("budget clamps to the canon band and tolerates garbage", () => {
    const pool = Array.from({ length: 12 }, (_, i) =>
      c(`i${String(i).padStart(2, "0")}`, `fam-${i % 5}`, NOW - (12 - i) * DAY),
    );
    assertEqual(
      selectTodaysSet({ due: pool, weakTags: [], budget: 20, now: NOW }).itemIds.length,
      TODAYS_SET_MAX,
      "over-budget clamps to 8",
    );
    assertEqual(
      selectTodaysSet({ due: pool, weakTags: [], budget: 1, now: NOW }).itemIds.length,
      TODAYS_SET_MIN,
      "under-budget clamps to 5",
    );
    assertEqual(
      selectTodaysSet({ due: pool, weakTags: [], budget: Number.NaN, now: NOW }).requested,
      TODAYS_SET_MIN,
      "garbage budget falls back to the floor",
    );
  });

  test("duplicate itemIds are deduped (first occurrence wins)", () => {
    const set = selectTodaysSet({
      due: [c("x", "f1", NOW - 2 * DAY), c("x", "f2", NOW - 9 * DAY), c("y", "f3", NOW - DAY)],
      weakTags: [],
      budget: 5,
      now: NOW,
    });
    assertEqual(set.itemIds, ["x", "y"], "a corrupted double entry never doubles a drill");
  });

  test("deterministic: identical input twice, identical set", () => {
    const input = {
      due: [
        c("a", "f1", NOW - DAY, ["negation"]),
        c("b", "f1", null, ["negation"]),
        c("d", "f2", null, ["politeness"]),
      ],
      weakTags: [{ tag: "negation", errorCount: 3 }, { tag: "politeness", errorCount: 1 }],
      budget: 6,
      now: NOW,
    };
    assertEqual(selectTodaysSet(input), selectTodaysSet(input), "same input, same set");
  });

  test("empty pool yields an empty set without failing", () => {
    assertEqual(selectTodaysSet({ due: [], weakTags: [], budget: 6, now: NOW }).itemIds, [], "empty is calm");
  });
});

/**
 * Weak-point ELIGIBILITY, not selector behaviour.
 *
 * The Practice Hub builds each candidate's `weakPointTags` from the ITEM
 * REGISTRY (`practiceHub.ts`: `weakPointTags: registryItem.weakPointTags ?? []`)
 * — screen-level tags have no runtime consumer at all. So an owned item with no
 * registry tag can still be OFFERED, but `weaknessOf()` returns 0 for it and it
 * can never rise within the not-yet-due tier no matter how often the learner
 * gets it wrong.
 *
 * L14 shipped place-`y` ownership while `word-y-place` and `chunk-on-y-va`
 * carried no tag, even though the taxonomy has always defined `y`. These tests
 * pin the repair so it cannot silently regress, and pin the two properties that
 * must NOT have changed with it.
 */
describe("weak-point eligibility — the y identities", () => {
  const tagsOf = (id: string) =>
    (ITEM_REGISTRY as Record<string, { weakPointTags?: readonly string[] }>)[id].weakPointTags ?? [];

  test("`y` is a real taxonomy value, not an invented one", () => {
    assert((WEAK_POINT_TAGS as readonly string[]).includes("y"), "y predates this repair");
  });

  test("both place-y identities carry the y tag", () => {
    assertEqual([...tagsOf("word-y-place")], ["y"], "word-y-place is the place-y pronoun");
    assertEqual([...tagsOf("chunk-on-y-va")], ["y"], "on y va is frozen around the same y");
  });

  test("an errored y item now outranks untagged peers in the not-yet-due tier", () => {
    const set = selectTodaysSet({
      due: [
        c("chunk-bonjour", "chunk", null, []),
        c("word-y-place", "pronoun", null, [...tagsOf("word-y-place")]),
        c("chunk-merci", "chunk", null, []),
      ],
      weakTags: [{ tag: "y", errorCount: 9 }],
      budget: TODAYS_SET_MIN,
      now: NOW,
    });
    assertEqual(set.itemIds[0], "word-y-place", "weakness promotes it to the front");
  });

  test("stripping the tag sinks it again — the tag is what does the work", () => {
    const set = selectTodaysSet({
      due: [
        c("chunk-bonjour", "chunk", null, []),
        c("word-y-place", "pronoun", null, []),
        c("chunk-merci", "chunk", null, []),
      ],
      weakTags: [{ tag: "y", errorCount: 9 }],
      budget: TODAYS_SET_MIN,
      now: NOW,
    });
    assert(set.itemIds[0] !== "word-y-place", "untagged, the same errors buy it nothing");
  });

  test("SRS-due order is NOT reordered by the new weakness signal", () => {
    const set = selectTodaysSet({
      due: [
        c("chunk-bonjour", "chunk", NOW - 5 * DAY, []),
        c("word-y-place", "pronoun", NOW - DAY, ["y"]),
      ],
      weakTags: [{ tag: "y", errorCount: 99 }],
      budget: TODAYS_SET_MIN,
      now: NOW,
    });
    assertEqual(set.itemIds, ["chunk-bonjour", "word-y-place"], "due tier stays oldest-first");
  });
});
