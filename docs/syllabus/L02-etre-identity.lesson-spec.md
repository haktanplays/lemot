# L2 — Être / Identity (Lesson Spec)

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + the L1 pilot (`docs/syllabus/L01-survival-kit.lesson-spec.md`).
> Planning/spec document only — authorizes **no** code, content, flag, or runtime change.
> Locked product canon wins on conflict.

> **PILOT.** First **architecture-verb** lesson in the new spine. It tests whether Le Mot can teach a major verb (**être**) **without becoming a conjugation-table app.** §15 records the findings.

---

## Canon Alignment Note (read first)

The v1 syllabus spine is locked (set in the L1 pilot, Step 3): **L0 onboarding taste → L1 Survival Kit → L2 Être**. This spec realizes **L2 = Être / identity / state / `c'est`**, the first architecture verb.

**Relationship to committed v1 runtime content.** The committed sandbox lesson `content/lessons/v1/lesson-001.ts` ("Je suis", `je suis ici`) holds the `je suis` engine. Under the locked spine that engine belongs at **L2** — this spec is its planning home. L2 **inherits and widens** that engine: from `je suis ici` (one location use) to `je suis` + identity/state, plus `c'est` and other people. **Re-slotting the runtime file (lesson-001 → L2, and a new L1 Survival Kit lesson) is a future content-alignment task after the Dev APK smoke test — NOT done here.** This spec changes no code and no runtime content.

> **Anti-failure-mode commitment.** The legacy runtime lesson `lemot-app/data/lessons/lesson2.ts` ("Être: Who Are You?", read-only) is a **conjugation-table lesson**: it presents the full six-form table, nasal-vowel rules, an `esse`/essence etymology block, and an `é-→s-` sound-pattern table. That is exactly the "grammar-table app" failure mode the engine forbids. This spec deliberately **demotes** the full paradigm: only **`je suis` is active**; `il/elle est` + `vous êtes` are **supported**; `tu es`, `nous sommes`, `ils/elles sont` are **recognition-only**. être is taught as a *usable shape*, not a paradigm to memorize.

---

## 1. Lesson Identity

| Field | Value |
|---|---|
| **Lesson number** | L2 |
| **Lesson title** | Être / Identity |
| **Journey phase** | First Ascent (Core 150) / M1 Basic Communicator (legacy) |
| **Lesson archetype** | `architecture-verb` (one full-cycle engine + reinforcement) |
| **Estimated lesson time** | ~6–7 min |
| **Monolingual mode / explanation language** | `english-guided` |
| **Practice Pool expansion level** | seeds-only (Build + Stretch; no full pool) |
| **Main can-do outcome** | "I can say who or what I am, describe another person simply, and use `c'est` to react to a situation — my first reusable French verb." |
| **Pedagogical reason** | être is the most generative early verb. L2's job is to convert the fixed `je suis` shape (met as a chunk in L0/L1) into a **productive identity/state frame**, add the universal `c'est` pointer, and *recognize* the rest of the paradigm — **without** a conjugation table. Everything downstream (negation, avoir-contrast, passé composé auxiliary) hangs off this verb. |

---

## 2. Prerequisite Check

| Field | Value |
|---|---|
| **Assumed from L0** | café-order social frame (`bonjour`, `s'il vous plaît`). |
| **Active carry-in from L1** | `je suis` (met as fixed chunk `je suis ici` in the committed Je-suis content — now the L2 engine core); `je voudrais` (→ transforms to `je voudrais être …`). |
| **Light / ambient carry-in from L1** | `bonjour` / `excusez-moi` (social doorway, light recycle); `je ne comprends pas` / `pouvez-vous répéter ?` (rescue, light recycle); `un café` (filler for `c'est un café`). |
| **Required prior grammar / phenomena** | None as systems. `je voudrais` known as a chunk; `ne…pas` met (L1) as recognition only. |
| **être forms — recognition / support only** | `tu es` → **recognition** (tu-register is L3, not produced here). `nous sommes`, `ils sont`, `elles sont` → **recognition-only** (full paradigm awareness, no active production). `il est` / `elle est` / `vous êtes` → **supported** (scaffolded, not free). `être` (infinitive) → **supported** via `je voudrais être`. **Only `je suis` is unscaffolded active.** |

---

## 3. Engine Plan

