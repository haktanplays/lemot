---
title: Cairn Content Bible
version: 1.0-draft
status: Draft — awaiting founder sign-off
owner: Founder
product: Cairn
first_product: Cairn French
last_updated: 2026-07-24
governs: lesson & chip authoring, content presentation, feedback/reveal copy, French naturalness, content QA
sits_below: CAIRN_PRODUCT_BRAIN_v1.0.md
siblings: [Curriculum Bible, Engineering Bible, Brand Bible]
---

# Cairn Content Bible v1.0 (Draft)

> This is the durable **authoring** canon for Cairn content. It says **how** content is written, presented, revealed, and quality-checked. It does **not** own the product thesis (Product Brain), the learning sequence (Curriculum Bible), the implementation (Engineering Bible), or naming/visual/tone identity (Brand Bible).
>
> **Provenance tags** (every rule carries one): `[FL]` founder-locked source · `[ADR-n]` accepted ADR · `[DC]` current closed design canon · `[DR]` derived policy, **founder-ratified 2026-07-24** · `[BUILDSPEC]` founder-reported build intent · `[PB-n]` Product-Brain canon (cited, not re-owned) · `[TUNABLE]` a number, not a principle · `[OPEN]` unresolved · `[DEFERRED]` future system. CB-IDs cross-reference the [Decision Matrix](CONTENT_BIBLE_DECISION_MATRIX_v0.1.md).
>
> **Ratification note:** this draft folds the founder decisions Q1–Q12 recorded in [Ratification Pack §0](CONTENT_BIBLE_RATIFICATION_PACK_v0.1.md). A rename/merge of a legacy note into this Bible is **not** a new authority event; provenance and supersession history are preserved in Appendix C.

---

## 1. Purpose and authority

**1.1 What this Bible governs.** `[DR]` Lesson and chip authoring constraints; how each content surface displays, reveals, and reduces native-language support; prompt- and instruction-language patterns; Weave / Natural Reveal / Say It / Reading / Listening presentation; feedback and reveal copy rules; French naturalness and linguistic safety; per-lesson-type chip budgets; content QA and review gates.

**1.2 Precedence.** `[PB-018]` The Product Brain governs product questions; where a rule here conflicts with a Product-Brain principle, the Product Brain wins and the gap is surfaced, not silently resolved. Curriculum/Engineering/Brand Bibles own their domains (Ch. 2).

**1.3 Status of numbers.** `[DR][TUNABLE]` (Q4) Every numeric budget in this Bible is a **tunable authoring default** unless its source explicitly labels it a hard invariant. All numbers live in Ch. 19 and are tagged by function and confidence. Numbers are **not** scientifically calibrated; they move on smoke evidence without a canon change.

**1.4 Ratified ≠ immutable.** `[DR]` (Q3) A ratified rule is stable authoring vocabulary, not permanently frozen; it changes only through an explicit canon or ADR change.

---

## 2. Content ownership boundaries

**2.1 The layer-separation rule.** `[DR]` (Q1) A rule that spans layers is **split**, never flattened:
- **Content** owns authoring, copy, and presentation.
- **Engineering** owns enforcement, algorithms, schema, and runtime.
- **Brand** owns tone, naming, and artwork.
- **Curriculum** owns sequence and placement.

*Worked example:* open mixed Weave — **Content:** author it ungraded; **Engineering:** the validator rejects any grading config on it; **Brand:** the neutral-compare feedback copy. (CB-32)

**2.2 Facet-routing (Content keeps the authoring consequence).** `[DR]` (Q1) When enforcement/sequence/tone/artwork routes to another Bible, the Content-side authoring rule stays here with a cross-reference. Primary owner elsewhere: hub `deriveDrill`/selector → Engineering (CB-89); paywall position/price → Product Brain (CB-87); runtime status enum / screen-type schema / tag→verdict bridge → Engineering (CB-08/12/62); lesson sequence / archetype-to-lesson / verb order / retrieval reach / L0 & ~L10 placement → Curriculum; the name "Weave"/badge, exact tone strings, mountain artwork → Brand.

**2.3 Notes and titles are not canon by themselves.** `[DR]` (Q1) Document titles, note boundaries, and chapter names carry no authority on their own. Notes may be renamed, merged, split, consolidated, or routed to improve clarity — **provided**: source traceability stays intact; superseded decisions remain discoverable; authority and decision history are preserved; any Content-side authoring consequence survives a move; and consolidation never silently changes a decision's status. A rename/merge is not a new authority event.

---

## 3. Learner-facing content principles

**3.1 Production is the point; recognition serves it.** `[FL]` (CB-46) Content teaches learners to build, repair, reuse, and carry French pieces — not merely recognize them. Choice-/recognition-/blank-only tasks are low-evidence unless they lead to output. **Exception:** Reading (Ch. 11) may end in a bounded action rather than production.

**3.2 Not a translation / flashcard / grammar-drill app.** `[FL]` (CB-34/50) Content never becomes translation testing, a flashcard queue, or grammar-table drilling.

**3.3 Native-language support is scaffolding, not the destination.** `[PB-079]` Content reduces dependence on English as comprehension grows; English remains available on demand and is never framed as failure. Per-surface fade behavior is Content-owned (Ch. 13, CB-44).

