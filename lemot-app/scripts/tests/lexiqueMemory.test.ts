/**
 * Lexique Memory v0.1 derived-layer tests (Faz 4B; spec §65 + §65.9 plan).
 *
 * Covers: formula anchors, property-style monotonicity loops, lifecycle
 * transitions incl. the consolidation guard, illegal jumps (exposure/
 * recognition never Known), no-mutation/no-mastery-from-open, weakness
 * behavior, flashcard/carryover separation, and the friendly projection.
 *
 * Precision note pinned here (reported in the Faz 4B PR): with the exact
 * §65.3 constants, strength(P=3) = 1 − e^(−1.2) ≈ 0.6988 — marginally BELOW
 * STRONG_THRESHOLD (0.70). The spec anchor says "≈ 0.70", which is accurate;
 * crossing the Known threshold requires slightly more evidence (P=3 + R=1
 * ≈ 0.727, or P=4 ≈ 0.798). Tests below encode the real math.
 */
import { describe, test, assert } from "./harness";
import type { ItemMastery } from "../../content/learning-engine/mastery";
import {
  LEXIQUE_LIFECYCLE_STATUSES,
  SUPPORTED_THRESHOLD,
  STRONG_THRESHOLD,
  WEAK_RESIDUAL_FLOOR,
  HALF_LIFE_DEFAULT_DAYS,
  CONSOLIDATION_REST_DAYS,
  clamp01,
  daysBetween,
  calculateStrengthScore,
  calculateWeaknessScore,
  calculateDecayScore,
  calculateRefreshDueScore,
  deriveLexiqueMemory,
  projectMonLexiqueFriendlyStatus,
} from "../../content/learning-engine/lexique-memory";

const DAY_MS = 24 * 60 * 60 * 1000;
/** Fixed clock — the pure layer takes `now` explicitly; no Date.now anywhere. */
const NOW = 1_800_000_000_000;

function mkMastery(overrides: Partial<ItemMastery> = {}): ItemMastery {
  return {
    itemId: "chunk:test",
    seenCount: 0,
    recognitionAttempts: 0,
    recognitionSuccess: 0,
    recognitionFailure: 0,
    productionAttempts: 0,
    productionSuccess: 0,
    productionFailure: 0,
    wrongCount: 0,
    skipCount: 0,
    precisionCount: 0,
    precisionTags: {},
    lastSeenAt: null,
    lastProducedAt: null,
    weakTags: {},
    isWeak: false,
    promptFadeLevel: "PF0",
    leitnerBox: 0,
    dueAt: null,
    monLexiqueStatus: "hidden",
    practiceEligibility: "none",
    ...overrides,
  };
}

/** Item with P clean productions, last produced/seen `agoDays` before NOW. */
function producedItem(p: number, agoDays: number, extra: Partial<ItemMastery> = {}): ItemMastery {
  const at = NOW - agoDays * DAY_MS;
  return mkMastery({
    seenCount: p,
    productionAttempts: p,
    productionSuccess: p,
    lastSeenAt: at,
    lastProducedAt: at,
    ...extra,
  });
}

const approx = (a: number, b: number, eps = 0.01): boolean => Math.abs(a - b) < eps;

describe("lexique memory › formula anchors", () => {
  test("zero successes → strength 0", () => {
    assert(
      calculateStrengthScore({ successfulProductionCount: 0, recognitionCount: 0 }) === 0,
      "strength must start at 0",
    );
  });

  test("1 production ≈ 0.33", () => {
    const s = calculateStrengthScore({ successfulProductionCount: 1, recognitionCount: 0 });
    assert(approx(s, 0.33), `expected ≈0.33, got ${s}`);
  });

  test("3 productions ≈ 0.70 — and marginally BELOW the strong threshold", () => {
    const s = calculateStrengthScore({ successfulProductionCount: 3, recognitionCount: 0 });
    assert(approx(s, 0.7), `expected ≈0.70, got ${s}`);
    // Pinned precision fact: P=3 alone does not cross STRONG_THRESHOLD.
    assert(s < STRONG_THRESHOLD, `P=3 (${s}) must sit just below ${STRONG_THRESHOLD}`);
    const withRecognition = calculateStrengthScore({
      successfulProductionCount: 3,
      recognitionCount: 1,
    });
    assert(
      withRecognition >= STRONG_THRESHOLD,
      `P=3 + R=1 (${withRecognition}) must cross the threshold`,
    );
  });

  test("one recognition alone < SUPPORTED_THRESHOLD", () => {
    const s = calculateStrengthScore({ successfulProductionCount: 0, recognitionCount: 1 });
    assert(
      s < SUPPORTED_THRESHOLD,
      `a single recognition (${s}) must never grant production mastery`,
    );
  });

  test("decay at exactly one half-life ≈ 0.5", () => {
    const d = calculateDecayScore(0.3, NOW - HALF_LIFE_DEFAULT_DAYS * DAY_MS, NOW);
    assert(approx(d, 0.5), `expected ≈0.5 at half-life, got ${d}`);
  });

  test("all scores clamp to 0..1 under extreme inputs", () => {
    const s = calculateStrengthScore({ successfulProductionCount: 10_000, recognitionCount: 10_000 });
    const w = calculateWeaknessScore({ wrongCount: 10_000, everWeak: true });
    const d = calculateDecayScore(0.1, NOW - 10_000 * DAY_MS, NOW);
    const r = calculateRefreshDueScore({
      strengthScore: 1, weaknessScore: 1, decayScore: 1, lastSeenAt: null, now: NOW,
    });
    for (const [label, x] of [["strength", s], ["weakness", w], ["decay", d], ["refresh", r]] as const) {
      assert(x >= 0 && x <= 1, `${label} out of range: ${x}`);
    }
    assert(clamp01(-5) === 0 && clamp01(5) === 1, "clamp01 bounds");
    assert(daysBetween(NOW, NOW - DAY_MS) === 0, "daysBetween floors at 0");
  });
});

