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
  // Flow: input -> confirm ("You wrote: …") -> revealed (Natural Reveal). The
  // confirm step lets the learner revise or commit before comparing. It never
  // grades, never blocks (beyond empty input), and never shows the answer early.
  const [phase, setPhase] = useState<"input" | "confirm" | "revealed">("input");
  const [ai, setAi] = useState<AiState>({ status: "idle" });
  // Support, not assembly: suggested pieces stay hidden until the learner opts in
  // via "Need an idea?", so the initial screen does not read as guided assembly.
  const [showPieces, setShowPieces] = useState(false);

  const canCheck = text.trim().length > 0;
  const isInput = phase === "input";
  const isConfirm = phase === "confirm";
  const isRevealed = phase === "revealed";
  const aiEligible =
    payload.validationMode === "ai-assisted-with-fallback" &&
    FEATURES.aiLesson === true;

  // Check moves to the confirm step only — no grading, no reveal yet.
  const handleCheck = () => {
    if (!canCheck) return;
    setPhase("confirm");
  };

  // Try again returns to editing; the typed text is preserved (state untouched).
  const handleTryAgain = () => {
    setPhase("input");
  };

  // Keep and compare opens Natural Reveal, running the AI note only if eligible
  // (off in dev-apk). This is the original handleCheck body, deferred to here.
  const handleKeepAndCompare = () => {
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

      {payload.suggestedPieces &&
        payload.suggestedPieces.length > 0 &&
        !showPieces &&
        isInput && (
          <Text
            onPress={() => setShowPieces(true)}
            className="text-xs mt-3"
            style={{ color: P.ink3, textDecorationLine: "underline" }}
          >
            Need an idea?
          </Text>
        )}

      {payload.suggestedPieces &&
        payload.suggestedPieces.length > 0 &&
        showPieces && (
          <View className="mt-3">
            <Text className="text-xs mb-2" style={{ color: P.ink3 }}>
              Ideas you can use.
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
          editable={isInput}
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

      {isInput && (
        <Btn onPress={handleCheck} disabled={!canCheck}>
          <Text style={{ color: P.paper, fontSize: 15 }}>Check</Text>
        </Btn>
      )}

      {isConfirm && (
        <View className="mt-4">
          <View
            className="rounded-xl border"
            style={{
              backgroundColor: P.paper,
              borderColor: P.border,
              padding: 16,
            }}
          >
            <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
              You wrote:
            </Text>
            <Text
              className="text-sm mb-3"
              style={{ color: P.ink, lineHeight: 22 }}
            >
              {text.trim()}
            </Text>
            <Text className="text-sm" style={{ color: P.ink2 }}>
              Want to try once more, or keep this and compare?
            </Text>
          </View>
          <Btn
            color={P.paper}
            onPress={handleTryAgain}
            style={{ borderWidth: 1, borderColor: P.border }}
          >
            <Text style={{ color: P.ink, fontSize: 15, fontWeight: "600" }}>
              Try again
            </Text>
          </Btn>
          <Btn onPress={handleKeepAndCompare}>
            <Text style={{ color: P.paper, fontSize: 15, fontWeight: "600" }}>
              Keep and compare
            </Text>
          </Btn>
        </View>
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
