/**
 * Wave A lesson interaction orchestration (PR-06) — pure, deterministic.
 *
 * The one place that knows how a shipped screen's UI FACTS become learning
 * evidence. Screens report what happened on the surface (an option id, a typed
 * string, a hint rung, a play count); this module decides the exercise identity,
 * the evidence targets, the treatments, the assistance snapshot and the authored
 * opportunity — and the controller decides attribution, admissibility and the
 * final evidence class from that.
 *
 * Why it is pure and lives outside the components: every rule here is testable
 * without a React renderer, and no screen can reach around it. Screens never
 * construct a `LearningEvent`, never touch the repository, never name an
 * evidence class, and never decide admissibility.
 *
 * PROMPT FADE. Every shipped v1 screen currently renders one fixed form with no
 * fade integration, so `PF0` is stated here as an OBSERVED property of this
 * surface — not inherited as a controller default (the controller has none).
 * When real fade arrives, this is the single place that changes.
 */
import type {
  ExerciseBlueprint,
  ItemId,
  OpenProductionExercise,
} from "../learning-engine/types";
import type { ErrorTagCode } from "../learning-engine/events";
import type {
  AttemptEvidenceContext,
  GradeResultLike,
  RecordGradedAttemptInput,
} from "../learning-engine/session-controller";
import type {
  AssistanceSnapshot,
  ConstitutiveSupport,
  EvidenceOpportunityContext,
  HintRung,
} from "../learning-engine/evidence-context";
import type {
  FillWithTrapsScreen,
  Lesson,
  LessonScreen,
  MeetCardScreen,
  SayItYourWayScreen,
  WeaveScreen,
} from "../lessonTypes";
import { qualifyLessonScreenId, resolveEvidenceTargetItemIds } from "./identity";
import { resolveLessonTreatmentForItem } from "./treatment";
import { evaluateTypedAnswer, type TypedEvaluation } from "./typedEvaluation";

/** The prompt-fade level every shipped v1 screen actually renders today. */
const SHIPPED_PROMPT_LEVEL = "PF0" as const;

/** Assistance with nothing applied — a clean, unaided first attempt. */
function cleanAssistance(over: Partial<Extract<AssistanceSnapshot, { capture: "known" }>> = {}): AssistanceSnapshot {
  return {
    capture: "known",
    constitutive: [],
    hintRung: 0,
    retryIndex: 0,
    selfCorrection: false,
    priorAnswerExposure: "none",
    accessibility: { replayCount: 0, slowPlayback: false },
    ...over,
  };
}

/**
 * The authored opportunity behind a shipped lesson action.
 *
 * `requiredConstitutiveSupport` is what the PAYLOAD declares the task needs; the
 * assistance snapshot separately reports what the SCREEN actually rendered. When
 * they disagree the admission resolver quarantines the attempt as a UI-flow
 * defect — the learner was asked for something the opportunity never gave them.
 */
function opportunity(args: {
  requiredConstitutiveSupport?: readonly ConstitutiveSupport[];
  graded: boolean;
}): EvidenceOpportunityContext {
  return {
    authored: true,
    prerequisitesSafe: true,
    // Nothing is graded on a non-assessed interaction, so claiming an approved
    // evaluator ran would be false.
    evaluator: args.graded ? "approved_deterministic" : "not_applicable",
    learnerAuthorship: "verified",
    requiredConstitutiveSupport: args.requiredConstitutiveSupport ?? [],
    qualityIncident: null,
  };
}

function context(args: {
  lesson: Lesson;
  assistance: AssistanceSnapshot;
  opportunity: EvidenceOpportunityContext;
}): AttemptEvidenceContext {
  return {
    promptLevel: SHIPPED_PROMPT_LEVEL,
    assistance: args.assistance,
    opportunity: args.opportunity,
    treatmentFor: (itemId) => resolveLessonTreatmentForItem(itemId, args.lesson),
  };
}

function baseFields(lesson: Lesson, screen: LessonScreen) {
  return {
    id: qualifyLessonScreenId(lesson.id, screen.id),
    lessonId: lesson.id,
    targetItemIds: resolveEvidenceTargetItemIds(screen),
  };
}

// ── PM-001: Meet exposure ───────────────────────────────────────────────────

