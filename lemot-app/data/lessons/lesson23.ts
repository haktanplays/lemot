import type { Lesson } from "@/lib/types";

export const lesson23: Lesson = {
  id: 23,
  title: "Venir, Prendre",
  sub: "Come, take, and longer sentences",
  icon: "ArrowRightLeft",
  level: "A1",
  difficulty: "hard",
  grammar: {
    title: "Venir & Prendre",
    sections: [
      {
        type: "intro",
        text: "Two more powerhouse irregular verbs. *Venir* (to come) unlocks the recent past: *je viens de manger* = I just ate. *Prendre* (to take) is everywhere in daily French — taking the bus, taking a coffee, taking a decision. Plus: a preview of *qui* and *que* for longer sentences.",
      },
      {
        type: "conjugation",
        verb: "venir (to come)",
        rows: [
          { pr: "je", conj: "viens", en: "I come", pron: "VYEHN" },
          { pr: "tu", conj: "viens", en: "you come", pron: "VYEHN" },
          { pr: "il/elle", conj: "vient", en: "he/she comes", pron: "VYEHN" },
          { pr: "nous", conj: "venons", en: "we come", pron: "vuh-NOHN" },
          { pr: "vous", conj: "venez", en: "you come", pron: "vuh-NAY" },
          { pr: "ils/elles", conj: "viennent", en: "they come", pron: "VYENN" },
        ],
      },
      {
        type: "block",
        label: "Venir de + Infinitive = Just Did Something",
        items: [
          { fr: "Je viens de manger", en: "I just ate", note: "Literally: 'I come from eating'" },
          { fr: "Elle vient de partir", en: "She just left", note: "Literally: 'She comes from leaving'" },
          { fr: "Nous venons d'arriver", en: "We just arrived", note: "De + vowel → d'" },
          { fr: "Tu viens de téléphoner ?", en: "Did you just call?", note: "Great for 'just happened' events" },
        ],
      },
      {
        type: "tip",
        text: "*Venir de* + infinitive is the easiest way to talk about the immediate past. No passé composé needed! 'Je viens de manger' is shorter and more natural than 'je viens juste de finir de manger' for something that JUST happened.",
      },
      {
        type: "conjugation",
        verb: "prendre (to take)",
        rows: [
          { pr: "je", conj: "prends", en: "I take", pron: "PRAHN" },
          { pr: "tu", conj: "prends", en: "you take", pron: "PRAHN" },
          { pr: "il/elle", conj: "prend", en: "he/she takes", pron: "PRAHN" },
          { pr: "nous", conj: "prenons", en: "we take", pron: "pruh-NOHN" },
          { pr: "vous", conj: "prenez", en: "you take", pron: "pruh-NAY" },
          { pr: "ils/elles", conj: "prennent", en: "they take", pron: "PRENN" },
        ],
      },
      {
        type: "block",
        label: "Prendre Expressions",
        items: [
          { fr: "Prendre le bus / le métro / le train", en: "To take the bus / metro / train" },
          { fr: "Prendre un café", en: "To have a coffee", note: "Not 'boire' — French 'take' a coffee" },
          { fr: "Prendre une décision", en: "To make a decision", note: "French 'take' a decision" },
          { fr: "Prendre son temps", en: "To take one's time", note: "Prenez votre temps ! = Take your time!" },
        ],
      },
      {
        type: "block",
        label: "Relative Clause Preview: Qui & Que",
        items: [
          { fr: "qui", en: "who / which (subject)", note: "L'homme qui parle = The man who speaks" },
          { fr: "que", en: "whom / which / that (object)", note: "Le café que je prends = The coffee that I take" },
        ],
      },
      {
        type: "tip",
        text: "*Qui* replaces the subject (the doer): 'the man WHO speaks'. *Que* replaces the object (the receiver): 'the coffee THAT I drink'. If the next word after qui/que is a verb → use *qui*. If it's a subject/pronoun → use *que*.",
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "Je viens de",
            phonetic: "zhuh VYEHN duh",
            ipa: "/ʒə vjɛ̃ də/",
            notes: "Viens has a nasal 'ehn' sound. The -s is silent.",
          },
          {
            fr: "Je prends",
            phonetic: "zhuh PRAHN",
            ipa: "/ʒə pʁɑ̃/",
            notes: "Nasal 'ahn'. The -ds is completely silent. Sounds like 'prahn'.",
          },
          {
            fr: "Ils prennent",
            phonetic: "eel PRENN",
            ipa: "/il pʁɛn/",
            notes: "The double -nn- makes the 'n' actually sound. Different from je prends!",
          },
        ],
      },
    ],
    quickRecall: {
      q: "'Je viens de manger' means...",
      a: "I just ate",
      o: ["I just ate", "I come to eat", "I want to eat", "I am eating"],
    },
  },
  examples: [
    {
      fr: "Je viens de manger, merci.",
      en: "I just ate, thanks.",
      bridge: "Je viens de manger, thanks.",
    },
    {
      fr: "Tu viens d'où ?",
      en: "Where do you come from?",
      bridge: "Tu viens from where?",
    },
    {
      fr: "Elle vient de partir.",
      en: "She just left.",
      bridge: "Elle vient de partir (leave).",
    },
    {
      fr: "Je prends le métro tous les jours.",
      en: "I take the metro every day.",
      bridge: "Je prends the métro every day.",
    },
    {
      fr: "Vous prenez un café ?",
      en: "Would you like a coffee?",
      bridge: "Vous prenez a café?",
    },
    {
      fr: "Prenez votre temps !",
      en: "Take your time!",
      bridge: "Prenez your temps!",
    },
    {
      fr: "L'homme qui parle est mon père.",
      en: "The man who is speaking is my father.",
      bridge: "L'homme qui parle is my father.",
    },
    {
      fr: "Le café que je prends est excellent.",
      en: "The coffee that I'm having is excellent.",
      bridge: "The café que je prends is excellent.",
    },
  ],
  fillFG: [
    {
      s: "I [___] ate, thanks.",
      a: "viens de manger",
      o: ["viens de manger", "ai mangé", "mange", "vais manger"],
      ctx: "Declining a food offer — you JUST finished eating.",
    },
    {
      s: "She [___] left.",
      a: "vient de partir",
      o: ["vient de partir", "a parti", "part", "va partir"],
      ctx: "Explaining she left moments ago.",
    },
    {
      s: "I [___] the metro every day.",
      a: "prends",
      o: ["prends", "prenons", "prenez", "prennent"],
      ctx: "Describing your commute (je).",
    },
    {
      s: "Take your [___]!",
      a: "temps",
      o: ["temps", "café", "bus", "décision"],
      ctx: "Telling someone not to rush.",
    },
    {
      s: "The man [___] is speaking is my father.",
      a: "qui",
      o: ["qui", "que", "où", "quand"],
      ctx: "Using a relative pronoun (subject).",
    },
  ],
  fillBlanks: [
    {
      s: "Je ___ de manger.",
      a: "viens",
      o: ["viens", "vient", "venons", "venir"],
      ctx: "I just ate.",
    },
    {
      s: "Elle ___ de partir.",
      a: "vient",
      o: ["vient", "viens", "venez", "viennent"],
      ctx: "She just left.",
    },
    {
      s: "Je ___ le métro.",
      a: "prends",
      o: ["prends", "prend", "prenons", "prenez"],
      ctx: "I take the metro.",
    },
    {
      s: "Vous ___ un café ?",
      a: "prenez",
      o: ["prenez", "prends", "prend", "prennent"],
      ctx: "Would you like a coffee? (vous)",
    },
    {
      s: "L'homme ___ parle est mon père.",
      a: "qui",
      o: ["qui", "que", "où", "dont"],
      ctx: "The man who speaks is my father.",
    },
  ],
  buildSentences: [
    {
      c: ["Je", "viens", "de", "manger"],
      en: "I just ate",
      trap: ["ai", "mange"],
    },
    {
      c: ["Je", "prends", "le", "métro", "tous", "les", "jours"],
      en: "I take the metro every day",
      trap: ["prend", "chaque"],
    },
    {
      c: ["Prenez", "votre", "temps"],
      en: "Take your time!",
      trap: ["ton", "prends"],
    },
    {
      c: ["L'", "homme", "qui", "parle", "est", "mon", "père"],
      en: "The man who speaks is my father",
      trap: ["que", "son"],
    },
  ],
  quiz: [
    {
      q: "What does 'venir de + infinitive' express?",
      a: "Something that just happened",
      o: ["Something that just happened", "Something that will happen", "A habitual action", "A desire"],
    },
    {
      q: "How do you say 'I just arrived'?",
      a: "Je viens d'arriver",
      o: ["Je viens d'arriver", "Je suis arrivé", "J'arrive", "Je vais arriver"],
    },
    {
      q: "Which is correct: 'prendre un café' or 'boire un café'?",
      a: "Both work, but 'prendre' is more common",
      o: ["Both work, but 'prendre' is more common", "Only boire", "Only prendre", "Neither"],
      ctx: "Think about how French speakers naturally say this.",
    },
    {
      q: "When do you use 'qui' instead of 'que'?",
      a: "When it replaces the subject",
      o: ["When it replaces the subject", "When it replaces the object", "After prepositions", "Always"],
    },
    {
      q: "Translate: 'Tu viens d'où ?'",
      a: "Where do you come from?",
      o: ["Where do you come from?", "Where are you going?", "When did you come?", "Why did you come?"],
    },
    {
      q: "What is the 'ils' form of 'prendre'?",
      a: "prennent",
      o: ["prennent", "prendent", "prends", "prennons"],
    },
    {
      q: "'Prendre une décision' means...",
      a: "To make a decision",
      o: ["To make a decision", "To take a vacation", "To change one's mind", "To ask a question"],
    },
    {
      q: "What is the 'ils' form of 'venir'?",
      a: "viennent",
      o: ["viennent", "venent", "viens", "viennons"],
    },
  ],
  combine: [
    {
      hint: "I + just + ate → Decline food politely",
      answer: "Je viens de manger",
      accept: [
        "je viens de manger",
      ],
    },
    {
      hint: "I + take + metro + every day → Describe commute",
      answer: "Je prends le métro tous les jours",
      accept: [
        "je prends le métro tous les jours",
        "je prends le metro tous les jours",
      ],
    },
    {
      hint: "Take + your + time → Encourage someone",
      answer: "Prenez votre temps",
      accept: [
        "prenez votre temps",
        "prends ton temps",
      ],
    },
  ],
  weave: [
    {
      en: "I just ate and I'm taking the metro to go home.",
      known: ["je", "viens", "de", "manger", "prends", "le", "métro", "pour", "rentrer"],
      sample: "Je viens de manger and je prends le métro pour rentrer home.",
    },
    {
      en: "She just left. The man who is speaking is my father.",
      known: ["elle", "vient", "de", "partir", "l'homme", "qui", "parle", "est", "mon", "père"],
      sample: "Elle vient de partir. L'homme qui parle est mon père.",
    },
    {
      en: "Would you like a coffee? Take your time.",
      known: ["vous", "prenez", "un", "café", "votre", "temps"],
      sample: "Vous prenez un café? Prenez votre temps.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Je viens de manger, merci.",
      q: "Why is the person declining?",
      a: "They just ate",
      o: [
        "They just ate",
        "They don't like the food",
        "They're going to eat later",
        "They're on a diet",
      ],
    },
    {
      type: "odd",
      q: "Which does NOT follow the same conjugation pattern?",
      items: ["venir", "devenir", "revenir", "manger"],
      a: "manger",
      reason: "Venir, devenir, and revenir all conjugate like venir. Manger is a regular -er verb.",
    },
    {
      type: "context",
      situation: "Someone asks if your colleague Marie is here. She left 5 minutes ago.",
      a: "Elle vient de partir",
      o: [
        "Elle vient de partir",
        "Elle est partie hier",
        "Elle va partir",
        "Elle part maintenant",
      ],
    },
    {
      type: "fill_ctx",
      s: "Ils ___ le train tous les matins.",
      a: "prennent",
      o: ["prennent", "prends", "prend", "prenons"],
      ctx: "They take the train every morning.",
    },
  ],
  sayIt: [
    {
      situation: "Tell someone you just arrived and you're going to take a coffee.",
      target: ["viens", "arriver", "prends", "café"],
    },
    {
      situation: "Explain your daily commute — how you get to work.",
      target: ["prends", "métro", "bus", "jours"],
    },
  ],
  miniConv: {
    topic: "Talking about how you get around and what just happened",
    starter: "Salut ! Tu viens d'arriver ? Tu as pris le bus ?",
  },
  expressions: [
    {
      fr: "Ça te dit ?",
      en: "Does that appeal to you? / Are you up for it?",
      usage: "On prend un café ? Ça te dit ?",
      literal: "Does that say to you?",
    },
    {
      fr: "Prendre un pot",
      en: "To grab a drink (casual)",
      usage: "On va prendre un pot ce soir ?",
      literal: "To take a pot",
    },
    {
      fr: "D'où tu viens ?",
      en: "Where are you from?",
      usage: "Tu as un accent — d'où tu viens ?",
      literal: "From where you come?",
    },
  ],
  grammarNuggets: [
    {
      title: "Venir de = the lazy past tense",
      insight: "Why bother with passé composé when you can use 'venir de + infinitive' for things that JUST happened? It's shorter, easier to conjugate, and sounds very natural. 'Je viens de manger' beats 'je viens juste de finir de manger' every time.",
      example: "Je viens de voir Marie = I just saw Marie (no past participle needed!)",
    },
    {
      title: "Prendre is everywhere in French",
      insight: "French 'takes' things that English 'has', 'makes', or 'drinks'. Prendre un café (have a coffee), prendre une décision (make a decision), prendre le bus (catch the bus). When in doubt about how to say something, try prendre.",
      example: "Prendre un café, prendre le bus, prendre une douche, prendre une photo",
    },
  ],
  soundPatterns: [
    {
      pattern: "je/tu/il vs ils: nasal vs non-nasal",
      examples: [
        { fr: "il vient / ils viennent", en: "he comes / they come" },
        { fr: "il prend / ils prennent", en: "he takes / they take" },
      ],
      rule: "Singular forms (vient, prend) have a nasal vowel and silent ending. Plural forms (viennent, prennent) have a clear 'n' sound — the double consonant 'opens' the pronunciation.",
    },
  ],
  cultureBite: "'On prend un café ?' is the French equivalent of 'let's hang out'. French café culture is central to social life — a coffee isn't just a drink, it's an invitation to connect. Never rush a café sit-down; 'prenez votre temps' isn't just polite, it's a lifestyle.",
  summary: [
    "Venir: je viens, tu viens, il vient, nous venons, vous venez, ils viennent",
    "Prendre: je prends, tu prends, il prend, nous prenons, vous prenez, ils prennent",
    "Venir de + infinitive = just did something (recent past)",
    "Prendre expressions: prendre le bus, un café, une décision",
    "Relative pronouns preview: qui (subject), que (object)",
  ],
};
