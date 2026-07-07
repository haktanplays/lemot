/**
 * Deliberately record newly shipped error/weakPoint tags (YASA 3, K3 kalıbı).
 *
 * Run:
 *   npm run manifest:add-tag -- <tag> [<tag> ...]
 *
 * Fail-closed: on ANY invalid argument nothing is written. A tag can only
 * be recorded if it is actually in use (constants/content) — recording an
 * unused tag would immediately violate the other direction of the check.
 * Deterministic output: sorted, unique, 2-space JSON, trailing newline.
 * There is intentionally NO "sync everything" mode.
 */
import { writeFileSync } from "node:fs";
import {
  TAG_MANIFEST_PATH,
  collectUsedTags,
  loadShippedTagManifest,
} from "./shippedErrorTags";

const args = process.argv.slice(2).filter((a) => a.trim().length > 0);
if (args.length === 0) {
  console.error("usage: npm run manifest:add-tag -- <tag> [<tag> ...]");
  console.error("Records tags as SHIPPED (frozen forever, YASA 3). No auto-sync mode exists.");
  process.exit(1);
}

const manifest = loadShippedTagManifest();
const used = new Set(collectUsedTags());
const existing = new Set(manifest.tags);

const problems: string[] = [];
for (const tag of args) {
  if (!used.has(tag)) problems.push(`"${tag}" is not in use anywhere (constants/registry/lessons)`);
  else if (existing.has(tag)) problems.push(`"${tag}" is already recorded as shipped`);
}
if (problems.length > 0) {
  console.error("manifest:add-tag refused (nothing written):");
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

const tags = [...new Set([...manifest.tags, ...args])].sort();
writeFileSync(TAG_MANIFEST_PATH, `${JSON.stringify({ note: manifest.note, tags }, null, 2)}\n`, "utf8");
console.log(`recorded ${args.length} shipped tag(s); manifest now freezes ${tags.length} tags.`);
loadShippedTagManifest(); // read-back sanity
