---
title: Cairn Curriculum Founder Ratification
version: 0.1
status: Durable founder-decision record
authority: Founder decisions recorded here bind the Curriculum Charter draft but do not independently constitute the full Curriculum Bible.
owner: Curriculum
date: 2026-07-28
source_discovery: CURRICULUM_LAYER_DISCOVERY_v0.1.md
implementation_authority: none
related:
  - CURRICULUM_LAYER_DISCOVERY_v0.1.md
  - CURRICULUM_CHARTER_v0.1.md
  - ../../canon/CAIRN_PROJECT_CANON_MAP_v1.0.md
  - ../../canon/CAIRN_CANON_COVERAGE_AND_GAPS_v0.1.md
---

# Cairn Curriculum Founder Ratification v0.1

> **Durable founder-decision record — 2026-07-28.** Five decisions
> (FQ-C0, FQ-C1, FQ-C2, FQ-C4, FQ-C8) are recorded here as **binding for the
> Curriculum Charter drafting stage**. This record is not the Curriculum
> Bible, not the Charter, and confers **no implementation authority**.
> Silence on any question not listed in §4 must **not** be interpreted as
> approval (§5).

## 1. Purpose and authority

This record preserves the founder decisions that opened Curriculum Charter
drafting, in durable, quotable form. Its authority is exactly this: the
recorded decisions bind the content of `CURRICULUM_CHARTER_v0.1.md` and any
revision of it prior to promotion. It does not decide anything beyond the
five recorded answers, does not alter any Canonical document, does not
change any PRJ status, and authorizes no code, content, schema, runtime
visibility, or release change.

## 2. Source discovery

All five decisions answer cards prepared in
[`CURRICULUM_LAYER_DISCOVERY_v0.1.md`](CURRICULUM_LAYER_DISCOVERY_v0.1.md)
§20 (discovery of 2026-07-28, audited at main `36f38eb`, refined by the
precision pass at `1055a46`). The discovery's context, alternatives, and
consequence analysis are the decision trail; this record does not restate
them in full and does not supersede them.

## 3. Decision method

The discovery classified nine cards; five were marked blocking/required for
Charter drafting (FQ-C0, C1, C2, C4, C8). On **2026-07-28** the founder
approved the **recommended answer** of each of the five. No alternative was
selected; no card was answered differently from its recommendation; the four
non-blocking cards (FQ-C3, C5, C6, C7) were **not** put to decision and
remain in their classified states.

## 4. Ratified decisions

### FQ-C0 — Step-2 vehicle — APPROVED 2026-07-28

- **Question:** may the Curriculum Charter serve as the vehicle for Step 2
  of the founder-locked authoring sequence, which names "Curriculum Bible"?
- **Approved answer:** the Curriculum Charter is authorized as the **v0.x
  governance and ratification stage of Step 2**. It is **not a permanent
  substitute** for the future Curriculum Bible. The Charter may establish:
  Curriculum ownership boundaries; the current curriculum thesis; the honest
  tiered status of the existing lesson spine; the minimum live contradiction
  resolutions needed for safe planning; and explicit open dependencies.
  A full Curriculum Bible will be authored only when the lesson sequence,
  band architecture, counting model, and post-L17 structure are mature
  enough to justify one.
- **Authority effect:** Charter drafting is authorized; the Charter draft
  gains a legitimate governance path to Canonical via founder sign-off.
- **Superseded/demoted:** nothing — the founder-locked authoring sequence
  (Q3, 2026-07-26) is honored, not amended; the Bible remains the layer's
  end-state document.
- **Preserved open work:** everything a Bible would own beyond the Charter's
  scope — band architecture, counting model, post-L17 sequence, tense
  placement — stays explicitly open.
- **Implementation consequence:** none.
- **Non-consequence:** this does not promote the Charter to Canonical, does
  not declare Step 2 complete, and does not authorize the Bible's drafting.

### FQ-C1 — Authoritative current spine — APPROVED 2026-07-28

- **Question:** what spine may the Charter govern, and at what statuses?
- **Approved answer:** **L0–L17 becomes the authoritative current curriculum
  spine while preserving distinct status tiers**: L0–L6 founder-locked,
  shipped, smoke-accepted, and frozen; L7–L15 approved working sequence,
  runtime-registered but learner-hidden, revisable through future Curriculum
  authority; L16–L17 approved spec-only continuation, not implemented;
  **L18+ not ratified as an authoritative sequence**. "Authoritative current
  spine" means the default source for current planning and dependency
  reasoning. It does **not** mean: every lesson is immutable; every lesson
  is implemented; L7–L17 are promoted to founder-locked; L18+ is approved;
  or the learner-visible cap may be changed.
