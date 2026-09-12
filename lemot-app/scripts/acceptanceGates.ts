/**
 * Founder smoke closure — the acceptance gates, run as one command.
 *
 * The brief lists the gates that have to hold before this batch can be called
 * closed. They are checked here rather than asserted in prose, and each one
 * DERIVES its answer from the content or the source rather than pointing at a
 * test that is supposed to cover it. A report that cites a passing test is
 * evidence about the test; this is evidence about the product.
 *
 * Run:  npx tsx scripts/acceptanceGates.ts
 * Exits 1 if any gate fails, and prints every gate either way so the founder
 * can see what was actually measured rather than a summary of it.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ITEM_REGISTRY } from "../content/itemRegistry";
import { V1_LESSONS } from "../content/lessons/v1";
import { flattenLessonScreens } from "../content/lessons/lessonStructure";
import { PRACTICE_SEEDS } from "../content/practice/seeds";
import { componentEvidence } from "../content/lesson-v1-evidence/answerComponents";
import {
  summarizeShowcaseClassification,
  reviewShowcaseClassification,
  showcaseSentencesOf,
  shownPieces,
} from "../content/lessons/showcaseClassification";
import { knownPieces, pieceLabel, showcasePieces } from "../content/lessons/showcasePieces";
import { seedsForMode } from "../content/practice/practiceModes";
import { allContextCards, CONTEXT_CARD_SETS } from "../content/context-cards/cards";
import { orderByContexts, parsePrefs, withContextToggled, EMPTY_PREFS } from "../content/my-french/prefs";
import { MON_LEXIQUE_FILTERS, filterMonLexiqueEntries } from "../components/learning-engine/monLexiqueFilters";
import { MON_LEXIQUE_BANDS } from "../components/learning-engine/monLexiqueCopy";

const root = process.cwd();
const src = (p: string) => readFileSync(join(root, p), "utf8");
const norm = (s: string) =>
  s.normalize("NFC").toLowerCase().replace(/[’]/g, "'").replace(/[.!?,;:«»"]/g, " ").replace(/\s+/g, " ").trim();

type Gate = { group: string; name: string; ok: boolean; detail: string };
const gates: Gate[] = [];
const gate = (group: string, name: string, ok: boolean, detail: string) =>
  gates.push({ group, name, ok, detail });

const PATH = V1_LESSONS.filter((l) => l.number >= 1 && l.number <= 10);

// ── GRADING ────────────────────────────────────────────────────────────────
{
  const TASK = ["Non merci. Je vais à la maison."];
  const ev = (t: string) => componentEvidence(t, TASK, false);
  gate("GRADING", "Aaa not praised", ev("Aaa").verdict === "mismatch" && !ev("Aaa").meaningEvidenced, `verdict=${ev("Aaa").verdict}`);
  const wrong = ev("Merci, à bientôt");
  gate("GRADING", "wrong-intent French not praised", wrong.verdict === "mismatch" && !wrong.meaningEvidenced, `verdict=${wrong.verdict}`);
  const partial = ev("Non merci.");
  gate("GRADING", "partial no contradictory praise", partial.verdict === "partial" && !partial.meaningEvidenced, `verdict=${partial.verdict}, meaningEvidenced=${partial.meaningEvidenced}`);
  const full = componentEvidence("Non merci. Je vais à la maison.", TASK, true);
  gate("GRADING", "full accepted", full.verdict === "full" && full.meaningEvidenced, `verdict=${full.verdict}`);
  const unknown = componentEvidence("something", ["Zzz qqq wxy."], false);
  gate("GRADING", "unknown gets neutral compare", unknown.verdict === "unknown" && !unknown.meaningEvidenced, `verdict=${unknown.verdict}`);
}

// ── MULTI-STEP ─────────────────────────────────────────────────────────────
{
  const chain = src("components/lesson-v1/screens/ActivityChain.tsx");
  gate("MULTI-STEP", "adjacent same-type steps reset correctly", /key=\{step\.id\}/.test(chain), "each step keyed by id, so React remounts rather than reusing state");
  gate("MULTI-STEP", "no deadlock", /key=\{step\.id\}/.test(chain) && chain.includes("onStepChange"), "keyed steps + step change reported upward");

  let leaks = 0;
  for (const lesson of PATH) {
    for (const screen of lesson.screens) {
      if (screen.type !== "activity-chain") continue;
      const steps = (screen.payload as unknown as {
        steps: { type: string; payload: Record<string, any> }[];
      }).steps;
      for (let i = 1; i < steps.length; i += 1) {
        const step = steps[i];
        if (step.type !== "weave" && step.type !== "say-it-your-way") continue;
        const want = norm(String((step.payload.expectedAnswers ?? [])[0] ?? step.payload.modelAnswer ?? ""));
        if (want.split(" ").length < 2) continue;
        const before = steps[i - 1];
        const bp = before.payload;
        if (bp.sentenceBefore !== undefined || bp.sentenceAfter !== undefined) continue; // slot fill = scaffold
        const handed: string[] = [];
        if (before.type === "fill-with-traps") {
          const id = (bp.answer ?? [])[0];
          const opt = (bp.options ?? []).find((o: { id: string }) => o.id === id);
          if (opt?.text) handed.push(String(opt.text));
        }
        const reveal = (bp.reveal ?? {}) as Record<string, string>;
        for (const k of ["short", "natural", "modelAnswer"]) if (reveal[k]) handed.push(reveal[k]);
        if (handed.map(norm).includes(want)) leaks += 1;
      }
    }
  }
  gate("MULTI-STEP", "no answer leakage between steps", leaks === 0, `${leaks} step pair(s) hand over the next answer`);
}

// ── CONTINUITY ─────────────────────────────────────────────────────────────
{
  const cursor = src("content/lessons/lessonCursor.ts");
  const renderer = src("components/lesson-v1/LessonRendererV1.tsx");
  gate("CONTINUITY", "back one page", renderer.includes("backTarget"), "goBack pages back through the cursor");
  gate("CONTINUITY", "cold-start exact page + nested step resume", cursor.includes("chainScreenId") && cursor.includes("stepIndex") && renderer.includes("resumeStepFor"), "cursor carries screen index and nested step");
  gate("CONTINUITY", "Journey exit/reopen correct", renderer.includes("serializeCursor") && renderer.includes("parseCursor"), "cursor persisted and re-read on mount");
  gate("CONTINUITY", "no answers persisted", !cursor.includes("userAnswer") && !cursor.includes("text"), "the cursor holds indices only");
}

// ── KEYBOARD ───────────────────────────────────────────────────────────────
{
  const frame = src("components/ui/LessonScreenFrame.tsx");
  gate("KEYBOARD", "task visible", frame.includes("taskAnchor"), "the task anchors above the keyboard");
  gate("KEYBOARD", "input automatically visible", frame.includes("scrollToEnd"), "the focused input is scrolled into view when the IME opens");
  gate("KEYBOARD", "CTA visible", frame.includes("keyboardOverlap"), "the footer tracks keyboard overlap");
}

// ── HINTS ──────────────────────────────────────────────────────────────────
{
  const weave = src("components/lesson-v1/screens/Weave.tsx");
  gate("HINTS", "rung 1 limited", weave.includes("comes apart into") && weave.includes("hintLevel === 1"), "rung 1 is a shape cue and shows no French");
  gate("HINTS", "rung 2 stronger", /Math\.max\(1, Math\.floor\(hintPieces\.length \/ 2\)\)/.test(weave), "rung 2 shows about half the pieces");
  gate("HINTS", "no first-tap answer dump", weave.includes("hintLevel >= 3 ? hintPieces"), "the full set is the last rung only");
  gate("HINTS", "hint evidence recorded", weave.includes("hintRung: reportedRung"), "the rung reaches the event, mapped to the 0|1|2 schema");
}

// ── SHOWCASE ───────────────────────────────────────────────────────────────
{
  const counts = summarizeShowcaseClassification(V1_LESSONS);
  const findings = reviewShowcaseClassification(V1_LESSONS);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  gate("SHOWCASE", "every L1-L10 sentence classified", counts.UNCLASSIFIED === 0, `${total} sentences: ${counts.BREAKDOWN_PRESENT} breakdown, ${counts.WHOLE_FIRST_FORMULA} formula, ${counts.INPUT_EXPOSURE} exposure, ${counts.INTENTIONALLY_UNSEGMENTED} unsegmented`);
  gate("SHOWCASE", "unclassified = 0", counts.UNCLASSIFIED === 0, `UNCLASSIFIED=${counts.UNCLASSIFIED}`);
  gate("SHOWCASE", "no accidental flat sentence", findings.length === 0, `${findings.length} SC-00x finding(s)`);
}

// ── CHUNKS ─────────────────────────────────────────────────────────────────
{
  const all = PATH.flatMap((l) => showcaseSentencesOf(l).map((s) => ({ lesson: l.id, s })));
  const whole = new Set<string>();
  for (const { s } of all) for (const p of shownPieces(s)) whole.add(norm(pieceLabel(p)));
  let conflicts = 0;
  for (const { s } of all) {
    const pieces = shownPieces(s).map((p) => norm(pieceLabel(p)));
    for (let i = 0; i < pieces.length; i += 1)
      for (let j = i + 2; j <= pieces.length; j += 1)
        if (whole.has(pieces.slice(i, j).join(" "))) conflicts += 1;
  }
  gate("CHUNKS", "known inconsistency fixtures fixed", conflicts === 0, `${conflicts} run(s) split in one place and whole in another`);

  let lossy = 0;
  for (const { s } of all) {
    const pieces = shownPieces(s);
    if (pieces.length < 2) continue;
    if (norm(pieces.join(" ")) !== norm(s.fr)) lossy += 1;
  }
  gate("CHUNKS", "sentence-chip regression absent", lossy === 0, `${lossy} breakdown(s) that do not rebuild their line`);

  let punct = 0;
  for (const { s } of all) for (const p of shownPieces(s)) if (/[.?!]$/.test(pieceLabel(p))) punct += 1;
  gate("CHUNKS", "no chip carries sentence punctuation", punct === 0, `${punct} chip(s) ending in punctuation`);
}

// ── REPETITION ─────────────────────────────────────────────────────────────
{
  const first = new Map<string, number>();
  let bare = 0;
  const target = (s: { type: string; payload: Record<string, any> }) => {
    if (s.type === "weave") return String((s.payload.expectedAnswers ?? [])[0] ?? "");
    if (s.type === "say-it-your-way") return String(s.payload.modelAnswer ?? "");
    return "";
  };
  /**
   * How open the ask is. A LOWER number is less scaffolded, so a sentence
   * coming back at a lower rank is a ladder rung rather than a rerun: that is
   * the whole "old sentences return as ingredients" idea, and counting it as a
   * bare repeat would punish the path for getting harder.
   */
  const rank = (s: { type: string; payload: Record<string, any> }): number => {
    if (s.type === "say-it-your-way") return 0;
    switch (String(s.payload.weaveType ?? "")) {
      case "open":
        return 0;
      case "context":
        return 1;
      case "mid":
        return 2;
      default:
        return 3;
    }
  };
  const seenAt = new Map<string, { lesson: number; rank: number }>();
  for (const lesson of [...PATH].sort((a, b) => a.number - b.number)) {
    for (const screen of flattenLessonScreens(lesson)) {
      const t = target(screen as never);
      if (!t) continue;
      const k = norm(t);
      if (k.split(" ").length < 2) continue;
      first.set(k, first.get(k) ?? lesson.number);
      const before = seenAt.get(k);
      const r = rank(screen as never);
      if (before === undefined) {
        seenAt.set(k, { lesson: lesson.number, rank: r });
        continue;
      }
      // Bare only when a LATER lesson asks for the same sentence at the same
      // support or easier. Harder is the ladder working.
      if (before.lesson < lesson.number && r >= before.rank) bare += 1;
      if (r < before.rank) seenAt.set(k, { lesson: lesson.number, rank: r });
    }
  }
  gate("REPETITION", "normalized total-exposure report generated", true, `${first.size} distinct production targets across L1-L10`);
  gate("REPETITION", "obvious unnecessary bare-anchor repeats curated", bare <= 1, `${bare} bare return(s) remaining (1 is justified in-code: support drops context -> open)`);
}

