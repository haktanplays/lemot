# L3 — Negation / Yes-No / Tu-Vous (Lesson Spec)

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + the L1/L2 pilots.
> Planning/spec document only — authorizes **no** code, content, flag, or runtime change. Locked product canon wins on conflict.

> **PILOT.** First **Negation / Question / Social Choice** archetype (archetype #3). It tests whether L3 can give conversational *control* (yes / no / soft refusal / tu-vous / simple yes-no questions) **without** becoming a negation-taxonomy + question-formation + register-lecture pile-up. §17 records the findings.

> **Archetype**: primary = **Negation / Question / Social Choice** (#3). Secondary = a **light** Architecture-Verb continuation (#2) — L2's être is transformed through negation/question. The secondary is a *flavor*, not a second budget (archetype doc §12).

---

## Canon Alignment Note (read first)

Spine is locked: **L0 → L1 Survival Kit → L2 Être → L3 (this) → L4 Avoir → L5 Articles**. L3 realizes the legacy "Yes, No & You" slot under the new engine.

**Anti-overload commitment.** The legacy runtime lesson `lemot-app/data/lessons/lesson3.ts` (read-only) is overloaded and partly prerequisite-unsafe: it teaches the **full negation taxonomy** (`ne…pas/jamais/plus/rien`), `oui/non/si`, a **full tu/vous cultural lecture** + `on se tutoie`, the **French-U pronunciation lesson**, intonation questions, a "tu/vous changes every verb" nugget, and uses **unseen verbs** (`manger`, `dormir`, `aimer`) inside its negation examples. This spec deliberately constrains L3 to:
- **`ne…pas` only** as the active negation pattern; `jamais/plus/rien` are **recognition-only**.
- **Negation applied only to verbs the learner already has** (être, je voudrais, the comprendre rescue chunk) — prerequisite-safe.
- **tu/vous on known être forms only** (`tu es` / `vous êtes`); new conjugations (`tu comprends` / `vous comprenez`) are **recognition-only**.
- **yes-no questions by intonation only**; `est-ce que`, question words, and inversion are **recognition-only / deferred**.

> **Pedagogical anchor.** L3 does **not** introduce negation cold. The learner has *already produced two negations as fixed chunks*: `je ne comprends pas` (L1 rescue) and `c'est pas grave` (L2). L3's real move is to **name the pattern they've already been using** and make it productive. That is the calmest possible entry into negation.

---

## 1. Lesson Identity

| Field | Value |
|---|---|
| **Lesson number** | L3 |
| **Lesson title** | Yes, No & You |
| **Journey phase** | First Ascent (Core 150) / M1 Basic Communicator (legacy) |
| **Lesson archetype** | primary `negation-question-social-choice` · secondary (light) `architecture-verb` |
| **Estimated lesson time** | ~6–7 min |
| **Monolingual mode / explanation language** | `english-guided` |
| **Practice Pool expansion level** | seeds-only (Build + Stretch; transformation-heavy) |
| **Main can-do outcome** | "I can say no, say what I'm not, ask a simple yes-no question, choose tu or vous, and refuse politely — basic conversational control." |
| **Pedagogical reason** | After identity (L2), the learner needs *control*: to negate, to ask, and to pick a register. L3 makes the `ne…pas` pattern productive on verbs they already own, turns known statements into yes-no questions by intonation, and frames tu/vous as a social choice — the minimum control set for a real exchange, without opening grammar systems. |

---

## 2. Prerequisite Check

| Field | Value |
|---|---|
| **Assumed from L0** | café-order social frame (ambient). |
| **Active carry-in from L1** | `je voudrais` (→ `je ne voudrais pas ça`); rescue `je ne comprends pas` / `pouvez-vous répéter ?` (already a negation — pattern source). |
| **Active carry-in from L2** | `je suis` (→ `je ne suis pas`); `c'est` (→ `ce n'est pas`); `vous êtes` (→ `vous êtes … ?`); identity/state fillers (étudiant, médecin, prêt, bon). |
| **Light / ambient carry-in** | `bonjour` / `excusez-moi` (open); `c'est pas grave` (L2, already ne-dropped — recognition bridge). |
| **Required prior grammar / phenomena** | None as systems. `ne…pas` met as fixed chunks (L1/L2) → now made productive. |
| **Unseen forms — recognition / support only** | `tu comprends` / `vous comprenez` → **recognition** (new comprendre conjugations, not produced). `est-ce que` → **recognition** (question marker, not produced). `ne…jamais/plus/rien` → **recognition** (broader negation). `si` → **supported** (needs a negative-question context). `tu es` / `tu` → **active** here (was recognition in L2; L3 is where tu becomes a choice). **No inversion at any status.** |

---

## 3. Engine Plan

> **One dominant full-cycle engine** (Negation), plus **two genuinely-light short-cycle engines** (tu/vous, yes-no questions). This is the archetype's known overload risk; it is kept safe **only** because tu/vous rides on already-known être forms and questions are intonation-only — neither carries new grammar (§17 evaluates this directly).

| Engine | Depth | Why it exists |
|---|---|---|
| **A — Negation as control** | **full-cycle** | The lesson's core. `ne … pas` wrapping **known** verbs: `je suis → je ne suis pas`, `c'est → ce n'est pas`, `je voudrais → je ne voudrais pas ça`. Names the pattern behind `je ne comprends pas` / `c'est pas grave`. |
| **B — Tu / Vous as social choice** | short-cycle | Pick a register, don't conjugate a paradigm. Uses **only** known être forms: `tu es ?` / `vous êtes ?`. The *choice* is the content, not new verb forms. |
| **C — Simple yes-no questions** | short-cycle | Turn a known statement into a question by **intonation** (rising tone), and answer with `oui` / `non` / `si`. No word-order change, no question words. |
| **Ambient — broader negation & question markers** | ambient (recognition) | `ne…jamais/plus/rien`, `est-ce que`, `tu comprends/vous comprenez` are *met* (recognized on cards / in audio) but **not** produced. Prepares later negation and question-formation lessons. |

**Why this is not a grammar-taxonomy lesson:** no negation table (only `ne…pas` active), no question-formation system (intonation only), no tu/vous conjugation drill (one known verb), no register essay (one recognition culture note). Everything else is recognition or deferred.

---

## 4. Opening Sentence Family

> Scene-flow: **open (L1) → identify (L2) → say what you're not → ask if someone's ready → choose tu/vous → refuse politely → recover.**

| Role | Sentence | Note |
|---|---|---|
| **Open (L1+L2)** | `Bonjour, je suis étudiant.` | greet + identify, carry-in |
| **Negate identity** | `Je ne suis pas médecin.` | `ne…pas` on known être |
| **Ask (formal)** | `Vous êtes prêt ?` | intonation question, known `vous êtes` |
| **Ask (informal)** | `Tu es prêt ?` | tu/vous social choice, same meaning |
| **Ask (c'est)** | `C'est bon ?` | yes-no on known `c'est` |
| **Negate c'est** | `Ce n'est pas bon.` | `ne→n'` elision before vowel |
| **Refuse politely** | `Je ne voudrais pas ça.` | negated request (uses `ça`, avoids partitive) |
| **Yes-to-negative (contrast)** | `Tu n'es pas étudiant ? — Si.` | `si` contradicts a negative (supported) |
| **Recover (rescue)** | `Je ne comprends pas. Pouvez-vous répéter ?` | recycle; the original known negation |

- **Interchangeable pieces**: `ne` + { suis / voudrais / est } + `pas`; `tu`/`vous` + { es / êtes }; answers { oui / non / si }; refusal object `ça`.
- **Fixed frames**: `ne [verb] pas` · `[statement] ?` (intonation) · `tu/vous [es/êtes] … ?`
- **Replaceable slots**: the verb inside `ne … pas`; the identity/state being negated or questioned; the register pronoun.
- **Contrast sentence**: `Je ne suis pas` (full / written-clear) vs `Je suis pas` (spoken, `ne` dropped) — register, **not** error.
- **Forbidden / not-yet-ready substitutions**: no `ne…jamais/plus/rien` production; no `est-ce que` / question words / inversion; no new tu/vous verb conjugations (`tu comprends` recognition only); no partitive shift (`je ne voudrais pas **de** café` → use `ça`, defer to L5); no past/future; `ne`-drop not a required production.

---

## 5. Item Budget

> Planning targets, not validators. L3 is **transformation-heavy**, so recycled runs high and active-new sits at the low end of its band.

| Tier | This lesson | Target band | Notes |
|---|---|---|---|
| **Active — new** | **10** | ~9–13 | oui, non, ça, tu, `frame-ne-pas`, je ne suis pas, ce n'est pas, je ne voudrais pas ça, tu es, `frame-yesno-intonation` |
| **Supported — new** | **10** | ~10–14 | si, et toi, non merci, `frame-tu-vous-choice`, c'est … ?, tu es … ?, vous êtes … ?, vous êtes prêt ?, ce-n'est-pas↔c'est-pas link, pas du tout |
| **Recognition / ambient** | **11** | ~10–16 | ne…jamais, ne…plus, ne…rien, est-ce que, tu comprends, vous comprenez, ne-drop (spoken), ne→n' elision, French-u, intonation-as-question, tu/vous culture |
| **Recycled from L1/L2** | **11** | ~10–14 | je suis, c'est, je voudrais, vous êtes, je ne comprends pas, pouvez-vous répéter, bonjour, excusez-moi, étudiant, médecin, c'est bon / c'est pas grave |
| **Traps (option-only)** | **3** | — | je suis pas vs je ne suis pas; ne-placement; c'est ne pas |
| **Total exposure** | **~42** | ~35–45 | within band |
| **Production targets** | **6 sentences** | ~5–7 | je ne suis pas médecin · ce n'est pas bon · je ne voudrais pas ça · vous êtes/tu es prêt ? · c'est bon ? + oui/non · (Tu n'es pas… ?) Si |

> **Budget honesty (preview of §17):** all bands hold, but **the per-tier bands sum higher than the total band** — if you maxed active (13) + supported (14) + recognition (16) + recycled (14) you'd hit 57, far over 45. In a transformation-heavy archetype, **recycled is naturally high (~11) and active-new must sit low (~9–10)** to keep the total ≤45. This is a real budget interaction worth noting in the archetype doc (§17).

---

## 6. Item Tables

> Shared columns: label · canonical ID (placeholder) · learner meaning · status · first-seen/reused · Mon Lexique behavior · review hook · weak-point. IDs reuse `itemRegistry`/prior specs where present and are placeholders otherwise (convention not locked).

### 6.1 Active items (core)

| Label | Canonical ID | Meaning | Status | First seen / reused | Mon Lexique | Review hook | Weak-point |
|---|---|---|---|---|---|---|---|
| oui | `chunk-oui` | yes | active (new) | L3 | new | +1d | — |
| non | `chunk-non` | no | active (new) | L3 | new | +1d | — |
| ça | `chunk-ca` | that / it | active (new) | L3 | new | +3d | — |
| tu | `pronoun-tu` | you (informal) | active (promoted from recognition) | L2 → L3 | new | +1d,+3d | register |
| tu es | `chunk-tu-es` | you are (informal) | active (promoted) | L2 → L3 | new | +1d,+3d | register |
| je ne suis pas | `chunk-je-ne-suis-pas` | I am not | active (new, transform) | L3 | update (je suis) | +1d | ne-placement |
| ce n'est pas | `chunk-ce-nest-pas` | it's not / that's not | active (new, transform) | L3 | update (c'est) | +1d,+3d | elision, ne-placement |
| je ne voudrais pas ça | `chunk-je-ne-voudrais-pas-ca` | I wouldn't like that | active (new, transform) | L3 | update (je voudrais) | +3d | ne-placement, partitive(deferred) |

### 6.2 Sentence frames

| Label | Canonical ID | Meaning | Status | Fixed part | Slot(s) | Allowed fillers |
|---|---|---|---|---|---|---|
| negation frame | `frame-ne-pas` | "not [verb]" | active (new) | `ne ___ pas` | known verb | suis, voudrais, (n')est |
| yes-no intonation | `frame-yesno-intonation` | "[statement]?" by tone | active (new) | `[known statement] ?` | known statement | tu es … ?, vous êtes … ?, c'est … ? |
| tu/vous choice | `frame-tu-vous-choice` | pick register | supported (new) | `tu es / vous êtes ___` | register + slot | prêt, étudiant |

### 6.3 Supported items

| Label | Canonical ID | Meaning | Status | First seen | Mon Lexique | Weak-point |
|---|---|---|---|---|---|---|
| si | `chunk-si` | yes (to a negative) | supported (new) | L3 | new | si-vs-oui |
| et toi ? | `chunk-et-toi` | and you? (informal) | supported (new) | L3 | new | register |
| non merci | `chunk-non-merci` | no thank you | supported (new) | L3 | new | — |
| pas du tout | `chunk-pas-du-tout` | not at all | supported (new) | L3 | new | — |
| vous êtes prêt ? | `chunk-vous-etes-pret` | are you ready? (formal) | supported (registry/L2) | L2 → reused | update | liaison |

### 6.4 Recognition / ambient items

| Label | Canonical ID | Note | Status | Future expansion |
|---|---|---|---|---|
| ne…jamais | `chunk-ne-jamais` | never (same sandwich) | recognition | later negation lesson |
| ne…plus | `chunk-ne-plus` | no longer | recognition | later |
| ne…rien | `chunk-ne-rien` | nothing | recognition | later |
| est-ce que | `grammar-est-ce-que` | spoken question marker | recognition | later question lesson |
| tu comprends ? | `chunk-tu-comprends` | do you understand? (informal) | recognition | later (comprendre conj.) |
| vous comprenez ? | `chunk-vous-comprenez` | do you understand? (formal) | recognition | later |
| ne-drop (spoken) | `grammar-ne-drop-spoken` | casual French drops `ne` | recognition | spoken-French focus later |
| intonation = question | `grammar-intonation-question` | rising tone makes a question | recognition→supported | later question-formation |
| tu/vous culture | `culture-tu-vous-choice` | when in doubt, vous | recognition | — |

### 6.5 Sound / writing tags

| Label | Canonical ID | Fact | Status |
|---|---|---|---|
| `ne → n'` before vowel | `sound-elision-ne` | `ne + est → n'est`; `ce n'est pas` | recognition (the 1 major note, §9) |
| French `u` (`tu` /y/ vs `tout` /u/) | `sound-french-u` | rounded-lips /y/ | recognition (minor, §9) |

### 6.6 Trap tags (option text only)

| Label | Canonical ID | Distractor for | Trap reason |
|---|---|---|---|
| je suis pas | `trap-je-suis-pas` | je ne suis pas | spoken drop — natural, but the full form is the safe/clear target (register, not error) |
| je pas suis / je ne pas suis | `trap-ne-placement` | je ne suis pas | `ne` precedes the verb, `pas` follows it |
| c'est ne pas | `trap-cest-ne-pas` | ce n'est pas | negating `c'est` → `ce n'est pas` (elision), not `c'est ne pas` |

### 6.7 Cognate / root / sound-bridge items

| Label | Canonical ID | Bridge | Status |
|---|---|---|---|
| (none new) | — | L3 adds no new cognate bridge; `merci`/`comprendre` bridges carry from L1 | — |

### 6.8 Faux ami / culture items

| Label | Canonical ID | Note | Status |
|---|---|---|---|
| tu (false friend) | `faux-ami-tu` | sounds like "too/two" — means informal "you" | recognition |
| tu/vous register | `culture-tu-vous-choice` | a social decision every time; when unsure, `vous` | recognition |

### 6.9 French-specific contrast / transfer trap

| Label | Canonical ID | Contrast | Status |
|---|---|---|---|
| English "not" vs `ne…pas` | `contrast-not-wrapping` | English puts one word ("not"); French **wraps** the verb (`ne … pas`) | recognition (Why-This-Works fuel) |
| spoken vs full negation | `contrast-ne-drop` | `je suis pas` (spoken) vs `je ne suis pas` (full/clear) | recognition |
| tu/vous ≠ singular/plural | `contrast-tu-vous-social` | it's a **social** choice, not just number | recognition |
| `c'est pas grave` vs `ce n'est pas grave` | `contrast-cest-pas-grave` | spoken short vs full clear form | recognition |
| `si` vs `oui` | `contrast-si-oui` | `si` = yes **to a negative**; English has no one-word equivalent | supported |

> **Demoted / cut from legacy `lesson3.ts` (flagged §17):** `ne…jamais/plus/rien` → recognition (was actively taught). The **full tu/vous cultural lecture** + `on se tutoie` → one recognition culture note (`on se tutoie` ambient). The **French-U pronunciation block** → one minor recognition note. The "tu/vous changes every verb" nugget → **cut** (opens the whole conjugation system; premature). Unseen verbs (`manger`/`dormir`/`aimer`) in negation examples → **replaced** with known verbs (être/voudrais/comprendre).

---

## 7. Continuity Map

| Field | Value |
|---|---|
| **Carry-in from L1** | `bonjour`/`excusez-moi` (light); `je voudrais` → `je ne voudrais pas ça`; `je ne comprends pas` / `pouvez-vous répéter` (rescue, and the pattern source). |
| **Carry-in from L2** | `je suis` → `je ne suis pas`; `c'est` → `ce n'est pas` / `c'est pas`; `vous êtes` → `vous êtes … ?`; `il/elle est` may appear **supported**, not heavy. |
| **New items introduced** | `ne…pas` frame, oui/non/si, tu (as choice), ça, intonation question, et toi, non merci. |
| **Carry-out to future** | see transformation plan. |
| **Fade plan** | `ne…pas`: chunk (L1/L2) → active frame (L3) → expected (L4+). tu/vous choice: supported (L3) → active (L4+). |
| **Expected-production point** | negating known verbs and asking yes-no questions assumed from L4 onward and in Daily Review. |

**Transformation plan (carry-out):**

| Carried item | Transforms into | Lands in |
|---|---|---|
| `ne…pas` frame | `je n'ai pas` ; `je n'ai pas faim` vs `j'ai faim` | **L4 avoir** |
| negation + object | partitive after negation (`pas de café`), article pressure | **L5 articles** |
| yes-no intonation | `est-ce que`, `qu'est-ce que`, `où/comment/pourquoi`, inversion | **later question lesson** |
| `ne…pas` | `ne…jamais/plus/rien` (broader negation) | **later negation lesson** |
| full `ne…pas` | `ne`-drop in casual speech (production) | **later spoken-French focus** |
| tu/vous choice | tu/vous across new verb conjugations | **later (per verb)** |

**Transformation types used (engine §9):** ☑ negation · ☑ question (intonation only) · ☑ register / naturalness shift (tu/vous; ne-drop recognition) · ☑ new subject (tu, supported) · ☐ article/gender (deferred) · ☐ verb chain · ☐ tense doorway.

> **Principle check** (engine §8): introduces new (negation control + register + questions) ✓ · grows old (every L1/L2 engine gets negated/questioned) ✓ · prepares future (avoir negation, articles, question-words) ✓. **Carry-in is unusually strong** — L3 operates almost entirely on prior engines.

---

## 8. Tense / Aspect / Mood Doorway

| Form | Status here | Chunk or grammar system? | Future lesson that expands |
|---|---|---|---|
| **present** | active (remains the only tense) | — | — |
| **negation transformation** | **active** (`ne…pas` on known present verbs) | productive frame, **not** a taxonomy | L4 (avoir negation); later broader negation |
| **question intonation** | supported | melody only, **no** structure | later question-formation |
| **`ne`-drop (spoken)** | recognition | register, not produced | later spoken-French focus |

> Explicitly **not** in L3: any past/future system; `est-ce que`/inversion as active; `ne…jamais/plus/rien` production; new verb conjugations.

---

## 9. Sound / Writing Pattern

> Guardrail: **1 major + 1 minor** (template §7.6).

- **Major — `ne → n'` elision before a vowel.** `ne + est → n'est` → `ce n'est pas`. Same drop the learner already met in `j'ai`, `c'est`, `s'il`. This is the one writing insight L3 genuinely needs (it's load-bearing for negating `c'est`).
- **Minor — French `u` /y/ (`tu` vs `tout`).** Relevant because `tu` arrives as an active choice; a light recognition note (rounded lips, tongue forward), not the full pronunciation lesson the legacy version ran.

No nasal-vowel block, no liaison lecture (vous-êtes liaison simply recycles from L2 as recognition).

---

## 10. French-Specific Contrast / Transfer Trap

> Use as micro-contrast / "Why This Works" / Natural Reveal fuel — **not** a grammar detour (template §7.10).

- **English "not" sits in one place; French `ne…pas` wraps the verb.** The single most useful structural insight here.
- **Spoken French drops `ne`** (`je suis pas`), but L3 teaches the **full form** (`je ne suis pas`) as the safe, clear, written-correct target. The drop is something to *recognize when heard*, not to produce yet.
- **tu/vous is a social decision**, not merely singular/plural — when unsure, `vous`.
- **`c'est pas grave` (natural spoken) vs `ce n'est pas grave` (fuller/clearer)** — the learner already says the short form; L3 reveals the full one behind it.
- **`si` vs `oui`** — `si` answers *yes* to a *negative* question; English has no one-word equivalent.

---

## 11. Exercise Flow Mapping

| Section | Purpose | Input used | Learner action | Expected output | Feedback style | Offline |
|---|---|---|---|---|---|---|
| **Meet It** | Meet "no" + the pattern behind known negations | `Je ne suis pas médecin.` (TTS) | listen, read | recognition | passive mirror | ✓ |
| **Notice the Pieces** | See `ne … pas` wrap the verb | highlighted `je ne comprends pas` (known!) | tap `ne` + `pas` | identify the wrap | neutral | ✓ |
| **Why This Works** | English "not" vs French wrap; `ne→n'` | micro-contrast | read | recognition | none (insight) | ✓ |
| **Try It** | Place `ne…pas` correctly (traps) | `Je ___ suis ___ médecin.` | choose `ne`/`pas`; reject mis-placement | supported production | reveal + reason | ✓ |
| **Weave It** | Build a negation + a yes-no question | pieces given | assemble `Ce n'est pas bon.` / `Vous êtes prêt ?` | supported production | model reveal + alternatives | ✓ |
| **Shape It** | Negate / question known statements; pick tu/vous | `je suis` → `je ne suis pas`; `tu es ?`/`vous êtes ?` | transform | active production | passive mirror | ✓ |
| **Say It Your Way** | Refuse politely / answer in a scene | "Someone asks if you're a doctor — say no, politely." | free write/say | active production | model-answer-only (no AI) + natural alternatives | ✓ |
| **Natural Reveal** | Why it's natural; ne-drop register; si | learner's attempt | read reveal | recognition | natural upgrade + register note | ✓ |
| **Stay With It** | Light retrieval: a no, a question, a register choice | mixed prompts | recall | active/supported | passive mirror | ✓ |
| **Lesson End** | Calm close, name the win | recap card | read | — | passive mirror ("You said no, and you asked.") | ✓ |

> No AI in L3 (`model-answer-only`). TTS reads French only; never reads placeholders/options. **No negation table and no question-formation grid shown.**

---

## 12. Natural Reveal / Feedback Plan

**Negate identity (primary):**
- **Expected**: `Je ne suis pas médecin.`
- **Acceptable alternatives**: `Je suis pas médecin.` (spoken — recognized, gently upgraded); unaccented variants.
- **Natural upgrade**: spoken French often drops `ne`; the full form is clearest while learning.
- **Register note**: full form = clear/safe; dropped = casual.
- **Common mistakes**: `je suis pas` (spoken vs full nuance); **`ne` placement** (`je pas suis`); `c'est ne pas` for `ce n'est pas`.
- **"Take another look" hint**: "`ne` goes **before** the verb, `pas` **after** — they hug it: `ne suis pas`."
- **Weak-point tags**: `ne-placement`, `elision`.
- **Passive mirror**: "You said what you're not — clearly."

**Negate c'est:**
- **Expected**: `Ce n'est pas bon.`
- **Common mistakes**: `c'est ne pas`; forgetting elision. **Hint**: "`ne` meets a vowel (`est`) → `n'`: `ce n'est pas`."
- **Weak-point**: `elision`.

**Yes-no question + register:**
- **Expected**: `Vous êtes prêt ?` / `Tu es prêt ?`
- **Register note**: same question, different relationship — `vous` (formal/unknown), `tu` (friend/peer). When unsure, `vous`.
- **Common mistakes**: using `tu` with a stranger (not wrong, but off-register); trying to change word order. **Hint**: "Just raise your voice at the end — no reshuffling needed."

**Yes-to-negative:**
- **Expected**: `(Tu n'es pas étudiant ?) — Si.`
- **Common mistakes**: answering `oui` to a negative. **Hint**: "When the question is negative and the answer is *yes*, French uses `si`, not `oui`."
- **Weak-point**: `si-vs-oui`.

**Rescue (recycle):** `Je ne comprends pas. Pouvez-vous répéter ?` — neutral, unchanged; now the learner *sees* it was a negation all along.

---

## 13. Practice Pool Seeds

> Seed formats only — no full pool (engine §13).

| Seed type | Examples |
|---|---|
| **Build** | arrange: `Je / ne / suis / pas / médecin` ; `Ce / n'est / pas / bon` |
| **Stretch** | negate a known statement: "say you're not a student / it's not good" |
| **Challenge** | a short refusal scene: answer a yes-no question with a polite no |
| **Listening traps** | `je suis` vs `je suis pas` vs `je ne suis pas` ; `tu` /y/ vs `tout` /u/ ; `oui` vs `si` cue |
| **Repair items** | `ne…pas` placement repair ; `ce n'est pas` elision repair |
| **Transformation items** | `je suis` → `je ne suis pas` ; `c'est bon` → `c'est bon ?` → `ce n'est pas bon` |
| **Tu/vous social-choice items** | given a context (boss / friend), pick `vous êtes ?` or `tu es ?` |
| **Negation-placement items** | drag `ne` and `pas` to hug the verb |

---

## 14. Daily Review Hooks

| Hook | Items |
|---|---|
| **Next-day (+1d)** | non, je ne suis pas, ce n'est pas, oui |
| **3-day (+3d)** | tu es / vous êtes ?, c'est bon ?, je ne voudrais pas ça, si |
| **7-day (+7d)** | tu/vous choice, ne→n' elision, non merci, frame-ne-pas |
| **Old-engine return** | L2 identity returns negated (`je ne suis pas …`); L1 café request returns refused (`je ne voudrais pas ça`) |
| **Weave review hook** | "I don't understand. Are you French? No, I'm American." (mix known FR + English) |

> Daily Review draws only from reached lessons; calm offer, never streak/pressure language.

---

## 15. Mon Lexique Output

> Mon Lexique = learner-facing memory of the engine, **not** a separate dictionary (engine §14). Rich metadata internal; learner sees the simple surface. **No matrix codes / IDs shown to the learner.**

| Entry | Learner-facing meaning | Where-used examples | Related pieces | Mastery event | Review hook | Word Graph edge (placeholder) |
|---|---|---|---|---|---|---|
| **oui** | yes | "C'est bon ? — Oui." | non, si | new | +1d | answer-pair↔non |
| **non** | no | "Tu es médecin ? — Non." | oui, non merci | new | +1d | answer-pair↔oui |
| **ne … pas** | not (wraps the verb) | "Je ne suis pas médecin." | je ne comprends pas, c'est pas grave | new (pattern named) | +1d,+7d | negates→{être, voudrais, c'est} |
| **si** | yes (to a negative) | "Tu n'es pas étudiant ? — Si." | oui, non | new (supported) | +3d | answer-to-negative |
| **tu** | you (informal) | "Tu es prêt ?" | vous, et toi | new | +1d,+3d | register↔vous |
| **vous** *(updated)* | you (formal/plural) → *now* a register choice | "Vous êtes prêt ?" | tu, vous êtes | updated (register role) | +3d | register↔tu |
| **ça** | that / it | "Je ne voudrais pas ça." | je voudrais | new | +3d | object-of→voudrais |
| **je suis** *(updated)* | I am → *now* also negatable | "Je ne suis pas médecin." | je ne suis pas | updated (gains negation) | +1d | negation form |
| **c'est** *(updated)* | it's → *now* also `ce n'est pas` | "Ce n'est pas bon." | ce n'est pas, c'est pas grave | updated (gains negation) | +3d | negation form; elision |
| **je voudrais** *(updated)* | I would like → *now* also refusable | "Je ne voudrais pas ça." | je ne voudrais pas | updated (gains negation) | +3d | negation form |
| **je ne comprends pas / pouvez-vous répéter** *(reused)* | (rescue, from L1) | reused; now seen as a negation | ne…pas | reused → reframed | — | rescue; pattern source |

---

## 16. QA Checks

| Check | Verdict |
|---|---|
| Begins with a usable human moment? | ✅ saying no / asking, not a rule |
| Sentence family, not one sentence? | ✅ 9-sentence scene-flow (§4) |
| Active / supported / recognition separated? | ✅ §5–§6 explicit |
| Every production item prerequisite-safe? | ✅ negation only on known verbs; questions on known statements |
| Unseen forms supported/recognition only? | ✅ tu comprends/vous comprenez, est-ce que, jamais/plus/rien all recognition |
| Grows available prior engines? | ✅ negates/questions **every** L1/L2 engine — strongest carry-in yet |
| Avoids too many full-cycle engines? | ✅ **one** full-cycle (Negation); tu/vous + questions are light short-cycle |
| ≥ 1 meaningful production moment? | ✅ negation + yes-no question + polite refusal |
| Mon Lexique-compatible metadata? | ✅ §15 |
| Practice Pool + Daily Review hooks? | ✅ §13–§14 |
| No streak/XP/reward language? | ✅ passive mirror throughout |
| Le Mot tone preserved? | ✅ calm, neutral, premium |

**Explicit concern flags:**
- **Too many grammar systems?** Avoided by demotion: only `ne…pas` is active; jamais/plus/rien recognition; no question-formation system; no tu/vous conjugation. *If an implementer re-adds the negation taxonomy or est-ce que/inversion, L3 overloads.*
- **Too much social-register explanation?** No — one recognition culture note ("when unsure, vous"); the legacy lecture + `on se tutoie` deep-dive is demoted.
- **Too many question forms?** No — **intonation only**. Question words and inversion are explicitly deferred (§17 recommends a dedicated later lesson).
- **Enough production?** Yes — 6 targets, all transformations of known material.
- **Enough L1/L2 continuity?** **Strongest yet** — L3 is almost entirely carry-in.
- **Too much ne-drop explanation?** No — one recognition note; full form is the taught target.
- **Unseen-form risk?** Low — every unseen form is recognition; negation uses only known verbs.
- **Mon Lexique too technical?** No — learner surface simple; mostly *updates* to existing entries.

---

## 17. L3 Pilot Findings

**Does the Negation / Question / Social Choice archetype work?** **Yes — but it is the archetype most prone to overload, and it only works under strict constraint.** The archetype bundles three things (negation + questions + register) that *each* can become a grammar system. L3 stays safe by making exactly one of them a full engine (negation) and reducing the other two to near-zero new grammar: tu/vous rides on known être forms, questions are intonation-only. The decisive enabler is that **the learner has already produced negations as chunks** (`je ne comprends pas`, `c'est pas grave`) — L3 names a pattern rather than teaching one cold.

**Is L3 overloaded?** **As specified, no — but it sits at the archetype's overload edge** and is the densest pilot so far. The risk is entirely in *scope creep*: add `ne…jamais/plus/rien`, or `est-ce que`/inversion, or `tu comprends`/`vous comprenez` as active, and it tips over immediately (the legacy lesson did all three).

**Should question formation be split into a later lesson?** **Yes — clearly.** L3 should own **only yes-no intonation**. `est-ce que`, `qu'est-ce que`, question words (`où/comment/pourquoi`), and inversion deserve a **dedicated later question-formation lesson** (a Negation/Question archetype instance focused on questions). Forcing them into L3 is the fastest way to break it.

**Are tu/vous and negation safe together?** **Yes, but only because tu/vous is constrained to register-choice on a known verb.** They are *different* skills (polarity vs register) that don't interfere, and both are light when tu/vous adds no new conjugation. If tu/vous were taught as "every verb has two forms" (the legacy nugget), it would collide with negation and overload — so that framing is cut.

**Does the template or archetype doc need a patch?** **Applied** in this review step:
- **Archetype doc #3** gained an L3 pilot guardrail (Patch A): own one dominant target (`ne…pas`); `ne…plus/jamais/rien` recognition-only/deferred; yes-no intonation here, full question formation (est-ce que/question words/inversion) deferred; tu/vous = social choice on known forms, not conjugation expansion; no prerequisite-unsafe verbs; avoid partitive/object-negation overload (use `ça`).
- **Template §6** gained a budget-interaction note (Patch B): transformation-heavy lessons run high on recycled, so active-new sits low; the per-tier bands can't all be maxed at once; total exposure + production quality win.

**L3 → guardrail confirmation (this lesson, explicit):**
- **`ne…pas` is the owned active target.**
- **`ne…plus` / `ne…jamais` / `ne…rien` remain recognition-only / deferred.**
- **Question formation is split:** yes-no **intonation now**; `est-ce que` / question words / inversion **later**.
- **Tu/vous is handled as social choice with known être forms** (`tu es` / `vous êtes`), **not** conjugation expansion.

**Does L3 confirm the global spine + archetype model?** **Yes, strongly.**
- The spine is now load-bearing in both directions: L3 *requires* L1's rescue chunk and L2's être/c'est/voudrais engines to negate and question them. Remove L1/L2 and L3 has nothing to operate on.
- The archetype model proves its worth here: the archetype's *named risks* ("overloading tu/vous + negation + question formation") were exactly the traps to avoid, and following the archetype produced a disciplined lesson instead of the legacy pile-up.

---

## 18. Open Decisions

> Unresolved — listed, not silently decided.

- **Dedicated question-formation lesson** — when `est-ce que` / question words / inversion get their own lesson (recommended split, §17).
- **Broader negation lesson** — when `ne…jamais/plus/rien` move from recognition to production.
- **Partitive after negation** — `pas de café` is deferred to L5 (articles); confirm it lands there.
- **`ne`-drop production** — when (if) casual `ne`-drop becomes a production target vs staying recognition.
- **Canonical ID naming convention** — placeholders used here (`frame-ne-pas`, `chunk-ce-nest-pas`, …); not locked (inherited).
- ~~Archetype-doc patches~~ — **adopted** this step: archetype doc #3 guardrail (Patch A) + template §6 budget-interaction note (Patch B).

---

*End of L3 Negation / Yes-No / Tu-Vous pilot spec. Planning canon only — authorizes no code, content, flag, or runtime change. The Dev APK smoke test remains the boundary before any runtime work.*
