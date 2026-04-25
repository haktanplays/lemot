import { useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { Volume2 } from "lucide-react-native";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import { norm } from "@/lib/normalize";
import type { CombineItem, WeaveItem } from "@/lib/types";

type Phase = "combine" | "weave";

interface CombineWeaveProps {
  combine: CombineItem[];
  weave: WeaveItem[];
  onComplete: (score: number, total: number) => void;
  onError: (
    word: string,
    given: string,
    correct: string,
  ) => void;
  say: (text: string) => void;
}

// ── Combine sub-component state ──
interface CombineState {
  input: string;
  result: "ok" | "no" | "fail" | null;
  attempts: number;
}

// ── Weave sub-component state ──
interface WeaveState {
  text: string;
  checked: boolean;
  found: string[];
  missed: string[];
}

const INITIAL_COMBINE: CombineState = {
  input: "",
  result: null,
  attempts: 0,
};

const INITIAL_WEAVE: WeaveState = {
  text: "",
  checked: false,
  found: [],
  missed: [],
};

/**
 * Combine + Weave section (Section 7).
 *
 * TWO PHASES:
 * 1. Combine: User writes a full French sentence from a hint.
 *    - norm() comparison against accepted answers.
 *    - 3 attempts max; after 3 fails show correct answer.
 * 2. Weave: User writes mixed French/English sentences.
 *    - Checks which "known" words the user wrote in French.
 *    - Shows sample answer and score (soft grading).
 */
export function CombineWeave({
  combine,
  weave,
  onComplete,
  onError,
  say,
}: CombineWeaveProps) {
  const hasWeave = weave && weave.length > 0;

  // Phase tracking
  const [phase, setPhase] = useState<Phase>("combine");

  // Combine state
  const [combineIndex, setCombineIndex] = useState(0);
  const [combineState, setCombineState] = useState<CombineState>(INITIAL_COMBINE);
  const [combineScore, setCombineScore] = useState(0);

  // Weave state
  const [weaveIndex, setWeaveIndex] = useState(0);
  const [weaveState, setWeaveState] = useState<WeaveState>(INITIAL_WEAVE);
  const [weaveScore, setWeaveScore] = useState(0);

  // ══════════════════════════════════════
  // PHASE 1: COMBINE
  // ══════════════════════════════════════
  if (phase === "combine") {
    const item = combine[combineIndex];
    if (!item) return null;

    const { input, result, attempts } = combineState;

    const handleCheck = () => {
      const match = item.accept.some((a) => norm(input) === norm(a));
      if (match) {
        setCombineState((s) => ({ ...s, result: "ok" }));
        setCombineScore((s) => s + 1);
      } else {
        const newAttempts = attempts + 1;
        if (newAttempts >= 3) {
          setCombineState((s) => ({
            ...s,
            result: "fail",
            attempts: newAttempts,
          }));
          onError(item.answer, input, item.answer);
        } else {
          setCombineState((s) => ({
            ...s,
            result: "no",
            attempts: newAttempts,
          }));
        }
      }
    };

    const handleNext = () => {
      if (combineIndex < combine.length - 1) {
        setCombineIndex((i) => i + 1);
        setCombineState(INITIAL_COMBINE);
      } else {
        // Done with combine phase
        if (hasWeave) {
          setPhase("weave");
          setCombineState(INITIAL_COMBINE);
        } else {
          onComplete(combineScore, combine.length);
        }
      }
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
      <View>
        <Text className="text-xs mb-2.5" style={{ color: P.ink3 }}>
          Combine · {combineIndex + 1}/{combine.length}
        </Text>

        <View
          className="rounded-2xl p-5 border"
          style={{ backgroundColor: P.paper, borderColor: P.border }}
        >
          {/* Hint box */}
          <View
            className="rounded-xl p-3 mb-3.5"
            style={{
              backgroundColor: P.pl,
              borderLeftWidth: 3,
              borderLeftColor: P.purple,
            }}
          >
            <Text
              className="text-sm leading-6"
              style={{ color: "#6B21A8" }}
            >
              {item.hint}
            </Text>
          </View>

          {/* Text input */}
          <TextInput
            value={input}
            onChangeText={(text) =>
              setCombineState((s) => ({ ...s, input: text, result: result === "no" ? null : result }))
            }
            placeholder="Write the French sentence..."
            placeholderTextColor={P.ink3}
            editable={result !== "ok" && result !== "fail"}
            className="rounded-xl text-base"
            style={{
              padding: 13,
              paddingHorizontal: 16,
              borderWidth: 1.5,
              borderColor:
                result === "ok"
                  ? P.green
                  : result === "no" || result === "fail"
                    ? P.red
                    : P.border,
              backgroundColor:
                result === "ok"
                  ? P.gl
                  : result === "fail"
                    ? P.rl
                    : P.paper,
              fontFamily: "serif",
              fontStyle: "italic",
              color: P.ink,
            }}
          />

          {/* Feedback for wrong attempt (not yet failed) */}
          {result === "no" && attempts < 3 && (
            <View
              className="rounded-lg mt-2 p-2.5"
              style={{ backgroundColor: P.al }}
            >
              <Text className="text-xs" style={{ color: "#92400E" }}>
                {attempts === 1
                  ? "Not quite — try again."
                  : `Hint: "${item.answer.split(" ").slice(0, 3).join(" ")}..."`}
              </Text>
            </View>
          )}

          {/* Correct feedback */}
          {result === "ok" && (
            <Text
              className="text-sm font-semibold text-center mt-2"
              style={{ color: P.green }}
            >
              Perfect!
            </Text>
          )}

          {/* Failed feedback — show correct answer */}
          {result === "fail" && (
            <Text className="text-sm text-center mt-2" style={{ color: P.red }}>
              Answer:{" "}
              <Text style={{ fontWeight: "700", fontFamily: "serif", fontStyle: "italic" }}>
                {item.answer}
              </Text>
            </Text>
          )}

          {/* Check button (visible when not yet resolved) */}
          {result !== "ok" && result !== "fail" && (
            <Btn onPress={handleCheck}>
              <Text className="text-white text-sm font-semibold">
                Check · {3 - attempts} tries
              </Text>
            </Btn>
          )}

          {/* Listen (after resolution) — speak the correct French sentence */}
          {(result === "ok" || result === "fail") && (
            <Pressable
              onPress={() => say(item.answer)}
              className="flex-row items-center self-center mt-2 px-2.5 py-1.5 rounded"
              style={{ backgroundColor: "#F0EEEC", gap: 4 }}
            >
              <Volume2 size={12} color={P.ink3} />
              <Text className="text-[10px]" style={{ color: P.ink3 }}>
                Listen
              </Text>
            </Pressable>
          )}

          {/* Next button (visible after resolution) */}
          {(result === "ok" || result === "fail") && (
            <Btn onPress={handleNext}>
              <Text className="text-white text-sm font-semibold">
                {combineIndex < combine.length - 1 ? "Next" : "Done"}
              </Text>
            </Btn>
          )}
        </View>
      </View>
      </KeyboardAvoidingView>
    );
  }

  // ══════════════════════════════════════
  // PHASE 2: WEAVE
  // ══════════════════════════════════════
  if (phase === "weave" && hasWeave) {
    const item = weave[weaveIndex];
    if (!item) return null;

    const { text, checked, found, missed } = weaveState;

    const handleCheckWeave = () => {
      const inputNorm = norm(text);
      const foundWords: string[] = [];
      const missedWords: string[] = [];

      item.known.forEach((w) => {
        if (inputNorm.includes(norm(w))) {
          foundWords.push(w);
        } else {
          missedWords.push(w);
        }
      });

      setWeaveState({
        text,
        checked: true,
        found: foundWords,
        missed: missedWords,
      });
      setWeaveScore((s) => s + foundWords.length);
    };

    const handleNext = () => {
      if (weaveIndex < weave.length - 1) {
        setWeaveIndex((i) => i + 1);
        setWeaveState(INITIAL_WEAVE);
      } else {
        // Both phases complete
        onComplete(combineScore, combine.length);
      }
    };

    const allFound = missed.length === 0 && checked;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
      <View>
        <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
          Weave · {weaveIndex + 1}/{weave.length}
        </Text>
        <Text className="text-xs mb-2.5 leading-5" style={{ color: P.purple }}>
          Translate this sentence. Write every word you know in French — leave the rest in
          English.
        </Text>

        <View
          className="rounded-2xl p-5 border"
          style={{ backgroundColor: P.paper, borderColor: P.border }}
        >
          {/* English sentence */}
          <View
            className="rounded-xl p-3.5 mb-3.5 items-center"
            style={{
              backgroundColor: "#EFF6FF",
              borderWidth: 1,
              borderColor: "#BFDBFE",
            }}
          >
            <Text
              className="text-base font-semibold text-center leading-6"
              style={{ color: P.ink }}
            >
              {item.en}
            </Text>
          </View>

          {/* Known words as tags */}
          <View className="flex-row flex-wrap mb-2.5" style={{ gap: 5 }}>
            {item.known.map((word) => (
              <View
                key={word}
                className="rounded-md px-2.5 py-1"
                style={{
                  backgroundColor: P.pl,
                  borderWidth: 1,
                  borderColor: P.purple + "30",
                }}
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
            value={text}
            onChangeText={(t) =>
              setWeaveState((s) => ({ ...s, text: t }))
            }
            placeholder="Write your Weave version..."
            placeholderTextColor={P.ink3}
            editable={!checked}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            className="rounded-xl text-base"
            style={{
              padding: 12,
              paddingHorizontal: 14,
              minHeight: 80,
              borderWidth: 1.5,
              borderColor: checked
                ? allFound
                  ? P.green
                  : P.amber
                : P.border,
              backgroundColor: checked
                ? allFound
                  ? P.gl
                  : P.al
                : P.paper,
              fontFamily: "serif",
              fontStyle: "italic",
              color: P.ink,
              lineHeight: 24,
            }}
          />

          {/* Results after checking */}
          {checked && (
            <View className="mt-3">
              {/* Sample answer */}
              <View
                className="rounded-lg p-3 mb-2.5"
                style={{ backgroundColor: P.pl }}
              >
                <Text
                  className="text-[10px] font-bold mb-1"
                  style={{
                    color: P.purple,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  Sample answer
                </Text>
                <Text
                  className="text-sm leading-6"
                  style={{
                    color: P.ink,
                    fontFamily: "serif",
                    fontStyle: "italic",
                  }}
                >
                  {item.sample}
                </Text>
              </View>

              {/* Found / Missed words */}
              <View className="flex-row mb-2" style={{ gap: 8 }}>
                {found.length > 0 && (
                  <View
                    className="flex-1 rounded-lg p-2.5"
                    style={{ backgroundColor: P.gl }}
                  >
                    <Text
                      className="text-[10px] font-bold mb-1"
                      style={{ color: P.green }}
                    >
                      You got these in French:
                    </Text>
                    <Text
                      className="text-xs"
                      style={{
                        color: P.green,
                        fontFamily: "serif",
                        fontStyle: "italic",
                      }}
                    >
                      {found.join(", ")}
                    </Text>
                  </View>
                )}
                {missed.length > 0 && (
                  <View
                    className="flex-1 rounded-lg p-2.5"
                    style={{ backgroundColor: P.rl }}
                  >
                    <Text
                      className="text-[10px] font-bold mb-1"
                      style={{ color: P.red }}
                    >
                      Next time, try:
                    </Text>
                    <Text
                      className="text-xs"
                      style={{
                        color: P.red,
                        fontFamily: "serif",
                        fontStyle: "italic",
                      }}
                    >
                      {missed.join(", ")}
                    </Text>
                  </View>
                )}
              </View>

              {/* Score summary */}
              <Text
                className="text-sm font-semibold text-center"
                style={{ color: allFound ? P.green : P.amber }}
              >
                {found.length}/{item.known.length} French words used
              </Text>
            </View>
          )}

          {/* Check button */}
          {!checked && (
            <Btn onPress={handleCheckWeave}>
              <Text className="text-white text-sm font-semibold">
                Check My Weave
              </Text>
            </Btn>
          )}

          {/* Listen (checked state) — speak the sample French sentence */}
          {checked && (
            <Pressable
              onPress={() => say(item.sample)}
              className="flex-row items-center self-center mt-2 px-2.5 py-1.5 rounded"
              style={{ backgroundColor: "#F0EEEC", gap: 4 }}
            >
              <Volume2 size={12} color={P.ink3} />
              <Text className="text-[10px]" style={{ color: P.ink3 }}>
                Listen
              </Text>
            </Pressable>
          )}

          {/* Next button */}
          {checked && (
            <Btn
              onPress={handleNext}
              color={allFound ? P.green : P.red}
            >
              <Text className="text-white text-sm font-semibold">
                {weaveIndex < weave.length - 1
                  ? "Next Sentence"
                  : "Done"}
              </Text>
            </Btn>
          )}
        </View>
      </View>
      </KeyboardAvoidingView>
    );
  }

  return null;
}
