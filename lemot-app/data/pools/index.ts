import type { FillItem, QuizItem } from "@/lib/types";
import { fillFG1, fillBlanks1, quiz1 } from "./pool1";

export interface LessonPool {
  fillFG: FillItem[];
  fillBlanks: FillItem[];
  quiz: QuizItem[];
}

// Lesson-level exercise pools for Practice tab's "Lesson Practice" mode.
// Add pool2-24 here as they are generated.
export const LESSON_POOLS: Record<number, LessonPool> = {
  1: {
    fillFG: fillFG1,
    fillBlanks: fillBlanks1,
    quiz: quiz1,
  },
};
