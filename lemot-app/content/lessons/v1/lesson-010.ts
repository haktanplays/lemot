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
    // The day-arc opens on French, not on a second explanation: owned pieces,
    // re-met inside the situation the whole lesson will run through. Nothing
    // here is new, so first production can follow immediately.
    id: "s09-meet-morning-arrival",
    type: "meet-card",
    targetItemIds: ["chunk-bonjour", "chunk-c-est-ou"],
    payload: {
      fr: "Bonjour. C'est où ?",
      en: "Hello. Where is it?",
      title: "The day starts at a door.",
      highlights: [
        { text: "Bonjour", itemId: "chunk-bonjour" },
        { text: "C'est", itemId: "chunk-c-est" },
        { text: "où", itemId: "adverb-ou-where" },
      ],
      tts: true,
    },
  },
  {
    id: "s02-weave-arrive-ask-where",
    type: "weave",
    targetItemIds: ["chunk-c-est-ou", "adverb-ou-where"],
    payload: {
      weaveType: "context",
      prompt: "Open politely, then ask where it is.",
      context:
        "Morning. Your first time in this building, and the room you need is not where you expected.",
      suggestedPieces: [
        { text: "bonjour", itemId: "chunk-bonjour", label: "hello" },
        { text: "c'est", itemId: "chunk-c-est", label: "it is" },
        { text: "où", itemId: "adverb-ou-where", label: "where" },
      ],
      hintCloze: "Bonjour. ___ ?",
      expectedAnswers: ["Bonjour. C'est où ?"],
      acceptedAlternatives: ["Bonjour, c'est où ?", "Bonjour, c'est où"],
      reveal: {
        modelAnswer: "Bonjour. C'est où ?",
        ifCorrect: "The opener and the question, working as one move.",
        ifCorrectButFlat: "Right. Bonjour first buys you the answer.",
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
      prompt: "You want to say you're going home. Which word moves you?",
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
    // Reflection, not preamble: the three engines are named only after the
    // learner has already used two of them today.
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
    id: "s04-weave-midday-break",
    type: "weave",
    targetItemIds: ["chunk-faire-une-pause", "chunk-je-voudrais"],
    payload: {
      // Open: nothing here is new, so the directive stands alone and every
      // piece is opt-in.
      weaveType: "open",
      prompt: "Say you'd like to take a break.",
      context:
        "Midday. You've been on your feet since you arrived, and someone asks how you're doing.",
      suggestedPieces: [
        {
          text: "je voudrais",
          itemId: "chunk-je-voudrais",
          label: "I would like",
        },
        {
          text: "faire une pause",
          itemId: "chunk-faire-une-pause",
          label: "to take a break",
        },
      ],
      hintCloze: "Je voudrais ___.",
      expectedAnswers: ["Je voudrais faire une pause."],
      acceptedAlternatives: ["Je voudrais faire une pause, s'il vous plaît."],
      reveal: {
        modelAnswer: "Je voudrais faire une pause.",
        ifCorrect: "Yesterday's sentence, back when you actually need it.",
        ifCorrectButFlat: "Right. The same ask, in a new moment.",
        ifUnderstandableButWrong:
          "Your meaning lands. The ask you already know still fits here.",
        ifMissingTargetPiece:
          "Start with je voudrais. Then hand it the action: faire une pause.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    // Reveal after the midday ask: the same request with and without the
    // softener, so the day's middle beat lands before the evening one.
    id: "s10-reveal-midday-break",
    type: "natural-reveal",
    payload: {
      modelAnswer: "Je voudrais faire une pause.",
      naturalAlternatives: ["Je voudrais faire une pause, s'il vous plaît."],
      explanation:
        "Both are natural. Among people you have been working with all morning, the short form is enough; s'il vous plaît adds a little distance when you want it.",
    },
  },
  {
    id: "s06-meet-preview-help",
    type: "meet-card",
    targetItemIds: ["chunk-vous-pouvez", "chunk-m-aider"],
    payload: {
      fr: "Vous pouvez m'aider ?",
      en: "Can you help me?",
      // Preview convention: "Just listen." opens every recognition-only card,
      // so the learner can tell at a glance that nothing is being asked of
      // them. This sentence is never produced, never a suggested piece, and
      // never a recap chip.
      title: "Just listen. This one arrives next.",
      highlights: [
        { text: "vous pouvez", itemId: "chunk-vous-pouvez" },
        { text: "m'aider", itemId: "chunk-m-aider" },
      ],
      tts: true,
    },
  },
  {
    id: "s05-weave-close-the-day",
    type: "weave",
    targetItemIds: ["chunk-je-vais", "chunk-a-la-maison"],
    payload: {
      // The day's summit: open production, no more scaffolded than L6's own
      // closing weave.
      weaveType: "open",
      prompt: "Evening. Say you're going home, then say goodbye.",
      context:
        "The day at the new place is done. People are still talking, but you're finished.",
      suggestedPieces: [
        { text: "je vais", itemId: "chunk-je-vais", label: "I'm going" },
        {
          text: "à la maison",
          itemId: "chunk-a-la-maison",
          label: "home",
        },
        {
          text: "au revoir",
          itemId: "chunk-au-revoir",
          label: "goodbye",
        },
      ],
      hintCloze: "Je vais ___. Au revoir.",
      expectedAnswers: ["Je vais à la maison. Au revoir."],
      acceptedAlternatives: ["Je vais à la maison, au revoir."],
      reveal: {
        modelAnswer: "Je vais à la maison. Au revoir.",
        ifCorrect: "You opened the day with bonjour. Now you can close it.",
        ifCorrectButFlat: "Right. The day closes the way it opened.",
        ifUnderstandableButWrong:
          "Your meaning lands. Where you are going comes first, then the goodbye.",
        ifMissingTargetPiece:
          "Lead with je vais à la maison, then let au revoir close the door.",
      },
      validationMode: "exact-or-alternative",
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
  journeyRole: "integration",
  acquisitionDemandItemIds: [],
  estimatedMinutes: 8,
  canDo: "Arrive, ask where, take a break, and leave.",
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
    "Integration repair: the lesson now opens Goal then a French re-meet of owned material inside the day-arc (s09), so first production follows real contact instead of two explanations. The three-engines insight moved to a reflective position after two engines have already been used today.",
    "Progression: context then open then open. The closing weave is open, so the day's summit is no more scaffolded than L6's. No weave carries constitutive support, so evidence class is unchanged.",
    "Vous pouvez m'aider ? appears ONLY as a recognition meet-card (future hook for L11 per the spec): it is never a production target, never a suggested piece elsewhere, and never a recap chip. Its title opens with the reusable preview convention 'Just listen.'",
    "The help question is NOT a registry chunk (Haktan decision, PR #168 rework): it is a composed model sentence over the split pieces chunk-vous-pouvez + chunk-m-aider, which the preview highlights separately. Both pieces carry registry status supported (their steady-state L11 role); their L10 use is recognition-only by lesson design, since registry status is static.",
    "De-scope vs spec: the spec's fatigue combo (je suis fatigue) is dropped because fatigue is not in the shipped registry; the break weave carries that communicative moment instead.",
    "s03 fill anchors meaning first (you want to say you're going home) so je suis stays a fair trap: grammatical, but the wrong meaning.",
    "No learner-facing lesson numbers.",
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
