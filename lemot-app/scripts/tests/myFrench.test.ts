/**
 * My French is a personal learning layer, not a profile, and not a dial on the
 * curriculum.
 *
 * Two risks live here and they pull in opposite directions. One is that a
 * "personal" surface quietly becomes a profile: a name, a photo, a streak, a
 * score, something to compare. The other is that a preference toggle starts
 * deciding what French the learner meets, which is a teaching decision and not
 * one a checkbox is qualified to make.
 *
 * So the blast radius is pinned here: preferences reach the ORDER of Context
 * Card sets and nothing else. Nothing is hidden, nothing is unlocked, no lesson
 * moves, and a learner who sets nothing sees exactly the authored order.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  EMPTY_PREFS,
  FRENCH_CONTEXTS,
  FRENCH_CONTEXT_COPY,
  FRENCH_FOCUSES,
  FRENCH_FOCUS_COPY,
  orderByContexts,
  parsePrefs,
  withContextToggled,
  withFocus,
  type FrenchContext,
} from "../../content/my-french/prefs";
import { CONTEXT_CARD_SETS } from "../../content/context-cards/cards";
import {
  ALL_LOCAL_PRIVACY_KEYS,
  LM_CONTEXT_CARDS_KEY,
  LM_MY_FRENCH_KEY,
} from "../../content/learning-engine/local-privacy-inventory";

/**
 * Comments stripped before scanning. Otherwise a file that DOCUMENTS what it
 * refuses to do ("no name, no avatar, no score") fails the test that checks it
 * does not do them, which is the wrong lesson to teach a future reader.
 */
const codeOf = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

const ROUTE = codeOf(readFileSync(join(process.cwd(), "app/(tabs)/my-french.tsx"), "utf8"));

describe("it is a learning layer, not a profile", () => {
  test("nothing on it identifies or ranks a person", () => {
    for (const banned of [
      "avatar",
      "displayName",
      "profilePhoto",
      "streak",
      "XP",
      "leaderboard",
      "Level ",
      "achievement",
    ]) {
      assert(!ROUTE.includes(banned), `My French must not have ${banned}`);
    }
  });

  test("it makes no claim about a backend", () => {
    for (const banned of ["supabase", "fetch(", "sync", "upload", "signIn"]) {
      assert(!ROUTE.includes(banned), `My French must not reference ${banned}`);
    }
    assert(
      ROUTE.includes("stays on this device"),
      "the learner should be told where their answers live",
    );
  });

  test("the data controls are the real ones, reachable at last", () => {
    // Export and delete have worked for some time and were only reachable from
    // a preview shell. A right you have to go looking for is one most people
    // never find.
    assert(ROUTE.includes("<PrivacyDataControls />"), "the real controls, not a link to a promise");
  });

  test("every section reflects evidence rather than inventing a metric", () => {
    // "Sounds I'm working on" and "Needs another pass" read the mastery
    // snapshot; "My journey" reads the lessons' own canDo lines. None of the
    // three computes a score.
    assert(ROUTE.includes("precisionTags") && ROUTE.includes("weakTags"), "sounds come from evidence");
    assert(ROUTE.includes("isWeak"), "needs-another-pass comes from evidence");
    assert(ROUTE.includes("canDo"), "the journey is the lessons' own words");
    for (const banned of ["percent", "%", "score", "/ 10", "points"]) {
      assert(!ROUTE.includes(banned), `My French must not render ${banned}`);
    }
  });
});

