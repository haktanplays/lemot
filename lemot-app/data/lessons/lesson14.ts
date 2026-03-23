import type { Lesson } from "@/lib/types";

export const lesson14: Lesson = {
  id: 14,
  title: "Asking Questions",
  sub: "Who, what, where, when, why, how",
  icon: "HelpCircle",
  level: "A1",
  grammar: {
    title: "Questions in French",
    sections: [
      {
        type: "intro",
        text: "You already know *o\u00f9* (where). Now meet the full question family: *qui* (who), *que/quoi* (what), *quand* (when), *comment* (how), *pourquoi* (why), *combien* (how much).",
      },
      {
        type: "block",
        label: "Question Words",
        items: [
          {
            fr: "Qui ?",
            en: "Who?",
            note: "Qui est-ce ? = Who is it? Qui = who.",
          },
          {
            fr: "Que / Quoi ?",
            en: "What?",
            note: "Que before verb: Que fais-tu ? Quoi at end: Tu fais quoi ? Same meaning.",
          },
          {
            fr: "O\u00f9 ?",
            en: "Where?",
            note: "You learned this in L1! O\u00f9 est la gare ?",
          },
          {
            fr: "Quand ?",
            en: "When?",
            note: "Quand est-ce que tu arrives ? = When do you arrive?",
          },
          {
            fr: "Comment ?",
            en: "How?",
            note: "Comment \u2248 comment (a remark/observation). Comment tu t'appelles ?",
          },
          {
            fr: "Pourquoi ?",
            en: "Why?",
            note: "Pourquoi = pour (for) + quoi (what). Literally 'for what?'",
          },
          {
            fr: "Combien ?",
            en: "How much/many?",
            note: "You know this from L8! \u00c7a co\u00fbte combien ?",
          },
        ],
      },
      {
        type: "block",
        label: "Three Ways to Ask Questions",
        items: [
          {
            fr: "Tu parles fran\u00e7ais ?",
            en: "You speak French? (intonation)",
            note: "Just raise your voice at the end. Most common in casual speech.",
          },
          {
            fr: "Est-ce que tu parles fran\u00e7ais ?",
            en: "Do you speak French?",
            note: "'Est-ce que' = question marker. Works with everything. Safe choice!",
          },
          {
            fr: "Parles-tu fran\u00e7ais ?",
            en: "Do you speak French? (formal)",
            note: "Inversion: verb-subject. Very formal/written. Rare in everyday speech.",
          },
        ],
      },
      {
        type: "tip",
        text: "*Est-ce que* is your Swiss Army knife. Put it before any statement to make a question: 'Tu es content' \u2192 'Est-ce que tu es content ?' Works every time.",
      },
      {
        type: "block",
        label: "Answering Why: Parce que",
        items: [
          {
            fr: "Parce que...",
            en: "Because...",
            note: "Pourquoi tu apprends le fran\u00e7ais ? \u2014 Parce que j'aime la France !",
          },
        ],
      },
      {
        type: "etymology",
        pairs: [
          {
            fr: "comment",
            en: "comment",
            root: "Latin 'quomodo' (in what way) \u2192 French comment. English 'comment' = a remark.",
          },
          {
            fr: "parler",
            en: "parley",
            root: "Latin 'parabolare' \u2192 French parler. English: parley, parliament (place of speaking).",
          },
        ],
      },
    ],
    quickRecall: {
      q: "How do you say 'Why?'",
      a: "Pourquoi ?",
      o: ["Pourquoi ?", "Comment ?", "Combien ?", "Quand ?"],
    },
  },
  examples: [
    {
      fr: "Comment tu t'appelles ?",
      en: "What's your name?",
      bridge: "How tu t'appelles?",
    },
    {
      fr: "Pourquoi tu apprends le fran\u00e7ais ?",
      en: "Why are you learning French?",
      bridge: "Why tu apprends le fran\u00e7ais?",
    },
    {
      fr: "Quand est-ce que tu arrives ?",
      en: "When do you arrive?",
      bridge: "When est-ce que tu arrives?",
    },
    {
      fr: "Qui est-ce ?",
      en: "Who is it?",
      bridge: "Who est-ce?",
    },
    {
      fr: "Est-ce que tu parles fran\u00e7ais ?",
      en: "Do you speak French?",
      bridge: "Est-ce que tu parles fran\u00e7ais?",
    },
    {
      fr: "Parce que j'aime la France.",
      en: "Because I love France.",
      bridge: "Because j'aime la France.",
    },
    {
      fr: "Tu fais quoi ce soir ?",
      en: "What are you doing tonight?",
      bridge: "Tu fais what ce soir?",
    },
  ],
  fillCross: [
    {
      s: "[___] is your name?",
      a: "Comment",
      o: ["Comment", "Pourquoi", "Quand", "Qui"],
      ctx: "Comment tu t'appelles ? = What's your name?",
    },
    {
      s: "[___] are you learning French?",
      a: "Pourquoi",
      o: ["Pourquoi", "Comment", "Quand", "Combien"],
      ctx: "Why = pourquoi.",
    },
    {
      s: "[___] do you arrive?",
      a: "Quand",
      o: ["Quand", "Comment", "Pourquoi", "O\u00f9"],
      ctx: "When = quand.",
    },
    {
      s: "[___] is it? (a person)",
      a: "Qui",
      o: ["Qui", "Que", "Quand", "Comment"],
      ctx: "Who = qui.",
    },
    {
      s: "Do you speak French? (polite form)",
      a: "Est-ce que",
      o: ["Est-ce que", "Pourquoi", "Comment", "Quand"],
      ctx: "Est-ce que = question marker.",
    },
  ],
  fillBlanks: [
    {
      s: "___ tu t'appelles ?",
      a: "Comment",
      o: ["Comment", "Pourquoi", "Quand", "Qui"],
      ctx: "What's your name?",
    },
    {
      s: "___ tu apprends le fran\u00e7ais ?",
      a: "Pourquoi",
      o: ["Pourquoi", "Comment", "Quand", "Combien"],
      ctx: "Why are you learning French?",
    },
    {
      s: "___ est-ce que tu arrives ?",
      a: "Quand",
      o: ["Quand", "Comment", "O\u00f9", "Pourquoi"],
      ctx: "When do you arrive?",
    },
    {
      s: "___ est-ce ?",
      a: "Qui",
      o: ["Qui", "Que", "Quand", "Comment"],
      ctx: "Who is it?",
    },
    {
      s: "___ j'aime la France.",
      a: "Parce que",
      o: ["Parce que", "Pourquoi", "Comment", "Quand"],
      ctx: "Because I love France.",
    },
  ],
  buildSentences: [
    {
      c: ["Comment", "tu", "t'appelles", "?"],
      en: "What's your name?",
      trap: ["Pourquoi", "Qui"],
    },
    {
      c: ["Pourquoi", "tu", "apprends", "le", "fran\u00e7ais", "?"],
      en: "Why are you learning French?",
      trap: ["Comment", "Quand"],
    },
    {
      c: ["Est-ce", "que", "tu", "parles", "fran\u00e7ais", "?"],
      en: "Do you speak French?",
      trap: ["Pourquoi", "Comment"],
    },
    {
      c: ["Parce", "que", "j'aime", "la", "France"],
      en: "Because I love France.",
      trap: ["Comment", "Pourquoi"],
    },
  ],
  quiz: [
    {
      q: "'Pourquoi' literally means...",
      a: "For what (pour + quoi)",
      o: [
        "For what (pour + quoi)",
        "How what",
        "When what",
        "Who what",
      ],
      ctx: "Pour = for, quoi = what.",
    },
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
      q: "'Parce que' means...",
      a: "Because",
      o: ["Because", "Why", "How", "What for"],
    },
    {
      q: "Which question word asks about time?",
      a: "Quand",
      o: ["Quand", "Comment", "Pourquoi", "Qui"],
    },
    {
      q: "'Tu fais quoi ?' means...",
      a: "What are you doing?",
      o: [
        "What are you doing?",
        "Who are you?",
        "How are you?",
        "Where are you?",
      ],
    },
  ],
  combine: [
    {
      hint: "Name + French + why \u2192 Ask someone's name, if they speak French, and why they're learning",
      answer:
        "Comment tu t'appelles ? Tu parles fran\u00e7ais ? Pourquoi ?",
      accept: [
        "comment tu t'appelles tu parles francais pourquoi",
        "comment tu t'appelles ? tu parles fran\u00e7ais ? pourquoi ?",
      ],
    },
    {
      hint: "When + arrive + because \u2192 Ask when they arrive and answer because you love France",
      answer:
        "Quand est-ce que tu arrives ? Parce que j'aime la France.",
      accept: [
        "quand est-ce que tu arrives parce que j'aime la france",
        "quand est-ce que tu arrives ? parce que j'aime la france",
      ],
    },
    {
      hint: "What + tonight + go to restaurant \u2192 Ask what they're doing tonight, suggest the restaurant",
      answer: "Tu fais quoi ce soir ? On va au restaurant ?",
      accept: [
        "tu fais quoi ce soir on va au restaurant",
        "tu fais quoi ce soir ? on va au restaurant ?",
      ],
    },
  ],
  crossing: [
    {
      en: "What's your name? Why are you learning French? Because I love France.",
      known: [
        "comment",
        "tu",
        "t'appelles",
        "pourquoi",
        "apprends",
        "le",
        "fran\u00e7ais",
        "parce",
        "que",
        "j'aime",
        "la",
        "France",
      ],
      sample:
        "Comment tu t'appelles? Pourquoi tu apprends le fran\u00e7ais? Parce que j'aime la France.",
    },
    {
      en: "When do you arrive? Who is it? Do you speak French?",
      known: [
        "quand",
        "est-ce que",
        "tu",
        "arrives",
        "qui",
        "est-ce",
        "parles",
        "fran\u00e7ais",
      ],
      sample:
        "Quand est-ce que tu arrives? Qui est-ce? Est-ce que tu parles fran\u00e7ais?",
    },
    {
      en: "What are you doing tonight? I'm going to eat at the restaurant. How much does it cost?",
      known: [
        "tu",
        "fais",
        "quoi",
        "ce",
        "soir",
        "je",
        "vais",
        "manger",
        "au",
        "restaurant",
        "combien",
        "\u00e7a",
        "co\u00fbte",
      ],
      sample:
        "Tu fais quoi ce soir? Je vais manger au restaurant. \u00c7a co\u00fbte combien?",
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
      items: ["pourquoi", "comment", "parce que", "quand"],
      a: "parce que",
      reason:
        "Parce que means 'because' \u2014 it's an answer, not a question.",
    },
    {
      type: "context",
      situation: "You want to know someone's name.",
      a: "Comment tu t'appelles ?",
      o: [
        "Comment tu t'appelles ?",
        "Pourquoi tu t'appelles ?",
        "Qui tu t'appelles ?",
        "Quand tu t'appelles ?",
      ],
    },
    {
      type: "fill_ctx",
      s: "Je ___ au restaurant ce soir. (Lesson 13 \u2014 aller)",
      a: "vais",
      o: ["vais", "suis", "ai", "vas"],
      ctx: "I'm going to the restaurant \u2014 aller.",
    },
    {
      type: "fill_ctx",
      s: "___ tu apprends le fran\u00e7ais ?",
      a: "Pourquoi",
      o: ["Pourquoi", "Comment", "Quand", "Combien"],
      ctx: "Why are you learning French?",
    },
    {
      type: "crossing",
      en: "Why? Because I love France.",
      blanks: [
        { word: "Why", answer: "Pourquoi" },
        { word: "Because", answer: "Parce que" },
      ],
      full: "Pourquoi ? Parce que j'aime la France.",
    },
  ],
  sayIt: [
    {
      situation:
        "You meet someone new. Ask their name, where they're from, and if they speak French.",
      target: [
        "comment",
        "t'appelles",
        "o\u00f9",
        "est-ce que",
        "parles",
        "fran\u00e7ais",
      ],
    },
    {
      situation:
        "Ask your friend what they're doing tonight and why they can't come.",
      target: ["quoi", "ce", "soir", "pourquoi", "parce que"],
    },
  ],
  miniConv: {
    topic: "Getting to know someone by asking questions",
    starter: "Bonjour ! Comment tu t'appelles ? Tu es d'o\u00f9 ?",
  },
};
