import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-survival-kit",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Your survival kit",
      body:
        "Today: greet someone, ask politely, thank, and rescue yourself when French moves too fast.\n" +
        "By the end: you can carry a first small exchange in French.\n" +
        "Main pieces: bonjour, je voudrais, merci, and a small rescue kit.",
    },
  },
  {
    id: "s00-meet-bonjour",
    type: "meet-card",
    targetItemIds: ["chunk-bonjour"],
    payload: {
      fr: "Bonjour.",
      en: "Hello.",
      title: "Your first French door.",
      highlights: [{ text: "Bonjour", itemId: "chunk-bonjour" }],
      tts: true,
    },
  },
  {
    id: "s01-insight-survival-kit",
    type: "insight-card",
    targetItemIds: ["chunk-bonjour", "chunk-merci"],
    payload: {
      insightType: "culture-bite",
      title: "A small kit goes a long way.",
      body:
        "A handful of polite words carries a whole exchange in French. " +
        "Greet, ask softly, and thank. That kit is enough to handle a real first moment.",
      examples: [
        { fr: "Bonjour.", en: "Hello." },
        { fr: "Merci.", en: "Thank you." },
        { fr: "Je voudrais un thé.", en: "I would like a tea. (same move, new thing)" },
        { fr: "Je voudrais un croissant.", en: "I would like a croissant." },
      ],
    },
  },
  {
    id: "s02-meet-je-voudrais-cafe",
    type: "meet-card",
    targetItemIds: ["chunk-je-voudrais", "noun-cafe"],
    weakPointTags: ["politeness", "conditional-softness"],
    payload: {
      fr: "Je voudrais un café.",
      en: "I would like a coffee.",
      title: "A soft, polite request.",
      highlights: [
        { text: "je voudrais", itemId: "chunk-je-voudrais" },
        { text: "un café", itemId: "noun-cafe" },
      ],
      tts: true,
    },
  },
  {
    id: "s03-fill-polite-verb",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-voudrais"],
    weakPointTags: ["politeness"],
    payload: {
      prompt: "Which word keeps the request polite?",
      sentenceBefore: "Bonjour, je",
      sentenceAfter: "un café.",
      blankCount: 1,
      options: [
        { id: "opt-voudrais", text: "voudrais", isCorrect: true },
        {
          id: "opt-veux",
          text: "veux",
          isCorrect: false,
          trapReason:
            "It works, but it sounds blunt with someone you don't know. Je voudrais stays polite.",
        },
        {
          id: "opt-suis",
          text: "suis",
          isCorrect: false,
          trapReason: "Je suis means I am. It cannot ask for a coffee.",
        },
      ],
      answer: ["opt-voudrais"],
      reveal: {
        short: "voudrais",
        explanation:
          "Je voudrais softens any request. It is the polite way to ask a stranger for a coffee, or for anything else.",
        natural: "Bonjour, je voudrais un café.",
      },
    },
  },
  {
    id: "s04-weave-cafe-order",
    type: "weave",
    targetItemIds: ["chunk-bonjour", "chunk-je-voudrais", "noun-cafe"],
    weakPointTags: ["politeness"],
    payload: {
      weaveType: "supported",
      prompt: "Write it in French: Hello, I would like a coffee.",
      context: "You step up to the counter and order simply.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour", required: true, label: "greeting" },
        { text: "je voudrais", itemId: "chunk-je-voudrais", required: true, label: "polite request" },
        { text: "un café", itemId: "noun-cafe", required: true, label: "noun package" },
      ],
      hintCloze: "Bonjour, je voudrais ___.",
      expectedAnswers: ["Bonjour, je voudrais un café."],
      reveal: {
        modelAnswer: "Bonjour, je voudrais un café.",
        ifCorrect: "That is exactly how a calm order begins.",
        ifCorrectButFlat:
          "Right pieces. The comma marks a small natural pause.",
        ifUnderstandableButWrong:
          "Your meaning lands. A native joins the pieces this way.",
        ifMissingTargetPiece:
          "Start with bonjour, then the request.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-meet-sil-vous-plait",
    type: "meet-card",
    targetItemIds: ["chunk-sil-vous-plait"],
    weakPointTags: ["politeness", "elision"],
    payload: {
      fr: "S'il vous plaît.",
      en: "Please.",
      title: "The polite tail of a request.",
      highlights: [
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait" },
      ],
      tts: true,
    },
  },
  {
    id: "s06-weave-cafe-order-please",
    type: "weave",
    targetItemIds: [
      "chunk-bonjour",
      "chunk-je-voudrais",
      "noun-cafe",
      "chunk-sil-vous-plait",
    ],
    weakPointTags: ["politeness"],
    payload: {
      weaveType: "supported",
      prompt: "Write it in French: Hello, I would like a coffee, please.",
      context: "Add the soft close to your order.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour", required: true, label: "greeting" },
        { text: "je voudrais", itemId: "chunk-je-voudrais", required: true, label: "polite request" },
        { text: "un café", itemId: "noun-cafe", required: true, label: "noun package" },
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait", label: "softener" },
      ],
      hintCloze: "Bonjour, je voudrais ___, s'il vous plaît.",
      expectedAnswers: ["Bonjour, je voudrais un café, s'il vous plaît."],
      reveal: {
        modelAnswer: "Bonjour, je voudrais un café, s'il vous plaît.",
        ifCorrect: "That is a full, polite café order.",
        ifCorrectButFlat:
          "Right pieces. The commas mark small natural pauses.",
        ifMissingTargetPiece:
          "Add s'il vous plaît to soften the close. It costs nothing and changes the tone.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s07-meet-merci",
    type: "meet-card",
    targetItemIds: ["chunk-merci"],
    payload: {
      fr: "Merci.",
      en: "Thank you.",
      title: "Close with thanks.",
      highlights: [{ text: "Merci", itemId: "chunk-merci" }],
      tts: true,
    },
  },
  {
    id: "s07b-insight-rescue-kit",
    type: "insight-card",
    targetItemIds: [
      "chunk-excusez-moi",
      "formula-je-ne-comprends-pas",
      "formula-vous-pouvez-repeter",
    ],
    payload: {
      insightType: "culture-bite",
      title: "When French moves too fast.",
      body:
        "Real survival is knowing what to say when you're lost. Excusez-moi opens the door to a stranger. Then two lines, learned whole, rescue any moment: je ne comprends pas, and the ask that follows it, vous pouvez répéter ? No word order changes for the ask. Your rising voice does the asking: vous pouvez répéter ?",
      examples: [
        { fr: "Excusez-moi.", en: "Excuse me." },
        { fr: "Je ne comprends pas.", en: "I don't understand." },
        { fr: "Vous pouvez répéter ?", en: "Can you repeat?" },
      ],
    },
  },
  {
    id: "s07c-weave-rescue",
    type: "weave",
    targetItemIds: ["formula-je-ne-comprends-pas", "formula-vous-pouvez-repeter"],
    payload: {
      weaveType: "supported",
      prompt: "You're lost. Say you don't understand, then ask them to repeat.",
      context:
        "The answer came back fast and long. Use your rescue kit, whole.",
      suggestedPieces: [
        {
          text: "excusez-moi",
          itemId: "chunk-excusez-moi",
          label: "attention opener",
        },
        {
          text: "je ne comprends pas",
          itemId: "formula-je-ne-comprends-pas",
          required: true,
          label: "I don't understand",
        },
        {
          text: "vous pouvez répéter ?",
          itemId: "formula-vous-pouvez-repeter",
          required: true,
          label: "can you repeat?",
        },
      ],
      expectedAnswers: ["Je ne comprends pas. Vous pouvez répéter ?"],
      acceptedAlternatives: [
        "Je ne comprends pas. Vous pouvez répéter",
        "Excusez-moi, je ne comprends pas. Vous pouvez répéter ?",
      ],
      reveal: {
        modelAnswer: "Je ne comprends pas. Vous pouvez répéter ?",
        ifCorrect:
          "That pair rescues any moment. Both lines live in your kit whole.",
        ifCorrectButFlat:
          "Right lines. The rising voice on the second one does the asking.",
        ifUnderstandableButWrong:
          "Your meaning lands. Keep both lines whole: they work as they are.",
        ifMissingTargetPiece:
          "Say the state first, je ne comprends pas, then the ask, vous pouvez répéter ?",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s08-sayit-cafe-order",
    type: "say-it-your-way",
    targetItemIds: [
      "chunk-bonjour",
      "chunk-je-voudrais",
      "noun-cafe",
      "chunk-sil-vous-plait",
      "chunk-merci",
    ],
    weakPointTags: ["politeness", "natural-speech"],
    payload: {
      situation:
        "Order whatever you actually want, even if you don't know its French name yet. Your skeleton is French; leave the unknown word in English.",
      communicativeGoal:
        "Make it sound natural: a soft opening, a polite ask, a polite close, thanks if you like. Unknown words may stay English.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour" },
        { text: "je voudrais", itemId: "chunk-je-voudrais" },
        { text: "un café", itemId: "noun-cafe" },
        { text: "un thé", itemId: "chunk-un-the" },
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait" },
        { text: "merci", itemId: "chunk-merci" },
      ],
      modelAnswer: "Bonjour, je voudrais un café, s'il vous plaît. Merci !",
      reveal: {
        modelAnswer: "Bonjour, je voudrais un café, s'il vous plaît. Merci !",
        naturalAlternatives: [
          "Bonjour, un café s'il vous plaît. Merci !",
          "Bonjour, je voudrais un thé, s'il vous plaît.",
        ],
        explanation:
          "Wrote something like 'je voudrais a hot chocolate, s'il vous plaît'? That works. The mix is Weave: your French skeleton carrying the day, English filling what you don't know yet. The lines above are full-French versions of the same move.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s08b-insight-you-may-hear",
    type: "insight-card",
    payload: {
      insightType: "culture-bite",
      title: "The counter talks back.",
      body:
        "Your kit carries you. Around it, the counter has its own lines. None of them are yours to produce yet. Hear them once, let them pass; they'll feel familiar when they find you for real.",
      examples: [
        { fr: "Vous désirez ?", en: "What would you like?" },
        { fr: "Sur place ou à emporter ?", en: "For here or to go?" },
        { fr: "Et voilà.", en: "There you go." },
        { fr: "C'est combien ?", en: "How much is it? (a question for later)" },
        { fr: "Ça fait deux euros.", en: "That's two euros." },
        { fr: "Je vous en prie.", en: "You're welcome." },
        { fr: "Bonne journée !", en: "Have a nice day." },
        { fr: "Pardon ?", en: "Sorry? (they didn't catch it)" },
        { fr: "monsieur, madame", en: "sir, ma'am (how they may address you)" },
        { fr: "un chocolat chaud", en: "a hot chocolate" },
      ],
    },
  },
  {
    id: "s09-recap-survival-kit",
    type: "recap",
    payload: {
      title: "Your survival kit.",
      lines: [
        "You greeted someone and asked for a coffee politely.",
        "You softened the request and closed with thanks.",
        "And when French moved too fast, you rescued yourself: je ne comprends pas, vous pouvez répéter ?",
      ],
      piecesUsed: [
        "Bonjour",
        "je voudrais",
        "un café",
        "un thé",
        "s'il vous plaît",
        "merci",
        "excusez-moi",
        "je ne comprends pas",
        "vous pouvez répéter ?",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson001: Lesson = {
  id: "v1-lesson-001",
  version: "v1",
  number: 1,
  title: "Survival Kit",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "chunk-natural-speech",
  estimatedMinutes: 7,
  canDo: "Greet, ask for something politely, and thank.",
  whyItExists:
    "L0 gave one polite café line as a first taste. L1 grows it into a small survival kit: greet, make a soft request, and thank. These polite chunks carry a whole first exchange before any verb system arrives in L2.",
  prerequisites: [],
  learningItems: getItems([
    "chunk-bonjour",
    "chunk-merci",
    "chunk-sil-vous-plait",
    "chunk-je-voudrais",
    "noun-cafe",
    "chunk-excusez-moi",
    "formula-je-ne-comprends-pas",
    "formula-vous-pouvez-repeter",
    "chunk-un-the",
    "noun-the",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Compact survival kit: bonjour, je voudrais, un café, s'il vous plaît, merci. No phrasebook list of greetings.",
    "Politeness lives in the verb: je voudrais vs je veux is taught as register, never as an error.",
    "Vous register throughout. Informal tu is L3 territory.",
    "SayIt is deterministic and model-answer-only, consistent with L0.",
    "No XP / streak / level-up / mission copy.",
    "c'est and au revoir remain out of this slice; the RESCUE kit is now IN (Kademe 2 enrichment): je ne comprends pas + vous pouvez répéter ? as SURVIVAL_FORMULAS (closed lint class, PAYLOAD_ECONOMY 4.1), plus excusez-moi as supported attention opener.",
    "Survival formulas are learned whole: comprendre is not unpacked, the non-inverted vous pouvez répéter ? is canon (inversion stays recognition-only).",
    "un thé is supported service variation (dual role: article package reinforcement in L5). The only ghost is un croissant, living ONLY in insight example copy, never in fills, weaves, or piecesUsed. madame / monsieur were trimmed from the ghost tier (Payload Economy review, 2026-07-04): address-register lands later as its own register/service slice; excusez-moi alone carries the opener here. They stay in the Practice Pool candidate quarry (docs/audits).",
    "s08 is the open mixed Weave (W1 canon): the prompt invites leaving unknown words in English; it is model-answer-only and the reveal compares instead of grading.",
    "Seen layer v0 (docs/SURFACE_DENSITY_METRIC_CLARIFICATION_2026_07.md): s08b is heard-French exposure only. Nothing in it is produced, chipped, required, registered, or counted in piecesUsed; TTS is synthesis-only. madame/monsieur re-enter here as heard address forms (seen tier), distinct from the trimmed ghost tier.",
  ],
  qaChecks: [
    "TTS reads Bonjour, Je voudrais un café, S'il vous plaît, and Merci cleanly.",
    "TTS reads Je ne comprends pas. Vous pouvez répéter ? with a rising contour on the second line.",
    "s07c accepts the no-question-mark and excusez-moi variants via acceptedAlternatives.",
    "The ghost item (croissant) never appears as a chip or correctness requirement; madame / monsieur appear nowhere in the lesson.",
    "Apostrophe normalization handles curly quotes in s'il vous plaît.",
    "Unaccented cafe and plait variants pass Weave via accepted alternatives.",
    "s03 trap reasons fire on veux and suis selections.",
    "No theatrical positivity tokens appear.",
    "No mention of streak, XP, level, or mission.",
  ],
};
