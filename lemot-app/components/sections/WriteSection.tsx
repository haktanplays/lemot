import { useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { ArrowRight, Volume2 } from "lucide-react-native";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import { norm } from "@/lib/normalize";
import type { FillItem } from "@/lib/types";

interface WriteSectionProps {
  items: FillItem[];
  onComplete: (score: number, total: number) => void;
  onError: (
    word: string,
    section: string,
    given: string,
    correct: string
  ) => void;
  say: (text: string) => void;
}

type CheckResult = "ok" | "no" | null;

/**
 * Section 4: Write
 *
 * Reuses the fillBlanks data. Shows the sentence with a blank and context.
 * The user types the missing word from memory. Answer is compared using
 * norm() for flexible matching (strips accents, punctuation, whitespace).
 */
export function WriteSection({
  items,
  onComplete,
  onError,
  say,
}: WriteSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<CheckResult>(null);
  const [score, setScore] = useState(0);

  const item = items[currentIndex];
  if (!item) return null;
  const isLast = currentIndex >= items.length - 1;

  const handleCheck = () => {
    if (norm(input) === norm(item.a)) {
      setResult("ok");
      setScore((s) => s + 1);
    } else {
      setResult("no");
      onError(item.a, "write", input, item.a);
    }
  };

  const handleNext = () => {
    if (isLast) {
      const finalScore = score;
      onComplete(finalScore, items.length);
    } else {
      setCurrentIndex((i) => i + 1);
      setInput("");
      setResult(null);
    }
  };

  /** Border and background colors based on check result */
  const inputBorderColor =
    result === "ok" ? P.green : result === "no" ? P.red : P.border;
  const inputBgColor =
    result === "ok" ? P.gl : result === "no" ? P.rl : P.paper;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
    <View>
      {/* Progress indicator */}
      <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
        Write {"\u00B7"} {currentIndex + 1}/{items.length}
      </Text>
      <Text className="text-xs mb-2.5" style={{ color: P.ink2 }}>
        Type the missing word from memory.
      </Text>

      <View
        className="rounded-xl border"
        style={{
          backgroundColor: P.paper,
          borderColor: P.border,
          padding: 20,
        }}
      >
        {/* Context */}
        {item.ctx ? (
          <Text
            className="text-xs italic mb-3"
            style={{ color: P.amber }}
          >
            {item.ctx}
          </Text>
        ) : null}

        {/* Sentence with blank */}
        <Text
          className="text-base font-medium text-center mb-4"
          style={{ fontFamily: "serif", color: P.ink }}
        >
          {item.s}
        </Text>

        {/* Text input */}
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type the missing word..."
          placeholderTextColor={P.ink3}
          editable={result === null}
          autoCapitalize="none"
          autoCorrect={false}
          className="rounded-xl text-base"
          style={{
            paddingVertical: 13,
            paddingHorizontal: 16,
            borderWidth: 1.5,
            borderColor: inputBorderColor,
            backgroundColor: inputBgColor,
            fontFamily: "serif",
            fontStyle: "italic",
            color: P.ink,
          }}
        />

        {/* Result feedback */}
        {result === "ok" && (
          <Text
            className="text-center text-sm font-semibold mt-2"
            style={{ color: P.green }}
          >
            Correct!
          </Text>
        )}
        {result === "no" && (
          <Text
            className="text-center text-sm mt-2"
            style={{ color: P.red }}
          >
            Answer:{" "}
            <Text className="font-bold" style={{ fontFamily: "serif" }}>
              {item.a}
            </Text>
          </Text>
        )}

        {/* Listen (feedback state) — speak the full sentence with the blank filled */}
        {result !== null && (
          <Pressable
            onPress={() => say(item.s.replace(/\[___\]|_{2,}/g, item.a))}
            className="flex-row items-center self-center mt-2 px-2.5 py-1.5 rounded"
            style={{ backgroundColor: "#F0EEEC", gap: 4 }}
          >
            <Volume2 size={12} color={P.ink3} />
            <Text className="text-[10px]" style={{ color: P.ink3 }}>
              Listen
            </Text>
          </Pressable>
        )}

        {/* Check button (before checking) */}
        {result === null && (
          <Btn onPress={handleCheck} disabled={input.trim().length === 0}>
            <Text className="text-white text-sm font-semibold">Check</Text>
          </Btn>
        )}

        {/* Next/Done button (after checking) */}
        {result !== null && (
          <Btn onPress={handleNext}>
            <Text className="text-white text-sm font-semibold">
              {isLast ? "Done" : "Next"}
            </Text>
            <ArrowRight size={15} color="#fff" />
          </Btn>
        )}
      </View>
    </View>
    </KeyboardAvoidingView>
  );
}
