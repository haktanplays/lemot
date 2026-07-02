import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-petit-moment",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "One small moment",
      body:
        "Today: no new rule.\n" +
        "By the end: you can carry one small human moment with pieces you already built.\n" +
        "Main pieces: bonjour, je suis, ici, j'ai, une question, merci, au revoir.",
    },
  },
  {
    id: "s00-insight-bonjour-to-au-revoir",
    type: "insight-card",
    targetItemIds: ["chunk-bonjour", "chunk-au-revoir"],
    payload: {
      insightType: "culture-bite",
      title: "From bonjour to au revoir.",
      body:
        "In France, a small moment opens with bonjour and closes with au " +
        "revoir. Today you carry the whole arc, using only the pieces you " +
        "already built. No new rule.",
      examples: [
        { fr: "Bonjour.", en: "Hello." },
        { fr: "Au revoir.", en: "Goodbye." },
      ],
    },
  },
  {
    id: "s01-meet-bonjour-at-the-door",
    type: "meet-card",
    targetItemIds: ["chunk-bonjour"],
    payload: {
      fr: "Bonjour.",
      en: "Hello.",
      title: "At the door.",
      highlights: [{ text: "Bonjour", itemId: "chunk-bonjour" }],
      tts: true,
    },
  },
  {
    id: "s02-fill-right-place",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-suis-ici", "chunk-je-ne-suis-pas"],
    weakPointTags: ["avoir-vs-etre"],
    payload: {
      prompt: "You reach the right door and step in. What do you say?",
      blankCount: 1,
      options: [
        { id: "opt-ici", text: "Je suis ici.", isCorrect: true },
        {
          id: "opt-pas-ici",
          text: "Je ne suis pas ici.",
          isCorrect: false,
          trapReason:
            "That says the opposite. You are here, so: Je suis ici.",
        },
        {
          id: "opt-faim",
          text: "J'ai faim.",
          isCorrect: false,
          trapReason: "That is a feeling, not where you are.",
        },
      ],
      answer: ["opt-ici"],
      reveal: {
        short: "Je suis ici.",
        explanation: "You are in the right place, so you say where you are.",
        natural: "Je suis ici.",
      },
    },
  },
  {
    id: "s03-weave-bonjour-je-suis-ici",
    type: "weave",
    targetItemIds: ["chunk-bonjour", "chunk-je-suis-ici", "chunk-je-suis"],
    weakPointTags: ["natural-speech"],
    payload: {
      weaveType: "context",
      prompt: "Write it in French: Hello. I am here.",
      context: "You are at the door. Greet, then say you have arrived.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour", required: true, label: "greeting" },
        { text: "je suis", itemId: "chunk-je-suis", required: true, label: "I am" },
        { text: "ici", required: true, label: "place word" },
      ],
      hintCloze: "Bonjour, je suis ___.",
      expectedAnswers: ["Bonjour, je suis ici."],
      reveal: {
        modelAnswer: "Bonjour, je suis ici.",
        ifCorrect: "You opened the moment and said where you are.",
        ifCorrectButFlat: "Right. The greeting and the arrival, in one line.",
        ifMissingTargetPiece: "Start with bonjour, then je suis ici.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s04-fill-decline-offer",
    type: "fill-with-traps",
    targetItemIds: ["chunk-non-merci"],
    weakPointTags: ["politeness", "negation"],
    payload: {
      prompt: "Inside, someone offers you a coffee. You are fine without one. What do you say?",
      blankCount: 1,
      options: [
        { id: "opt-non-merci", text: "Non merci.", isCorrect: true },
        {
          id: "opt-merci",
          text: "Merci.",
          isCorrect: false,
          trapReason:
            "Merci alone can sound like yes please. Non merci makes the no clear.",
        },
        {
          id: "opt-question",
          text: "J'ai une question.",
          isCorrect: false,
          trapReason: "That does not answer the offer.",
        },
      ],
      answer: ["opt-non-merci"],
      reveal: {
        short: "Non merci.",
        explanation: "A soft, clear refusal: non to decline, merci to stay polite.",
        natural: "Non merci.",
      },
    },
  },
  {
    id: "s05-weave-j-ai-une-question",
    type: "weave",
    targetItemIds: ["chunk-j-ai", "chunk-j-ai-une-question", "chunk-une-question"],
    weakPointTags: ["j-ai-vs-je-suis"],
    payload: {
      weaveType: "context",
      prompt: "Write it in French: I have a question.",
      context: "There is one small thing you came to ask. Open it.",
      suggestedPieces: [
        { text: "j'ai", itemId: "chunk-j-ai", required: true, label: "I have" },
        { text: "une question", itemId: "chunk-une-question", required: true, label: "noun package" },
      ],
      expectedAnswers: ["J'ai une question."],
      acceptedAlternatives: [
        "J ai une question.",
        "J ai une question",
      ],
      reveal: {
        modelAnswer: "J'ai une question.",
        ifCorrect: "You opened your reason for being there.",
        ifCorrectButFlat: "Right. j'ai carries the question, as one package.",
        ifMissingTargetPiece: "Use j'ai, then une question.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-meet-au-revoir",
    type: "meet-card",
    targetItemIds: ["chunk-au-revoir"],
    weakPointTags: ["politeness"],
    payload: {
      fr: "Au revoir.",
      en: "Goodbye.",
      title: "The close.",
      highlights: [{ text: "Au revoir", itemId: "chunk-au-revoir" }],
      tts: true,
    },
  },
  {
    id: "s07-sayit-step-in",
    type: "say-it-your-way",
    targetItemIds: [
      "chunk-bonjour",
      "chunk-je-suis-ici",
      "chunk-j-ai-une-question",
    ],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "You have just stepped in. Greet them, say you are here, and open your one small question.",
      communicativeGoal: "Greet, locate, and open your question.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour" },
        { text: "je suis", itemId: "chunk-je-suis" },
        { text: "ici" },
        { text: "j'ai", itemId: "chunk-j-ai" },
        { text: "une question", itemId: "chunk-une-question" },
      ],
      answerBands: {
        minimalAcceptable: ["Bonjour. J'ai une question."],
        good: ["Bonjour. Je suis ici. J'ai une question."],
        natural: ["Bonjour. Je suis ici. J'ai une question."],
      },
      modelAnswer: "Bonjour. Je suis ici. J'ai une question.",
      reveal: {
        modelAnswer: "Bonjour. Je suis ici. J'ai une question.",
        explanation:
          "Three pieces you already own, in the order a real moment uses them.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s08-weave-close-open",
    type: "weave",
    targetItemIds: ["chunk-merci", "chunk-au-revoir"],
    weakPointTags: ["politeness"],
    payload: {
      weaveType: "open",
      prompt: "Close the moment in French: thank them and say goodbye.",
      context: "You are about to leave. Thank them, then close.",
      suggestedPieces: [
        { text: "merci", itemId: "chunk-merci", label: "thanks" },
        { text: "au revoir", itemId: "chunk-au-revoir", label: "closing" },
      ],
      expectedAnswers: ["Merci, au revoir."],
      reveal: {
        modelAnswer: "Merci, au revoir.",
        ifCorrect: "That is how a moment closes: thanks, then goodbye.",
        ifCorrectButFlat: "Right. merci then au revoir, and you are out the door.",
        ifMissingTargetPiece: "Thank first with merci, then close with au revoir.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s09-sayit-whole-moment",
    type: "say-it-your-way",
    targetItemIds: [
      "chunk-bonjour",
      "chunk-je-suis-ici",
      "chunk-j-ai-une-question",
      "chunk-merci",
      "chunk-au-revoir",
    ],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "You arrive for a small first meeting. Greet, say you are here, say you " +
        "have one small thing to ask, thank them, and leave. Use the French " +
        "pieces you already have.",
      communicativeGoal: "Carry the whole moment, from the door to goodbye.",
      answerBands: {
        minimalAcceptable: ["Bonjour. J'ai une question. Merci. Au revoir."],
        good: ["Bonjour. Je suis ici. J'ai une question. Merci. Au revoir."],
        natural: ["Bonjour. Je suis ici. J'ai une question. Merci. Au revoir."],
      },
      modelAnswer: "Bonjour. Je suis ici. J'ai une question. Merci. Au revoir.",
      reveal: {
        modelAnswer: "Bonjour. Je suis ici. J'ai une question. Merci. Au revoir.",
        ifCorrect: "You carried the whole moment, from the door to goodbye.",
        ifBetterThanExpected:
          "You used more than the minimum. That is a real first exchange, start to finish.",
        naturalAlternatives: [
          "Bonjour. J'ai une question. Merci. Au revoir.",
          "Bonjour. Je suis ici. J'ai une question. Merci, au revoir.",
        ],
        explanation:
          "Every piece here is one you already built. Put together, they make a small French moment.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s10-recap-a-small-moment",
    type: "recap",
    payload: {
      title: "A small moment.",
      lines: [
        "This was not a quiz. It was a small moment.",
        "You carried it in French, from bonjour to au revoir.",
        "No new rule. Just the pieces you already built.",
      ],
      piecesUsed: [
        "Bonjour",
        "je suis",
        "ici",
        "j'ai",
        "une question",
        "Merci",
        "Au revoir",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson006: Lesson = {
  id: "v1-lesson-006",
  version: "v1",
  number: 6,
  title: "Un petit moment",
  phase: "summit-gate",
  monolingualMode: "english-guided",
  primaryArchetype: "review-integration",
  estimatedMinutes: 7,
  canDo:
    "Carry a whole small French moment: greet, say where you are, ask one thing, thank, and close.",
  whyItExists:
    "L1-L5 each gave a few pieces. L6 adds no new grammar and only one new chunk, au revoir. Its job is to let the learner carry a whole small human moment in French by recombining what they already own, from bonjour at the door to au revoir at the close. This is the Round 1 payoff: a moment, not a quiz.",
  prerequisites: ["v1-lesson-005"],
  learningItems: getItems([
    "chunk-au-revoir",
    "chunk-bonjour",
    "chunk-je-suis-ici",
    "chunk-je-suis",
    "chunk-je-ne-suis-pas",
    "chunk-non-merci",
    "chunk-j-ai",
    "chunk-j-ai-une-question",
    "chunk-une-question",
    "chunk-merci",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Integration payoff lesson (L6). L6 maps to the slice-spec PR J. Adds no new grammar and exactly one new item, chunk-au-revoir. Density comes from recombining owned L1-L5 material, not new acquisition.",
    "Guided roleplay without AI: the scene is fixed and deterministic. Meaning-based micro-choices (s02 location, s04 social offer), suggested-piece productions (s03, s05), a scaffold-fade open weave (s08), and two model-answer-only Say It Your Way screens drive retrieval. No free AI roleplay and no simulated interlocutor producing unseen French.",
    "Ezber guardrail: no screen asks the learner to repeat a pre-shown script. Each production is prompted by the situation; the learner assembles owned pieces.",
    "Non-café scene: a small first meeting at a door. un café appears only as someone else's offer in the English prompt text (s04), declined with Non merci; no café is produced in French and no counter transaction occurs.",
    "Micro-choice (meaning): s02 right-place Je suis ici vs wrong-place Je ne suis pas ici. Social-response: s04 decline a coffee offer with Non merci.",
    "Scaffold fade: s08 is the slice's only open weave, with hint pieces that are not required, before the final situation-prompted production at s09.",
    "answerBands and ifBetterThanExpected are used on the Say It Your Way and reveal screens because LessonRendererV1 (SayItYourWayV1, NaturalReveal) renders them. modelAnswer and expectedAnswers remain authoritative for the deterministic path.",
    "Final say-it accepted alternatives match the screen context only: the learner arrives and is present, so Je suis ici fits; the Je ne suis pas ici variant is intentionally excluded from the final close.",
    "Deferred: aide, comprendre, mais, the fuller L6 syllabus spec, and all later-lesson material. No new grammar engine, no architecture verb, no new screen type.",
    "Tone: calm premium mentor, quietly motivating. No XP / streak / level / score / reward / perfect / amazing copy.",
  ],
  qaChecks: [
    "TTS reads Bonjour, Je suis ici, J'ai une question, Merci, and Au revoir cleanly.",
    "s02 fires the wrong-place and feeling traps; s04 fires the bare-merci and wrong-response traps.",
    "Open weave s08 accepts Merci, au revoir variants including no-comma forms.",
    "Final say-it shows answerBands minimal/good/natural and the ifBetterThanExpected branch; modelAnswer remains the deterministic path.",
    "No repeated negation tokens in any French string.",
    "No theatrical positivity tokens appear; the payoff reads calm, not gamified.",
  ],
};
