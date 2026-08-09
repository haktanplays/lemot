# L21 — Evaluation ("Say what you think") · Compact Lesson Spec

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/canonical-item-id-convention-v0.1.md` + `docs/syllabus/ai-generation-contract-v1.md` + **`docs/syllabus/L21-L24-pre-campfire-sequence-decision-v1.md`** (the ratified sequence) + **`docs/syllabus/L21-evaluation-gate-review.md`** (the scope this spec implements) + the L17 / L18 specs and the **shipped** L0–L20 corpus and runtime.
> **Compact spec** — planning/spec only. Authorizes **no** code, lesson content, flag or runtime change. Locked product canon wins on conflict. Dev APK runtime (L1–L5 only) is unaffected.

> ## Founder-locked inputs
>
> 1. **`journeyRole: "doorway"`**, band 1–2. 2. **Job:** close the answer gap L18 shipped. 3. **Context:** café, break, already-owned objects and situations — **no new noun inventory**. 4. **Not an adjective lesson.** 5. `bon` is scoped to the bounded evaluative use only.
>
> **Adjudicated by the gate review, against the founder's default recommendation:** the identity model is **B (`adj-bon` alone)**, not C. `chunk-c-est` is **not** promoted to a demand and its registry status is **not** changed — gate review §4.

---

## 1. Lesson Identity

| Field | Value |
|---|---|
| **Lesson number** | L21 |
| **Lesson title** | *(placeholder — keep it plain; "Say what you think" is the working job name, not a locked title)* |
| **Journey phase** | First Ascent (Core 150) · **pre-Campfire**, free |
| **Journey role** | **`doorway`** — one new door, opened narrowly |
| **Primary archetype** | schema **`thematic-context`** (prose *Thematic Vocabulary / Context #9*), run **recycle-dominant** per L17's worked finding |
| **Secondary archetype** | schema **`chunk-natural-speech`** — `C'est bon.` is natural speech before it is grammar |
| **Prerequisites** | `["v1-lesson-020"]` |
| **Estimated lesson time** | ~5–6 min |
| **Monolingual mode** | `english-guided` |
| **Feedback mode** | `model-answer-only`, deterministic reveals |
| **Practice Pool expansion** | Build + Stretch + Challenge (lesson-scoped) |
| **Main can-do outcome** | **"Say what I think of something in French — that it is good, or not — and answer when someone asks me what a thing is like."** |

**Journey-role budget:** doorway band **1–2** · L21 count **1** · **PASS**. No exception requested.

---

## 2. Acquisition

| | |
|---|---|
| **`acquisitionDemandItemIds`** | **`["adj-bon"]`** — exactly one |
| **Projected corpus total after L21 ships** | 25 → **26** |
| **Registry** | 64 (`adj-bon` added and manifest-frozen ahead of this spec); **no further identity may be added** |
| **Not created** | `chunk-c-est-bon` · `chunk-ce-n-est-pas-bon` · `adj-mauvais` |
| **Not promoted** | `chunk-c-est` — see §3 |

---

## 3. Hosts — what is owned, stated exactly

| Host | Status | What L21 may claim |
|---|---|---|
| `chunk-ce-n-est-pas` | **active, L3 acquisition demand** | **Fully owned.** The negative route rests on a demand-backed host. |
| `chunk-c-est` | **supported, never a demand** | L21 rides it **exactly as L18, L19 and L20 already do** — target, no supplied piece, learner retrieves it. L21 claims **nothing new** about it. |

**Binding:** no learner copy, reveal, recap chip or Mon Lexique entry may present `c'est` as newly owned. The one new thing in this lesson is the word `bon`.

---

## 4. Allowed French — the complete list

| Shape | Use |
|---|---|
| `C'est bon.` | evaluation, and **the answer** once the referent is established |
| `Ce n'est pas bon.` | the negative evaluation |
| `Le café, c'est bon.` | evaluation **opened unprompted**, where the thing must be named |
| `Le café, ce n'est pas bon.` | same, negative |
| `Le café, c'est comment ?` · `C'est comment ?` | **recycled from L18**, as the question the answer answers |

Everything else in the lesson is recycled L0–L20 material. **Nothing outside this table is new French.**

---

## 5. Polarity

Both polarities are required (gate review §8). The negative is **`Ce n'est pas bon.`** — the canonical owned shape.

**`C'est pas bon.` is prohibited.** The spoken `ne`-drop is a register decision no current canon licenses; it is not taught, not modelled, and **not accepted as an alternative**.

---

## 6. Answer semantics — bare vs topic-fronted

| Situation | Correct shape |
|---|---|
| Answering `Le café, c'est comment ?` | **bare `C'est bon.`** — the referent is already established; re-naming it sounds heavy |
| Opening an evaluation unprompted | **`Le café, c'est bon.`** — the thing has to be named |

This mirrors L18's own asymmetry. It is a **spec rule for authoring**, never a grammar note shown to the learner.

---

## 7. Polysemy — handled by context, not by teaching

`C'est bon.` also means *"that's enough / that's fine / we're done"* in everyday French. **That sense is never shown, never glossed, and never hinted at.**

**Binding:** every use in the lesson evaluates a **nameable owned thing** — the coffee, the café, the break. **Prohibited scene shapes:** handing something over · "is that all?" · confirming a quantity · agreeing to stop · anything where "that's enough" would be a plausible reading of the same words.

