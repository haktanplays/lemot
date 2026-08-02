/**
 * PR-07 — Exact L1 pilot identity and payload registration.
 *
 * The claim under test: the four missing L1 acquisition concepts (five runtime
 * ids), the two pilot sentences and the exact PM-009 / PM-011 payloads are
 * registered — under the recorded FOUNDER WAIVER, never as human-approved —
 * and their real EV / sentence / payload identities now flow through the
 * existing event, mastery, Mon Lexique, Practice Hub and Stats spine with no
 * synthetic fixture anywhere in the connected proofs.
 *
 * HONEST SCOPE NOTE. As throughout this repo, there is no React component test
 * renderer (none was added). Registries, resolvers, the real-screen event
 * orchestration and every projection are tested BEHAVIOURALLY over the real
 * shipped lesson; renderer wiring remains covered by the existing source-level
 * guards.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv } from "./helpers";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  ERROR_TAG_CODES,
  LEARNING_EVENT_SCHEMA_VERSION,
  type AssessedLearningEvent,
} from "../../content/learning-engine/events";
import { ATTRIBUTION_SOURCES } from "../../content/learning-engine/evidence-context";
import { MASTERY_SNAPSHOT_VERSION } from "../../content/learning-engine/mastery";
import { COMPACTION_SNAPSHOT_VERSION } from "../../content/learning-engine/compaction";
import { TELEMETRY_SCHEMA_VERSION } from "../../content/learning-engine/telemetry";
import {
  LM_LE_EVENTS_KEY,
  LocalRepository,
} from "../../content/learning-engine/repository/local";
import {
  createLearningEngineRuntime,
  type LearningEngineRuntime,
} from "../../content/learning-engine/runtime";
import type { LearningSessionController } from "../../content/learning-engine/session-controller";
import {
  declaredConstitutivePieces,
  evaluateWeaveAnswer,
  typedAttemptInteraction,
} from "../../content/lesson-v1-evidence/interactions";
import { qualifyLessonScreenId } from "../../content/lesson-v1-evidence/identity";
import {
  CANONICAL_ITEM_COUNT,
  CANONICAL_ITEM_ID_SET,
} from "../../content/identity/canonicalItems";
import {
  FRENCH_QA_STATUSES,
  isHumanFrenchApproved,
  isInternalPilotFrenchReachable,
  type FrenchQaStatus,
} from "../../content/identity/frenchQaStatus";
import { validateAcquisitionLinks } from "../../content/identity/acquisitionLinks";
import { SENTENCE_REGISTRY } from "../../content/identity/sentenceRegistry";
import {
  REGISTERED_LESSON_PAYLOADS,
  listProvisionalRegisteredSurfaces,
  makeRegisteredEventSurface,
  resolveRegisteredPayloadIdentity,
  validateRegisteredPayloads,
} from "../../content/identity/payloadRegistry";
import { ITEM_REGISTRY, getItem } from "../../content/itemRegistry";
import { V1_LESSONS } from "../../content/lessons/v1";
import { selectMonLexiqueEntries } from "../../content/learning-engine/mon-lexique";
import { selectPracticeHubSet } from "../../content/lesson-v1-evidence/practiceHub";
import type { Lesson, WeaveScreen } from "../../content/lessonTypes";

const APP_ROOT = process.cwd();
const read = (rel: string): string => readFileSync(join(APP_ROOT, rel), "utf8");
const codeOf = (src: string): string =>
  src
    .split("\n")
    .filter(
      (l) =>
        !l.trim().startsWith("*") && !l.trim().startsWith("//") && !l.trim().startsWith("/*"),
    )
    .join("\n");

const NOW = 1_800_000_000_000;
const lesson001 = V1_LESSONS.find((l) => l.id === "v1-lesson-001") as Lesson;
const pm009Screen = lesson001.screens.find(
  (s) => s.id === "s10-weave-merci-thanks",
) as WeaveScreen;
const pm011Screen = lesson001.screens.find(
  (s) => s.id === "s11-weave-the-order",
) as WeaveScreen;

const NEW_ITEM_IDS = [
  "chunk-excusez-moi",
  "chunk-je-ne-comprends-pas",
  "chunk-vous-pouvez-repeter",
  "chunk-un-the",
  "noun-the",
] as const;

function runtimeWith(repo: LocalRepository): LearningEngineRuntime {
  return createLearningEngineRuntime({
    repository: repo,
    appBuild: "test",
    deviceInfo: { platform: "test" },
    makeSessionId: () => `sess-${Math.random().toString(36).slice(2, 8)}`,
  });
}

/** Controllers use the REAL shared surface factory — no test-local resolver. */
function controllerOn(
  runtime: LearningEngineRuntime,
  placement: "lesson_path" | "practice_hub",
): LearningSessionController {
  let t = 0;
  let n = 0;
  return runtime.createSessionController({
    lessonId: lesson001.id,
    contentVersion: lesson001.version,
    resolveEventSurface: makeRegisteredEventSurface(placement),
    now: () => NOW + (t += 1_000),
    makeClientEventId: () => `evt-p7-${placement}-${(n += 1)}`,
  });
}

