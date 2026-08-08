# L20 — Pre-Campfire Milestone (Compact Lesson Spec)

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/canonical-item-id-convention-v0.1.md` + `docs/syllabus/ai-generation-contract-v1.md` + `docs/syllabus/L10-L20-band-map-v0.md` + **`docs/syllabus/L18-L20-sequence-decision-v1.md`** (the ratified sequence, incl. FP-C) + **`docs/syllabus/L20-pre-campfire-milestone-gate-review.md`** (the scope this spec implements) + the L16 / L19 specs and the **shipped** L0–L19 corpus and runtime.
> **Compact spec** — planning/spec only. Authorizes **no** code, lesson content, flag, or runtime change. Locked product canon wins on conflict. Dev APK runtime (L1–L5 only) is unaffected.

> ## Founder-locked inputs
>
> 1. **`journeyRole: "milestone"`.** 2. **`acquisitionDemandItemIds: []`** — adjudicated zero; no exception, no support→active promotion. 3. **Job:** pre-Campfire capability checkpoint — **test more than it teaches.** 4. **FP-C:** exactly one recognition-only futur-proche hook at the end — 0 demands, 0 identities, never a production target. 5. **No new identity.** Every item named here was verified present in `itemRegistry.ts` (63) before this spec was written.

> **⚠️ First planned shipped Milestone.** The Milestone contract has **no shipped precedent** (Content Bible §6.8.5). Authoring L20 is also **contract validation work**: friction it exposes is a finding to record, not a defect to hide.

---

## 1. Lesson Identity

| Field | Value |
|---|---|
| **Lesson number** | L20 |
| **Lesson title** | *(spec-level placeholder — the compact spec does not freeze a title; keep it plain and non-triumphal, and see §9 on Campfire)* |
| **Journey phase** | First Ascent (Core 150) · **pre-Campfire**, free |
| **Journey role** | **`milestone`** — the lesson's job is to prove integrated capability, not to teach |
| **Primary archetype** | schema **`summit-milestone`** (prose *Milestone / Transition (#11)*) — **first shipped use** |
| **Secondary archetype** | schema **`thematic-context`** (prose *Thematic Vocabulary / Context (#9)*) — keeps the moment human rather than transactional. Not a second budget. |
| **Prerequisites** | `["v1-lesson-019"]` |
| **Estimated lesson time** | ~5–6 min — **a milestone may legitimately be compact** |
| **Monolingual mode** | `english-guided` |
| **Feedback mode** | `model-answer-only` |
| **Practice Pool expansion** | Build + Stretch + Challenge (lesson-scoped) |
| **Main can-do outcome** | **"Carry a short familiar moment in French from start to finish, using what I already know."** |
| **Why a compact spec is sufficient** | L20 owns **0 grammar systems, 0 architecture verbs, 0 lexical items**. There is nothing to table. |

**Journey-role budget, recorded separately from the pedagogical reason:** Milestone band **0–3** · L20 count **0** · **PASS**. Zero is a **pedagogical choice** — a checkpoint that taught something would not be a checkpoint — not merely a budget fit. **No exception requested.**

---

## 2. The Performance Contract

**L20 tests more than it teaches. Nothing is introduced.**

> **The learner carries one small French moment end to end, choosing which owned capabilities it needs.**

A coherent moment plausibly runs **open → ask → answer honestly → act on what you heard → close.** Asking about a place, proposing a pause, or heading off are legitimate middles; **none is mandatory.**

**Binding, and the thing most likely to be got wrong:**

1. **This is not a checklist.** Success is that the moment *hangs together* — not that every owned system appeared once. A learner who greets, asks, answers, proposes a break and closes has proved integration. Adding a place question to "cover L18" proves nothing further and **must not be required**.
2. **One end-to-end performance is the centerpiece**, and it must differ materially from every earlier exercise — not a longer L19 weave, not L16's one-sided moment.
3. **No new material may be added to make the milestone feel important.**

---

## 3. Support Model — the structural signature

**Measured fact this rests on: every shipped lesson L13–L19 opens its production ladder at support rank 4 (`supported`).** L20 does not.

| Beat | Type | Support rank | Required pieces |
|---|---|---|---|
| Re-entry | `weave` · `weaveType: "context"` | **2** | **none** |
| Capability check | `weave` · `weaveType: "open"` | **1** | **none** |
| The moment | `say-it-your-way` · `model-answer-only` | **0** | **none** |

**Ladder: 2 → 1 → 0. No `supported` beat, no `mid` beat, anywhere.**

**L20 begins where L19 ends.** That is the mechanical difference between a milestone and "L19 with fewer hints", and it is visible in the corpus rather than asserted.

**Withdrawal, not hostility:**
- the deterministic reveal on each weave is the recovery route;
- `hintCloze` **may** carry a shape but **must not spell the answer**;
- **no `suggestedPieces` may be marked `required` anywhere in the lesson**;
- offline falls back to `model-answer-only`, as everywhere L0–L20.

**Success must not require transcribing one long canonical string.** The say-it is `model-answer-only` — nothing is graded — and the weaves must accept every genuinely-owned route (§4).

---

## 4. Learner Choice — inside existing infrastructure only

Route choice comes from what the schema already supports. **No free-form runtime evaluation is invented and none is needed.**

| Mechanism | Where |
|---|---|
| `expectedAnswers` + `acceptedAlternatives` | the two weaves — every owned route accepted |
| `model-answer-only` + `naturalAlternatives` | the say-it — nothing graded; the reveal shows a model *and* alternatives |

**Legitimate open choices:** which state is true (`fatigué` / `content`) · whether a pause is needed · whether to ask about the place or propose moving · how to close.

**Binding: every alternative must be independently owned.** A choice between an owned route and an unowned one is not a choice — it is a trap.

---

## 5. Owned Material — the working set

**Availability is not coverage.** The smallest set that makes a coherent moment:

| Side | Items |
|---|---|
| **Social** | `chunk-bonjour` · `chunk-ca-va` · `adverb-comment` · `chunk-je-suis` · `adj-fatigue` · `adj-content` |
| **Practical** | `chunk-il-faut` · `chunk-je-peux` · `chunk-faire-une-pause` |
| **Place / movement** | `noun-cafe` · `chunk-c-est` · `chunk-on-y-va` · `word-y-place` |
| **Close** | `chunk-merci` · `chunk-au-revoir` |

**Owned but deliberately NOT required:** `je voudrais` · article packages · `j'ai faim` · `je vais à la maison` · `c'est où ?` · `est-ce que` · `vous pouvez m'aider` · `je dois`. Any may appear if a learner's route uses it. **None is an obligation, and none may be forced in for coverage.**

