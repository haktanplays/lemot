---
title: Mastery & Evidence Source, Conflict, and Gap Map v0.1
version: 0.1
status: Draft — supporting record for the Mastery & Evidence Bible v1.0 Draft
authority: none — an inventory, not a decision
owner: Mastery & Evidence
created: 2026-07-26
---

# Mastery & Evidence — Source, Conflict, and Gap Map v0.1 — DRAFT

Where every claim in the Bible Draft came from, where sources disagree, and where nothing exists.

> **Absence is never rejection.** A missing source means *undecided*, never *decided against*.

---

## 1. Source inventory

Recovered by repository-wide sweep (not by trusting the opening's file list — three of the paths named
in the opening resolve differently on disk; see §7).

### Project-level authority (6)
`docs/canon/CAIRN_PROJECT_CANON_MAP_v1.0.md` · `CAIRN_AUTHORITY_AND_ROUTING_SPEC_v0.1.md` ·
`CAIRN_PROJECT_IDEA_AND_DECISION_REGISTER_v0.1.md` · `CAIRN_CANON_COVERAGE_AND_GAPS_v0.1.md` ·
`CAIRN_PROJECT_CANON_FOUNDER_RATIFICATION_v0.1.md` · `CAIRN_PROJECT_CANON_SIGNOFF_REVIEW_v0.1.md`

### Canonical domain sources (3 + supporting records)
`obsidian-product-brain/ACTIVE_CODEX/00_CAIRN_PRODUCT_BRAIN/CAIRN_PRODUCT_BRAIN_v1.0.md` ·
`docs/bibles/content/CONTENT_BIBLE_v1.0.md` · `docs/bibles/social/SOCIAL_LAYER_CHARTER_v1.0.md`
(+ Social Register, Ratification, Source & Gap Map, Sign-off Review)

### Design canon (1, high-relevance)
`docs/canon/LESSON_FLOW_CANON_v1.md` — §5.1/§5.2 selector priority, **§5.3 evidence-weight vs
selection-weight**, §5.5 `LessonEvidenceProfile`, §1.3 discovery-vs-assessment, §7 Readiness Gate.
Self-declared scope wall: *"design canon does not authorize code."*

### Vault learning-system notes (18 in `02_LEARNING_SYSTEM/`, 9 directly in-domain)
`Mastery Model.md` · `Error Tracking System.md` · `Review and Recycling System.md` · `Mon Lexique.md` ·
`Feedback and Scoring Philosophy.md` · `Content Selection.md` · `Chip Lifecycle.md` ·
`Difficulty and Cognitive Load.md` · `Self-Producing Engine.md`
(+ `05_MATRICES/Mastery Matrix.md`, `07_DESIGN/Mon Lexique UI.md`)

### Repo status / audit records (21 + 4)
`docs/status/founder-self-learning-mastery-precision-policy.md` ·
`founder-self-learning-p3-learner-renderer-checkpoint.md` · `p0-p2-spine-audit-checkpoint.md` ·
`p4-mon-lexique-practice-pool-checkpoint.md` · `p5-local-privacy-data-rights-checkpoint.md` ·
`learning-engine-progress-bridge-decision.md` · `founder-self-learning-build-architecture-review.md` ·
`docs/learning-engine-v1.md` · `docs/audits/2026-07-08-final-loop-audit.md` (findings **B7, B12, B23**)
· `docs/audits/2026-07-09-loop-audit-v2.md`

### ADRs (25 inspected individually)
All 25 were opened and their own metadata read. **24 are `status: active` / `canon_status: canonical`;
ADR-0025 is `status: deferred` / `canon_status: proposed`.** In-domain: **0009, 0010, 0013, 0016,
0020, 0021, 0022, 0023**. Adjacent: 0001, 0002, 0007, 0012, 0017.

### Runtime (Axis B) — 31 engine modules + 45 test files
`mastery.ts` · `events.ts` · `grade.ts` · `error-engine.ts` · `mon-lexique.ts` · `lexique-memory.ts` ·
`practice-pool.ts` · `practice-selector.ts` · `carryover-selector.ts` · `lesson-progress.ts` ·
`session-controller.ts` · `repository/local.ts` · `compaction.ts` · `telemetry.ts` · `privacy-data.ts` ·
`answer-check.ts` · `boundary.ts` · `derive-drill.ts` · `weakPointTags.ts` · `shipped-error-tags.json` ·
`config/productStage.ts` · legacy `hooks/useErrors.ts`, `hooks/useSRS.ts`, `constants/sections.ts`,
`app/lesson/[id].tsx`

