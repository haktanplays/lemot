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
 * performs NO id remapping anywhere — persisted history is never rewritten, and
 * it deliberately does not touch the pre-existing café dual-id debt.
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

export type NaturalRevealPayload = {
  modelAnswer?: string;
  ifCorrect?: string;
  ifCorrectButFlat?: string;
  ifUnderstandableButWrong?: string;
  ifWrongStructure?: string;
  ifTooDirect?: string;
  ifMissingTargetPiece?: string;
  ifBetterThanExpected?: string;
  naturalAlternatives?: string[];
  explanation?: string;
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

export type InsightCardPayload = {
  insightType: InsightType;
  title: string;
  body: string;
  examples?: {
    fr?: string;
    en?: string;
    note?: string;
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
  }[];
  expectedAnswers: string[];
  acceptedAlternatives?: string[];
  naturalAlternatives?: string[];
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
  answerBands?: {
    minimalAcceptable?: string[];
    good?: string[];
    natural?: string[];
  };
  modelAnswer?: string;
  reveal: NaturalRevealPayload;
  validationMode?: ValidationMode;
};

export type RecapPayload = {
  title?: string;
  lines: string[];
  piecesUsed?: string[];
  nextLabel?: string;
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
