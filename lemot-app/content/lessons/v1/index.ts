import type { Lesson } from "../../lessonTypes";
import { lesson000 } from "./lesson-000";
import { lesson001 } from "./lesson-001";
import { lesson002 } from "./lesson-002";
import { lesson003 } from "./lesson-003";
import { lesson004 } from "./lesson-004";
import { lesson005 } from "./lesson-005";
import { lesson006 } from "./lesson-006";
import { lesson007 } from "./lesson-007";
import { lesson008 } from "./lesson-008";
import { lesson009 } from "./lesson-009";
import { lesson010 } from "./lesson-010";
import { lesson011 } from "./lesson-011";
import { lesson012 } from "./lesson-012";

export const V1_LESSONS: Lesson[] = [
  lesson000,
  lesson001,
  lesson002,
  lesson003,
  lesson004,
  lesson005,
  lesson006,
  // Unit 2 pilot (L7-L9): registered for validation; NOT learner-visible —
  // the Home path caps the dev-apk scope at L6 (separate unlock decision).
  lesson007,
  lesson008,
  lesson009,
  // Unit 2 continuation (L10-L12): registered for validation; NOT
  // learner-visible — the Home path caps the dev-apk scope at L6.
  lesson010,
  lesson011,
  lesson012,
];

export function getV1LessonById(id: string): Lesson | undefined {
  return V1_LESSONS.find((lesson) => lesson.id === id);
}

export function getV1LessonByNumber(number: number): Lesson | undefined {
  return V1_LESSONS.find((lesson) => lesson.number === number);
}