**3.4 Calm, non-gamified voice.** `[ADR-0001][ADR-0002]` (CB-59/67) Banned canon-wide in all copy (static and generated): `streak`, `XP`, `level up`, `achievement`, `amazing`, `perfect score`, `goal complete`, "come back tomorrow", and theatrical positivity. Tone is passive-mirror ("sit beside the learner, do not push"). "streak" → "days on the path". *(Non-goal is Product-Brain PB-053/076; exact tone strings are Brand.)*

---

## 4. Chip and item model

**4.1 Chip definition.** `[DC]` (CB-01) A chip is a reusable, owned production piece — defined by behavior — learned whole then unpacked. Never a memorized sentence.

**4.2 Behavioral taxonomy + verdict.** `[DR]` (Q3, CB-02) ~12 behaviorally-defined chip types; each candidate gets exactly one verdict: **Allowed** (may be a primary UI chip), **Caveat** (accounting/pattern/contrast/unpack/exposure atom only), or **Forbidden as a primary UI chip** (sentence/clause = model-answer only).

**4.3 Composition classes.** `[DC]` (CB-04) Legal multi-word chips: formula chunk (one reusable social/discourse function), noun package (retrieved as one object; gender enters as a package, not a rule), pattern chip (slot frame, e.g. `ne ___ pas`), unpackable chunk (learned whole, unpacked later).

**4.4 No full-sentence chips.** `[ADR-0004]` (CB-03) No full-sentence or multi-clause chips as primary UI chips; a sentence may be a model answer, never a UI pill. *(CI-lint enforcement = Engineering.)*

**4.5 Bare atoms are Caveat.** `[DR]` (Q3, CB-05) `je, pas, ce, pour, avec, là, ici` are legitimate accounting/contrast/unpack atoms; they must not auto-promote to prominent UI chips and must not be blanket-banned.

**4.6 Frozen exception classes.** `[FL]` (CB-06) `PROTECTED_CHUNKS` is frozen at exactly `je ne suis pas`, `ce n'est pas`. `SURVIVAL_FORMULAS` is a separate **closed** class (founding members `je ne comprends pas`, `vous pouvez répéter ?`) that may be chips despite sentence shape. Additions to either are **Haktan-approval canon events**. *(Preserve exact French strings.)*

**4.7 Item roles.** `[DC]` (CB-08) Every item carries an in-lesson role: **active** (produce from intent) · **supported** (produce with scaffolding) · **recognition-only** (recognize, never a production target) · **recycled** (query-time carry-in role, not stored mastery). Integrity invariants `[DR]` (Q2): ghost/exposure never counts as owned production; an introduced item cannot be re-hidden as `activeNew`. *(The five-state planning ladder — recognition/supported/active/transformed/expected — is Curriculum/Engineering planning vocabulary, not the runtime enum.)*

**4.8 `piecesUsed`.** `[DC]` (CB-09) The recap "pieces you used" list contains atomic, actively-produced pieces only (or approved formula/package chunks) — never full sentences, never ghost/exposure. `mainPieces` is a separate structured field.

**4.9 `oui`.** `[FL]` (CB-07) A producible answer word; never slotted inside a question or statement.

**4.10 Future/ghost surfaces.** `[DC]` (CB-47/48) A lesson teaches only its owned/supported chips; any extra French appears only inside Weave-family context. A future/ghost surface is **never** a correct answer, is **never** penalized when wrong, and the learner is **never** asked to produce it. Protocol: an active chip is *introduced* (meet → insight → weave → check); future/ghost is *held in context* (not explained, not quizzed); recycled is *greeted*, not re-taught. *(V3/V4 lint = Engineering.)*

---

## 5. Lesson payload economy

**5.1 Four layers.** `[FL]` (CB-15) Every candidate item is placed in exactly one layer before it goes anywhere: **engine** (mastery spine; new engines are rare gated doorways) · **payload/cargo** (cheap supported pieces an existing engine carries) · **ghost/exposure** (seen/heard, never required for correctness) · **practice pool** (where breadth lives). If it cannot be placed in exactly one layer, it is not ready.

**5.2 Surface ceiling (per teaching lesson).** `[FL][TUNABLE]` (CB-15) active-new **1–4** (integrations 0) — Ch. 19; supported +2–3; ghost +2–3; every supported item appears ≥2× (meet + one use); ghost lives only in meet/insight copy and never enters `piecesUsed`. Anything beyond the ceiling goes to the Practice Pool or backlog — **never** to widen the lesson.

**5.3 "Recycle cannot steal the lesson."** `[DC][TUNABLE]` (CB-16) Per-sentence caps keep the target dominant (Ch. 19). Breadth is Hub work (Ch. 16).

---

## 6. Lesson authoring structure

**6.1 Sentence-family input.** `[DC]` (CB-10) A lesson begins with a small sentence family — anchor + variations (one slot changed) + a contrast near-neighbor + a rescue/natural sentence (including the polite tail, e.g. `…s'il vous plaît`) + an explicit inventory of interchangeable pieces — never a single sentence or a word list.

**6.2 Whole-first, unpack-later.** `[ADR-0005]` (CB-11) The meet-card presents the canonical sentence **whole**; the learner decomposes it by touching atomic chips (touch = highlight + audio). Highlights must be atomic — never a sentence/clause span. "Continue" is an invite, not a lock. No grammar dump before contact; explanation attaches to something just seen, typed, or compared.

