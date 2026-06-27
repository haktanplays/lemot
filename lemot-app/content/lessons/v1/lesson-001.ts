import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-survival-kit",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Your survival kit",
      body:
        "Today: greet someone, ask politely, and thank.\n" +
        "By the end: you can carry a first small exchange in French.\n" +
        "Main pieces: bonjour, je voudrais, merci.",
    },
  },
  {
    id: "s00-meet-bonjour",
    type: "meet-card",
    targetItemIds: ["chunk-bonjour"],
    payload: {
      fr: "Bonjour.",
      en: "Hello.",
      title: "Your first French door.",
      highlights: [{ text: "Bonjour", itemId: "chunk-bonjour" }],
      tts: true,
    },
  },
  {
    id: "s01-insight-survival-kit",
    type: "insight-card",
    targetItemIds: ["chunk-bonjour", "chunk-merci"],
    payload: {
      insightType: "culture-bite",
      title: "A small kit goes a long way.",
      body:
        "A handful of polite words carries a whole exchange in French. " +
        "Greet, ask softly, and thank. That kit is enough to handle a real first moment.",
      examples: [
        { fr: "Bonjour.", en: "Hello." },
        { fr: "Merci.", en: "Thank you." },
      ],
    },
  },
  {
    id: "s02-meet-je-voudrais-cafe",
    type: "meet-card",
    targetItemIds: ["chunk-je-voudrais", "noun-cafe"],
    weakPointTags: ["politeness", "conditional-softness"],
    payload: {
      fr: "Je voudrais un café.",
      en: "I would like a coffee.",
      title: "A soft, polite request.",
      highlights: [
        { text: "je voudrais", itemId: "chunk-je-voudrais" },
        { text: "un café", itemId: "noun-cafe" },
      ],
      tts: true,
    },
  },
  {
    id: "s03-fill-polite-verb",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-voudrais"],
    weakPointTags: ["politeness"],
    payload: {
      prompt: "Which word keeps the request polite?",
      sentenceBefore: "Bonjour, je",
      sentenceAfter: "un café.",
      blankCount: 1,
      options: [
        { id: "opt-voudrais", text: "voudrais", isCorrect: true },
        {
          id: "opt-veux",
          text: "veux",
          isCorrect: false,
          trapReason:
            "It works, but it sounds blunt with someone you don't know. Je voudrais stays polite.",
        },
        {
          id: "opt-suis",
          text: "suis",
          isCorrect: false,
          trapReason: "Je suis means I am. It cannot ask for a coffee.",
        },
      ],
      answer: ["opt-voudrais"],
      reveal: {
        short: "voudrais",
        explanation:
          "Je voudrais softens any request. It is the polite way to ask a stranger for a coffee, or for anything else.",
        natural: "Bonjour, je voudrais un café.",
      },
    },
  },
  {
    id: "s04-weave-cafe-order",
    type: "weave",
    targetItemIds: ["chunk-bonjour", "chunk-je-voudrais", "noun-cafe"],
    weakPointTags: ["politeness"],
    payload: {
      weaveType: "supported",
      prompt: "Write it in French: Hello, I would like a coffee.",
      context: "You step up to the counter and order simply.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour", required: true, label: "greeting" },
        { text: "je voudrais", itemId: "chunk-je-voudrais", required: true, label: "polite request" },
        { text: "un café", itemId: "noun-cafe", required: true, label: "noun package" },
      ],
      hintCloze: "Bonjour, je voudrais ___.",
      expectedAnswers: ["Bonjour, je voudrais un café."],
      reveal: {
        modelAnswer: "Bonjour, je voudrais un café.",
        ifCorrect: "That is exactly how a calm order begins.",
        ifCorrectButFlat:
          "Right pieces. The comma marks a small natural pause.",
        ifUnderstandableButWrong:
          "Your meaning lands. A native joins the pieces this way.",
        ifMissingTargetPiece:
          "Start with bonjour, then the request.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-meet-sil-vous-plait",
    type: "meet-card",
    targetItemIds: ["chunk-sil-vous-plait"],
    weakPointTags: ["politeness", "elision"],
    payload: {
      fr: "S'il vous plaît.",
      en: "Please.",
      title: "The polite tail of a request.",
      highlights: [
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait" },
      ],
      tts: true,
    },
  },
  {
    id: "s06-weave-cafe-order-please",
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
      context: "Add the soft close to your order.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour", required: true, label: "greeting" },
        { text: "je voudrais", itemId: "chunk-je-voudrais", required: true, label: "polite request" },
        { text: "un café", itemId: "noun-cafe", required: true, label: "noun package" },
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait", label: "softener" },
      ],
      hintCloze: "Bonjour, je voudrais ___, s'il vous plaît.",
      expectedAnswers: ["Bonjour, je voudrais un café, s'il vous plaît."],
      reveal: {
        modelAnswer: "Bonjour, je voudrais un café, s'il vous plaît.",
        ifCorrect: "That is a full, polite café order.",
        ifCorrectButFlat:
          "Right pieces. The commas mark small natural pauses.",
        ifMissingTargetPiece:
          "Add s'il vous plaît to soften the close. It costs nothing and changes the tone.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s07-meet-merci",
    type: "meet-card",
    targetItemIds: ["chunk-merci"],
    payload: {
      fr: "Merci.",
      en: "Thank you.",
      title: "Close with thanks.",
      highlights: [{ text: "Merci", itemId: "chunk-merci" }],
      tts: true,
    },
  },
  {
    id: "s08-sayit-cafe-order",
    type: "say-it-your-way",
    targetItemIds: [
      "chunk-bonjour",
      "chunk-je-voudrais",
      "noun-cafe",
      "chunk-sil-vous-plait",
      "chunk-merci",
    ],
    weakPointTags: ["politeness", "natural-speech"],
    payload: {
      situation: "This is your order: un café.",
      communicativeGoal:
        "Make it sound natural: add a soft opening, ask for it politely, close the request politely, and thank them if you like.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour" },
        { text: "je voudrais", itemId: "chunk-je-voudrais" },
        { text: "un café", itemId: "noun-cafe" },
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait" },
        { text: "merci", itemId: "chunk-merci" },
      ],
      modelAnswer: "Bonjour, je voudrais un café, s'il vous plaît. Merci !",
      reveal: {
        modelAnswer: "Bonjour, je voudrais un café, s'il vous plaît. Merci !",
        naturalAlternatives: ["Bonjour, un café s'il vous plaît. Merci !"],
        explanation:
          "Both are natural. The longer form leans formal; the shorter form leans casual.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s09-recap-survival-kit",
    type: "recap",
    payload: {
      title: "Your survival kit.",
      lines: [
        "You greeted someone.",
        "You asked for a coffee politely.",
        "You softened the request and closed with thanks.",
      ],
      piecesUsed: [
        "Bonjour",
        "je voudrais",
        "un café",
        "s'il vous plaît",
        "merci",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson001: Lesson = {
  id: "v1-lesson-001",
  version: "v1",
  number: 1,
  title: "Survival Kit",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "chunk-natural-speech",
  estimatedMinutes: 6,
  canDo: "Greet, ask for something politely, and thank.",
  whyItExists:
    "L0 gave one polite café line as a first taste. L1 grows it into a small survival kit: greet, make a soft request, and thank. These polite chunks carry a whole first exchange before any verb system arrives in L2.",
  prerequisites: [],
  learningItems: getItems([
    "chunk-bonjour",
    "chunk-merci",
    "chunk-sil-vous-plait",
    "chunk-je-voudrais",
    "noun-cafe",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Compact survival kit: bonjour, je voudrais, un café, s'il vous plaît, merci. No phrasebook list of greetings.",
    "Politeness lives in the verb: je voudrais vs je veux is taught as register, never as an error.",
    "Vous register throughout. Informal tu is L3 territory.",
    "SayIt is deterministic and model-answer-only, consistent with L0.",
    "No XP / streak / level-up / mission copy.",
    "c'est, au revoir, and the wider rescue/location kit from the L1 syllabus spec are intentionally out of this compact slice.",
  ],
  qaChecks: [
    "TTS reads Bonjour, Je voudrais un café, S'il vous plaît, and Merci cleanly.",
    "Apostrophe normalization handles curly quotes in s'il vous plaît.",
    "Unaccented cafe and plait variants pass Weave via accepted alternatives.",
    "s03 trap reasons fire on veux and suis selections.",
    "No theatrical positivity tokens appear.",
    "No mention of streak, XP, level, or mission.",
  ],
};