- **Authority effect:** the spine acquires a named owner-of-record status
  for planning; PRJ-001's "nothing governs sequencing" gap is narrowed to
  post-L17 and to sequencing *policy* beyond the ratified range.
- **Superseded/demoted:** nothing; per-lesson statuses are preserved, not
  flattened.
- **Preserved open work:** post-L17 order; any L7–L15 revision requires
  future scoped Curriculum authority with provenance; per-lesson numeric
  payloads that conflict with upstream Content authority (notably L17's
  "3–5 active" working-spec note, which remains subject to the Content
  Bible's active-new **1–4** invariant and the PRJ-015 accounting
  clarification).
- **Implementation consequence:** none. Current runtime visibility (Home cap
  `<=6`) and all implementation freezes remain unchanged.
- **Non-consequence:** no lesson is built, unhidden, renumbered, or
  reordered by this decision. **Spine ratification does not ratify
  per-lesson item counts that conflict with upstream Content authority —
  no exception to the active-new 1–4 invariant was approved.**

### FQ-C2 — Macro-map status — APPROVED 2026-07-28

- **Question:** what is the formal status of the competing macro-maps
  beneath the Canonical Product Brain hierarchy?
- **Approved answer:** the Canonical Product Brain hierarchy controls:
  **Journey → Capability Arc → Lesson**. The following are **formally
  demoted to historical/reference planning inputs**: the 12-unit /
  180-lesson CEFR-topic map (Build Spec §38); the "Core 150" formulation;
  and any fixed total-course figure that conflicts with the Product Brain
  model. Figures such as 120–180 lessons remain **planning bands, not
  promises**. Future Curriculum work must compose real Capability Arcs
  beneath the Product Brain hierarchy rather than treating topic units as
  the governing course architecture. Historical maps are **not deleted**;
  they are preserved with clear status and provenance.
- **Authority effect:** removes the discovery's C3/C4 organizing-principle
  ambiguity for all future planning.
- **Superseded/demoted:** 12-unit/180 map and "Core 150" → historical/
  reference planning inputs (demoted, preserved).
- **Preserved open work:** Capability Arc composition (none exists);
  post-L17 macro-planning.
- **Implementation consequence:** none.
- **Non-consequence:** the Build Spec itself is not edited or repealed; its
  non-curriculum content is untouched; no lesson-count promise is created.

### FQ-C4 — Integration cadence — APPROVED 2026-07-28

- **Question:** which of the three recorded cadence formulations binds?
- **Approved answer:** the binding authoring/review rule is: **"After three
  consecutive materially-new-engine lessons, the sequence must be reviewed
  before placing a fourth."** Clarifications: integration may occur earlier
  when cognitive load, transfer, repair, or scene-broadening requires it;
  this is an authoring and review rule, **not runtime enforcement**; the
  older "2 new engines → 1 integration; never more than 2 consecutive"
  formulation is **superseded**; "integration every 4–5 lessons" survives
  only as a **historical pacing heuristic**, not a binding rule; a
  preview-only or zero-active-new lesson does **not** automatically count as
  a materially-new-engine lesson; **cadence and recycle reach remain
  distinct concepts**.
- **Authority effect:** resolves discovery conflict §17-C2; every future
  placement has one rule to check.
- **Superseded/demoted:** "2→1; never >2" superseded; "every 4–5 lessons"
  demoted to historical heuristic.
- **Preserved open work:** validator implementation (a future WARNING
  candidate) remains Engineering work, unopened.
- **Implementation consequence:** none.
- **Non-consequence:** no existing planned sequence is retroactively
  invalidated; no runtime enforcement is created or promised.

### FQ-C8 — Repair pair — APPROVED 2026-07-28

- **Question:** where do `je ne comprends pas` and `vous pouvez répéter ?`
  canonically live, given L13 assumes them owned while the runtime never
  shipped them?
- **Approved answer:** the Canonical Curriculum home of **`je ne comprends
  pas`** and **`vous pouvez répéter ?`** is the **L1 Survival Kit
  redesign**. They are **survival/repair chunks, not a later grammar
  engine**. Consequences: L13 may assume these chunks are owned **only
  after** the relevant Content and runtime correction lands; this decision
  does not modify the current runtime; it does not bypass the Round-1
  freeze; implementation requires a **separate reviewed task**; the other
  recorded L1 functional holes (the "oui paradox", `excusez-moi`, the
  state/feeling gap) remain attached to the L1 redesign unless separately
  placed later.