**6.3 Seven frozen screen types.** `[DC]` (CB-12/72) `meet-card, insight-card, fill-with-traps, weave, say-it-your-way, natural-reveal, recap`. Richness is added in payload, never by inventing screen types. The legacy 11-section flow (Combine and Weave / Mini Conversation / French Fill / Build / Write / Read and Listen) is **superseded** (§20.4). *(Schema = Engineering.)*

**6.4 Two counting layers — beats vs screens (defined; NOT equal).** `[DR]` (Q4d, CB-13/14)
- A **beat / card** is one pedagogical step (the lesson spine is **8–12 beats**, each beat once).
- A **rendered screen / state** is one thing the learner actually sees (**11–14 rendered screens** per lesson).
- **These are different counting layers and are not equal:** one beat may require more than one rendered screen or state (e.g. the opening Learn Page beat spans several cards). **Authors and validators must never treat "beats" and "screens" interchangeably, and must never write "beats = screens."** Both budgets are `[TUNABLE]` (Ch. 19).

**6.5 Lesson spine.** `[FL]` (CB-14) 8–12 beats: 1 opening Learn Page block · 1–2 meet/input · 1–2 logic (insight-with-action) · 1 guided try · 1–2 productions (one may be an open mixed Weave, ungraded) · 1 Natural Reveal · 1 recap. Caps: ≤2 heavy/stateful, ≤1 board, ≤2 inline insights.

**6.6 Every screen acts; discovery vs assessment.** `[DC]` (CB-20) Every screen demands ≥1 action (touch/select/build/produce) — no passive screen. Meet + Notice are **discovery** (no wrong, no score); assessment begins after Build.

**6.7 Recap.** `[DC]` (CB-21) Ownership consolidation ("place your own stone" / "Pieces you used") + a one-line SRS note + a one-line bridge to the next scene. No celebration/streak. `piecesUsed` stays atomic (§4.8).

**6.8 Archetype contracts & load formula.** `[DR]` (Q2, CB-17/18) Every lesson names a primary archetype (+≤1 secondary); ~70% template / 20% archetype-weighted / 10% bespoke (bespoke needs justification). Per-archetype activeNew budgets (Doorway 1–2, Standard 1–4, Integration 0, Review 0, Milestone 0–3). `totalProductionLoad = activeNew + supportedTarget + productionCarryover + repairItem + integrationTarget`; a lesson cannot dodge the activeNew cap by hiding old load in other buckets. *Labeled derived, founder-ratified; not a runtime-enforcement claim.*

---

## 7. Insight and micro-logic

**7.1 Insight formula.** `[DC]` (CB-23) One idea + one example + must end in a small action. No grammar paragraph; no open-ended "why?" without an action; approved facts only (runtime AI cannot invent them).

**7.2 Home of faux-ami & grammar-nugget authoring.** `[DC][PB-041]` (CB-24) Insight cards are typed (`sound-writing | grammar-nugget | micro-contrast | culture-bite | faux-ami | cognate | lesson-goal`). Faux-ami/cognate authoring uses a "Not this / But this" frame; grammar nuggets teach effect/feeling, not a rule; culture bites are used sparingly; per-band cognate-bridge lists (e.g. `merci ≈ mercy`). French-specific explanations win — do not port another language's syllabus.

**7.3 Three levels + placement.** `[DC]` (CB-25) Level 1 coach voice (embedded, doesn't count as a screen) · Level 2 tap-to-open micro-insight (doesn't count) · Level 3 insight-card (own screen, counts). Level-3 placement is by understanding — opener / rescuer / sealer — never by calendar. Insight-card-as-filler is forbidden.

**7.4 Insight budget.** `[DC][TUNABLE]` (CB-26) **Target 2, ceiling 3** Level-3 insight-cards per lesson (V5 lint warns above 3). *(Resolved editorially by authority: closed design canon + V5 supersede the archived "1 per chunk or 2".)*

**7.5 No conjugation tables as drills.** `[DC]` (CB-29) Paradigm/conjugation tables are banned as drills; a Pattern Snapshot may appear **once** as an exposure-only map (read once, never produced, quizzed, or chipped). Insight may go "one notch deeper on why" for the nerdy-hobbyist learner — still no tables/dumps.

---

## 8. Weave

**8.1 Primary production mechanic.** `[ADR-0003]` (CB-30) Weave (mixed FR/EN; known → French, unknown stays English) is the core production mechanic. *(The name "Weave" is Brand; ex-"Franglais", superseded.)*

**8.2 True form.** `[FL]` (CB-31) Weave pushes toward the unknown — leave unknown parts in English (`je voudrais but pas today`). The app chooses the **smallest useful upgrade**, never forces a full translation. Every teaching lesson (from the next batch on) carries ≥1 true open mixed Weave alongside pure-French supported weaves.

**8.3 W1 — open mixed Weaves are ungraded.** `[FL]` (CB-32) No right/wrong grading: the learner answers, a Natural Reveal runs, comparison is the feedback (model-answer-only / passive mirror; never exact-match). Grading an open mixed Weave is a validator ERROR. *(Grading suppression = Engineering.)*