function session(kv = makeFakeKv()) {
  const repo = new LocalRepository(kv);
  const runtime = runtimeWith(repo);
  return { kv, repo, runtime };
}

const pm009Attempt = (c: LearningSessionController, text = "Merci.") =>
  c.recordGradedAttempt(
    typedAttemptInteraction(lesson001, pm009Screen, {
      text,
      hintRung: 0,
      constitutiveSupportRendered: false,
    }),
  );
const pm011Attempt = (
  c: LearningSessionController,
  over: { text?: string; rendered?: boolean } = {},
) =>
  c.recordGradedAttempt(
    typedAttemptInteraction(lesson001, pm011Screen, {
      text: over.text ?? "Je voudrais un thé, s'il vous plaît.",
      hintRung: 0,
      constitutiveSupportRendered: over.rendered ?? true,
    }),
  );

// ── Part A: French-QA status vocabulary ─────────────────────────────────────

describe("french-qa status — waiver is never approval", () => {
  test("the exact truth table", () => {
    const table: Array<[FrenchQaStatus, boolean, boolean]> = [
      ["pending", false, false],
      ["founder_waived_provisional", false, true],
      ["approved", true, true],
      ["rejected", false, false],
    ];
    for (const [status, human, reachable] of table) {
      assertEqual(isHumanFrenchApproved(status), human, `${status} human-approved`);
      assertEqual(
        isInternalPilotFrenchReachable(status),
        reachable,
        `${status} pilot-reachable`,
      );
    }
    assertEqual(FRENCH_QA_STATUSES.length, 4, "the four explicit statuses");
  });

  test("no new record claims approval — items or sentences", () => {
    for (const id of NEW_ITEM_IDS) {
      assertEqual(
        getItem(id).frenchQa,
        "founder_waived_provisional",
        `${id} is provisional, never approved`,
      );
    }
    for (const record of Object.values(SENTENCE_REGISTRY)) {
      assertEqual(record.frenchQa, "founder_waived_provisional", `${record.id}`);
    }
    for (const rel of ["content/itemRegistry.ts", "content/identity/sentenceRegistry.ts"]) {
      assert(
        !codeOf(read(rel)).includes('frenchQa: "approved"'),
        `${rel} contains no approval claim`,
      );
    }
  });

  test("no reviewer name, date or attestation was invented", () => {
    for (const rel of [
      "content/identity/frenchQaStatus.ts",
      "content/identity/sentenceRegistry.ts",
      "content/identity/payloadRegistry.ts",
    ]) {
      const code = codeOf(read(rel));
      for (const banned of ["reviewerName", "reviewedBy", "reviewDate", "attestedBy"]) {
        assert(!code.includes(banned), `${rel} must not fabricate ${banned}`);
      }
    }
  });

  test("public/content-complete readiness is false while provisional surfaces exist", () => {
    const inventory = listProvisionalRegisteredSurfaces();
    const provisionalCount =
      inventory.items.length + inventory.sentences.length + inventory.payloads.length;
    assert(provisionalCount > 0, "provisional surfaces exist right now");
    const releaseReady = provisionalCount === 0; // the only honest derivation
    assertEqual(releaseReady, false, "not public/content-complete ready");
  });
});

// ── Parts B/C: item registration + tea relationship ─────────────────────────

