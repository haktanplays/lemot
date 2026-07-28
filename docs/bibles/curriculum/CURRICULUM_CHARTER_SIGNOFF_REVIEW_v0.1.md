---
title: Cairn Curriculum Charter Sign-Off Review
version: 0.1
status: Founder sign-off review
authority: Review record only. Does not independently create Curriculum canon or implementation authority.
owner: Project Canon / Curriculum review
date: 2026-07-28
reviewed_document: CURRICULUM_CHARTER_v0.1.md (Draft — awaiting founder sign-off)
reviewed_after: sign-off precision patch (branch docs/curriculum-layer-discovery-v0.1, post-88d7c8c fixes)
implementation_authority: none
related:
  - CURRICULUM_CHARTER_v0.1.md
  - CURRICULUM_FOUNDER_RATIFICATION_v0.1.md
  - CURRICULUM_LAYER_DISCOVERY_v0.1.md
---

# Cairn Curriculum Charter — Sign-Off Review v0.1

> **Review record only.** This document evaluates whether
> `CURRICULUM_CHARTER_v0.1.md` can safely be promoted to Canonical. It
> creates no canon, changes no status, and authorizes nothing. The Charter
> remains `Draft — awaiting founder sign-off` regardless of this review's
> verdict; promotion is a separate founder act.

## Verdict

**READY WITH NON-BLOCKING NOTES.**

No P0 (Canonical contradiction) and no unresolved P1 (authority/decision
distortion) remains after the precision patch. The three remaining notes
(§ Findings, N1–N3) are non-material: each is either mitigated inside the
Charter itself or lies outside the Charter's scope and is already
registered elsewhere. Promotion would not: invent sequence; flatten tiered
lesson statuses; conflict with Product, Content, Mastery, or Social;
ratify implementation; resolve any PRJ item by implication; promote
historical planning maps; or treat working numeric payloads as Canonical
exceptions.

## Review dimensions

### 1. Authority — PASS

- Charter frontmatter and banner carry `Draft — awaiting founder sign-off`;
  §1 states promotion is a separate explicit event. ✔
- Founder decisions FQ-C0/C1/C2/C4/C8 are folded faithfully: each Charter
  ruling (CC-003/004/005/007 and the governance frame) matches the approved
  answer recorded in `CURRICULUM_FOUNDER_RATIFICATION_v0.1.md` §4, with no
  drift found on line-by-line comparison. ✔
- §1 states upstream Canonical documents win on conflict and the gap is
  surfaced. ✔
- Discovery and ratification record are declared supporting provenance,
  not independent canon (Charter banner + §1; ratification §1). ✔
- §1 and §16 state the Charter is not the Curriculum Bible and define the
  Bible's maturity bar without a date or lesson-count threshold. ✔

### 2. Spine fidelity — PASS

- Tiered table: L0–L6 founder-locked/shipped/frozen; L7–L15 approved
  working sequence, registered-hidden, revisable; L16–L17 spec-only; L18+
  open/provisional, unratified (§5). Matches FQ-C1 exactly. ✔
- The general clarification after the tiered table states spine
  ratification covers order, purpose, and tiered status — **not** every
  numeric payload; upstream Content constraints continue to govern. ✔
- **L17 count conflict explicitly gated**: the spine row defers to the
  payload note; the note records the historical "3–5"/5 value, states any
  value above the Content maximum is not ratified, and requires
  reconciliation to 1–4 or a PRJ-015 counting-unit demonstration before
  implementation — "5" may not be used as a learner-facing active-new
  allowance until then. The ratification record's FQ-C1 non-consequence
  and the discovery's spine row + CUR-007 carry matching language, and the
  original source fact ("3–5", spec: 5) is preserved, not rewritten. ✔
- No lesson order, title, ID, status, or visibility changed anywhere in
  the package (verified against the pre-patch text). ✔

### 3. Content boundary — PASS

- Active-new **1–4** (integrations 0) is stated as a Content-owned,
  founder-ratified invariant that Curriculum consumes, never re-owns
  (§2, §3.8); the L17 note reinforces rather than excepts it. ✔
