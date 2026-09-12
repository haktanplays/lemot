import type { WeakPointTag } from "./weakPointTags";
import type { ErrorTagCode } from "./learning-engine/events";

export type LearningItemStatus =
  | "active"
  | "supported"
  | "recognition"
  | "recycled";

export type LearningItemType =
  | "verb"
  | "pronoun"
  | "chunk"
  | "idiom"
  | "preposition"
  | "connector"
  | "noun"
  | "adjective"
  | "adverb"
  | "sound-pattern"
  | "grammar-nugget"
  | "micro-contrast"
  | "culture-bite"
  | "faux-ami"
  | "cognate";

/**
 * Explicit primary ↔ linked acquisition relationship between two canonical item
 * identities (PR-07). Structural on purpose — a prose comment cannot be
 * validated. `chunk-un-the` (primary) ↔ `noun-the` (linked) is the first pair:
 * one acquisition concept, two runtime ids, with all L1 evidence flowing to the
 * PRIMARY id only. Reciprocity, existence, no-self-link and one-primary-per-
 * linked are enforced by `content/identity/acquisitionLinks.ts`. This mechanism
 * performs NO id remapping anywhere — persisted history is never rewritten. It
 * also does not link `noun-cafe` and `chunk-un-cafe`: those are INTENTIONALLY
 * separate acquisition identities (L0 owns the lexical item, L5 the article+noun
 * package demand), not a debt to repay, unless canon says otherwise later.
 */
export type AcquisitionIdentityLink =
  | { role: "primary"; linkedItemIds: readonly string[] }
  | { role: "linked"; primaryItemId: string };

export type LearningItem = {
  id: string;
  type: LearningItemType;
  text: string;
  status: LearningItemStatus;
  fr?: string;
  en?: string;
  meaning?: string;
  exampleFr?: string;
  exampleEn?: string;
  relatedItemIds?: string[];
  weakPointTags?: WeakPointTag[];
  /**
   * French-QA state of this registered surface (PR-07). Optional: legacy
   * shipped rows predate the vocabulary and are not retroactively stamped.
   * New PR-07 rows carry `founder_waived_provisional` — see
   * `content/identity/frenchQaStatus.ts` for the exact semantics; no item may
   * claim `approved` without a named human review.
   */
  frenchQa?: import("./identity/frenchQaStatus").FrenchQaStatus;
  /** Primary ↔ linked acquisition relation, when this item participates in one. */
  acquisitionLink?: AcquisitionIdentityLink;
  /**
   * Acquisition-scoped coverage: the component identities that between them
   * carry this identity's acquisition responsibility.
   *
   * ONLY author this when the listed identities COMPLETELY carry the whole
   * identity's acquisition responsibility. This is NOT generic linguistic
   * decomposition: `je ne suis pas` is linguistically `je suis` + `ne…pas` yet
   * is owned as one pedagogical unit, and `on y va` cannot be listed because
   * `on` has no identity of its own — neither may declare this field. Presence
   * asserts coverage; it is not a parts list.
   *
   * NOT RETROACTIVE: acquisition ownership is authored pedagogical history.
   * A component identity created later does not oblige — or silently create —
   * an edge on an identity the curriculum already owns as a whole. Adding a
   * `faire` identity would not rewrite L9's ownership of `faire une pause`.
   *
   * MIGRATION STATE: absence currently means only "no acquisition
   * decomposition has been declared". It does NOT yet mean "independently
   * owned" — registry coverage has not been exhaustively adjudicated, so no
   * consumer may read absence as an ownership claim.
   *
   * Distinct from {@link AcquisitionIdentityLink}, which owns identity
   * granularity and evidence routing and forbids its `linked` side from being
   * a target. Composites listed here remain fully legal lesson targets.
   * Structure is enforced by `content/identity/acquisitionComponents.ts`.
   */
  acquisitionComponents?: readonly string[];
};

export type ScreenType =
  | "activity-chain"
  | "showcase"
  | "pattern-reel"
  | "meet-card"
  | "insight-card"
  | "fill-with-traps"
  | "weave"
  | "say-it-your-way"
  | "natural-reveal"
  | "recap";

export type ValidationMode =
  | "exact-or-alternative"
  | "expected-bank"
  | "ai-assisted-with-fallback"
  | "model-answer-only";

