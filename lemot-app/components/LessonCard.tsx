import { View, Text, Pressable } from "react-native";
import { Lock, ArrowRight } from "lucide-react-native";
import { P } from "@/constants/theme";
import { SECS } from "@/constants/sections";
import type { Difficulty } from "@/lib/types";

const DIFF_STYLES: Record<Difficulty, { label: string; bg: string; color: string }> = {
  easy: { label: "Easy", bg: P.gl, color: P.green },
  medium: { label: "Medium", bg: P.al, color: P.amber },
  hard: { label: "Hard", bg: P.pl, color: P.purple },
};

interface LessonCardProps {
  id: number;
  title: string;
  sub: string;
  progress: number; // completed sections count
  difficulty?: Difficulty;
  locked?: boolean;
  onPress: () => void;
}

export function LessonCard({
  id,
  title,
  sub,
  progress,
  difficulty,
  locked = false,
  onPress,
}: LessonCardProps) {
  const total = SECS.length;
  const pct = total > 0 ? (progress / total) * 100 : 0;
  const done = progress === total;

  return (
    <Pressable
      onPress={locked ? undefined : onPress}
      className="bg-lm-paper rounded-xl mb-3 border border-lm-border overflow-hidden"
      style={{ opacity: locked ? 0.5 : 1 }}
    >
      <View className="p-4">
        <View className="flex-row items-center justify-between mb-1">
          <View className="flex-row items-center gap-2">
            <View
              className="w-7 h-7 rounded-full items-center justify-center"
              style={{
                backgroundColor: done ? P.gl : P.rl,
              }}
            >
              <Text
                className="text-xs font-bold"
                style={{ color: done ? P.green : P.red }}
              >
                {id}
              </Text>
            </View>
            <Text className="text-base font-semibold text-lm-ink">
              {title}
            </Text>
            {difficulty && (
              <View
                className="px-2 py-0.5 rounded-full"
                style={{ backgroundColor: DIFF_STYLES[difficulty].bg }}
              >
                <Text
                  className="text-[9px] font-bold"
                  style={{ color: DIFF_STYLES[difficulty].color }}
                >
                  {DIFF_STYLES[difficulty].label}
                </Text>
              </View>
            )}
          </View>
          {locked ? (
            <Lock size={16} color={P.ink3} />
          ) : (
            <ArrowRight size={16} color={P.ink3} />
          )}
        </View>
        <Text className="text-xs text-lm-ink3 ml-9 mb-2">{sub}</Text>

        {/* Progress bar */}
        <View className="ml-9 h-1.5 rounded-full bg-lm-border overflow-hidden">
          <View
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              backgroundColor: done ? P.green : P.red,
            }}
          />
        </View>
        <Text className="text-[10px] text-lm-ink3 ml-9 mt-1">
          {progress}/{total} sections
        </Text>
      </View>
    </Pressable>
  );
}
