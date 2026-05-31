/**
 * Executable content contract — types (v0.1).
 *
 * A small, parallel "contract-driven content" experiment that lives ALONGSIDE
 * the existing runtime lesson system (content/lessonTypes.ts, content/lessons/v1).
 * Nothing here is wired into the live renderer; these are validateable fixtures
 * that prove the architecture on one real lesson (L1).
 *
 * North star: Components render. Engines decide. Contracts constrain.
 * Events remember. AI explains but never overrides.
 *
 * Naming rule: source-provenance fields use generic hygiene naming only.
 * No specific third-party source / method / tool name appears in any field,
 * value, or comment.
 */

// ── Shared ids ───────────────────────────────────────────────────────────────

/**
 * Canonical learning-engine item id, colon-namespaced (e.g. "chunk:bonjour").
 * A plain string alias for now — documents intent without locking in branded
 * ids. A branded id can come later if the registry grows enough to need it.
 */
export type ItemId = string;

// ── Source hygiene (generic, source-agnostic) ──────────────────────────────

export type SourceRisk = "none" | "low" | "medium" | "high";

export type ReviewStatus = "passed" | "pending" | "blocked";

export type SourceHygiene = {
  /** Generic provenance label. Keep source-agnostic. */
  origin: "original" | "derived" | "public-domain" | "reference";
  thirdPartySourceDerived: boolean;
  disallowedDerivative: boolean;
  sourceRisk: SourceRisk;
  reviewStatus: ReviewStatus;
};

// ── Presets ────────────────────────────────────────────────────────────────

export type PresetId =
  | "early_active_chunk"
  | "contextual_noun_phrase"
  | "culture_social_ritual"
  | "sound_pattern";

export type Ownership = "active" | "supported" | "recognitionOnly" | "recycled";

export type OldItemBudget = "full_weight" | "reduced_weight" | "minimal_weight";

export type PresetDefinition = {
  id: PresetId;
  /** Default ownership for an item carrying this preset. */
  ownership: Ownership;
  lessonProduction: boolean;
  contextCards: boolean;
  monLexiqueVisible: boolean;
  practicePool: boolean;
  oldItemBudget: OldItemBudget;
};

// ── Items ──────────────────────────────────────────────────────────────────

export type PronunciationProfile = {
  respelling?: string;
  ipa?: string;
  /** Exact text handed to TTS. Must never contain blank placeholders. */
  audioText: string;
  soundNotes?: string[];
};

export type RawItem = {
  /** Colon-namespaced id, e.g. "chunk:bonjour". */
  id: ItemId;
  preset: PresetId;
  text: {
    fr: string;
    en: string;
  };
  firstIntroducedIn: string;
  tags: string[];
  pronunciationProfile?: PronunciationProfile;
  sourceHygiene: SourceHygiene;
};

// ── Lesson contract ─────────────────────────────────────────────────────────

export type PromptFadeLevel = "PF0" | "PF1" | "PF2" | "PF3";

export type OperationId =
  | "recognition"
  | "fill"
  | "build"
  | "register_switch"
  | "context_chain"
  | "free_conversation"
  | "open_production";

export type ValidationMode =
  | "exact-or-alternative"
  | "expected-bank"
  | "model-answer-only";

export type LessonContract = {
  id: string;
  title: string;
  contractSchemaVersion: string;
  versions: {
    contentVersion: string;
    lessonVersion: string;
    itemRegistryVersion: string;
    errorTaxonomyVersion: string | null;
    appVersion: string | null;
  };
  goal: {
    canDo: string;
    notGoal: string[];
  };
  items: {
    activeNew: ItemId[];
    supported: ItemId[];
    recognitionOnly: ItemId[];
    recycled: ItemId[];
  };
  production: {
    allowedProduction: ItemId[];
    blockedProduction: ItemId[];
    allowedOperations: OperationId[];
    blockedOperations: OperationId[];
  };
  supportFade: {
    promptFadeMax: PromptFadeLevel;
  };
  answerPolicy: {
    defaultValidationMode: ValidationMode;
    allowAlternatives: boolean;
    /** North star: AI may explain, but never overrides the contract. */
    aiMayExplain: boolean;
    aiMayOverride: boolean;
  };
  sourceHygiene: SourceHygiene;
};

// ── Exercise blueprints (discriminated union by operation) ───────────────────

export type ContextChainStep = {
  prompt: string;
  answer: string;
};

/** Fields shared by every exercise variant. */
type ExerciseBase = {
  id: string;
  lessonId: string;
  prompt?: string;
  /** Canonical French target answer (revealed / TTS-bound). */
  targetText?: string;
  /** Item ids the answer exercises — used for ownership checks. */
  targetItemIds: ItemId[];
  validationMode?: ValidationMode;
};

/** Learner recognizes / selects — no production required. */
export type RecognitionExercise = ExerciseBase & {
  operation: "recognition";
};

/** Learner fills a blank inside a target phrase. */
export type FillExercise = ExerciseBase & {
  operation: "fill";
  blankLabel?: string;
  blankCount?: number;
};

/** Learner assembles the target from pieces. */
export type BuildExercise = ExerciseBase & {
  operation: "build";
  tiles?: string[];
};

/** Learner moves a too-direct form to a polite one — both forms required. */
export type RegisterSwitchExercise = ExerciseBase & {
  operation: "register_switch";
  directForm: string;
  politeForm: string;
};

/** Learner works through an ordered prompt → answer chain. */
export type ContextChainExercise = ExerciseBase & {
  operation: "context_chain";
  steps: ContextChainStep[];
};

export type ExerciseBlueprint =
  | RecognitionExercise
  | FillExercise
  | BuildExercise
  | RegisterSwitchExercise
  | ContextChainExercise;

// ── Validation findings ──────────────────────────────────────────────────────

export type FindingSeverity = "error" | "warning" | "info";

export type FindingCode =
  // referential / per-item / per-exercise checks
  | "unknown_item_id"
  | "invalid_preset"
  | "recognition_only_used_as_production_target"
  | "blocked_operation_used"
  | "target_answer_contains_unowned_item"
  | "source_hygiene_blocked"
  | "tts_audio_text_contains_placeholder"
  | "target_answer_not_in_allowed_production"
  | "operation_not_declared_allowed"
  // contract consistency checks
  | "item_bucket_overlap"
  | "allowed_production_not_owned"
  | "blocked_production_not_owned"
  | "preset_contract_ownership_mismatch";

export type Finding = {
  severity: FindingSeverity;
  code: FindingCode;
  lessonId?: string;
  exerciseId?: string;
  itemId?: ItemId;
  message: string;
  suggestion?: string;
};

export type ValidationInput = {
  items: Record<ItemId, RawItem>;
  presets: Record<PresetId, PresetDefinition>;
  contracts: LessonContract[];
  exercises: ExerciseBlueprint[];
};
