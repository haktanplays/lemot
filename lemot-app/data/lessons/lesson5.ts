import type { Lesson } from "@/lib/types";

export const lesson5: Lesson = {
  id: 5,
  title: "Le, La, Les",
  sub: "Every French noun has a gender",
  icon: "BookOpen",
  level: "A1",
  difficulty: "medium",
  grammar: {
    title: "French Articles — Le, La, Les, Un, Une, Des",
    sections: [
      {
        type: "intro",
        text: "Every French noun is either *masculine* or *feminine* — even tables and ideas. The article in front tells you the gender. English has one 'the'; French has *le, la, l', les*. English has 'a/an'; French has *un, une, des*. Master articles and you unlock the entire noun system.",
      },
      {
        type: "block",
        label: "Definite Articles — 'The'",
        items: [
          {
            fr: "le livre",
            en: "the book (masculine)",
            note: "'Le' goes before masculine nouns. Le café, le train, le film.",
          },
          {
            fr: "la maison",
            en: "the house (feminine)",
            note: "'La' goes before feminine nouns. La table, la rue, la France.",
          },
          {
            fr: "l'homme / l'école",
            en: "the man / the school",
            note: "Before a vowel or silent H, le/la become *l'*. This is called *elision*. L'ami (m), l'idée (f).",
          },
          {
            fr: "les enfants",
            en: "the children (plural)",
            note: "'Les' is used for ALL plurals — masculine or feminine. Les livres, les maisons, les amis.",
          },
        ],
      },
      {
        type: "block",
        label: "Indefinite Articles — 'A / Some'",
        items: [
          {
            fr: "un livre",
            en: "a book (masculine)",
            note: "'Un' = 'a' for masculine nouns. Un café, un ami, un problème.",
          },
          {
            fr: "une maison",
            en: "a house (feminine)",
            note: "'Une' = 'a' for feminine nouns. Une table, une idée, une femme.",
          },
          {
            fr: "des livres",
            en: "some books (plural)",
            note: "'Des' = 'some' for ALL plurals. English often drops 'some,' but French always uses 'des': J'ai des amis (I have friends).",
          },
        ],
      },
      {
        type: "block",
        label: "Gender Clues — Word Endings",
        items: [
          {
            fr: "-tion, -sion → feminine",
            en: "la nation, la télévision",
            note: "Almost all -tion/-sion words are feminine. Bonus: they're cognates! Nation, télévision, situation.",
          },
          {
            fr: "-ment → masculine",
            en: "le moment, le gouvernement",
            note: "Words ending in -ment are usually masculine. Also cognates: moment, apartment, document.",
          },
          {
            fr: "-eur → masculine",
            en: "le docteur, le professeur",
            note: "Most -eur words are masculine. Le bonheur (happiness), le moteur (motor).",
          },
          {
            fr: "-e → often feminine",
            en: "la table, la pomme",
            note: "Many words ending in -e are feminine, but there are exceptions: le livre, le monde. Use -e as a guess, not a rule.",
          },
        ],
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "les enfants",
            phonetic: "lay zahn-FAHN",
            ipa: "/le.z‿ɑ̃.fɑ̃/",
            notes:
              "Liaison: the 's' in 'les' links to the vowel in 'enfants' — you hear a 'z' sound between them.",
          },
          {
            fr: "l'homme",
            phonetic: "LUM",
            ipa: "/lɔm/",
            notes:
              "Elision: 'le' loses its 'e' before a vowel/H. You say 'lom', not 'luh om'.",
          },
          {
            fr: "une école",
            phonetic: "oon ay-KUL",
            ipa: "/yn e.kɔl/",
            notes:
              "'une' has the French 'u' sound — round your lips like 'oo' but say 'ee'. Not 'oon'.",
          },
        ],
      },
      {
        type: "etymology",
        pairs: [
          {
            fr: "article",
            en: "article",
            root: "Latin articulus (small joint/part). Articles are the small parts that join to nouns.",
          },
          {
            fr: "nation",
            en: "nation",
            root: "Latin natio. The -tion ending stayed feminine from Latin — a free gender clue for hundreds of words.",
          },
          {
            fr: "moment",
            en: "moment",
            root: "Latin momentum. The -ment ending kept masculine gender — another free clue.",
          },
        ],
      },
      {
        type: "culture",
        text: "Why does French have gendered nouns? Latin had three genders (masculine, feminine, neuter). French merged neuter into masculine, leaving two. There's no logic to it — 'la table' isn't feminine because tables are womanly. It's purely grammatical inheritance.",
      },
      {
        type: "tip",
        text: "Always learn a noun WITH its article: not 'maison = house' but '*la* maison = house.' Your brain will store the gender automatically if you always hear/see the article attached.",
      },
    ],
    quickRecall: {
      q: "What happens to 'le' or 'la' before a vowel?",
      a: "It becomes l' (elision)",
      o: ["It becomes l' (elision)", "It stays the same", "It becomes les", "It disappears"],
    },
  },
  examples: [
    {
      fr: "Le livre est sur la table.",
      en: "The book is on the table.",
      bridge: "Le book est sur la table.",
    },
    {
      fr: "J'ai une maison à Paris.",
      en: "I have a house in Paris.",
      bridge: "J'ai une house à Paris.",
    },
    {
      fr: "L'homme regarde l'école.",
      en: "The man is looking at the school.",
      bridge: "L'homme is looking at l'école.",
    },
    {
      fr: "Les enfants aiment les animaux.",
      en: "The children love animals.",
      bridge: "Les children aiment les animals.",
    },
    {
      fr: "C'est un bon restaurant.",
      en: "It's a good restaurant.",
      bridge: "C'est un good restaurant.",
    },
    {
      fr: "Elle a des amis en France.",
      en: "She has friends in France.",
      bridge: "Elle a des friends en France.",
    },
    {
      fr: "La situation est compliquée.",
      en: "The situation is complicated.",
      bridge: "La situation est complicated.",
    },
    {
      fr: "Un café et une baguette, s'il vous plaît.",
      en: "A coffee and a baguette, please.",
      bridge: "Un coffee et une baguette, please.",
    },
  ],
  fillFG: [
    {
      s: "[___] book is on the table.",
      a: "Le",
      o: ["Le", "La", "Les", "Un"],
      ctx: "'Livre' is masculine → le livre.",
    },
    {
      s: "I have [___] house in Paris.",
      a: "une",
      o: ["une", "un", "des", "la"],
      ctx: "'Maison' is feminine → une maison.",
    },
    {
      s: "[___] children love animals.",
      a: "Les",
      o: ["Les", "Le", "La", "Des"],
      ctx: "Plural → les enfants.",
    },
    {
      s: "She has [___] friends in France.",
      a: "des",
      o: ["des", "les", "un", "une"],
      ctx: "'Some' (plural indefinite) → des amis.",
    },
    {
      s: "[___] man is looking at the school.",
      a: "L'",
      o: ["L'", "Le", "La", "Un"],
      ctx: "Before a vowel or H, le/la → l'. L'homme.",
    },
  ],
  fillBlanks: [
    {
      s: "___ livre est sur la table.",
      a: "Le",
      o: ["Le", "La", "Les", "L'"],
      ctx: "'Livre' is masculine. The book.",
    },
    {
      s: "J'ai ___ maison à Paris.",
      a: "une",
      o: ["une", "un", "des", "la"],
      ctx: "'Maison' is feminine. A house.",
    },
    {
      s: "___ enfants aiment les animaux.",
      a: "Les",
      o: ["Les", "Le", "La", "Des"],
      ctx: "Plural definite. The children.",
    },
    {
      s: "C'est ___ bon restaurant.",
      a: "un",
      o: ["un", "une", "le", "des"],
      ctx: "'Restaurant' is masculine. A restaurant.",
    },
    {
      s: "___ école est grande.",
      a: "L'",
      o: ["L'", "La", "Le", "Les"],
      ctx: "Before a vowel, la → l'. The school.",
    },
  ],
  buildSentences: [
    {
      c: ["Le", "livre", "est", "sur", "la", "table"],
      en: "The book is on the table",
      trap: ["Les", "un"],
    },
    {
      c: ["L'", "homme", "regarde", "l'", "école"],
      en: "The man is looking at the school",
      trap: ["Le", "La"],
    },
    {
      c: ["Un", "café", "et", "une", "baguette"],
      en: "A coffee and a baguette",
      trap: ["des", "les"],
    },
    {
      c: ["Les", "enfants", "aiment", "les", "animaux"],
      en: "The children love animals",
      trap: ["Le", "La"],
    },
  ],
  quiz: [
    {
      q: "What happens to 'le' or 'la' before a vowel sound?",
      a: "It becomes l'",
      o: ["It becomes l'", "It stays the same", "It becomes les", "It disappears"],
    },
    {
      q: "'La nation, la situation, la télévision' — what makes these feminine?",
      a: "The -tion / -sion ending",
      o: [
        "The -tion / -sion ending",
        "They're about people",
        "They end in a vowel",
        "Random memorization",
      ],
    },
    {
      q: "Which is the correct article for 'maison'?",
      a: "la maison",
      o: ["la maison", "le maison", "les maison", "l'maison"],
      ctx: "'Maison' is feminine and starts with a consonant.",
    },
    {
      q: "How do you say 'some books' in French?",
      a: "des livres",
      o: ["des livres", "les livres", "un livres", "de livres"],
      ctx: "Plural indefinite article.",
    },
    {
      q: "You're ordering at a café: 'I'd like a coffee.'",
      a: "Je voudrais un café",
      o: [
        "Je voudrais un café",
        "Je voudrais une café",
        "Je voudrais le café",
        "Je voudrais des café",
      ],
      ctx: "'Café' is masculine.",
    },
    {
      q: "Which word is likely masculine based on its ending?",
      a: "le moment",
      o: ["le moment", "la nation", "la télévision", "la situation"],
      ctx: "-ment endings are usually masculine.",
    },
    {
      q: "'Les enfants' — what sound links 'les' to 'enfants'?",
      a: "A 'z' sound (liaison)",
      o: [
        "A 'z' sound (liaison)",
        "A 't' sound",
        "No linking sound",
        "An 'n' sound",
      ],
    },
    {
      q: "You see a beautiful house. Fill in: 'C'est ___ belle maison !'",
      a: "une",
      o: ["une", "un", "la", "des"],
      ctx: "'Maison' is feminine → une belle maison.",
    },
  ],
  combine: [
    {
      hint: "the + book + on + the + table → Describe where something is",
      answer: "Le livre est sur la table",
      accept: [
        "le livre est sur la table",
        "Le livre est sur la table",
      ],
    },
    {
      hint: "a + coffee + and + a + baguette → Order two things",
      answer: "Un café et une baguette",
      accept: [
        "un café et une baguette",
        "un cafe et une baguette",
        "Un café et une baguette",
      ],
    },
    {
      hint: "the + children + love + the + animals → Describe a scene",
      answer: "Les enfants aiment les animaux",
      accept: [
        "les enfants aiment les animaux",
        "Les enfants aiment les animaux",
      ],
    },
  ],
  weave: [
    {
      en: "The book is on the table and the children love animals.",
      known: [
        "le",
        "livre",
        "est",
        "sur",
        "la",
        "table",
        "les",
        "enfants",
        "aiment",
        "animaux",
      ],
      sample:
        "Le livre est sur la table and les enfants aiment les animaux.",
    },
    {
      en: "I have a house and she has some friends in France.",
      known: [
        "j'ai",
        "une",
        "maison",
        "elle",
        "a",
        "des",
        "amis",
        "en",
        "France",
      ],
      sample:
        "J'ai une maison and elle a des amis en France.",
    },
    {
      en: "It's a good restaurant. The situation is complicated.",
      known: [
        "c'est",
        "un",
        "bon",
        "restaurant",
        "la",
        "situation",
        "est",
        "compliquée",
      ],
      sample:
        "C'est un bon restaurant. La situation est compliquée.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Un café et une baguette, s'il vous plaît.",
      q: "What is the person ordering?",
      a: "A coffee and a baguette",
      o: [
        "A coffee and a baguette",
        "Two coffees",
        "A tea and a croissant",
        "Some bread",
      ],
    },
    {
      type: "odd",
      q: "Which does NOT belong?",
      items: ["le", "la", "les", "des"],
      a: "des",
      reason: "First three are definite articles (the). 'Des' is indefinite (some).",
    },
    {
      type: "context",
      situation: "You want to say 'the school' but 'école' starts with a vowel.",
      a: "l'école",
      o: ["l'école", "la école", "le école", "les école"],
    },
    {
      type: "fill_ctx",
      s: "___ moment est parfait.",
      a: "Le",
      o: ["Le", "La", "Les", "L'"],
      ctx: "'Moment' is masculine and starts with a consonant.",
    },
    {
      type: "context",
      situation: "Someone asks what you have. You have friends in France.",
      a: "J'ai des amis en France",
      o: [
        "J'ai des amis en France",
        "J'ai les amis en France",
        "J'ai un amis en France",
        "J'ai la amis en France",
      ],
    },
  ],
  sayIt: [
    {
      situation:
        "You're at a café. Order a coffee and a baguette using the correct articles.",
      target: ["un", "café", "une", "baguette"],
    },
    {
      situation:
        "Describe a scene: the book is on the table, and the children are at school.",
      target: ["le", "livre", "la", "table", "les", "enfants", "l'école"],
    },
  ],
  miniConv: {
    topic: "Talking about things around you using articles and gender",
    starter: "Regarde ! Il y a un chat sur la table. Tu vois le chat ?",
  },
  expressions: [
    {
      fr: "C'est la vie",
      en: "That's life / Such is life",
      usage: "'Mon train est en retard.' — 'C'est la vie !'",
      literal: "It's the life",
    },
    {
      fr: "Il y a",
      en: "There is / There are",
      usage: "'Il y a un problème' = There's a problem. Works for singular and plural.",
      literal: "It there has",
    },
    {
      fr: "Pas de problème",
      en: "No problem",
      usage: "'Désolé pour le retard.' — 'Pas de problème !'",
      literal: "Not of problem",
    },
  ],
  grammarNuggets: [
    {
      title: "Learn the article, not just the noun",
      insight:
        "Never memorize 'maison = house.' Always memorize '*la* maison = house.' Your brain stores gender best when the article is glued to the noun from the start. Think of 'la maison' as one unit, like 'the White House' in English — you'd never say just 'White House' without 'the.'",
      example: "la maison, le livre, l'école — always as a pair",
    },
    {
      title: "Des is the article English forgot",
      insight:
        "English says 'I have friends.' French REQUIRES an article: 'J'ai *des* amis.' There's no zero article in French. Every noun needs something in front of it. 'Des' is the plural of 'un/une' — think of it as 'some,' even when English uses nothing.",
      example: "J'ai des amis (I have friends) — NOT J'ai amis",
    },
  ],
  fauxAmis: [
    {
      fr: "librairie",
      looksLike: "library",
      actualMeaning: "bookshop / bookstore",
      example: "Je vais à la librairie acheter un livre. (I'm going to the bookshop to buy a book.)",
    },
  ],
  soundPatterns: [
    {
      pattern: "-tion → same spelling, French pronunciation",
      examples: [
        { fr: "nation", en: "nation" },
        { fr: "situation", en: "situation" },
        { fr: "télévision", en: "television" },
        { fr: "éducation", en: "education" },
      ],
      rule: "French -tion is pronounced 'see-ON' (nasal), not 'shun'. These are all feminine — la nation, la situation. Hundreds of free vocabulary words!",
    },
  ],
  cultureBite:
    "French speakers don't think of grammatical gender as 'male' and 'female.' A table being feminine doesn't make it womanly. It's purely a grammatical category inherited from Latin. Even French children occasionally guess the wrong gender — they just hear corrections until it sticks.",
  summary: [
    "Definite articles: le (m), la (f), l' (vowel), les (plural)",
    "Indefinite articles: un (m), une (f), des (plural)",
    "Gender clues: -tion = fem, -ment = masc, -eur = masc",
    "Elision: le/la → l' before vowels (l'homme, l'école)",
    "Liaison: les‿enfants — the 's' links as a 'z' sound",
  ],
};
