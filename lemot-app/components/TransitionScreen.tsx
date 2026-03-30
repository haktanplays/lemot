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
  score: number;
  total: number;
  message: string;
  onNext: () => void;
  unlock?: UnlockData | null;
}

export function TransitionScreen({
  score,
  total,
  message,
  onNext,
  unlock,
}: TransitionScreenProps) {
  const perfect = total > 0 && score === total;

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
        {total > 0 && (
          <View className="flex-row items-center gap-2 mb-3">
            <Star
              size={20}
              color={perfect ? P.amber : P.ink3}
              fill={perfect ? P.amber : "transparent"}
            />
            <Text className="text-2xl font-bold text-lm-ink">
              {score}/{total}
            </Text>
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

        <Btn onPress={onNext} style={{ marginTop: unlock ? 16 : 12 }}>
          <Text className="text-white text-sm font-semibold">Continue</Text>
        </Btn>
      </View>
    </ScrollView>
  );
}
