import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    // L7's world is leaving: where you are going, and the handful of ways a
    // French goodbye actually closes. The lesson owns one destination; the rest
    // is here so "je vais ..." reads as a direction shape, not one address.
    id: "s20-showcase-leaving",
    type: "showcase",
    payload: {
      intro:
        "Leaving well is its own small skill in French. Say where you are heading, then close the door with a word.",
      clusters: [
        {
          label: "Where you are heading",
          sentences: [
            { fr: "Je vais à la maison.", en: "I'm going home.", role: "core", itemIds: ["chunk-je-vais", "chunk-a-la-maison"] },
            { fr: "Je vais au café.", en: "I'm going to the café.", role: "exposure" },
            { fr: "Je vais au travail.", en: "I'm going to work.", role: "exposure" },
            { fr: "Je dois partir.", en: "I have to go.", role: "exposure" },
          ],
        },
        {
          label: "Closing the moment",
          sentences: [
            { fr: "Je vais à la maison. Au revoir.", en: "I'm going home. Goodbye.", role: "core" },
            { fr: "Merci. Je vais à la maison. Au revoir.", en: "Thanks. I'm going home. Goodbye.", role: "core" },
            { fr: "Merci, au revoir.", en: "Thanks, goodbye.", role: "supported" },
            { fr: "Bonne soirée !", en: "Have a good evening!", role: "exposure" },
            { fr: "À demain !", en: "See you tomorrow!", role: "exposure" },
            { fr: "À bientôt !", en: "See you soon!", role: "exposure" },
          ],
        },
        {
          label: "Turning something down on the way out",
          sentences: [
            { fr: "Non merci. Je vais à la maison.", en: "No thanks. I'm going home.", role: "core" },
            { fr: "Non merci, ça va.", en: "No thanks, I'm fine.", role: "exposure" },
            { fr: "Une autre fois, peut-être.", en: "Another time, maybe.", role: "exposure" },
          ],
        },
        {
          label: "Being asked",
          sentences: [
            { fr: "Oui, je vais à la maison.", en: "Yes, I'm going home.", role: "core", itemIds: ["chunk-oui"] },
            { fr: "Vous partez ?", en: "Are you leaving?", role: "exposure" },
            { fr: "On y va ?", en: "Shall we go?", role: "exposure" },
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
        "Today: one new engine, je vais.\n" +
        "By the end: you can close a moment and say you're heading home.\n" +
        "Main pieces: je vais, à la maison.",
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
        "Je vais = I'm going. Like je suis, it is one solid piece. À la maison is one piece too: home. No rules to learn yet. The pieces do the work.",
      examples: [
        { fr: "Je vais.", en: "I'm heading off." },
        { fr: "Je vais à la maison.", en: "I'm going home." },
      ],
    },
  },
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
  {
    // Reveal after the lesson's real production: the same close, heard the way
    // it usually lands, plus the shorter form.
    id: "s09-reveal-the-close",
    type: "natural-reveal",
    payload: {
      modelAnswer: "Je vais à la maison. Au revoir.",
      naturalAlternatives: ["Je vais à la maison, au revoir."],
      explanation:
        "Both are natural. Two short sentences sound calm and finished; the comma version runs them together as one easy breath.",
    },
  },
  {
    // Reflection, not new material: names what the learner just did.
    id: "s10-insight-leaving-two-moves",
    type: "insight-card",
    targetItemIds: ["chunk-je-vais"],
    payload: {
      insightType: "culture-bite",
      title: "Leaving is two small moves.",
      body:
        "Say where you're heading, then close the door with a word. That is all a French goodbye needs. The same two moves work whether you are leaving a room, a shop, or a long afternoon.",
      examples: [
        { fr: "Je vais à la maison.", en: "I'm going home." },
        { fr: "Au revoir.", en: "Goodbye." },
      ],
    },
  },
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
          text: "Je voudrais un café.",
          isCorrect: false,
          trapReason:
            "That asks for the coffee. Polite, but now you are staying for it.",
        },
        {
          id: "opt-not-followed",
          text: "Je ne comprends pas.",
          isCorrect: false,
          trapReason:
            "You understood perfectly. That line says the opposite, and the offer just stays open.",
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
    id: "s12-weave-decline-and-go",
    type: "weave",
    targetItemIds: ["chunk-non-merci", "chunk-je-vais", "chunk-a-la-maison"],
    weakPointTags: ["politeness", "natural-speech"],
    payload: {
      weaveType: "open",
      prompt: "Turn the offer down, then say where you're heading.",
      context:
        "They are still holding the pot, waiting for an answer. Be kind about it and go.",
      suggestedPieces: [
        { text: "non merci", itemId: "chunk-non-merci", label: "turning it down" },
        { text: "je vais", itemId: "chunk-je-vais", label: "I'm going" },
        { text: "à la maison", itemId: "chunk-a-la-maison", label: "home" },
      ],
      hintCloze: "Non merci. ___.",
      expectedAnswers: ["Non merci. Je vais à la maison."],
      acceptedAlternatives: [
        "Non merci, je vais à la maison.",
        "Non merci. Je vais à la maison",
      ],
      reveal: {
        modelAnswer: "Non merci. Je vais à la maison.",
        ifCorrect:
          "Two moves, and neither one is rude. That is a whole refusal in French.",
        ifCorrectButFlat:
          "Right. Non merci softens it; the direction explains it.",
        ifUnderstandableButWrong:
          "Your meaning lands. Refuse first, then give the reason you are leaving.",
        ifMissingTargetPiece:
          "Non merci turns the offer down. Je vais à la maison says why.",
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
          text: "Non merci.",
          isCorrect: false,
          trapReason:
            "That turns down an offer. They did not offer you anything; they asked a question.",
        },
        {
          id: "opt-suis-ici",
          text: "Je suis ici.",
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
    id: "s14-weave-answer-and-leave",
    type: "weave",
    targetItemIds: ["chunk-oui", "chunk-je-vais", "chunk-a-la-maison"],
    weakPointTags: ["natural-speech"],
    payload: {
      weaveType: "open",
      prompt: "Answer them, then say where you are going.",
      context: "Someone catches your eye on the way out: « Au revoir ? » You are leaving.",
      suggestedPieces: [
        { text: "oui", itemId: "chunk-oui", label: "the answer" },
        { text: "je vais", itemId: "chunk-je-vais", label: "I'm going" },
        { text: "à la maison", itemId: "chunk-a-la-maison", label: "home" },
      ],
      hintCloze: "Oui, je vais ___.",
      expectedAnswers: ["Oui, je vais à la maison."],
      acceptedAlternatives: ["Oui. Je vais à la maison.", "Oui, je vais à la maison"],
      reveal: {
        modelAnswer: "Oui, je vais à la maison.",
        ifCorrect: "Asked in French, answered in French, with the direction attached.",
        ifCorrectButFlat: "Right. The yes alone would have been thinner.",
        ifUnderstandableButWrong:
          "Your meaning lands. Answer, then give the direction.",
        ifMissingTargetPiece: "Oui answers. Je vais à la maison says where.",
      },
      validationMode: "exact-or-alternative",
    },
  },
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
  acquisitionDemandItemIds: ["chunk-je-vais"],
  estimatedMinutes: 8,
  canDo: "Say you're heading home, and close the moment.",
  whyItExists:
    "L6 closed the arrival arc at au revoir. L7 is the frozen-chunk doorway that adds the leaving direction: je vais + à la maison, taken whole. Per the accepted compact doorway spec, this is deliberately NOT the aller/movement lesson: no paradigm, no à/au/à la system, no futur proche. It exists so leaving feels as natural as arriving did.",
  prerequisites: ["v1-lesson-006"],
  learningItems: getItems([
    "chunk-je-vais",
    "chunk-a-la-maison",
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
