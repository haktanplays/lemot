/**
 * Navigation and standing-surfaces guard (Product Polish, fourth implementation PR).
 *
 * The claim under test: the learner-facing product shell is complete and
 * permanent. Journey, Mon Lexique and Practice are always reachable, the
 * learning summary hangs off Mon Lexique, the Journey path shows L1-L10, every
 * standing surface has a truthful empty state, and no internal counter, tier or
 * engine word reaches the learner.
 *
 * HONEST SCOPE NOTE. As throughout this repo there is no React component test
 * renderer, so navigation structure is verified at the SOURCE level, in the
 * same file-scan idiom as componentCopyGuard / globalLessonConsistency. What
 * this suite proves is what the route tree and the rendered copy DECLARE; it
 * does not simulate a tap. Behavioural guarantees (projection integrity,
 * eligibility, PM-009 / PM-011 identity, emission policy) stay where they
 * already live — monLexiqueProjection, practiceHubReturn, learningStats,
 * l1ConnectedSmoke — and this suite does not restate them.
 *
 * Pure tsx: lesson data plus node:fs reads. No React Native / Expo / device
 * layer is loaded.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import {
  MON_LEXIQUE_BAND_COPY,
  resolveMonLexiqueBand,
} from "../../components/learning-engine/monLexiqueCopy";
import {
  PRACTICE_EMPTY_LINE,
  PRACTICE_NEUTRAL_LINE,
  practiceCardLine,
} from "../../components/practice-hub/practiceCardCopy";
import { LEARNING_STATS_COPY } from "../../components/learning-stats/learningStatsCopy";
import type {
  FillWithTrapsScreen,
  Lesson,
  WeaveScreen,
} from "../../content/lessonTypes";
import type { ReusablePracticeSource } from "../../content/lesson-v1-evidence/practiceHub";

const APP_ROOT = process.cwd();
const read = (rel: string): string => readFileSync(join(APP_ROOT, rel), "utf8");
const exists = (rel: string): boolean => existsSync(join(APP_ROOT, rel));

/** Strip comments so an explanatory note can never satisfy or trip a check. */
const codeOf = (src: string): string =>
  src
    .split("\n")
    .filter(
      (l) =>
        !l.trim().startsWith("*") &&
        !l.trim().startsWith("//") &&
        !l.trim().startsWith("/*"),
    )
    .join("\n");

const TAB_LAYOUT = "app/(tabs)/_layout.tsx";
const JOURNEY = "app/(tabs)/index.tsx";
const LEXIQUE = "app/(tabs)/mon-lexique.tsx";
const PRACTICE = "app/(tabs)/practice-hub.tsx";
const SUMMARY = "app/learning-stats.tsx";
const COMPLETION = "components/lesson-v1/LessonRendererV1.tsx";

/** Every `<Tabs.Screen name="…">` that is NOT hidden with `href: null`. */
function visibleTabs(): { name: string; title: string }[] {
  const src = codeOf(read(TAB_LAYOUT));
  const blocks = src.match(/<Tabs\.Screen[\s\S]*?\/>/g) ?? [];
  const out: { name: string; title: string }[] = [];
  for (const block of blocks) {
    if (/href:\s*null/.test(block)) continue;
    const name = block.match(/name="([^"]+)"/)?.[1];
    const title = block.match(/title:\s*"([^"]+)"/)?.[1];
    assert(name !== undefined, `a Tabs.Screen has no name: ${block}`);
    assert(title !== undefined, `visible tab "${name}" has no learner title`);
    out.push({ name: name as string, title: title as string });
  }
  return out;
}

// ── Part A: the three permanent tabs ────────────────────────────────────────

