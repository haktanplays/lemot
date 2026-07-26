---
title: Mastery & Evidence Decision Matrix v0.1
version: 0.1
status: Draft — supporting record for the Mastery & Evidence Bible v1.0 Draft
authority: none — a register, not a decision
owner: Mastery & Evidence
created: 2026-07-26
---

# Mastery & Evidence Decision Matrix v0.1 — DRAFT

Every semantic question this domain must answer, registered once. **`ME-001` … `ME-060`, contiguous,
no gaps, no duplicate semantic questions.**

> **Round 1 partial ratification (2026-07-26).** Founder decisions **FQ-1**, **FQ-6** and **FQ-8** are
> applied. **Eight rows** moved to `INH-FOUNDER` / `LOCKED`: ME-004, ME-007, ME-011, ME-012, ME-027,
> ME-032, ME-047, ME-048. **FQ-2, FQ-3, FQ-4, FQ-5 and FQ-7 remain unanswered** — seven rows still
> require a founder decision. **Every ratification is semantic only: no code, tag, threshold, ADR,
> validator or legacy system changed, and no implementation was authorized.**

> **This register decides nothing on its own.** A row marked `PROPOSED` is this Draft's proposal, not a
> rule. A row marked `CURRENT-REALITY` describes code and is **not** a decision. A row marked
> `INH-FOUNDER` restates a founder decision — and a ratified *semantic* rule is never a statement that
> the runtime does it (see each row's "current implementation" column in Table B).

**Presentation note.** The eighteen required fields are split across two tables that share the `ME-###`
key, because an eighteen-column table is unreadable. **Table A** carries the ruling fields (question,
proposed rule, ratification state, decision status, owner, founder-decision-required, timing).
**Table B** carries the provenance and reality fields (source authority, exact source, consulted layers,
current implementation, enforcement status, conflict, tunable-vs-invariant, downstream dependencies,
weakest-member audit result, notes). Every ID appears in both.

**Ratification states:** `INH-FOUNDER` · `INH-CANONICAL` · `INH-ADR` · `PROPOSED` · `CURRENT-REALITY` ·
`OPEN` · `DEFERRED` · `SUPERSEDED` · `NON-SIGNAL` · `DEPENDENCY`.
**Decision statuses:** `LOCKED` (a ratified decision exists) · `PROPOSED` · `OPEN` · `DEFERRED` ·
`DESCRIPTIVE` (a fact, not a decision).

---

## Table A — the ruling

| ID | Semantic question | Proposed rule | Ratification state | Decision status | Owner | Founder decision required | Timing |
|---|---|---|---|---|---|---|---|
| ME-001 | What is the canonical source of truth for evidence? | An append-only event log; everything else is a projection. | `INH-ADR` | `LOCKED` | Mastery & Evidence | No | — |
| ME-002 | Is mastery stored state or derived? | Derived. A policy change re-derives, never migrates. | `INH-ADR` | `LOCKED` | Mastery & Evidence | No | — |
| ME-003 | Are "opportunity", "action", "result", "event", "evidence" distinct? | Yes — five distinct concepts, never interchangeable. | `PROPOSED` | `PROPOSED` | Mastery & Evidence | No | Before promotion |
| ME-004 | Does an event automatically constitute admissible evidence? | **No.** Admissibility is a separate gate: where a non-learner error is knowable before admission, the result is not admitted. | `INH-FOUNDER` (FQ-6, 2026-07-26) | `LOCKED` | Mastery & Evidence | Answered — FQ-6 | Answered 2026-07-26 |
| ME-005 | Are completion / reveal / display / AI praise mastery? | No — all four are non-signals. | `NON-SIGNAL` | `LOCKED` | Mastery & Evidence | No | — |
| ME-006 | May a social action be evidence? | Engagement never; a pedagogical action only under a separately ratified contract. | `INH-FOUNDER` | `LOCKED` | Mastery & Evidence (Social supplies the negative bound) | No | — |
| ME-007 | What creates weakness? | Only verified learner-sourced error. Content, validator, UI-flow, tone, AI-generator, **system** and mastery-mapping errors never create learner weakness. | `INH-FOUNDER` (FQ-6, 2026-07-26; was `INH-CANONICAL`) | `LOCKED` | Mastery & Evidence | Answered — FQ-6 | Answered 2026-07-26 |
| ME-008 | What are the error-source classes? | **Eight:** learner · content · validator · UI-flow · tone · AI-generator · **system** · mastery-mapping. (`system` added by the FQ-6 founder wording, 2026-07-26; the seven non-learner classes are the excluded set.) | `INH-CANONICAL` + `INH-FOUNDER` refinement (FQ-6, 2026-07-26) | `LOCKED` | Mastery & Evidence | No | — |
| ME-009 | Can an exposure/ghost production failure create weakness? | No — production was never required. | `INH-CANONICAL` | `LOCKED` | Mastery & Evidence | No | — |
| ME-010 | What is the grading vocabulary and may it change? | 16 frozen `ErrorTagCode` values; immutable forever (YASA 3). | `INH-ADR` | `LOCKED` | Engineering (enforcement) / M&E (meaning) | No | — |
| ME-011 | How many result buckets exist? | **Superseded question.** Polarity is meaning-based, not bucket-based: the code's five buckets and ADR-0021's four were both answering the wrong question. Buckets describe tags; polarity describes meaning. | `INH-FOUNDER` (FQ-1, 2026-07-26) | `LOCKED` (semantics) | Mastery & Evidence | Answered — FQ-1 | Answered 2026-07-26 |
| ME-012 | Is `spelling_near_miss` precision or weakness-accruing? | **Neither — it is an ambiguous technical tag.** Meaning-preserving slip = precision; meaning-changing substitution = may be negative evidence. The tag alone proves neither, and an ambiguous event may not establish weakness. | `INH-FOUNDER` (FQ-1, 2026-07-26) | `LOCKED` (semantics) | Mastery & Evidence | Answered — FQ-1 | Answered 2026-07-26 |
| ME-013 | What does a skip mean? | Neutral; `skipCount++`; item stays due now. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-014 | Is `meaning_shift` ever emitted? | No — no safe deterministic trigger exists. | `CURRENT-REALITY` | `DESCRIPTIVE` | Engineering | No | — |
| ME-015 | May AI produce or override a grade? | AI explains; it never overrides. | `INH-ADR` | `LOCKED` | Mastery & Evidence | No | — |
| ME-016 | Are recognition and production distinct evidence types? | Yes; counted separately. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-017 | Should recognition success advance scheduling as much as production success? | Today it does, identically. Canon implies it should not. | `OPEN` | `OPEN` | Mastery & Evidence | **Yes — FQ-2** | Before promotion |
| ME-018 | What promotes an item into Mon Lexique? | `productionSuccess > 0`. Recognition alone never auto-adds. | `INH-CANONICAL` | `LOCKED` | Mastery & Evidence | No | — |
| ME-019 | May evidence weight and selection weight mix? | Never. Separate modules, separate tests. | `INH-ADR` | `LOCKED` | Mastery & Evidence | No | — |
| ME-020 | Does differential evidence weighting exist? | Canon asserts a multiplier in the reducer; the reducer has none. | `OPEN` | `OPEN` | Mastery & Evidence | **Yes — FQ-2** | Before promotion |
| ME-021 | How is assistance level represented? | Prompt-fade PF0–PF3 only. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-022 | Does hint usage change evidence strength? | It cannot today — hint level never reaches the event. | `OPEN` | `OPEN` | Mastery & Evidence | **Yes — FQ-3** | Before promotion |
| ME-023 | Is a reveal evidence? | No. | `NON-SIGNAL` | `LOCKED` | Mastery & Evidence | No | — |
| ME-024 | Are open Weave and Say It Your Way graded? | No — grading an open mixed Weave is a validator ERROR; Say It never grades. | `INH-CANONICAL` | `LOCKED` | Content | No | — |
| ME-025 | Do discovery screens produce evidence? | No. Assessment begins after Build. | `INH-CANONICAL` | `LOCKED` | Content / Curriculum | No | — |
| ME-026 | What is the weakness threshold? | `wrongCount >= 3` OR any single weak tag `>= 3`. **FQ-1 constrains what may count toward it** — an ambiguous event may not contribute to weakness — but the threshold class itself is still FQ-7. | `CURRENT-REALITY` | `OPEN` | Mastery & Evidence | Yes — FQ-7 (class, not value) | Before promotion |
| ME-027 | What is weakness keyed by? | Engine: `ItemId`. Legacy shipped: the correct-answer string. **Both systems are inside this Bible's domain; the legacy one is non-conforming, frozen, and not authorized for modification.** The keying divergence itself remains an unresolved Axis-B fact. | `INH-FOUNDER` (FQ-8, 2026-07-26 — scope only) | `LOCKED` (scope) | Mastery & Evidence (scope) / Engineering (convergence) | Answered — FQ-8 | Answered 2026-07-26 |
| ME-028 | Does a single miss force a return? | No. | `INH-CANONICAL` | `LOCKED` | Mastery & Evidence | No | — |
| ME-029 | When is an item repair-eligible? | Same error twice in one lesson, or once in each of two lessons. | `INH-CANONICAL` | `LOCKED` (threshold `TUNABLE`) | Mastery & Evidence | No | — |
| ME-030 | What does a successful repair do? | Reduces urgency only. Never restores mastery, never erases history. | `INH-CANONICAL` | `LOCKED` | Mastery & Evidence | No | — |
| ME-031 | How does a repair override close? | One successful spaced confirmation in the next 1–2 lessons. | `INH-CANONICAL` | `LOCKED` | Mastery & Evidence | No | — |
| ME-032 | May precision-only become conceptual weakness? | Never silently — and, under FQ-1, an event whose semantic class is not attributable may not establish weakness at all. | `INH-FOUNDER` (FQ-1, 2026-07-26; was `INH-CANONICAL`) | `LOCKED` | Mastery & Evidence | Answered — FQ-1 | Answered 2026-07-26 |
| ME-033 | Is mastery a named state ladder or counters? | Counters win today; no nine-state set exists anywhere. | `SUPERSEDED` (the "9-state" description) | `OPEN` | Mastery & Evidence | **Yes — FQ-5** | Before promotion |
| ME-034 | What is the spacing schedule? | Leitner boxes `[0,1,3,7,30]` days, 5 boxes. | `CURRENT-REALITY` | `OPEN` (class) | Mastery & Evidence | Yes — FQ-7 | Before promotion |
| ME-035 | When is `dueAt` rescheduled? | Only on box-moving success/failure; precision, near-miss and skip stay due now. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-036 | How is `monLexiqueStatus` derived? | weak → weak; else productionSuccess>0 → added; else hidden. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-037 | How is practice eligibility derived? | weak → challenge; produced → stretch; seen/recognized → build; else none. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-038 | Is `recycled` a mastery status? | No — a query-time carryover role. | `INH-CANONICAL` | `LOCKED` | Mastery & Evidence | No | — |
| ME-039 | What is the Lexique lifecycle status set? | 8 intrinsic statuses; `recycled` deliberately absent. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-040 | How are duplicate events handled? | Idempotent by `clientEventId`. | `CURRENT-REALITY` | `DESCRIPTIVE` | Engineering | No | — |
| ME-041 | How is a multi-step chain aggregated? | Repeated successes within one chain attempt de-duplicated; every non-success always carries targets. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence (semantics) / Engineering (placement) | No | — |
| ME-042 | Can later evidence undo earlier evidence? | Counters are monotone; only box and prompt-fade move both ways. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-043 | Is the reducer order-invariant? | No. Counters are order-independent; box, prompt-fade and `dueAt` are not. | `CURRENT-REALITY` | `OPEN` | Mastery & Evidence | No (routed) | Deferred |
| ME-044 | Does evidence decay with time? | Not in the reducer. Only the due date passes. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-045 | Is there a second decay model? | Yes — Lexique Memory half-lives 5/14 days, unwired. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-046 | Is weakness permanently residual? | Lexique Memory floors it at 0.15 once ever-weak; the reducer has no such concept. | `OPEN` | `OPEN` | Mastery & Evidence | **Yes — FQ-4** | Before promotion |
| ME-047 | How is a non-learner-sourced event excluded? | **Refused at admission** where the error is knowable beforehand. Semantics ratified; **no mechanism exists.** | `INH-FOUNDER` (FQ-6, 2026-07-26) | `LOCKED` (semantics) | Mastery & Evidence (semantics) / Engineering (mechanism) | Answered — FQ-6 | Answered 2026-07-26 |
| ME-048 | How is an already-recorded event invalidated? | **Append-only compensating invalidation record.** The historical event stays immutable; projections neutralize its pedagogical effect; audit history stays intact; evidence is never deleted or silently mutated. | `INH-FOUNDER` (FQ-6, 2026-07-26) | `LOCKED` (semantics) | Mastery & Evidence (semantics) / Engineering (mechanism) | Answered — FQ-6 | Answered 2026-07-26 |
| ME-049 | Must solo, AI-supported and future-social actions meet one standard? | Yes — the same six admissibility conditions. | `PROPOSED` | `PROPOSED` | Mastery & Evidence | No | Before promotion |
| ME-050 | Is AI praise validation? | No. | `NON-SIGNAL` | `LOCKED` | Mastery & Evidence | No | — |
| ME-051 | Who owns what an authored action was meant to teach? | Content. | `INH-CANONICAL` | `LOCKED` | Content | No | — |
| ME-052 | Who owns when evidence opportunities appear? | Curriculum. | `DEPENDENCY` | `OPEN` | Curriculum | No (routed) | Deferred |
| ME-053 | Who owns event schemas, storage and enforcement? | Engineering. | `DEPENDENCY` | `OPEN` | Engineering | No (routed) | Deferred |
| ME-054 | Who owns positive social evidence semantics? | Not Social. Mastery & Evidence, under a ratified contract. | `INH-FOUNDER` | `LOCKED` | Mastery & Evidence | No | — |
| ME-055 | Who owns retention of learner answer text? | Privacy / Legal. | `DEPENDENCY` | `OPEN` | Privacy / Legal | No (routed) | Deferred |
| ME-056 | Who owns evidence-system QA and audit cadence? | Operations & QA. | `DEPENDENCY` | `OPEN` | Operations & QA | No (routed) | Deferred |
| ME-057 | Does evidence exist in the shipped product today? | No — the shipped renderer emits no learning events. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-058 | May engine progress be written into the legacy store? | No fake `lm7` markers; a shim must be stage-guarded, temporary, non-canonical, documented. | `INH-ADR` | `LOCKED` | Engineering | No | — |
| ME-059 | Is telemetry evidence? | No — local-only content debugging; never updates mastery; no raw learner text. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-060 | Is the mastery snapshot persisted as primary state? | No — recomputed from events each run; compaction stores a cursor snapshot, not truth. | `CURRENT-REALITY` | `DESCRIPTIVE` | Engineering | No | — |

---

## Table B — provenance and reality

| ID | Source authority | Exact source | Consulted layers | Current implementation | Enforcement | Conflict | Tunable / Invariant | Downstream dependencies | Weakest-member audit | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| ME-001 | Active ADR | ADR-0009 (`active`/`canonical`) | Engineering | `lm_le_events` + `scoreEvents` | Unit-tested, sandbox-only | — | Invariant | ME-002, ME-023, ME-048 | n/a | North star: "Events remember." |
| ME-002 | Active ADR | ADR-0009 | Engineering | Snapshot recomputed each run | Unit-tested | — | Invariant | ME-060 | n/a | Version bump v0.1→v0.2 needed no migration. |
| ME-003 | This Draft | Bible §3 | all | No such distinction in code | None | — | Invariant (proposed) | ME-004, ME-011 | n/a | Most existing contradictions trace to conflating these. |
| ME-004 | **Founder decision FQ-6** (2026-07-26) | Bible §6, §23; Ratification record §3 | Content, Engineering | **Absent** — classification flows straight to counters | **None** | Semantic rule ratified; implementation gap unchanged | Invariant (I-21) | ME-047, ME-048, ME-049 | n/a | Ratified 2026-07-26. **No implementation authorized.** Still the largest structural gap. |
| ME-005 | Canonical domain source | Error Tracking System §4 (imported taxonomy); Mastery Model Policy Hardening | Content | Not expressed | Policy only | — | Invariant | ME-023, ME-050 | 4 of 4 members checked | Complete set, not a sample. |
| ME-006 | Founder decision | R8 / SOC-026; Social Charter §13 | Social, Content, Curriculum | No social surface exists | n/a | — | Invariant | ME-049, ME-054, PRJ-009 | 14 of 14 enumerated non-signals quoted | No contract exists → nothing social is evidence today. |
| ME-007 | **Founder decision FQ-6** (2026-07-26), on top of Error Tracking System Policy Hardening 2026-07-18 `[HARD INVARIANT]` | Bible §7, §23; Ratification record §3 | Content, Engineering | **No error-source field** | Policy only | Canon-vs-code, unchanged | Invariant | ME-008, ME-047 | **7 non-learner classes confirmed covered** (founder wording adds *system*) | Ratified 2026-07-26. Every non-success is still attributed to the learner by default. **No implementation authorized.** |
| ME-008 | Canonical domain source + **founder FQ-6 refinement** (2026-07-26) | Error Tracking System §Kaynak içe aktarımı §5; Ratification record §3 | Content, Operations | Absent | Policy only | Canon-vs-code, unchanged | Invariant | ME-047 | **8 of 8 classes listed** (was 7; `system` added by the founder wording). **0 of 7 excluded classes enforced.** | Count change recorded explicitly, not absorbed. |
| ME-009 | Canonical domain source | same | Content | Absent | Policy only | Canon-vs-code | Invariant | ME-007 | n/a | — |
| ME-010 | Active ADR | ADR-0013; `events.ts:31-47`; `shipped-error-tags.json` | Engineering | 16 values; compile-time exhaustiveness lock | **`validate:content` hard error, both directions** | — | Invariant | ME-011, ME-048 | 16 of 16 enumerated; manifest verified at 54 | Strongest enforcement in the domain. |
| ME-011 | **Founder decision FQ-1** (2026-07-26) | Bible §10, §15; Ratification record §2 | Content, Curriculum | **Five** buckets, unchanged | Unit-tested, unchanged | Semantic question superseded; **code/ADR divergence persists** | Locked (semantics) | ME-012, ME-032 | 5 code buckets re-verified; neither 4 nor 5 is the canonical frame | ADR-0021 still says four and **was not amended**. |
| ME-012 | **Founder decision FQ-1** (2026-07-26) | Bible §15; Ratification record §2 | Content, Curriculum | Accrues `weakTags` → can make an item weak | Unit-tested (`nearMissMasteryTiming.test.ts`), unchanged | **Current code is provisional and non-conforming where meaning is unknown** | Locked (semantics) | ME-011, ME-026, ME-032 | Re-run: `punctuation_only` precision · `accent_only` precision **with a stated French counter-example exception** · `spelling_near_miss` **undetermined**. **No universal claim made that the three share a polarity.** | Semantics ratified; **ADR-0021 amendment pending**; **no code change authorized**. |
| ME-013 | Current reality | `mastery.ts:203,238,260,275` | — | `skipCount++`, stays due | Unit-tested | Audit B12 called skip's old timing "questionable" | Tunable | ME-035 | n/a | — |
| ME-014 | Current reality | `grade.ts:119,224` | — | Never emitted | Unit-tested | — | — | ME-010 | 4 of 16 codes never emitted, all four named | A registry-aware adapter could emit 3 of the 4 later. |
| ME-015 | Active ADR | ADR-0009 | AI layer | AI is not in the grading path | Structural | — | Invariant | ME-050 | n/a | — |
| ME-016 | Current reality | `mastery.ts:45-73,222-268` | — | Six separate counters | Unit-tested | — | Descriptive | ME-017, ME-018 | n/a | — |
| ME-017 | Current reality vs canon | `mastery.ts:224-252` vs ADR-0022, Lesson Flow Canon §5.3/§5.5 | Curriculum, Content | **Identical box/PF advance** | Unit-tested | **Canon-vs-code** | Open | ME-020, ME-034 | `PRODUCTION_OPS` = 4 of 4 members read | Recognition is gated for Mon Lexique but not for scheduling. |
| ME-018 | Canonical domain source + code | Mon Lexique note; `mastery.ts:283-288` | Content | Implemented | Unit-tested, sandbox-only | — | Invariant | ME-036 | n/a | — |
| ME-019 | Active ADR | ADR-0022; Lesson Flow Canon §5.3 | — | `practice-selector.ts` "never scores anything" | Unit-tested + module separation | — | Invariant | ME-020, ME-026 | n/a | — |
| ME-020 | Canon asserts; code absent | ADR-0022 ("evidence weight = mastery multiplier"); §5.5 `LessonEvidenceProfile`; `lexique-memory.ts` weights | Curriculum, Content | **No weighting in the reducer**; weights exist only in an unwired projection | **None** | **Canon asserts an implementation that does not exist** | Open | ME-017, ME-045 | 3 sources compared; all three differ | Canon names the reducer as the home; the reducer has no such concept. |
| ME-021 | Current reality | `mastery.ts:35-36` | — | PF0–PF3 | Unit-tested | — | Tunable (depth) | ME-022 | 4 of 4 levels enumerated | — |
| ME-022 | Gap | EXERCISE_CANON §8 (ladder exists); `events.ts:107-126` (no hint field) | Content, Engineering | **Hint level never reaches the event** | None | Semantic gap | Open | ME-004, ME-049 | n/a | A hinted and unhinted success are indistinguishable to mastery. |
| ME-023 | Canonical domain source | imported measurement taxonomy | Content | Reveal is a UI action, not an event input | Policy only | — | Invariant | ME-005 | n/a | — |
| ME-024 | Canonical domain source | EXERCISE_CANON §16; `SayItYourWayV1.tsx` | Content | Implemented and shipped | Validator ERROR + component contract | — | Invariant | ME-025 | n/a | Content-owned; recorded here as an input. |
| ME-025 | Canonical domain source | Lesson Flow Canon §1.3 | Content, Curriculum | Implemented in flow | Design canon | — | Invariant | ME-005 | n/a | — |
| ME-026 | Current reality | `mastery.ts:26,279-281` | Curriculum | `WEAK_THRESHOLD = 3` | Unit-tested | Value has no founder source | **Tunable (proposed)** | ME-027, ME-037 | n/a | A constant is not a decision. |
| ME-027 | **Founder decision FQ-8** (2026-07-26) | Bible §2.1, §14; Ratification record §4 | Engineering, Product | **Both live, in different stages** | Legacy shipped; engine sandbox-only | **Scope resolved; the two-system divergence is NOT resolved** | Locked (scope) / Open (convergence) | ME-057, ME-058 | 4 evidence systems audited: engine (conforming, unshipped) · legacy weak spots ✘ · legacy SRS ✘ · per-section thresholds ✘ | Both governed. Legacy = legacy-active, non-conforming, frozen for replacement. **Not authorized for modification.** |
| ME-028 | Canonical domain source | Error Tracking Policy Hardening | Curriculum | Not implemented | Policy only | — | Invariant | ME-029 | n/a | — |
| ME-029 | Canonical domain source | same, `[LOCKED DEFAULT]` / threshold `[TUNABLE]` | Curriculum, Content | **Not implemented** — no `repairEligible` field | Policy only | — | Locked shape, tunable value | ME-030, ME-031 | n/a | Source explicitly says the number is not empirical. |
| ME-030 | Canonical domain source | Mastery Model + Error Tracking Policy Hardening | — | Not implemented | Policy only | — | Invariant | ME-046 | n/a | — |
| ME-031 | Canonical domain source | Error Tracking Policy Hardening | Curriculum | Not implemented | Policy only | — | Locked default | ME-030 | n/a | — |
| ME-032 | **Founder decision FQ-1** (2026-07-26), on top of Error Tracking Policy Hardening | Bible §15; Ratification record §2 | Content | **Still contradicted in practice by ME-012** | Policy only | Conflicts with current code, unchanged | Invariant (I-24) | ME-012 | See ME-012 — no universal three-tag claim is made | Strengthened: ambiguity now blocks weakness, not just "silent" conversion. **No implementation.** |
| ME-033 | Superseded description | precision-policy §4; `learning-engine-v1.md:100` | Content, Curriculum | 3 / 4 / 8 / 5 / 4 candidate ladders; **no set of nine** | Docs only | Docs-drift | Open | ME-036, ME-037, ME-039 | **Five candidate ladders enumerated; none has nine members** | "Counters win" is the only stated resolution. |
| ME-034 | Current reality | `mastery.ts:29-32` | Curriculum | `[0,1,3,7,30]`, 5 boxes | Unit-tested | Value has no founder source | **Tunable** | ME-035, ME-045 | 5 of 5 intervals listed | — |
| ME-035 | Current reality | `mastery.ts:273-277` (audit B12) | — | Implemented | Unit-tested | — | Descriptive | ME-013 | 3 keep-due-now classes enumerated | — |
| ME-036 | Current reality | `mastery.ts:283-288` | Content | Implemented | Unit-tested | — | Descriptive | ME-018 | 3 of 3 statuses | — |
| ME-037 | Current reality | `mastery.ts:291-298` | — | Implemented | Unit-tested | — | Descriptive | ME-026 | 4 of 4 values; `challenge ⟹ isWeak` verified | Precision-only reaches `build`, never `challenge`. |
| ME-038 | Canonical domain source + code | Chip Lifecycle; `lexique-memory.ts:61-71`; `carryover-selector.ts:6-8` | Curriculum | Implemented as a role, excluded from the status set | Unit-tested (`recycled` absence asserted) | — | Invariant | ME-039 | `recycled` absence explicitly test-asserted | Structural enforcement, unusually strong. |
| ME-039 | Current reality | `lexique-memory.ts:55-71` | — | 8 statuses, fixture/spec-only | Unit-tested, unwired | — | Descriptive | ME-033 | 8 of 8 enumerated | — |
| ME-040 | Current reality | `mastery.ts:193-196` | Engineering | Implemented | Unit-tested | — | Invariant | ME-060 | n/a | — |
| ME-041 | Current reality | `session-controller.ts`; `contextChainMasteryWeight.test.ts` (audit B23 / PR-E2) | Engineering | Implemented **in the controller, not the reducer** | Unit-tested end-to-end | Placement question | Descriptive | ME-020, ME-042 | Success/non-success asymmetry verified in the test | A semantic rule living outside the pure reducer. |
| ME-042 | Current reality | `mastery.ts` (all counters `+=`) | — | Monotone | Unit-tested | — | Descriptive | ME-043, ME-048 | Every counter mutation is an increment — all read | No decrement path exists anywhere. |
| ME-043 | Current reality | `mastery.ts:219-277` | Engineering | Order-dependent for box/PF/`dueAt` | Unit-tested (given an order) | Never stated as a decision | Open | ME-021, ME-042 | n/a | Deterministic ≠ order-invariant. |
| ME-044 | Current reality | `mastery.ts` (no time term) | — | No time decay | Unit-tested | — | Descriptive | ME-045 | n/a | — |
| ME-045 | Current reality | `lexique-memory.ts:27-45` | Curriculum | Half-lives 5/14 d; `WEAKNESS_K 2.0`; floor 0.15 | Unit-tested, **unwired** | Two decay models coexist | **Tunable** | ME-046 | 16 constants read individually | — |
| ME-046 | Current reality vs absence | `lexique-memory.ts:182-183` vs reducer | Curriculum, Content | Floor exists in one unwired module only | Unit-tested, unwired | — | Open | ME-030 | n/a | Pedagogical, not engineering. |
| ME-047 | **Founder decision FQ-6** (2026-07-26) | Bible §23; Ratification record §3 | Content, Engineering, Operations | **No mechanism** | **None** | Ratified semantics with no implementation | Invariant (I-21) | ME-004, ME-048 | 7 of 7 non-learner error-source classes covered by the rule; **0 of 7 enforced** | Semantics only. **No implementation authorized.** |
| ME-048 | **Founder decision FQ-6** (2026-07-26) | Bible §23; Ratification record §3 | Engineering, Privacy | Append-only, **no delete, no compensating record type exists**; tags frozen | **None** | Ratified semantics with no implementation | Invariant (I-20, I-22) | ME-010, ME-042, ME-060 | n/a | Schema, event names, cache invalidation, reconciliation and storage are **Engineering's**, undecided. Compaction still complicates any retroactive change. |
| ME-049 | This Draft, generalizing R8 | Bible §6, §24; R8 seven conditions | Content, Curriculum, Social | Absent | None | — | Invariant (proposed) | ME-004, ME-006, ME-022 | R8's 7 conditions mapped to 6 general conditions | Gives "equivalent standards outside Social" something to point at. |
| ME-050 | Canonical domain source | imported measurement taxonomy; R8 | AI layer | AI not in the grading path | Structural | — | Invariant | ME-005, ME-015 | n/a | — |
| ME-051 | Canonical domain source | Authority & Routing Spec §2.1 | Content | — | Routing | — | Invariant | ME-024, ME-025 | n/a | — |
| ME-052 | Unauthored dependency | Authority & Routing Spec §2.1 | Curriculum | — | None | — | Dependency | ME-025, ME-034, ME-046 | n/a | Routed and stopped. |
| ME-053 | Unauthored dependency | Authority & Routing Spec §2.1 | Engineering | Several active ADRs already bind parts | Partial (ADRs) | — | Dependency | ME-041, ME-048 | n/a | Unusual: partly governed without a Bible. |
| ME-054 | Founder decision | Authority & Routing Spec §2.1; R8 | Social | — | Routing | — | Invariant | ME-006, PRJ-009 | n/a | "Social never owns positive evidence semantics." |
| ME-055 | Unauthored dependency | ADR-0023; Authority & Routing Spec §2.1 | Privacy / Legal | `userAnswer` stores raw learner text | Partial (ADR-0023) | — | Dependency | ME-059 | n/a | Retention lands directly on the evidence log. |
| ME-056 | Unauthored dependency | Authority & Routing Spec §2.1 | Operations & QA | — | None | — | Dependency | ME-038 (audit) | n/a | Routed and stopped. |
| ME-057 | Current reality | `config/productStage.ts`; P3 checkpoint §3; Error Tracking System warning | Engineering, Product | `v1LessonEngine` true **only** in sandbox | n/a | — | Descriptive | ME-027, ME-058 | **All 3 product stages read; exactly one enables the engine** | The domain's most important fact. Under FQ-8: the conforming system does not ship and the shipping systems do not conform. |
| ME-058 | Active ADR | ADR-0020 | Engineering | Honoured — no fake markers written | Source-inspected | — | Invariant | ME-027, ME-057 | n/a | Prevents hiding the two-system debt. |
| ME-059 | Current reality | `telemetry.ts:1-30` | Privacy | Local-only; constructor rejects unknown keys | Runtime rejection + tests | — | Invariant | ME-055 | 15 v0 event types; `repair_*` named as future | Explicitly "NOT a second mastery pipeline". |
| ME-060 | Current reality | `compaction.ts`; `mastery.ts` | Engineering | Snapshot recomputed; compaction stores a cursor | Unit-tested (`compaction.test.ts`) | — | Descriptive | ME-002, ME-048 | n/a | — |

---

## Status summary — recalculated from the rows above

**Total rows: 60 (`ME-001` … `ME-060`, contiguous).**

Counted strictly from **Table A**, one state per row. A row cites at most one ratification state; where
a row's *content* touches two axes (e.g. ME-017 is an `OPEN` question *about* a current-reality fact),
it is counted **once**, under the state in Table A's column.

### By ratification state (post-Round 1)

| State | Count | Δ vs pre-Round 1 | IDs |
|---|---|---|---|
| `CURRENT-REALITY` | 19 | −2 | ME-013, 014, 016, 021, 026, 034, 035, 036, 037, 039, 040, 041, 042, 043, 044, 045, 057, 059, 060 |
| `INH-CANONICAL` | 11 | −2 | ME-008, 009, 018, 024, 025, 028, 029, 030, 031, 038, 051 |
| **`INH-FOUNDER`** | **10** | **+8** | ME-004, 006, **007, 011, 012, 027, 032, 047, 048**, 054 |
| `INH-ADR` | 6 | — | ME-001, 002, 010, 015, 019, 058 |
| `OPEN` | 4 | −2 | ME-017, ME-020, ME-022, ME-046 |
| `DEPENDENCY` | 4 | — | ME-052, ME-053, ME-055, ME-056 |
| `NON-SIGNAL` | 3 | — | ME-005, ME-023, ME-050 |
| `PROPOSED` | 2 | −2 | ME-003, ME-049 |
| `SUPERSEDED` | 1 | — | ME-033 |
| **Total** | **60** | — | — |

### By decision status (post-Round 1)

| Status | Count | Δ | IDs |
|---|---|---|---|
| `LOCKED` | 30 | +6 | ME-001, 002, **004**, 005, 006, 007, 008, 009, 010, **011, 012**, 015, 018, 019, 023, 024, 025, **027**, 028, 029, 030, 031, 032, 038, **047, 048**, 050, 051, 054, 058 |
| `DESCRIPTIVE` | 16 | — | ME-013, 014, 016, 021, 035, 036, 037, 039, 040, 041, 042, 044, 045, 057, 059, 060 |
| `OPEN` | 12 | −5 | ME-017, 020, 022, 026, 033, 034, 043, 046, 052, 053, 055, 056 |
| `PROPOSED` | 2 | −1 | ME-003, ME-049 |
| **Total** | **60** | — | — |

> `LOCKED` means **a decision exists in an upstream authority** — not that the rule is implemented.
> **30 locked rows and zero shipped conforming evidence semantics are not in tension** (ME-057, ME-027).

### Founder decisions — answered and outstanding

| | Count | IDs |
|---|---|---|
| **Answered 2026-07-26 (Round 1)** | **8** | ME-004, ME-007 (FQ-6) · ME-011, ME-012, ME-032 (FQ-1) · ME-027 (FQ-8) · ME-047, ME-048 (FQ-6) |
| **Still require a founder decision** | **7** | ME-017, ME-020 (FQ-2) · ME-022 (FQ-3) · ME-026, ME-034 (FQ-7) · ME-033 (FQ-5) · ME-046 (FQ-4) |
| `Required now` outstanding | **0** | — all three `REQUIRED NOW` questions were answered in Round 1 |

Rows with `Founder decision required = No` but timing `Before promotion` (editorial/structural, not a
founder call): ME-003, ME-049. Rows routed to an unauthored layer and therefore **deferred, not asked**:
ME-043, ME-052, ME-053, ME-055, ME-056 (5).

### Deliberately zero

`PLANNED` **0** · `EXPERIMENT` **0** · **Implemented as ratified semantics: 0 — unchanged by Round 1.**

Round 1 ratified eight rows and implemented none of them. No row in this matrix records a ratified
Mastery & Evidence rule that is live and conforming on any shipping surface: the engine conforms but
does not ship (ME-057), and the shipped legacy systems are governed but non-conforming (ME-027).
