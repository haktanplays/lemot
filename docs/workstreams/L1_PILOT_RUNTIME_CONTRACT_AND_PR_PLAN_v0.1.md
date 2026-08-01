---
title: Cairn L1 Pilot Runtime Contract and Atomic PR Plan
version: 0.1
status: Draft — vertical-slice implementation planning artifact
canon_status: non-canonical
implementation_status: not-started
owner: founder + engineering review
created: 2026-08-01
scope: minimum architecture-valid runtime contract + atomic PR sequence for the selected L1 pilot
parent_matrix: docs/workstreams/L1_SENTENCE_EXERCISE_EVIDENCE_PILOT_MATRIX_v0.1.md
related:
  - docs/workstreams/L1_SENTENCE_ECOSYSTEM_v0.1.md
  - docs/workstreams/L1_AUTHORING_CONTRACT_v0.1.md
  - docs/workstreams/EXERCISE_VARIATION_INVENTORY_v0.1.md
  - docs/syllabus/canonical-item-id-convention-v0.1.md
---

# Cairn L1 Pilot Runtime Contract and Atomic PR Plan v0.1

## 1. Status and authority boundary

**Purpose.** Resolve only the architecture contracts that block implementing the **29 selected
L1 pilot pairings**, and convert them into an ordered set of atomic implementation PRs. This is
the **final planning artifact before implementation PRs** — the next document produced in this
workstream should be a PR, not another plan.

This document:

- is **non-Canonical** and **overrides no governing document**;
- **authorizes no implementation by itself** — each PR still needs its own review;
- **creates no runtime IDs and no schemas** (no TypeScript is written here);
- records the **bounded runtime recommendation** for the selected L1 pilot only;
- **defers to** the Content Bible, Mastery & Evidence Bible, Curriculum Charter, Exercise Canon,
  PRJ-015, Lesson Flow Canon, and the Canonical Item ID Convention — where this document and any
  of those disagree, they win and this document must be revised;
- **does not make pending French surfaces learner-ready** — every L1 French surface remains
  pending human French QA, and no PR that ships French to a learner may merge before that gate;
- routes all 29 pairings but **implements far fewer in the first wave** (§12).

Labels: **[SOURCE]** cited fact · **[CURRENT REALITY]** verified implementation fact ·
**[REC]** recommendation · **[GAP]** missing capability · **[DECISION NEEDED]** open call.

### 1.1 Correction to the pilot matrix §21

**[CURRENT REALITY]** The pilot matrix §21 reported "no learning-event spine". Direct
inspection of `lemot-app/content/learning-engine/` shows that is **wrong as a blanket claim** and
is corrected here. A real spine exists and is tested: `events.ts` (`LearningEvent`, frozen
`ERROR_TAG_CODES`), `grade.ts` (deterministic grader), `mastery.ts` (pure idempotent reducer →
`MasterySnapshot`), `repository/local.ts` (`LocalRepository`, append-only, corruption-quarantining),
`mon-lexique.ts`, `practice-selector.ts`, `carryover-selector.ts`, `compaction.ts`,
`migrations.ts`, `privacy-local.ts`, `session-controller.ts`.

The accurate statement is narrower and still blocking: **the spine exists but is wired only into
the sandbox `LearnerRendererShell`, not the shipped `LessonRendererV1`, and its semantics cannot
yet express five things the pilot requires** — assistance state, attribution/admissibility,
supported-vs-independent production, non-assessed interactions, and sentence/audio identity (§2.5).

---

## 2. Executive recommendation

**2.1 Recommended minimum runtime spine — extend, do not replace.**
Keep `LearningEvent → LocalRepository → scoreEvent → MasterySnapshot → selectors` as the single
spine. It already satisfies four guardrails outright: one mastery projection, projection-not-primary
state, idempotency by `clientEventId`, local-first persistence. The pilot needs **semantic
extension in four bounded areas**, not a rewrite (§2.5).

**2.2 Recommended identity layers (four, no more).**
(1) canonical **item** identity — one registry; (2) **sentence** identity — new `sent:` layer per
the Canonical Item ID Convention §3/§4; (3) **authored payload** identity — the exercise instance;
(4) **audio** identity — `entityId → audioId`. Attempt/event IDs are runtime-generated and are not
an authoring identity layer.

**2.3 Minimum event categories — 6 semantic primitives**, not one per EV: `exposure`,
`selection`, `production`, `self_report`, `reveal`, `issue_report` (§6). Audio playback and
sequence-step completion ride as facets, not as new categories.

**2.4 Minimum renderer primitives for Wave A — R1 Choice + R2 Typed Production only.**
Both already exist in shipped v1 form (`FillWithTraps`, `Weave`). R3/R4/R5/R6 are Wave B/C/D.

**2.5 Extend-vs-replace, per area (no hidden debt).**

| Area | [CURRENT REALITY] | Verdict |
|---|---|---|
| Event envelope | `LearningEvent` requires `result: ErrorTagCode` and `operation: OperationId` (7 engine ops) | **Extend** — non-assessed interactions and audio/dictée/self-report have no representable shape today [GAP] |
| Assistance | `session-controller.ts` writes `promptLevel: "PF0"` **hardcoded**; no hint/replay/tray fields | **Extend** — this is the single most load-bearing gap |
| Attribution | none; every appended event scores | **Extend** — admissibility gate must precede `scoreEvent` |
| Supported production | `mastery.ts` `PRODUCTION_OPS` treats `fill/build/register_switch/context_chain` as production; supported and independent production are **indistinguishable** | **Extend** — assistance-scoped counters required |
| Item registry | **two** registries: `content/itemRegistry.ts` (**54** ids, hyphen `chunk-bonjour`) vs `content/learning-engine/items.ts` (**59** ids, colon `chunk:je-vais`), **zero shared ids** | **Extend — decided (D-2, PR-01).** `content/itemRegistry.ts` is canonical; its shipped ids are **immutable** (ADR-0012 / YASA 2). `learning-engine/items.ts` is **fixture input**, not a second canonical registry. Exact overlaps resolve through an explicit read-only compatibility boundary — **no rename, no colon migration** |
| Telemetry | a **second** event system: `TelemetryEvent` (15 types incl. `screen_seen`, `answer_compared`, `lexique_opened`) with its own store `lm_le_telemetry` | **Reconciled — decided (D-3, PR-02).** The learning spine owns every learning-relevant interaction; telemetry stays product-funnel/operational and never feeds mastery. Both systems remain, with one documented, test-pinned boundary and no double-write |
| Sentence identity | none in runtime; convention exists in docs only | **Add** |
| Audio identity | none; TTS-only via `useSpeech()` | **Add (Wave B)** |
| Legacy practice/SRS | `lm7_srs`, `data/flashcards.ts`, legacy practice tab | **Quarantine — never a target** |

**2.6 Deferred to later PRs:** R3/R4/R5/R6 renderers, Dictée, audio identity, flashcard
projections, Stats UI, the other 21 pairings, all of Wave D (§12, §19).

**2.7 Total proposed PRs: 12** (§17).

**2.8 Critical path:** ~~PR-01 identity~~ ✅ → ~~PR-02 envelope~~ ✅ → ~~PR-03 assistance+attribution~~ ✅ →
~~PR-04 mastery~~ ✅ → ~~PR-05 provider wiring~~ ✅ → ~~PR-06 renderer emission~~ ✅ → **the runtime-connected renderer
proof now exists** → ~~PR-08 Practice return~~ ✅ → **PR-09 Mon Lexique UI (next)** → PR-10 Stats projection →
PR-07 exact learner content (French QA deferred by founder waiver — see §22). PR-07 (payload registration) is the French-QA-gated branch that
must land before any learner sees the pilot.

**2.9 May proceed before French QA:** PR-01 through PR-06, PR-08, PR-09, PR-10, PR-12 —
all operate on types, logic, projections, and **fixture** French already shipped in L0/L1.
**Blocked by French QA:** PR-07 (registering the L1 pilot's authored seeds/payloads as
learner-visible content) and any Wave B audio recording.

---

## 3. Source-of-truth routing

Preserved chain: **canonical identities → authored sentence/payload → attempt events → mastery
projection → derived product surfaces.** No surface may skip a link.

