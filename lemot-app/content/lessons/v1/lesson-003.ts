import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-non",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Saying no",
      body:
        "Today: how to say no, and how to make a sentence negative.\n" +
        "By the end: you can turn a sentence around with ne ... pas.\n" +
        "Main pieces: non, ne ... pas, non merci.",
    },
  },
  {
    id: "s00-meet-je-ne-suis-pas-ici",
    type: "meet-card",
    targetItemIds: ["chunk-je-ne-suis-pas", "chunk-je-suis"],
    weakPointTags: ["negation", "ne-pas"],
    payload: {
      fr: "Je ne suis pas ici.",
      en: "I am not here.",
      title: "The same shape, turned negative.",
      highlights: [
        { text: "je ne suis pas", itemId: "chunk-je-ne-suis-pas" },
      ],
      tts: true,
    },
  },
  {
    id: "s01-insight-ne-pas-sandwich",
    type: "insight-card",
    targetItemIds: ["grammar-ne-pas-sandwich", "chunk-je-ne-suis-pas"],
    weakPointTags: ["negation", "ne-pas"],
    payload: {
      insightType: "grammar-nugget",
      title: "The ne ... pas sandwich.",
      body:
        "To make a sentence negative, French wraps the action. ne goes in " +
        "front, pas goes after, and the verb sits between them. Je suis " +
        "becomes je ne suis pas. Two pieces, one on each side.",
      examples: [
        { fr: "Je suis ici.", en: "I am here." },
        { fr: "Je ne suis pas ici.", en: "I am not here." },
        { fr: "C'est ici.", en: "It is here." },
        { fr: "Ce n'est pas ici.", en: "It is not here." },
      ],
    },
  },
  {
    id: "s02-fill-verb-in-sandwich",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-ne-suis-pas"],
    weakPointTags: ["negation", "ne-pas"],
    payload: {
      prompt: "Which word sits inside the sandwich?",
      sentenceBefore: "Je ne",
      sentenceAfter: "pas ici.",
      blankCount: 1,
      options: [
        { id: "opt-suis", text: "suis", isCorrect: true },
        {
          id: "opt-voudrais",
          text: "voudrais",
          isCorrect: false,
          trapReason:
            "Je voudrais asks for something. Here you are saying where you are not, so the verb is suis.",
        },
        {
          id: "opt-bonjour",
          text: "bonjour",
          isCorrect: false,
          trapReason: "Bonjour is a greeting. It cannot sit inside the sandwich.",
        },
      ],
      answer: ["opt-suis"],
      reveal: {
        short: "suis",
        explanation: "The verb goes between the two pieces: je ne suis pas.",
        natural: "Je ne suis pas ici.",
      },
    },
  },
  {
    id: "s03-meet-ce-n-est-pas-ici",
    type: "meet-card",
    targetItemIds: ["chunk-ce-n-est-pas", "chunk-c-est"],
    weakPointTags: ["negation", "elision"],
    payload: {
      fr: "Ce n'est pas ici.",
      en: "It is not here.",
      title: "The sandwich works on c'est too.",
      highlights: [
        { text: "ce n'est pas", itemId: "chunk-ce-n-est-pas" },
      ],
      tts: true,
    },
  },
  {
    id: "s04-insight-oui-non",
    type: "insight-card",
    targetItemIds: ["chunk-oui", "chunk-non"],
    payload: {
      insightType: "micro-contrast",
      title: "Oui and non.",
      body:
        "Oui opens the door: yes. Non closes it: no. They are the fastest " +
        "answers in French. Non also begins a polite refusal: non merci.",
      examples: [
        { fr: "Oui.", en: "Yes." },
        { fr: "Non, merci.", en: "No, thank you." },
      ],
    },
  },
  {
    id: "s05-fill-refuse-politely",
    type: "fill-with-traps",
    targetItemIds: ["chunk-non-merci", "chunk-non"],
    weakPointTags: ["politeness", "negation"],
    payload: {
      prompt: "Someone offers you something you don't want. Refuse politely.",
      blankCount: 1,
      options: [
        { id: "opt-non-merci", text: "Non merci", isCorrect: true },
        {
          id: "opt-oui-merci",
          text: "Oui merci",
          isCorrect: false,
          trapReason: "Oui accepts the offer. To refuse, start with non.",
        },
        {
          id: "opt-merci",
          text: "Merci",
          isCorrect: false,
          trapReason:
            "Merci alone can sound like yes please. Non merci makes the refusal clear.",
        },
      ],
      answer: ["opt-non-merci"],
      reveal: {
        short: "Non merci",
        explanation:
          "Non merci is a soft, complete refusal. It says no without sounding sharp.",
        natural: "Non merci.",
      },
    },
  },
  {
    id: "s06-weave-je-ne-suis-pas-ici",
    type: "weave",
    targetItemIds: ["chunk-je-ne-suis-pas", "chunk-je-suis"],
    weakPointTags: ["negation", "ne-pas"],
    payload: {
      weaveType: "mid",
      prompt: "Write it in French: I am not here.",
      context: "Someone is looking for you in the wrong room. Tell them you are not there.",
      suggestedPieces: [
        { text: "je ne suis pas", itemId: "chunk-je-ne-suis-pas", required: true, label: "negative frame" },
        { text: "ici", itemId: "word-ici", required: true, label: "place word" },
      ],
      expectedAnswers: ["Je ne suis pas ici."],
      reveal: {
        modelAnswer: "Je ne suis pas ici.",
        ifCorrect: "You turned a sentence negative. The sandwich holds.",
        ifCorrectButFlat: "The pieces fit. ne and pas wrap the verb.",
        ifUnderstandableButWrong:
          "Your meaning lands. A native wraps the verb this way: ne suis pas.",
        ifMissingTargetPiece: "Keep ne and pas together around suis.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s07-weave-ce-n-est-pas-ici",
    type: "weave",
    targetItemIds: ["chunk-ce-n-est-pas", "chunk-c-est"],
    weakPointTags: ["negation", "elision"],
    payload: {
      weaveType: "mid",
      prompt: "Write it in French: It is not here.",
      context: "Someone points to the wrong place. Tell them it is not the spot.",
      suggestedPieces: [
        { text: "ce n'est pas", itemId: "chunk-ce-n-est-pas", required: true, label: "negative frame" },
        { text: "ici", itemId: "word-ici", required: true, label: "place word" },
      ],
      expectedAnswers: ["Ce n'est pas ici."],
      acceptedAlternatives: [
        "Ce n est pas ici.",
        "Ce n est pas ici",
      ],
      reveal: {
        modelAnswer: "Ce n'est pas ici.",
        ifCorrect: "Same sandwich, new sentence. ce n'est pas.",
        ifCorrectButFlat: "Right. ne becomes n' before est, and pas closes it.",
        ifMissingTargetPiece: "Use the whole piece: ce n'est pas.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s08-weave-non-je-ne-suis-pas-ici",
    type: "weave",
    targetItemIds: ["chunk-non", "chunk-je-ne-suis-pas"],
    weakPointTags: ["negation"],
    payload: {
      weaveType: "mid",
      prompt: "Write it in French: No, I am not here.",
      context: "Answer first, then say where you are not.",
      suggestedPieces: [
        { text: "Non", itemId: "chunk-non", required: true, label: "no" },
        { text: "je ne suis pas", itemId: "chunk-je-ne-suis-pas", required: true, label: "negative frame" },
        { text: "ici", itemId: "word-ici", required: true, label: "place word" },
      ],
      hintCloze: "Non, je ne suis pas ___.",
      expectedAnswers: ["Non, je ne suis pas ici."],
      reveal: {
        modelAnswer: "Non, je ne suis pas ici.",
        ifCorrect: "Answer plus sentence. That is how a real no sounds.",
        ifCorrectButFlat: "Right. Non answers; the sandwich carries the rest.",
        ifMissingTargetPiece: "Start with Non, then je ne suis pas ici.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s09-sayit-not-here",
    type: "say-it-your-way",
    targetItemIds: ["chunk-non", "chunk-je-ne-suis-pas", "chunk-non-merci"],
    weakPointTags: ["negation", "natural-speech"],
    payload: {
      situation:
        "You are at the wrong place. Someone is expecting you somewhere else. " +
        "Say that you are not here.",
      communicativeGoal: "Say no and state where you are not.",
      suggestedPieces: [
        { text: "Non", itemId: "chunk-non" },
        { text: "je ne suis pas", itemId: "chunk-je-ne-suis-pas" },
        { text: "ici", itemId: "word-ici" },
      ],
      modelAnswer: "Non, je ne suis pas ici.",
      reveal: {
        modelAnswer: "Non, je ne suis pas ici.",
        naturalAlternatives: ["Je ne suis pas ici."],
        explanation:
          "Both work. Non answers the call first; je ne suis pas ici states it plainly.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s10-recap-negation",
    type: "recap",
    payload: {
      title: "You can say no now.",
      lines: [
        "You wrapped a sentence with ne and pas.",
        "You turned je suis into je ne suis pas, and c'est into ce n'est pas.",
        "You refused politely with non merci.",
      ],
      piecesUsed: [
        "non",
        "je ne suis pas",
        "ce n'est pas",
        "non merci",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson003: Lesson = {
  id: "v1-lesson-003",
  version: "v1",
  number: 3,
  title: "Non",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "pronoun-particle",
  estimatedMinutes: 6,
  canDo: "Say no, and say what is not true, using ne ... pas.",
  whyItExists:
    "L1 and L2 gave the learner sentences they could say. L3 gives the opposite move: how to say no and how to make a sentence negative. ne and pas wrap the verb, the first reusable transform in the slice. L3 stays bounded to the ne ... pas sandwich plus oui, non, and a polite refusal; wider negation and question forms are deferred.",
  prerequisites: ["v1-lesson-002"],
  learningItems: getItems([
    "chunk-non",
    "chunk-oui",
    "chunk-je-ne-suis-pas",
    "chunk-ce-n-est-pas",
    "chunk-non-merci",
    "grammar-ne-pas-sandwich",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "First Training Pack lesson under the Training Content Factory contract. L3 maps to the slice-spec PR G. Owned core: the ne ... pas sandwich as a two-part negative frame.",
    "Metaphor: metaphor-negation-sandwich. ne and pas sit around the action, one on each side. Early naming only; do not imply it is the only negation form.",
    "Negation is taught as a transform of owned sentences: je suis ici becomes je ne suis pas ici; c'est becomes ce n'est pas.",
    "oui and non enter as the fastest answers; non also opens the polite refusal non merci. oui and non are answers only, not a question system.",
    "Compact, negation-centered slice. tu/vous register work, yes-no question asking, and ça / pronoun-ca remain deferred from L3 to hold cognitive load.",
    "No runtime Review, Checkpoint, or Mon Lexique surfaces are added; the Training Pack review and checkpoint material exists as PR notes only.",
    "Tone stays polite and neutral throughout. SayIt is deterministic and model-answer-only, consistent with L0-L2.",
    "No XP / streak / level-up / mission copy.",
  ],
  qaChecks: [
    "TTS reads Je ne suis pas ici, Ce n'est pas ici, and Non merci cleanly.",
    "Apostrophe normalization handles curly quotes in ce n'est pas; the unaccented ce n est variant passes Weave.",
    "Casing variants pass Weave via accepted alternatives.",
    "s02 trap reasons fire on voudrais and bonjour selections.",
    "No repeated negation tokens (ne ne / pas pas) in any French string.",
    "No theatrical positivity tokens appear.",
  ],
};
