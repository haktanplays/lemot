/**
 * L2 practice seeds — being somewhere, and saying so.
 *
 * `word-ici` is a VIA_CARRIER item in the readiness matrix: "ici" alone is not
 * something a beginner says, so it is practised only inside `chunk-je-suis-ici`.
 * No seed here targets it on its own, which is the matrix honoured in content
 * rather than merely asserted in a test.
 */
import { fillSeed, weaveSeed } from "./build";
import type { PracticeSeed } from "../practiceTypes";

const L = "v1-lesson-002";

export const L2_SEEDS: PracticeSeed[] = [
  weaveSeed({
    id: "p-l2-retrieve-je-suis-ici",
    operation: "retrieve",
    difficulty: "easy",
    lesson: L,
    required: ["chunk-je-suis-ici"],
    targets: ["chunk-je-suis-ici"],
    weaveType: "mid",
    prompt: "I'm here.",
    answers: ["Je suis ici."],
    alternatives: ["Je suis ici"],
    ifCorrect: "Two words that place you in a room.",
  }),
  fillSeed({
    id: "p-l2-repair-which-engine",
    operation: "repair",
    difficulty: "easy",
    lesson: L,
    required: ["chunk-je-suis", "chunk-je-voudrais"],
    targets: ["chunk-je-suis"],
    prompt: "You are saying where you are, not what you want. Which piece fits?",
    before: "Je ",
    after: " ici.",
    correct: { id: "o-suis", text: "suis" },
    traps: [
      {
        id: "o-voudrais",
        text: "voudrais",
        why: "Je voudrais asks for something. Nothing is being requested here.",
        tag: "wrong_item",
      },
      {
        id: "o-merci-eng",
        text: "merci",
        why: "That thanks someone. It cannot carry a sentence.",
        tag: "wrong_item",
      },
    ],
    short: "Je suis ici.",
    explanation: "Je suis states where you are. It is a different engine from je voudrais.",
  }),
  weaveSeed({
    id: "p-l2-produce-arrive-greeting",
    operation: "produce",
    difficulty: "medium",
    lesson: L,
    required: ["chunk-bonjour", "chunk-je-suis-ici"],
    targets: ["chunk-bonjour", "chunk-je-suis-ici"],
    weaveType: "context",
    prompt: "Greet them, then say you have arrived.",
    context: "You are expected. Someone looks up as you come in.",
    answers: ["Bonjour, je suis ici."],
    alternatives: ["Bonjour. Je suis ici."],
    ifCorrect: "Greeting, then placement. That is a whole arrival.",
  }),
  weaveSeed({
    id: "p-l2-produce-arrive-excuse",
    operation: "produce",
    difficulty: "medium",
    lesson: L,
    required: ["chunk-excusez-moi", "chunk-je-suis-ici"],
    targets: ["chunk-excusez-moi", "chunk-je-suis-ici"],
    weaveType: "context",
    prompt: "Reach them, then say you have arrived.",
    context: "The room is busy and nobody has noticed you in the doorway.",
    answers: ["Excusez-moi, je suis ici."],
    alternatives: ["Excusez-moi. Je suis ici."],
    ifCorrect: "Same sentence, different way in.",
  }),
  weaveSeed({
    id: "p-l2-apply-called-from-next-room",
    operation: "apply",
    difficulty: "hard",
    lesson: L,
    required: ["chunk-je-suis-ici"],
    targets: ["chunk-je-suis-ici"],
    weaveType: "open",
    prompt: "Answer so they know where you are.",
    context: "Someone is calling for you from the next room. They cannot see you.",
    answers: ["Je suis ici."],
    alternatives: ["Je suis ici"],
    ifCorrect: "They can find you now. That is the whole job of the sentence.",
  }),
  weaveSeed({
    id: "p-l2-apply-arrive-and-order",
    operation: "apply",
    difficulty: "hard",
    lesson: L,
    required: [
      "chunk-bonjour",
      "chunk-je-suis-ici",
      "chunk-je-voudrais",
      "noun-cafe",
      "chunk-sil-vous-plait",
    ],
    targets: ["chunk-je-suis-ici", "chunk-je-voudrais", "noun-cafe"],
    weaveType: "open",
    prompt: "Arrive, then ask for what you want.",
    context: "You have just walked in where you were expected, and there is coffee going.",
    answers: ["Bonjour, je suis ici. Je voudrais un café, s'il vous plaît."],
    alternatives: ["Bonjour. Je suis ici. Je voudrais un café, s'il vous plaît."],
    ifCorrect: "Two engines, one moment. Nothing new was needed.",
    ifWrong: "Your meaning lands. Place yourself first, then ask.",
  }),
  weaveSeed({
    id: "p-l2-apply-arrive-and-order-tea",
    operation: "apply",
    difficulty: "hard",
    lesson: L,
    required: ["chunk-bonjour", "chunk-je-suis-ici", "chunk-je-voudrais", "chunk-un-the"],
    targets: ["chunk-je-suis-ici", "chunk-un-the"],
    weaveType: "open",
    prompt: "Arrive, then order the other drink.",
    context: "Same arrival, and today it is tea you want.",
    answers: ["Bonjour, je suis ici. Je voudrais un thé, s'il vous plaît."],
    alternatives: ["Bonjour. Je suis ici. Je voudrais un thé, s'il vous plaît."],
    ifCorrect: "The frame held and only the thing inside it changed.",
  }),
];