---

## 6. Representative Sentence Families

> Illustrative of shape and ownership, **not a frozen script and not a required sequence.** Every line is buildable from §5.

| Move | Owned options *(any is valid)* |
|---|---|
| Open | `Bonjour !` |
| Ask | `Comment ça va ?` · `Ça va ?` |
| Answer | `Ça va.` · `Ça ne va pas.` · `Je suis fatigué(e).` · `Je suis content(e).` |
| Act | `Il faut faire une pause.` · `Je peux faire une pause ?` |
| Place *(optional)* | `Le café, c'est comment ?` · `C'est comment ?` |
| Move *(optional)* | `On y va ?` · `J'y vais.` |
| Close | `Merci.` · `Au revoir.` |

**Rules carried forward, still binding:** `C'est comment ?` **takes no French answer** (L18 host asymmetry) · `Ça va.` / `Je suis fatigué(e).` answer the **person** question only · `faire une pause` is a **package**, never bare `faire`.

---

## 7. FP-C — the recognition-only futur hook

**Representation (audited against the schema, gate review §7):** an **`insight-card`** with **no `targetItemIds`** and **no `itemId` anywhere**, carrying its French in `examples`. Forty shipped screens already use the no-targets shape; `examples` **has no `itemId` field at all**, so it cannot reference an identity even by accident.

