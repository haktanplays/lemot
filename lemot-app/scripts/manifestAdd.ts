/**
 * Deliberately record newly shipped itemIds in the YASA 2 manifest.
 *
 * Run:
 *   npm run manifest:add -- <itemId> [<itemId> ...]
 *
 * Rules (fail-closed — on ANY invalid argument nothing is written):
 *   - each id must exist in content/itemRegistry.ts;
 *   - each id must not already be in the manifest;
 *   - output is deterministic: sorted, unique, 2-space JSON, trailing newline.
 *
 * There is intentionally NO "sync everything" mode: recording an id as
 * shipped is a conscious act (it freezes the id forever).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { ITEM_REGISTRY } from "../content/itemRegistry";
import { MANIFEST_PATH, loadShippedManifest } from "./shippedItemIds";

const args = process.argv.slice(2).filter((a) => a.trim().length > 0);
if (args.length === 0) {
  console.error("usage: npm run manifest:add -- <itemId> [<itemId> ...]");
  console.error("Records ids as SHIPPED (frozen forever, YASA 2). No auto-sync mode exists.");
  process.exit(1);
}

const manifest = loadShippedManifest();
const registryIds = new Set(Object.keys(ITEM_REGISTRY));
const existing = new Set(manifest.ids);

const problems: string[] = [];
for (const id of args) {
  if (!registryIds.has(id)) problems.push(`"${id}" does not exist in content/itemRegistry.ts`);
  else if (existing.has(id)) problems.push(`"${id}" is already recorded as shipped`);
}
if (problems.length > 0) {
  console.error("manifest:add refused (nothing written):");
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

const ids = [...new Set([...manifest.ids, ...args])].sort();
writeFileSync(MANIFEST_PATH, `${JSON.stringify({ note: manifest.note, ids }, null, 2)}\n`, "utf8");
console.log(`recorded ${args.length} shipped itemId(s); manifest now freezes ${ids.length} ids.`);
// Read-back sanity: the file we just wrote must load and stay sorted.
loadShippedManifest();