> **One full-cycle engine only** — applying the L1 pilot finding ("for L2–L5, one full-cycle engine each should be the rule"). The `c'est` pointer and the third-person forms are *reinforcement*, not co-equal teaching targets. This is the deliberate guard against the conjugation-table trap.

| Engine | Depth | Why it exists |
|---|---|---|
| **A — Identity with `je suis`** | **full-cycle** | The architecture target. `je suis ___` for identity/state: `je suis étudiant / américain / fatigué`. Grows L1's `je voudrais` into `je voudrais être médecin`. One person-form, fully produced. |
| **B — `c'est` universal pointer** | short-cycle | Hugely frequent fixed-chunk family: `c'est bon / vrai / pas grave / un café`. Produced as chunks (not parsed as `ce + est`), reacting to situations. High utility, low grammar load. |
| **C — Other people with être** | short-cycle | `il est / elle est` + `vous êtes` for describing a third person and the formal-you. Supported, not free — opens the paradigm a crack without drilling it. |
| **Ambient — full être family** | ambient (recognition) | `tu es`, `nous sommes`, `ils/elles sont` are *met* (so the learner recognizes the shape on a card or in audio) but **not** produced. Prepares L3 (tu/vous, negation) and later lessons. |

---

## 4. Opening Sentence Family

> Scene-flow, not a grammar list: **greet (L1) → introduce yourself → say what you'd like to be → describe someone → react with `c'est` → rescue.**

| Role | Sentence | Note |
|---|---|---|
| **Open (L1 recycle)** | `Bonjour, je suis étudiant.` | greet, then introduce — `je suis` for identity |
| **Variation (nationality)** | `Je suis américain.` | same frame, new slot (adjective of identity) |
| **Variation (state)** | `Je suis fatigué.` | same frame, state rather than identity |
| **Carry-in transform** | `Je voudrais être médecin.` | L1's `je voudrais` + infinitive `être` (supported) |
| **Describe (3rd person)** | `Elle est médecin à Paris.` | `elle est` + profession (supported) |
| **Variation (he)** | `Il est étudiant.` | `il est` + identity (supported) |
| **Formal you** | `Vous êtes prêt ?` | `vous êtes` + ready (supported, L1 `vous` register continuity) |
| **`c'est` pointer** | `C'est bon.` | react to a situation |
| **`c'est` variation** | `C'est vrai.` / `C'est pas grave.` | agree / reassure |
| **Rescue (L1 recycle)** | `Je ne comprends pas. Pouvez-vous répéter ?` | breakdown + repair, light recycle |

- **Interchangeable pieces**: `je suis` + { étudiant / américain / fatigué }; `c'est` + { bon / vrai / pas grave / un café }; { il / elle } `est` + { étudiant / médecin }; `vous êtes` + { prêt }.
- **Fixed frames**: `je suis ___.` · `c'est ___.` · `il/elle est ___.` · `vous êtes ___ ?`
- **Replaceable slots**: the identity/state after `je suis`; the reaction after `c'est`; the identity after `il/elle est`.
- **Contrast sentence**: `Je suis médecin.` vs `Je suis un médecin.` — French drops the article with professions (the second is the classic English-speaker error; taught as a *boundary*, not a rule drill).
- **Forbidden / not-yet-ready substitutions**: no full conjugation drill (all six forms produced equally); no active `tu es` (tu/vous split is L3); no negation production `je ne suis pas` (L3 — only `c'est pas grave` met as a fixed chunk); no `j'ai …` avoir contrast as active (L4); no past/future of être; no systematic gender-agreement drilling.

---

## 5. Item Budget

> Planning targets, not validators (engine §7). L2 sits in the architecture-verb band (slightly higher than L1).

| Tier | This lesson | Target band | Notes |
|---|---|---|---|
| **Active — new** | **10** | ~10–14 | `frame-je-suis-slot`, `frame-c-est-slot`, verb-être, étudiant, médecin, américain, fatigué, c'est, c'est bon, c'est vrai/pas grave |
| **Supported — new** | **11** | ~10–14 | il est, elle est, vous êtes, vous êtes prêt, prêt, je voudrais être, être(inf), professeur, content, `frame-il-elle-est-slot`, `frame-vous-etes-slot` |
| **Recognition / ambient** | **13** | ~10–16 | tu es, nous sommes, ils sont, elles sont, no-article-profession, c'est-pointer, être-identity, je-suis-vs-j'ai, silent-est, nasal-sont, vous-liaison, é→s pattern, ne-drop |
| **Recycled from L1** | **8** | ~6–10 | je suis, je voudrais, bonjour, excusez-moi, je ne comprends pas, pouvez-vous répéter, s'il vous plaît, un café |
| **Traps (option-only)** | **3** | — | `je suis un médecin`, `je es`, c'est↔il est confusion |
| **Total exposure** | **~42** | ~35–45 | within band |
| **Production targets** | **6 sentences** | ~5–7 | je suis étudiant/américain/fatigué · je voudrais être médecin · elle est médecin · vous êtes prêt ? · c'est bon/vrai |