export type InsightType =
  | "sound-writing"
  | "grammar-nugget"
  | "micro-contrast"
  | "culture-bite"
  | "faux-ami"
  | "cognate"
  | "lesson-goal";

export type AnswerRevealPayload = {
  short: string;
  explanation?: string;
  natural?: string;
};

/**
 * One "other way" to say the same thing, and the situation it belongs to.
 *
 * A bare string is still valid and still renders. The founder's objection was
 * not that alternatives existed but that they arrived as an undifferentiated
 * stack: three French sentences under one heading, with nothing saying why a
 * learner would ever reach for the second rather than the first. A labelled
 * variant answers that question in the label.
 *
 * `when` names the SITUATION, not a register, unless the register is really
 * what differs. "Quick at the counter" and "Polite full form" are true of the
 * café pair; calling the same pair "Street" and "Formal" would not be, and a
 * label a learner later discovers to be false costs more than no label.
 */
export type NaturalAlternative = { fr: string; when: string };

export type NaturalRevealPayload = {
  modelAnswer?: string;
  ifCorrect?: string;
  ifCorrectButFlat?: string;
  ifUnderstandableButWrong?: string;
  ifWrongStructure?: string;
  ifTooDirect?: string;
  ifMissingTargetPiece?: string;
  ifBetterThanExpected?: string;
  naturalAlternatives?: (string | NaturalAlternative)[];
  explanation?: string;
};

/**
 * Authoring role for one showcase line. NEVER rendered to the learner.
 *
 *  - `core`      the lesson must give this first competence: seen, understood,
 *                produced with support and retrieved once in a changed context.
 *  - `supported` comprehensible from owned material and manipulable by the
 *                lesson, but independent mastery is not required yet.
 *  - `exposure`  enlarges the French world. It may be seen and heard and it may
 *                NEVER be a required graded answer.
 */
export type ShowcaseRole = "core" | "supported" | "exposure";

/**
 * Optional deeper layer for one Showcase line. Every field is optional and most
 * sentences carry none: the default screen stays calm, and depth is something
 * the learner asks for. Filling every category for every sentence would turn a
 * language world into a textbook page, so a line gets a card only when there is
 * something specific worth saying about THAT line.
 */
export type ShowcaseDepth = {
  /**
   * Written pronunciation aid for English speakers. House convention, taken
   * from the one the registry already uses in `sound-liaison`: lowercase,
   * hyphen-separated syllables, read as English. Audio remains the authority;
   * this is a cue, not a transcription, and must not pretend to IPA precision.
   */
  sound?: string;
  /** One concise high-value observation. Not a grammar lecture. */
  notice?: string;
  /** How the meaningful pieces fit together. */
  structure?: string;
  /** Register, naturalness, when a French speaker would actually say it. */
  usage?: string;
  /** A useful contrast with another form the learner has already reached. */
  compare?: string;
  /**
   * The English word hiding inside the French one.
   *
   * Founder note: cognates were barely visible, and they are the cheapest
   * confidence a beginner can be given. Four different relationships live here
   * and the copy must say WHICH, because treating them alike is how a learner
   * ends up confidently wrong:
   *
   *   direct cognate      same word, same job. question / question.
   *   word-family bridge  visibly related through a shared root, different
   *                       shape. comprends / comprehend.
   *   meaning drift       shared ancestor, the senses have moved apart.
   *                       merci / mercy.
   *   faux ami            looks like a translation and is not.
   *                       journée / journey.
   *
   * Only claims that are actually true. No invented etymology, however tidy.
   */
  cognate?: string;
  /** A deeper explanation for learners who want or need one. */
  inDepth?: string;
};

/**
 * Why a Showcase line shows no piece breakdown.
 *
 * A sentence with no breakdown is either a deliberate teaching choice or an
 * accident, and from the screen they look identical: a flat line the learner is
 * implicitly told to swallow whole. This field is what separates them, and it
 * is REQUIRED on every line the registry cannot break into two or more owned
 * pieces — `validateContent` fails on a flat line that declares nothing.
 *
 * - `formula`     the line IS one thing. "Merci." "Au revoir." "Peut-etre."
 *                 Splitting it would invent a seam that French does not have.
 * - `exposure`    the line reaches past what the learner owns. A partial
 *                 breakdown would claim the unowned half is already theirs, so
 *                 the line is met whole and taught later, or never.
 * - `unsegmented` the seam is real and the line is still shown whole, on
 *                 purpose, because THIS lesson wants the whole first.
 *
 * There is deliberately no "none" or "todo" member. An author who cannot pick
 * one of these three has found a line that should decompose, and the fix is the
 * breakdown, not a label.
 */
