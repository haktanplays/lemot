import { useMemo, useRef, useState } from "react";
import { LocalRepository } from "@/content/learning-engine/repository/local";
import {
  LearningSessionController,
  type RecordGradedAttemptInput,
  type RecordRecognitionRevealInput,
  type SessionState,
} from "@/content/learning-engine/session-controller";

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
  lastEventCount: 0,
  lastSavedAt: null,
};

// Founder-local session id (no `Date.now`; the controller owns the only clock).
let sessionSeq = 0;
function newLocalSessionId(): string {
  sessionSeq += 1;
  return `lm-sess-${sessionSeq.toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export type LearnerSession = {
  recordGradedAttempt: (input: RecordGradedAttemptInput) => void;
  recordRecognitionReveal: (input: RecordRecognitionRevealInput) => void;
  /** Latest derived session state (status + MasterySnapshot), mirrored from the controller. */
  state: SessionState;
};

export function useLearningEngineSession(opts: {
  lessonId: string;
  contentVersion: string;
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

  return useMemo<LearnerSession>(
    () => ({
      recordGradedAttempt: (input) => controller.recordGradedAttempt(input),
      recordRecognitionReveal: (input) =>
        controller.recordRecognitionReveal(input),
      state,
    }),
    [controller, state],
  );
}
