/**
 * Lesson-local learning session for the shipped `LessonRendererV1` path.
 *
 * PR-05 created this bridge and left it unconsumed. PR-06 narrows its public
 * shape and wires the Wave A screens to it.
 *
 * The controller is now PRIVATE. Descendants receive four semantic record
 * functions, one read-side settlement lifecycle (`whenSettled`, PR-09) and the
 * session state — nothing else. That is the whole point: a
 * screen can say "the learner picked option B", but it cannot say what evidence
 * class that is, who the result is attributable to, whether it is admissible, or
 * what it should do to mastery. Those answers belong to the pure orchestration
 * layer (`content/lesson-v1-evidence`) and the controller, and a screen must not
 * be able to reach around either.
 *
 * Not exposed, by construction: the controller, the repository, `appendEvent`,
 * storage keys, raw event construction, arbitrary evidence classes, arbitrary
 * attribution or admissibility, and any mutation path into Mon Lexique, Practice,
 * Stats or legacy progress.
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
import type {
  FillWithTrapsScreen,
  Lesson,
  MeetCardScreen,
  SayItYourWayScreen,
  WeaveScreen,
} from "@/content/lessonTypes";
import {
  type EventSurfaceResolver,
  type LearningSessionController,
  type SessionState,
} from "@/content/learning-engine/session-controller";
import {
  choiceInteraction,
  meetExposureInteraction,
  openAttemptInteraction,
  typedAttemptInteraction,
  type ChoiceFacts,
  type MeetExposureFacts,
  type OpenAttemptFacts,
  type TypedAttemptFacts,
} from "@/content/lesson-v1-evidence/interactions";
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
 * `lesson_path` is the honest placement, and the qualified screen id is the
 * payload identity that genuinely exists today. `evId` and `sentenceId` stay
 * null because no pilot EV identity and no sentence identity are registered yet
 * — PR-07 owns that, gated on French QA. Guessing either would mint runtime
 * identities from draft-local planning ids. `sequence` is null because no
 * multi-step orchestration exists.
 */
const LESSON_PATH_SURFACE: EventSurfaceResolver = (exercise) => ({
  placement: "lesson_path",
  evId: null,
  payloadId: exercise.id,
  sentenceId: null,
  sequence: null,
});

/** The narrow interaction API a lesson screen may use. */
export type LessonV1LearningSession = {
  state: SessionState;
  recordMeetExposure(screen: MeetCardScreen, facts: MeetExposureFacts): void;
  recordChoiceAttempt(screen: FillWithTrapsScreen, facts: ChoiceFacts): void;
  recordTypedAttempt(screen: WeaveScreen, facts: TypedAttemptFacts): void;
  recordOpenAttemptAndReveal(screen: SayItYourWayScreen, facts: OpenAttemptFacts): void;
  /**
   * Resolve after the current controller's queued append/read/score work has
   * settled — successes AND caught failures alike (PR-09 lifecycle method).
   *
   * The final lesson screen can enqueue its event and advance to completion
   * before that event has landed, so navigation into a projection surface
   * (Practice Hub, Mon Lexique) must wait on this or it may read the log one
   * event short. It writes nothing itself, exposes no controller, repository or
   * event array, and is deliberately not named `flush`: consumers get a
   * settlement promise, not a controller verb.
   */
  whenSettled(): Promise<void>;
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
    () => ({
      state,
      recordMeetExposure(screen, facts) {
        controller.recordExposure(meetExposureInteraction(lesson, screen, facts));
      },
      recordChoiceAttempt(screen, facts) {
        controller.recordGradedAttempt(choiceInteraction(lesson, screen, facts));
      },
      recordTypedAttempt(screen, facts) {
        controller.recordGradedAttempt(typedAttemptInteraction(lesson, screen, facts));
      },
      recordOpenAttemptAndReveal(screen, facts) {
        const { attempt, reveal } = openAttemptInteraction(lesson, screen, facts);
        // Order matters and is guaranteed by the controller's serialized queue:
        // the attempt is what the learner produced; the reveal is what they then
        // saw. Recording them the other way round would read as copying a model.
        controller.recordOpenProductionAttempt(attempt);
        controller.recordComparisonReveal(reveal);
      },
      whenSettled: () => controller.flush(),
    }),
    [controller, lesson, state],
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
