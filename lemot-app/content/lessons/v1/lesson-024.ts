/**
 * L24 - What you came for. Pre-Campfire Threshold, and the SECOND shipped
 * lesson carrying journeyRole "milestone".
 *
 * First candidate, one run, REVISED IN PLACE after review. Not regenerated:
 * the architecture, the seven screens and the exit payload are the reviewed
 * candidate's. Two bounded corrections were applied before shipping.
 *
 * C1 - s01's context previously ended at "They pick up the phone.", leaving
 * the learner's isolated first line greeting-less. The context now closes the
 * hellos in English, so the bare question is a natural mid-call turn.
 *
 * C2 - s02's prompt previously promised "whether it is more than thanks is
 * yours", a freedom the accepted routes do not validate (bare Merci. is not
 * accepted, because every route must carry the evidence item). The prompt now
 * directs the unprompted verdict honestly and frees what is genuinely free:
 * which truth, and how much goes around it.
 *
 * Authored from the L24 canon (gate review + compact spec + AI-contract row)
 * and a scratch Surface Inventory (ownership -> purposes -> routes ->
 * screens) that existed before any screen was written. The inventory is
 * review provenance and is deliberately not tracked.
 *
 * MODEL I. The app supplies CIRCUMSTANCES, NOT INSTRUCTIONS. The exit names a
 * place, a person and a time bound, and never a purpose, a move list, or a
 * fact that forces a branch. Accepted exit routes differ in PURPOSE: obtain
 * (price-aware), find out only, connect, connect plus obtain.
 *
 * LADDER OF AGENCY, not of support. s01 gives situation and purpose and frees
 * the MOVE (ask the place or ask the person). s02 removes the interlocutor's
 * prompt entirely: nobody has asked, and the polarity and shape of the
 * unprompted verdict are the learner's. s03 frees the PURPOSE itself.
 * Ranks 2, 1, 0 obey L20's discipline but are not the milestone.
 *
 * NOTHING NEW, NO FORWARD FRENCH. Zero demands, zero supported, zero
 * recognition. combien and je voudrais appear in NO screen before the exit.
 * The boundary device (s05) carries no French at all: the forward look is a
 * boundary, not a form, and L20 already spent the corpus's one preview.
 *
 * DIFFERENTIATION ON RECORD. The exit T-route surface matches shipped L22's
 * exit model, and that is the point: L22's situation instructs (say hello,
 * find out what it costs, and then decide); this one instructs nothing, so the
 * route exists only if the learner originates it. s02 is not L21 s04 again:
 * L21 volunteered a positive-only verdict about an absent cafe to inform a
 * friend; s02 is both polarities, optionally welded to thanks, said to the
 * person who made the coffee and is watching. No beat re-asks L23 s03's job
 * (c'est comment ? answered by bon): nobody asks anything at s02.
 *
 * FRENCH QA: L24 adds no identity, so no identity-level debt. The sentences
 * are unreviewed, as all French in this repo is - no named-human review
 * exists.
 */
