import type { ReactNode } from "react";
import { View, Text } from "react-native";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction } from "@/components/ui/actions";
import { P, RADIUS, SPACE } from "@/constants/theme";
import type {
  NaturalRevealPayload,
  NaturalRevealScreen,
} from "@/content/lessonTypes";

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
  const alternatives = reveal.naturalAlternatives ?? [];

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
              letterSpacing: 0.4,
              marginBottom: SPACE.sm,
            }}
          >
            A natural version
          </Text>
          <Text
            style={{
              color: P.ink,
              fontFamily: "serif",
              fontStyle: "italic",
              fontSize: 19,
              lineHeight: 28,
            }}
          >
            {reveal.modelAnswer}
          </Text>
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
            <Text
              key={i}
              style={{
                color: P.ink2,
                fontFamily: "serif",
                fontStyle: "italic",
                fontSize: 15,
                lineHeight: 23,
                marginTop: i === 0 ? 0 : SPACE.xs,
              }}
            >
              {alt}
            </Text>
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
