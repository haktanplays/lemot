/**
 * Executable content contract validator — runner.
 *
 * Validates the aggregate learning-engine fixture (L1 + L14) in
 * content/learning-engine. This is a fixture/architecture experiment and does
 * NOT touch the live lesson renderer.
 *
 * Additionally enforces YASA 2 (docs/ROADMAP.md): every itemId recorded in
 * scripts/shipped-item-ids.json must still exist in content/itemRegistry.ts.
 * A missing/renamed shipped id is a HARD ERROR.
 *
 * Run:
 *   npm run validate:content
 *
 * Exits 1 on any hard error (prints the full report first).
 */
import {
  LEARNING_ENGINE_FIXTURE,
  validateContent,
  formatReport,
} from "../content/learning-engine";
import { ITEM_REGISTRY } from "../content/itemRegistry";
import { loadShippedManifest, checkShippedItemIds } from "./shippedItemIds";

const findings = validateContent(LEARNING_ENGINE_FIXTURE);
console.log(formatReport(findings));

const manifest = loadShippedManifest();
const shipped = checkShippedItemIds(manifest.ids, new Set(Object.keys(ITEM_REGISTRY)));
console.log(
  `Shipped itemId manifest (YASA 2 + K3): ${manifest.ids.length} frozen, ` +
    `${shipped.unrecorded.length} unrecorded registry id(s) [hard error if > 0], ` +
    `${shipped.errors.length} hard error(s)`,
);
for (const error of shipped.errors) {
  console.log(`  ERROR ${error}`);
}

const hardErrors = findings.filter((f) => f.severity === "error");
if (hardErrors.length > 0 || shipped.errors.length > 0) {
  process.exit(1);
}