export type MeetExposureFacts = {
  /** How many times the learner tapped play. Never a grade, never a score. */
  ttsPlayCount: number;
};

export type ExposureInteraction = {
  exercise: ExerciseBlueprint;
  context: AttemptEvidenceContext;
};

/**
 * A Meet card is EXPOSURE: the learner met a form, nothing was asked of them.
 *
 * The blueprint is recognition-shaped only because that is the stable container
 * for an id, targets and displayed French — the emitted interaction is
 * non-assessed and carries no mastery claim whatsoever.
 *
 * Replay count is `max(0, plays - 1)`: the first play is hearing it, not
 * replaying it. Conservative on purpose — audio attribution and real replay
 * analysis are Wave B, and this must not pre-empt them.
 */
export function meetExposureInteraction(
  lesson: Lesson,
  screen: MeetCardScreen,
  facts: MeetExposureFacts,
): ExposureInteraction {
  const replayCount = Math.max(0, Math.floor(facts.ttsPlayCount) - 1);
  return {
    exercise: {
      ...baseFields(lesson, screen),
      operation: "recognition",
      displayAnswer: screen.payload.fr,
    },
    context: context({
      lesson,
      assistance: cleanAssistance({
        accessibility: { replayCount, slowPlayback: false },
      }),
      opportunity: opportunity({ graded: false }),
    }),
  };
}

// ── PM-002 / PM-004: contextual choice + register discrimination ────────────

export type ChoiceFacts = {
  /** The option the learner tapped. */
  optionId: string;
};

/**
 * Machine grading result for one authored choice.
 *
 * A correct option is `correct`. An incorrect option uses its authored
 * `learningErrorTag` — a register trap is `wrong_register`, which keeps the miss
 * learner-attributed and admitted rather than reclassifying real French as a
 * defect. Absent an authored tag the conservative default is `wrong_item`;
 * `trapReason` (human prose) is never parsed, and option text is never inspected.
 */
export function gradeChoice(
  screen: FillWithTrapsScreen,
  optionId: string,
): GradeResultLike {
  const option = screen.payload.options.find((o) => o.id === optionId);
  if (option === undefined) {
    throw new Error(
      `lesson evidence: screen "${screen.id}" has no option "${optionId}"`,
    );
  }
  const isCorrect = screen.payload.answer.includes(option.id);
  const result: ErrorTagCode = isCorrect
    ? "correct"
    : (option.learningErrorTag ?? "wrong_item");
  return { result, errorTags: [result], normalizedAnswer: option.text };
}

export function choiceInteraction(
  lesson: Lesson,
  screen: FillWithTrapsScreen,
  facts: ChoiceFacts,
): RecordGradedAttemptInput {
  const correctOption = screen.payload.options.find((o) =>
    screen.payload.answer.includes(o.id),
  );
  const chosen = screen.payload.options.find((o) => o.id === facts.optionId);
  return {
    exercise: {
      ...baseFields(lesson, screen),
      operation: "recognition",
      displayAnswer: correctOption?.text,
    },
    userAnswer: chosen?.text ?? null,
    expectedAnswer: correctOption?.text ?? null,
    gradeResult: gradeChoice(screen, facts.optionId),
    // A single tap, one shot, nothing hidden and nothing revealed first. No retry
    // UI exists, so `retryIndex` is 0 as a FACT — not because a field needed a
    // value, and no retry affordance was added to populate it.
    context: context({
      lesson,
      assistance: cleanAssistance(),
      opportunity: opportunity({ graded: true }),
    }),
  };
}

// ── PM-007 / PM-009 / PM-011: typed production through Weave ────────────────

export type TypedAttemptFacts = {
  /** Exactly what the learner typed. */
  text: string;
  /** 0 none · 1 pieces asked for · 2 cloze asked for. The ACTUAL rung reached. */
  hintRung: HintRung;
  /**
   * Whether the screen actually rendered the declared constitutive package. A
   * declared-but-unrendered package is a UI-flow defect, not a learner miss.
   */
  constitutiveSupportRendered: boolean;
};

/** Constitutive pieces this payload declares (visible from first render). */
export function declaredConstitutivePieces(screen: WeaveScreen) {
  return (screen.payload.suggestedPieces ?? []).filter(
    (p) => p.supportRole === "constitutive",
  );
}

