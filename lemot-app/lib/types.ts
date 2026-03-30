// ── Core Types ──

export interface GrammarHowToSay {
  fr: string;
  phonetic: string;
  ipa: string;
  notes: string;
}

export interface GrammarBlockItem {
  fr: string;
  en: string;
  note?: string;
}

export interface GrammarConjugationRow {
  pr: string;
  conj: string;
  en: string;
  pron: string;
}

export interface EtymologyPair {
  fr: string;
  en: string;
  root: string;
}

export type GrammarSection =
  | { type: "intro"; text: string }
  | { type: "tip"; text: string }
  | { type: "culture"; text: string }
  | { type: "block"; label: string; items: GrammarBlockItem[] }
  | { type: "conjugation"; verb: string; rows: GrammarConjugationRow[] }
  | { type: "etymology"; pairs: EtymologyPair[] }
  | { type: "howToSay"; words: GrammarHowToSay[] };

export interface QuickRecall {
  q: string;
  a: string;
  o: string[];
}

export interface Grammar {
  title: string;
  sections: GrammarSection[];
  quickRecall?: QuickRecall;
}

export interface Example {
  fr: string;
  en: string;
  bridge: string;
  note?: string;
}

export interface FillItem {
  s: string;
  a: string;
  o: string[];
  ctx: string;
}

export interface BuildItem {
  c: string[];
  en: string;
  trap?: string[];
}

export interface QuizItem {
  q: string;
  a: string;
  o: string[];
  ctx?: string;
  negative?: boolean;
}

export interface CombineItem {
  hint: string;
  answer: string;
  accept: string[];
}

export interface WeaveItem {
  en: string;
  known: string[];
  sample: string;
}

export interface SayItItem {
  situation: string;
  target: string[];
}

export interface MiniConvConfig {
  topic: string;
  starter: string;
}

// ── Content Enrichment ──

export interface Expression {
  fr: string;
  en: string;
  usage: string; // example sentence or context
  literal?: string; // literal translation if idiomatic
}

export interface GrammarNugget {
  title: string;
  insight: string; // the "aha moment" explanation
  example?: string; // illustrative example
}

export interface FauxAmi {
  fr: string;
  looksLike: string; // English word it resembles
  actualMeaning: string;
  example: string;
}

export interface SoundPattern {
  pattern: string; // e.g. "é- → s-"
  examples: { fr: string; en: string }[];
  rule: string; // explanation of the pattern
}

export type Difficulty = "easy" | "medium" | "hard";

export interface WeaveBlank {
  word: string;
  answer: string;
}

export type ReviewItem =
  | { type: "listen"; audio: string; q: string; a: string; o: string[] }
  | { type: "odd"; q: string; items: string[]; a: string; reason: string }
  | { type: "context"; situation: string; a: string; o: string[] }
  | { type: "fill_ctx"; s: string; a: string; o: string[]; ctx: string }
  | { type: "weave"; en: string; known: string[]; sample: string }
  | { type: "weave"; en: string; blanks: WeaveBlank[]; full: string };

export interface Lesson {
  id: number;
  title: string;
  sub: string;
  icon: string; // icon name as string, resolved at component level
  level: string;
  difficulty: Difficulty;
  grammar: Grammar;
  examples: Example[];
  fillFG: FillItem[];
  fillBlanks: FillItem[];
  buildSentences: BuildItem[];
  quiz: QuizItem[];
  combine: CombineItem[];
  weave: WeaveItem[];
  review: ReviewItem[];
  sayIt: SayItItem[];
  miniConv: MiniConvConfig;
  // Content enrichment
  expressions: Expression[];
  grammarNuggets: GrammarNugget[];
  fauxAmis?: FauxAmi[];
  soundPatterns?: SoundPattern[];
  cultureBite?: string;
  summary: string[]; // "Bugün öğrendiğin" items for end-of-lesson card
}

// ── Dictionary ──
export type Dictionary = Record<string, string>;

// ── Flashcard ──
export interface FlashCard {
  fr: string;
  en: string;
  cat: string;
  ex: string;
  cog: string;
}

// ── Milestone ──
export interface Milestone {
  ids: number[];
  title: string;
  desc: string;
  icon: string;
}

// ── Scenario ──
export interface Scenario {
  id: string;
  label: string;
  icon: string;
  desc: string;
  starter: string;
}

// ── Storage ──
export interface StorageData {
  p: Record<string, boolean>;
  xp: number;
  err: ErrorEntry[];
  dr: DailyReview;
  streak: number;
}

export interface ErrorEntry {
  w: string;
  s: string;
  g: string;
  c: string;
  l: number;
  t: number;
}

export interface DailyReview {
  date: string;
  count: number;
}
