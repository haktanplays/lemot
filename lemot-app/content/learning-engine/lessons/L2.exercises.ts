/**
 * L2 exercise blueprints fixture (v0.1) — «Je suis» / "I am here".
 *
 * Four blueprints that exercise the L2 contract using only renderer-supported
 * operations: recognition → fill → build → context chain. They mirror the
 * first-run-equivalent core of v1 Lesson 1 — meet "Je suis ici", fill the «suis»
 * blank, assemble the phrase from pieces, and place it in a small arrival moment.
 * No insight / recap / Say It Your Way / open production / boundary hook.
 *
 * Every production target here is owned by the L2 contract and allowed for
 * production. The validator proves that.
 */
import type { ExerciseBlueprint } from "../types";

export const L2_EXERCISES: ExerciseBlueprint[] = [
  {
    id: "L2-ex01-recognition-je-suis-ici",
    lessonId: "L2",
    operation: "recognition",
    prompt: "Someone says this as they walk in. What does it mean?",
    targetText: "Je suis ici.",
    targetItemIds: ["chunk:je-suis-ici"],
    displayAnswer: "I am here.",
    validationMode: "expected-bank",
  },
  {
    // Insight approximation (PR-G, Strategy A): a calm "notice the shape" beat
    // reusing the recognition card. Show me reveals the note, which counts as
    // attempted only when revealed. Temporary content-only stand-in until a
    // dedicated notice operation/card exists. No broad etre paradigm.
    id: "L2-ex01b-notice-je-suis",
    lessonId: "L2",
    operation: "recognition",
    prompt: "A small shape worth noticing.",
    targetText: "Je suis ici.",
    targetItemIds: ["chunk:je-suis"],
    displayAnswer: "je suis = I am. This small shape comes back again and again.",
    validationMode: "expected-bank",
  },
  {
    id: "L2-ex02-fill-suis",
    lessonId: "L2",
    operation: "fill",
    prompt: "Someone calls your name. Tell them where you are.",
    targetText: "Je suis ici.",
    targetItemIds: ["chunk:je-suis"],
    blankCount: 1,
    validationMode: "expected-bank",
  },
  {
    id: "L2-ex03-build-je-suis-ici",
    lessonId: "L2",
    operation: "build",
    prompt: "Put it together: I am here.",
    targetText: "Je suis ici.",
    targetItemIds: ["chunk:je-suis", "chunk:ici"],
    // Two answer tiles in order, no distractor (per PR-D scope).
    tiles: [
      { itemId: "chunk:je-suis", answerIndex: 0 },
      { itemId: "chunk:ici", answerIndex: 1 },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L2-ex04-context-chain-arrival",
    lessonId: "L2",
    operation: "context_chain",
    prompt: "You step into a room and someone is looking for you.",
    targetText: "Je suis ici.",
    targetItemIds: ["chunk:je-suis", "chunk:ici"],
    steps: [
      {
        prompt: "Let them know you've arrived.",
        answer: "Je suis ici.",
      },
    ],
    validationMode: "expected-bank",
  },
];
