# L21–L24 — Pre-Campfire / Campfire-Threshold Sequence Decision (v1)

> **Sequence decision only.** Ratifies the *shape* of the last four-lesson arc before the internal validation APK boundary: each lesson's job, canDo, `journeyRole`, demand posture, archetype direction and relationship to the Campfire threshold. It authorizes **no** lesson file, **no** compact spec, **no** identity, **no** code, **no** runtime behaviour and **no** commercial mechanic. Lesson-level gate reviews and compact specs remain unauthored and are the next gate.
>
> **Precedence.** Locked product canon wins on conflict. Where this document and `docs/syllabus/L10-L20-band-map-v0.md` disagree about L21–L24, this document is newer and wins; for anything at L18–L20 the shipped lessons and `docs/syllabus/L18-L20-sequence-decision-v1.md` win over both.
>
> **Sources read (2026-08-09):** shipped `content/lessons/v1/lesson-000.ts … lesson-020.ts` and `itemRegistry.ts` (the only ownership evidence used) · `docs/bibles/curriculum/CURRICULUM_CHARTER_v1.0.md` §5, §13, §14, §15 · `docs/bibles/content/CONTENT_BIBLE_v1.0.md` §6.8, §16.6 · `docs/architecture/l0-l24-founder-build-matrix-v0.md` §3 (Tables A/B, open decision D2) · `docs/syllabus/L10-L20-band-map-v0.md` · `docs/syllabus/L18-L20-sequence-decision-v1.md` · `docs/syllabus/lesson-archetype-templates-v1.md` · `docs/syllabus/ai-generation-contract-v1.md` · `docs/learning-engine-v1.md` · `docs/DEV_APK_MVP_CANON.md`.

---

## 1. Shipped state entering L21 — reconstructed from code, not from plans

**21 lessons ship (L0–L20). 25 acquisition demands. Registry 63 identities.** Registry presence is *not* ownership: only **25** of the 63 identities are backed by a lesson acquisition demand.

### 1.1 OWNED — the 25 demand-backed surfaces

| Group | Identities |
|---|---|
| **Social frame** | `chunk-bonjour` · `chunk-merci` · `chunk-au-revoir` · `chunk-ca-va` · `adverb-comment` |
| **Identity / state** | `chunk-je-suis` · `chunk-j-ai` · `adj-fatigue` · `adj-content` |
| **Negation / polarity** | `chunk-je-ne-suis-pas` · `chunk-ce-n-est-pas` · `chunk-non` |
| **Request / object** | `chunk-je-voudrais` · `chunk-sil-vous-plait` · `chunk-un-cafe` · `chunk-une-question` · `noun-cafe` |
| **Movement / place** | `chunk-je-vais` · `chunk-on-y-va` · `word-y-place` · `chunk-c-est-ou` |
| **Action** | `chunk-faire-une-pause` |
| **Control layer** | `chunk-je-peux` (permission) · `chunk-il-faut` (obligation) · `chunk-est-ce-que` (yes/no wrapper) |

### 1.2 Capability read-out

- **Communicative:** open and close an exchange, order politely, state who and how they are, negate, ask permission, state an obligation, propose movement, take a break, wrap a yes/no question.
- **Question capabilities:** exactly **two** question moves — `c'est où ?` (place) and `Comment ça va ?` / `C'est comment ?` (manner) — plus the `est-ce que` yes/no wrapper over already-owned clauses. **No other question word is owned.**
- **Movement / place:** `je vais`, `on y va`, `j'y vais`, place-`y`, `c'est où ?`.
- **Human state:** `ça va` / `ça ne va pas`, `je suis fatigué(e)` / `content(e)`, `j'ai faim`.
- **Obligation / permission:** `il faut + inf`, `je peux + inf`; `je dois` is registry-`supported` and **never a demand**.
- **L20 proved:** the learner carries one small owned moment end to end — open, ask, answer, act, close — at support ranks 2 → 1 → 0, choosing which owned capabilities the moment needs. Not vocabulary recall; integrated capability.

### 1.3 SUPPORTED / RECOGNITION — present, not owned

