import type { Lesson } from "@/lib/types";

export const lesson7: Lesson = {
  id: 7,
  title: "Le, La, Les",
  sub: "Every French noun has a gender — let's crack the code",
  icon: "BookOpen",
  level: "A1",
  difficulty: "medium",
  grammar: {
    title: "Articles & Gender",
    sections: [
      {
        type: "intro",
        text: "In French, every noun is either masculine (*le*) or feminine (*la*). There's no 'it' — a table is *she*, a book is *he*. This might seem random, but there are patterns.",
      },
      {
        type: "block",
        label: "Definite Articles (the)",
        items: [
          {
            fr: "le",
            en: "the (masculine)",
            note: "Le livre (the book), le téléphone (the phone). Before vowels: l' (l'hôtel).",
          },
          {
            fr: "la",
            en: "the (feminine)",
            note: "La maison (the house), la table (the table). Before vowels: l' (l'école).",
          },
          {
            fr: "les",
            en: "the (plural)",
            note: "Les livres, les maisons. Same for both genders in plural!",
          },
        ],
      },
      {
        type: "block",
        label: "Indefinite Articles (a/some)",
        items: [
          {
            fr: "un",
            en: "a (masculine)",
            note: "Un livre (a book), un café (a coffee).",
          },
          {
            fr: "une",
            en: "a (feminine)",
            note: "Une maison (a house), une table (a table).",
          },
          {
            fr: "des",
            en: "some (plural)",
            note: "Des livres (some books). This has no English equivalent!",
          },
        ],
      },
      {
        type: "tip",
        text: "Gender shortcuts: words ending in *-tion* are feminine (la nation, la situation). Words ending in *-ment* are masculine (le moment, le document). Words ending in *-eur* are usually masculine (le docteur). These patterns cover ~80% of nouns!",
      },
      {
        type: "block",
        label: "Common Objects — Masculine",
        items: [
          {
            fr: "le livre",
            en: "the book",
            note: "Livre ≈ library (same Latin root 'liber').",
          },
          {
            fr: "le téléphone",
            en: "the phone",
            note: "Téléphone ≈ telephone. Almost all tech words are masculine.",
          },
          {
            fr: "le moment",
            en: "the moment",
            note: "-ment ending = masculine.",
          },
        ],
      },
      {
        type: "block",
        label: "Common Objects — Feminine",
        items: [
          {
            fr: "la maison",
            en: "the house",
            note: "Maison ≈ mansion. -son ending often feminine.",
          },
          {
            fr: "la voiture",
            en: "the car",
            note: "La voiture = the car. -ure ending often feminine.",
          },
          {
            fr: "la musique",
            en: "the music",
            note: "Musique ≈ music. -ique ending = feminine.",
          },
          {
            fr: "la table",
            en: "the table",
            note: "Table ≈ table. Many -le words are feminine.",
          },
          {
            fr: "la famille",
            en: "the family",
            note: "Famille ≈ family. -ille ending = feminine.",
          },
        ],
      },
      {
        type: "culture",
        text: "Why does gender matter? Because adjectives change! Le petit chat (the small cat) but la petite maison (the small house). Get the article right and the rest follows.",
      },
    ],
    quickRecall: {
      q: "Which article goes with 'maison'?",
      a: "la",
      o: ["le", "la", "les", "un"],
    },
  },
  examples: [
    {
      fr: "Le livre est sur la table.",
      en: "The book is on the table.",
      bridge: "Le livre is sur la table.",
    },
    {
      fr: "La voiture est rouge.",
      en: "The car is red.",
      bridge: "La voiture is rouge.",
    },
    {
      fr: "Il y a un téléphone sur la chaise.",
      en: "There's a phone on the chair.",
      bridge: "Il y a un téléphone sur la chaise.",
    },
    {
      fr: "La musique est belle.",
      en: "The music is beautiful.",
      bridge: "La musique is beautiful.",
    },
    {
      fr: "Les maisons sont grandes.",
      en: "The houses are big.",
      bridge: "Les maisons sont big.",
    },
    {
      fr: "J'ai un livre et une table.",
      en: "I have a book and a table.",
      bridge: "J'ai un livre et une table.",
    },
    {
      fr: "La famille est à la maison.",
      en: "The family is at home.",
      bridge: "La famille is à la maison.",
    },
  ],
  fillFG: [
    {
      s: "[___] book is on the table.",
      a: "Le",
      o: ["Le", "La", "Les", "Un"],
      ctx: "Livre = masculine → le.",
    },
    {
      s: "[___] car is red.",
      a: "La",
      o: ["La", "Le", "Les", "Une"],
      ctx: "Voiture = feminine → la.",
    },
    {
      s: "I have [___] phone.",
      a: "un",
      o: ["un", "une", "le", "la"],
      ctx: "Téléphone = masculine → un.",
    },
    {
      s: "[___] houses are big.",
      a: "Les",
      o: ["Les", "Le", "La", "Des"],
      ctx: "Plural = les, regardless of gender.",
    },
    {
      s: "There are [___] books on the table.",
      a: "des",
      o: ["des", "les", "un", "la"],
      ctx: "Some (plural indefinite) = des.",
    },
  ],
  fillBlanks: [
    {
      s: "___ livre est sur la table.",
      a: "Le",
      o: ["Le", "La", "Les", "Un"],
      ctx: "Livre = masculine.",
    },
    {
      s: "___ maison est grande.",
      a: "La",
      o: ["La", "Le", "Les", "Une"],
      ctx: "Maison = feminine.",
    },
    {
      s: "Il y a ___ téléphone ici.",
      a: "un",
      o: ["un", "une", "le", "des"],
      ctx: "A phone — masculine indefinite.",
    },
    {
      s: "___ musique est belle.",
      a: "La",
      o: ["La", "Le", "Les", "Un"],
      ctx: "Musique = feminine (-ique ending).",
    },
    {
      s: "J'ai ___ livres.",
      a: "des",
      o: ["des", "les", "un", "la"],
      ctx: "Some books — plural indefinite.",
    },
  ],
  buildSentences: [
    {
      c: ["Le", "livre", "est", "sur", "la", "table"],
      en: "The book is on the table.",
      trap: ["un", "les"],
    },
    {
      c: ["La", "voiture", "est", "rouge"],
      en: "The car is red.",
      trap: ["Le", "un"],
    },
    {
      c: ["Il", "y", "a", "un", "téléphone"],
      en: "There is a phone.",
      trap: ["une", "la"],
    },
    {
      c: ["Les", "maisons", "sont", "grandes"],
      en: "The houses are big.",
      trap: ["La", "petit"],
    },
  ],
  quiz: [
    {
      q: "What gender is 'musique'?",
      a: "Feminine (la musique)",
      o: [
        "Feminine (la musique)",
        "Masculine (le musique)",
        "Both",
        "Neither",
      ],
    },
    {
      q: "Words ending in -tion are usually...",
      a: "Feminine",
      o: ["Feminine", "Masculine", "Either", "Plural"],
    },
    {
      q: "What is 'des'?",
      a: "Some (plural)",
      o: ["Some (plural)", "The (plural)", "A (masculine)", "The (feminine)"],
    },
    {
      q: "'L'hôtel' uses l' because...",
      a: "The noun starts with a vowel/h",
      o: [
        "The noun starts with a vowel/h",
        "It's feminine",
        "It's plural",
        "It's a special word",
      ],
      ctx: "Le/la become l' before vowels.",
    },
    {
      q: "Which is WRONG?",
      a: "Le maison",
      o: ["Le maison", "La voiture", "Le livre", "Les tables"],
      negative: true,
      ctx: "Maison is feminine → la maison.",
    },
    {
      q: "'La famille est à la maison' means...",
      a: "The family is at home",
      o: [
        "The family is at home",
        "The family has a house",
        "The house is familiar",
        "A family is a house",
      ],
    },
    {
      q: "It's cold outside but you're going for a walk _______.",
      a: "quand même",
      o: ["quand même", "n'importe quoi", "tout à fait", "en fait"],
      ctx: "The expression meaning 'still / even so / all the same'.",
    },
    {
      q: "Someone asks 'C'est correct ?' and you want to say 'Absolutely.' You reply:",
      a: "Tout à fait",
      o: ["Tout à fait", "Quand même", "N'importe quoi", "C'est ça"],
      ctx: "The expression meaning 'exactly / absolutely'.",
    },
  ],
  combine: [
    {
      hint: "Book + on table + red → Describe a red book on the table",
      answer: "Le livre rouge est sur la table.",
      accept: [
        "le livre rouge est sur la table",
        "le livre est rouge sur la table",
      ],
    },
    {
      hint: "Car + big + here → Say there's a big car here",
      answer: "Il y a une grande voiture ici.",
      accept: [
        "il y a une grande voiture ici",
        "il y a une voiture grande ici",
      ],
    },
    {
      hint: "Music + beautiful + house → The music in the house is beautiful",
      answer: "La musique est belle à la maison.",
      accept: [
        "la musique est belle a la maison",
        "la musique a la maison est belle",
      ],
    },
  ],
  weave: [
    {
      en: "The book is on the table and the chair is small.",
      known: [
        "le",
        "livre",
        "est",
        "sur",
        "la",
        "table",
        "chaise",
        "petit",
      ],
      sample:
        "Le livre est sur la table and la chaise est petit.",
    },
    {
      en: "I have a car and a phone. The car is red.",
      known: [
        "j'ai",
        "une",
        "voiture",
        "un",
        "téléphone",
        "la",
        "est",
        "rouge",
      ],
      sample:
        "J'ai une voiture et un téléphone. La voiture est rouge.",
    },
    {
      en: "The houses are big and the music is beautiful.",
      known: [
        "les",
        "maisons",
        "sont",
        "grandes",
        "la",
        "musique",
        "est",
        "belle",
      ],
      sample:
        "Les maisons sont grandes and la musique est belle.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Le livre est sur la table.",
      q: "Where is the book?",
      a: "On the table",
      o: ["On the table", "In the car", "At school", "Under the chair"],
    },
    {
      type: "odd",
      q: "Which noun is MASCULINE?",
      items: ["la maison", "le livre", "la voiture", "la musique"],
      a: "le livre",
      reason: "Livre is masculine (le livre). All others are feminine.",
    },
    {
      type: "fill_ctx",
      s: "___ voiture est grande.",
      a: "La",
      o: ["La", "Le", "Les", "Un"],
      ctx: "Voiture = feminine.",
    },
    {
      type: "context",
      situation: "You want to say 'there are some books'.",
      a: "Il y a des livres",
      o: [
        "Il y a des livres",
        "Il y a les livres",
        "Il y a un livres",
        "Il y a la livres",
      ],
    },
    {
      type: "fill_ctx",
      s: "J'___ un problème. (Lesson 6 — avoir)",
      a: "ai",
      o: ["ai", "suis", "est", "a"],
      ctx: "Avoir = to have. Cross-reference L6.",
    },
    {
      type: "weave",
      en: "The family is at home.",
      blanks: [
        { word: "family", answer: "famille" },
        { word: "home", answer: "maison" },
      ],
      full: "La famille est à la maison.",
    },
    {
      type: "context",
      situation: "Your friend says something ridiculous. You react dismissively.",
      a: "N'importe quoi !",
      o: ["N'importe quoi !", "Tout à fait !", "Quand même !", "C'est vrai !"],
    },
  ],
  sayIt: [
    {
      situation:
        "Describe your room: what objects are there? Use articles correctly.",
      target: ["le", "la", "un", "une", "sur", "table", "livre"],
    },
    {
      situation:
        "You see a beautiful red car. Describe it and say where it is.",
      target: ["la", "voiture", "rouge", "est", "belle"],
    },
  ],
  miniConv: {
    topic: "Describing objects and their locations using articles",
    starter:
      "Regarde ! Il y a un livre sur la table. C'est ton livre ?",
  },
  expressions: [
    {
      fr: "Quand même",
      en: "Still / Even so / All the same",
      usage: "'Il fait froid mais je sors quand même.' (It's cold but I'm going out anyway.)",
      literal: "When same",
    },
    {
      fr: "N'importe quoi",
      en: "Whatever / Nonsense / Anything",
      usage: "'Tu veux quoi ?' — 'N'importe quoi.' (Anything.)",
      literal: "It doesn't matter what",
    },
    {
      fr: "Tout à fait",
      en: "Exactly / Absolutely",
      usage: "'C'est correct ?' — 'Oui, tout à fait.'",
      literal: "All to fact",
    },
  ],
  grammarNuggets: [
    {
      title:
        "Gender suffixes cover 80% — learn 6 rules, not 1000 words",
      insight:
        "-tion = feminine (100%), -ment = masculine (99%), -ure = feminine, -age = masculine, -ique = feminine, -eur = masculine. You don't need to memorize every noun's gender. Six suffix rules cover the vast majority.",
      example:
        "la nation, le moment, la nature, le garage, la musique, le docteur",
    },
    {
      title:
        "'Des' has no English equivalent — that's why you forget it",
      insight:
        "English: 'I have books' — zero article. French: 'J'ai DES livres' — requires 'des.' French doesn't allow naked plural nouns. Every plural needs a determiner. 'J'ai livres' sounds as incomplete as 'I have... book?' in English.",
      example: "J'ai des livres (I have books) — des is mandatory",
    },
  ],
  fauxAmis: [
    {
      fr: "librairie",
      looksLike: "library",
      actualMeaning: "bookshop",
      example:
        "Je vais à la librairie acheter un livre. (I'm going to the bookshop.)",
    },
  ],
  cultureBite:
    "Why is a table feminine (la table) and a book masculine (le livre)? It's not about sex — it's about Latin grammar that French inherited. Most gender assignments follow suffix patterns, not meaning. Once you see the patterns, it stops feeling random.",
  summary: [
    "Articles: le/la/les (definite), un/une/des (indefinite)",
    "Gender suffix patterns: -tion=f, -ment=m, -age=m",
    "Des = mandatory plural article (English has none)",
    "Expression: quand même, n'importe quoi",
  ],
};
