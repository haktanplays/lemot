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
 * Also runs the mechanizable Lesson Flow Canon §11 subset over the v1
 * lessons (scripts/canonRules.ts): V3/V4 exposure-tier misuse are HARD
 * ERRORS, V5 insight budget is a warning (printed, does not block).
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
import { V1_LESSONS } from "../content/lessons/v1";
import { loadShippedManifest, checkShippedItemIds } from "./shippedItemIds";
import { loadShippedTagManifest, collectUsedTags, checkShippedErrorTags } from "./shippedErrorTags";
import { checkCanonRules } from "./canonRules";

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

const tagManifest = loadShippedTagManifest();
const shippedTags = checkShippedErrorTags(tagManifest.tags, new Set(collectUsedTags()));
console.log(
  `Shipped error-tag manifest (YASA 3): ${tagManifest.tags.length} frozen, ` +
    `${shippedTags.unrecorded.length} unrecorded tag(s) [hard error if > 0], ` +
    `${shippedTags.errors.length} hard error(s)`,
);
for (const error of shippedTags.errors) {
  console.log(`  ERROR ${error}`);
}

const canonFindings = checkCanonRules(V1_LESSONS, ITEM_REGISTRY);
const canonErrors = canonFindings.filter((f) => f.severity === "error");
const canonWarnings = canonFindings.filter((f) => f.severity === "warning");
console.log(
  `Lesson Flow Canon §11 rules (V3/V4/V5) over ${V1_LESSONS.length} lessons: ` +
    `${canonErrors.length} error(s), ${canonWarnings.length} warning(s)`,
);
for (const finding of canonFindings) {
  console.log(`  ${finding.severity.toUpperCase()} ${finding.message}`);
}

const hardErrors = findings.filter((f) => f.severity === "error");
if (
  hardErrors.length > 0 ||
  shipped.errors.length > 0 ||
  shippedTags.errors.length > 0 ||
  canonErrors.length > 0
) {
  process.exit(1);
}
