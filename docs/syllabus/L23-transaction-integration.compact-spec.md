# L23 — Transaction Integration · Compact Lesson Spec

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/ai-generation-contract-v1.md` + **`docs/syllabus/L21-L24-pre-campfire-sequence-decision-v1.md`** + **`docs/syllabus/L23-transaction-integration-gate-review.md`** (the architecture this spec implements) + the L19 / L21 / L22 specs and the **shipped** L0–L22 corpus and runtime.
> **Compact spec** — planning/spec only. Authorizes **no** code, lesson content, identity, flag or runtime change. Locked product canon wins on conflict. Dev APK runtime (L1–L5 only) is unaffected.

> ## Founder-locked inputs
>
> 1. **`journeyRole: "integration"`**, **`acquisitionDemandItemIds: []`**. 2. The centre of gravity is the **transaction** L22 opened and L21 enriched — **no price question means L23 has no reason to exist**. 3. No new anything: noun, adjective, verb, connective, number, currency, repair phrase. 4. L23 practises; **L24** proves the threshold.
>
> **Adjudicated by the gate review:** **MODEL T — two beats.** The transaction runs under a **condition**, and is then **reported**. The list-shaped working canDo from the sequence decision is superseded.

---

## 1. Lesson Identity

| Field | Value |
|---|---|
| **Lesson number** | L23 |
| **Lesson title** | *(placeholder — keep it plain; "Transaction Integration" is the job name, not a title)* |
| **Journey phase** | First Ascent (Core 150) · **pre-Campfire**, free |
| **Journey role** | **`integration`** — band 0, L23 takes **0**, PASS |
| **Primary archetype** | schema **`review-integration`** |
| **Secondary archetype** | schema **`thematic-context`** |
| **Prerequisites** | `["v1-lesson-022"]` |
| **Estimated lesson time** | ~6 min |
| **Monolingual mode** | `english-guided` |
| **Feedback mode** | `model-answer-only`, deterministic reveals |
| **Practice Pool expansion** | Build + Stretch + Challenge (lesson-scoped) |
| **Main can-do outcome** | **"Ask what something costs, decide what to do about the answer, and tell someone afterwards how it was."** |

---

## 2. Acquisition — zero, and structurally so

`acquisitionDemandItemIds: **[]**` · corpus total stays **27** · registry stays **65** · provisional QA stays **11**.

**No identity may be added for L23.** If an authoring idea requires a word the learner does not own — a price adjective, a decline phrase, a number, a connective — **the scene changes, never the demand count.** An unavoidable requirement is a **STOP and founder review**, because it would contradict the ratified Integration/0 posture.

---

## 3. The arc

```
BEAT 1 — the counter
  Bonjour !
  Un café, c'est combien ?        (or C'est combien ? / Le café, c'est combien ?)
  [price shown as a numeral + €]
  → price is fine       → Je voudrais un café, s'il vous plaît.  → Merci.
  → price is not fine   → Merci, au revoir.

BEAT 2 — afterwards, to someone you know
  Le café, c'est comment ?        (they ask)
  → C'est bon.  /  Ce n'est pas bon.
```

**Binding weld.** Beat 2 must be a **consequence** of beat 1: the friend's question is answerable only because of what happened at the counter, and a learner who did not buy has nothing to report. **A free-standing café chat in beat 2 is a failure**, not a stylistic choice.

---

## 4. Required / recycled inventory

| Role | Items |
|---|---|
| **Price** | `adverb-combien` · `chunk-c-est` *(supported host — ridden as in L18–L22, nothing new claimed)* |
| **Order** | `chunk-je-voudrais` · `chunk-un-cafe` · `chunk-sil-vous-plait` |
| **Open / close** | `chunk-bonjour` · `chunk-merci` · `chunk-au-revoir` |
| **Evaluation** | `adj-bon` · `chunk-ce-n-est-pas` |
| **The question the friend asks** | `adverb-comment` · `noun-cafe` |

**Available and deliberately NOT required:** `chunk-ca-va`, `chunk-je-suis`, `adj-fatigue`, `adj-content`, `chunk-il-faut`, `chunk-je-peux`, `chunk-on-y-va`, `word-y-place`, `chunk-est-ce-que`. **Availability is not obligation** — forcing any of them in to "cover" an earlier lesson is a coverage sweep and a defect.

---

## 5. The decision branch — load-bearing

The price **determines** the ending. This needs **two** price displays, a low one and a high one; that is the only justification for a second price and it is granted here.

| Route | Owned French |
|---|---|
| **Buy** | `Je voudrais un café, s'il vous plaît.` then `Merci.` |
| **Don't buy** | `Merci, au revoir.` |

