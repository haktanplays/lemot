/**
 * Practice — a permanent standing surface (one of the three tabs).
 *
 * Practice Hub V1: one tap starts a good session. The learner is never asked to
 * pick a lesson, a difficulty, an exercise type or a bucket — deciding which of
 * those they need is exactly the part they cannot do, and the selector can. The
 * old list-of-cards Hub asked them to choose; this does not.
 *
 * NOT built on the legacy v7 Practice route, which stays quarantined on
 * `useSRS` / legacy scenarios / legacy flashcards and is unreachable from the
 * tab bar. Nothing here imports any of it.
 *
 * It also no longer reuses an authored LESSON screen by reference. That was the
 * P4.6 shape, and it carried a real defect: a reused screen keeps its lesson
 * exercise id, and `selectLessonProgress` matches on `exerciseId` while
 * ignoring `lessonId` — so one practice attempt marked an L1 screen attempted
 * and flipped that lesson to `started`. Practice now runs its own static seed
 * pool under the reserved `practice/` id namespace, so it cannot mark lesson
 * progress at all.
 *
 * Emission policy: opening Practice, starting a session, advancing and leaving
 * emit NOTHING. Only a graded action records, through the controller inside
 * `usePracticeSession`, with `placement: "practice_hub"`.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { P } from "@/constants/theme";
import { SurfaceHeader, QuietState } from "@/components/ui/StandingSurface";
import { ITEM_REGISTRY } from "@/content/itemRegistry";
import { V1_LESSONS } from "@/content/lessons/v1";
import { PRACTICE_SEEDS } from "@/content/practice/seeds";
import {
  planPracticeSession,
  reachedItemIds,
  type PracticeSessionAction,
} from "@/content/practice/practicePlanner";
import { PRACTICE_EMPTY_LINE } from "@/content/practice/practiceCopy";
import { useLearningEngineRuntime } from "@/providers/LearningEngineProvider";
import { PracticeStart } from "@/components/practice/PracticeStart";
import {
  hasErrorsToPractise,
  seedsForMode,
  type PracticeMode,
} from "@/content/practice/practiceModes";
import { PracticeRunner, type PracticeRunResult } from "@/components/practice/PracticeRunner";
import { PracticeComplete } from "@/components/practice/PracticeComplete";

/** Canon session budget. The selector clamps to 5-8 and may return fewer. */
const PRACTICE_BUDGET = 6;

type Ready = {
  phase: "ready";
  actions: PracticeSessionAction[];
  reachedItems: Set<string>;
  reachedLessons: Set<string>;
  /** Whether Errors has real material, so the entry can be honest about it. */
  errorsAvailable: boolean;
  /** Lessons the learner has reached, for the By lesson entry. */
  reachedLessonNumbers: number[];
};

type HubState =
  | { phase: "loading" }
  | { phase: "error" }
  | Ready;

