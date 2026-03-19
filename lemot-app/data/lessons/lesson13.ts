import type { Lesson } from "@/lib/types";

export const lesson13: Lesson = {
  id: 13,
  title: "Aller: Where & When",
  sub: "Go places and make plans",
  icon: "MapPin",
  level: "A1",
  grammar: {
    title: "Aller \u2014 To Go",
    sections: [
      {
        type: "intro",
        text: "*Aller* is the third essential verb (after \u00eatre and avoir). It does double duty: getting you around AND making future plans. *Je vais manger* = I'm going to eat.",
      },
      {
        type: "conjugation",
        verb: "aller \u2014 to go",
        rows: [
          { pr: "Je", conj: "vais", en: "I go/am going", pron: "/\u0292\u0259 v\u025b/" },
          { pr: "Tu", conj: "vas", en: "You go", pron: "/ty va/" },
          { pr: "Il/Elle", conj: "va", en: "He/She goes", pron: "/il va/" },
          { pr: "Nous", conj: "allons", en: "We go", pron: "/nu.za.l\u0254\u0303/" },
          { pr: "Vous", conj: "allez", en: "You go", pron: "/vu.za.le/" },
          { pr: "Ils/Elles", conj: "vont", en: "They go", pron: "/il v\u0254\u0303/" },
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
        label: "Directions",
        items: [
          {
            fr: "\u00e0 gauche",
            en: "to the left",
            note: "Gauche = left. Also means 'awkward' (being left-handed was considered clumsy).",
          },
          {
            fr: "\u00e0 droite",
            en: "to the right",
            note: "Droite \u2248 direct/straight.",
          },
          {
            fr: "tout droit",
            en: "straight ahead",
            note: "Tout = all. Droit = straight. Keep going straight!",
          },
          {
            fr: "devant / derri\u00e8re",
            en: "in front / behind",
            note: "Devant \u2248 avant-garde (in front of the guard).",
          },
          {
            fr: "pr\u00e8s / loin",
            en: "near / far",
            note: "Pr\u00e8s d'ici = nearby. Loin d'ici = far from here.",
          },
        ],
      },
      {
        type: "tip",
        text: "*Aller + \u00e0* contracts: \u00e0 + le = *au* (au restaurant), \u00e0 + les = *aux* (aux toilettes). But \u00e0 + la stays *\u00e0 la* (\u00e0 la gare).",
      },
      {
        type: "culture",
        text: "The French love their future plans. 'On va prendre un caf\u00e9 ?' (Shall we grab a coffee?) is the most common social invitation. *On* = informal 'we'.",
      },
    ],
    quickRecall: {
      q: "How do you say 'I'm going to eat'?",
      a: "Je vais manger",
      o: [
        "Je vais manger",
        "Je mange",
        "J'ai mang\u00e9",
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
      fr: "Tu vas \u00e0 gauche.",
      en: "You go left.",
      bridge: "Tu vas \u00e0 left.",
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
      fr: "C'est tout droit, puis \u00e0 droite.",
      en: "It's straight ahead, then right.",
      bridge: "C'est tout droit, puis \u00e0 right.",
    },
    {
      fr: "Le restaurant est devant la gare.",
      en: "The restaurant is in front of the station.",
      bridge: "Le restaurant est in front la gare.",
    },
    {
      fr: "On va prendre un caf\u00e9 ?",
      en: "Shall we grab a coffee?",
      bridge: "On va take un caf\u00e9?",
    },
  ],
  fillFG: [
    {
      s: "I [___] to the restaurant.",
      a: "vais",
      o: ["vais", "suis", "ai", "vas"],
      ctx: "Going somewhere \u2014 aller.",
    },
    {
      s: "She's [___] eat tonight.",
      a: "va",
      o: ["va", "vais", "est", "a"],
      ctx: "Near future: elle + va + infinitive.",
    },
    {
      s: "Turn [___] (left).",
      a: "\u00e0 gauche",
      o: ["\u00e0 gauche", "\u00e0 droite", "tout droit", "devant"],
      ctx: "Left = gauche.",
    },
    {
      s: "It's [___] ahead.",
      a: "tout droit",
      o: ["tout droit", "\u00e0 gauche", "\u00e0 droite", "derri\u00e8re"],
      ctx: "Straight = tout droit.",
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
      s: "C'est tout ___.",
      a: "droit",
      o: ["droit", "droite", "gauche", "loin"],
      ctx: "Straight ahead.",
    },
    {
      s: "Le parc est ___ la maison.",
      a: "devant",
      o: ["devant", "derri\u00e8re", "dans", "sur"],
      ctx: "In front of the house.",
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
      c: ["C'est", "tout", "droit", "puis", "\u00e0", "gauche"],
      en: "It's straight then left.",
      trap: ["droite", "devant"],
    },
    {
      c: ["On", "va", "prendre", "un", "caf\u00e9"],
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
      q: "'\u00c0 gauche' means...",
      a: "To the left",
      o: ["To the left", "To the right", "Straight ahead", "Behind"],
    },
    {
      q: "'Au restaurant' = ?",
      a: "\u00e0 + le = au",
      o: [
        "\u00e0 + le = au",
        "\u00e0 + la = au",
        "\u00e0 + les = au",
        "\u00e0 + un = au",
      ],
      ctx: "Contraction: \u00e0 + le \u2192 au.",
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
      q: "'Devant' means...",
      a: "In front of",
      o: ["In front of", "Behind", "Next to", "Far from"],
      ctx: "Devant \u2248 avant-garde.",
    },
    {
      q: "What's the near future structure?",
      a: "aller + infinitive",
      o: [
        "aller + infinitive",
        "\u00eatre + infinitive",
        "avoir + infinitive",
        "faire + infinitive",
      ],
    },
  ],
  combine: [
    {
      hint: "Going to restaurant + tonight \u2192 Say you're going to the restaurant tonight",
      answer: "Je vais au restaurant ce soir.",
      accept: ["je vais au restaurant ce soir"],
    },
    {
      hint: "Straight + then left + station \u2192 Give directions to the station",
      answer:
        "C'est tout droit, puis \u00e0 gauche. La gare est devant.",
      accept: [
        "c'est tout droit puis a gauche la gare est devant",
        "c'est tout droit, puis \u00e0 gauche. la gare est devant",
      ],
    },
    {
      hint: "Going to work + tomorrow morning \u2192 Say you're going to work tomorrow morning",
      answer: "Je vais travailler demain matin.",
      accept: ["je vais travailler demain matin"],
    },
  ],
  franglais: [
    {
      en: "I'm going to the restaurant tonight. It's straight ahead then to the left.",
      known: [
        "je",
        "vais",
        "au",
        "restaurant",
        "ce",
        "soir",
        "c'est",
        "tout",
        "droit",
        "puis",
        "\u00e0",
        "gauche",
      ],
      sample:
        "Je vais au restaurant ce soir. C'est tout droit, puis \u00e0 gauche.",
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
        "caf\u00e9",
      ],
      sample:
        "Elle va manger and il va travailler. Nous allons prendre un caf\u00e9.",
    },
    {
      en: "The station is behind the park. Go right, it's not far.",
      known: [
        "la",
        "gare",
        "est",
        "derri\u00e8re",
        "le",
        "parc",
        "\u00e0",
        "droite",
        "c'est",
        "pas",
        "loin",
      ],
      sample:
        "La gare est derri\u00e8re le parc. Go \u00e0 droite, c'est pas loin.",
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
      q: "Which is NOT a direction?",
      items: ["gauche", "droite", "devant", "demain"],
      a: "demain",
      reason: "Demain means 'tomorrow', not a direction.",
    },
    {
      type: "context",
      situation:
        "Someone asks you where the station is. It's straight ahead.",
      a: "C'est tout droit",
      o: [
        "C'est tout droit",
        "C'est \u00e0 gauche",
        "C'est derri\u00e8re",
        "C'est loin",
      ],
    },
    {
      type: "fill_ctx",
      s: "Je ne mange ___ de viande. (Lesson 11)",
      a: "jamais",
      o: ["jamais", "pas", "rien", "plus"],
      ctx: "I never eat meat. Cross-reference L11.",
    },
    {
      type: "fill_ctx",
      s: "Elle ___ manger ce soir.",
      a: "va",
      o: ["va", "vais", "est", "a"],
      ctx: "She's going to eat \u2014 near future.",
    },
    {
      type: "franglais",
      en: "I'm going to the park.",
      blanks: [
        { word: "going", answer: "vais" },
        { word: "park", answer: "parc" },
      ],
      full: "Je vais au parc.",
    },
  ],
  sayIt: [
    {
      situation:
        "Give someone directions to the restaurant: it's straight ahead, then left, in front of the station.",
      target: [
        "tout",
        "droit",
        "gauche",
        "devant",
        "gare",
        "restaurant",
      ],
    },
    {
      situation:
        "Tell a friend your plans for tonight and tomorrow.",
      target: ["vais", "ce", "soir", "demain", "manger", "travailler"],
    },
  ],
  miniConv: {
    topic: "Giving directions and making plans with aller",
    starter:
      "Pardon, excusez-moi. O\u00f9 est la gare, s'il vous pla\u00eet ?",
  },
};