`chunk-c-est` · `word-ici` · `adverb-ou-where` · `chunk-vous-pouvez` · `chunk-m-aider` · `verb-aider` · `chunk-je-dois` · `verb-aller` · `chunk-a-la-maison` · `noun-pause` · `noun-idee` · `noun-question` · `noun-faim` · `noun-the` · `chunk-un-the` · `chunk-tu-es` / `chunk-vous-etes` / `chunk-tu-es-pret` / `chunk-vous-etes-pret` · `chunk-non-merci` · `chunk-excusez-moi` · the four `sound-*` / `grammar-*` / `micro-*` meta rows. **None may be treated as learner-owned by an L21–L24 spec.**

### 1.4 DEFERRED — reserved by canon, untouched here

Full futur proche · passé composé and the whole tense architecture · full question formation (inversion, `qu'est-ce que`, embedded questions) · broad `pouvoir` · `en` / partitives · object pronouns · advice register (`tu devrais`, conditionnel) · plural and adjective agreement as systems · free conversation / live AI evaluation.

### 1.5 PHANTOM — named in prose, never owned

`chunk-je-ne-comprends-pas` · `chunk-vous-pouvez-repeter` · `c'est pas grave` (no identity at all) · bare `Comment ?` in the repair sense — collectively **RR-A**. Also `verb-faire` (no identity; `faire une pause` is a package), `Tu vas où ?` and `Où est … ?` (never shipped), and productive `tu`/`vous` address.

### 1.6 Conspicuously absent, ranked by how much it hurts inside the world the curriculum already built

1. **Quantity, price and number.** L0's very first sentence is `Je voudrais un café.` Twenty lessons later the learner still cannot say *two*, cannot ask *how much*, and cannot understand the answer. The café world is the one the curriculum built, and its most ordinary transaction is unfinishable.
2. **An answer to `C'est comment ?`** L18 shipped the question and the L18 host asymmetry records, in canon, that it **takes no French answer** — because no descriptive adjective is owned and none was invented. The curriculum created this hole itself.
3. **Repair (RR-A).** A learner who is not understood has nothing to say. See §7.
4. Past and future narration; the rest of the question system — **correctly reserved**, not gaps to close here.

---

## 2. Product / APK boundary

**Founder direction taken as the planning boundary:** *"the internal validation APK should cover L0–L24, through the Campfire threshold."*

What that does and does not mean:

| | |
|---|---|
| **Does** | L21–L24 complete the first meaningful learner arc so testers can judge a whole free journey rather than a truncated one |
| **Does NOT** | authorize a runtime paywall, entitlement, unlock or gate — **none exists**, and `journeyRole` still has **no runtime consumer** |
| **Does NOT** | assume the Campfire presentation exists. It does not. |
| **Does NOT** | pull post-Campfire curriculum forward to make the arc feel complete |
| **Unchanged** | `docs/DEV_APK_MVP_CANON.md`: the **Dev APK** remains L1–L5 functional only. The L0–L24 internal validation build is a *different* build, and nothing here changes Dev APK scope. |

**Campfire position** (~L24, soft promise gate) is **Product-Brain-owned** (Charter §13, PRJ-036). This document plans against that working direction and does not harden it.

---

## 3. The arc, in one sentence

**From proving you can be *present* in a moment to being able to *take part* in one** — say what you think (L21), ask what it costs (L22), run the whole exchange unaided (L23) — and then, at the threshold, see that everything you own happens **now**, and that *before* and *after* are what lies past Campfire (L24).

Rejected explicitly: *L21 random new thing · L22 random new thing · L23 review · L24 ceremony.*

---

## 4. Decision cards

### L21 — "Say what you think" *(title provisional)*

