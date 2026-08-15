import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction, LinkAction } from "@/components/ui/actions";
import { PieceChip } from "@/components/ui/PieceChip";
import { FeedbackBand, type FeedbackTone } from "@/components/ui/FeedbackBand";
import { P, SPACE, RADIUS } from "@/constants/theme";
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

// Verdict copy is unchanged (canonical strings, pinned). The `band` field maps
// each match to a presentation-only FeedbackBand tone; the text is what the
// learner reads and what the append-only log's UI mirror shows.
const RESULT_NOTES: Record<
  MatchResult,
  { text: string; tone: "ok" | "warm" | "soft"; band: FeedbackTone }
> = {
  exact: { text: "Correct.", tone: "ok", band: "confirmed" },
  alternative: { text: "Accepted.", tone: "warm", band: "accepted" },
  none: { text: "Compare with the model.", tone: "soft", band: "compare" },
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
  // Presentation only: a warm focus accent so the working surface feels owned.
  // Does not touch TextInput behaviour, submission, or normalization.
  const [focused, setFocused] = useState(false);
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
  const showTargetLabel = shouldShowWeaveTargetLabel(payload.weaveType);
  const targetMeaning = weaveTargetMeaning(payload.prompt);

  return (
    <LessonScreenFrame
      footer={
        !isRevealed ? (
          <PrimaryAction
            label="Check"
            onPress={handleCheck}
            disabled={!canCheck}
          />
        ) : (
          <PrimaryAction label="Continue" onPress={onContinue} />
        )
      }
    >
      {/* Branded mechanic: the Weave name is visible again as a small badge.
          Neutral ink pill (premium brand tag) — intentionally NOT red/amber/green
          so it never reads as validation feedback or a warning. */}
      <View className="flex-row mb-3">
        <View
          style={{
            backgroundColor: P.ink,
            borderRadius: RADIUS.pill,
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

      {/* THE THOUGHT. The situation sits quietly above, the intent stands out
          clearly below — the two no longer share one flat card, so the learner
          scans "the scene" then "what to say" without them competing. In the
          result state the intent recedes to a quiet reference so the natural
          French becomes the strongest surface. */}
      {payload.context && !isRevealed && (
        <Text
          style={{
            color: P.ink2,
            fontStyle: "italic",
            fontSize: 14,
            lineHeight: 20,
            marginBottom: SPACE.md,
          }}
        >
          {payload.context}
        </Text>
      )}

      {isRevealed ? (
        <View style={{ marginBottom: SPACE.lg }}>
          {showTargetLabel && (
            <Text className="text-xs" style={{ color: P.ink3, marginBottom: 2 }}>
              {WEAVE_TARGET_LABEL}
            </Text>
          )}
          <Text
            style={{ color: P.ink2, fontSize: 15, lineHeight: 22 }}
          >
            {targetMeaning}
          </Text>
        </View>
      ) : (
        <View>
          {showTargetLabel && (
            <Text
              className="text-xs"
              style={{ color: P.ink3, marginBottom: SPACE.xs, letterSpacing: 0.4 }}
            >
              {WEAVE_TARGET_LABEL}
            </Text>
          )}
          {/* The intent is the hero: large, strong, hard to skim past. */}
          <Text
            style={{
              color: P.ink,
              fontSize: 22,
              fontWeight: "600",
              lineHeight: 30,
            }}
          >
            {targetMeaning}
          </Text>
        </View>
      )}

      {/* Compact, always-visible helper (input phase only). The one-time
          "How Weave works" interstitial carries the fuller early explanation. */}
      {!isRevealed && (
        <Text
          className="text-xs"
          style={{ color: P.ink3, lineHeight: 18, marginTop: SPACE.sm }}
        >
          {WEAVE_HELPER}
        </Text>
      )}

      {/* Constitutive support: part of the task, so it is visible from the first
          render and stays visible through the attempt. It is NOT behind the hint
          ladder and costs no rung — but it does permanently scope the attempt to
          Supported. Reuses the existing pieces copy; no new learner-facing text.
          The first shipped constitutive payload is PR-07's tea order. */}
      {hasConstitutive && !isRevealed && (
        <View style={{ marginTop: SPACE.lg }}>
          <Text className="text-xs" style={{ color: P.ink3, marginBottom: SPACE.sm }}>
            Pieces you can use here:
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: SPACE.sm }}>
            {constitutivePieces.map((p, i) => (
              <PieceChip key={`${p.text}-${i}`} text={p.text} label={p.label} />
            ))}
          </View>
        </View>
      )}

      {!isRevealed && (hasPieces || hasCloze) && (
        <View style={{ marginTop: SPACE.lg }}>
          {hintLevel === 0 && (
            <LinkAction
              label="Need a hint?"
              align="left"
              onPress={() => setHintLevel(1)}
            />
          )}

          {/* Pieces are the terminal support when there is no cloze. When an
              authored cloze exists, the second hint step collapses the pieces
              and shows the cloze alone, so only one support layer shows. */}
          {hintLevel >= 1 && hasPieces && !(hasCloze && hintLevel >= 2) && (
            <View>
              <Text className="text-xs" style={{ color: P.ink3, marginBottom: SPACE.sm }}>
                Pieces you can use here:
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: SPACE.sm }}>
                {hintPieces.map((p, i) => (
                  <PieceChip key={`${p.text}-${i}`} text={p.text} label={p.label} />
                ))}
              </View>
            </View>
          )}

          {hintLevel === 1 && hasCloze && (
            <View style={{ marginTop: SPACE.sm }}>
              <LinkAction
                label="Need more help?"
                align="left"
                onPress={() => setHintLevel(2)}
              />
            </View>
          )}

          {hintLevel >= 2 && hasCloze && (
            <View
              className="border"
              style={{
                backgroundColor: P.paper,
                borderColor: P.border,
                borderRadius: RADIUS.inner,
                padding: 10,
                marginTop: SPACE.sm,
              }}
            >
              <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
                A shape to fill in:
              </Text>
              <Text
                style={{ color: P.ink, fontFamily: "serif", fontStyle: "italic", fontSize: 14 }}
              >
                {payload.hintCloze}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* THE ATTEMPT — the learner's own working surface. A warm paper field
          with a soft focus accent, comfortable height, current font system; in
          the result state it stays visible read-only so the attempt keeps its
          continuity with the natural realization below. */}
      <View style={{ marginTop: SPACE.xl }}>
        <Text className="text-xs" style={{ color: P.ink3, marginBottom: SPACE.sm }}>
          {WEAVE_INPUT_LABEL}
        </Text>
        <TextInput
          value={text}
          onChangeText={setText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          editable={!isRevealed}
          multiline
          autoCapitalize="sentences"
          autoCorrect={false}
          textAlignVertical="top"
          style={{
            minHeight: isRevealed ? 0 : 108,
            backgroundColor: isRevealed ? P.bg : P.paper,
            borderWidth: 1,
            borderColor: focused && !isRevealed ? P.red + "66" : P.border,
            borderRadius: RADIUS.card,
            padding: SPACE.md,
            color: isRevealed ? P.ink2 : P.ink,
            fontSize: 16,
            lineHeight: 24,
          }}
        />
      </View>

      {isRevealed && note && (
        <View style={{ marginTop: SPACE.lg }}>
          <FeedbackBand tone={note.band} text={note.text} />
        </View>
      )}

      {isRevealed && (
        <View style={{ marginTop: SPACE.lg }}>
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

    </LessonScreenFrame>
  );
}
