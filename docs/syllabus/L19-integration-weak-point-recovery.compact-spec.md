# L19 — Integration + Weak-Point Recovery (Compact Lesson Spec)

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/canonical-item-id-convention-v0.1.md` + `docs/syllabus/ai-generation-contract-v1.md` + `docs/syllabus/L10-L20-band-map-v0.md` + **`docs/syllabus/L18-L20-sequence-decision-v1.md`** (the ratified sequence) + **`docs/syllabus/L19-integration-weak-point-recovery-gate-review.md`** (the scope this spec implements) + the L13 / L16 / L17 / L18 specs and the **shipped** L0–L18 corpus and runtime.
> **Compact spec** — planning/spec only. Authorizes **no** code, lesson content, flag, or runtime change. Locked product canon wins on conflict. Dev APK runtime (L1–L5 only) is unaffected.

> ## Founder-locked inputs (read first)
>
> 1. **`journeyRole: "integration"`.**
> 2. **`acquisitionDemandItemIds: []`** — adjudicated zero. No exception, no support→active promotion.
> 3. **Job:** integration + weak-point recovery + a light **second** A Small Moment recurrence.
> 4. **"Weak-point recovery" = the mastery/review mechanism, NOT conversational repair language.** The orphaned repair rail (RR-A) stays out.
> 5. **No new identity.** Every item this spec names was verified present in `itemRegistry.ts` (63 identities) before it was written.

---

## 1. Lesson Identity

| Field | Value |
|---|---|
| **Lesson number** | L19 |
| **Lesson title** | Both sides of it |
| **Journey phase** | First Ascent (Core 150) · pre-Campfire, free |
| **Journey role** | **`integration`** — the lesson's primary job is recombination, recovery and deeper use of already-owned capabilities |
| **Primary archetype** | schema **`review-integration`** (prose *Review / Integration (#10)*) |
| **Secondary archetype** | schema **`thematic-context`** (prose *Thematic Vocabulary / Context (#9)*) — carries the human-context reading beat. Not a second budget. |
| **Prerequisites** | `["v1-lesson-018"]` |
| **Estimated lesson time** | ~6–7 min |
| **Monolingual mode** | `english-guided` |
| **Feedback mode** | `model-answer-only` — no live AI (L0–L20) |
| **Practice Pool expansion** | Build + Stretch + Challenge (lesson-scoped) |
| **Main can-do outcome** | **"Hold a short exchange in French: greet someone, ask how they are, answer, and ask about a place, using what I already know."** |
| **Why a compact spec is sufficient** | L19 owns **0 new grammar systems, 0 architecture verbs, 0 lexical items**. There is nothing to table. |

**Journey-role budget, recorded separately from the pedagogical reason:** Integration band **0** · L19 demands **0** · **PASS**. Plain band, **no exception** — as L10, L13 and L16 already do. The L6 exception is not extended.

---

## 2. The Lesson's Deterministic Job

**L19 is the first lesson that can run a two-sided exchange.**

Through L16 the learner could state obligations, intentions and movement — a chain of statements. They could not ask a person anything about themselves, and could not ask about a thing. **L17 and L18 changed exactly that.** L19's job is to put the two halves of the band into one exchange:

```text
greet  →  ask the person  →  hear  →  answer about yourself  →  ask about the place  →  act on it  →  close
```

**Every step is owned.** Nothing new is introduced to make the arc work.

**What must cross.** The lesson is not satisfied by running the person side and the task side in separate screens. **At least one beat must combine them** — asking how someone is *and* proposing what to do about it, in one turn. That crossing is the thing no prior lesson performed, and it is what makes L19 an integration rather than a review.

---

## 3. Weak-Point Recovery — the honest model (W2)

**Settled from shipped runtime, not assumed.** Full evidence in the gate review §4.

| Layer | Reality |
|---|---|
| **Lesson payload** | A shipped `Lesson` is a static `LessonScreen[]`. **Nothing swaps, injects or reorders screens by learner weakness.** L19's core path is deterministic and identical for every learner. |
| **Runtime mechanism** | The **Practice Hub** (shipped, wired) selects items from the `MasterySnapshot` and orders them **SRS-due → weakest `weakPointTag` → diversity**, then resolves each to an **already-authored lesson screen, by reference**. It synthesizes nothing. |
| **Carryover Selector** | Exists, **not wired** to lesson rendering; awaits a Sentence Builder that does not exist. **Not available to L19.** |

**Therefore L19's recovery lever is authoring, not adaptation:**

> **L19 authors additional Practice-Hub-reusable production screens for the band items whose authored practice coverage is thinnest, so the already-shipped Hub has better material to offer when those items go weak.**

> ### ⚠️ MEASURED AFTER SHIPPING (2026-08-08) — separate item recovery from source contribution
>
> Reading `resolvePracticeHubSource` rather than inferring from one replay: it walks `V1_LESSONS` **in registry order**, ranks each Hub-legal screen by the path's type preference (`build` = fill-with-traps first; `stretch`/`challenge` = weave first), and updates its pick only on a **strictly better** rank — with an immediate return on rank 0. **A later lesson can therefore never displace an earlier one of equal rank.** L19 is last in the registry, so an L19 screen is returned only when no earlier lesson offers an equal-or-better-ranked Hub-legal screen for that item.
>
> Measured outcome across all three paths:
>
> | Target | Sources before L19 | L19 source | Resolver returns | L19 source reachable? |
> |---|---|---|---|---|
> | `adj-fatigue` | L17 s06 *(weave)* | s03 **fill**, s04 weave | **L19 s03** on `build`; L17 on stretch/challenge | **YES** |
> | `adj-content` | L17 s07 *(weave)* | s03 **fill** | **L19 s03** on `build`; L17 on stretch/challenge | **YES** |
> | `chunk-on-y-va` | L14 s06 *(weave)* | s06 weave | **L14 s06** on every path | **NO** |
> | `word-y-place` | L14 s04 *(fill)* + s05 *(weave)* | s06 weave | **L14** on every path | **NO** |
>
> **The two state adjectives are reachable because L19 supplies the corpus's only `fill-with-traps` for them**, which outranks L17's weave on the `build` path. The two `y` items are not: L14 already holds an equal-or-better-ranked screen at an earlier registry position.
>
> **Correction to the claim above, scoped:** for `adj-fatigue` and `adj-content`, L19 genuinely adds a **newly selectable** recovery source. For `chunk-on-y-va` and `word-y-place`, **L19 reinforces the item inside the linear Integration lesson, and Practice Hub recovery currently resolves that item to the earlier L14 reusable source.** Both `y` screens remain Hub-legal and both items remain fully recoverable — the eligibility repair is what makes weakness able to prioritise them at all — but L19 does not add an independently returned source for them today.
>
> **This is a measurement, not a defect, and no runtime change is proposed.** The registry-order rule is deterministic and documented; more authored coverage is not made worthless by not winning a tie-break. **No source rotation, recency weighting, lesson preference or extra selector tier is being suggested** — there is no demonstrated learner problem to fix.

**Binding authoring rules that follow:**

1. **Production beats must be `weave` or `fill-with-traps`.** Those are the *only* primitives the Hub can reuse. A production beat authored as anything else is invisible to recovery.
2. **Recovery targets — the four thinnest-covered band demands:**

   | Item | Hub-reusable screens today | L19 should add coverage |
   |---|---|---|
   | `adj-fatigue` | **1** (L17) | ✔ |
   | `adj-content` | **1** (L17) | ✔ |
   | `chunk-on-y-va` | **1** (L14) | ✔ |
   | `word-y-place` | **2** (L14) | ✔ (satisfied by the same beat as `chunk-on-y-va` where natural) |

3. **A weave may only demand an item L19 treats as `active`, or `supported` **if the screen supplies it as a piece**.** Otherwise the Hub refuses the screen — it would convert supported material into independent recall, which the treatment system forbids.
4. **Screen-level `weakPointTags` are an authoring record only.** They have **no runtime consumer**; the Hub reads registry-level tags. L19 may carry accurate tags, and **must not claim they drive recovery.**
5. **Nothing in learner-facing copy may say or imply the lesson adapts to the learner.** No "your weak spots", no "because you struggled with", no personalization language. The payload is identical for everyone and the copy must stay honest about that.

> **`[OPEN]` inherited debt, not fixed here.** Six band demands carry **no** registry `weakPointTags` (`chunk-je-peux`, `chunk-est-ce-que`, `word-y-place`, `chunk-on-y-va`, `chunk-il-faut`, `adverb-comment`) and are invisible to the weakness priority regardless of screen count. Fixing that means editing identities, which is out of scope. L19 works within the debt.

---

## 4. The Second A Small Moment Recurrence

L16 seeded ASM; its gate reserved the recurrence for L19. **Bounds are unchanged from the seed:** ≤2–3 lines · present scope · **known-items-only** · `model-answer-only` · **0 active-new** · one short learner action · no live AI, no free text, no personalization. The deep AI-driven ASM stays paid-zone. **The framework is not redesigned.**

**What makes this the second recurrence rather than a replay:**

| | **L16 seed** | **L19 recurrence** |
|---|---|---|
| Voices | **one** — three statements, single speaker | **two** — a short exchange |
| Content of the read | obligation, movement, an invitation | **a question and its answer** |
| Learner's action | **answer** a statement | **continue** the exchange — take the next turn |
| What it exercises | comprehension of a stated situation | comprehension of a **turn**, and knowing what comes next |

The differentiator is **reciprocity**, available only because L17 and L18 shipped.

**Reading action (ratified).** Every Reading ends in an appropriate learner action, **not necessarily production**. L19's reading action may be **comprehension-level** — choosing the turn that fits — so the load sits on reading a two-voice exchange. **The lesson's meaningful production is carried elsewhere** (§6). Do not force full production after the reading fragment, and do not let the comprehension choice substitute for the lesson's recombination production.

---

## 5. Owned Material — the working set

**Availability is not coverage obligation.** The smallest mix that is genuinely richer than L16's:

| Side | Items |
|---|---|
| **Person** *(new since L16 — the reason L19 exists)* | `chunk-bonjour` · `chunk-ca-va` · `adj-fatigue` · `adj-content` · `chunk-je-suis` |
| **Question** | `adverb-comment` · `chunk-c-est` · `chunk-est-ce-que` |
| **Task / movement** *(L16's spine, now crossed with the person side)* | `chunk-il-faut` · `chunk-faire-une-pause` · `chunk-je-peux` · `chunk-on-y-va` · `word-y-place` |
| **Closing / context** | `chunk-merci` · `chunk-au-revoir` · `noun-cafe` |

**~16 identities across three systems**, against L16's ~11 across one. **The richness is in the crossing, not the count.**

**Owned but deliberately not required:** `je voudrais` · `un café` / `une question` packages · `j'ai faim` · `je vais à la maison` · `c'est où ?` · `vous pouvez m'aider` · `je dois`. Any may appear if the scene needs it; none is an obligation. **Do not sweep the corpus for coverage.**

