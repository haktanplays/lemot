# Round 1.3 Chip Taxonomy and Lexique Lifecycle Canon v0.3

> **Status:** planning/spec — **no implementation authorization.** v0.3, revisable.
> This records product canon discovered in Round 1.3 triage. It authorizes no code,
> content, registry, renderer, flag, schema, or storage change. For anything built
> now, `docs/DEV_APK_MVP_CANON.md` + `docs/STATUS.md` win (see `docs/README.md` §Precedence).

> **Scope & relation to existing canon.** This doc is the taxonomy/lifecycle layer
> that sits beside `docs/syllabus/canonical-item-id-convention-v0.1.md` (which names
> *identity*) and `docs/learning-engine-v1.md` (which defines the *pedagogy/engine*).
> It does **not** require L01–L06 specs, `content/itemRegistry.ts`, or the live
> renderer to be rewritten in this step. Every numeric/lifecycle value here is a
> **v0.3 proposal** to be revised after a tiny content experiment, not a hard rule.

---

## 1. Executive summary

- The Round 1.2 chip/Weave/Main-pieces/lexique issues are a **spec/canon gap, not a runtime defect.** The Round 1.2 APK passed its focused smoke; nothing here is a bug report.
- The repo runs **two parallel, non-shared systems**:
  - **Live v1 renderer** — `content/lessonTypes.ts`, `content/itemRegistry.ts` (~35 `LearningItem`s with a single `status: active|supported|recognition|recycled`), `content/lessons/v1/*`, `components/lesson-v1/*`. This is what renders **L1–L6** today.
  - **Learning-engine** — `content/learning-engine/*` (`RawItem`, `LessonContract` with per-lesson `activeNew/supported/recognitionOnly/recycled` + `allowedProduction/blockedProduction`, `MasterySnapshot`, the Mon Lexique selector). It holds the richer contract/lifecycle vocabulary **but is explicitly not wired into the live renderer.**
- This doc **bridges the product canon before any content rewrite**, so later changes are made against a written standard.
- The next implementation work should be **small and staged** (§13): a tiny data cleanup, then a tiny Weave experiment, then schema/selector work — never a broad rewrite.

---

## 2. Current source facts / constraints

Concise reference only (full extraction lives in the Round 1.3 triage; this is canon, not a re-audit).

- L1–L6 live lessons use `learningItems`, per-screen `targetItemIds`, `suggestedPieces`, `highlights`, `piecesUsed`, and **plain-text goal `body` copy** differently and inconsistently.
- **`piecesUsed` means "actively used / produced,"** not passive/seen/exposure (its recap header reads "Pieces you used").
- **Granularity drift exists in current content:**
  - **L6 recap** lists sentence-like pieces — `Je suis ici`, `J'ai une question` — as `piecesUsed` chips.
  - **L4 recap** lists composed phrases — `j'ai faim`, `j'ai une question`.
  - **L6 "Main pieces"** is **plain text inside an insight-card `body` string**, not structured chip data (rendered as one `<Text>` paragraph; no chip structure on the goal payload).
- **Chip identity problems to resolve later (not in this PR):**
  - `ici` and `faim` appear in `suggestedPieces`/`highlights` **without canonical `itemId`s** on several screens.
  - `un café` and `une question` carry **split accounting identities across lessons** (`noun-cafe`/`chunk-un-cafe`; `noun-question`/`chunk-une-question`) — the same surface string maps to two ids, so mastery would split.
- No `exposurePieces` (ghost/seen) field exists anywhere in the v1 model.

---

## 3. Core principle

```text
Chip = reusable building block, not sentence memorization.
Whole first, unpack later.
Use first. Understand deeply. Return stronger.
No grammar dump before contact.
```

What this means for Cairn:

- **Cairn should not hide grammar logic.** The goal is understanding, not mystery.
- **Cairn should reveal logic in tiny, well-timed cards** *after* the learner has encountered real usage — not as an up-front rules lecture.
- **The learner should use language first, then notice/unpack the logic.** Contact precedes explanation; explanation is narrow and attached to what was just seen, typed, or compared.

---

## 4. Chip taxonomy

Each type is defined by **behavior**, not just a label.

