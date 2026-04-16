import { useState } from "react";
import { View, Text } from "react-native";
import { ArrowRight } from "lucide-react-native";
import { MCQ } from "@/components/MCQ";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import type { FillItem } from "@/lib/types";

interface FrenchFillProps {
  items: FillItem[];
  onComplete: (score: number, total: number) => void;
  onError: (
    word: string,
    section: string,
    given: string,
    correct: string
  ) => void;
}

/**
 * Section 3: French Fill
 *
 * Same structure as WeaveFill, but sentences are fully in French.
 * Uses underscore _ as the blank marker instead of [___].
 * The user picks the correct word from multiple choice options.
 */
export function FrenchFill({ items, onComplete, onError }: FrenchFillProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const item = items[currentIndex];
  if (!item) return null;
  const isLast = currentIndex >= items.length - 1;

  const handleSelect = (opt: string) => {
    setSelected(opt);
    if (opt === item.a) {
      setScore((s) => s + 1);
    } else {
      onError(item.a, "fill_fr", opt, item.a);
    }
  };

  const handleNext = () => {
    if (isLast) {
      const finalScore = score;
      onComplete(finalScore, items.length);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    }
  };

  return (
    <View>
      {/* Progress indicator */}
      <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
        French Fill {"\u00B7"} {currentIndex + 1}/{items.length}
      </Text>
      <Text className="text-xs mb-2.5" style={{ color: P.ink2 }}>
        Now fully in French. Use the situation to guide your answer.
      </Text>

      <View
        className="rounded-xl border"
        style={{
          backgroundColor: P.paper,
          borderColor: P.border,
          padding: 20,
        }}
      >
        {/* Situation context */}
        {item.ctx ? (
          <Text
            className="text-xs italic mb-3"
            style={{ color: P.amber }}
          >
            Situation: {item.ctx}
          </Text>
        ) : null}

        {/* Sentence with blank */}
        <Text
          className="text-base font-medium text-center mb-4"
          style={{ fontFamily: "serif", color: P.ink }}
        >
          {item.s}
        </Text>

        {/* Multiple choice */}
        <MCQ
          options={item.o ?? []}
          correct={item.a}
          selected={selected}
          onSelect={handleSelect}
        />

        {/* Next/Done button (only after answering) */}
        {selected !== null && (
          <Btn onPress={handleNext}>
            <Text className="text-white text-sm font-semibold">
              {isLast ? "Done" : "Next"}
            </Text>
            <ArrowRight size={15} color="#fff" />
          </Btn>
        )}
      </View>
    </View>
  );
}
