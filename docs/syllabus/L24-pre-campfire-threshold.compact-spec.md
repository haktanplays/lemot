# L24 — Pre-Campfire Threshold (Compact Lesson Spec)

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/canonical-item-id-convention-v0.1.md` + `docs/syllabus/ai-generation-contract-v1.md` + **`docs/syllabus/L21-L24-pre-campfire-sequence-decision-v1.md`** (the ratified sequence) + **`docs/syllabus/L24-pre-campfire-threshold-gate-review.md`** (the scope this spec implements) + the L20 / L23 specs and the **shipped** L0–L23 corpus and runtime.
> **Compact spec** — planning/spec only. Authorizes **no** code, lesson content, candidate, flag, or runtime change. Locked product canon wins on conflict. Dev APK runtime (L1–L5 only) is unaffected.

> ## Locked inputs
>
> 1. **`journeyRole: "milestone"`.** 2. **`acquisitionDemandItemIds: []`** — adjudicated zero; no exception, no support→active promotion. 3. **`supportedItemIds: []` · `recognitionItemIds: []`** — no teaser payload (§9). 4. **Job:** prove the learner can supply the **purpose** of a French moment and carry it through, then make the boundary of the owned world visible **after** they have. 5. **No new identity.** Every item named here was verified present in `itemRegistry.ts` (65) before this spec was written.

> **⚠️ Second shipped Milestone.** `lesson-020.ts` is the only precedent. Its findings are carried forward where they still apply and **explicitly narrowed where they do not** (§4). Friction this lesson exposes in the Milestone contract is a finding to record, not a defect to hide.

---

## 1. Lesson Identity

| Field | Value |
|---|---|
| **Lesson number** | L24 |
| **Lesson title** | *(not frozen — gate review §17 lists three directions and disqualifies threshold-shaped titles; **must be performance-shaped and must not contain "decide"**)* |
| **Journey phase** | First Ascent (Core 150) · **pre-Campfire**, free · **last authored lesson of the arc** |
| **Journey role** | **`milestone`** |
| **Primary archetype** | **`summit-milestone`** |
| **Secondary archetype** | **`thematic-context`** |
| **Prerequisites** | `["v1-lesson-023"]` |
| **Estimated lesson time** | ~5–6 min — **a milestone may legitimately be compact** |
| **Monolingual mode** | `english-guided` |
| **Feedback mode** | `model-answer-only` |
| **Main can-do outcome** | **"Decide what I want out of a moment in French, and carry it through on my own."** |
| **Why a compact spec is sufficient** | L24 owns **0 grammar systems, 0 architecture verbs, 0 lexical items**. There is nothing to table. |

**Journey-role budget:** Milestone band **0–3** · L24 count **0** · **PASS**. Zero is a **pedagogical choice** — a threshold that taught something would not be a threshold. **No exception requested.**

---

## 2. The Performance Contract

**L24 tests more than it teaches. Nothing is introduced.**

> **The learner walks into a bounded moment where more than one owned purpose is live, chooses what the moment is for, and carries it end to end.**

**What is genuinely new versus every shipped lesson:** the app supplies **circumstances, not instructions.** Shipped L20's exit named the moves (*"open it, ask, say how you are, and get it to an ending"*); shipped L23's supplied the price that forced the branch. **L24 supplies where the learner is, who is there, and how much time they have — and nothing about what they want.**

**Binding, and the things most likely to be got wrong:**

1. **Routes must differ in PURPOSE, not in ending.** L20's four accepted routes are all one purpose with different exits. An L24 whose routes are all one purpose **has failed**, however well it reads.
2. **This is not a checklist.** Success is that the moment *hangs together*. Forcing an owned system in to make the milestone feel complete is a defect (§8).
3. **No new material may be added to make the threshold feel important.**
4. **The threshold is not explained before it is earned** (§7).

---

## 3. Milestone Architecture — a ladder of agency

L20's architecture was a **ladder of support**; L23's a **chain of dependency**. Both are taken. **L24 withdraws a different thing at each step.**

| Step | App still supplies | Learner supplies | Support |
|---|---|---|---|
| **Agency beat A** | situation **and** purpose | **which owned move** serves it — more than one is right, and the app never says which | `weave` · `context` · rank **2** max |
| **Agency beat B** | situation only; **nobody has asked the learner anything** | **whether to speak, and what act to perform** — the unprompted verdict lives here | `weave` · `open` · rank **1** |
| **The exit** | **circumstances only** | **purpose, moves, order, ending** | `say-it-your-way` · `model-answer-only` · rank **0** |

*move free → speech-act free → purpose free.*

**Support discipline, carried forward from L20 unchanged:** no `supported` beat · no `mid` beat · **no `suggestedPieces` marked `required` anywhere** · `hintCloze` may carry a shape but **must not spell an answer** · offline falls back to `model-answer-only`.

**Binding and load-bearing: the ranks are NOT the milestone.** There is no rank below zero and none may be invented. Any review that certifies L24 on its support ladder has checked the wrong thing — the differentiator is **architecture, breadth of owned recombination, learner agency, absence of lesson-specific rehearsal, and threshold framing.**

**Do not start from a screen count.** What the threshold needs: **brief non-spoiling orientation → agency beat A → agency beat B → the chosen moment → reflection → the boundary → close.** Avoid: a meet-card *(nothing is new to meet)* · a `fill-with-traps` *(the milestone tests retrieval, not recognition)* · L20's architecture repeated · extra screens to make the threshold feel bigger. **Compactness is part of the signal that this lesson is not teaching.**

---

## 4. Rehearsal-Leak Rule

**`same answer + same job + fewer hints` is blocked.**

| Class | Content |
|---|---|
| **SUPPLIED BEFORE IN L24** | **nothing that constitutes a purpose.** No screen may print a complete route; no screen may state or imply what the learner should want at the exit. |
| **LEARNER-RETRIEVED BEFORE IN L24** | individual owned clauses **produced unaided** at beats A and B — legitimate preparation, per `lesson-020.ts`'s shipped finding that producing a clause is not leakage when nothing printed it. |
| **NOT REHEARSED IN L24** | **the purpose, the combination, the order and the ending.** This is the proof. |

**Hard rule: no pre-exit beat may rehearse a complete route.** This is the defect L20 shipped and had to revise (R1/R2), and it is the single most likely way L24 fails.

**Narrowed from L20:** L20's per-beat rule was *"no beat may re-ask an L19 reference answer at lower support"* — scoped to L20's job of proving independence. **L24's equivalent is scoped to purpose:** no beat may establish the exit's purpose, and **no beat may re-ask `lesson-023.ts` s03's exact job** — `Le café, c'est comment ?` answered by `C'est bon.` The verdict survives in L24 only in its **unprompted** role, which is a different communicative act.

**Zero prior occurrence is explicitly not dogma** and must not be chased.

---

## 5. Owned Material — the working set

**Availability is not coverage.** All 27 demand-backed identities are available; the smallest set that makes several purposes live:

| Side | Items |
|---|---|
| **Open / close** | `chunk-bonjour` · `chunk-merci` · `chunk-au-revoir` |
| **Person** | `chunk-ca-va` · `adverb-comment` · `chunk-je-suis` · `adj-fatigue` · `adj-content` |
| **Transaction** | `adverb-combien` · `chunk-je-voudrais` · `chunk-un-cafe` · `chunk-sil-vous-plait` · `noun-cafe` |
| **Verdict** | `adj-bon` · `chunk-ce-n-est-pas` |
| **Practical / movement** | `chunk-il-faut` · `chunk-je-peux` · `chunk-faire-une-pause` · `chunk-on-y-va` · `word-y-place` |

**Host material, recycled, never claimed as new:** `chunk-c-est` — registry-`supported`, produced unaided since L18. **Any copy implying it is newly owned is a defect.**

**Owned but deliberately NOT required:** `chunk-j-ai` · `chunk-je-vais` · `chunk-c-est-ou` · `chunk-est-ce-que` · `chunk-je-ne-suis-pas` · `chunk-non` · `chunk-une-question`. Any may appear inside a learner's route. **None is an obligation and none may be forced in for coverage.**

**Rules carried forward, still binding:** `faire une pause` is a **package**, never bare `faire` · `C'est comment ?` takes `bon` and no other answer *(L18 asymmetry, lifted for `bon` only by L21)* · `Ça va.` / `Je suis fatigué(e).` answer the **person** question only · a verdict on a coffee requires that the learner **drank it**, and the copy must name it as the **drink**, never the place.

