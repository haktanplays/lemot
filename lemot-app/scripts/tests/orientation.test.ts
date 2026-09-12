/**
 * Orientation: once, after the first taste, and skippable.
 *
 * The founder's finding was that after L0 the learner arrives in a product
 * whose parts have never been named — a Journey, pink boxes inside sentences,
 * Mon Lexique, Practice, My French — so the tabs read as unrelated features and
 * the pieces, by now the product's main visual language, are unexplained.
 *
 * The risk in fixing that is a tutorial. These rules are mostly about what this
 * screen must NOT become: a tour that traps someone, a flag that replays, or a
 * fact that gets tangled up with whether L0 was finished.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");
const SCREEN = read("app/orientation.tsx");

/**
 * The learner-facing copy only — the BEATS script plus the demo's own strings.
 *
 * The first version of the copy rules scanned the whole file and failed on
 * "xp" inside the word `export`, and on prose in a doc comment that was
 * describing the defect rather than committing it. A rule about what the
 * learner reads has to look at what the learner reads.
 */
const COPY = (() => {
  const beats = SCREEN.slice(SCREEN.indexOf("const BEATS"), SCREEN.indexOf("const SENTENCE"));
  const demo = SCREEN.slice(SCREEN.indexOf("function PiecesDemo"), SCREEN.indexOf("export default"));
  const source = `${beats}\n${demo}`;
  const quoted = [...source.matchAll(/"([^"\n]{4,})"/g)].map((m) => m[1]);
  // The demo writes its sentences as JSX children, not as string literals, so
  // the quoted-string sweep alone misses the half of the copy that carries the
  // actual argument.
  const jsxText = [...source.matchAll(/>\s*([A-Za-z][^<>{}]{6,})</g)].map((m) => m[1].trim());
  return [...quoted, ...jsxText].join("\n");
})();
const HOME = read("app/(tabs)/index.tsx");
const FIRST_USE = read("lib/firstUse.ts");

/**
 * The storage keys, read out of the source rather than imported.
 *
 * lib/firstUse imports the RN-backed kv store, and this harness is plain node —
 * importing it drags react-native into a transform that cannot parse it. Every
 * other UI check in this suite reads source as text for the same reason.
 */
const keyOf = (name: string): string => {
  const m = new RegExp(`${name} = "([^"]+)"`).exec(FIRST_USE);
  assertFound(m, `lib/firstUse must still export ${name}`);
  return (m as RegExpExecArray)[1];
};
function assertFound(m: unknown, message: string): void {
  assert(m !== null && m !== undefined, message);
}
const SEEN_ORIENTATION_KEY = keyOf("SEEN_ORIENTATION_KEY");
const SEEN_LESSON_ZERO_KEY = keyOf("SEEN_LESSON_ZERO_KEY");

