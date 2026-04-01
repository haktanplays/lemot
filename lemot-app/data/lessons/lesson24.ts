// TODO: Full content pending — this is a placeholder stub
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
        text: "This lesson reviews everything you've learned across A1. You'll combine être, avoir, aller, faire, and all the verbs and structures from previous lessons into longer, natural sentences.",
      },
    ],
    quickRecall: {
      q: "Which verb means 'to go'?",
      a: "aller",
      o: ["aller", "avoir", "être", "faire"],
    },
  },
  examples: [
    {
      fr: "Je suis français, j'habite à Lyon et je travaille dans un restaurant.",
      en: "I am French, I live in Lyon and I work in a restaurant.",
      bridge: "Je suis French, j'habite in Lyon and je travaille in a restaurant.",
    },
  ],
  fillFG: [
    {
      s: "I [___] French and I [___] in Lyon.",
      a: "suis",
      o: ["suis", "ai", "vais", "fais"],
      ctx: "Introducing yourself with nationality and city.",
    },
  ],
  fillBlanks: [
    {
      s: "Je ___ français et j'___ à Lyon.",
      a: "suis",
      o: ["suis", "ai", "vais", "fais"],
      ctx: "A full self-introduction.",
    },
  ],
  buildSentences: [
    {
      c: ["Je", "suis", "français", "et", "j'", "habite", "à", "Lyon"],
      en: "I am French and I live in Lyon",
      trap: ["ai", "de"],
    },
  ],
  quiz: [
    {
      q: "How do you say 'I am going to eat'?",
      a: "Je vais manger",
      o: ["Je vais manger", "Je suis manger", "J'ai manger", "Je fais manger"],
    },
  ],
  combine: [
    {
      hint: "I + am + French + live + Lyon → Full intro",
      answer: "Je suis français et j'habite à Lyon",
      accept: [
        "je suis français et j'habite à lyon",
        "je suis francais et j'habite a lyon",
      ],
    },
  ],
  weave: [
    {
      en: "I am French, I live in Lyon, and I like music.",
      known: ["je", "suis", "français", "habite", "à", "Lyon", "aime", "la", "musique"],
      sample: "Je suis français, j'habite à Lyon, and j'aime la musique.",
    },
  ],
  review: [
    {
      type: "context",
      situation: "Introduce yourself fully: name, nationality, city, and a hobby.",
      a: "Je m'appelle Marie, je suis française, j'habite à Paris et j'aime la musique",
      o: [
        "Je m'appelle Marie, je suis française, j'habite à Paris et j'aime la musique",
        "Marie, française, Paris, musique",
        "Je suis Marie à Paris",
        "J'ai Marie et Paris",
      ],
    },
  ],
  sayIt: [
    {
      situation: "Give a full introduction: who you are, where you live, what you do, and what you like.",
      target: ["suis", "habite", "travaille", "aime"],
    },
  ],
  miniConv: {
    topic: "A full introductory conversation combining everything you've learned",
    starter: "Bonjour ! Parle-moi un peu de toi — qui es-tu ?",
  },
  expressions: [
    {
      fr: "En fin de compte",
      en: "At the end of the day / All things considered",
      usage: "En fin de compte, j'aime bien ma vie à Lyon.",
      literal: "At the end of the account",
    },
  ],
  grammarNuggets: [
    {
      title: "Chaining sentences with et, mais, parce que",
      insight:
        "To sound natural, connect short sentences: *et* (and), *mais* (but), *parce que* (because). This turns 'I live in Paris. I like it.' into 'J'habite à Paris et j'aime ça.'",
      example: "J'habite à Paris et j'aime ça, mais je travaille beaucoup parce que c'est cher.",
    },
  ],
  summary: [
    "Combine être, avoir, aller, faire, and -er verbs in longer sentences",
    "Use connectors: et (and), mais (but), parce que (because)",
    "You can now introduce yourself, describe your life, and have basic conversations",
  ],
};
