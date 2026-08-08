/**
 * L16 - A small moment. The first lesson produced through Content Factory V0.
 *
 * Its contract was pre-flighted (CF-001..CF-005, generation-ready) and the
 * candidate cleared every deterministic validator (AD, JR, journey-role budget,
 * PR-06 evidence, canon V3/V4/V5, PQ-2/PQ-3 and the drift review) before a line
 * of it was copied here. Naturalness and communicative coherence were reviewed
 * separately; no validator claims them.
 */
import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-small-moment",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "A small moment",
      body:
        "Today: nothing new.\n" +
        "By the end: you'll read a short French moment, show you understood it, and answer it in one line.\n" +
        "Every word in it is already yours.",
    },
  },
  {
    id: "s01-meet-small-moment-read",
    type: "meet-card",
    targetItemIds: [
      "chunk-il-faut",
      "chunk-faire-une-pause",
      "chunk-je-vais",
      "chunk-a-la-maison",
      "chunk-on-y-va",
    ],
    payload: {
      fr: "Il faut faire une pause. Je vais à la maison. On y va ?",
      en: "We need to take a break. I'm going home. Shall we go?",
      title: "Read it once. Slowly.",
      highlights: [
        { text: "il faut", itemId: "chunk-il-faut" },
        { text: "à la maison", itemId: "chunk-a-la-maison" },
        { text: "on y va", itemId: "chunk-on-y-va" },
      ],
      tts: true,
    },
  },
  {
    id: "s02-fill-what-must-happen",
    type: "fill-with-traps",
    targetItemIds: ["chunk-il-faut", "chunk-faire-une-pause"],
    evidenceTargetItemIds: ["chunk-faire-une-pause"],
    payload: {
      prompt: "In the moment you just read, what has to happen first?",
      sentenceBefore: "Il faut ",
      sentenceAfter: ".",
      blankCount: 1,
      options: [
        { id: "opt-pause", text: "faire une pause", isCorrect: true },
        {
          id: "opt-maison",
          text: "aller à la maison",
          isCorrect: false,
          trapReason:
            "Home comes after. The moment says the break first, then the walk home.",
        },
        {
          id: "opt-y-aller",
          text: "y aller",
          isCorrect: false,
          trapReason:
            "Il faut y aller stacks y onto an obligation, and that chain isn't open yet. Keep y inside on y va for now.",
        },
      ],
      answer: ["opt-pause"],
      reveal: {
        short: "faire une pause",
        explanation:
          "Il faut says what has to happen, without naming who. The break is the first thing.",
        natural: "Il faut faire une pause.",
      },
    },
  },
  {
    id: "s03-weave-answer-the-moment",
    type: "weave",
    targetItemIds: ["chunk-je-dois", "chunk-faire-une-pause"],
    payload: {
      weaveType: "supported",
      prompt: "You're in that moment too. Say what you have to do.",
      context: "Someone has just said a break is needed, and that they're heading home.",
      suggestedPieces: [
        { text: "je dois", itemId: "chunk-je-dois", required: true, label: "I have to" },
        {
          text: "faire une pause",
          itemId: "chunk-faire-une-pause",
          required: true,
          label: "to take a break",
        },
      ],
      expectedAnswers: ["Je dois faire une pause."],
      acceptedAlternatives: [
        "Je dois faire une pause",
        "Il faut faire une pause.",
        "Il faut faire une pause",
      ],
      reveal: {
        modelAnswer: "Je dois faire une pause.",
        ifCorrect: "You read a moment and answered it. One line was enough.",
        ifCorrectButFlat: "Right shape. Je dois makes it yours instead of everyone's.",
        ifMissingTargetPiece:
          "Start with je dois, then the break itself: faire une pause.",
        naturalAlternatives: ["Il faut faire une pause."],
        explanation:
          "Il faut is the moment's own line, nobody in particular. Je dois puts you in it.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s04-weave-ask-for-the-break",
    type: "weave",
    targetItemIds: ["chunk-est-ce-que", "chunk-je-peux", "chunk-faire-une-pause"],
    payload: {
      weaveType: "mid",
      prompt: "Ask, clearly, whether you can take that break.",
      context: "The room hasn't emptied yet. You'd rather check than just leave.",
      suggestedPieces: [
        {
          text: "est-ce que",
          itemId: "chunk-est-ce-que",
          required: true,
          label: "question wrapper",
        },
      ],
      expectedAnswers: ["Est-ce que je peux faire une pause ?"],
      acceptedAlternatives: [
        "Est-ce que je peux faire une pause",
        "Je peux faire une pause ?",
      ],
      reveal: {
        modelAnswer: "Est-ce que je peux faire une pause ?",
        ifCorrect: "The wrapper does the asking, so your voice doesn't have to.",
        ifCorrectButFlat: "Right shape. Est-ce que marks the question before you even finish it.",
        ifMissingTargetPiece:
          "Put est-ce que in front, then keep je peux faire une pause whole behind it.",
        naturalAlternatives: ["Je peux faire une pause ?"],
        explanation:
          "Both are real French. The wrapper is the clear one; the rising voice is the quick one.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-weave-break-then-home",
    type: "weave",
    targetItemIds: [
      "chunk-il-faut",
      "chunk-faire-une-pause",
      "chunk-je-vais",
      "chunk-a-la-maison",
    ],
    payload: {
      weaveType: "context",
      prompt: "Say what has to happen, and where you're going, in one breath.",
      context: "You've decided. The break first, then home.",
      expectedAnswers: ["Il faut faire une pause, je vais à la maison."],
      acceptedAlternatives: [
        "Il faut faire une pause, je vais à la maison",
        "Il faut faire une pause. Je vais à la maison.",
        "Je dois faire une pause, je vais à la maison.",
      ],
      reveal: {
        modelAnswer: "Il faut faire une pause, je vais à la maison.",
        ifCorrect: "Two engines, one breath. That's the whole skill of today.",
        ifCorrectButFlat: "Complete. A comma is enough to hold the two halves together.",
        ifWrongStructure:
          "Build each half on its own first: Il faut faire une pause, then Je vais à la maison. Then set them side by side.",
        naturalAlternatives: ["Il faut faire une pause. Je vais à la maison."],
        explanation:
          "One long line or two short ones. French is happy either way here.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-natural-reveal-obligation-not-advice",
    type: "natural-reveal",
    targetItemIds: ["chunk-il-faut", "chunk-je-dois", "chunk-on-y-va"],
    payload: {
      explanation:
        "Il faut and je dois say what has to happen. They don't tell anyone what they ought to do. That's a different French, and it isn't yours yet.\n" +
        "On y va ? isn't asking where. It's an invitation: shall we? The place was already named a line earlier, and y is standing in for it.\n" +
        "A small moment only ever asks for one short answer. It isn't a conversation, and nobody is marking it.",
      naturalAlternatives: [
        "Il faut faire une pause.",
        "Je dois faire une pause.",
        "Je vais à la maison.",
      ],
    },
  },
  {
    id: "s07-sayit-run-the-moment",
    type: "say-it-your-way",
    targetItemIds: [
      "chunk-il-faut",
      "chunk-faire-une-pause",
      "chunk-je-vais",
      "chunk-a-la-maison",
    ],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "Class is over and the group is drifting towards the door. Someone turns and asks you: On y va ?",
      communicativeGoal:
        "Answer the moment: say what has to happen first, and where you're going.",
      modelAnswer: "Il faut faire une pause. Je vais à la maison.",
      reveal: {
        modelAnswer: "Il faut faire une pause. Je vais à la maison.",
        naturalAlternatives: ["Je dois faire une pause, je vais à la maison."],
        explanation:
          "You answered an invitation without saying yes or no, and nobody would find that odd, because you said what's happening instead. That's a real reply.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s08-recap-small-moment",
    type: "recap",
    payload: {
      title: "You can read a small moment, and answer it.",
      lines: [
        "You read three lines of French and understood them without help.",
        "You answered with one short line, then asked for what you needed.",
        "You put an obligation and a destination side by side in one breath.",
      ],
      piecesUsed: [
        "il faut",
        "je dois",
        "faire une pause",
        "je vais",
        "à la maison",
        "est-ce que",
        "je peux",
        "y",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson016: Lesson = {
  id: "v1-lesson-016",
  version: "v1",
  number: 16,
  title: "A small moment",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "review-integration",
  secondaryArchetype: "chunk-natural-speech",
  journeyRole: "integration",
  acquisitionDemandItemIds: [],
  estimatedMinutes: 5,
  canDo:
    "Read a small human situation in French, understand it, and answer it in one short line, recombining obligation, movement and asking.",
  whyItExists:
    "L14 (place-y) and L15 (obligation-light) are two consecutive new-engine lessons, so the integration rhythm rule requires a consolidation beat. L13 was already pure integration three lessons earlier, so L16 differentiates without adding grammar: the A Small Moment seed, a model-answer-only, present-only, known-items-only three-line reading plus one short scaffolded response. Zero new grammar systems, zero new architecture verbs, zero new lexis.",
  prerequisites: ["v1-lesson-015"],
  learningItems: getItems([
    "chunk-il-faut",
    "chunk-faire-une-pause",
    "chunk-je-vais",
    "chunk-a-la-maison",
    "chunk-on-y-va",
    "word-y-place",
    "chunk-est-ce-que",
    "chunk-je-peux",
    "chunk-je-dois",
    "verb-aller",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Canonical reading per docs/syllabus/L16-integration-small-moment-seed.compact-spec.md: Il faut faire une pause. / Je vais à la maison. / On y va ? No fatigue identity exists and L16 did not mint one to rescue its superseded reading; no alternative reading was generated. Whether fatigue becomes canonical later is an open L17 question, untouched here.",
    "Line 2 names the place, which is what licenses y in line 3. The antecedent is never stranded.",
    "Support falls across the lesson by design: s03 supported (both pieces given), s04 mid (only the wrapper given), s05 context (no pieces), s07 open production (no pieces, no wrapper). Four meaningful production actions, ranks 4/3/2/0.",
    "s02 is the comprehension interaction, not production: a supplied-option choice is recognition, and it is not counted as production anywhere.",
    "s02 opt-y-aller doubles as the y+modal-chain guard; opt-maison guards the order of the moment rather than the grammar.",
    "No forward lexical preview. The fatigue-carried L17 feelings hook was retired and deliberately not replaced with an L18 futur preview; the small moment itself is the semantic preparation for L17.",
    "The spec's repair beat (je ne comprends pas / vous pouvez repeter / c'est pas grave) is deliberately absent: the first two ids exist in the registry as PR-07 L1-pilot registrations that no shipped lesson works, and the third has no identity. An integration lesson must not be the first place material is taught. L10 and L13 de-scoped the same material for the same reason.",
    "The L11 help capability is a different case and stays legitimately recyclable: chunk-vous-pouvez and chunk-m-aider ARE worked at L11. L16 recombines the pouvoir engine through je peux rather than repeating L13's vous pouvez m'aider weave.",
    "No AI, no chat, no mission. Say It Your Way is deterministic model-answer-only.",
    "No XP / streak / level / score / reward language.",
    "Registered in V1_LESSONS but NOT learner-visible (Home caps at L6).",
  ],
  qaChecks: [
    "TTS reads the three reading lines cleanly, French only, no placeholders or ids.",
    "s02 trap reasons fire on aller a la maison and y aller.",
    "s03, s04 and s05 accept their alternatives (no-question-mark, comma and two-sentence variants).",
    "Recap chips are atoms/frames only; no full sentence or question appears as a chip.",
    "No line in the lesson uses fatigue, a connector, a past or future form, an object pronoun, or y with a modal.",
    "No streak / XP / mission language anywhere.",
  ],
};
