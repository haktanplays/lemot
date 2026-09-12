/**
 * The smallest intent vocabulary the curriculum actually needs.
 *
 * WHY THIS IS SMALL ON PURPOSE. A speech-act ontology is easy to write and
 * almost impossible to keep true: eighty universal acts would mean eighty
 * judgements nobody has made about content nobody has authored. Every name here
 * exists because a real screen in L1-L7 already does that job, and the list is
 * meant to grow one entry at a time, each time paid for by content.
 *
 * WHAT AN INTENT IS NOT. It is not a synonym class. "au revoir", "à bientôt"
 * and "bonne journée" all CAN close an interaction, and they are not
 * interchangeable: the second claims you expect to see the person soon and the
 * third claims a daytime parting. Intent says what an expression is capable of;
 * the scene says whether that capability fits here. Collapsing the two is the
 * failure mode this layer exists to avoid — it is how a learner gets told "à
 * bientôt" works at a counter they will never walk into again.
 *
 * Pure data and types. No React Native, no runtime, no clock, no AI.
 */

/**
 * A communicative job an expression can do.
 *
 * Names are the job, never the French: one intent has many expressions and one
 * expression serves several intents.
 */
export type CommunicativeIntent =
  /** Open contact. "Bonjour." */
  | "greet"
  /** Make someone available to you before you ask. "Excusez-moi." */
  | "get-attention"
  /** Say where you are. "Je suis ici." */
  | "state-location"
  /** Say what you came for. "J'ai une question." */
  | "state-purpose"
  /** Turn something down without giving offence. "Non merci." */
  | "decline-politely"
  /** Say that it did not land. "Je ne comprends pas." */
  | "signal-not-understood"
  /** Ask for it again. "Vous pouvez répéter ?" */
  | "ask-to-repeat"
  /** Acknowledge what was given. "Merci." */
  | "thank"
  /** End the exchange. "Au revoir." */
  | "close-interaction";

export const COMMUNICATIVE_INTENTS: readonly CommunicativeIntent[] = Object.freeze([
  "greet",
  "get-attention",
  "state-location",
  "state-purpose",
  "decline-politely",
  "signal-not-understood",
  "ask-to-repeat",
  "thank",
  "close-interaction",
]);

/**
 * A fact about the situation, authored on the screen rather than read out of
 * its English prose.
 *
 * DELIBERATELY NOT A WORLD MODEL. Each fact is here because some expression's
 * validity turns on it, and for no other reason. A fact nothing consults is a
 * field authors have to keep true for nothing, and the first one that goes
 * stale takes the layer's credibility with it.
 *
 * Facts are POSITIVE and explicit: absence means "not established", never
 * "false". That asymmetry is the conservative direction — an expression that
 * needs `likelySeeAgainSoon` is refused on a scene that has not said so, which
 * is a false rejection the author can fix, rather than a false acceptance the
 * learner has to unlearn.
 */
export type SceneFact =
  /** The two of you expect to meet again before long. */
  | "likelySeeAgainSoon"
  /** A counter, a shop, a desk: someone is serving, and you are passing through. */
  | "serviceEncounter"
  /** Daylight hours, so a parting can be about the rest of the day. */
  | "daytime"
  /** The scene has told the learner WHY they are here. */
  | "purposeKnown"
  /** Something has been offered and is waiting on an answer. */
  | "offerMade"
  /** Something was said and did not land. */
  | "misunderstandingOccurred"
  /** The vous register is what this moment calls for. */
  | "formalRegister";

export const SCENE_FACTS: readonly SceneFact[] = Object.freeze([
  "likelySeeAgainSoon",
  "serviceEncounter",
  "daytime",
  "purposeKnown",
  "offerMade",
  "misunderstandingOccurred",
  "formalRegister",
]);
