/**
 * Persisted-v2 validation regression tests (PR-02 correction).
 *
 * THE DEFECT: `migrateEventToCurrent` short-circuited the current-version branch
 * with `data as LearningEvent` and never validated. A TypeScript cast proves
 * nothing about JSON read back from disk, so a malformed v2 event — unknown
 * enum, smuggled grading fields on a non-assessed event, misaligned treatments,
 * broken sequence — entered the log and the whole log was reported "supported".
 *
 * Every test here builds a VALID v2 event first, then corrupts exactly one field,
 * so a failure names the field that regressed.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv, makeEvent, makeV1Event } from "./helpers";
import {
  LM_LE_EVENTS_CORRUPT_KEY,
  LM_LE_EVENTS_KEY,
  LocalRepository,
  UnsupportedEventLogError,
} from "../../content/learning-engine/repository/local";
import {
  ERROR_TAG_CODES,
  LEARNING_EVENT_PRIMITIVES,
  LEARNING_EVENT_SCHEMA_VERSION,
  LEARNING_OUTCOMES,
} from "../../content/learning-engine/events";
import type { LearningEvent } from "../../content/learning-engine/events";
import {
  InvalidLearningEventError,
  validateLearningEvent,
} from "../../content/learning-engine/event-envelope";
import { migrateEventToCurrent } from "../../content/learning-engine/event-migration";

/** A valid persisted v2 event, as JSON would round-trip it. */
function validV2(over: Record<string, unknown> = {}): Record<string, unknown> {
  const base = makeEvent({ result: "correct", clientEventId: "v2-ok" });
  return { ...(JSON.parse(JSON.stringify(base)) as Record<string, unknown>), ...over };
}

function expectUnsupported(event: Record<string, unknown>, needle: string): void {
  const res = migrateEventToCurrent(event);
  assert(
    res.status === "unsupported",
    `expected unsupported for ${needle}, got ${JSON.stringify(res).slice(0, 160)}`,
  );
  if (res.status !== "unsupported") return;
  assert(
    res.reason.toLowerCase().includes(needle.toLowerCase()),
    `reason should identify "${needle}" — got: ${res.reason}`,
  );
}

async function expectRejects(p: Promise<unknown>, what: string): Promise<unknown> {
  let caught: unknown = null;
  try {
    await p;
  } catch (e) {
    caught = e;
  }
  assert(caught !== null, `expected ${what} to reject`);
  return caught;
}