export type ShowcaseFlatReason = "formula" | "exposure" | "unsegmented";

export type ShowcaseSentence = {
  fr: string;
  en: string;
  role: ShowcaseRole;
  /**
   * Optional hand-authored piece breakdown. Normally omitted: pieces are
   * derived from the canonical registry by `showcasePieces`, so the breakdown
   * cannot drift from what the learner actually owns. Author this only to
   * correct a segmentation the registry cannot get right on its own.
   *
   * The common legitimate case is a frame the learner owns around a filler that
   * is not a registry item and should not become one: "J'ai" + "soif",
   * "Un croissant" + "s'il vous plait". The registry sees one chunk and stops;
   * the lesson is teaching the seam. Authored pieces must still reconstruct the
   * sentence exactly, which `validateContent` checks.
   */
  pieces?: string[];
  /**
   * Required when the line has no breakdown. See `ShowcaseFlatReason`.
   *
   * Must be ABSENT when a breakdown exists, so a stale label cannot outlive the
   * reason it was written for.
   */
  flat?: ShowcaseFlatReason;
  /** Optional depth layer. Absent means this line needs none. */
  depth?: ShowcaseDepth;
  /**
   * Registry ids this line exercises. Authoring metadata used by the corpus
   * guards; every id must resolve against the canonical registry. Absent means
   * "composed from owned pieces", which is normal for combinations.
   */
  itemIds?: string[];
};

/** A small human grouping, e.g. "Getting attention". Keep these few and short. */
export type ShowcaseCluster = {
  label: string;
  sentences: ShowcaseSentence[];
};

/**
 * The lesson's opening language world: what French the learner is stepping
 * into today. Breadth surface, NOT a mastery surface — it grades nothing and
 * emits no evidence, because reading a list is not learning and recording it
 * as such would hand Practice Hub a lie.
 */
export type ShowcasePayload = {
  /** One short framing line. Not a goal list. */
  intro: string;
  clusters: ShowcaseCluster[];
};

export type MeetCardPayload = {
  fr: string;
  en?: string;
  title?: string;
  highlights?: {
    text: string;
    itemId?: string;
  }[];
  tts?: boolean;
};

/**
 * A negation made visible as what it is: two halves that open around a verb.
 *
 * French negation is the first thing in this course that is NOT a chunk. ne and
 * pas are one move, they are never adjacent, and the thing between them changes
 * every time. Shown as prose it reads as a rule to memorise; shown as
 * "je ne suis pas" on a single pill it teaches the opposite of the truth, which
 * is that the learner has a fourth block to store rather than a frame they can
 * open around anything.
 *
 * So the pieces are authored apart and the renderer keeps them apart. `inside`
 * is the only part that moves between examples, which is the entire lesson:
 *
 *   Je   ne [ suis ]      pas   ici.
 *   Ce   n' [ est ]       pas   ici.
 *   Je   ne [ comprends ] pas.
 *
 * `open` is authored rather than fixed as "ne" because elision is real: ce n'est
 * pas is the same move wearing an apostrophe, and a renderer that hard-coded
 * "ne" would have to lie about it.
 */
export type SplitFrame = {
  /** What comes before the frame opens. "Je", "Ce". */
  lead?: string;
  /** The first half. "ne", or "n'" before a vowel. */
  open: string;
  /** What the frame closes around, and the only part that varies. */
  inside: string;
  /** The second half. "pas". */
  close: string;
  /** What follows the frame. "ici." — may be absent when the frame ends it. */
  trail?: string;
};