describe("five canonical item registrations", () => {
  test("canonical count is 59 and the five new ids exist; the old 54 survive", () => {
    assertEqual(CANONICAL_ITEM_COUNT, 59, "54 frozen + 5 new");
    for (const id of NEW_ITEM_IDS) {
      assert(CANONICAL_ITEM_ID_SET.has(id), `${id} registered`);
    }
    for (const old of ["chunk-bonjour", "chunk-merci", "noun-cafe", "verb-aller"]) {
      assert(CANONICAL_ITEM_ID_SET.has(old), `${old} untouched`);
    }
  });

  test("the manifest froze exactly the same 59 ids (bidirectional)", () => {
    const manifest = JSON.parse(read("scripts/shipped-item-ids.json")) as {
      ids: string[];
    };
    assertEqual(manifest.ids.length, 59, "manifest count");
    assertEqual(
      manifest.ids.slice().sort().join(","),
      [...CANONICAL_ITEM_ID_SET].sort().join(","),
      "manifest and registry stay bidirectional",
    );
  });

  test("exact forms and treatments of the five", () => {
    const expectations: Array<[string, string, string, string]> = [
      ["chunk-excusez-moi", "chunk", "supported", "excusez-moi"],
      ["chunk-je-ne-comprends-pas", "chunk", "supported", "je ne comprends pas"],
      ["chunk-vous-pouvez-repeter", "chunk", "supported", "vous pouvez répéter ?"],
      ["chunk-un-the", "chunk", "supported", "un thé"],
      ["noun-the", "noun", "supported", "thé"],
    ];
    for (const [id, type, status, fr] of expectations) {
      const item = getItem(id as never);
      assertEqual(item.type, type, `${id} type`);
      assertEqual(item.status, status, `${id} status`);
      assertEqual(item.fr, fr, `${id} surface`);
    }
  });

  test("the inverted repetition question stays out of learner content", () => {
    for (const rel of [
      "content/itemRegistry.ts",
      ...V1_LESSONS.map((l) => `content/lessons/v1/${l.id.replace("v1-", "")}.ts`),
    ]) {
      assert(
        !read(rel).includes("Pouvez-vous"),
        `${rel} must not carry the inverted form`,
      );
    }
  });

  test("the tea relationship is structural, reciprocal and validated", () => {
    assertEqual(validateAcquisitionLinks().join(" | "), "", "registry links are clean");
    const primary = getItem("chunk-un-the");
    const linked = getItem("noun-the");
    assertEqual(primary.acquisitionLink?.role, "primary", "chunk-un-the leads");
    assert(
      primary.acquisitionLink?.role === "primary" &&
        primary.acquisitionLink.linkedItemIds.join(",") === "noun-the",
      "primary points to noun-the",
    );
    assert(
      linked.acquisitionLink?.role === "linked" &&
        linked.acquisitionLink.primaryItemId === "chunk-un-the",
      "linked points back",
    );
  });

  test("the link validator catches every broken shape", () => {
    const base = (over: object) => ({
      id: "x",
      type: "chunk",
      text: "x",
      status: "supported",
      ...over,
    });
    // Non-reciprocal forward link.
    let errors = validateAcquisitionLinks({
      a: base({ id: "a", acquisitionLink: { role: "primary", linkedItemIds: ["b"] } }),
      b: base({ id: "b" }),
    } as never);
    assert(errors.some((e) => e.includes("does not point back")), "non-reciprocal caught");
    // Self link.
    errors = validateAcquisitionLinks({
      a: base({ id: "a", acquisitionLink: { role: "primary", linkedItemIds: ["a"] } }),
    } as never);
    assert(errors.some((e) => e.includes("links to itself")), "self-link caught");
    // Missing referenced id.
    errors = validateAcquisitionLinks({
      a: base({ id: "a", acquisitionLink: { role: "linked", primaryItemId: "ghost" } }),
    } as never);
    assert(errors.some((e) => e.includes("does not exist")), "missing id caught");
    // Two primaries claiming one linked identity.
    errors = validateAcquisitionLinks({
      a: base({ id: "a", acquisitionLink: { role: "primary", linkedItemIds: ["c"] } }),
      b: base({ id: "b", acquisitionLink: { role: "primary", linkedItemIds: ["c"] } }),
      c: base({ id: "c", acquisitionLink: { role: "linked", primaryItemId: "a" } }),
    } as never);
    assert(errors.some((e) => e.includes("exactly one primary")), "double primary caught");
  });

  test("no lesson targets the linked noun, and the rescue chunks stay unactivated", () => {
    for (const lesson of V1_LESSONS) {
      for (const screen of lesson.screens) {
        assert(
          !(screen.targetItemIds ?? []).includes("noun-the"),
          `${lesson.id}/${screen.id} must not target the linked sub-identity`,
        );
      }
      for (const rescue of [
        "chunk-excusez-moi",
        "chunk-je-ne-comprends-pas",
        "chunk-vous-pouvez-repeter",
      ]) {
        assert(
          !lesson.learningItems.some((i) => i.id === rescue),
          `${lesson.id} must not activate ${rescue} — registered for the ledger only`,
        );
      }
    }
    assert(
      lesson001.learningItems.some((i) => i.id === "chunk-un-the"),
      "the primary tea identity IS a lesson-001 learning item",
    );
  });
});

