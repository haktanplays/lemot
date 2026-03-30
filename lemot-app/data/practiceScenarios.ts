import type { ScenarioCard } from "@/lib/types";

export const SCENARIOS: ScenarioCard[] = [
  // ── L1: Survival Kit ──
  {
    situation: "You walk into a bakery in Paris. What do you say first?",
    answer: "Bonjour !",
    explanation: "Always greet before ordering — skipping \"bonjour\" is considered rude in France.",
    lesson: 1,
    audio: "Bonjour !",
  },
  {
    situation: "You want to order a coffee politely.",
    answer: "Je voudrais un café, s'il vous plaît.",
    explanation: "\"Je voudrais\" (I would like) is the polite way to order. Always add \"s'il vous plaît\" (please).",
    lesson: 1,
    audio: "Je voudrais un café, s'il vous plaît.",
  },
  {
    situation: "A shop assistant helped you find what you needed. What do you say?",
    answer: "Merci beaucoup !",
    explanation: "\"Merci beaucoup\" means \"thank you very much\" — a warm, common expression of gratitude.",
    lesson: 1,
    audio: "Merci beaucoup !",
  },
  {
    situation: "You're leaving a friend's house at the end of the evening.",
    answer: "Bonne soirée ! Au revoir !",
    explanation: "\"Bonne soirée\" wishes them a good evening ahead. \"Au revoir\" is the standard goodbye.",
    lesson: 1,
    audio: "Bonne soirée ! Au revoir !",
  },

  // ── L2: Pronunciation I ──
  {
    situation: "Someone speaks too fast. You need them to slow down.",
    answer: "Plus lentement, s'il vous plaît.",
    explanation: "\"Plus lentement\" means \"more slowly.\" A survival phrase for real conversations.",
    lesson: 2,
    audio: "Plus lentement, s'il vous plaît.",
  },
  {
    situation: "You didn't catch what someone said. How do you ask them to repeat?",
    answer: "Pouvez-vous répéter ?",
    explanation: "\"Pouvez-vous répéter ?\" is the formal way to ask \"Can you repeat?\" — polite and clear.",
    lesson: 2,
    audio: "Pouvez-vous répéter ?",
  },

  // ── L3: Pronunciation II ──
  {
    situation: "You don't understand a word someone used. How do you ask what it means?",
    answer: "Qu'est-ce que ça veut dire ?",
    explanation: "Literally \"What does that mean?\" — essential for learning in real conversations.",
    lesson: 3,
    audio: "Qu'est-ce que ça veut dire ?",
  },

  // ── L4: Tu vs Vous ──
  {
    situation: "Your friend's parents invite you to dinner. How do you address them?",
    answer: "Vous",
    explanation: "Use \"vous\" with older people, authority figures, or anyone you don't know well. It shows respect.",
    lesson: 4,
    audio: "Vous",
  },
  {
    situation: "You meet a classmate your age at a party. Which form do you use to ask their name?",
    answer: "Tu t'appelles comment ?",
    explanation: "With peers your age in casual settings, \"tu\" is natural. \"Vous\" would feel stiff.",
    lesson: 4,
    audio: "Tu t'appelles comment ?",
  },

  // ── L5: Être ──
  {
    situation: "Someone asks your profession. You're a student.",
    answer: "Je suis étudiant(e).",
    explanation: "\"Je suis\" = I am. French uses être (to be) for professions, just like English.",
    lesson: 5,
    audio: "Je suis étudiant.",
  },
  {
    situation: "A French colleague asks how you are. You're doing well.",
    answer: "Je suis bien, merci. Et vous ?",
    explanation: "Respond, thank them, and ask back — that's the polite pattern in French.",
    lesson: 5,
    audio: "Je suis bien, merci. Et vous ?",
  },

  // ── L6: Avoir ──
  {
    situation: "It's cold outside and you want to express that you feel cold.",
    answer: "J'ai froid.",
    explanation: "French says \"I have cold\" (j'ai froid), NOT \"I am cold.\" \"Je suis froid\" means you're emotionally cold!",
    lesson: 6,
    audio: "J'ai froid.",
  },
  {
    situation: "You skipped lunch and your stomach is rumbling.",
    answer: "J'ai faim.",
    explanation: "\"J'ai faim\" = I'm hungry. French uses \"avoir\" (to have) for physical sensations: hunger, thirst, cold, heat.",
    lesson: 6,
    audio: "J'ai faim.",
  },
  {
    situation: "Your friend says something incorrect. You want to say they're wrong.",
    answer: "Tu as tort.",
    explanation: "\"Avoir tort\" = to be wrong (literally \"to have wrong\"). The opposite: \"avoir raison\" = to be right.",
    lesson: 6,
    audio: "Tu as tort.",
  },
  {
    situation: "You're really thirsty after a long walk. How do you say it?",
    answer: "J'ai très soif.",
    explanation: "\"J'ai soif\" = I'm thirsty. Add \"très\" for emphasis. Remember: French uses avoir, not être, for thirst.",
    lesson: 6,
    audio: "J'ai très soif.",
  },

  // ── L7: Articles & Gender ──
  {
    situation: "You want to say 'the book is on the table.' Is \"livre\" masculine or feminine?",
    answer: "Le livre est sur la table.",
    explanation: "\"Livre\" is masculine (le livre). \"Table\" is feminine (la table). Articles must match gender.",
    lesson: 7,
    audio: "Le livre est sur la table.",
  },
  {
    situation: "Someone asks if you like music. You love it.",
    answer: "J'adore la musique !",
    explanation: "When talking about a general concept (music in general), French uses the definite article: \"la musique.\"",
    lesson: 7,
    audio: "J'adore la musique !",
  },

  // ── L8: Numbers & Time ──
  {
    situation: "Someone asks you what time it is. It's 3 PM.",
    answer: "Il est trois heures.",
    explanation: "French uses \"Il est\" + number + \"heures\" for telling time. No AM/PM — context makes it clear.",
    lesson: 8,
    audio: "Il est trois heures.",
  },
  {
    situation: "You see something in a shop window. You want to ask the price.",
    answer: "Ça coûte combien ?",
    explanation: "\"Ça coûte combien ?\" = How much does it cost? A must-know phrase for shopping in France.",
    lesson: 8,
    audio: "Ça coûte combien ?",
  },

  // ── L9: Food & Ordering ──
  {
    situation: "You're at a restaurant and the waiter asks what you'd like. You want the chicken.",
    answer: "Je prends le poulet, s'il vous plaît.",
    explanation: "\"Je prends\" (I'll take) is the standard way to order food at a restaurant.",
    lesson: 9,
    audio: "Je prends le poulet, s'il vous plaît.",
  },
  {
    situation: "You finished your meal and want to pay.",
    answer: "L'addition, s'il vous plaît.",
    explanation: "\"L'addition\" = the check/bill. In France, the waiter never brings it unless you ask.",
    lesson: 9,
    audio: "L'addition, s'il vous plaît.",
  },
  {
    situation: "You'd like some water with your meal.",
    answer: "De l'eau, s'il vous plaît.",
    explanation: "\"De l'eau\" uses the partitive article — you want some water, not all the water in the world.",
    lesson: 9,
    audio: "De l'eau, s'il vous plaît.",
  },

  // ── L10: Family ──
  {
    situation: "Someone asks about your family. You have one brother and one sister.",
    answer: "J'ai un frère et une sœur.",
    explanation: "\"Frère\" is masculine (un frère), \"sœur\" is feminine (une sœur). \"J'ai\" = I have.",
    lesson: 10,
    audio: "J'ai un frère et une sœur.",
  },
  {
    situation: "You want to introduce your friend to someone.",
    answer: "Je vous présente mon ami(e).",
    explanation: "\"Je vous présente\" = Let me introduce. \"Mon ami\" (male) or \"mon amie\" (female).",
    lesson: 10,
    audio: "Je vous présente mon ami.",
  },

  // ── L11: Negation ──
  {
    situation: "Someone asks if you've eaten. You haven't yet.",
    answer: "Pas encore.",
    explanation: "\"Pas encore\" = not yet. Short and natural — the full form would be \"Je n'ai pas encore mangé.\"",
    lesson: 11,
    audio: "Pas encore.",
  },
  {
    situation: "A friend asks if you eat meat. You never do.",
    answer: "Je ne mange jamais de viande.",
    explanation: "\"Ne ... jamais\" = never. Note: after negation, \"de la/du\" becomes just \"de.\"",
    lesson: 11,
    audio: "Je ne mange jamais de viande.",
  },
  {
    situation: "You look in the fridge and there's nothing left.",
    answer: "Il n'y a rien.",
    explanation: "\"Ne ... rien\" = nothing. \"Il y a\" means \"there is/are\" — negated: \"il n'y a rien.\"",
    lesson: 11,
    audio: "Il n'y a rien.",
  },

  // ── L12: Everyday Phrases ──
  {
    situation: "Your friend suggests having dinner together tonight. You agree enthusiastically.",
    answer: "Ça marche !",
    explanation: "\"Ça marche\" literally means \"that walks\" but is used like \"sounds good!\" or \"works for me!\"",
    lesson: 12,
    audio: "Ça marche !",
  },
  {
    situation: "Someone asks whether you prefer tea or coffee. It depends on your mood.",
    answer: "Ça dépend.",
    explanation: "\"Ça dépend\" = it depends. A useful hedge when you don't have a fixed answer.",
    lesson: 12,
    audio: "Ça dépend.",
  },
  {
    situation: "You thought the restaurant was close, but actually it's far away.",
    answer: "En fait, c'est loin.",
    explanation: "\"En fait\" = actually/in fact. Use it to correct a previous assumption or add new information.",
    lesson: 12,
    audio: "En fait, c'est loin.",
  },

  // ── L13: Aller & Future ──
  {
    situation: "A friend asks your plans for tonight. You're going to the restaurant.",
    answer: "Je vais au restaurant.",
    explanation: "\"Aller\" + à/au = to go to. \"Au\" = à + le (contraction for masculine places).",
    lesson: 13,
    audio: "Je vais au restaurant.",
  },
  {
    situation: "You're giving directions. The pharmacy is on the left.",
    answer: "La pharmacie est à gauche.",
    explanation: "\"À gauche\" = on the left. \"À droite\" = on the right. Key direction vocabulary.",
    lesson: 13,
    audio: "La pharmacie est à gauche.",
  },

  // ── L14: Questions ──
  {
    situation: "You want to ask a new acquaintance why they're learning French.",
    answer: "Pourquoi tu apprends le français ?",
    explanation: "\"Pourquoi\" = why. In casual conversation, you can form questions just with intonation.",
    lesson: 14,
    audio: "Pourquoi tu apprends le français ?",
  },
  {
    situation: "You need to know when the train arrives.",
    answer: "Le train arrive quand ?",
    explanation: "\"Quand\" = when. Placing it at the end with rising intonation is natural in spoken French.",
    lesson: 14,
    audio: "Le train arrive quand ?",
  },

  // ── L15: Daily Routine ──
  {
    situation: "Someone asks what time you wake up. You get up at 7 AM.",
    answer: "Je me lève à sept heures.",
    explanation: "\"Se lever\" is reflexive — \"je me lève\" = I get (myself) up. Reflexive verbs are common for daily routines.",
    lesson: 15,
    audio: "Je me lève à sept heures.",
  },
  {
    situation: "You want to say you work in the morning and rest in the evening.",
    answer: "Je travaille le matin et je me repose le soir.",
    explanation: "\"Le matin\" / \"le soir\" = in the morning / in the evening. The article \"le\" indicates habitual time.",
    lesson: 15,
    audio: "Je travaille le matin et je me repose le soir.",
  },

  // ── L16: Places & Prepositions ──
  {
    situation: "You need bread. Where should you go?",
    answer: "Je vais à la boulangerie.",
    explanation: "\"La boulangerie\" = the bakery. Use \"à la\" before feminine places. This is where the French buy bread daily.",
    lesson: 16,
    audio: "Je vais à la boulangerie.",
  },
  {
    situation: "You need to find a pharmacy. You ask someone where the nearest one is.",
    answer: "Où est la pharmacie la plus proche ?",
    explanation: "\"Où est\" = where is. \"La plus proche\" = the nearest. French pharmacies have a green cross sign.",
    lesson: 16,
    audio: "Où est la pharmacie la plus proche ?",
  },
  {
    situation: "You want to say the park is behind the supermarket.",
    answer: "Le parc est derrière le supermarché.",
    explanation: "\"Derrière\" = behind. Prepositions of place: devant (in front), derrière (behind), à côté de (next to).",
    lesson: 16,
    audio: "Le parc est derrière le supermarché.",
  },
];
