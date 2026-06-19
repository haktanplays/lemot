import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Animated,
  Easing,
  AccessibilityInfo,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Volume2, ArrowRight } from "lucide-react-native";
import { P } from "@/constants/theme";
import { Btn } from "@/components/Btn";
import { FrMix } from "@/components/FrMix";
import { useSpeech } from "@/hooks/useSpeech";
import {
  acceptsCoffeeRemainder,
  acceptsRebuild,
} from "@/lib/lessonZeroAnswers";
import { kvStorage } from "@/lib/storage";
import { getV1LessonByNumber } from "@/content/lessons/v1";

const SEEN_LESSON_ZERO_KEY = "lm7_seen_lesson_zero";

// The natural target sentence, spoken on the learner-controlled listen taps.
const NATURAL_SENTENCE = "Bonjour, je voudrais un café.";

// The two French pieces the learner meets, then carries into the weave. Order
// is fixed: greet first, then the polite request.
const PIECES = [
  { fr: "Bonjour", en: "Hello" },
  { fr: "je voudrais", en: "I would like" },
] as const;

// Curated familiar pairs for the familiar-word reel. French left, English
// right. Not random runtime words; café/coffee echoes the word just learned.
const FAMILIAR_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["restaurant", "restaurant"],
  ["important", "important"],
  ["possible", "possible"],
  ["moment", "moment"],
  ["musique", "music"],
  ["cinéma", "cinema"],
  ["café", "coffee"],
  ["chocolat", "chocolate"],
];

// The live Lesson 1: the v1 path's number-1 lesson. Resolved from the same
// registry Home uses so the CTA reuses the existing /v1-lesson route instead of
// inventing a parallel one.
const LESSON_ONE = getV1LessonByNumber(1);

type Step =
  | "scene_meet"
  | "weave"
  | "reveal"
  | "familiar"
  | "rebuild"
  | "payoff";