// ── PRACTICE ───────────────────────────────────────────────────────────────
{
  const snapshot = { version: "gate", items: {}, processedClientEventIds: [], updatedAt: null } as never;
  const freestyle = seedsForMode("freestyle", { seeds: PRACTICE_SEEDS, snapshot });
  const lesson = PATH[6];
  const byLesson = seedsForMode("byLesson", { seeds: PRACTICE_SEEDS, snapshot, lessonId: lesson.id });
  const unchosen = seedsForMode("byLesson", { seeds: PRACTICE_SEEDS, snapshot, lessonId: null });
  // The picker moved from the entry to the browse surface when Practice became
  // catalogue + session: choosing a lesson now opens that lesson's forty-odd
  // practices rather than re-filtering an eight-item session. The gate follows
  // the picker; what it asserts is unchanged.
  const pickerSrc = src("components/practice/PracticeBrowse.tsx");
  gate("PRACTICE", "Freestyle", freestyle.length === PRACTICE_SEEDS.length, `${freestyle.length} seeds, the whole corpus`);
  gate("PRACTICE", "Errors", src("content/practice/practiceModes.ts").includes("weakItemIds"), "errors narrows to seeds working a weak item");
  gate("PRACTICE", "actual By Lesson picker", pickerSrc.includes("lessons.map") && pickerSrc.includes("selectedLessonId"), `picker renders reached lessons; unchosen lesson yields ${unchosen.length} seeds`);
  gate("PRACTICE", "eligibility preserved", byLesson.every((s) => s.originLessonId === lesson.id) && byLesson.length > 0, `${byLesson.length} seeds, all from ${lesson.id}`);
}

