---
title: Cairn Curriculum Charter
version: 1.0
status: Canonical
authority: Canonical Curriculum governance authority, founder-signed 2026-07-28. Governs its defined Charter-stage scope; it is not the full Curriculum Bible and confers no implementation authority.
owner: Curriculum
date: 2026-07-28
founder_signoff: 2026-07-28
supersedes: CURRICULUM_CHARTER_v0.1.md (renamed on promotion; same document lineage — organization, not a new authority event)
depends_on:
  - CAIRN_PRODUCT_BRAIN_v1.0.md (Canonical)
  - CONTENT_BIBLE_v1.0.md (Canonical)
  - MASTERY_EVIDENCE_BIBLE_v1.0.md (Canonical)
  - SOCIAL_LAYER_CHARTER_v1.0.md (Canonical — negative bounds)
  - CAIRN_PROJECT_CANON_MAP_v1.0.md (Canonical routing)
supporting_records:
  - CURRICULUM_LAYER_DISCOVERY_v0.1.md
  - CURRICULUM_FOUNDER_RATIFICATION_v0.1.md
implementation_authority: none
---

# Cairn Curriculum Charter v1.0 (Canonical)

> **Canonical — founder-signed 2026-07-28.** This Charter is the
> **governance and ratification stage of Step 2** of the founder-locked
> authoring sequence (FQ-C0, approved 2026-07-28) — it is **not** the
> Curriculum Bible, it does not complete Step 2's full scope, and it does
> not pretend to provide a complete scope-and-sequence architecture.
> **Canonical does not mean implemented**: nothing here authorizes code,
> content, schema, runtime-visibility, or release changes, and every open
> dependency (§13) and stop condition (§14) remains binding. Promotion
> preceded by the sign-off review verdict `READY WITH NON-BLOCKING NOTES`
> (N1–N3 preserved as follow-ups). Provenance:
> [`CURRICULUM_LAYER_DISCOVERY_v0.1.md`](CURRICULUM_LAYER_DISCOVERY_v0.1.md)
> (discovery) and
> [`CURRICULUM_FOUNDER_RATIFICATION_v0.1.md`](CURRICULUM_FOUNDER_RATIFICATION_v0.1.md)
> (binding founder decisions FQ-C0/C1/C2/C4/C8).

Charter decision IDs (`CC-###`) mark the rulings this Charter itself
carries. Each cites its provenance (FQ-### founder decision and/or CUR-###
discovery rows). Only the rulings that needed stable identity received IDs.

## 1. Status and authority

- **Canonical — founder-signed 2026-07-28**, after the independent sign-off
  review (`READY WITH NON-BLOCKING NOTES`).
- **Canonical does not mean implemented.** This Charter confers no
  implementation authority; implementation requires separate Engineering
  and content tasks under their own gates (the Round-1 runtime freeze and
  Q4 code freeze stand).
- **This Charter is not the final Curriculum Bible.** It governs the
  Charter-stage scope listed in §2–§15 and deliberately leaves Bible-scope
  work open (§13, §16).
- The discovery and ratification record are **supporting provenance**, not
  independent canon; where this Charter and a Canonical upstream document
  conflict, the upstream document wins and the gap is surfaced.

## 2. Curriculum ownership (CC-001)

*Provenance: FQ-C0; CUR-012, CUR-016, CUR-017, CUR-032; Canon Map §5;
Product Brain §19; Content Bible §2; Mastery Bible §28.*

**Curriculum owns:** scope and sequence; lesson and band order; exact
placement of grammar, functions, and tense systems; the prerequisite graph
between lessons; integration and recycle placement; exposure → supported →
freer-use staging; lesson and band exit outcomes; skill-demand sequencing;
assessment/remediation placement; and the mapping between authored lesson
specs and the shipped lesson order.

**Boundaries preserved:**

- **Product Brain** owns destination, promise, positioning, and the
  Journey → Capability Arc → Lesson model.
- **Content Bible** owns French correctness and naturalness, the
  prerequisite-safety rule, authoring contracts, activity rules, and the
  active-new constraints (1–4 per teaching lesson, integrations 0 — a
  founder-ratified Content invariant that Curriculum consumes, never
  re-owns).
