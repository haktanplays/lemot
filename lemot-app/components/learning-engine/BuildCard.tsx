import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { P } from "@/constants/theme";
import type { ExerciseBlueprint, RawItem } from "@/content/learning-engine";
import { grade } from "@/content/learning-engine/grade";
import type { ErrorTagCode } from "@/content/learning-engine/events";
import { friendlyFeedback, isPositive } from "./feedbackCopy";

/**
 * Learner-facing build card (P3.4).
 *
 * The learner taps pieces in order to assemble the answer; tapping a placed
 * piece removes it, and "Reset" clears. On "Check" it joins the chosen pieces
 * and runs the deterministic `grade()` (operation "build") against the
 * exercise's `targetText`, showing CALM, learner-friendly feedback. Tile surface
 * text is resolved from the item registry (`items[itemId].text.fr`).
 *
 * No events, NO LocalRepository, NO mastery — `grade()` drives on-screen
 * feedback only. NEVER shows operation labels, exercise ids, ownership-bucket
 * names, validator language, or raw tag names.
 */
type BuildEx = Extract<ExerciseBlueprint, { operation: "build" }>;

export function BuildCard({
  exercise,
  items,
}: {
  exercise: BuildEx;
  items: Record<string, RawItem>;
}) {
  const tiles = exercise.tiles ?? [];
  const surface = (id: string): string => items[id]?.text.fr ?? id;

  const [picked, setPicked] = useState<number[]>([]);
  const [result, setResult] = useState<ErrorTagCode | null>(null);

  const available = tiles.map((_, i) => i).filter((i) => !picked.includes(i));

  const onCheck = () => {
    const userAnswer = picked.map((i) => surface(tiles[i].itemId)).join(" ");
    const graded = grade({
      operation: "build",
      userAnswer,
      expectedAnswer: exercise.targetText ?? null,
    });
    setResult(graded.result);
  };

  const reset = () => {
    setPicked([]);
    setResult(null);
  };

  const feedback = result ? friendlyFeedback(result) : null;
  const accent = result && isPositive(result) ? P.green : P.amber;

  return (
    <View style={card}>
      {exercise.prompt ? <Text style={promptText}>{exercise.prompt}</Text> : null}

      <View style={answerRow}>
        {picked.length === 0 ? (
          <Text style={hint}>Tap the pieces in order…</Text>
        ) : (
          picked.map((tileIdx, pos) => (
            <Pressable
              key={`picked-${tileIdx}`}
              onPress={() => {
                setPicked(picked.filter((_, p) => p !== pos));
                setResult(null);
              }}
              style={pickedTile}
            >
              <Text style={tileText}>{surface(tiles[tileIdx].itemId)}</Text>
            </Pressable>
          ))
        )}
      </View>

      <View style={tileRow}>
        {available.map((i) => (
          <Pressable
            key={`tile-${i}`}
            onPress={() => {
              setPicked([...picked, i]);
              setResult(null);
            }}
            style={tile}
          >
            <Text style={tileText}>{surface(tiles[i].itemId)}</Text>
          </Pressable>
        ))}
      </View>

      <View style={btnRow}>
        <Pressable onPress={onCheck} style={primaryBtn}>
          <Text style={primaryBtnText}>Check</Text>
        </Pressable>
        {picked.length > 0 ? (
          <Pressable onPress={reset} style={secondaryBtn}>
            <Text style={secondaryBtnText}>Reset</Text>
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
const answerRow: ViewStyle = {
  minHeight: 48,
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 8,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.bg,
  padding: 10,
  alignItems: "center",
};
const hint: TextStyle = { color: P.ink3, fontSize: 14, fontFamily: "Outfit" };
const tileRow: ViewStyle = { flexDirection: "row", flexWrap: "wrap", gap: 8 };
const tile: ViewStyle = {
  borderRadius: 10,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.paper,
  paddingHorizontal: 12,
  paddingVertical: 8,
};
const pickedTile: ViewStyle = {
  borderRadius: 10,
  borderWidth: 1,
  borderColor: P.purple,
  backgroundColor: P.bg,
  paddingHorizontal: 12,
  paddingVertical: 8,
};
const tileText: TextStyle = {
  color: P.ink,
  fontSize: 16,
  fontFamily: "Newsreader",
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
const secondaryBtn: ViewStyle = {
  alignSelf: "flex-start",
  borderRadius: 999,
  borderWidth: 1,
  borderColor: P.border,
  paddingHorizontal: 18,
  paddingVertical: 8,
};
const secondaryBtnText: TextStyle = {
  color: P.ink2,
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
