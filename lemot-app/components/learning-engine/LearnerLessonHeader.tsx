import { View, Text } from "react-native";
import { P } from "@/constants/theme";

/**
 * Learner-facing lesson header (P3.2 skeleton).
 *
 * Calm, label-free header for the learner renderer. Shows a soft kicker and the
 * lesson's learner-friendly "can do" line — NEVER technical ids, operation
 * labels, ownership-bucket names, or validator language (debug surface ≠ learner
 * UI, per the Sprint13 SW.2 spec).
 */
export function LearnerLessonHeader({ canDo }: { canDo: string }) {
  return (
    <View style={{ gap: 6 }}>
      <Text
        style={{
          color: P.red,
          fontSize: 12,
          letterSpacing: 1,
          fontFamily: "Outfit",
          textTransform: "uppercase",
        }}
      >
        Your lesson
      </Text>
      <Text
        style={{
          color: P.ink,
          fontSize: 20,
          lineHeight: 28,
          fontFamily: "Newsreader",
        }}
      >
        {canDo}
      </Text>
    </View>
  );
}
