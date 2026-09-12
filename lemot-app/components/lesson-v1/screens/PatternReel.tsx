import { useEffect, useRef, useState } from "react";
import { View, Text, Animated, Easing, AccessibilityInfo } from "react-native";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { useReduceMotion } from "@/hooks/useReduceMotion";
import { PrimaryAction } from "@/components/ui/actions";
import { P, SPACE, frenchLineHeight } from "@/constants/theme";
import type { PatternReelRow, PatternReelScreen } from "@/content/lessonTypes";
import { Kicker } from "@/components/ui/editorial";

/**
 * French that drifts past, slowly, so a pattern is SEEN rather than asserted.
 *
 * This is the first taste's oldest beat, recovered. It used to live inside
 * `app/lesson-zero.tsx` as a private `FamiliarReel`, and when first use moved
 * onto the lesson engine the reel was deleted along with the bespoke screen
 * that held it — which is how L0 lost the one moment that made a beginner
 * think "I already know some of this". The motion is the argument: a static
 * list of cognates is a vocabulary table, and nobody has ever been surprised
 * by a table.
 *
 * TWO MODES, because they are one idea from either end:
 *
 *   no stem    two columns drift in OPPOSITE directions and the centred pair
 *              always matches. The learner reads French they already
 *              understand, without being told they can.
 *   with stem  the stem is pinned and only the phrase beside it moves, so one
 *              shape the learner owns is seen carrying many different
 *              requests. Future engines (c'est, vous avez, je vais) get this
 *              for free; nothing here is specific to one lesson.
 *
 * Grades nothing, records nothing, has no targets — the showcase contract, for
 * the showcase reason: watching is not producing.
 */

const ROW_H = 44;
const VISIBLE_ROWS = 5; // odd, so exactly one row sits on the centre band
const CYCLE_MS = 18000; // one slow full turn
const FADE_BANDS = [0.92, 0.72, 0.5, 0.32, 0.16, 0.06];

// With the two columns moving in opposite directions, the English row facing a
// given French row is not the one at the same index. Reflecting the English
// order about the centre — `(2*centre + N - q) mod N` — makes the two centred
// items the SAME pair for every position, so the band always reads a true pair
// while the columns still travel against each other.
const CENTRE_ROW = (VISIBLE_ROWS - 1) / 2;

function reflectEnglish(rows: readonly PatternReelRow[]): string[] {
  const n = rows.length;
  return rows.map((_, q) => rows[(((2 * CENTRE_ROW + n - q) % n) + n) % n].en);
}

function ReelFade({ edge }: { edge: "top" | "bottom" }) {
  // Dependency-free soft edge: stacked background bands with falling opacity.
  // No gradient or mask library is installed, and adding one for six rectangles
  // would be a dependency the reel does not need.
  const bands = edge === "top" ? FADE_BANDS : [...FADE_BANDS].reverse();
  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        ...(edge === "top" ? { top: 0 } : { bottom: 0 }),
      }}
    >
      {bands.map((opacity, i) => (
        <View key={i} style={{ height: 8, backgroundColor: P.bg, opacity }} />
      ))}
    </View>
  );
}


// Both carry a line height on purpose. French runs accents above and
// descenders below, and a Text with none inherits a default sized for
// unaccented Latin — which shaves é, à and the tail of j. The reel's rows are a
// fixed height, so a clipped glyph here would be silent.
const frenchStyle = {
  color: P.ink,
  fontFamily: "serif" as const,
  fontSize: 17,
  lineHeight: frenchLineHeight(17),
};
const meaningStyle = { color: P.ink3, fontSize: 15, lineHeight: frenchLineHeight(15) };

/** The whole set at rest: what a learner with reduce-motion on reads instead. */
function StaticRows({ rows, stem }: { rows: readonly PatternReelRow[]; stem?: string }) {
  return (
    <View>
      {rows.map((row, i) => (
        <View
          key={`${row.fr}-${i}`}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: SPACE.md,
            paddingVertical: 10,
            borderTopWidth: i === 0 ? 0 : 1,
            borderTopColor: P.border,
          }}
        >
          <Text style={[frenchStyle, { flex: 1 }]}>
            {stem ? `${stem} ${row.fr}` : row.fr}
          </Text>
          <Text style={meaningStyle}>{row.en}</Text>
        </View>
      ))}
    </View>
  );
}

