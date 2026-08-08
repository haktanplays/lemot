/**
 * L19 - Both sides of it. The second Integration beat of the band, and the
 * first lesson that can run a TWO-SIDED exchange.
 *
 * Through L16 the learner could state obligations, intentions and movement but
 * could not ask a person anything about themselves and could not ask about a
 * thing. L17 and L18 changed that. Nothing here is new: the progression is
 * which systems finally meet.
 *
 * Pre-flight cleared its contract against the real registry before a screen was
 * authored; the candidate then cleared every deterministic validator, and a
 * semantic review confirmed the crossing, the reciprocity of the reading, the
 * four weak-point targets and the absence of slop. Naturalness and
 * communicative coherence were judged by review, not by a validator - no
 * validator claims them.
 *
 * THE CROSSING is s05: Ca ne va pas ? Il faut faire une pause. joins the person
 * side (L17) to the task side (L15) in a single produced turn. Those two had
 * never shared a sentence, and L16 could not have built it.
 *
 * WEAK-POINT RECOVERY IS W2 AND AUTHORING-SIDE ONLY. The payload is static and
 * identical for every learner; nothing swaps, injects or reorders screens by
 * weakness, and no copy claims otherwise. What L19 contributes is Hub-reusable
 * production for the band's thinnest-covered items - adj-fatigue and adj-content
 * (s03, s04), chunk-on-y-va and word-y-place (s06) - which the shipped Practice
 * Hub can select by reference once those items go weak.
 *
 * FRENCH QA: L19 adds no identity, so it adds no identity-level debt. The
 * sentences themselves are unreviewed, as all French in this repo is: no
 * named-human French review exists anywhere, and none is claimed.
 */