- **Mastery & Evidence Bible** owns evidence admissibility and mastery
  derivation. Curriculum decides *where opportunities and gates occur*,
  never what an action proves.
- **Social Layer Charter** owns the boundaries and activation of actual
  **learner-to-learner product interaction**. **Social-pragmatic French
  content** — tu/vous, politeness, repair chunks, human-context lessons,
  emotional check-ins, conversation openings and closings — remains
  Content/Curriculum material and is *not* the Social product layer.
  PRJ-009 being `OPEN` means **no learner-to-learner social action may
  count as mastery evidence today**; PRJ-009 alone is not the activation
  contract for every non-evidence social feature. No actual Social product
  feature is activated by this Charter; Social remains dormant, and AI
  interaction is not peer social interaction.
- **Engineering** owns runtime enforcement, schemas, registries,
  persistence, and unlock behavior; implementation traces are Axis-B fact,
  never curriculum intent.

## 3. Curriculum thesis (CC-002)

*Provenance: discovery §4 (each principle individually sourced); CUR-016,
CUR-020…CUR-025, CUR-037, CUR-042.*

The following sourced principles are ratified as the Charter-stage
curriculum thesis. The thesis guides placement; it does **not** determine
every lesson placement, and it fills no gap by itself.

1. **Capability-first, not topic-first.** Context is a scaffold; the course
   is organized by what the learner becomes able to do.
2. **Prerequisite-safe production.** Required production uses only active,
   supported, or otherwise prerequisite-safe language (full rule in §7).
3. **Incorrect or unnatural French is never licensed** — by prerequisite
   safety or by anything else.
4. **Split-sense doorways.** Own one narrow sense of a big verb or system;
   defer its neighbors explicitly.
5. **Introduce → grow → prepare.** Every lesson introduces something,
   grows old material, and prepares the future.
6. **Integration and recombination.** Recycle-dominant integration lessons
   consolidate; they rehearse, they do not test.
7. **Chunk-first with explicit promotion.** Frozen chunks may precede
   systems; promotion to supported/active must be explicit and
   status-marked; previews and recognition are never ownership.
8. **Low active-new discipline** — inherited from the Content Bible's
   founder-ratified invariant, not restated as Curriculum's own law.
9. **Calm, low-pressure, useful-expression progression.** No XP/streak
   pressure, no completion theatre, small reversible steps.
10. **AI-supported, not AI-led.** The spine teaches; AI stays inside the
    generation contract's status vocabulary.

## 4. Governing hierarchy and macro-maps (CC-003)

*Provenance: FQ-C2 (approved 2026-07-28); CUR-012…CUR-015.*

The governing course hierarchy is **Journey → Capability Arc → Lesson**,
and the **Product Brain governs this hierarchy**. Under it:

- **Curriculum composes Capability Arcs.** None exists yet; composing the
  first Arcs is named future Curriculum work (§16), not something this
  Charter invents.
- The **12-unit / 180-lesson CEFR-topic map** and the **"Core 150"**
  formulation are **historical/reference planning inputs** — demoted, not
  deleted; preserved with provenance in Appendix B.
- **Lesson-count totals are planning bands, not learner promises**
  (~120–180 remains the Product Brain planning band).
- **Topic clusters may support a Capability Arc but may not replace
  capability-first organization.**

## 5. Current authoritative spine (CC-004)

*Provenance: FQ-C1 (approved 2026-07-28); CUR-001…CUR-011, CUR-035;
discovery §5–§6.*

| Range | Status | Meaning |
|---|---|---|
| L0–L6 | Founder-locked, shipped, smoke-accepted, frozen | Current learner-visible foundation (L0 is the uncounted first-use bridge; L6 is the last visible lesson) |
| L7–L15 | Approved working sequence, runtime-registered but learner-hidden | Default planning order; revisable through future Curriculum authority |
| L16–L17 | Approved spec-only continuation | Authored (compact specs + gate reviews), not implemented |
| L18+ | Open / provisional | No authoritative sequence |

