/**
 * L18 exercise blueprints fixture (v0.1) — futur-proche doorway.
 *
 * The production exercises only ever target the «aller + known chunk» near-future
 * doorway («je vais faire ça» / «on va faire ça»). The recognition-only future
 * hooks («je ferai» simple future, «j'irai», «je vais y aller» pronoun chain) are
 * shown via recognition exercises but never required as production answers. The
 * validator enforces that boundary.
 */
import type { ExerciseBlueprint } from "../types";

export const L18_EXERCISES: ExerciseBlueprint[] = [
  {
    id: "L18-ex01-recognition-futur-proche-meaning",
    lessonId: "L18",
    operation: "recognition",
    prompt: "Which one means 'I'm going to do that' as a near-future plan?",
    displayAnswer: "I'm going to do that (near future, «aller + chunk»)",
    targetItemIds: ["chunk:je-vais-faire-ca"],
    validationMode: "expected-bank",
  },
  {
    id: "L18-ex02-build-je-vais-faire-ca",
    lessonId: "L18",
    operation: "build",
    prompt: "Say you're going to do that (soon).",
    targetText: "je vais faire ça",
    targetItemIds: ["chunk:je-vais-faire-ca"],
    // Interactive build (v0.3): answer + one owned, producible distractor.
    // «on va faire ça» (active, allowedProduction) is the je/on subject contrast
    // within the near-future frame — never a recognition-only / blocked item.
    tiles: [
      { itemId: "chunk:je-vais-faire-ca", answerIndex: 0 },
      { itemId: "chunk:on-va-faire-ca" },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L18-ex03-fill-add-aller-doorway",
    lessonId: "L18",
    operation: "fill",
    prompt: "You already know «je vais». Add the action to make a near-future plan.",
    targetText: "je vais faire ça",
    targetItemIds: ["chunk:je-vais-faire-ca"],
    blankLabel: "near-future action chunk",
    validationMode: "expected-bank",
  },
  {
    id: "L18-ex04-build-on-va-faire-ca",
    lessonId: "L18",
    operation: "build",
    prompt: "Say 'we're going to do that'.",
    targetText: "on va faire ça",
    targetItemIds: ["chunk:on-va-faire-ca"],
    // Interactive build (v0.3): answer + one owned, producible distractor.
    // «je vais faire ça» (active, allowedProduction) is the je/on subject contrast.
    tiles: [
      { itemId: "chunk:on-va-faire-ca", answerIndex: 0 },
      { itemId: "chunk:je-vais-faire-ca" },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L18-ex05-context-chain-not-now",
    lessonId: "L18",
    operation: "context_chain",
    prompt: "This is not happening now; you are going to do it.",
    targetText: "je vais faire ça",
    targetItemIds: ["chunk:je-vais-faire-ca"],
    steps: [
      { prompt: "You already know how to say 'I'm going'.", answer: "je vais" },
      { prompt: "Now attach the action — a near-future plan.", answer: "je vais faire ça" },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L18-ex06-recognition-boundary-je-ferai",
    lessonId: "L18",
    operation: "recognition",
    prompt:
      "You may SEE «je ferai», but L18 doesn't ask you to build it — that's the simple future, opened later. Just recognize the meaning.",
    displayAnswer: "I will do (a different, later future tense)",
    targetItemIds: ["chunk:je-ferai"],
    validationMode: "expected-bank",
  },
  {
    id: "L18-ex07-recognition-boundary-je-vais-y-aller",
    lessonId: "L18",
    operation: "recognition",
    prompt:
      "«je vais y aller» chains the near future with the 'y' pronoun — recognized only here, not built in L18.",
    displayAnswer: "I'm going to go there (chained pronoun — later)",
    targetItemIds: ["chunk:je-vais-y-aller"],
    validationMode: "expected-bank",
  },
  {
    id: "L18-ex08-recognition-boundary-j-irai",
    lessonId: "L18",
    operation: "recognition",
    prompt:
      "«j'irai» is the simple future of aller — shown for awareness, not produced in L18.",
    displayAnswer: "I will go (simple future — later)",
    targetItemIds: ["chunk:j-irai"],
    validationMode: "expected-bank",
  },
];
