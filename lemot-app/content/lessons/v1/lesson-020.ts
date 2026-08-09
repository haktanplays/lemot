/**
 * L20 - The whole moment. Pre-Campfire Milestone, and the FIRST shipped
 * lesson carrying journeyRole "milestone".
 *
 * First candidate, one run, REVISED IN PLACE after review. Not regenerated: the
 * architecture, the seven screens and five of the seven payloads are untouched.
 * Two bounded corrections were applied.
 *
 * R1 - s01 previously expected `Ça ne va pas. Je suis fatigué.`, which is L19
 * s04's exact reference answer asked at rank 2 instead of rank 4. That beat
 * reduced to "same L19 answer, fewer hints". s01 now asks for the state
 * directly (`Je suis fatigué.`), which is the same owned capability and a
 * different authored sentence. The good-day branch was NOT kept as an
 * alternative: it would contradict s02's context, and s01 is not where this
 * lesson's agency lives.
 *
 * R2 - s01's context previously printed `Bonjour ! Comment ça va ?`, the exact
 * opening the learner has to produce at s03. It now prints only `Ça va ?`. The
 * greeting and the fuller check-in are supplied nowhere in this lesson.
 *
 * The moment is ONE continuous scene split across the two checks, then handed
 * over whole: s01 the learner ANSWERS when asked, s02 the learner ACTS on what
 * they just said, s03 the learner runs the entire moment from the top.
 *
 * Ladder 2 -> 1 -> 0, no supported beat, no mid beat, no required pieces.
 * No meet-card and no fill-with-traps: nothing is met because nothing is new,
 * and nothing is chosen from supplied options because the milestone tests
 * retrieval. Both omissions are firsts in the shipped corpus.
 *
 * FP-C is s05: one insight-card, no targetItemIds, no itemId anywhere, French
 * in `examples`, placed after the performance and the reflection and before the
 * recap. No identity is minted and no exercise touches it.
 *
 * FRENCH QA: L20 adds no identity, so no identity-level debt. The sentences are
 * unreviewed, as all French in this repo is - no named-human review exists.
 */
