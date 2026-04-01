import type { Lesson } from "@/lib/types";

export const lesson9: Lesson = {
  id: 9,
  title: "Food & Ordering",
  sub: "Partitives and restaurant French",
  icon: "UtensilsCrossed",
  level: "A1",
  difficulty: "medium",
  grammar: {
    title: "Food & Ordering",
    sections: [
      {
        type: "intro",
        text: "French restaurants have a rhythm: *l'entrée* (starter), *le plat* (main), *le dessert*. And you need special words for 'some' — the partitive articles.",
      },
      {
        type: "block",
        label: "Partitive Articles (some/any)",
        items: [
          {
            fr: "du",
            en: "some (m.)",
            note: "Du pain = some bread. Du = de + le (masculine).",
          },
          {
            fr: "de la",
            en: "some (f.)",
            note: "De la salade = some salad. Feminine form.",
          },
          {
            fr: "de l'",
            en: "some (before vowel)",
            note: "De l'eau = some water. Before vowels/h.",
          },
          {
            fr: "des",
            en: "some (plural)",
            note: "Des frites = some fries. Plural form.",
          },
        ],
      },
      {
        type: "block",
        label: "Negative: pas de",
        items: [
          {
            fr: "Je ne mange pas de viande.",
            en: "I don't eat meat.",
            note: "After negation, du/de la/des ALL become just 'de' (or d'). Not 'pas du'!",
          },
          {
            fr: "Il n'y a pas de pain.",
            en: "There's no bread.",
            note: "Same rule: negation removes the partitive. Pas de, never pas du.",
          },
        ],
      },
      {
        type: "block",
        label: "Restaurant Essentials",
        items: [
          {
            fr: "Je prends...",
            en: "I'll have... (I take)",
            note: "Prendre = to take. At restaurants, 'je prends' = I'll have.",
          },
          {
            fr: "L'addition, s'il vous plaît",
            en: "The check, please",
            note: "Addition ≈ addition (adding up the bill!).",
          },
          {
            fr: "L'entrée",
            en: "The starter/appetizer",
            note: "Entrée ≈ entry (the entry to the meal). In the US, 'entrée' means main course!",
          },
          {
            fr: "Le plat",
            en: "The main course",
            note: "Plat = dish/plate. Le plat du jour = dish of the day.",
          },
          {
            fr: "Le dessert",
            en: "Dessert",
            note: "Dessert ≈ dessert. From 'desservir' = to clear the table.",
          },
        ],
      },
      {
        type: "block",
        label: "Common Foods",
        items: [
          {
            fr: "le poulet",
            en: "chicken",
            note: "Poulet ≈ poultry. Same Latin root 'pullus'.",
          },
          {
            fr: "le poisson",
            en: "fish",
            note: "Poisson ≈ poison? No! Poisson = fish, poison = poison. Classic false friend.",
          },
          {
            fr: "le fromage",
            en: "cheese",
            note: "Fromage is uniquely French. 'Formage' from Latin 'forma' (mold/shape).",
          },
          {
            fr: "la viande",
            en: "meat",
            note: "From Latin 'vivenda' = things to live on.",
          },
          {
            fr: "l'eau",
            en: "water",
            note: "Eau ≈ eau (as in 'eau de toilette'). Silent letters!",
          },
        ],
      },
      {
        type: "tip",
        text: "In France, water is free if you ask for *une carafe d'eau* (tap water). If you just say 'de l'eau', you might get expensive bottled water!",
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "croissant",
            phonetic: "kwah-SAHN",
            ipa: "/kʁwa.sɑ̃/",
            notes:
              "The 'r' is throaty. The -ant is nasal — don't say the 't'. Means 'crescent' (shape of the moon).",
          },
          {
            fr: "baguette",
            phonetic: "bah-GET",
            ipa: "/ba.ɡɛt/",
            notes:
              "Stress on second syllable. The -ette ending is crisp, not 'et'.",
          },
          {
            fr: "fromage",
            phonetic: "froh-MAHZH",
            ipa: "/fʁɔ.maʒ/",
            notes:
              "The 'ge' is soft like 'zh' in 'pleasure'. French 'r' is throaty.",
          },
        ],
      },
      {
        type: "culture",
        text: "French meals are an event. Lunch can last an hour. Never rush. Say *bon appétit* before eating. And the waiter won't bring the check until you ask — it's considered rude to hurry guests.",
      },
    ],
    quickRecall: {
      q: "How do you say 'I'll have the chicken'?",
      a: "Je prends le poulet",
      o: [
        "Je prends le poulet",
        "J'ai le poulet",
        "Je suis le poulet",
        "Je voudrais poulet",
      ],
    },
  },
  examples: [
    {
      fr: "Je prends le poulet, s'il vous plaît.",
      en: "I'll have the chicken, please.",
      bridge: "Je prends le poulet, s'il vous plaît.",
    },
    {
      fr: "Du pain et du fromage.",
      en: "Some bread and some cheese.",
      bridge: "Du pain et du fromage.",
    },
    {
      fr: "De l'eau, s'il vous plaît.",
      en: "Some water, please.",
      bridge: "De l'eau, s'il vous plaît.",
    },
    {
      fr: "L'addition, s'il vous plaît.",
      en: "The check, please.",
      bridge: "L'addition, s'il vous plaît.",
    },
    {
      fr: "Comme entrée, une salade.",
      en: "For starter, a salad.",
      bridge: "As entrée, une salade.",
    },
    {
      fr: "Le plat du jour, c'est le poisson.",
      en: "The dish of the day is the fish.",
      bridge: "Le plat du jour, c'est le poisson.",
    },
    {
      fr: "Je ne mange pas de viande.",
      en: "I don't eat meat.",
      bridge: "Je ne mange pas de meat.",
    },
  ],
  fillFG: [
    {
      s: "I'll have [___] chicken, please.",
      a: "le poulet",
      o: ["le poulet", "la poulet", "du poulet", "un poulet"],
      ctx: "Ordering a specific dish → definite article.",
    },
    {
      s: "Some [___] and some cheese, please.",
      a: "du pain",
      o: ["du pain", "de la pain", "le pain", "un pain"],
      ctx: "Some bread — pain is masculine → du.",
    },
    {
      s: "[___] water, please.",
      a: "De l'",
      o: ["De l'", "Du", "La", "Le"],
      ctx: "Eau starts with vowel → de l'.",
    },
    {
      s: "The [___], please. (asking to pay)",
      a: "addition",
      o: ["addition", "entrée", "plat", "dessert"],
      ctx: "Asking for the bill.",
    },
    {
      s: "I don't eat [___] meat.",
      a: "de",
      o: ["de", "du", "de la", "des"],
      ctx: "After negation, partitive becomes just 'de'.",
    },
  ],
  fillBlanks: [
    {
      s: "Je ___ le poulet.",
      a: "prends",
      o: ["prends", "ai", "suis", "mange"],
      ctx: "I'll have (take) the chicken.",
    },
    {
      s: "___ pain, s'il vous plaît.",
      a: "Du",
      o: ["Du", "De la", "Le", "Un"],
      ctx: "Some bread — masculine partitive.",
    },
    {
      s: "___ salade, s'il vous plaît.",
      a: "De la",
      o: ["De la", "Du", "La", "Une"],
      ctx: "Some salad — feminine partitive.",
    },
    {
      s: "L'___, s'il vous plaît.",
      a: "addition",
      o: ["addition", "entrée", "eau", "table"],
      ctx: "The check, please.",
    },
    {
      s: "Je ne mange pas ___ viande.",
      a: "de",
      o: ["de", "du", "de la", "des"],
      ctx: "Negation: pas de (not pas du!).",
    },
  ],
  buildSentences: [
    {
      c: ["Je", "prends", "le", "poulet"],
      en: "I'll have the chicken.",
      trap: ["du", "suis"],
    },
    {
      c: ["L'", "addition", "s'il", "vous", "plaît"],
      en: "The check, please.",
      trap: ["entrée", "le"],
    },
    {
      c: ["Du", "pain", "et", "du", "fromage"],
      en: "Some bread and some cheese.",
      trap: ["le", "la"],
    },
    {
      c: ["Je", "ne", "mange", "pas", "de", "viande"],
      en: "I don't eat meat.",
      trap: ["du", "la"],
    },
  ],
  quiz: [
    {
      q: "'Du pain' means...",
      a: "Some bread",
      o: ["Some bread", "The bread", "A bread", "My bread"],
      ctx: "Du = partitive = some.",
    },
    {
      q: "After 'pas', partitives become...",
      a: "de (just 'de', not du/de la)",
      o: [
        "de (just 'de', not du/de la)",
        "du/de la (no change)",
        "le/la",
        "un/une",
      ],
      ctx: "Negation kills the partitive: pas de.",
    },
    {
      q: "How do you ask for the check?",
      a: "L'addition, s'il vous plaît",
      o: [
        "L'addition, s'il vous plaît",
        "Le plat, s'il vous plaît",
        "Le dessert, s'il vous plaît",
        "L'entrée, s'il vous plaît",
      ],
    },
    {
      q: "'De l'eau' uses 'de l'' because...",
      a: "Eau starts with a vowel",
      o: [
        "Eau starts with a vowel",
        "Water is special",
        "It's plural",
        "It's masculine",
      ],
    },
    {
      q: "Which is the main course?",
      a: "Le plat",
      o: ["Le plat", "L'entrée", "Le dessert", "L'addition"],
      ctx: "Entrée = starter, plat = main, dessert = dessert.",
    },
    {
      q: "What's a false friend here?",
      a: "Poisson (fish, not poison!)",
      o: [
        "Poisson (fish, not poison!)",
        "Poulet (chicken)",
        "Entrée (starter, not entry!)",
        "Dessert",
      ],
    },
    {
      q: "The food arrives. Before everyone starts eating, you say:",
      a: "Bon appétit !",
      o: ["Bon appétit !", "L'addition !", "Je vais prendre...", "Ça marche !"],
      ctx: "The expression said before every meal.",
    },
    {
      q: "You're ready to order. You tell the waiter: '_______ le poulet.'",
      a: "Je vais prendre",
      o: ["Je vais prendre", "Bon appétit", "L'addition", "Il faut"],
      ctx: "The expression meaning 'I'll have...' when ordering.",
    },
  ],
  combine: [
    {
      hint: "Starter (salad) + main (chicken) → Order a full meal",
      answer: "Comme entrée, une salade. Comme plat, le poulet.",
      accept: [
        "comme entree une salade comme plat le poulet",
        "comme entrée, une salade. comme plat, le poulet",
      ],
    },
    {
      hint: "Water + bread + check → Ask for water, bread, then the check",
      answer:
        "De l'eau et du pain, s'il vous plaît. L'addition, s'il vous plaît.",
      accept: [
        "de l'eau et du pain s'il vous plait l'addition s'il vous plait",
        "de l'eau et du pain, s'il vous plaît. l'addition, s'il vous plaît",
      ],
    },
    {
      hint: "Don't eat meat + prefer fish → Say you don't eat meat and prefer fish",
      answer: "Je ne mange pas de viande. Je préfère le poisson.",
      accept: [
        "je ne mange pas de viande je prefere le poisson",
        "je ne mange pas de viande. je préfère le poisson",
      ],
    },
  ],
  weave: [
    {
      en: "I'll have the chicken and some water, please. The fish is too expensive.",
      known: [
        "je",
        "prends",
        "le",
        "poulet",
        "de",
        "l'",
        "eau",
        "s'il vous plaît",
        "poisson",
        "est",
        "trop",
        "cher",
      ],
      sample:
        "Je prends le poulet and de l'eau, s'il vous plaît. Le poisson est trop cher.",
    },
    {
      en: "For starter, a salad. For main course, the fish. And some bread, please.",
      known: [
        "comme",
        "entrée",
        "une",
        "salade",
        "plat",
        "le",
        "poisson",
        "du",
        "pain",
        "s'il vous plaît",
      ],
      sample:
        "Comme entrée, une salade. Comme plat, le poisson. And du pain, s'il vous plaît.",
    },
    {
      en: "I don't eat meat. I'll have some cheese and some bread.",
      known: [
        "je",
        "ne",
        "mange",
        "pas",
        "de",
        "viande",
        "prends",
        "du",
        "fromage",
        "pain",
      ],
      sample:
        "Je ne mange pas de viande. Je prends du fromage and du pain.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Je prends le poulet et de la salade, s'il vous plaît.",
      q: "What is being ordered?",
      a: "Chicken and salad",
      o: [
        "Chicken and salad",
        "Fish and bread",
        "Chicken and cheese",
        "Salad and water",
      ],
    },
    {
      type: "odd",
      q: "Which is NOT a food?",
      items: ["poulet", "fromage", "addition", "salade"],
      a: "addition",
      reason: "Addition means the check/bill, not a food.",
    },
    {
      type: "context",
      situation: "You want tap water at a French restaurant.",
      a: "Une carafe d'eau, s'il vous plaît",
      o: [
        "Une carafe d'eau, s'il vous plaît",
        "De l'eau cher",
        "Du eau",
        "L'eau addition",
      ],
    },
    {
      type: "fill_ctx",
      s: "Je ne mange pas ___ viande.",
      a: "de",
      o: ["de", "du", "de la", "des"],
      ctx: "Negation: pas de (not pas du!).",
    },
  ],
  sayIt: [
    {
      situation:
        "You're at a restaurant. Order a full meal: starter, main course, and a drink.",
      target: ["prends", "entrée", "plat", "salade", "poulet", "eau"],
    },
    {
      situation:
        "Tell the waiter you don't eat meat and ask for the check.",
      target: ["ne", "pas", "de", "viande", "addition", "plaît"],
    },
  ],
  miniConv: {
    topic: "Ordering food at a French restaurant",
    starter:
      "Bonsoir ! Bienvenue au restaurant. Voici le menu. Vous avez choisi ?",
  },
  expressions: [
    {
      fr: "Bon appétit",
      en: "Enjoy your meal",
      usage: "Said before every meal: 'Bon appétit, tout le monde !'",
      literal: "Good appetite",
    },
    {
      fr: "L'addition, s'il vous plaît",
      en: "The check, please",
      usage: "At a restaurant: 'L'addition, s'il vous plaît.'",
      literal: "The addition, if it pleases you",
    },
    {
      fr: "Je vais prendre...",
      en: "I'll have... / I'm going to take...",
      usage: "Ordering: 'Je vais prendre le poulet.' (I'll have the chicken.)",
      literal: "I am going to take",
    },
  ],
  grammarNuggets: [
    {
      title: "Du/de la = 'some' — a word English dropped but French kept",
      insight:
        "English used to say 'I'd like some of the bread.' Over centuries, English dropped 'some of the.' French kept it as 'du' (de + le). 'Du pain' is not weird French grammar — it's old grammar that English lost. Both languages started in the same place.",
      example:
        "du pain (some bread), de la viande (some meat), de l'eau (some water)",
    },
    {
      title: "After negation, du/de la collapses to just 'de'",
      insight:
        "'Je mange DU fromage' but 'Je ne mange PAS DE fromage.' When you negate, the partitive simplifies. Why? 'Some' implies existence; negation removes existence. No thing = no 'some.'",
      example: "J'ai du pain → Je n'ai pas de pain",
    },
  ],
  fauxAmis: [
    {
      fr: "entrée",
      looksLike: "entrée (main course in US English)",
      actualMeaning: "starter/appetizer",
      example:
        "Comme entrée, je prends la soupe. (As a starter, I'll have the soup.)",
    },
  ],
  cultureBite:
    "In France, the waiter will NEVER bring the check unless you ask. It's considered rude to rush diners. A meal is a social event, not a transaction. 'L'addition, s'il vous plaît' is how you signal you're ready to leave.",
  summary: [
    "Partitives: du, de la, de l', des",
    "Negative: pas de (not pas du!)",
    "Restaurant vocab: l'entrée, le plat, le dessert, l'addition",
    "Expression: bon appétit, je vais prendre",
  ],
};
