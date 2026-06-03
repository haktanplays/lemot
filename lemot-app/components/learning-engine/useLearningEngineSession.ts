import { useMemo, useRef } from "react";
import { LocalRepository } from "@/content/learning-engine/repository/local";
import {
  LearningSessionController,
  type RecordGradedAttemptInput,
  type RecordRecognitionRevealInput,
} from "@/content/learning-engine/session-controller";

/**
 * Learner-session hook (P3.6).
 *
 * Owns ONE `LocalRepository` and ONE `LearningSessionController` for the life of
 * the renderer, and exposes the two record callbacks the shell hands to cards.
 * All appends go through the controller's serialized queue — no component ever
 * touches `LocalRepository.appendEvent` directly.
 *
 * `lessonId` / `contentVersion` are captured at mount (a fresh fixture deep-link
 * remounts the route → a new session). No mastery/scoreEvents here (P3.7), no
 * remote/Supabase/network/AI.
 */

// Founder-local session id (no `Date.now`; the controller owns the only clock).
let sessionSeq = 0;
function newLocalSessionId(): string {
  sessionSeq += 1;
  return `lm-sess-${sessionSeq.toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export type LearnerSession = {
  recordGradedAttempt: (input: RecordGradedAttemptInput) => void;
  recordRecognitionReveal: (input: RecordRecognitionRevealInput) => void;
};

export function useLearningEngineSession(opts: {
  lessonId: string;
  contentVersion: string;
}): LearnerSession {
  const controllerRef = useRef<LearningSessionController | null>(null);
  if (controllerRef.current === null) {
    controllerRef.current = new LearningSessionController({
      repository: new LocalRepository(),
      sessionId: newLocalSessionId(),
      lessonId: opts.lessonId,
      contentVersion: opts.contentVersion,
    });
  }
  const controller = controllerRef.current;

  return useMemo<LearnerSession>(
    () => ({
      recordGradedAttempt: (input) => controller.recordGradedAttempt(input),
      recordRecognitionReveal: (input) =>
        controller.recordRecognitionReveal(input),
    }),
    [controller],
  );
}
