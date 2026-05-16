import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { P } from "@/constants/theme";
import { LessonRendererV1 } from "@/components/lesson-v1/LessonRendererV1";
import { getV1LessonById } from "@/content/lessons/v1";

export default function V1LessonRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = id ? getV1LessonById(id) : undefined;

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