- Prerequisite safety wording (§7) matches the Content Bible Card-8
  clarification: it overrides only required production of unseen/
  unsupported language and **never** licenses incorrect or unnatural
  French. ✔
- Reading rule intact (§11): every Reading ends in an appropriate action;
  production conditional; no CEFR skill ladder invented. ✔
- **Beats ≠ screens** preserved with four distinct counting layers and the
  mapping left open at the Curriculum/Engineering seam (§9); PRJ-015 not
  resolved. ✔
- Tunable Content budgets are explicitly not converted into Curriculum law
  (§10). ✔

### 4. Mastery boundary — PASS

- Completion ≠ mastery; integration ≠ test; current unlock recorded as an
  Axis-B implementation fact, neither ratified nor changed (§12). ✔
- Division of labor stated exactly per Mastery Bible §28: Curriculum
  places opportunities and gates; Mastery defines what evidence proves. ✔
- No new evidence semantics, strength, admissibility, or lesson-gating
  rule appears anywhere in the Charter. Readiness Gate, remediation, and
  integration need lists remain open (§12–§13). ✔

### 5. Social boundary — PASS (after Fix 2)

- §2 now distinguishes the **Social product layer** (learner-to-learner
  interaction — Social Charter-owned, dormant, no feature activated) from
  **social-pragmatic French content** (tu/vous, politeness, repair chunks,
  human-context lessons, check-ins, openings/closings — Content/Curriculum
  material). ✔
- PRJ-009 remains `OPEN` and is correctly scoped: no learner-to-learner
  social action counts as mastery evidence today; PRJ-009 is not
  misrepresented as the activation contract for every non-evidence
  feature. ✔
- AI interaction is stated not to be peer social interaction. ✔
- The discovery's routing-table row was the one other materially ambiguous
  occurrence; it now carries the same split. The ratification record
  contains no conflation. ✔
- Social-pragmatic lessons already in the spine (L3 tu/vous, L17 check-in)
  are therefore not blocked by the Social boundary — correct. ✔

### 6. Macro-map and sequence restraint — PASS

- Journey → Capability Arc → Lesson controls; Product Brain governs the
  hierarchy (§4). ✔
- 12-unit/180 map and "Core 150" demoted to historical/reference inputs,
  preserved with locations in Appendix B — demoted, not deleted; source
  files unedited. ✔
- No Capability Arc composed; composing the first Arcs is named future
  work (§4, §16). ✔
- No post-L17 sequence, no tense order invented; §13 lists both as open;
  §14 stop conditions block backfilling. ✔
- Lesson totals stated as planning bands, never promises (§4). ✔

### 7. Open-dependency integrity — PASS (after Fix 3)

- **PRJ-001**: now explicitly `OPEN` with narrowed scope in both the
  Charter (§13, first bullet) and the ratification record (§7) — Charter
  promotion does not automatically close or change it; a status change
  requires an explicit Project Register decision. ✔
- PRJ-015 `OPEN` (§9, §13); PRJ-029 `OPEN` (§13); PRJ-036 `OPEN` and
  Product Brain-owned (§13). ✔
- Curriculum Bible remains unopened; §16 sets a maturity bar, not an
  opening. ✔
- No wording anywhere implies promotion changes any PRJ status. ✔

### 8. Implementation boundary — PASS

- `implementation_authority: none` in all four package files; no code,
  content, schema, runtime-visibility, or test change in the package's
  diffs. ✔
- Repair pair placement is intent-only: naming the L1 home does not
  implement it; L13 remains blocked on the missing prerequisite;
  implementation requires a separate reviewed change (§8). ✔
- Round-1 runtime freeze and Q4 code freeze stated as binding (§1, §8). ✔
- `Canonical ≠ implemented` stated in banner and §1. ✔

### 9. Provenance and supersession — PASS

- FQ-C0/C1/C2/C4/C8 represented exactly (crosswalk in Appendix E;
  verified against the ratification record). ✔