describe("preferences order Context Cards and nothing else", () => {
  test("no preference is set by default", () => {
    assertEqual(EMPTY_PREFS.focus, null, "nobody is assumed to want anything");
    assertEqual(EMPTY_PREFS.contexts.length, 0, "and no situation is assumed either");
  });

  test("with no contexts chosen, the authored order is untouched", () => {
    const out = orderByContexts(CONTEXT_CARD_SETS, []);
    assertEqual(
      out.map((s) => s.id).join(","),
      CONTEXT_CARD_SETS.map((s) => s.id).join(","),
      "a learner who sets nothing must see what the author intended",
    );
  });

  test("ordering hides nothing and invents nothing", () => {
    for (const context of FRENCH_CONTEXTS) {
      const out = orderByContexts(CONTEXT_CARD_SETS, [context]);
      assertEqual(
        out.length,
        CONTEXT_CARD_SETS.length,
        `${context} changed how many sets exist`,
      );
      assertEqual(
        [...out].map((s) => s.id).sort().join(","),
        [...CONTEXT_CARD_SETS].map((s) => s.id).sort().join(","),
        `${context} changed WHICH sets exist`,
      );
    }
  });

  test("a chosen context brings its sets forward", () => {
    const tagged = CONTEXT_CARD_SETS.find((s) => (s.contextTags ?? []).includes("cafes"));
    assert(tagged !== undefined, "at least one set should be about cafés");
    const out = orderByContexts(CONTEXT_CARD_SETS, ["cafes"]);
    assertEqual(out[0].id, tagged!.id, "the matching set should be first");
  });

  test("preferences reach nothing but that ordering", () => {
    // The one place they are read. If this ever grows a second reader, that is
    // a decision someone has to make deliberately, not a drift.
    const cards = readFileSync(join(process.cwd(), "app/context-cards.tsx"), "utf8");
    assert(cards.includes("orderByContexts"), "Context Cards order by preference");
    for (const surface of ["app/(tabs)/index.tsx", "app/(tabs)/practice-hub.tsx"]) {
      const code = readFileSync(join(process.cwd(), surface), "utf8");
      assert(
        !code.includes("readMyFrenchPrefs") && !code.includes("orderByContexts"),
        `${surface} must not be personalised: the path is a teaching decision`,
      );
    }
  });
});

describe("choosing and unchoosing behave", () => {
  test("a focus can be set and cleared by choosing it again", () => {
    const set = withFocus(EMPTY_PREFS, "travel");
    assertEqual(set.focus, "travel", "choosing sets it");
    assertEqual(withFocus(set, "travel").focus, null, "the same answer twice means no answer");
    assertEqual(withFocus(set, "work").focus, "work", "a different answer replaces it");
  });

  test("contexts toggle, and keep the canonical order rather than click order", () => {
    let prefs = EMPTY_PREFS;
    prefs = withContextToggled(prefs, "work");
    prefs = withContextToggled(prefs, "cafes");
    const canonical = FRENCH_CONTEXTS.filter((c) => prefs.contexts.includes(c));
    assertEqual(
      prefs.contexts.join(","),
      canonical.join(","),
      "the list should not reorder itself as the learner taps",
    );
    prefs = withContextToggled(prefs, "work");
    assert(!prefs.contexts.includes("work"), "tapping again removes it");
  });

  test("stored junk cannot become a preference", () => {
    assertEqual(parsePrefs("nonsense").focus, null, "no crash");
    assertEqual(parsePrefs('{"focus":"astrology"}').focus, null, "an unknown focus is dropped");
    const bad = parsePrefs('{"contexts":["cafes","hacking",7]}');
    assertEqual(bad.contexts.join(","), "cafes", "only known contexts survive");
  });

  test("every option a learner can pick has copy", () => {
    for (const f of FRENCH_FOCUSES) assert((FRENCH_FOCUS_COPY[f] ?? "").length > 0, `${f} unnamed`);
    for (const c of FRENCH_CONTEXTS) assert((FRENCH_CONTEXT_COPY[c] ?? "").length > 0, `${c} unnamed`);
  });
});

describe("what the learner tells us can be deleted", () => {
  test("both new stores are in the privacy inventory", () => {
    // A store a reset forgets is a store the learner cannot actually delete.
    for (const key of [LM_CONTEXT_CARDS_KEY, LM_MY_FRENCH_KEY]) {
      assert(
        (ALL_LOCAL_PRIVACY_KEYS as readonly string[]).includes(key),
        `${key} is not covered by the local delete`,
      );
    }
  });

  test("the preference store honours the privacy epoch", () => {
    const store = readFileSync(join(process.cwd(), "lib/myFrenchPrefs.ts"), "utf8");
    assert(store.includes("isPersistSuppressed"), "a pre-reset write must not resurrect data");
  });
});
