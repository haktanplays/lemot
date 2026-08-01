/**
 * PR-04 — scoped production evidence in the mastery projection.
 *
 * Until now the snapshot answered "did the learner produce this?" with ONE
 * undifferentiated `productionSuccess`. That counter cannot tell an unaided
 * recall from a success with the tray visible from a self-correction, so every
 * downstream question built on it — Mon Lexique ownership, Practice Stretch, any
 * future Stats claim — inherited the ambiguity.
 *
 * PR-04 splits the evidence into three channels that never merge, keeps the old
 * aggregates as derived totals, and moves routing authority from the screen
 * OPERATION to the event's assistance-scoped `evidenceClass` (which PR-03
 * already resolves and clamps).
 *
 * What this PR deliberately does NOT do: invent a numeric weight, a Supported
 * multiplier, a fractional Leitner step or a separate weakness threshold. None
 * is founder-ratified (FQ-2 rule 7, FQ-7 / I-37). The scheduling tests below
 * pin the CURRENT mechanical behaviour — they are not a claim that Supported and
 * independent evidence are equally strong.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeEvent, makeV1Event, makeV2Event, NO_ASSISTANCE } from "./helpers";
import type { EvidenceClass, LearningEvent } from "../../content/learning-engine/events";
import { ERROR_TAG_CODES, LEARNING_EVENT_SCHEMA_VERSION } from "../../content/learning-engine/events";
import {
  ASSISTANCE_CAPTURES,
  ATTRIBUTION_SOURCES,
  ADMISSIBILITY_STATUSES,
} from "../../content/learning-engine/evidence-context";
import { EVIDENCE_CLASSES } from "../../content/learning-engine/events";
import type {
  ItemMastery,
  MasterySnapshot,
  ProductionChannel,
} from "../../content/learning-engine/mastery";
import {
  LEITNER_INTERVAL_DAYS,
  MASTERY_SNAPSHOT_VERSION,
  UnsupportedMasterySnapshotVersionError,
  WEAK_THRESHOLD,
  aggregateProduction,
  createEmptyMasterySnapshot,
  deriveProductionClaim,
  emptyProductionEvidence,
  masteryChannelForEvidenceClass,
  scoreEvent,
  scoreEvents,
} from "../../content/learning-engine/mastery";
import { selectMonLexiqueEntries } from "../../content/learning-engine/mon-lexique";
import {
  COMPACTION_SNAPSHOT_VERSION,
  createSnapshot,
  restoreFromSnapshot,
} from "../../content/learning-engine/compaction";
import { migrateEventToCurrent } from "../../content/learning-engine/event-migration";
import type { ItemId, RawItem } from "../../content/learning-engine/types";

const ITEM = "item-a";

/**
 * One admitted assessed event carrying an explicit evidence class.
 *
 * `operation` is fixed at `fill` for every production class ON PURPOSE: it
 * proves the channel is chosen by the evidence class, not by the screen.
 */
function ev(
  evidenceClass: EvidenceClass,
  result: Parameters<typeof makeEvent>[0]["result"],
  over: Partial<Parameters<typeof makeEvent>[0]> = {},
): LearningEvent {
  const recognition = evidenceClass === "recognition";
  return makeEvent({
    result,
    itemIds: [ITEM],
    operation: recognition ? "recognition" : "fill",
    primitive: recognition ? "selection" : "production",
    evidenceClass,
    evidenceCeiling: evidenceClass,
    ...over,
  });
}

const score = (...events: LearningEvent[]): MasterySnapshot => scoreEvents(events);
const only = (s: MasterySnapshot): ItemMastery => s.items[ITEM];
const ch = (s: MasterySnapshot, c: ProductionChannel) => only(s).production[c];

function expectThrows(fn: () => unknown, what: string): Error {
  let caught: unknown = null;
  try {
    fn();
  } catch (e) {
    caught = e;
  }
  assert(caught instanceof Error, `expected ${what} to throw`);
  return caught as Error;
}

/** Assert the aggregate totals equal the sum of the three channels. */
function assertAggregateInvariant(m: ItemMastery, label: string): void {
  const agg = aggregateProduction(m.production);
  assertEqual(m.productionAttempts, agg.attempts, `${label}: attempts = channel sum`);
  assertEqual(m.productionSuccess, agg.success, `${label}: success = channel sum`);
  assertEqual(m.productionFailure, agg.failure, `${label}: failure = channel sum`);
  for (const c of ["independent", "supported", "selfCorrection"] as const) {
    const k = m.production[c];
    assert(
      k.attempts >= 0 && k.success >= 0 && k.failure >= 0,
      `${label}: ${c} counters never go negative`,
    );
    assert(
      k.attempts >= k.success + k.failure,
      `${label}: ${c} attempts cover success + failure (precision/skip make it strict)`,
    );
  }
}

// ── empty + current snapshot ────────────────────────────────────────────────

