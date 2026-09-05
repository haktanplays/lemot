/**
 * UI Slice 5 presentation guards: Practice, Mon Lexique, Learning summary.
 *
 * These pin the presentation decisions Slice 5 made and NOTHING about
 * behaviour. Selector determinism, set budget, band placement, read-only
 * behaviour, derived counts and tab architecture are pinned by
 * practiceHubReturn / monLexiqueProjection / navigationStandingSurfaces and are
 * untouched here — this file only guards that the visual reconciliation cannot
 * silently regress into the surfaces it replaced.
 *
 * Pure Node/tsx — no React Native, no Expo, no device layer.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  MON_LEXIQUE_BANDS,
  MON_LEXIQUE_BAND_COPY,
} from "../../components/learning-engine/monLexiqueCopy";

const APP_ROOT = process.cwd();
const read = (rel: string): string => readFileSync(join(APP_ROOT, rel), "utf8");

/**
 * Strip comments so an explanatory note can never satisfy or trip a check.
 * Regex-based: these files carry JSX block comments whose continuation lines
 * begin with ordinary prose, which a line-prefix filter would leave in place.
 */
const codeOf = (src: string): string =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

const PRACTICE = "app/(tabs)/practice-hub.tsx";
const LEXIQUE = "app/(tabs)/mon-lexique.tsx";
const SUMMARY = "app/learning-stats.tsx";
const SUMMARY_VIEW = "components/learning-stats/LearningStatsSummary.tsx";
const CARD = "components/learning-engine/MonLexiqueEntryCard.tsx";
const SHELL = "components/learning-engine/MonLexiqueShell.tsx";
const FRAME = "components/ui/StandingSurface.tsx";
const ATTEMPT = "components/practice-hub/PracticeHubPractice.tsx";

describe("the standing surfaces share one frame", () => {
  test("all three use the shared header and quiet state", () => {
    for (const rel of [PRACTICE, LEXIQUE, SUMMARY]) {
      const code = codeOf(read(rel));
      assert(
        code.includes('from "@/components/ui/StandingSurface"'),
        `${rel}: uses the shared standing-surface frame`,
      );
      assert(code.includes("<SurfaceHeader"), `${rel}: shared header`);
      assert(code.includes("<QuietState"), `${rel}: shared state line`);
    }
  });

  test("the shared frame stays out of the lesson stack", () => {
    const frame = codeOf(read(FRAME));
    for (const banned of ["LessonScreenFrame", "PrimaryAction", "TextInput"]) {
      assert(
        !frame.includes(banned),
        `the standing frame must not reach into the lesson stack: ${banned}`,
      );
    }
    // A lesson screen adopting this header is how the two families would start
    // changing together; the lesson frame is the only frame down there.
    for (const rel of [
      "components/lesson-v1/LessonRendererV1.tsx",
      "components/lesson-v1/screens/Weave.tsx",
      "components/lesson-v1/screens/SayItYourWayV1.tsx",
      "app/(tabs)/index.tsx",
    ]) {
      assert(
        !read(rel).includes("StandingSurface"),
        `${rel}: lesson and Journey surfaces keep their own frame`,
      );
    }
  });

  test("no standing surface is a boxed panel stack any more", () => {
    for (const rel of [PRACTICE, LEXIQUE, SUMMARY_VIEW, CARD]) {
      const code = codeOf(read(rel));
      assert(
        !code.includes('className="rounded-xl border"'),
        `${rel}: the equal-card stack is gone`,
      );
    }
  });
});

