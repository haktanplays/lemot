---
title: Cairn Mastery & Evidence Bible
version: 1.0
status: Draft — awaiting founder ratification
authority: Proposed semantic owner for evidence and mastery. This document has NO independent authority. Every normative line is either inherited from a named upstream authority or marked `PROPOSED FOR FOUNDER RATIFICATION`.
owner: Mastery & Evidence
created: 2026-07-26
upstream_authorities:
  - Founder decision Q2 (2026-07-26) — dedicated Mastery & Evidence owner assigned
  - PRJ-014 (`FOUNDER_LOCKED`), PRJ-009 (`OPEN`)
  - docs/canon/CAIRN_PROJECT_CANON_MAP_v1.0.md (Canonical)
  - docs/canon/CAIRN_AUTHORITY_AND_ROUTING_SPEC_v0.1.md §2.1
  - docs/bibles/content/CONTENT_BIBLE_v1.0.md (Canonical)
  - docs/bibles/social/SOCIAL_LAYER_CHARTER_v1.0.md (Canonical) — negative evidence bound only
  - Individually active ADRs — 0009, 0010, 0013, 0016, 0020, 0021, 0022, 0023
implementation_authority: none
supersedes: []
partially_supersedes: []
---

# Cairn Mastery & Evidence Bible v1.0 — DRAFT

> **This is a Draft.** It is not Canonical, and it authorizes nothing. It does not change a
> threshold, an event shape, a validator, a renderer, a lesson, or a line of code. Canonical
> promotion requires (a) founder answers to the questions in
> [`MASTERY_EVIDENCE_FOUNDER_REVIEW_SURFACE_v0.1.md`](MASTERY_EVIDENCE_FOUNDER_REVIEW_SURFACE_v0.1.md)
> and (b) an independent adversarial review by someone other than this document's author (§41).

> **Reading rule.** Every normative statement carries a provenance tag. A statement tagged
> `CURRENT REALITY — AXIS B` describes *what the code does today*. It is **not** a decision, and
> promoting this Bible does **not** canonize it. Where current reality and proposed semantics
> differ, the difference is stated, never smoothed over.

---

## Provenance vocabulary

| Tag | Meaning |
|---|---|
| `INHERITED — FOUNDER DECISION` | A founder ratified this. This Bible restates; it does not re-decide. |
| `INHERITED — CANONICAL DOMAIN SOURCE` | A Canonical document in another domain binds this. |
| `INHERITED — ACTIVE ADR` | An individually active/accepted ADR binds this, within its own declared domain. |
| `PROPOSED FOR FOUNDER RATIFICATION` | This Bible's own proposal. **Not yet binding.** |
| `CURRENT REALITY — AXIS B` | A fact about shipped or existing code/tests. Descriptive only. |
| `TUNABLE` | A parameter whose *shape* is fixed but whose *value* may change without a founder decision. |
| `OPEN` | No position taken. A decision is required. |
| `DEFERRED` | Deliberately postponed by a named source. |
| `SUPERSEDED` | Previously stated, now replaced. Preserved so the replacement is legible. |
| `NON-SIGNAL` | Explicitly *not* evidence. |
| `DEPENDENCY — OWNER NOT YET AUTHORED` | Routed to a layer that does not exist yet. Not decided here. |

---

## Table of contents

1. Purpose · 2. Authority and limits · 3. Domain vocabulary · 4. Evidence lifecycle ·
5. Evidence opportunity · 6. Admissibility · 7. Attribution · 8. Non-signals · 9. Result classes ·
10. Polarity · 11. Recognition vs production · 12. Assistance · 13. Strength and confidence ·
14. Weakness · 15. Near-miss and precision · 16. Repair · 17. Mastery representation ·
18. Counter-derived reality vs conceptual state language · 19. State transitions · 20. Aggregation ·
21. Conflicting evidence · 22. Decay, spacing, review · 23. Invalidation · 24. Solo / AI / future-Social
equivalence · 25. Mon Lexique · 26. Practice and recycling · 27. Content boundary · 28. Curriculum
boundary · 29. Engineering boundary · 30. Social boundary · 31. Privacy boundary · 32. Operations and
QA boundary · 33. Invariants · 34. Tunables · 35. Current runtime constants · 36. Deferred directions ·
37. Current implementation reality · 38. Enforcement state · 39. Open decisions · 40. Non-claims ·
41. Promotion prerequisites · 42. Change history

---

## 1. Purpose

Cairn has, today, **three partially-overlapping systems that assign meaning to a learner action** and
**no document that says which meaning is correct**. This Bible is proposed as that document.

Its single job is to make the following sentence answerable, once, for the whole product:

> *A learner did something. What — if anything — does that prove, how strongly, about what, and what
> should change as a result?*

Every other layer consumes that answer. Content decides *what the action was meant to teach*.
Curriculum decides *when the opportunity appears*. Engineering decides *how the answer is stored and
enforced*. Social supplies only a *negative* bound. None of them may answer the question above.

`INHERITED — FOUNDER DECISION` (Q2, 2026-07-26; PRJ-014).

## 2. Authority and limits

**This document has no independent authority.** `INHERITED — FOUNDER DECISION`

- It is the **proposed** semantic owner. It becomes an owner on founder ratification, not on merge.
- It **never** authorizes implementation. Under the Authority & Routing Spec's fourteen-element
  implementation-opening contract, a Canonical document is not a build instruction. Promotion of this
  Bible to Canonical would still not open any code work. `INHERITED — CANONICAL DOMAIN SOURCE`
- It **does not** own a question outside its domain. Domain-first routing (founder Q1, 2026-07-26)
  means a higher-class document must not answer questions it does not own. Where this Bible reaches a
  boundary it **routes and stops** (§27–§32).
- It **does not** decide a rule by pointing at code. Code is Axis B: it establishes what exists, never
  what should be canon. `INHERITED — FOUNDER DECISION` (Q1 two-axis model)
- Where a current constant has no source decision, this Bible marks it `TUNABLE` or `OPEN` — it does
  **not** promote it to an invariant (§34, §35).

## 3. Domain vocabulary

These terms are **not** interchangeable. Most existing contradictions in the corpus come from using
one where another was meant. `PROPOSED FOR FOUNDER RATIFICATION`

