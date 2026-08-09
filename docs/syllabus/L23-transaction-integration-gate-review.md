# L23 — Transaction Integration · Gate Review

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/ai-generation-contract-v1.md` + **`docs/syllabus/L21-L24-pre-campfire-sequence-decision-v1.md`** (the ratified sequence) + the L21 / L22 gate reviews and the **shipped** L0–L22 corpus and runtime.
>
> **Planning/review only.** Authorizes no lesson file, no candidate, no identity, no runtime change.
>
> **The question this review had to answer:** is L23 a real integration, or is it *"L19 at a café"*? §2 shows the danger is worse than that — L22's shipped exit **already runs the transaction end to end**, so the sequence's working canDo was largely delivered a lesson early. §3 is the answer.

---

## 1. Shipped inputs — what L23 has to work with

**23 lessons, 27 demands, 65 identities.** Everything below is demand-backed unless marked.

| Group | Owned |
|---|---|
| **Transaction spine** | `chunk-bonjour` (L0) · `chunk-je-voudrais` (L0) · `chunk-un-cafe` (L5) · `chunk-sil-vous-plait` (L0) · `chunk-merci` (L1) · `chunk-au-revoir` (L6) |
| **Price** | `adverb-combien` (L22) — productive `C'est combien ?`, `Un café, c'est combien ?`, `Le café, c'est combien ?`; bare `Combien ?` accepted only where the referent is unmistakable; price answers are a **numeral + `€`**, never French |
| **Evaluation** | `adj-bon` (L21) — `C'est bon.` / `Ce n'est pas bon.`, about a thing's quality, never about a price |
| **Question / social** | `adverb-comment` (L18) — `C'est comment ?`, `Le café, c'est comment ?`, `Comment ça va ?` · `chunk-ca-va` (L17) |
| **Host** | `chunk-c-est` — **supported, never a demand**, produced unaided since L18 |

**Availability is not obligation.** `chunk-ca-va`, `chunk-je-suis`, `adj-fatigue`, `chunk-il-faut`, `chunk-on-y-va` and the rest of the L0–L20 world are available and are **not** required; forcing them in would be the coverage sweep this review exists to prevent.

**One trap recorded here so it cannot be walked into:** `chunk-non-merci` (`Non, merci.`) is registry-**supported**, never a demand. It is the obvious way to decline and it is **not owned**. The owned decline is `Merci, au revoir.` — which is the registry's own example sentence for `chunk-au-revoir`.

---

## 2. The comparison — measured from shipped exits

