import type { Lesson } from "@/lib/types";

export const lesson18: Lesson = {
  id: 18,
  title: "Regular -er Verbs",
  sub: "One pattern, hundreds of verbs",
  icon: "Layers",
  level: "A1",
  difficulty: "medium",
  grammar: {
    title: "The -er Verb Pattern",
    sections: [
      {
        type: "intro",
        text: "About 90% of French verbs end in *-er*, and they ALL follow the same pattern. Learn this one conjugation and you can use hundreds of verbs. The model verb is *parler* (to speak).",
      },
      {
        type: "conjugation",
        verb: "parler (to speak)",
        rows: [
          { pr: "je", conj: "parle", en: "I speak", pron: "PARL" },
          { pr: "tu", conj: "parles", en: "you speak", pron: "PARL" },
          { pr: "il/elle", conj: "parle", en: "he/she speaks", pron: "PARL" },
          { pr: "nous", conj: "parlons", en: "we speak", pron: "par-LOHN" },
          { pr: "vous", conj: "parlez", en: "you speak", pron: "par-LAY" },
          { pr: "ils/elles", conj: "parlent", en: "they speak", pron: "PARL" },
        ],
      },
      {
        type: "tip",
        text: "The magic trick: *je parle*, *tu parles*, *il parle*, and *ils parlent* all sound EXACTLY the same — /paʁl/. Four different spellings, one sound. French loves silent endings.",
      },
      {
        type: "block",
        label: "10 Essential -er Verbs",
        items: [
          { fr: "manger", en: "to eat", note: "Cognate of 'mange' (as in horse mange — old meaning: to eat)" },
          { fr: "travailler", en: "to work", note: "Related to English 'travail' (hard work)" },
          { fr: "habiter", en: "to live (somewhere)", note: "Cognate of 'inhabit' — same Latin root" },
          { fr: "aimer", en: "to love / to like", note: "Cognate of 'amour' — Latin amare" },
          { fr: "détester", en: "to hate", note: "Cognate of 'detest' — exact same word!" },
          { fr: "chercher", en: "to look for", note: "Related to English 'search' via Old French" },
          { fr: "donner", en: "to give", note: "Cognate of 'donate' — Latin donare" },
          { fr: "regarder", en: "to watch / to look at", note: "Related to 'regard' (to look at with attention)" },
          { fr: "écouter", en: "to listen", note: "No English cognate, but think 'acoustic' for the sound link" },
          { fr: "jouer", en: "to play", note: "Think 'joust' — knights playing at combat" },
        ],
      },
      {
        type: "tip",
        text: "Verb + infinitive is a powerful combo: *j'aime manger* (I like to eat), *je déteste travailler* (I hate working). The second verb stays in infinitive form — no conjugation needed!",
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "Je travaille",
            phonetic: "zhuh tra-VYE",
            ipa: "/ʒə tʁa.vaj/",
            notes: "The -aille ending sounds like 'eye'. Silent final -e.",
          },
          {
            fr: "Nous mangeons",
            phonetic: "noo mahn-ZHOHN",
            ipa: "/nu mɑ̃.ʒɔ̃/",
            notes: "Extra -e- keeps the 'zh' sound before -ons. Without it, 'g' would sound like 'g' in 'go'.",
          },
          {
            fr: "Ils écoutent",
            phonetic: "eelz ay-KOOT",
            ipa: "/il.z‿e.kut/",
            notes: "Liaison: the 's' of ils links to the 'é'. The -ent is totally silent.",
          },
        ],
      },
    ],
    quickRecall: {
      q: "Which four forms of 'parler' sound identical?",
      a: "je, tu, il, ils",
      o: ["je, tu, il, ils", "nous, vous, ils, elles", "je, nous, vous, ils", "tu, il, nous, vous"],
    },
  },
  examples: [
    {
      fr: "Je parle français et anglais.",
      en: "I speak French and English.",
      bridge: "Je parle French and English.",
    },
    {
      fr: "Tu travailles le samedi ?",
      en: "Do you work on Saturdays?",
      bridge: "Tu travailles on Saturdays?",
    },
    {
      fr: "Elle habite à Paris.",
      en: "She lives in Paris.",
      bridge: "Elle habite in Paris.",
    },
    {
      fr: "Nous aimons la musique.",
      en: "We love music.",
      bridge: "Nous aimons the music.",
    },
    {
      fr: "J'aime manger au restaurant.",
      en: "I like eating at restaurants.",
      bridge: "J'aime manger at the restaurant.",
    },
    {
      fr: "Ils regardent la télévision.",
      en: "They watch television.",
      bridge: "Ils regardent the television.",
    },
    {
      fr: "Je déteste travailler le lundi.",
      en: "I hate working on Mondays.",
      bridge: "Je déteste travailler on Monday.",
    },
    {
      fr: "Vous cherchez quelque chose ?",
      en: "Are you looking for something?",
      bridge: "Vous cherchez something?",
    },
  ],
  fillFG: [
    {
      s: "I [___] French.",
      a: "parle",
      o: ["parle", "parlons", "parlez", "parlent"],
      ctx: "Saying what language you speak (je).",
    },
    {
      s: "She [___] in Lyon.",
      a: "habite",
      o: ["habite", "habitons", "habitez", "habites"],
      ctx: "Telling someone where she lives.",
    },
    {
      s: "We [___] music.",
      a: "aimons",
      o: ["aimons", "aime", "aimez", "aiment"],
      ctx: "Expressing a shared love (nous).",
    },
    {
      s: "They [___] television.",
      a: "regardent",
      o: ["regardent", "regarde", "regardons", "regardez"],
      ctx: "Describing what they do in the evening.",
    },
    {
      s: "I [___] to eat at restaurants.",
      a: "aime",
      o: ["aime", "aimons", "mange", "manges"],
      ctx: "Talking about your hobbies.",
    },
  ],
  fillBlanks: [
    {
      s: "Je ___ français.",
      a: "parle",
      o: ["parle", "parlons", "parlez", "mange"],
      ctx: "Introduce which language you speak.",
    },
    {
      s: "Nous ___ au restaurant.",
      a: "mangeons",
      o: ["mangeons", "mange", "mangez", "mangent"],
      ctx: "You and your friends are eating out.",
    },
    {
      s: "Tu ___ la radio ?",
      a: "écoutes",
      o: ["écoutes", "écoute", "écoutons", "écoutez"],
      ctx: "Asking a friend if they listen to the radio.",
    },
    {
      s: "Il ___ un cadeau.",
      a: "donne",
      o: ["donne", "donnons", "donnez", "donnent"],
      ctx: "He is giving a gift.",
    },
    {
      s: "Vous ___ où ?",
      a: "habitez",
      o: ["habitez", "habite", "habites", "habitons"],
      ctx: "Asking someone where they live (formal).",
    },
  ],
  buildSentences: [
    {
      c: ["Je", "parle", "français"],
      en: "I speak French",
      trap: ["parlons", "anglais"],
    },
    {
      c: ["Elle", "habite", "à", "Paris"],
      en: "She lives in Paris",
      trap: ["habitons", "de"],
    },
    {
      c: ["J'", "aime", "manger", "au", "restaurant"],
      en: "I like eating at the restaurant",
      trap: ["mange", "le"],
    },
    {
      c: ["Nous", "écoutons", "la", "musique"],
      en: "We listen to music",
      trap: ["écoute", "un"],
    },
  ],
  quiz: [
    {
      q: "What percentage of French verbs end in -er?",
      a: "About 90%",
      o: ["About 50%", "About 70%", "About 90%", "100%"],
    },
    {
      q: "What is the 'nous' ending for -er verbs?",
      a: "-ons",
      o: ["-ons", "-ez", "-ent", "-es"],
    },
    {
      q: "'Habiter' is a cognate of which English word?",
      a: "Inhabit",
      o: ["Habit", "Inhabit", "Habitat", "Habitual"],
    },
    {
      q: "How do you say 'I like to eat'?",
      a: "J'aime manger",
      o: ["J'aime manger", "Je mange aimer", "J'aime mange", "Je manger aime"],
    },
    {
      q: "Which ending is SILENT in 'ils parlent'?",
      a: "-ent",
      o: ["-ent", "-ons", "-ez", "-er"],
      ctx: "Think about which forms sound the same.",
    },
    {
      q: "What is the 'vous' form of 'chercher'?",
      a: "cherchez",
      o: ["cherchez", "cherche", "cherchons", "cherchent"],
    },
    {
      q: "In 'j'aime manger', why is 'manger' not conjugated?",
      a: "The second verb stays in infinitive",
      o: ["The second verb stays in infinitive", "It's a special exception", "Both verbs must match", "Only the first verb matters in French"],
    },
    {
      q: "'Donner' is a cognate of which English word?",
      a: "Donate",
      o: ["Donate", "Done", "Dinner", "Down"],
    },
  ],
  combine: [
    {
      hint: "I + like + eat + restaurant → Talk about a hobby",
      answer: "J'aime manger au restaurant",
      accept: [
        "j'aime manger au restaurant",
        "jaime manger au restaurant",
      ],
    },
    {
      hint: "She + live + Paris → Say where someone lives",
      answer: "Elle habite à Paris",
      accept: [
        "elle habite à paris",
        "elle habite a paris",
      ],
    },
    {
      hint: "We + listen + music → Shared activity",
      answer: "Nous écoutons la musique",
      accept: [
        "nous écoutons la musique",
        "nous ecoutons la musique",
      ],
    },
  ],
  weave: [
    {
      en: "I speak French and I work in Paris.",
      known: ["je", "parle", "français", "travaille", "à", "Paris"],
      sample: "Je parle français and je travaille in Paris.",
    },
    {
      en: "She likes to eat at the restaurant.",
      known: ["elle", "aime", "manger", "au", "restaurant"],
      sample: "Elle aime manger at the restaurant.",
    },
    {
      en: "We watch television and listen to music.",
      known: ["nous", "regardons", "la", "télévision", "écoutons", "musique"],
      sample: "Nous regardons la télévision and écoutons la musique.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Je parle français et anglais.",
      q: "What is the person saying?",
      a: "They speak French and English",
      o: [
        "They speak French and English",
        "They are learning French",
        "They live in France",
        "They work in England",
      ],
    },
    {
      type: "odd",
      q: "Which does NOT belong?",
      items: ["parler", "manger", "avoir", "donner"],
      a: "avoir",
      reason: "Avoir is irregular. The others are regular -er verbs.",
    },
    {
      type: "context",
      situation: "You want to say you hate working on Mondays.",
      a: "Je déteste travailler le lundi",
      o: [
        "Je déteste travailler le lundi",
        "Je travaille le lundi",
        "J'aime le lundi",
        "Je mange le lundi",
      ],
    },
    {
      type: "fill_ctx",
      s: "Ils ___ la télévision le soir.",
      a: "regardent",
      o: ["regardent", "regarde", "regardons", "regardez"],
      ctx: "They watch TV in the evening.",
    },
  ],
  sayIt: [
    {
      situation: "Tell someone about your hobbies — what you like and what you hate doing.",
      target: ["aime", "déteste", "manger", "travailler"],
    },
    {
      situation: "Introduce yourself: say what languages you speak and where you live.",
      target: ["parle", "habite", "français"],
    },
  ],
  miniConv: {
    topic: "Talking about daily activities and hobbies",
    starter: "Bonjour ! Qu'est-ce que tu aimes faire le week-end ?",
  },
  expressions: [
    {
      fr: "Travailler dur",
      en: "To work hard",
      usage: "Mon père travaille dur — il travaille six jours par semaine.",
      literal: "To work hard",
    },
    {
      fr: "Chercher la petite bête",
      en: "To nitpick / to be overly critical",
      usage: "Arrête de chercher la petite bête !",
      literal: "To look for the little beast",
    },
    {
      fr: "Manger sur le pouce",
      en: "To grab a quick bite",
      usage: "Je n'ai pas le temps, je mange sur le pouce.",
      literal: "To eat on the thumb",
    },
  ],
  grammarNuggets: [
    {
      title: "Silent endings = one sound, four spellings",
      insight: "In spoken French, je parle / tu parles / il parle / ils parlent are IDENTICAL. You only hear the difference with nous and vous. This means in conversation, context tells you who's speaking — not the verb ending.",
      example: "je parle = tu parles = il parle = ils parlent → all /paʁl/",
    },
    {
      title: "Verb + infinitive = instant sentence upgrade",
      insight: "Put any conjugated verb before an infinitive and you've got a complex sentence: j'aime manger, je déteste travailler, je voudrais habiter... The second verb NEVER changes form.",
      example: "J'aime danser, je déteste chanter, je voudrais voyager",
    },
  ],
  fauxAmis: [
    {
      fr: "regarder",
      looksLike: "regard (respect/esteem)",
      actualMeaning: "To watch / to look at (not about respect)",
      example: "Je regarde la télé — I'm watching TV, not 'regarding' it.",
    },
  ],
  soundPatterns: [
    {
      pattern: "-er → silent r",
      examples: [
        { fr: "parler", en: "to speak" },
        { fr: "manger", en: "to eat" },
        { fr: "donner", en: "to give" },
      ],
      rule: "The infinitive ending -er is pronounced 'AY' (/e/). The r is completely silent — parler sounds like 'par-LAY'.",
    },
  ],
  cultureBite: "The French work to live, not live to work. France has a 35-hour workweek and most shops close on Sundays. When someone asks 'Tu travailles beaucoup?', the expected answer is a modest one — bragging about overwork is seen as poor life balance.",
  summary: [
    "The -er conjugation pattern: -e, -es, -e, -ons, -ez, -ent",
    "10 essential -er verbs: parler, manger, travailler, habiter...",
    "Silent endings: 4 forms sound identical (je/tu/il/ils)",
    "Verb + infinitive combo: j'aime manger, je déteste travailler",
  ],
};