| | |
|---|---|
| **Why it exists** | L18 gave the learner a question it could not answer. Every earlier lesson taught them to *report* (I am tired, it has to happen, where is it) and none taught them to *evaluate*. Opinion is a distinct communicative act, and it is the smallest genuinely new act available after the milestone. |
| **CanDo** | *"Say what I think of something in French — that it's good, or not — and answer when someone asks me what a thing is like."* |
| **JourneyRole** | **`doorway`** (band 1–2) |
| **Expected demands** | **1–2** |
| **Likely acquisition** | An invariable evaluative chunk in the `c'est ___` frame (`c'est bon` is the obvious candidate), plus at most one contrast. **Invariable on purpose:** it opens no adjective agreement, no plural, no gender system. |
| **Primary archetype** | `thematic-context` |
| **Secondary archetype** | `chunk-natural-speech` |
| **Core context** | The café and the break the learner already owns — the coffee, the place, the day. No new noun inventory. |
| **Does NOT teach** | adjective agreement · a feelings/opinion vocabulary list · `très` / intensifiers as a system · `j'aime` / preference verbs · advice register · comparison |
| **Why before Campfire** | It closes a hole the shipped curriculum created and makes every earlier lesson answerable rather than one-sided. Free content that leaves a shipped question unanswerable is not "genuinely useful". |
| **Factory viability** | Full. Existing screen types, deterministic validation, no new validator, no runtime AI. |
| **Main risk** | **Thinness.** One invariable chunk can read as a footnote. Mitigation is breadth of reuse, not padding: it applies to everything already owned. L17 is the worked precedent for a recycle-dominant thematic lesson with a capped adjective. |

### L22 — "How much, how many" *(title provisional)*

> **⚠️ MECHANISM REFINED 2026-08-09 — `docs/syllabus/L22-price-gate-review.md` is authoritative over this card.** The implementation gate resolved the broad job below to **PRICE ONLY**: **1 demand (`adverb-combien`)**, canDo **"Ask how much something costs before I order it."**, price answers written as a **numeral plus `€`** and never as French words, and **productive quantity deferred to a later doorway**. Reason: every natural "how many" (`Combien de cafés ?`, `Vous en voulez combien ?`) needs `de`, plural noun morphology, determiner deletion or `en` — all reserved by §6. **This refines the mechanism; it does not reverse the sequence.** The role, archetypes, context and place in the arc are unchanged. Open item §9.1 is closed by that decision.

| | |
|---|---|
| **Why it exists** | The largest ordinary hole in the learner's own world (§1.6). It converts a polite request into a real transaction, and it is the arc's genuinely *big* new door. |
| **CanDo** | *"Ask how much something costs or how many there are, and follow the answer."* |
| **JourneyRole** | **`standard`** (band 1–4) |
| **Expected demands** | **1–3.** `combien` in the owned `c'est ___` / `est-ce que` frames is the anchor. **The number set's size and its counting treatment are deliberately NOT decided here** — see §9. |
| **Likely acquisition** | `combien` as a question word, plus a capped number slice. Production is capped; the answer is largely **heard**, not said — the learner asks, the other person answers, comprehension carries the rest. |
| **Primary archetype** | `chunk-natural-speech` |
| **Secondary archetype** | `thematic-context` |
| **Core context** | The café counter. Ordering, paying, quantity. |
| **Does NOT teach** | the plural system · `des` / partitives · full number range as active production · time-telling (`quelle heure`) · `beaucoup` / quantity adverbs · money arithmetic |
| **Why before Campfire** | A free tier whose flagship sentence is "I'd like a coffee" and which cannot ask the price reads as deliberately starved. This is the clearest APK-validation question: *does the free arc feel valuable?* |
| **Factory viability** | Full. `fill-with-traps` is well suited to hearing a price; weaves and say-it carry the asking. No new infrastructure. |
| **Main risk** | **Vocabulary dump and plural leak** — the two failures archetype #5 and #9 both warn about. A number *list* is not a capability; `deux cafés` quietly opens plural marking, which L5 explicitly deferred. |

### L23 — "The whole exchange" *(title provisional)*

> **⚠️ ARCHITECTURE RESOLVED 2026-08-09 — `docs/syllabus/L23-transaction-integration-gate-review.md` is authoritative over this card.** Two things this card left open are now decided. **(1) The canDo is superseded**: the list-shaped *"greet, order, ask what it costs, say what I think, and close"* is replaced by **"Ask what something costs, decide what to do about the answer, and tell someone afterwards how it was."** — because shipped **L22's exit already runs that list end to end**, so repeating it would make L23 "L22's say-it plus one sentence". **(2) The architecture is MODEL T, two beats welded by consequence** — the counter, where the **price determines the ending**, and afterwards, where the learner **reports** what it was like. One continuous scene was rejected: `bon` has no honest basis before the coffee is tasted. The **decision branch is ratified as load-bearing** (buy / `Merci, au revoir.`), which is also the only justification for a second price display. Role, demands, archetypes and place in the arc are **unchanged**; this refines the architecture, it does not reverse the sequence.

