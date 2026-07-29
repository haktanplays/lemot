---
title: Cairn PRJ-015 Item-Counting Contract Sign-Off Review
version: 0.1
status: Founder sign-off review
authority: Review record only. Does not resolve PRJ-015, create Canonical authority, or authorize implementation.
owner: Project Canon / Curriculum review
date: 2026-07-29
reviewed_document: PRJ_015_ITEM_COUNTING_CONTRACT_v0.1.md at review time (promoted 2026-07-29 to PRJ_015_ITEM_COUNTING_CONTRACT_v1.0.md)
final_disposition: founder sign-off granted 2026-07-29; promotion performed
implementation_authority: none
---

# PRJ-015 Item-Counting Contract — Sign-Off Review v0.1

## 1. Scope and method

Independent adversarial review of
`PRJ_015_ITEM_COUNTING_CONTRACT_v0.1.md` (post-precision-patch, branch
`docs/prj-015-item-counting-discovery-v0.1`) against the folded founder
decisions FQ-P1…P6 (discovery §1/§18), the Content Bible's 1–4 invariant,
the Curriculum Charter (CC-008, L17 payload gate, §14 stop conditions),
the Mastery & Evidence Bible's identity/attribution clauses, and the
discovery's source analysis. Eight dimensions: proportionality · Content
authority · identity-vs-acquisition · cross-layer authority · lesson
usability · historical numbers · deferral integrity · promotion
readiness. This record decides nothing and reproduces no Contract text
beyond what findings require.

## 2. Verdict

**READY FOR FOUNDER SIGN-OFF — WITH NON-BLOCKING NOTES**
(formally: `READY WITH NON-BLOCKING NOTES`).

No P0 and no P1 exists; the three material P2 ambiguities found by this
review cycle were fixed in the same change (F1–F3 below). The remaining
notes (N1–N3) are non-material: each is either an intentional
spec-level judgment point the Contract explicitly routes, or deferred
follow-through already recorded inside the Contract itself.

## 3. Findings and dispositions

| ID | Severity | Finding | Disposition |
|---|---|---|---|
| F1 | P2 — material ambiguity | "the ~3,000-word planning band is never a counter" could read as permanently prohibiting any future lexical-destination accounting, contradicting the Contract's own deferral. | **FIXED** — §1 now scopes it: not an operational counter **under this Contract**; a future lexical-destination unit requires a separate Product + Curriculum decision; §11's stop condition matched. Product's ownership, the no-ledger-now rule, and the no-current-calculation rule preserved; "word" left undefined. |
| F2 | P2 — material ambiguity | "There is no fourth ledger" overstated FQ-P1, which deferred (did not prohibit) a lexical-destination context. | **FIXED** — IC-001 now reads: opens no fourth counting context; a future lexical-destination context remains explicitly deferred, requiring a separate decision; "not … permanently prohibited here." No fourth context added or designed; the three-context model unchanged. |
| F3 | P2 — material ambiguity | The L17 worked example asserted "2–3" without deriving the range, inviting silent settlement at 2 or 3. | **FIXED** — §9 now derives it: `phen:` ×2 = 0; `word:content` = 1; the frozen `ça va ?/ça va` pair = 1 (one linked cluster) or 2 (independent targets); total 2–3. Explicitly: the Contract does not decide L17's final classification from the example; the spec or a later reviewed classification must settle cluster-vs-separate; either candidate is within the hard maximum; no compliance claim; no payload edit; the Charter gate stands until promotion **and** proper classification. |
| N1 | P3 — non-blocking | Cluster-vs-separate remains a documented judgment point (the `ça va` pair; transform operations like `je ne peux pas`) — by design: IC-003 routes the call to the lesson spec's stated classification rather than a mechanical rule. Risk is author inconsistency, mitigated by the §11 stop conditions. | OPEN — intentional; revisit only if spec-level classifications prove inconsistent in practice. |
| N2 | P3 — non-blocking | The superseded `8–15` still stands unbannered in its source documents (Syllabus Design Rules, spec template); IC-006 correctly defers the banner pass as documentation follow-through. Same class as the Charter's N1 follow-up. | OPEN — future docs-only pass (Sync-Queue-able) after promotion. |
| N3 | P3 — editorial | The discovery's §12–§13 retain "multi-ledger" vocabulary from the pre-decision analysis while the approved model is a "minimal three-context" conceptual distinction. The discovery is non-Canonical provenance and its §1 banner records the approved framing, so no live-authority drift exists. | OPEN — harmless; no edit made (discovery is a decision-trail record). |

## 4. Authority review — PASS

Curriculum owns the counting policy (Contract owner; PRJ-015 home) ·
Content's 1–4 invariant is restated, not re-owned — the Contract
interprets its unit per FQ-P2 and changes nothing upstream · Mastery is
named the authority for all evidence consequences of linking/splitting
(IC-005, §8, §10) with no algorithm defined · Engineering retains runtime
identity, ID syntax, linking representation, and migration (IC-004, §10)
· Product retains the vocabulary promise (F1 wording). No layer silently
re-owned; no Canonical source edited.

