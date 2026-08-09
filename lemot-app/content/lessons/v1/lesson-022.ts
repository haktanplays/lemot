/**
 * L22 - Before you order. The price question, and the beat that turns L0's
 * order into a decision.
 *
 * Authored by SELECTING and sequencing material from a scratch Surface
 * Inventory (canonical items -> sentence families -> screens) rather than
 * screen-first; no French surface here was absent from that inventory. The
 * inventory itself is review provenance and is deliberately not tracked.
 *
 * ONE new word. The learner has ordered a coffee since L0 and has never known
 * what it costs. L22 supplies the beat before the order, in the end slot they
 * already control - `ou` has sat there since L8, `comment` since L18.
 *
 * WORD, NOT FROZEN QUESTION. s02 is the load-bearing evidence: the host is held
 * completely still (`Le café, c'est ___`) and only the final word moves, across
 * a question that asks the price, a question that asks what it is like, and a
 * statement that asks nothing. A frozen `chunk-c-est-combien` cannot take part
 * in that contrast at all.
 *
 * THE ARC, not a drill: greet, ask, SEE the price, decide, order or leave. The
 * price is a numeral the learner READS (s04) - never a French word, never
 * spoken, never produced. The only tts screen is s00, and it carries the
 * question alone with no numeral on it.
 *
 * FRENCH QA: the one identity is founder_waived_provisional. The sentences are
 * unreviewed, as all French in this repo is - no named-human review exists.
 */
