import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-meet-je-suis-ici",
    type: "meet-card",
    targetItemIds: ["chunk-je-suis-ici", "chunk-je-suis"],
    payload: {
      fr: "Je suis ici.",
      en: "I am here.",
      title: "Two words. Where you are.",
      highlights: [{ text: "je suis", itemId: "chunk-je-suis" }],
      tts: true,
    },
  },
  {
    id: "s01-insight-je-suis-engine",
    type: "insight-card",
    targetItemIds: ["chunk-je-suis"],
    payload: {
      insightType: "grammar-nugget",
      title: "Your first French sentence engine.",
      body: "Je suis = I am. This shape is small. You will use it again and again.",
      examples: [{ fr: "Je suis ici.", en: "I am here." }],
    },
  },
  {
    id: "s02-meet-bonjour-je-suis-ici",
    type: "meet-card",
    targetItemIds: ["chunk-bonjour", "chunk-je-suis-ici"],
    payload: {
      fr: "Bonjour, je suis ici.",
      en: "Hello, I am here.",
      title: "Greet, then locate.",
      highlights: [
        { text: "Bonjour", itemId: "chunk-bonjour" },
        { text: "je suis", itemId: "chunk-je-suis" },
      ],
      tts: true,
    },
  },
  {
    id: "s03-fill-je-suis-blank",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-suis"],
    payload: {
      prompt: "What fits the empty space?",
      sentenceBefore: "Je ",
      sentenceAfter: " ici.",
      blankCount: 1,
      options: [
        { id: "opt-suis", text: "suis", isCorrect: true },
        {
          id: "opt-voudrais",
          text: "voudrais",
          isCorrect: false,
          trapReason:
            "You met je voudrais in the last lesson. It asks for something. It does not say where you are.",
        },
        {
          id: "opt-bonjour",
          text: "bonjour",
          isCorrect: false,
          trapReason:
            "Bonjour is a greeting. It cannot sit between Je and ici.",
        },
      ],
      answer: ["opt-suis"],
      reveal: {
        short: "suis",
        explanation:
          "Je suis = I am. That is the shape that names your location.",
        natural: "Je suis ici.",
      },
    },
  },
  {
    id: "s04-weave-je-suis-ici",
    type: "weave",
    targetItemIds: ["chunk-je-suis-ici", "chunk-je-suis"],
    payload: {
      weaveType: "supported",
      prompt: "Write it in French: I am here.",
      context: "Someone called your name. Let them know you've arrived.",
      suggestedPieces: [
        { text: "je suis", itemId: "chunk-je-suis", required: true },
        { text: "ici", required: true },
      ],
      expectedAnswers: ["Je suis ici."],
      acceptedAlternatives: ["Je suis ici", "je suis ici.", "je suis ici"],
      reveal: {
        modelAnswer: "Je suis ici.",
        ifCorrect: "Two words. One French engine, running.",
        ifCorrectButFlat:
          "The pieces fit. The period gives the sentence a small landing.",
        ifUnderstandableButWrong:
          "Your meaning lands. A native joins the pieces this way.",
        ifMissingTargetPiece:
          "Start with je suis. That is the shape that does the work.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-weave-call-and-respond",
    type: "weave",
    targetItemIds: ["chunk-je-suis-ici", "chunk-je-suis"],
    payload: {
      weaveType: "supported",
      prompt: "Write it in French: I am here.",
      context:
        "Someone in the next room calls out, looking for you. Let them know you're here.",
      suggestedPieces: [
        { text: "je suis", itemId: "chunk-je-suis", required: true },
        { text: "ici", required: true },
      ],
      expectedAnswers: ["Je suis ici."],
      acceptedAlternatives: ["Je suis ici", "je suis ici.", "je suis ici"],
      reveal: {
        modelAnswer: "Je suis ici.",
        ifCorrect: "Same shape. Different moment. That is how the engine works.",
        ifCorrectButFlat:
          "Right. The shape does not change between situations.",
        ifMissingTargetPiece: "Same two words as before: je suis + ici.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-insight-shape-noticed",
    type: "insight-card",
    targetItemIds: ["chunk-je-suis"],
    payload: {
      insightType: "grammar-nugget",
      title: "Notice the shape.",
      body: "You just wrote Je suis ici twice. The shape stayed the same. Only the moment around it changed. That is what an engine does.",
      examples: [{ fr: "Je suis ici.", en: "I am here." }],
    },
  },
  {
    id: "s07-sayit-arrive-locate",
    type: "say-it-your-way",
    targetItemIds: ["chunk-je-suis", "chunk-je-suis-ici"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "You step into a small room. People look up. Let them know you've arrived.",
      communicativeGoal: "Signal you are here.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour" },
        { text: "je suis", itemId: "chunk-je-suis" },
        { text: "ici" },
      ],
      modelAnswer: "Bonjour, je suis ici.",
      reveal: {
        modelAnswer: "Bonjour, je suis ici.",
        naturalAlternatives: ["Je suis ici."],
        explanation:
          "Both are natural. Bonjour adds a greeting. Je suis ici is enough when the moment is already clear.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s08-recap-first-engine",
    type: "recap",
    payload: {
      title: "Your first French engine.",
      lines: [
        "You said where you are.",
        "You added a greeting and built a full small French interaction.",
        "Je suis stayed the same every time. That is the shape you'll use again.",
      ],
      piecesUsed: [
        "je suis",
        "ici",
        "Bonjour (from your first lesson)",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson001: Lesson = {
  id: "v1-lesson-001",
  version: "v1",
  number: 1,
  title: "Je suis",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "architecture-verb",
  estimatedMinutes: 5,
  canDo: "Say I am here, in French.",
  whyItExists:
    "L0 gave one polite chunk. L1 gives one reusable architecture shape: je suis. The shape stays the same across every future lesson. L1's only job is to make that shape feel solid in one calm location.",
  prerequisites: ["v1-lesson-000"],
  learningItems: getItems([
    "chunk-je-suis",
    "chunk-je-suis-ici",
    "chunk-bonjour",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Je suis is the L1 architecture target. No broader conjugation table appears.",
    "Only one completion, ici, is used in L1. Wider use of the shape is deferred to later lessons.",
    "The parallel avoir shape is intentionally absent from L1.",
    "L0 callback uses chunk-bonjour. chunk-je-voudrais appears only as a fill trap, not a production target.",
    "The shape-noticed insight is a deliberate meta-reflection: it names what the learner just did without adding a new concept.",
    "No XP / streak / level-up / mission / Mini Mission / generic AI Chat copy.",
    "SayIt is deterministic and model-answer-only, consistent with L0.",
  ],
  qaChecks: [
    "TTS reads Je suis ici and Bonjour, je suis ici cleanly.",
    "Casing variants pass Weave via accepted alternatives.",
    "s03 trap reasons fire on voudrais and bonjour selections.",
    "No theatrical positivity tokens appear.",
    "No mention of streak, XP, level, or mission.",
    "Recap uses passive mirror tone.",
    "The shape-noticed insight references prior weaves, not future content.",
  ],
};
