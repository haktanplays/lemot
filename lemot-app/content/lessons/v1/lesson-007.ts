import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-je-vais",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Heading off",
      body:
        "Today: one new engine, je vais.\n" +
        "By the end: you can close a moment and say you're heading home.\n" +
        "Main pieces: je vais, à la maison.",
    },
  },
  {
    id: "s01-meet-je-vais-a-la-maison",
    type: "meet-card",
    targetItemIds: ["chunk-je-vais", "chunk-a-la-maison"],
    payload: {
      fr: "Je vais à la maison.",
      en: "I'm going home.",
      title: "Where you're heading.",
      highlights: [
        { text: "je vais", itemId: "chunk-je-vais" },
        { text: "à la maison", itemId: "chunk-a-la-maison" },
      ],
      tts: true,
    },
  },
  {
    id: "s02-insight-je-vais-frozen",
    type: "insight-card",
    targetItemIds: ["chunk-je-vais"],
    payload: {
      insightType: "grammar-nugget",
      title: "Take it whole.",
      body:
        "Je vais = I'm going. Like je suis, it is one solid piece. À la maison is one piece too: home. No rules to learn yet. The pieces do the work.",
      examples: [
        { fr: "Je vais.", en: "I'm heading off." },
        { fr: "Je vais à la maison.", en: "I'm going home." },
      ],
    },
  },
  {
    id: "s03-fill-je-vais-blank",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-vais"],
    payload: {
      prompt: "What fits the empty space?",
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
            "Je suis says where you are. Je vais says where you're heading.",
        },
        {
          id: "opt-voudrais",
          text: "voudrais",
          isCorrect: false,
          trapReason:
            "Je voudrais asks for something. It doesn't take you anywhere.",
        },
      ],
      answer: ["opt-vais"],
      reveal: {
        short: "vais",
        explanation: "Je vais = I'm going. The moving engine.",
        natural: "Je vais à la maison.",
      },
    },
  },
  {
    id: "s04-weave-heading-home",
    type: "weave",
    targetItemIds: ["chunk-je-vais", "chunk-a-la-maison"],
    payload: {
      weaveType: "supported",
      prompt: "Say you're going home.",
      context: "The evening is winding down. Let them know where you're heading.",
      suggestedPieces: [
        { text: "je vais", itemId: "chunk-je-vais", required: true, label: "I'm going" },
        {
          text: "à la maison",
          itemId: "chunk-a-la-maison",
          required: true,
          label: "home",
        },
      ],
      expectedAnswers: ["Je vais à la maison."],
      reveal: {
        modelAnswer: "Je vais à la maison.",
        ifCorrect: "One engine, one destination. That's the whole sentence.",
        ifCorrectButFlat: "The pieces fit. The period closes the moment.",
        ifUnderstandableButWrong:
          "Your meaning lands. A native joins the two pieces this way.",
        ifMissingTargetPiece: "Start with je vais. That is the moving shape.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-weave-close-the-moment",
    type: "weave",
    targetItemIds: ["chunk-je-vais", "chunk-a-la-maison"],
    payload: {
      weaveType: "supported",
      prompt: "Say you're going home, then say goodbye.",
      context: "You're at the door. Close the moment the way L6 taught you.",
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
        ifCorrect: "You opened moments in L1. Now you can close them and leave.",
        ifCorrectButFlat: "Two short sentences. Calm and complete.",
        ifMissingTargetPiece:
          "Lead with je vais à la maison, then let au revoir close the door.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-sayit-take-your-leave",
    type: "say-it-your-way",
    targetItemIds: ["chunk-je-vais", "chunk-a-la-maison"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "The small gathering is ending. People are picking up their coats. Take your leave.",
      communicativeGoal: "Close the moment and say where you're heading.",
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
          "Both are natural. Merci thanks the moment; je vais à la maison says where you're off to; au revoir closes the door gently.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s06b-insight-you-may-hear",
    type: "insight-card",
    payload: {
      insightType: "culture-bite",
      title: "Leaving has its own music.",
      body:
        "Around every departure, small goodbyes fly back and forth. None of them are yours to produce yet. Hear them now; doors will say them to you soon.",
      examples: [
        { fr: "Bonne soirée !", en: "Have a good evening." },
        { fr: "À demain !", en: "See you tomorrow." },
        { fr: "À bientôt !", en: "See you soon." },
        { fr: "À la prochaine !", en: "Until next time." },
        { fr: "Tu pars déjà ?", en: "Leaving already?" },
        { fr: "Moi, je reste.", en: "Me, I'm staying." },
        { fr: "Il est tard.", en: "It's late." },
        { fr: "Rentre bien !", en: "Get home safe." },
      ],
    },
  },
  {
    id: "s07-recap-heading-home",
    type: "recap",
    payload: {
      title: "You can leave well.",
      lines: [
        "You said where you're heading.",
        "You closed a whole moment: thanks, direction, goodbye.",
        "Je vais stayed one solid piece the whole way.",
      ],
      piecesUsed: ["je vais", "à la maison", "Merci", "Au revoir"],
      nextLabel: "Continue",
    },
  },
];

export const lesson007: Lesson = {
  id: "v1-lesson-007",
  version: "v1",
  number: 7,
  title: "Je vais",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "architecture-verb",
  estimatedMinutes: 5,
  canDo: "Say you're heading home, and close the moment.",
  whyItExists:
    "L6 closed the arrival arc at au revoir. L7 is the frozen-chunk doorway that adds the leaving direction: je vais + à la maison, taken whole. Per the accepted compact doorway spec, this is deliberately NOT the aller/movement lesson: no paradigm, no à/au/à la system, no futur proche. It exists so leaving feels as natural as arriving did.",
  prerequisites: ["v1-lesson-006"],
  learningItems: getItems([
    "chunk-je-vais",
    "chunk-a-la-maison",
    "chunk-au-revoir",
    "chunk-merci",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Follows docs/syllabus/L07-compact-doorway.compact-spec.md exactly: two new items only (chunk-je-vais active, chunk-a-la-maison supported), frozen chunks, no conjugation.",
    "Strict out-of-scope honored: no aller paradigm, no à/au/à la rule, no futur proche, no y, no où, no new destinations.",
    "Recycled load: chunk-au-revoir and chunk-merci as closers (carryover supports the target; the target line leads every model answer).",
    "Seen layer v0 (docs/SURFACE_DENSITY_METRIC_CLARIFICATION_2026_07.md): s06b is heard-French exposure only (the goodbye family around a departure). Nothing in it is produced, chipped, required, registered, or counted in piecesUsed; TTS is synthesis-only.",
    "chunk-je-suis and chunk-je-voudrais appear only as fill traps, not production targets.",
    "No XP / streak / level-up / mission copy. SayIt is deterministic model-answer-only.",
    "Registered in V1_LESSONS but NOT learner-visible: Home caps the path at L6. Surfacing L7 is a separate smoke-bearing unlock decision.",
  ],
  qaChecks: [
    "TTS reads Je vais à la maison and the two-sentence close cleanly.",
    "s03 trap reasons fire on suis and voudrais.",
    "s05 accepts the comma variant via acceptedAlternatives.",
    "Recap chips are atomic or approved chunks (à la maison is a frozen package, not a sentence).",
    "No streak/XP/mission language anywhere.",
  ],
};
