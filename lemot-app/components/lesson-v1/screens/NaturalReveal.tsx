import type { ReactNode } from "react";
import { View, Text, Pressable } from "react-native";
import { Volume2 } from "lucide-react-native";
import { useSpeech } from "@/hooks/useSpeech";
import { PieceChip } from "@/components/ui/PieceChip";
import { showcasePieces } from "@/content/lessons/showcasePieces";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction } from "@/components/ui/actions";
import { P, RADIUS, SPACE, frenchSerif } from "@/constants/theme";
import type {
  NaturalRevealPayload,
  NaturalRevealScreen,
} from "@/content/lessonTypes";
import {
  alternativeFrench,
  alternativeLabel,
} from "@/content/lessons/naturalAlternatives";

const NOTICE_KEYS = [
  "ifCorrectButFlat",
  "ifUnderstandableButWrong",
  "ifWrongStructure",
  "ifTooDirect",
  "ifMissingTargetPiece",
  "ifBetterThanExpected",
] as const;

/**
 * `partial` and `mismatch` replace what used to be one `no-match` branch.
 *
 * That branch rendered `ifUnderstandableButWrong` — a note that asserts the
 * learner's meaning came through — for every non-empty answer that failed to
 * match, including a keyboard mash. Understanding is now a checked fact, and
 * only `partial` is allowed to claim it. `no-match` is kept as the honest,
 * assert-nothing mode.
 */
export type NaturalRevealMode =
  | "general"
  | "exact"
  | "alternative"
  | "understood"
  | "partial"
  | "mismatch"
  | "no-match";

