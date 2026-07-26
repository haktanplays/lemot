---
title: Mastery & Evidence Founder Ratification v0.1
version: 0.1
status: Founder-ratified decision record — all eight review questions answered
authority: founder decisions FQ-1…FQ-8 (all eight) + the FQ-1 general tag clarification
decision_date: 2026-07-26
owner: Mastery & Evidence
implementation_authority: none
---

# Mastery & Evidence — Founder Ratification v0.1 (Rounds 1–2, complete)

**All eight founder questions are answered.** The **semantic decision surface is complete**. The Bible
**remains Draft**, and this record **remains supporting and non-Canonical**.

> **What this record is.** A durable statement of eight semantic rulings, one clarification, and their
> exact boundaries.
> **What it is not.** An implementation opening, a promotion, an ADR amendment, an independent review,
> or a licence to modify any system the Bible now governs.

> **Completing the question set is not a promotion event.** Two promotion prerequisites remain open:
> the **source amendments** (ADR-0021, ADR-0022, Lesson Flow Canon §5.3, three vault/status documents,
> `learning-engine-v1.md:100`) and the **independent adversarial review**, which has **not** been
> performed. **Founder-locked exact numeric values: zero.**

---

## 1. Scope

| | |
|---|---|
| Decisions ratified | **All eight.** Round 1: **FQ-1** polarity · **FQ-6** invalidation · **FQ-8** domain scope. Round 2: **FQ-2** evidence strength · **FQ-3** assistance · **FQ-4** weakness recovery · **FQ-5** mastery vocabulary · **FQ-7** locked vs tunable · plus the **FQ-1 general tag clarification** |
| Decision date | **2026-07-26** (both rounds) |
| Ratifies | **Semantics only** — what Cairn *means*, never what it *does* |
| Does not ratify | **Any exact numeric value.** Founder-locked numbers: **zero** |
| Still unanswered | **Nothing.** Zero founder questions remain |
| Documents amended | The six Mastery & Evidence package files only |
| Documents **not** amended | **ADR-0021** · **ADR-0022** · **Lesson Flow Canon** · any other ADR · any vault file · any Canonical document |
| Code, schema, tags, manifests, tests, validators, thresholds, runtime | **Unchanged** |
| Implementation | **Not opened** |
| Independent adversarial review | **Not performed** |
| Promotion | **Did not occur** |

---

## 2. FQ-1 decision — meaning-based near-miss polarity

**Founder answer:** `FQ-1 = C — polarity is determined by semantic effect, not by the spelling_near_miss tag alone.`

**Final semantic rule:**

1. **A meaning-preserving orthographic slip is a precision signal** — no failure, no weakness, and no
   mastery demotion solely from that slip.
2. **A meaning-changing lexical, grammatical, or minimal-pair substitution may be negative evidence and
   may create weakness.**
3. **The existing `spelling_near_miss` tag is too coarse** to establish which case occurred.
4. Therefore:
   - `spelling_near_miss` alone is **not Canonical proof of precision**;
   - `spelling_near_miss` alone is **not Canonical proof of weakness**;
   - **ambiguous events may not establish weakness until their semantic class is attributable.**
5. Current sandbox code that automatically accrues weakness for this tag is `CURRENT REALITY — AXIS B`,
   **provisional**, and **non-conforming** with the founder rule where meaning is unknown.
6. **ADR-0021's current member list requires a future scope amendment.**
7. **No ADR, code, schema, manifest, tag, test, validator or runtime file was changed.**

**Notable:** the founder rejected *both* framings offered. Neither the Draft recommendation (keep the
code, amend the ADR) nor the strongest alternative (restore the three-member bucket) was adopted — the
ruling moved the question from *which bucket* to *what meaning*. Both original options are preserved
verbatim in the review card for provenance.

---

## 3. FQ-6 decision — evidence invalidation

