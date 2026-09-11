import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

/**
 * L0 — the first taste.
 *
 * NOT Lesson 1, and not a step on the Journey. Its job is to get a learner to
 * one real French success before anything is asked of them.
 *
 * THE ARC IS THE OLD ONE, recovered from `app/lesson-zero.tsx` as it stood
 * before first use moved onto the lesson engine. That move was right and is
 * kept — shared grading, the persisted cursor, first-use semantics, the real
 * renderer — but it had carried the beats across and lost the experience. This
 * file is the old learner-facing sequence, played by the current engine:
 *
 *   meet Bonjour          two pieces, before any framing
 *   meet je voudrais      on its own; it used to arrive fused to "un café"
 *   THE BRIDGE            order a coffee with two French pieces and one English
 *                         word, then see your own line with the last piece in
 *                         French. "Only the part you did not have yet changed."
 *   ask for tea           the same handle turned once more. The ONE addition
 *                         to the old arc.
 *   THE REEL              "You were not starting from zero." The main event.
 *   the rebuild           the whole sentence, in French, from memory
 *   the payoff            used, not memorised
 *
 * WHAT IS DELIBERATELY ABSENT, because the old arc did not have it: a separate
 * meet card for `un café`, the assembly Showcase, the recognition fill, and
 * s'il vous plaît. The first three were beats the engine rebuild added; the
 * fourth was a fourth declared piece that made the target sentence longer than
 * the old one. L1 teaches s'il vous plaît properly, and L1's Showcase is where
 * chip tap and Look Closer are met.
 *
 * THE ORDER OF TWO THINGS CARRIES THE WHOLE LESSON. `un café` is introduced by
 * the BRIDGE'S REVEAL and nowhere earlier: teaching it first leaves the bridge
 * nothing to reveal, and "only the part you did not have yet changed" stops
 * being true. And the reel follows the first production rather than preceding
 * it — in front of the first ask, "look what you already know" is a promise.
 */