| Term | Definition | Not to be confused with |
|---|---|---|
| **Evidence opportunity** | An authored moment at which the learner *could* produce evidence. | Screen, exercise, item |
| **Learner action** | What the learner actually did (or declined to do). | Evidence |
| **Observable result** | The deterministic classification of that action. | Success, score |
| **Event** | The immutable record that an action occurred and how it was classified. | Evidence |
| **Admissibility** | Whether an event may inform mastery at all. | Correctness |
| **Attribution** | Whose (or what's) fault/credit the result is. | Blame, tone |
| **Polarity** | Positive / negative / neutral / precision direction of an admissible event. | Correct / wrong |
| **Evidence strength** | How much an admissible event should count. | Confidence |
| **Confidence** | How certain the system is about the strength assignment. | Strength |
| **Mastery effect** | The change to the learner's state caused by admitted evidence. | Score |
| **Weakness effect** | The change to the learner's *difficulty* record. | Failure count |
| **Repair effect** | The change caused by a *successful return* on a known weakness. | Mastery restoration |
| **Scheduling consequence** | When the item should return. | Mastery |
| **Invalidation** | Retroactive removal of an event's evidentiary force. | Deletion |
| **Implementation event** | The current runtime `LearningEvent`. | The semantic concept "event" |

> **Explicit non-equivalence.** "event" ≠ "evidence" ≠ "result" ≠ "score" ≠ "success" ≠ "mastery".
> An event may exist and carry no evidence. A result may be *correct* and still be inadmissible.

## 4. Evidence lifecycle

`PROPOSED FOR FOUNDER RATIFICATION` — the ordered pipeline this Bible proposes as the canonical frame:

```
evidence opportunity
  → learner action
  → observable result            (deterministic classification)
  → ADMISSIBILITY GATE           (§6 — may this inform mastery at all?)
  → attribution                  (§7 — is the learner the source?)
  → polarity + strength          (§10, §13)
  → aggregation                  (§20 — with other events on the same item)
  → mastery / weakness / repair effect   (§14, §16, §17)
  → scheduling consequence       (§22)
  → [invalidation]               (§23 — reversible only by a defined path)
```

**Two gates precede any mastery effect: admissibility, then attribution.** The current runtime has
neither as an explicit stage — classification flows straight into counters (§37). That is the single
largest structural gap between this frame and the code. `CURRENT REALITY — AXIS B`

## 5. Evidence opportunity

- An evidence opportunity is **authored**, not inferred. Content owns which authored actions are meant
  to produce evidence. `INHERITED — CANONICAL DOMAIN SOURCE` (Content Bible)
- **Discovery screens produce no evidence.** Meet / Notice are discovery: no wrong answer, no score,
  therefore no measurement. Assessment begins after Build.
  `INHERITED — CANONICAL DOMAIN SOURCE` (Lesson Flow Canon v1 §1.3)
- **An open, mixed Weave is ungraded by design.** Grading one is a validator ERROR.
  `INHERITED — CANONICAL DOMAIN SOURCE` (EXERCISE_CANON §16)
- **Say It Your Way never grades and never blocks beyond empty.**
  `INHERITED — CANONICAL DOMAIN SOURCE`
- Whether an *ungraded* opportunity may still yield weak positive evidence is `OPEN`. This Bible does
  not create one.

## 6. Admissibility

`PROPOSED FOR FOUNDER RATIFICATION`

An event is **admissible** only if all of the following hold:

1. The action was an authored evidence opportunity (§5).
2. The learner's authorship is attributable (§7).
3. The assistance level at the moment of action is known (§12).
4. Prerequisites were safe — the learner was not asked to produce an untaught form (§27).
5. The result was produced by an approved evaluation path (deterministic grader, or a future
   contract-governed evaluator).
6. No content / validator / UI-flow / tone / AI-generator / mastery-mapping error is implicated (§23).

These six conditions are the generalization of the **seven conditions founder R8 imposed on a future
social pedagogical action** (§24). This Bible proposes them as the *universal* admissibility standard,
so that "equivalent standards outside Social" has a definition to point at.
`INHERITED — FOUNDER DECISION` (R8 / SOC-026) for the social case; the generalization is `PROPOSED`.

> **Correctness is not admissibility.** A `correct` result on an inadmissible opportunity is not
> positive evidence. The current runtime does not implement this distinction. `CURRENT REALITY — AXIS B`

## 7. Attribution

- **Only a verified learner-sourced error creates weakness.**
  `INHERITED — CANONICAL DOMAIN SOURCE` (Error Tracking System, Policy Hardening 2026-07-18, `[HARD INVARIANT]`)
- The error-source classes are: **learner · content · validator · UI-flow · tone · AI-generator ·
  mastery-mapping**. A bad distractor, an early reveal, a broken validator, or an unsafely generated
  item is **not** learner weakness. `INHERITED — CANONICAL DOMAIN SOURCE`
- **Exposure / ghost production failure cannot create weakness** — production was never required.
  `INHERITED — CANONICAL DOMAIN SOURCE`
- **Raw text or a free-form AI label may never become a canonical error.** An error feeds weak-point
  repair only after it has been *authored into the taxonomy*. `INHERITED — CANONICAL DOMAIN SOURCE`
- **Measurement observes; it must not invent pedagogy.** Measurement does not create a new target and
  does not silently promote an item. `INHERITED — CANONICAL DOMAIN SOURCE`

> `CURRENT REALITY — AXIS B`: no runtime field records error source. Every non-success result is
> attributed to the learner by default. Attribution exists as policy only.

## 8. Non-signals

The following are `NON-SIGNAL` — they never, alone, establish mastery:

| Non-signal | Source |
|---|---|
| Lesson completion ≠ mastery | Error Tracking System §4 (imported taxonomy); Mastery Model Policy Hardening |
| A reveal viewed ≠ understanding | same |
| Piece display ≠ piece ownership | same |
| AI praise ≠ validation | same |
| Screen viewed / audio played / time-on-screen | Event signals, not evidence |
| Social engagement signals — likes · reactions · replies · posting frequency · time in community · participation count · popularity · reputation · partner presence · receiving or giving a correction · social completion · community streaks · peer approval · moderator approval without an evidence contract | `INHERITED — FOUNDER DECISION` R8 / SOC-026 |

**Member audit (§ universal-claim protocol).** The social non-signal list above is quoted in full from
R8 — all fourteen enumerated members, not a sample. The four pedagogical non-signals are the complete
set stated in the imported measurement taxonomy. No member was paraphrased away.

> **Absence of a signal is never rejection.** That an observation is not currently admitted does not
> mean it was decided to be inadmissible.

## 9. Result classes

`CURRENT REALITY — AXIS B` — the shipped grading vocabulary is a **frozen 16-value union**
(`ErrorTagCode`, `events.ts:31-47`), immutable under YASA 3:

```
correct · accepted_variant · punctuation_only · accent_only · spelling_near_miss ·
wrong_item · wrong_order · missing_word · extra_word · wrong_register · meaning_shift ·
blocked_form_used · recognition_only_form_used · overproduction_unseen_form ·
incorrect_but_understandable · empty_or_skip
```

`INHERITED — ACTIVE ADR` (ADR-0013): a shipped tag can never be renamed or deleted; a new tag is
registered in the same PR; the validator errors in both directions. 54 tags are frozen in
`shipped-error-tags.json` (verified: manifest reports `tags: 54`).

**Member audit.** The deterministic grader emits **12 of the 16** codes. Verified by reading every
`make(...)` call in `grade.ts`, not by trusting the docs: emitted = `empty_or_skip`, `correct`,
`accepted_variant`, `blocked_form_used`, `recognition_only_form_used`, `punctuation_only`,
`accent_only`, `wrong_order`, `missing_word`, `extra_word`, `spelling_near_miss`,
`incorrect_but_understandable`. **Never emitted (4)** = `wrong_item`, `wrong_register`,
`meaning_shift`, `overproduction_unseen_form`. `meaning_shift` is deliberately unreachable — there is
no safe deterministic trigger. 12 + 4 = 16. ✔

## 10. Positive, negative, neutral, and precision signals

`PROPOSED FOR FOUNDER RATIFICATION` — polarity is a **semantic** property, distinct from the result
code that carries it:

| Polarity | Meaning | Mastery effect |
|---|---|---|
| **Positive** | The learner demonstrated the target. | Advances |
| **Negative** | The learner failed the target, attributably. | Weakens |
| **Neutral** | An action occurred with no evidentiary direction. | None |
| **Precision** | The meaning was right; the surface was imperfect. | Records, does not weaken, does not advance |

The controversial member is `spelling_near_miss`. See §15 — its polarity is currently **contradicted
between an active ADR and the shipped code**, and is founder question **FQ-1**.

## 11. Recognition versus production

- **Recognition and production are separate evidence types.** They are counted separately today
  (`recognitionAttempts/Success/Failure` vs `productionAttempts/Success/Failure`).
  `CURRENT REALITY — AXIS B`
- **Recognition alone never adds an item to Mon Lexique** — `productionSuccess > 0` is required.
  `INHERITED — CANONICAL DOMAIN SOURCE` + `CURRENT REALITY — AXIS B` (`mastery.ts:283-288`)
- **Production operations are exactly four**: `fill`, `build`, `register_switch`, `context_chain`.
  Everything else — including any reveal or non-production operation — is treated as recognition-like.
  **Member audit:** the complete `PRODUCTION_OPS` set was read; it has 4 members, no exceptions.
  `CURRENT REALITY — AXIS B` (`mastery.ts:87-92`)
- **A recognition success currently advances the Leitner box and prompt-fade level by exactly the same
  amount as a production success.** `CURRENT REALITY — AXIS B` (`mastery.ts:224-252`)

> **This is the sharpest unresolved semantic question in the domain.** Canon says an *evidence weight
> multiplier* exists and lives in the mastery reducer (ADR-0022; Lesson Flow Canon §5.3, §5.5). The
> reducer implements **no weighting at all** — every admitted event weighs 1. See §13 and **FQ-2**.

## 12. Assistance, hints, reveal, and model answers

- **Prompt-fade (PF0–PF3)** is the runtime's only representation of assistance level. It rises on
  success and falls on failure. `CURRENT REALITY — AXIS B` (`mastery.ts:35-36`)
- **The hint ladder is 0 → 1 → 2** (silent → reversed pieces → cloze shape), never copy-ready.
  `INHERITED — CANONICAL DOMAIN SOURCE` (EXERCISE_CANON §8; Difficulty and Cognitive Load)
- **Hint level does not currently reach the evidence layer.** The `LearningEvent` shape carries
  `promptLevel` but no hint-usage field. A hinted success and an unhinted success are today
  indistinguishable to mastery. `CURRENT REALITY — AXIS B` — see **FQ-3**.
- **A reveal is not understanding**; a model answer shown is not evidence. `NON-SIGNAL`
- **Boundary "later form" cards are not failures.** A learner meeting an untaught form is shown a soft
  "a form for later" card, never a failure card. `INHERITED — ACTIVE ADR` (ADR-0016)

`PROPOSED FOR FOUNDER RATIFICATION`: assistance level is an **admissibility input** (§6.3) *and* a
**strength modifier** (§13). It is not merely a UI concern.

## 13. Evidence strength and confidence

**Strength** = how much an admissible event counts. **Confidence** = how sure the system is of that
assignment. They are different axes and are currently conflated nowhere — because neither exists in
the shipped path.

| Model | Where | Weights | Status |
|---|---|---|---|
| Mastery reducer | `mastery.ts` | **None.** Every admitted event weighs 1. | `CURRENT REALITY — AXIS B`, sandbox-only |
| Lexique Memory | `lexique-memory.ts` | production 1.0 · recognition 0.25 · transfer 0.7 · recombination 0.7 · repair 0.5 | `CURRENT REALITY — AXIS B`, fixture/spec-only, unwired |
| Lesson Flow Canon §5.5 | design canon | `LessonEvidenceProfile {listening, production, recognition}` summing to 1.0, a **multiplier, not an exercise count** | `INHERITED — CANONICAL DOMAIN SOURCE` (design canon; does not authorize code) |

**Three sources, three different answers, none of them shipped.** ADR-0022 and Lesson Flow Canon §5.3
both name the **mastery reducer** as evidence weight's home; the reducer has none; the module that does
have weights is explicitly *not* the reducer. This is recorded as a conflict, not resolved here (§39,
**FQ-2**).

**Confidence** has no representation anywhere in the corpus. `OPEN`.

## 14. Weakness semantics

`PROPOSED FOR FOUNDER RATIFICATION` — weakness is a **claim about difficulty**, not a tally of wrong
answers, and it must satisfy §7 attribution before it exists at all.

Current runtime rules (`CURRENT REALITY — AXIS B`):

- `isWeak` ⟺ `wrongCount >= 3` **OR** any single `weakTags` counter `>= 3`. (`WEAK_THRESHOLD = 3`)
- `weakTags` accrue the failing `result` plus its `errorTags`, de-duplicated per event.
- Weakness is **item-keyed** (`ItemId`).

Inherited invariants:

- **A single verified miss never forces the item into the next lesson.** `INHERITED — CANONICAL DOMAIN SOURCE`
- **Precision-only difficulty may never silently become full conceptual weakness.** `INHERITED — CANONICAL DOMAIN SOURCE`
- **Error-triggered return is bounded by context and safety limits.** `INHERITED — CANONICAL DOMAIN SOURCE`

> `CURRENT REALITY — AXIS B` — **a second, incompatible weakness system ships today.** The legacy
> surface computes weak spots as *"3+ errors keyed by the correct-answer string"* (`useErrors.ts`).
> Same number, different key, different store, no attribution. Both are live in different stages (§37).

## 15. Near-miss and precision semantics

**The contradiction.** **Four documents** say `spelling_near_miss` is a precision/soft signal:
ADR-0021 (`status: active`, `canon_status: canonical`) Decision paragraph; the precision-policy note
(2026-06-04) §2 table; the vault `Mastery Model` bucket table; the vault `Feedback and Scoring
Philosophy` near-miss line.

**The code says otherwise.** `PRECISION_TAGS` has exactly **two** members —
`punctuation_only`, `accent_only`. `spelling_near_miss` is deliberately excluded per **audit B7**
("meaning-distinct FR minimal pairs — un/on, le/la, et/est"), and it **accrues `weakTags`**, so three
of them make an item `isWeak`. `CURRENT REALITY — AXIS B` (`mastery.ts:132-145, 234-237, 257-259`)

**Member audit.** The universal claim *"precision tags are never failure"* was tested against its
weakest member. `punctuation_only` ✔ holds. `accent_only` ✔ holds. `spelling_near_miss` ✘ **fails** —
it produces weakness. The universal claim is therefore **false as written in three documents**, and
true only of the two-member set. This is the exact defect class the collection/member protocol exists
to catch.

**Current true behaviour (5 buckets, not 4):**

| Bucket | Members | Effect |
|---|---|---|
| Success | `correct`, `accepted_variant` | success counter; box ↑; PF ↑ |
| Precision | `punctuation_only`, `accent_only` | `precisionCount`/`precisionTags`; no failure, no weakness, box and PF unchanged |
| Spelling near-miss | `spelling_near_miss` | **no credit, no demotion, but accrues `weakTags`** |
| Skip | `empty_or_skip` | `skipCount++`; otherwise neutral |
| Failure | the remaining 11 codes | failure counter; `wrongCount++`; `weakTags`; box ↓; PF ↓ |

**Not resolved here.** Whether a French minimal-pair slip is a precision signal or a weakness signal is
a pedagogical decision, not an engineering one. Founder question **FQ-1**. `OPEN`

**Staged strictness** — later bands (L60+/L70+), monolingual phase, high prompt-fade, item maturity,
and a future `accentCriticality` field may tighten near-miss toward partial or full failure.
`DEFERRED` (ADR-0021 Consequences; precision-policy §3 — "none of the following is implemented").

## 16. Repair semantics

`INHERITED — CANONICAL DOMAIN SOURCE` (Error Tracking System, Policy Hardening 2026-07-18):

**Eligibility** (`LOCKED DEFAULT`, threshold `TUNABLE`): an item/tag becomes `repairEligible` when the
same authored learner error occurs **twice in one lesson**, *or* **once in each of two lessons**.

**Flow** (`LOCKED DEFAULT`):

```
single verified miss        → record evidence only, no return
repeated / threshold-crossing learner error → repairEligible / weaknessReturn candidate
context-fit + load-fit (repairReserve ≤ 1)  → lesson repairReserve OR Practice Hub repair
successful repair           → urgency DECREASES; no forced same-lesson drill loop;
                              schedule 1 spaced confirmation in the next 1–2 lessons
successful spaced confirmation → close repair override; return item to normal rolling lifecycle
persistent failure          → keep weaknessReturn priority, never exceed repair/load caps
```

**Hard invariants** (`INHERITED — CANONICAL DOMAIN SOURCE`):

- Repair **does not make the item instantly strong.**
- Repair **does not erase weakness history.**
- Successful repair **reduces urgency only.**
- **The learner is never punished with a denser lesson for having erred** — repair changes priority,
  not lesson intensity.

`CURRENT REALITY — AXIS B`: **none of this is implemented.** There is no `repairEligible` field, no
spaced-confirmation scheduler, and no repair path in the reducer. `repair_*` telemetry event types
exist but are explicitly named as *future* events. Repair is policy, not runtime.

## 17. Mastery representation

`INHERITED — ACTIVE ADR` (ADR-0009): **mastery is a projection of an append-only event log, never
primary state.** A scoring-policy change **re-derives; it never migrates.**

`CURRENT REALITY — AXIS B` — the shipped representation is a per-item counter record
(`ItemMastery`, `mastery-v0.2`): seen/recognition/production attempt-success-failure counters,
`wrongCount`, `skipCount`, `precisionCount`, `precisionTags`, `weakTags`, `isWeak`, `lastSeenAt`,
`lastProducedAt`, `promptFadeLevel`, `leitnerBox`, `dueAt`, `monLexiqueStatus`, `practiceEligibility`.

`INHERITED — ACTIVE ADR` (ADR-0010, engine purity): the reducer is pure and deterministic, `now` is a
parameter, no `Date.now()` / `Math.random()`, fail-closed by default, ties broken explicitly.

## 18. Counter-derived reality versus conceptual state language

**The counters win.** `INHERITED — CANONICAL DOMAIN SOURCE` (precision-policy §4): *"the source of
truth today is the counter-derived `MasterySnapshot` … until [a reconciliation pass], the counters
win."*

**Member audit of the "9-state mastery" claim.** The corpus repeatedly refers to a *"9-state"* mastery
model. Attempting to enumerate its nine members against the code produces **no set of nine anything**:

| Candidate ladder | Members | Count |
|---|---|---|
| `monLexiqueStatus` | hidden · added · weak | 3 |
| `practiceEligibility` | none · build · stretch · challenge | 4 |
| `LEXIQUE_LIFECYCLE_STATUSES` | unknown · ghost · recognition · activeNew · supported · strong · dormant · refreshDue | **8** |
| `learning-engine-v1.md` planning ladder | a five-state pedagogical vocabulary | 5 |
| `itemRegistry` runtime status field | recognition · supported · active (observed values) | 3 |
| Pipeline Rule 6 | Active · Supported · Recognition-only · Recycled | 4 |

**Member audit: six candidate ladders enumerated, with 3, 4, 8, 5, 3 and 4 members. None has nine.**
The nearest is the eight intrinsic Lexique lifecycle
statuses — and `recycled` is explicitly *excluded* from that set because it is a query-time role
(§26). The "9-state" phrase is `SUPERSEDED` as a description of current reality and should not be used
without a source. Whether Cairn *should* have a named state ladder at all is founder question **FQ-5**.
`OPEN`

## 19. State transitions

`CURRENT REALITY — AXIS B` (`mastery.ts:219-298`), per admitted event, per item id:

```
seenCount++, lastSeenAt = event.timestamp
  ├ production op → productionAttempts++
  └ otherwise     → recognitionAttempts++

success           → success counter++, (production: lastProducedAt), box = min(box+1, 4), pf = min(pf+1, 3)
precision         → precisionCount++, precisionTags++, box/pf unchanged
spelling near-miss→ weakTags++, box/pf unchanged
skip              → skipCount++, box/pf unchanged
failure           → failure counter++, wrongCount++, weakTags++, box = max(0, box-1), pf = max(0, pf-1)

dueAt = (precision | spelling near-miss | skip) ? timestamp : timestamp + LEITNER_INTERVAL_DAYS[box] * DAY

isWeak              = wrongCount >= 3 OR any weakTags counter >= 3
monLexiqueStatus    = isWeak ? weak : productionSuccess > 0 ? added : hidden
practiceEligibility = isWeak ? challenge : productionSuccess > 0 ? stretch
                             : (recognitionSuccess > 0 || seenCount > 0) ? build : none
```

**Derived invariant, verified:** `practiceEligibility === "challenge"` ⟹ `isWeak === true`.
**Derived invariant, verified:** a precision-only item can reach `build`, never `challenge`.

## 20. Aggregation across multiple events

- **Idempotency by `clientEventId`** — re-applying a processed event is a no-op.
  `CURRENT REALITY — AXIS B`
- **Counters are monotone.** Nothing decrements a counter; only `leitnerBox` and `promptFadeLevel`
  move both ways. `CURRENT REALITY — AXIS B`
- **`context_chain` bounded credit (audit B23 / PR-E2).** A chain emits one graded event per internal
  step, each carrying the exercise's full target set — so an N-step chain over M targets would credit
  each target N times. The **session controller** now de-duplicates *repeated successes within one
  chain attempt*: the first success carries the targets, later successes carry none; **every**
  non-success outcome always carries the targets, so a failure after a correct step is never dropped.
  `CURRENT REALITY — AXIS B`

> **Architectural note, not a decision.** That aggregation rule is a *semantic* rule that lives in the
> **controller**, not in the pure reducer. This Bible records the fact and routes the placement
> question to Engineering (§29). It does not relocate it.

**Aggregation across *sessions*, *lessons*, or *item families*** is undefined anywhere. `OPEN`

## 21. Conflicting evidence

`OPEN` — the corpus contains no rule for genuinely conflicting evidence (a success and a failure on the
same item at the same assistance level within one session; a production success followed by a
recognition failure; a repair success followed by immediate relapse).

`CURRENT REALITY — AXIS B`: conflicts resolve **implicitly by arrival order** — the last event moves
the box and sets `dueAt`. Replaying the same events in a different order yields a different
`leitnerBox`, `promptFadeLevel` and `dueAt`, though the counters are order-independent. The reducer is
deterministic *given an order*; it is not order-invariant. This has never been stated as a decision.

## 22. Decay, spacing, and review consequences

- **Leitner is the only shipped decay mechanism.** Boxes `[0, 1, 3, 7, 30]` days, 5 boxes (0–4).
  `CURRENT REALITY — AXIS B` · `TUNABLE`
- **`dueAt` rule (audit B12):** only success and failure — the two outcomes that move the box —
  reschedule at the new box interval. Precision, spelling near-miss and skip keep the item **due now**
  so it returns for reinforcement rather than disappearing for a full interval. `CURRENT REALITY — AXIS B`
- **There is no time-based decay in the mastery reducer.** An item's strength never fades with elapsed
  time; only its due date passes. `CURRENT REALITY — AXIS B`
- **Lexique Memory implements time decay** — default half-life 5 days, strong half-life 14 days,
  `WEAKNESS_K = 2.0`, `WEAK_RESIDUAL_FLOOR = 0.15` (weakness decays but never below a floor once the
  item has *ever* been weak). Fixture/spec-only; unwired. `CURRENT REALITY — AXIS B` · `TUNABLE`
- **Evidence weight and selection weight never mix.** Scoring lives in the mastery reducer; "what to
  offer today" lives in the practice selector. Separate modules, separate tests.
  `INHERITED — ACTIVE ADR` (ADR-0022) + `INHERITED — CANONICAL DOMAIN SOURCE` (Lesson Flow Canon §5.3)
- **Daily Review draws only from the eligible lesson pool and never manufactures pressure**
  ("come back tomorrow", streak language). `INHERITED — CANONICAL DOMAIN SOURCE`
- Whether weakness is permanently residual (the floor) or fully recoverable is founder question
  **FQ-4**. `OPEN`

## 23. Invalidation and error-source handling

`INHERITED — CANONICAL DOMAIN SOURCE`: content, validator, UI-flow, tone, AI-generator and
mastery-mapping errors must not become learner weakness (§7).

`CURRENT REALITY — AXIS B`: **there is no invalidation mechanism.**

- The event log is append-only; there is no delete path and no compensating-event type.
- `ErrorTagCode` is frozen under YASA 3, so a new "invalidated" code cannot be added casually — it
  requires a same-PR manifest registration.
- Compaction folds events into a snapshot at a cursor; a later invalidation would have to invalidate
  the compacted snapshot too.

`PROPOSED FOR FOUNDER RATIFICATION`: invalidation must be **either** an admission-time decision
(the event is never admitted) **or** an explicit compensating record — never a silent mutation of the
log. Which of the two is canonical is founder question **FQ-6**. `OPEN`

## 24. Solo, AI-supported, and future-Social equivalence

`INHERITED — FOUNDER DECISION` (R8 / SOC-026): a future social pedagogical action may count as evidence
**only** under a separately ratified evidence contract satisfying the same validity, prerequisite,
attribution, anti-gaming and error-source requirements as an equivalent non-social action.
**Social context alone never upgrades an action into evidence.** No contract exists, therefore **no
social action is evidence today.**

**Routing (PRJ-009, `OPEN`):** the Mastery & Evidence Bible owns *admissibility and evidence
semantics*; Content and Curriculum are required consulted owners; Engineering owns enforcement;
founder ratification remains required. The contract **must not be designed inside the Social Charter**
— and it is not designed here either. `DEPENDENCY — OWNER NOT YET AUTHORED` for the Curriculum input.

`PROPOSED FOR FOUNDER RATIFICATION`: the same six admissibility conditions (§6) apply identically to
solo, AI-supported and any future social action. **AI praise is not validation**; an AI-supported
success is admissible only if the assistance level is recorded (§12) — which today it is not.

## 25. Mon Lexique relationship

`INHERITED — CANONICAL DOMAIN SOURCE`:

- **Mon Lexique is a learner-facing projection, not a separate wordbook and not the canonical evidence
  store.** Evidence is the mastery/event layer.
- **Three distinct systems, never merged:** Mon Lexique UI ≠ Lexique Memory ≠ Carryover Selector.
- **Pipeline (`HARD INVARIANT`):** learning events / error tags → mastery state (counter-derived) →
  Lexique Memory (derived internal state) → Carryover / Practice selectors → Mon Lexique (learner-facing
  projection).
- **Opening Mon Lexique must not move mastery.** Enforced structurally: the projection modules take no
  event log and write nothing.
- **Learner-safe output only** — never weak tags, counters, raw mastery JSON, operation labels, bucket
  names, validator language, or internal ids.

`CURRENT REALITY — AXIS B`: `FEATURES.monLexique = false` in dev-apk; the selector is sandbox-only.
Mon Lexique's product-stage exposure is an `OPEN` decision owned by Product, not by this Bible.

## 26. Practice and recycling relationship

- **Selection weight ≠ evidence weight** (§13, §22). The practice selector *"never scores anything."*
  `INHERITED — ACTIVE ADR` (ADR-0022)
- **Practice Hub selector priority:** SRS due (oldest first) → weakest weak-point tag → upcoming
  integration lesson's need list → diversity (never more than 2 consecutive same-family picks).
  `INHERITED — CANONICAL DOMAIN SOURCE` (Lesson Flow Canon §5.2)
- **`recycled` is a query-time carryover role, not a stored mastery status.** It is deliberately absent
  from the intrinsic lifecycle status set. `INHERITED — CANONICAL DOMAIN SOURCE` · `CURRENT REALITY — AXIS B`
- **Hub drills are derived**, not hand-authored, and derivation is fail-closed.
  `INHERITED — ACTIVE ADR` (ADR-0022)
- **The Practice Hub never gates a lesson.** `INHERITED — CANONICAL DOMAIN SOURCE`
- **Lesson completion is attempt coverage, not mastery.** `selectLessonProgress` marks an exercise
  attempted on *any* result — including `empty_or_skip` and recognition reveals — and `completed` means
  every required exercise was attempted at least once. Deliberately **not** "mastered."
  `CURRENT REALITY — AXIS B`

## 27. Content boundary

**Content owns:** authored item and role definitions; learner-facing exercise and feedback policy; the
intended pedagogical target of an authored action; prerequisite-safe presentation.
`INHERITED — CANONICAL DOMAIN SOURCE` (Authority & Routing Spec §2.1)

**This Bible therefore does not decide:** which items exist, what an exercise teaches, what feedback
copy says, or whether a form may be shown before it is taught. It consumes those as inputs.
Prerequisite safety is a Content property that this Bible *reads* as an admissibility condition (§6.4).

**Consulted, not owner:** Content is a required consulted owner for any social evidence contract
(PRJ-009).

## 28. Curriculum boundary

**Curriculum owns:** sequencing; readiness; when evidence opportunities are introduced; expected
evidence distribution by level or band. `INHERITED — CANONICAL DOMAIN SOURCE`

`DEPENDENCY — OWNER NOT YET AUTHORED.` Consequently the following are **routed and stopped**, not
decided here: staged strictness by lesson band (§15); the Readiness Gate's diagnosis/prescription
contract; integration-lesson need lists; the `LessonEvidenceProfile` distribution per lesson (§13).

## 29. Engineering boundary

**Engineering owns:** event schemas; storage; validators; algorithms; sync; runtime enforcement; the
implementation of the semantic contract. `INHERITED — CANONICAL DOMAIN SOURCE`

`DEPENDENCY — OWNER NOT YET AUTHORED` (several active ADRs already bind parts of this domain).

**Routed and stopped:** whether the chain-aggregation rule belongs in the controller or the reducer
(§20); how invalidation is physically represented (§23); whether the two disjoint stores converge and
how (§37); compaction correctness; the O(n²) re-derivation cost.

## 30. Social boundary

**Social owns the negative bound only.** Engagement signals never become evidence; Social opening
governance is Social's. **Social never owns positive evidence semantics.**
`INHERITED — CANONICAL DOMAIN SOURCE` + `INHERITED — FOUNDER DECISION` (R8)

This Bible therefore **does not create a positive social evidence rule**, and explicitly declines to.
PRJ-009 remains `OPEN` and requires a separately ratified contract plus founder ratification.

## 31. Privacy boundary

**Routed and stopped** — this Bible decides none of: data-retention periods, lawful basis,
jurisdiction, minors policy, analytics export depth, personal-data storage architecture.
`DEPENDENCY — OWNER NOT YET AUTHORED` (Privacy / Legal)

Inherited constraints it must respect: local-first by default with the event log as on-device source of
truth; no remote ingestion without a consent gate; no `service_role` on the client; RLS on; legal
review required before public/tester launch. `INHERITED — ACTIVE ADR` (ADR-0023)

Note for Privacy: `userAnswer` is **raw learner text stored inside the evidence record itself**. Any
retention decision therefore lands directly on the evidence log.

## 32. Operations and QA boundary

**Operations & QA owns** evidence-system QA execution, audit procedure, incident handling, and release
gates. `INHERITED — CANONICAL DOMAIN SOURCE` · `DEPENDENCY — OWNER NOT YET AUTHORED`

This Bible does not define who runs an evidence audit, at what cadence, or what an evidence incident
is. It does record (§38) what is currently tested and what is not.

## 33. Invariants

Proposed hard invariants. Those marked *inherited* are restatements; those marked *proposed* are new
and require ratification.

| # | Invariant | Provenance |
|---|---|---|
| I-1 | Evidence is derived from an append-only event log; mastery is never primary state. | `INHERITED — ACTIVE ADR` (0009) |
| I-2 | A scoring-policy change re-derives; it never migrates. | `INHERITED — ACTIVE ADR` (0009) |
| I-3 | The evidence engine is pure, deterministic, explicit-`now`, fail-closed. | `INHERITED — ACTIVE ADR` (0010) |
| I-4 | AI may explain; AI never overrides grading. | `INHERITED — ACTIVE ADR` (0009) |
| I-5 | A shipped error tag is immutable forever. | `INHERITED — ACTIVE ADR` (0013) |
| I-6 | Completion, reveal, display and AI praise are never mastery. | `INHERITED — CANONICAL DOMAIN SOURCE` |
| I-7 | Engagement signals are never evidence. | `INHERITED — FOUNDER DECISION` (R8) |
| I-8 | Only verified learner-sourced error creates weakness. | `INHERITED — CANONICAL DOMAIN SOURCE` |
| I-9 | Exposure/ghost production failure cannot create weakness. | `INHERITED — CANONICAL DOMAIN SOURCE` |
| I-10 | Recognition alone never adds an item to Mon Lexique. | `INHERITED — CANONICAL DOMAIN SOURCE` |
| I-11 | Evidence weight and selection weight never mix. | `INHERITED — ACTIVE ADR` (0022) |
| I-12 | `recycled` is a query-time role, never a stored mastery status. | `INHERITED — CANONICAL DOMAIN SOURCE` |
| I-13 | Repair reduces urgency; it never restores mastery or erases history. | `INHERITED — CANONICAL DOMAIN SOURCE` |
| I-14 | Opening a learner-facing projection must not move mastery. | `INHERITED — CANONICAL DOMAIN SOURCE` |
| I-15 | The learner never sees raw grading codes, counters, or internal ids. | `INHERITED — CANONICAL DOMAIN SOURCE` |
| I-16 | No social action is evidence without a separately ratified evidence contract. | `INHERITED — FOUNDER DECISION` (R8) |
| I-17 | Admissibility and attribution are gates that precede any mastery effect. | `PROPOSED FOR FOUNDER RATIFICATION` |
| I-18 | Correctness alone is not admissibility. | `PROPOSED FOR FOUNDER RATIFICATION` |
| I-19 | An event whose assistance level is unknown is not fully admissible evidence. | `PROPOSED FOR FOUNDER RATIFICATION` |
| I-20 | Invalidation is never a silent mutation of the log. | `PROPOSED FOR FOUNDER RATIFICATION` |

## 34. Tunable parameters

Shape fixed; value changeable without a founder decision, *once the shape is ratified*.

`WEAK_THRESHOLD` · `LEITNER_INTERVAL_DAYS` · prompt-fade depth · repair eligibility threshold
(twice-in-a-lesson / two-lesson — explicitly `TUNABLE`, "not empirical") · `TODAYS_SET_MIN/MAX` ·
`MAX_CONSECUTIVE_SAME_FAMILY` · Lexique Memory weights, thresholds and half-lives ·
`WEAKNESS_K` · `WEAK_RESIDUAL_FLOOR`.

> **A constant is not a decision.** Every value above currently exists in code with no founder ruling.
> Listing it as `TUNABLE` is a proposal about its *class*, not a ratification of its *value*. See **FQ-7**.

## 35. Current runtime constants

`CURRENT REALITY — AXIS B` only. Full detail in
[`MASTERY_EVIDENCE_CURRENT_REALITY_AND_ENFORCEMENT_MAP_v0.1.md`](MASTERY_EVIDENCE_CURRENT_REALITY_AND_ENFORCEMENT_MAP_v0.1.md).

`MASTERY_SNAPSHOT_VERSION = "mastery-v0.2"` · `WEAK_THRESHOLD = 3` ·
`LEITNER_INTERVAL_DAYS = [0,1,3,7,30]` · `MAX_LEITNER_BOX = 4` · `PF_LEVELS = PF0..PF3` ·
`PRODUCTION_OPS` = 4 members · `PRECISION_TAGS` = 2 members · `ErrorTagCode` = 16 values ·
`WEAK_POINT_TAGS` = 27 values (verified) · frozen tag manifest = 54 (verified) ·
`TODAYS_SET_MIN/MAX = 5/8` · `MAX_CONSECUTIVE_SAME_FAMILY = 2` · Lexique Memory:
`STRENGTH_K 2.5`, `WEIGHT_PRODUCTION 1.0`, `WEIGHT_RECOGNITION 0.25`, `WEIGHT_TRANSFER 0.7`,
`WEIGHT_RECOMBINATION 0.7`, `WEIGHT_REPAIR 0.5`, `SUPPORTED_THRESHOLD 0.4`, `STRONG_THRESHOLD 0.7`,
`WEAKNESS_K 2.0`, `REPAIR_DISCOUNT 0.5`, `WEAK_RESIDUAL_FLOOR 0.15`, `HALF_LIFE_DEFAULT_DAYS 5`,
`HALF_LIFE_STRONG_DAYS 14`, `REFRESH_DUE_THRESHOLD 0.5`, `DORMANT_DECAY_THRESHOLD 0.5` ·
legacy `MASTERY_THRESHOLDS` (0.6–0.7 per section) · legacy weak spot = 3+ errors keyed by answer string.

## 36. Deferred directions

- **Staged strictness** by band / phase / prompt-fade / item maturity / `accentCriticality`. `DEFERRED`
- **Readiness Gate** (integration-lesson diagnosis + prescription, fail-open). `DEFERRED` — Curriculum.
- **Remote sync / dashboard analytics** of evidence. `DEFERRED` — consent-gated (ADR-0023).
- **Word Graph adjacency** over evidence. `DEFERRED` — post-beta.
- **A positive social evidence contract.** `DEFERRED` — requires a scoped Social opening (PRJ-009).

## 37. Current implementation reality

`CURRENT REALITY — AXIS B` — the single most important fact about this domain:

> **The shipped surface emits no learning events. Therefore no evidence exists in production.**

- `FEATURES.v1LessonEngine` is `true` **only** in `sandbox`; it is `false` in **both** `dev-apk` and
  `public-beta`. **Member audit: all three stages were read; there are exactly three, and only one
  enables the engine.**
- The learner renderer route is gated on `PRODUCT_STAGE === "sandbox" && FEATURES.v1LessonEngine`, with
  no public-nav exposure.
- The shipped dev-apk lesson screen runs the legacy v1 renderer, which computes correctness locally and
  writes **no** `LearningEvent`.
- **Two disjoint evidence stores exist:** legacy `lm7` / `lm7_srs` (shipped) and `lm_le_events` /
  `lm_le_snapshot` (sandbox). ADR-0020 forbids papering over this with fake `lm7` markers.
- **`lm_le_telemetry` is a third store and never updates mastery** — local-only content-debugging, no
  raw learner free-text, constructor rejects unknown keys.

## 38. Enforcement state

Mixed and source-specific. **These four dimensions must not be collapsed.**

| Rule area | Runtime | Tests | Shipped | Enforced by |
|---|---|---|---|---|
| Grading vocabulary immutability | ✔ | ✔ `shippedErrorTags.test.ts` | ✔ (validator runs in CI) | `validate:content` hard error |
| Mastery reducer semantics | ✔ | ✔ `mastery.test.ts`, `nearMissMasteryTiming.test.ts` | ✘ sandbox-only | unit tests |
| Chain aggregation bound | ✔ (controller) | ✔ `contextChainMasteryWeight.test.ts` | ✘ | unit test |
| Grading determinism | ✔ | ✔ `gradeAnswerCheck.test.ts` | ✘ | unit test |
| Lesson progress = attempt coverage | ✔ | ✔ `lessonProgress.test.ts` | ✘ | unit test |
| Lexique Memory weights/decay | ✔ | ✔ `lexiqueMemory.test.ts` | ✘ unwired | unit test |
| Practice selection priority | ✔ | ✔ `practiceSelector.test.ts` | ✘ | unit test |
| Carryover roles | ✔ | ✔ `carryoverSelector.test.ts` | ✘ | unit test |
| Feedback-verdict bridge | ✔ | ✔ `errorEngine.test.ts` | ✘ (v1 computes feedback locally) | unit test |
| No XP/streak/reward language | ✔ | ✔ copy-guard tests | ✔ | build-time copy guard |
| Attribution / error-source | ✘ | ✘ | ✘ | **policy only** |
| Admissibility gate | ✘ | ✘ | ✘ | **not expressed anywhere** |
| Repair eligibility & flow | ✘ | ✘ | ✘ | **policy only** |
| Evidence weighting | ✘ (reducer) | — | ✘ | **canon asserts it; no implementation** |
| Invalidation | ✘ | ✘ | ✘ | **no mechanism** |

## 39. Open decisions

Each maps to a founder question in the Review Surface and to `ME-###` rows in the Decision Matrix.

1. **`spelling_near_miss` polarity** — active ADR vs shipped code. **FQ-1**
2. **Differential evidence weight** — canon asserts a multiplier; the reducer has none. **FQ-2**
3. **Assistance as an evidence input** — hint usage never reaches evidence. **FQ-3**
4. **Weakness permanence** — residual floor vs full recovery. **FQ-4**
5. **Mastery vocabulary** — counters only, or a named ladder. **FQ-5**
6. **Invalidation model** — admission-time refusal vs compensating record. **FQ-6**
7. **Which constants are founder-locked vs tunable.** **FQ-7**
8. **Scope** — does this Bible bind the legacy shipped surface, or only the engine? **FQ-8**

Additionally `OPEN` without a founder question (routed elsewhere or lower priority): confidence
representation (§13); conflicting-evidence ordering (§21); cross-session/lesson/family aggregation
(§20); PRJ-009 social evidence contract (§30, requires a scoped Social opening first).

## 40. Non-claims

- This Bible **does not claim** any of its proposed rules is in force.
- It **does not claim** the current implementation is correct, complete, or intended.
- It **does not claim** that a rule with a test is therefore shipped — most are sandbox-only (§37).
- It **does not claim** the "9-state" model exists (§18).
- It **does not claim** that precision is universally harmless (§15 — the claim fails on
  `spelling_near_miss`).
- It **does not claim** authority over Content, Curriculum, Engineering, Social, Privacy or Operations.
- It **does not claim** that founder Q2 authorized any implementation. It authorized an *owner*.
- Absence of a rule here is **not** a rejection of that rule.

## 41. Promotion prerequisites

Before this Bible may be promoted Draft → Canonical, **all** of the following must hold:

1. Every founder question in the Review Surface marked `REQUIRED NOW` or `REQUIRED BEFORE PROMOTION`
   is answered and recorded in a founder ratification record.
2. Every `ME-###` row with `founder decision required = yes` has a recorded decision or an explicit
   deferral.
3. Every universal claim in this document has a completed member audit or is downgraded.
4. All derived counts are recalculated from actual rows.
5. **An independent adversarial review by a reviewer other than this document's author** is completed
   and its findings resolved. That review must specifically test: authority · status · source routing ·
   universal claims · collection/member boundaries · counts · gates · supersession · current reality ·
   implementation authority · weakest-member exceptions · silent no-op edits · already-satisfied build
   gates · current-reality-versus-intended-semantics confusion · accidental implementation authority.
6. No statement in this document has become an implementation authorization.

**Standing requirement.** Every authority-bearing Mastery & Evidence promotion — this one and every
future one — requires an independent adversarial review by a reviewer other than the primary author.
This is recorded here as a permanent property of the domain, not a one-off condition.

> **Note on the build gate.** Promotion to Canonical is **not** an implementation opening. A future
> implementation of the semantic contract requires a *new*, scoped, fourteen-element founder opening
> issued **after** promotion. The existence of this Bible, its ratification, and its merge are all
> insufficient — by construction, none of them can satisfy that gate.

## 42. Change history

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-07-26 | 1.0 Draft | Initial Draft authored under the founder's Step 1 scoped opening. Recovered sources repository-wide; classified every normative statement by provenance; recorded five bucket classes against the code's actual behaviour; documented the `spelling_near_miss` contradiction, the missing evidence-weight implementation, the absent admissibility/attribution/invalidation mechanisms, the "9-state" claim failure, and the two-disjoint-store reality. **No file outside `docs/bibles/mastery-evidence/` modified. No code, schema, event, threshold, validator or UI changed. No implementation authorized. Not Canonical.** | Cloud session (Step 1 draft) |