describe("root navigation is exactly three learner-facing tabs", () => {
  test("three tabs, in order, with sentence-case learner labels", () => {
    const tabs = visibleTabs();
    assertEqual(tabs.length, 3, "exactly three tabs are shown");
    assertEqual(
      tabs.map((t) => t.title).join(","),
      "Journey,Mon Lexique,Practice",
      "the learner-facing labels, in order",
    );
    assertEqual(
      tabs.map((t) => t.name).join(","),
      "index,mon-lexique,practice-hub",
      "each label maps to its route file",
    );
  });

  test("there is no fourth Learning summary tab", () => {
    const tabs = visibleTabs();
    assert(
      !tabs.some((t) => /summary|stats|progress/i.test(t.title)),
      "the summary is a header action, never a tab",
    );
    assert(
      !tabs.some((t) => t.name === "learning-stats"),
      "no learning-stats route entered the tab group",
    );
    assert(
      !exists("app/(tabs)/learning-stats.tsx"),
      "the summary route stays on the root stack, above the tab bar",
    );
  });

  test("the frozen legacy routes stay mounted but permanently unlisted", () => {
    const src = codeOf(read(TAB_LAYOUT));
    for (const legacy of ["chat", "practice", "stats"]) {
      assert(
        new RegExp(`name="${legacy}" options=\\{\\{ href: null \\}\\}`).test(src),
        `the legacy ${legacy} route must be hidden with href: null`,
      );
    }
    // The bar must not depend on a stage flag any more: these three surfaces
    // are permanent, not feature-gated.
    assert(
      !src.includes("FEATURES."),
      "no feature flag gates the permanent tab bar",
    );
  });

  test("no new navigation or icon dependency was introduced", () => {
    const src = read(TAB_LAYOUT);
    assert(src.includes('from "expo-router"'), "the existing router");
    assert(src.includes('from "lucide-react-native"'), "the existing icon set");
    const pkg = JSON.parse(read("package.json")) as {
      dependencies: Record<string, string>;
    };
    for (const banned of [
      "@react-navigation/bottom-tabs",
      "react-native-vector-icons",
      "@expo/vector-icons",
      "react-native-tab-view",
    ]) {
      assert(
        !(banned in pkg.dependencies),
        `no new navigation/icon dependency: ${banned}`,
      );
    }
  });

  test("an active lesson renders no tab bar", () => {
    // The tab bar exists only inside app/(tabs). Every lesson surface lives
    // outside that group, on the root stack.
    for (const rel of [
      "app/lesson-zero.tsx",
      "app/v1-lesson/[id].tsx",
      "app/lesson/[id].tsx",
      "app/how-weave-works.tsx",
    ]) {
      assert(exists(rel), `${rel} is expected outside the tab group`);
      assert(
        !exists(rel.replace("app/", "app/(tabs)/")),
        `${rel} must not be a tab route`,
      );
    }
  });
});

// ── Part G: reachability and back behaviour ─────────────────────────────────

describe("standing surfaces are reachable without a lesson or a deep link", () => {
  test("Mon Lexique and Practice are tab roots, not push-only destinations", () => {
    assert(exists(LEXIQUE), "Mon Lexique is a tab route file");
    assert(exists(PRACTICE), "Practice is a tab route file");
    // A tab root has nothing above it to go back to, so neither may ship a
    // back affordance that would strand a fresh learner.
    for (const rel of [LEXIQUE, PRACTICE]) {
      const code = codeOf(read(rel));
      assert(!code.includes("ChevronLeft"), `${rel} needs no back chevron`);
      assert(!code.includes("router.back()"), `${rel} is a root, not a pushed screen`);
    }
  });

  test("Learning summary is reachable from Mon Lexique and returns there", () => {
    const lexique = codeOf(read(LEXIQUE));
    assert(
      lexique.includes('router.push("/learning-stats" as never)'),
      "the header action opens the summary",
    );
    assert(lexique.includes("Learning summary"), "the learner-facing label");
    const summary = codeOf(read(SUMMARY));
    assert(summary.includes("router.back()"), "back goes to where it came from");
    assert(
      summary.includes('router.replace("/mon-lexique" as never)'),
      "and falls back to Mon Lexique, never to a blank stack",
    );
  });

  test("no standing surface is a dead end", () => {
    // Each of the three tab roots renders a real body; the summary always has
    // a back affordance. Nothing here depends on completing a lesson first.
    for (const rel of [JOURNEY, LEXIQUE, PRACTICE]) {
      assert(read(rel).includes("export default"), `${rel} is a real route`);
    }
    assert(codeOf(read(SUMMARY)).includes("accessibilityLabel=\"Go back\""), "summary back");
  });

  test("closing a Practice exercise returns to the Practice list", () => {
    const code = codeOf(read(PRACTICE));
    assert(code.includes("onClose={closePractice}"), "the close handler is wired");
    assert(code.includes("setActive(null)"), "closing clears the active card");
    assert(
      code.includes("PracticeHubPractice"),
      "the exercise renders inside Practice — closing never leaves the tab",
    );
  });

  test("completion keeps Back to Home and one quiet shortcut, not three links", () => {
    const src = read(COMPLETION);
    const completion = src.slice(src.indexOf("function CompletionView"));
    assert(completion.includes("Back to Home"), "the single primary action");
    assert(completion.includes("Open Mon Lexique"), "the one secondary shortcut");
    assertEqual(
      (completion.match(/<Pressable/g) ?? []).length,
      1,
      "one secondary Pressable beside the primary Btn",
    );
    for (const gone of [
      "Practice what came back",
      "See learning summary",
      "/practice-hub",
      "/learning-stats",
    ]) {
      assert(!completion.includes(gone), `the equal-links row is gone: ${gone}`);
    }
  });

  test("navigation emits no learning evidence and adds no storage or event type", () => {
    for (const rel of [TAB_LAYOUT, LEXIQUE, PRACTICE, SUMMARY]) {
      const code = codeOf(read(rel));
      assert(!/record[A-Z]/.test(code), `${rel}: navigation records nothing`);
      for (const banned of [
        "appendEvent",
        "createLearningEvent",
        "LocalRepository",
        "LM_LE_",
        "setItem",
        "kvStorage",
        "createSessionController",
      ]) {
        assert(!code.includes(banned), `${rel} must not reference ${banned}`);
      }
    }
  });
});