**Founder answer:** `FQ-6 = A — refuse inadmissible evidence at admission; use an append-only compensating invalidation record for defects discovered later.`

**Final semantic rule:**

1. Where a **non-learner error is knowable before evidence admission**, the result is **not admitted as
   learning evidence**.
2. Where the error is **discovered after admission**:
   - the **historical event remains immutable**;
   - a **compensating invalidation record** references the affected evidence;
   - **mastery projections must neutralize the invalidated evidence's pedagogical effect**;
   - **audit history remains intact**.
3. **Evidence is never deleted or silently mutated.**
4. **Content, validator, UI-flow, tone, AI-generator, system, and mastery-mapping errors must never
   create learner weakness.**
5. **Exact schema, event names, cache invalidation, reconciliation algorithm, and storage
   implementation remain Engineering decisions.**
6. **This founder decision authorizes documentation semantics only and no implementation.**

---

## 4. FQ-8 decision — domain-wide scope

**Founder answer:** `FQ-8 = A — the Bible governs the Mastery & Evidence domain across all Cairn evidence-bearing systems.`

**Final rule:**

- The Bible governs semantic evidence and mastery rules across: the **learning engine** · **legacy
  `lm7` weak spots** · **legacy `lm7_srs`** · **legacy per-section mastery thresholds** · **any future
  replacement system**.
- **Telemetry or engagement data that is not learning evidence remains outside scope.**
- Legacy systems must be recorded as: **current Axis-B reality**; **legacy-active** where applicable;
  **non-conforming** where they conflict with the Bible; **frozen and intended for
  replacement/convergence rather than retrofit**.
- **Domain coverage does not authorize modifying legacy systems.**
- **Engineering will later own replacement and convergence mechanics.**

---

## 4a. FQ-2 decision — differential evidence strength

**Founder answer:** `FQ-2 = A — evidence has differential semantic strength at admission; exact numeric weights remain tunable and unratified.`

1. **Production evidence is stronger than recognition evidence for independent language use.**
2. **Recognition is valid evidence** but does not alone prove independent production or ownership.
3. **Evidence strength is a semantic property attached at admission.**
4. Strength may influence mastery projections and scheduling, but **exact algorithms belong to Engineering**.
5. **Recognition-only evidence must not independently produce the longest review interval** or equivalent strongest mastery claim.
6. Existing `lexique-memory.ts` weights are **current candidate values only**.
7. **No current multiplier, interval, or numeric weight is founder-ratified.**
8. **Retire or amend any claim that a weighting mechanism already exists in the current mastery reducer.**
9. **Evidence strength and selection priority remain separate concepts.**

**Consequence:** rule 8 retires a claim carried by **two active canon sources** — ADR-0022's *"evidence
weight (mastery multiplier)"* and Lesson Flow Canon §5.3's placement of that multiplier in the reducer.
**The separation principle (rule 9 / ADR-0022) survives untouched.** The source amendments are
**pending, not applied**.

---

## 4b. FQ-3 decision — assistance and evidentiary claim

**Founder answer:** `FQ-3 = C — assistance changes what a success proves, not whether the learner action exists.`

1. **An unaided success may support a claim of independent performance.**
2. **A hinted or assisted success is valid evidence of supported performance.**
3. **Assisted success must not be treated as equivalent to independent production.**
4. **Reveal, answer exposure, model answer, or copy-ready output are exposure/support events, not mastery evidence.**
5. **Unknown assistance does not automatically invalidate historical evidence.**
6. **Evidence with unknown assistance may not establish independent production.**
7. **Prompt-fade history is not a substitute for attempt-level assistance attribution.**
8. Exact assistance fields, event representation, UX treatment and strength calculations belong to **Engineering and UX**.
9. **This decision authorizes documentation semantics only.**

**Consequence:** the founder chose **C**, rejecting both offered options. Rule 5 **corrects the Draft's
own proposal**: the Draft's invariant I-19 would have made every historical event "not fully
admissible." **I-19 was amended** to the founder's narrower and better rule.

