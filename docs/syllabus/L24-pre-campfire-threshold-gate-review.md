# L24 — Pre-Campfire Threshold · Gate Review

> **Gate review only.** Ratifies L24's threshold job, its architecture, its agency model and its prohibitions. Authorizes **no** lesson file, **no** candidate, **no** identity, **no** code, **no** runtime behaviour and **no** commercial mechanic. The compact spec is the companion document; a candidate task is the next gate after that.
>
> **Precedence.** Locked product canon wins on conflict. Where this document and `docs/syllabus/L21-L24-pre-campfire-sequence-decision-v1.md` §4 (the L24 card) disagree, this document is the implementation gate and wins on **architecture, canDo and device**; the sequence decision still wins on **role, demand count and place in the arc**, which this document does not change.
>
> **Sources read (2026-08-09):** shipped `content/lessons/v1/lesson-000.ts … lesson-023.ts` and `content/itemRegistry.ts` (the only ownership evidence used) · `content/factory/lessonContract.ts` · `content/lessonTypes.ts` (`LessonArchetype`, `JourneyRole`) · `docs/syllabus/L21-L24-pre-campfire-sequence-decision-v1.md` · `docs/syllabus/L20-pre-campfire-milestone.compact-spec.md` · `docs/syllabus/L23-transaction-integration-gate-review.md` · `docs/syllabus/L23-transaction-integration.compact-spec.md` · `docs/syllabus/ai-generation-contract-v1.md` §15 · `docs/syllabus/lesson-archetype-templates-v1.md`.

---

## 1. Shipped inputs — what L24 has to work with

**24 lessons ship (L0–L23). 27 acquisition demands. Registry 65 identities. 11 provisional French-QA rows.** L24 adds **none** of these.

### 1.1 The 27 demand-backed surfaces — the entire owned world

| Group | Identities |
|---|---|
| **Social frame** | `chunk-bonjour` · `chunk-merci` · `chunk-au-revoir` · `chunk-ca-va` · `adverb-comment` |
| **Identity / state** | `chunk-je-suis` · `chunk-j-ai` · `adj-fatigue` · `adj-content` |
| **Negation / polarity** | `chunk-je-ne-suis-pas` · `chunk-ce-n-est-pas` · `chunk-non` |
| **Request / object** | `chunk-je-voudrais` · `chunk-sil-vous-plait` · `chunk-un-cafe` · `chunk-une-question` · `noun-cafe` |
| **Movement / place** | `chunk-je-vais` · `chunk-on-y-va` · `word-y-place` · `chunk-c-est-ou` |
| **Action** | `chunk-faire-une-pause` |
| **Control layer** | `chunk-je-peux` · `chunk-il-faut` · `chunk-est-ce-que` |
| **Evaluation (L21, post-L20)** | `adj-bon` |
| **Price (L22, post-L20)** | `adverb-combien` |

**`chunk-c-est` is registry-`supported`, never a demand.** The learner has produced it unaided since L18 and every shipped lesson through L23 uses it. L24 may use it as recycled host material and **may not** claim it is newly owned. Same for `word-ici`, `chunk-vous-pouvez`, `chunk-m-aider`, `chunk-je-dois`, `chunk-a-la-maison`, `chunk-non-merci`, `chunk-excusez-moi`: present, not owned, never a milestone route.

### 1.2 The capability delta since L20 — §10 answered

| Lesson | Added | Materially alters L24's proof? |
|---|---|---|
| **L21** | `adj-bon` — a verdict on a thing, both polarities | **YES.** It is the only owned move whose content is **purely the learner's own** — not obtainable from anyone, not scripted by circumstance. Agency has nowhere else to live this cleanly. |
| **L22** | `adverb-combien` — the price question | **YES.** It is the only owned move that makes a **non-social purpose** possible. Before L22 every reason to open your mouth was a person; after it, the learner can walk in wanting something and go and find it out. |
| **L23** | no identity — the *pattern* of letting a received fact decide the next move | **PARTIALLY, and deliberately so.** The **capability** is available and may appear inside a learner's route. The **exercise** — a supplied price forcing a branch — must not be reproduced. L24 uses what L23 taught the learner to do; it does not re-run L23's drill. |

**Verdict: L24's existence is justified by L21 and L22, not by L23.** Both of them changed what a moment can be *for*, and that is precisely the axis L24 tests.

