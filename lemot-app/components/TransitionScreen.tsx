import { View, Text, ScrollView } from "react-native";
import { Star, Sparkles } from "lucide-react-native";
import { Btn } from "./Btn";
import { P } from "@/constants/theme";
import { UnlockCard, type UnlockType } from "./UnlockCard";

export interface UnlockData {
  type: UnlockType;
  data: any;
}

interface TransitionScreenProps {
  /** Items the user got right. */
  correctCount: number;
  /** Total items in the section (also the completed count — sections cannot be skipped). */
  totalCount: number;
  message: string;
  onNext: () => void;
  unlock?: UnlockData | null;
  mastered?: boolean; // true = passed mastery threshold, false = below threshold
  onRetry?: () => void; // callback to retry current section
}

export function TransitionScreen({
  correctCount,
  totalCount,
  message,
  onNext,
  unlock,
  mastered = true,
  onRetry,
}: TransitionScreenProps) {
  // Perfect = perfect accuracy, not just completion. Sections cannot be
  // skipped, so completion is always totalCount/totalCount; accuracy is
  // the meaningful axis here.
  const perfect = totalCount > 0 && correctCount === totalCount;
  const belowThreshold = totalCount > 0 && !mastered;

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 32,
        paddingVertical: 24,
      }}
    >
      <View className="bg-lm-paper rounded-2xl p-8 w-full items-center border border-lm-border">
        {totalCount > 0 && (
          <View className="items-center mb-3" style={{ gap: 2 }}>
            <Text className="text-sm text-lm-ink3">
              {totalCount}/{totalCount} done
            </Text>
            <View className="flex-row items-center gap-2">
              <Star
                size={20}
                color={perfect ? P.amber : P.ink3}
                fill={perfect ? P.amber : "transparent"}
              />
              <Text className="text-2xl font-bold text-lm-ink">
                {correctCount}/{totalCount} correct
              </Text>
            </View>
          </View>
        )}
        <Text className="text-sm text-lm-ink2 text-center leading-6 mb-4">
          {message}
        </Text>

        {unlock && (
          <View className="w-full">
            <View className="flex-row items-center justify-center gap-1.5 mb-1">
              <Sparkles size={14} color={P.amber} />
              <Text className="text-xs font-bold text-lm-amber">
                Unlocked!
              </Text>
            </View>
            <UnlockCard type={unlock.type} data={unlock.data} />
          </View>
        )}

        {belowThreshold && (
          <View className="w-full rounded-lg px-3 py-2 mb-3" style={{ backgroundColor: P.amber + "15" }}>
            <Text className="text-xs text-center" style={{ color: P.amber }}>
              You need a bit more practice on this section to master it.
            </Text>
          </View>
        )}

        <View className="w-full" style={{ gap: 8, marginTop: unlock ? 16 : 12 }}>
          {belowThreshold && onRetry && (
            <Btn onPress={onRetry} color={P.amber}>
              <Text className="text-white text-sm font-semibold">Try Again</Text>
            </Btn>
          )}
          <Btn onPress={onNext}>
            <Text className="text-white text-sm font-semibold">
              {belowThreshold ? "Continue Anyway" : "Continue"}
            </Text>
          </Btn>
        </View>
      </View>
    </ScrollView>
  );
}