- **Authority effect:** resolves discovery conflict §17-C9 at the intent
  level; spine ratification (FQ-C1) is clean because the implicit
  prerequisite now has a named home and a named gate.
- **Superseded/demoted:** the alternative (next-content-wave insertion) is
  recorded as not chosen.
- **Preserved open work:** the L1 chip-list redesign itself (explicitly
  unlocked); the Content/runtime correction task; disposition of the other
  three holes if ever separated from L1.
- **Implementation consequence:** none now — a future separate reviewed task.
- **Non-consequence:** nothing ships, and L13's spec text is not edited by
  this record.

## 5. Explicit non-decisions

The founder has **not** decided, and silence must not be read as approval
of:

- the PRJ-015 item-counting methodology;
- exact post-L17 lesson order;
- the futur-proche ownership lesson;
- the L18–L24 sequence;
- Capability Arc composition;
- the full tense architecture (passé composé, imparfait, futur simple,
  conditionnel, subjunctive placements);
- assessment and remediation architecture;
- Curriculum Bible completion or its opening;
- any runtime visibility change (the Home `<=6` cap stands);
- L1 redesign implementation timing;
- the Campfire/paywall position under PRJ-036.

## 6. Supersession effects

Applied by the decisions above, all preservation-first:

| Material | New status | Preserved where |
|---|---|---|
| "2 new engines → 1 integration; never >2 consecutive" | SUPERSEDED as a rule | `Integration Lesson Logic.md` (unedited source), discovery §8/§17-C2 |
| "Integration every 4–5 lessons" | Historical pacing heuristic only | same sources |
| 12-unit / 180-lesson CEFR-topic map (Build Spec §38) | Historical/reference planning input | Build Spec (unedited), Charter Appendix B |
| "Core 150" | Historical/reference planning input | Syllabus Production Workflow (unedited), Charter Appendix B |
| Fixed total-course figures conflicting with the PB model | Non-authoritative | Charter §4 |

No source file carrying the superseded wording was edited by this record;
supersession is recorded here and in the Charter, and the source files'
own banners remain the operator's to update via the normal documentation
process (a Sync-Queue-able follow-up, not done unilaterally here).

## 7. Implementation boundaries

Nothing in this record: opens code work (the Q4 freeze stands); changes
runtime visibility; modifies any lesson file, registry, schema, validator,
or test; alters any PRJ status; or satisfies any build gate.
`Canonical ≠ implemented` continues to apply to every document in this
directory.

**PRJ-001 in particular remains `OPEN`, and Charter promotion does not
automatically close or change it.** The Charter may narrow the gap — by
creating a Curriculum authority and governing the current L0–L17 spine —
but it does not complete post-L17 sequencing, Capability Arc composition,
the item-counting methodology, the tense architecture, skill progression,
assessment/remediation, or the full Curriculum Bible. The intended reading
is: *PRJ-001 remains OPEN with narrowed scope: the current L0–L17 spine is
governed, while post-L17 sequencing and the full sequencing architecture
remain unauthored.* Any PRJ-001 status change requires an explicit Project
Register decision/update, with the remaining sequencing-policy scope
assessed at that time. PRJ-015, PRJ-029, and PRJ-036 likewise remain
`OPEN`.

## 8. Open dependencies

Carried forward unchanged: PRJ-015 (counting methodology — first dedicated
post-opening decision track per FQ-C3's classification); PRJ-029 (post-L24);
PRJ-036 (Campfire/paywall); PRJ-012 (Reading taxonomy); PRJ-016 (instruction
weave staging home); PRJ-018 (listening contract); PRJ-023 (A Small Moment);
Capability Arc composition; the Readiness Gate contract, integration need
lists, `LessonEvidenceProfile`, and staged strictness routed by the Mastery
Bible §28; the lesson-section ↔ beat ↔ screen mapping; and the discovery's
§18 open-decision list.

## 9. Charter drafting authorization

By FQ-C0, drafting of `CURRICULUM_CHARTER_v0.1.md` is authorized as the
v0.x governance and ratification phase of Step 2. The Charter must carry
`Draft — awaiting founder sign-off` until the founder explicitly signs off
and promotes it; promotion is a separate future event with its own review.
Drafting the full Curriculum Bible remains unauthorized.

## 10. Change log

| Date | Version | Change | By |
|---|---|---|---|
| 2026-07-28 | 0.1 | Initial record: FQ-C0/C1/C2/C4/C8 approved with recommended answers; non-decisions and supersession effects recorded; Charter drafting authorized. | Cloud session (founder decisions folded) |

*End of Curriculum Founder Ratification v0.1. Binds the Charter draft;
authorizes no implementation; is not the Curriculum Bible.*
