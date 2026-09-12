/**
 * What the showcase's third tier actually means, and what the learner is told
 * about it.
 *
 * ── THE MEASUREMENT THAT CHANGED THE DESIGN ─────────────────────────────────
 *
 * `exposure` was assumed — in a report of mine, and then in the brief that
 * followed it — to mean "French from a later lesson, glimpsed early". It does
 * not. The authoring contract is a DEMAND CEILING: "enlarges the French world,
 * may be seen and heard, may NEVER be a required graded answer." Sixty-nine
 * lines across L1-L10 carry it, and most are ordinary breadth built on the
 * lesson's own engine — "Je suis fatigué." at L2 is `je suis` plus an
 * adjective, not a preview of anything.
 *
 * Worse for the assumed reading, it does not even correlate: twenty-odd
 * exposure lines contain canonical items NO lesson ever declares, while several
 * `core` lines contain items taught later (L1's "Je voudrais un café, s'il vous
 * plaît." holds `chunk-un-cafe`, first taught in L5).
 *
 * So the label the learner now sees promises nothing about arrival, because for
 * most of these nothing is arriving. It says the one thing true of all
 * sixty-nine: you will not be asked for this.
 *
 * These rules pin that, and pin the provenance measurements themselves, so the
 * next reader does not have to re-derive them from scratch — or, worse, trust a
 * summary.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import { knownPieces } from "../../content/lessons/showcasePieces";
import type { Lesson, ShowcaseSentence } from "../../content/lessonTypes";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");
const codeOf = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

const SHOWCASE = "components/lesson-v1/screens/Showcase.tsx";

/** itemId -> the number of the first lesson that declares it. */
const FIRST = new Map<string, number>();
for (const lesson of [...V1_LESSONS].sort((a, b) => a.number - b.number)) {
  for (const item of lesson.learningItems ?? []) {
    if (!FIRST.has(item.id)) FIRST.set(item.id, lesson.number);
  }
}

type Row = { lesson: number; cluster: string; sentence: ShowcaseSentence };
const ROWS: Row[] = [];
for (const lesson of V1_LESSONS) {
  for (const screen of flattenLessonScreens(lesson as Lesson)) {
    if (screen.type !== "showcase") continue;
    for (const cluster of (screen.payload as { clusters: { label: string; sentences: ShowcaseSentence[] }[] })
      .clusters) {
      for (const sentence of cluster.sentences) {
        ROWS.push({ lesson: lesson.number, cluster: cluster.label, sentence });
      }
    }
  }
}
const EXPOSURE = ROWS.filter((r) => r.sentence.role === "exposure");

/** Canonical items in a line that no lesson teaches by `at`. */
function laterItems(fr: string, at: number): { id: string; taught: number | undefined }[] {
  return knownPieces(fr)
    .map((p) => ({ id: p.itemId, taught: FIRST.get(p.itemId) }))
    .filter((x) => x.taught === undefined || x.taught > at);
}

// ── §1: provenance, pinned to the measurement ───────────────────────────────

