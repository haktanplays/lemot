/**
 * The V4-B migration, pinned at the primitive layer.
 *
 * ── WHAT THIS PASS ACTUALLY DID, AND WHY IT IS TESTABLE ────────────────────
 *
 * V4-B decides how Cairn should look. The expensive way to adopt it is screen
 * by screen, which produces two palettes living at once and a long tail of
 * half-migrated surfaces. The cheap way is to move the shared things: the
 * VALUES behind the token names every surface already reads, and the one or two
 * elements the design repeats everywhere.
 *
 * So these tests are not about pixels. They pin the two properties that make
 * the cheap way work and that a later edit could quietly undo:
 *
 *   1. There is ONE palette. Nothing shadows it with a second set of hexes.
 *   2. There is ONE kicker. The forty-nine hand-rolled label styles measured
 *      before this pass do not grow back.
 */
import { describe, test, assert } from "./harness";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { P, RADIUS } from "../../constants/theme";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");
const codeOf = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

/** Every .tsx under the live app and component trees. */
function liveSources(): string[] {
  const out: string[] = [];
  const walk = (dir: string): void => {
    for (const name of readdirSync(join(process.cwd(), dir))) {
      const rel = `${dir}/${name}`;
      if (statSync(join(process.cwd(), rel)).isDirectory()) walk(rel);
      else if (rel.endsWith(".tsx")) out.push(rel);
    }
  };
  walk("app");
  walk("components");
  return out;
}

/**
 * The surfaces the learner actually reaches, and the ones they do not.
 *
 * Migrating a path nobody walks is churn, so the kicker rules below are
 * asserted over the Cairn surfaces only. What is left out is written down here
 * WITH ITS REASON rather than assumed, and pinned below, so that quietly adding
 * a file to this list to make a failing guard pass is a visible edit.
 *
 * Three reasons, and no others:
 *
 *   legacy    the v7 lesson route and the two tabs that hang off it. The
 *             Journey stops linking to them once the product stage hides the
 *             legacy lesson list, so nothing there is on the learner's path.
 *   fixture   the learning-engine renderer shell, reachable only from
 *             app/learn/[fixtureId].tsx, which is a harness and not a screen.
 *             Its two live pieces — PrivacyDataControls and
 *             MonLexiqueEntryDetail — are NOT excluded, and are migrated.
 *   svg       MountainMap draws with react-native-svg, where letterSpacing is
 *             an element prop on an SVG <Text> and has nothing to do with a
 *             section label.
 */
const NOT_CAIRN: readonly string[] = [
  // legacy
  "app/(tabs)/chat.tsx",
  "app/(tabs)/practice.tsx",
  "app/(tabs)/stats.tsx",
  "app/lesson/[id].tsx",
  "components/LessonPractice.tsx",
  // fixture
  "app/learn/[fixtureId].tsx",
  "components/learning-engine/BoundaryLaterFormCard.tsx",
  "components/learning-engine/ContextChainCard.tsx",
  "components/learning-engine/LearnerLessonHeader.tsx",
  "components/learning-engine/LearnerRendererShell.tsx",
  "components/learning-engine/LessonCompletionView.tsx",
  "components/learning-engine/MonLexiqueShell.tsx",
  "components/learning-engine/PracticePoolPracticePanel.tsx",
  "components/learning-engine/PracticePoolShell.tsx",
  // svg
  "components/MountainMap.tsx",
];
const LEGACY_TREES = /^components\/(sections|practice)\//;
const cairnSources = () =>
  liveSources().filter((f) => !LEGACY_TREES.test(f) && !NOT_CAIRN.includes(f));

describe("what is out of scope is written down", () => {
  test("every excluded file still exists", () => {
    // A stale exclusion is how a guard quietly stops covering a file that came
    // back onto the learner's path under a new name.
    const live = new Set(liveSources());
    for (const rel of NOT_CAIRN) {
      assert(live.has(rel), `${rel} is excluded but no longer exists`);
    }
  });

  test("the list has not grown", () => {
    // The cheapest way to silence the kicker guard is to append to NOT_CAIRN.
    // This makes that a deliberate, reviewable act rather than a quiet one.
    assert(NOT_CAIRN.length === 15, `the exclusion list is now ${NOT_CAIRN.length} long`);
  });

  test("the live pieces of the fixture family are NOT excluded", () => {
    // PrivacyDataControls reaches the learner through My French and
    // MonLexiqueEntryDetail through Mon Lexique, even though the rest of
    // components/learning-engine is only reachable from the fixture harness.
    for (const rel of [
      "components/learning-engine/PrivacyDataControls.tsx",
      "components/learning-engine/MonLexiqueEntryDetail.tsx",
    ]) {
      assert(!NOT_CAIRN.includes(rel), `${rel} is on the learner's path`);
    }
  });
});

