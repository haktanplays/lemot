import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

/**
 * L0 — the first taste.
 *
 * NOT Lesson 1, and not a step on the Journey. Its job is to get a learner to
 * one real French success before anything is asked of them, and to let them
 * discover how Cairn teaches by using it rather than by being told.
 *
 * The arc is seven beats: meet a word, meet a piece, meet a thing, watch the
 * three become a sentence, look closer at ONE thing worth knowing, produce it
 * once with plenty of support, and see what they now own.
 *
 * Two structural decisions carry most of the weight.
 *
 * THE ASSEMBLY BEAT IS A SHOWCASE, not a fourth meet card. Showcase is the
 * screen that renders reusable pieces as chips, makes each chip tappable, and
 * carries the Look Closer layer. Putting the combined sentence there is what
 * lets a first-time learner SEE that "Bonjour, je voudrais un café." is three
 * things they already have rather than one line to memorise, and lets them
 * discover chunk tap and depth-on-demand by curiosity instead of instruction.
 * It grades nothing and emits no evidence, which is correct for a beat whose
 * only job is "look how this fits together".
 *
 * THERE IS EXACTLY ONE PRODUCTION SCREEN. L0 used to ask twice -- a supported
 * Weave and then an open Say It. A first taste that tests twice is a test. The
 * Weave stays, at `supported`, with every piece on the tray; the open one is
 * gone, and open production begins where it should, in L1.
 *
 * The vocabulary world is deliberately tiny: three required pieces, one
 * sentence, and one softener met just before the ask and offered rather than
 * demanded.
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

  // ── C. USEFUL OBJECT ─────────────────────────────────────────────────────
  {
    id: "s01b-meet-un-cafe",
    type: "meet-card",
    targetItemIds: ["noun-cafe"],
    weakPointTags: ["articles"],
    payload: {
      fr: "un café",
      en: "a coffee",
      title: "And the thing you want.",
      highlights: [{ text: "un café", itemId: "noun-cafe" }],
      tts: true,
    },
  },

  // ── D. ASSEMBLY + E. CURIOSITY ───────────────────────────────────────────
  // The chips are derived from the registry, so the learner sees exactly the
  // three pieces they just met and can tap any of them. The depth card is the
  // single curiosity moment: sound, because that is the thing about this
  // sentence a reader cannot guess, and one usage note about register.
  {
    id: "s02-showcase-first-order",
    type: "showcase",
    payload: {
      intro:
        "Three pieces, and you have met all three. Put them in a row and you have ordered a coffee.",
      clusters: [
        {
          label: "Your first sentence",
          sentences: [
            {
              fr: "Bonjour, je voudrais un café.",
              en: "Hello, I would like a coffee.",
              role: "core",
              itemIds: ["chunk-bonjour", "chunk-je-voudrais", "noun-cafe"],
              depth: {
                sound: "bon-ZHOOR, zhuh voo-DREH un ka-FAY",
                notice:
                  "The weight lands at the end of each piece, not inside it: bon-ZHOOR, not BON-zhoor. French leans on the end of a group, which is why the capitals in these cues always come last.",
                usage:
                  "Je voudrais is the version you can say to anyone. Je veux means the same thing and lands like a child asking, so it is worth having only this one for now.",
              },
            },
          ],
        },
      ],
    },
  },

  // ── E2. ONE LIGHT RECOGNITION BEAT ───────────────────────────────────────
  // Between seeing the sentence and writing it: which piece is the thing you
  // want? The frame is printed around the blank, so the learner reads
  // "je voudrais" and chooses only the noun -- which is why the evidence target
  // is narrowed to the noun. Crediting the frame would count a word they were
  // simply shown.
  //
  // The reveal deliberately stops at the piece. It used to print the whole
  // sentence, which is the sentence the very next screen asks them to write,
  // and a screen that hands over the next screen's answer measures copying.
  {
    id: "s03-fill-je-voudrais-blank",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-voudrais", "noun-cafe"],
    evidenceTargetItemIds: ["noun-cafe"],
    weakPointTags: ["articles"],
    payload: {
      prompt: "Which piece is the thing you want?",
      sentenceBefore: "Bonjour, je voudrais",
      sentenceAfter: ".",
      blankCount: 1,
      options: [
        { id: "opt-cafe", text: "un café", isCorrect: true },
        {
          id: "opt-merci",
          text: "merci",
          isCorrect: false,
          trapReason: "Merci closes a moment. It does not name what you want.",
        },
        {
          id: "opt-bonjour",
          text: "bonjour",
          isCorrect: false,
          trapReason:
            "You already greeted at the start. A second bonjour would feel doubled.",
        },
      ],
      answer: ["opt-cafe"],
      reveal: {
        short: "un café",
        explanation: "Je voudrais needs a thing after it. Here the thing is un café.",
        // No natural line. It would say the whole sentence, and the whole
        // sentence is what the Weave two beats from here asks the learner to
        // produce -- so printing it would be a spoiler. Saying "un café" a
        // second time instead is just an echo. Nothing extra to say is a
        // legitimate answer.
      },
    },
  },

  // ── E3. THE SOFTENER, AS A GIFT ──────────────────────────────────────────
  // Met, never required. It is L0's fourth declared piece, so it gets a real
  // teaching encounter -- asking for language nobody taught is the one thing
  // the path is not allowed to do -- but the Weave below does not mark it
  // required and accepts the order with or without it. A learner who picks it
  // up sounds warmer; a learner who does not is never corrected for it.
  {
    id: "s04-meet-sil-vous-plait",
    type: "meet-card",
    targetItemIds: ["chunk-sil-vous-plait"],
    weakPointTags: ["politeness", "elision"],
    payload: {
      fr: "S'il vous plaît.",
      en: "Please.",
      title: "The quiet tail of a request.",
      highlights: [{ text: "s'il vous plaît", itemId: "chunk-sil-vous-plait" }],
      tts: true,
    },
  },

  // ── F. FIRST RETRIEVAL ───────────────────────────────────────────────────
  // One task, heavily supported: every piece is on the tray, the cloze holds
  // the shape, and the hint ladder is there for anyone who wants it. Grading
  // is the ordinary Weave contract, so a wrong answer is never praised.
  {
    id: "s05-weave-cafe-order",
    type: "weave",
    // All four declared pieces are targets here: this is the screen that WORKS
    // them. A demand that only ever appears on a card is exactly the drift the
    // corpus guard reports, and it would be true -- the learner would have been
    // shown a word and never asked to use it.
    targetItemIds: [
      "chunk-bonjour",
      "chunk-je-voudrais",
      "noun-cafe",
      "chunk-sil-vous-plait",
    ],
    weakPointTags: ["politeness"],
    payload: {
      weaveType: "supported",
      prompt: "Order a coffee, the way you would want to be spoken to.",
      context: "You step into a small café. The person behind the counter looks up.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour", required: true, label: "greeting" },
        { text: "je voudrais", itemId: "chunk-je-voudrais", required: true, label: "the ask" },
        { text: "un café", itemId: "noun-cafe", required: true, label: "the thing" },
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait", label: "softener" },
      ],
      hintCloze: "Bonjour, je voudrais ___, s'il vous plaît.",
      // The model is the full polite order, because s'il vous plaît is one of
      // L0's four declared pieces and a declared piece has to be WORKED
      // somewhere -- meeting it on a card and never using it is the drift the
      // corpus guard exists to catch. The shorter order is accepted in full,
      // so a learner who stops at "un café" has still succeeded and is told so.
      expectedAnswers: ["Bonjour, je voudrais un café, s'il vous plaît."],
      acceptedAlternatives: [
        "Bonjour, je voudrais un café.",
        "Bonjour. Je voudrais un café.",
        "Bonjour. Je voudrais un café, s'il vous plaît.",
      ],
      reveal: {
        modelAnswer: "Bonjour, je voudrais un café, s'il vous plaît.",
        ifCorrect: "That is a real café order. Nothing about it is beginner French.",
        ifCorrectButFlat: "Right. Greeting first, then the ask. That order matters more than the words.",
        ifUnderstandableButWrong:
          "Your meaning lands. The pieces go greeting, then ask, then thing: Bonjour, je voudrais un café.",
        ifMissingTargetPiece: "Start with Bonjour, then je voudrais, then what you want.",
        // No note scolds a missing s'il vous plaît: the short order is accepted.
      },
      validationMode: "exact-or-alternative",
    },
  },

  // ── G. OWNERSHIP ─────────────────────────────────────────────────────────
  // What they have, in their own hands. The softener arrives here as something
  // extra rather than as a fourth thing they were required to learn.
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
  acquisitionDemandItemIds: [
    "chunk-bonjour",
    "chunk-je-voudrais",
    "noun-cafe",
    "chunk-sil-vous-plait",
  ],
  estimatedMinutes: 3,
  canDo: "Order a coffee politely in a French café.",
  whyItExists:
    "First real French moment. One complete natural sentence, built from three pieces the learner has just met, before any grammar architecture exists.",
  prerequisites: [],
  learningItems: getItems([
    "chunk-bonjour",
    "chunk-je-voudrais",
    "noun-cafe",
    "chunk-sil-vous-plait",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "L0 is reached from first use, never from the Journey list: `isV1LessonInStageScope` starts at 1 and `phase: first-step` is what the route and the completion view key on.",
    "The L1 architecture chunk is intentionally absent from L0. L1 introduces it as the active target.",
    "One PRODUCTION screen only. The open Say It that used to follow the Weave is gone: a first taste that tests twice is a test, and open production starts in L1. The recognition fill before it is a ramp, not a second test, and its reveal stops at the piece so it cannot hand over the Weave's answer.",
    "s'il vous plaît stays L0's fourth declared piece and keeps its own meet card, because a declared demand with no teaching encounter would ask for language nobody taught. It is NOT marked required on the Weave, which accepts the order with or without it: met as a gift, never as a hurdle.",
    "No XP / streak / level-up / mission complete copy.",
    "Vous register throughout — informal tu is L1+ territory.",
  ],
  qaChecks: [
    "TTS reads Bonjour, je voudrais, un café and the full sentence cleanly.",
    "The Showcase chips read bonjour / je voudrais / un café, and each opens its own micro-reveal.",
    "Look Closer opens with Sound, Notice and Usage, and In depth is absent rather than empty.",
    "No theatrical positivity tokens (Amazing/Perfect/Crushed).",
    "Apostrophe normalization handles curly quotes in s'il vous plaît; the unaccented cafe variant passes Weave.",
  ],
};