> **Budget honesty (preview of §15):** all bands hold comfortably — L2 is **not** overloaded *as specified*, but it would blow the budget instantly if the full paradigm were made active (the legacy lesson's mistake). The discipline that keeps it in band is: **one active person-form**, paradigm-as-recognition, `c'est` as fixed chunks not parsed grammar, and gender agreement *shown* not *drilled*.

---

## 6. Item Tables

> Shared columns: label · canonical ID (placeholder) · learner meaning · status · first-seen/reused · Mon Lexique behavior · review hook · weak-point. IDs reuse `itemRegistry` where present (`verb-etre`, `chunk-je-suis`, `chunk-c-est`, `chunk-vous-etes`, `grammar-etre-identity`, `micro-je-suis-vs-j-ai`, `sound-liaison`, …) and are placeholders otherwise. Convention not locked (§16).

### 6.1 Active items (core)

| Label | Canonical ID | Meaning | Status | First seen / reused | Mon Lexique | Review hook | Weak-point |
|---|---|---|---|---|---|---|---|
| être | `verb-etre` | to be | active (new, as verb) | L2 | new | +1d,+7d | avoir-vs-etre |
| je suis | `chunk-je-suis` | I am | active (recycled→widened) | L0/L1 → reused | update (identity use) | +1d | avoir-vs-etre |
| étudiant(e) | `noun-etudiant` | student | active (new) | L2 | new | +1d,+3d | gender, é→s |
| médecin | `noun-medecin` | doctor | active (new) | L2 | new | +3d | no-article-profession |
| américain(e) | `adj-americain` | American | active (new) | L2 | new | +3d | gender |
| fatigué(e) | `adj-fatigue` | tired | active (new) | L2 | new | +1d,+3d | gender |
| c'est | `chunk-c-est` | it's / that's | active (promoted from supported) | registry → L2 | new | +1d,+7d | elision, c'est-vs-il-est |
| C'est bon. | `chunk-cest-bon` | it's good / I'm fine | active (new) | L2 | new | +1d,+3d | — |
| C'est vrai. | `chunk-cest-vrai` | that's true | active (new) | L2 | new | +3d | — |
| C'est pas grave. | `chunk-cest-pas-grave` | no big deal | active (new) | L2 | new | +3d,+7d | ne-drop (recognition) |

### 6.2 Sentence frames

| Label | Canonical ID | Meaning | Status | Fixed part | Slot(s) | Allowed fillers |
|---|---|---|---|---|---|---|
| identity frame | `frame-je-suis-slot` | "I am ___" | active (new) | `je suis` | identity/state | étudiant, américain, fatigué, médecin |
| pointer frame | `frame-c-est-slot` | "it's ___" | active (new) | `c'est` | adj / noun / situation | bon, vrai, pas grave, un café |
| third-person frame | `frame-il-elle-est-slot` | "he/she is ___" | supported (new) | `il/elle est` | identity/state | étudiant, médecin, professeur |
| formal-you frame | `frame-vous-etes-slot` | "you are ___ ?" | supported (new) | `vous êtes ___ ?` | adj | prêt, fatigué |

### 6.3 Supported items

| Label | Canonical ID | Meaning | Status | First seen | Mon Lexique | Weak-point |
|---|---|---|---|---|---|---|
| il est | `chunk-il-est` | he is | supported (new) | L2 | new | silent-est |
| elle est | `chunk-elle-est` | she is | supported (new) | L2 | new | silent-est |
| vous êtes | `chunk-vous-etes` | you are (formal) | supported (registry) | L2 | new | liaison |
| vous êtes prêt ? | `chunk-vous-etes-pret` | are you ready? | supported (registry) | L2 | new | liaison, politeness |
| être (inf.) | `etre-infinitive` | to be (infinitive) | supported (new) | L2 (via je voudrais être) | update→être | infinitive-chain |
| je voudrais être | `chunk-je-voudrais-etre` | I would like to be | supported (new) | L2 | new (link je voudrais) | infinitive-chain |
| prêt(e) | `adj-pret` | ready | supported (new) | L2 | new | gender |
| professeur | `noun-professeur` | teacher | supported (new) | L2 | new | — |
| content(e) | `adj-content` | happy / content | supported (new) | L2 | new | gender |

### 6.4 Recognition / ambient items

| Label | Canonical ID | Note | Status | Future expansion |
|---|---|---|---|---|
| tu es | `chunk-tu-es` | you are (informal) | recognition | **L3** tu/vous split |
| nous sommes | `chunk-nous-sommes` | we are | recognition | later (full paradigm) |
| ils sont | `chunk-ils-sont` | they are (m) | recognition | later |
| elles sont | `chunk-elles-sont` | they are (f) | recognition | later |
| no article w/ profession | `grammar-no-article-profession` | `je suis médecin`, not *un médecin* | recognition (insight) | **L5** articles |
| c'est = universal pointer | `grammar-cest-pointer` | one chunk for ideas/things/situations | recognition (insight) | later c'est vs il/elle est |
| être = identity/state/location | `grammar-etre-identity` | what être names | recognition (registry) | — |
| je suis vs j'ai | `micro-je-suis-vs-j-ai` | être (state) vs avoir (sensation) | recognition (registry) | **L4** avoir |
| silent est | `sound-silent-est` | `il est` = "eel EH" | recognition | — |
| nasal sont | `sound-nasal-sont` | `sont` = /sɔ̃/, no n/t | recognition | — |
| vous liaison | `sound-liaison` | `vous-z-êtes` (registry; deferred from L1) | recognition | — |
| é- → s- pattern | `sound-e-to-s-pattern` | étudiant↔student, école↔school | recognition | — |
| ne-drop (spoken) | `grammar-ne-drop-spoken` | `c'est pas grave` drops written `ne` | recognition | **L3** negation |

### 6.5 Trap tags (option text only — no production target)

| Label | Canonical ID | Distractor for | Trap reason |
|---|---|---|---|
| je suis un médecin | `trap-je-suis-un-medecin` | `je suis médecin` | French drops the article with professions (identity, not possession) |
| je es | `trap-je-es` | `je suis` | wrong person-form; teaches je↔suis pairing |
| c'est (for a person's job) | `trap-cest-vs-il-est` | `il/elle est médecin` | for a stated profession French prefers `il/elle est`, not `c'est` |