export function PatternReel({
  screen,
  onContinue,
}: {
  screen: PatternReelScreen;
  onContinue: () => void;
}) {
  const { payload } = screen;
  const rows = payload.rows;
  const stem = payload.stem;
  const reduceMotion = useReduceMotion();

  const progress = useRef(new Animated.Value(0)).current;
  const loopH = rows.length * ROW_H;
  const viewportH = VISIBLE_ROWS * ROW_H;

  useEffect(() => {
    if (reduceMotion || rows.length === 0) return;
    progress.setValue(0);
    const anim = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: CYCLE_MS,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [reduceMotion, progress, rows.length]);

  // Rendered twice so a translateY of exactly one loop height wraps seamlessly.
  const column = (
    kind: string,
    words: readonly string[],
    outputRange: number[],
    style: Record<string, unknown>,
    align: "left" | "right",
  ) => {
    const translateY = progress.interpolate({ inputRange: [0, 1], outputRange });
    return (
      <View style={{ flex: 1, height: viewportH, overflow: "hidden" }}>
        <Animated.View style={{ transform: [{ translateY }] }}>
          {[...words, ...words].map((w, i) => (
            <View
              key={`${kind}-${i}`}
              style={{
                height: ROW_H,
                justifyContent: "center",
                alignItems: align === "right" ? "flex-end" : "flex-start",
              }}
            >
              <Text numberOfLines={1} style={style}>
                {w}
              </Text>
            </View>
          ))}
        </Animated.View>
      </View>
    );
  };

  return (
    <LessonScreenFrame
      footer={<PrimaryAction label="Continue" onPress={onContinue} />}
    >
      <Kicker text="See the pattern" gap="sm" />

      {/* Serif, and a title may carry French, so it takes the French floor
          rather than a number that happens to look right in English. */}
      <Text
        style={{
          color: P.ink,
          fontFamily: "serif",
          fontSize: 21,
          lineHeight: frenchLineHeight(21),
        }}
      >
        {payload.title}
      </Text>

      {payload.body ? (
        <Text
          style={{
            color: P.ink2,
            fontSize: 15,
            lineHeight: 23,
            marginTop: SPACE.sm,
          }}
        >
          {payload.body}
        </Text>
      ) : null}

      <View style={{ marginTop: SPACE.lg }}>
        {reduceMotion ? (
          <StaticRows rows={rows} stem={stem} />
        ) : (
          <View style={{ height: viewportH, justifyContent: "center" }}>
            <View style={{ flexDirection: "row", height: viewportH, gap: SPACE.md }}>
              {stem ? (
                // The stem does not move. That is the entire point of this mode:
                // the learner watches what stays while the rest changes.
                <View style={{ justifyContent: "center" }}>
                  <Text style={frenchStyle}>{stem}</Text>
                </View>
              ) : null}
              {column(
                "fr",
                rows.map((r) => r.fr),
                [0, -loopH],
                frenchStyle,
                "left",
              )}
              {column(
                "en",
                stem ? rows.map((r) => r.en) : reflectEnglish(rows),
                // Without a stem the columns travel against each other, which is
                // what makes the reel read as two languages meeting. With a
                // stem there is one moving phrase and its meaning must ride
                // alongside it, so both columns travel together.
                stem ? [0, -loopH] : [-loopH, 0],
                meaningStyle,
                "right",
              )}
            </View>
            <ReelFade edge="top" />
            <ReelFade edge="bottom" />
          </View>
        )}
      </View>

      {payload.note ? (
        <View
          style={{
            marginTop: SPACE.lg,
            paddingTop: SPACE.md,
            borderTopWidth: 1,
            borderTopColor: P.border,
          }}
        >
          <Text style={{ color: P.ink3, fontSize: 12, lineHeight: 16, marginBottom: 4 }}>
            Why it works
          </Text>
          <Text style={{ color: P.ink2, fontSize: 15, lineHeight: 23 }}>{payload.note}</Text>
        </View>
      ) : null}
    </LessonScreenFrame>
  );
}
