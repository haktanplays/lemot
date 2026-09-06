import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";
import { activityChain } from "../activityChain";

const screens: LessonScreen[] = [


  {
    // L4's world is the body and the mind: what you have, what you feel, what
    // you need. French puts most of this on avoir, which is the one thing the
    // lesson actually teaches; the width here is what makes that worth knowing.
    id: "s20-showcase-having",
    type: "showcase",
    payload: {
      intro:
        "French says you HAVE hunger, you HAVE cold, you HAVE a question. One small engine carries almost everything you need to say about yourself today.",
      clusters: [
        {
          label: "What your body is telling you",
          sentences: [
            { fr: "J'ai faim.", en: "I'm hungry.", role: "core", itemIds: ["chunk-j-ai-faim"] },
            { fr: "J'ai soif.", en: "I'm thirsty.", role: "supported" },
            { fr: "J'ai froid.", en: "I'm cold.", role: "exposure" },
            { fr: "J'ai chaud.", en: "I'm hot.", role: "exposure" },
          ],
        },
        {
          label: "What you have to say",
          sentences: [
            {
              fr: "J'ai une question.",
              en: "I have a question.",
              role: "core",
              itemIds: ["chunk-j-ai-une-question"],
            },
            { fr: "J'ai une idée.", en: "I have an idea.", role: "core", itemIds: ["noun-idee"] },
            { fr: "Excusez-moi, j'ai une question.", en: "Excuse me, I have a question.", role: "core" },
            { fr: "J'ai un problème.", en: "I have a problem.", role: "exposure" },
          ],
        },
        {
          label: "Time and help",
          sentences: [
            { fr: "J'ai le temps.", en: "I have time.", role: "supported" },
            { fr: "Je n'ai pas le temps.", en: "I don't have time.", role: "exposure" },
            { fr: "J'ai besoin d'aide.", en: "I need help.", role: "exposure" },
            { fr: "J'ai fini.", en: "I'm done.", role: "exposure" },
          ],
        },
        {
          label: "Putting it with where you are",
          sentences: [
            { fr: "Je suis ici. J'ai faim.", en: "I'm here. I'm hungry.", role: "core" },
            { fr: "Bonjour, j'ai une question.", en: "Hello, I have a question.", role: "core" },
            { fr: "Je ne comprends pas. J'ai une question.", en: "I don't understand. I have a question.", role: "supported" },
          ],
        },
        {
          label: "What people ask you",
          sentences: [
            { fr: "Vous avez faim ?", en: "Are you hungry?", role: "exposure" },
            { fr: "Vous avez une question ?", en: "Do you have a question?", role: "exposure" },
          ],
        },
      ],
    },
  },


  {
    id: "s00-goal-jai",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Your second engine",
      body:
        "Today: your second engine, j'ai.\n" +
        "By the end: you can choose between where you are, how you feel, and what you have to ask.\n" +
        "Main pieces: je suis, ici, j'ai, faim, une question.",
    },
  },


  {
    id: "s00-meet-j-ai-faim",
    type: "meet-card",
    targetItemIds: ["chunk-j-ai-faim", "chunk-j-ai"],
    weakPointTags: ["avoir-vs-etre", "j-ai-vs-je-suis"],
    payload: {
      fr: "J'ai faim.",
      en: "I am hungry.",
      title: "A different way to feel.",
      highlights: [
        { text: "J'ai", itemId: "chunk-j-ai" },
        { text: "faim", itemId: "noun-faim" },
      ],
      tts: true,
    },
  },


  {
    id: "s01-insight-have-for-feelings",
    type: "insight-card",
    targetItemIds: ["micro-je-suis-vs-j-ai", "chunk-j-ai", "chunk-je-suis"],
    weakPointTags: ["avoir-vs-etre", "j-ai-vs-je-suis"],
    payload: {
      insightType: "micro-contrast",
      title: "French has hunger.",
      body:
        "In English you are hungry. In French you have hunger: j'ai faim. " +
        "French puts some feelings on have, not on be. Je suis names who or " +
        "where you are; j'ai names what you feel or have: a feeling like " +
        "j'ai faim, or a thing like j'ai une question.",
      examples: [
        { fr: "Je suis ici.", en: "I am here." },
        { fr: "J'ai faim.", en: "I am hungry." },
        { fr: "J'ai une question.", en: "I have a question." },
      ],
    },
  },


  {
    id: "s02-fill-have-not-be",
    type: "fill-with-traps",
    targetItemIds: ["chunk-j-ai", "chunk-j-ai-faim"],
    weakPointTags: ["avoir-vs-etre", "j-ai-vs-je-suis"],
    payload: {
      prompt: "Which one fits a feeling you have?",
      sentenceAfter: "faim.",
      blankCount: 1,
      options: [
        { id: "opt-j-ai", text: "J'ai", isCorrect: true },
        {
          id: "opt-je-suis",
          text: "Je suis",
          isCorrect: false,
          trapReason:
            "Je suis names who or where you are. For hunger, French uses have: j'ai faim.",
        },
        {
          id: "opt-je-voudrais",
          text: "Je voudrais",
          isCorrect: false,
          trapReason:
            "Je voudrais asks for something. Hunger is a state you have, not a request.",
        },
      ],
      answer: ["opt-j-ai"],
      reveal: {
        short: "J'ai",
        explanation: "French has hunger: j'ai faim.",
        natural: "J'ai faim.",
      },
    },
  },


  {
    id: "s03-meet-j-ai-une-question",
    type: "meet-card",
    targetItemIds: ["chunk-j-ai-une-question", "chunk-j-ai"],
    weakPointTags: ["j-ai-vs-je-suis"],
    payload: {
      fr: "J'ai une question.",
      en: "I have a question.",
      title: "Have works for things too.",
      highlights: [
        { text: "J'ai", itemId: "chunk-j-ai" },
        { text: "une question", itemId: "noun-question" },
      ],
      tts: true,
    },
  },


  {
    id: "s03b-fill-where-feel-have",
    type: "fill-with-traps",
    targetItemIds: [
      "chunk-j-ai-une-question",
      "chunk-je-suis-ici",
      "chunk-j-ai-faim",
    ],
    weakPointTags: ["avoir-vs-etre", "j-ai-vs-je-suis"],
    payload: {
      prompt: "You came with one small thing to ask. What do you say?",
      blankCount: 1,
      options: [
        { id: "opt-question", text: "J'ai une question.", isCorrect: true },
        {
          id: "opt-ici",
          text: "Je suis ici.",
          isCorrect: false,
          trapReason: "That says where you are, not what you have to ask.",
        },
        {
          id: "opt-faim",
          text: "J'ai faim.",
          isCorrect: false,
          trapReason: "That says how you feel, not that you have a question.",
        },
      ],
      answer: ["opt-question"],
      reveal: {
        short: "J'ai une question.",
        explanation:
          "French uses j'ai for this: I have a question. Je suis ici says where you are. J'ai faim says how you feel.",
        natural: "J'ai une question.",
      },
    },
  },


  {
    id: "s04-insight-jai-elision",
    type: "insight-card",
    targetItemIds: ["sound-elision", "chunk-j-ai"],
    weakPointTags: ["elision"],
    payload: {
      insightType: "sound-writing",
      title: "je + ai becomes j'ai.",
      body:
        "Before a vowel, je drops its e and joins the next word: je + ai " +
        "becomes j'ai. You hear and write one smooth piece, j'ai.",
      examples: [
        { fr: "je + ai", en: "I + have" },
        { fr: "j'ai", en: "I have" },
      ],
    },
  },

  activityChain({
    id: "s22-chain-what-you-have-here",
    intro:
      "Hunger and questions are both things you have. See how far that one engine carries you, and where you still need the other one.",
    steps: [
      {
        id: "s05-weave-j-ai-faim",
        type: "weave",
        targetItemIds: ["chunk-j-ai-faim", "chunk-j-ai"],
        weakPointTags: ["avoir-vs-etre", "j-ai-vs-je-suis"],
        payload: {
          weaveType: "mid",
          prompt: "Say how you feel, the French way.",
          context: "It is past noon and you have not eaten.",
          suggestedPieces: [
            { text: "j'ai", itemId: "chunk-j-ai", required: true, label: "I have" },
            { text: "faim", itemId: "noun-faim", required: true, label: "feeling word" },
          ],
          expectedAnswers: ["J'ai faim."],
          acceptedAlternatives: [
            "J ai faim.",
            "J ai faim",
            "j ai faim",
          ],
          reveal: {
            modelAnswer: "J'ai faim.",
            ifCorrect: "You used have for a feeling, the French way.",
            ifCorrectButFlat: "Right. faim is hunger; j'ai faim is I am hungry.",
            ifUnderstandableButWrong:
              "Your meaning lands. French puts the feeling on have: j'ai faim.",
            ifMissingTargetPiece: "Start with j'ai, then faim.",
          },
          validationMode: "exact-or-alternative",
        },
      },
      {
        id: "s06-weave-bonjour-j-ai-une-question",
        type: "weave",
        targetItemIds: ["chunk-bonjour", "chunk-j-ai-une-question", "chunk-j-ai"],
        weakPointTags: ["j-ai-vs-je-suis"],
        payload: {
          weaveType: "context",
          prompt: "Greet them, then say you have a question.",
          context: "You step up to ask someone something. They turn to you: « Oui ? »",
          suggestedPieces: [
            { text: "Bonjour", itemId: "chunk-bonjour", required: true, label: "greeting" },
            { text: "j'ai", itemId: "chunk-j-ai", required: true, label: "I have" },
            { text: "une question", itemId: "noun-question", required: true, label: "noun package" },
          ],
          hintCloze: "Bonjour, j'ai une ___.",
          expectedAnswers: ["Bonjour, j'ai une question."],
          acceptedAlternatives: [
            "Bonjour, j ai une question.",
            "Bonjour j ai une question",
          ],
          reveal: {
            modelAnswer: "Bonjour, j'ai une question.",
            ifCorrect: "Greeting plus a clear request to ask. That is a real opening.",
            ifCorrectButFlat: "Right. The comma lets the greeting settle first.",
            ifUnderstandableButWrong:
              "Your meaning lands. French hands the question to have: j'ai une question.",
            ifMissingTargetPiece: "Greet with bonjour, then j'ai une question.",
          },
          validationMode: "exact-or-alternative",
        },
      },
      {
        // s06 put j'ai une question behind bonjour. This asks whether the learner
        // can tell WHICH opener the moment wants, which is the same discrimination
        // L4 teaches between engines, applied one layer out. Both openers are
        // correct French and both were produced in L1, so the bonjour miss is a
        // register miss, not a vocabulary miss.
        id: "s06b-fill-opener-for-a-question",
        type: "fill-with-traps",
        targetItemIds: [
          "chunk-excusez-moi",
          "chunk-bonjour",
          "chunk-j-ai-une-question",
        ],
        evidenceTargetItemIds: ["chunk-excusez-moi"],
        weakPointTags: ["politeness"],
        payload: {
          prompt:
            "Same question, a different moment: they are already deep in their work and have not seen you. How do you open?",
          sentenceAfter: ", j'ai une question.",
          blankCount: 1,
          options: [
            { id: "opt-excusez-moi", text: "Excusez-moi", isCorrect: true },
            {
              id: "opt-bonjour",
              text: "Bonjour",
              isCorrect: false,
              learningErrorTag: "wrong_register",
              trapReason:
                "Correct French, and polite. But a greeting expects to be met, and they have not looked up.",
            },
            {
              id: "opt-non-merci",
              text: "Non merci",
              isCorrect: false,
              learningErrorTag: "meaning_shift",
              trapReason:
                "That turns something down. Nothing has been offered to you yet.",
            },
          ],
          answer: ["opt-excusez-moi"],
          reveal: {
            short: "Excusez-moi",
            explanation:
              "The engine did not move. Only the opener did: bonjour for someone who can see you, excusez-moi for someone who cannot.",
            natural: "Excusez-moi, j'ai une question.",
          },
        },
      },
      {
        // The one screen in L4 where the learner must choose BETWEEN the two engines
        // while producing, with no tray telling them which is which. Both sentences
        // are owned, so the difficulty is entirely deciding what each moment needs
        // and retrieving it. This is also L4's least-scaffolded action: every other
        // production here supplies its pieces.
        id: "s06c-weave-open-here-and-hungry",
        type: "weave",
        targetItemIds: [
          "chunk-je-suis-ici",
          "chunk-je-suis",
          "chunk-j-ai-faim",
          "chunk-j-ai",
        ],
        evidenceTargetItemIds: ["chunk-j-ai-faim", "chunk-j-ai"],
        weakPointTags: ["avoir-vs-etre", "j-ai-vs-je-suis"],
        payload: {
          weaveType: "open",
          prompt: "Say you have arrived, then say you have not eaten.",
          context:
            "You get to your friend's door after a long trip. Two short sentences, and the second one is a feeling.",
          expectedAnswers: ["Je suis ici. J'ai faim."],
          acceptedAlternatives: [
            "Je suis ici. J ai faim.",
            "Bonjour, je suis ici. J'ai faim.",
            "Bonjour, je suis ici. J ai faim.",
          ],
          reveal: {
            modelAnswer: "Je suis ici. J'ai faim.",
            ifCorrect:
              "Two engines, one after the other. Where you are is je suis; how you feel is j'ai.",
            ifCorrectButFlat:
              "Right. Two short sentences do the work here, and each one takes a different engine.",
            ifUnderstandableButWrong:
              "Your meaning lands. Keep them apart: je suis carries the place, j'ai carries the feeling.",
            ifMissingTargetPiece:
              "Arrive first with je suis ici, then say the feeling with j'ai faim.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),

  activityChain({
    id: "s21-chain-a-third-kind-of-have",
    intro:
      "Your hunger, your questions and your ideas all arrive on the same engine. This is the third one.",
    steps: [
        {
          // Corpus closure. Payload Economy v0 §6 names une idee as L4's next cargo
          // and notes it "reuses the already-registered dormant noun-idee" -- the
          // registry entry has carried the example "J'ai une idee." since it was
          // written, and no lesson had ever reached it. It widens the engine past
          // BODY need: j'ai now carries something you feel, something you want to
          // ask, and something you have thought of.
          id: "s09-meet-j-ai-une-idee",
          type: "meet-card",
          targetItemIds: ["chunk-j-ai", "noun-idee"],
          weakPointTags: ["elision"],
          payload: {
            fr: "J'ai une idée.",
            en: "I have an idea.",
            title: "Have carries thoughts too.",
            highlights: [
              { text: "J'ai", itemId: "chunk-j-ai" },
              { text: "une idée", itemId: "noun-idee" },
            ],
            tts: true,
          },
        },
        {
          // Three j'ai lines, three different kinds of thing to have. This is the
          // screen that stops the engine reading as "j'ai faim and nothing else".
          id: "s09b-fill-which-kind-of-have",
          type: "fill-with-traps",
          targetItemIds: ["noun-idee", "chunk-j-ai"],
          evidenceTargetItemIds: ["noun-idee"],
          weakPointTags: ["avoir-vs-etre"],
          payload: {
            prompt:
              "The room has been stuck on the same problem for ten minutes. Something occurs to you.",
            blankCount: 1,
            options: [
              { id: "opt-idee", text: "J'ai une idée.", isCorrect: true },
              {
                id: "opt-question",
                text: "J'ai une question.",
                isCorrect: false,
                trapReason:
                  "That asks the room for something. You are about to give them something instead.",
              },
              {
                id: "opt-faim",
                text: "J'ai faim.",
                isCorrect: false,
                trapReason:
                  "Also true, possibly. But it is a body telling you something, not a way out of the problem.",
              },
            ],
            answer: ["opt-idee"],
            reveal: {
              short: "J'ai une idée.",
              explanation:
                "Same engine, a third kind of thing to have. French has hunger, has questions, and has ideas.",
              natural: "J'ai une idée.",
            },
          },
        },
        {
          // Second use of the new cargo, unsupplied, behind the opener L1 owns.
          id: "s09c-weave-cut-in-with-an-idea",
          type: "weave",
          targetItemIds: ["chunk-excusez-moi", "noun-idee"],
          weakPointTags: ["politeness", "elision"],
          payload: {
            weaveType: "open",
            prompt: "Cut in, then say what you have.",
            context: "They are still talking. What you thought of will not keep much longer.",
            suggestedPieces: [
              { text: "excusez-moi", itemId: "chunk-excusez-moi", label: "cutting in" },
              { text: "j'ai", itemId: "chunk-j-ai", label: "I have" },
              { text: "une idée", itemId: "noun-idee", label: "the thing you have" },
            ],
            hintCloze: "Excusez-moi, j'ai ___.",
            expectedAnswers: ["Excusez-moi, j'ai une idée."],
            acceptedAlternatives: [
              "Excusez-moi. J'ai une idée.",
              "Excusez-moi, j ai une idée.",
            ],
            reveal: {
              modelAnswer: "Excusez-moi, j'ai une idée.",
              ifCorrect: "The opener you own, in front of the engine you own, carrying something new.",
              ifCorrectButFlat: "Right. Reach them first, then say what you have.",
              ifUnderstandableButWrong:
                "Your meaning lands. Excusez-moi buys the pause; j'ai une idée fills it.",
              ifMissingTargetPiece:
                "Excusez-moi reaches them. J'ai une idée is what you have.",
            },
            validationMode: "exact-or-alternative",
          },
        },
    ],
  }),


  {
    id: "s07-sayit-how-you-feel",
    type: "say-it-your-way",
    targetItemIds: ["chunk-j-ai", "chunk-j-ai-faim"],
    weakPointTags: ["avoir-vs-etre", "natural-speech"],
    payload: {
      situation:
        "You have not eaten all morning and you want to let someone know how you feel. " +
        "Say it the French way.",
      communicativeGoal: "Say what you feel, using have.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour" },
        { text: "j'ai", itemId: "chunk-j-ai" },
        { text: "faim", itemId: "noun-faim" },
      ],
      modelAnswer: "J'ai faim.",
      reveal: {
        modelAnswer: "J'ai faim.",
        naturalAlternatives: ["Bonjour, j'ai faim."],
        explanation:
          "French puts hunger on have: j'ai faim. Add bonjour if you are greeting someone first.",
      },
      validationMode: "model-answer-only",
    },
  },


  {
    // L4's contrast is stated once, at s01, before the learner has used either
    // engine. This is the same contrast AFTER four moments have used them, and
    // it reflects rather than teaches, so it is a natural-reveal and not a
    // fourth insight card: L4 sits at the canon 11 V5 budget of three.
    id: "s07b-natural-reveal-two-engines",
    type: "natural-reveal",
    targetItemIds: ["chunk-je-suis", "chunk-j-ai", "micro-je-suis-vs-j-ai"],
    weakPointTags: ["avoir-vs-etre", "j-ai-vs-je-suis"],
    payload: {
      explanation:
        "Look at what decided each sentence.\n" +
        "Not the word you wanted, but the kind of thing you were saying. A place took je suis. A feeling took j'ai. A thing you carry took j'ai as well. English would have used am for two of those three, which is exactly why French sounds wrong when you translate it straight across.",
      naturalAlternatives: [
        "Je suis ici.",
        "J'ai faim.",
        "J'ai une question.",
      ],
    },
  },


  {
    id: "s08-recap-jai",
    type: "recap",
    payload: {
      title: "You have feelings in French now.",
      lines: [
        "French often uses have where English uses be.",
        "You said j'ai faim for I am hungry.",
        "You used j'ai for a thing too: j'ai une question.",
        "And you kept the two engines apart in one moment: je suis for the place, j'ai for the feeling.",
      ],
      piecesUsed: [
        "j'ai",
        "faim",
        "une question",
        "je suis",
        "ici",
        "Bonjour",
        "Excusez-moi",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson004: Lesson = {
  id: "v1-lesson-004",
  version: "v1",
  number: 4,
  title: "J'ai",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "architecture-verb",
  journeyRole: "standard",
  acquisitionDemandItemIds: ["chunk-j-ai"],
  estimatedMinutes: 6,
  canDo: "Say how you feel and what you have.",
  whyItExists:
    "L2 gave je suis, the first engine. L4 gives the second: j'ai. French often puts feelings and simple possession on have, not on be, so I am hungry becomes j'ai faim. L4 stays bounded to j'ai chunks and the je suis vs j'ai contrast; the full avoir paradigm, age, numbers, and the need system are deferred.",
  prerequisites: ["v1-lesson-003"],
  learningItems: getItems([
    "chunk-j-ai",
    "chunk-j-ai-faim",
    "noun-faim",
    "chunk-j-ai-une-question",
    "micro-je-suis-vs-j-ai",
    "sound-elision",
    "noun-question",
    // PRE-EXISTING RUNTIME DEFECT, fixed here because it makes L4 unplayable.
    // s01-insight already targeted chunk-je-suis, s03b-fill already targeted
    // chunk-je-suis-ici, and s06-weave already targeted chunk-bonjour, but none
    // was declared in learningItems. resolveLessonTreatmentForItem refuses to
    // guess an unstated treatment, so the evidence layer threw an uncaught
    // LessonTreatmentError partway through the lesson. This is the same defect
    // fixed in L3; all three are recycles, not new demands. je suis and je suis
    // ici are owned by L2 and appear here only as the contrast side of the
    // je suis vs j'ai discrimination; bonjour is the L0/L1 opener the weave
    // puts in front of the engine. acquisitionDemandItemIds is unchanged.
    "chunk-je-suis",
    "chunk-je-suis-ici",
    "chunk-bonjour",
    // Recycled from L1 for the founder-usable pass: the second opener s06b
    // makes the learner choose, and the refusal it traps against. Neither is
    // re-taught and neither is a demand.
    "chunk-excusez-moi",
    "chunk-non-merci",
    // Corpus closure. Payload Economy v0 §6: the dormant noun-idee, activated
    // as L4's third cargo so j'ai stops being a body-need engine only. Its
    // registry record already carried "J'ai une idee." as its example and named
    // the elision it triggers. Supported, supplied in every tray, not a demand:
    // acquisitionDemandItemIds stays exactly ["chunk-j-ai"].
    "noun-idee",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Second Training Pack lesson under the Training Content Factory contract. L4 maps to the slice-spec PR H. Owned core: j'ai as the second sentence engine.",
    "Contrast metaphor: micro-je-suis-vs-j-ai. French uses have where English uses be for some feelings (j'ai faim = I am hungry). Taught as a French-thinks-differently moment, not a paradigm table.",
    "Elision is taught lightly: je + ai becomes j'ai. Not a broad elision lecture.",
    "chunk-j-ai is promoted from supported to active in this lesson.",
    "L4 follows the enumerated 9-screen shape from the L3-L6 content plan (meet x2, insight x2, fill x1, weave x2, say-it x1, recap). The plan header's '10 screens' is treated as an off-by-one note, not a reason to add a filler screen.",
    "Founder-usable pass (L1-L6): L4 asserted the je suis vs j'ai contrast at s01 and then only ever tested it with the pieces supplied. The three screens added deepen the discrimination instead of lengthening the phrase list. s06b moves the choice one layer out to the opener, so the engine holds still while the moment changes. s06c is the lesson's only unsupplied production and the only place both engines must be chosen between while producing. s07b re-states the contrast after four moments have used it. No new item and no new j'ai completion: acquisitionDemandItemIds stays exactly ['chunk-j-ai'].",
    "s07b is a natural-reveal, not a fourth insight card: L4 is already at the canon 11 V5 insight budget of three, and the screen reflects rather than teaches.",
    "je n'ai pas (negated avoir) is deferred so L4 does not compete with its core j'ai engine by re-opening negation-of-avoir.",
    "j'ai besoin de (need) is deferred because it pulls in object vocabulary and a wider need frame; it should return later as a controlled need structure.",
    "L4 is not a full avoir paradigm lesson. Do not teach or imply active ownership of tu as, il a / elle a, nous avons, vous avez, ils ont, age, numbers, broad possession, or broad need.",
    "Tone stays polite and neutral throughout. SayIt is deterministic and model-answer-only, consistent with L0-L3.",
    "No XP / streak / level-up / mission copy.",
  ],
  qaChecks: [
    "TTS reads J'ai faim, J'ai une question, and Bonjour, j'ai une question cleanly.",
    "Apostrophe normalization handles curly quotes in j'ai; the unaccented j ai variant passes Weave.",
    "Casing variants pass Weave via accepted alternatives.",
    "s02 trap reasons fire on Je suis and Je voudrais selections.",
    "The je suis vs j'ai contrast reads as natural difference, not a grammar table.",
    "No theatrical positivity tokens appear.",
    "s06b renders the trailing frame , j'ai une question and fires the register trap on Bonjour.",
    "s06c shows no chip tray at all and accepts the two-sentence answer with or without the leading Bonjour and with the unaccented J ai variant.",
    "s07b renders three alternatives, grades nothing, and TTS reads each of the three cleanly.",
  ],
};
