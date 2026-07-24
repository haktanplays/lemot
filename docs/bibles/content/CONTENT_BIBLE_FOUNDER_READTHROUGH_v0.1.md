# Cairn Content Bible v1.0 — Founder Read-Through Pack v0.1

> The smallest review surface for final human sign-off. It compresses `CONTENT_BIBLE_v1.0.md` into **12 review cards** so you can approve, annotate, or correct **without** rereading the sources or re-running ratification. Every card maps to actual draft text (chapter + CB IDs). **This pack adds no canon, reopens no ratified decision, and does not change status.** The Bible stays **Draft — awaiting founder sign-off**.
>
> **Branch:** `docs/content-bible-v1-draft` · **Reviewed HEAD:** `dab2d38` · **Bible:** `CONTENT_BIBLE_v1.0.md` (post P1–P3 corrections) · **Companions:** Ratification Pack §0 (authoritative), Decision Matrix, Source Gaps, Founder Sign-Off Review.

---

## 1. How to use this review

- Read the **Executive snapshot** (§2), then the **12 cards** (§3). Each card is self-contained — you never need to open the full document to understand it.
- For each card, the **Founder attention point** is the *one* thing worth consciously verifying. It is a **verification prompt, not a new decision** — nothing here re-opens a ratified question.
- Record a verdict per card using the template in §7. Recommended verdicts are pre-filled as a starting point; override any of them.
- The registers in §4–§6 tell you which open items **do not** block making the Bible Canonical, which **do** block Stage-C (invited-learner) exposure, and which are **deferred product systems**. Do not treat all open items as promotion blockers.
- When done, use the **Promotion checklist** (§8). Promotion is a separate authorized step (edit status + changelog + PR) — this pack does not perform it.

---

## 2. Executive snapshot

- The Content Bible folds the 2026-07-24 founder decisions (Q1–Q12) across **20 chapters + 3 appendices**, with every rule provenance-tagged (`[FL]` founder-locked · `[ADR-n]` · `[DC]` design canon · `[DR]` derived-and-ratified · `[TUNABLE]` · `[OPEN]` · `[DEFERRED]`).
- It has already passed source inventory, authority classification, founder ratification, a critical-chapter sign-off review (verdict **READY WITH TARGETED CORRECTIONS**), and the three targeted corrections **P1–P3** (active-new invariant tag; complete six-role enumeration; metropolitan-French `[DR]` tag).
- **Nothing material remains contested.** The sign-off review found 0 BLOCKER, 0 MAJOR; all findings are now applied. No genuinely new founder decision is outstanding.
- The only judgment calls left are **human verification** (does the wording match intent?) and **acknowledging what stays open/deferred** — not fresh ratification.
- **Recommended overall:** *Apply nothing further; promote to Canonical after a card-by-card read* — unless a card surfaces a wording change you want. Open/deferred items remain open/deferred; they are not promotion blockers.

---

## 3. Review cards

### Card 1 — Authority, ownership, and document structure
**What the Bible now says**
- Four owners, split not flattened: **Content** = authoring/copy/presentation; **Engineering** = enforcement/algorithms/schema/runtime; **Brand** = tone/naming/artwork; **Curriculum** = sequence/placement. Product Brain wins on product questions; gaps are surfaced, not silently resolved.
- Every rule is **authoring policy, not runtime enforcement** — where a rule pairs with a CI/runtime enforcer, the enforcer routes to Engineering with a cross-reference.
- Document titles, note boundaries, and chapter names carry **no authority on their own**; notes may be renamed/merged/split/consolidated/routed — **provided** provenance, supersession history, and any authoring consequence survive the move.
- A rename/merge is **not a new authority event** (Appendix B/C preserve the old→new map).

**Why it matters** Stops the Content Bible from absorbing or duplicating another Bible's canon, and lets the IA evolve without losing decision history. Authors/agents always know which Bible owns a given rule.
**Founder attention point** Does the four-owner split reflect the intended boundary — especially Content-vs-Curriculum (sequence/placement) and Content-vs-Engineering (enforcement)?
**Recommended response** APPROVE
**Refs** Ch. 1 (1.1–1.4), Ch. 2 (2.1–2.3); Appendix B/C · CB-08/89/87/62 (routes) · Q1, PB-018.