| | |
|---|---|
| **Why it exists** | L21 and L22 add two capabilities that have never met each other or the L0–L20 spine. Integration is warranted because there is genuinely new material to integrate — the failure mode §18 warns about does not apply. |
| **CanDo** | ~~*"Run a short real exchange from start to finish: greet, order, ask what it costs, say what I think, and close."*~~ **Superseded 2026-08-09:** *"Ask what something costs, decide what to do about the answer, and tell someone afterwards how it was."* |
| **JourneyRole** | **`integration`** (band 0) |
| **Expected demands** | **0** |
| **Likely acquisition** | None. Recombination only. |
| **Primary archetype** | `review-integration` |
| **Secondary archetype** | `thematic-context` |
| **Core context** | ~~One continuous café transaction.~~ **Refined 2026-08-09: two welded beats** — the counter, then afterwards. |
| **Does NOT teach** | anything new · a coverage sweep of every owned system · conversational repair |
| **Why before Campfire** | The threshold should be crossed by a learner who has *used* the new capabilities, not one who has just met them. It also answers the tester question *does integration still feel coherent this late?* |
| **Factory viability** | Full — L19 is the worked precedent for a zero-demand integration. |
| **Main risk** | Reading as "L19 again". L23's crossing must be the **transaction**, which L19 could not build; the L19 review's own per-beat rule applies — no L23 beat may re-ask an earlier reference answer at lower support. |

### L24 — "The threshold" *(title provisional)*

| | |
|---|---|
| **Why it exists** | The last authored lesson of the free arc. Its job is to make two things true at once: *I can already do this*, and *I can see what becomes possible next* — without fake mastery. |
| **CanDo** | *"Carry a real exchange in French on my own, and see what French I'll be able to reach for next."* |
| **JourneyRole** | **`milestone`** (band 0–3, takes **0**) |
| **Expected demands** | **0** |
| **Likely acquisition** | None. |
| **Primary archetype** | `summit-milestone` |
| **Secondary archetype** | `thematic-context` |
| **Core context** | The learner's own world, unchanged. No new setting is introduced to make a threshold feel large. |
| **Does NOT teach** | passé composé · futur proche · any promised engine, in any form beyond bounded recognition · a Campfire arrival claim · any unlock, score, threshold, percentage or badge |
| **Why before Campfire** | It *is* the boundary. Without it the APK arc stops mid-sentence. |
| **Factory viability** | Full — L20 is the worked precedent, including the recognition-only preview device (an `insight-card` with no `targetItemIds` and no `itemId`). |
| **Main risk** | **Ceremony.** A threshold lesson that mostly congratulates. Note that **PQ-2 structurally prevents this**: every lesson must contain a genuine unsupplied production action, so L24 cannot be pure reflection even if authoring drifts. |

---

## 5. Rhythm

**doorway → standard → integration → milestone**, i.e. **new capability → bigger new capability → recombine → threshold.**

This is the cadence the shipped corpus already runs (L17 standard → L18 doorway → L19 integration → L20 milestone), so it is precedent rather than a template imposed on the evidence. Checked against the failure list: not four acquisition-heavy lessons; not four zero-demand lessons; the two milestones sit four lessons apart with two acquisition lessons and an integration between them; the integration has genuinely new material; nothing is reviewed before it exists.

**Recorded risk:** L21–L24 repeats the *shape* of L17–L20. The content differs completely and L24's job (threshold) differs from L20's (proof), but a tester may still feel the pattern. If smoke says so, the lever is L21/L22 ordering, not adding a fifth slot.

**Demand posture:** L21 1–2 · L22 1–3 · L23 0 · L24 0 → **arc total 2–5**, taking the corpus from 25 to **27–30** demands across L0–L24. Bands used as they stand: doorway 1–2 · standard 1–4 · integration 0 · milestone 0–3. **No new exception is requested; L6 remains the only named exception.**

---

## 6. Headline-engine reservation — result

**No headline engine is spent.** L21–L24 open **no** futur proche, **no** passé composé, **no** full question formation, **no** broad `pouvoir`, **no** `en`/partitives.