| Type | Behavior |
|---|---|
| **Spine chip** | The load-bearing *producible engine* a lesson is built around (`je suis`, `j'ai`, `je voudrais`, pattern `ne ___ pas`). Recurs across lessons; usually `active`. |
| **Active chip** | A chip the learner is expected to **produce** this lesson. |
| **Recognition/passive chip** | A chip **intentionally noticed, not produced** (`oui` contrasted against `non`). Aware-of, not own-yet. |
| **Ghost/exposure chip** | A chip **seen** in a model/reveal/context but **not owned yet** (`pour`, `parler`, `de l'eau`). Atomic or package-level only; **never required for correctness.** |
| **Carryover chip** | A previously-introduced chip that is a **candidate** for reuse, **selected** by mastery/context — never mechanically dumped. |
| **Pattern chip** | A slot-frame: `ne ___ pas`, `un/une ___`, `je voudrais ___`. |
| **Formula chunk** | A fixed multi-word **social/discourse formula** carrying one reusable function; worse if split early (`s'il vous plaît`, `non merci`, `au revoir`). |
| **Noun/package chip** | An article+noun retrieved as **one natural object/package** (`un café`, `de l'eau`, `un verre d'eau`). |
| **Unpackable chunk** | A formula/package **learned whole first** and unpacked into subpieces later, when the subpiece becomes useful (see §5). |
| **Accounting chip** | The canonical **registry item** (`itemId`) tracked for mastery/lifecycle. May never be shown. |
| **UI chip** | A **visible pill** on screen (goal Main-pieces, recap `piecesUsed`, Weave hint pieces). A **selected, capped subset** of accounting chips. |
| **Inline highlight** | An **emphasis span inside a model sentence** (meet-card `highlights`, reveal emphasis). Points at a chip; is not a standalone chip. |
| **Model answer** | The full **natural target sentence** revealed for comparison (Weave / Say-It `reveal.modelAnswer`). A model answer **may contain full natural sentences; a model-answer sentence is not automatically a chip.** It is its own surface, distinct from accounting chip / UI chip / inline highlight. |

### Important corrections (from triage feedback)

- **Do NOT blindly canonize `je`, `pas`, `ce`, `pour`, `avec`, `là`, `ici` as forbidden.**
- **Distinguish accounting/atom chips from primary UI chips.** A bare atom can exist as an **accounting / pattern / unpack / contrast** chip when pedagogically useful.
- **But bare atoms should not automatically become prominent UI chips.**
- **Full sentence / clause chips must not become primary UI chips** (they may still be model answers).

### Hard rules

- **No full sentence chips as primary UI chips.**
- **No full multi-clause chips as primary UI chips.**
- **Formula chunks are allowed** when they carry one reusable social/discourse function and become worse if split early.
- **Noun packages are allowed** when learners retrieve them as one natural object/package.
- **Pattern chips are allowed** — e.g. `ne ___ pas`, `un/une ___`, `je voudrais ___`.
- **Ghost/exposure chips should be atomic or package-level**, not carry full-sentence responsibility.
- **Model answers may contain full sentences** — that does **not** make the full sentence a chip.
- **Some multi-part chunks are learned whole first and unpacked later** (§5).

### Example classification

Verdicts: **Allowed** (may be a primary UI chip) · **Caveat** (allowed as accounting/pattern/contrast/unpack/exposure atom, *not* an automatic primary UI chip) · **Forbidden as primary UI chip** (sentence/clause — model-answer only).