---

## 4c. FQ-4 decision — recoverable weakness, persistent history

**Founder answer:** `FQ-4 = A — current weakness is recoverable; weakness history persists.`

1. Distinguish **`currently weak`** from **`ever weak`**.
2. **Current weakness drives immediate repair, return, and challenge eligibility.**
3. **Current weakness may clear after successful repair plus spaced confirmation.**
4. **Historical weakness remains available as a caution signal.**
5. **Historical weakness alone must not keep an item permanently in Challenge.**
6. **Successful repair does not instantly establish strong mastery.**
7. **The current reducer's permanent weakness caused by monotone counters is Axis-B reality, not intended semantics.**
8. Exact clearing conditions, counters, time windows and data structures remain **Engineering and Curriculum** decisions.

**Consequence:** rule 7 confirms the Draft's finding that permanence was an **accident**, not a choice.
**Confirming it as unintended does not authorize changing it.**

---

## 4d. FQ-5 decision — mastery representation and vocabulary

**Founder answer:** `FQ-5 = C — counter-derived mastery is the source of truth; Cairn has no single universal named mastery ladder.`

1. **Counter-derived evidence projection remains the semantic source of truth.**
2. **The phrase "9-state mastery" is `SUPERSEDED`.**
3. **No named state ladder is stored as the universal mastery truth.**
4. Domain consumers may define explicit derived projections for their own purpose: **Mon Lexique · Practice · Curriculum readiness · learner-facing UX**.
5. A derived projection **must name its purpose**; **must define its mapping from the source snapshot**; **must not claim to be the universal mastery state**; **must not be substituted for another projection**.
6. **The existing eight lifecycle statuses are not automatically adopted** as the universal mastery vocabulary.
7. Future projection naming belongs to the **relevant domain owner** and must remain **derivable from evidence truth**.

**Consequence:** the founder chose **C**, rejecting both offered options, and rule 6 **explicitly
declines the Draft's recommendation** to adopt the eight lifecycle statuses because they already exist
and are tested. **Existence and convenience do not confer universality** — the same principle as
DOC-015's directory-membership rule, applied to a status enum.

---

## 4e. FQ-7 decision — locked promises, tunable numbers

**Founder answer:** `FQ-7 = A — founder-lock semantic promises and structural shapes; keep all exact numeric values tunable.`

**Founder-locked semantic promises (eight):** one isolated error does not automatically establish
weakness · production is stronger evidence than recognition for independent use · assistance changes the
evidentiary claim · weakness can recover · weakness history may persist without permanent punishment ·
spaced return exists · repair requires later confirmation · non-learner error never creates learner
weakness.

**Tunable and NOT founder-locked (twelve classes):** weakness threshold values · Leitner intervals · box
count · prompt-fade level count · daily-set sizes · diversity caps · decay rates and floors · repair
success counts and timing · recognition/production numeric weights · Lexique Memory constants · legacy
section thresholds · **all other current numeric constants**.

**No exact number becomes Canonical through this decision. Founder-locked exact values: zero.**

---

## 4f. FQ-1 general clarification — tags are not semantic polarity

1. The meaning-based polarity principle applies to **every** technical error tag, not only `spelling_near_miss`.
2. **A technical tag describes an observed surface relation; it does not automatically decide the pedagogical meaning.**
3. **`accent_only` may be meaning-preserving *or* meaning-changing.**
4. `ou`/`où`, `a`/`à`, `sur`/`sûr` **prevent a universal claim that every accent-only event is precision.**
5. **`punctuation_only` must likewise be evaluated against the authored target** where punctuation changes the intended communicative act.
6. **Where semantic effect is unknown, the event may not independently establish weakness *or* full precision credit.**
7. Exact classification and implementation remain future **Content and Engineering** work.
8. **This is a clarification of FQ-1's founder rule, not an implementation opening.**

