---
title: Cairn Curriculum Layer Discovery
version: 0.1
status: Discovery — not canon, not a Bible, not a Charter
authority: None. This document reconstructs the existing curriculum authority surface. It decides nothing, promotes nothing, and authorizes no implementation.
owner: Project Canon (discovery phase); the Curriculum layer itself remains NOT YET AUTHORED
created: 2026-07-28
audited_head: 36f38ebc384c36a14a831a43950449930d4905f3 (main)
related:
  - ../../canon/CAIRN_PROJECT_CANON_MAP_v1.0.md
  - ../../canon/CAIRN_CANON_COVERAGE_AND_GAPS_v0.1.md
  - ../../canon/CAIRN_PROJECT_IDEA_AND_DECISION_REGISTER_v0.1.md
implementation_authority: none
---

# Cairn Curriculum Layer Discovery v0.1

> **Discovery only.** The Curriculum layer is `DEPENDENCY — DOCUMENT NOT YET
> AUTHORED` (Canon Map §4). This document maps what curriculum authority
> already exists, where it conflicts, and what genuinely remains open. It does
> **not** author the layer: no lesson placement is invented here, no status is
> promoted, no ID is renamed, no sequence is locked, and nothing in it may be
> cited as sequencing authority. Sequencing questions still **stop and route
> to founder decision** until the layer is authored (Canon Map §2, worked
> example: "Should L12 come before L13?" → stop and report).

---

## 1. Executive verdict

**Recommendation: CURRICULUM CHARTER FIRST** (full rationale §21).

> **Founder review completed 2026-07-28.** FQ-C0, FQ-C1, FQ-C2, FQ-C4, and
> FQ-C8 were **APPROVED as recommended**; FQ-C3/C5/C6/C7 remain
> derived/deferred/current-state exactly as classified. **Curriculum Charter
> drafting is authorized as the v0.x governance and ratification phase of
> Step 2.** Durable decision record:
> [`CURRICULUM_FOUNDER_RATIFICATION_v0.1.md`](CURRICULUM_FOUNDER_RATIFICATION_v0.1.md).
> Draft under review: [`CURRICULUM_CHARTER_v0.1.md`](CURRICULUM_CHARTER_v0.1.md).
> This discovery itself remains non-Canonical, non-authoritative
> discovery/provenance material.

The curriculum layer is exactly what Coverage & Gaps calls it: `FRAGMENTED` —
rich material, no owner. The audit found:

- a **coherent, repeatedly-applied curriculum thesis** (capability-first,
  prerequisite-safe, split-sense doorways, integration rhythm, chunk-first
  promotion) spread across ~30 `docs/syllabus/` specs and ~30 vault notes;
- a **stable spine to L6** (locked, shipped, device-smoked, frozen) and a
  **documented working plan to L17** that its own sources explicitly refuse to
  call a locked sequence;
- **no reconciled band architecture** (four course-length figures, two
  organizing models), **no settled tense progression beyond a futur-proche
  preview**, **no item-counting methodology** (PRJ-015, with a live 8–15 vs
  1–4 budget contradiction), and **three incompatible integration-cadence
  formulations inside one canonical note**;
- clear ownership boundaries already drawn by the Canonical layers
  (Product Brain §19, Content Bible §2, Mastery Bible §28).

Strong principles + incomplete sequence + unresolved counting = the Charter
profile. A full Bible written today would either invent the missing sequence
(forbidden) or consist substantially of preserved holes. Discovery-only would
understate how much is genuinely settled and consistently used.

---

## 2. Definition of Curriculum ownership

Boundary used throughout this audit (sources: Canon Map §5; Product Brain §19,
PB-013…PB-016, PB-078; Content Bible §2.1–2.2; Mastery Bible §28; Social
Charter ownership model):

**Curriculum owns (presumptively — the layer is unauthored):** scope and
sequence; lesson and band order; exact placement of language functions,
grammar, and tense layers; the prerequisite graph between lessons; recycle
cadence and integration/review cadence; exposure → supported → freer-use
promotion points; lesson-level and band-level exit outcomes; skill-demand
sequencing; assessment/integration gate locations; promotion or deferment of
content between lessons or bands; lesson numbering and sequence stability;
remediation and re-entry placement; the mapping between authored lesson plans
and the shipped registry. Explicitly routed **to** Curriculum by Canonical
documents: lesson sequence, archetype-to-lesson assignment, verb order,
retrieval reach, L0 & ~L10 placements (Content Bible §2.2); readiness, when
evidence opportunities are introduced, expected evidence distribution by band,
staged strictness by band, the Readiness Gate diagnosis/prescription contract,
integration-lesson need lists, `LessonEvidenceProfile` per lesson (Mastery
Bible §28, §13, §15); lesson order, Capability Arc composition, subjunctive
placement, retrieval ranges (Product Brain §19); item-counting methodology
(Content Bible §20.2, PRJ-015); inversion banding (Content Bible §15.3).

**Curriculum does NOT own:** product destination, promise, positioning,
Journey→Arc→Lesson hierarchy, monetization posture (Product Brain); authoring
policy, activity families, Reading action rule, French correctness,
prerequisite-safety principle, active-new 1–4 invariant, chip/role contracts
(Content Bible — these **constrain** Curriculum); evidence admissibility,
mastery derivation, event semantics, assistance levels, learner-state
computation (Mastery & Evidence Bible — Curriculum decides *where
opportunities occur*, never what they *prove*); social boundaries (Social
Charter); runtime schemas, registries, validators, unlock implementation,
migration mechanics (Engineering — implementation traces are Axis-B fact, not
curriculum canon).

---

## 3. Source and authority method

Audited at main `36f38eb` (read-only). Sources: Canon Map v1.0 + Authority &
Routing Spec + Coverage & Gaps + Project Register; Product Brain v1.0 +
Decision Register + Open Questions; Content Bible v1.0 + Source Gaps; Mastery
& Evidence Bible v1.0 + Current Reality Map; Social Layer Charter v1.0;
Lesson Flow Canon v1; ADRs 0001–0025; both roadmaps; KNOWN_GAPS; STATUS;
DEV_APK_MVP_CANON; MASTER_PIPELINE; CLAUDE.md; all 30 `docs/syllabus/` files;
all `04_SYLLABUS` vault notes + matrices + Historical Syllabus + Syllabus
Production Workflow + Syllabus Context Pack + Syllabus_Delta_Log; the shipped
registry (`lemot-app/content/lessons/v1/`, `content/itemRegistry.ts`), Home
unlock logic, frozen manifests and structure tests, the legacy v7 quarantine.
Full map in §23.

Authority classes and states use the task vocabulary (FOUNDER_LOCKED …
AMBIGUOUS; SETTLED … SUPERSEDED). Rules applied: repeated historical language
is not upgraded; shipped code is Axis-B fact, never intent; vault
`canon_status: canonical` marks a note as settled **within the fragment
layer** — it does not make the note a Curriculum authority, because nothing
governs sequencing policy (Coverage & Gaps §3.1); "not stated" is recorded
rather than filled.

---

## 4. Existing curriculum thesis

A real, consistently-applied thesis exists across the fragments — the layer is
fragmented in *ownership*, not in *philosophy*:

1. **Capability-first, not topic-first.** Canonical at product level (PB-016
   "context is a scaffold"); realized in the syllabus as intent-function
   growth ("vocab grows by intent function, not theme clusters").
2. **Prerequisite safety overrides only the requirement to produce unseen or
   unsupported language; it never overrides French correctness or
   naturalness.** A correct, natural form may still be unavailable for
   *required production* when it is not active, supported, or otherwise
   prerequisite-safe; the learner is never required to produce unseen
   language; and incorrect or unnatural French is never licensed as a
   workaround (Content Bible §15.2, Card-8 wording — Canonical. Syllabus
   Design Rules rule 2 states the same rule in a compressed form that must
   be read through §15.2, never as a license against correctness).
3. **Split-sense doorways instead of paradigm ladders.** Own one narrow sense,
   defer neighbors: aller L7 (movement), faire L9 (small action), pouvoir L11
   (help/permission), devoir/falloir L15 (obligation-light). Architecture
   verbs teach one dominant active core; the paradigm stays recognition.
4. **Introduce → grow → prepare.** Every lesson introduces something new,
   grows old material, and prepares the future; preview hooks are explicitly
   *not* ownership (L6→L7, L10→L11, L13→L14).
5. **Integration rhythm.** New-engine runs are broken by 0-active-new
   integration lessons (L6, L10, L13, L16 authored; L19 planned) — though the
   cadence rule has three incompatible formulations (§17-C2).
6. **Chunk-first, explicit promotion.** Frozen chunks may precede systems
   (`m'aider`, `tu fais quoi ?`); recognition → supported/active promotion
   must be explicit and status-marked (`status_by_lesson`).
7. **Low active-new discipline.** Learner-facing active production is capped
   at 1–4 per teaching lesson, 0 for integrations (founder-ratified in the
   Content Bible; "müfredat disiplini, DEĞİŞMEZ" in Lesson Flow Canon) —
   though the *planning-item* budget "~8–15" survives unreconciled (§17-C1).

The thesis is **DERIVED_SYNTHESIS at layer level**: each component is sourced,
but no single document owns the whole, and no founder ratification round has
been run over the set.

