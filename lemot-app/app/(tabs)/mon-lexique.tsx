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
 * controls.
 *
 * Entries are GROUPED under their band, strongest claim first, through the
 * order the pure copy module already publishes. The grouping is display only:
 * each group is a `filter` over the selector's own output, so ordering inside a
 * band still comes from the selector's persisted-timestamp rules and no second
 * ordering rule, comparator or clock exists here. A band with no entries simply
 * does not appear.
 *
 * The band is stated once per word — by the group heading here, so the row
 * itself suppresses the chip it shows when it is listed ungrouped elsewhere.
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
  MON_LEXIQUE_BANDS,
  MON_LEXIQUE_BAND_COPY,
  resolveMonLexiqueBand,
  type MonLexiqueBand,
} from "@/components/learning-engine/monLexiqueCopy";
import { SurfaceHeader, QuietState } from "@/components/ui/StandingSurface";
import { SPACE } from "@/constants/theme";

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
      <SurfaceHeader
        title="Mon Lexique"
        subtitle="French that has started to stay with you."
        trailing={
          // The learning summary is a header action here, never a fourth tab.
          // Typed-route casts are the narrow bridge the house rules allow for
          // routes whose types Metro has not regenerated yet.
          <Pressable
            onPress={() => router.push("/learning-stats" as never)}
            hitSlop={12}
            accessibilityRole="button"
            style={{
              borderRadius: 999,
              borderWidth: 1,
              borderColor: P.border,
              paddingHorizontal: 14,
              paddingVertical: 8,
              flexShrink: 0,
            }}
          >
            <Text style={{ color: P.ink2, fontSize: 12 }}>Learning summary</Text>
          </Pressable>
        }
      />

      {state.phase === "loading" && (
        <QuietState tone="waiting" text={"Gathering what you’ve used…"} />
      )}

      {state.phase === "error" && (
        <QuietState text="Mon Lexique is resting for a moment. Come back shortly." />
      )}

      {state.phase === "ready" && state.entries.length === 0 && (
        <QuietState
          text={
            "Your words will appear here as you use them. Start anywhere on your path."
          }
        />
      )}

      {state.phase === "ready" && state.entries.length > 0 && (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: SPACE.xl,
            paddingTop: SPACE.lg,
            paddingBottom: SPACE.xxl,
          }}
        >
          {MON_LEXIQUE_BANDS.map((band) => {
            // Grouping is display only. `filter` keeps the selector's own
            // order inside each band, and the bands run strongest-claim-first
            // through the order the pure copy module already publishes, so the
            // learner can glance once and see what is settled and what is
            // still moving. No sorting, no clock, no second ordering rule.
            const inBand = state.entries.filter((e) => e.band === band);
            if (inBand.length === 0) return null;
            return (
              <View key={band} style={{ marginBottom: SPACE.xxl }}>
                <Text
                  style={{
                    color: P.ink3,
                    fontSize: 12,
                    letterSpacing: 0.4,
                    marginBottom: SPACE.sm,
                  }}
                >
                  {MON_LEXIQUE_BAND_COPY[band]}
                </Text>
                {inBand.map(({ entry }, i) => (
                  // The group heading already names the band, so the row does
                  // not repeat it: one band statement per word, as before.
                  <MonLexiqueEntryCard
                    key={entry.itemId}
                    entry={entry}
                    band={band}
                    showBand={false}
                    divided={i > 0}
                  />
                ))}
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
