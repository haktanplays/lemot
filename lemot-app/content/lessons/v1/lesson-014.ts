import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-y",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "One tiny word",
      body:
        "Today: one very small word, y.\n" +
        "By the end: you can say you're off, without repeating the place.\n" +
        "Main pieces: y, j'y vais, on y va.",
    },
  },
  {
    id: "s01-meet-j-y-vais",
    type: "meet-card",
    targetItemIds: ["chunk-j-y-vais", "word-y-place"],
    payload: {
      fr: "J'y vais.",
      en: "I'm off. (I'm going there.)",
      title: "The place, in one letter.",
      highlights: [{ text: "y", itemId: "word-y-place" }],
      tts: true,
    },
  },
  {
    id: "s02-insight-y-replaces",
    type: "insight-card",
    targetItemIds: ["word-y-place", "chunk-j-y-vais"],
    payload: {
      insightType: "grammar-nugget",
      title: "Don't repeat the place.",
      body:
        "Once a place is named, French stops repeating it: y stands in for it. Two things to notice: y sits BEFORE the verb, and je squeezes to j' in front of it. That's the whole lesson. Other jobs of y (il y a, and friends) are later doorways.",
      examples: [
        { fr: "Je vais à la maison.", en: "I'm going home. (the full way)" },
        { fr: "J'y vais.", en: "I'm going there / I'm off. (the short way)" },
      ],
    },
  },
  {
    id: "s03-meet-on-y-va",
    type: "meet-card",
    targetItemIds: ["chunk-on-y-va", "word-y-place"],
    payload: {
      fr: "On y va ?",
      en: "Shall we go?",
      title: "The same y, for everyone.",
      highlights: [
        { text: "y", itemId: "word-y-place" },
        { text: "on y va", itemId: "chunk-on-y-va" },
      ],
      tts: true,
    },
  },
  {
    id: "s04-fill-y-blank",
    type: "fill-with-traps",
    targetItemIds: ["word-y-place"],
    payload: {
      prompt:
        "The house was just named. Say you're going there. What fits the empty space?",
      sentenceBefore: "J'",
      sentenceAfter: " vais.",
      blankCount: 1,
      options: [
        { id: "opt-y", text: "y", isCorrect: true },
        {
          id: "opt-en",
          text: "en",
          isCorrect: false,
          trapReason:
            "En is a different little word with a different job, and it comes later. For a place, it's y.",
        },
        {
          id: "opt-oui",
          text: "oui",
          isCorrect: false,
          trapReason: "Oui says yes. It cannot stand in for a place.",
        },
      ],
      answer: ["opt-y"],
      reveal: {
        short: "y",
        explanation:
          "Y = the place you already named, and it sits before the verb: j'y vais.",
        natural: "J'y vais.",
      },
    },
  },
  {
    id: "s05-weave-say-youre-off",
    type: "weave",
    targetItemIds: ["word-y-place", "chunk-je-vais"],
    payload: {
      weaveType: "supported",
      prompt: "You've already said where. Now say you're off, the short way.",
      context:
        "You told them earlier: je vais à la maison. Time to actually leave.",
      suggestedPieces: [
        { text: "je vais", itemId: "chunk-je-vais", required: true, label: "I'm going" },
        {
          text: "y",
          itemId: "word-y-place",
          required: true,
          label: "there (the place you named)",
        },
      ],
      expectedAnswers: ["J'y vais."],
      reveal: {
        modelAnswer: "J'y vais.",
        ifCorrect:
          "Y slid in front of the verb, and je squeezed to j'. That's the natural short way.",
        ifCorrectButFlat: "Right shape. Small word, native rhythm.",
        ifUnderstandableButWrong:
          "Your meaning lands. Watch the order: y goes before the verb, j'y vais, never je vais y.",
        ifMissingTargetPiece:
          "Take je vais and slide y in front of the verb: j'y vais.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-weave-lets-go",
    type: "weave",
    targetItemIds: ["chunk-on-y-va"],
    payload: {
      weaveType: "supported",
      prompt: "Suggest you both go.",
      context:
        "Everything is packed, coats are on, and the door is right there.",
      suggestedPieces: [
        {
          text: "on y va",
          itemId: "chunk-on-y-va",
          required: true,
          label: "let's go",
        },
      ],
      expectedAnswers: ["On y va ?"],
      acceptedAlternatives: ["On y va.", "On y va !"],
      reveal: {
        modelAnswer: "On y va ?",
        ifCorrect:
          "One little expression, taken whole. The rising voice makes it an invitation.",
        ifCorrectButFlat: "Right shape. Said flat, it's a decision; rising, an invitation.",
        ifMissingTargetPiece:
          "Take on y va as one piece. It carries everyone out the door.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s07-sayit-time-to-leave",
    type: "say-it-your-way",
    targetItemIds: ["chunk-j-y-vais", "chunk-on-y-va"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "The evening is ending. You mentioned home a while ago, and someone asks if you're leaving.",
      communicativeGoal: "Say you're off, or suggest you both go.",
      suggestedPieces: [
        { text: "je vais", itemId: "chunk-je-vais" },
        { text: "y", itemId: "word-y-place" },
        { text: "on y va", itemId: "chunk-on-y-va" },
        { text: "au revoir", itemId: "chunk-au-revoir" },
      ],
      modelAnswer: "J'y vais. Au revoir.",
      reveal: {
        modelAnswer: "J'y vais. Au revoir.",
        naturalAlternatives: ["On y va ?", "Je vais à la maison. Au revoir."],
        explanation:
          "All natural. J'y vais is the everyday short exit; the full je vais à la maison from L7 still works whenever you want it.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s08-recap-y",
    type: "recap",
    payload: {
      title: "You can leave in one word.",
      lines: [
        "You stopped repeating the place: y carries it now.",
        "Y sits before the verb, and je becomes j' in front of it.",
        "The full sentence from L7 still works. Now you have the short way too.",
      ],
      piecesUsed: ["y", "je vais", "à la maison", "au revoir"],
      nextLabel: "Continue",
    },
  },
];

export const lesson014: Lesson = {
  id: "v1-lesson-014",
  version: "v1",
  number: 14,
  title: "J'y vais",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "pronoun-particle",
  secondaryArchetype: "chunk-natural-speech",
  estimatedMinutes: 5,
  canDo: "Say you're going there (j'y vais) and suggest going (on y va) without repeating the place.",
  whyItExists:
    "Per the L14 compact spec (gate Option: place-y, chunk-first, recognition-first), this is the spine's first pronoun doorway: y in ONE sense (the place you already named), owned through the near-fixed expressions j'y vais and on y va over the owned L7 antecedent (je vais a la maison). It graduates L13's recognition hook. The productive replacement rule, en, il y a, multi-verb y (j'y suis), object pronouns, and y-chains with est-ce que or pouvoir are all deliberately deferred, so the pronoun system stays closed.",
  prerequisites: ["v1-lesson-013"],
  learningItems: getItems([
    "word-y-place",
    "chunk-j-y-vais",
    "chunk-on-y-va",
    "chunk-je-vais",
    "chunk-a-la-maison",
    "chunk-au-revoir",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Aligned with docs/syllabus/L14-y-light-place-pronoun.compact-spec.md: word-y-place + chunk-j-y-vais (graduated from the L13 seed) + chunk-on-y-va active; recognition-weighted flow (two meet-cards + a strong replacement insight before any production).",
    "word-y-place carries the sense in its id per the spec's homograph guard: il y a, j'y pense and en are separate, deferred doorways and appear nowhere in this lesson (il y a is omitted entirely rather than taught as a contrast).",
    "Word order and elision are taught in-expression (y before the verb; je to j'), not as a pronoun-placement rule; the s05 weave reveal carries the je vais y correction.",
    "De-scopes vs spec: tu y vas / vous y allez are dropped (the tu/vous forms of aller are not in the shipped registry); je n'y vais pas is dropped from production (a negative y-clause chip would violate the PR #168 composition canon; it can arrive later as composed copy once the pattern is stable).",
    "on (= we) lives only inside chunk-on-y-va, mirroring how m' lives inside m'aider; no subject-pronoun teaching.",
    "s06 treats on y va as a near-fixed formula chunk per the spec's chunk-first mandate (same class as s'il vous plait); it is a weave hint chip but never a recap chip (it would trip the sentence-chip lint, and the recap keeps atoms only).",
    "en appears ONLY as a fill trap (blocked production per spec); oui stays passive/trap.",
    "No XP / streak / level-up / mission copy. SayIt is deterministic model-answer-only.",
    "Registered in V1_LESSONS but NOT learner-visible (Home caps at L6).",
  ],
  qaChecks: [
    "TTS reads J'y vais. and On y va ? cleanly (the y is audible, no placeholder speech).",
    "s04 trap reasons fire on en and oui.",
    "s06 accepts the period and exclamation variants via acceptedAlternatives.",
    "Recap chips are atoms only; j'y vais and on y va never appear as recap chips.",
    "il y a, en (outside the trap), j'y suis, and je vais y never appear in learner-facing copy.",
    "No streak/XP/mission language anywhere.",
  ],
};
