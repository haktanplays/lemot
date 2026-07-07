/**
 * YASA 3 — shipped error-tag immutability (K3's twin; docs/ROADMAP.md).
 *
 * Error tags are the content factory's ORDER LANGUAGE: a learner mistake is
 * tagged, and the tag is what orders a derived drill (error → tag → drill).
 * All learner evidence (mastery weakTags, precisionTags, telemetry
 * resultTag) references these strings. Renaming or deleting a shipped tag
 * orphans that evidence — the itemId disease, the same cure.
 *
 * Tag vocabularies in use on main (mechanically collected):
 *  - WEAK_POINT_TAGS (content/weakPointTags.ts) — the typed weak-point list
 *  - ERROR_TAG_CODES (learning-engine/events.ts) — the grading vocabulary
 *  - ERROR_TAXONOMY ids (learning-engine/error-engine.ts) — feedback taxonomy
 *  - every weakPointTags usage in the item registry and the v1 lessons
 *    (a typed subset of WEAK_POINT_TAGS; scanned anyway, belt and braces)
 *
 * Pure core, same shape as scripts/shippedItemIds.ts: deterministic, no
 * clock, explicit I/O in the loader only. Growth path is
 * `npm run manifest:add-tag -- <tag...>` — deliberate act, NO auto-sync.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { WEAK_POINT_TAGS } from "../content/weakPointTags";
import { ERROR_TAG_CODES } from "../content/learning-engine/events";
import { ERROR_TAXONOMY } from "../content/learning-engine/error-engine";
import { ITEM_REGISTRY } from "../content/itemRegistry";
import { V1_LESSONS } from "../content/lessons/v1";

export const TAG_MANIFEST_PATH = join(__dirname, "shipped-error-tags.json");

export type ShippedTagManifest = { note: string; tags: string[] };

/** Load and structurally validate the tag manifest; throws loudly on rot. */
export function loadShippedTagManifest(path: string = TAG_MANIFEST_PATH): ShippedTagManifest {
  const raw = readFileSync(path, "utf8");
  const parsed = JSON.parse(raw) as unknown;
  if (
    !parsed ||
    typeof parsed !== "object" ||
    typeof (parsed as ShippedTagManifest).note !== "string" ||
    !Array.isArray((parsed as ShippedTagManifest).tags) ||
    !(parsed as ShippedTagManifest).tags.every((t) => typeof t === "string")
  ) {
    throw new Error(`shipped-error-tags manifest at ${path} is malformed`);
  }
  return parsed as ShippedTagManifest;
}

/**
 * Every error/weakPoint tag currently in use on main. Deterministic:
 * sorted, unique, derived only from shipped constants and content.
 */
export function collectUsedTags(): string[] {
  const tags = new Set<string>();
  for (const t of WEAK_POINT_TAGS) tags.add(t);
  for (const t of ERROR_TAG_CODES) tags.add(t);
  for (const t of Object.keys(ERROR_TAXONOMY)) tags.add(t);
  for (const item of Object.values(ITEM_REGISTRY) as { weakPointTags?: readonly string[] }[]) {
    for (const t of item.weakPointTags ?? []) tags.add(t);
  }
  for (const lesson of V1_LESSONS) {
    for (const screen of lesson.screens as { weakPointTags?: readonly string[] }[]) {
      for (const t of screen.weakPointTags ?? []) tags.add(t);
    }
  }
  return [...tags].sort();
}

/**
 * Pure check, both directions (YASA 3 = K3 semantics for tags):
 *  - manifest tag not in use → deleted or renamed → HARD ERROR
 *  - used tag not in manifest → HARD ERROR with the same-PR instruction
 */
export function checkShippedErrorTags(
  manifestTags: readonly string[],
  usedTags: ReadonlySet<string>,
): { errors: string[]; unrecorded: string[] } {
  const errors: string[] = [];

  const seen = new Set<string>();
  for (const tag of manifestTags) {
    if (seen.has(tag)) {
      errors.push(`shipped-error-tags manifest lists "${tag}" twice — manifest corrupted`);
    }
    seen.add(tag);
    if (!usedTags.has(tag)) {
      errors.push(
        `shipped error tag is immutable: "${tag}" is in the shipped manifest but no longer in use (deleted or renamed — YASA 3 violation)`,
      );
    }
  }

  const sorted = [...manifestTags].sort();
  if (JSON.stringify(sorted) !== JSON.stringify([...manifestTags])) {
    errors.push(
      "shipped-error-tags manifest is not alphabetically sorted — regenerate via npm run manifest:add-tag, do not hand-edit",
    );
  }

  const unrecorded = [...usedTags].filter((t) => !seen.has(t)).sort();
  for (const tag of unrecorded) {
    errors.push(
      `new error tag "${tag}" is not recorded in the shipped manifest — new error tags must be recorded in the same PR — run: npm run manifest:add-tag -- ${tag}`,
    );
  }
  return { errors, unrecorded };
}