const screens: LessonScreen[] = [
  // ── A. IMMEDIATE CONTACT ─────────────────────────────────────────────────
  // French, on the first screen, before any framing. The learner can hear it.
  {
    id: "s00-meet-bonjour",
    type: "meet-card",
    targetItemIds: ["chunk-bonjour"],
    payload: {
      fr: "Bonjour.",
      en: "Hello.",
      title: "A first French door.",
      highlights: [{ text: "Bonjour", itemId: "chunk-bonjour" }],
      tts: true,
    },
  },

  // ── B. FIRST USEFUL PIECE ────────────────────────────────────────────────
  // On its own, deliberately. It used to arrive fused to "un café" as one
  // sentence, which taught the learner a line instead of a piece.
  {
    id: "s01-meet-je-voudrais",
    type: "meet-card",
    targetItemIds: ["chunk-je-voudrais"],
    weakPointTags: ["politeness"],
    payload: {
      fr: "je voudrais",
      en: "I would like",
      title: "The piece that asks for things.",
      highlights: [{ text: "je voudrais", itemId: "chunk-je-voudrais" }],
      tts: true,
    },
  },

  // ── C. THE BRIDGE ────────────────────────────────────────────────────────
  // The oldest and best thing the first taste ever did, recovered.
  //
  // The learner orders a coffee with TWO French pieces and one English word,
  // and is then shown their own line with the last piece in French. Nothing is
  // marked wrong, because nothing was: they communicated. That is the whole
  // argument of the product, made in one screen instead of claimed in a
  // paragraph, and it only works if `un café` has NOT been taught first —
  // which is why the meet card that used to sit here is gone. Its reveal
  // introduces the package, and the Showcase two beats later makes it a
  // tappable chip with its depth card.
  //
  // The hybrid is the EXPECTED answer, not a tolerated one. Full French is
  // accepted too, for the learner who reaches further than they were asked to.
  {
    id: "s08-weave-hybrid-order",
    type: "weave",
    targetItemIds: ["chunk-bonjour", "chunk-je-voudrais"],
    evidenceTargetItemIds: ["chunk-je-voudrais"],
    weakPointTags: ["politeness"],
    payload: {
      weaveType: "supported",
      prompt: "Greet them, then ask for a coffee. Use English for anything you do not have yet.",
      context:
        "The person at the counter looks up. You want a coffee, and you have two French pieces.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour", label: "the greeting" },
        { text: "je voudrais", itemId: "chunk-je-voudrais", label: "the ask" },
      ],
      expectedAnswers: ["Bonjour, je voudrais a coffee."],
      acceptedAlternatives: [
        "Je voudrais a coffee.",
        "Bonjour, je voudrais un café.",
        "Je voudrais un café.",
      ],
      reveal: {
        modelAnswer: "Bonjour, je voudrais un café.",
        ifCorrect:
          "That is a real order. Look at what changed: only the part you did not have yet.",
        ifCorrectButFlat:
          "Right. Only the part you did not have yet changed. Everything else was already yours.",
        ifUnderstandableButWrong:
          "Your meaning lands. Keep your two French pieces at the front and let English carry the rest.",
        ifMissingTargetPiece:
          "Open with bonjour, then je voudrais, then name what you want in whatever language you have.",
      },
      validationMode: "exact-or-alternative",
    },
  },

  // ── C2. THE SAME SHAPE, A DIFFERENT THING ────────────────────────────────
  // One more turn of the same handle, which is what makes it a shape rather
  // than a sentence. The hybrid is expected here too: the learner has never
  // seen "un thé" and is not being asked to guess it.
  {
    id: "s09-weave-hybrid-tea",
    type: "weave",
    targetItemIds: ["chunk-je-voudrais"],
    evidenceTargetItemIds: ["chunk-je-voudrais"],
    payload: {
      weaveType: "mid",
      prompt: "Now ask for tea, the same way.",
      context: "Same counter, a different drink.",
      expectedAnswers: ["Je voudrais a tea."],
      acceptedAlternatives: [
        "Je voudrais un thé.",
        "Bonjour, je voudrais a tea.",
        "Bonjour, je voudrais un thé.",
      ],
      reveal: {
        modelAnswer: "Je voudrais un thé.",
        ifCorrect: "The shape did not move. Only the thing you wanted did.",
        ifCorrectButFlat:
          "Right. The shape did not move; only the thing you wanted did.",
        ifUnderstandableButWrong:
          "Your meaning lands. Je voudrais does the asking, whatever comes after it.",
        ifMissingTargetPiece: "Start with je voudrais, then name the drink.",
      },
      validationMode: "exact-or-alternative",
    },
  },

  // ── C3. NOT STARTING FROM ZERO ───────────────────────────────────────────
  // The familiar-words reel, restored. It sits exactly where it always sat:
  // after the learner has produced something, so it reads as an explanation of
  // what just happened rather than a promise made before anything did. No note
  // under it — the old beat had none, and the reel makes its own point.
  {
    id: "s10-reel-familiar",
    type: "pattern-reel",
    payload: {
      title: "You were not starting from zero.",
      body: "Some French is already familiar.",
      rows: [
        { fr: "restaurant", en: "restaurant" },
        { fr: "important", en: "important" },
        { fr: "possible", en: "possible" },
        { fr: "moment", en: "moment" },
        { fr: "musique", en: "music" },
        { fr: "cinéma", en: "cinema" },
        { fr: "café", en: "coffee" },
        { fr: "chocolat", en: "chocolate" },
      ],
    },
  },

  // ── F. FIRST RETRIEVAL ───────────────────────────────────────────────────
  // One task, heavily supported: every piece is on the tray, the cloze holds
  // the shape, and the hint ladder is there for anyone who wants it. Grading
  // is the ordinary Weave contract, so a wrong answer is never praised.
  {
    id: "s05-weave-cafe-order",
    type: "weave",
    // The three declared pieces are targets here: this is the screen that WORKS
    // them. A demand that only ever appears on a card is exactly the drift the
    // corpus guard reports, and it would be true -- the learner would have been
    // shown a word and never asked to use it.
    targetItemIds: ["chunk-bonjour", "chunk-je-voudrais", "noun-cafe"],
    weakPointTags: ["politeness"],
    payload: {
      weaveType: "supported",
      prompt: "Order a coffee, the way you would want to be spoken to.",
      context: "You step into a small café. The person behind the counter looks up.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour", required: true, label: "greeting" },
        { text: "je voudrais", itemId: "chunk-je-voudrais", required: true, label: "the ask" },
        { text: "un café", itemId: "noun-cafe", required: true, label: "the thing" },
      ],
      hintCloze: "Bonjour, je voudrais ___.",
      // The old arc's target sentence, exactly: "Bonjour, je voudrais un café."
      // s'il vous plaît is NOT part of the first taste and never was. It is
      // taught properly in L1, where it gets a meet and two real uses; adding it
      // here cost a fourth declared piece, a fifth beat and a longer sentence,
      // for a softener the learner does not need to order a coffee.
      expectedAnswers: ["Bonjour, je voudrais un café."],
      acceptedAlternatives: [
        "Bonjour. Je voudrais un café.",
        "Je voudrais un café.",
      ],
      reveal: {
        modelAnswer: "Bonjour, je voudrais un café.",
        ifCorrect: "That is a real café order. Nothing about it is beginner French.",
        ifCorrectButFlat: "Right. Greeting first, then the ask. That order matters more than the words.",
        ifUnderstandableButWrong:
          "Your meaning lands. The pieces go greeting, then ask, then thing: Bonjour, je voudrais un café.",
        ifMissingTargetPiece: "Start with Bonjour, then je voudrais, then what you want.",
      },
      validationMode: "exact-or-alternative",
    },
  },

  // ── G. OWNERSHIP ─────────────────────────────────────────────────────────
  // The old arc's payoff beat: "Used. Not memorized." What they have, in their
  // own hands, and the sentence they rebuilt rather than repeated.
  {
    id: "s07-recap-first-step",
    type: "recap",
    payload: {
      title: "You have three pieces of French.",
      // Recap voice across the corpus is "what this lesson did with you", and
      // that holds here -- except for the assembly line, which used to say the
      // learner PUT the sentence together. This lesson has exactly one
      // production, and a learner who missed it reads that line seconds after
      // being told to compare with the model. So it names what the Showcase
      // showed, which happened for everyone. The closing screen is where a
      // landed order is claimed, and it checks first.
      lines: [
        "You greeted someone.",
        "You asked for something, politely.",
        "You saw three pieces become one real sentence.",
      ],
      piecesUsed: ["Bonjour", "je voudrais", "un café"],
      // Not "Begin". The closing screen is the one that begins the path, and
      // two consecutive Begins read as a button that did not work.
      nextLabel: "Continue",
    },
  },
];