export function NaturalRevealView({
  reveal,
  mode = "general",
}: {
  reveal: NaturalRevealPayload;
  mode?: NaturalRevealMode;
}) {
  const { say } = useSpeech();
  const alternatives = reveal.naturalAlternatives ?? [];
  // Canonical, or nothing. Never split on whitespace.
  const modelPieces = reveal.modelAnswer ? showcasePieces(reveal.modelAnswer) : [];

  let notices: string[];
  let showIfCorrect: boolean;
  let showCompareFallback: boolean;

  switch (mode) {
    case "exact":
      notices = [];
      showIfCorrect = !!reveal.ifCorrect;
      showCompareFallback = false;
      break;
    case "alternative":
      notices = reveal.ifCorrectButFlat ? [reveal.ifCorrectButFlat] : [];
      showIfCorrect = false;
      showCompareFallback = false;
      break;
    case "understood":
      // EVERY component of the model is present and the whole still did not
      // match -- word order, an extra word, a missing apostrophe. Only here is
      // "your meaning lands" a true statement about the attempt.
      notices = reveal.ifUnderstandableButWrong
        ? [reveal.ifUnderstandableButWrong]
        : [];
      showIfCorrect = false;
      showCompareFallback = !reveal.modelAnswer;
      break;
    case "partial":
      // SOME components are present and some are missing. The verdict line
      // already says "part of it is there"; printing a note that says the
      // meaning landed would contradict it on the same screen, which is what
      // the founder saw on "Say you're going home, then say goodbye" answered
      // with the destination and no goodbye.
      notices = [];
      showIfCorrect = false;
      showCompareFallback = !reveal.modelAnswer;
      break;
    case "mismatch":
    case "no-match":
      // Nothing about the attempt evidences the meaning. Show the model and say
      // nothing about what the learner did or did not convey.
      notices = [];
      showIfCorrect = false;
      showCompareFallback = !reveal.modelAnswer;
      break;
    case "general":
    default:
      // Authoring/preview only: no attempt exists, so notes that make a claim
      // ABOUT an attempt are excluded here too.
      notices = NOTICE_KEYS.filter((k) => k !== "ifUnderstandableButWrong")
        .map((k) => reveal[k])
        .filter(
        (v): v is string => typeof v === "string" && v.length > 0
      );
      showIfCorrect = !!reveal.ifCorrect;
      showCompareFallback = false;
      break;
  }

  // Everything after the payoff is a quiet note. Rendering them tells us whether
  // the hairline that separates payoff from commentary has anything to separate.
  const hasNotes =
    showCompareFallback ||
    (showIfCorrect && !!reveal.ifCorrect) ||
    notices.length > 0 ||
    alternatives.length > 0 ||
    !!reveal.explanation;

  return (
    <View>
      {/* PRIMARY. The natural French is the payoff, so it is the one lifted
          surface here and the largest text on the screen. Editorial and
          confident, never an answer key: no verdict colour, no checkmark, no
          "correct answer" label. */}
      {reveal.modelAnswer && (
        <View
          style={{
            backgroundColor: P.paper,
            borderWidth: 1,
            borderColor: P.border,
            borderRadius: RADIUS.card,
            paddingHorizontal: SPACE.lg,
            paddingVertical: SPACE.lg,
          }}
        >
          <Text
            style={{
              color: P.ink3,
              fontSize: 12,
              lineHeight: 16,
              letterSpacing: 0.4,
              marginBottom: SPACE.sm,
            }}
          >
            A natural version
          </Text>
          <View style={{ flexDirection: "row", alignItems: "flex-start", gap: SPACE.sm }}>
            <Text
              style={{
                flex: 1,
                color: P.ink,
                ...frenchSerif(19),
              }}
              // French breaks at spaces. Android's default high-quality strategy
              // hyphenates and reflows to balance lines, which on a short italic
              // French sentence produces ragged breaks mid-phrase; the model
              // answer is the most-read line on the screen and should break where
              // the sentence does.
              textBreakStrategy="simple"
            >
              {reveal.modelAnswer}
            </Text>
            {/* THE MODEL IS SOMETHING TO HEAR, not only to read.
                It is the one line on the screen that carries pronunciation,
                rhythm, linking and the shape of a whole utterance, and until
                now the learner could only look at it.

                It plays EXACTLY the visible string, whole. A multi-sentence
                model is one natural sequence, not a first sentence with the
                rest dropped, and nothing hidden or older is substituted.

                Present on a correct answer too. The value is not correction. */}
            <Pressable
              onPress={() => say(reveal.modelAnswer as string)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`Listen to ${reveal.modelAnswer}`}
              style={{ paddingTop: 4 }}
            >
              <Volume2 size={18} color={P.ink2} />
            </Pressable>
          </View>

          {/* WHAT THE MODEL IS MADE OF, from the canonical segmentation and
              from nowhere else.

              The deferred half of the reveal. A learner who has just read
              "Je ne comprends pas. Vous pouvez répéter ?" can see that it
              worked; what they cannot see is that it is three pieces they
              already own, two of which they will need again tomorrow in a
              different order. The chips say so.

              NOTHING IS INVENTED. `showcasePieces` returns a breakdown only
              when the pieces are canonical items AND rebuild the sentence
              exactly, so a model it cannot account for renders with no chips at
              all rather than with a plausible-looking guess. That fallback is
              also what keeps L3's split frames honest: `ne … pas` travels
              inside its own chunk, and a model whose structure cannot be drawn
              as contiguous pieces is simply not drawn as pieces. A false chip
              teaches a boundary that does not exist, which costs more than an
              absent one. */}
          {modelPieces.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 6,
                marginTop: SPACE.md,
              }}
            >
              {modelPieces.map((piece, i) => (
                <PieceChip key={`${piece.itemId}-${i}`} text={piece.text} />
              ))}
            </View>
          )}
        </View>
      )}

      {/* One hairline, then flat quiet notes. The previous stack gave every
          block an identical bordered box, so the payoff had to compete with its
          own commentary; weight and whitespace carry the hierarchy instead. */}
      {reveal.modelAnswer && hasNotes && (
        <View
          style={{
            height: 1,
            backgroundColor: P.border,
            marginTop: SPACE.lg,
          }}
        />
      )}

      {showCompareFallback && (
        <RevealNote>
          <Text style={{ color: P.ink2, fontSize: 14, lineHeight: 21 }}>
            Compare your answer with the model.
          </Text>
        </RevealNote>
      )}

      {/* SECONDARY. A quiet positive signal, deliberately not a green success
          box: the reveal is a comparison, not a verdict. In Weave the confirmed
          FeedbackBand already sits above this, so a second coloured surface here
          would double the same signal. */}
      {showIfCorrect && reveal.ifCorrect && (
        <RevealNote>
          <Text style={{ color: P.ink2, fontSize: 14, lineHeight: 21 }}>
            {reveal.ifCorrect}
          </Text>
        </RevealNote>
      )}

      {notices.length > 0 && (
        <RevealNote kicker="Notice">
          {notices.map((note, i) => (
            <Text
              key={i}
              style={{
                color: P.ink2,
                fontSize: 14,
                lineHeight: 21,
                marginTop: i === 0 ? 0 : SPACE.xs,
              }}
            >
              {note}
            </Text>
          ))}
        </RevealNote>
      )}

      {/* TERTIARY. Still French, still serif, but quieter ink and smaller than
          the payoff so "another way" never competes with the natural version. */}
      {alternatives.length > 0 && (
        <RevealNote
          kicker={alternatives.length === 1 ? "Another way" : "Other ways"}
        >
          {alternatives.map((alt, i) => (
            <VariantLine
              key={i}
              label={alternativeLabel(alt)}
              fr={alternativeFrench(alt)}
              first={i === 0}
            />
          ))}
        </RevealNote>
      )}

      {reveal.explanation && (
        <RevealNote kicker="Why it works">
          <Text style={{ color: P.ink2, fontSize: 14, lineHeight: 21 }}>
            {reveal.explanation}
          </Text>
        </RevealNote>
      )}

      {/* HOW IT IS WRITTEN, at the one moment the learner has just written it.
          Last, and smallest: the answer and the reason for it come first, and a
          note about a hyphen has no business competing with either. A screen
          that lectures after every correct answer stops being read. */}
      {reveal.writing && (
        <RevealNote kicker="Writing">
          <Text style={{ color: P.ink2, fontSize: 14, lineHeight: 21 }}>
            {reveal.writing}
          </Text>
        </RevealNote>
      )}
    </View>
  );
}

