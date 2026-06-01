/**
 * L15 exercise blueprints fixture (v0.1) — obligation doorway.
 *
 * The production exercises only ever target the «il faut + infinitive» doorway
 * and the supported «je dois + infinitive» doorway. The recognition-only hooks
 * («il faut que j'aille» subjunctive, "je devrais" conditional advice) are shown
 * via recognition exercises but never required as production answers. The
 * validator enforces that boundary — see L15.exercises.selftest.ts notes.
 */
import type { ExerciseBlueprint } from "../types";

export const L15_EXERCISES: ExerciseBlueprint[] = [
  {
    id: "L15-ex01-recognition-il-faut-meaning",
    lessonId: "L15",
    operation: "recognition",
    prompt: "Which one simply means 'it is necessary / you have to'?",
    displayAnswer: "it is necessary / you have to (impersonal «il faut»)",
    targetItemIds: ["chunk:il-faut-faire-ca"],
    validationMode: "expected-bank",
  },
  {
    id: "L15-ex02-build-il-faut-faire-ca",
    lessonId: "L15",
    operation: "build",
    prompt: "Say that this needs to be done.",
    targetText: "il faut faire ça",
    targetItemIds: ["chunk:il-faut-faire-ca"],
    // Interactive build (v0.3): answer + one owned, producible distractor.
    // «je dois faire ça» (supported, allowedProduction) is the impersonal↔personal
    // obligation contrast — never a recognition-only / blocked item.
    tiles: [
      { itemId: "chunk:il-faut-faire-ca", answerIndex: 0 },
      { itemId: "chunk:je-dois-faire-ca" },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L15-ex03-fill-il-faut-faire-ca",
    lessonId: "L15",
    operation: "fill",
    prompt: "Complete the obligation chunk.",
    targetText: "il faut faire ça",
    targetItemIds: ["chunk:il-faut-faire-ca"],
    blankLabel: "obligation opener (il faut)",
    validationMode: "expected-bank",
  },
  {
    id: "L15-ex04-context-chain-il-faut-pause",
    lessonId: "L15",
    operation: "context_chain",
    prompt: "You've been working a long time. Say a break is needed.",
    targetText: "il faut faire une pause",
    targetItemIds: ["chunk:il-faut-faire-une-pause"],
    steps: [
      { prompt: "Name the action you already know.", answer: "faire une pause" },
      { prompt: "Now say it's necessary.", answer: "il faut faire une pause" },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L15-ex05-build-je-dois-faire-ca",
    lessonId: "L15",
    operation: "build",
    prompt: "Make the obligation personal: 'I have to do that.'",
    targetText: "je dois faire ça",
    targetItemIds: ["chunk:je-dois-faire-ca"],
    // Interactive build (v0.3): answer + one owned, producible distractor.
    // «il faut faire ça» (active, allowedProduction) is the personal↔impersonal
    // obligation contrast.
    tiles: [
      { itemId: "chunk:je-dois-faire-ca", answerIndex: 0 },
      { itemId: "chunk:il-faut-faire-ca" },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L15-ex06-recognition-je-dois-doorway",
    lessonId: "L15",
    operation: "recognition",
    prompt: "«je dois» turns «il faut» into a personal 'I have to'. Recognize the doorway.",
    displayAnswer: "I have to / I must (personal devoir-light)",
    targetItemIds: ["chunk:je-dois"],
    validationMode: "expected-bank",
  },
  {
    id: "L15-ex07-recognition-boundary-il-faut-que",
    lessonId: "L15",
    operation: "recognition",
    prompt:
      "You may SEE «il faut que j'aille», but L15 doesn't ask you to build it — the subjunctive opens later. Just recognize the meaning.",
    displayAnswer: "I have to go (you'll meet this form later)",
    targetItemIds: ["chunk:il-faut-que-j-aille"],
    validationMode: "expected-bank",
  },
  {
    id: "L15-ex08-recognition-boundary-je-devrais",
    lessonId: "L15",
    operation: "recognition",
    prompt:
      "«je devrais» (I should) is softer, conditional advice — recognized only here, not produced yet.",
    displayAnswer: "I should / I ought to",
    targetItemIds: ["chunk:je-devrais"],
    validationMode: "expected-bank",
  },
];
