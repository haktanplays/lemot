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
        "Today: add the polite close, thank, and swap the drink.\n" +
        "By the end: you can carry a whole small exchange in French.\n" +
        "Main pieces: s'il vous plaît, merci.",
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
          // Machine tag (never learner-facing): `je veux` is real, comprehensible
          // French in the wrong register — not a grammar failure, not a blocked
          // form, not a content defect. The miss stays learner-attributed and
          // admitted, and one of them is well below the weakness threshold.
          learningErrorTag: "wrong_register",
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
          "Right. The comma marks a small natural pause.",
        ifUnderstandableButWrong:
          "Your meaning lands. The greeting and the order run as one line.",
        ifMissingTargetPiece:
          "Start with bonjour, then the request.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    // Reflection, not preamble: it lands AFTER the learner has re-produced the
    // café order, so it names what they just did instead of front-loading a
    // second explanation screen behind the goal card.
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
      ],
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
          "Right. The commas mark small natural pauses.",
        ifUnderstandableButWrong:
          "Your meaning lands. The please sits at the end, after the order.",
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
  // ── PR-07 registered pilot payloads (screen ids are NEW and stable; the
  // existing s00–s09 ids keep their meaning and were not renumbered) ────────
  {
    // PM-009 · EV-030 · sent:l01-merci — A-new typed recall, unscaffolded.
    id: "s10-weave-merci-thanks",
    type: "weave",
    targetItemIds: ["chunk-merci"],
    weakPointTags: ["politeness"],
    payload: {
      weaveType: "supported",
      prompt: "The coffee arrives. Thank them.",
      // Scene only: it gives the moment a person to react to, so the screen
      // reads as a reaction rather than a translation task. It adds no pieces,
      // no model and no instruction, so the attempt stays unscaffolded and the
      // registered identity (payload id, EV-030, sentence id, evidence target)
      // is untouched.
      context: "The server sets it down and waits a moment.",
      // No pieces, no cloze, no prior model: a clean unscaffolded first
      // production of the form the learner just met. The hint ladder simply
      // does not render.
      expectedAnswers: ["Merci."],
      acceptedAlternatives: ["Merci", "Merci !"],
      reveal: {
        modelAnswer: "Merci.",
        ifCorrect: "That closes the exchange.",
        ifCorrectButFlat: "Right. One word is the whole reply here.",
        ifUnderstandableButWrong: "One word does it here: merci.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    // Truthful first contact with the tea package, placed immediately before
    // PM-011 asks for it. `un thé` arrives as ONE package inside the request
    // shape the learner already carried for coffee (un café -> same frame ->
    // un thé), so the Supported weave no longer asks for a piece the lesson
    // never showed. Exposure only: nothing is produced here, so the Supported
    // production evidence for `chunk-un-the` still comes from PM-011 alone, and
    // no independent claim is created. `noun-the` stays the linked
    // sub-identity and is never named by this screen.
    id: "s12-meet-un-the",
    type: "meet-card",
    targetItemIds: ["chunk-un-the"],
    payload: {
      fr: "Je voudrais un thé.",
      en: "I would like a tea.",
      title: "Same request, a different drink.",
      highlights: [{ text: "un thé", itemId: "chunk-un-the" }],
      tts: true,
    },
  },
  {
    // PM-011 · EV-040 · sent:l01-je-voudrais-un-the-sil-vous-plait —
    // Supported tea order. `un thé` is a CONSTITUTIVE package: visible from
    // first render, never split into un + thé, never behind the hint ladder.
    // Evidence flows to the primary tea identity only; the recycled frame
    // stays recallable with optional hint support.
    id: "s11-weave-the-order",
    type: "weave",
    targetItemIds: ["chunk-je-voudrais", "chunk-un-the", "chunk-sil-vous-plait"],
    evidenceTargetItemIds: ["chunk-un-the"],
    weakPointTags: ["politeness"],
    payload: {
      weaveType: "supported",
      prompt: "Order a tea politely.",
      context: "The server looks over. This time it's a tea.",
      suggestedPieces: [
        {
          text: "un thé",
          itemId: "chunk-un-the",
          required: true,
          label: "your drink",
          supportRole: "constitutive",
        },
        { text: "je voudrais", itemId: "chunk-je-voudrais", label: "polite request" },
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait", label: "polite close" },
      ],
      hintCloze: "Je voudrais ___, s'il vous plaît.",
      expectedAnswers: ["Je voudrais un thé, s'il vous plaît."],
      reveal: {
        modelAnswer: "Je voudrais un thé, s'il vous plaît.",
        ifCorrect: "Same calm frame, new drink.",
        ifCorrectButFlat: "Right. The comma settles the order before the please.",
        ifUnderstandableButWrong:
          "Your meaning lands. The drink keeps its little word: un thé.",
        ifMissingTargetPiece: "The drink piece is right there: un thé.",
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
        "The counter is quiet. You have been waiting a moment, and the person behind it turns to you.",
      communicativeGoal: "Order politely, then close the exchange.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour" },
        { text: "je voudrais", itemId: "chunk-je-voudrais" },
        { text: "un café", itemId: "noun-cafe" },
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait" },
        { text: "merci", itemId: "chunk-merci" },
      ],
      modelAnswer: "Bonjour, je voudrais un café, s'il vous plaît. Merci !",
      reveal: {
        modelAnswer: "Bonjour, je voudrais un café, s'il vous plaît. Merci !",
        naturalAlternatives: ["Bonjour, un café s'il vous plaît. Merci !"],
        explanation:
          "Both are natural. The longer form leans formal; the shorter form leans casual.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s09-recap-survival-kit",
    type: "recap",
    payload: {
      title: "You can hold a first exchange.",
      // Recycled first, then extended: line 1 names what the learner already
      // carried, lines 2 and 3 name what this lesson actually added. The tea
      // line stays honest about support and never claims the piece is owned.
      lines: [
        "You carried the café order you already had.",
        "You softened it with s'il vous plaît, and closed with merci.",
        "You ordered un thé too, with the piece in front of you.",
      ],
      piecesUsed: [
        "Bonjour",
        "je voudrais",
        "un café",
        "s'il vous plaît",
        "merci",
        "un thé",
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
  estimatedMinutes: 6,
  canDo: "Greet, ask for something politely, and thank.",
  whyItExists:
    "L0 gave one polite café line as a first taste. L1 does not teach that line again: bonjour, je voudrais and un café are recycled straight into production, and the genuinely new ground is the polite close, merci, and the Supported tea variation. These polite chunks carry a whole first exchange before any verb system arrives in L2.",
  prerequisites: [],
  learningItems: getItems([
    "chunk-bonjour",
    "chunk-merci",
    "chunk-sil-vous-plait",
    "chunk-je-voudrais",
    "noun-cafe",
    // PR-07: the Supported tea package (primary identity only — `noun-the` is
    // its linked sub-identity and is never a lesson learning target; the three
    // rescue chunks are registered for the frozen L1 ledger but not activated
    // by these payloads).
    "chunk-un-the",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "L0 owns first contact with bonjour, je voudrais and un café. L1 recycles them through production only: the duplicate meet cards that restated them were removed, so the learner extends one café moment instead of meeting it twice.",
    "L1's new ground is s'il vous plaît, merci, and the Supported un thé variation.",
    "s12-meet-un-the introduces the tea package before PM-011 asks for it. It is exposure only, so the Supported production evidence still comes from PM-011 alone and no independent tea claim exists.",
    "The survival-kit insight sits after the first weave as a reflection, so the lesson never opens with two explanation screens.",
    "Compact survival kit: bonjour, je voudrais, un café, s'il vous plaît, merci. No phrasebook list of greetings.",
    "Politeness lives in the verb: je voudrais vs je veux is taught as register, never as an error.",
    "Vous register throughout. Informal tu is L3 territory.",
    "SayIt is deterministic and model-answer-only, consistent with L0.",
    "No XP / streak / level-up / mission copy.",
    "c'est, au revoir, and the wider rescue/location kit from the L1 syllabus spec are intentionally out of this compact slice.",
  ],
  qaChecks: [
    "TTS reads Bonjour, Je voudrais un café, S'il vous plaît, and Merci cleanly.",
    "Apostrophe normalization handles curly quotes in s'il vous plaît.",
    "Unaccented cafe and plait variants pass Weave via accepted alternatives.",
    "s03 trap reasons fire on veux and suis selections.",
    "No theatrical positivity tokens appear.",
    "No mention of streak, XP, level, or mission.",
  ],
};
