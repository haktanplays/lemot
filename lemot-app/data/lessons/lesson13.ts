import type { Lesson } from "@/lib/types";

export const lesson13: Lesson = {
  id: 13,
  title: "Asking Questions II",
  sub: "Who, what, why, how many",
  icon: "MessageCircleQuestion",
  level: "A1",
  difficulty: "hard",
  grammar: {
    title: "Advanced Questions in French",
    sections: [
      {
        type: "intro",
        text: "In L7 you learned *où* (where), *quand* (when), and *comment* (how). Now meet the rest of the question family: *qui* (who), *que/quoi* (what), *pourquoi* (why), *combien* (how much/many). Plus: formal inversion questions.",
      },
      {
        type: "block",
        label: "Remaining Question Words",
        items: [
          {
            fr: "Qui ?",
            en: "Who?",
            note: "Qui est-ce ? = Who is it? Qui parle ? = Who's speaking?",
          },
          {
            fr: "Que / Quoi ?",
            en: "What?",
            note: "Que before verb: Que fais-tu ? Quoi at end: Tu fais quoi ? Same meaning, different register.",
          },
          {
            fr: "Pourquoi ?",
            en: "Why?",
            note: "Pourquoi = pour (for) + quoi (what). Literally 'for what?'",
          },
          {
            fr: "Combien ?",
            en: "How much/many?",
            note: "Combien ça coûte ? (How much does it cost?) Combien de frères ? (How many brothers?)",
          },
        ],
      },
      {
        type: "block",
        label: "Inversion Questions (Formal)",
        items: [
          {
            fr: "Avez-vous... ?",
            en: "Do you have...? (formal)",
            note: "Verb-subject flip. Hyphen required. Written/formal French.",
          },
          {
            fr: "Parlez-vous français ?",
            en: "Do you speak French? (formal)",
            note: "Very polite. Great for first meetings and formal situations.",
          },
          {
            fr: "Pouvez-vous m'aider ?",
            en: "Can you help me? (formal)",
            note: "Pouvez-vous = can you. Very useful in shops and offices.",
          },
        ],
      },
      {
        type: "tip",
        text: "Inversion adds a *-t-* between two vowels for sound: *A-t-il faim ?* (Is he hungry?). The 't' has no meaning — it just prevents the vowel collision *a-il*.",
      },
      {
        type: "block",
        label: "Pourquoi → Parce que",
        items: [
          {
            fr: "Parce que...",
            en: "Because...",
            note: "Pourquoi tu apprends le français ? — Parce que j'aime la France ! These two are an inseparable pair.",
          },
          {
            fr: "Parce qu'il...",
            en: "Because he...",
            note: "Parce que + il = parce qu'il. Elision before vowels!",
          },
        ],
      },
      {
        type: "etymology",
        pairs: [
          {
            fr: "pourquoi",
            en: "for what",
            root: "Pour (for) + quoi (what) = 'for what reason?' English 'why' has no such transparency.",
          },
          {
            fr: "combien",
            en: "how much",
            root: "Latin 'quam bene' (how well) → French combien. Evolved to mean 'how much/many.'",
          },
        ],
      },
      {
        type: "culture",
        text: "In casual French, people rarely use inversion. 'Tu as faim ?' beats 'As-tu faim ?' But in emails, job interviews, and with strangers, inversion shows respect. Master both registers.",
      },
    ],
    quickRecall: {
      q: "How do you say 'Why?'",
      a: "Pourquoi ?",
      o: ["Pourquoi ?", "Comment ?", "Combien ?", "Quand ?"],
    },
  },
  examples: [
    {
      fr: "Qui est-ce ?",
      en: "Who is it?",
      bridge: "Who est-ce?",
    },
    {
      fr: "Que fais-tu ce soir ?",
      en: "What are you doing tonight?",
      bridge: "What fais-tu ce soir?",
    },
    {
      fr: "Pourquoi tu apprends le français ?",
      en: "Why are you learning French?",
      bridge: "Why tu apprends le français?",
    },
    {
      fr: "Parce que j'aime la France.",
      en: "Because I love France.",
      bridge: "Because j'aime la France.",
    },
    {
      fr: "Combien ça coûte ?",
      en: "How much does it cost?",
      bridge: "How much ça coûte?",
    },
    {
      fr: "Combien de frères as-tu ?",
      en: "How many brothers do you have?",
      bridge: "How many de frères as-tu?",
    },
    {
      fr: "Avez-vous une table pour deux ?",
      en: "Do you have a table for two?",
      bridge: "Do you have une table pour deux?",
    },
    {
      fr: "Pouvez-vous répéter, s'il vous plaît ?",
      en: "Can you repeat, please?",
      bridge: "Can you répéter, s'il vous plaît?",
    },
  ],
  fillFG: [
    {
      s: "[___] are you learning French?",
      a: "Pourquoi",
      o: ["Pourquoi", "Comment", "Quand", "Combien"],
      ctx: "Why = pourquoi.",
    },
    {
      s: "[___] is it? (a person)",
      a: "Qui",
      o: ["Qui", "Que", "Quand", "Comment"],
      ctx: "Who = qui.",
    },
    {
      s: "[___] does it cost?",
      a: "Combien",
      o: ["Combien", "Comment", "Pourquoi", "Qui"],
      ctx: "How much = combien.",
    },
    {
      s: "I love France. [___] j'aime la France.",
      a: "Parce que",
      o: ["Parce que", "Pourquoi", "Comment", "Combien"],
      ctx: "Because = parce que.",
    },
    {
      s: "[___] are you doing? (formal)",
      a: "Que faites-vous",
      o: ["Que faites-vous", "Pourquoi allez-vous", "Qui êtes-vous", "Combien avez-vous"],
      ctx: "Formal inversion with 'what'.",
    },
  ],
  fillBlanks: [
    {
      s: "___ est-ce ?",
      a: "Qui",
      o: ["Qui", "Que", "Quand", "Comment"],
      ctx: "Who is it?",
    },
    {
      s: "___ tu apprends le français ?",
      a: "Pourquoi",
      o: ["Pourquoi", "Comment", "Quand", "Combien"],
      ctx: "Why are you learning French?",
    },
    {
      s: "___ ça coûte ?",
      a: "Combien",
      o: ["Combien", "Comment", "Pourquoi", "Qui"],
      ctx: "How much does it cost?",
    },
    {
      s: "___ j'aime la France.",
      a: "Parce que",
      o: ["Parce que", "Pourquoi", "Comment", "Quand"],
      ctx: "Because I love France.",
    },
    {
      s: "___-vous une table ?",
      a: "Avez",
      o: ["Avez", "Êtes", "Allez", "Faites"],
      ctx: "Do you have a table? (inversion)",
    },
  ],
  buildSentences: [
    {
      c: ["Pourquoi", "tu", "apprends", "le", "français", "?"],
      en: "Why are you learning French?",
      trap: ["Comment", "Quand"],
    },
    {
      c: ["Parce", "que", "j'aime", "la", "France"],
      en: "Because I love France.",
      trap: ["Comment", "Pourquoi"],
    },
    {
      c: ["Combien", "ça", "coûte", "?"],
      en: "How much does it cost?",
      trap: ["Comment", "Qui"],
    },
    {
      c: ["Avez", "-vous", "une", "table", "pour", "deux", "?"],
      en: "Do you have a table for two?",
      trap: ["Êtes", "Allez"],
    },
  ],
  quiz: [
    {
      q: "'Pourquoi' literally means...",
      a: "For what (pour + quoi)",
      o: [
        "For what (pour + quoi)",
        "How what",
        "When what",
        "Who what",
      ],
      ctx: "Pour = for, quoi = what.",
    },
    {
      q: "'Parce que' means...",
      a: "Because",
      o: ["Because", "Why", "How", "What for"],
    },
    {
      q: "'Combien de frères as-tu ?' asks about...",
      a: "The number of brothers",
      o: [
        "The number of brothers",
        "The name of brothers",
        "Where brothers live",
        "Why you have brothers",
      ],
    },
    {
      q: "Which is the formal way to ask 'Do you speak French?'",
      a: "Parlez-vous français ?",
      o: [
        "Parlez-vous français ?",
        "Tu parles français ?",
        "Est-ce que tu parles français ?",
        "Français, tu parles ?",
      ],
    },
    {
      q: "Why does 'A-t-il faim ?' have a '-t-'?",
      a: "To prevent a vowel collision (a-il)",
      o: [
        "To prevent a vowel collision (a-il)",
        "It means 'the'",
        "It changes the tense",
        "It makes it negative",
      ],
    },
    {
      q: "'Tu fais quoi ?' is the same as...",
      a: "Que fais-tu ?",
      o: [
        "Que fais-tu ?",
        "Qui es-tu ?",
        "Pourquoi fais-tu ?",
        "Comment fais-tu ?",
      ],
      ctx: "Both mean 'What are you doing?' — different registers.",
    },
    {
      q: "You're explaining something and need to rephrase. You say: 'Je suis fatigué, _______, j'ai besoin de dormir.'",
      a: "c'est-à-dire",
      o: ["c'est-à-dire", "au fait", "comment dire", "parce que"],
      ctx: "The expression meaning 'that is to say / I mean'.",
    },
    {
      q: "You suddenly remember something and change topic: '_______, tu fais quoi ce soir ?'",
      a: "Au fait",
      o: ["Au fait", "C'est-à-dire", "Comment dire", "Pourquoi"],
      ctx: "The expression meaning 'by the way'.",
    },
  ],
  combine: [
    {
      hint: "Why + learning French + because + love France → Ask and answer 'why'",
      answer:
        "Pourquoi tu apprends le français ? Parce que j'aime la France.",
      accept: [
        "pourquoi tu apprends le francais parce que j'aime la france",
        "pourquoi tu apprends le français ? parce que j'aime la france",
      ],
    },
    {
      hint: "How much + cost + table for two → Ask the price and request a table",
      answer: "Combien ça coûte ? Avez-vous une table pour deux ?",
      accept: [
        "combien ca coute avez-vous une table pour deux",
        "combien ça coûte ? avez-vous une table pour deux ?",
      ],
    },
    {
      hint: "Who + what tonight → Ask who someone is, then what they're doing tonight",
      answer: "Qui est-ce ? Tu fais quoi ce soir ?",
      accept: [
        "qui est-ce tu fais quoi ce soir",
        "qui est-ce ? tu fais quoi ce soir ?",
      ],
    },
  ],
  weave: [
    {
      en: "Why are you learning French? Because I love France. How many brothers do you have?",
      known: [
        "pourquoi",
        "tu",
        "apprends",
        "le",
        "français",
        "parce",
        "que",
        "j'aime",
        "la",
        "France",
        "combien",
        "de",
        "frères",
        "as",
      ],
      sample:
        "Pourquoi tu apprends le français? Parce que j'aime la France. Combien de frères as-tu?",
    },
    {
      en: "Who is it? Can you repeat please? Do you have a table for two?",
      known: [
        "qui",
        "est-ce",
        "pouvez",
        "vous",
        "répéter",
        "s'il",
        "plaît",
        "avez",
        "une",
        "table",
        "pour",
        "deux",
      ],
      sample:
        "Qui est-ce? Pouvez-vous répéter, s'il vous plaît? Avez-vous une table pour deux?",
    },
    {
      en: "What are you doing tonight? How much does it cost? Because it's expensive.",
      known: [
        "tu",
        "fais",
        "quoi",
        "ce",
        "soir",
        "combien",
        "ça",
        "coûte",
        "parce",
        "que",
        "c'est",
        "cher",
      ],
      sample:
        "Tu fais quoi ce soir? Combien ça coûte? Parce que c'est cher.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Pourquoi tu apprends le français ? Parce que j'aime voyager.",
      q: "Why is this person learning French?",
      a: "Because they love traveling",
      o: [
        "Because they love traveling",
        "Because they love France",
        "Because they need it for work",
        "Because their family is French",
      ],
    },
    {
      type: "odd",
      q: "Which is NOT a question word?",
      items: ["pourquoi", "combien", "parce que", "qui"],
      a: "parce que",
      reason:
        "Parce que means 'because' — it's an answer, not a question.",
    },
    {
      type: "context",
      situation: "You're at a restaurant and want to know the price.",
      a: "Combien ça coûte ?",
      o: [
        "Combien ça coûte ?",
        "Qui est-ce ?",
        "Pourquoi ça coûte ?",
        "Que coûte ?",
      ],
    },
    {
      type: "fill_ctx",
      s: "Je ___ au restaurant ce soir. (Lesson 6 — aller)",
      a: "vais",
      o: ["vais", "suis", "ai", "vas"],
      ctx: "I'm going to the restaurant — aller.",
    },
    {
      type: "fill_ctx",
      s: "___ tu apprends le français ?",
      a: "Pourquoi",
      o: ["Pourquoi", "Comment", "Quand", "Combien"],
      ctx: "Why are you learning French?",
    },
    {
      type: "weave",
      en: "Why? Because I love France.",
      blanks: [
        { word: "Why", answer: "Pourquoi" },
        { word: "Because", answer: "Parce que" },
      ],
      full: "Pourquoi ? Parce que j'aime la France.",
    },
    {
      type: "context",
      situation:
        "You're searching for the right word in French and need to buy time.",
      a: "Comment dire...",
      o: [
        "Comment dire...",
        "C'est-à-dire",
        "Au fait",
        "Parce que",
      ],
    },
  ],
  sayIt: [
    {
      situation:
        "You meet someone at a party. Ask who they are, why they're learning French, and how many languages they speak.",
      target: [
        "qui",
        "pourquoi",
        "combien",
        "parce que",
        "français",
      ],
    },
    {
      situation:
        "You're at a formal reception. Politely ask if they speak French, if they have the time, and can they repeat.",
      target: ["parlez", "vous", "avez", "pouvez", "répéter"],
    },
  ],
  miniConv: {
    topic: "Asking questions to get to know someone",
    starter: "Bonjour ! Qui êtes-vous ? Pourquoi vous êtes ici ?",
  },
  expressions: [
    {
      fr: "C'est-à-dire",
      en: "That is to say / I mean",
      usage:
        "'Je suis fatigué, c'est-à-dire, j'ai besoin de dormir.'",
      literal: "That is to say",
    },
    {
      fr: "Au fait",
      en: "By the way",
      usage: "'Au fait, tu fais quoi ce soir ?'",
      literal: "At the fact",
    },
    {
      fr: "Comment dire...",
      en: "How do I say... / How to put it...",
      usage: "'C'est... comment dire... compliqué.'",
      literal: "How to say",
    },
  ],
  grammarNuggets: [
    {
      title: "Pourquoi/parce que are etymological pairs",
      insight:
        "'Pourquoi' = pour + quoi = 'for what.' 'Parce que' = par + ce que = 'by that which.' French Q&A pairs are linked: each question word tells you what kind of answer it expects. Pourquoi asks 'for what reason?' and parce que answers 'by this reason.'",
      example:
        "Pourquoi ? (for what?) → Parce que... (by that which...)",
    },
    {
      title:
        "Inversion = verb-subject flip, the formal register",
      insight:
        "Casual: 'Tu as faim ?' Formal: 'As-tu faim ?' The meaning is identical — only the social context changes. English used to have this: 'Have you hunger?' died out, but French kept both forms. Use inversion in emails, with strangers, and in formal settings.",
      example:
        "Casual: Tu viens ? / Formal: Viens-tu ? / Very formal: Viendrez-vous ?",
    },
  ],
  fauxAmis: [
    {
      fr: "qui",
      looksLike: "key",
      actualMeaning: "who",
      example:
        "Qui est-ce ? (Who is it?) — not 'Key is it?'",
    },
  ],
  cultureBite:
    "In casual French, 'Tu fais quoi ?' (quoi at the end) is far more common than 'Que fais-tu ?' (que at the start). The end-of-sentence quoi feels natural in speech. But in writing or formal contexts, use 'Que faites-vous ?' — it shows polish.",
  summary: [
    "Question words: qui (who), que/quoi (what), pourquoi (why), combien (how many)",
    "Pourquoi → parce que (why → because)",
    "Inversion questions: Avez-vous... ? Parlez-vous... ?",
    "Expression: c'est-à-dire, au fait, comment dire",
  ],
};
