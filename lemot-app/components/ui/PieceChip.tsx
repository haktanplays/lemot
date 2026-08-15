import { View, Text } from "react-native";
import { P, RADIUS, SPACE } from "@/constants/theme";

/**
 * PieceChip - a single French support piece within reach (UI Slice 3).
 *
 * Visual only: it renders a piece the caller already decided to show, and it
 * changes no interaction. Pieces are NOT tappable, NOT answer choices, and NOT
 * draggable — they are small pieces of French the learner may lean on. The warm
 * paper surface with a hairline and serif French keeps them tactile and calm,
 * deliberately unlike a quiz option or a reward token, and subordinate to the
 * learner's own input.
 */
export function PieceChip({ text, label }: { text: string; label?: string }) {
  return (
    <View
      style={{
        backgroundColor: P.paper,
        borderWidth: 1,
        borderColor: P.border,
        borderRadius: RADIUS.pill,
        paddingHorizontal: SPACE.md,
        paddingVertical: SPACE.sm - 1,
        alignSelf: "flex-start",
      }}
    >
      <Text
        style={{
          color: P.ink,
          fontFamily: "serif",
          fontStyle: "italic",
          fontSize: 14,
        }}
      >
        {text}
      </Text>
      {label && (
        <Text style={{ color: P.ink3, fontSize: 11, marginTop: 1 }}>
          {label}
        </Text>
      )}
    </View>
  );
}