describe("Practice reads as material returning, not as a queue", () => {
  test("the resting state is the exact canonical line and nothing more", () => {
    const code = codeOf(read(PRACTICE));
    // The line itself now lives in content/practice/practiceCopy.ts, so the
    // route names it rather than repeating it; navigationStandingSurfaces pins
    // the wording.
    assert(code.includes("PRACTICE_EMPTY_LINE"), "the canonical resting line");
    // A resting surface must not grow an action that turns rest into a task.
    for (const banned of ["Start practising", "Find something", "Refresh"]) {
      assert(!code.includes(banned), `the resting state stays calm: ${banned}`);
    }
  });

  test("the engine's own vocabulary never reaches the row", () => {
    const code = codeOf(read(PRACTICE));
    for (const banned of [
      "entry.reason",
      "entry.isDue",
      "entry.path",
      "PRACTICE_RETURN_COPY",
      "PRACTICE_DUE_COPY",
      "requested",
      "HUB_BUDGET}",
    ]) {
      assert(!code.includes(banned), `the row must not read ${banned}`);
    }
  });

  test("the entry offers one session and never asks the learner to configure it", () => {
    // Practice Hub V1 replaced the card list with a single session, so what is
    // worth pinning changed with it. The old rule was "a row shows French and
    // no internals"; the new one is stronger and covers the same ground — the
    // whole surface shows no internals, and the learner is asked for one tap.
    const code = codeOf(read(PRACTICE));
    assert(code.includes("PracticeStart"), "the entry is the session start");
    for (const banned of [
      "practiceEligibility",
      "weakTags",
      "wrongCount",
      "dueAt",
      "isWeak",
      "\"build\"",
      "\"stretch\"",
      "\"challenge\"",
    ]) {
      assert(!code.includes(banned), `Practice must not render ${banned}`);
    }
    const start = codeOf(read("components/practice/PracticeStart.tsx"));
    assert(start.includes("Start practice"), "one primary action");
    for (const banned of ["Build", "Stretch", "Challenge", "difficulty", "Choose"]) {
      assert(!start.includes(banned), `no configuration surface: ${banned}`);
    }
  });

  test("Practice reuses the shipped lesson screens rather than cloning them", () => {
    const attempt = codeOf(read(ATTEMPT));
    assert(
      attempt.includes(
        'from "@/components/lesson-v1/screens/FillWithTraps"',
      ) && attempt.includes('from "@/components/lesson-v1/screens/Weave"'),
      "the original authored screens are the exercise",
    );
    assert(
      !attempt.includes("PracticeWeave") && !attempt.includes("PracticeFill"),
      "no Practice-specific clone of a learning screen exists",
    );
  });

  test("no legacy Practice architecture returned", () => {
    for (const rel of [PRACTICE, ATTEMPT]) {
      const code = codeOf(read(rel));
      for (const legacy of [
        "ScenarioCard",
        "Scenario",
        "useSRS",
        "srs",
        "Leitner",
        "flashcard",
        "Survival",
        "Make It Natural",
        "WordGraph",
      ]) {
        assert(
          !new RegExp(legacy, "i").test(code),
          `${rel}: no legacy Practice architecture (${legacy})`,
        );
      }
    }
  });
});

