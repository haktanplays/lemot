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
      prompt: "You are leaving for home. Which word moves you?",
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
      // First production of a brand-new engine: mid keeps a little more help
      // than the rest of the lesson, and it fades at the very next weave.
      weaveType: "mid",
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
      hintCloze: "Je vais ___.",
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
    // Contrast before the harder close: the destination is ONE package, so the
    // learner does not arrive at the two-sentence weave still splitting it.
    id: "s08-fill-destination-package",
    type: "fill-with-traps",
    targetItemIds: ["chunk-a-la-maison"],
    payload: {
      prompt: "You are naming where you're heading. Which piece says home?",
      sentenceBefore: "Je vais ",
      sentenceAfter: ".",
      blankCount: 1,
      options: [
        { id: "opt-a-la-maison", text: "à la maison", isCorrect: true },
        {
          id: "opt-maison",
          text: "maison",
          isCorrect: false,
          trapReason:
            "Maison on its own is just the word for house. The piece travels with its little words: à la maison.",
        },
        {
          id: "opt-a-la",
          text: "à la",
          isCorrect: false,
          trapReason:
            "À la opens the piece but never lands it. Keep it whole: à la maison.",
        },
      ],
      answer: ["opt-a-la-maison"],
      reveal: {
        short: "à la maison",
        explanation:
          "À la maison is one piece: home. Take it whole and it always fits.",
        natural: "Je vais à la maison.",
      },
    },
  },
  {
    id: "s05-weave-close-the-moment",
    type: "weave",
    targetItemIds: ["chunk-je-vais", "chunk-a-la-maison"],
    payload: {
      // Support fades inside the lesson: the scene carries the task, the pieces
      // stay behind the hint button, and the cloze holds only the shape.
      weaveType: "context",
      prompt: "Say you're going home, then say goodbye.",
      context: "You're at the door. Close it the way you did before.",
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
        ifCorrect: "You opened moments before. Now you can close them and leave.",
        ifCorrectButFlat: "Two short sentences. Calm and complete.",
        ifMissingTargetPiece:
          "Lead with je vais à la maison, then let au revoir close the door.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    // Reveal after the lesson's real production: the same close, heard the way
    // it usually lands, plus the shorter form.
    id: "s09-reveal-the-close",
    type: "natural-reveal",
    payload: {
      modelAnswer: "Je vais à la maison. Au revoir.",
      naturalAlternatives: ["Je vais à la maison, au revoir."],
      explanation:
        "Both are natural. Two short sentences sound calm and finished; the comma version runs them together as one easy breath.",
    },
  },
  {
    // Reflection, not new material: names what the learner just did.
    id: "s10-insight-leaving-two-moves",
    type: "insight-card",
    targetItemIds: ["chunk-je-vais"],
    payload: {
      insightType: "culture-bite",
      title: "Leaving is two small moves.",
      body:
        "Say where you're heading, then close the door with a word. That is all a French goodbye needs. The same two moves work whether you are leaving a room, a shop, or a long afternoon.",
      examples: [
        { fr: "Je vais à la maison.", en: "I'm going home." },
        { fr: "Au revoir.", en: "Goodbye." },
      ],
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
  estimatedMinutes: 7,
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
    "Progression: the lesson runs mid then context, so support fades WITHIN the lesson and the ceiling stays one tier from L6's open summit. No weave carries constitutive support, so evidence class is unchanged.",
    "Added screens carry one role each: s08 protects the à la maison package before the two-sentence close, s09 reveals how that close actually lands, s10 names the two-move shape after it has been used.",
    "Recycled load: chunk-au-revoir and chunk-merci as closers (carryover supports the target; the target line leads every model answer).",
    "chunk-je-suis and chunk-je-voudrais appear only as fill traps, not production targets.",
    "No learner-facing lesson numbers: the s05 callback points at the learner's own earlier moment, not at a lesson index.",
    "No XP / streak / level-up / mission copy. SayIt is deterministic model-answer-only.",
    "Registered in V1_LESSONS but NOT learner-visible: Home caps the path at L6. Surfacing L7 is a separate smoke-bearing unlock decision.",
  ],
  qaChecks: [
    "TTS reads Je vais à la maison and the two-sentence close cleanly.",
    "s03 trap reasons fire on suis and voudrais.",
    "s08 trap reasons fire on maison and à la.",
    "s05 accepts the comma variant via acceptedAlternatives.",
    "Recap chips are atomic or approved chunks (à la maison is a frozen package, not a sentence).",
    "No streak/XP/mission language anywhere.",
  ],
};