---

## 6. Learner Choice — inside existing infrastructure only

Route choice comes from what the schema already supports. **No free-form runtime evaluation is invented and none is needed.**

| Mechanism | Where |
|---|---|
| `expectedAnswers` + `acceptedAlternatives` | the two agency beats — every owned route accepted |
| `model-answer-only` + `naturalAlternatives` | the exit — nothing graded; the reveal shows a model **and** genuinely different purposes |

**TRUE AGENCY:** what the moment is for · which owned move serves it · whether to offer a verdict unprompted · the polarity of that verdict where context permits both · how and when to close.

**NOT AGENCY, and may not be counted as it:** punctuation · article variation · gender alternants (`fatigué` / `fatiguée`) · equivalent wording of one intention · the app naming the correct branch · a menu of app-defined options.

**Gate-level requirement: the exit must permit more than one genuinely coherent route, and those routes must differ in purpose.** **Every alternative must be independently owned** — a choice between an owned route and an unowned one is a trap, not a choice. **Not every French string must be free choice**; the exit is where purpose-agency is proved.

---

## 7. The Threshold Reveal — earned, and after

**Order is binding:**

1. the learner performs;
2. the app reflects what they did — **nobody told them what they wanted**;
3. the boundary becomes visible — everything they said belonged to the moment they were standing in;
4. *before* and *after* are named as **next territory**, in English, as concepts.

