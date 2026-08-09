# L22 — Price ("How much is it?") · Compact Lesson Spec

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/canonical-item-id-convention-v0.1.md` + `docs/syllabus/ai-generation-contract-v1.md` + **`docs/syllabus/L21-L24-pre-campfire-sequence-decision-v1.md`** + **`docs/syllabus/L22-price-gate-review.md`** (the mechanism this spec implements) + the L18 / L21 specs and the **shipped** L0–L21 corpus and runtime.
> **Compact spec** — planning/spec only. Authorizes **no** code, lesson content, flag or runtime change. Locked product canon wins on conflict. Dev APK runtime (L1–L5 only) is unaffected.

> ## Founder-locked inputs
>
> 1. **`journeyRole: "standard"`**, band 1–4, no exception. 2. **Context:** the café transaction the learner already owns — **no new noun inventory**. 3. **No `coûter`.** 4. **No plural system, no `en`, no partitives.** 5. **No audio/listening infrastructure.**
>
> **Adjudicated by the gate review:** **MODEL P — price only.** Productive quantity is deferred. The price answer is a **numeral plus `€`**, never French words. The canDo narrows accordingly.

---

## 1. Lesson Identity

| Field | Value |
|---|---|
| **Lesson number** | L22 |
| **Lesson title** | *(placeholder — keep it plain; "How much is it?" is the working job name, not a locked title)* |
| **Journey phase** | First Ascent (Core 150) · **pre-Campfire**, free |
| **Journey role** | **`standard`** |
| **Primary archetype** | schema **`chunk-natural-speech`** (prose *Negation / Question / Social Choice #3*, which has no enum member — the L8 / L12 / L18 mapping) |
| **Secondary archetype** | schema **`thematic-context`** — the café transaction |
| **Prerequisites** | `["v1-lesson-021"]` |
| **Estimated lesson time** | ~5–6 min |
| **Monolingual mode** | `english-guided` |
| **Feedback mode** | `model-answer-only`, deterministic reveals |
| **Practice Pool expansion** | Build + Stretch + Challenge (lesson-scoped) |
| **Main can-do outcome** | **"Ask how much something costs before I order it."** |

**Journey-role budget:** standard band **1–4** · L22 count **1** · **PASS**. No exception requested.

---

## 2. Acquisition

| | |
|---|---|
| **`acquisitionDemandItemIds`** | **`["adverb-combien"]`** — exactly one |
| **Projected corpus total after L22 ships** | 26 → **27** |
| **Registry** | 65 (`adverb-combien` added and manifest-frozen ahead of this spec); **no further identity may be added** |
| **Not created** | `chunk-c-est-combien` · `noun-euro` · any number identity · `verb-couter` · `chunk-ca-fait` |
| **Not promoted** | `chunk-c-est` — see §3 |

---

## 3. Hosts

| Host | Status | What L22 may claim |
|---|---|---|
| `chunk-c-est` | **supported, never a demand** | L22 rides it exactly as L18, L19, L20 and L21 do — target it, never require it, claim nothing new. |
| `chunk-un-cafe` / `noun-cafe` | **active, demands** (L5 / L0) | the thing being priced |

**Binding:** no learner copy, reveal, recap chip or Mon Lexique entry may present `c'est` as newly owned. The one new thing is the word `combien`.

---

## 4. Allowed French — the complete list

| Shape | Use |
|---|---|
| `C'est combien ?` | **the default** — the item is present or has just been named |
| `Un café, c'est combien ?` | asking the price of a named thing |
| `Le café, c'est combien ?` | same, definite |
| `Je voudrais un café, s'il vous plaît.` | **recycled** — the order the price question precedes |
| `C'est bon.` / `Ce n'est pas bon.` | **recycled L21** — may appear only about the coffee's quality, **never** about the price |

`Combien ?` bare may be **accepted** where the referent is physically present and unmistakable. It is **never** a model answer and never a reveal's natural alternative.

Everything else in the lesson is recycled L0–L21 material. **Nothing outside this table is new French.**

---

## 5. Price answer — exact representation

The answer is written as **a numeral plus the euro symbol**: `2 €`, `3 €`. Whole euros only — no decimal comma, since `2,50 €` would teach a numeric convention nothing supports.

**Binding restrictions:**

| Rule | |
|---|---|
| Form | numeral + `€` only. **No French number word, ever.** No `euro` / `euros` as text. |
| Never spoken | the numeral must **not** appear on any screen with `tts: true`, and **not** in a meet-card `fr` field — French TTS renders `2 €` as *"deux euros"*, which would expose an undeclared French form through audio |
| Never produced | no exercise may ask the learner to write, choose or say a price |
| Never claimed | no copy may say the learner can understand a spoken price. **The product has no listening exercise** — `useSpeech` is wired only to the meet-card *Listen* button. |
| Placement | the price belongs in English context, a reveal, or a non-spoken French line; it is scenery for the learner's question, not a target |

**Why this is honest:** Arabic numerals and `€` are shared orthography, not French lexis, so nothing is claimed about `deux` or `euros` — those words are **absent**, not disguised.

---

## 6. What `combien` owns, exactly

**Owned:** `combien` in the **price question**, in the end slot after an owned `c'est` host.

**Not owned, not taught, not shown:** `combien de + noun` · `de` · `des` · plural noun morphology · determiner deletion · `en` · partitives · `ça fait combien ?` · `combien ça coûte ?` · `vous en voulez combien ?` · `combien êtes-vous ?` · counting sequences · 1–10 · time · age · phone numbers · arithmetic.

