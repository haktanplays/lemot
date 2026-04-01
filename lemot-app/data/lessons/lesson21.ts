import type { Lesson } from "@/lib/types";

export const lesson21: Lesson = {
  id: 21,
  title: "Dire, Voir, Savoir",
  sub: "Say, see, know — verbs #4, #6, #7",
  icon: "Eye",
  level: "A1",
  difficulty: "hard",
  grammar: {
    title: "Dire, Voir, Savoir",
    sections: [
      {
        type: "intro",
        text: "Three more essential irregular verbs. *Dire* (to say), *voir* (to see), and *savoir* (to know facts). These show up constantly in conversation — especially in *que*-clauses: 'Il dit que...' (He says that...), 'Je sais que...' (I know that...).",
      },
      {
        type: "conjugation",
        verb: "dire (to say/tell)",
        rows: [
          { pr: "je", conj: "dis", en: "I say", pron: "DEE" },
          { pr: "tu", conj: "dis", en: "you say", pron: "DEE" },
          { pr: "il/elle", conj: "dit", en: "he/she says", pron: "DEE" },
          { pr: "nous", conj: "disons", en: "we say", pron: "dee-ZOHN" },
          { pr: "vous", conj: "dites", en: "you say", pron: "DEET" },
          { pr: "ils/elles", conj: "disent", en: "they say", pron: "DEEZ" },
        ],
      },
      {
        type: "tip",
        text: "Watch out: *vous dites* is irregular — it's NOT *vous disez*! This is one of only three verbs with an irregular *vous* form (the others: vous faites, vous êtes).",
      },
      {
        type: "conjugation",
        verb: "voir (to see)",
        rows: [
          { pr: "je", conj: "vois", en: "I see", pron: "VWAH" },
          { pr: "tu", conj: "vois", en: "you see", pron: "VWAH" },
          { pr: "il/elle", conj: "voit", en: "he/she sees", pron: "VWAH" },
          { pr: "nous", conj: "voyons", en: "we see", pron: "vwah-YOHN" },
          { pr: "vous", conj: "voyez", en: "you see", pron: "vwah-YAY" },
          { pr: "ils/elles", conj: "voient", en: "they see", pron: "VWAH" },
        ],
      },
      {
        type: "conjugation",
        verb: "savoir (to know — facts/skills)",
        rows: [
          { pr: "je", conj: "sais", en: "I know", pron: "SAY" },
          { pr: "tu", conj: "sais", en: "you know", pron: "SAY" },
          { pr: "il/elle", conj: "sait", en: "he/she knows", pron: "SAY" },
          { pr: "nous", conj: "savons", en: "we know", pron: "sah-VOHN" },
          { pr: "vous", conj: "savez", en: "you know", pron: "sah-VAY" },
          { pr: "ils/elles", conj: "savent", en: "they know", pron: "SAV" },
        ],
      },
      {
        type: "block",
        label: "Savoir vs Connaître",
        items: [
          { fr: "Savoir", en: "To know (facts, how to do something)", note: "Je sais parler français. Je sais que c'est vrai." },
          { fr: "Connaître", en: "To know (be familiar with people/places)", note: "Je connais Paris. Je connais Marie." },
          { fr: "Savoir + infinitive", en: "To know how to do X", note: "Je sais nager = I know how to swim (I can swim)" },
          { fr: "Savoir que...", en: "To know that...", note: "Je sais que tu as raison = I know that you're right" },
        ],
      },
      {
        type: "block",
        label: "Que-clauses",
        items: [
          { fr: "Il dit que...", en: "He says that...", note: "Il dit que c'est bon. (He says it's good.)" },
          { fr: "Je sais que...", en: "I know that...", note: "Je sais que tu parles français." },
          { fr: "Je vois que...", en: "I see that...", note: "Je vois que tu es fatigué." },
        ],
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "Je dis",
            phonetic: "zhuh DEE",
            ipa: "/ʒə di/",
            notes: "Short and crisp. The -s is silent.",
          },
          {
            fr: "Je vois",
            phonetic: "zhuh VWAH",
            ipa: "/ʒə vwa/",
            notes: "The -oi- makes the 'wah' sound. Same as in 'roi' (king).",
          },
          {
            fr: "Je sais",
            phonetic: "zhuh SAY",
            ipa: "/ʒə sɛ/",
            notes: "Sounds like the English word 'say'. The -s is silent.",
          },
        ],
      },
    ],
    quickRecall: {
      q: "What is the irregular 'vous' form of dire?",
      a: "vous dites",
      o: ["vous dites", "vous disez", "vous direz", "vous dirons"],
    },
  },
  examples: [
    {
      fr: "Il dit que c'est bon.",
      en: "He says it's good.",
      bridge: "Il dit que it's bon.",
    },
    {
      fr: "Je vois la Tour Eiffel !",
      en: "I see the Eiffel Tower!",
      bridge: "Je vois la Tour Eiffel!",
    },
    {
      fr: "Tu sais nager ?",
      en: "Do you know how to swim?",
      bridge: "Tu sais how to swim?",
    },
    {
      fr: "Nous disons toujours la vérité.",
      en: "We always tell the truth.",
      bridge: "Nous disons always the truth.",
    },
    {
      fr: "Je sais que tu as raison.",
      en: "I know that you're right.",
      bridge: "Je sais que you're right.",
    },
    {
      fr: "Vous voyez le problème ?",
      en: "Do you see the problem?",
      bridge: "Vous voyez the problème?",
    },
    {
      fr: "Qu'est-ce qu'il dit ?",
      en: "What is he saying?",
      bridge: "What is he dit?",
    },
    {
      fr: "Je ne sais pas où il est.",
      en: "I don't know where he is.",
      bridge: "Je ne sais pas where il est.",
    },
  ],
  fillFG: [
    {
      s: "He [___] it's good.",
      a: "dit que",
      o: ["dit que", "dis que", "dire que", "dites que"],
      ctx: "Reporting what someone said.",
    },
    {
      s: "I [___] the Eiffel Tower!",
      a: "vois",
      o: ["vois", "voyons", "voyez", "voir"],
      ctx: "Exclaiming what you can see.",
    },
    {
      s: "Do you [___] how to swim?",
      a: "sais",
      o: ["sais", "sait", "savez", "connais"],
      ctx: "Asking a friend about abilities (tu).",
    },
    {
      s: "We always [___] the truth.",
      a: "disons",
      o: ["disons", "dis", "dites", "disent"],
      ctx: "Making a statement about honesty (nous).",
    },
    {
      s: "I don't [___] where he is.",
      a: "sais",
      o: ["sais", "connais", "vois", "dis"],
      ctx: "Expressing ignorance about a fact.",
    },
  ],
  fillBlanks: [
    {
      s: "Il ___ que c'est bon.",
      a: "dit",
      o: ["dit", "dis", "dire", "dites"],
      ctx: "He says it's good.",
    },
    {
      s: "Je ___ la Tour Eiffel.",
      a: "vois",
      o: ["vois", "voyons", "voit", "voir"],
      ctx: "I see the Eiffel Tower.",
    },
    {
      s: "Tu ___ nager ?",
      a: "sais",
      o: ["sais", "sait", "savons", "connais"],
      ctx: "Do you know how to swim?",
    },
    {
      s: "Vous ___ le problème ?",
      a: "voyez",
      o: ["voyez", "vois", "voient", "voir"],
      ctx: "Do you see the problem? (formal)",
    },
    {
      s: "Je ne ___ pas.",
      a: "sais",
      o: ["sais", "sait", "savons", "dis"],
      ctx: "I don't know.",
    },
  ],
  buildSentences: [
    {
      c: ["Il", "dit", "que", "c'est", "bon"],
      en: "He says it's good",
      trap: ["dis", "est"],
    },
    {
      c: ["Je", "sais", "que", "tu", "as", "raison"],
      en: "I know that you're right",
      trap: ["connais", "est"],
    },
    {
      c: ["Vous", "voyez", "le", "problème"],
      en: "Do you see the problem?",
      trap: ["vois", "un"],
    },
    {
      c: ["Je", "ne", "sais", "pas"],
      en: "I don't know",
      trap: ["dis", "vois"],
    },
  ],
  quiz: [
    {
      q: "What is the 'vous' form of 'dire'?",
      a: "vous dites",
      o: ["vous dites", "vous disez", "vous direz", "vous disons"],
      ctx: "This is one of the most common irregular vous forms.",
    },
    {
      q: "When do you use 'savoir' instead of 'connaître'?",
      a: "For facts and skills",
      o: ["For facts and skills", "For people and places", "For opinions", "For questions"],
    },
    {
      q: "How do you say 'I know how to swim'?",
      a: "Je sais nager",
      o: ["Je sais nager", "Je connais nager", "Je sais la nage", "Je nage sais"],
    },
    {
      q: "What does 'que' mean in 'Il dit que...'?",
      a: "That",
      o: ["That", "What", "Who", "Which"],
    },
    {
      q: "Which forms of 'voir' sound the same?",
      a: "je vois, tu vois, il voit, ils voient",
      o: ["je vois, tu vois, il voit, ils voient", "nous voyons, vous voyez", "All forms", "je vois, nous voyons"],
    },
    {
      q: "Translate: 'Je vois que tu es fatigué'",
      a: "I see that you're tired",
      o: ["I see that you're tired", "I know you're tired", "I say you're tired", "I think you're tired"],
    },
    {
      q: "'Je connais Paris' uses connaître because...",
      a: "You're familiar with a place",
      o: ["You're familiar with a place", "You know a fact about Paris", "You can get to Paris", "You see Paris"],
    },
    {
      q: "What is the past participle of 'voir'?",
      a: "vu",
      o: ["vu", "voiré", "voyé", "vois"],
    },
  ],
  combine: [
    {
      hint: "He + says + that + it's good → Report speech",
      answer: "Il dit que c'est bon",
      accept: [
        "il dit que c'est bon",
        "il dit que c est bon",
      ],
    },
    {
      hint: "I + know + that + you're right → State a fact",
      answer: "Je sais que tu as raison",
      accept: [
        "je sais que tu as raison",
      ],
    },
    {
      hint: "I + don't know + where + he is → Express ignorance",
      answer: "Je ne sais pas où il est",
      accept: [
        "je ne sais pas où il est",
        "je ne sais pas ou il est",
      ],
    },
  ],
  weave: [
    {
      en: "He says that the restaurant is good and I see that he's right.",
      known: ["il", "dit", "que", "le", "restaurant", "est", "bon", "je", "vois", "a", "raison"],
      sample: "Il dit que le restaurant est bon and je vois that il a raison.",
    },
    {
      en: "I know how to swim but I don't know where the pool is.",
      known: ["je", "sais", "nager", "ne", "pas", "où", "la", "piscine", "est"],
      sample: "Je sais nager but je ne sais pas où la piscine est.",
    },
    {
      en: "What is she saying? I don't see the problem.",
      known: ["qu'est-ce", "qu'", "elle", "dit", "je", "ne", "vois", "pas", "le", "problème"],
      sample: "Qu'est-ce qu'elle dit? Je ne vois pas le problème.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Je ne sais pas où il est.",
      q: "What is the person expressing?",
      a: "They don't know where someone is",
      o: [
        "They don't know where someone is",
        "They can't see someone",
        "They said something",
        "They know the answer",
      ],
    },
    {
      type: "odd",
      q: "Which verb does NOT belong with the others?",
      items: ["dire", "voir", "savoir", "manger"],
      a: "manger",
      reason: "Dire, voir, and savoir are irregular verbs. Manger is a regular -er verb.",
    },
    {
      type: "context",
      situation: "Someone asks if you know how to cook. You do.",
      a: "Oui, je sais cuisiner",
      o: [
        "Oui, je sais cuisiner",
        "Oui, je connais cuisiner",
        "Oui, je vois cuisiner",
        "Oui, je dis cuisiner",
      ],
    },
    {
      type: "fill_ctx",
      s: "Qu'est-ce que vous ___ ?",
      a: "dites",
      o: ["dites", "disez", "dis", "dire"],
      ctx: "What are you saying? (formal)",
    },
  ],
  sayIt: [
    {
      situation: "Report what a friend told you about a movie — was it good or bad?",
      target: ["dit que", "vu", "film", "bon"],
    },
    {
      situation: "Tell someone you don't know where the train station is, but you can see the metro.",
      target: ["sais", "pas", "où", "vois", "métro"],
    },
  ],
  miniConv: {
    topic: "Reporting what someone said and sharing what you know",
    starter: "Tu sais quoi ? Marie dit que le nouveau restaurant est excellent !",
  },
  expressions: [
    {
      fr: "C'est-à-dire",
      en: "That is to say / I mean",
      usage: "J'aime la cuisine française, c'est-à-dire les plats traditionnels.",
      literal: "That is to say",
    },
    {
      fr: "On verra",
      en: "We'll see",
      usage: "Tu viens demain ? — On verra.",
      literal: "One will see",
    },
    {
      fr: "Je ne sais quoi",
      en: "A certain something (an indefinable quality)",
      usage: "Elle a un je ne sais quoi qui la rend spéciale.",
      literal: "I don't know what",
    },
  ],
  grammarNuggets: [
    {
      title: "Savoir vs Connaître — the great divide",
      insight: "French has TWO words for 'know'. Savoir = knowing FACTS or SKILLS (je sais nager, je sais que...). Connaître = being FAMILIAR WITH people or places (je connais Paris, je connais Marie). If you can add 'how to' or 'that', use savoir.",
      example: "Je sais cuisiner (skill) vs Je connais un bon restaurant (familiarity)",
    },
    {
      title: "Que-clauses open up complex sentences",
      insight: "Adding 'que' (that) after verbs like dire, savoir, voir lets you build real, adult sentences: 'He says that...', 'I know that...'. This one word transforms you from phrase-speaker to sentence-maker.",
      example: "Il dit que → Je sais que → Je vois que",
    },
  ],
  fauxAmis: [
    {
      fr: "dire",
      looksLike: "dire (terrible/urgent)",
      actualMeaning: "To say / to tell — nothing terrible about it!",
      example: "Il dit bonjour — He says hello (not 'he direfully greets').",
    },
  ],
  cultureBite: "'Je ne sais quoi' is one of the most famous French phrases worldwide. French people actually use it, often with a smile. It captures the French love of the indefinable — beauty, charm, and style that can't be reduced to rules.",
  summary: [
    "Dire: je dis, tu dis, il dit, nous disons, vous dites, ils disent",
    "Voir: je vois, tu vois, il voit, nous voyons, vous voyez, ils voient",
    "Savoir: je sais, tu sais, il sait, nous savons, vous savez, ils savent",
    "Savoir (facts/skills) vs connaître (familiarity)",
    "Que-clauses: il dit que..., je sais que..., je vois que...",
  ],
};
