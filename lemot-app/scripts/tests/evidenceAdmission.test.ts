/**
 * Assistance, attribution and admission tests (PR-03).
 *
 * Three Canonical rules are on trial here:
 *  - FQ-3: assistance scopes the CLAIM, not the existence of the event.
 *  - Bible §6: correctness is NOT admissibility.
 *  - Bible §7: only a VERIFIED learner-sourced error may create weakness; the
 *    seven non-learner sources never do.
 */
import { describe, test, assert, assertEqual } from "./harness";
import type {
  AssistanceSnapshot,
  AttributionSource,
  ConstitutiveSupport,
  EvidenceOpportunityContext,
  QualityIncident,
} from "../../content/learning-engine/evidence-context";
import {
  ATTRIBUTION_SOURCES,
  INCIDENT_REASONS_BY_SOURCE,
  freezeAssistance,
} from "../../content/learning-engine/evidence-context";
import {
  assistanceBlocksIndependentProduction,
  clampToCeiling,
  resolveEvidenceAdmission,
  scopeEvidenceClass,
} from "../../content/learning-engine/evidence-admission";
import type { CurriculumTreatment, EvidenceClass } from "../../content/learning-engine/events";

const known = (over: Partial<Extract<AssistanceSnapshot, { capture: "known" }>> = {}) =>
  ({
    capture: "known" as const,
    constitutive: [] as readonly ConstitutiveSupport[],
    hintRung: 0 as const,
    retryIndex: 0,
    selfCorrection: false,
    priorAnswerExposure: "none" as const,
    accessibility: { replayCount: 0, slowPlayback: false },
    ...over,
  }) as AssistanceSnapshot;

const cleanOpportunity: EvidenceOpportunityContext = {
  authored: true,
  prerequisitesSafe: true,
  evaluator: "approved_deterministic",
  learnerAuthorship: "verified",
  requiredConstitutiveSupport: [],
  qualityIncident: null,
};

function resolve(over: {
  assistance?: AssistanceSnapshot;
  opportunity?: Partial<EvidenceOpportunityContext>;
  targetTreatments?: readonly CurriculumTreatment[];
  evidenceCeiling?: EvidenceClass;
  assessed?: boolean;
  primitive?: "production" | "selection" | "reveal";
} = {}) {
  return resolveEvidenceAdmission({
    assessed: over.assessed ?? true,
    primitive: over.primitive ?? "production",
    evidenceCeiling: over.evidenceCeiling ?? "controlled_production",
    targetTreatments: over.targetTreatments ?? ["active"],
    assistance: over.assistance ?? known(),
    opportunity: { ...cleanOpportunity, ...over.opportunity },
  });
}

const source = (r: ReturnType<typeof resolve>): string =>
  r.attribution.status === "resolved" ? r.attribution.source : r.attribution.status;