| Example | Verdict | Type / note |
|---|---|---|
| `bonjour` | Allowed | formula chunk (greeting) |
| `je` | Caveat | bare-pronoun atom; lives inside engines; accounting/unpack only |
| `je voudrais` | Allowed | spine / polite-request formula |
| `s'il vous plaît` | Allowed | formula chunk (unpackable, §5) |
| `au revoir` | Allowed | formula chunk (unpackable, §5) |
| `excusez-moi` | Allowed | formula chunk (opener) |
| `non merci` | Allowed | formula chunk (polite refusal) |
| `un café` | Allowed | noun package |
| `une question` | Allowed | noun package |
| `de l'eau` | Allowed | noun package (partitive); also a ghost/exposure candidate |
| `l'eau` | Allowed | noun package |
| `un verre d'eau` | Allowed | noun package (single object) |
| `je suis` | Allowed | spine chip (engine) |
| `j'ai` | Allowed | spine chip (engine) |
| `ne ___ pas` | Allowed | pattern chip |
| `pas` | Caveat | bound particle; contrast/accounting atom, not a primary UI chip |
| `ce` | Caveat | demonstrative atom; contrast/accounting only |
| `n'est pas` | Caveat | fragment; the owned unit is the `ce n'est pas` frame; usable for contrast/unpack |
| `pour` | Caveat | function word; ghost/exposure or notice-card material |
| `avec` | Caveat | function word; ghost/exposure or notice-card material |
| `ici` | Caveat | content place-word; **legitimate chip that should get a canonical `itemId`**, but pairs with an engine — careful UI treatment |
| `là` | Caveat | content place-word like `ici`; homograph with article `la` (disambiguate per item-id convention §2) |
| `je suis ici` | Forbidden (primary UI) | sentence = `je suis` + `ici`; model answer only |
| `j'ai une question` | Forbidden (primary UI) | sentence = `j'ai` + `une question`; model answer only |
| `je ne suis pas ici` | Forbidden (primary UI) | sentence = `je suis` + `ne ___ pas` + `ici` |
| `ce n'est pas pour moi` | Forbidden (primary UI) | clause = `ce n'est pas` + `pour` + `moi` |
| `un petit moment` | Caveat | expression/package chip; **should not become an active spine chip in L6 unless explicitly taught** |
| `merci beaucoup` | Allowed | formula chunk (unpackable: `merci` + `beaucoup`) |
| `bonne journée` | Allowed | formula chunk (parting wish; unpackable) |
| `à bientôt` | Allowed | formula chunk (parting) |
| `en fait` | Allowed | discourse formula chunk (whole first, unpack later) |
| `en vrai` | Allowed | discourse formula chunk |
| `pour le moment` | Allowed | expression/formula chunk (unpackable) |
| `en ce moment` | Allowed | expression/formula chunk |
| `de toute façon` | Allowed | discourse formula chunk |

**Expected nuance, restated:**
- `je suis ici`, `j'ai une question`, `je ne suis pas ici`, `ce n'est pas pour moi` are **forbidden as primary UI chips** because they are sentence/clause-level; they may be **model answers**.
- `un petit moment` can be an expression/package chip but **should not become an active spine chip in L6** unless explicitly taught.
- `pas`, `ce`, `pour`, `avec`, `ici`, `là` may be accounting/contrast/utility atoms but **require careful UI treatment** — they do not auto-promote to prominent UI chips.

---

## 5. Formula chunks and unpackable chunks

**Lifecycle of an unpackable chunk:**

```text
Whole first → use → notice → unpack → reuse subpieces
```

Examples:

- **`s'il vous plaît`**
  - first: whole formula = "please"
  - later: notice `vous`
  - much later: literal structure / elision, if useful
- **`au revoir`**
  - first: whole closing formula
  - later: `revoir` can be noticed, if useful
- **Discourse-chunk product thinking** (Spanish analogy for the *idea*, not for French content): `en ese entonces`, `en verdad`, `de verdad` are learned whole, then unpacked. French counterparts / similar discourse chunks: `en fait`, `en vrai`, `de toute façon`, `pour le moment`, `en ce moment`, `à ce moment-là`.

Rules:

- **Do not split formula chunks during first exposure** if splitting increases cognitive load.
- **Unpacking is recognition/insight first, not active grammar production.**
- **Subchips may later become reusable chips** once the subpiece becomes useful on its own.

---

## 6. Micro-Logic / Chunk Unpack Interludes

> Required section — missing from the triage report.

**Goal:** Cairn should not hide grammar logic. It reveals the logic in **tiny, well-timed cards** *after* the learner has encountered a real use.

### Card / screen types (conceptual; not new runtime types yet)