describe("mastery v0.3 — snapshot shape and version", () => {
  test("an empty snapshot is mastery-v0.3", () => {
    assertEqual(createEmptyMasterySnapshot().version, "mastery-v0.3", "version");
    assertEqual(MASTERY_SNAPSHOT_VERSION, "mastery-v0.3", "exported constant");
  });

  test("a new item begins with all three channels at zero and claims nothing", () => {
    // A recognition skip creates the row without touching any production channel.
    const m = only(score(ev("recognition", "empty_or_skip")));
    for (const c of ["independent", "supported", "selfCorrection"] as const) {
      assertEqual(m.production[c].attempts, 0, `${c}.attempts starts at 0`);
      assertEqual(m.production[c].success, 0, `${c}.success starts at 0`);
      assertEqual(m.production[c].failure, 0, `${c}.failure starts at 0`);
    }
    assertEqual(m.productionAttempts, 0, "aggregate attempts start at 0");
    assertEqual(m.productionSuccess, 0, "aggregate success starts at 0");
    assertEqual(m.productionFailure, 0, "aggregate failure starts at 0");
    assertEqual(deriveProductionClaim(m.production), "none", "claim starts at none");
  });

  test("consumers never need optional chaining — the block is always present", () => {
    const p = emptyProductionEvidence();
    assert(p.independent !== undefined, "independent present");
    assert(p.supported !== undefined, "supported present");
    assert(p.selfCorrection !== undefined, "selfCorrection present");
  });

  test("an old mastery-v0.2 snapshot is rejected, never silently extended", () => {
    const stale: MasterySnapshot = { ...createEmptyMasterySnapshot(), version: "mastery-v0.2" };
    const err = expectThrows(
      () => scoreEvent(stale, ev("controlled_production", "correct")),
      "scoreEvent on a v0.2 snapshot",
    );
    assert(
      err instanceof UnsupportedMasterySnapshotVersionError,
      "must be the explicit version error",
    );
    expectThrows(
      () => scoreEvents([ev("controlled_production", "correct")], stale),
      "scoreEvents on a v0.2 snapshot",
    );
  });

  test("an unknown FUTURE snapshot version is rejected too", () => {
    const future: MasterySnapshot = { ...createEmptyMasterySnapshot(), version: "mastery-v9.9" };
    expectThrows(() => scoreEvent(future, ev("recall", "correct")), "future version");
    // Rejected even with zero events, where the reduce would never run.
    expectThrows(() => scoreEvents([], future), "future version, empty event list");
  });

  test("no scoped counter is fabricated from a v0.2 snapshot's aggregate", () => {
    const stale: MasterySnapshot = {
      version: "mastery-v0.2",
      items: {},
      processedClientEventIds: [],
      updatedAt: null,
    };
    // The only outcome is refusal: there is no code path that reads
    // `productionSuccess` from a stale snapshot and invents channels for it.
    expectThrows(() => scoreEvents([], stale), "any use of a v0.2 snapshot");
  });
});

// ── evidence-class routing ──────────────────────────────────────────────────

describe("evidence class owns routing, not the operation", () => {
  test("the routing table is exactly the decided one", () => {
    const expected: Record<EvidenceClass, string> = {
      recall: "independent",
      controlled_production: "independent",
      supported_production: "supported",
      self_correction: "selfCorrection",
      recognition: "recognition",
      exposure: "none",
      audio_exposure: "none",
      comparison_only: "none",
      open_production_attempt: "none",
      self_report: "none",
      no_mastery_evidence: "none",
    };
    for (const c of EVIDENCE_CLASSES) {
      assertEqual(masteryChannelForEvidenceClass(c), expected[c], `${c} routes correctly`);
    }
    assertEqual(
      EVIDENCE_CLASSES.length,
      Object.keys(expected).length,
      "every evidence class is routed — no silent default bucket",
    );
  });

  test("a build operation carrying recognition evidence is recognition evidence", () => {
    // `build` was a member of the retired PRODUCTION_OPS set, so the old reducer
    // would have counted this as production purely because of the screen.
    const s = score(
      ev("recognition", "correct", { operation: "build", primitive: "selection" }),
    );
    const m = only(s);
    assertEqual(m.recognitionSuccess, 1, "counted as recognition");
    assertEqual(m.productionAttempts, 0, "the operation name does not make it production");
    assertEqual(m.production.independent.attempts, 0, "no independent channel movement");
  });

  test("a fill operation carrying supported evidence is Supported evidence", () => {
    const m = only(score(ev("supported_production", "correct")));
    assertEqual(m.production.supported.success, 1, "supported channel");
    assertEqual(m.production.independent.success, 0, "never independent");
  });

  test("no_mastery_evidence is a complete no-op even when marked admitted", () => {
    // Defense in depth over the PR-03 admission gate: a malformed or unexpectedly
    // mastery-bearing admission must still move nothing.
    const s = score(
      ev("no_mastery_evidence", "correct", {
        admissibility: { status: "admitted" },
        attribution: { status: "resolved", source: "learner" },
      }),
    );
    assertEqual(Object.keys(s.items).length, 0, "no item row is created at all");
    assert(s.processedClientEventIds.length === 1, "but the event is recorded as processed");
  });

  test("exposure, comparison, self-report and open attempts enter no channel", () => {
    for (const c of [
      "exposure",
      "audio_exposure",
      "comparison_only",
      "self_report",
      "open_production_attempt",
    ] as const) {
      const primitive =
        c === "self_report"
          ? ("self_report" as const)
          : c === "comparison_only"
            ? ("reveal" as const)
            : c === "open_production_attempt"
              ? ("production" as const)
              : ("exposure" as const);
      const s = score(ev(c, "correct", { primitive, evidenceCeiling: c }));
      assertEqual(Object.keys(s.items).length, 0, `${c} moves nothing`);
    }
  });
});

// ── independent channel ─────────────────────────────────────────────────────

