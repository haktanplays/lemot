import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";
import { activityChain } from "../activityChain";

const screens: LessonScreen[] = [


  {
    // L6 adds no new language. Its showcase is the first time the learner sees
    // the five previous lessons standing together as one usable repertoire, so
    // the width here is deliberately all recombination.
    id: "s20-showcase-a-small-moment",
    type: "showcase",
    payload: {
      // AUDITED, and the claim was not quite true. "Nothing here is new" sat
      // above three `exposure` lines — "Pardon, je n'ai pas compris.",
      // "Bonne journée !", "À bientôt !" — which the learner genuinely has not
      // met: all three are L7. The authoring role is deliberately not rendered,
      // so nothing on screen told them apart from the twenty sentences they
      // really do own.
      //
      // The preferred repair is to swap unreached French for reached French,
      // and here there is none to swap TO: no reached expression says "see you
      // soon" or softens a repair that way, and deleting the lines would cost
      // real exposure that L7 then builds on. So the CLAIM moved instead of the
      // content, and moved only as far as the truth required.
      intro:
        "Almost nothing here is new. This is everything you have built so far, arranged the way a real small moment actually uses it, from the door to the goodbye. A few lines you have not met yet sit in with them: read those, and let them go.",
      clusters: [
        {
          label: "Arriving",
          sentences: [
            { fr: "Bonjour.", en: "Hello.", role: "core", itemIds: ["chunk-bonjour"], flat: "formula" },
            { fr: "Bonjour, je suis ici.", en: "Hello, I'm here.", role: "core" },
            { fr: "Excusez-moi, je suis ici.", en: "Excuse me, I'm here.", role: "core" },
            { fr: "C'est ici.", en: "It's here.", role: "core", itemIds: ["chunk-c-est"] },
            { fr: "Ce n'est pas ici.", en: "It's not here.", role: "core", itemIds: ["chunk-ce-n-est-pas"] },
          ],
        },
        {
          label: "Saying what you need",
          sentences: [
            { fr: "J'ai une question.", en: "I have a question.", role: "core", itemIds: ["chunk-j-ai-une-question"] },
            { fr: "J'ai faim.", en: "I'm hungry.", role: "core", itemIds: ["chunk-j-ai-faim"] },
            { fr: "Je voudrais un café, s'il vous plaît.", en: "I would like a coffee, please.", role: "core" },
            { fr: "Non merci.", en: "No thanks.", role: "core", itemIds: ["chunk-non-merci"], depth: { usage: "Merci on its own, with a nod, can read as yes please at a counter. Non merci removes the doubt without sounding cold.", compare: "Non merci turns the offer down. Oui merci takes it. The merci does not change; the word in front of it decides." } },
          ],
        },
        {
          label: "When it goes wrong",
          sentences: [
            { fr: "Je ne comprends pas.", en: "I don't understand.", role: "core", itemIds: ["chunk-je-ne-comprends-pas"], flat: "formula" },
            { fr: "Excusez-moi, je ne comprends pas.", en: "Excuse me, I don't understand.", role: "core" },
            {
              fr: "Je ne comprends pas. Vous pouvez répéter ?",
              en: "I don't understand. Can you say that again?",
              role: "core",
              itemIds: ["chunk-vous-pouvez-repeter"],
              pieces: ["Je ne comprends pas", "vous pouvez", "répéter"],
            },
            { fr: "Pardon, je n'ai pas compris.", en: "Sorry, I didn't catch that.", role: "exposure", flat: "exposure" },
          ],
        },
        {
          label: "Leaving well",
          sentences: [
            { fr: "Merci.", en: "Thank you.", role: "core", itemIds: ["chunk-merci"], flat: "formula" },
            { fr: "Merci, au revoir.", en: "Thanks, goodbye.", role: "core", itemIds: ["chunk-au-revoir"], depth: { sound: "mair-SEE, oh ruh-VWAR", usage: "Said as one gesture on the way out, not as two separate remarks. The thanks and the goodbye travel together." } },
            { fr: "Bonne journée !", en: "Have a good day!", role: "exposure", flat: "formula" },
            { fr: "À bientôt !", en: "See you soon!", role: "exposure", flat: "formula" },
          ],
        },
        {
          label: "The whole moment",
          sentences: [
            {
              fr: "Bonjour. Je suis ici. J'ai une question.",
              en: "Hello. I'm here. I have a question.",
              role: "core",
              depth: { structure: "Three short sentences, not one long one. A French arrival is built in beats: greet, place yourself, then say what you came for.", usage: "The bonjour is the one that gets noticed if it is missing. The other two can wait; that one cannot." },
            },
            {
              fr: "Bonjour. Je suis ici. J'ai une question. Merci. Au revoir.",
              en: "Hello. I'm here. I have a question. Thank you. Goodbye.",
              role: "core",
            },
          ],
        },
      ],
    },
  },


  {
    id: "s00-goal-petit-moment",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "One small moment",
      body:
        "Today: no new rule.\n" +
        "By the end: you can carry one small human moment with pieces you already built.\n" +
        "Main pieces: bonjour, je suis, ici, c'est, j'ai, une question, je ne comprends pas, merci, au revoir.",
    },
  },

  activityChain({
    id: "s22-chain-at-the-door",
    intro:
      "Every small moment starts the same way: a door opens, and you have about two seconds.",
    steps: [
      {
        id: "s01-meet-bonjour-at-the-door",
        type: "meet-card",
        targetItemIds: ["chunk-bonjour"],
        payload: {
          fr: "Bonjour.",
          en: "Hello.",
          title: "At the door.",
          highlights: [{ text: "Bonjour", itemId: "chunk-bonjour" }],
          tts: true,
        },
      },
      {
        id: "s02-fill-right-place",
        type: "fill-with-traps",
        targetItemIds: ["chunk-je-suis-ici", "chunk-je-ne-suis-pas"],
        weakPointTags: ["avoir-vs-etre"],
        payload: {
          prompt: "You reach the right door and step in. What do you say?",
          blankCount: 1,
          options: [
            { id: "opt-ici", text: "Je suis ici.", isCorrect: true },
            {
              id: "opt-pas-ici",
              text: "Je ne suis pas ici.",
              isCorrect: false,
              trapReason:
                "That says the opposite. You are here, so: Je suis ici.",
            },
            {
              id: "opt-faim",
              text: "J'ai faim.",
              isCorrect: false,
              trapReason: "That is a feeling, not where you are.",
            },
          ],
          answer: ["opt-ici"],
          reveal: {
            short: "Je suis ici.",
            explanation: "You are in the right place, so you say where you are.",
            natural: "Je suis ici.",
          },
        },
      },
      {
        id: "s03-weave-bonjour-je-suis-ici",
        type: "weave",
        targetItemIds: ["chunk-bonjour", "chunk-je-suis-ici", "chunk-je-suis"],
        weakPointTags: ["natural-speech"],
        payload: {
          // L2 already asked for "Bonjour, je suis ici." at OPEN support, so
          // asking for it here behind a chip tray would be the same act with
          // more help -- the ladder running backwards. L6's claim is the whole
          // moment, so the arrival now carries the reason with it. Both halves
          // are owned, and the closing still belongs to s09.
          weaveType: "mid",
          // THE SCENE NOW CARRIES THE REASON. It asked the learner to "say what
          // you came for" and never told them what that was, so the model
          // answer's third beat — J'ai une question. — was information the
          // screen had withheld. A learner cannot produce a purpose nobody gave
          // them, and the gap read as their failure rather than the scene's.
          prompt: "Greet them, say you have arrived, and say what you came for.",
          context:
            "You are at the door with one small thing to ask. A voice from inside: « Bonjour ? »",
          // Authored facts, not read out of the prose above. `purposeKnown` is
          // what makes J'ai une question. a lawful ask on this screen at all.
          intent: "state-purpose",
          sceneFacts: ["purposeKnown", "formalRegister"],
          suggestedPieces: [
            { text: "Bonjour", itemId: "chunk-bonjour", required: true, label: "greeting" },
            { text: "je suis", itemId: "chunk-je-suis", required: true, label: "I am" },
            { text: "ici", itemId: "word-ici", required: true, label: "place word" },
            { text: "j'ai une question", itemId: "chunk-j-ai-une-question", label: "the reason" },
          ],
          hintCloze: "Bonjour. Je suis ___. J'ai ___.",
          expectedAnswers: ["Bonjour. Je suis ici. J'ai une question."],
          acceptedAlternatives: [
            "Bonjour, je suis ici. J'ai une question.",
            "Bonjour. Je suis ici. J ai une question.",
          ],
          reveal: {
            modelAnswer: "Bonjour. Je suis ici. J'ai une question.",
            ifCorrect: "Three short moves, and the whole arrival is done.",
            ifCorrectButFlat: "Right. Greet, place yourself, then say why you came.",
            ifUnderstandableButWrong:
              "Your meaning lands. A native opens first, then lands: Bonjour. Je suis ici.",
            ifMissingTargetPiece: "Start with bonjour, then je suis ici.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),


  {
    // The first beat that is not about the learner. s02 asked where THEY are;
    // this asks what the PLACE is, and the two are a real beginner confusion
    // that no earlier lesson has put side by side. Both sentences have been
    // owned since L3, so the whole difficulty is telling one from the other
    // when a moment needs a specific one.
    id: "s03b-fill-right-room",
    type: "fill-with-traps",
    targetItemIds: ["chunk-c-est", "chunk-ce-n-est-pas", "chunk-je-suis-ici"],
    evidenceTargetItemIds: ["chunk-c-est"],
    weakPointTags: ["negation"],
    payload: {
      prompt:
        "Someone arrives behind you, looking for the same meeting, and checks the door. Tell them this is the place.",
      blankCount: 1,
      options: [
        { id: "opt-c-est-ici", text: "C'est ici.", isCorrect: true },
        {
          id: "opt-ce-n-est-pas-ici",
          text: "Ce n'est pas ici.",
          isCorrect: false,
          learningErrorTag: "meaning_shift",
          trapReason:
            "That sends them away. You have just walked in, so it is the place.",
        },
        {
          id: "opt-je-suis-ici",
          text: "Je suis ici.",
          isCorrect: false,
          learningErrorTag: "wrong_item",
          trapReason:
            "True, but it is about you. They asked about the room, and the room takes c'est.",
        },
      ],
      answer: ["opt-c-est-ici"],
      reveal: {
        short: "C'est ici.",
        explanation:
          "Je suis ici puts you somewhere. C'est ici says what the place is. You have had both since the negation lesson; here the moment picks one.",
        natural: "C'est ici.",
      },
    },
  },


  {
    // Moved out of the opening (F-10): it now reflects on the arc AFTER the
    // learner has greeted and arrived in French, so the lesson never opens
    // with two explanation screens.
    id: "s00-insight-bonjour-to-au-revoir",
    type: "insight-card",
    targetItemIds: ["chunk-bonjour", "chunk-au-revoir"],
    payload: {
      // REPURPOSED. This slot said "a small moment opens with bonjour and
      // closes with au revoir, today you carry the whole arc" — the lesson's
      // own plan, which its goal card and recap already state. The card that
      // belongs here is the one thing about refusing that a learner cannot
      // guess and will get wrong on their first day, and it was sitting
      // collapsed on this lesson's own Showcase.
      insightType: "culture-bite",
      title: "Merci on its own can mean yes.",
      body:
        "Offered something at a counter, a nod and a merci is often taken as yes please. " +
        "If you mean no, the merci needs a non in front of it. Non merci turns the offer down without sounding cold, which non on its own can.",
      examples: [
        { fr: "Non merci.", en: "No thank you." },
        {
          fr: "Oui merci.",
          en: "Yes please.",
          note: "The merci does not change. The word in front of it decides.",
        },
      ],
    },
  },

  activityChain({
    id: "s23-chain-turning-something-down",
    intro:
      "You are inside now. There is an offer to get past first, and then the thing you actually came to say.",
    steps: [
      {
        id: "s04-fill-decline-offer",
        type: "fill-with-traps",
        targetItemIds: ["chunk-non-merci"],
        weakPointTags: ["politeness", "negation"],
        payload: {
          prompt: "Inside, someone offers you a coffee. You are fine without one. What do you say?",
          blankCount: 1,
          options: [
            { id: "opt-non-merci", text: "Non merci.", isCorrect: true },
            {
              id: "opt-merci",
              text: "Merci.",
              isCorrect: false,
              trapReason:
                "Merci alone can sound like yes please. Non merci makes the no clear.",
            },
            {
              id: "opt-question",
              text: "J'ai une question.",
              isCorrect: false,
              trapReason: "That does not answer the offer.",
            },
          ],
          answer: ["opt-non-merci"],
          reveal: {
            short: "Non merci.",
            explanation: "A soft, clear refusal: non to decline, merci to stay polite.",
            natural: "Non merci.",
          },
        },
      },
      {
        id: "s05-weave-j-ai-une-question",
        type: "weave",
        targetItemIds: ["chunk-j-ai", "chunk-j-ai-une-question", "chunk-une-question"],
        weakPointTags: ["j-ai-vs-je-suis"],
        payload: {
          // Medium: the prompt names the communicative job, so the tier says so.
          weaveType: "mid",
          // L5 already asked for "J'ai une question." on its own. Asking for it
          // again a lesson later would be the same act twice; the step above
          // has just handed the learner the refusal, so the job here is to put
          // both beats together, which is what a person actually says.
          prompt: "Turn the coffee down and say what you came for, in one go.",
          context: "The cup is still in the air: « Un café ? » The thing you came to ask is still unsaid.",
          // The purpose is established: the learner arrived with a question in
          // s03 and the scene says it is still unsaid. Declaring it is what
          // lets a guard prove the model answer asks for nothing the screen
          // withheld. Two moves are asked for, so reuse stays off.
          intent: "decline-politely",
          sceneFacts: ["purposeKnown", "offerMade", "formalRegister"],
          suggestedPieces: [
            { text: "non merci", itemId: "chunk-non-merci", required: true, label: "polite refusal" },
            { text: "j'ai", itemId: "chunk-j-ai", required: true, label: "I have" },
            { text: "une question", itemId: "chunk-une-question", required: true, label: "noun package" },
          ],
          expectedAnswers: ["Non merci. J'ai une question."],
          acceptedAlternatives: [
            "Non merci, j'ai une question.",
            "Non merci. J ai une question.",
            "Non merci, j ai une question.",
          ],
          reveal: {
            modelAnswer: "Non merci. J'ai une question.",
            ifCorrect: "Both beats in one breath: the offer answered, the reason given.",
            ifCorrectButFlat: "Right. The refusal clears the way, then j'ai carries the question.",
            ifUnderstandableButWrong:
              "Your meaning lands. Answer the offer first, then say what you came for: Non merci. J'ai une question.",
            ifMissingTargetPiece: "Start with non merci, then j'ai une question.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),

  activityChain({
    id: "s21-chain-the-whole-repair",
    intro:
      "The moment has gone well so far. This is where it breaks, and where you put it back together.",
    steps: [
        {
          // The beat every real first exchange has and no lesson so far has staged:
          // you asked, they answered, and you did not follow. L3 taught this formula
          // and nothing since has needed it. Here the scene needs it, which is the
          // difference between owning a sentence and being able to reach for it.
          id: "s05b-fill-did-not-catch-it",
          type: "fill-with-traps",
          targetItemIds: ["chunk-je-ne-comprends-pas", "chunk-non-merci", "chunk-ce-n-est-pas"],
          evidenceTargetItemIds: ["chunk-je-ne-comprends-pas"],
          weakPointTags: ["negation", "ne-pas"],
          payload: {
            prompt:
              "They answer your question, quickly and at length. You catch almost none of it. What do you say?",
            blankCount: 1,
            options: [
              { id: "opt-je-ne-comprends-pas", text: "Je ne comprends pas.", isCorrect: true },
              {
                id: "opt-non-merci",
                text: "Non merci.",
                isCorrect: false,
                learningErrorTag: "meaning_shift",
                trapReason:
                  "That turns something down. They were answering you, not offering you anything.",
              },
              {
                id: "opt-ce-n-est-pas-ici",
                text: "Ce n'est pas ici.",
                isCorrect: false,
                learningErrorTag: "wrong_item",
                trapReason:
                  "That is about a place. What you missed was what they said.",
              },
            ],
            answer: ["opt-je-ne-comprends-pas"],
            reveal: {
              short: "Je ne comprends pas.",
              explanation:
                "Saying it is not a failure in the moment; it is the sentence that keeps the moment going.",
              natural: "Je ne comprends pas.",
            },
          },
        },
        {
          // Recognising the sentence and reaching for it under your own power are
          // different things, so the beat is produced as well as chosen. Two chunks
          // the learner has owned since L1 and L3 meet for the first time here, and
          // je ne comprends pas stays ONE closed formula: it is offered whole and is
          // never decomposed into ne + verb + pas.
          id: "s05c-weave-excusez-moi-je-ne-comprends-pas",
          type: "weave",
          targetItemIds: ["chunk-excusez-moi", "chunk-je-ne-comprends-pas"],
          weakPointTags: ["politeness", "negation"],
          payload: {
            weaveType: "context",
            prompt: "Reach them again, then say you did not follow.",
            context:
              "They have already moved on to the next thing.",
            // Authored so the scene carries its facts structurally. Reuse stays
            // OFF: the prompt asks for two moves, and accepting either alone
            // would be the resolver overruling the task rather than widening it.
            intent: "signal-not-understood",
            sceneFacts: ["misunderstandingOccurred", "formalRegister"],
            suggestedPieces: [
              {
                text: "Excusez-moi",
                itemId: "chunk-excusez-moi",
                label: "reach them again",
              },
              {
                text: "je ne comprends pas",
                itemId: "chunk-je-ne-comprends-pas",
                label: "one whole sentence",
              },
            ],
            expectedAnswers: ["Excusez-moi, je ne comprends pas."],
            acceptedAlternatives: ["Excusez-moi, je ne comprends pas"],
            reveal: {
              modelAnswer: "Excusez-moi, je ne comprends pas.",
              ifCorrect:
                "You reached them first, then said it plainly. That is how the conversation stays open.",
              ifCorrectButFlat:
                "Right. Excusez-moi turns them back, and the rest is one sentence you already carry whole.",
              ifUnderstandableButWrong:
                "Your meaning lands. The opener goes first, then the whole formula: Excusez-moi, je ne comprends pas.",
              ifMissingTargetPiece:
                "Open with excusez-moi, then say je ne comprends pas without taking it apart.",
            },
            validationMode: "exact-or-alternative",
          },
        },
        {
          // Corpus closure, Pass B: L6 gains NO new lexis, exactly as Payload Economy
          // v0 §6 requires of it. What it gains is the REPAIR PAIR -- named in §1 as
          // one of the four functional holes in the whole spine. Both halves are now
          // owned (je ne comprends pas from L3, vous pouvez répéter ? activated in
          // L1), and no lesson had ever put them together, which meant the learner
          // could say a conversation had broken and could ask for a repeat, but never
          // did the one thing that actually fixes it: both, in order.
          id: "s11-weave-the-repair-pair",
          type: "weave",
          targetItemIds: ["chunk-je-ne-comprends-pas", "chunk-vous-pouvez-repeter"],
          weakPointTags: ["negation", "politeness"],
          payload: {
            weaveType: "open",
            prompt: "Say it went past you, then ask for it again.",
            // Same reasoning as s05c: two moves are genuinely asked for, so the
            // facts are declared and reuse is not switched on.
            intent: "ask-to-repeat",
            sceneFacts: ["misunderstandingOccurred", "formalRegister"],
            // CONTINUITY. This used to read "They answered your question and are
            // waiting, friendly, for you to say something back." — which
            // un-happens s05c, where they had already moved on and the learner
            // had to reach them again. The moment cannot run backwards between
            // two steps of the same repair. It now picks up where s05c left it.
            context:
              "They have turned back to you. Now you can say what happened, and ask.",
            suggestedPieces: [
              {
                text: "je ne comprends pas",
                itemId: "chunk-je-ne-comprends-pas",
                label: "naming the problem",
              },
              {
                text: "vous pouvez répéter",
                itemId: "chunk-vous-pouvez-repeter",
                label: "asking for it again",
              },
            ],
            hintCloze: "Je ne comprends pas. ___ ?",
            expectedAnswers: ["Je ne comprends pas. Vous pouvez répéter ?"],
            acceptedAlternatives: [
              "Je ne comprends pas. Vous pouvez répéter",
              "Je ne comprends pas, vous pouvez répéter ?",
            ],
            reveal: {
              modelAnswer: "Je ne comprends pas. Vous pouvez répéter ?",
              ifCorrect:
                "Naming the problem is honest. Asking for the repeat is what actually gets you the sentence.",
              ifCorrectButFlat:
                "Right. One line admits it, the next one fixes it.",
              ifUnderstandableButWrong:
                "Your meaning lands. Say it went past you first, then ask for it again.",
              ifMissingTargetPiece:
                "Je ne comprends pas names the problem. Vous pouvez répéter ? asks them to go again.",
            },
            validationMode: "exact-or-alternative",
          },
        },
    ],
  }),

  activityChain({
    id: "s24-chain-and-out-again",
    intro:
      "The moment has to end as deliberately as it began.",
    steps: [
      {
        id: "s06-meet-au-revoir",
        type: "meet-card",
        targetItemIds: ["chunk-au-revoir"],
        weakPointTags: ["politeness"],
        payload: {
          fr: "Au revoir.",
          en: "Goodbye.",
          title: "The close.",
          highlights: [{ text: "Au revoir", itemId: "chunk-au-revoir" }],
          tts: true,
        },
      },
      {
        id: "s07-sayit-step-in",
        type: "say-it-your-way",
        targetItemIds: [
          "chunk-bonjour",
          "chunk-je-suis-ici",
          "chunk-j-ai-une-question",
        ],
        weakPointTags: ["natural-speech"],
        payload: {
          // NOT A SECOND ARRIVAL. It used to say "You have just stepped in",
          // three beats after the learner had arrived, been offered a coffee
          // and repaired a misunderstanding — so the moment restarted, and the
          // screen read as a card in a chain rather than as part of one lived
          // thing. What it actually is, sitting here, is the arrival run once
          // more from memory before the whole moment is asked for; the copy now
          // says that instead of pretending time moved backwards.
          situation:
            "Run the arrival again, from memory this time: greet them, say you are here, and open your one small question.",
          communicativeGoal: "Greet, locate, and open your question.",
          intent: "state-purpose",
          sceneFacts: ["purposeKnown", "formalRegister"],
          suggestedPieces: [
            { text: "Bonjour", itemId: "chunk-bonjour" },
            { text: "je suis", itemId: "chunk-je-suis" },
            { text: "ici", itemId: "word-ici" },
            { text: "j'ai", itemId: "chunk-j-ai" },
            { text: "une question", itemId: "chunk-une-question" },
          ],
          answerBands: {
            minimalAcceptable: ["Bonjour. J'ai une question."],
            good: ["Bonjour. Je suis ici. J'ai une question."],
            // The natural tier must SAY something the good tier does not. Moving
            // a full stop to a comma is not that: it is one sentence under two
            // labels, and the learner reads a ladder where there is none. What
            // actually separates correct French from natural French here is
            // register, so the lift is the opener that turns an announcement
            // into a request. The rhythm point it used to make is real and now
            // lives where rhythm belongs, on the Showcase depth card.
            natural: ["Bonjour. Je suis ici. Excusez-moi, j'ai une question."],
          },
          modelAnswer: "Bonjour. Je suis ici. J'ai une question.",
          reveal: {
            modelAnswer: "Bonjour. Je suis ici. J'ai une question.",
            explanation:
              "Three pieces you already own, in the order a real moment uses them.",
          },
          validationMode: "model-answer-only",
        },
      },
    ],
  }),


  {
    id: "s08-weave-close-open",
    type: "weave",
    targetItemIds: ["chunk-merci", "chunk-au-revoir"],
    weakPointTags: ["politeness"],
    payload: {
      weaveType: "open",
      // THE REUSE SLICE. The job here is one move — close the interaction — and
      // the learner has owned merci since L1 and au revoir since this lesson.
      // The prompt used to enumerate both beats, which made "Au revoir." a
      // half-answer by instruction rather than by French; §20 says the first
      // help must not contradict every other valid path, and a prompt that
      // hard-codes the model does the same thing one step earlier. The model is
      // unchanged and the reveal still teaches the fuller close.
      prompt: "Close the moment in French.",
      context: "You are about to leave. They gave you what you came for.",
      intent: "close-interaction",
      // What this scene actually establishes, and nothing more. It is a first
      // meeting at someone's door: no one has said you will be back, and nobody
      // was serving you. So `likelySeeAgainSoon` and `serviceEncounter` are
      // absent, and À bientôt. / Bonne journée. do not fit here even for a
      // learner who has finished L7 and owns them both.
      sceneFacts: ["formalRegister"],
      reuse: true,
      suggestedPieces: [
        { text: "merci", itemId: "chunk-merci", label: "thanks" },
        { text: "au revoir", itemId: "chunk-au-revoir", label: "closing" },
      ],
      expectedAnswers: ["Merci, au revoir."],
      reveal: {
        modelAnswer: "Merci, au revoir.",
        ifCorrect: "That is how a moment closes: thanks, then goodbye.",
        ifCorrectButFlat: "Right. merci then au revoir, and you are out the door.",
        ifUnderstandableButWrong:
          "Your meaning lands. Thanks comes first, then the goodbye: Merci. Au revoir.",
        ifMissingTargetPiece: "Thank first with merci, then close with au revoir.",
      },
      validationMode: "exact-or-alternative",
    },
  },


  {
    id: "s09-sayit-whole-moment",
    type: "say-it-your-way",
    targetItemIds: [
      "chunk-bonjour",
      "chunk-je-suis-ici",
      "chunk-j-ai-une-question",
      "chunk-merci",
      "chunk-au-revoir",
    ],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "You arrive for a small first meeting. Greet, say you are here, say you " +
        "have one small thing to ask, thank them, and leave. Use the French " +
        "pieces you already have.",
      communicativeGoal: "Carry the whole moment, from the door to goodbye.",
      // The whole arc is not one communicative job, so there is no single
      // intent that would make derivation honest here. The scene facts are
      // still declared: they are what let a guard prove the purpose this
      // screen asks the learner to state was actually given to them.
      sceneFacts: ["purposeKnown", "formalRegister"],
      answerBands: {
        minimalAcceptable: ["Bonjour. J'ai une question. Merci. Au revoir."],
        good: ["Bonjour. Je suis ici. J'ai une question. Merci. Au revoir."],
        // Same repair as s07: the tier now differs in register rather than in
        // punctuation. The opener softens the ask and the thanks is sized to
        // what was actually given. Every piece is already owned.
        // "Merci beaucoup." was here and is L7 French. It sat in the NATURAL
        // tier of a lesson whose whole premise is that the learner already owns
        // everything, so the one sentence held up as the best version of their
        // own answer was the one sentence they could not have written. The lift
        // that separates this tier is register, and excusez-moi already carries
        // it: reached since L1, and doing the work beaucoup was only decorating.
        natural: [
          "Bonjour. Je suis ici. Excusez-moi, j'ai une question. Merci. Au revoir.",
        ],
      },
      modelAnswer: "Bonjour. Je suis ici. J'ai une question. Merci. Au revoir.",
      reveal: {
        modelAnswer: "Bonjour. Je suis ici. J'ai une question. Merci. Au revoir.",
        ifCorrect: "You carried the whole moment, from the door to goodbye.",
        ifBetterThanExpected:
          "You used more than the minimum. That is a real first exchange, start to finish.",
        naturalAlternatives: [
          "Bonjour. J'ai une question. Merci. Au revoir.",
          "Bonjour. Je suis ici. Excusez-moi, j'ai une question. Merci. Au revoir.",
        ],
        explanation:
          "Every piece here is one you already built. Put together, they make a small French moment.",
      },
      validationMode: "model-answer-only",
    },
  },


  {
    id: "s10-recap-a-small-moment",
    type: "recap",
    payload: {
      title: "You carried a whole moment.",
      lines: [
        "This was not a quiz. It was a small moment.",
        "You carried it in French, from bonjour to au revoir.",
        "It did not run perfectly straight, either. You told someone which room it was, and you said when you had not followed.",
        // au revoir is taught in this lesson, so "just the pieces you already
        // built" was one chunk short of true.
        "No new rule. One new piece, au revoir, and the rest you already had.",
      ],
      piecesUsed: [
        "Bonjour",
        "Excusez-moi",
        "je suis",
        "ici",
        "c'est",
        "j'ai",
        "une question",
        "je ne comprends pas",
        "Merci",
        "Au revoir",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson006: Lesson = {
  id: "v1-lesson-006",
  version: "v1",
  number: 6,
  title: "Un petit moment",
  phase: "summit-gate",
  monolingualMode: "english-guided",
  primaryArchetype: "review-integration",
  journeyRole: "integration",
  acquisitionDemandItemIds: ["chunk-au-revoir"],
  estimatedMinutes: 8,
  canDo: "Carry a whole small moment, from greeting to goodbye.",
  whyItExists:
    "L1-L5 each gave a few pieces. L6 adds no new grammar and only one new chunk, au revoir. Its job is to let the learner carry a whole small human moment in French by recombining what they already own, from bonjour at the door to au revoir at the close. This is the Round 1 payoff: a moment, not a quiz.",
  prerequisites: ["v1-lesson-005"],
  learningItems: getItems([
    "chunk-au-revoir",
    "chunk-bonjour",
    "chunk-je-suis-ici",
    "chunk-je-suis",
    "chunk-je-ne-suis-pas",
    "chunk-non-merci",
    "chunk-j-ai",
    "chunk-j-ai-une-question",
    "chunk-une-question",
    "chunk-merci",
    // Recycled for the founder-usable pass, none of it re-taught and none of it
    // a demand. L6 owned a large amount of L1-L5 material it never reached for:
    // c'est / ce n'est pas and je ne comprends pas have been the learner's since
    // L3, and excusez-moi since L1. They are what let the scene misfire and
    // recover instead of running straight through. acquisitionDemandItemIds
    // stays exactly ["chunk-au-revoir"], which is the ratified Integration
    // exception and the only new item L6 may carry.
    "chunk-c-est",
    "chunk-ce-n-est-pas",
    "chunk-je-ne-comprends-pas",
    "chunk-excusez-moi",
    // Corpus closure: the other half of the repair pair, recycled from L1 so
    // s11 can join them. L6 gains no new lexis by doing this -- both halves
    // were already owned, just never used together.
    "chunk-vous-pouvez-repeter",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Integration payoff lesson (L6). L6 maps to the slice-spec PR J. Adds no new grammar and exactly one new item, chunk-au-revoir. Density comes from recombining owned L1-L5 material, not new acquisition.",
    "Guided roleplay without AI: the scene is fixed and deterministic. Meaning-based micro-choices (s02 location, s04 social offer), suggested-piece productions (s03, s05), a scaffold-fade open weave (s08), and two model-answer-only Say It Your Way screens drive retrieval. No free AI roleplay and no simulated interlocutor producing unseen French.",
    "Ezber guardrail: no screen asks the learner to repeat a pre-shown script. Each production is prompted by the situation; the learner assembles owned pieces.",
    "Non-café scene: a small first meeting at a door. un café appears only as someone else's offer in the English prompt text (s04), declined with Non merci; no café is produced in French and no counter transaction occurs.",
    "Micro-choice (meaning): s02 right-place Je suis ici vs wrong-place Je ne suis pas ici. Social-response: s04 decline a coffee offer with Non merci.",
    "Scaffold fade: s08 is the slice's only open weave, with hint pieces that are not required, before the final situation-prompted production at s09.",
    "answerBands and ifBetterThanExpected are used on the Say It Your Way and reveal screens because LessonRendererV1 (SayItYourWayV1, NaturalReveal) renders them. modelAnswer and expectedAnswers remain authoritative for the deterministic path.",
    "Final say-it accepted alternatives match the screen context only: the learner arrives and is present, so Je suis ici fits; the Je ne suis pas ici variant is intentionally excluded from the final close.",
    "Founder-usable pass (L1-L6): L6 was already the densest lesson but only reached for about half the material the learner owns by this point, so the moment ran straight through with nothing to recover from. Three screens use the untouched half. s03b turns the arrival outward with c'est vs je suis ici, a real confusion no earlier lesson had put side by side. s05b and s05c stage the beat every first exchange has, where the answer goes past you and you say so. Recycling only: no new item, and the demand list stays the single ratified Integration exception.",
    "je ne comprends pas is offered as ONE whole piece in s05c and is never decomposed into ne + verb + pas, matching how L3 owns it. Nothing here teaches comprendre as a verb.",
    "Deferred: aide, mais, the fuller L6 syllabus spec, and all later-lesson material. No new grammar engine, no architecture verb, no new screen type.",
    "Tone: calm premium mentor, quietly motivating. No XP / streak / level / score / reward / perfect / amazing copy.",
  ],
  qaChecks: [
    "TTS reads Bonjour, Je suis ici, J'ai une question, Merci, and Au revoir cleanly.",
    "s02 fires the wrong-place and feeling traps; s04 fires the bare-merci and wrong-response traps.",
    "Open weave s08 accepts Merci, au revoir variants including no-comma forms.",
    "Final say-it shows answerBands minimal/good/natural and the ifBetterThanExpected branch; modelAnswer remains the deterministic path.",
    "No repeated negation tokens in any French string.",
    "s03b fires the opposite-place and about-you traps; s05b fires the refusal and wrong-place traps.",
    "s05c accepts the answer with or without the trailing period, and its two hint pieces stay optional.",
    "TTS reads C'est ici, Je ne comprends pas, and Excusez-moi, je ne comprends pas cleanly.",
    "No theatrical positivity tokens appear; the payoff reads calm, not gamified.",
  ],
};
