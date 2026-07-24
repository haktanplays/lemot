# Cairn Content Bible v1.0 — Founder Sign-Off Review (Critical Chapters) v0.1

> Read-only diagnostic review of `CONTENT_BIBLE_v1.0.md` against the ratified decisions in the Ratification Pack §0 (authoritative), Decision Matrix, and Source Gaps. **Authorizes nothing.** No file edited; the Bible stays **Draft — awaiting founder sign-off**. Scope: the six highest-risk areas only. No Social Bible material reviewed or introduced.
>
> **Date:** 2026-07-24 · **Branch:** `docs/content-bible-v1-draft` · **Reviewed tip:** `52fcc49` · **Authority order:** Ratification Pack §0 (founder session) → founder-locked sources / accepted ADRs → closed design canon → founder-ratified derived policy → historical/superseded.

---

## 1. Executive verdict

**READY WITH TARGETED CORRECTIONS.**

The draft is a faithful, well-provenanced fold of the 2026-07-24 founder decisions. Every load-bearing ratified decision in the six reviewed areas is captured **accurately and at the correct authority level**: Reading (Q7) is verbatim-correct with supersession marked; gender (Q11) correctly rejects a universal masculine-first default; the French QA stage gate + "AI cannot self-certify PASS" + style-guide-to-be-authored (Q10) are complete; payload/`beats≠screens`/active-new-1–4 (Q4) are correct; the derived "Policy Hardening" layer (Q2) carries its NON-CLAIM labels; and no runtime-enforcement or existing-lesson-compliance claim is made. Supersession (§20.4) and provenance (Appendix B/C) are intact.

It is **not yet** a clean "READY FOR FOUNDER SIGN-OFF" only because **three MINOR precision defects** could let an AI author mis-weight a rule — most importantly an inline tag that labels the founder-locked **active-new 1–4** as `[TUNABLE]`, and an item-role enumeration that omits two roles the canon says "must not be collapsed." None of these is a material canon error (the authoritative homes — Ch. 19 for numbers — are correct), none reopens a founder decision, and **no new founder decision is required** to fix them. Apply the small patch set (§5) and the draft is sign-off ready.

No BLOCKER. No MAJOR. No accepted founder decision was reopened.

---

## 2. Section-by-section review

### Area 1 — Authority, scope, and ownership boundaries
**Refs:** Ch. 1 (1.1–1.4), Ch. 2 (2.1–2.3); Appendix B, C. **Sources:** Q1, Q3, Q4; PB-018.

- **Correct:** The four-owner split (Content=authoring/copy/presentation; Engineering=enforcement/algorithms/schema/runtime; Brand=tone/naming/artwork; Curriculum=sequence/placement) matches Q1 exactly (§2.1). Facet-routing keeps the Content authoring consequence with a cross-reference and routes enforcement/sequence/tone/paywall correctly (§2.2). Notes-are-not-canon + provenance-preservation matches Q1's structural grant (§2.3, Appendix B/C). "Product Brain wins, gap surfaced not silently resolved" is correct (§1.2). Numbers-are-tunable-unless-source-says-otherwise (§1.3) and ratified≠immutable (§1.4) match Q4b/Q3.
- **Unclear / wrong:** None material.
- **Missing exception:** None.
- **Risk if unchanged:** None.
- **Finding:** **NO CHANGE.** (Ownership is correctly assigned and unambiguous.)

### Area 2 — Chip and item model
**Refs:** Ch. 4 (4.1–4.10). **Sources:** CB-01/02/03/04/05/06/07/08/09/47/48; ADR-0004/0005; Q3, Q2.

