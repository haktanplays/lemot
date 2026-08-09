/**
 * L21 - What you think of it. The evaluation Doorway, and the answer L18
 * shipped without.
 *
 * ONE new word. The lesson exists to close the loop L18 opened: the learner has
 * been able to ask `Le café, c'est comment ?` since L18 and has had no owned
 * French answer, because canon recorded that the question takes none. L21 hands
 * them that answer and stops.
 *
 * ARCHITECTURE. No goal card: the exchange itself is the orientation, so s00 is
 * the meet-card and the answer arrives in context before anything is explained.
 * That is a deliberate departure from L1-L20 (only L0 opened on a meet-card)
 * and it is what a one-word doorway can afford.
 *
 * COMPOSITIONALITY, not a phrase. `bon` survives while the host and the role
 * change around it: positive answer (s01), negative by meaning (s02), negative
 * produced (s03), volunteered evaluation (s04), inside a fuller moment (s05).
 * If `adj-bon` were replaced by a whole `chunk-c-est-bon`, s02 through s05 would
 * all break.
 *
 * OWNERSHIP. The only acquisition is `adj-bon`. `chunk-c-est` is ridden exactly
 * as L18, L19 and L20 ride it - targeted, never required, nothing new claimed -
 * and the negative rides `chunk-ce-n-est-pas`, which IS an L3 demand. No copy
 * says `c'est` is new, because it is not.
 *
 * FRENCH QA: the one identity is founder_waived_provisional. The sentences are
 * unreviewed, as all French in this repo is - no named-human review exists.
 */