// ── Part B: Journey visibility ──────────────────────────────────────────────

describe("Journey shows L1-L10 and hides L11+", () => {
  const journey = () => read(JOURNEY);

  test("the visible range is L1-L10", () => {
    assert(
      journey().includes("l.number >= 1 && l.number <= 10"),
      "the cap is exactly L1-L10",
    );
    for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      assert(
        V1_LESSONS.some((l) => l.number === n),
        `L${n} must be registered to be visible`,
      );
    }
  });

  test("L11-L15 stay hidden", () => {
    const hidden = V1_LESSONS.filter((l) => l.number >= 11);
    assert(hidden.length > 0, "there are registered lessons above L10 to hide");
    for (const l of hidden) {
      assert(l.number > 10, `${l.id} is outside the visible cap`);
    }
    // The cap is a numeric filter, so nothing above 10 can leak; assert the
    // filter is the ONLY path that builds the path list.
    assertEqual(
      (journey().match(/V1_LESSONS\.filter/g) ?? []).length,
      1,
      "one visibility filter, no second lesson list",
    );
  });

  test("L0 stays the bespoke first-run lesson, never a numbered row", () => {
    const src = journey();
    assert(src.includes('router.replace("/lesson-zero" as never)'), "L0 routing intact");
    assert(src.includes("l.number >= 1"), "L0 is excluded from the numbered path");
  });

  test("exactly one lesson is presented as the recommended next step", () => {
    const src = codeOf(journey());
    assert(src.includes("const nextLessonId"), "a single recommended lesson is computed");
    assert(
      /\.find\(\(\{ done, available \}\) => available && !done\)/.test(src),
      "it is the first open, unfinished lesson",
    );
    assert(src.includes("lesson.id === nextLessonId"), "only that row is highlighted");
  });

  test("the lock explanation is said once, not under every row", () => {
    const src = codeOf(journey());
    assert(src.includes("const firstLockedId"), "the first locked row is identified");
    assert(
      src.includes("lesson.id === firstLockedId"),
      "the explanation renders only under that row",
    );
    assert(
      !src.includes("Complete the previous lesson first"),
      "the per-row repetition is gone",
    );
  });

  test("no internal id or route name reaches the Journey row", () => {
    const src = codeOf(journey());
    // `lesson.id` may be used as a React key and as a route argument, never as
    // rendered text.
    assert(!/>\s*\{lesson\.id\}/.test(src), "no raw lesson id is rendered");
    assert(!src.includes("{lesson.number}"), "no internal number is rendered raw");
    assert(src.includes("{lesson.title}"), "the row shows the authored title");
    assert(src.includes("{lesson.canDo}"), "and the authored canDo line");
  });
});

// ── Part C/D/E: truthful empty states ───────────────────────────────────────