describe("lexique memory › property loops", () => {
  test("strength is monotone non-decreasing in production", () => {
    let prev = -1;
    for (let p = 0; p <= 30; p++) {
      const s = calculateStrengthScore({ successfulProductionCount: p, recognitionCount: 0 });
      assert(s >= prev, `strength dropped at P=${p}`);
      prev = s;
    }
  });

  test("strength is monotone non-decreasing in recognition", () => {
    let prev = -1;
    for (let r = 0; r <= 30; r++) {
      const s = calculateStrengthScore({ successfulProductionCount: 1, recognitionCount: r });
      assert(s >= prev, `strength dropped at R=${r}`);
      prev = s;
    }
  });

  test("decay is monotone non-decreasing over time", () => {
    let prev = -1;
    for (let days = 0; days <= 60; days++) {
      const d = calculateDecayScore(0.3, NOW - days * DAY_MS, NOW);
      assert(d >= prev, `decay dropped at day ${days}`);
      prev = d;
    }
  });

  test("time passing never changes strength (decay is a separate axis)", () => {
    const m = producedItem(2, 0);
    for (let days = 0; days <= 60; days += 5) {
      const state = deriveLexiqueMemory(m, NOW + days * DAY_MS);
      const fresh = deriveLexiqueMemory(m, NOW);
      assert(
        state.strengthScore === fresh.strengthScore,
        `strength changed with now at day ${days}`,
      );
    }
  });

  test("seen/exposure volume never increases strength", () => {
    for (const seen of [1, 10, 1000]) {
      const state = deriveLexiqueMemory(
        mkMastery({ seenCount: seen, lastSeenAt: NOW }),
        NOW,
      );
      assert(state.strengthScore === 0, `seenCount=${seen} raised strength`);
    }
  });
});

