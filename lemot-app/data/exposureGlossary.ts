/**
 * Exposure Glossary — English translations for non-L1-vocabulary French words
 * that appear in sentences or distractor options.
 *
 * USAGE:
 * - Practice tab shows these below exercise sentences when non-L1 words
 *   appear, so learners get meaning without having memorized the word yet.
 * - Words that belong to lesson vocabulary should NOT be here (student
 *   should know them and glossary would undermine recall practice).
 *
 * NAMING RULE:
 * - Key = exact surface form as it appears in pool content (case-insensitive match).
 * - Value = concise English gloss + optional note in parens.
 */

export const EXPOSURE_GLOSSARY: Record<string, string> = {
  // Verbs — conjugated or infinitive not yet taught
  parle: "speak (conjugated)",
  parles: "speak (conjugated, tu)",
  parlez: "speak (conjugated, vous)",
  parlons: "speak (conjugated, nous)",
  parlent: "speak (conjugated, ils)",
  manger: "to eat",
  mange: "eat (conjugated)",
  dormir: "to sleep",
  dors: "sleep (conjugated)",
  partir: "to leave",
  vois: "see (conjugated)",
  changer: "to change",
  écrire: "to write",
  rejoindre: "to reach / get to",
  réserver: "to reserve / book",

  // Numbers (L8)
  deux: "two",
  trois: "three",
  quatre: "four",
  cinq: "five",

  // Nouns (L9/L15)
  pharmacie: "pharmacy",
  banque: "bank",
  hôtel: "hotel",
  chambre: "room",
  addition: "bill / check (restaurant)",
  menu: "menu",
  prix: "price",
  annonce: "announcement",
  nuits: "nights",
  jours: "days",
  heures: "hours",

  // Languages (L13)
  français: "French (language)",
  anglais: "English",
  allemand: "German",
  italien: "Italian",
  espagnol: "Spanish",

  // Food items
  chocolat: "chocolate",
  crème: "cream",
  croissant: "croissant (pastry)",
  thé: "tea",
  vin: "wine",
  fromage: "cheese",
  éclair: "éclair (pastry)",

  // Adjectives / adverbs (later lessons)
  gentil: "kind",
  bien: "well",
  mal: "badly",
  très: "very",
  bon: "good",
  vite: "quickly",
  lentement: "slowly",
  proche: "near / close",
  loin: "far",
  grand: "big",
  petit: "small",

  // Politeness / titles
  monsieur: "sir / Mr.",
  madame: "ma'am / Mrs.",
  mademoiselle: "miss",

  // Time / sequence
  bientôt: "soon",
  demain: "tomorrow",
  soir: "evening",

  // Articles / pronouns (partial — L5)
  une: "a / one (feminine)",
  un: "a / one (masculine)",
  la: "the (feminine)",
  le: "the (masculine)",
};

/**
 * Extract non-L1 words from a sentence, matching against the glossary.
 * Case-insensitive, strips punctuation.
 */
export function extractExposureWords(
  text: string,
): Array<{ word: string; meaning: string }> {
  const tokens = text
    .toLowerCase()
    .replace(/[.,!?;:()[\]"']/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const seen = new Set<string>();
  const result: Array<{ word: string; meaning: string }> = [];
  for (const token of tokens) {
    if (seen.has(token)) continue;
    const meaning = EXPOSURE_GLOSSARY[token];
    if (meaning) {
      seen.add(token);
      result.push({ word: token, meaning });
    }
  }
  return result;
}