export type InsightCardPayload = {
  insightType: InsightType;
  title: string;
  body: string;
  examples?: {
    fr?: string;
    en?: string;
    note?: string;
    /**
     * Draw this example as a split frame instead of a flat line.
     *
     * The parts must reconstruct `fr` exactly — `validateContent` checks it —
     * so the picture can never drift from the sentence it claims to be showing.
     */
    frame?: SplitFrame;
    /**
     * Draw this example as pieces instead of a flat line.
     *
     * For the lesson whose whole thesis is that words travel together, a card
     * that SAYS "words come in small packages" and then prints four italic
     * lines is arguing against itself. Declaring the pieces lets the card use
     * the same chips the lessons draw, so "un café is one thing" is shown
     * rather than asserted.
     *
     * Also carries the package INSIDE a sentence: ["Je voudrais", "un café"]
     * renders two chips, which is where a learner actually needs to recognise
     * the unit. Like `frame`, the parts must reconstruct `fr` exactly.
     */
    pieces?: string[];
  }[];
};

export type FillWithTrapsPayload = {
  prompt: string;
  sentenceBefore?: string;
  sentenceAfter?: string;
  blankCount?: number;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    /** Learner-facing explanatory copy. NEVER a machine grading signal. */
    trapReason?: string;
    /**
     * MACHINE-ONLY grading tag for this authored trap (never learner-facing).
     *
     * `trapReason` is prose written for a human; deriving a taxonomy code from it
     * — or from the option text — would be a guess. This states the code
     * directly. Only valid on an INCORRECT option, and never `correct` /
     * `accepted_variant`. When absent the conservative default is `wrong_item`.
     *
     * A register trap (`je veux` for `je voudrais`) is `wrong_register`: the
     * learner produced real, comprehensible French in the wrong register. It is
     * still learner-attributed and admitted — it is not a content defect, not a
     * blocked form, and not a system error.
     */
    learningErrorTag?: ErrorTagCode;
  }[];
  answer: string[];
  reveal: AnswerRevealPayload;
};

export type WeaveType =
  | "supported"
  | "mid"
  | "context"
  | "open";

export type WeavePayload = {
  weaveType: WeaveType;
  prompt: string;
  context?: string;
  suggestedPieces?: {
    text: string;
    itemId?: string;
    required?: boolean;
    // Short learner-facing role for the piece (e.g. "polite request",
    // "noun package"). Shown only inside the Weave hint ladder, never by default.
    label?: string;
    /**
     * MACHINE-ONLY support classification (never learner-facing).
     *
     * Defaults to `optional_hint`: a piece the learner must ASK for, which maps
     * to hint rung 1 and scopes the attempt to Supported only when actually used.
     * `weaveType: "supported"`, `required: true` and the mere existence of a hint
     * button do NOT prove support was visible at attempt time, so none of them is
     * read as constitutive.
     *
     * `constitutive` means the support is part of the task: visible from first
     * render, never hidden behind "Need a hint?", and therefore permanently
     * scoping the attempt to Supported. A constitutive piece MUST carry an
     * `itemId`, and its presence is declared to the admission resolver — if the
     * screen reports it was not actually rendered, the attempt is quarantined as
     * a UI-flow defect rather than credited.
     */
    supportRole?: "constitutive" | "optional_hint";
    /**
     * This piece is shown for CONTRAST and is not part of the answer.
     *
     * The hint ladder hands out tray pieces as help, in reverse order so a
     * single piece is never copy-ready. A distractor sitting in the same array
     * is therefore not merely unhelpful: it can be the first thing offered,
     * under a label promising it is needed. That shipped on L5, where asking
     * for help with "J'ai une idée." produced "une question".
     *
     * Marking it keeps the authoring intent visible and keeps it out of the
     * rungs. A contrast piece is never a hint, and the guard in
     * `hintPieces.test.ts` requires every UNMARKED piece to appear in an
     * authored answer.
     */
    contrast?: boolean;
  }[];
  expectedAnswers: string[];
  acceptedAlternatives?: string[];
  naturalAlternatives?: (string | NaturalAlternative)[];
  // Optional second hint rung: a cloze shape (e.g. "Bonjour, je voudrais ___,
  // s'il vous plaît.") shown only after the learner asks for more help.
  hintCloze?: string;
  reveal: NaturalRevealPayload;
  validationMode?: ValidationMode;
};

