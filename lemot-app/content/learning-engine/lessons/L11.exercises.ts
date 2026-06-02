/**
 * L11 exercise blueprints fixture (v0.1) — Pouvoir-light.
 *
 * Production exercises only ever target the fixed «je peux» / «vous pouvez»
 * chunks. The recognition-only hooks (the conditional «je pourrais», the full
 * paradigm) are shown via recognition exercises but never required as production
 * answers — the validator enforces that boundary.
 *
 * Note: the statement «chunk:je-peux-faire-ca» is never used as a build
 * distractor against the question «chunk:je-peux-faire-ca-q»; build-normalization
 * strips the trailing «?», so the two would be indistinguishable as tiles.
 */
import type { ExerciseBlueprint } from "../types";

export const L11_EXERCISES: ExerciseBlueprint[] = [
  {
    id: "L11-ex01-recognition-je-peux-meaning",
    lessonId: "L11",
    operation: "recognition",
    prompt: "What does «je peux» let you say?",
    displayAnswer: "I can / I'm able to (ability) — e.g. «je peux faire ça» = 'I can do that'.",
    targetItemIds: ["chunk:je-peux-faire-ca"],
    validationMode: "expected-bank",
  },
  {
    id: "L11-ex02-fill-je-peux-faire-ca",
    lessonId: "L11",
    operation: "fill",
    prompt: "Say that you are able to do it.",
    targetText: "Je peux faire ça",
    targetItemIds: ["chunk:je-peux-faire-ca"],
    blankLabel: "ability opener (je peux)",
    validationMode: "expected-bank",
  },
  {
    id: "L11-ex03-build-je-ne-peux-pas-faire-ca",
    lessonId: "L11",
    operation: "build",
    prompt: "Now say you can't do it.",
    targetText: "Je ne peux pas faire ça",
    targetItemIds: ["chunk:je-ne-peux-pas-faire-ca"],
    // Atomic build: the negative chunk + one owned, producible distractor.
    // «je peux faire ça» (active, allowedProduction) is the affirmative↔negative
    // contrast — never a recognition-only / blocked item.
    tiles: [
      { itemId: "chunk:je-ne-peux-pas-faire-ca", answerIndex: 0 },
      { itemId: "chunk:je-peux-faire-ca" },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L11-ex04-fill-je-peux-faire-ca-q",
    lessonId: "L11",
    operation: "fill",
    prompt: "Ask permission: 'Can I do that?'",
    targetText: "Je peux faire ça ?",
    targetItemIds: ["chunk:je-peux-faire-ca-q"],
    blankLabel: "permission ask (je peux … ?)",
    validationMode: "expected-bank",
  },
  {
    id: "L11-ex05-build-vous-pouvez-m-aider",
    lessonId: "L11",
    operation: "build",
    prompt: "Politely ask for help.",
    targetText: "Vous pouvez m'aider",
    targetItemIds: ["chunk:vous-pouvez-m-aider"],
    // Atomic build: the help request + one owned, producible distractor.
    // «vous pouvez répéter» (active, allowedProduction) is another «vous pouvez»
    // request — owned and safe, never recognition-only / blocked.
    tiles: [
      { itemId: "chunk:vous-pouvez-m-aider", answerIndex: 0 },
      { itemId: "chunk:vous-pouvez-repeter" },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L11-ex06-context-chain-je-peux-faire-une-pause",
    lessonId: "L11",
    operation: "context_chain",
    prompt: "You've been working a while. Build up to asking for a break.",
    targetText: "Je peux faire une pause ?",
    targetItemIds: ["chunk:je-peux-faire-une-pause-q"],
    steps: [
      { prompt: "Name the action you already know.", answer: "faire une pause" },
      { prompt: "Now ask if you may.", answer: "Je peux faire une pause ?" },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L11-ex07-recognition-vous-pouvez-repeter",
    lessonId: "L11",
    operation: "recognition",
    prompt: "You didn't catch what someone said. Recognize the repair request.",
    displayAnswer: "Can you repeat? / You can repeat (formal «vous pouvez répéter»).",
    targetItemIds: ["chunk:vous-pouvez-repeter"],
    validationMode: "expected-bank",
  },
  {
    id: "L11-ex08-recognition-boundary-je-pourrais",
    lessonId: "L11",
    operation: "recognition",
    prompt:
      "«je pourrais» (I could / would be able) is a softer, conditional form — recognized only here, not produced yet.",
    displayAnswer: "I could / I would be able to (conditional — you'll build this later)",
    targetItemIds: ["chunk:je-pourrais"],
    validationMode: "expected-bank",
  },
];