describe("lexique memory › lifecycle", () => {
  test("no contact → unknown, friendly null", () => {
    const state = deriveLexiqueMemory(mkMastery(), NOW);
    assert(state.lifecycleStatus === "unknown", `got ${state.lifecycleStatus}`);
    assert(state.friendlyStatus === null, "unknown has no learner-facing band");
  });

  test("exposure-only → ghost → 'Seen in model answers'", () => {
    const state = deriveLexiqueMemory(
      mkMastery({ seenCount: 3, lastSeenAt: NOW - DAY_MS }),
      NOW,
    );
    assert(state.exposureOnly === true, "must be exposureOnly");
    assert(state.lifecycleStatus === "ghost", `got ${state.lifecycleStatus}`);
    assert(state.friendlyStatus === "Seen in model answers", `got ${state.friendlyStatus}`);
  });

  test("recognition-only → recognition → 'Seen'", () => {
    const state = deriveLexiqueMemory(
      mkMastery({
        seenCount: 2,
        recognitionAttempts: 2,
        recognitionSuccess: 2,
        lastSeenAt: NOW - DAY_MS,
      }),
      NOW,
    );
    assert(state.lifecycleStatus === "recognition", `got ${state.lifecycleStatus}`);
    assert(state.friendlyStatus === "Seen", `got ${state.friendlyStatus}`);
  });

  test("first weak production → activeNew → 'Tried'", () => {
    const state = deriveLexiqueMemory(producedItem(1, 0), NOW);
    assert(state.strengthScore < SUPPORTED_THRESHOLD, "P=1 sits below supported");
    assert(state.lifecycleStatus === "activeNew", `got ${state.lifecycleStatus}`);
    assert(state.friendlyStatus === "Tried", `got ${state.friendlyStatus}`);
  });

  test("supported band → 'Getting stronger'", () => {
    const state = deriveLexiqueMemory(producedItem(2, 0), NOW);
    assert(
      state.strengthScore >= SUPPORTED_THRESHOLD && state.strengthScore < STRONG_THRESHOLD,
      `P=2 (${state.strengthScore}) should be the supported band`,
    );
    assert(state.lifecycleStatus === "supported", `got ${state.lifecycleStatus}`);
    assert(state.friendlyStatus === "Getting stronger", `got ${state.friendlyStatus}`);
  });

  test("consolidation guard: same-day P=4 stays supported / 'Getting stronger', never Known", () => {
    const state = deriveLexiqueMemory(producedItem(4, 0), NOW);
    assert(state.strengthScore >= STRONG_THRESHOLD, "P=4 crosses the strength threshold");
    assert(state.lifecycleStatus === "supported", `same-day must park at supported, got ${state.lifecycleStatus}`);
    assert(state.friendlyStatus === "Getting stronger", `got ${state.friendlyStatus}`);
  });

  test("consolidation release: P=4 after the rest window derives strong / 'Known'", () => {
    const state = deriveLexiqueMemory(producedItem(4, CONSOLIDATION_REST_DAYS), NOW);
    assert(state.lifecycleStatus === "strong", `got ${state.lifecycleStatus}`);
    assert(state.friendlyStatus === "Known", `got ${state.friendlyStatus}`);
  });

  test("precision pin: P=3 alone stays supported even after the rest window", () => {
    // strength(P=3) ≈ 0.6988 < 0.70 — see the header note; the spec anchor
    // "3 productions ≈ Known" needs one extra recognition to actually cross.
    const p3 = deriveLexiqueMemory(producedItem(3, CONSOLIDATION_REST_DAYS), NOW);
    assert(p3.lifecycleStatus === "supported", `got ${p3.lifecycleStatus}`);
    const p3r1 = deriveLexiqueMemory(
      producedItem(3, CONSOLIDATION_REST_DAYS, {
        seenCount: 4,
        recognitionAttempts: 1,
        recognitionSuccess: 1,
      }),
      NOW,
    );
    assert(p3r1.lifecycleStatus === "strong", `P=3+R=1 rested must be strong, got ${p3r1.lifecycleStatus}`);
  });

  test("strong-but-stale → refreshDue → 'Try again soon'", () => {
    const state = deriveLexiqueMemory(producedItem(4, 20), NOW);
    assert(state.lifecycleStatus === "refreshDue", `got ${state.lifecycleStatus}`);
    assert(state.friendlyStatus === "Try again soon", `got ${state.friendlyStatus}`);
  });

  test("weakness return: owned weak item derives refreshDue", () => {
    const state = deriveLexiqueMemory(
      producedItem(2, 2, { productionAttempts: 5, wrongCount: 3, isWeak: true }),
      NOW,
    );
    assert(state.lifecycleStatus === "refreshDue", `got ${state.lifecycleStatus}`);
  });
});

describe("lexique memory › illegal jumps and purity", () => {
  test("exposure-only never derives Known at any volume or time", () => {
    for (const seen of [1, 5, 50, 500]) {
      for (const agoDays of [0, 1, 30]) {
        const state = deriveLexiqueMemory(
          mkMastery({ seenCount: seen, lastSeenAt: NOW - agoDays * DAY_MS }),
          NOW,
        );
        assert(state.friendlyStatus !== "Known", `exposure seen=${seen} ago=${agoDays} became Known`);
        assert(state.lifecycleStatus === "ghost", `got ${state.lifecycleStatus}`);
      }
    }
  });

  test("recognition-only never derives Known at any volume", () => {
    for (const r of [1, 10, 100, 500]) {
      const state = deriveLexiqueMemory(
        mkMastery({
          seenCount: r,
          recognitionAttempts: r,
          recognitionSuccess: r,
          lastSeenAt: NOW - 2 * DAY_MS,
        }),
        NOW,
      );
      assert(state.lifecycleStatus === "recognition", `R=${r} left recognition: ${state.lifecycleStatus}`);
      assert(state.friendlyStatus !== "Known", `R=${r} became Known`);
    }
  });

  test("recycled is not an intrinsic lifecycle status", () => {
    assert(
      !(LEXIQUE_LIFECYCLE_STATUSES as readonly string[]).includes("recycled"),
      "recycled must remain a query-time carryover role, not a lifecycle state",
    );
    assert(LEXIQUE_LIFECYCLE_STATUSES.length === 8, "exactly 8 intrinsic states");
  });

  test("deriving mutates nothing and is repeatable (Mon Lexique open has no mutation path)", () => {
    const m = producedItem(3, 2, { wrongCount: 1 });
    const before = JSON.stringify(m);
    const a = deriveLexiqueMemory(m, NOW);
    const b = deriveLexiqueMemory(m, NOW);
    assert(JSON.stringify(m) === before, "input ItemMastery was mutated");
    assert(JSON.stringify(a) === JSON.stringify(b), "same inputs must derive identical state");
  });
});

