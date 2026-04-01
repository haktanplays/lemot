import type { Lesson } from "@/lib/types";

export const lesson3: Lesson = {
  id: 3,
  title: "Yes, No & You",
  sub: "Accept, refuse, address",
  icon: "ToggleLeft",
  level: "A1",
  difficulty: "medium",
  grammar: {
    title: "Negation & Formality",
    sections: [
      {
        type: "intro",
        text: "Two essential skills: saying *no* and choosing how to say *you*. French negation wraps around the verb like a sandwich (*ne...pas*), and the tu/vous choice is a social decision you make every time you speak.",
      },
      {
        type: "block",
        label: "The Negation Sandwich: Ne...Pas",
        items: [
          {
            fr: "ne...pas",
            en: "not",
            note: "Je NE mange PAS. The verb is sandwiched between ne and pas. This is THE core negation pattern.",
          },
          {
            fr: "ne...jamais",
            en: "never",
            note: "Je NE mange JAMAIS de viande. Same sandwich, different filling.",
          },
          {
            fr: "ne...plus",
            en: "no more / no longer",
            note: "Je NE mange PLUS. = I don't eat anymore.",
          },
          {
            fr: "ne...rien",
            en: "nothing",
            note: "Je NE mange RIEN. = I eat nothing.",
          },
        ],
      },
      {
        type: "tip",
        text: "In spoken French, the *ne* often disappears! 'Je mange pas' instead of 'Je ne mange pas'. This is normal everyday French — 95% of speakers drop the *ne*. But always write it in formal contexts.",
      },
      {
        type: "block",
        label: "Oui, Non & Si",
        items: [
          {
            fr: "Oui",
            en: "Yes",
            note: "Standard yes. 'Tu es français ?' — 'Oui.'",
          },
          {
            fr: "Non",
            en: "No",
            note: "Standard no. 'Tu veux du café ?' — 'Non, merci.'",
          },
          {
            fr: "Si",
            en: "Yes (contradicting a negative)",
            note: "'Tu n'es pas français ?' — 'SI !' (Yes I AM!) English doesn't have this — French does. Si = yes-to-a-negative.",
          },
        ],
      },
      {
        type: "block",
        label: "Tu — The Informal You",
        items: [
          {
            fr: "Tu",
            en: "You (one person, informal)",
            note: "Used with: friends, family, children, pets, people your age in casual settings. If someone says 'tu' to you, you can say 'tu' back.",
          },
          {
            fr: "Tu es français ?",
            en: "Are you French?",
            note: "Intonation question: just raise your voice at the end. No word order change needed. Tu es français? ↗",
          },
          {
            fr: "Toi",
            en: "You (emphatic/after preposition)",
            note: "'Et toi ?' (And you?), 'Avec toi' (With you).",
          },
        ],
      },
      {
        type: "block",
        label: "Vous — The Formal You",
        items: [
          {
            fr: "Vous",
            en: "You (formal singular OR any plural)",
            note: "Used with: strangers, older people, your boss, shopkeepers. Also used for ANY group of people, even friends.",
          },
          {
            fr: "On se tutoie ?",
            en: "Shall we use tu?",
            note: "When someone suggests switching from 'vous' to 'tu', it's a social milestone — like going from last-name to first-name basis.",
          },
        ],
      },
      {
        type: "block",
        label: "Pronunciation: The French U Sound (/y/)",
        items: [
          {
            fr: "tu /ty/ vs tout /tu/",
            en: "Two completely different words",
            note: "Say 'ee' (as in 'see') but round your lips as if saying 'oo'. Keep tongue in 'ee' position, shape lips for 'oo'. 'Tu' (you) vs 'tout' (all/everything) — getting this wrong changes the meaning.",
          },
          {
            fr: "rue /ʁy/",
            en: "street — uses the French U",
            note: "Practice: 'tu', 'rue', 'du', 'vu' — all use /y/. 'Tout', 'roue', 'doux', 'vous' — all use /u/.",
          },
        ],
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "Tu es",
            phonetic: "tü EH",
            ipa: "/ty ɛ/",
            notes:
              "The 'u' in 'tu' is the French u sound — not 'too'. Lips rounded, tongue forward.",
          },
          {
            fr: "Vous êtes",
            phonetic: "vooz EHT",
            ipa: "/vuz ɛt/",
            notes:
              "Liaison: the 's' of vous connects to êtes.",
          },
        ],
      },
      {
        type: "culture",
        text: "The tu/vous distinction reflects France's social awareness. Even teenagers use 'vous' with their friends' parents. When in doubt, use *vous* — nobody is offended by excessive politeness. Being too formal is awkward; being too informal is rude.",
      },
      {
        type: "tip",
        text: "Intonation questions are the easiest way to ask something in French: just raise your voice at the end. *Tu es français?* ↗ No grammar change needed — just melody.",
      },
    ],
    quickRecall: {
      q: "How do you say 'yes' to a negative question in French?",
      a: "Si",
      o: ["Oui", "Si", "Non", "Bien sûr"],
    },
  },
  examples: [
    {
      fr: "Je ne comprends pas. Pouvez-vous répéter ?",
      en: "I don't understand. Can you repeat?",
      bridge: "Je ne comprends pas. Can you répéter?",
    },
    {
      fr: "Tu n'es pas français ? — Si, je suis français !",
      en: "You're not French? — Yes I am, I'm French!",
      bridge: "Tu n'es pas French? — Si, je suis French!",
    },
    {
      fr: "Non, merci. Je ne veux plus de café.",
      en: "No thanks. I don't want any more coffee.",
      bridge: "Non, merci. Je ne veux plus de café.",
    },
    {
      fr: "Tu es français ? — Oui, et toi ?",
      en: "Are you French? — Yes, and you?",
      bridge: "Tu es French? — Oui, et toi?",
    },
    {
      fr: "Vous êtes américain, monsieur ?",
      en: "Are you American, sir?",
      bridge: "Vous êtes American, monsieur?",
    },
    {
      fr: "On se tutoie ? — Oui, bien sûr !",
      en: "Shall we use tu? — Yes, of course!",
      bridge: "On se tutoie? — Oui, of course!",
    },
    {
      fr: "Je ne mange jamais de viande.",
      en: "I never eat meat.",
      bridge: "Je ne mange never de viande.",
    },
    {
      fr: "Elle ne mange rien. Il n'y a plus de pain.",
      en: "She eats nothing. There's no more bread.",
      bridge: "Elle ne mange nothing. There's no more de pain.",
    },
  ],
  fillFG: [
    {
      s: "I [___] understand.",
      a: "ne comprends pas",
      o: ["ne comprends pas", "comprends", "suis pas", "ne suis pas"],
      ctx: "Someone spoke too fast. Use ne...pas.",
    },
    {
      s: "[___] are French? (asking a friend)",
      a: "Tu es",
      o: ["Tu es", "Vous êtes", "Il est", "Je suis"],
      ctx: "Casual conversation with someone your age.",
    },
    {
      s: "[___] American, sir? (asking formally)",
      a: "Vous êtes",
      o: ["Vous êtes", "Tu es", "Il est", "Nous sommes"],
      ctx: "A hotel receptionist asking a guest.",
    },
    {
      s: "You're not French? — [___], I am!",
      a: "Si",
      o: ["Si", "Oui", "Non", "Bien"],
      ctx: "Contradicting a negative question.",
    },
    {
      s: "I [___] eat meat.",
      a: "ne mange jamais de",
      o: ["ne mange jamais de", "ne mange pas", "mange jamais", "ne mange rien"],
      ctx: "Never eat — ne...jamais.",
    },
  ],
  fillBlanks: [
    {
      s: "Je ___ comprends ___ .",
      a: "ne...pas",
      o: ["ne...pas", "ne...plus", "ne...rien", "ne...jamais"],
      ctx: "I don't understand. Basic negation.",
    },
    {
      s: "___ es français ?",
      a: "Tu",
      o: ["Tu", "Vous", "Il", "Je"],
      ctx: "At a party, talking to someone your age.",
    },
    {
      s: "___ êtes américain ?",
      a: "Vous",
      o: ["Vous", "Tu", "Ils", "Nous"],
      ctx: "A formal first meeting with a business contact.",
    },
    {
      s: "Tu n'es pas fatigué ? — ___, je suis très fatigué !",
      a: "Si",
      o: ["Si", "Oui", "Non", "Pas"],
      ctx: "Someone says you're not tired, but you ARE.",
    },
    {
      s: "Je ne mange ___ de viande.",
      a: "jamais",
      o: ["jamais", "pas", "rien", "plus"],
      ctx: "I never eat meat.",
    },
  ],
  buildSentences: [
    {
      c: ["Je", "ne", "comprends", "pas"],
      en: "I don't understand",
      trap: ["suis", "jamais"],
    },
    {
      c: ["Tu", "es", "français"],
      en: "You are French (informal)",
      trap: ["Vous", "êtes"],
    },
    {
      c: ["Vous", "êtes", "américain"],
      en: "You are American (formal)",
      trap: ["Tu", "es"],
    },
    {
      c: ["Je", "ne", "mange", "jamais", "de", "viande"],
      en: "I never eat meat",
      trap: ["pas", "rien"],
    },
  ],
  quiz: [
    {
      q: "How does French negation work?",
      a: "Ne...pas wraps around the verb like a sandwich",
      o: [
        "Put 'pas' before the verb",
        "Ne...pas wraps around the verb like a sandwich",
        "Add 'non' at the start",
        "Change the verb form",
      ],
    },
    {
      q: "Someone asks 'Tu n'aimes pas le fromage ?' — but you DO like cheese. You reply:",
      a: "Si !",
      o: ["Oui", "Si !", "Non", "Pas du tout"],
      ctx: "Si contradicts a negative question.",
    },
    {
      q: "You meet your friend's mother for the first time. You say...",
      a: "Vous",
      o: ["Tu", "Vous", "On", "Toi"],
      ctx: "Dinner at a friend's house.",
    },
    {
      q: "In spoken French, which part of negation is often dropped?",
      a: "ne",
      o: ["ne", "pas", "jamais", "rien"],
      ctx: "'Je mange pas' instead of 'Je ne mange pas'.",
    },
    {
      q: "When in doubt between tu and vous, always use...",
      a: "Vous",
      o: ["Tu", "Vous", "Either is fine", "On"],
    },
    {
      q: "'Ne...jamais' means...",
      a: "Never",
      o: ["Never", "Nothing", "No more", "Not"],
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
    {
      q: "'On se tutoie ?' — who typically suggests this?",
      a: "The older or higher-ranking person",
      o: [
        "The younger person",
        "The older or higher-ranking person",
        "Anyone can",
        "Only women",
      ],
    },
  ],
  combine: [
    {
      hint: "I + don't + understand + can you repeat → When you're stuck",
      answer: "Je ne comprends pas. Pouvez-vous répéter ?",
      accept: [
        "je ne comprends pas pouvez-vous répéter",
        "je ne comprends pas. pouvez-vous répéter",
        "je ne comprends pas pouvez vous repeter",
      ],
    },
    {
      hint: "You (informal) + are + French → Ask a friend",
      answer: "Tu es français",
      accept: ["tu es français", "tu es francais"],
    },
    {
      hint: "I + never + eat + meat → State a dietary restriction",
      answer: "Je ne mange jamais de viande",
      accept: [
        "je ne mange jamais de viande",
        "je mange jamais de viande",
      ],
    },
  ],
  weave: [
    {
      en: "I don't understand. Are you French? No, I'm American.",
      known: [
        "je",
        "ne",
        "comprends",
        "pas",
        "tu",
        "es",
        "français",
        "non",
        "suis",
        "américain",
      ],
      sample:
        "Je ne comprends pas. Tu es français? Non, je suis américain.",
    },
    {
      en: "You're not tired? Yes I am! I never sleep well.",
      known: [
        "tu",
        "n'es",
        "pas",
        "fatigué",
        "si",
        "je",
        "suis",
        "ne",
        "dors",
        "jamais",
        "bien",
      ],
      sample:
        "Tu n'es pas fatigué? Si, je suis very fatigué! Je ne dors jamais bien.",
    },
    {
      en: "Excuse me, can you repeat please? I don't understand.",
      known: [
        "excusez-moi",
        "vous",
        "pouvez",
        "répéter",
        "s'il vous plaît",
        "je",
        "ne",
        "comprends",
        "pas",
      ],
      sample:
        "Excusez-moi, vous pouvez répéter s'il vous plaît? Je ne comprends pas.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Je ne mange jamais de viande.",
      q: "What does the speaker never eat?",
      a: "Meat",
      o: ["Cheese", "Meat", "Bread", "Fish"],
    },
    {
      type: "odd",
      q: "Which does NOT belong with negation words?",
      items: ["jamais", "rien", "personne", "toujours"],
      a: "toujours",
      reason:
        "Toujours means 'always' — it's the opposite of negation!",
    },
    {
      type: "context",
      situation: "First day at a new job. You meet your boss.",
      a: "Bonjour, vous",
      o: ["Salut, tu", "Bonjour, vous", "Hey, tu", "Coucou"],
    },
    {
      type: "fill_ctx",
      s: "Tu n'aimes pas ça ? — ___, j'adore !",
      a: "Si",
      o: ["Si", "Oui", "Non", "Pas"],
      ctx: "Contradict the negative: yes I DO like it!",
    },
  ],
  sayIt: [
    {
      situation:
        "You're at a restaurant. Explain you never eat meat and you don't want more bread.",
      target: ["ne", "mange", "jamais", "viande", "plus", "pain"],
    },
    {
      situation:
        "Meet your friend's mother formally, then your friend suggests switching to tu.",
      target: ["bonjour", "vous", "madame", "on se tutoie", "tu"],
    },
  ],
  miniConv: {
    topic: "Saying no, using si, and navigating tu vs vous",
    starter:
      "Bonjour ! Vous êtes nouveau ici ? Vous n'êtes pas français ?",
  },
  expressions: [
    {
      fr: "Pas du tout",
      en: "Not at all",
      usage: "'Tu es fatigué ?' — 'Pas du tout !' (Not at all!)",
      literal: "Not of all",
    },
    {
      fr: "Pas encore",
      en: "Not yet",
      usage: "'Tu as mangé ?' — 'Pas encore.' (Not yet.)",
      literal: "Not still",
    },
    {
      fr: "On se tutoie ?",
      en: "Shall we use tu?",
      usage: "After chatting for a while: 'On se tutoie ? C'est plus simple.'",
      literal: "We tu each other?",
    },
  ],
  grammarNuggets: [
    {
      title: "Dropping 'ne' is normal speech, not laziness",
      insight:
        "Written: 'Je ne sais pas.' Spoken: 'Je sais pas' or 'Chais pas.' Dropping 'ne' is not slang — it's how 95% of French speakers actually talk. 'Ne' is becoming like English 'whom' — technically correct, practically extinct in casual speech.",
      example: "Written: Je ne sais pas → Spoken: J'sais pas / Chais pas",
    },
    {
      title: "Tu/vous changes the VERB, not just the pronoun",
      insight:
        "In English, 'you' stays the same whether talking to a friend or the Queen. In French, EVERY verb has different tu and vous forms. The choice ripples through the entire sentence.",
      example:
        "Tu es / Vous êtes, Tu viens / Vous venez, Tu fais / Vous faites",
    },
  ],
  fauxAmis: [
    {
      fr: "tu",
      looksLike: "two",
      actualMeaning: "you (informal singular)",
      example: "Tu es mon ami. (You are my friend.)",
    },
  ],
  cultureBite:
    "French has a special word — 'si' — that means 'yes, actually' when contradicting a negative. 'You don't like cheese?' — 'SI!' (I do!). English has no equivalent; you'd say 'yes I do' or 'actually, I do.' French packs all that into one syllable.",
  summary: [
    "Ne...pas sandwich: Je NE comprends PAS",
    "Ne...jamais (never), ne...plus (no more), ne...rien (nothing)",
    "Si = yes to a negative question",
    "Tu (informal) vs Vous (formal + plural)",
    "French U sound: tu /ty/ vs tout /tu/",
  ],
};
