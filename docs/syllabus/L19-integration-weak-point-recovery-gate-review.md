# L19 — Integration + Weak-Point Recovery Gate Review / Pre-Spec Scope

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/ai-generation-contract-v1.md` + `docs/syllabus/L10-L20-band-map-v0.md` + **`docs/syllabus/L18-L20-sequence-decision-v1.md`** (the ratified sequence) + `docs/bibles/content/CONTENT_BIBLE_v1.0.md` §6.8 + `PRJ_015_ITEM_COUNTING_CONTRACT_v1.0.md` + the L13 / L16 / L17 / L18 specs and the **shipped** L0–L18 corpus and runtime.
> **Pre-spec planning/review only.** This is a **gate review**, NOT the L19 lesson spec. It authorizes **no** code, content, registry, flag, or runtime change and creates **no** canonical identity. Locked product canon wins on conflict. Dev APK runtime (L1–L5 only) is unaffected.

> ## Founder decisions locked before this review (read first)
>
> Ratified in `docs/syllabus/L18-L20-sequence-decision-v1.md` and reaffirmed 2026-08-08. **Inputs, not recommendations:**
>
> 1. **`journeyRole: "integration"`.**
> 2. **`acquisitionDemandItemIds: []`** — adjudicated zero. No exception, no support→active promotion.
> 3. **Job:** integration + weak-point recovery + a light **second** A Small Moment recurrence.
> 4. **"Weak-point recovery" is the mastery/review mechanism, NOT French conversational repair language.** `je ne comprends pas`, `vous pouvez répéter ?`, `c'est pas grave` and the rest of the orphaned repair rail (RR-A) stay out — the historical word "repair" does not license them.
>
> **Terminology.** This document says **weak-point recovery** throughout. The band map's "weak-point repair" is the same thing under an ambiguous name; new L19 canon does not reuse that name.

> **Why this gate exists.** L19 has a real risk that L16 did not: it is the **second** Integration beat in the same band, with the **same** journey role, the **same** zero-demand budget, and the **same** A Small Moment device. If its job cannot be stated as something L16 structurally could not do, it is a re-run wearing a new number — and the archetype's named "too little novelty" risk becomes real. The second risk is subtler: **"weak-point recovery" invites inventing runtime behaviour the app does not have.** This gate settles both before a screen is written.

---

## 1. Executive Summary

- **Does L19 have a distinct job?** **Yes, and it is a capability boundary, not a labelling one.** L16 integrated a **task-and-movement** band (pouvoir, `est-ce que`, place-`y`, `il faut`/`je dois`) in which the learner states obligations and intentions but **cannot ask a person anything about themselves and cannot ask about a thing**. L17 and L18 changed exactly that. **L19 is the first lesson in which the learner can run a two-sided exchange** — greet, ask a person, receive, answer, ask about a place — rather than produce a chain of statements. That spine is *unbuildable* from L16's inputs.
- **What should L19 own?** **Nothing new.** It recombines across **both halves** of the band — the task/movement side (L11–L15) and the person/question side (L17–L18) — which no shipped lesson has yet done together.
- **What is "weak-point recovery", honestly?** **W2.** The core lesson path stays fully deterministic; L19's contribution is to author **additional Practice-Hub-reusable production screens** for the band items whose authored practice coverage is thinnest. See §4 — this is grounded in shipped runtime, not aspiration.
- **Is L19 safe after L18?** **Yes.** L17→L18 were two consecutive new-capability lessons; the Integration Rhythm Rule mandates a beat, and L19 is it. Zero demands, zero new systems, zero new lexis.

> **Headline finding.** The band map calls L19 *"Integration / weak-point repair / A Small Moment"* and leaves all three words undefined. Two of them are traps. **"Repair"** reads as conversational repair and would drag in the orphaned rail — the sequence decision already disambiguated it, and this gate keeps that ruling operative in the authoring layer. **"Weak-point"** reads as adaptivity — and after reading the shipped runtime, **no mechanism exists that varies a lesson payload by learner weakness.** A spec written on the assumption that one does would be fiction. §4 replaces the assumption with what the app actually does.

