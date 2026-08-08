/**
 * Journey-role demand-budget contract (JB-001..JB-004).
 *
 * The count under test is the authored `acquisitionDemandItemIds.length` and
 * nothing else — no presentation field, no first production, no registry
 * status. Two deliberate carve-outs are pinned: L0 carries four demands and no
 * journey role, so it is skipped entirely; L6 passes only through an EXACT
 * named exception, which fails on a second item or a substituted one.
 */
import { describe, test, assert, assertEqual } from "./harness";
import {
  JOURNEY_ROLE_DEMAND_BANDS,
  JOURNEY_ROLE_DEMAND_EXCEPTIONS,
  validateJourneyRoleDemandBudgets,
} from "../../content/lessons/journeyRoleDemandBudgets";
import { V1_LESSONS } from "../../content/lessons/v1";
import type { JourneyRole, Lesson } from "../../content/lessonTypes";

/** Synthetic lesson carrying only the two fields the budget check reads. */
const lesson = (
  id: string,
  journeyRole: JourneyRole | undefined,
  acquisitionDemandItemIds?: readonly string[],
): Lesson =>
  ({ id, journeyRole, acquisitionDemandItemIds }) as unknown as Lesson;

/** N distinct placeholder demand ids — only the COUNT matters to a band. */
const demands = (n: number): string[] =>
  Array.from({ length: n }, (_, i) => `item-${i}`);

describe("journeyRoleDemandBudgets — canonical bands", () => {
  test("the five bands are exactly as ratified", () => {
    assertEqual(
      JOURNEY_ROLE_DEMAND_BANDS,
      {
        doorway: { min: 1, max: 2 },
        standard: { min: 1, max: 4 },
        integration: { min: 0, max: 0 },
        review: { min: 0, max: 0 },
        milestone: { min: 0, max: 3 },
      },
      "integration stays 0, never 0-1",
    );
  });

  test("in-band counts pass for every role", () => {
    const ok: [JourneyRole, number][] = [
      ["standard", 1],
      ["standard", 4],
      ["doorway", 1],
      ["doorway", 2],
      ["integration", 0],
      ["review", 0],
      ["milestone", 0],
      ["milestone", 3],
    ];
    for (const [role, n] of ok) {
      const out = validateJourneyRoleDemandBudgets([lesson("v1-lesson-900", role, demands(n))]);
      assertEqual(
        out.errors.filter((e) => e.startsWith("JB-002")).join(" | "),
        "",
        `${role} with ${n} demand(s) is in band`,
      );
    }
  });

  test("JB-002 — out-of-band counts are hard errors", () => {
    const bad: [JourneyRole, number][] = [
      ["standard", 0],
      ["standard", 5],
      ["doorway", 0],
      ["doorway", 3],
      ["integration", 1],
      ["review", 1],
      ["milestone", 4],
    ];
    for (const [role, n] of bad) {
      const out = validateJourneyRoleDemandBudgets([lesson("v1-lesson-900", role, demands(n))]);
      assert(
        out.errors.some((e) => e.startsWith("JB-002")),
        `${role} with ${n} demand(s) must fail, got: ${out.errors.join(" | ")}`,
      );
    }
  });

  test("JB-001 — a role without a declaration cannot be budget-checked", () => {
    const out = validateJourneyRoleDemandBudgets([
      lesson("v1-lesson-900", "doorway", undefined),
    ]);
    assert(
      out.errors.some((e) => e.startsWith("JB-001")),
      `unadjudicated lesson caught, got: ${out.errors.join(" | ")}`,
    );
  });

  test("a role-less lesson is skipped, not failed", () => {
    const out = validateJourneyRoleDemandBudgets([
      lesson("v1-lesson-000", undefined, demands(4)),
    ]);
    // JB-004 legitimately fires here because this partial set omits L6; the
    // band rules are what must stay silent for a role-less lesson.
    const bandErrors = out.errors.filter(
      (e) => e.startsWith("JB-001") || e.startsWith("JB-002") || e.startsWith("JB-003"),
    );
    assertEqual(bandErrors.join(" | "), "", "no band applies to a role-less lesson");
    assertEqual(out.skippedRoleless, 1, "counted as skipped");
  });
});

