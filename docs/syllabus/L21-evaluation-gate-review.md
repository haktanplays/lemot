# L21 — Evaluation ("Say what you think") · Gate Review

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/canonical-item-id-convention-v0.1.md` + `docs/syllabus/ai-generation-contract-v1.md` + **`docs/syllabus/L21-L24-pre-campfire-sequence-decision-v1.md`** (the ratified sequence) + `docs/bibles/curriculum/CURRICULUM_CHARTER_v1.0.md` + `docs/bibles/content/CONTENT_BIBLE_v1.0.md` §6.8 + the **shipped** L0–L20 corpus and runtime.
>
> **Planning/review only.** Authorizes no lesson file, no candidate, no runtime change. The identity work it ratifies is committed separately.

---

## 1. Executive summary

- **What is L21's job?** **Close the answer gap L18 shipped.** L18 taught the learner to ask `Le café, c'est comment ?` and canon records that the question **takes no French answer**, because no evaluative word was owned and none was invented. L21 gives them the answer.
- **What does it own?** **One identity, one demand: `adj-bon`.** The unit is the **word**, not a frozen sentence.
- **Is the host owned?** **Partly, and the audit changed the plan.** See §2–§4: `chunk-c-est` is *supported* and has never been a demand — but `chunk-ce-n-est-pas` **is an L3 demand**, so the negative host is fully owned, and the positive host is the same supported host L18, L19 and L20 already ride unaided.
- **JourneyRole** `doorway`, **1 demand**, band 1–2 → **PASS**.
- **Is it thin?** It is small on purpose. Compositionality is proved by **polarity** and by **question-answer role**, not by vocabulary.

---

## 2. The contradiction this gate review had to resolve

The sequence decision's L21 card said the evaluator would sit *"inside the owned `c'est ___` frame."* **That was not proven, and the audit shows it is not accurate as written.**

`chunk-c-est` is registry-`supported` and appears in **no** lesson's `acquisitionDemandItemIds`. Every one of the 25 shipped demands is registry-`active`; there is no precedent for a demand on a supported item. Exposure and support are not ownership, and the card's wording assumed otherwise.

**Resolving it before writing the spec was mandatory. The resolution is §4.**

---

## 3. `c'est` — shipped history, read from code

| Question | Answer, from shipped screens |
|---|---|
| **Where first introduced?** | **L3**, as background inside `Ce n'est pas ici.` — the demand there is `chunk-ce-n-est-pas`, not `c'est`. It first appears **positively** at **L8** (`C'est où ?`, `C'est ici.`), on meet-card highlights and as an optional weave piece. |
| **Ever a demand?** | **Never**, in any of the 21 shipped lessons. |
| **Ever independently produced?** | **Yes, repeatedly and unaided.** L18 `s05` (`Le café, c'est comment ?`), `s06`, `s08` (`C'est comment ?`), L19 `s06`, L20 `s03` — in all five the item is a screen target with **no `suggestedPieces` entry at all**, so the learner retrieves it. |
| **Only inside frozen/support structures?** | **No.** L8 owns the frozen whole `chunk-c-est-ou`, but the same lesson also has the learner produce `C'est ici.`, and L18 produces `Le café, c'est comment ?`. Three different predicates (`où`, `ici`, `comment`) plus topic-fronting and the `est-ce que` wrapper — compositional behaviour, not one frozen chunk. |
| **What productive behaviour is justified after L20?** | `c'est` + place adverb · `c'est` + question word · topic-fronted `Le X, c'est …` · wrapped `Est-ce que c'est … ?`. **Never `c'est` + adjective** — no adjective has ever followed it in any shipped production. That gap is precisely L21's opening. |
| **Consistently classified?** | **Under-claimed, and deliberately so.** `DD-002 v1-lesson-003/chunk-c-est` is one of the **seven recorded "supported / composed, not a demand" founder calls** pinned in the drift test. The classification is a decision, not drift. |

---

