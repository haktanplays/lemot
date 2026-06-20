# L7 — Aller / Movement / Next Step (Lesson Spec)

> **SUPERSEDED AS THE NEXT PR — read first.** This full aller/movement spec is **not** the next safe L7 PR: it is too broad and assumes L1–L6 content the shipped runtime does not contain. The accepted next-PR direction is the frozen-chunk doorway in **`docs/syllabus/L07-compact-doorway.compact-spec.md`**. This document is preserved as historical/planning input for the **eventual dedicated aller lesson** (deferred, not cancelled). Do not implement this spec as L7 without an explicit, separately reviewed closeout decision.

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/canonical-item-id-convention-v0.1.md` + `docs/syllabus/ai-generation-contract-v1.md` + the L1–L6 pilots + the L1–L5 retrospective.
> Planning/spec document only — authorizes **no** code, content, flag, or runtime change. Locked product canon wins on conflict.

> **PILOT.** First **Architecture Verb** lesson since L2 (Être), and the **first movement / next-step doorway** in the spine. It opens the *aller* engine as **"where am I going / what's my next step"** — deliberately **not** as a future tense. `je vais + infinitive` (futur proche) is held back as **recognition / future-hook only**; full futur proche ownership is **deferred to a later (paid-zone) lesson** to protect commercial depth. §18 records the findings.

> **Archetype**: primary = **Architecture Verb** (#2). Secondary (flavor only, not a second budget) = **Tense / Aspect / Mood Doorway** (#7) — used **only** as recognition/future-hook flavor, never as an owned tense. **New grammar systems: 0. Futur proche ownership: 0.**

---

## Canon Alignment Note (read first)

Spine: **L0 → L1 → L2 → L3 → L4 → L5 → L6 → L7 (this)**. L7 is the **first time/movement doorway** the L6 pilot and the L1–L5 retrospective called for (retrospective §9: time is the foundation's biggest gap; L6 §18: "L7 should open the time dimension… reuses the infinitive-chain mechanic L6 just promoted").

**Deliberate reframing of L6's carry-out (surfaced, not silently resolved).** L6 §7 anticipated the `je voudrais aller` hook transforming into **`je vais + infinitive` (near future)** at L7. **This spec narrows that:** L7 owns **movement / next-step direction** (`je vais à + place`), and **futur proche (`je vais + infinitive`) stays recognition / future-hook only**, deferred to a later lesson. Rationale: the "going to *do* X" engine is **high-value future production**; giving it away in a free-zone lesson would spend paywall/promise value early. L7 still reuses *aller* and still plants the futur-proche hook — it just owns the **place** sense first.

**What L7 is *not*:**
- **not** a full *aller* conjugation lesson (architecture-verb guardrail §4 — one dominant active core, the rest recognition);
- **not** a future-tense lesson;
- **not** the futur proche lesson (`je vais + infinitive` = recognition hook, 0 ownership);
- **not** a travel / location-vocabulary lesson (only **2** genuinely new place nouns: `maison`, `Paris`; café is recycled and light);
- **not** an `à / au / à la` preposition-system lesson (these appear as **supported movement pieces**, not a paradigm);
- **not** a `y` lesson (`y` is deferred; at most a tiny future hook).

**Café-centricity (continues L6's fix):** the dominant world moves to **class → home → city → next step**. Café appears **once, recycled and light** (`je ne vais pas au café`), never as the centre.

**Legacy mapping divergence (flag).** `CLAUDE.md`'s legacy 24-lesson dev-apk list maps **L6 = Aller, L7 = Questions I**. The **v1 syllabus spine** (this document set, the newer active canon) maps **L7 = Aller**. Per the Master Pipeline precedence rule (*newer active canon > codebase canon > older active canon*), this spec follows the **v1 spine**; the legacy bracket is noted, not adopted. Runtime/dev-apk (L1–L5 only) is unaffected — this is planning canon ahead of runtime.

---

## 1. Lesson Identity

| Field | Value |
|---|---|
| **Lesson number** | L7 |
| **Lesson title** | Where I'm Going (Aller / Movement / Next Step) |
| **Journey phase** | First Ascent (Core 150) · *(legacy bracket diverges — see Canon Alignment Note)* |
| **Lesson archetype** | primary `architecture-verb` · secondary (flavor only) `tense-aspect-mood-doorway` *(recognition/future-hook flavor)* |
| **Estimated lesson time** | ~5–6 min |
| **Monolingual mode / explanation language** | `english-guided` |
| **Practice Pool expansion level** | Build + Stretch + Challenge (movement transforms; rides L1–L6 engines) |
| **Main can-do outcome** | "I can say **where I'm going** and express a **simple next step** — `je vais à…`, `on va à…`, `je voudrais aller à…` — and say where I'm **not** going, without learning the full future." |
| **Pedagogical reason** | After the L6 consolidation beat, the learner is ready for the **first new system since L5** — but a *gentle* one. *Aller* is opened as a **movement engine** (place + direction), the most concrete and useful slice of the verb, while the powerful "going to *do* X" future is previewed but withheld. This adds genuine novelty and a new context (home/city/next-step) **without** a heavy tense lesson, a conjugation table, or a travel-vocabulary dump — and it protects the paid-zone promise. |

---

## 2. Prerequisite Check

| Field | Value |
|---|---|
| **Assumed from L0–L6** | polite request (`je voudrais`), être identity/state (`je suis …`), `c'est` / `c'est pas grave`, `ne…pas` negation, avoir-states + `j'ai besoin de`, `un/une` + `pas de`, the L6 integration/recombination skill, the rescue set (`je ne comprends pas`, `pouvez-vous répéter`). |
| **Required prior chunks** | `chunk:bonjour` · `chunk:je-voudrais` · `chunk:je-suis` · `chunk:j-ai-besoin-de` · `chunk:je-ne-comprends-pas` · `chunk:pouvez-vous-repeter` · `chunk:c-est-pas-grave`. |
| **Required prior grammar / phenomena** | `phen:negation-ne-pas` (to host `je ne vais pas`) · `frame:je-voudrais-plus-infinitive` (L6 — to host `je voudrais aller`) · article awareness from L5 (`un/une`, `le/la` recognition — needed to *recognise* `au` = `à + le`). |
| **Required prior sound / writing awareness** | elision (`j'`, `n'`, `d'`) from L1–L6 (light) — no new sound system required. |
| **Required prior verb forms** | present `je suis` / `j'ai` / `je voudrais` (chunked). **No prior knowledge of *aller* assumed** — it is genuinely new (confirmed: `content/itemRegistry.ts` has no aller entry). |
| **Genuinely new items** | **`word:aller`** (to go — infinitive, the lexeme) · **`chunk:je-vais`** (active core) · **`chunk:on-va`** (active/support) · **`word:maison`** (home/house — new place noun) · **`word:paris`** (proper-noun place) · supported movement pieces **`word:a` / `word:au` / `word:a-la`** (`à` / `au` = à+le / `à la`). |
| **Aller-form status (explicit)** | `je vais` = **active** · `on va` = **active/supported** · `je voudrais aller` = **supported** (reuses owned `je voudrais + infinitive`) · `je ne vais pas` = **supported** · `tu vas / il-elle va / nous allons / vous allez / ils-elles vont` = **recognition/ambient only** (not equal active production — §4 guardrail). |
| **`je vais + infinitive` status (explicit)** | **recognition / future-hook ONLY.** Met as input (`Je vais comprendre.`), **never a production target.** Full futur proche ownership is **deferred** (see Canon Alignment Note). |
| **Unseen / deferred** | futur proche **ownership** · futur simple · passé composé · imparfait · imperative · `être en train de` / `venir de` · the full *aller* paradigm as active production · the full `à/au/à la/aux` preposition system · `y` (place pronoun — deferred; at most a tiny future hook) · question expansion (`où tu vas ?` / `où est-ce que tu vas ?`). All allowed **only** as recognition or not at all. |

