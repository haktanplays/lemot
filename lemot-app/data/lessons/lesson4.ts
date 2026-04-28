import type { Lesson } from "@/lib/types";

export const lesson4: Lesson = {
  id: 4,
  title: "Avoir: Feelings & Needs",
  sub: "The verb of age, feelings and needs",
  icon: "Heart",
  level: "A1",
  difficulty: "medium",
  grammar: {
    title: "Avoir — To Have (But Really, To Feel)",
    sections: [
      {
        type: "intro",
        text: "In English, you *are* hungry. In French, you *have* hunger — *j'ai faim*. The verb *avoir* (to have) is the second most important verb in French. It handles possession, age, and a whole family of physical sensations. If *être* tells the world who you are, *avoir* tells it what you're experiencing.",
      },
      {
        type: "conjugation",
        verb: "avoir — to have",
        rows: [
          { pr: "J'", conj: "ai", en: "I have", pron: "/ʒ‿ɛ/" },
          { pr: "Tu", conj: "as", en: "You have", pron: "/ty a/" },
          { pr: "Il/Elle", conj: "a", en: "He/She has", pron: "/il a/" },
          { pr: "Nous", conj: "avons", en: "We have", pron: "/nu.za.vɔ̃/" },
          { pr: "Vous", conj: "avez", en: "You have", pron: "/vu.za.ve/" },
          { pr: "Ils/Elles", conj: "ont", en: "They have", pron: "/il.z‿ɔ̃/" },
        ],
      },
      {
        type: "block",
        label: "Avoir Expressions — Feelings & Sensations",
        items: [
          {
            fr: "J'ai faim",
            en: "I'm hungry",
            note: "Literally: 'I have hunger.' French treats hunger as something you possess, not something you are.",
          },
          {
            fr: "J'ai soif",
            en: "I'm thirsty",
            note: "Literally: 'I have thirst.' Same pattern as faim.",
          },
          {
            fr: "J'ai froid",
            en: "I'm cold",
            note: "Literally: 'I have cold.' Don't say 'je suis froid' — that means you're an emotionally cold person!",
          },
          {
            fr: "J'ai chaud",
            en: "I'm hot",
            note: "Literally: 'I have hot.' Again, 'je suis chaud(e)' means something very different — be careful!",
          },
          {
            fr: "J'ai peur",
            en: "I'm afraid",
            note: "Literally: 'I have fear.' Peur sounds like English 'purr' but with the French /œ/ vowel.",
          },
          {
            fr: "J'ai sommeil",
            en: "I'm sleepy",
            note: "Literally: 'I have sleepiness.' Sommeil is related to English 'somnolent.'",
          },
        ],
      },
      {
        type: "block",
        label: "Avoir for Age",
        items: [
          {
            fr: "J'ai vingt ans",
            en: "I'm twenty years old",
            note: "Literally: 'I have twenty years.' In French you don't ARE an age, you HAVE years. 'Ans' = years, always required.",
          },
          {
            fr: "Tu as quel âge ?",
            en: "How old are you?",
            note: "Literally: 'You have what age?' The most common way to ask someone's age.",
          },
          {
            fr: "Elle a trente ans",
            en: "She is thirty years old",
            note: "Never drop 'ans' — without it, the sentence is incomplete.",
          },
        ],
      },
      {
        type: "block",
        label: "Il y a — There Is / There Are",
        items: [
          {
            fr: "Il y a",
            en: "There is / There are",
            note: "Literally: 'It there has.' One expression covers both singular and plural — no distinction like English 'is' vs 'are.'",
          },
          {
            fr: "Il y a un café ici.",
            en: "There's a café here.",
            note: "Works for anything that exists in a place.",
          },
          {
            fr: "Il y a trois personnes.",
            en: "There are three people.",
            note: "Same form whether it's one thing or many.",
          },
        ],
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "avoir",
            phonetic: "ah-VWAHR",
            ipa: "/a.vwaʁ/",
            notes:
              "The French R (/ʁ/) is produced at the back of the throat — like a gentle gargle. Not the English R at all. Practice: say 'ah' then add a soft throat vibration.",
          },
          {
            fr: "j'ai",
            phonetic: "zhay",
            ipa: "/ʒɛ/",
            notes:
              "Je + ai contracts to j'ai. The 'zh' is like the 's' in 'pleasure.' Rhymes with English 'bay.'",
          },
          {
            fr: "ils ont",
            phonetic: "eel-ZOHN",
            ipa: "/il.z‿ɔ̃/",
            notes:
              "Liaison: the silent 's' of 'ils' becomes a /z/ sound before 'ont.' This linking is mandatory.",
          },
        ],
      },
      {
        type: "culture",
        text: "The 'avoir expressions' reveal how French and English see the world differently. English speakers ARE hungry, ARE afraid, ARE 20 years old — these are states of being. French speakers HAVE hunger, HAVE fear, HAVE 20 years — these are possessions, temporary things that come and go. It's a fundamentally different philosophy of experience.",
      },
      {
        type: "tip",
        text: "Never say *je suis faim* or *je suis froid* — those don't exist. Physical sensations always use *avoir* in French. The mistake is so common among English speakers that the French find it endearing (but still wrong). When in doubt: if it's a feeling you can't control — hunger, thirst, cold, fear — use *avoir*.",
      },
    ],
    quickRecall: {
      q: "'J'ai faim' literally means...",
      a: "I have hunger",
      o: [
        "I have hunger",
        "I am hungry",
        "I feel hunger",
        "I want food",
      ],
    },
  },
  examples: [
    {
      fr: "J'ai faim. Tu as faim aussi ?",
      en: "I'm hungry. Are you hungry too?",
      bridge: "J'ai hungry. Tu as hungry aussi?",
    },
    {
      fr: "Elle a vingt-cinq ans.",
      en: "She is twenty-five years old.",
      bridge: "Elle a twenty-five ans.",
    },
    {
      fr: "Nous avons froid ici.",
      en: "We're cold here.",
      bridge: "Nous avons cold ici.",
    },
    {
      fr: "Vous avez soif ? Il y a de l'eau.",
      en: "Are you thirsty? There's water.",
      bridge: "Vous avez thirsty? Il y a de l'eau.",
    },
    {
      fr: "Il a peur du chien.",
      en: "He's afraid of the dog.",
      bridge: "Il a afraid du chien.",
    },
    {
      fr: "Tu as quel âge ? — J'ai trente ans.",
      en: "How old are you? — I'm thirty.",
      bridge: "Tu as quel âge? — J'ai thirty ans.",
    },
    {
      fr: "Il y a un bon restaurant ici.",
      en: "There's a good restaurant here.",
      bridge: "Il y a un bon restaurant ici.",
    },
    {
      fr: "Ils ont sommeil après le voyage.",
      en: "They're sleepy after the trip.",
      bridge: "Ils ont sleepy après le voyage.",
    },
  ],
  fillFG: [
    {
      s: "I [___] hungry.",
      a: "ai faim",
      o: ["ai faim", "suis faim", "ai chaud", "suis froid"],
      ctx: "You haven't eaten since morning. Express your hunger in French.",
      fr: "J'ai faim.",
    },
    {
      s: "She [___] twenty-five years old.",
      a: "a vingt-cinq ans",
      o: ["a vingt-cinq ans", "est vingt-cinq ans", "a vingt-cinq", "est vingt-cinq"],
      ctx: "Telling someone your friend's age.",
      fr: "Elle a vingt-cinq ans.",
    },
    {
      s: "They [___] cold.",
      a: "ont froid",
      o: ["ont froid", "sont froid", "ont faim", "ont chaud"],
      ctx: "Your friends are shivering at an outdoor café.",
      fr: "Ils ont froid.",
    },
    {
      s: "There [___] a good restaurant here.",
      a: "il y a",
      o: ["il y a", "il est", "c'est", "il a"],
      ctx: "Recommending a restaurant to a tourist.",
      fr: "Il y a un bon restaurant ici.",
    },
    {
      s: "We [___] thirsty.",
      a: "avons soif",
      o: ["avons soif", "sommes soif", "avons faim", "avons froid"],
      ctx: "After a long walk on a hot day.",
      fr: "Nous avons soif.",
    },
  ],
  fillBlanks: [
    {
      s: "J'___ faim.",
      a: "ai",
      o: ["ai", "suis", "est", "as"],
      ctx: "You're hungry — use the correct form of avoir.",
    },
    {
      s: "Elle ___ vingt ans.",
      a: "a",
      o: ["a", "est", "ai", "as"],
      ctx: "Stating someone's age — she is twenty.",
    },
    {
      s: "Nous ___ froid.",
      a: "avons",
      o: ["avons", "sommes", "avez", "ont"],
      ctx: "We're cold — use the nous form of avoir.",
    },
    {
      s: "Il y ___ un café ici.",
      a: "a",
      o: ["a", "est", "ai", "sont"],
      ctx: "There is a café here — complete 'il y a'.",
    },
    {
      s: "Tu ___ quel âge ?",
      a: "as",
      o: ["as", "es", "ai", "a"],
      ctx: "Asking someone's age informally.",
    },
  ],
  buildSentences: [
    {
      c: ["J'", "ai", "faim"],
      en: "I'm hungry",
      trap: ["suis", "est"],
    },
    {
      c: ["Elle", "a", "vingt", "ans"],
      en: "She is twenty years old",
      trap: ["est", "suis"],
    },
    {
      c: ["Il", "y", "a", "un", "café"],
      en: "There is a café",
      trap: ["est", "sont"],
    },
    {
      c: ["Nous", "avons", "très", "froid"],
      en: "We are very cold",
      trap: ["sommes", "sont"],
    },
  ],
  quiz: [
    {
      q: "How do you say 'I'm hungry' in French?",
      a: "J'ai faim",
      o: ["J'ai faim", "Je suis faim", "J'ai chaud", "Je suis affamé"],
      ctx: "Physical sensations use avoir, not être.",
    },
    {
      q: "'J'ai froid' literally means...",
      a: "I have cold",
      o: ["I have cold", "I am cold", "It is cold", "I feel cold"],
    },
    {
      q: "Why should you NEVER say 'je suis chaud(e)'?",
      a: "It implies you're 'hot' in a romantic/sexual way",
      o: [
        "It implies you're 'hot' in a romantic/sexual way",
        "It's grammatically impossible",
        "It means you're sick",
        "It's too informal",
      ],
    },
    {
      q: "How do you ask someone's age?",
      a: "Tu as quel âge ?",
      o: ["Tu as quel âge ?", "Tu es quel âge ?", "Quel âge tu es ?", "Tu as combien ?"],
    },
    {
      q: "'Il y a' translates to...",
      a: "There is / There are",
      o: ["There is / There are", "He has", "It is here", "He is there"],
    },
    {
      q: "Which is the correct conjugation for 'nous'?",
      a: "Nous avons",
      o: ["Nous avons", "Nous avez", "Nous ont", "Nous sommes"],
    },
    {
      q: "You're at a café and parched. You say: '_______, s'il vous plaît.'",
      a: "J'ai soif, de l'eau",
      o: ["J'ai soif, de l'eau", "Je suis soif", "J'ai chaud, un café", "Je veux dormir"],
      ctx: "Express your thirst and ask for water.",
    },
    {
      q: "Someone asks 'Tu as quel âge ?' You're 28. You answer:",
      a: "J'ai vingt-huit ans",
      o: ["J'ai vingt-huit ans", "Je suis vingt-huit", "J'ai vingt-huit", "Je suis vingt-huit ans"],
      ctx: "Age uses avoir + number + ans.",
    },
  ],
  combine: [
    {
      hint: "I + have + hunger → Say you're hungry",
      answer: "J'ai faim",
      accept: ["j'ai faim", "jai faim"],
    },
    {
      hint: "She + has + 30 + years → State her age",
      answer: "Elle a trente ans",
      accept: ["elle a trente ans", "elle a 30 ans"],
    },
    {
      hint: "There is + a + café + here → Point out a café",
      answer: "Il y a un café ici",
      accept: ["il y a un cafe ici", "il y a un café ici"],
    },
  ],
  weave: [
    {
      en: "I'm hungry and she's thirsty. There is a restaurant here.",
      known: [
        "j'ai",
        "faim",
        "elle",
        "a",
        "soif",
        "il y a",
        "un",
        "restaurant",
        "ici",
      ],
      sample:
        "J'ai faim and elle a soif. Il y a un restaurant ici.",
    },
    {
      en: "How old are you? I'm twenty years old and I'm afraid of dogs.",
      known: [
        "tu",
        "as",
        "quel",
        "âge",
        "j'ai",
        "vingt",
        "ans",
        "peur",
        "des",
        "chiens",
      ],
      sample:
        "Tu as quel âge? J'ai vingt ans and j'ai peur des chiens.",
    },
    {
      en: "We're cold and they're sleepy. There are blankets here.",
      known: [
        "nous",
        "avons",
        "froid",
        "ils",
        "ont",
        "sommeil",
        "il y a",
        "des",
        "couvertures",
        "ici",
      ],
      sample:
        "Nous avons froid and ils ont sommeil. Il y a des couvertures ici.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "J'ai très faim. Il y a un restaurant ici ?",
      q: "What does the speaker need?",
      a: "Food — they're very hungry and asking about a restaurant",
      o: [
        "Food — they're very hungry and asking about a restaurant",
        "Directions to a hotel",
        "A glass of water",
        "Help with the cold",
      ],
    },
    {
      type: "odd",
      q: "Which does NOT use 'avoir'?",
      items: ["J'ai faim", "Elle a vingt ans", "Il y a un café", "Je suis français"],
      a: "Je suis français",
      reason: "Identity/nationality uses 'être' (to be), not 'avoir' (to have).",
    },
    {
      type: "context",
      situation: "It's freezing outside and you just came in from the cold.",
      a: "J'ai très froid !",
      o: [
        "J'ai très froid !",
        "Je suis froid",
        "Il fait froid",
        "J'ai chaud",
      ],
    },
    {
      type: "fill_ctx",
      s: "Ils ___ sommeil après le voyage.",
      a: "ont",
      o: ["ont", "sont", "avons", "a"],
      ctx: "They're sleepy after the trip — use avoir.",
    },
    {
      type: "context",
      situation: "A friend asks your age. You're 25.",
      a: "J'ai vingt-cinq ans.",
      o: [
        "J'ai vingt-cinq ans.",
        "Je suis vingt-cinq.",
        "J'ai vingt-cinq.",
        "Je suis vingt-cinq ans.",
      ],
    },
  ],
  sayIt: [
    {
      situation:
        "You're at a café with friends. Tell them you're hungry and thirsty, and point out there's a restaurant nearby.",
      target: ["ai", "faim", "soif", "il y a", "restaurant"],
    },
    {
      situation:
        "Someone asks your age. Answer, then ask how old they are.",
      target: ["ai", "ans", "quel", "âge", "as"],
    },
  ],
  miniConv: {
    topic: "Expressing feelings, needs, and age using avoir",
    starter:
      "Salut ! Ça va ? Tu as faim ? Il y a un bon restaurant pas loin.",
  },
  expressions: [
    {
      fr: "Avoir l'air",
      en: "To look/seem",
      usage: "'Tu as l'air fatigué.' (You look tired.)",
      literal: "To have the air",
    },
    {
      fr: "Avoir besoin de",
      en: "To need",
      usage: "'J'ai besoin d'eau.' (I need water.)",
      literal: "To have need of",
    },
    {
      fr: "Avoir raison / tort",
      en: "To be right / wrong",
      usage: "'Tu as raison !' (You're right!)",
      literal: "To have reason / wrong",
    },
  ],
  grammarNuggets: [
    {
      title: "French feelings are possessions, not identities",
      insight:
        "English says 'I AM hungry' — hunger is part of your identity. French says 'I HAVE hunger' — it's something you carry temporarily. This extends to age ('I have 20 years'), fear, thirst, cold. Once you internalize this, dozens of avoir expressions click into place.",
      example:
        "J'ai faim (I have hunger), J'ai peur (I have fear), J'ai 20 ans (I have 20 years)",
    },
    {
      title: "Il y a — the universal 'there is'",
      insight:
        "English needs 'there is' (singular) vs 'there are' (plural). French uses 'il y a' for everything — one café or fifty people, same expression. Literally 'it there has.' Less to remember, less to conjugate.",
      example:
        "Il y a un chat (there is a cat), Il y a des chats (there are cats)",
    },
  ],
  fauxAmis: [
    {
      fr: "j'ai chaud",
      looksLike: "I am hot (attractive)",
      actualMeaning: "I feel warm/overheated (temperature)",
      example: "J'ai chaud, ouvre la fenêtre. (I'm hot, open the window.)",
    },
  ],
  soundPatterns: [
    {
      pattern: "The French R (/ʁ/)",
      examples: [
        { fr: "avoir", en: "to have" },
        { fr: "revoir", en: "to see again" },
        { fr: "très", en: "very" },
        { fr: "restaurant", en: "restaurant" },
      ],
      rule: "The French R is uvular — produced at the back of the throat, not with the tongue tip like English R. Think of it as a soft gargle or the sound you make clearing your throat very gently. Practice with 'rouge' (red) — say 'ooj' with a gentle throat vibration at the start.",
    },
  ],
  cultureBite:
    "When French people meet a baby, the first question is often 'Il a quel âge ?' (How old is he/she?) — using avoir, of course. Age in French is something you accumulate, not something you become. A French person doesn't turn 30 — they arrive at having 30 years.",
  summary: [
    "Avoir conjugation: j'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont",
    "Avoir expressions: j'ai faim, soif, froid, chaud, peur, sommeil",
    "Age uses avoir: j'ai 20 ans (I have 20 years)",
    "Il y a = there is / there are (one form for everything)",
    "French R (/ʁ/) — throaty, not the English R",
  ],
};
