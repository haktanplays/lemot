/**
 * The evidence session behind a practice run.
 *
 * Mirrors `LessonV1LearningSessionProvider` in shape and in what it refuses to
 * expose: a screen can say "the learner picked option B", and cannot say what
 * evidence class that is, whether it is admissible, or what it should do to
 * mastery. The controller stays private; callers get two record functions and a
 * settlement promise.
 *
 * The one difference from the lesson session is identity, and it is the whole
 * lesson/practice boundary: `PRACTICE_HUB_SURFACE` stamps
 * `placement: "practice_hub"`, and the interaction builders re-identify the
 * exercise into the `practice/` namespace so no practice attempt can ever be
 * read as a lesson screen attempt.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import type {
  LearningSessionController,
  SessionState,
} from "@/content/learning-engine/session-controller";
import { useLearningEngineRuntime } from "@/providers/LearningEngineProvider";
import { PRACTICE_SESSION_LESSON_ID } from "@/content/practice/practiceIdentity";
import {
  LESSON_STEP_PRACTICE_SURFACE,
  PRACTICE_HUB_SURFACE,
  practiceBuildAttempt,
  practiceChoiceAttempt,
  practiceTypedAttempt,
} from "@/content/practice/practiceInteractions";
import type { PracticeSeed } from "@/content/practice/practiceTypes";
import type { Lesson } from "@/content/lessonTypes";
import type { HintRung } from "@/content/learning-engine/evidence-context";

const IDLE: SessionState = {
  status: "idle",
  latestSnapshot: null,
  events: [],
  lastEventCount: 0,
  lastSavedAt: null,
};

/** The content version practice evidence is stamped with. */
export const PRACTICE_CONTENT_VERSION = "practice-pool-v1";

export type PracticeEvidenceSession = {
  state: SessionState;
  recordChoice(seed: PracticeSeed, origin: Lesson, optionId: string): void;
  recordTyped(
    seed: PracticeSeed,
    origin: Lesson,
    facts: { text: string; hintRung: HintRung; constitutiveSupportRendered: boolean },
  ): void;
  recordBuild(seed: PracticeSeed, origin: Lesson, facts: { picked: readonly number[] }): void;
  whenSettled(): Promise<void>;
};

/**
 * Where the run is happening. Identity is unchanged either way — the exercise
 * id stays under `practice/` — and only the placement stamped on the event
 * differs, so a learner's one extra go inside a lesson is not counted as a
 * visit to the Practice tab.
 */
export type PracticePlacement = "practice-hub" | "lesson-step";

export function usePracticeSession(
  sessionKey: string,
  placement: PracticePlacement = "practice-hub",
): PracticeEvidenceSession {
  const { runtime, generation } = useLearningEngineRuntime();
  const [state, setState] = useState<SessionState>(IDLE);

  // One controller per run. A new run is a new controller, so a session id is
  // never shared across two sittings; a privacy reset bumps `generation` and
  // the pre-reset controller's late callbacks are ignored by the token check.
  const identity = `${generation}::${placement}::${sessionKey}`;
  const held = useRef<{ identity: string; controller: LearningSessionController } | null>(
    null,
  );
  if (held.current === null || held.current.identity !== identity) {
    const token = identity;
    held.current = {
      identity,
      controller: runtime.createSessionController({
        lessonId: PRACTICE_SESSION_LESSON_ID,
        contentVersion: PRACTICE_CONTENT_VERSION,
        resolveEventSurface:
          placement === "lesson-step"
            ? LESSON_STEP_PRACTICE_SURFACE
            : PRACTICE_HUB_SURFACE,
        onUpdate: (next) => {
          if (held.current?.identity === token) setState(next);
        },
      }),
    };
  }
  const controller = held.current.controller;

  useEffect(() => {
    setState(IDLE);
  }, [identity]);

  return useMemo<PracticeEvidenceSession>(
    () => ({
      state,
      recordChoice(seed, origin, optionId) {
        controller.recordGradedAttempt(practiceChoiceAttempt(seed, origin, { optionId }));
      },
      recordTyped(seed, origin, facts) {
        controller.recordGradedAttempt(practiceTypedAttempt(seed, origin, facts));
      },
      recordBuild(seed, origin, facts) {
        controller.recordGradedAttempt(practiceBuildAttempt(seed, origin, facts));
      },
      whenSettled: () => controller.flush(),
    }),
    [controller, state],
  );
}
