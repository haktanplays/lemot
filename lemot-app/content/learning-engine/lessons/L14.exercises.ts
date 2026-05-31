/**
 * L14 exercise blueprints fixture (v0.1) — y-light doorway.
 *
 * Six blueprints across the discriminated variants. They produce only the
 * active doorway / carry-in chunks; the recognition-only hooks ("y" as a place
 * pronoun, "je peux y aller") are shown via recognition exercises but never
 * required as production answers. The validator enforces that boundary.
 */
import type { ExerciseBlueprint } from "../types";

export const L14_EXERCISES: ExerciseBlueprint[] = [
  {
    id: "L14-ex01-recognition-y-place",
    lessonId: "L14",
    operation: "recognition",
    prompt: "In «j'y vais», what does the little 'y' stand for?",
    targetText: "there / to that place",
    targetItemIds: ["grammar_piece:y-place-light"],
    validationMode: "expected-bank",
  },
  {
    id: "L14-ex02-build-j-y-vais",
    lessonId: "L14",
    operation: "build",
    prompt: "Say you're heading there.",
    targetText: "j'y vais",
    targetItemIds: ["chunk:j-y-vais"],
    validationMode: "expected-bank",
  },
  {
    id: "L14-ex03-build-on-y-va",
    lessonId: "L14",
    operation: "build",
    prompt: "Say 'let's go'.",
    targetText: "on y va",
    targetItemIds: ["chunk:on-y-va"],
    validationMode: "expected-bank",
  },
  {
    id: "L14-ex04-fill-add-y",
    lessonId: "L14",
    operation: "fill",
    prompt: "You already said «je vais». Now add the place pronoun.",
    targetText: "j'y vais",
    targetItemIds: ["chunk:j-y-vais"],
    blankLabel: "place-pronoun chunk",
    validationMode: "expected-bank",
  },
  {
    id: "L14-ex05-context-chain-there",
    lessonId: "L14",
    operation: "context_chain",
    prompt: "The café is there. You decide to go.",
    targetText: "j'y vais",
    targetItemIds: ["chunk:j-y-vais"],
    steps: [
      { prompt: "Where is the café?", answer: "là" },
      { prompt: "You're going there — say it.", answer: "j'y vais" },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L14-ex06-recognition-boundary-trap",
    lessonId: "L14",
    operation: "recognition",
    prompt:
      "You may SEE «je peux y aller», but L14 doesn't ask you to build it yet — just recognize the meaning.",
    targetText: "I can go there",
    targetItemIds: ["chunk:je-peux-y-aller"],
    validationMode: "expected-bank",
  },
];