// ── Part D: the production sentence registry ────────────────────────────────

describe("production sentence registry — exactly two records", () => {
  test("exact ids, surfaces, alternatives, items, treatments and eligibility", () => {
    assertEqual(Object.keys(SENTENCE_REGISTRY).length, 2, "two records, no seed pool");

    const merci = SENTENCE_REGISTRY["sent:l01-merci"];
    assertEqual(merci.preferredSurface, "Merci.", "PM-009 surface");
    assertEqual(merci.acceptedAlternatives.join("|"), "Merci|Merci !", "punctuation only");
    assertEqual(merci.itemIds.join(","), "chunk-merci", "one item");
    assertEqual(merci.spans[0]?.treatment, "active", "active span");
    assertEqual(merci.lessonEligibility.join(","), "v1-lesson-001", "eligibility");
    assertEqual(merci.provenance, "shipped-payload", "provenance");
    assertEqual(merci.status, "active", "active");
    assertEqual(merci.audioId, undefined, "no audio identity before PR-11");

    const tea = SENTENCE_REGISTRY["sent:l01-je-voudrais-un-the-sil-vous-plait"];
    assertEqual(
      tea.preferredSurface,
      "Je voudrais un thé, s'il vous plaît.",
      "PM-011 surface",
    );
    assertEqual(
      tea.itemIds.join(","),
      "chunk-je-voudrais,chunk-un-the,chunk-sil-vous-plait",
      "three items",
    );
    assertEqual(
      tea.spans.map((s) => s.treatment).join(","),
      "active,supported,active",
      "the Supported tea package inside an Active frame",
    );
    assertEqual(tea.provenance, "newly-authored", "provenance");
    assertEqual(tea.audioId, undefined, "no audio identity before PR-11");
  });

  test("the reserve surface and draft seed handles were not registered", () => {
    for (const record of Object.values(SENTENCE_REGISTRY)) {
      assert(
        record.preferredSurface !== "Bonjour, je voudrais un thé." &&
          !record.acceptedAlternatives.includes("Bonjour, je voudrais un thé."),
        "the reserve sentence stays unregistered",
      );
    }
    const code = codeOf(read("content/identity/sentenceRegistry.ts"));
    assert(!code.includes("L1-SE-"), "no draft-local seed handle as runtime identity");
  });
});

// ── Parts E/F: payload registry + shared surface resolver ───────────────────

describe("registered payload identity", () => {
  test("exactly two payloads with the exact EV/sentence mapping", () => {
    assertEqual(REGISTERED_LESSON_PAYLOADS.length, 2, "two registered payloads");
    const pm009 = resolveRegisteredPayloadIdentity("v1-lesson-001/s10-weave-merci-thanks");
    assertEqual(pm009?.evId, "EV-030", "PM-009 EV");
    assertEqual(pm009?.sentenceId, "sent:l01-merci", "PM-009 sentence");
    const pm011 = resolveRegisteredPayloadIdentity("v1-lesson-001/s11-weave-the-order");
    assertEqual(pm011?.evId, "EV-040", "PM-011 EV");
    assertEqual(
      pm011?.sentenceId,
      "sent:l01-je-voudrais-un-the-sil-vous-plait",
      "PM-011 sentence",
    );
  });

  test("the registry validates against the real shipped lessons", () => {
    assertEqual(validateRegisteredPayloads(V1_LESSONS).join(" | "), "", "clean");
  });

  test("validation fails closed when the screens are missing or drift", () => {
    const missing = validateRegisteredPayloads([]);
    assertEqual(missing.length, 2, "both payloads unresolvable without their screens");
    assert(missing.every((e) => e.includes("does not resolve")), "actionable message");

    const drifted: Lesson = {
      ...lesson001,
      screens: lesson001.screens.map((s) =>
        s.id === "s10-weave-merci-thanks" && s.type === "weave"
          ? { ...s, payload: { ...s.payload, expectedAnswers: ["Bonjour."] } }
          : s,
      ),
    };
    const errors = validateRegisteredPayloads([drifted]);
    assert(
      errors.some((e) => e.includes("neither the preferred surface")),
      "surface drift between screen and sentence is caught",
    );
  });

  test("no planning handle became a runtime identifier", () => {
    for (const payload of REGISTERED_LESSON_PAYLOADS) {
      for (const value of [payload.payloadId, payload.evId, payload.sentenceId as string]) {
        assert(!/L1-PM-\d+/.test(value), `"${value}" carries no planning handle`);
      }
      assert(/^L1-PM-\d{3}$/.test(payload.sourcePairing), "provenance stays provenance");
    }
  });

  test("the shared resolver: registered ids populate, everything else stays null", () => {
    const lessonSurface = makeRegisteredEventSurface("lesson_path");
    const registered = lessonSurface({ id: "v1-lesson-001/s10-weave-merci-thanks" });
    assertEqual(registered.placement, "lesson_path", "caller-owned placement");
    assertEqual(registered.evId, "EV-030", "EV from the registry");
    assertEqual(registered.sentenceId, "sent:l01-merci", "sentence from the registry");
    assertEqual(registered.payloadId, "v1-lesson-001/s10-weave-merci-thanks", "unchanged");
    assertEqual(registered.sequence, null, "no sequence invented");

    const unregistered = lessonSurface({ id: "v1-lesson-001/s04-weave-cafe-order" });
    assertEqual(unregistered.evId, null, "unregistered screens keep null EV");
    assertEqual(unregistered.sentenceId, null, "and null sentence — behavior unchanged");

    const hub = makeRegisteredEventSurface("practice_hub")({
      id: "v1-lesson-001/s11-weave-the-order",
    });
    assertEqual(hub.placement, "practice_hub", "hub placement");
    assertEqual(hub.evId, "EV-040", "same identity through the hub");
  });
});