describe("independent production channel", () => {
  test("a recall success increments independent attempts and success", () => {
    const m = only(score(ev("recall", "correct")));
    assertEqual(m.production.independent.attempts, 1, "attempts");
    assertEqual(m.production.independent.success, 1, "success");
    assertAggregateInvariant(m, "recall success");
  });

  test("a controlled-production success increments independent attempts and success", () => {
    const m = only(score(ev("controlled_production", "correct")));
    assertEqual(m.production.independent.success, 1, "success");
    assertEqual(m.production.supported.success, 0, "supported untouched");
  });

  test("an accepted variant is still an independent success", () => {
    const m = only(score(ev("recall", "accepted_variant")));
    assertEqual(m.production.independent.success, 1, "accepted_variant counts as success");
  });

  test("an independent failure increments independent failure", () => {
    const m = only(score(ev("controlled_production", "wrong_item")));
    assertEqual(m.production.independent.attempts, 1, "attempts");
    assertEqual(m.production.independent.failure, 1, "failure");
    assertEqual(m.production.independent.success, 0, "no success");
    assertEqual(m.wrongCount, 1, "aggregate wrongCount still moves");
  });

  test("independent precision counts an attempt but neither success nor failure", () => {
    for (const r of ["punctuation_only", "accent_only"] as const) {
      const m = only(score(ev("controlled_production", r)));
      assertEqual(m.production.independent.attempts, 1, `${r}: attempt counted`);
      assertEqual(m.production.independent.success, 0, `${r}: not a success`);
      assertEqual(m.production.independent.failure, 0, `${r}: not a failure`);
      assertEqual(m.precisionCount, 1, `${r}: aggregate precisionCount owns it`);
      assertEqual(m.isWeak, false, `${r}: never weakness`);
      assertEqual(
        deriveProductionClaim(m.production),
        "none",
        `${r}: precision advances no production claim`,
      );
    }
  });

  test("a spelling near-miss gives no credit and accrues weakness", () => {
    const m = only(score(ev("controlled_production", "spelling_near_miss")));
    assertEqual(m.production.independent.attempts, 1, "attempt counted");
    assertEqual(m.production.independent.success, 0, "no success");
    assertEqual(m.production.independent.failure, 0, "no hard failure (unchanged B7 rule)");
    assertEqual(m.weakTags.spelling_near_miss, 1, "weakness accrues");
    assertEqual(m.precisionCount, 0, "not a precision signal");
  });

  test("an independent skip counts an attempt and the aggregate skip only", () => {
    const m = only(score(ev("controlled_production", "empty_or_skip")));
    assertEqual(m.production.independent.attempts, 1, "attempt counted");
    assertEqual(m.production.independent.success, 0, "no success");
    assertEqual(m.production.independent.failure, 0, "no failure");
    assertEqual(m.skipCount, 1, "skipCount");
  });

  test("an independent success produces the independent claim", () => {
    const m = only(score(ev("recall", "correct")));
    assertEqual(deriveProductionClaim(m.production), "independent", "claim");
  });
});

// ── supported channel ───────────────────────────────────────────────────────

describe("supported production channel", () => {
  test("a Supported success increments supported attempts and success only", () => {
    const m = only(score(ev("supported_production", "correct")));
    assertEqual(m.production.supported.attempts, 1, "attempts");
    assertEqual(m.production.supported.success, 1, "success");
    assertEqual(m.production.independent.attempts, 0, "independent untouched");
    assertEqual(m.production.independent.success, 0, "independent untouched");
    assertEqual(m.production.selfCorrection.attempts, 0, "self-correction untouched");
    assertAggregateInvariant(m, "supported success");
  });

  test("a Supported failure increments supported failure", () => {
    const m = only(score(ev("supported_production", "wrong_item")));
    assertEqual(m.production.supported.failure, 1, "failure");
    assertEqual(m.production.independent.failure, 0, "independent untouched");
  });

  test("Supported precision counts an attempt but neither success nor failure", () => {
    const m = only(score(ev("supported_production", "accent_only")));
    assertEqual(m.production.supported.attempts, 1, "attempt");
    assertEqual(m.production.supported.success, 0, "no success");
    assertEqual(m.production.supported.failure, 0, "no failure");
    assertEqual(m.precisionCount, 1, "precision");
  });

  test("a Supported skip counts an attempt and the aggregate skip only", () => {
    const m = only(score(ev("supported_production", "empty_or_skip")));
    assertEqual(m.production.supported.attempts, 1, "attempt");
    assertEqual(m.skipCount, 1, "skipCount");
    assertEqual(m.production.supported.success, 0, "no success");
  });

  test("a Supported success produces the supported claim, never independent", () => {
    const m = only(score(ev("supported_production", "correct")));
    assertEqual(deriveProductionClaim(m.production), "supported", "claim");
  });

  test("migrated v1 production history enters the Supported channel", () => {
    // PR-03 caps unknown historical assistance to supported_production, so the
    // reducer must not promote it back to independent because the old operation
    // looked productive.
    const res = migrateEventToCurrent(makeV1Event({ result: "correct", itemIds: [ITEM] }));
    assert(res.status === "ok", "migrates");
    if (res.status !== "ok") return;
    const m = only(score(res.event));
    assertEqual(m.production.supported.success, 1, "Supported");
    assertEqual(m.production.independent.success, 0, "never independent");
    assertEqual(deriveProductionClaim(m.production), "supported", "claim");
  });

  test("migrated v2 production history enters the Supported channel", () => {
    const res = migrateEventToCurrent(makeV2Event({ itemIds: [ITEM] }));
    assert(res.status === "ok", "migrates");
    if (res.status !== "ok") return;
    const m = only(score(res.event));
    assertEqual(m.production.supported.success, 1, "Supported");
    assertEqual(m.production.independent.attempts, 0, "independent stays empty");
  });

  test("migrated recognition history enters the recognition counters", () => {
    const res = migrateEventToCurrent(
      makeV1Event({ result: "correct", operation: "recognition", itemIds: [ITEM] }),
    );
    assert(res.status === "ok", "migrates");
    if (res.status !== "ok") return;
    const m = only(score(res.event));
    assertEqual(m.recognitionSuccess, 1, "recognition");
    assertEqual(m.productionAttempts, 0, "no production channel touched");
  });

  test("a migrated reveal is a no-op", () => {
    const res = migrateEventToCurrent(
      makeV1Event({
        result: "correct",
        operation: "recognition",
        userAnswer: null,
        normalizedAnswer: null,
        itemIds: [ITEM],
      }),
    );
    assert(res.status === "ok", "migrates");
    if (res.status !== "ok") return;
    const s = score(res.event);
    assertEqual(Object.keys(s.items).length, 0, "a reveal moves nothing");
  });
});

