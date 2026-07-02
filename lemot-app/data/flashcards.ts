// LEGACY — DO NOT BUILD ON THIS. Frozen legacy v7 test-build surface (Cairn Faz 0 quarantine).
// The long-term product foundation is learning-engine (content/lessons/v1 + lib/learning-engine).
// Do not extend, import into new code, or use as a reference for new lessons.
// See docs/KNOWN_GAPS.md and docs/CAIRN_ROADMAP_202607.md.
import type { FlashCard } from "@/lib/types";

// lessonId mapping (Adım 6 — Daily Review lesson-scope fix, third pass):
//
// 2026-05-08 update (Prompt 3 audit + Prompt 4 fix):
// - L3 was {rue, pain} (2 cards, neither core to L3 negation/yes/no/you).
//   Replaced with the actual L3 vocabulary: oui, non, si, jamais, plus, rien.
//   `jamais` and `rien` were lessonId=14 in the previous pass; they are
//   introduced and practiced in lesson3.ts negation block, so they belong
//   to L3 first. L14 (More Negation + Y/En) still has personne, toujours,
//   encore, déjà.
// - L5 had 5 orphan cards (voiture, téléphone, musique, famille, chaise)
//   not present in lesson5.ts vocabulary, plus 5 valid cards
//   (problème, chat, livre, maison, table). Added école, ami, enfant,
//   homme, animal, croissant — all explicit in lesson5.ts.
//   `ami` and `enfant` were previously lessonId=12; both now L5 because
//   lesson5 article block uses them as core examples.
// - L4 `mal` was [MAPPING-REVIEW] (not in lesson4 grammar). Replaced with
//   `sommeil`, which is explicit in lesson4 avoir-expressions block
//   (`J'ai sommeil — I'm sleepy`).
// - L1 expanded from 5 to 12 cards (au revoir, je voudrais, s'il vous plaît,
//   pardon, voilà, bonsoir, salut all in lesson1 grammar.sections).
// - L2 expanded from 5 to 10 cards (américain, étudiant, médecin, français,
//   prêt all in lesson2 examples and grammar).
// - Orphan cards (rue, pain, voiture, téléphone, musique, famille, chaise)
//   moved to lessonId=12 with [GATED] tag — out of Dev APK scope until a
//   later content audit places them properly.
//
// Previous mapping notes (kept for context):
//   L6 Avoir       -> 4   (current L4 Avoir)
//   L7 Articles    -> 5   (current L5 Articles)
//   L13 Aller      -> 6
//   L14 Questions  -> 7
//   L10 Family     -> 12
//   L11 Negation   -> 14
//   L15 Daily Rout.-> 17
//   L16 Places     -> 15
//
// MAPPING-REVIEW (8 cards, currently lessonId=12):
//   il faut, en fait, ça marche, ça dépend, d'accord, petit, grand, vin
//   -> Original group "L1-5, L12: Core vocabulary" but not present in
//      lessons 1-5; could belong anywhere in L1-L24. Conservatively gated.

