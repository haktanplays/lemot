/**
 * L10 practice seeds — a whole small day.
 *
 * NOT included here, deliberately: `chunk-vous-pouvez` and `chunk-m-aider`.
 * L10 declares them `supported`, but it only ever PREVIEWS them on a "Just
 * listen." card — the production that owns them lives in L11. An L1-L10 learner
 * has therefore not lawfully reached them, and demanding them would be exactly
 * the future-language failure the eligibility rule exists to prevent.
 */
import { fillSeed, weaveSeed } from "./build";
import type { PracticeSeed } from "../practiceTypes";

const L = "v1-lesson-010";

export const L10_SEEDS: PracticeSeed[] = [
  weaveSeed({
    id: "p-l10-apply-morning-arrival",
    operation: "apply",
    difficulty: "medium",
    lesson: L,
    required: ["chunk-bonjour", "chunk-c-est-ou", "adverb-ou-where"],
    targets: ["chunk-bonjour", "chunk-c-est-ou", "adverb-ou-where"],
    weaveType: "context",
    prompt: "Open politely, then ask where it is.",
    context: "Morning. First time in this building, and the room you need is not where you expected.",
    answers: ["Bonjour. C'est où ?"],
    alternatives: ["Bonjour, c'est où ?"],
    ifCorrect: "The day starts the way every day here starts.",
  }),
  fillSeed({
    id: "p-l10-repair-lost-the-thread",
    operation: "repair",
    difficulty: "medium",
    lesson: L,
    required: ["chunk-je-ne-comprends-pas", "chunk-c-est-ou"],
    targets: ["chunk-je-ne-comprends-pas"],
    tags: ["natural-speech"],
    repairs: "natural-speech",
    prompt: "They answer you warmly, at speed, with three details you did not catch.",
    correct: { id: "o-jncp-day", text: "Je ne comprends pas." },
    traps: [
      {
        id: "o-merci-day",
        text: "Merci.",
        why: "That closes it politely and leaves you exactly as lost.",
        tag: "meaning_shift",
      },
      {
        id: "o-cest-ici-day",
        text: "C'est ici.",
        why: "That answers the question you asked, as if you were the one who knew.",
        tag: "meaning_shift",
      },
    ],
    short: "Je ne comprends pas.",
    explanation: "Naming the problem is what keeps the day moving.",
  }),
  weaveSeed({
    id: "p-l10-repair-say-so-and-ask-again",
    operation: "repair",
    difficulty: "hard",
    lesson: L,
    required: ["chunk-je-ne-comprends-pas", "chunk-c-est-ou"],
    targets: ["chunk-je-ne-comprends-pas", "chunk-c-est-ou"],
    tags: ["natural-speech"],
    repairs: "natural-speech",
    weaveType: "open",
    prompt: "Say you did not follow, then put the question back.",
    context: "They have paused, willing to go again. You get one clean try at this.",
    answers: ["Je ne comprends pas. C'est où ?"],
    alternatives: ["Je ne comprends pas, c'est où ?"],
    ifCorrect: "That is the whole repair: name the problem, then ask again.",
    ifWrong: "Your meaning lands. Say you did not follow first, then ask the question again.",
  }),
  weaveSeed({
    id: "p-l10-apply-midday-break",
    operation: "apply",
    difficulty: "medium",
    lesson: L,
    required: ["chunk-je-voudrais", "chunk-faire-une-pause"],
    targets: ["chunk-je-voudrais", "chunk-faire-une-pause"],
    weaveType: "context",
    prompt: "Say you'd like to take a break.",
    context: "Midday. You have been on your feet since you arrived, and someone asks how you are doing.",
    answers: ["Je voudrais faire une pause."],
    alternatives: ["Je voudrais faire une pause, s'il vous plaît."],
    ifCorrect: "Middle of the day, and you can still ask for what you need.",
  }),
  weaveSeed({
    id: "p-l10-apply-close-the-day",
    operation: "apply",
    difficulty: "hard",
    lesson: L,
    required: ["chunk-je-vais", "chunk-a-la-maison", "chunk-au-revoir"],
    targets: ["chunk-je-vais", "chunk-au-revoir"],
    weaveType: "open",
    prompt: "Say you're going home, then say goodbye.",
    context: "Evening. The day at the new place is done and people are still talking.",
    answers: ["Je vais à la maison. Au revoir."],
    alternatives: ["Je vais à la maison, au revoir."],
    ifCorrect: "You opened the day in French and you closed it in French.",
  }),
  weaveSeed({
    id: "p-l10-apply-here-and-lost",
    operation: "apply",
    difficulty: "hard",
    lesson: L,
    required: ["chunk-je-suis", "chunk-c-est-ou"],
    targets: ["chunk-je-suis", "chunk-c-est-ou"],
    weaveType: "open",
    prompt: "Say you have arrived, then ask where to go.",
    context: "You are through the front door and expected, but nobody said which room.",
    answers: ["Je suis ici. C'est où ?"],
    alternatives: ["Je suis ici, c'est où ?"],
    ifCorrect: "Two things you own, doing a job neither could do alone.",
    ifWrong: "Your meaning lands. Say you are here, then ask where to go.",
  }),
  weaveSeed({
    id: "p-l10-apply-whole-day",
    operation: "apply",
    difficulty: "hard",
    lesson: L,
    required: [
      "chunk-bonjour",
      "chunk-c-est-ou",
      "chunk-faire-une-pause",
      "chunk-je-vais",
      "chunk-au-revoir",
    ],
    targets: ["chunk-c-est-ou", "chunk-faire-une-pause", "chunk-au-revoir"],
    weaveType: "open",
    prompt: "Take the whole day, from arriving to leaving.",
    context: "Arrive, find the room, ask for your break, and go home at the end of it.",
    answers: [
      "Bonjour. C'est où ? Je voudrais faire une pause. Je vais à la maison. Au revoir.",
    ],
    alternatives: [
      "Bonjour, c'est où ? Je voudrais faire une pause. Je vais à la maison. Au revoir.",
    ],
    ifCorrect: "A whole day in French, out of pieces you already had.",
    ifWrong: "Your meaning lands. Arrive, ask, request your break, then leave.",
  }),
];
