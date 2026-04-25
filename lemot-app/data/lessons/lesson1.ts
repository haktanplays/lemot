import type { Lesson } from "@/lib/types";

export const lesson1: Lesson = {
  id: 1,
  title: "Survival Kit",
  sub: "Your first 10 minutes in France",
  icon: "Compass",
  level: "A1",
  difficulty: "easy",
  grammar: {
    title: "Survival Phrases",
    sections: [
      {
        type: "intro",
        text: "Before any grammar rules, let's start with phrases you'll need on your very first day in France. Never start talking to a French person without saying *bonjour* first — skipping it is considered *très impoli* (very rude).",
      },
      {
        type: "block",
        label: "Greetings",
        items: [
          {
            fr: "Bonjour",
            en: "Hello (daytime)",
            note: "Mandatory when entering a shop, meeting anyone, even in an elevator. Skip it and you're rude.",
          },
          {
            fr: "Bonsoir",
            en: "Good evening",
            note: "Replaces Bonjour after ~6 PM.",
          },
          {
            fr: "Salut",
            en: "Hi (casual)",
            note: "Friends only. Never to your boss.",
          },
          {
            fr: "Au revoir",
            en: "Goodbye",
            note: "Literally: 'until seeing again.' Revoir = re + voir. Same root as English 'review.'",
          },
        ],
      },
      {
        type: "block",
        label: "Polite Requests",
        items: [
          {
            fr: "S'il vous plaît",
            en: "Please",
            note: "Word for word: 'if it pleases you.'",
          },
          {
            fr: "Merci beaucoup",
            en: "Thank you very much",
            note: "Merci shares a Latin root with English 'mercy.'",
          },
          {
            fr: "Je voudrais...",
            en: "I would like...",
            note: "Politer than 'je veux' (I want). Like 'I'd like' vs 'I want' in English.",
          },
        ],
      },
      {
        type: "block",
        label: "When You're Stuck",
        items: [
          {
            fr: "Je ne comprends pas",
            en: "I don't understand",
            note: "'Comprendre' = cognate of 'comprehend.' Latin com + prehendere (to seize).",
          },
          {
            fr: "Pouvez-vous répéter ?",
            en: "Can you repeat?",
            note: "'Répéter' = cognate of 'repeat.' Same Latin root (repetere).",
          },
        ],
      },
      {
        type: "block",
        label: "Pronunciation: Silent Final Letters & the CaReFuL Rule",
        items: [
          {
            fr: "The CaReFuL Rule",
            en: "C, R, F, L are usually pronounced at the end of words",
            note: "Think 'CaReFuL' — these four consonants are the exceptions to the silent-final-letter rule. Examples: avec (C), bonjour (R), actif (F), hôtel (L).",
          },
          {
            fr: "Silent endings",
            en: "Most other final consonants are silent",
            note: "The -s, -t, -d, -x, -z, -p at the end of French words are almost always silent: 'beaucoup' (the p is silent), 'est' (the st is silent), 'français' (the s is silent).",
          },
          {
            fr: "bonjour → bon-ZHOOR",
            en: "The R is pronounced (CaReFuL!)",
            note: "Final R is pronounced: bonjour, revoir, monsieur. The French R is throaty, like a soft gargle.",
          },
          {
            fr: "avec → ah-VEK",
            en: "The C is pronounced (CaReFuL!)",
            note: "Final C is pronounced: avec, parc, lac.",
          },
        ],
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "Bonjour",
            phonetic: "bohn-ZHOOR",
            ipa: "/bɔ̃.ʒuʁ/",
            notes:
              "'zh' as in 'pleasure'. 'on' is nasal — don't say the 'n'.",
          },
          {
            fr: "Je voudrais",
            phonetic: "zhuh voo-DREH",
            ipa: "/ʒə vu.dʁɛ/",
            notes:
              "'zh' as in 'vision'. French 'r' is throaty, like a soft gargle.",
          },
          {
            fr: "S'il vous plaît",
            phonetic: "seel voo PLEH",
            ipa: "/sil vu plɛ/",
            notes: "'plaît' rhymes with 'met', not 'plate'.",
          },
        ],
      },
      {
        type: "tip",
        text: "*Je voudrais...* works everywhere — cafés, restaurants, hotels, ticket counters. One pattern, a hundred situations.",
      },
      {
        type: "tip",
        text: "Remember *CaReFuL*: C, R, F, L are the consonants typically pronounced at the end of French words. All other final consonants are usually silent. This one mnemonic will save you hundreds of pronunciation mistakes.",
      },
    ],
    quickRecall: {
      q: "'Répéter' is a cognate of which English word?",
      a: "Repeat",
      o: ["Repeat", "Repair", "Report", "Replace"],
    },
  },
  examples: [
    {
      fr: "Bonjour, je voudrais un café, s'il vous plaît.",
      en: "Hello, I would like a coffee, please.",
      bridge: "Hello, je would like un café, please.",
    },
    {
      fr: "Excusez-moi, où est la gare ?",
      en: "Excuse me, where is the station?",
      bridge: "Excuse me, où est la station?",
    },
    {
      fr: "Merci beaucoup, au revoir !",
      en: "Thank you very much, goodbye!",
      bridge: "Merci beaucoup, goodbye!",
    },
    {
      fr: "Je ne comprends pas. Pouvez-vous répéter ?",
      en: "I don't understand. Can you repeat?",
      bridge: "Je ne comprends pas. Can you répéter?",
    },
    {
      fr: "Bonjour, je voudrais une baguette, s'il vous plaît.",
      en: "Hello, I would like a baguette, please.",
      bridge: "Hello, je would like une baguette, please.",
    },
    {
      fr: "Excusez-moi, je voudrais réserver une table.",
      en: "Excuse me, I would like to book a table.",
      bridge: "Excuse me, je would like réserver a table.",
    },
    {
      fr: "Bonsoir ! Merci, au revoir.",
      en: "Good evening! Thanks, goodbye.",
      bridge: "Good evening! Merci, goodbye.",
    },
  ],
  fillFG: [
    {
      s: "I [___] a coffee, please.",
      a: "voudrais",
      o: ["voudrais", "comprends", "suis", "faut"],
      ctx: "You're ordering politely at a café.",
      fr: "Je voudrais un café, s'il vous plaît.",
    },
    {
      s: "[___] me, where is the station?",
      a: "Excusez",
      o: ["Excusez", "Merci", "Bonjour", "Salut"],
      ctx: "You need to get someone's attention on the street.",
      fr: "Excusez-moi, où est la gare ?",
    },
    {
      s: "I don't [___].",
      a: "comprends",
      o: ["comprends", "voudrais", "parle", "suis"],
      ctx: "Someone is speaking too fast.",
      fr: "Je ne comprends pas.",
    },
    {
      s: "Thank you very much, [___]!",
      a: "au revoir",
      o: ["au revoir", "bonjour", "merci", "salut"],
      ctx: "You're leaving a shop.",
      fr: "Merci beaucoup, au revoir !",
    },
    {
      s: "Hello, I [___] like a croissant.",
      a: "voudrais",
      o: ["voudrais", "suis", "faut", "comprends"],
      ctx: "You're at a bakery counter, ordering politely.",
      fr: "Bonjour, je voudrais un croissant.",
    },
  ],
  fillBlanks: [
    {
      s: "___, je voudrais un café.",
      a: "Bonjour",
      o: ["Bonjour", "Au revoir", "Merci", "Salut"],
      ctx: "It's 10 AM. Greet the waiter before ordering.",
    },
    {
      s: "Excusez-moi, ___ est la gare ?",
      a: "où",
      o: ["où", "qui", "quand", "comment"],
      ctx: "You're lost. Ask where the station is.",
    },
    {
      s: "Je ne ___ pas.",
      a: "comprends",
      o: ["comprends", "parle", "voudrais", "suis"],
      ctx: "Someone spoke too fast. Tell them.",
    },
    {
      s: "Merci beaucoup, ___ !",
      a: "au revoir",
      o: ["au revoir", "bonjour", "salut", "merci"],
      ctx: "You're leaving after a nice interaction.",
    },
    {
      s: "Je ___ un croissant, s'il vous plaît.",
      a: "voudrais",
      o: ["voudrais", "suis", "comprends", "faut"],
      ctx: "Order a croissant politely at the counter.",
    },
  ],
  buildSentences: [
    {
      c: ["Je", "voudrais", "un", "café"],
      en: "I would like a coffee",
      trap: ["suis", "pas"],
    },
    {
      c: ["Où", "est", "la", "gare"],
      en: "Where is the station?",
      trap: ["un", "je"],
    },
    {
      c: ["Merci", "beaucoup", "au", "revoir"],
      en: "Thank you, goodbye",
      trap: ["bonjour", "est"],
    },
    {
      c: ["Je", "ne", "comprends", "pas"],
      en: "I don't understand",
      trap: ["suis", "où"],
    },
  ],
  quiz: [
    {
      q: "What should you say first when entering a shop?",
      a: "Bonjour",
      o: ["Merci", "Bonjour", "Au revoir", "Ça va"],
      ctx: "It's a Tuesday afternoon.",
    },
    {
      q: "Which phrase is the polite way to order?",
      a: "Je voudrais...",
      o: ["Je veux...", "Je voudrais...", "Je suis...", "Je comprends..."],
    },
    {
      q: "It's 8 PM. How do you greet someone?",
      a: "Bonsoir",
      o: ["Bonjour", "Bonsoir", "Salut", "Merci"],
      ctx: "Evening event at a colleague's home.",
    },
    {
      q: "'Comprendre' is a cognate of...?",
      a: "Comprehend",
      o: ["Comprehend", "Compress", "Compare", "Complete"],
    },
    {
      q: "You're talking to your boss. Which greeting should you NEVER use?",
      a: "Salut",
      o: ["Bonjour", "Bonsoir", "Salut", "Excusez-moi"],
      ctx: "Monday morning at the office.",
      negative: true,
    },
    {
      q: "'Au revoir' literally means...",
      a: "Until seeing again",
      o: [
        "Goodbye forever",
        "Until seeing again",
        "Good day",
        "See you later",
      ],
    },
    {
      q: "A waiter brings your coffee and says '_______, monsieur.'",
      a: "Voilà",
      o: ["Voilà", "Pardon", "Comme ci, comme ça", "Merci"],
      ctx: "The expression used when handing something over.",
    },
    {
      q: "Which consonants are usually pronounced at the end of French words? (CaReFuL rule)",
      a: "C, R, F, L",
      o: ["C, R, F, L", "S, T, D, X", "B, P, G, M", "N, V, W, Z"],
      ctx: "The CaReFuL mnemonic helps you remember.",
    },
  ],
  combine: [
    {
      hint: "Greet + polite request + coffee → Order at a café",
      answer: "Bonjour, je voudrais un café, s'il vous plaît",
      accept: [
        "bonjour je voudrais un cafe s'il vous plait",
        "bonjour je voudrais un café s'il vous plaît",
        "bonjour, je voudrais un café, s'il vous plaît",
      ],
    },
    {
      hint: "Excuse me + where + station → Ask for directions",
      answer: "Excusez-moi, où est la gare",
      accept: [
        "excusez-moi où est la gare",
        "excusez-moi, où est la gare",
        "excusez moi ou est la gare",
      ],
    },
    {
      hint: "I don't understand + can you repeat → When you're stuck",
      answer: "Je ne comprends pas. Pouvez-vous répéter",
      accept: [
        "je ne comprends pas pouvez-vous répéter",
        "je ne comprends pas. pouvez-vous répéter",
        "je ne comprends pas pouvez vous repeter",
      ],
    },
  ],
  weave: [
    {
      en: "I understand and I would still like a coffee, please.",
      known: [
        "je",
        "comprends",
        "voudrais",
        "café",
        "s'il vous plaît",
      ],
      sample:
        "Je comprends and je voudrais still a café, s'il vous plaît.",
    },
    {
      en: "Hello, I don't understand. Where is the station?",
      known: [
        "bonjour",
        "je",
        "ne",
        "comprends",
        "pas",
        "où",
        "est",
      ],
      sample: "Bonjour, je ne comprends pas. Où est the station?",
    },
    {
      en: "Excuse me, I would like a croissant. Thank you, goodbye!",
      known: [
        "excusez-moi",
        "je",
        "voudrais",
        "merci",
        "au revoir",
      ],
      sample:
        "Excusez-moi, je voudrais a croissant. Merci, au revoir!",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Bonjour, je voudrais un café, s'il vous plaît.",
      q: "What is the person doing?",
      a: "Ordering a coffee",
      o: [
        "Ordering a coffee",
        "Asking for directions",
        "Saying goodbye",
        "Introducing themselves",
      ],
    },
    {
      type: "odd",
      q: "Which does NOT belong?",
      items: ["Bonjour", "Bonsoir", "Salut", "Merci"],
      a: "Merci",
      reason: "First three are greetings. Merci is 'thank you.'",
    },
    {
      type: "context",
      situation: "Someone spoke too fast and you didn't catch it.",
      a: "Pouvez-vous répéter ?",
      o: [
        "Pouvez-vous répéter ?",
        "Ça marche",
        "Au revoir",
        "Merci beaucoup",
      ],
    },
    {
      type: "context",
      situation: "You bump into someone on the metro.",
      a: "Pardon !",
      o: ["Pardon !", "Voilà !", "Comme ci, comme ça", "Bonjour"],
    },
  ],
  sayIt: [
    {
      situation:
        "You walk into a bakery in Paris. Greet the baker and order something.",
      target: ["bonjour", "voudrais", "s'il vous plaît"],
    },
    {
      situation:
        "You're lost and need to find the train station. Ask a stranger for help.",
      target: ["excusez", "où", "gare", "comprends"],
    },
  ],
  miniConv: {
    topic: "Ordering at a café and asking for directions",
    starter: "Bonjour ! Bienvenue. Qu'est-ce que vous voulez ?",
  },
  expressions: [
    {
      fr: "Voilà",
      en: "There you go / Here it is",
      usage: "A waiter hands you coffee: 'Voilà, monsieur.'",
      literal: "See there",
    },
    {
      fr: "Pardon",
      en: "Sorry / Excuse me",
      usage: "Bumping into someone on the metro: 'Oh, pardon !'",
      literal: "Pardon",
    },
    {
      fr: "Comme ci, comme ça",
      en: "So-so",
      usage: "'Ça va ?' — 'Comme ci, comme ça.'",
      literal: "Like this, like that",
    },
  ],
  grammarNuggets: [
    {
      title: "Politeness lives in the verb form",
      insight:
        "In English, 'please' is just a word you add. In French, the verb FORM carries politeness: 'je veux' (I want — rude) vs 'je voudrais' (I would like — polite). The polite form IS the default.",
      example:
        "Je voudrais un café (polite) vs Je veux un café (demanding)",
    },
    {
      title: "Ne...pas is a sandwich",
      insight:
        "French negation wraps AROUND the verb like bread around a filling: Je NE comprends PAS. This 'sandwich' pattern is the single most important structural insight in French.",
      example: "Je ne comprends pas — ne...pas hugs the verb",
    },
  ],
  fauxAmis: [
    {
      fr: "baguette",
      looksLike: "baguette (just bread)",
      actualMeaning:
        "Any stick-shaped object — a magic wand (baguette magique), chopsticks (baguettes), a conductor's baton",
      example: "Harry Potter a une baguette magique.",
    },
  ],
  cultureBite:
    "Never start talking to a French person without saying 'bonjour' first. Skipping it is like starting an English conversation with 'Give me a coffee.' It's not optional — it's the social contract.",
  summary: [
    "Greetings: bonjour, bonsoir, salut",
    "Polite ordering: je voudrais + s'il vous plaît",
    "The ne...pas sandwich for negation",
    "CaReFuL rule: C, R, F, L are pronounced at end of words",
    "Expression: voilà, pardon, comme ci comme ça",
  ],
};