**Consequence:** this **closes the Round-1 `accent_only` open item** by generalizing the principle
rather than adding a ninth question. **No ninth founder question was created.** Rule 5 extends the
principle to `punctuation_only`, which no source had previously questioned.

---

## 5. Semantic consequences

Applied across the Draft package:

| Where | Change |
|---|---|
| Bible §2.1 (new) | Domain scope table; three explicit limits on what scope does *not* grant |
| Bible §10 | Polarity is `INHERITED — FOUNDER DECISION`, defined by semantic effect |
| Bible §15 | Rewritten; five-bucket table demoted to a description of code; `spelling_near_miss` classified as an **ambiguous technical tag**, not a polarity |
| Bible §14 | Legacy weakness system named as governed **and** non-conforming |
| Bible §23 | Rewritten to the admission-refusal + compensating-record rule; all seven non-learner error-source classes confirmed covered |
| Bible §33 | **I-20 … I-25** added as `INHERITED — FOUNDER DECISION` |
| Bible §37, §38 | Scope consequence recorded; three ratified-but-unenforced rows added to the enforcement table |
| Bible §39 | Split into *resolved in Round 1* and *still open* |
| Bible §41 | Promotion gate updated — and explicitly **not met** |
| Decision Matrix | **8 rows** moved to `INH-FOUNDER` / `LOCKED`: ME-004, ME-007, ME-011, ME-012, ME-027, ME-032, ME-047, ME-048; ME-026 annotated; distributions recalculated from rows |
| Gap Map | §8.1, §8.3, §13, §15, §18, §19 updated with a five-way status split (semantic / patch / runtime / review / remaining questions) |
| Review Surface | FQ-1, FQ-6, FQ-8 headed `FOUNDER ANSWERED — 2026-07-26`; cards preserved in full; compact template rewritten |

**Round 2 additionally applied:** Bible §11/§13 (FQ-2 strength at admission; weighting-exists claim
retired) · §12 (FQ-3 assistance; **I-19 amended**) · §14 (FQ-4 two-fact weakness split) · §18 (FQ-5
counters-as-truth; eight statuses declined) · §15 (FQ-1 clarification generalized to all tags) · §34
(FQ-7 eight promises locked, twelve number classes tunable) · §38 five ratified-but-unenforced rows ·
§39 resolved/open split · §40 four new non-claims · §41 gate updated. Matrix: **8 further rows** to
`INH-FOUNDER`/`LOCKED` (ME-017, ME-020, ME-022, ME-026, ME-030, ME-033, ME-034, ME-046); distributions
recalculated mechanically. Reality Map: **five further `⚠ DIVERGENCE` annotations**, no fact changed.

**New invariants (semantics only, zero enforcement):**

| Round | Invariants |
|---|---|
| 1 | I-20 never deleted/mutated · I-21 refuse at admission · I-22 neutralize + audit intact · I-23 polarity is semantic · I-24 ambiguity blocks weakness · I-25 coverage ≠ permission |
| 2 | **I-19 AMENDED** (unknown assistance does not invalidate) · I-26 assistance scopes the claim · I-27 support events are not evidence · I-28 prompt-fade ≠ attempt attribution · I-29 strength at admission · I-30 production > recognition · I-31 recognition-only never reaches the longest interval · I-32 weakness recoverable, history persists · I-33 repair ≠ instant strength · I-34 counters are truth, no universal ladder · I-35 projections must name purpose and mapping · I-36 tags never decide meaning · I-37 zero exact numbers locked |

**The Round-1 `accent_only` open item is CLOSED** by the FQ-1 general clarification (§4f) — generalized
to every tag, **without creating a ninth founder question**.

---

## 6. Current-reality consequences

**None.** No runtime fact changed. The Current Reality and Enforcement Map remains Axis B, and gained
only **`⚠ DIVERGENCE` annotations** recording where behaviour now differs from ratified semantics:

