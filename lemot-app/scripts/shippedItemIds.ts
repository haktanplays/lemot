/**
 * YASA 2 — shipped itemId immutability (docs/ROADMAP.md, system laws).
 *
 * Once an itemId ships, it is frozen forever: it cannot be renamed or
 * deleted-and-recreated, because every learner's mastery/SRS/lexique history
 * references items by id — a rename orphans the evidence.
 *
 * This module is the PURE core: no I/O beyond the explicit loader, no clock,
 * deterministic output for identical input. The validate:content runner wires
 * it to the live registry; scripts/manifestAdd.ts is the only sanctioned way
 * to grow the manifest (deliberate act — there is NO auto-sync by design).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const MANIFEST_PATH = join(__dirname, "shipped-item-ids.json");

export type ShippedManifest = { note: string; ids: string[] };

/**
 * Load and structurally validate the manifest. Throws on malformed JSON or
 * shape — a broken manifest must fail the build loudly, never pass silently.
 */
export function loadShippedManifest(path: string = MANIFEST_PATH): ShippedManifest {
  const raw = readFileSync(path, "utf8");
  const parsed = JSON.parse(raw) as unknown;
  if (
    !parsed ||
    typeof parsed !== "object" ||
    typeof (parsed as ShippedManifest).note !== "string" ||
    !Array.isArray((parsed as ShippedManifest).ids) ||
    !(parsed as ShippedManifest).ids.every((id) => typeof id === "string")
  ) {
    throw new Error(`shipped-item-ids manifest at ${path} is malformed`);
  }
  return parsed as ShippedManifest;
}

/**
 * Pure check: every manifest id must still exist in the registry.
 *
 * A missing id means it was deleted or renamed — both are YASA 2 violations
 * and HARD ERRORS. Registry ids absent from the manifest are fine (adding
 * new items is free); they are reported separately as `unrecorded` so the
 * caller can surface an informational count.
 */
export function checkShippedItemIds(
  manifestIds: readonly string[],
  registryIds: ReadonlySet<string>,
): { errors: string[]; unrecorded: string[] } {
  const errors: string[] = [];

  const seen = new Set<string>();
  for (const id of manifestIds) {
    if (seen.has(id)) {
      errors.push(`shipped-item-ids manifest lists "${id}" twice — manifest corrupted`);
    }
    seen.add(id);
    if (!registryIds.has(id)) {
      errors.push(
        `shipped itemId is immutable: "${id}" is in the shipped manifest but missing from the registry (deleted or renamed — YASA 2 violation)`,
      );
    }
  }

  const sorted = [...manifestIds].sort();
  if (JSON.stringify(sorted) !== JSON.stringify([...manifestIds])) {
    errors.push(
      "shipped-item-ids manifest is not alphabetically sorted — regenerate via npm run manifest:add, do not hand-edit",
    );
  }

  const unrecorded = [...registryIds].filter((id) => !seen.has(id)).sort();
  return { errors, unrecorded };
}
