import { useMemo, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { P, SPACE } from "@/constants/theme";
import { SurfaceHeader } from "@/components/ui/StandingSurface";
import { QuietAction } from "@/components/ui/actions";
import { cataloguePageOf } from "@/content/practice/practiceCatalogue";
import { PRACTICE_UI_COPY, browseModeCopy } from "@/content/practice/practiceCopy";
import type { BrowseMode } from "@/content/practice/practiceBrowse";
import type { PracticeSeed } from "@/content/practice/practiceTypes";
import { PracticeCard } from "./PracticeCard";

/** How many cards arrive at once. Small enough to read, large enough to feel. */
const PAGE_SIZE = 12;

export type BrowseLesson = { id: string; title: string };

/**
 * The browse surface: one mode, its real practices, a page at a time.
 *
 * THE DEFECT THIS FIXES. A learner who had walked L0-L6 owned 251 lawful
 * practices and could reach eight of them, once a sitting, chosen for them.
 * Selecting "Survival Kit" used to mean selecting a FILTER and then being
 * handed the same eight-item session; it now means opening that lesson's
 * forty-three practices and walking them.
 *
 * PAGES, NOT A WALL. Breadth has to be felt without 251 cards being dropped on
 * the learner, so the catalogue's deterministic cursor hands over twelve at a
 * time and "Keep going" asks for the next twelve. The order is a rotation of
 * the authored order keyed to the learner, so two learners do not both start at
 * seed one and the same learner sees a stable list. FlatList keeps the rows
 * that are off-screen off the screen.
 *
 * IT COUNTS NOTHING OUT LOUD. There is no "43 exercises!", no progress ring and
 * no completion percentage. Abundance is shown by there being more when you
 * scroll, which is the honest version of the same fact.
 */
export function PracticeBrowse({
  mode,
  pool,
  poolId,
  lessons,
  selectedLessonId,
  lessonTitleOf,
  onSelectLesson,
  onOpen,
  onBack,
}: {
  mode: BrowseMode;
  /**
   * Already lawful, already narrowed and ALREADY ORDERED. This surface filters
   * nothing and rotates nothing: the route owns the order, because the route is
   * what turns a tapped position back into a seed, and a second rotation here
   * would mean the index this reports names a different practice than the one
   * under the learner's thumb.
   */
  pool: readonly PracticeSeed[];
  /** Identifies the current pool, so paging resets when the pool changes. */
  poolId: string;
  /** Offered only in By lesson; empty elsewhere. */
  lessons: readonly BrowseLesson[];
  selectedLessonId: string | null;
  lessonTitleOf: (lessonId: string) => string | undefined;
  onSelectLesson: (lessonId: string) => void;
  /** Open a run starting at this position in the browse order. */
  onOpen: (index: number) => void;
  onBack: () => void;
}) {
  // How many pages have been asked for. Cursor arithmetic stays in the
  // catalogue; this only remembers how far the learner has walked, and resets
  // when the pool underneath changes.
  const [pages, setPages] = useState(1);
  const poolKey = `${poolId}::${pool.length}`;
  const [seenKey, setSeenKey] = useState(poolKey);
  if (seenKey !== poolKey) {
    setSeenKey(poolKey);
    setPages(1);
  }

  const shown = useMemo(() => cataloguePageOf(pool, 0, PAGE_SIZE * pages), [pool, pages]);
  const copy = browseModeCopy(mode);
  const more = shown.nextCursor !== null;

  return (
    <View style={{ flex: 1 }}>
      <SurfaceHeader
        title={copy.label}
        subtitle={copy.detail}
        leading={
          <Pressable
            onPress={onBack}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={PRACTICE_UI_COPY.browseBack}
          >
            <ChevronLeft size={22} color={P.ink2} />
          </Pressable>
        }
      />

      {mode === "byLesson" && lessons.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: SPACE.sm,
            paddingHorizontal: SPACE.xl,
            paddingTop: SPACE.lg,
          }}
        >
          {lessons.map((l) => {
            const active = l.id === selectedLessonId;
            return (
              <Pressable
                key={l.id}
                onPress={() => onSelectLesson(l.id)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                style={{
                  backgroundColor: active ? P.rl : P.paper,
                  borderWidth: 1,
                  borderColor: active ? P.rb : P.border,
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

      <FlatList
        data={shown.seeds}
        keyExtractor={(seed) => seed.id}
        initialNumToRender={PAGE_SIZE}
        windowSize={5}
        // `removeClippedSubviews` is deliberately NOT set. It is the usual next
        // reach for a long list and on Android it has a long history of
        // blanking rows that scroll back into view; FlatList already windows
        // without it, and a card that renders as an empty box is a worse bug
        // than the memory it would save on a list of forty.
        contentContainerStyle={{
          paddingHorizontal: SPACE.xl,
          paddingTop: SPACE.lg,
          paddingBottom: SPACE.xxl,
          gap: SPACE.md,
        }}
        renderItem={({ item, index }) => (
          <PracticeCard
            seed={item}
            lessonTitle={mode === "byLesson" ? undefined : lessonTitleOf(item.originLessonId)}
            onPress={() => onOpen(index)}
          />
        )}
        ListEmptyComponent={
          <Text style={{ color: P.ink2, fontSize: 15, lineHeight: 23 }}>
            {copy.empty ?? PRACTICE_UI_COPY.browseEnd}
          </Text>
        }
        ListFooterComponent={
          shown.seeds.length === 0 ? null : more ? (
            <View style={{ marginTop: SPACE.md }}>
              <QuietAction
                label={PRACTICE_UI_COPY.browseMore}
                onPress={() => setPages((n) => n + 1)}
              />
            </View>
          ) : (
            <Text
              style={{
                color: P.ink3,
                fontSize: 13,
                lineHeight: 19,
                marginTop: SPACE.lg,
                textAlign: "center",
              }}
            >
              {PRACTICE_UI_COPY.browseEnd}
            </Text>
          )
        }
      />
    </View>
  );
}
