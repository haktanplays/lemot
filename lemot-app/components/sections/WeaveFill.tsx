import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { ArrowRight, Volume2 } from "lucide-react-native";
import { MCQ } from "@/components/MCQ";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import type { FillItem } from "@/lib/types";

interface WeaveFillProps {
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

/**
 * Section 2: Weave Fill
 *
 * Shows sentences that mix English and French with a [___] blank.
 * The user picks the correct French word from multiple choice options.
 * Tracks score and advances through items one at a time.
 */
export function WeaveFill({
  items,
  onComplete,
  onError,
  say,
}: WeaveFillProps) {
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
      onError(item.a, "fill_fg", opt, item.a);
    }
  };

  const handleNext = () => {
    if (isLast) {
      // Final score includes the current answer
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
        Weave Fill {"\u00B7"} {currentIndex + 1}/{items.length}
      </Text>
      <Text className="text-xs font-medium mb-2.5" style={{ color: P.purple }}>
        Replace the blank with the correct French word.
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

        {/* Listen (feedback state) — Weave sentences are intentionally English+French.
            Speak the full French equivalent (`fr`) when authored; fall back to just the
            answer word so fr-FR TTS isn't applied to mixed-language text. */}
        {selected !== null && (
          <Pressable
            onPress={() => say(item.fr ?? item.a)}
            className="flex-row items-center self-center mt-3 px-2.5 py-1.5 rounded"
            style={{ backgroundColor: "#F0EEEC", gap: 4 }}
          >
            <Volume2 size={12} color={P.ink3} />
            <Text className="text-[10px]" style={{ color: P.ink3 }}>
              Listen
            </Text>
          </Pressable>
        )}

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
