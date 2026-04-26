import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Volume2 } from "lucide-react-native";
import { MCQ } from "@/components/MCQ";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import { looksFrench, extractFrenchQuote } from "@/lib/looksFrench";
import type { QuizItem } from "@/lib/types";

interface QuizProps {
  items: QuizItem[];
  onComplete: (score: number, total: number) => void;
  onError: (
    word: string,
    given: string,
    correct: string,
  ) => void;
  say: (text: string) => void;
}

/** Highlight keywords like NEVER, WRONG, NOT, DOES NOT in red within question text. */
function renderQuestion(text: string) {
  const keywords = ["NEVER", "WRONG", "NOT", "DOES NOT"];
  // Split on keywords while keeping the delimiters
  const regex = new RegExp(`(${keywords.join("|")})`, "g");
  const parts = text.split(regex);

  return (
    <Text
      className="text-base font-semibold text-center leading-6 mb-3"
      style={{ color: P.ink }}
    >
      {parts.map((part, i) =>
        keywords.includes(part) ? (
          <Text
            key={i}
            style={{
              color: P.red,
              fontWeight: "800",
              textDecorationLine: "underline",
            }}
          >
            {part}
          </Text>
        ) : (
          <Text key={i}>{part}</Text>
        ),
      )}
    </Text>
  );
}

/**
 * Quiz section (Section 6).
 * Shows quiz items one at a time with MCQ options.
 * Supports context hints, negative (spot-the-mistake) questions.
 * Tracks score and calls onComplete when all items are done.
 */
export function Quiz({ items, onComplete, onError, say }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const item = items[currentIndex];
  if (!item) return null;

  const answered = selected !== null;
  const isCorrect = selected === item.a;

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    if (option === item.a) {
      setScore((s) => s + 1);
    } else {
      onError(item.a, option, item.a);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    } else {
      // score already includes current item via setScore in handleSelect
      onComplete(score, items.length);
    }
  };

  return (
    <View>
      {/* Progress indicator */}
      <Text className="text-xs mb-2.5" style={{ color: P.ink3 }}>
        Quiz · {currentIndex + 1}/{items.length}
      </Text>

      <View
        className="rounded-2xl p-5 border"
        style={{
          backgroundColor: P.paper,
          borderColor: item.negative ? P.red + "30" : P.border,
        }}
      >
        {/* Negative badge */}
        {item.negative && (
          <View
            className="flex-row items-center rounded-md px-2.5 py-1.5 mb-2.5"
            style={{ backgroundColor: P.rl, gap: 5 }}
          >
            <Text
              className="text-xs font-bold"
              style={{ color: P.red, letterSpacing: 0.5 }}
            >
              SPOT THE MISTAKE
            </Text>
          </View>
        )}

        {/* Context */}
        {item.ctx && (
          <Text
            className="text-xs italic mb-2.5"
            style={{ color: P.amber }}
          >
            {item.ctx}
          </Text>
        )}

        {/* Question text with keyword highlighting */}
        {renderQuestion(item.q)}

        {/* Multiple choice options */}
        <MCQ
          options={item.o ?? []}
          correct={item.a}
          selected={selected}
          onSelect={handleSelect}
        />

        {/* Listen (feedback state) — speaks the answer when it's French, or the
            French phrase the question references (e.g. `What does 'merci
            beaucoup' mean?` → "merci beaucoup"). Hidden for ranking arrows. */}
        {answered &&
          (() => {
            const speakText =
              extractFrenchQuote(item.a) ??
              (looksFrench(item.a)
                ? item.a
                : extractFrenchQuote(item.q));
            if (!speakText) return null;
            return (
              <Pressable
                onPress={() => say(speakText)}
                className="flex-row items-center self-center mt-3 px-2.5 py-1.5 rounded"
                style={{ backgroundColor: "#F0EEEC", gap: 4 }}
              >
                <Volume2 size={12} color={P.ink3} />
                <Text className="text-[10px]" style={{ color: P.ink3 }}>
                  Listen
                </Text>
              </Pressable>
            );
          })()}

        {/* Next / Done button after answering */}
        {answered && (
          <Btn onPress={handleNext}>
            <Text className="text-white text-sm font-semibold">
              {currentIndex < items.length - 1 ? "Next" : "Done"}
            </Text>
          </Btn>
        )}
      </View>
    </View>
  );
}