### Card 2 — Chip and role model
**What the Bible now says**
- A **chip** is a reusable, owned production block defined by behavior — learned whole then unpacked; **never a memorized sentence**. No full-sentence/multi-clause primary UI chips (a sentence may be a model answer only).
- Legal multi-word reusable classes: **formula chunk · noun package · pattern chip · unpackable chunk**. **Bare atoms** (`je, pas, ce, …`) are **Caveat** — legitimate accounting/contrast atoms, never blanket-banned, never auto-promoted to prominent chips.
- `PROTECTED_CHUNKS` frozen at exactly two; `SURVIVAL_FORMULAS` a separate **closed, Haktan-gated** class; additions are canon events.
- **Six item roles, not interchangeable:** active · supported · recognition-only · recycled (query-time, not stored mastery) · **blocked-production** (bounded context, never requested as production) · **ghost/exposure** (contact only — no ownership/production-evidence/mastery-credit/weakness-evidence).

**Why it matters** The role set is the guardrail against the classic failures: memorizing sentences, over-forbidding atoms, or collapsing "seen" into "owned." AI authors especially need the six roles kept distinct.
**Founder attention point** Are the six roles distinguishable enough that an author/agent won't collapse blocked-production or ghost/exposure into recognition-only? (This was correction P2.)
**Recommended response** APPROVE
**Refs** Ch. 4 (4.1–4.10) · CB-01/02/03/04/05/06/07/08/09/47/48 · ADR-0004/0005 · Q3/Q2.

### Card 3 — Payload economy and budgets
**What the Bible now says**
- **active-new 1–4 (integrations 0) is a founder-ratified authoring invariant — not a freely tunable number** (correction P1). The coarse legacy **8–15** is superseded for learner-facing active production and must not be used.
- Every item is placed in exactly one layer (engine / payload / ghost-exposure / practice pool). Supported **+2–3** and ghost **+2–3** are **tunable defaults** (as are screen/timing/recycled/exposure figures) unless locked elsewhere; **Ch. 19 is the single home for parameter classification.**
- **beats/cards ≠ rendered screens** — two different counting layers, explicitly **not equal**; authors must never write "beats = screens."
- Production-load accounting + archetype contracts + anti-gaming rules are **derived, founder-ratified authoring policy — with no runtime-enforcement or existing-lesson-compliance claim** (retrospective audit pending). "Recycle cannot steal the lesson."

**Why it matters** Active-new is the most load-bearing number; mis-tagging it would let lessons overload learners. The `beats≠screens` rule and the NON-CLAIM prevent double-counting and false "already enforced/compliant" assumptions.
**Founder attention point** Is active-new **1–4** the correct hard ceiling (vs PAYLOAD's "1–3"), and is it strict enough as an invariant? (Ratified as 1–4 under Q4c; verify the intent holds.)
**Recommended response** APPROVE
**Refs** Ch. 5 (5.1–5.3), Ch. 6.4/6.8, Ch. 19 · CB-13/14/15/16/17/18/22 · Q4.

### Card 4 — Lesson structure and action
**What the Bible now says**
- A lesson begins from a **sentence family** (anchor + variations + contrast + rescue/natural + interchangeable pieces) — never a single sentence or word list.
- **Whole-first, unpack-later:** the meet-card presents the sentence whole; the learner decomposes by touching **atomic** chips; no grammar dump before contact.
- Seven **frozen** screen types; richness lives in payload, never new screen types. **Every screen demands ≥1 action** — no passive filler; **discovery (no wrong/score) vs assessment** is a clean split (assessment begins after Build).
- Recap = **ownership consolidation** (+ SRS note + bridge), `piecesUsed` stays atomic; **no celebration/streak**.

**Why it matters** Keeps lessons active, calm, and composable rather than rote — the core "feels like Cairn" behavior authors must reproduce.
**Founder attention point** Is "every screen acts; discovery ≠ assessment" the intended experience floor for every lesson?
**Recommended response** APPROVE
**Refs** Ch. 6 (6.1–6.8), Ch. 7 · CB-10/11/12/20/21/72 · ADR-0005.

### Card 5 — Weave and free production
**What the Bible now says**
- **Weave** (mixed FR/EN; known→French, unknown stays English) is the **primary production mechanic**; it pushes toward the unknown and never forces a full translation.
- **Open mixed Weaves are ungraded** — the learner answers, a **Natural Reveal** runs, and **comparison is the feedback** (model-answer-only, never exact-match). Grading an open Weave is a validator ERROR.
- **Say It Your Way** is free production toward a goal: input → confirm → reveal; never grades; **"praise without target detection is an ERROR."**
- Post-output: **at most one small nudge** toward the smallest useful upgrade; no default native rewrite; revision required after a nudge. Hint ladder is **material, not answer**.

**Why it matters** Protects the app's differentiator (produce, don't recognize) while keeping free production low-pressure and honest (no fabricated success).
**Founder attention point** Is the "open Weave = compare, never grade" boundary strict enough, and is "one nudge" the right ceiling?
**Recommended response** APPROVE
**Refs** Ch. 8 (8.1–8.7), Ch. 9 (9.1–9.4), Ch. 10 · CB-30/31/32/33/34/35/36/55/56/57/63 · ADR-0003.

