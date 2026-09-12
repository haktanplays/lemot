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
import type { AnswerVerdict } from "@/content/lesson-v1-evidence/answerComponents";
import { Kicker } from "@/components/ui/editorial";
import {
  WEAVE_BADGE,
  WEAVE_TARGET_LABEL,
  WEAVE_HELPER,
  WEAVE_INPUT_LABEL,
  weaveTargetMeaning,
  shouldShowWeaveTargetLabel,
} from "./weaveCopy";
import { learnerVerdict } from "./verdictCopy";

type WeavePiece = NonNullable<WeavePayload["suggestedPieces"]>[number];

/**
 * Small counts read better as words in a calm sentence. Beyond five, the digit
 * is clearer than the word, and no line in the corpus gets close.
 */
function countWord(n: number): string {
  return ["zero", "one", "two", "three", "four", "five"][n] ?? String(n);
}

/** Same word, starting a line. */
function countWordCapitalized(n: number): string {
  const w = countWord(n);
  return w.charAt(0).toUpperCase() + w.slice(1);
}

// Deterministic, stable hint order: reverse the authored (answer) order so hint
// pieces are never shown in copy-ready sequence, while staying identical across
// renders and remounts. No randomness, so the learner experience is repeatable.
function orderHintPieces(input: WeavePiece[]): WeavePiece[] {
  return [...input].reverse();
}

// Verdict copy is unchanged (canonical strings, pinned). The `band` field maps
// each match to a presentation-only FeedbackBand tone; the text is what the
// learner reads and what the append-only log's UI mirror shows.
// Keyed by VERDICT, not by match, because "wrong word order" and "Aaa" are the
// same MatchResult and must never read the same to the learner. Only `full`
// carries semantic approval; `partial` names what was found without claiming
// the answer landed; `mismatch` and `unknown` assert nothing at all.
const VERDICT_NOTES: Record<
  AnswerVerdict,
  { text: string; tone: "ok" | "warm" | "soft"; band: FeedbackTone }
> = {
  full: { text: "Correct.", tone: "ok", band: "confirmed" },
  partial: { text: "Part of it is there. Compare with the model.", tone: "warm", band: "compare" },
  mismatch: { text: "Compare with the model.", tone: "soft", band: "compare" },
  unknown: { text: "Compare with the model.", tone: "soft", band: "compare" },
  empty: { text: "Compare with the model.", tone: "soft", band: "compare" },
};

/**
 * An accepted answer is told apart by WHAT KIND of acceptance it was.
 *
 * "Accepted." used to cover both, and it is grader language for the one and
 * inaccurate for the other: a learner who writes the model with a comma where
 * it has a full stop has not had something tolerated, they have written the
 * sentence. `learnerVerdict` decides, and the band stays `accepted` either way
 * because the append-only log's presentation mapping is not what changed.
 */