| # | Divergence | Status |
|---|---|---|
| 1 | The reducer accrues `weakTags` for **every** `spelling_near_miss`, including meaning-unknown events | **Provisional, non-conforming**; no correction authorized |
| 2 | `PRECISION_TAGS` is defined by tag, not meaning; `accent_only` counter-examples are invisible to it | Recorded; no correction authorized |
| 3 | **No invalidation mechanism exists** — no error-source field, no compensating record type, no reconciliation path | Ratified semantically; **nothing built** |
| 4 | Legacy shipped weak-spot tracker performs no attribution | Governed, **non-conforming**, frozen; **not authorized for modification** |

**The shipped picture is unchanged and uncomfortable, by design:** the engine conforms but does not
ship; the legacy systems ship but do not conform. **No shipping Cairn build currently produces
conforming evidence.**

---

## 7. Required future source amendments

**None of these has been applied. Each requires its own authorization.**

1. **ADR-0021 scope amendment** — its member list places `spelling_near_miss` in Precision. FQ-1 makes
   that member list wrong. **The ADR must be amended, not repealed** — its precision *principle* stands
   and was vindicated. **ADR-0021 is untouched** and remains `status: active` / `canon_status:
   canonical`.
2. **Three stale source documents** repeating the same claim: `docs/status/founder-self-learning-mastery-precision-policy.md`
   §2 table · vault `Mastery Model.md` bucket table · vault `Feedback and Scoring Philosophy.md`
   near-miss line. All are operator-vault or status records; none was changed.
3. **A ruling (or explicit deferral) on the `accent_only` exception** opened by Round 1.

---

## 8. Explicit non-authorizations

This ratification does **not**:

- promote the Bible or any supporting record to Canonical;
- open any implementation, of any part, in any system;
- authorize modifying **any legacy system** — governing a system is not permission to change it;
- amend ADR-0021 or any other ADR;
- change any code, schema, event shape, event name, tag, manifest, test, validator, threshold, interval,
  feature gate, or runtime file;
- decide schema, cache invalidation, reconciliation algorithm or storage — those are **Engineering's**;
- resolve the two-system weakness divergence, the evidence-weight gap, or any implementation gap;
- satisfy any build gate. A future implementation still requires a **new**, scoped, fourteen-element
  founder opening issued **after** promotion — which has not happened.

---

## 9. Questions still open — zero founder questions; four non-founder items

**Founder questions outstanding: ZERO.** All eight answered; the one item Round 1 opened is closed by
the FQ-1 clarification.

**What remains open is not a founder question:**

| Open item | Owner | Why it is not a founder question |
|---|---|---|
| ME-043 — the reducer is deterministic but **not order-invariant** | Engineering | An Axis-B property never ruled on; needs a mechanism decision, not a semantic one |
| ME-052 · ME-053 · ME-055 · ME-056 | Curriculum · Engineering · Privacy/Legal · Operations & QA | Routed to layers that **do not exist yet** |
| ME-003 · ME-049 | Mastery & Evidence | Editorial/structural proposals, resolvable without the founder |
| Confidence representation | Mastery & Evidence | No source anywhere; not yet worth a question |

**Every implementation divergence remains unresolved** — see §6.

---

## 10. Promotion state

**NOT PROMOTED.** The Bible remains `Draft — awaiting founder ratification`.

| Promotion prerequisite | State |
|---|---|
| All `REQUIRED NOW` / `REQUIRED BEFORE PROMOTION` questions answered | **✔ — all eight** |
| Every `founder decision required` row decided or deferred | **✔ — zero rows remain** |
| Universal claims member-audited or downgraded | ✔ — re-run both rounds |
| Counts recalculated from rows | ✔ — recalculated mechanically |
| No statement became an implementation authorization | ✔ |
| **Source amendments applied** — ADR-0021 · ADR-0022 · Lesson Flow Canon §5.3 · three vault/status docs · `learning-engine-v1.md:100` | **✘ — none applied** |
| **Independent adversarial review by a non-author** | **✘ — not performed** |

