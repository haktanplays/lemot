import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import type { FillWithTrapsScreen } from "@/content/lessonTypes";
import { AnswerReveal } from "./AnswerReveal";

export function FillWithTraps({
  screen,
  onContinue,
}: {
  screen: FillWithTrapsScreen;
  onContinue: () => void;
}) {
  const { payload } = screen;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected =
    selectedId !== null
      ? payload.options.find((o) => o.id === selectedId)
      : undefined;
  const isCorrect =
    selected !== undefined && payload.answer.includes(selected.id);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: P.bg }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text className="text-sm mb-3" style={{ color: P.ink2 }}>
        {payload.prompt}
      </Text>

      <View
        className="rounded-xl border"
        style={{
          backgroundColor: P.paper,
          borderColor: P.border,
          padding: 16,
        }}
      >
        <Text
          className="text-base"
          style={{
            color: P.ink,
            fontFamily: "serif",
            fontStyle: "italic",
            lineHeight: 26,
          }}
        >
          {payload.sentenceBefore ?? ""}
          <Text
            style={{
              backgroundColor: P.bg,
              borderBottomWidth: 1,
              borderColor: P.ink3,
              color: P.ink3,
            }}
          >
            {"  ____  "}
          </Text>
          {payload.sentenceAfter ?? ""}
        </Text>
      </View>

      <View className="mt-4">
        {payload.options.map((option) => {
          const isThisSelected = option.id === selectedId;
          const isThisCorrect = payload.answer.includes(option.id);
          const showCorrect =
            selected !== undefined && isThisSelected && isThisCorrect;
          const showIncorrect =
            selected !== undefined && isThisSelected && !isThisCorrect;

          const bg = showCorrect
            ? P.gl
            : showIncorrect
              ? P.rl
              : P.paper;
          const border = showCorrect
            ? P.green
            : showIncorrect
              ? P.red
              : P.border;
          const textColor = P.ink;

          return (
            <Pressable
              key={option.id}
              disabled={selected !== undefined}
              onPress={() => setSelectedId(option.id)}
              className="rounded-xl border mt-2"
              style={{
                backgroundColor: bg,
                borderColor: border,
                padding: 14,
                opacity: selected !== undefined && !isThisSelected ? 0.6 : 1,
              }}
            >
              <Text style={{ color: textColor, fontSize: 15 }}>
                {option.text}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {selected !== undefined && (
        <AnswerReveal
          reveal={payload.reveal}
          variant={isCorrect ? "correct" : "incorrect"}
        />
      )}

      {selected !== undefined && !isCorrect && selected.trapReason && (
        <View
          className="rounded-xl border mt-2"
          style={{
            backgroundColor: P.bg,
            borderColor: P.border,
            padding: 12,
          }}
        >
          <Text className="text-xs" style={{ color: P.ink3 }}>
            {selected.trapReason}
          </Text>
        </View>
      )}

      {selected !== undefined && (
        <Btn onPress={onContinue}>
          <Text style={{ color: P.paper, fontSize: 15 }}>Continue</Text>
        </Btn>
      )}
    </ScrollView>
  );
}
