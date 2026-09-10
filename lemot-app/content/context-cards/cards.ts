/**
 * Context Cards — INPUT.
 *
 * "LESSON TEACHES. CONTEXT CARDS INPUT. PRACTICE HUB OUTPUTS. MON LEXIQUE
 * REMEMBERS." This is the input arm, and the whole design follows from that one
 * word: a card asks nothing, scores nothing, and has no right answer. It shows
 * the learner a piece of French they have not been taught, in a situation that
 * makes them want it.
 *
 * WHAT A CARD IS NOT: a flashcard, a quiz, a mini-Practice question, or a bare
 * translation pair. There is no typed answer and no correctness anywhere in
 * this module or the surface that renders it.
 *
 * EVERY SET HANGS OFF AN ENGINE THE LEARNER ALREADY OWNS. That is what makes it
 * input rather than noise: a learner who has L8's "C'est où ?" can do something
 * with "la sortie" the moment they see it, and a learner who has not reached L8
 * is never shown the set at all. Cards broaden what a known engine can say; they
 * never introduce an engine.
 *
 * AND THEY DO NOT BECOME OWNED LANGUAGE. Meeting a word here is exposure, which
 * is the weakest honest record there is. Nothing in this file is a registry
 * item, so no Context Card word can be a Practice target, a lesson demand, or a
 * production claim. That separation is structural rather than a convention, and
 * `contextCardExposure.test.ts` holds it there.
 *
 * The set is deliberately small. The brief is explicit: do not optimize for
 * count. Four sets that each make one owned engine reach further beat forty
 * cards of scattered nouns.
 */

import type { FrenchContext } from "@/content/my-french/prefs";

/** One piece of French met, not taught. */
export type ContextCard = {
  id: string;
  /** The situation that makes this word wanted. Never a question. */
  cue: string;
  fr: string;
  en: string;
  /**
   * Written pronunciation aid, house convention: lowercase, hyphen-separated
   * syllables, read as English, with the stressed group last. Audio is the
   * authority; this is a cue and must not pretend to be IPA.
   */
  sound?: string;
  /** The owned engine and the new word, working together. */
  example?: { fr: string; en: string };
  /**
   * One optional small note. Where it claims a word relationship it follows the
   * same rule the Showcase cognates do: name which of the four it is, and never
   * invent an etymology however tidy.
   */
  note?: string;
};

/** A handful of cards that make ONE owned engine reach further. */
export type ContextCardSet = {
  id: string;
  /**
   * Which of My French's situations this set belongs to.
   *
   * Used for ORDER and nothing else: a learner who says they care about cafés
   * sees the café set first. Nothing is hidden, nothing is unlocked, and a
   * learner with no preferences set sees the authored order.
   */
  contextTags?: readonly FrenchContext[];
  /** Learner-facing name for the situation, not for the grammar. */
  label: string;
  /** The registry item the learner must already own for this set to appear. */
  engineItemId: string;
  /** The engine, written out, so the set says what it is extending. */
  engine: string;
  intro: string;
  cards: readonly ContextCard[];
};