---

## 3. Engine Plan

> One dominant new full-cycle engine (**aller as movement**), two short/supported satellites, and recognition-only flavor. The architecture-verb guardrail (template §4) is the spine: **one active core, the rest recognition.**

| Engine | Depth | Why it exists |
|---|---|---|
| **A — Aller as movement / next step** | **full-cycle** (the one new engine) | The lesson's main target: say **where you're going**. Frames `frame:je-vais-plus-place` and `frame:on-va-plus-place`. Examples: *Je vais à la maison. · Je vais à Paris. · On va à la maison. · On va au café.* (café light/recycled only). |
| **B — Desire to go** | short-cycle | Reuses the **owned** `frame:je-voudrais-plus-infinitive` (L6) with *aller*: `frame:je-voudrais-aller-plus-place`. Examples: *Je voudrais aller à Paris. · Je voudrais aller à la maison. · Je voudrais aller au café.* (café light only). **No new mechanic** — a known frame gains *aller* as its infinitive. |
| **C — Negated movement** | **supported only** | Reuses **owned** `ne…pas` to negate movement: `frame:je-ne-vais-pas-plus-place`. Examples: *Je ne vais pas au café. · Je ne vais pas à Paris.* **Do not** expand this into negated-aller conjugation across persons. |
| **Recognition — `je vais + infinitive` (futur-proche preview)** | **recognition only** | `frame:je-vais-plus-infinitive` is **met, not produced**: *Je vais comprendre. · Je vais parler.* (and, cautiously, *Je vais demander de l'aide.* — recognition input only). Shows the learner that *aller* will later open a powerful "going to do" engine. **No production required.** |
| **Ambient — broader aller family** | ambient (recognition) | `tu vas · il/elle va · vous allez · nous allons · ils/elles vont` are **shown** so the learner recognises the paradigm exists, **not** drilled or required. |

**Why this is not a conjugation table.** Only **`je vais`** (and `on va`) carry active production weight; every other person-form is recognition. The teaching surface is **sentence families + place slots + micro-contrasts**, never a 6-cell grid (template §4, archetype #2 QA risks).

**Why this is not a future-tense lesson.** The owned target is **movement in the present** (`je vais à + place` = "I'm going to a place", a present-tense motion use of *aller*). `je vais + infinitive` (the future use) is **recognition only**; futur proche is **0% owned**. The timeline meaning is previewed, not taught.

**Why this belongs after L6.** L6 promoted the infinitive-chain frame (`je voudrais + infinitive`) and planted `je voudrais aller` / `on y va` as recognition hooks. L7 cashes the **movement** half of that hook into production while leaving the **future** half for later — the smallest, most concrete first step into the *aller* engine.

---

## 4. Opening Sentence Family

> **Human scene, not a travel list.** *"You're tired after class. You need help — and now you can also say **where you're going next**."*

| Role | Sentence | Note |
|---|---|---|
| **Open** | `Bonjour, je suis fatigué.` | L1 greeting + L2 state (recycled) |
| **Need (recycled)** | `J'ai besoin d'aide.` | L6 signature (recycled) |
| **Movement — anchor** | `Je vais à la maison.` | **new core**: `je vais + à la + place` |
| **Movement — variation (subject)** | `On va à Paris.` | `on va + à + place` (proper noun, no article) |
| **Desire to go** | `Je voudrais aller à la maison.` | L6 frame + *aller* (supported) |
| **Negated movement** | `Je ne vais pas au café.` | `ne…pas` + `au` (= à+le); café recycled/light, contrastive |
| **Rescue (recycled)** | `Je ne comprends pas. Pouvez-vous répéter ?` | L1 rescue, in context |
| **Reassure (recycled)** | `C'est pas grave.` | L2 chunk, natural repair |
| **Future hook (recognition only)** | `Je vais comprendre.` | **recognition** — shows the future use of *aller*; **not** a production target |

- **Interchangeable pieces**: `je vais à { la maison / Paris }` · `on va { à la maison / à Paris / au café }` · `je voudrais aller à { la maison / Paris }` · `je ne vais pas { au café / à Paris }`.
- **Fixed frames**: `frame:je-vais-plus-place` · `frame:on-va-plus-place` · `frame:je-voudrais-aller-plus-place` · `frame:je-ne-vais-pas-plus-place` · *(recognition only)* `frame:je-vais-plus-infinitive`.
- **Replaceable slots**: the **place** after `à / au / à la` (closed set this lesson: `la maison`, `Paris`, `au café`). The subject toggles only between `je` and `on` (active); other subjects are recognition.
- **Anchor**: `Je vais à la maison.` · **Variations**: `On va à Paris.`, `Je voudrais aller à la maison.` · **Contrast**: `Je vais à la maison.` (movement, present) vs `Je vais comprendre.` (future use — *recognition*, shown side-by-side so the learner *feels* the boundary without owning it).
- **Rescue / natural sentence**: `Je ne comprends pas. Pouvez-vous répéter ?` (+ `c'est pas grave`).
- **Forbidden / not-yet-ready substitutions**:
  - **no `je vais + infinitive` as production** (`Je vais manger`, `Je vais demander…` = recognition input only);
  - **no full-paradigm production** (`nous allons`, `ils vont` stay recognition);
  - **no new place-noun dump** (only `maison`, `Paris`, recycled `café`);
  - **no `à/au/à la/aux` taught as a rule set** (supported pieces only; `aux` not introduced);
  - **no `y`** (`j'y vais` / `on y va` stay recognition/deferred);
  - **no past/future system** (`je suis allé`, `j'irai` forbidden);
  - **no question expansion** (`où tu vas ?` deferred).

---

## 5. Item Budget

> Architecture-verb lesson, but deliberately at the **low end** of the active-new band (archetype #2 = ~10–14; **L7 targets ~7–10**) because it owns only the *movement* sense and recycles L1–L6 heavily. Per template §6, the tiers are **not** all maxed at once — recycled runs high, so active-new sits low.

| Tier | This lesson | Target band (this lesson) | Notes |
|---|---|---|---|
| **Active — new** | **8** | ~7–10 | `word:aller`, `chunk:je-vais`, `chunk:on-va`, `frame:je-vais-plus-place`, `frame:on-va-plus-place`, `word:maison`, `word:paris`, `phen:movement-aller` |
| **Supported — new** | **9** | ~8–12 | `frame:je-voudrais-aller-plus-place`, `frame:je-ne-vais-pas-plus-place`, `word:a`, `word:au`, `word:a-la`, `phen:a-contraction-movement`, `chunk:je-voudrais-aller`, `chunk:je-ne-vais-pas`, `sound:silent-final-s-vais` |
| **Recognition / ambient** | **12** | ~10–14 | `frame:je-vais-plus-infinitive` (futur-proche preview), `phen:futur-proche-preview`, `chunk:je-vais-comprendre`, `chunk:je-vais-parler`, `word:tu-vas`, `word:il-elle-va`, `word:nous-allons`, `word:vous-allez`, `word:ils-vont`, `chunk:on-y-va` (recycled hook), `sound:au-contraction`, `cog:maison-mansion` |
| **Recycled from L1–L6** | **~17** | ~14–20 | bonjour, je suis (+fatigué), j'ai besoin de / d'aide, je voudrais, je voudrais + infinitive, ne…pas, je ne comprends pas, pouvez-vous répéter, c'est pas grave, merci, un café / au café, à (light from set phrases), comprendre (inf.), aide, mais, je voudrais aller (L6 hook → now supported) |
| **Traps (option-only)** | **3** | — | `trap:je-voudrais-vais`, `trap:je-suis-vais`, `trap:je-vais-comprends` |
| **Total exposure** | **~37** | ~35–42 | within band |
| **Production targets** | **6 sentences** | ~5–7 | je vais à la maison · on va à Paris · je voudrais aller à la maison · je ne vais pas au café · (transform) je vais à Paris → je ne vais pas à Paris · a free "where are you going next?" line |

> **Does L7 overload after L6?** **Borderline-but-controlled — the main risk to watch.** L6 was a calm integration (4 active-new). L7 re-introduces a *new system* (8 active-new), so the step up is real and intentional. It is kept safe by: only **one** new engine (movement), **two** new place nouns, **heavy recycling** (~17), and futur proche/paradigm pushed to recognition. If smoke shows it feels heavy, demote `on va` to fully supported and cut a recognition item — **do not** add place nouns or promote futur proche to compensate.

---

## 6. Item Tables

> Shared columns: label · canonical ID (**v0.1 `prefix:slug`**) · learner meaning · status · first-seen/reused · Mon Lexique behavior · review hook · weak-point. IDs are **internal** (never shown to learners). ASCII IDs (no accents/apostrophes): `à → a`, `à la → a-la`.

### 6.1 Active items (new)

| Label | Canonical ID | Meaning | Status | First seen / reused | Mon Lexique | Review hook | Weak-point |
|---|---|---|---|---|---|---|---|
| aller | `word:aller` | to go (infinitive) | active (new lexeme) | L7 | new | +1d,+7d | `weak:aller-movement` |
| je vais | `chunk:je-vais` | I go / I'm going | active (new core) | L7 | new | +1d,+3d | `weak:aller-movement`, `weak:futur-proche-not-owned` |
| on va | `chunk:on-va` | we / one goes | active/support | L7 | new | +3d | `weak:on-va-subject` |
| (I'm going to + place) | `frame:je-vais-plus-place` | "I'm going to ___" | active (new) | L7 | new | +1d | `weak:a-au-contraction` |
| (we're going to + place) | `frame:on-va-plus-place` | "we're going to ___" | active/support | L7 | new | +3d | `weak:a-au-contraction` |
| maison | `word:maison` | home / house (f) | active (new noun) | L7 | new | +3d | gender (`la maison`) |
| Paris | `word:paris` | Paris (place) | active (new, proper) | L7 | new | +7d | `à Paris` (no article) |
| movement *aller* | `phen:movement-aller` | *aller* = going to a place (present motion) | active (phenomenon) | L7 | n/a | — | `weak:futur-proche-not-owned` |

### 6.2 Supported items (new)

| Label | Canonical ID | Meaning | Status | First seen | Mon Lexique | Weak-point |
|---|---|---|---|---|---|---|
| je voudrais aller | `chunk:je-voudrais-aller` | I'd like to go | supported (promoted from L6 hook) | L7 (L6 hook) | new | `weak:voudrais-plus-infinitive` |
| (I'd like to go to + place) | `frame:je-voudrais-aller-plus-place` | "I'd like to go to ___" | supported | L7 | new | `weak:voudrais-plus-infinitive` |
| je ne vais pas | `chunk:je-ne-vais-pas` | I'm not going | supported | L7 | new | `weak:negation-placement` |
| (I'm not going to + place) | `frame:je-ne-vais-pas-plus-place` | "I'm not going to ___" | supported | L7 | new | `weak:negation-placement` |
| à | `word:a` | to (direction) | supported (movement piece) | L7 | new (in examples) | `weak:a-au-contraction` |
| au (= à + le) | `word:au` | to the (m) | supported (movement piece) | L7 | new (in examples) | `weak:a-au-contraction` |
| à la | `word:a-la` | to the (f) | supported (movement piece) | L7 | new (in examples) | `weak:a-au-contraction` |
| à/au/à la (movement) | `phen:a-contraction-movement` | `à + le → au`; `à la` stays; `à + Paris` (no article) | supported (phenomenon, **not a system**) | L7 | n/a | `weak:a-au-contraction` |
| silent final -s in *vais* | `sound:silent-final-s-vais` | the `-s` in `vais` is silent | supported (1 light note) | L7 | n/a | silent-finals |

### 6.3 Sentence frames

| Label | Canonical ID | Meaning | Status | Fixed part | Slot(s) | Allowed fillers |
|---|---|---|---|---|---|---|
| go to place | `frame:je-vais-plus-place` | "I'm going to ___" | active (new) | `je vais ___` | à + place | à la maison, à Paris |
| we go to place | `frame:on-va-plus-place` | "we're going to ___" | active/support | `on va ___` | à + place | à la maison, à Paris, au café |
| want to go to place | `frame:je-voudrais-aller-plus-place` | "I'd like to go to ___" | supported | `je voudrais aller ___` | à + place | à la maison, à Paris |
| not going to place | `frame:je-ne-vais-pas-plus-place` | "I'm not going to ___" | supported | `je ne vais pas ___` | à + place | au café, à Paris |
| **going to + verb (preview)** | `frame:je-vais-plus-infinitive` | "I'm going to ___ (do)" | **recognition only** | `je vais ___` | infinitive | comprendre, parler *(input only — never required)* |

### 6.4 Full sentence items

| Label | Canonical ID | Sentence | Status |
|---|---|---|---|
| anchor | `sent:l07-je-vais-a-la-maison` | Je vais à la maison. | active |
| variation (subject) | `sent:l07-on-va-a-paris` | On va à Paris. | active/support |
| desire | `sent:l07-je-voudrais-aller-a-la-maison` | Je voudrais aller à la maison. | supported |
| negated | `sent:l07-je-ne-vais-pas-au-cafe` | Je ne vais pas au café. | supported |
| future hook | `sent:l07-je-vais-comprendre` | Je vais comprendre. | recognition (future hook) |

### 6.5 Grammar / phenomenon tags

| Label | Canonical ID | Note | Status |
|---|---|---|---|
| movement *aller* | `phen:movement-aller` | *aller* expresses going to a place (present motion) — the lesson's owned meaning | active |
| futur proche preview | `phen:futur-proche-preview` | `je vais + infinitive` = "going to (do)" — **previewed, not owned** | recognition |
| à-contraction (movement) | `phen:a-contraction-movement` | `à + le → au`; `à la` unchanged; proper nouns take bare `à` — a **piece**, not a preposition system | supported |

### 6.6 Sound / writing tags

| Label | Canonical ID | Fact | Status |
|---|---|---|---|
| silent final -s in *vais* | `sound:silent-final-s-vais` | the `-s` of `vais` is not pronounced | supported (1 light note) |
| `au` contraction sound | `sound:au-contraction` | `au` is heard as one sound `/o/` (= à + le) | recognition |

> **0 major** sound/writing insight; **1 light** note (`silent-final-s-vais`) + 1 recognition (`au`). **L7 is not a sound lesson** (template §7.6 guardrail). Liaison in `vous allez` is **not** taught (that form is recognition-only).

### 6.7 Trap tags (option text only)

| Label | Canonical ID | Distractor for | Trap reason |
|---|---|---|---|
| je voudrais vais | `trap:je-voudrais-vais` | je voudrais **aller** | after `je voudrais`, the verb stays **infinitive** (`aller`), not conjugated (`vais`) |
| je suis vais | `trap:je-suis-vais` | je vais | movement uses *aller* alone (`je vais`), not `être` + *aller* (`je suis vais` is a double-verb transfer error) |
| je vais comprends | `trap:je-vais-comprends` | je vais **comprendre** | in the `je vais + infinitive` preview, the second verb stays **infinitive** (`comprendre`), not conjugated (`comprends`) |

### 6.8 Cognate / root / sound-bridge items

| Label | Canonical ID | Bridge | Status |
|---|---|---|---|
| maison ≈ mansion | `cog:maison-mansion` | both from Latin *mansio* (a dwelling) — `maison` = home | recognition |
| Paris ≈ Paris | `cog:paris-paris` | transparent proper noun (spelling identical, pronunciation differs) | recognition |

### 6.9 French-specific contrast / transfer trap

| Label | Canonical ID | Contrast | Status |
|---|---|---|---|
| I am going to a place → `Je vais à…` | `phen:movement-aller` (applied) | English "I am going" = one French verb `je vais` — **not** `je suis vais` (don't add *être*) | active (Why-This-Works) |
| I would like to go → `Je voudrais aller…` | `frame:je-voudrais-aller-plus-place` | after `je voudrais`, verb stays **infinitive** `aller` — not `je voudrais vais` | supported |
| I am going to understand → `Je vais comprendre` | `phen:futur-proche-preview` | this is a **future doorway**, valid but **not owned yet** — recognised, not produced | recognition |

> **New vs recycled discipline (flag §18):** genuinely new = `aller`, `je vais`, `on va`, `maison`, `Paris`, the movement frames, and the `à/au/à la` movement pieces. Everything else recombines L1–L6. The risk here is the **opposite** of L6: L6 risked *too little* novelty; L7 risks *too much* — guarded by withholding futur proche, the paradigm, extra place nouns, and `y`.

---

## 7. Continuity Map

| Field | Value |
|---|---|
| **Carry-in from L1** | `je voudrais`, `bonjour`, rescue phrases (`je ne comprends pas`, `pouvez-vous répéter`), `merci`. |
| **Carry-in from L2** | `je suis` (+ `fatigué`), `c'est` / `c'est pas grave`. |
| **Carry-in from L3** | `ne…pas` (now wraps movement: `je ne vais pas`); simple yes/no intonation if useful (light). |
| **Carry-in from L4** | `j'ai besoin de` (+ human states). |
| **Carry-in from L5** | `un/une` noun packages (light); article awareness needed to *recognise* `au = à + le`; object slots light only. |
| **Carry-in from L6** | human context, `aide`, `comprendre` (inf.), `je voudrais comprendre`, and the **future-hook `je voudrais aller …`** — now promoted to supported production. |
| **New items introduced** | `aller`, `je vais`, `on va`, `maison`, `Paris`, the movement frames, `à/au/à la` movement pieces (see §6). |
| **Carry-out to future** | full **futur proche ownership** (`je vais + infinitive` as production) — later, **paid-zone** lesson; movement/preposition lessons (full `à/au/à la/aux/de`); `y` as place pronoun (`j'y vais` / `on y va`); question expansion (`où tu vas ?` / `où est-ce que tu vas ?`); later **past movement with *être* auxiliary** (`je suis allé`); *aller* idioms (`ça va`, `on y va`, `allons-y`). |
| **Transformation plan** | see table below. |
| **Fade plan** | `je vais à + place` moves supported → active → expected; `je voudrais aller` and `je ne vais pas` move toward active; the `à/au/à la` pieces stay supported until a dedicated preposition lesson. |
| **Expected-production point** | "say where you're going / where you'd like to go / where you're not going" assumed from L8 onward and in Daily Review. `je vais + infinitive` (future) is **not** expected until its own later lesson. |

**Transformation plan (carry-out):**

| Carried item | Transforms into | Lands in |
|---|---|---|
| `frame:je-vais-plus-place` (movement) | `frame:je-vais-plus-infinitive` as **production** (full futur proche) | **later paid-zone tense lesson** |
| `je voudrais aller à + place` | richer plans / `on y va` / `allons-y` | later movement/idiom lesson |
| `à / au / à la` movement pieces | full `à/au/à la/aux` + `de` preposition system | later preposition lesson |
| `phen:futur-proche-preview` (recognition) | owned futur proche | later (paid) |
| L7 movement lines | Practice Pool / Daily Review / "A Small Moment" reading | ongoing |

**Transformation types used (engine §9):** ☑ same frame / new slot (place into `je vais`) · ☑ new subject (`je` → `on`, light) · ☑ negation (`je ne vais pas`) · ☑ tense/aspect/mood doorway (**recognition hook only** — `je vais + infinitive` met, not owned) · ☐ article/gender change · ☐ pronoun insertion (`y` deferred) · ☑ register / naturalness (next-step human scene).

> **Principle check** (engine §8): introduces new (*aller* movement engine, `maison`/`Paris`) ✓ · grows old (recombines `je suis`, `ne…pas`, `je voudrais + inf.`, the L6 human scene) ✓ · prepares future (futur proche / `y` / preposition / past-movement hooks) ✓.

---

## 8. Tense / Aspect / Mood Doorway

| Form | Status here | Taught as chunk or grammar? | Future lesson that expands it |
|---|---|---|---|
| **present (movement *aller*)** | **active** (`je vais à…`, `on va à…`) | chunk + light frame (not a paradigm) | later full *aller* / present lessons |
| **conditionnel** (`je voudrais aller`) | supported (recycled `je voudrais` + *aller*) | chunk/frame (unchanged mechanic) | later |
| **near future — `aller + infinitive` (futur proche)** | **recognition / future-hook ONLY** (`je vais comprendre`) | preview, **0 ownership** | **later (paid-zone) futur-proche lesson** |
| **futur simple** | none | — | later |
| **passé composé** (incl. `je suis allé`) | none | — | later (past movement with *être* aux) |
| **imparfait** | none | — | later |
| **imperative** (`allons-y` / `vas-y`) | none (at most ambient `on y va` recycled) | — | later idiom lesson |
| **`être en train de` / `venir de`** | none | — | later |

> Explicitly **not** in L7: any owned future/past; the full *aller* paradigm as production; `je vais + infinitive` production; imperative; `y` production; question-word systems.

---

## 9. Sound / Writing Pattern

> Guardrail: **0 major, ≤1 minor** (template §7.6). **L7 takes one light note + one recognition; it is not a sound or preposition lesson.**

- **Light note — silent final `-s` in `vais`** (`sound:silent-final-s-vais`): `je vais` ends in a vowel sound; the `-s` is silent. A single salient fact, not a spelling lecture.
- **Recognition — `au` is one sound** (`sound:au-contraction`): `au` (= à + le) is heard as `/o/`. Recognition only, to support hearing `au café`.
- **Not taught**: liaison in `vous allez` (that form is recognition-only); accents; nasal vowels. No sound block.

---

## 10. French-Specific Contrast / Transfer Trap

> Micro-contrasts only (template §7.10) — "Why This Works" / Natural Reveal fuel, not a grammar detour.

- **"I am going to a place" → `Je vais à la maison`, not `je suis vais`.** English "I am going" is a single French verb (`je vais`); don't bolt *être* onto *aller*. (`trap:je-suis-vais`.)
- **"I would like to go" → `Je voudrais aller…`, not `je voudrais vais`.** After `je voudrais`, the verb stays **infinitive** (`aller`). (`trap:je-voudrais-vais`.)
- **"I am going to understand" → `Je vais comprendre` is a *future doorway*, not owned yet.** It is valid French and previewed for recognition; the learner is **not** asked to produce it. **Do not over-explain the future system** — one sentence: "you'll learn this 'going to do' use later."

---

## 11. Exercise Flow Mapping

> Architecture-verb weighting: **Engine Plan, Opening Sentence Family, Why This Works (micro-contrast), Shape It** are strong; exhaustive person-form coverage is deliberately light. Weave It / Say It Your Way test **controlled movement / next-step production**.

| Section | Purpose | Input used | Learner action | Expected output | Feedback style | Offline |
|---|---|---|---|---|---|---|
| **Meet It** | Meet the next-step moment | `Je suis fatigué. Je vais à la maison.` (TTS) | listen, read | recognition | passive mirror | ✓ |
| **Notice the Pieces** | See `je vais` + `à + place` slotting | highlighted `je vais` / `à la` / `au` / place | tap the pieces | recognise the movement frame | neutral | ✓ |
| **Why This Works** | One micro-contrast: movement *aller* alone (no *être*); `je voudrais aller` keeps infinitive | brief insight | read | recognition | none (insight) | ✓ |
| **Try It** | Pick the right form (traps) | `Je ___ à la maison.` / `Je voudrais ___ à Paris.` | choose `vais`/`aller`; reject `suis vais`/`vais` | supported production | reveal + reason | ✓ |
| **Weave It** *(strong)* | Build a movement line | pieces given | assemble `Je suis fatigué, je vais à la maison.` | active production | model reveal + alternatives | ✓ |
| **Shape It** *(strong)* | Transform: affirm → negate; `je` → `on`; statement → desire | swap subject/polarity/place | `je vais à Paris` → `je ne vais pas à Paris` / `on va à Paris` / `je voudrais aller à Paris` | active production | passive mirror | ✓ |
| **Say It Your Way** *(strong)* | Say your real next step | "You're done here — say **where you're going next**, and where you're **not** going." | free write/say | active production | model-answer-only (no AI) + natural alternatives | ✓ |
| **Natural Reveal** | Why it's natural; movement vs the future hook | learner's attempt | read reveal | recognition | natural upgrade + register note | ✓ |
| **Stay With It** | Light retrieval: movement + L6 human engines | mixed prompts | recall | active/supported | passive mirror | ✓ |
| **Lesson End** | Calm close, name the growth | recap card | read | — | passive mirror ("You can say where you're going now.") | ✓ |

**Weave It / Say It Your Way must test:** *where are you going?* (`je vais à…`) · *where would you like to go?* (`je voudrais aller à…`) · *where are you not going?* (`je ne vais pas…`) · *what do you need before you go?* (recycled `j'ai besoin de…`). They must **not** require `je vais + infinitive` production.

> No AI in L7 (`model-answer-only`, like L0–L6). TTS reads French only; never reads placeholders or IDs.

---

## 12. Natural Reveal / Feedback Plan

**Movement (signature):**
- **Expected**: `Je vais à la maison.`
- **Acceptable alternatives**: `Je vais à la maison maintenant.`; unaccented variants; `On va à la maison.`
- **Natural upgrade**: add `maintenant` or a greeting for warmth.
- **Common mistakes**: `je suis vais` (double verb); `je vais à le café` (should contract to **`au café`**); `je vais maison` (missing `à la`). **Hint**: "Movement is just `je vais` + where: `je vais **à la** maison`."
- **Weak-point tags**: `weak:aller-movement`, `weak:a-au-contraction`.
- **Passive mirror**: "You said where you're going."

**Desire to go:**
- **Expected**: `Je voudrais aller à Paris.`
- **Common mistakes**: `je voudrais vais à Paris` (conjugated after `je voudrais`). **Hint**: "After `je voudrais`, keep the verb whole: `aller`."
- **Weak-point**: `weak:voudrais-plus-infinitive`.

**Negated movement:**
- **Expected**: `Je ne vais pas au café.`
- **Acceptable alternatives**: spoken `je vais pas au café` (recognised, lightly upgraded to the full form).
- **Common mistakes**: misplacing `ne…pas`. **Hint**: "Wrap the verb: `je **ne** vais **pas** …`."
- **Weak-point**: `weak:negation-placement`.

**Future hook (recognition — feedback is recognition-framed, never a production correction):**
- **Shown**: `Je vais comprendre.` — "This 'going to do' use comes later; for now just notice it."
- **If the learner *attempts* `je vais + infinitive`**: accept the meaning, mirror gently, tag `weak:futur-proche-not-owned`, and say it'll be taught later — **do not** teach the futur proche on the spot (AI/feedback contract §11).

**Common mistakes (lesson-wide watch list):** `je voudrais vais` · `je suis vais` · `je vais comprends` · overusing/mis-contracting `au` / `à la` · reaching for futur simple or past before taught · turning the answer into a travel list. **Passive mirror throughout; no scores, no reward language.**

---

## 13. Practice Pool Seeds

> Seed formats only — no full pool (engine §13).

| Seed type | Examples |
|---|---|
| **Build** | arrange: `Je / vais / à la / maison` ; `On / va / à / Paris` |
| **Stretch** | swap the place / subject: "say you're going home / to Paris / that *we* are going" |
| **Challenge** | a next-step line: "say you're tired, you need help, and where you're going next" (movement + L6 engines) |
| **Listening traps** | `je vais` vs `je suis` ; `au café` vs `à café` ; `aller` vs `vais` after `je voudrais` |
| **Repair items** | `je suis vais` → `je vais` ; `je voudrais vais` → `je voudrais aller` ; `je vais à le café` → `je vais au café` |
| **Transformation items** | `je vais à Paris` → `je ne vais pas à Paris` ; `je vais à la maison` → `on va à la maison` ; `je vais à Paris` → `je voudrais aller à Paris` |
| **Movement items** | where are you going / where would you like to go / where are you not going (closed place set) |
| **Futur-proche preview items (recognition only)** | *recognise* the meaning of `Je vais comprendre.` / `Je vais parler.` — **match-meaning / notice tasks only, never produce** |

---

## 14. Daily Review Hooks

| Hook | Items |
|---|---|
| **Next-day (+1d)** | je vais à la maison, je vais (core), à la / au |
| **3-day (+3d)** | on va à Paris, je voudrais aller à…, je ne vais pas… |
| **7-day (+7d)** | aller (lexeme), maison/Paris, movement vs the future hook (recognition) |
| **Old-engine return** | `je suis` (state) + `j'ai besoin de` + `ne…pas` resurface inside movement lines; the L6 human scene returns with a destination |
| **Weave review hook** | "I'm tired, so I'm going home, but I'm not going to the café." (mix known FR + English) |
| **Reading micro-paragraph (optional)** | 2–3 lines, known items only: *"Bonjour. Je suis fatigué. Je ne comprends pas. J'ai besoin d'aide. Maintenant, je vais à la maison."* — comprehension check, no new vocabulary, **no futur proche.** |

> Daily Review draws only from reached lessons; calm offer, never streak/score/pressure language.

---

## 15. Mon Lexique Output

> Mon Lexique = learner-facing memory of the engine, **not** a dictionary (engine §14). Canonical IDs internal; learner sees the simple surface (meaning · examples · where met · related · your sentences · confidence · optional note). **No IDs / status codes shown.** *(Mon Lexique is dev-apk out-of-scope — Master Pipeline Rule 8 — so this is planning output, mandatory per template §14 even though Mon Lexique is not built.)*

| Entry | Canonical ID | Learner-facing meaning | Where-used examples | Related pieces | Mastery event | Review hook |
|---|---|---|---|---|---|---|
| **aller** | `word:aller` | to go | "Je vais à la maison." · "Je voudrais aller à Paris." | je vais, on va, je voudrais | new | +1d,+7d |
| **je vais** | `chunk:je-vais` | I go / I'm going (somewhere) | "Je vais à la maison." | aller, je ne vais pas | new | +1d,+3d |
| **on va** | `chunk:on-va` | we go / we're going | "On va à Paris." | aller, on y va | new | +3d |
| **à** | `word:a` | to (a place) | "Je vais à Paris." | au, à la | new (in examples) | +1d |
| **au** | `word:au` | to the (m) — `à + le` | "On va au café." | à, à la | new (in examples) | +3d |
| **à la** | `word:a-la` | to the (f) | "Je vais à la maison." | à, au | new (in examples) | +3d |
| **maison** | `word:maison` | home / house | "Je vais à la maison." | à la | new | +3d |
| **Paris** | `word:paris` | Paris | "On va à Paris." | à | new | +7d |
| **(recognition) je vais + (verb)** | `frame:je-vais-plus-infinitive` | "going to (do)" — a small preview; **not a notebook entry yet** | "Je vais comprendre." | je vais | recognition (future hook) | — |
| **je voudrais** *(updated)* | `chunk:je-voudrais` | I would like → now also "to go" | "Je voudrais aller à la maison." | je voudrais aller, aller | updated (aller filler) | +3d |
| **comprendre** *(updated, recognition)* | `word:comprendre` | to understand → also seen in "Je vais comprendre" (future hook, **recognition only**) | "Je vais comprendre." | je vais, je voudrais comprendre | updated (recognition use) | — |
| **aide** *(carry-in)* | `word:aide` | help (human-context carry-in) | "J'ai besoin d'aide." | j'ai besoin de | reused | +3d |
| **ne…pas** *(updated)* | `phen:negation-ne-pas` | not → now wraps movement | "Je ne vais pas au café." | je ne vais pas | reused → strengthened | +3d |
| **c'est pas grave** *(carry-in)* | `chunk:c-est-pas-grave` | "it's okay" — natural repair | "C'est pas grave." | rescue set | reused | — |

---

## 16. AI Generation Compatibility

> Binds to `docs/syllabus/ai-generation-contract-v1.md`. L7 currently runs `model-answer-only` (no live AI), so this governs the *next* stage. Required inputs (contract §3) must be supplied; missing context → refuse/degrade, never guess.

Explicit L7 constraints:
- **AI may generate only controlled *aller* movement examples inside the allowed frames** — `frame:je-vais-plus-place`, `frame:on-va-plus-place`, `frame:je-voudrais-aller-plus-place`, `frame:je-ne-vais-pas-plus-place` — filled only with the **closed place set** (`la maison`, `Paris`, recycled `café`).
- **AI must NOT make `je vais + infinitive` a required/active production.** It may appear **only** as recognition input (`frame:je-vais-plus-infinitive`), and feedback must never demand it.
- **AI must NOT introduce** futur simple, passé composé, imparfait, futur proche **as owned production**, question-word systems (`où`, `est-ce que`), `y`, the full *aller* paradigm as production, `aux`, or `de`-prepositions — **even if the French is correct** (prerequisite-safety overrides validity, contract §2/§6).
- **AI may use at most 1–2 low-risk place nouns** beyond the set, and **only** if marked `supported`/`recognition` — never a verb, never a new system (contract §7). Default: **stay inside the closed set.**
- **AI must NOT turn L7 into a generic travel lesson** (no airports, tickets, directions vocabulary, itineraries) and must keep the **human next-step** framing.
- **AI must preserve the paywall strategy**: the "going to *do* X" future depth remains **deferred** — do not preview it beyond the single recognition hook.
- **Traps** come from `trap:je-voudrais-vais` / `trap:je-suis-vais` / `trap:je-vais-comprends`; repair targets the lesson's `weak:` tags. Natural Reveal stays passive-mirror (contract §10), Say It Your Way stays a scoped production-and-mirror moment (contract §11).

**Proposed addition to the contract's §15 allowed/blocked table (propose for review — do NOT auto-apply):**

| Lesson | ✅ Allowed | 🚫 Blocked | Why blocked |
|---|---|---|---|
| **L7** | `Je vais à la maison.` · `On va à Paris.` · `Je voudrais aller à Paris.` · `Je ne vais pas au café.` | `Je vais manger au café.` · `Hier, je suis allé à Paris.` · `J'irai à Paris.` · `Où est-ce que tu vas ?` | `je vais + infinitive` (futur proche) is recognition-only; passé composé/`hier`, futur simple, and question-word/`est-ce que` are all deferred |

---

## 17. QA Checks

| Check | Verdict |
|---|---|
| Begins with a usable human moment? | ✅ "tired after class, now you can say where you're going next" |
| Sentence family, not one sentence? | ✅ 9-line next-step scene (§4) |
| Active / supported / recognition separated? | ✅ §5–§6 explicit |
| Every production item prerequisite-safe? | ✅ movement rides owned frames; `je voudrais aller` reuses L6's infinitive frame; `je ne vais pas` reuses `ne…pas` |
| Unseen forms supported/recognition only? | ✅ futur proche = recognition hook; paradigm = recognition; `y`/past/future deferred |
| Grows available prior engines? | ✅ recombines `je suis`, `ne…pas`, `je voudrais + inf.`, the L6 human scene (≥3 older-engine returns) |
| Avoids too many full-cycle engines? | ✅ **one** new full-cycle (movement *aller*); satellites are short/supported/recognition |
| ≥ 1 meaningful production moment? | ✅ 6 production targets |
| Mon Lexique-compatible metadata? | ✅ §15, in canonical-ID form |
| Practice Pool + Daily Review hooks? | ✅ §13–§14 (+ optional reading micro-paragraph) |
| No streak/XP/reward language? | ✅ passive mirror throughout |
| Le Mot tone preserved? | ✅ calm, neutral, premium |

**Explicit concern flags (answered):**
- **Does L7 overload after L6?** **The main risk.** L6 was a calm integration (4 active-new); L7 adds a new system (8 active-new). The step is intentional but real. Mitigated by one engine, two place nouns, heavy recycling (~17), futur proche/paradigm withheld. **Watch in smoke;** if heavy, demote `on va` to supported and trim a recognition item — never add scope.
- **Is futur proche kept as recognition / future-hook only?** **Yes.** `frame:je-vais-plus-infinitive` is recognition-only with **0 production targets**; §8 marks it 0-ownership; §16 blocks it; the contract row blocks it.
- **Is *aller* too conjugation-table-like?** **No.** One active core (`je vais`, + `on va`); all other persons recognition (§3, §8). No grid is shown.
- **Are `à / au / à la` becoming a hidden preposition lesson?** **Guarded.** They are **supported movement pieces** (`phen:a-contraction-movement`), not a system; `aux`/`de`/full table are deferred (§2, §7). Risk noted — keep them inside frames, don't drill the contraction.
- **Is café creeping back too much?** **No.** Café appears only as recycled/light (`au café`, one contrastive negated line); the world is home/city/next-step.
- **Are place nouns too many?** **No.** Only **2** new (`maison`, `Paris`) + recycled `café`. This is the explicit anti-travel-lesson guard.
- **Is Mon Lexique output consistent with the canonical-ID convention?** ✅ §15 uses `prefix:slug`, ASCII IDs, learner-facing surface kept simple.
- **Any unseen-form risk?** **Low–moderate** — the live risk is a learner (or a future AI) reaching for `je vais + infinitive` production or futur simple. Explicitly blocked in §8/§12/§16; feedback redirects without teaching.

---

## 18. L7 Pilot Findings

**Does the Aller / movement / next-step lesson work after L6?** **Yes — it's the right first new system after the integration beat.** L6 deliberately added almost nothing; L7 adds exactly one engine (movement) on top of well-consolidated foundations, reusing the `je voudrais + infinitive` mechanic L6 promoted. The progression *L6 consolidate → L7 one new engine* feels calibrated, **provided** the active-new count stays at the low end (~8) — authoring confirmed that any more (futur proche production, extra persons, more place nouns) tips it from "a new step" into "a heavy tense lesson."

**Is futur proche safely deferred?** **Yes, and the separation is clean.** Owning the **present-motion** sense (`je vais à + place`) while previewing the **future** sense (`je vais comprendre`) as recognition turns out to be a natural, teachable boundary — the learner meets the same surface (`je vais`) in two roles and only produces one. This is *better* sequencing than L6's original "L7 = je vais + infinitive" plan: it gives the learner an immediately useful, low-risk win (saying where they're going) and leaves the high-value future engine intact.

**Does L7 preserve paid-depth value?** **Yes — deliberately.** The "going to *do* X" engine (futur proche) is the genuinely powerful, high-utility future production, and it is **fully withheld** from this free-zone lesson (0 ownership, recognition hook only). L7 spends only the **movement** slice, which is useful but not the headline future capability. The paywall/promise zone keeps its strongest tense card.

**Should L8 be question expansion, faire, pouvoir, or another integration/review?** **Recommendation: `où` question expansion *or* a second architecture verb (`faire`), not another integration lesson yet.** L7 just opened movement and naturally raises "*where* are you going?" (`où tu vas ?` / `où est-ce que tu vas ?`) — a question-expansion lesson would cash that in immediately and reuse L7's frames. Alternatively `faire` (another high-frequency architecture verb) keeps the verb-engine momentum. A review/integration lesson would be premature (L6 just did one). **Defer futur-proche ownership** to a later, likely paid-zone slot regardless of which comes next.

**Does L7 reveal any required patch to template / archetype / AI contract / ID convention?** Minor, **non-blocking** (propose for review, do **not** auto-apply):
- **Archetype #2 (Architecture Verb)** could gain a note: *"An architecture verb may be opened on a single sense (e.g. aller = movement) while an adjacent high-value sense (futur proche) is held as recognition for a later, possibly paywalled lesson — the active-new count then sits at the low end of the band."* This "split-sense" opening is new vs L2 (which opened être broadly).
- **AI Generation Contract v1 §15** should gain the **L7 row** proposed in §16 (movement allowed; futur proche / past / question-words blocked).
- **ID convention**: introduced `word:a` / `word:au` / `word:a-la` for prepositional movement pieces and `phen:a-contraction-movement`. These fit the existing `word:`/`phen:` prefixes; **no new prefix needed**, but the convention's homograph/preposition note could acknowledge prepositions as `word:` pieces. (`à → a` ASCII rule held.)
- **`je vais + infinitive` as a named recognition frame** (`frame:je-vais-plus-infinitive`) is the first "recognition-only frame" in the spine — worth noting in the template that a frame may carry **recognition** status with **0 fillers** allowed for production.

**Does L7 provide enough material for the AI Generation Contract?** **Yes — it's a strong second fixture after L6.** L6 stressed "don't add a useful word"; L7 stresses **"don't promote a recognised form to production"** (the futur proche temptation) and **"don't turn a verb opening into a travel/preposition lesson."** Both are high-value contract test cases.

---

## 19. Open Decisions

> Unresolved — listed, not silently decided.

- **L8 confirmation** — `où` question expansion vs `faire` (second architecture verb) vs another step.
- **Futur proche ownership slot** — exactly which later (paid-zone) lesson owns `je vais + infinitive` as production, and how it reuses L7's `je vais`.
- **`on va` depth** — active or supported in L7 (this spec: active/support; demote to supported if smoke shows overload).
- **`à / au / à la` handoff** — when the full preposition system (`aux`, `de`, `chez`) gets its own lesson; L7 only borrows the movement pieces.
- **`y` introduction** — when `on y va` / `j'y vais` graduates from recognition to a pronoun lesson.
- **Place-noun budget for movement lessons** — is "2 new place nouns" the right floor/ceiling for a first movement lesson?
- **Archetype #2 "split-sense opening" note** — whether to adopt the §18 patch.
- **AI contract §15 L7 row** — whether to add the proposed allowed/blocked row.

---

*End of L7 Aller / Movement / Next Step pilot spec. Planning canon only — authorizes no code, content, flag, or runtime change. Futur proche ownership is deliberately deferred; this lesson owns movement/next-step direction only. The Dev APK smoke test remains the boundary before any runtime work derived from this spec.*
