/**
 * Practice — a permanent standing surface (one of the three tabs).
 *
 * THE PRODUCT DISTINCTION THIS SURFACE EXISTS TO HOLD:
 *
 *   DAILY REVIEW   Cairn chooses the session.
 *   PRACTICE       You choose what to work on.
 *
 * Practice Hub V1 got the second half wrong, and the measurement said how
 * wrong. A learner who had walked L0-L6 owned 251 lawful practices; the Hub
 * served one planner session capped at eight, so they met 3.2% of what they
 * were entitled to and reasonably concluded that was the whole of Practice. The
 * routing was never broken — no authored seed anywhere is unreachable. What was
 * missing was a DOOR.
 *
 * So this route now has two halves that both matter:
 *
 *   catalogue  →  browse       `practiceBrowse` narrows, `practiceCatalogue`
 *                              orders and paginates, and the learner walks it
 *   catalogue  →  session      `planPracticeSession`, unchanged, still bounded
 *
 * and not `Practice == bounded session`. TODAYS_SET_MAX is untouched: a session
 * is still a session, it is simply no longer the definition of the tab.
 *
 * NOT built on the legacy v7 Practice route, which stays quarantined on
 * `useSRS` / legacy scenarios / legacy flashcards and is unreachable from the
 * tab bar. Nothing here imports any of it.
 *
 * It also no longer reuses an authored LESSON screen by reference. That was the
 * P4.6 shape, and it carried a real defect: a reused screen keeps its lesson
 * exercise id, and `selectLessonProgress` matches on `exerciseId` while
 * ignoring `lessonId` — so one practice attempt marked an L1 screen attempted
 * and flipped that lesson to `started`. Practice runs its own static seed pool
 * under the reserved `practice/` id namespace, so it cannot mark lesson
 * progress at all. Browsing does not change that: opening a card starts a
 * practice run, and reading a card starts nothing.
 *
 * Emission policy: opening Practice, browsing the catalogue, paging through it,
 * starting a session, advancing and leaving all emit NOTHING. Only a graded
 * action records, through the controller inside `usePracticeSession`, with
 * `placement: "practice_hub"`.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  BROWSE_MODES,
  browsePool,
  browseRun,
  browseTasters,
  type BrowseMode,
} from "@/content/practice/practiceBrowse";
import { catalogueOrder } from "@/content/practice/practiceCatalogue";
import { PracticeBrowse } from "@/components/practice/PracticeBrowse";
import { PracticeRunner, type PracticeRunResult } from "@/components/practice/PracticeRunner";
import { PracticeComplete } from "@/components/practice/PracticeComplete";
import type { MasterySnapshot } from "@/content/learning-engine/mastery";

/** Canon session budget. The selector clamps to 5-8 and may return fewer. */
const PRACTICE_BUDGET = 6;

type Ready = {
  phase: "ready";
  actions: PracticeSessionAction[];
  snapshot: MasterySnapshot;
  reachedItems: Set<string>;
  reachedLessons: Set<string>;
};

type HubState = { phase: "loading" } | { phase: "error" } | Ready;

