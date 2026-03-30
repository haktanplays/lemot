import type { Lesson } from "@/lib/types";

export const lesson3: Lesson = {
  id: 3,
  title: "Pronunciation II",
  sub: "Nasal vowels, the French r, and sounds that don't exist in English",
  icon: "Languages",
  level: "A1",
  difficulty: "easy",
  grammar: {
    title: "French Sounds — Part 2",
    sections: [
      {
        type: "intro",
        text: "This lesson covers the sounds that make French sound *French*. The nasal vowels, the throaty *r*, and the *u* sound are what give the language its distinctive character. None of these exist in English — but they're all learnable.",
      },
      {
        type: "block",
        label: "Nasal Vowels — The French Signature",
        items: [
          {
            fr: "on / om",
            en: "/ɔ̃/ — nasal 'oh'",
            note: "Say 'oh' but let air flow through your nose. Don't say the 'n'. 'Bon' = a nasal 'boh', NOT 'bonn'. 'Bonjour' starts with this sound.",
          },
          {
            fr: "an / am / en / em",
            en: "/ɑ̃/ — nasal 'ah'",
            note: "Say 'ah' through your nose. 'Grand' = a nasal 'grah'. 'En fait' = nasal 'ah' + feh. 'Restaurant' ends with this sound.",
          },
          {
            fr: "in / im / ain / ein",
            en: "/ɛ̃/ — nasal 'eh'",
            note: "Say 'eh' through your nose. 'Vin' (wine) = nasal 'veh'. 'Pain' (bread) = nasal 'peh'.",
          },
        ],
      },
      {
        type: "block",
        label: "The French R",
        items: [
          {
            fr: "r",
            en: "/ʁ/ — throaty, like a soft gargle",
            note: "NOT like English 'r' at all. Say 'h' as in 'hello' but tighten your throat slightly. It's produced at the back of the throat, near where you gargle. Think of it as a gentle throat clearing. Practice: say 'hose' but gargle the 'h' slightly → that's close to French 'rose'.",
          },
        ],
      },
      {
        type: "block",
        label: "The U Sound — Doesn't Exist in English",
        items: [
          {
            fr: "u",
            en: "/y/ — say 'ee' with rounded lips",
            note: "This is the hardest French sound for English speakers. Say 'ee' (as in 'see') but round your lips as if saying 'oo'. Keep your tongue in the 'ee' position but shape your lips for 'oo'. 'Rue' (street), 'tu' (you), 'du' (some).",
          },
          {
            fr: "u vs ou",
            en: "Two completely different sounds",
            note: "'Rue' (street) /ʁy/ vs 'roue' (wheel) /ʁu/. If you say 'ou' when you mean 'u', you'll say a different word. 'Tu' (you) vs 'tout' (all) — very different meanings.",
          },
        ],
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "bon / bonne",
            phonetic: "BOHN / BUN",
            ipa: "/bɔ̃/ /bɔn/",
            notes:
              "'Bon' is nasal (no 'n' sound). 'Bonne' the n IS pronounced because of the final e.",
          },
          {
            fr: "restaurant",
            phonetic: "reh-stoh-RAHN",
            ipa: "/ʁɛs.to.ʁɑ̃/",
            notes:
              "Three nasal-free syllables then a nasal ending. The final 't' is silent.",
          },
          {
            fr: "rue",
            phonetic: "RÜ",
            ipa: "/ʁy/",
            notes:
              "Throaty r + the u sound that doesn't exist in English.",
          },
        ],
      },
      {
        type: "culture",
        text: "Nasal vowels are a distinctive feature of French among Romance languages. Italian, Spanish, and Portuguese (mostly) don't have them. They evolved in medieval French when the nasal consonants 'n' and 'm' were absorbed into the preceding vowel. The spelling kept the 'n/m' but the sound changed.",
      },
      {
        type: "tip",
        text: "Quick test: pinch your nose while saying *bon*. If the sound changes, you're doing it right — the air was flowing through your nose. If it sounds the same, you're just saying 'bo' without nasalization.",
      },
    ],
    quickRecall: {
      q: "What's the difference between 'bon' and 'bonne'?",
      a: "'Bon' is nasal (no n), 'bonne' the n is pronounced",
      o: [
        "No difference",
        "'Bon' is nasal (no n), 'bonne' the n is pronounced",
        "'Bonne' is louder",
        "'Bon' is longer",
      ],
    },
  },
  examples: [
    {
      fr: "C'est un bon restaurant.",
      en: "It's a good restaurant.",
      bridge: "C'est un bon restaurant.",
    },
    {
      fr: "La rue est grande.",
      en: "The street is big.",
      bridge: "La rue est grande.",
    },
    {
      fr: "Du pain et du vin.",
      en: "Some bread and some wine.",
      bridge: "Du pain and du vin.",
    },
    {
      fr: "Il est content.",
      en: "He is happy.",
      bridge: "Il est content.",
    },
    {
      fr: "Bonjour monsieur, du vin rouge, s'il vous plaît.",
      en: "Hello sir, some red wine, please.",
      bridge: "Bonjour monsieur, du vin rouge, please.",
    },
    {
      fr: "C'est beau, la rue est très belle.",
      en: "It's beautiful, the street is very beautiful.",
      bridge: "C'est beau, la rue est très beautiful.",
    },
    {
      fr: "Un blanc et un rouge, s'il vous plaît.",
      en: "A white and a red, please.",
      bridge: "Un blanc and un rouge, please.",
    },
  ],
  fillFG: [
    {
      s: "It's a [___] restaurant.",
      a: "bon",
      o: ["bon", "bonne", "bien", "mal"],
      ctx: "Recommend a restaurant to a friend.",
    },
    {
      s: "The [___] is big.",
      a: "rue",
      o: ["rue", "roue", "roux", "riz"],
      ctx: "Describing a wide street in Paris.",
    },
    {
      s: "Some [___] and some wine.",
      a: "pain",
      o: ["pain", "pan", "panne", "pin"],
      ctx: "Ordering at a French bistro.",
    },
    {
      s: "He is [___].",
      a: "content",
      o: ["content", "contente", "contents", "contant"],
      ctx: "Your male friend looks cheerful.",
    },
    {
      s: "It's a [___] day.",
      a: "bon",
      o: ["bon", "beau", "bien", "grand"],
      ctx: "Comment on the nice weather.",
    },
  ],
  fillBlanks: [
    {
      s: "C'est un ___ restaurant.",
      a: "bon",
      o: ["bon", "bonne", "bien", "mal"],
      ctx: "Recommend it — the food is great.",
    },
    {
      s: "La ___ est grande.",
      a: "rue",
      o: ["rue", "roue", "riz", "roux"],
      ctx: "You're on a wide Parisian boulevard.",
    },
    {
      s: "Du ___ et du vin.",
      a: "pain",
      o: ["pain", "pin", "pan", "pont"],
      ctx: "At the table — bread and wine.",
    },
    {
      s: "Il est ___.",
      a: "content",
      o: ["content", "contente", "fatigué", "bon"],
      ctx: "He got good news. He's a man.",
    },
    {
      s: "C'est ___ bon !",
      a: "très",
      o: ["très", "un", "le", "trop"],
      ctx: "The food is really delicious.",
    },
  ],
  buildSentences: [
    {
      c: ["C'est", "un", "bon", "restaurant"],
      en: "It's a good restaurant",
      trap: ["bonne", "le"],
    },
    {
      c: ["La", "rue", "est", "grande"],
      en: "The street is big",
      trap: ["le", "petit"],
    },
    {
      c: ["Du", "pain", "et", "du", "vin"],
      en: "Some bread and some wine",
      trap: ["un", "le"],
    },
  ],
  quiz: [
    {
      q: "How do you produce a nasal vowel?",
      a: "Let air flow through your nose",
      o: [
        "Speak louder",
        "Let air flow through your nose",
        "Hold your tongue differently",
        "Speak slower",
      ],
    },
    {
      q: "What's the 'nose pinch' test for?",
      a: "Checking if you're nasalizing correctly",
      o: [
        "Testing hearing",
        "Checking if you're nasalizing correctly",
        "A breathing exercise",
        "Testing microphone",
      ],
    },
    {
      q: "The French 'r' is produced where?",
      a: "Back of the throat",
      o: [
        "Tip of the tongue",
        "Back of the throat",
        "The lips",
        "The teeth",
      ],
    },
    {
      q: "'Rue' (street) vs 'roue' (wheel) — what's different?",
      a: "The vowel: u /y/ vs ou /u/",
      o: [
        "The r sound",
        "The vowel: u /y/ vs ou /u/",
        "Nothing",
        "The stress",
      ],
    },
    {
      q: "Which does NOT contain a nasal vowel?",
      a: "café",
      o: ["bon", "restaurant", "pain", "café"],
      negative: true,
    },
    {
      q: "Why do French words have 'n' or 'm' that aren't pronounced?",
      a: "The n/m was absorbed into the vowel over centuries",
      o: [
        "It's a typo",
        "The n/m was absorbed into the vowel over centuries",
        "To look more Latin",
        "For grammatical reasons",
      ],
    },
  ],
  combine: [
    {
      hint: "It's + a + good + restaurant → Recommend a place",
      answer: "C'est un bon restaurant",
      accept: ["c'est un bon restaurant"],
    },
    {
      hint: "Some + bread + and + some + wine → Order at a bistro",
      answer: "Du pain et du vin",
      accept: ["du pain et du vin"],
    },
  ],
  weave: [
    {
      en: "It's a good restaurant. The street is big and beautiful.",
      known: [
        "c'est",
        "un",
        "bon",
        "restaurant",
        "la",
        "rue",
        "est",
        "grande",
        "et",
      ],
      sample:
        "C'est un bon restaurant. La rue est grande et beautiful.",
    },
    {
      en: "Some bread and some wine, please. He is happy.",
      known: [
        "du",
        "pain",
        "et",
        "vin",
        "s'il vous plaît",
        "il",
        "est",
        "content",
      ],
      sample:
        "Du pain et du vin, s'il vous plaît. Il est content.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "C'est un bon restaurant.",
      q: "What did you hear?",
      a: "It's a good restaurant",
      o: [
        "It's a good restaurant",
        "The street is big",
        "He is happy",
        "Some bread please",
      ],
    },
    {
      type: "odd",
      q: "Which word does NOT have a nasal vowel?",
      items: ["bon", "vin", "pain", "café"],
      a: "café",
      reason:
        "'Café' has no nasal. The others all contain nasal vowels.",
    },
    {
      type: "context",
      situation: "You're at a bistro. Order bread and wine.",
      a: "Du pain et du vin",
      o: [
        "Du pain et du vin",
        "Un café s'il vous plaît",
        "Je suis fatigué",
        "Ça marche",
      ],
    },
    {
      type: "fill_ctx",
      s: "Je ___ américain.",
      a: "suis",
      o: ["suis", "est", "es", "sommes"],
      ctx: "Introduce yourself. (Lesson 5 — être)",
    },
  ],
  sayIt: [
    {
      situation:
        "You're at a bistro. Describe the food: a good restaurant, some bread and wine.",
      target: ["bon", "restaurant", "pain", "vin", "rue"],
    },
    {
      situation:
        "Tell someone that he is happy and the street is beautiful.",
      target: ["il", "content", "rue", "beau", "très"],
    },
  ],
  miniConv: {
    topic:
      "Describing food, places, and things using nasal vowels and French sounds",
    starter: "Bonjour ! Tu connais un bon restaurant ici ?",
  },
  expressions: [
    {
      fr: "Bon...",
      en: "Well... / Right...",
      usage: "'Bon, on commence ?' (Well, shall we start?)",
      literal: "Good",
    },
    {
      fr: "Allez !",
      en: "Come on! / Let's go!",
      usage: "Encouraging a friend: 'Allez, on y va !'",
      literal: "Go",
    },
    {
      fr: "Hein ?",
      en: "Huh? / Right?",
      usage: "'C'est bien, hein ?' (It's good, right?)",
      literal: "Huh",
    },
  ],
  grammarNuggets: [
    {
      title: "N/M after a vowel is a command, not a sound",
      insight:
        "When you see 'on,' 'an,' 'in' — the n is NOT a sound you pronounce. It's an instruction: 'nasalize the vowel before me, then disappear.' See n/m as a command, and every nasal word becomes predictable.",
      example: "bon = /bɔ̃/ — the n disappears, the o becomes nasal",
    },
    {
      title: "U vs OU changes the meaning entirely",
      insight:
        "'Tu' (you) vs 'tout' (all), 'rue' (street) vs 'roue' (wheel). This is not a subtle accent — it's a meaning-changing distinction. Lips do the work: 'ee' tongue + 'oo' lips = French U.",
      example: "dessus (on top) vs dessous (underneath)",
    },
  ],
  cultureBite:
    "The French R is not rolled (that's Spanish/Italian). It's a soft friction at the back of the throat — like a gentle gargle or the sound before clearing your throat. Parisians barely pronounce it at all.",
  summary: [
    "Nasal vowels: on, an, in, un",
    "The French U sound",
    "The French R",
    "Expression: bon, allez, hein",
  ],
};