---

## 2. What the learner actually owns entering L19

Verified against **shipped** `lesson-000.ts … lesson-018.ts` and `itemRegistry.ts` (63 identities), not against planning specs.

| Capability | Owned surface | From |
|---|---|---|
| Greet, thank, leave | `bonjour` · `merci` · `au revoir` | L0/L1/L6 |
| Polite request | `je voudrais + noun` · `s'il vous plaît` | L1 |
| Say who/what I am | `je suis + state` · `c'est` | L2/L3 |
| Negate | `ne…pas` sandwich · `je ne suis pas` · `ce n'est pas` | L3 |
| Human state | `j'ai faim` | L4 |
| Noun packages | `un café` · `une question` | L5 |
| Movement | `je vais à la maison` | L7 |
| Ask where | `c'est où ?` *(frozen)* | L8 |
| Small action / pause | `faire une pause` *(package)* | L9 |
| Help / permission | `je peux + inf.` · `vous pouvez m'aider` | L11 |
| Yes/no questions | `est-ce que + owned clause` | L12 |
| Place pronoun | `j'y vais` · `on y va` | L14 |
| Obligation | `il faut + inf.` · `je dois + inf.` | L15 |
| **Ask a person how they are** | **`ça va` · `Comment ça va ?`** | **L17/L18** |
| **Say how I am** | **`je suis fatigué(e)` · `je suis content(e)` · `ça ne va pas`** | **L17** |
| **Ask what a thing is like** | **`C'est comment ?` · `Le café, c'est comment ?`** | **L18** |

**The three bolded rows are what L16 did not have**, and they are the whole reason L19 is a different lesson.

---

## 3. Why L19 is not L16 again

### 3.1 The comparison

| Dimension | **L16** | **L19** |
|---|---|---|
| **Inputs available** | L11–L15 only: pouvoir, `est-ce que`, place-`y`, `il faut`/`je dois` — **task and movement** | **all of that plus** the L17 social check-in + state adjectives **plus** the L18 question word |
| **Main job** | first integration of the task band; **seed** the A Small Moment ritual | recombine **across both halves** — task *and* person — for the first time; **second** ASM recurrence |
| **Human-context role** | the scene is practical; **nobody is asked about themselves** | **asking a person how they are is the spine** |
| **Question capability** | `est-ce que` yes/no only | `est-ce que` **plus** one question word in two positions |
| **Weak-point behavior** | none authored | authored **Hub-reusable production** for the band's thinnest-covered items (§4) |
| **Production independence** | 4 meaningful actions, ranks 4/3/2/0 | must reach at least as low, across **more systems** |
| **Exit proof** | run the small moment — **one side** of it | run a **two-sided** moment: ask, hear, answer, ask again |
| **A Small Moment shape** | a **one-voice** three-line read + one scaffolded response | a **two-voice** exchange the learner **continues** |

### 3.2 The test

> **"If we renamed L19 to L16 and swapped the content, would the learner notice a meaningful progression?"**