export type SayItYourWayPayload = {
  situation: string;
  communicativeGoal: string;
  suggestedPieces?: {
    text: string;
    itemId?: string;
    optional?: boolean;
  }[];
  /**
   * The first rung of help: where to aim, with no French in it.
   *
   * Say It's hint used to be one tap that put every suggested piece on screen
   * at once. On a screen whose pieces include "je ne suis pas" and "je ne
   * comprends pas", that is most of two complete answers handed over to a
   * learner who only wanted a nudge — and free production is the one place
   * where being handed the pieces changes what the exercise is.
   *
   * So this rung points at the MOVE and never at the words. Optional: when a
   * screen does not author one, the ladder still starts with a piece count
   * rather than the pieces, so no lesson has to change for the dump to stop.
   */
  hintDirection?: string;
  answerBands?: {
    minimalAcceptable?: string[];
    good?: string[];
    natural?: string[];
  };
  modelAnswer?: string;
  /**
   * Other answers that genuinely satisfy THIS situation, authored per screen.
   *
   * A Say It prompt can name two honest exits — "say no, or say you did not
   * follow" — and then hold one model answer. The reveal used to read the
   * learner's attempt against that single sentence, so a learner who took the
   * second exit with a sentence the lesson itself teaches was told, in effect,
   * that nothing of their meaning landed. That is not a grader defect: the
   * shared component check is doing exactly what it is asked. It is a missing
   * declaration.
   *
   * Authored, never inferred. Each entry must be a real answer to the authored
   * scene, and acceptance is not equivalence: the reveal still shows what each
   * one does differently, so "That works" never becomes "these all mean the
   * same thing".
   */
  acceptedAlternatives?: string[];
  reveal: NaturalRevealPayload;
  validationMode?: ValidationMode;
};

export type RecapPayload = {
  title?: string;
  lines: string[];
  piecesUsed?: string[];
  nextLabel?: string;
};

/**
 * One step inside a lesson activity chain.
 *
 * Steps are REAL screens, not a parallel mini-format. That is the whole design:
 * evidence identity in this repo is `lessonId/screenId`, so a step keeps its own
 * id, its own targets and its own payload, and therefore records exactly the
 * evidence it would have recorded standing alone. Nothing about grading,
 * attribution or event shape changes when a screen moves into a chain.
 */
export type ActivityChainStep =
  | MeetCardScreen
  | FillWithTrapsScreen
  | WeaveScreen
  | SayItYourWayScreen;

export type ActivityChainPayload = {
  /** The single moment every step belongs to. Shown once, above all of them. */
  intro: string;
  steps: ActivityChainStep[];
};

/**
 * Two to four connected actions that form ONE pedagogical thought: notice then
 * choose then produce, or attempt then contrast then repair then reproduce.
 *
 * The chain itself is orchestration only. It grades nothing, and it records
 * nothing — every event comes from a step. `targetItemIds` is the union of its
 * steps' targets purely so the existing treatment validation, which walks
 * `screen.targetItemIds` across the union, still covers material that now sits
 * one level down.
 */
export type ActivityChainScreen = {
  id: string;
  type: "activity-chain";
  targetItemIds?: string[];
  evidenceTargetItemIds?: undefined;
  weakPointTags?: WeakPointTag[];
  payload: ActivityChainPayload;
};

export type ShowcaseScreen = {
  id: string;
  type: "showcase";
  /**
   * Present only to keep `LessonScreen` uniform for the many consumers that
   * read `screen.targetItemIds` across the union. A showcase MUST leave both
   * undefined: it grades nothing and emits no evidence, so declaring targets
   * would claim credit for scrolling. That is asserted in showcase.test.ts
   * rather than expressed in the type, because a narrower type here would force
   * every existing consumer to narrow for a case that never occurs.
   */
  targetItemIds?: undefined;
  evidenceTargetItemIds?: undefined;
  weakPointTags?: WeakPointTag[];
  payload: ShowcasePayload;
};

/**
 * One row of a pattern reel: a French surface and what it means.
 *
 * Both sides are authored. Nothing here is derived from the registry, because
 * the reel's job is to be READ, and a row the learner cannot read is worse than
 * a shorter reel.
 */
export type PatternReelRow = {
  fr: string;
  en: string;
};

