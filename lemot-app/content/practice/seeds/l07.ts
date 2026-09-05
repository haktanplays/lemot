/**
 * L7 practice seeds — leaving.
 *
 * L7's own item list is short (je vais, à la maison, au revoir, merci, non
 * merci, oui), so every seed here targets only those. Earlier language appears
 * as REQUIRED frame material, which is what `requiredItemIds` is for: it gates
 * eligibility without claiming the attempt demonstrated it.
 */
import { fillSeed, weaveSeed } from "./build";
import type { PracticeSeed } from "../practiceTypes";

const L = "v1-lesson-007";

export const L7_SEEDS: PracticeSeed[] = [
  weaveSeed({
    id: "p-l7-retrieve-je-vais",
    operation: "retrieve",
    difficulty: "easy",
    lesson: L,
    required: ["chunk-je-vais", "chunk-a-la-maison"],
    targets: ["chunk-je-vais", "chunk-a-la-maison"],
    weaveType: "mid",
    prompt: "I'm going home.",
    answers: ["Je vais à la maison."],
    alternatives: ["Je vais à la maison"],
    ifCorrect: "One frozen piece that moves you somewhere.",
  }),
  fillSeed({
    id: "p-l7-repair-which-mover",
    operation: "repair",
    difficulty: "easy",
    lesson: L,
    required: ["chunk-je-vais", "chunk-je-suis"],
    targets: ["chunk-je-vais"],
    prompt: "You are leaving for home. Which word moves you?",
    before: "Je ",
    after: " à la maison.",
    correct: { id: "o-vais", text: "vais" },
    traps: [
      {
        id: "o-suis-home",
        text: "suis",
        why: "That says you ARE at home. You are still here, on your way.",
        tag: "meaning_shift",
      },
      {
        id: "o-voudrais-home",
        text: "voudrais",
        why: "That asks for home rather than heading there.",
        tag: "meaning_shift",
      },
    ],
    short: "Je vais à la maison.",
    explanation: "Je vais moves you. Je suis places you.",
  }),
  fillSeed({
    id: "p-l7-retrieve-destination",
    operation: "retrieve",
    difficulty: "easy",
    lesson: L,
    required: ["chunk-a-la-maison", "chunk-je-vais"],
    targets: ["chunk-a-la-maison"],
    prompt: "Which piece names where you are heading?",
    before: "Je vais ",
    after: ".",
    correct: { id: "o-a-la-maison", text: "à la maison" },
    traps: [
      {
        id: "o-ici-dest",
        text: "ici",
        why: "That is where you already are, not where you are going.",
        tag: "meaning_shift",
      },
      {
        id: "o-au-revoir-dest",
        text: "au revoir",
        why: "That closes the moment. It is not a place.",
        tag: "wrong_item",
      },
    ],
    short: "Je vais à la maison.",
    explanation: "À la maison travels whole. You never take it apart.",
  }),
  weaveSeed({
    id: "p-l7-apply-go-and-close",
    operation: "apply",
    difficulty: "medium",
    lesson: L,
    required: ["chunk-je-vais", "chunk-a-la-maison", "chunk-au-revoir"],
    targets: ["chunk-je-vais", "chunk-au-revoir"],
    weaveType: "context",
    prompt: "Say where you are going, then close the room behind you.",
    context: "Evening. People are still talking, but you are finished.",
    answers: ["Je vais à la maison. Au revoir."],
    alternatives: ["Je vais à la maison, au revoir."],
    ifCorrect: "Leaving has two halves and you did both.",
  }),
  weaveSeed({
    id: "p-l7-apply-yes-then-go",
    operation: "apply",
    difficulty: "medium",
    lesson: L,
    required: ["chunk-oui", "chunk-je-vais", "chunk-a-la-maison"],
    targets: ["chunk-oui", "chunk-je-vais"],
    weaveType: "context",
    prompt: "Answer them, then say where you are going.",
    context: "They see you reaching for your coat and ask whether you are heading off. You are.",
    answers: ["Oui, je vais à la maison."],
    alternatives: ["Oui. Je vais à la maison."],
    ifCorrect: "Answer first, then the detail. Same shape as every other reply you own.",
  }),
  weaveSeed({
    id: "p-l7-apply-decline-and-go",
    operation: "apply",
    difficulty: "hard",
    lesson: L,
    required: ["chunk-non-merci", "chunk-je-vais", "chunk-a-la-maison"],
    targets: ["chunk-non-merci", "chunk-je-vais"],
    weaveType: "open",
    prompt: "Turn the offer down, then say where you are heading.",
    context: "Your coat is on. They hold up the pot and offer you one more coffee.",
    answers: ["Non merci. Je vais à la maison."],
    alternatives: ["Non merci, je vais à la maison."],
    ifCorrect: "Declined warmly, and you are out of the door.",
    ifWrong: "Your meaning lands. Turn it down first, then say where you are going.",
  }),
  weaveSeed({
    id: "p-l7-apply-thanks-go-close",
    operation: "apply",
    difficulty: "hard",
    lesson: L,
    required: ["chunk-merci", "chunk-je-vais", "chunk-a-la-maison", "chunk-au-revoir"],
    targets: ["chunk-merci", "chunk-je-vais", "chunk-au-revoir"],
    weaveType: "open",
    prompt: "Thank them, say where you are going, and close it.",
    context: "They walked you to the door at the end of a long day.",
    answers: ["Merci. Je vais à la maison. Au revoir."],
    alternatives: ["Merci, je vais à la maison. Au revoir."],
    ifCorrect: "Warm, clear, and finished. Nothing in it is new.",
    ifWrong: "Your meaning lands. Thanks, then where you are going, then goodbye.",
  }),
];