export const lesson000: Lesson = {
  id: "v1-lesson-000",
  version: "v1",
  number: 0,
  title: "The First Step",
  phase: "first-step",
  monolingualMode: "english-guided",
  primaryArchetype: "chunk-natural-speech",
  acquisitionDemandItemIds: ["chunk-bonjour", "chunk-je-voudrais", "noun-cafe"],
  estimatedMinutes: 3,
  canDo: "Order a coffee politely in a French café.",
  whyItExists:
    "First real French moment. One complete natural sentence, built from three pieces the learner has just met, before any grammar architecture exists.",
  prerequisites: [],
  learningItems: getItems(["chunk-bonjour", "chunk-je-voudrais", "noun-cafe"]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "L0 is reached from first use, never from the Journey list: `isV1LessonInStageScope` starts at 1 and `phase: first-step` is what the route and the completion view key on.",
    "The L1 architecture chunk is intentionally absent from L0. L1 introduces it as the active target.",
    "THREE productions, which is the old arc: the hybrid bridge, one more turn of the same handle for tea, and the full-French rebuild. The first two are not tests -- they EXPECT the learner's own English for the piece they do not have, so nothing in them can be got wrong. Open production still starts in L1.",
    "s'il vous plaît is NOT in the first taste, and was not in the old one. Adding it cost a fourth declared piece, its own beat and a longer target sentence; L1 teaches it properly with a meet and two real uses. L0's target sentence is the old arc's exact one: Bonjour, je voudrais un café.",
    "The recognition fill, the assembly Showcase and the separate un café meet card are all gone. None was part of the cognate-first arc, and none is needed for the bridge: the bridge's own reveal introduces un café, which is how the old lesson taught it. Chip tap and Look Closer are met in L1's Showcase instead, one lesson later, where there is room for them.",
    "No XP / streak / level-up / mission complete copy.",
    "Vous register throughout — informal tu is L1+ territory.",
  ],
  qaChecks: [
    "TTS reads Bonjour, je voudrais and the full sentence cleanly.",
    "The reel turns slowly, the centred pair always matches, and reduce-motion shows the static list instead.",
    "The bridge accepts \"Bonjour, je voudrais a coffee.\" without marking it wrong, and its reveal shows the French.",
    "No theatrical positivity tokens (Amazing/Perfect/Crushed).",
    "The unaccented cafe variant passes the Weave, and the hybrid a coffee / a tea answers are accepted rather than corrected.",
  ],
};