### 1.3 Conspicuously unavailable, and correctly so

Past tense in every form · futur proche beyond L20's single recognition card · `hier` / `demain` / `avant` / `après` / `plus tard` (no identities) · number words · `euro`/`euros` · quantity `de`/`des`/`en` · a second question word · RR-A. **None of these may be opened to make a threshold feel large.**

---

## 2. The threshold thesis — audited and refined

**As given:**

> *You can now be inside a real French moment without being walked through it. What you own lets you act in the present; talking about what happened before or what will happen after belongs beyond this point.*

**Refined, and the refinement is load-bearing:**

> **You can now walk into a French moment with your own reason for being there, and get it done. Everything you own belongs to the moment you are standing in. Stepping outside it — what happened before you got there, what happens after you leave — is the next territory.**

Two changes, both forced by evidence:

1. **"without being walked through it" → "with your own reason for being there."** L20 already proved un-walked-through performance (§3). The un-proved thing is **intention**, not independence.
2. **"act in the present" → "belongs to the moment you are standing in."** The present-tense formulation is **linguistically false** for this corpus. See §11.

---

## 3. L20 vs L24 — the comparison

| | **L20 (shipped)** | **L24 (proposed)** |
|---|---|---|
| **Role** | `milestone` | `milestone` |
| **canDo** | *"Carry a short familiar moment in French from start to finish, using what I already know."* | *"Decide what I want out of a moment in French, and carry it through on my own."* |
| **Scene** | Outdoors, passing a café, meeting someone known. **One kind of business is possible.** | One bounded setting where **several kinds of business are possible** at once. |
| **Demands** | 0 | 0 |
| **Production ranks** | `context` 2 → `open` 1 → say-it 0 | opens no higher than `context`; ends at 0. **Ranks are not the differentiator** (§6). |
| **Final performance** | *"Take the whole moment: open it, ask, say how you are, and get it to an ending."* — **the app names the moves** | circumstances only. **The app names where, who and how long, and nothing about what the learner wants.** |
| **Agency** | four routes, all one purpose: greet → ask → state → close. Routes vary the **ending**. | routes vary the **purpose**. A transaction route, a social route and a leaving route are all correct and are not the same moment. |
| **Support** | no `supported`, no `mid`, no required pieces | identical discipline, carried forward unchanged |
| **Material available then** | 25 demands. No verdict, no price question. Every owned reason to speak was a person. | 27 demands. A learner can want a fact and can hold an opinion. |
| **Forward-looking content** | exactly one recognition-only card, `Je vais faire une pause.` | **none in French.** The forward look is conceptual and English-only (§12). |

**Measured, not asserted.** L20's four accepted exit routes (`lesson-020.ts` s03) are `Bonjour ! Comment ça va ? Je suis fatigué. Il faut faire une pause. On y va ?` and three variants. All four greet, ask after the person, report a state and close. **No L20 route has a purpose other than "have a friendly exchange and end it."** That is the whole finding.

### D1 — What capability did L20 prove?

**That the learner can execute a moment whose shape they were given.** L20 removed the scaffolding, not the script: the situation still stated the moves in order. The proof was *independence of execution* — nobody hands you the words — against a purpose the app supplied.

### D2 — What can L24 prove that L20 literally could not?

**That the learner can supply the purpose.** At L20 this was impossible, and not for authoring reasons: with 25 demands, **every owned reason to open your mouth was another person.** The learner could greet, ask how someone was, report their own state, propose a break, propose moving, and close. They could not want a fact (`combien`, L22) and they could not hold an opinion (`bon`, L21). A lesson cannot ask *what do you want out of this moment* when only one kind of wanting exists.

L21 and L22 each added exactly one word, and between them they made a second and third kind of purpose possible. **L24 is the first lesson in the corpus at which the question "what are you here for?" has more than one owned answer.**

### D3 — Why is L24 not "the whole moment, again"?

Because L20's whole moment had **one purpose and four exits**, and L24's has **several purposes**. The distinction is measurable in the reveal: L20's alternatives differ in how the moment *ends*; L24's must differ in what the moment is *for*. An L24 whose accepted routes are all one purpose with different endings **has failed and must be rejected at review**, regardless of how well it reads.

### D4 — Why is L24 worth existing as a separate Milestone?

Three reasons, none of which is "more content":

