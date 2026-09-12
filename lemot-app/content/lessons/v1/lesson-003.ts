import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";
import { activityChain } from "../activityChain";

const screens: LessonScreen[] = [


  {
    // L3's world is answering: yes, no, not that, and the two lines that keep a
    // conversation alive when it breaks. The lesson owns the first five; the
    // rest are here because a learner who can only say "non" is stuck.
    id: "s20-showcase-answering",
    type: "showcase",
    payload: {
      intro:
        "Today is about answering, refusing and correcting. These are the lines that let you stay in a conversation instead of nodding through it.",
      clusters: [
        {
          label: "Yes and no",
          sentences: [
            { fr: "Oui, je suis ici.", en: "Yes, I'm here.", role: "core", itemIds: ["chunk-oui"] },
            {
              fr: "Non, je ne suis pas ici.",
              en: "No, I'm not here.",
              role: "core",
              itemIds: ["chunk-non", "chunk-je-ne-suis-pas"],
              depth: { sound: "non, zhuh nuh swee pah-z-ee-SEE", structure: "ne and pas sit one on each side of the engine: je NE suis PAS ici. The two halves always travel together in writing.", inDepth: "In relaxed speech the ne often disappears and you hear je suis pas ici. Both halves are still correct to write, and it is worth recognising the sentence when only one of them arrives." },
            },
            { fr: "Non merci.", en: "No thanks.", role: "core", itemIds: ["chunk-non-merci"] },
            { fr: "Oui, s'il vous plaît.", en: "Yes, please.", role: "supported", itemIds: ["chunk-oui", "chunk-sil-vous-plait"] },
          ],
        },
        {
          label: "That's not it",
          sentences: [
            {
              fr: "Ce n'est pas ici.",
              en: "It's not here.",
              role: "core",
              itemIds: ["chunk-ce-n-est-pas"],
            },
            { fr: "Non, ce n'est pas ici.", en: "No, it's not here.", role: "core", itemIds: ["chunk-non", "chunk-ce-n-est-pas"] },
            { fr: "Ce n'est pas grave.", en: "It's not a problem.", role: "exposure", itemIds: ["chunk-ce-n-est-pas-grave"], pieces: ["Ce n'est pas", "grave"] },
            { fr: "Ce n'est pas possible.", en: "That's not possible.", role: "exposure", pieces: ["Ce n'est pas", "possible"] },
          ],
        },
        {
          label: "When you are lost",
          sentences: [
            {
              fr: "Je ne comprends pas.",
              en: "I don't understand.",
              role: "core",
              itemIds: ["chunk-je-ne-comprends-pas"],
              depth: { cognate: "Word-family bridge. Comprends and comprehend come from the same Latin verb meaning to grasp. English keeps comprehend for the formal register and uses understand daily; French uses this one for both.", sound: "zhuh nuh kom-PRON pah", usage: "The single most useful sentence you own. Say it early rather than nodding along." },
              flat: "formula",
            },
            {
              fr: "Je ne comprends pas. Vous pouvez répéter ?",
              en: "I don't understand. Can you say that again?",
              role: "supported",
              pieces: ["Je ne comprends pas", "vous pouvez", "répéter"],
            },
            { fr: "Je ne sais pas.", en: "I don't know.", role: "exposure", itemIds: ["chunk-je-ne-sais-pas"], flat: "formula" },
            { fr: "Un peu, seulement.", en: "Only a little.", role: "exposure", flat: "exposure" },
          ],
        },
        {
          label: "Softening it",
          sentences: [
            { fr: "Pas de problème.", en: "No problem.", role: "exposure", itemIds: ["chunk-pas-de-probleme"], flat: "formula" },
            { fr: "Pas encore.", en: "Not yet.", role: "exposure", flat: "formula" },
            { fr: "Peut-être.", en: "Maybe.", role: "exposure", flat: "formula" },
          ],
        },
      ],
    },
  },


  {
    id: "s00-goal-non",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Saying no",
      body:
        "Today: how to say no, and how to make a sentence negative.\n" +
        "By the end: you can turn a sentence around with ne ... pas.\n" +
        "Main pieces: non, ne ... pas, non merci.",
    },
  },


  {
    id: "s00-meet-je-ne-suis-pas-ici",
    type: "meet-card",
    targetItemIds: ["chunk-je-ne-suis-pas", "chunk-je-suis"],
    weakPointTags: ["negation", "ne-pas"],
    payload: {
      fr: "Je ne suis pas ici.",
      en: "I am not here.",
      title: "The same shape, turned negative.",
      highlights: [
        { text: "je ne suis pas", itemId: "chunk-je-ne-suis-pas" },
        // ici is a piece the learner has produced since L2, and the registry
        // segments this sentence as two. Marking only the negative left the
        // place word looking like part of it -- the founder found the same gap
        // on the c'est card below.
        { text: "ici", itemId: "word-ici" },
      ],
      tts: true,
    },
  },


  {
    id: "s01-insight-ne-pas-sandwich",
    type: "insight-card",
    targetItemIds: ["grammar-ne-pas-sandwich", "chunk-je-ne-suis-pas"],
    weakPointTags: ["negation", "ne-pas"],
    payload: {
      insightType: "grammar-nugget",
      title: "Two pieces, one on each side.",
      body:
        "To make a sentence negative, French wraps the action. ne goes in " +
        "front, pas goes after, and the verb sits between them. Watch what " +
        "moves between the two pairs below, and what does not.",
      // DRAWN, not described. The body used to make this argument in prose
      // while the examples underneath sat as four flat italic lines, so the
      // learner read that something wraps the verb and then saw nothing wrap
      // anything. The frame puts the two halves either side of a box, and the
      // box is the only thing that changes down the page: suis, then est.
      //
      // The affirmative stays flat above each negative on purpose. The contrast
      // is the teaching, and marking both would leave nothing for the marks to
      // mean.
      examples: [
        { fr: "Je suis ici.", en: "I am here." },
        {
          fr: "Je ne suis pas ici.",
          en: "I am not here.",
          frame: { lead: "Je", open: "ne", inside: "suis", close: "pas", trail: "ici." },
        },
        { fr: "C'est ici.", en: "It is here." },
        {
          fr: "Ce n'est pas ici.",
          en: "It is not here.",
          // The same move wearing an apostrophe. ne elides before a vowel, which
          // is why the opening half is authored rather than assumed: a renderer
          // that hard-coded "ne" would have to lie about this line.
          frame: { lead: "Ce", open: "n'", inside: "est", close: "pas", trail: "ici." },
          note: "Same two halves. Before a vowel, ne loses its e and leans on the verb: n'est.",
        },
      ],
    },
  },


  {
    id: "s02-fill-verb-in-sandwich",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-ne-suis-pas"],
    weakPointTags: ["negation", "ne-pas"],
    payload: {
      prompt: "You want to say you are not there. Which word sits between the two pieces?",
      sentenceBefore: "Je ne",
      sentenceAfter: "pas ici.",
      blankCount: 1,
      options: [
        { id: "opt-suis", text: "suis", isCorrect: true },
        {
          id: "opt-voudrais",
          text: "voudrais",
          isCorrect: false,
          trapReason:
            "Je voudrais asks for something. Here you are saying where you are not, so the verb is suis.",
        },
        {
          id: "opt-bonjour",
          text: "bonjour",
          isCorrect: false,
          trapReason: "Bonjour is a greeting. It cannot sit between ne and pas.",
        },
      ],
      answer: ["opt-suis"],
      reveal: {
        short: "suis",
        explanation: "The verb goes between the two pieces: je ne suis pas.",
        natural: "Je ne suis pas ici.",
      },
    },
  },


  {
    id: "s04-insight-oui-non",
    type: "insight-card",
    targetItemIds: ["chunk-oui", "chunk-non"],
    payload: {
      insightType: "micro-contrast",
      title: "Oui and non.",
      body:
        "Oui opens the door: yes. Non closes it: no. They are the fastest " +
        "answers in French. Non also begins a polite refusal: non merci.",
      examples: [
        { fr: "Oui.", en: "Yes." },
        { fr: "Non, merci.", en: "No, thank you." },
      ],
    },
  },

  activityChain({
    id: "s22-chain-turning-it-down",
    intro:
      "Refusing and correcting are the same move in French. You will make it twice here, once about yourself and once about a place.",
    steps: [
      {
        id: "s05-fill-refuse-politely",
        type: "fill-with-traps",
        targetItemIds: ["chunk-non-merci", "chunk-non"],
        weakPointTags: ["politeness", "negation"],
        payload: {
          prompt: "Someone offers you something you don't want. Refuse politely.",
          blankCount: 1,
          options: [
            { id: "opt-non-merci", text: "Non merci", isCorrect: true },
            {
              id: "opt-oui-merci",
              text: "Oui merci",
              isCorrect: false,
              trapReason: "Oui accepts the offer. To refuse, start with non.",
            },
            {
              id: "opt-merci",
              text: "Merci",
              isCorrect: false,
              trapReason:
                "Merci alone can sound like yes please. Non merci makes the refusal clear.",
            },
          ],
          answer: ["opt-non-merci"],
          reveal: {
            short: "Non merci",
            explanation:
              "Non merci is a soft, complete refusal. It says no without sounding sharp.",
            natural: "Non merci.",
          },
        },
      },
      {
        id: "s06-weave-je-ne-suis-pas-ici",
        type: "weave",
        targetItemIds: ["chunk-je-ne-suis-pas", "chunk-je-suis"],
        weakPointTags: ["negation", "ne-pas"],
        payload: {
          weaveType: "mid",
          prompt: "Tell them you are not there.",
          context: "Someone is looking for you in the wrong room. From the doorway: « Bonjour ? »",
          suggestedPieces: [
            { text: "je ne suis pas", itemId: "chunk-je-ne-suis-pas", required: true, label: "negative frame" },
            { text: "ici", itemId: "word-ici", required: true, label: "place word" },
          ],
          expectedAnswers: ["Je ne suis pas ici."],
          reveal: {
            modelAnswer: "Je ne suis pas ici.",
            ifCorrect: "You turned a sentence negative. The two pieces hold.",
            ifCorrectButFlat: "Right. ne and pas wrap the verb.",
            ifUnderstandableButWrong:
              "Your meaning lands. A native wraps the verb this way: ne suis pas.",
            ifMissingTargetPiece: "Keep ne and pas together around suis.",
          },
          validationMode: "exact-or-alternative",
        },
      },
      {
        // Moved next to the weave that produces it (F-12): this breaks the run of
        // three consecutive weaves and puts first contact right before production.
        id: "s03-meet-ce-n-est-pas-ici",
        type: "meet-card",
        targetItemIds: ["chunk-ce-n-est-pas", "chunk-c-est"],
        weakPointTags: ["negation", "elision"],
        payload: {
          fr: "Ce n'est pas ici.",
          en: "It is not here.",
          title: "The same two pieces work on c'est.",
          highlights: [
            { text: "ce n'est pas", itemId: "chunk-ce-n-est-pas" },
            { text: "ici", itemId: "word-ici" },
          ],
          tts: true,
        },
      },
      {
        id: "s07-weave-ce-n-est-pas-ici",
        type: "weave",
        targetItemIds: ["chunk-ce-n-est-pas", "chunk-c-est"],
        weakPointTags: ["negation", "elision"],
        payload: {
          weaveType: "mid",
          prompt: "Tell them it is not the place.",
          context: "Someone points to the wrong place and checks: « Ici ? »",
          suggestedPieces: [
            { text: "ce n'est pas", itemId: "chunk-ce-n-est-pas", required: true, label: "negative frame" },
            { text: "ici", itemId: "word-ici", required: true, label: "place word" },
          ],
          expectedAnswers: ["Ce n'est pas ici."],
          acceptedAlternatives: [
            "Ce n est pas ici.",
            "Ce n est pas ici",
          ],
          reveal: {
            modelAnswer: "Ce n'est pas ici.",
            ifCorrect: "Same two pieces, new sentence: ce n'est pas.",
            ifCorrectButFlat: "Right. ne becomes n' before est, and pas closes it.",
            ifUnderstandableButWrong:
              "Your meaning lands. The negative wraps c'est the same way: ce n'est pas.",
            ifMissingTargetPiece: "Use the whole piece: ce n'est pas.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),

  activityChain({
    id: "s23-chain-when-you-lose-it",
    intro:
      "Not following someone and not being somewhere are the same shape in French. Here they arrive one after the other.",
    steps: [
      {
        // The third verb the sandwich wraps, and the first negation in this lesson
        // that is not about a place. Registered and frozen with the original L1
        // ledger but never reached by a payload until now.
        //
        // Canon guard: this stays ONE whole survival formula. The learner is shown
        // that the familiar two pieces are visible around it — that is recognition
        // of the pattern they own — but `comprends` is never presented as a verb
        // they can conjugate, and the chunk is never decomposed into ne + verb + pas.
        id: "s11-meet-je-ne-comprends-pas",
        type: "meet-card",
        targetItemIds: ["chunk-je-ne-comprends-pas"],
        weakPointTags: ["negation", "ne-pas"],
        payload: {
          fr: "Je ne comprends pas.",
          en: "I don't understand.",
          title: "The same two pieces, somewhere you will actually need them.",
          highlights: [
            { text: "je ne comprends pas", itemId: "chunk-je-ne-comprends-pas" },
          ],
          tts: true,
        },
      },
      {
        // Context weave: the situation does the work, and there is no tray to lean
        // on. Every negation the learner has produced so far ended in `ici`; this
        // one cannot, which is the whole point of placing it here.
        id: "s12-weave-je-ne-comprends-pas",
        type: "weave",
        targetItemIds: ["chunk-je-ne-comprends-pas"],
        evidenceTargetItemIds: ["chunk-je-ne-comprends-pas"],
        weakPointTags: ["negation", "ne-pas"],
        payload: {
          weaveType: "context",
          prompt: "Tell them it went past you.",
          context:
            "They answer you quickly, in a long sentence, and then wait: « Oui ? » You caught almost none of it.",
          expectedAnswers: ["Je ne comprends pas."],
          acceptedAlternatives: [
            "Je ne comprends pas",
            "Non, je ne comprends pas.",
          ],
          reveal: {
            modelAnswer: "Je ne comprends pas.",
            ifCorrect:
              "That is the most useful negative sentence you will own for a long time.",
            ifCorrectButFlat:
              "Right. Same two pieces you have been wrapping all lesson.",
            ifUnderstandableButWrong:
              "Your meaning lands. The whole thing travels together: je ne comprends pas.",
            ifMissingTargetPiece:
              "ne in front, pas behind, exactly as before, around a different word.",
          },
          validationMode: "exact-or-alternative",
        },
      },
      {
        id: "s08-weave-non-je-ne-suis-pas-ici",
        type: "weave",
        targetItemIds: ["chunk-non", "chunk-je-ne-suis-pas"],
        weakPointTags: ["negation"],
        payload: {
          weaveType: "mid",
          prompt: "Answer them, then say you are not there.",
          context:
            "They ask through the door whether you are the one they are looking for. You are not.",
          suggestedPieces: [
            { text: "Non", itemId: "chunk-non", required: true, label: "no" },
            { text: "je ne suis pas", itemId: "chunk-je-ne-suis-pas", required: true, label: "negative frame" },
            { text: "ici", itemId: "word-ici", required: true, label: "place word" },
          ],
          hintCloze: "Non, je ne suis pas ___.",
          expectedAnswers: ["Non, je ne suis pas ici."],
          reveal: {
            modelAnswer: "Non, je ne suis pas ici.",
            ifCorrect: "Answer plus sentence. That is how a real no sounds.",
            ifCorrectButFlat: "Right. Non answers; ne and pas carry the rest.",
            ifUnderstandableButWrong:
              "Your meaning lands. The answer comes first, then the sentence: Non, je ne suis pas ici.",
            ifMissingTargetPiece: "Start with Non, then je ne suis pas ici.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),

  activityChain({
    id: "s17-chain-answer-and-flip",
    intro:
      "You are the person someone found. Being asked twice, about two different places, is the whole test.",
    steps: [
        {
          // Corpus closure, and the Payload Economy §4.2 payoff: oui becomes a
          // producible ANSWER. The post-L3 trap rule was only ever about oui in the
          // WRONG SLOT -- inside a question or a statement -- and those traps stay
          // exactly where they are in L8/L13/L14. Answering a yes/no question with it
          // is what the word is for, and L3 never once let the learner do it.
          id: "s14-fill-answer-yes-or-no",
          type: "fill-with-traps",
          targetItemIds: ["chunk-oui", "chunk-non"],
          weakPointTags: ["negation"],
          payload: {
            prompt:
              "They cannot see the room you are standing in, so they ask whether you have arrived. You have.",
            blankCount: 1,
            // This used to offer the whole sentence, which the very next step
            // then asked the learner to type. Choosing a sentence and then
            // copying it is not retrieval. The choice here is the one that
            // actually needs making -- which answer is TRUE -- and the sentence
            // that carries it is the learner's to supply next.
            options: [
              { id: "opt-oui", text: "Oui", isCorrect: true },
              {
                id: "opt-non",
                text: "Non",
                isCorrect: false,
                trapReason:
                  "That is the honest answer to the opposite situation. You are there, so this one sends them away.",
              },
              {
                id: "opt-pas-compris",
                text: "Je ne comprends pas",
                isCorrect: false,
                trapReason:
                  "You understood the question perfectly. This answers a different problem.",
              },
            ],
            answer: ["opt-oui"],
            reveal: {
              short: "Oui",
              explanation:
                "Oui is the answer. On its own it is thinner than it needs to be: French expects the yes and then the thing you are saying yes about.",
              natural: "Oui",
            },
          },
        },
        {
          // Production of the positive answer, so oui is not merely recognised. The
          // negative half of this pair is already produced at s08, which makes this
          // the screen that turns L3 from a negation drill into a lesson about
          // choosing which answer is true.
          id: "s15-weave-answer-yes",
          type: "weave",
          targetItemIds: ["chunk-oui", "chunk-je-suis-ici"],
          weakPointTags: ["negation", "natural-speech"],
          payload: {
            weaveType: "open",
            prompt: "Answer them, then say where you are.",
            context: "The question comes down the hallway: « Bonjour ? » You are in the room.",
            suggestedPieces: [
              { text: "oui", itemId: "chunk-oui", label: "the answer" },
              { text: "je suis", itemId: "chunk-je-suis", label: "I am" },
              { text: "ici", itemId: "word-ici", label: "here" },
            ],
            hintCloze: "Oui, ___.",
            expectedAnswers: ["Oui, je suis ici."],
            acceptedAlternatives: ["Oui. Je suis ici.", "Oui, je suis ici"],
            reveal: {
              modelAnswer: "Oui, je suis ici.",
              ifCorrect: "Yes, and then the useful part. That is a whole answer.",
              ifCorrectButFlat: "Right. Oui opens it; the engine finishes it.",
              ifUnderstandableButWrong:
                "Your meaning lands. Answer first with oui, then say where you are.",
              ifMissingTargetPiece: "Oui answers the question. Je suis ici says the rest.",
            },
            validationMode: "exact-or-alternative",
          },
        },
        {
          // The negative counterpart at the same low support, about a PLACE rather
          // than a person. L3 already produces ce n'est pas ici at s07 under a
          // supplied tray; here the learner has to choose the ce n'est pas frame over
          // the je ne suis pas one, which is the distinction the lesson exists for.
          id: "s16-weave-not-that-place",
          type: "weave",
          targetItemIds: ["chunk-non", "chunk-ce-n-est-pas"],
          weakPointTags: ["negation"],
          payload: {
            weaveType: "open",
            prompt: "Answer them, then say it is not the place.",
            context:
              "Someone stops in the doorway and asks whether this is the room they want. It is not.",
            suggestedPieces: [
              { text: "non", itemId: "chunk-non", label: "the answer" },
              { text: "ce n'est pas", itemId: "chunk-ce-n-est-pas", label: "it isn't" },
              { text: "ici", itemId: "word-ici", label: "here" },
            ],
            hintCloze: "Non, ___ ici.",
            expectedAnswers: ["Non, ce n'est pas ici."],
            acceptedAlternatives: ["Non. Ce n'est pas ici.", "Non, ce n'est pas ici"],
            reveal: {
              modelAnswer: "Non, ce n'est pas ici.",
              ifCorrect:
                "The right no for a place. Je ne suis pas would have been about you instead.",
              ifCorrectButFlat: "Right. Non answers; ce n'est pas corrects the place.",
              ifUnderstandableButWrong:
                "Your meaning lands. A place takes ce n'est pas, not je ne suis pas.",
              ifMissingTargetPiece:
                "Non answers them. Ce n'est pas ici says which place it is not.",
            },
            validationMode: "exact-or-alternative",
          },
        },
    ],
  }),


  {
    // New screen family for L3. It does not add a rule; it shows the rule
    // holding across three different verbs the learner has now actually
    // negated, which is what turns ne … pas from a memorised line into a
    // transform they can point at anything.
    id: "s13-natural-reveal-one-transform",
    type: "natural-reveal",
    targetItemIds: [
      "grammar-ne-pas-sandwich",
      "chunk-je-ne-suis-pas",
      "chunk-ce-n-est-pas",
      "chunk-je-ne-comprends-pas",
    ],
    payload: {
      explanation:
        "Three different sentences. One move.\n" +
        "ne went in front, pas went behind, and whatever was doing the work sat in the middle. You did it to where you are, to what something is, and to whether you followed. Nothing about the wrapping changed. Only what you wrapped.",
      naturalAlternatives: [
        "Je ne suis pas ici.",
        "Ce n'est pas ici.",
        "Je ne comprends pas.",
      ],
    },
  },


  {
    id: "s09-sayit-not-here",
    type: "say-it-your-way",
    targetItemIds: ["chunk-non", "chunk-je-ne-suis-pas", "chunk-non-merci"],
    weakPointTags: ["negation", "natural-speech"],
    payload: {
      // Two honest exits now, not one: the moment contains both a wrong place
      // and a sentence that got away from the learner, so refusing and
      // admitting incomprehension are each truthful answers. The learner has to
      // decide which one this moment is actually asking for.
      situation:
        "You are at the wrong place. Someone is expecting you somewhere else, " +
        "and they are explaining where, quickly.",
      communicativeGoal: "Say no, or say you did not follow.",
      // The first rung points at the decision, not at the words. Two of the
      // pieces below are complete answers to this prompt, which is why they now
      // sit two rungs down instead of arriving with the first tap.
      hintDirection:
        "Two honest answers here. Either tell them they have the wrong person, or tell them you did not catch it.",
      suggestedPieces: [
        { text: "Non", itemId: "chunk-non" },
        { text: "je ne suis pas", itemId: "chunk-je-ne-suis-pas" },
        { text: "ici", itemId: "word-ici" },
        { text: "je ne comprends pas", itemId: "chunk-je-ne-comprends-pas" },
      ],
      modelAnswer: "Non, je ne suis pas ici.",
      // THE SECOND EXIT, DECLARED. The goal line offers two honest answers and
      // the lesson teaches both, but the reveal could only read the attempt
      // against the model — so "Je ne comprends pas", produced two screens
      // earlier in this same lesson, came back as if nothing had landed.
      //
      // Only answers that truly fit THIS scene are here. Someone is explaining
      // where you should be, quickly, and you are in the wrong place: refusing
      // and admitting you did not follow are both true, with or without the
      // opening non. "Non, ce n'est pas ici." is NOT here — the question is
      // about you, not about the place.
      acceptedAlternatives: [
        "Je ne suis pas ici.",
        "Non, je ne comprends pas.",
        "Je ne comprends pas.",
      ],
      reveal: {
        modelAnswer: "Non, je ne suis pas ici.",
        // Labelled, because acceptance is not equivalence. These are different
        // answers to the same moment and the learner should leave knowing which
        // one they chose, not with the impression that any of them would do.
        naturalAlternatives: [
          { when: "Shorter", fr: "Je ne suis pas ici." },
          { when: "If you did not follow", fr: "Non, je ne comprends pas." },
        ],
        explanation:
          "Non answers the call before you explain anything. Je ne suis pas ici states the fact on its own. Je ne comprends pas says something different and just as true: the explanation went past you. Same two pieces underneath each negative.",
      },
      validationMode: "model-answer-only",
    },
  },


  {
    id: "s10-recap-negation",
    type: "recap",
    payload: {
      title: "You can say no now.",
      lines: [
        "You wrapped a sentence with ne and pas.",
        "You turned je suis into je ne suis pas, and c'est into ce n'est pas.",
        "You used the same wrap where it matters most: je ne comprends pas.",
        "You refused politely with non merci.",
      ],
      piecesUsed: [
        "non",
        "je ne suis pas",
        "ce n'est pas",
        "je ne comprends pas",
        "non merci",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson003: Lesson = {
  id: "v1-lesson-003",
  version: "v1",
  number: 3,
  title: "Non",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "pronoun-particle",
  journeyRole: "standard",
  acquisitionDemandItemIds: [
    "chunk-je-ne-suis-pas",
    "chunk-ce-n-est-pas",
    "chunk-non",
    "chunk-je-ne-comprends-pas",
  ],
  estimatedMinutes: 8,
  canDo: "Say no, and say what is not true.",
  whyItExists:
    "L1 and L2 gave the learner sentences they could say. L3 gives the opposite move: how to say no and how to make a sentence negative. ne and pas wrap the verb, the first reusable transform in the slice. L3 stays bounded to the ne ... pas sandwich plus oui, non, and a polite refusal; wider negation and question forms are deferred.",
  prerequisites: ["v1-lesson-002"],
  learningItems: getItems([
    "chunk-non",
    "chunk-oui",
    "chunk-je-ne-suis-pas",
    "chunk-ce-n-est-pas",
    "chunk-non-merci",
    "grammar-ne-pas-sandwich",
    // Activated in this pass: frozen in the original ledger, never reached by a
    // payload. It is the only negation in L3 that is not about a place.
    "chunk-je-ne-comprends-pas",
    // PRE-EXISTING RUNTIME DEFECT, fixed here because it makes L3 unplayable.
    // s00-meet and s02-fill/s06-weave already targeted chunk-je-suis, and
    // s03-meet/s07-weave already targeted chunk-c-est, but neither was declared
    // in learningItems. resolveLessonTreatmentForItem refuses to guess an
    // unstated treatment, so recordExposure threw an uncaught
    // LessonTreatmentError partway through the lesson. Both are recycles, not
    // new demands: je suis is owned by L2, and c'est is the shape L3 negates.
    "chunk-je-suis",
    "chunk-c-est",
    // Corpus closure: L2's completed engine, recycled so the POSITIVE answer
    // (s14/s15) has something true to say after oui. L3 could previously only
    // answer in the negative, which made the lesson a negation drill rather than
    // a choice between answers. Recycled, not re-taught, and not a demand.
    "chunk-je-suis-ici",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "First Training Pack lesson under the Training Content Factory contract. L3 maps to the slice-spec PR G. Owned core: the ne ... pas sandwich as a two-part negative frame.",
    "Metaphor: metaphor-negation-sandwich. ne and pas sit around the action, one on each side. Early naming only; do not imply it is the only negation form.",
    "Negation is taught as a transform of owned sentences: je suis ici becomes je ne suis pas ici; c'est becomes ce n'est pas.",
    "Every negation in the original L3 ended in ici, which made the transform look like a fact about places. je ne comprends pas is the third verb the sandwich wraps and the first negation here that is not locational.",
    "je ne comprends pas stays ONE closed survival formula. The learner is shown the familiar two pieces sitting around it, but comprends is never offered as a conjugable verb and the chunk is never decomposed.",
    "s13 is a natural-reveal, not a fourth insight card: L3 is already at the three-insight canon budget.",
    "oui and non enter as the fastest answers; non also opens the polite refusal non merci. oui and non are answers only, not a question system.",
    "Compact, negation-centered slice. tu/vous register work, yes-no question asking, and ça / pronoun-ca remain deferred from L3 to hold cognitive load.",
    "No runtime Review, Checkpoint, or Mon Lexique surfaces are added; the Training Pack review and checkpoint material exists as PR notes only.",
    "Tone stays polite and neutral throughout. SayIt is deterministic and model-answer-only, consistent with L0-L2.",
    "No XP / streak / level-up / mission copy.",
  ],
  qaChecks: [
    "TTS reads Je ne suis pas ici, Ce n'est pas ici, and Non merci cleanly.",
    "Apostrophe normalization handles curly quotes in ce n'est pas; the unaccented ce n est variant passes Weave.",
    "Casing variants pass Weave via accepted alternatives.",
    "s02 trap reasons fire on voudrais and bonjour selections.",
    "No repeated negation tokens (ne ne / pas pas) in any French string.",
    "TTS reads Je ne comprends pas cleanly.",
    "s12 renders with no piece tray and no hint link, and accepts the bare-period variant.",
    "s13 renders three alternatives, one per negated verb, and grades nothing.",
    "No theatrical positivity tokens appear.",
  ],
};