**Nothing in steps 2–4 may appear before step 1.** **No lesson-goal card may name the threshold, the boundary, time, tense, or what comes next.** The opening card may say only that nothing is new and that the moment is the learner's. A goal card that spoils the reveal turns a horizon into an instruction.

**Screen type:** the reflection and the boundary are `natural-reveal` and/or `insight-card` — **no `targetItemIds`, no `itemId` anywhere, and no French carried in `examples`.** Unlike L20's FP-C card, **this device carries no French at all**, because it makes no forward *form* available (§9).

---

## 8. Breadth Without Coverage

**Threshold quality test, binding:** *does the learner control several owned capabilities in one meaningful moment, or does the lesson demonstrate syllabus coverage?*

**PROHIBITED:** item checklist · grammar checklist · lesson-number callbacks · "remember L8 / L12 / L18" · any route required so an earlier lesson appears · any reveal listing what has been covered.

**Concrete guard: the model answer must be a moment, not an inventory.** A route naming every owned capability is a coverage sweep even when every word is owned. **At least one accepted route must be materially shorter than the model** — `lesson-020.ts` s03 already ships that shape.

---

## 9. Recognition / Supported Posture — and the FP-C decision

**`supportedItemIds: []` · `recognitionItemIds: []`. No teaser payload.**

**English conceptual framing does this job more honestly than unowned French:** a past/future sample would demonstrate the exact systems the arc reserves, the forward look here is about a **boundary** rather than a **form**, and L20 already spent the corpus's one recognition-only preview.

**L20's FP-C hook — decision: not referenced, not depended on.** `Je vais faire une pause.` is **not replayed, not recalled, not promoted, not mentioned.** The existence of a "later" is named in English as a concept only. **Binding: the threshold must land for a learner with no conscious memory of L20's card.**

---

## 10. Linguistic Honesty — present / before / after

**"Everything you know is present tense" is FALSE for this corpus and is PROHIBITED as copy.**

