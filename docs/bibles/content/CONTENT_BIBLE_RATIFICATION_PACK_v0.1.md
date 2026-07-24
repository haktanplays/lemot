# Cairn Content Bible — Ratification Pack v0.1

> **Status:** Decision-cleaning pack for founder review. **Not** the Content Bible. Authorizes no code, no lesson, no ADR change.
> **Date:** 2026-07-24 · **Branch:** `docs/obsidian-product-brain-v0.2` · **Base HEAD at analysis:** `0a110cd`
> **Companion:** [`CONTENT_BIBLE_DECISION_MATRIX_v0.1.md`](CONTENT_BIBLE_DECISION_MATRIX_v0.1.md) (per-decision rows) · [`CONTENT_BIBLE_SOURCE_GAPS_v0.1.md`](CONTENT_BIBLE_SOURCE_GAPS_v0.1.md) (blocking source gaps)
> **Scope guard:** No Social Bible / community / social-layer work is performed or proposed here. Deferred until after Content Bible ratification.

---

## 0. Ratification outcomes (2026-07-24 founder session) — AUTHORITATIVE

All nine live questions were answered by the founder. **This section supersedes the recommendations in §4/§11.** Every accepted item is now Content canon; edits are recorded verbatim in intent.

| Q | Founder answer | Binding effect / edit |
|---|---|---|
| **Q1** | Accept with edit | Ownership + layer-separation rule **ratified**. **Plus:** document titles, note boundaries, and chapter names are **not canon by themselves** — notes may be renamed / merged / split / consolidated / routed to another Bible to improve clarity, **provided** source traceability is intact, superseded decisions stay discoverable, authority + decision history is preserved, any Content-side authoring consequence is preserved when a rule moves, and consolidation never silently changes a decision's status. |
| **Q2** | Accept with edit | Policy Hardening 2026-07-18 **ratified as binding Content authoring policy**, labeled **"derived policy, founder-ratified 2026-07-24"** (not originally founder-authored). Explicit limits: no runtime-enforcement claim; no existing-lesson-compliance claim; no claim validators implement it; **existing lessons require a separate retrospective audit**. |
| **Q3** | Accept | Chip taxonomy, behavioral eligibility model, sentence-family structure **ratified** as stable authoring vocabulary — **revisable later via explicit canon/ADR change** (ratified ≠ permanently immutable). |
| **Q4** | Accept with wording correction | (a) lesson-load/payload **principles = canon**; (b) numeric budgets = **tunable authoring defaults** unless a source explicitly labels a number a hard invariant; (c) **active-new = 1–4** (supersedes coarse 8–15 for learner-facing active production); (d) exact **counting methodology stays OPEN** (Curriculum/Content-ops). **Correction:** "8–12 cards/beats" and "11–14 rendered screens" are **different counting layers, NOT equal** — one beat may need more than one screen/state; the Bible **defines both terms and forbids interchangeable use**. *Do not write "beats = screens."* |
| **Q7** | YES | Reading rule **ratified**: every Reading ends in an appropriate learner **action**, but **not necessarily production**. L0–L3 → bounded recognition/noticing/selection/extraction/contrast/prediction/social-function-match/small supported reuse; later Reading → freer reuse/production **only** when required language is active/supported, prerequisite-safe, load-appropriate, and serves the goal. Prohibited: passive page-turning; sentence-by-sentence translation testing; default "what does this mean?"; school-style paragraph comprehension; quota-only forced output. "Every Reading ends in production" is **superseded (historical only)**. |
| **Q8** | Accept | Both **deferred (confirmed)**. **Instruction Weave:** all current lessons stay English-guided; Phase-D future; fixed-L40 switch **superseded**; a lexique-temperature / evidence-based mechanism may be designed later; current authoring **must not depend** on an unbuilt monolingual-transition system. **Audio:** human recordings = long-term direction; shadowing-first = first speaking/listening behavior; TTS = current runtime; authors may mark future shadowing beats in designNotes; current content **must not depend** on an unbuilt recording pipeline or listening contract. |
| **Q10** | Accept with timing | **Ratified as process canon:** severity model; stage-aware gates; **named human reviewer required**; AI may assist but **may not self-certify `FrenchQAStatus: PASS`**; a **complete French style guide must be authored**; `L1-L5 Proofreading.md` is **one input, not the guide**. **Timing:** the executable gate + named reviewer must be in place **before Stage C (invited-learner exposure)** — it **must not block** internal authoring, drafting, schema work, or founder-only testing before Stage C. Until the style guide exists, unresolved style matters are **marked open, not invented**. The style guide may consolidate/rename/absorb notes while preserving traceability. |
| **Q11** | Accept with edit | **Do NOT ratify "masculine base" as a permanent universal rule.** Ratified instead: **no full gender-agreement system early**; introduce **only the gender distinction the immediate communicative goal needs**; a small feminine-form note (e.g. `-e`) may be used when pedagogically useful; **no paradigms/agreement tables**; **default forms follow the actual sentence / speaker / character / communicative context — not an unconditional masculine-first rule**; broader inclusive-language treatment, sequencing, and UI presentation stay **open** (Curriculum + French style guide). |
| **Q12** | Accept | **Ratified:** Campfire content is generated from the learner's **owned inventory + relevant errors + prerequisite-safe language**; **Content** owns the generation/authoring contract; **Engineering** owns implementation/enforcement; **Product Brain** owns access position, paywall placement, pricing, packaging. Monetization position is **not** fixed in the Content Bible. |

**Structural authority granted (Q1 + closing instruction):** when drafting the Content Bible, existing note titles/file boundaries may be changed, overlapping notes merged, redundant notes turned into chapters/appendices, and misplaced material routed to another Bible. Obsolete titles need not survive as the final IA. **But:** preserve source provenance; preserve supersession history; preserve decision IDs **or** provide an explicit old→new mapping; do not lose unresolved questions; a rename/merge is **not** a new authority event.