1. **It tests a capability that did not exist four lessons ago.** Purpose-selection is not a bigger version of L20's proof; it is a different axis. L20 tested the verb of the milestone, L24 tests the subject.
2. **It is the only lesson positioned to make the boundary visible.** A threshold shown before the learner has proved anything is a warning; shown after, it is a horizon. Only the last lesson of the arc can earn it (§10).
3. **It restores what L23 correctly took away.** L23's pedagogy required constraint — the board decides, and the learner has no choice at two of its five beats. Ending the free arc on constraint would end it on the learner being told what to do. **The arc's last word should be the learner's.**

---

## 4. L23 vs L24 — practice vs proof

| | |
|---|---|
| **P1 — What does L23 constrain?** | **The next move, by an external fact.** `lesson-023.ts` s01/s02 are the same question under `2 €` and `8 €` with two different correct actions; its design notes state plainly that these beats are *"CONDITION-DETERMINED — the board decides, and the learner has no choice."* The scene, the goal and the branch are all supplied. |
| **P2 — What does L24 give back?** | **The purpose.** Not the wording, not the ending — the reason for being there. L24 supplies circumstances; the learner supplies the intention and everything that follows from it. |
| **P3 — What does L24 test independently?** | L23 **practised** dependency against a condition the app named. L24 tests whether the learner can run a moment **when nothing names the branch** — including deciding that a transaction is what this moment is for, obtaining what they need, and stopping when done. The dependency skill is exercised without the dependency being staged. |
| **P4 — What realization occurs only after?** | That every choice they just made — what to want, what to ask, what to think, when to leave — **happened inside one moment they were standing in**, and that nothing they own reaches outside it. The learner cannot notice this while performing; it is only visible looking back at a performance that was entirely theirs. |

**The distinction the task predicted is confirmed by corpus evidence:** L23 = *the situation determines several correct next moves*; L24 = *the learner owns the shape of the moment and chooses a coherent route from already-owned material.*

**L24 must NOT:** stage a price branch · supply a number that forces an action · re-ask `Le café, c'est comment ?` and take `C'est bon.` as its answer (that is `lesson-023.ts` s03 exactly, and repeating it at lower support is the blocked *"same answer, same job, fewer hints"*) · weld two beats by consequence · reproduce L23's counter-then-afterwards shape.

---

## 5. Model comparison — A, B, C, D

| Model | Strength | Why it lost / won |
|---|---|---|
| **A — open real-world moment** | Maximum agency, which is exactly the axis L24 needs. | **Lost as stated, won as bounded.** Unbounded, the app cannot honestly respond: a `say-it-your-way` reveal must show alternatives that are *all independently owned*, and an unbounded scene invites routes the learner does not own. The agency is right; the boundlessness is not. |
| **B — choice of owned scenes** | Proves transfer across families. | **Lost.** Offering café / social / movement as three labelled options makes the milestone a menu, and the learner proves transfer by *picking*, not by *doing*. §9's sampler risk is real, and a menu also externalizes the choice the lesson is trying to test — the app still defines the purposes and the learner selects one. |
| **C — one rich transactional moment** | Coherent, and the strongest pre-Campfire world. | **Lost, decisively.** greet → ask → decide → order → evaluate → close **is shipped L23's canDo verbatim**, and shipped L22's exit already runs greet → ask the price → order. C is not a risk of being L23 again; C *is* L23 again. |
| **D — MODEL I, the chosen intention** *(Model A, bounded)* | One setting in which **more than one owned purpose is live**, described by **circumstances rather than instructions**; the learner chooses what the moment is for and carries it end to end. | **CHOSEN.** It keeps A's agency, takes B's boundedness without B's menu, and inverts C: the transaction is *available* rather than required. It is the only model under which the app supplies less than L20 did. |

**MODEL I is Model A made honest, not a fourth invention.** Recorded that way so the provenance stays visible.

### The chosen architecture — a ladder of agency

L20's architecture was a **ladder of support** (2 → 1 → 0). L23's was a **chain of dependency**. Neither is available to L24: §7 forbids inventing a rank below zero, and L23 owns the dependency chain.

**L24's ladder is agency — the app withdraws a different thing at each step:**

