import { View, Text, Pressable, Modal } from "react-native";
import { X } from "lucide-react-native";
import { MCQ } from "./MCQ";
import { Btn } from "./Btn";
import { P } from "@/constants/theme";
import { FLASH } from "@/data/flashcards";

export interface ReviewQuestion {
  q: string;
  a: string;
  o: string[];
  word: string;
  weak: boolean;
}

interface DailyReviewOverlayProps {
  visible: boolean;
  items: ReviewQuestion[];
  currentIdx: number;
  answer: string | null;
  onAnswer: (ans: string) => void;
  onNext: () => void;
  onClose: () => void;
}

export function DailyReviewOverlay({
  visible,
  items,
  currentIdx,
  answer,
  onAnswer,
  onNext,
  onClose,
}: DailyReviewOverlayProps) {
  if (!visible || items.length === 0) return null;

  const item = items[currentIdx];
  if (!item) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/50 px-6">
        <View className="bg-lm-paper rounded-2xl p-5 w-full max-w-md">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-base font-bold text-lm-ink">
              Daily Review
            </Text>
            <Pressable onPress={onClose} className="p-1">
              <X size={20} color={P.ink3} />
            </Pressable>
          </View>

          {/* Progress */}
          <Text className="text-xs text-lm-ink3 mb-3">
            {currentIdx + 1} / {items.length}
          </Text>

          {/* Weak spot badge */}
          {item.weak && (
            <View className="bg-lm-amber-light rounded-lg px-3 py-1.5 mb-3 self-start">
              <Text className="text-xs text-lm-amber font-semibold">
                Weak spot
              </Text>
            </View>
          )}

          {/* Question */}
          <Text className="text-sm font-semibold text-lm-ink mb-1">
            {item.q}
          </Text>

          <MCQ
            options={item.o}
            correct={item.a}
            selected={answer}
            onSelect={onAnswer}
          />

          {answer !== null && (
            <Btn onPress={onNext}>
              <Text className="text-white text-sm font-semibold">
                {currentIdx >= items.length - 1 ? "Done" : "Next"}
              </Text>
            </Btn>
          )}
        </View>
      </View>
    </Modal>
  );
}

/**
 * Generate review items from flashcards + weak spots.
 */
export function genReviewItems(
  count: number,
  weakSpots: { word: string; count: number }[]
): ReviewQuestion[] {
  const ws = weakSpots.map((w) => w.word);
  const pool = [...FLASH].sort(() => Math.random() - 0.5);
  const ordered = [
    ...pool.filter((f) => ws.includes(f.fr)),
    ...pool.filter((f) => !ws.includes(f.fr)),
  ];

  const items: ReviewQuestion[] = [];
  for (let i = 0; i < Math.min(count, ordered.length); i++) {
    const w = ordered[i];
    const others = FLASH.filter((f) => f.fr !== w.fr)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((f) => f.en);
    const opts = [w.en, ...others].sort(() => Math.random() - 0.5);
    const isWeak = ws.includes(w.fr);
    items.push({
      q: `What does "${w.fr}" mean?`,
      a: w.en,
      o: opts,
      word: w.fr,
      weak: isWeak,
    });
  }
  return items;
}