describe("the three L6 exposure lines, measured from canon", () => {
  const L6_EXPOSURE = EXPOSURE.filter((r) => r.lesson === 6).map((r) => r.sentence.fr);

  test("L6 shows exactly these three, and no more", () => {
    assert(
      L6_EXPOSURE.sort().join(" | ") ===
        ["Bonne journée !", "Pardon, je n'ai pas compris.", "À bientôt !"].sort().join(" | "),
      `L6 exposure is: ${L6_EXPOSURE.join(" | ")}`,
    );
  });

  test("à bientôt is a real glimpse of L7", () => {
    assert(Object.prototype.hasOwnProperty.call(ITEM_REGISTRY, "chunk-a-bientot"), "registered");
    assert(FIRST.get("chunk-a-bientot") === 7, `first taught L${FIRST.get("chunk-a-bientot")}`);
    // And L7 really carries it, at its own tier.
    const inL7 = EXPOSURE.concat(ROWS).find(
      (r) => r.lesson === 7 && r.sentence.fr === "À bientôt !",
    );
    assert(inL7?.sentence.role === "supported", `L7 holds it as ${inL7?.sentence.role}`);
  });

  test("bonne journée is also L7, and was already glimpsed in L1", () => {
    assert(FIRST.get("chunk-bonne-journee") === 7, `first taught L${FIRST.get("chunk-bonne-journee")}`);
    const glimpses = EXPOSURE.filter((r) => r.sentence.fr === "Bonne journée !").map((r) => r.lesson);
    assert(
      glimpses.includes(1) && glimpses.includes(6),
      `glimpsed at: ${glimpses.join(", ")} — L6 is not its first appearance`,
    );
  });

  test("Pardon, je n'ai pas compris. is never taught, and that is not a defect", () => {
    // THE CONTRADICTION, RESOLVED. An earlier report of mine said L7 teaches
    // all three. It does not: this line has no registry item at all, appears
    // exactly once in twenty-five lessons, and never becomes production
    // eligible. That was a reporting error, not a content one — a line that is
    // never taught is exactly what the exposure tier is FOR, and twenty-odd
    // other lines across L1-L10 sit in the same position. Removing it alone
    // would have made the curriculum less consistent, not more true.
    const appearances = ROWS.filter((r) => r.sentence.fr === "Pardon, je n'ai pas compris.");
    assert(appearances.length === 1, `it appears ${appearances.length} times, expected 1`);
    assert(appearances[0]!.lesson === 6, "and only in L6");
    assert(appearances[0]!.sentence.role === "exposure", "at the exposure tier");
    // What the curriculum actually owns of it: the pronoun, and nothing else.
    // `pardon` and `n'ai pas compris` are registered nowhere, so the repair
    // phrasing itself has no identity the learner could ever acquire.
    const pieces = knownPieces("Pardon, je n'ai pas compris.");
    assert(
      pieces.map((p) => p.itemId).join(",") === "pronoun-je",
      `it decomposes to: ${pieces.map((p) => p.itemId).join(", ") || "(nothing)"}`,
    );
    for (const fragment of ["pardon", "n'ai pas compris", "compris"]) {
      assert(
        !Object.values(ITEM_REGISTRY as Record<string, { text: string }>).some(
          (i) => i.text.toLowerCase() === fragment,
        ),
        `"${fragment}" is registered after all — the provenance claim needs re-measuring`,
      );
    }
    // It is never a target, an answer, or a model anywhere.
    for (const lesson of V1_LESSONS) {
      for (const screen of flattenLessonScreens(lesson as Lesson)) {
        if (screen.type === "showcase") continue;
        assert(
          !JSON.stringify(screen.payload).includes("n'ai pas compris"),
          `${lesson.id}/${screen.id} demands language nothing teaches`,
        );
      }
    }
  });

  test("it has plenty of company, so it is a tier and not an oversight", () => {
    const neverTaught = EXPOSURE.filter(
      (r) => laterItems(r.sentence.fr, r.lesson).some((x) => x.taught === undefined),
    );
    assert(
      neverTaught.length >= 10,
      `only ${neverTaught.length} exposure lines contain never-taught items`,
    );
  });
});

// ── §1: what the tier is, and is not ────────────────────────────────────────

describe("exposure is a demand ceiling, not a curriculum-time claim", () => {
  test("most exposure lines are built from French the lesson already owns", () => {
    const ahead = EXPOSURE.filter((r) => laterItems(r.sentence.fr, r.lesson).length > 0);
    assert(
      ahead.length < EXPOSURE.length / 2,
      `${ahead.length} of ${EXPOSURE.length} exposure lines reach past their lesson — ` +
        `if this ever became the majority, "a glimpse ahead" would be the honest label instead`,
    );
  });

  test("and reaching past a lesson is not exclusive to exposure", () => {
    // The other half of why the tier cannot be read as "coming later": core and
    // supported lines do it too.
    const nonExposureAhead = ROWS.filter(
      (r) => r.sentence.role !== "exposure" && laterItems(r.sentence.fr, r.lesson).length > 0,
    );
    assert(
      nonExposureAhead.length > 0,
      "no core/supported line reaches past its lesson — the correlation claim would then hold",
    );
  });

  test("no lesson demands a line it is still only showing", () => {
    // The contract, scoped the way it is actually written: exposure is a
    // ceiling on THIS lesson's demands. A later lesson may absolutely graduate
    // the line — L10 plants "Vous pouvez m'aider ?" as a documented
    // recognition-only doorway and L11 opens it, which is the tier doing its
    // best work. An earlier version of this guard read the ceiling as global
    // and reported that deliberate hand-off as a violation.
    const shownAt = new Map<string, number>();
    for (const row of EXPOSURE) {
      const seen = shownAt.get(row.sentence.fr);
      if (seen === undefined || row.lesson < seen) shownAt.set(row.sentence.fr, row.lesson);
    }
    for (const lesson of V1_LESSONS) {
      for (const screen of flattenLessonScreens(lesson as Lesson)) {
        if (screen.type === "showcase") continue;
        const payload = screen.payload as Record<string, unknown>;
        const demanded = [
          ...((payload.expectedAnswers as string[]) ?? []),
          ...((payload.acceptedAlternatives as string[]) ?? []),
          ...(typeof payload.modelAnswer === "string" ? [payload.modelAnswer] : []),
        ];
        for (const answer of demanded) {
          const glimpsed = shownAt.get(answer);
          if (glimpsed === undefined) continue;
          assert(
            lesson.number > glimpsed,
            `${lesson.id}/${screen.id} demands "${answer}", which L${glimpsed} shows as exposure`,
          );
        }
      }
    }
  });

  test("and the graduation case is real, not hypothetical", () => {
    // Proof that the tier sometimes DOES mean "glimpse ahead" — just not
    // always, which is why the caption cannot promise it.
    const glimpsed = EXPOSURE.find((r) => r.sentence.fr === "Vous pouvez m'aider ?");
    assert(glimpsed?.lesson === 10, "L10 plants the doorway");
    const opener = V1_LESSONS.find((l) => l.number === 11)!;
    assert(
      JSON.stringify(flattenLessonScreens(opener as Lesson)).includes("Vous pouvez m'aider ?"),
      "and L11 opens it",
    );
  });
});