| Step | What the app still supplies | What the learner supplies |
|---|---|---|
| **Agency beat A** | the situation **and** the purpose | **which owned move** serves it — more than one is right, and the app does not say which |
| **Agency beat B** | the situation only; **nobody has asked the learner anything** | **whether to speak at all, and what act to perform** — an unprompted verdict is live here |
| **The exit** | **circumstances only** — where, who is there, how much time | **the purpose, the moves, the order and the ending** |

*move free → speech-act free → purpose free.* This is not L20's ladder with different numbers; it is a different quantity being withdrawn. **Support ranks still obey L20's discipline** — nothing opens at `supported` or `mid`, no `suggestedPieces` is `required`, no `hintCloze` spells an answer — but the ranks are **not** what makes this a milestone (§6/§7 compliance).

### One performance or two? — ONE

**ONE end-to-end performance**, learner-chosen in purpose. Breadth comes from the **choice**, not from doing two things.

Two compact proofs were considered and rejected: two exits at the end of the free arc dilute the only emotional climax the arc has, and — more seriously — two performances would have to differ by *world* to be worth the second slot, which is the sampler §9 forbids. The agency beats already carry transfer, because beat B lives in a different world from the exit.

---

## 6. Milestone = ownership, not lower rank

**No scaffold arithmetic was performed and none may be.** L24 does not need "something below rank 0" and no such thing exists. Its differentiation is:

- **architecture** — a ladder of agency, not of support;
- **breadth of owned recombination** — several purposes live in one setting;
- **learner agency** — the purpose itself is unspecified, a corpus first;
- **absence of lesson-specific rehearsal** — no pre-exit beat may establish the exit's purpose (§8);
- **threshold framing** — earned after the performance, never before.

**Support rank alone is not the milestone**, and any review that certifies L24 on its ladder has checked the wrong thing.

---

## 7. Breadth without a coverage sweep

**Threshold quality test, binding:**

> *Does the learner control several owned capabilities in one meaningful moment, or does the lesson demonstrate syllabus coverage?*

**Prohibited:** an item checklist · a grammar checklist · lesson-number callbacks · "remember L8 / L12 / L18" · any route required in order to make an earlier lesson appear · any reveal that lists what the learner has covered.

**The concrete guard:** the model answer must be **a moment, not an inventory**. A route that names every owned capability is a coverage sweep even if every word in it is owned. At least one accepted route must be **materially shorter** than the model, as `lesson-020.ts` s03 already demonstrates (its shortest route is about half its longest).

---

## 8. Rehearsal / support leak

Carrying L20's discipline forward, scoped to what L24 actually risks. **`same answer + same job + fewer hints` is blocked.**

**Classification of the exit's material:**

| Class | What belongs in it |
|---|---|
| **SUPPLIED BEFORE IN L24** | **nothing that constitutes a purpose.** No screen may print a complete route, and no screen may state or imply what the learner should want at the exit. |
| **LEARNER-RETRIEVED BEFORE IN L24** | individual owned clauses the learner **produced unaided** at beats A and B. Legitimate — `lesson-020.ts` established that producing a clause is preparation, not leakage, because nothing printed it. |
| **NOT REHEARSED IN L24** | **the purpose, the combination, the order and the ending.** These are the proof. |

**Target: the exit is RECOMBINATION under a self-chosen intention, not reconstruction.** Zero prior occurrence is explicitly **not** dogma (§18 of the task) and was not attempted; the corpus-wide precedent is that owned surfaces recur.

**One hard rule, because it is the failure L20 actually shipped and had to revise:** **no pre-exit beat may rehearse a complete route.** L20's R1/R2 corrections were exactly this defect caught late.

---

## 9. Agency — what counts

**TRUE AGENCY** (all present in MODEL I): the learner chooses **what the moment is for** · chooses which owned move serves it · chooses whether to offer a verdict when nobody asked · chooses the polarity of that verdict where the context permits both · chooses how and when to close.

**NOT AGENCY, and may not be counted as it:** punctuation · article variation · gender agreement alternants (`fatigué` / `fatiguée`) · equivalent wording of one intention · the app telling the learner which branch is correct · a menu of app-defined options.

**Gate-level requirement:** *the final milestone must permit more than one genuinely coherent learner route, and those routes must differ in purpose.* Every alternative must be **independently owned** — a choice between an owned route and an unowned one is a trap, not a choice.

**Not every French string must be free choice.** Beats A and B may accept a small closed set; the exit is where purpose-agency is proved.