---

## 5. Current lesson spine

Strongest reconstructable spine. Status vocabulary from Lesson Status Matrix:
**VIS** = authored + registered + learner-visible; **REG** = registered,
Home-gated; **SPEC** = spec only, no runtime file. "unknown" = source does not
establish a value. Full sourced detail per lesson lives in the cited specs —
this table does not replace them.

| Lesson / band | Primary purpose | Active-new | Main recycle | Prerequisites | Source authority | Authored status | Shipped status | Confidence |
|---|---|---|---|---|---|---|---|---|
| L0 The First Step | first-use bridge (café taste), not Lesson 1 | n/a (bridge) | n/a | none | ADR-0006 (ACCEPTED_ADR) + founder build matrix | full row, locked | VIS `v1-lesson-000` | High |
| L1 Survival Kit | greet, polite request, rescue, leave | spec: 9 (+4 recycled-active) | L0 café frame | L0 | founder build matrix (locked lesson) — but chip list **deliberately NOT locked** (`provisional`, active-redesign) | full spec, PILOT | VIS | High (slot) / Medium (contents) |
| L2 Être | say who/what I am; `c'est` | spec: 10 | L1 | L0–L1 | vault locked; device-smoked | full spec | VIS | High |
| L3 Non | negation `ne…pas`, yes/no intonation, tu/vous | spec: 10 | L1–L2 | L1–L2 | vault locked; device-smoked | full spec | VIS | High |
| L4 J'ai | avoir human states; être↔avoir contrast | spec: 8 | L2–L3 | L2, L3 | vault locked; device-smoked | full spec | VIS | High |
| L5 Un, une | articles as noun packages | spec: 8 | L1–L4 | L1–L4 | vault locked; device-smoked | full spec | VIS | High |
| L6 Un petit moment | first integration; 0 new grammar; human-context broadening | 4 (near-0 lexis) | ~20 items, whole foundation | L0–L5 | documented + shipped/frozen (status label inconsistency, §17-C7) | full spec | VIS — **last learner-visible lesson** | High |
| L7 Je vais | frozen next-step doorway (`je vais à la maison`) | **2** (compact) — full 8-item aller spec SUPERSEDED | L1–L6 chunks | `v1-lesson-006` | compact spec ACCEPTED, **BLOCKED** (PR #142); full spec HISTORICAL_PROPOSAL | compact spec + superseded full spec | REG, hidden | High (direction) — implementation blocked |
| L8 C'est où ? | single question word `où` via frames | spec: 7 | ~15 | L7 movement, L3 yes/no, L5 le/la | vault documented | full spec | REG, hidden | Medium |
| L9 Faire une pause | split-sense faire (small action/pause) | spec: 8 | ~14 | L6 infinitive frame, L3 negation, L8 | vault documented | full spec | REG, hidden | Medium |
| L10 Une petite journée | integration "After Class"; pouvoir preview hook | 2 (meta, 0 lexis) | ~26 | L0–L9 | vault documented; band map Option C anchor | full spec | REG, hidden | Medium |
| L11 Je peux | split-sense pouvoir (help/permission) | spec: 8 | ~15 | L6/L9 frames, L3 negation | vault documented; patches applied `a198310` | full spec | REG, hidden | Medium |
| L12 Est-ce que | yes/no question wrapper over owned clauses | spec: 5 | ~18 | L3, L8, L11 | gate review + compact spec; patches `728353d` | compact spec | REG, hidden | Medium |
| L13 Can-do, asked | integration; `j'y vais` recognition seed | 2 (meta) | ~26 | L11, L12, L7–L9 | compact spec; patches `dd138a4`; **no gate review exists** | compact spec | REG, hidden | Medium |
| L14 J'y vais | place-`y` chunk-first doorway | spec: 5 | ~14 | L7 `à + place`, L13 seed | gate review + compact spec; patches `2f3c94d` | compact spec | REG, hidden | Medium |
| L15 Il faut | obligation-light, asymmetric (`il faut` primary, `je dois` supported) | spec: 6 | ~15 | L9/L7/L6/L1 infinitives, L11 contrast | gate review + compact spec; patches `b04ab00` | compact spec | REG, hidden — **latest runtime file** | Medium |
| L16 A Small Moment | integration + bounded reading-response seed (model-answer-only) | 3 (meta, 0 lexis) | ~25 | L11–L15 | gate review + compact spec, 5 locked gates; patches `f47d62f` | **SPEC only — no runtime file** | not built | Medium |
| L17 Ça va ? | human context / feelings light (band-map override: 3–5 active, operator-locked) | spec: 5 | ~24 | L2/L4/L6 state frames, L15, L11/L12 | gate review + compact spec; operator-locked override; patches `6b9506f` | **SPEC only** — latest authored spec | not built | Medium |
| L18 (planned) | futur proche **stronger preview, NOT owned** | 0 by design | mostly recycled | L7 | L18-L24 Roadmap `provisional`; band map gate 4 **OPEN** | roadmap intent only | not built | Low |
| L19 (planned) | integration / repair / A Small Moment recurrence | ~0–2 meta | high | L16 seed | roadmap `PLANNED` | roadmap intent | not built | Low |
| L20 (planned) | pre-Campfire checkpoint (milestone) | ~0–2 | proof-oriented | L1–L19 | roadmap `PLANNED`; band map gate 10 OPEN | roadmap intent | not built | Low |
| L21–L23 | unknown — candidates only | unknown | unknown | unknown | `PROPOSED/UNKNOWN`, open decision D2 | none | not built | None |
| L24 Campfire | landmark: soft promise-gate; paid-zone promise | ~0 new | curated proof | L1–L23 | `CANONICAL landmark / PLANNED content` (vault); paywall *position* formally OPEN (ADR-0025 deferred, PRJ-036) | none | not built | Medium (landmark) / None (content) |
| Post-L24 | direction only (~180 topic map / Core 150 / 120–180 band) | unknown | unknown | unknown | PRJ-029 `OPEN` | none | not built | None |

Band labels in the fragments (Level and Band Map, `provisional`): Onboarding
L0 · M1 Foundation L1–L5 (locked) · Foundation Integration L6 · Mid-band
Option C L7–L17 (documented; "working arc, not a locked sequence"; rejected
arcs A and B recorded) · Pre-Campfire on-ramp L18–L20 (provisional) · Open
zone L21–L23 · Campfire landmark L24. Note the fragments' bands are
**L-ranges, not CEFR bands** (§9, §17-C4).

---

## 6. Intended versus authored versus shipped scope

Five distinct scopes coexist; conflating any two is an error:

| Scope | Range | Source |
|---|---|---|
| **Learner-visible (shipped)** | L1–L6 (+L0 bridge via Lesson Zero) | Home cap `l.number >= 1 && l.number <= 6` (`app/(tabs)/index.tsx`); smoke-accepted 2026-06-17, PASS P0–P3 = 0; runtime FROZEN | 
| **Runtime-registered** | L0–L15 (16 files, all ≥8 screens, structurally validated) | `content/lessons/v1/` + `v1LessonStructure.test.ts`; index comments: "registered for validation; NOT learner-visible" |
| **Spec-authored** | L0–L17 (L16–L17 spec-only, no runtime files) | `docs/syllabus/` + Lesson Status Matrix: "authored = L0–L15, visible = L0–L6, L16–L17 spec-only" |
| **Roadmap-planned** | L18–L24 (L21–L23 open) | L18-L24 Roadmap (`provisional`, `not-started`) |
| **Direction-scale intent** | ~120–180 lessons (planning band) / 180-lesson 12-unit map (approved spec, intent only) / "Core 150" (workflow note, unreconciled) | Product Brain PB-015; Build Spec §38; Syllabus Production Workflow |

Divergence flags: content authoring runs **2 lessons ahead of code** (L16–L17
spec-only) and code runs **9 lessons ahead of visibility** (L7–L15 REG-hidden)
— which strains, without formally violating, STATUS.md's "Hard no: no
multi-lesson content expansion beyond the Round 1 L1-L6 slice" (the lessons
are registered-but-hidden; the vault treats this as intentional
validation-registration). Renamed/superseded: full-aller L7 superseded by the
compact doorway; legacy v7 lesson names (L6 Aller, L7 Questions I…) quarantined.
Title drift between spec slugs and shipped short titles exists (e.g.
`L03-negation-you-questions` → "Non") with matching pedagogy. STATUS.md
carries two contradicting lesson counts (7 vs 16 — §17-C8). DEV_APK_MVP_CANON
still says L1–L5 while runtime caps at L6 (§17-C6). The band map calls L10
"already shipped" — spec-level shorthand contradicted by the runtime (visible
scope L0–L6); registered-not-visible is the accurate state.

---

## 7. Progression model

A staged model exists **consistently used but uncodified** — no document names
a canonical stage ladder:

- **Roles, not stages:** active / supported / recognition / ghost-exposure
  (+ recycled, carryover, repair, accounting-only, model-answer) — a 4-tier
  role system, richer than active/receptive.
- **Promotion contract:** recognition → supported/active only via explicit
  status-marking in a later lesson (`status_by_lesson`); worked instances
  L11→L12 (`est-ce que je peux`), L13→L14 (`j'y vais`). SETTLED as an
  authoring rule.
