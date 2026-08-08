/**
 * Journey-role metadata contract (JR-001..JR-004).
 *
 * Scope is authoring metadata only. There is no active-new count here and no
 * role-BUDGET enforcement (doorway 1–2 · standard 1–4 · integration 0 · review
 * 0 · milestone 0–3): a trustworthy check needs the lesson-level
 * acquisition-responsibility derivation, which does not exist yet.
 *
 * The load-bearing assertion is axis independence. `journeyRole` and
 * `primaryArchetype` are two independent axes, and the shipped curriculum
 * proves it — so a future refactor cannot quietly start deriving one from the
 * other without failing here.
 */
import { describe, test, assert, assertEqual } from "./harness";
import {
  JOURNEY_ROLES,
  countDeclaredJourneyRoles,
  isJourneyRole,
  validateJourneyRoles,
} from "../../content/lessons/journeyRoles";
import { V1_LESSONS } from "../../content/lessons/v1";
import type { Lesson } from "../../content/lessonTypes";

/** The ratified map. L0 is deliberately absent — it is not missing data. */
const RATIFIED: Record<string, string | undefined> = {
  "v1-lesson-000": undefined,
  "v1-lesson-001": "standard",
  "v1-lesson-002": "standard",
  "v1-lesson-003": "standard",
  "v1-lesson-004": "standard",
  "v1-lesson-005": "standard",
  "v1-lesson-006": "integration",
  "v1-lesson-007": "doorway",
  "v1-lesson-008": "doorway",
  "v1-lesson-009": "doorway",
  "v1-lesson-010": "integration",
  "v1-lesson-011": "doorway",
  "v1-lesson-012": "doorway",
  "v1-lesson-013": "integration",
  "v1-lesson-014": "doorway",
  "v1-lesson-015": "doorway",
  "v1-lesson-016": "integration",
};

describe("journeyRole — shipped map", () => {
  test("every shipped lesson resolves to exactly its ratified role", () => {
    assertEqual(
      V1_LESSONS.map((lesson) => lesson.id).sort(),
      Object.keys(RATIFIED).sort(),
      "the shipped lesson set matches the ratified map's coverage",
    );
    for (const lesson of V1_LESSONS) {
      assertEqual(
        lesson.journeyRole,
        RATIFIED[lesson.id],
        `${lesson.id} declares its ratified journey role`,
      );
    }
  });

  test("JR-002 — L0 declares no journey role, on purpose", () => {
    const l0 = V1_LESSONS.find((lesson) => lesson.number === 0);
    assert(l0 !== undefined, "precondition: L0 ships");
    assertEqual(
      l0?.journeyRole,
      undefined,
      "L0 is pre-curriculum bootstrap and sits outside the five roles",
    );
  });

  test("JR-003 — L1..L16 each declare a role; L0 does not", () => {
    const withRole = V1_LESSONS.filter((lesson) => lesson.journeyRole !== undefined);
    assertEqual(
      withRole.map((lesson) => lesson.number).sort((a, b) => a - b),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      "migration is complete for the current shipped sequence",
    );
    assertEqual(countDeclaredJourneyRoles(V1_LESSONS), 16, "16 of 17 lessons carry a role");
  });

  test("the current role distribution is as ratified", () => {
    const counts: Record<string, number> = { unset: 0 };
    for (const role of JOURNEY_ROLES) counts[role] = 0;
    for (const lesson of V1_LESSONS) {
      counts[lesson.journeyRole ?? "unset"] += 1;
    }
    assertEqual(
      counts,
      { doorway: 7, standard: 5, integration: 4, review: 0, milestone: 0, unset: 1 },
      "no review or milestone lesson ships yet",
    );
  });
});

describe("journeyRole — structural contract", () => {
  test("JR-001 — the shipped lessons declare only canonical roles", () => {
    assertEqual(validateJourneyRoles(V1_LESSONS).join(" | "), "", "shipped roles are legal");
  });

  test("JR-001 — an illegal role value is a hard error", () => {
    const bogus = [{ id: "v1-lesson-999", journeyRole: "keystone" } as unknown as Lesson];
    const errors = validateJourneyRoles(bogus);
    assert(
      errors.some((e) => e.startsWith("JR-001") && e.includes("keystone")),
      `illegal role caught, got: ${errors.join(" | ")}`,
    );
  });

  test("JR-001 — a lesson with no role is valid", () => {
    const roleless = [{ id: "v1-lesson-000" } as unknown as Lesson];
    assertEqual(
      validateJourneyRoles(roleless).join(" | "),
      "",
      "optionality is preserved — absence is not an error",
    );
  });

  test("JR-004 — there are exactly five roles, and no bootstrap or hybrid", () => {
    assertEqual(
      [...JOURNEY_ROLES].sort(),
      ["doorway", "integration", "milestone", "review", "standard"],
      "the canonical five",
    );
    assert(!isJourneyRole("bootstrap"), "L0's status is absence, not a sixth role");
    assert(!isJourneyRole("hybrid"), "hybrid is not a journey role and may not become one");
    for (const lesson of V1_LESSONS) {
      const role: string | undefined = lesson.journeyRole;
      assert(
        role === undefined || isJourneyRole(role),
        `${lesson.id} must not smuggle in a non-canonical role`,
      );
    }
  });
});

describe("journeyRole — axis independence", () => {
  test("content archetype does not determine journey role", () => {
    // Real shipped counter-example, not synthetic policy: one archetype spans
    // three different journey roles. Any attempt to derive role from archetype
    // (or vice versa) fails here.
    const byArchetype = new Map<string, Set<string>>();
    for (const lesson of V1_LESSONS) {
      if (lesson.journeyRole === undefined) continue;
      const roles = byArchetype.get(lesson.primaryArchetype) ?? new Set<string>();
      roles.add(lesson.journeyRole);
      byArchetype.set(lesson.primaryArchetype, roles);
    }
    assertEqual(
      [...(byArchetype.get("chunk-natural-speech") ?? [])].sort(),
      ["doorway", "integration", "standard"],
      "chunk-natural-speech ships as three different journey roles",
    );
    assertEqual(
      [...(byArchetype.get("architecture-verb") ?? [])].sort(),
      ["doorway", "standard"],
      "architecture-verb ships as two different journey roles",
    );
    const ambiguous = [...byArchetype.values()].filter((roles) => roles.size > 1);
    assert(ambiguous.length >= 2, "more than one archetype is role-ambiguous");
  });

  test("journey role does not determine content archetype either", () => {
    // The reverse direction: `integration` spans two archetypes, so the
    // legacy mixed-axis value `review-integration` is not a role synonym.
    const archetypes = new Set(
      V1_LESSONS.filter((lesson) => lesson.journeyRole === "integration").map(
        (lesson) => lesson.primaryArchetype,
      ),
    );
    assertEqual(
      [...archetypes].sort(),
      ["chunk-natural-speech", "review-integration"],
      "integration lessons do not all carry the review-integration archetype",
    );
  });
});
