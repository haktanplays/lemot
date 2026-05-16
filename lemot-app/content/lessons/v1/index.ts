import type { Lesson } from "../../lessonTypes";

export const V1_LESSONS: Lesson[] = [];

export function getV1LessonById(id: string): Lesson | undefined {
  return V1_LESSONS.find((lesson) => lesson.id === id);
}

export function getV1LessonByNumber(number: number): Lesson | undefined {
  return V1_LESSONS.find((lesson) => lesson.number === number);
}
