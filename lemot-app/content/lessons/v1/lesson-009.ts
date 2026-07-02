import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-je-fais",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "What you're doing",
      body:
        "Today: your third engine, je fais.\n" +
        "By the end: you can say what you're doing, right now.\n" +
        "Main pieces: je fais, un café, maintenant.",
    },
  },
  {
    id: "s01-meet-je-fais-un-cafe",
    type: "meet-card",
    targetItemIds: ["chunk-je-fais", "chunk-un-cafe"],
    payload: {
      fr: "Je fais un café.",
      en: "I'm making a coffee.",
      title: "The doing engine.",
      highlights: [
        { text: "je fais", itemId: "chunk-je-fais" },
        { text: "un café", itemId: "chunk-un-cafe" },
      ],
      tts: true,
    },
  },
  {
    id: "s02-insight-three-engines",
    type: "insight-card",
    targetItemIds: ["chunk-je-fais"],
    payload: {
      insightType: "grammar-nugget",
      title: "Three engines now.",
      body:
        "Je suis says where you are. Je vais says where you're heading. Je fais says what you're doing. Same small shape, taken whole. No verb table, no rules yet.",
      examples: [
        { fr: "Je fais un café.", en: "I'm making a coffee." },
        { fr: "Je fais un café maintenant.", en: "I'm making a coffee now." },
      ],
    },
  },
  {
    id: "s03-fill-je-fais-blank",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-fais"],
    payload: {
      prompt: "What fits the empty space?",
      sentenceBefore: "Je ",
      sentenceAfter: " un café.",
      blankCount: 1,
      options: [
        { id: "opt-fais", text: "fais", isCorrect: true },
        {
          id: "opt-vais",
          text: "vais",
          isCorrect: false,
          trapReason:
            "Je vais goes somewhere. It doesn't make anything.",
        },
        {
          id: "opt-voudrais",
          text: "voudrais",
          isCorrect: false,
          trapReason:
            "Je voudrais asks for a coffee. Je fais makes one.",
        },
      ],
      answer: ["opt-fais"],
      reveal: {
        short: "fais",
        explanation: "Je fais = I'm making, I'm doing. The hands-on engine.",
        natural: "Je fais un café.",
      },
    },
  },
  {
    id: "s04-weave-making-coffee",
    type: "weave",
    targetItemIds: ["chunk-je-fais", "chunk-un-cafe"],
    payload: {
      weaveType: "supported",
      prompt: "Say you're making a coffee.",
      context: "Someone wanders into the kitchen and looks at you.",
      suggestedPieces: [
        { text: "je fais", itemId: "chunk-je-fais", required: true, label: "I'm making" },
        { text: "un café", itemId: "chunk-un-cafe", required: true, label: "a coffee" },
      ],
      expectedAnswers: ["Je fais un café."],
      reveal: {
        modelAnswer: "Je fais un café.",
        ifCorrect: "The doing engine, running on a package you've owned since L1.",
        ifCorrectButFlat: "The pieces fit. Small sentence, real moment.",
        ifUnderstandableButWrong:
          "Your meaning lands. A native joins the pieces this way.",
        ifMissingTargetPiece: "Lead with je fais. That is the doing shape.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-weave-right-now",
    type: "weave",
    targetItemIds: ["chunk-je-fais", "adverb-maintenant"],
    payload: {
      weaveType: "supported",
      prompt: "Say you're making a coffee now.",
      context:
        "A friend calls from the other room, asking if you're coming. You need one more minute.",
      suggestedPieces: [
        { text: "je fais", itemId: "chunk-je-fais", required: true, label: "I'm making" },
        { text: "un café", itemId: "chunk-un-cafe", required: true, label: "a coffee" },
        { text: "maintenant", itemId: "adverb-maintenant", label: "now" },
      ],
      expectedAnswers: ["Je fais un café maintenant."],
      reveal: {
        modelAnswer: "Je fais un café maintenant.",
        ifCorrect: "Maintenant lands at the end. That's its favorite seat.",
        ifCorrectButFlat: "Right order: engine, thing, time.",
        ifMissingTargetPiece:
          "Keep the sentence you had and let maintenant close it.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-sayit-busy-hands",
    type: "say-it-your-way",
    targetItemIds: ["chunk-je-fais"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "You're mid-pour in the kitchen. Someone pokes their head in, wondering what's keeping you.",
      communicativeGoal: "Say what you're doing, right now.",
      suggestedPieces: [
        { text: "je fais", itemId: "chunk-je-fais" },
        { text: "un café", itemId: "chunk-un-cafe" },
        { text: "maintenant", itemId: "adverb-maintenant" },
      ],
      modelAnswer: "Je fais un café maintenant.",
      reveal: {
        modelAnswer: "Je fais un café maintenant.",
        naturalAlternatives: ["Je fais un café."],
        explanation:
          "Both are natural. Maintenant adds the 'right now', useful when someone is waiting on you.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s07-recap-je-fais",
    type: "recap",
    payload: {
      title: "Three engines, one kitchen.",
      lines: [
        "You said what you're doing, and when.",
        "Un café came back from L1. This time you're the one making it.",
        "Je suis, je vais, je fais: three small shapes that now carry you.",
      ],
      piecesUsed: ["je fais", "un café", "maintenant"],
      nextLabel: "Continue",
    },
  },
];

export const lesson009: Lesson = {
  id: "v1-lesson-009",
  version: "v1",
  number: 9,
  title: "Je fais",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "architecture-verb",
  estimatedMinutes: 5,
  canDo: "Say what you're doing right now, in French.",
  whyItExists:
    "L2 and L7 gave being and going. L9 completes the first engine trio with doing: je fais, taken whole, landed on a package the learner has owned since L1 (un café). This is a COMPACT de-scope of the full L09 faire spec: no faire paradigm, no ça, no weather faire, no question forms: one frozen chunk, one time word.",
  prerequisites: ["v1-lesson-008"],
  learningItems: getItems([
    "chunk-je-fais",
    "adverb-maintenant",
    "chunk-un-cafe",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Compact de-scope of docs/syllabus/L09-faire-small-actions-pause.lesson-spec.md against the shipped registry: chunk-je-fais active + adverb-maintenant supported; no faire table, no ça, no qu'est-ce que.",
    "The s03 fill deliberately contrasts the three engines: fais vs vais vs voudrais: recognition of the trio without a grammar table.",
    "Recycled load: chunk-un-cafe only (context-fit L1 package; the new engine stays the headline).",
    "adverb-maintenant is supported, not active: it rides along, it is never required alone.",
    "No XP / streak / level-up / mission copy. SayIt is deterministic model-answer-only.",
    "Registered in V1_LESSONS but NOT learner-visible (Home caps at L6).",
  ],
  qaChecks: [
    "TTS reads Je fais un café maintenant cleanly.",
    "s03 trap reasons fire on vais and voudrais.",
    "Recap chips are atoms/packages only.",
    "No streak/XP/mission language anywhere.",
  ],
};
