/**
 * Journey-role demand-budget validation (JB-001..JB-004) — pure, deterministic.
 *
 * This is the pass the two preceding ones were building toward. Active-new is
 * no longer reconstructed from anything: the count is simply
 * `lesson.acquisitionDemandItemIds.length`, an authored declaration that
 * already excludes carryover, recycled and supported-only material,
 * `acquisitionComponents` wholes and `acquisitionLink` linked identities. So
 * this module performs NO collapsing, NO deduplication and NO prior-owned
 * subtraction — doing any of that here would double-apply rules the
 * declaration already encodes.
 *
 * It also reads nothing from presentation. `targetItemIds`,
 * `evidenceTargetItemIds`, `suggestedPieces`, screen type, first production and
 * registry `status` are all irrelevant to a budget check, and PRJ-015 IC-001
 * keeps presentation in a different counting context entirely.
 *
 * Two lessons sit outside the ordinary rule, both deliberately:
 *
 *  - L0 has no journey role at all (pre-curriculum bootstrap). It declares four
 *    demands and is simply not budget-checked — no bootstrap role was invented,
 *    and no role-less band exists.
 *  - L6 is the single ratified Integration exception, expressed below as an
 *    exact allow-list rather than a widened band. Integration stays 0.
 */
import type { JourneyRole, Lesson } from "../lessonTypes";

/** Inclusive demand-count band for each canonical journey role. */
export const JOURNEY_ROLE_DEMAND_BANDS: Readonly<
  Record<JourneyRole, { min: number; max: number }>
> = Object.freeze({
  doorway: { min: 1, max: 2 },
  standard: { min: 1, max: 4 },
  integration: { min: 0, max: 0 },
  review: { min: 0, max: 0 },
  milestone: { min: 0, max: 3 },
});

/**
 * The single named exception to a canonical band, keyed by lesson id.
 *
 * Deliberately NOT a generic allowance: it names the exact role and the exact
 * demand set, so L6 declaring a second item — or a different item — fails
 * rather than quietly consuming the exception. Integration's band is untouched
 * at 0, and nothing here generalises to "one extra demand is fine".
 */
export const JOURNEY_ROLE_DEMAND_EXCEPTIONS: Readonly<
  Record<string, { expectedRole: JourneyRole; allowedDemandItemIds: readonly string[]; reason: string }>
> = Object.freeze({
  "v1-lesson-006": Object.freeze({
    expectedRole: "integration" as JourneyRole,
    allowedDemandItemIds: Object.freeze(["chunk-au-revoir"]),
    reason:
      "L6 may carry one new social formula chunk (au revoir) because the lesson's " +
      "pedagogical promise is a complete human moment from greeting to leave-taking. " +
      "The exception does not create a general Integration 0-1 band and does not " +
      "permit a new grammar system or paradigm.",
  }),
});

export type DemandBudgetOutcome = {
  /** Lessons checked against their canonical band and passing. */
  normalPasses: number;
  /** Lessons passing only through an exact named exception. */
  exceptionPasses: number;
  /** Lessons skipped because they carry no journey role (L0). */
  skippedRoleless: number;
  errors: string[];
};

/** True when the two id lists hold the same members, order-insensitively. */
function sameMembers(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((id, i) => id === sortedB[i]);
}

/**
 * JB-001..JB-004 over the given lessons.
 *
 * JB-001 a role-bearing lesson must be adjudicated (`undefined` demands cannot
 * be budget-checked) · JB-002 the demand count must fit the role's band ·
 * JB-003 a named exception applies only on an exact role + demand-set match ·
 * JB-004 a stale exception entry (missing lesson, changed role, changed
 * declaration) fails rather than silently carrying dead policy — which means
 * this function expects the FULL lesson set, not a subset: an exception whose
 * lesson is simply absent from the argument reads as stale.
 */
export function validateJourneyRoleDemandBudgets(
  lessons: readonly Lesson[],
): DemandBudgetOutcome {
  const errors: string[] = [];
  let normalPasses = 0;
  let exceptionPasses = 0;
  let skippedRoleless = 0;
  const exceptionsApplied = new Set<string>();

  for (const lesson of lessons) {
    const role = lesson.journeyRole;
    // L0 and any future role-less lesson: no band applies, by design.
    if (role === undefined) {
      skippedRoleless += 1;
      continue;
    }

    const declared = lesson.acquisitionDemandItemIds;

    // JB-001 — a role without a declaration cannot be checked at all.
    if (declared === undefined) {
      errors.push(
        `JB-001 "${lesson.id}" declares journeyRole "${role}" but no acquisitionDemandItemIds — an unadjudicated lesson cannot be budget-validated`,
      );
      continue;
    }

    const exception = JOURNEY_ROLE_DEMAND_EXCEPTIONS[lesson.id];
    if (exception !== undefined) {
      exceptionsApplied.add(lesson.id);
      // JB-003 — the exception is exact: same role, same demand set, nothing more.
      if (role !== exception.expectedRole) {
        errors.push(
          `JB-003 "${lesson.id}" has a named demand exception for role "${exception.expectedRole}" but declares "${role}" — the exception does not transfer`,
        );
        continue;
      }
      if (!sameMembers(declared, exception.allowedDemandItemIds)) {
        errors.push(
          `JB-003 "${lesson.id}" may declare exactly [${exception.allowedDemandItemIds.join(", ")}] under its named exception, but declares [${declared.join(", ")}]`,
        );
        continue;
      }
      exceptionPasses += 1;
      continue;
    }

    // JB-002 — ordinary band compliance.
    const band = JOURNEY_ROLE_DEMAND_BANDS[role];
    const count = declared.length;
    if (count < band.min || count > band.max) {
      const expected = band.min === band.max ? `${band.min}` : `${band.min}-${band.max}`;
      errors.push(
        `JB-002 "${lesson.id}" is "${role}" (band ${expected}) but declares ${count} acquisition demand(s)`,
      );
      continue;
    }
    normalPasses += 1;
  }

  // JB-004 — an exception naming a lesson that no longer exists is dead policy.
  for (const lessonId of Object.keys(JOURNEY_ROLE_DEMAND_EXCEPTIONS)) {
    if (!exceptionsApplied.has(lessonId)) {
      errors.push(
        `JB-004 named demand exception for "${lessonId}" was never applied — the lesson is missing or carries no journey role, so the exception is stale`,
      );
    }
  }

  return { normalPasses, exceptionPasses, skippedRoleless, errors: errors.sort() };
}
