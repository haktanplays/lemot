---
title: Mastery & Evidence Founder Ratification v0.1
version: 0.1
status: Partial founder-ratification record — Round 1
authority: founder decisions FQ-1, FQ-6, FQ-8
decision_date: 2026-07-26
owner: Mastery & Evidence
implementation_authority: none
---

# Mastery & Evidence — Founder Ratification v0.1 (Round 1)

**Partial ratification.** Three of eight founder questions are answered. **FQ-2, FQ-3, FQ-4, FQ-5 and
FQ-7 remain unresolved.** The Bible remains **Draft**.

> **What this record is.** A durable statement of three semantic rulings and their exact boundaries.
> **What it is not.** An implementation opening, a promotion, an ADR amendment, or a licence to modify
> any system it now governs.

---

## 1. Scope

| | |
|---|---|
| Decisions ratified | **FQ-1** (near-miss polarity) · **FQ-6** (evidence invalidation) · **FQ-8** (domain scope) |
| Decision date | **2026-07-26** |
| Ratifies | **Semantics only** — what Cairn *means* by evidence, polarity, invalidation and domain |
| Does not ratify | FQ-2, FQ-3, FQ-4, FQ-5, FQ-7 |
| Documents amended | The five Mastery & Evidence Draft files only |
| Documents **not** amended | **ADR-0021** · any other ADR · any vault file · any Canonical document |
| Code, schema, tags, manifests, tests, validators, thresholds, runtime | **Unchanged** |
| Implementation | **Not opened** |
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

**New invariants (semantics only, zero enforcement):** I-20 evidence is never deleted or silently
mutated · I-21 knowable non-learner error is refused at admission · I-22 projections neutralize
invalidated evidence, audit history intact · I-23 polarity is semantic, never a tag alone · I-24
ambiguity blocks weakness · I-25 domain coverage authorizes no modification.

**New open item created by Round 1:** `accent_only` carries French counter-examples (`ou`/`où`,
`a`/`à`, `sur`/`sûr`) that the tag cannot distinguish. Whether that needs its own ruling or falls under
FQ-1's ambiguity clause is **open and was not silently folded into FQ-1**.

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

## 9. Questions still open

| Question | Subject | Timing |
|---|---|---|
| **FQ-2** | Differential evidence weight — canon asserts a multiplier; the reducer has none | `REQUIRED BEFORE PROMOTION` |
| **FQ-3** | Assistance (hint usage) as an evidence input | `REQUIRED BEFORE PROMOTION` |
| **FQ-4** | Weakness permanence — residual floor vs full recovery | `REQUIRED BEFORE PROMOTION` |
| **FQ-5** | Mastery vocabulary — counters only, or a named ladder | `REQUIRED BEFORE PROMOTION` |
| **FQ-7** | Which constants are founder-locked vs tunable | `REQUIRED BEFORE PROMOTION` |
| *(new)* | `accent_only` French counter-example exception | Open, unclassified |

**`REQUIRED NOW` outstanding: 0.** All three were answered in Round 1.

---

## 10. Promotion state

**NOT PROMOTED.** The Bible remains `Draft — awaiting founder ratification`.

| Promotion prerequisite | State |
|---|---|
| All `REQUIRED NOW` / `REQUIRED BEFORE PROMOTION` questions answered | ✘ — five remain |
| ADR-0021 scope amendment applied | ✘ — not applied |
| Every `founder decision required` row decided or deferred | ✘ — seven rows remain |
| Universal claims member-audited or downgraded | ✔ — re-run this round |
| Counts recalculated from rows | ✔ — recalculated mechanically |
| **Independent adversarial review by a non-author** | ✘ — **not performed** |
| No statement became an implementation authorization | ✔ |

**Two of seven met. The Bible is not promotable.**

---

## 11. Change history

| Date | Version | Change | Author |
|---|---|---|---|
| 2026-07-26 | 0.1 | **Round 1 partial founder ratification.** FQ-1 = C (meaning-based polarity; `spelling_near_miss` ambiguous), FQ-6 = A (admission refusal + append-only compensating record), FQ-8 = A (domain-wide scope; legacy governed, non-conforming, frozen, not authorized for change). Applied across five Draft files; 8 matrix rows moved to `INH-FOUNDER`/`LOCKED`; invariants I-20…I-25 added; four `⚠ DIVERGENCE` annotations added to the Axis-B map; one new open item recorded (`accent_only`). **This is partial ratification. FQ-2/3/4/5/7 remain unresolved. The Bible remains Draft. ADR-0021 was not amended. No implementation was opened. No code or threshold changed. No legacy system was authorized for retrofit. No promotion occurred.** | Cloud session (Round 1 application) |
