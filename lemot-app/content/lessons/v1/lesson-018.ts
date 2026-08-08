/**
 * L18 - How is it? Question Expansion 2: the first question WORD this
 * curriculum owns as a word rather than as a frozen question.
 *
 * L12 owned the est-ce que mechanism and routed every question word to a later
 * Question Expansion 2. This is that lesson, and it opens exactly one: comment.
 *
 * Pre-flight cleared its contract against the real registry before a screen was
 * authored; the candidate then cleared every deterministic validator, and a
 * semantic review confirmed the two-host proof, the naturalness of all four
 * French lines, and the absence of slop. Naturalness and communicative
 * coherence were judged by review, not by a validator - no validator claims
 * them.
 *
 * HOST ASYMMETRY (founder ruling, the load-bearing rule here). Host A,
 * Comment ca va ?, is a social check-in and may take L17's owned answers. Host
 * B, C'est comment ? / Le cafe, c'est comment ?, does NOT inherit them: no
 * owned productive French answer exists and this lesson requires none. The
 * learner produces the QUESTION; meaning is carried by the situation and by
 * choosing which question fits. Answering Host B with ca va would silently
 * broaden a frozen chunk acquired at L17 as a personal-state formula.
 *
 * FRENCH QA: adverb-comment carries `founder_waived_provisional`. No named
 * human has read this French. It is internally reachable under the founder's
 * explicit risk acceptance for the tester APK, is NOT public / content-complete
 * ready, and the comprehensive human French QA pass remains mandatory before
 * any wider release.
 */
