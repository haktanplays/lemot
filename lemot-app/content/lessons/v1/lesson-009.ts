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
    id: "s03-fill-faire-blank",
    type: "fill-with-traps",
    targetItemIds: ["chunk-faire-une-pause"],
    payload: {
      prompt: "You want to ask for a break. Which word carries the action?",
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
    // Reflection after the learner has already picked the action word out of
    // the frame, not a preamble before it.
    id: "s02-insight-voudrais-carries-actions",
    type: "insight-card",
    targetItemIds: ["chunk-faire-une-pause"],
    payload: {
      insightType: "grammar-nugget",
      title: "Same engine, a new job.",
      body:
        "Until now, je voudrais asked for a thing. It can also carry a small action: faire une pause. Take faire une pause as one piece. The wider faire universe waits.",
      examples: [
        { fr: "Je voudrais une pause.", en: "I'd like a break. (a thing)" },
        { fr: "Je voudrais faire une pause.", en: "I'd like to take a break. (an action)" },
      ],
    },
  },
  {
    id: "s04-weave-ask-for-a-break",
    type: "weave",
    targetItemIds: ["chunk-faire-une-pause", "chunk-je-voudrais"],
    payload: {
      // The scene carries the task; pieces stay behind the hint button.
      weaveType: "context",
      prompt: "Say you'd like to take a break.",
      context: "The afternoon has been long, and your head is getting heavy.",
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
      reveal: {
        modelAnswer: "Je voudrais faire une pause.",
        ifCorrect: "The same engine, carrying its first action.",
        ifCorrectButFlat: "Right. Rest, asked for calmly.",
        ifUnderstandableButWrong:
          "Your meaning lands. The action stays whole: faire une pause.",
        ifMissingTargetPiece:
          "Start with je voudrais. Then hand it the action: faire une pause.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    // Reveal straight after the first real ask: the same request, and the
    // shorter thing-shaped version beside it.
    id: "s09-reveal-first-ask",
    type: "natural-reveal",
    payload: {
      modelAnswer: "Je voudrais faire une pause.",
      naturalAlternatives: ["Je voudrais une pause."],
      explanation:
        "Both are natural. Faire une pause names the act of taking a break; une pause names the break itself. The engine in front does not change.",
    },
  },
  {
    // One small contrast before the polite ask: which owned piece softens a
    // request, and which ones close a moment instead.
    id: "s08-fill-softener",
    type: "fill-with-traps",
    targetItemIds: ["chunk-sil-vous-plait"],
    payload: {
      prompt: "You are asking for something, not thanking anyone. Which piece softens the ask?",
      sentenceBefore: "Je voudrais faire une pause, ",
      sentenceAfter: ".",
      blankCount: 1,
      options: [
        { id: "opt-svp", text: "s'il vous plaît", isCorrect: true },
        {
          id: "opt-merci-soft",
          text: "merci",
          isCorrect: false,
          trapReason:
            "Merci thanks someone after they help. It cannot soften the asking itself.",
        },
        {
          id: "opt-au-revoir-soft",
          text: "au revoir",
          isCorrect: false,
          trapReason:
            "Au revoir closes the moment. Here you are still in it, asking.",
        },
      ],
      answer: ["opt-svp"],
      reveal: {
        short: "s'il vous plaît",
        explanation:
          "S'il vous plaît softens a request. It costs nothing and changes the tone.",
        natural: "Je voudrais faire une pause, s'il vous plaît.",
      },
    },
  },
  {
    id: "s05-weave-break-politely",
    type: "weave",
    targetItemIds: ["chunk-faire-une-pause"],
    payload: {
      // Open: the directive prompt stands alone, no target line is shown, and
      // every piece is opt-in. This is the lesson's independence summit.
      weaveType: "open",
      prompt: "Ask for a break politely: say you'd like to take a pause, please.",
      context:
        "You're working through something together. It's a good moment to ask.",
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
        {
          text: "s'il vous plaît",
          itemId: "chunk-sil-vous-plait",
          label: "please",
        },
      ],
      hintCloze: "Je voudrais ___, s'il vous plaît.",
      expectedAnswers: ["Je voudrais faire une pause, s'il vous plaît."],
      acceptedAlternatives: ["Je voudrais faire une pause s'il vous plaît."],
      reveal: {
        modelAnswer: "Je voudrais faire une pause, s'il vous plaît.",
        ifCorrect: "Old politeness, new rest. The pieces keep working.",
        ifCorrectButFlat: "Right. The comma gives it breathing room.",
        ifUnderstandableButWrong:
          "Your meaning lands. The please comes last, after the ask.",
        ifMissingTargetPiece:
          "Keep the sentence you had and let s'il vous plaît soften it.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    // Reflection: names the reach the learner just gained, adds nothing new.
    id: "s10-insight-what-you-can-ask",
    type: "insight-card",
    targetItemIds: ["chunk-je-voudrais"],
    payload: {
      insightType: "culture-bite",
      title: "One engine, plenty to ask for.",
      body:
        "Je voudrais now carries a thing or an action, and s'il vous plaît softens either one. That is enough to ask for most small things politely, without knowing a single rule.",
      examples: [
        { fr: "Je voudrais un café.", en: "I'd like a coffee." },
        { fr: "Je voudrais faire une pause.", en: "I'd like to take a break." },
      ],
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
  estimatedMinutes: 7,
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
    "Progression: context then open. The lesson reaches genuine open production, one tier above L8's ceiling, and no weave carries constitutive support, so evidence class is unchanged.",
    "Rhythm deliberately differs from L7 and L8: fill before the insight, the reveal sits immediately after the first ask, and the contrast fill lands between the two weaves.",
    "Added screens carry one role each: s09 reveals the thing-versus-action pair after the first real ask, s08 contrasts which owned piece softens a request, s10 names the reach gained without adding material.",
    "je fais is NOT active-produced and does not appear: the spec holds je fais at supported (for je ne fais pas ca), which this compact pilot defers together with ca and on fait to a later pass.",
    "je voudrais + faire une pause is deliberate recombination of the owned L1 engine with the new action package: the spec's central production target (Je voudrais faire une pause).",
    "No faire paradigm, no weather/sport/idiom faire, no qu'est-ce que, no grammar table.",
    "Recycled load: chunk-je-voudrais and chunk-sil-vous-plait (L1); the new package stays the headline of every screen.",
    "No learner-facing lesson numbers, and the one-off cargo metaphor is retired.",
    "No XP / streak / level-up / mission copy. SayIt is deterministic model-answer-only.",
    "Registered in V1_LESSONS but NOT learner-visible (Home caps at L6).",
  ],
  qaChecks: [
    "TTS reads Je voudrais faire une pause, s'il vous plait cleanly.",
    "s03 trap reasons fire on vais and suis.",
    "s08 trap reasons fire on merci and au revoir.",
    "s05 accepts the no-comma variant via acceptedAlternatives.",
    "Recap chips are packages/atoms only; the full sentence never appears as a chip.",
    "No cafe appears anywhere in L9.",
    "No streak/XP/mission language anywhere.",
  ],
};
