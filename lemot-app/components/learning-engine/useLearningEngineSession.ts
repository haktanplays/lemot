import { useMemo, useRef, useState } from "react";
import { LocalRepository } from "@/content/learning-engine/repository/local";
import {
  LearningSessionController,
  type AttemptEvidenceContext,
  type GradedAttemptPayload,
  type SessionState,
} from "@/content/learning-engine/session-controller";
import type { ExerciseBlueprint, LessonContract } from "@/content/learning-engine/types";
import { resolveTreatmentForItem } from "@/content/learning-engine/treatment-resolver";
import type { EvidenceOpportunityContext } from "@/content/learning-engine/evidence-context";

/**
 * Learner-session hook (P3.6 + P3.7).
 *
 * Owns ONE `LocalRepository` and ONE `LearningSessionController` for the life of
 * the renderer, exposes the two record callbacks the shell hands to cards, and
 * mirrors the controller's derived `SessionState` (status + latest
 * `MasterySnapshot`) into React state. All appends go through the controller's
 * serialized queue — no component ever touches `LocalRepository.appendEvent`
 * directly, and the snapshot is a pure projection of stored events (P3.7).
 *
 * `lessonId` / `contentVersion` are captured at mount (a fresh fixture deep-link
 * remounts the route → a new session). No remote/Supabase/network/AI.
 */
const IDLE_STATE: SessionState = {
  status: "idle",
  latestSnapshot: null,
  events: [],
  lastEventCount: 0,
  lastSavedAt: null,
};

// Founder-local session id (no `Date.now`; the controller owns the only clock).
let sessionSeq = 0;
function newLocalSessionId(): string {
  sessionSeq += 1;
  return `lm-sess-${sessionSeq.toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * What a card reports. The evidence CONTEXT is added by this hook, so cards stay
 * concerned only with the learner's answer and its grade.
 */
export type LearnerAttemptInput = GradedAttemptPayload & {
  exercise: ExerciseBlueprint;
};
export type LearnerRevealInput = { exercise: ExerciseBlueprint };

export type LearnerSession = {
  recordGradedAttempt: (input: LearnerAttemptInput) => void;
  recordRecognitionReveal: (input: LearnerRevealInput) => void;
  /** Latest derived session state (status + MasterySnapshot), mirrored from the controller. */
  state: SessionState;
};

/**
 * The attempt context THIS fixture renderer can honestly state (PR-03).
 *
 * The sandbox has no hint ladder, no retry affordance, no reveal-before-answer
 * flow, no self-correction step and no audio controls — so every field below is
 * a FACT about this surface, not a convenient default. `PF0` is supplied here
 * precisely because this renderer operates at PF0; it is no longer a hidden
 * universal default buried in the framework-agnostic controller.
 *
 * PR-05 / PR-06 shipped-lesson integration MUST build its own context from the
 * real screen state (actual hint rung, actual retry index, actual prior
 * exposure, actual replay/slow counts). Copying this block would re-introduce
 * exactly the hidden-default problem PR-03 removed.
 */
const FIXTURE_OPPORTUNITY: EvidenceOpportunityContext = Object.freeze({
  authored: true,
  prerequisitesSafe: true,
  evaluator: "approved_deterministic" as const,
  learnerAuthorship: "verified" as const,
  requiredConstitutiveSupport: Object.freeze([]),
  qualityIncident: null,
});

export function useLearningEngineSession(opts: {
  lessonId: string;
  contentVersion: string;
  /** The validated fixture contract — the authored source of target treatments. */
  contract: LessonContract;
}): LearnerSession {
  const [state, setState] = useState<SessionState>(IDLE_STATE);
  const controllerRef = useRef<LearningSessionController | null>(null);
  if (controllerRef.current === null) {
    controllerRef.current = new LearningSessionController({
      repository: new LocalRepository(),
      sessionId: newLocalSessionId(),
      lessonId: opts.lessonId,
      contentVersion: opts.contentVersion,
      onUpdate: setState,
    });
  }
  const controller = controllerRef.current;
  const contract = opts.contract;

  return useMemo<LearnerSession>(() => {
    const context = (): AttemptEvidenceContext => ({
      promptLevel: "PF0",
      assistance: {
        capture: "known",
        constitutive: [],
        hintRung: 0,
        retryIndex: 0,
        selfCorrection: false,
        priorAnswerExposure: "none",
        accessibility: { replayCount: 0, slowPlayback: false },
      },
      opportunity: FIXTURE_OPPORTUNITY,
      treatmentFor: (itemId) => resolveTreatmentForItem(itemId, contract),
    });
    return {
      recordGradedAttempt: (input) =>
        controller.recordGradedAttempt({ ...input, context: context() }),
      recordRecognitionReveal: (input) =>
        controller.recordRecognitionReveal({ ...input, context: context() }),
      state,
    };
  }, [controller, contract, state]);
}
