import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-meet-bonjour",
    type: "meet-card",
    targetItemIds: ["chunk-bonjour"],
    payload: {
      fr: "Bonjour.",
      en: "Hello.",
      title: "A first French door.",
      highlights: [{ text: "Bonjour", itemId: "chunk-bonjour" }],
      tts: true,
    },
  },
  {
    id: "s01-meet-je-voudrais-cafe",
    type: "meet-card",
    targetItemIds: ["chunk-je-voudrais", "noun-cafe"],
    weakPointTags: ["politeness", "conditional-softness"],
    payload: {
      fr: "Je voudrais un café.",
      en: "I would like a coffee.",
      title: "A soft, ordinary request.",
      highlights: [
        { text: "je voudrais", itemId: "chunk-je-voudrais" },
        { text: "un café", itemId: "noun-cafe" },
      ],
      tts: true,
    },
  },
  {
    id: "s02-insight-soft-request",
    type: "insight-card",
    targetItemIds: ["chunk-je-voudrais"],
    weakPointTags: ["politeness", "conditional-softness"],
    payload: {
      insightType: "micro-contrast",
      title: "A graceful kind of want.",
      body:
        "French often softens a request through the verb. " +
        "Je voudrais feels more graceful than je veux with someone you don't know.",
      examples: [
        { fr: "Je voudrais un café.", en: "I would like a coffee." },
        { fr: "Je veux un café.", en: "I want a coffee." },
      ],
    },
  },
  {
    id: "s03-fill-je-voudrais-blank",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-voudrais", "noun-cafe"],
    weakPointTags: ["articles"],
    payload: {
      prompt: "What fits the soft request?",
      sentenceBefore: "Bonjour, je voudrais",
      sentenceAfter: ".",
      blankCount: 1,
      options: [
        { id: "opt-cafe", text: "un café", isCorrect: true },
        {
          id: "opt-merci",
          text: "merci",
          isCorrect: false,
          trapReason:
            "Merci closes a moment. It does not name what you want.",
        },
        {
          id: "opt-bonjour",
          text: "bonjour",
          isCorrect: false,
          trapReason:
            "You already greeted at the start. A second bonjour would feel doubled.",
        },
      ],
      answer: ["opt-cafe"],
      reveal: {
        short: "un café",
        explanation:
          "Je voudrais needs a thing. Here, that thing is un café, a coffee.",
        natural: "Bonjour, je voudrais un café.",
      },
    },
  },
  {
    id: "s04-meet-sil-vous-plait",
    type: "meet-card",
    targetItemIds: ["chunk-sil-vous-plait"],
    weakPointTags: ["politeness", "elision"],
    payload: {
      fr: "S'il vous plaît.",
      en: "Please.",
      title: "The quiet tail of a request.",
      highlights: [
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait" },
      ],
      tts: true,
    },
  },
  {
    id: "s05-weave-cafe-order",
    type: "weave",
    targetItemIds: [
      "chunk-bonjour",
      "chunk-je-voudrais",
      "noun-cafe",
      "chunk-sil-vous-plait",
    ],
    weakPointTags: ["politeness"],
    payload: {
      weaveType: "supported",
      prompt: "Write it in French: Hello, I would like a coffee, please.",
      context: "You walk into a small café and order simply.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour", required: true, label: "greeting" },
        { text: "je voudrais", itemId: "chunk-je-voudrais", required: true, label: "polite request" },
        { text: "un café", itemId: "noun-cafe", required: true, label: "noun package" },
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait", label: "softener" },
      ],
      hintCloze: "Bonjour, je voudrais ___, s'il vous plaît.",
      expectedAnswers: ["Bonjour, je voudrais un café, s'il vous plaît."],
      acceptedAlternatives: ["Bonjour, je voudrais un café."],
      reveal: {
        modelAnswer: "Bonjour, je voudrais un café, s'il vous plaît.",
        ifCorrect: "That is exactly how a calm café order sounds.",
        ifCorrectButFlat:
          "Right pieces. The commas mark small natural pauses.",
        ifUnderstandableButWrong:
          "Your meaning lands. A native would join the pieces this way.",
        ifMissingTargetPiece:
          "Add s'il vous plaît to soften the close. It costs nothing and changes the tone.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-sayit-cafe-situation",
    type: "say-it-your-way",
    targetItemIds: [
      "chunk-bonjour",
      "chunk-je-voudrais",
      "noun-cafe",
      "chunk-sil-vous-plait",
    ],
    weakPointTags: ["politeness", "natural-speech"],
    payload: {
      situation:
        "You walk into a small café in the morning. " +
        "The person at the counter looks up. " +
        "Greet them and ask for a coffee politely.",
      communicativeGoal: "Greet, request, soften.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour" },
        { text: "je voudrais", itemId: "chunk-je-voudrais" },
        { text: "un café", itemId: "noun-cafe" },
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait" },
      ],
      modelAnswer: "Bonjour, je voudrais un café, s'il vous plaît.",
      reveal: {
        modelAnswer: "Bonjour, je voudrais un café, s'il vous plaît.",
        naturalAlternatives: ["Bonjour, un café s'il vous plaît."],
        explanation:
          "Both are perfectly natural. " +
          "The longer form leans formal; the shorter form leans casual.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s07-recap-first-step",
    type: "recap",
    payload: {
      title: "Your first French step.",
      lines: [
        "You greeted someone.",
        "You made a soft request.",
        "You built your first useful French sentence.",
      ],
      piecesUsed: [
        "Bonjour",
        "je voudrais",
        "un café",
        "s'il vous plaît",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson000: Lesson = {
  id: "v1-lesson-000",
  version: "v1",
  number: 0,
  title: "The First Step",
  phase: "first-step",
  monolingualMode: "english-guided",
  primaryArchetype: "chunk-natural-speech",
  estimatedMinutes: 5,
  canDo: "Order a coffee politely in a French café.",
  whyItExists:
    "First real French moment. Produce one complete, natural sentence using soft polite forms before any grammar architecture is introduced.",
  prerequisites: [],
  learningItems: getItems([
    "chunk-bonjour",
    "chunk-je-voudrais",
    "noun-cafe",
    "chunk-sil-vous-plait",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "The L1 architecture chunk is intentionally absent from L0. L1 introduces it as the active target.",
    "No XP / streak / level-up / mission complete copy.",
    "Vous register throughout — informal tu is L1+ territory.",
    "SayIt deterministic in L0 (model-answer-only). AI eligibility deferred to later lessons.",
  ],
  qaChecks: [
    "TTS reads Bonjour, S'il vous plaît, and the full café sentence cleanly.",
    "No theatrical positivity tokens (Amazing/Perfect/Crushed).",
    "Apostrophe normalization handles curly quotes in s'il vous plaît.",
    "Unaccented cafe and plait variants pass Weave via accepted alternatives.",
  ],
};
