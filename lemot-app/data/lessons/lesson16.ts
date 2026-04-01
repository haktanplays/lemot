import type { Lesson } from "@/lib/types";

export const lesson16: Lesson = {
  id: 16,
  title: "Vouloir, Pouvoir, Devoir",
  sub: "Want, can, must",
  icon: "Zap",
  level: "A1",
  difficulty: "hard",
  grammar: {
    title: "Modal Verbs: Want, Can, Must",
    sections: [
      {
        type: "intro",
        text: "Three verbs unlock a huge range of expression: *vouloir* (to want), *pouvoir* (to be able to), *devoir* (to must/have to). These are modal verbs — they pair with an infinitive to express desire, ability, and obligation. *Je veux manger* = I want to eat.",
      },
      {
        type: "conjugation",
        verb: "vouloir — to want",
        rows: [
          { pr: "Je", conj: "veux", en: "I want", pron: "/ʒə vø/" },
          { pr: "Tu", conj: "veux", en: "You want", pron: "/ty vø/" },
          { pr: "Il/Elle", conj: "veut", en: "He/She wants", pron: "/il vø/" },
          { pr: "Nous", conj: "voulons", en: "We want", pron: "/nu vu.lɔ̃/" },
          { pr: "Vous", conj: "voulez", en: "You want", pron: "/vu vu.le/" },
          { pr: "Ils/Elles", conj: "veulent", en: "They want", pron: "/il vœl/" },
        ],
      },
      {
        type: "conjugation",
        verb: "pouvoir — to be able to / can",
        rows: [
          { pr: "Je", conj: "peux", en: "I can", pron: "/ʒə pø/" },
          { pr: "Tu", conj: "peux", en: "You can", pron: "/ty pø/" },
          { pr: "Il/Elle", conj: "peut", en: "He/She can", pron: "/il pø/" },
          { pr: "Nous", conj: "pouvons", en: "We can", pron: "/nu pu.vɔ̃/" },
          { pr: "Vous", conj: "pouvez", en: "You can", pron: "/vu pu.ve/" },
          { pr: "Ils/Elles", conj: "peuvent", en: "They can", pron: "/il pœv/" },
        ],
      },
      {
        type: "conjugation",
        verb: "devoir — to must / to have to",
        rows: [
          { pr: "Je", conj: "dois", en: "I must", pron: "/ʒə dwa/" },
          { pr: "Tu", conj: "dois", en: "You must", pron: "/ty dwa/" },
          { pr: "Il/Elle", conj: "doit", en: "He/She must", pron: "/il dwa/" },
          { pr: "Nous", conj: "devons", en: "We must", pron: "/nu də.vɔ̃/" },
          { pr: "Vous", conj: "devez", en: "You must", pron: "/vu də.ve/" },
          { pr: "Ils/Elles", conj: "doivent", en: "They must", pron: "/il dwav/" },
        ],
      },
      {
        type: "block",
        label: "Modal + Infinitive Pattern",
        items: [
          {
            fr: "Je veux manger.",
            en: "I want to eat.",
            note: "Vouloir + infinitive. The second verb stays in infinitive form.",
          },
          {
            fr: "Tu peux partir.",
            en: "You can leave.",
            note: "Pouvoir + infinitive. Same pattern: conjugated modal + bare infinitive.",
          },
          {
            fr: "Il doit travailler.",
            en: "He must work.",
            note: "Devoir + infinitive. Devoir ≈ duty (English cognate).",
          },
          {
            fr: "Nous devons partir maintenant.",
            en: "We must leave now.",
            note: "The modal verb conjugates; the main verb stays infinitive.",
          },
        ],
      },
      {
        type: "block",
        label: "Politeness: Je voudrais vs Je veux",
        items: [
          {
            fr: "Je veux un café.",
            en: "I want a coffee. (direct/demanding)",
            note: "Sounds blunt in French. Like 'I want a coffee' in English — acceptable but not polite.",
          },
          {
            fr: "Je voudrais un café.",
            en: "I would like a coffee. (polite)",
            note: "Callback to L1! 'Je voudrais' is the polite form of 'je veux.' Use it in shops, restaurants, everywhere.",
          },
        ],
      },
      {
        type: "tip",
        text: "These three modals follow the same pattern: *je* and *tu* forms sound identical (veux/veux, peux/peux, dois/dois). The *ils/elles* forms are the trickiest: veulent, peuvent, doivent — all irregular but share a similar feel.",
      },
      {
        type: "etymology",
        pairs: [
          {
            fr: "devoir",
            en: "duty",
            root: "Latin 'debere' (to owe) → French devoir. English: duty, debt, debit. Devoir = what you owe to do.",
          },
          {
            fr: "pouvoir",
            en: "power",
            root: "Latin 'posse/potere' → French pouvoir. English: power, potent, possible. Pouvoir = to have power to do.",
          },
        ],
      },
      {
        type: "culture",
        text: "French politeness is built into verb forms. 'Je voudrais' (I would like) vs 'je veux' (I want) is not just grammar — it's social code. A waiter hearing 'je veux' may serve you, but they'll think you're rude. 'Pourriez-vous...' (could you...) is even more polite than 'pouvez-vous.'",
      },
    ],
    quickRecall: {
      q: "How do you politely say 'I would like a coffee'?",
      a: "Je voudrais un café",
      o: [
        "Je voudrais un café",
        "Je veux un café",
        "Je peux un café",
        "Je dois un café",
      ],
    },
  },
  examples: [
    {
      fr: "Je veux manger maintenant.",
      en: "I want to eat now.",
      bridge: "Je veux eat maintenant.",
    },
    {
      fr: "Tu peux venir ce soir ?",
      en: "Can you come tonight?",
      bridge: "Tu peux come ce soir?",
    },
    {
      fr: "Elle doit partir demain.",
      en: "She must leave tomorrow.",
      bridge: "Elle doit leave demain.",
    },
    {
      fr: "Nous voulons visiter Paris.",
      en: "We want to visit Paris.",
      bridge: "Nous voulons visit Paris.",
    },
    {
      fr: "Vous pouvez répéter, s'il vous plaît ?",
      en: "Can you repeat, please?",
      bridge: "Vous pouvez repeat, s'il vous plaît?",
    },
    {
      fr: "Ils doivent travailler samedi.",
      en: "They must work on Saturday.",
      bridge: "Ils doivent work samedi.",
    },
    {
      fr: "Je voudrais un croissant, s'il vous plaît.",
      en: "I would like a croissant, please.",
      bridge: "Je voudrais a croissant, s'il vous plaît.",
    },
    {
      fr: "On ne peut pas entrer ici.",
      en: "We can't enter here.",
      bridge: "On ne peut pas enter ici.",
    },
  ],
  fillFG: [
    {
      s: "I [___] to eat now.",
      a: "veux",
      o: ["veux", "peux", "dois", "vais"],
      ctx: "Want = vouloir → je veux.",
    },
    {
      s: "Can you [___] tonight?",
      a: "venir",
      o: ["venir", "manger", "partir", "dormir"],
      ctx: "Modal + infinitive: peux + come.",
    },
    {
      s: "She [___] leave tomorrow.",
      a: "doit",
      o: ["doit", "veut", "peut", "va"],
      ctx: "Must = devoir → elle doit.",
    },
    {
      s: "I [___] a croissant, please. (polite)",
      a: "voudrais",
      o: ["voudrais", "veux", "peux", "dois"],
      ctx: "Polite form of 'want' = voudrais.",
    },
    {
      s: "They [___] work Saturday.",
      a: "doivent",
      o: ["doivent", "veulent", "peuvent", "vont"],
      ctx: "They must = ils doivent.",
    },
  ],
  fillBlanks: [
    {
      s: "Je ___ manger maintenant.",
      a: "veux",
      o: ["veux", "peux", "dois", "vais"],
      ctx: "I want to eat now.",
    },
    {
      s: "Tu ___ venir ce soir ?",
      a: "peux",
      o: ["peux", "veux", "dois", "vas"],
      ctx: "Can you come tonight?",
    },
    {
      s: "Elle ___ partir demain.",
      a: "doit",
      o: ["doit", "veut", "peut", "va"],
      ctx: "She must leave tomorrow.",
    },
    {
      s: "Je ___ un café, s'il vous plaît.",
      a: "voudrais",
      o: ["voudrais", "veux", "peux", "dois"],
      ctx: "Polite order: I would like.",
    },
    {
      s: "Ils ___ travailler samedi.",
      a: "doivent",
      o: ["doivent", "veulent", "peuvent", "vont"],
      ctx: "They must work Saturday.",
    },
  ],
  buildSentences: [
    {
      c: ["Je", "veux", "manger", "maintenant"],
      en: "I want to eat now.",
      trap: ["peux", "dois"],
    },
    {
      c: ["Tu", "peux", "venir", "ce", "soir", "?"],
      en: "Can you come tonight?",
      trap: ["veux", "dois"],
    },
    {
      c: ["Elle", "doit", "partir", "demain"],
      en: "She must leave tomorrow.",
      trap: ["veut", "peut"],
    },
    {
      c: ["Je", "voudrais", "un", "croissant", "s'il", "vous", "plaît"],
      en: "I would like a croissant, please.",
      trap: ["veux", "peux"],
    },
  ],
  quiz: [
    {
      q: "'Vouloir' means...",
      a: "To want",
      o: ["To want", "To be able to", "To must", "To go"],
    },
    {
      q: "'Pouvoir' is related to which English word?",
      a: "Power",
      o: ["Power", "Poverty", "Pour", "Pull"],
      ctx: "Pouvoir ≈ power, potent, possible.",
    },
    {
      q: "'Devoir' is related to which English word?",
      a: "Duty",
      o: ["Duty", "Devil", "Devour", "Develop"],
      ctx: "Devoir ≈ duty, debt, debit.",
    },
    {
      q: "Which is the polite way to order?",
      a: "Je voudrais...",
      o: ["Je voudrais...", "Je veux...", "Je dois...", "Je peux..."],
      ctx: "Callback to L1: voudrais = would like.",
    },
    {
      q: "What is the modal + infinitive pattern?",
      a: "Conjugated modal + infinitive verb",
      o: [
        "Conjugated modal + infinitive verb",
        "Two conjugated verbs",
        "Infinitive + conjugated verb",
        "Modal + past participle",
      ],
    },
    {
      q: "'On ne peut pas entrer' means...",
      a: "We can't enter",
      o: [
        "We can't enter",
        "We don't want to enter",
        "We must enter",
        "We're going to enter",
      ],
    },
    {
      q: "You need to ask permission politely. You say: '_______, je pourrais avoir l'addition ?'",
      a: "Excusez-moi",
      o: ["Excusez-moi", "S'il vous plaît", "Je voudrais", "Il faut"],
      ctx: "Polite permission request at a restaurant.",
    },
    {
      q: "A friend can't decide what to order. You suggest: 'Tu n'as qu'à _______ le menu du jour.'",
      a: "prendre",
      o: ["prendre", "manger", "vouloir", "pouvoir"],
      ctx: "'Tu n'as qu'à' = you just have to. + infinitive.",
    },
  ],
  combine: [
    {
      hint: "Want to eat + can't go out → Express conflicting desire and ability",
      answer: "Je veux manger mais je ne peux pas sortir.",
      accept: [
        "je veux manger mais je ne peux pas sortir",
      ],
    },
    {
      hint: "Must work + want to sleep → Express obligation vs desire",
      answer: "Je dois travailler mais je veux dormir.",
      accept: [
        "je dois travailler mais je veux dormir",
      ],
    },
    {
      hint: "Would like coffee + can you repeat → Order politely and ask for help",
      answer:
        "Je voudrais un café. Pouvez-vous répéter, s'il vous plaît ?",
      accept: [
        "je voudrais un cafe pouvez-vous repeter s'il vous plait",
        "je voudrais un café. pouvez-vous répéter, s'il vous plaît ?",
      ],
    },
  ],
  weave: [
    {
      en: "I want to eat but I must work. Can you come tonight?",
      known: [
        "je",
        "veux",
        "manger",
        "mais",
        "dois",
        "travailler",
        "tu",
        "peux",
        "venir",
        "ce",
        "soir",
      ],
      sample:
        "Je veux manger mais je dois travailler. Tu peux venir ce soir?",
    },
    {
      en: "She wants to visit Paris. We must leave tomorrow. They can't come.",
      known: [
        "elle",
        "veut",
        "visiter",
        "Paris",
        "nous",
        "devons",
        "partir",
        "demain",
        "ils",
        "ne",
        "peuvent",
        "pas",
      ],
      sample:
        "Elle veut visiter Paris. Nous devons partir demain. Ils ne peuvent pas come.",
    },
    {
      en: "I would like a croissant please. We can't enter here. You must work Saturday.",
      known: [
        "je",
        "voudrais",
        "un",
        "croissant",
        "s'il",
        "vous",
        "plaît",
        "on",
        "ne",
        "peut",
        "pas",
        "entrer",
        "ici",
        "tu",
        "dois",
        "travailler",
        "samedi",
      ],
      sample:
        "Je voudrais un croissant, s'il vous plaît. On ne peut pas entrer ici. Tu dois travailler samedi.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Je veux partir mais je dois rester. Je ne peux pas sortir.",
      q: "What's the person's situation?",
      a: "Wants to leave but must stay, can't go out",
      o: [
        "Wants to leave but must stay, can't go out",
        "Wants to stay and can go out",
        "Must leave and can leave",
        "Doesn't want to do anything",
      ],
    },
    {
      type: "odd",
      q: "Which is NOT a modal verb?",
      items: ["vouloir", "pouvoir", "devoir", "manger"],
      a: "manger",
      reason:
        "Manger (to eat) is a regular verb. The others are modals (want, can, must).",
    },
    {
      type: "context",
      situation: "You're at a bakery. Order politely.",
      a: "Je voudrais une baguette, s'il vous plaît.",
      o: [
        "Je voudrais une baguette, s'il vous plaît.",
        "Je veux une baguette.",
        "Je dois une baguette.",
        "Je peux une baguette.",
      ],
    },
    {
      type: "fill_ctx",
      s: "La pharmacie est ___ la banque. (Lesson 15)",
      a: "à côté de",
      o: ["à côté de", "dans", "sur", "sous"],
      ctx: "Next to the bank. Cross-reference L15.",
    },
    {
      type: "fill_ctx",
      s: "Je ___ manger maintenant.",
      a: "veux",
      o: ["veux", "peux", "dois", "vais"],
      ctx: "I want to eat now.",
    },
    {
      type: "weave",
      en: "She must work tomorrow.",
      blanks: [
        { word: "must", answer: "doit" },
        { word: "work", answer: "travailler" },
      ],
      full: "Elle doit travailler demain.",
    },
    {
      type: "context",
      situation:
        "A friend asks if you can come to dinner. You can't — you must work.",
      a: "Je ne peux pas, je dois travailler.",
      o: [
        "Je ne peux pas, je dois travailler.",
        "Je ne veux pas manger.",
        "Je vais travailler.",
        "Je voudrais manger.",
      ],
    },
  ],
  sayIt: [
    {
      situation:
        "Tell a friend what you want to do this weekend, what you must do, and what you can't do.",
      target: ["veux", "dois", "peux", "pas", "manger", "travailler"],
    },
    {
      situation:
        "You're at a restaurant. Order politely, ask if they can bring water, and say you must leave at nine.",
      target: [
        "voudrais",
        "pouvez",
        "vous",
        "dois",
        "partir",
        "s'il vous plaît",
      ],
    },
  ],
  miniConv: {
    topic: "Making plans and expressing what you want, can, and must do",
    starter:
      "Salut ! Qu'est-ce que tu veux faire ce weekend ? Tu peux venir samedi ?",
  },
  expressions: [
    {
      fr: "Je n'en peux plus",
      en: "I can't take it anymore",
      usage: "'Cette chaleur ! Je n'en peux plus !'",
      literal: "I of-it can no more",
    },
    {
      fr: "Si tu veux",
      en: "If you want / Sure, why not",
      usage: "'On va au cinéma ?' — 'Si tu veux.'",
      literal: "If you want",
    },
    {
      fr: "On doit y aller",
      en: "We have to go / We should get going",
      usage: "'Il est tard, on doit y aller.'",
      literal: "One must there go",
    },
  ],
  grammarNuggets: [
    {
      title: "Modal + infinitive is the most productive pattern in French",
      insight:
        "Learn three verbs (vouloir, pouvoir, devoir) and you can express desire, ability, and obligation with ANY verb in the language. 'Je veux + [any infinitive]' = I want to [anything]. 'Je peux + [any infinitive]' = I can [anything]. Three keys unlock thousands of sentences.",
      example:
        "veux manger, peux partir, dois travailler, veux dormir, peux venir...",
    },
    {
      title: "Je voudrais is not a different verb — it's a conditional mood",
      insight:
        "You learned 'je voudrais' in L1 as a magic phrase. Now you know it's the conditional form of 'vouloir.' 'Je veux' = I want (present). 'Je voudrais' = I would want (conditional = polite). English does the same: 'I want' → 'I would like.' Same verb, different mood.",
      example:
        "Je veux (blunt) → Je voudrais (polite) — same as 'I want' → 'I'd like'",
    },
  ],
  fauxAmis: [
    {
      fr: "devoir",
      looksLike: "devour",
      actualMeaning: "must / to have to / duty (also: homework!)",
      example:
        "Je dois faire mes devoirs. (I must do my homework.) — devoirs = duties/homework",
    },
  ],
  cultureBite:
    "In France, 'je voudrais' isn't just polite — it's expected. Saying 'je veux un café' to a waiter is like saying 'Give me a coffee' in English. It works, but people notice. The conditional form (voudrais, pourriez-vous, j'aimerais) is the social default, not the polite exception.",
  summary: [
    "Vouloir: je veux, tu veux, il veut, nous voulons, vous voulez, ils veulent",
    "Pouvoir: je peux, tu peux, il peut, nous pouvons, vous pouvez, ils peuvent",
    "Devoir: je dois, tu dois, il doit, nous devons, vous devez, ils doivent",
    "Modal + infinitive: je veux manger, je peux partir, je dois travailler",
    "Je voudrais = polite 'I would like' (conditional of vouloir)",
  ],
};