import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-meet-the-question-you-never-had",
    type: "meet-card",
    targetItemIds: ["adverb-combien", "chunk-c-est", "chunk-un-cafe", "noun-cafe"],
    evidenceTargetItemIds: ["adverb-combien"],
    payload: {
      fr: "Un café, c'est combien ?",
      en: "How much is a coffee?",
      title: "You have been ordering coffee since your first lesson. You have never asked what it costs.",
      highlights: [
        { text: "Un café", itemId: "chunk-un-cafe" },
        { text: "combien", itemId: "adverb-combien" },
      ],
      tts: true,
    },
  },
  {
    id: "s01-weave-ask-at-the-counter",
    type: "weave",
    targetItemIds: ["adverb-combien", "chunk-c-est", "chunk-un-cafe"],
    evidenceTargetItemIds: ["adverb-combien"],
    payload: {
      weaveType: "mid",
      prompt: "Ask what it costs. Nothing is written up, so say which thing you mean.",
      context:
        "You are at a counter you have not been to before. You want a coffee, but not at any price.",
      suggestedPieces: [{ text: "c'est", itemId: "chunk-c-est", label: "it is" }],
      expectedAnswers: ["Un café, c'est combien ?"],
      acceptedAlternatives: [
        "Un café c'est combien ?",
        "Un café c'est combien",
        "Un café, c'est combien",
        "Le café, c'est combien ?",
        "Le café, c'est combien",
      ],
      reveal: {
        modelAnswer: "Un café, c'est combien ?",
        ifCorrect: "Name the thing, then ask. That is the whole question.",
        ifCorrectButFlat: "Le café, c'est combien ? works too when you both know which café you mean.",
        ifMissingTargetPiece: "Un café, then c'est, then the word for what you want to know.",
        naturalAlternatives: ["Le café, c'est combien ?"],
        explanation: "The same shape you already use to ask where something is and what it is like.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s02-fill-three-things-you-could-ask",
    type: "fill-with-traps",
    targetItemIds: ["adverb-combien", "adverb-comment", "adj-bon", "chunk-c-est", "noun-cafe"],
    evidenceTargetItemIds: ["adverb-combien"],
    payload: {
      prompt:
        "You have been here before, so you already know the coffee is good. There is one thing you still do not know. Which line gets it for you?",
      sentenceBefore: "",
      sentenceAfter: "",
      blankCount: 1,
      options: [
        { id: "opt-combien", text: "Le café, c'est combien ?", isCorrect: true },
        {
          id: "opt-comment",
          text: "Le café, c'est comment ?",
          isCorrect: false,
          trapReason: "That asks what it is like. You already know that part.",
        },
        {
          id: "opt-bon",
          text: "Le café, c'est bon.",
          isCorrect: false,
          trapReason: "That tells them what you think. It does not ask them anything.",
        },
      ],
      answer: ["opt-combien"],
      reveal: {
        short: "Le café, c'est combien ?",
        explanation:
          "Same words in front, right up to the last one. What changes is what you walk away knowing.",
        natural: "Le café, c'est combien ?",
      },
    },
  },
  {
    id: "s03-weave-you-already-named-it",
    type: "weave",
    targetItemIds: ["adverb-combien", "chunk-c-est"],
    evidenceTargetItemIds: ["adverb-combien"],
    payload: {
      weaveType: "context",
      prompt: "Ask the other thing. They know which coffee you mean, so keep it short.",
      context:
        "You asked what the coffee was like and they told you it was good. You are still standing there.",
      expectedAnswers: ["C'est combien ?"],
      acceptedAlternatives: ["C'est combien", "Combien ?", "Combien"],
      reveal: {
        modelAnswer: "C'est combien ?",
        ifCorrect: "Two words, because the coffee is already what you are both talking about.",
        ifCorrectButFlat: "Combien ? on its own works when you are pointing at the thing.",
        ifMissingTargetPiece: "You do not have to name it again. C'est, then the word.",
        naturalAlternatives: ["Combien ?"],
        explanation: "Naming it again would not add anything. They are already looking at it.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s04-weave-now-decide",
    type: "weave",
    targetItemIds: ["chunk-je-voudrais", "chunk-un-cafe", "chunk-sil-vous-plait"],
    evidenceTargetItemIds: ["chunk-je-voudrais"],
    payload: {
      weaveType: "open",
      prompt: "That is fine. Order it.",
      context: "You asked, and the price is up on the board where you can read it: 2 €.",
      expectedAnswers: ["Je voudrais un café, s'il vous plaît."],
      acceptedAlternatives: [
        "Je voudrais un café, s'il vous plaît",
        "Je voudrais un café s'il vous plaît.",
        "Je voudrais un café.",
      ],
      reveal: {
        modelAnswer: "Je voudrais un café, s'il vous plaît.",
        ifCorrect: "You asked first, and then you chose. That is the difference.",
        ifCorrectButFlat: "Je voudrais un café. is enough once you have their attention.",
        ifMissingTargetPiece: "The order you have had since the very beginning: je voudrais, then what you want.",
        naturalAlternatives: ["Je voudrais un café."],
        explanation:
          "This is the sentence you started with. Until today you said it without knowing what you were agreeing to.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-sayit-the-whole-counter",
    type: "say-it-your-way",
    targetItemIds: [
      "chunk-bonjour",
      "adverb-combien",
      "chunk-c-est",
      "chunk-un-cafe",
      "noun-cafe",
      "chunk-je-voudrais",
      "chunk-sil-vous-plait",
      "chunk-merci",
    ],
    evidenceTargetItemIds: ["adverb-combien"],
    payload: {
      situation:
        "A café you have walked past for weeks. You go in. Nothing is written up where you can see it. Take the whole counter yourself: say hello, find out what it costs, and then decide. Buying it is not the only ending.",
      communicativeGoal: "Write your side of it, from the door to the moment you turn around.",
      modelAnswer: "Bonjour ! Un café, c'est combien ? Je voudrais un café, s'il vous plaît.",
      reveal: {
        modelAnswer: "Bonjour ! Un café, c'est combien ? Je voudrais un café, s'il vous plaît.",
        naturalAlternatives: [
          "Bonjour ! C'est combien ? Je voudrais un café, s'il vous plaît. Merci.",
          "Bonjour ! Le café, c'est combien ? Merci.",
        ],
        explanation:
          "The last one asks and then leaves. That is still the question doing its job, and it is why you asked before you ordered.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s06-natural-reveal-you-asked-first",
    type: "natural-reveal",
    targetItemIds: ["adverb-combien", "adverb-comment", "chunk-je-voudrais"],
    evidenceTargetItemIds: ["adverb-combien"],
    payload: {
      explanation:
        "Je voudrais un café was the first thing you ever said in French, and every time since you have said it without knowing what it costs.\n" +
        "One word changed that. It sits where où and comment already sit, after c'est, and it is the difference between ordering and choosing.",
      naturalAlternatives: [
        "Un café, c'est combien ?",
        "C'est combien ?",
        "Le café, c'est combien ?",
      ],
    },
  },
  {
    id: "s07-recap-you-asked-before-you-ordered",
    type: "recap",
    payload: {
      title: "You asked before you ordered.",
      lines: [
        "You asked what a coffee costs, naming it and then without naming it.",
        "You picked the question that got you the one thing you did not know.",
        "You read the price, and then you decided.",
      ],
      piecesUsed: ["combien", "c'est", "un café", "je voudrais"],
      nextLabel: "Continue",
    },
  },
];

export const lesson022: Lesson = {
  id: "v1-lesson-022",
  version: "v1",
  number: 22,
  title: "Before you order",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "chunk-natural-speech",
  secondaryArchetype: "thematic-context",
  journeyRole: "standard",
  acquisitionDemandItemIds: ["adverb-combien"],
  estimatedMinutes: 6,
  canDo: "Ask how much something costs before I order it.",
  whyItExists:
    "The learner has been able to order since L0 - Je voudrais un café, s'il vous plaît - and has never been able to find out what it costs. L22 supplies the beat that comes BEFORE the order, using the question slot they already control: où has sat after c'est since L8 and comment since L18, and combien is the third occupant of that slot. The whole arc is owned except one word: ask the price, decide, order. Productive quantity is deliberately not here - every natural how-many formulation needs de, plural noun morphology, determiner deletion or en, all of which the pre-Campfire band reserves.",
  prerequisites: ["v1-lesson-021"],
  learningItems: getItems([
    "adverb-combien",
    "chunk-c-est",
    "chunk-un-cafe",
    "noun-cafe",
    "adverb-comment",
    "adj-bon",
    "chunk-je-voudrais",
    "chunk-sil-vous-plait",
    "chunk-bonjour",
    "chunk-merci",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "One acquisition demand: adverb-combien. Every other French surface is recycled from shipped L0-L21 and no identity was added.",
    "Authored from a scratch Surface Inventory rather than screen-first: canonical items -> sentence families -> screens. Every French surface here is drawn from that inventory; nothing was invented at screen-writing time.",
    "s02 is the load-bearing word-hood evidence. The host is held completely still - Le café, c'est ___ - and only the final word moves, across a price question, a what-is-it-like question and a statement that asks nothing. A frozen chunk-c-est-combien could not take part in that contrast, which is why the ownership unit is the WORD. The test is communicative intent, never translation, and no rule about question words is stated anywhere.",
    "adj-bon earns its place as the not-a-question option at s02, not as forced production. The learner never produces it here, and C'est bon. is never used about a price.",
    "chunk-c-est is NOT promoted and nothing claims it is. It is targeted and offered once as an optional hint piece at s01, exactly as L18-L21 ride it, and it is an evidence target nowhere.",
    "THE PRICE IS SEEN, NOT SAID. The numeral appears exactly once, in s04's English context, on a screen type that renders no speech. The only tts screen is s00, and it carries the question alone with no numeral on it - French TTS would read 2 EUR aloud as deux euros and smuggle in an undeclared form. No French number word or currency word appears anywhere, the price carries no itemId, and no copy says the learner understood a spoken price.",
    "Support falls 3, 2, 1, 0 and never opens above mid. The single optional piece at s01 carries the HOST (c'est) and never combien, so the hint ladder cannot hand the learner the one new word. No hintCloze anywhere, and no piece is required.",
    "The arc is the lesson: greet, ask, see the price, decide, order or leave. s04 produces the L0 order after the price is visible, which is the beat that makes combien transactional rather than a translation drill, and s05's third route asks and then walks away - not buying is one of the outcomes, and it costs no new material.",
    "Bare Combien ? is accepted at s03 where the referent is unmistakable, and is never the model answer.",
    "No screen carries weakPointTags. adverb-combien has no registry tag - no existing tag fits a question word, exactly as with adverb-comment - and screen-level tags have no runtime consumer.",
    "Productive quantity is absent by design. combien de + noun needs de, plural morphology and determiner deletion; none is owned, and none is hinted at.",
  ],
  qaChecks: [
    "The one new identity carries founder-waived provisional French QA. The sentences themselves are unreviewed, as all repo French is - no named-human review exists anywhere and none is claimed.",
    "Smoke first: does the price numeral ever reach text-to-speech? It must not. s00 is the only speaking screen and it carries no numeral.",
    "Check no copy implies combien is a general quantity word, that c'est is newly owned, or that the learner understood a spoken price.",
    "Check s02 reads as choosing what you want to know, never as swapping one adverb for another.",
  ],
};
