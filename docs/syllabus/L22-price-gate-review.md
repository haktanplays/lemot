# L22 — Price ("How much is it?") · Gate Review

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/canonical-item-id-convention-v0.1.md` + `docs/syllabus/ai-generation-contract-v1.md` + **`docs/syllabus/L21-L24-pre-campfire-sequence-decision-v1.md`** (the ratified sequence) + `docs/bibles/curriculum/CURRICULUM_CHARTER_v1.0.md` + `docs/bibles/content/CONTENT_BIBLE_v1.0.md` §6.8 + the **shipped** L0–L21 corpus and runtime.
>
> **Planning/review only.** Authorizes no lesson file, no candidate, no runtime change. The one identity it ratifies is committed separately.
>
> **Filename note:** the sequence decision anticipated `L22-price-quantity-gate-review.md`. This review resolves the mechanism to **price only**, so the narrower name is used and productive quantity is explicitly deferred (§5).

---

## 1. Executive summary

- **Decision: MODEL P — PRICE ONLY.** `combien` opens the price question. **Productive "how many" is deferred**, because every natural formulation of it requires systems the sequence reserves.
- **One identity, one demand: `adverb-combien`.** The unit is the **word**, not a frozen question.
- **Price answer: MODEL A — a written numeral plus the € symbol** (`2 €`). **No French number word and no currency word is introduced, shown, or spoken.**
- **JourneyRole `standard`** (founder-locked in the task), **1 demand**, band 1–4 → **PASS**.
- **The canDo narrows** from the sequence's provisional wording. "How many" leaves it entirely.

---

## 2. Shipped learner state — the transaction, read from code

| Capability | Status |
|---|---|
| `je voudrais` · `un café` · `s'il vous plaît` · `merci` · `bonjour` · `au revoir` | **OWNED** (demands) — the learner can order and close |
| `c'est` | **SUPPORTED**, never a demand, but **produced unaided since L18** in `C'est comment ?`, `Le café, c'est comment ?` (L18, L19, L20, L21) |
| `où` in the end slot | **OWNED via the frozen whole** `chunk-c-est-ou` (L8); `adverb-ou-where` itself stays supported |
| `comment` in the end slot | **OWNED as a word** (L18 demand) |
| `bon` after `c'est` | **OWNED as a word** (L21 demand) |
| `un thé` | **SUPPORTED** |

### 2.1 Number / currency / quantity inventory — **the audit's decisive finding**

Swept the registry (64 rows) and **2,518 learner-facing strings** across all 22 shipped lessons:

| | Result |
|---|---|
| French number words (`deux`, `trois`, … `dix`, `zéro`) | **0 occurrences. ABSENT.** |
| Currency words or symbols (`euro`, `€`, `prix`, `coût`, `payer`, `addition`, `argent`) | **0 occurrences. ABSENT.** |
| Quantity words (`combien`, `des`, `beaucoup`, `plusieurs`) | **0 occurrences. ABSENT.** |
| Digits in learner payload | 9 hits, **all** English lesson references ("the L3 sandwich", "L11's question"). **No numeral is ever content.** |
| `de` · `des` · `en` · plural noun morphology · `coûter` · `ça fait` · `l'addition` | **No identity exists for any of them. ABSENT.** |

Registry existence checks: `adverb-combien`, `noun-euro`, `word-deux`, `verb-couter`, `chunk-ca-fait`, `word-des`, `word-en`, `word-de`, `adverb-beaucoup`, `noun-prix` — **all absent** before this gate.

**Nothing about number, money or quantity is owned, supported, recognized, or even ghosted. The area is empty.**

### 2.2 Modality — what the app actually does

`expo-speech` is installed and `useSpeech` exists, but in the v1 lesson runtime **only `MeetCard` renders it**, as an on-demand *Listen* button that speaks the card's `fr` string; 35 shipped screens set `tts: true`. There is **no listening exercise, no audio-only comprehension, and nothing that tests whether a spoken form was understood.**

**Binding consequence:** no L22 canDo may claim the learner can *understand someone saying* a price. That capability does not exist in the product.

---

## 3. Price frames — P1–P5