export default function PracticeRoute() {
  const { runtime, generation } = useLearningEngineRuntime();
  const [state, setState] = useState<HubState>({ phase: "loading" });
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState<PracticeRunResult | null>(null);
  // A fresh key per run gives each sitting its own controller and session id.
  const [runKey, setRunKey] = useState(0);
  // Stale-read guard: a slow pre-reset read must never populate the new
  // generation's screen, and an unmounted screen must not set state.
  const loadToken = useRef(0);

  // Freestyle is the default: choosing what to practise is the selector's job.
  // The other modes are for a learner who arrives with an intention.
  //
  // A learner arriving from Mon Lexique's "Practise this" has already stated
  // one, so the route honours it: By lesson, opened on the lesson where they
  // met that word. It is the same picker, arriving pre-answered rather than a
  // second way in.
  const { lesson: lessonParam, mode: modeParam } = useLocalSearchParams<{
    lesson?: string;
    mode?: string;
  }>();
  const arrivedWithLesson = typeof lessonParam === "string" && lessonParam.length > 0;
  // My French's "Work on these" arrives here asking for the error pool by name.
  const arrivedForErrors = modeParam === "errors";
  const [mode, setMode] = useState<PracticeMode>(
    arrivedWithLesson ? "byLesson" : arrivedForErrors ? "errors" : "freestyle",
  );
  const [lessonId, setLessonId] = useState<string | null>(
    arrivedWithLesson ? lessonParam : null,
  );

  const load = useCallback(() => {
    const token = ++loadToken.current;
    setState({ phase: "loading" });
    runtime
      .readPracticeReach()
      .then(({ snapshot, reachedLessonIds, practiceSeedHistory }) => {
        if (loadToken.current !== token) return;
        const reachedLessons = new Set(reachedLessonIds);
        // What the learner has already met, so an item returns through work
        // they have not just done rather than its one favourite exercise.
        const seedHistory = new Map(Object.entries(practiceSeedHistory));
        // The ONE orchestration-boundary clock read; the planner never reads one.
        // One pool, narrowed. The planner still decides lawfulness, so a mode
        // can only ever offer LESS than freestyle, never something untaught.
        const pool = seedsForMode(mode, { seeds: PRACTICE_SEEDS, snapshot, lessonId });
        const plan = planPracticeSession({
          snapshot,
          reachedLessons,
          seedHistory,
          items: ITEM_REGISTRY,
          lessons: V1_LESSONS,
          seeds: pool,
          now: Date.now(),
          budget: PRACTICE_BUDGET,
        });
        setState({
          phase: "ready",
          actions: plan.actions,
          reachedItems: reachedItemIds(snapshot),
          reachedLessons,
          errorsAvailable: hasErrorsToPractise(snapshot, PRACTICE_SEEDS),
          reachedLessonNumbers: (V1_LESSONS as { id: string; number: number }[])
            .filter((l) => reachedLessons.has(l.id) && l.number >= 1 && l.number <= 10)
            .map((l) => l.number)
            .sort((a, b) => a - b),
        });
      })
      .catch(() => {
        if (loadToken.current === token) setState({ phase: "error" });
      });
  }, [runtime, mode, lessonId]);

  useEffect(() => {
    setRunning(false);
    setFinished(null);
    load();
    return () => {
      loadToken.current += 1; // invalidate in-flight reads on unmount/reset
    };
  }, [load, generation]);

  const leaveSession = () => {
    setRunning(false);
    setFinished(null);
    load(); // re-plan from the shared log; no local completion state exists
  };

  const startAnother = () => {
    setRunKey((k) => k + 1);
    setFinished(null);
    setRunning(false);
    load();
  };

  if (state.phase === "ready" && running) {
    return (
      <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: P.bg }}>
        <PracticeRunner
          key={runKey}
          sessionKey={`practice-${runKey}`}
          plannedActions={state.actions}
          lessons={V1_LESSONS}
          seeds={PRACTICE_SEEDS}
          reachedItems={state.reachedItems}
          reachedLessons={state.reachedLessons}
          onFinish={(result) => {
            setRunning(false);
            setFinished(result);
          }}
          onQuit={leaveSession}
        />
      </SafeAreaView>
    );
  }

  if (finished !== null) {
    return (
      <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: P.bg }}>
        <PracticeComplete
          actions={finished.worked}
          struggles={finished.struggles}
          onDone={leaveSession}
          onAgain={startAnother}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: P.bg }}>
      <View style={{ flex: 1 }}>
        {state.phase === "loading" && (
          <>
            <SurfaceHeader title="Practice" />
            <QuietState tone="waiting" text={"Looking at what you’ve used…"} />
          </>
        )}

        {state.phase === "error" && (
          <>
            <SurfaceHeader title="Practice" />
            <QuietState text="Practice is resting for a moment. Come back shortly." />
          </>
        )}

        {/*
          The cold start, and ONLY the cold start. Freestyle draws on everything
          reached, so freestyle-with-nothing is the one case where "finish your
          first lesson" is true. A narrowed mode that comes back empty is not
          that case, and swapping the screen for it used to strand the learner:
          the mode rows went with it, so the choice the copy asked for had no
          control left to make it.
        */}
        {state.phase === "ready" && state.actions.length === 0 && mode === "freestyle" && (
          <>
            <SurfaceHeader title="Practice" />
            <QuietState text={PRACTICE_EMPTY_LINE} />
          </>
        )}

        {state.phase === "ready" && (state.actions.length > 0 || mode !== "freestyle") && (
          <PracticeStart
            actions={state.actions}
            onStart={() => setRunning(true)}
            mode={mode}
            onModeChange={(next, lesson) => {
              setLessonId(next === "byLesson" ? (lesson ?? null) : null);
              setMode(next);
            }}
            errorsAvailable={state.errorsAvailable}
            reachedLessonNumbers={state.reachedLessonNumbers}
            selectedLessonId={lessonId}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
