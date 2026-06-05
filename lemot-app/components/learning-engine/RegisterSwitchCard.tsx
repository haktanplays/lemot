import { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { P } from "@/constants/theme";
import type { ExerciseBlueprint } from "@/content/learning-engine";
import { grade } from "@/content/learning-engine/grade";
import type { ErrorTagCode } from "@/content/learning-engine/events";
import type { GradedAttemptHandler } from "@/content/learning-engine/session-controller";
import { friendlyFeedback, isPositive } from "./feedbackCopy";
import { fingerprintAnswer } from "./gradedAttemptGuard";

/**
 * Learner-facing "say it more clearly" card (P3.4) — the soft register-shift.
 *
 * Shows the casual/too-direct phrase and invites the learner to type the
 * clearer / more standard version. On "Check" it runs the deterministic
 * `grade()` (operation "register_switch") against the exercise's target form and
 * shows CALM feedback. The technical operation name is never shown.
 *
 * The card does NOT import `LocalRepository`, construct events, or update
 * mastery — `grade()` drives on-screen feedback, and on Check it hands the result
 * up via the optional `onGradedAttempt` callback (the session controller builds +
 * appends the event upstream, P3.6).
 */
type RegisterSwitchEx = Extract<ExerciseBlueprint, { operation: "register_switch" }>;

export function RegisterSwitchCard({
  exercise,
  onGradedAttempt,
}: {
  exercise: RegisterSwitchEx;
  onGradedAttempt?: GradedAttemptHandler;
}) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ErrorTagCode | null>(null);
  // H-1: repeated Check on the same unchanged answer records no duplicate event.
  const lastRecorded = useRef<string | null>(null);

  const onCheck = () => {
    const expectedAnswer = exercise.politeForm;
    const graded = grade({
      operation: "register_switch",
      userAnswer: input,
      expectedAnswer,
    });
    setResult(graded.result);
    const fp = fingerprintAnswer(input);
    if (lastRecorded.current !== fp) {
      lastRecorded.current = fp;
      onGradedAttempt?.({ userAnswer: input, expectedAnswer, gradeResult: graded });
    }
  };

  const feedback = result ? friendlyFeedback(result) : null;
  const accent = result && isPositive(result) ? P.green : P.amber;

  return (
    <View style={card}>
      {exercise.prompt ? <Text style={promptText}>{exercise.prompt}</Text> : null}

      <View style={sourceBox}>
        <Text style={sourceLabel}>You hear</Text>
        <Text style={sourceText}>{exercise.directForm}</Text>
      </View>

      <TextInput
        value={input}
        onChangeText={(t) => {
          setInput(t);
          setResult(null);
        }}
        placeholder="Say it more clearly…"
        placeholderTextColor={P.ink3}
        autoCapitalize="none"
        autoCorrect={false}
        style={inputBox}
      />

      <Pressable onPress={onCheck} style={primaryBtn}>
        <Text style={primaryBtnText}>Check</Text>
      </Pressable>

      {feedback ? (
        <View style={[feedbackBox, { borderColor: accent }]}>
          <Text style={{ color: accent, fontSize: 14, fontFamily: "Outfit" }}>
            {feedback}
          </Text>
        </View>
      ) : null}
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
const sourceBox: ViewStyle = {
  borderRadius: 12,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.bg,
  padding: 14,
  gap: 2,
};
const sourceLabel: TextStyle = {
  color: P.ink3,
  fontSize: 12,
  fontFamily: "Outfit",
};
const sourceText: TextStyle = {
  color: P.ink2,
  fontSize: 16,
  fontFamily: "Newsreader",
};
const inputBox: TextStyle = {
  borderRadius: 12,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.bg,
  paddingHorizontal: 14,
  paddingVertical: 10,
  fontSize: 18,
  fontFamily: "Newsreader",
  color: P.ink,
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
const feedbackBox: ViewStyle = {
  borderRadius: 12,
  borderWidth: 1,
  backgroundColor: P.bg,
  paddingHorizontal: 14,
  paddingVertical: 10,
};