**Post-ratification status roll-up:** every `NEEDS_RATIFICATION` item with a live question is now **RATIFIED** (some with edits above); the two `CONFLICT` rows are resolved (CB-14 → beats≠screens defined; CB-22 counting-methodology → **OPEN**, Curriculum/Content-ops); `DEFERRED` items (Instruction Weave, Audio, etc.) are **ratified-as-deferred**; genuinely-still-open items are enumerated in §5-gaps and the deferred-systems chapter. See the matrix banner for the recomputed distribution.

---

## 1. Executive verdict

The prior inventory's **~72 consolidated decisions (CB-01…CB-92)** are, on verification against source, **mostly real and mostly settled** — but a meaningful minority need founder judgment before the Content Bible is drafted, and the numbers must be separated from the principles.

Verified disposition (primary status per decision; full rows in the matrix):

| Group | Count (approx.) | Meaning |
|---|---|---|
| **A — Settled canon** | **~40** | Founder-locked, Accepted ADR, or already Product-Brain canon, internally consistent. Ratify-as-is or already canon; wording cleanup only. |
| **B — Ratification required** | **~18** | Derived-synthesis or ambiguous rules that materially shape authoring. Clustered into **12 founder questions**. |
| **C — Tunable parameters** | **~14 numeric clusters** | Principles are canon; the numbers are authoring defaults / validator thresholds / planning targets — **not scientifically calibrated**. |
| **D — Open tensions** | **12 investigated** | After the 2026-07-24 correction: ~4 true divergences still need a founder call (active-new, French QA, gender, Campfire position); Reading is founder-resolved (Q7 ratifies); insight-budget resolved editorially; the rest are layer/terminology differences. |
| **E — Route to another Bible** | **~15 facets** | Enforcement, sequencing, algorithms, artwork, tone, and paywall position belong elsewhere; the Content-side authoring consequence is preserved with a cross-reference. |

> Groups A–E are **overlapping analytical lenses** — one decision can be Settled *and* carry a tunable number *and* route a facet, so these counts intentionally overlap and do **not** sum to 72/92. The **exclusive** one-status-per-decision counts (sum = 92) are in §12 and the matrix.

**Headline finding:** the single largest risk is **over-promotion of the "Policy Hardening — 2026-07-18" derived layer** (production-load accounting, authoring ledger, content-safety checklist, archetype contracts, error-source classification). These are high-quality drafts that each carry an explicit NON-CLAIM ("authoring/review discipline, runtime enforcement not claimed; no existing lesson claimed compliant") and embed an unfilled `founderReviewStatus` field. They must be **ratified, not assumed** (Q2). **Reading** is now resolved in principle by the 2026-07-24 founder correction — every Reading ends in an appropriate action, production conditional not universal (Q7 ratifies it); only the Reading exercise-family taxonomy and validator remain open (source-gaps G1).

**Recommendation:** proceed to answer the 12 clustered founder questions (§4, §11) in dependency order; do **not** draft `CONTENT_BIBLE_v1.0.md` until they are answered.

---

## 2. Source and authority method

**Method.** Every material claim was checked against the cited source, not accepted from the inventory. Fully re-read this pass: `docs/canon/LESSON_FLOW_CANON_v1.md`, `docs/PAYLOAD_ECONOMY_v0.md`, `docs/EXERCISE_CANON_v0.4.md`, `docs/learning-engine-v1.md`, `obsidian-product-brain/ACTIVE_CODEX/10_OPERATIONS/French Linguistic QA.md`; plus the three Product-Brain files, `CAIRN_PRODUCT_ANSWERS_2026_07.md`, `PAYLOAD_ECONOMY`, and the seven content ADRs were verified earlier in this session. Where a claim rested on the inventory alone, it is flagged.

**Authority order used** (higher wins; a later timestamp alone is *not* authority):

1. Explicit founder-locked decision / direct founder answer — `CAIRN_PRODUCT_ANSWERS_2026_07.md` (W1/W2/C1/C2/S1), `PAYLOAD_ECONOMY_v0.md` ("Locked by Haktan"), Haktan-attributed `EXERCISE_CANON §5`, Product-Brain `PB-0xx`.
2. Accepted ADR — `09_DECISIONS/ADR-0001…0025`.
3. Current closed design canon — `LESSON_FLOW_CANON_v1.md` ("KAPANMIŞ tasarım kanonu").
4. Operator-approved contract / build spec — `CONTENT_FACTORY_CONTRACT.md` ("Operator-approved"), non-§66 `CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md`.
5. Derived synthesis over existing canon — the `02_LEARNING_SYSTEM/` + `10_OPERATIONS/` **"Policy Hardening — 2026-07-18"** sections.
6. Historical / archive — `SOURCE_ARCHIVE/AVAILABLE_INPUTS/*`, `Tasarim_Envanteri.md`.
7. Superseded — `Superseded Decisions.md` entries.

**Conflict rule applied:** where two sources conflict and neither clearly supersedes, both are shown, the likely current direction is named, and a founder decision is requested (§6). No conflict was invented from terminology alone.

**Coverage caveat (see §12 and the source-gaps file):** the raw founder negotiation logs, `v1 Canon TOP`, `Q1–Q6/D1–D6`, `User Journey`, `L1-L5 Proofreading.md`, and Merged-Canon detail are **operator-vault-only and not in-repo**; the live Obsidian vault is inaccessible from this session. Several wording/threshold questions below may already be answered there.

---

## 3. Settled canon summary

These need **no founder question** (ratify-as-is or already canon); the Content Bible transcribes them with editorial cleanup only. Full detail in the matrix; the load-bearing set:

