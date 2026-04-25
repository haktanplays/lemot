import { useState, useEffect, useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { Volume2 } from "lucide-react-native";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import type { BuildItem } from "@/lib/types";

interface BuildSentenceProps {
  items: BuildItem[];
  onComplete: (score: number, total: number) => void;
  onError: (
    word: string,
    given: string,
    correct: string,
  ) => void;
  say: (text: string) => void;
}

/**
 * Build Sentence section (Section 5).
 * User taps word chips to assemble a French sentence from a shuffled pool.
 * Pool contains correct words + trap words. Tap to move between pool and answer.
 */
export function BuildSentence({
  items,
  onComplete,
  onError,
  say,
}: BuildSentenceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [pool, setPool] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const item = items[currentIndex];

  // Shuffle pool when item changes
  const initPool = useCallback(() => {
    const current = items[currentIndex];
    if (!current) return;
    const allWords = [...current.c, ...(current.trap || [])];
    // Fisher-Yates shuffle
    for (let i = allWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
    }
    setPool(allWords);
    setSelectedWords([]);
    setChecked(false);
  }, [currentIndex, items]);

  useEffect(() => {
    initPool();
  }, [initPool]);

  if (!item) return null;

  const isCorrect = selectedWords.join(" ") === item.c.join(" ");

  const tapPoolWord = (index: number) => {
    if (checked) return;
    const word = pool[index];
    setSelectedWords((prev) => [...prev, word]);
    setPool((prev) => prev.filter((_, i) => i !== index));
  };

  const tapSelectedWord = (index: number) => {
    if (checked) return;
    const word = selectedWords[index];
    setPool((prev) => [...prev, word]);
    setSelectedWords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheck = () => {
    setChecked(true);
    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      onError(
        item.c.join(" "),
        selectedWords.join(" "),
        item.c.join(" "),
      );
    }
  };

  // Since setScore is async, we compute the final score manually
  // to account for the current item's result not yet being in state.
  const handleNext = () => {
    const currentItemScore = isCorrect ? 1 : 0;
    if (currentIndex < items.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      onComplete(score + currentItemScore, items.length);
    }
  };

  return (
    <View>
      {/* Progress indicator */}
      <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
        Build · {currentIndex + 1}/{items.length}
      </Text>
      <Text className="text-xs mb-3" style={{ color: P.ink2 }}>
        Arrange words into a French sentence. Some words don't belong!
      </Text>

      <View
        className="rounded-2xl p-5 border"
        style={{
          backgroundColor: P.paper,
          borderColor: P.border,
        }}
      >
        {/* English prompt */}
        <Text
          className="text-sm font-semibold text-center mb-3"
          style={{ color: P.amber }}
        >
          {item.en}
        </Text>

        {/* Answer zone — where selected words appear */}
        <View
          className="rounded-xl p-2 mb-3 flex-row flex-wrap"
          style={{
            minHeight: 48,
            borderWidth: 2,
            borderStyle: "dashed",
            borderColor: checked
              ? isCorrect
                ? P.green + "60"
                : P.red + "60"
              : P.border,
            backgroundColor: checked
              ? isCorrect
                ? P.gl
                : P.rl
              : "transparent",
            gap: 6,
          }}
        >
          {selectedWords.length === 0 && !checked && (
            <Text className="text-xs py-1.5" style={{ color: P.ink3 }}>
              Tap the words
            </Text>
          )}
          {selectedWords.map((word, i) => (
            <Pressable
              key={`sel-${i}`}
              onPress={() => tapSelectedWord(i)}
              disabled={checked}
              className="rounded-lg"
              style={{
                paddingVertical: 12,
                paddingHorizontal: 12,
                minHeight: 44,
                backgroundColor: P.rl,
                borderWidth: 1,
                borderColor: P.rb,
              }}
            >
              <Text
                className="text-sm font-medium"
                style={{ color: P.red, fontFamily: "serif", fontStyle: "italic" }}
              >
                {word}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Word pool */}
        <View
          className="flex-row flex-wrap justify-center mb-3"
          style={{ gap: 6 }}
        >
          {pool.map((word, i) => (
            <Pressable
              key={`pool-${i}`}
              onPress={() => tapPoolWord(i)}
              disabled={checked}
              className="rounded-lg"
              style={{
                paddingVertical: 12,
                paddingHorizontal: 12,
                minHeight: 44,
                backgroundColor: "#F0EEEC",
                borderWidth: 1,
                borderColor: P.border,
              }}
            >
              <Text
                className="text-sm font-medium"
                style={{ color: P.ink, fontFamily: "serif", fontStyle: "italic" }}
              >
                {word}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Check button — only if not yet checked and user selected at least one word */}
        {!checked && selectedWords.length > 0 && (
          <Btn onPress={handleCheck}>
            <Text className="text-white text-sm font-semibold">Check</Text>
          </Btn>
        )}

        {/* Result feedback + Next button */}
        {checked && (
          <>
            <Text
              className="text-sm font-semibold text-center mt-2"
              style={{ color: isCorrect ? P.green : P.red }}
            >
              {isCorrect ? "Correct!" : `Answer: ${item.c.join(" ")}`}
            </Text>

            {/* Listen — speak the full correct French sentence */}
            <Pressable
              onPress={() => say(item.c.join(" "))}
              className="flex-row items-center self-center mt-2 px-2.5 py-1.5 rounded"
              style={{ backgroundColor: "#F0EEEC", gap: 4 }}
            >
              <Volume2 size={12} color={P.ink3} />
              <Text className="text-[10px]" style={{ color: P.ink3 }}>
                Listen
              </Text>
            </Pressable>

            <Btn onPress={handleNext}>
              <Text className="text-white text-sm font-semibold">
                {currentIndex < items.length - 1 ? "Next" : "Done"}
              </Text>
            </Btn>
          </>
        )}
      </View>
    </View>
  );
}
