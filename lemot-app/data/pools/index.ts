import type { FillItem, QuizItem } from "@/lib/types";
import { fillFG1, fillBlanks1, quiz1 } from "./pool1";
import { fillFG2, fillBlanks2 } from "./pool2";
import { fillFG3, fillBlanks3 } from "./pool3";
import { fillFG4, fillBlanks4 } from "./pool4";
import { fillFG5, fillBlanks5 } from "./pool5";

// Fields are optional so slim per-lesson pools (e.g. pool2-5) can omit
// arrays they don't override; LessonPractice falls back to the lesson's
// own fillFG/fillBlanks/quiz when a pool field is undefined.
// See `components/LessonPractice.tsx:46-48`:
//   const fillFG = staticPool?.fillFG ?? lesson.fillFG;
export interface LessonPool {
  fillFG?: FillItem[];
  fillBlanks?: FillItem[];
  quiz?: QuizItem[];
}

// Lesson-level exercise pools for Practice tab's "Lesson Practice" mode.
// Add pool6-24 here as they are generated. Pool1 is full (50/50/50);
// pool2-5 are slim Weave-focused supplements (6 fillFG + 2 fillBlanks
// each) that augment the lesson's own arrays via fallback.
export const LESSON_POOLS: Record<number, LessonPool> = {
  1: {
    fillFG: fillFG1,
    fillBlanks: fillBlanks1,
    quiz: quiz1,
  },
  2: {
    fillFG: fillFG2,
    fillBlanks: fillBlanks2,
  },
  3: {
    fillFG: fillFG3,
    fillBlanks: fillBlanks3,
  },
  4: {
    fillFG: fillFG4,
    fillBlanks: fillBlanks4,
  },
  5: {
    fillFG: fillFG5,
    fillBlanks: fillBlanks5,
  },
};