---

## 10. The post-performance threshold reveal

**Shape, and the order is binding:**

1. the learner performs;
2. the app reflects what they just did — **nobody told them what they wanted**;
3. the app makes the boundary visible — everything they said belonged to the moment they were standing in;
4. *before* and *after* are named as **next territory**, in English, as concepts.

**Nothing in steps 2–4 may appear before step 1.** No lesson-goal card may name the threshold, the boundary, time, tense, or what comes next. A goal card that spoils the reveal converts a horizon into an instruction, and the realization stops being earned. The opening card may say only that nothing is new and that the moment is the learner's.

### Draft conceptual copy — direction only, not payload

> *Nobody told you what you wanted this time. You picked it, and the French came after.*
>
> *Look at where all of it happened. You were standing in that moment, and everything you said belonged to it — what you wanted, what you asked for, what you thought of it.*
>
> *French also lets you step out of the moment: what happened before you got there, what happens after you leave. That is the next territory, and it is not today's.*

**Audited:** no grammar lesson · no tense name · no claim that all owned French is present tense (§11) · no promise of an unlock · no arrival · no congratulation on completing anything.

---

## 11. Present / before / after — the linguistic honesty audit

**The broad wording *"everything you know is present tense"* is FALSE for this corpus and is PROHIBITED.** Audited against every owned production surface:

| Surface | Why "present tense" is wrong or unsafe |
|---|---|
| **`je voudrais`** | **Conditionnel.** `chunk-je-voudrais` glosses as *"I would like"* and carries `weakPointTags: ["politeness", "conditional-softness"]`. It is a conditional form, it is the **first sentence of the entire course** (L0), and it is owned. This alone falsifies the claim. |
| **`faire une pause`** | Infinitive inside an owned frame; the registry treats it as one package, and there is no `verb-faire` identity. |
| **`bonjour` · `merci` · `au revoir` · `s'il vous plaît` · `non`** | Formulae and interjections. No tense at all. |
| **`bon`** | Adjective. No tense. |
| **`il faut` · `c'est` · `ça va` · `on y va` · `je vais` · `je suis` · `j'ai` · `je peux`** | Present indicative — the only group for which the claim would hold. |

**The safe framing, and the one this gate ratifies:**

> **Everything you can currently do stays inside the moment you're in.**

This is **deixis, not tense**. It is true of `je voudrais` (a conditional form making a request *now*), true of the frozen formulae, true of the infinitive package, and true of the present-indicative group. It requires no grammar name, introduces no tense chart, and does not have to be walked back later when the learner meets the conditional properly.

**Binding:** no L24 copy may use the words *present tense*, *past tense*, *future tense*, or any other grammar-system name, and none may assert a tense fact about the owned corpus.

---

## 12. Campfire, and the runtime distinction

**L24 does not say "Campfire" in learner copy.** Audited and decided:

- Campfire's position is **Product-Brain-owned** (PRJ-036) and is a working direction, not hardened canon.
- **No runtime surface exists.** `journeyRole` has no runtime consumer; nothing gates, unlocks, scores or checks. Naming Campfire would make a product promise the app cannot keep.
- The threshold works **entirely as curriculum language**. It needs no product noun.

| Layer | Permitted in L24 |
|---|---|
| **Curriculum language** | *there is more French beyond the moment you are in* · *before and after are next territory* · *you have reached a point where the shape of French changes* |
| **Product / runtime claims** | **BLOCKED**: unlocked Campfire · checkpoint passed · next area opened · score achieved · level complete · gate · entitlement · badge · percentage · pass/fail · "you've arrived" · "the journey is complete" |

**No mechanic may be faked.** On completing L24 the app does exactly what it does for any lesson, and no copy may imply otherwise.

### M6, restated because it is the point

**L24 must make complete sense if no runtime Campfire gate ever exists.** It does: the entire threshold is delivered in-lesson as reflection, and the lesson's value is the performance. L24 is pedagogical canon, not fake runtime infrastructure.

---

## 13. L20's FP-C hook — decision

**Decision: do not reference it, and do not depend on it.** Of the four options: **A for the French surface, B for the concept.**