**One question word may have a bounded initial use without claiming its whole range** — exactly as `bon` (L21) owns evaluation without opening `c'est + any adjective`. Productive quantity is a **later doorway**.

---

## 7. The communicative arc

L22's shape is a real transaction beat, and every piece but one is owned:

> **ask the price → decide → order**

`Bonjour ! Un café, c'est combien ?` → `2 €` → `Je voudrais un café, s'il vous plaît.`

This is what makes L22 a lesson rather than a word. **The order must appear**, because it is the reason the question exists.

---

## 8. Compositionality — the anti-frozen rule

`combien` must move against a **changing frame**, or it is `chunk-c-est-combien` in disguise. The minimum:

1. **Bare and named** — `C'est combien ?` and `Un café, c'est combien ?`
2. **Inside the arc** — the question produced as part of asking-then-ordering, not only as a standalone drill

Variation may come from **frame, scene, position in the arc and support level. It may not come from vocabulary.**

---

## 9. Support ladder — philosophy, not a table

L21 opened at `mid` and fell to 0; L20 held independence at 2 → 1 → 0. L22 introduces a genuinely new word, so it may scaffold — but not reset.

- **Open no higher than `mid` (rank 3).** A `supported` opening would hand the learner the lesson's only new word.
- **Fall to unsupplied production.** PQ-2 requires a genuine retrieval action regardless.
- `hintCloze` **may** hold a shape but **must not** spell `combien`.
- No `suggestedPieces` may be `required` on the beat that produces `combien`.
- Offline falls back to `model-answer-only`.

**No screen count is fixed.** Compact is fine; padding is not.

---

## 10. Rhythm note — the slot, three times running

L18 owned `comment` in `c'est ___`, L21 owned `bon` right after `c'est`, and L22 owns `combien` in that same slot. That is coherent — the frame is the learner's workhorse — but it is **three consecutive lessons in one frame**, and authoring must earn the difference through **scene and role**, not through a new frame. If smoke says the pattern shows, the lever is L23's shape.

---

## 11. Blocked

Any French number word · `euro` / `euros` as text · `coûter` · `ça fait` · `l'addition` · `combien de + noun` · `de` · `des` · plural morphology · `en` · partitives · a second new question word · `qu'est-ce que` / inversion / embedded questions · new nouns · `C'est bon.` used about a **price** rather than quality · any claim that `c'est` is newly owned · any claim about understanding a **spoken** price · the repair rail (RR-A) · `j'ai soif` / `j'ai peur` / `j'ai besoin d'aide` / first-person `prêt` / `étudiant` / `mais` · bare `faire` · `Tu vas où ?` / `Où est … ?` · past tense · futur proche · any unlock, gate, score, threshold or Campfire-arrival copy · en/em dashes in learner copy.

---

## 12. Continuity Map

| Field | Value |
|---|---|
| **Carry-in — L0 / L5** | `je voudrais`, `un café`, `s'il vous plaît` — the order the price precedes |
| **Carry-in — L8 / L18** | the `c'est ___` end slot, already carrying `où` and `comment` |
| **Carry-in — L21** | `c'est bon` — available about the coffee, never about the price |
| **New introduced** | **`combien`, and only `combien`** |
| **Carry-out** | → **L23**, which integrates greet → ask the price → decide → order → evaluate → close |
| **Fade plan** | none needed — one word, owned at introduction |

> **Principle check** (engine §8): introduces new — one word ✓ · grows old — makes the L0 order a decision rather than a recitation, and re-works the slot L8/L18 opened ✓ · prepares future — supplies L23's missing transaction beat ✓.

---

## 13. Mon Lexique Implications

**One new entry: `combien`.** Shown in the frame it lives in (`C'est combien ?`), never as a bare adverb and never with a `combien de` example. No status change for any existing item; in particular **`c'est` does not move**, and **no currency or number entry is created**.

---

## 14. QA Risks / Success Criteria

| Risk | Guard |
|---|---|
| **Number leak through audio** | §5 — the price numeral never on a `tts: true` surface. **Check this first in smoke.** |
| **Quantity leak** (`combien de cafés`) | §6, §11 — it needs three reserved systems |
| **Frozen-question drift** | §8 — bare and named, and inside the arc |
| **Currency creep** (`euros` written out) | §5 — no currency identity exists |
| **Modality overclaim** | §5 — the product has no listening exercise |
| **`bon` drift onto price** | §4 — `C'est bon.` evaluates the coffee, never the cost |
| **False host claim** | §3 |
| **Slot fatigue** | §10 |
| **French QA** | L22 adds **one** identity, `founder_waived_provisional`. **No named-human French QA exists anywhere in this repo**, and no reviewer, date or `approved` status may be recorded that the founder has not supplied. |

**Success criteria:** the learner asks a price in French for the first time · produces `combien` unaided at least once · produces both the bare and the named form · the price question leads into an owned order rather than standing alone · **PQ-2 passes; PQ-3 stays advisory. No production-count floor is imposed.**

---

*End of L22 Price Compact Spec. Spec only — no lesson content, no code, no runtime change. L22 = `journeyRole: standard`, **exactly one acquisition demand (`adverb-combien`)**, `chunk-natural-speech` + `thematic-context`, opening the price question in the `c'est ___` slot the learner already works. Productive quantity is deferred; price answers are numerals plus `€`, never French words and never spoken.*