**8.4 weaveType scaffolding.** `[DC]` (CB-33) `supported → mid → context → open` (open = free mixed, ungraded).

**8.5 Prompt authoring.** `[BUILDSPEC][DC]` (CB-34) Prompts are directive/intention-based ("Say you are heading home"), not "translate this"; direct translation is allowed but must not dominate; English gaps are never punished; not sentence memorization.

**8.6 Copy / UI package.** `[BUILDSPEC]` (CB-35) Helper: "Use the French pieces you know. Leave the rest in English for now. Then compare with the model." Target label `Say this:` (suppressed on open Weaves); input label `Your try`; neutral result copy "Correct." / "Accepted." / "Compare with the model answer." (never red). *(Exact strings + the "Weave" badge = Brand.)*

**8.7 Hint ladder.** `[DC]` (CB-36) Material, not answer: rung 0 silent ("Need a hint?") → rung 1 reverse-ordered pieces (never copy-ready) → rung 2 cloze → reactive rung 3 answer + "write it once" (low-weight evidence). "Rebuild-the-thought, not copy." No infinite loop; "skip" at every step. *(Runtime ladder = Engineering.)*

---

## 9. Say It Your Way, Speaking and Writing

**9.1 Say It Your Way.** `[DC][FL]` (CB-55) Free production toward a communicative goal; flow is input → confirm → reveal; never grades, never blocks beyond empty; model-answer-only. **Praise without target detection is an ERROR** — never fabricate praise.

**9.2 Confirm step.** `[DC]` (CB-56) "You wrote: … — revise or keep?" — the lowest-intervention self-revision, so an early model never ignores the learner.

**9.3 Answer bands describe, not score.** `[DC]` (CB-57) `minimalAcceptable / good / natural` are descriptive reveal bands, never a numeric score.

**9.4 Chip-less easy Say It.** `[FL]` (CB-58, C2) Occasional chip-less open Say It from ~L10 onward, deliberately **easy**, so the "I did it without help" feeling lands without frustration. *(~L10 placement = Curriculum.)*

---

## 10. Natural Reveal

**10.1 What it is.** `[DC]` (CB-37/39) A reveal surface (not an exercise): a natural model + why it works + other natural ways. It accompanies **all** free production (Say It + open mixed Weaves); chip/option exercises do not need it. Branch copy per outcome; a no-match routes to a neutral compare, never a red failure.

**10.2 W2 look-ahead window.** `[FL][TUNABLE]` (CB-38) The revealed natural form may sit **~3–4 lessons ahead** (5–6 at most), **recognition-only** — never far-future forms (no subjunctive at L3). Reveal beyond the window is a validator ERROR.

**10.3 Bounded, authored alternatives.** `[DC]` (CB-39) Each production item plans a **bounded set of accepted alternatives + register notes** so a valid variant is recognized, not marked wrong. Alternatives are authored, never AI-invented. *(The accepted-alternatives data contract = Engineering.)*

**10.4 "Later form" soft cards.** `[ADR-0016]` (CB-49) A recognition-only future form renders as a gentle "A form for later" card — inline, not modal; jargon hidden (`boundary`/`recognitionOnly` never shown); never gradeable as wrong.

---

## 11. Reading `[FL — founder-ratified 2026-07-24 (Q7)]`

**11.1 The rule.** (CB-50) **Every Reading ends in an appropriate learner action, but not necessarily production.** A valid Reading action may be: recognizing the scene/intention, noticing a reusable piece, selecting a fitting continuation, identifying a contrast, extracting useful language, matching a line to its social function, making a bounded prediction, small supported reuse, **or** producing language when level, prerequisites, and cognitive load make production appropriate.

**11.2 Early levels (L0–L3).** Reading normally ends in a **bounded non-production action** (recognition, noticing, selection, extraction, contrast, prediction, social-function match, small supported reuse). Requiring free/full production after every early Reading is too cognitively expensive.

**11.3 Later levels.** Reading may lead to freer reuse or production **only** when: the required language is already active or supported; prerequisite safety holds; cognitive load stays appropriate; and the production serves the actual learning goal.

**11.4 Reading must never become:** passive page-turning; sentence-by-sentence translation testing; a default "What does this sentence mean?"; school-style paragraph comprehension; or forced output added only to satisfy a production quota.

**11.5 Supersession.** The earlier rule *"every Reading exercise must end in production"* is **superseded** (historical only).

**11.6 Deferred implementation.** `[OPEN]` The Reading exercise-family taxonomy and the Reading validator (the truncated `EXERCISE §16` scale-rule list) are not yet defined — reconstruct with the founder before Exercise System v1 (Source-Gaps G1). The **Engineering** Bible owns the eventual validator.

---

## 12. Listening and audio

**12.1 Current reality — TTS hygiene.** `[DC]` (CB-54) TTS reads clean French only; it never speaks placeholders/blanks (`[___]`, `...`); Listen is hidden on English / true-false items. Audio supports recognition before punitive production; do not hide text behind audio; sound notes are tiny, not phonology lectures (CB-53).

