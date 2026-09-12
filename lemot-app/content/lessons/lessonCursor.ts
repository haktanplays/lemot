/**
 * Where the learner is inside a lesson, across app lifetimes.
 *
 * The lesson player kept its position in `useState`, so anything that unmounted
 * the route — backgrounding, a tab, a push and pop — silently restarted a
 * twelve-page lesson at page one. Nothing was corrupt; the position simply
 * never existed anywhere but in memory.
 *
 * Deliberately tiny: one cursor, for the lesson currently open. This is not a
 * navigation framework and does not touch progress or completion, which are
 * separate, already-persisted facts. Losing this record costs the learner their
 * place; it can never cost them a finished lesson.
 *
 * Pure parse/serialise here so the rules can be tested without a device.
 */
export type LessonCursor = {
  lessonId: string;
  /** Authored page index, 0-based. */
  screenIndex: number;
  /**
   * Position inside a multi-step chain on that page.
   *
   * Only the INDEX is kept, never an answer. Reopening at step 2 mounts a
   * clean step 2: the learner is put back where they were without the runtime
   * inheriting a stale attempt, which is the failure the chain key exists to
   * prevent. Scoped by the chain's screen id so a cursor cannot apply a step
   * number to the wrong chain.
   */
  chainScreenId?: string;
  stepIndex?: number;
};

export const LESSON_CURSOR_KEY = "lm.lessonCursor.v1";

export function serializeCursor(cursor: LessonCursor): string {
  return JSON.stringify({
    lessonId: cursor.lessonId,
    screenIndex: cursor.screenIndex,
    ...(cursor.chainScreenId !== undefined && cursor.stepIndex !== undefined
      ? { chainScreenId: cursor.chainScreenId, stepIndex: cursor.stepIndex }
      : {}),
  });
}

/**
 * Parse a stored cursor, tolerating everything.
 *
 * Anything unreadable returns null and the learner starts the lesson from the
 * top, which is the old behaviour — so a bad or older record degrades to
 * exactly what shipped before rather than throwing inside a lesson.
 */
export function parseCursor(raw: string | null | undefined): LessonCursor | null {
  if (typeof raw !== "string" || raw.length === 0) return null;
  try {
    const v = JSON.parse(raw) as unknown;
    if (typeof v !== "object" || v === null) return null;
    const { lessonId, screenIndex } = v as Record<string, unknown>;
    if (typeof lessonId !== "string" || lessonId.length === 0) return null;
    if (typeof screenIndex !== "number" || !Number.isInteger(screenIndex) || screenIndex < 0) {
      return null;
    }
    const { chainScreenId, stepIndex } = v as Record<string, unknown>;
    const step =
      typeof chainScreenId === "string" &&
      chainScreenId.length > 0 &&
      typeof stepIndex === "number" &&
      Number.isInteger(stepIndex) &&
      stepIndex >= 0
        ? { chainScreenId, stepIndex }
        : {};
    return { lessonId, screenIndex, ...step };
  } catch {
    return null;
  }
}

/**
 * The page to open a lesson at.
 *
 * Resumes only a cursor belonging to THIS lesson and still inside it. A cursor
 * at or past the last page means the lesson was finished; reopening it should
 * start again rather than land on a completion screen the learner cannot leave
 * forward.
 */
export function resumeIndexFor(
  lessonId: string,
  screenCount: number,
  cursor: LessonCursor | null,
): number {
  if (cursor === null) return 0;
  if (cursor.lessonId !== lessonId) return 0;
  if (cursor.screenIndex <= 0) return 0;
  if (cursor.screenIndex >= screenCount) return 0;
  return cursor.screenIndex;
}

export type LessonBackTarget =
  | { kind: "step"; stepIndex: number }
  | { kind: "page"; index: number }
  | { kind: "exit" };