- **`Je vais faire une pause.` is not replayed, not recalled, not promoted, and not mentioned.** Replaying it would spend a second promise teaser on the same system the sequence decision already ratified as spent, and §10 of that document requires **contrast, not repetition**.
- The *existence* of a "later" is named **in English, conceptually**, as part of the before/after framing — which is not a recall of L20's card and does not require the learner to have noticed it.
- **Binding: the threshold must land for a learner with no conscious memory of L20's FP-C card.** If any L24 copy stops working when that card is forgotten, the copy is wrong.

---

## 14. Recognition / supported posture

**`supportedItemIds: []` · `recognitionItemIds: []`.**

A teaser payload was considered and rejected. **English conceptual framing does the job more honestly than unowned French**, for three reasons:

1. **A French past/future sample would demonstrate the very systems §4 of the task forbids opening**, and showing a system next to a claim that you do not own it is exactly the fake-mastery risk the sequence decision guards against.
2. **The forward look here is about a boundary, not a form.** *Before* and *after* are concepts; the learner needs to see the edge of what they can do, not a sentence they cannot use.
3. **L20 already spent the corpus's one recognition-only preview.** A second would make previews a habit rather than an event.

**No spectacle through unowned French.**

---

## 15. Zero-demand discipline

**`acquisitionDemandItemIds: []`.** Every French the learner is required to produce is drawn from §1.1 and has been produced in an earlier shipped lesson.

**No new transition phrase · no temporal adverb · no `hier` / `demain` / `avant` / `après` / `plus tard` · no new connective · no new reaction · no new transaction phrase · no new adjective · no new noun.**

**If the milestone scene needs one, the scene changes — never the demands.** This is the rule `lesson-023.ts` already shipped under and it is carried forward verbatim.

**No unavoidable contradiction was found.** The audit did not surface a single case where MODEL I requires an identity that does not exist, which is the evidence that the threshold architecture is right.

---

## 16. Natural scene audit

Applied to the representative routes below. **Illustrative of shape and ownership — not a frozen script, not a required sequence.**

A setting in which several purposes are live — a counter and someone the learner knows, with time available — supports at minimum:

| Purpose | Owned route |
|---|---|
| **Transaction** | `Bonjour ! Un café, c'est combien ? Je voudrais un café, s'il vous plaît. Merci.` |
| **Social** | `Bonjour ! Comment ça va ? Je suis fatigué. Il faut faire une pause.` |
| **Leaving** | `Bonjour ! Ça va ? J'y vais. Au revoir !` |

| Check | Verdict |
|---|---|
| **Real French interaction?** | **YES.** Each is an ordinary thing to say on walking into a café where you know someone. |
| **Sequence natural?** | **YES.** Greeting first in all three; the rest follows from the purpose. |
| **Reason to say each clause?** | **YES** — and this is what the circumstances must earn. A learner who has twenty minutes and has never been in has a reason to ask the price; one who is tired has a reason to say so. |
| **`le café` drink/venue unambiguous?** | **HANDLED BY CONSTRUCTION.** A single-visit arriving scene gives no basis for a verdict on a coffee that has not been drunk, so the verdict route is **not** in the exit. `adj-bon` is carried by agency beat B, where the learner has had the coffee and the copy names it as the drink — `lesson-023.ts`'s rule, unchanged. |
| **Evaluation earned?** | **YES**, and only at beat B. Forced evaluation at a counter before tasting is semantically false — the finding that produced L23's two-beat architecture, and it binds here too. |
| **Price asking natural?** | **YES.** A place you have never been in, with nothing readable posted, is where `Un café, c'est combien ?` belongs. |
| **Closing natural?** | **YES.** `Merci.` closes a purchase, `Au revoir !` closes a departure, and both are owned. |
| **Does English do too much of the work?** | **THE LIVE RISK.** Circumstances must be *facts*, not instructions. Any situation sentence that names a move, a goal or an order of business has failed this check and must be rewritten. |

**No route requires awkward French to stay inside ownership.** Where one would, the scene changes.

---

## 17. Role, demands, archetypes, canDo

| Field | Value | Evidence |
|---|---|---|
| **`journeyRole`** | **`milestone`** | Sequence decision §4; unchanged |
| **`acquisitionDemandItemIds`** | **`[]`** | Adjudicated zero. Milestone band **0–3**, L24 count **0** — **PASS**, no exception requested |
| **`primaryArchetype`** | **`summit-milestone`** | Real enum member (`lessonTypes.ts:488`); shipped precedent `lesson-020.ts` |
| **`secondaryArchetype`** | **`thematic-context`** | Real enum member (`lessonTypes.ts:486`); shipped precedent `lesson-020.ts`, `lesson-023.ts` |
| **`prerequisites`** | `["v1-lesson-023"]` | |