- **Correct:** Chip = reusable owned production block, not memorized sentence (§4.1, CB-01). Behavioral taxonomy + Allowed/Caveat/Forbidden verdict (§4.2, Q3). Composition classes formula/noun-package/pattern/unpackable (§4.3, CB-04). No full-sentence primary UI chips (§4.4, ADR-0004). Bare atoms are Caveat, not blanket-banned (§4.5, CB-05) — exactly right. Frozen classes: `PROTECTED_CHUNKS` at two, `SURVIVAL_FORMULAS` closed + Haktan-gated, exact French preserved (§4.6, CB-06). `piecesUsed` atomic/produced-only (§4.8). `oui` producible answer (§4.9). Future/ghost never correct/penalized/produced (§4.10, CB-47/48).
- **Unclear:** §4.7 enumerates the in-lesson role set as **active · supported · recognition-only · recycled** and covers ghost via the integrity invariant + §4.10 — but does **not** name **blocked-production** as a distinct role, and does not list **ghost/exposure** in the role enumeration itself. CB-08 records the role set as "active/supported/recognition/recycled **(+blocked)**"; the review brief lists six roles that "must not be collapsed" (active, supported, recognition-only, recycled, ghost, blocked-production).
- **Materially wrong:** No — nothing is collapsed or contradicted; the behaviors of ghost (§4.10) and blocked forms (§15.3 "inverted question in a production target is an ERROR") are present. This is an **enumeration completeness** gap, not a contradiction.
- **Missing boundary:** The explicit "blocked-production" role and a one-line pointer that ghost/exposure and blocked-production are roles distinct from recognition-only.
- **Risk if unchanged:** An AI author could collapse a **blocked** form (recognition/exposure only, e.g. band-wide inverted questions) into **recognition-only**, or treat a ghost as a recognition target — the exact collapse the canon forbids.
- **Recommended correction:** Patch P2 (§5) — add the two roles to §4.7 with cross-refs to §4.10 and §15.3.
- **Finding:** **MINOR.**

### Area 3 — Lesson payload, load, and budgets
**Refs:** Ch. 5 (5.1–5.3), Ch. 6 (6.4, 6.5, 6.8), Ch. 19. **Sources:** CB-13/14/15/16/17/18/22; Q4 (a–d), Q2.

