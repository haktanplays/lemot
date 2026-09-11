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
            { fr: "Je suis ici.", en: "I'm here.", role: "core", itemIds: ["chunk-je-suis-ici"], depth: { sound: "zhuh swee ee-SEE", structure: "je suis is the engine, ici is what you hang off it. The engine does not change when the room does.", compare: "French puts states on je suis but hunger and thirst on j'ai. That split is the single most useful thing to notice early." } },
            { fr: "Bonjour, je suis ici.", en: "Hello, I'm here.", role: "core", itemIds: ["chunk-bonjour", "chunk-je-suis-ici"] },
            { fr: "Excusez-moi, je suis ici.", en: "Excuse me, I'm here.", role: "core", itemIds: ["chunk-excusez-moi", "chunk-je-suis-ici"] },
            { fr: "Je suis là.", en: "I'm here. (right here)", role: "exposure", pieces: ["Je suis", "là"] },
          ],
        },
        {
          label: "How you are",
          sentences: [
            // The breakdown stays absent and that is correct: ça va IS one unit, and
            // splitting it would invent a seam French does not have. But the line
            // below shows Ça va inside a longer sentence with its own chip, so the
            // learner met the same two words twice and saw them look like a piece
            // once and like nothing the other time. The structure note is what
            // closes that gap honestly — it names ça va as the reusable whole
            // rather than faking a split inside it.
            { fr: "Ça va.", en: "I'm fine.", role: "supported", itemIds: ["chunk-ca-va"], depth: { sound: "sa-VA", structure: "Ça va is one piece, not two words you assemble. It travels whole, which is why it can be the entire answer here and still slot into a longer sentence underneath.", usage: "Question and answer with the same two words. Tone does all the work.", notice: "Probably the most-used exchange in spoken French." }, flat: "formula" },
            // Was "Ça va bien, merci." — a line L2 called its own and that no
            // screen in the corpus ever worked, in any lesson. L17 teaches the
            // positive answer and the string it actually uses is this one, so
            // the seed now points at the sentence the learner will really
            // produce instead of at a near-miss of it. The trailing merci was
            // the only thing lost, and merci is the most-worked chunk in L1.
            { fr: "Ça va bien.", en: "I'm well.", role: "supported", itemIds: ["chunk-ca-va"], pieces: ["Ça va", "bien"] },
            { fr: "Je suis fatigué.", en: "I'm tired.", role: "exposure", itemIds: ["chunk-je-suis", "adj-fatigue"] },
            { fr: "Je suis content.", en: "I'm glad.", role: "exposure", itemIds: ["chunk-je-suis", "adj-content"] },
            { fr: "Je suis désolé.", en: "I'm sorry.", role: "exposure" },
          ],
        },
        {
          label: "Ready, or not yet",
          sentences: [
            { fr: "Je suis prêt.", en: "I'm ready.", role: "supported", itemIds: ["chunk-je-suis-pret"], pieces: ["Je suis", "prêt"] },
            { fr: "Je ne suis pas prêt.", en: "I'm not ready.", role: "exposure", pieces: ["Je ne suis pas", "prêt"] },
            { fr: "Je suis en retard.", en: "I'm late.", role: "exposure", pieces: ["Je suis", "en retard"] },
            { fr: "Une minute, s'il vous plaît.", en: "One minute, please.", role: "exposure", itemIds: ["chunk-une-minute", "chunk-sil-vous-plait"] },
          ],
        },
        {
          label: "What people say to you",
          sentences: [
            { fr: "Comment ça va ?", en: "How are you doing?", role: "exposure", itemIds: ["adverb-comment", "chunk-ca-va"] },
            { fr: "Vous êtes prêt ?", en: "Are you ready?", role: "exposure", itemIds: ["chunk-vous-etes-pret", "chunk-vous-etes", "pronoun-vous"], depth: { sound: "voo-z-ET preh", notice: "The silent s in vous wakes up before a vowel and links the words: vou-z-êtes, not vou / êtes." }, pieces: ["Vous êtes", "prêt"] },
            { fr: "Vous êtes là ?", en: "Are you there?", role: "exposure", itemIds: ["chunk-vous-etes"], pieces: ["Vous êtes", "là"] },
          ],
        },
      ],
    },
  },


  {
    // "Your first engine" was not true and the learner knows it: je voudrais
    // was a reusable shape they carried through two lessons and refilled with a
    // different drink and a word nobody taught them. Claiming a first here
    // makes the product look like it has forgotten what the learner did, which
    // costs more than the small lift the word "first" was buying.
    id: "s00-goal-etre",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "A second shape you can reuse",
      body:
        "Je voudrais asks for things. Today: je suis, which says how things are.\n" +
        "By the end: you can say where you are, and recognise the same shape saying several other things about you.\n" +
        "Main piece: je suis.",
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


  activityChain({
    id: "s22-chain-saying-where-you-are",
    intro:
      "You have arrived somewhere you were expected. Before anything else they need to know it is you, and that you are here.",
    steps: [
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

  // ── THE SHAPE, SHOWN ───────────────────────────────────────────────────────
  //
  // Placed here and not earlier on purpose. By this point the learner has
  // written je suis ici from a call, chosen it against two other whole lines,
  // swapped the opener because the room changed, and put it in front of an
  // order they carried from L1. The reel is the moment that says what all of
  // that was: one shape, and the things you can hang off it. Before the
  // transfer it would have been the answer handed over early.
  //
  // Full complements, never bare adjectives. "Je suis" + "prêt" is the true
  // seam; teaching "prêt" alone would model a plug-and-play grammar French does
  // not have, and the reel is the one surface where a false model would be
  // learned as a picture rather than argued with.
  //
  // Grades nothing, targets nothing. Every complement here is already on this
  // lesson's Showcase, so the reel re-presents what L2 displays instead of
  // reaching for material the later lessons teach: fatigué and content are
  // L17's to demand, and they stay exposure here.
  {
    id: "s25-reel-je-suis-pattern",
    type: "pattern-reel",
    payload: {
      title: "One shape, many states.",
      body:
        "You have used these two words four times now, and the room was different every time. Here is the rest of what they carry.",
      stem: "Je suis",
      rows: [
        { fr: "ici", en: "here" },
        { fr: "prêt", en: "ready" },
        { fr: "fatigué", en: "tired" },
        { fr: "content", en: "glad" },
        { fr: "désolé", en: "sorry" },
        { fr: "en retard", en: "late" },
      ],
      note:
        "Je suis says how things are with you. Change what comes after it and you change what you are saying about yourself, without learning a new sentence. It is the same move as je voudrais: keep the shape, swap what it carries.",
    },
  },

  {
    // RECOGNITION UNDER A NEW COMPLEMENT, and deliberately not a production.
    //
    // "Vous êtes prêt ?" has sat on this lesson's Showcase since it was written
    // and was never once used -- display content, exactly as the founder read
    // it. It gets a job here, and the job is the one L2 is allowed to give it:
    // the guards are right that L2 may not PRODUCE prêt. chunk-je-suis-pret is
    // exposure tier and L17 is where states are demanded, so a chip tray
    // holding prêt would be canon §2.2's forbidden zone and would quietly annex
    // a later lesson's teaching.
    //
    // A whole-sentence choice takes none of that. It is also the sharper
    // exercise: the third option is the one line this lesson has drilled six
    // times, so the learner has to notice that the question changed rather than
    // reach for the sentence they are holding.
    id: "s26-fill-answer-are-you-ready",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-suis"],
    evidenceTargetItemIds: ["chunk-je-suis"],
    weakPointTags: ["natural-speech"],
    payload: {
      prompt:
        "Your bags are by the door and the taxi is waiting. From the hallway comes « Vous êtes prêt ? ». What do you call back?",
      blankCount: 1,
      options: [
        { id: "opt-je-suis-pret", text: "Je suis prêt.", isCorrect: true },
        {
          id: "opt-je-suis-ici",
          text: "Je suis ici.",
          isCorrect: false,
          learningErrorTag: "meaning_shift",
          trapReason:
            "The sentence you have been building all lesson, and they can already see where you are. They asked whether you are ready.",
        },
        {
          id: "opt-je-voudrais-un-cafe",
          text: "Je voudrais un café.",
          isCorrect: false,
          learningErrorTag: "meaning_shift",
          trapReason:
            "That asks for something. Nobody is offering you a drink on the way out of the door.",
        },
      ],
      answer: ["opt-je-suis-pret"],
      reveal: {
        short: "Je suis prêt.",
        explanation:
          "The engine did not move. Only the word after it did, which is what the reel just showed you: ici says where, prêt says how you are.",
        natural: "Je suis prêt.",
      },
    },
  },

  {
    // NOT A CHUNK, on purpose. ne ... pas is a frame that opens around the
    // verb, and the one way to teach it wrongly is to show "je ne suis pas"
    // as a single pill the way this lesson shows "je suis" -- which would
    // have the learner storing a fourth memorised block instead of seeing
    // that something wraps something else.
    //
    // Recognition only. L3 is the negation lesson: it demands
    // chunk-je-ne-suis-pas, meets it, fills it, weaves it twice and reveals
    // it. This card takes none of that. It shows the learner the shape of
    // the answer they will need the moment somebody asks the question the
    // screen above just asked, and hands the teaching to L3 intact. No
    // targetItemIds for the same reason: nothing here is being claimed.
    id: "s27-insight-not-yet",
    type: "insight-card",
    payload: {
      insightType: "grammar-nugget",
      title: "And when the answer is no.",
      body:
        "French says no to a sentence by putting two small words around the verb: ne in front of it, pas behind it. They are one move in two halves, and they never sit next to each other. You will build these yourself in the next lesson. For now, recognise the shape when it comes at you.",
      examples: [
        { fr: "Je suis prêt.", en: "I'm ready." },
        {
          fr: "Je ne suis pas prêt.",
          en: "I'm not ready.",
          note: "ne [ suis ] pas. The verb sits inside, and prêt stays exactly where it was.",
        },
      ],
    },
  },

  {
    // THE OTHER THING THE SHAPE DOES: apologise for a state.
    //
    // Three of this lesson's Showcase lines had never been touched by any
    // screen in any lesson -- désolé on its own, en retard, and the readiness
    // pair's negative. They are frequent beginner survival language and they
    // were being shown in a gallery.
    //
    // The operation is new for L2 and it is not "which line fits": it is
    // reading what a moment NEEDS. The learner is late, and the true sentence
    // (they are here) is the useless one, which is why it is the trap. Saying
    // where you are does not repair anything.
    //
    // Recognition only, and the target stays chunk-je-suis. désolé is L7's and
    // en retard has no registry identity at all, so nothing here is typed,
    // claimed or put in a tray -- the learner meets a whole line and judges the
    // moment.
    id: "s28-fill-arriving-late",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-suis"],
    evidenceTargetItemIds: ["chunk-je-suis"],
    weakPointTags: ["politeness"],
    payload: {
      prompt:
        "They have been waiting twenty minutes and you have only just got there. Everyone looks up. What do you lead with?",
      blankCount: 1,
      options: [
        { id: "opt-desole-retard", text: "Désolé, je suis en retard.", isCorrect: true },
        {
          // Longer than the right answer on purpose: the length tell is the one
          // way a three-option screen grades itself, and this lesson's traps
          // have to compete on meaning.
          id: "opt-je-voudrais-un-cafe",
          text: "Je voudrais un café, s'il vous plaît.",
          isCorrect: false,
          learningErrorTag: "meaning_shift",
          trapReason:
            "You have kept people waiting. Ordering a coffee is not the first thing out of your mouth.",
        },
        {
          id: "opt-je-suis-pret",
          text: "Je suis prêt.",
          isCorrect: false,
          learningErrorTag: "meaning_shift",
          trapReason:
            "That answers a question nobody asked. Say sorry first; ready comes after.",
        },
      ],
      answer: ["opt-desole-retard"],
      reveal: {
        short: "Désolé, je suis en retard.",
        explanation:
          "The same two words again, carrying something else: not where you are, but why you are late. Désolé goes in front the way Bonjour and Excusez-moi did.",
        natural: "Désolé, je suis en retard.",
      },
    },
  },

  activityChain({
    id: "s21-chain-answer-then-arrive",
    intro:
      "You are somewhere you are expected, and you will need to say two different things about being there.",
    steps: [
        {
          // REPURPOSED. This used to be a third "which whole line fits this
          // moment?", after s04b had already asked it and s05b had already made
          // the opener a decision. Three screens, one operation, and its answer
          // was a fourth appearance of the sentence the lesson is drowning in.
          //
          // The operation it does now is the one L2 actually owns and had never
          // extended: sorting French by what a sentence DOES. s04b sorted
          // locating from asking-for-something. This adds the third family the
          // learner has been shown and never touched -- saying how you are --
          // and it arrives the way it will in life, as a question aimed at them.
          //
          // LIGHT REUSE, not annexation. Comment ça va is L18's demand and Ça va
          // is L17's; both keep every screen of their arcs. Nothing here is
          // typed, no target names them, and the learner is asked to recognise
          // which answer is even in the right territory -- not to produce it, and
          // not to hear the rising and falling tone that is L17's whole lesson.
          id: "s10b-fill-which-line",
          type: "fill-with-traps",
          targetItemIds: ["chunk-je-suis"],
          evidenceTargetItemIds: ["chunk-je-suis"],
          weakPointTags: ["natural-speech"],
          payload: {
            prompt:
              "You have arrived, they know who you are, and they ask you something else: « Comment ça va ? ». You will learn to answer this properly later. Which one is even about the same thing?",
            blankCount: 1,
            options: [
              { id: "opt-ca-va", text: "Ça va.", isCorrect: true },
              {
                id: "opt-the",
                text: "Je voudrais un thé, s'il vous plaît.",
                isCorrect: false,
                learningErrorTag: "meaning_shift",
                trapReason:
                  "That asks for something. They asked how you are, not what you want.",
              },
              {
                id: "opt-repeter",
                text: "Vous pouvez répéter ?",
                isCorrect: false,
                learningErrorTag: "meaning_shift",
                trapReason:
                  "That is for when you missed what they said. You heard this one.",
              },
            ],
            answer: ["opt-ca-va"],
            reveal: {
              short: "Ça va.",
              explanation:
                "Three things you can now recognise by what they do: je suis says where or how you are, je voudrais asks for something, and ça va is the small exchange about how you are. Ça va travels whole, and it is both the question and the answer. Ça va bien. is the same answer with a little more warmth in it.",
              natural: "Ça va.",
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
        "Then someone asked if you were ready, and the same shape answered that too.",
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
    // The verb behind the lesson's title, and the note that explains it. Both
    // were registered and then never reached by any lesson, so L2 was teaching
    // "je suis" while the identity for être itself sat orphaned in the
    // registry. Recognition only: the learner meets the engine, and is not
    // asked to conjugate anything.
    "verb-etre",
    "grammar-etre-identity",
    // The pronoun the whole lesson turns on. Reached here because this is where
    // "je suis" is first broken into its two pieces.
    "pronoun-je",
    // "Vous êtes prêt ?" is already on this lesson's Showcase, so the liaison it
    // demonstrates is language the learner meets here rather than later.
    "sound-liaison",
    // Declared because the lesson now USES it, not only displays it: s26 quotes
    // « Vous êtes prêt ? » as the incoming question. Recognition only — the
    // learner answers it and never asks it, and no production target moves.
    "chunk-vous-etes-pret",
    // Shown by the reel and offered as the right answer to that question. Also
    // recognition: states are L17's to demand, and nothing here puts prêt in a
    // chip tray or asks the learner to type it.
    "chunk-je-suis-pret",
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
    "Showcase-integration pass: ici is still the only completion L2 PRODUCES, and the opener is still what varies in every typed answer. What changed is that the lesson stopped pretending the rest of the Showcase was not there. s25 shows five further completions and grades none of them; s26 lets the learner choose one against the sentence they have been drilling. Neither adds a production target, a demand or a chip-tray piece.",
    "Follow-up pass: Je suis ici went from 17 of 20 screens to 12 of 18. Three screens repeated an operation rather than adding one and are gone or changed — s02 met a line composed entirely of owned pieces, s10d asked for the two-sentence arrival a second time with a different drink, and s06 explained in prose what s25 now shows. s10b was a third 'which whole line fits', and now sorts French by what a sentence DOES, extending that discrimination to the check-in family. s28 is new: reading what a moment needs, where the true sentence is the useless one.",
    "Every remaining Je suis ici appearance has a distinct job: Showcase anchor, first encounter, word-level completion, first production, whole-sentence retrieval, opener production, opener choice frame, two-sentence recombination, a trap in s26, a French-scene production, free production, and the three-opener reveal.",
    "L2 does not teach the check-in exchange. Ça va, Comment ça va, fatigué and content stay on the Showcase as forward exposure because L17 and L18 own them as acquisition demands, and pulling them forward would empty those lessons. Same for ne ... pas: s27 shows the frame and L3 still teaches it.",
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
    "s25 rotates full complements (Je suis + ici / prêt / fatigué / content / désolé / en retard), never bare adjectives, and grades nothing.",
    "s26 fires the meaning trap on Je suis ici, which is the sentence the lesson has been drilling.",
    "s27 shows ne and pas on either side of suis and never as one chip.",
    "s10b fires both meaning traps and its reveal names the three sentence families by what they do.",
    "s28 fires the meaning trap on Je suis prêt and its correct answer is not the longest option.",
  ],
};
