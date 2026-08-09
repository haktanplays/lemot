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
| **L15** | `Il faut faire une pause.` · `Il faut aller à la maison.` · `Il faut faire ça.` · `Je dois faire ça.` · `Je dois faire une pause.` · `Je dois aller à la maison.` | `Il faut que tu partes.` / `Il faut que je fasse ça.` *(subjonctif)* · `Je devrais faire une pause.` / `Il faudrait faire une pause.` *(conditionnel/advice)* · `Tu dois faire ça.` / `Vous devez m'aider.` *(paradigm + object pronoun)* · `Il me faut une pause.` / `Il faut une pause.` *(noun/pronoun sense)* · `Je dois 5 euros.` *(owe)* · `Je dois y aller.` *(y+devoir)* · `J'ai dû faire ça.` *(past)* | `il faut + inf.` primary (invariable) + `je dois + inf.` supported (one form) ; subjunctive (`il faut que`) + conditionnel/advice (`devrais`/`faudrait`) deferred ; full `devoir` paradigm deferred ; `devoir`=owe, `il me faut`/`il faut`+noun, `y`+devoir, past/future deferred — L15 owns light obligation only |
| **L16** | `Il faut faire une pause.` · `Je vais à la maison.` · `On y va ?` *(the canonical three-line reading)* · `Je dois faire une pause.` · `Est-ce que je peux faire une pause ?` · `Il faut faire une pause, je vais à la maison.` · `Je dois aller à la maison.` · `J'y vais.` *(only when the place is already clear)* · `Vous pouvez m'aider ?` *(L11 help, genuinely owned)* | `Je suis fatigué.` *(no canonical identity — L16 must not mint one to rescue its superseded reading)* · `Je ne comprends pas.` / `Vous pouvez répéter ?` / `C'est pas grave.` *(phantom repair — never worked in shipped L0–L15)* · `Je peux vous aider.` *(object-pronoun production)* · `Je peux y aller.` *(y+pouvoir)* · `Je dois y aller.` *(y+devoir)* · `Il faut que tu partes.` *(subjonctif)* · `Tu devrais faire une pause.` *(conditionnel/advice)* · `Hier, je suis allé à la maison.` *(past)* · `Demain, je vais faire une pause.` *(future/temporal drift)* · `Après, je vais à la maison.` *(new vocab — `après` not owned)* · *open-ended AI chat response* · *personalized advice/coaching response* | L16 = Review/Integration + a **`model-answer-only`** A Small Moment seed (present-only, known-items-only ≤2–3 line read + one scaffolded response) ; recombines L11–L15 only ; **no live AI / free chat / personalization** ; subjunctive, conditionnel/advice, past/future, new vocab (`après`), object-pronoun production, and `y`+modal chains deferred ; **`fatigué` and the repair trio blocked as unowned** ; deep A Small Moment / live evaluation = paid-zone |
| **L17** | `Ça va ?` · `Ça va.` · `Ça ne va pas.` *(composed from `chunk-ca-va` + the owned ne…pas)* · `Je suis content.` / `Je suis contente.` · `Je suis fatigué.` / `Je suis fatiguée.` · `Il faut faire une pause.` *(obligation)* · `J'ai faim.` · plus genuinely owned recycled material for the response (`je ne suis pas`, `est-ce que`, `je peux`, `j'y vais` / `on y va`, `bonjour` / `merci` / `au revoir`) | `Je ne suis pas prêt.` *(first-person `prêt` is not owned)* · `Je ne comprends pas.` / `Vous pouvez répéter ?` / `C'est pas grave.` *(phantom ownership — never worked in shipped L0–L16)* · `J'ai soif.` / `J'ai peur.` / `J'ai besoin d'aide.` *(not owned)* · `Je comprends.` *(no promotion — its source was never acquired)* · `Je me sens triste.` *(se sentir / reflexive)* · `Tu devrais faire une pause.` / `Il faudrait faire une pause.` *(conditionnel/advice)* · `Hier, j'étais triste.` *(past feeling)* · `Demain, ça ira.` *(future feeling)* · `Ça va aller.` / `Je vais bien.` *(futur/aller leak)* · `Je suis anxieux / déprimé / seul.` *(emotion vocab dump)* · `Je peux vous aider.` *(object-pronoun)* · *personalized emotional coaching response* · *open-ended AI chat about feelings* | L17 = Human Context / Feelings Light: the frozen social check-in `chunk-ca-va` (asked AND answered — one identity) + two capped state adjectives (`adj-fatigue`, `adj-content`) in the owned `je suis + state` frame ; `Ça ne va pas.` is composed, not a separate identity ; 0 new systems / 0 architecture verbs ; **journeyRole standard ; active-new exactly 3** ; the capability is to **open** a small human moment kindly (ask, and answer about oneself) — **not** to console: AI must not generate a consoling or reassuring reply to another person's trouble, because no owned language supports one ; `se sentir`, conditionnel/advice, past/future feeling, broad emotion lexis, `ça va`→futur/`aller`, and object-pronoun production deferred ; deep emotional/social AI feedback = paid-zone |
| **L18** | `Comment ça va ?` *(composed from `adverb-comment` + `chunk-ca-va`)* · `C'est comment ?` · `Le café, c'est comment ?` *(composed from `chunk-c-est` + `adverb-comment`)* · `Ça va.` · `Ça ne va pas.` · `Je suis fatigué.` / `Je suis fatiguée.` · `Je suis content.` / `Je suis contente.` · `C'est où ?` / `Le café, c'est où ?` *(the L8 contrast)* · `C'est ici.` · `Bonjour.` / `Merci.` / `Au revoir.` | `Comment ?` *(bare — repair sense, deferred with the orphaned repair rail)* · `Comment est-ce que ça va ?` *(Q-word + wrapper — L12 holds this at recognition)* · `Comment allez-vous ?` / `Comment vas-tu ?` *(inversion)* · `Comment tu vas ?` *(productive `tu vas` not owned)* · `Comment on fait ça ?` *(procedural sense; `on fait` unowned, no `verb-faire`)* · `Pourquoi …?` / `Quand …?` / `Combien …?` / `Qui …?` *(second Q-word — not taken)* · `Qu'est-ce que tu fais ?` *(recognition only)* · `Je vais bien.` / `Ça va bien.` / `Ça va aller.` *(unowned answers + `aller`/futur leak)* · `C'est bon.` / `C'est super.` / `C'est joli.` *(descriptive adjectives — none owned)* · **`Le café, c'est comment ?` answered with `Ça va.` / `Ça ne va pas.` / `Je suis fatigué(e).` / `Je suis content(e).`** *(Host-B misuse: these are L17 social/personal-state answers and would silently broaden `chunk-ca-va`'s acquired sense)* · `Je ne comprends pas.` / `Vous pouvez répéter ?` / `C'est pas grave.` *(phantom repair)* · `Je vais faire une pause.` *(futur proche)* · `Hier, c'était comment ?` *(past)* · `Je peux vous aider.` *(object pronoun)* · *open-ended AI chat / free Q&A* | L18 = Question Expansion 2: **one** question word (`adverb-comment`), **manner/state sense only**, across **two owned hosts** — front-placed over `chunk-ca-va` and final-position over `chunk-c-est`, in the slot `où` has held since L8. **journeyRole doorway ; active-new exactly 1 ; 0 new question mechanisms** ; both hosts are **authored composition**, never composite identities ; generating only `Comment ça va ?` fails the lesson — the second host is what proves the learner acquired a **word**, not a sentence ; the two hosts are **asymmetric** — Host A may be answered from L17's owned set, **Host B has NO owned French answer and none may be required or supplied**, and no descriptive adjective may be manufactured ; the repair sense, every other Q-word, `Q-word + est-ce que`, inversion, `qu'est-ce que`, embedded questions, the procedural sense, and futur proche are all deferred |
| **L19** | Recombination of GENUINELY OWNED material only: `Bonjour.` · `Comment ça va ?` · `Ça va.` · `Ça ne va pas.` · `Je suis fatigué(e).` / `Je suis content(e).` · **`Ça ne va pas ? Il faut faire une pause.`** *(the crossing beat — person side + task side in one turn)* · `Le café, c'est comment ?` / `C'est comment ?` *(question only, no French answer)* · `Je peux faire une pause ?` · `Est-ce que je peux faire une pause ?` · `On y va ?` · `J'y vais.` · `Merci.` / `Au revoir.` | **any new acquisition of any kind** *(L19 is `[]` — a first appearance is not an acquisition)* · `Je ne comprends pas.` / `Vous pouvez répéter ?` / `C'est pas grave.` *(orphaned repair rail — "repair" in the band map means the mastery mechanism, not language)* · `J'ai soif.` / `J'ai peur.` / `J'ai besoin d'aide.` / `Je ne suis pas prêt.` / `étudiant` / `mais` *(no identities)* · `Le café, c'est comment ?` answered with `Ça va.` / `Je suis fatigué(e).` *(L18 host asymmetry)* · `C'est bon.` / `C'est super.` / `très` / `bien` / `mal` *(no descriptive adjective is owned)* · new feelings vocabulary · `Pourquoi …?` / `Quand …?` / `Comment est-ce que …?` / `Comment allez-vous ?` / `Qu'est-ce que …?` *(question boundary holds)* · `Comment ?` *(repair sense)* · `Je vais faire une pause.` *(futur proche)* · `Hier, …` / `Demain, …` *(past/future)* · `faire` bare or in an infinitive slot *(no `verb-faire`)* · `Je peux vous aider.` *(object pronoun)* · `Tu devrais …` *(advice)* · **any copy implying the lesson adapts to the learner** *("your weak spots", "because you struggled with…")* · free-form A Small Moment storytelling · open chat | L19 = Integration + weak-point recovery + the SECOND A Small Moment recurrence. **journeyRole integration ; active-new exactly 0 ; known-items-only.** Its job is the first **two-sided exchange** the curriculum can build — greet, ask the person, hear, answer, ask about a place, act, close — and **at least one beat must CROSS** the person side with the task/movement side, or the lesson is a review, not an integration. **Weak-point recovery is W2 and authoring-side only**: the payload is static and identical for every learner; the contribution is authored `weave` / `fill-with-traps` production for the four thinnest-covered band items (`adj-fatigue`, `adj-content`, `chunk-on-y-va`, `word-y-place`), which the shipped Practice Hub reuses by reference. **No adaptive runtime behaviour exists** — AI must not invent, describe or imply any. The ASM recurrence is a **two-voice** read the learner CONTINUES, <=2-3 lines, present scope, known-items-only, `model-answer-only`, with a comprehension-level action |
| **L20** | Owned-language recombination only, with **several valid routes**: `Bonjour !` · `Comment ça va ?` / `Ça va ?` · `Ça va.` / `Ça ne va pas.` / `Je suis fatigué(e).` / `Je suis content(e).` · `Il faut faire une pause.` / `Je peux faire une pause ?` · *(optional)* `Le café, c'est comment ?` / `C'est comment ?` · *(optional)* `On y va ?` / `J'y vais.` · `Merci.` / `Au revoir.` · **plus exactly ONE recognition-only card: `Je vais faire une pause.`** *(insight-card, no targetItemIds, no itemId, never produced)* | **any active-new or supported-new acquisition** *(L20 is `[]`)* · **producing, drilling, eliciting or explaining futur proche** — the FP-C card is read, never used · a **second** futur example or any `aller` conjugation · any claim that L7 or L17 previewed futur proche *(neither did)* · `Je ne comprends pas.` / `Vous pouvez répéter ?` / `C'est pas grave.` / bare `Comment ?` *(RR-A — milestone pressure is not a licence)* · `J'ai soif.` / `J'ai peur.` / `J'ai besoin d'aide.` / `Je ne suis pas prêt.` / `étudiant` / `mais` *(no identities)* · `C'est comment ?` answered in French *(L18 asymmetry)* · `C'est bon.` / `C'est super.` / `très` / `bien` *(no descriptive adjective is owned)* · new feelings vocabulary · `Pourquoi …?` / `Quand …?` / `Comment est-ce que …?` / `Qu'est-ce que …?` / inversion · past tense · any future form **outside the single card** · `faire` bare or in an infinitive slot · `Je peux vous aider.` *(object pronoun)* · `Tu devrais …` *(advice)* · **any unlock / score / threshold / pass-fail / badge copy** *(no runtime gate exists)* · **any "you have reached Campfire" or journey-complete claim** *(L21–L24 still exist)* · **coverage sweeps** — forcing an owned system in so the milestone feels complete · free conversation · arbitrary storytelling · copy claiming general fluency | L20 = the **Pre-Campfire capability checkpoint** and the **first shipped Milestone**. **journeyRole milestone ; active-new exactly 0 ; known-items-only.** It **tests more than it teaches**: the learner carries **one small moment end to end**, choosing which owned capabilities it needs. **Milestone = capability proof, not novelty** — nothing new may be added to make it feel important. Its support ladder is **2 → 1 → 0** (`context` → `open` → say-it) with **no `supported` and no `mid` beat**, against the rank-4 opening of every lesson in the L13–L19 band it exits: **L20 begins where L19's ladder finishes.** That ladder is **not** a corpus first (`v1-lesson-009` already has it), so the milestone/review distinction rests on a per-beat rule instead: **no L20 production beat may re-ask an L19 reference answer at lower support.** Route choice comes only from existing `expectedAnswers` / `acceptedAlternatives` / `model-answer-only` — **no free-form evaluation is invented**, and every alternative must be independently owned. **It is not a checklist**: the moment must hang together, not parade every system. **FP-C** is exactly one `insight-card` with no `targetItemIds` and no `itemId`, carrying `Je vais faire une pause.` as recognition only — no identity, no demand, no production target, absent from the recap. **Milestone is a curriculum role, not a runtime gate**, and **Campfire is not announced** |
| **L21** | Bounded evaluation of a THING, both polarities: `C'est bon.` · `Ce n'est pas bon.` · `Le café, c'est bon.` · `Le café, ce n'est pas bon.` · **plus the recycled L18 question it answers**, `Le café, c'est comment ?` / `C'est comment ?` | **any second adjective, in any position, for any reason** — `C'est mauvais.` / `C'est joli.` / `C'est super.` / `C'est intéressant.` / `bien` · `très bon` or any intensifier · `meilleur` or any comparison · `j'aime` or any preference verb · **attributive `un bon café`** · `bonne` / `bons` / `bonnes` *(no agreement is owned, and the identity carries no `gender` tag on purpose)* · adjective **placement** or **agreement** taught as a system · **`C'est pas bon.`** *(the spoken `ne`-drop is an unlicensed register)* · the **"that's enough / that's fine"** sense of `c'est bon` — never shown, never glossed, and no scene where it is a plausible reading · **any copy implying `c'est` is newly owned** *(it is not: L21 declares only `adj-bon`)* · new nouns · broad opinion or descriptive language · `Je ne comprends pas.` / `Vous pouvez répéter ?` / `C'est pas grave.` *(RR-A)* · past or future tense · a second new question word · any unlock / score / threshold / Campfire-arrival copy | L21 = **Evaluation**, the answer L18 shipped without. **journeyRole doorway ; active-new exactly 1 (`adj-bon`) ; known-items-only otherwise.** **L21 closes ONE answer gap; it does NOT open descriptive vocabulary.** The ownership unit is the **word**, following L18 exactly — no host frame becomes an identity, so `chunk-c-est-bon` and `chunk-ce-n-est-pas-bon` do not exist. **`chunk-c-est` is NOT promoted**: the learner already produces it unaided in L18/L19/L20, so declaring it new would be a false novelty claim, and its registry status is untouched because `treatment.ts` reads status per lesson and flipping it would retroactively rewrite seven shipped lessons. The **negative rides the owned L3 host** `ce n'est pas`, which IS demand-backed. **The L18 host asymmetry is lifted for `bon` only** — `C'est comment ?` may take that answer and no other. **Anti-thinness rule:** the lesson must show **both polarities** and **both roles** (evaluation offered unprompted, evaluation given as an answer); variation may come from polarity, role, context and support level, **never from vocabulary**. Answer form is **bare `C'est bon.`** once the referent is established; topic-fronted `Le café, c'est bon.` belongs to the unprompted statement. Support opens **no higher than `mid`** so L20's independence is not undone |

> **L7 note (movement vs future).** L7 owns **`aller` as movement / next-step** (`je vais à + place`, `on va à + place`, `je voudrais aller à + place`, supported `je ne vais pas + place`). L7 **does not** allow **futur proche ownership**. AI may show `je vais + infinitive` **only** when the lesson spec marks it `recognition`/future-hook — never as required production. AI must **not** turn L7 into a **travel-vocabulary** or **future-tense** lesson (closed place set; no itinerary/directions vocab; no owned future).

> **L8 note (where-control vs question system).** L8 owns **`où` as a practical where-control** (`où est … ?`, `c'est où ?`, spoken `tu vas où ?`). L8 **does not** own full question formation: `est-ce que`, inversion, and other question words (`comment` / `pourquoi` / `quand` / `qui` / `que`) are recognition-only or deferred, and `y` + the location-preposition system (`dans/sur/sous…`) stay deferred. AI may generate **only** controlled `où`/location/movement questions inside the lesson's allowed frames, must **not** dump travel/location vocabulary, and must **preserve L7's futur-proche deferral**.

> **L9 note (small-action faire vs broad faire).** L9 owns **`faire` for a small action / pause only** (`faire une pause`, `faire ça`, `je ne fais pas ça`). AI may generate **only** controlled small-action faire inside the lesson's allowed frames; it must **not** turn L9 into a generic do/make, weather, activity, idiom, `se faire` / `ça se fait`, or full-conjugation lesson, and must **not** introduce `pouvoir`, present `vouloir` (`je veux`), past/future, or full question formation as production. `je ne veux pas faire ça` may appear as **recognition input only**.

> **L10 note (integration, not new curriculum).** L10 **recombines L1–L10 owned engines** in an after-class human scene and introduces **0 new systems**. AI may generate **only** allowed recombinations; it must **not** introduce `pouvoir` as a productive system (`vous pouvez m'aider ?` / `pouvez-vous répéter ?` are recognition input only), nor past/future, broad faire, full question formation, location-preposition systems, or vocabulary dumps. L10 should **feel like integration, not new curriculum.**

> **L11 note (help/permission pouvoir vs broad modal).** L11 opens **`pouvoir` on its help/permission slice only** (`vous pouvez m'aider ?`, `je peux faire une pause ?`, `je ne peux pas faire ça`) over **already-owned actions**. AI may generate **only controlled `pouvoir` help/permission examples inside the allowed frames** (`frame:je-peux-plus-infinitive`, `frame:je-peux-faire-plus-action`, `frame:je-ne-peux-pas-plus-infinitive`, `frame:vous-pouvez-plus-infinitive`), filled only with the closed owned set (`faire ça`, `faire une pause`, `aller à + place` supported, `m'aider`, `répéter`). AI must **not** introduce the **conditionnel** (`je pourrais`), the **subjunctive**, **broad possibility/probability** (`il se peut`, `peut-être`), the **full `pouvoir` paradigm** as production (`on peut` / `tu peux` / …), **`est-ce que` / `puis-je`** question formation, **past/future**, or the **object-pronoun system** — even if the French is correct. `m'aider` may appear **only as a frozen help chunk** when the lesson spec permits it (object pronouns are not owned). Asking uses **rising intonation**, not `est-ce que`/inversion.

> **L12 note (est-ce que yes/no wrapper, not the question system).** L12 owns **`est-ce que` as a yes/no wrapper only** — `est-ce que + [an already-owned clause]` (`est-ce que c'est ici ?`, `est-ce que vous pouvez m'aider ?`, `est-ce que je peux faire une pause ?`) — and graduates L11's `est-ce que je peux …?` from recognition to owned. AI may generate **only `est-ce que` yes/no questions over allowed owned clauses**. AI must **not** introduce inversion (`vas-tu` / `allez-vous` / `puis-je`), question words (`qu'est-ce que` / `comment` / `pourquoi` / `quand` / `qui` / `que` / `combien`), `où`+`est-ce que` production, `y` / `en`, object pronouns, past/future, or broad pouvoir — even if the French is correct. AI must **not** treat `est-ce que` as permission to generate the full French question system; question words + inversion are a later lesson (Question Expansion 2 / post-Campfire).

> **L13 note (integration, not new curriculum).** L13 **recombines L1–L13 owned engines** in an after-class can-do + asking scene and introduces **0 new systems**. AI may generate **only allowed recombinations**; it must **not** introduce `y`/`en` as productive pronouns (`j'y vais` / `je peux y aller` = recognition / future-hook for L14 only), inversion, `qu'est-ce que`, new question words, broad pouvoir (`pourrais` / `il se peut`), broad faire, the object-pronoun system, or past/future — even if the French is correct. L13 should **feel like integration, not new curriculum.** `j'y vais` may appear **only as a recognition/future hook** seeding L14 `y`-light.

> **L14 note (place-`y` chunk-first, not the pronoun system).** L14 owns **place-`y` through near-chunks** — `j'y vais` / `on y va` (+ supported `je n'y vais pas` / `tu y vas ?`) over an owned `à + place` — and graduates L13's `j'y vais` hook to owned. AI may generate **only controlled place-`y` chunks inside the allowed frames**, and must use **`word:y-place`, not a generic `word:y`**. AI must **not** introduce `en` (or the `y`/`en` contrast), `il y a` as a system (existential = a separate `chunk:il-y-a` doorway), object-pronoun stacking, full pronoun placement, broad `à+place` replacement, `j'y suis` production, `y`+pouvoir chains, `y`+`est-ce que` production, past/future, or futur proche — even if the French is correct. `j'y vais` / `on y va` are **near-chunks**; L14 is **not** a full pronoun lesson.

> **L15 note (light obligation, not modal/advice grammar).** L15 owns **`il faut + inf.` (primary, invariable) + `je dois + inf.` (supported, one person-form)** over owned infinitives. AI may generate **only controlled obligation-light examples in the allowed frames**, treating **`il faut + inf.` as the primary invariable anchor** and **`je dois + inf.` as the supported personal bridge**. AI must **not** introduce **`il faut que` + subjunctive**, **conditionnel `je devrais` / `il faudrait`** (advice/moralizing), the **full `devoir` paradigm** (`tu dois`/`vous devez`/`on doit`/…), **`devoir` = owe**, **`il me faut` / `il faut + noun`**, **`y`+devoir** (`je dois y aller`), past/future, or a **generic life-advice / coaching tone** — even if the French is correct. L15 is **not** full modal/obligation grammar.

> **L16 note (integration + a `model-answer-only` A Small Moment seed, not a chat/AI feature).** L16 **recombines L11–L15 owned engines** (pouvoir **help**/permission — `vous pouvez m'aider`, genuinely worked at L11 —, `est-ce que` yes/no wrapper, place-`y`, `il faut`/`je dois` obligation-light) in one after-class human scene and introduces **0 new systems / 0 new architecture verbs**. **Its canonical reading is exactly `Il faut faire une pause.` / `Je vais à la maison.` / `On y va ?`** — AI must not generate an alternative reading. It seeds **A Small Moment** as a **bounded, `model-answer-only` reading-response**: a **present-only, known-items-only, ≤2–3 line read + one short scaffolded response + a deterministic/hardcoded reveal**. **L16 has no live generative AI requirement** — any AI reference is **future/premium/deferred**. AI must **not** treat L16 as permission to generate **free chat, personalization, free-form/live evaluation, new vocabulary** (e.g. `après`), **new grammar, past/future** (`hier`/`demain`/`plus tard`), the **object-pronoun system** (`je peux vous aider`), **`y`+modal chains** (`je peux/dois y aller`), **`il faut que`/subjunctive**, **conditionnel/advice** (`tu devrais`), or a **therapy/coach tone** — even if the French is correct. **Two further blocks are ownership-based, not register-based** (2026-08-08): **`fatigué`** has no canonical identity and L16 must not mint one to rescue its superseded reading (whether `fatigué` becomes canonical **later** is an open L17 question, untouched here); and the **repair trio** — `je ne comprends pas`, `vous pouvez répéter ?`, `c'est pas grave` — is **not owned**: the first two exist only as PR-07 L1-pilot registrations that no shipped lesson works, and the third has no identity at all. **This does not restrict the L11 help capability**, which is genuinely owned and stays allowed — where older wording said "repair/help", read **help only**. The **deep AI-driven A Small Moment / live evaluation remains paid-zone**; the L16 reveal is **hardcoded/static**. A Small Moment ≠ Mini Mission ≠ Mini Conversation ≠ chat.

> **L17 note (human-context / feelings *light*, not an emotion-vocab dump or a counselor).** L17 broadens human/social language with a **social check-in** — **`chunk-ca-va`, ONE frozen identity** asked with a rising voice (`Ça va ?`) and answered with a falling one (`Ça va.`); `Ça ne va pas.` is **composed** from it plus the already-owned `ne…pas`, not a separate identity — plus **two capped state adjectives**, `adj-content` (`content`/`contente`) and `adj-fatigue` (`fatigué`/`fatiguée`), fixed gendered pairs with **no agreement rule taught**, dropped into the owned `je suis + state` frame.
>
> **Ownership corrections (2026-08-08, load-bearing for generation).** **`fatigué` is NEW in L17, not recycled from L2** — the L02 spec planned it and the shipped L2 compact slice dropped it, so no learner has ever owned it. **`content` is NEW in L17.** **`chunk-ca-va` is frozen social use only** — never productive `aller`, never futur proche. And the state inventory L17 was once thought to recycle **does not exist in shipped content**: `je ne comprends pas`, `vous pouvez répéter`, `c'est pas grave`, `j'ai soif`, `j'ai peur`, `j'ai besoin d'aide`, first-person `prêt`, `étudiant` and `mais` are **not owned** and must not be generated for L17; the `je comprends` promotion is **de-scoped** because its source was never acquired. Of the old list, only `j'ai faim` (L4) ships. No advice expansion of any kind. **0 new systems / 0 architecture verbs ; active-new ~3–5** (overriding the band map's 7–9). AI may generate **only controlled human-context/check-in examples inside the allowed frames**. AI must **not** introduce **broad emotion vocabulary** (beyond `content`/`contente` active, `triste` recognition), **`se sentir` / `je me sens`** production, **conditionnel/advice** (`tu devrais` / `il faudrait`), **past/future feeling narrative** (`hier j'étais…` / `demain ça ira`), turn **`ça va`** into **futur proche / `aller`** teaching (`ça va aller`, `je vais bien`), **personalize emotionally / act as a counselor-coach**, or open **free feelings chat** — even if the French is correct. The **deep emotional/social AI feedback remains paid-zone**; the L17 reveal is **hardcoded/static**.

> **L18 note (ONE question word into owned hosts, not the question system).** L18 is **Question Expansion 2** — the lesson L12 and L13 both routed their question words to. It opens **exactly one** productive question word, **`adverb-comment`**, in its **manner/state sense only**, across **two already-owned hosts**: `Comment ça va ?` (front-placed, over L17's frozen `chunk-ca-va`) and `C'est comment ?` / `Le café, c'est comment ?` (final position, over L3's `chunk-c-est`, in the spot `où` has occupied since L8). **Both hosts are authored composition** — `chunk-comment-ca-va` and `chunk-c-est-comment` **do not exist** and AI must not treat either sentence as one indivisible unit. **journeyRole doorway ; active-new exactly 1 ; 0 new question mechanisms ; 0 new grammar systems ; 0 architecture verbs.**
>
> **The ownership model differs from L8 on purpose.** L8 owns `chunk-c-est-ou` as a **frozen question** with `adverb-ou-where` merely **supported** inside it; L18 owns the **word**, `active`, which is the only thing that makes this Question *Expansion*. That claim is only honest if `comment` appears in **both** hosts — **generating only `Comment ça va ?` produces a second frozen greeting variant and fails the lesson.**
>
> **The two hosts do NOT share an answer inventory (corrected 2026-08-08).** **Host A** is a social check-in: L17's owned answers — `Ça va.` · `Ça ne va pas.` · `Je suis fatigué(e).` · `Je suis content(e).` — are semantically appropriate responses and may be used in the Host-A context. **Host B does NOT inherit them.** There is **no owned productive French answer** to "what is the café like", and **L18 must not require one**: the generator may author Host-B question production with no learner French answer at all, establishing meaning through the situation, through choosing which question fits, through English/model explanation, or through non-productive interlocutor context. AI must **not** answer `Le café, c'est comment ?` with `Ça va.` / `Ça ne va pas.` / `Je suis fatigué(e).` / `Je suis content(e).` — `chunk-ca-va` was acquired at L17 as the social check-in / personal-state formula, and using it to evaluate a café would silently broaden its acquired sense, however colloquially tolerable that may be. Nor may AI manufacture a descriptive answer instead: the registry contains **no** quality adjective, so `C'est bon.` / `C'est super.` / `C'est joli.` / `très` / `bien` / `mal` are blocked. **Host B exists to prove productive `comment` beyond the frozen social frame, not to expand the learner's descriptive answer vocabulary.**
>
> AI must **not** introduce: **bare `Comment ?`** in the repair sense (deferred with the orphaned repair rail — never shown as a usable move, never glossed); **any second question word** (`pourquoi` / `quand` / `combien` / `qui` / `que`) even though the band permits one; **`comment` + `est-ce que`** (`Comment est-ce que ça va ?` — the top leak: both halves are owned and the French is correct, but L12 holds `Q-word + est-ce que` at recognition); **inversion** (`Comment allez-vous ?` / `Comment vas-tu ?`); **`Comment tu vas ?`** (productive `tu vas` is not owned — `tu vas où ?` never shipped); **`qu'est-ce que`**; **embedded questions**; the **procedural sense** (`Comment on fait ça ?` — `on fait` unowned, and there is **no `verb-faire` identity**); **unowned answers** (`Je vais bien.` / `Ça va bien.` / `Ça va aller.` — which also leak `aller`/futur against `chunk-ca-va`'s explicit guard); **futur proche in any form, including recognition** (`je vais + inf.` does not appear in L18; FP-C belongs at the end of L20, and neither shipped L7 nor shipped L17 previewed it); **the phantom repair trio** (`je ne comprends pas` / `vous pouvez répéter ?` / `c'est pas grave`); **past/future**; **object-pronoun production**; or **open Q&A / free chat** — even if the French is correct. The reveal is **hardcoded/static** (`model-answer-only`); live evaluation stays paid-zone.

> **L19 note (recombination and recovery, not new curriculum and not adaptivity).** L19 **recombines shipped L0-L18 material and introduces 0 new systems, 0 architecture verbs and 0 lexical items**. Its distinct job - the one L16 structurally could not do - is a **two-sided exchange**: the learner greets, asks a person how they are, hears, answers about themselves, asks what a place is like, acts on it and closes. **At least one beat must cross the person side with the task/movement side** (e.g. `Ça ne va pas ? Il faut faire une pause.`); a candidate that runs the two halves in separate screens has produced a review, not an integration.
>
> **Two guardrails are specific to this lesson and easy to violate.** First, **"weak-point recovery" is the mastery/review mechanism, never French conversational repair language** - the orphaned rail (`je ne comprends pas`, `vous pouvez répéter ?`, `c'est pas grave`) stays out no matter how the historical word "repair" reads. Second, **no adaptive runtime behaviour exists.** A shipped lesson is a static screen list; nothing swaps, injects or reorders screens by learner weakness, and the Carryover Selector is unwired. AI must **not** generate copy claiming the lesson targets the learner's weak spots, and must **not** describe personalization the app cannot perform. The genuine recovery lever is authoring-side: **production beats must be `weave` or `fill-with-traps`** (the only primitives the Practice Hub can reuse) and should give the band's thinnest-covered items - `adj-fatigue`, `adj-content`, `chunk-on-y-va`, `word-y-place` - more authored material to be offered from.
>
> The **second A Small Moment recurrence** stays inside L16's bounds (<=2-3 lines, present scope, known-items-only, `model-answer-only`, 0 active-new) and differs only in shape: a **two-voice** read containing a question and its answer, which the learner **continues** rather than answers, with a comprehension-level action. It is not a framework change and not free-form storytelling. The **L18 host asymmetry still binds**: `C'est comment ?` takes no French answer, and `Ça va.` / `Je suis fatigué(e).` answer the PERSON question only. AI must **not** introduce any acquisition, broader feelings or descriptive vocabulary, a second question word, past/future, futur proche, bare `faire`, object pronouns, or an advice register - even if the French is correct. The reveal is **hardcoded/static**; live evaluation stays paid-zone.
>
> **L20 note (capability proof, not novelty; and one preview that must stay a preview).** L20 is the **Pre-Campfire capability checkpoint** and the **first shipped Milestone**. It introduces **0 systems, 0 architecture verbs, 0 lexical items** and its whole job is to **test more than it teaches**: the learner carries one small owned moment end to end and **chooses** which capabilities it needs. AI must generate **recombination of genuinely owned material only**, and must not add anything new to make the milestone feel important.
>
> **Three failure modes are specific to a milestone.** First, the **coverage sweep**: "capability proof" reads as "show everything", but a lesson that parades every owned system tests recall, not integration — the moment must **hang together**, and forcing in a place question or a movement line to cover an earlier lesson is a defect, not thoroughness. Second, **invented machinery**: `journeyRole` has **no runtime consumer**, no gate, unlock, score or threshold exists, and AI must **not** generate copy implying one. Third, **premature arrival**: L20 is PRE-Campfire, L21–L24 still exist, and no copy may say the journey is complete.
>
> **Support must be withdrawn, not made hostile.** The ladder is **2 → 1 → 0** with **no required `suggestedPieces` anywhere**; a `hintCloze` may hold a shape but must not spell the answer, and success must never require transcribing one long canonical string. **Route choice uses only existing infrastructure** — `expectedAnswers` + `acceptedAlternatives` on weaves, `model-answer-only` on the say-it — and **every alternative offered must be independently owned**, because a choice between an owned and an unowned route is a trap rather than a choice.
>
> **FP-C is the one thing here that touches unowned French, and it is fenced structurally rather than by restraint.** It is exactly one `insight-card` with **no `targetItemIds` and no `itemId`**, carrying **`Je vais faire une pause.`** Both halves are already met (`je vais` frozen at L7, `faire une pause` a package from L9); only the joint is new, and it sits one word from the owned `Il faut faire une pause.` so the contrast needs no grammar. Because an insight-card is neither a production primitive nor a Practice-Hub-reusable one, and because `examples` has no `itemId` field, the card **cannot** become a target, a demand, a drill or a practice source. AI must **not** mint a futur-proche identity, produce or elicit the form, add a second example, conjugate `aller`, explain how futur proche is formed, list it in the recap, or claim L7 or L17 previewed it. The card must read as *"I can see where French is going next"* — never *"I am now expected to use this."* Full futur proche stays at/after Campfire.
>
> **L21 note (one answer, not a vocabulary door).** L21 is **Evaluation**, and its whole job is to close a gap the curriculum created itself: L18 shipped `Le café, c'est comment ?` with **no owned French answer**, and canon recorded that the question takes none. L21 gives the learner that answer and **nothing else**. AI must treat this as a **one-word doorway**: `adj-bon` is the only acquisition, and `C'est bon.` / `Ce n'est pas bon.` are authored compositions of it with hosts the learner already has.
>
> **Three failure modes are specific to a one-word doorway.** First, the **frozen chunk in disguise**: a lesson that only ever produces `C'est bon.` has taught a phrase, not a word — which is why both polarities and both roles are mandatory. Second, **adjective drift**: adding a second adjective "for variety" turns a bounded doorway into the vocabulary dump archetype #9 warns about, and `bon` being typed `adjective` authorizes no other adjective use. Third, **polysemy**: `C'est bon.` also means *"that's enough / that's fine"* in everyday French, so every use must evaluate a **nameable owned thing** and no scene may make the other reading plausible.
>
> **What must NOT be inferred.** Owning `bon` does **not** open `c'est + any adjective` as an engine, does not open agreement or placement, and does not make `C'est comment ?` generally answerable. And L21 owns **one** identity: any copy, reveal, recap chip or Mon Lexique entry implying that `c'est` itself is newly owned is a defect.
>
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