| Card | Purpose |
|---|---|
| **Notice Card** | "Did you see this?" — points at a form the learner just met. |
| **Micro-Logic Card** | One small "why it works," narrow to the current edge. |
| **Chunk Unpack Card** | Splits a whole-first formula into a noticed subpiece (§5). |
| **Contrast Card** | Two forms side by side (`de l'eau` → `pas d'eau`; `oui` / `non`). |
| **Edge Card** | A single boundary/exception, scoped tightly. |
| **Return-to-Moment Card** | Brings the learner back into the real intent after the aside. |

### Rules

- **No grammar dump before contact.**
- **Explanation must attach to something the learner just saw, typed, or compared.**
- **Keep explanation narrow to the current edge.**
- **Unknown/exposure items may trigger a notice, not active production.**
- **Full grammar systems are layered over time.**
- **Model answers may surface natural forms before the system is fully taught.**
- The app should make the learner **understand the logic, not memorize isolated sentences.**

### Examples

1. **`de l'eau`** — first appears as a ghost/package in a model answer.
   - Notice: *"French asks for some water: de l'eau."*
2. **`pas d'eau`** — later contrast: `de l'eau` → `pas d'eau`.
   - Explain: after `pas`, French often uses `de` / `d'`.
   - **Do NOT teach `Je ne voudrais pas l'eau` as the general negative; the natural general negative is `Je ne voudrais pas d'eau`.**
3. **`s'il vous plaît`** — first the whole formula; later unpack `vous`; much later explain the literal structure if useful.
4. **`au revoir`** — first the whole closing formula; later unpack `revoir` if useful.
5. **`en fait`, `en vrai`, `pour le moment`, `en ce moment`** — discourse chunks learned whole first, unpacked later.

### Design answers

- **Which current screen type can host these cards?** The existing **`insight-card`** (it already renders `title` + `body` + `examples`) and **reveal-time copy** (the Weave/Say-It `reveal` block) can host them now, with no new type.
- **Do we need a new screen type later?** Only if repeated patterns justify it — see §13. Reuse first.
- **Inline pop-ups, dedicated screens, or reveal-time cards?** Prefer **reveal-time cards** (attached to the moment just experienced) and short post-contact **insight-cards**; avoid modal pop-ups that interrupt intent.
- **How do they connect to ghost/exposure chips?** A ghost/exposure chip (e.g. `de l'eau`, `pour`) is the **trigger**: it is seen in a model, then a Notice/Contrast card explains it without making it a production target.
- **How do they avoid polluting mastery?** They record **seen/notice state only** — never production success. They never add the item to `piecesUsed` or to Mon Lexique-as-learned.
- **How are they recorded in Mon Lexique / Lexique Memory?** As **seen/exposure/notice state**, separate from production mastery — input to the future *Lexique Memory Selector* (`exposurePromotionPotential`, §9/§10), not to the learner-facing "known" list.
- **Which 2–3 examples to test first in Round 1.3?** (1) `de l'eau` Notice → `pas d'eau` Contrast (the partitive edge); (2) `s'il vous plaît` whole→`vous` unpack; (3) one discourse chunk (`en fait`) as whole-first exposure.

**Preferred answer:** in the short term, **reuse existing `insight-card` / reveal copy**. Later, consider a dedicated micro-logic card type **only if** repeated patterns justify it. These cards **must not add active mastery by themselves**; they may record **seen/exposure/notice** state separately from production mastery.

---

## 7. Weave v2 canon

- **Most current L1–L6 Weaves are still direct-translation prompts** (`"Write it in French: <English sentence>"`). 12 of 13 weaves are authored this way; only L6's open close (`s08`) is a true situational directive.
- The **Round 1.2 UI copy improved presentation** (`Weave` badge, "Say this:", stripped prefix, "Your try") **but did not fully change the pedagogy** — the task is still "translate this exact sentence."
- **Weave v2 should mean:**
  - use the French pieces you know **inside a real intent**;
  - **leave unknown parts in English** if needed;
  - **compare with the model answer**;
  - the model answer **reveals natural French**;
  - **exposure pieces are not required for correctness**;
  - **mixed-language attempts route to neutral compare**, not red/wrong;
  - **not every Weave needs exposure.**

### Candidate examples (2–3; authoring only)

- **L3 directive (no new data):**
  - Prompt: *"Someone's looking for you in the wrong room — tell them you're not here."*
  - Model: `Je ne suis pas ici.`
