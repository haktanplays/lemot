/**
 * Area 4 — mastery.ts near-miss / precision regression.
 *
 * Guarantees the precision policy (see
 * docs/status/founder-self-learning-mastery-precision-policy.md): meaning-
 * preserving slips (punctuation_only / accent_only / spelling_near_miss) are
 * soft precision signals — they never count as failure, never step down
 * prompt-fade or the leitner box, and never make an item weak; real repeated
 * failures still do. Production success still adds to Mon Lexique. Reducer stays
 * pure + idempotent.
 */
import { describe, test, assert, assertEqual, clone } from "./harness";
import { makeEvent } from "./helpers";
import {
  scoreEvent,
  scoreEvents,
  createEmptyMasterySnapshot,
} from "../../content/learning-engine/mastery";

const ITEM = "item-precision";

describe("Area 4 — mastery.ts near-miss regression", () => {
  test("punctuation_only increments precisionCount/precisionTags, not wrongCount", () => {
    const snap = scoreEvents([
      makeEvent({ result: "punctuation_only", operation: "fill", itemIds: [ITEM] }),
    ]);
    const m = snap.items[ITEM];
    assert(m.precisionCount === 1, "precisionCount must be 1");
    assert((m.precisionTags.punctuation_only ?? 0) === 1, "precisionTags.punctuation_only must be 1");
    assert(m.wrongCount === 0, "wrongCount must stay 0");
    assert(m.productionFailure === 0, "productionFailure must stay 0");
  });

  test("accent_only increments precisionCount/precisionTags, not weakTags", () => {
    const snap = scoreEvents([
      makeEvent({ result: "accent_only", operation: "fill", itemIds: [ITEM] }),
    ]);
    const m = snap.items[ITEM];
    assert(m.precisionCount === 1, "precisionCount must be 1");
    assert((m.precisionTags.accent_only ?? 0) === 1, "precisionTags.accent_only must be 1");
    assert(Object.keys(m.weakTags).length === 0, "weakTags must stay empty");
  });

  test("spelling_near_miss does not lower promptFadeLevel", () => {
    // Raise prompt-fade + box with a success, then a near-miss must NOT lower them.
    const snap = scoreEvents([
      makeEvent({ result: "correct", operation: "fill", itemIds: [ITEM], clientEventId: "ok" }),
      makeEvent({ result: "spelling_near_miss", operation: "fill", itemIds: [ITEM], clientEventId: "nm" }),
    ]);
    const m = snap.items[ITEM];
    assert(m.promptFadeLevel === "PF1", "promptFadeLevel must stay raised at PF1");
  });

  test("near-miss does not lower leitnerBox", () => {
    const snap = scoreEvents([
      makeEvent({ result: "correct", operation: "fill", itemIds: [ITEM], clientEventId: "ok" }),
      makeEvent({ result: "accent_only", operation: "fill", itemIds: [ITEM], clientEventId: "nm" }),
    ]);
    const m = snap.items[ITEM];
    assert(m.leitnerBox === 1, "leitnerBox must stay raised at 1");
  });

  test("repeated near-misses do not make the item weak", () => {
    const events = Array.from({ length: 5 }, (_, i) =>
      makeEvent({ result: "punctuation_only", operation: "fill", itemIds: [ITEM], clientEventId: `nm-${i}` }),
    );
    const m = scoreEvents(events).items[ITEM];
    assert(m.isWeak === false, "item must not be weak from near-misses");
    assert(m.monLexiqueStatus !== "weak", "Mon Lexique must not flag weak");
  });

  test("precision-only item is Build-eligible, not Challenge", () => {
    const m = scoreEvents([
      makeEvent({ result: "punctuation_only", operation: "fill", itemIds: [ITEM] }),
    ]).items[ITEM];
    // "build" is mutually exclusive with "challenge", so asserting build also
    // proves it is not surfaced as a Challenge.
    assert(
      m.practiceEligibility === "build",
      `precision-only item must be build-eligible (not challenge); got ${m.practiceEligibility}`,
    );
  });

  test("real repeated failures still make the item weak", () => {
    const events = Array.from({ length: 3 }, (_, i) =>
      makeEvent({ result: "wrong_item", operation: "fill", itemIds: [ITEM], clientEventId: `bad-${i}` }),
    );
    const m = scoreEvents(events).items[ITEM];
    assert(m.isWeak === true, "3 real failures must make the item weak");
    assert(m.practiceEligibility === "challenge", "weak item must be challenge");
    assert(m.monLexiqueStatus === "weak", "Mon Lexique must flag weak");
  });

  test("production success still sets Mon Lexique added", () => {
    const m = scoreEvents([
      makeEvent({ result: "correct", operation: "fill", itemIds: [ITEM] }),
    ]).items[ITEM];
    assert(m.productionSuccess === 1, "productionSuccess must be 1");
    assert(m.monLexiqueStatus === "added", "Mon Lexique must be added");
  });

  test("reducer does not mutate input and is idempotent by clientEventId", () => {
    const base = createEmptyMasterySnapshot();
    const before = clone(base);
    const event = makeEvent({ result: "correct", operation: "fill", itemIds: [ITEM], clientEventId: "dup" });
    scoreEvent(base, event);
    assertEqual(base, before, "scoreEvent must not mutate the input snapshot");
    const once = scoreEvents([event]);
    const twice = scoreEvents([event, event]);
    assertEqual(twice, once, "re-applying the same clientEventId must be a no-op");
  });
});
