/**
 * L23 - Let the answer decide. The transaction under a condition, and then
 * reported.
 *
 * Authored by SELECTING and sequencing material from a scratch Surface
 * Inventory (ownership -> sentence families -> screens) rather than
 * screen-first; no French surface here was absent from that inventory. The
 * inventory itself is review provenance and is deliberately not tracked.
 *
 * NOTHING NEW. The lesson's job is that a fact the learner OBTAINED BY ASKING
 * decides what they say next - which no shipped lesson has ever required. The
 * board answers their question, and the board decides whether ordering is the
 * right move.
 *
 * MODEL T, two beats welded by consequence. s00-s02 are the counter: ask, then
 * the same question under two different numbers with two different correct
 * actions. s03 is afterwards, and it exists ONLY because s01 ended in a
 * purchase - a learner who left has nothing to report.
 *
 * THE EXIT IS THE WHOLE WELD IN ONE PERFORMANCE: the learner asks, the board
 * sends them to the order, and because they bought that coffee and drank it
 * they can answer their friend afterwards. The no-buy branch is NOT repeated
 * there - it is already load-bearing at s02 - and the reveal names it as what
 * a different number on the board would have produced instead.
 *
 * DRINK, NOT VENUE. `Le café, c'est comment ?` can mean either in French, and
 * this lesson never explains that. Every reporting context therefore names the
 * COFFEE and says the learner drank it; none of them identifies the evaluated
 * thing as a place.
 *
 * NO MEET-CARD. Nothing is new to meet, and a modelled counter exchange would
 * pre-print the exit route. L20 is the precedent for shipping without one.
 *
 * PRICES ARE READ, NEVER SAID. Two numerals, each earning a distinct route, on
 * screen types that render no speech. The learner owns no number word and never
 * reports a price.
 *
 * FRENCH QA: L23 adds no identity, so no identity-level debt. The sentences are
 * unreviewed, as all French in this repo is - no named-human review exists.
 */