### 6.6 Cognate / root / sound-bridge items (recognition — insight, not backbone)

| Label | Canonical ID | Bridge | Status |
|---|---|---|---|
| étudiant ≈ student | `cognate-etudiant-student` | é- → s- | recognition |
| être ← esse ≈ essence | `etymology-esse-essence` | Latin esse (state of being) | recognition |

### 6.7 Faux ami / culture items (recognition)

| Label | Canonical ID | Note | Status |
|---|---|---|---|
| je suis (false friend) | `faux-ami-je-suis` | sounds like "I sue" — means "I am" (also "I follow") | recognition |
| profession = identity | `culture-profession-no-article` | in French your job *is* you — no article | recognition |
| `c'est pas grave` (register) | `culture-ne-drop` | dropping `ne` is standard spoken French, not slang | recognition |

> **Demoted / cut from legacy `lesson2.ts` (flagged §15):** the **full six-form conjugation table** is demoted to recognition (only `je suis` active). The **etymology block** (absent/présent/essence) is reduced to one recognition bridge. **Nasal-vowel and silent-letter rule blocks** become recognition sound-tags, not taught content. The `é-→s-` sound-pattern table is one recognition item, not a drill.

---

## 7. Continuity Map

| Field | Value |
|---|---|
| **Carry-in from L1** | `je suis` (chunk → identity frame); `je voudrais` (→ `je voudrais être médecin`); social doorway (`bonjour`/`excusez-moi`, light); rescue (`je ne comprends pas`/`pouvez-vous répéter`, light); `un café` (→ `c'est un café`). |
| **Carry-in from foundation (L0)** | café-order social frame (ambient). |
| **New items introduced** | être + paradigm (selective), `frame-je-suis-slot`, `frame-c-est-slot`, c'est family, il/elle est, vous êtes, étudiant/médecin/professeur, américain/fatigué/prêt/content. |
| **Carry-out to next lessons** | see transformation plan. |
| **Fade plan** | `je suis`: chunk (L0/L1) → active frame (L2) → expected (L3+). `c'est`: active chunks (L2) → expected (L3+). il/elle est: supported (L2) → active (L3). |
| **Expected-production point** | `je suis ___` and `c'est ___` assumed unprompted from L3 onward and in Daily Review. |