**12.2 Direction — human recordings + shadowing.** `[FL][DEFERRED]` (Q8, CB-51/52) Human recordings will replace TTS (recorded, not generated); shadowing (listen-and-repeat, **ungraded**) is the first speaking feature; graded pronunciation comes much later. Authors may mark future shadowing beats in `designNotes` (no schema change). **Current content must not depend on an unbuilt recording pipeline or listening contract.**

---

## 13. Prompt and instruction language

**13.1 Canonical-sentence product language.** `[DC]` (CB-45) Refer to lesson sentences as *model / anchor / scene sentence / weave example*. Forbidden: "memorize this / target sentence / perfect sentence."

**13.2 Progressive language independence (per-surface).** `[PB-082]` (CB-44) Native-language support has two independent layers — **content support** (Weave, translations, meanings, hints, reveal, bilingual output) and **product/instruction voice** — which may fade at different rates. How each surface displays/reveals/reduces support is Content-owned; the fade is readiness-gated, gradual, reversible, and never framed as failure.

**13.3 Instruction Weave — DEFERRED.** `[DC][DEFERRED]` (Q8, CB-40–43) **All current lessons stay English-guided.** Instruction Weave (the app's own voice turning French across `english-guided → mixed-french → mostly-french → french-led`) is a **future Phase-D system**; a lexique-temperature or similarly evidence-based mechanism may be designed later. The fixed-L40 monolingual switch is **superseded**. **Current authoring must not depend on an unbuilt monolingual-transition system.**

---

## 14. Feedback and error recovery

**14.1 Passive-mirror feedback.** `[ADR-0002]` (CB-59) Explains, never punishes: success soft, failure neutral ("Not a match yet." / "Take another look."), boundary never a failure. Preferred copy library: "Used. Not memorized.", "This word is becoming yours.", "You used French today." *(Exact strings = Brand.)*

**14.2 Verdict, not raw code.** `[BUILDSPEC]` (CB-62) Learner-facing feedback consumes a `FeedbackVerdict` (accepted / accepted_with_note / neutral_compare / precision_issue / wrong_target / repair_opportunity / not_yet) — never a raw `ErrorTagCode`. Banned outputs: "Wrong! / Fail! / Perfect native translation required / Memorize this grammar rule." *(The tag→verdict bridge = Engineering.)*

**14.3 Near-miss is a soft signal.** `[ADR-0021]` (CB-61) Punctuation/accent/spelling near-misses are soft signals, never failures; they never lower a box or a prompt-fade level. *(Scoring mechanics = Engineering.)*

**14.4 One nudge.** `[FL]` (CB-63) Post-output: at most one nudge toward the smallest useful upgrade; no native rewrite by default; prefer active/supported items; require a revision after a nudge.

**14.5 Fill-with-traps.** `[DC]` (CB-64/65) Distractors are pedagogically authored with a `trapReason`; a wrong pick with a trapReason shows a **neutral** "why the trap is attractive" note; a future/exposure form may be a wrong trap but never the correct option. On the first wrong answer, deliver the trap's reason in one coach-voice line.

**14.6 Error source before weakness.** `[DR]` (Q2, CB-66) Every miss is first classified by source (learner / content / validator / UI / tone / AI / mastery-mapping): a bad distractor or an early reveal is **not** learner weakness; exposure/ghost production failure is **not** weakness. *Labeled derived, founder-ratified. The repair/return scheduling algorithm = Engineering/Reinforcement.*

---

## 15. French naturalness and linguistic safety

**15.1 Natural, not literal.** `[FL]` (CB-68) Authored French reads as a native would say it, not a literal translation; include the natural "rescue tail." Default variety: **contemporary metropolitan French**; deliberate regional use must be declared. `[DR][OPEN]` The full register/style boundaries live in the French style guide (Ch. 18, still to be authored).

**15.2 Three distinct properties — never collapsed.** `[FL]` (CB-68/69) **Naturalness**, **grammatical correctness**, and **prerequisite safety** are separate. Prerequisite safety **overrides** grammatical correctness: beginner production must never require an unseen form; an unseen form appears only as `supported`/`recognition`/chunk.

**15.3 Survival-formula wording (locked).** `[FL]` (CB-70) `vous pouvez répéter ?` (never inverted); `je ne comprends pas`. Inverted question forms are recognition-only band-wide; an inverted question in a production target is an ERROR. *(Preserve exact French; inversion banding = Curriculum.)*

**15.4 Gender treatment.** `[FL — founder-ratified 2026-07-24 (Q11, edited)]` No full gender-agreement system in early lessons. Introduce **only the gender distinction the immediate communicative goal needs**; a small feminine-form note (e.g. `-e`) may be used when pedagogically useful; **no paradigms or agreement tables**. The **default form follows the actual sentence / speaker / character / communicative context — not an unconditional masculine-first rule.** `[OPEN]` Broader inclusive-language treatment, sequencing, and UI presentation stay open (Curriculum + French style guide).

---

## 16. Practice and reinforcement content

**16.1 Lesson vs Practice Hub.** `[FL]` (CB-73) The lesson teaches the concept via examples (exposure, input, logic, first output); the Practice Hub carries volume. Same exercise families, different homes. Breadth and repetition live in the Hub.

**16.2 Hub is optional, never gates the path.** `[DC]` (CB-74) The lesson path stays calm and linear — finishing a lesson unlocks the next, nothing else. The Hub is strongly invited ("Stay with it") but never required; no "solve N to continue". *(Unlock rule = Curriculum; consistent with PB-029.)*

**16.3 Build / Stretch / Challenge framing.** `[DC]` (CB-75) Practice tiers are framed to the learner as Build (strengthen what you know) / Stretch (put pieces together) / Challenge (tackle the tricky ones; weak-only). Precision-near-miss items stay Build-eligible, never Challenge. *(Selection algorithm = Engineering; runtime currently absent.)*

**16.4 Calm resting state.** `[PB-034]` (CB-76) Practice is never permanently "finished": the calm state reads "Nothing needs your attention right now." Weaknesses are described in natural language, never percentages (PB-035). *(Exact strings = Content/Brand.)*

**16.5 Daily Review.** `[DC]` (CB-88) A calm retrieval offer drawn only from the eligible lesson pool; it never manufactures pressure ("come back tomorrow", streak language).

**16.6 Campfire content.** `[FL — founder-ratified 2026-07-24 (Q12)]` (CB-87) Campfire content is **generated** from the learner's **owned inventory + relevant errors + prerequisite-safe language**, may sprinkle ahead-words as retention teasers, never hardcoded. **Content** owns the generation/authoring contract; **Engineering** owns implementation/enforcement; **Product Brain** owns access position, paywall placement, pricing, and packaging. *Monetization position is not fixed here.*

---

## 17. Mon Lexique content

**17.1 Content types.** `[PB-041]` (CB-77) Words, chunks, grammar structures, **faux amis**, quick-knowledge cards, contrast cards, usage notes, and (future) optional micro-lessons. Card authoring is Content-owned.

**17.2 Detail cards.** `[BUILDSPEC]` (CB-78) Bottom-sheet micro-cards: Meaning / Example / Tiny Logic / Sound Note / Common Mistake / Usage / Chunk Unpack / Pattern / Register / Memory Anchor; a "Use it here" context pattern; apostrophe-élision + liaison are mandatory; **approved facts only — runtime AI cannot invent them.** *(Bottom-sheet layout = Design.)*

**17.3 A derived, learner-safe view.** `[BUILDSPEC][PB-040]` (CB-79) Mon Lexique is derived from the item registry + mastery — never a hand-authored list, flashcard queue, dictionary, or raw mastery report. Ghost/exposure never shown as "learned"; recognition alone never auto-adds (production success required). *(Derivation/promotion = Engineering.)*

**17.4 Learner-safe status vocabulary.** `[BUILDSPEC][OPEN]` (CB-80) The learner sees calm statuses (Seen / Tried / Getting stronger / Known / Try again soon / Seen in model answers) — never raw scores, "scary" labels, internal IDs, or engine enums. The **exact final band copy is open** (author with the style guide, do not invent).

---

## 18. Content QA and review gates

**18.1 Batch production policy.** `[FL]` (CB-90) A batch is a Unit slice (default 3, up to ~6 lessons), **never** the whole syllabus. One batch = one content-only PR = one founder pedagogical review; drafts pass the validator gate before review; batches are sequential. *(PR/CI mechanics = Engineering/process.)*

**18.2 Authoring ledger & content-safety checklist.** `[DR]` (Q2, CB-91/92) Every lesson spec carries the required per-lesson/per-item ledger; every batch runs the content-safety review checklist + anti-gaming rules (unregistered items can't hide as "decorative"; exposed items can't be counted "already learned" to dodge `activeNew`; a "doorway" label can't bypass integration rhythm; AI can't self-assign a QA pass). *Labeled derived, founder-ratified; not a runtime-enforcement claim. **Existing lessons require a separate retrospective audit** (no current lesson is claimed compliant).*

**18.3 French QA gate.** `[DR — founder-ratified 2026-07-24 (Q10)]` (CB-71) Every finding is tagged BLOCKER / MAJOR / MINOR / POLISH / PREFERENCE. Stage-aware visibility: A authoring · B founder/operator smoke · C invited-learner (0 unresolved BLOCKER/MAJOR) · D public. A **named qualified human reviewer** and a recorded verdict are required; **AI may assist but may not self-certify `FrenchQAStatus: PASS`**. QA reviews target sentences, model answers, distractors, hints, TTS text, translations, register, and chip segmentation.

**18.4 French style guide — to be authored.** `[OPEN]` (Q10, Source-Gaps G2) A **complete French style guide does not yet exist** and must be authored; `L1-L5 Proofreading.md` is **one input, not the guide** (a legacy content/proofreading corpus). Until it exists, unresolved style matters are **marked open, not invented**.

**18.5 Timing.** `[DR]` (Q10) The executable French-QA gate + named reviewer must be in place **before Stage C (invited-learner exposure)**. This requirement **must not block** internal authoring, drafting, schema work, or founder-only testing before Stage C.

---

## 19. Tunable parameters

> All are authoring defaults / validator thresholds / planning targets — **not** hard invariants unless the source explicitly says so. Not scientifically calibrated. Tuning a number here is not a canon change.

| Parameter | Value | Function | Enforcement | Source |
|---|---|---|---|---|
| Total rendered screens / lesson | 11–14 | authoring default | V1 spec-only | LESSON_FLOW §1.1 |
| Lesson spine beats/cards | 8–12 | authoring default | none | EXERCISE §5.1 |
| Micro-actions / lesson; per screen | 15–25; 1–3 (cap 4) | authoring default | V1 spec-only | LESSON_FLOW §1.1 |
| Lesson time | 7–10 min | planning target | none | LESSON_FLOW §1.1 |
| **New active chips / lesson** | **1–4** | authoring invariant (founder) | build-time review | PAYLOAD §3; LESSON_FLOW §1.1 |
| Production actions / lesson | 3–5 | authoring default | none | LESSON_FLOW §1.1 |
| Supported / ghost additions | +2–3 each | authoring default (founder) | CPW review | PAYLOAD §3 |
| Insight-card budget | target 2 / ceiling 3 | validator threshold + target | V5 (>3 WARNING) | LESSON_FLOW §1.4 |
| Visible carryover / recycled / exposure / weak | ≤3 / ≤2 / ≤2 / ≤1 | validator thresholds | CPW lint (partial) | CFC §1.5 |
| Target-load share | ≥0.50 | validator threshold | CPW lint | CFC §1.5 |
| **W2 reveal look-ahead** | ~3–4 (max 5–6) | authoring rule (founder) | §16 lint ERROR | ANSWERS W2 |
| Max nudges / output | 1 | authoring rule (founder) | nudge validator | EXERCISE §1.5 |
| Breadth trajectory | L5: 18–22/30–35 · L15: 45–55/70–90 | planning target (audit) | audit report | PAYLOAD §9 |
| Early-lesson item budget (coarse) | 30–45 / 8–15 / 8–15 / 10–20 | planning target — superseded for active-new by 1–4 | none | learning-engine §7 |

**Item-counting methodology** `[OPEN]` (Q4d, CB-22): how an "item" is counted toward these budgets (does a frame + variations count as one or several?) is **open** — Curriculum/Content-operations must define it before these figures are treated as precise.

---

## 20. Authoring checklist + open decisions & deferred systems

**20.1 Per-lesson authoring checklist (quick gate).**
1. Sentence-family present (anchor/variation/contrast/rescue/pieces)? (§6.1)
2. Active-new 1–4; every item placed in exactly one payload layer; supported items ≥2×? (§5)
3. No full-sentence chips; `piecesUsed` atomic/produced-only; frozen classes untouched? (§4)
4. Whole-first meet; ≥1 action per screen; discovery ≠ scored? (§6)
5. Insight = 1 idea + 1 example + action; ≤3 Level-3 cards; no tables as drills? (§7)
6. ≥1 true open mixed Weave (ungraded); directive prompts; hint = material not answer? (§8)
7. Natural Reveal on all free production; reveal within the W2 window; bounded authored alternatives? (§10)
8. Reading ends in an appropriate action (production only when level/prereq/load allow)? (§11)
9. French natural-not-literal; prerequisite-safe; gender per §15.4 (no masculine-first default)? (§15)
10. No banned language; passive-mirror copy; verdict not raw code? (§3.4, §14)
11. All lessons english-guided (no Instruction-Weave dependency); no unbuilt-audio dependency? (§12, §13.3)
12. Ledger filled; FrenchQAStatus not self-assigned; visibility stage set? (§18)

**20.2 Open decisions (routed to owner).** `[OPEN]`
- Item-counting methodology → Curriculum/Content-ops (§19, CB-22).
- Reading exercise-family taxonomy + validator → Content/Engineering (§11.6, G1).
- French style-guide sub-policies (register boundaries, spoken-vs-written, sentence-length by band, English-explanation register, gender-inclusive treatment, punctuation, colloquial omission, reviewer staffing) → French style guide (§18, G2).
- Mon Lexique final band copy → Content, with the style guide (§17.4).
- Summit narration copy recalibration (legacy 24-lesson calibration) → Brand (CB-84).
- Build/Stretch/Challenge runtime → Engineering (§16.3).

**20.3 Deferred systems (ratified as deferred).** `[DEFERRED]`
- Instruction Weave / monolingual ladder → Phase D; english-guided until a plan is locked (§13.3).
- Human-recorded audio pipeline + listening-comprehension contract; graded pronunciation (§12.2).
- Boundary `presentationHint`/`later_form` schema marker (§10.4) → Engineering.
- Mastery-precision staged strictness (monolingual-phase) → Engineering.

**20.4 Superseded (historical only — do not revive).** `[SUPERSEDED]`
- "Every Reading exercise must end in production" (Ch. 11.5).
- Fixed-L40 monolingual transition (§13.3).
- "Franglais" mechanic name → "Weave" (§8.1).
- Legacy 11-section lesson flow (Combine and Weave / Mini Conversation / French Fill / Build / Write / Read and Listen).
- Near-miss = full failure; hand-written static hub drills; "Word Graph = Killer #3"; L14/$12.99 paywall (position now a Product-Brain open question).

---

## Appendix A — Decision-ID map (CB-01…CB-92 → chapter)

| Chapter | CB IDs folded |
|---|---|
| 2 Ownership | CB-08*, CB-89 (routed), CB-30/35/45/84 (Brand facets), CB-87 (PB facet), CB-62 (Eng facet) |
| 3 Principles | CB-46, CB-34, CB-67, CB-79* |
| 4 Chip & item model | CB-01, CB-02, CB-03, CB-04, CB-05, CB-06, CB-07, CB-08, CB-09, CB-47, CB-48 |
| 5 Payload economy | CB-15, CB-16 |
| 6 Lesson structure | CB-10, CB-11, CB-12, CB-13, CB-14, CB-17, CB-18, CB-19, CB-20, CB-21, CB-72 |
| 7 Insight | CB-23, CB-24, CB-25, CB-26, CB-27, CB-28, CB-29 |
| 8 Weave | CB-30, CB-31, CB-32, CB-33, CB-34, CB-35, CB-36 |
| 9 Say It / Speaking / Writing | CB-55, CB-56, CB-57, CB-58 |
| 10 Natural Reveal | CB-37, CB-38, CB-39, CB-49 |
| 11 Reading | CB-50 (+ supports CB-46, CB-20, CB-11) |
| 12 Listening & audio | CB-51, CB-52, CB-53, CB-54 |
| 13 Prompt & instruction language | CB-40, CB-41, CB-42, CB-43, CB-44, CB-45 |
| 14 Feedback & error recovery | CB-59, CB-60, CB-61, CB-62, CB-63, CB-64, CB-65, CB-66 |
| 15 French naturalness & safety | CB-68, CB-69, CB-70, (gender rule, Q11) |
| 16 Practice & reinforcement | CB-73, CB-74, CB-75, CB-76, CB-87, CB-88 |
| 17 Mon Lexique | CB-77, CB-78, CB-79, CB-80 |
| 18 Content QA & gates | CB-71, CB-90, CB-91, CB-92 |
| 19 Tunable parameters | CB-13, CB-15, CB-16, CB-22, CB-26, CB-38 (numbers) |
| 20 Open/deferred | CB-22, CB-40–44, CB-51–53, CB-75, CB-80, CB-84 |
| AI content guardrails (in §3/§7/§14/§17) | CB-81, CB-82 |
| Journey narration (Brand facet; §16 cross-ref) | CB-83, CB-85, CB-86 |

`*` = decision appears in more than one chapter. All CB-01…CB-92 are represented.

## Appendix B — Migration map (legacy note/file → Bible chapter)

| Legacy source | → Bible chapter | Handling |
|---|---|---|
| `docs/EXERCISE_CANON_v0.4.md` | Ch. 6, 7, 8, 9, 10, 14, 16 | primary exercise/authoring source; split by surface |
| `docs/canon/LESSON_FLOW_CANON_v1.md` | Ch. 6, 7, 12, 13, 14, 19 | lesson-flow + Instruction Weave (deferred) + validators |
| `docs/PAYLOAD_ECONOMY_v0.md` | Ch. 5, 19 | payload layers + budgets (Haktan-locked) |
| `docs/CONTENT_FACTORY_CONTRACT.md` | Ch. 18 | batch/QA process |
| `docs/CAIRN_PRODUCT_ANSWERS_2026_07.md` | Ch. 8, 10, 12, 16 | founder locks W1/W2/C1/C2/S1 |
| `docs/learning-engine-v1.md` | Ch. 6, 10, 16, 19 | pedagogical spec; §7 counts superseded for active-new |
| `10_OPERATIONS/French Linguistic QA.md` | Ch. 18 | QA gate (derived, ratified) |
| `02_LEARNING_SYSTEM/*`, `03_EXERCISES/*` (ObsidianCodex) | Ch. 4–17 | derived system-spec notes; "Policy Hardening 2026-07-18" → Ch. 6.8, 14.6, 18.2 (labeled derived-ratified) |
| ADR-0001/2/3/4/5/6/16/21/22/25 | Ch. 3, 4, 6, 8, 10, 14, 16 | cited as ADR; status unchanged |
| `Tasarim_Envanteri.md` §15/§16 (fixed-L40) | Ch. 13.3, 20.4 | SUPERSEDED |

*Migration honors Q1: titles/boundaries may change; provenance, supersession history, decision IDs, and unresolved questions are preserved; a rename/merge is not a new authority event.*

## Appendix C — Provenance & supersession log

- **Founder-locked inputs:** `CAIRN_PRODUCT_ANSWERS_2026_07.md`, `PAYLOAD_ECONOMY_v0.md`, `EXERCISE_CANON §5` (Haktan), `CONTENT_FACTORY_CONTRACT.md` (Operator-approved).
- **Accepted ADRs:** 0001, 0002, 0003, 0004, 0005, 0006, 0016, 0021, 0022, 0025 — status unchanged by this Bible.
- **Derived, founder-ratified 2026-07-24:** the "Policy Hardening 2026-07-18" layer (Ch. 6.8, 14.6, 18.2) — labeled derived; no runtime-enforcement or existing-lesson-compliance claim; retrospective audit pending.
- **Founder ratifications 2026-07-24 (Q1–Q12):** recorded in [Ratification Pack §0](CONTENT_BIBLE_RATIFICATION_PACK_v0.1.md).
- **Superseded:** listed in §20.4; kept discoverable, never revived.

---

*End of Content Bible v1.0 (Draft). Folds the 2026-07-24 founder-ratified decisions. Awaiting founder sign-off before promotion to Canonical. Not committed. Open items (§20.2) and deferred systems (§20.3) are tracked, not lost.*