import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-one-small-moment",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "One small moment",
      body:
        "Nothing new today.\n" +
        "A friend who has just moved, and then one small moment on your own.\n" +
        "Nobody will tell you what to say. Take it the way you want.",
    },
  },
  {
    id: "s01-weave-ask-about-the-move",
    type: "weave",
    targetItemIds: ["adverb-comment", "chunk-c-est", "chunk-ca-va"],
    evidenceTargetItemIds: ["adverb-comment"],
    payload: {
      weaveType: "context",
      prompt:
        "You want to know how the move went. There is more than one way to ask, and both are yours.",
      context:
        "A friend has just moved to a new place across town. You have not seen it, and you have not seen them since. On the phone, the hellos are done, and it is your turn.",
      expectedAnswers: ["C'est comment ?"],
      acceptedAlternatives: ["C'est comment", "Comment ça va ?", "Comment ça va"],
      reveal: {
        modelAnswer: "C'est comment ?",
        ifCorrect: "You asked about the place. They will tell you everything.",
        ifCorrectButFlat:
          "Comment ça va ? asks about them instead of the place. After a move, both questions open the same door.",
        ifMissingTargetPiece: "Comment is the word that asks what something is like.",
        naturalAlternatives: ["Comment ça va ?"],
        explanation:
          "Two questions you have owned for a while, and either one starts this. One asks about the place, one asks about the person. You chose which mattered to you first.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s02-weave-they-are-not-asking",
    type: "weave",
    targetItemIds: ["adj-bon", "chunk-c-est", "chunk-ce-n-est-pas", "chunk-merci", "noun-cafe"],
    evidenceTargetItemIds: ["adj-bon"],
    payload: {
      weaveType: "open",
      prompt: "They have not asked. Say what you made of it anyway. Which truth, and how much goes around it, is yours.",
      context:
        "Their new place, the next week. While you looked around, they made you a coffee, and you have drunk it. They are just picking up the cups.",
      expectedAnswers: ["C'est bon."],
      acceptedAlternatives: [
        "C'est bon",
        "Le café, c'est bon.",
        "Le café, c'est bon",
        "C'est bon. Merci.",
        "Merci. C'est bon.",
        "Ce n'est pas bon.",
        "Ce n'est pas bon",
      ],
      reveal: {
        modelAnswer: "C'est bon.",
        ifCorrect: "Nobody asked you. You decided they should know.",
        ifCorrectButFlat:
          "Ce n'est pas bon. is the same decision with the other truth in it. Saying it to the person who made it costs more, and it is still yours to say.",
        ifMissingTargetPiece: "C'est, then what you actually thought of it.",
        naturalAlternatives: ["Ce n'est pas bon.", "C'est bon. Merci."],
        explanation:
          "The question never came, so the whole thing was your move: whether to speak, and what to put in it. That is different from answering well.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s03-sayit-what-you-came-for",
    type: "say-it-your-way",
    targetItemIds: [
      "chunk-bonjour",
      "adverb-combien",
      "chunk-c-est",
      "chunk-un-cafe",
      "chunk-je-voudrais",
      "chunk-sil-vous-plait",
      "chunk-merci",
      "adverb-comment",
      "chunk-ca-va",
      "chunk-au-revoir",
    ],
    // Intersection of the four endorsed routes, not the model route. The four
    // routes share exactly one surface: the greeting. Crediting anything more
    // would credit items absent from at least one route the reveal endorses.
    // Same discipline as shipped v1-lesson-020 and v1-lesson-023 exits.
    evidenceTargetItemIds: ["chunk-bonjour"],
    payload: {
      situation:
        "Late morning, and you have a few minutes before you need to be somewhere. A small café you have never been into, and behind the counter today is someone you know. You walk in.",
      communicativeGoal: "Write your side of it, from the first word to the last.",
      modelAnswer: "Bonjour ! Un café, c'est combien ? Je voudrais un café, s'il vous plaît. Merci.",
      reveal: {
        modelAnswer:
          "Bonjour ! Un café, c'est combien ? Je voudrais un café, s'il vous plaît. Merci.",
        naturalAlternatives: [
          "Bonjour ! Comment ça va ? Au revoir !",
          "Bonjour ! Un café, c'est combien ? Merci, au revoir.",
          "Bonjour ! Ça va ? Je voudrais un café, s'il vous plaît. Merci, au revoir.",
        ],
        explanation:
          "Four ways in, and nothing suggested any of them. One of you came for the coffee, one came to say hello, one only wanted to know the price for another day, and one came for the person and the coffee both. The moment did not tell you what it was for. You did.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s04-natural-reveal-nobody-chose-for-you",
    type: "natural-reveal",
    targetItemIds: ["adverb-combien", "chunk-je-voudrais", "chunk-ca-va", "adverb-comment"],
    // No evidence narrowing on purpose. A natural-reveal is exposure, not a
    // learner action, and the three lines it shows anchor three different
    // purposes - narrowing to one would credit an item absent from the routes
    // the other two anchor. Same reasoning as shipped v1-lesson-023 s05.
    payload: {
      explanation:
        "Nobody told you what you wanted this time. Every lesson before this handed you a task. This one handed you a place, a person and a few minutes, and the reason you walked in was yours.\n" +
        "That was the last thing left to hand over. First the words stopped being supplied, then the moves. Today it was the reason itself.",
      naturalAlternatives: [
        "Un café, c'est combien ?",
        "Comment ça va ?",
        "Je voudrais un café, s'il vous plaît.",
      ],
    },
  },
  {
    id: "s05-insight-where-all-of-it-lives",
    type: "insight-card",
    payload: {
      insightType: "micro-contrast",
      title: "Where all of it lives",
      body:
        "Everything you said today happened inside the moment you were standing in. What you want, what it costs, how someone is doing, what you think of the coffee in your hand. That is where everything you own does its work.\n" +
        "French can also step outside the moment. What happened before you walked in. What happens after you leave.\n" +
        "Those are not yours yet. They are the next territory.",
    },
  },
  {
    id: "s06-recap-you-decided-what-it-was-for",
    type: "recap",
    payload: {
      title: "You decided what it was for.",
      lines: [
        "A friend moved, and you chose which question to open with.",
        "They made you a coffee, and what you said about it, nobody asked for.",
        "Then you walked into a new place with a few minutes, and the reason was yours.",
      ],
      piecesUsed: [
        "comment",
        "ça va",
        "bon",
        "merci",
        "bonjour",
        "combien",
        "je voudrais",
        "au revoir",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson024: Lesson = {
  id: "v1-lesson-024",
  version: "v1",
  number: 24,
  title: "What you came for",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "summit-milestone",
  secondaryArchetype: "thematic-context",
  journeyRole: "milestone",
  acquisitionDemandItemIds: [],
  estimatedMinutes: 5,
  canDo: "Decide what I want out of a moment in French, and carry it through on my own.",
  whyItExists:
    "L20 proved the learner can execute a moment whose shape they were given: its exit still named the moves. At 25 demands it could not have done otherwise, because every owned reason to open your mouth was another person. L21 added a verdict and L22 added the price question, and between them they made a second and third kind of purpose possible, so L24 is the first lesson at which the question of what the learner is there for has more than one owned answer. That is what it tests: the app supplies circumstances, never instructions, and the learner supplies the purpose. It also restores what L23 correctly took away - L23's board decides two of its beats by design, and the free arc should not end on the learner being told what to do. The boundary of the owned world is made visible only after the learner has proved they can work inside it.",
  prerequisites: ["v1-lesson-023"],
  learningItems: getItems([
    "chunk-bonjour",
    "chunk-merci",
    "chunk-au-revoir",
    "chunk-ca-va",
    "adverb-comment",
    "chunk-c-est",
    "adj-bon",
    "chunk-ce-n-est-pas",
    "noun-cafe",
    "adverb-combien",
    "chunk-un-cafe",
    "chunk-je-voudrais",
    "chunk-sil-vous-plait",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Zero acquisition demands, zero supported, zero recognition. Every French surface is recycled from shipped L0-L23 and no identity was added. The forward-looking device carries no French at all: the boundary is a concept, not a form, and L20 already spent the corpus's one recognition-only preview.",
    "Authored from a scratch Surface Inventory (ownership, then purposes, then routes, then screens). Every French surface here is drawn from that inventory; nothing was invented at screen-writing time.",
    "The ladder is AGENCY, not support. s01 frees the move (purpose given, two owned questions serve it), s02 removes the interlocutor's prompt (nobody asks; the polarity and shape of the unprompted verdict are the learner's), s03 frees the purpose itself. Ranks fall 2, 1, 0 with no supported beat, no mid beat, no pieces and no hintCloze anywhere, but the ranks are not what makes this a milestone: there is no rank below zero, and the withdrawn quantity is authorial control.",
    "The exit supplies CIRCUMSTANCES, NOT INSTRUCTIONS: a place, a person, a time bound. Shipped L20's exit names the moves (open it, ask, say how you are, get it to an ending); shipped L22's exit instructs (say hello, find out what it costs, and then decide); shipped L23's exit supplies the number that decides. This situation names no move, no goal and no fact that forces a branch, which is the structural difference the whole lesson exists to create.",
    "The four endorsed exit routes differ in PURPOSE, not ending: obtain price-aware, connect only, find out only, connect plus obtain. The connect route is materially shorter than the model on purpose - the model answer is a moment, not an inventory. Every route is independently owned, and the price answer and the friend's replies stay off-screen on the L20/L22 exit precedent.",
    "combien and je voudrais appear in NO screen before the exit. If the learner asks the price or orders at s03, that purpose was originated, not rehearsed: the strongest provenance this corpus can offer. The exit T-route surface matches L22's exit model deliberately - same French, structurally different job, because L22 instructed the task and L24 does not.",
    "The find-out-only route asks combien with no purchase intent and no supplied number. L22 instructed the ask; L23 forced the branch with 8 EUR; here nothing forces anything, and the reveal frames leaving as the purpose having been completed, not as a decline.",
    "s02 is not L21 s04 again. L21 volunteered a positive-only verdict about an absent cafe to inform a friend; s02 offers both polarities, optionally welded to merci, said to the person who made the coffee and is still in the room. Same owned word, materially different social act. And no beat re-asks L23 s03's job: nobody asks c'est comment ? anywhere in this lesson.",
    "s01's two accepted questions share adverb-comment, which is the evidence target; s02's routes all contain adj-bon; s03's four routes share exactly one surface, the greeting, so chunk-bonjour is the exit's only evidence target. Intersection discipline as shipped in L20 and L23: crediting the model route would credit items the learner may not have written.",
    "The threshold is EARNED and ordered: perform (s03), reflect (s04), boundary (s05), next territory (inside s05, last). s00 says nothing about the boundary, time, or what comes next; it promises only that nothing is new and nobody will script the moment. The boundary copy is deictic, not tense-named: je voudrais is a conditionnel the learner has owned since L0, so no copy claims everything they know is present tense.",
    "No coverage sweep. je suis, fatigue, content, il faut, je peux, faire une pause, on y va, y and est-ce que are all owned and all absent: none of the four routes needs them, and forcing one in to cover an earlier lesson is the defect the spec names. Availability is not coverage.",
    "No screen carries weakPointTags: screen-level tags have no runtime consumer.",
  ],
  qaChecks: [
    "L24 adds no identity, so no identity-level French QA debt. The sentences are unreviewed, as all repo French is - no named-human review exists anywhere and none is claimed.",
    "Smoke first: read the four exit routes and name each one's purpose aloud. If any two collapse into the same purpose with different endings, the milestone has failed and no validator will say so.",
    "Check the exit situation sentence by sentence: every sentence must be a fact about the world. If any sentence names a move, a goal, or an order of business, it is an instruction and must go.",
    "Check s02 reads as the learner's own move toward the friend: the friend never asks, and the scene must make speaking feel volunteered even though the app frames the task. If the FRIEND seems to have asked, the unprompted rung has failed.",
    "Check s05 lands as a horizon, not a lack: capability first, limit second, next territory third. No tense names, no Campfire, no unlock, no arrival claim anywhere.",
    "Check no copy implies the app adapted, gated, scored, or unlocked anything. Completing L24 does exactly what completing any lesson does.",
  ],
};