## 5. Rule-consistency review — PASS

1–4 hard maximum unchanged; **1–3 is a normal target, not a replacement
invariant** (the ratified maximum is restated in IC-002); the
fourth-demand rationale requirement is clear and testable; integration is
**0** including the no-in-lesson-promotion clause; graduation to active
counts; the exclusion list covers meta/`phen:`, `sent:` anchors and model
answers, sound, culture/cog, traps, recognition-only, supported-only,
ghost, recycled, and incidental fillers — matching FQ-P2 exactly.
Identity-vs-acquisition: linked identities never auto-multiply the count
(IC-003/§8); "one surface → one id" appears only as the explicitly
rejected wording, with the founder's revised primary-identity policy
operative (IC-004); YASA-2 IDs immutable; no runtime linking schema or ID
syntax chosen. Historical numbers (IC-006): 8–15 superseded; 30–45 not
revived under any new name (no exposure target appears elsewhere in the
Contract); breadth trajectory retired pending definition; 52/54/56/59
classified accurately per the discovery's git-history findings; the
no-cross-registry-comparison rule present.

## 6. Worked-example review — PASS

A competent lesson author can calculate active-new from the Contract
alone, without inventing a rule:

| Case | Computed under IC-002/003/004/005 |
|---|---|
| `je voudrais` (+ frame + phenomenon) | 1 (one linked productive concept; §4 example) |
| `je voudrais + infinitive` | 0 at supported introduction; counts later only as an active promotion that is a genuinely new productive operation (§4) |
| `un café` | evaluated via its own acquisition status; never counted as a frame filler (§4) |
| `je ne suis pas` | 1 — a genuinely new productive operation (§3 example) |
| `est-ce que je peux` | promotion recognition→active counts (§3 example) |
| `j'y vais` (L13→L14) | recognition intro 0; graduation at L14 counts 1 (IC-002 promotion clause) |
| L17 `ça va ?/ça va/content` | 2–3, range derivation explicit; classification routed to the spec (§9) |
| Integration lesson (L10/L13/L16 pattern) | 0 — meta entries excluded; promotions forbidden in-lesson (§3) |

The single remaining judgment call (linked-cluster vs separate demands)
is explicit, bounded, and routed (N1) — not a missing rule.

## 7. Deferral and implementation review — PASS

§10 defers, and the body nowhere decides: registry unification · runtime
ID syntax · linking representation · migration · mastery algorithms ·
lexical-destination accounting · a 3,000-word operational counter ·
passage identity · runtime `status_by_lesson` · validators ·
source-banner cleanup · PRJ-015 closure. §8's final safeguard bars any
validator precision claim before the relevant rule is Canonical **and**
implemented. `implementation_authority: none`; `prj_status: OPEN`.

## 8. Promotion preconditions

At a future founder sign-off (none performed here): set the Contract
`Canonical` with a sign-off date; record the decision in the Curriculum
layer's decision trail; run the stale-reference scan (Canon Map §13) over
inbound counting references; register the Contract and this review in the
Canon Map registry; schedule the IC-006/N2 source-banner pass; decide
PRJ-015's register wording by explicit Project Register update (promotion
alone does not close it); L17's lesson-level classification remains a
separate reviewed step. Canonical promotion would still authorize **no
implementation**.

## 9. Non-blocking notes

N1 (cluster-vs-separate judgment, intentional) · N2 (8–15 source banners,
deferred follow-through) · N3 (discovery's historical "ledger"
vocabulary, provenance-only). None blocks sign-off.

## 10. Final confirmation

The Contract remains `Draft — awaiting founder sign-off` (~236 lines,
exactly six IC IDs); **PRJ-015 remains `OPEN`**; founder decisions
FQ-P1…P6 are represented faithfully, including the revised P4 and P6
wording; no Canonical, lesson, registry, manifest, schema, validator,
test, runtime, or PRJ-status file was changed by this review cycle; no
new decision was created by this record.

## Final disposition (2026-07-29)

**Founder sign-off granted** on this review's `READY WITH NON-BLOCKING
NOTES` verdict; the reviewed Draft lineage was **promoted to
`PRJ_015_ITEM_COUNTING_CONTRACT_v1.0.md` (Canonical)** the same day, and
**PRJ-015 moved `OPEN` → `CANONICAL` through an explicit Project
Register decision** (implementation state Not Implemented). **N1**
remains a separate spec-level follow-up (L17 cluster-vs-separate
classification); **N2** was handled in the promotion package's minimal
source-synchronization pass (Design Rules banner, template and archetype
corrections, ADR-0012 clarification); **N3** remains harmless
provenance. This review remains a **supporting, non-Canonical record**;
the findings above are preserved unrewritten.

*End of sign-off review. Verdict: READY WITH NON-BLOCKING NOTES —
disposition: signed off and promoted 2026-07-29.*
