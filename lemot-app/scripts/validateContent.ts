/**
 * Executable content contract validator — runner.
 *
 * Validates the parallel L1 contract fixture in content/learning-engine. This
 * is a fixture/architecture experiment and does NOT touch the live lesson
 * renderer.
 *
 * Run:
 *   npm run validate:content
 *
 * Exits 1 on any hard error (prints the full report first).
 */
import {
  L1_CONTENT_FIXTURE,
  validateContent,
  formatReport,
} from "../content/learning-engine";

const findings = validateContent(L1_CONTENT_FIXTURE);
console.log(formatReport(findings));

const hardErrors = findings.filter((f) => f.severity === "error");
if (hardErrors.length > 0) {
  process.exit(1);
}
