import type { Lesson } from "@/lib/types";

export const lesson7: Lesson = {
  id: 7,
  title: "Asking Questions I",
  sub: "Three ways to ask anything",
  icon: "HelpCircle",
  level: "A1",
  difficulty: "medium",
  grammar: {
    title: "Basic Questions in French",
    sections: [
      {
        type: "intro",
        text: "French has three ways to ask the same question — from casual to formal. Plus three essential question words: *où* (where), *quand* (when), *comment* (how). Master these, and you can ask about almost anything.",
      },
      {
        type: "block",
        label: "Three Ways to Ask Questions",
        items: [
          {
            fr: "Tu aimes le café ? ↗",
            en: "You like coffee? (intonation)",
            note: "Just raise your voice at the end. Most common in casual speech.",
          },
          {
            fr: "Est-ce que tu aimes le café ?",
            en: "Do you like coffee?",
            note: "'Est-ce que' = question marker. Put it before any statement. Safe choice!",
          },
          {
            fr: "Aimes-tu le café ?",
            en: "Do you like coffee? (formal)",
            note: "Inversion: verb-subject. Very formal/written. Rare in everyday speech.",
          },
        ],
      },
      {
        type: "tip",
        text: "*Est-ce que* is your Swiss Army knife. Put it before any statement to make a question: 'Tu es content' → 'Est-ce que tu es content ?' Works every time.",
      },
      {
        type: "block",
        label: "Question Words: Où, Quand, Comment",
        items: [
          {
            fr: "Où ?",
            en: "Where?",
            note: "You learned this in L1! Où est la gare ?",
          },
          {
            fr: "Quand ?",
            en: "When?",
            note: "Quand est-ce que tu arrives ? = When do you arrive?",
          },
          {
            fr: "Comment ?",
            en: "How?",
            note: "Comment ≈ comment (a remark/observation). Comment tu t'appelles ? = What's your name?",
          },
        ],
      },
      {
        type: "block",
        label: "Combining Question Words + Est-ce que",
        items: [
          {
            fr: "Où est-ce que tu vas ?",
            en: "Where are you going?",
            note: "Question word + est-ce que + statement. The universal formula.",
          },
          {
            fr: "Quand est-ce que tu arrives ?",
            en: "When do you arrive?",
            note: "Same pattern: quand + est-ce que + tu arrives.",
          },
          {
            fr: "Comment est-ce que tu t'appelles ?",
            en: "What's your name?",
            note: "Literally: 'How do you call yourself?' French asks 'how', not 'what'.",
          },
        ],
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "Est-ce que",
            phonetic: "ess-kuh",
            ipa: "/ɛs.kə/",
            notes:
              "Blends into two syllables in natural speech. Don't over-pronounce each word.",
          },
          {
            fr: "Où",
            phonetic: "oo",
            ipa: "/u/",
            notes:
              "Like 'oo' in 'food'. The accent grave (ù) distinguishes it from 'ou' (or).",
          },
          {
            fr: "Quand",
            phonetic: "kahn",
            ipa: "/kɑ̃/",
            notes:
              "Nasal 'ah' — don't say the 'n' or the 'd'. Just 'kah' through the nose.",
          },
        ],
      },
      {
        type: "culture",
        text: "In casual French, people mostly use intonation-only questions: 'Tu viens ?' (rising voice = question). 'Est-ce que' is for when you want to be clear. The inverted form ('Viens-tu ?') sounds almost literary.",
      },
    ],
    quickRecall: {
      q: "What's the easiest way to form a question in French?",
      a: "Est-ce que + statement",
      o: ["Est-ce que + statement", "Inversion", "Adding 'oui'", "Using 'non'"],
    },
  },
  examples: [
    {
      fr: "Tu parles français ?",
      en: "You speak French?",
      bridge: "Tu parles français?",
    },
    {
      fr: "Est-ce que tu parles français ?",
      en: "Do you speak French?",
      bridge: "Est-ce que tu parles français?",
    },
    {
      fr: "Où est la gare ?",
      en: "Where is the station?",
      bridge: "Où est la station?",
    },
    {
      fr: "Quand est-ce que tu arrives ?",
      en: "When do you arrive?",
      bridge: "When est-ce que tu arrives?",
    },
    {
      fr: "Comment tu t'appelles ?",
      en: "What's your name?",
      bridge: "How tu t'appelles?",
    },
    {
      fr: "Où est-ce que tu vas ?",
      en: "Where are you going?",
      bridge: "Where est-ce que tu vas?",
    },
    {
      fr: "Est-ce que tu aimes le café ?",
      en: "Do you like coffee?",
      bridge: "Est-ce que tu aimes le coffee?",
    },
  ],
  fillFG: [
    {
      s: "[___] do you arrive?",
      a: "Quand",
      o: ["Quand", "Comment", "Où", "Qui"],
      ctx: "When = quand.",
    },
    {
      s: "[___] is the station?",
      a: "Où",
      o: ["Où", "Quand", "Comment", "Qui"],
      ctx: "Where = où.",
    },
    {
      s: "[___] is your name?",
      a: "Comment",
      o: ["Comment", "Quand", "Où", "Qui"],
      ctx: "Comment tu t'appelles ? = What's your name?",
    },
    {
      s: "Do you speak French? (polite form)",
      a: "Est-ce que",
      o: ["Est-ce que", "Où", "Comment", "Quand"],
      ctx: "Est-ce que = question marker.",
    },
    {
      s: "[___] are you going?",
      a: "Où",
      o: ["Où", "Quand", "Comment", "Qui"],
      ctx: "Where = où.",
    },
  ],
  fillBlanks: [
    {
      s: "___ est la gare ?",
      a: "Où",
      o: ["Où", "Quand", "Comment", "Qui"],
      ctx: "Where is the station?",
    },
    {
      s: "___ est-ce que tu arrives ?",
      a: "Quand",
      o: ["Quand", "Comment", "Où", "Qui"],
      ctx: "When do you arrive?",
    },
    {
      s: "___ tu t'appelles ?",
      a: "Comment",
      o: ["Comment", "Quand", "Où", "Qui"],
      ctx: "What's your name?",
    },
    {
      s: "Est-ce ___ tu parles français ?",
      a: "que",
      o: ["que", "qui", "où", "quand"],
      ctx: "Est-ce que = do/does (question marker).",
    },
    {
      s: "___ est-ce que tu vas ?",
      a: "Où",
      o: ["Où", "Quand", "Comment", "Qui"],
      ctx: "Where are you going?",
    },
  ],
  buildSentences: [
    {
      c: ["Est-ce", "que", "tu", "parles", "français", "?"],
      en: "Do you speak French?",
      trap: ["Comment", "Où"],
    },
    {
      c: ["Où", "est", "la", "gare", "?"],
      en: "Where is the station?",
      trap: ["Quand", "Comment"],
    },
    {
      c: ["Comment", "tu", "t'appelles", "?"],
      en: "What's your name?",
      trap: ["Où", "Quand"],
    },
    {
      c: ["Quand", "est-ce", "que", "tu", "arrives", "?"],
      en: "When do you arrive?",
      trap: ["Comment", "Où"],
    },
  ],
  quiz: [
    {
      q: "The easiest way to ask a question is...",
      a: "Est-ce que + statement",
      o: [
        "Est-ce que + statement",
        "Inversion",
        "Qu'est-ce que",
        "Adding 'oui'",
      ],
    },
    {
      q: "'Comment tu t'appelles ?' asks...",
      a: "Your name",
      o: [
        "Your name",
        "Your age",
        "Where you're from",
        "Why you're here",
      ],
    },
    {
      q: "Which question word asks about time?",
      a: "Quand",
      o: ["Quand", "Comment", "Où", "Qui"],
    },
    {
      q: "The most casual way to ask a question is...",
      a: "Raising intonation at the end",
      o: [
        "Raising intonation at the end",
        "Est-ce que",
        "Inversion",
        "Adding s'il vous plaît",
      ],
    },
    {
      q: "'Où est-ce que tu vas ?' means...",
      a: "Where are you going?",
      o: [
        "Where are you going?",
        "When are you going?",
        "How are you going?",
        "Why are you going?",
      ],
    },
    {
      q: "The inverted form ('Parles-tu ?') is...",
      a: "Very formal / written French",
      o: [
        "Very formal / written French",
        "The most common form",
        "Slang",
        "Only for children",
      ],
    },
    {
      q: "You're searching for the right word in French and need to buy time.",
      a: "Comment dire...",
      o: ["Comment dire...", "C'est-à-dire", "Au fait", "En fait"],
      ctx: "The expression meaning 'how do I say...'",
    },
    {
      q: "You suddenly remember something and change topic: '_______, tu fais quoi ce soir ?'",
      a: "Au fait",
      o: ["Au fait", "C'est-à-dire", "Comment dire", "Quand"],
      ctx: "The expression meaning 'by the way'.",
    },
  ],
  combine: [
    {
      hint: "Name + French → Ask someone's name and if they speak French",
      answer: "Comment tu t'appelles ? Tu parles français ?",
      accept: [
        "comment tu t'appelles tu parles francais",
        "comment tu t'appelles ? tu parles français ?",
      ],
    },
    {
      hint: "Where + station → Ask where the station is",
      answer: "Où est la gare ?",
      accept: [
        "ou est la gare",
        "où est la gare",
        "où est la gare ?",
      ],
    },
    {
      hint: "When + arrive + est-ce que → Ask when someone arrives",
      answer: "Quand est-ce que tu arrives ?",
      accept: [
        "quand est-ce que tu arrives",
        "quand est-ce que tu arrives ?",
      ],
    },
  ],
  weave: [
    {
      en: "What's your name? Do you speak French? Where is the station?",
      known: [
        "comment",
        "tu",
        "t'appelles",
        "est-ce que",
        "parles",
        "français",
        "où",
        "est",
        "la",
        "gare",
      ],
      sample:
        "Comment tu t'appelles? Est-ce que tu parles français? Où est la gare?",
    },
    {
      en: "When do you arrive? Where are you going? How are you?",
      known: [
        "quand",
        "est-ce que",
        "tu",
        "arrives",
        "où",
        "vas",
        "comment",
        "ça",
        "va",
      ],
      sample:
        "Quand est-ce que tu arrives? Où tu vas? Comment ça va?",
    },
    {
      en: "Do you like coffee? Where is the restaurant? When do we eat?",
      known: [
        "est-ce que",
        "tu",
        "aimes",
        "le",
        "café",
        "où",
        "est",
        "restaurant",
        "quand",
        "on",
        "mange",
      ],
      sample:
        "Est-ce que tu aimes le café? Où est le restaurant? Quand on mange?",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Comment tu t'appelles ? Je m'appelle Marie.",
      q: "What is her name?",
      a: "Marie",
      o: ["Marie", "Marin", "Marc", "Martine"],
    },
    {
      type: "odd",
      q: "Which is NOT a question word?",
      items: ["où", "quand", "comment", "très"],
      a: "très",
      reason:
        "Très means 'very' — it's an adverb, not a question word.",
    },
    {
      type: "context",
      situation: "You want to know someone's name.",
      a: "Comment tu t'appelles ?",
      o: [
        "Comment tu t'appelles ?",
        "Où tu t'appelles ?",
        "Quand tu t'appelles ?",
        "Est-ce que tu t'appelles ?",
      ],
    },
    {
      type: "fill_ctx",
      s: "___ est-ce que tu arrives ?",
      a: "Quand",
      o: ["Quand", "Comment", "Où", "Qui"],
      ctx: "When do you arrive?",
    },
  ],
  sayIt: [
    {
      situation:
        "You meet someone new. Ask their name, where they're from, and if they speak French.",
      target: [
        "comment",
        "t'appelles",
        "où",
        "est-ce que",
        "parles",
        "français",
      ],
    },
    {
      situation:
        "You need to find the train station. Ask a stranger where it is and when the next train leaves.",
      target: ["où", "est", "gare", "quand", "est-ce que"],
    },
  ],
  miniConv: {
    topic: "Getting to know someone by asking basic questions",
    starter: "Bonjour ! Bienvenue en France. Vous êtes d'où ?",
  },
  expressions: [
    {
      fr: "Au fait",
      en: "By the way",
      usage: "'Au fait, tu fais quoi ce soir ?'",
      literal: "At the fact",
    },
    {
      fr: "Comment dire...",
      en: "How do I say... / How to put it...",
      usage: "'C'est... comment dire... compliqué.'",
      literal: "How to say",
    },
    {
      fr: "C'est-à-dire",
      en: "That is to say / I mean",
      usage: "'Je suis fatigué, c'est-à-dire, j'ai besoin de dormir.'",
      literal: "That is to say",
    },
  ],
  grammarNuggets: [
    {
      title: "3 question forms = 3 formality levels, same meaning",
      insight:
        "'Tu parles français ?' (intonation — casual). 'Est-ce que tu parles français ?' (marker — neutral). 'Parles-tu français ?' (inversion — formal). All three mean exactly the same thing. English used to have this: 'Speak you French?' died out, but French kept all three.",
      example:
        "Casual: Tu viens ? / Neutral: Est-ce que tu viens ? / Formal: Viens-tu ?",
    },
    {
      title: "Question intonation is the default in real life",
      insight:
        "In textbooks, est-ce que is presented as 'standard.' In real life, French speakers overwhelmingly use rising intonation: 'Tu viens ?' They only switch to est-ce que when the question might be ambiguous, or when they want to sound polite/clear.",
      example:
        "Street French: 'T'as faim ?' vs Polite: 'Est-ce que vous avez faim ?'",
    },
  ],
  fauxAmis: [
    {
      fr: "comment",
      looksLike: "comment (remark)",
      actualMeaning: "how",
      example:
        "Comment tu t'appelles ? (What's your name? — literally: How do you call yourself?)",
    },
  ],
  cultureBite:
    "The question 'Ça va ?' is asked dozens of times a day in France, but nobody expects a real answer. 'Ça va' back is perfectly fine. It's a social ritual, not a genuine inquiry about your wellbeing — like 'How are you?' in English.",
  summary: [
    "Three question forms: intonation, est-ce que, inversion",
    "Question words: où (where), quand (when), comment (how)",
    "Est-ce que = universal question marker",
    "Expression: au fait, comment dire, c'est-à-dire",
  ],
};
