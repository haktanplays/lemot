/**
 * Mon Lexique filters — pure, framework-free, testable.
 *
 * "MON LEXIQUE REMEMBERS." A memory you cannot look things up in is a list, and
 * the surface was explicitly built with no filters at all. That was the right
 * call while it held a handful of words; by L10 it holds enough that "where is
 * the one I keep getting wrong" has no answer except scrolling.
 *
 * Four ways in, and no more. Each answers a question a learner actually asks:
 *
 *   All              everything, in the order the selector already publishes
 *   Recently met     what I have seen lately, for the thing I half-remember
 *   Worth another look  the pieces that have not settled
 *   By lesson        where I met it, which is how people remember words
 *
 * This module NARROWS. It never reorders, never re-bands, never derives
 * mastery, and never reads a clock of its own — the caller passes `now`, the
 * same one the route already reads at its load boundary. A filter that produced
 * a different order would be a second ordering rule, and there is exactly one.
 */
import type { MonLexiqueEntry } from "@/content/learning-engine/mon-lexique";
import type { MonLexiqueBand } from "./monLexiqueCopy";

export type MonLexiqueFilter = "all" | "recent" | "revisit" | "byLesson";

/** The filter row, in order. */
export const MON_LEXIQUE_FILTERS: readonly MonLexiqueFilter[] = Object.freeze([
  "all",
  "recent",
  "revisit",
  "byLesson",
] as const);

/**
 * Learner-facing filter names.
 *
 * "Worth another look" is deliberately the SAME string as the band, because it
 * selects exactly that band. Two different words for one thing would read as
 * two different things.
 */
export const MON_LEXIQUE_FILTER_COPY: Readonly<Record<MonLexiqueFilter, string>> =
  Object.freeze({
    all: "All",
    recent: "Recently met",
    revisit: "Worth another look",
    byLesson: "By lesson",
  });

/** How recent "Recently met" means. A week is one honest sitting-to-sitting gap. */
export const RECENTLY_MET_DAYS = 7;

const DAY_MS = 24 * 60 * 60 * 1000;

export type BandedEntry = { entry: MonLexiqueEntry; band: MonLexiqueBand };

/**
 * Narrow the banded entries to the chosen filter.
 *
 * `byLesson` with no lesson chosen returns nothing, exactly as Practice's
 * By-lesson mode does: an unchosen lesson must not silently mean all lessons.
 * The caller is responsible for keeping the picker on screen so the choice
 * stays reachable — the lesson Practice learned the hard way this batch.
 */
export function filterMonLexiqueEntries(
  entries: readonly BandedEntry[],
  options: {
    filter: MonLexiqueFilter;
    now: number;
    /** Item ids the chosen lesson declares. Empty when no lesson is chosen. */
    lessonItemIds?: ReadonlySet<string>;
  },
): BandedEntry[] {
  const { filter, now, lessonItemIds } = options;
  switch (filter) {
    case "all":
      return [...entries];
    case "recent":
      return entries.filter(
        ({ entry }) =>
          entry.lastSeenAt !== null && now - entry.lastSeenAt <= RECENTLY_MET_DAYS * DAY_MS,
      );
    case "revisit":
      return entries.filter(({ band }) => band === "revisit");
    case "byLesson":
      if (lessonItemIds === undefined || lessonItemIds.size === 0) return [];
      return entries.filter(({ entry }) => lessonItemIds.has(entry.itemId));
  }
}

/**
 * What to say when a filter comes back empty.
 *
 * Never the cold-start line, for the same reason Practice must not use it: a
 * learner with a full lexique who taps a filter has not failed to start the
 * app. The line says what THIS choice holds and leaves every other choice on
 * screen.
 */
export function monLexiqueEmptyLine(filter: MonLexiqueFilter, lessonChosen: boolean): string {
  switch (filter) {
    case "recent":
      return "Nothing from the last few days yet. Everything you have met is still under All.";
    case "revisit":
      return "Nothing is waiting for another look right now.";
    case "byLesson":
      return lessonChosen
        ? "Nothing from this lesson has reached Mon Lexique yet."
        : "Pick a lesson below to see what you met there.";
    case "all":
      return "Your words will appear here as you use them. Start anywhere on your path.";
  }
}
