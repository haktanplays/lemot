/**
 * Structural production-quality guards (PQ-2, PQ-3) — pure, static.
 *
 * This module owns the ONE canonical answer to "is this a meaningful
 * production action?", so the repo stops carrying competing definitions in
 * separate test files.
 *
 * A meaningful production action requires the learner to retrieve, construct,
 * arrange, type or say non-trivial intended French. Reading, exposure, insight,
 * reveal, recap, TTS and Continue are not production — and neither is
 * `fill-with-traps`: choosing among supplied options is constrained completion,
 * not generation. The shipped evidence layer agrees: `interactions.ts` grades a
 * fill through `choiceInteraction` (a selection over authored options) while
 * weave and say-it go through `typedAttemptInteraction` /
 * `openAttemptInteraction`, where the learner supplies the French.
 *
 * STATIC INTENT, NOT RUNTIME FACT. Everything here reads AUTHORED structure.
 * `weaveType` is the author's declared difficulty tier and
 * `supportRole: "constitutive"` is the author's declaration that a piece is
 * visible from first render. Neither proves what a given learner actually saw
 * at attempt time — `required: true` and the mere existence of a hint ladder
 * prove even less, and are deliberately not read as support here.
 *
 * What this module deliberately does NOT do: impose any production COUNT.
 * There is no floor, ceiling or exact lock. The archetype templates' numeric
 * ranges stay authoring guidance; a count is reported for information only.
 */
import type { Lesson, LessonScreen } from "../lessonTypes";

export type ProductionKind = "typed" | "open";

export type ProductionAction = {
  lessonId: string;
  screenId: string;
  /** `typed` = weave (construct the sentence); `open` = say-it (free production). */
  kind: ProductionKind;
  /**
   * Authored support level, LOWER = less scaffolding.
   *
   * Open production sits at 0 because nothing is supplied. Weaves are ordered
   * by their declared `weaveType`, and any weave declaring constitutive support
   * is pushed to the most-scaffolded rank regardless of tier: a piece visible
   * from first render is supplied, whatever the tier claims.
   */
  supportRank: number;
  /** True when the screen declares a `supportRole: "constitutive"` piece. */
  constitutive: boolean;
  /** Normalized reference answer(s) the task expects. */
  answers: readonly string[];
  /** Normalized task text — a weave prompt or a say-it situation. */
  task: string;
};

const WEAVE_SUPPORT_RANK: Readonly<Record<string, number>> = Object.freeze({
  open: 1,
  context: 2,
  mid: 3,
  supported: 4,
});
const CONSTITUTIVE_RANK = 5;
const OPEN_PRODUCTION_RANK = 0;

/** Lowercase, strip terminal punctuation and collapse whitespace. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.?!,;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

type AnyPayload = {
  weaveType?: string;
  prompt?: string;
  situation?: string;
  expectedAnswers?: readonly string[];
  modelAnswer?: string;
  suggestedPieces?: readonly { itemId?: string; supportRole?: string }[];
};

/**
 * Whether a screen is a meaningful production action.
 *
 * `fill-with-traps` is excluded on purpose — see the module note. So are all
 * exposure and explanation screens.
 */
export function isMeaningfulProductionAction(screen: LessonScreen): boolean {
  return screen.type === "weave" || screen.type === "say-it-your-way";
}

/** Every meaningful production action in a lesson, in authored order. */
export function productionActions(lesson: Lesson): ProductionAction[] {
  const actions: ProductionAction[] = [];
  for (const screen of lesson.screens ?? []) {
    if (!isMeaningfulProductionAction(screen)) continue;
    const payload = ((screen as LessonScreen & { payload?: unknown }).payload ?? {}) as AnyPayload;
    const constitutive = (payload.suggestedPieces ?? []).some(
      (piece) => piece.supportRole === "constitutive",
    );
    const open = screen.type === "say-it-your-way";
    const supportRank = open
      ? OPEN_PRODUCTION_RANK
      : constitutive
        ? CONSTITUTIVE_RANK
        : (WEAVE_SUPPORT_RANK[payload.weaveType ?? ""] ?? CONSTITUTIVE_RANK);
    const answers = open
      ? payload.modelAnswer !== undefined
        ? [normalize(payload.modelAnswer)]
        : []
      : (payload.expectedAnswers ?? []).map(normalize).slice().sort();
    actions.push({
      lessonId: lesson.id,
      screenId: screen.id,
      kind: open ? "open" : "typed",
      supportRank,
      constitutive,
      answers,
      task: normalize(payload.prompt ?? payload.situation ?? ""),
    });
  }
  return actions;
}