export const FLASH: FlashCard[] = [
  // ── L1: Survival Kit ──
  { fr: "bonjour", en: "hello", cat: "phrase", ex: "Bonjour, comment allez-vous ?", cog: "", lessonId: 1 },
  { fr: "merci", en: "thank you", cat: "phrase", ex: "Merci beaucoup !", cog: "≈ mercy", lessonId: 1 },
  { fr: "comprendre", en: "to understand", cat: "verb", ex: "Je comprends.", cog: "≈ comprehend", lessonId: 1 },
  { fr: "répéter", en: "to repeat", cat: "verb", ex: "Pouvez-vous répéter ?", cog: "≈ repeat", lessonId: 1 },
  { fr: "vous", en: "you (formal/plural)", cat: "pronoun", ex: "Vous êtes américain ?", cog: "", lessonId: 1 },
  { fr: "au revoir", en: "goodbye", cat: "phrase", ex: "Merci, au revoir !", cog: "lit. 'until seeing again'", lessonId: 1 },
  { fr: "je voudrais", en: "I would like", cat: "phrase", ex: "Je voudrais un café.", cog: "polite form, ≠ je veux", lessonId: 1 },
  { fr: "s'il vous plaît", en: "please", cat: "phrase", ex: "Un café, s'il vous plaît.", cog: "lit. 'if it pleases you'", lessonId: 1 },
  { fr: "pardon", en: "sorry / excuse me", cat: "phrase", ex: "Oh, pardon !", cog: "≈ pardon", lessonId: 1 },
  { fr: "voilà", en: "there you go", cat: "phrase", ex: "Voilà, monsieur.", cog: "lit. 'see there'", lessonId: 1 },
  { fr: "bonsoir", en: "good evening", cat: "phrase", ex: "Bonsoir, madame.", cog: "", lessonId: 1 },
  { fr: "salut", en: "hi (casual)", cat: "phrase", ex: "Salut, ça va ?", cog: "friends only", lessonId: 1 },

  // ── L2: Être ──
  { fr: "être", en: "to be", cat: "verb", ex: "Je suis content.", cog: "→ essence, absent, present", lessonId: 2 },
  { fr: "fatigué", en: "tired", cat: "adj", ex: "Je suis fatigué.", cog: "≈ fatigue", lessonId: 2 },
  { fr: "content", en: "happy", cat: "adj", ex: "Je suis content.", cog: "≈ content", lessonId: 2 },
  { fr: "tu", en: "you (informal)", cat: "pronoun", ex: "Tu es français ?", cog: "", lessonId: 2 },
  { fr: "toi", en: "you (emphatic)", cat: "pronoun", ex: "Et toi ?", cog: "", lessonId: 2 },
  { fr: "américain", en: "American", cat: "adj", ex: "Je suis américain.", cog: "≈ American", lessonId: 2 },
  { fr: "étudiant", en: "student", cat: "noun", ex: "Il est étudiant.", cog: "≈ student", lessonId: 2 },
  { fr: "médecin", en: "doctor", cat: "noun", ex: "Elle est médecin.", cog: "≈ medicine", lessonId: 2 },
  { fr: "français", en: "French", cat: "adj", ex: "Tu es français ?", cog: "", lessonId: 2 },
  { fr: "prêt", en: "ready", cat: "adj", ex: "Vous êtes prêt ?", cog: "", lessonId: 2 },

  // ── L3: Yes / No / You / Negation ──
  { fr: "oui", en: "yes", cat: "phrase", ex: "Oui, s'il vous plaît.", cog: "", lessonId: 3 },
  { fr: "non", en: "no", cat: "phrase", ex: "Non, merci.", cog: "", lessonId: 3 },
  { fr: "si", en: "yes (contradicting a negative)", cat: "phrase", ex: "Tu n'es pas français ? — Si !", cog: "no English equivalent", lessonId: 3 },
  { fr: "jamais", en: "never", cat: "adv", ex: "Je ne mange jamais de viande.", cog: "", lessonId: 3 },
  { fr: "plus", en: "no more (in negation)", cat: "adv", ex: "Je ne veux plus de café.", cog: "ne...plus sandwich", lessonId: 3 },
  { fr: "rien", en: "nothing", cat: "pronoun", ex: "Je ne mange rien.", cog: "ne...rien sandwich", lessonId: 3 },

  // ── L4: Avoir (was "L6: Avoir" in old numbering) ──
  { fr: "il y a", en: "there is/are", cat: "phrase", ex: "Il y a un problème.", cog: "lit. 'it there has'", lessonId: 4 },
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
  { fr: "sommeil", en: "sleepiness", cat: "noun", ex: "J'ai sommeil.", cog: "≈ somnolent", lessonId: 4 },

  // ── L5: Articles (was "L7: Articles & Gender" in old numbering) ──
  { fr: "problème", en: "problem", cat: "noun", ex: "Pas de problème.", cog: "≈ problem", lessonId: 5 },
  { fr: "chat", en: "cat", cat: "noun", ex: "Le petit chat est ici.", cog: "", lessonId: 5 },
  { fr: "livre", en: "book", cat: "noun", ex: "Le livre est sur la table.", cog: "≈ library", lessonId: 5 },
  { fr: "maison", en: "house", cat: "noun", ex: "La maison est grande.", cog: "≈ mansion", lessonId: 5 },
  { fr: "table", en: "table", cat: "noun", ex: "Sur la table.", cog: "≈ table", lessonId: 5 },
  { fr: "école", en: "school", cat: "noun", ex: "L'école est grande.", cog: "≈ school", lessonId: 5 },
  { fr: "ami", en: "friend", cat: "noun", ex: "Mon ami est ici.", cog: "≈ amicable", lessonId: 5 },
  { fr: "enfant", en: "child", cat: "noun", ex: "L'enfant est petit.", cog: "≈ infant", lessonId: 5 },
  { fr: "homme", en: "man", cat: "noun", ex: "L'homme regarde.", cog: "", lessonId: 5 },
  { fr: "animal", en: "animal", cat: "noun", ex: "Les enfants aiment les animaux.", cog: "≈ animal", lessonId: 5 },
  { fr: "croissant", en: "croissant", cat: "noun", ex: "Un croissant, s'il vous plaît.", cog: "≈ croissant", lessonId: 5 },

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
  { fr: "jeune", en: "young", cat: "adj", ex: "Elle est jeune.", cog: "≈ juvenile", lessonId: 12 },
  { fr: "vieux", en: "old", cat: "adj", ex: "Il est vieux.", cog: "", lessonId: 12 },

  // ── L12 (gated): Cards moved here from L3/L5 in 2026-05-08 audit. They
  // appeared in their original lesson exposure or examples but are not core
  // vocabulary of any L1-L5 lesson. Gated to L12 (out of Dev APK scope)
  // until a content pass places each one properly.
  { fr: "rue", en: "street", cat: "noun", ex: "La rue est grande.", cog: "", lessonId: 12 },                          // [GATED — was L3]
  { fr: "pain", en: "bread", cat: "noun", ex: "Du pain et du vin.", cog: "", lessonId: 12 },                          // [GATED — was L3]
  { fr: "voiture", en: "car", cat: "noun", ex: "La voiture est rouge.", cog: "", lessonId: 12 },                      // [GATED — was L5]
  { fr: "téléphone", en: "phone", cat: "noun", ex: "Le téléphone sonne.", cog: "≈ telephone", lessonId: 12 },         // [GATED — was L5]
  { fr: "musique", en: "music", cat: "noun", ex: "La musique est belle.", cog: "≈ music", lessonId: 12 },             // [GATED — was L5]
  { fr: "famille", en: "family", cat: "noun", ex: "Ma famille est grande.", cog: "≈ family", lessonId: 12 },          // [GATED — was L5]
  { fr: "chaise", en: "chair", cat: "noun", ex: "La chaise est petite.", cog: "", lessonId: 12 },                     // [GATED — was L5]

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
  // Note 2026-05-08: jamais, rien moved to L3 (introduced and practiced in
  // lesson3 negation block). L14 still owns personne, toujours, encore, déjà.
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