**`combien` is a controlled question-word slice, not the question engine.** The reserved engine is the *full* system — inversion, `qu'est-ce que`, embedded questions, the whole Q-word set at once. The shipped precedent for slicing is explicit and twice-worked: L12 owned **only** the `est-ce que` yes/no wrapper and deferred every question word; L18 owned **exactly one** question word (`comment`). L22 owning one more is the same controlled move, and it leaves the system reserved.

**FP-C does not authorize anything.** L20's `Je vais faire une pause.` is recognition-only, carries no identity, and creates **no** entitlement to productive futur proche at L21 or anywhere before Campfire. The Charter's *futur-proche ownership* open item stays open and is not narrowed further by this document.

**Commercial tension, recorded rather than resolved:** the free arc must be genuinely useful *and* must not give away an engine. §4 resolves it by spending small owned slices (evaluation, quantity) that make the **existing** free content usable, rather than by opening a new system for novelty. If a later review finds the free arc still reads as starved, the lever is authoring depth inside L21–L23, **not** pulling an engine forward.

---

## 7. RR-A disposition — **PARKED**

RR-A (`je ne comprends pas` · `vous pouvez répéter ?` · `c'est pas grave` · bare `Comment ?`) is **not placed in L21–L24.**

- It is **early-curriculum debt** — the L1 prose claimed rescue chunks the shipped lesson never demanded. Repaying it at L21–L24 would be exactly the empty-slot backfill this sequence is meant to avoid, and it would not serve the arc.
- **But the audit found one real signal, recorded here rather than acted on:** L22's transaction context is the first place where the absence becomes *learner-visible* in a way testers will report — a learner who does not catch a spoken price has nothing to say. That is a finding about **where RR-A hurts**, not a reason to move it. Its home is an early-curriculum repair task with its own gate.
- Historical phantom ownership does not get to drive this sequence.

---

## 8. `weakPointTag` debt — **not sequence-blocking**

`chunk-je-peux`, `chunk-est-ce-que`, `chunk-il-faut` and `adverb-comment` are shipped demands with no clean existing tag, and the taxonomy has **no** question-formation, modal or obligation category. None of the four jobs above depends on closing that.

**One conditional flag:** if L23 is later specced as a *weak-point* integration in L19's style — authoring Hub-reusable production for thinly-covered items — the gap becomes blocking for those four, because the Practice Hub reads weakness from the item registry and an untagged item is invisible to weakness priority. That is a compact-spec-time decision, not a sequence-time one.

---

## 9. Deliberately left open — the compact-spec gate

1. ~~**L22's number set: size, and how it is counted.**~~ **CLOSED 2026-08-09 by `docs/syllabus/L22-price-gate-review.md`: there is no number set.** The price answer is a numeral plus `€` — shared orthography, not French lexis — so no number or currency identity exists, nothing is claimed about `deux` or `euros`, and the PRJ-015 counting question never arises. The "largely heard" pedagogy was also dropped: the product has **no listening exercise** (`useSpeech` is wired only to the meet-card Listen button), so no canDo may claim a learner understands a spoken price.
2. **L21's second demand, if any.** One invariable evaluative chunk may be enough for a doorway. The gate review decides.
3. **L24's promise device.** §10 states the constraints; the exact screen is compact-spec work.
4. **Titles.** All four are provisional. No canon fixes them.

---

## 10. L24 threshold semantics — four layers, kept apart

| Layer | What is true |
|---|---|
| **Curriculum role** | `journeyRole: milestone`, 0 demands, the last authored lesson of the free arc. Not a review: nothing is being re-taught. |
| **Learner experience** | A short, non-triumphal proof that they can carry a real exchange, then a bounded look at what lies beyond. **Before the threshold:** everything the learner owns happens *now* — present-tense reporting, requesting, asking, evaluating. **After it:** talking about what already happened and what is going to happen. |
| **Commercial / Campfire framing** | Campfire ~L24 is the settled *working* position for the soft promise gate. It is **Product-Brain-owned** (PRJ-036). This document plans against it and does not harden it. |
| **Runtime behaviour** | **None.** No gate, no unlock, no entitlement, no paywall, no score, no threshold check exists anywhere in the codebase, and `journeyRole` has no runtime consumer. On completing L24 the app does exactly what it does for any lesson. **No copy may imply otherwise.** |

### Promise handoff

