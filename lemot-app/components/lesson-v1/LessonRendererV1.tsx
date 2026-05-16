import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { router } from "expo-router";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import type { Lesson, LessonScreen } from "@/content/lessonTypes";
import { MeetCard } from "./screens/MeetCard";
import { InsightCard } from "./screens/InsightCard";
import { FillWithTraps } from "./screens/FillWithTraps";

const SCREEN_LABELS: Record<LessonScreen["type"], string> = {
  "meet-card": "Meet Card",
  "insight-card": "Insight Card",
  "fill-with-traps": "Fill With Traps",
  weave: "Weave",
  "say-it-your-way": "Say It Your Way",
  "natural-reveal": "Natural Reveal",
  recap: "Recap",
};

export function LessonRendererV1({ lesson }: { lesson: Lesson }) {
  const [screenIndex, setScreenIndex] = useState(0);
  const screen = lesson.screens[screenIndex];

  if (!screen) {
    return <CompletionView />;
  }

  const goNext = () => setScreenIndex((n) => n + 1);
  const total = lesson.screens.length;

  const placeholder = (
    <PlaceholderScreen
      lessonTitle={lesson.title}
      screen={screen}
      index={screenIndex}
      total={total}
      onContinue={goNext}
    />
  );

  switch (screen.type) {
    case "meet-card":
      return <MeetCard screen={screen} onContinue={goNext} />;
    case "insight-card":
      return <InsightCard screen={screen} onContinue={goNext} />;
    case "fill-with-traps":
      return <FillWithTraps screen={screen} onContinue={goNext} />;
    case "weave":
      return placeholder;
    case "say-it-your-way":
      return placeholder;
    case "natural-reveal":
      return placeholder;
    case "recap":
      return placeholder;
    default: {
      const _exhaustive: never = screen;
      return null;
    }
  }
}

function PlaceholderScreen({
  lessonTitle,
  screen,
  index,
  total,
  onContinue,
}: {
  lessonTitle: string;
  screen: LessonScreen;
  index: number;
  total: number;
  onContinue: () => void;
}) {
  const targetIds = screen.targetItemIds ?? [];
  const tags = screen.weakPointTags ?? [];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: P.bg }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
        v1 lesson scaffold
      </Text>
      <Text className="text-lg mb-4" style={{ color: P.ink }}>
        {lessonTitle}
      </Text>

      <View
        className="rounded-xl border"
        style={{
          backgroundColor: P.paper,
          borderColor: P.border,
          padding: 16,
        }}
      >
        <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
          {SCREEN_LABELS[screen.type]}
        </Text>
        <Text className="text-base mb-3" style={{ color: P.ink }}>
          This screen type is ready for implementation.
        </Text>

        <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
          Screen {index + 1} of {total}
        </Text>
        <Text className="text-xs mb-3" style={{ color: P.ink3 }}>
          id: {screen.id}
        </Text>

        {targetIds.length > 0 && (
          <Text className="text-xs mb-1" style={{ color: P.ink2 }}>
            target items: {targetIds.join(", ")}
          </Text>
        )}
        {tags.length > 0 && (
          <Text className="text-xs mb-1" style={{ color: P.ink2 }}>
            weak-point tags: {tags.join(", ")}
          </Text>
        )}
      </View>

      <Btn onPress={onContinue}>
        <Text style={{ color: P.paper, fontSize: 15 }}>Continue</Text>
      </Btn>
    </ScrollView>
  );
}

function CompletionView() {
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: P.bg,
        padding: 20,
        justifyContent: "center",
      }}
    >
      <View
        className="rounded-xl border"
        style={{
          backgroundColor: P.paper,
          borderColor: P.border,
          padding: 20,
        }}
      >
        <Text className="text-base mb-2" style={{ color: P.ink }}>
          Lesson scaffold complete.
        </Text>
        <Text className="text-sm" style={{ color: P.ink2 }}>
          You reached the end of this v1 lesson flow.
        </Text>
        <Btn onPress={goBack}>
          <Text style={{ color: P.paper, fontSize: 15 }}>Back</Text>
        </Btn>
      </View>
    </View>
  );
}