// ── self-correction channel ─────────────────────────────────────────────────

describe("self-correction channel", () => {
  test("a self-correction success increments only its own channel", () => {
    const m = only(score(ev("self_correction", "correct")));
    assertEqual(m.production.selfCorrection.attempts, 1, "attempts");
    assertEqual(m.production.selfCorrection.success, 1, "success");
    assertEqual(m.production.independent.attempts, 0, "never independent");
    assertEqual(m.production.supported.attempts, 0, "never supported");
    assertAggregateInvariant(m, "self-correction success");
  });

  test("a self-correction failure increments its own failure", () => {
    const m = only(score(ev("self_correction", "wrong_item")));
    assertEqual(m.production.selfCorrection.failure, 1, "failure");
    assertEqual(m.production.independent.failure, 0, "independent untouched");
    assertEqual(m.production.supported.failure, 0, "supported untouched");
  });

  test("a self-correction success alone claims nothing", () => {
    const m = only(score(ev("self_correction", "correct")));
    assertEqual(
      deriveProductionClaim(m.production),
      "none",
      "repair is real evidence but establishes neither independence nor ownership",
    );
  });

  test("a self-correction success alone does not add to Mon Lexique", () => {
    const m = only(score(ev("self_correction", "correct")));
    assertEqual(m.monLexiqueStatus, "hidden", "no ownership from repair alone");
  });

  test("a self-correction success alone gives Practice build, not stretch", () => {
    const m = only(score(ev("self_correction", "correct")));
    assertEqual(m.practiceEligibility, "build", "build");
  });

  test("the aggregate contains self-correction, which is why it cannot own claims", () => {
    const m = only(score(ev("self_correction", "correct")));
    assertEqual(m.productionSuccess, 1, "the aggregate DOES include it");
    assertEqual(
      deriveProductionClaim(m.production),
      "none",
      "so a Stretch/Mon-Lexique rule reading the aggregate would be wrong",
    );
  });
});

// ── mixed history ───────────────────────────────────────────────────────────

describe("mixed history is preserved channel by channel", () => {
  const events = (): LearningEvent[] => [
    ev("supported_production", "correct", { clientEventId: "m1", timestamp: 1_000 }),
    ev("supported_production", "wrong_item", { clientEventId: "m2", timestamp: 2_000 }),
    ev("recall", "correct", { clientEventId: "m3", timestamp: 3_000 }),
    ev("self_correction", "correct", { clientEventId: "m4", timestamp: 4_000 }),
  ];

  test("each channel retains its own history", () => {
    const s = score(...events());
    assertEqual(ch(s, "supported").attempts, 2, "two supported attempts");
    assertEqual(ch(s, "supported").success, 1, "one supported success");
    assertEqual(ch(s, "supported").failure, 1, "one supported failure");
    assertEqual(ch(s, "independent").success, 1, "one independent success");
    assertEqual(ch(s, "selfCorrection").success, 1, "one self-correction success");
  });

  test("the claim becomes independent without erasing the Supported history", () => {
    const s = score(...events());
    assertEqual(deriveProductionClaim(only(s).production), "independent", "strongest shown");
    assertEqual(ch(s, "supported").success, 1, "Supported history is still there");
  });

  test("aggregates equal the channel sums", () => {
    const m = only(score(...events()));
    assertEqual(m.productionAttempts, 4, "2 supported + 1 independent + 1 self-correction");
    assertEqual(m.productionSuccess, 3, "1 + 1 + 1");
    assertEqual(m.productionFailure, 1, "the one supported failure");
    assertAggregateInvariant(m, "mixed history");
  });

  test("replay reproduces the same snapshot", () => {
    assertEqual(
      JSON.stringify(score(...events())),
      JSON.stringify(score(...events())),
      "deterministic",
    );
  });

  test("re-applying the same events is idempotent — no double counting", () => {
    const list = events();
    const once = scoreEvents(list);
    const twice = scoreEvents(list, once);
    assertEqual(JSON.stringify(twice), JSON.stringify(once), "stable replay");
  });

  test("the reducer mutates neither its input snapshot nor its events", () => {
    const list = events();
    const before = JSON.stringify(list);
    const start = createEmptyMasterySnapshot();
    const startBefore = JSON.stringify(start);
    scoreEvents(list, start);
    assertEqual(JSON.stringify(list), before, "events untouched");
    assertEqual(JSON.stringify(start), startBefore, "input snapshot untouched");
  });
});

