import { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import type { WeavePayload, WeaveScreen } from "@/content/lessonTypes";
import { type MatchResult } from "./normalizeAnswer";
import {
  evaluateWeaveAnswer,
  type TypedEvaluation,
} from "@/content/lesson-v1-evidence/interactions";
import { NaturalRevealView } from "./NaturalReveal";
import {
  WEAVE_BADGE,
  WEAVE_TARGET_LABEL,
  WEAVE_HELPER,
  WEAVE_INPUT_LABEL,
  weaveTargetMeaning,
  shouldShowWeaveTargetLabel,
} from "./weaveCopy";

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
  none: { text: "Compare with the model answer.", tone: "soft" },
};

export function Weave({
  screen,
  onContinue,
  onTypedAttempt,
}: {
  screen: WeaveScreen;
  onContinue: () => void;
  /**
   * UI FACTS only (PR-06), reported once on Check. The hint rung is the rung the
   * learner ACTUALLY reached, not the rung the payload makes available, and the
   * constitutive flag reports whether the declared package was really rendered.
   * Continue reports nothing further.
   */
  onTypedAttempt?: (facts: {
    text: string;
    evaluation: TypedEvaluation;
    hintRung: 0 | 1 | 2;
    constitutiveSupportRendered: boolean;
  }) => void;
}) {
  const { payload } = screen;
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"input" | "revealed">("input");
  const [match, setMatch] = useState<MatchResult | null>(null);
  // Hint ladder: pieces stay hidden until the learner asks. This keeps Weave a
  // rebuild-the-thought task, not a copy task. 0 = hidden, 1 = pieces shown,
  // 2 = cloze shown.
  const [hintLevel, setHintLevel] = useState(0);

  const allPieces = payload.suggestedPieces ?? [];
  // Constitutive pieces are part of the TASK: visible from first render, never
  // behind "Need a hint?". They are therefore excluded from the hint ladder —
  // showing them costs no rung, and their presence permanently scopes the
  // attempt to Supported rather than counting as help the learner asked for.
  const constitutivePieces = allPieces.filter((p) => p.supportRole === "constitutive");
  const pieces = allPieces.filter((p) => p.supportRole !== "constitutive");
  const hintPieces = orderHintPieces(pieces);
  const hasPieces = pieces.length > 0;
  const hasConstitutive = constitutivePieces.length > 0;
  const hasCloze =
    typeof payload.hintCloze === "string" && payload.hintCloze.length > 0;

  const canCheck = text.trim().length > 0;
  const isRevealed = phase === "revealed";

  const handleCheck = () => {
    // ONE evaluation drives both the note below and the persisted event. Running
    // the UI matcher and the event grader separately would let the learner read
    // "Correct." while the append-only log recorded a miss.
    const evaluation = evaluateWeaveAnswer(screen, text);
    setMatch(evaluation.match);
    setPhase("revealed");
    onTypedAttempt?.({
      text,
      evaluation,
      hintRung: hintLevel as 0 | 1 | 2,
      // Declared constitutive pieces ARE rendered by this screen (below), from
      // first paint. Reporting the real render state is what lets the admission
      // resolver quarantine a payload whose required support never appeared.
      constitutiveSupportRendered: hasConstitutive,
    });
  };

  const note = match !== null ? RESULT_NOTES[match] : null;
  const noteStyle =
    note?.tone === "ok"
      ? { bg: P.gl, border: P.green, color: P.green }
      : note?.tone === "warm"
        ? { bg: P.al, border: P.amber, color: P.amber }
        : // "soft" = no exact/alternative match. Neutral (not red): the step is a
          // non-blocking compare-with-the-model, not a wrong-answer error.
          { bg: P.bg, border: P.border, color: P.ink2 };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: P.bg }}
      contentContainerStyle={{ padding: 20 }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Branded mechanic: the Weave name is visible again as a small badge.
          Neutral ink pill (premium brand tag) — intentionally NOT red/amber/green
          so it never reads as validation feedback or a warning. */}
      <View className="flex-row mb-3">
        <View
          style={{
            backgroundColor: P.ink,
            borderRadius: 999,
            paddingHorizontal: 10,
            paddingVertical: 3,
          }}
        >
          <Text
            className="text-xs"
            style={{ color: P.paper, fontWeight: "700", letterSpacing: 0.5 }}
          >
            {WEAVE_BADGE}
          </Text>
        </View>
      </View>

      <View
        className="rounded-xl border"
        style={{
          backgroundColor: P.paper,
          borderColor: P.border,
          padding: 16,
        }}
      >
        {/* Open weaves are free production: their prompt is already a directive,
            so the "Say this:" label is suppressed to avoid doubling the
            instruction. The target/directive below stays prominent either way. */}
        {shouldShowWeaveTargetLabel(payload.weaveType) && (
          <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
            {WEAVE_TARGET_LABEL}
          </Text>
        )}
        {/* Target meaning is the dominant element now: large + strong, so each
            new Weave target is hard to skim past (Round 1.2 salience fix). The
            "Write it in French:" instruction prefix is stripped for display. */}
        <Text
          style={{
            color: P.ink,
            fontSize: 20,
            fontWeight: "600",
            lineHeight: 28,
          }}
        >
          {weaveTargetMeaning(payload.prompt)}
        </Text>
        {payload.context && (
          <Text
            className="text-sm mt-2"
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

      {/* Compact, always-visible helper. The one-time "How Weave works"
          interstitial carries the fuller early explanation. */}
      <Text className="text-xs mt-2" style={{ color: P.ink3, lineHeight: 18 }}>
        {WEAVE_HELPER}
      </Text>

      {/* Constitutive support: part of the task, so it is visible from the first
          render and stays visible through the attempt. It is NOT behind the hint
          ladder and costs no rung — but it does permanently scope the attempt to
          Supported. Reuses the existing pieces copy; no new learner-facing text.
          No shipped payload declares one today (PR-07 authors those). */}
      {hasConstitutive && (
        <View className="mt-3">
          <Text className="text-xs mb-2" style={{ color: P.ink3 }}>
            Pieces you already own:
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {constitutivePieces.map((p, i) => (
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
                  <Text className="text-[10px] mt-0.5" style={{ color: P.ink3 }}>
                    {p.label}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

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

          {/* Pieces are the terminal support when there is no cloze. When an
              authored cloze exists, the second hint step collapses the pieces
              and shows the cloze alone, so only one support layer shows. */}
          {hintLevel >= 1 && hasPieces && !(hasCloze && hintLevel >= 2) && (
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
          {WEAVE_INPUT_LABEL}
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
