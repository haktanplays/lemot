# L20 — Pre-Campfire Milestone Gate Review / Pre-Spec Scope

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/ai-generation-contract-v1.md` + `docs/syllabus/L10-L20-band-map-v0.md` + **`docs/syllabus/L18-L20-sequence-decision-v1.md`** (the ratified sequence, incl. FP-C) + `docs/bibles/content/CONTENT_BIBLE_v1.0.md` §6.8 + `PRJ_015_ITEM_COUNTING_CONTRACT_v1.0.md` + the L16 / L19 specs and the **shipped** L0–L19 corpus and runtime.
> **Pre-spec planning/review only.** This is a **gate review**, NOT the L20 lesson spec. It authorizes **no** code, content, registry, flag, or runtime change and creates **no** canonical identity. Locked product canon wins on conflict. Dev APK runtime (L1–L5 only) is unaffected.

> ## Founder decisions locked before this review
>
> 1. **`journeyRole: "milestone"`.** 2. **`acquisitionDemandItemIds: []`.** 3. **Job:** pre-Campfire capability checkpoint — *prove integrated capability using already-owned French.* 4. **FP-C:** exactly one bounded recognition-only futur-proche hook at the **end** of L20 — 0 demands, 0 identities, never a production target.
>
> **L20 is NOT** a vocabulary lesson · a new-grammar lesson · another Integration lesson · a broad review dump · a Campfire lesson · a futur-proche ownership lesson.

> **⚠️ First planned shipped Milestone.** Content Bible §6.8.5 records that *"Review and Milestone have no shipped examples, so their contracts remain empirically unvalidated."* L20 is the first. **Milestone behaviour is therefore not yet empirically validated**, and anything this gate asserts about how a Milestone should feel is a first attempt to be checked against smoke, not settled practice.

> **Why this gate exists.** L20 carries two risks that no earlier lesson had. First, **it can only fail downward into L19** — a second consecutive zero-demand recombination lesson, distinguished from the last one by nothing but "fewer hints", which is not a milestone. Second, **"milestone" invites inventing product machinery** — gates, unlocks, pass/fail thresholds — that the app does not have. This gate settles both from shipped evidence before a screen is written.

---

## 1. Executive Summary

- **What is L20's job?** **Test more than it teaches.** The learner demonstrates they can carry a small French moment end-to-end with substantially less supplied structure than any earlier lesson. The question it answers is *"can the learner now do something coherent with the French they own?"* — not *"can they hit isolated lesson targets?"*
- **What distinguishes it from L19 — measurably?** **Where its production ladder starts.** **Every shipped lesson L13–L19 opens at support rank 4 (`supported`).** L20 opens at **rank 2 (`context`)** and never offers a `supported` or `mid` beat at all: **2 → 1 → 0**. L20 *begins* where L19's ladder *finishes*, and below every lesson in the integration sequence it follows. **The numeric ladder itself is not a corpus first** — `v1-lesson-009` already ships `2 → 1 → 0` (see §3.1). The claim is scoped to the L13–L19 band it exits, not to the whole corpus.
- **What does it own?** **Nothing.** Zero demands, zero identities, zero new systems.
- **What about FP-C?** Representable honestly and with precedent — an `insight-card` carrying French with **no `targetItemIds` and no `itemId` anywhere**. Forty shipped screens already use that exact shape. See §7.
- **Is "milestone" a runtime gate?** **No.** `journeyRole` has **no runtime consumer anywhere** — grep-verified. Milestone is currently a **curriculum role, not a product gate**, and the spec must not pretend otherwise.

> **Headline finding.** The band map gives L20 one line — *"capability proof; threshold toward Campfire"* — and leaves *proof* undefined. Left undefined it becomes a coverage sweep: every owned system paraded once so the milestone "feels" complete. **That is the failure mode**, and it is the opposite of a capability checkpoint: a checklist tests recall, while a milestone tests whether the learner can *choose*. **The design lever is not content breadth — it is withdrawal of scaffolding plus genuine route choice.**

---

## 2. Capability entering L20

Verified against **shipped** `lesson-000.ts … lesson-019.ts` and the 63-identity registry, not planning docs.

| Capability | Owned surface | From |
|---|---|---|
| Greet · thank · leave | `bonjour` · `merci` · `au revoir` | L0/L1/L6 |
| Polite request | `je voudrais + noun` · `s'il vous plaît` | L1 |
| Say who/what I am | `je suis + state` · `c'est` | L2/L3 |
| Negate | `ne…pas` · `je ne suis pas` · `ce n'est pas` | L3 |
| Human state | `j'ai faim` | L4 |
| Noun packages | `un café` · `une question` | L5 |
| Movement | `je vais à la maison` | L7 |
| Ask where | `c'est où ?` *(frozen)* | L8 |
| Small action | `faire une pause` *(package)* | L9 |
| Help / permission | `je peux + inf.` · `vous pouvez m'aider` | L11 |
| Yes/no question | `est-ce que + owned clause` | L12 |
| Place pronoun | `j'y vais` · `on y va` | L14 |
| Obligation | `il faut + inf.` · `je dois + inf.` | L15 |
| Ask a person / say how I am | `ça va` · `ça ne va pas` · `je suis fatigué(e)` / `content(e)` | L17 |
| Ask what a thing is like | `C'est comment ?` · `Comment ça va ?` | L18 |
| **Carry a two-sided exchange** | greet → ask → hear → answer → ask about a place → act → close | **L19** |

