import { useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import { FEATURES } from "@/config/productStage";
import { evaluateSayIt } from "@/lib/ai";
import type { SayItYourWayScreen } from "@/content/lessonTypes";
import { NaturalRevealView } from "./NaturalReveal";

type AiState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; feedback: string }
  | { status: "skipped" };

export function SayItYourWayV1({
  screen,
  onContinue,
}: {
  screen: SayItYourWayScreen;
  onContinue: () => void;
}) {
  const { payload } = screen;
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"input" | "revealed">("input");
  const [ai, setAi] = useState<AiState>({ status: "idle" });

  const canCheck = text.trim().length > 0;
  const isRevealed = phase === "revealed";
  const aiEligible =
    payload.validationMode === "ai-assisted-with-fallback" &&
    FEATURES.aiLesson === true;

  const handleCheck = () => {
    setPhase("revealed");

    if (!aiEligible) {
      setAi({ status: "skipped" });
      return;
    }

    setAi({ status: "loading" });
    const targetWords = (payload.suggestedPieces ?? []).map((p) => p.text);
    evaluateSayIt(text.trim(), payload.situation, targetWords)
      .then((feedback) => {
        setAi({ status: "done", feedback });
      })
      .catch(() => {
        setAi({ status: "skipped" });
      });
  };

  const bands = payload.answerBands;
  const hasBands =
    !!bands &&
    ((bands.minimalAcceptable?.length ?? 0) +
      (bands.good?.length ?? 0) +
      (bands.natural?.length ?? 0) >
      0);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: P.bg }}
      contentContainerStyle={{ padding: 20 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-xs mb-2" style={{ color: P.ink3 }}>
        Say It Your Way
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
          {payload.situation}
        </Text>
        <Text
          className="text-sm"
          style={{
            color: P.ink2,
            fontStyle: "italic",
            lineHeight: 20,
          }}
        >
          {payload.communicativeGoal}
        </Text>
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
          Write your answer in French.
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

      {isRevealed && (
        <View
          className="rounded-xl border mt-4"
          style={{
            backgroundColor: P.bg,
            borderColor: P.border,
            padding: 12,
          }}
        >
          <Text className="text-xs" style={{ color: P.ink3 }}>
            Your answer is saved for comparison.
          </Text>
        </View>
      )}

      {isRevealed && ai.status === "loading" && (
        <View
          className="rounded-xl border mt-3"
          style={{
            backgroundColor: P.bg,
            borderColor: P.border,
            padding: 12,
          }}
        >
          <Text className="text-xs" style={{ color: P.ink3 }}>
            Looking at your answer…
          </Text>
        </View>
      )}

      {isRevealed && ai.status === "done" && (
        <View
          className="rounded-xl border mt-3"
          style={{
            backgroundColor: P.paper,
            borderColor: P.border,
            padding: 12,
          }}
        >
          <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
            A note on your answer
          </Text>
          <Text
            className="text-sm"
            style={{ color: P.ink2, lineHeight: 20 }}
          >
            {ai.feedback}
          </Text>
        </View>
      )}

      {isRevealed && !payload.modelAnswer && (
        <View
          className="rounded-xl border mt-3"
          style={{
            backgroundColor: P.bg,
            borderColor: P.border,
            padding: 12,
          }}
        >
          <Text className="text-xs" style={{ color: P.ink3 }}>
            Compare your answer with the suggested version when available.
          </Text>
        </View>
      )}

      {isRevealed && (
        <View className="mt-3">
          <NaturalRevealView
            reveal={
              payload.modelAnswer && !payload.reveal.modelAnswer
                ? { ...payload.reveal, modelAnswer: payload.modelAnswer }
                : payload.reveal
            }
          />
        </View>
      )}

      {isRevealed && hasBands && bands && (
        <View
          className="rounded-xl border mt-3"
          style={{
            backgroundColor: P.bg,
            borderColor: P.border,
            padding: 12,
          }}
        >
          <Text className="text-xs mb-2" style={{ color: P.ink3 }}>
            You may also see
          </Text>
          {bands.minimalAcceptable && bands.minimalAcceptable.length > 0 && (
            <BandRow label="minimal acceptable" items={bands.minimalAcceptable} />
          )}
          {bands.good && bands.good.length > 0 && (
            <BandRow label="good" items={bands.good} />
          )}
          {bands.natural && bands.natural.length > 0 && (
            <BandRow label="natural" items={bands.natural} />
          )}
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

function BandRow({ label, items }: { label: string; items: string[] }) {
  return (
    <View style={{ marginTop: 4 }}>
      <Text className="text-xs" style={{ color: P.ink3 }}>
        {label}
      </Text>
      {items.map((it, i) => (
        <Text
          key={`${label}-${i}`}
          className="text-sm"
          style={{
            color: P.ink2,
            fontStyle: "italic",
            marginTop: 2,
          }}
        >
          {it}
        </Text>
      ))}
    </View>
  );
}