**Content (founder-level decision, gate review §8):**

> **`Je vais faire une pause.`** — *"I'm going to take a break."*

Both halves are met surfaces (`je vais`, L7 frozen; `faire une pause`, L9 package); **what is new is only the joint.** It sits one word from `Il faut faire une pause.`, which the learner owns and has produced — so the contrast lands with no grammar explanation.

**Binding restrictions:**

| Rule | |
|---|---|
| Placement | the **last content beat**, after the performance and the reflection, **before** the recap |
| Screen type | `insight-card` — never a weave, fill, or say-it |
| Identity | **none minted.** Minting one would convert preview into ownership and violate FP-C |
| Acquisition | **not** in `acquisitionDemandItemIds` |
| Production | **no exercise may request it**; no reveal may accept it |
| Recap | **must not list it** among what the learner did |
| Scope | **one sentence.** No second example, no `aller` conjugation, no explanation of how futur proche is formed |
| Provenance | **no claim that L7 or L17 previewed it** — neither did |

**Framing:** the card must produce *"I can see where French is going next"* — **never** *"I am now expected to use this."*

**Why recognition-only:** futur proche is one of the four headline engines reserved for the paid/promise zone. Zero demands and zero identities make non-ownership **structurally true** rather than a matter of authoring restraint — there is nothing to demand and nothing to score.

---

## 8. Milestone Pass Semantics vs Runtime

| | Reality |
|---|---|
| **Pedagogical proof** | one coherent moment carried end to end from owned language |
| **Product gating** | **none exists.** `journeyRole` has **no runtime consumer** — nothing reads it, nothing gates on it, no unlock is computed from it. |

**"Milestone" is a curriculum role, not a runtime gate.** On completion the app does exactly what it does for any lesson.

**Binding: no unlock, threshold, badge, score, percentage or pass/fail may be invented, implied, or written into learner copy.** If a milestone gate is ever wanted, that is separate product and Engineering work.

---

## 9. Campfire Boundary

**L20 is PRE-Campfire.** L21–L24 still exist; Campfire remains ~L24.

**No copy may say or imply "you have reached Campfire", "you've arrived", or that the journey is complete.** FP-C may foreshadow; it may not announce an arrival. The closing tone is *"you can do this now, and there is more ahead"* — **not a summit**, despite the archetype's name.

---

## 10. Boundary Table

| Item | Classification |
|---|---|
| everything in §5 | **RECYCLED** — the working set |
| the end-to-end moment | **THE PROOF** |
| `Je vais faire une pause.` | **RECOGNITION-ONLY**, insight-card, no identity, no demand, no production (§7) |
| **any acquisition** — active-new, supported-new, hidden | **PROHIBITED** |
| `je ne comprends pas` · `vous pouvez répéter ?` · `c'est pas grave` · bare `Comment ?` | **PROHIBITED** — RR-A. Milestone pressure is not a licence to resolve it. |
| `j'ai soif` · `j'ai peur` · `j'ai besoin d'aide` · first-person `prêt` · `étudiant` · `mais` | **PROHIBITED** — no identities |
| bare `faire` / any infinitive slot | **PROHIBITED** — no `verb-faire` |
| `Tu vas où ?` · `Où est … ?` | **PROHIBITED** — never shipped |
| a French answer to `C'est comment ?` | **PROHIBITED** — L18 asymmetry |
| new descriptive adjectives · broader feelings vocabulary | **PROHIBITED** |
| a second question word · `Q-word + est-ce que` · inversion · `qu'est-ce que` · embedded questions | **PROHIBITED** |
| past tense · future tense **outside the single FP-C card** | **PROHIBITED** |
| producing, drilling or explaining futur proche | **PROHIBITED** |
| object-pronoun production · advice / conditionnel | **PROHIBITED** |
| free conversation · open chat · live AI evaluation · personalization | **PROHIBITED** |
| any runtime gate, unlock, score or Campfire-arrival claim | **PROHIBITED** (§8, §9) |
| coverage sweeps — forcing an owned system in so the milestone "feels complete" | **PROHIBITED** (§2) |