/**
 * A slow reel of French that shows a pattern instead of asserting one.
 *
 * TWO MODES, one surface, because they are the same idea seen from either end:
 *
 *   no `stem`   the familiar-words reel. Two columns drift past each other and
 *               the learner recognises French they already understand. This is
 *               the first taste's oldest and best beat.
 *   with `stem` the pattern reveal. The stem holds still while the phrase
 *               beside it changes, so the learner SEES that one shape they own
 *               carries many different requests.
 *
 * `rows` carry FULL phrases, never bare nouns, in the stem mode. "un café" and
 * "une pizza" rotate whole; showing "café" and "pizza" against a fixed stem
 * would teach a plug-and-play grammar that French does not have.
 *
 * Grades nothing, emits no evidence, has no targets — the same contract as a
 * showcase, and for the same reason: watching is not producing.
 */
export type PatternReelPayload = {
  /** The short line above the reel. */
  title: string;
  /** Optional framing under the title, before the reel starts. */
  body?: string;
  /** Held still beside the rotating column. Omit for a plain two-column reel. */
  stem?: string;
  /** At least three rows, or there is no pattern to see. */
  rows: readonly PatternReelRow[];
  /** The short "why it works" note under the reel. */
  note?: string;
};

export type PatternReelScreen = {
  id: string;
  type: "pattern-reel";
  /** Never set, for the same reason a showcase never sets them. */
  targetItemIds?: undefined;
  evidenceTargetItemIds?: undefined;
  weakPointTags?: WeakPointTag[];
  payload: PatternReelPayload;
};

export type MeetCardScreen = {
  id: string;
  type: "meet-card";
  targetItemIds?: string[];
  /**
   * MACHINE-ONLY narrowing of which targets receive evidence from this screen
   * (never learner-facing, never rendered).
   *
   * `targetItemIds` answers "what does this screen involve?"; a frame word can
   * legitimately appear there because it surrounds the blank. This answers the
   * narrower question "what did the learner's action actually demonstrate?".
   * Crediting the whole frame for a one-slot choice would inflate recognition
   * evidence for items the learner never chose.
   *
   * When absent, evidence targets fall back to `targetItemIds`. When present it
   * must be a non-empty, duplicate-free SUBSET of `targetItemIds`, and every
   * member must resolve through the canonical runtime item boundary — no fixture
   * alias, no surface-text lookup, no fuzzy match.
   */
  evidenceTargetItemIds?: string[];
  weakPointTags?: WeakPointTag[];
  payload: MeetCardPayload;
};

export type InsightCardScreen = {
  id: string;
  type: "insight-card";
  targetItemIds?: string[];
  /**
   * MACHINE-ONLY narrowing of which targets receive evidence from this screen
   * (never learner-facing, never rendered).
   *
   * `targetItemIds` answers "what does this screen involve?"; a frame word can
   * legitimately appear there because it surrounds the blank. This answers the
   * narrower question "what did the learner's action actually demonstrate?".
   * Crediting the whole frame for a one-slot choice would inflate recognition
   * evidence for items the learner never chose.
   *
   * When absent, evidence targets fall back to `targetItemIds`. When present it
   * must be a non-empty, duplicate-free SUBSET of `targetItemIds`, and every
   * member must resolve through the canonical runtime item boundary — no fixture
   * alias, no surface-text lookup, no fuzzy match.
   */
  evidenceTargetItemIds?: string[];
  weakPointTags?: WeakPointTag[];
  payload: InsightCardPayload;
};

export type FillWithTrapsScreen = {
  id: string;
  type: "fill-with-traps";
  targetItemIds?: string[];
  /**
   * MACHINE-ONLY narrowing of which targets receive evidence from this screen
   * (never learner-facing, never rendered).
   *
   * `targetItemIds` answers "what does this screen involve?"; a frame word can
   * legitimately appear there because it surrounds the blank. This answers the
   * narrower question "what did the learner's action actually demonstrate?".
   * Crediting the whole frame for a one-slot choice would inflate recognition
   * evidence for items the learner never chose.
   *
   * When absent, evidence targets fall back to `targetItemIds`. When present it
   * must be a non-empty, duplicate-free SUBSET of `targetItemIds`, and every
   * member must resolve through the canonical runtime item boundary — no fixture
   * alias, no surface-text lookup, no fuzzy match.
   */
  evidenceTargetItemIds?: string[];
  weakPointTags?: WeakPointTag[];
  payload: FillWithTrapsPayload;
};

