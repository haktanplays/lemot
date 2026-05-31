/**
 * Executable content contract validator — runner.
 *
 * Validates the aggregate learning-engine fixture (L1 + L14) in
 * content/learning-engine. This is a fixture/architecture experiment and does
 * NOT touch the live lesson renderer.
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

const findings = validateContent(LEARNING_ENGINE_FIXTURE);
console.log(formatReport(findings));

const hardErrors = findings.filter((f) => f.severity === "error");
if (hardErrors.length > 0) {
  process.exit(1);
}
