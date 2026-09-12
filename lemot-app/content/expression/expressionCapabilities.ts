import type { CommunicativeIntent, SceneFact } from "./communicativeIntent";

/**
 * What each expression is CAPABLE of doing, and what a scene must provide
 * before it may do it.
 *
 * ── Why this is a new record and not a field on something existing ──────────
 *
 * Three homes were considered and rejected, and the reasoning matters more than
 * the conclusion:
 *
 *  - `ITEM_REGISTRY` holds ITEMS. "au revoir" is an item; "Merci, au revoir."
 *    is not, and never should be — items are the substructure expressions are
 *    built from, and flattening the two would make every chunk look like a
 *    complete answer, which is exactly the failure §8 names.
 *
 *  - `SentenceRecord` (content/identity/sentenceIdentity.ts) is the closest
 *    existing shape and genuinely nearly this: a canonical surface, its
 *    accepted alternatives, its item ids, its lesson eligibility. It is also a
 *    deliberately frozen two-record pilot behind a French-QA gate that no
 *    change in this pass has the standing to satisfy, and its size is pinned by
 *    test. Expanding it would be a migration, not an architecture pass. When
 *    that gate is met, THIS is the record that should fold into it — the field
 *    names are chosen to make that a merge rather than a rewrite.
 *
 *  - Practice seed metadata carries a scene and a job in ENGLISH PROSE, for the
 *    learner. Reading an intent back out of it would be inference, which is the
 *    one thing this layer must not do.
 *
 * ── What this record does NOT own ──────────────────────────────────────────
 *
 * REACHABILITY. There is no `earliestLesson` field, on purpose. An expression
 * becomes lawful when its items have been taught, and the curriculum already
 * knows when that is; writing it down again would create a second answer that
 * silently goes stale the moment a lesson moves. `firstLessonIndex` derives it
 * from the lessons themselves.
 *
 * Pure data. No React Native, no runtime, no clock, no AI, no network.
 */
export type ExpressionCapability = {
  /** Stable id, `expr:` namespaced so it cannot be mistaken for an item id. */
  readonly id: string;
  /** The canonical French, exactly as a learner would write it. */
  readonly surface: string;
  /**
   * The canonical items this expression is made of. The ONLY reachability
   * input: every one must be reached before the expression may be offered.
   */
  readonly itemIds: readonly string[];
  /** The jobs this expression can do. One expression may do several. */
  readonly intents: readonly CommunicativeIntent[];
  /**
   * Scene facts that must ALL hold before this expression fits.
   *
   * Absence of a requirement means "works wherever the intent applies", which
   * is true of "Au revoir." and false of almost everything more specific.
   */
  readonly requires?: readonly SceneFact[];
  /**
   * Whether this is a whole answer or a piece of one.
   *
   * §8/§24: a reached piece is not automatically a complete expression.
   * "merci" participates in a polite closing and does not by itself close an
   * interaction, and only `utterance` may ever be offered as a valid path.
   * Pieces are carried here anyway so the same table can explain WHY a
   * fragment was refused, instead of the resolver being silent about it.
   */
  readonly completeness: "utterance" | "piece";
};

/**
 * The table, which covers exactly the closing / arrival / repair families the
 * L6 slice needs and stops there.
 *
 * Every surface here is authored French that already appears in the shipped
 * curriculum or its registry. Nothing was invented to fill a gap in the table.
 */