- **Correct:** Four payload layers with single-layer placement (§5.1, CB-15). Active-new **1–4**, integrations 0, supported +2–3, ghost +2–3, supported ≥2× (§5.2). "Recycle cannot steal the lesson" (§5.3, CB-16). **`beats ≠ screens`** defined as two non-equal counting layers with the explicit "never write 'beats = screens'" prohibition (§6.4, Q4d) — verbatim-correct. Lesson spine 8–12 beats (§6.5, CB-14). Archetype contracts + `totalProductionLoad` formula + anti-bucket-hiding, **labeled derived/founder-ratified, "not a runtime-enforcement claim"** (§6.8, Q2). Ch. 19 is the single home for numbers and correctly labels active-new "authoring invariant (founder)", W2 look-ahead and max-nudges "authoring rule (founder)", and the caps as "CPW lint (partial)" / "V1 spec-only" — no false enforcement claim. `8–15` coarse count marked "superseded for active-new by 1–4."
- **Unclear:** §5.2 tags the combined ceiling line `[FL][TUNABLE]`. This muddles two different statuses on one line: active-new **1–4** is a **founder authoring invariant** (per §1.3's own rule, Ch. 19, and PAYLOAD "the fix is NOT more active chips"), while supported/ghost **+2–3** are **tunable defaults**. The `[TUNABLE]` tag, read against active-new, weakens a founder invariant; read against +2–3, could strengthen a default.
- **Materially wrong:** No — the authoritative single-home (Ch. 19) is correct, and §5.2 cross-references "— Ch. 19." The defect is a loose inline tag on a secondary mention.
- **Missing boundary:** A tag split so §5.2 cannot be read as making active-new tunable.
- **Risk if unchanged:** An AI author skimming §5.2 could widen active-new "on smoke evidence" (contradicting the founder-locked ceiling) or freeze the +2–3 supported/ghost defaults as hard invariants.
- **Recommended correction:** Patch P1 (§5).
- **Finding:** **MINOR** (highest-priority MINOR — most load-bearing number).

### Area 4 — Reading
**Refs:** Ch. 11 (11.1–11.6). **Sources:** CB-50; Q7; Source-Gaps G1.

- **Correct:** "**Every Reading ends in an appropriate learner action, but not necessarily production**" (§11.1) is verbatim Q7. Early L0–L3 bounded non-production actions (§11.2). Later production only under active/supported + prerequisite-safe + load-appropriate + serves-goal (§11.3). The four "must never become" prohibitions — passive page-turning, sentence-by-sentence translation testing, default "what does this mean?", school comprehension, quota output (§11.4). Supersession of "every Reading ends in production" as historical-only (§11.5). Taxonomy + validator marked `[OPEN]`, deferred to Engineering, G1 (§11.6). The chapter authority tag `[FL — founder-ratified 2026-07-24 (Q7)]` correctly reflects the founder-set principle.
- **Unclear / wrong / missing:** None.
- **Risk if unchanged:** None.
- **Finding:** **NO CHANGE.** (Exemplary fidelity — this is the strongest chapter.)

### Area 5 — Feedback and error handling
**Refs:** Ch. 14 (14.1–14.6); §8.3 (W1 ungraded), §9.1 (Say It), §10 (Natural Reveal). **Sources:** CB-32/55/59/61/62/63/64/65/66; ADR-0001/0002/0021; Q2.

- **Correct:** Passive-mirror, explains-never-punishes (§14.1, ADR-0002). Feedback consumes a `FeedbackVerdict`, never a raw `ErrorTagCode`; banned outputs listed (§14.2, CB-62). Near-miss = soft signal, never lowers a box/prompt-fade (§14.3, ADR-0021). **One nudge max**, no default native rewrite, revision required after a nudge (§14.4, CB-63). Fill-with-traps: authored `trapReason`, neutral "why attractive", future form only as a wrong trap never the correct option, first-wrong → one coach line (§14.5). **Error source classified before weakness**; bad distractor/early reveal not weakness; **exposure/ghost failure not weakness** (§14.6, Q2, labeled derived). Open mixed Weaves **ungraded → compare, never exact-match** (§8.3, CB-32). Natural Reveal alternatives **authored, never AI-invented** (§10). "Praise without target detection is an ERROR — never fabricate praise" (§9.1). No gamification/streak/theatrical praise (§3.4).
- **Unclear / wrong / missing:** None material. (The "unless an explicit later policy changes this" qualifier on the one-nudge rule is globally covered by §1.4 ratified≠immutable; no local restatement needed.)
- **Risk if unchanged:** None.
- **Finding:** **NO CHANGE.**

### Area 6 — French naturalness, safety, and QA
**Refs:** Ch. 15 (15.1–15.4), Ch. 18 (18.1–18.5). **Sources:** CB-68/69/70/71/90/91/92; Q10, Q11, Q2; G2/G3.

- **Correct:** Natural not literal (§15.1, CB-68a). **Naturalness / grammatical-correctness / prerequisite-safety kept separate; prerequisite-safety overrides correctness; unseen form only as supported/recognition/chunk** (§15.2, CB-69) — exactly right. Survival-formula locked wording `vous pouvez répéter ?` (never inverted) + `je ne comprends pas`; inversion recognition-only band-wide; inverted-in-production = ERROR; exact French preserved (§15.3, CB-70). **Gender (§15.4): no full agreement system early; only the distinction the goal needs; small `-e` note when useful; no paradigms/tables; default follows sentence/speaker/character/context — NOT an unconditional masculine-first rule** — correctly follows the authoritative Q11 §0 outcome (not the superseded pre-ratification "masculine base" recommendation). Batch = Unit slice, one PR = one founder review (§18.1). Authoring ledger + content-safety checklist + anti-gaming, **"not a runtime-enforcement claim; existing lessons require a separate retrospective audit; no current lesson claimed compliant"** (§18.2, Q2). French QA gate: severity model, stages A–D, C requires 0 unresolved BLOCKER/MAJOR, **named qualified human reviewer + recorded verdict**, **AI may not self-certify `FrenchQAStatus: PASS`**, reviews sentences/model-answers/distractors/hints/TTS/translations/register/chip-segmentation (§18.3, Q10). **Complete style guide does not yet exist and must be authored; `L1-L5 Proofreading.md` is one input, not the guide; unresolved style matters marked open, not invented** (§18.4, Q10/G2). **Gate + named reviewer required before Stage C; must NOT block internal authoring/drafting/schema/founder-only testing before Stage C** (§18.5, Q10 timing).
- **Unclear:** §15.1 places the **"default variety: contemporary metropolitan French"** clause under a section opened with `[FL]` and tags only the following style-guide clause `[DR][OPEN]`. The metropolitan default is CB-68**b** = **derived, founder-ratified (Q10)** — not founder-locked. The tag placement can read as inheriting `[FL]`.
- **Materially wrong:** No — the rule (metropolitan default, declare regional) is ratified and correct; only its provenance tag is imprecise.
- **Risk if unchanged:** Minor — an author could over-weight the variety default as founder-locked rather than a ratified derived default refinable by the future style guide.
- **Recommended correction:** Patch P3 (§5) — tag the metropolitan-default clause `[DR]`.
- **Finding:** **EDITORIAL** (tag precision).

---

## 3. Canon-strength audit

| Failure mode checked | Location | Result |
|---|---|---|
| Turns a **default into an invariant** | §5.2 `[FL][TUNABLE]` on the +2–3 supported/ghost defaults | **Flagged (MINOR, P1)** — could read the +2–3 defaults as founder-locked |
| Turns an **invariant into guidance** | §5.2 `[TUNABLE]` on active-new **1–4** | **Flagged (MINOR, P1)** — could read the founder ceiling as freely tunable; Ch. 19 is authoritative and correct |
| Confuses **authoring with enforcement** | §6.8, §18.2, §18.3, Ch. 19 | **Clean** — consistently "not a runtime-enforcement claim", "V1 spec-only", "CPW lint (partial)", "AI may not self-certify" |
| **Claims implementation** | whole draft | **Clean** — no claim any validator/runtime implements a rule |
| **Claims lesson compliance** | §18.2, Appendix C | **Clean** — "no current lesson is claimed compliant; retrospective audit pending" |
| Uses **historical as current** | §11.5, §13.3, §20.4 | **Clean** — supersession explicitly marked (every-Reading-ends-in-production; fixed-L40; Franglais; 11-section flow) |
| **Ambiguous ownership** | §15.1 metropolitan default tag | **Flagged (EDITORIAL, P3)** — `[DR]` not implicit `[FL]` |
| Role **collapse** | §4.7 | **Flagged (MINOR, P2)** — blocked-production + ghost not enumerated as distinct roles |

No place strengthens a founder-locked principle into optional guidance in a way the authoritative home (Ch. 19 / the relevant chapter) does not immediately correct; no false implementation/compliance claim exists.

---

## 4. Operational usability test (draft alone)

| # | Authoring decision | Verdict | Basis / missing rule |
|---|---|---|---|
| 1 | May a phrase be a chip? | **CLEAR** | §4.1–4.5 verdict model (Allowed/Caveat/Forbidden), composition classes, bare-atoms-Caveat, no full-sentence chips, frozen classes (§4.6). |
| 2 | Acceptable early-lesson payload? | **PARTLY CLEAR** | §5.2 (active-new 1–4, supported +2–3, ghost +2–3, ≥2×) + Ch. 19 + §6.8 formula give the budget; **missing rule = item-counting methodology** (how a frame+variations counts), explicitly `[OPEN]` §19/CB-22, routed to Curriculum. Honest ratified-open gap, not a draft defect. |
| 3 | What action follows an L2 Reading? | **CLEAR** | §11.2 gives the L0–L3 menu (recognition/noticing/selection/extraction/contrast/prediction/social-function/small supported reuse). (Specific exercise-family taxonomy is deferred `[OPEN]` G1, but the *decision* is answerable.) |
| 4 | Feedback for an incorrect fill answer? | **CLEAR** | §14.5 (first wrong → one neutral coach-voice trap reason) + §14.1/14.2 (passive-mirror, verdict, banned outputs). |
| 5 | Handle a free mixed Weave response? | **CLEAR** | §8.3 (ungraded, compare via Natural Reveal, grading = ERROR) + §10 (bounded authored alternatives). |
| 6 | May a future French form appear? | **CLEAR** | §4.10 (ghost held in context, never correct/produced) + §10.2 (W2 window ~3–4, max 5–6, recognition-only) + §15.2 (prerequisite-safety) + §15.3 (inversion recognition-only). |
| 7 | Is human French review required before internal testing and before Stage C? | **CLEAR** | §18.5 (named-reviewer gate required **before Stage C**; **must not block** internal authoring/drafting/founder-only testing) + §18.3 (stages A–D). |

Only #2 is PARTLY CLEAR, and its gap (item-counting methodology) is an already-ratified OPEN item routed to Curriculum — not something this draft can or should close.

---

## 5. Proposed patch set (smallest exact edits — **not applied** in this task)

> These are documented proposals only; `CONTENT_BIBLE_v1.0.md` is not edited in this review task.

**P1 — §5.2 tag precision (active-new invariant vs supported/ghost tunable).**
- **Current:** `**5.2 Surface ceiling (per teaching lesson).** ` + tag `[FL][TUNABLE]` + "active-new **1–4** (integrations 0) — Ch. 19; supported +2–3; ghost +2–3; …"
- **Replacement:** keep the sentence; change the tags/wording to: `[FL]` for the ceiling and `[TUNABLE]` scoped only to the additive numbers — e.g. "**active-new 1–4 (integrations 0) is a founder authoring invariant `[FL]`, not a freely tunable number** (Ch. 19); supported **+2–3** and ghost **+2–3** are `[TUNABLE]` defaults; every supported item appears ≥2× …".
- **Reason:** Prevents reading the founder ceiling as tunable or the +2–3 defaults as locked. Aligns §5.2 with §1.3 and the authoritative Ch. 19 ("New active chips / lesson … authoring invariant (founder)").
- **Affected CB IDs:** CB-15, CB-13, CB-16.

**P2 — §4.7 role enumeration completeness.**
- **Current:** "Every item carries an in-lesson role: **active** … · **supported** … · **recognition-only** … · **recycled** …"
- **Replacement:** after the four roles, add: "Two further roles sit outside this produce/recognize ladder and **must not be collapsed into recognition-only**: **ghost/exposure** (held in context, never a target — §4.10) and **blocked-production** (a form explicitly barred from being a production target band-wide, e.g. inverted questions — §15.3)."
- **Reason:** CB-08 records the role set as "active/supported/recognition/recycled (+blocked)"; the founder-review invariant is that active/supported/recognition-only/recycled/ghost/blocked-production must not be collapsed. Closes the AI-author collapse risk.
- **Affected CB IDs:** CB-08 (+ CB-47/48 ghost; CB-70 blocked/inversion).

**P3 — §15.1 provenance tag on the variety default (EDITORIAL).**
- **Current:** "Default variety: **contemporary metropolitan French**; deliberate regional use must be declared. `[DR][OPEN]` The full register/style boundaries live in the French style guide…"
- **Replacement:** move/duplicate the tag so the variety default reads: "`[DR]` (Q10) Default variety: **contemporary metropolitan French**; deliberate regional use must be declared. `[OPEN]` The full register/style boundaries live in the French style guide (Ch. 18, still to be authored)."
- **Reason:** CB-68b (metropolitan default) is derived-and-ratified, not founder-locked; the tag should say so.
- **Affected CB IDs:** CB-68 (b).

*No whole-chapter rewrite is proposed or needed.*

---

## 6. Founder decision requirement

**Corrections already determined by ratified canon (no founder call — apply directly):**
- P1 (active-new is a founder invariant per Q4c / Ch. 19; +2–3 are tunable per Q4b).
- P2 (role set incl. blocked per CB-08; "roles must not be collapsed").
- P3 (metropolitan default is derived-ratified per Q10 / CB-68b).

**Editorial improvements:** P3 (tag precision) and, optionally, wording polish only where it improves decision clarity (none other required).

**Genuine new founder decisions required:** **NONE.** Every finding is resolvable from already-ratified canon. The genuinely-open items the draft surfaces (item-counting methodology → Curriculum; Reading exercise-family taxonomy + validator → G1; full French style guide → G2; named reviewer staffing → G3; Mon Lexique final band copy; Summit recalibration) are **already ratified-as-open and routed** — they are not new decisions raised by this review, and the founder need not decide them to sign off the Bible's authoring canon.

---

## 7. Final recommendation

**Apply the three targeted corrections (P1–P3), then the draft is ready for founder read-through and promotion.**

Sequence: (1) apply P1–P3 to `CONTENT_BIBLE_v1.0.md` in a separate authorized edit pass; (2) founder read-through; (3) promote to Canonical after read-through. No new ratification is required; the open/deferred items remain tracked and routed, not blocking.

---

*End of Founder Sign-Off Review v0.1. Read-only diagnosis. The Content Bible remains **Draft — awaiting founder sign-off**; no existing document was edited, no commit/push/PR occurred, and no promotion to Canonical was performed.*
