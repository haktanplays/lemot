import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";
import { activityChain } from "../activityChain";

const screens: LessonScreen[] = [


  {
    // L7's world is leaving: where you are going, and the handful of ways a
    // French goodbye actually closes. The lesson owns one destination; the rest
    // is here so "je vais ..." reads as a direction shape, not one address.
    id: "s20-showcase-leaving",
    type: "showcase",
    payload: {
      intro:
        "Leaving well is its own small skill in French. Say where you are heading, say when, and close the door with a word that fits the hour.",
      clusters: [
        {
          label: "Where you are heading",
          sentences: [
            { fr: "Je vais à la maison.", en: "I'm going home.", role: "core", itemIds: ["chunk-je-vais", "chunk-a-la-maison"], depth: { sound: "zhuh vay a la may-ZON", notice: "The accent on à changes nothing you can hear. It is there to keep this à, meaning to or at, apart from a, which is a form of have. Same sound, different job, and French uses the mark instead of a different word.", compare: "à la stays two audible pieces where au fuses into one. If you can hear a la, it is this shape." } },
            { fr: "Je vais au café.", en: "I'm going to the café.", role: "core", itemIds: ["chunk-au-cafe"], depth: { sound: "zhuh vay oh ka-FAY", structure: "au is one piece, said oh. It is the shape café carries whenever you go there.", compare: "au café but à la maison. Same job, two shapes, and the place decides which.", inDepth: "au is what happens when à meets the little word French uses in front of café. The two fuse into one sound, which is why you never hear à le. Places that take the other little word keep both parts audible: à la maison, à la gare. Learn the destination whole and the pattern arrives on its own later." } },
            { fr: "Je vais à la gare.", en: "I'm going to the station.", role: "core", itemIds: ["chunk-a-la-gare"] },
            { fr: "Je vais au travail.", en: "I'm going to work.", role: "supported", itemIds: ["chunk-au-travail"] },
          ],
        },
        {
          label: "Saying when",
          sentences: [
            { fr: "Je pars maintenant.", en: "I'm leaving now.", role: "supported", itemIds: ["chunk-je-pars", "adverb-maintenant"] },
            { fr: "Je vais au restaurant ce soir.", en: "I'm going to the restaurant this evening.", role: "supported", itemIds: ["chunk-au-restaurant", "adverb-ce-soir"] },
          ],
        },
        {
          label: "Closing the moment",
          sentences: [
            { fr: "Merci beaucoup, au revoir !", en: "Thank you very much, goodbye!", role: "core", itemIds: ["chunk-merci-beaucoup", "chunk-au-revoir"], pieces: ["Merci", "beaucoup", "au revoir"] },
            { fr: "Au revoir, bonne soirée !", en: "Goodbye, have a good evening!", role: "core", itemIds: ["chunk-bonne-soiree", "chunk-au-revoir"] },
            { fr: "Merci, bonne journée !", en: "Thanks, have a good day!", role: "supported", itemIds: ["chunk-bonne-journee", "chunk-merci"] },
            { fr: "Au revoir, à demain !", en: "Goodbye, see you tomorrow!", role: "supported", itemIds: ["chunk-a-demain", "adverb-demain", "chunk-au-revoir"] },
            { fr: "À bientôt !", en: "See you soon!", role: "supported", itemIds: ["chunk-a-bientot"], flat: "formula" },
            { fr: "À tout à l'heure !", en: "See you later!", role: "supported", itemIds: ["chunk-a-tout-a-l-heure"], flat: "formula" },
          ],
        },
        {
          label: "Leaving early, kindly",
          sentences: [
            { fr: "Désolé, je dois partir.", en: "Sorry, I have to go.", role: "core", itemIds: ["chunk-desole", "chunk-je-dois-partir"] },
            { fr: "Non merci, une autre fois.", en: "No thanks, another time.", role: "supported", itemIds: ["chunk-une-autre-fois", "chunk-non-merci", "chunk-merci"] },
            { fr: "Désolé, je dois partir. Encore merci !", en: "Sorry, I have to go. Thanks again!", role: "exposure", itemIds: ["chunk-encore-merci", "chunk-merci"] },
          ],
        },
        {
          label: "Being asked",
          sentences: [
            { fr: "Oui, je vais à la maison.", en: "Yes, I'm going home.", role: "core", itemIds: ["chunk-oui"] },
          ],
        },
        {
          // Leaving is two-sided, and until now the Showcase only ever showed
          // the learner's half.
          label: "What they say back",
          sentences: [
            { fr: "De rien.", en: "You're welcome.", role: "exposure", itemIds: ["chunk-de-rien"], flat: "formula" },
            { fr: "Au revoir, bonne nuit !", en: "Goodbye, good night!", role: "exposure", itemIds: ["chunk-bonne-nuit", "chunk-au-revoir"] },
            { fr: "Au revoir, bon week-end !", en: "Goodbye, have a good weekend!", role: "exposure", itemIds: ["chunk-bon-week-end", "chunk-au-revoir"] },
            { fr: "À bientôt, bon voyage !", en: "See you soon, have a good trip!", role: "exposure", itemIds: ["chunk-bon-voyage"] },
          ],
        },
      ],
    },
  },


  {
    id: "s00-goal-je-vais",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Heading off",
      body:
        "Today: where you are going, and how a French goodbye actually closes.\n" +
        "By the end: you can name a destination and leave a room kindly.\n" +
        "Main pieces: je vais, au café, bonne soirée, je dois partir.",
    },
  },


  {
    id: "s01-meet-je-vais-a-la-maison",
    type: "meet-card",
    targetItemIds: ["chunk-je-vais", "chunk-a-la-maison"],
    payload: {
      fr: "Je vais à la maison.",
      en: "I'm going home.",
      title: "Where you're heading.",
      highlights: [
        { text: "je vais", itemId: "chunk-je-vais" },
        { text: "à la maison", itemId: "chunk-a-la-maison" },
      ],
      tts: true,
    },
  },


  {
    id: "s02-insight-je-vais-frozen",
    type: "insight-card",
    targetItemIds: ["chunk-je-vais"],
    payload: {
      insightType: "grammar-nugget",
      title: "Take it whole.",
      body:
        "Je vais = I'm going. Like je suis, it is one solid piece. The destination is one piece too, and French picks one of three shapes to carry it: au for some places, à la for others, à l' before a vowel sound. There is no rule you can hear your way to, so take each destination whole, the way you took un café. The shape belongs to the PLACE and never changes.",
      examples: [
        { fr: "Je vais à la maison.", en: "I'm going home." },
        { fr: "Je vais au café.", en: "I'm going to the café." },
        { fr: "Je vais à l'hôtel.", en: "I'm going to the hotel." },
      ],
    },
  },

  activityChain({
    id: "s31-chain-where-you-are-going",
    intro:
      "Two places, and the shapes they arrived with. You are not choosing the shape; you are learning which one each place already carries.",
    steps: [
      {
        id: "s31a-fill-which-shape",
        type: "fill-with-traps",
        targetItemIds: ["chunk-a-la-gare"],
        payload: {
          prompt: "The station takes one of the three shapes. Which one?",
          sentenceBefore: "Je vais ",
          sentenceAfter: " gare.",
          blankCount: 1,
          options: [
            { id: "a", text: "à la", isCorrect: true },
            {
              id: "b",
              text: "au",
              isCorrect: false,
              trapReason: "Au is the shape for café, travail and restaurant. Gare does not take it.",
            },
            {
              id: "c",
              text: "à l'",
              isCorrect: false,
              trapReason: "À l' is for places that start with a vowel sound, like hôtel.",
            },
          ],
          answer: ["a"],
          reveal: {
            short: "à la",
            explanation:
              "Je vais à la gare. The station carries à la, the same shape as à la maison.",
          },
        },
      },
      {
        // EASY on the locked ladder: the exact meaning is stated, because this
        // is the first destination the learner produces that is not the one the
        // lesson opened with.
        id: "s31b-weave-going-to-the-cafe",
        type: "weave",
        targetItemIds: ["chunk-je-vais", "chunk-au-cafe"],
        evidenceTargetItemIds: ["chunk-au-cafe"],
        payload: {
          weaveType: "supported",
          prompt: "Write it in French: I'm going to the café.",
          context: "You are putting your coat on and someone asks what you are up to.",
          suggestedPieces: [
            { text: "au café", itemId: "chunk-au-cafe", label: "the place, whole" },
          ],
          expectedAnswers: ["Je vais au café."],
          acceptedAlternatives: ["Je vais au cafe.", "Je vais au café"],
          hintCloze: "Je vais ___ café.",
          reveal: {
            modelAnswer: "Je vais au café.",
            ifCorrect:
              "That is the whole move: the engine, then the place with its own shape attached.",
            ifCorrectButFlat: "Right. Café keeps au wherever it goes: je vais au café.",
            ifUnderstandableButWrong:
              "Your meaning lands. Café takes au, so it is je vais au café.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),

  activityChain({
    id: "s22-chain-heading-off",
    intro:
      "Leaving has two halves: saying where you are going, and closing the room behind you.",
    steps: [
      {
        id: "s03-fill-je-vais-blank",
        type: "fill-with-traps",
        targetItemIds: ["chunk-je-vais"],
        payload: {
          prompt: "You are leaving for home. Which word moves you?",
          sentenceBefore: "Je ",
          sentenceAfter: " à la maison.",
          blankCount: 1,
          options: [
            { id: "opt-vais", text: "vais", isCorrect: true },
            {
              id: "opt-suis",
              text: "suis",
              isCorrect: false,
              trapReason:
                "Je suis says where you are. Je vais says where you're heading.",
            },
            {
              id: "opt-voudrais",
              text: "voudrais",
              isCorrect: false,
              trapReason:
                "Je voudrais asks for something. It doesn't take you anywhere.",
            },
          ],
          answer: ["opt-vais"],
          reveal: {
            short: "vais",
            explanation: "Je vais = I'm going. The moving engine.",
            natural: "Je vais à la maison.",
          },
        },
      },
      {
        id: "s04-weave-heading-home",
        type: "weave",
        targetItemIds: ["chunk-je-vais", "chunk-a-la-maison"],
        payload: {
          // First production of a brand-new engine: mid keeps a little more help
          // than the rest of the lesson, and it fades at the very next weave.
          weaveType: "mid",
          prompt: "Say you're going home.",
          context: "The evening is winding down. Let them know where you're heading.",
          suggestedPieces: [
            { text: "je vais", itemId: "chunk-je-vais", required: true, label: "I'm going" },
            {
              text: "à la maison",
              itemId: "chunk-a-la-maison",
              required: true,
              label: "home",
            },
          ],
          hintCloze: "Je vais ___.",
          expectedAnswers: ["Je vais à la maison."],
          reveal: {
            modelAnswer: "Je vais à la maison.",
            ifCorrect: "One engine, one destination. That's the whole sentence.",
            ifCorrectButFlat: "Right. The period closes the moment.",
            ifUnderstandableButWrong:
              "Your meaning lands. The destination stays one piece: à la maison.",
            ifMissingTargetPiece: "Start with je vais. That is the moving shape.",
          },
          validationMode: "exact-or-alternative",
        },
      },
      {
        // Contrast before the harder close: the destination is ONE package, so the
        // learner does not arrive at the two-sentence weave still splitting it.
        id: "s08-fill-destination-package",
        type: "fill-with-traps",
        targetItemIds: ["chunk-a-la-maison"],
        payload: {
          prompt: "You are naming where you're heading. Which piece says home?",
          sentenceBefore: "Je vais ",
          sentenceAfter: ".",
          blankCount: 1,
          options: [
            { id: "opt-a-la-maison", text: "à la maison", isCorrect: true },
            {
              id: "opt-maison",
              text: "maison",
              isCorrect: false,
              trapReason:
                "Maison on its own is just the word for house. The piece travels with its little words: à la maison.",
            },
            {
              id: "opt-a-la",
              text: "à la",
              isCorrect: false,
              trapReason:
                "À la opens the piece but never lands it. Keep it whole: à la maison.",
            },
          ],
          answer: ["opt-a-la-maison"],
          reveal: {
            short: "à la maison",
            explanation:
              "À la maison is one piece: home. Take it whole and it always fits.",
            natural: "Je vais à la maison.",
          },
        },
      },
      {
        id: "s05-weave-close-the-moment",
        type: "weave",
        targetItemIds: ["chunk-je-vais", "chunk-a-la-maison"],
        payload: {
          // Support fades inside the lesson: the scene carries the task, the pieces
          // stay behind the hint button, and the cloze holds only the shape.
          weaveType: "context",
          prompt: "Say you're going home, then say goodbye.",
          context: "You're at the door. Close it the way you did before.",
          suggestedPieces: [
            { text: "je vais", itemId: "chunk-je-vais", label: "I'm going" },
            {
              text: "à la maison",
              itemId: "chunk-a-la-maison",
              label: "home",
            },
            {
              text: "au revoir",
              itemId: "chunk-au-revoir",
              label: "goodbye",
            },
          ],
          hintCloze: "Je vais ___. Au revoir.",
          expectedAnswers: ["Je vais à la maison. Au revoir."],
          acceptedAlternatives: ["Je vais à la maison, au revoir."],
          reveal: {
            modelAnswer: "Je vais à la maison. Au revoir.",
            ifCorrect: "You opened moments before. Now you can close them and leave.",
            ifCorrectButFlat: "Right. Two short sentences, calm and complete.",
            ifUnderstandableButWrong:
              "Your meaning lands. The direction comes first, then the goodbye.",
            ifMissingTargetPiece:
              "Lead with je vais à la maison, then let au revoir close the door.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),


  {
    // Reveal after the lesson's real production: the same close, heard the way
    // it usually lands, plus the shorter form.
    id: "s09-reveal-the-close",
    type: "natural-reveal",
    payload: {
      modelAnswer: "Je vais à la maison. Au revoir.",
      // A comma in place of a full stop is not a second way to say this. It is
      // the same sentence, and offering it as an alternative taught the learner
      // that punctuation is where naturalness lives. The real alternative is a
      // different REASON for leaving, which L7 also owns: destination or
      // obligation. The rhythm point is true and now sits in the Sound layer.
      naturalAlternatives: ["Désolé, je dois partir. Au revoir."],
      explanation:
        "Both are natural, and they say different things. Je vais à la maison tells them where you are going. Désolé, je dois partir tells them you have no choice, which is the kinder one when you are leaving early.",
    },
  },


  {
    // Reflection on what the learner just did, and the last encounter before
    // the closing chain, which asks them to PRODUCE "Merci beaucoup, bonne
    // soirée !" and "Désolé, je dois partir." Until now beaucoup and désolé
    // appeared only as lines in the Showcase, which is a breadth surface: it
    // grades nothing and teaches nothing, so neither word had had a fair
    // encounter before it was required output. They get one here, attached to
    // things already owned, without costing the lesson a screen -- L7 is at the
    // top of its action budget and a sixteenth screen would break it.
    id: "s10-insight-leaving-two-moves",
    type: "insight-card",
    targetItemIds: ["chunk-je-vais"],
    payload: {
      insightType: "culture-bite",
      title: "Leaving is two small moves.",
      body:
        "Say where you're heading, then close the door with a word. That is all a French goodbye needs. The same two moves work whether you are leaving a room, a shop, or a long afternoon. Two small words size the moment: beaucoup makes the thanks bigger, and désolé opens an exit that comes earlier than people hoped.",
      examples: [
        { fr: "Je vais à la maison.", en: "I'm going home." },
        { fr: "Au revoir.", en: "Goodbye." },
        {
          fr: "Merci beaucoup.",
          en: "Thank you very much.",
          note: "Beaucoup is for when they actually did something. Merci on its own is for the small courtesies.",
        },
        {
          fr: "Désolé, je dois partir.",
          en: "Sorry, I have to go.",
          note: "Désolé is the apology that goes in front of an early exit. Without it, leaving first can read as leaving in a mood.",
        },
      ],
    },
  },

  activityChain({
    id: "s32-chain-closing-well",
    intro:
      "A French goodbye usually has two parts: the thanks, and a word about the hours ahead of them. Leaving early has two parts too, and the first one is an apology.",
    steps: [
      {
        // MEDIUM on the locked ladder: the communicative intention is named,
        // the wording is not.
        id: "s32a-weave-thanks-and-evening",
        type: "weave",
        targetItemIds: ["chunk-merci-beaucoup", "chunk-bonne-soiree"],
        payload: {
          weaveType: "mid",
          prompt: "Thank them warmly, then wish them a good evening.",
          context: "They stayed late to sort your problem out, and it is nearly dark outside.",
          suggestedPieces: [
            { text: "merci beaucoup", itemId: "chunk-merci-beaucoup", label: "warm thanks" },
            { text: "bonne soirée", itemId: "chunk-bonne-soiree", label: "the evening one" },
          ],
          expectedAnswers: ["Merci beaucoup, bonne soirée !"],
          acceptedAlternatives: [
            "Merci beaucoup, bonne soirée.",
            "Merci beaucoup bonne soirée",
            "Merci beaucoup, bonne soiree !",
          ],
          hintCloze: "Merci ___, bonne ___ !",
          reveal: {
            modelAnswer: "Merci beaucoup, bonne soirée !",
            ifCorrect: "That is the warm close: the thanks, then the hours ahead of them.",
            ifCorrectButFlat:
              "Right. Bonne soirée is the one for an evening that has not happened yet.",
            ifUnderstandableButWrong:
              "Your meaning lands. The evening one is bonne soirée: merci beaucoup, bonne soirée !",
          },
          validationMode: "exact-or-alternative",
        },
      },
      {
        id: "s32b-weave-sorry-must-go",
        type: "weave",
        targetItemIds: ["chunk-desole", "chunk-je-dois-partir"],
        payload: {
          weaveType: "mid",
          prompt: "Apologise, then say you have to go.",
          context: "The meeting has run long and your train will not wait.",
          suggestedPieces: [
            { text: "désolé", itemId: "chunk-desole", label: "the apology" },
            { text: "je dois partir", itemId: "chunk-je-dois-partir", label: "the reason, whole" },
          ],
          expectedAnswers: ["Désolé, je dois partir."],
          acceptedAlternatives: [
            "Desole, je dois partir.",
            "Désolé je dois partir",
            "Désolée, je dois partir.",
          ],
          hintCloze: "___, je dois ___.",
          reveal: {
            modelAnswer: "Désolé, je dois partir.",
            ifCorrect:
              "Je dois partir puts the reason outside your own wish, which is what makes leaving early polite.",
            ifCorrectButFlat: "Right. Désolé softens the leaving before it lands.",
            ifUnderstandableButWrong: "Your meaning lands. The pair is désolé, je dois partir.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),

  activityChain({
    id: "s23-chain-caught-in-the-doorway",
    intro:
      "You are already half gone. This is the part where somebody notices and speaks to you anyway.",
    steps: [
      {
        // L7's job is the LESS PREDICTABLE moment, so the lesson stops rehearsing
        // its own script here. Nothing has asked the learner to leave; they are
        // offered something instead, and the leaving line only fits if they read
        // the situation rather than the pattern. Whole-sentence choice, not a word
        // blank: the other two fills in this lesson pick a word, this one picks an
        // intention.
        id: "s11-fill-offer-on-the-way-out",
        type: "fill-with-traps",
        targetItemIds: ["chunk-non-merci", "chunk-je-vais"],
        weakPointTags: ["politeness"],
        payload: {
          prompt:
            "Your coat is on. They hold up the pot and offer you one more coffee. You would rather get going.",
          blankCount: 1,
          options: [
            { id: "opt-decline-go", text: "Non merci. Je vais à la maison.", isCorrect: true },
            {
              id: "opt-accept",
              text: "Oui merci. Je vais à la maison.",
              isCorrect: false,
              trapReason:
                "Oui merci accepts the coffee. You have just agreed to stay and announced you are leaving.",
            },
            {
              id: "opt-not-followed",
              text: "Non merci. Je suis à la maison.",
              isCorrect: false,
              trapReason:
                "Je suis is where you ARE, and you are standing right here. Going somewhere takes je vais.",
            },
          ],
          answer: ["opt-decline-go"],
          reveal: {
            short: "Non merci. Je vais à la maison.",
            explanation:
              "Turn it down, then say where you are going. The refusal alone can hang; the direction closes it.",
            natural: "Non merci. Je vais à la maison.",
          },
        },
      },
      {
        // The lesson's summit, and its least-scaffolded screen: no chip is marked
        // required, the cloze holds only the join, and the learner supplies both
        // halves. This is where L7 stops being one engine drilled and becomes a
        // small decision made out loud.
        // The step before this one hands over "Non merci. Je vais à la maison."
        // as a clickable option. Asking for that same sentence here would
        // measure copying and call it the lesson's summit. The MOVE is what was
        // taught, so the move is what is asked for, with the destination
        // changed: the learner has to run the shape rather than repeat the line.
        id: "s12-weave-decline-and-go",
        type: "weave",
        targetItemIds: ["chunk-non-merci", "chunk-je-vais", "chunk-au-cafe"],
        weakPointTags: ["politeness", "natural-speech"],
        payload: {
          weaveType: "open",
          prompt: "Turn the offer down, then say where you are actually going.",
          context:
            "They are still holding the pot. You are meeting someone in twenty minutes, and not here.",
          suggestedPieces: [
            { text: "non merci", itemId: "chunk-non-merci", label: "turning it down" },
            { text: "je vais", itemId: "chunk-je-vais", label: "I'm going" },
            { text: "au café", itemId: "chunk-au-cafe", label: "to the café" },
          ],
          hintCloze: "Non merci. ___.",
          expectedAnswers: ["Non merci. Je vais au café."],
          acceptedAlternatives: [
            "Non merci, je vais au café.",
            "Non merci. Je vais au café",
          ],
          reveal: {
            modelAnswer: "Non merci. Je vais au café.",
            ifCorrect:
              "Two moves, and neither one is rude. The destination is yours to change.",
            ifCorrectButFlat:
              "Right. Non merci softens it; the direction explains it.",
            ifUnderstandableButWrong:
              "Your meaning lands. Refuse first, then give the reason you are leaving.",
            ifMissingTargetPiece:
              "Non merci turns the offer down. Je vais au café says where instead.",
          },
          validationMode: "exact-or-alternative",
        },
      },
        {
          // Corpus closure. Leaving is something people are ASKED about, and L7 only
          // ever had the learner announce it unprompted. oui became producible in L3,
          // so the departure can now be an answer as well as a statement.
          id: "s13-fill-are-you-off",
          type: "fill-with-traps",
          targetItemIds: ["chunk-oui", "chunk-je-vais"],
          weakPointTags: ["natural-speech"],
          payload: {
            prompt:
              "They see you reaching for your coat and ask whether you are heading off. You are.",
            blankCount: 1,
            options: [
              { id: "opt-oui-maison", text: "Oui, je vais à la maison.", isCorrect: true },
              {
                id: "opt-non-merci",
                text: "Non, je vais à la maison.",
                isCorrect: false,
                trapReason:
                  "That turns down an offer. They did not offer you anything; they asked a question.",
              },
              {
                id: "opt-suis-ici",
                text: "Oui, je suis à la maison.",
                isCorrect: false,
                trapReason:
                  "That says where you are. They can see where you are; they asked where you are going.",
              },
            ],
            answer: ["opt-oui-maison"],
            reveal: {
              short: "Oui, je vais à la maison.",
              explanation:
                "Yes, and then where. The engine does the second half; oui just opens the door for it.",
              natural: "Oui, je vais à la maison.",
            },
          },
        },
        {
          // FRENCH-CONTEXT production. The scene is a line the learner owns, said to
          // them, and the English helper states only their intention.
          // Same repair as s12: the step before hands over "Oui, je vais a la
          // maison." as an option, so asking for it here would be copying. The
          // learner answers yes and gives the OTHER reason L7 owns, which is
          // also the kinder one when you are leaving before the end.
          id: "s14-weave-answer-and-leave",
          type: "weave",
          targetItemIds: ["chunk-oui", "chunk-je-dois-partir"],
          weakPointTags: ["natural-speech"],
          payload: {
            weaveType: "open",
            prompt: "Answer them, and say it is not your choice.",
            context: "Someone catches your eye on the way out: « Au revoir ? » You are leaving, and earlier than you wanted to.",
            suggestedPieces: [
              { text: "oui", itemId: "chunk-oui", label: "the answer" },
              { text: "je dois partir", itemId: "chunk-je-dois-partir", label: "I have to go" },
            ],
            hintCloze: "Oui, ___.",
            expectedAnswers: ["Oui, je dois partir."],
            acceptedAlternatives: ["Oui. Je dois partir.", "Oui, je dois partir"],
            reveal: {
              modelAnswer: "Oui, je dois partir.",
              ifCorrect: "Asked in French, answered in French, with the reason attached.",
              ifCorrectButFlat: "Right. The yes alone would have been thinner.",
              ifUnderstandableButWrong:
                "Your meaning lands. Answer, then say that you have to go.",
              ifMissingTargetPiece: "Oui answers. Je dois partir says it is not your choice.",
            },
            validationMode: "exact-or-alternative",
          },
        },
    ],
  }),


  {
    id: "s06-sayit-take-your-leave",
    type: "say-it-your-way",
    targetItemIds: ["chunk-je-vais", "chunk-a-la-maison"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "The small gathering is ending. People are picking up their coats. Take your leave.",
      communicativeGoal: "Close the moment and say where you're heading.",
      suggestedPieces: [
        { text: "merci", itemId: "chunk-merci" },
        { text: "je vais", itemId: "chunk-je-vais" },
        { text: "à la maison", itemId: "chunk-a-la-maison" },
        { text: "au revoir", itemId: "chunk-au-revoir" },
      ],
      modelAnswer: "Merci. Je vais à la maison. Au revoir.",
      reveal: {
        modelAnswer: "Merci. Je vais à la maison. Au revoir.",
        naturalAlternatives: ["Je vais à la maison. Au revoir."],
        explanation:
          "Both are natural. Merci thanks the moment; je vais à la maison says where you're off to; au revoir closes the door gently.",
      },
      validationMode: "model-answer-only",
    },
  },


  {
    id: "s07-recap-heading-home",
    type: "recap",
    payload: {
      title: "You can leave well.",
      lines: [
        "You said where you're heading.",
        "You closed a whole moment: thanks, direction, goodbye.",
        "Je vais stayed one solid piece the whole way.",
      ],
      piecesUsed: ["je vais", "à la maison", "Merci", "Au revoir"],
      nextLabel: "Continue",
    },
  },
];

export const lesson007: Lesson = {
  id: "v1-lesson-007",
  version: "v1",
  number: 7,
  title: "Je vais",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "architecture-verb",
  journeyRole: "doorway",
  // A doorway may declare at most two new active production demands, and L7
  // declared one. The second is `chunk-au-cafe`: without a destination the
  // learner owns outright, "je vais ..." is one memorised address rather than a
  // shape with somewhere to put a place, and s31b asks for it with nothing but
  // an optional hint. Everything else this lesson introduces stays supported
  // material, which the band deliberately excludes.
  acquisitionDemandItemIds: ["chunk-je-vais", "chunk-au-cafe"],
  estimatedMinutes: 8,
  canDo: "Say you're heading home, and close the moment.",
  whyItExists:
    "L6 closed the arrival arc at au revoir. L7 is the frozen-chunk doorway that adds the leaving direction: je vais + à la maison, taken whole. Per the accepted compact doorway spec, this is deliberately NOT the aller/movement lesson: no paradigm, no à/au/à la system, no futur proche. It exists so leaving feels as natural as arriving did.",
  prerequisites: ["v1-lesson-006"],
  learningItems: getItems([
    // The two destination shapes, as identities the learner can be told about.
    // Recognition only, and deliberately NOT listed as acquisitionComponents of
    // chunk-au-cafe / chunk-a-la-maison: L7 owns those destinations whole and
    // says so on s04, and the registry's own rule is that a component identity
    // created later does not rewrite authored ownership. These exist so the
    // Showcase depth layer can explain why the two shapes differ.
    "prep-au",
    "prep-a-la",
    "chunk-je-vais",
    "chunk-a-la-maison",
    // L7 production pass. Declared because the lesson now WORKS these: a target
    // whose treatment the lesson cannot state throws out of `recordExposure`
    // and makes the lesson unplayable from that screen on.
    "chunk-au-cafe",
    "chunk-a-la-gare",
    "chunk-merci-beaucoup",
    "chunk-bonne-soiree",
    "chunk-desole",
    "chunk-je-dois-partir",
    // Shown in the Showcase and never asked for. Declared so the lesson can
    // state a treatment for its OWN language rather than leaving thirteen
    // items it introduces unaccounted for. Declaring is not teaching: none of
    // these is a demand, none is practisable, and the Showcase emits no
    // evidence, so nothing here reaches a learner as owned language.
    "chunk-au-travail",
    "chunk-au-restaurant",
    "chunk-a-l-hotel",
    "chunk-bonne-journee",
    "chunk-a-demain",
    "chunk-a-bientot",
    "chunk-a-tout-a-l-heure",
    "chunk-je-pars",
    "chunk-une-autre-fois",
    "chunk-peut-etre",
    "adverb-maintenant",
    "adverb-plus-tard",
    "adverb-ce-soir",
    "adverb-demain",
    // The reply side of leaving, and the two lighter apologies. Exposure only.
    "chunk-de-rien",
    "chunk-encore-merci",
    "chunk-bonne-nuit",
    "chunk-bon-week-end",
    "chunk-bon-voyage",
    "chunk-au-revoir",
    "chunk-merci",
    // Recycled from L3 for the founder-usable pass, never re-taught: the
    // unexpected offer (s11) and the open summit (s12) need a refusal the
    // learner already owns. It is a target on both screens, so the lesson must
    // be able to state its treatment. acquisitionDemandItemIds stays
    // exactly ["chunk-je-vais"] — this is recycling, not a second demand.
    "chunk-non-merci",
    // Corpus closure: L3's answer word, recycled so leaving can be an ANSWER
    // and not only an announcement. Never re-taught, never a demand.
    "chunk-oui",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Follows docs/syllabus/L07-compact-doorway.compact-spec.md exactly: two new items only (chunk-je-vais active, chunk-a-la-maison supported), frozen chunks, no conjugation.",
    "Strict out-of-scope honored: no aller paradigm, no à/au/à la rule, no futur proche, no y, no où, no new destinations.",
    "Progression: mid, then context, then open. Support fades WITHIN the lesson and the ceiling now MATCHES L6's open summit rather than sitting a tier below it — the founder-usable pass added s12 so the lesson ends on unsupplied production instead of its most scaffolded tier. No weave carries constitutive support, so evidence class is unchanged.",
    "Founder-usable expansion: L7's job is the less predictable moment. s11 and s12 stop rehearsing the leaving script and make the learner read a situation nobody set up for them — an offer arrives, and the lesson's line only fits if they choose it. Both recycle chunk-non-merci from L3; no new acquisition.",
    "Added screens carry one role each: s08 protects the à la maison package before the two-sentence close, s09 reveals how that close actually lands, s10 names the two-move shape after it has been used.",
    "Recycled load: chunk-au-revoir and chunk-merci as closers (carryover supports the target; the target line leads every model answer).",
    "chunk-je-suis and chunk-je-voudrais appear only as fill traps, not production targets.",
    "No learner-facing lesson numbers: the s05 callback points at the learner's own earlier moment, not at a lesson index.",
    "No XP / streak / level-up / mission copy. SayIt is deterministic model-answer-only.",
    "Learner-visible: Home lists L1-L24 under a linear unlock (app/(tabs)/index.tsx filters number 1..24), so this lesson opens once L6 is finished. The older note here claimed Home capped the path at L6; that stopped being true when the visible range moved, and it was corrected during native verification of this path.",
  ],
  qaChecks: [
    "TTS reads Je vais à la maison and the two-sentence close cleanly.",
    "s03 trap reasons fire on suis and voudrais.",
    "s08 trap reasons fire on maison and à la.",
    "s05 accepts the comma variant via acceptedAlternatives.",
    "Recap chips are atomic or approved chunks (à la maison is a frozen package, not a sentence).",
    "No streak/XP/mission language anywhere.",
  ],
};
