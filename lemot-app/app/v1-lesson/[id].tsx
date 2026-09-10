import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { P } from "@/constants/theme";
import { LessonRendererV1 } from "@/components/lesson-v1/LessonRendererV1";
import { getV1LessonById } from "@/content/lessons/v1";
import { isFirstTasteLesson, isV1LessonInStageScope } from "@/config/productStage";

export default function V1LessonRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const found = id ? getV1LessonById(id) : undefined;
  // A deep link must not reach past the boundary the Journey draws. A lesson
  // outside this stage's slice is treated exactly like one that does not exist:
  // same state, same copy, no new screen — which is also what is true from the
  // tester's side, since the content behind the boundary is not ready for them.
  // The first taste is playable here but is not part of the slice: it is not a
  // Journey step and never appears as one. See `isFirstTasteLesson`.
  const lesson =
    found !== undefined &&
    (isV1LessonInStageScope(found.number) || isFirstTasteLesson(found.number))
      ? found
      : undefined;

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