---

## 11. Screen Architecture — conceptual

**Do not start from a screen count.** What the milestone needs:

**brief orientation → low-cost re-entry → one or two bounded capability checks → the end-to-end moment → reflection → FP-C → close.**

**Avoid:** three meet-cards · a vocabulary introduction sequence · L19's architecture repeated · a mechanically copied 4→3→2→0 ladder · extra screens to make the milestone feel bigger. **At most one meet-card**, and only if re-entry genuinely needs it — there is nothing new to meet.

**Compactness is part of the signal that this lesson is not teaching.**

---

## 12. Continuity Map

| Field | Value |
|---|---|
| **Carry-in — L11/L14/L15** | `je peux` · place-`y` · `il faut` |
| **Carry-in — L17/L18** | the person side and the one question word |
| **Carry-in — L19** | the two-sided exchange itself — L20 asks for it again **without the scaffolding** |
| **New introduced** | **nothing** |
| **Carry-out** | → **L21–L24**, the Campfire approach. FP-C is the only forward signal, and it is recognition-only. |
| **Fade plan** | support falls **2 → 1 → 0**; nothing graduates status, because nothing is acquired |

> **Principle check** (engine §8): introduces new — **deliberately nothing** ✓ (Milestone) · grows old — asks for L19's capability unscaffolded ✓ · prepares future — one bounded FP-C preview ✓.

---

## 13. Mon Lexique Implications

**No new entry.** L20 creates no identity. Items worked gain another authored encounter; **`Je vais faire une pause.` contributes nothing** — it has no identity to attach to, which is the point.

**No status change.** Nothing moves recognition→supported or supported→active.

---

## 14. QA Risks / Success Criteria

| Risk | Guard |
|---|---|
| **Coverage sweep** — every owned system paraded once | §2 and §5's deliberate exclusions. **Check this first in smoke.** |
| **"L19 with fewer hints"** | §3's ladder: if a `supported` or `mid` beat appears, the milestone signature is gone |
| **Invented milestone machinery** — unlock, score, threshold | §8; no runtime gate exists |
| **Campfire arrival copy** | §9 |
| **FP-C drifting into ownership** — an identity, a production target, a recap chip | §7's restriction table |
| **Fake choice** — alternatives that are not independently owned | §4 |
| **Transcription test** — one long canonical string required | §3; the say-it is `model-answer-only` |
| **French QA** | L20 adds **no identity**, so no identity-level debt. Any sentence it authors is nonetheless unreviewed: **no named-human French QA exists anywhere in this repo**, and no reviewer, date or `approved` status may be recorded that the founder has not supplied. |

**Success criteria:** the learner retrieves rather than assembles · recombines across lessons · completes **one** end-to-end performance · has **genuine choice** among owned routes · the performance differs materially from earlier exercises · success proves the canDo. **PQ-2 must pass; PQ-3 stays advisory. No production-count floor is imposed.**

---

*End of L20 Pre-Campfire Milestone Compact Spec. Spec only — no lesson content, no code, no runtime change. L20 = `journeyRole: milestone`, **acquisition exactly 0**, `summit-milestone` + `thematic-context`, proving integrated capability by having the learner carry one small owned moment end to end. Its structural signature is the support ladder **2 → 1 → 0** — no `supported` beat, no `mid` beat — against every shipped lesson's rank-4 opening: **L20 begins where L19 ends.** Exactly one recognition-only FP-C card, `Je vais faire une pause.`, carries no identity, no demand and no production target. Milestone is a curriculum role, not a runtime gate, and Campfire is not announced.*
