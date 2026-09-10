/**
 * First use — the first taste, rendered by the real lesson engine.
 *
 * This route used to be a 988-line bespoke onboarding screen with its own
 * layout, its own beat state machine and its own answer matcher. It worked, and
 * it was the wrong shape for three reasons:
 *
 *   - it could not show a learner what Cairn actually does. Chunk pills, chunk
 *     tap, Look Closer, the hint ladder and the safe grading contract all live
 *     in the lesson engine, so the one screen whose job is "teach the product
 *     by using it" was the one screen that could not use it;
 *   - it graded with a local boolean matcher that predates the answer-verdict
 *     contract, so first use was the one place a simplified grader could drift
 *     back in;
 *   - it was a second visual system to maintain forever, for one screen.
 *
 * So first use now plays L0 through `LessonRendererV1`, exactly like any other
 * lesson. Nothing here is bespoke any more: the first-use flag lives in
 * `lib/firstUse.ts` and is written by the last screen, and the handoff into
 * Lesson 1 is the renderer's first-taste completion.
 *
 * L0 is still not a Journey step. `isV1LessonInStageScope` starts at 1, so it
 * never appears in the path, in the Practice By-lesson picker, or in reached
 * lessons; the lesson route admits it through `isFirstTasteLesson`.
 */
import { View, Text } from "react-native";
import { router } from "expo-router";
import { P } from "@/constants/theme";
import { LessonRendererV1 } from "@/components/lesson-v1/LessonRendererV1";
import { getV1LessonByNumber } from "@/content/lessons/v1";

export { SEEN_LESSON_ZERO_KEY } from "@/lib/firstUse";

/** The first taste itself. */
const FIRST_TASTE = getV1LessonByNumber(0);

export default function LessonZeroScreen() {
  if (!FIRST_TASTE) {
    // The first taste is authored content; its absence is a build problem, not
    // a learner problem. Send them to the app rather than to a dead end.
    router.replace("/(tabs)" as never);
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: P.bg }}>
      <LessonRendererV1 lesson={FIRST_TASTE} />
    </View>
  );
}

/** Kept for the route's error state only; never shown in the normal flow. */
export function FirstTasteUnavailable() {
  return (
    <View style={{ flex: 1, backgroundColor: P.bg, padding: 20, justifyContent: "center" }}>
      <Text style={{ color: P.ink }}>Your first step is not ready yet.</Text>
    </View>
  );
}
