---
title: Mastery & Evidence Decision Matrix v0.1
version: 0.1
status: Supporting record for the Canonical Mastery & Evidence Bible v1.0 — not independent canon
authority: none — a register, not a decision
owner: Mastery & Evidence
created: 2026-07-26
last_updated: 2026-07-27
---

# Mastery & Evidence Decision Matrix v0.1 — supporting record

Every semantic question this domain must answer, registered once. **`ME-001` … `ME-060`, contiguous,
no gaps, no duplicate semantic questions.**

> **All eight founder questions answered (Rounds 1–2, 2026-07-26).** **20 rows** now carry founder
> authority: **18** were already `INH-FOUNDER` after Rounds 1–2 — **16** from the FQ-1…FQ-8 founder
> decisions (Round 1: ME-004, ME-007, ME-011, ME-012, ME-027, ME-032, ME-047, ME-048; Round 2:
> ME-017, ME-020, ME-022, ME-026, ME-030, ME-033, ME-034, ME-046) plus ME-006 and ME-054 from earlier
> founder decisions — and **ME-003 / ME-049 were additionally adopted through the founder-authorized
> Canonical promotion of 2026-07-27**. The eight founder questions remain **eight**; the promotion
> created no ninth or tenth. **Zero rows require a founder decision.**
>
> **That is not the same as "resolved".** 5 rows remain `OPEN` (cross-layer dependencies and one
> unruled Axis-B question), 16 remain `DESCRIPTIVE`, **0 remain `PROPOSED`** (ME-003 and ME-049 were
> adopted by the 2026-07-27 promotion). **Every ratification is semantic only: no code, tag,
> threshold, interval, ADR, canon source, validator or legacy system changed, and no implementation
> was authorized. Founder-locked exact numeric values: zero.**

> **Promotion state.** The Bible this register supports is **`Canonical` — promoted Draft → Canonical
> on 2026-07-27, founder-authorized.** A genuinely **independent adversarial review by a non-author
> was performed on 2026-07-27 against commit `13cac69`** and returned **`FAIL — PROMOTION BLOCKED`**;
> its blocking findings were remediated in `c103ea5`, and the **independent follow-up review of the
> remediated tip passed** (`PASS WITH NON-BLOCKING FINDINGS` — see
> [`MASTERY_EVIDENCE_INDEPENDENT_REVIEW_v0.1.md`](MASTERY_EVIDENCE_INDEPENDENT_REVIEW_v0.1.md)),
> closing the independent-review gate. **This register remains a supporting record at v0.1 — not
> Canonical. The promotion adopted the two surviving pre-promotion proposals (ME-003, ME-049) as
> Canonical semantic policy — their rows now record that adoption — and changed no other Matrix row,
> no implementation or enforcement field, and authorized no implementation.**