**Five of seven met. The Bible is not promotable.**

> **The two remaining prerequisites are exactly the two that cannot be satisfied by answering
> questions.** Completing the founder-decision surface moved five gates and could never have moved
> these. Neither is satisfied by this record, by the commit that carries it, or by any future round of
> answers.

---

## 10a. Member audits (re-run, Round 2)

Every set below was enumerated in full and each member inspected individually. **No count was derived
from a regex over IDs, citations, headings, or examples.**

### Assistance members — 8

| Member | Reaches the event? | Ruling under FQ-3 |
|---|---|---|
| Unaided attempt | ✘ (not distinguishable) | May support an **independent-performance** claim |
| Hint L1 | ✘ | Valid evidence of **supported** performance |
| Hint L2 | ✘ | Valid evidence of **supported** performance |
| Reveal | ✘ | **Support event, not evidence** |
| Model answer | ✘ | **Support event, not evidence** |
| Prompt-fade history | **✔** (`promptLevel`) | Present, but **explicitly not a substitute** for attempt-level attribution (rule 7) |
| AI support | ✘ | Assisted; **AI praise is never validation** |
| Unknown assistance | n/a | **Does not invalidate history**; **may not establish independent production** |

**1 of 8 reaches the evidence layer, and the founder rule declares that one insufficient.**

### Evidence-strength members — 8

| Member | Semantic strength | Numeric weight |
|---|---|---|
| Production | **Strongest** for independent use | **Unratified** (`lexique-memory` candidate 1.0) |
| Recognition | Valid; **never alone proves independent production or ownership**; **never the longest interval** | **Unratified** (candidate 0.25) |
| Transfer | Not ruled; source events do not exist | **Unratified** (candidate 0.7) |
| Recombination | Not ruled; source events do not exist | **Unratified** (candidate 0.7) |
| Repair | Reduces urgency; **never instant strong mastery** (FQ-4) | **Unratified** (candidate 0.5) |
| Precision | Not failure; **context-dependent** under the FQ-1 clarification | **Unratified** |
| Skip | Neutral | **Unratified** |
| Invalidated evidence | **Pedagogical effect neutralized** (FQ-6) | **No mechanism exists** |

**No exact numeric weight was assigned to any member. Founder-ratified weights: zero.**

### Weakness members — 5

| Member | Represented in the reducer? |
|---|---|
| Current weakness (`currently weak`) | ✘ — `isWeak` exists but never clears |
| Historical weakness (`ever weak`) | ✘ — no such field |
| Repair completed | ✘ — no repair path at all |
| Spaced confirmation completed | ✘ — no scheduler |
| Recurring / chronic weakness | ✘ — no distinction from a single crossing |

**0 of 5 represented.** The reducer collapses all five into one permanent boolean.

### Mastery projections — 6 candidates, none universal

| Candidate | Members | Universal? |
|---|---|---|
| `monLexiqueStatus` | 3 | ✘ — a Mon Lexique projection |
| `practiceEligibility` | 4 | ✘ — a Practice projection |
| `LEXIQUE_LIFECYCLE_STATUSES` | 8 | ✘ — **explicitly declined** by FQ-5 rule 6 |
| `learning-engine-v1.md` planning ladder | 5 | ✘ — planning vocabulary |
| `itemRegistry` status field | 3 (observed) | ✘ — a content field |
| Pipeline Rule 6 | 4 | ✘ — an authoring distinction |

**None becomes universal by directory membership, test coverage, size, or convenience.** Nothing has
nine members; "9-state" remains `SUPERSEDED`.

### Numeric constants — ~25 enumerated, 0 locked