// ── recognition routing ─────────────────────────────────────────────────────

describe("recognition routing", () => {
  test("recognition evidence increments only recognition counters", () => {
    const m = only(score(ev("recognition", "correct")));
    assertEqual(m.recognitionAttempts, 1, "recognition attempts");
    assertEqual(m.recognitionSuccess, 1, "recognition success");
    assertEqual(m.productionAttempts, 0, "no production channel");
    assertAggregateInvariant(m, "recognition success");
  });

  test("a recognition failure never reaches a production channel", () => {
    const m = only(score(ev("recognition", "wrong_item")));
    assertEqual(m.recognitionFailure, 1, "recognition failure");
    assertEqual(m.productionFailure, 0, "production untouched");
  });

  test("recognition alone never adds to Mon Lexique (I-10)", () => {
    const m = only(score(ev("recognition", "correct")));
    assertEqual(m.monLexiqueStatus, "hidden", "hidden");
  });

  test("recognition alone gives Practice build", () => {
    const m = only(score(ev("recognition", "correct")));
    assertEqual(m.practiceEligibility, "build", "build");
  });

  test("recognition does not set lastProducedAt", () => {
    const m = only(score(ev("recognition", "correct", { timestamp: 7_000 })));
    assertEqual(m.lastProducedAt, null, "nothing was produced");
  });
});

// ── aggregate invariants across every result class ──────────────────────────

describe("aggregate invariants hold for every result class", () => {
  const RESULTS = [
    "correct",
    "accepted_variant",
    "punctuation_only",
    "accent_only",
    "spelling_near_miss",
    "empty_or_skip",
    "wrong_item",
    "missing_word",
  ] as const;

  test("every channel × result combination keeps aggregate = channel sum", () => {
    for (const c of ["recall", "supported_production", "self_correction"] as const) {
      for (const r of RESULTS) {
        const m = only(score(ev(c, r)));
        assertAggregateInvariant(m, `${c}/${r}`);
      }
    }
  });

  test("a long mixed run stays invariant and never double counts", () => {
    const list: LearningEvent[] = [];
    const classes = ["recall", "supported_production", "self_correction", "recognition"] as const;
    for (let i = 0; i < 24; i += 1) {
      list.push(ev(classes[i % 4], RESULTS[i % RESULTS.length], { clientEventId: `run-${i}` }));
    }
    const s = scoreEvents(list);
    assertAggregateInvariant(only(s), "long run");
    const replayed = scoreEvents(list, s);
    assertEqual(JSON.stringify(replayed), JSON.stringify(s), "idempotent");
  });
});

// ── Mon Lexique ─────────────────────────────────────────────────────────────

describe("Mon Lexique eligibility and scoped projection", () => {
  const registry = (): Record<ItemId, RawItem> => ({
    [ITEM]: { text: { fr: "bonjour", en: "hello" } } as unknown as RawItem,
  });
  const entryFor = (s: MasterySnapshot) =>
    selectMonLexiqueEntries({ items: registry(), snapshot: s })[0];

  test("an independent success adds the item", () => {
    assertEqual(only(score(ev("recall", "correct"))).monLexiqueStatus, "added", "added");
  });

  test("a Supported success adds the item — the decided Supported path", () => {
    assertEqual(
      only(score(ev("supported_production", "correct"))).monLexiqueStatus,
      "added",
      "added",
    );
  });

  test("a recognition success does not add", () => {
    assertEqual(only(score(ev("recognition", "correct"))).monLexiqueStatus, "hidden", "hidden");
  });

  test("self-correction alone does not add", () => {
    assertEqual(only(score(ev("self_correction", "correct"))).monLexiqueStatus, "hidden", "hidden");
  });

  test("weak still overrides added", () => {
    const list = [ev("recall", "correct", { clientEventId: "w0" })];
    for (let i = 0; i < WEAK_THRESHOLD; i += 1) {
      list.push(ev("recall", "wrong_item", { clientEventId: `w-${i}` }));
    }
    assertEqual(only(scoreEvents(list)).monLexiqueStatus, "weak", "weak > added");
  });

  test("a supported-only entry reports productionClaim supported", () => {
    assertEqual(entryFor(score(ev("supported_production", "correct"))).productionClaim, "supported", "supported");
  });

  test("an independent entry reports productionClaim independent", () => {
    assertEqual(entryFor(score(ev("recall", "correct"))).productionClaim, "independent", "independent");
  });

  test("a mixed entry reports independent while Supported history survives", () => {
    const s = score(
      ev("supported_production", "correct", { clientEventId: "x1" }),
      ev("recall", "correct", { clientEventId: "x2" }),
    );
    assertEqual(entryFor(s).productionClaim, "independent", "current claim");
    assertEqual(ch(s, "supported").success, 1, "Supported history preserved underneath");
  });

  test("a weak entry with no qualifying production success claims none", () => {
    const list: LearningEvent[] = [];
    for (let i = 0; i < WEAK_THRESHOLD; i += 1) {
      list.push(ev("recognition", "wrong_item", { clientEventId: `wk-${i}` }));
    }
    const s = scoreEvents(list);
    assertEqual(only(s).monLexiqueStatus, "weak", "included because weak");
    assertEqual(entryFor(s).productionClaim, "none", "but it claims no production");
  });

  test("the projection is derived from channels, not from the aggregate", () => {
    // The aggregate says 1 success; the channels say that success was a repair.
    const s = score(ev("self_correction", "correct"));
    assertEqual(only(s).productionSuccess, 1, "aggregate is non-zero");
    assertEqual(only(s).monLexiqueStatus, "hidden", "yet the item is not owned");
  });
});