import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-meet-the-answer-arrives",
    type: "meet-card",
    targetItemIds: ["adverb-comment", "chunk-c-est", "noun-cafe", "adj-bon"],
    evidenceTargetItemIds: ["adj-bon"],
    payload: {
      fr: "Le café, c'est comment ?\nC'est bon.",
      en: "What's the coffee like?\nIt's good.",
      title: "You already know the question. Here is the answer.",
      highlights: [
        { text: "c'est comment", itemId: "adverb-comment" },
        { text: "bon", itemId: "adj-bon" },
      ],
      tts: true,
    },
  },
  {
    id: "s01-weave-answer-them",
    type: "weave",
    targetItemIds: ["adj-bon", "chunk-c-est"],
    evidenceTargetItemIds: ["adj-bon"],
    payload: {
      weaveType: "mid",
      prompt: "Answer them. Say what you thought of it.",
      context:
        "A friend sees the coffee in your hand and asks: Le café, c'est comment ?",
      suggestedPieces: [{ text: "c'est", itemId: "chunk-c-est", label: "it is" }],
      expectedAnswers: ["C'est bon."],
      acceptedAlternatives: ["C'est bon", "Le café, c'est bon.", "Le café, c'est bon"],
      reveal: {
        modelAnswer: "C'est bon.",
        ifCorrect: "That is the answer, and it is the one people actually give.",
        ifCorrectButFlat:
          "Le café, c'est bon. works too, though they have just named it themselves.",
        ifMissingTargetPiece: "C'est, then the word for what you thought of it.",
        naturalAlternatives: ["Le café, c'est bon."],
        explanation: "You have been able to ask this for a while. Now you can answer it.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s02-fill-a-different-day",
    type: "fill-with-traps",
    targetItemIds: ["adj-bon", "chunk-ce-n-est-pas", "chunk-c-est", "chunk-ca-va"],
    evidenceTargetItemIds: ["adj-bon", "chunk-ce-n-est-pas"],
    payload: {
      prompt:
        "Same question, another day. The coffee was cold and you left most of it. Which line is yours?",
      sentenceBefore: "Le café, c'est comment ? ",
      sentenceAfter: "",
      blankCount: 1,
      options: [
        { id: "opt-negative", text: "Ce n'est pas bon.", isCorrect: true },
        {
          id: "opt-positive",
          text: "C'est bon.",
          isCorrect: false,
          trapReason: "That is the honest answer on a good day. This one was not.",
        },
        {
          id: "opt-ca-va",
          text: "Ça ne va pas.",
          isCorrect: false,
          trapReason: "Ça ne va pas says how a person is doing. They asked about the coffee.",
        },
      ],
      answer: ["opt-negative"],
      reveal: {
        short: "Ce n'est pas bon.",
        explanation: "The ne and the pas wrap this the same way they wrap everything else.",
        natural: "Ce n'est pas bon.",
      },
    },
  },
  {
    id: "s03-weave-say-it-honestly",
    type: "weave",
    targetItemIds: ["adj-bon", "chunk-ce-n-est-pas"],
    evidenceTargetItemIds: ["adj-bon", "chunk-ce-n-est-pas"],
    payload: {
      weaveType: "context",
      prompt: "Tell them before they order. Say what you thought of it.",
      context:
        "Your friend is about to order the same coffee. You had it yesterday and left half of it.",
      suggestedPieces: [
        { text: "ce n'est pas", itemId: "chunk-ce-n-est-pas", label: "it is not" },
      ],
      expectedAnswers: ["Ce n'est pas bon."],
      acceptedAlternatives: [
        "Ce n'est pas bon",
        "Le café, ce n'est pas bon.",
        "Le café, ce n'est pas bon",
      ],
      reveal: {
        modelAnswer: "Ce n'est pas bon.",
        ifCorrect: "Honest without being rude. That is how it lands in French.",
        ifCorrectButFlat:
          "Le café, ce n'est pas bon. names it, which helps if they do not know what you mean.",
        ifMissingTargetPiece: "Ce n'est pas, then the same word as before.",
        naturalAlternatives: ["Le café, ce n'est pas bon."],
        explanation: "Same word, opposite answer. Nothing else moved.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s04-weave-nobody-asked",
    type: "weave",
    targetItemIds: ["adj-bon", "chunk-c-est", "noun-cafe"],
    evidenceTargetItemIds: ["adj-bon"],
    payload: {
      weaveType: "open",
      prompt: "Nobody asked. Say it anyway.",
      context:
        "You are sitting down with a coffee from a place your friend has never tried, and you want them to know.",
      expectedAnswers: ["Le café, c'est bon."],
      acceptedAlternatives: ["Le café, c'est bon", "C'est bon.", "C'est bon"],
      reveal: {
        modelAnswer: "Le café, c'est bon.",
        ifCorrect: "You said it first. Nobody had to ask you.",
        ifCorrectButFlat: "C'est bon. on its own is enough when the coffee is right there.",
        ifMissingTargetPiece: "Name the café first, then say what you think of it.",
        naturalAlternatives: ["C'est bon."],
        explanation:
          "When someone has just named the thing, C'est bon. is enough. When nobody has, say which thing you mean.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-sayit-into-the-moment",
    type: "say-it-your-way",
    targetItemIds: ["chunk-bonjour", "adverb-comment", "chunk-ca-va", "chunk-c-est", "adj-bon", "noun-cafe"],
    evidenceTargetItemIds: ["adj-bon"],
    payload: {
      situation:
        "You run into someone you know outside the café. Say hello, ask how they are, and tell them what you thought of the coffee. Whether it was good or not is yours.",
      communicativeGoal: "Write your side of it, greeting and all.",
      modelAnswer: "Bonjour ! Comment ça va ? Le café, c'est bon.",
      reveal: {
        modelAnswer: "Bonjour ! Comment ça va ? Le café, c'est bon.",
        naturalAlternatives: [
          "Bonjour ! Ça va ? Le café, c'est bon.",
          "Bonjour ! Comment ça va ? Le café, ce n'est pas bon.",
        ],
        explanation:
          "Whether it was good or not is yours to say. The rest of it you have been able to do for a while.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s06-natural-reveal-the-other-half",
    type: "natural-reveal",
    targetItemIds: ["adj-bon", "adverb-comment", "chunk-ce-n-est-pas"],
    evidenceTargetItemIds: ["adj-bon"],
    payload: {
      explanation:
        "You have known how to ask what a thing is like for a while now, and then had nothing to answer with when it came back to you.\n" +
        "One word changed that. Not every answer, and not a way of describing things. One honest answer, and its opposite, for the question you already knew how to ask.",
      naturalAlternatives: ["C'est bon.", "Ce n'est pas bon.", "Le café, c'est bon."],
    },
  },
  {
    id: "s07-recap-you-can-answer-now",
    type: "recap",
    payload: {
      title: "You can answer it now.",
      lines: [
        "Someone asked what the café was like, and you told them.",
        "One day it was good, another day it was not, and you said so both times.",
        "Then you said what you thought before anyone asked you.",
      ],
      piecesUsed: ["bon", "c'est", "ce n'est pas", "comment"],
      nextLabel: "Continue",
    },
  },
];

export const lesson021: Lesson = {
  id: "v1-lesson-021",
  version: "v1",
  number: 21,
  title: "What you think of it",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "thematic-context",
  secondaryArchetype: "chunk-natural-speech",
  journeyRole: "doorway",
  acquisitionDemandItemIds: ["adj-bon"],
  estimatedMinutes: 5,
  canDo:
    "Say what I think of something in French - that it is good, or not - and answer when someone asks me what a thing is like.",
  whyItExists:
    "L18 taught the learner to ask Le café, c'est comment ? and shipped it with no owned French answer; canon recorded that the question takes none, because no evaluative word was owned and none was invented. L21 gives them that answer and nothing else. It is the first lesson after the L20 Milestone, so it must feel like opening a door rather than going back to beginner drills: the learner meets no new frame, they finally get to complete an exchange they have been able to start since L18. The ownership unit is the WORD, following L18 exactly - no host frame becomes an identity.",
  prerequisites: ["v1-lesson-020"],
  learningItems: getItems([
    "adj-bon",
    "chunk-c-est",
    "chunk-ce-n-est-pas",
    "adverb-comment",
    "noun-cafe",
    "chunk-ca-va",
    "chunk-bonjour",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "One acquisition demand: adj-bon. Every other French surface is recycled from shipped L0-L20 and no identity was added.",
    "chunk-c-est is NOT promoted and nothing here claims it is. It is targeted and offered as an optional hint piece at s01, exactly as L18, L19 and L20 ride it, and no learner copy, reveal or recap line says it is new. The negative rides chunk-ce-n-est-pas, which IS an L3 acquisition demand, so one host of bon is fully owned.",
    "No goal card. The exchange itself is the orientation: s00 is a meet-card carrying the question the learner already owns and the answer they do not, so context arrives before anything is explained. Only L0 opens this way; L1-L20 all open on a goal insight-card. A one-word doorway can afford it and does not need the ceremony.",
    "Compositionality, not a phrase: bon survives while the host and the role change around it. s01 positive answer, s02 negative chosen by meaning, s03 negative produced, s04 volunteered evaluation, s05 inside a fuller moment. If adj-bon were a frozen chunk-c-est-bon instead, s02 through s05 would all break.",
    "Both communicative roles are present and distinct: ANSWER at s01 and s02 (someone asked), VOLUNTEERED at s04 and s05 (nobody asked). The answer form is bare C'est bon. where the question has just named the referent; the topic-fronted Le café, c'est bon. is the volunteered form. That asymmetry is lived, never explained as grammar.",
    "Support falls 3, 2, 1, 0 and never opens above mid. The two optional pieces carry the HOST (c'est at s01, ce n'est pas at s03) and never bon, so the hint ladder cannot hand the learner the one new word. No hintCloze anywhere, and no piece is required.",
    "Polysemy is fenced by context, never explained. C'est bon. also means that's enough / that's fine in everyday French, so every use here evaluates a nameable owned thing and no screen involves handing something over, confirming completion or a quantity, or deciding to stop. Le café is the DRINK throughout, deliberately: bon is most idiomatic about taste, which makes every occurrence unambiguously evaluative. Shipped L18 and L19 frame the same sentence as the venue; the French is identical and the learner owns both readings, and the drink reading here is founder-approved. No L18 or L19 content changed, and the polysemy is never explained to the learner.",
    "No general rule is taught. Nothing says put an adjective after c'est, no second adjective appears anywhere, and the s02 trap Ça ne va pas. exists to keep the person side and the thing side apart by meaning rather than by rule.",
    "The s06 reveal deliberately refuses the overclaim: one honest answer and its opposite, NOT a way of describing things and NOT an answer to every C'est comment ?.",
    "No screen carries weakPointTags. adj-bon has no registry tag on purpose - its owned use is invariable predicate bon and gender is not being taught - and screen-level tags have no runtime consumer.",
  ],
  qaChecks: [
    "The one new identity carries founder-waived provisional French QA. The sentences themselves are unreviewed, as all repo French is - no named-human review exists anywhere and none is claimed.",
    "Smoke first: does the lesson read as closing a loop rather than as adding an adjective? If a tester cannot say which earlier question it answers, s00 and s06 have failed.",
    "Check no copy implies c'est is newly owned, that any adjective may follow it, or that every C'est comment ? now has an answer.",
    "Check every C'est bon. reads as it is good and never as that is enough.",
  ],
};
