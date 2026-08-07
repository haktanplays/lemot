/**
 * Acquisition-demand drift review (DD-001..DD-004) — pure, ADVISORY ONLY.
 *
 * The source of truth for active-new is and remains
 * `lesson.acquisitionDemandItemIds`. This module never decides ownership: it
 * compares the authored declaration against what the lesson's presentation
 * looks like and raises questions a human should answer. Nothing here may
 * cause a build to fail, and nothing here may be read as "therefore the
 * declaration is wrong".
 *
 * INTERACTION CLASSIFICATION IS HEURISTIC QA EVIDENCE AND IS NOT ACQUISITION
 * ACCOUNTING. The "learner acts here" partition below is not invented for this
 * module — it is read off the shipped evidence layer in
 * `content/lesson-v1-evidence/interactions.ts`, which builds exactly four
 * interactions: `meetExposureInteraction` for a meet-card (documented as
 * "EXPOSURE: the learner met a form, nothing was asked of them"), and
 * `choiceInteraction` / `typedAttemptInteraction` / `openAttemptInteraction`
 * for fill-with-traps / weave / say-it-your-way. Insight-card, natural-reveal
 * and recap have no interaction builder at all. So the partition is the
 * repo's own, not a second taxonomy — and it is used only to phrase a question.
 *
 * Deliberately conservative: false negatives are preferable to false positives,
 * because a noisy advisory layer gets ignored and then hides the real finding.
 */
import { ITEM_REGISTRY } from "../itemRegistry";
import { collectLessonItemIds } from "./acquisitionDemands";
import type { LearningItem, LearningItemType, Lesson, LessonScreen } from "../lessonTypes";

export type DriftSeverity = "warning" | "author-review";

export type DriftDiagnostic = {
  code: "DD-001" | "DD-002" | "DD-003" | "DD-004";
  severity: DriftSeverity;
  lessonId: string;
  itemId: string;
  message: string;
};

/**
 * Screen types where the learner does something, per the shipped evidence layer
 * (see the module note). Meet-card is exposure; insight-card, natural-reveal
 * and recap build no interaction at all.
 */
const LEARNER_ACTION_SCREEN_TYPES: ReadonlySet<string> = new Set([
  "fill-with-traps",
  "weave",
  "say-it-your-way",
]);

/**
 * Item types PRJ-015 IC-002 excludes from active-new outright — "sound /
 * pronunciation items", "culture or cognitive notes", "recognition-only
 * material". Excluded by TYPE, never by `status`: a supported-status item may
 * legitimately be promoted, and DD-003 exists precisely to surface that.
 */
const NON_DEMAND_ITEM_TYPES: ReadonlySet<LearningItemType> = new Set<LearningItemType>([
  "grammar-nugget",
  "sound-pattern",
  "micro-contrast",
  "culture-bite",
  "faux-ami",
  "cognate",
]);

type LessonObservation = {
  /** Items targeted on a screen where the learner acts. */
  actionTargets: Set<string>;
  /** Items supplied as constitutive support on such a screen. */
  constitutiveSupport: Set<string>;
};

/**
 * What a lesson's presentation shows, structurally.
 *
 * Constitutive support is read from the authored `supportRole: "constitutive"`
 * marker — the evidence layer's own machine-only classification for a piece
 * that is visible from first render and therefore scopes the attempt to
 * Supported. An item supplied that way is not evidence of new independent
 * production, however prominently it appears (L1's `un thé` is the shipped
 * example).
 */
function observe(lesson: Lesson): LessonObservation {
  const actionTargets = new Set<string>();
  const constitutiveSupport = new Set<string>();
  for (const screen of lesson.screens ?? []) {
    if (!LEARNER_ACTION_SCREEN_TYPES.has(screen.type)) continue;
    for (const id of screen.targetItemIds ?? []) actionTargets.add(id);
    const payload = (screen as LessonScreen & { payload?: unknown }).payload as
      | { suggestedPieces?: readonly { itemId?: string; supportRole?: string }[] }
      | undefined;
    for (const piece of payload?.suggestedPieces ?? []) {
      if (piece.supportRole === "constitutive" && piece.itemId !== undefined) {
        constitutiveSupport.add(piece.itemId);
      }
    }
  }
  return { actionTargets, constitutiveSupport };
}