- **Weave core** — Weave is the primary production mechanic (ADR-0003, CB-30); true-form leaves unknowns in English (ANSWERS §2, CB-31); **W1 open mixed Weaves are ungraded → Natural Reveal** (ANSWERS W1, CB-32); directive/intent prompts, not "translate this" (EXERCISE §0, CB-34).
- **Natural Reveal** — accompanies all free production (ANSWERS §3, CB-37); **W2 look-ahead ~3–4 (max 5–6) lessons, recognition-only** (ANSWERS W2, CB-38).
- **Chips** — no full-sentence chips (ADR-0004, CB-03); PROTECTED_CHUNKS frozen at two + SURVIVAL_FORMULAS closed, Haktan-gated (PAYLOAD §4.1, CB-06); `oui` producible answer (PAYLOAD §4.2, CB-07); `piecesUsed` atomic/produced-only (CB-09).
- **Whole-first** — meet-card whole → decompose; unpack after contact; no grammar dump before contact; tables banned as drills, once as a map (ADR-0005 + EXERCISE §6, CB-11/CB-29).
- **Feedback identity** — passive-mirror mentor tone (ADR-0002, CB-59); banned gamification language, "streak"→"days on the path" (ADR-0001, CB-67); near-miss = soft signal, never failure (ADR-0021, CB-61); one nudge, no native rewrite (EXERCISE §1.5, CB-63).
- **Recognition/production** — production-first (EXERCISE §1.2, CB-46); future/ghost never a correct answer / never a production target (LESSON_FLOW §2.2–2.3, CB-48); boundary "later form" soft cards (ADR-0016, CB-49).
- **French safety** — natural not literal (CB-68a); prerequisite-safety overrides correctness (CB-69); survival-formula locked wording `vous pouvez répéter ?`, inversion recognition-only band-wide (CB-70) — **exact French strings preserved**.
- **Structure** — 7 frozen screen types (CB-12); lesson-vs-Hub split, Hub optional never gates (EXERCISE §5/§5.4, CB-73/CB-74); L0 first-use bridge (ADR-0006, CB-85).
- **Already Product-Brain canon** (Content holds only the authoring facet, cites not re-owns): Mon Lexique nature + content types (PB-040/041, CB-77/CB-79), AI roles (PB-049/050/051, CB-81), calm resting state + natural-language weaknesses (PB-033/034/035, CB-76), Journey narration (PB-081, CB-83), Progressive Language Independence per-surface (PB-082, CB-44), Campfire mechanic (PB-063/064, CB-87a).

---

## 4. Founder decisions required

**Nine clusters** (reduced from twelve after the 2026-07-24 correction: Q5→merged into Q4, Q6→resolved editorially, Q9→merged into Q8). Each groups related CB IDs so the founder decides intent once, not 72 times. Full framing in §11. **Do not treat a recommendation as a decision.**

| # | Cluster | Why it needs a founder call | Recommended | CB IDs |
|---|---|---|---|---|
| **Q1** | Ownership & layer-separation rule | Every straddle depends on one rule: Content owns authoring/copy, Engineering owns enforcement/algorithm, Brand owns tone/name, Curriculum owns sequence. | Adopt | all straddles (CB-03,08,12,32,36,62,66,89, etc.) |
| **Q2** | Ratify the "Policy Hardening 2026-07-18" derived layer | These become binding authoring canon though runtime enforcement is unimplemented and no lesson is verified compliant. | Ratify **as authoring policy** (not runtime, not founder-locked-origin) | CB-17, CB-18, CB-66, CB-91, CB-92 (+ CB-08 integrity) |
| **Q3** | Chip taxonomy & lesson-structure model | 12-type taxonomy, verdict lists, sentence-family model are "revisable" design canon, not locked. | Ratify | CB-02, CB-04, CB-05, CB-10, CB-27 |
| **Q4** | Lesson budgets: principle, numbers, active-new (merges Q5) | Ratify "small bounded lessons" as canon while numbers become tunable defaults; confirm active-new = 1–4 (supersedes coarse 8–15); counting = open Curriculum. | Ratify principle; numbers tunable; active-new 1–4 | CB-13, CB-14, CB-15, CB-16, CB-22 |
| **Q7** | Reading rule (ratify 2026-07-24 founder correction) | Every Reading ends in an appropriate action; production conditional, not universal; taxonomy/validator deferred. | **YES** | CB-50 (+ CB-46, CB-20, CB-11) |
| **Q8** | Deferred directions: Instruction Weave + Audio (merges Q9) | Confirm both stay deferred (Phase D / audio pipeline); english-guided default; documented as future canon. | Confirm deferred | CB-40–44, CB-51, CB-52, CB-53 |
| **Q10** | French QA gate + style-guide commitment | Provisional derived gate; no style guide, no reviewer, execution OPEN; `L1-L5 Proofreading.md` is input, not the guide. | Adopt process + author style guide + staff reviewer | CB-68b, CB-71 |
| **Q11** | Gender-variant handling | Masculine-base + one micro-note, no agreement system — current practice, not locked. | Confirm current practice; coverage = open Curriculum | (gender rule; French-safety) |
| **Q12** | Campfire content vs paywall position | Campfire generated content (C1) is Content; paywall position is Product-Brain. | Ratify C1; route position to PB | CB-87 |

*Retired from the founder set: **Q5** (merged into Q4), **Q6** (resolved editorially — insight budget target 2 / ceiling 3 by closed-canon > archive), **Q9** (merged into Q8). Nine live questions.*

---

## 5. Tunable parameters register

Principles are canon; these numbers are **not**. Each is labeled by **function** and **enforcement**. None is presented as scientifically validated.