// ── Parts G/K: PM-009 connected proof ───────────────────────────────────────

describe("PM-009 — unscaffolded typed thanks (real screen, real spine)", () => {
  test("the screen contract: no pieces, no cloze, no trap, calm reveal", () => {
    assertEqual(pm009Screen.type, "weave", "typed recall reuses Weave");
    assertEqual((pm009Screen.payload.suggestedPieces ?? []).length, 0, "no pieces");
    assertEqual(pm009Screen.payload.hintCloze, undefined, "no hint cloze");
    assertEqual(declaredConstitutivePieces(pm009Screen).length, 0, "no support");
    assertEqual(pm009Screen.payload.prompt, "The coffee arrives. Thank them.", "prompt");
    assertEqual(pm009Screen.payload.expectedAnswers.join(","), "Merci.", "target");
    assertEqual(evaluateWeaveAnswer(pm009Screen, "Merci.").grade.result, "correct", "preferred");
    assert(
      ["correct", "accepted_variant"].includes(
        evaluateWeaveAnswer(pm009Screen, "Merci").grade.result,
      ),
      "bare Merci accepted",
    );
    assert(
      ["correct", "accepted_variant"].includes(
        evaluateWeaveAnswer(pm009Screen, "Merci !").grade.result,
      ),
      "Merci ! accepted",
    );
  });

  test("a clean first attempt emits the exact registered identity and independent evidence", async () => {
    const { kv, repo, runtime } = session();
    pm009Attempt(controllerOn(runtime, "lesson_path"));
    await runtime.readMasterySnapshot(); // no-op read; ensure nothing pending yet
    const c = controllerOn(runtime, "lesson_path");
    pm009Attempt(c);
    await c.flush();

    const events = await repo.readAllEvents();
    const e = events[events.length - 1] as AssessedLearningEvent;
    assertEqual(e.assessed, true, "assessed");
    assertEqual(e.primitive, "production", "production primitive");
    assertEqual(e.placement, "lesson_path", "lesson path");
    assertEqual(e.evId, "EV-030", "the registered EV");
    assertEqual(e.payloadId, "v1-lesson-001/s10-weave-merci-thanks", "registered payload");
    assertEqual(e.sentenceId, "sent:l01-merci", "the registered sentence");
    assertEqual(e.itemIds.join(","), "chunk-merci", "exactly the merci item");
    assertEqual(e.targetTreatments.join(","), "active", "active treatment");
    assert(
      e.assistance.capture === "known" &&
        e.assistance.hintRung === 0 &&
        e.assistance.constitutive.length === 0,
      "no support, no hint",
    );
    assert(
      e.evidenceClass === "controlled_production" || e.evidenceClass === "recall",
      "independent-class evidence per the existing resolver",
    );
    assertEqual(e.admissibility.status, "admitted", "admitted");
    assertEqual(
      e.attribution.status === "resolved" ? e.attribution.source : "?",
      "learner",
      "learner-attributed",
    );

    const snapshot = await runtime.readMasterySnapshot();
    assert(
      snapshot.items["chunk-merci"].production.independent.success >= 1,
      "independent channel incremented",
    );
    assertEqual([...kv.map.keys()].join(","), LM_LE_EVENTS_KEY, "no second store");
  });

  test("mastery → Mon Lexique → Stats → Practice Hub, one identity throughout", async () => {
    const { runtime } = session();
    const c = controllerOn(runtime, "lesson_path");
    pm009Attempt(c);
    await c.flush();
    const snapshot = await runtime.readMasterySnapshot();

    const lexique = selectMonLexiqueEntries({ items: ITEM_REGISTRY, snapshot });
    const merciEntry = lexique.find((e) => e.itemId === "chunk-merci");
    assertEqual(merciEntry?.status, "added", "Mon Lexique visibility");
    assertEqual(merciEntry?.productionClaim, "independent", "independent claim");

    const stats = await runtime.readLearningStats();
    assertEqual(stats.independentPracticeMoments, 1, "Stats independent activity");
    assertEqual(stats.independentPieces, 1, "one independent piece");

    // Practice Hub return: the ORIGINAL PM-009 screen, by reference.
    const hubSet = selectPracticeHubSet({
      snapshot,
      items: ITEM_REGISTRY,
      lessons: V1_LESSONS,
      now: NOW + 10_000_000,
      budget: 5,
    });
    const merciCard = hubSet.entries.find((e) => e.itemId === "chunk-merci");
    assert(merciCard !== undefined, "merci may return through the Hub");
    assert(merciCard?.source.screen === pm009Screen, "the original screen, by reference");

    const hub = controllerOn(runtime, "practice_hub");
    pm009Attempt(hub);
    await hub.flush();
    const hubEvents = await runtime.readMasterySnapshot();
    assertEqual(
      hubEvents.items["chunk-merci"].production.independent.success,
      2,
      "same mastery row accumulates through the Hub",
    );
    const stats2 = await runtime.readLearningStats();
    assertEqual(stats2.practiceHubMoments, 1, "the Hub moment counted");
    assertEqual(stats2.crossSurfacePieces, 1, "genuine cross-surface reuse");
  });

  test("hub events carry the SAME EV/sentence/payload identity, new placement", async () => {
    const { repo, runtime } = session();
    const hub = controllerOn(runtime, "practice_hub");
    pm009Attempt(hub);
    await hub.flush();
    const e = (await repo.readAllEvents())[0] as AssessedLearningEvent;
    assertEqual(e.placement, "practice_hub", "honest placement change");
    assertEqual(e.evId, "EV-030", "EV preserved");
    assertEqual(e.sentenceId, "sent:l01-merci", "sentence preserved");
    assertEqual(e.payloadId, "v1-lesson-001/s10-weave-merci-thanks", "payload preserved");
  });

  test("one miss stays below the unchanged weakness threshold", async () => {
    const { runtime } = session();
    const c = controllerOn(runtime, "lesson_path");
    pm009Attempt(c, "Bonjour.");
    await c.flush();
    const snapshot = await runtime.readMasterySnapshot();
    assertEqual(snapshot.items["chunk-merci"].isWeak, false, "one miss ≠ weakness");
    const lexique = selectMonLexiqueEntries({ items: ITEM_REGISTRY, snapshot });
    assertEqual(lexique.length, 0, "and no premature visibility");
  });
});