## 4. Identity model — A vs B vs C

### MODEL A — frozen whole (`chunk-c-est-bon`) — **REJECTED**

Fails **D2** (a frozen sentence yields no reusable `bon`), **D4** (the negative needs a *second* frozen whole, `chunk-ce-n-est-pas-bon`), and **D6** (Mon Lexique would show a sentence the learner cannot vary). It also repeats the exact pattern the corpus already treats as the weaker branch: `canonicalItems.test.ts` pins the L8-vs-L18 contrast — *"L8 owns `chunk-c-est-ou` (a frozen question) and leaves `adverb-ou-where` merely supported inside it, whereas L18 declares `adverb-comment` itself"* — and calls that asymmetry "the whole point". Minting `chunk-c-est-bon` would put L21 on the L8 side of a contrast the curriculum has already decided.

### MODEL C — promote host + add evaluator (`chunk-c-est` + `adj-bon`) — **REJECTED, and the founder's conditional applies**

The founder's default recommendation, conditional on the audit proving promotion is *"semantically and architecturally clean"*. It is neither.

- **Semantically false.** `acquisitionDemandItemIds` is defined as *"the distinct **new** learner-facing active production demands a lesson introduces"*. The learner has produced `c'est` unaided **five times across L18–L20**, including inside the Milestone. Declaring it new at L21 asserts a novelty the shipped corpus disproves — the same phantom-ownership failure class, running in the opposite direction.
- **Architecturally unclean if the status flips.** `content/lesson-v1-evidence/treatment.ts` resolves treatment from `lesson.learningItems[].status`, and `getItems` reads the **global registry**. Flipping `chunk-c-est` to `active` would retroactively change the recorded treatment in **seven shipped lessons** — L8 (where it is first met), L10, L12 (where it is a `required` piece), L13, L18, L19, L20 — converting scaffolded encounters into independent-production claims. The registry's own rule is explicit: *"NOT RETROACTIVE: acquisition ownership is authored pedagogical history."* There is no per-lesson status override and no precedent for one.
- **Incoherent if the status does not flip.** L21 would then declare a demand whose treatment inside L21 still resolves to `supported`.

Model C is legal — `AD` explicitly permits demanding a supported item (the IC-002 promotion case) and `DD-003` exists to surface it. **Legal is not honest here.**

### MODEL B — adjective only (`adj-bon`) — **SELECTED**

One demand. `chunk-c-est` is untouched — no status change, no declaration, no new composite.

| Criterion | Result |
|---|---|
| **D1 ownership honesty** | **PASS**, and better than the card assumed. The **negative host `chunk-ce-n-est-pas` is an L3 acquisition demand** — fully owned — so at least one host of `bon` is demand-backed. The positive host is the same supported host L18, L19 and L20 already ride unaided; L21 relies on it exactly as they do and claims nothing new about it. |
| **D2 compositional value** | **PASS** — `bon` is reusable across both polarities and both roles (statement, answer). |
| **D3 scope containment** | **PASS** — see §6; no `c'est + any adjective` rule is taught. |
| **D4 negative recombination** | **PASS** — `Ce n'est pas bon.` recombines an owned L3 demand with the new word. |
| **D5 acquisition economy** | **PASS** — one identity. The only thing the learner genuinely cannot retrieve today is `bon`. |
| **D6 Mon Lexique truthfulness** | **PASS** — one entry, one retrievable word, shown in the frame it lives in. |

**Precedent, exactly parallel:** L18 owned the *word* (`adverb-comment`), left both hosts alone, and minted neither `chunk-comment-ca-va` nor `chunk-c-est-comment`. L21 does the same one band later.

**Recorded consequence:** `L21 demands = 1`, not 2. Total after L21 ships = **26**, not 27.

---

## 5. French naturalness — N1–N4

