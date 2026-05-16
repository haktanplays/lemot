export const WEAK_POINT_TAGS = [
  "avoir-vs-etre",
  "j-ai-vs-je-suis",
  "negation",
  "ne-pas",
  "ne-plus",
  "y",
  "en",
  "y-en-contrast",
  "object-pronoun-le-la-les",
  "lui-leur",
  "pronoun-order",
  "aller-future",
  "passe-compose",
  "imparfait",
  "past-contrast",
  "conditional-softness",
  "subjunctive-doorway",
  "imperative",
  "politeness",
  "natural-speech",
  "elision",
  "liaison",
  "silent-letters",
  "gender",
  "articles",
  "partitives",
  "prepositions",
] as const;

export type WeakPointTag = (typeof WEAK_POINT_TAGS)[number];

export function isWeakPointTag(value: string): value is WeakPointTag {
  return (WEAK_POINT_TAGS as readonly string[]).includes(value);
}