/**
 * The pedagogical demand fingerprint of a production action.
 *
 * Two actions are the same demand only when the learner is asked to do the same
 * thing, the same way, at the same authored support level, for the same
 * reference answer. A shared reference answer alone is NOT duplication — a
 * lesson may legitimately revisit one sentence at a different support level or
 * through a different operation, which is exactly what L0/L3/L4/L5/L9 do.
 */
export function getProductionActionFingerprint(action: ProductionAction): string {
  return [action.kind, String(action.supportRank), action.answers.join("|"), action.task].join("::");
}

/** How many meaningful production actions a lesson contains. Reporting only. */
export function countProductionActions(lesson: Lesson): number {
  return productionActions(lesson).length;
}

export type ProductionQualityDiagnostic = {
  code: "PQ-2" | "PQ-3";
  severity: "error" | "warning";
  lessonId: string;
  screenIds: readonly string[];
  message: string;
};

/**
 * PQ-2 (HARD ERROR) and PQ-3 (WARNING) over the given lessons.
 *
 * PQ-2 — every lesson must contain at least one genuinely generative,
 * low-support retrieval action: a meaningful production action that sits at the
 * lesson's least-scaffolded authored level and does not supply its answer
 * through constitutive support. A lesson of pure recognition, pure
 * fill-with-traps, or fully supplied weaves fails.
 *
 * PQ-3 — two meaningful production actions sharing a demand fingerprint are
 * the same task twice, inflating apparent practice without adding retrieval.
 * Advisory: it reports, it never blocks.
 */
export function reviewProductionQuality(
  lessons: readonly Lesson[],
): ProductionQualityDiagnostic[] {
  const diagnostics: ProductionQualityDiagnostic[] = [];

  for (const lesson of lessons) {
    const actions = productionActions(lesson);

    // PQ-2 — the least-scaffolded action must be genuine generation.
    const lowest = actions.reduce<ProductionAction | undefined>(
      (best, a) => (best === undefined || a.supportRank < best.supportRank ? a : best),
      undefined,
    );
    if (lowest === undefined || lowest.constitutive) {
      diagnostics.push({
        code: "PQ-2",
        severity: "error",
        lessonId: lesson.id,
        screenIds: lowest ? [lowest.screenId] : [],
        message:
          lowest === undefined
            ? `"${lesson.id}" contains no meaningful production action — recognition and supplied-option completion cannot satisfy the retrieval floor`
            : `"${lesson.id}" has no unsupplied production action: its least-scaffolded attempt ("${lowest.screenId}") declares constitutive support`,
      });
    }

    // PQ-3 — identical demand asked twice.
    const byFingerprint = new Map<string, string[]>();
    for (const action of actions) {
      const key = getProductionActionFingerprint(action);
      byFingerprint.set(key, [...(byFingerprint.get(key) ?? []), action.screenId]);
    }
    for (const [, screenIds] of [...byFingerprint.entries()].sort((a, b) =>
      a[0].localeCompare(b[0]),
    )) {
      if (screenIds.length < 2) continue;
      diagnostics.push({
        code: "PQ-3",
        severity: "warning",
        lessonId: lesson.id,
        screenIds: [...screenIds].sort(),
        message:
          `"${lesson.id}" asks the same production demand more than once (${screenIds.join(", ")}) — ` +
          `same operation, same authored support level, same expected answer, same task. ` +
          `Change a meaningful dimension or drop one.`,
      });
    }
  }

  return diagnostics.sort(
    (a, b) =>
      a.lessonId.localeCompare(b.lessonId) ||
      a.code.localeCompare(b.code) ||
      a.screenIds.join(",").localeCompare(b.screenIds.join(",")),
  );
}
