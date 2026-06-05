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
 * Learner-facing fill / input card (P3.3).
 *
 * Local input only. On "Check" it runs the deterministic `grade()` and shows
 * CALM, learner-friendly feedback (shared `feedbackCopy`). The card itself does
 * NOT import `LocalRepository`, construct events, or update mastery — on Check it
 * hands the result up via the optional `onGradedAttempt` callback (the session
 * controller builds + appends the event upstream, P3.6). Raw ErrorTagCode names
 * are never shown.
 *
 * Expected answer comes from the exercise's `targetText`. Accepted-variant /
 * boundary-form lists are intentionally omitted (not safely resolvable here
 * without extra graph wiring) — `grade()` defaults apply.
 */
type FillEx = Extract<ExerciseBlueprint, { operation: "fill" }>;

export function FillCard({
  exercise,
  onGradedAttempt,
}: {
  exercise: FillEx;
  onGradedAttempt?: GradedAttemptHandler;
}) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ErrorTagCode | null>(null);
  // H-1: fingerprint of the last RECORDED answer — repeated Check on the same
  // unchanged answer shows feedback again but records no duplicate event.
  const lastRecorded = useRef<string | null>(null);

  const onCheck = () => {
    const expectedAnswer = exercise.targetText ?? null;
    const graded = grade({
      operation: "fill",
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
  const positive = result ? isPositive(result) : false;
  const accent = positive ? P.green : P.amber;

  return (
    <View style={card}>
      {exercise.prompt ? <Text style={promptText}>{exercise.prompt}</Text> : null}

      <TextInput
        value={input}
        onChangeText={(t) => {
          setInput(t);
          setResult(null);
        }}
        placeholder="Type your answer…"
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