export default function PracticeRoute() {
  const { runtime, generation } = useLearningEngineRuntime();
  const [state, setState] = useState<HubState>({ phase: "loading" });
  const [running, setRunning] = useState<PracticeSessionAction[] | null>(null);
  const [finished, setFinished] = useState<PracticeRunResult | null>(null);
  // A fresh key per run gives each sitting its own controller and session id.
  const [runKey, setRunKey] = useState(0);
  // Stale-read guard: a slow pre-reset read must never populate the new
  // generation's screen, and an unmounted screen must not set state.
  const loadToken = useRef(0);

  // A learner arriving from Mon Lexique's "Practise this" has already said what
  // they want, so the route opens the browse door they asked for rather than
  // making them find it. My French's "Work on these" arrives the same way.
  const { lesson: lessonParam, mode: modeParam } = useLocalSearchParams<{
    lesson?: string;
    mode?: string;
  }>();
  const arrivedWithLesson = typeof lessonParam === "string" && lessonParam.length > 0;
  const [browsing, setBrowsing] = useState<BrowseMode | null>(
    arrivedWithLesson ? "byLesson" : modeParam === "errors" ? "refresh" : null,
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
        const plan = planPracticeSession({
          snapshot,
          reachedLessons,
          seedHistory,
          items: ITEM_REGISTRY,
          lessons: V1_LESSONS,
          seeds: PRACTICE_SEEDS,
          now: Date.now(),
          budget: PRACTICE_BUDGET,
        });
        setState({
          phase: "ready",
          actions: plan.actions,
          snapshot,
          reachedItems: reachedItemIds(snapshot),
          reachedLessons,
        });
      })
      .catch(() => {
        if (loadToken.current === token) setState({ phase: "error" });
      });
  }, [runtime]);

  useEffect(() => {
    setRunning(null);
    setFinished(null);
    load();
    return () => {
      loadToken.current += 1; // invalidate in-flight reads on unmount/reset
    };
  }, [load, generation]);

  const ready = state.phase === "ready" ? state : null;

  // Lessons the learner has actually been inside, for the By lesson picker.
  const reachedLessons = useMemo(
    () =>
      (V1_LESSONS as { id: string; number: number; title: string }[])
        .filter((l) => ready?.reachedLessons.has(l.id) && l.number >= 1)
        .sort((a, b) => a.number - b.number)
        .map((l) => ({ id: l.id, title: l.title })),
    [ready],
  );
  const lessonTitleOf = useCallback(
    (id: string) =>
      (V1_LESSONS as { id: string; title: string }[]).find((l) => l.id === id)?.title,
    [],
  );

  // The rotation key. Stable for a learner so a list does not reshuffle under
  // them, and moving as they reach more, so Practice does not open on the same
  // card forever. Derived, never stored.
  const rotationKey = useMemo(
    () => `practice-${ready?.reachedLessons.size ?? 0}`,
    [ready],
  );

  // Every mode's pool, ordered. Cheap — four filters over a frozen array — and
  // the entry needs all four anyway to know which of them are honestly empty.
  const pools = useMemo(() => {
    const empty = {
      byLesson: [] as ReturnType<typeof browsePool>,
      freestyle: [],
      refresh: [],
      justBeyond: [],
    } as Record<BrowseMode, ReturnType<typeof browsePool>>;
    if (!ready) return empty;
    const out = {} as Record<BrowseMode, ReturnType<typeof browsePool>>;
    for (const mode of BROWSE_MODES) {
      const pool = browsePool({
        mode,
        seeds: PRACTICE_SEEDS,
        snapshot: ready.snapshot,
        reachedItems: ready.reachedItems,
        reachedLessons: ready.reachedLessons,
        lessonId: mode === "byLesson" ? (lessonId ?? reachedLessons[0]?.id ?? null) : null,
      });
      out[mode] = catalogueOrder(pool, `${rotationKey}:${mode}`);
    }
    return out;
  }, [ready, lessonId, reachedLessons, rotationKey]);

  const poolSizes = useMemo(
    () =>
      ({
        byLesson: pools.byLesson.length,
        freestyle: pools.freestyle.length,
        refresh: pools.refresh.length,
        justBeyond: pools.justBeyond.length,
      }) as Record<BrowseMode, number>,
    [pools],
  );

  // Three real cards, from three different jobs. Freestyle last: it is the
  // broadest and would otherwise crowd out the two that say something.
  const tasters = useMemo(
    () => browseTasters(pools, ["justBeyond", "refresh", "byLesson", "freestyle"]).slice(0, 3),
    [pools],
  );

  const leaveSession = () => {
    setRunning(null);
    setFinished(null);
    load(); // re-plan from the shared log; no local completion state exists
  };

  const startRun = (actions: PracticeSessionAction[]) => {
    if (actions.length === 0) return;
    setRunKey((k) => k + 1);
    setFinished(null);
    setRunning(actions);
  };

  const openBrowseCard = (mode: BrowseMode, index: number) => {
    if (!ready) return;
    startRun(browseRun(pools[mode], index, ready.snapshot));
  };

  if (ready && running !== null) {
    return (
      <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: P.bg }}>
        <PracticeRunner
          key={runKey}
          sessionKey={`practice-${runKey}`}
          plannedActions={running}
          lessons={V1_LESSONS}
          seeds={PRACTICE_SEEDS}
          reachedItems={ready.reachedItems}
          reachedLessons={ready.reachedLessons}
          onFinish={(result) => {
            setRunning(null);
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
          onAgain={() => {
            setFinished(null);
            load();
          }}
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
          reached, so nothing lawful anywhere is the one case where "finish your
          first lesson" is true. A narrowed mode that comes back empty is not
          that case and never replaces the screen: the doors stay on it.
        */}
        {ready && poolSizes.freestyle === 0 && ready.actions.length === 0 && (
          <>
            <SurfaceHeader title="Practice" />
            <QuietState text={PRACTICE_EMPTY_LINE} />
          </>
        )}

        {ready && poolSizes.freestyle > 0 && browsing === null && (
          <PracticeStart
            actions={ready.actions}
            onStart={() => startRun(ready.actions)}
            tasters={tasters}
            poolSizes={poolSizes}
            lessonTitleOf={lessonTitleOf}
            onOpenMode={(mode) => {
              if (mode === "byLesson" && lessonId === null) {
                setLessonId(reachedLessons[0]?.id ?? null);
              }
              setBrowsing(mode);
            }}
            onOpenTaster={(mode, seedId) =>
              openBrowseCard(
                mode,
                pools[mode].findIndex((s) => s.id === seedId),
              )
            }
          />
        )}

        {ready && poolSizes.freestyle > 0 && browsing !== null && (
          <PracticeBrowse
            mode={browsing}
            pool={pools[browsing]}
            poolId={`${rotationKey}:${browsing}:${lessonId ?? ""}`}
            lessons={browsing === "byLesson" ? reachedLessons : []}
            selectedLessonId={lessonId}
            lessonTitleOf={lessonTitleOf}
            onSelectLesson={setLessonId}
            onOpen={(index) => openBrowseCard(browsing, index)}
            onBack={() => setBrowsing(null)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
