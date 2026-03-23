import type { Lesson } from "@/lib/types";

export const lesson10: Lesson = {
  id: 10,
  title: "My Family",
  sub: "Talk about people with possessives",
  icon: "Users",
  level: "A1",
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
        ],
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
      fr: "Son fils est petit.",
      en: "His/her son is small.",
      bridge: "Son fils est petit.",
    },
    {
      fr: "Mes amis sont ici.",
      en: "My friends are here.",
      bridge: "Mes amis sont ici.",
    },
  ],
  fillCross: [
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
      s: "Son ___ est petit.",
      a: "fils",
      o: ["fils", "fille", "frère", "ami"],
      ctx: "His/her son is small.",
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
  crossing: [
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
      s: "J'___ trois enfants. (Lesson 6 — avoir)",
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
      type: "crossing",
      en: "My sister is young.",
      blanks: [
        { word: "sister", answer: "sœur" },
        { word: "young", answer: "jeune" },
      ],
      full: "Ma sœur est jeune.",
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
};
