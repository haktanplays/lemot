import type { Lesson } from "@/lib/types";

export const lesson5: Lesson = {
  id: 5,
  title: "Être: Who Am I?",
  sub: "The #1 verb in French",
  icon: "Star",
  level: "A1",
  difficulty: "medium",
  grammar: {
    title: "Être — To Be",
    sections: [
      {
        type: "intro",
        text: "*Être* comes from Latin *esse*. English *essence* belongs to the same family. So *être* isn't just 'to be' — it expresses the very *essence* of something. *C'est le verbe numéro un.*",
      },
      {
        type: "conjugation",
        verb: "être",
        rows: [
          { pr: "Je", conj: "suis", en: "I am", pron: "/ʒə sɥi/" },
          {
            pr: "Tu",
            conj: "es",
            en: "You are (informal)",
            pron: "/ty ɛ/",
          },
          {
            pr: "Il / Elle",
            conj: "est",
            en: "He/She is",
            pron: "/il ɛ/",
          },
          {
            pr: "Nous",
            conj: "sommes",
            en: "We are",
            pron: "/nu sɔm/",
          },
          {
            pr: "Vous",
            conj: "êtes",
            en: "You are (formal)",
            pron: "/vuz ɛt/",
          },
          {
            pr: "Ils / Elles",
            conj: "sont",
            en: "They are",
            pron: "/il sɔ̃/",
          },
        ],
      },
      {
        type: "culture",
        text: "French says *Je suis médecin* — NOT *Je suis UN médecin*. In French thinking, your profession is part of your identity. In English you MUST say 'I am a doctor,' but French drops the article entirely.",
      },
      {
        type: "etymology",
        pairs: [
          {
            fr: "essence",
            en: "essence",
            root: "Latin esse → être. The 'essence' of something = its 'state of being.'",
          },
          {
            fr: "absent",
            en: "absent",
            root: "Ab (away) + esse (to be) → 'not being there.'",
          },
          {
            fr: "présent",
            en: "present",
            root: "Prae (before) + esse → 'being in front.'",
          },
        ],
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "Je suis",
            phonetic: "zhuh SWEE",
            ipa: "/ʒə sɥi/",
            notes:
              "'zh' as in 'vision'. 'ui' like 'we' said quickly.",
          },
          {
            fr: "Nous sommes",
            phonetic: "noo SUM",
            ipa: "/nu sɔm/",
            notes: "'sommes' rhymes with 'some', not 'homes'.",
          },
          {
            fr: "Ils sont",
            phonetic: "eel SOHN",
            ipa: "/il sɔ̃/",
            notes:
              "'sont' is nasal — don't say the 'n' or 't'.",
          },
        ],
      },
      {
        type: "tip",
        text: "*C'est* is one of the most frequent French patterns: C'est bon (it's good), C'est vrai (it's true), C'est pas grave (no big deal). A French person says *c'est* 50-100 times a day.",
      },
    ],
    quickRecall: {
      q: "'Être' shares a root with which English word?",
      a: "Essence",
      o: ["Essence", "Estate", "Establish", "Essential"],
    },
  },
  examples: [
    {
      fr: "Je suis américain. Et toi ?",
      en: "I'm American. And you?",
      bridge: "Je suis American. And toi?",
    },
    {
      fr: "Elle est médecin à Paris.",
      en: "She is a doctor in Paris.",
      bridge: "Elle est doctor à Paris.",
    },
    {
      fr: "Nous sommes fatigués aujourd'hui.",
      en: "We're tired today.",
      bridge: "Nous sommes tired aujourd'hui.",
    },
    {
      fr: "Vous êtes prêts ?",
      en: "Are you ready?",
      bridge: "Vous êtes ready?",
    },
    {
      fr: "C'est pas grave, ça arrive.",
      en: "No big deal, it happens.",
      bridge: "C'est pas grave, it happens.",
    },
    {
      fr: "Tu es français ? Non, je suis anglais.",
      en: "Are you French? No, I'm English.",
      bridge: "Tu es French? Non, je suis English.",
    },
    {
      fr: "Ils sont contents, nous sommes contents aussi.",
      en: "They're happy, we're happy too.",
      bridge: "Ils sont happy, nous sommes happy aussi.",
    },
    {
      fr: "Il est étudiant, elle est professeur.",
      en: "He's a student, she's a teacher.",
      bridge: "Il est student, elle est teacher.",
    },
  ],
  fillFG: [
    {
      s: "I [___] American.",
      a: "suis",
      o: ["suis", "es", "est", "sommes"],
      ctx: "Introduce yourself at a dinner party.",
    },
    {
      s: "She [___] a doctor in Paris.",
      a: "est",
      o: ["est", "suis", "es", "sont"],
      ctx: "Tell a friend about someone's job.",
    },
    {
      s: "We [___] tired today.",
      a: "sommes",
      o: ["sommes", "sont", "êtes", "suis"],
      ctx: "After a long day of sightseeing.",
    },
    {
      s: "Are you [___]?",
      a: "prêts",
      o: ["prêts", "fatigués", "contents", "médecin"],
      ctx: "Ask your group if they're ready to leave.",
    },
    {
      s: "It's no big [___].",
      a: "grave",
      o: ["grave", "bon", "vrai", "fait"],
      ctx: "Comfort someone who made a small mistake.",
    },
  ],
  fillBlanks: [
    {
      s: "Je ___ étudiant.",
      a: "suis",
      o: ["suis", "es", "est", "sommes"],
      ctx: "You're introducing yourself at university.",
    },
    {
      s: "Elle ___ française.",
      a: "est",
      o: ["est", "es", "suis", "sont"],
      ctx: "Describe your friend's nationality.",
    },
    {
      s: "Nous ___ fatigués.",
      a: "sommes",
      o: ["sommes", "sont", "êtes", "suis"],
      ctx: "You and your friends after a long hike.",
    },
    {
      s: "Vous ___ prêts ?",
      a: "êtes",
      o: ["êtes", "sommes", "sont", "es"],
      ctx: "Ask the whole group if they're ready.",
    },
    {
      s: "Ils ___ à l'école.",
      a: "sont",
      o: ["sont", "sommes", "est", "suis"],
      ctx: "Explain where the kids are.",
    },
  ],
  buildSentences: [
    {
      c: ["Je", "suis", "étudiant"],
      en: "I am a student",
      trap: ["est", "une"],
    },
    {
      c: ["Elle", "est", "médecin", "à", "Paris"],
      en: "She is a doctor in Paris",
      trap: ["suis", "le"],
    },
    {
      c: ["Nous", "sommes", "fatigués", "aujourd'hui"],
      en: "We are tired today",
      trap: ["sont", "est"],
    },
    {
      c: ["C'est", "pas", "grave"],
      en: "No big deal",
      trap: ["suis", "bon"],
    },
  ],
  quiz: [
    {
      q: "'Être' shares a root with which English word?",
      a: "Essence",
      o: ["Essential", "Essence", "Estate", "Establish"],
    },
    {
      q: "Which is WRONG when stating your profession in French?",
      a: "Je suis un médecin",
      o: [
        "Je suis médecin",
        "Je suis un médecin",
        "Elle est médecin",
        "Il est étudiant",
      ],
      ctx: "This is a common mistake English speakers make.",
      negative: true,
    },
    {
      q: "You're at a party. Introduce yourself as a student.",
      a: "Je suis étudiant",
      o: [
        "Je suis un étudiant",
        "Je suis étudiant",
        "Je es étudiant",
        "J'ai étudiant",
      ],
      ctx: "Casual party, talking to new people.",
    },
    {
      q: "What does 'C'est pas grave' mean?",
      a: "No big deal",
      o: ["It's serious", "That's not true", "No big deal", "A grave"],
    },
    {
      q: "Fill: Elles ___ fatiguées.",
      a: "sont",
      o: ["sont", "sommes", "est", "êtes"],
      ctx: "Your sisters after a long trip.",
    },
    {
      q: "'Absent' comes from 'ab + esse'. What does it literally mean?",
      a: "Not being there",
      o: [
        "Being away",
        "Not being there",
        "Going far",
        "Being absent-minded",
      ],
    },
    {
      q: "You spill coffee on someone's shirt. They say 'Oh !' You reassure them:",
      a: "C'est pas grave",
      o: ["C'est pas grave", "C'est vrai", "C'est bon", "Voilà"],
      ctx: "The expression meaning 'no big deal'.",
    },
    {
      q: "A waiter asks if you want more water. You're fine. You say: 'Non merci, _______.'",
      a: "c'est bon",
      o: ["c'est bon", "c'est vrai", "c'est pas grave", "très bien"],
      ctx: "The expression meaning 'I'm good / that's fine'.",
    },
  ],
  combine: [
    {
      hint: "I + être + nationality → Introduce yourself",
      answer: "Je suis américain",
      accept: [
        "je suis americain",
        "je suis américain",
        "je suis anglais",
        "je suis français",
      ],
    },
    {
      hint: "She + être + profession + city → Introduce someone",
      answer: "Elle est médecin à Paris",
      accept: [
        "elle est médecin à paris",
        "elle est medecin a paris",
        "elle est docteur à paris",
      ],
    },
    {
      hint: "We + être + tired + today → Describe how you feel",
      answer: "Nous sommes fatigués aujourd'hui",
      accept: [
        "nous sommes fatigués aujourd'hui",
        "nous sommes fatigues aujourd'hui",
      ],
    },
  ],
  weave: [
    {
      en: "I am tired but she is happy and we are ready.",
      known: [
        "je",
        "suis",
        "fatigué",
        "elle",
        "est",
        "contente",
        "nous",
        "sommes",
        "prêts",
      ],
      sample:
        "Je suis fatigué but elle est contente and nous sommes prêts.",
    },
    {
      en: "She is a doctor in Paris and he is a student.",
      known: ["elle", "est", "médecin", "à", "il", "étudiant"],
      sample: "Elle est médecin à Paris and il est étudiant.",
    },
    {
      en: "Are you ready? It's no big deal.",
      known: [
        "vous",
        "êtes",
        "prêts",
        "c'est",
        "pas",
        "grave",
      ],
      sample: "Vous êtes prêts? C'est pas grave.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Elle est médecin à Paris.",
      q: "What did you hear?",
      a: "She is a doctor in Paris",
      o: [
        "She is a doctor in Paris",
        "We are tired",
        "I am a student",
        "He is ready",
      ],
    },
    {
      type: "odd",
      q: "Which does NOT belong?",
      items: ["suis", "es", "est", "fait"],
      a: "fait",
      reason: "First three are être conjugations. 'fait' is from 'faire'.",
    },
    {
      type: "context",
      situation:
        "You and your friends just climbed a mountain. You're exhausted.",
      a: "Nous sommes fatigués",
      o: [
        "Nous sommes fatigués",
        "Je suis content",
        "Vous êtes prêts",
        "Il est médecin",
      ],
    },
    {
      type: "fill_ctx",
      s: "___, je voudrais un café.",
      a: "Bonjour",
      o: ["Bonjour", "Bonsoir", "Merci", "Salut"],
      ctx: "Morning at a café. Greet first.",
    },
    {
      type: "context",
      situation: "Someone says 'Paris est belle.' You agree completely.",
      a: "C'est vrai !",
      o: ["C'est vrai !", "C'est pas grave", "C'est bon", "Voilà"],
    },
  ],
  sayIt: [
    {
      situation:
        "You meet someone at a party. Introduce yourself — say who you are and ask about them.",
      target: ["je", "suis", "tu", "es", "et", "toi"],
    },
    {
      situation:
        "Describe your group: you're tired, she's a doctor, and they're happy.",
      target: [
        "suis",
        "fatigué",
        "est",
        "médecin",
        "sont",
        "contents",
      ],
    },
  ],
  miniConv: {
    topic: "Introducing yourself and describing people using être",
    starter: "Salut ! Comment tu t'appelles ? Tu es d'où ?",
  },
  expressions: [
    {
      fr: "C'est pas grave",
      en: "No big deal / It's not serious",
      usage: "'Oh pardon !' — 'C'est pas grave.'",
      literal: "It's not serious",
    },
    {
      fr: "C'est vrai",
      en: "That's true",
      usage: "'Paris est belle.' — 'Oui, c'est vrai !'",
      literal: "It's true",
    },
    {
      fr: "C'est bon",
      en: "It's good / That's fine / I'm good",
      usage: "Waiter asks if you want more: 'Non merci, c'est bon.'",
      literal: "It's good",
    },
  ],
  grammarNuggets: [
    {
      title: "No article with professions — you ARE your job",
      insight:
        "English: 'I am A doctor.' French: 'Je suis médecin' — no article. In French thinking, being a doctor isn't something you have, it's something you ARE. The profession fuses with your identity. Same with nationality: 'Je suis français.'",
      example: "Je suis étudiant (not Je suis un étudiant)",
    },
    {
      title: "C'est is a universal pointer, not just 'it is'",
      insight:
        "'C'est' works for ideas (C'est vrai), objects (C'est un livre), situations (C'est pas grave), and people (C'est mon ami). English uses 'it is,' 'that is,' 'this is' — French collapses them all into 'c'est.'",
      example:
        "C'est vrai, c'est bon, c'est mon ami, c'est un problème",
    },
  ],
  fauxAmis: [
    {
      fr: "je suis",
      looksLike: "I sue (legal action)",
      actualMeaning: "I am / I follow",
      example: "Je suis fatigué. (I am tired.)",
    },
  ],
  soundPatterns: [
    {
      pattern: "é- → s-",
      examples: [
        { fr: "étudiant", en: "student" },
        { fr: "école", en: "school" },
        { fr: "état", en: "state" },
        { fr: "éponge", en: "sponge" },
      ],
      rule: "French é at the start of a word often corresponds to English s. The Latin 's' became 'es-' then 'é-' in French.",
    },
  ],
  cultureBite:
    "When French people say 'C'est pas grave,' they drop the 'ne' — this is standard spoken French, not slang. 95% of French speakers skip 'ne' in casual speech. Written: 'Ce n'est pas grave.' Spoken: 'C'est pas grave.'",
  summary: [
    "Être conjugation: je suis, tu es, il/elle est...",
    "C'est = universal pointer (vrai, bon, pas grave)",
    "No article with professions",
    "é- = s- pattern: école→school, état→state",
  ],
};
