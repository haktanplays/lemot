/**
 * Learning summary route — reached from Mon Lexique's header action.
 *
 * NOT a fourth tab, and not a dead end: it lives on the root stack above the
 * tab group, so it opens over Mon Lexique and Back returns there.
 *
 * Reads the SAME shared learning-event history as lessons, Practice and Mon
 * Lexique through the app runtime's explicit `readLearningStats()` projection.
 * It is a PROJECTION: this route owns no store, writes no state, emits no
 * learning event, creates no controller — opening, scrolling and leaving change
 * nothing anywhere.
 *
 * D-3 boundary honored: the learner summary derives from `LearningEvent` only.
 * Nothing here touches `TelemetryStore` or its key — telemetry stays
 * content-debugging and product-funnel data, never a learning history. The
 * legacy tab (`app/(tabs)/stats.tsx`) stays quarantined on its frozen legacy
 * stores, is no longer reachable from the tab bar, and is neither imported nor
 * modified.
 *
 * The projection is aggregate-only, so the route needs NO clock and can render
 * no raw ids, dates, learner text, percentages, streaks or scores even by
 * accident. Privacy reset: `runtime` identity changes with `generation`, the
 * old summary is dropped, and a stale in-flight read is ignored via the load
 * token — the new (cleared) log is read fresh with no app restart.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { P } from "@/constants/theme";
import type { LearningStatsProjection } from "@/content/learning-engine/learning-stats";
import { useLearningEngineRuntime } from "@/providers/LearningEngineProvider";
import {
  LearningStatsSummary,
  summaryHasContent,
} from "@/components/learning-stats/LearningStatsSummary";
import { LEARNING_STATS_COPY } from "@/components/learning-stats/learningStatsCopy";

type StatsState =
  | { phase: "loading" }
  | { phase: "error" }
  | { phase: "ready"; stats: LearningStatsProjection };

export default function LearningStatsRoute() {
  const { runtime, generation } = useLearningEngineRuntime();
  const [state, setState] = useState<StatsState>({ phase: "loading" });
  // Stale-read guard: a slow pre-reset read must never populate the new
  // generation's screen, and an unmounted screen must not set state.
  const loadToken = useRef(0);

  const load = useCallback(() => {
    const token = ++loadToken.current;
    setState({ phase: "loading" });
    runtime
      .readLearningStats()
      .then((stats) => {
        if (loadToken.current !== token) return;
        setState({ phase: "ready", stats });
      })
      .catch(() => {
        if (loadToken.current === token) setState({ phase: "error" });
      });
  }, [runtime]);

  // Load on mount and again on every runtime generation (privacy reset): the
  // old projection is discarded and the new log is read fresh — no restart.
  useEffect(() => {
    load();
    return () => {
      loadToken.current += 1; // invalidate in-flight reads on unmount/reset
    };
  }, [load, generation]);

  // Back always lands on Mon Lexique, which is where this surface is opened
  // from — never on a blank stack.
  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/mon-lexique" as never);
  };

  const showSummary =
    state.phase === "ready" &&
    state.stats.hasActivity &&
    summaryHasContent(state.stats);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: P.bg }}>
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
          onPress={goBack}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={{ padding: 4 }}
        >
          <ChevronLeft size={22} color={P.ink2} />
        </Pressable>
        <Text
          className="text-lg"
          style={{ color: P.ink, fontFamily: "serif", fontStyle: "italic" }}
        >
          {LEARNING_STATS_COPY.title}
        </Text>
      </View>

      {state.phase === "loading" && (
        <View style={{ padding: 20 }}>
          <Text className="text-sm" style={{ color: P.ink3 }}>
            Gathering your summary…
          </Text>
        </View>
      )}

      {state.phase === "error" && (
        <View style={{ padding: 20 }}>
          <Text className="text-sm" style={{ color: P.ink2 }}>
            {LEARNING_STATS_COPY.error}
          </Text>
        </View>
      )}

      {state.phase === "ready" && !showSummary && (
        <View style={{ padding: 20 }}>
          <Text className="text-sm" style={{ color: P.ink2 }}>
            {LEARNING_STATS_COPY.empty}
          </Text>
        </View>
      )}

      {state.phase === "ready" && showSummary && (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <LearningStatsSummary stats={state.stats} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