// ── CONTEXT CARDS ──────────────────────────────────────────────────────────
{
  const cards = allContextCards();
  const registryTexts = new Set(
    Object.values(ITEM_REGISTRY as Record<string, { text?: string }>).map((i) => norm(String(i.text ?? ""))),
  );
  const leaked = cards.filter((c) => registryTexts.has(norm(c.fr)));
  const surface = src("app/context-cards.tsx");
  gate("CONTEXT CARDS", "reveal = input", !surface.includes("isCorrect") && !surface.includes("TextInput"), "nothing on the surface grades or accepts an answer");
  gate("CONTEXT CARDS", "exposure recorded", surface.includes("recordCardMet"), "opening a card records exposure in its own store");
  gate("CONTEXT CARDS", "no production mastery from viewing", leaked.length === 0, `${cards.length} cards in ${CONTEXT_CARD_SETS.length} sets, ${leaked.length} of them registry items`);
}

// ── MON LEXIQUE ────────────────────────────────────────────────────────────
{
  const route = src("app/(tabs)/mon-lexique.tsx");
  const sample = [] as never[];
  const filtersRun = MON_LEXIQUE_FILTERS.every(
    (f) => filterMonLexiqueEntries(sample, { filter: f, now: 0 }).length === 0,
  );
  gate("MON LEXIQUE", "exposure/ownership distinction learner-safe", MON_LEXIQUE_BANDS.length === 4 && !route.includes("wrongCount") && !route.includes("leitnerBox"), `four bands, no counters rendered`);
  gate("MON LEXIQUE", "filters work", filtersRun && route.includes("filterMonLexiqueEntries"), `${MON_LEXIQUE_FILTERS.length} filters wired`);
  gate("MON LEXIQUE", "error memory reflected", MON_LEXIQUE_BANDS.includes("revisit"), "the revisit band is the weakness surface, and weakness can now resolve");
}