### Card 6 — Reading
**What the Bible now says**
- **Every Reading ends in an appropriate learner action, but not necessarily production.**
- Early (L0–L3): normally a **bounded non-production action** (recognition, noticing, selection, extraction, contrast, prediction, social-function match, small supported reuse).
- Later: freer reuse/production **only** when the language is active/supported, prerequisite-safe, load-appropriate, and serves the goal.
- Reading must **never** become passive page-turning, sentence-by-sentence translation testing, a default "what does this mean?", school-style comprehension, or quota output. The old **"every Reading ends in production" is superseded (historical only)**. Exercise-family taxonomy + validator remain `[OPEN]` (deferred to Engineering).

**Why it matters** This is the decision that keeps early Reading from overloading learners while preserving production-first overall. Authors get a clear menu of valid early actions.
**Founder attention point** Does the ratified rule (Q7) still read exactly as intended — action required, production conditional, no translation quiz?
**Recommended response** APPROVE
**Refs** Ch. 11 (11.1–11.6) · CB-50 (+ CB-46/20/11) · Q7 · Source-Gaps G1 (taxonomy open).

### Card 7 — Feedback, errors, and learner evidence
**What the Bible now says**
- **Passive-mirror** tone: explains, never punishes (success soft, failure neutral, boundary never a failure). **Banned canon-wide:** streak/XP/level-up/achievement/theatrical positivity.
- Learner feedback consumes a **`FeedbackVerdict`, never a raw error code**; banned outputs ("Wrong!/Fail!/…") listed.
- **Near-miss precision** (punctuation/accent/spelling) is a **soft signal, never a failure**; never lowers a box/prompt-fade.
- **Error source is classified before weakness:** content/validator/UI/tone/AI/mastery-mapping faults are **not** learner weakness; **ghost/exposure production failure is not weakness.**

**Why it matters** Protects evidence integrity (only real learner errors create weakness) and the calm, non-punitive voice — both are identity-level, not cosmetic.
**Founder attention point** Is "a content/validator/AI error, or a ghost failure, is never learner weakness" airtight enough to protect the mastery signal?
**Recommended response** APPROVE
**Refs** Ch. 14 (14.1–14.6), §8.3, §9.1, §10 · CB-59/61/62/63/64/65/66 · ADR-0001/0002/0021 · Q2.

### Card 8 — French naturalness, gender, and prerequisite safety
**What the Bible now says**
- Authored French reads as a native would say it (natural, not literal), with the rescue tail. **Default variety: contemporary metropolitan French — a derived design direction, founder-ratified 2026-07-24** (correction P3), refinable by the future style guide; regional use must be declared.
- **Three properties kept separate:** naturalness, grammatical correctness, and **prerequisite safety — which overrides correctness.** A beginner is never asked to produce an unseen form; it appears only as supported/recognition/chunk.
- **Gender:** no full agreement system early; introduce only the distinction the goal needs; a small `-e` note when useful; **no paradigms/tables; default follows the actual sentence/speaker/character/context — NOT an unconditional masculine-first rule.**
- Survival wording locked (`vous pouvez répéter ?` never inverted; `je ne comprends pas`); inversion recognition-only band-wide.

**Why it matters** Prevents grammatically-correct-but-pedagogically-unsafe French, and encodes the founder's explicit rejection of a masculine-first default. Exact French strings are preserved.
**Founder attention point** Is the "no universal masculine-first; context-driven gender" wording exactly your intent (Q11), and is prerequisite-safety-overrides-correctness stated strongly enough?
**Recommended response** APPROVE
**Refs** Ch. 15 (15.1–15.4) · CB-68/69/70 · Q10 (variety), Q11 (gender).

