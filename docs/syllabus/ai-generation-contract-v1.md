# AI Generation Contract v1

> **Purpose**: Define how future in-app AI may generate examples, sentence variations, Practice Pool seeds, Daily Review items, Say It Your Way feedback, and Natural Reveal responses **while staying inside the Le Mot learning spine.** This is a **product/pedagogy constraint contract, not code.** It implements no AI, adds no runtime, changes no schema.

> **Status & scope**: planning/canon only. Consolidates the AI-generation rules already scattered across `docs/learning-engine-v1.md`, `docs/syllabus/lesson-spec-template-v1.1.md`, `docs/syllabus/canonical-item-id-convention-v0.1.md` §9, and `docs/syllabus/L06-foundation-integration-human-context.lesson-spec.md` §16, into one binding contract. Addresses the L1–L5 retrospective §12/§15 action item. Uses the v0.1 canonical-ID convention.

> **One-line stance**: **AI is not the teacher. The learning spine is the teacher. AI is a constrained generator/evaluator that lives *inside* a lesson spec — it may produce variation, never curriculum.**

---

## 1. Purpose

This contract exists to:
- **Protect pedagogy** — the spine (engine + archetype + lesson spec) decides *what* is taught and *when*; AI only fills in *variation* within those bounds.
- **Prevent unseen-grammar leaks** — the most dangerous AI failure is producing *correct French the learner hasn't been taught yet*. Prerequisite-safety overrides validity.
- **Preserve Le Mot tone** — calm, passive-mirror, premium; no gamification, no chatbot coaching.
- **Keep downstream systems aligned** — Mon Lexique, Practice Pool, Daily Review, and Natural Reveal all consume AI output; it must match their canonical IDs and tiers.
- **Prepare future AI implementation without adding runtime now** — this is the contract a future implementation must satisfy; it is not that implementation.

---

## 2. Core Principle

> **AI may generate variation, not curriculum.**
> **AI may recombine known pieces, not invent a new lesson.**
> **AI may explain within the spine, not free-teach outside it.**

The decisive rule, stated once and binding everywhere below:
> **Correct French is not sufficient. If a form, word, or structure is not active/supported/recognition in the current (or a prior) lesson, AI must not produce it — even though it is valid French.** Prerequisite-safety (engine §1, §6) overrides grammatical correctness.

---

## 3. Required Inputs for Any AI Generation

AI must be given (at minimum) this context for every generation/evaluation call. Missing context → AI must refuse or degrade to the safest known item, never guess.

| Input | Meaning |
|---|---|
| `lesson_id` | e.g. `L6` |
| `lesson_title` | e.g. "Foundation Integration / Human Context" |
| `primary_archetype` | e.g. `review-integration` |
| `secondary_archetype` | if any |
| `can_do_outcome` | the lesson's main can-do |
| `active_item_ids` | canonical IDs the learner must actively produce |
| `supported_item_ids` | IDs allowed with hints/options/piece support |
| `recognition_item_ids` | IDs allowed in input/explanation only |
| `recycled_item_ids` | prior IDs assumed available |
| `allowed_frames` | e.g. `frame:j-ai-besoin-de-plus-noun` |
| `allowed_sentence_family` | the lesson's anchor + variations (`sent:` IDs) |
| `forbidden_substitutions` | explicit not-allowed fillers/forms |
| `not_yet_ready` | grammar/forms deferred to later lessons |
| `weak_point_tags` | e.g. `weak:etre-vs-avoir-state` |
| `feedback_mode` | `model-answer-only` / `ai-evaluation` (per lesson) |
| `mon_lexique_entries` | entries this lesson feeds/updates |
| `daily_review_hooks` | scheduled review items |
| `practice_pool_intensity` | Build / Stretch / Challenge |
| `user_answer` | (feedback/eval only) the learner's production |
| `target_meaning` | the intended meaning / situation |

> If `feedback_mode = model-answer-only` (as in L0–L6), **no generative AI runs at all** — feedback is deterministic. AI generation/evaluation applies only where a lesson explicitly enables `ai-evaluation`.

