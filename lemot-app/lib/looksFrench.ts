/**
 * Heuristic: does this string read like French?
 *
 * Used by the Listen (TTS) button to decide whether speaking the text would
 * sound right. fr-FR TTS will happily read English with a French accent, which
 * sounds wrong, so we skip TTS when the text isn't recognizably French.
 *
 * Returns true when the text contains:
 *   - any French diacritic (é è ê à â î ï ô ö ù û ü ç ÿ), OR
 *   - no English-only markers (standalone "I", English contraction suffixes,
 *     common English function words).
 *
 * The bias is to err on the side of speaking when uncertain — short pure-ASCII
 * French words like "merci", "bonjour", "salut" still pass.
 */
const FRENCH_DIACRITIC = /[àâäéèêëïîôöùûüÿçÀÂÄÉÈÊËÏÎÔÖÙÛÜŸÇ]/;

const ORDER_OR_RANK_MARKER = /→|->|\s>\s|\s<\s|\smost\s|\sleast\s/i;

// English contraction suffix (don't, I'm, you'll, it's, we'd, they're, I've).
// French apostrophes are PREFIX-attached (j', l', c', n', qu', d', m', s', t'),
// so a suffix '-s/-m/-t/-ll/-d/-re/-ve' never appears in French words.
const ENGLISH_CONTRACTION = /\w+['’](s|m|t|ll|d|re|ve)\b/i;

// Standalone capital "I" — French has no single-letter "I" pronoun.
const ENGLISH_PRONOUN_I = /\bI\b/;

const ENGLISH_ONLY_TOKEN =
  /\b(the|is|are|was|were|have|has|had|been|with|from|that|this|these|those|where|what|which|how|why|when|because|something|someone|anything|anyone|nothing|everyone|until|seeing|day|key|keys|attention|verb|conditional|consonant|consonants|silent|pronounced|gargle|sandwich|true|false|you|your|yours|much|very|thank|thanks|hello|goodbye|sorry|please|sir|madam|like|know|knew|mean|means|would|could|should|soon|later|today|tomorrow|yesterday|evening|morning|night|forever|nice|good|bad|fine|well|raise|glass|comprehend|comprehended|comprehending|so)\b/i;

export function looksFrench(text: string): boolean {
  if (!text || typeof text !== "string") return false;
  const trimmed = text.trim();
  if (!trimmed) return false;

  // Hard skip: ranking arrows ("A → B → C") never read sensibly.
  if (ORDER_OR_RANK_MARKER.test(trimmed)) return false;
  // Hard skip: True/False answer literals.
  if (/^(True|False)$/i.test(trimmed)) return false;

  // Diacritics → definitely French.
  if (FRENCH_DIACRITIC.test(trimmed)) return true;

  // English-only markers → definitely not French.
  if (ENGLISH_PRONOUN_I.test(trimmed)) return false;
  if (ENGLISH_CONTRACTION.test(trimmed)) return false;
  if (ENGLISH_ONLY_TOKEN.test(trimmed)) return false;

  // Default: assume French (safe for short words like "merci", "salut").
  return true;
}

/**
 * Pull the longest French-looking quoted span out of `text`. Returns null if
 * no quoted French content is found.
 *
 * Used so that Quiz items like `What does 'je ne comprends pas' mean?` can
 * still play TTS — the answer is English, but the question references a French
 * phrase the learner should hear.
 *
 * Supports ASCII single quotes ('...') and typographic curly quotes (‘...’,
 * “...”). Also matches French guillemets («...»). For ASCII quotes with an odd
 * count (e.g. `'s'il vous plaît'`), prefers the outermost pairing so embedded
 * apostrophes don't split the span.
 */
export function extractFrenchQuote(text: string): string | null {
  if (!text || typeof text !== "string") return null;

  const candidates: string[] = [];

  // Curly / typographic quotes — clean separation, no apostrophe collisions.
  for (const m of text.matchAll(/[‘“]([^’”]+)[’”]/g)) {
    candidates.push(m[1].trim());
  }

  // French guillemets.
  for (const m of text.matchAll(/«\s*([^»]+?)\s*»/g)) {
    candidates.push(m[1].trim());
  }

  // ASCII single quotes — pairing depends on quote-apostrophe count.
  //   2 apostrophes  → single quoted span.
  //   3 apostrophes  → quoted span with one embedded apostrophe (`'s'il vous plaît'`).
  //   4+ apostrophes → multiple distinct quoted spans; pair them adjacently.
  // Skip apostrophes that are part of an English contraction so noise like
  // `you're` / `don't` in the surrounding sentence doesn't shift the count.
  const CONTRACTION_SUFFIX = /^(s|m|t|ll|d|re|ve)\b/i;
  const apos: number[] = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== "'") continue;
    const before = text[i - 1] ?? "";
    const after = text.slice(i + 1, i + 4);
    if (/\w/.test(before) && CONTRACTION_SUFFIX.test(after)) continue;
    apos.push(i);
  }
  if (apos.length === 2) {
    candidates.push(text.slice(apos[0] + 1, apos[1]).trim());
  } else if (apos.length === 3) {
    candidates.push(text.slice(apos[0] + 1, apos[2]).trim());
  } else if (apos.length >= 4) {
    for (let i = 0; i + 1 < apos.length; i += 2) {
      candidates.push(text.slice(apos[i] + 1, apos[i + 1]).trim());
    }
  }

  let best: string | null = null;
  for (const c of candidates) {
    if (!c) continue;
    if (!looksFrench(c)) continue;
    if (!best || c.length > best.length) best = c;
  }
  return best;
}