export function Weave({
  screen,
  onContinue,
  onTypedAttempt,
  derivedAlternatives,
  helper = WEAVE_HELPER,
}: {
  screen: WeaveScreen;
  onContinue: () => void;
  /**
   * Overrides the standard helper line. Practice uses it for dictation, where
   * "leave the rest in English" describes a task the learner is not doing.
   */
  helper?: string;
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
    derivedAlternatives?: readonly string[];
  }) => void;
  /**
   * More French the grader should accept here, resolved OUTSIDE this screen.
   *
   * A surface fact and nothing more: a list of strings, indistinguishable from
   * the ones the author wrote. The screen cannot tell which is which, does not
   * know what an intent is, and cannot ask what the learner has reached — the
   * resolution is a question about the learner, so it happens at the wiring
   * layer, the same boundary the recap's Mon Lexique bridge respects.
   */
  derivedAlternatives?: readonly string[];
}) {
  const { payload } = screen;
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"input" | "revealed">("input");
  const [match, setMatch] = useState<MatchResult | null>(null);
  const [verdict, setVerdict] = useState<AnswerVerdict | null>(null);
  // Whether the system can positively vouch for the meaning. Decides which
  // notes may claim the answer landed.
  const [evidenced, setEvidenced] = useState(false);
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
  // A contrast piece is shown to be compared against, never offered as help.
  // The ladder reverses what it is given, so an unmarked distractor can be the
  // FIRST thing a learner sees after asking for a hint — which is exactly how
  // "une question" arrived on a screen whose answer is "J'ai une idée."
  const pieces = allPieces.filter(
    (p) => p.supportRole !== "constitutive" && p.contrast !== true,
  );
  const hintPieces = orderHintPieces(pieces);
  // Rung 2 gives about half, never fewer than one and never the whole set when
  // more than one exists; rung 3 gives everything.
  const firstRungCount = Math.max(1, Math.floor(hintPieces.length / 2));
  const shownHintPieces = hintLevel >= 3 ? hintPieces : hintPieces.slice(0, firstRungCount);
  const hasPieces = pieces.length > 0;
  const hasConstitutive = constitutivePieces.length > 0;
  const hasCloze =
    typeof payload.hintCloze === "string" && payload.hintCloze.length > 0;

  /**
   * THE LADDER, and why rung 1 exists.
   *
   * The first tap used to hand over French. For a two-piece answer that is most
   * of the answer, so the smallest help available was already large, and a
   * learner who only wanted a nudge had to take a shove.
   *
   * Rung 1 is now a SHAPE cue and leaks nothing: how many pieces the line comes
   * apart into, and that the learner already owns them. It is deliberately not
   * built from the piece LABELS, which look like a safe hint and are not --
   * many of them are English glosses of the French ("I'm going", "home"), so a
   * label rung would translate the answer while pretending to be a nudge.
   *
   *   1  how many pieces, and that they are yours
   *   2  some of the pieces, in French
   *   3  all of them, or the authored shape to fill in
   */
  const topRung = hasCloze ? 3 : hintPieces.length > 1 ? 3 : hasPieces ? 2 : 1;
  /**
   * What the EVIDENCE layer records, which is a different question: how much
   * support was on screen when the learner checked. 0 none, 1 partial, 2 all
   * there was. The envelope allows exactly those three and says so ("there is
   * no copy-ready rung"), so adding a UI rung must not widen it.
   */
  const reportedRung: 0 | 1 | 2 =
    hintLevel === 0 ? 0 : hintLevel >= topRung ? 2 : 1;

  const canCheck = text.trim().length > 0;
  const isRevealed = phase === "revealed";

  const handleCheck = () => {
    // ONE evaluation drives both the note below and the persisted event. Running
    // the UI matcher and the event grader separately would let the learner read
    // "Correct." while the append-only log recorded a miss.
    const evaluation = evaluateWeaveAnswer(screen, text, derivedAlternatives);
    setMatch(evaluation.match);
    setVerdict(evaluation.evidence.verdict);
    setEvidenced(evaluation.evidence.meaningEvidenced);
    setPhase("revealed");
    onTypedAttempt?.({
      text,
      evaluation,
      // Reported back so the recorded grade is computed against exactly what
      // was graded here. The event re-evaluates; this is what keeps the two
      // evaluations one evaluation.
      derivedAlternatives,
      hintRung: reportedRung,
      // Declared constitutive pieces ARE rendered by this screen (below), from
      // first paint. Reporting the real render state is what lets the admission
      // resolver quarantine a payload whose required support never appeared.
      constitutiveSupportRendered: hasConstitutive,
    });
  };

  const spoken = learnerVerdict(
    match ?? "none",
    text,
    payload.reveal.modelAnswer ?? payload.expectedAnswers[0] ?? null,
  );
  // A writing slip rides on an ACCEPTED answer, exact or alternative alike, so
  // the band it reads under is the accepted one either way. Without widening
  // past `alternative` here, a learner who wrote the model with one lexical
  // accent missing would be told "Correct." and never see the note.
  const note =
    (match === "alternative" || match === "exact") && spoken !== null && spoken !== undefined
      ? { text: spoken.text, tone: spoken.tone, band: "accepted" as FeedbackTone }
      : verdict !== null
        ? VERDICT_NOTES[verdict]
        : null;
  const showTargetLabel = shouldShowWeaveTargetLabel(payload.weaveType, payload.prompt);
  const targetMeaning = weaveTargetMeaning(payload.prompt);

  return (
    <LessonScreenFrame
      /*
        While the learner types, the ask stays in view: the one line that says
        what to produce, and nothing else — never the helper, which may scroll
        away without cost. The Weave badge used to ride here too, which put a
        second identical ink pill on screen beside the body's, and spent width
        on a name the learner already has on the strip where width is scarcest.
        Suppressed once revealed: the model is on screen by then and the anchor
        would only crowd it.
      */
      taskAnchor={
        !isRevealed ? (
          <Text
            numberOfLines={2}
            style={{ color: P.ink, fontSize: 14, lineHeight: 20 }}
          >
            {targetMeaning}
          </Text>
        ) : undefined
      }
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
            <Kicker text={WEAVE_TARGET_LABEL} gap="sm" />
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
          {helper}
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
              and shows the cloze alone, so only one support layer shows.

              The first rung deliberately shows only PART of the set. Handing
              over every piece of a two-piece answer is handing over the answer,
              which made the first tap the last one and left the ladder with a
              rung nobody needed. A learner who wants the rest asks again. */}
          {/* RUNG 1: the shape, and nothing else. */}
          {hintLevel === 1 && (
            <View>
              <Text className="text-xs" style={{ color: P.ink3 }}>
                {hintPieces.length > 1
                  ? `This one comes apart into ${countWord(hintPieces.length)} pieces, and you already own them.`
                  : "This one is a single piece you already own."}
              </Text>
              {topRung > 1 && (
                <View style={{ marginTop: SPACE.sm }}>
                  <LinkAction
                    label="Show me a piece"
                    align="left"
                    onPress={() => setHintLevel(2)}
                  />
                </View>
              )}
            </View>
          )}

          {hintLevel >= 2 && hasPieces && !(hasCloze && hintLevel >= 3) && (
            <View>
              <Text className="text-xs" style={{ color: P.ink3, marginBottom: SPACE.sm }}>
                {shownHintPieces.length < hintPieces.length
                  ? // Not "a piece to start with": the order above is
                    // deliberately NOT the answer's order, so the first chip
                    // is usually the sentence's tail. Promising a starting
                    // point and handing over the ending is a small lie the
                    // learner notices immediately.
                    `${countWordCapitalized(shownHintPieces.length)} of the pieces you need:`
                  : "Pieces you can use here:"}
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: SPACE.sm }}>
                {shownHintPieces.map((p, i) => (
                  <PieceChip key={`${p.text}-${i}`} text={p.text} label={p.label} />
                ))}
              </View>
              {shownHintPieces.length < hintPieces.length && (
                <View style={{ marginTop: SPACE.sm }}>
                  <LinkAction
                    label="Show the rest"
                    align="left"
                    onPress={() => setHintLevel(3)}
                  />
                </View>
              )}
            </View>
          )}

          {hintLevel === 2 && hasCloze && (
            <View style={{ marginTop: SPACE.sm }}>
              <LinkAction
                label="Need more help?"
                align="left"
                onPress={() => setHintLevel(3)}
              />
            </View>
          )}

          {hintLevel >= 3 && hasCloze && (
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
                  : verdict === "partial"
                    ? evidenced
                      ? "understood"
                      : "partial"
                    : "mismatch"
            }
          />
        </View>
      )}

    </LessonScreenFrame>
  );
}