---

## 4. Generation Modes

**A. Example Generation** — additional examples only inside `allowed_frames` + `active`/`supported` items. No new frame, no new word beyond the vocabulary guardrail (§7).

**B. Sentence Family Variation** — swap **approved slots only**; the frame and grammar are fixed. `frame:je-voudrais-plus-noun` may vary the noun (from allowed fillers), not become `frame:je-voudrais-plus-infinitive` unless that frame is allowed.

**C. Practice Pool Seed Generation** — obey intensity (§12):
- **Build** = guided: recognition / fill / micro-contrast.
- **Stretch** = supported production.
- **Challenge** = open/context production, still **inside allowed lesson scope**.

**D. Daily Review Generation** — prioritize **old items** (§13); never introduce new curriculum.

**E. Natural Reveal** — compare meaning, naturalness, grammar, tone, and alternatives **without over-teaching** (§10).

**F. Say It Your Way Feedback** — accept valid natural alternatives, tag weak points, keep feedback scoped to taught material (§11).

**G. Mon Lexique Example Generation** — examples must use the item's known status and where-used history; respect canonical IDs (§14).

---

## 5. Status Boundary Rules

Per the engine §6 ladder; AI must honor the item's status **in the current lesson** (status is lesson-specific — ID convention §6):

| Status | AI may… |
|---|---|
| **active** | require it in production; use it freely in examples |
| **supported** | use it **with hints / options / piece support**; not bare-required |
| **recognition** | place it in **input or explanation only**; **never require its production** |
| **recycled** | expect it **depending on prior mastery / carry-in history** |
| **transformed** | use only when the lesson marks the transformation; **flag it as transformed** |
| **expected** | require **only after explicit carry-forward history** (it graduated in a prior lesson) |

> Example: in L3, `word:tu` is `active`; in L2 it was `recognition` — AI generating an L2 item must treat `tu` as recognition (input/explanation), not require it.

---

## 6. Tense / Aspect / Mood Guardrails

AI must **not** introduce any of these unless the **current lesson spec explicitly allows** it:
- futur proche · passé composé · imparfait · plus-que-parfait · futur simple
- conditionnel **beyond existing chunks** · subjonctif · imperative
- `être en train de` · `venir de`

**L1–L6 concrete state:**
- `je voudrais` is allowed as a **chunk / conditionnel seed** (not a productive conditional).
- `je voudrais comprendre` is allowed in **L6** as a light **infinitive-chain** promotion.
- `aller` / futur proche is **recognition future-hook only** in L6 (`je voudrais aller …`) — never produced.
- **No past or future production before a lesson owns it.** (L7 opens *aller* as **movement / next-step**; **futur proche ownership is deferred** to a later lesson — `je vais + infinitive` stays recognition-only.)

> A generator that emits `j'ai mangé`, `je vais manger`, `quand j'étais…`, or `il faut que…` for an L1–L6 learner has **leaked tense** (§16) — a contract violation regardless of correctness.

---

## 7. Vocabulary Guardrails

