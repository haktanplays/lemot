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

/** Back inside a lesson: one authored page, or out of the lesson at the top. */
export function backTarget(screenIndex: number): { kind: "page"; index: number } | { kind: "exit" } {
  if (screenIndex > 0) return { kind: "page", index: screenIndex - 1 };
  return { kind: "exit" };
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
