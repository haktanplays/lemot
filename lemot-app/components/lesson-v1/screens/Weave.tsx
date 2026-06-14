import { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import type { WeavePayload, WeaveScreen, WeaveType } from "@/content/lessonTypes";
import { matchExpected, type MatchResult } from "./normalizeAnswer";
import { NaturalRevealView } from "./NaturalReveal";

const WEAVE_LABELS: Record<WeaveType, string> = {
  supported: "Supported Weave",
  mid: "Weave",
  context: "Context Weave",
  open: "Open Weave",
};

type WeavePiece = NonNullable<WeavePayload["suggestedPieces"]>[number];

// Deterministic, stable hint order: reverse the authored (answer) order so hint
// pieces are never shown in copy-ready sequence, while staying identical across
// renders and remounts. No randomness, so the learner experience is repeatable.
function orderHintPieces(input: WeavePiece[]): WeavePiece[] {
  return [...input].reverse();
}

const RESULT_NOTES: Record<MatchResult, { text: string; tone: "ok" | "warm" | "soft" }> = {
  exact: { text: "Correct.", tone: "ok" },
  alternative: { text: "Accepted.", tone: "warm" },
  none: { text: "Not quite. Compare with the model answer.", tone: "soft" },
};

export function Weave({
  screen,
  onContinue,
}: {
  screen: WeaveScreen;
  onContinue: () => void;
}) {
  const { payload } = screen;
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"input" | "revealed">("input");
  const [match, setMatch] = useState<MatchResult | null>(null);
  // Hint ladder: pieces stay hidden until the learner asks. This keeps Weave a
  // rebuild-the-thought task, not a copy task. 0 = hidden, 1 = pieces shown,
  // 2 = cloze shown.
  const [hintLevel, setHintLevel] = useState(0);

  const pieces = payload.suggestedPieces ?? [];
  const hintPieces = orderHintPieces(pieces);
  const hasPieces = pieces.length > 0;
  const hasCloze =
    typeof payload.hintCloze === "string" && payload.hintCloze.length > 0;

  const canCheck = text.trim().length > 0;
  const isRevealed = phase === "revealed";

  const handleCheck = () => {
    const result = matchExpected(
      text,
      payload.expectedAnswers,
      payload.acceptedAlternatives
    );
    setMatch(result);
    setPhase("revealed");
  };

  const note = match !== null ? RESULT_NOTES[match] : null;
  const noteStyle =
    note?.tone === "ok"
      ? { bg: P.gl, border: P.green, color: P.green }
      : note?.tone === "warm"
        ? { bg: P.al, border: P.amber, color: P.amber }
        : { bg: P.rl, border: P.red, color: P.red };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: P.bg }}
      contentContainerStyle={{ padding: 20 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-xs mb-2" style={{ color: P.ink3 }}>
        {WEAVE_LABELS[payload.weaveType]}
      </Text>

      <View
        className="rounded-xl border"
        style={{
          backgroundColor: P.paper,
          borderColor: P.border,
          padding: 16,
        }}
      >
        <Text className="text-sm mb-2" style={{ color: P.ink }}>
          {payload.prompt}
        </Text>
        {payload.context && (
          <Text
            className="text-sm"
            style={{
              color: P.ink2,
              fontStyle: "italic",
              lineHeight: 20,
            }}
          >
            {payload.context}
          </Text>
        )}
      </View>

      {!isRevealed && (hasPieces || hasCloze) && (
        <View className="mt-3">
          {hintLevel === 0 && (
            <Pressable onPress={() => setHintLevel(1)}>
              <Text
                className="text-xs"
                style={{ color: P.ink3, textDecorationLine: "underline" }}
              >
                Need a hint?
              </Text>
            </Pressable>
          )}

          {hintLevel >= 1 && hasPieces && (
            <View>
              <Text className="text-xs mb-2" style={{ color: P.ink3 }}>
                Pieces you already own:
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {hintPieces.map((p, i) => (
                  <View
                    key={`${p.text}-${i}`}
                    className="rounded-xl"
                    style={{
                      backgroundColor: P.rl,
                      borderWidth: 1,
                      borderColor: P.rb,
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                    }}
                  >
                    <Text className="text-xs" style={{ color: P.ink2 }}>
                      {p.text}
                    </Text>
                    {p.label && (
                      <Text
                        className="text-[10px] mt-0.5"
                        style={{ color: P.ink3 }}
                      >
                        {p.label}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}

          {hintLevel === 1 && hasCloze && (
            <Pressable className="mt-2" onPress={() => setHintLevel(2)}>
              <Text
                className="text-xs"
                style={{ color: P.ink3, textDecorationLine: "underline" }}
              >
                Need more help?
              </Text>
            </Pressable>
          )}

          {hintLevel >= 2 && hasCloze && (
            <View
              className="rounded-lg border mt-2"
              style={{
                backgroundColor: P.paper,
                borderColor: P.border,
                padding: 10,
              }}
            >
              <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
                A shape to fill in:
              </Text>
              <Text
                className="text-sm"
                style={{ color: P.ink, fontStyle: "italic" }}
              >
                {payload.hintCloze}
              </Text>
            </View>
          )}
        </View>
      )}

      <View className="mt-4">
        <Text className="text-xs mb-2" style={{ color: P.ink3 }}>
          Write it in French.
        </Text>
        <TextInput
          value={text}
          onChangeText={setText}
          editable={!isRevealed}
          multiline
          autoCapitalize="sentences"
          autoCorrect={false}
          textAlignVertical="top"
          style={{
            minHeight: 96,
            backgroundColor: P.paper,
            borderWidth: 1,
            borderColor: P.border,
            borderRadius: 12,
            padding: 12,
            color: P.ink,
            fontSize: 15,
            lineHeight: 22,
          }}
        />
      </View>

      {!isRevealed && (
        <Btn onPress={handleCheck} disabled={!canCheck}>
          <Text style={{ color: P.paper, fontSize: 15 }}>Check</Text>
        </Btn>
      )}

      {isRevealed && note && (
        <View
          className="rounded-xl border mt-4"
          style={{
            backgroundColor: noteStyle.bg,
            borderColor: noteStyle.border,
            padding: 12,
          }}
        >
          <Text className="text-sm" style={{ color: noteStyle.color }}>
            {note.text}
          </Text>
        </View>
      )}

      {isRevealed && (
        <View className="mt-3">
          <NaturalRevealView
            reveal={payload.reveal}
            mode={
              match === "exact"
                ? "exact"
                : match === "alternative"
                  ? "alternative"
                  : "no-match"
            }
          />
        </View>
      )}

      {isRevealed && (
        <Btn onPress={onContinue}>
          <Text style={{ color: P.paper, fontSize: 15 }}>Continue</Text>
        </Btn>
      )}
    </ScrollView>
  );
}