describe("one palette, V4-B's", () => {
  test("the token values are the design's, not the old warm scale", () => {
    // If any of these drifts back, the whole product drifts back with it,
    // because every surface reads these names rather than their values.
    assert(P.bg === "#FAFAF7", `bg is ${P.bg}`);
    assert(P.ink === "#0E1116", `ink is ${P.ink}`);
    assert(P.ink2 === "#494E58", `ink2 is ${P.ink2}`);
    assert(P.ink3 === "#9CA0A8", `ink3 is ${P.ink3}`);
    assert(P.accent === "#2E4A7A", `accent is ${P.accent}`);
  });

  test("the secondary ink got darker, not just cooler", () => {
    // The old #6B6560 sat at roughly 5:1 on the page. This is the half of the
    // migration that is an accessibility change rather than a taste one, and
    // it should not be given back in a later "warm it up" edit.
    const lum = (hex: string) => {
      const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
      const lin = c.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
      return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
    };
    const ratio = (lum(P.bg) + 0.05) / (lum(P.ink2) + 0.05);
    assert(ratio >= 7, `body-secondary contrast is ${ratio.toFixed(1)}:1`);
  });

  test("no second palette shadows it", () => {
    // The failure this prevents: a `V4B` token object beside `P`, or a screen
    // pasting the design's hexes inline. Either one and the product is two
    // products for as long as the migration takes.
    for (const rel of cairnSources()) {
      const code = codeOf(read(rel));
      for (const hex of ["#0E1116", "#494E58", "#9CA0A8", "#FAFAF7", "#2E4A7A"]) {
        assert(
          !code.includes(hex),
          `${rel} writes ${hex} inline instead of reading it from the palette`,
        );
      }
    }
  });

  test("the progression action is deliberately still brick red", () => {
    // Not an oversight. Swapping it to the navy accent restyles every primary
    // action, both feedback bands and the piece chips at once, which is its own
    // decision and not a token migration. Recorded here so that when it does
    // happen it happens on purpose.
    assert(P.red === "#C0392B", `red is ${P.red}`);
    assert(codeOf(read("components/ui/actions.tsx")).includes("background={P.red}"),
      "PrimaryAction must still take the brick red");
  });
});

