/**
 * YASA 3 — shipped error-tag immutability contracts (K3's twin).
 *
 * Error tags are the factory's order language (error → tag → drill) and the
 * reference key of learner evidence (weakTags / precisionTags / resultTag).
 * These tests lock the manifest mechanism: real manifest clean against real
 * usage; deletion, rename, duplication, unsorted hand-edits and unrecorded
 * new tags all hard-error; recording heals; deterministic.
 */
import { describe, test, assert, assertEqual } from "./harness";
import {
  loadShippedTagManifest,
  collectUsedTags,
  checkShippedErrorTags,
} from "../shippedErrorTags";

describe("shipped error-tag manifest (YASA 3)", () => {
  test("real manifest passes against real usage", () => {
    const manifest = loadShippedTagManifest();
    assert(manifest.tags.length > 0, "manifest must not be empty");
    const result = checkShippedErrorTags(manifest.tags, new Set(collectUsedTags()));
    assertEqual(result.errors, [], "shipped tag manifest must be clean");
    assertEqual(result.unrecorded, [], "no used tag may be unrecorded");
  });

  test("real manifest is sorted, unique, and matches collectUsedTags exactly", () => {
    const { tags } = loadShippedTagManifest();
    assertEqual(tags, [...tags].sort(), "manifest tags must stay alphabetically sorted");
    assertEqual(tags.length, new Set(tags).size, "manifest tags must be unique");
    assertEqual(tags, collectUsedTags(), "manifest is the exact frozen usage set");
  });

  test("deleting a shipped tag from usage is a hard error", () => {
    const result = checkShippedErrorTags(["a-tag", "b-tag"], new Set(["a-tag"]));
    assertEqual(result.errors.length, 1, "exactly one violation");
    assert(
      result.errors[0].includes('"b-tag"') && result.errors[0].includes("immutable"),
      `error must name the vanished tag: ${result.errors[0]}`,
    );
  });

  test("renaming a shipped tag errors twice: old gone AND new unrecorded", () => {
    const result = checkShippedErrorTags(["a-tag", "b-tag"], new Set(["a-tag", "b-tag-renamed"]));
    assertEqual(result.errors.length, 2, "both directions of the rename are violations");
    assert(result.errors[0].includes('"b-tag"'), "first error names the old tag");
    assert(result.errors[1].includes('"b-tag-renamed"'), "second error names the new tag");
  });

  test("an unrecorded new tag is a HARD ERROR with the same-PR instruction", () => {
    const result = checkShippedErrorTags(["a-tag"], new Set(["a-tag", "z-new-tag"]));
    assertEqual(result.errors.length, 1, "unrecorded tag must error");
    assert(
      result.errors[0].includes("recorded in the same PR") &&
        result.errors[0].includes("npm run manifest:add-tag -- z-new-tag"),
      `error must carry the add-tag instruction: ${result.errors[0]}`,
    );
  });

  test("recording the tag makes the check green again", () => {
    const result = checkShippedErrorTags(
      ["a-tag", "z-new-tag"],
      new Set(["a-tag", "z-new-tag"]),
    );
    assertEqual(result.errors, [], "manifest updated in the same PR -> clean");
    assertEqual(result.unrecorded, [], "nothing left unrecorded");
  });

  test("duplicated and unsorted manifests are rejected (hand-edit guard)", () => {
    const dup = checkShippedErrorTags(["a-tag", "a-tag"], new Set(["a-tag"]));
    assert(dup.errors.some((e) => e.includes("twice")), "duplicate tag must error");
    const unsorted = checkShippedErrorTags(["b-tag", "a-tag"], new Set(["a-tag", "b-tag"]));
    assert(unsorted.errors.some((e) => e.includes("sorted")), "unsorted manifest must error");
  });

  test("checker and collector are deterministic", () => {
    assertEqual(collectUsedTags(), collectUsedTags(), "collector: same output every call");
    const input = ["a-tag", "gone-tag"] as const;
    const used = new Set(["a-tag", "fresh-tag"]);
    assertEqual(
      checkShippedErrorTags(input, used),
      checkShippedErrorTags(input, used),
      "checker: same input, same output",
    );
  });
});