**Availability is not coverage.** The smallest set that makes a coherent human moment:

**Social:** `chunk-bonjour` · `chunk-ca-va` · `adverb-comment` · `chunk-je-suis` · `adj-fatigue` · `adj-content`
**Practical:** `chunk-il-faut` · `chunk-je-peux` · `chunk-faire-une-pause`
**Place / movement:** `noun-cafe` · `chunk-c-est` · `chunk-on-y-va` · `word-y-place`
**Close:** `chunk-merci` · `chunk-au-revoir`

**Deliberately not required** though owned: `je voudrais`, article packages, `j'ai faim`, `je vais à la maison`, `c'est où ?`, `est-ce que`, `vous pouvez m'aider`, `je dois`. Any may appear if a learner's chosen route uses it; **none is an obligation, and none may be forced in for coverage.**

---

## 3. L19 vs L20 — the real progression

| Dimension | **L19** | **L20** |
|---|---|---|
| Role | integration | **milestone** |
| Production ladder | **4 → 3 → 2 → 0** | **2 → 1 → 0** — no `supported`, no `mid` |
| Who decides the turn | **the lesson** — each weave names the exact move (*"Say you're not okay, and say why"*) | **the learner** — a situation is given; which owned capabilities it needs is their call |
| Sequencing | prescribed reciprocal spine, beat by beat | **not prescribed** — several owned routes are valid |
| Supplied pieces | required labelled pieces at the opening beat | **none required anywhere** |
| Success | hitting the authored recombination targets | **communicative coherence** of one moment |
| Screens | 10 | **compact** — a milestone need not be large |
| New material | none | none |

**The test.** *If L20 collapses into "L19 but harder", the design has failed.* The measurable part is where the ladder starts: **every lesson in the L13–L19 band opens at rank 4**, and L20 opens at rank 2 without ever offering a `supported` or `mid` beat. The learner does not get an easier version of the same lesson — they get the same moment **without the scaffolding that made L19 teachable**.

**What the ladder does NOT prove, stated plainly.** Opening at rank 2 is not by itself unprecedented: `v1-lesson-005`, `v1-lesson-008` and `v1-lesson-009` all open at rank 2, and **`v1-lesson-009` already has the exact `2 → 1 → 0` sequence**. The ladder is therefore evidence that L20 exits its own band, not evidence of a globally new shape. The stronger structural test is §3.1, and the decisive test is not structural at all: **no L20 production beat may re-ask an L19 reference answer with less support.** That is a per-beat check on the authored candidate, and no validator performs it.

**And the difference is not bought with novelty.** L20 stays at zero demands. What changes is how much of the moment the learner supplies.

### 3.1 The structural distinction actually observed

Measured against the shipped corpus (L0–L19) while reviewing the first L20 candidate, the combination that no shipped lesson has is:

| | Observation |
|---|---|
| **No `meet-card`** | all 20 shipped lessons have one; nothing is met because nothing is new |
| **No `fill-with-traps`** | all 20 shipped lessons have one; nothing is chosen from supplied options |
| **Meaningful production begins at contextual retrieval** | first production beat is `weave` · `context`, not `supported` |
| **Bounded learner agency** | several independently-owned routes are accepted, inside existing deterministic validation |
| **End-to-end communicative performance** | one whole moment carried at rank 0 |

**Descriptive, not a rule.** This records how the *first* Milestone candidate came out. It is **not** promoted to a Milestone invariant and **must not** become a validator: a later Milestone that uses a meet-card or a fill is not thereby defective. Nothing in the Factory checks any of it, and nothing should be wired to.