**Yes — and the swap is impossible in one direction.** L19's spine (`Comment ça va ?` → an answer → `C'est comment ?`) cannot be built from L16's inputs at all: `ça va`, the state adjectives and `comment` did not exist yet. Conversely L16's content would run inside L19 unchanged, which is exactly what makes it *prior*, not equivalent. **The distinction is a capability boundary.**

**No novelty is added to secure it.** L19 stays at zero demands; the progression comes from *which systems are combined*, not from new material.

---

## 4. Weak-point recovery — what the architecture actually supports

**This section is the one that had to be settled from code, not from documents.** Findings from the shipped runtime:

| Component | Status | What it does |
|---|---|---|
| **Practice Hub** (`app/(tabs)/practice-hub.tsx` → `content/lesson-v1-evidence/practiceHub.ts`) | **shipped and wired** | Selects items from the `MasterySnapshot` via `practiceEligibility`, orders them by **SRS-due → weakest `weakPointTag` → diversity** (`selectTodaysSet`), and resolves each to an **already-authored lesson screen returned by reference**. Its own module note: *"Nothing is synthesized: no French, no prompt, no distractor, no cloze, no answer, no alternative."* |
| **Carryover Selector** (`content/learning-engine/carryover-selector.ts`) | **exists, NOT wired** | Would pick old chips to weave *inside* a lesson. It has **no runtime caller**, and its own header records that *"the Sentence Builder does not exist yet"*. |
| **Drill derivation** (`derive-drill.ts`) | pure, deterministic | Can derive a fill/weave screen from an item id. Not a lesson-payload mechanism. |
| **A shipped `Lesson`** | **static** | A fixed `LessonScreen[]`. **No mechanism swaps, injects or reorders screens by learner weakness.** |

**Three consequences that bind the spec:**

1. **A pre-generated lesson cannot adapt to a weak point.** Any spec implying otherwise would be fiction. L19's core path is **deterministic and identical for every learner**.
2. **The Hub reads `weakPointTags` from the ITEM REGISTRY, not from screens.** Verified: `practiceHub.ts` builds each candidate with `weakPointTags: registryItem.weakPointTags ?? []`. **Screen-level `weakPointTags` have no runtime consumer at all today** — grep confirms the only two readers are `practice-selector.ts` and `practiceHub.ts`, both on registry items. L19 may carry screen tags as an authoring record; **it must not claim they drive recovery.**
3. **The Hub can only offer what a lesson already authored.** Its reusable primitives are exactly `fill-with-traps` and `weave`, the item must appear in the screen's `targetItemIds`, the lesson must declare a treatment for it, and a weave may only demand an item that is `active` — or `supported` **if the screen supplies it as a piece**, because *"the Hub would convert Supported material into independent recall, exactly the upgrade the treatment system forbids."*

### 4.1 W1 / W2 / W3 — the decision

- **W1 — weak-point recovery embedded in the canonical core path as adaptive content.** **Rejected: unsupported.** Nothing varies a payload by weakness.
- **W2 — represented via existing practice/pool integration while the core L19 path stays deterministic.** **ADOPTED.**
- **W3 — described only as downstream mastery behaviour, nothing in the payload.** **Rejected as too weak.** It would make "weak-point recovery" a label with no authoring consequence, and L19 would have no lever at all.

**W2 stated precisely.** L19's core path is deterministic. Its recovery contribution is that it **authors additional Hub-reusable production screens for band items whose authored practice coverage is thinnest**, so the already-shipped Hub has better material to offer when those items go weak. This is the lever L19 genuinely has.

### 4.2 Where coverage is actually thin

Measured over the shipped corpus — how many `fill-with-traps`/`weave` screens target each L11–L18 acquisition demand:

| Item | Hub-reusable screens today | From |
|---|---|---|
| `chunk-est-ce-que` | 8 | L12, L13, L16 |
| `chunk-ca-va` | 7 | L17, L18 |
| `chunk-je-peux` | 7 | L11, L12, L13, L16 |
| `chunk-il-faut` | 4 | L15, L16 |
| `adverb-comment` | 4 | L18 |
| `word-y-place` | **2** | L14 |
| **`adj-fatigue`** | **1** | L17 |
| **`adj-content`** | **1** | L17 |
| **`chunk-on-y-va`** | **1** | L14 |

**The four thinnest are `adj-fatigue`, `adj-content`, `chunk-on-y-va` and `word-y-place`.** Two of them — `adj-fatigue` and `adj-content` — additionally carry a real registry tag (`gender`) the Hub's weakness priority can act on, so they are exactly the items most likely to surface as weak with the least authored material behind them. *(The `y` pair carried no tag at all when this was written; the eligibility repair later gave both the pre-existing `y` tag.)* **These are L19's recovery targets.**

> ### ⚠️ MEASURED AFTER SHIPPING (2026-08-08) — source contribution is not uniform
>
> This section said L19 would give the Hub *"better material to offer"* for all four. Measured against `resolvePracticeHubSource` rather than one replay, that holds for **two** of the four.
>
> **The rule:** the resolver walks `V1_LESSONS` in **registry order**, ranks each Hub-legal screen by the path's type preference (`build` = fill-with-traps first; `stretch`/`challenge` = weave first), and updates its pick only on a **strictly better** rank, returning immediately on rank 0. **An equal-ranked later source can never displace an earlier one**, and L19 is last in the registry.
>
> | Target | Resolver returns | L19 source reachable? |
> |---|---|---|
> | `adj-fatigue` | **L19 s03** on `build` (the corpus's only fill for it); L17 s06 on stretch/challenge | **YES** |
> | `adj-content` | **L19 s03** on `build`; L17 s07 on stretch/challenge | **YES** |
> | `chunk-on-y-va` | L14 s06 on every path | **NO** |
> | `word-y-place` | L14 s04 / s05 on every path | **NO** |
>
> **Honest reading.** For the two state adjectives L19 adds a genuinely **newly selectable** recovery source. For the two `y` items **L19 reinforces the item inside the linear Integration lesson, and Practice Hub recovery currently resolves that item to the earlier L14 reusable source** — both L19 screens stay Hub-legal, both items stay fully recoverable, and the eligibility repair is what lets weakness prioritise them at all, but L19 does not add an independently returned source for them today.
>
> **No runtime change is proposed and none is warranted.** The registry-order rule is deterministic and documented; **no source rotation, recency weighting, lesson preference or extra selector tier is suggested.** Full measurement in the compact spec §3 banner.

> **`[OPEN]` Registry debt, surfaced not fixed.** Six band demands carry **no** registry `weakPointTags` at all — `chunk-je-peux`, `chunk-est-ce-que`, `word-y-place`, `chunk-on-y-va`, `chunk-il-faut`, `adverb-comment` — so they are **invisible to the weakness-priority rule** no matter how many screens exist. Fixing that means editing identities, which **this task does not authorize**. Recorded as debt; L19 works within it.

---

## 5. The second A Small Moment recurrence

L16 seeded ASM and its gate reserved the recurrence for L19. The recurrence must stay inside L16's bounds: **≤2–3 lines · present scope · known-items-only · `model-answer-only` · 0 active-new · one short scaffolded learner action.** No live AI, no free text, no personalization — the deep AI-driven ASM stays paid-zone.

**What makes it the SECOND recurrence rather than a replay:**

| | **L16's seed** | **L19's recurrence** |
|---|---|---|
| Voices in the read | **one** — three statements from a single speaker | **two** — a short exchange between two people |
| What the read contains | obligation, movement, an invitation | a **question and its answer** |
| Learner's action | **answer** a statement with one line | **continue** the exchange — take the next turn |
| What it exercises | comprehension of a stated situation | comprehension of a **turn**, and knowing what comes next |

The differentiator is **reciprocity**, and it is available only because L17 and L18 shipped. **It is not a framework change** — same length, same feedback mode, same constraints; only the shape of the read and the learner's action move.

**Ratified per §17 of the task brief:** the reading beat ends in an appropriate learner action, **not necessarily production**. For L19 the reading action may be comprehension-level (choose the turn that fits) so the cognitive load sits on *reading a two-voice exchange*, with the lesson's meaningful production carried elsewhere. **L19 as a whole must still deliver real recombination production** — see §7.

---

## 6. Owned material L19 should actually use

**Availability is not mandatory coverage.** Dumping all 63 identities into L19 would produce a checklist, not a lesson. The smallest mix that is genuinely richer than L16's:

**Person side (new since L16 — the reason L19 exists):** `chunk-bonjour` · `chunk-ca-va` · `adj-fatigue` · `adj-content` · `chunk-je-suis`
**Question side:** `adverb-comment` · `chunk-c-est` · `chunk-est-ce-que`
**Task / movement side (L16's spine, now combined with the person side):** `chunk-il-faut` · `chunk-faire-une-pause` · `chunk-je-peux` · `chunk-on-y-va` · `word-y-place`
**Closing / context:** `chunk-merci` · `chunk-au-revoir` · `noun-cafe`

**~16 identities across three systems** against L16's ~11 across one. **The richness is in the crossing, not the count.**

**Deliberately not required** even though owned: `je voudrais`, `un café`/`une question` article packages, `j'ai faim`, `je vais à la maison`, `c'est où ?`, `vous pouvez m'aider`, `je dois`. Any of these may appear if the scene genuinely needs it; none is a coverage obligation.

