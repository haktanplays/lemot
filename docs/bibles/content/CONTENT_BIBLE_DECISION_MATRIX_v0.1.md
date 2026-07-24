# Cairn Content Bible — Decision Matrix v0.1

> Companion to [`CONTENT_BIBLE_RATIFICATION_PACK_v0.1.md`](CONTENT_BIBLE_RATIFICATION_PACK_v0.1.md). One row per inventory decision (CB-01…CB-92). Read-only analysis; authorizes nothing.
>
> **Status legend:** `SETTLED` · `NEEDS_RATIFICATION` · `TUNABLE` · `CONFLICT` · `DEFERRED` · `SUPERSEDED` · `ROUTE_TO_OTHER_BIBLE`
> **Authority legend:** Founder-locked · ADR · Design-canon · BUILDSPEC · Derived · Archive · Product-Brain
> **Disposition legend:** `RATIFY` · `RATIFY WITH EDIT` · `DEFER` · `REJECT` · `ALREADY CANON — NO ACTION`

> **RATIFIED 2026-07-24.** All nine live founder questions were answered (see pack §0). Every `NEEDS_RATIFICATION` row mapped to a live question is now **RATIFIED** (some with edits: Q2 label = "derived, founder-ratified"; Q4 numbers = tunable defaults + beats≠screens; Q11 gender = context-default, no masculine-first). `CONFLICT` rows resolved: **CB-14** (beats/screens are different layers, not equal), **CB-22** counting-methodology → **OPEN** (Curriculum/Content-ops). Deferred systems (Instruction Weave CB-40–43, Audio CB-51–53) are **ratified-as-deferred**. The Status/Founder-action columns below are the *pre-ratification* analysis snapshot, preserved for traceability; the authoritative post-ratification state is the pack §0 table and the roll-up at the end of this file.