---

## 4. canDo

> **"Carry a short familiar moment in French from start to finish, using what I already know."**

**"Familiar"** and **"what I already know"** are doing real work: they bound the claim to owned language. The canDo promises **no** free conversation, **no** spontaneous general French, **no** broad independence, **no** repair competence, **no** past or future narration. The learner still operates inside bounded owned language, and the sentence says so.

**Weak-point recovery, milestone status and FP-C are all absent from it** — they are internal architecture, not capabilities the learner experiences.

---

## 5. The exit proof

> **The learner carries one small French moment end to end, choosing which owned capabilities it needs.**

**Shape, not script.** A coherent moment plausibly runs: **open → ask → answer honestly → act on what you heard → close.** Asking about a place, proposing a pause, or heading off are all legitimate middles — **none is mandatory.**

**A milestone is not a checklist.** The proof is that the moment *hangs together*, not that six systems each appeared once. A learner who greets, asks, answers, proposes a break and closes has proved integration; adding a place question to "cover" L18 proves nothing further.

**One end-to-end performance is the centerpiece**, and it must differ materially from every earlier exercise — not a longer version of an L19 weave, and not L16's one-sided moment.

---

## 6. Support, retrieval and choice

**Withdrawal, not hostility.** The milestone must require genuine retrieval, but the first meaningful task should not be a cliff.

| | Ruling |
|---|---|
| Opening beat | **`context`** (rank 2) — a scene, no required pieces. Already lower support than any shipped lesson's opening. |
| Middle beat | **`open`** (rank 1) |
| Final performance | **say-it-your-way** (rank 0), `model-answer-only` |
| Required `suggestedPieces` | **none anywhere** |
| Recovery route | the deterministic reveal on each weave; `hintCloze` **may** hold a shape but must not spell the answer |
| Offline | `model-answer-only` fallback, as every lesson L0–L20 |

**Choice, inside existing infrastructure only.** Route choice comes from what the schema already supports: **`expectedAnswers` + `acceptedAlternatives`** on weaves, and **`model-answer-only`** on the say-it, where nothing is graded and the reveal offers a model plus `naturalAlternatives`. **No free-form runtime evaluation is invented, and none is needed.**

Genuine choices the moment can legitimately leave open: which state is true (`fatigué` / `content`), whether a pause is needed, whether to ask about the place or propose moving, how to close. **Each alternative must be independently owned** — a choice between an owned and an unowned route is not a choice.

---

## 7. FP-C — representation audit

**The question that had to be answered from the schema, not assumed: can a lesson carry French that references no identity?**

**Yes, with heavy precedent.** The ITEM-REFERENCE guard checks exactly three sites — `screen.targetItemIds`, payload `highlights[].itemId`, payload `suggestedPieces[].itemId` — and **all three are optional**. Shipped evidence:

- **Every `s00` goal card in all 20 lessons** carries `targetItemIds: []`/absent.
- **Every recap** does the same.
- **L7 s09, L8 s10, L9 s09, L10 s10** are `natural-reveal` screens carrying French in `modelAnswer`/`naturalAlternatives` with **zero** targets.
- `insight-card` payload carries `examples: [{ fr, en, note }]` — and **`examples` has no `itemId` field at all**, so it cannot reference an identity even by accident.

**Ratified representation: FP-C is an `insight-card`, with no `targetItemIds`, carrying its French in `examples`.**

Why this is not merely legal but *safe*:

| Property | Why it holds |
|---|---|
| No identity minted | `examples` has no `itemId` field |
| Not an acquisition demand | `acquisitionDemandItemIds: []` |
| Not a production target | meaningful production is `weave` + `say-it-your-way` **only**; an insight-card is neither |
| Not a Practice Hub source | the Hub reuses **only** `fill-with-traps` and `weave` |
| Not evidence | no `evidenceTargetItemIds`, no targets to fall back to |
| Cannot be drilled | `derive-drill` works from registry ids; there is no id |

**No mismatch found. This is a CANON-CLEAN and FACTORY-CLEAN representation.** No futur-proche identity is minted, and none may be — doing so would convert FP-C from a preview into ownership, which is exactly what the sequence decision retired.

---

## 8. FP-C content

**No exact wording was previously ratified.** The sequence decision fixed the *properties* (recognition-only, 0 demands, 0 identities, end of L20, no production target, no claim that L7 or L17 previewed it) but not the sentence. **Recorded here as a founder-level content decision:**

> **`Je vais faire une pause.`** — *"I'm going to take a break."*

