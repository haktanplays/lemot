import type { ReactNode } from "react";
import { View, Text } from "react-native";
import { P, SPACE } from "@/constants/theme";

/**
 * The shared frame for the three standing surfaces (UI Slice 5).
 *
 * Journey, Mon Lexique, Practice and the learning summary each hand-rolled the
 * same header block and the same quiet one-line state, with their own spacing
 * numbers. These two primitives name that shared language once so the standing
 * surfaces read as one app, and so a state line can never drift into looking
 * like an error on one surface and a note on another.
 *
 * Presentation only: both take their text from the caller and own no state, no
 * copy and no behaviour.
 *
 * DELIBERATELY NOT used by the lesson screens. Those live inside
 * `LessonScreenFrame`, whose job (scroll region above a keyboard-tracking
 * footer) is a different one; sharing a header between them would create
 * regression surface across two families that never need to change together.
 */
export function SurfaceHeader({
  title,
  subtitle,
  leading,
  trailing,
}: {
  title: string;
  subtitle?: string;
  /** Placed before the title — a back affordance on a pushed surface. */
  leading?: ReactNode;
  /** Placed opposite the title — at most one quiet action. */
  trailing?: ReactNode;
}) {
  return (
    <View
      style={{
        paddingHorizontal: SPACE.xl,
        paddingTop: SPACE.md,
        paddingBottom: SPACE.lg,
        borderBottomWidth: 1,
        borderBottomColor: P.border,
        gap: SPACE.xs,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: SPACE.md,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: SPACE.sm,
            flexShrink: 1,
          }}
        >
          {leading}
          <Text
            style={{
              color: P.ink,
              fontFamily: "serif",
              fontStyle: "italic",
              fontSize: 20,
              lineHeight: 28,
              flexShrink: 1,
            }}
          >
            {title}
          </Text>
        </View>
        {trailing}
      </View>
      {subtitle && (
        <Text style={{ color: P.ink3, fontSize: 13, lineHeight: 19 }}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

/**
 * The one-line state a standing surface shows when it has nothing to list.
 *
 * `resting` is the deliberate product state (an empty Practice set, a Lexique
 * that has not filled in yet). It is given the same calm ink as ordinary prose
 * and room to sit in, because it is not a failure and must not read as one.
 * `waiting` is the brief read; it recedes further.
 */
export function QuietState({
  text,
  tone = "resting",
}: {
  text: string;
  tone?: "resting" | "waiting";
}) {
  return (
    <View
      style={{
        paddingHorizontal: SPACE.xl,
        paddingTop: SPACE.xxl,
        paddingBottom: SPACE.xl,
      }}
    >
      <Text
        style={{
          color: tone === "waiting" ? P.ink3 : P.ink2,
          fontSize: 15,
          lineHeight: 24,
        }}
      >
        {text}
      </Text>
    </View>
  );
}
