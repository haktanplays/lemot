import type { FlashCard } from "@/lib/types";

// lessonId mapping (Adım 6 — Daily Review lesson-scope fix, second pass):
//
// First pass collapsed the "L1-5 core vocabulary" range into lessonId=1 and
// kept the older 16-lesson group labels verbatim. That can still let a
// Lesson 1 learner receive Lesson 4-5 content, so this pass cross-references
// each card against the actual current lesson files (data/lessons/lesson1-5)
// and applies the obvious L6+ subject shifts the user flagged in review.
//
// Verification approach:
//   - L1-5 cards: confirmed by grep against data/lessons/lesson1.ts ... lesson5.ts
//   - L6+ shifts: applied where the subject obviously matches a different lesson
//     in the current 24-lesson syllabus (Sprint 9-syllabus, see CLAUDE.md):
//       L6 Avoir       -> 4   (current L4 Avoir)         — verified in lesson4.ts
//       L7 Articles    -> 5   (current L5 Articles)      — partial verify
//       L13 Aller      -> 6   (current L6 Aller)         — subject match
//       L14 Questions  -> 7   (current L7 Questions I)   — subject match
//       L10 Family     -> 12  (current L12 My People)    — subject match
//       L11 Negation   -> 14  (current L14 More Negation)— subject match
//       L15 Daily Rout.-> 17  (current L17 My Day)       — subject match
//       L16 Places     -> 15  (current L15 Places)       — subject match
//       L8 Numbers     -> 8   (current L8 — unchanged)
//       L9 Food        -> 9   (current L9 — unchanged)
//
// Cards flagged MAPPING-REVIEW have not been verified against a specific
// lesson and are gated to lessonId=12 (out of Dev APK L1-L5 scope) so they
// never appear in early-learner reviews until a content audit places them.
//
// MAPPING-REVIEW (8 cards, currently lessonId=12):
//   il faut, en fait, ça marche, ça dépend, d'accord, petit, grand, vin
//   -> Original group "L1-5, L12: Core vocabulary" but not present in
//      lessons 1-5; could belong anywhere in L1-L24. Conservatively gated.
//
// MAPPING-REVIEW (5 cards, currently lessonId=5 with caveat):
//   voiture, téléphone, musique, famille, chaise
//   -> Original group "L7: Articles & Gender", current Articles is L5.
//      Subject (everyday nouns for article practice) fits L5, but these
//      five aren't explicitly in the lesson5.ts vocab. Trusted to L5 per
//      user hint; revisit during content audit.
//
// MAPPING-REVIEW (1 card, currently lessonId=4):
//   mal -> An avoir expression ("j'ai mal"), original group "L6: Avoir"
//      now mapped to L4. Not literally present in lesson4.ts but pairs
//      with avoir expressions taught there. Kept at L4 with this note.