- **Production stages appear implicitly:** recognition → frozen-chunk bounded
  use → frame-slot production → recombination (integration lessons) →
  model-answer-only free response (Say It, L16 reading response). "Freer
  production" beyond model-answer-only is **not yet defined anywhere**
  (AI-evaluated free production is paid-zone/deferred).
- **Repair** exists as a role (repairReserve ≤1) and as content (rescue
  chunks), but the repair *pair* is a live spec-vs-shipped inconsistency
  (§17-C9), and remediation as a curriculum mechanism is unauthored (§13).
- Transfer across scenes is a stated goal (café-centricity reduction, L6/L10
  human-context broadening) — a design intention, not a codified stage.

Classification: components SETTLED (roles, promotion rule);
the stage ladder as such: PARTIALLY_SPECIFIED / DERIVED_SYNTHESIS.

---

## 8. Spiral and recycle model

- **Placement cadence** (where integrations go): three incompatible
  formulations in `Integration Lesson Logic.md` — (i) every ~4–5 lessons or
  after ~3 consecutive new-engine lessons `[CANONICAL]`; (ii) "2 new engines →
  1 integration; never >2 consecutive" `[CANONICAL rhythm rule]`; (iii) the
  2026-07-18 `[LOCKED DEFAULT]` Integration Rhythm Contract — after **three**
  consecutive materially-new-engine lessons the sequence must be *reviewed*
  before a fourth (authoring/review rule; future validator WARNING candidate;
  explicitly not runtime-enforced). (ii) forbids what (i)/(iii) permit.
  State: **CONFLICT** (§17-C2). The build spec adds "integration every 4–5
  lessons is a pacing heuristic" — not a memory window.
- **Carryover reach** (how far items recycle): `Chip Lifecycle.md` 2026-07-18
  `[LOCKED DEFAULT]`, explicitly "not empirical… an authoring default":
  L+1–L+2 highest / L+3–L+5 medium / L+6 low / L+7–L+9 extension-only /
  L+10 dormant-reactivatable; `[HARD INVARIANT]`: a nine-lesson horizon does
  NOT mean show-every-lesson. Chip-taxonomy v0.3 explicitly warns there is
  "no numeric carryover window currently canonized" at runtime and that
  cadence ≠ reach.
- **Recycle load discipline:** Content Bible §5.3 "recycle cannot steal the
  lesson" (caps recycled ≤2/sentence, visible carryover ≤3, target share
  ≥0.50 — all TUNABLE); integration archetype targets ~55% recycled. Observed
  spec recycle grows monotonically (L1 ~4 → L10/L13 ~26). Content owns the
  *budget policy*; Curriculum owns the *placement* — kept separate here.
- **Forgetting/re-entry:** dormant-reactivation triggers are named in the
  lifecycle proposal; no lesson-placement mechanism for re-entry exists.
  Repetition basis is item- and function-based (per-type horizons: noun 3–5,
  formula 5–7, spine no expiry); not skill- or scene-indexed.
- **Explicit recycle payload per lesson:** present in every authored spec
  (recycled lists + counts). SETTLED as authoring practice.

---

## 9. Grammar and tense progression

Engine ladder through L15, recorded per placement (intro / supported /
freer-use points; "owned" = active production):

| Structure | Introduction | Supported/expansion | Freer use | Placement state |
|---|---|---|---|---|
| être | L2 (`je suis` only active; paradigm recognition) | `il/elle est`, `vous êtes` supported L2 | recombination L6+ | SETTLED to spine level (locked, shipped) |
| negation `ne…pas` | L3 productive | `je n'ai pas` L4, `pas de` L5 supported | integrations | SETTLED (locked, shipped) |
| tu/vous choice | L3 (supported social choice) | ongoing | — | SETTLED |
| yes/no questions (intonation) | L3 | — | — | SETTLED; **inversion recognition-only band-wide** (Content Bible §15.3; banding = Curriculum, unauthored) |
| avoir | L4 (`j'ai` active core) | possession L4 supported | integrations | SETTLED (locked, shipped) |
| articles un/une (le/la) | L5 active (noun packages) | `pas de` L5 | — | SETTLED (locked, shipped); plural/partitive DEFERRED |
| vouloir | `je voudrais` frozen from L0/L1 | `je voudrais + inf.` L6 | — | frozen-formula only; present `je veux` recognition/DEFERRED |
| aller | L7 compact: `chunk-je-vais` only | full movement sense = superseded full spec (HISTORICAL_PROPOSAL, deferred-not-cancelled) | unknown | direction ACCEPTED, implementation BLOCKED |
| où questions | L8 (one word, frame-bound) | movement questions supported | — | CURRENT_APPROVED_SPEC (documented, not locked) |
| faire | L9 (small-action sense) | negated/suggestion forms | — | CURRENT_APPROVED_SPEC |
| pouvoir | L11 (help/permission sense) | `vous pouvez` supported | — | CURRENT_APPROVED_SPEC; exact owned scope = band-map gate 2 **OPEN** |
| est-ce que | L12 (yes/no wrapper only) | four applications supported | — | CURRENT_APPROVED_SPEC; wh-words → unscheduled "Question Expansion 2" (gate 5 OPEN) |
| y (place) | recognition L13 → active chunk L14 | `y-before-verb` feel | — | CURRENT_APPROVED_SPEC; `en` NOT in band (gate 6 partially open) |
| devoir/falloir | L15 (`il faut` primary, `je dois` supported — asymmetric) | — | — | CURRENT_APPROVED_SPEC (gate 7 RESOLVED) |
| futur proche | recognition hook (compact L7 removed even the hook); **L18 stronger preview, 0 active by design** | — | ownership **post-Campfire paid zone (recommended, unconfirmed)** | **OPEN — band map gate 4, named the #1 risk** |
| passé composé | **not placed** | — | — | DEFERRED paid-zone; promised at Campfire L24 |
| imparfait | **not stated anywhere** | — | — | absent (blanket deferral only) |
| futur simple | **not stated** by name | — | — | absent (blanket deferral) |
| conditionnel | not placed (`je pourrais` named as deferred) | — | — | DEFERRED |
| subjunctive | **not placed**; trap-only leak guard (`il faut que` blocked) | — | — | DEFERRED; Summit *may* align with it (Product Brain, open question — placement = Curriculum) |
| object pronouns | frozen `m'aider` chunk L11 | — | — | chunk-only; system unplaced |
| -er pattern verbs | archetype #8 exists, **no lesson assigned** | — | — | absent |

**Status:** L1–L6 placements SETTLED (founder build matrix + shipped +
frozen). L7–L17 placements are CURRENT_APPROVED_SPEC — accepted working plan,
explicitly "documented", with Option C "working arc, not locked". Everything
past futur-proche-preview is unplaced. **No pedagogically-ideal order has been
invented to fill the gaps, and none may be.**

---

## 10. Vocabulary and counting model

- **Lexical destination:** ~3,000 words is a Product Brain **planning band**
  (PB-012, "never a counter or promise"). No syllabus-layer document states
  any lexical target, per-band word count, or cumulative curve. State: the
  destination is NOT operationally defined — and is not currently claimed to be.
- **Lemma vs surface:** locked ontological principles exist (L1 note):
  surface forms are not automatically separate accounting chips; a sentence is
  never a chip (ADR-0004); noun+article counts as one package; `où est` must
  not be blindly chip-ified. SETTLED as principles.
- **Roles:** active/supported/recognition/ghost + protected chunks
  (`PROTECTED_CHUNKS` frozen at 2: `je ne suis pas`, `ce n'est pas`) +
  survival formulas (closed set). Content-owned; Curriculum consumes.
- **Budgets:** the founder-ratified learner-facing invariant is **active-new
  1–4, integrations 0** (Content Bible §5.2; per-archetype §6.8). The syllabus
  planning layer carries "~8–15 active-new / ~30–45 total exposure"
  (Syllabus Design Rules rule 3 `[CANONICAL]`; template §6), and the authored
  specs record active-new 5–10 for standard lessons. The Content Bible itself
  says the coarse 8–15 is "superseded for learner-facing active production"
  and flags that the two figures "may be measuring differently" (G4).
  Additionally the audited pool shows the 30-item floor is unreachable for
  L1–L6 without fabrication. State: **CONFLICT pending PRJ-015** (§17-C1) —
  deliberately NOT resolved in this discovery.
- **Item-counting methodology (PRJ-015):** owner = Curriculum Bible
  (Canonical home), status `OPEN`, reopen trigger "Curriculum authoring".
  Open questions recorded at source: does frame + fillers count as one or
  several; multiword chunks; linked IDs at different granularity
  (chunk/frame/phenomenon "linked, never merged"); reading-passage
  granularity (no `read:`/`passage:` prefix yet). Absorbs the historical
  52/54/56 count drift (audit-scope 52; current registry and manifest are
  both 54 with test-enforced equality — the 56 figure in vault matrices
  appears stale; each source cites its own number by instruction).
- **Mon Lexique eligibility, duplicate senses, proper nouns:** homograph
  sense-suffix rules exist (ID convention v0.1); split accounting identities
  (`noun-cafe`/`chunk-un-cafe`) are flagged as mastery-splitting defects;
  `ici`/`faim` ship as chips without registry identity (registry-hygiene
  debt). Recorded, unresolved.

