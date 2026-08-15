import { View, Text } from "react-native";
import { P, RADIUS, SPACE } from "@/constants/theme";

/**
 * FeedbackBand - the calm result signal (UI Slice 3).
 *
 * Presentation only: it receives its text and tone from the caller and holds no
 * grading logic. The emotional target is neutral + specific + recoverable — a
 * quiet left-accent line, never a filled success banner, a red error frame, a
 * checkmark, a score, or a reward. It is intentionally lighter than a surface
 * card so the natural-French payoff below it stays the strongest thing on the
 * result screen.
 *
 * Tones map to the existing verdict roles without inventing new meaning:
 *   confirmed - a quiet positive signal (exact match)
 *   accepted  - a warm acknowledgement that does not claim equivalence
 *   compare   - a neutral observation (no match; compare with the model)
 */
export type FeedbackTone = "confirmed" | "accepted" | "compare";

const TONE: Record<FeedbackTone, { accent: string; text: string }> = {
  confirmed: { accent: P.green, text: P.green },
  accepted: { accent: P.amber, text: P.amber },
  compare: { accent: P.border, text: P.ink2 },
};

export function FeedbackBand({
  tone,
  text,
}: {
  tone: FeedbackTone;
  text: string;
}) {
  const style = TONE[tone];
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderLeftWidth: 3,
        borderLeftColor: style.accent,
        borderTopRightRadius: RADIUS.inner,
        borderBottomRightRadius: RADIUS.inner,
        paddingLeft: SPACE.md,
        paddingVertical: SPACE.sm,
      }}
    >
      <Text style={{ color: style.text, fontSize: 14 }}>{text}</Text>
    </View>
  );
}