**Why this and nothing larger:**

- **Both halves are already met surfaces** — `je vais` as L7's frozen movement chunk, `faire une pause` as L9's package — so nothing in it is strange.
- **What is new is only the joint**, which is precisely futur proche. The learner sees a familiar shape doing something it has never done.
- **It sits one word away from `Il faut faire une pause.`**, which they *do* own and have produced in L16 and L19. The contrast lands without a single line of grammar explanation.
- **One sentence.** A second example would start to look like a paradigm.

**Framing requirement.** The card must produce *"I can see where French is going next"* — **never** *"I am now expected to use this."* No exercise may request it, no reveal may accept it, and **the recap must not list it among what the learner did.**

**Explicitly forbidden alongside it:** any conjugation of `aller`, any second futur example, any explanation of how futur proche is formed, and any claim that L7 or L17 previewed it — **neither did**, and the sequence decision records that correction.

---

## 9. Why FP-C is recognition-only and not ownership

Futur proche is one of the four **headline engines reserved for the paid/promise zone** (band map §5). Owning it pre-Campfire spends the strongest reason the learner has to cross. FP-C's whole design is to **build desire without spending the engine**: the learner recognises the shape, cannot produce it, is never asked to, and gets no credit for it. **Zero demands and zero identities are what make that structurally true rather than a matter of authoring restraint** — there is nothing to demand and nothing to score.

---

## 10. Milestone pass semantics vs runtime

**Two different things, and conflating them would be fiction.**

| | Reality |
|---|---|
| **Pedagogical milestone proof** | what L20 asks the learner to demonstrate: one coherent moment carried end to end from owned language |
| **Product progression / gating** | **none exists.** `journeyRole` has **no runtime consumer** — grep-verified across `app/`, `components/` and `content/learning-engine/`. Nothing reads it, nothing gates on it, no unlock is computed from it. |

**Ruling: "Milestone" is currently a curriculum role, not a runtime gate.** On completion the app does exactly what it does for any lesson. **No unlock, threshold, badge, score or pass/fail may be invented, implied, or written into learner copy.** If a milestone gate is ever wanted, that is separate product and Engineering work with its own decision.

---

## 11. Campfire boundary

**L20 is PRE-Campfire.** L21–L24 still exist and Campfire remains ~L24 (band map header, settled). **No copy may say or imply "you have reached Campfire", "you've arrived", or that the journey is complete.** FP-C may foreshadow what is coming; it may not announce an arrival. The tone at the end of L20 is *"you can do this now, and there is more ahead"* — not a summit.

---

## 12. Blocked and deferred

- **Any acquisition** — active-new, supported-new, or hidden. `[]` is adjudicated.
- **The repair rail (RR-A)** — `je ne comprends pas` · `vous pouvez répéter ?` · `c'est pas grave` · bare `Comment ?`. **Milestone pressure is not a licence to resolve it.** L20 does not test conversational breakdown recovery because that capability is not owned.
- **Phantoms** — `j'ai soif` · `j'ai peur` · `j'ai besoin d'aide` · first-person `prêt` · `étudiant` · `mais` · bare `faire` · `Tu vas où ?` · `Où est … ?`. All re-verified absent from the registry.
- **New descriptive adjectives**, broader feelings vocabulary, a second question word, `Q-word + est-ce que`, inversion, `qu'est-ce que`, embedded questions.
- **Past tense**, and **future tense in any form other than the single FP-C recognition card**.
- **Object-pronoun production · advice / conditionnel · free conversation · open chat · live AI evaluation · personalization · gamified or evaluative copy.**

**New phantom found: none.** Every item named in §2 was verified present before this document was written.

---

## 13. Archetype

