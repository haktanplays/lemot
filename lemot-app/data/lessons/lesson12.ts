import type { Lesson } from "@/lib/types";

export const lesson12: Lesson = {
  id: 12,
  title: "Everyday Phrases",
  sub: "What everyone says but textbooks skip",
  icon: "Sparkles",
  level: "A1",
  grammar: {
    title: "Everyday Conversation Phrases",
    sections: [
      {
        type: "intro",
        text: "*Ces expressions* — these phrases — are usually taught at B1-B2 in textbooks. But *les Français les utilisent tous les jours.* Learning them early dramatically improves *la fluidité.*",
      },
      {
        type: "block",
        label: "Structure Phrases",
        items: [
          {
            fr: "Il y a...",
            en: "There is/are",
            note: "Word for word: 'It there has.' English equivalent: 'there is/are.'",
          },
          {
            fr: "Il faut...",
            en: "One must",
            note: "Impersonal — 'il' is structural (like English 'it' in 'it's raining').",
          },
          {
            fr: "En fait...",
            en: "Actually / In fact",
            note: "Identical to English 'in fact' — direct cognate.",
          },
        ],
      },
      {
        type: "block",
        label: "Reaction Phrases",
        items: [
          {
            fr: "Ça marche",
            en: "Sounds good",
            note: "Literally: 'that walks/works.' Like English 'that works for me.'",
          },
          {
            fr: "Ça dépend",
            en: "It depends",
            note: "Identical to English 'it depends.'",
          },
          {
            fr: "D'accord",
            en: "Okay",
            note: "Root: Latin 'cor' (heart) — 'hearts in agreement.'",
          },
        ],
      },
      {
        type: "culture",
        text: "*Ça* is French's Swiss Army knife. Ça va (how are you), Ça marche (sounds good), Ça dépend (it depends), Ça suffit (that's enough), Ça m'énerve (that annoys me). Learning *ça* unlocks dozens of expressions.",
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "Il y a",
            phonetic: "eel ee AH",
            ipa: "/il j a/",
            notes:
              "Three tiny syllables blended together. The 'y' sounds like English 'ee'.",
          },
          {
            fr: "Ça marche",
            phonetic: "sah MARSH",
            ipa: "/sa maʁʃ/",
            notes:
              "'ça' like 'sah'. 'marche' — the 'ch' is like English 'sh'.",
          },
          {
            fr: "En fait",
            phonetic: "ahn FEH",
            ipa: "/ɑ̃ fɛ/",
            notes:
              "'en' is nasal 'ah' — don't say the 'n'. 'fait' rhymes with 'met'.",
          },
        ],
      },
      {
        type: "tip",
        text: "*Ça va* is both question AND answer. *Ça va ?* (How are you?) → *Ça va.* (I'm fine.) Two French people in an elevator: *Ça va ? — Ça va.* The world's shortest conversation.",
      },
    ],
    quickRecall: {
      q: "'En fait' is a cognate of which English phrase?",
      a: "In fact",
      o: ["In fact", "In case", "In time", "Indeed"],
    },
  },
  examples: [
    {
      fr: "Il y a un bon restaurant ici.",
      en: "There's a good restaurant here.",
      bridge: "Il y a a good restaurant here.",
    },
    {
      fr: "Il faut partir maintenant.",
      en: "We need to leave now.",
      bridge: "Il faut leave maintenant.",
    },
    {
      fr: "En fait, je préfère le thé.",
      en: "Actually, I prefer tea.",
      bridge: "En fait, I préfère le tea.",
    },
    {
      fr: "Ça marche, on se voit demain !",
      en: "Sounds good, see you tomorrow!",
      bridge: "Ça marche, see you demain!",
    },
    {
      fr: "Ça dépend.",
      en: "It depends.",
      bridge: "Ça dépend.",
    },
    {
      fr: "D'accord, pas de problème.",
      en: "OK, no problem.",
      bridge: "D'accord, no problème.",
    },
    {
      fr: "Bien sûr, il y a une pharmacie là-bas.",
      en: "Of course, there's a pharmacy over there.",
      bridge: "Bien sûr, il y a a pharmacy over there.",
    },
    {
      fr: "Il faut manger, j'ai faim !",
      en: "We need to eat, I'm hungry!",
      bridge: "Il faut eat, I'm hungry!",
    },
  ],
  fillFG: [
    {
      s: "There [___] a problem.",
      a: "y a",
      o: ["y a", "faut", "est", "va"],
      ctx: "Something went wrong at the hotel.",
    },
    {
      s: "We [___] leave now.",
      a: "faut",
      o: ["faut", "y a", "est", "peut"],
      ctx: "Your train leaves in 5 minutes.",
    },
    {
      s: "[___], I prefer tea.",
      a: "En fait",
      o: ["En fait", "Il faut", "Ça va", "D'accord"],
      ctx: "Someone offered you coffee but you want tea.",
    },
    {
      s: "[___] good, see you tomorrow!",
      a: "Ça marche",
      o: ["Ça marche", "Ça va", "D'accord", "Merci"],
      ctx: "A friend just proposed dinner plans.",
    },
    {
      s: "It [___].",
      a: "dépend",
      o: ["dépend", "marche", "va", "faut"],
      ctx: "Someone asked if you're coming tonight. You're not sure.",
    },
  ],
  fillBlanks: [
    {
      s: "Il ___ un problème.",
      a: "y a",
      o: ["y a", "faut", "est", "va"],
      ctx: "Report a problem at reception.",
    },
    {
      s: "Il ___ faire attention.",
      a: "faut",
      o: ["faut", "y a", "est", "peut"],
      ctx: "Warn someone to be careful.",
    },
    {
      s: "___ fait, je suis fatigué.",
      a: "En",
      o: ["En", "Il", "Ça", "De"],
      ctx: "Correct yourself — you said you were fine, but actually you're tired.",
    },
    {
      s: "Ça ___ !",
      a: "marche",
      o: ["marche", "va", "dépend", "fait"],
      ctx: "Agree to a friend's plan.",
    },
    {
      s: "___ de problème.",
      a: "Pas",
      o: ["Pas", "Il", "Ça", "En"],
      ctx: "Someone thanks you for helping. Reassure them.",
    },
  ],
  buildSentences: [
    {
      c: ["Il", "y", "a", "un", "restaurant", "ici"],
      en: "There is a restaurant here",
      trap: ["est", "faut"],
    },
    {
      c: ["Il", "faut", "partir", "maintenant"],
      en: "We must leave now",
      trap: ["y", "a", "est"],
    },
    {
      c: ["En", "fait", "je", "préfère", "le", "thé"],
      en: "Actually, I prefer tea",
      trap: ["un", "suis"],
    },
    {
      c: ["Ça", "marche", "on", "se", "voit", "demain"],
      en: "Sounds good, see you tomorrow",
      trap: ["est", "fait"],
    },
  ],
  quiz: [
    {
      q: "What does 'ça marche' literally mean?",
      a: "It walks/works",
      o: ["It goes", "It walks/works", "It depends", "It's good"],
    },
    {
      q: "What does 'il' represent in 'il y a'?",
      a: "A structure word (like 'it')",
      o: ["He", "A structure word (like 'it')", "We", "They"],
    },
    {
      q: "Your train leaves in 3 minutes. Express urgency.",
      a: "Il faut partir maintenant",
      o: [
        "Il y a un train",
        "Il faut partir maintenant",
        "Ça marche",
        "En fait, je préfère",
      ],
      ctx: "You're at the platform.",
    },
    {
      q: "'D'accord' comes from Latin 'cor'. What does 'cor' mean?",
      a: "Heart",
      o: ["Agreement", "Heart", "Cord", "Body"],
    },
    {
      q: "Someone offers coffee. You prefer tea. What do you say?",
      a: "En fait, je préfère le thé",
      o: [
        "Ça marche",
        "En fait, je préfère le thé",
        "Il faut le thé",
        "D'accord",
      ],
      ctx: "Polite dinner situation.",
    },
    {
      q: "'Il faut' is an impersonal structure. This means...",
      a: "It doesn't specify who must do it",
      o: [
        "It's about 'he'",
        "It doesn't specify who must do it",
        "It's always negative",
        "It's past tense",
      ],
    },
    {
      q: "Which response should you NEVER use when agreeing to plans?",
      a: "Il faut",
      o: ["Ça marche", "D'accord", "Il faut", "Pas de problème"],
      ctx: "A friend suggests dinner tomorrow.",
      negative: true,
    },
  ],
  combine: [
    {
      hint: "'There is' + thing + place → Say something exists",
      answer: "Il y a un restaurant ici",
      accept: [
        "il y a un restaurant ici",
        "il y a un bon restaurant ici",
      ],
    },
    {
      hint: "Actually + preference → Politely change your mind",
      answer: "En fait, je préfère le thé",
      accept: [
        "en fait je préfère le thé",
        "en fait, je préfère le thé",
        "en fait je prefere le the",
      ],
    },
    {
      hint: "Express urgency: must + leave + now",
      answer: "Il faut partir maintenant",
      accept: ["il faut partir maintenant"],
    },
  ],
  franglais: [
    {
      en: "Actually, I am tired. There is a good restaurant here.",
      known: [
        "en fait",
        "je",
        "suis",
        "fatigué",
        "il y a",
        "bon",
        "restaurant",
        "ici",
      ],
      sample:
        "En fait, je suis fatigué. Il y a a bon restaurant ici.",
    },
    {
      en: "We must leave now. Sounds good, see you tomorrow!",
      known: [
        "il faut",
        "partir",
        "maintenant",
        "ça marche",
        "demain",
      ],
      sample:
        "Il faut partir maintenant. Ça marche, see you demain!",
    },
    {
      en: "It depends. Actually, I prefer tea please.",
      known: [
        "ça dépend",
        "en fait",
        "je",
        "préfère",
        "thé",
        "s'il vous plaît",
      ],
      sample:
        "Ça dépend. En fait, je préfère le thé, s'il vous plaît.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Il faut partir maintenant.",
      q: "What does this mean?",
      a: "We must leave now",
      o: [
        "We must leave now",
        "There's a restaurant here",
        "I prefer tea",
        "It depends",
      ],
    },
    {
      type: "odd",
      q: "Which does NOT belong?",
      items: ["Ça marche", "Ça va", "Ça dépend", "Il faut"],
      a: "Il faut",
      reason: "First three use 'ça'. 'Il faut' uses 'il'.",
    },
    {
      type: "context",
      situation: "A friend suggests going to the cinema. You agree.",
      a: "Ça marche",
      o: ["Ça marche", "Il faut", "En fait", "Il y a"],
    },
    {
      type: "fill_ctx",
      s: "Je ___ fatigué.",
      a: "suis",
      o: ["suis", "est", "faut", "va"],
      ctx: "Tell someone you're tired. (être, Lesson 5)",
    },
    {
      type: "franglais",
      en: "Actually, I prefer tea.",
      blanks: [
        { word: "Actually", answer: "En fait" },
        { word: "prefer", answer: "préfère" },
      ],
      full: "En fait, je préfère le thé.",
    },
  ],
  sayIt: [
    {
      situation:
        "A friend proposes dinner tonight but you need to leave now. Respond naturally.",
      target: [
        "il faut",
        "partir",
        "maintenant",
        "ça marche",
        "en fait",
      ],
    },
    {
      situation:
        "Someone offers coffee. You'd rather have tea. Politely change your order.",
      target: ["en fait", "préfère", "thé", "d'accord"],
    },
  ],
  miniConv: {
    topic:
      "Making plans and reacting to suggestions using everyday phrases",
    starter: "Salut ! Il y a un bon restaurant ici. On y va ?",
  },
};
