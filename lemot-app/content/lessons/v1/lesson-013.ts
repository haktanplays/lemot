import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-can-do-asking",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Can-do, asked out loud",
      body:
        "Today: nothing new.\n" +
        "By the end: you'll have chained asking (est-ce que) and can-do (je peux) into one real after-class moment.\n" +
        "Main pieces: est-ce que, je peux, vous pouvez, m'aider.",
    },
  },
  {
    id: "s01-insight-two-engines-one-scene",
    type: "insight-card",
    targetItemIds: ["chunk-est-ce-que", "chunk-je-peux"],
    payload: {
      insightType: "grammar-nugget",
      title: "Two engines, one scene.",
      body:
        "L11 gave you can-do: je peux, vous pouvez. L12 gave you the question wrapper: est-ce que. Today they work together: wrap a can-do sentence and you're asking for what you need.",
      examples: [
        { fr: "Je peux faire une pause.", en: "I can take a break. (statement)" },
        {
          fr: "Est-ce que je peux faire une pause ?",
          en: "Can I take a break? (wrapped)",
        },
      ],
    },
  },
  {
    id: "s02-weave-ask-permission-again",
    type: "weave",
    targetItemIds: ["chunk-est-ce-que", "chunk-je-peux"],
    payload: {
      weaveType: "supported",
      prompt: "Ask clearly if you can take a break.",
      context:
        "After class. The review session keeps going, and your head is full.",
      suggestedPieces: [
        {
          text: "est-ce que",
          itemId: "chunk-est-ce-que",
          required: true,
          label: "question wrapper",
        },
        { text: "je peux", itemId: "chunk-je-peux", required: true, label: "I can" },
        {
          text: "faire une pause",
          itemId: "chunk-faire-une-pause",
          required: true,
          label: "to take a break",
        },
      ],
      expectedAnswers: ["Est-ce que je peux faire une pause ?"],
      acceptedAlternatives: ["Est-ce que je peux faire une pause"],
      reveal: {
        modelAnswer: "Est-ce que je peux faire une pause ?",
        ifCorrect:
          "Yesterday's pieces, back when you actually need them.",
        ifCorrectButFlat: "Right shape. The wrapper marks the question for you.",
        ifMissingTargetPiece:
          "Keep je peux faire une pause whole, and put est-ce que in front.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s03-fill-yes-no-vs-where",
    type: "fill-with-traps",
    targetItemIds: ["chunk-est-ce-que", "chunk-c-est"],
    payload: {
      prompt: "You want a yes or a no: is it here? What fits the empty space?",
      sentenceBefore: "Est-ce que c'est ",
      sentenceAfter: " ?",
      blankCount: 1,
      options: [
        { id: "opt-ici", text: "ici", isCorrect: true },
        {
          id: "opt-ou",
          text: "où",
          isCorrect: false,
          trapReason:
            "Où asks where, and est-ce que wraps a yes/no statement. The two don't stack; pick one way to ask.",
        },
        {
          id: "opt-oui",
          text: "oui",
          isCorrect: false,
          trapReason: "Oui is the answer you're hoping for. It can't sit inside the question.",
        },
      ],
      answer: ["opt-ici"],
      reveal: {
        short: "ici",
        explanation:
          "Est-ce que wraps a whole statement: c'est ici. For where-questions, you already own C'est où ?",
        natural: "Est-ce que c'est ici ?",
      },
    },
  },
  {
    id: "s04-weave-ask-for-help-politely",
    type: "weave",
    targetItemIds: ["chunk-est-ce-que", "chunk-vous-pouvez", "chunk-m-aider"],
    payload: {
      weaveType: "supported",
      prompt: "Ask for help, clearly and politely.",
      context:
        "The exercise sheet in front of you refuses to make sense. Someone who knows is nearby.",
      suggestedPieces: [
        {
          text: "est-ce que",
          itemId: "chunk-est-ce-que",
          required: true,
          label: "question wrapper",
        },
        {
          text: "vous pouvez",
          itemId: "chunk-vous-pouvez",
          required: true,
          label: "you can",
        },
        {
          text: "m'aider",
          itemId: "chunk-m-aider",
          required: true,
          label: "to help me",
        },
        {
          text: "s'il vous plaît",
          itemId: "chunk-sil-vous-plait",
          label: "please",
        },
      ],
      expectedAnswers: ["Est-ce que vous pouvez m'aider, s'il vous plaît ?"],
      acceptedAlternatives: [
        "Est-ce que vous pouvez m'aider, s'il vous plaît",
        "Est-ce que vous pouvez m'aider ?",
      ],
      reveal: {
        modelAnswer: "Est-ce que vous pouvez m'aider, s'il vous plaît ?",
        ifCorrect:
          "The full ask: wrapper, request, politeness. Four small pieces doing serious work.",
        ifCorrectButFlat: "Right shape. S'il vous plaît softens the whole line.",
        ifMissingTargetPiece:
          "Start with est-ce que, build the request with vous pouvez + m'aider, and let s'il vous plaît land it.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-weave-cant-and-going",
    type: "weave",
    targetItemIds: ["chunk-je-peux", "grammar-ne-pas-sandwich", "chunk-je-vais"],
    weakPointTags: ["negation", "ne-pas"],
    payload: {
      weaveType: "supported",
      prompt: "Say you can't, and that you're going home.",
      context:
        "They ask if you can stay for one more round. You're done for today.",
      suggestedPieces: [
        { text: "je peux", itemId: "chunk-je-peux", required: true, label: "I can" },
        {
          text: "ne ___ pas",
          itemId: "grammar-ne-pas-sandwich",
          required: true,
          label: "not (the sandwich)",
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
      acceptedAlternatives: [
        "Je ne peux pas, je vais à la maison.",
        "Je ne peux pas.",
      ],
      reveal: {
        modelAnswer: "Je ne peux pas. Je vais à la maison.",
        ifCorrect: "A calm no and the reason. Two lessons, one honest exit.",
        ifCorrectButFlat: "Two short sentences. Complete and kind.",
        ifMissingTargetPiece:
          "Wrap je peux in the sandwich first: ne before peux, pas after. Then je vais à la maison explains why.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-meet-preview-j-y-vais",
    type: "meet-card",
    targetItemIds: ["chunk-j-y-vais", "word-y-place"],
    payload: {
      fr: "J'y vais.",
      en: "I'm off. (I'm going there.)",
      title: "Just listen. This one arrives next.",
      highlights: [{ text: "y", itemId: "word-y-place" }],
      tts: true,
    },
  },
  {
    id: "s07-sayit-after-class",
    type: "say-it-your-way",
    targetItemIds: ["chunk-est-ce-que", "chunk-je-peux"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "After class, the group wants to keep working. You need a break before anything else.",
      communicativeGoal: "Ask clearly and politely if you can take a break.",
      suggestedPieces: [
        { text: "est-ce que", itemId: "chunk-est-ce-que" },
        { text: "je peux", itemId: "chunk-je-peux" },
        { text: "faire une pause", itemId: "chunk-faire-une-pause" },
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait" },
      ],
      modelAnswer: "Est-ce que je peux faire une pause, s'il vous plaît ?",
      reveal: {
        modelAnswer: "Est-ce que je peux faire une pause, s'il vous plaît ?",
        naturalAlternatives: ["Je peux faire une pause ?"],
        explanation:
          "Both are natural. The wrapper marks the question clearly; the rising voice stays the everyday quick way.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s08-recap-can-do-asking",
    type: "recap",
    payload: {
      title: "You can ask for what you need.",
      lines: [
        "You asked for a break and for help, clearly and politely.",
        "You said no calmly and explained why, all from owned pieces.",
        "Next: one tiny word for a place you already named.",
      ],
      piecesUsed: [
        "est-ce que",
        "je peux",
        "vous pouvez",
        "m'aider",
        "ne ___ pas",
        "faire une pause",
        "je vais",
        "à la maison",
        "s'il vous plaît",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson013: Lesson = {
  id: "v1-lesson-013",
  version: "v1",
  number: 13,
  title: "Can-do, asked",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "review-integration",
  secondaryArchetype: "chunk-natural-speech",
  estimatedMinutes: 5,
  canDo:
    "Ask for help and permission, say what you can't do, and exit a moment, in one natural after-class flow.",
  whyItExists:
    "Per the L13 compact spec, L11 (pouvoir) + L12 (est-ce que) are two consecutive new-engine lessons, so L13 is the consolidation beat the integration rhythm rule requires: zero new systems, zero new lexis, one after-class scene that chains can-do with asking. It also plants the L14 seed exactly the way L10 seeded L11: J'y vais. appears once, recognition-only, never produced.",
  prerequisites: ["v1-lesson-012"],
  learningItems: getItems([
    "chunk-est-ce-que",
    "chunk-je-peux",
    "chunk-vous-pouvez",
    "chunk-m-aider",
    "chunk-faire-une-pause",
    "grammar-ne-pas-sandwich",
    "chunk-je-vais",
    "chunk-a-la-maison",
    "chunk-c-est",
    "chunk-sil-vous-plait",
    "chunk-j-y-vais",
    "word-y-place",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Aligned with docs/syllabus/L13-can-do-asking-integration.compact-spec.md: review-integration archetype, 0 new lexis, recombines L11+L12 with L7-L12 material; the only new surface is the recognition-only L14 hook.",
    "De-scopes vs spec (items not in the shipped house registry): je suis fatigue, faire ca, j'ai besoin d'aide, repeter, c'est pas grave, and the tu vas frames are dropped; the owned recombination set carries the scene instead.",
    "s03 implements the spec's est-ce que over-stacking watch item inside owned material: ou is the trap (question word + wrapper don't stack), oui stays passive/trap only.",
    "s05 composes the negative from je peux + the owned ne...pas frame per the PR #168 canon: je ne peux pas appears only as composed expected/model copy, never as a chip.",
    "Intonation question forms appear ONLY as sayit reveal comparison copy (L13 spec section 9 keeps them valid at meaning level); the two weaves make est-ce que a required piece, so their validation accepts wrapper forms only, consistent with L12's wrapper-target stance.",
    "L14 seed: chunk-j-y-vais + word-y-place appear ONLY in the s06 recognition meet-card (registry status is static; their L13 use is recognition-only by lesson design). Never produced, never suggested pieces elsewhere, never recap chips.",
    "No XP / streak / level-up / mission copy. SayIt is deterministic model-answer-only.",
    "Registered in V1_LESSONS but NOT learner-visible (Home caps at L6).",
  ],
  qaChecks: [
    "TTS reads J'y vais. cleanly on the preview card.",
    "s03 trap reasons fire on ou and oui.",
    "s02, s04 and s05 accept their alternatives (no-question-mark and comma variants).",
    "Recap chips are atoms/frames only; no full sentence, question, or negative clause appears as a chip.",
    "j'y vais never appears as a production target, suggested piece, or recap chip.",
    "No streak/XP/mission language anywhere.",
  ],
};
