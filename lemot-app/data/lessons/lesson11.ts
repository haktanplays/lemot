import type { Lesson } from "@/lib/types";

export const lesson11: Lesson = {
  id: 11,
  title: "Everyday Structures",
  sub: "The glue that holds sentences together",
  icon: "Sparkles",
  level: "A1",
  difficulty: "easy",
  grammar: {
    title: "Everyday Structures",
    sections: [
      {
        type: "intro",
        text: "You know words. You know verbs. Now you need the *glue* — the small structures that connect ideas into real sentences. *Il y a, il faut, c'est, mais, parce que, donc* — these turn word lists into actual French.",
      },
      {
        type: "block",
        label: "Il y a — There is/are (review + deepen)",
        items: [
          {
            fr: "Il y a un restaurant ici.",
            en: "There's a restaurant here.",
            note: "Il y a = there is/there are. Works for both singular and plural!",
          },
          {
            fr: "Il n'y a pas de pain.",
            en: "There's no bread.",
            note: "Negative: il n'y a pas de... Remember: pas de (not pas du).",
          },
          {
            fr: "Il y a beaucoup de monde.",
            en: "There are a lot of people.",
            note: "Il y a + beaucoup de = there are a lot of.",
          },
        ],
      },
      {
        type: "block",
        label: "Il faut + infinitive — One must",
        items: [
          {
            fr: "Il faut partir.",
            en: "We must leave. / One must leave.",
            note: "Impersonal — 'il' is structural, like 'it' in 'it's raining.' Doesn't specify who.",
          },
          {
            fr: "Il faut manger.",
            en: "We need to eat.",
            note: "Il faut + any infinitive = must/need to do that thing.",
          },
          {
            fr: "Il ne faut pas faire ça.",
            en: "One must not do that.",
            note: "Negative: il ne faut pas = must not.",
          },
        ],
      },
      {
        type: "block",
        label: "C'est vs Il est",
        items: [
          {
            fr: "C'est bon.",
            en: "It's good. / That's good.",
            note: "C'est + adjective = general statement. Use for opinions and reactions.",
          },
          {
            fr: "C'est un restaurant.",
            en: "It's a restaurant.",
            note: "C'est + article + noun. Use when identifying something.",
          },
          {
            fr: "Il est grand.",
            en: "He is tall.",
            note: "Il est + adjective = describing a specific person/thing.",
          },
          {
            fr: "Il est midi.",
            en: "It's noon.",
            note: "Il est + time. Always il est for telling time.",
          },
        ],
      },
      {
        type: "tip",
        text: "Rule of thumb: *C'est* for opinions and identifying things ('C'est bon, c'est un café'). *Il est* for describing specific people and telling time ('Il est grand, il est trois heures').",
      },
      {
        type: "block",
        label: "Conjunctions: Connecting Ideas",
        items: [
          {
            fr: "mais",
            en: "but",
            note: "J'aime le café, mais je préfère le thé. Same function as English 'but.'",
          },
          {
            fr: "parce que",
            en: "because",
            note: "Pourquoi ? Parce que j'aime la France ! = For what? By that which...",
          },
          {
            fr: "donc",
            en: "so / therefore",
            note: "Il fait beau, donc on va au parc. Cognate of archaic English 'thence.'",
          },
          {
            fr: "et",
            en: "and",
            note: "Du pain et du fromage. You already know this one!",
          },
          {
            fr: "ou",
            en: "or",
            note: "Café ou thé ? Note: ou (or) vs où (where) — accent matters!",
          },
        ],
      },
      {
        type: "block",
        label: "Adverbs: Adding Color",
        items: [
          {
            fr: "très",
            en: "very",
            note: "C'est très bon. Très ≈ 'tres' in Spanish — same Latin root.",
          },
          {
            fr: "beaucoup",
            en: "a lot / very much",
            note: "J'aime beaucoup le fromage. Beaucoup = beau (beautiful) + coup (hit).",
          },
          {
            fr: "aussi",
            en: "also / too",
            note: "Moi aussi = me too. Also ≈ aussi — cognate!",
          },
          {
            fr: "toujours",
            en: "always",
            note: "Il fait toujours beau. Tous (all) + jours (days) = 'all days.'",
          },
          {
            fr: "souvent",
            en: "often",
            note: "Je fais souvent du sport. From Latin 'subinde' (frequently).",
          },
        ],
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "parce que",
            phonetic: "pars-kuh",
            ipa: "/paʁs.kə/",
            notes:
              "Blends into two syllables naturally. The 'e' at the end is a quiet schwa.",
          },
          {
            fr: "beaucoup",
            phonetic: "boh-KOO",
            ipa: "/bo.ku/",
            notes:
              "Two clean syllables. The 'eau' is 'oh', the 'ou' is 'oo'. Never say the 'p'.",
          },
          {
            fr: "toujours",
            phonetic: "too-ZHOOR",
            ipa: "/tu.ʒuʁ/",
            notes:
              "The 'j' is 'zh' like 'pleasure'. The 's' is silent.",
          },
        ],
      },
    ],
    quickRecall: {
      q: "What's the difference between 'c'est' and 'il est'?",
      a: "C'est = opinions/identifying; Il est = describing/time",
      o: [
        "C'est = opinions/identifying; Il est = describing/time",
        "They're the same",
        "C'est is formal; Il est is casual",
        "C'est is past; Il est is present",
      ],
    },
  },
  examples: [
    {
      fr: "Il y a un bon restaurant, mais c'est cher.",
      en: "There's a good restaurant, but it's expensive.",
      bridge: "Il y a a good restaurant, mais c'est expensive.",
    },
    {
      fr: "Il faut partir parce qu'il est tard.",
      en: "We must leave because it's late.",
      bridge: "Il faut leave parce qu'il est late.",
    },
    {
      fr: "C'est très bon !",
      en: "It's very good!",
      bridge: "C'est très good!",
    },
    {
      fr: "J'aime beaucoup le fromage, et aussi le pain.",
      en: "I really like cheese, and also bread.",
      bridge: "J'aime beaucoup le cheese, et aussi le bread.",
    },
    {
      fr: "Il fait froid, donc je reste à la maison.",
      en: "It's cold, so I'm staying home.",
      bridge: "Il fait cold, donc je stay à la maison.",
    },
    {
      fr: "Je fais toujours du sport le matin.",
      en: "I always exercise in the morning.",
      bridge: "Je fais toujours du sport le morning.",
    },
    {
      fr: "C'est un café ou un restaurant ?",
      en: "Is it a café or a restaurant?",
      bridge: "C'est un café ou un restaurant?",
    },
    {
      fr: "Il est souvent en retard.",
      en: "He's often late.",
      bridge: "Il est souvent en late.",
    },
  ],
  fillFG: [
    {
      s: "There [___] a good restaurant here.",
      a: "y a",
      o: ["y a", "faut", "est", "fait"],
      ctx: "Il y a = there is/are.",
    },
    {
      s: "We [___] leave now.",
      a: "faut",
      o: ["faut", "y a", "est", "va"],
      ctx: "Il faut = one must.",
    },
    {
      s: "I like cheese [___] I prefer bread.",
      a: "mais",
      o: ["mais", "et", "ou", "donc"],
      ctx: "Mais = but.",
    },
    {
      s: "It's cold, [___] I stay home.",
      a: "donc",
      o: ["donc", "mais", "ou", "parce que"],
      ctx: "Donc = so/therefore.",
    },
    {
      s: "I [___] like cheese.",
      a: "beaucoup",
      o: ["beaucoup", "très", "aussi", "toujours"],
      ctx: "J'aime beaucoup = I really like / I like a lot.",
    },
  ],
  fillBlanks: [
    {
      s: "Il ___ un bon restaurant ici.",
      a: "y a",
      o: ["y a", "faut", "est", "fait"],
      ctx: "There is a good restaurant here.",
    },
    {
      s: "Il ___ partir maintenant.",
      a: "faut",
      o: ["faut", "y a", "est", "fait"],
      ctx: "We must leave now.",
    },
    {
      s: "C'est bon ___ c'est cher.",
      a: "mais",
      o: ["mais", "et", "ou", "donc"],
      ctx: "It's good but it's expensive.",
    },
    {
      s: "J'aime le café ___ qu'il est bon.",
      a: "parce",
      o: ["parce", "mais", "donc", "ou"],
      ctx: "I like coffee because it's good.",
    },
    {
      s: "Je fais ___ du sport.",
      a: "souvent",
      o: ["souvent", "mais", "donc", "ou"],
      ctx: "I often exercise.",
    },
  ],
  buildSentences: [
    {
      c: ["Il", "y", "a", "un", "restaurant", "ici"],
      en: "There is a restaurant here.",
      trap: ["est", "faut"],
    },
    {
      c: ["Il", "faut", "partir", "maintenant"],
      en: "We must leave now.",
      trap: ["y a", "est"],
    },
    {
      c: ["C'est", "très", "bon", "mais", "c'est", "cher"],
      en: "It's very good but it's expensive.",
      trap: ["il est", "donc"],
    },
    {
      c: ["Il", "fait", "froid", "donc", "je", "reste"],
      en: "It's cold so I stay.",
      trap: ["mais", "est"],
    },
  ],
  quiz: [
    {
      q: "What does 'il faut' mean?",
      a: "One must / We need to",
      o: ["One must / We need to", "There is", "It's time", "He does"],
      ctx: "Il faut + infinitive = must.",
    },
    {
      q: "When do you use 'c'est' instead of 'il est'?",
      a: "For opinions and identifying things",
      o: [
        "For opinions and identifying things",
        "For time",
        "For describing people",
        "For formal speech",
      ],
    },
    {
      q: "'Donc' means...",
      a: "So / Therefore",
      o: ["So / Therefore", "But", "Because", "Or"],
    },
    {
      q: "'Toujours' literally means...",
      a: "All days (always)",
      o: ["All days (always)", "Sometimes", "Never", "Today"],
      ctx: "Tous (all) + jours (days).",
    },
    {
      q: "Which is correct: 'C'est bon' or 'Il est bon'?",
      a: "Both, but c'est for general opinion, il est for specific",
      o: [
        "Both, but c'est for general opinion, il est for specific",
        "Only c'est bon",
        "Only il est bon",
        "They're identical",
      ],
    },
    {
      q: "'Il n'y a pas de pain' means...",
      a: "There's no bread",
      o: ["There's no bread", "He doesn't have bread", "Bread is expensive", "I want bread"],
    },
    {
      q: "Your friend says the restaurant is good but expensive. Fill in: 'C'est bon _______ c'est cher.'",
      a: "mais",
      o: ["mais", "donc", "parce que", "et"],
      ctx: "The conjunction meaning 'but'.",
    },
    {
      q: "You love cheese and want to emphasize it. You say: 'J'aime _______ le fromage.'",
      a: "beaucoup",
      o: ["beaucoup", "très", "aussi", "souvent"],
      ctx: "Beaucoup = a lot / very much.",
    },
  ],
  combine: [
    {
      hint: "Good restaurant + but expensive → Describe a restaurant with contrasting qualities",
      answer: "Il y a un bon restaurant mais c'est cher.",
      accept: [
        "il y a un bon restaurant mais c'est cher",
        "il y a un bon restaurant, mais c'est cher",
      ],
    },
    {
      hint: "Must leave + because late → Explain urgency",
      answer: "Il faut partir parce qu'il est tard.",
      accept: [
        "il faut partir parce qu'il est tard",
        "il faut partir parce qu il est tard",
      ],
    },
    {
      hint: "Cold + so + stay home → React to weather",
      answer: "Il fait froid, donc je reste à la maison.",
      accept: [
        "il fait froid donc je reste a la maison",
        "il fait froid, donc je reste à la maison",
      ],
    },
  ],
  weave: [
    {
      en: "There's a good restaurant here but it's very expensive. I always go there.",
      known: [
        "il y a",
        "un",
        "bon",
        "restaurant",
        "ici",
        "mais",
        "c'est",
        "très",
        "cher",
        "je",
        "vais",
        "toujours",
      ],
      sample:
        "Il y a un bon restaurant ici mais c'est très cher. Je vais toujours there.",
    },
    {
      en: "We must eat because I'm very hungry. It's cold, so let's stay here.",
      known: [
        "il faut",
        "manger",
        "parce que",
        "j'ai",
        "très",
        "faim",
        "il fait",
        "froid",
        "donc",
        "on",
        "reste",
        "ici",
      ],
      sample:
        "Il faut manger parce que j'ai très faim. Il fait froid, donc on reste ici.",
    },
    {
      en: "It's a café or a restaurant? I also like cheese and bread.",
      known: [
        "c'est",
        "un",
        "café",
        "ou",
        "restaurant",
        "j'aime",
        "aussi",
        "le",
        "fromage",
        "et",
        "pain",
      ],
      sample:
        "C'est un café ou un restaurant? J'aime aussi le fromage et le pain.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Il faut partir parce qu'il est tard.",
      q: "What does this mean?",
      a: "We must leave because it's late",
      o: [
        "We must leave because it's late",
        "There's a restaurant here",
        "I prefer tea",
        "It depends",
      ],
    },
    {
      type: "odd",
      q: "Which is NOT a conjunction?",
      items: ["mais", "donc", "parce que", "très"],
      a: "très",
      reason: "Très is an adverb (very). The others are conjunctions.",
    },
    {
      type: "context",
      situation: "It's raining and your friend suggests going to the park. You suggest staying home instead.",
      a: "Il fait mauvais, donc on reste à la maison.",
      o: [
        "Il fait mauvais, donc on reste à la maison.",
        "Il y a un parc ici.",
        "C'est très bon.",
        "Il faut manger.",
      ],
    },
    {
      type: "fill_ctx",
      s: "C'est ___ bon !",
      a: "très",
      o: ["très", "mais", "aussi", "donc"],
      ctx: "It's very good!",
    },
  ],
  sayIt: [
    {
      situation:
        "Describe a restaurant you like using but, because, and always. Say it's good but expensive, you go there because the food is very good.",
      target: [
        "mais",
        "parce que",
        "toujours",
        "très",
        "bon",
        "cher",
      ],
    },
    {
      situation:
        "It's cold outside. Tell a friend we must stay home and suggest cooking together.",
      target: ["froid", "donc", "faut", "reste", "maison", "cuisine"],
    },
  ],
  miniConv: {
    topic:
      "Making plans and explaining reasons using everyday structures",
    starter: "Salut ! Il fait beau. On va au parc ou on reste ici ?",
  },
  expressions: [
    {
      fr: "Du coup",
      en: "So / Therefore / As a result",
      usage: "'Le restaurant est fermé, du coup on mange chez moi.' (Restaurant's closed, so we eat at my place.)",
      literal: "Of the hit",
    },
    {
      fr: "En tout cas",
      en: "In any case / Anyway",
      usage: "'En tout cas, merci !' (Anyway, thanks!)",
      literal: "In all case",
    },
    {
      fr: "Bref",
      en: "In short / Anyway / Long story short",
      usage: "'Bref, je suis en retard.' (Long story short, I'm late.)",
      literal: "Brief",
    },
  ],
  grammarNuggets: [
    {
      title: "'Il' in 'il y a' and 'il faut' is not 'he' — it's a placeholder",
      insight:
        "French requires a subject for every verb, even when there's no real actor. English does this too: 'It rains' — what rains? In both languages, 'it/il' is a grammatical placeholder. Once you see this, 'il y a' and 'il faut' stop feeling like sentences about 'him.'",
      example: "Il pleut (it rains) — 'il' = nobody, just grammar",
    },
    {
      title: "C'est vs Il est is about 'what' vs 'who'",
      insight:
        "C'est answers 'WHAT is it?' — identifying or reacting: 'C'est bon, c'est un restaurant.' Il est answers 'WHO/HOW is he?' — describing: 'Il est grand, il est content.' Time is always il est because you're reading the clock, not reacting to it.",
      example: "C'est bon (reaction) vs Il est grand (description)",
    },
  ],
  fauxAmis: [
    {
      fr: "aussi",
      looksLike: "also (correct!)",
      actualMeaning: "also / too — but ALSO means 'as' in comparisons",
      example: "Elle est aussi grande que moi. (She is as tall as me.) — 'aussi...que' = as...as",
    },
  ],
  cultureBite:
    "'Du coup' is the most-used filler in modern French. Young French speakers say it every other sentence, like English speakers say 'so' or 'basically.' Some language purists hate it, which makes it even more popular.",
  summary: [
    "Il y a = there is/are; Il faut = one must",
    "C'est for opinions/identifying; Il est for describing/time",
    "Conjunctions: mais, parce que, donc, et, ou",
    "Adverbs: très, beaucoup, aussi, toujours, souvent",
  ],
};
