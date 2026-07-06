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