---

## 6. Representative Sentence Families

> Illustrative of shape and ownership, **not a frozen script**. The Factory chooses the realization; every line below is buildable from §5.

| Beat | Family | Composition |
|---|---|---|
| **Open** | `Bonjour !` | `chunk-bonjour` |
| **Ask the person** | `Comment ça va ?` | `adverb-comment` + `chunk-ca-va` |
| **Answer about yourself** | `Ça va.` / `Ça ne va pas. Je suis fatigué(e).` / `Je suis content(e).` | `chunk-ca-va` (+ owned `ne…pas`) · `chunk-je-suis` + `adj-fatigue` / `adj-content` |
| **THE CROSSING** | `Ça ne va pas ? Il faut faire une pause.` | person side **+** task side in one turn |
| **Ask about the place** | `Le café, c'est comment ?` / `C'est comment ?` | `chunk-c-est` + `adverb-comment` (+ `noun-cafe`) |
| **Propose / permit** | `Je peux faire une pause ?` / `Est-ce que je peux faire une pause ?` | `chunk-je-peux` / `chunk-est-ce-que` + `chunk-faire-une-pause` |
| **Move** | `On y va ?` / `J'y vais.` | `chunk-on-y-va` · `word-y-place` |
| **Close** | `Merci. Au revoir.` | `chunk-merci` · `chunk-au-revoir` |