> **This register decides nothing on its own.** A row marked `PROPOSED` would be a pre-adoption
> proposal, not a rule — **no current row is `PROPOSED`**; the last two (ME-003, ME-049) were adopted
> by the founder-authorized promotion of 2026-07-27. A row marked `CURRENT-REALITY` describes code and
> is **not** a decision. A row marked `INH-FOUNDER` restates a founder decision — and a ratified
> *semantic* rule is never a statement that the runtime does it (see each row's "current
> implementation" column in Table B).

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
| ME-003 | Are "opportunity", "action", "result", "event", "evidence" distinct? | Yes — five distinct concepts, never interchangeable. | `INH-FOUNDER` (promotion adoption, 2026-07-27) | `LOCKED` | Mastery & Evidence | No | Ratified with Canonical promotion, 2026-07-27 |
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
| ME-017 | Should recognition success advance scheduling as much as production success? | **No.** Recognition-only evidence must never independently reach the longest review interval or the strongest mastery claim. Exact algorithm is Engineering's. | `INH-FOUNDER` (FQ-2, 2026-07-26) | `LOCKED` (semantics) | Mastery & Evidence (semantics) / Engineering (algorithm) | Answered — FQ-2 | Answered 2026-07-26 |
| ME-018 | What promotes an item into Mon Lexique? | `productionSuccess > 0`. Recognition alone never auto-adds. | `INH-CANONICAL` | `LOCKED` | Mastery & Evidence | No | — |
| ME-019 | May evidence weight and selection weight mix? | Never. Separate modules, separate tests. | `INH-ADR` | `LOCKED` | Mastery & Evidence | No | — |
| ME-020 | Does differential evidence weighting exist? | **Semantically yes — strength attaches at admission.** Production > recognition for independent use. **The claim that a weighting mechanism already exists in the reducer is retired.** No multiplier, interval or weight is founder-ratified. | `INH-FOUNDER` (FQ-2, 2026-07-26) | `LOCKED` (semantics; **all values `TUNABLE`**) | Mastery & Evidence (semantics) / Engineering (algorithm) | Answered — FQ-2 | Answered 2026-07-26 |
| ME-021 | How is assistance level represented? | Prompt-fade PF0–PF3 only. **FQ-3 rules this insufficient**: prompt-fade history is not a substitute for attempt-level assistance attribution, which does not exist. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence (semantics) / Engineering + UX (fields) | No | — |
| ME-022 | Does hint usage change evidence strength? | **Assistance changes what a success proves, not whether the action exists.** Assisted success is valid evidence of *supported* performance, never equivalent to independent production. Unknown assistance does **not** invalidate history but cannot establish independent production. Prompt-fade is **not** a substitute for attempt-level attribution. | `INH-FOUNDER` (FQ-3, 2026-07-26) | `LOCKED` (semantics) | Mastery & Evidence (semantics) / Engineering + UX (fields, representation) | Answered — FQ-3 | Answered 2026-07-26 |
| ME-023 | Is a reveal evidence? | No. **FQ-3 rule 4 confirms and widens this**: reveal, answer exposure, model answer and copy-ready output are **exposure/support events**, never mastery evidence. | `NON-SIGNAL` (reaffirmed by FQ-3, 2026-07-26) | `LOCKED` | Mastery & Evidence | No | — |
| ME-024 | Are open Weave and Say It Your Way graded? | No — grading an open mixed Weave is a validator ERROR; Say It never grades. | `INH-CANONICAL` | `LOCKED` | Content | No | — |
| ME-025 | Do discovery screens produce evidence? | No. Assessment begins after Build. | `INH-CANONICAL` | `LOCKED` | Content / Curriculum | No | — |
| ME-026 | What is the weakness threshold? | **Class ratified as `TUNABLE`; the value `3` is NOT founder-locked.** The locked promise is only that *one isolated error does not automatically establish weakness*. FQ-1 additionally bars ambiguous events from contributing. | `INH-FOUNDER` (FQ-7, 2026-07-26 — **class only**) | `LOCKED` (class = `TUNABLE`; **value unratified**) | Mastery & Evidence (promise) / Engineering (value) | Answered — FQ-7 | Answered 2026-07-26 |
| ME-027 | What is weakness keyed by? | Engine: `ItemId`. Legacy shipped: the correct-answer string. **Both systems are inside this Bible's domain; the legacy one is non-conforming, frozen, and not authorized for modification.** The keying divergence itself remains an unresolved Axis-B fact. | `INH-FOUNDER` (FQ-8, 2026-07-26 — scope only) | `LOCKED` (scope) | Mastery & Evidence (scope) / Engineering (convergence) | Answered — FQ-8 | Answered 2026-07-26 |
| ME-028 | Does a single miss force a return? | No. | `INH-CANONICAL` | `LOCKED` | Mastery & Evidence | No | — |
| ME-029 | When is an item repair-eligible? | Same error twice in one lesson, or once in each of two lessons. | `INH-CANONICAL` | `LOCKED` (threshold `TUNABLE`) | Mastery & Evidence | No | — |
| ME-030 | What does a successful repair do? | Reduces urgency only. **Does not instantly establish strong mastery.** Clears `currently weak` only together with spaced confirmation; never erases `ever weak`. | `INH-FOUNDER` (FQ-4, 2026-07-26; was `INH-CANONICAL`) | `LOCKED` | Mastery & Evidence | Answered — FQ-4 | Answered 2026-07-26 |
| ME-031 | How does a repair override close? | One successful spaced confirmation in the next 1–2 lessons. | `INH-CANONICAL` | `LOCKED` | Mastery & Evidence | No | — |
| ME-032 | May precision-only become conceptual weakness? | Never silently — and, under FQ-1, an event whose semantic class is not attributable may not establish weakness at all. | `INH-FOUNDER` (FQ-1, 2026-07-26; was `INH-CANONICAL`) | `LOCKED` | Mastery & Evidence | Answered — FQ-1 | Answered 2026-07-26 |
| ME-033 | Is mastery a named state ladder or counters? | **Counters are the semantic source of truth; Cairn has no universal named ladder.** "9-state" is `SUPERSEDED`. Domain consumers may define **purpose-named derived projections** that state their mapping and never claim universality. **The eight lifecycle statuses are NOT adopted as universal.** | `INH-FOUNDER` (FQ-5, 2026-07-26; the "9-state" phrase remains `SUPERSEDED`) | `LOCKED` (semantics) | Mastery & Evidence (truth) / each domain owner (own projection) | Answered — FQ-5 | Answered 2026-07-26 |
| ME-034 | What is the spacing schedule? | **The locked promise is only that spaced return exists.** The intervals `[0,1,3,7,30]`, the box count, and the prompt-fade level count are all **`TUNABLE` and NOT founder-locked**. | `INH-FOUNDER` (FQ-7, 2026-07-26 — **class only**) | `LOCKED` (class = `TUNABLE`; **values unratified**) | Mastery & Evidence (promise) / Engineering + Curriculum (values) | Answered — FQ-7 | Answered 2026-07-26 |
| ME-035 | When is `dueAt` rescheduled? | Only on box-moving success/failure; precision, near-miss and skip stay due now. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-036 | How is `monLexiqueStatus` derived? | weak → weak; else productionSuccess>0 → added; else hidden. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-037 | How is practice eligibility derived? | weak → challenge; produced → stretch; seen/recognized → build; else none. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-038 | Is `recycled` a mastery status? | No — a query-time carryover role. | `INH-CANONICAL` | `LOCKED` | Mastery & Evidence | No | — |
| ME-039 | What is the Lexique lifecycle status set? | 8 intrinsic statuses; `recycled` deliberately absent. **FQ-5 rule 6 explicitly declines to adopt these as the universal mastery vocabulary** — they remain one projection among several. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-040 | How are duplicate events handled? | Idempotent by `clientEventId`. | `CURRENT-REALITY` | `DESCRIPTIVE` | Engineering | No | — |
| ME-041 | How is a multi-step chain aggregated? | Repeated successes within one chain attempt de-duplicated; every non-success always carries targets. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence (semantics) / Engineering (placement) | No | — |
| ME-042 | Can later evidence undo earlier evidence? | Counters are monotone; only box and prompt-fade move both ways. **FQ-4 confirms the resulting permanent weakness is Axis-B reality, not intended semantics** — recorded, **not authorized for change**. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-043 | Is the reducer order-invariant? | No. Counters are order-independent; box, prompt-fade and `dueAt` are not. | `CURRENT-REALITY` | `OPEN` | Mastery & Evidence | No (routed) | Deferred |
| ME-044 | Does evidence decay with time? | Not in the reducer. Only the due date passes. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-045 | Is there a second decay model? | Yes — Lexique Memory half-lives 5/14 days, unwired. **FQ-7 classifies every one of its constants as `TUNABLE` and founder-ratifies none**; FQ-2 classifies its weights as **candidate values only**. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-046 | Is weakness permanently residual? | **Two facts, not one.** `currently weak` is **recoverable** (successful repair **plus** spaced confirmation); `ever weak` **persists** as a caution signal. History alone must never keep an item permanently in Challenge. Repair does not instantly establish strong mastery. | `INH-FOUNDER` (FQ-4, 2026-07-26) | `LOCKED` (semantics) | Mastery & Evidence (semantics) / Engineering + Curriculum (clearing conditions, windows) | Answered — FQ-4 | Answered 2026-07-26 |
| ME-047 | How is a non-learner-sourced event excluded? | **Refused at admission** where the error is knowable beforehand. Semantics ratified; **no mechanism exists.** | `INH-FOUNDER` (FQ-6, 2026-07-26) | `LOCKED` (semantics) | Mastery & Evidence (semantics) / Engineering (mechanism) | Answered — FQ-6 | Answered 2026-07-26 |
| ME-048 | How is an already-recorded event invalidated? | **Append-only compensating invalidation record.** The historical event stays immutable; projections neutralize its pedagogical effect; audit history stays intact; evidence is never deleted or silently mutated. | `INH-FOUNDER` (FQ-6, 2026-07-26) | `LOCKED` (semantics) | Mastery & Evidence (semantics) / Engineering (mechanism) | Answered — FQ-6 | Answered 2026-07-26 |
| ME-049 | Must solo, AI-supported and future-social actions meet one standard? | Yes — the same six admissibility conditions. | `INH-FOUNDER` (promotion adoption, 2026-07-27) | `LOCKED` | Mastery & Evidence | No | Ratified with Canonical promotion, 2026-07-27 |
| ME-050 | Is AI praise validation? | No. | `NON-SIGNAL` | `LOCKED` | Mastery & Evidence | No | — |
| ME-051 | Who owns what an authored action was meant to teach? | Content. | `INH-CANONICAL` | `LOCKED` | Content | No | — |
| ME-052 | Who owns when evidence opportunities appear? | Curriculum. | `DEPENDENCY` | `OPEN` | Curriculum | No (routed) | Deferred |
| ME-053 | Who owns event schemas, storage and enforcement? | Engineering. | `DEPENDENCY` | `OPEN` | Engineering | No (routed) | Deferred |
| ME-054 | Who owns positive social evidence semantics? | Not Social. Mastery & Evidence, under a ratified contract. | `INH-FOUNDER` | `LOCKED` | Mastery & Evidence | No | — |
| ME-055 | Who owns retention of learner answer text? | Privacy / Legal. | `DEPENDENCY` | `OPEN` | Privacy / Legal | No (routed) | Deferred |
| ME-056 | Who owns evidence-system QA and audit cadence? | Operations & QA. | `DEPENDENCY` | `OPEN` | Operations & QA | No (routed) | Deferred |
| ME-057 | Does the new learning engine emit `LearningEvent` evidence in shipping stages — and does the shipped product carry any evidence-bearing behaviour? | New-engine `LearningEvent`s in shipping stages: **no** — the engine is sandbox-only. Evidence-bearing legacy behaviour in the shipped product: **yes** — the legacy `lm7` error/progress paths and per-section mastery thresholds ship, governed and non-conforming; canonical semantics remain unimplemented. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-058 | May engine progress be written into the legacy store? | No fake `lm7` markers; a shim must be stage-guarded, temporary, non-canonical, documented. | `INH-ADR` | `LOCKED` | Engineering | No | — |
| ME-059 | Is telemetry evidence? | No — local-only content debugging; never updates mastery; no raw learner text. | `CURRENT-REALITY` | `DESCRIPTIVE` | Mastery & Evidence | No | — |
| ME-060 | Is the mastery snapshot persisted as primary state? | No — recomputed from events each run; compaction stores a cursor snapshot, not truth. | `CURRENT-REALITY` | `DESCRIPTIVE` | Engineering | No | — |

---

## Table B — provenance and reality

| ID | Source authority | Exact source | Consulted layers | Current implementation | Enforcement | Conflict | Tunable / Invariant | Downstream dependencies | Weakest-member audit | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| ME-001 | Active ADR | ADR-0009 (`active`/`canonical`) | Engineering | `lm_le_events` + `scoreEvents` | Unit-tested, sandbox-only | — | Invariant | ME-002, ME-023, ME-048 | n/a | North star: "Events remember." |
| ME-002 | Active ADR | ADR-0009 | Engineering | Snapshot recomputed each run | Unit-tested | — | Invariant | ME-060 | n/a | Version bump v0.1→v0.2 needed no migration. |
| ME-003 | Originated as this Bible's proposal; **adopted by the founder-authorized Canonical promotion, 2026-07-27** | Bible §3; promotion record (Bible §41; Ratification §10) | all | No such distinction in code — **implementation remains absent** | None | — | Invariant (adopted) | ME-004, ME-011 | n/a | Most existing contradictions trace to conflating these. **Adoption authorized no runtime change.** |
| ME-004 | **Founder decision FQ-6** (2026-07-26) | Bible §6, §23; Ratification record §3 | Content, Engineering | **Absent** — classification flows straight to counters | **None** | Semantic rule ratified; implementation gap unchanged | Invariant (I-21) | ME-047, ME-048, ME-049 | n/a | Ratified 2026-07-26. **No implementation authorized.** Still the largest structural gap. |
| ME-005 | Canonical domain source | Error Tracking System §4 (imported taxonomy); Mastery Model Policy Hardening | Content | Not expressed | Policy only | — | Invariant | ME-023, ME-050 | 4 of 4 members checked | Complete set, not a sample. |
| ME-006 | Founder decision | R8 / SOC-026; Social Charter §13 | Social, Content, Curriculum | No social surface exists | n/a | — | Invariant | ME-049, ME-054, PRJ-009 | 14 of 14 enumerated non-signals quoted | No contract exists → nothing social is evidence today. |
| ME-007 | **Founder decision FQ-6** (2026-07-26), on top of Error Tracking System Policy Hardening 2026-07-18 `[HARD INVARIANT]` | Bible §7, §23; Ratification record §3 | Content, Engineering | **No error-source field** | Policy only | Canon-vs-code, unchanged | Invariant | ME-008, ME-047 | **7 non-learner classes confirmed covered** (founder wording adds *system*) — these are the **non-social** classes. R8's `peer` class is **not** among them and remains an activation dependency of PRJ-009 (Bible §24); non-operational while Social is dormant. | Ratified 2026-07-26. Every non-success is still attributed to the learner by default. **No implementation authorized.** |
| ME-008 | Canonical domain source + **founder FQ-6 refinement** (2026-07-26) | Error Tracking System §Kaynak içe aktarımı §5; Ratification record §3 | Content, Operations | Absent | Policy only | Canon-vs-code, unchanged | Invariant | ME-047 | **8 of 8 classes listed** (was 7; `system` added by the founder wording). **0 of 7 excluded classes enforced.** **No `peer` class exists**; R8's peer exclusion is a PRJ-009 activation prerequisite (Bible §24), not present coverage. | Count change recorded explicitly, not absorbed. |
| ME-009 | Canonical domain source | same | Content | Absent | Policy only | Canon-vs-code | Invariant | ME-007 | n/a | — |
| ME-010 | Active ADR | ADR-0013; `events.ts:31-47`; `shipped-error-tags.json` | Engineering | 16 values; compile-time exhaustiveness lock | **`validate:content` hard error, both directions** | — | Invariant | ME-011, ME-048 | 16 of 16 enumerated; manifest verified at 54 | Strongest enforcement in the domain. |
| ME-011 | **Founder decision FQ-1** (2026-07-26) | Bible §10, §15; Ratification record §2 | Content, Curriculum | **Five** buckets, unchanged | Unit-tested, unchanged | Semantic question superseded; **code divergence persists** (documentation reconciled) | Locked (semantics) | ME-012, ME-032 | 5 code buckets re-verified; neither 4 nor 5 is the canonical frame | **ADR-0021 scope-amended 2026-07-26** (`e577954`) — original four-bucket Decision preserved historically; polarity is semantic. **Runtime unchanged; no implementation authorized.** |
| ME-012 | **Founder decision FQ-1** (2026-07-26) | Bible §15; Ratification record §2 | Content, Curriculum | Accrues `weakTags` → can make an item weak | Unit-tested (`nearMissMasteryTiming.test.ts`), unchanged | **Current code is provisional and non-conforming where meaning is unknown** | Locked (semantics) | ME-011, ME-026, ME-032 | Re-run **after the FQ-1 general clarification**: **0 of 3 tags is individually determinate** — `punctuation_only`, `accent_only` and `spelling_near_miss` are all **context-dependent**; the set shares no common polarity. | Semantics ratified; **ADR-0021 scope amendment APPLIED 2026-07-26** (`e577954`), together with every other live polarity-family source — complete inventory in **Gap Map §20.1** (no count restated here); **source reconciliation complete**. **Runtime divergence remains** — the reducer still accrues `weakTags` for ambiguous events. **No implementation was authorized.** |
| ME-013 | Current reality | `mastery.ts:203,238,260,275` | — | `skipCount++`, stays due | Unit-tested | Audit B12 called skip's old timing "questionable" | Tunable | ME-035 | n/a | — |
| ME-014 | Current reality | `grade.ts:119,224` | — | Never emitted | Unit-tested | — | — | ME-010 | 4 of 16 codes never emitted, all four named | A registry-aware adapter could emit 3 of the 4 later. |
| ME-015 | Active ADR | ADR-0009 | AI layer | AI is not in the grading path | Structural | — | Invariant | ME-050 | n/a | — |
| ME-016 | Current reality | `mastery.ts:45-73,222-268` | — | Six separate counters | Unit-tested | — | Descriptive | ME-017, ME-018 | n/a | — |
| ME-017 | **Founder decision FQ-2** (2026-07-26) | Bible §11, §13; Ratification record §5 | Curriculum, Content, Engineering | **Identical box/PF advance — unchanged** | **None** | **Now explicitly non-conforming**: a recognition-only item can reach the 30-day interval, which the ratified rule forbids | Invariant I-31 (semantics); **all values `TUNABLE`** | ME-020, ME-034 | `PRODUCTION_OPS` = 4 of 4 re-read | Semantics ratified; **no code change authorized**. |
| ME-018 | Canonical domain source + code | Mon Lexique note; `mastery.ts:283-288` | Content | Implemented | Unit-tested, sandbox-only | — | Invariant | ME-036 | n/a | — |
| ME-019 | Active ADR | ADR-0022; Lesson Flow Canon §5.3 | — | `practice-selector.ts` "never scores anything" | Unit-tested + module separation | — | Invariant | ME-020, ME-026 | n/a | — |
| ME-020 | **Founder decision FQ-2** (2026-07-26) | Bible §11, §13; Ratification record §5 | Curriculum, Content, Engineering | **No weighting in the reducer** — unchanged; weights exist only in an unwired projection | **None** | **Resolved semantically; the "mechanism already exists" claim is RETIRED.** ADR-0022 / Lesson Flow Canon §5.3 **source patch APPLIED — 2026-07-26** | Invariant I-29, I-30 (semantics); **every number `TUNABLE`** | ME-017, ME-045 | 3 sources compared; **`lexique-memory` weights are candidate values only** | Strength is now a semantic property at admission. **No numeric weight ratified. No implementation authorized.** |
| ME-021 | Current reality | `mastery.ts:35-36` | — | PF0–PF3 | Unit-tested | — | Tunable (depth) | ME-022 | 4 of 4 levels enumerated | — |
| ME-022 | **Founder decision FQ-3** (2026-07-26) | Bible §12; Ratification record §4 | Content, Engineering, UX | **Hint level never reaches the event — unchanged** | **None** | Semantics ratified; **no attempt-level assistance field exists** | Invariant I-26, I-27, I-28 (semantics) | ME-004, ME-021, ME-049 | **8 assistance members audited; 1 of 8 (prompt-fade) reaches the event, and FQ-3 rule 7 rules it insufficient** | Unknown assistance **does not invalidate** historical evidence — it only bars an independent-production claim. **This amends the Draft's own I-19.** |
| ME-023 | Canonical domain source | imported measurement taxonomy | Content | Reveal is a UI action, not an event input | Policy only | — | Invariant | ME-005 | n/a | — |
| ME-024 | Canonical domain source | EXERCISE_CANON §16; `SayItYourWayV1.tsx` | Content | Implemented and shipped | Validator ERROR + component contract | — | Invariant | ME-025 | n/a | Content-owned; recorded here as an input. |
| ME-025 | Canonical domain source | Lesson Flow Canon §1.3 | Content, Curriculum | Implemented in flow | Design canon | — | Invariant | ME-005 | n/a | — |
| ME-026 | **Founder decision FQ-7** (2026-07-26) — class only | Bible §34; Ratification record §8 | Curriculum, Engineering | `WEAK_THRESHOLD = 3` — unchanged | Unit-tested | **Value still has no founder source, and now never will by default** | **`TUNABLE` (ratified class)**; the locked promise is only *one isolated error ≠ weakness* | ME-027, ME-037 | **~25 constants enumerated; founder-locked exact values: 0** | A constant is still not a decision — that is now the ratified rule. |
| ME-027 | **Founder decision FQ-8** (2026-07-26) | Bible §2.1, §14; Ratification record §4 | Engineering, Product | **Both live, in different stages** | Legacy shipped; engine sandbox-only | **Scope resolved; the two-system divergence is NOT resolved** | Locked (scope) / Open (convergence) | ME-057, ME-058 | 4 evidence systems audited: engine (conforming, unshipped) · legacy weak spots ✘ · legacy SRS ✘ · per-section thresholds ✘ | Both governed. Legacy = legacy-active, non-conforming, frozen for replacement. **Not authorized for modification.** |
| ME-028 | Canonical domain source | Error Tracking Policy Hardening | Curriculum | Not implemented | Policy only | — | Invariant | ME-029 | n/a | — |
| ME-029 | Canonical domain source | same, `[LOCKED DEFAULT]` / threshold `[TUNABLE]` | Curriculum, Content | **Not implemented** — no `repairEligible` field | Policy only | — | Locked shape, tunable value | ME-030, ME-031 | n/a | Source explicitly says the number is not empirical. |
| ME-030 | **Founder decision FQ-4** (2026-07-26; was `INH-CANONICAL`) | Bible §14, §16; Ratification record §6 | Curriculum, Engineering | Not implemented | Policy only | — | Invariant I-33; repair counts/timing **`TUNABLE`** | ME-046, ME-031 | n/a | Repair clears `currently weak` only **with** spaced confirmation; never erases `ever weak`; never instantly strong. |
| ME-031 | Canonical domain source | Error Tracking Policy Hardening | Curriculum | Not implemented | Policy only | — | Locked default | ME-030 | n/a | — |
| ME-032 | **Founder decision FQ-1** (2026-07-26), on top of Error Tracking Policy Hardening | Bible §15; Ratification record §2 | Content | **Still contradicted in practice by ME-012** | Policy only | Conflicts with current code, unchanged | Invariant (I-24) | ME-012 | See ME-012 — no universal three-tag claim is made | Strengthened: ambiguity now blocks weakness, not just "silent" conversion. **No implementation.** |
| ME-033 | **Founder decision FQ-5** (2026-07-26) | Bible §18; Ratification record §7 | Content, Curriculum, UX | Six candidate ladders (3 · 4 · 8 · 5 · 3 · 4); **no set of nine**; nothing stores a universal ladder | **Conforms by absence, not by design** | "9-state" remains `SUPERSEDED`; docs-drift **source patch APPLIED 2026-07-26** | Invariant I-34, I-35 | ME-036, ME-037, ME-039 | **Six candidate projections enumerated; none becomes universal.** The 8 lifecycle statuses were **explicitly declined** | Purpose-named derived projections permitted under five constraints. **Sources reconciled 2026-07-26:** `Unknowns` U8 **closed**, Mastery Model gap resolved, precision-policy §4 closed, Mastery Matrix warning re-framed. **Runtime unchanged — it conforms by absence, not by design.** |
| ME-034 | **Founder decision FQ-7** (2026-07-26) — class only | Bible §34; Ratification record §8 | Curriculum, Engineering | `[0,1,3,7,30]`, 5 boxes — unchanged | Unit-tested | Value has no founder source | **`TUNABLE` (ratified class)**; the locked promise is only *spaced return exists* | ME-035, ME-045, ME-017 | 5 of 5 intervals re-read; box count and PF level count also `TUNABLE` | **No interval is founder-ratified.** |
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
| ME-046 | **Founder decision FQ-4** (2026-07-26) | Bible §14; Ratification record §6 | Curriculum, Content, Engineering | Floor exists in one unwired module only; **the reducer makes weakness permanent via monotone counters** | **None** | **Founder confirms the reducer's permanence is Axis-B reality, NOT intended semantics** | Invariant I-32, I-33; clearing conditions **`TUNABLE`** | ME-030, ME-042 | **5 weakness members audited** (current · historical · repair completed · spaced confirmation completed · chronic); **0 of 5 represented in the reducer** | Two facts split. **No code change authorized.** |
| ME-047 | **Founder decision FQ-6** (2026-07-26) | Bible §23; Ratification record §3 | Content, Engineering, Operations | **No mechanism** | **None** | Ratified semantics with no implementation | Invariant (I-21) | ME-004, ME-048 | 7 of 7 non-learner error-source classes covered by the rule; **0 of 7 enforced**. Excludes R8's `peer` class — a PRJ-009 activation prerequisite (Bible §24), non-operational while Social is dormant. | Semantics only. **No implementation authorized.** |
| ME-048 | **Founder decision FQ-6** (2026-07-26) | Bible §23; Ratification record §3 | Engineering, Privacy | Append-only, **no delete, no compensating record type exists**; tags frozen | **None** | Ratified semantics with no implementation | Invariant (I-20, I-22) | ME-010, ME-042, ME-060 | n/a | Schema, event names, cache invalidation, reconciliation and storage are **Engineering's**, undecided. Compaction still complicates any retroactive change. |
| ME-049 | Originated as this Bible's proposal generalizing R8; **adopted by the founder-authorized Canonical promotion, 2026-07-27** | Bible §6, §24; R8 seven conditions; promotion record (Bible §41; Ratification §10) | Content, Curriculum, Social | Absent — **implementation remains absent** | None | — | Invariant (adopted) | ME-004, ME-006, ME-022 | R8's 7 conditions mapped to 6 general conditions | Gives "equivalent standards outside Social" something to point at. **Does not create the positive Social evidence contract — PRJ-009 remains `OPEN`; no runtime change was authorized.** |
| ME-050 | Canonical domain source | imported measurement taxonomy; R8 | AI layer | AI not in the grading path | Structural | — | Invariant | ME-005, ME-015 | n/a | — |
| ME-051 | Canonical domain source | Authority & Routing Spec §2.1 | Content | — | Routing | — | Invariant | ME-024, ME-025 | n/a | — |
| ME-052 | Unauthored dependency | Authority & Routing Spec §2.1 | Curriculum | — | None | — | Dependency | ME-025, ME-034, ME-046 | n/a | Routed and stopped. |
| ME-053 | Unauthored dependency | Authority & Routing Spec §2.1 | Engineering | Several active ADRs already bind parts | Partial (ADRs) | — | Dependency | ME-041, ME-048 | n/a | Unusual: partly governed without a Bible. |
| ME-054 | Founder decision | Authority & Routing Spec §2.1; R8 | Social | — | Routing | — | Invariant | ME-006, PRJ-009 | n/a | "Social never owns positive evidence semantics." |
| ME-055 | Unauthored dependency | ADR-0023; Authority & Routing Spec §2.1 | Privacy / Legal | `userAnswer` stores raw learner text | Partial (ADR-0023) | — | Dependency | ME-059 | n/a | Retention lands directly on the evidence log. |
| ME-056 | Unauthored dependency | Authority & Routing Spec §2.1 | Operations & QA | — | None | — | Dependency | ME-038 (audit) | n/a | Routed and stopped. |
| ME-057 | Current reality | `config/productStage.ts`; P3 checkpoint §3; Error Tracking System warning | Engineering, Product | `v1LessonEngine` true **only** in sandbox; legacy `lm7` evidence-bearing paths ship | n/a | — | Descriptive | ME-027, ME-058 | **All 3 product stages read; exactly one enables the engine** | The domain's most important fact. Under FQ-8: the conforming system does not ship and the shipping systems bear evidence but do not conform. |
| ME-058 | Active ADR | ADR-0020 | Engineering | Honoured — no fake markers written | Source-inspected | — | Invariant | ME-027, ME-057 | n/a | Prevents hiding the two-system debt. |
| ME-059 | Current reality | `telemetry.ts:1-30` | Privacy | Local-only; constructor rejects unknown keys | Runtime rejection + tests | — | Invariant | ME-055 | 15 v0 event types; `repair_*` named as future | Explicitly "NOT a second mastery pipeline". |
| ME-060 | Current reality | `compaction.ts`; `mastery.ts` | Engineering | Snapshot recomputed; compaction stores a cursor | Unit-tested (`compaction.test.ts`) | — | Descriptive | ME-002, ME-048 | n/a | — |

---

## Status summary — recalculated from the rows above

**Total rows: 60 (`ME-001` … `ME-060`, contiguous).**

Counted strictly from **Table A**, one state per row. A row cites at most one ratification state; where
a row's *content* touches two axes (e.g. ME-017 is an `OPEN` question *about* a current-reality fact),
it is counted **once**, under the state in Table A's column.

### By ratification state (post-promotion adoption, 2026-07-27)

| State | Count | Δ vs Round 2 | IDs |
|---|---|---|---|
| **`INH-FOUNDER`** | **20** | **+2 (promotion adoption)** | **ME-003**, 004, 006, 007, 011, 012, 017, 020, 022, 026, 027, 030, 032, 033, 034, 046, 047, 048, **049**, 054 — 16 from the FQ-1…FQ-8 founder decisions, ME-006 and ME-054 from earlier founder decisions, and ME-003 / ME-049 adopted through the 2026-07-27 founder-authorized promotion |
| `CURRENT-REALITY` | 17 | — | ME-013, 014, 016, 021, 035, 036, 037, 039, 040, 041, 042, 043, 044, 045, 057, 059, 060 |
| `INH-CANONICAL` | 10 | — | ME-008, 009, 018, 024, 025, 028, 029, 031, 038, 051 |
| `INH-ADR` | 6 | — | ME-001, 002, 010, 015, 019, 058 |
| `DEPENDENCY` | 4 | — | ME-052, ME-053, ME-055, ME-056 |
| `NON-SIGNAL` | 3 | — | ME-005, ME-023, ME-050 |
| `PROPOSED` | **0** | −2 | — (ME-003 and ME-049 adopted by the 2026-07-27 promotion) |
| `OPEN` | **0** | — | — |
| `DEFERRED` | **0** | — | — |
| `SUPERSEDED` | **0** | — | — (ME-033 became `INH-FOUNDER`; the *phrase* "9-state" is still `SUPERSEDED` inside its rule) |
| **Total** | **60** | — | — |

### By decision status (post-promotion adoption, 2026-07-27)

| Status | Count | Δ vs Round 2 | IDs |
|---|---|---|---|
| `LOCKED` | 39 | +2 | ME-001, 002, **003**, 004, 005, 006, 007, 008, 009, 010, 011, 012, 015, 017, 018, 019, 020, 022, 023, 024, 025, 026, 027, 028, 029, 030, 031, 032, 033, 034, 038, 046, 047, 048, **049**, 050, 051, 054, 058 |
| `DESCRIPTIVE` | 16 | — | ME-013, 014, 016, 021, 035, 036, 037, 039, 040, 041, 042, 044, 045, 057, 059, 060 |
| `OPEN` | 5 | — | ME-043 (reducer order-invariance, never ruled) · ME-052, ME-053, ME-055, ME-056 (unauthored layers) |
| `PROPOSED` | **0** | −2 | — |
| **Total** | **60** | — | — |

> **`LOCKED` means a decision exists — never that the rule is implemented.** 39 locked rows and **zero**
> conforming shipped evidence semantics are not in tension (ME-057, ME-027). **No row was moved to
> `LOCKED` merely because the founder questions ran out**: ME-043 and the four `DEPENDENCY` rows stay
> `OPEN`. ME-003 and ME-049 moved to `LOCKED` because something did decide them — the founder-authorized
> Canonical promotion of 2026-07-27 adopted the Bible's two surviving pre-promotion proposals as
> Canonical semantic policy. That adoption is not a new founder decision, created no ninth or tenth
> founder question, and authorized no implementation.

### Founder decisions — all answered

| | Count | IDs |
|---|---|---|
| **Answered 2026-07-26, Round 1** | 8 | ME-004, ME-007 (FQ-6) · ME-011, ME-012, ME-032 (FQ-1) · ME-027 (FQ-8) · ME-047, ME-048 (FQ-6) |
| **Answered 2026-07-26, Round 2** | 8 | ME-017, ME-020 (FQ-2) · ME-022 (FQ-3) · ME-030, ME-046 (FQ-4) · ME-033 (FQ-5) · ME-026, ME-034 (FQ-7) |
| **Adopted by the founder-authorized Canonical promotion, 2026-07-27** | 2 | ME-003, ME-049 — not a new founder question; the authorization to promote the complete Bible adopted its surviving proposals |
| **Still require a founder decision** | **0** | — |
| `REQUIRED NOW` / `REQUIRED BEFORE PROMOTION` outstanding | **0** | — |

No row remains `PROPOSED`: ME-003 and ME-049 — editorial/structural proposals that never required a
standalone founder call — were adopted through the founder-authorized Canonical promotion of
2026-07-27. The eight founder questions remain **eight**; the promotion created no ninth or tenth.
Rows routed to an unauthored layer and therefore **deferred, not asked**: ME-052, ME-053, ME-055,
ME-056. One Axis-B question was **never put to the founder and remains open**: ME-043 (the reducer is
deterministic but not order-invariant).

### Deliberately zero

`PLANNED` **0** · `EXPERIMENT` **0** · **Implemented as ratified semantics: 0 — unchanged by Rounds 1–2.**
**Founder-locked exact numeric values: 0** (FQ-7).

Rounds 1 and 2 ratified sixteen rows and implemented none of them; the 2026-07-27 promotion
additionally adopted two rows (ME-003, ME-049) and implemented neither. No row in this matrix records
a ratified Mastery & Evidence rule that is live and conforming on any shipping surface: the engine
conforms but does not ship (ME-057), and the shipped legacy systems bear evidence but are governed and
non-conforming (ME-027). **The semantic decision surface is complete; the implementation surface is
untouched.**
