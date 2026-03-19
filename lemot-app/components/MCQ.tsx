import { View, Text, Pressable } from "react-native";
import { Check, X } from "lucide-react-native";
import { P } from "@/constants/theme";

interface MCQProps {
  options: string[];
  correct: string;
  selected: string | null;
  onSelect: (option: string) => void;
  context?: string;
  negative?: boolean;
}

/**
 * Multiple choice question with visual feedback.
 * Shows green for correct, red for incorrect after selection.
 */
export function MCQ({
  options,
  correct,
  selected,
  onSelect,
  context,
  negative,
}: MCQProps) {
  const answered = selected !== null;

  return (
    <View className="mt-3">
      {context && (
        <Text className="text-xs text-lm-ink3 mb-2 italic">{context}</Text>
      )}
      {negative && (
        <View className="bg-lm-amber-light rounded-lg px-3 py-2 mb-2">
          <Text className="text-xs text-lm-amber font-semibold">
            Spot the WRONG answer
          </Text>
        </View>
      )}
      {options.map((opt, i) => {
        const isCorrect = opt === correct;
        const isSelected = opt === selected;
        const showGreen = answered && isCorrect;
        const showRed = answered && isSelected && !isCorrect;

        return (
          <Pressable
            key={i}
            onPress={() => !answered && onSelect(opt)}
            className="rounded-xl mb-2 border"
            style={{
              paddingVertical: 12,
              paddingHorizontal: 14,
              backgroundColor: showGreen
                ? P.gl
                : showRed
                  ? P.rl
                  : P.paper,
              borderColor: showGreen
                ? P.green
                : showRed
                  ? P.red
                  : P.border,
              opacity: answered && !isCorrect && !isSelected ? 0.5 : 1,
            }}
          >
            <View className="flex-row items-center justify-between">
              <Text
                className="text-sm flex-1"
                style={{
                  color: showGreen
                    ? P.green
                    : showRed
                      ? P.red
                      : P.ink,
                  fontWeight: isSelected || showGreen ? "600" : "400",
                }}
              >
                {opt}
              </Text>
              {showGreen && <Check size={16} color={P.green} />}
              {showRed && <X size={16} color={P.red} />}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
