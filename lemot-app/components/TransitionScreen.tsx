import { View, Text } from "react-native";
import { Star } from "lucide-react-native";
import { Btn } from "./Btn";
import { P } from "@/constants/theme";

interface TransitionScreenProps {
  score: number;
  total: number;
  message: string;
  onNext: () => void;
}

export function TransitionScreen({
  score,
  total,
  message,
  onNext,
}: TransitionScreenProps) {
  const perfect = total > 0 && score === total;

  return (
    <View className="flex-1 items-center justify-center px-8">
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
        <Btn onPress={onNext}>
          <Text className="text-white text-sm font-semibold">Continue</Text>
        </Btn>
      </View>
    </View>
  );
}