describe("Mon Lexique groups by band without re-deriving anything", () => {
  test("grouping runs through the pure copy module's published order", () => {
    const code = codeOf(read(LEXIQUE));
    assert(code.includes("MON_LEXIQUE_BANDS.map("), "bands drive the grouping");
    assert(
      code.includes("MON_LEXIQUE_BAND_COPY[band]"),
      "the heading word comes from the pure copy map, never a literal",
    );
    assert(
      MON_LEXIQUE_BANDS.join(",") === "yours,becoming,met,revisit",
      "strongest-claim-first is still the published order",
    );
  });

  test("grouping is display only: no sort, no clock, no second ordering rule", () => {
    const code = codeOf(read(LEXIQUE));
    assert(!code.includes(".sort("), "the selector's order is kept, not replaced");
    assert(code.includes(".filter("), "grouping preserves in-band order");
    assert(
      (code.match(/Date\.now\(\)/g) ?? []).length === 1,
      "still exactly one clock read, at the load boundary",
    );
    for (const banned of ["localeCompare", "reverse()", "reduce("]) {
      assert(!code.includes(banned), `no re-ordering machinery: ${banned}`);
    }
  });

  test("every band remains reachable and none is styled as a verdict", () => {
    const code = codeOf(read(LEXIQUE));
    // One rendering path serves all four bands, so no band can be dropped or
    // singled out by hand.
    assert(
      !/band === "(yours|becoming|met|revisit)"/.test(code),
      "no band is special-cased in the surface",
    );
    for (const banned of ["P.gl", "P.rl", "backgroundColor: P.green", "P.purple"]) {
      assert(!code.includes(banned), `no achievement panel colour: ${banned}`);
    }
  });

  test("one band statement per word, in both card consumers", () => {
    const card = read(CARD);
    assert(
      (card.match(/MON_LEXIQUE_BAND_COPY\[/g) ?? []).length === 1,
      "the card still has exactly one band label",
    );
    // The tab groups and suppresses the per-row chip; the ungrouped sandbox
    // preview keeps it. Either way the learner reads the band exactly once.
    assert(
      codeOf(read(LEXIQUE)).includes("showBand={false}"),
      "the grouped surface does not repeat the heading on every row",
    );
    assert(
      !codeOf(read(SHELL)).includes("showBand"),
      "the ungrouped preview keeps the default chip",
    );
    assert(
      /showBand = true/.test(codeOf(card)),
      "showing the band is the default, so a new consumer cannot lose it",
    );
  });

  test("the surface stays read-only and renders no count", () => {
    const code = codeOf(read(LEXIQUE));
    for (const banned of [
      "TextInput",
      "onChangeText",
      "onLongPress",
      "Swipeable",
      "onPress={() => set",
    ]) {
      assert(!code.includes(banned), `read-only surface: no ${banned}`);
    }
    assert(
      !code.includes("entries.length}") && !code.includes("inBand.length}"),
      "no counter is rendered beside a band",
    );
    const card = codeOf(read(CARD));
    assert(!card.includes("onPress"), "an entry is not an action");
  });

  test("French leads the entry and English stays support", () => {
    const card = codeOf(read(CARD));
    const frSize = Number(card.match(/const fr: TextStyle = \{[\s\S]*?fontSize: (\d+)/)?.[1] ?? "0");
    const enSize = Number(card.match(/const en: TextStyle = \{[\s\S]*?fontSize: (\d+)/)?.[1] ?? "0");
    assert(frSize > 0 && enSize > 0, "both styles resolve a size");
    assert(frSize > enSize, `French is larger than its gloss (${frSize} vs ${enSize})`);
    assert(
      /const fr: TextStyle = \{[\s\S]*?fontFamily: "Newsreader"/.test(card),
      "French keeps the editorial serif",
    );
    for (const banned of ["progress", "%", "ProgressBar"]) {
      assert(!card.includes(banned), `no per-word progress: ${banned}`);
    }
  });
});

describe("the learning summary stays a small mirror", () => {
  test("it shows the four band words and nothing else", () => {
    const view = codeOf(read(SUMMARY_VIEW));
    for (const row of ["c.yours", "c.becomingYours", "c.metThis", "c.worthAnotherLook"]) {
      assert(view.includes(row), `the mirror keeps ${row}`);
    }
    assert(
      (view.match(/<Row /g) ?? []).length === 4,
      "exactly four rows — the same four bands as Mon Lexique",
    );
    assert(
      Object.values(MON_LEXIQUE_BAND_COPY).length === 4,
      "and the band vocabulary is still four words",
    );
  });

  test("no chart, trend or analytic surface was added", () => {
    for (const rel of [SUMMARY, SUMMARY_VIEW]) {
      const code = codeOf(read(rel));
      for (const banned of [
        "Chart",
        "Svg",
        "Victory",
        "heatmap",
        "trend",
        "streak",
        "accuracy",
        "timeSpent",
        "percent",
      ]) {
        assert(
          !new RegExp(banned, "i").test(code),
          `${rel}: the summary is not a report (${banned})`,
        );
      }
    }
  });

  test("emptiness is still decided by the four rows", () => {
    const code = codeOf(read(SUMMARY));
    assert(code.includes("summaryHasContent"), "the same emptiness rule");
    assert(code.includes("state.stats.hasActivity"), "activity alone is not content");
  });
});