**`Non, merci.` is BLOCKED** — `chunk-non-merci` is registry-**supported**, never a demand. `Merci, au revoir.` is the owned decline and is the registry's own example for `chunk-au-revoir`. **No price adjective exists** (`cher`, `pas cher`, `trop cher`) and none may be invented; the learner declines by leaving politely, which is what a real customer does.

---

## 6. Agency

**At least one TRUE AGENCY point is required.** It lives in **beat 2**: whether the coffee was good or not is the learner's own truth, and both routes are fully owned. A weaker second point is the close.

**The contingent beat is NOT agency** — the price decides it. That is dependency, and it is the lesson's spine. Do not confuse the two, and do not count punctuation, article or bare-vs-named variants as agency.

---

## 7. Production dependency — the architecture test

Every production beat is classified **DEPENDENT / SEMI-DEPENDENT / INDEPENDENT DRILL**, and **a majority must be DEPENDENT**:

| Beat | Required class |
|---|---|
| ask the price | SEMI-DEPENDENT |
| act on a low price → order | **DEPENDENT** |
| act on a high price → leave | **DEPENDENT** |
| report to the friend | **DEPENDENT** |

If most beats are independent drills, **the architecture is wrong** regardless of validator output. This is semantic review; no validator checks it.

---

## 8. Support philosophy

- **Binding: L23 must not open at `supported` (rank 4).** Nothing here is new. Shipped integrations L16 and L19 opened at 4, but both predate L20's floor and both introduced their integration shape for the first time.
- **Prefer opening at `mid` (3) or `context` (2)**, falling to unsupplied production. The language is entirely owned; the *task* — an outcome determined by information — is what a mid opening would pay for.
- `hintCloze` may hold a shape but must not spell the answer; no `suggestedPieces` may be `required` on the beat that carries the decision.
- Offline falls back to `model-answer-only`.

**Recorded for the L24 gate:** if L23 lands on 2 → 1 → 0, **L24 has no ladder room left** and must differentiate by architecture and agency, as L20 did with no meet-card and no fill.

**No screen count is fixed.**

---

## 9. End-to-end performance and the transcript trap

The lesson ends in one end-to-end performance, but it must **not** become a long required script taught line by line.

- A model answer may exist for runtime reasons; **accepted routes must be semantically legitimate**, and agency must survive.
- **Earlier screens must not pre-print the final route.**
- The candidate task **must** run a **support-leak audit** classifying every clause of the exit model as **SUPPLIED BEFORE / LEARNER-RETRIEVED BEFORE / NOT REHEARSED IN THIS L23 PATH**, as L20 did. Learner-retrieved is legitimate preparation; supplied is leakage. **Zero SUPPLIED BEFORE is the target**; a soft leak must be explained, not hidden.

---

## 10. Price display — unchanged from L22

Numeral + `€`, whole euros. **No `itemId`, no evidence target, no chip, no recap entry, no French lexical claim, never on a `tts: true` surface, never in a meet-card `fr` field, never produced by the learner, and no copy saying anyone *said* it.** The learner **reads** the price. Two displays are permitted **only** because §5's branch depends on them.

---

## 11. Surface Inventory — required before generation

**Binding authoring sequence: ownership → scratch Surface Inventory → screens.** The candidate task **must** create `/tmp/.../scratchpad/l23/surface-inventory.md` **before** any screen is written, with sections **A** transaction anchors · **B** price-question family · **C** buy / no-buy routes · **D** evaluation surfaces · **E** open/close surfaces · **F** end-to-end sequences · **G** blocked/unowned surfaces · **H** non-French price displays. Every surface records **communicative job · items/chunks · ownership class · expected learner behaviour · variation dimension**.

**Scratch only — not tracked, no validator, no framework, no backfill.**

**Because acquisition is 0, richness must come from recombination.** The candidate task must report **distinct meaningful French surfaces** and **new meaningful combinations**, and answer: *"Does L23 create new communicative **sequences** from known material, or merely repeat known isolated sentences?"* **No numeric quota. No padding. No new vocabulary to inflate a count.**

