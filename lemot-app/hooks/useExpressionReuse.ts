import { useCallback, useEffect, useMemo, useState } from "react";
import { V1_LESSONS } from "@/content/lessons/v1";
import { reachedItemIds } from "@/content/practice/practicePlanner";
import {
  derivedAlternativeSurfaces,
  firstLessonIndex,
  resolveEligibleExpressions,
} from "@/content/expression/resolveExpressions";
import { useLearningEngineRuntime } from "@/providers/LearningEngineProvider";
import type { Lesson, SayItYourWayScreen, WeaveScreen } from "@/content/lessonTypes";

/**
 * The wiring-layer half of expression reuse: ask the resolver, hand a screen
 * strings.
 *
 * WHY IT LIVES OUT HERE. "What has this learner reached?" is a question about
 * the learner, and a lesson screen is not allowed to ask one — the same
 * boundary the recap's Mon Lexique bridge respects, and the one a previous pass
 * broke by passing `reachedItemIds` straight into `RecapCard`. So the snapshot
 * is read once per lesson here, the resolution happens here, and what crosses
 * into the screen is a list of French sentences its grader will accept. The
 * screen cannot tell them from the ones the author wrote, which is exactly
 * right: nothing about how an answer is judged changed.
 *
 * WHICH "REACHED". The Practice line — `practiceEligibility !== "none"`, i.e.
 * the learner has met this — and deliberately NOT the Mon Lexique projection.
 * Mon Lexique answers "is this becoming yours", which requires production
 * success, and using it here would have meant L6's closing could not offer
 * "Au revoir." two screens after teaching it. Two standards already exist for
 * good reasons; a third invented here would be the drift §23 warns about, so
 * this reuses the one that already means what this layer needs.
 *
 * Returns `undefined` until the reach is known, and stays `undefined` if the
 * read fails. Both mean "authored answers only", which is the safe direction:
 * the lesson behaves exactly as it did before this layer existed.
 */
export function useExpressionReuse(
  lesson: Lesson,
): (screen: WeaveScreen | SayItYourWayScreen) => readonly string[] | undefined {
  const { runtime, generation } = useLearningEngineRuntime();
  const [reached, setReached] = useState<ReadonlySet<string> | undefined>(undefined);

  useEffect(() => {
    let active = true;
    // A privacy reset bumps `generation`, so a snapshot read before the wipe
    // can never be adopted by a later render.
    setReached(undefined);
    runtime
      .readMasterySnapshot()
      .then((snapshot) => {
        if (active) setReached(reachedItemIds(snapshot));
      })
      .catch(() => {
        // Left undefined on purpose. Nothing widens, nothing breaks.
      });
    return () => {
      active = false;
    };
  }, [runtime, generation]);

  // Derived from the curriculum, never restated beside it, so "when does this
  // French become lawful" keeps exactly one answer.
  const firstLesson = useMemo(() => firstLessonIndex(V1_LESSONS as Lesson[]), []);

  return useCallback(
    (screen: WeaveScreen | SayItYourWayScreen) => {
      if (reached === undefined) return undefined;
      const payload = screen.payload;
      if (payload.reuse !== true || payload.intent === undefined) return undefined;
      const resolved = resolveEligibleExpressions({
        intent: payload.intent,
        scene: payload.sceneFacts,
        reached,
        lessonScope: lesson.number,
        primary:
          screen.type === "weave"
            ? (screen.payload.expectedAnswers[0] ?? null)
            : (screen.payload.modelAnswer ?? screen.payload.reveal.modelAnswer ?? null),
        authoredAlternatives: payload.acceptedAlternatives,
        exclusions: payload.excludeExpressionIds,
        reuse: true,
        firstLesson,
      });
      const surfaces = derivedAlternativeSurfaces(resolved);
      return surfaces.length === 0 ? undefined : surfaces;
    },
    [reached, firstLesson, lesson.number],
  );
}