| | Verdict |
|---|---|
| **P1 — most natural default** | **`C'est combien ?`** It is the ordinary spoken question in a café, and `Un café, c'est combien ?` when the thing must be named. |
| **P2 — compatible with the learner's `c'est` history** | **Completely.** `combien` sits in the **same end slot** that `où` has occupied since L8 and `comment` since L18. The learner is not learning a new shape; they are putting a third word in a slot they already work. |
| **P3 — topic-fronting** | **Natural, not textbook.** `Le café, c'est comment ?` is already shipped in L18, L19 and L21, so `Un café, c'est combien ?` inherits a proven pattern. It is the **named** form; bare is the default when the item is present. |
| **P4 — bare `Combien ?`** | **Too context-dependent to be a core owned route**, and blunt on its own. It may be *accepted* where the referent is physically present and unmistakable; it is **never modelled** and never a reveal's natural alternative. |
| **P5 — can `coûter` be avoided?** | **Yes, completely, and it is better French to avoid it.** `C'est combien ?` is more idiomatic at a counter than `Combien ça coûte ?`, and `coûter` would need a verb paradigm nothing supports. |

Also blocked as unowned: `Ça fait combien ?` (needs `ça fait`), `Combien ça coûte ?` (needs `coûter`), `L'addition, s'il vous plaît.` (needs `l'addition`; the legacy v7 pool layer contains that string, but the pool layer is **not** the v1 acquisition corpus and confers no ownership).

---

## 4. Quantity — the grammar burden

