import type { Lesson } from "@/lib/types";

export const lesson6: Lesson = {
  id: 6,
  title: "Avoir: What You Have",
  sub: "The verb of feelings, age & needs",
  icon: "Heart",
  level: "A1",
  difficulty: "medium",
  grammar: {
    title: "Avoir — To Have",
    sections: [
      {
        type: "intro",
        text: "In English, you ARE hungry, you ARE 20 years old. In French, you HAVE hunger, you HAVE 20 years. *Avoir* is the verb of states, feelings, and possession.",
      },
      {
        type: "conjugation",
        verb: "avoir — to have",
        rows: [
          { pr: "J'", conj: "ai", en: "I have", pron: "/ʒe/" },
          { pr: "Tu", conj: "as", en: "You have", pron: "/ty a/" },
          { pr: "Il/Elle", conj: "a", en: "He/She has", pron: "/il a/" },
          { pr: "Nous", conj: "avons", en: "We have", pron: "/nu.za.vɔ̃/" },
          { pr: "Vous", conj: "avez", en: "You have", pron: "/vu.za.ve/" },
          { pr: "Ils/Elles", conj: "ont", en: "They have", pron: "/il.zɔ̃/" },
        ],
      },
      {
        type: "block",
        label: "Avoir Expressions (states & feelings)",
        items: [
          {
            fr: "J'ai faim",
            en: "I'm hungry (I have hunger)",
            note: "French uses avoir for physical states, not être.",
          },
          {
            fr: "J'ai soif",
            en: "I'm thirsty (I have thirst)",
            note: "Same pattern: avoir + noun.",
          },
          {
            fr: "J'ai chaud / froid",
            en: "I'm hot / cold",
            note: "Never say 'je suis chaud' — that means something very different!",
          },
          {
            fr: "J'ai peur",
            en: "I'm afraid (I have fear)",
            note: "Fear ≈ peur. Add 'de' for what you fear: j'ai peur de l'eau.",
          },
          {
            fr: "J'ai 20 ans",
            en: "I'm 20 years old",
            note: "Age uses avoir: 'J'ai vingt ans' = I have 20 years. Ans ≈ annual.",
          },
          {
            fr: "J'ai besoin de",
            en: "I need (I have need of)",
            note: "Always followed by 'de': j'ai besoin de dormir.",
          },
        ],
      },
      {
        type: "tip",
        text: "Quick way to remember: if it's a *feeling* or *state*, use *avoir*. If it's a *description* or *identity*, use *être*. You ARE a student (être), but you HAVE hunger (avoir).",
      },
      {
        type: "etymology",
        pairs: [
          {
            fr: "raison",
            en: "reason",
            root: "Latin 'ratio' → French raison. 'Tu as raison' = You have reason = You're right.",
          },
          {
            fr: "tort",
            en: "tort/wrong",
            root: "Latin 'tortus' (twisted) → French tort. 'Il a tort' = He has wrong = He's wrong.",
          },
          {
            fr: "mal",
            en: "malady/bad",
            root: "Latin 'malum' → French mal. 'J'ai mal' = I have pain. Cognate: malady, malice.",
          },
        ],
      },
      {
        type: "culture",
        text: "In French, you don't *feel* emotions — you *have* them. This isn't just grammar, it reflects a different way of relating to feelings. You have fear, you have hunger, you have reason.",
      },
    ],
    quickRecall: {
      q: "How do you say 'I'm hungry' in French?",
      a: "J'ai faim",
      o: ["Je suis faim", "J'ai faim", "Je suis fatigué", "J'ai mangé"],
    },
  },
  examples: [
    {
      fr: "J'ai vingt ans.",
      en: "I'm twenty years old.",
      bridge: "J'ai twenty ans.",
    },
    {
      fr: "Tu as faim ?",
      en: "Are you hungry?",
      bridge: "Tu as hungry?",
    },
    {
      fr: "Elle a trois enfants.",
      en: "She has three children.",
      bridge: "Elle a three children.",
    },
    {
      fr: "Nous avons un problème.",
      en: "We have a problem.",
      bridge: "Nous avons un problème.",
    },
    {
      fr: "Vous avez raison.",
      en: "You're right.",
      bridge: "Vous avez right.",
    },
    {
      fr: "Ils ont soif.",
      en: "They're thirsty.",
      bridge: "Ils ont thirsty.",
    },
    {
      fr: "J'ai besoin de partir.",
      en: "I need to leave.",
      bridge: "J'ai besoin de leave.",
    },
  ],
  fillFG: [
    {
      s: "I [___] twenty years old.",
      a: "ai",
      o: ["ai", "suis", "est", "as"],
      ctx: "Telling someone your age.",
    },
    {
      s: "She [___] afraid of dogs.",
      a: "a peur",
      o: ["a peur", "est peur", "a faim", "est peur de"],
      ctx: "Expressing fear — avoir, not être.",
    },
    {
      s: "We [___] a problem.",
      a: "avons",
      o: ["avons", "sommes", "ont", "êtes"],
      ctx: "Nous + avoir.",
    },
    {
      s: "You (formal) [___] right.",
      a: "avez raison",
      o: ["avez raison", "êtes raison", "avez tort", "avez faim"],
      ctx: "Telling someone they're correct.",
    },
    {
      s: "I [___] to leave now.",
      a: "ai besoin de",
      o: ["ai besoin de", "suis besoin", "ai faim de", "ai peur de"],
      ctx: "Expressing a need.",
    },
  ],
  fillBlanks: [
    {
      s: "J'___ vingt ans.",
      a: "ai",
      o: ["ai", "suis", "est", "as"],
      ctx: "Your age — avoir, not être.",
    },
    {
      s: "Tu ___ faim ?",
      a: "as",
      o: ["as", "es", "ai", "a"],
      ctx: "Asking if someone is hungry.",
    },
    {
      s: "Elle ___ trois enfants.",
      a: "a",
      o: ["a", "est", "ai", "ont"],
      ctx: "She has three children.",
    },
    {
      s: "Nous ___ un problème.",
      a: "avons",
      o: ["avons", "sommes", "ont", "êtes"],
      ctx: "We have a problem.",
    },
    {
      s: "Ils ___ soif.",
      a: "ont",
      o: ["ont", "sont", "avons", "avez"],
      ctx: "They are thirsty — avoir!",
    },
  ],
  buildSentences: [
    {
      c: ["J'", "ai", "vingt", "ans"],
      en: "I'm twenty years old.",
      trap: ["suis", "est"],
    },
    {
      c: ["Tu", "as", "faim", "?"],
      en: "Are you hungry?",
      trap: ["es", "soif"],
    },
    {
      c: ["Elle", "a", "besoin", "de", "partir"],
      en: "She needs to leave.",
      trap: ["est", "suis"],
    },
    {
      c: ["Vous", "avez", "raison"],
      en: "You're right.",
      trap: ["êtes", "tort"],
    },
  ],
  quiz: [
    {
      q: "How do you say 'I'm cold' in French?",
      a: "J'ai froid",
      o: ["J'ai froid", "Je suis froid", "J'ai chaud", "Je suis froid"],
      ctx: "Physical state = avoir",
    },
    {
      q: "What does 'Tu as tort' mean?",
      a: "You're wrong",
      o: ["You're wrong", "You're right", "You're tired", "You have a cake"],
      ctx: "Tort ≈ tort (wrong)",
    },
    {
      q: "Complete: 'J'ai ___ de dormir'",
      a: "besoin",
      o: ["besoin", "faim", "peur", "raison"],
      ctx: "I need to sleep",
    },
    {
      q: "Which uses ÊTRE, not avoir?",
      a: "Je suis fatigué",
      o: ["Je suis fatigué", "J'ai faim", "J'ai peur", "J'ai chaud"],
      negative: true,
      ctx: "Fatigue is a description (être), not a state (avoir)",
    },
    {
      q: "How old is someone who says 'J'ai trente ans'?",
      a: "30",
      o: ["30", "13", "3", "20"],
      ctx: "Trente = thirty",
    },
    {
      q: "'Nous avons' means...",
      a: "We have",
      o: ["We have", "We are", "They have", "You have"],
      ctx: "Nous = we, avons = have",
    },
    {
      q: "You finally finish a long project. You exclaim: '_______, j'ai fini !'",
      a: "Ça y est",
      o: ["Ça y est", "J'en ai marre", "Il y a", "C'est bon"],
      ctx: "The expression meaning 'that's it / it's done / finally!'",
    },
    {
      q: "It's been raining for days. You say: '_______ de la pluie !'",
      a: "J'en ai marre",
      o: ["J'en ai marre", "Ça y est", "Il y a", "C'est pas grave"],
      ctx: "The expression meaning 'I'm fed up'.",
    },
  ],
  combine: [
    {
      hint: "Hungry + need food → Express that you're hungry and need to eat",
      answer: "J'ai faim, j'ai besoin de manger.",
      accept: [
        "j'ai faim j'ai besoin de manger",
        "j'ai faim, j'ai besoin de manger",
      ],
    },
    {
      hint: "Your age + right about something → Say your age and agree with someone",
      answer: "J'ai vingt ans et vous avez raison.",
      accept: [
        "j'ai vingt ans et vous avez raison",
        "j'ai 20 ans et vous avez raison",
      ],
    },
    {
      hint: "Cold + need to leave → Say you're cold and need to leave",
      answer: "J'ai froid, j'ai besoin de partir.",
      accept: [
        "j'ai froid j'ai besoin de partir",
        "j'ai froid, j'ai besoin de partir",
      ],
    },
  ],
  weave: [
    {
      en: "I'm hungry and she's thirsty. We need water.",
      known: [
        "j'ai",
        "faim",
        "elle",
        "a",
        "soif",
        "nous",
        "avons",
        "besoin",
        "eau",
      ],
      sample:
        "J'ai faim and elle a soif. Nous avons besoin d'water.",
    },
    {
      en: "You're right, I'm twenty years old and I'm afraid of dogs.",
      known: ["tu", "as", "raison", "j'ai", "vingt", "ans", "peur"],
      sample:
        "Tu as raison, j'ai vingt ans and j'ai peur of dogs.",
    },
    {
      en: "They have a problem. He's wrong and she's right.",
      known: [
        "ils",
        "ont",
        "un",
        "problème",
        "il",
        "a",
        "tort",
        "elle",
        "raison",
      ],
      sample:
        "Ils ont un problème. Il a tort and elle a raison.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "J'ai très faim aujourd'hui.",
      q: "What is the speaker feeling?",
      a: "Very hungry",
      o: ["Very hungry", "Very thirsty", "Very cold", "Very tired"],
    },
    {
      type: "odd",
      q: "Which does NOT use avoir?",
      items: ["J'ai faim", "J'ai peur", "Je suis content", "J'ai froid"],
      a: "Je suis content",
      reason: "Content/happy uses être (description), not avoir.",
    },
    {
      type: "context",
      situation: "You're at a friend's house. It's freezing inside.",
      a: "J'ai froid",
      o: ["J'ai froid", "J'ai chaud", "Je suis froid", "J'ai faim"],
    },
    {
      type: "fill_ctx",
      s: "Elle ___ besoin de partir.",
      a: "a",
      o: ["a", "est", "ai", "ont"],
      ctx: "She needs to leave. (avoir)",
    },
    {
      type: "context",
      situation: "Someone asks your age. You're 25.",
      a: "J'ai vingt-cinq ans",
      o: [
        "J'ai vingt-cinq ans",
        "Je suis vingt-cinq",
        "J'ai vingt-cinq",
        "Je suis vingt-cinq ans",
      ],
    },
    {
      type: "fill_ctx",
      s: "Je ___ content. (Lesson 5 — être)",
      a: "suis",
      o: ["suis", "ai", "as", "est"],
      ctx: "Happy = description = être, not avoir.",
    },
    {
      type: "weave",
      en: "I'm hungry and I need coffee.",
      blanks: [
        { word: "hungry", answer: "faim" },
        { word: "need", answer: "besoin" },
      ],
      full: "J'ai faim et j'ai besoin de café.",
    },
    {
      type: "context",
      situation: "You look in the fridge and see a cat inside. You say:",
      a: "Il y a un chat dans le frigo !",
      o: ["Il y a un chat dans le frigo !", "J'en ai marre du chat", "Ça y est, le chat", "J'ai peur du chat"],
    },
  ],
  sayIt: [
    {
      situation:
        "You arrive at a friend's place feeling hungry, thirsty, and cold. Tell them how you feel.",
      target: ["j'ai", "faim", "soif", "froid"],
    },
    {
      situation:
        "Introduce yourself: your age, that you're a student, and what you need.",
      target: ["ai", "ans", "suis", "étudiant", "besoin"],
    },
  ],
  miniConv: {
    topic: "Talking about how you feel and what you need using avoir",
    starter:
      "Salut ! Ça va ? Tu as faim ? On peut manger quelque chose.",
  },
  expressions: [
    {
      fr: "J'en ai marre",
      en: "I'm fed up / I've had it",
      usage: "'J'en ai marre de la pluie !' (I'm fed up with the rain!)",
      literal: "I of-it have fed-up",
    },
    {
      fr: "Il y a",
      en: "There is / There are",
      usage: "'Il y a un chat dans le jardin.' (There's a cat in the garden.)",
      literal: "It there has",
    },
    {
      fr: "Ça y est",
      en: "That's it / It's done / Finally!",
      usage: "'Ça y est, j'ai fini !' (That's it, I'm done!)",
      literal: "That there is",
    },
  ],
  grammarNuggets: [
    {
      title: "French POSSESSES feelings, English IDENTIFIES with them",
      insight:
        "English: 'I AM hungry' — hunger is your identity. French: 'J'AI faim' — hunger is something you carry. French treats emotions as temporary possessions. You HAVE fear, you HAVE cold, you HAVE hunger. More manageable — they're something you hold, not something you become.",
      example:
        "J'ai faim (I have hunger), J'ai peur (I have fear), J'ai froid (I have cold)",
    },
    {
      title: "Je suis chaud ≠ I am hot (temperature)",
      insight:
        "This is the most famous avoir-vs-être mistake. 'J'ai chaud' = I feel hot (temperature). 'Je suis chaud' = I'm keen/eager (slang) or has sexual connotations. The être/avoir distinction isn't just grammar — getting it wrong changes meaning dramatically.",
      example:
        "J'AI chaud (I feel hot) vs Je SUIS chaud (I'm keen — slang)",
    },
  ],
  fauxAmis: [
    {
      fr: "j'ai chaud",
      looksLike: "I am hot",
      actualMeaning:
        "I feel warm/hot (temperature) — uses avoir, not être",
      example:
        "J'ai chaud, ouvre la fenêtre ! (I'm hot, open the window!)",
    },
  ],
  cultureBite:
    "'Il y a' literally means 'it there has' — French says 'there HAS' where English says 'there IS.' This is because avoir (to have) is the default existence verb in French. If something exists somewhere, French says the place 'has' it.",
  summary: [
    "Avoir conjugation: j'ai, tu as, il/elle a...",
    "Avoir for states: faim, soif, peur, chaud, froid",
    "Il y a = there is/are",
    "Expression: j'en ai marre, ça y est",
  ],
};
