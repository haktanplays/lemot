/**
 * Canonical item boundary tests (PR-01).
 *
 * Proves D-2: `content/itemRegistry.ts` is the canonical runtime registry and
 * every shipped id survives this PR byte-for-byte (ADR-0012 / YASA 2). The
 * existing shippedItemIds.test.ts covers the manifest↔registry contract; these
 * tests cover the boundary helpers and re-assert immutability from the
 * boundary's own view so a future refactor of either side cannot drift.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { loadShippedManifest } from "../shippedItemIds";
import {
  CANONICAL_ITEM_COUNT,
  CANONICAL_ITEM_IDS,
  CANONICAL_ITEM_ID_SET,
  UnknownCanonicalItemError,
  assertCanonicalItemId,
  getCanonicalItem,
  isCanonicalItemId,
} from "../../content/identity/canonicalItems";

describe("canonical item boundary", () => {
  test("every ITEM_REGISTRY key equals its record id", () => {
    for (const [key, record] of Object.entries(ITEM_REGISTRY)) {
      assertEqual(
        (record as { id: string }).id,
        key,
        `registry key "${key}" does not match its record id`,
      );
    }
  });

  test("no duplicate canonical id", () => {
    assertEqual(
      new Set(CANONICAL_ITEM_IDS).size,
      CANONICAL_ITEM_IDS.length,
      "CANONICAL_ITEM_IDS contains a duplicate",
    );
  });

  test("boundary id list matches the registry exactly", () => {
    assertEqual(
      CANONICAL_ITEM_IDS.slice().sort().join("|"),
      Object.keys(ITEM_REGISTRY).sort().join("|"),
      "boundary id list drifted from ITEM_REGISTRY",
    );
    assertEqual(CANONICAL_ITEM_COUNT, Object.keys(ITEM_REGISTRY).length, "count drift");
  });

  test("every shipped manifest id is still present — no rename, no deletion", () => {
    const manifest = loadShippedManifest();
    const missing = manifest.ids.filter((id) => !CANONICAL_ITEM_ID_SET.has(id));
    assertEqual(
      missing.join(", "),
      "",
      `shipped itemId immutability violated (ADR-0012): missing ${missing.join(", ")}`,
    );
  });

  test("no canonical id was added without a manifest record", () => {
    const manifest = new Set(loadShippedManifest().ids);
    const unrecorded = CANONICAL_ITEM_IDS.filter((id) => !manifest.has(id));
    assertEqual(
      unrecorded.join(", "),
      "",
      `unrecorded new itemId(s): ${unrecorded.join(", ")} — record in the same PR`,
    );
  });

  test("canonical lookup succeeds and narrows", () => {
    assert(isCanonicalItemId("chunk-bonjour"), "chunk-bonjour must be canonical");
    assertEqual(assertCanonicalItemId("chunk-bonjour"), "chunk-bonjour", "assert should echo");
    assertEqual(
      (getCanonicalItem("chunk-bonjour") as { id: string }).id,
      "chunk-bonjour",
      "lookup returned the wrong record",
    );
  });

  test("unknown lookup fails deterministically", () => {
    assert(!isCanonicalItemId("chunk-does-not-exist"), "unknown id must not narrow");
    let caught: unknown = null;
    try {
      assertCanonicalItemId("chunk-does-not-exist", "test");
    } catch (e) {
      caught = e;
    }
    assert(
      caught instanceof UnknownCanonicalItemError,
      "expected UnknownCanonicalItemError for an unknown id",
    );
    assertEqual(
      (caught as UnknownCanonicalItemError).id,
      "chunk-does-not-exist",
      "error should carry the offending id",
    );
  });

  test("a fixture colon id is NOT canonical", () => {
    assert(!isCanonicalItemId("chunk:bonjour"), "fixture colon id must never be canonical");
    assert(
      !CANONICAL_ITEM_ID_SET.has("noun_phrase:un-cafe"),
      "fixture package id must never be canonical",
    );
  });
});

/**
 * L17's three ratified identities, and — just as load-bearing — the identities
 * that were deliberately NOT created alongside them.
 *
 * Every absence below is a decision, not an omission: `chunk-ca-va-question`
 * would let punctuation mint an identity (the rising-intonation ask is a USE of
 * the frozen chunk, as `Je peux faire une pause ?` is of chunk-je-peux);
 * `chunk-ca-ne-va-pas` would re-teach an owned operation (the negative is
 * composed, per the je-ne-peux-pas canon); a `chunk-je-suis-fatigue` composite
 * would duplicate what `chunk-je-suis` + the adjective already carries; and a
 * separate feminine id would break PRJ-015 IC-005, which names content/contente
 * as its own worked example.
 */
describe("L17 social-state identities", () => {
  const L17_IDS = ["chunk-ca-va", "adj-fatigue", "adj-content"] as const;

  test("all three ratified identities exist", () => {
    for (const id of L17_IDS) {
      assert(CANONICAL_ITEM_ID_SET.has(id), `${id} must be registered`);
    }
  });

  test("both state adjectives use the existing adjective type", () => {
    for (const id of ["adj-fatigue", "adj-content"]) {
      assertEqual(
        (ITEM_REGISTRY as Record<string, { type: string }>)[id].type,
        "adjective",
        `${id} uses the type that already existed in LearningItemType`,
      );
    }
  });

  test("the check-in stays a frozen chunk, not an aller/futur doorway", () => {
    const caVa = (ITEM_REGISTRY as Record<string, { type: string; meaning: string }>)[
      "chunk-ca-va"
    ];
    assertEqual(caVa.type, "chunk", "frozen social formula");
    assert(/frozen/i.test(caVa.meaning), "the meaning says so in learner terms");
    assert(
      /not\s+productive\s+aller/i.test(caVa.meaning) && /futur/i.test(caVa.meaning),
      "the homograph guard is recorded on the identity itself",
    );
  });

  test("no feminine alternant became its own identity", () => {
    for (const id of ["adj-fatiguee", "adj-contente", "word-fatiguee", "word-contente"]) {
      assert(!CANONICAL_ITEM_ID_SET.has(id), `${id} must not exist (IC-005)`);
    }
  });

  test("the deliberately-absent identities are still absent", () => {
    for (const id of [
      "chunk-ca-va-question",
      "chunk-ca-ne-va-pas",
      "chunk-je-suis-fatigue",
      "chunk-je-suis-content",
      "word-fatigue",
      "chunk-je-comprends",
    ]) {
      assert(!CANONICAL_ITEM_ID_SET.has(id), `${id} must not exist — see the module note`);
    }
  });

  test("none of the three carries an acquisition link or component relation", () => {
    for (const id of L17_IDS) {
      const item = (ITEM_REGISTRY as Record<string, Record<string, unknown>>)[id];
      assertEqual(item.acquisitionLink, undefined, `${id} needs no link`);
      assertEqual(item.acquisitionComponents, undefined, `${id} needs no components`);
    }
  });
});
