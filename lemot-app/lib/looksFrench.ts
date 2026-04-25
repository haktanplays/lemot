/**
 * Heuristic: does this string read like French?
 *
 * Used to decide whether to show a Listen (TTS) button for an exercise answer.
 * fr-FR TTS will happily read English and ranking notation with a French accent,
 * which sounds wrong, so we skip TTS when the text isn't recognizably French.
 *
 * Returns true if the text contains:
 *   - any French diacritic (é è ê à â î ï ô ö ù û ü ç ÿ)
 *   - or no English-only function-word markers and no order/ranking arrows.
 *
 * The bias is to err on the side of speaking when uncertain — short pure-ASCII
 * French words like "merci", "bonjour", "salut" still pass.
 */
const FRENCH_DIACRITIC = /[àâäéèêëïîôöùûüÿçÀÂÄÉÈÊËÏÎÔÖÙÛÜŸÇ]/;

const ORDER_OR_RANK_MARKER = /→|->|\s>\s|\s<\s|\smost\s|\sleast\s/i;

const ENGLISH_ONLY_TOKEN =
  /\b(the|is|are|was|were|have|has|had|been|with|from|that|this|these|those|where|what|which|how|why|when|because|something|someone|anything|anyone|nothing|everyone|until|seeing|day|key|keys|attention|verb|conditional|consonant|consonants|silent|pronounced|gargle|sandwich|true|false)\b/i;

export function looksFrench(text: string): boolean {
  if (!text || typeof text !== "string") return false;
  const trimmed = text.trim();
  if (!trimmed) return false;

  // Hard skips: ranking arrows, True/False answers
  if (ORDER_OR_RANK_MARKER.test(trimmed)) return false;
  if (/^(True|False)$/i.test(trimmed)) return false;

  // Diacritics → definitely French
  if (FRENCH_DIACRITIC.test(trimmed)) return true;

  // English-only function words → definitely not French
  if (ENGLISH_ONLY_TOKEN.test(trimmed)) return false;

  // Default: assume French (safe for short words like "merci", "salut")
  return true;
}
