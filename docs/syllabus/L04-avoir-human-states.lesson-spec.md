# L4 — Avoir / Human States (Lesson Spec)

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + the L1–L3 pilots.
> Planning/spec document only — authorizes **no** code, content, flag, or runtime change. Locked product canon wins on conflict.

> **PILOT.** First **Avoir-State / Human State** archetype (#4). It tests whether Le Mot can teach how French expresses human states with **avoir** (not être) — driven by *French-specific contrast* — without becoming a generic avoir-conjugation lesson. §17 records the findings.

> **Load note (revised).** L4 was first drafted near the top of its budget; it has since been **deliberately lightened** so the *avoir-state contrast* stays the clear focus. The lesson **owns the contrast, not every useful avoir chunk.** `j'ai envie de` and the third-person paradigm were demoted to recognition; `j'ai peur` is light-active; `je n'ai plus faim` left the sentence family.

> **Archetype**: primary = **Avoir-State / Human State** (#4). Secondary (flavor only, not a second budget): **Architecture-Verb continuation** (#2) + **French-specific contrast / transfer trap** — the contrast layer is *central* here, which is the archetype's signature.

---

## Canon Alignment Note (read first)

Spine is locked: **L0 → L1 → L2 Être → L3 Negation → L4 Avoir (this) → L5 Articles**. L4 realizes the legacy "Avoir" slot under the new engine.

**The contrast was pre-seeded.** L2's carry-out explicitly planned `je suis fatigué` (être-state) → `j'ai faim` (avoir-sensation) → **L4 avoir** (L2 spec §7), and `itemRegistry` already carries `chunk-j-ai` and `micro-je-suis-vs-j-ai` as recognition. **L4 is where that seeded contrast becomes productive** — strong spine validation.

**Anti-overload commitment.** The legacy runtime lesson `lemot-app/data/lessons/lesson4.ts` (read-only) is overloaded: full avoir paradigm with pronunciation, **six** sensation states, **age** (`j'ai vingt ans` — requires untaught numbers), **`il y a`** (a separate existential construction), **three idioms**, and the **French-R** block. This spec constrains L4 to a tight owned core:
- **Owned target**: `j'ai faim`, `j'ai soif`, `j'ai besoin de` + noun, `je n'ai pas faim`. (`j'ai peur` kept as a light active variation.)
- **`j'ai envie de` → recognition / later-supported** — not part of the owned core (keeps the load on need, not want).
- **Third-person & plural avoir (`tu as` / `il a` / `elle a` / `nous avons` / `vous avez` / `ils ont`) → recognition-only** — `j'ai` is the single active core; **no paradigm in active/supported production**.
- **Age deferred** (needs the numbers lesson) and **`il y a` deferred** (its own existential lesson).
- **`besoin de` + noun only**; the **+ infinitive** form deferred.
- **Negation carry-in supported** (`je n'ai pas faim`), **partitive `pas de` deferred to L5**; use `ça`.
- **`ne…plus` recognition/preview only** — L3 owns `ne…pas`; `ne…plus` returns later. Removed from the sentence family so it does not distract from `ne…pas`.

---

## 1. Lesson Identity

| Field | Value |
|---|---|
| **Lesson number** | L4 |
| **Lesson title** | Avoir / Human States |
| **Journey phase** | First Ascent (Core 150) / M1 Basic Communicator (legacy) |
| **Lesson archetype** | primary `avoir-state-human-state` · secondary (flavor) `architecture-verb` + `french-specific-contrast` |
| **Estimated lesson time** | ~5–6 min (lightened) |
| **Monolingual mode / explanation language** | `english-guided` |
| **Practice Pool expansion level** | seeds-only (Build + Stretch; contrast-focused) |
| **Main can-do outcome** | "I can say how I feel and what I need in French — hunger, thirst, a need — using *avoir* the way French does, not a literal translation of *I am*." |
| **Pedagogical reason** | French puts human states on **avoir** where English uses *be*. After être (L2), the learner's instinct is *je suis faim* — the most common error here. L4 builds a small `j'ai + state/need` engine and makes the être↔avoir boundary felt, keeping the lesson narrow so that boundary stays crystal clear. |

---

## 2. Prerequisite Check

| Field | Value |
|---|---|
| **Assumed from L0–L1** | café-order social frame; `je voudrais` (request). |
| **Active carry-in from L2** | `je suis` (the contrast partner: `je suis fatigué` vs `j'ai faim`); `fatigué` (être-state). |
| **Active carry-in from L3** | `ne…pas` (→ `je n'ai pas …`, supported). |
| **Light / ambient carry-in** | `bonjour` / `s'il vous plaît` (open); rescue `je ne comprends pas` / `pouvez-vous répéter`; `c'est bon` / `c'est pas grave` (light). |
| **Required prior grammar / phenomena** | None as systems. `j'ai` met (registry, supported) and être↔avoir contrast seeded (recognition) in L2. |
| **avoir forms — status** | **`j'ai` active.** All other persons (`tu as` / `il a` / `elle a` / `nous avons` / `vous avez` / `ils ont`) → **recognition-only** (no paradigm in production). |
| **Article / partitive pressure** | `j'ai un café` / `j'ai un chien` use `un/une` → **supported preview** of L5. `pas de` (`je n'ai pas de café`) → **deferred to L5**; L4 uses `ça`. |
| **Unseen / deferred** | **age** (`j'ai … ans`) → deferred (numbers). **`il y a`** → deferred (existential lesson). **`besoin de` + infinitive** → deferred. **`j'ai envie de`** → recognition only here. `ne…plus` → recognition/preview. |

---

## 3. Engine Plan

> **One dominant full-cycle engine** (human states with avoir) + one light short-cycle bridge (possession → L5) + negation carry-in. Architecture-verb guardrail applies: `j'ai` is the single active core; **the whole paradigm is recognition**; no conjugation table.

| Engine | Depth | Why it exists |
|---|---|---|
| **A — Human states with avoir** | **full-cycle** | The core. `j'ai + state/need`: `j'ai faim / soif` (+ light `j'ai peur`), `j'ai besoin de …`. Carries the central French-specific contrast (être↔avoir). |
| **B — Avoir + possession / object** | short-cycle (supported) | `j'ai un café / un chien`. A **light** bridge to L5 articles — one or two objects, no article taxonomy. Not a second engine. |
| **C — Negation carry-in** | short-cycle (supported) | `je n'ai pas faim`, `je n'ai pas besoin de ça`. Applies L3's `ne…pas` to avoir. Avoids `pas de` (→ L5). |
| **Ambient — full avoir family · `j'ai envie de` · `ne…plus`** | ambient (recognition) | `tu as`/`il a`/`elle a`/`nous avons`/`vous avez`/`ils ont`, plus `j'ai envie de …` and `je n'ai plus faim`, are *met* but not produced. Prepare later paradigm completion, the want/desire chunk, and the broader-negation lesson. |

**Why this is not a generic avoir conjugation lesson:** only `j'ai` is active; the entire paradigm is recognition; states are taught as **chunks tied to a contrast**, not a verb table; age, `il y a`, idioms, and even `envie de` are deferred or recognition. The spine runs on *meaning* (how French feels), not on conjugation.

---

## 4. Opening Sentence Family

> Scene-flow: **open (recycled) → say a state → express a need → negate a state → contrast être vs avoir → possession preview → recover.** Kept short and contrast-centered.

| Role | Sentence | Note |
|---|---|---|
| **Open + state** | `Bonjour, j'ai faim.` | greet + first avoir state |
| **L1 request carry-in** | `Je voudrais un café, s'il vous plaît.` | known polite request |
| **Express a need** | `J'ai besoin d'un café.` | `besoin de` + noun |
| **State variation** | `J'ai soif.` (+ light `J'ai peur.`) | same frame, new state |
| **Negate a state** | `Je n'ai pas faim.` | `ne…pas` on avoir (supported) |
| **Contrast (key)** | `Je suis fatigué, mais j'ai faim.` | être-state **and** avoir-state side by side |
| **Possession preview** | `J'ai un café.` | `j'ai un` → L5 bridge |
| **Recover (rescue)** | `Je ne comprends pas. Pouvez-vous répéter ?` | recycle |

- **Interchangeable pieces**: `j'ai` + { faim / soif / (peur) }; `j'ai besoin de` + { un café / une baguette }; possession `j'ai un` + { café / chien }.
- **Fixed frames**: `j'ai ___` (state) · `j'ai besoin de ___` · `je n'ai pas ___`.
- **Replaceable slots**: the state noun after `j'ai`; the object after `besoin de`; the possessed object after `j'ai un/une`.
- **Contrast sentence**: `J'ai faim.` (correct) vs `Je suis faim.` (the classic transfer error — *does not exist*).
- **Forbidden / not-yet-ready substitutions**: no avoir paradigm active; no age (`j'ai … ans`); no `il y a`; no `besoin de` + infinitive; no `pas de` partitive (use `ça`); no `j'ai envie de` production (recognition only); no `ne…plus` production; no past/future; never `je suis faim` / `je suis chaud` for sensations.

---

## 5. Item Budget

> Planning targets, not validators. **Deliberately lightened** (see load note): a first avoir-state lesson should prize conceptual clarity over a maxed budget.

| Tier | This lesson | Target band (lightened) | Notes |
|---|---|---|---|
| **Active — new** | **8** | ~8–10 | avoir, j'ai, `frame-j-ai-state`, faim, soif, peur (light), j'ai besoin de, `frame-besoin-de` |
| **Supported — new** | **8** | ~8–10 | je n'ai pas, je n'ai pas faim, je n'ai pas besoin de ça, j'ai un café, j'ai un chien, chien, `frame-jai-possession`, j'ai très faim |
| **Recognition / ambient** | **10** | ~8–12 | j'ai envie de, tu as, il/elle a, nous avons, vous avez, ils ont, je n'ai plus faim (preview), être-vs-avoir contrast, avoir-states insight, j'ai froid/chaud (faux-ami) |
| **Recycled from L1–L3** | **11** | ~10–12 | je voudrais, un café, une baguette, bonjour, s'il vous plaît, je suis, fatigué, ne…pas, je ne comprends pas, pouvez-vous répéter, médecin |
| **Traps (option-only)** | **4** | — | je suis faim; je suis chaud; j'ai fatigué; je n'ai pas placement |
| **Total exposure** | **~37** | ~35–38 | within the lightened band |
| **Production targets** | **6 sentences** | ~5–7 | j'ai faim · j'ai soif · j'ai besoin d'un café · je n'ai pas faim · je suis fatigué mais j'ai faim · j'ai un café |

> Sound/writing tags (`j'` elision, `vous avez` liaison) are tracked in §6.5 and not double-counted in the recognition line above.

> **Budget honesty (preview of §17):** after lightening, L4 sits comfortably mid-band rather than at the top. The owned core is four moves (`faim`, `soif`, `besoin de`, `ne…pas faim`); everything else supports or is recognized. Re-promoting `envie de`, the paradigm, age, or `il y a` would re-overload it and blur the contrast.

---

## 6. Item Tables

> Shared columns: label · canonical ID (placeholder) · learner meaning · status · first-seen/reused · Mon Lexique behavior · review hook · weak-point. IDs reuse `itemRegistry`/prior specs where present (`chunk-j-ai`, `micro-je-suis-vs-j-ai`) and are placeholders otherwise.

### 6.1 Active items (core)

| Label | Canonical ID | Meaning | Status | First seen / reused | Mon Lexique | Review hook | Weak-point |
|---|---|---|---|---|---|---|---|
| avoir | `verb-avoir` | to have (and to feel) | active (new, as verb) | L4 | new | +1d,+7d | avoir-vs-etre |
| j'ai | `chunk-j-ai` | I have / I feel | active (promoted from supported) | registry → L4 | update | +1d | elision, avoir-vs-etre |
| faim | `noun-faim` | hunger | active (new) | L4 | new | +1d,+3d | etre-vs-avoir |
| soif | `noun-soif` | thirst | active (new) | L4 | new | +3d | etre-vs-avoir |
| peur | `noun-peur` | fear | active (light) | L4 | new | +7d | etre-vs-avoir |
| j'ai besoin de | `chunk-jai-besoin-de` | I need | active (new) | L4 | new | +1d,+7d | de-before-noun |

### 6.2 Sentence frames

| Label | Canonical ID | Meaning | Status | Fixed part | Slot(s) | Allowed fillers |
|---|---|---|---|---|---|---|
| state frame | `frame-j-ai-state` | "I feel ___" | active (new) | `j'ai ___` | state noun | faim, soif, (peur) |
| need frame | `frame-besoin-de` | "I need ___" | active (new) | `j'ai besoin de ___` | object noun | un café, une baguette |
| possession | `frame-jai-possession` | "I have a ___" | supported (new) | `j'ai un/une ___` | object | café, chien |

### 6.3 Supported items

| Label | Canonical ID | Meaning | Status | First seen | Mon Lexique | Weak-point |
|---|---|---|---|---|---|---|
| je n'ai pas | `chunk-je-n-ai-pas` | I don't have / don't feel | supported (new, transform) | L4 | update (j'ai) | ne-placement, elision |
| je n'ai pas faim | `chunk-je-n-ai-pas-faim` | I'm not hungry | supported (new) | L4 | new | ne-placement |
| je n'ai pas besoin de ça | `chunk-je-n-ai-pas-besoin-de-ca` | I don't need that | supported (new) | L4 | new | ne-placement |
| j'ai un café | `chunk-jai-un-cafe` | I have a coffee | supported (new, L5 bridge) | L4 | new | articles (→L5) |
| j'ai un chien | `chunk-jai-un-chien` | I have a dog | supported (new, L5 bridge) | L4 | new | articles (→L5) |
| chien | `noun-chien` | dog | supported (new) | L4 | new | gender |
| j'ai très faim | `chunk-jai-tres-faim` | I'm very hungry | supported (new) | L4 | new | — |

### 6.4 Recognition / ambient items

| Label | Canonical ID | Note | Status | Future expansion |
|---|---|---|---|---|
| j'ai envie de | `chunk-jai-envie-de` | I feel like / want | recognition (demoted) | later (supported: want + noun, then + infinitive) |
| tu as | `chunk-tu-as` | you have (informal) | recognition | later paradigm/ question lesson |
| il a / elle a | `chunk-il-elle-a` | he/she has | recognition | later paradigm completion |
| nous avons | `chunk-nous-avons` | we have | recognition | later |
| vous avez | `chunk-vous-avez` | you have (formal/pl) | recognition | later |
| ils ont | `chunk-ils-ont` | they have | recognition | later |
| je n'ai plus faim | `chunk-je-n-ai-plus` | I'm not hungry anymore | recognition (preview) | later negation lesson (`ne…plus`) |
| être-state vs avoir-state | `micro-je-suis-vs-j-ai` | `je suis fatigué` vs `j'ai faim` | recognition (registry; central) | reinforced ongoing |
| feelings are possessions | `grammar-avoir-states` | French *has* hunger, not *is* it | recognition (insight) | — |
| j'ai froid / j'ai chaud | `chunk-jai-froid-chaud` | I'm cold / hot (temperature) | recognition (chaud = faux-ami) | — |

### 6.5 Sound / writing tags

| Label | Canonical ID | Fact | Status |
|---|---|---|---|
| `j'` elision | `sound-elision-j` | `je + ai → j'ai` (same drop as c'est, s'il) | recognition (the 1 major note, §9) |
| `vous avez` liaison | `sound-liaison-avez` | `vou-z-avez` | recognition (minor) |

### 6.6 Trap tags (option text only)

| Label | Canonical ID | Distractor for | Trap reason |
|---|---|---|---|
| je suis faim | `trap-je-suis-faim` | j'ai faim | the classic transfer error — sensations take **avoir**, not être |
| je suis chaud | `trap-je-suis-chaud` | (j'ai chaud, recognition) | `je suis chaud(e)` means something romantic/sexual — temperature uses `j'ai chaud` |
| j'ai fatigué | `trap-jai-fatigue` | je suis fatigué | `fatigué` is an adjective → **être**, not avoir |
| je pas n'ai / je n'ai faim pas | `trap-ne-placement-jai` | je n'ai pas faim | `ne` before, `pas` after the verb: `n'ai pas` |

### 6.7 Cognate / root / sound-bridge items

| Label | Canonical ID | Bridge | Status |
|---|---|---|---|
| (light) | — | no major new cognate; `besoin` learned as a chunk, not via English bridge | — |

### 6.8 Faux ami / culture items

| Label | Canonical ID | Note | Status |
|---|---|---|---|
| j'ai chaud (false friend) | `faux-ami-jai-chaud` | temperature, not "I'm hot/attractive" | recognition |
| states as possessions | `culture-avoir-philosophy` | French *carries* a feeling temporarily; it isn't an identity | recognition |

### 6.9 French-specific contrast / transfer trap

| Label | Canonical ID | Contrast | Status |
|---|---|---|---|
| I am hungry → `j'ai faim` | `contrast-jai-faim` | sensation = **avoir**, not `je suis faim` | recognition→active (Why-This-Works core) |
| I am afraid → `j'ai peur` | `contrast-jai-peur` | fear = avoir | recognition→light active |
| I need → `j'ai besoin de` | `contrast-besoin-de` | no single "need" verb; `avoir besoin de` | active |
| être-state vs avoir-state | `contrast-etre-vs-avoir` | `je suis fatigué` (être) vs `j'ai faim` (avoir) | recognition (central) |
| j'ai chaud vs je suis chaud | `contrast-jai-chaud` | temperature vs romantic | recognition |

> **Demoted / cut / deferred from legacy `lesson4.ts` (flagged §17):** **full avoir paradigm** → `j'ai` active, **all other persons recognition**. **`j'ai envie de`** → recognition (off the owned core). **Age** (`j'ai … ans`) → deferred (numbers). **`il y a`** → deferred (existential lesson). **Idioms** `avoir l'air` / `avoir raison/tort` → cut. **French-R block** → cut. **States trimmed** from six to two active (faim/soif) + one light active (peur) + recognition (froid/chaud).

---

## 7. Continuity Map

| Field | Value |
|---|---|
| **Carry-in from L1** | `je voudrais` (→ `je voudrais un café`, beside `j'ai besoin de`); `bonjour`/`s'il vous plaît`/rescue (light). |
| **Carry-in from L2** | `je suis` (the contrast partner); `fatigué` (être-state); `c'est`/`c'est pas grave` (light). **The être↔avoir contrast was seeded in L2's carry-out.** |
| **Carry-in from L3** | `ne…pas` (→ `je n'ai pas …`). |
| **New items introduced** | avoir + `j'ai`, state nouns (faim/soif/peur), `besoin de`, possession preview, negated avoir. |
| **Carry-out to future** | see transformation plan. |
| **Fade plan** | `j'ai`: recognition (L2) → active (L4) → expected (L5+). être↔avoir contrast: recognition (L2) → active boundary (L4) → assumed (L5+). |
| **Expected-production point** | stating feelings/needs with `j'ai` assumed from L5 onward and in Daily Review. |

**Transformation plan (carry-out):**

| Carried item | Transforms into | Lands in |
|---|---|---|
| `j'ai un café` / `j'ai besoin d'un café` | `un/une/le/la/des` + `pas de …` (partitive) | **L5 articles** |
| `j'ai envie de` (recognition here) | productive want (+ noun, then + infinitive) | later |
| `j'ai` (avoir) | avoir as passé-composé auxiliary (`j'ai mangé`) | later |
| `j'ai …` | age expressions (`j'ai vingt ans`) | **later (after numbers)** |
| `j'ai besoin de` | `avoir besoin de + infinitive` | later |
| `je n'ai pas` | `ne…plus` (`je n'ai plus faim`) and broader negation | later negation lesson |
| (avoir existence) | `il y a` (there is / there are) | later existential lesson |
| avoir paradigm (recognition) | `tu as` / `il a` / … as active production | later |

**Transformation types used (engine §9):** ☑ new verb engine (avoir, one person) · ☑ register/contrast shift (être↔avoir) · ☑ negation (`je n'ai pas`, supported) · ☐ new subject (paradigm recognition only) · ☐ article/gender (preview only → L5) · ☐ tense doorway · ☐ question.

> **Principle check** (engine §8): introduces new (avoir-state engine) ✓ · grows old (être contrast, L3 negation, L1 request) ✓ · prepares future (articles, auxiliary, age, il y a, broader negation, paradigm) ✓. **L4 realizes a contrast L2 deliberately seeded — the spine planned this two lessons ahead.**

---

## 8. Tense / Aspect / Mood Doorway

| Form | Status here | Chunk or grammar system? | Future lesson that expands |
|---|---|---|---|
| **present of avoir** | `j'ai` **active** · all other persons **recognition** | single form — **not a table** | later paradigm completion; later passé composé auxiliary |
| **`besoin de` + noun** | active (chunk + noun) | chunk + slot | later (+ infinitive) |
| **`envie de`** | recognition | chunk only | later (supported: + noun, then + infinitive) |
| **conditionnel** | recognition (still chunk-only via `je voudrais`) | chunk only | vouloir/conditionnel later |
| **negation** (`ne…pas` on avoir) | supported | applied frame | — |
| **`ne…plus`** | recognition (preview) | met, not produced | later negation lesson |

> Explicitly **not** in L4: any past/future system; full avoir paradigm as a table; age/numbers; `il y a`; `besoin de` + infinitive; `envie de` production; `ne…plus` production.

---

## 9. Sound / Writing Pattern

> Guardrail: **1 major + 1 minor** (template §7.6).

- **Major — `j'` elision** (`je + ai → j'ai`). The same vowel-drop the learner already met in `c'est`, `s'il`, `ce n'est`. Load-bearing: every avoir state starts `j'ai …`.
- **Minor — `vous avez` liaison** (`vou-z-avez`), recognition only — recycles L2's `vous-z-êtes` liaison awareness.

The legacy **French-R** block is cut (not load-bearing for the avoir-state core).

---

## 10. French-Specific Contrast / Transfer Trap

> **Central layer of this lesson** (archetype #4 signature) — delivered as micro-contrast / "Why This Works" / Natural Reveal fuel, **not** a grammar lecture.

- **"I am hungry" → `j'ai faim`, not `je suis faim`.** The headline contrast. French *has* hunger.
- **"I am afraid" → `j'ai peur`.** Same pattern, fear (light active).
- **"I need …" → `j'ai besoin de …`.** No single "to need" verb; French uses `avoir besoin de`.
- **être-state vs avoir-state**: `je suis fatigué` (adjective state → être) lives *right next to* `j'ai faim` (sensation noun → avoir). The boundary is the lesson.
- **`j'ai chaud` vs `je suis chaud(e)`**: temperature vs a romantic/charged meaning — the memorable warning that anchors the rule.

---

## 11. Exercise Flow Mapping

| Section | Purpose | Input used | Learner action | Expected output | Feedback style | Offline |
|---|---|---|---|---|---|---|
| **Meet It** | Meet a feeling expressed with avoir | `J'ai faim.` (TTS) | listen, read | recognition | passive mirror | ✓ |
| **Notice the Pieces** | See `j'ai` + state; contrast with `je suis` | `je suis fatigué` / `j'ai faim` highlighted | tap the two verbs | identify the boundary | neutral | ✓ |
| **Why This Works** | French *has* states; "I am hungry" trap | micro-contrast | read | recognition | none (insight) | ✓ |
| **Try It** | Choose avoir vs être (traps) | `J'___ faim.` | choose `ai`; reject `suis` | supported production | reveal + reason | ✓ |
| **Weave It** | Build a state + a need with pieces given | pieces given | assemble `J'ai besoin d'un café.` | supported production | model reveal + alternatives | ✓ |
| **Shape It** | Swap state; negate | `j'ai faim` → `j'ai soif` → `je n'ai pas faim` | transform | active/supported | passive mirror | ✓ |
| **Say It Your Way** | Say how you feel / what you need in a scene | "You arrive tired and hungry — tell the host." | free write/say | active production | model-answer-only (no AI) + natural alternatives | ✓ |
| **Natural Reveal** | Why it's natural; être↔avoir; chaud warning | learner's attempt | read reveal | recognition | natural upgrade + register note | ✓ |
| **Stay With It** | Light retrieval: a state, a need, a contrast | mixed prompts | recall | active/supported | passive mirror | ✓ |
| **Lesson End** | Calm close, name the win | recap card | read | — | passive mirror ("You said how you feel — the French way.") | ✓ |

> No AI in L4 (`model-answer-only`). TTS reads French only; never reads placeholders/options. **No avoir conjugation table shown.**

---

## 12. Natural Reveal / Feedback Plan

**State (primary):**
- **Expected**: `J'ai faim.` / `J'ai soif.` (+ light `J'ai peur.`)
- **Acceptable alternatives**: `J'ai très faim.` (intensifier, supported); unaccented variants.
- **Natural upgrade**: add `très` for intensity.
- **Register note**: neutral; everyday.
- **Common mistakes**: **`je suis faim`** (être+sensation); `j'ai fatigué` (fatigué is être's); `je suis chaud` for temperature.
- **"Take another look" hint**: "In French you don't *be* hungry — you *have* hunger: `j'ai faim`."
- **Weak-point tags**: `etre-vs-avoir`, `elision`.
- **Passive mirror**: "You said how you feel — like a French speaker."

**Need:**
- **Expected**: `J'ai besoin d'un café.`
- **Common mistakes**: dropping `de` (`j'ai besoin un café`); `je suis besoin`. **Hint**: "`besoin` comes with `de`: `j'ai besoin **de** …` (`d'` before a vowel)."
- **Weak-point**: `de-before-noun`.

**Negate a state (supported):**
- **Expected**: `Je n'ai pas faim.`
- **Common mistakes**: `ne…pas` placement; trying `pas de`. **Hint**: "`n'ai pas` hugs the verb; keep the object simple (`ça`) for now."
- **Weak-point**: `ne-placement`.

**Contrast (key):**
- **Expected**: `Je suis fatigué, mais j'ai faim.`
- **Natural upgrade / register note**: notice the two verbs — `suis` for the adjective state, `ai` for the sensation. Both correct, different systems.
- **Passive mirror**: "You used both verbs, each in its place."

**Rescue (recycle):** `Je ne comprends pas. Pouvez-vous répéter ?` — neutral, unchanged.

---

## 13. Practice Pool Seeds

> Seed formats only — no full pool (engine §13).

| Seed type | Examples |
|---|---|
| **Build** | arrange: `J' / ai / faim` ; `J'ai / besoin / d'un / café` |
| **Stretch** | swap the state: "say you're thirsty / afraid / need a coffee" |
| **Challenge** | a short "arrival" scene: state a feeling and one need |
| **Listening traps** | `j'ai` vs `je suis` ; `j'ai faim` vs `je suis faim` ; `j'ai chaud` cue |
| **Repair items** | `je suis faim` → `j'ai faim` ; `j'ai fatigué` → `je suis fatigué` |
| **Transformation items** | `j'ai faim` → `je n'ai pas faim` ; `je suis fatigué` ↔ `j'ai faim` (être/avoir by meaning) |
| **être vs avoir contrast items** | given a feeling, pick être or avoir (fatigué→être; faim/soif/peur→avoir) |
| **Negation placement items** | drag `n'` and `pas` to hug `ai` |

---

## 14. Daily Review Hooks

| Hook | Items |
|---|---|
| **Next-day (+1d)** | j'ai, j'ai faim, j'ai besoin de, je n'ai pas faim |
| **3-day (+3d)** | j'ai soif, être↔avoir contrast, je n'ai pas besoin de ça |
| **7-day (+7d)** | j'ai peur, j'ai un café, `frame-besoin-de` |
| **Old-engine return** | L2 `je suis fatigué` returns *beside* `j'ai faim`; L1 café request beside `j'ai besoin d'un café` |
| **Weave review hook** | "I'm hungry and I need a coffee." (mix known FR + English) reusing j'ai / j'ai besoin de |

> Daily Review draws only from reached lessons; calm offer, never streak/pressure language.

---

## 15. Mon Lexique Output

> Mon Lexique = learner-facing memory of the engine, **not** a separate dictionary (engine §14). Rich metadata internal; learner sees the simple surface. **No matrix codes / IDs shown to the learner.**

| Entry | Learner-facing meaning | Where-used examples | Related pieces | Mastery event | Review hook | Word Graph edge (placeholder) |
|---|---|---|---|---|---|---|
| **avoir** | to have (and to feel) | "J'ai faim. J'ai besoin d'un café." | être (contrast), j'ai | new (verb) | +1d,+7d | verb→{j'ai}; ↔être |
| **j'ai** | I have / I feel | "J'ai faim." | je suis (contrast), j'ai besoin de | promoted to active | +1d | feeling-of→{faim,soif,peur} |
| **faim** | hunger ("I'm hungry") | "J'ai faim." | soif, peur | new | +1d,+3d | avoir-state; not être |
| **soif** | thirst | "J'ai soif." | faim | new | +3d | avoir-state |
| **peur** | fear ("I'm afraid") | "J'ai peur." | faim | new (light) | +7d | avoir-state |
| **j'ai besoin de** | I need | "J'ai besoin d'un café." | je voudrais | new | +1d,+7d | need→object |
| **je n'ai pas** | I don't have / don't feel | "Je n'ai pas faim." | ne…pas, je n'ai plus | new (supported) | +3d | negation of j'ai |
| **je suis** *(updated)* | I am → *now contrasted* with j'ai | "Je suis fatigué, mais j'ai faim." | j'ai (contrast) | updated (boundary) | +3d | être↔avoir boundary |
| **je voudrais** *(updated)* | I would like → *now beside* "I need" | "Je voudrais un café / j'ai besoin d'un café." | j'ai besoin de | updated (link) | +3d | request↔need |
| **(recognition) j'ai envie de / avoir paradigm / il y a / age** | deferred — not yet learner-facing notebook entries | — | — | — | — | reserved for later lessons |

---

## 16. QA Checks

| Check | Verdict |
|---|---|
| Begins with a usable human moment? | ✅ arriving hungry, not a verb table |
| Sentence family, not one sentence? | ✅ 8-sentence scene-flow (§4) |
| Active / supported / recognition separated? | ✅ §5–§6 explicit |
| Every production item prerequisite-safe? | ✅ `j'ai` active; paradigm recognition; objects recycled |
| Unseen forms supported/recognition only? | ✅ whole avoir paradigm + envie de recognition; age + il y a deferred |
| Grows available prior engines? | ✅ leans on L2 (être contrast, seeded), L3 (negation), L1 (request) |
| Avoids too many full-cycle engines? | ✅ **one** full-cycle (avoir-state) |
| ≥ 1 meaningful production moment? | ✅ state + need + negation + contrast |
| Mon Lexique-compatible metadata? | ✅ §15 |
| Practice Pool + Daily Review hooks? | ✅ §13–§14 |
| No streak/XP/reward language? | ✅ passive mirror throughout |
| Le Mot tone preserved? | ✅ calm, neutral, premium |

**Explicit concern flags:**
- **Too many avoir chunks?** No (lightened) — 2 active states + light peur + one need chunk; envie de + froid/chaud recognition. *If an implementer re-promotes envie de or all six states, it overloads.*
- **Too conjugation-table-like?** No — only `j'ai` active; entire paradigm recognition; no table shown.
- **Too much article/partitive pressure?** No — `j'ai un café` is a light preview; `pas de` deferred to L5; `ça` dodges it.
- **Enough L1–L3 continuity?** Strong — L4 *requires* L2's être contrast (pre-seeded), L3's negation, L1's request.
- **`ne…plus` too early?** Recognition/preview only, and removed from the sentence family — L3 owns `ne…pas`.
- **être vs avoir contrast clear but not overexplained?** Yes — one central contrast + one memorable `chaud` warning; the narrower scope makes it clearer than the first draft.
- **Mon Lexique too technical?** No — learner surface simple; mostly new state entries + updates.
- **Unseen-form risk?** Low — every unseen form is recognition; age/il y a deferred, not smuggled in.

---

## 17. L4 Pilot Findings

**Does the Avoir-State / Human State archetype work?** **Yes — and it confirms that French-specific contrast belongs at the *center* of this archetype.** The lesson's spine *is* the être↔avoir boundary; states, need, and negation all hang off "French *has* a feeling." Treating contrast as the core (archetype #4 weighting) produced a coherent lesson; treating avoir as "a verb to conjugate" (the legacy approach) produced a feature-list.

**Was L4 overloaded?** **Originally, yes — it sat near the top of its budget** (10 active / 11 supported / ~43 total, with `envie de`, the third-person forms, and a longer state list all in production). It has been **deliberately lightened**: `envie de` and the whole paradigm moved to recognition, the state list trimmed to faim/soif (+ light peur), and `je n'ai plus faim` left the sentence family. **For the first avoir-state lesson, conceptual clarity matters more than maxing the item budget** — the lesson should **own the avoir-state contrast, not every useful avoir chunk.** Post-lightening it sits ~37 total, mid-band, with a four-move owned core.

**Should `ne…plus` remain deferred or become supported?** **Remain deferred (recognition/preview only), and out of the sentence family.** A second negation pattern would compete with the avoir-contrast focus; L3 explicitly gave `ne…pas` ownership with `ne…plus/jamais/rien` reserved for a later broader-negation lesson.

**Should article/partitive pressure be pushed harder into L5?** **Yes — cleanly.** `j'ai un café` (un/une) is fine as a light possession preview, but `pas de` after negation, `le/la/les/des`, and gender-as-system belong to L5. L4 deliberately uses `ça` to avoid `pas de`. Clean handoff; L5 should own it.

**Does the template or archetype doc need a patch?** **Applied** in this review step:
- **Archetype doc #4 (Avoir-State)** gained an L4 load/sequence guardrail: own the human-state contrast not every avoir chunk; narrow owned core (faim/soif/besoin de/`ne…pas faim`); `peur` light; **`envie de` recognition/deferred**; possession = short L5 bridge; **age deferred** (numbers prerequisite); **`il y a` own doorway**; **`ne…plus` recognition/preview**; **`pas de` → article lesson** (use `ça`); never teach the full avoir paradigm as equal active production. Its item-budget guidance was also lightened (first avoir-state lesson ~35–38, active-new ~8–10).

**Does L4 confirm the global spine + archetype model?** **Yes — most strongly of any pilot so far.** L4 *cashes in a contrast L2 planted two lessons earlier* (`je suis fatigué` → `j'ai faim`, seeded in L2 §7 and in `itemRegistry` as `micro-je-suis-vs-j-ai`). It also requires L3's negation. The spine isn't just sequential — it's *anticipatory*: L2 set up L4 on purpose. The lightening pass also showed the archetype's value working in reverse — the archetype's risk list ("too many avoir chunks") was exactly what to cut.

---

## 18. Open Decisions

> Unresolved — listed, not silently decided.

- **Numbers lesson placement** — age (`j'ai … ans`) is blocked until numbers are taught; where the numbers lesson sits is open (legacy had it at L8).
- **`il y a` lesson** — when the existential `il y a` gets its own (or shared) lesson.
- **`envie de` promotion** — which later lesson promotes want (`envie de` + noun, then + infinitive) from recognition to production.
- **`besoin de` + infinitive** — which later lesson promotes the infinitive form.
- **`ne…plus` promotion** — deferred to the broader-negation lesson; timing open.
- **Partitive ownership** — confirm L5 owns `pas de` / `du`/`de la`/`des`.
- **avoir paradigm completion** — when `tu as` / `il a` / … move from recognition to production.
- **Canonical ID naming convention** — placeholders used here; not locked (inherited).
- ~~Archetype-doc patch~~ — **adopted** this step: archetype doc #4 gained the L4 load/sequence guardrail + lightened budget guidance (Patch A).

---

*End of L4 Avoir / Human States pilot spec. Planning canon only — authorizes no code, content, flag, or runtime change. The Dev APK smoke test remains the boundary before any runtime work.*
