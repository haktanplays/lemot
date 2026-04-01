import type { Lesson } from "@/lib/types";

export const lesson12: Lesson = {
  id: 12,
  title: "My People",
  sub: "Family, friends, and possession",
  icon: "Users",
  level: "A1",
  difficulty: "medium",
  grammar: {
    title: "Family & Possessive Adjectives",
    sections: [
      {
        type: "intro",
        text: "In English, 'my' is always 'my'. In French, it changes based on the noun's gender: *mon* (m.), *ma* (f.), *mes* (pl.). The possessive matches the THING, not the owner.",
      },
      {
        type: "block",
        label: "Possessive Adjectives",
        items: [
          {
            fr: "mon / ma / mes",
            en: "my",
            note: "Mon père (my father), ma mère (my mother), mes enfants (my children).",
          },
          {
            fr: "ton / ta / tes",
            en: "your (informal)",
            note: "Ton frère, ta sœur, tes amis. Same pattern as mon/ma/mes.",
          },
          {
            fr: "son / sa / ses",
            en: "his/her",
            note: "Son père = his/her father. Sa mère = his/her mother. No gender distinction for the owner!",
          },
          {
            fr: "notre / nos",
            en: "our",
            note: "Notre maison (our house), nos enfants (our children). One form for m./f., one for plural.",
          },
          {
            fr: "votre / vos",
            en: "your (formal/plural)",
            note: "Votre famille (your family), vos amis (your friends). Same pattern as notre/nos.",
          },
          {
            fr: "leur / leurs",
            en: "their",
            note: "Leur fils (their son), leurs enfants (their children). No m./f. distinction — just singular vs plural.",
          },
        ],
      },
      {
        type: "tip",
        text: "Tricky! *Son* can mean 'his' OR 'her'. *Son père* = his father OR her father. Context tells you which. The possessive agrees with the NOUN, not the person.",
      },
      {
        type: "block",
        label: "Family Members",
        items: [
          {
            fr: "le père / la mère",
            en: "father / mother",
            note: "Père ≈ paternal, mère ≈ maternal. Easy cognates!",
          },
          {
            fr: "le frère / la sœur",
            en: "brother / sister",
            note: "Frère ≈ fraternal, sœur ≈ sorority (both from Latin).",
          },
          {
            fr: "le fils / la fille",
            en: "son / daughter",
            note: "Fils ≈ filial. Fille also means 'girl'.",
          },
          {
            fr: "le mari / la femme",
            en: "husband / wife",
            note: "Mari ≈ marry/marriage. Femme also means 'woman' ≈ feminine.",
          },
          {
            fr: "l'enfant",
            en: "child",
            note: "Enfant ≈ infant. Can be masculine or feminine!",
          },
          {
            fr: "l'ami / l'amie",
            en: "friend (m./f.)",
            note: "Ami ≈ amicable. Add -e for feminine: amie.",
          },
        ],
      },
      {
        type: "block",
        label: "Describing People",
        items: [
          {
            fr: "jeune",
            en: "young",
            note: "Jeune ≈ juvenile. Same for m. and f.",
          },
          {
            fr: "vieux / vieille",
            en: "old (m./f.)",
            note: "Masculine changes to feminine! Vieux → vieille.",
          },
          {
            fr: "grand / grande",
            en: "tall, big (m./f.)",
            note: "Grand ≈ grand. Add -e for feminine.",
          },
          {
            fr: "petit / petite",
            en: "small, short (m./f.)",
            note: "Petit ≈ petite. Already English!",
          },
        ],
      },
      {
        type: "tip",
        text: "Adjective placement: *Most* adjectives go AFTER the noun in French: *un homme intelligent*. But a few common ones go BEFORE: *un petit chat, un grand homme, un vieux livre, une jeune fille*. The rule of thumb: BAGS adjectives (Beauty, Age, Goodness, Size) go before.",
      },
      {
        type: "etymology",
        pairs: [
          {
            fr: "père",
            en: "paternal",
            root: "Latin 'pater' → French père. English: paternal, patriot, patrimony.",
          },
          {
            fr: "mère",
            en: "maternal",
            root: "Latin 'mater' → French mère. English: maternal, maternity, alma mater.",
          },
          {
            fr: "frère",
            en: "fraternal",
            root: "Latin 'frater' → French frère. English: fraternal, fraternity.",
          },
        ],
      },
      {
        type: "culture",
        text: "In France, family dinners are sacred. Sunday lunch (*le déjeuner du dimanche*) often brings three generations together. 'C'est en famille' means it's intimate, close.",
      },
    ],
    quickRecall: {
      q: "How do you say 'my mother'?",
      a: "ma mère",
      o: ["ma mère", "mon mère", "me mère", "sa mère"],
    },
  },
  examples: [
    {
      fr: "Mon père est médecin.",
      en: "My father is a doctor.",
      bridge: "Mon père is médecin.",
    },
    {
      fr: "Ma sœur a vingt ans.",
      en: "My sister is twenty.",
      bridge: "Ma sœur a vingt ans.",
    },
    {
      fr: "Ses enfants sont jeunes.",
      en: "His/her children are young.",
      bridge: "Ses enfants sont jeunes.",
    },
    {
      fr: "Ton frère est grand.",
      en: "Your brother is tall.",
      bridge: "Ton frère est grand.",
    },
    {
      fr: "Ma femme est française.",
      en: "My wife is French.",
      bridge: "Ma femme est française.",
    },
    {
      fr: "Notre maison est petite.",
      en: "Our house is small.",
      bridge: "Notre maison est petite.",
    },
    {
      fr: "Leurs enfants sont à l'école.",
      en: "Their children are at school.",
      bridge: "Leurs enfants sont à l'école.",
    },
    {
      fr: "Mes amis sont ici.",
      en: "My friends are here.",
      bridge: "Mes amis sont ici.",
    },
  ],
  fillFG: [
    {
      s: "[___] father is a doctor.",
      a: "Mon",
      o: ["Mon", "Ma", "Mes", "Son"],
      ctx: "Père = masculine → mon.",
    },
    {
      s: "[___] sister is twenty years old.",
      a: "Ma",
      o: ["Ma", "Mon", "Mes", "Sa"],
      ctx: "Sœur = feminine → ma.",
    },
    {
      s: "[___] children are young.",
      a: "Ses",
      o: ["Ses", "Son", "Sa", "Mes"],
      ctx: "Enfants = plural, his/her → ses.",
    },
    {
      s: "Your (informal) [___] is tall.",
      a: "frère",
      o: ["frère", "sœur", "père", "fils"],
      ctx: "Brother — masculine noun.",
    },
    {
      s: "[___] friends are here.",
      a: "Mes",
      o: ["Mes", "Mon", "Ma", "Tes"],
      ctx: "Amis = plural → mes.",
    },
  ],
  fillBlanks: [
    {
      s: "___ père est médecin.",
      a: "Mon",
      o: ["Mon", "Ma", "Mes", "Son"],
      ctx: "My father — père is masculine.",
    },
    {
      s: "___ sœur a vingt ans.",
      a: "Ma",
      o: ["Ma", "Mon", "Mes", "Ta"],
      ctx: "My sister — sœur is feminine.",
    },
    {
      s: "___ enfants sont jeunes.",
      a: "Ses",
      o: ["Ses", "Son", "Sa", "Mes"],
      ctx: "His/her children — plural.",
    },
    {
      s: "Ton ___ est grand.",
      a: "frère",
      o: ["frère", "sœur", "mère", "fille"],
      ctx: "Your brother is tall.",
    },
    {
      s: "___ maison est petite.",
      a: "Notre",
      o: ["Notre", "Nos", "Leur", "Mon"],
      ctx: "Our house — singular noun.",
    },
  ],
  buildSentences: [
    {
      c: ["Mon", "père", "est", "médecin"],
      en: "My father is a doctor.",
      trap: ["Ma", "suis"],
    },
    {
      c: ["Ma", "sœur", "a", "vingt", "ans"],
      en: "My sister is twenty.",
      trap: ["Mon", "est"],
    },
    {
      c: ["Ses", "enfants", "sont", "jeunes"],
      en: "His/her children are young.",
      trap: ["Son", "vieux"],
    },
    {
      c: ["Mes", "amis", "sont", "ici"],
      en: "My friends are here.",
      trap: ["Mon", "ami"],
    },
  ],
  quiz: [
    {
      q: "'Mon' is used with...",
      a: "Masculine nouns",
      o: ["Masculine nouns", "Feminine nouns", "Plural nouns", "All nouns"],
      ctx: "Mon père, mon frère, mon ami.",
    },
    {
      q: "'Son père' can mean...",
      a: "Both his father and her father",
      o: [
        "Both his father and her father",
        "Only his father",
        "Only her father",
        "Their father",
      ],
      ctx: "Son matches the noun (père = m.), not the owner.",
    },
    {
      q: "How do you say 'my children'?",
      a: "Mes enfants",
      o: ["Mes enfants", "Mon enfants", "Ma enfants", "Mes enfant"],
    },
    {
      q: "What does 'frère' mean?",
      a: "Brother",
      o: ["Brother", "Sister", "Father", "Friend"],
      ctx: "Frère ≈ fraternal.",
    },
    {
      q: "Which is WRONG?",
      a: "Mon sœur",
      o: ["Mon sœur", "Ma mère", "Mon père", "Mes amis"],
      negative: true,
      ctx: "Sœur is feminine → ma sœur, not mon sœur.",
    },
    {
      q: "'La femme' can mean...",
      a: "The wife or the woman",
      o: [
        "The wife or the woman",
        "Only the wife",
        "Only the woman",
        "The family",
      ],
      ctx: "Femme has both meanings in French.",
    },
    {
      q: "A friend suggests dinner. You reply: 'Super, on mange _______ ?'",
      a: "chez moi",
      o: ["chez moi", "ça fait longtemps", "c'est de famille", "en fait"],
      ctx: "The expression meaning 'at my place'.",
    },
    {
      q: "You run into an old friend on the street. You exclaim: '_______! Comment tu vas ?'",
      a: "Ça fait longtemps",
      o: ["Ça fait longtemps", "Chez moi", "C'est de famille", "En tout cas"],
      ctx: "The expression meaning 'it's been a long time / long time no see'.",
    },
  ],
  combine: [
    {
      hint: "Father (doctor) + mother (French) → Describe your parents",
      answer: "Mon père est médecin et ma mère est française.",
      accept: [
        "mon pere est medecin et ma mere est francaise",
        "mon père est médecin et ma mère est française",
      ],
    },
    {
      hint: "Sister (20) + brother (tall) → Describe your siblings",
      answer: "Ma sœur a vingt ans et mon frère est grand.",
      accept: [
        "ma soeur a vingt ans et mon frere est grand",
        "ma sœur a vingt ans et mon frère est grand",
      ],
    },
    {
      hint: "Friends (here) + children (young) → Say your friends are here and the kids are young",
      answer: "Mes amis sont ici et les enfants sont jeunes.",
      accept: ["mes amis sont ici et les enfants sont jeunes"],
    },
  ],
  weave: [
    {
      en: "My father is a doctor and my mother is French. They have three children.",
      known: [
        "mon",
        "père",
        "est",
        "médecin",
        "ma",
        "mère",
        "française",
        "ils",
        "ont",
        "trois",
        "enfants",
      ],
      sample:
        "Mon père est médecin and ma mère est française. Ils ont trois enfants.",
    },
    {
      en: "Her brother is tall and young. His sister is twenty years old.",
      known: [
        "son",
        "frère",
        "est",
        "grand",
        "jeune",
        "sa",
        "sœur",
        "a",
        "vingt",
        "ans",
      ],
      sample: "Son frère est grand and jeune. Sa sœur a vingt ans.",
    },
    {
      en: "My friends are here. Your wife is beautiful and your children are small.",
      known: [
        "mes",
        "amis",
        "sont",
        "ici",
        "ta",
        "femme",
        "est",
        "belle",
        "tes",
        "enfants",
        "petits",
      ],
      sample:
        "Mes amis sont ici. Ta femme est belle and tes enfants sont petits.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Mon frère a trente ans et ma sœur a vingt-cinq ans.",
      q: "Who is older?",
      a: "The brother (30 vs 25)",
      o: [
        "The brother (30 vs 25)",
        "The sister",
        "They're the same age",
        "Can't tell",
      ],
    },
    {
      type: "odd",
      q: "Which is NOT a family member?",
      items: ["père", "mère", "ami", "frère"],
      a: "ami",
      reason: "Ami means friend. The others are family members.",
    },
    {
      type: "context",
      situation: "Someone asks about your family. Your mom is a doctor.",
      a: "Ma mère est médecin",
      o: [
        "Ma mère est médecin",
        "Mon mère est médecin",
        "Ma mère a médecin",
        "Ma mère fait médecin",
      ],
    },
    {
      type: "fill_ctx",
      s: "J'___ trois enfants. (Lesson 4 — avoir)",
      a: "ai",
      o: ["ai", "suis", "est", "as"],
      ctx: "I have three children — avoir.",
    },
    {
      type: "fill_ctx",
      s: "___ père est grand.",
      a: "Mon",
      o: ["Mon", "Ma", "Mes", "Le"],
      ctx: "My father — père is masculine.",
    },
    {
      type: "weave",
      en: "My sister is young.",
      blanks: [
        { word: "sister", answer: "sœur" },
        { word: "young", answer: "jeune" },
      ],
      full: "Ma sœur est jeune.",
    },
    {
      type: "context",
      situation: "Someone asks why your whole family is so tall. You reply:",
      a: "C'est de famille !",
      o: [
        "C'est de famille !",
        "Chez moi !",
        "Ça fait longtemps !",
        "N'importe quoi !",
      ],
    },
  ],
  sayIt: [
    {
      situation:
        "Introduce your family: parents, siblings. Say their ages and what they do.",
      target: ["mon", "ma", "père", "mère", "frère", "sœur", "ans", "est"],
    },
    {
      situation:
        "Describe your best friend: their age, what they look like, and where they are.",
      target: ["ami", "a", "ans", "est", "grand", "ici"],
    },
  ],
  miniConv: {
    topic: "Talking about your family and describing people",
    starter:
      "Salut ! Tu as des frères et sœurs ? Parle-moi de ta famille.",
  },
  expressions: [
    {
      fr: "Chez moi",
      en: "At my place / At home",
      usage: "'On mange chez moi ?' (Shall we eat at my place?)",
      literal: "At home of me",
    },
    {
      fr: "Ça fait longtemps",
      en: "It's been a long time",
      usage:
        "'Ça fait longtemps ! Comment tu vas ?' (Long time no see! How are you?)",
      literal: "That makes long time",
    },
    {
      fr: "C'est de famille",
      en: "It runs in the family",
      usage: "'Il est grand ?' — 'Oui, c'est de famille !'",
      literal: "It's of family",
    },
  ],
  grammarNuggets: [
    {
      title: "Son means BOTH 'his' AND 'her'",
      insight:
        "French possessives match the THING OWNED, not the OWNER. 'Son père' = his father AND her father. 'Sa mère' = his mother AND her mother. English possessives match the owner. French ones match the object. Completely opposite logic.",
      example:
        "Son livre = his book AND her book (livre is masculine → son)",
    },
    {
      title:
        "'Ma' becomes 'mon' before vowels — it's a sound rule, not a gender change",
      insight:
        "'Ma amie' creates a vowel collision (a-a). French refuses this. So it becomes 'mon amie' — mon + feminine noun. It looks wrong ('mon' = masculine?) but the noun is still feminine. French prioritizes smooth sound over gender marking.",
      example: "mon amie (my female friend) — mon for sound, not gender",
    },
  ],
  fauxAmis: [
    {
      fr: "parent",
      looksLike: "parent (mother/father only)",
      actualMeaning: "parent OR relative (broader meaning)",
      example: "C'est un parent éloigné. (He's a distant relative.)",
    },
  ],
  cultureBite:
    "'Chez' is uniquely French — a single preposition meaning 'at the home/place of.' No English equivalent exists. 'Chez moi' (my place), 'chez le docteur' (at the doctor's), 'chez Starbucks' (at Starbucks). It implies belonging and intimacy.",
  summary: [
    "Possessives: mon/ma/mes → notre/nos → leur/leurs",
    "Son/sa matches the noun, not the owner",
    "BAGS adjectives (Beauty, Age, Goodness, Size) go before the noun",
    "Expression: chez moi, ça fait longtemps, c'est de famille",
  ],
};