### canDo — exact

> **"Decide what I want out of a moment in French, and carry it through on my own."**

Describes the **performance**, not the threshold. Contains no *"use the present tense"*, no *"show everything I know"*, no *"unlock Campfire"*, no past/future. Distinct from L20's *"Carry a short familiar moment in French from start to finish, using what I already know"* on the exact axis that separates them: **what the moment is for.**

**The threshold realization is deliberately absent from the canDo** — it is a reflection, not a capability, and putting it here would promise the learner a lesson about time.

### Title — three directions, none ratified

Following `lesson-020`'s compact spec, no title is frozen at gate.

1. **"What you came for"** — *leading.* Performance-shaped, intention-shaped, reads as an edge rather than a completion.
2. **"The moment is yours"** — agency-shaped, slightly generic.
3. ~~"As far as now"~~ — **disqualified**, and the reason generalizes: **the title is visible before the performance, so a threshold-shaped title spoils the §10 reveal.** Any title naming time, edges, boundaries or endings is out for the same reason.

**Binding on the candidate task: the title must be performance-shaped, and must not contain *decide*** — `lesson-023.ts` already ships as *"Let the answer decide."*

---

## 18. The bounded pre-Campfire promise

**Exact permissible learner-facing claim:**

> **You can walk into a small French moment, decide what you want from it, and get it done in French.**

**PROHIBITED claims:** fluent · conversational · mastered French · ready for anything · completed A1 · unlocked real French · finished a level · anything about how much French exists or what fraction has been covered.

### Campfire curiosity — the emotional arc

**capability first → limit second → next territory third.** The learner succeeds, *then* sees the edge, *then* wants what is past it.

**Curiosity must emerge from capability, not deprivation.** Prohibited: *"you can't really speak yet"* · manufactured frustration · paywall teasing · feature marketing · any framing in which the learner's current French is the punchline. The limit is interesting **because** the learner just used everything inside it well.

---

## 19. M1–M6

| | Verdict |
|---|---|
| **M1 — more of the moment than L20?** | **YES.** L20 supplied the purpose and listed the moves; L24 supplies neither. Measurable in the situation text. |
| **M2 — materially uses post-L20 capability?** | **YES.** `adverb-combien` makes a non-social purpose possible at the exit; `adj-bon` carries the unprompted-verdict beat. Neither existed at L20, and without them the purpose question has one answer. |
| **M3 — genuine route agency?** | **YES.** Accepted routes differ in **purpose**, every alternative is independently owned, and no menu defines the options. |
| **M4 — avoids transcript reconstruction?** | **YES.** No pre-exit beat rehearses a complete route or names the exit's purpose; the exit is `model-answer-only`. |
| **M5 — realization AFTER capability proof?** | **YES.** The threshold appears only after the performance and the reflection; no goal card may foreshadow it. |
| **M6 — makes sense with no runtime Campfire gate?** | **YES.** Nothing reads `journeyRole`, no gate is implied, and the lesson's value is the performance. The threshold is curriculum canon delivered in-lesson. |

**Required YES × 6 — met.**

---

## 20. Mon Lexique

**No new behaviour, and none may be invented.** L24 creates no identity, so there is **no new entry** and **no status change**: nothing moves recognition→supported or supported→active. Recycled items gain another authored encounter through **existing rules only**.

**No milestone vocabulary logic, no fake mastery event, no special-case surfacing.** A milestone that manufactures a Mon Lexique moment is inventing machinery, which §12 forbids on the same grounds as a fake unlock.

---

## 21. Surface Inventory — required before generation

**The L22/L23 authoring sequence is the standard and is binding for L24: ownership → scratch Surface Inventory → screens.**

The candidate task **must** create `/tmp/.../scratchpad/l24/surface-inventory.md` **before writing any screen**, containing:

**A** eligible owned moment families · **B** anchor surfaces · **C** genuine route alternatives · **D** post-L20 capability surfaces · **E** end-to-end milestone routes · **F** blocked/unowned language · **G** threshold copy concepts · **H** final-exit provenance plan.