| | **L16** | **L19** | **L20** | **L21** | **L22** |
|---|---|---|---|---|---|
| Role / demands | integration / 0 | integration / 0 | milestone / 0 | doorway / 1 | standard / 1 |
| Ranks | 4,3,2,0 | 4,3,2,0 | 2,1,0 | 3,2,1,0 | 3,2,1,0 |
| Scene | class ends, someone says `On y va ?` | meet someone outside a café | walking home, meet someone | outside the café, someone you know | a café counter, nothing posted |
| Learner goal | say what has to happen and where you're going | greet, ask, get you both somewhere | open it, ask, say how you are, end it | greet, ask, say what you thought of the coffee | greet, find out the price, decide |
| Exit model | `Il faut faire une pause. Je vais à la maison.` | `Bonjour ! Comment ça va ? Il faut faire une pause. Le café, c'est comment ? On y va ?` | `Bonjour ! Comment ça va ? Je suis fatigué. Il faut faire une pause. On y va ?` | `Bonjour ! Comment ça va ? Le café, c'est bon.` | `Bonjour ! Un café, c'est combien ? Je voudrais un café, s'il vous plaît.` |
| Routes offered | 1 | 2 | 3 | 2 | 2 (incl. **don't buy**) |
| Agency | low | low | **high** — learner chooses the shape | medium | medium |
| Walked through the same sequence earlier? | partly | yes | **no** (nothing pre-printed) | partly | partly |

**The finding that reframes this gate:** **L22's exit is already the end-to-end transaction** — greet → ask the price → decide → order, with a no-buy route. The sequence decision's working canDo (*"greet, order, ask what it costs, say what I think, and close"*) is therefore **already ~80% shipped**, and adding `C'est bon.` to it would produce *"L22's say-it plus one sentence"*, not an integration.

---

## 3. D1–D4 — what L23 must require that nothing else does

Across **every** shipped exit, one thing has never been asked: **the learner has never had to let information they received decide what they say next.** L19's `Ça ne va pas ? Il faut faire une pause.` comes closest, but the input is a person's mood and every route stays acceptable. Nothing in the corpus makes an **external fact** change which ending is right.

> ### The integration thesis
> **L23 is the transaction under a condition, and then reported.**
> The price the learner asks for **determines** whether ordering is the right ending — and what they can truthfully say about the coffee afterwards depends on whether they bought it.

| | Answer |
|---|---|
| **D1 — vs L19** | L19 is a *social* exchange: greet, ask how someone is, act on their state. L23 contains **no social-state question at all**; it turns on an **external fact** (a price) that the learner obtained by asking, and that fact **changes which ending fits**. L19's routes were all equally acceptable; L23's are not. |
| **D2 — vs L20** | L20's power was that the learner **chose** the shape of the moment — no ending was more correct than another. L23 inverts it: the shape is **determined by the situation**. Same length, opposite demand. That is also why L23 must not be a milestone (D4). |
| **D3 — vs L22** | L22 taught the question and offered buy / don't-buy as a **free** choice — nothing in the scene favoured either. L23 makes the branch **contingent**: given *this* price and *this* constraint, one ending fits and the other does not. It then adds a beat L22 has no basis for at all — **reporting** what it was like, which requires having bought and drunk it. |
| **D4 — why Integration, not Milestone** | A milestone proves capability with **maximum agency and no right answer** (L20's design, and L24's job). L23 has a right answer per scene: the price constrains the ending. It teaches nothing new, but it **practises under constraint** — which is integration. Making it a milestone would leave L24 with nothing to prove. |

---

## 4. Model S vs Model T

| | **MODEL S — one scene** | **MODEL T — two beats** |
|---|---|---|
| Shape | one continuous counter interaction | beat 1 at the counter; beat 2 later, to a friend |
| Coherence | strongest by construction | must be **welded**, or it reads as two mini-lessons |
| `bon` | **semantically forced** — the learner has not tasted the coffee. Making the café familiar so they *can* evaluate makes asking its price odd. This is the N4 failure. | **natural** — they bought it, drank it, and are now saying so |
| Contingent branch | works | works |
| Reporting beat | impossible | the beat no shipped lesson has |

**SELECTED: MODEL T.**

**Why S lost:** it cannot host evaluation honestly. Forcing `C'est bon.` at a counter before tasting is exactly the "cover L21" defect §9 of the gate task forbids, and the only way to fix it inside one scene (make the café familiar) destroys the reason to ask the price.

**How T's risk is neutralised — this is binding.** Beat 2 must **depend on beat 1**: the friend's question is answerable only because of what happened at the counter, and a learner who did not buy has nothing to report. The two beats are one arc *because the second is a consequence of the first*, not because they are adjacent. If a candidate authors beat 2 as a free-standing café chat, it has failed.

---

## 5. canDo

> **"Ask what something costs, decide what to do about the answer, and tell someone afterwards how it was."**

Capability, not coverage: it names the **dependency** (decide about *the answer*), covers both beats, and claims no free conversation. The sequence's list-shaped working canDo is superseded; the supersession is recorded in `docs/syllabus/L21-L24-pre-campfire-sequence-decision-v1.md`.

---

## 6. Role, demands, archetypes

| Field | Value |
|---|---|
| **JourneyRole** | **`integration`** — band **0**, L23 takes **0**, PASS |
| **`acquisitionDemandItemIds`** | **`[]`** |
| **Primary archetype** | **`review-integration`** (real enum member; the L6/L10/L13/L16/L19 mapping) |
| **Secondary archetype** | **`thematic-context`** — the café transaction |
| **Prerequisite** | `["v1-lesson-022"]` |
| **Feedback mode** | `model-answer-only`, deterministic reveals |

**Zero-demand proof.** Every surface the arc needs is demand-backed: `bonjour`, `combien` + the `c'est` host, `je voudrais` + `un café` + `s'il vous plaît`, `merci`, `au revoir`, `bon`, `ce n'est pas`, `comment`. **Nothing in §7's arc requires a word the learner does not own.** If an authoring idea needs one, **the scene changes — never the demand count.** Should the candidate task find an unavoidable requirement, that is a **STOP and founder review**, not an identity.

---

## 7. The arc and the decision branch

```
BEAT 1 — the counter
  Bonjour !
  Un café, c'est combien ?          (or C'est combien ? / Le café, c'est combien ?)
  [price shown: a numeral + €]
  → the price is fine       → Je voudrais un café, s'il vous plaît.   → Merci.
  → the price is not fine   → Merci, au revoir.

BEAT 2 — afterwards, to someone you know
  Le café, c'est comment ?          (they ask)
  → C'est bon.  /  Ce n'est pas bon.
```

**The decision branch is ratified and load-bearing.** It needs **two** price displays — a low one and a high one — because the branch *is* the price; that is the "genuinely needs it" exemption §12 of the gate task reserves. Both are numerals plus `€`, whole euros, and plausible for a coffee.

**The no-buy route is natural in owned French.** `Merci, au revoir.` is the registry's own example for `chunk-au-revoir`. **`Non, merci.` is blocked** — `chunk-non-merci` is supported, not owned. No price adjective (`cher`, `pas cher`, `trop cher`) exists and none may be invented; the learner declines by leaving politely, which is what a real customer does.

---

## 8. Agency, dependency, support

**Agency — where it must live.** The contingent beat is **not** agency (the price decides it); that is dependency. **TRUE AGENCY belongs in beat 2**: whether the coffee was good or not is the learner's own truth and both routes are fully owned. A second, weaker point is the close (`Merci.` vs `Merci, au revoir.`). Bare vs named price question is **EQUIVALENT SURFACE**. At least one TRUE AGENCY point is required; punctuation and article variants count for nothing.

**Production dependency — the architecture test.** Every production beat must be classified DEPENDENT / SEMI-DEPENDENT / INDEPENDENT DRILL. The intended profile:

| Beat | Class |
|---|---|
| ask the price | SEMI-DEPENDENT (follows the greeting) |
| act on a low price → order | **DEPENDENT** |
| act on a high price → leave | **DEPENDENT** |
| report to the friend | **DEPENDENT** (only possible because you bought) |

**A majority of DEPENDENT beats is the requirement.** If a candidate's beats are mostly independent drills, the architecture is wrong regardless of what the validators say.

**Support philosophy.** Shipped integrations opened at rank 4 (L16, L19), but both predate L20's floor and both introduced their integration *shape* for the first time. L21 and L22 run 3 → 2 → 1 → 0.

- **Binding: L23 must not open at `supported` (4).** Nothing here is new.
- **Prefer opening at `mid` (3) or `context` (2)** and falling to unsupplied production. The *language* is entirely owned, but the *task* — an outcome determined by information — is new, which is what a mid opening would pay for.
- **Recorded for the L24 gate:** if L23 lands on 2 → 1 → 0, L24 has no room left on the ladder and must differentiate by **architecture and agency** instead, exactly as L20 did with no meet-card and no fill.

---

## 9. Price display — unchanged from L22

Numeral + `€` only. **No `itemId`, no evidence target, no chip, no recap entry, no French lexical claim, no `tts: true` surface, no meet-card `fr` field, and no copy saying anyone *said* the price.** The learner **reads** it. Two displays are permitted here **only** because the decision branch depends on them.

---

## 10. C1–C5 — continuity from L22

**C1 — reuses `combien` for a real purpose? YES**, it opens both counter scenes and produces the fact everything else turns on.
**C2 — does the price affect a later action? YES** — that is the spine, not a garnish.
**C3 — L21 evaluation only where natural? YES** — beat 2 only, after buying and drinking.
**C4 — recombines earlier ordering/social material? YES** — `bonjour`, `je voudrais un café, s'il vous plaît`, `merci`, `au revoir`, and L18's `Le café, c'est comment ?` finally asked *by the other person* so the L21 answer has its natural home.
**C5 — fuller than L22? YES** — L22 asks and freely chooses; L23 asks, is **constrained** by the answer, and then reports.

---

## 11. L24 handoff

L23's job is **practise the full transaction**. L24's is **prove the threshold and look beyond**. They must not blur.

**L23 must NOT:** behave like a milestone · make any threshold or arrival claim · say the learner has completed the arc · mention or imply Campfire · preview past or future tense in any form · carry any unlock, score, badge or percentage.

---

## 12. French naturalness — N1–N5

| | Verdict |
|---|---|
| **N1 — order of moves realistic?** | **YES.** Greet, ask the price where nothing is posted, decide, order or leave, and mention it later. That is an ordinary counter. |
| **N2 — asking the price before ordering natural?** | **YES.** `Un café, c'est combien ?` at a counter with no board is exactly what a customer says. |
| **N3 — declining with owned language natural?** | **YES.** `Merci, au revoir.` — polite, complete, and the registry's own example. No excuse or price adjective is needed; French customers leave this way. |
| **N4 — does `bon` have a plausible basis?** | **YES, and only under Model T.** The learner bought it and drank it. This is the single strongest argument for T. |
| **N5 — greetings/closings appropriate?** | **YES.** `Bonjour !` opens a counter; `Merci.` closes a purchase; `Merci, au revoir.` closes a non-purchase. Beat 2 needs no address form, so no unowned `tu`/`vous` production is required. |

**No core route requires awkward French to stay inside ownership.** Where one would, the architecture changed (Model S → Model T), never the language.

---

## 13. Prohibited

French number words (`deux`, `trois`, …) · `euro` / `euros` · `combien de` · quantity `de` / `des` · `en` · partitives · `coûter` · `ça fait combien` · `l'addition` · price adjectives (`cher`, `pas cher`, `trop cher`) · `mauvais` · `j'aime` / `j'adore` · `mais` · **`Non, merci.`** (`chunk-non-merci` is supported, not owned) · a new noun, adjective, verb or connective of any kind · RR-A (`je ne comprends pas`, `vous pouvez répéter ?`, `c'est pas grave`, bare `Comment ?`) · past tense · futur proche · a second new question word · any Campfire, threshold, arrival or completion claim · any unlock, score or badge copy · en/em dashes in learner copy.

*(Semantic, not mechanical: an owned token is not a violation because a blocked phrase happens to contain it.)*

---

## 14. Surface Inventory — required before generation

**The L22 authoring sequence is now the standard and is binding for L23:** **ownership → scratch Surface Inventory → screens.** The candidate task **must** create `/tmp/.../scratchpad/l23/surface-inventory.md` **before** writing any screen, containing: **A** transaction anchor surfaces · **B** the price-question family · **C** buy / no-buy route surfaces · **D** evaluation surfaces · **E** open/close surfaces · **F** end-to-end sentence sequences · **G** blocked/unowned surfaces · **H** the non-French price displays. Every surface carries a **communicative job, items/chunks, ownership class, expected learner behaviour and variation dimension**.

**Scratch only. Not tracked, no validator, no framework, no backfill of earlier lessons.**

**Because acquisition is 0, richness must come from recombination.** The quality test the candidate task must answer: *"Does L23 create new communicative **sequences** from known material, or merely repeat known isolated sentences?"* It must report **distinct meaningful French surfaces** and **new meaningful combinations** — with **no numeric quota** and no padding.

**Canonical-transcript trap.** L23 must not become one long required script taught line by line. A model answer may exist for runtime reasons, but accepted routes must be semantically legitimate, agency must survive, and **earlier screens must not pre-print the final route**. The candidate task must run an explicit **support-leak audit** classifying each exit clause as SUPPLIED BEFORE / LEARNER-RETRIEVED BEFORE / NOT REHEARSED, as L20 did.

---

## 15. Factory viability

Expressible with **current Factory V0 and the shipped runtime**: existing screen types only, deterministic validation, no new validator, no runtime AI, no new identity semantics, no new journey role, no new archetype member. Zero demands means preflight has no acquisition to resolve. **No infrastructure work is required.**

---

## 16. Verdict

**RATIFIED.** L23 = `journeyRole: integration`, **0 acquisition demands**, `review-integration` + `thematic-context`, **Model T** — the transaction under a condition, then reported. Its distinguishing requirement, which no shipped lesson makes, is that **an external fact the learner obtained by asking determines what they say next**. Compact spec next; no candidate is authorized by this document.

---

*End of L23 Transaction Integration Gate Review. Planning/review only.*
