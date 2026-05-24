# Le Mot Lesson Spec Template v1.1

> **Purpose**: This is the *required structure* for every Le Mot lesson spec and all syllabus work, starting with the upcoming L1 pilot. It operationalizes `docs/learning-engine-v1.md` into a fillable per-lesson document. **It is a planning/spec template, not a runtime schema** — it authorizes no code, content, flag, storage, or backend change.

> **Authority**: Follows `docs/learning-engine-v1.md` (pedagogical canon) and `docs/DEV_APK_MVP_CANON.md` (Dev APK scope). Where this template and locked product canon (v1 Canon, Q1–Q6, D1–D6) disagree, **locked canon wins** and the gap is surfaced, not silently resolved. Section numbers below reference engine-doc sections like `(engine §N)` for traceability.

> **Identity guardrails**: Le Mot is a premium French **production engine**, not a generic AI tutor. Every lesson spec must preserve the no-gamification / passive-mirror tone: **no streak, XP, level-up, achievement, reward, or "perfect!" language anywhere**. AI is a supporting layer, never the core. Mon Lexique compatibility (§14) is mandatory from the first lesson spec, even though Mon Lexique is not built yet.

> **How to use**: Copy the empty template in §16 into `docs/syllabus/L{NN}-{slug}.md`, then fill every section. Sections 2–14 are the lesson's plan; §15 is the gate it must pass; §16 is the blank; §17 lists what is *not yet decided* and must not be assumed.

---

## 1. Purpose

This template gives every lesson spec one shape so that:

- **Syllabus authors plan the same object every time** — sentence family, typed items, statuses, continuity, and downstream hooks, all named consistently (engine §1).
- **Downstream systems stay compatible by construction** — Practice Pool, Daily Review, Natural Reveal, Mon Lexique, and the future Word Graph consume the *same* item/frame identities a lesson declares (engine §13–§15).
- **A lesson can be reviewed before any code exists** — the spec is complete and checkable on its own; runtime work (after Dev APK smoke) implements an already-approved plan.

A lesson spec built from this template is a **planning document**. It does not define data models, components, flags, or API calls. It declares *intent and structure* that future runtime work may implement.

> **Use this together with the archetype templates.** Every individual lesson spec must use **this global template** *and* `docs/syllabus/lesson-archetype-templates-v1.md`:
> - **This global template** defines the *required fields and QA* every lesson must fill.
> - **The archetype template** defines *weighting, section emphasis, depth, budget tendency, and typical risks* for the lesson's kind.
> - A lesson may have **one primary archetype** and **optionally one secondary** archetype.
> - **Bespoke lessons require explicit justification** (archetype doc §13).
>
> Navigation chain: `CLAUDE.md → docs/learning-engine-v1.md → docs/syllabus/lesson-spec-template-v1.1.md → docs/syllabus/lesson-archetype-templates-v1.md`.

---

## 2. Lesson Identity

| Field | Value |
|---|---|
| **Lesson number** | _e.g. L1_ |
| **Lesson title** | _e.g. Je suis_ |
| **Journey phase** | _First Step / First Ascent / Higher Path / Ridge / Summit Gate / Descent / Open Path (Core 150)_ |
| **Lesson archetype** | _e.g. architecture-verb / chunk-natural-speech / ... (engine §4)_ |
| **Estimated lesson time** | _e.g. ~5 min_ |
| **Monolingual mode / explanation language** | _english-guided / french-light / ... _ |
| **Practice Pool expansion level** | _none / seeds-only / Build / Build+Stretch / full (engine §13)_ |
| **Main can-do outcome** | _One sentence: what the learner can newly do. e.g. "I can say where I am."_ |
| **Pedagogical reason** | _Why this lesson exists here, in this slot, for this learner._ |

---

## 3. Prerequisite Check

> Production must be **prerequisite-safe**. Every active/supported production item must rest on something the learner already has, or on input given *in this lesson* as supported/recognition.

