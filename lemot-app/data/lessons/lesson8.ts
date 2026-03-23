import type { Lesson } from "@/lib/types";

export const lesson8: Lesson = {
  id: 8,
  title: "Numbers & Time",
  sub: "Count, tell time, and handle money",
  icon: "Clock",
  level: "A1",
  grammar: {
    title: "Numbers & Time",
    sections: [
      {
        type: "intro",
        text: "Numbers are the first thing you need at shops, restaurants, and train stations. French numbers are mostly logical... until you hit 70 and 80. We'll start with 1-20 and time.",
      },
      {
        type: "block",
        label: "Numbers 1-10",
        items: [
          {
            fr: "1 un, 2 deux, 3 trois, 4 quatre, 5 cinq",
            en: "1, 2, 3, 4, 5",
            note: "Deux ≈ dual, trois ≈ trio, quatre ≈ quarter. Cognates help!",
          },
          {
            fr: "6 six, 7 sept, 8 huit, 9 neuf, 10 dix",
            en: "6, 7, 8, 9, 10",
            note: "Six ≈ six, sept ≈ September (7th month of Roman calendar), dix ≈ decimal.",
          },
        ],
      },
      {
        type: "block",
        label: "Numbers 11-20",
        items: [
          {
            fr: "11 onze, 12 douze, 13 treize",
            en: "11, 12, 13",
            note: "Douze ≈ dozen!",
          },
          {
            fr: "14 quatorze, 15 quinze, 16 seize",
            en: "14, 15, 16",
            note: "Seize ≈ sixteen (old English).",
          },
          {
            fr: "17 dix-sept, 18 dix-huit, 19 dix-neuf, 20 vingt",
            en: "17, 18, 19, 20",
            note: "17-19 = 'ten-seven', 'ten-eight', 'ten-nine'. Logical!",
          },
        ],
      },
      {
        type: "block",
        label: "Tens",
        items: [
          {
            fr: "20 vingt, 30 trente, 40 quarante, 50 cinquante, 60 soixante",
            en: "20-60",
            note: "Pattern: base + -ante. Quarante ≈ quarantine (40 days)!",
          },
        ],
      },
      {
        type: "tip",
        text: "For 21-29: vingt et un (21), vingt-deux (22)... For 31-39: trente et un (31), trente-deux (32)... Always *et un* for X1, then hyphens.",
      },
      {
        type: "block",
        label: "Telling Time",
        items: [
          {
            fr: "Il est trois heures.",
            en: "It's 3 o'clock.",
            note: "Heure ≈ hour. Always plural except 'une heure' (1 o'clock).",
          },
          {
            fr: "Il est midi / minuit.",
            en: "It's noon / midnight.",
            note: "Midi ≈ midday. Minuit = 'middle of night'.",
          },
          {
            fr: "Il est huit heures et demie.",
            en: "It's 8:30.",
            note: "Et demie = and half. Demi ≈ demi/half.",
          },
          {
            fr: "Il est neuf heures et quart.",
            en: "It's 9:15.",
            note: "Et quart = and quarter. Quart ≈ quarter.",
          },
        ],
      },
      {
        type: "block",
        label: "Money & Prices",
        items: [
          {
            fr: "Ça coûte combien ?",
            en: "How much does it cost?",
            note: "Combien = how much/many. Coûter = to cost.",
          },
          {
            fr: "Ça coûte dix euros.",
            en: "It costs ten euros.",
            note: "Euro ≈ euro. Same word in most languages!",
          },
          {
            fr: "C'est cher !",
            en: "That's expensive!",
            note: "Cher ≈ cherish (something precious costs more).",
          },
        ],
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "cinq",
            phonetic: "sank",
            ipa: "/sɛ̃k/",
            notes:
              "The final -q is silent in isolation but pronounced before vowels.",
          },
          {
            fr: "huit",
            phonetic: "weet",
            ipa: "/ɥit/",
            notes: "The 'h' is silent. Starts with a 'w' sound.",
          },
          {
            fr: "vingt",
            phonetic: "van",
            ipa: "/vɛ̃/",
            notes:
              "The -gt is silent! Just 'van'. In vingt et un, the -t is pronounced.",
          },
        ],
      },
    ],
    quickRecall: {
      q: "How do you say 'It's 3 o'clock'?",
      a: "Il est trois heures",
      o: [
        "Il est trois heures",
        "Il a trois heures",
        "C'est trois",
        "Il est trois",
      ],
    },
  },
  examples: [
    {
      fr: "Il est huit heures.",
      en: "It's eight o'clock.",
      bridge: "Il est eight heures.",
    },
    {
      fr: "Ça coûte combien ?",
      en: "How much does it cost?",
      bridge: "Ça costs combien?",
    },
    {
      fr: "J'ai vingt-cinq ans.",
      en: "I'm twenty-five years old.",
      bridge: "J'ai twenty-five ans.",
    },
    {
      fr: "Il est midi et demi.",
      en: "It's half past noon.",
      bridge: "Il est midi et half.",
    },
    {
      fr: "Ça coûte quinze euros.",
      en: "It costs fifteen euros.",
      bridge: "Ça coûte fifteen euros.",
    },
    {
      fr: "Il est neuf heures et quart.",
      en: "It's quarter past nine.",
      bridge: "Il est nine heures et quart.",
    },
    {
      fr: "C'est trop cher !",
      en: "That's too expensive!",
      bridge: "C'est trop expensive!",
    },
  ],
  fillCross: [
    {
      s: "It's [___] o'clock (3:00).",
      a: "trois heures",
      o: [
        "trois heures",
        "trois heure",
        "trente heures",
        "treize heures",
      ],
      ctx: "3:00 — remember 'heures' is plural.",
    },
    {
      s: "How [___] does it cost?",
      a: "combien",
      o: ["combien", "comment", "quoi", "cher"],
      ctx: "Asking the price.",
    },
    {
      s: "It costs [___] euros (15).",
      a: "quinze",
      o: ["quinze", "cinq", "cinquante", "quatorze"],
      ctx: "Quinze = 15.",
    },
    {
      s: "It's [___] (12:30 PM).",
      a: "midi et demi",
      o: [
        "midi et demi",
        "minuit et demi",
        "douze heures",
        "midi et quart",
      ],
      ctx: "Noon + half.",
    },
    {
      s: "That's too [___]!",
      a: "cher",
      o: ["cher", "bon", "grand", "petit"],
      ctx: "Expressing something is expensive.",
    },
  ],
  fillBlanks: [
    {
      s: "Il est ___ heures.",
      a: "trois",
      o: ["trois", "trente", "treize", "trios"],
      ctx: "Three o'clock.",
    },
    {
      s: "Ça coûte ___ ?",
      a: "combien",
      o: ["combien", "comment", "cher", "quoi"],
      ctx: "How much?",
    },
    {
      s: "Il est midi et ___.",
      a: "demi",
      o: ["demi", "quart", "midi", "heure"],
      ctx: "Half past noon.",
    },
    {
      s: "Ça coûte vingt ___.",
      a: "euros",
      o: ["euros", "heures", "ans", "francs"],
      ctx: "Twenty euros.",
    },
    {
      s: "C'est trop ___ !",
      a: "cher",
      o: ["cher", "bon", "grand", "petit"],
      ctx: "Too expensive!",
    },
  ],
  buildSentences: [
    {
      c: ["Il", "est", "trois", "heures"],
      en: "It's three o'clock.",
      trap: ["a", "midi"],
    },
    {
      c: ["Ça", "coûte", "combien", "?"],
      en: "How much does it cost?",
      trap: ["comment", "cher"],
    },
    {
      c: ["Il", "est", "midi", "et", "demi"],
      en: "It's half past noon.",
      trap: ["minuit", "quart"],
    },
    {
      c: ["C'est", "trop", "cher"],
      en: "That's too expensive.",
      trap: ["très", "bon"],
    },
  ],
  quiz: [
    {
      q: "What is 'quinze'?",
      a: "15",
      o: ["15", "50", "5", "14"],
      ctx: "Quinze = 15. Not cinquante (50).",
    },
    {
      q: "How do you say 9:15?",
      a: "Neuf heures et quart",
      o: [
        "Neuf heures et quart",
        "Neuf heures et demi",
        "Neuf et quart",
        "Neuf quart heures",
      ],
    },
    {
      q: "'Ça coûte combien ?' means...",
      a: "How much does it cost?",
      o: [
        "How much does it cost?",
        "What time is it?",
        "Where is it?",
        "How is it?",
      ],
    },
    {
      q: "What does 'C'est cher' mean?",
      a: "It's expensive",
      o: ["It's expensive", "It's cheap", "It's hot", "It's far"],
      ctx: "Cher ≈ cherish = precious = expensive.",
    },
    {
      q: "'Vingt' is pronounced like...",
      a: "van (silent -gt)",
      o: [
        "van (silent -gt)",
        "vingt (say everything)",
        "ving-t",
        "vint",
      ],
    },
    {
      q: "Il est minuit means...",
      a: "It's midnight",
      o: ["It's midnight", "It's noon", "It's late", "It's early"],
      ctx: "Minuit = mi (middle) + nuit (night).",
    },
  ],
  combine: [
    {
      hint: "Time (8:30) + expensive → Say it's 8:30 and it's too expensive",
      answer: "Il est huit heures et demie et c'est trop cher.",
      accept: [
        "il est huit heures et demie et c'est trop cher",
        "il est huit heures et demi et c'est trop cher",
      ],
    },
    {
      hint: "Price (15 euros) + age (25) → Say something costs 15 euros and you're 25",
      answer: "Ça coûte quinze euros et j'ai vingt-cinq ans.",
      accept: [
        "ca coute quinze euros et j'ai vingt-cinq ans",
        "ça coûte quinze euros et j'ai vingt-cinq ans",
      ],
    },
    {
      hint: "Noon + hungry → Say it's noon and you're hungry",
      answer: "Il est midi et j'ai faim.",
      accept: ["il est midi et j'ai faim", "il est midi, j'ai faim"],
    },
  ],
  crossing: [
    {
      en: "It's three o'clock and I'm hungry. How much does a coffee cost?",
      known: [
        "il",
        "est",
        "trois",
        "heures",
        "j'ai",
        "faim",
        "combien",
        "coûte",
        "un",
        "café",
      ],
      sample:
        "Il est trois heures and j'ai faim. Combien coûte un café?",
    },
    {
      en: "It's half past noon. That's too expensive! I have fifteen euros.",
      known: [
        "il",
        "est",
        "midi",
        "et",
        "demi",
        "c'est",
        "trop",
        "cher",
        "j'ai",
        "quinze",
        "euros",
      ],
      sample:
        "Il est midi et demi. C'est trop cher! J'ai quinze euros.",
    },
    {
      en: "She's twenty years old and he's thirty. It's nine fifteen.",
      known: [
        "elle",
        "a",
        "vingt",
        "ans",
        "il",
        "trente",
        "est",
        "neuf",
        "heures",
        "quart",
      ],
      sample:
        "Elle a vingt ans and il a trente. Il est neuf heures et quart.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Il est huit heures et quart.",
      q: "What time is it?",
      a: "8:15",
      o: ["8:15", "8:30", "8:45", "4:08"],
    },
    {
      type: "odd",
      q: "Which is NOT a number?",
      items: ["quinze", "vingt", "cher", "dix"],
      a: "cher",
      reason:
        "Cher means expensive. The others are numbers (15, 20, 10).",
    },
    {
      type: "context",
      situation:
        "You're at a market. You want to know the price of bread.",
      a: "Ça coûte combien ?",
      o: [
        "Ça coûte combien ?",
        "Il est quelle heure ?",
        "Où est le pain ?",
        "J'ai faim",
      ],
    },
    {
      type: "fill_ctx",
      s: "J'___ trente ans. (Lesson 6 — avoir)",
      a: "ai",
      o: ["ai", "suis", "est", "as"],
      ctx: "Age uses avoir. Cross-reference L6.",
    },
    {
      type: "fill_ctx",
      s: "Il est ___ et demi.",
      a: "midi",
      o: ["midi", "minuit", "douze", "heure"],
      ctx: "12:30 PM = midi et demi.",
    },
    {
      type: "crossing",
      en: "It costs ten euros.",
      blanks: [
        { word: "costs", answer: "coûte" },
        { word: "ten", answer: "dix" },
      ],
      full: "Ça coûte dix euros.",
    },
    {
      type: "context",
      situation:
        "A waiter tells you 'Ça fait vingt-deux euros.' How much is it?",
      a: "22 euros",
      o: ["22 euros", "20 euros", "12 euros", "32 euros"],
    },
  ],
  sayIt: [
    {
      situation:
        "You're shopping. Ask the price of something, react to it being expensive, and say what time it is.",
      target: ["combien", "coûte", "cher", "heures", "est"],
    },
    {
      situation:
        "Tell someone your age, what time you wake up, and that you're hungry at noon.",
      target: ["ai", "ans", "heures", "midi", "faim"],
    },
  ],
  miniConv: {
    topic: "Discussing prices and time in everyday situations",
    starter:
      "Bonjour ! Vous voulez acheter quelque chose ? Ça coûte dix euros.",
  },
};