// ── Practice eligibility ────────────────────────────────────────────────────

describe("Practice eligibility from scoped evidence", () => {
  test("an independent success gives stretch", () => {
    assertEqual(only(score(ev("recall", "correct"))).practiceEligibility, "stretch", "stretch");
  });

  test("a Supported success gives stretch", () => {
    assertEqual(
      only(score(ev("supported_production", "correct"))).practiceEligibility,
      "stretch",
      "stretch",
    );
  });

  test("self-correction only gives build", () => {
    assertEqual(
      only(score(ev("self_correction", "correct"))).practiceEligibility,
      "build",
      "build — the aggregate would have said stretch",
    );
  });

  test("recognition or plain contact gives build", () => {
    assertEqual(only(score(ev("recognition", "correct"))).practiceEligibility, "build", "build");
    assertEqual(
      only(score(ev("controlled_production", "accent_only"))).practiceEligibility,
      "build",
      "precision-only is contact, not production",
    );
  });

  test("repeated learner-attributed failure reaches challenge at the current threshold", () => {
    const list: LearningEvent[] = [];
    for (let i = 0; i < WEAK_THRESHOLD; i += 1) {
      list.push(ev("controlled_production", "wrong_item", { clientEventId: `f-${i}` }));
    }
    assertEqual(only(scoreEvents(list)).practiceEligibility, "challenge", "challenge");
  });

  test("a quarantined failure creates no item at all", () => {
    const s = score(
      ev("no_mastery_evidence", "wrong_item", {
        attribution: { status: "resolved", source: "ui_flow" },
        admissibility: { status: "quarantined", reasons: ["required_support_missing"] },
      }),
    );
    assertEqual(Object.keys(s.items).length, 0, "no row → no eligibility");
  });

  test("a never-seen item has no eligibility because it has no row", () => {
    assertEqual(createEmptyMasterySnapshot().items[ITEM], undefined, "none");
  });
});

// ── admission and attribution (unchanged by PR-04) ──────────────────────────

describe("admission and attribution survive the routing change", () => {
  test("an admitted learner event scores", () => {
    assertEqual(only(score(ev("recall", "correct"))).production.independent.success, 1, "scores");
  });

  test("a legacy-admitted event scores", () => {
    const m = only(
      score(
        ev("supported_production", "correct", {
          admissibility: { status: "legacy_admitted", sourceVersion: 1 },
        }),
      ),
    );
    assertEqual(m.production.supported.success, 1, "history keeps counting");
  });

  test("quarantined, unresolved and no-evidence events are strict no-ops", () => {
    const cases = [
      { status: "quarantined" as const, reasons: ["non_learner_incident" as const] },
      { status: "unresolved" as const, reasons: ["learner_authorship_unresolved" as const] },
      { status: "no_evidence" as const, reasons: ["authored_no_evidence_contract" as const] },
    ];
    for (const admissibility of cases) {
      const s = score(
        ev("no_mastery_evidence", "correct", {
          attribution: { status: "unresolved" },
          admissibility,
        }),
      );
      assertEqual(Object.keys(s.items).length, 0, `${admissibility.status} moves nothing`);
      assertEqual(s.processedClientEventIds.length, 1, "still marked processed");
    }
  });

  test("non-learner incidents create no weakness in any channel", () => {
    for (const source of ["system", "content", "validator", "ui_flow"] as const) {
      const s = score(
        ev("no_mastery_evidence", "wrong_item", {
          attribution: { status: "resolved", source },
          admissibility: { status: "quarantined", reasons: ["non_learner_incident"] },
        }),
      );
      assertEqual(Object.keys(s.items).length, 0, `${source} never becomes learner weakness`);
    }
  });

  test("a learner-attributed admitted failure keeps the existing weakness behaviour", () => {
    const list: LearningEvent[] = [];
    for (let i = 0; i < WEAK_THRESHOLD; i += 1) {
      list.push(ev("controlled_production", "wrong_item", { clientEventId: `lw-${i}` }));
    }
    const m = only(scoreEvents(list));
    assertEqual(m.isWeak, true, "weak at the unchanged threshold");
    assertEqual(m.wrongCount, WEAK_THRESHOLD, "wrongCount unchanged");
  });

  test("a non-assessed event remains a no-op", () => {
    const reveal = {
      ...makeEvent({ result: "correct", itemIds: [ITEM] }),
      assessed: false,
      result: undefined,
      errorTags: undefined,
      normalizedAnswer: undefined,
      outcome: "completed_unassessed",
      primitive: "reveal",
      evidenceClass: "comparison_only",
      evidenceCeiling: "comparison_only",
      attribution: { status: "not_applicable" },
      admissibility: { status: "no_evidence", reasons: ["non_assessed_interaction"] },
    } as unknown as LearningEvent;
    const s = score(reveal);
    assertEqual(Object.keys(s.items).length, 0, "nothing moved");
  });
});