---

## 7. Production / recombination contract

L19 is Integration, so it must be **richer than a recognition review** — but "Integration" must not become "more screens".

**Required, conceptually:**
- recombination across **multiple previously owned systems** — at minimum the person side *and* the task/movement side in one exchange;
- **declining support** across the lesson;
- **at least one meaningful cross-lesson combination** that no single prior lesson performed (e.g. asking how someone is *and* proposing the break in one turn);
- an **exit that is not a duplicate** of any prior L19 exercise or of L16's exit;
- **no fake novelty** — no new lexis, no new system, no new frame.

**Not required:** a universal production-count floor. The retired global `5–8` target is not resurrected. Existing PQ semantics govern: **PQ-2** (retrieval floor) is the hard rule; **PQ-3** (duplicate demand) is the advisory that catches padding.

**Authoring consequence of §4:** production screens should be `weave` and `fill-with-traps`, because those are the **only** primitives the Practice Hub can reuse. A production beat authored as any other type is invisible to recovery.

---

## 8. Zero-demand discipline

**`acquisitionDemandItemIds: []`.** Adjudicated zero, per Content Bible §6.8.1 (*"Integration stays at 0. It is not 0–1"*) and PRJ-015 IC-006.

- **A first appearance is not an acquisition.** No identity may be added because a sentence needs it.
- **No support→active promotion.** The sequence decision authorizes none, so none happens.
- **Any French surface requiring an unowned identity must be removed or replaced with genuinely owned language** — never silently provisioned.
- L10, L13 and L16 all pass the plain Integration band with no exception; **L19 does the same. The L6 exception is not extended.**

