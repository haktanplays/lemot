import type { FillItem, QuizItem, TypedWeaveItem } from "@/lib/types";
import { fillFG1, fillBlanks1, quiz1, typedWeave1 } from "./pool1";
import { fillFG2, fillBlanks2, typedWeave2 } from "./pool2";
import { fillFG3, fillBlanks3, typedWeave3 } from "./pool3";
import { fillFG4, fillBlanks4, typedWeave4 } from "./pool4";
import { fillFG5, fillBlanks5, typedWeave5 } from "./pool5";

// Fields are optional so slim per-lesson pools (e.g. pool2-5) can omit
// arrays they don't override; LessonPractice falls back to the lesson's
// own fillFG/fillBlanks/quiz when a pool field is undefined.
// See `components/LessonPractice.tsx:46-48`:
//   const fillFG = staticPool?.fillFG ?? lesson.fillFG;
//
// `typedWeave` is the productive-practice surface added 2026-05-08
// (Prompt 6). When present, LessonPractice prioritizes typed Weave items
// and reduces quiz dominance for that lesson's session.
export interface LessonPool {
  fillFG?: FillItem[];
  fillBlanks?: FillItem[];
  quiz?: QuizItem[];
  typedWeave?: TypedWeaveItem[];
}

// Lesson-level exercise pools for Practice tab's "Lesson Practice" mode.
// Add pool6-24 here as they are generated. Pool1 is full (50/50/50);
// pool2-5 are slim productive supplements (6 typedWeave + 6 fillFG +
// 2 fillBlanks each) — typedWeave dominates the session mix to keep
// L2-L5 Practice written/productive rather than quiz-heavy.
export const LESSON_POOLS: Record<number, LessonPool> = {
  1: {
    fillFG: fillFG1,
    fillBlanks: fillBlanks1,
    quiz: quiz1,
    typedWeave: typedWeave1,
  },
  2: {
    fillFG: fillFG2,
    fillBlanks: fillBlanks2,
    typedWeave: typedWeave2,
  },
  3: {
    fillFG: fillFG3,
    fillBlanks: fillBlanks3,
    typedWeave: typedWeave3,
  },
  4: {
    fillFG: fillFG4,
    fillBlanks: fillBlanks4,
    typedWeave: typedWeave4,
  },
  5: {
    fillFG: fillFG5,
    fillBlanks: fillBlanks5,
    typedWeave: typedWeave5,
  },
};