/** Evaluate a typed answer against a Weave payload — the ONE shared decision. */
export function evaluateWeaveAnswer(
  screen: WeaveScreen,
  text: string,
): TypedEvaluation {
  return evaluateTypedAnswer({
    userAnswer: text,
    expectedAnswers: screen.payload.expectedAnswers,
    acceptedAlternatives: screen.payload.acceptedAlternatives,
    operation: "fill",
  });
}

export function typedAttemptInteraction(
  lesson: Lesson,
  screen: WeaveScreen,
  facts: TypedAttemptFacts,
): RecordGradedAttemptInput {
  const declared = declaredConstitutivePieces(screen);
  const requiresPackage = declared.length > 0;
  // The package is ONE support fact, however many pieces make it up.
  const required: ConstitutiveSupport[] = requiresPackage ? ["supplied_package"] : [];
  const present: ConstitutiveSupport[] =
    requiresPackage && facts.constitutiveSupportRendered ? ["supplied_package"] : [];

  return {
    exercise: {
      ...baseFields(lesson, screen),
      operation: "fill",
      targetText: screen.payload.expectedAnswers[0],
    },
    userAnswer: facts.text,
    expectedAnswer: screen.payload.expectedAnswers[0] ?? null,
    gradeResult: evaluateWeaveAnswer(screen, facts.text).grade,
    context: context({
      lesson,
      assistance: cleanAssistance({
        constitutive: present,
        hintRung: facts.hintRung,
        // One Check per screen in the current flow; no revision step exists, so
        // there is nothing to call a retry or a self-correction.
        retryIndex: 0,
        selfCorrection: false,
        priorAnswerExposure: "none",
      }),
      opportunity: opportunity({ graded: true, requiredConstitutiveSupport: required }),
    }),
  };
}

// ── PM-014: open production attempt + comparison reveal ─────────────────────

export type OpenAttemptFacts = {
  /** Exactly what the learner wrote. Preserved raw on the attempt event only. */
  text: string;
  /** Whether the learner opened the optional idea pieces before committing. */
  ideaPiecesShown: boolean;
  /** How many times they returned to edit before comparing. */
  revisionCount: number;
  /** The model answer shown afterwards. Never a correctness standard. */
  modelAnswer: string | null;
};

export type OpenAttemptInteraction = {
  attempt: { exercise: OpenProductionExercise; context: AttemptEvidenceContext; userAnswer: string };
  reveal: { exercise: OpenProductionExercise; context: AttemptEvidenceContext; modelAnswer: string | null };
};

/**
 * PM-014: an ungraded attempt, then a comparison reveal — two events, in order.
 *
 * Neither is assessed. The attempt records that the learner reached for the
 * language and preserves what they wrote; the reveal records that they then saw
 * a model. Seeing a better sentence is not a failure, so the difference between
 * the two never becomes weakness, and the model answer never becomes a grade.
 *
 * This is deliberately NOT self-correction (PM-015): the learner is not revising
 * after seeing their own error, and marking it so would manufacture a repair
 * event out of a comparison.
 */
export function openAttemptInteraction(
  lesson: Lesson,
  screen: SayItYourWayScreen,
  facts: OpenAttemptFacts,
): OpenAttemptInteraction {
  const exercise: OpenProductionExercise = {
    ...baseFields(lesson, screen),
    operation: "open_production",
    modelAnswer: facts.modelAnswer ?? undefined,
    validationMode: "model-answer-only",
  };
  const shared = context({
    lesson,
    assistance: cleanAssistance({
      // Optional idea pieces the learner CHOSE to open are ordinary rung-1 help.
      hintRung: facts.ideaPiecesShown ? 1 : 0,
      retryIndex: Math.max(0, Math.floor(facts.revisionCount)),
      selfCorrection: false,
      // The model is shown only AFTER Keep and compare, so nothing was exposed
      // while the learner was writing.
      priorAnswerExposure: "none",
    }),
    opportunity: opportunity({ graded: false }),
  });
  return {
    attempt: { exercise, context: shared, userAnswer: facts.text },
    reveal: { exercise, context: shared, modelAnswer: facts.modelAnswer },
  };
}

/** Re-exported so callers need one import for the shared typed decision. */
export type { TypedEvaluation };
export type { ItemId };
