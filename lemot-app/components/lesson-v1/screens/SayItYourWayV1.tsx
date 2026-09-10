import { useRef, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction, QuietAction, LinkAction } from "@/components/ui/actions";
import { PieceChip } from "@/components/ui/PieceChip";
import { SceneCard } from "@/components/ui/SceneCard";
import { P, RADIUS, SPACE } from "@/constants/theme";
import { FEATURES } from "@/config/productStage";
import { evaluateSayIt } from "@/lib/ai";
import type { SayItYourWayScreen } from "@/content/lessonTypes";
import { NaturalRevealView } from "./NaturalReveal";
import { componentEvidence } from "@/content/lesson-v1-evidence/answerComponents";

type AiState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; feedback: string }
  | { status: "skipped" };

export function SayItYourWayV1({
  screen,
  onContinue,
  onOpenAttempt,
}: {
  screen: SayItYourWayScreen;
  onContinue: () => void;
  /**
   * UI FACTS only (PR-06), reported once on "Keep and compare" — the moment the
   * learner commits. Check (which only opens the confirm step), Try again, text
   * edits and Continue all report nothing: none of them is a commitment, and an
   * event for each would turn ordinary revision into a stream of attempts.
   *
   * AI feedback is deliberately absent from these facts. It may explain
   * afterwards; it never becomes evidence.
   */
  onOpenAttempt?: (facts: {
    text: string;
    ideaPiecesShown: boolean;
    revisionCount: number;
    modelAnswer: string | null;
  }) => void;
}) {
  const { payload } = screen;
  const [text, setText] = useState("");
  // How many times the learner went back to edit before committing. Counted, not
  // judged: revising before comparing is ordinary writing, not a retry penalty.
  const revisions = useRef(0);
  const reported = useRef(false);
  // Flow: input -> confirm ("You wrote: …") -> revealed (Natural Reveal). The
  // confirm step lets the learner revise or commit before comparing. It never
  // grades, never blocks (beyond empty input), and never shows the answer early.
  const [phase, setPhase] = useState<"input" | "confirm" | "revealed">("input");
  const [ai, setAi] = useState<AiState>({ status: "idle" });
  // Presentation only: a warm focus accent so the expression surface feels
  // owned, matching the working surface in Weave. Touches no input behaviour.
  const [focused, setFocused] = useState(false);
  // Support, not assembly: suggested pieces stay hidden until the learner opts in
  // via "Need a hint?", so the initial screen does not read as guided assembly.
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
  // Emits nothing: the learner has not committed to anything yet.
  const handleTryAgain = () => {
    revisions.current += 1;
    setPhase("input");
  };

  // Keep and compare opens Natural Reveal, running the AI note only if eligible
  // (off in dev-apk). This is the original handleCheck body, deferred to here.
  const handleKeepAndCompare = () => {
    if (!reported.current) {
      reported.current = true;
      onOpenAttempt?.({
        text: text.trim(),
        ideaPiecesShown: showPieces,
        revisionCount: revisions.current,
        modelAnswer: payload.modelAnswer ?? payload.reveal.modelAnswer ?? null,
      });
    }
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
    <LessonScreenFrame
      footer={
        isInput ? (
          <PrimaryAction
            label="Check"
            onPress={handleCheck}
            disabled={!canCheck}
          />
        ) : isConfirm ? (
          <View>
            <QuietAction label="Try again" onPress={handleTryAgain} />
            <View style={{ height: 8 }} />
            <PrimaryAction
              label="Keep and compare"
              onPress={handleKeepAndCompare}
            />
          </View>
        ) : (
          <PrimaryAction label="Continue" onPress={onContinue} />
        )
      }
    >
      <Text
        style={{
          color: P.ink3,
          fontSize: 12,
          letterSpacing: 0.4,
          marginBottom: SPACE.md,
        }}
      >
        Say It Your Way
      </Text>

      {/* SCENE. The situation used to share one flat card with the goal, which
          made the moment and the task read as a single block of instructions.
          It is now a staged scene the learner steps into, quiet and editorial,
          and it steps aside once the comparison is on screen. */}
      {!isRevealed && <SceneCard text={payload.situation} />}

      {/* EXPRESSION. What do I want to say? This is the hero of the input
          state: it was previously the smallest, faintest text on the screen.
          In the result state it recedes to a quiet reference so the natural
          French below becomes the strongest surface. */}
      {isRevealed ? (
        <Text
          style={{
            color: P.ink2,
            fontSize: 15,
            lineHeight: 22,
          }}
        >
          {payload.communicativeGoal}
        </Text>
      ) : (
        <Text
          style={{
            color: P.ink,
            fontSize: 20,
            fontWeight: "600",
            lineHeight: 28,
            marginTop: SPACE.lg,
          }}
        >
          {payload.communicativeGoal}
        </Text>
      )}

      {payload.suggestedPieces &&
        payload.suggestedPieces.length > 0 &&
        !showPieces &&
        isInput && (
          <View style={{ marginTop: SPACE.md }}>
            <LinkAction
              label="Need a hint?"
              align="left"
              onPress={() => setShowPieces(true)}
            />
          </View>
        )}

      {/* Support the learner asked for. Same PieceChip as Weave: these are the
          same kind of thing, small pieces of French within reach. The old
          red-tinted pills read as validation colour on a screen that grades
          nothing. */}
      {payload.suggestedPieces &&
        payload.suggestedPieces.length > 0 &&
        showPieces &&
        !isRevealed && (
          <View style={{ marginTop: SPACE.lg }}>
            <Text
              style={{ color: P.ink3, fontSize: 12, marginBottom: SPACE.sm }}
            >
              Ideas you can use.
            </Text>
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", gap: SPACE.sm }}
            >
              {payload.suggestedPieces.map((p, i) => (
                <PieceChip key={`${p.text}-${i}`} text={p.text} />
              ))}
            </View>
          </View>
        )}

      {/* THE EXPRESSION SURFACE. Say-It is free production, so it gets more
          room and less scaffolding than Weave: a taller field, no piece rail,
          no cloze ladder. Once the learner commits it becomes the words they
          kept, held read-only and carried into the comparison rather than
          re-printed underneath it. */}
      <View style={{ marginTop: SPACE.xl }}>
        <Text style={{ color: P.ink3, fontSize: 12, marginBottom: SPACE.sm }}>
          {isInput ? "Write your answer in French." : "You wrote:"}
        </Text>
        <TextInput
          value={text}
          onChangeText={setText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          editable={isInput}
          multiline
          autoCapitalize="sentences"
          autoCorrect={false}
          textAlignVertical="top"
          style={{
            minHeight: isInput ? 120 : 0,
            backgroundColor: isInput ? P.paper : P.bg,
            borderWidth: 1,
            borderColor: focused && isInput ? P.red + "66" : P.border,
            borderRadius: RADIUS.card,
            padding: SPACE.md,
            color: isInput ? P.ink : P.ink2,
            fontSize: 16,
            lineHeight: 24,
          }}
        />
      </View>

      {/* CONFIRM. Writing is done, comparing has not started. One quiet
          question, no surface of its own: this step must not read as handing
          work to a judge. */}
      {isConfirm && (
        <Text
          style={{
            color: P.ink2,
            fontSize: 14,
            lineHeight: 21,
            marginTop: SPACE.lg,
          }}
        >
          Want to try once more, or keep this and compare?
        </Text>
      )}

      {isRevealed && (
        <Text style={{ color: P.ink3, fontSize: 12, marginTop: SPACE.sm }}>
          Your answer is saved for comparison.
        </Text>
      )}

      {isRevealed && ai.status === "loading" && (
        <Text style={{ color: P.ink3, fontSize: 12, marginTop: SPACE.lg }}>
          Looking at your answer…
        </Text>
      )}

      {isRevealed && ai.status === "done" && (
        <View style={{ marginTop: SPACE.lg }}>
          <Text style={{ color: P.ink3, fontSize: 12, marginBottom: SPACE.xs }}>
            A note on your answer
          </Text>
          <Text style={{ color: P.ink2, fontSize: 14, lineHeight: 21 }}>
            {ai.feedback}
          </Text>
        </View>
      )}

      {isRevealed && !payload.modelAnswer && (
        <Text style={{ color: P.ink3, fontSize: 12, marginTop: SPACE.lg }}>
          Compare your answer with the suggested version when available.
        </Text>
      )}

      {isRevealed && (
        <View style={{ marginTop: SPACE.xl }}>
          <NaturalRevealView
            reveal={
              payload.modelAnswer && !payload.reveal.modelAnswer
                ? { ...payload.reveal, modelAnswer: payload.modelAnswer }
                : payload.reveal
            }
            /*
              Say It is free production and grades nothing, but the reveal's
              notes still make claims about the attempt. Default `general` mode
              printed every authored note — including "your meaning lands" —
              whatever the learner wrote. The same component check the graded
              path uses decides here too: notes that assert understanding are
              shown only when the pieces are actually present.
            */
            mode={(() => {
              const e = componentEvidence(
                text,
                [payload.modelAnswer ?? payload.reveal.modelAnswer ?? ""].filter(Boolean),
                false,
              );
              if (e.verdict !== "partial") return "mismatch";
              return e.meaningEvidenced ? "understood" : "partial";
            })()}
          />
        </View>
      )}

      {isRevealed && hasBands && bands && (
        <View style={{ marginTop: SPACE.lg }}>
          <Text style={{ color: P.ink3, fontSize: 12, marginBottom: SPACE.xs }}>
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

    </LessonScreenFrame>
  );
}

function BandRow({ label, items }: { label: string; items: string[] }) {
  return (
    <View style={{ marginTop: SPACE.sm }}>
      <Text style={{ color: P.ink3, fontSize: 12 }}>{label}</Text>
      {items.map((it, i) => (
        <Text
          key={`${label}-${i}`}
          style={{
            color: P.ink2,
            fontFamily: "serif",
            fontStyle: "italic",
            fontSize: 14,
            lineHeight: 21,
            marginTop: 2,
          }}
        >
          {it}
        </Text>
      ))}
    </View>
  );
}