---

## 11. Skill progression

- **Reading:** the only designed skill ramp. L6–L10 optional present-only
  micro-paragraphs → L16 first *owned* reading-response seed
  (model-answer-only, present-only, known-items-only, ≤2–3 lines, no live AI;
  5 locked gates) → L19 light recurrence (planned) → deeper AI-driven version
  paid-zone. **Compatible with the Content Bible Reading rule** (every Reading
  ends in an appropriate action; production conditional; L0–L3 bounded
  non-production actions; no passive page-turning; no forced production
  beyond prerequisites — §11, Q7 founder-ratified). Per-band
  appropriate-action tuning remains open (G1) and is a Curriculum dependency.
- **Listening:** no sequencing plan. KNOWN_GAPS: "Faz 6 authoring is NOT
  blocked on audio." Shadowing-first contract is PRJ-018 (`OPEN`, Content +
  Curriculum). Audio recognition, pronunciation phenomena exist as
  recognition-layer content (Phenomena Progression: sound/writing load,
  nasal vowels thin, rhythm untouched — "no new sound lesson now").
- **Speaking/production:** staged via roles (§7); production targets 4–8 per
  lesson in specs; spontaneous response undesigned (model-answer-only
  everywhere pre-Campfire).
- **Writing, interaction:** not distinctly sequenced anywhere. Not stated.
- State: Reading PARTIALLY_SPECIFIED (strongest); listening/speaking ramps
  OPEN; writing/interaction absent.

---

## 12. Lesson rhythm and counting layers

**"Beats ≠ screens" is Canonical and must be preserved** (Content Bible §6.4:
beats/cards 8–12 vs rendered screens 11–14 are "different counting layers…
never write 'beats = screens'"). The audit found **three counting layers in
live use, plus one superseded**:

1. **Items by status tier** — the syllabus specs' unit (active/supported/
   recognition/recycled/traps/total exposure/production targets). No spec
   counts beats or screens.
2. **Ten named lesson sections** (Meet It → … → Lesson End) — the structural
   unit of template v1.1 and the archetype system (archetypes reweight
   sections; budgets are item budgets).
