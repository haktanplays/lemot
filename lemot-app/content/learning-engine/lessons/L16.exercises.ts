/**
 * L16 exercise blueprints fixture (v0.1) — Integration + A Small Moment Seed.
 *
 * Every target is an already-owned chunk reused from L11 / L12 / L15 / SHARED;
 * L16 introduces nothing new. The two `context_chain` exercises are the "A Small
 * Moment" seeds: the learner reads a short human situation, recognizes the need,
 * and produces a fixed model answer step-by-step. There is no open advice essay,
 * no free chat, and no AI evaluation — the steps are fixed strings checked by the
 * pure answer-check, and the contract blocks open_production / free_conversation.
 */
import type { ExerciseBlueprint } from "../types";

export const L16_EXERCISES: ExerciseBlueprint[] = [
  {
    id: "L16-ex01-recognition-je-peux-faire-ca",
    lessonId: "L16",
    operation: "recognition",
    prompt: "Recognize the plain ability you already know.",
    displayAnswer: "I can do that (ability — «je peux faire ça»).",
    targetItemIds: ["chunk:je-peux-faire-ca"],
    validationMode: "expected-bank",
  },
  {
    id: "L16-ex02-fill-je-peux-faire-une-pause",
    lessonId: "L16",
    operation: "fill",
    prompt: "Ask casually for a break.",
    targetText: "Je peux faire une pause ?",
    targetItemIds: ["chunk:je-peux-faire-une-pause-q"],
    blankLabel: "permission ask (je peux … ?)",
    validationMode: "expected-bank",
  },
  {
    id: "L16-ex03-build-est-ce-que-je-peux-faire-ca",
    lessonId: "L16",
    operation: "build",
    prompt: "Now ask the same thing more politely, as a yes/no question.",
    targetText: "Est-ce que je peux faire ça ?",
    targetItemIds: ["chunk:est-ce-que-je-peux-faire-ca"],
    // Atomic build: the wrapped question + one owned, producible distractor.
    // «vous pouvez m'aider» (supported, allowedProduction) is a different request
    // — clearly distinct, no punctuation-normalization ambiguity.
    tiles: [
      { itemId: "chunk:est-ce-que-je-peux-faire-ca", answerIndex: 0 },
      { itemId: "chunk:vous-pouvez-m-aider" },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L16-ex04-context-chain-small-moment-pause",
    lessonId: "L16",
    operation: "context_chain",
    // A Small Moment seed: read the situation, recognize the need, then ask.
    prompt:
      "After class, you're tired and want a short break. Recognize what's needed, then ask politely.",
    targetText: "Je peux faire une pause ?",
    targetItemIds: [
      "chunk:il-faut-faire-une-pause",
      "chunk:je-peux-faire-une-pause-q",
    ],
    steps: [
      { prompt: "What's needed here?", answer: "il faut faire une pause" },
      { prompt: "Now ask.", answer: "Je peux faire une pause ?" },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L16-ex05-fill-il-faut-faire-une-pause",
    lessonId: "L16",
    operation: "fill",
    prompt: "Say impersonally that a break is needed.",
    targetText: "Il faut faire une pause",
    targetItemIds: ["chunk:il-faut-faire-une-pause"],
    blankLabel: "obligation opener (il faut)",
    validationMode: "expected-bank",
  },
  {
    id: "L16-ex06-build-vous-pouvez-m-aider",
    lessonId: "L16",
    operation: "build",
    prompt: "Politely ask someone for help.",
    targetText: "Vous pouvez m'aider",
    targetItemIds: ["chunk:vous-pouvez-m-aider"],
    // Atomic build: the help request + one owned, producible distractor.
    // «je peux faire une pause ?» (supported, allowedProduction) is a different
    // request — clearly distinct, no punctuation-normalization ambiguity.
    tiles: [
      { itemId: "chunk:vous-pouvez-m-aider", answerIndex: 0 },
      { itemId: "chunk:je-peux-faire-une-pause-q" },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L16-ex07-recognition-est-ce-que-vous-pouvez-m-aider",
    lessonId: "L16",
    operation: "recognition",
    prompt: "Recognize the polite help question.",
    displayAnswer: "Can you help me? (polite «est-ce que vous pouvez m'aider»).",
    targetItemIds: ["chunk:est-ce-que-vous-pouvez-m-aider"],
    validationMode: "expected-bank",
  },
  {
    id: "L16-ex08-context-chain-small-moment-help",
    lessonId: "L16",
    operation: "context_chain",
    // A Small Moment seed: someone is stuck; give the controlled help ask.
    prompt:
      "Someone next to you is stuck and could use a hand. Offer to ask for / give help politely.",
    targetText: "Vous pouvez m'aider",
    targetItemIds: ["chunk:vous-pouvez-m-aider"],
    steps: [
      { prompt: "Name the help request you know.", answer: "vous pouvez m'aider" },
      { prompt: "Say it to the person.", answer: "Vous pouvez m'aider" },
    ],
    validationMode: "expected-bank",
  },
];
