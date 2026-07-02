import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-ou",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Asking where",
      body:
        "Today: the smallest useful question, c'est où ?\n" +
        "By the end: you can ask where something is, and answer.\n" +
        "Main pieces: où, c'est, ici.",
    },
  },
  {
    id: "s01-meet-c-est-ou",
    type: "meet-card",
    targetItemIds: ["chunk-c-est-ou", "adverb-ou"],
    payload: {
      fr: "C'est où ?",
      en: "Where is it?",
      title: "Two words. One question.",
      highlights: [
        { text: "c'est", itemId: "chunk-c-est" },
        { text: "où", itemId: "adverb-ou" },
      ],
      tts: true,
    },
  },
  {
    id: "s02-insight-ou-frozen",
    type: "insight-card",
    targetItemIds: ["chunk-c-est-ou"],
    payload: {
      insightType: "grammar-nugget",
      title: "It's... where?",
      body:
        "Où = where. Spoken French loves this shape: C'est où ?: literally \"it's where?\". You already own c'est from L3. Take the question whole.",
      examples: [
        { fr: "C'est où ?", en: "Where is it?" },
        { fr: "Le café, c'est où ?", en: "The café, where is it?" },
      ],
    },
  },
  {
    id: "s03-fill-c-est-blank",
    type: "fill-with-traps",
    targetItemIds: ["adverb-ou", "chunk-c-est-ou"],
    payload: {
      prompt: "What fits the empty space?",
      sentenceBefore: "C'est ",
      sentenceAfter: " ?",
      blankCount: 1,
      options: [
        { id: "opt-ou", text: "où", isCorrect: true },
        {
          id: "opt-ici",
          text: "ici",
          isCorrect: false,
          trapReason:
            "Ici answers the question. It says here. It cannot ask where.",
        },
        {
          id: "opt-oui",
          text: "oui",
          isCorrect: false,
          trapReason: "Oui says yes. It cannot ask anything.",
        },
      ],
      answer: ["opt-ou"],
      reveal: {
        short: "où",
        explanation: "Où = where. It turns c'est into a question.",
        natural: "C'est où ?",
      },
    },
  },
  {
    id: "s04-weave-ask-where",
    type: "weave",
    targetItemIds: ["chunk-c-est-ou", "adverb-ou"],
    payload: {
      weaveType: "supported",
      prompt: "Ask where it is.",
      context:
        "You're looking for the room. Someone friendly is standing nearby.",
      suggestedPieces: [
        { text: "c'est", itemId: "chunk-c-est", required: true, label: "it is" },
        { text: "où", itemId: "adverb-ou", required: true, label: "where" },
      ],
      expectedAnswers: ["C'est où ?"],
      acceptedAlternatives: ["C'est où", "c'est où"],
      reveal: {
        modelAnswer: "C'est où ?",
        ifCorrect: "Two words you already had, one new question.",
        ifCorrectButFlat: "Right shape. The rising tone does the asking.",
        ifUnderstandableButWrong:
          "Your meaning lands. Spoken French keeps it this short: C'est où ?",
        ifMissingTargetPiece: "Où is the word that asks. Put it after c'est.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-weave-answer-here",
    type: "weave",
    targetItemIds: ["chunk-c-est"],
    payload: {
      weaveType: "supported",
      prompt: "Tell them: it's here.",
      context:
        "Now you're the local. Someone asks you C'est où ? And you're standing right at the door.",
      suggestedPieces: [
        { text: "c'est", itemId: "chunk-c-est", required: true, label: "it is" },
        { text: "ici", required: true, label: "here" },
      ],
      expectedAnswers: ["C'est ici."],
      reveal: {
        modelAnswer: "C'est ici.",
        ifCorrect: "Question and answer. Both sides are yours now.",
        ifCorrectButFlat: "The same pieces answer that asked.",
        ifMissingTargetPiece: "C'est carries the answer. Ici lands it.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-sayit-find-the-room",
    type: "say-it-your-way",
    targetItemIds: ["chunk-c-est-ou"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "A hallway with three doors, no signs. Someone comes out of one of them. Find your room.",
      communicativeGoal: "Open politely, then ask where it is.",
      suggestedPieces: [
        { text: "bonjour", itemId: "chunk-bonjour" },
        { text: "c'est", itemId: "chunk-c-est" },
        { text: "où", itemId: "adverb-ou" },
      ],
      modelAnswer: "Bonjour, c'est où ?",
      reveal: {
        modelAnswer: "Bonjour, c'est où ?",
        naturalAlternatives: ["C'est où ?"],
        explanation:
          "Both work. Bonjour opens the moment first. The L1 habit, still carrying you.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s07-recap-ou",
    type: "recap",
    payload: {
      title: "You can ask where.",
      lines: [
        "You asked where something is, with two words you mostly had already.",
        "You answered the same question from the other side.",
        "Où is small, and it unlocks every place you'll ever look for.",
      ],
      piecesUsed: ["où", "c'est", "ici", "Bonjour"],
      nextLabel: "Continue",
    },
  },
];

export const lesson008: Lesson = {
  id: "v1-lesson-008",
  version: "v1",
  number: 8,
  title: "C'est où ?",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "chunk-natural-speech",
  estimatedMinutes: 5,
  canDo: "Ask where something is, and answer it's here.",
  whyItExists:
    "L7 gave direction (je vais). L8 gives orientation: the smallest natural question, C'est où ?, built almost entirely from owned pieces (c'est from L3, ici from L2). This is a COMPACT de-scope of the full L08 où/movement spec: no où est-ce que, no movement system, no new places: one frozen question and its answer.",
  prerequisites: ["v1-lesson-007"],
  learningItems: getItems([
    "chunk-c-est-ou",
    "adverb-ou",
    "chunk-c-est",
    "chunk-bonjour",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Compact de-scope of docs/syllabus/L08-ou-location-movement-questions.lesson-spec.md against the shipped registry: the owned unit is the frozen question chunk-c-est-ou; adverb-ou is supported inside the frame (same ownership pattern as ce n'est pas).",
    "No est-ce que wrapper, no où est, no movement/destination system, no new place nouns.",
    "oui appears ONLY as a fill trap: it stays passive/recognition, never active-produced (L3 decision carried forward).",
    "Question-form Weave answers carry no-question-mark acceptedAlternatives (CI rule).",
    "Recycled load: chunk-c-est (target support), ici and chunk-bonjour as light carryover: the new question stays the headline of every screen.",
    "Registered in V1_LESSONS but NOT learner-visible (Home caps at L6).",
  ],
  qaChecks: [
    "TTS reads C'est où ? with a natural question contour and no placeholder speech.",
    "s03 trap reasons fire on ici and oui.",
    "s04 accepts C'est où without the question mark via acceptedAlternatives.",
    "Recap chips are atoms/frames only; the full question C'est où ? never appears as a chip.",
    "où keeps its accent in all learner-facing strings.",
    "No streak/XP/mission language anywhere.",
  ],
};
