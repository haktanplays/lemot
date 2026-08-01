/**
 * Shipped-lesson evidence-metadata validator (PR-06) — pure, deterministic.
 *
 * PR-06 added machine-only fields to the shipped lesson types
 * (`evidenceTargetItemIds`, `learningErrorTag`, `supportRole`). Each of them
 * decides something the append-only event log records permanently — which item
 * gets credited, which taxonomy code a miss carries, whether an attempt counts
 * as independent. A malformed one does not crash anything; it quietly writes the
 * wrong thing forever. So they are checked at build time, not trusted.
 *
 * Also enforces the identity rule PR-06 depends on: screen ids repeat across
 * lessons, so only the QUALIFIED id (`lessonId/screenId`) is a safe global
 * exercise/payload identity — and it must actually be unique.
 *
 * Pure: no clock, no storage, no network. Findings are emitted in lesson/screen
 * order so output is stable.
 */
import { ERROR_TAG_CODES } from "../content/learning-engine/events";
import type { ErrorTagCode } from "../content/learning-engine/events";
import { qualifyLessonScreenId } from "../content/lesson-v1-evidence/identity";
import { isCanonicalItemId } from "../content/identity/canonicalItems";
import { hasFixtureAlias } from "../content/identity/fixtureCompat";
import type { Lesson, LessonScreen } from "../content/lessonTypes";

export type LessonEvidenceFinding = {
  code:
    | "evidence_target_not_canonical"
    | "evidence_target_not_subset"
    | "evidence_target_duplicate"
    | "evidence_target_empty"
    | "choice_tag_on_correct_option"
    | "choice_tag_claims_success"
    | "choice_tag_unknown"
    | "constitutive_piece_without_item"
    | "constitutive_piece_not_canonical"
    | "constitutive_piece_duplicate"
    | "open_production_graded"
    | "duplicate_screen_id"
    | "duplicate_qualified_screen_id";
  severity: "error";
  lessonId: string;
  screenId?: string;
  message: string;
};

const TAG_SET: ReadonlySet<string> = new Set<string>(ERROR_TAG_CODES);
/** A result that ASSERTS success. An authored trap may never claim one. */
const SUCCESS_TAGS: ReadonlySet<ErrorTagCode> = new Set<ErrorTagCode>([
  "correct",
  "accepted_variant",
]);

function checkEvidenceTargets(
  lesson: Lesson,
  screen: LessonScreen,
  out: LessonEvidenceFinding[],
): void {
  const narrowed = screen.evidenceTargetItemIds;
  if (narrowed === undefined) return;
  const base = { severity: "error" as const, lessonId: lesson.id, screenId: screen.id };

  if (narrowed.length === 0) {
    out.push({
      ...base,
      code: "evidence_target_empty",
      message: `${lesson.id}/${screen.id}: evidenceTargetItemIds is empty — omit the field instead of claiming the action demonstrates nothing`,
    });
    return;
  }
  if (new Set(narrowed).size !== narrowed.length) {
    out.push({
      ...base,
      code: "evidence_target_duplicate",
      message: `${lesson.id}/${screen.id}: evidenceTargetItemIds repeats an id`,
    });
  }
  const declared = new Set(screen.targetItemIds ?? []);
  for (const id of narrowed) {
    if (!declared.has(id)) {
      out.push({
        ...base,
        code: "evidence_target_not_subset",
        message: `${lesson.id}/${screen.id}: evidence target "${id}" is not among targetItemIds`,
      });
    }
    if (!isCanonicalItemId(id)) {
      out.push({
        ...base,
        code: "evidence_target_not_canonical",
        message:
          `${lesson.id}/${screen.id}: evidence target "${id}" is not a canonical runtime item` +
          (hasFixtureAlias(id) ? " (it is a FIXTURE alias — never valid in a shipped lesson)" : ""),
      });
    }
  }
}