describe("assistance evidence scoping", () => {
  test("clean first-pass known assistance keeps the authored production class", () => {
    const r = resolve();
    assertEqual(r.evidenceClass, "controlled_production", "independent claim allowed");
    assertEqual(r.admissibility.status, "admitted", "admitted");
    assertEqual(source(r), "learner", "learner-attributed");
  });

  test("a Supported target caps to supported production", () => {
    assertEqual(resolve({ targetTreatments: ["supported"] }).evidenceClass, "supported_production", "capped");
  });

  test("a legacy-unknown target caps to supported production", () => {
    assertEqual(
      resolve({ targetTreatments: ["legacy_unknown"] }).evidenceClass,
      "supported_production",
      "unknown treatment cannot support an independent claim",
    );
  });

  test("each constitutive support caps to supported production", () => {
    for (const s of [
      "visible_tray",
      "supplied_package",
      "formula_card",
      "immediately_prior_model",
    ] as const) {
      assertEqual(
        resolve({ assistance: known({ constitutive: [s] }) }).evidenceClass,
        "supported_production",
        `${s} caps the claim`,
      );
    }
  });

  test("hint rung 1 and rung 2 both cap to supported production", () => {
    assertEqual(resolve({ assistance: known({ hintRung: 1 }) }).evidenceClass, "supported_production", "rung 1");
    assertEqual(resolve({ assistance: known({ hintRung: 2 }) }).evidenceClass, "supported_production", "rung 2");
  });

  test("a retry caps to supported production", () => {
    assertEqual(resolve({ assistance: known({ retryIndex: 1 }) }).evidenceClass, "supported_production", "retry");
  });

  test("unknown and legacy-unknown assistance cap to supported production", () => {
    for (const capture of ["unknown", "legacy_unknown"] as const) {
      const r = resolve({ assistance: { capture } });
      assertEqual(r.evidenceClass, "supported_production", `${capture} caps the claim`);
      assertEqual(r.admissibility.status, "admitted", `${capture} is still admissible (FQ-3)`);
      assertEqual(source(r), "learner", "and still the learner's attempt");
    }
  });

  test("replay alone and slow playback alone never downgrade evidence", () => {
    assertEqual(
      resolve({ assistance: known({ accessibility: { replayCount: 5, slowPlayback: false } }) })
        .evidenceClass,
      "controlled_production",
      "replay is not a negative signal",
    );
    assertEqual(
      resolve({ assistance: known({ accessibility: { replayCount: 0, slowPlayback: true } }) })
        .evidenceClass,
      "controlled_production",
      "slow playback is not a negative signal",
    );
  });

  test("self-correction becomes self-correction evidence", () => {
    assertEqual(
      resolve({ assistance: known({ selfCorrection: true }) }).evidenceClass,
      "self_correction",
      "its own class, not independent first-pass production",
    );
  });

  test("prior answer/model exposure prevents an independent claim", () => {
    for (const exposure of ["answer", "model"] as const) {
      assertEqual(
        resolve({ assistance: known({ priorAnswerExposure: exposure }) }).evidenceClass,
        "supported_production",
        `${exposure} exposure blocks independence`,
      );
    }
  });

  test("open production stays an attempt and is not upgraded by low assistance", () => {
    assertEqual(
      resolve({ evidenceCeiling: "open_production_attempt" }).evidenceClass,
      "open_production_attempt",
      "W1 attempt-only",
    );
  });

  test("recognition stays recognition — production rules never reclassify it", () => {
    assertEqual(
      resolve({ primitive: "selection", evidenceCeiling: "recognition", assistance: known({ hintRung: 2 }) })
        .evidenceClass,
      "recognition",
      "assistance must not turn recognition into production",
    );
  });

  test("a non-admitted event carries no mastery evidence however correct it looked", () => {
    const r = resolve({ opportunity: { qualityIncident: { source: "content", reason: "content_defect" } } });
    assertEqual(r.evidenceClass, "no_mastery_evidence", "correctness is not admissibility");
  });

  test("the observation never exceeds the authored ceiling", () => {
    assertEqual(
      resolve({ evidenceCeiling: "supported_production" }).evidenceClass,
      "supported_production",
      "a supported ceiling cannot yield controlled production",
    );
    assertEqual(clampToCeiling("recall", "supported_production"), "supported_production", "clamped");
    assertEqual(clampToCeiling("controlled_production", "recognition"), "no_mastery_evidence", "no path");
    assertEqual(clampToCeiling("recognition", "no_mastery_evidence"), "no_mastery_evidence", "floor");
  });

  test("assistanceBlocksIndependentProduction is true for every assisted shape", () => {
    assert(!assistanceBlocksIndependentProduction(known()), "clean known does not block");
    assert(assistanceBlocksIndependentProduction({ capture: "unknown" }), "unknown blocks");
    assert(assistanceBlocksIndependentProduction(known({ hintRung: 1 })), "hint blocks");
    assert(assistanceBlocksIndependentProduction(known({ retryIndex: 2 })), "retry blocks");
    assert(assistanceBlocksIndependentProduction(known({ selfCorrection: true })), "revision blocks");
    assert(
      assistanceBlocksIndependentProduction(known({ priorAnswerExposure: "model" })),
      "exposure blocks",
    );
    assert(
      assistanceBlocksIndependentProduction(known({ constitutive: ["visible_tray"] })),
      "constitutive blocks",
    );
  });

  test("scopeEvidenceClass yields no evidence when not admitted", () => {
    assertEqual(
      scopeEvidenceClass({
        assessed: true,
        primitive: "production",
        evidenceCeiling: "controlled_production",
        targetTreatments: ["active"],
        assistance: known(),
        admitted: false,
      }),
      "no_mastery_evidence",
      "admission gates the claim",
    );
  });
});