export const FLASH: FlashCard[] = [
  // ── L1: Survival Kit ──
  { fr: "bonjour", en: "hello", cat: "phrase", ex: "Bonjour, comment allez-vous ?", cog: "", lessonId: 1 },
  { fr: "merci", en: "thank you", cat: "phrase", ex: "Merci beaucoup !", cog: "≈ mercy", lessonId: 1 },
  { fr: "comprendre", en: "to understand", cat: "verb", ex: "Je comprends.", cog: "≈ comprehend", lessonId: 1 },
  { fr: "répéter", en: "to repeat", cat: "verb", ex: "Pouvez-vous répéter ?", cog: "≈ repeat", lessonId: 1 },
  { fr: "vous", en: "you (formal/plural)", cat: "pronoun", ex: "Vous êtes américain ?", cog: "", lessonId: 1 },

  // ── L2: Être ──
  { fr: "être", en: "to be", cat: "verb", ex: "Je suis content.", cog: "→ essence, absent, present", lessonId: 2 },
  { fr: "fatigué", en: "tired", cat: "adj", ex: "Je suis fatigué.", cog: "≈ fatigue", lessonId: 2 },
  { fr: "content", en: "happy", cat: "adj", ex: "Je suis content.", cog: "≈ content", lessonId: 2 },
  { fr: "tu", en: "you (informal)", cat: "pronoun", ex: "Tu es français ?", cog: "", lessonId: 2 },
  { fr: "toi", en: "you (emphatic)", cat: "pronoun", ex: "Et toi ?", cog: "", lessonId: 2 },

  // ── L3: Yes/No/You ──
  { fr: "rue", en: "street", cat: "noun", ex: "La rue est grande.", cog: "", lessonId: 3 },
  { fr: "pain", en: "bread", cat: "noun", ex: "Du pain et du vin.", cog: "", lessonId: 3 },

  // ── L4: Avoir (was "L6: Avoir" in old numbering) ──
  { fr: "il y a", en: "there is/are", cat: "phrase", ex: "Il y a un problème.", cog: "", lessonId: 4 },
  { fr: "restaurant", en: "restaurant", cat: "noun", ex: "Il y a un bon restaurant.", cog: "≈ restaurant", lessonId: 4 },
  { fr: "avoir", en: "to have", cat: "verb", ex: "J'ai faim.", cog: "", lessonId: 4 },
  { fr: "faim", en: "hunger", cat: "noun", ex: "J'ai faim.", cog: "≈ famine", lessonId: 4 },
  { fr: "soif", en: "thirst", cat: "noun", ex: "J'ai soif.", cog: "", lessonId: 4 },
  { fr: "peur", en: "fear", cat: "noun", ex: "J'ai peur.", cog: "", lessonId: 4 },
  { fr: "besoin", en: "need", cat: "noun", ex: "J'ai besoin d'aide.", cog: "", lessonId: 4 },
  { fr: "raison", en: "right/reason", cat: "noun", ex: "Tu as raison.", cog: "≈ reason", lessonId: 4 },
  { fr: "tort", en: "wrong", cat: "noun", ex: "Il a tort.", cog: "≈ tort", lessonId: 4 },
  { fr: "chaud", en: "hot", cat: "adj", ex: "J'ai chaud.", cog: "", lessonId: 4 },
  { fr: "froid", en: "cold", cat: "adj", ex: "J'ai froid.", cog: "≈ frigid", lessonId: 4 },
  { fr: "mal", en: "pain/ache", cat: "noun", ex: "J'ai mal à la tête.", cog: "≈ malady", lessonId: 4 },  // [MAPPING-REVIEW]

  // ── L5: Articles (was "L7: Articles & Gender" in old numbering) ──
  { fr: "problème", en: "problem", cat: "noun", ex: "Pas de problème.", cog: "≈ problem", lessonId: 5 },
  { fr: "chat", en: "cat", cat: "noun", ex: "Le petit chat est ici.", cog: "", lessonId: 5 },
  { fr: "livre", en: "book", cat: "noun", ex: "Le livre est sur la table.", cog: "≈ library", lessonId: 5 },
  { fr: "maison", en: "house", cat: "noun", ex: "La maison est grande.", cog: "≈ mansion", lessonId: 5 },
  { fr: "table", en: "table", cat: "noun", ex: "Sur la table.", cog: "≈ table", lessonId: 5 },
  { fr: "voiture", en: "car", cat: "noun", ex: "La voiture est rouge.", cog: "", lessonId: 5 },                     // [MAPPING-REVIEW]
  { fr: "téléphone", en: "phone", cat: "noun", ex: "Le téléphone sonne.", cog: "≈ telephone", lessonId: 5 },        // [MAPPING-REVIEW]
  { fr: "musique", en: "music", cat: "noun", ex: "La musique est belle.", cog: "≈ music", lessonId: 5 },            // [MAPPING-REVIEW]
  { fr: "famille", en: "family", cat: "noun", ex: "Ma famille est grande.", cog: "≈ family", lessonId: 5 },         // [MAPPING-REVIEW]
  { fr: "chaise", en: "chair", cat: "noun", ex: "La chaise est petite.", cog: "", lessonId: 5 },                     // [MAPPING-REVIEW]

  // ── L6: Aller (was "L13: Aller" in old numbering) ──
  { fr: "aller", en: "to go", cat: "verb", ex: "Je vais au restaurant.", cog: "", lessonId: 6 },
  { fr: "gauche", en: "left", cat: "noun", ex: "À gauche.", cog: "", lessonId: 6 },
  { fr: "droite", en: "right (direction)", cat: "noun", ex: "À droite.", cog: "≈ direct", lessonId: 6 },
  { fr: "devant", en: "in front of", cat: "prep", ex: "Devant la gare.", cog: "≈ avant-garde", lessonId: 6 },
  { fr: "derrière", en: "behind", cat: "prep", ex: "Derrière la maison.", cog: "", lessonId: 6 },

  // ── L7: Questions I (was "L14: Questions" in old numbering) ──
  { fr: "pourquoi", en: "why", cat: "adv", ex: "Pourquoi tu apprends le français ?", cog: "", lessonId: 7 },
  { fr: "comment", en: "how", cat: "adv", ex: "Comment tu t'appelles ?", cog: "≈ comment", lessonId: 7 },
  { fr: "quand", en: "when", cat: "adv", ex: "Quand est-ce que tu arrives ?", cog: "", lessonId: 7 },
  { fr: "parce que", en: "because", cat: "phrase", ex: "Parce que j'aime le français.", cog: "", lessonId: 7 },

  // ── L8: Numbers & Time ──
  { fr: "heure", en: "hour/time", cat: "noun", ex: "Il est trois heures.", cog: "≈ hour", lessonId: 8 },
  { fr: "midi", en: "noon", cat: "noun", ex: "Il est midi.", cog: "≈ midday", lessonId: 8 },
  { fr: "combien", en: "how much", cat: "adv", ex: "Ça coûte combien ?", cog: "", lessonId: 8 },
  { fr: "cher", en: "expensive", cat: "adj", ex: "C'est trop cher.", cog: "≈ cherish", lessonId: 8 },
  { fr: "euro", en: "euro", cat: "noun", ex: "Ça coûte dix euros.", cog: "≈ euro", lessonId: 8 },
  { fr: "demi", en: "half", cat: "adj", ex: "Il est midi et demi.", cog: "≈ demi", lessonId: 8 },

  // ── L9: Food & Ordering ──
  { fr: "manger", en: "to eat", cat: "verb", ex: "Je vais manger.", cog: "", lessonId: 9 },
  { fr: "boire", en: "to drink", cat: "verb", ex: "Je vais boire de l'eau.", cog: "≈ beverage", lessonId: 9 },
  { fr: "poulet", en: "chicken", cat: "noun", ex: "Je prends le poulet.", cog: "≈ poultry", lessonId: 9 },
  { fr: "fromage", en: "cheese", cat: "noun", ex: "Du fromage, s'il vous plaît.", cog: "≈ fromage", lessonId: 9 },
  { fr: "salade", en: "salad", cat: "noun", ex: "Une salade verte.", cog: "≈ salad", lessonId: 9 },
  { fr: "eau", en: "water", cat: "noun", ex: "De l'eau, s'il vous plaît.", cog: "≈ eau (perfume)", lessonId: 9 },
  { fr: "addition", en: "the check", cat: "noun", ex: "L'addition, s'il vous plaît.", cog: "≈ addition", lessonId: 9 },
  { fr: "dessert", en: "dessert", cat: "noun", ex: "Un dessert, s'il vous plaît.", cog: "≈ dessert", lessonId: 9 },

  // ── L12: My People (was "L10: Family" in old numbering) ──
  { fr: "père", en: "father", cat: "noun", ex: "Mon père est grand.", cog: "≈ paternal", lessonId: 12 },
  { fr: "mère", en: "mother", cat: "noun", ex: "Ma mère est médecin.", cog: "≈ maternal", lessonId: 12 },
  { fr: "frère", en: "brother", cat: "noun", ex: "Mon frère a vingt ans.", cog: "≈ fraternal", lessonId: 12 },
  { fr: "sœur", en: "sister", cat: "noun", ex: "Ma sœur est étudiante.", cog: "≈ sorority", lessonId: 12 },
  { fr: "enfant", en: "child", cat: "noun", ex: "L'enfant est petit.", cog: "≈ infant", lessonId: 12 },
  { fr: "ami", en: "friend", cat: "noun", ex: "Mon ami est ici.", cog: "≈ amicable", lessonId: 12 },
  { fr: "jeune", en: "young", cat: "adj", ex: "Elle est jeune.", cog: "≈ juvenile", lessonId: 12 },
  { fr: "vieux", en: "old", cat: "adj", ex: "Il est vieux.", cog: "", lessonId: 12 },

  // ── L12 (gated): MAPPING-REVIEW — original "L1-5, L12: Core vocabulary"
  // cards not found in data/lessons/lesson1-5. Conservatively gated to L12
  // (out of Dev APK L1-L5 scope) until a content audit places each one.
  { fr: "il faut", en: "one must", cat: "phrase", ex: "Il faut partir.", cog: "", lessonId: 12 },                    // [MAPPING-REVIEW]
  { fr: "en fait", en: "actually", cat: "phrase", ex: "En fait, je préfère le thé.", cog: "≈ in fact", lessonId: 12 }, // [MAPPING-REVIEW]
  { fr: "ça marche", en: "sounds good", cat: "phrase", ex: "Ça marche, à demain !", cog: "≈ march", lessonId: 12 },   // [MAPPING-REVIEW]
  { fr: "ça dépend", en: "it depends", cat: "phrase", ex: "Ça dépend.", cog: "≈ depend", lessonId: 12 },              // [MAPPING-REVIEW]
  { fr: "d'accord", en: "okay", cat: "phrase", ex: "D'accord, on y va !", cog: "≈ accord", lessonId: 12 },           // [MAPPING-REVIEW]
  { fr: "petit", en: "small", cat: "adj", ex: "Le petit chat.", cog: "≈ petite", lessonId: 12 },                      // [MAPPING-REVIEW]
  { fr: "grand", en: "big", cat: "adj", ex: "Un grand hôtel.", cog: "≈ grand", lessonId: 12 },                        // [MAPPING-REVIEW]
  { fr: "vin", en: "wine", cat: "noun", ex: "Du vin rouge.", cog: "≈ wine (from Latin vinum)", lessonId: 12 },        // [MAPPING-REVIEW]

  // ── L14: More Negation + Y/En (was "L11: Negation" in old numbering) ──
  { fr: "jamais", en: "never", cat: "adv", ex: "Je ne mange jamais de viande.", cog: "", lessonId: 14 },
  { fr: "rien", en: "nothing", cat: "pronoun", ex: "Il n'y a rien.", cog: "", lessonId: 14 },
  { fr: "personne", en: "nobody", cat: "pronoun", ex: "Il n'y a personne.", cog: "≈ person", lessonId: 14 },
  { fr: "toujours", en: "always", cat: "adv", ex: "Il est toujours en retard.", cog: "", lessonId: 14 },
  { fr: "encore", en: "still/again", cat: "adv", ex: "Tu es encore ici ?", cog: "≈ encore", lessonId: 14 },
  { fr: "déjà", en: "already", cat: "adv", ex: "J'ai déjà mangé.", cog: "≈ déjà vu", lessonId: 14 },

  // ── L15: Places & Prepositions (was "L16: Places" in old numbering) ──
  { fr: "pharmacie", en: "pharmacy", cat: "noun", ex: "La pharmacie est à gauche.", cog: "≈ pharmacy", lessonId: 15 },
  { fr: "boulangerie", en: "bakery", cat: "noun", ex: "La boulangerie est ici.", cog: "", lessonId: 15 },
  { fr: "supermarché", en: "supermarket", cat: "noun", ex: "Le supermarché est loin.", cog: "≈ supermarket", lessonId: 15 },
  { fr: "banque", en: "bank", cat: "noun", ex: "La banque est à droite.", cog: "≈ bank", lessonId: 15 },
  { fr: "parc", en: "park", cat: "noun", ex: "Le parc est grand.", cog: "≈ park", lessonId: 15 },

  // ── L17: My Day (was "L15: Daily Routine" in old numbering) ──
  { fr: "se lever", en: "to get up", cat: "verb", ex: "Je me lève à sept heures.", cog: "≈ lever", lessonId: 17 },
  { fr: "travailler", en: "to work", cat: "verb", ex: "Je travaille le matin.", cog: "≈ travail", lessonId: 17 },
  { fr: "dormir", en: "to sleep", cat: "verb", ex: "Je dors bien.", cog: "≈ dormant", lessonId: 17 },
  { fr: "matin", en: "morning", cat: "noun", ex: "Le matin, je me lève.", cog: "≈ matinée", lessonId: 17 },
  { fr: "soir", en: "evening", cat: "noun", ex: "Le soir, je me couche.", cog: "≈ soirée", lessonId: 17 },
];