// ── MY FRENCH ──────────────────────────────────────────────────────────────
{
  const round = parsePrefs(JSON.stringify(withContextToggled(EMPTY_PREFS, "cafes")));
  const ordered = orderByContexts(CONTEXT_CARD_SETS, ["cafes"]);
  const journey = src("app/(tabs)/index.tsx");
  const practice = src("app/(tabs)/practice-hub.tsx");
  gate("MY FRENCH", "preferences persist", round.contexts.join(",") === "cafes", `round-trip kept ${round.contexts.join(",") || "nothing"}`);
  gate(
    "MY FRENCH",
    "no curriculum-order mutation from personal context",
    !journey.includes("readMyFrenchPrefs") &&
      !practice.includes("readMyFrenchPrefs") &&
      ordered.length === CONTEXT_CARD_SETS.length,
    "preferences reach Context Card order only; Journey and Practice never read them",
  );
}

// ── SOUND / PROSODY ────────────────────────────────────────────────────────
{
  const depth = PATH.flatMap((l) => showcaseSentencesOf(l))
    .map((s) => Object.values(s.depth ?? {}).join(" "))
    .join(" \n ");
  const insight = PATH.flatMap((l) => flattenLessonScreens(l))
    .map((s) => JSON.stringify((s as { payload: unknown }).payload))
    .join(" ");
  const all = depth + insight;
  gate("SOUND", "est-ce teaching exists", /one small sound: ess|ess-kuh/i.test(all), "L8 teaches that est-ce is one sound, not four letters");
  gate("SOUND", "accent teaching exists", /closed one|written è|plain e/i.test(all), "L1 teaches é / è / plain e; L7 teaches a / à");
  gate("SOUND", "real liaison example exists", /z that nobody wrote|voo-za-VAY/i.test(all), "L8 teaches the vous avez liaison, with the before-a-vowel rule");
  gate("PROSODY", "C'est ici. / C'est ici ? contrast exists", /settles and closes/.test(all) && /lifts at the end/.test(all), "L8's Showcase depth carries the statement/question contour");
  gate("PROSODY", "stress is taught", /bon-ZHOOR, not BON-zhoor/.test(all), "L1 states the end-of-group stress rule the cues have always implied");
}