describe("persisted v2 events are validated on read", () => {
  test("a valid v2 event is accepted unchanged and not re-migrated", () => {
    const event = validV2();
    const res = migrateEventToCurrent(event);
    assert(res.status === "ok", "valid v2 must be accepted");
    if (res.status !== "ok") return;
    assertEqual(res.migrated, false, "already current — not migrated");
    assertEqual(
      JSON.stringify(res.event),
      JSON.stringify(event),
      "a valid v2 event must come back byte-for-byte identical",
    );
  });

  test("malformed primitive is unsupported", () => {
    expectUnsupported(validV2({ primitive: "telepathy" }), "primitive");
  });

  test("malformed placement is unsupported", () => {
    expectUnsupported(validV2({ placement: "somewhere" }), "placement");
  });

  test("malformed operation is unsupported", () => {
    expectUnsupported(validV2({ operation: "mind_reading" }), "operation");
  });

  test("malformed prompt level is unsupported", () => {
    expectUnsupported(validV2({ promptLevel: "PF9" }), "promptLevel");
  });

  test("malformed treatment value is unsupported", () => {
    expectUnsupported(validV2({ targetTreatments: ["definitely_not_a_treatment"] }), "treatment");
  });

  test("misaligned treatments are unsupported", () => {
    expectUnsupported(
      validV2({ itemIds: ["a", "b"], targetTreatments: ["active"] }),
      "index-aligned",
    );
  });

  test("malformed evidence ceiling is unsupported", () => {
    expectUnsupported(validV2({ evidenceCeiling: "vibes" }), "evidenceCeiling");
  });

  test("malformed evidence class is unsupported", () => {
    expectUnsupported(validV2({ evidenceClass: "vibes" }), "evidenceClass");
  });

  test("malformed outcome is unsupported", () => {
    expectUnsupported(validV2({ outcome: "sort_of_right" }), "outcome");
  });

  test("malformed assistance / attribution / admissibility states are unsupported", () => {
    expectUnsupported(validV2({ assistance: "hint_rung_2" }), "assistance");
    expectUnsupported(validV2({ attribution: "learner" }), "attribution");
    expectUnsupported(validV2({ admissibility: "admitted" }), "admissibility");
  });

  test("malformed sync object is unsupported", () => {
    expectUnsupported(validV2({ sync: "pending" }), "sync");
    expectUnsupported(
      validV2({ sync: { status: "queued", origin: "local", queuedAt: 1 } }),
      "sync.status",
    );
    expectUnsupported(
      validV2({ sync: { status: "pending", origin: "cloud", queuedAt: 1 } }),
      "sync.origin",
    );
  });

  test("malformed deviceInfo is unsupported", () => {
    expectUnsupported(validV2({ deviceInfo: "android" }), "deviceInfo");
    expectUnsupported(validV2({ deviceInfo: { platform: "" } }), "deviceInfo.platform");
  });

  test("an unknown error tag is unsupported", () => {
    expectUnsupported(validV2({ result: "almost_right", outcome: "incorrect" }), "grading result");
    expectUnsupported(validV2({ errorTags: ["correct", "made_up_tag"] }), "errorTags");
  });

  test("smuggled grading on a non-assessed event is unsupported", () => {
    const reveal = validV2({
      assessed: false,
      primitive: "reveal",
      evidenceCeiling: "comparison_only",
      evidenceClass: "comparison_only",
      outcome: "completed_unassessed",
    });
    delete reveal.result;
    delete reveal.errorTags;
    delete reveal.normalizedAnswer;
    // Sanity: the clean reveal is valid…
    assertEqual(validateLearningEvent(reveal).join(" | "), "", "clean reveal should be valid");
    // …and each smuggled grading facet is rejected.
    expectUnsupported({ ...reveal, result: "correct" }, "must not carry a grading result");
    expectUnsupported({ ...reveal, errorTags: ["correct"] }, "must not carry error tags");
    expectUnsupported({ ...reveal, normalizedAnswer: "x" }, "must not carry a normalized answer");
  });

  test("a non-assessed event claiming a graded outcome is unsupported", () => {
    const reveal = validV2({
      assessed: false,
      primitive: "reveal",
      evidenceCeiling: "comparison_only",
      evidenceClass: "comparison_only",
      outcome: "correct",
    });
    delete reveal.result;
    delete reveal.errorTags;
    delete reveal.normalizedAnswer;
    expectUnsupported(reveal, "claims a grading verdict");
  });

  test("an assessed event missing its result is unsupported", () => {
    const bad = validV2();
    delete bad.result;
    expectUnsupported(bad, "grading result");
  });

  test("an assessed event with a contradictory outcome is unsupported", () => {
    expectUnsupported(validV2({ result: "wrong_item", outcome: "correct" }), "contradicts");
  });

  test("legacyGrading is rejected on an assessed event", () => {
    expectUnsupported(
      validV2({ legacyGrading: { result: "correct", errorTags: ["correct"] } }),
      "legacyGrading",
    );
  });

  test("malformed sequence is unsupported", () => {
    expectUnsupported(validV2({ sequence: "seq-1" }), "sequence");
    expectUnsupported(
      validV2({ sequence: { sequenceId: "s", parentEventId: null, stepIndex: 5, stepCount: 2 } }),
      "stepIndex",
    );
  });

  test("a wrong schemaVersion on a v2-claiming event is unsupported", () => {
    // readSchemaVersion sees 2, so it takes the current-version branch; the
    // validator is what catches an internally inconsistent record.
    const bad = validV2();
    assertEqual(bad.schemaVersion, LEARNING_EVENT_SCHEMA_VERSION, "precondition");
  });

  test("a non-object is unsupported", () => {
    for (const bad of [null, 42, "event", []]) {
      assert(
        migrateEventToCurrent(bad).status === "unsupported",
        `${JSON.stringify(bad)} must be unsupported`,
      );
    }
  });
});