export default function LessonZeroScreen() {
  const { say } = useSpeech();
  const [step, setStep] = useState<Step>("scene_meet");

  // Weave: the two pieces are inserted in order; once both are placed the
  // learner types the English remainder. `nudge` shows the calm prompt only
  // after a Continue with a missing remainder.
  const [inserted, setInserted] = useState<number[]>([]);
  const [remainder, setRemainder] = useState("");
  const [nudge, setNudge] = useState(false);

  // Rebuild: the learner types the whole sentence. After two misses a read-only
  // reference appears; the answer is never auto-filled.
  const [rebuildInput, setRebuildInput] = useState("");
  const [rebuildMisses, setRebuildMisses] = useState(0);
  const [rebuildTried, setRebuildTried] = useState(false);

  const finish = () => {
    // Persist BEFORE navigation so Home's mount-time check sees the flag and
    // does not redirect back into lesson-zero.
    try {
      kvStorage.setItem(SEEN_LESSON_ZERO_KEY, "true");
    } catch (e) {
      console.warn("[LessonZero] Failed to save first-use flag:", e);
    }
    // Open Lesson 1 directly, not Home. router.replace (not push) keeps the
    // flow forward-only: finishing the lesson cannot swipe back into Lesson
    // Zero. The cast bypasses expo-router's stale typed-routes union until
    // Metro regenerates. Fall back to the tabs if the lesson is ever absent.
    if (LESSON_ONE) {
      router.replace(`/v1-lesson/${LESSON_ONE.id}` as never);
    } else {
      router.replace("/(tabs)" as never);
    }
  };

  // ─── Beat renders ───

  const renderSceneMeet = () => (
    <View style={block}>
      <Text style={leadStyle}>The person at the counter looks up.</Text>
      <Text style={leadStyle}>You want a coffee.</Text>
      <Text style={[bodyStyle, { marginTop: 16, marginBottom: 20 }]}>
        Here are two French pieces you can use.
      </Text>

      {PIECES.map((p) => (
        <View key={p.fr} style={pieceRowStyle}>
          <View style={{ flex: 1 }}>
            <Text style={frenchStyle}>{p.fr}</Text>
            <Text style={meaningStyle}>{p.en}</Text>
          </View>
          <Pressable
            onPress={() => say(p.fr)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Listen to ${p.fr}`}
            style={listenRoundStyle}
          >
            <Volume2 size={18} color={P.ink2} />
          </Pressable>
        </View>
      ))}

      <Btn onPress={() => setStep("weave")} style={{ marginTop: 12 }}>
        Continue
      </Btn>
    </View>
  );

  const renderWeave = () => {
    const nextIndex = inserted.length;
    const bothInserted = inserted.length === PIECES.length;
    const composed = inserted.map((i) => PIECES[i].fr).join(", ");
    // Only the piece(s) NOT yet placed, in order, for the subtle support cue.
    const remaining = PIECES.map((p, i) => ({ fr: p.fr, i })).filter(
      (p) => !inserted.includes(p.i)
    );

    const onContinue = () => {
      if (!acceptsCoffeeRemainder(remainder)) {
        setNudge(true);
        return;
      }
      Keyboard.dismiss();
      setStep("reveal");
    };

    return (
      <View style={block}>
        <Text style={titleStyle}>Say hello and ask for a coffee.</Text>
        <Text style={bodyStyle}>Use the French you have.</Text>
        <Text style={[bodyStyle, { marginBottom: 18 }]}>
          Write the rest in English.
        </Text>

        {/* Composed line: the placed French stem flows straight into the
            English remainder field so the whole row reads as one mixed
            sentence: "Bonjour, je voudrais a coffee". The field is a quiet
            inline blank (a fixed min-width slot with a subtle underline) that
            sits one word-space after the stem, NOT a flex-grown column pushed
            to the right edge. The stem only ever shows what the learner has
            placed, never the full answer. The "in English" guide lives just
            below the line (see helper) so it never breaks the sentence. */}
        <View style={composedRow}>
          <Text style={composedFrench}>{composed || "..."}</Text>
          {bothInserted && (
            <TextInput
              value={remainder}
              onChangeText={(t) => {
                setRemainder(t);
                if (nudge) setNudge(false);
              }}
              autoCapitalize="none"
              autoCorrect={false}
              style={remainderInput}
            />
          )}
        </View>
        {/* Quiet italic guide for the blank: only while it is empty, so it
            disappears the moment the learner starts the remainder and the line
            reads clean. Uses ink2 (not the paler ink3 placeholder grey) so it
            looks like a deliberate hint, not disabled/broken text. */}
        {bothInserted && remainder.trim().length === 0 && (
          <Text style={remainderHelper}>in English</Text>
        )}

        {/* Subtle support cue below the composer: only the French piece(s) NOT
            yet placed, in order. Before any tap, both show (Bonjour active).
            After Bonjour, only je voudrais remains as the quiet hint. After
            both, nothing. Tap to place. Never the full or natural sentence. */}
        {remaining.length > 0 && (
          <View style={hintRow}>
            {remaining.map((p) => {
              const tappable = p.i === nextIndex;
              return (
                <Pressable
                  key={p.fr}
                  disabled={!tappable}
                  onPress={() => setInserted([...inserted, p.i])}
                  style={[hintChip, !tappable && insertChipMuted]}
                >
                  <Text style={hintChipText}>{p.fr}</Text>
                </Pressable>
              );
            })}
          </View>
        )}

        {inserted.length > 0 && (
          <Pressable
            onPress={() => {
              setInserted([]);
              setRemainder("");
              setNudge(false);
            }}
            hitSlop={6}
            style={{ alignSelf: "center", marginTop: 12 }}
          >
            <Text style={resetText}>Start over</Text>
          </Pressable>
        )}

        {nudge && (
          <Text style={nudgeStyle}>
            Add the English word for what you want, then continue.
          </Text>
        )}

        <Btn onPress={onContinue} disabled={!bothInserted}>
          Continue
        </Btn>
      </View>
    );
  };

  const renderReveal = () => {
    // Strip any trailing punctuation the learner typed so the appended period
    // never doubles (e.g. "a coffee." shows as "a coffee." not "a coffee..").
    const learner = remainder.trim().replace(/[.,!?;:]+$/, "");
    return (
      <View style={block}>
        <Text style={titleStyle}>
          You just said that you would like a coffee.
        </Text>

        <View style={revealCard}>
          <Text style={revealCaption}>Your version</Text>
          <FrMix text={`Bonjour, je voudrais *${learner}*.`} />
        </View>

        <View style={[revealCard, { marginTop: 12 }]}>
          <Text style={revealCaption}>Natural French</Text>
          <FrMix text={"Bonjour, je voudrais *un café*."} />
        </View>

        <Text style={onlyChangedStyle}>Only this part changed.</Text>

        <Pressable
          onPress={() => say(NATURAL_SENTENCE)}
          accessibilityRole="button"
          accessibilityLabel="Hear it"
          hitSlop={12}
          style={hearItStyle}
        >
          <Volume2 size={18} color={P.red} />
          <Text style={hearItText}>Hear it</Text>
        </Pressable>

        <Btn onPress={() => setStep("familiar")}>Continue</Btn>
      </View>
    );
  };

  const renderFamiliar = () => (
    <View style={block}>
      <Text style={titleStyle}>You were not starting from zero.</Text>
      <Text style={[bodyStyle, { marginBottom: 18 }]}>
        Some French is already familiar.
      </Text>

      <FamiliarReel />

      <Btn onPress={() => setStep("rebuild")} style={{ marginTop: 18 }}>
        Continue
      </Btn>
    </View>
  );

  const renderRebuild = () => {
    const showReference = rebuildMisses >= 2;

    const onCheck = () => {
      if (acceptsRebuild(rebuildInput)) {
        Keyboard.dismiss();
        setStep("payoff");
        return;
      }
      setRebuildMisses((n) => n + 1);
      setRebuildTried(true);
    };

    return (
      <View style={block}>
        <Text style={titleStyle}>Write the whole sentence in French.</Text>
        <Text style={[bodyStyle, { marginBottom: 16 }]}>
          Say hello and ask for a coffee.
        </Text>

        <TextInput
          value={rebuildInput}
          onChangeText={(t) => {
            setRebuildInput(t);
            if (rebuildTried) setRebuildTried(false);
          }}
          placeholder="Type in French"
          placeholderTextColor={P.ink3}
          autoCapitalize="none"
          autoCorrect={false}
          multiline
          style={rebuildInputStyle}
        />

        {rebuildTried && (
          <Text style={nudgeStyle}>
            Not yet. Tap Listen to hear it, then try again.
          </Text>
        )}

        <Pressable
          onPress={() => say(NATURAL_SENTENCE)}
          accessibilityRole="button"
          accessibilityLabel="Listen"
          hitSlop={12}
          style={hearItStyle}
        >
          <Volume2 size={18} color={P.red} />
          <Text style={hearItText}>Listen</Text>
        </Pressable>

        {/* After two misses, offer partial recall support: only the two French
            pieces the learner already placed, never the full sentence and never
            the missing object (un café). These are quiet, non-interactive
            reminders of the pieces they used, not a copy-the-answer reference,
            so the learner still has to produce the whole sentence. */}
        {showReference && (
          <View style={referenceCard}>
            <Text style={revealCaption}>Need a nudge?</Text>
            <View style={supportChipsRow}>
              {PIECES.map((p) => (
                <View key={p.fr} style={hintChip}>
                  <Text style={hintChipText}>{p.fr}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <Btn onPress={onCheck} disabled={rebuildInput.trim().length === 0}>
          Check
        </Btn>
      </View>
    );
  };

  const renderPayoff = () => (
    <View style={block}>
      <Text style={payoffTitle}>Used.</Text>
      <Text style={payoffTitle}>Not memorized.</Text>
      <Text style={payoffSub}>
        You used what you knew, then rebuilt the thought in French.
      </Text>
      <Btn onPress={finish}>
        <Text className="text-white text-sm font-semibold">Start Lesson 1</Text>
        <ArrowRight size={16} color="white" />
      </Btn>
    </View>
  );

  const renderStep = () => {
    switch (step) {
      case "scene_meet":
        return renderSceneMeet();
      case "weave":
        return renderWeave();
      case "reveal":
        return renderReveal();
      case "familiar":
        return renderFamiliar();
      case "rebuild":
        return renderRebuild();
      case "payoff":
        return renderPayoff();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-lm-bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingVertical: 32,
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps="handled"
        >
          {renderStep()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Familiar-word reel ───
// Two continuous columns (French scrolls up, English scrolls down) on the
// built-in Animated API. Reanimated v4 is installed but its Babel plugin is NOT
// configured, so using it would require a config change; the built-in driver is
// the safe choice here. Local and reversible: this whole component can be
// dropped back to the static two-column list (kept inline as the reduced-motion
// path) without touching the rest of the flow.

const REEL_ROW_H = 44;
const REEL_VISIBLE_ROWS = 5; // keep odd so one row sits exactly on the band
const REEL_DURATION_MS = 18000; // one slow full cycle
const REEL_FADE_BANDS = [0.92, 0.72, 0.5, 0.32, 0.16, 0.06];

// Pair-alignment for the OPPOSING-direction reel.
//
// The French column scrolls up and the English column scrolls down at equal
// speed. If both columns used the same word order, the row centered on the
// reading band in each column would drift apart (French index increases while
// English index decreases), so the band showed mismatched pairs.
//
// Fix: feed the English column a reflected order. With the band at row
// `center = (REEL_VISIBLE_ROWS - 1) / 2`, the French centered index is
// `center + progress*N` and the English centered list position is
// `(center + N) - progress*N`. Choosing the English word at list position q to
// be pair `(2*center + N - q) mod N` makes the two centered items the SAME pair
// for every progress value, so the band always reads a correct pair while the
// columns still move in opposite directions.
const REEL_CENTER_ROW = (REEL_VISIBLE_ROWS - 1) / 2;
const FR_WORDS: readonly string[] = FAMILIAR_PAIRS.map(([fr]) => fr);
const EN_WORDS_ALIGNED: readonly string[] = FAMILIAR_PAIRS.map((_, q) => {
  const n = FAMILIAR_PAIRS.length;
  const idx = (((2 * REEL_CENTER_ROW + n - q) % n) + n) % n;
  return FAMILIAR_PAIRS[idx][1];
});

function ReelFade({ edge }: { edge: "top" | "bottom" }) {
  // Dependency-free soft edge: stacked P.bg bands with falling opacity. No
  // gradient/mask library is installed, so this approximates a fade mask.
  const bands =
    edge === "top" ? REEL_FADE_BANDS : [...REEL_FADE_BANDS].reverse();
  return (
    <View
      pointerEvents="none"
      style={[reelFade, edge === "top" ? { top: 0 } : { bottom: 0 }]}
    >
      {bands.map((opacity, i) => (
        <View key={i} style={{ height: 8, backgroundColor: P.bg, opacity }} />
      ))}
    </View>
  );
}

function FamiliarReel() {
  // Minimal reduced-motion respect: if the OS setting is on, render the static
  // two-column list instead of the moving reel. A shared hook is follow-up.
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled().then((v) => {
      if (active) setReduceMotion(v);
    });
    const sub = AccessibilityInfo.addEventListener("reduceMotionChanged", (v) =>
      setReduceMotion(v)
    );
    return () => {
      active = false;
      sub.remove();
    };
  }, []);

  const progress = useRef(new Animated.Value(0)).current;
  const loopH = FAMILIAR_PAIRS.length * REEL_ROW_H;
  const viewportH = REEL_VISIBLE_ROWS * REEL_ROW_H;

  useEffect(() => {
    if (reduceMotion) return;
    progress.setValue(0);
    const anim = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: REEL_DURATION_MS,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    anim.start();
    return () => anim.stop();
  }, [reduceMotion, progress]);

  if (reduceMotion) {
    return (
      <View style={familiarList}>
        {FAMILIAR_PAIRS.map(([fr, en], i) => (
          <View
            key={fr}
            style={[
              familiarRow,
              i < FAMILIAR_PAIRS.length - 1 && familiarRowDivider,
            ]}
          >
            <Text style={familiarFr}>{fr}</Text>
            <Text style={familiarEn}>{en}</Text>
          </View>
        ))}
      </View>
    );
  }

  // The content is rendered twice so a translateY of one loop height wraps
  // seamlessly. French moves up (0 -> -loopH), English moves down (-loopH -> 0).
  // The English column uses the reflected order (EN_WORDS_ALIGNED) so the
  // centered pair always matches despite the opposing directions.
  const column = (
    kind: "fr" | "en",
    words: readonly string[],
    outputRange: number[]
  ) => {
    const translateY = progress.interpolate({ inputRange: [0, 1], outputRange });
    return (
      <View style={{ flex: 1, height: viewportH, overflow: "hidden" }}>
        <Animated.View style={{ transform: [{ translateY }] }}>
          {[...words, ...words].map((w, i) => (
            <View key={`${kind}-${i}`} style={reelRow}>
              <Text style={kind === "fr" ? reelFr : reelEn}>{w}</Text>
            </View>
          ))}
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={[reelWrap, { height: viewportH }]}>
      <View style={{ flexDirection: "row", height: viewportH }}>
        {column("fr", FR_WORDS, [0, -loopH])}
        {column("en", EN_WORDS_ALIGNED, [-loopH, 0])}
      </View>
      <ReelFade edge="top" />
      <ReelFade edge="bottom" />
    </View>
  );
}

// ─── Styles ───

const block = {
  width: "100%" as const,
};

const leadStyle = {
  fontSize: 18,
  fontWeight: "600" as const,
  color: P.ink,
  textAlign: "center" as const,
  lineHeight: 26,
};

const titleStyle = {
  fontSize: 19,
  fontWeight: "600" as const,
  color: P.ink,
  textAlign: "center" as const,
  marginBottom: 10,
  lineHeight: 26,
};

const bodyStyle = {
  fontSize: 15,
  color: P.ink2,
  textAlign: "center" as const,
  lineHeight: 22,
};

const frenchStyle = {
  fontSize: 22,
  fontFamily: "Newsreader",
  fontStyle: "italic" as const,
  color: P.ink,
  // No explicit lineHeight: on Android a set lineHeight makes RN's
  // CustomLineHeightSpan override includeFontPadding and clip the deep italic
  // "j" tail of "je voudrais". Letting includeFontPadding use the font's full
  // bottom metric keeps the descender intact; paddingBottom adds the gap to the
  // meaning line.
  includeFontPadding: true,
  paddingBottom: 4,
};

const meaningStyle = {
  fontSize: 14,
  color: P.ink2,
  // A little breathing space below the descender of the French line.
  marginTop: 4,
};

const pieceRowStyle = {
  flexDirection: "row" as const,
  alignItems: "center" as const,
  justifyContent: "space-between" as const,
  width: "100%" as const,
  // Slightly taller card so the serif italic glyph has top/bottom room.
  paddingVertical: 16,
  paddingHorizontal: 16,
  backgroundColor: P.paper,
  borderWidth: 1,
  borderColor: P.border,
  borderRadius: 12,
  marginBottom: 12,
};

const listenRoundStyle = {
  padding: 8,
  borderRadius: 999,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.bg,
};

const insertChipMuted = {
  opacity: 0.45,
};

const hintRow = {
  flexDirection: "row" as const,
  flexWrap: "wrap" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  gap: 8,
  marginTop: 16,
};

const hintChip = {
  paddingHorizontal: 14,
  // Taller chip so the serif italic "j" descender breathes inside it.
  paddingVertical: 10,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: P.rb,
  backgroundColor: P.rl,
};

const hintChipText = {
  fontSize: 15,
  fontFamily: "Newsreader",
  fontStyle: "italic" as const,
  color: P.ink,
  // No explicit lineHeight (see frenchStyle): a set lineHeight clips the italic
  // "j" tail of "je voudrais" on Android. includeFontPadding keeps it intact;
  // the chip's paddingVertical handles the outer breathing room.
  includeFontPadding: true,
};

const resetText = {
  fontSize: 13,
  color: P.ink3,
  textDecorationLine: "underline" as const,
  paddingHorizontal: 4,
  paddingVertical: 8,
};

const composedRow = {
  width: "100%" as const,
  flexDirection: "row" as const,
  flexWrap: "wrap" as const,
  alignItems: "center" as const,
  // One word-space between the French stem and the English blank: small and
  // fixed, never a space-between / flex push that splits the row into two
  // zones. On a narrow device the blank wraps below the stem as one unit.
  gap: 6,
  paddingVertical: 14,
  paddingHorizontal: 16,
  backgroundColor: P.paper,
  borderWidth: 1,
  borderColor: P.border,
  borderRadius: 12,
  minHeight: 60,
};

const composedFrench = {
  fontSize: 20,
  fontFamily: "Newsreader",
  fontStyle: "italic" as const,
  color: P.ink,
  // No explicit lineHeight (see frenchStyle): a set lineHeight clips the italic
  // "j" tail on Android. includeFontPadding keeps the descender intact.
  includeFontPadding: true,
  paddingBottom: 4,
};

const remainderInput = {
  // A quiet inline blank, NOT a flex-grown field: a fixed min-width slot keeps
  // the typed remainder hugging the stem instead of floating to the right
  // edge. minWidth keeps it tappable and fits "a coffee" without scrolling.
  minWidth: 130,
  flexShrink: 1,
  // Same serif italic + size as the French stem (composedFrench) so the typed
  // remainder reads as one continuous sentence with it, not a mismatched
  // sans-serif insert.
  fontFamily: "Newsreader",
  fontStyle: "italic" as const,
  fontSize: 20,
  includeFontPadding: true,
  // Zero horizontal padding so the text starts immediately after the one
  // word-space gap (Android TextInput's default inset is what split the row).
  paddingHorizontal: 0,
  paddingTop: 2,
  paddingBottom: 2,
  color: P.ink,
  // Subtle underline marks where to type now that the placeholder is gone,
  // without shouting; reads as a fill-in-the-blank slot inside the sentence.
  borderBottomWidth: 1,
  borderBottomColor: P.border,
};

const remainderHelper = {
  alignSelf: "flex-end" as const,
  marginTop: 6,
  marginRight: 4,
  fontSize: 12,
  fontStyle: "italic" as const,
  color: P.ink2,
};

const nudgeStyle = {
  fontSize: 14,
  color: P.ink2,
  textAlign: "center" as const,
  marginTop: 14,
  lineHeight: 20,
};

const revealCard = {
  width: "100%" as const,
  paddingVertical: 14,
  paddingHorizontal: 16,
  backgroundColor: P.paper,
  borderWidth: 1,
  borderColor: P.border,
  borderRadius: 12,
};

const revealCaption = {
  fontSize: 12,
  color: P.ink3,
  marginBottom: 6,
};

const onlyChangedStyle = {
  fontSize: 13,
  color: P.ink3,
  textAlign: "center" as const,
  marginTop: 12,
};

const hearItStyle = {
  flexDirection: "row" as const,
  alignItems: "center" as const,
  alignSelf: "center" as const,
  gap: 8,
  marginTop: 14,
  paddingVertical: 10,
  paddingHorizontal: 18,
  borderRadius: 999,
  borderWidth: 1,
  borderColor: P.rb,
  backgroundColor: P.rl,
};

const hearItText = {
  fontSize: 15,
  fontWeight: "600" as const,
  color: P.red,
};

const familiarList = {
  width: "100%" as const,
  backgroundColor: P.paper,
  borderWidth: 1,
  borderColor: P.border,
  borderRadius: 12,
  paddingHorizontal: 16,
  marginBottom: 4,
};

const familiarRow = {
  flexDirection: "row" as const,
  alignItems: "center" as const,
  justifyContent: "space-between" as const,
  paddingVertical: 11,
};

const familiarRowDivider = {
  borderBottomWidth: 1,
  borderBottomColor: P.border,
};

const familiarFr = {
  fontSize: 17,
  fontFamily: "Newsreader",
  fontStyle: "italic" as const,
  color: P.ink,
};

const familiarEn = {
  fontSize: 15,
  color: P.ink2,
};

const reelWrap = {
  width: "100%" as const,
  position: "relative" as const,
};

const reelRow = {
  height: REEL_ROW_H,
  justifyContent: "center" as const,
  paddingHorizontal: 16,
};

const reelFr = {
  fontSize: 18,
  fontFamily: "Newsreader",
  fontStyle: "italic" as const,
  color: P.ink,
  lineHeight: 26,
  textAlign: "left" as const,
};

const reelEn = {
  fontSize: 16,
  color: P.ink2,
  textAlign: "right" as const,
};

const reelFade = {
  position: "absolute" as const,
  left: 0,
  right: 0,
};

const rebuildInputStyle = {
  width: "100%" as const,
  minHeight: 52,
  padding: 14,
  fontSize: 17,
  borderRadius: 12,
  backgroundColor: P.paper,
  borderWidth: 1,
  borderColor: P.border,
  color: P.ink,
  textAlignVertical: "top" as const,
};

const referenceCard = {
  width: "100%" as const,
  marginTop: 14,
  paddingVertical: 12,
  paddingHorizontal: 16,
  backgroundColor: P.bg,
  borderWidth: 1,
  borderColor: P.border,
  borderRadius: 12,
};

const supportChipsRow = {
  flexDirection: "row" as const,
  flexWrap: "wrap" as const,
  alignItems: "center" as const,
  gap: 8,
  marginTop: 4,
};

const payoffTitle = {
  fontSize: 26,
  fontWeight: "700" as const,
  color: P.ink,
  textAlign: "center" as const,
  lineHeight: 32,
};

const payoffSub = {
  fontSize: 15,
  color: P.ink2,
  textAlign: "center" as const,
  marginTop: 14,
  marginBottom: 8,
  lineHeight: 22,
};