| Field | Value |
|---|---|
| **Required prior chunks** | _chunks assumed known (carry-in, engine §8)_ |
| **Required prior grammar / phenomena** | _patterns assumed understood_ |
| **Required prior sound / writing awareness** | _pronunciation/orthography assumed_ |
| **Required prior verb forms** | _verb forms assumed available_ |
| **Unseen forms in this lesson** | _list each unseen form AND its status — allowed **only** as `supported` or `recognition` input, never as unscaffolded active production (engine §6)_ |

---

## 4. Engine Plan

> An "engine" = a reusable production shape (frame + pattern). Depth is a deliberate choice (engine §4). Avoid more than one full-cycle engine in early lessons.

| Engine | Depth | Why it exists |
|---|---|---|
| _Primary engine_ | full-cycle | _the lesson's main teaching target_ |
| _Secondary engine(s)_ | short-cycle | _reinforce / contrast / seed a future full-cycle_ |
| _Ambient engine(s)_ | ambient | _met but not produced; prepares a future lesson_ |

- **Primary engine(s)**: _…_
- **Secondary engine(s)**: _…_
- **Ambient engine(s)**: _…_

> **Architecture-verb guardrail.** A lesson whose target is a major verb (être, avoir, aller, faire, pouvoir, vouloir, devoir/falloir, …) must **not** teach the full conjugation paradigm as equal active production.
> - Keep **one dominant active production core** (typically one person-form / one frame).
> - Additional forms may be **active only** when they are high-frequency chunks, required by the sentence family, or necessary for a natural production target.
> - Remaining forms are **supported or recognition-only**.
> - Prefer **sentence families, chunk engines, and micro-contrasts over conjugation tables.** Never present a full conjugation grid as the teaching surface.
> - Show inflection (person, gender, number) through **recognition**, not drills.

---

## 5. Opening Sentence Family

> Lessons begin with a small **sentence family**, not a single sentence and not a passive phrase list (engine §3).

| Field | Value |
|---|---|
| **Anchor sentence** | _the central natural target_ |
| **Variation sentence 1** | _same shape, one slot changed_ |
| **Variation sentence 2** | _same shape, another slot changed_ |
| **Contrast sentence** | _near-neighbor that teaches the boundary_ |
| **Rescue / natural sentence** | _what a real speaker would actually say (incl. polite/natural tail)_ |
| **Interchangeable pieces** | _inventory of swappable fillers_ |
| **Fixed frame** | _the unchanging shape, e.g. `Je suis ___.`_ |
| **Replaceable slots** | _which positions vary and what may fill them_ |
| **Forbidden / not-yet-ready substitutions** | _fillers that look tempting but require unseen structure — explicitly excluded_ |

---

## 6. Item Budget

> **Planning targets, not hard validators** (engine §7). Use them to feel overload/underweight; a validator may *report* counts but must not fail a lesson for being slightly outside the bands.

| Field | Target (early lessons) | This lesson |
|---|---|---|
| **Active new items** | ~8–15 | _…_ |
| **Supported new items** | ~8–15 | _…_ |
| **Recognition / ambient items** | ~10–20 | _…_ |
| **Recycled items** | grows over time | _…_ |
| **Total exposure estimate** | ~30–45 | _…_ |
| **Production target count** | _# of items the learner must actively/transformed-produce this lesson_ | _…_ |

> **L0 vs L1.** **L0 / Lesson Zero** may intentionally sit *below* the normal early-lesson item budget — it is an onboarding moment, not a full lesson. **L1** should normally target the early-lesson planning budget (the bands above) unless a future explicit canon decision says otherwise. The **L1 pilot** should be used precisely to test whether the ~30–45 total exposure / ~8–15 active / ~8–15 supported / ~10–20 recognition range is workable for a *first full lesson*. Document any deliberate underweight in §17 reasoning, not as a failure.

