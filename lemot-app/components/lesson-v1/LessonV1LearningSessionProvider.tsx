/**
 * Lesson-local learning session for the shipped `LessonRendererV1` path (PR-05).
 *
 * Gives one v1 lesson exactly one `LearningSessionController`, obtained from the
 * app-level runtime, and mirrors its `SessionState` into React state. This is the
 * seam PR-06 will emit through; PR-05 wires it and emits nothing.
 *
 * What it deliberately does NOT expose: the repository, `appendEvent`, any
 * storage key, the KV layer, raw event arrays separate from `SessionState`, or
 * any mutation path into Mon Lexique, Practice or legacy progress. A screen that
 * consumes this can record an attempt and read session state — nothing else.
 *
 * Mounting it performs no repository read and no write. The state starts at the
 * real idle values rather than a pretend "loading": the event log has genuinely
 * not been read, and claiming otherwise would be a lie in the UI's own state.
 * PR-06's first settled append makes the controller read the full log and rebuild
 * mastery, which is when hydration first becomes meaningful.
 */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Lesson } from "@/content/lessonTypes";
import {
  type EventSurfaceResolver,
  type LearningSessionController,
  type SessionState,
} from "@/content/learning-engine/session-controller";
import { useLearningEngineRuntime } from "@/providers/LearningEngineProvider";

const IDLE_STATE: SessionState = {
  status: "idle",
  latestSnapshot: null,
  events: [],
  lastEventCount: 0,
  lastSavedAt: null,
};

/**
 * Where shipped v1 lesson events happen.
 *
 * `lesson_path` is the honest placement, and the authored screen id is the only
 * payload identity that exists today. `evId` and `sentenceId` stay null because
 * no pilot EV identity and no sentence identity are registered yet — PR-07 owns
 * that, gated on French QA. Guessing either here would mint runtime identities
 * from draft-local planning ids, which is exactly what the identity layer
 * forbids. `sequence` is null because no multi-step orchestration exists yet.
 */
const LESSON_PATH_SURFACE: EventSurfaceResolver = (exercise) => ({
  placement: "lesson_path",
  evId: null,
  payloadId: exercise.id,
  sentenceId: null,
  sequence: null,
});

export type LessonV1LearningSession = {
  controller: LearningSessionController;
  state: SessionState;
};

const LessonV1LearningSessionContext = createContext<LessonV1LearningSession | null>(
  null,
);

export function LessonV1LearningSessionProvider({
  lesson,
  children,
}: {
  lesson: Lesson;
  children: ReactNode;
}) {
  const { runtime, generation } = useLearningEngineRuntime();
  const [state, setState] = useState<SessionState>(IDLE_STATE);

  // Replace the controller when the lesson identity or the app runtime changes.
  // A privacy reset bumps `generation`, and the pre-reset repository suppresses
  // its own writes from that moment, so reusing its controller would silently
  // discard genuinely new activity.
  const identity = `${generation}::${lesson.id}::${lesson.version}`;
  const held = useRef<{ identity: string; controller: LearningSessionController } | null>(
    null,
  );

  if (held.current === null || held.current.identity !== identity) {
    const token = identity;
    held.current = {
      identity,
      controller: runtime.createSessionController({
        lessonId: lesson.id,
        contentVersion: lesson.version,
        resolveEventSurface: LESSON_PATH_SURFACE,
        // An obsolete controller's queued work can still settle after a reset.
        // Its callback must not overwrite the current session's state.
        onUpdate: (next) => {
          if (held.current?.identity === token) setState(next);
        },
      }),
    };
  }
  const controller = held.current.controller;

  useEffect(() => {
    setState(IDLE_STATE);
  }, [identity]);

  const value = useMemo<LessonV1LearningSession>(
    () => ({ controller, state }),
    [controller, state],
  );

  return (
    <LessonV1LearningSessionContext.Provider value={value}>
      {children}
    </LessonV1LearningSessionContext.Provider>
  );
}

/**
 * The lesson's learning session.
 *
 * Throws outside the provider rather than degrading silently: a screen that
 * believes it is recording, while writing nowhere, is worse than a loud failure.
 * No screen consumes this in PR-05.
 */
export function useLessonV1LearningSession(): LessonV1LearningSession {
  const value = useContext(LessonV1LearningSessionContext);
  if (value === null) {
    throw new Error(
      "useLessonV1LearningSession must be used inside <LessonV1LearningSessionProvider>",
    );
  }
  return value;
}