| Concern | Governing source | Existing runtime source [CURRENT REALITY] | Proposed pilot owner [REC] | Must not become a second source |
|---|---|---|---|---|
| Canonical item identity | Canonical Item ID Convention; PRJ-015 | `content/itemRegistry.ts` **and** `learning-engine/items.ts` (split) | **one** merged registry (D-2) | the other registry; lesson payload inline strings; `data/dictionary.ts` |
| Sentence identity | Item ID Convention §3 (`sent:`) | none | new `sent:` layer, authored | lesson payload literals; audio manifest; flashcard decks |
| Lesson placement | Lesson Flow Canon; Acquisition Map | `content/lessons/v1/*.ts` | unchanged (v1 lesson files) | the pilot matrix document; Practice Hub |
| Pairing/payload identity | this doc §4.3 | none (`screen.id` only) | authored payload id, referencing a pairing | `L1-PM-###` used as a runtime id |
| Exercise variation | Exercise Variation Inventory | `OperationId` (7 ops) | EV id carried as a payload field | a per-EV event type |
| Attempt/event | Mastery & Evidence Bible | `LearningEvent` v2 + `LocalRepository` (PR-02) | **same, extended in place** | `TelemetryEvent` for any learning-relevant interaction (D-3, closed) |
| Assistance | Mastery Bible FQ-3 | `promptLevel` (hardcoded PF0) | assistance block on the event | renderer-local state that never reaches the event |
| Error attribution | Mastery Bible §7; Content Bible §14.6 | none | attribution block, resolved **before** scoring | grader output alone (`ErrorTagCode` ≠ error source) |
| Mastery projection | Mastery Bible | `mastery.ts` `scoreEvent` | **same, extended** | any surface computing its own mastery |
| Practice Hub selection | Exercise Canon; Charter | `practice-selector.ts`, `carryover-selector.ts` | same, fed by snapshot | a hub-owned curriculum or item list |
| Mon Lexique | Charter §4.5; chip-taxonomy | `mon-lexique.ts` (projection over registry+snapshot) | same, extended for supported path | a wordbook store; `data/dictionary.ts` |
| Flashcards | Inventory §11 (FD-4) | legacy `data/flashcards.ts` + `lm7_srs` (**quarantined**) | projection over items/sentences/snapshot | any revived legacy deck |
| Stats | Charter §6.3 | legacy counters; `telemetry.ts` aggregators | projection over admissible events | a stats-only counter store |
| Audio identity | Inventory §15; contract §14 | `useSpeech()` TTS only | `entityId → audioId` manifest | per-payload inline audio strings |

---

## 4. Identity contract

### 4.1 Canonical item identity

- **One canonical registry — decided (D-2, implemented in PR-01).** `content/itemRegistry.ts` is
  the canonical runtime item registry; its `ITEM_REGISTRY` / `ItemId` are authoritative.
  **Every shipped hyphen-style id is immutable forever** — no rename, no delete-and-recreate, no
  colon migration (**ADR-0012 / YASA 2**, canonical + LOCKED, enforced bidirectionally against
  `scripts/shipped-item-ids.json`). An earlier draft of this section recommended migrating the
  shipped registry to colon ids; that recommendation **conflicted with active Canonical authority
  and is withdrawn**.
- **`learning-engine/items.ts` is fixture input**, not the target registry and not a second
  canonical source. Exact semantic overlaps resolve through an **explicit, read-only compatibility
  boundary** (no separator conversion, no surface-text lookup, no chains); ambiguous granularity
  stays unmapped, and an unmapped fixture id **fails canonical persistence validation** rather than
  leaking into learner history.
- **The colon convention still applies to genuinely new identity layers** — notably `sent:`
  (§4.2) — because adding a new layer is not mutating a shipped id.
- **Parent/linked identities.** `chunk:` is the acquisition identity; `frame:`/`phen:`/`word:`
  are **linked**, counted once (PRJ-015 IC-003), never independent "learned" rows.
- **No duplicate registry.** `mergeItemMapsStrict` already hard-fails on duplicate ids
  [CURRENT REALITY] — keep that guarantee across the merge.
- **Four missing L1 identities** (authoring contract §3, all `PROPOSED — NOT REGISTERED`):
  `excusez-moi`, `je ne comprends pas`, `vous pouvez répéter ?`, `un thé`.
- **`thé` / `un thé` relationship**: the **package is primary** (IC-004) — `chunk:un-the` is the
  acquisition identity; `word:the` (or `noun:the`) is a **linked sub-identity**. The link must be
  recorded **at registration**, so the split-mastery hazard visible today in the café dual identity
  (`noun-cafe` / `chunk-un-cafe`) is not reproduced.
- **No whitespace-derived identities**, ever (Content Bible; contract §6).

### 4.2 Sentence identity — minimum properties

A future registered sentence needs (names illustrative, **no schema authored here**):

| Property | Purpose |
|---|---|
| stable sentence id | `sent:l01-…` lesson-prefixed (Convention §4); the join key for payloads, audio, flashcards |
| exact preferred French surface | the one canonical rendering (ecosystem §4 rule 5) |
| accepted alternatives | punctuation/accent/elision variants; **never** new sentence ids |
| treatment composition | per-span A/S/R/G, so the validator can prove no demand exceeds treatment |
| item references | the item ids the sentence contains, by span |
| source/provenance | shipped-payload / spec / legacy-adapted / newly authored |
| lesson eligibility | which lessons may use it (prerequisite safety) |
| audio relationship | `audioId` when one exists; null = TTS fallback |
| French-QA status | pending / approved / rejected — **gates learner exposure** |
| active/deprecated status | retirement without id reuse (022/029/032 precedent) |

**No final sentence IDs are assigned in this document.**

### 4.3 Exercise payload identity — five distinct things

| Layer | What it is | Stability |
|---|---|---|
| **exercise variation id** | `EV-###` — the pedagogical contract | inventory-stable |
| **authored payload id** | one concrete authored instance (prompt, options, target, traps) | content-stable; the thing a lesson/hub references |
| **source sentence/scene ids** | which `sent:`/scene the payload derives from | provenance |
| **runtime attempt id** | one learner attempt (`clientEventId` today) | per-attempt |
| **draft pairing id** | `L1-PM-###` — a **documentation** handle | doc-local |

**`L1-PM-###` must not become the runtime payload id automatically.** A payload may cite its
originating pairing as provenance metadata; the runtime id is minted at authoring time under the
registered convention.

### 4.4 Audio identity

| Property | Contract |
|---|---|
| stable audio id | one per recorded entity; referenced by items **and** sentences |
| entity reference | `entityId → audioId`; one clip serves every surface using that entity |
| voice / version | recorded voice + take version, so re-records are traceable |
| recording vs TTS | explicit `source: recorded \| tts-fallback`; **TTS is always fallback, never canon** |
| quality/approval status | unapproved audio may not back an assessed attempt (PM-018 gate) |
| transcript checksum | a mismatch between clip transcript and sentence surface **must fail loudly**, not silently mis-teach |
| slow mode | **playback-rate behavior on the single source clip**; no duplicate slow file by default (sound-teaching clips are the only approved exception class) |

---

## 5. Minimum attempt/event envelope

**[REC]** Extend `LearningEvent`; do not fork it. Fields below are semantic requirements, not
TypeScript.

**Required in all events**: event/attempt id (`clientEventId`, idempotency key) · timestamp ·
session id · lesson id · **placement/surface** [GAP] · **exercise variation (EV)** [GAP] ·
**payload id** [GAP] · target item ids · **curriculum treatment of each required target** [GAP] ·
**learner action type** (§6) · **evidence class** [GAP] · **assistance state** [GAP] ·
**attribution** [GAP] · **admissibility** [GAP] · content/app version · device info · sync state.

*Present today*: clientEventId, timestamp, sessionId, lessonId, exerciseId, operation, itemIds,
attemptNumber, contentVersion, appBuild, deviceInfo, sync.

**Required only for assessed attempts**: outcome (`result`) · error facets (`errorTags`) ·
response representation (`userAnswer` / selection) · expected + normalized answer ·
accepted-answer result · retry count · **evidence ceiling of the payload** [GAP].

**Required only for audio**: audio id + source (recorded/TTS) · replay count · slow-mode used ·
audio-quality/attribution flag [all GAP].

**Required only for sequences**: parent attempt id / sequence id + step index; sequence completion
is recorded **separately from** each step's target evidence [GAP].

**Optional diagnostic**: timing, screen order, prompt variant — **never** admissible as evidence.

**Hard rules.** `result` must become **optional** so exposure/self-report/reveal are representable
without faking a grade [GAP]. `operation: OperationId` must not remain the only action vocabulary —
it cannot express shadowing, dictée, audio recognition, self-report, or open production.
**No numeric weights are introduced** anywhere in the envelope.

---

## 6. Event taxonomy

Six semantic primitives, shared across the 19 selected EVs. Avoid one bespoke type per variation.

| Primitive | Covers | Assessed? | EVs sharing it |
|---|---|---|---|
| **exposure** | exposure viewed; audio played; interstitial/peek opened | no | EV-001, EV-004, all IS surfaces |
| **selection** | choice submitted; tile/board submitted | yes | EV-010, EV-011, EV-013, EV-003, EV-014, EV-031, EV-043 |
| **production** | typed response; open-production attempt; self-correction/revision | yes (open = attempt-only) | EV-030, EV-033, EV-040, EV-041, EV-042, EV-052, EV-062, EV-034 |
| **self_report** | self-graded knew/not-yet | no | EV-070 |
| **reveal** | answer/model revealed; Natural Reveal compared | no | IS-15, IS-16, IS-31, hint rung 3 |
| **issue_report** | learner reports bad audio/content | no | any surface |

