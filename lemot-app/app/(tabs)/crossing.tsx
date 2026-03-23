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
import {
  Shuffle,
  ChevronRight,
  RotateCcw,
  ArrowRight,
} from "lucide-react-native";
import { P } from "@/constants/theme";
import { LESSONS } from "@/data/lessons";
import { useApp } from "@/providers/AppProvider";
import { norm } from "@/lib/normalize";
import { MCQ } from "@/components/MCQ";
import { Btn } from "@/components/Btn";
import type { FillItem, CrossingItem } from "@/lib/types";

type Mode = "menu" | "fill" | "write";

/* ── Shuffle helper ── */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function CrossingScreen() {
  const { prog, lp, loaded } = useApp();
  const [mode, setMode] = useState<Mode>("menu");

  // Determine unlocked lessons (at least 1 section completed)
  const unlockedLessons = useMemo(() => {
    return LESSONS.filter((l) => lp(l.id) > 0);
  }, [prog]);

  // Gather all Crossing Fill items from unlocked lessons
  const allFillItems = useMemo(() => {
    return unlockedLessons.flatMap((l) =>
      l.fillCross.map((item) => ({ ...item, lessonTitle: l.title }))
    );
  }, [unlockedLessons]);

  // Gather all Crossing Write items from unlocked lessons
  const allCrossingItems = useMemo(() => {
    return unlockedLessons.flatMap((l) =>
      l.crossing.map((item) => ({ ...item, lessonTitle: l.title }))
    );
  }, [unlockedLessons]);

  /* ═══ Fill mode state ═══ */
  const [fillDeck, setFillDeck] = useState<(FillItem & { lessonTitle: string })[]>([]);
  const [fillIdx, setFillIdx] = useState(0);
  const [fillSelected, setFillSelected] = useState<string | null>(null);
  const [fillScore, setFillScore] = useState(0);

  /* ═══ Write mode state ═══ */
  const [writeDeck, setWriteDeck] = useState<(CrossingItem & { lessonTitle: string })[]>([]);
  const [writeIdx, setWriteIdx] = useState(0);
  const [writeText, setWriteText] = useState("");
  const [writeChecked, setWriteChecked] = useState(false);
  const [writeFound, setWriteFound] = useState<string[]>([]);
  const [writeMissed, setWriteMissed] = useState<string[]>([]);
  const [writeScore, setWriteScore] = useState(0);

  if (!loaded) {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg items-center justify-center">
        <ActivityIndicator size="small" color={P.red} />
      </SafeAreaView>
    );
  }

  const startFill = useCallback(() => {
    const items = shuffle(allFillItems).slice(0, 10);
    setFillDeck(items);
    setFillIdx(0);
    setFillSelected(null);
    setFillScore(0);
    setMode("fill");
  }, [allFillItems]);

  const startWrite = useCallback(() => {
    const items = shuffle(allCrossingItems).slice(0, 5);
    setWriteDeck(items);
    setWriteIdx(0);
    setWriteText("");
    setWriteChecked(false);
    setWriteFound([]);
    setWriteMissed([]);
    setWriteScore(0);
    setMode("write");
  }, [allCrossingItems]);

  /* ═══════════════════════════════
     MODE MENU
     ═══════════════════════════════ */
  if (mode === "menu") {
    const hasContent = allFillItems.length > 0;

    return (
      <SafeAreaView className="flex-1 bg-lm-bg">
        <ScrollView className="flex-1 px-6 pt-4">
          <View className="items-center mb-5">
            <Shuffle color={P.red} size={28} strokeWidth={1.2} />
            <Text
              className="font-newsreader text-xl font-bold mt-1.5"
              style={{ fontStyle: "italic", color: P.ink }}
            >
              Crossing
            </Text>
            <Text className="text-xs text-lm-ink3 mt-1 text-center">
              Practice mixing French and English — bridge between languages.
            </Text>
          </View>

          {!hasContent ? (
            <View
              className="rounded-xl p-5 items-center"
              style={{ backgroundColor: P.paper, borderWidth: 1, borderColor: P.border }}
            >
              <Text className="text-sm text-center" style={{ color: P.ink2 }}>
                Complete at least one lesson section to unlock Crossing practice!
              </Text>
            </View>
          ) : (
            <>
              {/* Crossing Fill card */}
              <Pressable
                onPress={startFill}
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
                <Shuffle size={22} color={P.red} strokeWidth={1.3} />
                <View className="flex-1">
                  <Text className="text-sm font-bold" style={{ color: P.ink }}>
                    Crossing Fill
                  </Text>
                  <Text className="text-xs" style={{ color: P.ink3 }}>
                    {allFillItems.length} items — pick the right French word in mixed sentences
                  </Text>
                </View>
                <ChevronRight size={16} color={P.ink3} />
              </Pressable>

              {/* Crossing Write card */}
              {allCrossingItems.length > 0 && (
                <Pressable
                  onPress={startWrite}
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
                  <Shuffle size={22} color={P.purple} strokeWidth={1.3} />
                  <View className="flex-1">
                    <Text className="text-sm font-bold" style={{ color: P.ink }}>
                      Crossing Write
                    </Text>
                    <Text className="text-xs" style={{ color: P.ink3 }}>
                      {allCrossingItems.length} items — write mixed French/English sentences
                    </Text>
                  </View>
                  <ChevronRight size={16} color={P.ink3} />
                </Pressable>
              )}
            </>
          )}

          <View className="h-8" />
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* ═══════════════════════════════
     FILL MODE
     ═══════════════════════════════ */
  if (mode === "fill") {
    const done = fillIdx >= fillDeck.length;

    if (done) {
      return (
        <SafeAreaView className="flex-1 bg-lm-bg">
          <View className="flex-1 items-center justify-center px-8">
            <Text className="text-xl font-bold text-lm-green mb-2">
              Crossing Complete!
            </Text>
            <Text className="text-sm text-lm-ink2 text-center mb-1">
              Score: {fillScore} / {fillDeck.length}
            </Text>
            <Text className="text-xs text-lm-ink3 text-center mb-6">
              {fillScore === fillDeck.length
                ? "Perfect score! You're crossing like a pro!"
                : fillScore >= fillDeck.length * 0.7
                ? "Great job! Keep crossing!"
                : "Keep practicing, you'll get there!"}
            </Text>
            <Pressable
              onPress={startFill}
              className="flex-row items-center rounded-xl px-5 py-3 mb-3"
              style={{ backgroundColor: P.red, gap: 6 }}
            >
              <RotateCcw size={14} color="#FFFFFF" />
              <Text className="text-white font-semibold text-sm">Try Again</Text>
            </Pressable>
            <Pressable onPress={() => setMode("menu")}>
              <Text className="text-sm font-semibold" style={{ color: P.ink3 }}>
                Back to Crossing
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      );
    }

    const item = fillDeck[fillIdx];
    const isLast = fillIdx >= fillDeck.length - 1;

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
            {fillIdx + 1} / {fillDeck.length}
          </Text>
          <Text className="text-xs" style={{ color: P.green }}>
            {fillScore} correct
          </Text>
        </View>

        <ScrollView className="flex-1 px-5 pt-4" contentContainerStyle={{ paddingBottom: 32 }}>
          <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
            Crossing Fill
          </Text>
          <Text className="text-xs font-medium mb-2.5" style={{ color: P.purple }}>
            Replace the blank with the correct French word.
          </Text>

          <View
            className="rounded-xl border"
            style={{ backgroundColor: P.paper, borderColor: P.border, padding: 20 }}
          >
            {item.ctx ? (
              <Text className="text-xs italic mb-3" style={{ color: P.amber }}>
                Situation: {item.ctx}
              </Text>
            ) : null}

            <Text
              className="text-base font-medium text-center mb-4"
              style={{ fontFamily: "serif", color: P.ink }}
            >
              {item.s}
            </Text>

            <MCQ
              options={item.o}
              correct={item.a}
              selected={fillSelected}
              onSelect={(opt) => {
                setFillSelected(opt);
                if (opt === item.a) setFillScore((s) => s + 1);
              }}
            />

            {fillSelected !== null && (
              <Btn
                onPress={() => {
                  if (isLast) {
                    setFillIdx(fillIdx + 1);
                  } else {
                    setFillIdx(fillIdx + 1);
                    setFillSelected(null);
                  }
                }}
              >
                <Text className="text-white text-sm font-semibold">
                  {isLast ? "Done" : "Next"}
                </Text>
                <ArrowRight size={15} color="#fff" />
              </Btn>
            )}
          </View>

          <Text className="text-[10px] mt-2 text-center" style={{ color: P.ink3 }}>
            From: {item.lessonTitle}
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* ═══════════════════════════════
     WRITE MODE
     ═══════════════════════════════ */
  const wDone = writeIdx >= writeDeck.length;

  if (wDone) {
    return (
      <SafeAreaView className="flex-1 bg-lm-bg">
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-xl font-bold text-lm-green mb-2">
            Crossing Complete!
          </Text>
          <Text className="text-sm text-lm-ink2 text-center mb-1">
            {writeScore} French words used across {writeDeck.length} sentences
          </Text>
          <Text className="text-xs text-lm-ink3 text-center mb-6">
            The more you practice, the more French words you'll cross in!
          </Text>
          <Pressable
            onPress={startWrite}
            className="flex-row items-center rounded-xl px-5 py-3 mb-3"
            style={{ backgroundColor: P.red, gap: 6 }}
          >
            <RotateCcw size={14} color="#FFFFFF" />
            <Text className="text-white font-semibold text-sm">Try Again</Text>
          </Pressable>
          <Pressable onPress={() => setMode("menu")}>
            <Text className="text-sm font-semibold" style={{ color: P.ink3 }}>
              Back to Crossing
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const wItem = writeDeck[writeIdx];
  const allFound = writeMissed.length === 0 && writeChecked;

  const handleCheckWrite = () => {
    const inputNorm = norm(writeText);
    const foundWords: string[] = [];
    const missedWords: string[] = [];

    wItem.known.forEach((w) => {
      if (inputNorm.includes(norm(w))) {
        foundWords.push(w);
      } else {
        missedWords.push(w);
      }
    });

    setWriteFound(foundWords);
    setWriteMissed(missedWords);
    setWriteChecked(true);
    setWriteScore((s) => s + foundWords.length);
  };

  const handleNextWrite = () => {
    setWriteIdx(writeIdx + 1);
    setWriteText("");
    setWriteChecked(false);
    setWriteFound([]);
    setWriteMissed([]);
  };

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
            {writeIdx + 1} / {writeDeck.length}
          </Text>
          <Text className="text-xs" style={{ color: P.green }}>
            {writeScore} words
          </Text>
        </View>

        <ScrollView className="flex-1 px-5 pt-4" contentContainerStyle={{ paddingBottom: 32 }}>
          <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
            Crossing Write
          </Text>
          <Text className="text-xs mb-2.5 leading-5" style={{ color: P.purple }}>
            Translate this sentence. Write every word you know in French — leave the rest in English.
          </Text>

          <View
            className="rounded-2xl p-5 border"
            style={{ backgroundColor: P.paper, borderColor: P.border }}
          >
            {/* English sentence */}
            <View
              className="rounded-xl p-3.5 mb-3.5 items-center"
              style={{ backgroundColor: "#EFF6FF", borderWidth: 1, borderColor: "#BFDBFE" }}
            >
              <Text
                className="text-base font-semibold text-center leading-6"
                style={{ color: P.ink }}
              >
                {wItem.en}
              </Text>
            </View>

            {/* Known words as tags */}
            <View className="flex-row flex-wrap mb-2.5" style={{ gap: 5 }}>
              {wItem.known.map((word) => (
                <View
                  key={word}
                  className="rounded-md px-2.5 py-1"
                  style={{ backgroundColor: P.pl, borderWidth: 1, borderColor: P.purple + "30" }}
                >
                  <Text
                    className="text-xs font-medium"
                    style={{ color: P.purple, fontFamily: "serif", fontStyle: "italic" }}
                  >
                    {word}
                  </Text>
                </View>
              ))}
            </View>

            {/* Textarea input */}
            <TextInput
              value={writeText}
              onChangeText={setWriteText}
              placeholder="Write your Crossing version..."
              placeholderTextColor={P.ink3}
              editable={!writeChecked}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              className="rounded-xl text-base"
              style={{
                padding: 12,
                paddingHorizontal: 14,
                minHeight: 80,
                borderWidth: 1.5,
                borderColor: writeChecked
                  ? allFound ? P.green : P.amber
                  : P.border,
                backgroundColor: writeChecked
                  ? allFound ? P.gl : P.al
                  : P.paper,
                fontFamily: "serif",
                fontStyle: "italic",
                color: P.ink,
                lineHeight: 24,
              }}
            />

            {/* Results after checking */}
            {writeChecked && (
              <View className="mt-3">
                {/* Sample answer */}
                <View className="rounded-lg p-3 mb-2.5" style={{ backgroundColor: P.pl }}>
                  <Text
                    className="text-[10px] font-bold mb-1"
                    style={{ color: P.purple, letterSpacing: 0.5, textTransform: "uppercase" }}
                  >
                    Sample answer
                  </Text>
                  <Text
                    className="text-sm leading-6"
                    style={{ color: P.ink, fontFamily: "serif", fontStyle: "italic" }}
                  >
                    {wItem.sample}
                  </Text>
                </View>

                {/* Found / Missed words */}
                <View className="flex-row mb-2" style={{ gap: 8 }}>
                  {writeFound.length > 0 && (
                    <View className="flex-1 rounded-lg p-2.5" style={{ backgroundColor: P.gl }}>
                      <Text className="text-[10px] font-bold mb-1" style={{ color: P.green }}>
                        You got these in French:
                      </Text>
                      <Text
                        className="text-xs"
                        style={{ color: P.green, fontFamily: "serif", fontStyle: "italic" }}
                      >
                        {writeFound.join(", ")}
                      </Text>
                    </View>
                  )}
                  {writeMissed.length > 0 && (
                    <View className="flex-1 rounded-lg p-2.5" style={{ backgroundColor: P.rl }}>
                      <Text className="text-[10px] font-bold mb-1" style={{ color: P.red }}>
                        Next time, try:
                      </Text>
                      <Text
                        className="text-xs"
                        style={{ color: P.red, fontFamily: "serif", fontStyle: "italic" }}
                      >
                        {writeMissed.join(", ")}
                      </Text>
                    </View>
                  )}
                </View>

                <Text
                  className="text-sm font-semibold text-center"
                  style={{ color: allFound ? P.green : P.amber }}
                >
                  {writeFound.length}/{wItem.known.length} French words used
                </Text>
              </View>
            )}

            {/* Check button */}
            {!writeChecked && (
              <Btn onPress={handleCheckWrite}>
                <Text className="text-white text-sm font-semibold">
                  Check My Crossing
                </Text>
              </Btn>
            )}

            {/* Next button */}
            {writeChecked && (
              <Btn
                onPress={handleNextWrite}
                color={allFound ? P.green : P.red}
              >
                <Text className="text-white text-sm font-semibold">
                  {writeIdx < writeDeck.length - 1 ? "Next Sentence" : "Done"}
                </Text>
              </Btn>
            )}
          </View>

          <Text className="text-[10px] mt-2 text-center" style={{ color: P.ink3 }}>
            From: {wItem.lessonTitle}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
