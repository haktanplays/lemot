/**
 * YASA 2 — shipped itemId immutability contracts (docs/ROADMAP.md).
 *
 * Locks the manifest mechanism itself: the real manifest must pass against
 * the real registry, and the pure checker must hard-error on deletion,
 * rename, duplication, and unsorted hand-edits — while leaving brand-new
 * registry ids free (additions are not violations).
 */
import { describe, test, assert, assertEqual } from "./harness";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { loadShippedManifest, checkShippedItemIds } from "../shippedItemIds";

describe("shipped itemId manifest (YASA 2)", () => {
  test("real manifest passes against the real registry", () => {
    const manifest = loadShippedManifest();
    assert(manifest.ids.length > 0, "manifest must not be empty");
    const result = checkShippedItemIds(manifest.ids, new Set(Object.keys(ITEM_REGISTRY)));
    assertEqual(result.errors, [], "shipped manifest must be clean against the registry");
  });

  test("real manifest is sorted and unique", () => {
    const { ids } = loadShippedManifest();
    assertEqual(ids, [...ids].sort(), "manifest ids must stay alphabetically sorted");
    assertEqual(ids.length, new Set(ids).size, "manifest ids must be unique");
  });

  test("deleting a shipped id from the registry is a hard error", () => {
    const manifestIds = ["a-id", "b-id", "c-id"];
    const registry = new Set(["a-id", "c-id"]); // b-id deleted
    const result = checkShippedItemIds(manifestIds, registry);
    assertEqual(result.errors.length, 1, "exactly one violation expected");
    assert(
      result.errors[0].includes('"b-id"') && result.errors[0].includes("immutable"),
      `error must name the deleted id: ${result.errors[0]}`,
    );
  });

  test("renaming a shipped id errors twice: old id vanished AND new id unrecorded", () => {
    const manifestIds = ["a-id", "b-id"];
    const registry = new Set(["a-id", "b-id-renamed"]); // rename = delete + add
    const result = checkShippedItemIds(manifestIds, registry);
    assertEqual(result.errors.length, 2, "both directions of the rename are violations");
    assert(result.errors[0].includes('"b-id"'), "first error names the old id");
    assert(result.errors[1].includes('"b-id-renamed"'), "second error names the unrecorded new id");
    assertEqual(result.unrecorded, ["b-id-renamed"], "unrecorded list still reported");
  });

  test("K3: an unrecorded new registry id is a HARD ERROR with the same-PR message", () => {
    const result = checkShippedItemIds(["a-id"], new Set(["a-id", "z-new-id"]));
    assertEqual(result.errors.length, 1, "unrecorded id must error");
    assert(
      result.errors[0].includes("recorded in the same PR") &&
        result.errors[0].includes("npm run manifest:add -- z-new-id"),
      `error must carry the same-PR instruction: ${result.errors[0]}`,
    );
  });

  test("K3: recording the id in the manifest makes the check green again", () => {
    const result = checkShippedItemIds(["a-id", "z-new-id"], new Set(["a-id", "z-new-id"]));
    assertEqual(result.errors, [], "manifest updated in the same PR -> clean");
    assertEqual(result.unrecorded, [], "nothing left unrecorded");
  });

  test("duplicated and unsorted manifests are rejected (hand-edit guard)", () => {
    const dup = checkShippedItemIds(["a-id", "a-id"], new Set(["a-id"]));
    assert(dup.errors.some((e) => e.includes("twice")), "duplicate id must error");
    const unsorted = checkShippedItemIds(["b-id", "a-id"], new Set(["a-id", "b-id"]));
    assert(
      unsorted.errors.some((e) => e.includes("sorted")),
      "unsorted manifest must error",
    );
  });

  test("checker is deterministic for identical input", () => {
    const ids = ["a-id", "b-id", "missing-id"];
    const registry = new Set(["a-id", "b-id", "extra-id"]);
    const first = checkShippedItemIds(ids, registry);
    const second = checkShippedItemIds(ids, registry);
    assertEqual(first, second, "same input must produce identical output");
  });
});
