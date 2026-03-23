import type { Lesson } from "@/lib/types";

export const lesson4: Lesson = {
  id: 4,
  title: "Tu vs Vous",
  sub: "The art of French formality",
  icon: "BookMarked",
  level: "A1",
  grammar: {
    title: "Tu vs Vous — When Familiarity Matters",
    sections: [
      {
        type: "intro",
        text: "Every time you say 'you' in French, you make a social decision. *Tu* is informal, *vous* is formal (or plural). Getting this wrong won't cause a misunderstanding — but it will cause raised eyebrows. It's the difference between shaking hands and slapping someone's back.",
      },
      {
        type: "block",
        label: "Tu — The Informal You",
        items: [
          {
            fr: "Tu",
            en: "You (one person, informal)",
            note: "Used with: friends, family, children, pets, people your age in casual settings, God (ironically). If someone says 'tu' to you, you can say 'tu' back.",
          },
          {
            fr: "Tu es français ?",
            en: "Are you French?",
            note: "Note the verb form: 'tu es' (you are). Tu always takes its own conjugation.",
          },
          {
            fr: "Toi",
            en: "You (emphatic/after preposition)",
            note: "'Et toi ?' (And you?), 'Avec toi' (With you). The emphatic form for tu.",
          },
        ],
      },
      {
        type: "block",
        label: "Vous — The Formal You",
        items: [
          {
            fr: "Vous",
            en: "You (formal singular OR any plural)",
            note: "Used with: strangers, older people, your boss, shopkeepers, customer service, anyone you want to show respect to. Also used for ANY group of people, even friends: 'Vous êtes prêts ?' (Are you all ready?)",
          },
          {
            fr: "Vous êtes américain ?",
            en: "Are you American?",
            note: "'Vous êtes' — formal. Same verb form whether talking to one person formally or multiple people.",
          },
        ],
      },
      {
        type: "block",
        label: "The Tutoiement Dance",
        items: [
          {
            fr: "On se tutoie ?",
            en: "Shall we use tu?",
            note: "When someone suggests switching from 'vous' to 'tu', it's a social milestone. It means 'I consider us close enough now.' Usually the older or higher-ranking person initiates.",
          },
          {
            fr: "The wrong choice",
            en: "What happens if you get it wrong",
            note: "Using 'tu' with a stranger in France can come across as rude or presumptuous — like calling your professor by their first name without being invited to. Using 'vous' with a close friend is weird too — it creates awkward distance.",
          },
        ],
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "Tu es",
            phonetic: "tü EH",
            ipa: "/ty ɛ/",
            notes:
              "The 'u' in 'tu' is the French u sound — not 'too'. Lips rounded, tongue forward.",
          },
          {
            fr: "Vous êtes",
            phonetic: "vooz EHT",
            ipa: "/vuz ɛt/",
            notes:
              "Liaison: the 's' of vous connects to êtes. Without liaison it would sound choppy.",
          },
        ],
      },
      {
        type: "culture",
        text: "The tu/vous distinction reflects France's deep awareness of social hierarchy and relationships. In Scandinavian countries, the formal 'you' has largely disappeared. In French, it thrives. Even French teenagers use 'vous' with their friends' parents. President Macron and his wife publicly use 'vous' with each other — though this is unusual even for France.",
      },
      {
        type: "tip",
        text: "When in doubt, use *vous*. Nobody is offended by excessive politeness. Being too formal is awkward; being too informal is rude. Always start with *vous* and wait to be invited to use *tu*.",
      },
    ],
    quickRecall: {
      q: "'On se tutoie ?' means...",
      a: "Shall we use tu with each other?",
      o: [
        "Shall we use tu with each other?",
        "Are you French?",
        "Do you speak English?",
        "Where are you from?",
      ],
    },
  },
  examples: [
    {
      fr: "Tu es français ? — Oui, et toi ?",
      en: "Are you French? — Yes, and you?",
      bridge: "Tu es French? — Oui, et toi?",
    },
    {
      fr: "Vous êtes américain, monsieur ?",
      en: "Are you American, sir?",
      bridge: "Vous êtes American, monsieur?",
    },
    {
      fr: "On se tutoie ?",
      en: "Shall we use tu?",
      bridge: "On se tutoie?",
    },
    {
      fr: "Tu viens ce soir ?",
      en: "Are you coming tonight?",
      bridge: "Tu viens tonight?",
    },
    {
      fr: "Vous pouvez répéter, s'il vous plaît ?",
      en: "Can you repeat, please?",
      bridge: "Vous pouvez répéter, s'il vous plaît?",
    },
    {
      fr: "Comment tu t'appelles ?",
      en: "What's your name? (informal)",
      bridge: "Comment tu t'appelles?",
    },
    {
      fr: "Comment vous appelez-vous, madame ?",
      en: "What is your name, madam? (formal)",
      bridge: "Comment vous appelez-vous, madame?",
    },
    {
      fr: "Tu as quel âge ? — Et toi ?",
      en: "How old are you? — And you?",
      bridge: "Tu as how old? — Et toi?",
    },
  ],
  fillCross: [
    {
      s: "[___] are French? (asking a friend)",
      a: "Tu es",
      o: ["Tu es", "Vous êtes", "Il est", "Je suis"],
      ctx: "Casual conversation with someone your age at a bar.",
    },
    {
      s: "[___] American, sir? (asking formally)",
      a: "Vous êtes",
      o: ["Vous êtes", "Tu es", "Il est", "Nous sommes"],
      ctx: "A hotel receptionist asking a guest.",
    },
    {
      s: "And [___]? (informal)",
      a: "toi",
      o: ["toi", "vous", "lui", "moi"],
      ctx: "Your friend asked you a question. Now ask back.",
    },
    {
      s: "Can [___] repeat? (to a stranger)",
      a: "vous",
      o: ["vous", "tu", "il", "on"],
      ctx: "You didn't hear what the shopkeeper said.",
    },
    {
      s: "Are [___] coming tonight? (to a friend)",
      a: "tu",
      o: ["tu", "vous", "il", "nous"],
      ctx: "Texting a close friend about evening plans.",
    },
  ],
  fillBlanks: [
    {
      s: "___ es français ?",
      a: "Tu",
      o: ["Tu", "Vous", "Il", "Je"],
      ctx: "At a party, talking to someone your age.",
    },
    {
      s: "___ êtes américain ?",
      a: "Vous",
      o: ["Vous", "Tu", "Ils", "Nous"],
      ctx: "A formal first meeting with a business contact.",
    },
    {
      s: "Et ___ ?",
      a: "toi",
      o: ["toi", "vous", "moi", "lui"],
      ctx: "Your friend just shared something. Ask them back casually.",
    },
    {
      s: "___ viens ce soir ?",
      a: "Tu",
      o: ["Tu", "Vous", "Il", "On"],
      ctx: "Texting your best friend.",
    },
    {
      s: "___ pouvez répéter ?",
      a: "Vous",
      o: ["Vous", "Tu", "Il", "Je"],
      ctx: "Speaking to a stranger at the train station.",
    },
  ],
  buildSentences: [
    {
      c: ["Tu", "es", "français"],
      en: "You are French (informal)",
      trap: ["Vous", "êtes"],
    },
    {
      c: ["Vous", "êtes", "américain"],
      en: "You are American (formal)",
      trap: ["Tu", "es"],
    },
    {
      c: ["Tu", "viens", "ce", "soir"],
      en: "You coming tonight? (informal)",
      trap: ["Vous", "êtes"],
    },
    {
      c: ["On", "se", "tutoie"],
      en: "Shall we use tu?",
      trap: ["vous", "est"],
    },
  ],
  quiz: [
    {
      q: "You meet your friend's mother for the first time. You say...",
      a: "Vous",
      o: ["Tu", "Vous", "On", "Toi"],
      ctx: "Dinner at a friend's house.",
    },
    {
      q: "Which should you NEVER say to a stranger?",
      a: "Tu es fatigué ?",
      o: [
        "Vous êtes fatigué ?",
        "Excusez-moi",
        "Tu es fatigué ?",
        "Bonjour monsieur",
      ],
      ctx: "At a formal reception.",
      negative: true,
    },
    {
      q: "'On se tutoie ?' — who typically suggests this?",
      a: "The older or higher-ranking person",
      o: [
        "The younger person",
        "The older or higher-ranking person",
        "Anyone can",
        "Only women",
      ],
    },
    {
      q: "When in doubt between tu and vous, always use...",
      a: "Vous",
      o: ["Tu", "Vous", "Either is fine", "On"],
    },
    {
      q: "Macron and his wife publicly use ___ with each other.",
      a: "Vous",
      o: ["Tu", "Vous", "On", "Both"],
    },
    {
      q: "'Vous' is ALSO used for...",
      a: "Any group of people, even friends",
      o: [
        "Only formal situations",
        "Any group of people, even friends",
        "Written French only",
        "Old people only",
      ],
    },
  ],
  combine: [
    {
      hint: "You (informal) + are + French → Ask a friend",
      answer: "Tu es français",
      accept: ["tu es français", "tu es francais"],
    },
    {
      hint: "You (formal) + are + American → Ask politely",
      answer: "Vous êtes américain",
      accept: [
        "vous êtes américain",
        "vous etes americain",
        "vous êtes americain",
      ],
    },
    {
      hint: "Shall + we + use tu → Suggest informality",
      answer: "On se tutoie",
      accept: ["on se tutoie"],
    },
  ],
  crossing: [
    {
      en: "You are French, right? And you, are you American?",
      known: [
        "tu",
        "es",
        "français",
        "et",
        "toi",
        "vous",
        "êtes",
        "américain",
      ],
      sample:
        "Tu es français, right? Et toi, vous êtes américain?",
    },
    {
      en: "Are you coming tonight? She is tired but I am ready.",
      known: [
        "tu",
        "viens",
        "ce",
        "soir",
        "elle",
        "est",
        "fatigué",
        "je",
        "suis",
        "prêts",
      ],
      sample:
        "Tu viens ce soir? Elle est fatigué but je suis ready.",
    },
    {
      en: "Excuse me, can you repeat please? I don't understand.",
      known: [
        "excusez-moi",
        "vous",
        "pouvez",
        "répéter",
        "s'il vous plaît",
        "je",
        "ne",
        "comprends",
        "pas",
      ],
      sample:
        "Excusez-moi, vous pouvez répéter s'il vous plaît? Je ne comprends pas.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Vous êtes américain, monsieur ?",
      q: "Is this formal or informal?",
      a: "Formal — uses vous",
      o: [
        "Formal — uses vous",
        "Informal — uses tu",
        "Can't tell",
        "Neither",
      ],
    },
    {
      type: "odd",
      q: "Which does NOT use 'tu'?",
      items: [
        "Tu es français",
        "Et toi ?",
        "Vous êtes prêts",
        "Tu viens ce soir",
      ],
      a: "Vous êtes prêts",
      reason: "This uses 'vous' — either formal or plural.",
    },
    {
      type: "context",
      situation: "First day at a new job. You meet your boss.",
      a: "Bonjour, vous",
      o: ["Salut, tu", "Bonjour, vous", "Hey, tu", "Coucou"],
    },
    {
      type: "fill_ctx",
      s: "Il ___ un bon restaurant ici.",
      a: "y a",
      o: ["y a", "faut", "est", "va"],
      ctx: "Tell someone there's a good restaurant. (Lesson 12)",
    },
  ],
  sayIt: [
    {
      situation:
        "You meet your friend's mother for the first time. Greet her formally and ask how she is.",
      target: ["bonjour", "vous", "madame", "êtes"],
    },
    {
      situation:
        "A colleague suggests switching to 'tu'. Accept and then ask them a casual question.",
      target: ["tu", "toi", "on se tutoie", "viens"],
    },
  ],
  miniConv: {
    topic:
      "Navigating formal and informal situations with tu and vous",
    starter:
      "Bonjour ! Vous êtes nouveau ici ? Comment vous appelez-vous ?",
  },
};