/**
 * Back inside a lesson: one STEP, else one authored page, else out of the top.
 *
 * The step rung is the whole point. A chain is several actions wearing one page
 * number, so "back" measured in pages skips every step the learner just did —
 * from step 3 they left the exercise entirely instead of returning to step 2.
 * Back has to undo what the learner last saw, and inside a chain that is a step.
 *
 * `stepIndex` is 0 for an ordinary page, which is why the old one-argument
 * call sites keep their exact behaviour.
 */
export function backTarget(screenIndex: number, stepIndex = 0): LessonBackTarget {
  if (stepIndex > 0) return { kind: "step", stepIndex: stepIndex - 1 };
  if (screenIndex > 0) return { kind: "page", index: screenIndex - 1 };
  return { kind: "exit" };
}

/**
 * Which step a page opens at when it is entered BACKWARDS.
 *
 * Entering forwards means starting at step 1; entering backwards means arriving
 * at the step the learner last saw, which is the chain's final one. Opening a
 * chain at step 1 on the way back is the reported symptom — "Back returns to
 * the first step of the exercise" — and it is this rule that was missing, not
 * the page arithmetic.
 *
 * `stepCount` is null for any page that is not a chain, which opens at 0.
 */
export function backwardEntryStep(stepCount: number | null): number {
  if (stepCount === null || !Number.isInteger(stepCount) || stepCount <= 1) return 0;
  return stepCount - 1;
}

/**
 * The step to open a chain at.
 *
 * Only a cursor recorded for THIS chain counts. A stored step belonging to a
 * different chain, or one past the end after content changed, starts at the
 * beginning rather than at a step that no longer exists.
 */
export function resumeStepFor(
  chainScreenId: string,
  stepCount: number,
  cursor: LessonCursor | null,
): number {
  if (cursor === null) return 0;
  if (cursor.chainScreenId !== chainScreenId) return 0;
  const step = cursor.stepIndex ?? 0;
  if (step <= 0 || step >= stepCount) return 0;
  return step;
}

/**
 * A cursor the learner can actually be offered, or null.
 *
 * ── THE GAP THIS CLOSES ─────────────────────────────────────────────────────
 *
 * The cursor already worked. It is written on every move, cleared exactly on
 * completion, and the lesson route resumes from it correctly — which is why
 * the founder found that re-entering a lesson put them back in the right
 * place. What nothing did was READ it from outside the lesson. Leave the app
 * mid-lesson, come back, and the learner lands on Home with no sign that
 * anything is open; the position was never lost, only unmentioned.
 *
 * So this is deliberately NOT an auto-navigator. A cold start has no evidence
 * that the learner still wants to be where they were three days ago, and
 * dropping them into a lesson they had walked away from is a worse failure
 * than the one being fixed. It answers one question — is there somewhere to
 * continue, and where — and the surface decides what to offer.
 *
 * Pure: the caller supplies the stored string and the lesson, so this can be
 * tested without a device and cannot reach storage on its own.
 */
export type ResumePoint = {
  readonly lessonId: string;
  /** 1-based, for a learner-facing "Part 4 of 12". Never the raw index. */
  readonly part: number;
  readonly partCount: number;
};

export function resumePointFor(
  raw: string | null | undefined,
  lessons: readonly { id: string; screens: readonly unknown[] }[],
): ResumePoint | null {
  const cursor = parseCursor(raw);
  if (cursor === null) return null;
  const lesson = lessons.find((l) => l.id === cursor.lessonId);
  if (lesson === undefined) return null;
  const partCount = lesson.screens.length;
  // The same three refusals `resumeIndexFor` makes, for the same reasons: a
  // cursor at or past the end is a finished lesson whose removal did not land,
  // and offering to continue INTO a completion screen is the one thing worse
  // than offering nothing.
  const index = resumeIndexFor(cursor.lessonId, partCount, cursor);
  if (index <= 0) return null;
  return { lessonId: cursor.lessonId, part: index + 1, partCount };
}
