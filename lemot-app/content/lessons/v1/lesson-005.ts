import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-un-une",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Little words, small packages",
      body:
        "Today: the little words that travel with a noun.\n" +
        "By the end: you can ask for and name things with the right little word.\n" +
        "Main pieces: un café, un thé, une question.",
    },
  },
  {
    id: "s00-meet-un-cafe",
    type: "meet-card",
    targetItemIds: ["chunk-un-cafe", "noun-cafe"],
    weakPointTags: ["articles"],
    payload: {
      fr: "un café",
      en: "a coffee",
      title: "Café comes with un.",
      highlights: [{ text: "un café", itemId: "chunk-un-cafe" }],
      tts: true,
    },
  },
  {
    id: "s03-fill-package-cafe",
    type: "fill-with-traps",
    targetItemIds: ["chunk-un-cafe"],
    weakPointTags: ["articles"],
    payload: {
      prompt: "Which little word travels with café?",
      sentenceAfter: "café.",
      blankCount: 1,
      options: [
        { id: "opt-un", text: "un", isCorrect: true },
        {
          id: "opt-une",
          text: "une",
          isCorrect: false,
          trapReason:
            "Café travels with un: un café. une goes with other words, like une question.",
        },
      ],
      answer: ["opt-un"],
      reveal: {
        short: "un",
        explanation: "Café travels with un: un café.",
        natural: "un café",
      },
    },
  },
  {
    id: "s01-meet-une-question",
    type: "meet-card",
    targetItemIds: ["chunk-une-question", "noun-question"],
    weakPointTags: ["articles"],
    payload: {
      fr: "une question",
      en: "a question",
      title: "Question comes with une.",
      highlights: [{ text: "une question", itemId: "chunk-une-question" }],
      tts: true,
    },
  },
  {
    id: "s04-fill-package-question",
    type: "fill-with-traps",
    targetItemIds: ["chunk-une-question"],
    weakPointTags: ["articles"],
    payload: {
      prompt: "You have something to ask. Which little word travels with question?",
      sentenceAfter: "question.",
      blankCount: 1,
      options: [
        { id: "opt-une", text: "une", isCorrect: true },
        {
          id: "opt-un",
          text: "un",
          isCorrect: false,
          trapReason:
            "Question travels with une: une question. un goes with café: un café.",
        },
      ],
      answer: ["opt-une"],
      reveal: {
        short: "une",
        explanation: "Question travels with une: une question.",
        natural: "une question",
      },
    },
  },
  {
    // Names the pattern before the fills that apply it. The founder-usable
    // pass interleaved the meets and fills around it, so no two screens of the
    // same family now sit next to each other in the first half of the lesson.
    id: "s02-insight-little-packages",
    type: "insight-card",
    targetItemIds: [
      "grammar-un-une-package",
      "chunk-un-cafe",
      "chunk-une-question",
    ],
    weakPointTags: ["articles"],
    payload: {
      insightType: "grammar-nugget",
      title: "Words come in small packages.",
      body:
        "Many French words travel with a little word in front. Café comes as " +
        "un café. Question comes as une question. Learn the package, not a " +
        "rule: un café, une question.",
      examples: [
        { fr: "un café", en: "a coffee" },
        { fr: "une question", en: "a question" },
        { fr: "Je voudrais un café.", en: "I would like a coffee." },
        { fr: "J'ai une question.", en: "I have a question." },
      ],
    },
  },
  {
    // Until this screen the un side of L5 had exactly one member, which makes
    // "package" look like a coin flip between two words rather than a property
    // a word carries. un thé is owned from L1, where the learner typed the whole
    // order, so nothing new arrives here: this is the second data point that
    // turns un café from a pair into a pattern.
    id: "s02b-fill-un-family",
    type: "fill-with-traps",
    targetItemIds: ["chunk-un-the", "chunk-un-cafe", "grammar-un-une-package"],
    evidenceTargetItemIds: ["chunk-un-the"],
    weakPointTags: ["articles"],
    payload: {
      prompt: "Tea, at the same counter you ordered from in your first lesson. Which package is it?",
      blankCount: 1,
      options: [
        { id: "opt-un-the", text: "un thé", isCorrect: true },
        {
          id: "opt-une-the",
          text: "une thé",
          isCorrect: false,
          trapReason:
            "Thé takes the same little word café takes. They travel together: un café, un thé.",
        },
        {
          id: "opt-bare-the",
          text: "thé",
          isCorrect: false,
          trapReason:
            "The little word is part of the package, not an extra you can drop: un thé.",
        },
      ],
      answer: ["opt-un-the"],
      reveal: {
        short: "un thé",
        explanation:
          "un is not the café word. It is the word that belongs to café and to thé both, and you learn it with them: un café, un thé.",
        natural: "un thé",
      },
    },
  },
  {
    id: "s05-weave-je-voudrais-un-cafe",
    type: "weave",
    targetItemIds: ["chunk-je-voudrais", "chunk-un-cafe"],
    weakPointTags: ["articles", "politeness"],
    payload: {
      weaveType: "context",
      prompt: "Write it in French: I would like a coffee.",
      context: "Order at the counter, with the right little word.",
      suggestedPieces: [
        { text: "je voudrais", itemId: "chunk-je-voudrais", required: true, label: "polite request" },
        { text: "un café", itemId: "chunk-un-cafe", required: true, label: "noun package" },
      ],
      expectedAnswers: ["Je voudrais un café."],
      reveal: {
        modelAnswer: "Je voudrais un café.",
        ifCorrect: "The package stayed together: un café.",
        ifCorrectButFlat: "Right. un café is one piece, the little word included.",
        ifUnderstandableButWrong:
          "Your meaning lands. Keep the package whole: un café.",
        ifMissingTargetPiece: "Add the little word: un café, not just café.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s04b-fill-choose-package",
    type: "fill-with-traps",
    targetItemIds: [
      "chunk-une-question",
      "chunk-un-cafe",
      "grammar-un-une-package",
    ],
    weakPointTags: ["articles"],
    payload: {
      prompt: "You have a question. Which French package fits?",
      blankCount: 1,
      options: [
        { id: "opt-une-question", text: "une question", isCorrect: true },
        {
          id: "opt-un-cafe",
          text: "un café",
          isCorrect: false,
          trapReason: "That is the coffee package, not the question package.",
        },
        {
          id: "opt-bare-question",
          text: "question",
          isCorrect: false,
          trapReason:
            "In French, the noun travels with its little word here: une question.",
        },
        {
          id: "opt-un-question",
          text: "un question",
          isCorrect: false,
          trapReason:
            "This package is not the one we use here. Keep it as: une question.",
        },
      ],
      answer: ["opt-une-question"],
      reveal: {
        short: "une question",
        explanation:
          "You are not choosing a loose word. You are choosing the package: une question. The same way, the coffee package is un café.",
        natural: "une question",
      },
    },
  },
  {
    id: "s06-weave-j-ai-une-question",
    type: "weave",
    targetItemIds: ["chunk-j-ai", "chunk-une-question"],
    weakPointTags: ["articles"],
    payload: {
      weaveType: "context",
      prompt: "Write it in French: I have a question.",
      context: "You want to ask something. Use the right little word.",
      suggestedPieces: [
        { text: "j'ai", itemId: "chunk-j-ai", required: true, label: "I have" },
        { text: "une question", itemId: "chunk-une-question", required: true, label: "noun package" },
      ],
      expectedAnswers: ["J'ai une question."],
      acceptedAlternatives: [
        "J ai une question.",
        "J ai une question",
        "j ai une question",
      ],
      reveal: {
        modelAnswer: "J'ai une question.",
        ifCorrect: "The other package: une question.",
        ifCorrectButFlat: "Right. une question is one piece too.",
        ifUnderstandableButWrong:
          "Your meaning lands. The little word travels with it: une question.",
        ifMissingTargetPiece: "Keep une with question: une question.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    // Both weaves above hand the package over in the tray, so the learner never
    // actually chooses one under their own power. This is the first screen in
    // L5 with no tray at all, and it needs BOTH packages in one moment, each
    // inside a different frame the learner already owns. Nothing new is asked
    // for; only the retrieval is unsupported.
    id: "s06b-weave-open-order-and-ask",
    type: "weave",
    targetItemIds: [
      "chunk-un-cafe",
      "chunk-une-question",
      "chunk-je-voudrais",
      "chunk-j-ai",
    ],
    evidenceTargetItemIds: ["chunk-un-cafe", "chunk-une-question"],
    weakPointTags: ["articles"],
    payload: {
      weaveType: "open",
      prompt: "Order your coffee, then say there is something you want to ask.",
      context:
        "You are at the counter and you also came with a question. Two short sentences, and each one carries a different package.",
      expectedAnswers: ["Je voudrais un café. J'ai une question."],
      acceptedAlternatives: [
        "Je voudrais un café, s'il vous plaît. J'ai une question.",
        "Je voudrais un café. J ai une question.",
        "Bonjour, je voudrais un café. J'ai une question.",
      ],
      reveal: {
        modelAnswer: "Je voudrais un café. J'ai une question.",
        ifCorrect:
          "Two packages, chosen by you: un with café, une with question.",
        ifCorrectButFlat:
          "Right. Each sentence brought its own little word along with it.",
        ifUnderstandableButWrong:
          "Your meaning lands. Each noun keeps the little word it travels with: un café, une question.",
        ifMissingTargetPiece:
          "Order first with je voudrais, then open the question with j'ai. Keep each package whole.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s07-sayit-ask-for-a-coffee",
    type: "say-it-your-way",
    targetItemIds: ["chunk-je-voudrais", "chunk-un-cafe"],
    weakPointTags: ["articles", "natural-speech"],
    payload: {
      situation:
        "You are at a counter and you want a coffee. Ask for it with the " +
        "right little word in front.",
      communicativeGoal: "Ask for an object, package included.",
      suggestedPieces: [
        { text: "je voudrais", itemId: "chunk-je-voudrais" },
        { text: "un café", itemId: "chunk-un-cafe" },
      ],
      modelAnswer: "Je voudrais un café.",
      reveal: {
        modelAnswer: "Je voudrais un café.",
        naturalAlternatives: ["Un café, s'il vous plaît."],
        explanation:
          "Both work. The little word un stays with café either way: un café.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    // Reflection, not a third insight card: L5 states the package rule at s02,
    // before any of it has been chosen under pressure. This looks back at three
    // packages the learner has now handled and says the one thing the rule
    // cannot say on its own, which is that there is nothing to work out.
    id: "s07b-natural-reveal-packages",
    type: "natural-reveal",
    targetItemIds: [
      "chunk-un-cafe",
      "chunk-un-the",
      "chunk-une-question",
      "grammar-un-une-package",
    ],
    weakPointTags: ["articles"],
    payload: {
      explanation:
        "Three packages, and none of them was a decision.\n" +
        "un came with café and it came with thé. une came with question. You did not work any of that out in the moment; you carried each little word along with the word it belongs to, which is exactly how French speakers hold them. When a new noun arrives later, you will meet it the same way: with its little word already attached.",
      naturalAlternatives: ["un café", "un thé", "une question"],
    },
  },
  {
    id: "s08-recap-packages",
    type: "recap",
    payload: {
      title: "The little words are yours now.",
      lines: [
        "Many French words come with a little word in front.",
        "You learned un café and une question, and you saw that un belongs to thé as well.",
        "You used them in real requests: je voudrais un café, j'ai une question.",
        "At the end you chose both packages yourself, with nothing offered.",
      ],
      piecesUsed: [
        "un café",
        "un thé",
        "une question",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson005: Lesson = {
  id: "v1-lesson-005",
  version: "v1",
  number: 5,
  title: "Un, une",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "chunk-natural-speech",
  journeyRole: "standard",
  acquisitionDemandItemIds: [
    "chunk-un-cafe",
    "chunk-une-question",
  ],
  estimatedMinutes: 5,
  canDo: "Ask for things with the right little word.",
  whyItExists:
    "Every request so far carried a little word: un café, s'il vous plaît; j'ai une question. L5 names what the learner has been using. un and une are taught as small packages that come with the word, not as a gender rule. Plurals, partitives, definite articles, and the gender system are deferred.",
  prerequisites: ["v1-lesson-004"],
  learningItems: getItems([
    "chunk-un-cafe",
    "chunk-une-question",
    "grammar-un-une-package",
    "noun-cafe",
    "noun-question",
    "chunk-je-voudrais",
    "chunk-j-ai",
    // Recycled from L1, never re-taught: the learner already ordered un thé
    // there. It is here as the SECOND member of the un family, which is what
    // turns "package" from a coin flip between two words into a property a word
    // carries. Supported status, not a demand: acquisitionDemandItemIds stays
    // exactly the two package chunks L5 owns.
    "chunk-un-the",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "L5 Training Pack lesson under the Training Content Factory contract. L5 maps to the slice-spec PR I. Owned core: un and une as noun packages (un café, une question).",
    "Package framing, not a rule: un café and une question are taught as whole units. No masculine/feminine table, no gender rule, no article taxonomy. Registry uses package chunks (chunk-un-cafe, chunk-une-question), not abstract article items, per the L3-L6 plan Q1.",
    "Frames are recycled, not re-taught: je voudrais un café (L1) and j'ai une question (L4) carry the packages. c'est is not introduced here.",
    "L5 follows the enumerated 9-screen shape from the L3-L6 content plan (meet x2, insight x1, fill x2, weave x2, say-it x1, recap). The plan header's '10 screens' is treated as an off-by-one note, not a reason to add a filler screen.",
    "Founder-usable pass (L1-L6): L5 read as an isolated article drill. The un side had one member, so un vs une was a coin flip, and both weaves handed the package over in the tray, so the learner never chose one under their own power. Three screens fix that without new vocabulary. s02b brings back L1's un thé as the second member of the un family. s06b is L5's only unsupplied production and needs both packages in one moment. s07b reflects on all three. The existing screens were also interleaved so meets, fills and weaves alternate instead of running in threes. No new item and no new demand: acquisitionDemandItemIds stays the two package chunks.",
    "s07b is a natural-reveal rather than a third insight card, so the reflection reads as looking back rather than as one more rule.",
    "le / la (definite articles) are deferred. The plan lists them as a recognition-light touch, but they add a second article concept and would need a new noun; deferring keeps L5 the lightest system lesson.",
    "Deferred: plural articles, partitives (du / de la / des), pas de, definite-article production, agreement systems, and broad noun-gender teaching beyond un café and une question.",
    "Tone stays polite and neutral throughout. SayIt is deterministic and model-answer-only, consistent with L0-L4.",
    "No XP / streak / level-up / mission copy.",
  ],
  qaChecks: [
    "TTS reads un café, une question, Je voudrais un café, and J'ai une question cleanly.",
    "Apostrophe normalization handles j'ai in s06; the unaccented cafe variant passes Weave.",
    "Casing variants pass Weave via accepted alternatives.",
    "s03 and s04 trap reasons fire on the opposite package (une for café, un for question).",
    "s02b fires the wrong-article and bare-noun traps, and TTS reads un thé cleanly.",
    "s06b shows no chip tray and accepts the two-sentence answer with or without s'il vous plaît, a leading Bonjour, and the unaccented J ai variant.",
    "s07b renders three packages, grades nothing, and no screen in L5 asks for a bare article on its own after s04.",
    "The un vs une contrast reads as a package choice, not a gender rule.",
    "No theatrical positivity tokens appear.",
  ],
};
