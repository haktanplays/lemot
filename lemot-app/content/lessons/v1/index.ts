import type { Lesson } from "../../lessonTypes";
import { lesson000 } from "./lesson-000";
import { lesson001 } from "./lesson-001";
import { lesson002 } from "./lesson-002";
import { lesson003 } from "./lesson-003";
import { lesson004 } from "./lesson-004";
import { lesson005 } from "./lesson-005";

export const V1_LESSONS: Lesson[] = [
  lesson000,
  lesson001,
  lesson002,
  lesson003,
  lesson004,
  lesson005,
];

export function getV1LessonById(id: string): Lesson | undefined {
  return V1_LESSONS.find((lesson) => lesson.id === id);
}

export function getV1LessonByNumber(number: number): Lesson | undefined {
  return V1_LESSONS.find((lesson) => lesson.number === number);
}