| Parameter | Value(s) | Function | Enforcement | Confidence | Strongest source |
|---|---|---|---|---|---|
| Total screens / lesson | 11–14 | Authoring default (labeled "invariant") | V1 **spec-only** (not mechanized) | Med | LESSON_FLOW §1.1 |
| Lesson spine cards (beats) | 8–12 | Authoring default | none | Med | EXERCISE_CANON §5.1 |
| Action vs insight screens | 9–11 action / 2–3 insight | Authoring default | V5 insight (mechanized) | Med | LESSON_FLOW §1.1 |
| Micro-actions / lesson; per screen | 15–25 total; 1–3 (cap 4) | Authoring default | V1 **spec-only** | Med | LESSON_FLOW §1.1 |
| Lesson time | 7–10 min | Planning target | none (estimatedMinutes) | Med | LESSON_FLOW §1.1 |
| **New active chips / lesson** | **1–4** (LESSON_FLOW) / **1–3** (PAYLOAD) | **Hard-ish authoring invariant** (founder-locked in PAYLOAD) | build-time review | High (existence); Low (3 vs 4) | PAYLOAD §3; LESSON_FLOW §1.1 |
| Production actions / lesson | 3–5 | Authoring default | none | Med | LESSON_FLOW §1.1 |
| Supported / ghost additions | +2–3 each | Authoring default (founder-locked) | CPW review | High | PAYLOAD §3 |
| **Insight-card budget** | target **2** / ceiling **3** | Validator threshold (ceiling 3) + authoring target (2) — **editorially resolved (Q6 retired)** | **V5 mechanized** (>3 WARNING) | Med | LESSON_FLOW §1.4; EXERCISE §5.1 |
| Visible carryover / lesson | ≤3 | Validator threshold — **TUNABLE** | CPW lint (build-time) | Low ("not calibrated") | CFC §1.5 |
| Recycled / sentence; exposure / unit; weak / sentence | ≤2; ≤2; ≤1 | Validator thresholds — **TUNABLE** | partial CPW lint | Low | CFC §1.5; D&CL |
| Target-load share / lesson | ≥0.50 | Validator threshold — **TUNABLE** | CPW lint | Low | CFC §1.5 |
| **W2 reveal look-ahead** | ~3–4 (max 5–6) lessons | **Authoring rule (founder-locked)** | §16 lint ERROR | High | ANSWERS W2; EXERCISE §16 |
| Exposure horizon (Kademe 1/2/3) | 3–5 / ~10 / 20–30 lessons | Provisional heuristic | V7 spec-only | Low | LESSON_FLOW §3 |
| COMPREHENSIBILITY_THRESHOLD | 0.90? | Provisional heuristic (self-marked "?") | none | Low ("telemetry calibrates") | LESSON_FLOW §3/§13 |
| Exposure atmosphere / session | 1 | Provisional heuristic | V7 spec-only | Low | LESSON_FLOW §3 |
| GATE_WARM_DAYS | 7 | Provisional heuristic (readiness) | none | Low | LESSON_FLOW §7 |
| Early-lesson item budget | 30–45 exp / 8–15 act / 8–15 sup / 10–20 rec | **Planning target — OPEN** (superseded for active-new by 1–4) | none | Low (coarse) | learning-engine §7/§17 |
| Breadth trajectory | L5: 18–22/30–35 · L15: 45–55/70–90 | Planning target (audit metric) | audit report | Med | PAYLOAD §9 |
| Max nudges / output | 1 | Authoring rule (founder) | nudge validator | High | EXERCISE §1.5 |
| Practice "today's set" | 5–8 micro-actions, 3–5 min | Authoring default | none | Med | LESSON_FLOW §5.1 |

**Rule for the Content Bible:** put all numbers in one chapter (proposed Ch. 22) and label each with these tags, so tuning a threshold never requires editing a principle.

---

## 6. Contradictions and tensions

The twelve mandated areas, verified. **6 are true divergences (founder action); 6 are layer/terminology differences (editorial, no founder action).**