`chunk-je-voudrais` is a **conditionnel** form — it glosses *"I would like"*, carries `weakPointTags: ["politeness", "conditional-softness"]`, and has been owned since L0's first sentence. `faire une pause` is an infinitive package. `bonjour` / `merci` / `au revoir` / `s'il vous plaît` / `non` are formulae with no tense. `bon` is an adjective. Only `il faut`, `c'est`, `ça va`, `on y va`, `je vais`, `je suis`, `j'ai`, `je peux` are present indicative.

**The ratified framing is deixis, not tense:**

> **Everything you can currently do stays inside the moment you're in.**

True of all four groups above, requires no grammar name, and needs no walking back when the learner meets the conditional properly.

**Binding: no L24 copy may use *present tense* / *past tense* / *future tense* or any grammar-system name, and none may assert a tense fact about the owned corpus.** This is not a tense chart and must not become one.

---

## 11. Threshold vs Runtime — no faked mechanics

| | Reality |
|---|---|
| **Pedagogical proof** | one moment whose purpose the learner supplied, carried end to end from owned language |
| **Product gating** | **none exists.** `journeyRole` has **no runtime consumer** — nothing reads it, nothing gates on it, no unlock is computed from it. |

**"Milestone" is a curriculum role, not a runtime gate.** On completing L24 the app does exactly what it does for any lesson.

**Permitted curriculum language:** *there is more French beyond the moment you are in* · *before and after are next territory* · *you have reached a point where the shape of French changes.*

**BLOCKED runtime/product claims:** unlocked Campfire · checkpoint passed · next area opened · score achieved · level complete · gate · entitlement · badge · percentage · pass/fail · "you've arrived" · "the journey is complete."

**L24 does not use the word *Campfire* in learner copy** — the position is Product-Brain-owned (PRJ-036), no runtime surface exists, and the threshold works entirely without the product noun.

**M6, binding: L24 must make complete sense if no runtime Campfire gate ever exists.**

---

## 12. The Bounded Promise

**Exact permissible learner-facing claim:**

> **You can walk into a small French moment, decide what you want from it, and get it done in French.**

**PROHIBITED:** fluent · conversational · mastered French · ready for anything · completed A1 · unlocked real French · finished a level · any fraction-of-French claim.

**Campfire curiosity: capability first → limit second → next territory third.** Curiosity must emerge from **capability, not deprivation**. Prohibited: *"you can't really speak yet"* · manufactured frustration · paywall teasing · feature marketing · any framing where the learner's current French is the punchline.

---

## 13. Boundary Table

| Item | Classification |
|---|---|
| everything in §5 | **RECYCLED** — the working set |
| the learner-chosen moment | **THE PROOF** |
| the post-performance boundary reveal | **REFLECTION** — English, no French, no identity, no target |
| **any acquisition** — active-new, supported-new, hidden | **PROHIBITED** |
| any temporal adverb — `hier` · `demain` · `avant` · `après` · `plus tard` | **PROHIBITED** — no identities |
| past tense in any form, **including recognition** | **PROHIBITED** |
| futur proche in any form, **including recognition**; any replay of `Je vais faire une pause.` | **PROHIBITED** (§9) |
| any French number word · `euro` / `euros` · `combien de` · `de` / `des` · `en` · partitives · `coûter` · `ça fait combien` · `l'addition` | **PROHIBITED** |
| price adjectives (`cher`, `pas cher`, `trop cher`) · `mauvais` · `j'aime` / `j'adore` · `mais` | **PROHIBITED** — no identities |
| **`Non, merci.`** | **PROHIBITED** — `chunk-non-merci` is supported, never owned; the owned decline is `Merci, au revoir.` |
| `C'est pas bon.` · attributive `un bon café` · `bonne` / `bons` / `bonnes` · `très` | **PROHIBITED** — unlicensed register / no agreement is owned |
| a second question word · `qu'est-ce que` · inversion · embedded questions | **PROHIBITED** |
| any new noun, adjective, verb or connective | **PROHIBITED** |
| RR-A — `je ne comprends pas` · `vous pouvez répéter ?` · `c'est pas grave` · bare `Comment ?` | **PROHIBITED** — threshold pressure is not a licence |
| `vous pouvez m'aider ?` as a required or modelled route | **PROHIBITED** — composed from supported pieces |
| `Le café, c'est comment ?` answered by `C'est bon.` | **PROHIBITED** — `lesson-023.ts` s03 exactly (§4) |
| a verdict on a coffee the learner has not drunk; a verdict whose referent reads as the **place** | **PROHIBITED** |
| the words *present tense* / *past tense* / *future tense* or any grammar-system name | **PROHIBITED** (§10) |
| the word **Campfire** in learner copy | **PROHIBITED** (§11) |
| any unlock / score / threshold / checkpoint / percentage / badge / level / pass-fail copy | **PROHIBITED** (§11) |
| any arrival, completion, A1 or fluency claim | **PROHIBITED** (§12) |
| any claim the learner understood something **spoken** | **PROHIBITED** — no listening exercise exists |
| copy implying `chunk-c-est` is newly owned | **PROHIBITED** |
| coverage sweeps · lesson-number callbacks | **PROHIBITED** (§8) |
| free conversation · open chat · live AI evaluation · personalization | **PROHIBITED** |
| en/em dashes in learner copy | **PROHIBITED** |

---

## 14. Continuity Map

| Field | Value |
|---|---|
| **Carry-in — L17/L19/L20** | the person side, and the end-to-end moment itself |
| **Carry-in — L21** | `adj-bon` — the verdict, here in its **unprompted** role |
| **Carry-in — L22** | `adverb-combien` — the only owned move that makes a non-social purpose possible |
| **Carry-in — L23** | the **capability** of acting on what you found out — used, never re-staged |
| **New introduced** | **nothing** |
| **Carry-out** | → the boundary. *Before* and *after* are named as territory, in English, with no French made available. |
| **Fade plan** | agency rises A → B → exit; nothing graduates status, because nothing is acquired |

> **Principle check** (engine §8): introduces new — **deliberately nothing** ✓ (Milestone) · grows old — asks for a purpose the learner must supply ✓ · prepares future — one bounded, French-free boundary ✓.

---

## 15. Mon Lexique Implications