// ── Parts H/K: PM-011 connected proof ───────────────────────────────────────

describe("PM-011 — Supported tea order (real screen, real spine)", () => {
  test("the screen contract: whole constitutive package, never split, never hidden", () => {
    assertEqual(pm011Screen.type, "weave", "no new screen primitive");
    const constitutive = declaredConstitutivePieces(pm011Screen);
    assertEqual(constitutive.length, 1, "ONE whole package");
    assertEqual(constitutive[0].text, "un thé", "the package is whole");
    assertEqual(constitutive[0].itemId, "chunk-un-the", "identified support");
    assert(
      !(pm011Screen.payload.suggestedPieces ?? []).some(
        (p) => p.text === "un" || p.text === "thé",
      ),
      "never split into un + thé",
    );
    assertEqual(
      pm011Screen.evidenceTargetItemIds?.join(","),
      "chunk-un-the",
      "evidence target is exactly the primary tea identity",
    );
    assertEqual(
      pm011Screen.payload.hintCloze,
      "Je voudrais ___, s'il vous plaît.",
      "the optional frame hint",
    );
    assertEqual(pm011Screen.payload.prompt, "Order a tea politely.", "prompt");
  });

  test("a correct attempt emits Supported evidence with the exact registered identity", async () => {
    const { kv, repo, runtime } = session();
    const c = controllerOn(runtime, "lesson_path");
    pm011Attempt(c);
    await c.flush();

    const e = (await repo.readAllEvents())[0] as AssessedLearningEvent;
    assertEqual(e.assessed, true, "assessed");
    assertEqual(e.primitive, "production", "production");
    assertEqual(e.placement, "lesson_path", "lesson path");
    assertEqual(e.evId, "EV-040", "the registered EV");
    assertEqual(e.sentenceId, "sent:l01-je-voudrais-un-the-sil-vous-plait", "sentence");
    assertEqual(e.payloadId, "v1-lesson-001/s11-weave-the-order", "payload");
    assertEqual(e.itemIds.join(","), "chunk-un-the", "exactly the primary tea id");
    assertEqual(e.targetTreatments.join(","), "supported", "supported treatment");
    assert(
      e.assistance.capture === "known" &&
        e.assistance.constitutive.join(",") === "supplied_package",
      "the package is recorded as supplied_package",
    );
    assertEqual(e.evidenceClass, "supported_production", "Supported evidence");
    assertEqual(e.admissibility.status, "admitted", "admitted");

    const snapshot = await runtime.readMasterySnapshot();
    const tea = snapshot.items["chunk-un-the"];
    assertEqual(tea.production.supported.success, 1, "Supported channel");
    assertEqual(tea.production.independent.success, 0, "independent stays ZERO");
    assertEqual(snapshot.items["noun-the"], undefined, "noun-the received no event");
    assertEqual([...kv.map.keys()].join(","), LM_LE_EVENTS_KEY, "no second store");
  });

  test("Mon Lexique shows ONE tea entry through the primary; Stats one Supported piece", async () => {
    const { runtime } = session();
    const c = controllerOn(runtime, "lesson_path");
    pm011Attempt(c);
    await c.flush();
    const snapshot = await runtime.readMasterySnapshot();

    const lexique = selectMonLexiqueEntries({ items: ITEM_REGISTRY, snapshot });
    const teaEntries = lexique.filter(
      (e) => e.itemId === "chunk-un-the" || e.itemId === "noun-the",
    );
    assertEqual(teaEntries.length, 1, "exactly one tea entry — the concept counted once");
    assertEqual(teaEntries[0].itemId, "chunk-un-the", "through the primary identity");
    assertEqual(teaEntries[0].fr, "un thé", "the package surface");
    assertEqual(teaEntries[0].productionClaim, "supported", "honest Supported claim");

    const stats = await runtime.readLearningStats();
    assertEqual(stats.supportedPracticeMoments, 1, "one Supported moment");
    assertEqual(stats.supportedPieces, 1, "one Supported piece");
    assertEqual(stats.independentPieces, 0, "not an independent piece");
    assertEqual(stats.piecesPracticed, 1, "no duplicate piece");
  });

  test("a declared-but-unrendered package quarantines as a UI-flow defect", async () => {
    const { runtime } = session();
    const c = controllerOn(runtime, "lesson_path");
    pm011Attempt(c, { rendered: false });
    await c.flush();
    const snapshot = await runtime.readMasterySnapshot();
    assertEqual(
      Object.keys(snapshot.items).length,
      0,
      "a quarantined attempt moves nothing",
    );
  });

  test("the Hub reuses the Supported screen with its package — never bare recall", async () => {
    const { runtime } = session();
    const c = controllerOn(runtime, "lesson_path");
    pm011Attempt(c);
    await c.flush();
    const snapshot = await runtime.readMasterySnapshot();

    const hubSet = selectPracticeHubSet({
      snapshot,
      items: ITEM_REGISTRY,
      lessons: V1_LESSONS,
      now: NOW + 10_000_000,
      budget: 5,
    });
    const teaCard = hubSet.entries.find((e) => e.itemId === "chunk-un-the");
    assert(teaCard !== undefined, "the tea package may return");
    assert(teaCard?.source.screen === pm011Screen, "the original screen, by reference");
    assertEqual(
      declaredConstitutivePieces(teaCard!.source.screen as WeaveScreen).length,
      1,
      "constitutive support is not stripped by the Hub",
    );

    const hub = controllerOn(runtime, "practice_hub");
    pm011Attempt(hub);
    await hub.flush();
    const after = await runtime.readMasterySnapshot();
    assertEqual(
      after.items["chunk-un-the"].production.supported.success,
      2,
      "still Supported through the Hub — no unscaffolded tea claim",
    );
    assertEqual(
      after.items["chunk-un-the"].production.independent.success,
      0,
      "independent remains zero",
    );
  });

  test("the exact PM-023 payload remains unregistered", () => {
    assertEqual(
      REGISTERED_LESSON_PAYLOADS.map((p) => p.sourcePairing).sort().join(","),
      "L1-PM-009,L1-PM-011",
      "only the two pilot pairings — PM-023 stays a proven capability, not a payload",
    );
  });
});