**Transformation plan (carry-out):**

| Carried item | Transforms into | Lands in |
|---|---|---|
| `je suis` | `je ne suis pas` (negation) ; `tu es ?` / `vous êtes ?` (yes/no, register) | **L3** |
| `je suis fatigué` | `j'ai faim` (être-state vs avoir-sensation contrast) | **L4 avoir** |
| `c'est un café` / `je suis médecin` | article system + profession-article contrast | **L5 articles** |
| `c'est` | `c'est` vs `il est` / `elle est` (pointer vs attribution) | later |
| `je suis` (être) | être as passé-composé auxiliary (`je suis allé`) | later |
| `je suis` (être) | imparfait `j'étais` | later |

**Transformation types used (engine §9):** ☑ same frame / new slot · ☑ new subject (je → il/elle/vous, supported) · ☑ verb chain (`je voudrais être`, supported) · ☑ register shift (vous; c'est spoken ne-drop, recognition) · ☐ negation (recognition seed only) · ☐ question (fixed chunk `vous êtes prêt ?` only) · ☐ article/gender (recognition seed) · ☐ tense doorway (recognition only).

> **Principle check** (engine §8): introduces new (être engine + c'est) ✓ · grows old (L1 `je suis`/`je voudrais` expanded) ✓ · prepares future (negation/avoir/articles/auxiliary seeds) ✓.

---

## 8. Tense / Aspect / Mood Doorway

| Form | Status here | Chunk or grammar system? | Future lesson that expands |
|---|---|---|---|
| **present of être** | `je suis` **active** · `il/elle est`, `vous êtes` **supported** · `tu es`, `nous sommes`, `ils/elles sont` **recognition** | partial system — **not a full table** | L3 (negation/questions of être); later full paradigm |
| **infinitive être** | supported (via `je voudrais être`) | chunk / form only | infinitive constructions (later) |
| **conditionnel** | recognition (still chunk-only via `je voudrais`) | chunk only | vouloir / conditionnel (later) — *not taught as a system in L2* |
| **negation** (`ne…pas`) | recognition (via `c'est pas grave`) | met as fixed chunk | **L3** |
| **passé composé (être auxiliary)** | not present | — | later |
| **imparfait (`j'étais`)** | not present | — | later |

> Explicitly **not** taught in L2: any past/future system, full être conjugation as a memorized table, negation production, tu-register production.

---

## 9. Exercise Flow Mapping

| Section | Purpose | Input used | Learner action | Expected output | Feedback style | Offline |
|---|---|---|---|---|---|---|
| **Meet It** | Meet `je suis` for identity (not just location) | `Bonjour, je suis étudiant.` (TTS) | listen, read | recognition | passive mirror | ✓ |
| **Notice the Pieces** | See `je suis` + slot; meet `c'est` | highlighted family | tap pieces | identify frame + slot | neutral | ✓ |
| **Why This Works** | être names identity/state; `c'est` points | micro-insight (no table) | read | recognition | none (insight) | ✓ |
| **Try It** | Choose the right form (traps) | `Je ___ étudiant.` | choose `suis` over `es`/`est`; reject `un médecin` | supported production | reveal + reason | ✓ |
| **Weave It** | Build an introduction with pieces given | `je suis ___` + filler | assemble `Je suis américain.` | supported production | model reveal + alternatives | ✓ |
| **Shape It** | Swap subject / slot | `je suis` → `elle est`; new identity | produce `Elle est médecin.` (supported) + `je suis fatigué` | active/supported (transform) | passive mirror | ✓ |
| **Say It Your Way** | Free self-introduction in a scene | "You meet someone at a party — say who you are." | free write/say | active production | model-answer-only (no AI in L2) + natural alternatives | ✓ (model-answer-only) |
| **Natural Reveal** | Why it's natural; no-article rule; c'est vs il est | learner's attempt | read reveal | recognition | natural upgrade + register note | ✓ |
| **Stay With It** | Light retrieval: identity + c'est + a described person | mixed prompts | recall | active/supported | passive mirror | ✓ |
| **Lesson End** | Calm close, name the win | recap card | read | — | passive mirror ("You named who you are.") | ✓ |

> No AI in L2 (Say It Your Way is `model-answer-only`, matching L0/L1). TTS reads French only; never reads placeholders or option labels. **No conjugation table is shown at any point** — paradigm awareness is built through recognition cards, not a grid.

---

## 10. Natural Reveal / Feedback Plan

**Self-introduction (primary production):**
- **Expected**: `Je suis étudiant.` / `Je suis américain.`
- **Acceptable alternatives**: `Je suis étudiante` (f); unaccented variants; with greeting `Bonjour, je suis …`.
- **Natural upgrade**: add `Et toi ?` to open a two-way exchange (recognition only).
- **Register note**: profession/nationality take **no article** in French.
- **Common mistakes**: `je suis un médecin` (extra article); `je es` (wrong form); English word order.
- **"Take another look" hint**: "In French you don't say *un* before a job — `je suis médecin`. Your job *is* you here."
- **Weak-point tags**: `no-article-profession`, `avoir-vs-etre`.
- **Passive mirror**: "You introduced yourself the French way."

**Describe another person (supported):**
- **Expected**: `Elle est médecin à Paris.` / `Il est étudiant.`
- **Common mistakes**: using `c'est` for a stated profession; wrong subject-form. **Hint**: "For someone's job, use `il est` / `elle est` — `c'est` points at things and situations."
- **Weak-point**: `c'est-vs-il-est`.

**`c'est` reaction:**
- **Expected**: `C'est bon.` / `C'est vrai.` / `C'est pas grave.`
- **Register note**: spoken French drops `ne` (`c'est pas grave`), and that's standard, not sloppy.
- **Passive mirror**: "You reacted like a local."

**Carry-in transform:**
- **Expected**: `Je voudrais être médecin.`
- **Common mistakes**: `je voudrais médecin` (missing `être`). **Hint**: "Add `être` — *I would like to be* a doctor."
- **Weak-point**: `infinitive-chain`.

**Rescue (recycle):** `Je ne comprends pas. Pouvez-vous répéter ?` — neutral, unchanged from L1.

---

## 11. Practice Pool Seeds

> Seed formats only — no full pool (engine §13).

| Seed type | Examples |
|---|---|
| **Build** | arrange: `Je / suis / étudiant` ; `C'est / pas / grave` ; `Elle / est / médecin` |
| **Stretch** | swap identity/state: "say you're American / tired / a student" |
| **Challenge** | mini self-introduction from a prompt; describe two people (`il est …`, `elle est …`) |
| **Listening traps** | `suis` vs `es` vs `est` (silent-est) ; `sont` (nasal) vs `sommes` ; `c'est` vs `il est` |
| **Repair items** | re-practice `je suis médecin` (no article) ; `je voudrais être …` |
| **Transformation items** | `je suis fatigué` → `elle est fatiguée` (subject + agreement, supported) ; `je voudrais` → `je voudrais être …` |

---

## 12. Daily Review Hooks

| Hook | Items |
|---|---|
| **Next-day (+1d)** | je suis, c'est, c'est bon, étudiant, fatigué |
| **3-day (+3d)** | je suis américain, elle est médecin, c'est vrai, je voudrais être |
| **7-day (+7d)** | il est, vous êtes prêt, c'est pas grave, frame-je-suis-slot |
| **Old-engine return** | L1 café order + greeting resurfaces inside an introduction scene; `je voudrais` returns as `je voudrais être` |
| **Weave review hook** | "I am tired but she is a doctor." (mix known FR + English) reusing je suis/elle est |

> Daily Review draws only from reached lessons; calm offer, never streak/pressure language.

---

## 13. Mon Lexique Output

> Mon Lexique = learner-facing memory of the engine, **not** a separate dictionary (engine §14). Rich metadata internal; learner sees the simple surface. **No matrix codes / IDs shown to the learner.**

| Entry | Learner-facing meaning | Where-used examples | Related pieces | Mastery event | Review hook | Word Graph edge (placeholder) |
|---|---|---|---|---|---|---|
| **être** | to be | "Je suis… / Elle est…" | je suis, c'est, j'ai (contrast) | new (verb) | +1d,+7d | verb→{je suis, il/elle est, vous êtes}; ↔avoir |
| **je suis** | I am | "Je suis étudiant." | je voudrais être, j'ai (contrast) | grew chunk→frame | +1d | identity-of→{étudiant,américain,fatigué} |
| **tu es** *(recognition)* | you are (informal) | — | je suis, vous êtes | recognition | — | person-form→L3 |
| **il est / elle est** | he is / she is | "Elle est médecin." | je suis, c'est (contrast) | new (supported) | +3d | person-form; vs c'est |
| **vous êtes** | you are (formal) | "Vous êtes prêt ?" | vous (L1), liaison | new (supported) | +7d | person-form; liaison |
| **c'est** | it's / that's | "C'est bon. C'est vrai." | il/elle est (contrast) | new | +1d,+7d | pointer→{bon,vrai,pas grave}; vs il est |
| **étudiant / étudiante** | student | "Je suis étudiant." | médecin, professeur | new | +1d,+3d | identity; é→s; gender pair |
| **médecin** | doctor | "Elle est médecin." | étudiant, professeur | new | +3d | identity; no-article |
| **fatigué / fatiguée** | tired | "Je suis fatigué." | content, prêt | new | +1d,+3d | state; gender pair |
| **prêt / prête** | ready | "Vous êtes prêt ?" | fatigué, content | new (supported) | +7d | state; gender pair |
| **vrai** | true | "C'est vrai." | bon | new | +3d | c'est-react |
| **bon** | good / fine | "C'est bon." | vrai | new | +1d,+3d | c'est-react; nasal |
| **je voudrais** *(updated)* | I would like → *now* "I would like to be…" | "Je voudrais être médecin." | je voudrais être, être | updated (links to être) | +3d | request→être(inf) |
| **bonjour / je ne comprends pas / pouvez-vous répéter** *(reused)* | (from L1) | reused as context in L2 scenes | — | reused → strengthened | — | social/rescue continuity |

---

## 14. QA Checks

| Check | Verdict |
|---|---|
| Begins with a usable human moment? | ✅ introduction scene, not a table |
| Sentence family, not one sentence? | ✅ 10-sentence scene-flow (§4) |
| Active / supported / recognition separated? | ✅ §5–§6 explicit |
| Every production item prerequisite-safe? | ✅ only `je suis` active; rest scaffolded/recognized |
| Unseen forms supported/recognition only? | ✅ il/elle est, vous êtes (supported); tu es, nous/ils/elles (recognition) |
| Grows available prior engines? | ✅ grows L1 `je suis` + `je voudrais` (the right L2 expectation: expand the prior engine, plus introduce être) |
| Avoids too many full-cycle engines? | ✅ **one** full-cycle (Identity) — applies the L1 finding |
| ≥ 1 meaningful production moment? | ✅ self-introduction + describe-a-person + c'est reaction |
| Mon Lexique-compatible metadata? | ✅ §13 |
| Practice Pool + Daily Review hooks? | ✅ §11–§12 |
| No streak/XP/reward language? | ✅ passive mirror throughout |
| Le Mot tone preserved? | ✅ calm, neutral, premium |

**Explicit concern flags:**
- **Too grammar-table-like?** **No — this is the whole test, and it passes.** The full paradigm is recognition-only; no table is shown; only `je suis` is active. If a future implementer reintroduces the six-form grid, it violates this spec.
- **Too many être forms?** Controlled: 1 active, 3 supported, 3 recognition. The recognition forms add awareness without production load.
- **Enough production?** Yes — 6 production targets across identity, description, and reaction.
- **Enough L1 continuity?** Strong: `je suis` is *the* carry-in engine; `je voudrais` transforms; social/rescue recycle lightly.
- **`c'est` vs `il est` overloaded?** Risk present. Mitigated by keeping the *contrast* at recognition level (one trap + one reveal hint); full split is deferred. Do not turn this into a sub-lesson.
- **Profession-article issue too early?** Handled as **recognition insight + one trap**, not a drilled rule. It earns a place because it's the #1 English-speaker error at exactly this moment.
- **Gender-agreement overload?** Avoided. Pairs (`fatigué/fatiguée`, `étudiant/étudiante`) are *shown* as recognition; agreement is **not drilled**. Systematic treatment deferred.
- **Mon Lexique too technical?** No — learner surface simple; metadata internal.
- **Unseen-form risk?** Low — every unseen form is recognition/supported.

---

## 15. L2 Pilot Findings

**Does the architecture-verb lesson format work?** **Yes — and this is the important result.** L2 demonstrates that Le Mot can teach its most important verb **without a conjugation table**: keep one person-form active (`je suis`), treat the rest of the paradigm as recognition, teach `c'est` as fixed chunks, and *show* gender agreement rather than drill it. The engine's "moment → pieces → pattern → production → reveal" loop holds for a grammar-heavy target. The legacy `lesson2.ts` (full table, etymology block, nasal-vowel rules) is the counter-example of what to avoid.

**Is the item budget realistic?** **Yes.** All bands held (active 10, supported 11, recognition 13, recycled 8, total ~42). The architecture-verb band (~35–45 total, ~10–14 active) is a good fit — slightly higher than L1, which makes sense (a verb engine genuinely introduces more). No band needed bending.

**Which parts are too heavy?**
- **`c'est` vs `il est/elle est`** is the one place that wants to grow into a full sub-topic. Held at recognition + one trap. Watch it in implementation — if it expands, split it to a later lesson rather than bloating L2.
- **Gender agreement** is latent everywhere (every adjective/noun has a pair). Kept as recognition; if an implementer starts drilling masculine/feminine endings, L2 overloads. Flag preserved.
- **Supported tier (11)** is at the top of its band — mostly the third-person frames and `je voudrais être`. Acceptable, but it's the densest tier.

**Should the template change before L3–L5?** **Applied** in this review step (Patch A/B/C):
- **Architecture-verb guardrail** added to template §4 — *one dominant active production core, not a full paradigm as equal active production; extra forms active only when high-frequency/required, rest supported/recognition; prefer sentence families and micro-contrasts over conjugation tables.* (The earlier draft phrasing "exactly one person-form" was deliberately **softened** to "one dominant active core" so high-frequency chunks aren't wrongly blocked.)
- **Sound/writing guardrail** added to §7.6 — recurring insight layer, 0–1 major + ≤1 minor per normal lesson.
- **French-specific contrast / transfer trap** added as §7.10 — micro-contrast/Natural-Reveal fuel (j'ai faim vs je suis, c'est vs il est, profession article), with the "French explanations win, don't port LearnCraft wholesale" guardrail.

**L2 validates the architecture-verb guardrail.** This lesson is the worked example the guardrail describes: **one dominant active core** (`je suis` identity), the rest of the être paradigm supported/recognition, and the high-load contrasts (`c'est` vs `il/elle est`, gender pairs, profession-article) held deliberately at **recognition / light-trap** treatment rather than expanded into grammar detours.

**Does L2 confirm or challenge the L1/L2 spine decision?** **Confirms it cleanly.**
- `je suis` flows from the committed "Je suis" content (now correctly L2-bound) into L2's identity engine without friction — the re-slot is pedagogically natural, not forced.
- `je voudrais` → `je voudrais être médecin` is a clean, motivated carry-in transform — exactly the kind of "grow something old" the engine wants, and it *requires* L1 to precede L2.
- The L1→L2 order is now load-bearing: L2 assumes L1's `je suis`/`je voudrais`. The spine is sound.

---

## 16. Open Decisions

> Unresolved — listed, not silently decided.

- **`c'est` vs `il/elle est` teaching point** — when the full pointer-vs-attribution split gets its own treatment (kept recognition-only here).
- **Gender-agreement introduction** — which lesson first *teaches* (not just shows) masculine/feminine agreement systematically.
- **être paradigm completion** — when `nous sommes` / `ils sont` move from recognition to production.
- **Canonical ID naming convention** — placeholders used here (`frame-je-suis-slot`, `chunk-cest-bon`, `adj-fatigue`, …); not locked (inherited from engine §17).
- ~~Architecture-verb template note~~ — **adopted** into template §4 (+ §7.6 sound/writing, §7.10 contrast trap) this step.

**Future action (after smoke test — not now):**
- 🔜 **Re-slot committed v1 content** — `content/lessons/v1/lesson-001.ts` ("Je suis") becomes the L2 runtime base and widens to this spec; a new L1 runtime lesson realizes the Survival Kit spec. Runtime/content task, post-smoke. No code change in this step.

---

*End of L2 Être pilot spec. Planning canon only — authorizes no code, content, flag, or runtime change. The Dev APK smoke test remains the boundary before any runtime work.*