> **Chunk-dense social / survival lessons.** Lessons built mostly from fixed social chunks (greetings, polite formulas, rescue phrases) may legitimately sit at the **lower end of the active-new band** — roughly **~8–12 active-new** is acceptable for them, *provided* total exposure, supported items, recognition input, and production targets all remain strong. **Do not inflate the active-new count by forcing fixed social phrases into full active production** — that produces a phrasebook, the failure mode the engine warns against (engine §11, anti-scope). Prefer a generative *frame* (e.g. `je voudrais ___`) carrying the active load over a long list of memorized phrases.

> **Budget interaction — don't max every tier.** In **transformation-heavy lessons** (negation/question, review, tense-doorway), **recycled / carry-in items naturally run high** because the lesson *operates on* prior engines. When recycled is high, **active-new should sit at the lower end** of its band. The per-tier bands **cannot all be maximized at once** — maxing active-new + supported-new + recognition + recycled simultaneously blows the total-exposure band. **Total exposure (~30–45) and production quality matter more than hitting every tier maximum.**

---

## 7. Item Tables

> Every item carries a **canonical identity** so the same item is one thing across lesson content, Weave, Practice Pool, Daily Review, Natural Reveal, Mon Lexique, and Word Graph (engine §14). Use the **`prefix:slug` convention in `docs/syllabus/canonical-item-id-convention-v0.1.md`** (e.g. `chunk:je-voudrais`, `frame:je-voudrais-plus-noun`). Existing specs use a provisional `type-slug` hyphen style (`chunk-je-suis`); both are acceptable until the post-smoke migration — keep IDs stable within a spec.

**Shared row format** (all tables):

| Item label | Canonical ID (placeholder) | Learner-facing meaning | Status | First seen / reused from | Mon Lexique behavior | Review hook | Weak-point tag |
|---|---|---|---|---|---|---|---|
| _label_ | _`type-slug`_ | _plain meaning_ | active / supported / recognition / recycled | _this lesson / L_x_ | _new entry / update / none_ | _none / +Nd / engine-return_ | _tag or —_ |

Provide one table per category present in the lesson (omit empty categories):

### 7.1 Word items
_(single lexical words; add columns: gender/number, sound note if relevant)_

### 7.2 Chunk items
_(fixed/semi-fixed multi-word units produced as one piece — the backbone of early production)_

### 7.3 Sentence frames
_(patterns with slots; add columns: **fixed part**, **slot(s)**, **allowed fillers**)_

### 7.4 Full sentence items
_(complete natural target sentences — anchor + variations)_

### 7.5 Grammar / phenomenon tags
_(named patterns the items participate in; tag, not a drilled table)_

### 7.6 Sound / writing tags
_(pronunciation/orthography facts; feeds TTS + listening traps)._ Future lesson specs should explicitly consider, where relevant: **elision** · **apostrophe use** · **liaison** · **silent final letters** · **accents / special letters** · **nasal vowels** · **French `u` / `r`** · **rhythm groups** · **spelling-sound bridges** (e.g. `é-→s-`).

> **Sound/writing guardrail.** This is a **recurring insight layer, not a standalone grammar lecture** by default. A normal lesson should usually carry **0–1 major** sound/writing insight and **at most 1 minor** note. Only an explicitly sound-focused lesson may exceed this, and only with stated justification. Do not turn a verb or vocabulary lesson into a pronunciation lecture.

### 7.7 Trap tags
_(deliberate confusables; add column: **distractor for** — may be option text only, no production target)_

### 7.8 Cognate / root / sound-bridge items
_(stickiness bridges, e.g. `merci ≈ mercy`)_

### 7.9 Faux ami / culture items
_(false-friend warnings, cultural usage bites)_

