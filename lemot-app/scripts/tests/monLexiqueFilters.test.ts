/**
 * Mon Lexique remembers, which means you can look things up in it.
 *
 * The surface was built with no filters on purpose, and that was right while it
 * held a handful of words. By L10 it holds enough that "where is the one I keep
 * getting wrong" has no answer except scrolling, and a memory you cannot query
 * is a list.
 *
 * These pin the two properties that matter about the filters: they NARROW and
 * nothing else -- no reordering, no re-banding, no clock of their own -- and an
 * empty result never tells a learner with a full lexique that they have not
 * started yet.
 */
import { describe, test, assert, assertEqual } from "./harness";
import type { MonLexiqueEntry } from "../../content/learning-engine/mon-lexique";
import type { MonLexiqueBand } from "../../components/learning-engine/monLexiqueCopy";
import {
  MON_LEXIQUE_FILTERS,
  MON_LEXIQUE_FILTER_COPY,
  RECENTLY_MET_DAYS,
  filterMonLexiqueEntries,
  monLexiqueEmptyLine,
  type BandedEntry,
} from "../../components/learning-engine/monLexiqueFilters";

const DAY = 24 * 60 * 60 * 1000;
const NOW = 1_700_000_000_000;

const entry = (
  itemId: string,
  band: MonLexiqueBand,
  lastSeenAt: number | null,
): BandedEntry => ({
  band,
  entry: {
    itemId,
    fr: itemId,
    en: itemId,
    status: band === "revisit" ? "weak" : "added",
    lastSeenAt,
    lastProducedAt: null,
    practiceEligibility: "none",
    productionClaim: "none",
  } as unknown as MonLexiqueEntry,
});

const ALL: BandedEntry[] = [
  entry("a-yours-today", "yours", NOW - 1 * DAY),
  entry("b-becoming-old", "becoming", NOW - 30 * DAY),
  entry("c-revisit-today", "revisit", NOW - 2 * DAY),
  entry("d-met-never-seen", "met", null),
];

describe("the filters narrow and do nothing else", () => {
  test("All is everything, in the order it arrived", () => {
    const out = filterMonLexiqueEntries(ALL, { filter: "all", now: NOW });
    assertEqual(out.length, ALL.length, "All must not drop anything");
    assertEqual(
      out.map((e) => e.entry.itemId).join(","),
      ALL.map((e) => e.entry.itemId).join(","),
      "the selector's order is the only order",
    );
  });

  test("every filter returns a subset of the same list", () => {
    const ids = new Set(ALL.map((e) => e.entry.itemId));
    for (const filter of MON_LEXIQUE_FILTERS) {
      const out = filterMonLexiqueEntries(ALL, {
        filter,
        now: NOW,
        lessonItemIds: new Set(["a-yours-today"]),
      });
      for (const e of out) {
        assert(ids.has(e.entry.itemId), `${filter} invented ${e.entry.itemId}`);
      }
    }
  });

  test("no filter re-bands anything", () => {
    for (const filter of MON_LEXIQUE_FILTERS) {
      const out = filterMonLexiqueEntries(ALL, {
        filter,
        now: NOW,
        lessonItemIds: new Set(["a-yours-today", "c-revisit-today"]),
      });
      for (const e of out) {
        const original = ALL.find((x) => x.entry.itemId === e.entry.itemId);
        assertEqual(e.band, original?.band, `${filter} changed a band`);
      }
    }
  });

  test("Recently met is about the last few days, and a never-seen word is not recent", () => {
    const out = filterMonLexiqueEntries(ALL, { filter: "recent", now: NOW });
    const ids = out.map((e) => e.entry.itemId);
    assert(ids.includes("a-yours-today"), "yesterday counts");
    assert(!ids.includes("b-becoming-old"), `${RECENTLY_MET_DAYS} days ago does not`);
    assert(!ids.includes("d-met-never-seen"), "a null timestamp is not a recent one");
  });

  test("Worth another look selects exactly that band", () => {
    const out = filterMonLexiqueEntries(ALL, { filter: "revisit", now: NOW });
    assertEqual(out.length, 1, "one entry is in that band");
    assertEqual(out[0].entry.itemId, "c-revisit-today", "and it is the one that has not settled");
  });

  test("By lesson with no lesson chosen offers nothing, rather than everything", () => {
    assertEqual(
      filterMonLexiqueEntries(ALL, { filter: "byLesson", now: NOW }).length,
      0,
      "an unchosen lesson must not silently mean all lessons",
    );
  });

  test("By lesson stays inside the lesson asked for", () => {
    const out = filterMonLexiqueEntries(ALL, {
      filter: "byLesson",
      now: NOW,
      lessonItemIds: new Set(["b-becoming-old"]),
    });
    assertEqual(out.length, 1, "only the chosen lesson's word");
    assertEqual(out[0].entry.itemId, "b-becoming-old", "and it is that lesson's word");
  });
});

describe("an empty filter is not an empty app", () => {
  test("no empty line tells a learner to go and start", () => {
    // The exact mistake Practice made with its own modes earlier in this batch:
    // a narrowed view came back empty and the surface said "finish your first
    // lesson" to someone ten lessons in.
    for (const filter of MON_LEXIQUE_FILTERS) {
      if (filter === "all") continue; // All-empty genuinely IS the cold start
      for (const chosen of [true, false]) {
        const line = monLexiqueEmptyLine(filter, chosen);
        assert(
          !/first lesson|start anywhere/i.test(line),
          `${filter} empty line reads as a cold start: "${line}"`,
        );
        assert(line.length > 0, `${filter} must say something`);
      }
    }
  });

  test("the By-lesson line asks for the choice when none has been made", () => {
    assert(
      /pick a lesson/i.test(monLexiqueEmptyLine("byLesson", false)),
      "the learner needs to know what to do next",
    );
  });

  test("every filter has learner-facing copy", () => {
    for (const filter of MON_LEXIQUE_FILTERS) {
      assert(
        (MON_LEXIQUE_FILTER_COPY[filter] ?? "").length > 0,
        `${filter} has no name a learner could read`,
      );
    }
  });

  test("the revisit filter and the revisit band are called the same thing", () => {
    // Two different words for one thing read as two different things.
    assertEqual(
      MON_LEXIQUE_FILTER_COPY.revisit,
      "Worth another look",
      "the filter must be named for the band it selects",
    );
  });
});