**No new entry.** L24 creates no identity. **No status change** — nothing moves recognition→supported or supported→active. Items worked gain another authored encounter **through existing rules only**.

**No milestone vocabulary logic, no fake mastery event, no special-case surfacing.** Manufacturing a Mon Lexique moment for a threshold is invented machinery, blocked on the same grounds as a fake unlock.

---

## 16. Surface Inventory — required before generation

**Binding: ownership → scratch Surface Inventory → screens.** The candidate task **must** create `/tmp/.../scratchpad/l24/surface-inventory.md` **before writing any screen**:

**A** eligible owned moment families · **B** anchor surfaces · **C** genuine route alternatives · **D** post-L20 capability surfaces · **E** end-to-end milestone routes · **F** blocked/unowned language · **G** threshold copy concepts · **H** final-exit provenance plan.

**Per French surface:** communicative job · items/chunks · ownership class · learner behaviour · route membership · variation dimension.

**Scratch only. Not tracked, no validator, no framework, no L0–L23 backfill.**

**Item H must show that no purpose was supplied**, classifying every clause of every accepted route as SUPPLIED BEFORE / LEARNER-RETRIEVED BEFORE / NOT REHEARSED.

**Quality test the candidate task must answer:** *"Does L24 create genuinely different **purposes** from known material, or does it repeat known sequences?"* — no numeric quota, no padding.

---

## 17. Factory Viability

Expressible with **current Factory V0 and the shipped runtime**: existing screen types only, deterministic validation (`exact-or-alternative`, `model-answer-only`), no runtime AI, no new validator, no new identity semantics, no new journey role, no new archetype member. Zero demands means preflight has no acquisition to resolve. **No infrastructure work is required and none is authorized.**

If a desired pedagogical effect cannot be represented on existing screen types, **re-shape it into the smallest honest existing-screen architecture** — do not modify the Factory.

---

## 18. QA Risks / Success Criteria

| Risk | Guard |
|---|---|
| **"L20 again"** — routes that differ only in ending | §2.1. **Check this first in smoke:** read the accepted routes and name each one's purpose. If they all have the same purpose, the lesson has failed and no validator will say so. |
| **"L23 again"** — a staged price branch, a welded report, or `C'est comment ?` → `C'est bon.` | §4. Check the exit supplies **no number that forces an action**. |
| **English doing the communicative work** | §2. Every situation sentence must be a **fact about the world**, not an instruction. Any sentence naming a move, a goal or an order of business is a defect. |
| **Coverage sweep** | §8. A route naming every owned capability is disqualifying. |
| **Threshold explained too early** | §7. Read the goal card first: if it mentions time, boundaries, tense or what comes next, the reveal is spoiled. |
| **Tense claim** | §10. Search the copy for *present*, *past*, *future*, *tense*. Any hit is a defect. `je voudrais` is a conditional. |
| **Invented machinery** — unlock, score, checkpoint, Campfire arrival | §11. None exists in the codebase. |
| **Fake choice** — alternatives that are not independently owned | §6 |
| **Transcription test** — one long canonical string required | §3; the exit is `model-answer-only` |
| **Verdict referent** — `le café` read as the place | §5. Name the drink and state that the learner drank it. |
| **French QA** | L24 adds **no identity**, so no identity-level debt. Any sentence it authors is nonetheless unreviewed: **no named-human French QA exists anywhere in this repo**, and no reviewer, date or `approved` status may be recorded that the founder has not supplied. |

**Success criteria:** the learner supplies the purpose · accepted routes differ in **purpose**, not ending · the moment hangs together · post-L20 capability is materially used · the threshold lands **after** the proof · the boundary copy is honest about deixis rather than tense · nothing implies a runtime gate · **PQ-2 must pass; PQ-3 stays advisory. No production-count floor is imposed.**

---

*End of L24 Pre-Campfire Threshold Compact Spec. Spec only — no lesson content, no candidate, no code, no runtime change. L24 = `journeyRole: milestone`, **acquisition exactly 0**, `supportedItemIds: []`, `recognitionItemIds: []`, `summit-milestone` + `thematic-context`, canDo **"Decide what I want out of a moment in French, and carry it through on my own."** Architecture is **MODEL I** — a **ladder of agency** (move free → speech-act free → purpose free) in which the app supplies **circumstances, not instructions**, ending in one learner-chosen moment. The threshold reveal is **earned after the performance**, carries **no French**, names the boundary as **deixis rather than tense** (`je voudrais` is a conditional), and makes **no runtime, Campfire, unlock or arrival claim** — the lesson must make complete sense if no gate ever exists.*
