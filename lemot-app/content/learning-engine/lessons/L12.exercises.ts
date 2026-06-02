/**
 * L12 exercise blueprints fixture (v0.1) — Est-ce que / Yes-No Question Wrapper.
 *
 * Production exercises only ever target the «est-ce que» wrapper (the bare
 * marker, the frozen wrapped questions) and the owned base clauses inside it.
 * The recognition-only hooks (inversion «peux-tu faire ça», the «qu'est-ce que»
 * question word) are shown via recognition exercises but never required as
 * production answers — the validator enforces that boundary.
 */
import type { ExerciseBlueprint } from "../types";

export const L12_EXERCISES: ExerciseBlueprint[] = [
  {
    id: "L12-ex01-recognition-est-ce-que-meaning",
    lessonId: "L12",
    operation: "recognition",
    prompt: "What does «est-ce que» do to a sentence?",
    displayAnswer:
      "It turns a statement into a yes/no question (a question marker — no word order change needed).",
    targetItemIds: ["chunk:est-ce-que"],
    validationMode: "expected-bank",
  },
  {
    id: "L12-ex02-fill-est-ce-que-je-peux",
    lessonId: "L12",
    operation: "fill",
    prompt: "Ask permission: 'Can I do that?'",
    targetText: "Est-ce que je peux faire ça ?",
    targetItemIds: ["chunk:est-ce-que-je-peux-faire-ca"],
    blankLabel: "question wrapper (est-ce que)",
    validationMode: "expected-bank",
  },
  {
    id: "L12-ex03-build-est-ce-que-je-peux",
    lessonId: "L12",
    operation: "build",
    prompt: "Wrap the clause you know into a yes/no question.",
    targetText: "Est-ce que je peux faire ça ?",
    // Compositional build: the wrapper marker + the already-owned base clause.
    // Both owned + allowedProduction. Distractor «vous pouvez m'aider» is a
    // supported, producible base clause that does not belong in this answer
    // (never recognition-only / blocked).
    targetItemIds: ["chunk:est-ce-que", "chunk:je-peux-faire-ca"],
    tiles: [
      { itemId: "chunk:est-ce-que", answerIndex: 0 },
      { itemId: "chunk:je-peux-faire-ca", answerIndex: 1 },
      { itemId: "chunk:vous-pouvez-m-aider" },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L12-ex04-register-plain-to-est-ce-que",
    lessonId: "L12",
    operation: "register_switch",
    prompt: "Make this casual question a clear, standard yes/no question.",
    directForm: "Tu peux faire ça ?",
    politeForm: "Est-ce que tu peux faire ça ?",
    targetText: "Est-ce que tu peux faire ça ?",
    targetItemIds: ["chunk:est-ce-que-tu-peux-faire-ca"],
    validationMode: "expected-bank",
  },
  {
    id: "L12-ex05-context-chain-permission",
    lessonId: "L12",
    operation: "context_chain",
    prompt: "You want to check it's OK to do something. Build up to the question.",
    targetText: "Est-ce que je peux faire ça ?",
    targetItemIds: ["chunk:est-ce-que-je-peux-faire-ca"],
    steps: [
      { prompt: "Say the plain ability you already know.", answer: "je peux faire ça" },
      { prompt: "Now wrap it as a yes/no question.", answer: "Est-ce que je peux faire ça ?" },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L12-ex06-build-est-ce-que-vous-pouvez-aider",
    lessonId: "L12",
    operation: "build",
    prompt: "Politely ask for help as a yes/no question.",
    targetText: "Est-ce que vous pouvez m'aider ?",
    // Atomic build: the whole wrapped question as one tile + one owned,
    // producible distractor (another active wrapper question).
    targetItemIds: ["chunk:est-ce-que-vous-pouvez-m-aider"],
    tiles: [
      { itemId: "chunk:est-ce-que-vous-pouvez-m-aider", answerIndex: 0 },
      { itemId: "chunk:est-ce-que-tu-peux-faire-ca" },
    ],
    validationMode: "expected-bank",
  },
  {
    id: "L12-ex07-recognition-boundary-inversion",
    lessonId: "L12",
    operation: "recognition",
    prompt:
      "You may SEE «peux-tu faire ça ?», but L12 doesn't ask you to build inversion — you'll meet it later. Just recognize the meaning.",
    displayAnswer: "Can you do that? (inversion form — L12 uses «est-ce que» instead)",
    targetItemIds: ["chunk:peux-tu-faire-ca"],
    validationMode: "expected-bank",
  },
  {
    id: "L12-ex08-recognition-boundary-qu-est-ce-que",
    lessonId: "L12",
    operation: "recognition",
    prompt:
      "«qu'est-ce que…» looks similar but asks 'what' — a question word, not the yes/no wrapper. Recognize it only.",
    displayAnswer: "What…? (an information question word — opens in a later lesson)",
    targetItemIds: ["chunk:qu-est-ce-que"],
    validationMode: "expected-bank",
  },
  {
    id: "L12-ex09-recognition-est-ce-que-tu-peux",
    lessonId: "L12",
    operation: "recognition",
    prompt: "Recognize this yes/no question.",
    displayAnswer: "Can you do that? (yes/no, wrapped with «est-ce que»)",
    targetItemIds: ["chunk:est-ce-que-tu-peux-faire-ca"],
    validationMode: "expected-bank",
  },
];
