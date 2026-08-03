/**
 * Mon Lexique — a permanent standing surface (one of the three tabs).
 *
 * Reads the SAME shared learning-event spine as lessons and Practice through
 * the app runtime's explicit read-side projection, rebuilds the current mastery
 * snapshot, and derives entries with the existing pure
 * `selectMonLexiqueEntries`. Mon Lexique is a PROJECTION: this route owns no
 * store, keeps no collected-words array, writes no state, and emits no learning
 * event — opening, scrolling and leaving change nothing anywhere.
 *
 * Read-only by construction: no search, no filters, no sorting controls, no
 * edit/delete, no manual word addition, no notes, no learner-authored examples,
 * no Word Graph, no Daily Review, no practice actions, no pronunciation
 * controls. The entry card renders one calm band; ordering comes from the
 * selector's persisted-timestamp rules.
 *
 * The ONE clock read: `Date.now()` at the load boundary, mirroring the Practice
 * route. It feeds display only — the pure band mapper suppresses "Worth another
 * look" for a piece the learner successfully used TODAY, so finishing a lesson
 * and opening Mon Lexique never contradicts what just happened. Ordering,
 * mastery, `practiceEligibility` and every scheduling rule are untouched, and
 * the selector itself still needs no clock.
 *
 * The learning summary lives here as a header action, not as a fourth tab.
 *
 * Privacy reset: `runtime` identity changes with `generation`, the old
 * projection is dropped, and a stale in-flight read is ignored via the load
 * token — the new (cleared) log is read fresh with no app restart.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { P } from "@/constants/theme";
import { ITEM_REGISTRY } from "@/content/itemRegistry";
import {
  selectMonLexiqueEntries,
  type MonLexiqueEntry,
} from "@/content/learning-engine/mon-lexique";
import { useLearningEngineRuntime } from "@/providers/LearningEngineProvider";
import { MonLexiqueEntryCard } from "@/components/learning-engine/MonLexiqueEntryCard";
import {
  resolveMonLexiqueBand,
  type MonLexiqueBand,
} from "@/components/learning-engine/monLexiqueCopy";

type BandedEntry = { entry: MonLexiqueEntry; band: MonLexiqueBand };

type LexiqueState =
  | { phase: "loading" }
  | { phase: "error" }
  | { phase: "ready"; entries: BandedEntry[] };

export default function MonLexiqueRoute() {
  const { runtime, generation } = useLearningEngineRuntime();
  const [state, setState] = useState<LexiqueState>({ phase: "loading" });
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
        // The ONE orchestration-boundary clock read; the selector and the band
        // mapper never read a clock themselves.
        const now = Date.now();
        const entries = selectMonLexiqueEntries({
          items: ITEM_REGISTRY,
          snapshot,
        }).map((entry) => ({ entry, band: resolveMonLexiqueBand(entry, now) }));
        setState({ phase: "ready", entries });
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

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: P.bg }}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 14,
          borderBottomWidth: 1,
          borderBottomColor: P.border,
          gap: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <Text
            className="text-lg"
            style={{
              color: P.ink,
              fontFamily: "serif",
              fontStyle: "italic",
              flexShrink: 1,
            }}
          >
            Mon Lexique
          </Text>
          {/* The learning summary is a header action here, never a fourth tab.
              Typed-route casts are the narrow bridge the house rules allow for
              routes whose types Metro has not regenerated yet. */}
          <Pressable
            onPress={() => router.push("/learning-stats" as never)}
            hitSlop={8}
            accessibilityRole="button"
            style={{
              borderRadius: 999,
              borderWidth: 1,
              borderColor: P.border,
              paddingHorizontal: 12,
              paddingVertical: 6,
              flexShrink: 0,
            }}
          >
            <Text className="text-xs" style={{ color: P.ink2 }}>
              Learning summary
            </Text>
          </Pressable>
        </View>
        <Text className="text-sm" style={{ color: P.ink3 }}>
          French that has started to stay with you.
        </Text>
      </View>

      {state.phase === "loading" && (
        <View style={{ padding: 20 }}>
          <Text className="text-sm" style={{ color: P.ink3 }}>
            Gathering what you’ve used…
          </Text>
        </View>
      )}

      {state.phase === "error" && (
        <View style={{ padding: 20 }}>
          <Text className="text-sm" style={{ color: P.ink2 }}>
            Mon Lexique is resting for a moment. Come back shortly.
          </Text>
        </View>
      )}

      {state.phase === "ready" && state.entries.length === 0 && (
        <View style={{ padding: 20 }}>
          <Text className="text-sm" style={{ color: P.ink2 }}>
            {"Your words will appear here as you use them. Start anywhere on your path."}
          </Text>
        </View>
      )}

      {state.phase === "ready" && state.entries.length > 0 && (
        <ScrollView contentContainerStyle={{ padding: 20, gap: 8 }}>
          {state.entries.map(({ entry, band }) => (
            <MonLexiqueEntryCard key={entry.itemId} entry={entry} band={band} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