| | Verdict |
|---|---|
| **N1 — `C'est bon.` as an evaluation** | **Natural, and the default.** For food and drink it is what a French speaker actually says; a learner reaching for an English-shaped alternative would sound worse, not better. |
| **N2 — `Ce n'est pas bon.` as the negative route** | **Natural and correct.** Slightly formal against spoken `C'est pas bon.`, which is why it is the right one to own: it is the **canonical shape the learner already has** (`chunk-ce-n-est-pas`, L3 demand). The colloquial `ne`-drop is a register decision no current canon licenses, so it is **not** taught and **not** accepted. |
| **N3 — polysemy** | **Real, and handled by context rather than by teaching.** `C'est bon.` also means *"that's enough / that's fine / we're done"* in everyday speech. L21 must never gloss that sense, never present it, and never place the phrase where it could read that way — no "handing something over" scene, no "is that all?" scene. Every use must evaluate a **nameable thing** the learner owns. |
| **N4 — `Le café, c'est bon.` vs bare `C'est bon.`** | **Both natural; prefer the bare form as the answer.** Once `Le café, c'est comment ?` has established the referent, answering `Le café, c'est bon.` re-names it and sounds heavy. Topic-fronting belongs to the **statement** use (opening an evaluation unprompted); the **answer** use is bare. This mirrors L18's own asymmetry and is a spec-level rule, not a lecture for the learner. |

---

## 6. Bounded `bon` — what ownership does and does not include

**Owned:** evaluative `bon` in the **predicate slot after an owned `c'est` / `ce n'est pas` host**, about a thing.

**Not owned, not taught, not shown:** attributive `un bon café` · `bonne` · `bons` / `bonnes` · `très bon` or any intensifier · `meilleur` or any comparison · `j'aime` or preference verbs · `c'est mauvais` · adjective **placement** rules · adjective **agreement** as a system · the *"that's enough"* sense.

**`bon` being typed `adjective` in the registry does not authorize every adjective use.** The registry row carries **no `gender` tag** for exactly this reason — unlike `adj-fatigue` and `adj-content`, whose gendered pair *is* deliberately shown, L21's use is invariable, so no existing tag fits. See §9.

---

## 7. The L18 answer loop — load-bearing

L21 is not "here is a new adjective". It is **the answer to a question the learner already asks.**

```
L18 (shipped):  Le café, c'est comment ?   → no owned French answer
L21:            Le café, c'est comment ?   → C'est bon.
```

**Binding on the compact spec:** at least one learner production path must demonstrate that exchange, and the lesson's own framing must make the closure visible — *"now I can answer the question I learned to ask."* If a candidate could be re-ordered into any other lesson without loss, it has missed the job.

**The L18 host asymmetry is hereby lifted for `bon` only.** `C'est comment ?` may now take a French answer — that one. It does not become answerable in general, and no other descriptive answer is licensed.

---

## 8. Thinness and compositionality

One demand is small. **Variation must come from polarity, role, context and support — never from vocabulary.** The minimum a candidate must demonstrate:

1. **Both polarities:** `C'est bon.` and `Ce n'est pas bon.`
2. **Both roles:** evaluation offered unprompted (statement) and evaluation given as an answer (the §7 loop).

If a candidate only ever produces `C'est bon.`, the doorway is a frozen chunk in disguise and Model A won by the back door. That is the first thing to check in review.

---

## 9. Identity, QA and tags