| # | Area | Positions | Verdict | Founder action? |
|---|---|---|---|---|
| 1 | Payload ceiling vs broad exposure planning | PAYLOAD §3 active-new **1–3** (locked, post-audit, "the fix is NOT more active chips") vs learning-engine §7 **8–15** (coarse, §17 "open decisions") | **Different layer + supersession**: PAYLOAD (later, founder-locked) governs active-new; §7 is coarse total-exposure planning, self-declared open. Likely direction: 1–4. | **Yes** (Q5) — confirm number + that counting method is open |
| 2 | 8–12 cards vs 11–14 screens | EXERCISE §5.1 "8–12 cards/beats" vs LESSON_FLOW §1.1 "11–14 rendered screens" | **Different counting layers — NOT equal** (founder Q4d): a pedagogical beat/card may require **more than one** rendered screen/state. The Bible defines both terms and forbids interchangeable use — **never "beats = screens."** | Resolved by Q4d (define both; not equal) |
| 3 | Insight budget wording | 2 (EXERCISE §5.1) / 2–3 ceiling 3 (LESSON_FLOW §1.4, V5) / 1-per-chunk-or-2 (Tasarım Envanteri, archive MC.2) | **Resolved editorially**: closed design canon + V5 (ceiling 3) supersedes archive MC.2. | **No** — Q6 retired; target 2 / ceiling 3 |
| 4 | Instruction Weave thermostat vs english-guided default | LESSON_FLOW §4 thermostat (Phase D) vs §17/§4.1 "all lessons english-guided until a ladder plan is locked" | **Different time-layer, not a conflict**: thermostat is the deferred future; english-guided is today. Already reconciled at product level (PB-080). | **Yes, light** (Q8) — confirm deferral status |
| 5 | Historical L40 transition vs lexique-temperature | Tasarim_Envanteri §15 fixed-L40 (ARCHIVE, "Open Decision A") vs LESSON_FLOW §4.2 lexique-temp thermostat | **Superseded**: L40 model is archived; thermostat supersedes (Product Brain PB-080 records this). | No — mark L40 SUPERSEDED (confirm in Q8) |
| 6 | Human-recorded audio vs TTS reality | ANSWERS §4 human recordings + shadowing (founder direction) vs BUILDSPEC §66.1 "recorded audio DEFERRED"; TTS is shipping | **Different layer**: direction vs current reality + placeholder-hygiene (CB-54). Not a conflict. | **Yes, light** (Q9) — confirm direction + deferral |
| 7 | French QA desired gate vs executable gate | French QA note `canon_status: provisional`, gate execution **OPEN**, no style guide, reviewer **UNKNOWN**; "Policy Hardening" hardens it to [LOCKED DEFAULT] but is **derived** | **Real gap**: the *policy* is drafted; the *executable gate* does not exist. | **Yes** (Q10) |
| 8 | Gender-variant handling | Open_Questions "how to handle prêt/prête?" UNRESOLVED vs PAYLOAD §6 + EXERCISE L2/L4 "-e micro-note, no agreement system" | **Ratified (Q11, edited):** no full agreement system early; introduce only the gender distinction the immediate communicative goal needs; small `-e` note when useful; **default form follows the actual sentence / speaker / character / context — NOT an unconditional masculine-first rule**; broader inclusive treatment / sequencing / UI = open (Curriculum + style guide). | Resolved by Q11 (edited) |
| 9 | Campfire/paywall access | ANSWERS §5 "Campfire @ L24 (locked)" (C1 mechanic) vs BUILDSPEC §66.3 "position re-decided post-validation" (Contradictions C3) | **Split by layer**: C1 *content mechanic* is locked (Content); L24 *position/price* is deferred (Product Brain, already an OPEN founder question). | **Yes, routing** (Q12) — ratify C1, route position to PB |
| 10 | Reading rules (comprehension/action/production/translation) | Earlier "every Reading ends in production" vs the **2026-07-24 founder correction** (action required, production conditional) | **Resolved by founder correction**: the earlier proposal is superseded; the principle is now set. Taxonomy/validator remain deferred impl (G1). | **Yes** (Q7) — ratify the founder's own correction; see §8 |
| 11 | Content vs Engineering enforcement | Many rules pair an authoring rule with a CI/runtime enforcer (CB-03/32/36/62/89, V1–V9) | **Layered, not conflicting** — resolved by the Q1 layer-separation rule. | No (Q1 covers) |
| 12 | Founder-locked vs derived "Policy Hardening" | Founder-locked (ANSWERS, PAYLOAD, ADRs, PB) vs derived 2026-07-18 invariants (NON-CLAIM disclaimers, `founderReviewStatus` unfilled) | **Real authority gap**: derived rules must not be labeled founder-locked. | **Yes** (Q2) |

---

## 7. Ownership and Bible-routing corrections

Applying Q1's layer rule. **Content implications are retained on the Content side even where enforcement/mechanics route elsewhere** (never flattened).

| CB | Route the … | to | Keep on Content side |
|---|---|---|---|
| CB-89 | deriveDrill / practice-selector algorithm | **Engineering** | "hub generation multiplies approved patterns, never invents syllabus" (authoring rule) |
| CB-08, CB-12, CB-62 | runtime status enum / screen-type schema / tag→verdict bridge | **Engineering** | item-role authoring, 7-type authoring, learner-facing verdict copy |
| CB-03, CB-32, CB-36, CB-48, CB-64 | CI lints / grading suppression / runtime hint ladder / V3-V4 | **Engineering** | the authoring rules themselves (no full-sentence chips; open Weave ungraded; hint = material not answer; ghost never a correct answer; authored trapReasons) |
| CB-66 | error→weakness→repair scheduling algorithm | **Engineering / Reinforcement** | "a linguistic/content error is not learner weakness"; "exposure/ghost failure ≠ weakness" (authoring guardrail) |
| CB-10, CB-18, CB-19, CB-22, CB-38, CB-58, CB-70, CB-74, CB-85 | lesson sequence / archetype→lesson assignment / verb order / retrieval reach / ~L10 & L0 placement / inversion banding | **Curriculum** | the authoring/copy consequence in each lesson |
| CB-30, CB-35, CB-45, CB-84 | the name "Weave" / badge / sentence naming / mountain artwork | **Brand** | mechanic authoring; copy strings; narration copy |
| CB-59, CB-60, CB-76, CB-83 | exact tone / final copy strings | **Brand** (tone) | the authoring *rule* (which strings are banned/preferred; passive-mirror) |
| CB-67 | no-gamification *non-goal* | **Product Brain** (PB-053/076) | the banned-language authoring rule |
| CB-87 | paywall **position/price** | **Product Brain** (open founder Q) | Campfire generated-content authoring (C1) |
| CB-10 §10/§11 | tense/mood doorway sequence; frequency-priority | **Curriculum** | — (not Content; cross-ref only) |

No decision was found that belongs *solely* to another Bible yet was mis-filed as Content. Every straddle is a genuine shared surface; the split above prevents the Content Bible from duplicating another Bible's canon.

---

## 8. Reading-specific findings

**Updated by the 2026-07-24 founder correction (authority level 1).** The baseline Reading principle is **now set by the founder** and supersedes the earlier assistant proposal that *"every Reading exercise must end in production."* Only the exercise-family taxonomy and validator implementation remain open (source-gaps G1).