describe("every standing surface has a truthful empty state", () => {
  test("Mon Lexique empty-state copy is exact", () => {
    assert(
      read(LEXIQUE).includes(
        "Your words will appear here as you use them. Start anywhere on your path.",
      ),
      "the exact Mon Lexique empty line",
    );
    const code = codeOf(read(LEXIQUE));
    assert(
      !code.includes("{state.entries.length}") && !code.includes("entries.length}"),
      "no counter is rendered — an empty list explains itself in words",
    );
    for (const banned of ["Error", "failed", "Retry", "Go to Practice"]) {
      assert(
        !code.includes(banned),
        `the empty state must not be an error or force Practice: ${banned}`,
      );
    }
  });

  test("Practice empty-state copy is exact and reads as rest, not backlog", () => {
    assertEqual(
      PRACTICE_EMPTY_LINE,
      "Nothing needs your attention right now. Pieces return here after you use them in a lesson.",
      "the canonical Practice resting line",
    );
    assert(read(PRACTICE).includes(PRACTICE_EMPTY_LINE), "the route renders it");
    const code = codeOf(read(PRACTICE));
    for (const banned of [
      "come back later",
      "Come back tomorrow",
      "streak",
      "queue",
      "backlog",
      "overdue",
      "0 due",
    ]) {
      assert(
        !code.toLowerCase().includes(banned.toLowerCase()),
        `no urgency/backlog language: ${banned}`,
      );
    }
  });

  test("Learning summary empty-state copy is exact and shows no grid of zeros", () => {
    assertEqual(
      LEARNING_STATS_COPY.empty,
      "Nothing to show yet. This fills in as you use French.",
      "the canonical summary empty line",
    );
    const summary = codeOf(read(SUMMARY));
    assert(summary.includes("summaryHasContent"), "emptiness is decided by the four rows");
    assert(
      summary.includes("state.stats.hasActivity") && summary.includes("showSummary"),
      "a projection with activity but nothing to show still renders the empty line",
    );
  });
});

// ── Part H: learner-facing terminology ──────────────────────────────────────