export type WeaveScreen = {
  id: string;
  type: "weave";
  targetItemIds?: string[];
  /**
   * MACHINE-ONLY narrowing of which targets receive evidence from this screen
   * (never learner-facing, never rendered).
   *
   * `targetItemIds` answers "what does this screen involve?"; a frame word can
   * legitimately appear there because it surrounds the blank. This answers the
   * narrower question "what did the learner's action actually demonstrate?".
   * Crediting the whole frame for a one-slot choice would inflate recognition
   * evidence for items the learner never chose.
   *
   * When absent, evidence targets fall back to `targetItemIds`. When present it
   * must be a non-empty, duplicate-free SUBSET of `targetItemIds`, and every
   * member must resolve through the canonical runtime item boundary — no fixture
   * alias, no surface-text lookup, no fuzzy match.
   */
  evidenceTargetItemIds?: string[];
  weakPointTags?: WeakPointTag[];
  payload: WeavePayload;
};

export type SayItYourWayScreen = {
  id: string;
  type: "say-it-your-way";
  targetItemIds?: string[];
  /**
   * MACHINE-ONLY narrowing of which targets receive evidence from this screen
   * (never learner-facing, never rendered).
   *
   * `targetItemIds` answers "what does this screen involve?"; a frame word can
   * legitimately appear there because it surrounds the blank. This answers the
   * narrower question "what did the learner's action actually demonstrate?".
   * Crediting the whole frame for a one-slot choice would inflate recognition
   * evidence for items the learner never chose.
   *
   * When absent, evidence targets fall back to `targetItemIds`. When present it
   * must be a non-empty, duplicate-free SUBSET of `targetItemIds`, and every
   * member must resolve through the canonical runtime item boundary — no fixture
   * alias, no surface-text lookup, no fuzzy match.
   */
  evidenceTargetItemIds?: string[];
  weakPointTags?: WeakPointTag[];
  payload: SayItYourWayPayload;
};

export type NaturalRevealScreen = {
  id: string;
  type: "natural-reveal";
  targetItemIds?: string[];
  /**
   * MACHINE-ONLY narrowing of which targets receive evidence from this screen
   * (never learner-facing, never rendered).
   *
   * `targetItemIds` answers "what does this screen involve?"; a frame word can
   * legitimately appear there because it surrounds the blank. This answers the
   * narrower question "what did the learner's action actually demonstrate?".
   * Crediting the whole frame for a one-slot choice would inflate recognition
   * evidence for items the learner never chose.
   *
   * When absent, evidence targets fall back to `targetItemIds`. When present it
   * must be a non-empty, duplicate-free SUBSET of `targetItemIds`, and every
   * member must resolve through the canonical runtime item boundary — no fixture
   * alias, no surface-text lookup, no fuzzy match.
   */
  evidenceTargetItemIds?: string[];
  weakPointTags?: WeakPointTag[];
  payload: NaturalRevealPayload;
};

export type RecapScreen = {
  id: string;
  type: "recap";
  targetItemIds?: string[];
  /**
   * MACHINE-ONLY narrowing of which targets receive evidence from this screen
   * (never learner-facing, never rendered).
   *
   * `targetItemIds` answers "what does this screen involve?"; a frame word can
   * legitimately appear there because it surrounds the blank. This answers the
   * narrower question "what did the learner's action actually demonstrate?".
   * Crediting the whole frame for a one-slot choice would inflate recognition
   * evidence for items the learner never chose.
   *
   * When absent, evidence targets fall back to `targetItemIds`. When present it
   * must be a non-empty, duplicate-free SUBSET of `targetItemIds`, and every
   * member must resolve through the canonical runtime item boundary — no fixture
   * alias, no surface-text lookup, no fuzzy match.
   */
  evidenceTargetItemIds?: string[];
  weakPointTags?: WeakPointTag[];
  payload: RecapPayload;
};

export type LessonScreen =
  | ActivityChainScreen
  | ShowcaseScreen
  | PatternReelScreen
  | MeetCardScreen
  | InsightCardScreen
  | FillWithTrapsScreen
  | WeaveScreen
  | SayItYourWayScreen
  | NaturalRevealScreen
  | RecapScreen;

export type LessonPhase =
  | "first-step"
  | "first-ascent"
  | "higher-path"
  | "ridge"
  | "summit-gate"
  | "descent"
  | "open-path";

export type MonolingualMode =
  | "english-guided"
  | "french-first-signals"
  | "mixed-french"
  | "mostly-french"
  | "french-led";