/** Whether an item could ever be an independent acquisition demand. */
function couldCarryDemand(item: LearningItem | undefined): boolean {
  if (item === undefined) return false;
  if (item.acquisitionComponents !== undefined) return false;
  if (item.acquisitionLink?.role === "linked") return false;
  return !NON_DEMAND_ITEM_TYPES.has(item.type);
}

/**
 * DD-001..DD-004 over the lessons, in order.
 *
 * Lesson order matters: "first-time" in DD-002/DD-004 means no earlier lesson
 * in the given sequence targeted the item on a learner-action screen.
 *
 * DD-001 a declared demand the lesson never puts in front of a learner action ·
 * DD-002 a first-time action target that nobody declared · DD-003 a declared
 * demand whose registry status is supported/recognition (a legal IC-002
 * promotion worth a look) · DD-004 an explicit-zero lesson that nonetheless
 * shows a first-time action target.
 */
export function reviewAcquisitionDemandDrift(
  lessons: readonly Lesson[],
  registry: Readonly<Record<string, LearningItem>> = ITEM_REGISTRY,
): DriftDiagnostic[] {
  const diagnostics: DriftDiagnostic[] = [];
  const actedBefore = new Set<string>();

  for (const lesson of lessons) {
    const declared = lesson.acquisitionDemandItemIds;
    const { actionTargets, constitutiveSupport } = observe(lesson);

    if (declared !== undefined) {
      const referenced = collectLessonItemIds(lesson);
      for (const id of declared) {
        // DD-001 — declared, structurally present, but never worked.
        if (referenced.has(id) && !actionTargets.has(id)) {
          diagnostics.push({
            code: "DD-001",
            severity: "warning",
            lessonId: lesson.id,
            itemId: id,
            message:
              `"${id}" is declared as an acquisition demand but appears only in recognition-style ` +
              `presentation — no screen puts it behind a learner action. The declaration may still ` +
              `be right; the presentation may be the thing to revisit.`,
          });
        }
        // DD-003 — a promotion. Legal under IC-002, never a failure.
        const item = registry[id];
        if (item !== undefined && (item.status === "supported" || item.status === "recognition")) {
          diagnostics.push({
            code: "DD-003",
            severity: "author-review",
            lessonId: lesson.id,
            itemId: id,
            message:
              `"${id}" is declared as a new demand but its registry status is "${item.status}". ` +
              `That is a legitimate IC-002 promotion — confirm it is intended, and consider whether ` +
              `the global status row is now stale.`,
          });
        }
      }
    }

    // DD-002 / DD-004 — first-time action targets nobody declared.
    const novel = [...actionTargets]
      .filter((id) => !actedBefore.has(id))
      .filter((id) => !(declared ?? []).includes(id))
      .filter((id) => !constitutiveSupport.has(id))
      .filter((id) => couldCarryDemand(registry[id]))
      .sort();

    for (const id of novel) {
      const zeroLesson = declared !== undefined && declared.length === 0;
      diagnostics.push(
        zeroLesson
          ? {
              code: "DD-004",
              severity: "author-review",
              lessonId: lesson.id,
              itemId: id,
              message:
                `"${lesson.id}" declares zero acquisition demands, but "${id}" is worked here for the ` +
                `first time. Confirm it is genuinely recycled or supported rather than novel.`,
            }
          : {
              code: "DD-002",
              severity: "author-review",
              lessonId: lesson.id,
              itemId: id,
              message:
                `"${id}" is worked here for the first time but is not declared as an acquisition ` +
                `demand. Confirm it is supported/composed material rather than a forgotten declaration.`,
            },
      );
    }

    for (const id of actionTargets) actedBefore.add(id);
  }

  // Stable ordering so CI output never flaps.
  return diagnostics.sort(
    (a, b) =>
      a.lessonId.localeCompare(b.lessonId) ||
      a.code.localeCompare(b.code) ||
      a.itemId.localeCompare(b.itemId),
  );
}

/** Count diagnostics by severity, for a concise validator summary. */
export function summarizeDrift(diagnostics: readonly DriftDiagnostic[]): {
  warnings: number;
  authorReviews: number;
} {
  return {
    warnings: diagnostics.filter((d) => d.severity === "warning").length,
    authorReviews: diagnostics.filter((d) => d.severity === "author-review").length,
  };
}
