import type { Lesson } from "@/lib/types";

export const lesson11: Lesson = {
  id: 11,
  title: "Saying No",
  sub: "Ne...pas, ne...jamais, ne...rien — master the negative",
  icon: "Ban",
  level: "A1",
  grammar: {
    title: "Negation",
    sections: [
      {
        type: "intro",
        text: "You already know *ne...pas* (not). Now meet the rest of the family: *ne...jamais* (never), *ne...plus* (no more), *ne...rien* (nothing). Same sandwich structure, different filling.",
      },
      {
        type: "block",
        label: "The Negation Sandwich",
        items: [
          {
            fr: "ne...pas",
            en: "not",
            note: "Je NE mange PAS. The verb is sandwiched between ne and pas.",
          },
          {
            fr: "ne...jamais",
            en: "never",
            note: "Je NE mange JAMAIS de viande. = I never eat meat.",
          },
          {
            fr: "ne...plus",
            en: "no more / no longer",
            note: "Je NE mange PLUS. = I don't eat anymore. Plus ≈ plus (no more to add).",
          },
          {
            fr: "ne...rien",
            en: "nothing",
            note: "Je NE mange RIEN. = I eat nothing. Il n'y a rien = There's nothing.",
          },
        ],
      },
      {
        type: "tip",
        text: "In spoken French, the *ne* often disappears! 'Je mange pas' instead of 'Je ne mange pas'. This is normal everyday French, but always write the *ne* in formal contexts.",
      },
      {
        type: "block",
        label: "Other Useful Negatives",
        items: [
          {
            fr: "ne...personne",
            en: "nobody",
            note: "Je NE vois PERSONNE. = I see nobody. Personne ≈ person (nobody = no person).",
          },
        ],
      },
      {
        type: "block",
        label: "Useful Adverbs",
        items: [
          {
            fr: "toujours",
            en: "always",
            note: "Elle est toujours en retard. = She's always late.",
          },
          {
            fr: "encore",
            en: "still/again",
            note: "Tu es encore ici ? = You're still here? Encore ≈ encore (again!).",
          },
          {
            fr: "déjà",
            en: "already",
            note: "J'ai déjà mangé. = I've already eaten. Déjà ≈ déjà vu!",
          },
          {
            fr: "peut-être",
            en: "maybe",
            note: "Peut-être demain. = Maybe tomorrow. Peut (can) + être (be) = could be.",
          },
          {
            fr: "aussi",
            en: "also/too",
            note: "Moi aussi. = Me too.",
          },
          {
            fr: "seulement",
            en: "only",
            note: "Seulement un café. = Only a coffee. Seul (alone) + -ment.",
          },
        ],
      },
      {
        type: "culture",
        text: "French speakers love double negatives in casual speech. 'C'est pas rien!' (It's not nothing!) means 'It's really something!' — the opposite of what grammar would suggest.",
      },
    ],
    quickRecall: {
      q: "How do you say 'I never eat meat'?",
      a: "Je ne mange jamais de viande",
      o: [
        "Je ne mange jamais de viande",
        "Je ne mange pas de viande",
        "Je mange jamais viande",
        "Je ne jamais mange viande",
      ],
    },
  },
  examples: [
    {
      fr: "Je ne mange jamais de viande.",
      en: "I never eat meat.",
      bridge: "Je ne mange never de viande.",
    },
    {
      fr: "Il n'y a plus de pain.",
      en: "There's no more bread.",
      bridge: "Il n'y a no more de pain.",
    },
    {
      fr: "Elle ne mange rien.",
      en: "She eats nothing.",
      bridge: "Elle ne mange nothing.",
    },
    {
      fr: "Je n'ai pas encore mangé.",
      en: "I haven't eaten yet.",
      bridge: "Je n'ai pas yet eaten.",
    },
    {
      fr: "Tu ne vois personne ?",
      en: "You see nobody?",
      bridge: "Tu ne vois nobody?",
    },
    {
      fr: "Peut-être demain.",
      en: "Maybe tomorrow.",
      bridge: "Maybe demain.",
    },
    {
      fr: "Il est toujours en retard.",
      en: "He's always late.",
      bridge: "Il est always en retard.",
    },
  ],
  fillCross: [
    {
      s: "I [___] eat meat.",
      a: "ne mange jamais de",
      o: [
        "ne mange jamais de",
        "ne mange pas",
        "mange jamais",
        "ne mange rien",
      ],
      ctx: "Never eat — ne...jamais.",
    },
    {
      s: "There's [___] bread left.",
      a: "plus de",
      o: ["plus de", "pas de", "jamais de", "rien de"],
      ctx: "No more = ne...plus. (Il n'y a plus de pain.)",
    },
    {
      s: "She eats [___].",
      a: "rien",
      o: ["rien", "jamais", "pas", "personne"],
      ctx: "Nothing = rien.",
    },
    {
      s: "He's [___] late.",
      a: "toujours",
      o: ["toujours", "jamais", "rien", "aussi"],
      ctx: "Always = toujours.",
    },
    {
      s: "I've [___] eaten.",
      a: "déjà",
      o: ["déjà", "jamais", "plus", "encore"],
      ctx: "Already = déjà.",
    },
  ],
  fillBlanks: [
    {
      s: "Je ne mange ___ de viande.",
      a: "jamais",
      o: ["jamais", "pas", "rien", "plus"],
      ctx: "I never eat meat.",
    },
    {
      s: "Il n'y a ___ de pain.",
      a: "plus",
      o: ["plus", "pas", "jamais", "rien"],
      ctx: "No more bread.",
    },
    {
      s: "Elle ne mange ___.",
      a: "rien",
      o: ["rien", "jamais", "pas", "personne"],
      ctx: "She eats nothing.",
    },
    {
      s: "Il est ___ en retard.",
      a: "toujours",
      o: ["toujours", "jamais", "déjà", "aussi"],
      ctx: "He's always late.",
    },
    {
      s: "J'ai ___ mangé.",
      a: "déjà",
      o: ["déjà", "jamais", "encore", "aussi"],
      ctx: "I've already eaten.",
    },
  ],
  buildSentences: [
    {
      c: ["Je", "ne", "mange", "jamais", "de", "viande"],
      en: "I never eat meat.",
      trap: ["pas", "rien"],
    },
    {
      c: ["Il", "n'y", "a", "plus", "de", "pain"],
      en: "There's no more bread.",
      trap: ["pas", "jamais"],
    },
    {
      c: ["Elle", "ne", "mange", "rien"],
      en: "She eats nothing.",
      trap: ["pas", "jamais"],
    },
    {
      c: ["Peut-être", "demain"],
      en: "Maybe tomorrow.",
      trap: ["toujours", "aussi"],
    },
  ],
  quiz: [
    {
      q: "'Ne...jamais' means...",
      a: "Never",
      o: ["Never", "Nothing", "No more", "Not"],
      ctx: "Jamais = never.",
    },
    {
      q: "What's missing? 'Il n'y a ___ de pain.'",
      a: "plus",
      o: ["plus", "pas", "rien", "jamais"],
      ctx: "No more bread.",
    },
    {
      q: "'Déjà' means...",
      a: "Already",
      o: ["Already", "Always", "Never", "Still"],
    },
    {
      q: "In spoken French, which part of negation is often dropped?",
      a: "ne",
      o: ["ne", "pas", "jamais", "rien"],
      ctx: "'Je mange pas' instead of 'Je ne mange pas'.",
    },
    {
      q: "'Moi aussi' means...",
      a: "Me too",
      o: ["Me too", "Me neither", "Only me", "Maybe me"],
    },
    {
      q: "Which is WRONG word order?",
      a: "Je jamais ne mange",
      o: [
        "Je jamais ne mange",
        "Je ne mange jamais",
        "Je ne mange pas",
        "Il n'y a rien",
      ],
      negative: true,
      ctx: "Ne always comes before the verb.",
    },
  ],
  combine: [
    {
      hint: "Never + meat + already + eaten → Say you never eat meat, you've already eaten",
      answer: "Je ne mange jamais de viande. J'ai déjà mangé.",
      accept: [
        "je ne mange jamais de viande j'ai deja mange",
        "je ne mange jamais de viande. j'ai déjà mangé",
      ],
    },
    {
      hint: "No more + bread + maybe + tomorrow → No more bread, maybe tomorrow",
      answer: "Il n'y a plus de pain. Peut-être demain.",
      accept: [
        "il n'y a plus de pain peut-etre demain",
        "il n'y a plus de pain. peut-être demain",
      ],
    },
    {
      hint: "Nobody + here + always + late → Nobody's here, he's always late",
      answer: "Il n'y a personne ici. Il est toujours en retard.",
      accept: [
        "il n'y a personne ici il est toujours en retard",
        "il n'y a personne ici. il est toujours en retard",
      ],
    },
  ],
  crossing: [
    {
      en: "I never eat meat. She eats nothing. There's no more bread.",
      known: [
        "je",
        "ne",
        "mange",
        "jamais",
        "de",
        "viande",
        "elle",
        "rien",
        "il",
        "n'y",
        "a",
        "plus",
        "pain",
      ],
      sample:
        "Je ne mange jamais de viande. Elle ne mange rien. Il n'y a plus de pain.",
    },
    {
      en: "Maybe tomorrow. I've already eaten and I'm not hungry anymore.",
      known: [
        "peut-être",
        "demain",
        "j'ai",
        "déjà",
        "mangé",
        "je",
        "ne",
        "ai",
        "plus",
        "faim",
      ],
      sample:
        "Peut-être demain. J'ai déjà mangé and je n'ai plus faim.",
    },
    {
      en: "He's always late. Nobody is here. Me too, I see nothing.",
      known: [
        "il",
        "est",
        "toujours",
        "en",
        "retard",
        "personne",
        "ici",
        "moi",
        "aussi",
        "je",
        "ne",
        "vois",
        "rien",
      ],
      sample:
        "Il est toujours en retard. Personne est ici. Moi aussi, je ne vois rien.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Je ne mange jamais de fromage.",
      q: "What does the speaker never eat?",
      a: "Cheese",
      o: ["Cheese", "Meat", "Bread", "Fish"],
    },
    {
      type: "odd",
      q: "Which is NOT a negation word?",
      items: ["jamais", "rien", "personne", "toujours"],
      a: "toujours",
      reason:
        "Toujours means 'always' — it's the opposite of negation!",
    },
    {
      type: "context",
      situation: "Your friend offers bread but there's none left.",
      a: "Il n'y a plus de pain",
      o: [
        "Il n'y a plus de pain",
        "Il n'y a pas de pain",
        "Il y a du pain",
        "Je ne mange pas",
      ],
    },
    {
      type: "fill_ctx",
      s: "___ fromage, s'il vous plaît. (Lesson 9)",
      a: "Du",
      o: ["Du", "De la", "Le", "Des"],
      ctx: "Some cheese — partitive. Cross-reference L9.",
    },
    {
      type: "fill_ctx",
      s: "Je ne mange ___ de viande.",
      a: "jamais",
      o: ["jamais", "pas", "rien", "toujours"],
      ctx: "I never eat meat.",
    },
    {
      type: "crossing",
      en: "She eats nothing.",
      blanks: [
        { word: "eats", answer: "mange" },
        { word: "nothing", answer: "rien" },
      ],
      full: "Elle ne mange rien.",
    },
  ],
  sayIt: [
    {
      situation:
        "You're at a restaurant. Explain your dietary restrictions: you never eat meat, and you don't want fish anymore.",
      target: ["ne", "mange", "jamais", "viande", "plus", "poisson"],
    },
    {
      situation:
        "Your friend asks if anyone is coming. Say nobody's coming, you've already called, maybe tomorrow.",
      target: ["personne", "déjà", "peut-être", "demain"],
    },
  ],
  miniConv: {
    topic: "Expressing negation and talking about habits",
    starter:
      "Tu manges de la viande ? Moi, je suis végétarien. Et toi ?",
  },
};