---

## 2. Source-authority classification

| Class | Sources | Binding on this domain? |
|---|---|---|
| **Founder decision** | Q2 (2026-07-26); R8 / SOC-026 (2026-07-25) | **Yes, absolutely** |
| **Canonical project authority** | Project Canon Map v1.0; Authority & Routing Spec §2.1 | **Yes** — for routing and ownership |
| **Canonical domain source** | Content Bible v1.0; Social Charter v1.0 (negative bound only); Product Brain v1.0 | **Yes**, within their own domains |
| **Active ADR** | 0009, 0010, 0013, 0016, 0020, 0021, 0022, 0023 — **each by its own metadata** | **Yes**, within each ADR's declared domain |
| **Design canon** | Lesson Flow Canon v1 | Binds *design intent*; explicitly does **not** authorize code |
| **Vault system-spec notes** | `02_LEARNING_SYSTEM/*` (`canon_status: canonical`) | Binding as a *record of canon*; **secondary to the ADRs and code they cite** |
| **Status / checkpoint records** | `docs/status/*` | Axis B evidence of what landed; **not decisions** |
| **Audit findings** | B7, B12, B23 etc. | Axis B evidence; a finding is not a ratified rule |
| **Runtime code + tests** | engine modules | Axis B **only** — establishes existence, never intent |
| **Deferred/proposed ADR** | ADR-0025 | **Not binding**; not in this domain |

> **Directory membership confers nothing.** A file's presence in `09_DECISIONS/` or an `ADR-####`
> prefix is not a status. A file's presence in `02_LEARNING_SYSTEM/` does not make its claims
> Canonical beyond its own `canon_status` field — and, as §8 shows, three such files carry a claim
> their own cited code contradicts.

---

## 3. Current Canonical and founder decisions in force

| Decision | Source | Effect here |
|---|---|---|
| Mastery & Evidence has a dedicated owner | Founder Q2 | This Bible exists as a proposal |
| Evidence firewall, stated precisely | Founder R8 / SOC-026 | §8 non-signals; §24 equivalence |
| No social action is evidence today | R8 (no contract exists) | PRJ-009 stays `OPEN` |
| Two-axis precedence | Founder Q1 | Code is Axis B, never intent |
| Domain-first routing | Founder Q1 | §27–§32 route-and-stop |
| Documentation is not implementation authority | R11 / fourteen-element contract | §41 build gate |

---

## 4. Active ADRs bearing on this domain

| ADR | Own status | Binds |
|---|---|---|
| 0009 events-source-of-truth | `active`/`canonical` | Event log canonical; projections re-derive; AI never overrides |
| 0010 karpathy engine purity | `active`/`canonical` | Pure, deterministic, explicit `now`, fail-closed |
| 0013 YASA 3 error-tag immutability | `active`/`canonical` | 54 frozen tags; bidirectional validator hard error |
| 0016 boundary "later form" UI | `active`/`canonical` | An untaught form is not a failure |
| 0020 progress bridge | `active`/`canonical` | No fake `lm7` markers; two-system debt stays visible |
| 0021 precision policy | `active`/`canonical` | **Four buckets, `spelling_near_miss` = precision** — see §8.1 |
| 0022 hub-derived drills | `active`/`canonical` | Evidence weight ≠ selection weight; derivation fail-closed |
| 0023 privacy local-first | `active`/`canonical` | Local-first; consent gate; no client `service_role`; RLS on |

**Not binding:** ADR-0025 (`deferred`/`proposed`) — paywall, out of domain. Recorded so no later reader
assumes the ADR directory is uniformly canonical.

---

## 5. Current-reality sources (Axis B)

`mastery.ts` (reducer + all constants) · `events.ts` (frozen vocabulary, event shape) · `grade.ts`
(deterministic classifier, 12 of 16 codes) · `session-controller.ts` (append + chain aggregation) ·
`lexique-memory.ts` (weights, decay, 8 lifecycle statuses) · `practice-selector.ts` / `practice-pool.ts`
/ `carryover-selector.ts` (selection only) · `lesson-progress.ts` (attempt coverage) · `telemetry.ts`
(non-evidence) · `config/productStage.ts` (**the gate that makes all of the above sandbox-only**) ·
legacy `useErrors.ts` / `useSRS.ts` / `constants/sections.ts` (**the system that actually ships**) ·
45 test files, 10 of them in-domain.

