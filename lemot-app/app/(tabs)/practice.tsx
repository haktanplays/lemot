import { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Layers,
  Volume2,
  ChevronRight,
  Check,
  X,
  RotateCcw,
  Globe,
  BookOpen,
  MessageCircle,
  AlertCircle,
} from "lucide-react-native";
import { P } from "@/constants/theme";
import { SCENARIOS } from "@/data/practiceScenarios";
import { FLASH } from "@/data/flashcards";
import { useApp } from "@/providers/AppProvider";
import { useSRS } from "@/hooks/useSRS";
import { norm } from "@/lib/normalize";
import type { FlashCard, ScenarioCard } from "@/lib/types";
import LessonPractice from "@/components/LessonPractice";

type Mode = "menu" | "scenario" | "translate" | "lesson";

/* ── Shuffle helper ── */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Generate stable card IDs
const SCENARIO_IDS = SCENARIOS.map(
  (s, i) => `sc-${s.lesson}-${i}`
);

export default function PracticeScreen() {
  const router = useRouter();
  const { say, loaded, errors, weakSpots } = useApp();
  const weakCount = weakSpots?.length ?? 0;
  const errorCount = errors?.length ?? 0;
  const { markKnown, markLearning, getDueCards, getStats, srsLoaded } =
    useSRS();
  const [mode, setMode] = useState<Mode>("menu");

  /* ═══ Scenario state ═══ */
  const [deck, setDeck] = useState<ScenarioCard[]>([]);
  const [deckIds, setDeckIds] = useState<string[]>([]);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);

  /* ═══ Translate state ═══ */
  const [transItems, setTransItems] = useState<FlashCard[]>([]);
  const [transIdx, setTransIdx] = useState(0);
  const [transInput, setTransInput] = useState("");
  const [transResult, setTransResult] = useState<"correct" | "wrong" | null>(null);
  const [transScore, setTransScore] = useState(0);

  // SRS stats
  const stats = useMemo(
    () => getStats(SCENARIO_IDS),
    [getStats]
  );
  const dueCount = useMemo(
    () => getDueCards(SCENARIO_IDS).length,
    [getDueCards]
  );

  const startScenarios = useCallback(() => {
    // Prioritize due cards, then add new cards
    const dueIds = getDueCards(SCENARIO_IDS);
    const sessionIds = dueIds.slice(0, 20); // max 20 per session
    const sessionCards = sessionIds.map(
      (id) => SCENARIOS[SCENARIO_IDS.indexOf(id)]
    );
    setDeck(sessionCards);
    setDeckIds(sessionIds);
    setCardIdx(0);
    setFlipped(false);
    setKnownCount(0);
    setMode("scenario");
  }, [getDueCards]);

  const startTranslate = useCallback(() => {
    setTransItems(shuffle(FLASH).slice(0, 10));
    setTransIdx(0);
    setTransInput("");
    setTransResult(null);
    setTransScore(0);
    setMode("translate");
  }, []);

  if (!loaded || !srsLoaded) {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg items-center justify-center">
        <ActivityIndicator size="small" color={P.red} />
      </SafeAreaView>
    );
  }

  /* ═══════════════════════════════
     MODE MENU
     ═══════════════════════════════ */
  if (mode === "menu") {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg">
        <ScrollView className="flex-1 px-6 pt-4">
          <View className="items-center mb-5">
            <Layers color={P.red} size={28} strokeWidth={1.2} />
            <Text
              className="font-newsreader text-xl font-bold mt-1.5"
              style={{ fontStyle: "italic", color: P.ink }}
            >
              Pratique
            </Text>
            <Text className="text-xs text-lm-ink3 mt-1">
              Practice with real situations and translation.
            </Text>
          </View>

          {/* SRS Summary */}
          <View
            className="rounded-xl mb-4 px-4 py-3"
            style={{
              backgroundColor: P.paper,
              borderWidth: 1,
              borderColor: P.border,
            }}
          >
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xs font-semibold" style={{ color: P.ink }}>
                Your Progress
              </Text>
              {dueCount > 0 && (
                <View
                  className="px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: P.red + "15" }}
                >
                  <Text
                    className="text-[10px] font-bold"
                    style={{ color: P.red }}
                  >
                    {dueCount} due
                  </Text>
                </View>
              )}
            </View>
            <View className="flex-row" style={{ gap: 8 }}>
              {[
                { label: "New", count: stats.new, color: P.ink3 },
                { label: "Learning", count: stats.learning, color: P.amber },
                { label: "Familiar", count: stats.familiar, color: "#3498DB" },
                { label: "Known", count: stats.known, color: P.green },
                { label: "Mastered", count: stats.mastered, color: P.purple },
              ].map((s) => (
                <View key={s.label} className="items-center flex-1">
                  <Text
                    className="text-sm font-bold"
                    style={{ color: s.color }}
                  >
                    {s.count}
                  </Text>
                  <Text className="text-[9px]" style={{ color: P.ink3 }}>
                    {s.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Scenario card */}
          <Pressable
            onPress={startScenarios}
            className="flex-row items-center rounded-xl mb-2.5 px-4 py-4"
            style={{
              backgroundColor: P.paper,
              borderWidth: 1,
              borderColor: dueCount > 0 ? P.red + "40" : P.border,
              shadowColor: "#2C2825",
              shadowOpacity: 0.06,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 1 },
              elevation: 2,
              gap: 12,
            }}
          >
            <Layers size={22} color={P.red} strokeWidth={1.3} />
            <View className="flex-1">
              <Text className="text-sm font-bold" style={{ color: P.ink }}>
                Scenarios
              </Text>
              <Text className="text-xs" style={{ color: P.ink3 }}>
                {dueCount > 0
                  ? `${dueCount} situations due for review`
                  : `${SCENARIOS.length} situations — all caught up!`}
              </Text>
            </View>
            <ChevronRight size={16} color={P.ink3} />
          </Pressable>

          {/* Lesson Practice card */}
          <Pressable
            onPress={() => setMode("lesson")}
            className="flex-row items-center rounded-xl mb-2.5 px-4 py-4"
            style={{
              backgroundColor: P.paper,
              borderWidth: 1,
              borderColor: P.border,
              shadowColor: "#2C2825",
              shadowOpacity: 0.06,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 1 },
              elevation: 2,
              gap: 12,
            }}
          >
            <BookOpen size={22} color={P.red} strokeWidth={1.3} />
            <View className="flex-1">
              <Text className="text-sm font-bold" style={{ color: P.ink }}>
                Lesson Practice
              </Text>
              <Text className="text-xs" style={{ color: P.ink3 }}>
                Deepen your skills per lesson
              </Text>
            </View>
            <ChevronRight size={16} color={P.ink3} />
          </Pressable>

          {/* Translate card */}
          <Pressable
            onPress={startTranslate}
            className="flex-row items-center rounded-xl mb-2.5 px-4 py-4"
            style={{
              backgroundColor: P.paper,
              borderWidth: 1,
              borderColor: P.border,
              shadowColor: "#2C2825",
              shadowOpacity: 0.06,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 1 },
              elevation: 2,
              gap: 12,
            }}
          >
            <Globe size={22} color={P.red} strokeWidth={1.3} />
            <View className="flex-1">
              <Text className="text-sm font-bold" style={{ color: P.ink }}>
                Translation Quiz
              </Text>
              <Text className="text-xs" style={{ color: P.ink3 }}>
                10 words — type the French translation
              </Text>
            </View>
            <ChevronRight size={16} color={P.ink3} />
          </Pressable>

          {/* AI Chat redirect */}
          <Pressable
            onPress={() => router.push("/(tabs)/chat")}
            className="flex-row items-center rounded-xl mb-2.5 px-4 py-4"
            style={{
              backgroundColor: P.paper,
              borderWidth: 1,
              borderColor: P.border,
              shadowColor: "#2C2825",
              shadowOpacity: 0.06,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 1 },
              elevation: 2,
              gap: 12,
            }}
          >
            <MessageCircle size={22} color={P.red} strokeWidth={1.3} />
            <View className="flex-1">
              <Text className="text-sm font-bold" style={{ color: P.ink }}>
                Chat with AI
              </Text>
              <Text className="text-xs" style={{ color: P.ink3 }}>
                Free-form conversation in French
              </Text>
            </View>
            <ChevronRight size={16} color={P.ink3} />
          </Pressable>

          {/* Review Errors — only shows when there are errors or weak spots */}
          {(errorCount > 0 || weakCount > 0) && (
            <Pressable
              onPress={() => router.push("/(tabs)/stats")}
              className="flex-row items-center rounded-xl mb-2.5 px-4 py-4"
              style={{
                backgroundColor: P.paper,
                borderWidth: 1,
                borderColor: P.red + "40",
                shadowColor: "#2C2825",
                shadowOpacity: 0.06,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 1 },
                elevation: 2,
                gap: 12,
              }}
            >
              <AlertCircle size={22} color={P.red} strokeWidth={1.3} />
              <View className="flex-1">
                <Text className="text-sm font-bold" style={{ color: P.ink }}>
                  Review Errors
                </Text>
                <Text className="text-xs" style={{ color: P.ink3 }}>
                  {weakCount > 0
                    ? `${weakCount} weak spot${weakCount === 1 ? "" : "s"} to work on`
                    : `${errorCount} recent mistake${errorCount === 1 ? "" : "s"}`}
                </Text>
              </View>
              <ChevronRight size={16} color={P.ink3} />
            </Pressable>
          )}

          <View className="h-8" />
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* ═══════════════════════════════
     LESSON PRACTICE MODE
     ═══════════════════════════════ */
  if (mode === "lesson") {
    return <LessonPractice onBack={() => setMode("menu")} />;
  }

  /* ═══════════════════════════════
     SCENARIO MODE
     ═══════════════════════════════ */
  if (mode === "scenario") {
    const card = deck[cardIdx];
    const isLast = cardIdx >= deck.length - 1;
    const done = cardIdx >= deck.length;

    if (done) {
      return (
        <SafeAreaView className="flex-1 bg-lm-bg">
          <View className="flex-1 items-center justify-center px-8">
            <Text className="text-xl font-bold text-lm-green mb-2">
              Scenarios Complete!
            </Text>
            <Text className="text-sm text-lm-ink2 text-center mb-1">
              You knew {knownCount} of {deck.length} situations.
            </Text>
            <Text className="text-xs text-lm-ink3 text-center mb-6">
              Keep practicing the ones you're still learning!
            </Text>
            <Pressable
              onPress={startScenarios}
              className="flex-row items-center rounded-xl px-5 py-3 mb-3"
              style={{ backgroundColor: P.red, gap: 6 }}
            >
              <RotateCcw size={14} color="#FFFFFF" />
              <Text className="text-white font-semibold text-sm">
                Shuffle & Restart
              </Text>
            </Pressable>
            <Pressable onPress={() => setMode("menu")}>
              <Text className="text-sm font-semibold" style={{ color: P.ink3 }}>
                Back to Practice
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView className="flex-1 bg-lm-bg">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-3 pb-2">
          <Pressable onPress={() => setMode("menu")}>
            <Text className="text-xs font-semibold" style={{ color: P.ink3 }}>
              ← Back
            </Text>
          </Pressable>
          <Text className="text-xs" style={{ color: P.ink3 }}>
            {cardIdx + 1} / {deck.length}
          </Text>
          <Text className="text-xs" style={{ color: P.green }}>
            {knownCount} known
          </Text>
        </View>

        {/* Card */}
        <View className="flex-1 items-center justify-center px-8">
          <Pressable
            onPress={() => setFlipped(!flipped)}
            className="w-full rounded-2xl items-center justify-center"
            style={{
              backgroundColor: P.paper,
              borderWidth: 1.5,
              borderColor: flipped ? P.red + "40" : P.border,
              paddingVertical: 48,
              paddingHorizontal: 24,
              shadowColor: "#2C2825",
              shadowOpacity: 0.08,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 3,
              minHeight: 220,
            }}
          >
            {!flipped ? (
              <>
                <Text className="text-xs uppercase mb-2" style={{ color: P.ink3, letterSpacing: 1 }}>
                  Lesson {card.lesson}
                </Text>
                <Text
                  className="text-base text-center leading-6"
                  style={{ color: P.ink }}
                >
                  {card.situation}
                </Text>
                <Text className="text-[10px] mt-4" style={{ color: P.ink3 }}>
                  Tap to reveal
                </Text>
              </>
            ) : (
              <>
                <Text
                  className="font-newsreader text-xl font-bold text-center"
                  style={{ fontStyle: "italic", color: P.ink }}
                >
                  {card.answer}
                </Text>
                <Text
                  className="text-xs text-center mt-3 leading-4"
                  style={{ color: P.ink2 }}
                >
                  {card.explanation}
                </Text>
                <Pressable
                  onPress={() => say(card.audio)}
                  className="flex-row items-center mt-3 px-2.5 py-1.5 rounded"
                  style={{ backgroundColor: "#F0EEEC", gap: 4 }}
                >
                  <Volume2 size={12} color={P.ink3} />
                  <Text className="text-[10px]" style={{ color: P.ink3 }}>
                    Listen
                  </Text>
                </Pressable>
              </>
            )}
          </Pressable>

          {/* Action buttons */}
          <View className="flex-row mt-6" style={{ gap: 16 }}>
            <Pressable
              onPress={() => {
                markLearning(deckIds[cardIdx]);
                setFlipped(false);
                setCardIdx(cardIdx + 1);
              }}
              className="flex-row items-center rounded-xl px-5 py-3"
              style={{ backgroundColor: P.amber + "20", gap: 6 }}
            >
              <X size={14} color={P.amber} />
              <Text className="text-sm font-semibold" style={{ color: P.amber }}>
                Still Learning
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                markKnown(deckIds[cardIdx]);
                setKnownCount(knownCount + 1);
                setFlipped(false);
                setCardIdx(cardIdx + 1);
              }}
              className="flex-row items-center rounded-xl px-5 py-3"
              style={{ backgroundColor: P.green + "20", gap: 6 }}
            >
              <Check size={14} color={P.green} />
              <Text className="text-sm font-semibold" style={{ color: P.green }}>
                Know It
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  /* ═══════════════════════════════
     TRANSLATE MODE
     ═══════════════════════════════ */
  const tDone = transIdx >= transItems.length;
  const tItem = transItems[transIdx] as FlashCard | undefined;

  if (tDone) {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg">
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-xl font-bold text-lm-green mb-2">
            Quiz Complete!
          </Text>
          <Text className="text-sm text-lm-ink2 text-center mb-1">
            Score: {transScore} / {transItems.length}
          </Text>
          <Text className="text-xs text-lm-ink3 text-center mb-6">
            {transScore === transItems.length
              ? "Perfect score! Magnifique!"
              : transScore >= transItems.length * 0.7
              ? "Great job! Keep it up."
              : "Keep practicing, you'll get there!"}
          </Text>
          <Pressable
            onPress={startTranslate}
            className="flex-row items-center rounded-xl px-5 py-3 mb-3"
            style={{ backgroundColor: P.red, gap: 6 }}
          >
            <RotateCcw size={14} color="#FFFFFF" />
            <Text className="text-white font-semibold text-sm">Try Again</Text>
          </Pressable>
          <Pressable onPress={() => setMode("menu")}>
            <Text className="text-sm font-semibold" style={{ color: P.ink3 }}>
              Back to Practice
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const checkTranslation = () => {
    if (!tItem) return;
    const isCorrect = norm(transInput) === norm(tItem.fr);
    setTransResult(isCorrect ? "correct" : "wrong");
    if (isCorrect) setTransScore(transScore + 1);
  };

  const nextTranslation = () => {
    setTransIdx(transIdx + 1);
    setTransInput("");
    setTransResult(null);
  };

  if (!tItem) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
    <SafeAreaView className="flex-1 bg-lm-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-3 pb-2">
        <Pressable onPress={() => setMode("menu")}>
          <Text className="text-xs font-semibold" style={{ color: P.ink3 }}>
            ← Back
          </Text>
        </Pressable>
        <Text className="text-xs" style={{ color: P.ink3 }}>
          {transIdx + 1} / {transItems.length}
        </Text>
        <Text className="text-xs" style={{ color: P.green }}>
          {transScore} correct
        </Text>
      </View>

      <View className="flex-1 items-center justify-center px-8">
        {/* Prompt */}
        <Text className="text-xs uppercase mb-2" style={{ color: P.ink3, letterSpacing: 1 }}>
          Translate to French
        </Text>
        <Text className="text-xl font-bold text-center mb-1" style={{ color: P.ink }}>
          {tItem.en}
        </Text>
        {tItem.cog ? (
          <Text className="text-xs mb-4" style={{ color: P.purple }}>
            Hint: {tItem.cog}
          </Text>
        ) : (
          <View className="mb-4" />
        )}

        {/* Input */}
        <TextInput
          value={transInput}
          onChangeText={setTransInput}
          placeholder="Type in French..."
          placeholderTextColor={P.ink3}
          editable={!transResult}
          onSubmitEditing={() => {
            if (transInput.trim() && !transResult) checkTranslation();
          }}
          returnKeyType="done"
          autoCapitalize="none"
          className="w-full font-newsreader text-base text-center rounded-xl px-4 py-3"
          style={{
            fontStyle: "italic",
            color: P.ink,
            backgroundColor: P.paper,
            borderWidth: 1.5,
            borderColor: transResult === "correct"
              ? P.green
              : transResult === "wrong"
              ? P.red
              : P.border,
          }}
        />

        {/* Result feedback */}
        {transResult && (
          <View className="items-center mt-3">
            {transResult === "correct" ? (
              <View className="flex-row items-center" style={{ gap: 4 }}>
                <Check size={14} color={P.green} />
                <Text className="text-sm font-semibold" style={{ color: P.green }}>
                  Correct!
                </Text>
              </View>
            ) : (
              <View className="items-center">
                <View className="flex-row items-center" style={{ gap: 4 }}>
                  <X size={14} color={P.red} />
                  <Text className="text-sm font-semibold" style={{ color: P.red }}>
                    Not quite
                  </Text>
                </View>
                <Text className="text-sm mt-1" style={{ color: P.ink2 }}>
                  Answer:{" "}
                  <Text
                    className="font-newsreader font-bold"
                    style={{ fontStyle: "italic", color: P.ink }}
                  >
                    {tItem.fr}
                  </Text>
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Action buttons */}
        <View className="mt-6">
          {!transResult ? (
            <Pressable
              onPress={checkTranslation}
              disabled={!transInput.trim()}
              className="rounded-xl px-6 py-3"
              style={{
                backgroundColor: transInput.trim() ? P.red : "#F0EEEC",
                opacity: transInput.trim() ? 1 : 0.5,
              }}
            >
              <Text
                className="text-sm font-semibold"
                style={{ color: transInput.trim() ? "#FFFFFF" : P.ink3 }}
              >
                Check
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={nextTranslation}
              className="rounded-xl px-6 py-3"
              style={{ backgroundColor: P.red }}
            >
              <Text className="text-white text-sm font-semibold">Next</Text>
            </Pressable>
          )}
        </View>

        {/* Listen button */}
        <Pressable
          onPress={() => say(tItem.fr)}
          className="flex-row items-center mt-4 px-3 py-2 rounded"
          style={{ backgroundColor: "#F0EEEC", gap: 4 }}
        >
          <Volume2 size={12} color={P.ink3} />
          <Text className="text-[10px]" style={{ color: P.ink3 }}>
            Listen
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