export const EXPRESSION_CAPABILITIES: readonly ExpressionCapability[] = Object.freeze([
  // ── arrival ───────────────────────────────────────────────────────────────
  {
    id: "expr:bonjour",
    surface: "Bonjour.",
    itemIds: ["chunk-bonjour"],
    intents: ["greet"],
    completeness: "utterance",
  },
  {
    id: "expr:excusez-moi",
    surface: "Excusez-moi.",
    itemIds: ["chunk-excusez-moi"],
    intents: ["get-attention"],
    requires: ["formalRegister"],
    completeness: "utterance",
  },
  {
    id: "expr:je-suis-ici",
    surface: "Je suis ici.",
    itemIds: ["chunk-je-suis-ici"],
    intents: ["state-location"],
    completeness: "utterance",
  },
  {
    // The purpose has to be IN the scene before a learner can be asked to state
    // it. That is not a style rule: a scene that never said why they came is
    // asking them to invent a reason, and the model answer then contains
    // information the screen never gave them.
    id: "expr:j-ai-une-question",
    surface: "J'ai une question.",
    itemIds: ["chunk-j-ai-une-question"],
    intents: ["state-purpose"],
    requires: ["purposeKnown"],
    completeness: "utterance",
  },

  // ── the offer ─────────────────────────────────────────────────────────────
  {
    id: "expr:non-merci",
    surface: "Non merci.",
    itemIds: ["chunk-non-merci"],
    intents: ["decline-politely"],
    requires: ["offerMade"],
    completeness: "utterance",
  },

  // ── repair ────────────────────────────────────────────────────────────────
  {
    id: "expr:je-ne-comprends-pas",
    surface: "Je ne comprends pas.",
    itemIds: ["chunk-je-ne-comprends-pas"],
    intents: ["signal-not-understood"],
    requires: ["misunderstandingOccurred"],
    completeness: "utterance",
  },
  {
    id: "expr:vous-pouvez-repeter",
    surface: "Vous pouvez répéter ?",
    itemIds: ["chunk-vous-pouvez-repeter"],
    intents: ["ask-to-repeat"],
    requires: ["misunderstandingOccurred", "formalRegister"],
    completeness: "utterance",
  },
  {
    id: "expr:excusez-moi-je-ne-comprends-pas",
    surface: "Excusez-moi, je ne comprends pas.",
    itemIds: ["chunk-excusez-moi", "chunk-je-ne-comprends-pas"],
    intents: ["signal-not-understood", "get-attention"],
    requires: ["misunderstandingOccurred", "formalRegister"],
    completeness: "utterance",
  },

  // ── closing ───────────────────────────────────────────────────────────────
  //
  // The family that makes the case for this whole layer. All four can close an
  // interaction. They are not alternatives to one another.
  {
    id: "expr:merci",
    surface: "Merci.",
    itemIds: ["chunk-merci"],
    intents: ["thank"],
    completeness: "utterance",
  },
  {
    id: "expr:au-revoir",
    surface: "Au revoir.",
    itemIds: ["chunk-au-revoir"],
    intents: ["close-interaction"],
    // No requirement. It is the unmarked goodbye, which is precisely why it is
    // the one a beginner should reach for by default.
    completeness: "utterance",
  },
  {
    id: "expr:merci-au-revoir",
    surface: "Merci, au revoir.",
    itemIds: ["chunk-merci", "chunk-au-revoir"],
    intents: ["close-interaction", "thank"],
    completeness: "utterance",
  },
  {
    id: "expr:a-bientot",
    surface: "À bientôt.",
    itemIds: ["chunk-a-bientot"],
    intents: ["close-interaction"],
    // It CLAIMS something: that you expect to see them before long. Said at a
    // counter you will never revisit it is not a register slip, it is untrue.
    requires: ["likelySeeAgainSoon"],
    completeness: "utterance",
  },
  {
    id: "expr:bonne-journee",
    surface: "Bonne journée.",
    itemIds: ["chunk-bonne-journee"],
    intents: ["close-interaction"],
    // A daytime service parting: the thing you say to someone whose day
    // continues without you. Wrong at night, and odd between friends.
    requires: ["daytime", "serviceEncounter"],
    completeness: "utterance",
  },

  // ── pieces, carried so refusals can be explained ──────────────────────────
  {
    id: "expr:piece-je-suis",
    surface: "je suis",
    itemIds: ["chunk-je-suis"],
    intents: ["state-location"],
    completeness: "piece",
  },
  {
    id: "expr:piece-vous-pouvez",
    surface: "vous pouvez",
    itemIds: ["chunk-vous-pouvez"],
    intents: ["ask-to-repeat"],
    completeness: "piece",
  },
]);

/** Index by id, for exclusions and lookups. Built once. */
export const EXPRESSION_BY_ID: Readonly<Record<string, ExpressionCapability>> =
  Object.freeze(
    Object.fromEntries(EXPRESSION_CAPABILITIES.map((e) => [e.id, e])),
  );
