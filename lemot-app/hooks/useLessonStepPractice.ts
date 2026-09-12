import { useCallback, useEffect, useRef, useState } from "react";
import { V1_LESSONS } from "@/content/lessons/v1";
import { PRACTICE_SEEDS } from "@/content/practice/seeds";
import { reachedItemIds } from "@/content/practice/practicePlanner";
import {
  lessonStepMiss,
  seedsRenderableInALesson,
  selectLessonStepPractice,
} from "@/content/practice/lessonStepPractice";
import type { Lesson, LessonScreen } from "@/content/lessonTypes";
import type { PracticeSeed } from "@/content/practice/practiceTypes";
import { useLearningEngineRuntime } from "@/providers/LearningEngineProvider";

/**
 * The pool a lesson can draw from, narrowed once at module scope.
 *
 * A lesson has the v1 screen renderers and nothing else, so the seeds with no
 * surface inside a lesson are filtered out HERE rather than left to produce an
 * offer the caller silently cannot draw.
 */
const LESSON_DRAWABLE_SEEDS = seedsRenderableInALesson(PRACTICE_SEEDS);

/**
 * "Is there another way at this?" — asked once per lesson, answered offline.
 *
 * The lesson holds the learner's reach for the length of the sitting and asks
 * the pure policy on each miss. One read, at the top, because reach is a fact
 * about everything before this lesson and does not move while the learner is
 * inside it: re-reading per miss would put an await between a wrong answer and
 * the offer, which is the one moment in the lesson that must not stall.
 *
 * Returns null for everything until the read lands, and stays that way if it
 * fails. Both mean "offer nothing", which is the safe direction — an offer that
 * never appeared costs nothing, and an offer that opens an exercise the learner
 * has no business seeing is the defect this exists to avoid.
 *
 * THE BOUNDARY. This hook holds reach, which is learner state; it hands the
 * caller a SEED, which is content. No screen ever sees the sets, the snapshot
 * or the runtime — the same PR-05 line every other lesson surface keeps.
 */
export function useLessonStepPractice(lesson: Lesson): {
  /** The one lawful follow-up for a missed step, or null when there is none. */
  offerFor: (screen: LessonScreen) => PracticeSeed | null;
  /** Record that an offer was taken or shown, so it is never offered twice. */
  noteOffered: (seedId: string) => void;
} {
  const { runtime, generation } = useLearningEngineRuntime();
  const [reach, setReach] = useState<{
    items: ReadonlySet<string>;
    lessons: ReadonlySet<string>;
  } | null>(null);
  // Offered seeds are a fact about this sitting, not about the learner, so they
  // live in a ref: adding to them must not re-render the screen the learner is
  // reading, and they are meant to die with the lesson.
  const offered = useRef<Set<string>>(new Set());

  useEffect(() => {
    let active = true;
    setReach(null);
    offered.current = new Set();
    runtime
      .readPracticeReach()
      .then(({ snapshot, reachedLessonIds }) => {
        if (!active) return;
        setReach({
          items: reachedItemIds(snapshot),
          lessons: new Set(reachedLessonIds),
        });
      })
      .catch(() => {
        // Left null on purpose. Nothing is offered, nothing breaks.
      });
    return () => {
      active = false;
    };
  }, [runtime, generation, lesson.id]);

  const offerFor = useCallback(
    (screen: LessonScreen): PracticeSeed | null => {
      if (reach === null) return null;
      const miss = lessonStepMiss(lesson, screen);
      if (miss === null) return null;
      return selectLessonStepPractice({
        miss,
        seeds: LESSON_DRAWABLE_SEEDS,
        reachedItems: reach.items,
        reachedLessons: reach.lessons,
        offeredSeedIds: offered.current,
      });
    },
    [lesson, reach],
  );

  const noteOffered = useCallback((seedId: string) => {
    offered.current.add(seedId);
  }, []);

  return { offerFor, noteOffered };
}

/** The lessons this can ever draw from, for tests and for the audit. */
export const LESSON_STEP_PRACTICE_CORPUS = V1_LESSONS;