> **Ratifying the current spine ratifies order, lesson purpose, and tiered
> status. It does not ratify every numeric payload recorded in historical
> or working specs. Upstream Content constraints continue to govern.**

**The authoritative current order and purposes (L0–L17):**

| L | Title | Purpose (one line) |
|---|---|---|
| L0 | The First Step | First-use bridge — café taste; not Lesson 1 (ADR-0006) |
| L1 | Survival Kit | Greet, polite request (`je voudrais ___`), rescue, leave |
| L2 | Être | Say who/what I am; `c'est`; only `je suis` active |
| L3 | Non | `ne…pas` productive; yes/no intonation; tu/vous choice |
| L4 | J'ai | Avoir human states; être↔avoir contrast |
| L5 | Un, une | Articles as noun packages; `le/la` supported |
| L6 | Un petit moment | First integration; 0 new grammar; human-context broadening |
| L7 | Je vais | Frozen next-step doorway (compact: `chunk-je-vais` + `chunk-a-la-maison`); full aller spec superseded, deferred not cancelled |
| L8 | C'est où ? | Single question word `où` via fixed frames |
| L9 | Faire une pause | Split-sense faire — small action / pause only |
| L10 | Une petite journée | Integration "After Class"; pouvoir preview hook |
| L11 | Je peux | Split-sense pouvoir — help/permission only |
| L12 | Est-ce que | Yes/no question wrapper over owned clauses |
| L13 | Can-do, asked | Integration; `j'y vais` recognition seed |
| L14 | J'y vais | Place-`y` chunk-first doorway |
| L15 | Il faut | Obligation-light, asymmetric (`il faut` primary, `je dois` supported) |
| L16 | A Small Moment | Integration + bounded reading-response seed (model-answer-only; spec-only) |
| L17 | Ça va ? | Human context / feelings light (spec-only; payload count gated — see L17 payload note) |

**L17 payload note.** L17 remains the approved spec-only lesson in its
ratified slot. Its historical/operator note records **"3–5 active"** (and
the compact spec lists 5 active-new items) — a recorded working-spec value.
The Content Bible's founder-ratified learner-facing invariant is
**active-new 1–4**; any value above that maximum is **not ratified by this
Charter**. Before implementation, the L17 payload must be **reconciled to
the 1–4 invariant or shown through PRJ-015 to be counting a different
unit**; until that reconciliation, "5" may not be used as a learner-facing
active-new allowance.

"Authoritative current spine" means **the default source for current
planning and dependency reasoning**. It does **not** mean: every lesson is
immutable; every lesson is implemented; L7–L17 are promoted to
founder-locked; L18+ is approved; or the learner-visible cap may be
changed. Titles, IDs, order, implementation status, and visibility are
recorded exactly as they stand and are **not changed by this Charter**.
Future modification of any spine element requires scoped Curriculum
authority with recorded provenance (§15). Current runtime visibility
(Home cap `<=6`) and all implementation freezes remain unchanged.

## 6. Integration rhythm (CC-005)

*Provenance: FQ-C4 (approved 2026-07-28); CUR-020, CUR-022; Integration
Lesson Logic 2026-07-18 `[LOCKED DEFAULT]`.*

The binding authoring/review rule:

> **After three consecutive materially-new-engine lessons, the sequence
> must be reviewed before placing a fourth.**

Clarifications, all part of the rule:

- integration may occur **earlier** when cognitive load, transfer, repair,
  or scene-broadening requires it;
- this is an **authoring and review rule, not runtime enforcement**;
- a **preview-only or zero-active-new lesson does not automatically count**
  as a materially-new-engine lesson;
- integration lessons are **pedagogical rehearsal, not mastery tests**;
- **cadence ≠ recycle reach** — they remain distinct concepts (§10).

Supersession record: **"2 new engines → 1 integration; never more than 2
consecutive" is superseded.** "Integration every 4–5 lessons" survives only
as a **historical pacing heuristic**, never a binding rule. The source
files carrying the older wording are preserved unedited; this Charter and
the ratification record are the supersession's home until the sources
receive their own banners through the normal documentation process.

## 7. Prerequisite safety and promotion (CC-006)