- **L3 exposure:**
  - Prompt: *"Say you are not here to talk."*
  - Model: `Je ne suis pas ici pour parler.`
  - Exposure chips: `pour`, `parler` (not required)
  - Good learner attempt: `je ne suis pas ici to talk`
- **L6 open close:**
  - Prompt: *"You're leaving — thank them warmly and wish them a good day."*
  - Model: `Merci beaucoup. Bonne journée !`
  - Exposure/formula: `merci beaucoup`, `bonne journée`

**Explicitly:** Weave v2 is **first an authoring change, not an evaluator change.** The current evaluator already routes mixed-language attempts to neutral compare (verified in the Round 1.2 smoke), and exposure pieces — being non-required — cannot affect correctness. **Do not propose broad evaluator work until a tiny content experiment proves the need.**

---

## 8. Main Pieces and recap canon

- **"Main pieces" should become structured data later**, not plain text embedded in body copy. **Do not implement it in this PR.**
- Future field could be:
  ```ts
  mainPieces: { text: string; itemId?: string; role?: "spine" | "active" | "carryover" | "exposure" }[]
  ```
- **`piecesUsed` should remain active/produced only.**
- **`piecesUsed` must be atomic or approved formula/package chunks.**
- **`piecesUsed` must not include full sentences.**
- **Goal `mainPieces` and recap `piecesUsed` are different:**
  - `mainPieces` = **what this lesson is built around**;
  - `piecesUsed` = **what the learner actively used by the end**.
- **Ghost/exposure does not belong in `piecesUsed`.**

**Known future cleanups (not in this PR):**
- Atomize L4/L6 recap pieces (`j'ai faim` → `j'ai` + `faim`; `Je suis ici` → `je suis` + `ici`).
- Resolve the `un café` / `une question` dual identity (one surface → one canonical id).
- Add `itemId`s for `ici` and `faim` if they are to be tracked.

---

## 9. Mon Lexique vs Lexique Memory Selector

**Important distinction — do not overload the term.**