- **Primary: `summit-milestone`** — a real enum value, prose *Milestone / Transition (#11)*, and the value the sequence decision already locked for L20. **L20 would be the first shipped lesson to declare it.**
- **Secondary: `thematic-context`** — real enum value, prose *Thematic Vocabulary / Context (#9)*. The moment L20 tests is a human-context one, and this is the flavour L18 and L19 already carry. It adds authoring value by keeping the scene human rather than transactional. **Not a second budget.**

> Both are `[OPEN]`-flagged in the archetype doc as *legacy mixed-axis values* awaiting metadata reconciliation. They are not deprecated. L20 declaring `summit-milestone` on the content axis and `milestone` on the journey axis is **expected**, not duplication.

---

## 14. Screen architecture — conceptual, not a template

**Do not start from a screen count.** What the milestone needs:

**brief orientation → low-cost re-entry → one or two bounded capability checks → the end-to-end moment → reflection → FP-C → close.**

**Avoid:** three meet-cards · a vocabulary introduction sequence · L19's architecture repeated · a mechanically copied 4→3→2→0 ladder · extra screens added to make the milestone feel bigger. **The milestone may legitimately be compact** — and compactness is itself part of the signal that this lesson is not teaching.

**One meet-card at most**, and only if re-entry genuinely needs it; there is nothing new to meet.

---

## 15. Production / performance quality

**No universal production-count floor** — the retired global `5–8` is not resurrected. Judge instead:

- does the learner **retrieve** rather than assemble supplied pieces?
- do they **recombine across lessons**?
- is there **at least one end-to-end** communicative performance?
- is there **genuine choice** among owned routes?
- does the final performance **differ materially** from every earlier exercise?
- does success **prove the canDo**?

**PQ-2 must pass. PQ-3 stays advisory.** Milestone quality is capability proof, not production-count inflation.

---

## 16. Factory readiness prerequisites

| Check | Status |
|---|---|
| Job, role, acquisition posture | ✅ this gate |
| L19-vs-L20 distinction, measurably | ✅ §3 (ladder 2→1→0 vs 4→3→2→0) |
| canDo | ✅ §4 |
| Exit proof and choice model | ✅ §5, §6 |
| FP-C representation | ✅ §7 — canon-clean and Factory-clean |
| FP-C exact content | ✅ §8 — founder-level decision recorded |
| Milestone-vs-runtime honesty | ✅ §10 |
| Archetypes | ✅ §13 |
| **New identities required** | **none** |
| Compact spec | written alongside this gate |
| AI contract §15 L20 row | added alongside the compact spec |

**Expected preflight: `generationReady = true`, zero CF-001…CF-005, zero open founder decisions.** No CF-001 blocker: L20 demands nothing and every item it needs already ships.

---

## 17. Final Verdict

- **Ready for a compact spec?** **Yes.** The one genuinely uncertain question — whether FP-C could be represented without lying about ownership — was answered from the schema and has forty shipped precedents.
- **What should L20 own?** **Nothing.** It proves.
- **What must it absolutely NOT do?** own or produce futur proche · resolve the repair rail · invent a runtime gate · announce Campfire · sweep the corpus for coverage · re-run L19 with fewer hints · add any identity.
- **Single highest risk: the coverage sweep.** "Capability proof" reads as "show everything", and a lesson that parades every owned system tests recall, not integration. §2's deliberate exclusions and §5's "not a checklist" are the guards.
- **Close second: inventing milestone machinery.** No gate exists (§10). A spec that implies one would be describing a product that has not been built.
- **Third, and specific to this being the first Milestone:** its contract is **empirically unvalidated**. Treat authoring L20 as *contract validation work* — friction it exposes in the 0–3 band, the archetype, or the "compact is fine" assumption is a **finding to record**, not a defect to paper over.

---

## Open Items / Notes

- **Gate review (v0).** First planned shipped Milestone; behaviour unvalidated.
- **`[OPEN]`** four shipped acquisition demands still lack a clean existing `weakPointTag` (`chunk-je-peux`, `chunk-est-ce-que`, `chunk-il-faut`, `adverb-comment`) — taxonomy debt, unrelated to L20.
- **`[OPEN]` RR-A** — the orphaned repair rail. Not L20's to solve.
- **`[OPEN]` French QA** — no named-human review exists anywhere; nine identities sit at `founder_waived_provisional`. L20 adds no identity.
- **`[OPEN]`** milestone runtime gating does not exist (§10) and is not requested here.
- **Charter unchanged:** `L18+ | Open / provisional`. **This gate does not promote it.**
- **No runtime, code, content, registry, flag or ID change is authorized by this document.**

*End of L20 Pre-Campfire Milestone Gate Review. Planning/review only. Ratified: L20 = `journeyRole: milestone`, **acquisition exactly 0**, `summit-milestone` + `thematic-context`, proving integrated capability by having the learner carry one small owned moment end to end — with the production ladder opening at `context` and never offering a supported beat (**2 → 1 → 0**, against the rank-4 opening of every lesson in the L13–L19 band it exits — the numeric ladder itself is not a corpus first, `v1-lesson-009` already has it), genuine route choice inside existing deterministic validation, and exactly one recognition-only FP-C card (`Je vais faire une pause.`) carrying no identity, no demand and no production target. Milestone is a curriculum role, not a runtime gate; Campfire is not announced.*