import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-the-whole-moment",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "The whole moment",
      body:
        "Today: nothing new.\n" +
        "One short moment with someone you know, and you carry all of it.\n" +
        "There is more than one right way through it. Take the one that is true for you.",
    },
  },
  {
    id: "s01-weave-answer-when-asked",
    type: "weave",
    targetItemIds: ["chunk-je-suis", "adj-fatigue"],
    evidenceTargetItemIds: ["chunk-je-suis", "adj-fatigue"],
    payload: {
      weaveType: "context",
      prompt: "Answer them with the state you are actually in, not just fine or not fine.",
      context: "You are at work, late in the afternoon. Someone stops at your desk and says: Ça va ?",
      suggestedPieces: [{ text: "je suis", itemId: "chunk-je-suis", label: "I am" }],
      expectedAnswers: ["Je suis fatigué."],
      acceptedAlternatives: ["Je suis fatiguée.", "Je suis fatigué", "Je suis fatiguée"],
      reveal: {
        modelAnswer: "Je suis fatigué.",
        ifCorrect: "Straight to it. Not how things are going, but how you are.",
        ifCorrectButFlat: "Fatiguée is the same answer. Both spellings are right.",
        ifMissingTargetPiece: "Je suis, then the word for the state you are in.",
        naturalAlternatives: ["Je suis fatiguée."],
        explanation:
          "You could have said that things are fine or that they are not. Naming the state you are in says more, and it is what makes the next line possible.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s02-weave-say-what-happens-now",
    type: "weave",
    targetItemIds: ["chunk-il-faut", "chunk-je-peux", "chunk-faire-une-pause"],
    evidenceTargetItemIds: ["chunk-faire-une-pause"],
    payload: {
      weaveType: "open",
      prompt: "Now say what should happen about it. More than one answer is right here.",
      context:
        "You have just told them you are tired. They are still standing there, waiting for the rest of it.",
      expectedAnswers: ["Il faut faire une pause."],
      acceptedAlternatives: [
        "Il faut faire une pause",
        "Je peux faire une pause ?",
        "Je peux faire une pause",
      ],
      reveal: {
        modelAnswer: "Il faut faire une pause.",
        ifCorrect: "You did not only report it. You said what to do about it.",
        ifCorrectButFlat: "Je peux faire une pause ? asks instead of states. Both are real here.",
        ifMissingTargetPiece:
          "The break is the part that has to be in it: faire une pause. What you put in front of it is yours.",
        naturalAlternatives: ["Je peux faire une pause ?"],
        explanation:
          "Il faut says it has to happen. Je peux asks whether it may. Same break, different move.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s03-sayit-take-it-from-the-top",
    type: "say-it-your-way",
    targetItemIds: [
      "chunk-bonjour",
      "adverb-comment",
      "chunk-ca-va",
      "chunk-je-suis",
      "adj-fatigue",
      "adj-content",
      "chunk-il-faut",
      "chunk-faire-une-pause",
      "chunk-c-est",
      "noun-cafe",
      "chunk-on-y-va",
      "word-y-place",
      "chunk-merci",
      "chunk-au-revoir",
    ],
    evidenceTargetItemIds: ["chunk-bonjour", "chunk-ca-va", "chunk-je-suis"],
    payload: {
      situation:
        "Another day, another person. You are walking home past a café you have never tried when you meet someone you know. Nobody starts it for you this time. Take the whole moment: open it, ask, say how you are, and get it to an ending.",
      communicativeGoal: "Write your side of it, from the first word to the last.",
      modelAnswer: "Bonjour ! Comment ça va ? Je suis fatigué. Il faut faire une pause. On y va ?",
      reveal: {
        modelAnswer: "Bonjour ! Comment ça va ? Je suis fatigué. Il faut faire une pause. On y va ?",
        naturalAlternatives: [
          "Bonjour ! Ça va ? Je suis content. Le café, c'est comment ? On y va ?",
          "Bonjour ! Comment ça va ? Je suis fatigué. Merci, au revoir !",
          "Bonjour ! Ça va ? Je suis fatigué. Au revoir !",
        ],
        explanation:
          "Four ways out of the same doorway. One ends with the two of you going somewhere, two end with you going home, and the shortest is about half the length of the longest. None of them is the right one. They are all yours.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s04-natural-reveal-you-chose-it",
    type: "natural-reveal",
    targetItemIds: ["chunk-je-suis", "adj-fatigue", "chunk-il-faut", "chunk-on-y-va"],
    evidenceTargetItemIds: ["chunk-il-faut"],
    payload: {
      explanation:
        "Nothing in this lesson was new. What you did with it was put it together: you said how you were, you said what should happen about it, and then you carried the whole thing yourself.\n" +
        "The greeting and the question you opened with were not handed to you anywhere in this lesson. You went and got them, and you decided how the moment ended.",
      naturalAlternatives: ["Je suis fatigué.", "Il faut faire une pause.", "On y va ?"],
    },
  },
  {
    id: "s05-insight-one-you-will-start-hearing",
    type: "insight-card",
    payload: {
      insightType: "micro-contrast",
      title: "One you'll start hearing",
      body:
        "You can already say that a break has to happen.\n" +
        "Before long you'll be able to say you are going to take one.\n" +
        "Nothing to do with it today. Just notice it when it goes past.",
      examples: [
        {
          fr: "Il faut faire une pause.",
          en: "We need to take a break.",
          note: "Yours already. You said it a minute ago.",
        },
        {
          fr: "Je vais faire une pause.",
          en: "I'm going to take a break.",
          note: "Not yet. Just so you know it when you hear it.",
        },
      ],
    },
  },
  {
    id: "s06-recap-that-was-all-of-it",
    type: "recap",
    payload: {
      title: "That was all of it.",
      lines: [
        "Someone asked how you were, and you named the state you were in.",
        "You said what should happen about it, and you chose how to say it.",
        "Then you took the whole moment from the top, greeting and all, on your own.",
      ],
      piecesUsed: [
        "bonjour",
        "comment",
        "ça va",
        "je suis",
        "fatigué",
        "il faut",
        "une pause",
        "y",
        "au revoir",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson020: Lesson = {
  id: "v1-lesson-020",
  version: "v1",
  number: 20,
  title: "The whole moment",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "summit-milestone",
  secondaryArchetype: "thematic-context",
  journeyRole: "milestone",
  acquisitionDemandItemIds: [],
  estimatedMinutes: 5,
  canDo:
    "Carry a short familiar moment in French from start to finish, using what I already know.",
  whyItExists:
    "L20 is the Pre-Campfire capability checkpoint and the first shipped Milestone. Its job is to test more than it teaches: the learner carries one small owned moment end to end and chooses which capabilities it needs, rather than being walked through a prescribed spine. Nothing is introduced to make it feel important; what changes is how much of the moment the learner supplies. Every lesson in the L13-L19 band opens its production ladder at rank 4 (supported); L20 opens at rank 2 and never offers a supported or mid beat at all. That ladder is not a corpus first (L9 already has 2, 1, 0), so what actually separates a milestone from a review here is a per-beat rule: no L20 beat re-asks an L19 reference answer at lower support.",
  prerequisites: ["v1-lesson-019"],
  learningItems: getItems([
    "chunk-bonjour",
    "chunk-ca-va",
    "adverb-comment",
    "chunk-je-suis",
    "adj-fatigue",
    "adj-content",
    "chunk-il-faut",
    "chunk-je-peux",
    "chunk-faire-une-pause",
    "noun-cafe",
    "chunk-c-est",
    "chunk-on-y-va",
    "word-y-place",
    "chunk-merci",
    "chunk-au-revoir",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Zero acquisition demands, and the zero is pedagogical: a checkpoint that taught something would not be a checkpoint. Every French surface is recycled from shipped L0-L19 and no identity was added.",
    "One continuous scene, handed over in three steps. s01 the learner ANSWERS when asked, s02 the learner ACTS on what they just said, s03 the learner runs the whole moment from the top. The exit's greeting and fuller check-in are not supplied as a pre-performance model anywhere in this lesson: no screen prints Bonjour ! or Comment ça va ?, so the learner retrieves the opening rather than copying it. This is a claim about THIS lesson only. Both surfaces are owned and were worked in earlier lessons; a milestone tests recombination and retrieval, not first exposure.",
    "The other two exit clauses ARE rehearsed here, and that is legitimate preparation rather than leakage: the learner PRODUCED Je suis fatigué. at s01 and Il faut faire une pause. at s02, unaided. Nothing prints them for the learner to copy. Chasing a zero pre-print exit is not a canon rule and was not attempted.",
    "Support falls 2, 1, 0 with no supported beat, no mid beat, no required suggestedPieces and no hintCloze anywhere. The single optional piece at s01 carries the FRAME (je suis) and never the state word, so the hint ladder cannot hand the learner the whole answer.",
    "No meet-card and no fill-with-traps. All 20 lessons shipped before it contain both; L20 is the first with neither. Nothing is met because nothing is new, and nothing is chosen from supplied options because the milestone tests retrieval, not recognition.",
    "Evidence targets are the INTERSECTION of every accepted route, never the model route. s01's routes differ only by gender agreement, so both chunk-je-suis and adj-fatigue are credited; s02 accepts both il faut and je peux, so only chunk-faire-une-pause is; s03 accepts four routes, so only bonjour, ça va and je suis are. Crediting the model route would credit items the learner may not have written.",
    "Agency is deliberately NOT spread across every production beat. s01 offers only a gender alternant and is not an agency point; s02 offers two different speech acts (stating that a break has to happen, versus asking whether one may); s03 offers four routes with genuinely different outcomes and is the strongest point. One genuine communicative choice is the requirement, not three.",
    "FP-C is s05: one insight-card, no targetItemIds, no itemId anywhere, French carried in examples, sitting after the performance and the reflection and before the recap. No futur-proche identity is minted, no exercise requests it, no reveal accepts it, the recap does not list it, and no claim is made that L7 or L17 previewed it.",
    "No screen carries weakPointTags. Screen-level tags have no runtime consumer - the Practice Hub reads weakness from the item registry - so adding them here would be decoration.",
    "The place question (Le café, c'est comment ?) and the closing pair (merci, au revoir) appear only as learner routes at s03, never as a requirement. Forcing either in to cover L18 or L0 is the coverage sweep the spec forbids.",
    "R3, surfaced by the post-revision route audit rather than by R1/R2: s03's situation used to place the learner COMING OUT of the café, which made the offered route Le café, c'est comment ? incoherent - you would be the one who knows. The café is now ahead of them, not behind. In the same pass the parting route dropped Ça ne va pas., which was L19 s04's reference sentence surviving inside an offered route after R1 had removed it from s01.",
  ],
  qaChecks: [
    "No identity carries new French QA debt: L20 adds no identity. The sentences themselves are unreviewed, as all repo French is - no named-human review exists anywhere and none is claimed.",
    "Smoke first: does s03 read as one moment rather than five drills in a row? If it reads as a list, the milestone has failed and no validator will say so.",
    "Check that no copy implies the app adapted to the learner, that a gate or unlock exists, or that Campfire has been reached. None is true.",
    "Check s05 reads as I can see where this is going and never as I am now expected to use this.",
  ],
};