3. **Rendered screens** — the runtime unit (shipped lessons have 8–12
   `screens[]`; the L7 compact spec's PR shape lists a 7-screen sequence).
4. *(Tension, not violation)* Lesson Flow Canon §1.1 declares a **single**
   screen budget ("no uncounted screen", 11–14) with §1.4 carve-outs; the
   Content Bible's later two-layer model supersedes that framing. The same
   numbers, two counting models — flagged, unresolved, adjacent to PRJ-015.

No document treats "8 beats", "8 activities", "8 screens" as equivalent — but
nothing yet **maps** spec sections ↔ beats ↔ rendered screens either. That
mapping is unowned (Curriculum/Engineering seam) and is a genuine gap, not a
conflict.

---

## 13. Assessment, integration, and remediation

- **Integration lessons** (L6, L10, L13, L16; L19 planned): pedagogical
  rehearsals — recombination proof, spike-calming, scene-broadening,
  preview-seeding. They are explicitly **not tests** ("must never feel like a
  quiz") and **not mastery gates**.
- **No formal assessment exists** anywhere in the authored range. L20 is a
  planned "checkpoint/capability proof" (milestone archetype) — content
  undefined.
- **Unlock is completion-based, not mastery-based** (Axis-B fact): reaching
  the last screen writes the completion key; Home applies simple linear
  unlock; "no scoring, no ceremony". Mastery Bible: "lesson completion is
  attempt coverage, not mastery" (CURRENT REALITY); "the Practice Hub never
  gates a lesson" (Canonical). Product Brain: progression rhythm is
  Journey-level; Journey Reinforcement is the outcome-based inter-Journey
  gate whose algorithm is deferred to Curriculum/Engineering.
- **Readiness Gate** (Lesson Flow Canon §7): diagnosis + prescription, not a
  wall; fail-open. Its contract is DEFERRED and routed to Curriculum (Mastery
  Bible §28). Integration-lesson **need lists** (consumed by the ADR-0022
  selector) do not exist — a named Curriculum dependency.
- **Failure/retry/remediation/re-entry:** unspecified. L19 "weak-point
  repair" is roadmap intent only.
- **Mastery semantics were not touched by this audit**: everything above
  routes *around* the Mastery Bible, which owns admissibility, strength,
  state derivation. Curriculum's open surface is only *where* opportunities
  and gates sit.

---

## 14. Prerequisite graph

Four distinct layers, in decreasing solidity:

1. **Explicitly authored, per-lesson:** every full/compact spec lists
   prerequisites by canonical item ID (e.g. L9 requires
   `frame:je-voudrais-plus-infinitive` from L6). Item-, grammar-, and
   function-level. Consistent and machine-harvestable. State: SETTLED as
   authored data — but no aggregated graph document exists.
2. **Implemented:** runtime `prerequisites: ["v1-lesson-006"]` fields exist
   and are validated to resolve (`v1LessonStructure.test.ts`); the Home path
   enforces only linear completion order, not the item graph.
3. **Inferable from order:** the linear spine itself.
4. **Absent:** skill prerequisites, social/emotional-load prerequisites (the
   fragments gesture at load curves — "L2–L3 difficulty spike" — but encode
   nothing).

Production prerequisites are governed by the Content Bible's
prerequisite-safety rule (blocked-production lists exist in the learning
engine's contracts); nothing here licenses requiring unseen production, and
this discovery infers no such permission.

---

## 15. Product-identity compatibility

Sourced check against product principles (no model-inferred incompatibilities
are reported as findings):

- **Calm premium mentor / no XP-streak / no completion theatre:** enforced in
  the curriculum fragments themselves (archetype QA risks name "reward
  language", "ceremony too theatrical"; copy-guard tests ship). Compatible.
- **Small reversible steps / low overload:** active-new discipline, split-
  sense doorways, integration rhythm, deliberate lightening passes (L4, L5,
  L17 override "cut active-new to 3–5"). Compatible; the *recorded* load
  problem is the historical L2–L3 spike (retrospective, acknowledged).
- **Speaking-fear reduction / useful expression:** rescue/repair chunks from
  L1, human-context arcs L6/L10/L17. One sourced tension: the **repair pair
  is not shipped** while later specs assume it owned (§17-C9), and the vault
  records four "functional holes" awaiting founder input (repair pair, the
  "oui paradox", `excusez-moi` parked, state/feeling gap).
- **AI-supported, not AI-led:** the AI generation contract subordinates AI to
  the spine ("AI is not the teacher"); pre-Campfire everything is
  model-answer-only/deterministic ("L0–L20 fully deterministically
  buildable"). Compatible.
- **Ownership and transfer:** promotion contract + recombination lessons +
  café-centricity reduction. Compatible.
- *(Model inference, labeled as such:)* the unreconciled 8–15 planning budget,
  if ever applied as a learner-facing target, would conflict with the
  low-overload principle — this is an inference from the G4 ambiguity, not a
  sourced incompatibility.

---

## 16. Ownership and routing table

| Question arriving today | Route to | Basis |
|---|---|---|
| What is the product destination / how long is the course? | Product Brain (PB-010 Canonical promise; PB-011/012/015 planning bands) | destination is product-owned; numbers are bands |
| How is a lesson authored / what budgets bind authoring? | Content Bible v1.0 | §5–§6, §19 |
| Should lesson X come before lesson Y? / when is a concept introduced? | **STOP — unauthored Curriculum layer**; founder decision required | Canon Map §2, §5 |
| What does the shipped app order/unlock today? | STATUS.md + code (Axis B) | current-build chain, scoped |
| What counts as evidence at an integration lesson? | Mastery & Evidence Bible v1.0 | §26–§28 |
| Where do integration lessons go? | STOP (cadence rule in CONFLICT, §17-C2) unless quoting an existing spec | Integration Lesson Logic |
| How is an item counted? | OPEN — PRJ-015, home = future Curriculum document | Content Bible §20.2 |
| May a social activity enter the sequence? | Social Charter (negative bounds; PRJ-009 OPEN — no) | Charter §13 |
| May L7+ be implemented or made visible? | NO — blocked (device smoke + Round 1 closeout + separate reviewed Home-cap decision + Q4 code freeze) | STATUS.md; compact L7 spec; Coverage & Gaps §13 |
| Paywall/Campfire position? | Product Brain (PRJ-036 OPEN; ADR-0025 deferred/proposed — working direction only) | not Curriculum's call |

---

## 17. Conflicts and contradictions

Materially significant, all sourced (vault-recorded letters in parentheses):

- **C1 — Active-new budget: ~8–15 vs 1–4.** Syllabus Design Rules rule 3
  `[CANONICAL]` vs founder-ratified Content Bible invariant vs actual spec
  counts (5–10). G4: "the numbers may be measuring differently." Blocks
  precise budget enforcement; resolution = PRJ-015. (vault B)
- **C2 — Integration cadence: three incompatible formulations** in one
  canonical note (every 4–5 / 2→1-never->2 / ≤3-then-review LOCKED DEFAULT).
  (vault A)
- **C3 — Course length: L0–L24 spine vs "Core 150" vs ~180 (12-unit map) vs
  120–180 (canonical planning band)** — never reconciled; the superseded v0.1
  definition adds a stale "120–200". (vault L)
- **C4 — Organizing principle:** Product Brain Canonical
  Journey→Capability-Arc, capability-not-topic vs Build Spec §38's 12
  CEFR-band topic units; vault bands are L-ranges with one "A1 consolidation"
  legacy leak in a matrix. A Curriculum document must reconcile; Canonical
  Product Brain framing wins on precedence, but no Arc composition exists.
  (vault M adjacent)
- **C5 — L7:** full aller spec (HISTORICAL_PROPOSAL, deferred-not-cancelled)
  vs accepted compact doorway — resolved *for the next PR* but preserved as a
  future re-decision; registered Canon Map contradiction C10.
- **C6 — Dev APK scope: canon L1–L5 vs shipped L0–L6** (registered as C2 in
  Coverage & Gaps).
- **C7 — Spine status labels:** L6 shipped/frozen yet "documented" while
  L0–L5 are "locked"; L1 "locked" in overview vs `provisional
  active-redesign` in its own note (chip list deliberately unlocked). (E, F)
- **C8 — STATUS.md self-contradiction:** "7 lessons at `91f1b04`" vs "current
  16 lessons pass" in the same file; band map calls L10 "shipped". (P)
- **C9 — Repair pair:** L13 assumes `je ne comprends pas` /
  `vous pouvez répéter ?` owned; runtime never shipped them; vocabulary
  ladder places them L1–L2. Live spec-vs-shipped inconsistency (R-B, awaiting
  founder). (H)
- **C10 — L18 cadence accounting:** counted as a new-engine lesson in the
  rhythm mapping while defined as 0-active preview — by the contract's own
  counting rules it should not count. (G)
- **C11 — Counting-layer framing:** LFC single-screen-budget vs Content Bible
  two-layer beats/screens supersession (§12).
- **C12 — Item-count drift 52/54/56** — historical, absorbed into PRJ-015;
  current code shows 54=54 test-enforced.
- **C13 — M1 boundary** L1–L5 vs L2–L5 across two vault notes. (D)
- **C14 — Registry identity defects:** `ici`/`faim` chips without itemIds;
  split accounting identities (`noun-cafe`/`chunk-un-cafe`). Engineering-
  surface debt with curriculum counting consequences. (I)
- **C15 — Device-verification labels** (`device-verified` frontmatter vs
  matrix "sampled/deep-link"; L0 post-#139 re-smoke owed). (N)

---

## 18. Open decisions

Genuinely open, with current owner-of-record:

1. Sequencing policy itself — PRJ-001 (`OPEN`; the layer's reason to exist).
2. Item-counting methodology — PRJ-015 (`OPEN`; not resolved here).
3. Post-L24 progression — PRJ-029 (`OPEN`).
4. Futur proche ownership point — band map gate 4 (named top risk).
5. Full question formation start; wh-word expansion ("Question Expansion 2",
   unscheduled) — gate 5.
6. `en`, partitives, plural system placement — gate 6 / L5 deferral.
7. Pouvoir exact owned scope — gate 2.
8. Practice Pool Challenge expansion point (~L13 recommended) — gate 9.
9. L20 milestone confirmation + free-tier preview strength — gates 10, 11.
10. L21–L23 content — vault open decision D2.
11. Integration-lesson novelty floor (0 vs 1–2 items) — L6 open decision.
12. Summit placement; subjunctive alignment — Product Brain open question
    (curriculum decision required).
13. In-lesson exposure vs ~30–40-lesson Hub retrieval pairing — Product Brain
    open question.
14. Support-fade curricular stages + readiness criteria (PB-080 thermostat) —
    Product Brain open question, Curriculum-owned staging.
15. Per-band appropriate Reading actions (G1 residue); Reading taxonomy
    (PRJ-012, depends on PRJ-001).
16. Staged mastery strictness by band; Readiness Gate contract; integration
    need lists; `LessonEvidenceProfile` per lesson — routed by Mastery §28.
17. Four functional holes (repair pair, oui paradox, excusez-moi,
    state/feeling gap) — R-A…R-E, awaiting founder.
18. Lesson-section ↔ beat ↔ rendered-screen mapping (§12 gap).
19. ID-convention runtime migration (`type-slug` → `prefix:slug`, post-smoke).
20. Completion strictness (roadmap D6); lesson-ID stability policy beyond
    YASA 2's item-level freeze (three numbering systems coexist: v1 L0–L15,
    learning-engine fixtures, legacy v7 — quarantined).

---

## 19. Source gaps

- No authored sequencing-policy document (the defining gap).
- No aggregated prerequisite graph (data exists per-spec; graph unbuilt).
- No band architecture reconciling the Canonical Journey→Arc model with any
  L-range or CEFR framing; no Capability Arc composition anywhere.
- No tense-architecture plan beyond the futur-proche preview; imparfait /
  futur simple never mentioned.
- No listening/speaking/writing skill-sequencing notes.
- No assessment/remediation design.
- No operator-vault curriculum sources beyond what is imported (PRJ-034
  flags genuinely absent vault material, e.g. L1-L5 Proofreading.md —
  an input to Content QA, adjacent to curriculum quality).
- Gate reviews missing for L11 and L13 (workflow asymmetry).
- L18–L20 have band-map rows and roadmap intent only; L21–L23 nothing.

---

## 20. Candidate founder decisions

Nine cards. Only **five** required an answer before Charter drafting
(FQ-C0, C1, C2, C4, C8); the rest are derived actions, current-state
records, or deferrals — retained with their original identifiers for
traceability, not because they are urgent. None asks the founder to approve
a sequence invented in this audit — every option cited already exists in a
source.

> **Founder decisions 2026-07-28:** the five blocking/required cards were
> **APPROVED with their recommended answers**. The full context,
> alternatives, and consequences below are preserved as the decision trail —
> they are not erased by the approval. FQ-C3/C5/C6/C7 are **not** approved,
> resolved, or rejected: they remain open, derived, or deferred as
> classified. Binding record:
> [`CURRICULUM_FOUNDER_RATIFICATION_v0.1.md`](CURRICULUM_FOUNDER_RATIFICATION_v0.1.md).

### Founder review summary

| Card | Decision | Classification | Recommended answer | Founder decision |
|---|---|---|---|---|
| FQ-C0 | Step-2 vehicle | BLOCKING FOR CHARTER DRAFT | Charter = v0.x governance/ratification stage of Step 2, not a Bible substitute | **APPROVED 2026-07-28** |
| FQ-C1 | Spine ratification scope | BLOCKING FOR CHARTER | Ratify L0–L17 at honest tiered statuses; L18+ not ratified | **APPROVED 2026-07-28** |
| FQ-C2 | Macro-map status | BLOCKING FOR CHARTER | Demote 12-unit/180 map and "Core 150" to historical/reference inputs | **APPROVED 2026-07-28** |
| FQ-C4 | Integration cadence | BLOCKING FOR CHARTER | Adopt the 2026-07-18 Integration Rhythm Contract as the single rule | **APPROVED 2026-07-28** |
| FQ-C8 | Repair pair / functional holes | REQUIRED CORRECTION BEFORE SPINE RATIFICATION IS COMPLETE | Repair pair homes in the L1 Survival Kit redesign | **APPROVED 2026-07-28** |
| FQ-C3 | Item-counting contract | DERIVED ACTION — NO NEW OWNERSHIP DECISION | PRJ-015 stays OPEN; first dedicated post-opening decision track | not a decision — remains derived |
| FQ-C5 | Futur proche ownership | DEFER UNTIL POST-L17 PLANNING / PRJ-036 | Record L18 preview-only as provisional; ownership open | remains deferred |
| FQ-C6 | Tense architecture | DERIVED CURRENT-STATE RECORD | Record placements as UNPLANNED; no CEFR backfill | remains a factual record |
| FQ-C7 | L18–L24 horizon | DEFER UNTIL NEXT AUTHORING HORIZON | Provisional roles stand; L21–L23 open; PRJ-036 pending | remains deferred |

### The cards

**FQ-C0 — Step-2 vehicle.** `BLOCKING FOR CHARTER DRAFT` — **APPROVED
2026-07-28 (recommended answer adopted).**
Context: the founder-locked canon authoring sequence (Q3, 2026-07-26) names
Step 2 as "Curriculum Bible," while this discovery recommends "Curriculum
Charter first." Nothing in existing canon independently authorizes changing
the Step-2 vehicle. Recommended: authorize the Curriculum Charter as the
**v0.x governance and ratification stage of Step 2**, not a permanent
substitute for the Curriculum Bible. The Charter should: establish ownership
boundaries; ratify the curriculum thesis; record the honest tiered status of
the existing spine; resolve only the minimum live contradictions; and
preserve band architecture, counting methodology, post-L17 sequence, and
tense placement as **explicit open work**. A full Curriculum Bible is
authored only when enough sequence and band architecture exist to justify
it. Alternative: require a full Curriculum Bible immediately. Consequence:
the recommended answer avoids padding a Bible with invented placements while
still creating a governing Curriculum authority. Founder authority is
required because the locked authoring sequence names a Bible and does not
independently authorize changing the Step-2 vehicle.

**FQ-C1 — Spine ratification scope.** `BLOCKING FOR CHARTER` — **APPROVED
2026-07-28 (recommended answer adopted).**
Context: L0–L6 locked+shipped; L7–L15 authored compact specs (accepted
working plan, "documented"); L16–L17 spec-only; Option C explicitly "working
arc, not a locked sequence". Conflict: nothing governs sequencing policy, so
even the authored spine is formally unowned. Recommended: ratify **L0–L17 as
the authoritative current spine while preserving tiered statuses** —
L0–L6 founder-locked, shipped and frozen; L7–L15 approved working sequence,
registered but hidden, **not immutable**; L16–L17 approved spec-only
continuation, not built; **L18+ not ratified as sequence**. "Authoritative
spine" means the current order is the **default source for planning**; it
does not promote any lesson to locked or implemented beyond its actual
status. Alternative: ratify only L0–L6 and leave L7–L17 as working plan.
Consequence: determines what a Charter may state as settled vs working.
Founder authority required because the fragments were never ratified as a
sequence.

**FQ-C2 — Status of the conflicting macro-maps.** `BLOCKING FOR CHARTER` —
**APPROVED 2026-07-28 (recommended answer adopted).**
Context: Canonical precedence **already establishes** that the Product
Brain's Journey → Capability Arc → Lesson model controls over lower-authority
planning artifacts — the founder is *not* being asked which authority wins.
The open decision is narrower: whether the Build Spec's 12-unit/180
CEFR-topic map and the "Core 150" figure should now be **formally labeled
historical/reference-only planning inputs**, or whether either survives as a
non-authoritative working input beneath the Capability Arc model.
Recommended: Product Brain hierarchy controls (already settled); the
12-unit/180 map and "Core 150" are **demoted to historical/reference
planning inputs**; all total lesson counts remain planning bands, never
promises; Curriculum later composes actual Capability Arcs rather than
inheriting topic units. Alternative: retain the 12-unit map as a
non-authoritative working input under the Journey framing. Consequence:
fixes the organizing principle for all post-L17 planning and removes the
C3/C4 ambiguity. Founder authority: formal disposition of two approved
planning artifacts.

**FQ-C3 — Item-counting contract (PRJ-015).**
`DERIVED ACTION — NO NEW OWNERSHIP DECISION`
Existing Canonical routing already assigns PRJ-015 to the Curriculum layer
(Content Bible §20.2; Project Register) — ownership needs no re-decision.
Recorded for the Charter: PRJ-015 remains `OPEN`; Charter authoring triggers
a **dedicated counting-contract decision track** (the first post-opening
track); no numeric validator or budget reconciliation may claim precision
until the accounting unit is defined; the founder will later decide the
**methodology itself**, not re-decide its owner. The methodology is not
resolved in this discovery.

**FQ-C4 — Integration cadence: pick the single binding formulation.**
`BLOCKING FOR CHARTER` — **APPROVED 2026-07-28 (recommended answer
adopted).**
Context: three incompatible formulations (§17-C2), the newest marked
`[LOCKED DEFAULT]` 2026-07-18. Recommended: adopt the **2026-07-18
Integration Rhythm Contract** as the one rule — after three consecutive
materially-new-engine lessons, the sequence must be reviewed before placing
a fourth; this is an authoring/review rule, **not runtime enforcement**;
integration may occur *earlier* when load or transfer needs justify it;
"2 new engines → 1 integration; never more than 2" is **superseded**;
"every 4–5 lessons" survives only as historical heuristic/context, not a
binding rule. This formulation fits the actual authored record (the L7–L9
run closed by L10) and avoids retroactively invalidating existing planned
sequences, which the "never >2" phrasing would. Alternative: keep "every
4–5" as heuristic plus the contract as hard review rule. Consequence:
removes a live contradiction every future lesson placement hits. Founder
authority: two of the three formulations carry `[CANONICAL]` markers.

**FQ-C5 — Futur proche ownership point.**
`DEFER UNTIL POST-L17 PLANNING / PRJ-036`
Not required to draft the Charter. For Charter purposes the record is only:
L18 preview-only is a **provisional working direction**; no ownership lesson
is ratified; **no pre-L24 production ownership may be inferred**; exact
ownership remains open (band map gate 4, the named #1 risk). The decision
becomes live at post-L17 planning and interacts with PRJ-036
(Campfire/paywall position).

**FQ-C6 — Tense architecture beyond futur proche.**
`DERIVED CURRENT-STATE RECORD`
No founder choice is required merely to record that these placements do not
exist. The accurate state: passé composé has promise-level adjacency
(Campfire) but **no lesson placement**; imparfait, futur simple,
conditionnel systems, and subjunctive placement are **unplanned**; future
agents must not fill these gaps from generic CEFR convention; the Curriculum
layer owns the future design. A real founder decision will be required when
an actual tense architecture is proposed — not now.

**FQ-C7 — L18–L24 working horizon.**
`DEFER UNTIL NEXT AUTHORING HORIZON`
Not required to draft the Charter. For Charter purposes: L18–L20 remain
provisional roles (preview / integration-repair / checkpoint); L21–L23
remain open (D2); L24 remains a product landmark with **unplanned content**;
the Campfire/paywall position remains dependent on PRJ-036.

**FQ-C8 — Functional holes and the repair pair (R-A…R-E).**
`REQUIRED CORRECTION BEFORE SPINE RATIFICATION IS COMPLETE` — **APPROVED
2026-07-28 (recommended answer adopted).**
Context: the vault records four holes awaiting founder input; L13 assumes an
unshipped repair pair; the "oui paradox". Conflict: §17-C9. Recommended: the
canonical curriculum home of `je ne comprends pas` and
`vous pouvez répéter ?` is the **L1 Survival Kit redesign**; they are
repair/survival chunks, **not a later grammar engine**; L13 may assume them
only **after** the relevant Content/runtime correction lands;
implementation remains separately gated and must not bypass the current
Round-1 freeze; the other three functional holes remain recorded for the L1
redesign unless a separate placement decision is made. Alternative: insert
the pair in the next content wave rather than L1 — downstream cost: the
current L13 assumption remains unresolved and the spine keeps an implicit
prerequisite that never actually shipped. Founder authority: the vault marks
these "Haktan onayı bekliyor" (awaiting founder approval).

---

## 21. Recommended document type

**CURRICULUM CHARTER FIRST.**

Against the standard:

- *Strong principles and ownership boundaries exist* — yes: §4's thesis is
  sourced and consistently applied; §2's boundary is drawn by three Canonical
  documents; the authoring machinery (design rules, archetypes, templates,
  gate-review workflow, ID convention) is mature and battle-tested across 17
  lessons.
- *Exact sequence is incomplete* — yes: locked only to L6; approved-not-locked
  to L17; provisional to L20; open beyond; no band architecture; no tense
  plan; no counting unit.
- *A shorter charter can safely govern future curriculum work* — yes: it can
  canonize the boundary, the thesis, the promotion/prerequisite/cadence rules
  (after FQ-C4), ratify the spine at honest per-lesson statuses (after
  FQ-C1), and explicitly hold PRJ-015/PRJ-029 and the tense ladder open.
- *A full Bible would overstate current certainty* — yes: a Bible claiming to
  own "exact placement of grammar and tense layers" cannot be written when
  imparfait has literally never been mentioned; symmetry with Content/Mastery
  is explicitly not a reason.

Not "FULL BIBLE": no stable band architecture, counting methodology open,
sequence beyond L17 absent. Not "LAYER BRIEF ONLY": the material is far more
than a working spine — principles, archetypes, workflow, and a 17-lesson
authored record. Not "DISCOVERY ONLY": conflicts are material but *mapped and
mostly registered*; authority reconstruction succeeded.

Governance note: the founder-locked authoring sequence names "Step 2 —
Curriculum Bible" (Q3, 2026-07-26), and Step 2 is **not automatically
opened**. A Charter-first path either (a) serves as the v0.x draft stage of
that same step, or (b) requires the founder to accept a Charter as the Step-2
vehicle. This is surfaced, not decided — it is **FQ-C0**, the first blocking
card of the founder review (§20).

---

## 22. Smallest next action

*(Updated 2026-07-28.)* The five blocking/required answers now exist
(FQ-C0/C1/C2/C4/C8 approved — see the ratification record), so **Curriculum
Charter drafting is authorized as the v0.x governance and ratification
phase of Step 2**. The draft is
[`CURRICULUM_CHARTER_v0.1.md`](CURRICULUM_CHARTER_v0.1.md) —
`Draft — awaiting founder sign-off`; it becomes Canonical only by explicit
founder sign-off and promotion. The next action is founder review of that
draft. Meanwhile: FQ-C3 remains the first dedicated post-opening decision
track (the counting contract, PRJ-015); FQ-C5 and FQ-C7 remain deferred to
post-L17 planning and the next authoring horizon respectively; FQ-C6
remains an open factual state, not a present decision. No full Curriculum
Bible may be drafted at this stage.

---

## 23. Appendix: source map

**Canonical / authority:** `docs/canon/CAIRN_PROJECT_CANON_MAP_v1.0.md`
(§2 routing, §4 layer table, §5 ownership, §6 curriculum route, §16 Step 2);
`docs/canon/CAIRN_AUTHORITY_AND_ROUTING_SPEC_v0.1.md` (§9 authority order,
§10 scoped opening, §14 stop conditions);
`docs/canon/CAIRN_CANON_COVERAGE_AND_GAPS_v0.1.md` (§3.1 FRAGMENTED rating,
§10 matrix, §11 founder-locked sequence);
`docs/canon/CAIRN_PROJECT_IDEA_AND_DECISION_REGISTER_v0.1.md` (PRJ-001, -012,
-015, -016, -018, -023, -029, -031, -032, -034, -036);
`obsidian-product-brain/ACTIVE_CODEX/00_CAIRN_PRODUCT_BRAIN/` (Bible §1, §5–§7,
§12, §14, §19; DECISION_REGISTER PB-010…PB-080; OPEN_QUESTIONS curriculum
section); `docs/bibles/content/CONTENT_BIBLE_v1.0.md` (§2, §5–§6, §9–§11,
§15–§16, §19–§20) + `CONTENT_BIBLE_SOURCE_GAPS_v0.1.md` (G1–G5);
`docs/bibles/mastery-evidence/MASTERY_EVIDENCE_BIBLE_v1.0.md` (§13, §15, §26,
§28) + `MASTERY_EVIDENCE_CURRENT_REALITY_AND_ENFORCEMENT_MAP_v0.1.md`;
`docs/bibles/social/SOCIAL_LAYER_CHARTER_v1.0.md` (§13 negative bound);
`docs/canon/LESSON_FLOW_CANON_v1.md` (§0–§1, §5, §7);
ADRs 0001–0025 (esp. 0004, 0006, 0012, 0013, 0016, 0021, 0022, 0024, 0025).

**Curriculum fragments (DOC-027/DOC-028):** all 30 files in `docs/syllabus/`
(specs, compact specs, gate reviews, band map v0, retrospective, template
v1.1, archetypes v1, ID convention v0.1, AI contract v1, chip taxonomy v0.3);
vault `ACTIVE_CODEX/04_SYLLABUS/` (all notes incl. Syllabus Overview, Design
Rules, Level and Band Map, Grammar/Vocabulary/Phenomena Progression,
Integration Lesson Logic, Lesson Status Matrix, L0–L17 notes, L18-L24
Roadmap); `05_MATRICES/` (Syllabus Coverage Matrix, Lesson Matrix);
`90_HISTORY/Historical Syllabus.md`; `10_OPERATIONS/Syllabus Production
Workflow.md`; `11_AGENT_CONTEXT/Syllabus Context Pack.md`;
`SOURCE_ARCHIVE/AVAILABLE_INPUTS/Syllabus_Delta_Log.md`;
`02_LEARNING_SYSTEM/Chip Lifecycle.md`, `Difficulty and Cognitive Load.md`;
`docs/architecture/l0-l24-founder-build-matrix-v0.md`.

**Execution / reality (Axis B):** `docs/STATUS.md`; `docs/DEV_APK_MVP_CANON.md`;
`docs/ROADMAP.md`; `docs/CAIRN_ROADMAP_202607.md`; `docs/KNOWN_GAPS.md`;
`docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md` (§38–§39, §60);
`lemot-app/content/lessons/v1/` (16 files + index);
`lemot-app/content/itemRegistry.ts` (54 items);
`lemot-app/app/(tabs)/index.tsx` (L6 cap, linear unlock);
`lemot-app/scripts/` (shipped-item-ids.json, shipped-error-tags.json,
v1LessonStructure.test.ts, devApkScope.test.ts, canonRules.ts);
`lemot-app/content/learning-engine/` (fixtures l1/l2/l11/l12/l14/l15/l16/l18);
`lemot-app/data/lessons/` (legacy v7, 24 files, quarantine banners);
`docs/README.md`; `docs/MASTER_PIPELINE_v1.2.1.md`; `CLAUDE.md` (banner +
quarantined legacy body).

---

## Curriculum inventory

Provisional IDs (CUR-001…): allocated here because Phase-0 confirmed **no
existing Curriculum namespace**. IDs are discovery-provisional — a future
Charter/Bible may renumber before first ratification. Authority /
Status per the task vocabulary. "Impl." = relation to shipped runtime.

| ID | Decision or proposition | Source | Authority | Status | Owner | Impl. relation | Notes |
|---|---|---|---|---|---|---|---|
| CUR-001 | L0 is a first-use bridge, not Lesson 1; numbered spine starts at L1 | ADR-0006 | ACCEPTED_ADR | SETTLED | Curriculum (inherited) | Implemented (lesson-000 excluded from cards) | device-verified |
| CUR-002 | Round 1 spine = L1 Survival Kit → L2 Être → L3 Non → L4 J'ai → L5 Un/une → L6 integration | founder build matrix (D-07 LOCKED); vault L1–L6 notes | FOUNDER_LOCKED | SETTLED | Curriculum | Implemented + smoke-accepted, frozen | the only founder-locked sequence segment |
| CUR-003 | L6 is the last learner-visible lesson; Home cap `<=6`; cap bump is a separate reviewed decision | STATUS.md; `index.tsx`; compact L7 spec §5 | CURRENT_BUILD_REALITY + operator decision | SETTLED (until closeout) | Operations/Curriculum seam | Implemented | not a curriculum *intent* statement |
| CUR-004 | L7 = compact frozen-chunk doorway (`chunk-je-vais` + `chunk-a-la-maison`); full aller spec superseded-not-cancelled | PR #142; both L7 docs | CURRENT_APPROVED_SPEC | SETTLED (direction) / DEFERRED (impl., blocked) | Curriculum | Registered, hidden | Canon Map contradiction C10 closed for next-PR purposes |
| CUR-005 | L8=où, L9=faire, L10=integration, L11=pouvoir, L12=est-ce que, L13=integration, L14=y, L15=devoir/falloir placements | full/compact specs; band map Option C | CURRENT_APPROVED_SPEC | PARTIALLY_SPECIFIED (approved working plan, "not a locked sequence") | Curriculum | Registered, hidden | ratification = FQ-C1 |
| CUR-006 | L16 = integration + bounded A-Small-Moment seed (model-answer-only, 5 locked gates) | L16 gate review + compact spec | CURRENT_APPROVED_SPEC | SETTLED (spec) | Curriculum + Content | Spec-only, no runtime file | PRJ-023 partial |
| CUR-007 | L17 = human context/feelings light; active-new cut to 3–5 by operator-locked band-map override | L17 compact spec | FOUNDER_LOCKED (override) + CURRENT_APPROVED_SPEC | SETTLED (spec) | Curriculum | Spec-only | latest authored spec |
| CUR-008 | L18 = futur proche stronger preview, NOT owned, 0 active by design | L18-L24 Roadmap; band map | CURRENT_APPROVED_SPEC (provisional) | DEFERRED-ownership / OPEN (gate 4) | Curriculum | Not built | top-named risk |
| CUR-009 | L19 = integration/repair; L20 = pre-Campfire checkpoint | L18-L24 Roadmap | HISTORICAL_PROPOSAL→CURRENT plan (provisional) | PARTIALLY_SPECIFIED | Curriculum | Not built | roles only |
| CUR-010 | L21–L23 content undecided | L18-L24 Roadmap (D2) | AMBIGUOUS | OPEN | Curriculum | Not built | candidates recorded, nothing more |
| CUR-011 | L24 = Campfire landmark; promised content: full futur proche, passé composé, full questions, broad pouvoir, en/partitives | vault roadmap `[CANONICAL landmark]` | CANONICAL_DOMAIN_CONSTRAINT (product) | SETTLED (landmark) / OPEN (content; position PRJ-036) | Product Brain + Curriculum | Not built | paywall position NOT settled (ADR-0025 deferred) |
| CUR-012 | Curriculum hierarchy = Journey → Capability Arc → Lessons; Arcs internal; capability-not-topic organization | Product Brain §6 (PB-013/014/016) | CANONICAL_DOMAIN_CONSTRAINT | SETTLED | Product Brain (Curriculum composes Arcs) | Not implemented | no Arc composition exists anywhere |
| CUR-013 | Destination: expressive independence (Canonical); ~A0→B2, ~3,000 words, ~120–180 lessons are planning bands | Product Brain §5–§6 (PB-010/011/012/015) | CANONICAL_DOMAIN_CONSTRAINT (promise) / planning bands (numbers) | SETTLED (promise) / OPEN (B2-public) | Product Brain | n/a | B2≈3,000 must NOT be treated as curriculum canon |
| CUR-014 | 180-lesson 12-unit CEFR band map (A0…B2 capstone) | Build Spec §38–§39 | CURRENT_APPROVED_SPEC (intent only) | CONFLICT with CUR-012 framing (C4) | Product Brain (intent) | Not built | reconciliation = FQ-C2 |
| CUR-015 | "Core 150" spine figure | Syllabus Production Workflow | HISTORICAL_PROPOSAL | CONFLICT (C3) | unowned | n/a | unreconciled with L0–L24/180/120–180 |
| CUR-016 | Prerequisite safety: an unseen/unsupported form may not be *required as production*; French correctness and naturalness are never waived | Content Bible §15.2 (Card-8 wording); Syllabus Design Rules r2 (compressed form) | CANONICAL_DOMAIN_CONSTRAINT | SETTLED | Content (rule) / Curriculum (application) | Partially enforced (learning-engine blockedProduction; not in v1 renderer) | r2's shorthand must not be read as licensing incorrect French |
| CUR-017 | Active-new 1–4 per teaching lesson; integrations 0; per-archetype bands (doorway 1–2 etc.) | Content Bible §5.2/§6.8; LFC §1.1 | FOUNDER_LOCKED (via Content Bible) | SETTLED | Content | Authoring policy only | Curriculum consumes, must not restate as its own invention |
| CUR-018 | Planning-item budget "~8–15 active-new / ~30–45 total exposure" | Syllabus Design Rules r3; template §6 | CURRENT_APPROVED_SPEC (planning) | CONFLICT (C1) with CUR-017 pending PRJ-015 | future Curriculum doc | Authoring policy only | "may be measuring differently" (G4) |
| CUR-019 | Item-counting methodology undefined (frame+fillers, multiword chunks, linked granularities) | template §17; ID convention; PRJ-015 | AMBIGUOUS | OPEN | Curriculum Bible (Canonical home) | n/a | NOT resolved in this discovery |
| CUR-020 | Integration rhythm: ≤3 consecutive new-engine lessons, review before a 4th | Integration Lesson Logic 2026-07-18 `[LOCKED DEFAULT]` | CURRENT_APPROVED_SPEC (locked default) | CONFLICT (C2: two older incompatible phrasings coexist) | Curriculum | Authoring rule only | pick-one = FQ-C4 |
| CUR-021 | Carryover horizon L+1…L+10-dormant; cadence ≠ reach; no runtime window canonized | Chip Lifecycle `[LOCKED DEFAULT]`; chip taxonomy §10 | CURRENT_APPROVED_SPEC | SETTLED (as authoring default) | Content/Curriculum seam | Not implemented | explicitly non-empirical |
| CUR-022 | Integration lessons: 0 new grammar, ~55% recycled, never feel like a test, may carry recognition-only preview hooks; hooks ≠ ownership | archetype #10 + L6/L10/L13/L16 pilots | CURRENT_APPROVED_SPEC | SETTLED (consistently applied) | Curriculum | Implemented in registered lessons | novelty floor open |
| CUR-023 | Split-sense opening rule (own one narrow sense, defer neighbors) | Syllabus Design Rules r5 `[CANONICAL]`; 4 instances | CURRENT_APPROVED_SPEC | SETTLED | Curriculum | Implemented (L7 compact, L9, L11, L15 registered) | |
| CUR-024 | Architecture-verb guardrail: one dominant active core, paradigm recognition, no conjugation tables | Design Rules r4; template §4 | CURRENT_APPROVED_SPEC | SETTLED | Content/Curriculum seam | Implemented | |
| CUR-025 | Promotion must be explicit and status-marked (`status_by_lesson`); chunk-first early use for Q-words/object pronouns | template §8; ID convention §6 | CURRENT_APPROVED_SPEC | SETTLED | Curriculum | Not implemented (docs convention) | |
| CUR-026 | Ten-section lesson spine (Meet It … Lesson End); archetypes reweight, never replace | template v1.1 §10; archetypes | CURRENT_APPROVED_SPEC | SETTLED | Content/Curriculum seam | Partially (v1 renderer uses 7 screen types, no section mapping) | mapping gap §12 |
| CUR-027 | Beats ≠ screens (8–12 beats vs 11–14 rendered screens, never equal) | Content Bible §6.4 | CANONICAL_DOMAIN_CONSTRAINT | SETTLED — but LFC single-budget framing coexists (C11) | Content | Authoring policy | preserve verbatim |
| CUR-028 | Inversion is recognition-only band-wide; banding decision = Curriculum | Content Bible §15.3 | CANONICAL_DOMAIN_CONSTRAINT | SETTLED (constraint) / OPEN (banding) | Content → Curriculum | Authoring policy | |
| CUR-029 | Reveal look-ahead ~3–4 lessons (max 5–6), recognition-only, validator ERROR beyond | Content Bible §10.2 | FOUNDER_LOCKED (via Content Bible) | SETTLED | Content | Validator-claimed | a direct sequencing constraint |
| CUR-030 | Reading ends in appropriate action; L0–L3 bounded non-production; production conditional on prerequisites | Content Bible §11 (Q7) | FOUNDER_LOCKED | SETTLED (principle) / OPEN (per-band tuning, G1) | Content → Curriculum (banding) | L16 seed spec-only | |
| CUR-031 | Reading ramp: optional micro-paragraphs L6–L10 → L16 owned seed → L19 recurrence → paid deep version | specs; band map §5 | CURRENT_APPROVED_SPEC | PARTIALLY_SPECIFIED | Curriculum + Content | Partially (micro-paragraphs in registered lessons) | |
| CUR-032 | Lesson completion = attempt coverage, not mastery; linear completion unlock; Hub never gates; Journey Reinforcement is the (deferred) real gate | Mastery Bible §26; PB-017…029; code | CANONICAL_DOMAIN_CONSTRAINT + CURRENT_BUILD_REALITY | SETTLED (constraints) / IMPLEMENTED_NOT_CANONIZED (unlock mechanism) | Mastery/Product/Engineering | Implemented | Curriculum may not invent mastery gates |
| CUR-033 | Readiness Gate = diagnosis + prescription, fail-open, not a wall; contract deferred to Curriculum | LFC §7; Mastery §28 | CURRENT_APPROVED_SPEC (design) | DEFERRED | Curriculum (contract) | Not implemented | |
| CUR-034 | Integration need lists + LessonEvidenceProfile per lesson + staged strictness by band | Mastery Bible §13/§15/§28; ADR-0021/0022 | CANONICAL_DOMAIN_CONSTRAINT (routing) | OPEN — routed and stopped | Curriculum | Not implemented | named dependencies |
| CUR-035 | Grammar ladder L2–L15 as recorded (être→…→devoir/falloir) with deferral list | Grammar Progression (vault, canonical fragment) | CURRENT_APPROVED_SPEC | SETTLED L1–L6 / PARTIALLY_SPECIFIED L7–L17 | Curriculum | L0–L15 registered | see §9 table |
| CUR-036 | Tense systems beyond futur-proche preview: unplaced (passé composé Campfire-promised; imparfait/futur simple/subjunctive absent) | vault deferral lists; L18-L24 Roadmap | AMBIGUOUS (absence, not decision) | OPEN | Curriculum (unauthored) | Not built | must not be CEFR-backfilled |
| CUR-037 | Support fades by demonstrated readiness (thermostat), not lesson number; fixed-L40 transition superseded; staging = Curriculum | Product Brain PB-079…082 | CANONICAL_DOMAIN_CONSTRAINT | SETTLED (principle) / OPEN (stages) | Product → Curriculum | Not implemented | PRJ-016 adjacent ("no settled home") |
| CUR-038 | Lesson numbering: three coexisting systems (v1 L0–L15; learning-engine fixtures incl. a different L16/L18; legacy v7 L1–L24 quarantined); shipped itemIds frozen forever (YASA 2) | code; ADR-0012; PRJ-031 | CURRENT_BUILD_REALITY + ACCEPTED_ADR | PARTIALLY_SPECIFIED (no numbering *policy* exists) | Curriculum + Engineering | Implemented | renumbering constrained by YASA 2 |
| CUR-039 | Repair pair (`je ne comprends pas` / `vous pouvez répéter ?`): ladder places it L1–L2, runtime never shipped it, L13 assumes it owned | Vocabulary Progression; L13 spec; R-B | AMBIGUOUS | CONFLICT (C9) | Curriculum + Content | Not implemented | awaiting founder (FQ-C8) |
| CUR-040 | Free/paid depth split for the L10–L20 band (futur/en/passé composé paid-zone; light slices free) | band map §5 | CURRENT_APPROVED_SPEC (planning) | PARTIALLY_SPECIFIED; depends on PRJ-036 | Product Brain + Curriculum | Not built | assumes Campfire ~L24 working direction |
| CUR-041 | Legacy v7 24-lesson syllabus (M1–M4, L14 paywall) fully superseded and quarantined | Historical Syllabus; ADR-0024; PRJ-031 | SUPERSEDED | SUPERSEDED | Project Canon | Legacy-quarantined (files present, hidden; E4 deep-link residual) | never revive |
| CUR-042 | AI generation bound to lesson-status vocabulary; may add 0–2 low-risk nouns only when spec allows | ai-generation-contract-v1 §5–§7 + per-lesson §15 rows | CURRENT_APPROVED_SPEC | SETTLED (contract) | Content + Curriculum | Not implemented (no live AI) | |

*(42 meaningful rows; no cosmetic rows added. A separate
CURRICULUM_DECISION_MATRIX file was deliberately not created — this inventory
lives in the discovery document and duplicating it would be symmetry-driven.)*

---

*End of Curriculum Layer Discovery v0.1. Discovery only — reconstructs
authority, decides nothing, authorizes nothing. Sequencing questions continue
to stop-and-route until the Curriculum layer is authored by founder decision.*