/**
 * The lesson's primary pedagogical job in the learner's progression — the
 * SECOND of two independent axes, and not derivable from the first.
 *
 * `primaryArchetype` / `secondaryArchetype` answer *"what instructional or
 * linguistic engine is this lesson built around?"*. `journeyRole` answers
 * *"what job does this lesson perform in the learner's progression?"*. Neither
 * axis maps onto the other: `chunk-natural-speech` currently ships as
 * `standard`, `doorway` AND `integration`. Never derive one from the other, and
 * do not read it off a screen type or an acquisition item's status either.
 *
 * Optional by design. Absence is meaningful for L0, which is pre-curriculum
 * bootstrap and sits deliberately outside the five roles — there is no sixth
 * `bootstrap` value, and no `hybrid`. Optionality is also what keeps a new
 * lesson authorable before its role is ratified.
 *
 * DECLARATIVE ONLY. The canonical per-role active-new budgets (doorway 1–2 ·
 * standard 1–4 · integration 0 · review 0 · milestone 0–3) are NOT enforced
 * here: machine checking depends on the separate lesson-level
 * acquisition-responsibility derivation, which does not exist yet.
 */
export type JourneyRole =
  | "doorway"
  | "standard"
  | "integration"
  | "review"
  | "milestone";

export type LessonArchetype =
  | "architecture-verb"
  | "gateway-time-mood"
  | "pronoun-particle"
  | "pattern-transfer-verb"
  | "chunk-natural-speech"
  | "thematic-context"
  | "review-integration"
  | "summit-milestone";

export type PracticePoolConfig = {
  build?: string[];
  stretch?: string[];
  challenge?: string[];
};

export type DailyReviewHook = {
  id: string;
  type:
    | "recall"
    | "micro-contrast"
    | "sound-trap"
    | "tiny-reading"
    | "mini-weave"
    | "say-it-mini";
  targetItemIds: string[];
  weakPointTags?: WeakPointTag[];
};

export type MonLexiqueEntry = {
  itemId: string;
  displayText: string;
  type: LearningItemType;
  meaning?: string;
  examples?: {
    fr: string;
    en?: string;
  }[];
  relatedItemIds?: string[];
};

export type OfflineBehavior = {
  canRunOffline: boolean;
  fallbackMode?:
    | "full"
    | "limited-reveal"
    | "model-answer-only"
    | "disabled-when-offline";
};

export type Lesson = {
  id: string;
  version: "v1";
  number: number;
  title: string;

  phase: LessonPhase;
  monolingualMode: MonolingualMode;
  primaryArchetype: LessonArchetype;
  secondaryArchetype?: LessonArchetype;
  /** Journey-role axis — independent of the archetypes above. Unset for L0. */
  journeyRole?: JourneyRole;
  /**
   * The distinct NEW learner-facing active production demands introduced by
   * THIS lesson (PRJ-015 IC-002) — the source of truth for active-new.
   *
   * Includes a genuine promotion of an already-known item from supported or
   * recognition to active production. Excludes carryover, recycled use,
   * recognition-only exposure, supported-only use, wholes already covered by
   * `acquisitionComponents`, and `acquisitionLink` linked-only identities.
   *
   * This is NOT every item the lesson uses, targets, evidences or displays.
   * Presentation fields — `targetItemIds`, `evidenceTargetItemIds`,
   * `suggestedPieces`, screen type — are NOT the source of truth and may only
   * raise review against this declaration, never replace it.
   *
   * `[]` means adjudicated and explicitly zero (an Integration lesson that
   * genuinely introduces nothing). Absence means unadjudicated or legacy — the
   * two are deliberately distinguishable. Optional in the schema; every shipped
   * v1 lesson L0–L15 nonetheless declares it.
   *
   * Structure is enforced by `content/lessons/acquisitionDemands.ts`.
   */
  acquisitionDemandItemIds?: readonly string[];

  estimatedMinutes: number;
  canDo: string;
  whyItExists: string;

  prerequisites: string[];
  learningItems: LearningItem[];
  screens: LessonScreen[];

  practicePool?: PracticePoolConfig;
  dailyReviewHooks?: DailyReviewHook[];
  monLexiqueEntries?: MonLexiqueEntry[];
  offlineBehavior?: OfflineBehavior;

  designNotes?: string[];
  qaChecks?: string[];
};
