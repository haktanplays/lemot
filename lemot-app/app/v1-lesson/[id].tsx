import { View, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { P } from "@/constants/theme";
import { useApp } from "@/providers/AppProvider";
import { LessonRendererV1 } from "@/components/lesson-v1/LessonRendererV1";
import { LearningPausedPanel } from "@/components/learning-engine/LearningPausedPanel";
import { getV1LessonById } from "@/content/lessons/v1";

export default function V1LessonRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { learningPaused } = useApp();
  const lesson = id ? getV1LessonById(id) : undefined;

  // PR-I1 (Codex P2): the learner-mutation gate is closed — the v1 renderer's
  // completion write would be silently dropped, so do not mount the
  // interactive lesson. Covers deep links, restored stacks, and the
  // Lesson-Zero → L1 handoff (finishing Lesson Zero cannot bypass the pause).
  if (learningPaused) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: P.bg,
          padding: 20,
          justifyContent: "center",
        }}
      >
        <LearningPausedPanel onGoHome={() => router.replace("/" as never)} />
      </View>
    );
  }

  if (!lesson) {
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
          <Text className="text-base" style={{ color: P.ink }}>
            This v1 lesson is not ready yet.
          </Text>
        </View>
      </View>
    );
  }

  return <LessonRendererV1 lesson={lesson} />;
}