**The crossing beat is the load-bearing one.** A candidate that runs the person side and the task side without ever joining them has produced a review, not an integration.

**Host-B rule carried forward from L18 (still binding).** `C'est comment ?` / `Le café, c'est comment ?` **take no French answer.** The learner produces the question; meaning comes from the situation. **`Ça va.` / `Ça ne va pas.` / `Je suis fatigué(e).` / `Je suis content(e).` answer the PERSON question only** — using them to evaluate a café would silently broaden `chunk-ca-va`'s acquired sense.

---

## 7. Production / Recombination Contract

**Required, conceptually:**
- recombination across **multiple owned systems** — at minimum the person side *and* the task/movement side, joined in at least one beat;
- **declining support** across the lesson;
- **at least one cross-lesson combination** no single prior lesson performed;
- an **exit that duplicates neither an earlier L19 beat nor L16's exit** (L16's exit was "run the small moment" from one side; L19's is a two-sided exchange);
- **no fake novelty** — no new lexis, no new system, no new frame, and no situation-swapping that changes only the English.

**Not prescribed:** a universal production-count floor (the global `5–8` target is retired and not resurrected), and **no fixed screen count**. Existing PQ semantics govern: **PQ-2** (retrieval floor) is the hard rule; **PQ-3** (duplicate demand) is the advisory that catches padding.

