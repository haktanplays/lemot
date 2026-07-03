import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-integration",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "A full small day",
      body:
        "Today: nothing new.\n" +
        "By the end: you'll have lived a whole small day in French, from pieces you already own.\n" +
        "Main pieces: c'est où, faire une pause, je vais.",
    },
  },
  {
    id: "s01-insight-three-engines",
    type: "insight-card",
    targetItemIds: ["chunk-je-suis", "chunk-je-voudrais", "chunk-je-vais"],
    payload: {
      insightType: "grammar-nugget",
      title: "Three engines, three jobs.",
      body:
        "You now carry three small engines. Je suis says what or where you are. Je voudrais asks for things and actions. Je vais moves you. Today they take turns.",
      examples: [
        { fr: "Je suis ici.", en: "I'm here. (being)" },
        { fr: "Je voudrais faire une pause.", en: "I'd like to take a break. (asking)" },
        { fr: "Je vais à la maison.", en: "I'm going home. (moving)" },
      ],
    },
  },
  {
    id: "s02-weave-arrive-ask-where",
    type: "weave",
    targetItemIds: ["chunk-c-est-ou", "adverb-ou-where"],
    payload: {
      weaveType: "supported",
      prompt: "Open politely, then ask where it is.",
      context:
        "Morning. Your first time in this building, and the room you need is not where you expected.",
      suggestedPieces: [
        { text: "bonjour", itemId: "chunk-bonjour", required: true, label: "hello" },
        { text: "c'est", itemId: "chunk-c-est", required: true, label: "it is" },
        { text: "où", itemId: "adverb-ou-where", required: true, label: "where" },
      ],
      expectedAnswers: ["Bonjour. C'est où ?"],
      acceptedAlternatives: ["Bonjour, c'est où ?", "Bonjour, c'est où"],
      reveal: {
        modelAnswer: "Bonjour. C'est où ?",
        ifCorrect: "The L1 opener and the L8 question, working as one move.",
        ifCorrectButFlat: "Right pieces. Bonjour first buys you the answer.",
        ifUnderstandableButWrong:
          "Your meaning lands. A native opens the moment first: Bonjour. C'est où ?",
        ifMissingTargetPiece: "Start with bonjour, then let c'est où do the asking.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s03-fill-engine-chooser",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-vais"],
    payload: {
      prompt: "You want to say you're going home. What fits the empty space?",
      sentenceBefore: "Je ",
      sentenceAfter: " à la maison.",
      blankCount: 1,
      options: [
        { id: "opt-vais", text: "vais", isCorrect: true },
        {
          id: "opt-suis",
          text: "suis",
          isCorrect: false,
          trapReason:
            "Je suis à la maison says you are already there. You want the moving engine: je vais.",
        },
        {
          id: "opt-voudrais",
          text: "voudrais",
          isCorrect: false,
          trapReason:
            "Je voudrais wishes for something. It cannot take you home by itself.",
        },
      ],
      answer: ["opt-vais"],
      reveal: {
        short: "vais",
        explanation:
          "Three engines, one job each. Moving somewhere is je vais.",
        natural: "Je vais à la maison.",
      },
    },
  },
  {
    id: "s04-weave-midday-break",
    type: "weave",
    targetItemIds: ["chunk-faire-une-pause", "chunk-je-voudrais"],
    payload: {
      weaveType: "supported",
      prompt: "Say you'd like to take a break.",
      context:
        "Midday. You've been on your feet since you arrived, and someone asks how you're doing.",
      suggestedPieces: [
        {
          text: "je voudrais",
          itemId: "chunk-je-voudrais",
          required: true,
          label: "I would like",
        },
        {
          text: "faire une pause",
          itemId: "chunk-faire-une-pause",
          required: true,
          label: "to take a break",
        },
      ],
      expectedAnswers: ["Je voudrais faire une pause."],
      acceptedAlternatives: ["Je voudrais faire une pause, s'il vous plaît."],
      reveal: {
        modelAnswer: "Je voudrais faire une pause.",
        ifCorrect: "Yesterday's sentence, back when you actually need it.",
        ifCorrectButFlat: "The pieces still fit. Rest, asked for calmly.",
        ifUnderstandableButWrong:
          "Your meaning lands. A native joins the pieces this way.",
        ifMissingTargetPiece:
          "Start with je voudrais. Then hand it the action: faire une pause.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-weave-close-the-day",
    type: "weave",
    targetItemIds: ["chunk-je-vais", "chunk-a-la-maison"],
    payload: {
      weaveType: "supported",
      prompt: "Evening. Say you're going home, then say goodbye.",
      context:
        "The day at the new place is done. People are still talking, but you're finished.",
      suggestedPieces: [
        { text: "je vais", itemId: "chunk-je-vais", required: true, label: "I'm going" },
        {
          text: "à la maison",
          itemId: "chunk-a-la-maison",
          required: true,
          label: "home",
        },
        {
          text: "au revoir",
          itemId: "chunk-au-revoir",
          required: true,
          label: "goodbye",
        },
      ],
      expectedAnswers: ["Je vais à la maison. Au revoir."],
      acceptedAlternatives: ["Je vais à la maison, au revoir."],
      reveal: {
        modelAnswer: "Je vais à la maison. Au revoir.",
        ifCorrect: "You opened the day with bonjour. Now you can close it.",
        ifCorrectButFlat: "Two short sentences. Calm and complete.",
        ifMissingTargetPiece:
          "Lead with je vais à la maison, then let au revoir close the door.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-meet-preview-help",
    type: "meet-card",
    targetItemIds: ["chunk-vous-pouvez", "chunk-m-aider"],
    payload: {
      fr: "Vous pouvez m'aider ?",
      en: "Can you help me?",
      title: "Just listen. This one arrives next.",
      highlights: [
        { text: "vous pouvez", itemId: "chunk-vous-pouvez" },
        { text: "m'aider", itemId: "chunk-m-aider" },
      ],
      tts: true,
    },
  },
  {
    id: "s07-sayit-take-your-leave",
    type: "say-it-your-way",
    targetItemIds: ["chunk-je-vais", "chunk-a-la-maison"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "The end of your first full day at the new place. Someone walks you to the door.",
      communicativeGoal: "Take your leave warmly: thanks, direction, goodbye.",
      suggestedPieces: [
        { text: "merci", itemId: "chunk-merci" },
        { text: "je vais", itemId: "chunk-je-vais" },
        { text: "à la maison", itemId: "chunk-a-la-maison" },
        { text: "au revoir", itemId: "chunk-au-revoir" },
      ],
      modelAnswer: "Merci. Je vais à la maison. Au revoir.",
      reveal: {
        modelAnswer: "Merci. Je vais à la maison. Au revoir.",
        naturalAlternatives: ["Je vais à la maison. Au revoir."],
        explanation:
          "Both are natural. Merci thanks the day; je vais à la maison says where you're off to; au revoir closes it gently.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s08-recap-full-day",
    type: "recap",
    payload: {
      title: "You lived a day in French.",
      lines: [
        "You arrived, asked where, took a break, and left well.",
        "Nothing was new. Everything was yours already.",
        "Next: a small new engine, for asking if you can.",
      ],
      piecesUsed: [
        "bonjour",
        "c'est",
        "où",
        "je voudrais",
        "faire une pause",
        "je vais",
        "à la maison",
        "au revoir",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson010: Lesson = {
  id: "v1-lesson-010",
  version: "v1",
  number: 10,
  title: "Une petite journée",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "chunk-natural-speech",
  estimatedMinutes: 5,
  canDo: "Move through a whole small day: arrive, ask where, take a break, leave.",
  whyItExists:
    "Per the L10 after-class integration spec, this lesson adds (almost) nothing new: it recombines L7-L9 with the L1-L6 base under a single day-arc narrative, so the learner feels the pieces working together rather than in isolation. The only genuinely new material is one recognition-only preview: Vous pouvez m'aider ?, planted as the doorway L11 will open. Retrieval in fresh contexts, not novelty, is the point.",
  prerequisites: ["v1-lesson-009"],
  learningItems: getItems([
    "chunk-c-est-ou",
    "adverb-ou-where",
    "chunk-c-est",
    "chunk-bonjour",
    "chunk-je-voudrais",
    "chunk-faire-une-pause",
    "chunk-je-vais",
    "chunk-a-la-maison",
    "chunk-au-revoir",
    "chunk-vous-pouvez",
    "chunk-m-aider",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Aligned with docs/syllabus/L10-after-class-integration.lesson-spec.md: near-zero new lexis; the lesson is deliberate spaced retrieval of L7 (je vais + a la maison), L8 (c'est ou), and L9 (faire une pause) inside one day-arc.",
    "Vous pouvez m'aider ? appears ONLY as a recognition meet-card (future hook for L11 per the spec): it is never a production target, never a suggested piece elsewhere, and never a recap chip.",
    "The help question is NOT a registry chunk (Haktan decision, PR #168 rework): it is a composed model sentence over the split pieces chunk-vous-pouvez + chunk-m-aider, which the preview highlights separately. Both pieces carry registry status supported (their steady-state L11 role); their L10 use is recognition-only by lesson design, since registry status is static.",
    "De-scope vs spec: the spec's fatigue combo (je suis fatigue) is dropped because fatigue is not in the shipped registry; the break weave carries that communicative moment instead.",
    "s03 fill anchors meaning first (you want to say you're going home) so je suis stays a fair trap: grammatical, but the wrong meaning.",
    "No XP / streak / level-up / mission copy. SayIt is deterministic model-answer-only.",
    "Registered in V1_LESSONS but NOT learner-visible (Home caps at L6).",
  ],
  qaChecks: [
    "TTS reads Vous pouvez m'aider ? cleanly on the preview card.",
    "s03 trap reasons fire on suis and voudrais.",
    "s02 accepts the comma and no-question-mark variants via acceptedAlternatives.",
    "Recap chips are atoms/packages only; no full sentence appears as a chip.",
    "vous pouvez m'aider never appears as a production target or recap chip.",
    "No streak/XP/mission language anywhere.",
  ],
};
