import type { Lesson } from "@/lib/types";

export const lesson22: Lesson = {
  id: 22,
  title: "Opinions & Feelings",
  sub: "Think, believe, love, prefer",
  icon: "MessageSquareHeart",
  level: "A1",
  difficulty: "medium",
  grammar: {
    title: "Expressing Opinions & Feelings",
    sections: [
      {
        type: "intro",
        text: "Now you can describe the world — time to say what you THINK about it. French has rich vocabulary for opinions and feelings. The key structure: *je pense que* + statement. This lesson turns you from a reporter into someone with a voice.",
      },
      {
        type: "block",
        label: "Opinion Verbs",
        items: [
          { fr: "penser", en: "to think", note: "Je pense que c'est vrai. Cognate of 'pensive'." },
          { fr: "croire", en: "to believe", note: "Je crois que oui. Related to 'credible' (Latin credere)." },
          { fr: "trouver", en: "to find / to think (opinion)", note: "Je trouve que c'est intéressant. Literally 'I find that...'" },
        ],
      },
      {
        type: "conjugation",
        verb: "croire (to believe)",
        rows: [
          { pr: "je", conj: "crois", en: "I believe", pron: "KRWAH" },
          { pr: "tu", conj: "crois", en: "you believe", pron: "KRWAH" },
          { pr: "il/elle", conj: "croit", en: "he/she believes", pron: "KRWAH" },
          { pr: "nous", conj: "croyons", en: "we believe", pron: "krwah-YOHN" },
          { pr: "vous", conj: "croyez", en: "you believe", pron: "krwah-YAY" },
          { pr: "ils/elles", conj: "croient", en: "they believe", pron: "KRWAH" },
        ],
      },
      {
        type: "block",
        label: "Feeling Verbs",
        items: [
          { fr: "aimer", en: "to love / to like", note: "J'aime le chocolat. J'aime voyager." },
          { fr: "adorer", en: "to love / to adore", note: "J'adore la France ! Stronger than aimer." },
          { fr: "détester", en: "to hate", note: "Je déteste le froid. Cognate of 'detest'." },
          { fr: "préférer", en: "to prefer", note: "Je préfère le thé. Cognate of 'prefer'." },
        ],
      },
      {
        type: "block",
        label: "Opinion Expressions",
        items: [
          { fr: "À mon avis", en: "In my opinion", note: "À mon avis, c'est trop cher." },
          { fr: "Selon moi", en: "According to me", note: "Selon moi, il a tort." },
          { fr: "Je trouve que", en: "I find that / I think that", note: "Je trouve que Paris est magnifique." },
          { fr: "Je suis d'accord", en: "I agree", note: "Literally: 'I am of agreement.'" },
          { fr: "Je ne suis pas d'accord", en: "I disagree", note: "The ne...pas sandwich around suis." },
        ],
      },
      {
        type: "tip",
        text: "Intensity scale: *détester* (hate) → *ne pas aimer* (not like) → *aimer bien* (like) → *aimer* (love/like) → *adorer* (love/adore). Note: *aimer* alone with a person means 'love', with things it means 'like'. Add *bien* to say 'like' for people: *je t'aime bien* = I like you.",
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "Je pense que",
            phonetic: "zhuh PAHNSS kuh",
            ipa: "/ʒə pɑ̃s kə/",
            notes: "The 'en' in pense is nasal. 'Que' is a quick, unstressed 'kuh'.",
          },
          {
            fr: "Je suis d'accord",
            phonetic: "zhuh swee da-KOR",
            ipa: "/ʒə sɥi da.kɔʁ/",
            notes: "D'accord flows as one word: 'da-KOR'. The 'd' is soft.",
          },
          {
            fr: "À mon avis",
            phonetic: "ah mohn ah-VEE",
            ipa: "/a mɔ̃.n‿a.vi/",
            notes: "Liaison: 'mon' links to 'avis' with an 'n' sound.",
          },
        ],
      },
    ],
    quickRecall: {
      q: "'Croire' is related to which English word?",
      a: "Credible",
      o: ["Credible", "Create", "Cry", "Crime"],
    },
  },
  examples: [
    {
      fr: "Je pense que c'est une bonne idée.",
      en: "I think it's a good idea.",
      bridge: "Je pense que it's a bonne idée.",
    },
    {
      fr: "À mon avis, ce restaurant est trop cher.",
      en: "In my opinion, this restaurant is too expensive.",
      bridge: "À mon avis, this restaurant is trop cher.",
    },
    {
      fr: "J'adore la cuisine italienne.",
      en: "I love Italian food.",
      bridge: "J'adore la cuisine Italian.",
    },
    {
      fr: "Je préfère le thé au café.",
      en: "I prefer tea to coffee.",
      bridge: "Je préfère tea to café.",
    },
    {
      fr: "Tu es d'accord avec moi ?",
      en: "Do you agree with me?",
      bridge: "Tu es d'accord with me?",
    },
    {
      fr: "Je crois que tu as raison.",
      en: "I believe you're right.",
      bridge: "Je crois que you're right.",
    },
    {
      fr: "Je trouve que ce film est ennuyeux.",
      en: "I think this movie is boring.",
      bridge: "Je trouve que this film is ennuyeux.",
    },
    {
      fr: "Je ne suis pas d'accord avec toi.",
      en: "I don't agree with you.",
      bridge: "Je ne suis pas d'accord with you.",
    },
  ],
  fillFG: [
    {
      s: "I [___] it's a good idea.",
      a: "pense que",
      o: ["pense que", "crois", "dis que", "sais que"],
      ctx: "Sharing your opinion politely.",
    },
    {
      s: "In my [___], this is too expensive.",
      a: "avis",
      o: ["avis", "accord", "crois", "pense"],
      ctx: "Starting with an opinion expression.",
    },
    {
      s: "I [___] Italian food.",
      a: "adore",
      o: ["adore", "déteste", "préfère", "crois"],
      ctx: "Expressing strong positive feeling.",
    },
    {
      s: "I [___] tea to coffee.",
      a: "préfère",
      o: ["préfère", "adore", "aime", "déteste"],
      ctx: "Stating a preference between two things.",
    },
    {
      s: "I don't [___] with you.",
      a: "suis d'accord",
      o: ["suis d'accord", "pense", "crois", "trouve"],
      ctx: "Politely disagreeing.",
    },
  ],
  fillBlanks: [
    {
      s: "Je ___ que c'est vrai.",
      a: "pense",
      o: ["pense", "suis", "vois", "fais"],
      ctx: "I think it's true.",
    },
    {
      s: "À mon ___, c'est trop cher.",
      a: "avis",
      o: ["avis", "accord", "dire", "voir"],
      ctx: "In my opinion, it's too expensive.",
    },
    {
      s: "J' ___ le chocolat.",
      a: "adore",
      o: ["adore", "accord", "avis", "ai"],
      ctx: "I love chocolate.",
    },
    {
      s: "Je ___ que tu as raison.",
      a: "crois",
      o: ["crois", "suis", "fais", "vois"],
      ctx: "I believe you're right.",
    },
    {
      s: "Je ne suis pas ___ .",
      a: "d'accord",
      o: ["d'accord", "avis", "croire", "penser"],
      ctx: "I disagree.",
    },
  ],
  buildSentences: [
    {
      c: ["Je", "pense", "que", "c'est", "bon"],
      en: "I think it's good",
      trap: ["suis", "fait"],
    },
    {
      c: ["À", "mon", "avis", "c'est", "trop", "cher"],
      en: "In my opinion it's too expensive",
      trap: ["ton", "pas"],
    },
    {
      c: ["Je", "préfère", "le", "thé", "au", "café"],
      en: "I prefer tea to coffee",
      trap: ["aime", "du"],
    },
    {
      c: ["Je", "ne", "suis", "pas", "d'accord"],
      en: "I don't agree",
      trap: ["ai", "pense"],
    },
  ],
  quiz: [
    {
      q: "How do you say 'I think that...' in French?",
      a: "Je pense que...",
      o: ["Je pense que...", "Je sais que...", "Je dis que...", "Je fais que..."],
    },
    {
      q: "What does 'à mon avis' mean?",
      a: "In my opinion",
      o: ["In my opinion", "I agree", "I believe", "According to you"],
    },
    {
      q: "What's the intensity order (weakest to strongest positive)?",
      a: "aimer bien → aimer → adorer",
      o: ["aimer bien → aimer → adorer", "adorer → aimer → aimer bien", "aimer → adorer → aimer bien", "détester → aimer → adorer"],
    },
    {
      q: "'Je t'aime bien' means...",
      a: "I like you (as a friend)",
      o: ["I like you (as a friend)", "I love you very much", "I know you well", "I see you well"],
      ctx: "Adding 'bien' changes the meaning with people!",
    },
    {
      q: "How do you say 'I disagree'?",
      a: "Je ne suis pas d'accord",
      o: ["Je ne suis pas d'accord", "Je ne pense pas", "Je ne crois pas", "Je déteste"],
    },
    {
      q: "'Croire' is related to which Latin root?",
      a: "Credere (to believe)",
      o: ["Credere (to believe)", "Crescere (to grow)", "Creare (to create)", "Cruciare (to cross)"],
    },
    {
      q: "Translate: 'Je trouve que ce film est ennuyeux'",
      a: "I think this movie is boring",
      o: ["I think this movie is boring", "I found this movie is boring", "I lost this boring movie", "I believe this movie is interesting"],
    },
    {
      q: "How do you ask 'Do you agree?'",
      a: "Tu es d'accord ?",
      o: ["Tu es d'accord ?", "Tu penses ?", "Tu crois ?", "Tu trouves ?"],
    },
  ],
  combine: [
    {
      hint: "I think + good idea → Share an opinion",
      answer: "Je pense que c'est une bonne idée",
      accept: [
        "je pense que c'est une bonne idée",
        "je pense que c'est une bonne idee",
        "je pense que c est une bonne idée",
      ],
    },
    {
      hint: "I prefer + tea + to coffee → State a preference",
      answer: "Je préfère le thé au café",
      accept: [
        "je préfère le thé au café",
        "je prefere le the au cafe",
      ],
    },
    {
      hint: "I + don't agree + with you → Disagree politely",
      answer: "Je ne suis pas d'accord avec toi",
      accept: [
        "je ne suis pas d'accord avec toi",
        "je ne suis pas d accord avec toi",
      ],
    },
  ],
  weave: [
    {
      en: "I think that this restaurant is good but it's too expensive.",
      known: ["je", "pense", "que", "ce", "restaurant", "est", "bon", "mais", "trop", "cher"],
      sample: "Je pense que ce restaurant est bon mais it's trop cher.",
    },
    {
      en: "In my opinion, she's right and I agree with her.",
      known: ["à", "mon", "avis", "elle", "a", "raison", "je", "suis", "d'accord", "avec"],
      sample: "À mon avis, elle a raison and je suis d'accord avec her.",
    },
    {
      en: "I love chocolate but I prefer tea to coffee.",
      known: ["j'", "adore", "le", "chocolat", "mais", "je", "préfère", "thé", "au", "café"],
      sample: "J'adore le chocolat mais je préfère le thé au café.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "À mon avis, ce restaurant est trop cher.",
      q: "What is the person expressing?",
      a: "The restaurant is too expensive in their opinion",
      o: [
        "The restaurant is too expensive in their opinion",
        "The restaurant is very good",
        "They want to go to a restaurant",
        "They agree about the restaurant",
      ],
    },
    {
      type: "odd",
      q: "Which is NOT an opinion expression?",
      items: ["je pense que", "à mon avis", "je trouve que", "je mange que"],
      a: "je mange que",
      reason: "Penser, trouver, and à mon avis express opinions. Manger means 'to eat'.",
    },
    {
      type: "context",
      situation: "A friend suggests a movie you find boring. Disagree politely.",
      a: "Je ne suis pas d'accord, je trouve que c'est ennuyeux",
      o: [
        "Je ne suis pas d'accord, je trouve que c'est ennuyeux",
        "J'adore ce film",
        "Je suis d'accord",
        "Je ne sais pas",
      ],
    },
    {
      type: "fill_ctx",
      s: "Je ___ que tu as raison.",
      a: "crois",
      o: ["crois", "suis", "mange", "habite"],
      ctx: "I believe you're right.",
    },
  ],
  sayIt: [
    {
      situation: "Share your opinion about a movie — did you like it or not? Use opinion expressions.",
      target: ["pense que", "trouve que", "avis", "aime"],
    },
    {
      situation: "A friend suggests eating pizza. You prefer pasta. Express your preference politely.",
      target: ["préfère", "d'accord", "aime", "mais"],
    },
  ],
  miniConv: {
    topic: "Discussing opinions about food, movies, or places",
    starter: "Tu aimes la cuisine japonaise ? Moi, j'adore !",
  },
  expressions: [
    {
      fr: "C'est pas mal",
      en: "It's not bad (= it's pretty good)",
      usage: "Le film ? C'est pas mal, mais j'ai vu mieux.",
      literal: "It's not bad",
    },
    {
      fr: "Ça dépend",
      en: "It depends",
      usage: "Tu préfères le thé ou le café ? — Ça dépend du moment.",
      literal: "That depends",
    },
    {
      fr: "N'importe quoi",
      en: "Nonsense / Whatever",
      usage: "Il dit que Paris est ennuyeux ? — N'importe quoi !",
      literal: "No matter what",
    },
  ],
  grammarNuggets: [
    {
      title: "Aimer is a false friend with people",
      insight: "'J'aime le chocolat' = I like chocolate. But 'je t'aime' = I LOVE you (romantic!). To say 'I like you' (friendship), add 'bien': 'je t'aime bien'. This is the opposite of what English speakers expect — 'bien' actually WEAKENS the feeling with people.",
      example: "Je t'aime = I love you ❤️ vs Je t'aime bien = I like you 🤝",
    },
    {
      title: "Opinion stacking for natural speech",
      insight: "Native speakers rarely say just 'oui' or 'non'. They stack opinion phrases: 'Oui, je suis d'accord, je pense que c'est une bonne idée.' The more phrases you chain, the more natural you sound.",
      example: "À mon avis, je trouve que c'est vrai, je suis d'accord avec toi.",
    },
  ],
  fauxAmis: [
    {
      fr: "accord",
      looksLike: "accord (musical chord)",
      actualMeaning: "Agreement. 'D'accord' = agreed/OK. 'Je suis d'accord' = I agree. Nothing to do with music.",
      example: "D'accord, on y va ! — OK, let's go!",
    },
  ],
  cultureBite: "French people love a good debate. Disagreeing is not rude — it's intellectual engagement. Saying 'je ne suis pas d'accord' at a dinner table is perfectly normal and even expected. Avoiding conflict by always agreeing is seen as boring or insincere.",
  summary: [
    "Opinion verbs: penser, croire, trouver + que",
    "Feeling verbs: aimer, adorer, détester, préférer",
    "Expressions: à mon avis, selon moi, je suis d'accord",
    "Aimer + person = love; aimer bien + person = like",
  ],
};