// ── §3, §4: the affordance ──────────────────────────────────────────────────

describe("the learner can see which lines are not theirs to hold", () => {
  test("exposure lines are a trailing block in every cluster", () => {
    // What lets the boundary be one label per cluster rather than a badge per
    // line. If an author ever interleaves them, this fails BEFORE the screen
    // starts drawing a caption over lines it does not describe.
    for (const lesson of V1_LESSONS) {
      for (const screen of flattenLessonScreens(lesson as Lesson)) {
        if (screen.type !== "showcase") continue;
        for (const cluster of (screen.payload as { clusters: { label: string; sentences: ShowcaseSentence[] }[] })
          .clusters) {
          const roles = cluster.sentences.map((s) => s.role);
          const firstExposure = roles.indexOf("exposure");
          if (firstExposure === -1) continue;
          assert(
            roles.slice(firstExposure).every((r) => r === "exposure"),
            `${lesson.id} "${cluster.label}" interleaves exposure with owned material`,
          );
        }
      }
    }
  });

  test("the boundary is drawn, once, where the tier changes", () => {
    const code = codeOf(read(SHOWCASE));
    assert(code.includes("ExposureBoundary"), "the screen draws a boundary");
    assert(
      code.includes('sentence.role === "exposure"') &&
        code.includes('cluster.sentences[si - 1]?.role !== "exposure"'),
      "and only at the first exposure line of a cluster",
    );
  });

  test("it promises nothing about arrival", () => {
    // Twenty-odd of these never arrive. "A glimpse ahead" would be a new lie
    // told to fix an old one.
    const code = read(SHOWCASE);
    const caption = code.slice(code.indexOf("function ExposureBoundary"), code.indexOf("function Line"));
    for (const promise of ["glimpse ahead", "coming", "later lesson", "next lesson", "soon", "you will learn"]) {
      assert(
        !caption.toLowerCase().includes(promise),
        `the caption promises "${promise}" for lines that may never arrive`,
      );
    }
    assert(caption.includes("Worth noticing"), "the kicker states the tier");
    assert(caption.includes("Nothing here is asked of you"), "and says what is true of all of them");
  });

  test("it is not a badge, a lock, or disabled UI", () => {
    const code = codeOf(read(SHOWCASE));
    const caption = code.slice(code.indexOf("function ExposureBoundary"), code.indexOf("function Line"));
    for (const banned of ["Lock", "opacity:", "P.red", "P.rb", "backgroundColor", "borderRadius: 9999"]) {
      assert(!caption.includes(banned), `the boundary must not use ${banned}`);
    }
  });

  test("owned and current-lesson lines are untouched", () => {
    // §4. The Line component knows nothing about roles at all, so a core or
    // supported sentence cannot acquire the treatment.
    const code = codeOf(read(SHOWCASE));
    const line = code.slice(code.indexOf("function Line("), code.indexOf("function PieceReveal"));
    assert(!line.includes('"exposure"'), "Line must not branch on the authoring role");
    assert(!line.includes("ExposureBoundary"), "and must not draw the caption itself");
  });

  test("drawing it changes nothing about the learner", () => {
    // §5. The showcase is a breadth surface: it grades nothing, records
    // nothing, and has no targets. Rendering a caption did not change that.
    const code = codeOf(read(SHOWCASE));
    for (const banned of [
      "recordEvent",
      "recordExposure",
      "onExposure",
      "targetItemIds",
      "MasterySnapshot",
      "useReachedItemIds",
      "monLexique",
    ]) {
      assert(!code.includes(banned), `the showcase must not ${banned}`);
    }
  });

  test("an exposure line never becomes a recap piece", () => {
    const exposureSurfaces = new Set(EXPOSURE.map((r) => r.sentence.fr.toLowerCase()));
    for (const lesson of V1_LESSONS) {
      for (const screen of flattenLessonScreens(lesson as Lesson)) {
        if (screen.type !== "recap") continue;
        for (const piece of (screen.payload as { piecesUsed?: string[] }).piecesUsed ?? []) {
          assert(
            !exposureSurfaces.has(piece.toLowerCase()),
            `${lesson.id} recaps "${piece}", which is exposure-tier`,
          );
        }
      }
    }
  });
});