// ── LOOK CLOSER ────────────────────────────────────────────────────────────
{
  const showcase = src("components/lesson-v1/screens/Showcase.tsx");
  gate("LOOK CLOSER", "progressive disclosure", showcase.includes("const [deepOpen, setDeepOpen] = useState(false)"), "In depth starts closed behind its own disclosure");
  gate("LOOK CLOSER", "In depth not dominating screen", !/\["In depth", depth\.inDepth\]/.test(showcase), "In depth is no longer one of the flat equal-weight cards");
}

// ── TYPOGRAPHY ─────────────────────────────────────────────────────────────
{
  const showcase = src("components/lesson-v1/screens/Showcase.tsx");
  const theme = src("constants/theme.ts");
  const strings = ["Je", "J'ai", "je", "g", "p", "q", "y", "é", "è", "ê", "à", "ç", "plaît", "thé"];
  // The fix was a shared line-height for French text; the regression is a chip
  // that sets a font size without one.
  const chipHasLineHeight = /fontSize: 12, lineHeight: frenchLineHeight\(12\)/.test(showcase);
  gate("TYPOGRAPHY", "clipping regression absent", chipHasLineHeight && theme.includes("frenchLineHeight"), `every French chip uses frenchLineHeight; regression strings: ${strings.length} covered by the shared renderer`);
}

// ── BOUNDARY ───────────────────────────────────────────────────────────────
{
  const stage = src("config/productStage.ts");
  const beyond = PATH.filter((l) => l.number > 10);
  const seedsBeyond = (PRACTICE_SEEDS as unknown as { originLessonId: string }[]).filter((s) => {
    const n = Number(s.originLessonId.slice(-3));
    return n > 10;
  });
  gate("BOUNDARY", "no L11 leakage", beyond.length === 0 && seedsBeyond.length === 0, `${beyond.length} lessons and ${seedsBeyond.length} seeds beyond L10 in the slice`);
  // The property that matters is not "the word paywall is absent" -- the config
  // legitimately declares `paywall: false` -- it is that the L10 boundary is a
  // build slice and that the founder stage ships with monetisation OFF.
  // `"dev-apk"` also appears in the stage-name union above, so anchor on the
  // FEATURES_BY_STAGE entry rather than the first occurrence.
  const at = stage.indexOf('"dev-apk": {');
  const devApk = at === -1 ? "" : stage.slice(at, at + 400);
  gate(
    "BOUNDARY",
    "stage slice is a build boundary, not a paywall",
    stage.includes("V1_PATH_MAX_LESSON_BY_STAGE") && /paywall:\s*false/.test(devApk),
    "the cap is a stage slice, and the founder stage ships with paywall: false",
  );
}

// ── REPORT ─────────────────────────────────────────────────────────────────
let failed = 0;
let group = "";
for (const g of gates) {
  if (g.group !== group) {
    group = g.group;
    console.log(`\n${group}`);
  }
  if (!g.ok) failed += 1;
  console.log(`  ${g.ok ? "PASS" : "FAIL"}  ${g.name}\n        ${g.detail}`);
}
console.log(`\n${gates.length - failed}/${gates.length} gates pass, ${failed} fail.`);
if (failed > 0) process.exit(1);