| | |
|---|---|
| **Identity** | `adj-bon` · `type: "adjective"` (existing type; no new `LearningItemType`) · `status: "active"` · `text`/`fr` `bon` · related to `chunk-c-est`, `chunk-ce-n-est-pas`, `adverb-comment` |
| **Not created** | `chunk-c-est-bon` · `chunk-ce-n-est-pas-bon` · `adj-mauvais` · any `acquisitionComponents` (this is an atomic word, not a coverage claim) |
| **French QA** | `founder_waived_provisional` — same posture and same reason as PR-07, L17 and L18. **No named human has read this surface, no reviewer or date exists, and none is claimed.** Provisional inventory 9 → **10**. |
| **`chunk-c-est` QA** | **Unchanged.** It is not promoted, so its reachability semantics do not change and its (absent) QA field needs no edit. |
| **weakPointTags** | **None, and deliberately.** `gender` is the obvious candidate and is **wrong here**: L21's owned use is invariable predicate `bon`, and forcing the tag would advertise an agreement contrast the lesson refuses to teach. No other existing tag fits an evaluative predicate adjective. **Left untagged; recorded as taxonomy debt** alongside `chunk-je-peux`, `chunk-est-ce-que`, `chunk-il-faut` and `adverb-comment`. Not blocking: nothing in L21's job depends on weakness eligibility. |
| **Registry** | 63 → **64**; manifest frozen at 64. |

---

## 10. Archetypes, role, context

| Field | Value |
|---|---|
| **JourneyRole** | **`doorway`** — band 1–2, L21 takes **1**, PASS. No exception requested. |
| **Primary archetype** | **`thematic-context`** (prose *Thematic Vocabulary / Context #9*), following L17's worked finding that this archetype can run **recycle-dominant with a capped adjective** rather than as a word list |
| **Secondary archetype** | **`chunk-natural-speech`** — `C'est bon.` is a natural-speech evaluation before it is a grammar point |
| **Context** | The café, the coffee, the break — **only what is already owned.** No new noun inventory. |
| **Prerequisite** | `["v1-lesson-020"]` |
| **Feedback mode** | `model-answer-only`; deterministic reveals throughout |

---

## 11. Prohibited

Any second adjective · `très` / intensifiers · comparison · `j'aime` · attributive `bon` · `bonne` / `bons` / `bonnes` · adjective agreement or placement as a system · the *"that's enough"* sense of `c'est bon` · new nouns · `c'est pas bon` (unlicensed register) · broad opinion or descriptive language · the repair rail (RR-A) · past or future tense · a second new question word · any claim that `chunk-c-est` is newly owned · any unlock, gate, score or Campfire-arrival copy · en/em dashes in learner copy.

---

## 12. QA risks

| Risk | Guard |
|---|---|
| **Frozen chunk in disguise** — only ever `C'est bon.` | §8's two-polarity, two-role minimum. **Check first.** |
| **Polysemy leak** — the phrase reads as *"that's enough"* | §5 N3: every use evaluates a nameable owned thing; the other sense is never shown or glossed |
| **Adjective-lesson drift** — a second adjective "for variety" | §6, §11. One word. Variation comes from polarity and role. |
| **Agreement leak** — `bonne` appears anywhere | §6; the row carries no `gender` tag precisely so nothing invites it |
| **False host claim** — copy implying `c'est` is newly owned | §4; L21 owns one word |
| **L18 loop missed** — reads as an unrelated new adjective | §7; the exchange must appear |
| **Register drift** — `C'est pas bon.` | §5 N2; the owned canonical negative only |
| **French QA** | L21 adds **one** identity under a founder waiver. No named-human French QA exists anywhere in this repo, and no reviewer, date or `approved` status may be recorded that the founder has not supplied. |

---

## 13. Factory readiness

Expressible with **current Factory V0 and the shipped runtime**: existing screen types only, deterministic validation (`exact-or-alternative` on weaves, `model-answer-only` on say-it), no new validator, no runtime AI, no new identity semantics, no new journey role, no new archetype member. The `adj-bon` identity exists and is manifest-frozen, so a contract preflight can resolve every required id.

**No infrastructure work is required.**

---

## 14. Final verdict

**RATIFIED.** L21 = `journeyRole: doorway`, **exactly one acquisition demand (`adj-bon`)**, `thematic-context` + `chunk-natural-speech`, closing L18's answer gap with bounded evaluative `bon` across both polarities and both roles. `chunk-c-est` is **not** promoted and its status is **not** changed. Compact spec next; no candidate is authorized by this document.

---

*End of L21 Evaluation Gate Review. Planning/review only.*
