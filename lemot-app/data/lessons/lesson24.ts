import type { Lesson } from "@/lib/types";

export const lesson24: Lesson = {
  id: 24,
  title: "Putting It All Together",
  sub: "Stories, conversations, and next steps",
  icon: "Puzzle",
  level: "A1",
  difficulty: "medium",
  grammar: {
    title: "Putting It All Together",
    sections: [
      {
        type: "intro",
        text: "Congratulations — you've reached the final A1 lesson! This is a review and integration lesson. You'll combine everything you've learned: present tense, near future, recent past, passé composé, opinions, and everyday expressions. The goal: tell a simple story and hold a real conversation.",
      },
      {
        type: "block",
        label: "Your Four Tenses Toolkit",
        items: [
          { fr: "Present: Je mange", en: "I eat / I'm eating", note: "Right now or habitual" },
          { fr: "Near future: Je vais manger", en: "I'm going to eat", note: "Aller + infinitive" },
          { fr: "Recent past: Je viens de manger", en: "I just ate", note: "Venir de + infinitive" },
          { fr: "Passé composé: J'ai mangé", en: "I ate / I have eaten", note: "Avoir/être + past participle" },
        ],
      },
      {
        type: "block",
        label: "Story Structure Words",
        items: [
          { fr: "D'abord", en: "First / At first", note: "D'abord, j'ai pris le bus." },
          { fr: "Ensuite", en: "Then / Next", note: "Ensuite, je suis allé au bureau." },
          { fr: "Puis", en: "Then / After that", note: "Puis, j'ai mangé avec mes collègues." },
          { fr: "Enfin", en: "Finally", note: "Enfin, je suis rentré à la maison." },
          { fr: "Après", en: "After / Afterwards", note: "Après le travail, je suis sorti." },
          { fr: "Avant", en: "Before", note: "Avant le dîner, j'ai pris un café." },
        ],
      },
      {
        type: "block",
        label: "Conversation Fillers (Sound Natural!)",
        items: [
          { fr: "Euh...", en: "Um...", note: "The French 'um'. Everyone says it." },
          { fr: "Ben...", en: "Well...", note: "Short for 'eh bien'. Very casual. Pronounced 'bahn'." },
          { fr: "Alors", en: "So / Well then", note: "Alors, qu'est-ce qu'on fait ? (So, what do we do?)" },
          { fr: "Bref", en: "Anyway / In short", note: "Bref, c'était bien. (Anyway, it was good.)" },
          { fr: "Quoi", en: "(filler, untranslatable)", note: "C'est cool, quoi. Added at end of sentences for emphasis." },
          { fr: "Du coup", en: "So / As a result", note: "Du coup, je suis resté. (So, I stayed.)" },
        ],
      },
      {
        type: "block",
        label: "A1 CEFR Self-Assessment: Can You...",
        items: [
          { fr: "Se présenter", en: "Introduce yourself", note: "Name, age, nationality, where you live" },
          { fr: "Commander au restaurant", en: "Order at a restaurant", note: "Je voudrais..., l'addition s'il vous plaît" },
          { fr: "Demander son chemin", en: "Ask for directions", note: "Où est...? Comment aller à...?" },
          { fr: "Parler du passé", en: "Talk about the past", note: "Hier, j'ai... / Je suis allé..." },
          { fr: "Exprimer ses opinions", en: "Express opinions", note: "Je pense que..., à mon avis..." },
          { fr: "Raconter une histoire simple", en: "Tell a simple story", note: "D'abord..., ensuite..., enfin..." },
        ],
      },
      {
        type: "tip",
        text: "You're now at A1 level — you can survive in a French-speaking country! A2 is about expanding range and comfort. Keep practicing, keep making mistakes, keep speaking. The path from A1 to A2 is about QUANTITY of practice, not new rules.",
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "D'abord",
            phonetic: "dah-BOR",
            ipa: "/da.bɔʁ/",
            notes: "Two syllables. The 'd' is soft. Stress on the second syllable.",
          },
          {
            fr: "Ensuite",
            phonetic: "ahn-SWEET",
            ipa: "/ɑ̃.sɥit/",
            notes: "Nasal 'ahn', then 'sweet'. Flows nicely in stories.",
          },
          {
            fr: "Du coup",
            phonetic: "doo KOO",
            ipa: "/dy ku/",
            notes: "Very casual. The 'p' is silent. You'll hear this CONSTANTLY in spoken French.",
          },
        ],
      },
    ],
    quickRecall: {
      q: "What are the four story structure words in order?",
      a: "D'abord, ensuite, puis, enfin",
      o: ["D'abord, ensuite, puis, enfin", "Avant, après, alors, bref", "Premier, deuxième, troisième, quatrième", "Hier, aujourd'hui, demain, après-demain"],
    },
  },
  examples: [
    {
      fr: "D'abord, j'ai pris le bus. Ensuite, je suis allé au bureau.",
      en: "First, I took the bus. Then, I went to the office.",
      bridge: "D'abord, j'ai pris the bus. Ensuite, je suis allé to the bureau.",
    },
    {
      fr: "Ben, je viens de manger, du coup je n'ai pas faim.",
      en: "Well, I just ate, so I'm not hungry.",
      bridge: "Ben, je viens de manger, du coup I'm not hungry.",
    },
    {
      fr: "Hier, j'ai travaillé, puis je suis sorti avec des amis.",
      en: "Yesterday, I worked, then I went out with friends.",
      bridge: "Yesterday, j'ai travaillé, puis je suis sorti with friends.",
    },
    {
      fr: "Alors, qu'est-ce qu'on fait ce soir ?",
      en: "So, what do we do tonight?",
      bridge: "Alors, what do we faire this soir?",
    },
    {
      fr: "Je pense que c'était bien, quoi.",
      en: "I think it was good, you know.",
      bridge: "Je pense que it was bien, quoi.",
    },
    {
      fr: "Bref, je vais aller dormir. Bonne nuit !",
      en: "Anyway, I'm going to go to sleep. Good night!",
      bridge: "Bref, je vais aller dormir. Good night!",
    },
    {
      fr: "Avant le dîner, j'ai pris un café. Après, je suis rentré.",
      en: "Before dinner, I had a coffee. After, I went home.",
      bridge: "Avant dinner, j'ai pris un café. Après, je suis rentré.",
    },
  ],
  fillFG: [
    {
      s: "[___], I took the bus. Then, I went to the office.",
      a: "D'abord",
      o: ["D'abord", "Enfin", "Bref", "Quoi"],
      ctx: "Starting a story with the first event.",
    },
    {
      s: "Well, I just ate, [___] I'm not hungry.",
      a: "du coup",
      o: ["du coup", "d'abord", "enfin", "quoi"],
      ctx: "Explaining a consequence casually.",
    },
    {
      s: "I worked, [___] I went out with friends.",
      a: "puis",
      o: ["puis", "d'abord", "enfin", "avant"],
      ctx: "Continuing a story with the next event.",
    },
    {
      s: "[___], I'm going to go to sleep.",
      a: "Bref",
      o: ["Bref", "D'abord", "Alors", "Ensuite"],
      ctx: "Wrapping up a conversation.",
    },
    {
      s: "[___] dinner, I had a coffee.",
      a: "Avant",
      o: ["Avant", "Après", "D'abord", "Ensuite"],
      ctx: "Something happened before another event.",
    },
  ],
  fillBlanks: [
    {
      s: "___, j'ai pris le bus.",
      a: "D'abord",
      o: ["D'abord", "Enfin", "Bref", "Quoi"],
      ctx: "First, I took the bus.",
    },
    {
      s: "___, je suis allé au bureau.",
      a: "Ensuite",
      o: ["Ensuite", "D'abord", "Enfin", "Avant"],
      ctx: "Then, I went to the office.",
    },
    {
      s: "___, je suis rentré à la maison.",
      a: "Enfin",
      o: ["Enfin", "D'abord", "Puis", "Avant"],
      ctx: "Finally, I went home.",
    },
    {
      s: "Je viens de manger, ___ je n'ai pas faim.",
      a: "du coup",
      o: ["du coup", "d'abord", "enfin", "avant"],
      ctx: "I just ate, so I'm not hungry.",
    },
    {
      s: "___, qu'est-ce qu'on fait ?",
      a: "Alors",
      o: ["Alors", "Enfin", "D'abord", "Avant"],
      ctx: "So, what do we do?",
    },
  ],
  buildSentences: [
    {
      c: ["D'abord", "j'ai", "pris", "le", "bus"],
      en: "First, I took the bus",
      trap: ["enfin", "prends"],
    },
    {
      c: ["Ensuite", "je", "suis", "allé", "au", "bureau"],
      en: "Then, I went to the office",
      trap: ["d'abord", "vais"],
    },
    {
      c: ["Bref", "je", "vais", "aller", "dormir"],
      en: "Anyway, I'm going to go to sleep",
      trap: ["d'abord", "suis"],
    },
    {
      c: ["Du", "coup", "je", "ne", "suis", "pas", "sorti"],
      en: "So I didn't go out",
      trap: ["d'abord", "ai"],
    },
  ],
  quiz: [
    {
      q: "What is the correct story order?",
      a: "D'abord, ensuite, puis, enfin",
      o: ["D'abord, ensuite, puis, enfin", "Enfin, puis, ensuite, d'abord", "Alors, bref, quoi, euh", "Avant, après, pendant, depuis"],
    },
    {
      q: "What does 'du coup' mean?",
      a: "So / As a result",
      o: ["So / As a result", "First of all", "Finally", "By the way"],
    },
    {
      q: "How do you say 'I just arrived' using venir de?",
      a: "Je viens d'arriver",
      o: ["Je viens d'arriver", "Je suis arrivé", "J'ai arrivé", "Je vais arriver"],
    },
    {
      q: "Which filler means 'anyway / in short'?",
      a: "Bref",
      o: ["Bref", "Quoi", "Euh", "Ben"],
    },
    {
      q: "At A1, you should be able to...",
      a: "Introduce yourself, order food, ask directions",
      o: ["Introduce yourself, order food, ask directions", "Write essays", "Debate politics", "Read novels"],
    },
    {
      q: "What tense is 'je vais manger'?",
      a: "Near future (futur proche)",
      o: ["Near future (futur proche)", "Present", "Passé composé", "Recent past"],
    },
    {
      q: "'Quoi' at the end of a sentence is...",
      a: "A casual filler for emphasis",
      o: ["A casual filler for emphasis", "A question word", "An insult", "A formal expression"],
    },
    {
      q: "Translate: 'Avant le dîner, j'ai pris un café'",
      a: "Before dinner, I had a coffee",
      o: ["Before dinner, I had a coffee", "After dinner, I made a coffee", "During dinner, I took coffee", "Instead of dinner, I had coffee"],
    },
  ],
  combine: [
    {
      hint: "First + took bus + then + went to office → Tell a simple story",
      answer: "D'abord j'ai pris le bus, ensuite je suis allé au bureau",
      accept: [
        "d'abord j'ai pris le bus ensuite je suis allé au bureau",
        "d'abord j'ai pris le bus, ensuite je suis allé au bureau",
        "d'abord, j'ai pris le bus, ensuite, je suis allé au bureau",
      ],
    },
    {
      hint: "I just ate + so + not hungry → Explain with consequence",
      answer: "Je viens de manger, du coup je n'ai pas faim",
      accept: [
        "je viens de manger du coup je n'ai pas faim",
        "je viens de manger, du coup je n'ai pas faim",
        "je viens de manger du coup je n ai pas faim",
      ],
    },
    {
      hint: "Anyway + going to + sleep + good night → End a conversation",
      answer: "Bref, je vais aller dormir. Bonne nuit",
      accept: [
        "bref je vais aller dormir bonne nuit",
        "bref, je vais aller dormir. bonne nuit",
        "bref je vais dormir bonne nuit",
      ],
    },
  ],
  weave: [
    {
      en: "First, I took the bus. Then I went to the office. Finally, I ate with my colleagues.",
      known: ["d'abord", "j'ai", "pris", "le", "bus", "ensuite", "je", "suis", "allé", "au", "bureau", "enfin", "mangé", "avec", "mes", "collègues"],
      sample: "D'abord, j'ai pris le bus. Ensuite, je suis allé au bureau. Enfin, j'ai mangé avec mes collègues.",
    },
    {
      en: "Well, I just ate, so I'm going to take a coffee and go home.",
      known: ["ben", "je", "viens", "de", "manger", "du", "coup", "vais", "prendre", "un", "café", "rentrer"],
      sample: "Ben, je viens de manger, du coup je vais prendre un café and rentrer.",
    },
    {
      en: "Yesterday I worked, then I went out. Anyway, it was good.",
      known: ["hier", "j'ai", "travaillé", "puis", "je", "suis", "sorti", "bref", "c'était", "bien"],
      sample: "Hier, j'ai travaillé, puis je suis sorti. Bref, c'était bien.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "D'abord, j'ai pris le bus. Ensuite, je suis allé au bureau. Enfin, j'ai mangé avec mes collègues.",
      q: "The person is...",
      a: "Telling a story about their day",
      o: [
        "Telling a story about their day",
        "Making plans for tomorrow",
        "Asking for directions",
        "Ordering food",
      ],
    },
    {
      type: "odd",
      q: "Which is NOT a story structure word?",
      items: ["d'abord", "ensuite", "quoi", "enfin"],
      a: "quoi",
      reason: "D'abord, ensuite, and enfin sequence a story. Quoi is a casual filler.",
    },
    {
      type: "context",
      situation: "You want to wrap up a long story quickly and say it was good.",
      a: "Bref, c'était bien",
      o: [
        "Bref, c'était bien",
        "D'abord, c'était bien",
        "Ensuite, c'était bien",
        "Euh, c'était bien",
      ],
    },
    {
      type: "fill_ctx",
      s: "Je viens de manger, ___ je n'ai pas faim.",
      a: "du coup",
      o: ["du coup", "d'abord", "enfin", "avant"],
      ctx: "I just ate, so I'm not hungry.",
    },
    {
      type: "context",
      situation: "A friend asks what you're doing tonight. You don't know yet.",
      a: "Euh... je ne sais pas. On verra !",
      o: [
        "Euh... je ne sais pas. On verra !",
        "D'abord, je travaille",
        "Bref, au revoir",
        "Enfin, je suis fatigué",
      ],
    },
  ],
  sayIt: [
    {
      situation: "Tell a short story about what you did yesterday — use d'abord, ensuite, and enfin.",
      target: ["d'abord", "ensuite", "enfin", "ai", "suis"],
    },
    {
      situation: "Wrap up a conversation casually — say you're going to go and wish a good night.",
      target: ["bref", "vais", "aller", "bonne", "nuit"],
    },
  ],
  miniConv: {
    topic: "Telling a story about your day and wrapping up a conversation",
    starter: "Alors, raconte ! Tu as fait quoi aujourd'hui ?",
  },
  expressions: [
    {
      fr: "C'est la vie",
      en: "That's life",
      usage: "J'ai raté mon bus. Bref, c'est la vie !",
      literal: "It's the life",
    },
    {
      fr: "Petit à petit",
      en: "Little by little",
      usage: "Tu apprends le français ? — Oui, petit à petit !",
      literal: "Small by small",
    },
    {
      fr: "Bon courage",
      en: "Good luck / Hang in there",
      usage: "Tu as un examen demain ? Bon courage !",
      literal: "Good courage",
    },
  ],
  grammarNuggets: [
    {
      title: "Fillers make you sound French, not sloppy",
      insight: "English learners of French avoid fillers because they feel 'wrong'. But native speakers use euh, ben, alors, bref, du coup, and quoi constantly. Adding just ONE filler per sentence makes you sound 10x more natural. Start with 'alors' — it fits anywhere.",
      example: "Alors, je vais au cinéma, du coup, tu viens ? → completely natural",
    },
    {
      title: "Four tenses = complete A1 communication",
      insight: "With just present, near future (aller + inf), recent past (venir de + inf), and passé composé, you can talk about ANYTHING in time. Right now, what's coming, what just happened, and what happened before. That's 90% of daily conversation covered.",
      example: "Je mange (now) → Je vais manger (soon) → Je viens de manger (just now) → J'ai mangé (earlier)",
    },
  ],
  fauxAmis: [
    {
      fr: "bref",
      looksLike: "brief",
      actualMeaning: "Used as a filler meaning 'anyway / in short' — not just 'brief' as an adjective. 'Bref, c'était cool' = 'Anyway, it was cool.'",
      example: "Bref, on y va ? — Anyway, shall we go?",
    },
  ],
  cultureBite: "The French art of 'raconter' (storytelling) is a daily social skill. At dinner parties, work lunches, and café meet-ups, people take turns telling stories about their day, their weekend, their vacation. Good story structure (d'abord, ensuite, enfin) and well-placed fillers (ben, du coup, bref) are the secret to fitting in.",
  summary: [
    "Four tenses: present, near future, recent past, passé composé",
    "Story words: d'abord, ensuite, puis, enfin, avant, après",
    "Conversation fillers: euh, ben, alors, bref, quoi, du coup",
    "A1 complete: introduce yourself, order, ask directions, tell stories, express opinions",
  ],
};
