import { View, Text } from "react-native";
import { P } from "@/constants/theme";
import type { Milestone } from "@/lib/types";

interface MilestoneCardProps {
  milestone: Milestone;
  earned: boolean;
}

export function MilestoneCard({ milestone, earned }: MilestoneCardProps) {
  return (
    <View
      className="rounded-xl mr-3 p-3 border"
      style={{
        width: 160,
        backgroundColor: earned ? P.gl : P.paper,
        borderColor: earned ? P.green : P.border,
        opacity: earned ? 1 : 0.6,
      }}
    >
      <Text className="text-2xl mb-1">{milestone.icon}</Text>
      <Text
        className="text-xs font-bold mb-0.5"
        style={{ color: earned ? P.green : P.ink }}
      >
        {milestone.title}
      </Text>
      <Text className="text-[10px] text-lm-ink2 leading-4">
        {milestone.desc}
      </Text>
    </View>
  );
}
