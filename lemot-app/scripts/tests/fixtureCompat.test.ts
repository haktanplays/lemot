/**
 * Fixture → canonical compatibility tests (PR-01).
 *
 * The boundary's whole purpose is that a fixture id can never masquerade as a
 * learner-history key. These tests pin the safety properties that make that
 * true: explicit-only mapping, no chains/cycles, no separator conversion, no
 * surface-text guessing, and a persistence guard that fails loudly.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { isCanonicalItemId } from "../../content/identity/canonicalItems";
import {
  AMBIGUOUS_FIXTURE_ITEM_IDS,
  CONFLICTING_GRANULARITY_FIXTURE_ITEM_IDS,
  FIXTURE_ITEM_ALIASES,
  FIXTURE_ONLY_ITEM_IDS,
  NonCanonicalPersistenceError,
  assertPersistableItemId,
  assertPersistableItemIds,
  hasFixtureAlias,
  resolveFixtureItemId,
  toCanonicalItemId,
} from "../../content/identity/fixtureCompat";

const REGISTRY_IDS = new Set(Object.keys(ITEM_REGISTRY));

function expectThrows(fn: () => unknown, what: string): unknown {
  let caught: unknown = null;
  try {
    fn();
  } catch (e) {
    caught = e;
  }
  assert(caught !== null, `expected ${what} to throw`);
  return caught;
}

describe("fixture compatibility boundary", () => {
  test("every alias target exists in ITEM_REGISTRY", () => {
    for (const [fixtureId, target] of Object.entries(FIXTURE_ITEM_ALIASES)) {
      assert(
        REGISTRY_IDS.has(target),
        `alias "${fixtureId}" targets "${target}", missing from ITEM_REGISTRY`,
      );
    }
  });

  test("alias keys are unique and never canonical themselves", () => {
    const keys = Object.keys(FIXTURE_ITEM_ALIASES);
    assertEqual(new Set(keys).size, keys.length, "duplicate alias key");
    for (const key of keys) {
      assert(!isCanonicalItemId(key), `alias key "${key}" must not be a canonical id`);
    }
  });

  test("no alias chain and no alias cycle", () => {
    const keys = new Set(Object.keys(FIXTURE_ITEM_ALIASES));
    for (const [key, target] of Object.entries(FIXTURE_ITEM_ALIASES)) {
      assert(!keys.has(target), `alias "${key}" chains into another alias key "${target}"`);
      assert(target !== key, `alias "${key}" is a self-cycle`);
    }
  });

  test("exact L1 overlaps resolve to canonical ids", () => {
    const expected: Record<string, string> = {
      "chunk:bonjour": "chunk-bonjour",
      "chunk:je-voudrais": "chunk-je-voudrais",
      "chunk:s-il-vous-plait": "chunk-sil-vous-plait",
      "chunk:merci": "chunk-merci",
      "chunk:au-revoir": "chunk-au-revoir",
    };
    for (const [fixtureId, canonical] of Object.entries(expected)) {
      assertEqual(resolveFixtureItemId(fixtureId), canonical, `resolve ${fixtureId}`);
      assertEqual(toCanonicalItemId(fixtureId), canonical, `toCanonical ${fixtureId}`);
      const persisted = assertPersistableItemId(fixtureId);
      assertEqual(persisted, canonical, `persisted id for ${fixtureId}`);
      assert(isCanonicalItemId(persisted), `resolved id must satisfy ItemId: ${persisted}`);
    }
  });

  test("the differing-slug case is covered explicitly, not by conversion", () => {
    // `chunk:s-il-vous-plait` -> `chunk-sil-vous-plait`: a naive ":"->"-" swap
    // would produce `chunk-s-il-vous-plait`, which does not exist.
    assert(
      !REGISTRY_IDS.has("chunk-s-il-vous-plait"),
      "precondition: the separator-swapped id must not exist",
    );
    assertEqual(
      resolveFixtureItemId("chunk:s-il-vous-plait"),
      "chunk-sil-vous-plait",
      "explicit mapping must win",
    );
  });

  test("no automatic separator conversion for unmapped ids", () => {
    // `chunk:je-vais` has a same-slug canonical twin (`chunk-je-vais`), but it
    // is NOT in the L1 alias table, so it must not resolve by coincidence.
    assert(REGISTRY_IDS.has("chunk-je-vais"), "precondition: canonical twin exists");
    assert(!hasFixtureAlias("chunk:je-vais"), "precondition: not aliased in this PR");
    assertEqual(resolveFixtureItemId("chunk:je-vais"), null, "must not auto-convert");
    expectThrows(() => assertPersistableItemId("chunk:je-vais"), "unmapped fixture id");
  });

  test("ambiguous noun/package granularity is not silently mapped", () => {
    for (const id of AMBIGUOUS_FIXTURE_ITEM_IDS) {
      assert(!hasFixtureAlias(id), `ambiguous id "${id}" must not be mapped`);
      assertEqual(resolveFixtureItemId(id), null, `ambiguous id "${id}" must not resolve`);
      expectThrows(() => assertPersistableItemId(id), `ambiguous id "${id}"`);
    }
    // Both candidate canonical identities still exist — the ambiguity is real,
    // not an artefact of a missing registry row.
    assert(REGISTRY_IDS.has("noun-cafe"), "noun-cafe must still ship");
    assert(REGISTRY_IDS.has("chunk-un-cafe"), "chunk-un-cafe must still ship");
  });

  test("fixture-only and conflicting-granularity ids are unmapped and unpersistable", () => {
    for (const id of [
      ...FIXTURE_ONLY_ITEM_IDS,
      ...CONFLICTING_GRANULARITY_FIXTURE_ITEM_IDS,
    ]) {
      assert(!hasFixtureAlias(id), `"${id}" must not be mapped`);
      const err = expectThrows(() => assertPersistableItemId(id, "test"), `"${id}"`);
      assert(
        err instanceof NonCanonicalPersistenceError,
        `expected NonCanonicalPersistenceError for "${id}"`,
      );
    }
  });

  test("no surface-text lookup: identical French does not imply mapping", () => {
    // `noun_phrase:un-cafe` and canonical `chunk-un-cafe` share the surface
    // "un café" exactly, yet the fixture id must still not resolve.
    assertEqual(resolveFixtureItemId("noun_phrase:un-cafe"), null, "surface match must not map");
  });

  test("canonical ids pass the persistence guard unchanged", () => {
    assertEqual(assertPersistableItemId("chunk-merci"), "chunk-merci", "canonical passthrough");
    assertEqual(
      assertPersistableItemIds(["chunk-merci", "chunk:merci"]).join("|"),
      "chunk-merci|chunk-merci",
      "list resolution should normalise to canonical ids",
    );
  });

  test("arbitrary strings never fall back silently", () => {
    for (const bad of ["", "merci", "chunk-", "random-string", "chunk:unknown"]) {
      expectThrows(() => assertPersistableItemId(bad), `bad id ${JSON.stringify(bad)}`);
    }
  });
});