**Settled principle (proposed current canon; ratified via Q7):**
> **Every Reading ends in an appropriate learner *action* — but not necessarily full production.** A valid Reading action may be: recognizing the scene/intention, noticing a reusable piece, selecting a fitting continuation, identifying a contrast, extracting useful language, matching a line to its social function, making a bounded prediction, small supported reuse, **or** producing language when level, prerequisites, and cognitive load make production appropriate.
> - **Early (L0–L3):** Reading normally ends in a bounded non-production action (recognition, noticing, selection, extraction, small supported reuse). Requiring free/full production after every early Reading is too cognitively expensive.
> - **Later:** Reading may lead to freer reuse or production when the required language is already active/supported, prerequisite-safety holds, the production serves the lesson goal, and it does not overload the learner.
> - **Universal prohibitions:** no sentence-by-sentence translation testing; no default "what does this sentence mean?"; no school-style paragraph comprehension; no passive text screen with no learner action; no forced production added merely to hit a quota.

**Consistent with verified canon:** production-first stays the app direction (CB-46) — a Reading "output" is simply allowed to be a *bounded action* rather than full production; every screen still demands ≥1 action (CB-20, "no passive screen"); no-translation-quiz holds (CB-50, EXERCISE §16); the whole-first meet-card decompose is itself a bounded Reading action (CB-11).

**Superseded (kept as historical design reasoning, not current canon):** *"Every Reading exercise must end in production."*

**Four-layer distinction for the Reading chapter:**
1. **Settled principle** — action-required, production-conditional (this section; Q7).
2. **Tunable implementation** — which actions are appropriate per band (early-vs-later thresholds).
3. **Unresolved exercise-family taxonomy** — the specific Reading exercise families (still open; source-gaps G1).
4. **Engineering enforcement** — a future Reading validator (the truncated `EXERCISE §16` scale-rule list) — Engineering-owned.

**Evidence note:** `L1-L5 Proofreading.md` is a legacy content inventory / proofreading corpus — supporting evidence for French copy QA, **not** a Reading-system canon and **not** the missing style guide (source-gaps G2). It does not close the taxonomy gap.

**Disposition:** ratify the principle now (Q7, recommended **YES**); populate the Reading chapter with the principle + the four-layer distinction; leave taxonomy/validator as deferred implementation.

---

## 9. Proposed Content Bible chapter structure

The proposed 24-chapter structure is **sound but slightly over-split**. Recommended structure (**20 chapters**), with every change justified. Rationale: avoid tiny per-decision chapters; keep one home per concept; put all numbers in one place.

| # | Chapter | Change vs proposal | Why |
|---|---|---|---|
| 1 | Purpose & authority | keep | — |
| 2 | Content ownership boundaries (+ layer-separation rule) | keep; fold in Q1 | The layer rule is the spine of every routing call. |
| 3 | Learner-facing content principles | keep | — |
| 4 | Chip & item model (incl. recognition/production/ghost/recycle roles) | **merge** proposed Ch.4 + Ch.12 | Roles are part of the item model; separate chapters duplicate CB-08/CB-47/CB-48. |
| 5 | Lesson payload economy | keep | — |
| 6 | Lesson authoring structure (incl. Meet & whole-first) | **merge** proposed Ch.6 + Ch.7 | Meet/whole-first is the opening of lesson structure, not a standalone chapter. |
| 7 | Insight & micro-logic | keep (was Ch.8) | — |
| 8 | Weave | keep | — |
| 9 | Say It Your Way, Speaking & Writing (free production) | **merge** proposed Ch.10 + Ch.15 | Say It, speaking, and writing are one free-production surface. |
| 10 | Natural Reveal | keep | — |
| 11 | Reading | keep — **gated on Q7** | Do not populate beyond the four ratify-able facts until Q7. |
| 12 | Listening & audio | keep | — |
| 13 | Prompt & instruction language | **merge** proposed Ch.16 (Prompt design) + Instruction Weave | Prompt copy and instruction-voice are the same authoring surface; Instruction Weave is deferred (label it so). |
| 14 | Feedback & error recovery | **merge** proposed Ch.17 + Ch.18 | Feedback and error recovery share the passive-mirror/verdict model. |
| 15 | French naturalness & linguistic safety | keep | — |
| 16 | Practice & reinforcement content (Practice Hub, Campfire, Daily Review) | keep | — |
| 17 | Mon Lexique content | **add** (proposal omitted it as a chapter) | CB-77…CB-80 are a distinct authoring surface (card authoring is delegated to Content by PB-041). |
| 18 | Content QA & review gates | keep — **gated on Q10** | — |
| 19 | Tunable parameters | keep | Single home for all numbers (§5). |
| 20 | Authoring checklist + Open decisions & deferred systems | **merge** proposed Ch.23 + Ch.24 | The checklist and the open-list are both "operate the Bible" back-matter. |

Dropped as standalone chapters (folded, not deleted): "Recognition/production/ghost/recycle roles" (→ Ch.4), "Meet & whole-first" (→ Ch.6), "Speaking & writing" (→ Ch.9), "Prompt design" (→ Ch.13). AI-assistance content (CB-81/82) lives as a section inside Ch.15/Ch.3 (it is mostly Product-Brain canon + a Content authoring guardrail), not a chapter.

---

## 10. Recommended ratification sequence

Answer **foundational questions before numeric tuning**, and ownership before everything. **Nine live questions** (Q5 merged into Q4, Q6 resolved editorially, Q9 merged into Q8):

1. **Q1 Ownership & layer rule** — unblocks every routing/straddle call.
2. **Q2 Policy-Hardening ratification** — decides whether ~5 derived clusters are canon at all.
3. **Q3 Chip & structure model** — the authoring spine.
4. **Q4 Lesson budgets (incl. active-new count)** — separates canon from tunables; the most load-bearing number.
5. **Q7 Reading rule** — ratifies the founder correction; unblocks the Reading chapter (taxonomy stays deferred).
6. **Q8 Deferred directions (Instruction Weave + Audio)** — confirms deferral.
7. **Q10 French QA gate + style-guide commitment** — decides the shipping-quality gate + commitments.
8. **Q11 Gender variants** — narrow authoring rule.
9. **Q12 Campfire vs paywall position** — a routing confirmation.

