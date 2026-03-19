import type { Lesson } from "@/lib/types";

export const lesson16: Lesson = {
  id: 16,
  title: "Around Town",
  sub: "Navigate the city with prepositions",
  icon: "Map",
  level: "A1",
  grammar: {
    title: "Places & Prepositions",
    sections: [
      {
        type: "intro",
        text: "You can already say where you're going (L13: aller). Now learn WHERE things are: *dans* (in), *sur* (on), *sous* (under), *devant* (in front), *\u00e0 c\u00f4t\u00e9 de* (next to). Time to navigate a French city!",
      },
      {
        type: "block",
        label: "Key Prepositions",
        items: [
          {
            fr: "dans",
            en: "in/inside",
            note: "Dans la maison = in the house. Dans le parc = in the park.",
          },
          {
            fr: "sur",
            en: "on",
            note: "Sur la table = on the table. Sur \u2248 surface.",
          },
          {
            fr: "sous",
            en: "under",
            note: "Sous la table = under the table. Sous \u2248 sous-chef (under the chef).",
          },
          {
            fr: "devant",
            en: "in front of",
            note: "Review from L13! Devant la gare = in front of the station.",
          },
          {
            fr: "derri\u00e8re",
            en: "behind",
            note: "Review from L13! Derri\u00e8re la maison = behind the house.",
          },
          {
            fr: "\u00e0 c\u00f4t\u00e9 de",
            en: "next to",
            note: "C\u00f4t\u00e9 \u2248 coast (side). \u00c0 c\u00f4t\u00e9 de la banque = next to the bank.",
          },
          {
            fr: "en face de",
            en: "across from",
            note: "Face \u2248 face. En face de la pharmacie = across from the pharmacy.",
          },
          {
            fr: "entre",
            en: "between",
            note: "Entre \u2248 enter (going between). Entre la banque et la pharmacie.",
          },
        ],
      },
      {
        type: "block",
        label: "City Places",
        items: [
          {
            fr: "la pharmacie",
            en: "the pharmacy",
            note: "Pharmacie \u2248 pharmacy. Green cross sign outside!",
          },
          {
            fr: "la boulangerie",
            en: "the bakery",
            note: "From 'boulanger' (baker). Every neighborhood has one.",
          },
          {
            fr: "le supermarch\u00e9",
            en: "the supermarket",
            note: "Supermarch\u00e9 \u2248 supermarket.",
          },
          {
            fr: "la banque",
            en: "the bank",
            note: "Banque \u2248 bank.",
          },
          {
            fr: "le parc",
            en: "the park",
            note: "Parc \u2248 park.",
          },
        ],
      },
      {
        type: "tip",
        text: "Need to give directions? Combine L13 (aller/directions) with prepositions: 'Allez tout droit, la pharmacie est \u00e0 c\u00f4t\u00e9 de la banque.' You sound like a local!",
      },
      {
        type: "culture",
        text: "French pharmacies (marked with a green cross) are on every corner. Pharmacists can advise you on minor illnesses \u2014 no appointment needed. And boulangeries must bake bread on-premises to use the name!",
      },
    ],
    quickRecall: {
      q: "How do you say 'next to the bank'?",
      a: "\u00e0 c\u00f4t\u00e9 de la banque",
      o: [
        "\u00e0 c\u00f4t\u00e9 de la banque",
        "dans la banque",
        "sur la banque",
        "devant la banque",
      ],
    },
  },
  examples: [
    {
      fr: "La pharmacie est \u00e0 c\u00f4t\u00e9 de la banque.",
      en: "The pharmacy is next to the bank.",
      bridge: "La pharmacie est next to la banque.",
    },
    {
      fr: "Le parc est en face du supermarch\u00e9.",
      en: "The park is across from the supermarket.",
      bridge: "Le parc est across from le supermarch\u00e9.",
    },
    {
      fr: "Il y a une boulangerie dans la rue.",
      en: "There's a bakery on the street.",
      bridge: "Il y a une boulangerie in la rue.",
    },
    {
      fr: "Le chat est sous la table.",
      en: "The cat is under the table.",
      bridge: "Le chat est under la table.",
    },
    {
      fr: "La gare est entre le parc et la banque.",
      en: "The station is between the park and the bank.",
      bridge: "La gare est between le parc et la banque.",
    },
    {
      fr: "Je suis dans le supermarch\u00e9.",
      en: "I'm in the supermarket.",
      bridge: "Je suis in le supermarch\u00e9.",
    },
    {
      fr: "La boulangerie est devant le parc.",
      en: "The bakery is in front of the park.",
      bridge: "La boulangerie est in front le parc.",
    },
  ],
  fillFG: [
    {
      s: "The pharmacy is [___] the bank.",
      a: "\u00e0 c\u00f4t\u00e9 de",
      o: ["\u00e0 c\u00f4t\u00e9 de", "dans", "sur", "sous"],
      ctx: "Next to = \u00e0 c\u00f4t\u00e9 de.",
    },
    {
      s: "The cat is [___] the table.",
      a: "sous",
      o: ["sous", "sur", "dans", "devant"],
      ctx: "Under = sous.",
    },
    {
      s: "The park is [___] the supermarket.",
      a: "en face du",
      o: ["en face du", "\u00e0 c\u00f4t\u00e9 du", "dans le", "sous le"],
      ctx: "Across from = en face de.",
    },
    {
      s: "The station is [___] the park and the bank.",
      a: "entre",
      o: ["entre", "dans", "sur", "devant"],
      ctx: "Between = entre.",
    },
    {
      s: "I'm [___] the supermarket.",
      a: "dans",
      o: ["dans", "sur", "sous", "entre"],
      ctx: "In/inside = dans.",
    },
  ],
  fillBlanks: [
    {
      s: "La pharmacie est ___ la banque.",
      a: "\u00e0 c\u00f4t\u00e9 de",
      o: [
        "\u00e0 c\u00f4t\u00e9 de",
        "dans",
        "sur",
        "en face de",
      ],
      ctx: "Next to the bank.",
    },
    {
      s: "Le chat est ___ la table.",
      a: "sous",
      o: ["sous", "sur", "dans", "devant"],
      ctx: "Under the table.",
    },
    {
      s: "Le parc est ___ du supermarch\u00e9.",
      a: "en face",
      o: ["en face", "\u00e0 c\u00f4t\u00e9", "devant", "derri\u00e8re"],
      ctx: "Across from the supermarket.",
    },
    {
      s: "La gare est ___ le parc et la banque.",
      a: "entre",
      o: ["entre", "dans", "devant", "sous"],
      ctx: "Between the park and the bank.",
    },
    {
      s: "Il y a une boulangerie ___ la rue.",
      a: "dans",
      o: ["dans", "sur", "sous", "entre"],
      ctx: "In/on the street.",
    },
  ],
  buildSentences: [
    {
      c: [
        "La",
        "pharmacie",
        "est",
        "\u00e0",
        "c\u00f4t\u00e9",
        "de",
        "la",
        "banque",
      ],
      en: "The pharmacy is next to the bank.",
      trap: ["dans", "sous"],
    },
    {
      c: ["Le", "chat", "est", "sous", "la", "table"],
      en: "The cat is under the table.",
      trap: ["sur", "dans"],
    },
    {
      c: ["Je", "suis", "dans", "le", "parc"],
      en: "I'm in the park.",
      trap: ["sur", "sous"],
    },
    {
      c: [
        "La",
        "gare",
        "est",
        "entre",
        "le",
        "parc",
        "et",
        "la",
        "banque",
      ],
      en: "The station is between the park and the bank.",
      trap: ["dans", "sous"],
    },
  ],
  quiz: [
    {
      q: "'Sous' means...",
      a: "Under",
      o: ["Under", "On", "In", "Next to"],
      ctx: "Sous \u2248 sous-chef (under the chef).",
    },
    {
      q: "'En face de' means...",
      a: "Across from",
      o: ["Across from", "Next to", "Behind", "In front of"],
    },
    {
      q: "Where would you buy bread in France?",
      a: "La boulangerie",
      o: [
        "La boulangerie",
        "La pharmacie",
        "La banque",
        "Le supermarch\u00e9",
      ],
    },
    {
      q: "'\u00c0 c\u00f4t\u00e9 de la banque' means...",
      a: "Next to the bank",
      o: [
        "Next to the bank",
        "In the bank",
        "Across from the bank",
        "Behind the bank",
      ],
    },
    {
      q: "What does a green cross indicate in France?",
      a: "A pharmacy",
      o: ["A pharmacy", "A hospital", "A bank", "A bakery"],
    },
    {
      q: "'Entre' means...",
      a: "Between",
      o: ["Between", "In", "On", "Under"],
      ctx: "Entre \u2248 enter (going between).",
    },
  ],
  combine: [
    {
      hint: "Pharmacy + next to + bank \u2192 Describe location of the pharmacy",
      answer:
        "La pharmacie est \u00e0 c\u00f4t\u00e9 de la banque.",
      accept: [
        "la pharmacie est a cote de la banque",
        "la pharmacie est \u00e0 c\u00f4t\u00e9 de la banque",
      ],
    },
    {
      hint: "Go straight + bakery + across from park \u2192 Give directions to the bakery",
      answer:
        "Allez tout droit, la boulangerie est en face du parc.",
      accept: [
        "allez tout droit la boulangerie est en face du parc",
        "allez tout droit, la boulangerie est en face du parc",
      ],
    },
    {
      hint: "Station + between + park + bank \u2192 Describe the station's location",
      answer: "La gare est entre le parc et la banque.",
      accept: ["la gare est entre le parc et la banque"],
    },
  ],
  franglais: [
    {
      en: "The pharmacy is next to the bank and the bakery is across from the park.",
      known: [
        "la",
        "pharmacie",
        "est",
        "\u00e0",
        "c\u00f4t\u00e9",
        "de",
        "banque",
        "boulangerie",
        "en",
        "face",
        "du",
        "parc",
      ],
      sample:
        "La pharmacie est \u00e0 c\u00f4t\u00e9 de la banque and la boulangerie est en face du parc.",
    },
    {
      en: "The cat is under the table. I'm in the supermarket. The station is between the park and the bank.",
      known: [
        "le",
        "chat",
        "est",
        "sous",
        "la",
        "table",
        "je",
        "suis",
        "dans",
        "supermarch\u00e9",
        "gare",
        "entre",
        "parc",
        "et",
        "banque",
      ],
      sample:
        "Le chat est sous la table. Je suis dans le supermarch\u00e9. La gare est entre le parc et la banque.",
    },
    {
      en: "Go straight. The bakery is in front of the park, next to the pharmacy.",
      known: [
        "allez",
        "tout",
        "droit",
        "la",
        "boulangerie",
        "est",
        "devant",
        "le",
        "parc",
        "\u00e0",
        "c\u00f4t\u00e9",
        "de",
        "pharmacie",
      ],
      sample:
        "Allez tout droit. La boulangerie est devant le parc, \u00e0 c\u00f4t\u00e9 de la pharmacie.",
    },
  ],
  review: [
    {
      type: "listen",
      audio:
        "La pharmacie est en face du supermarch\u00e9, \u00e0 c\u00f4t\u00e9 de la banque.",
      q: "Where is the pharmacy?",
      a: "Across from the supermarket, next to the bank",
      o: [
        "Across from the supermarket, next to the bank",
        "In the supermarket",
        "Behind the bank",
        "Between the park and bank",
      ],
    },
    {
      type: "odd",
      q: "Which is NOT a place?",
      items: [
        "pharmacie",
        "boulangerie",
        "entre",
        "supermarch\u00e9",
      ],
      a: "entre",
      reason:
        "Entre means 'between' \u2014 it's a preposition, not a place.",
    },
    {
      type: "context",
      situation:
        "Someone asks where the bank is. It's next to the park.",
      a: "La banque est \u00e0 c\u00f4t\u00e9 du parc",
      o: [
        "La banque est \u00e0 c\u00f4t\u00e9 du parc",
        "La banque est dans le parc",
        "La banque est sous le parc",
        "La banque est le parc",
      ],
    },
    {
      type: "fill_ctx",
      s: "Je me ___ \u00e0 sept heures. (Lesson 15)",
      a: "l\u00e8ve",
      o: ["l\u00e8ve", "couche", "lave", "mange"],
      ctx: "I get up at seven. Cross-reference L15.",
    },
    {
      type: "fill_ctx",
      s: "Le chat est ___ la table.",
      a: "sous",
      o: ["sous", "sur", "dans", "entre"],
      ctx: "Under the table.",
    },
    {
      type: "franglais",
      en: "The bakery is next to the bank.",
      blanks: [
        { word: "bakery", answer: "boulangerie" },
        { word: "next to", answer: "\u00e0 c\u00f4t\u00e9 de" },
      ],
      full: "La boulangerie est \u00e0 c\u00f4t\u00e9 de la banque.",
    },
    {
      type: "context",
      situation: "You need medicine. Where do you go?",
      a: "\u00c0 la pharmacie",
      o: [
        "\u00c0 la pharmacie",
        "\u00c0 la boulangerie",
        "Au supermarch\u00e9",
        "\u00c0 la banque",
      ],
    },
  ],
  sayIt: [
    {
      situation:
        "You're giving directions to a tourist. Tell them where the pharmacy, bakery, and park are relative to each other.",
      target: [
        "pharmacie",
        "boulangerie",
        "parc",
        "\u00e0 c\u00f4t\u00e9",
        "en face",
        "devant",
      ],
    },
    {
      situation:
        "Describe your neighborhood: what places are there and where they are.",
      target: [
        "il y a",
        "dans",
        "rue",
        "banque",
        "supermarch\u00e9",
        "entre",
      ],
    },
  ],
  miniConv: {
    topic: "Describing locations and navigating a city",
    starter:
      "Excusez-moi, je cherche la pharmacie. Vous savez o\u00f9 elle est ?",
  },
};