import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-how-is-it",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "How is it?",
      body:
        "Today: one new word.\n" +
        "By the end: you'll ask a person how they are, and ask what a place is like.\n" +
        "Main piece: comment.",
    },
  },
  {
    id: "s01-meet-comment-ca-va",
    type: "meet-card",
    targetItemIds: ["adverb-comment", "chunk-ca-va"],
    evidenceTargetItemIds: ["adverb-comment"],
    payload: {
      fr: "Comment ça va ?",
      en: "How's it going?",
      title: "You already ask Ça va ? One word in front makes it fuller.",
      highlights: [{ text: "Comment", itemId: "adverb-comment" }],
      tts: true,
    },
  },
  {
    id: "s02-weave-ask-a-person",
    type: "weave",
    targetItemIds: ["adverb-comment", "chunk-ca-va", "chunk-bonjour"],
    evidenceTargetItemIds: ["adverb-comment"],
    payload: {
      weaveType: "supported",
      prompt: "Greet them, then ask how they are.",
      context: "Someone you know is waiting outside a café.",
      suggestedPieces: [
        { text: "bonjour", itemId: "chunk-bonjour", label: "hello" },
        { text: "comment", itemId: "adverb-comment", required: true, label: "how" },
        { text: "ça va", itemId: "chunk-ca-va", label: "things are going" },
      ],
      expectedAnswers: ["Bonjour, comment ça va ?"],
      acceptedAlternatives: [
        "Bonjour ! Comment ça va ?",
        "Bonjour. Comment ça va ?",
        "Bonjour, comment ça va",
        "Comment ça va ?",
        "Comment ça va",
      ],
      reveal: {
        modelAnswer: "Bonjour, comment ça va ?",
        ifCorrect: "That is the question a French speaker actually opens with.",
        ifCorrectButFlat: "Ça va ? on its own works too. Comment ça va ? gives it a little more room.",
        ifMissingTargetPiece: "Comment goes first, then the ça va you already own.",
        naturalAlternatives: ["Comment ça va ?"],
        explanation:
          "You are not building anything new here. Comment sits in front of a phrase you have said many times.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s03-insight-two-questions-one-cafe",
    type: "insight-card",
    targetItemIds: ["adverb-comment", "chunk-c-est-ou", "adverb-ou-where"],
    evidenceTargetItemIds: ["adverb-comment"],
    payload: {
      insightType: "micro-contrast",
      title: "Two questions about the same café.",
      body:
        "When you cannot find the place, you ask Le café, c'est où ?\n" +
        "Put comment where où was, and you are asking something else: what the place is actually like.\n" +
        "You are not asking where any more. You are asking what to expect.",
      examples: [
        { fr: "Le café, c'est où ?", en: "Where is the café?" },
        { fr: "Le café, c'est comment ?", en: "What's the café like?" },
      ],
    },
  },
  {
    id: "s04-fill-which-word-asks",
    type: "fill-with-traps",
    targetItemIds: ["adverb-comment", "adverb-ou-where"],
    evidenceTargetItemIds: ["adverb-comment"],
    payload: {
      prompt: "You know exactly where the café is. You want to know what it is like. Which word asks that?",
      sentenceBefore: "Le café, c'est ",
      sentenceAfter: " ?",
      blankCount: 1,
      options: [
        { id: "opt-comment", text: "comment", isCorrect: true },
        {
          id: "opt-ou",
          text: "où",
          isCorrect: false,
          trapReason: "Où asks where it is. You already know that part.",
        },
        {
          id: "opt-ici",
          text: "ici",
          isCorrect: false,
          trapReason: "Ici says here. It answers a question about place; it cannot ask one.",
        },
      ],
      answer: ["opt-comment"],
      reveal: {
        short: "comment",
        explanation: "Comment asks what something is like. Où asks where it is.",
        natural: "Le café, c'est comment ?",
      },
    },
  },
  {
    id: "s05-weave-ask-about-a-place",
    type: "weave",
    targetItemIds: ["adverb-comment", "chunk-c-est", "noun-cafe"],
    evidenceTargetItemIds: ["adverb-comment"],
    payload: {
      weaveType: "mid",
      prompt: "Ask what the café is like.",
      context: "Your friend goes there all the time. You have never been.",
      suggestedPieces: [
        { text: "comment", itemId: "adverb-comment", required: true, label: "what ... like" },
      ],
      hintCloze: "Le café, c'est ___ ?",
      expectedAnswers: ["Le café, c'est comment ?"],
      acceptedAlternatives: [
        "Le café c'est comment ?",
        "Le café, c'est comment",
        "Le café, c'est comment?",
        "C'est comment ?",
        "C'est comment",
      ],
      reveal: {
        modelAnswer: "Le café, c'est comment ?",
        ifCorrect: "Now comment is doing a different job, at the other end of the question.",
        ifCorrectButFlat: "C'est comment ? on its own is fine when you both know what you mean.",
        ifUnderstandableButWrong:
          "Your meaning lands. Spoken French keeps it short: Le café, c'est comment ?",
        ifMissingTargetPiece: "Name the place first, then c'est, then comment at the end.",
        naturalAlternatives: ["C'est comment ?"],
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-weave-both-in-one-moment",
    type: "weave",
    targetItemIds: ["adverb-comment", "chunk-ca-va", "chunk-c-est", "noun-cafe"],
    evidenceTargetItemIds: ["adverb-comment"],
    payload: {
      weaveType: "context",
      prompt: "Ask them both things.",
      context:
        "Your friend is standing outside the café. You want to know how they are, and what the place is like.",
      suggestedPieces: [
        { text: "comment", itemId: "adverb-comment", label: "how / what ... like" },
      ],
      expectedAnswers: ["Comment ça va ? Le café, c'est comment ?"],
      acceptedAlternatives: [
        "Comment ça va ? Le café c'est comment ?",
        "Comment ça va ? C'est comment ?",
        "Comment ça va. Le café, c'est comment ?",
        "Comment ça va ? Le café, c'est comment",
      ],
      reveal: {
        modelAnswer: "Comment ça va ? Le café, c'est comment ?",
        ifCorrect: "One word, two questions, two very different things asked.",
        ifCorrectButFlat: "Both land. Ask the person first; that order is the human one.",
        ifMissingTargetPiece:
          "Comment opens the first question and closes the second. Same word both times.",
        naturalAlternatives: ["Comment ça va ? C'est comment ?"],
        explanation:
          "Notice where comment ended up each time. You did not learn a rule for that; you have now said both.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s07-natural-reveal-one-word-two-places",
    type: "natural-reveal",
    targetItemIds: ["adverb-comment", "chunk-ca-va", "chunk-c-est"],
    evidenceTargetItemIds: ["adverb-comment"],
    payload: {
      explanation:
        "Comment turned up in two places today, and you did not have to be told a rule to put it there. In front of ça va it asks a person how they are. After c'est it asks what something is like. English moves too: one is how, the other is closer to what is it like. Let the French sentence decide, not the English.\n" +
        "Comment has other everyday jobs you will meet later. Today it is a question word, and one is plenty.",
      naturalAlternatives: ["Comment ça va ?", "C'est comment ?", "Le café, c'est comment ?"],
    },
  },
  {
    id: "s08-sayit-one-question",
    type: "say-it-your-way",
    targetItemIds: ["adverb-comment", "chunk-c-est"],
    evidenceTargetItemIds: ["adverb-comment"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "A friend messages you from a place you have never been. You want to know what it is like before you decide to go.",
      communicativeGoal: "Write the one question you would send back.",
      modelAnswer: "C'est comment ?",
      reveal: {
        modelAnswer: "C'est comment ?",
        naturalAlternatives: ["Le café, c'est comment ?"],
        explanation:
          "Two words, because you both already know what you are talking about. Name the place first if it is not obvious.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s09-recap-one-word-two-places",
    type: "recap",
    payload: {
      title: "One word. Two places.",
      lines: [
        "You asked a person how they are.",
        "You asked what a place is like.",
        "Comment did both, from a different spot each time.",
      ],
      piecesUsed: ["comment", "ça va", "c'est", "où", "le café"],
      nextLabel: "Continue",
    },
  },
];

export const lesson018: Lesson = {
  id: "v1-lesson-018",
  version: "v1",
  number: 18,
  title: "How is it?",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "chunk-natural-speech",
  secondaryArchetype: "thematic-context",
  journeyRole: "doorway",
  acquisitionDemandItemIds: ["adverb-comment"],
  estimatedMinutes: 6,
  canDo:
    "Use comment to ask how someone is and what something is like, in French you already know.",
  whyItExists:
    "L12 owned the est-ce que question mechanism and sent every question word to a later Question Expansion 2. This is that lesson, and it opens exactly one: comment. L8 shipped C'est ou ? as a frozen question, so the learner has never put a second word in that spot. L18 does, and that is what turns a fixed phrase into something the learner can vary. Comment is the only question word whose answers the learner already owns, which is why it comes first.",
  prerequisites: ["v1-lesson-017"],
  learningItems: getItems([
    "adverb-comment",
    "chunk-ca-va",
    "chunk-c-est",
    "chunk-c-est-ou",
    "adverb-ou-where",
    "noun-cafe",
    "chunk-bonjour",
    "word-ici",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "One acquisition demand, adverb-comment, worked in TWO host frames: front-placed before the frozen chunk-ca-va (s01, s02) and final after the owned chunk-c-est (s04, s05). s06 retrieves both in one moment. Producing it only in Comment ca va ? would teach a second frozen greeting; the second host is what proves the learner owns the word.",
    "Host B asymmetry is deliberate. The learner PRODUCES Le cafe, c'est comment ? and is never asked to ANSWER it in French: no owned descriptive answer inventory exists. Comprehension is proved at s04 by choosing WHICH question fits the situation, which needs no French answer. No adjective was invented to fabricate one.",
    "chunk-comment-ca-va and chunk-c-est-comment were not created. Both hosts are authored composition, and comment is supplied as its own labelled piece so the learner never sees either sentence as one indivisible unit.",
    "adverb-ou-where stays supported, exactly as L8 shipped it; adverb-comment is active. The asymmetry is the L18 decision. L8 owned a frozen question, L18 owns the word.",
    "Bare Comment ? in the repair sense is absent entirely: not usable copy, not an alternative, not a trap. The repair rail stays RR-A debt.",
    "No second question word, no comment + est-ce que, no inversion, no qu'est-ce que, no embedded question, no general Q-word substitution rule. No futur proche in any role, and no bare faire.",
  ],
  qaChecks: [
    "adverb-comment carries founder_waived_provisional French QA. No named human has read Comment ca va ?, Le cafe, c'est comment ? or C'est comment ?.",
    "Smoke first: does Host B land? A learner who leaves able to ask Comment ca va ? but not C'est comment ? has not met the can-do.",
    "The ou/comment contrast should read as noticing, not as a rule. If it needs explaining, it is over-built.",
  ],
};
