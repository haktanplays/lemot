import { useEffect, useMemo, useRef, useState } from "react";
import {
  LearningSessionController,
  type AttemptEvidenceContext,
  type EventSurfaceResolver,
  type GradedAttemptPayload,
  type SessionState,
} from "@/content/learning-engine/session-controller";
import type { ExerciseBlueprint, LessonContract } from "@/content/learning-engine/types";
import { resolveTreatmentForItem } from "@/content/learning-engine/treatment-resolver";
import type { EvidenceOpportunityContext } from "@/content/learning-engine/evidence-context";
import { useLearningEngineRuntime } from "@/providers/LearningEngineProvider";

/**
 * Learner-session hook (P3.6 + P3.7; runtime-owned since PR-05).
 *
 * Owns ONE `LearningSessionController` for the life of the renderer, exposes the
 * two record callbacks the shell hands to cards, and mirrors the controller's
 * derived `SessionState` (status + latest `MasterySnapshot`) into React state.
 * All appends go through the controller's serialized queue — no component ever
 * touches `LocalRepository.appendEvent` directly, and the snapshot is a pure
 * projection of stored events (P3.7).
 *
 * PR-05 removed the `new LocalRepository()` that used to live here. The
 * repository is now owned by `LearningEngineProvider` and reached only through
 * the runtime, so the sandbox and the shipped lesson path share one repository
 * and one privacy-reset acknowledgement epoch instead of two.
 *
 * No remote/Supabase/network/AI.
 */
const IDLE_STATE: SessionState = {
  status: "idle",
  latestSnapshot: null,
  events: [],
  lastEventCount: 0,
  lastSavedAt: null,
};

/**
 * Where the fixture sandbox's events happen.
 *
 * This used to be a hardcoded default inside the framework-agnostic controller.
 * It is stated here instead, by the surface it actually describes: the flag-gated
 * fixture path. The exercise variation and the sentence identity genuinely do not
 * exist for a fixture, so they stay null rather than being invented, and a
 * fixture runs no multi-step orchestration.
 */
const SANDBOX_SURFACE: EventSurfaceResolver = (exercise) => ({
  placement: "engine_fixture_sandbox",
  evId: null,
  payloadId: exercise.id,
  sentenceId: null,
  sequence: null,
});

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
  const { runtime, generation } = useLearningEngineRuntime();
  const [state, setState] = useState<SessionState>(IDLE_STATE);
  const contract = opts.contract;

  /**
   * A token that changes exactly when the controller must be replaced: a privacy
   * reset (new `generation`), a different lesson, or a different content version.
   * The pre-PR-05 hook captured its controller in a ref FOREVER, which would now
   * survive a reset and keep writing through a permanently-suppressed repository.
   */
  const identity = `${generation}::${opts.lessonId}::${opts.contentVersion}`;
  const held = useRef<{ identity: string; controller: LearningSessionController } | null>(
    null,
  );

  if (held.current === null || held.current.identity !== identity) {
    const token = identity;
    held.current = {
      identity,
      controller: runtime.createSessionController({
        lessonId: opts.lessonId,
        contentVersion: opts.contentVersion,
        resolveEventSurface: SANDBOX_SURFACE,
        // A pre-reset controller's queued work can still settle and call back.
        // Its update must not overwrite the fresh session's state; the
        // stale-writer barrier already prevents it from reaching storage.
        onUpdate: (next) => {
          if (held.current?.identity === token) setState(next);
        },
      }),
    };
  }
  const controller = held.current.controller;

  // A replaced controller means a new session: drop the previous session's
  // mirrored state rather than showing it under a runtime that no longer owns it.
  useEffect(() => {
    setState(IDLE_STATE);
  }, [identity]);

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