---

## 9. Phantom-ownership audit

Every previously-identified phantom, checked against the shipped registry and corpus:

| Claim | Reality | L19 |
|---|---|---|
| `je ne comprends pas` · `vous pouvez répéter ?` | PR-07 registrations **no shipped lesson works** | **BLOCKED** — RR-A |
| `c'est pas grave` | **no identity at all** | **BLOCKED** |
| `j'ai soif` · `j'ai peur` · `j'ai besoin d'aide` | no identities | **BLOCKED** |
| first-person `prêt` | only `chunk-tu-es-pret` / `chunk-vous-etes-pret` exist | **BLOCKED** |
| `étudiant` · `mais` | no identities | **BLOCKED** |
| bare `faire` / any infinitive slot | **no `verb-faire`**; `faire` only inside `chunk-faire-une-pause` | package only |
| `Tu vas où ?` · `Où est … ?` | never shipped (L18 correction) | **BLOCKED** |

**New mismatch found: none.** Every item named in §6 was verified present in `itemRegistry.ts` before this document was written.

**One inherited claim to keep suppressed:** the band map's L19 row says *"weak-point repair pool"* and *"repair"*. Under the sequence decision that means the **mastery mechanism**. L19 canon uses **weak-point recovery** so the ambiguity cannot re-enter.

---

## 10. canDo

> **"Hold a short exchange in French: greet someone, ask how they are, answer, and ask about a place, using what I already know."**

**Weak-point recovery is deliberately absent from the canDo.** The task brief asked whether *"recover pieces that have become weak"* belongs there. **It does not.** It is internal authoring and system behaviour: the learner does not experience "recovery" as a capability, and a canDo that promised it would describe the Practice Hub, not the lesson. **The canDo states a communicative capability only.**

It contains no "learn", "unlock" or "new"; it claims **no** new ownership; and it promises **no** conversational repair.

---

## 11. Archetype

Both axes are declared independently (archetype templates §12b).