describe("attribution and admissibility", () => {
  test("a normal learner success is learner-attributed and admitted", () => {
    const r = resolve();
    assertEqual(source(r), "learner", "learner");
    assertEqual(r.admissibility.status, "admitted", "admitted");
  });

  test("a normal learner failure is equally learner-attributed and admitted", () => {
    // Failure vs success is a grading fact; admission does not depend on it.
    const r = resolve();
    assertEqual(source(r), "learner", "learner owns their misses too");
    assertEqual(r.admissibility.status, "admitted", "admitted");
  });

  test("every non-learner Canonical source quarantines and never blames the learner", () => {
    const incidents: QualityIncident[] = [
      { source: "content", reason: "malformed_distractor" },
      { source: "validator", reason: "accepted_answer_rejected" },
      { source: "ui_flow", reason: "ui_defect" },
      { source: "tone", reason: "tone_interference" },
      { source: "ai_generator", reason: "unsafe_generated_form" },
      { source: "system", reason: "audio_failure" },
      { source: "mastery_mapping", reason: "mapping_defect" },
    ];
    for (const incident of incidents) {
      const r = resolve({ opportunity: { qualityIncident: incident } });
      assertEqual(source(r), incident.source, `${incident.source} owns the result`);
      assertEqual(r.admissibility.status, "quarantined", `${incident.source} quarantines`);
      assertEqual(r.evidenceClass, "no_mastery_evidence", `${incident.source} proves nothing`);
      assert(source(r) !== "learner", `${incident.source} must never blame the learner`);
    }
  });

  test("audio and network are system FACETS, not new top-level sources", () => {
    assertEqual(ATTRIBUTION_SOURCES.length, 8, "exactly eight sources");
    assert(
      (INCIDENT_REASONS_BY_SOURCE.system as readonly string[]).includes("audio_failure"),
      "audio lives under system",
    );
    assert(
      (INCIDENT_REASONS_BY_SOURCE.system as readonly string[]).includes("network_failure"),
      "network lives under system",
    );
    for (const bad of ["audio", "network", "authored_trap", "no_error", "indeterminate"]) {
      assert(
        !(ATTRIBUTION_SOURCES as readonly string[]).includes(bad),
        `"${bad}" must not be a top-level attribution source`,
      );
    }
  });

  test("missing required constitutive support quarantines as ui_flow", () => {
    const r = resolve({
      opportunity: { requiredConstitutiveSupport: ["visible_tray"] },
      assistance: known({ constitutive: [] }),
    });
    assertEqual(source(r), "ui_flow", "the learner was asked for something never rendered");
    assertEqual(r.admissibility.status, "quarantined", "quarantined");
    assert(
      r.admissibility.status === "quarantined" &&
        r.admissibility.reasons.includes("required_support_missing"),
      "the machine reason names the missing support",
    );
  });

  test("required support that IS present admits normally", () => {
    const r = resolve({
      opportunity: { requiredConstitutiveSupport: ["supplied_package"] },
      assistance: known({ constitutive: ["supplied_package"] }),
    });
    assertEqual(r.admissibility.status, "admitted", "support was there");
    assertEqual(r.evidenceClass, "supported_production", "and it scopes the claim");
  });

  test("unknown assistance cannot be used to invent a missing-support defect", () => {
    const r = resolve({
      opportunity: { requiredConstitutiveSupport: ["formula_card"] },
      assistance: { capture: "unknown" },
    });
    assertEqual(r.admissibility.status, "admitted", "absence cannot be proven from unknown");
    assertEqual(r.evidenceClass, "supported_production", "still capped");
  });

  test("unresolved authorship is unresolved — never guessed, never learner", () => {
    const r = resolve({ opportunity: { learnerAuthorship: "unresolved" } });
    assertEqual(r.attribution.status, "unresolved", "do not guess");
    assertEqual(r.admissibility.status, "unresolved", "not admissible yet");
    assertEqual(r.evidenceClass, "no_mastery_evidence", "proves nothing");
  });

  test("an unauthored opportunity or unsafe prerequisite quarantines without a culprit", () => {
    for (const over of [{ authored: false }, { prerequisitesSafe: false }, { evaluator: "unapproved" as const }]) {
      const r = resolve({ opportunity: over });
      assertEqual(r.admissibility.status, "quarantined", "quarantined");
      assertEqual(r.attribution.status, "unresolved", "no single source is implicated");
      assertEqual(r.evidenceClass, "no_mastery_evidence", "proves nothing");
    }
  });

  test("a non-assessed interaction is not-applicable / no-evidence", () => {
    const r = resolve({ assessed: false, primitive: "reveal", evidenceCeiling: "comparison_only" });
    assertEqual(r.attribution.status, "not_applicable", "nothing was graded");
    assertEqual(r.admissibility.status, "no_evidence", "no evidence");
    assert(
      r.admissibility.status === "no_evidence" &&
        r.admissibility.reasons.includes("non_assessed_interaction"),
      "machine reason recorded",
    );
  });

  test("no free-form incident text field exists anywhere in the result", () => {
    const r = resolve({ opportunity: { qualityIncident: { source: "content", reason: "content_defect" } } });
    const json = JSON.stringify(r);
    for (const forbidden of ["message", "detail", "description", "note", "text"]) {
      assert(!json.includes(`"${forbidden}"`), `no free-form "${forbidden}" field may be persisted`);
    }
  });

  test("every Canonical source is reachable as a resolved attribution", () => {
    const seen = new Set<AttributionSource>(["learner"]);
    for (const s of ATTRIBUTION_SOURCES) {
      if (s === "learner") continue;
      const reason = INCIDENT_REASONS_BY_SOURCE[s][0];
      const r = resolve({ opportunity: { qualityIncident: { source: s, reason } } });
      if (r.attribution.status === "resolved") seen.add(r.attribution.source);
    }
    assertEqual(seen.size, 8, "all eight Canonical sources are reachable");
  });
});