// ── Part L: provisional-surface inventory ───────────────────────────────────

describe("QA debt stays queryable", () => {
  test("the inventory lists 5 items, 2 sentences, 2 payloads — deterministically", () => {
    const one = listProvisionalRegisteredSurfaces();
    assertEqual(one.items.length, 5, "five provisional items");
    assertEqual(one.sentences.length, 2, "two provisional sentences");
    assertEqual(one.payloads.length, 2, "two registered payloads");
    assertEqual(
      one.items.map((i) => i.itemId).join(","),
      "chunk-excusez-moi,chunk-je-ne-comprends-pas,chunk-un-the,chunk-vous-pouvez-repeter,noun-the",
      "sorted item ordering",
    );
    assertEqual(
      JSON.stringify(one),
      JSON.stringify(listProvisionalRegisteredSurfaces()),
      "deterministic",
    );
  });

  test("the inventory modules are pure — no storage, history or React", () => {
    for (const rel of [
      "content/identity/frenchQaStatus.ts",
      "content/identity/acquisitionLinks.ts",
      "content/identity/sentenceRegistry.ts",
      "content/identity/payloadRegistry.ts",
    ]) {
      const code = codeOf(read(rel));
      for (const banned of [
        'from "react',
        'from "expo',
        "LocalRepository",
        "readAllEvents",
        "setItem",
        "getItem(",
        "LM_LE_",
        "Date.now",
        "fetch(",
      ]) {
        assert(!code.includes(banned), `${rel} must not reference ${banned}`);
      }
    }
  });
});