| Formulation | New systems required |
|---|---|
| `Combien de cafés ?` | **`de`** (no identity) · **plural noun morphology** `cafés` (L5's guardrail explicitly defers plural) · **determiner deletion** — `combien de` takes no article, a new determiner rule · number agreement |
| `Vous en voulez combien ?` | **`en`** (reserved) · productive `vouloir` (only frozen `je voudrais` is owned) · object-pronoun placement |
| `Combien de cafés est-ce que vous voulez ?` | all of the above plus a wrapper over an unowned clause |

**Four reserved systems for one question.** Surface familiarity with `café` is not ownership of `cafés`.

---

## 5. Decision — MODEL P, and why PQ and Q lost

**MODEL PQ (price + quantity) — REJECTED.** It cannot be implemented inside the standard 1–4 band without opening plural, `de` and determiner deletion, all of which §22 of the sequence and the L5 guardrail reserve. Keeping the sequence card's wording *"how much, how many"* would have meant smuggling a grammar system in to protect a phrase. **The sequence decision owns the job, not the implementation.**

**MODEL Q (quantity only) — REJECTED.** Same grammar burden, and it abandons the more valuable capability: the learner's flagship sentence is `Je voudrais un café.` and the missing beat before it is the price, not the count.

**MODEL P (price only) — SELECTED.** One word, no reserved system, and it completes a real transaction the learner already half-owns.

**Recorded narrowing:** *`combien` is owned first through price; productive quantity use remains a later doorway.* One question word may have a bounded initial use without claiming its whole semantic and syntactic range — exactly as `bon` (L21) owns evaluation without opening `c'est + any adjective`.

---

## 6. Pedagogical job and canDo

**Job:** give the learner the beat that comes **before** ordering — finding out what it costs — using the question slot they already control.

**canDo (ratified):**

> **"Ask how much something costs before I order it."**

**Why this and not the sequence's provisional wording.** *"and follow the answer"* would claim comprehension the product cannot deliver: there is no listening exercise (§2.2), and the answer the learner meets is a **numeral**, not French. §16 of the gate task authorizes exactly this narrowing, and "how many" leaves the canDo because productive quantity is deferred.

The shape L22 leaves behind is a genuine communicative arc, all of it owned except one word: **ask the price → decide → order.**

---

## 7. Identity model — `adverb-combien`

**Selected: the word.** `type: "adverb"` (existing type, as `adverb-comment` and `adverb-ou-where`), `status: "active"`, one acquisition demand.

**Not created:** `chunk-c-est-combien` · `noun-euro` · any number identity · `verb-couter` · `chunk-ca-fait`.

**The L18 precedent, used carefully rather than by symmetry.** L18's stated honesty test was that `comment` *"works in two different owned hosts, which is why neither host became an identity of its own."* **That test is not available here.** French offers `combien` no second owned host — `ça va combien ?` and `je voudrais combien ?` are not sentences. So word-hood is proved on different evidence:

1. **The learner controls the slot, not just one question.** They have produced `C'est où ?` since L8 and `C'est comment ?` since L18, and topic-fronted `Le café, c'est comment ?` since L18. A **third occupant** of a slot they demonstrably work is stronger evidence of slot productivity than a third frozen whole would be.
2. **Freezing would repeat the branch the corpus already judged weaker.** `canonicalItems.test.ts` pins the L8-vs-L18 contrast and calls it "the whole point"; `chunk-c-est-combien` would put L22 on the L8 side of it.
3. **Bare / named alternation** (`C'est combien ?` vs `Un café, c'est combien ?`) shows the word moving against a changing frame.

This asymmetry with L18 is recorded rather than papered over: it is a **weaker** word-hood proof than L18's, and it is the best French allows.

**Bounded scope.** L22 owns `combien` in the **price question only**. It does **not** own `combien de + noun`, `ça fait combien ?`, `combien ça coûte ?`, `vous en voulez combien ?`, `combien êtes-vous ?`, or counting of any kind.

---

## 8. Price answer — MODEL A, and why B and C lost

**MODEL A — numeral + € symbol (SELECTED).** The answer is written `2 €` / `3 €`. Arabic numerals and `€` are **shared orthography, not French lexis**, so nothing is claimed about understanding `deux` or `euros`, and no identity is needed. It is also how prices actually reach a customer in France — on the board, on the receipt.

**Binding restriction that makes it honest:** the price numeral must **never** appear on a `tts: true` surface or in a meet-card `fr` field, because French TTS renders `2 €` as *"deux euros"* — which would expose an undeclared French lexical form through audio. That is the exact hidden acquisition §10 of the gate task forbids, and it is authored away rather than explained.

**MODEL B — recognition-only French number words — REJECTED.** It is *representable* honestly: `status: "recognition"` exists and canon rules V3/V4 mechanically bar a recognition-tier surface from being a required piece, a correct fill option, a meet-card highlight or a recap chip. But it costs at least two identities (a number and `euro`), it shows `euros` — a plural form whose morphology is not owned — and once one number word exists the obvious next question is why only one. That is the vocabulary-dump slope the thematic archetype warns about, and it buys nothing the numeral does not.

**MODEL C — active number slice — REJECTED.** It spends demands to open "numbers" as a system, which is a curriculum of its own (counting, time, age, phone numbers, arithmetic) and is not what L22 is for.

**Honesty check against §10 of the gate task:** under Model A the learner is **not** expected to understand any French lexical form. `deux` and `euros` are not scenery — they are simply **absent**. Nothing is classified as ghost, because nothing is there.

---

## 9. Active / supported / recognition boundaries

| | |
|---|---|
| **Active (acquisition)** | `adverb-combien` — the only one |
| **Recycled owned** | `chunk-un-cafe`, `noun-cafe`, `chunk-je-voudrais`, `chunk-sil-vous-plait`, `chunk-merci`, `chunk-bonjour`, `adj-bon`, `adverb-comment` |
| **Supported host** | `chunk-c-est` — ridden exactly as L18–L21 ride it; **nothing new claimed, status untouched** |
| **Recognition** | **none.** L22 introduces no recognition-tier item. |
| **Not French at all** | the price numeral and `€` |

---

## 10. Role, archetypes, context

| Field | Value |
|---|---|
| **JourneyRole** | **`standard`** — band 1–4, L22 takes **1**, PASS, no exception. *Observation recorded, no change made:* one demand also fits `doorway`, and every shipped one-word question opening (L8, L12, L18, L21) is a doorway. The role is founder-locked for this gate; if the founder later prefers `doorway`, that is a one-line sequence refinement, not a redesign. |
| **Primary archetype** | **`chunk-natural-speech`** — confirmed by the mechanism, following L8, L12 and L18, the corpus's question-lesson mapping for prose #3 (which has no enum member) |
| **Secondary archetype** | **`thematic-context`** — the café transaction |
| **Context** | The café counter the learner has owned since L0. **No new noun.** |
| **Prerequisite** | `["v1-lesson-021"]` |
| **Feedback mode** | `model-answer-only`, deterministic reveals |

---

## 11. L21 → L22 rhythm — R1–R4

**R1 — does it expand the real-world exchange? YES.** It adds the beat before ordering: find out the price, then decide.
**R2 — sentence-family led, not vocabulary-list led? YES.** One word, in one owned frame, inside one scene. There is no list to lead with.
**R3 — production focused on communicative use? YES.** Every production is a question asked of a person, and the lesson's arc ends in an owned order.
**R4 — new material for L23? YES.** See §12.

**Recorded rhythm risk:** L18 owned `comment` in the `c'est ___` slot, L21 owned `bon` right after `c'est`, and L22 owns `combien` in that same slot again — **three consecutive lessons working one frame**. It is coherent (that frame is the learner's workhorse) but a tester may feel it. Mitigation is scene and role variety inside L22, not a new frame; if smoke says the pattern shows, the lever is L23's shape, not another door.

---

## 12. L23 handoff

L23's ratified job is to **integrate the transaction end to end**. L22 hands it a clean, self-contained capability:

> greet → **ask the price** → decide → order → evaluate → close

Every piece is owned, nothing is half-open, and there is **no** loose plural, `en`, partitive, number or currency machinery for L23 to trip over. That cleanliness is a reason for Model P, not a side effect of it: §21 of the gate task asks for exactly this.

---

## 13. French QA, tags, counts

| | |
|---|---|
| **French QA** | `adverb-combien` is **`founder_waived_provisional`**, same posture and reason as PR-07, L17, L18 and L21. **No named human has read this surface; no reviewer or date exists and none is claimed.** |
| **weakPointTags** | **None.** No existing tag fits a question word — the taxonomy has no question-formation category, which is why `adverb-comment` is also untagged. **No taxonomy was invented.** Recorded as debt; not blocking, since nothing in L22's job depends on weakness eligibility. |
| **Registry** | 64 → **65**; manifest frozen at 65 |
| **Provisional inventory** | 10 → **11** |

---

## 14. Prohibited

`combien de + noun` · `de` · `des` · plural noun morphology · `en` · partitives · determiner deletion · `coûter` · `ça fait` · `l'addition` · any French number word · `euro`/`euros` as French text · counting sequences, 1–10 lists, time, age, phone numbers, arithmetic · a second new question word · `qu'est-ce que` / inversion / embedded questions · any claim that `chunk-c-est` is newly owned · any claim the learner can *understand a spoken* price · the repair rail (RR-A: `je ne comprends pas`, `vous pouvez répéter ?`, `c'est pas grave`, bare `Comment ?`) · `j'ai soif` / `j'ai peur` / `j'ai besoin d'aide` / first-person `prêt` / `étudiant` / `mais` · bare `faire` · `Tu vas où ?` / `Où est … ?` · past tense · futur proche · any unlock, gate, score or Campfire-arrival copy · en/em dashes in learner copy.

---

## 15. QA risks

| Risk | Guard |
|---|---|
| **Number leak through audio** — TTS speaking `2 €` as *deux euros* | §8: the price numeral never appears on a `tts: true` surface or in a meet-card `fr`. **Check this first in smoke.** |
| **Quantity leak** — `combien de cafés` appearing "because it's natural" | §4, §14; it needs three reserved systems |
| **Frozen-question drift** — the lesson only ever produces one string | §7; bare and named forms, and `combien` must move against a changing frame |
| **Currency creep** — `euros` written out "just once" | §8; no currency identity exists and none may be implied |
| **Modality overclaim** — copy implying the learner can hear a price | §2.2; the product has no listening exercise |
| **Slot fatigue** — the third lesson in a row in `c'est ___` | §11; vary scene and role, not the frame |
| **French QA** | One identity under a founder waiver. No named-human French QA exists anywhere in this repo, and no reviewer, date or `approved` status may be recorded that the founder has not supplied. |

---

## 16. Factory readiness

Expressible with **current Factory V0 and the shipped runtime**: existing screen types only, deterministic validation, no new validator, no runtime AI, **no audio/listening infrastructure**, no new identity semantics, no new journey role, no new archetype member. `adverb-combien` exists and is manifest-frozen, so a contract preflight resolves every required id.

**No infrastructure work is required.**

---

## 17. Final verdict

**RATIFIED. MODEL P — price only.** L22 = `journeyRole: standard`, **exactly one acquisition demand (`adverb-combien`)**, `chunk-natural-speech` + `thematic-context`, canDo *"Ask how much something costs before I order it."*, price answers written as a numeral plus `€` and never spoken, **productive quantity deferred to a later doorway**. Compact spec next; no candidate is authorized by this document.

---

*End of L22 Price Gate Review. Planning/review only.*
