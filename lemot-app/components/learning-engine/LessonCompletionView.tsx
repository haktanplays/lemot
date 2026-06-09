import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { P } from "@/constants/theme";

/**
 * Lesson completion view (PR-C): calm, label-free end card for the sandbox
 * learner renderer.
 *
 * Dumb + presentational: it owns no events, no storage, no router, and no
 * progress logic. The shell computes coverage from `selectLessonProgress` over
 * the canonical event log and hands this view a plain `completed` flag plus a
 * `remainingCount`. It NEVER shows technical ids, operation labels, counts of
 * "score", or any motivational / reward language (no xp, streak, level, reward).
 *
 * It is a card-shaped block rendered in place of the card area (not a full
 * screen), so it sits inside the shell's existing ScrollView body.
 */
export function LessonCompletionView({
  completed,
  remainingCount,
  saveHint,
  onBack,
  onReview,
}: {
  completed: boolean;
  remainingCount: number;
  saveHint?: string | null;
  onBack: () => void;
  onReview?: () => void;
}) {
  const remainingLabel =
    remainingCount === 1 ? "1 card" : `${remainingCount} cards`;

  return (
    <View style={card}>
      <Text style={kicker}>{completed ? "Lesson complete" : "Lesson paused"}</Text>
      <Text style={body}>
        {completed
          ? "You went through all the cards."
          : `You can still revisit ${remainingLabel} whenever you like.`}
      </Text>

      {saveHint ? <Text style={hint}>{saveHint}</Text> : null}

      <View style={actions}>
        <Pressable onPress={onBack} style={primaryBtn}>
          <Text style={primaryText}>Back</Text>
        </Pressable>
        {onReview ? (
          <Pressable onPress={onReview} style={secondaryBtn}>
            <Text style={secondaryText}>Back to cards</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const card: ViewStyle = {
  width: "100%",
  borderRadius: 16,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.paper,
  padding: 24,
  gap: 10,
};
const kicker: TextStyle = {
  color: P.ink3,
  fontSize: 13,
  letterSpacing: 1,
  fontFamily: "Outfit",
  textTransform: "uppercase",
};
const body: TextStyle = {
  color: P.ink,
  fontSize: 18,
  lineHeight: 26,
  fontFamily: "Newsreader",
};
const hint: TextStyle = {
  color: P.ink3,
  fontSize: 12,
  fontFamily: "Outfit",
};
const actions: ViewStyle = { flexDirection: "row", gap: 12, marginTop: 6 };
const primaryBtn: ViewStyle = {
  borderRadius: 999,
  backgroundColor: P.red,
  paddingHorizontal: 22,
  paddingVertical: 10,
};
const primaryText: TextStyle = {
  color: "#ffffff",
  fontSize: 15,
  fontFamily: "Outfit",
};
const secondaryBtn: ViewStyle = {
  borderRadius: 999,
  borderWidth: 1,
  borderColor: P.border,
  paddingHorizontal: 20,
  paddingVertical: 10,
};
const secondaryText: TextStyle = {
  color: P.ink2,
  fontSize: 15,
  fontFamily: "Outfit",
};