### 7.10 French-specific contrast / transfer trap
_(where an English-speaker's instinct produces unnatural or wrong French)._ Capture, per relevant item: **English→French trap** · **literal-translation trap** · **natural French alternative** · **register / naturalness contrast**. Examples:
- "I am hungry" → **`j'ai faim`**, not *je suis faim* (avoir-sensation vs être-state)
- `je suis fatigué` (être-state) vs `j'ai faim` (avoir-sensation)
- `c'est` vs `il est` / `elle est` (pointer vs attribution)
- `être grand` vs `être en haut` / `être debout` (tall vs up-high vs standing)
- "I would like doctor" → **`je voudrais être médecin`** (missing infinitive)
- profession article: **`je suis médecin`**, not *je suis un médecin* (at the right level)

> **Contrast guardrail.** LearnCraft (and similar Spanish/contrast-harvest sources) may **inspire** which contrasts to harvest, but **French-specific explanations always win** — do **not** port another language's syllabus wholesale. Use these contrasts as **micro-contrast / "Why This Works" / Natural Reveal fuel**, not as a heavy grammar detour in every lesson.

---

## 8. Continuity Map

> Every lesson must **introduce something new, grow something old, and prepare something future** (engine §8).

| Field | Value |
|---|---|
| **Carry-in from recent lessons** | _items reused from the last few lessons_ |
| **Carry-in from foundation** | _items reused from L0/early foundation_ |
| **New items introduced** | _items first taught here_ |
| **Carry-out to next lessons** | _items handed forward as expected-production_ |
| **Transformation plan** | _how carried items change (see types below)_ |
| **Fade plan** | _how scaffolding decreases: supported → active → transformed → expected_ |
| **Expected-production point** | _where/when these items are assumed unprompted_ |

**Transformation types used** (mark which apply — engine §9):

- [ ] same frame / new slot
- [ ] new subject
- [ ] negation
- [ ] question
- [ ] article / gender / number change
- [ ] verb chain
- [ ] tense / aspect / mood doorway
- [ ] pronoun insertion
- [ ] register / naturalness shift

> **Chunk/phrase → word/frame promotion (continuity move).** A known **chunk** may later **promote one of its pieces** into its own `word:`/`frame:` entry once the syllabus is ready. Examples: `comprendre` first appears inside the rescue chunk `je ne comprends pas`, then is promoted to `word:comprendre` (infinitive use) in L6; `ici`/`là` appear inside earlier chunks (e.g. `je suis ici`), then become controlled location words in L8. **Promotion must be explicit and status-marked** (recognition → supported/active) — do **not** silently treat earlier chunk exposure as full word ownership.

> **Question word inside a frozen chunk (bounded early use).** A question word may appear **inside a frozen chunk** before its full question system is taught. Examples: `tu vas où ?` (L8) and `tu fais quoi ?` (L9) may be **supported/recognition chunks** — this does **not** mean `où` / `quoi` / `est-ce que` is owned as a full question system. Such chunks must be **status-marked**, must **not** trigger broader question-word generation, and AI must **respect the chunk boundary** (generate the chunk, not the system).

---

## 9. Tense / Aspect / Mood Doorway

> Le Mot sequences verbal forms deliberately; many appear **as chunks/recognition first**, with full grammar treatment opening later (engine §10).

For each verbal form **touched** by this lesson, fill a row (omit untouched forms):

| Form | Status here | Taught as chunk or grammar system? | Future lesson that expands it |
|---|---|---|---|
| infinitive chains | _active/supported/recognition/future-hook_ | chunk / grammar | _L_x_ |
| present | | | |
| near future (aller + inf.) | | | |
| être en train de + inf. | | | |
| venir de + inf. | | | |
| passé composé | | | |
| imparfait | | | |
| plus-que-parfait | | | |
| futur simple | | | |
| conditionnel | | | |
| subjonctif doorway | | | |
| imperative | | | |
| participle / adjective-like forms | | | |

> Clarify per row: **is the form active, supported, recognition-only, or a future hook?** and **is it a chunk first or a grammar system?**

---

## 10. Exercise Flow Mapping

> Map the lesson onto the current canon lesson sections. (Section set per current reframe; if a lesson omits a section, state why.)

For **each** section fill: purpose · input used · learner action · expected output · feedback style · offline fallback (if relevant).

| Section | Purpose | Input used | Learner action | Expected output | Feedback style | Offline fallback |
|---|---|---|---|---|---|---|
| **Meet It** | | | | | | |
| **Notice the Pieces** | | | | | | |
| **Why This Works** | | | | | | |
| **Try It** | | | | | | |
| **Weave It** | | | | | | |
| **Shape It** | | | | | | |
| **Say It Your Way / Use It** | | | | | | |
| **Natural Reveal** | | | | | | |
| **Stay With It** | | | | | | |
| **Lesson End** | | | | | | |

> **Say It Your Way vs "Use It".** **Say It Your Way** is the primary user-facing production section. **"Use It"** may appear *only* as an internal umbrella label where one is needed (e.g. grouping production sections in planning) — it is **not** a separate learner-facing feature. This must **not** resurrect Mini Mission as a separate required lesson feature (killed/de-prioritized per locked canon Q2).

> Feedback style must stay passive-mirror / neutral (engine §2 step 5). No reward theatrics. TTS must speak French only and never read placeholders.

---

## 11. Natural Reveal / Feedback Plan

> The engine must supply the data Natural Reveal consumes (engine §12). Plan this **per production item**.

| Field | Value |
|---|---|
| **Expected target answer** | _the model/correct production_ |
| **Acceptable alternatives** | _bounded set of valid variants (so real variation isn't marked wrong)_ |
| **Natural upgrade** | _a more natural/idiomatic version, offered without scolding_ |
| **Register note** | _politeness / formality / spoken-vs-written, if relevant_ |
| **Common mistakes** | _predicted errors_ |
| **"Take another look" hint** | _neutral retry invitation — never "wrong" / "you failed"_ |
| **Weak-point tags** | _what a miss tags (phenomenon / sound / item)_ |
| **Passive mirror wording** | _the neutral acknowledgement copy, e.g. "You used French today."_ |

---

## 12. Practice Pool Seeds

> Define **seed formats only** — do not generate full pools here (engine §13).

| Field | Value |
|---|---|
| **Build seeds** | _easier reconstruction (arrange/assemble from known pieces)_ |
| **Stretch seeds** | _mid-difficulty, pushing toward active/transformed_ |
| **Challenge seeds** | _transformation or free production_ |
| **Listening traps** | _sound/writing-tag-driven distractors_ |
| **Repair items** | _re-practice for likely misses_ |
| **Transformation items** | _items that exercise §8 transformations_ |
| **Weak-point repair items** | _keyed to weak-point tags_ |

---

## 13. Daily Review Hooks

> Daily Review is a calm offer of retrieval from the *eligible* lesson pool — never pressure, streak, or "come back tomorrow" (engine §13).

| Field | Value |
|---|---|
| **Next-day hooks** | _items to resurface +1 day_ |
| **3-day hooks** | _items to resurface +3 days_ |
| **7-day hooks** | _items to resurface +7 days_ |
| **Old-engine return hooks** | _earlier engines this lesson should bring back_ |
| **Reading micro-paragraph possibility** | _optional short reading reuse, if appropriate_ |
| **Weave review hook** | _how Weave reuses this lesson's pieces in review_ |

---

## 14. Mon Lexique Output

> **Critical.** Mon Lexique is the **learner-facing memory of the learning engine, not a separate dictionary** (engine §14). Every lesson spec must declare its Mon Lexique output from the start, even though Mon Lexique is not built yet.

| Field | Value |
|---|---|
| **New Mon Lexique entries** | _items entering the learner's notebook_ |
| **Updated Mon Lexique entries** | _existing entries whose state/examples change_ |
| **Related pieces** | _siblings / transformations linked_ |
| **Where-used examples** | _sentences the item appeared in_ |
| **Learner-facing note** | _simple meaning/usage note_ |
| **Deep note (if needed)** | _optional richer note_ |
| **Mastery event** | _what mastery state change this lesson triggers (engine §6)_ |
| **Weak-point tag** | _tag if relevant_ |
| **Review hook** | _retrieval schedule pointer (§13)_ |
| **Future Word Graph edge placeholder** | _relationship to record now for a later graph (engine §15) — placeholder only_ |

> **Do not expose technical matrix codes, status enums, or canonical IDs to the learner.** The learner-facing Mon Lexique stays simple: meaning · examples · where you met it · related pieces · your own sentences · confidence/mastery · optional deeper notes. The rich metadata above powers it invisibly.

---

## 15. QA Checks

> A lesson spec must pass **all** of these before it is considered review-ready.

- [ ] Does the lesson begin with a usable human **moment** (not a word or a rule)?
- [ ] Is there a **sentence family**, not just one sentence?
- [ ] Are **active / supported / recognition** items clearly separated?
- [ ] Is **every production item prerequisite-safe** (§3)?
- [ ] Are all **unseen forms** marked supported or recognition-only (never unscaffolded active)?
- [ ] Does the lesson **grow available prior engines** where possible? (For **L1**, the only prior engine is L0 — the requirement is to **expand L0 deliberately**, not to grow 2–3 older engines. For **later lessons**, target **2–3 older-engine returns** unless the lesson has a justified exception.)
- [ ] Does it **avoid introducing too many full-cycle engines** (ideally one early)?
- [ ] Does it include **at least one meaningful production moment**?
- [ ] Does it produce **Mon Lexique-compatible metadata** (§14)?
- [ ] Does it create **Practice Pool and Daily Review hooks** (§12–§13)?
- [ ] Does it **avoid streak / XP / reward / level-up** language anywhere?
- [ ] Does it **preserve Le Mot tone** (passive mirror, premium calm, neutral on mistakes)?

---

## 16. Empty Template

> Copy everything in the block below into `docs/syllabus/L{NN}-{slug}.md` and fill it.

```md
# L{NN} — {Title} (Lesson Spec)

> Follows docs/learning-engine-v1.md + docs/syllabus/lesson-spec-template-v1.1.md.
> Locked product canon wins on conflict. Planning doc only — no code/content/flags.

## 1. Lesson Identity
- Lesson number:
- Lesson title:
- Journey phase:
- Lesson archetype:
- Estimated lesson time:
- Monolingual mode / explanation language:
- Practice Pool expansion level:
- Main can-do outcome:
- Pedagogical reason:

## 2. Prerequisite Check
- Required prior chunks:
- Required prior grammar / phenomena:
- Required prior sound / writing awareness:
- Required prior verb forms:
- Unseen forms (each with status, supported/recognition only):

## 3. Engine Plan
- Primary engine(s) [full-cycle] — why:
- Secondary engine(s) [short-cycle] — why:
- Ambient engine(s) [ambient] — why:

## 4. Opening Sentence Family
- Anchor sentence:
- Variation sentence 1:
- Variation sentence 2:
- Contrast sentence:
- Rescue / natural sentence:
- Interchangeable pieces:
- Fixed frame:
- Replaceable slots:
- Forbidden / not-yet-ready substitutions:

## 5. Item Budget (planning targets, not validators)
- Active new items (~8–15):
- Supported new items (~8–15):
- Recognition / ambient items (~10–20):
- Recycled items (grows over time):
- Total exposure estimate (~30–45):
- Production target count:

## 6. Item Tables
<!-- shared columns: label | canonical ID | learner meaning | status | first seen/reused from | Mon Lexique behavior | review hook | weak-point tag -->
### Word items
### Chunk items
### Sentence frames (cols: + fixed part | slot(s) | allowed fillers)
### Full sentence items
### Grammar / phenomenon tags
### Sound / writing tags
### Trap tags (col: + distractor for)
### Cognate / root / sound-bridge items
### Faux ami / culture items

## 7. Continuity Map
- Carry-in from recent lessons:
- Carry-in from foundation:
- New items introduced:
- Carry-out to next lessons:
- Transformation plan:
- Fade plan:
- Expected-production point:
- Transformation types used:
  - [ ] same frame / new slot
  - [ ] new subject
  - [ ] negation
  - [ ] question
  - [ ] article / gender / number change
  - [ ] verb chain
  - [ ] tense / aspect / mood doorway
  - [ ] pronoun insertion
  - [ ] register / naturalness shift

## 8. Tense / Aspect / Mood Doorway
<!-- per touched form: status here | chunk or grammar? | future lesson that expands it -->

## 9. Exercise Flow Mapping
<!-- per section: purpose | input used | learner action | expected output | feedback style | offline fallback -->
- Meet It:
- Notice the Pieces:
- Why This Works:
- Try It:
- Weave It:
- Shape It:
- Say It Your Way / Use It:
- Natural Reveal:
- Stay With It:
- Lesson End:

## 10. Natural Reveal / Feedback Plan (per production item)
- Expected target answer:
- Acceptable alternatives:
- Natural upgrade:
- Register note:
- Common mistakes:
- "Take another look" hint:
- Weak-point tags:
- Passive mirror wording:

## 11. Practice Pool Seeds (seed format only)
- Build seeds:
- Stretch seeds:
- Challenge seeds:
- Listening traps:
- Repair items:
- Transformation items:
- Weak-point repair items:

## 12. Daily Review Hooks
- Next-day hooks:
- 3-day hooks:
- 7-day hooks:
- Old-engine return hooks:
- Reading micro-paragraph possibility:
- Weave review hook:

## 13. Mon Lexique Output (learner-facing stays simple; no matrix codes shown)
- New Mon Lexique entries:
- Updated Mon Lexique entries:
- Related pieces:
- Where-used examples:
- Learner-facing note:
- Deep note (if needed):
- Mastery event:
- Weak-point tag:
- Review hook:
- Future Word Graph edge placeholder:

## 14. QA Checks
- [ ] Usable human moment to open
- [ ] Sentence family, not one sentence
- [ ] Active/supported/recognition separated
- [ ] Every production item prerequisite-safe
- [ ] Unseen forms supported/recognition only
- [ ] Grows available prior engines (L1: expand L0; later lessons: 2–3 older-engine returns unless justified)
- [ ] Not too many full-cycle engines
- [ ] At least one meaningful production moment
- [ ] Mon Lexique-compatible metadata
- [ ] Practice Pool + Daily Review hooks present
- [ ] No streak/XP/reward language
- [ ] Le Mot tone preserved
```

---

## 17. Open Decisions

> Unresolved — listed, not silently decided. Inherited from `docs/learning-engine-v1.md` §17 plus template-specific items.

- **Exact canonical ID naming convention** — the stable scheme for item/chunk/frame IDs shared across systems (§7, §14). Provisional codebase IDs (`chunk-*`, `verb-*`, `noun-*`) and `lm7_v1_*` storage namespace are not a locked convention.
- **Exact item counting method** — how a frame + its filled variations, and multi-word chunks, count toward the §6 budget.
- **Exact L1–L24 item volume bands** — per-lesson targets for the Core 150 spine; the §6 bands are coarse.
- **Final Mon Lexique public-beta timing** — whether/when Mon Lexique surfaces, and its minimal first surface.
- **How much of this template becomes runtime data after smoke** — which fields become real data structures / validators after the Dev APK smoke test, and which stay planning-only.

---

*End of Lesson Spec Template v1.1. This template is planning canon. It authorizes no code, content, schema, flag, or runtime change. The Dev APK smoke test remains the boundary before any runtime work derived from it.*
