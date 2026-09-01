import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";
import { activityChain } from "../activityChain";

const screens: LessonScreen[] = [


  {
    // L8's world is orientation, and it is where the learner stops being able
    // only to ANSWER questions and starts being able to ask them. est-ce que is
    // pulled forward from L12 by founder decision: it is the single highest
    // leverage construction available, because it turns any owned statement
    // into a question without teaching a new verb form.
    id: "s20-showcase-asking",
    type: "showcase",
    payload: {
      intro:
        "Until now you could answer. Today you can ask. One small frame turns almost any sentence you already own into a question.",
      clusters: [
        {
          label: "Asking where",
          sentences: [
            { fr: "C'est où ?", en: "Where is it?", role: "core", itemIds: ["chunk-c-est-ou"] },
            { fr: "Excusez-moi, c'est où ?", en: "Excuse me, where is it?", role: "core" },
            { fr: "Le café, c'est où ?", en: "The café, where is it?", role: "supported" },
            { fr: "C'est loin ?", en: "Is it far?", role: "exposure" },
          ],
        },
        {
          label: "Turning a sentence into a question",
          sentences: [
            {
              fr: "Est-ce que c'est ici ?",
              en: "Is it here?",
              role: "core",
              itemIds: ["chunk-est-ce-que"],
            },
            // These three wrap SECOND-PERSON verbs the path does not own, so
            // they are exposure: heard and understood, never a graded answer.
            // The one wrap L8 can legitimately demand is the one above it.
            { fr: "Est-ce que vous avez un café ?", en: "Do you have a coffee?", role: "exposure" },
            { fr: "Est-ce que vous comprenez ?", en: "Do you understand?", role: "exposure" },
            { fr: "Est-ce que c'est loin ?", en: "Is it far?", role: "exposure" },
          ],
        },
        {
          label: "Answering someone else",
          sentences: [
            { fr: "C'est ici.", en: "It's here.", role: "core", itemIds: ["chunk-c-est"] },
            { fr: "Oui, c'est ici.", en: "Yes, it's here.", role: "core" },
            { fr: "Non, ce n'est pas ici.", en: "No, it's not here.", role: "core", itemIds: ["chunk-ce-n-est-pas"] },
            { fr: "C'est par là.", en: "It's that way.", role: "exposure" },
            { fr: "Je ne sais pas, désolé.", en: "I don't know, sorry.", role: "exposure" },
          ],
        },
        {
          label: "When the answer is too fast",
          sentences: [
            {
              fr: "Vous pouvez répéter ?",
              en: "Can you say that again?",
              role: "core",
              itemIds: ["chunk-vous-pouvez-repeter"],
            },
            { fr: "Plus lentement, s'il vous plaît.", en: "More slowly, please.", role: "exposure" },
            { fr: "Vous pouvez montrer ?", en: "Can you show me?", role: "exposure" },
          ],
        },
      ],
    },
  },


  {
    id: "s00-goal-ou",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Asking where",
      body:
        "Today: the smallest useful question, c'est où ?\n" +
        "By the end: you can ask where something is, and answer.\n" +
        "Main pieces: où, c'est, ici.",
    },
  },

  activityChain({
    id: "s22-chain-asking-where",
    intro:
      "One frozen question opens almost every building you will ever stand in.",
    steps: [
      {
        id: "s01-meet-c-est-ou",
        type: "meet-card",
        targetItemIds: ["chunk-c-est-ou", "adverb-ou-where"],
        payload: {
          fr: "C'est où ?",
          en: "Where is it?",
          title: "Two words. One question.",
          highlights: [
            { text: "c'est", itemId: "chunk-c-est" },
            { text: "où", itemId: "adverb-ou-where" },
          ],
          tts: true,
        },
      },
      {
        id: "s03-fill-c-est-blank",
        type: "fill-with-traps",
        targetItemIds: ["adverb-ou-where", "chunk-c-est-ou"],
        payload: {
          prompt: "You need a room and cannot see it. Which word asks?",
          sentenceBefore: "C'est ",
          sentenceAfter: " ?",
          blankCount: 1,
          options: [
            { id: "opt-ou", text: "où", isCorrect: true },
            {
              id: "opt-ici",
              text: "ici",
              isCorrect: false,
              trapReason:
                "Ici answers the question. It says here. It cannot ask where.",
            },
            {
              id: "opt-oui",
              text: "oui",
              isCorrect: false,
              trapReason: "Oui says yes. It cannot ask anything.",
            },
          ],
          answer: ["opt-ou"],
          reveal: {
            short: "où",
            explanation: "Où = where. It turns c'est into a question.",
            natural: "C'est où ?",
          },
        },
      },
      {
        id: "s04-weave-ask-where",
        type: "weave",
        targetItemIds: ["chunk-c-est-ou", "adverb-ou-where"],
        payload: {
          // The scene carries the task. Pieces stay behind the hint button and the
          // cloze holds only the shape, so the question itself is the learner's.
          weaveType: "context",
          prompt: "Ask where it is.",
          context:
            "You're looking for the room. Someone friendly is standing nearby.",
          suggestedPieces: [
            { text: "c'est", itemId: "chunk-c-est", label: "it is" },
            { text: "où", itemId: "adverb-ou-where", label: "where" },
          ],
          hintCloze: "C'est ___ ?",
          expectedAnswers: ["C'est où ?"],
          acceptedAlternatives: ["C'est où", "c'est où"],
          reveal: {
            modelAnswer: "C'est où ?",
            ifCorrect: "Two words you already had, one new question.",
            ifCorrectButFlat: "Right. The rising tone does the asking.",
            ifUnderstandableButWrong:
              "Your meaning lands. Spoken French keeps it this short: C'est où ?",
            ifMissingTargetPiece: "Où is the word that asks. Put it after c'est.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),


  {
    // Reflection, placed after the learner has actually asked once.
    id: "s02-insight-ou-frozen",
    type: "insight-card",
    targetItemIds: ["chunk-c-est-ou"],
    payload: {
      insightType: "grammar-nugget",
      title: "It's... where?",
      body:
        "Où = where. Spoken French loves this shape: C'est où ? Literally, \"it's where?\". You already own c'est. Take the question whole.",
      examples: [
        { fr: "C'est où ?", en: "Where is it?" },
        { fr: "Le café, c'est où ?", en: "The café, where is it?" },
      ],
    },
  },

  activityChain({
    id: "s23-chain-and-answering-it",
    intro:
      "The same small words point the other way when you are the one who knows.",
    steps: [
      {
        // First contact with the ANSWER side. The learner owns c'est and ici
        // separately, but has never met them joined as the reply to the question
        // just asked, so the next weave is no longer a cold ask.
        id: "s08-meet-c-est-ici",
        type: "meet-card",
        targetItemIds: ["chunk-c-est"],
        payload: {
          fr: "C'est ici.",
          en: "It's here.",
          title: "The other side of the question.",
          highlights: [
            { text: "c'est", itemId: "chunk-c-est" },
            { text: "ici", itemId: "word-ici" },
          ],
          tts: true,
        },
      },
      {
        // One small contrast before the answer weave: which word replies, and
        // which word asks.
        id: "s09-fill-which-side",
        type: "fill-with-traps",
        targetItemIds: ["chunk-c-est"],
        payload: {
          prompt: "Someone asks you where it is. You are standing at the door. Which word answers?",
          sentenceBefore: "C'est ",
          sentenceAfter: ".",
          blankCount: 1,
          options: [
            { id: "opt-ici-answer", text: "ici", isCorrect: true },
            {
              id: "opt-ou-answer",
              text: "où",
              isCorrect: false,
              trapReason:
                "Où asks the question. Using it here would hand the question back instead of answering it.",
            },
            {
              id: "opt-oui-answer",
              text: "oui",
              isCorrect: false,
              trapReason: "Oui says yes. Nobody asked a yes or no question.",
            },
          ],
          answer: ["opt-ici-answer"],
          reveal: {
            short: "ici",
            explanation: "Ici = here. It lands the answer where you are standing.",
            natural: "C'est ici.",
          },
        },
      },
      {
        id: "s05-weave-answer-here",
        type: "weave",
        targetItemIds: ["chunk-c-est"],
        payload: {
          weaveType: "context",
          prompt: "Tell them: it's here.",
          context:
            "Now you're the local. Someone asks you C'est où ? And you're standing right at the door.",
          suggestedPieces: [
            { text: "c'est", itemId: "chunk-c-est", label: "it is" },
            { text: "ici", itemId: "word-ici", label: "here" },
          ],
          hintCloze: "C'est ___.",
          expectedAnswers: ["C'est ici."],
          reveal: {
            modelAnswer: "C'est ici.",
            ifCorrect: "Question and answer. Both sides are yours now.",
            ifCorrectButFlat: "Right. The same pieces that asked now answer.",
            ifUnderstandableButWrong:
              "Your meaning lands. Spoken French answers just as short: C'est ici.",
            ifMissingTargetPiece: "C'est carries the answer. Ici lands it.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),

  activityChain({
    id: "s21-chain-ask-it-back",
    intro:
      "You already have two ways to talk about a place. This is the third, and it is the one that asks.",
    steps: [
        {
          // est-ce que, pulled forward from L12 by founder decision. It is the single
          // highest-leverage construction available to the early path: it turns a
          // sentence the learner already owns into a question without teaching one
          // new verb form. L8 is its home because this is the orientation lesson --
          // the learner has spent it being ASKED things and answering, and here they
          // can finally ask back.
          //
          // Scope is deliberately one wrap. Nearly every proposition L1-L8 owns is
          // first-person (je suis, j'ai, je voudrais, je vais), and asking yourself a
          // question is not a human moment; the useful second-person wraps need verb
          // forms the path does not own. So L8 owns the frame and one true wrap, and
          // L12 keeps the job of extending it.
          //
          // First contact happens on the Showcase, which shows and speaks this line
          // before the lesson starts -- so no separate meet card is needed, and the
          // lesson goes straight to the distinction that makes the frame worth owning: the learner already
          // has two ways to open their mouth about a place, and this is a third with
          // a different job. C'est où ? asks WHICH place. C'est ici. states one.
          // Est-ce que c'est ici ? checks one.
          id: "s18-fill-which-question",
          type: "fill-with-traps",
          targetItemIds: ["chunk-est-ce-que", "chunk-c-est-ou"],
          evidenceTargetItemIds: ["chunk-est-ce-que"],
          weakPointTags: ["natural-speech"],
          payload: {
            prompt:
              "You are standing at a door and you think this is the room, but you would rather check than walk in on strangers.",
            blankCount: 1,
            options: [
              { id: "opt-est-ce-que", text: "Est-ce que c'est ici ?", isCorrect: true },
              {
                id: "opt-ou",
                text: "C'est où ?",
                isCorrect: false,
                trapReason:
                  "That asks them to find it for you. You already think you have found it; you want a yes or a no.",
              },
              {
                id: "opt-statement",
                text: "C'est ici.",
                isCorrect: false,
                trapReason:
                  "That tells them it is the place. You are the one who does not know yet.",
              },
            ],
            answer: ["opt-est-ce-que"],
            reveal: {
              short: "Est-ce que c'est ici ?",
              explanation:
                "Put est-ce que in front of a sentence you own and it becomes a question. The sentence itself does not change at all.",
              natural: "Est-ce que c'est ici ?",
            },
          },
        },
        {
          id: "s19-weave-ask-it-back",
          type: "weave",
          targetItemIds: ["chunk-est-ce-que", "chunk-c-est"],
          evidenceTargetItemIds: ["chunk-est-ce-que"],
          weakPointTags: ["natural-speech"],
          payload: {
            weaveType: "open",
            prompt: "Check whether this is the place.",
            context:
              "The corridor has gone quiet and the door in front of you has no sign. Someone is passing.",
            suggestedPieces: [
              { text: "est-ce que", itemId: "chunk-est-ce-que", label: "makes it a question" },
              { text: "c'est", itemId: "chunk-c-est", label: "it is" },
              { text: "ici", itemId: "word-ici", label: "here" },
            ],
            hintCloze: "Est-ce que ___ ?",
            expectedAnswers: ["Est-ce que c'est ici ?"],
            acceptedAlternatives: ["Est-ce que c'est ici", "Excusez-moi, est-ce que c'est ici ?"],
            reveal: {
              modelAnswer: "Est-ce que c'est ici ?",
              ifCorrect:
                "You asked a question you were never taught as a phrase. You built it out of a sentence you already had.",
              ifCorrectButFlat: "Right. The frame goes in front; the sentence stays whole.",
              ifUnderstandableButWrong:
                "Your meaning lands. Est-ce que goes first, then the sentence you already own.",
              ifMissingTargetPiece:
                "Est-ce que turns it into a question. C'est ici is the sentence being asked about.",
            },
            validationMode: "exact-or-alternative",
          },
        },
    ],
  }),

  activityChain({
    id: "s24-chain-the-wrong-door",
    intro:
      "You followed the directions. The directions were not enough.",
    steps: [
      {
        // L8's job is PORTABILITY, and until here the lesson only had two scenes
        // with two answers. This is the third answer the pair has always implied
        // and never said: no. Every piece is owned (ce n'est pas from L3, ici from
        // L2), so the new thing is the situation, not the grammar.
        id: "s11-fill-wrong-door",
        type: "fill-with-traps",
        targetItemIds: ["chunk-ce-n-est-pas", "chunk-c-est"],
        weakPointTags: ["negation"],
        payload: {
          prompt:
            "Someone stops at your door and asks C'est où ? The room they want is not this one.",
          blankCount: 1,
          options: [
            { id: "opt-not-here", text: "Ce n'est pas ici.", isCorrect: true },
            {
              id: "opt-here",
              text: "C'est ici.",
              isCorrect: false,
              trapReason:
                "That says yes, this is the place. They would walk into the wrong room believing you.",
            },
            {
              id: "opt-ask-back",
              text: "C'est où ?",
              isCorrect: false,
              trapReason:
                "That hands the question straight back. They asked you first.",
            },
          ],
          answer: ["opt-not-here"],
          reveal: {
            short: "Ce n'est pas ici.",
            explanation:
              "The same shape you use to say where something is also says where it isn't. Ce n'est pas wraps it, ici lands it.",
            natural: "Ce n'est pas ici.",
          },
        },
      },
      {
        // Producing the negative answer, one scene later. The question travels; so
        // does its refusal.
        id: "s12-weave-not-this-one",
        type: "weave",
        targetItemIds: ["chunk-ce-n-est-pas"],
        weakPointTags: ["negation", "natural-speech"],
        payload: {
          weaveType: "context",
          prompt: "Tell them it isn't here.",
          context:
            "They are already reaching for the handle, and this is not their room.",
          suggestedPieces: [
            { text: "ce n'est pas", itemId: "chunk-ce-n-est-pas", label: "it isn't" },
            { text: "ici", itemId: "word-ici", label: "here" },
          ],
          hintCloze: "Ce n'est pas ___.",
          expectedAnswers: ["Ce n'est pas ici."],
          acceptedAlternatives: ["Ce n'est pas ici"],
          reveal: {
            modelAnswer: "Ce n'est pas ici.",
            ifCorrect: "Three answers now: here, not here, and the question itself.",
            ifCorrectButFlat: "Right. Short and clear, which is kinder than vague.",
            ifUnderstandableButWrong:
              "Your meaning lands. French wraps the no around the middle: ce n'est pas ici.",
            ifMissingTargetPiece:
              "Ce n'est pas carries the no. Ici says which place it is not.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),


  {
    // The lesson's summit and its least-scaffolded screen: the same question
    // from screen 4, now in a scene that will not hand it to you. Nobody is
    // waiting to be asked, so the learner has to open the moment first.
    id: "s13-weave-cut-in-and-ask",
    type: "weave",
    targetItemIds: ["chunk-excusez-moi", "chunk-c-est-ou"],
    weakPointTags: ["politeness"],
    payload: {
      weaveType: "open",
      prompt: "Get their attention, then ask where it is.",
      context:
        "This one is busy and facing away. A bare question would land like a tap on the shoulder.",
      suggestedPieces: [
        { text: "excusez-moi", itemId: "chunk-excusez-moi", label: "cutting in" },
        { text: "c'est", itemId: "chunk-c-est", label: "it is" },
        { text: "où", itemId: "adverb-ou-where", label: "where" },
      ],
      hintCloze: "Excusez-moi, ___ ?",
      expectedAnswers: ["Excusez-moi, c'est où ?"],
      acceptedAlternatives: [
        "Excusez-moi, c'est où",
        "Excusez-moi. C'est où ?",
        "Excusez-moi. C'est où",
      ],
      reveal: {
        modelAnswer: "Excusez-moi, c'est où ?",
        ifCorrect:
          "The question travelled. Same two words, a room that was not waiting for you.",
        ifCorrectButFlat:
          "Right. Excusez-moi buys the second you need before the question.",
        ifUnderstandableButWrong:
          "Your meaning lands. Open first, then ask: excusez-moi, then c'est où ?",
        ifMissingTargetPiece:
          "Excusez-moi opens the moment. C'est où ? is the question you already own.",
      },
      validationMode: "exact-or-alternative",
    },
  },

  activityChain({
    id: "s25-chain-when-they-ask-you",
    intro:
      "Standing here, the questions run both ways: sometimes you are the one who knows, and sometimes you are the one who did not catch the answer.",
    steps: [
      {
        // Corpus closure. L8 was the thinnest lesson on the path: one question and
        // two answers, all in one hallway. Two things the learner now owns further
        // upstream change that -- oui became a producible answer in L3, and the
        // repair formula was activated in L1 -- so the question can finally be
        // ANSWERED the way people answer it, and survived when the answer is too
        // fast.
        id: "s14-fill-answer-the-asker",
        type: "fill-with-traps",
        targetItemIds: ["chunk-oui", "chunk-c-est"],
        weakPointTags: ["natural-speech"],
        payload: {
          prompt:
            "They point at the door beside you and ask whether this is the one. It is.",
          blankCount: 1,
          options: [
            { id: "opt-oui-ici", text: "Oui, c'est ici.", isCorrect: true },
            {
              id: "opt-non-pas-ici",
              text: "Non, ce n'est pas ici.",
              isCorrect: false,
              trapReason:
                "That is the same sentence with the wrong polarity. It is the right door, so this sends them away from it.",
            },
            {
              id: "opt-ou",
              text: "C'est où ?",
              isCorrect: false,
              trapReason: "That hands the question back. They asked you.",
            },
          ],
          answer: ["opt-oui-ici"],
          reveal: {
            short: "Oui, c'est ici.",
            explanation:
              "Oui answers, then the sentence you own confirms it. A bare c'est ici works too; the yes makes it warmer.",
            natural: "Oui, c'est ici.",
          },
        },
      },
      {
        // The other half of being ASKED: sometimes you are the one who did not
        // follow. The survival formula from L1 travels into the orientation scene,
        // which is the portability claim L8 exists to make.
        id: "s15-fill-directions-too-fast",
        type: "fill-with-traps",
        targetItemIds: ["chunk-vous-pouvez-repeter"],
        weakPointTags: ["politeness"],
        payload: {
          prompt:
            "You asked where it was. The answer came back long, quick, and full of turns you did not catch.",
          blankCount: 1,
          options: [
            { id: "opt-repeter", text: "Vous pouvez répéter ?", isCorrect: true },
            {
              id: "opt-ici",
              text: "C'est ici.",
              isCorrect: false,
              trapReason:
                "That answers the question you asked, as if you were the one who knew.",
            },
            {
              id: "opt-merci",
              text: "Merci.",
              isCorrect: false,
              trapReason:
                "Polite, and it ends the exchange with you still lost.",
            },
          ],
          answer: ["opt-repeter"],
          reveal: {
            short: "Vous pouvez répéter ?",
            explanation:
              "The formula from your first lesson, working in a scene it was never taught in. That is what makes it survival French.",
            natural: "Vous pouvez répéter ?",
          },
        },
      },
      {
        // FRENCH-CONTEXT production. The scene is the question itself, in French,
        // and the English helper states only which way the answer goes. Every word
        // shown is owned, and the context does not leak the answer.
        id: "s16-weave-answer-in-french",
        type: "weave",
        targetItemIds: ["chunk-oui", "chunk-c-est"],
        weakPointTags: ["natural-speech"],
        payload: {
          weaveType: "open",
          prompt: "Answer them, then confirm the place.",
          context: "They stop beside you and ask: « C'est où ? » It is this room.",
          suggestedPieces: [
            { text: "oui", itemId: "chunk-oui", label: "the answer" },
            { text: "c'est", itemId: "chunk-c-est", label: "it is" },
            { text: "ici", itemId: "word-ici", label: "here" },
          ],
          hintCloze: "Oui, ___ ici.",
          expectedAnswers: ["Oui, c'est ici."],
          acceptedAlternatives: ["Oui. C'est ici.", "Oui, c'est ici"],
          reveal: {
            modelAnswer: "Oui, c'est ici.",
            ifCorrect:
              "You were asked in French and you answered in French. Both sides of the question are yours now.",
            ifCorrectButFlat: "Right. Oui carries the yes; c'est ici carries the place.",
            ifUnderstandableButWrong:
              "Your meaning lands. Answer first, then say which place.",
            ifMissingTargetPiece: "Oui answers them. C'est ici names the place.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),


  {
    // Reveal after both sides have been produced: the pair, heard together.
    id: "s10-reveal-both-sides",
    type: "natural-reveal",
    payload: {
      modelAnswer: "C'est où ? C'est ici.",
      naturalAlternatives: ["Le café, c'est où ?"],
      explanation:
        "The same two words do both jobs. Où turns it into a question; ici answers it. Put a name in front and you can ask about anything you can point at.",
    },
  },


  {
    id: "s06-sayit-find-the-room",
    type: "say-it-your-way",
    targetItemIds: ["chunk-c-est-ou"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "A hallway with three doors, no signs. Someone comes out of one of them. Find your room.",
      communicativeGoal: "Open politely, then ask where it is.",
      suggestedPieces: [
        { text: "bonjour", itemId: "chunk-bonjour" },
        { text: "c'est", itemId: "chunk-c-est" },
        { text: "où", itemId: "adverb-ou-where" },
      ],
      modelAnswer: "Bonjour, c'est où ?",
      reveal: {
        modelAnswer: "Bonjour, c'est où ?",
        naturalAlternatives: ["C'est où ?"],
        explanation:
          "Both work. Bonjour opens the moment first. The greeting habit, still carrying you.",
      },
      validationMode: "model-answer-only",
    },
  },


  {
    id: "s07-recap-ou",
    type: "recap",
    payload: {
      title: "You can ask where.",
      lines: [
        "You asked where something is, with two words you mostly had already.",
        "You answered the same question from the other side.",
        "Où is small, and it opens every place you'll ever look for.",
      ],
      piecesUsed: ["où", "c'est", "ici", "Bonjour"],
      nextLabel: "Continue",
    },
  },
];

export const lesson008: Lesson = {
  id: "v1-lesson-008",
  version: "v1",
  number: 8,
  title: "C'est où ?",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "chunk-natural-speech",
  journeyRole: "doorway",
  acquisitionDemandItemIds: ["chunk-c-est-ou", "chunk-est-ce-que"],
  estimatedMinutes: 9,
  canDo: "Ask where something is, and answer it's here.",
  whyItExists:
    "L7 gave direction (je vais). L8 gives orientation: the smallest natural question, C'est où ?, built almost entirely from owned pieces (c'est from L3, ici from L2). This is a COMPACT de-scope of the full L08 où/movement spec: no où est-ce que, no movement system, no new places: one frozen question and its answer.",
  prerequisites: ["v1-lesson-007"],
  learningItems: getItems([
    "chunk-c-est-ou",
    "adverb-ou-where",
    "chunk-c-est",
    "chunk-bonjour",
    // Recycled for the founder-usable pass, neither re-taught nor demanded.
    // ce n'est pas (L3) gives the question its third answer — the no — which
    // the ask/answer pair always implied and never said. excusez-moi (L1) is
    // what makes the question portable into a room that is not waiting for it
    // (s13). Both are targets, so the lesson must state their treatment.
    // It is not a demand; L8 demands c'est ou and est-ce que only.
    "chunk-ce-n-est-pas",
    "chunk-excusez-moi",
    // Corpus closure. Both are recycled, neither is re-taught or demanded.
    // chunk-oui (L3, rehabilitated as an answer by Payload Economy §4.2) lets
    // L8 answer its own question the way people actually answer it;
    // chunk-vous-pouvez-repeter (L1) is the survival formula travelling into an
    // orientation scene, which is the portability claim this lesson exists to
    // make. acquisitionDemandItemIds stays exactly ["chunk-c-est-ou"].
    "chunk-oui",
    "chunk-vous-pouvez-repeter",
    // Pulled forward from L12 by founder decision (see s17). L8 owns the frame
    // and the single wrap the path can lawfully demand; L12 is re-scoped to
    // extending it onto the permission and help material L11 introduces.
    "chunk-est-ce-que",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Compact de-scope of docs/syllabus/L08-ou-location-movement-questions.lesson-spec.md against the shipped registry: the owned unit is the frozen question chunk-c-est-ou; adverb-ou-where is supported inside the frame (same ownership pattern as ce n'est pas).",
    "No est-ce que frame, no où est, no movement/destination system, no new place nouns.",
    "Progression: context, context, then context and open. The founder-usable pass added s13 so the lesson ends on unsupplied production rather than holding flat at context. No weave carries constitutive support, so evidence class is unchanged.",
    "Founder-usable expansion: L8's job is PORTABILITY. The pair it teaches stops living in one hallway — s11 and s12 add the third answer (ce n'est pas ici, the no the pair always implied), and s13 carries the question into a room that is not waiting to be asked. All recycled from L1/L3; no new acquisition.",
    "Rhythm deliberately differs from L7 and L9: the ou insight is a REFLECTION placed after the first real ask, not a preamble, and the lesson runs ask-side then answer-side.",
    "Added screens carry one role each: s08 gives first contact with the joined answer form before it is produced, s09 contrasts which word asks and which answers, s10 reveals the pair working together.",
    "oui appears ONLY as a fill trap: it stays passive/recognition, never active-produced (L3 decision carried forward).",
    "Question-form Weave answers carry no-question-mark acceptedAlternatives (CI rule).",
    "Recycled load: chunk-c-est (target support), ici and chunk-bonjour as light carryover: the new question stays the headline of every screen.",
    "adverb-ou-where uses the disambiguated id recommended by L08 spec section 18: où (where) folds to ou (or) under accent-stripping, so the id carries the sense to avoid a future collision/migration.",
    "No learner-facing lesson numbers.",
    "Learner-visible: Home lists L1-L24 under a linear unlock, so this lesson opens once L7 is finished. The older note claiming Home capped the path at L6 was stale and was corrected during native verification of this path.",
  ],
  qaChecks: [
    "TTS reads C'est où ? with a natural question contour and no placeholder speech.",
    "s03 trap reasons fire on ici and oui.",
    "s09 trap reasons fire on où and oui.",
    "s04 accepts C'est où without the question mark via acceptedAlternatives.",
    "Recap chips are atoms/frames only; the full question C'est où ? never appears as a chip.",
    "où keeps its accent in all learner-facing strings.",
    "No streak/XP/mission language anywhere.",
  ],
};