---

## 12. Blocked

French number words · `euro` / `euros` · `combien de` · quantity `de` / `des` · `en` · partitives · `coûter` · `ça fait combien` · `l'addition` · price adjectives (`cher`, `pas cher`, `trop cher`) · `mauvais` · `j'aime` / `j'adore` · `mais` · **`Non, merci.`** · any new noun, adjective, verb or connective · RR-A (`je ne comprends pas`, `vous pouvez répéter ?`, `c'est pas grave`, bare `Comment ?`) · past tense · futur proche · a second new question word · `C'est bon.` used about a **price** rather than the coffee · any copy implying `chunk-c-est` is newly owned · any claim the learner understood a **spoken** price · **any threshold, arrival, Campfire or journey-complete claim** · any unlock, score, percentage or badge · en/em dashes in learner copy.

*(Semantic, not mechanical: an owned token is not a violation because a blocked phrase contains it.)*

---

## 13. L24 boundary

L23 **practises** the full transaction. L24 **proves the threshold and looks beyond**. L23 must not behave like a milestone, make any arrival or completion claim, mention Campfire, or preview past or future tense in any form.

---

## 14. Continuity Map

| Field | Value |
|---|---|
| **Carry-in — L22** | `combien` and the price question, immediately reused for a real purpose |
| **Carry-in — L21** | `bon` — used **only** in beat 2, where the learner has actually tasted the coffee |
| **Carry-in — L18** | `Le café, c'est comment ?` — finally asked **by the other person**, so L21's answer has its natural home |
| **Carry-in — L0/L1/L5/L6** | `bonjour`, `je voudrais un café, s'il vous plaît`, `merci`, `au revoir` |
| **New introduced** | **nothing** |
| **Carry-out** | → **L24**, the threshold |
| **Fade plan** | none — nothing is acquired |

> **Principle check** (engine §8): introduces new — deliberately nothing ✓ · grows old — makes the price a *constraint* rather than a fact, and gives `bon` its first honest basis ✓ · prepares future — hands L24 a complete, practised transaction ✓.

---

## 15. Mon Lexique Implications

**No new entry, no status change.** Items worked gain another authored encounter. The price displays contribute nothing — they have no identity, which is the point.

---

## 16. QA Risks / Success Criteria

| Risk | Guard |
|---|---|
| **"L19 at a café"** | §3's weld and §7's dependency profile. L23 has **no social-state question**; if a candidate opens with `Comment ça va ?` and a state answer, it has drifted. **Check this first.** |
| **"L22's say-it plus one sentence"** | Gate review §2 — L22's exit already runs the transaction. L23's difference is the **condition** and the **report**, not extra length. |
| **Forced evaluation** | §3 — `bon` only in beat 2, only after buying |
| **Two mini-lessons** | §3's weld — beat 2 must be a consequence, not an adjacency |
| **Transcript memorization** | §9's support-leak audit |
| **Unowned decline** | §5 — `Merci, au revoir.`, never `Non, merci.` |
| **Coverage sweep** | §4's deliberate exclusions |
| **Price leak into speech** | §10 — never on a `tts: true` surface |
| **Threshold creep** | §13 — that is L24's job |
| **French QA** | L23 adds **no identity**, so no identity-level debt. Its sentences are unreviewed, as all repo French is: **no named-human French QA exists anywhere**, and no reviewer, date or `approved` status may be recorded that the founder has not supplied. |

**Success criteria:** the price the learner obtains **changes** what they say next · both branch endings are produced or chosen somewhere · the report beat is possible only because of the counter beat · at least one TRUE AGENCY point · a majority of DEPENDENT beats · zero SUPPLIED BEFORE clauses in the exit · **PQ-2 passes; PQ-3 stays advisory. No production-count floor is imposed.**

---

*End of L23 Transaction Integration Compact Spec. Spec only — no lesson content, no code, no identity, no runtime change. L23 = `journeyRole: integration`, **0 acquisition demands**, `review-integration` + `thematic-context`, **Model T**: the transaction under a condition, then reported. Its distinguishing requirement is that an external fact the learner obtained by asking **determines** what they say next — which no shipped lesson has ever asked.*
