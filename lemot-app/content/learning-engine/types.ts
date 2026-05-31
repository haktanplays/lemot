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
  id: string;
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
    activeNew: string[];
    supported: string[];
    recognitionOnly: string[];
    recycled: string[];
  };
  production: {
    allowedProduction: string[];
    blockedProduction: string[];
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

// ── Exercise blueprints ──────────────────────────────────────────────────────

export type ContextChainStep = {
  prompt: string;
  answer: string;
};

export type ExerciseBlueprint = {
  id: string;
  lessonId: string;
  operation: OperationId;
  prompt?: string;
  /** Canonical French target answer (revealed / TTS-bound). */
  targetText?: string;
  /** Item ids the answer exercises — used for ownership checks. */
  targetItemIds: string[];
  /** register_switch only: the too-direct form the learner moves away from. */
  directForm?: string;
  /** register_switch only: the polite target form. */
  politeForm?: string;
  /** context_chain only: ordered prompt→answer steps. */
  steps?: ContextChainStep[];
  validationMode?: ValidationMode;
};

// ── Validation findings ──────────────────────────────────────────────────────

export type FindingSeverity = "error" | "warning" | "info";

export type Finding = {
  severity: FindingSeverity;
  code: string;
  lessonId?: string;
  exerciseId?: string;
  itemId?: string;
  message: string;
  suggestion?: string;
};

export type ValidationInput = {
  items: Record<string, RawItem>;
  presets: Record<PresetId, PresetDefinition>;
  contracts: LessonContract[];
  exercises: ExerciseBlueprint[];
};