**"Integration" must not become "more screens."** Depth is the crossing and the falling support, not length.

---

## 8. Zero-Demand Discipline

**`acquisitionDemandItemIds: []`.** Content Bible §6.8.1 (*"Integration stays at 0. It is not 0–1"*) and PRJ-015 IC-006.

- A first appearance is **not** an acquisition. No identity is added because a sentence needs it.
- **No support→active promotion.** None is authorized.
- Any French surface requiring an unowned identity must be **removed or replaced with genuinely owned language** — never silently provisioned.
- L19 passes the plain Integration band; **no exception is requested.**

---

## 9. Boundary Table

| Item | Classification | Note |
|---|---|---|
| everything in §5 | **RECYCLED** | the working set |
| the crossing beat | **RECOMBINATION (the lesson's point)** | person side + task side in one turn |
| second ASM read | **two-voice, comprehension-action** | ≤2–3 lines, present, known-items-only, `model-answer-only` |
| **any acquisition demand** | **PROHIBITED** | `[]` is adjudicated |
| `je ne comprends pas` · `vous pouvez répéter ?` · `c'est pas grave` | **PROHIBITED** | orphaned repair rail (RR-A); "repair" in the band map means the mastery mechanism |
| `j'ai soif` · `j'ai peur` · `j'ai besoin d'aide` · first-person `prêt` · `étudiant` · `mais` | **PROHIBITED** | no identities |
| bare `faire` / any infinitive slot | **PROHIBITED** | no `verb-faire`; `chunk-faire-une-pause` is a package |
| a French answer to `C'est comment ?` | **PROHIBITED** | L18 host asymmetry |
| new descriptive adjectives (`bon`, `super`, `joli`, `très`, `bien`, `mal`) | **PROHIBITED** | none owned |
| broader feelings vocabulary | **PROHIBITED** | L17 cap holds |
| a second question word · `Q-word + est-ce que` · inversion · `qu'est-ce que` · embedded questions | **PROHIBITED** | L18 boundary holds |
| bare `Comment ?` (repair sense) | **PROHIBITED** | RR-A |
| futur proche (`je vais + inf.`) | **PROHIBITED** | FP-C belongs at the END of L20 |
| past / future tense | **PROHIBITED** | present scope |
| object-pronoun production | **PROHIBITED** | `m'aider` frozen only |
| advice / conditionnel / coaching register | **PROHIBITED** | L15 + L17 hold |
| adaptive / personalized runtime behaviour, or copy implying it | **PROHIBITED** | §3 — the payload is identical for every learner |
| free-form ASM storytelling, open chat, live AI evaluation | **PROHIBITED** | `model-answer-only`; deep ASM is paid-zone |

---

## 10. Continuity Map

| Field | Value |
|---|---|
| **Carry-in — L11/L12/L14/L15** | `je peux` · `est-ce que` · place-`y` · `il faut`/`je dois` — the task/movement spine L16 integrated |
| **Carry-in — L16** | the A Small Moment seed shape and its bounds; the after-class register |
| **Carry-in — L17** | `ça va` · `ça ne va pas` · `je suis fatigué(e)` / `content(e)` — the person side |
| **Carry-in — L18** | `comment` in two positions, and the **Host-B no-French-answer rule** |
| **New introduced** | **nothing** |
| **Carry-out** | → **L20** pre-Campfire capability checkpoint: L19's two-sided exchange is the rehearsal for L20's exit proof. **L19 carries no futur-proche hook** — FP-C belongs at the END of L20. |
| **Fade plan** | support falls across the lesson; nothing graduates status, because nothing is acquired |

> **Principle check** (engine §8): introduces new — **deliberately nothing** ✓ (Integration) · grows old — crosses two bands no lesson has joined ✓ · prepares future — rehearses L20's exit proof ✓.

---

## 11. Mon Lexique Implications

**No new entry.** L19 creates no identity, so Mon Lexique gains nothing.

What it does contribute is **use history**: items worked here gain another authored encounter, which is what the Practice Hub resolves against. **The four recovery targets (§3) are the entries that benefit most**, since each currently has one or two authored practice sources.

**No status change.** Nothing moves recognition→supported or supported→active in L19.

---

## 12. QA Risks

| Risk | Guard |
|---|---|
| **L19 reads as L16 again** | the crossing beat (§2, §6) is mandatory; check it first in smoke |
| **Fictional adaptivity** — copy implying the lesson targets *your* weak spots | §3.5 bans it outright; the payload is identical for everyone |
| **Repair-rail leak** via the word "repair" | §9; new canon says **weak-point recovery** |
| **Coverage sweep** — dragging in all 63 identities | §5 names the working set and the deliberate exclusions |
| **Padding** — "Integration" becoming "more screens" | §7; PQ-3 catches duplicate demands |
| **Host-B answer leak** — answering `C'est comment ?` in French | §6, §9 — the L18 asymmetry is still binding |
| **Recovery beats authored as non-reusable screen types** | §3.1 — production must be `weave` / `fill-with-traps` or it is invisible to the Hub |
| **French QA** | L19 adds **no identity**, so no new identity-level debt. Any new sentence it authors is nonetheless unreviewed: **no named-human French QA exists anywhere in this repo**, and no reviewer, date or `approved` status may be recorded that the founder has not supplied. |

---

*End of L19 Integration + Weak-Point Recovery Compact Spec. Spec only — no lesson content, no code, no runtime change. L19 = `journeyRole: integration`, **acquisition exactly 0**, `review-integration` + `thematic-context`, crossing the task/movement band (L11–L15) with the person/question band (L17–L18) in the first two-sided exchange the curriculum can build. The second A Small Moment recurrence is a **two-voice** read the learner continues, with a comprehension-level action. Weak-point recovery is **W2**: a deterministic core path plus authored Practice-Hub-reusable production for the four thinnest-covered band items — of which **two (`adj-fatigue`, `adj-content`) are newly selectable Hub sources and two (`chunk-on-y-va`, `word-y-place`) resolve to their earlier L14 sources under the registry-order rule** (§3 banner). **No adaptive runtime behaviour is claimed, implied, or available.***