function checkChoiceTags(
  lesson: Lesson,
  screen: LessonScreen,
  out: LessonEvidenceFinding[],
): void {
  if (screen.type !== "fill-with-traps") return;
  const base = { severity: "error" as const, lessonId: lesson.id, screenId: screen.id };
  const answers = new Set(screen.payload.answer);

  for (const option of screen.payload.options) {
    const tag = option.learningErrorTag;
    if (tag === undefined) continue;
    const isCorrect = answers.has(option.id);
    if (isCorrect) {
      out.push({
        ...base,
        code: "choice_tag_on_correct_option",
        message: `${lesson.id}/${screen.id}: correct option "${option.id}" carries a learningErrorTag — a correct answer has no error to tag`,
      });
      continue;
    }
    if (!TAG_SET.has(tag)) {
      out.push({
        ...base,
        code: "choice_tag_unknown",
        message: `${lesson.id}/${screen.id}: option "${option.id}" uses "${tag}", which is not a frozen ErrorTagCode`,
      });
      continue;
    }
    if (SUCCESS_TAGS.has(tag)) {
      out.push({
        ...base,
        code: "choice_tag_claims_success",
        message: `${lesson.id}/${screen.id}: incorrect option "${option.id}" claims "${tag}" — an authored trap may never grade as success`,
      });
    }
  }
}

function checkWeaveSupport(
  lesson: Lesson,
  screen: LessonScreen,
  out: LessonEvidenceFinding[],
): void {
  if (screen.type !== "weave") return;
  const base = { severity: "error" as const, lessonId: lesson.id, screenId: screen.id };
  const constitutive = (screen.payload.suggestedPieces ?? []).filter(
    (p) => p.supportRole === "constitutive",
  );
  const seen = new Set<string>();

  for (const piece of constitutive) {
    if (piece.itemId === undefined) {
      out.push({
        ...base,
        code: "constitutive_piece_without_item",
        message: `${lesson.id}/${screen.id}: a constitutive piece ("${piece.text}") has no itemId — constitutive support must be identifiable, not just visible`,
      });
      continue;
    }
    if (!isCanonicalItemId(piece.itemId)) {
      out.push({
        ...base,
        code: "constitutive_piece_not_canonical",
        message: `${lesson.id}/${screen.id}: constitutive piece names "${piece.itemId}", which is not a canonical runtime item`,
      });
    }
    if (seen.has(piece.itemId)) {
      out.push({
        ...base,
        code: "constitutive_piece_duplicate",
        message: `${lesson.id}/${screen.id}: constitutive item "${piece.itemId}" is supplied twice`,
      });
    }
    seen.add(piece.itemId);
  }
}

function checkOpenProduction(
  lesson: Lesson,
  screen: LessonScreen,
  out: LessonEvidenceFinding[],
): void {
  if (screen.type !== "say-it-your-way") return;
  // An open attempt is ungraded by contract (W1). `answerBands` are reading
  // examples shown afterwards, never a comparison standard — but a deterministic
  // validation mode would route this through a grader that must never see it.
  const mode = screen.payload.validationMode;
  if (mode === "exact-or-alternative" || mode === "expected-bank") {
    out.push({
      severity: "error",
      lessonId: lesson.id,
      screenId: screen.id,
      code: "open_production_graded",
      message: `${lesson.id}/${screen.id}: open production declares validationMode "${mode}" — an ungraded attempt must never be routed through deterministic grading`,
    });
  }
}

/** Run every PR-06 evidence-metadata rule over the shipped v1 lessons. */
export function checkLessonEvidenceRules(
  lessons: readonly Lesson[],
): LessonEvidenceFinding[] {
  const out: LessonEvidenceFinding[] = [];
  const qualifiedSeen = new Map<string, string>();

  for (const lesson of lessons) {
    const localSeen = new Set<string>();
    for (const screen of lesson.screens) {
      if (localSeen.has(screen.id)) {
        out.push({
          severity: "error",
          lessonId: lesson.id,
          screenId: screen.id,
          code: "duplicate_screen_id",
          message: `${lesson.id}: screen id "${screen.id}" appears more than once`,
        });
      }
      localSeen.add(screen.id);

      // The identity PR-06 actually persists. Bare screen ids repeat ACROSS
      // lessons by design; the qualified form must not.
      const qualified = qualifyLessonScreenId(lesson.id, screen.id);
      const owner = qualifiedSeen.get(qualified);
      if (owner !== undefined) {
        out.push({
          severity: "error",
          lessonId: lesson.id,
          screenId: screen.id,
          code: "duplicate_qualified_screen_id",
          message: `qualified screen id "${qualified}" is claimed by two lessons (${owner} and ${lesson.id})`,
        });
      }
      qualifiedSeen.set(qualified, lesson.id);

      checkEvidenceTargets(lesson, screen, out);
      checkChoiceTags(lesson, screen, out);
      checkWeaveSupport(lesson, screen, out);
      checkOpenProduction(lesson, screen, out);
    }
  }
  return out;
}
