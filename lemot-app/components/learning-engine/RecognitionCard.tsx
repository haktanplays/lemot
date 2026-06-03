import { useState } from "react";
import { View, Text, Pressable, type ViewStyle, type TextStyle } from "react-native";
import { P } from "@/constants/theme";
import type { ExerciseBlueprint } from "@/content/learning-engine";

/**
 * Learner-facing recognition card (P3.3).
 *
 * A calm tap-to-reveal card: the learner reads the situation/prompt and may
 * reveal the meaning. NEVER graded, NEVER shows operation labels, exercise ids,
 * ownership-bucket names, or validator/tag jargon (debug surface ≠ learner UI).
 *
 * Boundary / "later form" recognition items render here as ordinary soft
 * recognition cards for now; the dedicated soft "later form" polish is P3.8.
 */
type RecognitionEx = Extract<ExerciseBlueprint, { operation: "recognition" }>;

export function RecognitionCard({ exercise }: { exercise: RecognitionEx }) {
  const [revealed, setRevealed] = useState(false);
  const meaning = exercise.displayAnswer ?? exercise.targetText ?? "";

  return (
    <View style={card}>
      {exercise.prompt ? <Text style={promptText}>{exercise.prompt}</Text> : null}

      {revealed && meaning ? (
        <View style={revealBox}>
          <Text style={revealText}>{meaning}</Text>
        </View>
      ) : null}

      <Pressable onPress={() => setRevealed((r) => !r)} style={primaryBtn}>
        <Text style={primaryBtnText}>{revealed ? "Hide" : "Show me"}</Text>
      </Pressable>
    </View>
  );
}

const card: ViewStyle = {
  borderRadius: 16,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.paper,
  padding: 20,
  gap: 12,
};
const promptText: TextStyle = {
  color: P.ink,
  fontSize: 18,
  lineHeight: 26,
  fontFamily: "Newsreader",
};
const revealBox: ViewStyle = {
  borderRadius: 12,
  borderWidth: 1,
  borderColor: P.green,
  backgroundColor: P.bg,
  padding: 14,
};
const revealText: TextStyle = {
  color: P.ink,
  fontSize: 16,
  lineHeight: 24,
  fontFamily: "Newsreader",
};
const primaryBtn: ViewStyle = {
  alignSelf: "flex-start",
  borderRadius: 999,
  borderWidth: 1,
  borderColor: P.red,
  paddingHorizontal: 18,
  paddingVertical: 8,
};
const primaryBtnText: TextStyle = {
  color: P.red,
  fontSize: 14,
  fontFamily: "Outfit",
};
