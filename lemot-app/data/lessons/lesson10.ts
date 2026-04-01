import type { Lesson } from "@/lib/types";

export const lesson10: Lesson = {
  id: 10,
  title: "Faire: The Do-It-All Verb",
  sub: "The #3 verb in French",
  icon: "Wrench",
  level: "A1",
  difficulty: "medium",
  grammar: {
    title: "Faire — To Do / To Make",
    sections: [
      {
        type: "intro",
        text: "*Faire* is everywhere in French. It means 'to do' and 'to make,' but also powers weather expressions, activities, and dozens of idioms. If *être* describes what you ARE and *avoir* what you HAVE, *faire* describes what you DO.",
      },
      {
        type: "conjugation",
        verb: "faire — to do/make",
        rows: [
          { pr: "Je", conj: "fais", en: "I do/make", pron: "/ʒə fɛ/" },
          { pr: "Tu", conj: "fais", en: "You do/make", pron: "/ty fɛ/" },
          { pr: "Il/Elle", conj: "fait", en: "He/She does/makes", pron: "/il fɛ/" },
          { pr: "Nous", conj: "faisons", en: "We do/make", pron: "/nu fə.zɔ̃/" },
          { pr: "Vous", conj: "faites", en: "You do/make", pron: "/vu fɛt/" },
          { pr: "Ils/Elles", conj: "font", en: "They do/make", pron: "/il fɔ̃/" },
        ],
      },
      {
        type: "block",
        label: "Weather: Il fait + adjective",
        items: [
          {
            fr: "Il fait beau.",
            en: "The weather is nice.",
            note: "Literally: 'It makes beautiful.' French uses faire for weather, not être.",
          },
          {
            fr: "Il fait chaud.",
            en: "It's hot.",
            note: "Chaud ≈ scald. Same Latin root for heat.",
          },
          {
            fr: "Il fait froid.",
            en: "It's cold.",
            note: "Froid ≈ frigid. Same Latin root 'frigidus.'",
          },
          {
            fr: "Il fait mauvais.",
            en: "The weather is bad.",
            note: "Mauvais = bad. Opposite of beau/bon.",
          },
        ],
      },
      {
        type: "block",
        label: "Activities: faire + du/de la/des",
        items: [
          {
            fr: "faire du sport",
            en: "to do sport / exercise",
            note: "Du = partitive. You do 'some' sport.",
          },
          {
            fr: "faire la cuisine",
            en: "to cook (do the cooking)",
            note: "Cuisine ≈ cuisine. Literally: 'make the cooking.'",
          },
          {
            fr: "faire les courses",
            en: "to do the grocery shopping",
            note: "Les courses = the errands/shopping. Not 'courses' (classes)!",
          },
          {
            fr: "faire du vélo",
            en: "to go cycling",
            note: "Vélo = bicycle. Faire du vélo = to do some cycling.",
          },
        ],
      },
      {
        type: "tip",
        text: "*Qu'est-ce que tu fais ?* = What are you doing? This is the single most useful question with faire. You'll hear it and say it every day.",
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "faisons",
            phonetic: "fuh-ZOHN",
            ipa: "/fə.zɔ̃/",
            notes:
              "The 'ai' in faisons sounds like 'uh' (schwa), not 'ay'. Irregular pronunciation!",
          },
          {
            fr: "faites",
            phonetic: "feht",
            ipa: "/fɛt/",
            notes:
              "Rhymes with 'met'. The -es is silent. One clean syllable.",
          },
          {
            fr: "font",
            phonetic: "fohn",
            ipa: "/fɔ̃/",
            notes:
              "Nasal 'oh' — don't pronounce the 't'. Same nasal as 'on' and 'vont'.",
          },
        ],
      },
      {
        type: "culture",
        text: "'Qu'est-ce que tu fais dans la vie ?' (What do you do for a living?) is how the French ask about your job. Notice: they ask what you DO, not what you ARE. A subtle but real cultural difference from 'I am a doctor.'",
      },
    ],
    quickRecall: {
      q: "How do you say 'The weather is nice'?",
      a: "Il fait beau",
      o: ["Il fait beau", "Il est beau", "Il a beau", "C'est beau"],
    },
  },
  examples: [
    {
      fr: "Qu'est-ce que tu fais ?",
      en: "What are you doing?",
      bridge: "What est-ce que tu fais?",
    },
    {
      fr: "Il fait beau aujourd'hui.",
      en: "The weather is nice today.",
      bridge: "Il fait nice aujourd'hui.",
    },
    {
      fr: "Je fais du sport le matin.",
      en: "I exercise in the morning.",
      bridge: "Je fais du sport le morning.",
    },
    {
      fr: "Elle fait la cuisine ce soir.",
      en: "She's cooking tonight.",
      bridge: "Elle fait la cuisine ce evening.",
    },
    {
      fr: "Nous faisons les courses.",
      en: "We're doing the grocery shopping.",
      bridge: "Nous faisons les grocery shopping.",
    },
    {
      fr: "Il fait froid en hiver.",
      en: "It's cold in winter.",
      bridge: "Il fait cold en winter.",
    },
    {
      fr: "Vous faites du vélo ?",
      en: "Do you go cycling?",
      bridge: "Vous faites du cycling?",
    },
    {
      fr: "Ils font du sport ensemble.",
      en: "They exercise together.",
      bridge: "Ils font du sport together.",
    },
  ],
  fillFG: [
    {
      s: "What are you [___]?",
      a: "fais",
      o: ["fais", "es", "as", "vas"],
      ctx: "Qu'est-ce que tu fais ?",
    },
    {
      s: "The weather is [___] (nice).",
      a: "beau",
      o: ["beau", "chaud", "froid", "mauvais"],
      ctx: "Il fait beau = nice weather.",
    },
    {
      s: "I [___] sport in the morning.",
      a: "fais",
      o: ["fais", "suis", "ai", "vais"],
      ctx: "Faire du sport = to exercise.",
    },
    {
      s: "She's [___] the cooking tonight.",
      a: "fait",
      o: ["fait", "fais", "est", "a"],
      ctx: "Elle fait la cuisine.",
    },
    {
      s: "It's [___] (cold) in winter.",
      a: "froid",
      o: ["froid", "chaud", "beau", "mauvais"],
      ctx: "Il fait froid = it's cold.",
    },
  ],
  fillBlanks: [
    {
      s: "Qu'est-ce que tu ___ ?",
      a: "fais",
      o: ["fais", "es", "as", "vas"],
      ctx: "What are you doing?",
    },
    {
      s: "Il fait ___ aujourd'hui.",
      a: "beau",
      o: ["beau", "froid", "chaud", "mauvais"],
      ctx: "The weather is nice today.",
    },
    {
      s: "Je fais ___ sport.",
      a: "du",
      o: ["du", "le", "de la", "un"],
      ctx: "I do (some) sport — masculine partitive.",
    },
    {
      s: "Nous ___ les courses.",
      a: "faisons",
      o: ["faisons", "sommes", "avons", "allons"],
      ctx: "We're doing the shopping.",
    },
    {
      s: "Ils ___ du vélo.",
      a: "font",
      o: ["font", "vont", "sont", "ont"],
      ctx: "They go cycling.",
    },
  ],
  buildSentences: [
    {
      c: ["Il", "fait", "beau", "aujourd'hui"],
      en: "The weather is nice today.",
      trap: ["est", "a"],
    },
    {
      c: ["Je", "fais", "du", "sport"],
      en: "I exercise.",
      trap: ["suis", "le"],
    },
    {
      c: ["Qu'est-ce", "que", "tu", "fais", "?"],
      en: "What are you doing?",
      trap: ["es", "vas"],
    },
    {
      c: ["Elle", "fait", "la", "cuisine", "ce", "soir"],
      en: "She's cooking tonight.",
      trap: ["est", "du"],
    },
  ],
  quiz: [
    {
      q: "How does French express weather?",
      a: "Il fait + adjective",
      o: [
        "Il fait + adjective",
        "Il est + adjective",
        "Il a + adjective",
        "C'est + adjective",
      ],
      ctx: "Il fait beau, il fait chaud, il fait froid.",
    },
    {
      q: "'Je fais du sport' means...",
      a: "I exercise / I do sport",
      o: [
        "I exercise / I do sport",
        "I am sport",
        "I have sport",
        "I go sport",
      ],
    },
    {
      q: "'Faire la cuisine' means...",
      a: "To cook",
      o: ["To cook", "To eat", "To clean", "To order food"],
      ctx: "Literally: 'to do/make the cooking.'",
    },
    {
      q: "What's 'il fait froid'?",
      a: "It's cold",
      o: ["It's cold", "It's hot", "It's nice", "It's bad"],
      ctx: "Froid ≈ frigid.",
    },
    {
      q: "'Faire les courses' is...",
      a: "Grocery shopping",
      o: ["Grocery shopping", "Taking classes", "Running a race", "Cooking"],
      ctx: "Les courses = errands/shopping, NOT courses/classes!",
    },
    {
      q: "'Qu'est-ce que tu fais ?' means...",
      a: "What are you doing?",
      o: [
        "What are you doing?",
        "Who are you?",
        "Where are you going?",
        "How are you?",
      ],
    },
    {
      q: "You check the weather and it's great outside. You say: 'Il fait beau, _______ !'",
      a: "on y va",
      o: ["on y va", "il fait froid", "ça ne fait rien", "faire la grasse matinée"],
      ctx: "Nice weather → let's go!",
    },
    {
      q: "A friend spills coffee on your shirt. You reassure them: '_______.'",
      a: "Ça ne fait rien",
      o: ["Ça ne fait rien", "Il fait chaud", "On y va", "Il fait beau"],
      ctx: "The expression meaning 'it doesn't matter / no worries'.",
    },
  ],
  combine: [
    {
      hint: "Weather (nice) + sport → Say the weather is nice and you're going to exercise",
      answer: "Il fait beau, je vais faire du sport.",
      accept: [
        "il fait beau je vais faire du sport",
        "il fait beau, je vais faire du sport",
      ],
    },
    {
      hint: "Ask what doing + tonight → Ask what someone is doing tonight",
      answer: "Qu'est-ce que tu fais ce soir ?",
      accept: [
        "qu'est-ce que tu fais ce soir",
        "qu'est-ce que tu fais ce soir ?",
      ],
    },
    {
      hint: "Cooking + cold → Say she's cooking because it's cold",
      answer: "Elle fait la cuisine parce qu'il fait froid.",
      accept: [
        "elle fait la cuisine parce qu'il fait froid",
        "elle fait la cuisine parce qu il fait froid",
      ],
    },
  ],
  weave: [
    {
      en: "What are you doing? The weather is nice. I'm going to exercise.",
      known: [
        "qu'est-ce que",
        "tu",
        "fais",
        "il",
        "fait",
        "beau",
        "je",
        "vais",
        "faire",
        "du",
        "sport",
      ],
      sample:
        "Qu'est-ce que tu fais? Il fait beau. Je vais faire du sport.",
    },
    {
      en: "She's cooking tonight. We're doing the shopping. They exercise together.",
      known: [
        "elle",
        "fait",
        "la",
        "cuisine",
        "ce",
        "soir",
        "nous",
        "faisons",
        "les",
        "courses",
        "ils",
        "font",
        "du",
        "sport",
        "ensemble",
      ],
      sample:
        "Elle fait la cuisine ce soir. Nous faisons les courses. Ils font du sport ensemble.",
    },
    {
      en: "It's cold today. He does cycling in the morning. What do you do?",
      known: [
        "il",
        "fait",
        "froid",
        "aujourd'hui",
        "du",
        "vélo",
        "le",
        "matin",
        "qu'est-ce que",
        "tu",
        "fais",
      ],
      sample:
        "Il fait froid aujourd'hui. Il fait du vélo le matin. Qu'est-ce que tu fais?",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Il fait beau, je vais faire du sport.",
      q: "What's the plan?",
      a: "Exercise because the weather is nice",
      o: [
        "Exercise because the weather is nice",
        "Cooking dinner tonight",
        "Going grocery shopping",
        "Staying inside because it's cold",
      ],
    },
    {
      type: "odd",
      q: "Which is NOT a form of 'faire'?",
      items: ["fais", "faisons", "font", "vont"],
      a: "vont",
      reason: "Vont is from 'aller' (to go), not 'faire' (to do/make).",
    },
    {
      type: "context",
      situation: "You want to know what your friend is doing tonight.",
      a: "Qu'est-ce que tu fais ce soir ?",
      o: [
        "Qu'est-ce que tu fais ce soir ?",
        "Il fait beau ce soir",
        "Je fais du sport",
        "Tu fais la cuisine",
      ],
    },
    {
      type: "fill_ctx",
      s: "Il ___ froid en hiver.",
      a: "fait",
      o: ["fait", "est", "a", "va"],
      ctx: "Weather uses faire: il fait froid.",
    },
  ],
  sayIt: [
    {
      situation:
        "Describe today's weather and what activities you're going to do.",
      target: ["fait", "beau", "froid", "fais", "sport", "cuisine"],
    },
    {
      situation:
        "Ask a friend what they're doing this weekend and suggest an activity together.",
      target: ["qu'est-ce que", "fais", "faire", "du", "on", "va"],
    },
  ],
  miniConv: {
    topic: "Talking about activities, weather, and daily routines with faire",
    starter: "Salut ! Il fait beau aujourd'hui. Tu fais quoi ?",
  },
  expressions: [
    {
      fr: "Ça ne fait rien",
      en: "It doesn't matter / No worries",
      usage: "Someone apologizes for a small mistake: 'Ça ne fait rien !'",
      literal: "That makes nothing",
    },
    {
      fr: "Faire la grasse matinée",
      en: "To sleep in / Have a lie-in",
      usage: "'Le dimanche, je fais la grasse matinée.' (On Sundays, I sleep in.)",
      literal: "To make the fat morning",
    },
    {
      fr: "Ça fait combien ?",
      en: "How much is it? (total)",
      usage: "At the register: 'Ça fait combien ?' (How much does that come to?)",
      literal: "That makes how much?",
    },
  ],
  grammarNuggets: [
    {
      title: "Faire for weather is not random — it's 'making' conditions",
      insight:
        "English says 'it IS cold.' French says 'it MAKES cold' (il fait froid). The logic: weather isn't a state of being — it's an active force creating conditions. The sky 'makes' heat, cold, beauty. Once you see weather as something being produced, 'il fait' makes perfect sense.",
      example: "Il fait beau (it makes beautiful) vs Il fait froid (it makes cold)",
    },
    {
      title: "Faire + du/de la = 'to do some of'",
      insight:
        "When faire pairs with an activity, you add the partitive (du/de la). 'Faire du sport' = 'to do some sport.' It's the same partitive as food: 'du pain' (some bread), 'du sport' (some sport). One system, many uses.",
      example: "faire du sport, faire de la musique, faire du vélo",
    },
  ],
  fauxAmis: [
    {
      fr: "les courses",
      looksLike: "courses (classes/lessons)",
      actualMeaning: "grocery shopping / errands",
      example: "Je fais les courses au supermarché. (I do the grocery shopping at the supermarket.)",
    },
  ],
  cultureBite:
    "'Faire la grasse matinée' (to sleep in) literally means 'to make the fat morning.' The French see sleeping in as indulgent and luxurious — a 'fat' morning rich with rest. It's one of life's small pleasures, not laziness.",
  summary: [
    "Faire conjugation: je fais, tu fais, il fait, nous faisons...",
    "Weather: il fait beau/chaud/froid/mauvais",
    "Activities: faire du sport, faire la cuisine, faire les courses",
    "Qu'est-ce que tu fais ? = What are you doing?",
  ],
};
