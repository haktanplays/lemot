/**
 * L1 exercise blueprints fixture (v0.1).
 *
 * Five blueprints that exercise the L1 contract: recognition → fill → build →
 * register ladder → context chain. Blueprints are data only — the context
 * chain in particular is structured data, not a wired-up UI.
 *
 * Every target item here is owned by the L1 contract and allowed for
 * production. The validator proves that.
 */
import type { ExerciseBlueprint } from "../types";

export const L1_EXERCISES: ExerciseBlueprint[] = [
  {
    id: "L1-ex01-recognition-bonjour",
    lessonId: "L1",
    operation: "recognition",
    prompt: "You walk into a shop. What do you say first?",
    targetText: "Bonjour",
    targetItemIds: ["chunk:bonjour"],
    validationMode: "expected-bank",
  },
  {
    id: "L1-ex02-fill-voudrais-cafe",
    lessonId: "L1",
    operation: "fill",
    prompt: "Complete the polite order.",
    targetText: "Je voudrais un café",
    targetItemIds: ["chunk:je-voudrais", "noun_phrase:un-cafe"],
    validationMode: "expected-bank",
  },
  {
    id: "L1-ex03-build-greet-and-order",
    lessonId: "L1",
    operation: "build",
    prompt: "Greet, then order a coffee.",
    targetText: "Bonjour, je voudrais un café",
    targetItemIds: [
      "chunk:bonjour",
      "chunk:je-voudrais",
      "noun_phrase:un-cafe",
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L1-ex04-register-veux-to-voudrais",
    lessonId: "L1",
    operation: "register_switch",
    prompt: "Same request, but make it polite.",
    directForm: "Je veux un café",
    politeForm: "Je voudrais un café",
    targetText: "Je voudrais un café",
    targetItemIds: [
      "chunk:je-veux",
      "chunk:je-voudrais",
      "noun_phrase:un-cafe",
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L1-ex05-context-chain-cafe",
    lessonId: "L1",
    operation: "context_chain",
    prompt: "You smell warm pastry and coffee. Where are you, and what do you say?",
    targetText: "Bonjour, je voudrais un café, s'il vous plaît.",
    targetItemIds: [
      "chunk:bonjour",
      "chunk:je-voudrais",
      "noun_phrase:un-cafe",
      "chunk:s-il-vous-plait",
    ],
    steps: [
      { prompt: "Where are you?", answer: "un café" },
      { prompt: "What would you like?", answer: "un café" },
      {
        prompt: "Order it politely.",
        answer: "Bonjour, je voudrais un café, s'il vous plaît.",
      },
    ],
    validationMode: "expected-bank",
  },
];