describe("one kicker", () => {
  const editorial = read("components/ui/editorial.tsx");

  test("it is the design's label, not a smaller version of body text", () => {
    const code = codeOf(editorial);
    assert(code.includes("fontSize: 10"), "V4-B sets the kicker at 10");
    // 0.18em at 10px. React Native's letterSpacing is absolute, so the ratio
    // has to be resolved rather than expressed, and the resolved number is the
    // thing that can silently drift.
    assert(code.includes("letterSpacing: 1.8"), "and tracks it at 0.18em");
    assert(code.includes('textTransform: "uppercase"'), "and upper-cases it");
  });

  test("it owns the accent rule", () => {
    assert(
      /tone === "active" \? P\.accent : P\.ink3/.test(codeOf(editorial)),
      "an active kicker is the accent; everything else recedes",
    );
  });

  test("no Cairn surface hand-rolls one any more", () => {
    // The measured shape before this pass: a P.ink3 Text at 11-13px with its
    // own letterSpacing. Nineteen of them at 0.4 alone, plus a second dialect
    // at 0.3 and 1. A new one is not a style choice, it is drift.
    //
    // ONE exception, named rather than pattern-matched. The Weave badge is not
    // a section label: it is the mechanic's NAME on an inked pill, and the
    // primitive would upper-case it. "Weave" is what the founder called this,
    // and its capitalisation is a brand fact, not a typography default.
    const BRAND_TAGS: readonly string[] = ["components/lesson-v1/screens/Weave.tsx"];
    for (const rel of cairnSources()) {
      if (rel === "components/ui/editorial.tsx") continue;
      const code = codeOf(read(rel));
      const spacings = [...code.matchAll(/letterSpacing: ([0-9.]+)/g)];
      if (BRAND_TAGS.includes(rel)) {
        // The exception is exactly one occurrence, and it is the badge. If a
        // second one appears in this file it is ordinary drift and must fail.
        assert(
          spacings.length === 1 && /color: P\.paper, fontWeight: "700", letterSpacing/.test(code),
          `${rel} may keep the brand tag's spacing and nothing else`,
        );
        continue;
      }
      for (const m of spacings) {
        assert(
          false,
          `${rel} sets letterSpacing ${m[1]} by hand — use <Kicker> instead`,
        );
      }
    }
  });

  test("the label surfaces really do render it", () => {
    // The rule above is satisfiable by deleting every label in the product, so
    // assert the other direction too: the screens that had a kicker still have
    // one, through the primitive.
    for (const rel of [
      "components/lesson-v1/LessonRendererV1.tsx",
      "components/lesson-v1/screens/InsightCard.tsx",
      "components/lesson-v1/screens/RecapCard.tsx",
      "components/lesson-v1/screens/PatternReel.tsx",
      "components/lesson-v1/screens/NaturalReveal.tsx",
      "components/lesson-v1/screens/Weave.tsx",
      "components/lesson-v1/screens/Showcase.tsx",
      "components/lesson-v1/screens/SayItYourWayV1.tsx",
      "components/ui/SceneCard.tsx",
      "components/learning-engine/MonLexiqueEntryDetail.tsx",
      "app/(tabs)/index.tsx",
      "app/(tabs)/mon-lexique.tsx",
      "app/(tabs)/my-french.tsx",
      "app/orientation.tsx",
    ]) {
      const code = codeOf(read(rel));
      assert(code.includes("<Kicker"), `${rel} lost its section label`);
      assert(
        code.includes('from "@/components/ui/editorial"'),
        `${rel} must take it from the shared primitive`,
      );
    }
  });

  test("only one thing on the Journey is the live offer", () => {
    // V4-B spends the accent on the block being offered right now. The Journey
    // can show both a resume point and a next step at once, so exactly one of
    // them has to yield — and which one is a real product answer: a lesson
    // already open outranks the next one to open.
    const home = codeOf(read("app/(tabs)/index.tsx"));
    assert(
      /text="Where you left off"\s+tone="active"/.test(home.replace(/\s+/g, " ")),
      "the resume offer is the live one when it exists",
    );
    assert(
      /tone=\{resumePoint === null \? "active" : "quiet"\}/.test(home),
      "and the next step only takes the accent when there is nothing to resume",
    );
  });
});

describe("blocks are hairlines, not cards", () => {
  const editorial = read("components/ui/editorial.tsx");

  test("an anchor block adds nothing but two rules", () => {
    const code = codeOf(editorial);
    const block = code.slice(code.indexOf("export function AnchorBlock"));
    for (const chrome of ["backgroundColor", "borderRadius", "shadow", "elevation"]) {
      assert(!block.includes(chrome), `an anchor block must not set ${chrome}`);
    }
    assert(block.includes("borderTopWidth") && block.includes("borderBottomWidth"),
      "it is defined by its rules");
  });

  test("it leaves the horizontal to the page", () => {
    // Cairn's pages inset their own content today. A block that padded again
    // would sit its rules two gutters in and read as a narrower card, which is
    // the exact thing the design is getting rid of.
    const code = codeOf(editorial);
    const block = code.slice(code.indexOf("export function AnchorBlock"));
    assert(!block.includes("paddingHorizontal"), "the block must not inset again");
  });

  test("the Journey's two offers are no longer boxed", () => {
    const home = codeOf(read("app/(tabs)/index.tsx"));
    // Bounded to the two OFFERS, not to everything above the road ahead: the
    // Context Cards entry later moved into that span and became a third anchor
    // block, which is correct and made a count over the wider slice wrong.
    const path = home.slice(
      home.indexOf("Where you left off"),
      home.indexOf("{contextCardSetCount > 0 && ("),
    );
    assert(path.split("<AnchorBlock").length - 1 === 2, "both offers are anchor blocks");
    assert(
      !/bg-lm-paper rounded-2xl border/.test(path),
      "the paper-and-radius card is gone from both",
    );
    assert(
      !/borderColor: P\.red \+ "55"/.test(path),
      "and so is the tinted border that made them read as cards",
    );
  });
});

describe("the action geometry is the design's", () => {
  test("buttons are softer than cards, by two points", () => {
    assert(RADIUS.action === 14, `action radius is ${RADIUS.action}`);
    assert(RADIUS.card === 12, "cards keep their own radius");
    assert(
      codeOf(read("components/ui/actions.tsx")).includes("borderRadius: RADIUS.action"),
      "every action must read it from the token",
    );
  });
});
