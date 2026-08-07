/**
 * Journey-role metadata validation (JR-001) — pure, structural only.
 *
 * `journeyRole` is the second of two independent lesson axes: the archetypes
 * say what engine a lesson is built around, the journey role says what job it
 * does in the learner's progression. TypeScript already rejects an illegal
 * literal in normal source, but shipped lesson data also arrives through plain
 * objects and casts, so the legal set is checked once at build time rather than
 * trusted — the same posture the other content validators take.
 *
 * What this deliberately is NOT: role-contract enforcement. The canonical
 * per-role active-new budgets (doorway 1–2 · standard 1–4 · integration 0 ·
 * review 0 · milestone 0–3) are not checked here, because a trustworthy check
 * needs the lesson-level acquisition-responsibility derivation, which does not
 * exist yet. Nor does this infer a role from an archetype, a phase or a screen
 * type — the axes are independent and must stay authored.
 *
 * The field is optional on purpose. L0 is pre-curriculum bootstrap and carries
 * no role by design; that intent is pinned by test, not by a rule here, because
 * "which lessons must declare a role" is a fact about the current shipped
 * sequence rather than a permanent property of the schema.
 */
import type { JourneyRole, Lesson } from "../lessonTypes";

/** The five canonical journey roles. There is no `bootstrap` and no `hybrid`. */
export const JOURNEY_ROLES: readonly JourneyRole[] = Object.freeze([
  "doorway",
  "standard",
  "integration",
  "review",
  "milestone",
]);

/** Narrow an arbitrary string to a canonical {@link JourneyRole}. */
export function isJourneyRole(value: string): value is JourneyRole {
  return (JOURNEY_ROLES as readonly string[]).includes(value);
}

/**
 * JR-001 — every declared `journeyRole` names one of the five canonical roles.
 *
 * Returns a sorted list of hard errors; an empty array means every declared
 * role is legal. A lesson that declares no role is valid: absence is not
 * checked here (see the module note).
 */
export function validateJourneyRoles(lessons: readonly Lesson[]): string[] {
  const errors: string[] = [];
  for (const lesson of lessons) {
    const role: string | undefined = lesson.journeyRole;
    if (role === undefined) continue;
    if (!isJourneyRole(role)) {
      errors.push(
        `JR-001 "${lesson.id}" declares journeyRole "${role}", which is not one of: ${JOURNEY_ROLES.join(", ")}`,
      );
    }
  }
  return errors.sort();
}

/** How many of the given lessons declare a journey role. */
export function countDeclaredJourneyRoles(lessons: readonly Lesson[]): number {
  return lessons.filter((lesson) => lesson.journeyRole !== undefined).length;
}