describe("learner-facing terminology is the canonical product vocabulary", () => {
  /** Text that actually reaches the learner: JSX text and quoted title props. */
  const LEARNER_SURFACES = [TAB_LAYOUT, JOURNEY, LEXIQUE, PRACTICE, SUMMARY];

  test("no learner-facing Stats, Practice Hub, dashboard, analytics or metrics", () => {
    for (const rel of LEARNER_SURFACES) {
      const code = codeOf(read(rel));
      for (const banned of [
        "Practice Hub",
        "dashboard",
        "analytics",
        "metrics",
        "Recognition practice",
        "Open attempts",
        "Collected",
        "Needs another look",
        "Growing with support",
      ]) {
        assert(
          !new RegExp(`>[^<>]*${banned}`, "i").test(code) &&
            !new RegExp(`title:\\s*"[^"]*${banned}`, "i").test(code) &&
            !new RegExp(`"[^"]*${banned}[^"]*"`, "i").test(code),
          `${rel} shows the learner "${banned}"`,
        );
      }
    }
  });

  test("the summary is called Learning summary everywhere the learner sees it", () => {
    assertEqual(LEARNING_STATS_COPY.title, "Learning summary", "the copy module");
    assert(read(LEXIQUE).includes("Learning summary"), "the Mon Lexique header action");
    assert(
      codeOf(read(SUMMARY)).includes("LEARNING_STATS_COPY.title"),
      "the screen title comes from the same constant",
    );
  });

  test("the four Mon Lexique bands are the only membership vocabulary", () => {
    assertEqual(
      Object.values(MON_LEXIQUE_BAND_COPY).join(" | "),
      "Yours | Becoming yours | You’ve met this | Worth another look",
      "the canonical four, word for word",
    );
    const card = read("components/learning-engine/MonLexiqueEntryCard.tsx");
    assertEqual(
      (card.match(/MON_LEXIQUE_BAND_COPY\[/g) ?? []).length,
      1,
      "one band label per row — never two verdicts on one word",
    );
  });
});

// ── Part E: Practice card copy ──────────────────────────────────────────────

describe("Practice cards carry situations, not engine status lines", () => {
  const weaveWithContext = (): { lesson: Lesson; screen: WeaveScreen } => {
    for (const lesson of V1_LESSONS) {
      for (const screen of lesson.screens) {
        if (
          screen.type === "weave" &&
          typeof screen.payload.context === "string" &&
          screen.payload.context.length > 0
        ) {
          return { lesson, screen };
        }
      }
    }
    throw new Error("no authored weave context found");
  };

  test("a weave source lends the card its authored situation, by reference", () => {
    const { lesson, screen } = weaveWithContext();
    const source: ReusablePracticeSource = {
      lesson,
      screen,
      itemId: "chunk-merci",
    };
    assertEqual(
      practiceCardLine(source),
      screen.payload.context,
      "the card shows the scene the learner already saw",
    );
    // By reference: nothing is copied into a Practice-owned content model.
    assert(
      practiceCardLine(source) === screen.payload.context,
      "the same string instance, not a duplicate",
    );
  });

  test("a source with no authored situation falls back to one neutral line", () => {
    let fill: { lesson: Lesson; screen: FillWithTrapsScreen } | null = null;
    for (const lesson of V1_LESSONS) {
      for (const screen of lesson.screens) {
        if (screen.type === "fill-with-traps") {
          fill = { lesson, screen };
          break;
        }
      }
      if (fill) break;
    }
    assert(fill !== null, "a recognition screen exists to test the fallback");
    assertEqual(
      practiceCardLine({
        lesson: fill!.lesson,
        screen: fill!.screen,
        itemId: "chunk-je-voudrais",
      }),
      PRACTICE_NEUTRAL_LINE,
      "neutral, not an engine status",
    );
    assertEqual(
      PRACTICE_NEUTRAL_LINE,
      "Something you have met before.",
      "the exact neutral line",
    );
  });

  test("the retired tier status lines no longer reach the card", () => {
    const code = codeOf(read(PRACTICE));
    for (const retired of [
      "A useful piece to keep active.",
      "You’ve used this before. Try it once more.",
      "This one could use another calm pass.",
      "Ready to revisit today.",
      "PRACTICE_RETURN_COPY",
      "PRACTICE_DUE_COPY",
      "entry.reason",
      "entry.isDue",
      "entry.path",
    ]) {
      assert(!code.includes(retired), `the card must not show/read ${retired}`);
    }
  });

  test("the card copy module builds no content model and stores nothing", () => {
    const code = codeOf(read("components/practice-hub/practiceCardCopy.ts"));
    for (const banned of [
      "expectedAnswers",
      "acceptedAlternatives",
      "options",
      "reveal",
      "setItem",
      "kvStorage",
      "LocalRepository",
      "Date.now",
      "Math.random",
    ]) {
      assert(!code.includes(banned), `the copy module must not touch ${banned}`);
    }
    assertEqual(
      (code.match(/^import /gm) ?? []).length,
      1,
      "one type-only import — no runtime dependency",
    );
  });
});

// ── Regression: nothing structural moved ────────────────────────────────────

describe("this PR moved presentation only", () => {
  test("the moved routes kept their paths, so no deep link changed", () => {
    // `(tabs)` is a route GROUP: it contributes no path segment, so
    // /mon-lexique and /practice-hub still resolve exactly as before.
    assert(exists(LEXIQUE) && !exists("app/mon-lexique.tsx"), "one Mon Lexique route");
    assert(exists(PRACTICE) && !exists("app/practice-hub.tsx"), "one Practice route");
    assert(exists(SUMMARY), "the summary route is unchanged in place");
  });

  test("no duplicate standing surface was created", () => {
    for (const [rel, marker] of [
      [LEXIQUE, "selectMonLexiqueEntries"],
      [PRACTICE, "selectPracticeHubSet"],
      [SUMMARY, "readLearningStats"],
    ] as const) {
      assert(read(rel).includes(marker), `${rel} uses the existing selector`);
    }
    // The legacy quarantined routes must not have learned about the engine.
    for (const legacy of ["app/(tabs)/practice.tsx", "app/(tabs)/stats.tsx"]) {
      const code = codeOf(read(legacy));
      for (const banned of [
        "useLearningEngineRuntime",
        "selectPracticeHubSet",
        "selectMonLexiqueEntries",
        "readLearningStats",
      ]) {
        assert(!code.includes(banned), `${legacy} must not gain ${banned}`);
      }
    }
  });

  test("the band mapper changes display only — never mastery or scheduling", () => {
    const entry = {
      status: "weak" as const,
      productionClaim: "independent" as const,
      lastProducedAt: null,
    };
    assertEqual(resolveMonLexiqueBand(entry, 0), "revisit", "weak still surfaces");
    const mapper = codeOf(read("components/learning-engine/monLexiqueCopy.ts"));
    assert(
      !mapper.includes("scoreEvent") && !mapper.includes("MasterySnapshot"),
      "the mapper never touches the reducer",
    );
  });
});