- **Primary: `review-integration`** — a real enum value, matching shipped L13 and L16.
- **Secondary: `thematic-context`** — a real enum value, the schema member whose prose title is *"Thematic Vocabulary / Context (#9)"*. Chosen over `chunk-natural-speech` (L13/L16's choice) because **L19's differentiator is the human-context reading beat**, which is what the band map's "Reading / Human-context" column names, and because L19 opens no chunk.

> Both are `[OPEN]`-flagged in the archetype doc as *legacy mixed-axis values* awaiting metadata reconciliation. They are **not** deprecated and lessons declaring them stay valid. L19 declaring `review-integration` on the content axis and `integration` on the journey axis is **expected**, not duplication.

---

## 12. Factory readiness prerequisites

| Check | Status |
|---|---|
| Job, journey role, acquisition posture settled | ✅ this gate |
| L16-vs-L19 distinction established | ✅ §3 |
| Weak-point recovery model grounded in shipped runtime | ✅ §4 (W2) |
| Second ASM recurrence defined | ✅ §5 |
| canDo settled | ✅ §10 |
| Archetypes settled | ✅ §11 |
| Recycled set selected | ✅ §6 |
| **New identities required** | **none — every item verified present** |
| L19 compact spec | written alongside this gate |
| AI contract §15 L19 row | added alongside the compact spec |

**Expected preflight: `generationReady = true`, zero CF-001…CF-005, zero open founder decisions.** Unlike L18, L19 has **no CF-001 blocker**: it demands nothing and every required identity already ships.

---

## 13. Final Verdict

- **Is L19 ready for a compact spec?** **Yes.** Its distinct job survives the §3 test on a capability boundary, and the weak-point question is settled from code rather than assumed.
- **What should L19 own?** **Nothing.** It recombines the task/movement band with the person/question band for the first time, carries the second ASM recurrence as a **two-voice** read, and authors Hub-reusable production for the band's thinnest-covered items.
- **What must L19 absolutely NOT own?** any acquisition demand · the repair rail (RR-A) · broader feelings vocabulary · new descriptive adjectives · past or future · a second question word · `Q-word + est-ce que` · inversion · futur proche · bare `faire` · adaptive/personalized runtime behaviour · free-form ASM storytelling.
- **Single highest risk: writing a spec that assumes adaptivity the app does not have.** "Weak-point recovery" is the phrase most likely to produce fiction in a generated lesson — a screen that claims to target *your* weak spot when the payload is identical for everyone. §4's W2 model is the guard, and the AI contract row must carry it.
- **Close second: L19 collapsing into L16 with extra words.** The guard is §3's crossing requirement — the person side and the task side must meet inside one exchange, or the lesson is a re-run.

---

## Open Items / Notes

- This is a **gate review (v0)**, not a spec.
- **`[OPEN]`** six band demands carry no registry `weakPointTags` and are invisible to the weakness priority (§4.2). Registry debt; not fixed here.
- **`[OPEN]`** screen-level `weakPointTags` have no runtime consumer. Authoring record only.
- **`[OPEN]` RR-A** — the orphaned repair rail. Acknowledged, unassigned, and explicitly **not** L19's to solve.
- **`[OPEN]` French QA** — no named-human review exists anywhere; nine identities sit at `founder_waived_provisional`. L19 adds no identity, so it adds no new French-QA debt beyond whatever sentences it authors.
- **Charter unchanged:** `L18+ | Open / provisional`. This gate does not promote it.
- **No runtime, code, content, registry, flag or ID change is authorized by this document.**

*End of L19 Integration + Weak-Point Recovery Gate Review. Planning/review only. Ratified: L19 = `journeyRole: integration`, **acquisition exactly 0**, recombining the task/movement band (L11–L15) with the person/question band (L17–L18) in the first two-sided exchange the curriculum can build; the second A Small Moment recurrence is a **two-voice** read the learner continues; and weak-point recovery is **W2** — a deterministic core path plus authored Practice-Hub-reusable production for the band's thinnest-covered items, of which **two are newly selectable Hub sources and two resolve to their earlier L14 sources under the registry-order rule** (§4.2 banner), with no adaptive runtime behaviour claimed or implied.*
