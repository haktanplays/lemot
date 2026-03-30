import type { Lesson } from "@/lib/types";

export const lesson2: Lesson = {
  id: 2,
  title: "Pronunciation I",
  sub: "Silent letters, liaison, and sounds you already know",
  icon: "Volume2",
  level: "A1",
  difficulty: "easy",
  grammar: {
    title: "French Sounds — Part 1",
    sections: [
      {
        type: "intro",
        text: "Good news: French pronunciation is more predictable than English. Once you learn the patterns, you can pronounce any word you read — even words you've never seen before. English can't say the same (think: cough, through, though).",
      },
      {
        type: "block",
        label: "Silent Letters — The Big Rule",
        items: [
          {
            fr: "Final consonants are usually silent",
            en: "The CaReFuL rule",
            note: "Most final consonants are silent: 'petit' = puh-TEE, 'grand' = GRAHN, 'français' = frahn-SEH. Exception: C, R, F, L are often pronounced. Remember: CaReFuL. 'Sac' (bag), 'pour' (for), 'chef', 'mal' (bad).",
          },
          {
            fr: "Final -e is silent",
            en: "But it activates the consonant before it",
            note: "'Petit' = puh-TEE (t is silent). 'Petite' = puh-TEET (e is silent but makes the t heard). This is how French marks feminine forms.",
          },
          {
            fr: "The letter h is always silent",
            en: "As if it doesn't exist",
            note: "'Hôtel' = oh-TEL. 'Homme' (man) = UM. French h is purely decorative. But there are two types: 'h muet' (allows liaison) and 'h aspiré' (blocks it). More on this later.",
          },
        ],
      },
      {
        type: "block",
        label: "Sounds You Already Know",
        items: [
          {
            fr: "a",
            en: "/a/ — like 'father'",
            note: "Always the same sound. Unlike English where 'a' can be 'cat', 'father', 'cake'.",
          },
          {
            fr: "i",
            en: "/i/ — like 'see'",
            note: "Always 'ee'. Never like English 'sit'.",
          },
          {
            fr: "ou",
            en: "/u/ — like 'food'",
            note: "Always 'oo'. 'Vous' = VOO, 'pour' = POOR.",
          },
          {
            fr: "é",
            en: "/e/ — like 'day' (without the y glide)",
            note: "The accent mark tells you exactly how to pronounce it. 'Café' = ka-FEH.",
          },
          {
            fr: "è / ê",
            en: "/ɛ/ — like 'bed'",
            note: "'Très' = TREH, 'être' = EH-truh. Open sound.",
          },
        ],
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "petit / petite",
            phonetic: "puh-TEE / puh-TEET",
            ipa: "/pəti/ /pətit/",
            notes:
              "Hear the difference? The 'e' at the end makes the 't' audible.",
          },
          {
            fr: "français",
            phonetic: "frahn-SEH",
            ipa: "/fʁɑ̃sɛ/",
            notes:
              "The 's' at the end? Silent. The 'an'? Nasal (more in Lesson 3).",
          },
          {
            fr: "hôtel",
            phonetic: "oh-TEL",
            ipa: "/otɛl/",
            notes:
              "The 'h' is completely silent. Sounds exactly like English 'hotel' minus the 'h'.",
          },
        ],
      },
      {
        type: "culture",
        text: "The silent letter system exists because French spelling fossilized around the 13th century while pronunciation kept evolving. The letters were once pronounced — 'petit' used to sound like 'puh-TEET'. The spelling stayed, the sounds moved on. It's like English 'knight' — the k was once spoken.",
      },
      {
        type: "tip",
        text: "When in doubt about a final consonant, don't pronounce it. You'll be right 80% of the time. The CaReFuL exceptions (C, R, F, L) cover most of the rest.",
      },
    ],
    quickRecall: {
      q: "In 'petit', which letter is silent?",
      a: "t",
      o: ["p", "t", "i", "e"],
    },
  },
  examples: [
    {
      fr: "Le petit chat est ici.",
      en: "The little cat is here.",
      bridge: "Le petit cat est here.",
    },
    {
      fr: "C'est un grand hôtel.",
      en: "It's a big hotel.",
      bridge: "C'est un grand hotel.",
    },
    {
      fr: "Elle est française.",
      en: "She is French.",
      bridge: "Elle est French.",
    },
    {
      fr: "Il est très fatigué.",
      en: "He is very tired.",
      bridge: "Il est très tired.",
    },
    {
      fr: "Les amis sont contents.",
      en: "The friends are happy.",
      bridge: "Les amis sont happy.",
    },
    {
      fr: "Un petit restaurant français.",
      en: "A small French restaurant.",
      bridge: "Un petit French restaurant.",
    },
    {
      fr: "Merci beaucoup, c'est très beau.",
      en: "Thank you very much, it's very beautiful.",
      bridge: "Merci beaucoup, c'est très beautiful.",
    },
  ],
  fillFG: [
    {
      s: "The little [___] is here.",
      a: "chat",
      o: ["chat", "chien", "homme", "femme"],
      ctx: "You see a cute cat at a café. Say it in French.",
    },
    {
      s: "It's a [___] hotel.",
      a: "grand",
      o: ["grand", "petit", "bon", "beau"],
      ctx: "Describing an impressive hotel to a friend.",
    },
    {
      s: "She is [___].",
      a: "française",
      o: ["française", "français", "anglaise", "américaine"],
      ctx: "Telling someone about a woman's nationality.",
    },
    {
      s: "He is [___] tired.",
      a: "très",
      o: ["très", "trop", "un", "bien"],
      ctx: "Your friend looks exhausted.",
    },
    {
      s: "The [___] café is closed.",
      a: "petit",
      o: ["petit", "grand", "bon", "vieux"],
      ctx: "The small corner café isn't open today.",
    },
  ],
  fillBlanks: [
    {
      s: "Le ___ chat est ici.",
      a: "petit",
      o: ["petit", "grand", "bon", "gros"],
      ctx: "Describe the small cat sitting on the table.",
    },
    {
      s: "C'est un ___ hôtel.",
      a: "grand",
      o: ["grand", "petit", "bon", "beau"],
      ctx: "You arrive at a huge hotel.",
    },
    {
      s: "Elle est ___.",
      a: "française",
      o: ["française", "français", "fatiguée", "contente"],
      ctx: "Describe her nationality (she's from France).",
    },
    {
      s: "Il est ___ fatigué.",
      a: "très",
      o: ["très", "un", "le", "pas"],
      ctx: "He's VERY tired, emphasize it.",
    },
    {
      s: "Le petit ___ est fermé.",
      a: "café",
      o: ["café", "restaurant", "hôtel", "chat"],
      ctx: "The little coffee shop is closed today.",
    },
  ],
  buildSentences: [
    {
      c: ["Le", "petit", "chat", "est", "ici"],
      en: "The little cat is here",
      trap: ["un", "pas"],
    },
    {
      c: ["C'est", "un", "grand", "hôtel"],
      en: "It's a big hotel",
      trap: ["le", "petit"],
    },
    {
      c: ["Elle", "est", "française"],
      en: "She is French",
      trap: ["un", "suis"],
    },
    {
      c: ["Il", "est", "très", "fatigué"],
      en: "He is very tired",
      trap: ["suis", "pas"],
    },
  ],
  quiz: [
    {
      q: "In 'petit', which letter is silent at the end?",
      a: "t",
      o: ["p", "t", "i", "Both t and i"],
    },
    {
      q: "What does the CaReFuL rule tell you?",
      a: "C, R, F, L are often pronounced at the end",
      o: [
        "All consonants are silent",
        "C, R, F, L are often pronounced at the end",
        "Only vowels are silent",
        "Final e is always pronounced",
      ],
    },
    {
      q: "'Petite' vs 'petit' — what's the difference in sound?",
      a: "The t is heard in petite",
      o: [
        "No difference",
        "The t is heard in petite",
        "The p changes",
        "The i is longer",
      ],
    },
    {
      q: "Which word has a silent h?",
      a: "All of them",
      o: ["Hôtel", "Homme", "Habiter", "All of them"],
      ctx: "Think about French h in general.",
      negative: false,
    },
    {
      q: "Which spelling does NOT match the 'eh' sound?",
      a: "é",
      o: ["è", "ê", "é", "ai"],
      negative: true,
    },
    {
      q: "Why are French final letters often silent?",
      a: "Spelling froze while pronunciation evolved",
      o: [
        "French people are lazy",
        "Spelling froze while pronunciation evolved",
        "To confuse foreigners",
        "Letters were added later",
      ],
    },
  ],
  combine: [
    {
      hint: "The + small + cat + is + here → Describe what you see",
      answer: "Le petit chat est ici",
      accept: ["le petit chat est ici"],
    },
    {
      hint: "She + is + French → State her nationality",
      answer: "Elle est française",
      accept: ["elle est française", "elle est francaise"],
    },
  ],
  weave: [
    {
      en: "The small cat is here and the big hotel is there.",
      known: [
        "le",
        "petit",
        "chat",
        "est",
        "ici",
        "grand",
        "hôtel",
      ],
      sample:
        "Le petit chat est ici and le grand hôtel est there.",
    },
    {
      en: "She is French and he is very tired.",
      known: ["elle", "est", "française", "il", "très", "fatigué"],
      sample: "Elle est française and il est très fatigué.",
    },
    {
      en: "It's a big hotel. The small café is closed.",
      known: [
        "c'est",
        "un",
        "grand",
        "hôtel",
        "le",
        "petit",
        "café",
      ],
      sample: "C'est un grand hôtel. Le petit café est closed.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Le petit chat est ici.",
      q: "What is being described?",
      a: "A small cat is here",
      o: [
        "A small cat is here",
        "A big hotel",
        "She is French",
        "He is tired",
      ],
    },
    {
      type: "odd",
      q: "Which word's final letter IS pronounced?",
      items: ["petit", "grand", "sac", "français"],
      a: "sac",
      reason:
        "'Sac' ends in C — CaReFuL rule. The others have silent final consonants.",
    },
    {
      type: "context",
      situation:
        "You want to say 'she is French' — which form?",
      a: "française",
      o: ["français", "française", "france", "françaises"],
    },
    {
      type: "fill_ctx",
      s: "___, je voudrais un café.",
      a: "Bonjour",
      o: ["Bonjour", "Bonsoir", "Merci", "Salut"],
      ctx: "It's morning. Greet first. (Lesson 1)",
    },
  ],
  sayIt: [
    {
      situation:
        "Describe what you see: a small cat, a big hotel, and a French woman.",
      target: ["petit", "chat", "grand", "hôtel", "française"],
    },
    {
      situation:
        "You're at a café. Describe the scene: the small café, the beautiful street.",
      target: ["petit", "café", "rue", "beau", "très"],
    },
  ],
  miniConv: {
    topic: "Describing things around you using pronunciation patterns",
    starter: "Regarde ! Il y a un petit chat ici. Tu le vois ?",
  },
  expressions: [
    {
      fr: "C'est ça",
      en: "That's it / That's right",
      usage: "'Tu veux le rouge ?' — 'Oui, c'est ça !'",
      literal: "It's that",
    },
    {
      fr: "Ah bon ?",
      en: "Oh really?",
      usage: "'Je pars demain.' — 'Ah bon ?'",
      literal: "Ah good?",
    },
    {
      fr: "Très bien",
      en: "Very good / Very well",
      usage: "'Comment ça va ?' — 'Très bien, merci.'",
      literal: "Very well",
    },
  ],
  grammarNuggets: [
    {
      title: "Silent -e is an activator switch",
      insight:
        "The silent -e at the end of a word makes the preceding consonant heard. 'Petit' (silent t) → 'petite' (t is pronounced). The -e is not decorative — it's doing a JOB. This is also how French marks feminine.",
      example: "petit → /pəti/ but petite → /pətit/",
    },
    {
      title: "French spelling is a fossil record",
      insight:
        "Every 'silent' letter was once spoken. 'Petit' used to rhyme with 'petite.' English has the same fossils: 'knight' was k-night. French is not randomly difficult — it's historically consistent.",
      example: "knight = k-night, château = castle (same Latin root)",
    },
  ],
  fauxAmis: [
    {
      fr: "chat",
      looksLike: "chat (conversation)",
      actualMeaning: "cat",
      example: "Le chat est sur la table. (The cat is on the table.)",
    },
  ],
  cultureBite:
    "French pronunciation is more predictable than English. Once you learn the patterns, you can pronounce ANY word you read — even words you've never seen. English can't say the same: think of cough, through, though, tough.",
  summary: [
    "Silent consonant rules: CaReFuL",
    "The -e activator switch",
    "Liaison: les\u200Bamis",
    "Expression: c'est ça, ah bon",
  ],
};
