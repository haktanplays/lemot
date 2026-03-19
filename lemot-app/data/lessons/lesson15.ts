import type { Lesson } from "@/lib/types";

export const lesson15: Lesson = {
  id: 15,
  title: "My Day",
  sub: "Wake up, work, eat, sleep \u2014 describe your routine",
  icon: "Sun",
  level: "A1",
  grammar: {
    title: "Daily Routine & Reflexive Verbs",
    sections: [
      {
        type: "intro",
        text: "When you do something to yourself \u2014 get UP, wash YOURSELF, dress YOURSELF \u2014 French uses reflexive verbs: *se lever* (to get up), *se laver* (to wash), *se coucher* (to go to bed).",
      },
      {
        type: "block",
        label: "Reflexive Verbs: The Pattern",
        items: [
          {
            fr: "Je me l\u00e8ve",
            en: "I get up (I raise myself)",
            note: "Me = myself. Lever \u2248 lever (something that raises).",
          },
          {
            fr: "Tu te laves",
            en: "You wash (yourself)",
            note: "Te = yourself. Laver \u2248 lavatory (place to wash).",
          },
          {
            fr: "Il/Elle se couche",
            en: "He/She goes to bed",
            note: "Se = himself/herself. Coucher \u2248 couch (lie down).",
          },
          {
            fr: "Je m'habille",
            en: "I get dressed",
            note: "Me \u2192 m' before vowel. Habiller = to dress.",
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
            note: "Matin \u2248 matin\u00e9e (morning performance).",
          },
          {
            fr: "l'apr\u00e8s-midi",
            en: "in the afternoon",
            note: "Apr\u00e8s (after) + midi (noon) = afternoon.",
          },
          {
            fr: "le soir",
            en: "in the evening",
            note: "Soir \u2248 soir\u00e9e (evening event).",
          },
          {
            fr: "la nuit",
            en: "at night",
            note: "Nuit \u2248 nocturnal.",
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
            note: "Travailler \u2192 travail. WARNING: False friend with 'travel'!",
          },
          {
            fr: "manger",
            en: "to eat",
            note: "You learned this in L9!",
          },
          {
            fr: "dormir",
            en: "to sleep",
            note: "Dormir \u2248 dormant, dormitory.",
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
            note: "Je me l\u00e8ve, puis je me lave. = I get up, then I wash.",
          },
          {
            fr: "t\u00f4t",
            en: "early",
            note: "Je me l\u00e8ve t\u00f4t. = I get up early.",
          },
          {
            fr: "tard",
            en: "late",
            note: "Je me couche tard. \u2248 tardy.",
          },
        ],
      },
      {
        type: "tip",
        text: "Daily routine sentences follow a simple pattern: *time + reflexive verb*. 'Le matin, je me l\u00e8ve \u00e0 sept heures.' Everything clicks once you learn the pattern.",
      },
      {
        type: "culture",
        text: "The French workday often runs 9h-18h (9 AM-6 PM) with a real lunch break. Lunch is not eaten at the desk \u2014 it's a proper meal. 'La pause d\u00e9jeuner' is sacred.",
      },
    ],
    quickRecall: {
      q: "How do you say 'I get up'?",
      a: "Je me l\u00e8ve",
      o: [
        "Je me l\u00e8ve",
        "Je l\u00e8ve",
        "Je suis lev\u00e9",
        "J'ai lev\u00e9",
      ],
    },
  },
  examples: [
    {
      fr: "Le matin, je me l\u00e8ve \u00e0 sept heures.",
      en: "In the morning, I get up at seven.",
      bridge: "Le matin, je me l\u00e8ve \u00e0 seven heures.",
    },
    {
      fr: "Puis je me lave et je m'habille.",
      en: "Then I wash and get dressed.",
      bridge: "Puis je me wash et je me dress.",
    },
    {
      fr: "Je travaille l'apr\u00e8s-midi.",
      en: "I work in the afternoon.",
      bridge: "Je work l'apr\u00e8s-midi.",
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
      fr: "Elle se l\u00e8ve t\u00f4t le matin.",
      en: "She gets up early in the morning.",
      bridge: "Elle se l\u00e8ve early le matin.",
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
      a: "me l\u00e8ve",
      o: ["me l\u00e8ve", "l\u00e8ve", "suis lev\u00e9", "ai lev\u00e9"],
      ctx: "Reflexive: I get myself up.",
    },
    {
      s: "She goes to [___] late.",
      a: "se couche",
      o: ["se couche", "couche", "est couch\u00e9e", "a couch\u00e9"],
      ctx: "Reflexive: she puts herself to bed.",
    },
    {
      s: "I work in the [___].",
      a: "l'apr\u00e8s-midi",
      o: ["l'apr\u00e8s-midi", "matin", "nuit", "tard"],
      ctx: "Afternoon = apr\u00e8s-midi.",
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
      o: ["dort", "couche", "l\u00e8ve", "mange"],
      ctx: "Dormir = to sleep.",
    },
  ],
  fillBlanks: [
    {
      s: "Je ___ l\u00e8ve \u00e0 sept heures.",
      a: "me",
      o: ["me", "se", "te", "le"],
      ctx: "I get up \u2014 je ME l\u00e8ve.",
    },
    {
      s: "Elle ___ couche tard.",
      a: "se",
      o: ["se", "me", "te", "le"],
      ctx: "She goes to bed \u2014 elle SE couche.",
    },
    {
      s: "Je travaille ___.",
      a: "l'apr\u00e8s-midi",
      o: ["l'apr\u00e8s-midi", "la nuit", "t\u00f4t", "bien"],
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
      o: ["tard", "t\u00f4t", "bien", "ici"],
      ctx: "I go to bed late.",
    },
  ],
  buildSentences: [
    {
      c: ["Je", "me", "l\u00e8ve", "\u00e0", "sept", "heures"],
      en: "I get up at seven o'clock.",
      trap: ["se", "te"],
    },
    {
      c: ["Elle", "se", "couche", "tard"],
      en: "She goes to bed late.",
      trap: ["me", "t\u00f4t"],
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
      q: "'Je me l\u00e8ve' \u2014 'me' means...",
      a: "Myself",
      o: ["Myself", "Me", "My", "Mine"],
      ctx: "The reflexive pronoun.",
    },
    {
      q: "'L'apr\u00e8s-midi' means...",
      a: "The afternoon",
      o: ["The afternoon", "The morning", "The evening", "The night"],
    },
    {
      q: "'Tard' means...",
      a: "Late",
      o: ["Late", "Early", "Well", "Then"],
      ctx: "Tard \u2248 tardy.",
    },
    {
      q: "'Dormir' means...",
      a: "To sleep",
      o: ["To sleep", "To eat", "To work", "To wash"],
      ctx: "Dormir \u2248 dormant, dormitory.",
    },
    {
      q: "Which is the correct reflexive form?",
      a: "Il se l\u00e8ve",
      o: [
        "Il se l\u00e8ve",
        "Il me l\u00e8ve",
        "Il te l\u00e8ve",
        "Il l\u00e8ve",
      ],
      ctx: "Il/elle uses 'se'.",
    },
  ],
  combine: [
    {
      hint: "Get up (7AM) + wash + dress \u2192 Describe your morning routine",
      answer:
        "Je me l\u00e8ve \u00e0 sept heures, puis je me lave et je m'habille.",
      accept: [
        "je me leve a sept heures puis je me lave et je m'habille",
        "je me l\u00e8ve \u00e0 sept heures, puis je me lave et je m'habille",
      ],
    },
    {
      hint: "Work (afternoon) + eat (evening) + sleep (late) \u2192 Describe your day",
      answer:
        "Je travaille l'apr\u00e8s-midi, je mange le soir et je me couche tard.",
      accept: [
        "je travaille l'apres-midi je mange le soir et je me couche tard",
        "je travaille l'apr\u00e8s-midi, je mange le soir et je me couche tard",
      ],
    },
    {
      hint: "She gets up (early) + he sleeps (well) \u2192 Compare two routines",
      answer: "Elle se l\u00e8ve t\u00f4t et il dort bien.",
      accept: [
        "elle se leve tot et il dort bien",
        "elle se l\u00e8ve t\u00f4t et il dort bien",
      ],
    },
  ],
  franglais: [
    {
      en: "In the morning, I get up at seven. Then I wash and get dressed.",
      known: [
        "le",
        "matin",
        "je",
        "me",
        "l\u00e8ve",
        "\u00e0",
        "sept",
        "heures",
        "puis",
        "lave",
        "m'habille",
      ],
      sample:
        "Le matin, je me l\u00e8ve \u00e0 sept heures. Puis je me lave and je m'habille.",
    },
    {
      en: "I work in the afternoon and eat in the evening with my family.",
      known: [
        "je",
        "travaille",
        "l'apr\u00e8s-midi",
        "mange",
        "le",
        "soir",
        "avec",
        "ma",
        "famille",
      ],
      sample:
        "Je travaille l'apr\u00e8s-midi and je mange le soir avec ma famille.",
    },
    {
      en: "She goes to bed late and he gets up early. I sleep well at night.",
      known: [
        "elle",
        "se",
        "couche",
        "tard",
        "il",
        "l\u00e8ve",
        "t\u00f4t",
        "je",
        "dors",
        "bien",
        "la",
        "nuit",
      ],
      sample:
        "Elle se couche tard and il se l\u00e8ve t\u00f4t. Je dors bien la nuit.",
    },
  ],
  review: [
    {
      type: "listen",
      audio:
        "Le matin, je me l\u00e8ve \u00e0 six heures et je me lave.",
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
      a: "Je me l\u00e8ve et je me lave",
      o: [
        "Je me l\u00e8ve et je me lave",
        "Je me couche et je dors",
        "Je mange et je travaille",
        "Je pars et je vais",
      ],
    },
    {
      type: "fill_ctx",
      s: "___ tu t'appelles ? (Lesson 14)",
      a: "Comment",
      o: ["Comment", "Pourquoi", "Quand", "Qui"],
      ctx: "What's your name? Cross-reference L14.",
    },
    {
      type: "fill_ctx",
      s: "Je ___ l\u00e8ve \u00e0 sept heures.",
      a: "me",
      o: ["me", "se", "te", "le"],
      ctx: "Reflexive pronoun \u2014 je ME l\u00e8ve.",
    },
    {
      type: "franglais",
      en: "I go to bed late.",
      blanks: [
        { word: "go to bed", answer: "couche" },
        { word: "late", answer: "tard" },
      ],
      full: "Je me couche tard.",
    },
  ],
  sayIt: [
    {
      situation:
        "Describe your full day: when you get up, what you do during the day, when you go to bed.",
      target: [
        "me",
        "l\u00e8ve",
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
        "l\u00e8ve",
        "t\u00f4t",
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
      "Tu te l\u00e8ves \u00e0 quelle heure le matin ? Moi, je me l\u00e8ve \u00e0 six heures.",
  },
};