// ── scheduling: deliberately unchanged ──────────────────────────────────────

describe("scheduling behaviour is deliberately unchanged", () => {
  // These pin the CURRENT Axis-B mechanics. They are NOT a ratification that
  // Supported and independent evidence are equally strong — no founder rule
  // states a differential, so none was invented.
  test("an independent success advances the box and prompt fade as before", () => {
    const m = only(score(ev("recall", "correct", { timestamp: 5_000 })));
    assertEqual(m.leitnerBox, 1, "box + 1");
    assertEqual(m.promptFadeLevel, "PF1", "prompt fade + 1");
    assertEqual(m.dueAt, 5_000 + LEITNER_INTERVAL_DAYS[1] * 24 * 60 * 60 * 1000, "dueAt");
  });

  test("a Supported success follows the same retained mechanics", () => {
    const independent = only(score(ev("recall", "correct", { timestamp: 5_000 })));
    const supported = only(score(ev("supported_production", "correct", { timestamp: 5_000 })));
    assertEqual(supported.leitnerBox, independent.leitnerBox, "same box today");
    assertEqual(supported.promptFadeLevel, independent.promptFadeLevel, "same prompt fade today");
    assertEqual(supported.dueAt, independent.dueAt, "same dueAt today");
    // …and yet the evidence is NOT recorded as the same thing:
    assertEqual(supported.production.independent.success, 0, "no independent claim");
    assertEqual(independent.production.supported.success, 0, "and vice versa");
  });

  test("a self-correction success follows the same documented mechanics", () => {
    const m = only(score(ev("self_correction", "correct", { timestamp: 5_000 })));
    assertEqual(m.leitnerBox, 1, "box + 1, as today");
    assertEqual(m.promptFadeLevel, "PF1", "prompt fade + 1, as today");
  });

  test("no fractional box is ever produced", () => {
    const list: LearningEvent[] = [];
    for (let i = 0; i < 8; i += 1) {
      list.push(ev("supported_production", "correct", { clientEventId: `b-${i}` }));
    }
    const m = only(scoreEvents(list));
    assert(Number.isInteger(m.leitnerBox), "integer box");
    assertEqual(m.leitnerBox, LEITNER_INTERVAL_DAYS.length - 1, "capped at the top box");
  });

  test("the tunable constants are untouched", () => {
    assertEqual(WEAK_THRESHOLD, 3, "WEAK_THRESHOLD unchanged");
    assertEqual([...LEITNER_INTERVAL_DAYS].join(","), "0,1,3,7,30", "intervals unchanged");
  });

  test("the prompt-fade range is unchanged", () => {
    const list: LearningEvent[] = [];
    for (let i = 0; i < 9; i += 1) {
      list.push(ev("recall", "correct", { clientEventId: `pf-${i}` }));
    }
    assertEqual(only(scoreEvents(list)).promptFadeLevel, "PF3", "still caps at PF3");
  });
});

// ── snapshot rebuild ────────────────────────────────────────────────────────

describe("snapshot rebuild from the event log", () => {
  const log = (): LearningEvent[] => [
    ev("supported_production", "correct", { clientEventId: "r1", timestamp: 1_000 }),
    ev("recognition", "correct", { clientEventId: "r2", timestamp: 2_000 }),
    ev("recall", "correct", { clientEventId: "r3", timestamp: 3_000 }),
  ];

  test("a full replay deterministically produces mastery-v0.3", () => {
    const s = scoreEvents(log());
    assertEqual(s.version, "mastery-v0.3", "version");
    assertEqual(JSON.stringify(s), JSON.stringify(scoreEvents(log())), "deterministic");
  });

  test("counters are order-independent even though scheduling is not", () => {
    const forward = scoreEvents(log());
    const reversed = scoreEvents([...log()].reverse());
    for (const c of ["independent", "supported", "selfCorrection"] as const) {
      assertEqual(
        JSON.stringify(reversed.items[ITEM].production[c]),
        JSON.stringify(forward.items[ITEM].production[c]),
        `${c} counters are order-independent`,
      );
    }
  });

  test("duplicates stay idempotent", () => {
    const list = log();
    assertEqual(
      JSON.stringify(scoreEvents([...list, ...list])),
      JSON.stringify(scoreEvents(list)),
      "no double counting",
    );
  });

  test("no runtime consumer reads the cached mastery snapshot — v0.3 is rebuilt", async () => {
    // `LM_LE_SNAPSHOT_KEY` / `readSnapshot()` exist on the repository, but nothing
    // in the app calls `readSnapshot`: the session controller re-derives from
    // `readAllEvents()` on every change, and privacy only CLEARS the key. So the
    // v0.2 → v0.3 bump needs no read-side migration and no second snapshot key,
    // and PR-04 deliberately adds no speculative persistence for one. This test
    // pins that finding so the assumption is checked rather than remembered.
    const { readFileSync, readdirSync } = await import("node:fs");
    const { join, relative } = await import("node:path");
    const root = process.cwd();

    const walk = (dir: string, out: string[] = []): string[] => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name === "node_modules" || entry.name === "tests") continue;
          walk(full, out);
        } else if (/\.tsx?$/.test(entry.name)) {
          out.push(full);
        }
      }
      return out;
    };

    const callers = ["app", "components", "content", "hooks", "lib", "providers"]
      .flatMap((d) => {
        try {
          return walk(join(root, d));
        } catch {
          return [];
        }
      })
      .filter((f) => /\breadSnapshot\s*\(/.test(readFileSync(f, "utf8")))
      .map((f) => relative(root, f))
      .sort();

    assertEqual(
      callers.join(", "),
      "content/learning-engine/repository/local.ts",
      "only the repository's own definition — no consumer to migrate",
    );
  });
});