import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-weave-ask-at-a-new-place",
    type: "weave",
    targetItemIds: ["adverb-combien", "chunk-c-est", "chunk-un-cafe"],
    evidenceTargetItemIds: ["adverb-combien"],
    payload: {
      weaveType: "context",
      prompt: "Ask before you decide anything.",
      context:
        "A place you have never been in. There is a board behind the counter but you cannot read it from here, and you would like a coffee.",
      expectedAnswers: ["Un café, c'est combien ?"],
      acceptedAlternatives: [
        "Un café c'est combien ?",
        "Un café c'est combien",
        "Un café, c'est combien",
        "C'est combien ?",
        "C'est combien",
      ],
      reveal: {
        modelAnswer: "Un café, c'est combien ?",
        ifCorrect: "Now you know something you did not know a second ago.",
        ifCorrectButFlat: "C'est combien ? works too once you are standing in front of the coffee.",
        ifMissingTargetPiece: "Name what you want, then ask what it costs.",
        naturalAlternatives: ["C'est combien ?"],
        explanation: "Everything you say after this depends on their answer.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s01-weave-that-is-the-usual-price",
    type: "weave",
    targetItemIds: ["chunk-je-voudrais", "chunk-un-cafe", "chunk-sil-vous-plait"],
    evidenceTargetItemIds: ["chunk-je-voudrais"],
    payload: {
      weaveType: "open",
      prompt: "That is what a coffee costs. Say what you want.",
      context: "They point at the board. It says 2 €, which is what you expected to pay.",
      expectedAnswers: ["Je voudrais un café, s'il vous plaît."],
      acceptedAlternatives: [
        "Je voudrais un café, s'il vous plaît",
        "Je voudrais un café s'il vous plaît.",
        "Je voudrais un café.",
        "Je voudrais un café",
      ],
      reveal: {
        modelAnswer: "Je voudrais un café, s'il vous plaît.",
        ifCorrect: "You asked first, and the answer told you this was the right thing to say.",
        ifCorrectButFlat: "Je voudrais un café. is enough once they are already listening.",
        ifMissingTargetPiece: "The order you have had since the beginning: je voudrais, then what you want.",
        naturalAlternatives: ["Je voudrais un café."],
        explanation: "Say this after a different number on the board and it would be the wrong move.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s02-weave-not-at-that-price",
    type: "weave",
    targetItemIds: ["chunk-merci", "chunk-au-revoir"],
    evidenceTargetItemIds: ["chunk-au-revoir"],
    payload: {
      weaveType: "open",
      prompt: "Not for that. Close it and go.",
      context:
        "Another place, another morning. You asked the same question, and this board says 8 €. That is far more than you will pay for a coffee.",
      expectedAnswers: ["Merci, au revoir."],
      acceptedAlternatives: ["Merci, au revoir", "Merci. Au revoir.", "Merci. Au revoir"],
      reveal: {
        modelAnswer: "Merci, au revoir.",
        ifCorrect: "Nobody expects a reason. You thank them and you go.",
        ifCorrectButFlat: "Merci. Au revoir. as two short lines does the same thing.",
        ifMissingTargetPiece: "You already have both halves of this. Thank them, then say goodbye.",
        naturalAlternatives: ["Merci. Au revoir."],
        explanation:
          "Same question as before, a different number, and now the polite thing to say is the opposite one.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s03-weave-the-one-you-did-buy",
    type: "weave",
    targetItemIds: ["adj-bon", "chunk-c-est", "chunk-ce-n-est-pas", "adverb-comment", "noun-cafe"],
    evidenceTargetItemIds: ["adj-bon"],
    payload: {
      weaveType: "open",
      prompt: "Tell them. Only you know which one is true.",
      context:
        "The 2 € coffee. You drank it, and you have already told your friend what it cost. Now they want to know the other thing about it, and they ask: Le café, c'est comment ?",
      expectedAnswers: ["C'est bon."],
      acceptedAlternatives: [
        "C'est bon",
        "Ce n'est pas bon.",
        "Ce n'est pas bon",
        "Le café, c'est bon.",
        "Le café, ce n'est pas bon.",
      ],
      reveal: {
        modelAnswer: "C'est bon.",
        ifCorrect: "You can only say that because you bought it.",
        ifCorrectButFlat: "Ce n'est pas bon. is just as good an answer if that is what it was.",
        ifMissingTargetPiece: "They have already named it. C'est, then what you thought of it.",
        naturalAlternatives: ["Ce n'est pas bon."],
        explanation:
          "The 8 € coffee, you still cannot say anything about. You never tasted it.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s04-sayit-the-whole-thing-and-after",
    type: "say-it-your-way",
    targetItemIds: [
      "chunk-bonjour",
      "adverb-combien",
      "chunk-c-est",
      "chunk-un-cafe",
      "chunk-je-voudrais",
      "chunk-sil-vous-plait",
      "chunk-merci",
      "adj-bon",
      "chunk-ce-n-est-pas",
      "noun-cafe",
      "adverb-comment",
    ],
    // Intersection of the three accepted routes, not the model route. Every
    // accepted route contains these eight; chunk-ce-n-est-pas appears in only
    // one of them, and noun-cafe / adverb-comment are the friend's supplied
    // question, which the learner reads and never produces. Same discipline as
    // shipped v1-lesson-020's exit.
    evidenceTargetItemIds: [
      "chunk-bonjour",
      "adverb-combien",
      "chunk-c-est",
      "chunk-un-cafe",
      "chunk-je-voudrais",
      "chunk-sil-vous-plait",
      "chunk-merci",
      "adj-bon",
    ],
    payload: {
      situation:
        "A different morning, and you have five minutes. You go in wanting a coffee, you ask, and the board says 2 €, which is the ordinary price, so you buy it and you drink it standing at the counter. Later that morning a friend asks you about the coffee you had: Le café, c'est comment ? Write your side of all of it, the counter first, then what you tell them.",
      communicativeGoal:
        "Write your side of it. What you say at the counter, and then what you tell your friend.",
      modelAnswer:
        "Bonjour ! Un café, c'est combien ? Je voudrais un café, s'il vous plaît. Merci. C'est bon.",
      reveal: {
        modelAnswer:
          "Bonjour ! Un café, c'est combien ? Je voudrais un café, s'il vous plaît. Merci. C'est bon.",
        naturalAlternatives: [
          "Bonjour ! Un café, c'est combien ? Je voudrais un café, s'il vous plaît. Merci. Ce n'est pas bon.",
          "Bonjour ! C'est combien ? Je voudrais un café, s'il vous plaît. Merci. C'est bon.",
        ],
        explanation:
          "Two moments in one, and the second one only exists because of the first. The board sent you to the order, and because you bought that coffee and drank it you have something to tell your friend afterwards. Ce n'est pas bon. is just as true an ending if that is how it was: the price decided whether you bought it, not whether you liked it. Put 8 € on that board instead and you would have said Merci, au revoir. and had nothing to tell them at all.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s05-natural-reveal-the-answer-decided-it",
    type: "natural-reveal",
    targetItemIds: ["adverb-combien", "chunk-je-voudrais", "chunk-au-revoir", "adj-bon"],
    // No evidence narrowing on purpose. A natural-reveal is exposure, not a
    // learner action, and the three lines it shows are three different beats of
    // the lesson - narrowing to one of them would credit an item that is absent
    // from two of the surfaces the screen actually displays. The reporting beat
    // is carried by the prose here rather than by a fourth line, because the
    // learner has just produced that clause themselves at the exit.
    payload: {
      explanation:
        "Until now, everything you said in French was something you had decided to say. Today you asked a question and let the answer decide for you: the same three words at the counter, and two different endings.\n" +
        "It carries further than the counter. You can say what that coffee was like because you bought it and drank it. The 8 € one you never tasted, so there is still nothing you can say about it.",
      naturalAlternatives: [
        "Un café, c'est combien ?",
        "Je voudrais un café, s'il vous plaît.",
        "Merci, au revoir.",
      ],
    },
  },
  {
    id: "s06-recap-you-let-the-answer-decide",
    type: "recap",
    payload: {
      title: "You let the answer decide.",
      lines: [
        "You asked what a coffee costs before you said anything else.",
        "One board sent you to the order, another sent you to the door, and you were polite both times.",
        "Afterwards you could say what the coffee you bought was like.",
      ],
      piecesUsed: ["combien", "je voudrais", "merci", "au revoir", "bon"],
      nextLabel: "Continue",
    },
  },
];

export const lesson023: Lesson = {
  id: "v1-lesson-023",
  version: "v1",
  number: 23,
  title: "Let the answer decide",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "review-integration",
  secondaryArchetype: "thematic-context",
  journeyRole: "integration",
  acquisitionDemandItemIds: [],
  estimatedMinutes: 6,
  canDo:
    "Ask what something costs, decide what to do about the answer, and tell someone afterwards how it was.",
  whyItExists:
    "Across every shipped exit - L16, L19, L20, L21, L22 - one thing has never been asked: the learner has never had to let information they RECEIVED decide what they say next. L19 comes closest, but its input is a person's mood and every route stays acceptable. L23's job is the transaction under a CONDITION, and then reported: the price the learner asks for determines whether ordering is the right ending, and what they can truthfully say about the coffee afterwards depends on whether they bought it. This matters because shipped L22's exit already runs the transaction end to end, so L23 cannot be that list again with one sentence added. Nothing new is introduced; what changes is that the moves now depend on each other.",
  prerequisites: ["v1-lesson-022"],
  learningItems: getItems([
    "adverb-combien",
    "chunk-c-est",
    "chunk-un-cafe",
    "noun-cafe",
    "chunk-je-voudrais",
    "chunk-sil-vous-plait",
    "chunk-bonjour",
    "chunk-merci",
    "chunk-au-revoir",
    "adj-bon",
    "chunk-ce-n-est-pas",
    "adverb-comment",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Zero acquisition demands. Every French surface is recycled from shipped L0-L22 and no identity was added. Where a scene wanted a word the learner does not own - a price adjective, a refusal - the SCENE changed, never the demand count.",
    "Authored from a scratch Surface Inventory: ownership, then sentence families, then screens. Every French surface here is drawn from that inventory; nothing was invented at screen-writing time.",
    "The lesson's job is CONSEQUENCE. s00 asks, s01 and s02 are the same question under two different numbers with two different correct actions, and s03 exists only because s01 ended in a purchase. Four of the five production beats depend on the beat or the board before them.",
    "s01 and s02 are the branch made visible: identical question, 2 EUR versus 8 EUR, and the French that is right in one is wrong in the other. The condition is carried in English; no French explains or judges a price, because no price adjective is owned and none was invented.",
    "s03 is the weld. Its context names the 2 EUR coffee, states that the learner drank it and that they have already told their friend the price, and the friend's question is the L18 question they own. Lifted into another lesson the screen would make no sense, which is the test it has to pass.",
    "The exit carries the whole Model T weld by itself: favourable board, order, and then the report to a friend about the coffee that order produced. Nothing else in the corpus asks a learner to run a transaction and then say something that is only sayable because the transaction happened. The no-buy branch is deliberately absent from the exit - it is already load-bearing at s02 - and the reveal names it as the counterfactual, so the condition stays visible without being re-proved.",
    "The exit's two beats are separated in ENGLISH, not in French. The situation states the purchase, states that the learner drank it, and supplies the friend's question, so the French stays present-tense and entirely on the learner's side. No connective, no narration, no past tense, and the other speaker is never scripted inside the answer.",
    "No meet-card. Nothing is new to meet, and a modelled counter exchange would pre-print the exit route. L20 is the precedent for shipping without one. That also means no screen in this lesson renders speech at all.",
    "PRICES ARE READ, NEVER SAID. Two numerals, each earning a distinct route, in English context on weave and say-it screens, which render no speech. No French number word or currency word appears, the numerals carry no itemId, and the learner never reports a price - they own no number word, which is exactly why the lesson has them act on a price rather than repeat one.",
    "Support opens at context and falls to unsupplied production: 2, 1, 1, 1, 0. Nothing is new, so nothing opens at supported or mid, and no piece is supplied anywhere.",
    "Agency and condition are kept apart, including inside a single screen. s01 and s02 are CONDITION-DETERMINED - the board decides, and the learner has no choice. s03 is TRUE AGENCY, both C'est bon. and Ce n'est pas bon. being the learner's own truth. The exit is MIXED on purpose: the 2 EUR board determines that the learner orders, and determines nothing at all about how the coffee tasted, so the last clause stays theirs and both verdicts are accepted.",
    "No coverage sweep. ca va, je suis, il faut, je peux, on y va, y and est-ce que are all available and none appears. A social opening with a state answer would be L19, not this.",
    "No screen carries weakPointTags: screen-level tags have no runtime consumer.",
  ],
  qaChecks: [
    "L23 adds no identity, so it adds no identity-level French QA debt. The sentences are unreviewed, as all repo French is - no named-human review exists anywhere and none is claimed.",
    "Smoke first: does s02 read as the RIGHT thing to say rather than a shrug? If leaving politely feels like giving up rather than a decision, the condition copy is too weak.",
    "Check that no screen implies the learner understood a spoken price, and that no numeral reaches text-to-speech. No screen in this lesson speaks at all.",
    "Check s03 cannot be read without s01. If it works as a standalone cafe chat, the weld has failed and the lesson is two mini-lessons.",
    "Check the exit reads as two moments and not one breathless utterance. If a tester writes the whole thing as though the friend were standing at the counter, the English transition is doing too little work.",
    "Check s03 still earns its place beside the exit. s03 practises the reporting move against a purchase the LESSON made at s01; the exit asks the learner to produce the purchase and the report themselves. If a tester can skip s03 with no loss, the reporting move was never actually rehearsed.",
    "Check no copy claims a checkpoint, a completed arc, or anything about Campfire. That is L24's job, not this one's.",
  ],
};