describe("lexique memory › weakness", () => {
  test("repeated wrongs increase weakness monotonically", () => {
    let prev = -1;
    for (let wrong = 0; wrong <= 10; wrong++) {
      const w = calculateWeaknessScore({ wrongCount: wrong, everWeak: false });
      assert(w >= prev, `weakness dropped at wrong=${wrong}`);
      prev = w;
    }
  });

  test("later success / repair reduce active weakness", () => {
    const base = calculateWeaknessScore({ wrongCount: 4, everWeak: false });
    const repaired = calculateWeaknessScore({
      wrongCount: 4, everWeak: false, repairCount: 2, lateSuccessCount: 2,
    });
    assert(repaired < base, `repair must reduce weakness (${repaired} !< ${base})`);
  });

  test("everWeak preserves the residual floor even after heavy repair", () => {
    const w = calculateWeaknessScore({
      wrongCount: 3, everWeak: true, repairCount: 10, lateSuccessCount: 10,
    });
    assert(w === WEAK_RESIDUAL_FLOOR, `expected floor ${WEAK_RESIDUAL_FLOOR}, got ${w}`);
  });

  test("precision/exposure signals never raise weakness (exposure_gap_allowed cannot count)", () => {
    // Weakness is a function of wrongCount/repair/lateSuccess/everWeak ONLY.
    // Precision-heavy and exposure-heavy items with wrongCount=0 stay at 0 —
    // the reducer never routes near-misses or allowed gaps into wrongCount.
    const state = deriveLexiqueMemory(
      producedItem(1, 0, { precisionCount: 25, seenCount: 100 }),
      NOW,
    );
    assert(state.weaknessScore === 0, `got ${state.weaknessScore}`);
  });
});

describe("lexique memory › flashcard/carryover separation", () => {
  test("refreshDue does not automatically make the flashcard due", () => {
    // Strong-stale item (lesson-side refreshDue) whose Leitner dueAt is in
    // the future: flashcardEligibility stays 'eligible', not 'due'.
    const state = deriveLexiqueMemory(
      producedItem(4, 20, { practiceEligibility: "stretch", dueAt: NOW + 5 * DAY_MS }),
      NOW,
    );
    assert(state.lifecycleStatus === "refreshDue", "precondition: lesson-side refreshDue");
    assert(state.flashcardEligibility === "eligible", `got ${state.flashcardEligibility}`);
  });

  test("flashcard due derives only from the Leitner clock", () => {
    const due = deriveLexiqueMemory(
      producedItem(2, 0, { practiceEligibility: "stretch", dueAt: NOW - 1 }),
      NOW,
    );
    assert(due.flashcardEligibility === "due", `got ${due.flashcardEligibility}`);
    const none = deriveLexiqueMemory(
      producedItem(2, 0, { practiceEligibility: "none", dueAt: NOW - 1 }),
      NOW,
    );
    assert(none.flashcardEligibility === "none", `got ${none.flashcardEligibility}`);
  });

  test("carryoverEligibility is projection-only and defaults to excluded", () => {
    for (const m of [mkMastery(), producedItem(4, 2), producedItem(4, 20)]) {
      const state = deriveLexiqueMemory(m, NOW);
      assert(
        state.carryoverEligibility === "excluded",
        "v0.1 derive has no lesson context; the Carryover Selector owns real eligibility",
      );
    }
  });
});

describe("lexique memory › friendly projection", () => {
  test("full band mapping (incl. dormant → Known)", () => {
    const expected: Array<[string, string | null]> = [
      ["unknown", null],
      ["ghost", "Seen in model answers"],
      ["recognition", "Seen"],
      ["activeNew", "Tried"],
      ["supported", "Getting stronger"],
      ["strong", "Known"],
      ["dormant", "Known"],
      ["refreshDue", "Try again soon"],
    ];
    for (const [status, band] of expected) {
      const got = projectMonLexiqueFriendlyStatus(status as never);
      assert(got === band, `${status} → ${got}, expected ${band}`);
    }
  });

  test("learner-facing bands never leak internal wording", () => {
    const banned = /weak|fail|decay|score|leitner|dormant|wrong/i;
    for (const status of LEXIQUE_LIFECYCLE_STATUSES) {
      const band = projectMonLexiqueFriendlyStatus(status);
      if (band === null) continue;
      assert(!banned.test(band), `band ${band} leaks internal wording`);
    }
  });
});
