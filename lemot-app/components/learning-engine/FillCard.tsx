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

/**
 * Learner-facing fill / input card (P3.3).
 *
 * Local input only. On "Check" it runs the deterministic `grade()` and shows
 * CALM, learner-friendly feedback. P3.3 does NOT create a LearningEvent, write
 * to LocalRepository, or update mastery — grading is purely for on-screen
 * feedback. Raw ErrorTagCode names are never shown; only friendly copy.
 *
 * Expected answer comes from the exercise's `targetText`. Accepted-variant /
 * boundary-form lists are intentionally omitted in P3.3 (not safely resolvable
 * here without extra graph wiring) — `grade()` defaults apply.
 */
type FillEx = Extract<ExerciseBlueprint, { operation: "fill" }>;

const FRIENDLY: Partial<Record<ErrorTagCode, string>> = {
  correct: "That's it.",
  accepted_variant: "That works too.",
  punctuation_only: "Almost — just punctuation.",
  accent_only: "Almost — watch the accents.",
  spelling_near_miss: "Almost — small spelling slip.",
  wrong_order: "Right pieces, different order.",
  missing_word: "Something's missing.",
  extra_word: "One word too many.",
  blocked_form_used: "That form comes later.",
  recognition_only_form_used: "You'll build that one later.",
  empty_or_skip: "Try something first.",
  incorrect_but_understandable: "Not quite yet.",
};

const POSITIVE: ReadonlySet<ErrorTagCode> = new Set<ErrorTagCode>([
  "correct",
  "accepted_variant",
]);

export function FillCard({ exercise }: { exercise: FillEx }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ErrorTagCode | null>(null);

  const onCheck = () => {
    const graded = grade({
      operation: "fill",
      userAnswer: input,
      expectedAnswer: exercise.targetText ?? null,
    });
    setResult(graded.result);
  };

  const feedback = result ? (FRIENDLY[result] ?? "Not quite yet.") : null;
  const positive = result ? POSITIVE.has(result) : false;
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
