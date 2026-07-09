/**
 * PR-E1 — learning-engine correctness: near-miss mastery timing (audit B7 + B12).
 *
 * B7: meaning-distinct FR minimal pairs (un/on, le/la, et/est) surface as
 *     `spelling_near_miss`. They may keep a near-miss UX tone, but mastery must
 *     NOT treat them as harmless/fully neutral: no positive credit, and repeated
 *     occurrences accrue weakness (→ Challenge). Meaning-preserving accent /
 *     punctuation slips (PR-B1 leniency) are deliberately left untouched.
 *
 * B12: skip and near-miss must not push `dueAt` forward as if the item were
 *      practiced successfully. A skipped or near-missed item stays due now so it
 *      returns for reinforcement, instead of disappearing for a full box interval.
 *      Correct-answer progression is preserved.
 *
 * Pure reducer only — no storage/AI/React. Uses the shared LearningEvent factory.
 */
import { describe, test, assert } from "./harness";
import { makeEvent } from "./helpers";
import {
  scoreEvents,
  LEITNER_INTERVAL_DAYS,
} from "../../content/learning-engine/mastery";

const DAY_MS = 24 * 60 * 60 * 1000;
const ITEM = "item-e1";

// Raise an item to leitner box 2 with two correct answers, then apply one more
// outcome (the case under test) at timestamp `resultTs`.
function atBox2Then(result: Parameters<typeof makeEvent>[0]["result"], resultTs: number) {
  return scoreEvents([
    makeEvent({ result: "correct", operation: "fill", itemIds: [ITEM], clientEventId: "c1", timestamp: 1_000 }),
    makeEvent({ result: "correct", operation: "fill", itemIds: [ITEM], clientEventId: "c2", timestamp: 2_000 }),
    makeEvent({ result, operation: "fill", itemIds: [ITEM], clientEventId: "x", timestamp: resultTs }),
  ]).items[ITEM];
}

describe("PR-E1 B7 — spelling_near_miss (minimal pairs) is not treated as harmless", () => {
  test("repeated spelling_near_miss (un/on) flags the item weak → Challenge", () => {
    const events = Array.from({ length: 3 }, (_, i) =>
      makeEvent({ result: "spelling_near_miss", operation: "fill", itemIds: [ITEM], clientEventId: `snm-${i}` }),
    );
    const m = scoreEvents(events).items[ITEM];
    assert(m.isWeak === true, "3 minimal-pair near-misses must make the item weak");
    assert(m.practiceEligibility === "challenge", "weak minimal-pair item must route to Challenge");
    assert((m.weakTags.spelling_near_miss ?? 0) === 3, "weakTags must accrue spelling_near_miss");
  });

  test("a single spelling_near_miss earns no positive mastery credit", () => {
    const m = scoreEvents([
      makeEvent({ result: "spelling_near_miss", operation: "fill", itemIds: [ITEM], timestamp: 5_000 }),
    ]).items[ITEM];
    assert(m.productionSuccess === 0, "no production success credit");
    assert(m.leitnerBox === 0, "leitner box must not advance");
    assert(m.promptFadeLevel === "PF0", "prompt-fade must not advance");
    assert(m.monLexiqueStatus !== "added", "a near-miss alone must not add the item to Mon Lexique");
  });
});

describe("PR-E1 B7 — accent/punctuation leniency preserved (PR-B1)", () => {
  test("repeated accent_only stays soft precision, never weak", () => {
    const events = Array.from({ length: 3 }, (_, i) =>
      makeEvent({ result: "accent_only", operation: "fill", itemIds: [ITEM], clientEventId: `ao-${i}` }),
    );
    const m = scoreEvents(events).items[ITEM];
    assert(m.isWeak === false, "accent slips must never make the item weak");
    assert(m.precisionCount === 3, "accent slips remain precision signals");
    assert(Object.keys(m.weakTags).length === 0, "accent slips must not accrue weakTags");
    assert(m.practiceEligibility === "build", "accent-only item stays Build, never Challenge");
  });
});

describe("PR-E1 B12 — skip / near-miss keep the item due for reinforcement", () => {
  test("skip does not push dueAt forward (stays due now); box unchanged", () => {
    const T = 9_000;
    const m = atBox2Then("empty_or_skip", T);
    assert(m.skipCount === 1, "skip counted");
    assert(m.leitnerBox === 2, "skip must neither advance nor demote the box");
    assert(m.dueAt === T, `skip must keep the item due now (=${T}); got ${m.dueAt}`);
  });

  test("near-miss (accent_only) keeps dueAt soon, not a full box interval away", () => {
    const T = 9_000;
    const m = atBox2Then("accent_only", T);
    assert(m.leitnerBox === 2, "near-miss must neither advance nor demote the box");
    assert(m.dueAt === T, `near-miss must keep the item due now (=${T}); got ${m.dueAt}`);
    assert(
      (m.dueAt ?? 0) < T + LEITNER_INTERVAL_DAYS[2] * DAY_MS,
      "near-miss dueAt must be sooner than a box-2 (3-day) schedule",
    );
  });

  test("spelling_near_miss also keeps dueAt soon", () => {
    const T = 9_000;
    const m = atBox2Then("spelling_near_miss", T);
    assert(m.dueAt === T, `spelling near-miss must keep the item due now (=${T}); got ${m.dueAt}`);
  });

  test("correct answer still advances the box and schedules dueAt at the new interval", () => {
    const T = 9_000;
    const m = atBox2Then("correct", T);
    assert(m.leitnerBox === 3, "correct advances box 2 → 3");
    assert(
      m.dueAt === T + LEITNER_INTERVAL_DAYS[3] * DAY_MS,
      "correct schedules dueAt at the new (box 3, 7-day) interval",
    );
  });
});

describe("PR-E1 — no denominator/scoring regression (PR-B1)", () => {
  test("near-miss and skip count as attempts but never as success/failure", () => {
    const m = scoreEvents([
      makeEvent({ result: "correct", operation: "fill", itemIds: [ITEM], clientEventId: "a" }),
      makeEvent({ result: "accent_only", operation: "fill", itemIds: [ITEM], clientEventId: "b" }),
      makeEvent({ result: "spelling_near_miss", operation: "fill", itemIds: [ITEM], clientEventId: "c" }),
      makeEvent({ result: "empty_or_skip", operation: "fill", itemIds: [ITEM], clientEventId: "d" }),
    ]).items[ITEM];
    assert(m.productionAttempts === 4, "all four production events count as attempts");
    assert(m.productionSuccess === 1, "only the correct answer is a success");
    assert(m.productionFailure === 0, "near-miss and skip never count as production failures");
  });
});