- FQ-C3/C5/C6/C7 remain derived/deferred/current-state — not approved,
  resolved, or rejected — in both the discovery and the Charter. ✔
- Superseded cadence wording and macro-maps: sources preserved unedited;
  supersession explicit in Charter §6/Appendix B and ratification §6. ✔
- All cited repository paths in the appendices resolve (checked
  file-by-file after Fix 4, including `lemot-app/data/lessons/*` and the
  expanded `obsidian-product-brain/ACTIVE_CODEX/...` paths). ✔

## Findings

Findings identified during this review cycle. F1–F4 were found by the
precision-pass analysis and **fixed in this same change**; N1–N3 remain
open and are non-blocking.

| ID | Severity | Finding | Status |
|---|---|---|---|
| F1 | **P1 — authority/decision distortion** | The Charter's L17 spine row presented the "3–5 active" operator note inside a ratified table without qualification, which could read as a Charter-ratified exception to the Content Bible's founder-ratified active-new 1–4 invariant. | **FIXED** — payload note + general non-ratification clarification (Charter §5); FQ-C1 non-consequence (ratification §4); discovery spine row + CUR-007 labeled; source fact preserved. |
| F2 | **P2 — material ambiguity** | Charter §2's "no social activity enters the sequence while PRJ-009 is OPEN" over-read PRJ-009, potentially blocking social-pragmatic Curriculum content (tu/vous, politeness, repair, human context). | **FIXED** — §2 rewritten to split the Social product layer from social-pragmatic content; discovery routing row corrected; Social remains dormant and evidence-excluded. |
| F3 | **P1 — authority/decision distortion** | Ratification §7 said PRJ-001 remains OPEN "until the layer is authored and promoted", implying Charter promotion auto-closes PRJ-001. | **FIXED** — narrowed-scope wording in ratification §7; PRJ-001 bullet added to Charter §13; explicit Project-Register-decision requirement. |
| F4 | **P3 — editorial** | Appendix B used the abbreviated/incorrect path `data/lessons/*` (actual: `lemot-app/data/lessons/*`) and ellipsis-prefixed vault paths. | **FIXED** — full repository paths; all appendix paths verified to resolve. |
| N1 | **P2 — non-material (mitigated)** | The superseded cadence formulations and demoted macro-maps still carry their original markers (e.g. `[CANONICAL rhythm rule]`) inside their unedited source files; an agent reading only the vault note could miss the supersession. Mitigation: the Charter (§6, Appendix B) and ratification record (§6) are explicit, and the Canon Map's routing sends curriculum questions through the Curriculum authority first. | **OPEN — non-blocking.** Recommended follow-up after promotion: a source-banner pass adding scope-amendment notes to the affected files (documentation task; Sync-Queue-able; matches the DOC-022/ADR-0024 precedent). |
| N2 | **P3 — editorial (out of scope)** | Upstream execution-doc contradictions persist: `DEV_APK_MVP_CANON.md` says L1–L5 while the shipped cap is L6; `STATUS.md` carries both "7 lessons" and "16 lessons". Already registered (discovery §17-C6/C8; Coverage & Gaps C2). Outside Charter scope. | **OPEN — non-blocking**, owned by Operations docs. |
| N3 | **P3 — editorial** | Provenance asymmetry: no gate reviews exist for L11 and L13 (workflow evolved mid-band). Recorded in the discovery; harmless to Charter authority. | **OPEN — non-blocking.** |

## Promotion preconditions (unchanged by this review)

Founder sign-off remains the only path to Canonical. At promotion time:
set `status: Canonical` with a sign-off date; run the stale-reference scan
(Canon Map §13) over inbound references; register the Charter and its
supporting records in the Canon Map registry (new DOC-### rows) and update
the §4 layer table; decide the PRJ-001 register wording (narrowed scope)
by explicit Project Register update; and consider the N1 source-banner
pass. None of these steps is performed by this review.

*End of sign-off review. Verdict: READY WITH NON-BLOCKING NOTES. The
Charter remains Draft until explicit founder sign-off.*