| ID | Decision summary | Current authority | Strongest source | Proposed owner | Status | Founder action | Recommended disposition | Notes |
|---|---|---|---|---|---|---|---|---|
| CB-01 | Chip = reusable owned production block, not sentence memorization | Design-canon + ADR | chip-taxonomy v0.3 §3; ADR-0005 | Content | SETTLED | — | ALREADY CANON | Whole-first is ADR-0005; chip def is "revisable" but load-bearing |
| CB-02 | 12-type behavioral chip taxonomy + 3-verdict (Allowed/Caveat/Forbidden-as-UI) | Design-canon ("revisable") | chip-taxonomy v0.3 §4 | Content | NEEDS_RATIFICATION | Q3 | RATIFY | "Chip taxonomy limits" delegated to Content by PB §19 |
| CB-03 | No full-sentence/multi-clause chips as primary UI chips | ADR | ADR-0004; CFC §1.5 | Content (+Eng lint) | SETTLED | — | ALREADY CANON | Enforcement lint PLANNED (KNOWN_GAPS #5) — Engineering |
| CB-04 | Allowed compositional classes: formula chunk/noun package/pattern chip/unpackable | Design-canon | chip-taxonomy v0.3 §4 | Content | NEEDS_RATIFICATION | Q3 | RATIFY | — |
| CB-05 | Bare atoms (je/pas/ce…) are Caveat, not blanket-forbidden | Design-canon | chip-taxonomy v0.3 §4 | Content | NEEDS_RATIFICATION | Q3 | RATIFY | — |
| CB-06 | PROTECTED_CHUNKS frozen at 2; SURVIVAL_FORMULAS closed, Haktan-gated | Founder-locked | PAYLOAD §4.1 | Content | SETTLED | — | ALREADY CANON | Preserve exact FR strings |
| CB-07 | `oui` producible answer word, recognition otherwise | Founder-locked | PAYLOAD §4.2 | Content | SETTLED | — | ALREADY CANON | — |
| CB-08 | Item roles active/supported/recognition/recycled (+blocked) + integrity invariants | Design-canon (roles) / Derived (invariants) | MASTER_PIPELINE Rule 6; Chip Taxonomy 2026-07-18 | Content (+Eng enum) | SETTLED / NEEDS_RATIFICATION | Q2 (invariants) | RATIFY roles; ratify invariants via Q2 | Runtime enum narrower — Engineering |
| CB-09 | `piecesUsed` = atomic, actively-produced only | Design-canon + lint | chip-taxonomy §8; BUILDSPEC §12.8 | Content (+Eng lint) | SETTLED | — | RATIFY | `sentence/ghost_in_pieces_used` BLOCKER = Engineering |
| CB-10 | Sentence-family lesson input model (anchor/variation/contrast/rescue/pieces) | Design-canon | learning-engine §3 | Content (+Curr) | NEEDS_RATIFICATION | Q3 | RATIFY | Family sequencing straddles Curriculum |
| CB-11 | Whole-first; meet-card whole → tap-decompose; atomic highlights | ADR | ADR-0005; LESSON_FLOW §1.2 | Content | SETTLED | — | ALREADY CANON | Tap interaction PLANNED (Faz B) — Engineering |
| CB-12 | 7 frozen v1 screen types; richness in payload not new types | Design-canon | Lesson Anatomy; LESSON_FLOW §12 | Content (+Eng schema) | SETTLED | — | RATIFY | — |
| CB-13 | Lesson budget: 11–14 screens / 7–10 min / 1–4 chips / 3–5 productions / 15–25 micro | Design-canon (numbers) | LESSON_FLOW §1.1 | Content | TUNABLE | Q4 | RATIFY principle; numbers → tunable | V1 spec-only (not mechanized) |
| CB-14 | Lesson spine: 8–12 cards/beats, each beat once; caps 2 heavy/1 board/2 insights | Founder-locked | EXERCISE §5.1 (Haktan) | Content | RATIFIED (Q4d) | — | RATIFY WITH EDIT | **Beats/cards ≠ rendered screens** (different counting layers, not equal; one beat may need >1 screen). Bible defines both; never "beats = screens" |
| CB-15 | Payload economy 4 layers + surface ceiling (active-new 1–3, +2–3 sup, +2–3 ghost) | Founder-locked | PAYLOAD §2/§3 | Content | SETTLED | Q4 (numbers) | ALREADY CANON; numbers tunable | "Locked by Haktan" |
| CB-16 | Numeric load caps (carryover ≤3, recycled ≤2, exposure ≤2, weak ≤1, target-share ≥0.50) | Founder-locked / Design-canon | CFC §1.5; D&CL | Content (+Eng lint) | TUNABLE | Q4 | RATIFY as tunable defaults | Explicitly "not scientifically calibrated" |
| CB-17 | Production-load formula + accounting fields + anti-gaming | Derived (Policy Hardening) | D&CL 2026-07-18; CPW | Content | NEEDS_RATIFICATION | Q2 | RATIFY as authoring policy | NON-CLAIM: not runtime-enforced |
| CB-18 | Archetype contracts + 70/20/10 + per-archetype activeNew budgets | Derived / Design-canon | archetype templates; Lesson Anatomy 2026-07-18 | Content (+Curr) | NEEDS_RATIFICATION | Q2/Q3 | RATIFY | Archetype→lesson assignment = Curriculum |
| CB-19 | Engine-depth; ≤1 full-cycle early; no full conjugation grid as teaching surface | Design-canon | template §4; EXERCISE §6 | Content (+Curr) | SETTLED | — | RATIFY | Verb sequencing = Curriculum |
| CB-20 | Every screen ≥1 action; discovery (no wrong/score) vs assessment split | Design-canon | LESSON_FLOW §1.2/§1.3 | Content | SETTLED | — | RATIFY | Supports Reading (Q7) |
| CB-21 | Recap = ownership consolidation + SRS note + bridge; no celebration | Design-canon | Review.md; LESSON_FLOW §9.1 | Content | SETTLED | — | RATIFY | — |
| CB-22 | Early-lesson item budget (30–45 exp / 8–15 act / 8–15 sup / 10–20 rec) | Design-canon (coarse) | learning-engine §7/§17 | Content (+Curr) | CONFLICT + DEFERRED | Q4 | DEFER (superseded for active-new; counting OPEN) | §17 "open decisions"; PAYLOAD supersedes active-new |
| CB-23 | Insight formula: 1 idea + 1 example + must end in action; approved facts only | Design-canon | EXERCISE §7; CFC §1.5 | Content | SETTLED | — | RATIFY | — |
| CB-24 | Insight typing = home of faux-ami & grammar-nugget authoring | Design-canon + PB delegation | Insight and Notice.md; PB-041 | Content | SETTLED | — | RATIFY | "Card authoring = Content Bible" (PB-041) |
| CB-25 | Insight 3-level + placement by understanding (opener/rescuer/sealer); no filler | Design-canon | LESSON_FLOW §1.4 | Content | SETTLED | — | RATIFY | — |
| CB-26 | Insight budget ≤3 (target 2) | Design-canon (divergent) | LESSON_FLOW §1.4 (V5); EXERCISE §5.1 | Content (+Eng V5) | SETTLED (editorial) | — (editorial) | RATIFY WITH EDIT (target 2 / ceiling 3) | Resolved by authority: closed design canon (LESSON_FLOW §1.4 + V5) > archive "MC.2 1/chunk"; no founder call needed |
| CB-27 | Faux-ami/cognate authoring: "Not this/But this"; effect not rule; per-band bridge | Archive (MC.2) + Design-canon | Tasarim §19.F; EXERCISE §8 | Content | NEEDS_RATIFICATION | Q3 | RATIFY | — |
| CB-28 | Insight reward-reframe ("Unlocked!"→"Added.") | ADR + Archive | ADR-0002; Tasarim §19.F | Content (+Brand) | SETTLED | — | ALREADY CANON | — |
| CB-29 | No grammar dump; tables banned as drills, once-as-map | Founder + Design-canon | EXERCISE §6; ANSWERS §1 | Content | SETTLED | — | ALREADY CANON | — |
| CB-30 | Weave is the primary production mechanic (ex-"Franglais") | ADR | ADR-0003 | Content (+Brand name) | SETTLED | — | ALREADY CANON | Name = Brand; "Franglais" SUPERSEDED |
| CB-31 | Weave true form: leave unknowns in English; never forced full translation | Founder-locked | ANSWERS §2 (W1 block) | Content | SETTLED | — | ALREADY CANON | — |
| CB-32 | W1: open mixed Weaves ungraded → Natural Reveal | Founder-locked | ANSWERS W1; EXERCISE §16 | Content (+Eng) | SETTLED | — | ALREADY CANON | Grading suppression = Engineering |
| CB-33 | weaveType taxonomy: supported→mid→context→open | Design-canon | Weave System; Weave.md | Content | SETTLED | — | RATIFY | — |
| CB-34 | Weave prompts directive/intent, not "translate this"; direct-translation ≤ dominant | BUILDSPEC + Design-canon | BUILDSPEC §20.4; EXERCISE §0 | Content | SETTLED | — | RATIFY | Also Prompt Design |
| CB-35 | Weave copy/UI package ("Say this:", helper, "Your try", neutral badge) | BUILDSPEC + Design-canon (#155) | BUILDSPEC §19.2; Backlog #155 | Content (+Brand) | NEEDS_RATIFICATION | — (editorial) | RATIFY WITH EDIT | Exact strings + badge = Brand |
| CB-36 | Weave hint ladder: material not answer; reverse-order; no copy-ready; no infinite loop | Design-canon | LESSON_FLOW §8; EXERCISE §8 | Content (+Eng runtime) | SETTLED | — | RATIFY | Runtime ladder = Engineering |
| CB-37 | Natural Reveal accompanies all free production; chip exercises don't | Founder-locked | ANSWERS §3 | Content | SETTLED | — | ALREADY CANON | — |
| CB-38 | W2 look-ahead ~3–4 (max 5–6) lessons, recognition-only | Founder-locked | ANSWERS W2; EXERCISE §16 | Content (+Curr horizon) | SETTLED | — | ALREADY CANON | Preserve as authoring rule |
| CB-39 | Natural Reveal branch copy + bounded authored alternatives + register notes | Design-canon | learning-engine §12; NR.md | Content (+Eng data) | SETTLED | — | RATIFY | Alternatives-data contract = Engineering |
| CB-40 | Instruction Weave — app voice becomes French (4 tiers) | Design-canon (deferred) | LESSON_FLOW §4/§4.1 | Content | DEFERRED | Q8 | DEFER (document as future canon) | Phase D; `monolingualMode` "to be wired" |
| CB-41 | Instruction Weave thermostat (lexique temp, reversible, not lesson number) | Design-canon + Product-Brain | LESSON_FLOW §4.2; PB-080 | Content (+Eng) | DEFERRED | Q8 | ALREADY CANON (PB-080); DEFER impl | Temperature mechanism = Engineering |
| CB-42 | Instruction surface order A→D + long-press English emergency exit | Design-canon (deferred) | LESSON_FLOW §4.3 | Content | DEFERRED | Q8 | DEFER | — |
| CB-43 | Current default: all lessons english-guided until ladder plan locked | Founder-locked default | EXERCISE §17; LESSON_FLOW §4.1 | Content | SETTLED | Q8 | RATIFY (current default) | — |
| CB-44 | Per-surface native-language support behavior is Content-owned | Product-Brain delegation | PB-082 | Content | NEEDS_RATIFICATION | Q8 | RATIFY as Content-owned open item | Two-layer model already PB canon |
| CB-45 | Canonical-sentence product language (model/anchor/scene; forbidden "memorize this") | Design-canon | LESSON_FLOW §1.5 | Content (+Brand naming) | SETTLED | — | RATIFY | — |
| CB-46 | Production-first: recognition/choice/blank-only low-evidence unless leads to output | Founder-locked | EXERCISE §0/§1.2 | Content (+Eng weights) | SETTLED | — | RATIFY | Production-first stays the app direction; Reading is the scoped exception (Q7): a Reading "output" may be a bounded action, not full production. Evidence weights = Engineering |
| CB-47 | Surface protocol: active introduced / future-ghost held / recycled greeted | Design-canon | LESSON_FLOW §2/§2.1 | Content | SETTLED | — | RATIFY | — |
| CB-48 | Future/ghost hard rules: never correct answer / never production target | Design-canon (V3/V4) | LESSON_FLOW §2.2–2.3 | Content (+Eng lint) | SETTLED | — | RATIFY | — |
| CB-49 | Boundary recognition-only "later form" soft cards | ADR | ADR-0016 | Content (+Eng marker) | SETTLED | — | ALREADY CANON | `presentationHint` marker DEFERRED — Engineering |
| CB-50 | Reading ends in an appropriate learner ACTION; production is conditional, not universal; never translation-testing / passive page-turning | Founder correction 2026-07-24 (principle) + Design-canon (impl, truncated) | Founder addendum; EXERCISE §16 | Content | NEEDS_RATIFICATION | Q7 | RATIFY (founder addendum = proposed canon) | Baseline principle now SET by founder; old "every Reading ends in production" SUPERSEDED; taxonomy + validator list still open (G1) |
| CB-51 | Human recordings replace TTS (recorded, not generated) | Founder-locked | ANSWERS §4 (S1) | Content (+Eng) | SETTLED | Q8 | ALREADY CANON (deferred pipeline) | Pipeline DEFERRED (§66.1) |
| CB-52 | Shadowing (ungraded) first speaking feature; graded pronunciation later | Founder-locked | ANSWERS §4 (S1) | Content | SETTLED | Q8 | ALREADY CANON | designNotes mark beats, no schema change |
| CB-53 | Audio principles: recognition before punitive production; don't hide text; tiny sound notes | BUILDSPEC | BUILDSPEC §52 | Content | NEEDS_RATIFICATION | Q8 | RATIFY | — |
| CB-54 | TTS hygiene: clean French only; never speaks placeholders/blanks | Design-canon + test | Anti-Patterns; Test Checklist | Content (+Eng) | SETTLED | — | RATIFY | `ttsPlaceholder.test.ts` mechanized |
| CB-55 | Say It Your Way: free production; input→confirm→reveal; never grades; no fake praise | Design-canon + Founder | EXERCISE §16; Say It.md | Content | SETTLED | — | RATIFY | "praise without target detection = ERROR" |
| CB-56 | Confirm step "You wrote: … — revise or keep?" (lowest-intervention self-revision) | Design-canon | LESSON_FLOW §8.4 | Content | SETTLED | — | RATIFY | — |
| CB-57 | answerBands (minimalAcceptable/good/natural) descriptive, not scores | Design-canon | Say It.md | Content | NEEDS_RATIFICATION | — | RATIFY | Low controversy |
| CB-58 | C2: chip-less open Say It from ~L10, deliberately EASY | Founder-locked | ANSWERS §6 (C2) | Content (+Curr) | SETTLED | — | ALREADY CANON | ~L10 placement = Curriculum |
| CB-59 | Passive-mirror mentor tone; feedback explains, never punishes | ADR | ADR-0002 | Content (+Brand) | SETTLED | — | ALREADY CANON | Tone = Brand |
| CB-60 | Preferred passive-mirror copy library ("Used. Not memorized." etc.) | Design-canon | MVP Canon §5; Test Checklist | Content (+Brand) | NEEDS_RATIFICATION | — | RATIFY | Exact strings = Brand |
| CB-61 | Near-miss precision = soft signal, never failure | ADR | ADR-0021 | Content (+Eng) | SETTLED | — | ALREADY CANON | Scoring mechanics = Engineering |
| CB-62 | Learner feedback consumes FeedbackVerdict, never raw ErrorTagCode; banned outputs | BUILDSPEC + engine | BUILDSPEC §13 | Content (copy) | SETTLED | — | RATIFY (copy) | Tag→verdict bridge → Engineering |
| CB-63 | One nudge, no native rewrite by default; require revision after nudge | Founder-locked | EXERCISE §1.5 | Content (+Eng) | SETTLED | — | RATIFY | Nudge engine runtime = Engineering |
| CB-64 | Fill-with-traps: authored trapReason; neutral "why attractive"; future only as wrong trap | Design-canon (V3) | Fill.md; canonRules V3 | Content | SETTLED | — | RATIFY | — |
| CB-65 | Fill recovery: first wrong → one-line coach-voice trap reason (V9) | Design-canon (spec-only) | LESSON_FLOW §8.3 | Content | NEEDS_RATIFICATION | — | RATIFY (authoring) | V9 not mechanized |
| CB-66 | Errors classified by source before weakness; exposure/ghost failure ≠ weakness | Derived (Policy Hardening) | Error Tracking 2026-07-18 | Content (guardrail) | NEEDS_RATIFICATION / ROUTE | Q2 | RATIFY guardrail; route algorithm to Eng | Repair/return scheduling = Engineering/Reinforcement |
| CB-67 | Banned gamification/reward/pressure language canon-wide | ADR | ADR-0001 | Content (rule) | SETTLED | — | ALREADY CANON | Non-goal = PB-053/076; tone = Brand |
| CB-68 | French natural not literal (a); default = contemporary metropolitan French (b) | Founder (a) / Derived (b) | MASTER_PIPELINE §4G; French QA 2026-07-18 | Content | SETTLED (a) / NEEDS_RATIFICATION (b) | Q10 (b) | RATIFY (a); ratify variety default (b) | (b) is a derived [LOCKED DEFAULT] |
| CB-69 | Prerequisite-safety / unseen-form guardrail overrides correctness | Founder + Design-canon | ai-gen §2/§6; MASTER_PIPELINE §4G | Content | SETTLED | — | RATIFY | Preserve naturalness/correctness/prerequisite distinction |
| CB-70 | Survival-formula locked wording; inversion recognition-only band-wide | Founder-locked | EXERCISE §1/§9/§16; PAYLOAD §4.1 | Content | SETTLED | — | ALREADY CANON | Preserve exact FR; inversion banding = Curriculum |
| CB-71 | French QA gate: severity + stage A–D + named reviewer + AI can't self-certify | Derived (provisional) | French QA 2026-07-18 | Content (process) | NEEDS_RATIFICATION | Q10 | RATIFY as process + commitments | Execution OPEN; style guide unwritten; reviewer UNKNOWN |
| CB-72 | Exercises render in 7 frozen types; legacy 11-section flow superseded/hidden | Design-canon / Archive | Exercise System Overview | Content | SETTLED + SUPERSEDED | — | ALREADY CANON (7 types); mark legacy SUPERSEDED | Do not treat legacy specs as active authoring |
| CB-73 | Lesson-vs-Hub split: lesson teaches via examples; Hub carries volume | Founder-locked | EXERCISE §5 (Haktan) | Content | SETTLED | — | RATIFY | — |
| CB-74 | Practice Hub optional-but-urged; never gates lesson path | Design-canon ("locked") | EXERCISE §5.4 | Content (+Curr) | SETTLED | — | RATIFY | Unlock rule = Curriculum; consistent w/ PB-029 |
| CB-75 | Build/Stretch/Challenge learner framing (Challenge weak-only) | Design-canon (PLANNED) | learning-engine §13; ADR-0021 | Content (framing) | NEEDS_RATIFICATION / DEFERRED | — | RATIFY framing; DEFER runtime | Selection algorithm = Engineering; runtime absent |
| CB-76 | Practice never "finished"; weaknesses in natural language not % | Product-Brain | PB-033/034/035 | Content (copy) | SETTLED | — | ALREADY CANON | Exact copy = Content/Brand (PB-034) |
| CB-77 | Mon Lexique content types incl. faux amis; card authoring Content-owned | Product-Brain delegation | PB-041; BUILDSPEC §49–51 | Content | SETTLED | — | ALREADY CANON | — |
| CB-78 | Mon Lexique detail/pop-up micro-cards (Use-it-here, élision/liaison, approved facts) | BUILDSPEC | BUILDSPEC §51 | Content (+Design) | NEEDS_RATIFICATION | — | RATIFY | Bottom-sheet layout = Design |
| CB-79 | Mon Lexique derived learner-safe VIEW; recognition never auto-adds | BUILDSPEC + Product-Brain | BUILDSPEC §49; PB-040 | Content (+Eng) | SETTLED | — | ALREADY CANON | Derivation/promotion = Engineering |
| CB-80 | Mon Lexique learner-safe status vocabulary (Seen/Tried/…); no raw scores | BUILDSPEC + Design-canon | BUILDSPEC §32.6/§49.5 | Content | NEEDS_RATIFICATION / DEFERRED | — | DEFER (final band copy OPEN) | Mon Lexique.md: "kesin ifade OPEN" |
| CB-81 | AI generates variation not curriculum; supported/prohibited AI roles | Product-Brain | PB-049/050/051 | Content | SETTLED | — | ALREADY CANON | Routing/quotas = Engineering |
| CB-82 | AI content behavior: status-boundary, per-lesson tables, calm bounded, no unseen leak | Design-canon | ai-gen contract | Content | NEEDS_RATIFICATION | — | RATIFY (authoring) | AI dormant; activation stage = Engineering (open) |
| CB-83 | Journey transitions narrate support change, do not mechanically gate | Product-Brain | PB-081 | Content/Brand copy | SETTLED | — | ALREADY CANON | Transition copy = Content/Brand |
| CB-84 | Summit "think in French" + final "show the way" narration copy | Derived (legacy-calibrated) | Home and Journey.md | Content/Brand | NEEDS_RATIFICATION / DEFERRED | — | DEFER (recalibration open) | Thresholds legacy 24-lesson; Summit-threshold = PB-056; artwork = Brand |
| CB-85 | L0 is a first-use bridge, not Lesson 1 | ADR | ADR-0006 | Content (copy) | SETTLED | — | ALREADY CANON | Sequencing = Curriculum |
| CB-86 | "First 3 minutes" / first-use quality is top content priority | Design-canon | MVP Canon §3 | Content | SETTLED | — | RATIFY | Prioritization = Product Brain |
| CB-87 | Campfire content GENERATED from owned inventory + errors (C1); may tease ahead | Founder-locked | ANSWERS §5 (C1); ADR-0025 | Content (authoring) | SETTLED | Q12 | RATIFY C1; route position to PB | Paywall position/price = Product Brain (open Q) |
| CB-88 | Daily Review = calm retrieval from eligible pool only; no pressure | Design-canon | learning-engine §13 | Content (+Eng) | SETTLED | — | RATIFY | Eligibility compute = Engineering |
| CB-89 | Hub drills DERIVED (deriveDrill, fail-closed); AI never grades | ADR | ADR-0022 | Engineering (primary) | ROUTE_TO_OTHER_BIBLE | — | ROUTE to Engineering + Content cross-ref | Content keeps "generation can't invent syllabus" |
| CB-90 | Batch production policy: Unit slice, one PR = one Haktan review, sequential | Founder-locked (Operator-approved) | CFC §1.1–§2 | Content (pedagogy) | SETTLED | — | RATIFY | PR/CI mechanics = Engineering/process |
| CB-91 | Required per-lesson/per-item authoring ledger | Derived (Policy Hardening) | CPW 2026-07-18 | Content | NEEDS_RATIFICATION | Q2 | RATIFY as authoring policy | Unenforced; retro-audit pending; `founderReviewStatus` unfilled |
| CB-92 | Content-safety review checklist + anti-gaming rules | Derived (Policy Hardening) | CPW 2026-07-18 | Content | NEEDS_RATIFICATION | Q2 | RATIFY as authoring policy | Not runtime-enforced |

---

### Coverage check

All 92 IDs (CB-01…CB-92) present. **Exclusive primary-status distribution (sums to 92; updated after the 2026-07-24 Reading correction):** SETTLED **60** · NEEDS_RATIFICATION **21** · TUNABLE **2** · CONFLICT **2** · DEFERRED **6** · ROUTE_TO_OTHER_BIBLE **1** · SUPERSEDED **0** (as a *primary*). *(Change: CB-26 CONFLICT→SETTLED-editorial; CB-50 CONFLICT/INCOMPLETE→NEEDS_RATIFICATION with a founder-set principle.)* Cross-cutting (non-exclusive) overlays, counted separately so nothing is lost: the **tunable-parameter register** spans ~14 numbers across CB-13/15/16/22/26/38 etc. (only CB-13/CB-16 are *primarily* tunable); **~15 decisions route a facet** (enforcement/sequencing/tone/artwork) while retaining the Content authoring core (only CB-89 is *primarily* routed — see pack §7); **supersession flags** sit on CB-30 (name), CB-40–43 (fixed-L40 superseded), CB-72 (legacy 11-section) plus the separate archive-supersession list in the extraction's "Missing Founder Decisions". Several rows also show a secondary status (CB-08, CB-22, CB-66, CB-68, CB-75, CB-80, CB-84, CB-87).

Every `NEEDS_RATIFICATION` / `CONFLICT` row maps to a live founder question (the reduced set **Q1, Q2, Q3, Q4, Q7, Q8, Q10, Q11, Q12** — see pack §11) or an explicit editorial reconciliation (e.g. CB-26). No `Derived` row is labeled Founder-locked. Superseded material is marked, never presented as current. *(Merged/retired: Q5→Q4, Q6→editorial, Q9→Q8.)*

### Post-ratification roll-up (2026-07-24)

- **RATIFIED as Content canon: ~82** — 60 already-canon/settled + 21 ratified this session + CB-14 (beats≠screens). Includes deferred-systems decisions **ratified as deferred** (Instruction Weave CB-40–43; Audio CB-51–53) — their deferred *status* is now founder-confirmed.
- **ROUTED (primary owner another Bible): 1 primary** (CB-89 → Engineering) + facet-routes per pack §7 (paywall position CB-87 → Product Brain; enforcement/sequencing/tone facets).
- **OPEN (unresolved; routed to owner): ~6** — item-counting methodology (CB-22 → Curriculum/Content-ops); Reading exercise-family taxonomy + validator (G1 → Content/Engineering); French style-guide sub-policies incl. gender-inclusive treatment (G2 → style guide); Mon Lexique final band copy (CB-80); Summit narration recalibration (CB-84); Build/Stretch/Challenge runtime (CB-75 → Engineering).
- **SUPERSEDED (historical, do not revive):** "every Reading ends in production"; fixed-L40 monolingual transition; Franglais name; legacy 11-section flow; + the archive-supersession list.

*End of Decision Matrix v0.1. Analysis complete; founder-ratified 2026-07-24. Authorizes no code/lesson/ADR change; feeds `CONTENT_BIBLE_v1.0.md`.*
