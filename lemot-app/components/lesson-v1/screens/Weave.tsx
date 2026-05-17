import { useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import type { WeaveScreen, WeaveType } from "@/content/lessonTypes";
import { matchExpected, type MatchResult } from "./normalizeAnswer";
import { NaturalRevealView } from "./NaturalReveal";

const WEAVE_LABELS: Record<WeaveType, string> = {
  supported: "Supported Weave",
  mid: "Weave",
  context: "Context Weave",
  open: "Open Weave",
};

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

      {payload.suggestedPieces && payload.suggestedPieces.length > 0 && (
        <View className="mt-3">
          <Text className="text-xs mb-2" style={{ color: P.ink3 }}>
            Use these pieces if helpful.
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {payload.suggestedPieces.map((p, i) => (
              <View
                key={`${p.text}-${i}`}
                className="rounded-full"
                style={{
                  backgroundColor: P.rl,
                  borderWidth: 1,
                  borderColor: P.rb,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}
              >
                <Text className="text-xs" style={{ color: P.ink2 }}>
                  {p.text}
                </Text>
              </View>
            ))}
          </View>
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