- AI may add **0–2 low-risk nouns** only if the lesson spec allows a freshness hook (e.g. integration lessons, archetype #10 §, L6).
- AI **must not vocabulary-dump** — recombine known pieces; don't pile on new words.
- Any new word must be **marked** `active` / `supported` / `recognition` and given a canonical ID.
- **Human-context broadening ≠ thematic word-list expansion.** Moving a scene from café to classroom is allowed; adding ten classroom nouns is not.

---

## 8. Frame Guardrails

AI must prefer **frame-based generation** — fill an allowed frame's slot, don't compose new structures. Allowed frames are lesson-listed; foundation examples:

`frame:je-voudrais-plus-noun` · `frame:je-voudrais-plus-infinitive` · `frame:j-ai-besoin-de-plus-noun` · `frame:je-n-ai-pas-plus-noun` · `frame:c-est-plus-noun` · `frame:un-une-plus-noun` · `frame:je-suis-plus-state` · `frame:je-ne-suis-pas-plus-state`

> AI **must not create unsupported frames just because they are natural.** "`il faut + infinitive`" is natural French and **forbidden** until a lesson owns it.

---

## 9. Trap and Weak-Point Rules

AI should generate distractors from the lesson's **trap IDs** and target repair at its **weak-point tags**:

Trap examples: `trap:je-suis-faim` · `trap:je-voudrais-medecin` · `trap:un-baguette` · `trap:je-n-ai-pas-un-cafe` · `trap:je-suis-besoin` · `trap:je-voudrais-comprends`

Weak-point tags: `weak:negation-placement` · `weak:article-choice` · `weak:infinitive-after-voudrais` · `weak:etre-vs-avoir-state` · `weak:tu-vous-register`

> Traps must be **plausible learner errors**, not exotic wrong forms. A distractor should come from the lesson's own trap set or a documented transfer error — never a random unseen form.

---

## 10. Natural Reveal Contract

Feedback structure (in order, all short):
1. **meaning check** — did the learner's meaning land?
2. **target answer** — the model form.
3. **acceptable alternatives** — valid variants within taught material.
4. **natural upgrade** — a more natural version, offered without scolding.
5. **register note** — only if relevant.
6. **one small why** — a single clause, not a lecture.
7. **weak-point tag** — what a miss tags.
8. **next try / "Take another look" hint** — neutral retry.

Guardrails:
- **No long grammar lecture.** One "why," then stop.
- **No shame.** Mistakes are mirrored, never punished.
- **No reward tone** — no "great job / amazing / perfect / streak."
- **No overcorrection beyond the current lesson** — don't fix things the lesson hasn't taught.
- **Do not introduce several new forms in feedback** — feedback is not a mini-lesson.

---

## 11. Say It Your Way Contract

- AI must evaluate **intention**, not match one fixed answer.
- AI **may accept the learner's alternative** if it fits taught material.
- AI **may offer a more natural version** (as an upgrade, not a correction).
- AI must **tag the issue type**: `meaning` / `grammar` / `word-choice` / `register` / `unseen-form-request`.
- AI must **not turn Say It Your Way into a generic chatbot conversation** — it stays a scoped production-and-mirror moment, not open dialogue.

> If the learner reaches for an **unseen form** (e.g. tries a past tense), AI tags `unseen-form-request` and gently redirects to taught material — it does **not** teach the unseen form on the spot.

---

## 12. Practice Pool Contract

| Intensity | AI may generate |
|---|---|
| **Build** | guided items — arrange/fill/recognition/micro-contrast from known pieces |
| **Stretch** | supported production — a frame slot-swap or a small transformation, with scaffolding |
| **Challenge** | context-open production — a short scene/prompt, **still lesson-scoped** |

Rules:
- Build stays guided.
- Stretch can **require** supported production.
- Challenge can be context-open but **lesson-scoped**.
- **Challenge cannot introduce new curriculum** (new grammar/tense/vocabulary) **without explicit lesson permission.**

---

## 13. Daily Review Contract

- AI-generated review uses **mostly old items** (from reached lessons).
- **No new material** appears in Daily Review.
- Review may **transform known items only within approved carry-forward** (engine §8/§9).
- Daily Review must **not feel like a test or a reward loop** — calm offer of retrieval, never streak/score language; draws only from lessons the learner has reached.

---

## 14. Mon Lexique Contract

- AI examples must **update or use Mon Lexique-compatible entries** (engine §14).
- AI **must not create orphan vocabulary** — every word it produces maps to an existing entry or a deliberately-added one with a canonical ID.
- AI must **respect canonical IDs** (`prefix:slug`, ID convention v0.1).
- **Learner-facing Mon Lexique stays simple** (meaning · examples · where met · related · your sentences · confidence · optional note); **IDs stay internal** and are never shown.

---

## 15. L1–L6 Concrete Examples (Allowed vs Blocked)

| Lesson | ✅ Allowed | 🚫 Blocked | Why blocked |
|---|---|---|---|
| **L2** | `Je suis étudiant.` · `Je voudrais être médecin.` | `Quand j'étais petit, je voulais être médecin.` | imparfait + past `voulais` — tense leak |
| **L3** | `Je ne suis pas médecin.` · `Vous êtes prêt ?` | `Pourquoi est-ce que tu n'es jamais prêt ?` | question word + `est-ce que` + `ne…jamais` — all deferred |
| **L4** | `J'ai faim.` · `Je n'ai pas faim.` | `Je n'ai plus envie de manger.` | `ne…plus` + `envie de` + `manger` infinitive — deferred |
| **L5** | `Je voudrais une baguette.` · `Je n'ai pas de café.` | `Je voudrais du café et des croissants.` | partitive `du` + plural `des` — recognition/deferred |
| **L6** | `J'ai besoin d'aide.` · `Je voudrais comprendre.` | `Je vais demander de l'aide.` · `Hier, j'ai demandé de l'aide.` | `aller`/futur proche (hook only) ; passé composé + `hier` — tense leak |
| **L7** | `Je vais à la maison.` · `On va à Paris.` · `Je voudrais aller à la maison.` · `Je ne vais pas au café.` *(supported)* | `Je vais comprendre.` *(recognition/future-hook only — not required production)* · `Je vais demander de l'aide.` · `Hier, je suis allé à Paris.` · `Où est-ce que tu vas ?` · `Je partirai demain.` | `je vais + infinitive` (futur proche) is recognition-only, never produced ; past movement (`je suis allé` / `hier`), question-word + `est-ce que`, and futur simple (`je partirai`) are all deferred |
| **L8** | `Où est la maison ?` · `C'est où ?` · `Tu vas où ?` · `Excusez-moi, où est le café ?` · `Je vais à la maison.` | `Où est-ce que tu vas ?` *(recognition only)* · `Où allez-vous ?` / `Où vas-tu ?` *(inversion)* · `Pourquoi tu vas à Paris ?` · `J'y vais.` · `Le livre est sur la table.` | `est-ce que` and inversion are recognition-only ; other question words (`pourquoi`…), `y` as place pronoun, and the location-preposition system (`sur`…) are deferred ; L7 futur-proche deferral preserved |
| **L9** | `Je voudrais faire une pause.` · `On fait une pause ?` · `J'ai besoin d'une pause.` · `Je ne fais pas ça.` · `Je ne voudrais pas faire ça.` | `Il fait froid.` · `Je fais du sport.` · `Ça se fait.` · `Je me fais aider.` · `Qu'est-ce que tu fais demain ?` · `Je peux faire ça.` · `J'ai fait une pause.` | weather/sport/idiom faire + `se faire`/`ça se fait` + full paradigm = broad faire deferred ; `qu'est-ce que` + time expansion = question system deferred ; `pouvoir` (`peux`) not owned ; passé composé (`j'ai fait`) = past deferred |
| **L10** | `Je suis fatigué.` · `J'ai besoin d'aide.` · `Je voudrais faire une pause.` · `Je ne fais pas ça.` · `Où est la maison ?` · `Je vais à la maison.` · `Tu vas où ?` · `Pouvez-vous répéter ?` · `Vous pouvez m'aider ?` *(recognition / future-hook only)* | `Je peux faire ça.` · `Je peux aller à la maison.` · `Je vais comprendre.` · `Pourquoi tu ne fais pas ça ?` · `Hier, j'ai fait une pause.` · `Je voudrais faire du sport.` | `pouvoir` production (incl. `pouvoir + aller` chain) deferred to L11 ; futur proche (`je vais comprendre`), question-word/broad question (`pourquoi`), passé composé (`hier`), and broad faire/activity (`faire du sport`) all deferred — L10 only **recombines owned engines** |
| **L11** | `Je peux faire ça ?` · `Je peux faire une pause ?` · `Vous pouvez m'aider ?` · `Vous pouvez répéter ?` · `Pouvez-vous répéter ?` · `Je ne peux pas faire ça.` · `Je peux aller à la maison ?` *(supported)* | `Je pourrais faire ça.` · `Est-ce que je peux faire ça ?` · `Puis-je faire une pause ?` · `On peut faire ça.` · `Il se peut qu'il vienne.` · `Peut-être.` · `J'ai pu faire ça.` · `Je peux le faire.` | conditionnel `pourrais` deferred ; `est-ce que` + `puis-je` / inversion question formation deferred (ask by intonation) ; full `pouvoir` paradigm (`on peut`) recognition-only ; possibility/probability + subjunctive (`il se peut`, `peut-être`) deferred ; passé composé (`j'ai pu`) = past deferred ; object-pronoun system (`le`) deferred |
| **L12** | `Est-ce que c'est ici ?` · `Est-ce que tu vas à la maison ?` · `Est-ce que vous pouvez m'aider ?` · `Est-ce que je peux faire une pause ?` | `Où est-ce que tu vas ?` · `Qu'est-ce que tu fais ?` · `Comment tu vas ?` · `Pourquoi tu ne fais pas ça ?` · `Vas-tu à la maison ?` · `Puis-je faire une pause ?` · `Est-ce que tu vas où ?` · `Est-ce que je peux le faire ?` | `où`+`est-ce que` production not owned ; `qu'est-ce que` + question-word system (`comment`/`pourquoi`/…) deferred ; inversion (`vas-tu`) + `puis-je` deferred ; stacking `est-ce que` onto another question blocked ; object-pronoun system (`le`) deferred |
| **L13** | `Est-ce que vous pouvez m'aider ?` · `Est-ce que je peux faire une pause ?` · `Je ne peux pas faire ça.` · `Est-ce que tu vas à la maison ?` · `Où est la maison ?` · `Je vais à la maison.` · `Je ne comprends pas. Vous pouvez répéter ?` · `J'y vais.` *(recognition / future-hook only)* | `Je peux y aller.` *(y+pouvoir chain)* · `J'y vais.` *(as production — `y` owned at L14)* · `Où est-ce que tu vas ?` · `Qu'est-ce que tu fais ?` · `Pourquoi tu ne peux pas faire ça ?` · `Je pourrais faire une pause.` · `Je peux le faire.` · `Hier, j'ai fait une pause.` | `y`/`en` production + `y`+pouvoir chain deferred to L14 ; `où`+`est-ce que` production + `qu'est-ce que` + question words deferred ; conditionnel `pourrais` deferred ; object-pronoun system (`le`) deferred ; passé composé (`hier`) = past deferred — L13 only **recombines owned engines** |
| **L14** | `J'y vais.` · `On y va.` · `Tu y vas ?` · *(supported)* `Je n'y vais pas.` | `Je vais y.` / `On va y.` / `Je y vais.` *(word-order / placement)* · `J'y suis.` *(être + y)* · `Je peux y aller.` *(y + pouvoir)* · `Est-ce que tu y vas ?` *(y + est-ce que)* · `Il y a un café.` *(existential, separate)* · `J'en ai.` *(en)* · `Je peux le faire.` *(object pronoun)* · `Je vais y aller.` *(futur proche / multi-verb y chain)* | place-`y` **chunk-first** only ; `en` + `y`/`en` contrast deferred (paid-zone) ; multi-verb / other-sense `y` deferred ; existential `il y a` is a separate doorway ; word-order fixed (`y` before the verb) ; `y`+pouvoir / `est-ce que` / futur production deferred ; object-pronoun system + past/future deferred |

> **L7 note (movement vs future).** L7 owns **`aller` as movement / next-step** (`je vais à + place`, `on va à + place`, `je voudrais aller à + place`, supported `je ne vais pas + place`). L7 **does not** allow **futur proche ownership**. AI may show `je vais + infinitive` **only** when the lesson spec marks it `recognition`/future-hook — never as required production. AI must **not** turn L7 into a **travel-vocabulary** or **future-tense** lesson (closed place set; no itinerary/directions vocab; no owned future).

> **L8 note (where-control vs question system).** L8 owns **`où` as a practical where-control** (`où est … ?`, `c'est où ?`, spoken `tu vas où ?`). L8 **does not** own full question formation: `est-ce que`, inversion, and other question words (`comment` / `pourquoi` / `quand` / `qui` / `que`) are recognition-only or deferred, and `y` + the location-preposition system (`dans/sur/sous…`) stay deferred. AI may generate **only** controlled `où`/location/movement questions inside the lesson's allowed frames, must **not** dump travel/location vocabulary, and must **preserve L7's futur-proche deferral**.

> **L9 note (small-action faire vs broad faire).** L9 owns **`faire` for a small action / pause only** (`faire une pause`, `faire ça`, `je ne fais pas ça`). AI may generate **only** controlled small-action faire inside the lesson's allowed frames; it must **not** turn L9 into a generic do/make, weather, activity, idiom, `se faire` / `ça se fait`, or full-conjugation lesson, and must **not** introduce `pouvoir`, present `vouloir` (`je veux`), past/future, or full question formation as production. `je ne veux pas faire ça` may appear as **recognition input only**.

> **L10 note (integration, not new curriculum).** L10 **recombines L1–L10 owned engines** in an after-class human scene and introduces **0 new systems**. AI may generate **only** allowed recombinations; it must **not** introduce `pouvoir` as a productive system (`vous pouvez m'aider ?` / `pouvez-vous répéter ?` are recognition input only), nor past/future, broad faire, full question formation, location-preposition systems, or vocabulary dumps. L10 should **feel like integration, not new curriculum.**

> **L11 note (help/permission pouvoir vs broad modal).** L11 opens **`pouvoir` on its help/permission slice only** (`vous pouvez m'aider ?`, `je peux faire une pause ?`, `je ne peux pas faire ça`) over **already-owned actions**. AI may generate **only controlled `pouvoir` help/permission examples inside the allowed frames** (`frame:je-peux-plus-infinitive`, `frame:je-peux-faire-plus-action`, `frame:je-ne-peux-pas-plus-infinitive`, `frame:vous-pouvez-plus-infinitive`), filled only with the closed owned set (`faire ça`, `faire une pause`, `aller à + place` supported, `m'aider`, `répéter`). AI must **not** introduce the **conditionnel** (`je pourrais`), the **subjunctive**, **broad possibility/probability** (`il se peut`, `peut-être`), the **full `pouvoir` paradigm** as production (`on peut` / `tu peux` / …), **`est-ce que` / `puis-je`** question formation, **past/future**, or the **object-pronoun system** — even if the French is correct. `m'aider` may appear **only as a frozen help chunk** when the lesson spec permits it (object pronouns are not owned). Asking uses **rising intonation**, not `est-ce que`/inversion.

> **L12 note (est-ce que yes/no wrapper, not the question system).** L12 owns **`est-ce que` as a yes/no wrapper only** — `est-ce que + [an already-owned clause]` (`est-ce que c'est ici ?`, `est-ce que vous pouvez m'aider ?`, `est-ce que je peux faire une pause ?`) — and graduates L11's `est-ce que je peux …?` from recognition to owned. AI may generate **only `est-ce que` yes/no questions over allowed owned clauses**. AI must **not** introduce inversion (`vas-tu` / `allez-vous` / `puis-je`), question words (`qu'est-ce que` / `comment` / `pourquoi` / `quand` / `qui` / `que` / `combien`), `où`+`est-ce que` production, `y` / `en`, object pronouns, past/future, or broad pouvoir — even if the French is correct. AI must **not** treat `est-ce que` as permission to generate the full French question system; question words + inversion are a later lesson (Question Expansion 2 / post-Campfire).

> **L13 note (integration, not new curriculum).** L13 **recombines L1–L13 owned engines** in an after-class can-do + asking scene and introduces **0 new systems**. AI may generate **only allowed recombinations**; it must **not** introduce `y`/`en` as productive pronouns (`j'y vais` / `je peux y aller` = recognition / future-hook for L14 only), inversion, `qu'est-ce que`, new question words, broad pouvoir (`pourrais` / `il se peut`), broad faire, the object-pronoun system, or past/future — even if the French is correct. L13 should **feel like integration, not new curriculum.** `j'y vais` may appear **only as a recognition/future hook** seeding L14 `y`-light.

> **L14 note (place-`y` chunk-first, not the pronoun system).** L14 owns **place-`y` through near-chunks** — `j'y vais` / `on y va` (+ supported `je n'y vais pas` / `tu y vas ?`) over an owned `à + place` — and graduates L13's `j'y vais` hook to owned. AI may generate **only controlled place-`y` chunks inside the allowed frames**, and must use **`word:y-place`, not a generic `word:y`**. AI must **not** introduce `en` (or the `y`/`en` contrast), `il y a` as a system (existential = a separate `chunk:il-y-a` doorway), object-pronoun stacking, full pronoun placement, broad `à+place` replacement, `j'y suis` production, `y`+pouvoir chains, `y`+`est-ce que` production, past/future, or futur proche — even if the French is correct. `j'y vais` / `on y va` are **near-chunks**; L14 is **not** a full pronoun lesson.

> Pattern: every blocked line is **valid French** the learner can't yet have produced. The contract blocks it on **prerequisite-safety**, not correctness.

---

## 16. AI Failure Modes

The contract is designed to catch these:
- **grammar leak** — produces a structure not yet taught.
- **vocabulary dump** — adds many new words at once.
- **tense leak** — uses a tense/aspect/mood the lesson doesn't own.
- **over-explaining** — feedback becomes a grammar lecture.
- **generic chatbot drift** — Say It Your Way turns into open conversation.
- **Mon Lexique orphan items** — words with no canonical entry.
- **reward-tone contamination** — "amazing / great job / streak / +XP."
- **cultural/register over-lecture** — a culture essay instead of a one-line note.
- **accepting wrong answers too generously** — passing meaning-broken or ungrammatical production.
- **rejecting valid alternatives too rigidly** — marking a correct in-scope variant wrong.

> A generation/evaluation pipeline should be testable against each failure mode (a future validator, §17/§18).

---

## 17. Future Runtime Notes

- **This contract does not implement AI.** It is the spec a future implementation must satisfy.
- Future implementation may require: prompt templates, a JSON I/O schema, an **unseen-form validator**, and per-lesson context assembly.
- **The Dev APK smoke test remains the boundary** before any AI runtime alignment.
- Runtime work must be split into **small PRs** (engine §16; pipeline anti-chaos), each independently reviewable.
- L1–L6 currently run `model-answer-only` (no live AI), so this contract has **no immediate runtime surface** — it governs the *next* stage.

---

## 18. Open Decisions

> Unresolved — listed, not silently decided.

- **Exact runtime prompt shape** — system/template structure for each generation mode.
- **JSON schema for AI inputs/outputs** — concrete shape of §3 inputs and structured outputs.
- **Unseen-form validator** — how to *enforce* (not just request) prerequisite-safety: lexicon allow-list, grammar checker, or model-side constraints.
- **Canonical-ID enforcement at runtime** — how IDs are bound (depends on the ID-convention migration, ID convention §11).
- **Where AI runs** — on-device, server-side, or Supabase Edge Functions (DEV_APK_MVP_CANON keeps AI server-bounded; secrets server-only).
- **Fallback behavior** — what happens when AI is unavailable/over budget (degrade to `model-answer-only`?).
- **Model choice / cost / latency** — which model per mode (cf. CLAUDE.md model routing: cheap gen vs reasoning eval), and rate/cost caps enforced **server-side**.
- **Version bump trigger** — what promotes this contract from v1 (likely: first AI feature shipping behind it).

---

*End of AI Generation Contract v1. Planning/pedagogy constraint only — implements no AI, authorizes no code, schema, or runtime change. It governs how AI must behave **if and when** it is built, after the Dev APK smoke test.*
