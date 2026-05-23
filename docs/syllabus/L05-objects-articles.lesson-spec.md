# L5 — Objects / Articles / Noun-System (Lesson Spec)

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + the L1–L4 pilots.
> Planning/spec document only — authorizes **no** code, content, flag, or runtime change. Locked product canon wins on conflict.

> **PILOT.** First **Object / Article / Noun-System** archetype (#5). It tests whether Le Mot can make French articles *usable* — inside engines the learner already owns — **without** turning into an article-taxonomy + gender lecture. It also **absorbs the article/object pressure intentionally handed off from L1–L4.** §17 records the findings.

> **Load note (revised — lightened before commit).** L5 was first drafted borderline-heavy. It has been **deliberately lightened** so it **owns object slots with `un`/`une`** and does **not** become an article-taxonomy / partitive-preview / plural / elision / adjective-agreement lesson. Adjective agreement (`bon/bonne`) was **removed from the sentence family**; `l'` elision is recognition-only; plural/partitive stay future-hooks. The first article lesson prioritizes **object-package control over article-system completeness.**

> **Archetype**: primary = **Object / Article / Noun-System** (#5). Secondary (flavor only, not a second budget): **Thematic Vocabulary / Context** (#9) + **French-specific contrast / transfer trap**.

---

## Canon Alignment Note (read first)

Spine is locked: **L0 → L1 → L2 Être → L3 Negation → L4 Avoir → L5 Articles (this)**. L5 realizes the legacy "Le, La, Les" slot under the new engine, and is the **designated landing site for article/object pressure** that L1–L4 deliberately deferred (L4 used `ça` to dodge `pas de`; L4's `j'ai un café` was an explicit L5 preview).

**Anti-overload commitment.** The legacy runtime lesson `lemot-app/data/lessons/lesson5.ts` (read-only) is the most taxonomy-heavy lesson in the set: full definite (`le/la/l'/les`) **and** indefinite (`un/une/des`) systems, a **gender-clue endings table**, **adjective agreement**, an etymology block, a culture essay, the "des is required" nugget, and many **unseen nouns**. This spec constrains L5 to a tight owned core:
- **`un` / `une` active** — the usable indefinite article inside known frames (the owned core, as noun *packages*).
- **`le` / `la` supported** — "the known/specific object," used **only for identification** (`c'est le café` / `c'est la table`). No `… est bon/bonne` (that opens adjective agreement).
- **`les` / `des` / `du` / `de la` / `de l'` recognition-only / future-hook** — never part of the main learning load; deferred to later plural/partitive lessons.
- **Gender taught as a *noun package*** (`un café`, `une baguette`), **not** as a masculine/feminine system. Gender-clue endings → at most **one cognate recognition note** (`-tion → feminine`).
- **Adjective agreement** (`bon/bonne`) → **out of the sentence family**; recognition/preview only, system deferred.
- **Negated object with `de`** (`je n'ai pas de café`) → **supported bridge** (absorbs L4's deferred `pas de`); no partitive taxonomy.
- **`l'` elision** → **recognition-only**, not a taught insight; no elision detour.

---

## 1. Lesson Identity

| Field | Value |
|---|---|
| **Lesson number** | L5 |
| **Lesson title** | Objects / Articles |
| **Journey phase** | First Ascent (Core 150) / M1 Basic Communicator (legacy) |
| **Lesson archetype** | primary `object-article-noun-system` · secondary (flavor) `thematic-vocabulary` + `french-specific-contrast` |
| **Estimated lesson time** | ~5–6 min (lightened) |
| **Monolingual mode / explanation language** | `english-guided` |
| **Practice Pool expansion level** | seeds-only (Build + Stretch; slot-replacement focused) |
| **Main can-do outcome** | "I can ask for and name objects with the right little word in front — `un`/`une` for *a* — and recognize `le`/`la` for *the*, learning each noun together with its article." |
| **Pedagogical reason** | Every L1–L4 engine already produces objects (`je voudrais un café`, `j'ai un café`, `c'est un café`), but the article was always pre-attached. L5 makes the **object slot + its article** the explicit content: pick `un` vs `une`, recognize `le`/`la`, and store gender *as part of the noun*. It closes the article debt the earlier lessons opened — narrowly, without a gender lecture. |

---

## 2. Prerequisite Check

| Field | Value |
|---|---|
| **Active carry-in from L1** | `je voudrais` + object; `un café` / `une baguette` (already met as packages). |
| **Active carry-in from L2** | `c'est` (→ `c'est un/le café`); `c'est bon` (a known fixed chunk — *not* re-opened as adjective agreement). |
| **Active carry-in from L3** | `ne…pas` (→ `je n'ai pas de …`, supported). |
| **Active carry-in from L4** | `j'ai` + object; `j'ai besoin d'un café`; **the article/partitive pressure handed off from L4** (`pas de`). |
| **Light / ambient carry-in** | `bonjour` / `s'il vous plaît` (open); rescue `je ne comprends pas` / `pouvez-vous répéter`. |
| **Required prior grammar / phenomena** | None as systems. `un/une` met inside frames since L0/L1; never isolated as a choice until now. |
| **Article forms — status** | **`un` / `une` active.** `le` / `la` → **supported** (identification only). `les` / `des` / `du` / `de la` / `de l'` → **recognition-only / future-hook**. |
| **Deferred pressure** | Adjective agreement (`bon/bonne`) → recognition/preview, **out of family**. Plurals (`les`/`des`) + partitive (`du`/`de la`) → recognition/deferred. `l'` elision → recognition only. |

---

## 3. Engine Plan

> **One dominant full-cycle engine** (object slot with un/une) + two light short-cycle engines (le/la identification, negated `de` bridge). The lesson runs *inside known frames* (`je voudrais` / `j'ai` / `c'est`); the new content is *only the article choice and one new noun*.

| Engine | Depth | Why it exists |
|---|---|---|
| **A — Object slots with `un` / `une`** | **full-cycle** | The owned core. `[je voudrais / j'ai / c'est] + un/une + noun`. The learner chooses the indefinite article and learns the noun *with its gender* (a package). |
| **B — Known/specific object with `le` / `la`** | short-cycle (supported) | `c'est le café` / `c'est la table` — *identification only*. "The" vs "a." **No `… est bon/bonne`** (keeps adjective agreement out). |
| **C — Negated object with `de`** | short-cycle (supported bridge) | `je n'ai pas de café` / `je n'ai pas de table`. Absorbs the `pas de` L4 deferred. Supported, not owned; no partitive taxonomy. |
| **Ambient — plural / partitive / agreement / elision** | ambient (recognition / future-hook) | `les`/`des`, `du`/`de la`/`de l'`, `l'` elision, `-tion→fem` clue, `bon/bonne` agreement are *met* but not produced or taught. Prepare later plural, partitive, and agreement lessons. |

**Why this is not a full article-taxonomy lesson:** only `un/une` are active; `le/la` are identification-only; everything plural/partitive/elision/agreement is recognition or future-hook; gender is a *package*, not a rule set. The lesson teaches *usable indefinite articles inside known engines*, not the noun system as a topic.

---

## 4. Opening Sentence Family

> Scene-flow: **enter/order (L1) → choose `un`/`une` → say you have one (L4) → identify with `c'est` (L2) → point to a known one (`le`/`la`) → negate possession (`pas de`) → recover.** **No adjective agreement anywhere in the family.**

| Role | Sentence | Note |
|---|---|---|
| **Open + un (masc)** | `Bonjour, je voudrais un café.` | known request, article now the focus |
| **une (fem)** | `Je voudrais une baguette.` | feminine package |
| **j'ai + un** | `J'ai un café.` | L4 possession, now article-aware |
| **j'ai + une** | `J'ai une table.` | new feminine noun |
| **c'est + un (identify)** | `C'est un café.` | L2 `c'est` + indefinite |
| **c'est + une** | `C'est une baguette.` | feminine identification |
| **le (specific, supported)** | `C'est le café.` | "the" (the known one) — identification, no adjective |
| **la (specific, supported)** | `C'est la table.` | feminine "the" |
| **negate object (supported)** | `Je n'ai pas de café.` | `de` after negation (absorbs L4 `pas de`) |
| **recover (rescue)** | `Je ne comprends pas. Pouvez-vous répéter ?` | recycle |

- **Interchangeable pieces**: `un` + { café } · `une` + { baguette / table } · `c'est le/la` + { café / table } · `je n'ai pas de` + { café / table }.
- **Fixed frames**: `[je voudrais / j'ai / c'est] un/une ___` · `c'est le/la ___` · `je n'ai pas de ___`.
- **Replaceable slots**: the object noun; the article (`un/une`, `le/la`); the host verb (recycled).
- **Contrast sentence**: `un café` (m) vs `une baguette` (f) — **gender is part of the noun package**; `un baguette` / `une café` are the errors.
- **Forbidden / not-yet-ready substitutions**: no adjective agreement in the family (`bon/bonne` recognition only); no `des`/`du`/`de la`/`de l'` production; no plural noun production (`les …`); no object pronouns; no gender "rules" lecture; `je n'ai pas **un** café` → `je n'ai pas **de** café` (supported correction).

---

## 5. Item Budget

> Planning targets, not validators. **Deliberately lightened**: L5 owns `un/une` object packages and only lightly supports `le/la` and `pas de`.

| Tier | This lesson | Target band (lightened) | Notes |
|---|---|---|---|
| **Active — new** | **8** | ~7–9 | un, une, `frame-objet-un-une`, `frame-cest-un`, `grammar-noun-package`, noun-table, un café (package), une baguette (package) |
| **Supported — new** | **9** | ~8–10 | le, la, `frame-cest-le-la`, c'est le café, c'est la table, je n'ai pas de, `frame-pas-de`, je n'ai pas de café, je n'ai pas de table |
| **Recognition / ambient** | **8** | ~8–10 | les, des, du/de la/de l' (partitive), l' elision, les liaison, -tion→fem clue, bon/bonne agreement (preview), no-zero-article |
| **Recycled from L1–L4** | **13** | ~12–14 | je voudrais, j'ai, c'est, ne…pas, café, baguette, croissant, bonjour, s'il vous plaît, c'est bon, j'ai besoin de, je ne comprends pas, pouvez-vous répéter |
| **Traps (option-only)** | **4** | — | un baguette; une café; je voudrais café (no article); je n'ai pas un café |
| **Total exposure** | **~38** | ~36–39 | within the lightened band |
| **Production targets** | **6 sentences** | ~5–6 | je voudrais un café · je voudrais une baguette · j'ai une table · c'est un café / c'est une baguette · c'est le café · je n'ai pas de café |

> **Budget honesty (preview of §17):** after lightening, the new load is just two article forms (`un`/`une`), the package idea, and one new noun (`table`); `le/la` and `pas de` are light supports. Recycled stays high (13) because L5 *operates on* four prior engines. `chien` was dropped (an L4 item, not needed here); adjective agreement, plural, partitive, and elision are all kept off the main load.

---

## 6. Item Tables

> Shared columns: label · canonical ID (placeholder) · learner meaning · status · first-seen/reused · Mon Lexique behavior · review hook · weak-point. IDs reuse `itemRegistry`/prior specs where present (`noun-cafe`, `noun-baguette`) and are placeholders otherwise.

### 6.1 Active items (core)

| Label | Canonical ID | Meaning | Status | First seen / reused | Mon Lexique | Review hook | Weak-point |
|---|---|---|---|---|---|---|---|
| un | `article-un` | a (masculine) | active (new) | L5 | new | +1d,+3d | gender |
| une | `article-une` | a (feminine) | active (new) | L5 | new | +1d,+3d | gender |
| un café (package) | `chunk-un-cafe` | a coffee | active (package) | L1 noun → L5 package | package formed | +1d | masc package |
| une baguette (package) | `chunk-une-baguette` | a baguette | active (package) | L1 noun → L5 package | package formed | +3d | fem package |
| table | `noun-table` | table | active (new, f) | L5 | new | +3d | gender |
| noun = gender package | `grammar-noun-package` | learn a noun *with* its article | active (insight) | L5 | — | +7d | gender |

### 6.2 Sentence frames

| Label | Canonical ID | Meaning | Status | Fixed part | Slot(s) | Allowed fillers |
|---|---|---|---|---|---|---|
| object slot (indefinite) | `frame-objet-un-une` | "[verb] a ___" | active (new) | `[je voudrais/j'ai] un/une ___` | article + noun | un café, une baguette, une table |
| identify (indefinite) | `frame-cest-un` | "it's a ___" | active (new) | `c'est un/une ___` | article + noun | un café, une baguette |
| identify (definite) | `frame-cest-le-la` | "it's the ___" | supported (new) | `c'est le/la ___` | article + noun | le café, la table |
| negated object | `frame-pas-de` | "I don't have any ___" | supported (new) | `je n'ai pas de ___` | noun | café, table |

### 6.3 Supported items

| Label | Canonical ID | Meaning | Status | First seen | Mon Lexique | Weak-point |
|---|---|---|---|---|---|---|
| le | `article-le` | the (masculine) | supported (new) | L5 | new | gender, un-vs-le |
| la | `article-la` | the (feminine) | supported (new) | L5 | new | gender, un-vs-le |
| c'est le café | `chunk-cest-le-cafe` | it's the coffee | supported (new) | L5 | new | un-vs-le |
| c'est la table | `chunk-cest-la-table` | it's the table | supported (new) | L5 | new | un-vs-le |
| je n'ai pas de | `chunk-je-n-ai-pas-de` | I don't have any | supported (new, absorbs L4) | L4 handoff → L5 | new | de-after-negation |
| je n'ai pas de café | `chunk-je-n-ai-pas-de-cafe` | I have no coffee | supported (new) | L5 | new | de-after-negation |
| je n'ai pas de table | `chunk-je-n-ai-pas-de-table` | I have no table | supported (new) | L5 | new | de-after-negation |

### 6.4 Recognition / ambient items

| Label | Canonical ID | Note | Status | Future expansion |
|---|---|---|---|---|
| les | `article-les` | the (plural, all genders) | recognition | later plural lesson |
| des | `article-des` | some (plural indefinite) | recognition | later plural lesson |
| du / de la / de l' | `article-partitive` | some (partitive) | recognition (future-hook) | later partitive lesson |
| `l'` elision | `sound-elision-l` | `le/la → l'` before a vowel (`l'eau`) | recognition (not a taught insight) | later |
| `les` liaison | `sound-liaison-les` | `les amis → les-z-amis` | recognition (minor) | later |
| -tion → feminine | `grammar-tion-feminine` | one cognate gender clue (`la nation`) | recognition (not a table) | — |
| adjectives match gender | `grammar-adjective-agreement` | `bon/bonne` — *shown only*, not produced | recognition (preview) | later agreement lesson |
| no zero article | `grammar-no-zero-article` | French keeps an article (`j'ai des amis`) | recognition | later plural lesson |

### 6.5 Sound / writing tags

| Label | Canonical ID | Fact | Status |
|---|---|---|---|
| `l'` elision | `sound-elision-l` | `le/la → l'` before a vowel/silent-h (`l'eau`, `l'école`) | **recognition only** (no major insight in L5) |
| `les` liaison | `sound-liaison-les` | `les amis → les-z-amis` | recognition (minor) |

> **No major sound/writing insight in L5** (template §7.6 allows 0–1; here 0 major). Both items above are light recognition / future hooks, not a taught pronunciation block.

### 6.6 Trap tags (option text only)

| Label | Canonical ID | Distractor for | Trap reason |
|---|---|---|---|
| un baguette | `trap-un-baguette` | une baguette | `baguette` is feminine → `une`; gender is part of the noun |
| une café | `trap-une-cafe` | un café | `café` is masculine → `un` |
| je voudrais café | `trap-no-article` | je voudrais un café | French nouns need an article — no "zero article" |
| je n'ai pas un café | `trap-pas-un-cafe` | je n'ai pas de café | after negation, `un/une` → `de` |

### 6.7 Cognate / root / sound-bridge items

| Label | Canonical ID | Bridge | Status |
|---|---|---|---|
| -tion words (la nation) | `cognate-tion-feminine` | English `-tion` ≈ French `-tion`, almost always feminine | recognition |

### 6.8 Faux ami / culture items

| Label | Canonical ID | Note | Status |
|---|---|---|---|
| gender ≠ male/female | `culture-grammatical-gender` | `la table` isn't "womanly"; learn the package | recognition |

### 6.9 French-specific contrast / transfer trap

| Label | Canonical ID | Contrast | Status |
|---|---|---|---|
| English "a / the" → gendered French | `contrast-gendered-articles` | French picks `un/une` and `le/la` by the noun's gender | recognition→active |
| noun = gender package | `contrast-noun-package` | learn `un café` / `une baguette`, not `café` / `baguette` alone | active (Why-This-Works core) |
| negation changes the article | `contrast-pas-de` | `j'ai un café` → `je n'ai pas **de** café` | supported |
| no zero article | `contrast-no-zero-article` | English drops "some"; French keeps an article | recognition |

> **Demoted / cut / deferred from legacy `lesson5.ts` (flagged §17):** **`des`/`du`/`de la`/`de l'`** → recognition/future-hook (plural + partitive lessons). **Gender-clue endings table** → **one** cognate recognition note (`-tion→fem`). **Adjective agreement** (`bon/bonne`, `petit/petite`) → recognition/preview, **removed from the sentence family**; system deferred. **Etymology block** + **culture essay** → one short recognition note. **`l'` elision** → recognition only (no taught block). **Unseen nouns** (livre, maison, homme, école, enfants, animaux, amis, situation) → **replaced** with known/owned nouns (café, baguette, table). **`il y a` / `c'est la vie` / `librairie` faux-ami** → cut/deferred. **`chien`** dropped (an L4 item, not needed in the lightened family).

---

## 7. Continuity Map

| Field | Value |
|---|---|
| **Carry-in from L1** | `je voudrais` + object; `café`/`baguette`; the polite-request frame. |
| **Carry-in from L2** | `c'est` + object; `c'est bon` (fixed chunk, not re-opened). |
| **Carry-in from L3** | `ne…pas` → supported bridge to `je n'ai pas de …`. |
| **Carry-in from L4** | `j'ai` + object; `j'ai besoin d'un café`; **the article/partitive pressure handed off from L4** (`pas de`, now landed). |
| **New items introduced** | `un`/`une` (active), `le`/`la` (supported, identification), `table` (noun), the noun-package idea, negated `de`. |
| **Carry-out to future** | see transformation plan. |
| **Fade plan** | `un/une`: pre-attached in L1–L4 → active choice (L5) → expected (L6+). `le/la`: supported (L5) → active (later). |
| **Expected-production point** | choosing `un/une` and recognizing `le/la` assumed from L6 onward and in Daily Review. |

**Transformation plan (carry-out):**

| Carried item | Transforms into | Lands in |
|---|---|---|
| `un/une` + noun | plurals `les` / `des` (+ liaison) | later plural lesson |
| `je n'ai pas de` | `du` / `de la` / `de l'` partitive system | later partitive lesson |
| `le café` / `la table` | object pronouns `le` / `la` / `les` | later pronoun lesson (archetype #6) |
| `c'est le café` (+ adjectives) | full adjective agreement (`bon/bonne`, position) | later agreement lesson |
| object nouns | thematic noun clusters (food, home, …) in Mon Lexique | later thematic lessons |
| `l'` elision (recognition) | productive elision awareness | later |

**Transformation types used (engine §9):** ☑ article/gender change (un/une, le/la — the lesson's core) · ☑ same frame / new slot (object slot in known frames) · ☑ negation (`pas de`, supported) · ☐ number change (plural deferred) · ☐ pronoun insertion (deferred) · ☐ tense doorway.

> **Principle check** (engine §8): introduces new (article choice + noun package) ✓ · grows old (every L1–L4 object engine becomes article-aware) ✓ · prepares future (plural, partitive, pronouns, agreement) ✓. **L5 closes the article debt L1–L4 opened — narrowly.**

---

## 8. Tense / Aspect / Mood Doorway

| Form | Status here | Note | Future lesson |
|---|---|---|---|
| **present** | active (unchanged) | the object/article slot is the doorway, not a tense | — |
| **article system** | `un/une` **active** · `le/la` **supported** · `les/des/partitive` **recognition** | the lesson's real "doorway" | later plural + partitive lessons |
| **adjective agreement** | recognition (preview) | `bon/bonne` *shown*, not produced; out of family | later agreement lesson |
| **object pronouns** | not present | `le/la` here are *articles*, not pronouns | later pronoun lesson (#6) |

> Explicitly **not** in L5: any past/future system; full article taxonomy; `des`/partitive production; adjective-agreement production; object pronouns; gender-rule lecture; elision block.

---

## 9. Sound / Writing Pattern

> Guardrail: **0–1 major** (template §7.6). **L5 takes 0 major** — it is an object/article lesson, not a pronunciation lesson.

- **`l'` elision** (`le`/`la` → `l'` before a vowel, `l'eau`) → **recognition only**, a future hook, not a taught insight. It will get proper attention if/when a sound or article-depth lesson needs it.
- **`les` liaison** (`les amis → les-z-amis`) → recognition (minor).

The legacy gender-clue endings table and etymology block are **not** sound/writing content here.

---

## 10. French-Specific Contrast / Transfer Trap

> Delivered as micro-contrast / "Why This Works" / Natural Reveal fuel, **not** a gender lecture (template §7.10).

- **English "a coffee / the coffee" → French chooses *gendered* articles.** `un café` (m) / `une baguette` (f); `le café` / `la table`.
- **A noun comes as a package**: learn `un café` / `une baguette`, not bare `café` / `baguette`. Gender is stored *with* the noun.
- **Negation changes the article**: `j'ai un café` → `je n'ai pas **de** café` (supported — not a full partitive lesson).
- **No zero article**: English drops "some" (`I have friends`); French keeps one (`j'ai des amis`) — recognition.
- **Avoid the "masculine/feminine" lecture**: `la table` isn't womanly; teach usable packages, not a rule set.

---

## 11. Exercise Flow Mapping

| Section | Purpose | Input used | Learner action | Expected output | Feedback style | Offline |
|---|---|---|---|---|---|---|
| **Meet It** | Meet the little word in front of a noun | `un café` / `une baguette` (TTS) | listen, read | recognition | passive mirror | ✓ |
| **Notice the Pieces** | See article + noun as a package | `un café` vs `une baguette` highlighted | tap article + noun | identify the pair | neutral | ✓ |
| **Why This Works** | Gender lives in the noun package; un vs une | micro-contrast | read | recognition | none (insight) | ✓ |
| **Try It** | Choose `un` vs `une` (traps) | `Je voudrais ___ baguette.` | choose `une`; reject `un baguette` | supported production | reveal + reason | ✓ |
| **Weave It** | Build an order/possession with the right article | pieces given | assemble `J'ai une table.` | supported production | model reveal + alternatives | ✓ |
| **Shape It** | Swap object/article; identify with le/la; negate | `un café` → `une baguette` → `c'est le café` → `je n'ai pas de café` | transform | active/supported | passive mirror | ✓ |
| **Say It Your Way** | Order / name objects in a scene | "At a café — order two things with the right words." | free write/say | active production | model-answer-only (no AI) + natural alternatives | ✓ |
| **Natural Reveal** | Why it's natural; un vs le; `de` after negation | learner's attempt | read reveal | recognition | natural upgrade + register note | ✓ |
| **Stay With It** | Light retrieval: a/the, masc/fem, negated object | mixed prompts | recall | active/supported | passive mirror | ✓ |
| **Lesson End** | Calm close, name the win | recap card | read | — | passive mirror ("You picked the right little word.") | ✓ |

> No AI in L5 (`model-answer-only`). TTS reads French only; never reads placeholders/options. **No article-taxonomy grid, no gender-rule table, no adjective-agreement drill.**

---

## 12. Natural Reveal / Feedback Plan

**Object with un/une (primary):**
- **Expected**: `Je voudrais un café.` / `Je voudrais une baguette.` / `J'ai une table.`
- **Acceptable alternatives**: short forms (`un café s'il vous plaît`); unaccented variants.
- **Natural upgrade**: none needed; the package is the point.
- **Register note**: neutral.
- **Common mistakes**: **`un baguette` / `une café`** (wrong gender); **`je voudrais café`** (no article).
- **"Take another look" hint**: "`baguette` is feminine — `une baguette`. French stores the gender *with* the noun."
- **Weak-point tags**: `gender`, `articles`.
- **Passive mirror**: "You picked the right little word for it."

**Definite le/la (supported, identification):**
- **Expected**: `C'est le café.` / `C'est la table.`
- **Common mistakes**: using `le/la` where `un/une` is needed (a vs the). **Hint**: "`un café` = *a* coffee (any one); `le café` = *the* coffee (the known one)."
- **Weak-point**: `un-vs-le`.

**Negated object (supported, absorbs L4):**
- **Expected**: `Je n'ai pas de café.`
- **Common mistakes**: `je n'ai pas un café`. **Hint**: "After a negative, `un/une` becomes `de`: `je n'ai pas **de** café`."
- **Weak-point**: `de-after-negation`.

**Agreement (recognition only, not in family):** if `bon/bonne` ever surfaces (e.g. in audio), the reveal names it lightly — "adjectives shift to match; more on that later" — and never marks it as a production target.

**Rescue (recycle):** `Je ne comprends pas. Pouvez-vous répéter ?` — neutral, unchanged.

---

## 13. Practice Pool Seeds

> Seed formats only — no full pool (engine §13).

| Seed type | Examples |
|---|---|
| **Build** | arrange: `Je / voudrais / une / baguette` ; `C'est / le / café` |
| **Stretch** | swap object + article: "ask for a coffee / a table" |
| **Challenge** | a short café scene: order two things with correct articles |
| **Listening traps** | `un` /œ̃/ vs `une` /yn/ ; `le` vs `les` (silent s) ; `la` vs `l'` |
| **Repair items** | `un baguette` → `une baguette` ; `je n'ai pas un café` → `je n'ai pas de café` |
| **Transformation items** | `un café` → `le café` (a → the) ; `j'ai un café` → `je n'ai pas de café` |
| **Article-slot items** | given a noun, pick `un` or `une` |
| **Negation + object items** | negate a possession with `de` |
| **Object / noun-package items** | match noun to its article package (`un café`, `une table`) |

---

## 14. Daily Review Hooks

| Hook | Items |
|---|---|
| **Next-day (+1d)** | un café, une baguette, un/une choice, c'est le café |
| **3-day (+3d)** | j'ai une table, je n'ai pas de café, le/la identification |
| **7-day (+7d)** | noun-package idea, je n'ai pas de table, `frame-objet-un-une` |
| **Old-engine return** | L1 café order returns article-aware; L4 `j'ai un café` returns + its negation `je n'ai pas de café` |
| **Weave review hook** | "I have a table and I'd like a coffee." (mix known FR + English) reusing j'ai une / je voudrais un |

> Daily Review draws only from reached lessons; calm offer, never streak/pressure language.

---

## 15. Mon Lexique Output

> Mon Lexique = learner-facing memory of the engine, **not** a separate dictionary (engine §14). Rich metadata internal; learner sees the simple surface. **No matrix codes / IDs shown to the learner.** Nouns enter **as packages** (with their article), never as a bare word + a separate "gender: f" field.

| Entry | Learner-facing meaning | Where-used examples | Related pieces | Mastery event | Review hook | Word Graph edge (placeholder) |
|---|---|---|---|---|---|---|
| **un** | a (for some words) | "un café" | une, le | new | +1d,+3d | indefinite-masc; pairs with une |
| **une** | a (for other words) | "une baguette, une table" | un, la | new | +1d,+3d | indefinite-fem; pairs with un |
| **le** | the (for "un" words) | "c'est le café" | la, un | new (supported) | +3d | definite-masc; ↔un |
| **la** | the (for "une" words) | "c'est la table" | le, une | new (supported) | +3d | definite-fem; ↔une |
| **un café** *(package)* | a coffee | "Je voudrais un café." | le café, café | package formed | +1d | object; masc package |
| **une baguette** *(package)* | a baguette | "Je voudrais une baguette." | la baguette | package formed | +3d | object; fem package |
| **une table** *(package)* | a table | "J'ai une table." | la table | new | +3d | object; fem package |
| **je n'ai pas de** | I don't have any | "Je n'ai pas de café." | ne…pas, j'ai | new (supported) | +3d | negation→`de` |
| **je voudrais / j'ai / c'est** *(updated)* | (from L1/L4/L2) → now article-aware | "je voudrais **un** café" | un, une | updated (article slot) | +3d | object-slot frames |
| **(recognition) les / des / du / de la / agreement** | deferred — not yet learner-facing entries | — | — | — | — | reserved for plural/partitive/agreement lessons |

---

## 16. QA Checks

| Check | Verdict |
|---|---|
| Begins with a usable human moment? | ✅ ordering at a café, not an article grid |
| Sentence family, not one sentence? | ✅ 10-sentence scene-flow (§4), no agreement |
| Active / supported / recognition separated? | ✅ §5–§6 explicit |
| Every production item prerequisite-safe? | ✅ runs on known frames + known/owned nouns |
| Unseen forms supported/recognition only? | ✅ les/des/partitive + agreement recognition; le/la supported (identification) |
| Grows available prior engines? | ✅ makes **all four** prior object engines article-aware |
| Avoids too many full-cycle engines? | ✅ **one** full-cycle (object slot) |
| ≥ 1 meaningful production moment? | ✅ choose un/une + identify + negate |
| Mon Lexique-compatible metadata? | ✅ §15 (nouns as packages) |
| Practice Pool + Daily Review hooks? | ✅ §13–§14 |
| No streak/XP/reward language? | ✅ passive mirror throughout |
| Le Mot tone preserved? | ✅ calm, neutral, premium |

**Explicit concern flags:**
- **Too much article taxonomy?** No (lightened) — only `un/une` active, `le/la` identification-only, all plural/partitive recognition/future-hook.
- **Too many object nouns?** No — café/baguette recycled as packages, only `table` new (`chien` dropped).
- **Gender overload?** No — gender is a **package**, not a rule set; endings table = one cognate note.
- **Partitive overload?** No — `pas de` is the only `de` form (supported); `du/de la/de l'` recognition/future-hook.
- **Adjective agreement overload?** No — **out of the sentence family**; `bon/bonne` recognition/preview only; system deferred.
- **Enough L1–L4 continuity?** Strongest carry-in of any pilot — L5 runs on four prior engines.
- **Mon Lexique too technical?** No — nouns stored as plain packages, no gender field exposed.
- **Unseen-form risk?** Low — every unseen article/form is recognition; nouns are known/owned.

---

## 17. L5 Pilot Findings

**Does the Object / Article / Noun-System archetype work?** **Yes — provided the articles are taught *inside known engines*, not as a noun-system survey.** L5 introduces *almost no new frames*: it reuses `je voudrais` / `j'ai` / `c'est` and makes the **article slot** the only new variable. That keeps an inherently taxonomy-prone topic concrete and usable. The legacy lesson is the counter-example — it teaches the article *system* as the subject (the gender-lecture failure mode).

**Was L5 overloaded?** **Originally borderline-heavy — now lightened.** The first draft carried `le café est bon` / `la baguette est bonne` (opening adjective agreement), a fuller article spread, and `chien`. The lightening removed adjective agreement from the family, kept `le/la` to identification only, dropped `chien`, and held plural/partitive/elision as recognition/future-hooks. **The first article/object lesson should not maximize article coverage** — it should **own `un/une` object packages** and only **lightly support `le/la` and `pas de`.** L5 absorbs L4's pressure, but must **not** open plural, partitive, elision, and adjective agreement *at the same time*.

**Which article forms should be active vs supported vs recognition?** Clear recommendation:
- **Active**: `un`, `une` (the usable indefinite choice).
- **Supported**: `le`, `la` (identification: `c'est le/la …`).
- **Recognition / deferred**: `les`, `des`, `du`, `de la`, `de l'`.

**Should `des` / `du` / `de la` / `de l'` move later?** **Yes.** `des` → a later **plural** lesson; `du`/`de la`/`de l'` → a later **partitive** lesson. Teaching them here re-creates the legacy taxonomy and doubles the article load before `un/une` is secure.

**Does L5 successfully absorb L4's article pressure?** **Yes — cleanly.** L4 dodged `pas de` (with `ça`) and previewed `j'ai un café`; L5 lands both: `un café` becomes an *active article choice*, `je n'ai pas de café` a *supported* form. The planned handoff (L4 §17 → L5) worked exactly as designed.

**Does the template or archetype doc need a patch?** Applied in this review step:
- **Archetype doc #5 (Object/Article/Noun-System)** gains a guardrail: first object/article lessons should **not** include adjective agreement, plural, partitive, and elision as concurrent teaching targets (future-hook/recognition only); prioritize **object-package control over article-system completeness**; active `un/une`, supported `le/la`, recognition `les/des/partitive`.

**Does L5 confirm the global spine + archetype model?** **Yes — and it closes the M1 arc.** L5 depends on *all four* prior engines and resolves a debt those lessons intentionally opened. The spine is demonstrably **self-consistent across L1–L5**: each lesson uses its predecessors and sets up its successors, and the deferral handoffs land on schedule. The lightening pass also reaffirmed the archetype's value in reverse — its risk list ("article taxonomy / gender overload") was exactly what to cut.

---

## 18. Open Decisions

> Unresolved — listed, not silently decided.

- **Plural lesson placement** — when `les` / `des` (+ liaison) move from recognition to production.
- **Partitive lesson** — when `du` / `de la` / `de l'` get their own (or shared) lesson.
- **Adjective-agreement lesson** — which lesson first *teaches* (not just shows) `bon/bonne`, position, and agreement as a system.
- **Object-pronoun lesson** — `le`/`la`/`les` as pronouns (archetype #6), distinct from articles.
- **`l'` elision promotion** — when elision becomes a taught insight rather than recognition.
- **Canonical ID naming convention** — placeholders used here; not locked (inherited).
- **End of M1 (L1–L5) review** — whether to run a consolidation/review-archetype lesson before M2.

---

*End of L5 Objects / Articles pilot spec. Planning canon only — authorizes no code, content, flag, or runtime change. The Dev APK smoke test remains the boundary before any runtime work.*
