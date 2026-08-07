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
    targetItemIds: ["chunk-c-est-ou", "adverb-ou-where"],
    payload: {
      fr: "C'est où ?",
      en: "Where is it?",
      title: "Two words. One question.",
      highlights: [
        { text: "c'est", itemId: "chunk-c-est" },
        { text: "où", itemId: "adverb-ou-where" },
      ],
      tts: true,
    },
  },
  {
    id: "s03-fill-c-est-blank",
    type: "fill-with-traps",
    targetItemIds: ["adverb-ou-where", "chunk-c-est-ou"],
    payload: {
      prompt: "You need a room and cannot see it. Which word asks?",
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
    targetItemIds: ["chunk-c-est-ou", "adverb-ou-where"],
    payload: {
      // The scene carries the task. Pieces stay behind the hint button and the
      // cloze holds only the shape, so the question itself is the learner's.
      weaveType: "context",
      prompt: "Ask where it is.",
      context:
        "You're looking for the room. Someone friendly is standing nearby.",
      suggestedPieces: [
        { text: "c'est", itemId: "chunk-c-est", label: "it is" },
        { text: "où", itemId: "adverb-ou-where", label: "where" },
      ],
      hintCloze: "C'est ___ ?",
      expectedAnswers: ["C'est où ?"],
      acceptedAlternatives: ["C'est où", "c'est où"],
      reveal: {
        modelAnswer: "C'est où ?",
        ifCorrect: "Two words you already had, one new question.",
        ifCorrectButFlat: "Right. The rising tone does the asking.",
        ifUnderstandableButWrong:
          "Your meaning lands. Spoken French keeps it this short: C'est où ?",
        ifMissingTargetPiece: "Où is the word that asks. Put it after c'est.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    // Reflection, placed after the learner has actually asked once.
    id: "s02-insight-ou-frozen",
    type: "insight-card",
    targetItemIds: ["chunk-c-est-ou"],
    payload: {
      insightType: "grammar-nugget",
      title: "It's... where?",
      body:
        "Où = where. Spoken French loves this shape: C'est où ? Literally, \"it's where?\". You already own c'est. Take the question whole.",
      examples: [
        { fr: "C'est où ?", en: "Where is it?" },
        { fr: "Le café, c'est où ?", en: "The café, where is it?" },
      ],
    },
  },
  {
    // First contact with the ANSWER side. The learner owns c'est and ici
    // separately, but has never met them joined as the reply to the question
    // just asked, so the next weave is no longer a cold ask.
    id: "s08-meet-c-est-ici",
    type: "meet-card",
    targetItemIds: ["chunk-c-est"],
    payload: {
      fr: "C'est ici.",
      en: "It's here.",
      title: "The other side of the question.",
      highlights: [
        { text: "c'est", itemId: "chunk-c-est" },
        { text: "ici", itemId: "word-ici" },
      ],
      tts: true,
    },
  },
  {
    // One small contrast before the answer weave: which word replies, and
    // which word asks.
    id: "s09-fill-which-side",
    type: "fill-with-traps",
    targetItemIds: ["chunk-c-est"],
    payload: {
      prompt: "Someone asks you where it is. You are standing at the door. Which word answers?",
      sentenceBefore: "C'est ",
      sentenceAfter: ".",
      blankCount: 1,
      options: [
        { id: "opt-ici-answer", text: "ici", isCorrect: true },
        {
          id: "opt-ou-answer",
          text: "où",
          isCorrect: false,
          trapReason:
            "Où asks the question. Using it here would hand the question back instead of answering it.",
        },
        {
          id: "opt-oui-answer",
          text: "oui",
          isCorrect: false,
          trapReason: "Oui says yes. Nobody asked a yes or no question.",
        },
      ],
      answer: ["opt-ici-answer"],
      reveal: {
        short: "ici",
        explanation: "Ici = here. It lands the answer where you are standing.",
        natural: "C'est ici.",
      },
    },
  },
  {
    id: "s05-weave-answer-here",
    type: "weave",
    targetItemIds: ["chunk-c-est"],
    payload: {
      weaveType: "context",
      prompt: "Tell them: it's here.",
      context:
        "Now you're the local. Someone asks you C'est où ? And you're standing right at the door.",
      suggestedPieces: [
        { text: "c'est", itemId: "chunk-c-est", label: "it is" },
        { text: "ici", itemId: "word-ici", label: "here" },
      ],
      hintCloze: "C'est ___.",
      expectedAnswers: ["C'est ici."],
      reveal: {
        modelAnswer: "C'est ici.",
        ifCorrect: "Question and answer. Both sides are yours now.",
        ifCorrectButFlat: "Right. The same pieces that asked now answer.",
        ifUnderstandableButWrong:
          "Your meaning lands. Spoken French answers just as short: C'est ici.",
        ifMissingTargetPiece: "C'est carries the answer. Ici lands it.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    // Reveal after both sides have been produced: the pair, heard together.
    id: "s10-reveal-both-sides",
    type: "natural-reveal",
    payload: {
      modelAnswer: "C'est où ? C'est ici.",
      naturalAlternatives: ["Le café, c'est où ?"],
      explanation:
        "The same two words do both jobs. Où turns it into a question; ici answers it. Put a name in front and you can ask about anything you can point at.",
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
        { text: "où", itemId: "adverb-ou-where" },
      ],
      modelAnswer: "Bonjour, c'est où ?",
      reveal: {
        modelAnswer: "Bonjour, c'est où ?",
        naturalAlternatives: ["C'est où ?"],
        explanation:
          "Both work. Bonjour opens the moment first. The greeting habit, still carrying you.",
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
        "Où is small, and it opens every place you'll ever look for.",
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
  journeyRole: "doorway",
  estimatedMinutes: 7,
  canDo: "Ask where something is, and answer it's here.",
  whyItExists:
    "L7 gave direction (je vais). L8 gives orientation: the smallest natural question, C'est où ?, built almost entirely from owned pieces (c'est from L3, ici from L2). This is a COMPACT de-scope of the full L08 où/movement spec: no où est-ce que, no movement system, no new places: one frozen question and its answer.",
  prerequisites: ["v1-lesson-007"],
  learningItems: getItems([
    "chunk-c-est-ou",
    "adverb-ou-where",
    "chunk-c-est",
    "chunk-bonjour",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Compact de-scope of docs/syllabus/L08-ou-location-movement-questions.lesson-spec.md against the shipped registry: the owned unit is the frozen question chunk-c-est-ou; adverb-ou-where is supported inside the frame (same ownership pattern as ce n'est pas).",
    "No est-ce que frame, no où est, no movement/destination system, no new place nouns.",
    "Progression: both weaves run at context, holding the L7 ceiling with no regression. No weave carries constitutive support, so evidence class is unchanged.",
    "Rhythm deliberately differs from L7 and L9: the ou insight is a REFLECTION placed after the first real ask, not a preamble, and the lesson runs ask-side then answer-side.",
    "Added screens carry one role each: s08 gives first contact with the joined answer form before it is produced, s09 contrasts which word asks and which answers, s10 reveals the pair working together.",
    "oui appears ONLY as a fill trap: it stays passive/recognition, never active-produced (L3 decision carried forward).",
    "Question-form Weave answers carry no-question-mark acceptedAlternatives (CI rule).",
    "Recycled load: chunk-c-est (target support), ici and chunk-bonjour as light carryover: the new question stays the headline of every screen.",
    "adverb-ou-where uses the disambiguated id recommended by L08 spec section 18: où (where) folds to ou (or) under accent-stripping, so the id carries the sense to avoid a future collision/migration.",
    "No learner-facing lesson numbers.",
    "Registered in V1_LESSONS but NOT learner-visible (Home caps at L6).",
  ],
  qaChecks: [
    "TTS reads C'est où ? with a natural question contour and no placeholder speech.",
    "s03 trap reasons fire on ici and oui.",
    "s09 trap reasons fire on où and oui.",
    "s04 accepts C'est où without the question mark via acceptedAlternatives.",
    "Recap chips are atoms/frames only; the full question C'est où ? never appears as a chip.",
    "où keeps its accent in all learner-facing strings.",
    "No streak/XP/mission language anywhere.",
  ],
};
