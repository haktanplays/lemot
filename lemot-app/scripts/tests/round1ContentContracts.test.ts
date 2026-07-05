/**
 * Round 1 expanded content-contract tests (L0-L6, stacked on PR #174).
 *
 * Locks the learner-facing shape of the visible dev-APK slice so a future
 * content edit cannot silently: change screen counts, resurrect trimmed
 * surfaces (madame/monsieur, un restaurant/une maison), promote ghost-tier
 * items into production, alter the survival formulas byte-for-byte, or
 * break the L1-L6 prerequisite chain.
 *
 * Companion doc: docs/workstreams/ROUND1_EXPANDED_TEST_MATRIX.md — invariants
 * that are NOT technically testable here (viewport wrap, TTS crowding, tap
 * targets) are listed there as operator device smoke.
 *
 * Pure tsx: imports content modules and reads one source file as text.
 * No React Native / Expo / rendering.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, test, assert, assertEqual } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";

type AnyScreen = { id: string; type: string; payload: any };

const byNumber = new Map(V1_LESSONS.map((l) => [l.number, l]));

function lessonByNumber(n: number) {
  const l = byNumber.get(n);
  assert(l, `v1 lesson number ${n} is missing from V1_LESSONS`);
  return l;
}

function screensOf(n: number): AnyScreen[] {
  return lessonByNumber(n).screens as unknown as AnyScreen[];
}

/** Every string VALUE reachable inside the given screens (keys excluded). */
function collectStrings(screens: AnyScreen[]): string[] {
  const out: string[] = [];
  const walk = (v: unknown): void => {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk(screens);
  return out;
}

/**
 * Production / requirement surfaces: strings a learner must tap, produce,
 * or match to be correct. Ghost- and seen-tier material must never appear
 * here (it may appear in example/insight copy).
 */
function productionSurfaces(screens: AnyScreen[]): string[] {
  const out: string[] = [];
  for (const s of screens) {
    const p = s.payload ?? {};
    for (const piece of p.suggestedPieces ?? []) out.push(String(piece.text));
    for (const a of p.expectedAnswers ?? []) out.push(String(a));
    for (const a of p.acceptedAlternatives ?? []) out.push(String(a));
    for (const o of p.options ?? []) out.push(String(o.text));
    if (typeof p.hintCloze === "string") out.push(p.hintCloze);
    for (const chip of p.piecesUsed ?? []) out.push(String(chip));
  }
  return out;
}

const FRENCH_TOKEN = /[a-zà-öø-ÿœ]+/gi;

function tokensOf(strings: string[]): Set<string> {
  const set = new Set<string>();
  for (const s of strings) {
    for (const m of s.toLowerCase().matchAll(FRENCH_TOKEN)) set.add(m[0]);
  }
  return set;
}

function joinedLower(strings: string[]): string {
  return strings.join("\n").toLowerCase();
}

/** Ghost word: present somewhere learner-facing, absent from production. */
function assertGhostOnlyToken(n: number, token: string): void {
  const screens = screensOf(n);
  assert(
    tokensOf(collectStrings(screens)).has(token),
    `L${n}: expected ghost token "${token}" to appear in learner-facing example copy`,
  );
  assert(
    !tokensOf(productionSurfaces(screens)).has(token),
    `L${n}: ghost token "${token}" leaked into a production surface (pieces/expected/accepted/options/hintCloze/piecesUsed)`,
  );
}

describe("round1 content contracts (L0-L6)", () => {
  test("V1 lessons include L0-L6, in ascending order", () => {
    for (let n = 0; n <= 6; n += 1) lessonByNumber(n);
    const numbers = V1_LESSONS.map((l) => l.number);
    const sorted = [...numbers].sort((a, b) => a - b);
    assertEqual(numbers, sorted, "V1_LESSONS must stay ordered by lesson number");
  });

  test("L1 has no prerequisites; L2-L6 chain sequentially", () => {
    assertEqual(lessonByNumber(1).prerequisites, [], "L1 prerequisites must stay []");
    for (let n = 2; n <= 6; n += 1) {
      assertEqual(
        lessonByNumber(n).prerequisites,
        [lessonByNumber(n - 1).id],
        `L${n} prerequisites must be exactly [previous lesson id]`,
      );
    }
  });

  test("Home dev-apk lesson cap source contract stays L1-L6", () => {
    // The cap lives inline in the Home component; it cannot be imported
    // without rendering, so this is a deliberate source-text contract:
    // changing the visible-lesson window must break a test on purpose.
    const source = readFileSync(join(process.cwd(), "app", "(tabs)", "index.tsx"), "utf8");
    assert(
      source.includes("l.number >= 1 && l.number <= 6"),
      "Home cap expression changed: app/(tabs)/index.tsx no longer filters lessons to 1..6 with the locked expression",
    );
  });

  test("screen counts (including the lesson-goal card) match PR #174", () => {
    const expected: Record<number, number> = { 1: 13, 2: 11, 3: 13, 4: 12, 5: 12, 6: 12 };
    for (const [n, count] of Object.entries(expected)) {
      assertEqual(
        screensOf(Number(n)).length,
        count,
        `L${n} learner-facing screen count changed`,
      );
    }
  });

  test("L6 stays payoff-only: #174 added one reveal alternative, no new teaching", () => {
    const l6 = lessonByNumber(6);
    const withAlternative = (l6.screens as unknown as AnyScreen[]).find((s) =>
      (s.payload?.reveal?.naturalAlternatives ?? []).includes(
        "Excusez-moi, j'ai une question. Merci. Au revoir.",
      ),
    );
    assert(withAlternative, "L6: the #174 excusez-moi reveal alternative is missing");
    const kademeIds = new Set([
      "chunk-excusez-moi",
      "formula-je-ne-comprends-pas",
      "formula-vous-pouvez-repeter",
      "noun-the",
      "chunk-un-the",
      "adjective-fatigue",
      "noun-soif",
      "noun-table",
      "chunk-une-table",
    ]);
    for (const item of l6.learningItems) {
      assert(
        !kademeIds.has(item.id),
        `L6 must gain no Kademe 2 learningItems; found "${item.id}"`,
      );
    }
  });

  test("composed sentences stay forbidden as chips in every lesson", () => {
    // Set-level freezes (PROTECTED_CHUNKS / SURVIVAL_FORMULAS exactly two
    // members each; je ne peux pas / vous pouvez m'aider ? rejected by the
    // lint) are already locked by the chip-canon guard test in
    // v1LessonStructure.test.ts. This is the CONTENT-side complement: the
    // forbidden lines must not exist as chips anywhere in shipped lessons.
    for (const lesson of V1_LESSONS) {
      const screens = lesson.screens as unknown as AnyScreen[];
      for (const s of screens) {
        const chips: string[] = [
          ...(s.payload?.suggestedPieces ?? []).map((x: any) => String(x.text)),
          ...(s.payload?.piecesUsed ?? []).map(String),
        ];
        for (const chip of chips) {
          const c = chip.trim().toLowerCase();
          assert(
            c !== "je ne peux pas",
            `${lesson.id}/${s.id}: "je ne peux pas" must never be a chip (composes from je peux + ne ___ pas)`,
          );
          assert(
            c !== "vous pouvez m'aider ?" && c !== "vous pouvez m'aider",
            `${lesson.id}/${s.id}: the help question must never be a chip (composes from vous pouvez + m'aider)`,
          );
        }
      }
    }
  });

  test("L1 learner-facing strings contain no madame / monsieur", () => {
    const pool = tokensOf(collectStrings(screensOf(1)));
    assert(!pool.has("madame"), "L1: madame resurfaced in learner-facing copy (trimmed 2026-07-04)");
    assert(!pool.has("monsieur"), "L1: monsieur resurfaced in learner-facing copy (trimmed 2026-07-04)");
  });

  test("L5 learner-facing strings contain no un restaurant / une maison", () => {
    const pool = joinedLower(collectStrings(screensOf(5)));
    assert(!pool.includes("restaurant"), "L5: restaurant resurfaced (trimmed 2026-07-04)");
    assert(!pool.includes("maison"), "L5: maison resurfaced (trimmed 2026-07-04)");
  });

  test("L4 learner-facing strings contain no il y a", () => {
    const pool = joinedLower(collectStrings(screensOf(4)));
    assert(!pool.includes("il y a"), "L4: il y a leaked into learner-facing copy (deferred doorway)");
  });

  test("L3: pas de problème and si stay non-productive", () => {
    const screens = screensOf(3);
    const learner = joinedLower(collectStrings(screens));
    assert(learner.includes("pas de problème"), "L3: the pas de problème ghost example vanished");
    assert(learner.includes(" si"), "L3: the one-line si seed vanished");
    const prod = productionSurfaces(screens);
    assert(
      !joinedLower(prod).includes("pas de problème"),
      "L3: pas de problème leaked into a production surface",
    );
    assert(!tokensOf(prod).has("si"), "L3: si leaked into a production surface");
  });

  test("ghost-tier words stay example-only (never produced, suggested, or chipped)", () => {
    assertGhostOnlyToken(1, "croissant");
    assertGhostOnlyToken(2, "là");
    assertGhostOnlyToken(2, "prêt");
    assertGhostOnlyToken(4, "froid");
    assertGhostOnlyToken(4, "chaud");
  });

  test("ghost words never appear inside expectedAnswers / acceptedAlternatives (L0-L6)", () => {
    const ghosts = ["croissant", "là", "prêt", "froid", "chaud", "madame", "monsieur", "restaurant", "maison"];
    for (let n = 0; n <= 6; n += 1) {
      const answers: string[] = [];
      for (const s of screensOf(n)) {
        answers.push(...(s.payload?.expectedAnswers ?? []), ...(s.payload?.acceptedAlternatives ?? []));
      }
      const toks = tokensOf(answers);
      for (const g of ghosts) {
        assert(!toks.has(g), `L${n}: ghost/seen word "${g}" appears in an expected or accepted answer`);
      }
    }
  });

  test("recap piecesUsed chips are exercised production pieces (L0-L6)", () => {
    for (let n = 0; n <= 6; n += 1) {
      const screens = screensOf(n);
      const exercisePool = JSON.stringify(
        screens.filter((s) => ["fill-with-traps", "weave", "say-it-your-way"].includes(s.type)),
      ).toLowerCase();
      for (const s of screens) {
        for (const chip of s.payload?.piecesUsed ?? []) {
          assert(
            exercisePool.includes(String(chip).toLowerCase()),
            `L${n}: recap chip "${chip}" is not exercised by any fill/weave/say-it in the lesson (ownership hygiene)`,
          );
        }
      }
    }
  });

  test("L1 rescue area carries the survival formulas byte-for-byte", () => {
    const rescue = screensOf(1).find((s) => s.id === "s07c-weave-rescue");
    assert(rescue, "L1: s07c-weave-rescue is missing");
    const pieceTexts = (rescue.payload.suggestedPieces ?? []).map((x: any) => String(x.text));
    assert(
      pieceTexts.includes("je ne comprends pas"),
      "L1 rescue weave: exact chip \"je ne comprends pas\" missing or altered",
    );
    assert(
      pieceTexts.includes("vous pouvez répéter ?"),
      "L1 rescue weave: exact chip \"vous pouvez répéter ?\" missing or altered (accent + spaced ? are part of the surface)",
    );
    assertEqual(
      rescue.payload.expectedAnswers?.[0],
      "Je ne comprends pas. Vous pouvez répéter ?",
      "L1 rescue weave: model pair altered",
    );
    const recap = screensOf(1).find((s) => s.type === "recap");
    assert(recap, "L1: recap screen is missing");
    const chips = (recap.payload.piecesUsed ?? []).map(String);
    assert(
      chips.includes("je ne comprends pas") && chips.includes("vous pouvez répéter ?"),
      "L1 recap: survival formula chips missing or normalized (must keep é and the spaced ?)",
    );
  });
});