`WEAK_THRESHOLD` · `LEITNER_INTERVAL_DAYS` (5 values) · `MAX_LEITNER_BOX` · `PF_LEVELS` count ·
`MAX_PF_INDEX` · `TODAYS_SET_MIN` · `TODAYS_SET_MAX` · `MAX_CONSECUTIVE_SAME_FAMILY` · repair threshold
(twice / two-lesson) · `STRENGTH_K` · `WEIGHT_PRODUCTION` · `WEIGHT_RECOGNITION` · `WEIGHT_TRANSFER` ·
`WEIGHT_RECOMBINATION` · `WEIGHT_REPAIR` · `SUPPORTED_THRESHOLD` · `STRONG_THRESHOLD` · `WEAKNESS_K` ·
`REPAIR_DISCOUNT` · `WEAK_RESIDUAL_FLOOR` · `HALF_LIFE_DEFAULT_DAYS` · `HALF_LIFE_STRONG_DAYS` ·
`REFRESH_DUE_THRESHOLD` · `DORMANT_DECAY_THRESHOLD` · legacy `MASTERY_THRESHOLDS` (0.6–0.7) · legacy
weak-spot threshold · legacy `INTERVALS`.

**Founder-locked exact numbers: 0. Founder-locked semantic promises: 8** (§4e). The two are recorded
separately and must never be conflated.

---

## 11. Change history

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-07-26 | 0.1 (Round 2 — complete) | **All eight founder questions answered.** **FQ-2 = A** (differential strength at admission; production > recognition; recognition-only never reaches the longest interval; **the "weighting mechanism exists" claim in ADR-0022 / Lesson Flow Canon §5.3 is retired**; every number remains a candidate value). **FQ-3 = C** (assistance changes what a success *proves*, not whether the action exists; support events are not evidence; **unknown assistance does not invalidate history**; prompt-fade is not attempt-level attribution; **Draft invariant I-19 amended by the founder rule**). **FQ-4 = A** (`currently weak` recoverable via repair **plus** spaced confirmation; `ever weak` persists as caution only; the reducer's permanence confirmed as **Axis-B reality, not semantics**). **FQ-5 = C** (counters are the source of truth; "9-state" `SUPERSEDED`; purpose-named derived projections permitted under five constraints; **the eight lifecycle statuses explicitly NOT adopted**). **FQ-7 = A** (**eight** semantic promises locked; **twelve** classes of numbers tunable; **zero exact values ratified**). **FQ-1 general clarification** (no technical tag decides pedagogical meaning; extended to `accent_only` and `punctuation_only`; **closes the Round-1 `accent_only` item without a ninth question**). Invariants **I-26…I-37** added, **I-19 amended**; 8 further matrix rows to `INH-FOUNDER`/`LOCKED`; five further `⚠ DIVERGENCE` annotations. **Status raised to a complete founder-decision record.** **The Bible remains Draft: source amendments not applied, independent adversarial review not performed, no implementation opened, no code/threshold/interval/tag/schema changed, no legacy system authorized for retrofit, no exact number founder-locked, no promotion occurred.** | Cloud session (Round 2 application) |
| 2026-07-26 | 0.1 | **Round 1 partial founder ratification.** FQ-1 = C (meaning-based polarity; `spelling_near_miss` ambiguous), FQ-6 = A (admission refusal + append-only compensating record), FQ-8 = A (domain-wide scope; legacy governed, non-conforming, frozen, not authorized for change). Applied across five Draft files; 8 matrix rows moved to `INH-FOUNDER`/`LOCKED`; invariants I-20…I-25 added; four `⚠ DIVERGENCE` annotations added to the Axis-B map; one new open item recorded (`accent_only`). **This is partial ratification. FQ-2/3/4/5/7 remain unresolved. The Bible remains Draft. ADR-0021 was not amended. No implementation was opened. No code or threshold changed. No legacy system was authorized for retrofit. No promotion occurred.** | Cloud session (Round 1 application) |
