import type { Lesson } from "@/lib/types";

export const lesson17: Lesson = {
  id: 17,
  title: "My Day",
  sub: "Reflexive verbs and daily routine",
  icon: "Sun",
  level: "A1",
  difficulty: "hard",
  grammar: {
    title: "Daily Routine & Reflexive Verbs",
    sections: [
      {
        type: "intro",
        text: "When you do something to yourself — get UP, wash YOURSELF, dress YOURSELF — French uses reflexive verbs: *se lever* (to get up), *se laver* (to wash), *se coucher* (to go to bed).",
      },
      {
        type: "block",
        label: "Reflexive Verbs: The Pattern",
        items: [
          {
            fr: "Je me lève",
            en: "I get up (I raise myself)",
            note: "Me = myself. Lever ≈ lever (something that raises).",
          },
          {
            fr: "Tu te laves",
            en: "You wash (yourself)",
            note: "Te = yourself. Laver ≈ lavatory (place to wash).",
          },
          {
            fr: "Il/Elle se couche",
            en: "He/She goes to bed",
            note: "Se = himself/herself. Coucher ≈ couch (lie down).",
          },
          {
            fr: "Je m'habille",
            en: "I get dressed",
            note: "Me → m' before vowel. Habiller = to dress.",
          },
        ],
      },
      {
        type: "block",
        label: "Full Pronoun Agreement",
        items: [
          {
            fr: "je me...",
            en: "I ... myself",
            note: "Je me lève, je me lave, je me couche.",
          },
          {
            fr: "tu te...",
            en: "you ... yourself",
            note: "Tu te lèves, tu te laves, tu te couches.",
          },
          {
            fr: "il/elle se...",
            en: "he/she ... himself/herself",
            note: "Il se lève, elle se lave, il se couche.",
          },
          {
            fr: "nous nous...",
            en: "we ... ourselves",
            note: "Nous nous levons, nous nous lavons.",
          },
          {
            fr: "vous vous...",
            en: "you ... yourselves",
            note: "Vous vous levez, vous vous couchez.",
          },
          {
            fr: "ils/elles se...",
            en: "they ... themselves",
            note: "Ils se lèvent, elles se lavent.",
          },
        ],
      },
      {
        type: "block",
        label: "Time of Day",
        items: [
          {
            fr: "le matin",
            en: "in the morning",
            note: "Matin ≈ matinée (morning performance).",
          },
          {
            fr: "l'après-midi",
            en: "in the afternoon",
            note: "Après (after) + midi (noon) = afternoon.",
          },
          {
            fr: "le soir",
            en: "in the evening",
            note: "Soir ≈ soirée (evening event).",
          },
          {
            fr: "la nuit",
            en: "at night",
            note: "Nuit ≈ nocturnal.",
          },
        ],
      },
      {
        type: "block",
        label: "Daily Activities",
        items: [
          {
            fr: "travailler",
            en: "to work",
            note: "Travailler → travail. WARNING: False friend with 'travel'!",
          },
          {
            fr: "manger",
            en: "to eat",
            note: "You learned this in L9!",
          },
          {
            fr: "dormir",
            en: "to sleep",
            note: "Dormir ≈ dormant, dormitory.",
          },
        ],
      },
      {
        type: "block",
        label: "Sequencing Words",
        items: [
          {
            fr: "puis",
            en: "then",
            note: "Je me lève, puis je me lave. = I get up, then I wash.",
          },
          {
            fr: "tôt",
            en: "early",
            note: "Je me lève tôt. = I get up early.",
          },
          {
            fr: "tard",
            en: "late",
            note: "Je me couche tard. ≈ tardy.",
          },
        ],
      },
      {
        type: "tip",
        text: "Daily routine sentences follow a simple pattern: *time + reflexive verb*. 'Le matin, je me lève à sept heures.' Everything clicks once you learn the pattern.",
      },
      {
        type: "culture",
        text: "The French workday often runs 9h-18h (9 AM-6 PM) with a real lunch break. Lunch is not eaten at the desk — it's a proper meal. 'La pause déjeuner' is sacred.",
      },
    ],
    quickRecall: {
      q: "How do you say 'I get up'?",
      a: "Je me lève",
      o: [
        "Je me lève",
        "Je lève",
        "Je suis levé",
        "J'ai levé",
      ],
    },
  },
  examples: [
    {
      fr: "Le matin, je me lève à sept heures.",
      en: "In the morning, I get up at seven.",
      bridge: "Le matin, je me lève à seven heures.",
    },
    {
      fr: "Puis je me lave et je m'habille.",
      en: "Then I wash and get dressed.",
      bridge: "Puis je me wash et je me dress.",
    },
    {
      fr: "Je travaille l'après-midi.",
      en: "I work in the afternoon.",
      bridge: "Je work l'après-midi.",
    },
    {
      fr: "Le soir, je mange avec ma famille.",
      en: "In the evening, I eat with my family.",
      bridge: "Le soir, je eat avec ma famille.",
    },
    {
      fr: "Je me couche tard.",
      en: "I go to bed late.",
      bridge: "Je me couche late.",
    },
    {
      fr: "Elle se lève tôt le matin.",
      en: "She gets up early in the morning.",
      bridge: "Elle se lève early le matin.",
    },
    {
      fr: "Il dort bien la nuit.",
      en: "He sleeps well at night.",
      bridge: "Il sleeps bien la nuit.",
    },
  ],
  fillFG: [
    {
      s: "I [___] at seven o'clock.",
      a: "me lève",
      o: ["me lève", "lève", "suis levé", "ai levé"],
      ctx: "Reflexive: I get myself up.",
    },
    {
      s: "She goes to [___] late.",
      a: "se couche",
      o: ["se couche", "couche", "est couchée", "a couché"],
      ctx: "Reflexive: she puts herself to bed.",
    },
    {
      s: "I work in the [___].",
      a: "l'après-midi",
      o: ["l'après-midi", "matin", "nuit", "tard"],
      ctx: "Afternoon = après-midi.",
    },
    {
      s: "[___] I wash and get dressed.",
      a: "Puis",
      o: ["Puis", "Mais", "Et", "Parce que"],
      ctx: "Then = puis (sequencing).",
    },
    {
      s: "He [___] well at night.",
      a: "dort",
      o: ["dort", "couche", "lève", "mange"],
      ctx: "Dormir = to sleep.",
    },
  ],
  fillBlanks: [
    {
      s: "Je ___ lève à sept heures.",
      a: "me",
      o: ["me", "se", "te", "le"],
      ctx: "I get up — je ME lève.",
    },
    {
      s: "Elle ___ couche tard.",
      a: "se",
      o: ["se", "me", "te", "le"],
      ctx: "She goes to bed — elle SE couche.",
    },
    {
      s: "Je travaille ___.",
      a: "l'après-midi",
      o: ["l'après-midi", "la nuit", "tôt", "bien"],
      ctx: "I work in the afternoon.",
    },
    {
      s: "___, je me lave.",
      a: "Puis",
      o: ["Puis", "Mais", "Parce que", "Quand"],
      ctx: "Then, I wash.",
    },
    {
      s: "Je me couche ___.",
      a: "tard",
      o: ["tard", "tôt", "bien", "ici"],
      ctx: "I go to bed late.",
    },
  ],
  buildSentences: [
    {
      c: ["Je", "me", "lève", "à", "sept", "heures"],
      en: "I get up at seven o'clock.",
      trap: ["se", "te"],
    },
    {
      c: ["Elle", "se", "couche", "tard"],
      en: "She goes to bed late.",
      trap: ["me", "tôt"],
    },
    {
      c: ["Le", "matin", "je", "travaille"],
      en: "In the morning, I work.",
      trap: ["soir", "nuit"],
    },
    {
      c: ["Puis", "je", "me", "lave"],
      en: "Then I wash.",
      trap: ["se", "te"],
    },
  ],
  quiz: [
    {
      q: "What makes a verb 'reflexive'?",
      a: "The action is done to yourself",
      o: [
        "The action is done to yourself",
        "It's in the past",
        "It's negative",
        "It's a question",
      ],
    },
    {
      q: "'Je me lève' — 'me' means...",
      a: "Myself",
      o: ["Myself", "Me", "My", "Mine"],
      ctx: "The reflexive pronoun.",
    },
    {
      q: "'L'après-midi' means...",
      a: "The afternoon",
      o: ["The afternoon", "The morning", "The evening", "The night"],
    },
    {
      q: "'Tard' means...",
      a: "Late",
      o: ["Late", "Early", "Well", "Then"],
      ctx: "Tard ≈ tardy.",
    },
    {
      q: "'Dormir' means...",
      a: "To sleep",
      o: ["To sleep", "To eat", "To work", "To wash"],
      ctx: "Dormir ≈ dormant, dormitory.",
    },
    {
      q: "Which is the correct reflexive form?",
      a: "Il se lève",
      o: [
        "Il se lève",
        "Il me lève",
        "Il te lève",
        "Il lève",
      ],
      ctx: "Il/elle uses 'se'.",
    },
    {
      q: "Someone asks about your routine. You say: 'Je me lève à sept heures _______.'",
      a: "tous les jours",
      o: ["tous les jours", "d'habitude", "en ce moment", "puis"],
      ctx: "The expression meaning 'every day'.",
    },
    {
      q: "Your schedule changed recently. You explain: '_______, je travaille le soir.'",
      a: "En ce moment",
      o: ["En ce moment", "Tous les jours", "D'habitude", "Puis"],
      ctx: "The expression meaning 'at the moment / currently'.",
    },
  ],
  combine: [
    {
      hint: "Get up (7AM) + wash + dress → Describe your morning routine",
      answer:
        "Je me lève à sept heures, puis je me lave et je m'habille.",
      accept: [
        "je me leve a sept heures puis je me lave et je m'habille",
        "je me lève à sept heures, puis je me lave et je m'habille",
      ],
    },
    {
      hint: "Work (afternoon) + eat (evening) + sleep (late) → Describe your day",
      answer:
        "Je travaille l'après-midi, je mange le soir et je me couche tard.",
      accept: [
        "je travaille l'apres-midi je mange le soir et je me couche tard",
        "je travaille l'après-midi, je mange le soir et je me couche tard",
      ],
    },
    {
      hint: "She gets up (early) + he sleeps (well) → Compare two routines",
      answer: "Elle se lève tôt et il dort bien.",
      accept: [
        "elle se leve tot et il dort bien",
        "elle se lève tôt et il dort bien",
      ],
    },
  ],
  weave: [
    {
      en: "In the morning, I get up at seven. Then I wash and get dressed.",
      known: [
        "le",
        "matin",
        "je",
        "me",
        "lève",
        "à",
        "sept",
        "heures",
        "puis",
        "lave",
        "m'habille",
      ],
      sample:
        "Le matin, je me lève à sept heures. Puis je me lave and je m'habille.",
    },
    {
      en: "I work in the afternoon and eat in the evening with my family.",
      known: [
        "je",
        "travaille",
        "l'après-midi",
        "mange",
        "le",
        "soir",
        "avec",
        "ma",
        "famille",
      ],
      sample:
        "Je travaille l'après-midi and je mange le soir avec ma famille.",
    },
    {
      en: "She goes to bed late and he gets up early. I sleep well at night.",
      known: [
        "elle",
        "se",
        "couche",
        "tard",
        "il",
        "lève",
        "tôt",
        "je",
        "dors",
        "bien",
        "la",
        "nuit",
      ],
      sample:
        "Elle se couche tard and il se lève tôt. Je dors bien la nuit.",
    },
  ],
  review: [
    {
      type: "listen",
      audio:
        "Le matin, je me lève à six heures et je me lave.",
      q: "What time does the speaker get up?",
      a: "6:00",
      o: ["6:00", "7:00", "8:00", "5:00"],
    },
    {
      type: "odd",
      q: "Which is NOT a time of day?",
      items: ["le matin", "le soir", "le tard", "la nuit"],
      a: "le tard",
      reason:
        "'Tard' means 'late', not a time of day. It should be just 'tard'.",
    },
    {
      type: "context",
      situation: "It's morning. Describe what you do first.",
      a: "Je me lève et je me lave",
      o: [
        "Je me lève et je me lave",
        "Je me couche et je dors",
        "Je mange et je travaille",
        "Je pars et je vais",
      ],
    },
    {
      type: "fill_ctx",
      s: "Je ___ manger maintenant. (Lesson 16 — vouloir)",
      a: "veux",
      o: ["veux", "peux", "dois", "vais"],
      ctx: "I want to eat now. Cross-reference L16.",
    },
    {
      type: "fill_ctx",
      s: "Je ___ lève à sept heures.",
      a: "me",
      o: ["me", "se", "te", "le"],
      ctx: "Reflexive pronoun — je ME lève.",
    },
    {
      type: "weave",
      en: "I go to bed late.",
      blanks: [
        { word: "go to bed", answer: "couche" },
        { word: "late", answer: "tard" },
      ],
      full: "Je me couche tard.",
    },
    {
      type: "context",
      situation:
        "A friend asks if you always go to bed late. You say yes, it's your normal habit.",
      a: "Oui, d'habitude, je me couche tard.",
      o: [
        "Oui, d'habitude, je me couche tard.",
        "Oui, en ce moment",
        "Oui, tous les jours je me lève",
        "Oui, puis je dors",
      ],
    },
  ],
  sayIt: [
    {
      situation:
        "Describe your full day: when you get up, what you do during the day, when you go to bed.",
      target: [
        "me",
        "lève",
        "heures",
        "travaille",
        "mange",
        "couche",
      ],
    },
    {
      situation:
        "Compare your routine with your family: who gets up early, who sleeps late.",
      target: [
        "se",
        "lève",
        "tôt",
        "couche",
        "tard",
        "matin",
        "soir",
      ],
    },
  ],
  miniConv: {
    topic: "Describing daily routines and comparing schedules",
    starter:
      "Tu te lèves à quelle heure le matin ? Moi, je me lève à six heures.",
  },
  expressions: [
    {
      fr: "Tous les jours",
      en: "Every day",
      usage: "'Je me lève à sept heures tous les jours.'",
      literal: "All the days",
    },
    {
      fr: "D'habitude",
      en: "Usually",
      usage: "'D'habitude, je me couche tard.'",
      literal: "Of habit",
    },
    {
      fr: "En ce moment",
      en: "At the moment / Currently",
      usage: "'En ce moment, je travaille beaucoup.'",
      literal: "In this moment",
    },
  ],
  grammarNuggets: [
    {
      title: "Reflexive verbs = regular verb + mirror",
      insight:
        "'Lever' = to raise (something). 'SE lever' = to raise YOURSELF. 'Laver' = to wash (something). 'SE laver' = to wash YOURSELF. The 'se' is just a mirror. ANY verb can theoretically become reflexive. It's not a new verb type — it's a regular verb + 'myself.'",
      example:
        "lever (to raise) → se lever (to get up = raise yourself)",
    },
    {
      title: "Reflexive pronoun goes BEFORE the verb, not after",
      insight:
        "English: 'I wash myself' — pronoun AFTER. French: 'Je ME lave' — pronoun BEFORE. The reflexive pronoun is sandwiched between subject and verb. Je ME lève, tu TE lèves, il SE lève. Always before, never after.",
      example:
        "Je me réveille, tu te lèves, il se lave — pronoun always before verb",
    },
  ],
  fauxAmis: [
    {
      fr: "journée",
      looksLike: "journey",
      actualMeaning: "the whole day (duration)",
      example: "Bonne journée ! (Have a good day!)",
    },
  ],
  cultureBite:
    "French has two words for 'day': 'jour' (the calendar unit) and 'journée' (the experience of a day). Same for 'soir/soirée', 'matin/matinée', 'an/année'. When you want to emphasize the EXPERIENCE or DURATION, use the feminine form: 'Bonne journée !' (Enjoy your day!).",
  summary: [
    "Reflexive verbs: se lever, se coucher, se laver, s'habiller",
    "Pronoun agreement: je me, tu te, il/elle se, nous nous, vous vous, ils se",
    "Time expressions: le matin, l'après-midi, le soir, la nuit",
    "Expression: tous les jours, d'habitude, en ce moment",
  ],
};