// ── regression: PR-07 changed no frozen contract ────────────────────────────

describe("PR-07 changed no frozen contract", () => {
  test("schemas, vocabularies and versions are unchanged", () => {
    assertEqual(LEARNING_EVENT_SCHEMA_VERSION, 3, "event schema");
    assertEqual(TELEMETRY_SCHEMA_VERSION, 1, "telemetry schema");
    assertEqual(MASTERY_SNAPSHOT_VERSION, "mastery-v0.3", "mastery");
    assertEqual(COMPACTION_SNAPSHOT_VERSION, "compaction-v0.2", "compaction");
    assertEqual(ATTRIBUTION_SOURCES.length, 8, "the Canonical eight");
    assertEqual(ERROR_TAG_CODES.length, 16, "frozen tags");
  });

  test("no new screen type entered the taxonomy", () => {
    const known = new Set([
      "meet-card",
      "insight-card",
      "fill-with-traps",
      "weave",
      "say-it-your-way",
      "natural-reveal",
      "recap",
    ]);
    for (const lesson of V1_LESSONS) {
      for (const screen of lesson.screens) {
        assert(known.has(screen.type), `${lesson.id}/${screen.id}: known type only`);
      }
    }
  });

  test("existing lesson-001 screens and their French are untouched", () => {
    const s04 = lesson001.screens.find((s) => s.id === "s04-weave-cafe-order") as WeaveScreen;
    assertEqual(
      s04.payload.expectedAnswers[0],
      "Bonjour, je voudrais un café.",
      "the café order is exactly as before",
    );
    // Truthful-progression re-cut: the two meet cards that restated L0's first
    // contact (s00-meet-bonjour, s02-meet-je-voudrais-cafe) are gone, the
    // survival-kit insight moved after the first weave, and s12-meet-un-the
    // introduces the tea package before PM-011 asks for it. Every SURVIVING id
    // keeps its original name, and PM-009/PM-011 still sit between meet-merci
    // and Say It.
    assertEqual(
      lesson001.screens.map((s) => s.id).join(","),
      [
        "s00-goal-survival-kit",
        "s03-fill-polite-verb",
        "s04-weave-cafe-order",
        "s01-insight-survival-kit",
        "s05-meet-sil-vous-plait",
        "s06-weave-cafe-order-please",
        "s07-meet-merci",
        "s10-weave-merci-thanks",
        "s12-meet-un-the",
        "s11-weave-the-order",
        "s08-sayit-cafe-order",
        "s09-recap-survival-kit",
      ].join(","),
      "L0 duplicates removed; registered pilot ids unchanged and still before Say It",
    );
    assertEqual(
      qualifyLessonScreenId(lesson001.id, pm011Screen.id),
      "v1-lesson-001/s11-weave-the-order",
      "qualified identity as registered",
    );
  });
});
