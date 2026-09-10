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
 * Read-only by construction, in the sense that matters: it owns no store, edits
 * nothing, adds nothing, and emits no learning event. Opening it, filtering it
 * and tapping a word change nothing anywhere.
 *
 * It does now FILTER and it does now open one word at a time, because "Mon
 * Lexique remembers" and a memory you cannot look things up in is a list. Both
 * are pure narrowing over the same selector output: no second ordering rule, no
 * re-banding, no derived mastery. Still no search box, no edit or delete, no
 * manual word addition, no learner-authored notes, no Word Graph, no Daily
 * Review.
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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { V1_LESSONS } from "@/content/lessons/v1";
import { useSpeech } from "@/hooks/useSpeech";
import { MonLexiqueEntryDetail } from "@/components/learning-engine/MonLexiqueEntryDetail";
import {
  MON_LEXIQUE_FILTERS,
  MON_LEXIQUE_FILTER_COPY,
  filterMonLexiqueEntries,
  monLexiqueEmptyLine,
  type MonLexiqueFilter,
} from "@/components/learning-engine/monLexiqueFilters";

type BandedEntry = { entry: MonLexiqueEntry; band: MonLexiqueBand };

type LexiqueState =
  | { phase: "loading" }
  | { phase: "error" }
  // `now` is the ONE clock read, taken at the load boundary and carried here so
  // the filters can use it without taking a second one.
  | { phase: "ready"; entries: BandedEntry[]; now: number };

/**
 * Which lesson teaches each piece, for "Where you met it" and for the By-lesson
 * filter. Built once from the authored lessons -- the earliest lesson that
 * declares an item is where the learner met it.
 */
const LESSON_OF_ITEM = new Map<string, { id: string; title: string }>();
const ITEMS_OF_LESSON = new Map<string, Set<string>>();
// V1_LESSONS is authored in path order, so first-declaration wins without
// re-sorting anything here.
for (const lesson of V1_LESSONS) {
  const ids = new Set<string>();
  for (const item of lesson.learningItems ?? []) {
    ids.add(item.id);
    if (!LESSON_OF_ITEM.has(item.id)) {
      LESSON_OF_ITEM.set(item.id, { id: lesson.id, title: lesson.title });
    }
  }
  ITEMS_OF_LESSON.set(lesson.id, ids);
}

export default function MonLexiqueRoute() {
  const { runtime, generation } = useLearningEngineRuntime();
  const { say } = useSpeech();
  const [state, setState] = useState<LexiqueState>({ phase: "loading" });
  const [filter, setFilter] = useState<MonLexiqueFilter>("all");
  const [lessonId, setLessonId] = useState<string | null>(null);
  // One word open at a time: the detail answers a question about THAT word, and
  // a column of open panels is the list again, only longer.
  const [openItemId, setOpenItemId] = useState<string | null>(null);
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
        setState({ phase: "ready", entries, now });
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

  const entries = state.phase === "ready" ? state.entries : [];
  // Everything the learner has actually reached, so a detail card cannot show a
  // related piece from a lesson they have not opened.
  const reachedItemIds = useMemo(
    () => new Set(entries.map((e) => e.entry.itemId)),
    [entries],
  );
  // Lessons the learner has met something from. The picker offers no lesson
  // whose words are not in here, so it can never come back empty by accident.
  const lessonsWithEntries = useMemo(
    () =>
      V1_LESSONS.filter(
        (l) =>
          l.number >= 1 &&
          l.number <= 10 &&
          entries.some((e) => LESSON_OF_ITEM.get(e.entry.itemId)?.id === l.id),
      ),
    [entries],
  );
  const visible = useMemo(
    () =>
      filterMonLexiqueEntries(entries, {
        filter,
        now: state.phase === "ready" ? state.now : 0,
        lessonItemIds: lessonId === null ? undefined : ITEMS_OF_LESSON.get(lessonId),
      }),
    [entries, filter, lessonId, state],
  );

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
          {/* Four ways in, each answering a question a learner actually asks.
              The row stays on screen whatever the filter returns, so a choice
              that comes back empty never strands them -- the mistake Practice
              made with its own mode rows earlier in this batch. */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: SPACE.sm, marginBottom: SPACE.lg }}>
            {MON_LEXIQUE_FILTERS.map((f) => {
              const active = filter === f;
              return (
                <Pressable
                  key={f}
                  onPress={() => {
                    setFilter(f);
                    setOpenItemId(null);
                    if (f !== "byLesson") setLessonId(null);
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  style={{
                    backgroundColor: P.paper,
                    borderWidth: 1,
                    borderColor: active ? P.ink3 : P.border,
                    borderRadius: 9999,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      lineHeight: 19,
                      color: active ? P.ink : P.ink2,
                      fontWeight: active ? "600" : "400",
                    }}
                  >
                    {MON_LEXIQUE_FILTER_COPY[f]}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {filter === "byLesson" && lessonsWithEntries.length > 0 && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: SPACE.sm, marginBottom: SPACE.lg }}>
              {lessonsWithEntries.map((l) => {
                const active = l.id === lessonId;
                return (
                  <Pressable
                    key={l.id}
                    onPress={() => {
                      setLessonId(active ? null : l.id);
                      setOpenItemId(null);
                    }}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    accessibilityLabel={`Words from ${l.title}`}
                    style={{
                      backgroundColor: P.paper,
                      borderWidth: 1,
                      borderColor: active ? P.ink3 : P.border,
                      borderRadius: 9999,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        lineHeight: 19,
                        color: active ? P.ink : P.ink2,
                        fontWeight: active ? "600" : "400",
                      }}
                    >
                      {l.title}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          {visible.length === 0 && (
            <Text style={{ color: P.ink2, fontSize: 14, lineHeight: 21 }}>
              {monLexiqueEmptyLine(filter, lessonId !== null)}
            </Text>
          )}

          {MON_LEXIQUE_BANDS.map((band) => {
            // Grouping is display only. `filter` keeps the selector's own
            // order inside each band, and the bands run strongest-claim-first
            // through the order the pure copy module already publishes, so the
            // learner can glance once and see what is settled and what is
            // still moving. No sorting, no clock, no second ordering rule.
            const inBand = visible.filter((e) => e.band === band);
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
                {inBand.map(({ entry }, i) => {
                  const open = openItemId === entry.itemId;
                  const met = LESSON_OF_ITEM.get(entry.itemId);
                  return (
                    <View key={entry.itemId}>
                      {/* The group heading already names the band, so the row
                          does not repeat it: one band statement per word. */}
                      <Pressable
                        onPress={() => setOpenItemId(open ? null : entry.itemId)}
                        accessibilityRole="button"
                        accessibilityState={{ expanded: open }}
                        accessibilityLabel={`What Mon Lexique remembers about ${entry.fr}`}
                      >
                        <MonLexiqueEntryCard
                          entry={entry}
                          band={band}
                          showBand={false}
                          divided={i > 0}
                        />
                      </Pressable>
                      {open && (
                        <MonLexiqueEntryDetail
                          entry={entry}
                          metIn={met?.title}
                          reachedItemIds={reachedItemIds}
                          onSay={(text) => say(text)}
                          onPractise={
                            entry.practiceEligibility !== "none" && met !== undefined
                              ? () =>
                                  router.push(
                                    `/practice-hub?lesson=${encodeURIComponent(met.id)}` as never,
                                  )
                              : undefined
                          }
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