- The **current Mon Lexique selector (PR #61)** is a **learner-safe UI projection** over the registry + `MasterySnapshot`. It is **backward-looking** and is **not** a smart forward carryover selector (it includes items whose `monLexiqueStatus` is `added`/`weak`, weak-first; no scheduling, no carryover, no recombination logic).

### Two distinct concepts

1. **Mon Lexique UI Projection** (today)
   - learner-facing list/map of known or weak items;
   - safe fields only;
   - **no raw mastery leakage** (no `weakTags`, no counters, no internal ids).
2. **Lexique Memory Selector** (future internal engine)
   - chooses **carryover / recall / dormant / exposure-promotion** candidates;
   - **drives which old chips reappear** in lessons.

**Canon:**

```text
Previous lesson chips are candidates, not defaults.
Carryover pool may grow; visible carryover selection must stay capped.
```

### Three separate systems (not one)

```text
Lesson chip surface ≠ carryover selection ≠ flashcard review.
Mon Lexique UI ≠ Lexique Memory ≠ Carryover Selector.
```

- **Carryover selection is lesson-embedded reuse** (what old chips reappear *inside a lesson*).
- **Flashcards / review are a separate future explicit practice system** (an opt-in review/practice queue).
- Both may read the same `Lexique Memory` / mastery data later, but **their outputs are separate**:
  - **Carryover Selector** → lesson examples, Weaves, hints, model answers, micro-logic contexts;
  - **Flashcard Scheduler** → an explicit review / practice queue.
- **Do not design lesson carryover density as if it were flashcard scheduling.**
- **Do not let flashcard logic dictate what appears inside lessons.**

---

## 10. Carryover lifecycle canon

### Already canon

- **Learning-engine buckets:** `activeNew` / `supported` / `recognitionOnly` / `recycled`.
- **Shared / carry-in precedent:** L11 owns base clauses `activeNew` → **L12 consumes them as `supported` carry-in** (define-once `SHARED_ITEMS` + `firstIntroducedIn`).
- **L16 pure recombination:** introduces **zero new items**; recombines L11/L12/L15/SHARED via contract buckets.

### Correction

- **There is no numeric carryover window currently canonized.**
- **L11→L16 should not be treated as proof of a hard 5-lesson lifecycle.** It is precedent for **recombination**, not numeric policy.
- **"Integration every 4–5 lessons" is a pacing heuristic** for *where to place an integration lesson* — **not** carryover *reach*.

### Initial lifecycle (v0.3 PROPOSAL — revisable)

| Stage | Offset | Existing-bucket mapping |
|---|---|---|
| introduced / activeNew | **L0** | `activeNew` |
| dense supported carry-in | **L+1** | `supported` |
| supported / recycled if context-fit | **L+2 – L+3** | `supported` or `recycled` |
| light recycled / integration candidate | **L+4 – L+5** | `recycled` |
| dormant unless triggered | **L+6 →** | not surfaced unless a trigger fires |

**Dormant reactivation triggers:**
- mastery weak;
- context requires it;
- due for recall / decay;
- new pattern needs it;
- scheduled review;
- exposure promotion opportunity.

**Selection score inputs** (for which dormant/recycled candidates surface, and how prominently):
- `+contextFit`
- `+weakness`
- `+decay`
- `+spiralImportance`
- `+upcomingUsefulness`
- `+exposurePromotionPotential`
- `−recentOveruse` penalty
- `−strongMastery` penalty
- `−screenClutterRisk` penalty

**Caps:**
- the carryover **candidate pool may grow**;
- **visible carryover per screen must stay low**;
- the **UI must never dump all previous chips**;
- the **lesson surface should be curated by context + mastery**, not by accumulation.

### Rolling window (graph grows, window rolls)

```text
The learned graph grows; the active carryover window rolls.
Previous chips are candidates, not defaults.
Old chips can return as anchors, refreshers, contrasts, or context tools.
Visible carryover stays capped.
```

- The **global learned chip graph can grow indefinitely.**
- The **active carryover window should peak / roll, not grow linearly forever.**
- **New chips entering the active carryover window can push older / stronger / context-irrelevant chips into a dormant state.**
- **Carryover pool/window behavior is about lesson-embedded reuse, not explicit review scheduling** (see §9 — carryover ≠ flashcards).

### Recycle Load Protection

```text
Recycle cannot steal the lesson.
Old chips should support the new lesson target, not steal it.
Every sentence has a load budget: target load must stay dominant, recycle load must support, exposure load must stay optional and capped.
```

- **Recycling is not random reuse and not flashcard review.**
- **Recycled items may return as:**
  - anchors;
  - refreshers;
  - contrasts;
  - context tools;
  - weakness returns;
  - structural support inside newer grammar.
- **Recycled items must not steal cognitive weight from the lesson target.**
- **Sentence examples must preserve target salience.**
- **Strong old chips should usually carry lower cognitive load than weak / uncertain old chips.**
- **Exposure chips must remain optional and low-count.**
- **Old lesson sentences should not be replayed mechanically** unless the specific goal is speed recall / formula refresh.

**Example — same chip (`un café`), rolling load (target in *italics*):**

| Stage | Sentence | Role |
|---|---|---|
| Early | `Je voudrais un café, s'il vous plaît.` | `un café` is the *target* |
| Later structural reuse | `Je voudrais un café, mais je n'ai pas le temps maintenant.` | `un café` is an **anchor**; the new structure is the target |
| Later richer reuse | `Je voudrais prendre un café avec vous, mais je n'aurai pas le temps aujourd'hui.` | `un café` is **context**; richer grammar is the target |
| Refreshment reuse | `Je voulais un café, mais je n'avais pas le temps.` | a **refresh** of `un café` inside a new tense target |

State explicitly:
- **The old chip may return.**
- **The old full sentence should not mechanically return by default.**
- **A known chip can become an anchor so the learner can focus on the new target.**

**Future validator / sentence-builder checks** (when that system is built — §13):
- target item is present and salient;
- recycle density is not too high;
- strong old items do not dominate attention;
- weak / refresh-due items are used intentionally;
- exposure load is capped;
- no sentence-chip regression;
- old sentence replay is not mechanical;
- context is natural.

---

## 11. Field mapping

| Field | Layer | Preferred decision |
|---|---|---|
| `learningItems` | accounting | **owned** active/supported/explicit-recognition items only — **not** ghost/exposure by default. |
| `targetItemIds` | accounting | production/evaluation **target anchors** (per screen). |
| `suggestedPieces` | UI chip | active/support/**carryover** pieces the learner may use. |
| `highlights` | inline highlight | inline visible spans in example/model text. |
| `piecesUsed` | UI chip | **active/produced only** (atomic or approved formula/package chunks). |
| `mainPieces` *(proposed)* | UI chip | future **structured lesson-facing chip summary** (§8). |
| `exposurePieces` *(proposed)* | UI/exposure | future **screen/reveal-level seen-not-owned** chips. |
| Mon Lexique UI Projection | view | learner-safe known/weak list; **ghost/exposure must not appear as learned**. |
| Lexique Memory Selector *(future)* | engine | consumes exposure/seen state + mastery + lineage to pick carryover/recall. |

Notes:
- **Ghost/exposure should not automatically appear in the Mon Lexique UI as "learned."**
- **Exposure may create "seen" state** for the future Lexique Memory Selector (input to `exposurePromotionPotential`), separate from production mastery.

---

## 12. Risks and mitigations

| Risk | Mitigation |
|---|---|
| **Sentence-chip regression** (already present in L6/L4 recap) | Lock the no-sentence-as-primary-UI-chip rule; atomize recap in the later cleanup PR. |
| **Fragment overcorrection** (banning `je`/`pas`/`ce`/`pour`/`ici`) | Use the 3-way verdict (Allowed / Caveat / Forbidden-as-primary-UI); atoms allowed as accounting/contrast/unpack. |
| **UI chip clutter** | Screen-level chip caps; visible-carryover cap; selection not dump. |
| **Content overload** | Curate by context + mastery; cap local-new surface as content scales. |
| **Mastery pollution** | Resolve dual ids; add ids for tracked atoms; one surface → one id. |
| **Ghost chips mistaken as learned** | Exposure excluded from `learningItems`/`piecesUsed`/Mon-Lexique-as-learned until produced. |
| **Carryover explosion by L100** | Pool may grow; **visible** selection capped + scored; dormant at L+6 unless triggered. |
| **Overfitting taxonomy before testing** | Ship as **docs canon v0.3** (revisable), not a code/enum freeze. |
| **Too much rewrite before next tester** | Docs canon first; tiny content experiment later; Round 1.2 APK ships independently. |
| **Confusing Mon Lexique UI with Lexique Memory Selector** | Two named concepts (§9); the projection is backward-looking, the selector is the future engine. |
| **Grammar pop-ups becoming grammar dumps** | Micro-logic cards **only after contact**, narrow to one edge (§6). |

Mitigations summary: **docs canon first → tiny content experiment later → screen-level chip caps → active-only `piecesUsed` → exposure separated from mastery → micro-logic cards only after contact → v0.3 labelled revisable.**

---

## 13. Recommended implementation sequence after this docs PR

> Do **not** implement now. Recorded sequence only.

1. **Tiny data/content cleanup PR**
   - atomize L4/L6 `piecesUsed`;
   - address L6 "Main pieces" prose / future structure;
   - plan or normalize the `un café` / `une question` identity;
   - plan `itemId`s for `ici` / `faim`.
2. **Tiny Weave v2 experiment**
   - 2–3 prompt rewrites (§7);
   - **no evaluator change**;
   - one controlled exposure example.
3. **Micro-Logic / Chunk Unpack pilot**
   - manual authored cards / copy first (reuse `insight-card` / reveal copy);
   - e.g. `de l'eau`, `pas d'eau`, `s'il vous plaît`.
4. **Structured `mainPieces` / `exposurePieces` later**
   - (and a dedicated micro-logic card type only if repeated patterns justify it).
5. **Lexique Memory / Carryover Selector design later**
   - carryover scoring; dormancy; recall triggers.
6. **Sentence Builder + Validator later**
   - target salience;
   - recycle density;
   - exposure cap;
   - no sentence-chip regression;
   - natural context.

---

## 14. Non-goals

This PR explicitly does **not**:

- change runtime;
- rewrite live content;
- migrate the item registry;
- change Mon Lexique code;
- change the renderer;
- build an APK;
- update the private vault.

It is **documentation canon only.**