---

## 6. Historical and superseded material

| Item | Status | Preserved because |
|---|---|---|
| "All near-miss = full failure" (pre-2026-06-04) | `SUPERSEDED` | Makes the precision policy legible |
| "9-state mastery" | `SUPERSEDED` as a description of current reality | Still appears in conceptual material; §18 of the Bible shows no nine-member set exists |
| Legacy 24-lesson `MASTERY_THRESHOLDS` (0.6–0.7 per section) | Legacy, still shipping | It is the only mastery rule a real tester experiences |
| Legacy `lm7` weak-spot tracker | Legacy, still shipping | ME-027 conflict |
| Carryover stage table (v0.3 §10) | **`PROPOSAL — revisable`**, with an explicit canonical correction: *"There is no numeric carryover window currently canonized"* | A table that looks canonical but is not |
| `mastery-v0.1` snapshot version | Superseded by v0.2 | No migration was needed (re-derive principle) |

---

## 7. Missing or unavailable sources

| Referenced as | Reality | Handling |
|---|---|---|
| `docs/founder-self-learning-mastery-precision-policy.md` | Actual path is `docs/status/founder-self-learning-mastery-precision-policy.md` | Path drift; source located and read |
| `02_LEARNING_SYSTEM/Mastery Model.md` | Actual path is `obsidian-product-brain/ACTIVE_CODEX/02_LEARNING_SYSTEM/Mastery Model.md` | Located and read |
| `docs/workstreams/founder-self-learning-mastery-precision-policy.md` (cited by ADR-0021 `source_of_truth`) | **Does not exist at that path** | ADR-0021's own source pointer is stale |
| `docs/workstreams/founder-self-learning-p5.md` (cited by ADR-0023) | Not at that path | Equivalent record found under `docs/status/` |
| Curriculum Bible | **Does not exist** | Routed, not invented |
| Engineering / System Bible | **Does not exist** (several ADRs bind parts) | Routed, not invented |
| Privacy / Legal layer | **Does not exist** (ADR-0023 binds part) | Routed, not invented |
| Operations & QA Bible | **Does not exist** | Routed, not invented |
| UX / Experience Bible | **Does not exist** | Routed, not invented |
| A social evidence contract | **Does not exist** (PRJ-009 `OPEN`) | Not created here |
| `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md` | Placeholder per the Master Pipeline | Noted |

---

## 8. Same-domain contradictions

### 8.1 `spelling_near_miss` — precision or weakness? *(the sharpest one)*

| Source | Claim | Own status |
|---|---|---|
| **ADR-0021** Decision paragraph | Four buckets; `spelling_near_miss` is Precision; *"does not set `isWeak`"* | `active` / `canonical` |
| `docs/status/…precision-policy.md` §2 | Same three-member precision bucket; `NEAR_MISS_TAGS` | 2026-06-04 record |
| vault `Mastery Model.md` bucket table | Same three-member precision bucket | `canon_status: canonical`, updated 2026-07-18 |
| vault `Feedback and Scoring Philosophy.md` | *"punctuation_only/accent_only/spelling_near_miss … does not make the learner weak"* | `canon_status: canonical` |
| **`mastery.ts:132-145, 234-237, 257-259`** | `PRECISION_TAGS` has **two** members; `spelling_near_miss` **accrues `weakTags`** → 3 of them make the item weak | shipped in engine, unit-tested |
| **audit B7** | The old behaviour was a **confirmed defect**: FR minimal pairs (un/on, le/la, et/est) are meaning-distinct | audit finding, remediated in PR-E1/#193 |

**Diagnosis.** The code was deliberately corrected; **four documents were not updated**, and ADR-0021's
*Consequences* line acknowledges the refinement while its *Decision* paragraph still states the old
rule. A reader consulting the ADR's decision gets the wrong answer.

**Weakest-member result.** The universal claim *"precision tags never create weakness"* is **true for 2
of its 3 stated members and false for the third.** → **FQ-1**, ME-011/ME-012.

### 8.2 Bucket count — four or five?
ADR-0021 and three notes say four. The code implements five (success · precision · spelling near-miss ·
skip · failure). Directly downstream of 8.1. → ME-011.

### 8.3 Weakness key — item or string?
Engine: `ItemId`, with tag-level counters and (in policy) attribution. Legacy shipped: the
correct-answer string, no tags, no attribution. **Both use the threshold 3**, which makes them look
like the same rule. They are not. → **FQ-8**, ME-027.