import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-both-sides",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Both sides of it",
      body:
        "Today: nothing new.\n" +
        "By the end: you'll carry a short exchange on your own, asking and answering.\n" +
        "Everything you need, you already have.",
    },
  },
  {
    id: "s01-meet-two-voices",
    type: "meet-card",
    targetItemIds: ["adverb-comment", "chunk-ca-va", "adj-fatigue", "chunk-je-suis"],
    evidenceTargetItemIds: ["chunk-ca-va", "adj-fatigue"],
    payload: {
      fr: "Bonjour ! Comment ça va ?\nÇa ne va pas. Je suis fatigué.",
      en: "Hello! How's it going?\nI'm not okay. I'm tired.",
      title: "Two people this time. One asks, one answers. Read both lines.",
      highlights: [
        { text: "Comment ça va", itemId: "adverb-comment" },
        { text: "Ça ne va pas", itemId: "chunk-ca-va" },
        { text: "fatigué", itemId: "adj-fatigue" },
      ],
      tts: true,
    },
  },
  {
    id: "s02-fill-what-comes-next",
    type: "fill-with-traps",
    targetItemIds: ["chunk-il-faut", "chunk-faire-une-pause"],
    evidenceTargetItemIds: ["chunk-il-faut"],
    payload: {
      prompt:
        "They've told you they're tired. You're the one who answers next. Which line belongs here?",
      sentenceBefore: "Ça ne va pas. Je suis fatigué. ",
      sentenceAfter: "",
      blankCount: 1,
      options: [
        { id: "opt-il-faut", text: "Il faut faire une pause.", isCorrect: true },
        {
          id: "opt-comment-ca-va",
          text: "Comment ça va ?",
          isCorrect: false,
          trapReason: "They just answered that. Asking again leaves them where they were.",
        },
        {
          id: "opt-au-revoir",
          text: "Au revoir.",
          isCorrect: false,
          trapReason: "Leaving is an answer, but not a kind one when someone has just told you they're tired.",
        },
      ],
      answer: ["opt-il-faut"],
      reveal: {
        short: "Il faut faire une pause.",
        explanation: "You heard them, and you said what the moment needs. That is the whole move.",
        natural: "Il faut faire une pause.",
      },
    },
  },
  {
    id: "s03-fill-which-state-fits",
    type: "fill-with-traps",
    targetItemIds: ["adj-fatigue", "adj-content", "chunk-je-suis"],
    evidenceTargetItemIds: ["adj-fatigue", "adj-content"],
    payload: {
      prompt: "Now it's your turn to answer. The day went well and you slept. Which word is yours?",
      sentenceBefore: "Ça va. Je suis ",
      sentenceAfter: ".",
      blankCount: 1,
      options: [
        { id: "opt-content", text: "content", isCorrect: true },
        {
          id: "opt-fatigue",
          text: "fatigué",
          isCorrect: false,
          trapReason: "Fatigué is the honest word on a long day. This one went well.",
        },
        {
          id: "opt-ici",
          text: "ici",
          isCorrect: false,
          trapReason: "Ici says where you are, not how you are.",
        },
      ],
      answer: ["opt-content"],
      reveal: {
        short: "content",
        explanation: "Content when it went well, fatigué when it didn't. Say whichever is true.",
        natural: "Ça va. Je suis content.",
      },
    },
  },
  {
    id: "s04-weave-answer-for-yourself",
    type: "weave",
    targetItemIds: ["chunk-ca-va", "adj-fatigue", "chunk-je-suis"],
    evidenceTargetItemIds: ["adj-fatigue"],
    payload: {
      weaveType: "supported",
      prompt: "They ask you back. Say you're not okay, and say why.",
      context: "You've been up since early and it shows. Comment ça va ?",
      suggestedPieces: [
        { text: "ça ne va pas", itemId: "chunk-ca-va", required: true, label: "I'm not okay" },
        { text: "fatigué", itemId: "adj-fatigue", label: "tired" },
      ],
      expectedAnswers: ["Ça ne va pas. Je suis fatigué."],
      acceptedAlternatives: [
        "Ça ne va pas. Je suis fatiguée.",
        "Ça ne va pas, je suis fatigué.",
        "Ça ne va pas, je suis fatiguée.",
        "Ça ne va pas. Je suis fatigué",
      ],
      reveal: {
        modelAnswer: "Ça ne va pas. Je suis fatigué.",
        ifCorrect: "Honest, and short. That's how it actually sounds.",
        ifCorrectButFlat: "Fatiguée works just as well. Both are right here.",
        ifMissingTargetPiece: "Ça ne va pas comes first, whole. Then je suis and the word that fits.",
        naturalAlternatives: ["Ça ne va pas. Je suis fatiguée."],
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-weave-hear-it-and-act",
    type: "weave",
    targetItemIds: ["chunk-ca-va", "chunk-il-faut", "chunk-faire-une-pause"],
    evidenceTargetItemIds: ["chunk-il-faut"],
    payload: {
      weaveType: "mid",
      prompt: "Check they're alright, and say what the two of you should do about it.",
      context:
        "Your friend has gone quiet at the table. You want to ask, and you already know the answer will be no.",
      suggestedPieces: [
        { text: "il faut", itemId: "chunk-il-faut", required: true, label: "we need to" },
      ],
      hintCloze: "Ça ne va pas ? ___ faire une pause.",
      expectedAnswers: ["Ça ne va pas ? Il faut faire une pause."],
      acceptedAlternatives: [
        "Ça ne va pas ? Il faut faire une pause",
        "Ça va ? Il faut faire une pause.",
        "Ça ne va pas. Il faut faire une pause.",
      ],
      reveal: {
        modelAnswer: "Ça ne va pas ? Il faut faire une pause.",
        ifCorrect: "Asking and then acting, in one breath. Nothing here is new; putting them together is.",
        ifCorrectButFlat: "Ça va ? opens it just as well. The second half is what matters.",
        ifMissingTargetPiece: "Ask first with ça va, then il faut and the thing that helps.",
        naturalAlternatives: ["Ça va ? Il faut faire une pause."],
        explanation:
          "Until now you asked people how they were, or you said what had to happen. This is both, to the same person, in the same moment.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s06-weave-ask-then-go",
    type: "weave",
    targetItemIds: ["adverb-comment", "chunk-c-est", "noun-cafe", "chunk-on-y-va", "word-y-place"],
    evidenceTargetItemIds: ["chunk-on-y-va", "word-y-place"],
    payload: {
      weaveType: "context",
      prompt: "Ask what the place is like, then suggest going.",
      context: "The break is agreed. There's a café neither of you has tried.",
      suggestedPieces: [
        { text: "on y va", itemId: "chunk-on-y-va", label: "shall we go" },
        { text: "y", itemId: "word-y-place", label: "there" },
      ],
      expectedAnswers: ["Le café, c'est comment ? On y va ?"],
      acceptedAlternatives: [
        "Le café c'est comment ? On y va ?",
        "C'est comment ? On y va ?",
        "Le café, c'est comment ? On y va",
      ],
      reveal: {
        modelAnswer: "Le café, c'est comment ? On y va ?",
        ifCorrect: "A question about the place, then the move. That is a plan.",
        ifCorrectButFlat: "C'est comment ? on its own is fine once you both know which café.",
        ifMissingTargetPiece: "Ask with comment at the end, then on y va to suggest it.",
        naturalAlternatives: ["C'est comment ? On y va ?"],
        explanation:
          "The y in on y va is the café you just named. You do not say the place twice.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s07-natural-reveal-you-had-all-of-it",
    type: "natural-reveal",
    targetItemIds: ["chunk-ca-va", "chunk-il-faut", "adverb-comment", "chunk-on-y-va"],
    evidenceTargetItemIds: ["chunk-ca-va"],
    payload: {
      explanation:
        "Nothing in this lesson was new. What changed is that the pieces stopped taking turns and started meeting each other: you asked a person something, heard the answer, and did something about it.\n" +
        "Ça va and il faut came from different lessons and never shared a sentence until now. Comment and on y va did the same. That is what carrying a conversation is, and you were already holding all of it.",
      naturalAlternatives: [
        "Ça va ? Il faut faire une pause.",
        "Le café, c'est comment ?",
        "On y va ?",
      ],
    },
  },
  {
    id: "s08-sayit-carry-the-whole-thing",
    type: "say-it-your-way",
    targetItemIds: ["adverb-comment", "chunk-ca-va", "chunk-je-peux", "chunk-faire-une-pause", "chunk-on-y-va"],
    evidenceTargetItemIds: ["chunk-on-y-va"],
    weakPointTags: ["natural-speech", "y"],
    payload: {
      situation:
        "You meet someone you know outside a café. You have not seen them all day, and you have both been working since morning. Take the whole exchange: greet them, ask, and get the two of you somewhere else.",
      communicativeGoal: "Write your side of it, from the greeting to the suggestion.",
      modelAnswer: "Bonjour ! Comment ça va ? Il faut faire une pause. Le café, c'est comment ? On y va ?",
      reveal: {
        modelAnswer: "Bonjour ! Comment ça va ? Il faut faire une pause. Le café, c'est comment ? On y va ?",
        naturalAlternatives: [
          "Bonjour ! Ça va ? Je peux faire une pause ? On y va ?",
          "Comment ça va ? Ça ne va pas ? Il faut faire une pause. On y va ?",
        ],
        explanation:
          "Shorter is fine. What makes it an exchange is that you asked before you suggested.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s09-recap-both-sides",
    type: "recap",
    payload: {
      title: "You carried it.",
      lines: [
        "You asked someone how they were, and you answered when they asked back.",
        "You heard what they said and did something about it.",
        "You asked about a place, then suggested going there.",
      ],
      piecesUsed: ["comment", "ça va", "fatigué", "content", "il faut", "une pause", "y"],
      nextLabel: "Continue",
    },
  },
];

export const lesson019: Lesson = {
  id: "v1-lesson-019",
  version: "v1",
  number: 19,
  title: "Both sides of it",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "review-integration",
  secondaryArchetype: "thematic-context",
  journeyRole: "integration",
  acquisitionDemandItemIds: [],
  estimatedMinutes: 7,
  canDo:
    "Hold a short exchange in French: greet someone, ask how they are, answer, and ask about a place, using what you already know.",
  whyItExists:
    "Through L16 the learner could state obligations, intentions and movement, but could not ask a person anything about themselves and could not ask about a thing. L17 and L18 changed that. L19 is the first lesson that can run a two-sided exchange: greet, ask, hear, answer, ask about a place, act, close. That spine is unbuildable from L16's inputs, which is why a second Integration beat is not a re-run. Nothing new is introduced; the progression is which systems finally meet.",
  prerequisites: ["v1-lesson-018"],
  learningItems: getItems([
    "chunk-ca-va",
    "adj-fatigue",
    "adj-content",
    "chunk-je-suis",
    "adverb-comment",
    "chunk-c-est",
    "chunk-il-faut",
    "chunk-faire-une-pause",
    "chunk-je-peux",
    "chunk-on-y-va",
    "word-y-place",
    "chunk-bonjour",
    "chunk-merci",
    "chunk-au-revoir",
    "noun-cafe",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Zero acquisition demands. Every French surface is recycled from shipped L0-L18; nothing is promoted from supported to active, and no identity was added.",
    "THE CROSSING is s05: Ca ne va pas ? Il faut faire une pause. joins the person side to the task side in one turn. ca va (L17) and il faut (L15) had never shared a sentence. This is the beat that makes L19 an integration rather than a review, and L16 could not have built it.",
    "The A Small Moment recurrence is s01 and s02, and it is the SECOND, not a replay. L16's read was one voice making three statements and the learner answered it. This read is TWO voices carrying a question and its answer, and the learner CONTINUES it by choosing the turn that belongs next. The action is comprehension-level, so the load sits on reading an exchange; production is carried by s04 to s08.",
    "Weak-point recovery is W2 and authoring-side only. The payload is static and identical for every learner, and no copy claims otherwise. What L19 adds is Hub-reusable production for the band's thinnest-covered items: adj-fatigue and adj-content at s03 and s04, chunk-on-y-va and word-y-place at s06 and s08. All four are weakness-eligible.",
    "Host-B asymmetry from L18 still binds: Le cafe, c'est comment ? is produced as a QUESTION and never answered in French. No descriptive adjective exists to answer it and none was invented.",
    "Support falls 4, 3, 2, 0 across the three weaves and the say-it. The exit at s08 is the full exchange end to end, which no earlier screen asks for and which L16's one-sided exit could not contain.",
  ],
  qaChecks: [
    "No identity carries new French QA debt: L19 adds no identity. The sentences themselves are unreviewed, as all repo French is - no named-human review exists anywhere.",
    "Smoke first: does s05 read as one turn rather than two glued sentences? If the crossing does not land, L19 is a review.",
    "Check no learner-facing copy implies the lesson adapted to the learner. It does not adapt, and must not say it does.",
  ],
};
