import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-pause",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Taking a pause",
      body:
        "Today: one small action, faire une pause.\n" +
        "By the end: you can ask for a break, politely.\n" +
        "Main pieces: faire une pause, une pause, je voudrais.",
    },
  },
  {
    id: "s01-meet-faire-une-pause",
    type: "meet-card",
    targetItemIds: ["chunk-faire-une-pause", "chunk-je-voudrais"],
    payload: {
      fr: "Je voudrais faire une pause.",
      en: "I'd like to take a break.",
      title: "Rest, said politely.",
      highlights: [
        { text: "je voudrais", itemId: "chunk-je-voudrais" },
        { text: "faire une pause", itemId: "chunk-faire-une-pause" },
      ],
      tts: true,
    },
  },
  {
    id: "s02-insight-voudrais-carries-actions",
    type: "insight-card",
    targetItemIds: ["chunk-faire-une-pause"],
    payload: {
      insightType: "grammar-nugget",
      title: "Same engine, new cargo.",
      body:
        "In L1, je voudrais asked for a thing. It can also carry a small action: faire une pause. Take faire une pause as one piece. The wider faire universe waits.",
      examples: [
        { fr: "Je voudrais une pause.", en: "I'd like a break. (a thing)" },
        { fr: "Je voudrais faire une pause.", en: "I'd like to take a break. (an action)" },
      ],
    },
  },
  {
    id: "s03-fill-faire-blank",
    type: "fill-with-traps",
    targetItemIds: ["chunk-faire-une-pause"],
    payload: {
      prompt: "What fits the empty space?",
      sentenceBefore: "Je voudrais ",
      sentenceAfter: " une pause.",
      blankCount: 1,
      options: [
        { id: "opt-faire", text: "faire", isCorrect: true },
        {
          id: "opt-vais",
          text: "vais",
          isCorrect: false,
          trapReason:
            "Je vais moves you somewhere. After je voudrais, the action keeps its dictionary shape: faire.",
        },
        {
          id: "opt-suis",
          text: "suis",
          isCorrect: false,
          trapReason:
            "Suis says what you are. It cannot take a pause for you.",
        },
      ],
      answer: ["opt-faire"],
      reveal: {
        short: "faire",
        explanation:
          "Faire une pause = take a break. One package, carried by je voudrais.",
        natural: "Je voudrais faire une pause.",
      },
    },
  },
  {
    id: "s04-weave-ask-for-a-break",
    type: "weave",
    targetItemIds: ["chunk-faire-une-pause", "chunk-je-voudrais"],
    payload: {
      weaveType: "supported",
      prompt: "Say you'd like to take a break.",
      context: "The afternoon has been long, and your head is getting heavy.",
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
      reveal: {
        modelAnswer: "Je voudrais faire une pause.",
        ifCorrect: "The L1 engine, carrying its first action.",
        ifCorrectButFlat: "The pieces fit. Rest, asked for calmly.",
        ifUnderstandableButWrong:
          "Your meaning lands. A native joins the pieces this way.",
        ifMissingTargetPiece:
          "Start with je voudrais. Then hand it the action: faire une pause.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-weave-break-politely",
    type: "weave",
    targetItemIds: ["chunk-faire-une-pause"],
    payload: {
      weaveType: "supported",
      prompt: "Ask for a break politely: say you'd like to take a pause, please.",
      context:
        "You're working through something together. It's a good moment to ask.",
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
        {
          text: "s'il vous plaît",
          itemId: "chunk-sil-vous-plait",
          required: true,
          label: "please",
        },
      ],
      expectedAnswers: ["Je voudrais faire une pause, s'il vous plaît."],
      acceptedAlternatives: ["Je voudrais faire une pause s'il vous plaît."],
      reveal: {
        modelAnswer: "Je voudrais faire une pause, s'il vous plaît.",
        ifCorrect: "L1 politeness, L9 rest. The old pieces keep working.",
        ifCorrectButFlat: "Right shape. The comma gives it breathing room.",
        ifMissingTargetPiece:
          "Keep the sentence you had and let s'il vous plaît soften it.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-sayit-long-afternoon",
    type: "say-it-your-way",
    targetItemIds: ["chunk-faire-une-pause"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "The afternoon session has run long. Someone asks if you want to keep going.",
      communicativeGoal: "Ask for a break, politely.",
      suggestedPieces: [
        { text: "je voudrais", itemId: "chunk-je-voudrais" },
        { text: "faire une pause", itemId: "chunk-faire-une-pause" },
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait" },
      ],
      modelAnswer: "Je voudrais faire une pause, s'il vous plaît.",
      reveal: {
        modelAnswer: "Je voudrais faire une pause, s'il vous plaît.",
        naturalAlternatives: ["Je voudrais faire une pause."],
        explanation:
          "Both are natural. S'il vous plaît softens the ask; the shorter form works when the moment is already gentle.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s06b-insight-you-may-hear",
    type: "insight-card",
    payload: {
      insightType: "culture-bite",
      title: "Around the pause.",
      body:
        "A break has its own little soundtrack. You produce none of it yet. Recognize it, and the room will feel less foreign when it happens around you.",
      examples: [
        { fr: "On fait une pause ?", en: "Shall we take a break?" },
        { fr: "Cinq minutes.", en: "Five minutes." },
        { fr: "Un café ?", en: "Coffee? (the offer that follows)" },
        { fr: "Bonne idée.", en: "Good idea." },
        { fr: "Je reviens.", en: "I'll be right back." },
        { fr: "On continue ?", en: "Shall we keep going?" },
        { fr: "Encore une fois.", en: "One more time." },
        { fr: "C'est reparti.", en: "Here we go again." },
      ],
    },
  },
  {
    id: "s07-recap-pause",
    type: "recap",
    payload: {
      title: "You can ask for rest.",
      lines: [
        "You asked for a break, politely.",
        "Je voudrais carried an action for the first time, not just a thing.",
        "Faire une pause stayed one piece. The rest of faire can wait.",
      ],
      piecesUsed: ["je voudrais", "faire une pause", "une pause", "s'il vous plaît"],
      nextLabel: "Continue",
    },
  },
];

export const lesson009: Lesson = {
  id: "v1-lesson-009",
  version: "v1",
  number: 9,
  title: "Faire une pause",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "chunk-natural-speech",
  estimatedMinutes: 5,
  canDo: "Ask for a break, politely, in French.",
  whyItExists:
    "After movement (L7) and orientation (L8), the learner needs a way to talk about doing, and the L09 syllabus deliberately opens faire on ONE narrow, human sense: taking a pause. This compact pilot keeps that slice and nothing else: faire une pause as one active package, carried by the L1 je voudrais engine, softened by s'il vous plaît. The wider faire universe (weather, sport, idioms, the paradigm, je fais production) stays unopened, per the split-sense guardrail.",
  prerequisites: ["v1-lesson-008"],
  learningItems: getItems([
    "chunk-faire-une-pause",
    "noun-pause",
    "chunk-je-voudrais",
    "chunk-sil-vous-plait",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Aligned with docs/syllabus/L09-faire-small-actions-pause.lesson-spec.md pause slice: chunk-faire-une-pause active + noun-pause supported; the scene is rest after a long stretch, per the spec (cafe deliberately absent).",
    "je fais is NOT active-produced and does not appear: the spec holds je fais at supported (for je ne fais pas ca), which this compact pilot defers together with ca and on fait to a later pass.",
    "je voudrais + faire une pause is deliberate recombination of the owned L1 engine with the new action package: the spec's central production target (Je voudrais faire une pause).",
    "No faire paradigm, no weather/sport/idiom faire, no qu'est-ce que, no grammar table.",
    "Recycled load: chunk-je-voudrais and chunk-sil-vous-plait (L1); the new package stays the headline of every screen.",
    "Seen layer v0 (docs/SURFACE_DENSITY_METRIC_CLARIFICATION_2026_07.md): s06b is heard-French exposure only (On fait une pause ? stays heard-not-owned; on fait production remains deferred per the note above). Nothing in it is produced, chipped, required, registered, or counted in piecesUsed; TTS is synthesis-only.",
    "No XP / streak / level-up / mission copy. SayIt is deterministic model-answer-only.",
    "Registered in V1_LESSONS but NOT learner-visible (Home caps at L6).",
  ],
  qaChecks: [
    "TTS reads Je voudrais faire une pause, s'il vous plait cleanly.",
    "s03 trap reasons fire on vais and suis.",
    "s05 accepts the no-comma variant via acceptedAlternatives.",
    "Recap chips are packages/atoms only; the full sentence never appears as a chip.",
    "No cafe appears anywhere in L9.",
    "No streak/XP/mission language anywhere.",
  ],
};
