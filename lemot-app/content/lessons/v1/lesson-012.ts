import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-est-ce-que",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "The question wrapper",
      body:
        "Today: one small frame, est-ce que.\n" +
        "By the end: you can turn any sentence you own into a clear question.\n" +
        "Main pieces: est-ce que, plus everything you already have.",
    },
  },
  {
    id: "s01-meet-est-ce-que",
    type: "meet-card",
    targetItemIds: ["chunk-est-ce-que", "chunk-je-peux"],
    payload: {
      fr: "Est-ce que je peux faire une pause ?",
      en: "Can I take a break?",
      title: "Yesterday's question, dressed up.",
      highlights: [
        { text: "est-ce que", itemId: "chunk-est-ce-que" },
        { text: "je peux", itemId: "chunk-je-peux" },
      ],
      tts: true,
    },
  },
  {
    id: "s02-insight-wrapper",
    type: "insight-card",
    targetItemIds: ["chunk-est-ce-que"],
    payload: {
      insightType: "grammar-nugget",
      title: "Wrap it, don't rebuild it.",
      body:
        "Est-ce que is a wrapper. Put it in front of a sentence you own and it becomes a yes/no question. Nothing inside the sentence changes: no new word order, no new forms. In L11 your voice did the asking. The wrapper asks the same thing, just more clearly marked.",
      examples: [
        { fr: "C'est ici. / Est-ce que c'est ici ?", en: "It's here. / Is it here?" },
        {
          fr: "Je peux faire une pause ? / Est-ce que je peux faire une pause ?",
          en: "Can I take a break? (both ways work)",
        },
      ],
    },
  },
  {
    id: "s03-fill-wrapper-blank",
    type: "fill-with-traps",
    targetItemIds: ["chunk-est-ce-que"],
    payload: {
      prompt: "You want a yes or a no: is it here? What fits the empty space?",
      sentenceBefore: "",
      sentenceAfter: " c'est ici ?",
      blankCount: 1,
      options: [
        { id: "opt-est-ce-que", text: "Est-ce que", isCorrect: true },
        {
          id: "opt-qu-est-ce-que",
          text: "Qu'est-ce que",
          isCorrect: false,
          trapReason:
            "Qu'est-ce que asks what. For a yes/no question, the wrapper is est-ce que.",
        },
        {
          id: "opt-ou",
          text: "Où",
          isCorrect: false,
          trapReason:
            "Où asks where. This question just wants a yes or a no.",
        },
      ],
      answer: ["opt-est-ce-que"],
      reveal: {
        short: "Est-ce que",
        explanation:
          "Est-ce que in front, the owned sentence unchanged behind it.",
        natural: "Est-ce que c'est ici ?",
      },
    },
  },
  {
    id: "s04-weave-wrap-c-est-ici",
    type: "weave",
    targetItemIds: ["chunk-est-ce-que", "chunk-c-est"],
    payload: {
      weaveType: "supported",
      prompt: "Ask clearly: is it here?",
      context:
        "You think this is the right door, but you want to be sure before you knock.",
      suggestedPieces: [
        {
          text: "est-ce que",
          itemId: "chunk-est-ce-que",
          required: true,
          label: "question wrapper",
        },
        { text: "c'est", itemId: "chunk-c-est", required: true, label: "it is" },
        { text: "ici", required: true, label: "here" },
      ],
      expectedAnswers: ["Est-ce que c'est ici ?"],
      acceptedAlternatives: ["Est-ce que c'est ici", "C'est ici ?"],
      reveal: {
        modelAnswer: "Est-ce que c'est ici ?",
        ifCorrect: "The wrapper in front, your L8 sentence untouched behind it.",
        ifCorrectButFlat: "Right shape. The wrapper marks the question for you.",
        ifUnderstandableButWrong:
          "Your meaning lands. The wrapper goes first: Est-ce que c'est ici ?",
        ifMissingTargetPiece:
          "Start with est-ce que. Then say the sentence exactly as you own it.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-weave-wrap-je-peux",
    type: "weave",
    targetItemIds: ["chunk-est-ce-que", "chunk-je-peux"],
    payload: {
      weaveType: "supported",
      prompt: "Ask if you can take a break, using the wrapper.",
      context:
        "A more formal room than yesterday. You want the question clearly marked.",
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
      acceptedAlternatives: [
        "Est-ce que je peux faire une pause",
        "Je peux faire une pause ?",
      ],
      reveal: {
        modelAnswer: "Est-ce que je peux faire une pause ?",
        ifCorrect: "L11's question, graduated. Both ways are yours now.",
        ifCorrectButFlat:
          "Right shape. Rising voice or wrapper: French accepts both.",
        ifMissingTargetPiece:
          "Keep je peux faire une pause whole, and put est-ce que in front.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-sayit-formal-ask",
    type: "say-it-your-way",
    targetItemIds: ["chunk-est-ce-que"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "A long formal session. There's a natural pause, and the person leading it looks your way.",
      communicativeGoal: "Ask clearly if you can take a break.",
      suggestedPieces: [
        { text: "est-ce que", itemId: "chunk-est-ce-que" },
        { text: "je peux", itemId: "chunk-je-peux" },
        { text: "faire une pause", itemId: "chunk-faire-une-pause" },
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait" },
      ],
      modelAnswer: "Est-ce que je peux faire une pause, s'il vous plaît ?",
      reveal: {
        modelAnswer: "Est-ce que je peux faire une pause, s'il vous plaît ?",
        naturalAlternatives: ["Est-ce que je peux faire une pause ?", "Je peux faire une pause ?"],
        explanation:
          "All three are natural. The wrapper marks the question clearly; the rising voice from L11 still works everywhere.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s07-recap-wrapper",
    type: "recap",
    payload: {
      title: "You can ask two ways.",
      lines: [
        "You wrapped sentences you own and got clear yes/no questions.",
        "Nothing inside the sentence changed. The wrapper did all the work.",
        "Rising voice or est-ce que: both are yours now.",
      ],
      piecesUsed: ["est-ce que", "je peux", "c'est", "ici", "faire une pause"],
      nextLabel: "Continue",
    },
  },
];

export const lesson012: Lesson = {
  id: "v1-lesson-012",
  version: "v1",
  number: 12,
  title: "Est-ce que",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "chunk-natural-speech",
  estimatedMinutes: 5,
  canDo: "Turn a sentence you own into a clear yes/no question with est-ce que.",
  whyItExists:
    "Per the L12 est-ce que compact spec, this lesson teaches exactly one frame: est-ce que + owned clause = yes/no question. It graduates L11's recognition-level Est-ce que je peux ... ? to owned production, and wraps only sentences the learner already produces (c'est ici, je peux faire une pause). No question words, no inversion, no qu'est-ce que (trap only): the wrapper is the whole lesson, so questions stop depending on intonation alone.",
  prerequisites: ["v1-lesson-011"],
  learningItems: getItems([
    "chunk-est-ce-que",
    "chunk-je-peux",
    "chunk-c-est",
    "chunk-faire-une-pause",
    "chunk-sil-vous-plait",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Aligned with docs/syllabus/L12-est-ce-que-question-wrapper.compact-spec.md: the frame est-ce que + clause is the only new material; both wrapped clauses are already-owned productions (L8 c'est ici, L11 je peux faire une pause).",
    "Spec traps honored: qu-est-ce-que-overload (Qu'est-ce que appears ONLY as a fill trap, never taught) and inversion-too-early (no inversion anywhere).",
    "L11 bridge closed: est-ce que je peux ... ? moves from recognition to owned, and the rising-voice way stays explicitly valid (acceptedAlternatives + sayit alternatives), so the wrapper adds an option instead of replacing one.",
    "chunk-est-ce-que is a frame chunk: learners take it whole; no decomposition into est / ce / que.",
    "Question-form weave answers carry no-question-mark acceptedAlternatives (CI rule).",
    "No XP / streak / level-up / mission copy. SayIt is deterministic model-answer-only.",
    "Registered in V1_LESSONS but NOT learner-visible (Home caps at L6).",
  ],
  qaChecks: [
    "TTS reads Est-ce que je peux faire une pause ? with a natural question contour.",
    "s03 trap reasons fire on Qu'est-ce que and Ou.",
    "s04 and s05 accept no-question-mark variants via acceptedAlternatives.",
    "Recap chips are atoms/frames only; est-ce que passes as a frame chip.",
    "Qu'est-ce que never appears outside the s03 trap.",
    "No inversion form appears anywhere.",
  ],
};
