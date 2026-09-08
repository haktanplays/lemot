import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";
import { activityChain } from "../activityChain";

const screens: LessonScreen[] = [


  {
    // L2's world is the self: where you are, how you are, whether you are ready.
    // The lesson only makes je suis ici its own; the rest is here so "I am ..."
    // reads as a shape with many fillings rather than one memorised line.
    id: "s20-showcase-self",
    type: "showcase",
    payload: {
      intro:
        "Today is about saying something about yourself. One small shape does most of it, and you will hear it everywhere once you know it.",
      clusters: [
        {
          label: "Where you are",
          sentences: [
            { fr: "Je suis ici.", en: "I'm here.", role: "core", itemIds: ["chunk-je-suis-ici"] },
            { fr: "Bonjour, je suis ici.", en: "Hello, I'm here.", role: "core" },
            { fr: "Excusez-moi, je suis ici.", en: "Excuse me, I'm here.", role: "core" },
            { fr: "Je suis là.", en: "I'm here. (right here)", role: "exposure" },
          ],
        },
        {
          label: "How you are",
          sentences: [
            { fr: "Ça va.", en: "I'm fine.", role: "supported" },
            { fr: "Ça va bien, merci.", en: "I'm well, thank you.", role: "supported" },
            { fr: "Je suis fatigué.", en: "I'm tired.", role: "exposure" },
            { fr: "Je suis content.", en: "I'm glad.", role: "exposure" },
            { fr: "Je suis désolé.", en: "I'm sorry.", role: "exposure" },
          ],
        },
        {
          label: "Ready, or not yet",
          sentences: [
            { fr: "Je suis prêt.", en: "I'm ready.", role: "supported" },
            { fr: "Je ne suis pas prêt.", en: "I'm not ready.", role: "exposure" },
            { fr: "Je suis en retard.", en: "I'm late.", role: "exposure" },
            { fr: "Une minute, s'il vous plaît.", en: "One minute, please.", role: "exposure" },
          ],
        },
        {
          label: "What people say to you",
          sentences: [
            { fr: "Comment ça va ?", en: "How are you doing?", role: "exposure" },
            { fr: "Vous êtes prêt ?", en: "Are you ready?", role: "exposure" },
            { fr: "Vous êtes là ?", en: "Are you there?", role: "exposure" },
          ],
        },
      ],
    },
  },


  {
    id: "s00-goal-etre",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Your first engine",
      body:
        "Today: your first French sentence engine, je suis.\n" +
        "By the end: you can say where you are.\n" +
        "Main pieces: je suis, ici.",
    },
  },


  {
    id: "s00-meet-je-suis-ici",
    type: "meet-card",
    targetItemIds: ["chunk-je-suis-ici", "chunk-je-suis"],
    payload: {
      fr: "Je suis ici.",
      en: "I am here.",
      title: "Two words. Where you are.",
      highlights: [
        { text: "je suis", itemId: "chunk-je-suis" },
        { text: "ici", itemId: "word-ici" },
      ],
      tts: true,
    },
  },


  {
    id: "s01-insight-je-suis-engine",
    type: "insight-card",
    targetItemIds: ["chunk-je-suis"],
    payload: {
      insightType: "grammar-nugget",
      title: "Your first French sentence engine.",
      body: "Je suis = I am. This shape is small. You will use it again and again.",
      examples: [{ fr: "Je suis ici.", en: "I am here." }],
    },
  },

  activityChain({
    id: "s22-chain-saying-where-you-are",
    intro:
      "You have arrived somewhere you were expected. Before anything else they need to know it is you, and that you are here.",
    steps: [
      {
        id: "s02-meet-bonjour-je-suis-ici",
        type: "meet-card",
        targetItemIds: ["chunk-bonjour", "chunk-je-suis-ici"],
        payload: {
          fr: "Bonjour, je suis ici.",
          en: "Hello, I am here.",
          title: "Greet, then locate.",
          highlights: [
            { text: "Bonjour", itemId: "chunk-bonjour" },
            { text: "je suis", itemId: "chunk-je-suis" },
            { text: "ici", itemId: "word-ici" },
          ],
          tts: true,
        },
      },
      {
        id: "s03-fill-je-suis-blank",
        type: "fill-with-traps",
        targetItemIds: ["chunk-je-suis"],
        payload: {
          prompt: "You want to tell them you have arrived. Which word fits?",
          sentenceBefore: "Je ",
          sentenceAfter: " ici.",
          blankCount: 1,
          options: [
            { id: "opt-suis", text: "suis", isCorrect: true },
            {
              id: "opt-voudrais",
              text: "voudrais",
              isCorrect: false,
              trapReason:
                "You met je voudrais in the last lesson. It asks for something. It does not say where you are.",
            },
            {
              id: "opt-bonjour",
              text: "bonjour",
              isCorrect: false,
              trapReason:
                "Bonjour is a greeting. It cannot sit between Je and ici.",
            },
          ],
          answer: ["opt-suis"],
          reveal: {
            short: "suis",
            explanation:
              "Je suis = I am. That is the shape that names your location.",
            natural: "Je suis ici.",
          },
        },
      },
      {
        id: "s04-weave-je-suis-ici",
        type: "weave",
        targetItemIds: ["chunk-je-suis-ici", "chunk-je-suis"],
        payload: {
          weaveType: "supported",
          prompt: "Write it in French: I am here.",
          context: "Someone called your name. Let them know you've arrived.",
          suggestedPieces: [
            { text: "je suis", itemId: "chunk-je-suis", required: true, label: "I am" },
            { text: "ici", itemId: "word-ici", required: true, label: "place word" },
          ],
          expectedAnswers: ["Je suis ici."],
          reveal: {
            modelAnswer: "Je suis ici.",
            ifCorrect: "Two words. One French engine, running.",
            ifCorrectButFlat:
              "Right. The period gives the sentence a small landing.",
            ifUnderstandableButWrong:
              "Your meaning lands. Two words carry it: je suis ici.",
            ifMissingTargetPiece:
              "Start with je suis. That is the shape that does the work.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),


  {
    // s03 proved the learner can complete the shape one word at a time. This is
    // the first screen in L2 that asks them to choose a WHOLE sentence, and it
    // asks against the engine they already own: both wrong options are lines
    // they produced themselves in L1. Nothing new appears; the difficulty is
    // entirely retrieval and meaning.
    id: "s04b-fill-which-engine",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-suis-ici", "chunk-je-suis", "chunk-je-voudrais"],
    evidenceTargetItemIds: ["chunk-je-suis-ici"],
    weakPointTags: ["natural-speech"],
    payload: {
      prompt:
        "Someone is looking for you and calls your name across the room. They still cannot see you. What do you say?",
      blankCount: 1,
      options: [
        { id: "opt-je-suis-ici", text: "Je suis ici.", isCorrect: true },
        {
          id: "opt-je-voudrais-un-cafe",
          text: "Je voudrais un café.",
          isCorrect: false,
          learningErrorTag: "meaning_shift",
          trapReason:
            "Real French, and you can say it. But it asks for something, and nobody here is taking an order.",
        },
        {
          id: "opt-bonjour",
          text: "Bonjour.",
          isCorrect: false,
          learningErrorTag: "missing_word",
          trapReason:
            "A greeting is polite, but on its own it still does not tell them where you are.",
        },
      ],
      answer: ["opt-je-suis-ici"],
      reveal: {
        short: "Je suis ici.",
        explanation:
          "Je voudrais asks for something. Bonjour greets. Only je suis puts you somewhere.",
        natural: "Je suis ici.",
      },
    },
  },


  {
    // Placed BETWEEN the two equivalent productions (F-12): it gives the
    // second one an explained purpose instead of leaving them consecutive.
    id: "s06-insight-shape-noticed",
    type: "insight-card",
    targetItemIds: ["chunk-je-suis"],
    payload: {
      insightType: "grammar-nugget",
      title: "Notice the shape.",
      body: "You just wrote Je suis ici. The moment is about to change; the shape will not. That is what an engine does, and the same shape can say how you are, not just where.",
      examples: [
        { fr: "Je suis ici.", en: "I am here." },
        { fr: "Je suis prêt.", en: "I am ready." },
      ],
    },
  },

  activityChain({
    id: "s23-chain-the-same-engine-twice",
    intro:
      "The engine does not change when the room does. What changes is the words you hang off it.",
    steps: [
      {
        id: "s05-weave-call-and-respond",
        type: "weave",
        targetItemIds: ["chunk-je-suis-ici", "chunk-je-suis", "chunk-excusez-moi"],
        payload: {
          weaveType: "supported",
          prompt: "Write it in French: Excuse me, I am here.",
          // Previously this screen asked for the SAME string as s04, which made the
          // engine claim ("the shape stays, the moment changes") impossible to feel:
          // nothing changed. Now the moment genuinely differs — nobody is looking
          // for you, so you have to interrupt — and the L1 opener is the piece that
          // carries that difference while je suis stays untouched.
          context:
            "Nobody has called for you. The room is busy and you need to announce yourself.",
          suggestedPieces: [
            {
              text: "Excusez-moi",
              itemId: "chunk-excusez-moi",
              required: true,
              label: "reach them first",
            },
            { text: "je suis", itemId: "chunk-je-suis", required: true, label: "I am" },
            { text: "ici", itemId: "word-ici", required: true, label: "place word" },
          ],
          expectedAnswers: ["Excusez-moi, je suis ici."],
          acceptedAlternatives: ["Excusez-moi je suis ici."],
          reveal: {
            modelAnswer: "Excusez-moi, je suis ici.",
            ifCorrect: "The opener changed. The engine did not. That is the point.",
            ifCorrectButFlat:
              "Right. Excusez-moi does the interrupting; je suis ici does the telling.",
            ifUnderstandableButWrong:
              "Your meaning lands. The engine stays whole and the opener sits in front of it: Excusez-moi, je suis ici.",
            ifMissingTargetPiece:
              "Nobody called you here, so open with excusez-moi, then the same two words as before.",
          },
          validationMode: "exact-or-alternative",
        },
      },
      {
        // s09's natural-reveal CLAIMS the openers are not interchangeable, and until
        // now nothing in L2 asked the learner to act on that. This does. It is a
        // register choice, not a vocabulary choice: every option is correct French
        // the learner owns, and only the room decides which one belongs.
        id: "s05b-fill-which-opener",
        type: "fill-with-traps",
        targetItemIds: ["chunk-excusez-moi", "chunk-bonjour", "chunk-je-suis-ici"],
        evidenceTargetItemIds: ["chunk-excusez-moi"],
        weakPointTags: ["politeness"],
        payload: {
          prompt:
            "Same two words, a different room: it is busy, and nobody has looked up. How do you open?",
          sentenceAfter: ", je suis ici.",
          blankCount: 1,
          options: [
            { id: "opt-excusez-moi", text: "Excusez-moi", isCorrect: true },
            {
              id: "opt-bonjour",
              text: "Bonjour",
              isCorrect: false,
              learningErrorTag: "wrong_register",
              trapReason:
                "Correct French, and polite. But a greeting waits to be noticed, and nobody has noticed you yet.",
            },
            {
              id: "opt-merci",
              text: "Merci",
              isCorrect: false,
              learningErrorTag: "meaning_shift",
              trapReason:
                "Merci closes something. Nothing has happened yet for you to thank them for.",
            },
          ],
          answer: ["opt-excusez-moi"],
          reveal: {
            short: "Excusez-moi",
            explanation:
              "Both openers are good French. The room chooses between them: bonjour greets people who can see you, excusez-moi reaches people who cannot.",
            natural: "Excusez-moi, je suis ici.",
          },
        },
      },
      {
        // L2's first two-sentence production, and the first time the engine has to
        // share a moment with the order the learner already carried through L1.
        // Every piece here was produced in an earlier lesson; only the combination
        // is new, which is the whole point of calling je suis an engine.
        id: "s06b-weave-arrive-and-order",
        type: "weave",
        targetItemIds: [
          "chunk-je-suis-ici",
          "chunk-je-suis",
          "chunk-bonjour",
          "chunk-je-voudrais",
        ],
        evidenceTargetItemIds: ["chunk-je-suis-ici", "chunk-je-suis"],
        weakPointTags: ["natural-speech"],
        payload: {
          weaveType: "context",
          prompt: "Greet them, say you have arrived, then order a coffee politely.",
          context:
            "You said you would meet them at the counter, and you have just walked up. They look up: « Bonjour ? »",
          suggestedPieces: [
            { text: "Bonjour", itemId: "chunk-bonjour", label: "greeting" },
            { text: "je suis", itemId: "chunk-je-suis", label: "I am" },
            { text: "ici", itemId: "word-ici", label: "place word" },
            { text: "je voudrais", itemId: "chunk-je-voudrais", label: "polite request" },
            { text: "un café", itemId: "noun-cafe", label: "what you want" },
            { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait", label: "please" },
          ],
          hintCloze: "Bonjour, je suis ___. Je voudrais un café, s'il vous plaît.",
          expectedAnswers: ["Bonjour, je suis ici. Je voudrais un café, s'il vous plaît."],
          acceptedAlternatives: [
            "Bonjour, je suis ici. Un café, s'il vous plaît.",
            "Bonjour, je suis ici. Je voudrais un café.",
          ],
          reveal: {
            modelAnswer: "Bonjour, je suis ici. Je voudrais un café, s'il vous plaît.",
            ifCorrect:
              "Two French sentences, back to back. You built the second one a lesson ago and it still fits.",
            ifCorrectButFlat:
              "Right. The arrival lands first, then the order. Two short sentences, not one long one.",
            ifUnderstandableButWrong:
              "Your meaning lands. Say where you are, stop, then ask: Bonjour, je suis ici. Je voudrais un café, s'il vous plaît.",
            ifMissingTargetPiece:
              "Arrive before you order. Je suis ici comes first, then the request you already know.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),

  activityChain({
    id: "s21-chain-answer-then-arrive",
    intro:
      "You are somewhere you are expected, and you will need to say two different things about being there.",
    steps: [
        {
          // Corpus closure. L2 owns one engine and one cargo word, so it can only
          // widen by RECOMBINATION -- which makes it the lesson most at risk of being
          // one memorised line. This fill puts the engine beside the two other whole
          // lines the learner now owns and asks which one the moment wants. It is the
          // first screen in L2 whose options are complete utterances.
          id: "s10b-fill-which-line",
          type: "fill-with-traps",
          targetItemIds: ["chunk-je-suis-ici"],
          weakPointTags: ["natural-speech"],
          payload: {
            prompt:
              "You arrive somewhere you are expected. The room is calm, nobody has said anything yet, and they look up as you come in.",
            blankCount: 1,
            options: [
              {
                id: "opt-bonjour-ici",
                text: "Bonjour, je suis ici.",
                isCorrect: true,
              },
              {
                id: "opt-the",
                text: "Je voudrais un thé, s'il vous plaît.",
                isCorrect: false,
                trapReason:
                  "That orders a drink. You have just walked in, and nobody has asked you what you want.",
              },
              {
                id: "opt-repeter",
                text: "Vous pouvez répéter ?",
                isCorrect: false,
                trapReason:
                  "That asks them to say something again. Nothing has been said for you to miss.",
              },
            ],
            answer: ["opt-bonjour-ici"],
            reveal: {
              short: "Bonjour, je suis ici.",
              explanation:
                "Arriving takes the greeting in front of it. Being called across a room does not, which is why the same two words come out differently each time.",
              natural: "Bonjour, je suis ici.",
            },
          },
        },
        {
          // The first production in L1-L6 whose SCENE is in French. The learner reads
          // what was said, not a translation of what to say, and the English helper
          // states only the situation. Every French word in the context is already
          // owned, and none of it leaks the answer.
          id: "s10c-weave-answer-the-call",
          type: "weave",
          targetItemIds: ["chunk-je-suis-ici"],
          weakPointTags: ["natural-speech"],
          payload: {
            weaveType: "context",
            prompt: "Answer so they know where you are.",
            context: "From the next room, someone calls: « Bonjour ? » They cannot see you.",
            suggestedPieces: [
              { text: "je suis", itemId: "chunk-je-suis", label: "I am" },
              { text: "ici", itemId: "word-ici", label: "here" },
            ],
            hintCloze: "Je suis ___.",
            expectedAnswers: ["Je suis ici."],
            acceptedAlternatives: ["Bonjour, je suis ici."],
            reveal: {
              modelAnswer: "Je suis ici.",
              ifCorrect: "Two words, and the room knows where you are.",
              ifCorrectButFlat: "Right. Nothing else is needed to answer that.",
              ifUnderstandableButWrong:
                "Your meaning lands. The answer to « Bonjour ? » from an unseen room is where you are.",
              ifMissingTargetPiece: "Je suis puts you somewhere. Ici says where.",
            },
            validationMode: "exact-or-alternative",
          },
        },
        {
          // The same two-sentence shape the lesson already built, with a different
          // drink at the end. It exists so the recombination reads as a pattern the
          // learner can refill rather than one sentence they memorised: the engine
          // holds, the order changes.
          id: "s10d-weave-arrive-and-order-tea",
          type: "weave",
          targetItemIds: ["chunk-je-suis-ici", "chunk-un-the"],
          weakPointTags: ["politeness"],
          payload: {
            weaveType: "open",
            prompt: "Say you have arrived, then order the other drink politely.",
            context:
              "Same doorway, a different afternoon. You do not feel like coffee today.",
            suggestedPieces: [
              { text: "Bonjour", itemId: "chunk-bonjour", label: "greeting" },
              { text: "je suis", itemId: "chunk-je-suis", label: "I am" },
              { text: "ici", itemId: "word-ici", label: "here" },
              { text: "je voudrais", itemId: "chunk-je-voudrais", label: "polite request" },
              { text: "un thé", itemId: "chunk-un-the", label: "the other drink" },
              { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait", label: "softener" },
            ],
            hintCloze: "Bonjour, je suis ___. Je voudrais ___, s'il vous plaît.",
            expectedAnswers: ["Bonjour, je suis ici. Je voudrais un thé, s'il vous plaît."],
            acceptedAlternatives: [
              "Bonjour, je suis ici. Je voudrais un thé.",
              "Bonjour. Je suis ici. Je voudrais un thé, s'il vous plaît.",
            ],
            reveal: {
              modelAnswer: "Bonjour, je suis ici. Je voudrais un thé, s'il vous plaît.",
              ifCorrect:
                "Same two moves, different drink. That is a shape you can refill, not a line you memorised.",
              ifCorrectButFlat: "Right. Arrive first, then ask.",
              ifUnderstandableButWrong:
                "Your meaning lands. Say where you are, stop, then order.",
              ifMissingTargetPiece:
                "Je suis ici puts you in the room. Je voudrais un thé asks for the drink.",
            },
            validationMode: "exact-or-alternative",
          },
        },
    ],
  }),


  {
    id: "s07-sayit-arrive-locate",
    type: "say-it-your-way",
    targetItemIds: ["chunk-je-suis", "chunk-je-suis-ici"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "You step into a small room. People look up. Let them know you've arrived.",
      communicativeGoal: "Signal you are here.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour" },
        { text: "Excusez-moi", itemId: "chunk-excusez-moi" },
        { text: "je suis", itemId: "chunk-je-suis" },
        { text: "ici", itemId: "word-ici" },
      ],
      modelAnswer: "Bonjour, je suis ici.",
      reveal: {
        modelAnswer: "Bonjour, je suis ici.",
        naturalAlternatives: ["Je suis ici.", "Excusez-moi, je suis ici."],
        explanation:
          "All three are natural, and the engine is identical in each. Bonjour greets the room. Excusez-moi cuts through it. Je suis ici alone is enough when the moment is already clear.",
      },
      validationMode: "model-answer-only",
    },
  },


  {
    // New screen family for L2, and the screen that finally makes the "engine"
    // claim visible instead of asserted: one unchanged shape under three
    // different openers the learner already owns. No new word appears here.
    id: "s09-natural-reveal-same-engine",
    type: "natural-reveal",
    targetItemIds: ["chunk-je-suis", "chunk-bonjour", "chunk-excusez-moi"],
    payload: {
      explanation:
        "Look at what stayed still.\n" +
        "Three different moments: walking in, being called, interrupting a busy room. Je suis ici did not change once. Only the front of the sentence moved. That is what it means for a shape to be an engine: you keep it, and you change what you attach to it.",
      naturalAlternatives: [
        "Je suis ici.",
        "Bonjour, je suis ici.",
        "Excusez-moi, je suis ici.",
      ],
    },
  },


  {
    id: "s08-recap-first-engine",
    type: "recap",
    payload: {
      title: "You put yourself in the room.",
      lines: [
        "You said where you are.",
        "You greeted a room, and you interrupted a busy one, with the same two words underneath.",
        "You also chose it over the two sentences you already knew, and put it in front of an order.",
        "Je suis stayed the same every time. That is the shape you'll use again.",
      ],
      piecesUsed: [
        "je suis",
        "ici",
        "Bonjour",
        "Excusez-moi",
        "je voudrais",
        "un café",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson002: Lesson = {
  id: "v1-lesson-002",
  version: "v1",
  number: 2,
  title: "Être",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "architecture-verb",
  journeyRole: "standard",
  acquisitionDemandItemIds: ["chunk-je-suis"],
  estimatedMinutes: 5,
  canDo: "Say where you are, in French.",
  whyItExists:
    "L1 gave the survival kit of polite chunks. L2 gives one reusable architecture shape: je suis. The shape stays the same across every future lesson. L2's only job is to make that shape feel solid in one calm location. This is the Être seed; c'est and the wider identity work arrive in a later pass.",
  prerequisites: ["v1-lesson-001"],
  learningItems: getItems([
    "chunk-je-suis",
    "chunk-je-suis-ici",
    "word-ici",
    "chunk-bonjour",
    // Recycled from L1, never re-taught here: it is the piece that lets the
    // same engine sit in a second kind of moment.
    "chunk-excusez-moi",
    // Corpus closure: L1's tea package, recycled so the two-sentence
    // recombination has a second thing to order. It is the reason s10d reads as
    // a refillable shape rather than the café line memorised twice. Supported,
    // supplied in the tray, never re-taught, and not a demand.
    "chunk-un-the",
    // Recycled from L0/L1 for the finishing pass. je voudrais is the engine the
    // learner must now choose AGAINST (s04b) rather than only meet as a trap
    // word, and it plus the café order is the second sentence of s06b. Neither
    // is re-taught and neither is a demand: acquisitionDemandItemIds stays
    // exactly ["chunk-je-suis"].
    "chunk-je-voudrais",
    "noun-cafe",
    "chunk-sil-vous-plait",
    "chunk-merci",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Je suis is the L2 architecture target. No broader conjugation table appears.",
    "Only one completion, ici, is used in L2. Wider use of the shape is deferred to later lessons; L2 varies the OPENER instead of the completion, which adds no new grammar.",
    "Finishing pass (L1-L6 founder-usable phase): L2 was the thinnest early lesson at four sentences and three productions, and every screen worked the engine in isolation. The three screens added are recombination, not new scope. s04b makes the learner choose the whole sentence against je voudrais and bonjour, so je suis is retrieved by meaning rather than completed by position. s05b makes the opener a decision the room forces, which is what s09 had only asserted. s06b is L2's first two-sentence production and its first recombination with the L1 order. No new item, no second completion, and the demand list is untouched at one.",
    "The finishing pass deliberately adds no fourth insight card: L2 is at the canon §11 V5 budget of three, so the added screens are two fills and a weave.",
    "s04 and s05 used to ask for the identical string, which is why the engine claim never landed and why validate:content flagged a duplicate production demand. s05 now recycles L1's excusez-moi so the moment differs while je suis ici stays untouched.",
    "s09 is a natural-reveal, not a fourth insight card: L2 is already at the three-insight canon budget, and this screen reflects rather than teaches.",
    "The parallel avoir shape is intentionally absent from L2.",
    "Survival-kit callback uses chunk-bonjour. chunk-je-voudrais appears only as a fill trap, not a production target.",
    "The shape-noticed insight is a deliberate meta-reflection: it names what the learner just did without adding a new concept.",
    "No XP / streak / level-up / mission / Mini Mission / generic AI Chat copy.",
    "SayIt is deterministic and model-answer-only, consistent with L0 and L1.",
    "Migrated from the original v1-lesson-001 Je suis content as the L2 Être seed (PR D). c'est expansion is deferred to a later content PR.",
  ],
  qaChecks: [
    "TTS reads Je suis ici and Bonjour, je suis ici cleanly.",
    "Casing variants pass Weave via accepted alternatives.",
    "s03 trap reasons fire on voudrais and bonjour selections.",
    "No theatrical positivity tokens appear.",
    "No mention of streak, XP, level, or mission.",
    "Recap uses passive mirror tone.",
    "The shape-noticed insight references prior weaves, not future content.",
    "s04 and s05 no longer share an expected answer; validate:content reports no duplicate production demand for v1-lesson-002.",
    "TTS reads Excusez-moi, je suis ici cleanly.",
    "s09 renders three alternatives and grades nothing.",
    "s04b offers three full sentences and fires the meaning traps on Je voudrais un café and Bonjour.",
    "s05b renders the trailing frame , je suis ici and fires the register trap on Bonjour.",
    "s06b accepts the two-sentence answer with or without the internal comma and period, and its hint ladder stays optional (no piece is required).",
  ],
};