// ── compaction ──────────────────────────────────────────────────────────────

describe("compaction stays version-safe", () => {
  const log = (): LearningEvent[] => [
    ev("supported_production", "correct", { clientEventId: "c1", timestamp: 1_000 }),
    ev("recall", "correct", { clientEventId: "c2", timestamp: 2_000 }),
    ev("recognition", "wrong_item", { clientEventId: "c3", timestamp: 3_000 }),
    ev("self_correction", "correct", { clientEventId: "c4", timestamp: 4_000 }),
  ];

  test("the compaction snapshot version is v0.2 and nests mastery-v0.3", () => {
    const snap = createSnapshot(log(), 9_000);
    assertEqual(snap.version, "compaction-v0.2", "outer version");
    assertEqual(COMPACTION_SNAPSHOT_VERSION, "compaction-v0.2", "exported constant");
    assertEqual(snap.masterySnapshot.version, "mastery-v0.3", "nested version");
  });

  test("prefix snapshot + suffix replay equals a full replay", () => {
    const all = log();
    for (let k = 0; k <= all.length; k += 1) {
      const restored = restoreFromSnapshot(createSnapshot(all.slice(0, k), 9_000), all.slice(k));
      assertEqual(
        JSON.stringify(restored),
        JSON.stringify(scoreEvents(all)),
        `split at ${k} reproduces the full replay`,
      );
    }
  });

  test("an old compaction-v0.1 snapshot is rejected", () => {
    const snap = { ...createSnapshot(log(), 9_000), version: "compaction-v0.1" };
    const err = expectThrows(() => restoreFromSnapshot(snap, []), "compaction-v0.1");
    assert(err.message.includes("compaction-v0.1"), "the error names the stale version");
  });

  test("an unknown future compaction version is rejected", () => {
    const snap = { ...createSnapshot(log(), 9_000), version: "compaction-v9.9" };
    expectThrows(() => restoreFromSnapshot(snap, []), "future compaction version");
  });

  test("a correct wrapper around a stale nested mastery snapshot is rejected", () => {
    const snap = {
      ...createSnapshot(log(), 9_000),
      masterySnapshot: { ...createEmptyMasterySnapshot(), version: "mastery-v0.2" },
    };
    const err = expectThrows(() => restoreFromSnapshot(snap, []), "stale nested mastery");
    assert(err.message.includes("mastery-v0.2"), "the error names the nested version");
  });

  test("every source event is still retained — no deletion was introduced", () => {
    const all = log();
    const snap = createSnapshot(all, 9_000);
    assertEqual(snap.cursor.eventCount, all.length, "all events folded");
    assertEqual(
      JSON.stringify(restoreFromSnapshot(snap, [])),
      JSON.stringify(scoreEvents(all)),
      "and fully replayable",
    );
  });
});

// ── frozen authority ────────────────────────────────────────────────────────

describe("frozen authority is untouched by PR-04", () => {
  test("the event schema version is still 3", () => {
    assertEqual(LEARNING_EVENT_SCHEMA_VERSION, 3, "PR-04 changed no event schema");
  });

  test("assistance, attribution, admissibility and evidence vocabularies are unchanged", () => {
    assertEqual([...ASSISTANCE_CAPTURES].join(","), "known,unknown,legacy_unknown", "assistance");
    assertEqual(ATTRIBUTION_SOURCES.length, 8, "exactly the Canonical eight");
    assertEqual(
      [...ATTRIBUTION_SOURCES].join(","),
      "learner,content,validator,ui_flow,tone,ai_generator,system,mastery_mapping",
      "sources unchanged",
    );
    assertEqual(
      [...ADMISSIBILITY_STATUSES].join(","),
      "admitted,quarantined,unresolved,no_evidence,legacy_admitted",
      "admissibility unchanged",
    );
    assertEqual(EVIDENCE_CLASSES.length, 11, "evidence classes unchanged");
  });

  test("ERROR_TAG_CODES stays at the frozen sixteen", () => {
    assertEqual(ERROR_TAG_CODES.length, 16, "YASA 3");
  });

  test("no numeric weight or multiplier was introduced", () => {
    // The scoped model is categorical: three channels of integer tallies plus a
    // three-valued claim. Nothing multiplies, discounts or scores.
    const m = only(score(ev("supported_production", "correct")));
    for (const c of ["independent", "supported", "selfCorrection"] as const) {
      for (const k of ["attempts", "success", "failure"] as const) {
        assert(
          Number.isInteger(m.production[c][k]),
          `${c}.${k} is an integer tally, not a weighted score`,
        );
      }
    }
    assert(
      ["none", "supported", "independent"].includes(deriveProductionClaim(m.production)),
      "the claim is categorical, with no numeric strength attached",
    );
  });

  test("NO_ASSISTANCE fixtures still describe a known, unaided attempt", () => {
    assertEqual(NO_ASSISTANCE.capture, "known", "unchanged assistance fixture");
  });
});
