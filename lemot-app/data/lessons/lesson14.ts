import type { Lesson } from "@/lib/types";

export const lesson14: Lesson = {
  id: 14,
  title: "More Negation + Y/En",
  sub: "Never, nothing, no more",
  icon: "Ban",
  level: "A1",
  difficulty: "hard",
  grammar: {
    title: "Complex Negation & Pronouns Y/En",
    sections: [
      {
        type: "intro",
        text: "You already know *ne...pas* (not). But French has a whole family of negation patterns: *ne...jamais* (never), *ne...plus* (no more), *ne...rien* (nothing), *ne...personne* (nobody). Plus: two essential pronouns — *y* and *en* — that make your French sound natural.",
      },
      {
        type: "block",
        label: "Negation Patterns",
        items: [
          {
            fr: "ne...jamais",
            en: "never",
            note: "Je ne mange jamais de viande. = I never eat meat. Same sandwich as ne...pas.",
          },
          {
            fr: "ne...plus",
            en: "no more / no longer",
            note: "Je ne travaille plus ici. = I no longer work here. Plus ≈ 'plus' (addition) but in negation = 'no more.'",
          },
          {
            fr: "ne...rien",
            en: "nothing",
            note: "Je ne vois rien. = I see nothing. Rien can also start a sentence: Rien ne marche. = Nothing works.",
          },
          {
            fr: "ne...personne",
            en: "nobody / no one",
            note: "Je ne connais personne. = I know nobody. Personne ≈ person, but in negation = nobody!",
          },
        ],
      },
      {
        type: "tip",
        text: "All negation patterns follow the same sandwich structure as ne...pas: the verb goes in the middle. *Je NE mange JAMAIS* / *Je NE vois RIEN* / *Je NE connais PERSONNE*. Once you know the sandwich, you know them all.",
      },
      {
        type: "block",
        label: "The Pronoun Y",
        items: [
          {
            fr: "J'y vais.",
            en: "I'm going (there).",
            note: "Y replaces a place: 'Tu vas à Paris ?' — 'Oui, j'y vais.' Y = there.",
          },
          {
            fr: "Il y a",
            en: "There is/are",
            note: "You already know this! 'Il y a' literally = 'It there has.' The 'y' = there.",
          },
          {
            fr: "On y va !",
            en: "Let's go!",
            note: "You learned this expression! Now you know what the 'y' means — there!",
          },
        ],
      },
      {
        type: "block",
        label: "The Pronoun En",
        items: [
          {
            fr: "J'en veux.",
            en: "I want some (of it).",
            note: "En replaces 'de + noun.' 'Tu veux du café ?' — 'Oui, j'en veux.' En = some/of it.",
          },
          {
            fr: "J'en ai trois.",
            en: "I have three (of them).",
            note: "En replaces the counted noun: 'Tu as des enfants ?' — 'Oui, j'en ai deux.'",
          },
          {
            fr: "J'en ai besoin.",
            en: "I need some (of it).",
            note: "'Avoir besoin de' → en replaces 'de + noun.' 'Tu as besoin d'aide ?' — 'Oui, j'en ai besoin.'",
          },
        ],
      },
      {
        type: "tip",
        text: "Y replaces *à + place*. En replaces *de + thing*. Think: Y = destination, En = origin/quantity. 'J'y vais' (I go THERE) vs 'J'en viens' (I come FROM THERE).",
      },
      {
        type: "etymology",
        pairs: [
          {
            fr: "jamais",
            en: "jamais (never)",
            root: "Latin 'jam magis' (ever more) → French jamais. Ironically, it once meant 'ever' — negation reversed its meaning!",
          },
          {
            fr: "personne",
            en: "person",
            root: "Latin 'persona' → French personne. Means 'person' normally, but 'nobody' in negation. Context is everything!",
          },
        ],
      },
      {
        type: "culture",
        text: "In spoken French, the 'ne' is often dropped: 'Je mange jamais de viande' instead of 'Je ne mange jamais.' This is standard in casual speech — not an error. But always include 'ne' in writing.",
      },
    ],
    quickRecall: {
      q: "How do you say 'I never eat meat'?",
      a: "Je ne mange jamais de viande",
      o: [
        "Je ne mange jamais de viande",
        "Je ne mange pas de viande",
        "Je mange jamais de viande",
        "Je ne mange rien de viande",
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
      fr: "Il ne travaille plus ici.",
      en: "He no longer works here.",
      bridge: "Il ne travaille no longer ici.",
    },
    {
      fr: "Je ne vois rien.",
      en: "I see nothing.",
      bridge: "Je ne vois nothing.",
    },
    {
      fr: "Elle ne connaît personne.",
      en: "She knows nobody.",
      bridge: "Elle ne connaît nobody.",
    },
    {
      fr: "Tu vas à Paris ? Oui, j'y vais.",
      en: "Are you going to Paris? Yes, I'm going (there).",
      bridge: "Tu vas à Paris? Oui, j'y vais.",
    },
    {
      fr: "Tu veux du café ? Oui, j'en veux.",
      en: "Do you want coffee? Yes, I want some.",
      bridge: "Tu veux du café? Oui, j'en want some.",
    },
    {
      fr: "J'en ai trois.",
      en: "I have three (of them).",
      bridge: "J'en ai three.",
    },
    {
      fr: "Rien ne marche aujourd'hui.",
      en: "Nothing works today.",
      bridge: "Nothing ne marche today.",
    },
  ],
  fillFG: [
    {
      s: "I [___] eat meat.",
      a: "ne...jamais",
      o: ["ne...jamais", "ne...pas", "ne...plus", "ne...rien"],
      ctx: "You NEVER eat meat — not just today.",
    },
    {
      s: "He [___] works here.",
      a: "ne...plus",
      o: ["ne...plus", "ne...pas", "ne...jamais", "ne...rien"],
      ctx: "He used to work here but not anymore.",
    },
    {
      s: "I see [___].",
      a: "rien",
      o: ["rien", "personne", "jamais", "plus"],
      ctx: "Nothing — you can't see anything.",
    },
    {
      s: "She knows [___] here.",
      a: "personne",
      o: ["personne", "rien", "jamais", "plus"],
      ctx: "Nobody — she doesn't know anyone.",
    },
    {
      s: "You want coffee? Yes, I want [___].",
      a: "en",
      o: ["en", "y", "le", "la"],
      ctx: "En replaces 'du café' (some of it).",
    },
  ],
  fillBlanks: [
    {
      s: "Je ne mange ___ de viande.",
      a: "jamais",
      o: ["jamais", "pas", "plus", "rien"],
      ctx: "I never eat meat.",
    },
    {
      s: "Il ne travaille ___ ici.",
      a: "plus",
      o: ["plus", "pas", "jamais", "rien"],
      ctx: "He no longer works here.",
    },
    {
      s: "Je ne vois ___.",
      a: "rien",
      o: ["rien", "personne", "jamais", "plus"],
      ctx: "I see nothing.",
    },
    {
      s: "Tu vas au parc ? Oui, j'___ vais.",
      a: "y",
      o: ["y", "en", "le", "me"],
      ctx: "Y replaces 'au parc' (to the park).",
    },
    {
      s: "Tu veux du pain ? Oui, j'___ veux.",
      a: "en",
      o: ["en", "y", "le", "me"],
      ctx: "En replaces 'du pain' (some bread).",
    },
  ],
  buildSentences: [
    {
      c: ["Je", "ne", "mange", "jamais", "de", "viande"],
      en: "I never eat meat.",
      trap: ["pas", "rien"],
    },
    {
      c: ["Elle", "ne", "connaît", "personne"],
      en: "She knows nobody.",
      trap: ["rien", "pas"],
    },
    {
      c: ["Oui", "j'", "y", "vais"],
      en: "Yes, I'm going there.",
      trap: ["en", "le"],
    },
    {
      c: ["J'", "en", "ai", "trois"],
      en: "I have three of them.",
      trap: ["y", "le"],
    },
  ],
  quiz: [
    {
      q: "'Ne...jamais' means...",
      a: "Never",
      o: ["Never", "Not", "No more", "Nothing"],
    },
    {
      q: "'Ne...plus' means...",
      a: "No more / No longer",
      o: ["No more / No longer", "Never", "Nothing", "Nobody"],
    },
    {
      q: "What does 'Y' replace?",
      a: "A place (à + location)",
      o: [
        "A place (à + location)",
        "A quantity (de + thing)",
        "A person",
        "A time",
      ],
    },
    {
      q: "What does 'En' replace?",
      a: "A quantity (de + thing)",
      o: [
        "A quantity (de + thing)",
        "A place (à + location)",
        "A person",
        "A verb",
      ],
    },
    {
      q: "'Personne' without negation means...",
      a: "A person",
      o: ["A person", "Nobody", "Nothing", "Never"],
      ctx: "Personne = person normally, nobody in negation.",
    },
    {
      q: "'Rien ne marche' — where is 'rien'?",
      a: "At the start (rien is the subject)",
      o: [
        "At the start (rien is the subject)",
        "After the verb",
        "At the end",
        "After ne",
      ],
      ctx: "When rien is the subject, it comes first.",
    },
    {
      q: "Someone offers you cake. You decline by saying you don't eat sweets anymore. Which fits?",
      a: "Je ne mange plus de gâteau.",
      o: [
        "Je ne mange plus de gâteau.",
        "Je ne mange jamais de gâteau.",
        "Je ne mange rien.",
        "Je ne mange personne.",
      ],
      ctx: "'Plus' = not anymore (you used to, but stopped).",
    },
    {
      q: "A friend asks if you're going to the party. You say yes, you're going there. How?",
      a: "Oui, j'y vais !",
      o: [
        "Oui, j'y vais !",
        "Oui, j'en vais !",
        "Oui, je vais !",
        "Oui, je le vais !",
      ],
      ctx: "Y replaces the place.",
    },
  ],
  combine: [
    {
      hint: "Never eat meat + no longer drink coffee → Describe diet restrictions",
      answer:
        "Je ne mange jamais de viande et je ne bois plus de café.",
      accept: [
        "je ne mange jamais de viande et je ne bois plus de cafe",
        "je ne mange jamais de viande et je ne bois plus de café",
      ],
    },
    {
      hint: "See nothing + know nobody → Describe being lost in a new city",
      answer: "Je ne vois rien et je ne connais personne.",
      accept: [
        "je ne vois rien et je ne connais personne",
      ],
    },
    {
      hint: "Going to Paris (y) + want coffee (en) → Answer two questions",
      answer: "Oui, j'y vais. Oui, j'en veux.",
      accept: [
        "oui j'y vais oui j'en veux",
        "oui, j'y vais. oui, j'en veux",
      ],
    },
  ],
  weave: [
    {
      en: "I never eat meat and I no longer drink coffee. Nothing is good for me!",
      known: [
        "je",
        "ne",
        "mange",
        "jamais",
        "de",
        "viande",
        "bois",
        "plus",
        "café",
        "rien",
        "est",
        "bon",
        "pour",
        "moi",
      ],
      sample:
        "Je ne mange jamais de viande and je ne bois plus de café. Rien n'est bon pour moi!",
    },
    {
      en: "Are you going to the park? Yes, I'm going there. Do you want bread? Yes, I want some.",
      known: [
        "tu",
        "vas",
        "au",
        "parc",
        "oui",
        "j'y",
        "vais",
        "veux",
        "du",
        "pain",
        "j'en",
      ],
      sample:
        "Tu vas au parc? Oui, j'y vais. Tu veux du pain? Oui, j'en veux.",
    },
    {
      en: "She knows nobody here. I see nothing. Nothing works today.",
      known: [
        "elle",
        "ne",
        "connaît",
        "personne",
        "ici",
        "je",
        "vois",
        "rien",
        "marche",
        "aujourd'hui",
      ],
      sample:
        "Elle ne connaît personne ici. Je ne vois rien. Rien ne marche aujourd'hui.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Je ne bois plus de café. Je bois du thé maintenant.",
      q: "What changed?",
      a: "Switched from coffee to tea",
      o: [
        "Switched from coffee to tea",
        "Never drinks anything",
        "Drinks both coffee and tea",
        "Stopped drinking tea",
      ],
    },
    {
      type: "odd",
      q: "Which is NOT a negation word?",
      items: ["jamais", "rien", "personne", "toujours"],
      a: "toujours",
      reason:
        "Toujours means 'always' — it's the opposite of negation.",
    },
    {
      type: "context",
      situation:
        "Someone asks if you still work at the restaurant. You don't anymore.",
      a: "Non, je ne travaille plus là.",
      o: [
        "Non, je ne travaille plus là.",
        "Non, je ne travaille jamais là.",
        "Non, je ne travaille rien.",
        "Non, je ne travaille personne.",
      ],
    },
    {
      type: "fill_ctx",
      s: "___ est-ce ? (Lesson 13 — questions)",
      a: "Qui",
      o: ["Qui", "Que", "Pourquoi", "Combien"],
      ctx: "Who is it? Cross-reference L13.",
    },
    {
      type: "fill_ctx",
      s: "Je ne vois ___.",
      a: "rien",
      o: ["rien", "personne", "jamais", "plus"],
      ctx: "I see nothing.",
    },
    {
      type: "weave",
      en: "I no longer work here.",
      blanks: [
        { word: "no longer", answer: "plus" },
        { word: "work", answer: "travaille" },
      ],
      full: "Je ne travaille plus ici.",
    },
    {
      type: "context",
      situation:
        "A friend asks if you want more bread. You have enough, no thanks.",
      a: "Non merci, je n'en veux plus.",
      o: [
        "Non merci, je n'en veux plus.",
        "Non merci, j'y vais.",
        "Non merci, je n'en veux jamais.",
        "Non merci, je ne vois rien.",
      ],
    },
  ],
  sayIt: [
    {
      situation:
        "Describe things you never do, things you no longer do, and things you see/know nothing about.",
      target: ["jamais", "plus", "rien", "personne", "ne"],
    },
    {
      situation:
        "A friend asks if you're going to the party, if you want cake, and how many friends you have there. Answer using y and en.",
      target: ["y", "en", "vais", "veux", "ai"],
    },
  ],
  miniConv: {
    topic: "Talking about what you don't do and making plans",
    starter:
      "Tu manges de la viande ? Tu vas à la fête ce soir ? Tu veux du gâteau ?",
  },
  expressions: [
    {
      fr: "Rien à voir",
      en: "Nothing to do with it / Unrelated",
      usage: "'La politique ? Rien à voir avec mon problème !'",
      literal: "Nothing to see",
    },
    {
      fr: "Plus jamais",
      en: "Never again",
      usage: "'Plus jamais ! Je ne fais plus ça.'",
      literal: "More never",
    },
    {
      fr: "Il n'y a pas de quoi",
      en: "Don't mention it / You're welcome",
      usage: "'Merci !' — 'Il n'y a pas de quoi !'",
      literal: "There is not of what",
    },
  ],
  grammarNuggets: [
    {
      title: "All French negation is a sandwich — the filling changes",
      insight:
        "ne...PAS (not), ne...JAMAIS (never), ne...PLUS (no more), ne...RIEN (nothing), ne...PERSONNE (nobody). The bread (ne + verb) stays the same. Only the filling after the verb changes. Once you master ne...pas, you already know the structure for all negation.",
      example:
        "Je ne [mange] pas / jamais / plus / rien — same sandwich, different filling",
    },
    {
      title: "Y and En are 'pronoun shortcuts' that avoid repetition",
      insight:
        "French hates repetition. Instead of 'Je vais à Paris' again, say 'J'y vais.' Instead of 'Je veux du café' again, say 'J'en veux.' Y replaces à + place, En replaces de + thing. They always go BEFORE the verb.",
      example:
        "Tu vas au cinéma ? → Oui, j'y vais. Tu veux du pain ? → Oui, j'en veux.",
    },
  ],
  fauxAmis: [
    {
      fr: "plus",
      looksLike: "plus (addition)",
      actualMeaning:
        "In negation: no more/no longer. Without negation: more",
      example:
        "Je ne veux plus (I don't want anymore) vs Je veux plus de café (I want more coffee)",
    },
  ],
  soundPatterns: [
    {
      pattern: "ne...X sandwich pattern",
      examples: [
        { fr: "ne...pas", en: "not" },
        { fr: "ne...jamais", en: "never" },
        { fr: "ne...plus", en: "no more" },
        { fr: "ne...rien", en: "nothing" },
      ],
      rule: "All negation wraps around the verb in the same ne...X sandwich. The 'X' determines the type of negation.",
    },
  ],
  cultureBite:
    "In everyday spoken French, 'ne' is almost always dropped: 'Je mange jamais de viande,' 'Je vois rien,' 'Je connais personne.' This is not lazy — it's standard casual French. But in writing or formal speech, always keep 'ne.'",
  summary: [
    "Negation family: ne...jamais, ne...plus, ne...rien, ne...personne",
    "Y replaces a place (j'y vais = I'm going there)",
    "En replaces de + thing (j'en veux = I want some)",
    "Expression: rien à voir, plus jamais, il n'y a pas de quoi",
  ],
};
