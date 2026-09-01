/**
 * Chain-coverage + Practice Hub readiness measurement for L1-L10.
 *
 * Reporting only: it asserts nothing and gates nothing. It exists because the
 * chain rebuild is judged on a number ("what share of graded actions sit inside
 * a chain?"), and a number nobody can reproduce is a claim rather than a
 * measurement. Run before and after any content change to the path.
 */
import { V1_LESSONS } from "../content/lessons/v1";
import { flattenLessonScreens } from "../content/lessons/lessonStructure";
import { resolvePracticeHubSource } from "../content/lesson-v1-evidence/practiceHub";
import type { ActivityChainScreen, Lesson } from "../content/lessonTypes";
import type { ItemId } from "../content/learning-engine/types";

const GRADED = new Set(["fill-with-traps", "weave", "say-it-your-way"]);
const PATH: Lesson[] = V1_LESSONS.filter((l) => l.number >= 1 && l.number <= 10).sort(
  (a, b) => a.number - b.number,
);

let totalGraded = 0;
let totalChained = 0;
let totalDeadEnds = 0;

console.log("=== CHAIN COVERAGE (L1-L10) ===");
for (const lesson of PATH) {
  const chains = lesson.screens.filter(
    (s): s is ActivityChainScreen => s.type === "activity-chain",
  );
  const graded = flattenLessonScreens(lesson).filter((s) => GRADED.has(s.type));
  const chainedIds = new Set(
    chains.flatMap((c) => c.payload.steps.filter((s) => GRADED.has(s.type)).map((s) => s.id)),
  );
  // A dead end: a recognition action outside a chain, so nothing the learner
  // just recognised is immediately put to use.
  const deadEnds = flattenLessonScreens(lesson).filter(
    (s) => s.type === "fill-with-traps" && !chainedIds.has(s.id),
  );
  totalGraded += graded.length;
  totalChained += chainedIds.size;
  totalDeadEnds += deadEnds.length;

  const pct = graded.length === 0 ? 0 : Math.round((chainedIds.size / graded.length) * 100);
  console.log(
    `L${String(lesson.number).padStart(2)}  pages ${String(lesson.screens.length).padStart(2)}` +
      `  graded ${String(graded.length).padStart(2)}` +
      `  chained ${String(chainedIds.size).padStart(2)} (${String(pct).padStart(3)}%)` +
      `  chains ${chains.length} [${chains.map((c) => c.payload.steps.length).join(",") || "-"}]` +
      `  dead-end fills ${deadEnds.length}`,
  );
}
console.log(
  `TOTAL graded ${totalGraded}  chained ${totalChained}  ` +
    `share ${Math.round((totalChained / totalGraded) * 100)}%  dead-end fills ${totalDeadEnds}`,
);

// ── Practice Hub readiness ──────────────────────────────────────────────────
console.log("\n=== PRACTICE HUB SOURCE READINESS (L1-L10 declared items) ===");
const HUB_PATHS = ["build", "stretch", "challenge"] as const;
const seen = new Set<string>();
let resolvedCount = 0;
const missingRows: string[] = [];

for (const lesson of PATH) {
  for (const item of lesson.learningItems) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    const hits = HUB_PATHS.filter(
      (p) => resolvePracticeHubSource(item.id as ItemId, p, V1_LESSONS) !== null,
    );
    if (hits.length > 0) resolvedCount += 1;
    else missingRows.push(`  NO SOURCE  first declared L${lesson.number}  ${item.id}`);
  }
}
console.log(`distinct items declared across L1-L10: ${seen.size}`);
console.log(`  with at least one reusable authored source: ${resolvedCount}`);
console.log(`  with none: ${missingRows.length}`);
for (const r of missingRows) console.log(r);
