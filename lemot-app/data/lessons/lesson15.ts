import type { Lesson } from "@/lib/types";

export const lesson15: Lesson = {
  id: 15,
  title: "Places & Prepositions",
  sub: "In, on, for, with, without",
  icon: "Map",
  level: "A1",
  difficulty: "medium",
  grammar: {
    title: "Places & Prepositions",
    sections: [
      {
        type: "intro",
        text: "You can already say where you're going (L6: aller). Now learn WHERE things are: *dans* (in), *sur* (on), *sous* (under), *devant* (in front), *à côté de* (next to). Time to navigate a French city!",
      },
      {
        type: "block",
        label: "Location Prepositions",
        items: [
          {
            fr: "dans",
            en: "in/inside",
            note: "Dans la maison = in the house. Dans le parc = in the park.",
          },
          {
            fr: "sur",
            en: "on",
            note: "Sur la table = on the table. Sur ≈ surface.",
          },
          {
            fr: "sous",
            en: "under",
            note: "Sous la table = under the table. Sous ≈ sous-chef (under the chef).",
          },
          {
            fr: "devant",
            en: "in front of",
            note: "Devant la gare = in front of the station.",
          },
          {
            fr: "derrière",
            en: "behind",
            note: "Derrière la maison = behind the house.",
          },
          {
            fr: "à côté de",
            en: "next to",
            note: "Côté ≈ coast (side). À côté de la banque = next to the bank.",
          },
          {
            fr: "en face de",
            en: "across from",
            note: "Face ≈ face. En face de la pharmacie = across from the pharmacy.",
          },
          {
            fr: "entre",
            en: "between",
            note: "Entre ≈ enter (going between). Entre la banque et la pharmacie.",
          },
        ],
      },
      {
        type: "block",
        label: "Common Prepositions",
        items: [
          {
            fr: "pour",
            en: "for",
            note: "Pour toi = for you. Pour ≈ purpose (same Latin root).",
          },
          {
            fr: "avec",
            en: "with",
            note: "Avec ma famille = with my family.",
          },
          {
            fr: "sans",
            en: "without",
            note: "Sans sucre = without sugar. Sans ≈ sans-serif (without serifs).",
          },
          {
            fr: "chez",
            en: "at someone's place",
            note: "Chez moi = at my place. Chez le docteur = at the doctor's.",
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
            note: "Pharmacie ≈ pharmacy. Green cross sign outside!",
          },
          {
            fr: "la boulangerie",
            en: "the bakery",
            note: "From 'boulanger' (baker). Every neighborhood has one.",
          },
          {
            fr: "le supermarché",
            en: "the supermarket",
            note: "Supermarché ≈ supermarket.",
          },
          {
            fr: "la banque",
            en: "the bank",
            note: "Banque ≈ bank.",
          },
          {
            fr: "la gare",
            en: "the train station",
            note: "Already know this from L1!",
          },
        ],
      },
      {
        type: "block",
        label: "Giving Directions",
        items: [
          {
            fr: "Tournez à gauche",
            en: "Turn left",
            note: "Tournez = formal/polite 'turn.' Gauche = left.",
          },
          {
            fr: "Tournez à droite",
            en: "Turn right",
            note: "Droite = right. Droite ≈ direct.",
          },
          {
            fr: "Allez tout droit",
            en: "Go straight ahead",
            note: "Review from L6! Tout droit = straight ahead.",
          },
        ],
      },
      {
        type: "tip",
        text: "Need to give directions? Combine L6 (aller/directions) with prepositions: 'Allez tout droit, la pharmacie est à côté de la banque.' You sound like a local!",
      },
      {
        type: "culture",
        text: "French pharmacies (marked with a green cross) are on every corner. Pharmacists can advise you on minor illnesses — no appointment needed. And boulangeries must bake bread on-premises to use the name!",
      },
    ],
    quickRecall: {
      q: "How do you say 'next to the bank'?",
      a: "à côté de la banque",
      o: [
        "à côté de la banque",
        "dans la banque",
        "sur la banque",
        "devant la banque",
      ],
    },
  },
  examples: [
    {
      fr: "La pharmacie est à côté de la banque.",
      en: "The pharmacy is next to the bank.",
      bridge: "La pharmacie est next to la banque.",
    },
    {
      fr: "Le parc est en face du supermarché.",
      en: "The park is across from the supermarket.",
      bridge: "Le parc est across from le supermarché.",
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
      fr: "Un café sans sucre, s'il vous plaît.",
      en: "A coffee without sugar, please.",
      bridge: "Un café without sucre, s'il vous plaît.",
    },
    {
      fr: "Tournez à gauche, puis allez tout droit.",
      en: "Turn left, then go straight ahead.",
      bridge: "Turn à gauche, puis go tout droit.",
    },
  ],
  fillFG: [
    {
      s: "The pharmacy is [___] the bank.",
      a: "à côté de",
      o: ["à côté de", "dans", "sur", "sous"],
      ctx: "Next to = à côté de.",
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
      o: ["en face du", "à côté du", "dans le", "sous le"],
      ctx: "Across from = en face de.",
    },
    {
      s: "The station is [___] the park and the bank.",
      a: "entre",
      o: ["entre", "dans", "sur", "devant"],
      ctx: "Between = entre.",
    },
    {
      s: "A coffee [___] sugar, please.",
      a: "sans",
      o: ["sans", "avec", "pour", "dans"],
      ctx: "Without = sans.",
    },
  ],
  fillBlanks: [
    {
      s: "La pharmacie est ___ la banque.",
      a: "à côté de",
      o: ["à côté de", "dans", "sur", "en face de"],
      ctx: "Next to the bank.",
    },
    {
      s: "Le chat est ___ la table.",
      a: "sous",
      o: ["sous", "sur", "dans", "devant"],
      ctx: "Under the table.",
    },
    {
      s: "Le parc est ___ du supermarché.",
      a: "en face",
      o: ["en face", "à côté", "devant", "derrière"],
      ctx: "Across from the supermarket.",
    },
    {
      s: "La gare est ___ le parc et la banque.",
      a: "entre",
      o: ["entre", "dans", "devant", "sous"],
      ctx: "Between the park and the bank.",
    },
    {
      s: "Un café ___ sucre.",
      a: "sans",
      o: ["sans", "avec", "pour", "dans"],
      ctx: "Without sugar.",
    },
  ],
  buildSentences: [
    {
      c: [
        "La",
        "pharmacie",
        "est",
        "à",
        "côté",
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
      c: ["Tournez", "à", "gauche", "puis", "tout", "droit"],
      en: "Turn left, then straight ahead.",
      trap: ["droite", "derrière"],
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
      ctx: "Sous ≈ sous-chef (under the chef).",
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
        "Le supermarché",
      ],
    },
    {
      q: "'Sans' means...",
      a: "Without",
      o: ["Without", "With", "For", "In"],
      ctx: "Sans ≈ sans-serif (without serifs).",
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
      ctx: "Entre ≈ enter (going between).",
    },
    {
      q: "Someone asks where the bakery is. You point and say: 'La boulangerie ? C'est _______!'",
      a: "par là",
      o: ["par là", "quelque part", "juste à côté", "dans"],
      ctx: "The expression meaning 'that way'.",
    },
    {
      q: "You ask if there's a pharmacy nearby. You say: 'Il y a une pharmacie _______ par ici ?'",
      a: "quelque part",
      o: ["quelque part", "par là", "juste à côté", "entre"],
      ctx: "The expression meaning 'somewhere'.",
    },
  ],
  combine: [
    {
      hint: "Pharmacy + next to + bank → Describe location of the pharmacy",
      answer: "La pharmacie est à côté de la banque.",
      accept: [
        "la pharmacie est a cote de la banque",
        "la pharmacie est à côté de la banque",
      ],
    },
    {
      hint: "Turn left + bakery + across from park → Give directions to the bakery",
      answer:
        "Tournez à gauche, la boulangerie est en face du parc.",
      accept: [
        "tournez a gauche la boulangerie est en face du parc",
        "tournez à gauche, la boulangerie est en face du parc",
      ],
    },
    {
      hint: "Station + between + park + bank → Describe the station's location",
      answer: "La gare est entre le parc et la banque.",
      accept: ["la gare est entre le parc et la banque"],
    },
  ],
  weave: [
    {
      en: "The pharmacy is next to the bank and the bakery is across from the park.",
      known: [
        "la",
        "pharmacie",
        "est",
        "à",
        "côté",
        "de",
        "banque",
        "boulangerie",
        "en",
        "face",
        "du",
        "parc",
      ],
      sample:
        "La pharmacie est à côté de la banque and la boulangerie est en face du parc.",
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
        "supermarché",
        "gare",
        "entre",
        "parc",
        "et",
        "banque",
      ],
      sample:
        "Le chat est sous la table. Je suis dans le supermarché. La gare est entre le parc et la banque.",
    },
    {
      en: "Turn left. The bakery is in front of the park, next to the pharmacy.",
      known: [
        "tournez",
        "à",
        "gauche",
        "la",
        "boulangerie",
        "est",
        "devant",
        "le",
        "parc",
        "côté",
        "de",
        "pharmacie",
      ],
      sample:
        "Tournez à gauche. La boulangerie est devant le parc, à côté de la pharmacie.",
    },
  ],
  review: [
    {
      type: "listen",
      audio:
        "La pharmacie est en face du supermarché, à côté de la banque.",
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
      items: ["pharmacie", "boulangerie", "entre", "supermarché"],
      a: "entre",
      reason:
        "Entre means 'between' — it's a preposition, not a place.",
    },
    {
      type: "context",
      situation:
        "Someone asks where the bank is. It's next to the park.",
      a: "La banque est à côté du parc",
      o: [
        "La banque est à côté du parc",
        "La banque est dans le parc",
        "La banque est sous le parc",
        "La banque est le parc",
      ],
    },
    {
      type: "fill_ctx",
      s: "Je ne mange ___ de viande. (Lesson 14)",
      a: "jamais",
      o: ["jamais", "pas", "rien", "plus"],
      ctx: "I never eat meat. Cross-reference L14.",
    },
    {
      type: "fill_ctx",
      s: "Le chat est ___ la table.",
      a: "sous",
      o: ["sous", "sur", "dans", "entre"],
      ctx: "Under the table.",
    },
    {
      type: "weave",
      en: "The bakery is next to the bank.",
      blanks: [
        { word: "bakery", answer: "boulangerie" },
        { word: "next to", answer: "à côté de" },
      ],
      full: "La boulangerie est à côté de la banque.",
    },
    {
      type: "context",
      situation: "You need medicine. Where do you go?",
      a: "À la pharmacie",
      o: [
        "À la pharmacie",
        "À la boulangerie",
        "Au supermarché",
        "À la banque",
      ],
    },
    {
      type: "context",
      situation:
        "Someone asks where the pharmacy is. It's right next door to where you're standing.",
      a: "C'est juste à côté !",
      o: [
        "C'est juste à côté !",
        "C'est par là",
        "C'est quelque part",
        "C'est dans la rue",
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
        "à côté",
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
        "supermarché",
        "entre",
      ],
    },
  ],
  miniConv: {
    topic: "Describing locations and navigating a city",
    starter:
      "Excusez-moi, je cherche la pharmacie. Vous savez où elle est ?",
  },
  expressions: [
    {
      fr: "Par ici / Par là",
      en: "This way / That way",
      usage:
        "'La pharmacie ? C'est par là !' (The pharmacy? It's that way!)",
      literal: "By here / By there",
    },
    {
      fr: "Quelque part",
      en: "Somewhere",
      usage:
        "'Il y a une boulangerie quelque part par ici ?' (Is there a bakery somewhere around here?)",
      literal: "Some part",
    },
    {
      fr: "Juste à côté",
      en: "Right next door / Just beside",
      usage:
        "'La pharmacie ? C'est juste à côté !' (Right next door!)",
      literal: "Just at side",
    },
  ],
  grammarNuggets: [
    {
      title: "'De + le = du' applies to ALL compound prepositions",
      insight:
        "'À côté DE LA banque' but 'à côté DU parc' (de + le = du). 'En face DE LA pharmacie' but 'en face DU supermarché.' The contraction rule applies everywhere. Once you internalize 'de + le = du,' every compound preposition becomes predictable.",
      example:
        "à côté du parc, en face du cinéma, près du restaurant",
    },
    {
      title: "French prepositions are more precise than English",
      insight:
        "English uses 'at' for everything: at home, at the restaurant, at school. French distinguishes: 'chez moi' (person's place), 'au restaurant' (masculine), 'à l'école' (vowel), 'dans le parc' (inside). More prepositions = more information per sentence.",
      example:
        "chez moi, au restaurant, à l'école, dans le parc — all different",
    },
  ],
  fauxAmis: [
    {
      fr: "coin",
      looksLike: "coin (money)",
      actualMeaning: "corner",
      example:
        "Le café est au coin de la rue. (The café is on the corner of the street.)",
    },
  ],
  soundPatterns: [
    {
      pattern: "-tion = same in both languages",
      examples: [
        { fr: "station", en: "station" },
        { fr: "direction", en: "direction" },
        { fr: "pharmacie", en: "pharmacy" },
        { fr: "banque", en: "bank" },
      ],
      rule: "Many city-related words are cognates. French -tion is pronounced 'see-on' but the word is the same.",
    },
  ],
  cultureBite:
    "French cities are designed around the 'pharmacie' (green cross), 'boulangerie' (bakery), and 'tabac' (tobacco shop that also sells transit tickets and stamps). These three landmarks are how locals give directions: 'C'est après la pharmacie, en face de la boulangerie.'",
  summary: [
    "Location prepositions: dans, sur, sous, devant, derrière, à côté de",
    "Common prepositions: pour, avec, sans, chez",
    "Directions: tournez à gauche/droite, allez tout droit",
    "Expression: par ici, quelque part, juste à côté",
  ],
};
