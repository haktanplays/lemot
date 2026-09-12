/**
 * The palette — V4-B values, under the names the product already reads.
 *
 * ── WHY THE NAMES DID NOT CHANGE ───────────────────────────────────────────
 *
 * V4-B is the chosen direction for how Cairn should look. The tempting way to
 * adopt it is a second token set (`V4B.ink` beside `P.ink`) and a screen-by-
 * screen migration; that produces two palettes living at once, a long tail of
 * half-migrated surfaces, and a product that looks like two products for as
 * long as the migration takes.
 *
 * So the VALUES moved and the NAMES stayed. Every surface in the app already
 * reads P.bg / P.ink / P.ink2 / P.ink3 / P.border, which means the whole
 * product moves together, in one reviewable diff, with no screen re-skinned
 * individually. That is what "migrate through shared primitives" buys.
 *
 * What actually changed: a warm grey scale became a cool one, and the
 * secondary ink got darker. Concretely —
 *
 *   bg     #FAF9F7 → #FAFAF7   (a hair cooler)
 *   ink    #2C2825 → #0E1116   (warm near-black → cool near-black)
 *   ink2   #6B6560 → #494E58   (darker AND cooler; contrast on bg rises
 *                               from about 5.1:1 to about 8:1)
 *   ink3   #A39E99 → #9CA0A8   (the V4-B "mute"; contrast is unchanged)
 *   border #E8E5E1 → #EDEEEF   (V4-B's rgba(14,17,22,0.07) resolved against
 *                               the new bg — flattened because React Native
 *                               composites a translucent border against
 *                               whatever is behind it, and these hairlines sit
 *                               over both bg and paper)
 *
 * DELIBERATELY UNCHANGED: `red`. V4-B's accent is navy #2E4A7A, and swapping
 * it here would silently restyle every primary action, the feedback bands and
 * the piece chips in a commit whose subject is tokens. The navy is named below
 * as `accent` and used by the new editorial primitives where V4-B uses it; the
 * progression action stays brick red until that is its own decision.
 */
export const P = {
  bg: "#FAFAF7",
  paper: "#FFFFFF",
  ink: "#0E1116",
  ink2: "#494E58",
  ink3: "#9CA0A8",
  red: "#C0392B",
  rl: "#FBEAE8",
  rb: "#F0C9C4",
  green: "#27AE60",
  gl: "#E8F5E9",
  amber: "#E67E22",
  al: "#FFF8E1",
  purple: "#7C3AED",
  pl: "#F3E5F5",
  border: "#EDEEEF",
  /**
   * V4-B's accent. Navy, used sparingly and only where the design uses it:
   * the label on a live block, the marker on the step you are on, the fill of
   * a progress rule. It is NOT the progression button — see the note above.
   */
  accent: "#2E4A7A",
  /** The soft ground V4-B pools behind the hero. */
  halo: "#F0EEE7",
  sh: "0 1px 4px rgba(14,17,22,0.06)",
} as const;

// UI Slice 1 foundation tokens - additive, consumed by components/ui and the
// lesson frame. The palette above is untouched; these only name the spacing
// rhythm and radius pair the lesson surfaces already use informally, so new
// presentation code stops re-inventing raw numbers.
export const SPACE = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const RADIUS = {
  // Cards and inputs.
  card: 12,
  // Small nested surfaces (hint cloze, example blocks).
  inner: 8,
  // Chips, pills, round affordances.
  pill: 999,
  /**
   * Buttons. V4-B sets these two points softer than its cards, which is small
   * enough to be invisible on its own and is exactly why it works: the action
   * reads as slightly more approachable than the surfaces around it without
   * announcing itself.
   */
  action: 14,
} as const;

// Home motivation rotation — 3 layers interleaved so the daily index
// naturally cycles through proverb → soft reflection → path reflection.
// Reward / cheerleader / pressure tones are intentionally absent
// (no XP, no streak, no "keep going", no "great job"). Tone is passive
// mirror: sit beside the learner, do not push.
const MOTIV_PROVERBS = [
  "Petit à petit, l'oiseau fait son nid.",
  "On ne voit bien qu'avec le cœur.",
  "Le temps fait toute chose.",
];

const MOTIV_SOFT_REFLECTIONS = [
  "Some French is starting to feel less distant.",
  "A few pieces are becoming familiar.",
  "Little by little, the language starts to answer back.",
];

const MOTIV_PATH_REFLECTIONS = [
  "The path is quieter when you return to it gently.",
  "You do not need to rush what is becoming yours.",
  "You are not behind. You are on the path.",
];

export const MOTIV = MOTIV_PROVERBS.flatMap((p, i) => [
  p,
  MOTIV_SOFT_REFLECTIONS[i],
  MOTIV_PATH_REFLECTIONS[i],
]);

/**
 * Vertical room for a line of French.
 *
 * French carries accents above (é, è, ê, à, ç) and descenders below (j, g, p,
 * q, y), and the product sets French in italic serif, which swings furthest of
 * all. A Text with no lineHeight inherits a default sized for Latin text
 * without accents, and inside a pill with tight vertical padding the tops of
 * accents and the tails of J and j get shaved. The founder saw it first on
 * "J'ai"; it was never a J problem.
 *
 * 1.45x is enough for an italic serif accent stack without making chips loose.
 */
export function frenchLineHeight(fontSize: number): number {
  return Math.round(fontSize * 1.45);
}

/**
 * The line box an ITALIC serif needs, which is not the same as upright.
 *
 * The founder reported clipping on "J" a second time after every French surface
 * was already computing 1.45x, which means the ratio was not the whole story.
 * Italic serif is the worst case in both directions at once: the slant carries
 * the top of a capital J further up and its tail further down than the font's
 * upright metrics suggest, so the ink can exceed a line box that is arithmetically
 * correct. 1.55x buys that back.
 *
 * Upright French keeps 1.45x. This is not a global loosening: it applies where
 * the product actually sets italic, which is the model answer, the chips, the
 * reel and the reveal.
 */
export function frenchItalicLineHeight(fontSize: number): number {
  return Math.round(fontSize * 1.55);
}

/**
 * ONE italic-serif French style, so there is one place to fix it.
 *
 * Eight renderers were each hand-assembling fontFamily + fontStyle + fontSize +
 * lineHeight, which is how the last typography pass could correct four of them
 * and leave the defect alive. A shared factory makes the next Android finding a
 * one-line change instead of an eight-file audit.
 *
 * `includeFontPadding` is the Android-specific half and is set explicitly rather
 * than left to the platform default. It tells Android to reserve the font's own
 * declared ascent and descent around the line; the default is true today, but it
 * differs across RN architectures, and a glyph this close to its bounds should
 * not depend on which one is running. It is ignored on iOS.
 */
export function frenchSerif(fontSize: number) {
  return {
    fontFamily: "serif" as const,
    fontStyle: "italic" as const,
    fontSize,
    lineHeight: frenchItalicLineHeight(fontSize),
    includeFontPadding: true,
  };
}
