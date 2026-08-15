import { View, Text } from "react-native";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction } from "@/components/ui/actions";
import { PieceChip } from "@/components/ui/PieceChip";
import { P, SPACE } from "@/constants/theme";
import type { RecapScreen } from "@/content/lessonTypes";

export function RecapCard({
  screen,
  onContinue,
}: {
  screen: RecapScreen;
  onContinue: () => void;
}) {
  const { payload } = screen;
  const pieces = payload.piecesUsed ?? [];
  const buttonLabel = payload.nextLabel ?? "Continue";

  return (
    <LessonScreenFrame
      footer={<PrimaryAction label={buttonLabel} onPress={onContinue} />}
    >
      {/* A calm mirror of what passed through the learner's hands. No box, no
          tally, no checklist: a kicker, an editorial title, quiet lines, and
          the pieces themselves laid out with room to breathe. The chips are the
          same PieceChip the lesson used to hand them out, so seeing them again
          reads as recognition rather than as a score. */}
      <Text
        style={{
          color: P.ink3,
          fontSize: 12,
          letterSpacing: 0.4,
          marginBottom: SPACE.sm,
        }}
      >
        A small recap
      </Text>

      {payload.title && (
        <Text
          style={{
            color: P.ink,
            fontFamily: "serif",
            fontSize: 21,
            lineHeight: 29,
            marginBottom: SPACE.lg,
          }}
        >
          {payload.title}
        </Text>
      )}

      {payload.lines.map((line, i) => (
        <Text
          key={i}
          style={{
            color: P.ink2,
            fontSize: 15,
            lineHeight: 23,
            marginTop: i === 0 ? 0 : SPACE.sm,
          }}
        >
          {line}
        </Text>
      ))}

      {pieces.length > 0 && (
        <View style={{ marginTop: SPACE.xxl }}>
          <View
            style={{
              height: 1,
              backgroundColor: P.border,
              marginBottom: SPACE.lg,
            }}
          />
          <Text
            style={{ color: P.ink3, fontSize: 12, marginBottom: SPACE.md }}
          >
            Pieces you used
          </Text>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", gap: SPACE.sm }}
          >
            {pieces.map((p, i) => (
              <PieceChip key={`${p}-${i}`} text={p} />
            ))}
          </View>
        </View>
      )}

    </LessonScreenFrame>
  );
}
