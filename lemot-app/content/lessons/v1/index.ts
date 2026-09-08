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
import { lesson013 } from "./lesson-013";
import { lesson014 } from "./lesson-014";
import { lesson015 } from "./lesson-015";
import { lesson016 } from "./lesson-016";
import { lesson017 } from "./lesson-017";
import { lesson018 } from "./lesson-018";
import { lesson019 } from "./lesson-019";
import { lesson020 } from "./lesson-020";
import { lesson021 } from "./lesson-021";
import { lesson022 } from "./lesson-022";
import { lesson023 } from "./lesson-023";
import { lesson024 } from "./lesson-024";

export const V1_LESSONS: Lesson[] = [
  lesson000,
  lesson001,
  lesson002,
  lesson003,
  lesson004,
  lesson005,
  lesson006,
  // Unit 2 pilot (L7-L9). These comments used to say the Home path capped
  // dev-apk at L6 and that these lessons were not learner-visible. That stopped
  // being true when the Journey moved to the full L1-L24 linear unlock, and a
  // stale comment about scope is worse than none: it is the first thing read
  // when somebody asks what a build actually ships. Every lesson below is
  // learner-visible, reachable in order, and gated only by finishing the one
  // before it.
  lesson007,
  lesson008,
  lesson009,
  // Unit 2 continuation (L10-L12).
  lesson010,
  lesson011,
  lesson012,
  // Unit 3 continuation (L13-L15).
  lesson013,
  lesson014,
  lesson015,
  lesson016,
  lesson017,
  lesson018,
  lesson019,
  lesson020,
  lesson021,
  lesson022,
  lesson023,
  lesson024,
];

export function getV1LessonById(id: string): Lesson | undefined {
  return V1_LESSONS.find((lesson) => lesson.id === id);
}

export function getV1LessonByNumber(number: number): Lesson | undefined {
  return V1_LESSONS.find((lesson) => lesson.number === number);
}
