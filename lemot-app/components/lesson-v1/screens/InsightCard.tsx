import { View, Text, ScrollView } from "react-native";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import type {
  InsightCardScreen,
  InsightType,
} from "@/content/lessonTypes";

const INSIGHT_LABELS: Record<InsightType, string> = {
  "sound-writing": "Sound / Writing",
  "grammar-nugget": "Why this works",
  "micro-contrast": "Small difference",
  "culture-bite": "Natural use",
  "faux-ami": "False friend",
  cognate: "Pattern link",
};

export function InsightCard({
  screen,
  onContinue,
}: {
  screen: InsightCardScreen;
  onContinue: () => void;
}) {
  const { payload } = screen;
  const examples = payload.examples ?? [];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: P.bg }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text className="text-xs mb-2" style={{ color: P.ink3 }}>
        {INSIGHT_LABELS[payload.insightType]}
      </Text>

      <View
        className="rounded-xl border"
        style={{
          backgroundColor: P.paper,
          borderColor: P.border,
          padding: 18,
        }}
      >
        <Text className="text-base mb-2" style={{ color: P.ink }}>
          {payload.title}
        </Text>
        <Text
          className="text-sm"
          style={{ color: P.ink2, lineHeight: 20 }}
        >
          {payload.body}
        </Text>

        {examples.length > 0 && (
          <View className="mt-4">
            {examples.map((ex, i) => (
              <View
                key={i}
                className="rounded-lg border mt-2"
                style={{
                  backgroundColor: P.bg,
                  borderColor: P.border,
                  padding: 12,
                }}
              >
                {ex.fr && (
                  <Text
                    style={{
                      color: P.ink,
                      fontFamily: "serif",
                      fontStyle: "italic",
                    }}
                  >
                    {ex.fr}
                  </Text>
                )}
                {ex.en && (
                  <Text
                    className="text-sm mt-1"
                    style={{ color: P.ink2 }}
                  >
                    {ex.en}
                  </Text>
                )}
                {ex.note && (
                  <Text
                    className="text-xs mt-2"
                    style={{ color: P.ink3 }}
                  >
                    {ex.note}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </View>

      <Btn onPress={onContinue}>
        <Text style={{ color: P.paper, fontSize: 15 }}>Continue</Text>
      </Btn>
    </ScrollView>
  );
}