*Provenance: Content Bible §15.2 (Card-8 wording — Canonical, binding);
CUR-016, CUR-025, CUR-029; FQ-C8.*

- Required production must use **active, supported, or otherwise
  prerequisite-safe** language.
- **Prerequisite safety never overrides French correctness or
  naturalness.** It overrides only the requirement to *produce* unseen or
  unsupported language; incorrect or unnatural French is never licensed as
  a workaround. **Content's Card-8 clarification is binding.**
- **Recognition and preview do not imply ownership.** Look-ahead reveals
  stay within the Content Bible's window and stay recognition-only.
- **Promotion must be explicit** and status-marked (`status_by_lesson`
  pattern); earlier chunk exposure is never silently treated as ownership.
- **No lesson may silently assume an unshipped prerequisite.** Where a spec
  already does (the L13 repair-pair assumption), the gap is named and gated
  (§8), not papered over.

## 8. Repair pair decision (CC-007)

*Provenance: FQ-C8 (approved 2026-07-28); CUR-039; discovery §17-C9.*

- The Canonical Curriculum home of **`je ne comprends pas`** and
  **`vous pouvez répéter ?`** is the **L1 Survival Kit redesign**. They are
  survival/repair chunks, not a later grammar engine.
- **Naming their home does not implement them.** The pair is not currently
  shipped, and this Charter does not change that.
- **L13's assumption remains blocked** until the relevant Content and
  runtime correction lands.
- The current **Round-1 freeze remains binding**; implementation requires a
  **separate reviewed change**.
- The other recorded L1 functional holes (the "oui paradox", `excusez-moi`,
  the state/feeling gap) remain attached to the L1 redesign unless a
  separate placement decision is made later.

## 9. Lesson rhythm and counting layers (CC-008)

*Provenance: Content Bible §6.4 (Canonical); CUR-026, CUR-027; discovery
§12.*

**Beats ≠ screens.** Four counting layers exist and must never be
conflated:

