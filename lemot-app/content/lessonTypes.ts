import type { WeakPointTag } from "./weakPointTags";

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
  | "cognate";

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
    trapReason?: string;
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
  }[];
  expectedAnswers: string[];
  acceptedAlternatives?: string[];
  naturalAlternatives?: string[];
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
  weakPointTags?: WeakPointTag[];
  payload: MeetCardPayload;
};

export type InsightCardScreen = {
  id: string;
  type: "insight-card";
  targetItemIds?: string[];
  weakPointTags?: WeakPointTag[];
  payload: InsightCardPayload;
};

export type FillWithTrapsScreen = {
  id: string;
  type: "fill-with-traps";
  targetItemIds?: string[];
  weakPointTags?: WeakPointTag[];
  payload: FillWithTrapsPayload;
};

export type WeaveScreen = {
  id: string;
  type: "weave";
  targetItemIds?: string[];
  weakPointTags?: WeakPointTag[];
  payload: WeavePayload;
};

export type SayItYourWayScreen = {
  id: string;
  type: "say-it-your-way";
  targetItemIds?: string[];
  weakPointTags?: WeakPointTag[];
  payload: SayItYourWayPayload;
};

export type NaturalRevealScreen = {
  id: string;
  type: "natural-reveal";
  targetItemIds?: string[];
  weakPointTags?: WeakPointTag[];
  payload: NaturalRevealPayload;
};

export type RecapScreen = {
  id: string;
  type: "recap";
  targetItemIds?: string[];
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