### Card 9 — French QA and shipping gate
**What the Bible now says**
- Every finding tagged **BLOCKER / MAJOR / MINOR / POLISH / PREFERENCE**; **stage-aware gate** A (authoring) · B (founder/operator smoke) · C (invited-learner: **0 unresolved BLOCKER/MAJOR**) · D (public).
- A **named qualified human reviewer + recorded verdict** are required; **AI may assist but may not self-certify `FrenchQAStatus: PASS`.** QA reviews sentences, model answers, distractors, hints, TTS, translations, register, chip segmentation.
- The gate + reviewer must be in place **before Stage C** — but **must not block** internal authoring, drafting, schema work, or **founder-only testing** before Stage C.
- A **complete French style guide does not yet exist and must be authored**; `L1-L5 Proofreading.md` is **one input, not the guide**; unresolved style is marked open, not invented.

**Why it matters** Sets the real shipping-quality gate for invited-learner exposure without freezing internal iteration. Prevents AI from rubber-stamping French quality.
**Founder attention point** Is "human reviewer + no AI self-certify before Stage C, but internal/founder testing stays unblocked" the correct gate — and do you accept the style-guide + reviewer as commitments to fulfill before Stage C?
**Recommended response** APPROVE
**Refs** Ch. 18 (18.1–18.5) · CB-71/90/91/92 · Q10 · Source-Gaps G2/G3.

### Card 10 — Deferred systems
**What the Bible now says**
- **Instruction Weave** (app voice turning French across tiers) is a **deferred Phase-D system**; **all current lessons stay English-guided**; the fixed-L40 monolingual switch is **superseded**; current authoring must not depend on an unbuilt monolingual-transition system.
- **Audio:** human recordings are the **direction** (replace TTS), **shadowing (ungraded) first**, graded pronunciation later; **TTS + placeholder-hygiene is the current shipping reality**; the listening-comprehension contract is deferred. Authors may mark shadowing beats in `designNotes` (no schema change).