L20 already spent one futur-proche recognition hook. **L24 must not repeat the same teaser.** The ratified direction is **contrast, not repetition**: L24 contrasts *current capability* with *next capability* on the **time axis** — everything you can say happens now; *before* and *after* are what is past the threshold.

Binding on whatever device the compact spec chooses: **the same FP-C discipline applies** — no identity minted, no acquisition demand, no production request, no recap entry, no grammar rule, and no teaching of the promised system in order to demonstrate it. Showing a system is not owning it, and the learner must not be left with fake mastery.

---

## 11. Factory viability — all four

Every job above is expressible with **current Factory V0 and the current shipped runtime**: no new screen type, no new validator, no runtime AI, no adaptive generation, no new identity semantics, no new journey role, no new archetype enum member. Deterministic validation throughout (`exact-or-alternative` on weaves, `model-answer-only` on say-it), consistent with the pre-Campfire lock that no live AI is required anywhere before Campfire.

**No infrastructure work is required by this sequence.** The single conditional dependency is §8's tag gap, and only under one optional reading of L23.

---

## 12. Genuine unresolved fork — **is L24 a Lesson, or a view?**

This is the one fork that materially changes the sequence, so it is stated rather than smoothed over.

- `docs/architecture/l0-l24-founder-build-matrix-v0.md` calls L24 a **landmark** and a *"completion/promise view (no new engine)"*, readiness **content**.
- `CONTENT_BIBLE_v1.0.md` §16.6 says **Campfire content is generated** from the learner's owned inventory and **never hardcoded**, with Product Brain owning access position.

**Option A — L24 ships as a Lesson (RECOMMENDED).** `journeyRole: milestone`, 0 demands, registered in `V1_LESSONS` exactly like L20. Rationale: (a) a Lesson is expressible today and a generated Campfire surface is not — that is unopened Engineering + PRJ-036 work; (b) §16.6 governs **post-threshold Campfire content**, i.e. what the paid zone generates, not the authored lesson that reaches the threshold; (c) the APK boundary needs something testers can actually reach, and Option B leaves the arc ending mid-sentence at L23.

**Option B — L24 is a non-lesson completion/promise surface.** Truer to the build matrix's wording, but requires runtime work that does not exist and is explicitly out of scope, and would ship an APK whose arc has no threshold.

**Recommendation: Option A.** If Product Brain later builds a generated Campfire surface, an authored L24 threshold lesson and that surface are complementary, not competing — the lesson ends the free arc, the surface begins the paid one.

---

## 13. Deferred debt, unchanged by this document

RR-A (§7) · named-human French QA — **none exists anywhere in the repo**, and no reviewer, date or `approved` status may be recorded that the founder has not supplied · the four untagged demands (§8) · `c'est pas grave` (no identity) · the prose-index ↔ `LessonArchetype` enum mismatch (prose #3, #4 and #5 have no enum member; shipped lessons map them onto `chunk-natural-speech` / `architecture-verb`) · milestone runtime gating, absent by design · **PRJ-029** post-L24 progression · **PRJ-036** Campfire position · full tense architecture · Capability Arc composition.

**One inconsistency found while inspecting the Charter and left unchanged, in scope discipline:** Charter §5 still records **L16–L17** as *"Approved spec-only continuation — authored, not implemented"*, but both are shipped lesson files. That row is stale for the same reason the `L18+` row was. It is **not** corrected here because this task scoped the Charter edit to the L18+ line; it should be corrected in a Charter-alignment pass.

---

## 14. What remains to gate and spec

Per lesson, in order, and none of it authorized by this document: **gate review → compact spec → AI-contract §15 row → Factory contract + preflight → one candidate → review → ship.** That is the same path L18, L19 and L20 took.

Nothing in L21–L24 may be authored, generated or shipped on the strength of this sequence decision alone.

---

*End of L21–L24 Pre-Campfire Sequence Decision v1. Sequence only — no lesson content, no compact spec, no identity, no code, no runtime or commercial change. Ratifies: L21 `doorway` (1–2, evaluation) → L22 `standard` (quantity and price — **refined 2026-08-09 to price only, 1 demand**; see `L22-price-gate-review.md`) → L23 `integration` (0, the whole exchange) → L24 `milestone` (0, the threshold). No headline engine is spent, RR-A stays parked, the Campfire position remains Product-Brain-owned, and no runtime gate exists or is implied.*
