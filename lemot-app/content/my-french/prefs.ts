/**
 * My French preferences — pure, framework-free, testable.
 *
 * A PERSONAL LEARNING LAYER, not a profile. There is no name, no avatar, no
 * photo, no bio, nothing shared and nothing sent anywhere: two questions about
 * what the learner wants French FOR, kept on the device.
 *
 * What they are allowed to change is deliberately small. The brief draws the
 * line and it is the important one: light context ordering only, and never the
 * curriculum. A learner who says they care about cafés sees the café Context
 * Cards first. They do not get a different grammar sequence, a reordered path,
 * or a lesson somebody else does not get -- what French you meet when is a
 * teaching decision, and a preference toggle is not qualified to make it.
 *
 * So `contexts` reaches exactly one thing: the ORDER of Context Card sets, an
 * input surface where nothing is scheduled and nothing is scored. That is the
 * whole blast radius, and `myFrench.test.ts` keeps it there.
 */

/** Why French. One answer -- this is a reason, not a checklist. */
export type FrenchFocus =
  | "travel"
  | "work"
  | "everyday"
  | "people"
  | "culture"
  | "study";

export const FRENCH_FOCUSES: readonly FrenchFocus[] = Object.freeze([
  "travel",
  "work",
  "everyday",
  "people",
  "culture",
  "study",
] as const);

export const FRENCH_FOCUS_COPY: Readonly<Record<FrenchFocus, string>> = Object.freeze({
  travel: "Travel",
  work: "Work",
  everyday: "Everyday life",
  people: "People I know",
  culture: "Culture",
  study: "Study",
});

/** Where French is going to happen. Several can be true at once. */
export type FrenchContext =
  | "cafes"
  | "hotels"
  | "travel"
  | "getting-around"
  | "meeting-people"
  | "work"
  | "errands";

export const FRENCH_CONTEXTS: readonly FrenchContext[] = Object.freeze([
  "cafes",
  "hotels",
  "travel",
  "getting-around",
  "meeting-people",
  "work",
  "errands",
] as const);

export const FRENCH_CONTEXT_COPY: Readonly<Record<FrenchContext, string>> = Object.freeze({
  cafes: "Cafés and restaurants",
  hotels: "Hotels",
  travel: "Travelling",
  "getting-around": "Getting around",
  "meeting-people": "Meeting people",
  work: "Work",
  errands: "Everyday errands",
});

export type MyFrenchPrefs = {
  readonly focus: FrenchFocus | null;
  readonly contexts: readonly FrenchContext[];
};

export const EMPTY_PREFS: MyFrenchPrefs = Object.freeze({ focus: null, contexts: Object.freeze([]) });

/** Choose a focus, or clear it by choosing the same one again. */
export function withFocus(prefs: MyFrenchPrefs, focus: FrenchFocus): MyFrenchPrefs {
  return Object.freeze({ ...prefs, focus: prefs.focus === focus ? null : focus });
}

/** Add or remove one context. Order follows the canonical list, not click order. */
export function withContextToggled(
  prefs: MyFrenchPrefs,
  context: FrenchContext,
): MyFrenchPrefs {
  const has = prefs.contexts.includes(context);
  const next = has
    ? prefs.contexts.filter((c) => c !== context)
    : FRENCH_CONTEXTS.filter((c) => c === context || prefs.contexts.includes(c));
  return Object.freeze({ ...prefs, contexts: Object.freeze(next) });
}

/** Parse stored JSON, discarding anything that is not a known value. */
export function parsePrefs(raw: string | null): MyFrenchPrefs {
  if (raw === null) return EMPTY_PREFS;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return EMPTY_PREFS;
    const record = parsed as Record<string, unknown>;
    const focus = FRENCH_FOCUSES.find((f) => f === record.focus) ?? null;
    const rawContexts = Array.isArray(record.contexts) ? record.contexts : [];
    const contexts = FRENCH_CONTEXTS.filter((c) => rawContexts.includes(c));
    return Object.freeze({ focus, contexts: Object.freeze(contexts) });
  } catch {
    return EMPTY_PREFS;
  }
}

/**
 * Order Context Card sets so the learner's chosen situations come first.
 *
 * STABLE, and a reordering only: nothing is hidden, nothing is unlocked, and a
 * learner with no preferences set sees exactly the authored order. This is the
 * only place preferences reach anything at all.
 */
export function orderByContexts<T extends { contextTags?: readonly FrenchContext[] }>(
  sets: readonly T[],
  contexts: readonly FrenchContext[],
): T[] {
  if (contexts.length === 0) return [...sets];
  const matches = (set: T) => (set.contextTags ?? []).some((t) => contexts.includes(t));
  return [...sets.filter(matches), ...sets.filter((s) => !matches(s))];
}