**Every French surface records:** communicative job · items/chunks · ownership class · learner behaviour · route membership · variation dimension.

**Scratch only. Not tracked, no validator, no framework, no backfill of L0–L23.**

**Because acquisition is 0, richness must come from recombination.** The quality test the candidate task must answer: *"Does L24 create genuinely different **purposes** from known material, or does it repeat known sequences?"* Report distinct meaningful surfaces and new meaningful combinations — **no numeric quota, no padding.**

**Item H is not optional.** The exit's provenance plan must classify every clause of every accepted route as SUPPLIED BEFORE / LEARNER-RETRIEVED BEFORE / NOT REHEARSED, as `lesson-020.ts` and `lesson-023.ts` both did, and must show that **no purpose was supplied**.

---

## 22. Prohibited

Any acquisition at all *(L24 is `[]`)* · past tense in any form, including recognition · futur proche in any form, including recognition · **any replay of `Je vais faire une pause.`** · `hier` / `demain` / `avant` / `après` / `plus tard` / any temporal adverb *(no identities)* · any French number word · `euro` / `euros` · `combien de` · quantity `de` / `des` · `en` · partitives · `coûter` · `ça fait combien` · `l'addition` · price adjectives (`cher`, `pas cher`, `trop cher`) · `mauvais` · `j'aime` / `j'adore` · `mais` · **`Non, merci.`** *(`chunk-non-merci` is supported, not owned)* · `C'est pas bon.` *(unlicensed `ne`-drop)* · attributive `un bon café` · `bonne` / `bons` / `bonnes` *(no agreement is owned)* · `très` or any intensifier · a second new question word · `qu'est-ce que` / inversion / embedded questions · any new noun, adjective, verb or connective · RR-A (`je ne comprends pas`, `vous pouvez répéter ?`, `c'est pas grave`, bare `Comment ?`) · `vous pouvez m'aider ?` as a required or modelled milestone route *(composed from supported pieces)* · **the words *present tense* / *past tense* / *future tense* or any grammar-system name** · any assertion that the owned corpus is all one tense · **the word *Campfire* in learner copy** · any unlock / score / threshold / checkpoint / percentage / badge / level / pass-fail copy · any arrival, completion or "you have finished" claim · any claim the learner understood something **spoken** *(no listening exercise exists)* · any copy implying `chunk-c-est` is newly owned · coverage sweeps · lesson-number callbacks · en/em dashes in learner copy.

*(Semantic, not mechanical: an owned token is not a violation because a blocked phrase happens to contain it.)*

---

## 23. Factory viability

**Expressible with current Factory V0 and the shipped runtime.** No code change is required and none is authorized.

- **Screen types:** existing only — `insight-card`, `weave` (`context` / `open`), `say-it-your-way`, `natural-reveal`, `recap`. `lesson-020.ts` already ships a milestone with no `meet-card` and no `fill-with-traps`, which is the precedent for a lesson that meets nothing.
- **Validation:** deterministic throughout — `exact-or-alternative` on weaves, `model-answer-only` on the say-it. No runtime AI, no live evaluation, no adaptive generation.
- **Preflight:** zero demands means CF-002 and CF-003 have no acquisition to resolve; the milestone band **0–3** admits 0. No new identity means CF-001 resolves against the shipped registry. No open decisions means CF-005 is clear.
- **No new archetype member, no new journey role, no new identity semantics, no new validator.**

**L20 proved milestone support exists. L24's different emotional job is not a reason to touch the Factory**, and any pedagogical effect that cannot be expressed on existing screen types must be re-shaped into the smallest honest existing-screen architecture rather than met with code.

---

## 24. Verdict

**RATIFIED.** L24 is a `milestone` with **zero acquisition**, `summit-milestone` + `thematic-context`, proving that the learner can **supply the purpose of a French moment and carry it through** — the one thing L20 could not test, because at 25 demands only one kind of purpose existed. Architecture is **MODEL I**, a **ladder of agency** (move free → speech-act free → purpose free) ending in one learner-chosen performance, followed by a threshold reveal that is **earned, English-only, deixis-not-tense, and free of any runtime claim.**

**Open founder decisions: none.** The title is deliberately unfrozen and is not an open decision — `lesson-020` set that precedent.

*End of L24 Pre-Campfire Threshold Gate Review. Gate only — no lesson content, no candidate, no identity, no code, no runtime or commercial change.*
