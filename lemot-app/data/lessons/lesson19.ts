import type { Lesson } from "@/lib/types";

export const lesson19: Lesson = {
  id: 19,
  title: "Past Tense I",
  sub: "What did I do yesterday?",
  icon: "Clock3",
  level: "A1",
  difficulty: "hard",
  grammar: {
    title: "Passé Composé with Avoir",
    sections: [
      {
        type: "intro",
        text: "To talk about what happened in the past, French uses the *passé composé* — a compound tense made of two parts: a helper verb (*avoir* or *être*) + a *past participle*. Most verbs use *avoir*. Think of it like English 'I have eaten' but used for ALL past actions, even 'I ate'.",
      },
      {
        type: "block",
        label: "The Formula",
        items: [
          { fr: "Subject + avoir + past participle", en: "The passé composé structure", note: "J'ai mangé = I ate / I have eaten" },
          { fr: "-er → -é", en: "manger → mangé", note: "The most common pattern. Drop -er, add -é." },
          { fr: "-ir → -i", en: "finir → fini", note: "Drop -ir, add -i." },
          { fr: "-re → -u", en: "vendre → vendu", note: "Drop -re, add -u." },
        ],
      },
      {
        type: "conjugation",
        verb: "manger (to eat) — passé composé",
        rows: [
          { pr: "j'", conj: "ai mangé", en: "I ate", pron: "zhay mahn-ZHAY" },
          { pr: "tu", conj: "as mangé", en: "you ate", pron: "too ah mahn-ZHAY" },
          { pr: "il/elle", conj: "a mangé", en: "he/she ate", pron: "eel ah mahn-ZHAY" },
          { pr: "nous", conj: "avons mangé", en: "we ate", pron: "nooz ah-VOHN mahn-ZHAY" },
          { pr: "vous", conj: "avez mangé", en: "you ate", pron: "vooz ah-VAY mahn-ZHAY" },
          { pr: "ils/elles", conj: "ont mangé", en: "they ate", pron: "eelz ohn mahn-ZHAY" },
        ],
      },
      {
        type: "block",
        label: "Irregular Past Participles (memorize these!)",
        items: [
          { fr: "faire → fait", en: "to do/make → done/made", note: "J'ai fait mes devoirs." },
          { fr: "voir → vu", en: "to see → seen", note: "J'ai vu un film." },
          { fr: "prendre → pris", en: "to take → taken", note: "J'ai pris le bus." },
          { fr: "dire → dit", en: "to say → said", note: "Il a dit bonjour." },
          { fr: "avoir → eu", en: "to have → had", note: "J'ai eu un problème." },
          { fr: "être → été", en: "to be → been", note: "J'ai été surpris." },
        ],
      },
      {
        type: "block",
        label: "Time Markers for the Past",
        items: [
          { fr: "hier", en: "yesterday" },
          { fr: "ce matin", en: "this morning" },
          { fr: "la semaine dernière", en: "last week" },
          { fr: "l'année dernière", en: "last year" },
          { fr: "il y a deux jours", en: "two days ago", note: "'Il y a' + time = 'ago'" },
        ],
      },
      {
        type: "tip",
        text: "Negation wraps around *avoir*, NOT the participle: *Je **n'ai pas** mangé* (I didn't eat). The past participle stays after the sandwich.",
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "J'ai mangé",
            phonetic: "zhay mahn-ZHAY",
            ipa: "/ʒe mɑ̃.ʒe/",
            notes: "J'ai sounds like 'zhay' — one syllable. The -é ending is a clear 'ay' sound.",
          },
          {
            fr: "Il a dit",
            phonetic: "eel ah DEE",
            ipa: "/il a di/",
            notes: "Short and snappy. The 't' in 'dit' is silent.",
          },
          {
            fr: "Hier",
            phonetic: "ee-AIR",
            ipa: "/jɛʁ/",
            notes: "Two syllables. The 'h' is silent. Sounds like 'ee-air'.",
          },
        ],
      },
    ],
    quickRecall: {
      q: "What is the past participle of 'faire'?",
      a: "fait",
      o: ["fait", "fairu", "faisé", "fais"],
    },
  },
  examples: [
    {
      fr: "J'ai mangé une pizza hier soir.",
      en: "I ate a pizza last night.",
      bridge: "J'ai mangé a pizza yesterday soir.",
    },
    {
      fr: "Tu as vu le film ?",
      en: "Did you see the movie?",
      bridge: "Tu as vu the film?",
    },
    {
      fr: "Elle a travaillé ce matin.",
      en: "She worked this morning.",
      bridge: "Elle a travaillé this morning.",
    },
    {
      fr: "Nous avons fait les courses.",
      en: "We did the grocery shopping.",
      bridge: "Nous avons fait the courses (shopping).",
    },
    {
      fr: "Il a dit bonjour et il est parti.",
      en: "He said hello and he left.",
      bridge: "Il a dit hello and he left.",
    },
    {
      fr: "J'ai pris le métro ce matin.",
      en: "I took the metro this morning.",
      bridge: "J'ai pris the métro this morning.",
    },
    {
      fr: "Vous avez eu un bon week-end ?",
      en: "Did you have a good weekend?",
      bridge: "Vous avez eu a good weekend?",
    },
    {
      fr: "Je n'ai pas compris.",
      en: "I didn't understand.",
      bridge: "Je n'ai pas compris (understood).",
    },
  ],
  fillFG: [
    {
      s: "I [___] a pizza last night.",
      a: "ai mangé",
      o: ["ai mangé", "mange", "ai mange", "mangé"],
      ctx: "Telling a friend about dinner (passé composé).",
    },
    {
      s: "She [___] this morning.",
      a: "a travaillé",
      o: ["a travaillé", "travaille", "a travaille", "travaillé"],
      ctx: "Describing what she did today.",
    },
    {
      s: "They [___] a good movie.",
      a: "ont vu",
      o: ["ont vu", "ont voir", "a vu", "voient"],
      ctx: "Talking about what they watched.",
    },
    {
      s: "We [___] the groceries.",
      a: "avons fait",
      o: ["avons fait", "avons faire", "fait", "faisons"],
      ctx: "Explaining what you did over the weekend.",
    },
    {
      s: "I [___] the bus this morning.",
      a: "ai pris",
      o: ["ai pris", "prends", "ai prendre", "pris"],
      ctx: "Explaining how you got to work.",
    },
  ],
  fillBlanks: [
    {
      s: "J' ___ une pizza hier.",
      a: "ai mangé",
      o: ["ai mangé", "mange", "mangé", "ai mange"],
      ctx: "I ate a pizza yesterday.",
    },
    {
      s: "Tu ___ le film ?",
      a: "as vu",
      o: ["as vu", "vois", "a vu", "voir"],
      ctx: "Did you see the movie?",
    },
    {
      s: "Il ___ bonjour.",
      a: "a dit",
      o: ["a dit", "dit", "a dire", "disait"],
      ctx: "He said hello.",
    },
    {
      s: "Nous ___ les courses.",
      a: "avons fait",
      o: ["avons fait", "faisons", "avons faire", "fait"],
      ctx: "We did the shopping.",
    },
    {
      s: "Je n' ___ pas compris.",
      a: "ai",
      o: ["ai", "a", "as", "avons"],
      ctx: "I didn't understand.",
    },
  ],
  buildSentences: [
    {
      c: ["J'", "ai", "mangé", "une", "pizza"],
      en: "I ate a pizza",
      trap: ["mange", "le"],
    },
    {
      c: ["Elle", "a", "travaillé", "ce", "matin"],
      en: "She worked this morning",
      trap: ["travaille", "hier"],
    },
    {
      c: ["Tu", "as", "vu", "le", "film"],
      en: "You saw the movie",
      trap: ["vois", "un"],
    },
    {
      c: ["Je", "n'", "ai", "pas", "compris"],
      en: "I didn't understand",
      trap: ["comprends", "ne"],
    },
  ],
  quiz: [
    {
      q: "What two parts make up the passé composé?",
      a: "Avoir/être + past participle",
      o: ["Avoir/être + past participle", "Subject + verb", "Verb + infinitive", "Noun + adjective"],
    },
    {
      q: "How do you form the past participle of -er verbs?",
      a: "Drop -er, add -é",
      o: ["Drop -er, add -é", "Drop -er, add -i", "Drop -er, add -u", "Add -ed"],
    },
    {
      q: "What is the past participle of 'voir'?",
      a: "vu",
      o: ["vu", "voi", "voiré", "voyé"],
    },
    {
      q: "Where does negation go in passé composé?",
      a: "Around avoir: ne + avoir + pas",
      o: ["Around avoir: ne + avoir + pas", "After the participle", "Before the subject", "Around the participle"],
    },
    {
      q: "How do you say 'two days ago'?",
      a: "Il y a deux jours",
      o: ["Il y a deux jours", "Deux jours avant", "Depuis deux jours", "Avant deux jours"],
    },
    {
      q: "What is the past participle of 'prendre'?",
      a: "pris",
      o: ["pris", "prendu", "prendé", "prenu"],
    },
    {
      q: "Translate: 'J'ai eu un problème'",
      a: "I had a problem",
      o: ["I had a problem", "I have a problem", "I will have a problem", "I want a problem"],
    },
    {
      q: "'Hier' means...",
      a: "Yesterday",
      o: ["Yesterday", "Tomorrow", "Today", "Last week"],
    },
  ],
  combine: [
    {
      hint: "I + ate + pizza + yesterday → Tell what you ate",
      answer: "J'ai mangé une pizza hier",
      accept: [
        "j'ai mangé une pizza hier",
        "j'ai mange une pizza hier",
        "jai mangé une pizza hier",
      ],
    },
    {
      hint: "She + worked + this morning → Describe her morning",
      answer: "Elle a travaillé ce matin",
      accept: [
        "elle a travaillé ce matin",
        "elle a travaille ce matin",
      ],
    },
    {
      hint: "I + didn't + understand → Express confusion",
      answer: "Je n'ai pas compris",
      accept: [
        "je n'ai pas compris",
        "je nai pas compris",
        "je n ai pas compris",
      ],
    },
  ],
  weave: [
    {
      en: "I ate a pizza yesterday and I watched a movie.",
      known: ["j'", "ai", "mangé", "hier", "regardé", "un", "film"],
      sample: "J'ai mangé a pizza hier and j'ai regardé un film.",
    },
    {
      en: "She worked this morning and she took the bus.",
      known: ["elle", "a", "travaillé", "ce", "matin", "pris", "le", "bus"],
      sample: "Elle a travaillé this matin and elle a pris le bus.",
    },
    {
      en: "We did the shopping last week.",
      known: ["nous", "avons", "fait", "les", "courses", "la", "semaine", "dernière"],
      sample: "Nous avons fait les courses la semaine dernière.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "J'ai mangé une pizza hier soir.",
      q: "What did the person do?",
      a: "Ate a pizza last night",
      o: [
        "Ate a pizza last night",
        "Is eating pizza now",
        "Will eat pizza tonight",
        "Made a pizza",
      ],
    },
    {
      type: "odd",
      q: "Which past participle is IRREGULAR?",
      items: ["mangé", "travaillé", "fait", "parlé"],
      a: "fait",
      reason: "Mangé, travaillé, parlé follow the regular -er → -é pattern. Fait (from faire) is irregular.",
    },
    {
      type: "context",
      situation: "Someone asks what you did this morning. You took the metro.",
      a: "J'ai pris le métro ce matin",
      o: [
        "J'ai pris le métro ce matin",
        "Je prends le métro",
        "Je vais prendre le métro",
        "J'aime le métro",
      ],
    },
    {
      type: "fill_ctx",
      s: "Elle ___ un bon livre la semaine dernière.",
      a: "a lu",
      o: ["a lu", "lit", "lire", "a lire"],
      ctx: "She read a good book last week.",
    },
  ],
  sayIt: [
    {
      situation: "Tell a friend what you did yesterday — mention at least two activities.",
      target: ["ai", "mangé", "regardé", "hier"],
    },
    {
      situation: "Explain that you didn't understand something and ask someone to repeat.",
      target: ["n'ai pas", "compris", "répéter"],
    },
  ],
  miniConv: {
    topic: "Talking about what you did last weekend",
    starter: "Salut ! Tu as fait quoi ce week-end ?",
  },
  expressions: [
    {
      fr: "J'ai eu de la chance",
      en: "I was lucky",
      usage: "J'ai trouvé une place de parking — j'ai eu de la chance !",
      literal: "I had some luck",
    },
    {
      fr: "Il y a longtemps",
      en: "A long time ago",
      usage: "J'ai visité Paris il y a longtemps.",
      literal: "There is a long time",
    },
    {
      fr: "C'est fait",
      en: "It's done",
      usage: "Les courses ? C'est fait !",
      literal: "It is done/made",
    },
  ],
  grammarNuggets: [
    {
      title: "Avoir does the heavy lifting",
      insight: "In passé composé, *avoir* carries the person and tense information while the past participle carries the meaning. That's why you conjugate avoir (j'ai, tu as, il a...) but the participle stays the same for everyone: j'ai mangé, tu as mangé, il a mangé.",
      example: "J'ai mangé, tu as mangé, il a mangé — mangé never changes",
    },
    {
      title: "Negation sandwiches avoir, not the participle",
      insight: "The ne...pas wraps around avoir because avoir is the conjugated verb. The participle hangs out after the sandwich: Je n'ai PAS mangé. Never: *Je n'ai mangé pas.",
      example: "Je n'ai pas vu → I didn't see",
    },
  ],
  fauxAmis: [
    {
      fr: "fait",
      looksLike: "fact",
      actualMeaning: "Done/made (past participle of faire). 'En fait' = 'in fact' but 'j'ai fait' = 'I did/made'",
      example: "J'ai fait un gâteau — I made a cake (not 'I facted a cake').",
    },
  ],
  cultureBite: "French people love asking 'Tu as fait quoi ce week-end?' (What did you do this weekend?) on Monday mornings. It's the #1 small talk topic at work. Having a good answer ready is a social survival skill.",
  summary: [
    "Passé composé = avoir + past participle",
    "Regular participles: -er→-é, -ir→-i, -re→-u",
    "Irregular participles: fait, vu, pris, dit, eu, été",
    "Time markers: hier, ce matin, la semaine dernière",
    "Negation wraps avoir: je n'ai pas mangé",
  ],
};