1. **Curriculum item accounting** — items by status tier (the syllabus
   specs' unit); its methodology is now owned by the **Item-Counting
   Contract v1.0** (Canonical 2026-07-29; PRJ-015 resolved,
   implementation deferred).
2. **Pedagogical beats** — the 8–12-beat lesson spine (Content Bible).
3. **Authored lesson sections** — the ten named sections of the spec
   template.
4. **Rendered screens** — the runtime unit (11–14 per the Content Bible's
   budget; shipped lessons carry 8–12).

The **mapping between sections, beats, and rendered screens remains open**
at the Curriculum/Engineering seam. *(2026-07-29: PRJ-015 was resolved by
the Item-Counting Contract v1.0; per that Contract, no validator may
claim precision until the relevant rule is Canonical **and**
implemented.)*

## 10. Spiral and recycle (CC-009)

*Provenance: CUR-021, CUR-022; Chip Lifecycle `[LOCKED DEFAULT]`; Content
Bible §5.3; discovery §8.*

Ratified only to the extent the sources support:

- **Every authored lesson carries an explicit recycle payload** (standing
  authoring practice in all 17 authored specs).
- **Integration is recycle-dominant** (~55% by archetype design).
- **Cadence and retrieval reach are separate** — §6's rhythm rule places
  integration lessons; it says nothing about how far items carry.
- **Carryover defaults are authoring guidance, not runtime memory
  science** — the L+1…L+10-dormant horizon is an explicitly non-empirical
  authoring default, and no runtime carryover window is canonized.
- **Re-entry and remediation placement remain open** (§13).

Tunable Content budgets (per-sentence recycle caps, carryover visibility
caps, target-load share) remain **Content-owned tunables** — this Charter
does not convert them into immutable Curriculum law.

## 11. Skill progression

*Provenance: discovery §11; Content Bible §11 (Canonical); CUR-030,
CUR-031; PRJ-018.*

Recorded honestly, ratifying nothing beyond the sources:

- **Reading is partially specified** — the only designed ramp (optional
  micro-paragraphs L6–L10 → L16 owned seed → planned L19 recurrence).
- **Every Reading ends in an appropriate learner action; production remains
  conditional** on prerequisite safety and level (Content Bible rule,
  binding). Early levels use bounded non-production actions. No passive
  page-turning; no forced production beyond prerequisites.
- **Listening, speaking, writing, and interaction ramps are incomplete** —
  no sequencing plan exists and none is invented here.
- **Audio implementation is not a prerequisite for authoring** (recorded
  execution fact).
- **No generic CEFR skill ladder may be invented** to fill these gaps.

## 12. Assessment and mastery boundary (CC-010)

*Provenance: Mastery Bible §26–§28 (Canonical); CUR-032…CUR-034; PB-017…029.*

- **Integration lessons are not tests.**
- **Completion is not mastery.** The current completion-key unlock is an
  **implementation fact (Axis B), not a Curriculum mastery rule** — this
  Charter neither ratifies nor changes it.
- **Curriculum decides where opportunities and gates occur; the Mastery &
  Evidence Bible decides what evidence proves.** Neither may cross.
- The **Readiness Gate contract** (diagnosis + prescription, fail-open),
  **remediation design**, and **integration need lists** remain open
  Curriculum work (§13); the Practice Hub never gates a lesson (Canonical
  upstream).

## 13. Open dependencies

Preserved explicitly — none is resolved, and silence is never approval:

- **PRJ-001** — the Curriculum layer itself remains `OPEN` **with narrowed
  scope**: upon promotion this Charter governs the current L0–L17 spine,
  while post-L17 sequencing and the full sequencing architecture remain
  unauthored. **Charter promotion does not automatically close or change
  PRJ-001** — any status change requires an explicit Project Register
  decision/update;
- **PRJ-015 — RESOLVED 2026-07-29** as a subordinate Canonical Curriculum
  authority: the **Item-Counting Contract v1.0**
  ([`PRJ_015_ITEM_COUNTING_CONTRACT_v1.0.md`](PRJ_015_ITEM_COUNTING_CONTRACT_v1.0.md))
  now owns the counting methodology (Canonical; **implementation remains
  deferred** — no validator, registry, or runtime enforcement exists);
- **PRJ-029** — post-L24 progression;
- **PRJ-036** — Campfire/paywall position (Product Brain-owned; Curriculum
  plans against the working direction without hardening it);
- **Capability Arc composition** (none exists);
- **post-L17 lesson sequence** (L18–L20 provisional roles; L21–L23 open);
- **futur-proche ownership** (L18 preview-only is provisional; no pre-L24
  production ownership may be inferred);
- **full tense architecture** (passé composé Campfire-adjacent but
  unplaced; imparfait, futur simple, conditionnel, subjunctive unplanned);
- **Reading per-band action taxonomy** (G1 residue; PRJ-012);
- **listening/speaking/writing progression**;
- **assessment and remediation architecture**;
- **lesson-section ↔ beat ↔ screen mapping**;
- **the Curriculum/Engineering implementation seam** (validators, unlock,
  enforcement — all Engineering-owned, all unopened).

## 14. Stop conditions

Work must **stop and report** — not improvise — when a task requires:

- an unratified post-L17 placement;
- a tense order not established by source;
- a counting question not answered by the Item-Counting Contract v1.0,
  or a task that infers runtime enforcement from that Contract;
- a Capability Arc composition not yet authored;
- a new mastery meaning (Mastery Bible territory);
- a social-evidence contract (PRJ-009 is `OPEN`; the answer today is no);
- an implementation change inferred only from documentation;
- a change to a frozen lesson or to runtime visibility without separate,
  explicit approval.

## 15. Change and supersession policy

- **Curriculum decisions are revisable through explicit authority** — a
  recorded decision with owner, date, and provenance; never by drift.
- **Canonical does not mean immutable**; it means changes go through
  governance.
- **Renaming, merging, splitting, or consolidating notes is permitted**
  when source traceability and supersession history remain visible and no
  decision's status silently changes (a structural move is not a decision).
- **Historical maps remain available but cannot override current
  authority** (Appendix B).
- **Runtime reality never silently becomes curriculum intent** — Axis-B
  facts are recorded as facts; intent changes need decisions.

## 16. Path to the Curriculum Bible

The full Curriculum Bible is authored only when the layer is mature enough
to justify it — at minimum:

- the **first Capability Arcs are composed**;
- ~~the **PRJ-015 accounting contract is resolved**~~ — **✅ satisfied
  2026-07-29** (Item-Counting Contract v1.0, Canonical). The Curriculum
  Bible **still remains blocked** by every other condition below;
- the **post-L17 horizon is meaningfully authored** (not just banded);
- the **tense architecture is at least bounded** (which systems, in what
  macro-order, even if exact lessons stay open);
- **skill progression is more fully specified** than Reading-only;
- an **assessment/remediation posture is defined**;
- the **major spec-versus-runtime prerequisite gaps are reconciled**
  (starting with §8's repair pair).

No date and no lesson-count threshold is set — maturity is judged by the
founder at a future sign-off, not by a number.

---

## Appendix A — Current L0–L17 spine (compact)

L0 bridge → L1 Survival Kit → L2 Être → L3 Non → L4 J'ai → L5 Un/une →
L6 integration (last visible) → L7 Je vais (compact doorway; blocked) →
L8 C'est où ? → L9 Faire une pause → L10 integration → L11 Je peux →
L12 Est-ce que → L13 integration → L14 J'y vais → L15 Il faut →
L16 integration + reading seed (spec-only) → L17 Ça va ? (spec-only).
Statuses per §5; per-lesson detail in the discovery §5 and the underlying
`docs/syllabus/` specs.

## Appendix B — Superseded / historical macro-maps

| Artifact | Location | Status after FQ-C2 |
|---|---|---|
| 12-unit / 180-lesson CEFR-topic map | `docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md` §38–§39 | Historical/reference planning input (file unedited; non-curriculum content unaffected) |
| "Core 150" | `obsidian-product-brain/ACTIVE_CODEX/10_OPERATIONS/Syllabus Production Workflow.md` | Historical/reference planning input (file unedited) |
| "120–200 lessons" | `docs/CAIRN_PRODUCT_DEFINITION_v0.1.md` (already SUPERSEDED) | Remains superseded |
| Legacy v7 24-lesson syllabus (M1–M4, L14 paywall) | `lemot-app/data/lessons/*`, `obsidian-product-brain/ACTIVE_CODEX/90_HISTORY/Historical Syllabus.md` | Remains SUPERSEDED and quarantined — never revive |
| "2→1; never >2" cadence; "every 4–5 lessons" | `obsidian-product-brain/ACTIVE_CODEX/04_SYLLABUS/Integration Lesson Logic.md` | Superseded rule / historical heuristic per §6 (file unedited) |

## Appendix C — Open-dependency register (pointer)

The authoritative open list is §13 plus the discovery §18 and the Project
Register (PRJ-001, -012, -015, -016, -018, -023, -029, -036). This appendix
is a pointer, not a second register.

## Appendix D — Source / provenance map (pointer)

The full source map is the discovery's §23. This Charter's own rulings each
cite provenance inline (CC-001…CC-010 ↔ FQ/CUR references).

## Appendix E — Founder decision crosswalk

| Founder decision (2026-07-28) | Charter section | CC ID |
|---|---|---|
| FQ-C0 — Charter as Step-2 v0.x vehicle | banner, §1, §16 | — (governance frame) |
| FQ-C1 — L0–L17 authoritative spine, tiered | §5 | CC-004 |
| FQ-C2 — hierarchy controls; macro-maps demoted | §4, Appendix B | CC-003 |
| FQ-C4 — Integration Rhythm Contract binding | §6 | CC-005 |
| FQ-C8 — repair pair homes in L1 redesign | §8 | CC-007 |
| FQ-C3 (derived — not approved) | §9, §13 | CC-008 records the open state |
| FQ-C5/C6/C7 (deferred / current-state) | §13 | — |

---

*End of Cairn Curriculum Charter v1.0 — Canonical, founder-signed
2026-07-28. Not the Curriculum Bible; Step 2's full scope remains open.
Canonical does not mean implemented; authorizes no implementation. Open
dependencies (§13) and stop conditions (§14) remain binding.*