---

## 11. Exact founder question list

Binary/bounded. Each: **recommended → alternative → consequence of each → affected CB**.

**Q1 — Ownership & layer separation.** *Should the Content Bible adopt this rule: "Content owns authoring, copy, and presentation; Engineering owns enforcement, algorithms, schema, and runtime; Brand owns tone, naming, and artwork; Curriculum owns sequence and placement" — and split any multi-layer rule accordingly (e.g. open Weave: Content = "author it ungraded", Engineering = "validator rejects grading config", Brand = "neutral compare copy")?*
- **Recommended:** Yes. **Alternative:** Keep cross-functional rules whole in Content.
- **Consequence — Yes:** clean routing; Content Bible stays authoring-only; no duplication. **Consequence — Alternative:** Content Bible absorbs enforcement/mechanics it can't own; drift with Engineering/Brand.
- **Affects:** all straddles (CB-03, 08, 12, 30, 32, 35, 36, 45, 62, 66, 67, 76, 83, 84, 87, 89).

**Q2 — Ratify the "Policy Hardening 2026-07-18" derived layer as authoring canon.** *Should the production-load accounting rule (CB-17), the required per-lesson/per-item authoring ledger (CB-91), the content-safety review checklist + anti-gaming rules (CB-92), the archetype activeNew contracts (CB-18), and the error-source classification (CB-66) become binding Content Bible **authoring** canon — explicitly labeled derived-and-ratified (not founder-locked-origin), and explicitly not a claim of runtime enforcement or existing-lesson compliance?*
- **Recommended:** Yes, as authoring policy with those labels. **Alternative:** Keep them advisory drafts pending a dedicated review.
- **Consequence — Yes:** authors get a strong, testable discipline; must accept a retro-audit debt (no current lesson is verified compliant). **Consequence — Alternative:** authoring stays under-specified; the 2026-07-18 work sits unratified.
- **Affects:** CB-17, CB-18, CB-66, CB-91, CB-92, CB-08 (integrity invariants).

**Q3 — Ratify the chip taxonomy & lesson-structure model.** *Should the 12-type behavioral chip taxonomy + 3-verdict model (CB-02), the primary-UI-chip eligibility lists incl. bare-atoms-as-Caveat (CB-04/CB-05), the sentence-family lesson input model (CB-10), and the faux-ami "Not this / But this" authoring frame (CB-27) be ratified as Content canon (they are currently "revisable" design canon)?*
- **Recommended:** Yes. **Alternative:** Ratify taxonomy only; leave eligibility lists provisional.
- **Consequence — Yes:** stable authoring vocabulary. **Consequence — Alternative:** repeated re-litigation of what may be a chip.
- **Affects:** CB-02, CB-04, CB-05, CB-10, CB-27.

