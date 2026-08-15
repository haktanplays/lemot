/**
 * Practice — a permanent standing surface (one of the three tabs).
 *
 * Reads the SHARED learning history through the app runtime's explicit
 * read-side projection, selects a small deterministic practice set with the
 * pure Hub selector, and lets the learner complete an already-authored lesson
 * screen. It owns no store: every render derives from the latest
 * `readMasterySnapshot()` call, and after an attempt the set is recomputed from
 * the same shared log the lesson path writes to.
 *
 * Practice is optional. It never gates Journey progress, it is never a backlog,
 * and an empty list is a good resting state rather than an error.
 *
 * DELIBERATELY SEPARATE from the legacy `(tabs)/practice` route, which stays
 * quarantined on `useSRS` / legacy scenarios / legacy flashcards and is no
 * longer reachable from the tab bar. This route imports none of that, and the
 * legacy route learns nothing about this one.
 *
 * Emission policy: opening Practice, selecting a card, closing and navigating
 * emit NOTHING. Only the reused screen's own answer action records — through
 * the controller inside `PracticeHubPractice`, with `placement: "practice_hub"`.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { P, SPACE } from "@/constants/theme";
import { SurfaceHeader, QuietState } from "@/components/ui/StandingSurface";
import { ITEM_REGISTRY } from "@/content/itemRegistry";
import { V1_LESSONS } from "@/content/lessons/v1";
import {
  selectPracticeHubSet,
  type PracticeHubEntry,
  type PracticeHubSet,
} from "@/content/lesson-v1-evidence/practiceHub";
import { useLearningEngineRuntime } from "@/providers/LearningEngineProvider";
import { PracticeHubPractice } from "@/components/practice-hub/PracticeHubPractice";
import { practiceCardLine } from "@/components/practice-hub/practiceCardCopy";

const HUB_BUDGET = 5;

type HubState =
  | { phase: "loading" }
  | { phase: "error" }
  | { phase: "ready"; set: PracticeHubSet };

export default function PracticeRoute() {
  const { runtime, generation } = useLearningEngineRuntime();
  const [state, setState] = useState<HubState>({ phase: "loading" });
  const [active, setActive] = useState<PracticeHubEntry | null>(null);
  // Stale-read guard: a slow pre-reset read must never populate the new
  // generation's screen, and an unmounted screen must not set state.
  const loadToken = useRef(0);

  const load = useCallback(() => {
    const token = ++loadToken.current;
    setState({ phase: "loading" });
    runtime
      .readMasterySnapshot()
      .then((snapshot) => {
        if (loadToken.current !== token) return;
        // The ONE orchestration-boundary clock read; the selector itself never
        // reads a clock.
        const now = Date.now();
        setState({
          phase: "ready",
          set: selectPracticeHubSet({
            snapshot,
            items: ITEM_REGISTRY,
            lessons: V1_LESSONS,
            now,
            budget: HUB_BUDGET,
          }),
        });
      })
      .catch(() => {
        if (loadToken.current === token) setState({ phase: "error" });
      });
  }, [runtime]);

  // Load on mount and again on every runtime generation (privacy reset):
  // `runtime` identity changes with the generation, so the old projection is
  // dropped and the new (cleared) log is read fresh — no restart needed.
  useEffect(() => {
    setActive(null);
    load();
    return () => {
      loadToken.current += 1; // invalidate in-flight reads on unmount/reset
    };
  }, [load, generation]);

  // Finishing (or closing) a practice card returns to the list and recomputes
  // the set from the shared log — no local completion state exists.
  const closePractice = () => {
    setActive(null);
    load();
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: P.bg }}>
      {active ? (
        <PracticeHubPractice source={active.source} onClose={closePractice} />
      ) : (
        <View style={{ flex: 1 }}>
          <SurfaceHeader
            title="Practice"
            subtitle="French you have used, coming back once more."
          />

          {state.phase === "loading" && (
            <QuietState tone="waiting" text={"Looking at what you’ve used…"} />
          )}

          {state.phase === "error" && (
            <QuietState text="Practice is resting for a moment. Come back shortly." />
          )}

          {state.phase === "ready" && state.set.entries.length === 0 && (
            <QuietState
              text={
                "Nothing needs your attention right now. Pieces return here after you use them in a lesson."
              }
            />
          )}

          {state.phase === "ready" && state.set.entries.length > 0 && (
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: SPACE.xl,
                paddingTop: SPACE.lg,
                paddingBottom: SPACE.xxl,
              }}
            >
              {state.set.entries.map((entry, i) => (
                <Pressable
                  key={entry.itemId}
                  onPress={() => setActive(entry)}
                  accessibilityRole="button"
                  style={{
                    paddingVertical: SPACE.lg,
                    borderTopWidth: i === 0 ? 0 : 1,
                    borderTopColor: P.border,
                  }}
                >
                  {/*
                    The piece itself leads, in the serif it wears everywhere
                    else, so the row reads as material returning rather than as
                    a task assigned. The entries used to be identical bordered
                    cards of equal loudness, which gave the set more weight than
                    the French inside it; hairlines and rhythm carry it instead.
                  */}
                  <Text
                    style={{
                      color: P.ink,
                      fontFamily: "serif",
                      fontStyle: "italic",
                      fontSize: 19,
                      lineHeight: 27,
                    }}
                  >
                    {entry.fr}
                  </Text>
                  <Text
                    style={{
                      color: P.ink2,
                      fontSize: 14,
                      lineHeight: 21,
                      marginTop: 2,
                    }}
                  >
                    {entry.en}
                  </Text>
                  {/*
                    The authored scene from the original screen, by reference.
                    Never the reducer's path, its return reason or its due flag:
                    those are the tier wearing a sentence, and the learner does
                    not have a tier.
                  */}
                  <Text
                    style={{
                      color: P.ink3,
                      fontSize: 13,
                      lineHeight: 20,
                      marginTop: SPACE.sm,
                    }}
                  >
                    {practiceCardLine(entry.source)}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