describe("journeyRoleDemandBudgets — the single L6 exception", () => {
  test("the exception is exact and names only L6", () => {
    assertEqual(
      Object.keys(JOURNEY_ROLE_DEMAND_EXCEPTIONS),
      ["v1-lesson-006"],
      "exactly one named exception exists",
    );
    const entry = JOURNEY_ROLE_DEMAND_EXCEPTIONS["v1-lesson-006"];
    assertEqual(entry.expectedRole, "integration", "keyed to the integration role");
    assertEqual(entry.allowedDemandItemIds, ["chunk-au-revoir"], "exactly one allowed demand");
    assert(entry.reason.length > 0, "the exception records why it exists");
  });

  test("JB-003 — the exact L6 declaration passes", () => {
    const out = validateJourneyRoleDemandBudgets([
      lesson("v1-lesson-006", "integration", ["chunk-au-revoir"]),
    ]);
    assertEqual(out.errors.join(" | "), "", "exact match passes");
    assertEqual(out.exceptionPasses, 1, "counted as an exception pass, not a normal one");
    assertEqual(out.normalPasses, 0, "it never counts as ordinary band compliance");
  });

  test("JB-003 — a second demand fails; the exception is not an overage allowance", () => {
    const out = validateJourneyRoleDemandBudgets([
      lesson("v1-lesson-006", "integration", ["chunk-au-revoir", "chunk-merci"]),
    ]);
    assert(
      out.errors.some((e) => e.startsWith("JB-003")),
      `two demands must fail, got: ${out.errors.join(" | ")}`,
    );
  });

  test("JB-003 — a substituted single demand fails", () => {
    const out = validateJourneyRoleDemandBudgets([
      lesson("v1-lesson-006", "integration", ["chunk-merci"]),
    ]);
    assert(
      out.errors.some((e) => e.startsWith("JB-003")),
      `a different item must fail, got: ${out.errors.join(" | ")}`,
    );
  });

  test("JB-003 — the exception does not transfer if L6's role changes", () => {
    const out = validateJourneyRoleDemandBudgets([
      lesson("v1-lesson-006", "doorway", ["chunk-au-revoir"]),
    ]);
    assert(
      out.errors.some((e) => e.startsWith("JB-003") && e.includes("does not transfer")),
      `role mismatch caught, got: ${out.errors.join(" | ")}`,
    );
  });

  test("JB-004 — a stale exception entry fails rather than sitting dead", () => {
    // L6 absent from the lesson set entirely.
    const out = validateJourneyRoleDemandBudgets([
      lesson("v1-lesson-001", "standard", ["chunk-merci"]),
    ]);
    assert(
      out.errors.some((e) => e.startsWith("JB-004")),
      `stale exception caught, got: ${out.errors.join(" | ")}`,
    );
  });
});

describe("journeyRoleDemandBudgets — shipped v1", () => {
  test("the shipped lesson set passes with no hard errors", () => {
    const out = validateJourneyRoleDemandBudgets(V1_LESSONS);
    assertEqual(out.errors.join(" | "), "", "current v1 is budget-clean");
  });

  test("current outcome: 15 normal passes, 1 named exception, 1 role-less skip", () => {
    const out = validateJourneyRoleDemandBudgets(V1_LESSONS);
    assertEqual(out.normalPasses, 15, "L1-L5, L7-L16 minus L6");
    assertEqual(out.exceptionPasses, 1, "L6 only");
    assertEqual(out.skippedRoleless, 1, "L0 only");
  });

  test("the current role/count matrix is pinned", () => {
    const matrix = V1_LESSONS.map((l) => [
      l.number,
      l.journeyRole ?? "unset",
      l.acquisitionDemandItemIds?.length ?? -1,
    ]);
    assertEqual(
      matrix,
      [
        [0, "unset", 4],
        [1, "standard", 1],
        [2, "standard", 1],
        [3, "standard", 3],
        [4, "standard", 1],
        [5, "standard", 2],
        [6, "integration", 1],
        [7, "doorway", 1],
        [8, "doorway", 1],
        [9, "doorway", 1],
        [10, "integration", 0],
        [11, "doorway", 1],
        [12, "doorway", 1],
        [13, "integration", 0],
        [14, "doorway", 2],
        [15, "doorway", 1],
        [16, "integration", 0],
      ],
      "current-v1 regression matrix",
    );
  });

  test("L10, L13 and L16 pass the ordinary Integration=0 rule, not an exception", () => {
    for (const id of ["v1-lesson-010", "v1-lesson-013", "v1-lesson-016"]) {
      const l = V1_LESSONS.find((x) => x.id === id);
      assertEqual(l?.acquisitionDemandItemIds, [], `${id} declares explicit zero`);
      assert(
        JOURNEY_ROLE_DEMAND_EXCEPTIONS[id] === undefined,
        `${id} needs no exception entry`,
      );
      const out = validateJourneyRoleDemandBudgets([l as Lesson]);
      assertEqual(out.normalPasses, 1, `${id} passes on the plain band`);
      assertEqual(out.exceptionPasses, 0, `${id} uses no exception`);
    }
  });

  test("no shipped Review or Milestone lesson exists yet", () => {
    const roles = new Set(V1_LESSONS.map((l) => l.journeyRole));
    assert(!roles.has("review"), "no Review lesson was invented to exercise the band");
    assert(!roles.has("milestone"), "no Milestone lesson was invented either");
  });
});