**Q4 — Lesson budgets: principle, numbers, and active-new count (merges former Q5).** *Should the Content Bible (a) ratify the **principle** "lessons are deliberately small and bounded in new load" as canon while the specific numbers (11–14 screens, 8–12 cards, 3–5 productions, load caps) become **tunable authoring defaults**; (b) define "8–12 cards/beats" and "11–14 rendered screens" as **two different counting layers that are not equal** (one beat may need more than one screen; the Bible defines both and forbids interchangeable use — never "beats = screens"); and (c) confirm **new-active-chips-per-lesson = 1–4** (PAYLOAD "1–3" / LESSON_FLOW "1–4", superseding learning-engine §7's coarse "8–15"), with item-counting methodology remaining an **open Curriculum** question?*
- **Recommended:** Yes to all three. **Alternative:** Freeze the numbers as hard invariants and/or re-open active-new to 8–15.
- **Consequence — Yes:** numbers tune on smoke evidence without a canon change; card/screen wording reconciled; active-new matches the post-audit locked direction ("the fix is NOT more active chips"). **Consequence — Alternative:** every calibration becomes a canon edit; re-opening 8–15 contradicts PAYLOAD (founder-locked) and overloads early lessons.
- **Affects:** CB-13, CB-14, CB-15, CB-16, CB-22.

**Q5 — (merged into Q4).** Active-new count is now decided as part of the budgets question above.

**Q6 — (resolved editorially — not a founder question).** Insight-card budget = **target 2 / ceiling 3** by authority hierarchy: closed design canon (`LESSON_FLOW §1.4` + the mechanized V5 lint, which warns above 3) supersedes the archived MC.2 "1 per chunk OR 2 per lesson" wording. No founder call required; the founder may override if desired. Affects **CB-26**.

**Q7 — Reading rule (ratify the 2026-07-24 founder correction).** *Should Cairn ratify "**every Reading ends in an appropriate learner action, but not necessarily production**" as the Content Bible Reading rule — early Reading (L0–L3) normally ending in a bounded non-production action (recognition, noticing, selection, extraction, small supported reuse), later Reading allowing freer reuse/production only when level, prerequisites, and load permit, and never becoming translation-testing / school comprehension / passive page-turning / quota-driven production?* (The exercise-family taxonomy and the Reading validator remain deferred implementation, source-gaps G1.)
- **Recommended:** **YES.** **Alternatives:** (b) NO — require production after every Reading; (c) NO — allow passive Reading with no required action.
- **Consequence — YES:** prevents passive Reading; avoids cognitively expensive production at early levels; allows recognition/noticing/extraction/bounded reuse and later production; preserves production-first *without* making every exercise a production exercise.
- **Consequence — (b) require production:** stronger output pressure, **but** risks cognitive overload, artificial exercise endings, and loss of Reading's low-pressure comprehension value.
- **Consequence — (c) allow passive:** preserves calm exposure, **but** risks page-turning, school-text behaviour, and low evidence of learner engagement.
- **Affects:** CB-50 (home of the rule); consistent with CB-46 (production-first, now with Reading as the scoped exception), CB-20 (no passive screen), CB-11 (meet-card decompose), CB-50-no-translation-quiz. Supersedes the "every Reading ends in production" proposal.

**Q8 — Deferred directions: Instruction Weave + Audio (merges former Q9).** *Confirm both founder-direction systems stay deferred and documented as future canon, not active authoring: (a) **Instruction Weave** (4 tiers, lexique-temperature thermostat, surface-order + emergency-exit, CB-40/41/42) remains **deferred to Phase D**, with **all lessons english-guided** as the current default (CB-43) and the archived fixed-L40 transition **superseded**; and (b) **Audio** — human recordings replace TTS + shadowing (ungraded) first, graded pronunciation later (CB-51/52) — is founder **direction**, while current TTS + placeholder-hygiene (CB-54) is the shipping reality and the listening-comprehension contract stays **deferred** (CB-53)?*
- **Recommended:** Yes to both (confirm deferral; (a) restates PB-080 for the authoring layer). **Alternative:** Begin wiring the monolingual ladder and/or treat recorded audio as near-term.
- **Consequence — Yes:** authors keep writing english-guided and mark shadowing beats in designNotes (S1) — no schema/audio dependency. **Consequence — Alternative:** contradicts "until a ladder plan is locked" / Phase-D, and blocks content on an unbuilt audio pipeline.
- **Affects:** CB-40, CB-41, CB-42, CB-43, CB-44, CB-51, CB-52, CB-53.

**Q9 — (merged into Q8).** Audio direction is now confirmed alongside Instruction Weave above.

**Q10 — French QA gate + style-guide commitment.** *Adopt the French Linguistic QA severity model + stage-aware visibility gate (A–D) + named-reviewer + "AI cannot self-certify" as Content Bible **process** canon (labeled derived-and-ratified), **and** commit to (i) **authoring a full French style guide** — using `L1-L5 Proofreading.md` as **one input, not as the guide itself** (it is a legacy content/proofreading corpus, not a style guide; source-gaps G2) — and (ii) staffing a named qualified reviewer; or keep the gate provisional and non-blocking?*
- **Recommended:** Adopt the process + commit to (i) and (ii). **Alternative:** Keep provisional.
- **Consequence — Adopt:** a real shipping-quality gate before invited-learner (Stage C) exposure; the style-guide gap (G2) gets an owner. **Consequence — Alternative:** no executable French-quality gate and no style guide; risk of shipping unreviewed French.
- **Affects:** CB-71, CB-68 (variety default).

**Q11 — Gender-variant handling.** *Confirm the current authoring rule — early lessons teach the **masculine base + one micro-note for the `-e` form, with no agreement system** (e.g. `fatigué(e)`) — as Content canon, and treat broader gender-variant coverage/sequencing (e.g. when `prêt/prête` becomes productive) as an **open Curriculum** question?*
- **Recommended:** Yes. **Alternative:** Define full gender treatment now.
- **Consequence — Yes:** matches PAYLOAD §6 + shipped L2/L4; avoids beginner overload. **Consequence — Alternative:** premature agreement-system load.
- **Affects:** gender rule (French-safety chapter).

**Q12 — Campfire content vs paywall position.** *Ratify C1 — "Campfire content is **generated** from the learner's owned inventory + error tracking, may tease ahead-words" — as Content canon, while the paywall **position/price** (the "@L24 (locked)" vs "deferred post-validation" tension) is confirmed to be a **Product Brain** open question, not a Content decision?*
- **Recommended:** Yes. **Alternative:** Fix the paywall position inside the Content Bible.
- **Consequence — Yes:** Content owns the generation rule; monetization stays with Product Brain (where it already is an open founder question). **Consequence — Alternative:** Content Bible overreaches into monetization.
- **Affects:** CB-87.

---

## 12. Appendix: CB-01 → CB-92 disposition

**Exclusive primary-status counts (one per decision; sum = 92):**

| Status | Count |
|---|---|
| SETTLED (ratify-as-is / already canon) | 60 |
| NEEDS_RATIFICATION | 21 |
| TUNABLE (primarily a number) | 2 |
| CONFLICT (founder call) | 2 |
| DEFERRED | 6 |
| ROUTE_TO_OTHER_BIBLE (primary owner elsewhere) | 1 |
| SUPERSEDED (as a primary status) | 0 |

These are the **exclusive primaries**. They differ deliberately from the **overlapping analytical Groups A–E in §1** (a single decision can be Settled *and* carry a tunable number *and* route a facet). The cross-cutting overlays: the tunable-parameter **register (§5)** spans ~14 numbers; **~15 decisions route a facet** to Engineering/Curriculum/Brand while keeping the Content authoring core (**§7**); supersession flags sit on CB-30/CB-40–43/CB-72 plus the extraction's separate archive-supersession list.

Per-decision rows are in **[`CONTENT_BIBLE_DECISION_MATRIX_v0.1.md`](CONTENT_BIBLE_DECISION_MATRIX_v0.1.md)** (one row per CB-01…CB-92, every ID represented). Blocking evidence gaps are in **[`CONTENT_BIBLE_SOURCE_GAPS_v0.1.md`](CONTENT_BIBLE_SOURCE_GAPS_v0.1.md)**.

*End of Ratification Pack v0.1. This document authorizes no code, lesson, ADR, or canon change. Draft `CONTENT_BIBLE_v1.0.md` only after the founder answers Q1–Q12.*