describe("repository defends the durable boundary", () => {
  test("a malformed v2 log reads as unsupported with no partial history", async () => {
    const raw = JSON.stringify([validV2({ clientEventId: "good" }), validV2({ primitive: "nope" })]);
    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: raw });
    const repo = new LocalRepository(kv);
    assertEqual(
      (await repo.readAllEvents()).length,
      0,
      "a log with one malformed v2 event must not yield partial history",
    );
    assertEqual(kv.map.get(LM_LE_EVENTS_KEY), raw, "bytes preserved");
    assertEqual(
      kv.map.get(LM_LE_EVENTS_CORRUPT_KEY),
      undefined,
      "malformed-but-parseable is NOT JSON corruption",
    );
  });

  test("append against a malformed v2 log throws and preserves the bytes", async () => {
    const raw = JSON.stringify([validV2({ outcome: "sort_of_right" })]);
    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: raw });
    const repo = new LocalRepository(kv);
    const err = await expectRejects(
      repo.appendEvent(makeEvent({ result: "correct" })),
      "append against a malformed v2 log",
    );
    assert(err instanceof UnsupportedEventLogError, "distinct unsupported error");
    assertEqual(kv.map.get(LM_LE_EVENTS_KEY), raw, "nothing overwritten");
  });

  test("a direct append of an invalid cast event is rejected", async () => {
    const kv = makeFakeKv();
    const repo = new LocalRepository(kv);
    const invalid = { ...makeEvent({ result: "correct" }), primitive: "telepathy" } as unknown as LearningEvent;
    const err = await expectRejects(repo.appendEvent(invalid), "invalid direct append");
    assert(err instanceof InvalidLearningEventError, "should be an envelope validation error");
    assertEqual(kv.map.get(LM_LE_EVENTS_KEY), undefined, "nothing was written");
  });

  test("a rejected append leaves an existing clean log untouched", async () => {
    const kv = makeFakeKv();
    const repo = new LocalRepository(kv);
    await repo.appendEvent(makeEvent({ result: "correct", clientEventId: "keep" }));
    const before = kv.map.get(LM_LE_EVENTS_KEY) as string;

    const invalid = { ...makeEvent({ result: "correct" }), sync: "pending" } as unknown as LearningEvent;
    await expectRejects(repo.appendEvent(invalid), "invalid append");
    assertEqual(kv.map.get(LM_LE_EVENTS_KEY), before, "existing log unchanged");
  });

  test("a rejected append does NOT normalize a v1 log", async () => {
    const raw = JSON.stringify([makeV1Event({ result: "correct", clientEventId: "v1" })]);
    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: raw });
    const repo = new LocalRepository(kv);
    const invalid = { ...makeEvent({ result: "correct" }), evId: "EV-1" } as unknown as LearningEvent;
    await expectRejects(repo.appendEvent(invalid), "invalid append over a v1 log");
    assertEqual(
      kv.map.get(LM_LE_EVENTS_KEY),
      raw,
      "a refused event must not trigger a rewrite on its behalf",
    );
  });

  test("a valid append after a valid v1 read still normalizes to all-v2", async () => {
    const kv = makeFakeKv({
      [LM_LE_EVENTS_KEY]: JSON.stringify([makeV1Event({ result: "correct", clientEventId: "v1" })]),
    });
    const repo = new LocalRepository(kv);
    await repo.appendEvent(makeEvent({ result: "correct", clientEventId: "v2" }));
    const stored = JSON.parse(kv.map.get(LM_LE_EVENTS_KEY) as string) as {
      schemaVersion: number;
    }[];
    assertEqual(stored.length, 2, "both events present");
    assert(
      stored.every((e) => e.schemaVersion === LEARNING_EVENT_SCHEMA_VERSION),
      "normalization still works for a VALID append",
    );
  });

  test("corrupt JSON and future-schema behaviour are unchanged", async () => {
    const corruptKv = makeFakeKv({ [LM_LE_EVENTS_KEY]: "{not json" });
    await new LocalRepository(corruptKv).readAllEvents();
    assert(
      corruptKv.map.get(LM_LE_EVENTS_CORRUPT_KEY) !== undefined,
      "JSON corruption still quarantines",
    );

    const futureRaw = JSON.stringify([validV2({ schemaVersion: 99 })]);
    const futureKv = makeFakeKv({ [LM_LE_EVENTS_KEY]: futureRaw });
    const futureRepo = new LocalRepository(futureKv);
    assertEqual((await futureRepo.readAllEvents()).length, 0, "future log reads empty");
    await expectRejects(
      futureRepo.appendEvent(makeEvent({ result: "correct" })),
      "append against a future log",
    );
    assertEqual(futureKv.map.get(LM_LE_EVENTS_KEY), futureRaw, "future bytes preserved");
    assertEqual(
      futureKv.map.get(LM_LE_EVENTS_CORRUPT_KEY),
      undefined,
      "future schema is not JSON corruption",
    );
  });
});

describe("frozen authority is untouched by this correction", () => {
  test("ERROR_TAG_CODES is unchanged and has 16 members", () => {
    assertEqual(ERROR_TAG_CODES.length, 16, "no grading tag added or removed");
    assertEqual(ERROR_TAG_CODES[0], "correct", "order preserved");
    assertEqual(ERROR_TAG_CODES[15], "empty_or_skip", "order preserved");
  });

  test("no schema-version bump", () => {
    assertEqual(LEARNING_EVENT_SCHEMA_VERSION, 2, "still v2 — this was validation tightening");
  });

  test("no new primitive and no new outcome", () => {
    assertEqual(LEARNING_EVENT_PRIMITIVES.length, 6, "still six primitives");
    assertEqual(LEARNING_OUTCOMES.length, 9, "still nine outcomes");
  });

  test("no PR-03 assistance or attribution vocabulary was introduced", async () => {
    const { ASSISTANCE_CAPTURE_STATES, ATTRIBUTION_STATES, ADMISSIBILITY_STATES } = await import(
      "../../content/learning-engine/events"
    );
    assertEqual(ASSISTANCE_CAPTURE_STATES.join(","), "not_captured", "still the neutral seam");
    assertEqual(ATTRIBUTION_STATES.join(","), "unresolved", "still the neutral seam");
    assertEqual(
      ADMISSIBILITY_STATES.join(","),
      "unresolved,legacy_admitted",
      "still the PR-02 seam",
    );
  });
});