describe("orientation is a second fact, not a rename of the first", () => {
  test("the two flags are different keys", () => {
    assert(
      SEEN_ORIENTATION_KEY !== SEEN_LESSON_ZERO_KEY,
      "skipping orientation must never look like skipping the first taste",
    );
  });

  test("reading a broken store does not trap a learner in onboarding", () => {
    // Both flags fail OPEN on a read error, which is the safe direction: the
    // cost of missing orientation once is a learner who has to find things out;
    // the cost of failing closed is a learner who cannot get past it.
    const orientation = FIRST_USE.slice(FIRST_USE.indexOf("hasSeenOrientation"));
    assert(
      /catch\s*\{[\s\S]{0,220}return true;/.test(orientation),
      "hasSeenOrientation must return true when storage cannot be read",
    );
  });

  test("it is written on the way out, by both exits", () => {
    // Skip is a decision. A learner who takes it must not be asked again on the
    // next launch, which is what happens if only Continue writes the flag.
    const leave = SCREEN.slice(SCREEN.indexOf("const leave ="), SCREEN.indexOf("const leave =") + 220);
    assert(leave.includes("markOrientationSeen()"), "leaving records that it was seen");
    assert(
      SCREEN.includes("onPress={leave}") && /isLast \? leave/.test(SCREEN),
      "Skip and the final action must both go through the same exit",
    );
  });
});

describe("it appears after L0 and never before it", () => {
  test("the first taste is checked first and returns", () => {
    const effect = HOME.slice(HOME.indexOf("if (needsLessonZero)"), HOME.indexOf("}, [needsLessonZero"));
    assert(effect.includes("return;"), "the L0 redirect must not fall through into orientation");
    assert(
      effect.indexOf("lesson-zero") < effect.indexOf("orientation"),
      "L0 comes first",
    );
  });

  test("orientation is only offered to someone who finished L0", () => {
    assert(
      /hasFinishedFirstTaste\(\) && !hasSeenOrientation\(\)/.test(HOME),
      "the condition must require the first taste to be finished",
    );
  });

  test("neither redirect flashes the tab it is leaving", () => {
    assert(
      /!loaded \|\| needsLessonZero \|\| needsOrientation/.test(HOME),
      "Home must stay behind the spinner while either redirect lands",
    );
  });
});

describe("it is four cards, not a tour", () => {
  test("there is a small, fixed number of beats", () => {
    const beats = [...SCREEN.matchAll(/kicker: "/g)].length;
    assert(beats >= 3 && beats <= 5, `orientation has ${beats} beats; this is meant to be half a minute`);
  });

  test("it teaches the one thing it exists for", () => {
    // Pieces are the product's visual language and the learner has never been
    // told what the boxes mean. If any beat is load-bearing, it is this one.
    assert(SCREEN.includes('demo: "pieces"'), "one beat must actually show pieces");
    assert(
      COPY.includes("One piece stayed. One piece changed."),
      "the reuse demonstration is the argument; without it this is a definition",
    );
  });

  test("a piece is not taught as a word", () => {
    // "je voudrais" is two words and one piece; "s'il vous plaît" is three. A
    // learner who leaves believing one box is one word is wrong about every
    // chunk in the course.
    assert(
      COPY.includes("je voudrais") && COPY.includes("s'il vous plaît"),
      "the demonstration pieces must include multi-word ones",
    );
    assert(
      /not always one word/.test(COPY),
      "the copy must say outright that a piece is not a word",
    );
  });

  test("Mon Lexique is described as a record, not as mastery", () => {
    for (const overclaim of ["mastered", "learned", "you know", "owned"]) {
      assert(
        !COPY.toLowerCase().includes(overclaim),
        `orientation claims "${overclaim}" of language the learner has only met`,
      );
    }
    // The positive half of the rule. Refusing the overclaims above is not
    // enough on its own: copy that says nothing about how the language got
    // there would pass every one of them and still leave Mon Lexique reading
    // as a dictionary.
    assert(
      /\bmeet and use\b|\bmet and used\b/.test(COPY),
      "it should say what is actually true: language the learner meets and uses",
    );
  });

  test("no reward framing anywhere on the screen", () => {
    for (const word of ["unlock", "congrat", "xp", "streak", "badge", "level up", "achievement"]) {
      assert(
        !new RegExp(`\\b${word}`, "i").test(COPY),
        `orientation uses reward language ("${word}")`,
      );
    }
  });
});

describe("it cannot trap or break someone", () => {
  test("Skip is on every card except the one whose action already leaves", () => {
    assert(SCREEN.includes('label="Skip"'), "there must be a way out");
    assert(/!isLast && <LinkAction label="Skip"/.test(SCREEN), "and it is present until the end");
  });

  test("it respects reduce motion", () => {
    assert(SCREEN.includes("useReduceMotion"), "the reveal must honour the OS setting");
    assert(
      /useState\(reduceMotion\)/.test(SCREEN),
      "with reduce motion on, the pieces are open from the start rather than behind a transition",
    );
  });

  test("it survives Android safe areas and small screens", () => {
    assert(SCREEN.includes("SafeAreaView"), "the screen must respect insets");
    assert(SCREEN.includes("ScrollView"), "a short screen must be able to scroll rather than clip");
  });

  test("it needs no network and no AI", () => {
    for (const word of ["fetch(", "anthropic", "openai", "supabase"]) {
      assert(!SCREEN.toLowerCase().includes(word), `orientation reaches for ${word}`);
    }
  });
});