---

## 8. The L18 bridge — load-bearing

L21 exists to close this loop:

```
L18:  Le café, c'est comment ?   → no owned French answer
L21:  Le café, c'est comment ?   → C'est bon.
```

**At least one learner production path must run that exchange.** The lesson's framing must make the closure visible: *"now I can answer the question I learned to ask."*

**The L18 host asymmetry is lifted for `bon` only.** `C'est comment ?` may take that answer and no other. It does **not** become generally answerable, and no other descriptive answer is licensed.

---

## 9. Support ladder — philosophy, not a table

L20 established independence at ranks 2 → 1 → 0, and **L21 must not destroy it**. But L21 is a doorway with genuinely new material, so it is **not** required to open as low as L20 did.

- **Open no higher than `mid` (rank 3).** A `supported` opening would hand the learner a one-word lesson's only word and reduce the doorway to copying.
- **Fall to open production.** The lesson must reach at least one unsupplied beat; PQ-2 requires a genuine retrieval action regardless.
- `hintCloze` **may** hold a shape but **must not** spell `bon`.
- No `suggestedPieces` may be marked `required` on the beat that produces `bon` — the new word is the thing being retrieved.
- Offline falls back to `model-answer-only`.

**No screen count is fixed.** Compactness is fine; padding is not.

---

## 10. Compositionality — the anti-thinness rule

One demand is small, so the lesson must prove the word is a **word** and not a frozen phrase. **The minimum:**

1. **Both polarities** — `C'est bon.` and `Ce n'est pas bon.`
2. **Both roles** — evaluation offered unprompted, and evaluation given as an answer (§8).

**Variation may come only from polarity, role, context and support level. It may not come from vocabulary.** If a candidate only ever produces `C'est bon.`, it is a frozen chunk in disguise and must be rejected.

---

## 11. Blocked generalization

L21 does **not** teach *"put any adjective after `c'est`"*. The learner owns the **word `bon`** in the bounded evaluative use, and nothing about a `c'est + adjective` engine.

**Prohibited outright:** `C'est joli.` · `C'est super.` · `C'est intéressant.` · `C'est mauvais.` · `très bon` or any intensifier · `meilleur` or any comparison · `j'aime` or preference verbs · attributive `un bon café` · `bonne` / `bons` / `bonnes` · adjective **placement** or **agreement** as a system · any second adjective, in any position, for any reason · new nouns · broad opinion or descriptive language · the repair rail (RR-A) · past or future tense · a second new question word · any unlock, gate, score, threshold or Campfire-arrival copy · en/em dashes in learner copy.

---

## 12. Continuity Map

| Field | Value |
|---|---|
| **Carry-in — L3** | `ce n'est pas` — the owned negative host |
| **Carry-in — L8 / L18** | `c'est` as a supported host; `Le café, c'est comment ?` as the question |
| **Carry-in — L0 / L5 / L9** | `café`, `un café`, `faire une pause` — the things worth evaluating |
| **New introduced** | **`bon`, and only `bon`** |
| **Carry-out** | → L22 (quantity and price), L23 (the whole exchange), L24 (the threshold) |
| **Fade plan** | none needed — one word, owned at introduction |

> **Principle check** (engine §8): introduces new — one word ✓ · grows old — makes L18's question answerable and L3's negative productive again ✓ · prepares future — the evaluation half of L23's transaction ✓.

---

## 13. Mon Lexique Implications

**One new entry: `bon`.** Shown in the frame it lives in (`C'est bon.`), never as a bare adjective and never with a gendered pair — the pair is not owned. No status change for any existing item; in particular **`c'est` does not move**.

---

## 14. QA Risks / Success Criteria

| Risk | Guard |
|---|---|
| **Frozen chunk in disguise** | §10's two-polarity, two-role minimum. **Check this first in smoke.** |
| **Polysemy leak** (*"that's enough"*) | §7's prohibited scene shapes |
| **Adjective-lesson drift** | §11 — one word, no exceptions |
| **Agreement leak** (`bonne`) | §11; the identity carries **no `gender` tag**, deliberately |
| **False host claim** | §3 — nothing may imply `c'est` is newly owned |
| **L18 loop missed** | §8 — if the lesson could be re-ordered anywhere else without loss, it has missed its job |
| **Register drift** (`C'est pas bon.`) | §5 |
| **Independence collapse after L20** | §9 — no `supported` opening |
| **French QA** | L21 adds **one** identity, `founder_waived_provisional`. **No named-human French QA exists anywhere in this repo**, and no reviewer, date or `approved` status may be recorded that the founder has not supplied. |

**Success criteria:** the learner answers `C'est comment ?` in French for the first time · produces both polarities · produces `bon` unaided at least once · the lesson reads as closing a loop rather than adding a word · **PQ-2 passes; PQ-3 stays advisory. No production-count floor is imposed.**

---

*End of L21 Evaluation Compact Spec. Spec only — no lesson content, no code, no runtime change. L21 = `journeyRole: doorway`, **exactly one acquisition demand (`adj-bon`)**, `thematic-context` + `chunk-natural-speech`, closing the answer gap L18 shipped. `chunk-c-est` is not promoted and its status is not changed; the negative rides the owned L3 host `ce n'est pas`. Compositionality is proved by polarity and role, never by vocabulary.*
