import { useState } from "react";
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

/**
 * Learner-facing "A small moment" card (P3.5) — the context_chain.
 *
 * A short human scene the learner reads, then works through fixed steps to reach
 * a controlled response. It should feel like a calm moment, not a debug stepper:
 * no operation labels, exercise ids, ownership-bucket names, validator language,
 * raw tag names, or item ids. Each step's expected answer is the fixture's fixed
 * step string, so it is graded with the deterministic `grade()` (operation
 * "context_chain") for friendly, local on-screen feedback. Advancing requires a
 * positive result; the last step leads to a calm completion state.
 *
 * The card does NOT import `LocalRepository`, construct events, or update mastery.
 * On each step Check it hands the result up via the optional `onGradedAttempt`
 * callback (the session controller builds + appends the event upstream, P3.6);
 * the completion state itself is local-only and writes nothing.
 */
type ContextChainEx = Extract<ExerciseBlueprint, { operation: "context_chain" }>;

export function ContextChainCard({
  exercise,
  onGradedAttempt,
}: {
  exercise: ContextChainEx;
  onGradedAttempt?: GradedAttemptHandler;
}) {
  const steps = exercise.steps;
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ErrorTagCode | null>(null);
  const [completed, setCompleted] = useState(false);

  const step = steps[idx];
  const isLast = idx >= steps.length - 1;
  const positive = result ? isPositive(result) : false;
  const feedback = result ? friendlyFeedback(result) : null;
  const accent = positive ? P.green : P.amber;

  const onCheck = () => {
    if (!step) return;
    const expectedAnswer = step.answer;
    const graded = grade({
      operation: "context_chain",
      userAnswer: input,
      expectedAnswer,
    });
    setResult(graded.result);
    onGradedAttempt?.({ userAnswer: input, expectedAnswer, gradeResult: graded });
  };

  const onAdvance = () => {
    if (isLast) {
      setCompleted(true);
      return;
    }
    setIdx((i) => i + 1);
    setInput("");
    setResult(null);
  };

  return (
    <View style={card}>
      <Text style={kicker}>A small moment</Text>
      {exercise.prompt ? <Text style={sceneText}>{exercise.prompt}</Text> : null}

      {completed || steps.length === 0 ? (
        <View style={completionBox}>
          <Text style={completionText}>Nice — that response fits.</Text>
          {exercise.targetText ? (
            <Text style={completionTarget}>{exercise.targetText}</Text>
          ) : null}
        </View>
      ) : (
        <>
          <Text style={stepCount}>
            Step {idx + 1} of {steps.length}
          </Text>
          {step?.prompt ? <Text style={stepPrompt}>{step.prompt}</Text> : null}

          <TextInput
            value={input}
            onChangeText={(t) => {
              setInput(t);
              setResult(null);
            }}
            placeholder="Type it here…"
            placeholderTextColor={P.ink3}
            autoCapitalize="none"
            autoCorrect={false}
            style={inputBox}
          />

          <View style={btnRow}>
            <Pressable onPress={onCheck} style={primaryBtn}>
              <Text style={primaryBtnText}>Check</Text>
            </Pressable>
            {positive ? (
              <Pressable onPress={onAdvance} style={advanceBtn}>
                <Text style={advanceBtnText}>{isLast ? "Finish" : "Next"}</Text>
              </Pressable>
            ) : null}
          </View>

          {feedback ? (
            <View style={[feedbackBox, { borderColor: accent }]}>
              <Text style={{ color: accent, fontSize: 14, fontFamily: "Outfit" }}>
                {feedback}
              </Text>
            </View>
          ) : null}
        </>
      )}
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
const kicker: TextStyle = {
  color: P.purple,
  fontSize: 12,
  letterSpacing: 1,
  fontFamily: "Outfit",
  textTransform: "uppercase",
};
const sceneText: TextStyle = {
  color: P.ink,
  fontSize: 18,
  lineHeight: 26,
  fontFamily: "Newsreader",
};
const stepCount: TextStyle = { color: P.ink3, fontSize: 13, fontFamily: "Outfit" };
const stepPrompt: TextStyle = {
  color: P.ink2,
  fontSize: 16,
  lineHeight: 24,
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
const btnRow: ViewStyle = { flexDirection: "row", gap: 10 };
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
const advanceBtn: ViewStyle = {
  alignSelf: "flex-start",
  borderRadius: 999,
  borderWidth: 1,
  borderColor: P.green,
  paddingHorizontal: 18,
  paddingVertical: 8,
};
const advanceBtnText: TextStyle = {
  color: P.green,
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
const completionBox: ViewStyle = {
  borderRadius: 12,
  borderWidth: 1,
  borderColor: P.green,
  backgroundColor: P.bg,
  padding: 16,
  gap: 4,
};
const completionText: TextStyle = {
  color: P.green,
  fontSize: 15,
  fontFamily: "Outfit",
};
const completionTarget: TextStyle = {
  color: P.ink,
  fontSize: 17,
  lineHeight: 24,
  fontFamily: "Newsreader",
};
