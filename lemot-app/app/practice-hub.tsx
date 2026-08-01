/**
 * Practice Hub route (PR-08) — the new-engine return leg.
 *
 * Reads the SHARED learning history through the app runtime's explicit
 * read-side projection, selects a small deterministic practice set with the
 * pure Hub selector, and lets the learner complete an already-authored lesson
 * screen. It owns no store: every render derives from the latest
 * `readMasterySnapshot()` call, and after an attempt the set is recomputed from
 * the same shared log the lesson path writes to.
 *
 * DELIBERATELY SEPARATE from the legacy `(tabs)/practice` route, which stays
 * quarantined on `useSRS` / legacy scenarios / legacy flashcards. This route
 * imports none of that, and the legacy route learns nothing about this one.
 *
 * Emission policy: opening the Hub, selecting a card, closing and navigating
 * emit NOTHING. Only the reused screen's own answer action records — through
 * the controller inside `PracticeHubPractice`, with `placement: "practice_hub"`.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { P } from "@/constants/theme";
import { ITEM_REGISTRY } from "@/content/itemRegistry";
import { V1_LESSONS } from "@/content/lessons/v1";
import {
  PRACTICE_DUE_COPY,
  PRACTICE_RETURN_COPY,
  selectPracticeHubSet,
  type PracticeHubEntry,
  type PracticeHubSet,
} from "@/content/lesson-v1-evidence/practiceHub";
import { useLearningEngineRuntime } from "@/providers/LearningEngineProvider";
import { PracticeHubPractice } from "@/components/practice-hub/PracticeHubPractice";

const HUB_BUDGET = 5;

type HubState =
  | { phase: "loading" }
  | { phase: "error" }
  | { phase: "ready"; set: PracticeHubSet };

export default function PracticeHubRoute() {
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
  // the set from the shared log — no Hub-local completion state exists.
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              paddingHorizontal: 16,
              paddingTop: 12,
              paddingBottom: 14,
              borderBottomWidth: 1,
              borderBottomColor: P.border,
            }}
          >
            <Pressable
              onPress={() => {
                if (router.canGoBack()) router.back();
                else router.replace("/(tabs)");
              }}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={{ padding: 4 }}
            >
              <ChevronLeft size={22} color={P.ink2} />
            </Pressable>
            <Text
              className="text-lg"
              style={{
                color: P.ink,
                fontFamily: "serif",
                fontStyle: "italic",
              }}
            >
              Practice what came back
            </Text>
          </View>

          {state.phase === "loading" && (
            <View style={{ padding: 20 }}>
              <Text className="text-sm" style={{ color: P.ink3 }}>
                Looking at what you’ve used…
              </Text>
            </View>
          )}

          {state.phase === "error" && (
            <View style={{ padding: 20 }}>
              <Text className="text-sm" style={{ color: P.ink2 }}>
                Practice is resting for a moment. Come back shortly.
              </Text>
            </View>
          )}

          {state.phase === "ready" && state.set.entries.length === 0 && (
            <View style={{ padding: 20 }}>
              <Text className="text-sm" style={{ color: P.ink2 }}>
                Nothing is waiting here yet. Pieces return after you meet them in
                a lesson.
              </Text>
            </View>
          )}

          {state.phase === "ready" && state.set.entries.length > 0 && (
            <ScrollView contentContainerStyle={{ padding: 20, gap: 10 }}>
              {state.set.entries.map((entry) => (
                <Pressable
                  key={entry.itemId}
                  onPress={() => setActive(entry)}
                  className="rounded-xl border"
                  style={{
                    backgroundColor: P.paper,
                    borderColor: P.border,
                    padding: 16,
                  }}
                >
                  <Text
                    className="text-base"
                    style={{
                      color: P.ink,
                      fontFamily: "serif",
                      fontStyle: "italic",
                    }}
                  >
                    {entry.fr}
                  </Text>
                  <Text className="text-sm mt-1" style={{ color: P.ink2 }}>
                    {entry.en}
                  </Text>
                  <Text className="text-xs mt-2" style={{ color: P.ink3 }}>
                    {PRACTICE_RETURN_COPY[entry.reason]}
                    {entry.isDue ? ` ${PRACTICE_DUE_COPY}` : ""}
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