/**
 * One alternative, with the situation it belongs to above it when the content
 * names one.
 *
 * The founder read the old block as "a stack of text": three French sentences
 * in a row under one heading, identical in weight, with nothing saying why a
 * learner would reach for the second. The label is the answer, so it sits ON
 * the variant rather than in the group kicker, and a hairline rule separates
 * one variant from the next — otherwise two labelled blocks read as one
 * four-line paragraph.
 *
 * An unlabelled alternative keeps exactly the old line. Most of the corpus is
 * still bare strings, and giving them a heading would mean inventing a reason
 * each exists, which is the one thing the founder ruled out: a label that is
 * not true costs more than no label.
 */
function VariantLine({
  label,
  fr,
  first,
}: {
  label: string | null;
  fr: string;
  first: boolean;
}) {
  const spaced = first ? 0 : label ? SPACE.sm : SPACE.xs;
  return (
    <View
      style={{
        marginTop: spaced,
        ...(label && !first
          ? { paddingTop: SPACE.sm, borderTopWidth: 1, borderTopColor: P.border }
          : null),
      }}
    >
      {label && (
        <Text
          style={{
            color: P.ink3,
            fontSize: 12,
            lineHeight: 16,
            marginBottom: 2,
          }}
        >
          {label}
        </Text>
      )}
      <Text
        style={{
          color: P.ink2,
          ...frenchSerif(15),
        }}
      >
        {fr}
      </Text>
    </View>
  );
}

/**
 * One quiet note under the payoff: an optional kicker and its lines, flat on
 * the page. Local to this file and immediately consumed by the blocks above —
 * not a general content-block component.
 */
function RevealNote({
  kicker,
  children,
}: {
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <View style={{ marginTop: SPACE.lg }}>
      {kicker && (
        <Text
          style={{
            color: P.ink3,
            fontSize: 12,
            lineHeight: 16,
            letterSpacing: 0.4,
            marginBottom: SPACE.xs,
          }}
        >
          {kicker}
        </Text>
      )}
      {children}
    </View>
  );
}

export function NaturalReveal({
  screen,
  onContinue,
}: {
  screen: NaturalRevealScreen;
  onContinue: () => void;
}) {
  return (
    <LessonScreenFrame
      footer={<PrimaryAction label="Continue" onPress={onContinue} />}
    >
      <NaturalRevealView reveal={screen.payload} />
    </LessonScreenFrame>
  );
}
