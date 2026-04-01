import type { Lesson } from "@/lib/types";

export const lesson6: Lesson = {
  id: 6,
  title: "Aller: Where Are You Going?",
  sub: "Go places and make plans",
  icon: "MapPin",
  level: "A1",
  difficulty: "medium",
  grammar: {
    title: "Aller — To Go",
    sections: [
      {
        type: "intro",
        text: "*Aller* is the third essential verb (after être and avoir). It does double duty: getting you around AND making future plans. *Je vais manger* = I'm going to eat.",
      },
      {
        type: "conjugation",
        verb: "aller — to go",
        rows: [
          { pr: "Je", conj: "vais", en: "I go/am going", pron: "/ʒə vɛ/" },
          { pr: "Tu", conj: "vas", en: "You go", pron: "/ty va/" },
          { pr: "Il/Elle", conj: "va", en: "He/She goes", pron: "/il va/" },
          { pr: "Nous", conj: "allons", en: "We go", pron: "/nu.za.lɔ̃/" },
          { pr: "Vous", conj: "allez", en: "You go", pron: "/vu.za.le/" },
          { pr: "Ils/Elles", conj: "vont", en: "They go", pron: "/il vɔ̃/" },
        ],
      },
      {
        type: "block",
        label: "Near Future: aller + infinitive",
        items: [
          {
            fr: "Je vais manger.",
            en: "I'm going to eat.",
            note: "Aller + infinitive = near future. Simple and very common!",
          },
          {
            fr: "Elle va partir.",
            en: "She's going to leave.",
            note: "Same pattern: conjugated aller + infinitive verb.",
          },
          {
            fr: "Nous allons travailler.",
            en: "We're going to work.",
            note: "Works with any verb after aller.",
          },
        ],
      },
      {
        type: "block",
        label: "Place Prepositions",
        items: [
          {
            fr: "à",
            en: "to/at",
            note: "Basic preposition for places. Je vais à Paris.",
          },
          {
            fr: "au (à + le)",
            en: "to the (masculine)",
            note: "Au restaurant, au cinéma. Contraction of à + le.",
          },
          {
            fr: "à la",
            en: "to the (feminine)",
            note: "À la gare, à la boulangerie. No contraction with feminine.",
          },
          {
            fr: "aux (à + les)",
            en: "to the (plural)",
            note: "Aux toilettes, aux États-Unis. Contraction of à + les.",
          },
          {
            fr: "en",
            en: "to/in (countries, transport)",
            note: "En France, en bus. Used with feminine countries and transport.",
          },
        ],
      },
      {
        type: "tip",
        text: "*On* is the casual 'we' in spoken French. *On va au resto ?* = Shall we go to the restaurant? You'll hear *on* far more often than *nous* in daily conversation.",
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "allons",
            phonetic: "ah-LOHN",
            ipa: "/a.lɔ̃/",
            notes:
              "The -ons ending is a deep nasal 'oh' — don't say the 'n'. Let the sound resonate in your nose.",
          },
          {
            fr: "vont",
            phonetic: "vohn",
            ipa: "/vɔ̃/",
            notes:
              "Same nasal as 'on' — lips round, sound through the nose. Never 'vont' with a hard 't'.",
          },
          {
            fr: "on",
            phonetic: "ohn",
            ipa: "/ɔ̃/",
            notes:
              "Pure nasal vowel. No 'n' sound at the end. Practice: say 'oh' but route it through your nose.",
          },
        ],
      },
      {
        type: "culture",
        text: "The French love their future plans. 'On va prendre un café ?' (Shall we grab a coffee?) is the most common social invitation. *On* = informal 'we'.",
      },
    ],
    quickRecall: {
      q: "How do you say 'I'm going to eat'?",
      a: "Je vais manger",
      o: [
        "Je vais manger",
        "Je mange",
        "J'ai mangé",
        "Je suis manger",
      ],
    },
  },
  examples: [
    {
      fr: "Je vais au restaurant.",
      en: "I'm going to the restaurant.",
      bridge: "Je vais au restaurant.",
    },
    {
      fr: "On va à la gare.",
      en: "We're going to the station.",
      bridge: "On va à la station.",
    },
    {
      fr: "Elle va manger ce soir.",
      en: "She's going to eat tonight.",
      bridge: "Elle va eat ce soir.",
    },
    {
      fr: "Nous allons travailler demain.",
      en: "We're going to work tomorrow.",
      bridge: "Nous allons work demain.",
    },
    {
      fr: "Tu vas en France ?",
      en: "Are you going to France?",
      bridge: "Tu vas en France?",
    },
    {
      fr: "Ils vont aux États-Unis.",
      en: "They're going to the United States.",
      bridge: "Ils vont aux United States.",
    },
    {
      fr: "On va prendre un café ?",
      en: "Shall we grab a coffee?",
      bridge: "On va take un café?",
    },
  ],
  fillFG: [
    {
      s: "I [___] to the restaurant.",
      a: "vais",
      o: ["vais", "suis", "ai", "vas"],
      ctx: "Going somewhere — aller.",
    },
    {
      s: "She's [___] eat tonight.",
      a: "va",
      o: ["va", "vais", "est", "a"],
      ctx: "Near future: elle + va + infinitive.",
    },
    {
      s: "We're going [___] the station.",
      a: "à la",
      o: ["à la", "au", "à", "en"],
      ctx: "Gare is feminine → à la gare.",
    },
    {
      s: "They're going [___] the restaurant.",
      a: "au",
      o: ["au", "à la", "à", "en"],
      ctx: "Restaurant is masculine → au restaurant.",
    },
    {
      s: "We're [___] work tomorrow.",
      a: "allons",
      o: ["allons", "sommes", "avons", "vont"],
      ctx: "Near future: nous + allons + infinitive.",
    },
  ],
  fillBlanks: [
    {
      s: "Je ___ au restaurant.",
      a: "vais",
      o: ["vais", "suis", "ai", "vas"],
      ctx: "I'm going to the restaurant.",
    },
    {
      s: "Elle ___ manger ce soir.",
      a: "va",
      o: ["va", "vais", "est", "a"],
      ctx: "She's going to eat tonight.",
    },
    {
      s: "On va ___ la gare.",
      a: "à",
      o: ["à", "au", "en", "aux"],
      ctx: "To the station — à la gare (feminine).",
    },
    {
      s: "Ils ___ en France.",
      a: "vont",
      o: ["vont", "vais", "allons", "allez"],
      ctx: "They go to France.",
    },
    {
      s: "Nous ___ travailler demain.",
      a: "allons",
      o: ["allons", "sommes", "avons", "allez"],
      ctx: "We're going to work tomorrow.",
    },
  ],
  buildSentences: [
    {
      c: ["Je", "vais", "au", "restaurant"],
      en: "I'm going to the restaurant.",
      trap: ["suis", "le"],
    },
    {
      c: ["Elle", "va", "manger", "ce", "soir"],
      en: "She's going to eat tonight.",
      trap: ["est", "a"],
    },
    {
      c: ["On", "va", "à", "la", "gare"],
      en: "We're going to the station.",
      trap: ["au", "est"],
    },
    {
      c: ["On", "va", "prendre", "un", "café"],
      en: "Shall we grab a coffee?",
      trap: ["est", "a"],
    },
  ],
  quiz: [
    {
      q: "'Je vais manger' is...",
      a: "Near future (I'm going to eat)",
      o: [
        "Near future (I'm going to eat)",
        "Present (I eat)",
        "Past (I ate)",
        "Command (Eat!)",
      ],
    },
    {
      q: "'Au restaurant' = ?",
      a: "à + le = au",
      o: [
        "à + le = au",
        "à + la = au",
        "à + les = au",
        "à + un = au",
      ],
      ctx: "Contraction: à + le → au.",
    },
    {
      q: "How do you say 'We're going to work'?",
      a: "Nous allons travailler",
      o: [
        "Nous allons travailler",
        "Nous sommes travailler",
        "Nous avons travailler",
        "Nous travaillons",
      ],
    },
    {
      q: "Which preposition for feminine countries?",
      a: "en",
      o: ["en", "au", "à la", "aux"],
      ctx: "En France, en Italie.",
    },
    {
      q: "What's the near future structure?",
      a: "aller + infinitive",
      o: [
        "aller + infinitive",
        "être + infinitive",
        "avoir + infinitive",
        "faire + infinitive",
      ],
    },
    {
      q: "'On' in casual French usually means...",
      a: "We (informal)",
      o: ["We (informal)", "He", "They", "One (formal)"],
      ctx: "On va au resto ? = Shall we go to the restaurant?",
    },
    {
      q: "Everyone's ready to leave the café. You say: 'Bon, _______ !'",
      a: "on y va",
      o: ["on y va", "je m'en vais", "ça va aller", "il faut"],
      ctx: "The expression meaning 'let's go / here we go'.",
    },
    {
      q: "Your friend is stressed about an exam. You reassure them: 'Ne t'inquiète pas, _______.'",
      a: "ça va aller",
      o: ["ça va aller", "on y va", "je m'en vais", "il faut partir"],
      ctx: "The expression meaning 'it's going to be OK'.",
    },
  ],
  combine: [
    {
      hint: "Going to restaurant + tonight → Say you're going to the restaurant tonight",
      answer: "Je vais au restaurant ce soir.",
      accept: ["je vais au restaurant ce soir"],
    },
    {
      hint: "Suggest coffee + casual 'we' → Invite a friend for coffee",
      answer: "On va prendre un café ?",
      accept: [
        "on va prendre un cafe",
        "on va prendre un café",
        "on va prendre un café ?",
      ],
    },
    {
      hint: "Going to work + tomorrow morning → Say you're going to work tomorrow morning",
      answer: "Je vais travailler demain matin.",
      accept: ["je vais travailler demain matin"],
    },
  ],
  weave: [
    {
      en: "I'm going to the restaurant tonight. We're going to eat well.",
      known: [
        "je",
        "vais",
        "au",
        "restaurant",
        "ce",
        "soir",
        "on",
        "va",
        "manger",
        "bien",
      ],
      sample:
        "Je vais au restaurant ce soir. On va manger bien.",
    },
    {
      en: "She's going to eat and he's going to work. We're going to take a coffee.",
      known: [
        "elle",
        "va",
        "manger",
        "il",
        "travailler",
        "nous",
        "allons",
        "prendre",
        "un",
        "café",
      ],
      sample:
        "Elle va manger and il va travailler. Nous allons prendre un café.",
    },
    {
      en: "Are you going to France? They're going to the United States.",
      known: [
        "tu",
        "vas",
        "en",
        "France",
        "ils",
        "vont",
        "aux",
        "États-Unis",
      ],
      sample:
        "Tu vas en France? Ils vont aux États-Unis.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Nous allons manger au restaurant ce soir.",
      q: "What's the plan?",
      a: "Eating at a restaurant tonight",
      o: [
        "Eating at a restaurant tonight",
        "Working tomorrow",
        "Going to the park",
        "Having coffee",
      ],
    },
    {
      type: "odd",
      q: "Which is NOT a form of 'aller'?",
      items: ["vais", "allons", "vont", "avons"],
      a: "avons",
      reason: "Avons is from 'avoir' (to have), not 'aller' (to go).",
    },
    {
      type: "context",
      situation:
        "You want to suggest grabbing a coffee with a friend, casually.",
      a: "On va prendre un café ?",
      o: [
        "On va prendre un café ?",
        "Nous allons au travail",
        "Je vais en France",
        "Il va manger",
      ],
    },
    {
      type: "fill_ctx",
      s: "Elle ___ manger ce soir.",
      a: "va",
      o: ["va", "vais", "est", "a"],
      ctx: "She's going to eat — near future.",
    },
  ],
  sayIt: [
    {
      situation:
        "Tell a friend about your plans for tonight and tomorrow using the near future.",
      target: ["vais", "va", "ce", "soir", "demain", "manger", "travailler"],
    },
    {
      situation:
        "Invite a friend to go somewhere using 'on' and suggest a place.",
      target: ["on", "va", "au", "prendre", "café", "restaurant"],
    },
  ],
  miniConv: {
    topic: "Making plans and talking about where you're going",
    starter:
      "Salut ! Tu fais quoi ce soir ? On va au restaurant ?",
  },
  expressions: [
    {
      fr: "On y va !",
      en: "Let's go! / Here we go!",
      usage: "Leaving a café: 'Bon, on y va !'",
      literal: "One there goes",
    },
    {
      fr: "Je m'en vais",
      en: "I'm leaving / I'm off",
      usage: "'Bon, je m'en vais ! À demain !'",
      literal: "I take myself from here",
    },
    {
      fr: "Ça va aller",
      en: "It's going to be OK",
      usage: "'Ne t'inquiète pas, ça va aller.'",
      literal: "That is going to go",
    },
  ],
  grammarNuggets: [
    {
      title: "Contractions are a sound preference, not a grammar exception",
      insight:
        "'À le' sounds clunky → contracts to 'au.' 'À les' → 'aux.' 'De le' → 'du.' 'De les' → 'des.' French is obsessed with smooth sound flow. Once you see contractions as sound preference, they all become logical.",
      example:
        "au restaurant (à + le), aux toilettes (à + les), du pain (de + le)",
    },
    {
      title: "Aller + infinitive IS the real future tense",
      insight:
        "Textbooks teach 'je mangerai' (I will eat) as the future. But in everyday speech, 'je vais manger' (I'm going to eat) is used far more often. Just like English: 'I'm going to eat' beats 'I shall eat.' The near future isn't a stepping stone — it IS how French people talk.",
      example:
        "Je vais partir (everyday) vs Je partirai (formal/written)",
    },
  ],
  fauxAmis: [
    {
      fr: "aller",
      looksLike: "alley",
      actualMeaning: "to go",
      example: "Je vais au cinéma. (I'm going to the cinema.)",
    },
  ],
  cultureBite:
    "'On y va' is the French equivalent of 'Let's bounce' or 'Let's roll.' The 'y' means 'there' — but nobody specifies where. It's the universal signal that it's time to move, whether leaving a restaurant, starting a hike, or beginning a meeting.",
  summary: [
    "Aller conjugation: je vais, tu vas, il/elle va...",
    "Near future: aller + infinitive (je vais manger)",
    "Place prepositions: à, au, à la, aux, en",
    "On = casual 'we' (on va au resto ?)",
  ],
};
