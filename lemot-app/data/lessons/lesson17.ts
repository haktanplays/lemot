// TODO: Full content pending — this is a placeholder stub
import type { Lesson } from "@/lib/types";

export const lesson17: Lesson = {
  id: 17,
  title: "My Day",
  sub: "Reflexive verbs and daily routine",
  icon: "Sun",
  level: "A1",
  difficulty: "hard",
  grammar: {
    title: "Reflexive Verbs & Daily Routine",
    sections: [
      {
        type: "intro",
        text: "Reflexive verbs describe actions you do to yourself: *se lever* (to get up), *se coucher* (to go to bed). They use an extra pronoun: *je me lève*, *tu te lèves*.",
      },
    ],
    quickRecall: {
      q: "What extra word do reflexive verbs need?",
      a: "A reflexive pronoun (me, te, se, nous, vous, se)",
      o: [
        "A reflexive pronoun (me, te, se, nous, vous, se)",
        "An article (le, la, les)",
        "A preposition (à, de)",
        "Nothing extra",
      ],
    },
  },
  examples: [
    {
      fr: "Je me lève à sept heures.",
      en: "I get up at seven o'clock.",
      bridge: "Je me lève at seven hours.",
    },
  ],
  fillFG: [
    {
      s: "I [___] at 7 AM.",
      a: "me lève",
      o: ["me lève", "se lève", "te lèves", "nous levons"],
      ctx: "Talking about your morning routine (je).",
    },
  ],
  fillBlanks: [
    {
      s: "Je ___ à sept heures.",
      a: "me lève",
      o: ["me lève", "se lève", "te lèves", "nous levons"],
      ctx: "Describing when you wake up.",
    },
  ],
  buildSentences: [
    {
      c: ["Je", "me", "lève", "à", "sept", "heures"],
      en: "I get up at seven o'clock",
      trap: ["se", "huit"],
    },
  ],
  quiz: [
    {
      q: "What does 'se lever' mean?",
      a: "To get up",
      o: ["To get up", "To go to bed", "To wash", "To eat"],
    },
  ],
  combine: [
    {
      hint: "I + get up + 7 AM → Morning routine",
      answer: "Je me lève à sept heures",
      accept: ["je me lève à sept heures", "je me leve a sept heures"],
    },
  ],
  weave: [
    {
      en: "I get up at seven and I go to bed at eleven.",
      known: ["je", "me lève", "à", "sept", "heures", "me couche", "onze"],
      sample: "Je me lève at sept heures and je me couche at onze heures.",
    },
  ],
  review: [
    {
      type: "context",
      situation: "You want to say you get up early every day.",
      a: "Je me lève tôt tous les jours",
      o: [
        "Je me lève tôt tous les jours",
        "Je se lève tôt",
        "Je lève moi tôt",
        "Je me couche tôt",
      ],
    },
  ],
  sayIt: [
    {
      situation: "Describe your morning routine — when you get up and what you do first.",
      target: ["me lève", "me douche", "heures"],
    },
  ],
  miniConv: {
    topic: "Talking about your daily routine",
    starter: "Salut ! À quelle heure tu te lèves le matin ?",
  },
  expressions: [
    {
      fr: "Faire la grasse matinée",
      en: "To sleep in",
      usage: "Le dimanche, je fais la grasse matinée.",
      literal: "To do the fat morning",
    },
  ],
  grammarNuggets: [
    {
      title: "Reflexive pronouns match the subject",
      insight:
        "Je → me, tu → te, il/elle → se, nous → nous, vous → vous, ils/elles → se. The pronoun always goes BEFORE the verb: je ME lève, not je lève me.",
      example: "je me lève, tu te lèves, il se lève",
    },
  ],
  summary: [
    "Reflexive verbs use an extra pronoun: me, te, se, nous, vous, se",
    "Common daily routine verbs: se lever, se coucher, se doucher, s'habiller",
    "The pronoun always goes before the verb in present tense",
  ],
};