Facets, not new categories: **audio playback** (replay/slow on any primitive), **sequence step**
(parent id + index, EV-063), **skip** (an outcome on `production`/`selection`, not a type).

**D-3 — DECIDED and implemented in PR-02.** `exposure` and `reveal` overlap the existing
`TelemetryEvent` types (`screen_seen`, `exposure_seen`, `answer_compared`, `lexique_opened`). The
**learning spine owns every learning-relevant interaction** — assessed selection and production,
open-production attempts, exposure that may affect review/projection logic, reveal, self-report,
and issue reports tied to an attempt. **Telemetry stays product-funnel and operational data**
(coarse screen/lesson flow, content-factory summaries, non-mastery diagnostics); the name overlap
is product counting, never learning evidence. Mastery, Practice Hub, Mon Lexique, Flashcards and
Stats read the learning spine only, and no surface double-writes an interaction to both. Recorded
in `telemetry.ts`'s header and pinned by tests.

---

## 7. Outcome and evidence contract

Four **separate** concepts; conflating any two is the primary failure mode this contract prevents.

- **Outcome** (what the answer was): correct · incorrect · acceptable variant · near miss ·
  completed-unassessed · skipped · abandoned · system failure · indeterminate.
  *Today's `ErrorTagCode` covers most of this but has no `completed_unassessed`,
  `abandoned`, `system_failure`, or `indeterminate`* [GAP].
- **Evidence class** (what kind of proof this could be): the matrix's approved classes —
  exposure · audio exposure · recognition · recall · controlled production · **supported
  production** · open-production attempt · comparison only · self-correction · self-report ·
  no mastery evidence.