### 8.4 Evidence weight — asserted but absent
ADR-0022: *"evidence weight (mastery multiplier) and selection weight are separate modules."*
Lesson Flow Canon §5.3 names the mastery reducer as evidence weight's home; §5.5 defines a
`LessonEvidenceProfile` multiplier. **The reducer implements no weighting.** The module that does
(`lexique-memory.ts`, production 1.0 / recognition 0.25 / …) is explicitly *not* the reducer and is
unwired. → **FQ-2**, ME-017/ME-020.

### 8.5 "9-state mastery"
No nine-member set exists. Six candidate ladders have 3, 4, 8, 5, 3 and 4 members. The precision policy's own
resolution — *"the counters win"* — is the only stated position, and it deprecates the phrase without
replacing it. → **FQ-5**, ME-033.

### 8.6 Skip's due-date treatment
Audit B12 flagged the old behaviour and called the near-miss case *documented* but the skip case
*questionable*. Current code keeps both due now. The skip semantics were never separately decided.
→ ME-013/ME-035.

---

## 9. Cross-domain overlaps

| Overlap | Resolution |
|---|---|
| Content owns feedback policy; M&E owns what a result *means* | Two languages, one bridge: `ErrorTagCode` (stored) → `FeedbackVerdict` (learner-facing). The learner never sees a raw code. |
| Curriculum owns sequencing; M&E owns admissibility | Staged strictness by band is **Curriculum's**, routed and stopped |
| Engineering owns schemas; M&E owns semantics | The chain-aggregation rule currently lives in the controller — a placement question, routed |
| Social owns the negative bound only | Positive social evidence semantics are M&E's, under a contract that does not exist |
| Privacy owns retention; M&E owns the record | `userAnswer` puts raw learner text inside the evidence record — the two collide directly |
| Product owns stage exposure; M&E owns meaning | Mon Lexique's public availability is Product's `OPEN` decision |

---

## 10. Canon-versus-code divergences

| # | Canon says | Code does | Severity |
|---|---|---|---|
| D1 | `spelling_near_miss` is precision (ADR-0021) | Accrues weakness | **High — active ADR contradicted** |
| D2 | Evidence weight is a multiplier in the reducer (ADR-0022, §5.3) | No weighting exists | **High — canon asserts a non-existent mechanism** |
| D3 | Only verified learner-sourced error creates weakness | No error-source field; all non-success attributed to the learner | **High — invariant unimplementable as written** |
| D4 | Repair eligibility, flow, spaced confirmation (`LOCKED DEFAULT`) | Not implemented at all | Medium — policy-only, honestly labelled |
| D5 | Feedback must pass through `FeedbackVerdict` | The shipped v1 renderer computes feedback locally and bypasses the bridge | Medium |
| D6 | Readiness Gate (design canon §7) | Zero code | Low — labelled PLANNED |
| D7 | Daily Review should read engine projections (ADR-0020 consequence) | Legacy `lm7` `dr:{date,count}` | Medium |

---

## 11. Conceptual-versus-runtime divergences

- **Named state ladders vs counters** — five conceptual ladders, one counter record (§8.5).
- **"Mastery states" as an input to Mon Lexique** (`learning-engine-v1.md:241`) vs a three-value
  projection in code.
- **Lexique Memory's 8 intrinsic statuses** — a rich conceptual model that no shipped surface reads.
- **`LessonEvidenceProfile`** — a per-lesson multiplier with no runtime type.
- **Carryover stage table** — a five-stage lifecycle explicitly marked `PROPOSAL — revisable`, with a
  canonical correction saying no numeric carryover window is canonized. A reader could easily take
  the table as canon.

---

## 12. Status conflicts

| Item | Conflict |
|---|---|
| ADR-0021 | Decision paragraph states the pre-B7 rule; Consequences acknowledges the refinement. Both `active`. |
| `Mastery Model.md` | `implementation_status: partial`, `verification_status: unit-tested` — accurate; but its bucket table is stale (§8.1) |
| `Feedback and Scoring Philosophy.md` | `last_updated: 2026-07-14`, predates nothing relevant — the stale precision claim was never revisited |
| Precision-policy note | Correctly labelled *"Status: implemented"* for a behaviour later changed by B7 |
| Legacy `MASTERY_THRESHOLDS` | Live in the shipped build, absent from every canon document in this domain |

---

## 13. Enforcement gaps

