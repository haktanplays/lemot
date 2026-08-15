import { View, Text } from "react-native";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction } from "@/components/ui/actions";
import { P, SPACE } from "@/constants/theme";
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
  "lesson-goal": "Your goal",
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
    <LessonScreenFrame
      footer={<PrimaryAction label="Continue" onPress={onContinue} />}
    >
      {/* A small thing worth noticing, not an unlock and not a grammar chapter.
          The card-inside-a-card stack is gone: a kicker, an editorial title, a
          hairline and quiet body carry the whole screen, and the examples sit
          as flat rows so the French in them stays the thing you look at. */}
      <Text
        style={{
          color: P.ink3,
          fontSize: 12,
          letterSpacing: 0.4,
          marginBottom: SPACE.sm,
        }}
      >
        {INSIGHT_LABELS[payload.insightType]}
      </Text>

      <Text
        style={{
          color: P.ink,
          fontFamily: "serif",
          fontSize: 21,
          lineHeight: 29,
        }}
      >
        {payload.title}
      </Text>

      <View
        style={{
          height: 1,
          backgroundColor: P.border,
          marginTop: SPACE.lg,
          marginBottom: SPACE.lg,
        }}
      />

      <Text style={{ color: P.ink2, fontSize: 15, lineHeight: 23 }}>
        {payload.body}
      </Text>

      {examples.length > 0 && (
        <View style={{ marginTop: SPACE.xl }}>
          {examples.map((ex, i) => (
            <View
              key={i}
              style={{
                marginTop: i === 0 ? 0 : SPACE.lg,
                paddingTop: i === 0 ? 0 : SPACE.lg,
                borderTopWidth: i === 0 ? 0 : 1,
                borderTopColor: P.border,
              }}
            >
              {ex.fr && (
                <Text
                  style={{
                    color: P.ink,
                    fontFamily: "serif",
                    fontStyle: "italic",
                    fontSize: 17,
                    lineHeight: 26,
                  }}
                >
                  {ex.fr}
                </Text>
              )}
              {ex.en && (
                <Text
                  style={{
                    color: P.ink2,
                    fontSize: 14,
                    lineHeight: 21,
                    marginTop: SPACE.xs,
                  }}
                >
                  {ex.en}
                </Text>
              )}
              {ex.note && (
                <Text
                  style={{
                    color: P.ink3,
                    fontSize: 12,
                    lineHeight: 18,
                    marginTop: SPACE.sm,
                  }}
                >
                  {ex.note}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

    </LessonScreenFrame>
  );
}