export const CONTEXT_CARD_SETS: readonly ContextCardSet[] = Object.freeze([
  {
    id: "cc-getting-around",
    label: "Finding your way",
    engineItemId: "chunk-c-est-ou",
    contextTags: ["getting-around", "travel", "hotels"],
    engine: "C'est où ?",
    intro:
      "You can already ask where something is. These are the somethings, for the places a first week actually needs.",
    cards: [
      {
        id: "cc-la-gare",
        cue: "You are looking for the trains.",
        fr: "la gare",
        en: "the station",
        sound: "la GAR",
        example: { fr: "La gare, c'est où ?", en: "Where's the station?" },
      },
      {
        id: "cc-la-sortie",
        cue: "You want out, and every door looks the same.",
        fr: "la sortie",
        en: "the way out",
        sound: "la sor-TEE",
        example: { fr: "La sortie, c'est où ?", en: "Where's the way out?" },
        note: "Word-family bridge. Sortie is the noun of sortir, to go out. English borrowed it whole for a military sortie, which is the same idea with more drama.",
      },
      {
        id: "cc-l-entree",
        cue: "You have found the building and not the door.",
        fr: "l'entrée",
        en: "the entrance",
        sound: "lon-TRAY",
        example: { fr: "L'entrée, c'est où ?", en: "Where's the entrance?" },
        note: "Meaning drift. English took entrée to the dinner table and left the door behind. In French it is still the way in.",
      },
      {
        id: "cc-les-toilettes",
        cue: "The question nobody wants to have to improvise.",
        fr: "les toilettes",
        en: "the toilets",
        sound: "lay twa-LET",
        example: { fr: "Les toilettes, c'est où ?", en: "Where are the toilets?" },
        note: "Always plural in French, even when there is one. Asking for la toilette means something else entirely.",
      },
      {
        id: "cc-la-reception",
        cue: "Somebody behind a desk will know.",
        fr: "la réception",
        en: "the front desk",
        sound: "la ray-sep-see-ON",
        example: { fr: "La réception, c'est où ?", en: "Where's the front desk?" },
      },
      {
        id: "cc-l-hotel",
        cue: "You have the name and not the street.",
        fr: "l'hôtel",
        en: "the hotel",
        sound: "lo-TEL",
        example: { fr: "L'hôtel, c'est où ?", en: "Where's the hotel?" },
        note: "Direct cognate, with a clue in it. The hat on the ô marks an s French dropped centuries ago: hostel became hôtel, and the same happened to forêt and hôpital.",
      },
    ],
  },
  {
    id: "cc-at-the-counter",
    label: "At the counter",
    engineItemId: "chunk-je-voudrais",
    contextTags: ["cafes", "errands"],
    engine: "Je voudrais…",
    intro:
      "The polite ask is already yours. Swap what comes after it and the same sentence orders anything.",
    cards: [
      {
        id: "cc-un-croissant",
        cue: "Morning, and the window is full of them.",
        fr: "un croissant",
        en: "a croissant",
        sound: "un krwa-SON",
        example: { fr: "Je voudrais un croissant.", en: "I'd like a croissant." },
      },
      {
        id: "cc-une-baguette",
        cue: "The long one, still warm.",
        fr: "une baguette",
        en: "a baguette",
        sound: "oon ba-GET",
        example: { fr: "Je voudrais une baguette.", en: "I'd like a baguette." },
      },
      {
        id: "cc-un-verre-d-eau",
        cue: "You do not want a drink, you want water.",
        fr: "un verre d'eau",
        en: "a glass of water",
        sound: "un vair DOH",
        example: { fr: "Je voudrais un verre d'eau.", en: "I'd like a glass of water." },
      },
      {
        id: "cc-un-chocolat-chaud",
        cue: "It is cold and coffee is not the answer.",
        fr: "un chocolat chaud",
        en: "a hot chocolate",
        sound: "un sho-ko-la SHOH",
        example: { fr: "Je voudrais un chocolat chaud.", en: "I'd like a hot chocolate." },
      },
      {
        id: "cc-l-addition",
        cue: "You are done and would like to pay.",
        fr: "l'addition",
        en: "the bill",
        sound: "la-dee-see-ON",
        example: { fr: "Je voudrais l'addition, s'il vous plaît.", en: "I'd like the bill, please." },
        note: "Meaning drift. It is the same word as addition, and in a café it means the sum of what you had. Asking for it is how you ask to pay.",
      },
    ],
  },
  {
    id: "cc-where-youre-going",
    label: "Where you're going",
    engineItemId: "chunk-je-vais",
    contextTags: ["getting-around", "work", "errands"],
    engine: "Je vais…",
    intro:
      "You can say you are going home. These are the other places, and the small word in front is the whole trick.",
    cards: [
      {
        id: "cc-au-bureau",
        cue: "It is a weekday and you are expected somewhere.",
        fr: "au bureau",
        en: "to the office",
        sound: "oh boo-ROH",
        example: { fr: "Je vais au bureau.", en: "I'm going to the office." },
        note: "Word-family bridge. A bureau was a writing desk before it was a room, which is how English ended up using the same word for a chest of drawers.",
      },
      {
        id: "cc-au-marche",
        cue: "Saturday, and the square is full.",
        fr: "au marché",
        en: "to the market",
        sound: "oh mar-SHAY",
        example: { fr: "Je vais au marché.", en: "I'm going to the market." },
      },
      // Not "à la gare" or "à l'hôtel": L7 already TEACHES both of those, so
      // putting them here would be exactly the collapse of exposure and
      // production the input arm exists to prevent. contextCards.test.ts caught
      // it, which is what that test is for.
      {
        id: "cc-a-la-boulangerie",
        cue: "It is still warm and it is two streets away.",
        fr: "à la boulangerie",
        en: "to the bakery",
        sound: "a la boo-lon-zhuh-REE",
        example: { fr: "Je vais à la boulangerie.", en: "I'm going to the bakery." },
        note: "Word-family bridge, and a useful pattern. The -erie ending names the place where a thing is made or sold: boulangerie from boulanger, the baker.",
      },
      {
        id: "cc-a-la-pharmacie",
        cue: "Something small has gone wrong and you need a chemist.",
        fr: "à la pharmacie",
        en: "to the pharmacy",
        sound: "a la far-ma-SEE",
        example: { fr: "Je vais à la pharmacie.", en: "I'm going to the pharmacy." },
        note: "Au before one kind of place, à la before the other. The place decides which, not you, so the destination is worth learning whole.",
      },
    ],
  },
  {
    id: "cc-when",
    label: "When",
    engineItemId: "chunk-faire-une-pause",
    contextTags: ["work"],
    engine: "Je voudrais faire une pause.",
    intro:
      "Asking for a break is yours. These say when, which is usually the next thing anyone wants to know.",
    cards: [
      // Not "maintenant", "plus tard", "ce soir" or "demain": L7 already
      // declares all four as registry items, and anything the registry holds
      // can be scheduled as production. These are the times it does not.
      {
        id: "cc-tout-de-suite",
        cue: "Not in a minute. Now, this second.",
        fr: "tout de suite",
        en: "right away",
        sound: "too duh SWEET",
        example: { fr: "Je voudrais faire une pause tout de suite.", en: "I'd like to take a break right away." },
        note: "Three words that arrive as two syllables. Nobody says the middle one in full.",
      },
      {
        id: "cc-cinq-minutes",
        cue: "You are asking for very little.",
        fr: "cinq minutes",
        en: "five minutes",
        sound: "sank mee-NOOT",
        example: { fr: "Cinq minutes, s'il vous plaît.", en: "Five minutes, please." },
      },
      {
        id: "cc-dans-une-heure",
        cue: "Not yet, but you want it on the record.",
        fr: "dans une heure",
        en: "in an hour",
        sound: "don zoon UR",
        example: { fr: "Je voudrais faire une pause dans une heure.", en: "I'd like to take a break in an hour." },
        note: "Listen for the z. The s of dans wakes up in front of the vowel in une, exactly the way it does in vous avez.",
      },
      {
        id: "cc-cet-apres-midi",
        cue: "After lunch, before the day ends.",
        fr: "cet après-midi",
        en: "this afternoon",
        sound: "set a-preh mee-DEE",
        example: { fr: "Je vais au marché cet après-midi.", en: "I'm going to the market this afternoon." },
      },
    ],
  },
] as const);

/** Every card, flattened. */
export function allContextCards(): ContextCard[] {
  return CONTEXT_CARD_SETS.flatMap((set) => [...set.cards]);
}

/**
 * The sets a learner can currently be shown.
 *
 * A set appears only once its engine is genuinely theirs. Showing "la sortie"
 * to someone who cannot yet ask where anything is would be a vocabulary list,
 * which is the thing Context Cards exist instead of.
 */
export function availableContextCardSets(
  reachedItemIds: ReadonlySet<string>,
): ContextCardSet[] {
  return CONTEXT_CARD_SETS.filter((set) => reachedItemIds.has(set.engineItemId));
}