| Rule | Stated by | Enforced by | Gap |
|---|---|---|---|
| Attribution / error source | `[HARD INVARIANT]` | nothing | **Total** |
| Admissibility gate | this Draft | nothing | **Total** |
| Invalidation | policy | nothing | **Total** |
| Evidence weighting | ADR-0022, design canon | nothing | **Total** |
| Repair eligibility & flow | `[LOCKED DEFAULT]` | nothing | **Total** |
| Confidence | nobody | nothing | Concept absent |
| Precision policy | ADR-0021 | unit tests — **but implementing a different rule than the ADR states** | Divergent |
| Tag immutability | ADR-0013 | `validate:content` hard error, bidirectional | **None — strongest in the domain** |
| No XP/streak language | ADR-0001 | build-time copy guards | **None** |
| `recycled` is not a status | canon | test asserts its absence from the status list | **None** |

---

## 14. Unowned dependencies

Curriculum (staged strictness, readiness, evidence distribution) · Engineering (schemas, invalidation
mechanism, store convergence, aggregation placement) · Privacy/Legal (retention of `userAnswer`,
lawful basis, minors, export depth) · Operations & QA (audit cadence, incident handling) ·
UX (how weakness and repair are shown without punitive tone) · **the social evidence contract itself**.

None invented here.

---

## 15. Founder decisions required

**FQ-1** near-miss polarity · **FQ-2** differential evidence weight · **FQ-3** assistance as evidence
input · **FQ-4** weakness permanence · **FQ-5** mastery vocabulary · **FQ-6** invalidation model ·
**FQ-7** locked-vs-tunable constants · **FQ-8** scope over the legacy shipped surface.
Full form in the Founder Review Surface.

---

## 16. Decisions not requiring founder input

- Restating an inherited invariant (all `INH-*` rows).
- Vocabulary discipline (§3 of the Bible) — editorial.
- Correcting a stale count or a stale path — mechanical.
- Recording that a mechanism does not exist — factual.
- Routing a question to an unauthored layer — the routing rule already decided this.
- Anything Engineering owns (schema shape, module placement, algorithm choice).

---

## 17. Source adoption plan

| Source | Adopt as |
|---|---|
| Founder Q2, R8 | Inherited, verbatim, never re-litigated |
| ADRs 0009/0010/0013/0016/0020/0022/0023 | Inherited within each ADR's own domain |
| **ADR-0021** | Inherited **as a decision-in-need-of-amendment** — quoted, contradiction flagged, not silently overwritten |
| Lesson Flow Canon §5.3/§5.5/§1.3 | Inherited as design intent; **not** as an implementation claim |
| Vault `02_LEARNING_SYSTEM` policy-hardening blocks | Inherited as the current policy home for repair, non-signals, decay bounds |
| `docs/status/*` checkpoints and audits | Axis B only |
| Runtime code | Axis B only; recorded in the Current Reality Map |
| Legacy shipped surface | Recorded as reality; **its scope is FQ-8, not assumed** |

---

## 18. Supersession candidates

**Proposed for later amendment — none applied in this task, and none may be applied without founder
ratification:**

1. **ADR-0021 Decision paragraph** — scope-amend to match the post-B7 five-bucket behaviour, *or*
   change the code back. Whichever the founder chooses (FQ-1), one of the two must move. **The ADR must
   be amended, not repealed** — its precision principle stands.
2. **`Mastery Model.md` bucket table**, **`Feedback and Scoring Philosophy.md` near-miss line**,
   **precision-policy §2 table** — same correction, three files.
3. **"9-state mastery"** — retire the phrase or define the nine members (FQ-5).
4. **`learning-engine-v1.md:100` reconciliation note** — re-check once FQ-5 is answered.

---

## 19. Promotion blockers

1. FQ-1, FQ-6, FQ-8 unanswered (`REQUIRED NOW`).
2. FQ-2, FQ-3, FQ-4, FQ-5, FQ-7 unanswered (`REQUIRED BEFORE PROMOTION`).
3. The §8.1 contradiction unresolved — the Bible cannot state a near-miss rule while an active ADR and
   the code disagree.
4. The §8.4 gap unresolved — the Bible cannot claim an evidence-weight model that has no home.
5. No independent adversarial review performed (required, §41 of the Bible).
6. Curriculum, Engineering, Privacy and Operations are unauthored — several routed questions have no
   destination yet. This blocks *completeness*, not promotion, and is recorded as such.