- **Evidence ceiling** (the payload's strongest allowed claim): authored on the payload, immutable
  at runtime. A renderer may never exceed it.
- **Evidence observation** (what *this* attempt supports, after assistance and attribution):
  always ≤ ceiling.
- **Admissibility** (may this observation touch mastery/weakness at all): decided by §9 before
  `scoreEvent` runs.

**Explicitly prevented — each is a test in §16:** one correct result becoming mastery · one miss
becoming weakness (attribution first, then repetition) · reveal viewing becoming production ·
Shadowing becoming pronunciation evidence · self-report becoming assessed correctness · Ghost
omission becoming error.

---

## 8. Assistance contract

One common representation, recorded on **every** attempt (absence must be explicit, not implied).

| Assistance | Class |
|---|---|
| no assistance | baseline |
| visible tray / word bank | **constitutive** when the payload requires it; optional otherwise |
| supplied package (`un thé`) | **constitutive** |
| formula card / whole-formula prompt | **constitutive** |
| immediately-prior model | **constitutive** (a scaffold, not a hint) |
| hint rung (IS-29, 0-3) | **optional assistance** |
| replay / slow playback | **optional assistance** (audio); also an accessibility behavior |
| answer reveal | **post-attempt** — never scopes the current attempt; ends assessability |
| retry | optional assistance; retry index recorded |
| self-correction (confirm step) | optional; its own evidence class |
| skip | not assistance — an outcome |

**Distinctions that must survive into the data:** *constitutive support* (the payload is invalid
without it — Supported pairings) vs *optional assistance* (learner chose it) vs *post-attempt
reveal* (no scoping effect, blocks further credit) vs *system/accessibility behavior* (replay,
slow — **never** a negative signal).

**How assistance scopes evidence (FQ-3).** Constitutive support caps the observation at
**supported production**; optional assistance narrows the claim within the class but does not
change it; post-attempt reveal prevents the attempt from producing production evidence at all.

**Supported success must be stored as real evidence that is explicitly assistance-scoped — never
as independent production.** [GAP] Today `mastery.ts` has one `productionSuccess` counter and no
way to express this; §10 defines the minimum fix.

---

## 9. Attribution and admissibility contract

**Error sources:** learner · authored trap · UI/friction · content · validator · audio ·
network/system · indeterminate · no-error.

| Situation | Attribution | Admissibility |
|---|---|---|
| Clean attempt, support rendered, audio verified | learner (or no-error) | **admissible immediately** |
| Trap option selected | learner + authored trap | admissible, **narrow** (the authored confusion only) |
| Constitutive support failed to render | UI | **inadmissible** — quarantine; raise a UI defect |
| Audio unavailable/clipped/mismatched transcript | audio | **inadmissible** — quarantine; offer report + replay |
| Accepted answer rejected by the matcher | validator | **inadmissible** — quarantine; queue an accepted-alternative fix |
| Two defensible options / ambiguous distractor | content | **inadmissible** — raise a content-quality issue |
| Ghost not produced / offer not answered | **no-error** | never an event beyond exposure |
| Learner reports a problem | pending | quarantine until triaged |
| Cannot be determined | indeterminate | **inadmissible** — default to *not* blaming the learner |

**Rules.** Attribution is resolved **before** the mastery reducer sees the event — the reducer must
never be the place where blame is invented. An admissible observation may enter mastery; it may
enter **weakness selection only after repetition**, never from a single miss. Quarantined attempts
remain in the append-only log (so the projection stays rebuildable) but are skipped by the reducer.
A learner-visible **report-issue** path must exist on audio and content surfaces.

**No scoring weights or thresholds are introduced here.** [CURRENT REALITY] `WEAK_THRESHOLD = 3`
and `LEITNER_INTERVAL_DAYS` already exist in `mastery.ts`; this document neither ratifies nor
changes them.

---

## 10. Treatment-specific runtime rules

**Curriculum treatment is authored and must never be mutated by learner performance.** Treatment
lives on the payload/sentence; mastery lives in the snapshot. Two ledgers, one direction of flow.

| Treatment | May be demanded | Allowed evidence | Mon Lexique | Weakness | Practice Hub | Flashcards | Stats | Prohibited inference |
|---|---|---|---|---|---|---|---|---|
| **Active** | unscaffolded, from intent | controlled production, recall, recognition | yes, on qualifying production | yes, after attribution + repetition | yes | all directions | production/recall activity | mastery from one success |
| **Supported** | **only with named constitutive support** | **supported production** (assistance-scoped), recall | yes, via the supported path (CA-8) | yes, formula/item-scoped | yes, support re-supplied | never in unscaffolded recall directions | supported practice, shown with its support context | independent production; grammar knowledge from formula use |
| **Recognition** | recognize/discriminate/judge | recognition only | **never from recognition alone** | narrow (authored confusion) | as options/support only | context-bearing recognition only | recognition activity | ownership; broad failure from a register trap |
| **Ghost** | nothing (may see/hear) | exposure only | **never** | **never** — non-production is not a miss | never as a production source | audible context only | exposure count, never "learned" | promotion by exposure |
| **Model / reveal** | nothing | comparison only | never | never | reveal copy only | never a graded target | attempt/compare counts | viewing as mastery |
| **Meta / phenomenon** | tap/read | engagement/exposure | never | never | insight support | never | engagement only | insight viewed as learning |

---

## 11. Special interaction contracts

**Open production (EV-041/042).** An *attempt*, never deterministic correctness. No grading config
may exist on the payload (a validator ERROR if present). Structured `targetMove` detection is
permitted **only** under an authored, validated contract — absent that, nothing is detected.
Natural Reveal is comparison; the confirm step is self-correction. **No broad grammar mastery
claim, ever.** Divergence from the model is not a failure state.

**Tap-to-Reveal self-check (EV-070).** Reveal and self-report are two events; the reveal produces
no mastery. Self-report may drive **scheduling only** and is never assessed correctness. The legacy
`lm7_srs` store is **not** reused — scheduling reads the shared snapshot.

**Shadowing (EV-004).** Completion + audio exposure only. **No speech capture is required** and
none is added in this slice. **No pronunciation score, no praise implying correctness.**

**Audio Recognition (EV-014).** Recognition evidence. Replay and slow are neutral facts, never
negative signals. An audio-quality failure quarantines the attempt (§9) before any learner
attribution.

**Dictée (EV-034).** **Micro and Guided only at L1**; no Sentence mode, no Context mode. Accepted
answers run the layered normalization already present in `grade.ts` [CURRENT REALITY]:
`punctuation_only` and `accent_only` are **meaning-preserving precision signals**, never failure
(matching FQ-1 and the existing `PRECISION_TAGS` policy). Meaning-preserving spelling near misses
establish neither weakness nor full precision credit. Audio defect → attribution, not learner error.
Supported spans are **given, never demanded in writing** (PM-021).

**Stateful recovery sequence (EV-063).** Ordered child attempts under one sequence id. **Sequence
completion is separate evidence from each step's target evidence** — finishing the scene proves
nothing about the formulas. Support state persists across steps and is re-recorded per step.
**No timer, countdown, lives, or urgency framing** (FD-7).

---

## 12. Renderer and payload contract — waves

All 29 pairings are routed. **Wave A is deliberately 8 pairings, not 29.**

### Wave A — minimum connected pilot (8 pairings)

| Pairing | EV | Renderer | Payload fields needed | Event behavior | Dependencies |
|---|---|---|---|---|---|
| PM-001 | EV-001 | R2-adjacent meet card (shipped) | sentence ref, highlights, tts flag | `exposure`, no outcome | PR-02 |
| PM-002 | EV-010 | **R1** `FillWithTraps` (shipped) | frame, options, `trapReason`, answer | `selection`, recognition ceiling, trap attribution | PR-02, PR-03 |
| PM-004 | EV-013 | **R1** (fill-with-traps payload variant) | contrast pair, register trapReason | `selection`, **narrow** register evidence | PR-02, PR-03 |
| PM-007 | EV-040 | **R2** `Weave` (shipped) | intent, tray, accepted alternatives, hint ladder | `production`, controlled, **rung recorded** | PR-03 |
| PM-009 | EV-030 | **R2** typed (config of Weave, or minimal typed screen) | intent prompt, target, accepted variants | `production`, controlled → **Mon Lexique gate** | PR-03, PR-04 |
| PM-011 | EV-040 | **R2** + tray | **supplied package**, frame, hint ladder | `production`, **supported**, constitutive support recorded | PR-03, PR-04 |
| PM-014 | EV-041 | **R2** ungraded config (shipped) | intent only; **no grading config** | `production` attempt-only + `reveal` | PR-02 |
| PM-023 | EV-030 | **R2** typed (hub surface) | cloze frame, why-it-returned copy | `production` from a **hub placement** | PR-04, PR-08 |

Wave A proves: Active production · Supported production · Recognition/trap · open attempt + reveal ·
event emission · mastery · one Practice Hub return · Mon Lexique projection · Stats projection.
**Deferred configurations:** R2 revision/2-step configs, R3, R4, R5, R6, Dictée, audio identity.

### Wave B — audio and Dictée (7 pairings)

PM-003, PM-016, PM-017, **PM-018 (hard-gated on recorded contours)**, PM-019, PM-020, PM-021.
Adds: **R6** Audio Stem, replay/slow capture, audio-error attribution, audio identity manifest,
Micro + Guided Dictée normalization. Depends on Wave A + recorded-audio gate.

### Wave C — self-check and flashcard projections (4 pairings)

PM-026, PM-027, PM-029, **PM-028 (depends on Wave B audio identity)**.
Adds: **R5** Self-Check rebuilt as a projection; scenario-card direction; typed-card host proving
cross-surface evidence equivalence (PM-029). Depends on Wave A (+B for PM-028).

### Wave D — after the connected proof holds (10 pairings, no new architecture)

PM-005, PM-006, PM-008, PM-010, PM-012, PM-013, PM-015, PM-022, PM-024, PM-025.
These need renderer **configs and primitives** (R2 revision/2-step, R3 tiles/board, R4 sequence
wrapper, R1 span layout) but introduce **no new event, evidence, or identity semantics** — which is
exactly why they are not in the first wave. Each is a normal feature PR once the spine holds.

**Routing check: 8 + 7 + 4 + 10 = 29.** ✔

---

## 13. Minimum connected proof

The first runtime wave must demonstrate exactly this, end to end, with **6 pairings**:

1. **PM-009** — learner produces `Merci` unscaffolded (Active).
2. The attempt emits **one shared `LearningEvent`** through the session controller (never a
   renderer-local write).
3. **Attribution + admissibility** accept it (no UI/audio/validator/content defect).
4. **Mastery projection** updates deterministically; re-running the reducer over the log
   reproduces the snapshot.
5. **PM-023** — Practice Hub resurfaces the **same identity** from the snapshot, with
   why-it-returned copy, writing no hub-local state.
6. Qualifying production makes the item **eligible for Mon Lexique** via the existing
   `productionSuccess`/`isWeak` gate.
7. **Stats** reflects the same evidence, derived from the same admissible events.
8. **No separate feature store is written** — no `lm7_srs`, no flashcard deck, no stats counter.

Plus three controls that must **not** move mastery:
- **PM-011** (Supported, package supplied) — records **supported production, assistance-scoped**;
  must not increment independent-production standing.
- **PM-014** (open production) — attempt + reveal only; **no** mastery, **no** learner error.
- **PM-001** (exposure) — exposure only; no outcome, no error.

Recommended proof set: **PM-001, PM-009, PM-011, PM-014, PM-023** + **PM-002** (recognition
control: proves recognition alone never reaches Mon Lexique). Six pairings.

---

## 14. Persistence and migration boundary

- **Local-first, and it already is.** [CURRENT REALITY] `LocalRepository` appends to
  `lm_le_events` with a corruption-quarantine path (`CorruptEventLogError` preserves the raw blob).
  [REC] **Pilot events remain local-only.** No cloud scope in the first runtime wave.
- **Event versioning.** [CURRENT REALITY] `migrations.ts` (`readSchemaVersion`, registry),
  `MASTERY_SNAPSHOT_VERSION`, `COMPACTION_SNAPSHOT_VERSION`, `TELEMETRY_SCHEMA_VERSION` exist.
  Extending the envelope (§5) **requires a version bump plus a migration**, not a silent shape
  change — old events must remain readable or be explicitly migrated.
- **Rebuildability.** Mastery is a projection; `scoreEvents` over the log must reproduce the
  snapshot. Quarantined events stay in the log and are skipped by the reducer — so admissibility
  changes are replayable rather than destructive.
- **Compaction.** [CURRENT REALITY] `COMPACTION_EVENT_THRESHOLD = 1000` with snapshot/restore.
  Compaction must preserve enough to keep the proof in §13 reproducible.
- **Existing progress compatibility.** The shipped v1 lesson progress (`useLessonProgress`,
  `{p, err, dr}` storage) is **separate** from the event log; the pilot must not break it and must
  not treat it as evidence.
- **Legacy stores.** `lm7_srs` / `data/flashcards.ts` / legacy practice: **read never, write never**
  — quarantined, not migrated. If any historical value is ever wanted, it is a separate,
  explicitly-reviewed import, not an architecture dependency.
- **Deletion/export.** [CURRENT REALITY] `privacy-local.ts` / `privacy-data.ts` /
  `local-privacy-inventory.ts` exist. New event fields (especially raw learner text and any audio
  metadata) **must be added to the privacy inventory in the same PR that adds them**.
- **Test reset.** A deterministic reset path must clear events + snapshot together; the existing
  privacy reset epoch (`privacyResetEpoch.ts`) is the precedent.
- **Future sync path preserved, not built.** `sync: {status, origin, queuedAt}` and `getPending`/
  `markSynced` already exist on the interface — leave them intact and unused.

---

## 15. Validation and invariants

| Invariant | Class |
|---|---|
| Every payload item/sentence/audio reference resolves to a registered identity | **build-time validator** |
| No required target exceeds its authored treatment (no unscaffolded Supported, no Ghost demand) | **build-time validator** |
| Every Supported payload declares **named constitutive support** | **build-time validator** |
| Ghost never appears as a correct answer, required output, or in `piecesUsed` | **build-time validator** (extends existing V3-class checks) |
| Evidence observation ≤ payload evidence ceiling | **runtime assertion** |
| Attribution resolved before the reducer; inadmissible events never scored | **runtime assertion** + test invariant |
| Sentence/payload provenance present (source + French-QA status) | **build-time validator** + **content QA gate** |
| Accepted alternatives collapse to one sentence identity; **no duplicate sentence identity** | **build-time validator** |
| Audio transcript matches the sentence surface (checksum) | **build-time validator** (fail loudly) |
| Event schema version present and migratable | **runtime assertion** + test invariant |
| **Renderer never writes Mon Lexique / Stats / Flashcards / Practice Hub directly** | **test invariant** (import-boundary / call-graph guard) |
| **No legacy store write** (`lm7_srs`, flashcard deck) | **test invariant** (guard test, cf. existing `noSupabaseAuthGuard.test.ts` pattern) |
| Open-production payloads carry no grading config | **build-time validator** |
| French-QA status `approved` before a surface reaches a learner | **content QA gate** |

---

## 16. Test strategy

| Layer | Covers | Matrix acceptance tests |
|---|---|---|
| Pure event construction | envelope completeness, version stamping, no `Date.now()` in pure code | T-01, T-03 (shape) |
| Attribution/admissibility | each error source → admissible/quarantined | T-05, T-11, T-14 |
| Mastery projection | idempotency, rebuildability, one-miss-≠-weakness | T-01, T-02, T-12, T-19 |
| **Supported evidence** | supported success ≠ independent production; assistance recorded | **T-03, T-04, T-18** |
| Renderer contract | payload → event mapping; ceiling never exceeded; no direct surface writes | T-06, T-07, T-08, T-16 |
| Integration | lesson path → event → snapshot → selector | T-01 + T-17 |
| Persistence/rebuild | append, replay, compaction, corruption recovery, reset | rebuild of T-01/T-03 chain |
| Cross-surface projection | Mon Lexique / Hub / Stats read the same evidence | T-16, T-17, T-19 |
| Failure injection | missing support, bad audio, validator false rejection, corrupt log | T-05, T-11, T-14 |
| Android smoke | the §13 proof on a device, offline | end-to-end |

Existing harness [CURRENT REALITY]: `lemot-app/scripts/tests/*.test.ts` with `run.ts`/`harness.ts`
— extend it; do not introduce a second test framework. No code is written in this document.

---

## 17. Atomic PR plan

Twelve PRs. Every PR is independently reviewable, independently revertable, and leaves the app in a
shippable state. **None of PR-01…PR-06 changes learner-visible behavior.**

**PR-01 — Canonical item boundary + sentence identity foundation.** ✅ *implemented*
*Objective:* establish one authoritative runtime item-identity boundary, safe handling of the
non-canonical fixture ids, and the `sent:` identity layer as types + a registration path.
*Scope:* affirm `content/itemRegistry.ts` as canonical **without touching a single shipped id**
(ADR-0012); add read-only canonical accessors; add an explicit fixture→canonical compatibility
resolver for the exact L1 overlaps only; add a canonical-persistence guard; add sentence identity
types, validation, and a deterministic registry builder that ships **empty**.
*Files:* new `content/identity/*`, focused tests, test-runner registration. **`itemRegistry.ts`,
`learning-engine/items.ts`, and `shipped-item-ids.json` are read but NOT modified.**
*Depends:* none. *Excludes:* any shipped-id rename or colon migration; registering the four L1
identities' French surfaces; any sentence record or payload authoring; audio; event wiring.
*Acceptance:* every shipped id present and unchanged; manifest↔registry bidirectional check green;
fixture ids unpersistable unless explicitly aliased; ambiguous granularity unmapped; sentence layer
validated by test-local fixtures. *Tests:* canonical invariants, fixture compatibility, sentence
identity. *Rollback:* pure — additive files, no data written, no shipped id touched.
*French QA:* **no**. *Learner-visible:* **no**.

**PR-02 — Shared learning-event envelope v2 + safe migration.** ✅ *implemented*
*Objective:* extend `LearningEvent` in place (D-1) so the log can honestly represent assessed
selection/production, ungraded open production, exposure, reveal, self-report and issue reports.
*Design:* ONE spine, two arms — a discriminated union on `assessed`. The assessed arm carries
`result` / `errorTags` / `normalizedAnswer`; the non-assessed arm has **nowhere to put a fabricated
grade**. Six semantic primitives (`exposure` · `selection` · `production` · `self_report` ·
`reveal` · `issue_report`) — never one type per EV; audio playback and sequence membership are
facets, skip is an outcome. New dimensions: `schemaVersion`, `placement`, `evId`, `payloadId`,
`sentenceId`, per-target `targetTreatments` (index-aligned with `itemIds`, length-validated so a
mixed-treatment payload can never be flattened), `evidenceCeiling` + `evidenceClass`, a
`LearningOutcome` vocabulary distinct from the frozen `ErrorTagCode`, optional `sequence`, and
neutral `assistance` / `attribution` / `admissibility` seams. **Corrected by PR-03:** those scalar
seams reserved the right locations but could not represent attempt-level reality (assistance is
multidimensional), so PR-03 replaced them with structured state and bumped the envelope to v3.
The seam idea saved a location, not a migration. `createLearningEvent` is the one **live** construction boundary (no clock, no id generation,
frozen output); it rejects a missing grade, a smuggled grade, and any outcome that contradicts its
grading result — and, since the PR-03 correction, also refuses the migration-only states
(`legacy_admitted`, `legacyGrading`) that historical rehydration alone may produce through
`createMigratedLearningEvent`.
*Migration:* first real event-log migration (YASA 1), on a **dedicated** registry so the shipped
`defaultMigrationRegistry` stays empty for telemetry/compaction. Absent `schemaVersion` ⇒ v1
(ADR-0014). Every v1 fact is preserved byte-for-byte; every unknowable fact becomes
`legacy_unknown` / `unresolved` — an EV id, sentence identity, placement, treatment, or Supported
claim is **never** fabricated. Reads migrate in memory and never rewrite storage; the first
legitimate append normalizes the log to all-v2. A future version or malformed event makes the log
`unsupported` and fail-closed via a distinct `UnsupportedEventLogError`, with the bytes preserved
and JSON-corruption quarantine unchanged.
*Reveal correction:* `recordRecognitionReveal` no longer stores `result: "correct"` for an
interaction that was never graded; it emits a genuine non-assessed reveal. Migrated legacy reveals
are reclassified the same way, with their original grading preserved verbatim under `legacyGrading`
for recovery. **This intentionally changes historical mastery for those events** — that is the
point of the correction, and it is recorded rather than hidden.
*Mastery:* the ONLY change is a narrow non-assessed no-op — no item row, no counter, no weak tag,
no Leitner/prompt-fade step, neither success nor failure. Decided idempotency policy: the event IS
recorded in `processedClientEventIds` and may advance `updatedAt`, so replay is stable and the
append-only log stays authoritative.
*Files:* `events.ts`, new `event-envelope.ts` + `event-migration.ts`, `repository/local.ts`,
`session-controller.ts`, narrow guard in `mastery.ts`, telemetry header note, tests.
*Excludes:* renderer emission, assistance capture, attribution resolution, Supported counters,
projections. *Tests:* 60 new (envelope, migration, repository, non-assessed safety, D-3 boundary).
*French QA:* no. *Learner-visible:* no.

**PR-03 — Attempt-level assistance, attribution and admissibility (schema v3).** ✅ *implemented*
*Objective:* replace the neutral v2 seams with real attempt-level evidence context.
*Design:* **structured, not scalar.** `AssistanceSnapshot` is a discriminated union —
`known` carries constitutive support (visible tray · supplied package · formula card ·
immediately-prior model), hint rung 0/1/2, zero-based retry index, self-correction, prior
answer/model exposure and accessibility (replay count, slow playback); `unknown` /
`legacy_unknown` carry no fabricated detail. `AttributionState` resolves to exactly the
**Canonical eight** sources (learner · content · validator · ui_flow · tone · ai_generator ·
system · mastery_mapping) — audio/network/storage are `system` FACETS, never new top-level
sources. `AdmissibilityState` is `admitted` · `quarantined` · `unresolved` · `no_evidence` ·
`legacy_admitted`, each with machine reason codes and no free-form text.
*Scoping (FQ-3):* a pure `resolveEvidenceAdmission()` turns ceiling + treatments + assistance +
opportunity into the final evidence class. Independent production survives only on a clean,
known, first-pass, unassisted, non-Supported, admitted attempt; Supported treatment,
constitutive support, any hint, any retry, prior exposure, or unknown capture all cap to
`supported_production`; self-correction is its own class; recognition and open attempts are
never reclassified; accessibility never downgrades anything. A non-admitted event carries
`no_mastery_evidence` **however correct it looked** (Bible §6 — correctness is not
admissibility). A non-numeric ceiling map bounds every observation.
*Migration:* the chain is now **v1 → v2 → v3** on the dedicated registry, with a version-specific
v2 validator so old JSON is never cast straight to v3. Legacy history keeps `legacy_admitted`
carrying the version it was **persisted** as — `sourceVersion: 1` for pre-v2 rows, `2` for native
v2 rows, taken from the version detected at the migration entry boundary rather than from the rung
the record happens to be on — and gets `legacy_unknown` assistance; its production observations are capped
to supported, recognition stays recognition, and non-assessed events become
`not_applicable` / `no_evidence`. Nothing is fabricated or discarded.
*Controller:* `promptLevel: "PF0"` and the blanket `legacy_unknown` treatment stamp are **gone**
from the framework-agnostic controller (pinned by a source-level test). It now requires an
explicit `AttemptEvidenceContext`; the fixture hook supplies PF0 + known-no-assistance because
that is what the sandbox actually is, and reads target treatments from the validated
`LessonContract`. PR-05/PR-06 must supply their own real context.
*Mastery:* one narrow gate — a quarantined / unresolved / no-evidence assessed event is an
item-level no-op (processed for idempotency, may advance `updatedAt`, moves nothing else).
*Files:* new `evidence-context.ts`, `evidence-admission.ts`, `treatment-resolver.ts`; `events.ts`,
`event-envelope.ts`, `event-migration.ts`, `session-controller.ts`, narrow gate in `mastery.ts`,
`useLearningEngineSession.ts`, one-line contract pass-through in `LearnerRendererShell.tsx`, tests.
*Excludes:* Supported-vs-independent mastery counters, snapshot changes, projections, renderers.
*Tests:* 59 new (944 total). *French QA:* no. *Learner-visible:* **no**.

**PR-04 — Scoped production evidence in the mastery projection. IMPLEMENTED** on
`feat/l1-pilot-mastery-scopes`.
*Delivered:* **D-8 closed as separate scoped counters** — `production.{independent, supported,
selfCorrection}`, each an `{attempts, success, failure}` tally, all always present and starting at
zero. The pre-existing `productionAttempts/Success/Failure` are retained as compatibility totals and
are now **re-derived** from the channels on every write (`aggregateProduction`), so they can never
drift and are no longer the semantic answer to independence, ownership or scope.
*Routing:* the event's assistance-scoped `evidenceClass` is the sole authority —
`recall`/`controlled_production` → independent, `supported_production` → supported,
`self_correction` → self-correction, `recognition` → recognition, everything else a complete
item-level no-op (defense in depth over the PR-03 admission gate). **The operation-based
`PRODUCTION_OPS` classification is retired**: a `build` whose event says `recognition` is now counted
as recognition evidence.
*Claim:* `deriveProductionClaim` is a pure selector (never a stored label) —
independent > supported > none. **Self-correction alone establishes no ownership and no
independence.** Mon Lexique adds on an independent **or** Supported success; Practice Stretch on the
same, with self-correction-only landing in Build. `MonLexiqueEntry.productionClaim` exposes the
coarse claim only — no counters, no assistance history, no learner copy (PR-09 owns wording).
*Versions:* `mastery-v0.2 → v0.3` and `compaction-v0.1 → v0.2`; both fail closed on an older or
unknown version (`UnsupportedMasterySnapshotVersionError`), including a v0.2 mastery projection
inside a correctly-versioned compaction wrapper. **No scoped counter is ever fabricated from a v0.2
aggregate** — recovery is replay from the retained event log, which v0 compaction still never deletes.
*Not delivered, deliberately:* **no differential numeric scheduling.** An admitted Supported success
still advances the Leitner box and prompt-fade exactly like an independent one, because no founder
rule states a half-step, multiplier, smaller interval or separate threshold (FQ-2 rule 7, FQ-7 /
I-37). That is retained **current Axis-B mechanical behaviour, not evidence that the two are
semantically equivalent** — the scoped counters exist precisely so a later ratified rule has real
data to act on. `WEAK_THRESHOLD`, `LEITNER_INTERVAL_DAYS` and the PF range are untouched.
*Files:* `learning-engine/mastery.ts`, `mon-lexique.ts`, `compaction.ts` + tests.
*Tests:* 91 new (1065 total). *French QA:* no. *Learner-visible:* **no** (until PR-09 surfaces it).

**PR-05 — Learning runtime provider and shipped lesson-path wiring. IMPLEMENTED** on
`feat/l1-pilot-provider-wiring`.
*Delivered:* a two-level runtime. `providers/LearningEngineProvider` is the app-level owner —
**one `LocalRepository` per privacy-reset epoch** — and exposes only a runtime whose single method
returns a controller; the repository, `appendEvent`, `writeSnapshot`, the KV layer and every storage
key are unreachable from UI. `content/learning-engine/runtime.ts` is the framework-free factory
(no React/RN/Expo/cloud/AI); constructing a runtime or a controller performs **zero repository
calls** and reads no clock. Metadata (`appBuild` from the Expo app version, `deviceInfo` =
platform / OS version / Expo runtime) flows from the provider to every event; session ids come from
an injectable factory, are distinct per controller and are never the lesson id.
*Reset safety:* the owner subscribes to `subscribePrivacyReset` and rebuilds repository + runtime on
each reset, advancing a `generation`. The pre-reset repository stays permanently write-suppressed by
the existing stale-writer barrier (never re-acknowledged, never paired with a new controller), and
genuinely new post-reset activity writes **without an app restart** — the gap a single long-lived
repository would have left. Consumers re-key their controller on `generation`, and a late callback
from an obsolete controller cannot overwrite the new session's state.
*Surface resolvers:* the controller's hardcoded `placement: "engine_fixture_sandbox"` is **removed**;
`resolveEventSurface` is now a REQUIRED option with no default, used by both the assessed and the
non-assessed build path. The sandbox hook declares `engine_fixture_sandbox`; the new
`LessonV1LearningSessionProvider` declares `lesson_path`. Both use `payloadId = exercise.id` and keep
`evId` / `sentenceId` / `sequence` **null** — no EV or sentence identity is registered yet (PR-07,
French-QA-gated), and no planning id was minted into a runtime id.
*Emission:* **none.** No screen received a learning callback, no screen file changed, the seven-screen
dispatch is untouched, and the legacy `mk()` completion marker remains exactly once with its existing
separate meaning — it records that the flow finished and is **not** learning evidence.
*Privacy:* no new storage key; the existing inventory already owns `lm_le_events` / `lm_le_snapshot` /
`lm_le_telemetry` and their corrupt backups, so it needed no edit.
*Files:* `content/learning-engine/runtime.ts` (new), `session-controller.ts`,
`providers/LearningEngineProvider.tsx` (new), `app/_layout.tsx`,
`components/learning-engine/useLearningEngineSession.ts`,
`components/lesson-v1/LessonV1LearningSessionProvider.tsx` (new), `LessonRendererV1.tsx` + tests.
*Tests:* 49 new (1114 total). The runtime factory, reset-generation owner and resolver contract are
tested behaviourally against a call-counting fake repository; the React providers are verified at the
**source level only** — this repo ships no component test renderer and PR-05 did not add one.
*French QA:* no. *Learner-visible:* **no**.

**PR-06 — Wave A renderer/event integration (R1 + R2). IMPLEMENTED** on
`feat/l1-pilot-wave-a-emission`.
*Delivered:* the four Wave A screen primitives now report learner interactions through the
lesson-local session. **D-6 closed: typed recall is a Weave CONFIGURATION** (no tray, no cloze, no
constitutive support, intent prompt, expected + accepted variants, controlled-production ceiling) —
no `TypedRecallScreen` or equivalent was created.
*Narrow session API:* the provider no longer exposes the controller. Descendants get
`recordMeetExposure` · `recordChoiceAttempt` · `recordTypedAttempt` · `recordOpenAttemptAndReveal`
plus `state`. Screens report SURFACE FACTS only (option id, typed text, hint rung, play count) and
can name no evidence class, attribution or admissibility. All translation lives in the pure
`content/lesson-v1-evidence/` layer.
*Identity:* `qualifyLessonScreenId(lessonId, screenId)` → `lessonId/screenId` is the exercise id and
therefore `payloadId`. Bare screen ids genuinely repeat across v1 lessons; the qualified form is
validated unique across the whole registry. `evId` / `sentenceId` / `sequence` stay null.
*Targeting:* new machine-only `evidenceTargetItemIds` narrows which targets receive evidence, checked
canonical + subset + duplicate-free. Applied to the two demonstrated cases: L0
`s03-fill-je-voudrais-blank` scopes to `noun-cafe` (the frame is printed, not chosen), and L1
`s03-fill-polite-verb`'s `je veux` option carries `learningErrorTag: "wrong_register"` — a
learner-attributed, admitted register miss, **not** a ninth "authored trap" attribution source.
*Emission timing:* Meet on **Continue** (not mount, double-tap guarded) · choice on **selection**
(once; Continue adds nothing) · Weave on **Check** (one event; Continue adds nothing) · open
production on **Keep and compare** only, emitting attempt **then** reveal in that order. Check→confirm,
Try again, text edits and Continue emit nothing.
*Assistance:* real capture — hint rung 0/1/2 as actually reached, and `supportRole: "constitutive"`
pieces (visible from first render, never behind "Need a hint?") producing `supplied_package`. A
`weaveType: "supported"` label, `required: true`, or an unused tray do **not** create Supported
evidence. A declared-but-unrendered package quarantines as a `ui_flow` defect.
*Grading:* ONE shared deterministic evaluation drives both the Weave note and the event, so the
learner and the log can never disagree; AI may explain afterwards and never becomes a grade.
*Controller:* three narrow non-assessed methods added — `recordExposure`,
`recordOpenProductionAttempt`, `recordComparisonReveal`. `open_production` joined the blueprint union.
*Not delivered, deliberately:* **the exact PM-009 (`Merci`) and PM-011 (`un thé`) learner payloads are
NOT registered.** Both are proven as renderer CAPABILITIES with synthetic fixtures built from
already-shipped French and existing canonical ids. No item identity, sentence record or EV id was
registered — that is PR-07, gated on human French QA.
*Files:* `content/lesson-v1-evidence/*` (new), `session-controller.ts`, `types.ts`, `lessonTypes.ts`,
the four Wave A screens, `LessonRendererV1.tsx`, `LessonV1LearningSessionProvider.tsx`,
`scripts/lessonEvidenceRules.ts` (new) + validator wiring, two lesson-data corrections, tests.
*Tests:* 67 new (1181 total). Adapters, evaluation, controller, repository, mastery and Mon Lexique
are tested **behaviourally**; the React callback wiring is verified at the **source level only** —
this repo ships no component test renderer and PR-06 did not add one.
*French QA:* no (uses **already-shipped** L0/L1 French). *Learner-visible:* **no new copy**; the
constitutive-support render path exists but no shipped payload activates it.

**PR-07 — L1 pilot payload registration. 🔒 FRENCH-QA GATED.**
*Objective:* register the four missing item identities (with the `un thé` primary↔linked link) and
the approved pilot sentences/payloads. *Files:* registries, sentence registry, L1 content.
*Depends:* PR-01, PR-06; **human French QA sign-off on the ecosystem §20 surface**. *Excludes:*
the full L1 pool; Wave D payloads; unapproved surfaces. *Acceptance:* every registered surface
carries `frenchQa: approved`; validators pass; no unapproved French reachable by a learner.
*Tests:* provenance/QA-status invariants; treatment-eligibility validator. *Rollback:* content-only
revert. *French QA:* **YES — blocking**. *Learner-visible:* **yes**.

**PR-08 — Practice Hub selector integration (the return leg). IMPLEMENTED** on
`feat/l1-pilot-practice-hub-return`.
*Delivered:* the runtime gained ONE read-side projection — `readMasterySnapshot()` reads the full
log through the validated repository path and folds with `scoreEvents`; no write, no cached
snapshot, no raw repository or event array exposed, and runtime/controller construction still reads
nothing. A new pure Hub layer (`content/lesson-v1-evidence/practiceHub.ts`) projects the snapshot
through the existing Practice Pool semantics, then the EXISTING `selectTodaysSet`
priority/diversity/5–8 budget rules — no parallel scheduler. Return reasons derive only from the
reducer-owned path (build → `keep_building` · stretch → `ready_to_stretch` · challenge →
`needs_another_look`); `isDue` is a separate fact; weak tags and counters are consumed internally
and never appear on the output type. Each entry resolves to an already-authored Wave A screen
(fill-with-traps / weave) BY REFERENCE via evidence-target matching — nothing synthesized, and the
resolver refuses every unsafe upgrade: undeclared/ghost targets, recognition-treated items on
production screens, Supported items on weaves that do not supply the piece. Items with no safe
source are excluded, never displayed broken. A new route (`app/practice-hub.tsx`, outside the
legacy tabs) plus one reuse surface render the original screen with UI-fact callbacks; attempts go
through a controller with `placement: "practice_hub"` while the qualified payload id, lesson
id/version and canonical item identity remain the ORIGINAL authored ones — so the same mastery row
accumulates. The Hub owns no state: every view derives from the latest read, and completing a card
recomputes the set from the shared log. Entry point: one navigation-only link on the lesson
completion view; opening/closing/navigating emits nothing.
*Boundary corrections to this file's earlier wording:* the old card listed `carryover-selector.ts`
in the files — that was wrong. Carryover is a LESSON projection (old material inside a lesson under
target-load budgets); the Hub is a snapshot projection. **The carryover selector was not touched**
and is not part of the Hub.
*Legacy quarantine:* `app/(tabs)/practice.tsx` (useSRS / legacy scenarios / flashcards) is
unmodified, gains no new-engine import, and `FEATURES.practice` is unchanged.
*Tests:* 36 new (1217 total); the PM-023 return-leg proof runs lesson-event → snapshot → hub set →
reused authored screen → `practice_hub` event → same item row accumulating, on one shared
in-memory repository, with no second identity and no second store.
*PM-023 content status:* this is the CONNECTED CAPABILITY. The exact final PM-023 learner payload
still depends on PR-07 payload registration and is **not** claimed here.
*French QA:* none needed — PR-08 adds no French. *Learner-visible:* yes (calm English only).

**PR-09 — Mon Lexique projection (supported path).**
*Objective:* surface supported-path visibility (CA-8) with calm status copy and assistance context.
*Files:* `mon-lexique.ts`, Mon Lexique components. *Depends:* PR-04. *Excludes:* Word Graph,
Le Carnet, learner-authored examples UI. *Acceptance:* recognition alone never adds; ghost never
adds; `je veux` never appears; supported entries show their support context. *Tests:* **T-16**,
Mon Lexique eligibility matrix. *Rollback:* projection revert. *French QA:* no. *Learner-visible:* yes.

**PR-10 — Stats projection + telemetry routing decision (D-3).**
*Objective:* learner-safe Stats derived from admissible events; fix the two-event-system boundary.
*Files:* `telemetry.ts` boundary, new stats projection. *Depends:* PR-04. *Excludes:* Stats UI
polish; a generic analytics layer; any numeric mastery weight. *Acceptance:* Stats reads the
learning spine, not the telemetry store; the §17-excluded inferences are absent. *Tests:* **T-19**
non-inference tests. *Rollback:* projection revert. *French QA:* no. *Learner-visible:* yes.

**PR-11 — Wave B: audio identity, replay/slow capture, Micro + Guided Dictée. 🔒 AUDIO-GATED.**
*Objective:* `entityId → audioId` manifest, R6 Audio Stem, audio-error attribution, Dictée
normalization for PM-019/020/021 (+ PM-003, PM-016, PM-017; **PM-018 stays gated** until recorded
contours exist). *Files:* audio manifest, `useSpeech.ts` boundary, dictée module, audio components.
*Depends:* PR-06; recorded-audio availability for anything beyond TTS fallback. *Excludes:*
pronunciation scoring, speech capture, Sentence/Context Dictée, PM-018 activation.
*Acceptance:* transcript-checksum mismatch fails loudly; bad audio is never learner error; slow is
playback-rate on one clip; shadowing produces no pronunciation evidence. *Tests:* **T-09, T-10,
T-11, T-12, T-13**. *Rollback:* wave revert. *French QA:* yes for any new recorded surface.
*Learner-visible:* yes.

**PR-12 — L1 connected accumulation and failure smoke.**
*Objective:* run the §13 proof end to end, plus failure injection, plus Android smoke.
*Files:* tests + smoke script only. *Depends:* PR-06 (proof), PR-08/09/10 (full chain).
*Excludes:* any production-code change — if the smoke finds a defect, it is fixed in its own PR.
*Acceptance:* the six proof pairings pass; controls (PM-014/PM-001/PM-002) move no mastery; replay
reproduces the snapshot; offline works. *Tests:* the whole §16 matrix. *Rollback:* tests only.
*French QA:* no. *Learner-visible:* no.

---

## 18. Critical-path graph

```
PR-01 identity ─► PR-02 envelope ─► PR-03 assistance+attribution ─► PR-04 mastery
                                                                      │
                                                    ┌─────────────────┼─────────────────┐
                                                    ▼                 ▼                 ▼
                                              PR-05 wiring      PR-08 hub        PR-09 lexique
                                                    │                 │           PR-10 stats
                                                    ▼                 │                 │
                                              PR-06 renderers ◄───────┴─────────────────┘
                                                    │
                        ┌───────────────────────────┼───────────────────────────┐
                        ▼                           ▼                           ▼
              🔒 PR-07 payloads          PR-11 audio/Dictée 🔒          PR-12 connected smoke
                (FRENCH-QA GATE)          (AUDIO-RECORDING GATE)
```

- **Hard dependencies:** PR-01→02→03→04 is strictly serial (each changes the shape the next
  consumes). PR-06 requires PR-05.
- **Parallelizable:** PR-08, PR-09, PR-10 after PR-04 (three independent projections, three owners).
  Test authoring for §16 can start at PR-02.
- **French-QA gate:** blocks **only** PR-07 (and new recorded surfaces in PR-11). Everything else
  runs on already-shipped L0/L1 French.
- **Audio-recording gate:** blocks PR-11's recorded surfaces; PM-018 stays inactive until deliberate
  contour recordings pass QA. TTS-fallback rows may proceed flagged.
- **UI work may begin** at PR-06 (Wave A screens are already shipped components; work is payload +
  emission + assistance affordances).
- **Android smoke becomes meaningful** at PR-06 — the earliest point the loop is observable on a
  device — and becomes *complete* at PR-12.
- **Earliest connected proof:** immediately after **PR-06**, using already-shipped L0/L1 French, with
  PR-08/09/10 completing the cross-surface half.

---

## 19. Deferred work register

| Deferred | Why it does not compromise the first connected proof |
|---|---|
| Full 29-pairing implementation | Wave A's 8 cover every distinct architecture contract; the other 21 add pedagogy volume, not new semantics |
| Complete L1 exercise volume | volume is a content problem; the proof is an architecture problem |
| L2-L10 payloads | later lessons reuse the same spine; nothing about them changes it |
| Final Content Factory | derivation contract exists on paper; generation without a proven spine would generate into a vacuum |
| Full Flashcard product | Wave C proves the projection direction; the product is UI breadth |
| Full Stats product | PR-10 proves derivation from shared evidence; the rest is presentation |
| Recorded-audio completion | TTS fallback carries Wave A; only PM-018 genuinely requires recordings |
| V4-B polish | visual system is deliberately deferred canon-wide; unrelated to evidence semantics |
| Le Carnet, Word Graph, AI features | out of slice by FD-1 / post-beta / Charter |
| Cloud sync | local-first is the slice default; the sync seam is preserved untouched |
| Broader legacy migration | legacy stores are quarantined, not dependencies |

---

## 20. Genuine decisions and blockers

| ID | Class | Decision needed | Blocks |
|---|---|---|---|
| **D-1** | architecture | ~~Extend `LearningEvent` in place vs a parallel envelope~~ — **DECIDED and implemented in PR-02**: extended in place as a discriminated union on `assessed`. One spine, one repository, one mastery projection; no `AttemptEvent` / `PilotEvent` / second log exists | ~~PR-02~~ closed |
| **D-2** | identity registration | ~~Which item registry becomes canonical, and the rename map~~ — **DECIDED and implemented in PR-01**: `content/itemRegistry.ts` is canonical, shipped hyphen ids are immutable (ADR-0012), `learning-engine/items.ts` is fixture input resolved through an explicit compatibility boundary. **No rename, no colon migration.** The earlier colon-migration recommendation is withdrawn as conflicting with Canonical authority | ~~PR-01~~ closed |
| **D-3** | architecture | ~~`TelemetryEvent` vs `LearningEvent` ownership of exposure/reveal~~ — **DECIDED in PR-02** (§6): the learning spine owns every learning-relevant interaction; telemetry stays product-funnel/operational; no double-write. PR-10 still has to make Stats read the spine | closed; PR-10 consumes it |
| **D-4** | identity registration | Sentence-id prefixing (`sent:l01-…` recommended) and whether accepted alternatives live on the sentence or the payload | PR-01, PR-07 |
| **D-5** | French QA | Sign-off on the ecosystem §20 review surface (8 concentrated questions) | PR-07 |
| **D-6** | implementation calibration | **CLOSED (PR-06) — Weave configuration.** Typed recall is a Weave with no tray, no cloze, no constitutive support, an intent prompt, one expected answer plus explicit accepted variants, and a controlled-production ceiling. No new screen type was created; the same configuration serves later cross-surface typed hosts | PR-06 ✅ |
| **D-7** | external/audio | Recording schedule for the §18 priority clips; deliberate-contour session for PM-018 | PR-11 |
| **D-8** | implementation calibration | **CLOSED (PR-04) — separate scoped counters.** `production.{independent, supported, selfCorrection}`, each `{attempts, success, failure}`. A single mutable scope field was rejected: one item legitimately accumulates a mixed history (two supported attempts, one supported success, a later independent success, a self-correction) that any single label must overwrite. The aggregates are retained as derived totals, never as semantic authority, and the event's `evidenceClass` owns routing | PR-04 ✅ |

Settled pedagogy is **not** reopened: A/S/R/G treatments, W1/W2, no pronunciation scoring, 7 frozen
screen types, FD-1…FD-7, CA-8, the 29-pairing selection.

---

## 21. Readiness verdict

| Dimension | Verdict | Basis |
|---|---|---|
| Starting the identity PR (PR-01) | **READY WITH BOUNDED GAPS** | D-2/D-4 must be decided in the PR itself; everything else is mechanical |
| Starting the assistance/attribution PR (PR-03) | **DONE** | schema v3 shipped: structured assistance, Canonical-eight attribution, admissibility + admission no-op gate, v1→v2→v3 migration, 944 tests green |
| Starting the event-spine PR (PR-02) | **DONE** | implemented; D-1 and D-3 closed; envelope v2 + v1→v2 migration shipped with 60 new tests |
| Starting the mastery PR (PR-04) | **DONE** | D-8 closed as separate scoped counters; mastery-v0.3 + compaction-v0.2 ship with evidence-class routing, the Supported Mon Lexique path, and no differential scheduling; 1065 tests green |
| Starting persistence wiring (PR-05) | **DONE** | app-level runtime provider owns one repository per privacy-reset epoch; reset-safe runtime/controller replacement; explicit sandbox vs `lesson_path` surface resolvers; the shipped lesson path can reach the spine and emits nothing; 1114 tests green |
| Starting renderer emission (PR-06) | **DONE** | D-6 closed as a Weave configuration; the four Wave A primitives emit through a narrow session API; qualified screen identity, scoped evidence targets, real hint/constitutive capture, one shared grader; 1181 tests green |
| Runtime-connected renderer proof | **EXISTS (PR-06)** | shipped screen → event → mastery → Mon Lexique is proven end-to-end on already-shipped French. It is an ARCHITECTURE proof: the exact PM-009/PM-011 learner payloads are not registered |
| Exact L1 pilot learner content | **NOT READY** | requires PR-07 payload registration. The pre-PR-07 human French-QA gate was DEFERRED by explicit founder risk acceptance (§22): AI review is provisional, not human attestation, and one comprehensive human QA pass remains required before public/content-complete release |
| Practice Hub return leg (PR-08) | **DONE** | runtime read projection + pure Hub selector over existing Practice Pool / today's-set rules; authored Wave A screens reused by reference; `practice_hub` placement on the same item/payload identities; legacy Practice tab untouched; 1217 tests green |
| Starting renderer integration (PR-06) | **READY** | Wave A uses shipped R1/R2 components and shipped L0/L1 French |
| Authoring learner-visible payloads (PR-07) | **NOT READY** | French QA pending; four identities unregistered |
| French QA | **NOT READY** (external gate) | no human sign-off exists on any pool surface |
| Audio implementation (PR-11) | **NOT READY** | no audio identity, no recordings; PM-018 hard-gated |
| Connected L1 smoke (PR-12) | **READY WITH BOUNDED GAPS** | the proof is well-defined and testable on shipped French once PR-06 lands |

Completing this contract does not make any of the above implemented.

---

## 22. Recommended immediate next action — one runtime PR

**PR-01 through PR-05 are implemented** on `feat/l1-pilot-identity-layer`,
`feat/l1-pilot-event-envelope`, `feat/l1-pilot-assistance-attribution`,
`feat/l1-pilot-mastery-scopes` and `feat/l1-pilot-provider-wiring`. The spine records what assistance
was present, what that assistance permits the attempt to prove, who the result is attributable to
among the Canonical eight sources, and whether the event is admissible at all — with a v1 → v2 → v3
migration that neither discards nor falsely upgrades history. The mastery projection keeps
independent, Supported and self-correction evidence in separate channels that never merge, routed by
the event's evidence class. The shipped `LessonRendererV1` path can now **reach** that spine through
an app-level runtime provider that owns one repository per privacy-reset epoch — and **emits
nothing**: no screen has a learning callback, and the legacy completion marker stays separate.
**D-1, D-2, D-3 and D-8 are closed.**

**Founder QA decision (2026-08-01, recorded with PR-08).** The founder has explicitly DEFERRED the
pre-PR-07 human French-QA requirement, accepting the risk. Recorded honestly:

- the existing AI-reviewed pass over the review pack is **provisional linguistic review only** — it
  is NOT human attestation, no surface is labelled human-approved, and nothing may set a
  `frenchQa: approved`-style status on the strength of it;
- the L1 Human French-QA Review Pack v0.1 remains at
  `FRENCH QA NOT COMPLETED — PR-07 BLOCKED`-as-attested — its gate state was **not** edited to
  claim a pass;
- final human QA will be performed as **one comprehensive product-surface review after the
  learner-facing content set is assembled**, and remains required before public /
  content-complete release;
- under this waiver, implementation work (including PR-07 payload registration) may continue **at
  founder risk**; no implementation may claim named-human approval before it exists;
- PR-08 adds no new French, so it did not depend on this waiver operationally.

**The recommended next engineering action is PR-09 — Mon Lexique projection** (§17): surface the
supported-path visibility with calm status copy, reading the same shared snapshot the Hub now
reads. PR-07 payload registration is also unblocked (at founder risk, per the waiver above);
PR-10 Stats and PR-12 connected smoke follow. The connected-architecture proof now covers both
directions: lesson → mastery → Mon Lexique/Hub, and Hub → same mastery row.

Standing constraints: keep one spine, one repository, one mastery projection · do not touch
shipped item ids · register no French · no renderer or Practice Hub change · **no numeric evidence
weights or thresholds may be invented** — none is founder-ratified · assisted success must never
be stored as independent production · attribution still precedes weakness · **no differential
numeric scheduling for Supported evidence exists or may be invented** — PR-04 deliberately left the
Leitner/prompt-fade mechanics identical and recorded that as current behaviour, not as equivalence.

**Do not produce another planning document.** The next artifact in this workstream is code.

---

*End of L1 Pilot Runtime Contract and Atomic PR Plan v0.1 — Draft vertical-slice implementation
planning artifact. Non-Canonical; assigns no runtime IDs; authorizes no implementation; all L1
French remains pending human French QA.*
