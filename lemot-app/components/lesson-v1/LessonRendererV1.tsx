import { useState } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import type { Lesson } from "@/content/lessonTypes";
import { MeetCard } from "./screens/MeetCard";
import { InsightCard } from "./screens/InsightCard";
import { FillWithTraps } from "./screens/FillWithTraps";
import { Weave } from "./screens/Weave";
import { NaturalReveal } from "./screens/NaturalReveal";
import { SayItYourWayV1 } from "./screens/SayItYourWayV1";
import { RecapCard } from "./screens/RecapCard";

export function LessonRendererV1({ lesson }: { lesson: Lesson }) {
  const [screenIndex, setScreenIndex] = useState(0);
  const screen = lesson.screens[screenIndex];

  if (!screen) {
    return <CompletionView />;
  }

  const goNext = () => setScreenIndex((n) => n + 1);

  switch (screen.type) {
    case "meet-card":
      return <MeetCard screen={screen} onContinue={goNext} />;
    case "insight-card":
      return <InsightCard screen={screen} onContinue={goNext} />;
    case "fill-with-traps":
      return <FillWithTraps screen={screen} onContinue={goNext} />;
    case "weave":
      return <Weave screen={screen} onContinue={goNext} />;
    case "say-it-your-way":
      return <SayItYourWayV1 screen={screen} onContinue={goNext} />;
    case "natural-reveal":
      return <NaturalReveal screen={screen} onContinue={goNext} />;
    case "recap":
      return <RecapCard screen={screen} onContinue={goNext} />;
    default: {
      const _exhaustive: never = screen;
      return null;
    }
  }
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