describe("assistance immutability", () => {
  test("freezing clones the input, so later mutation cannot reach the event", () => {
    const constitutive: ConstitutiveSupport[] = ["visible_tray"];
    const accessibility = { replayCount: 1, slowPlayback: false };
    const frozen = freezeAssistance(known({ constitutive, accessibility }));
    constitutive.push("formula_card");
    accessibility.replayCount = 99;
    assert(frozen.capture === "known", "known snapshot");
    if (frozen.capture !== "known") return;
    assertEqual(frozen.constitutive.length, 1, "own copy of constitutive");
    assertEqual(frozen.accessibility.replayCount, 1, "own copy of accessibility");
    assert(Object.isFrozen(frozen), "snapshot frozen");
    assert(Object.isFrozen(frozen.constitutive), "constitutive frozen");
    assert(Object.isFrozen(frozen.accessibility), "accessibility frozen");
    assert(!Object.isFrozen(constitutive), "the caller's own array is not frozen");
  });

  test("an unknown snapshot carries no fabricated detail", () => {
    const frozen = freezeAssistance({ capture: "unknown" });
    const raw = frozen as unknown as Record<string, unknown>;
    for (const field of ["constitutive", "hintRung", "retryIndex", "selfCorrection"]) {
      assertEqual(raw[field], undefined, `unknown must not carry "${field}"`);
    }
  });
});
