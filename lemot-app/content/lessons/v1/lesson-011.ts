import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-je-peux",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Asking if you can",
      body:
        "Today: one new engine, je peux.\n" +
        "By the end: you can ask if you can do something, and say when you can't.\n" +
        "Main pieces: je peux, je ne peux pas.",
    },
  },
  {
    id: "s01-meet-je-peux",
    type: "meet-card",
    targetItemIds: ["chunk-je-peux", "chunk-faire-une-pause"],
    payload: {
      fr: "Je peux faire une pause ?",
      en: "Can I take a break?",
      title: "Permission, in two words.",
      highlights: [
        { text: "je peux", itemId: "chunk-je-peux" },
        { text: "faire une pause", itemId: "chunk-faire-une-pause" },
      ],
      tts: true,
    },
  },
  {
    id: "s02-insight-rising-voice",
    type: "insight-card",
    targetItemIds: ["chunk-je-peux"],
    payload: {
      insightType: "grammar-nugget",
      title: "The voice does the asking.",
      body:
        "Je peux = I can. Keep the words in statement order and let your voice rise at the end: that IS the question in spoken French. Like je voudrais, je peux carries actions whole: je peux faire une pause. French has other ways to ask. They can wait one lesson.",
      examples: [
        { fr: "Je peux.", en: "I can." },
        { fr: "Je peux faire une pause ?", en: "Can I take a break?" },
      ],
    },
  },
  {
    id: "s03-fill-peux-blank",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-peux"],
    payload: {
      prompt: "You're asking for permission. What fits the empty space?",
      sentenceBefore: "Je ",
      sentenceAfter: " faire une pause ?",
      blankCount: 1,
      options: [
        { id: "opt-peux", text: "peux", isCorrect: true },
        {
          id: "opt-voudrais",
          text: "voudrais",
          isCorrect: false,
          trapReason:
            "Je voudrais states a wish. To ask if you're allowed, you need je peux.",
        },
        {
          id: "opt-vais",
          text: "vais",
          isCorrect: false,
          trapReason:
            "Je vais says you're going. It cannot ask permission.",
        },
      ],
      answer: ["opt-peux"],
      reveal: {
        short: "peux",
        explanation:
          "Je peux = I can. With a rising voice, it asks: may I?",
        natural: "Je peux faire une pause ?",
      },
    },
  },
  {
    id: "s04-weave-ask-permission",
    type: "weave",
    targetItemIds: ["chunk-je-peux", "chunk-faire-une-pause"],
    payload: {
      weaveType: "supported",
      prompt: "Ask if you can take a break.",
      context:
        "The session is intense and nobody has stopped for a while. Ask, with a rising voice.",
      suggestedPieces: [
        { text: "je peux", itemId: "chunk-je-peux", required: true, label: "I can" },
        {
          text: "faire une pause",
          itemId: "chunk-faire-une-pause",
          required: true,
          label: "to take a break",
        },
      ],
      expectedAnswers: ["Je peux faire une pause ?"],
      acceptedAlternatives: ["Je peux faire une pause"],
      reveal: {
        modelAnswer: "Je peux faire une pause ?",
        ifCorrect: "Statement words, rising voice. That's the whole trick.",
        ifCorrectButFlat: "Right shape. The rising tone turns it into a question.",
        ifUnderstandableButWrong:
          "Your meaning lands. Spoken French keeps it this simple: Je peux faire une pause ?",
        ifMissingTargetPiece:
          "Start with je peux. It is the engine that asks permission.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-weave-cant-heading-home",
    type: "weave",
    targetItemIds: ["chunk-je-ne-peux-pas"],
    payload: {
      weaveType: "supported",
      prompt: "Say you can't, and that you're going home.",
      context:
        "They ask if you can stay a little longer. You honestly can't.",
      suggestedPieces: [
        {
          text: "je ne peux pas",
          itemId: "chunk-je-ne-peux-pas",
          required: true,
          label: "I can't",
        },
        { text: "je vais", itemId: "chunk-je-vais", required: true, label: "I'm going" },
        {
          text: "à la maison",
          itemId: "chunk-a-la-maison",
          required: true,
          label: "home",
        },
      ],
      expectedAnswers: ["Je ne peux pas. Je vais à la maison."],
      acceptedAlternatives: ["Je ne peux pas, je vais à la maison."],
      reveal: {
        modelAnswer: "Je ne peux pas. Je vais à la maison.",
        ifCorrect: "A calm no, and the reason. The ne...pas frame you know, on a new engine.",
        ifCorrectButFlat: "Two short sentences. Honest and complete.",
        ifMissingTargetPiece:
          "Lead with je ne peux pas. Then je vais à la maison explains why.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-weave-ask-for-help",
    type: "weave",
    targetItemIds: ["chunk-vous-pouvez-m-aider"],
    payload: {
      weaveType: "supported",
      prompt: "Ask them: can you help me?",
      context:
        "You heard this one yesterday. Now you need it: the form in front of you makes no sense.",
      suggestedPieces: [
        {
          text: "vous pouvez m'aider",
          itemId: "chunk-vous-pouvez-m-aider",
          required: true,
          label: "can you help me",
        },
        {
          text: "s'il vous plaît",
          itemId: "chunk-sil-vous-plait",
          label: "please",
        },
      ],
      expectedAnswers: ["Vous pouvez m'aider ?"],
      acceptedAlternatives: [
        "Vous pouvez m'aider",
        "Vous pouvez m'aider, s'il vous plaît ?",
      ],
      reveal: {
        modelAnswer: "Vous pouvez m'aider ?",
        ifCorrect: "One frozen chunk, taken whole. Same rising voice as je peux.",
        ifCorrectButFlat: "Right shape. The rising tone carries the request.",
        ifMissingTargetPiece:
          "Take vous pouvez m'aider as one piece. The voice does the asking.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s07-sayit-need-a-break",
    type: "say-it-your-way",
    targetItemIds: ["chunk-je-peux"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "A long working session. The person leading it pauses to check in with everyone.",
      communicativeGoal: "Ask if you can take a break, politely.",
      suggestedPieces: [
        { text: "je peux", itemId: "chunk-je-peux" },
        { text: "faire une pause", itemId: "chunk-faire-une-pause" },
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait" },
      ],
      modelAnswer: "Je peux faire une pause, s'il vous plaît ?",
      reveal: {
        modelAnswer: "Je peux faire une pause, s'il vous plaît ?",
        naturalAlternatives: ["Je peux faire une pause ?"],
        explanation:
          "Both are natural. S'il vous plaît softens the ask; the shorter form works when the moment is already gentle.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s08-recap-je-peux",
    type: "recap",
    payload: {
      title: "You can ask if you can.",
      lines: [
        "You asked permission with statement words and a rising voice.",
        "You said no calmly: je ne peux pas, the ne...pas frame on a new engine.",
        "You asked for help with one frozen chunk, taken whole.",
      ],
      piecesUsed: ["je peux", "je ne peux pas", "faire une pause", "s'il vous plaît"],
      nextLabel: "Continue",
    },
  },
];

export const lesson011: Lesson = {
  id: "v1-lesson-011",
  version: "v1",
  number: 11,
  title: "Je peux",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "architecture-verb",
  estimatedMinutes: 5,
  canDo: "Ask if you can do something, say you can't, and ask for help.",
  whyItExists:
    "Per the L11 pouvoir-light spec, this is a narrow permission/help doorway, not the pouvoir lesson: je peux active as a frozen engine (asking by rising intonation only), je ne peux pas reusing the owned ne...pas frame, and vous pouvez m'aider ? produced as one supported frozen chunk (planted in L10 as recognition). No pouvoir paradigm, no tu peux / on peut production, no infinitive rule talk. The est-ce que way of asking is deliberately deferred to L12, which will graduate this lesson's question.",
  prerequisites: ["v1-lesson-010"],
  learningItems: getItems([
    "chunk-je-peux",
    "chunk-je-ne-peux-pas",
    "chunk-vous-pouvez-m-aider",
    "chunk-faire-une-pause",
    "chunk-sil-vous-plait",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Aligned with docs/syllabus/L11-pouvoir-help-permission.lesson-spec.md: chunk-je-peux active, chunk-je-ne-peux-pas supported-active via the owned negation frame, vous pouvez only inside the frozen help chunk.",
    "Asking is by rising intonation ONLY in this lesson; est-ce que je peux stays recognition-level and is graduated in L12 (spec's L12 bridge).",
    "De-scope vs spec: the spec's faire ca example is replaced with the owned action package faire une pause (ca is not in the shipped registry, deferred with the L9 pause slice).",
    "aider and m' live only inside chunk-vous-pouvez-m-aider; no productive aider, no me/m' object-pronoun teaching.",
    "s05 recombines the new negative with L7 (je vais a la maison): integration habit from L10 carried forward.",
    "je ne peux pas is added to the structural validator's PROTECTED_CHUNKS as approved canon (negation frame chip, same class as je ne suis pas).",
    "No XP / streak / level-up / mission copy. SayIt is deterministic model-answer-only.",
    "Registered in V1_LESSONS but NOT learner-visible (Home caps at L6).",
  ],
  qaChecks: [
    "TTS reads Je peux faire une pause ? with a rising question contour.",
    "s03 trap reasons fire on voudrais and vais.",
    "s04 and s06 accept no-question-mark variants via acceptedAlternatives.",
    "Recap chips are atoms/frames only; je ne peux pas passes as a protected negation frame.",
    "No est-ce que appears anywhere in L11 learner-facing copy.",
    "No streak/XP/mission language anywhere.",
  ],
};
