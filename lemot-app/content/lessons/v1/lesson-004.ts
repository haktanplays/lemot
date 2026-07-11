import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-jai",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Your second engine",
      body:
        "Today: your second engine, j'ai.\n" +
        "By the end: you can choose between where you are, how you feel, and what you have to ask.\n" +
        "Main pieces: je suis, ici, j'ai, faim, une question.",
    },
  },
  {
    id: "s00-meet-j-ai-faim",
    type: "meet-card",
    targetItemIds: ["chunk-j-ai-faim", "chunk-j-ai"],
    weakPointTags: ["avoir-vs-etre", "j-ai-vs-je-suis"],
    payload: {
      fr: "J'ai faim.",
      en: "I am hungry.",
      title: "A different way to feel.",
      highlights: [
        { text: "J'ai", itemId: "chunk-j-ai" },
        { text: "faim", itemId: "noun-faim" },
      ],
      tts: true,
    },
  },
  {
    id: "s01-insight-have-for-feelings",
    type: "insight-card",
    targetItemIds: ["micro-je-suis-vs-j-ai", "chunk-j-ai", "chunk-je-suis"],
    weakPointTags: ["avoir-vs-etre", "j-ai-vs-je-suis"],
    payload: {
      insightType: "micro-contrast",
      title: "French has hunger.",
      body:
        "In English you are hungry. In French you have hunger: j'ai faim. " +
        "French puts some feelings on have, not on be. Je suis names who or " +
        "where you are; j'ai names what you feel or have: a feeling like " +
        "j'ai faim, or a thing like j'ai une question.",
      examples: [
        { fr: "Je suis ici.", en: "I am here." },
        { fr: "J'ai faim.", en: "I am hungry." },
        { fr: "J'ai soif.", en: "I am thirsty." },
        { fr: "J'ai une question.", en: "I have a question." },
        { fr: "J'ai une idée.", en: "I have an idea." },
        { fr: "J'ai froid. J'ai chaud.", en: "I am cold. I am hot. (more of the same family)" },
      ],
    },
  },
  {
    id: "s02-fill-have-not-be",
    type: "fill-with-traps",
    targetItemIds: ["chunk-j-ai", "chunk-j-ai-faim"],
    weakPointTags: ["avoir-vs-etre", "j-ai-vs-je-suis"],
    payload: {
      prompt: "Which one fits a feeling you have?",
      sentenceAfter: "faim.",
      blankCount: 1,
      options: [
        { id: "opt-j-ai", text: "J'ai", isCorrect: true },
        {
          id: "opt-je-suis",
          text: "Je suis",
          isCorrect: false,
          trapReason:
            "Je suis names who or where you are. For hunger, French uses have: j'ai faim.",
        },
        {
          id: "opt-je-voudrais",
          text: "Je voudrais",
          isCorrect: false,
          trapReason:
            "Je voudrais asks for something. Hunger is a state you have, not a request.",
        },
      ],
      answer: ["opt-j-ai"],
      reveal: {
        short: "J'ai",
        explanation: "French has hunger: j'ai faim.",
        natural: "J'ai faim.",
      },
    },
  },
  {
    id: "s03-meet-j-ai-une-question",
    type: "meet-card",
    targetItemIds: ["chunk-j-ai-une-question", "chunk-j-ai"],
    weakPointTags: ["j-ai-vs-je-suis"],
    payload: {
      fr: "J'ai une question.",
      en: "I have a question.",
      title: "Have works for things too.",
      highlights: [
        { text: "J'ai", itemId: "chunk-j-ai" },
        { text: "une question", itemId: "noun-question" },
      ],
      tts: true,
    },
  },
  {
    id: "s03b-fill-where-feel-have",
    type: "fill-with-traps",
    targetItemIds: [
      "chunk-j-ai-une-question",
      "chunk-je-suis-ici",
      "chunk-j-ai-faim",
    ],
    weakPointTags: ["avoir-vs-etre", "j-ai-vs-je-suis"],
    payload: {
      prompt: "You came with one small thing to ask. What do you say?",
      blankCount: 1,
      options: [
        { id: "opt-question", text: "J'ai une question.", isCorrect: true },
        {
          id: "opt-ici",
          text: "Je suis ici.",
          isCorrect: false,
          trapReason: "That says where you are, not what you have to ask.",
        },
        {
          id: "opt-faim",
          text: "J'ai faim.",
          isCorrect: false,
          trapReason: "That says how you feel, not that you have a question.",
        },
      ],
      answer: ["opt-question"],
      reveal: {
        short: "J'ai une question.",
        explanation:
          "French uses j'ai for this: I have a question. Je suis ici says where you are. J'ai faim says how you feel.",
        natural: "J'ai une question.",
      },
    },
  },
  {
    id: "s04-insight-jai-elision",
    type: "insight-card",
    targetItemIds: ["sound-elision", "chunk-j-ai"],
    weakPointTags: ["elision"],
    payload: {
      insightType: "sound-writing",
      title: "je + ai becomes j'ai.",
      body:
        "Before a vowel, je drops its e and joins the next word: je + ai " +
        "becomes j'ai. You hear and write one smooth piece, j'ai.",
      examples: [
        { fr: "je + ai", en: "I + have" },
        { fr: "j'ai", en: "I have" },
      ],
    },
  },
  {
    id: "s05-weave-j-ai-faim",
    type: "weave",
    targetItemIds: ["chunk-j-ai-faim", "chunk-j-ai"],
    weakPointTags: ["avoir-vs-etre", "j-ai-vs-je-suis"],
    payload: {
      weaveType: "mid",
      prompt: "Write it in French: I am hungry.",
      context: "It is past noon and you have not eaten. Say how you feel, the French way.",
      suggestedPieces: [
        { text: "j'ai", itemId: "chunk-j-ai", required: true, label: "I have" },
        { text: "faim", itemId: "noun-faim", required: true, label: "feeling word" },
      ],
      expectedAnswers: ["J'ai faim."],
      acceptedAlternatives: [
        "J ai faim.",
        "J ai faim",
        "j ai faim",
      ],
      reveal: {
        modelAnswer: "J'ai faim.",
        ifCorrect: "You used have for a feeling, the French way.",
        ifCorrectButFlat: "Right. faim is hunger; j'ai faim is I am hungry.",
        ifUnderstandableButWrong:
          "Your meaning lands. French puts the feeling on have: j'ai faim.",
        ifMissingTargetPiece: "Start with j'ai, then faim.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-weave-bonjour-j-ai-une-question",
    type: "weave",
    targetItemIds: ["chunk-bonjour", "chunk-j-ai-une-question", "chunk-j-ai"],
    weakPointTags: ["j-ai-vs-je-suis"],
    payload: {
      weaveType: "context",
      prompt: "Write it in French: Hello, I have a question.",
      context: "You step up to ask someone something. Greet first, then say you have a question.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour", required: true, label: "greeting" },
        { text: "j'ai", itemId: "chunk-j-ai", required: true, label: "I have" },
        { text: "une question", itemId: "noun-question", required: true, label: "noun package" },
      ],
      hintCloze: "Bonjour, j'ai une ___.",
      expectedAnswers: ["Bonjour, j'ai une question."],
      acceptedAlternatives: [
        "Bonjour, j ai une question.",
        "Bonjour j ai une question",
      ],
      reveal: {
        modelAnswer: "Bonjour, j'ai une question.",
        ifCorrect: "Greeting plus a clear request to ask. That is a real opening.",
        ifCorrectButFlat: "Right pieces. The comma marks a small natural pause.",
        ifMissingTargetPiece: "Greet with bonjour, then j'ai une question.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06b-weave-j-ai-une-idee",
    type: "weave",
    targetItemIds: ["chunk-j-ai", "noun-idee"],
    weakPointTags: ["j-ai-vs-je-suis"],
    payload: {
      weaveType: "mid",
      prompt: "Write it in French: I have an idea.",
      context:
        "Halfway through the conversation, something clicks. Share that you have an idea.",
      suggestedPieces: [
        { text: "j'ai", itemId: "chunk-j-ai", required: true, label: "I have" },
        { text: "une idée", itemId: "noun-idee", required: true, label: "noun package" },
      ],
      expectedAnswers: ["J'ai une idée."],
      acceptedAlternatives: [
        "J ai une idée.",
        "J ai une idee.",
        "J'ai une idee.",
      ],
      reveal: {
        modelAnswer: "J'ai une idée.",
        ifCorrect: "The same engine again: a feeling, a question, and now an idea.",
        ifCorrectButFlat: "Right. une idée travels as one package, like une question.",
        ifMissingTargetPiece: "Start with j'ai, then the package: une idée.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s07-sayit-how-you-feel",
    type: "say-it-your-way",
    targetItemIds: ["chunk-j-ai", "chunk-j-ai-faim"],
    weakPointTags: ["avoir-vs-etre", "natural-speech"],
    payload: {
      situation:
        "You have not eaten or drunk anything all morning and you want to let someone know how you feel. " +
        "Say it the French way.",
      communicativeGoal: "Say what you feel, using have.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour" },
        { text: "j'ai", itemId: "chunk-j-ai" },
        { text: "faim", itemId: "noun-faim" },
        { text: "soif", itemId: "noun-soif" },
      ],
      modelAnswer: "J'ai faim.",
      reveal: {
        modelAnswer: "J'ai faim.",
        naturalAlternatives: ["J'ai soif.", "Bonjour, j'ai faim."],
        explanation:
          "French puts hunger and thirst on have: j'ai faim, j'ai soif. Add bonjour if you are greeting someone first.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s08-recap-jai",
    type: "recap",
    payload: {
      title: "You have feelings in French now.",
      lines: [
        "French often uses have where English uses be.",
        "You said j'ai faim for I am hungry; soif works the same way.",
        "You used j'ai for things too: j'ai une question, j'ai une idée.",
      ],
      piecesUsed: [
        "j'ai",
        "faim",
        "soif",
        "une question",
        "une idée",
        "Bonjour",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson004: Lesson = {
  id: "v1-lesson-004",
  version: "v1",
  number: 4,
  title: "J'ai",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "architecture-verb",
  estimatedMinutes: 6,
  canDo: "Say how I feel and what I have, using j'ai.",
  whyItExists:
    "L2 gave je suis, the first engine. L4 gives the second: j'ai. French often puts feelings and simple possession on have, not on be, so I am hungry becomes j'ai faim. L4 stays bounded to j'ai chunks and the je suis vs j'ai contrast; the full avoir paradigm, age, numbers, and the need system are deferred.",
  prerequisites: ["v1-lesson-003"],
  learningItems: getItems([
    "chunk-j-ai",
    "chunk-j-ai-faim",
    "noun-faim",
    "noun-soif",
    "chunk-j-ai-une-question",
    "noun-idee",
    "micro-je-suis-vs-j-ai",
    "sound-elision",
    "noun-question",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Second Training Pack lesson under the Training Content Factory contract. L4 maps to the slice-spec PR H. Owned core: j'ai as the second sentence engine.",
    "Contrast metaphor: micro-je-suis-vs-j-ai. French uses have where English uses be for some feelings (j'ai faim = I am hungry). Taught as a French-thinks-differently moment, not a paradigm table.",
    "Elision is taught lightly: je + ai becomes j'ai. Not a broad elision lecture.",
    "Kademe 2 enrichment: soif joins as faim's supported twin (insight example + sayit piece/alternative); une idée joins as a second supported thing-package, reusing the previously dormant noun-idee. j'ai froid / j'ai chaud stay ghost-only in the insight example copy, never produced.",
    "il y a remains a separate deferred doorway and appears nowhere in L4 (Payload Economy / L14 canon).",
    "chunk-j-ai is promoted from supported to active in this lesson.",
    "L4 follows the enumerated 9-screen shape from the L3-L6 content plan (meet x2, insight x2, fill x1, weave x2, say-it x1, recap). The plan header's '10 screens' is treated as an off-by-one note, not a reason to add a filler screen.",
    "je n'ai pas (negated avoir) is deferred so L4 does not compete with its core j'ai engine by re-opening negation-of-avoir.",
    "j'ai besoin de (need) is deferred because it pulls in object vocabulary and a wider need frame; it should return later as a controlled need structure.",
    "L4 is not a full avoir paradigm lesson. Do not teach or imply active ownership of tu as, il a / elle a, nous avons, vous avez, ils ont, age, numbers, broad possession, or broad need.",
    "Tone stays polite and neutral throughout. SayIt is deterministic and model-answer-only, consistent with L0-L3.",
    "No XP / streak / level-up / mission copy.",
  ],
  qaChecks: [
    "TTS reads J'ai faim, J'ai une question, and Bonjour, j'ai une question cleanly.",
    "Apostrophe normalization handles curly quotes in j'ai; the unaccented j ai variant passes Weave.",
    "Casing variants pass Weave via accepted alternatives.",
    "s02 trap reasons fire on Je suis and Je voudrais selections.",
    "The je suis vs j'ai contrast reads as natural difference, not a grammar table.",
    "No theatrical positivity tokens appear.",
  ],
};
