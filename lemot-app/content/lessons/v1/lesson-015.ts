import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-obligation",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "What has to happen",
      body:
        "Today: two small ways to say something must happen.\n" +
        "By the end: you can say a break is needed, and what you have to do.\n" +
        "Main pieces: il faut, je dois.",
    },
  },
  {
    id: "s01-meet-il-faut",
    type: "meet-card",
    targetItemIds: ["chunk-il-faut", "chunk-faire-une-pause"],
    payload: {
      fr: "Il faut faire une pause.",
      en: "We need to take a break.",
      title: "Necessary, for everyone.",
      highlights: [
        { text: "il faut", itemId: "chunk-il-faut" },
        { text: "faire une pause", itemId: "chunk-faire-une-pause" },
      ],
      tts: true,
    },
  },
  {
    id: "s02-insight-must-two-ways",
    type: "insight-card",
    targetItemIds: ["chunk-il-faut", "chunk-je-dois"],
    payload: {
      insightType: "grammar-nugget",
      title: "Needed by all, or needed by you.",
      body:
        "Il faut says something is necessary, for no one in particular: il faut + the plain verb. Je dois says YOU have to: the je peux sibling, but for must. Faut only ever rides with il; for yourself, it's je dois. Both carry actions in dictionary shape, like je voudrais and je peux always have.",
      examples: [
        { fr: "Il faut faire une pause.", en: "A break is needed. (everyone / no one in particular)" },
        { fr: "Je dois aller à la maison.", en: "I have to go home. (you, personally)" },
      ],
    },
  },
  {
    id: "s03-fill-il-faut-blank",
    type: "fill-with-traps",
    targetItemIds: ["chunk-il-faut"],
    payload: {
      prompt:
        "The whole group has been at it too long. Say a break is needed, no one in particular. What fits?",
      sentenceBefore: "",
      sentenceAfter: " faire une pause.",
      blankCount: 1,
      options: [
        { id: "opt-il-faut", text: "Il faut", isCorrect: true },
        {
          id: "opt-il-faut-que",
          text: "Il faut que",
          isCorrect: false,
          trapReason:
            "Il faut que opens a bigger door, for later. For now: il faut + the plain verb.",
        },
        {
          id: "opt-je-peux",
          text: "Je peux",
          isCorrect: false,
          trapReason:
            "Je peux says you can. This moment needs must, not can.",
        },
      ],
      answer: ["opt-il-faut"],
      reveal: {
        short: "Il faut",
        explanation:
          "Il faut + the plain verb: necessary, for everyone at once.",
        natural: "Il faut faire une pause.",
      },
    },
  },
  {
    id: "s04-weave-a-break-is-needed",
    type: "weave",
    targetItemIds: ["chunk-il-faut", "chunk-faire-une-pause"],
    payload: {
      weaveType: "supported",
      prompt: "Say a break is needed.",
      context:
        "Nobody has stopped for two hours, and it shows on every face.",
      suggestedPieces: [
        {
          text: "il faut",
          itemId: "chunk-il-faut",
          required: true,
          label: "one must",
        },
        {
          text: "faire une pause",
          itemId: "chunk-faire-une-pause",
          required: true,
          label: "to take a break",
        },
      ],
      expectedAnswers: ["Il faut faire une pause."],
      reveal: {
        modelAnswer: "Il faut faire une pause.",
        ifCorrect:
          "Impersonal and calm: nobody is blamed, the break is simply necessary.",
        ifCorrectButFlat: "Right shape. Il faut carries the whole room.",
        ifUnderstandableButWrong:
          "Your meaning lands. The frame is: il faut + the plain verb.",
        ifMissingTargetPiece:
          "Start with il faut, then hand it the action: faire une pause.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-weave-i-have-to-go",
    type: "weave",
    targetItemIds: ["chunk-je-dois", "verb-aller"],
    payload: {
      weaveType: "supported",
      prompt: "Say you have to go home.",
      context:
        "The break question is settled, but your own evening has a deadline.",
      suggestedPieces: [
        {
          text: "je dois",
          itemId: "chunk-je-dois",
          required: true,
          label: "I have to",
        },
        { text: "aller", itemId: "verb-aller", required: true, label: "to go" },
        {
          text: "à la maison",
          itemId: "chunk-a-la-maison",
          required: true,
          label: "home",
        },
      ],
      expectedAnswers: ["Je dois aller à la maison."],
      reveal: {
        modelAnswer: "Je dois aller à la maison.",
        ifCorrect:
          "Personal obligation: je dois plus the action in dictionary shape, aller.",
        ifCorrectButFlat: "Right shape. Je vais says you're going; je dois says you have to.",
        ifUnderstandableButWrong:
          "Your meaning lands. After je dois, the action keeps its dictionary shape: aller.",
        ifMissingTargetPiece:
          "Start with je dois. Then the plain verb aller takes you home.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-sayit-tired-but-honest",
    type: "say-it-your-way",
    targetItemIds: ["chunk-il-faut", "chunk-je-dois"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "Late afternoon, after class. The group looks worn out, and your own evening is already spoken for.",
      communicativeGoal: "Say a break is needed, then say what you have to do.",
      suggestedPieces: [
        { text: "il faut", itemId: "chunk-il-faut" },
        { text: "faire une pause", itemId: "chunk-faire-une-pause" },
        { text: "je dois", itemId: "chunk-je-dois" },
        { text: "aller", itemId: "verb-aller" },
        { text: "à la maison", itemId: "chunk-a-la-maison" },
      ],
      modelAnswer: "Il faut faire une pause. Je dois aller à la maison.",
      reveal: {
        modelAnswer: "Il faut faire une pause. Je dois aller à la maison.",
        naturalAlternatives: ["Je dois faire une pause."],
        explanation:
          "Both work. Il faut makes the break everyone's business; je dois makes it yours alone. Same must, different reach.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s06b-insight-you-may-hear",
    type: "insight-card",
    payload: {
      insightType: "culture-bite",
      title: "Obligation, overheard.",
      body:
        "Must-language is everywhere at the end of a long day. You produce none of these yet. Hear how many ways French says the same tired truth.",
      examples: [
        { fr: "Je dois partir.", en: "I have to leave." },
        { fr: "On doit finir.", en: "We have to finish." },
        { fr: "Il faut manger !", en: "You have to eat." },
        { fr: "C'est obligé.", en: "It's a must." },
        { fr: "Pas le choix.", en: "No choice." },
        { fr: "Il est temps.", en: "It's time." },
        { fr: "Encore cinq minutes.", en: "Five more minutes." },
      ],
    },
  },
  {
    id: "s07-recap-obligation",
    type: "recap",
    payload: {
      title: "You can say what must happen.",
      lines: [
        "You made a break necessary without blaming anyone: il faut.",
        "You named your own obligation: je dois, the je peux sibling.",
        "Both carried plain-shape verbs, the way your engines always have.",
      ],
      piecesUsed: ["il faut", "je dois", "faire une pause", "aller", "à la maison"],
      nextLabel: "Continue",
    },
  },
];

export const lesson015: Lesson = {
  id: "v1-lesson-015",
  version: "v1",
  number: 15,
  title: "Il faut",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "architecture-verb",
  secondaryArchetype: "chunk-natural-speech",
  estimatedMinutes: 5,
  canDo: "Say what one must do (il faut) and what you have to do (je dois).",
  whyItExists:
    "Per the L15 compact spec (gate Option B, asymmetric), this is the obligation doorway, not the devoir lesson: il faut + infinitive primary (impersonal, invariable, zero paradigm) and je dois + infinitive supported (one person-form, the je peux parallel), both over owned actions. The full devoir paradigm, il faut que + subjunctive, the conditionnel advice register (devrais / faudrait), il faut + noun / il me faut, devoir as owe, and y+devoir chains are all deliberately deferred. This is the fourth split-sense doorway, after aller (L7), faire (L9) and pouvoir (L11).",
  prerequisites: ["v1-lesson-014"],
  learningItems: getItems([
    "chunk-il-faut",
    "chunk-je-dois",
    "verb-aller",
    "chunk-faire-une-pause",
    "chunk-a-la-maison",
    "chunk-je-peux",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Aligned with docs/syllabus/L15-devoir-falloir-light-obligation.compact-spec.md: chunk-il-faut active (invariable), chunk-je-dois supported (one form), owned infinitives only; the impersonal/personal and can/must contrasts stay one-line feels, never a lecture.",
    "The owned infinitive set is de-scoped to the shipped registry: faire une pause plus the new verb-aller (dictionary-shape to go, the verb-aider precedent); the spec's faire ca and repeter are not in the shipped registry and are dropped.",
    "verb-aller is supported and rides only behind il faut / je dois here; chunk-je-vais remains the moving engine, and the insight keeps the two apart.",
    "Il faut que appears ONLY as the s03 fill trap (the spec's number-one leak, blocked); je devrais / il faudrait / tu dois / on doit / il me faut / devoir-as-owe appear nowhere.",
    "Il faut m'aider is deliberately avoided per spec section 2: m' stays frozen inside vous pouvez m'aider and is not re-anchored after il faut.",
    "No y+devoir chain (je dois y aller) anywhere: L14's y and L15's devoir stay unstacked, per both specs.",
    "Seen layer v0 (docs/SURFACE_DENSITY_METRIC_CLARIFICATION_2026_07.md): s06b is heard-French exposure only (the obligation family: partir heard, on doit heard-not-owned, no y anywhere per the qaChecks, no il faut que). Nothing in it is produced, chipped, required, registered, or counted in piecesUsed; TTS is synthesis-only.",
    "je faut / il dois form-mixing is guarded in the s02 insight copy (faut only ever rides with il; for yourself, je dois).",
    "No XP / streak / level-up / mission copy. SayIt is deterministic model-answer-only.",
    "Registered in V1_LESSONS but NOT learner-visible (Home caps at L6).",
  ],
  qaChecks: [
    "TTS reads Il faut faire une pause. and Je dois aller à la maison. cleanly.",
    "s03 trap reasons fire on Il faut que and Je peux.",
    "Recap chips are atoms/frames only; il faut and je dois pass as two-token engine chips.",
    "il faut que never appears outside the s03 trap; devrais/faudrait/tu dois/on doit never appear.",
    "No y appears anywhere in L15 learner-facing copy (no je dois y aller).",
    "No streak/XP/mission language anywhere.",
  ],
};