**Why it matters** Keeps authoring anchored to what exists (English-guided, TTS) while recording the future direction, so no lesson takes a dependency on an unbuilt system.
**Founder attention point** Is deferring Instruction Weave and human-audio (with English-guided + TTS as today's reality) still correct — nothing to pull forward now?
**Recommended response** DEFER AS WRITTEN
**Refs** Ch. 12.2, Ch. 13.3, §20.3/20.4 · CB-40–44/51/52/53 · Q8.

### Card 11 — Open parameters
**What the Bible now says**
- **Ch. 19** is the single home for all numbers, each labeled by function/enforcement and explicitly **not scientifically calibrated**; tuning a number is **not** a canon change.
- **Genuinely open (routed to owners):** item-counting methodology (Curriculum/Content-ops, CB-22); Mon Lexique final learner-facing band copy (Content + style guide, CB-80); Summit narration recalibration (Brand, CB-84); Build/Stretch/Challenge runtime (Engineering, CB-75).
- Founder-locked exceptions among the numbers: **active-new 1–4**, **W2 look-ahead ~3–4 (max 5–6)**, **max nudges 1** are authoring rules, not free tunables.

**Why it matters** Lets thresholds evolve on smoke evidence without re-opening principles, while protecting the few numbers that are invariants.
**Founder attention point** Is it intentional that these parameters stay **open/tunable** now (rather than being fixed at sign-off)?
**Recommended response** LEAVE OPEN
**Refs** Ch. 19, §20.2 · CB-13/16/22/26/38/75/80/84 · Q4d.

### Card 12 — Operations and maintenance
**What the Bible now says**
- **Batch = a Unit slice** (default 3, up to ~6 lessons), never the whole syllabus; **one batch = one content-only PR = one founder pedagogical review**; drafts pass the validator gate before review; batches are sequential.
- Every lesson spec carries the **required authoring ledger**; every batch runs the **content-safety checklist + anti-gaming rules** (unregistered items can't hide as "decorative"; exposed items can't be counted "already learned"; "doorway" can't bypass integration rhythm; AI can't self-assign a QA pass) — **derived, founder-ratified; not a runtime-enforcement claim; no current lesson claimed compliant.**
- **Ratified ≠ immutable:** rules change only through an explicit canon/ADR change; provenance and supersession are preserved.

**Why it matters** Defines how content is produced and reviewed at scale, and how the Bible itself evolves safely after sign-off.
**Founder attention point** Is the batch/one-PR-one-review cadence and the "no lesson yet claimed compliant; retro-audit pending" honesty the right operating posture?
**Recommended response** APPROVE
**Refs** Ch. 18.1/18.2, Ch. 1.4, Ch. 20 · CB-90/91/92 · Q2.

---

## 4. Open-but-non-blocking register (does NOT block making the Bible Canonical)

These are ratified-as-open with clear owners; the Bible can be Canonical while they remain open.

- **Item-counting methodology** — how a frame + variations counts toward budgets → Curriculum/Content-ops (CB-22, Ch. 19).
- **Reading exercise-family taxonomy + validator** → Content/Engineering (Ch. 11.6, Source-Gaps G1).
- **Complete French style guide** (register boundaries, spoken-vs-written, sentence-length by band, inclusive treatment, punctuation) → to be authored (Ch. 18.4, G2).
- **Mon Lexique final learner-facing band copy** → Content + style guide (CB-80, Ch. 17.4).
- **Summit narration recalibration** → Brand (CB-84).
- **Build/Stretch/Challenge runtime** and other **runtime validator coverage** → Engineering (CB-75; explicit NON-CLAIMs in §6.8/§18.2).

## 5. Stage-C prerequisites (block INVITED-LEARNER exposure, not canon promotion)

Required before Stage C (invited-learner), per Ch. 18.3/18.5 — they do **not** block internal authoring, drafting, schema work, or founder-only testing:

- an **executable French-QA process** (severity + stage gate operating), and
- a **named qualified human reviewer** with a recorded verdict (AI cannot self-certify PASS), and
- **sufficient style guidance** to review invited-learner French safely (enough of the style guide to review against, beyond the metropolitan default).

## 6. Deferred product systems (ratified-as-deferred; not promotion blockers)

- **Instruction Weave** / monolingual progression → Phase D; english-guided until a plan is locked (Ch. 13.3; fixed-L40 superseded).
- **Human-recorded audio pipeline** + listening-comprehension contract; **graded pronunciation** (Ch. 12.2; shadowing-first is the near-term direction).
- **Any unbuilt runtime enforcement** of the derived authoring policies (production-load accounting, ledger, content-safety checklist) — explicitly labeled NON-CLAIM; a retrospective lesson audit is pending.

---

## 7. Suggested founder response template

*(12 cards → 12 response lines. Recommended verdicts pre-filled; override freely. "APPROVE WITH NOTE" and "CORRECTION REQUIRED" take free text.)*

```
Card 1  (Authority & ownership) ................. APPROVE
Card 2  (Chip & role model) ..................... APPROVE
Card 3  (Payload economy & budgets) ............. APPROVE
Card 4  (Lesson structure & action) ............. APPROVE
Card 5  (Weave & free production) ................ APPROVE
Card 6  (Reading) ............................... APPROVE
Card 7  (Feedback, errors & evidence) ........... APPROVE
Card 8  (French naturalness, gender, prereq) .... APPROVE
Card 9  (French QA & shipping gate) ............. APPROVE
Card 10 (Deferred systems) ...................... DEFER AS WRITTEN
Card 11 (Open parameters) ....................... LEAVE OPEN
Card 12 (Operations & maintenance) .............. APPROVE

Overall:
[ ] Promote to Canonical
[ ] Apply listed corrections, then promote
[ ] Keep Draft
```

Verdict options per card: `APPROVE` · `APPROVE WITH NOTE: …` · `CORRECTION REQUIRED: …` · `LEAVE OPEN` · `DEFER AS WRITTEN`.

---

## 8. Promotion checklist

Promotion of `CONTENT_BIBLE_v1.0.md` to **Canonical** requires **all** of:

- [ ] Founder approval of **all material cards** (§3).
- [ ] Any **CORRECTION REQUIRED** items applied in a separate authorized edit pass.
- [ ] **No unresolved contradiction** with the Ratification Pack §0 (authoritative).
- [ ] **Draft status changed explicitly** (frontmatter `status:` + closing line) — a deliberate act, not incidental.
- [ ] **Change log updated** (record the promotion + which cards/corrections it reflects).
- [ ] **PR review completed** (the promotion lands via a reviewed change, not a silent edit).
- [ ] **Open and deferred items retained as open/deferred** — never falsely closed to make promotion look complete (§4–§6).

And note explicitly:

- **Canonical does not mean immutable.** Later changes require a **traceable canon or ADR update**, preserving provenance and supersession history (Ch. 1.4, Ch. 2.3).
- **Open tunable parameters may evolve** without reopening foundational principles, **provided the authority rules are respected** (Ch. 19; a number moves on evidence, a principle moves only by canon/ADR).
- Promotion is a **separate, explicitly authorized step**; this read-through pack does not perform it and changes no status.

---

*End of Founder Read-Through Pack v0.1. Read-only aid for sign-off. No canon added, no ratified decision reopened, no status changed; the Content Bible remains **Draft — awaiting founder sign-off**. Open, Stage-C-blocking, and deferred items are separated and none is mislabeled a promotion blocker.*
