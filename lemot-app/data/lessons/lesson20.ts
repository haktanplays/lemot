import type { Lesson } from "@/lib/types";

export const lesson20: Lesson = {
  id: 20,
  title: "Past Tense II",
  sub: "Movement verbs with être",
  icon: "ArrowUpDown",
  level: "A1",
  difficulty: "hard",
  grammar: {
    title: "Passé Composé with Être",
    sections: [
      {
        type: "intro",
        text: "Some verbs use *être* instead of *avoir* to form the passé composé. These are mostly verbs of movement or change of state. The big difference: with être, the past participle *agrees* with the subject — like an adjective!",
      },
      {
        type: "block",
        label: "DR MRS VANDERTRAMP",
        items: [
          { fr: "Devenir", en: "to become", note: "D — elle est devenue" },
          { fr: "Revenir", en: "to come back", note: "R — il est revenu" },
          { fr: "Monter", en: "to go up", note: "M — elle est montée" },
          { fr: "Rester", en: "to stay", note: "R — il est resté" },
          { fr: "Sortir", en: "to go out", note: "S — elle est sortie" },
          { fr: "Venir", en: "to come", note: "V — il est venu" },
          { fr: "Aller", en: "to go", note: "A — elle est allée" },
          { fr: "Naître", en: "to be born", note: "N — il est né" },
          { fr: "Descendre", en: "to go down", note: "D — elle est descendue" },
          { fr: "Entrer", en: "to enter", note: "E — il est entré" },
          { fr: "Retourner", en: "to return", note: "R — elle est retournée" },
          { fr: "Tomber", en: "to fall", note: "T — il est tombé" },
          { fr: "Rentrer", en: "to go home", note: "R — elle est rentrée" },
          { fr: "Arriver", en: "to arrive", note: "A — il est arrivé" },
          { fr: "Mourir", en: "to die", note: "M — il est mort" },
          { fr: "Partir", en: "to leave", note: "P — elle est partie" },
        ],
      },
      {
        type: "conjugation",
        verb: "aller (to go) — passé composé",
        rows: [
          { pr: "je", conj: "suis allé(e)", en: "I went", pron: "zhuh swee ah-LAY" },
          { pr: "tu", conj: "es allé(e)", en: "you went", pron: "too eh ah-LAY" },
          { pr: "il", conj: "est allé", en: "he went", pron: "eel eh ah-LAY" },
          { pr: "elle", conj: "est allée", en: "she went", pron: "ell eh ah-LAY" },
          { pr: "nous", conj: "sommes allé(e)s", en: "we went", pron: "noo sum ah-LAY" },
          { pr: "vous", conj: "êtes allé(e)(s)", en: "you went", pron: "vooz ett ah-LAY" },
          { pr: "ils", conj: "sont allés", en: "they went (m)", pron: "eel sohn ah-LAY" },
          { pr: "elles", conj: "sont allées", en: "they went (f)", pron: "ell sohn ah-LAY" },
        ],
      },
      {
        type: "tip",
        text: "Agreement rules: feminine adds *-e*, plural adds *-s*. So: *il est allé* but *elle est allée*, *ils sont allés* but *elles sont allées*. The extra letters are silent in speech — this is purely a spelling rule.",
      },
      {
        type: "block",
        label: "Negation with Être",
        items: [
          { fr: "Je ne suis pas allé(e)", en: "I didn't go", note: "ne...pas wraps around être, just like with avoir" },
          { fr: "Elle n'est pas venue", en: "She didn't come", note: "Same sandwich: ne + être + pas + participle" },
          { fr: "Ils ne sont pas partis", en: "They didn't leave", note: "Plural agreement still applies in negation" },
        ],
      },
      {
        type: "howToSay",
        words: [
          {
            fr: "Je suis allé",
            phonetic: "zhuh swee ah-LAY",
            ipa: "/ʒə sɥi a.le/",
            notes: "'Suis' rhymes with 'we'. The -é ending is always 'ay'.",
          },
          {
            fr: "Elle est partie",
            phonetic: "ell eh par-TEE",
            ipa: "/ɛl ɛ paʁ.ti/",
            notes: "The -ie ending sounds like 'ee'. The agreement -e is silent after -i.",
          },
          {
            fr: "Ils sont arrivés",
            phonetic: "eel sohn ah-ree-VAY",
            ipa: "/il sɔ̃ a.ʁi.ve/",
            notes: "Liaison: 'sont arrivés' links smoothly. The -s is silent.",
          },
        ],
      },
    ],
    quickRecall: {
      q: "What does the mnemonic DR MRS VANDERTRAMP help you remember?",
      a: "Verbs that use être in passé composé",
      o: ["Verbs that use être in passé composé", "Irregular past participles", "Time expressions", "Negation patterns"],
    },
  },
  examples: [
    {
      fr: "Je suis allé au cinéma hier.",
      en: "I went to the cinema yesterday.",
      bridge: "Je suis allé to the cinéma yesterday.",
    },
    {
      fr: "Elle est arrivée à dix heures.",
      en: "She arrived at ten o'clock.",
      bridge: "Elle est arrivée at dix heures.",
    },
    {
      fr: "Nous sommes partis tôt.",
      en: "We left early.",
      bridge: "Nous sommes partis early.",
    },
    {
      fr: "Il est tombé dans la rue.",
      en: "He fell in the street.",
      bridge: "Il est tombé in the rue.",
    },
    {
      fr: "Elles sont venues hier soir.",
      en: "They (f) came last night.",
      bridge: "Elles sont venues yesterday soir.",
    },
    {
      fr: "Tu es resté(e) à la maison ?",
      en: "Did you stay at home?",
      bridge: "Tu es resté at the maison?",
    },
    {
      fr: "Je ne suis pas sorti ce week-end.",
      en: "I didn't go out this weekend.",
      bridge: "Je ne suis pas sorti this weekend.",
    },
  ],
  fillFG: [
    {
      s: "I [___] to the cinema yesterday.",
      a: "suis allé",
      o: ["suis allé", "ai allé", "vais", "suis aller"],
      ctx: "Telling a friend where you went (male speaker).",
    },
    {
      s: "She [___] at 10 o'clock.",
      a: "est arrivée",
      o: ["est arrivée", "a arrivé", "arrive", "est arriver"],
      ctx: "Describing when she got there.",
    },
    {
      s: "They [___] early.",
      a: "sont partis",
      o: ["sont partis", "ont parti", "partent", "sont partir"],
      ctx: "Explaining why they aren't here.",
    },
    {
      s: "He [___] in the street.",
      a: "est tombé",
      o: ["est tombé", "a tombé", "tombe", "est tomber"],
      ctx: "Describing an accident.",
    },
    {
      s: "I [___] go out this weekend.",
      a: "ne suis pas sorti",
      o: ["ne suis pas sorti", "n'ai pas sorti", "ne sors pas", "suis pas sortir"],
      ctx: "Saying you stayed home.",
    },
  ],
  fillBlanks: [
    {
      s: "Je ___ allé au cinéma.",
      a: "suis",
      o: ["suis", "ai", "est", "sommes"],
      ctx: "I went to the cinema (male speaker).",
    },
    {
      s: "Elle est ___ à Paris.",
      a: "allée",
      o: ["allée", "allé", "allés", "aller"],
      ctx: "She went to Paris (feminine agreement).",
    },
    {
      s: "Ils sont ___ hier soir.",
      a: "venus",
      o: ["venus", "venu", "venue", "venir"],
      ctx: "They came last night (masculine plural).",
    },
    {
      s: "Nous ___ partis tôt.",
      a: "sommes",
      o: ["sommes", "avons", "sont", "suis"],
      ctx: "We left early.",
    },
    {
      s: "Elle n'est pas ___.",
      a: "venue",
      o: ["venue", "venu", "venus", "venir"],
      ctx: "She didn't come (feminine agreement).",
    },
  ],
  buildSentences: [
    {
      c: ["Je", "suis", "allé", "au", "cinéma"],
      en: "I went to the cinema",
      trap: ["ai", "le"],
    },
    {
      c: ["Elle", "est", "arrivée", "à", "dix", "heures"],
      en: "She arrived at ten o'clock",
      trap: ["a", "arrivé"],
    },
    {
      c: ["Nous", "sommes", "partis", "tôt"],
      en: "We left early",
      trap: ["avons", "parti"],
    },
    {
      c: ["Je", "ne", "suis", "pas", "sorti"],
      en: "I didn't go out",
      trap: ["ai", "sortir"],
    },
  ],
  quiz: [
    {
      q: "Which helper verb do movement verbs use in passé composé?",
      a: "Être",
      o: ["Être", "Avoir", "Aller", "Faire"],
    },
    {
      q: "How does the participle change for a feminine subject with être?",
      a: "Add -e",
      o: ["Add -e", "Add -s", "No change", "Add -es"],
    },
    {
      q: "Which is correct: 'Elle est allé' or 'Elle est allée'?",
      a: "Elle est allée",
      o: ["Elle est allée", "Elle est allé", "Elle a allée", "Elle est aller"],
      ctx: "Think about feminine agreement.",
    },
    {
      q: "What does DR MRS VANDERTRAMP stand for?",
      a: "A mnemonic for être verbs",
      o: ["A mnemonic for être verbs", "A grammar rule name", "A French saying", "A conjugation pattern"],
    },
    {
      q: "Where does negation go with être verbs?",
      a: "Around être: ne + être + pas",
      o: ["Around être: ne + être + pas", "After the participle", "Before the subject", "Around the participle"],
    },
    {
      q: "Translate: 'Ils sont partis'",
      a: "They left",
      o: ["They left", "They are leaving", "They will leave", "They have parts"],
    },
    {
      q: "Which verb does NOT use être in passé composé?",
      a: "Manger",
      o: ["Manger", "Aller", "Venir", "Partir"],
      ctx: "Most verbs use avoir.",
    },
    {
      q: "'Nous sommes allées' — the speakers are...",
      a: "A group of women",
      o: ["A group of women", "A group of men", "A mixed group", "One woman"],
      ctx: "Look at the agreement ending -ées.",
    },
  ],
  combine: [
    {
      hint: "I + went + cinema + yesterday → Say where you went",
      answer: "Je suis allé au cinéma hier",
      accept: [
        "je suis allé au cinéma hier",
        "je suis allé au cinema hier",
        "je suis allée au cinéma hier",
      ],
    },
    {
      hint: "She + arrived + 10 o'clock → Say when she arrived",
      answer: "Elle est arrivée à dix heures",
      accept: [
        "elle est arrivée à dix heures",
        "elle est arrivee a dix heures",
      ],
    },
    {
      hint: "I + didn't + go out + weekend → Say you stayed in",
      answer: "Je ne suis pas sorti ce week-end",
      accept: [
        "je ne suis pas sorti ce week-end",
        "je ne suis pas sorti ce weekend",
        "je ne suis pas sortie ce week-end",
      ],
    },
  ],
  weave: [
    {
      en: "I went to the cinema and she arrived at ten.",
      known: ["je", "suis", "allé", "au", "cinéma", "elle", "est", "arrivée", "à", "dix", "heures"],
      sample: "Je suis allé au cinéma and elle est arrivée à dix heures.",
    },
    {
      en: "We left early because he fell in the street.",
      known: ["nous", "sommes", "partis", "tôt", "il", "est", "tombé", "dans", "la", "rue"],
      sample: "Nous sommes partis tôt because il est tombé dans la rue.",
    },
    {
      en: "They came last night but I didn't go out.",
      known: ["ils", "sont", "venus", "hier", "soir", "je", "ne", "suis", "pas", "sorti"],
      sample: "Ils sont venus hier soir but je ne suis pas sorti.",
    },
  ],
  review: [
    {
      type: "listen",
      audio: "Elle est arrivée à dix heures ce matin.",
      q: "What happened?",
      a: "She arrived at ten this morning",
      o: [
        "She arrived at ten this morning",
        "She is arriving at ten",
        "She will arrive at ten",
        "She left at ten",
      ],
    },
    {
      type: "odd",
      q: "Which does NOT use être in passé composé?",
      items: ["aller", "manger", "venir", "partir"],
      a: "manger",
      reason: "Manger uses avoir (j'ai mangé). The others are DR MRS VANDERTRAMP verbs.",
    },
    {
      type: "context",
      situation: "Your friend asks if you went out this weekend. You stayed home.",
      a: "Je ne suis pas sorti(e) ce week-end",
      o: [
        "Je ne suis pas sorti(e) ce week-end",
        "Je n'ai pas sorti ce week-end",
        "Je ne sors pas ce week-end",
        "Je suis sorti ce week-end",
      ],
    },
    {
      type: "fill_ctx",
      s: "Elles ___ venues hier soir.",
      a: "sont",
      o: ["sont", "ont", "est", "sommes"],
      ctx: "They (feminine) came last night.",
    },
  ],
  sayIt: [
    {
      situation: "Tell a friend about a trip — where you went and when you arrived.",
      target: ["suis allé", "est arrivé", "hier"],
    },
    {
      situation: "Explain that you didn't go out this weekend — you stayed home.",
      target: ["ne suis pas", "sorti", "resté", "maison"],
    },
  ],
  miniConv: {
    topic: "Describing a recent trip or outing",
    starter: "Tu es allé(e) où ce week-end ?",
  },
  expressions: [
    {
      fr: "C'est parti !",
      en: "Let's go! / Here we go!",
      usage: "On commence le projet ? Allez, c'est parti !",
      literal: "It's left!",
    },
    {
      fr: "Aller-retour",
      en: "Round trip",
      usage: "Un aller-retour pour Lyon, s'il vous plaît.",
      literal: "Go-return",
    },
    {
      fr: "Être né(e)",
      en: "To be born",
      usage: "Je suis née en 1995 à Marseille.",
      literal: "To be born (uses être, not avoir!)",
    },
  ],
  grammarNuggets: [
    {
      title: "Agreement is for the eyes, not the ears",
      insight: "The agreement endings (-e, -s, -es) are almost always SILENT. 'Allé', 'allée', 'allés', 'allées' all sound the same: /a.le/. This is purely a written grammar rule. In speech, no one can tell the difference.",
      example: "allé = allée = allés = allées → all pronounced ah-LAY",
    },
    {
      title: "Être verbs = movement or change of state",
      insight: "There's a logic to DR MRS VANDERTRAMP: these verbs describe going somewhere (aller, venir, partir, arriver) or changing state (naître, mourir, devenir). Think: 'Did the subject MOVE or CHANGE?' If yes, probably être.",
      example: "Je suis allé (movement) vs J'ai mangé (no movement)",
    },
  ],
  soundPatterns: [
    {
      pattern: "-é / -ée / -és / -ées → same sound",
      examples: [
        { fr: "allé / allée", en: "went (m/f)" },
        { fr: "arrivé / arrivée", en: "arrived (m/f)" },
      ],
      rule: "All agreement forms of past participles ending in -é sound identical: /e/. The extra letters are silent.",
    },
  ],
  cultureBite: "The French love to discuss weekend plans and past outings. 'Tu es allé(e) où ?' is the Monday morning standard. If you went to a good restaurant, a market, or the countryside, you'll earn social points. Staying home watching Netflix? That's fine too — just say 'Je suis resté(e) tranquille' (I stayed quiet/relaxed).",
  summary: [
    "Être verbs: DR MRS VANDERTRAMP (movement/change verbs)",
    "Agreement: feminine adds -e, plural adds -s to participle",
    "Negation: ne + être + pas + participle",
    "Agreement is silent — written only, not heard",
  ],
};
