# L8 — Où / Location & Movement Questions (Lesson Spec)

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/canonical-item-id-convention-v0.1.md` + `docs/syllabus/ai-generation-contract-v1.md` + the L1–L7 pilots + the L1–L5 retrospective.
> Planning/spec document only — authorizes **no** code, content, flag, or runtime change. Locked product canon wins on conflict.

> **PILOT.** First **Negation / Question / Social Choice** lesson since L3, **adapted as "Question / Location Control."** It hands the learner **one** question word — **`où` (where)** — as a practical control tool, so they can **ask** where things are and where someone is going (and answer), turning L7's movement *statements* into a two-way movement loop. It deliberately **does not** open the French question-formation system: `est-ce que`, inversion, and the other question words (`comment` / `pourquoi` / `quand`) stay **recognition / future-hook or deferred**, protecting later commercial depth. §18 records the findings.

> **Archetype**: primary = **Negation / Question / Social Choice** (#3), used as **Question/Location Control**. Secondary (flavor only, not a second budget) = **Thematic Vocabulary / Context** (#9) — light location context only. **New grammar systems: 0. Full question-formation ownership: 0.**

---

## Canon Alignment Note (read first)

Spine: **L0 → L1 → L2 → L3 → L4 → L5 → L6 → L7 → L8 (this)**. L8 is the **question half** of the movement engine L7 opened: L7 §7 explicitly named *"question expansion: `où tu vas ?` / `où est-ce que tu vas ?`"* as a carry-out hook. L8 **cashes the `où` half** of that hook and leaves the `est-ce que` half for a later question lesson.

**Continuity with L7 (movement statement → movement question).** L7 gave the learner `je vais à + place`, `on va à + place`, `je voudrais aller à + place`, `je ne vais pas + place` — all **statements**. L8 adds the **`où` control** so the learner can now **ask**: `Où est … ?`, `C'est où ?`, `Tu vas où ?` — and answer with the L7 frames. The futur proche held back in L7 stays held back; L8 adds **no** new tense.

**What L8 is *not*:**
- **not** a full French question-formation lesson (own **one** question word, `où`, not the system — mirrors the L3 guardrail: "own one dominant target, not the whole grammar system");
- **not** an `est-ce que` lesson (`où est-ce que tu vas ?` = recognition/future-hook only);
- **not** an inversion lesson (`où vas-tu ?` / `où allez-vous ?` = recognition/future-hook only);
- **not** a location-preposition system lesson (`dans / sur / sous / devant / derrière` **not** introduced; `à/au/à la` stay supported movement pieces from L7);
- **not** a `y` lesson (`j'y vais` / `on y va` stay recognition/deferred);
- **not** a travel/location-vocabulary dump (place/object nouns are all **recycled** from L5/L7 — see §6).

**Café-centricity (continues the L6/L7 fix):** café appears only as a **recycled, light** object of a question (`Où est le café ?`, `Je ne vais pas au café`), never as the centre. The scene is a **new place after class** (orientation/help), not a café order.

**Legacy mapping divergence (flag).** `CLAUDE.md`'s legacy 24-lesson dev-apk list maps **L8 = Numbers/Time/Money** (and **L7 = Questions I**). The **v1 syllabus spine** (this document set, the newer active canon) maps **L7 = Aller**, **L8 = Où / location & movement questions**. Per the Master Pipeline precedence rule (*newer active canon > codebase canon > older active canon*), this spec follows the **v1 spine**; the legacy bracket is noted, not adopted. Runtime/dev-apk (L1–L5 only) is unaffected — planning canon ahead of runtime.

**ID-convention finding (surfaced — see §18).** L8 is the **first lesson to hit accent-stripping homograph collisions**: `où` (where) → `ou` collides with `ou` (or); `là` (there) → `la` collides with the article `la`. This spec uses **disambiguated IDs** (`word:ou-where`, `word:la-there`) and recommends an ID-convention clarification (convention §11 already lists "Homographs / multiple meanings" as open).

---

## 1. Lesson Identity

| Field | Value |
|---|---|
| **Lesson number** | L8 |
| **Lesson title** | Where Is It? (Où / Location & Movement Questions) |
| **Journey phase** | First Ascent (Core 150) · *(legacy bracket diverges — see Canon Alignment Note)* |
| **Lesson archetype** | primary `negation-question-social-choice` *(as Question/Location Control)* · secondary (flavor only) `thematic-vocabulary` *(light location context)* |
| **Estimated lesson time** | ~5–6 min |
| **Monolingual mode / explanation language** | `english-guided` |
| **Practice Pool expansion level** | Build + Stretch + Challenge (transformation-heavy: statement ↔ question) |
| **Main can-do outcome** | "I can **ask and answer simple 'where?' questions** — `Où est … ?`, `C'est où ?`, `Tu vas où ?` — about places, objects, and where someone is going, using engines I already know, and recover politely if I don't understand." |
| **Pedagogical reason** | L7 let the learner **state** movement but not **ask** about it. L8 adds the **single most useful question word for a beginner — `où`** — as a control tool, completing the movement loop (ask + answer) and giving the first real two-way exchange. It does this through **frame-based** and **spoken end-placement** question shapes that need **no** `est-ce que` and **no** inversion, so the learner gains a powerful capability **without** the heavy question-formation machinery (deferred to protect later paid depth). It reuses L3's yes/no-question awareness, L5's place/object nouns, and L7's movement frames. |

---

## 2. Prerequisite Check

| Field | Value |
|---|---|
| **Assumed from L0–L7** | greeting + polite request + rescue (L1); être / `c'est` / `c'est pas grave` (L2); yes/no-question awareness + tu/vous social choice + `ne…pas` (L3); `j'ai besoin de` / human-need context (L4); `un/une` + `le/la` identification + place/object nouns (L5); human/help context + `aide`/`comprendre` (L6); **aller movement** `je vais / on va / je voudrais aller / je ne vais pas + place` (L7). |
| **Required prior chunks** | `chunk:bonjour` · `chunk:excusez-moi` · `chunk:c-est` · `chunk:c-est-pas-grave` · `chunk:je-ne-comprends-pas` · `chunk:pouvez-vous-repeter` · `chunk:je-vais` · `chunk:on-va`. |
| **Required prior grammar / phenomena** | `phen:tu-vous-register` (L3 — to choose `tu vas où ?` vs `vous allez où ?`) · yes/no-question awareness (L3 — the first question doorway) · `phen:movement-aller` (L7 — answers reuse `je vais à + place`) · `le/la` identification (L5 — `où est **le** café ?`). |
| **Required prior sound / writing awareness** | elision (`c'`, `j'`) light; no new sound system required. |
| **Required prior verb forms** | present `est` (être, recycled L2), `je vais` / `on va` (L7). **`tu vas` / `vous allez` were recognition-only in L7** — here they appear **inside fixed question chunks** as **supported**, not as new active conjugation. |
| **Genuinely new items** | **`word:ou-where`** (`où` — where) · **`word:ici`** (here — promoted from the L0 `chunk:je-suis-ici`) · **`word:la-there`** (`là` — there) · **`frame:ou-est-plus-noun`** (`Où est ___ ?`) · **`frame:c-est-ou`** (`C'est où ?`) · the answer frame **`frame:noun-est-ici-la`** (`La maison est là.`). |
| **`où` / `ici` / `là` / `là-bas` status (explicit)** | `où` = **active** (the lesson's control word) · `ici` = **active** (promoted from recognition) · `là` = **active/supported** · `là-bas` (over there) = **recognition only** if included. |
| **`est-ce que` / inversion status (explicit)** | **recognition / future-hook ONLY.** `Où est-ce que tu vas ?`, `Où allez-vous ?`, `Où est-ce que c'est ?` are **shown** (input), **never** production targets. Full question-formation ownership = **0**. |
| **Unseen / deferred** | full `est-ce que` question formation · inversion · other question words (`comment` / `pourquoi` / `quand` / `qui` / `que`) · `y` (place pronoun) · location prepositions (`dans / sur / sous / devant / derrière`) and the full `à/au/à la/aux` system · futur proche **production** (still deferred from L7) · any past/future system. All allowed **only** as recognition or not at all. |

---

## 3. Engine Plan

> One dominant new full-cycle engine (**the `où` where-question**), two short/supported satellites, recognition-only flavor for the deferred question machinery. Mirrors the L3 discipline: **own one question target, not the system.**

| Engine | Depth | Why it exists |
|---|---|---|
| **A — `Où est … ?` / `C'est où ?`** | **full-cycle** (the one new engine) | The lesson's main target: **ask where something is**, and **answer**. Frames `frame:ou-est-plus-noun` and `frame:c-est-ou`; answers via `frame:noun-est-ici-la`. Examples: *Où est la maison ? · Où est le café ? · Où est la table ? · C'est où ? · La maison est là. · Le café est ici.* |
| **B — Movement question with *aller*** | short-cycle / **supported** | Turn L7's movement statements into questions using **spoken end-placement**: `frame:tu-vas-ou`, `frame:vous-allez-ou`, `frame:on-va-ou`. Examples: *Tu vas où ? · Vous allez où ? · On va où ?* answered with L7's *Je vais à la maison. · On va à Paris.* **Not** a full *aller* conjugation lesson — only forms already recognition/supported from L7, marked carefully (§2). |
| **C — Polite location help** | short-cycle | Wrap the where-question in L1 politeness + rescue: `chunk:excusez-moi-ou-est` + the rescue set. Examples: *Excusez-moi, où est la maison ? · Excusez-moi, où est le café ? · Je ne comprends pas. Pouvez-vous répéter ?* |
| **Recognition — `est-ce que` / inversion (future hook)** | **recognition only** | `frame:ou-est-ce-que-plus-clause` (`Où est-ce que tu vas ?`), `chunk:ou-allez-vous` (inversion), `chunk:ou-est-ce-que-c-est` are **met, not produced.** They show the learner that richer question shapes exist later. **No production required.** |
| **Ambient — broader question awareness** | ambient (recognition) | The idea that French has several "question registers" (spoken end-placement → `est-ce que` → inversion) is **glimpsed**, not taught. |

**Why this is not a full question-formation lesson.** L8 owns exactly **one** question word (`où`) through the **two most beginner-safe shapes** — the fixed `Où est … ?` frame and **spoken end-placement** (`Tu vas où ?`), neither of which needs `est-ce que` or inversion. Every other question mechanism is recognition or deferred (§2). This is the same restraint L3 used with `ne…pas` (own one target, not the system).

**Why this follows L7 naturally.** L7 ended with movement *statements* and explicitly flagged `où`-questions as the carry-out. L8 reuses the **identical** L7 frames and simply makes them interrogative (`je vais à la maison` ↔ `tu vas où ?` → `je vais à la maison`). The learner adds a question word, not a new engine from scratch.

**Why this does not become a location-preposition lesson.** Answers use the **deictic adverbs** `ici` / `là` (here/there), **not** a preposition set; `à/au/à la` stay the supported movement pieces from L7; `dans/sur/sous/devant/derrière` are **not** introduced. Place/object nouns are all **recycled** (L5/L7) — no new location vocabulary.

---

## 4. Opening Sentence Family

> **Human scene, not a question-grammar list.** *"You're in a new place after class. You're tired, you need help — and now you can **ask where something is** and **where someone is going**."*

| Role | Sentence | Note |
|---|---|---|
| **Open** | `Bonjour.` | L1 greeting (recycled) |
| **Polite where-question (anchor)** | `Excusez-moi, où est la maison ?` | **new core**: `excusez-moi` + `où est + place` |
| **Bare where-question** | `C'est où ?` | **new core**: shortest natural "where is it?" |
| **Answer (here/there)** | `La maison est là.` | answer frame `___ est là/ici` |
| **Where-question (object)** | `Où est le café ?` | café recycled/light, as an object of the question |
| **Negated movement (recycled)** | `Je ne vais pas au café.` | L7 (recycled) |
| **Movement question** | `Tu vas où ?` | spoken end-placement (supported) |
| **Movement answer (recycled)** | `Je vais à la maison.` | L7 (recycled) |
| **Rescue (recycled)** | `Je ne comprends pas. Pouvez-vous répéter ?` | L1 rescue, in context |
| **Reassure (recycled)** | `C'est pas grave.` | L2 chunk, natural repair |

- **Interchangeable pieces**: `où est { la maison / le café / la table }` · `tu vas où ?` / `vous allez où ?` / `on va où ?` · answer `{ la maison / le café } est { ici / là }` · movement answer `je vais à { la maison / Paris }`.
- **Fixed frames**: `frame:ou-est-plus-noun` · `frame:c-est-ou` · `frame:noun-est-ici-la` · `frame:tu-vas-ou` · `frame:vous-allez-ou` · `frame:on-va-ou` · `chunk:excusez-moi-ou-est`. *(Recognition only)* `frame:ou-est-ce-que-plus-clause`.
- **Replaceable slots**: the **noun** after `où est` (closed set: `la maison`, `le café`, `la table` — all recycled L5/L7); the **deictic** in the answer (`ici` / `là`); the **subject** in movement questions toggles `tu` / `vous` / `on` (supported chunks, not free conjugation).
- **Anchor**: `Excusez-moi, où est la maison ?` · **Variations**: `Où est le café ?`, `C'est où ?`, `Tu vas où ?` · **Contrast**: `Tu vas où ?` (spoken end-placement — owned) vs `Où est-ce que tu vas ?` (est-ce que — **recognition only**, shown side-by-side so the learner feels the register difference without owning it).
- **Rescue / natural sentence**: `Je ne comprends pas. Pouvez-vous répéter ?` (+ `c'est pas grave`).
- **Forbidden / not-yet-ready substitutions**:
  - **no `est-ce que` production** (`Où est-ce que tu vas ?` = recognition input only);
  - **no inversion** (`Où vas-tu ?`, `Où allez-vous ?` = recognition only);
  - **no other question words** (`comment`, `pourquoi`, `quand`, `qui`, `que`);
  - **no `y`** (`j'y vais` / `on y va` stay recognition/deferred);
  - **no location prepositions** (`dans la maison`, `sur la table` — not this lesson);
  - **no new place/location nouns** (closed recycled set only);
  - **no futur proche production** (`je vais manger` stays recognition, from L7);
  - **no past/future system**.

---

## 5. Item Budget

> Question/transformation lesson → **recycled runs high** (it *operates on* L5/L7 engines), so **active-new sits at the low end** (archetype #3 = ~8–12; **L8 targets ~6–9**). Per template §6, the tiers are not all maxed at once.

| Tier | This lesson | Target band (this lesson) | Notes |
|---|---|---|---|
| **Active — new** | **7** | ~6–9 | `word:ou-where`, `word:ici`, `word:la-there`, `frame:ou-est-plus-noun`, `frame:c-est-ou`, `frame:noun-est-ici-la`, `phen:where-question` |
| **Supported — new** | **9** | ~8–11 | `frame:tu-vas-ou`, `frame:vous-allez-ou`, `frame:on-va-ou`, `chunk:excusez-moi-ou-est`, `phen:movement-question`, `phen:ou-end-placement`, `chunk:la-maison-est-la`, `chunk:le-cafe-est-ici`, `sound:ou-accent-grave` |
| **Recognition / ambient** | **10** | ~9–13 | `frame:ou-est-ce-que-plus-clause`, `chunk:ou-allez-vous`, `chunk:ou-est-ce-que-c-est`, `phen:est-ce-que-preview`, `phen:inversion-preview`, `word:la-bas`, `phen:deictic-ici-la-la-bas`, `sound:liaison-vous-allez`, `cog:la-in-voila`, recycled aller-paradigm recognition (`tu vas` / `vous allez`) |
| **Recycled from L1–L7** | **~15** | ~16–22 | bonjour, excusez-moi, c'est, c'est pas grave, est (être), ne…pas, tu/vous, le/la, café, table, maison, Paris, je vais à + place, on va à + place, je ne vais pas, je ne comprends pas, pouvez-vous répéter |
| **Traps (option-only)** | **3** | — | `trap:ou-est-ce-que-overload`, `trap:inversion-too-early`, `trap:location-preposition-dump` |
| **Total exposure** | **~41** | ~35–42 | upper end of band (transformation lessons recycle heavily) |
| **Production targets** | **6 sentences** | ~5–7 | Où est la maison ? · C'est où ? · La maison est là. · Excusez-moi, où est le café ? · Tu vas où ? · Je vais à la maison. (recover: Je ne comprends pas. Pouvez-vous répéter ?) |

> **Does L8 feel too heavy after L7?** **Moderate, controlled.** L8 sits at the **upper end** of total exposure because it recycles L5+L7 heavily, but active-new is **low (7)** and **almost entirely function words/frames** (`où`, `ici`, `là`) rather than new systems — cognitively lighter than it looks. The real load is **transformation** (statement ↔ question), not acquisition. If smoke shows strain, drop `frame:on-va-ou` to recognition and trim a recognition item — **do not** add place nouns, `est-ce que`, or inversion.

---

## 6. Item Tables

> Shared columns: label · canonical ID (**v0.1 `prefix:slug`**) · learner meaning · status · first-seen/reused · Mon Lexique behavior · review hook · weak-point. IDs are **internal**. ASCII IDs strip accents — and because that collides `où`→`ou` (with "or") and `là`→`la` (with the article), this spec uses **disambiguated IDs** `word:ou-where` / `word:la-there` (see §18).

### 6.1 Active items (new)

| Label | Canonical ID | Meaning | Status | First seen / reused | Mon Lexique | Review hook | Weak-point |
|---|---|---|---|---|---|---|---|
| où | `word:ou-where` | where | active (new) | L8 | new | +1d,+3d | `weak:ou-accent`, `weak:question-overload` |
| ici | `word:ici` | here | active (promoted) | L8 (from L0 `je suis ici`) | updated→standalone | +3d | deictic |
| là | `word:la-there` | there | active/support | L8 | new | +3d | deictic, `weak:la-vs-article` |
| (where is + noun?) | `frame:ou-est-plus-noun` | "Where is ___ ?" | active (new) | L8 | new | +1d | `weak:question-overload` |
| C'est où ? | `frame:c-est-ou` | "Where is it?" | active (new) | L8 | new | +1d | end-placement |
| (___ is here/there) | `frame:noun-est-ici-la` | "___ is here/there" | active (new, answer) | L8 | new | +3d | deictic |
| where-question | `phen:where-question` | asking location with *où* | active (phenomenon) | L8 | n/a | — | `weak:question-overload` |

### 6.2 Supported items (new)

| Label | Canonical ID | Meaning | Status | First seen | Mon Lexique | Weak-point |
|---|---|---|---|---|---|---|
| Tu vas où ? | `frame:tu-vas-ou` | "Where are you going?" (informal) | supported (movement Q) | L8 (L7 `tu vas` recog.) | new | `weak:movement-question`, `weak:tu-vous-register` |
| Vous allez où ? | `frame:vous-allez-ou` | "Where are you going?" (formal) | supported | L8 (L7 `vous allez` recog.) | new | `weak:tu-vous-register` |
| On va où ? | `frame:on-va-ou` | "Where are we going?" | supported | L8 (L7 `on va`) | new | `weak:movement-question` |
| Excusez-moi, où est… ? | `chunk:excusez-moi-ou-est` | "Excuse me, where is…?" | supported (polite Q) | L8 (L1 `excusez-moi`) | new | register |
| movement question | `phen:movement-question` | asking destination with *aller* | supported (phenomenon) | L8 | n/a | `weak:movement-question` |
| *où* end-placement | `phen:ou-end-placement` | spoken French can put `où` at the end (`tu vas où ?`) | supported (phenomenon) | L8 | n/a | placement |
| La maison est là. | `chunk:la-maison-est-la` | "The house is there." (answer model) | supported | L8 | new | deictic |
| Le café est ici. | `chunk:le-cafe-est-ici` | "The café is here." (answer model) | supported | L8 | new | deictic |
| où vs ou (writing) | `sound:ou-accent-grave` | `où` (where) takes the grave accent to distinguish it from `ou` (or) **in writing** | supported (1 light note) | L8 | n/a | `weak:ou-accent` |

### 6.3 Sentence frames

| Label | Canonical ID | Meaning | Status | Fixed part | Slot(s) | Allowed fillers |
|---|---|---|---|---|---|---|
| where is + noun | `frame:ou-est-plus-noun` | "Where is ___ ?" | active (new) | `Où est ___ ?` | place/object noun | la maison, le café, la table |
| where is it | `frame:c-est-ou` | "Where is it?" | active (new) | `C'est où ?` | — (fixed) | — |
| answer here/there | `frame:noun-est-ici-la` | "___ is here/there" | active (new) | `___ est ___` | noun + deictic | (la maison/le café) + (ici/là) |
| you go where (informal) | `frame:tu-vas-ou` | "Where are you going?" | supported | `Tu vas où ?` | — (fixed chunk) | — |
| you go where (formal) | `frame:vous-allez-ou` | "Where are you going?" | supported | `Vous allez où ?` | — (fixed chunk) | — |
| we go where | `frame:on-va-ou` | "Where are we going?" | supported | `On va où ?` | — (fixed chunk) | — |
| **where + est-ce que (preview)** | `frame:ou-est-ce-que-plus-clause` | "Where … ?" (richer register) | **recognition only** | `Où est-ce que ___ ?` | clause | *(input only — never required)* |

### 6.4 Full sentence items

| Label | Canonical ID | Sentence | Status |
|---|---|---|---|
| anchor | `sent:l08-excusez-moi-ou-est-la-maison` | Excusez-moi, où est la maison ? | active |
| bare | `sent:l08-c-est-ou` | C'est où ? | active |
| answer | `sent:l08-la-maison-est-la` | La maison est là. | active/support |
| object | `sent:l08-ou-est-le-cafe` | Où est le café ? | active |
| movement Q | `sent:l08-tu-vas-ou` | Tu vas où ? | supported |
| preview | `sent:l08-ou-est-ce-que-tu-vas` | Où est-ce que tu vas ? | recognition (future hook) |

### 6.5 Grammar / phenomenon tags

| Label | Canonical ID | Note | Status |
|---|---|---|---|
| where-question | `phen:where-question` | asking location with `où` (`Où est… ?` / `C'est où ?`) — the owned target | active |
| movement question | `phen:movement-question` | asking destination with *aller* (`tu vas où ?`) | supported |
| *où* end-placement | `phen:ou-end-placement` | spoken French allows `où` at the end of a movement question | supported |
| est-ce que preview | `phen:est-ce-que-preview` | `est-ce que` is a richer question wrapper — **previewed, not owned** | recognition |
| inversion preview | `phen:inversion-preview` | inversion (`où vas-tu ?` / `où allez-vous ?`) — **previewed, not owned** | recognition |
| deictic ici/là/là-bas | `phen:deictic-ici-la-la-bas` | here / there / over there — pointing words, **not** prepositions | recognition (là-bas) |

### 6.6 Sound / writing tags

| Label | Canonical ID | Fact | Status |
|---|---|---|---|
| *où* grave accent | `sound:ou-accent-grave` | `où` (where) and `ou` (or) are **pronounced the same** (`/u/`); the grave accent distinguishes them **only in writing** | supported (1 light note) |
| *vous allez* liaison | `sound:liaison-vous-allez` | optional liaison `vous‿allez`; recognition only (this form is recognition) | recognition |

> **0 major** sound/writing insight; **1 light** note (`ou-accent-grave`, framed as a *writing* distinction, **not** a sound difference) + 1 recognition (`liaison-vous-allez`). **L8 is not a sound lesson** (template §7.6).

### 6.7 Trap tags (option text only)

| Label | Canonical ID | Distractor for | Trap reason |
|---|---|---|---|
| est-ce que overload | `trap:ou-est-ce-que-overload` | `Tu vas où ?` / `Où est… ?` | reaching for `Où est-ce que tu vas ?` when the simple spoken/frame form is enough — `est-ce que` is **not owned yet** |
| inversion too early | `trap:inversion-too-early` | `Tu vas où ?` / `Vous allez où ?` | producing `Où vas-tu ?` / `Où allez-vous ?` (inversion) — **recognition only**, not a production target |
| location-preposition dump | `trap:location-preposition-dump` | `Où est la maison ?` | adding `dans / sur / sous …` ("où est la maison dans la ville ?") — the preposition system is **deferred** |

### 6.8 Cognate / root / sound-bridge items

| Label | Canonical ID | Bridge | Status |
|---|---|---|---|
| *là* inside *voilà* | `cog:la-in-voila` | `là` ("there") is hidden in `voilà` (`voi-là` = "see there") — a recognition memory hook | recognition |

> `où` / `ici` / `là` are short function words with no clean English cognate; the only bridge offered is the `là`↔`voilà` echo (recognition).

### 6.9 French-specific contrast / transfer trap

| Label | Canonical ID | Contrast | Status |
|---|---|---|---|
| Where is X? → `Où est X ?` | `phen:where-question` (applied) | French asks location with `où est …` — a fixed, easy frame | active (Why-This-Works) |
| spoken "where are you going?" → `Tu vas où ?` | `phen:ou-end-placement` | natural spoken French puts `où` at the **end** — beginner-friendly, **no** `est-ce que`/inversion needed | supported |
| `Où est-ce que tu vas ?` / `Où vas-tu ?` | `phen:est-ce-que-preview` / `phen:inversion-preview` | richer/formal registers — valid, **later layers**, recognition only | recognition |
| où (where) vs ou (or) | `sound:ou-accent-grave` | same sound `/u/`; the accent marks meaning **in writing** | supported |

> **New vs recycled discipline (flag §18):** genuinely new = `où`, `ici`, `là`, the where-question frames, and the answer frame. **Every place/object noun is recycled** (maison/café/table/Paris from L5/L7) — the explicit anti-travel-dump guard. The movement-question frames reuse L7 forms. The risk is **becoming a question-formation lesson** — guarded by withholding `est-ce que`, inversion, and the other question words.

---

## 7. Continuity Map

| Field | Value |
|---|---|
| **Carry-in from L1** | `bonjour`, `excusez-moi`, rescue (`je ne comprends pas`, `pouvez-vous répéter`). |
| **Carry-in from L2** | `c'est`, `c'est pas grave`, être / `est` (for `la maison est là`). |
| **Carry-in from L3** | yes/no-question awareness (the first question doorway), `tu`/`vous` social choice, `ne…pas` if needed. |
| **Carry-in from L4** | `j'ai besoin de` / human-need context (sets the help scene). |
| **Carry-in from L5** | `le`/`la` object/place identification, noun packages (`la maison`, `le café`, `la table`). |
| **Carry-in from L6** | human classroom/help context; `aide` / `comprendre` if useful. |
| **Carry-in from L7** | `je vais + place`, `on va + place`, `je voudrais aller + place`, `je ne vais pas + place` (the **answers** to L8's questions). |
| **New items introduced** | `où`, `ici`, `là`, where-question frames, answer frame (see §6). |
| **Carry-out to future** | full **question expansion** (`est-ce que`); **inversion**; other **question words** (`comment`, `pourquoi`, `quand`, `qui`, `que`); **`y`** as place pronoun (`j'y vais` / `on y va`); **location prepositions** (`dans/sur/sous/devant/derrière`) and the full `à/au/à la` system; movement/preposition refinement; future "A Small Moment"-style **navigation/help** reading scenes. |
| **Transformation plan** | see table below. |
| **Fade plan** | `où est … ?` and `tu vas où ?` move supported → active → expected; `est-ce que`/inversion stay recognition until their own lesson. |
| **Expected-production point** | "ask and answer where" assumed from L9 onward and in Daily Review. `est-ce que` / inversion / other question words are **not** expected until their own later lesson. |

**Transformation plan (carry-out):**

| Carried item | Transforms into | Lands in |
|---|---|---|
| `phen:where-question` (`où est …`) | full question expansion + `est-ce que` | later question lesson |
| `phen:movement-question` (`tu vas où ?`) | `Où est-ce que tu vas ?` / `Où vas-tu ?` as production | later question lesson |
| `phen:est-ce-que-preview` / `phen:inversion-preview` (recognition) | owned `est-ce que` / inversion | later (likely paid-zone) |
| `ici` / `là` (deictic) | location prepositions + `y` | later location/pronoun lesson |
| L8 where/movement Q&A | Practice Pool / Daily Review / navigation "A Small Moment" reading | ongoing |

**Transformation types used (engine §9):** ☑ same frame / new slot (noun into `où est`) · ☑ **question** (statement `je vais à la maison` ↔ `tu vas où ?`) · ☑ new subject (`tu`/`vous`/`on` in fixed Q chunks) · ☑ register / naturalness (spoken end-placement vs `est-ce que`/inversion — recognition) · ☐ negation (recycled only) · ☐ tense/aspect/mood doorway (none) · ☐ pronoun insertion (`y` deferred).

> **Principle check** (engine §8): introduces new (`où`, `ici`, `là`, the where-question) ✓ · grows old (recombines L2 `c'est`/être, L3 question awareness + tu/vous, L5 nouns, L7 movement) ✓ · prepares future (`est-ce que` / inversion / `y` / preposition hooks) ✓.

---

## 8. Tense / Aspect / Mood Doorway

| Form | Status here | Taught as chunk or grammar? | Future lesson that expands it |
|---|---|---|---|
| **present** | active (unchanged) | recycled (`est`, `je vais`, `tu vas`/`vous allez` in fixed Q chunks) | — |
| **aller (movement)** | recycled active (L7) — used in answers/questions | chunk/frame | later |
| **near future — `aller + infinitive` (futur proche)** | **still deferred** (recognition only, from L7) | preview, 0 ownership | later (paid-zone) lesson |
| **conditionnel** (`je voudrais aller`) | recycled supported (L6/L7) | chunk/frame | later |
| **past / future systems** | none | — | later |
| **imperative · `être en train de` · `venir de`** | none | — | later |

> Explicitly **not** in L8: any new tense; futur proche production; past/future; imperative. **The only doorway L8 opens is the *question* doorway — through `où`, not through a tense and not through the full question system.**

---

## 9. Sound / Writing Pattern

> Guardrail: **0 major, ≤1 minor** (template §7.6). **L8 takes one light writing note + one recognition; it is not a sound lesson.**

- **Light note — `où` vs `ou` is a *writing* distinction** (`sound:ou-accent-grave`): `où` (where) and `ou` (or) are **pronounced identically** (`/u/`); the grave accent separates them **only on the page**. (Accuracy point: this is **not** a pronunciation contrast — do not teach it as a sound difference.)
- **Recognition — `vous‿allez` liaison** (`sound:liaison-vous-allez`): recognition only, since `vous allez` is a recognition/supported form.
- **Not taught**: accents as a system; nasal vowels; the `là`/`la` accent beyond a passing mention. No sound block.

---

## 10. French-Specific Contrast / Transfer Trap

> Micro-contrasts only (template §7.10) — "Why This Works" / Natural Reveal fuel, not a grammar detour.

- **"Where is X?" → `Où est la maison ?`** A fixed, easy frame; no auxiliary gymnastics.
- **Spoken "where are you going?" → `Tu vas où ?`** Natural spoken French places `où` at the **end** — the beginner's gift: a real question with **no** `est-ce que` and **no** inversion. This is **useful and natural, but not the same as learning every question pattern.**
- **`Où est-ce que tu vas ?` / `Où vas-tu ?` are *later layers*.** Both valid; both shown for recognition; **neither is produced** in L8. Don't over-explain them — one line: "you'll own these richer question forms later."
- **`où` (where) vs `ou` (or):** same sound, different meaning — the accent lives in the spelling.

---

## 11. Exercise Flow Mapping

> Negation/Question weighting (archetype #3): **Why This Works (micro-contrast), Try It (trap repair), Shape It (statement↔question transformation)** are strong; new vocabulary intake is light. Weave It / Say It Your Way test **controlled where-question production**.

| Section | Purpose | Input used | Learner action | Expected output | Feedback style | Offline |
|---|---|---|---|---|---|---|
| **Meet It** | Meet the "new place / ask where" moment | `Excusez-moi, où est la maison ? — La maison est là.` (TTS) | listen, read | recognition | passive mirror | ✓ |
| **Notice the Pieces** | See `où` + `est` + place; and `tu vas` + `où` | highlighted `où` / `est` / place / end-`où` | tap the pieces | recognise the where-question shape | neutral | ✓ |
| **Why This Works** | One micro-contrast: `où est …` frame; spoken end-`où` (no est-ce que/inversion) | brief insight | read | recognition | none (insight) | ✓ |
| **Try It** | Pick the natural question (traps) | `___ est la maison ?` / `Tu vas ___ ?` | choose `Où`/`où`; reject `est-ce que`/inversion options | supported production | reveal + reason | ✓ |
| **Weave It** *(strong)* | Build a where-exchange | pieces given | assemble `Excusez-moi, où est le café ?` + answer | active production | model reveal + alternatives | ✓ |
| **Shape It** *(strong)* | Transform: statement ↔ question; `tu` ↔ `vous` ↔ `on` | swap | `je vais à la maison` → `tu vas où ?` → `je vais à la maison` | active/supported production | passive mirror | ✓ |
| **Say It Your Way** *(strong)* | Ask + answer in the new-place scene | "You're lost after class — ask where the café is, then say where you're going." | free write/say | active production | model-answer-only (no AI) + natural alternatives | ✓ |
| **Natural Reveal** | Why it's natural; spoken end-`où` vs richer registers | learner's attempt | read reveal | recognition | natural upgrade + register note | ✓ |
| **Stay With It** | Light retrieval: where-Q + movement + L6 human engines | mixed prompts | recall | active/supported | passive mirror | ✓ |
| **Lesson End** | Calm close, name the growth | recap card | read | — | passive mirror ("You can ask where things are now.") | ✓ |

**Weave It / Say It Your Way must test:** *ask where something is* (`Où est… ?` / `C'est où ?`) · *say where you're going* (`je vais à…`, recycled) · *ask where someone is going* (`tu vas où ?`) · *recover if you don't understand* (`je ne comprends pas, pouvez-vous répéter ?`). They must **not** require `est-ce que` or inversion production.

> No AI in L8 (`model-answer-only`, like L0–L7). TTS reads French only; never reads placeholders or IDs.

---

## 12. Natural Reveal / Feedback Plan

**Where-question (signature):**
- **Expected**: `Où est la maison ?` / `C'est où ?`
- **Acceptable alternatives**: `Excusez-moi, où est la maison ?`; `La maison, c'est où ?`; unaccented `ou` in fast typing (recognised, gently upgraded to `où`).
- **Natural upgrade**: add `excusez-moi` for politeness.
- **Common mistakes**: `ou est la maison` (missing accent — **writing** only); reaching for `Où est-ce que est la maison ?` (est-ce que overload); `Où est la maison dans la ville ?` (preposition dump). **Hint**: "`où` takes the little accent; and the simple `Où est … ?` is already a full question."
- **Weak-point tags**: `weak:ou-accent`, `weak:question-overload`.
- **Passive mirror**: "You asked where something is."

**Movement question:**
- **Expected**: `Tu vas où ?` / `Vous allez où ?` / `On va où ?`
- **Acceptable alternatives**: `Où tu vas ?` (also heard) — accept; note `tu vas où ?` is the most natural spoken order.
- **Common mistakes**: `Où vas-tu ?` (inversion — recognition only); `Où est-ce que tu vas ?` (est-ce que — recognition only). **Hint**: "In speech, you can just add `où` at the end: `tu vas où ?`"
- **Weak-point**: `weak:movement-question`, `weak:tu-vous-register`.

**Answer (here/there):**
- **Expected**: `La maison est là.` / `Le café est ici.`
- **Common mistakes**: confusing `ici`/`là` (gently mirrored — both are accepted while the deictic settles).
- **Weak-point**: deictic.

**Recognition forms (feedback is recognition-framed, never a production correction):**
- **Shown**: `Où est-ce que tu vas ?` / `Où allez-vous ?` — "These are richer ways to ask; you'll own them later. For now, `tu vas où ?` is perfect."
- **If the learner *attempts* `est-ce que` or inversion**: accept the meaning, mirror gently, tag `weak:question-overload`, and say it'll be taught later — **do not** teach `est-ce que`/inversion on the spot (contract §11).

**Common mistakes (lesson-wide watch list):** `ou` without the accent (where the spec wants `où`) · overusing `est-ce que` · inversion too early · `où tu vas` vs `tu vas où` nuance (both fine; teach the spoken end form) · hidden preposition overload · turning location into a travel-vocab list. **Passive mirror throughout; no scores, no reward language.**

---

## 13. Practice Pool Seeds

> Seed formats only — no full pool (engine §13).

| Seed type | Examples |
|---|---|
| **Build** | arrange: `Où / est / la / maison / ?` ; `Tu / vas / où / ?` |
| **Stretch** | swap the noun/subject: "ask where the café is / where the table is / where *we* are going" |
| **Challenge** | a where-exchange: "you're lost — ask politely where the café is, then say where you're going next" |
| **Listening traps** | `où` vs `ou` (writing) ; `tu vas où ?` vs `où est-ce que tu vas ?` (register) ; `ici` vs `là` |
| **Repair items** | `ou est la maison` → `où est la maison` ; `Où vas-tu ?` (inversion attempt) → `tu vas où ?` |
| **Transformation items** | `je vais à la maison` → `tu vas où ?` ; `le café est ici` → `où est le café ?` ; `tu vas où ?` ↔ `vous allez où ?` (register) |
| **Where-question items** | ask where a known place/object is (closed recycled set) |
| **Movement-question items** | ask where someone is going (`tu/vous/on`), answer with `je vais à + place` |

---

## 14. Daily Review Hooks

| Hook | Items |
|---|---|
| **Next-day (+1d)** | où est… ?, c'est où ?, où (+ accent) |
| **3-day (+3d)** | tu vas où ?, la maison est là / le café est ici, ici vs là |
| **7-day (+7d)** | excusez-moi où est… ?, où-question vs the est-ce que/inversion preview (recognition) |
| **Old-engine return** | L7 movement (`je vais à + place`) returns as the **answer** to L8 questions; L2 `c'est`/être returns in `c'est où ?` / `la maison est là` |
| **Weave review hook** | "Excuse me, where is the café? I'm going home, but I'm not going to the café." (mix known FR + English) |
| **Reading micro-paragraph (optional)** | 2–3 lines, known items only: *"Excusez-moi. Je ne comprends pas. Où est la maison ? — La maison est là. Merci. Je vais à la maison."* — comprehension check, no new vocabulary, **no est-ce que / inversion.** |

> Daily Review draws only from reached lessons; calm offer, never streak/score/pressure language.

---

## 15. Mon Lexique Output

> Mon Lexique = learner-facing memory of the engine, **not** a dictionary (engine §14). Canonical IDs internal; learner sees the simple surface (meaning · examples · where met · related · your sentences · confidence · optional note). **No IDs / status codes shown.** *(Mon Lexique is dev-apk out-of-scope — Master Pipeline Rule 8 — so this is planning output, mandatory per template §14 even though Mon Lexique is not built.)*

| Entry | Canonical ID | Learner-facing meaning | Where-used examples | Related pieces | Mastery event | Review hook |
|---|---|---|---|---|---|---|
| **où** | `word:ou-where` | where | "Où est la maison ?" · "Tu vas où ?" | où est…, c'est où, tu vas où | new | +1d,+3d |
| **ici** | `word:ici` | here | "Le café est ici." | là, je suis ici | updated (now standalone) | +3d |
| **là** | `word:la-there` | there | "La maison est là." | ici, voilà | new | +3d |
| **où est… ?** | `frame:ou-est-plus-noun` | "Where is …?" | "Où est le café ?" | où, c'est où | new | +1d |
| **c'est où ?** | `frame:c-est-ou` | "Where is it?" | "C'est où ?" | où, c'est | new | +1d |
| **tu vas où ?** | `frame:tu-vas-ou` | "Where are you going?" | "Tu vas où ?" | vous allez où, je vais | new | +3d |
| **vous allez où ?** | `frame:vous-allez-ou` | "Where are you going?" (formal) | "Vous allez où ?" | tu vas où | new | +3d |
| **on va où ?** | `frame:on-va-ou` | "Where are we going?" | "On va où ?" | on va, tu vas où | new | +3d |
| **(recognition) là-bas** | `word:la-bas` | over there — **a small preview, not a notebook entry yet** | "C'est là-bas." | là, ici | recognition | — |
| **(recognition) où est-ce que… ?** | `frame:ou-est-ce-que-plus-clause` | a richer way to ask "where"; **shown, not owned yet** | "Où est-ce que tu vas ?" | où, tu vas où | recognition (future hook) | — |
| **aller / je vais / on va** *(updated, recycled L7)* | `chunk:je-vais` / `chunk:on-va` | now also the **answers** to where-questions | "Tu vas où ? — Je vais à la maison." | tu vas où, on va où | updated (Q&A link) | +3d |
| **excusez-moi** *(updated)* | `chunk:excusez-moi` | excuse me → now opens a polite where-question | "Excusez-moi, où est le café ?" | où est…, pouvez-vous répéter | updated | +3d |
| **je ne comprends pas** *(carry-in)* | `chunk:je-ne-comprends-pas` | rescue when you don't understand the answer | "Je ne comprends pas. Pouvez-vous répéter ?" | pouvez-vous répéter, c'est pas grave | reused | +3d |
| **c'est / c'est pas grave** *(carry-in)* | `chunk:c-est` / `chunk:c-est-pas-grave` | "it is" / "it's okay" — used in `c'est où ?` and repair | "C'est où ?" · "C'est pas grave." | c'est où | reused | — |

---

## 16. AI Generation Compatibility

> Binds to `docs/syllabus/ai-generation-contract-v1.md`. L8 currently runs `model-answer-only` (no live AI), so this governs the *next* stage. Required inputs (contract §3) must be supplied; missing context → refuse/degrade, never guess.

Explicit L8 constraints:
- **AI may generate only controlled `où` / location / movement questions inside the allowed frames** — `frame:ou-est-plus-noun`, `frame:c-est-ou`, `frame:noun-est-ici-la`, `frame:tu-vas-ou`, `frame:vous-allez-ou`, `frame:on-va-ou`, `chunk:excusez-moi-ou-est` — filled only with the **closed recycled noun set** (`la maison`, `le café`, `la table`, + L7 places `Paris`).
- **AI must NOT introduce** full `est-ce que` formation, **inversion**, other question words (`comment` / `pourquoi` / `quand` / `qui` / `que`), or `y` — **even if the French is correct** (prerequisite-safety overrides validity, contract §2/§6).
- **AI must NOT introduce a travel-vocabulary dump** (no streets, directions, transport, landmarks) and must **not** introduce **location prepositions** (`dans/sur/sous/devant/derrière`).
- **AI must NOT introduce futur proche production** (still deferred from L7); `je vais + infinitive` stays recognition only.
- **AI may use at most 1–2 low-risk location nouns** beyond the set, **only** if marked `supported`/`recognition` — never a new system. Default: **stay inside the closed set.**
- **AI may show `est-ce que` / inversion only as recognition input** (the lesson's preview items), **never** as required production, and Natural Reveal must redirect, not teach, when a learner attempts them (contract §11).
- **Traps** come from `trap:ou-est-ce-que-overload` / `trap:inversion-too-early` / `trap:location-preposition-dump`; repair targets the lesson's `weak:` tags. Natural Reveal stays passive-mirror (contract §10).

**Proposed addition to the contract's §15 allowed/blocked table (propose for review — do NOT auto-apply):**

| Lesson | ✅ Allowed | 🚫 Blocked | Why blocked |
|---|---|---|---|
| **L8** | `Où est la maison ?` · `C'est où ?` · `Tu vas où ?` · `Excusez-moi, où est le café ?` · `Je vais à la maison.` | `Où est-ce que tu vas ?` · `Où vas-tu ?` / `Où allez-vous ?` · `Comment tu t'appelles ?` · `Où est la maison dans la ville ?` · `J'y vais.` | `est-ce que` and inversion are recognition-only; other question words (`comment`…), location prepositions (`dans`…), and `y` are all deferred |

---

## 17. QA Checks

| Check | Verdict |
|---|---|
| Begins with a usable human moment? | ✅ "lost in a new place after class — ask where the café/home is" |
| Sentence family, not one sentence? | ✅ 10-line where/movement exchange (§4) |
| Active / supported / recognition separated? | ✅ §5–§6 explicit |
| Every production item prerequisite-safe? | ✅ where-Q rides `c'est`/être + L5 nouns; movement-Q reuses L7; answers recycled |
| Unseen forms supported/recognition only? | ✅ `est-ce que`/inversion/other Q-words/`y`/prepositions all recognition or deferred |
| Grows available prior engines? | ✅ recombines L2 (`c'est`/être), L3 (question awareness + tu/vous), L5 (nouns), L7 (movement) — ≥3 returns |
| Avoids too many full-cycle engines? | ✅ **one** new full-cycle (`où` where-question); satellites short/supported/recognition |
| ≥ 1 meaningful production moment? | ✅ 6 production targets |
| Mon Lexique-compatible metadata? | ✅ §15, in canonical-ID form |
| Practice Pool + Daily Review hooks? | ✅ §13–§14 (+ optional reading micro-paragraph) |
| No streak/XP/reward language? | ✅ passive mirror throughout |
| Le Mot tone preserved? | ✅ calm, neutral, premium |

**Explicit concern flags (answered):**
- **Does L8 follow naturally from L7?** **Yes — strongly.** L7 produced movement statements and explicitly named `où`-questions as the carry-out. L8 reuses the identical frames as questions and adds one word (`où`). The Q&A loop (`tu vas où ? — je vais à la maison`) is the cleanest possible continuity.
- **Is it too much of a question-formation lesson?** **The main risk — guarded.** L8 owns **one** question word via **two beginner-safe shapes** (`où est …` frame + spoken end-`où`); `est-ce que`, inversion, and all other question words are recognition/deferred. If smoke shows it drifting toward "a grammar lesson about questions," demote `frame:on-va-ou` to recognition and lean harder on the human scene.
- **Is `est-ce que` leaking into ownership?** **No.** `frame:ou-est-ce-que-plus-clause` is recognition-only, 0 production; §8/§12/§16 block it; the contract row blocks it.
- **Is inversion leaking?** **No.** `chunk:ou-allez-vous` is recognition-only; explicitly trapped (`trap:inversion-too-early`).
- **Are location prepositions leaking?** **No.** Answers use deictic `ici`/`là`, not prepositions; `dans/sur/sous…` blocked; `à/au/à la` stay L7 supported pieces; explicitly trapped (`trap:location-preposition-dump`).
- **Is café creeping back too much?** **No.** Café appears only as a recycled, light **object** of a question; the scene is orientation/help, not a café order.
- **Are new place nouns too many?** **No — zero new place/object nouns.** All are recycled (maison/café/table/Paris). This is the explicit anti-travel-dump guard.
- **Is Mon Lexique output consistent with the canonical-ID convention?** ✅ §15 uses `prefix:slug`, ASCII IDs — **with disambiguated `word:ou-where` / `word:la-there` to avoid homograph collisions** (flagged §18).
- **Any unseen-form risk?** **Moderate** — the live risk is a learner (or future AI) reaching for `est-ce que`/inversion. Explicitly blocked in §8/§12/§16; feedback redirects without teaching.

---

## 18. L8 Pilot Findings

**Does the Où / location / movement question lesson work after L7?** **Yes — it's the natural next beat.** L7 gave the learner the ability to *state* where they're going; without a question word, that ability is half a conversation. `où` is the single highest-utility question word for a beginner, and L8 delivers it through shapes that need no new grammar machinery. The lesson feels like "now I can actually ask," which is a strong, motivating capability gain.

**Is the L7 → L8 continuity strong?** **Very.** L8 reuses L7's exact movement frames as **answers**, and L7's §7 carry-out literally pre-registered the `où` hook. The Q&A pair (`tu vas où ? — je vais à la maison`) closes a loop that L7 deliberately left open. This is the tightest lesson-to-lesson hand-off in the spine so far.

**Does L8 preserve paid-depth value by deferring full question systems?** **Yes.** The genuinely powerful, broadly-applicable capability — full question formation (`est-ce que`, inversion, the whole question-word family `comment/pourquoi/quand/qui/que`) — is **entirely withheld** (recognition or deferred). L8 spends only the **`où`/where** slice via the easiest shapes. The question system is a large later surface (potentially paid), and it stays intact.

**Should L9 be `faire`, `pouvoir`, or a second question layer?** **Recommendation: `faire` (second architecture verb) or `pouvoir`, *not* a second question layer yet.** L8 just opened questioning; stacking a second question lesson (`est-ce que`/inversion/other Q-words) immediately would feel like a grammar unit and risk overload. A high-frequency architecture verb (`faire` — "do/make", with idiomatic reach) keeps the verb-engine momentum and gives fresh production, while questioning consolidates in Daily Review. **`pouvoir`** ("can/be able to") is a strong alternative — it pairs naturally with the rescue/politeness register already active. Defer the **second question layer** (and futur-proche ownership) to later, likely paid, slots.

**Does L8 reveal any required patch to template / archetype / AI contract / ID convention?** Yes — one **notable ID-convention finding** plus minor archetype/contract notes (propose for review, do **not** auto-apply):
- **ID convention — homograph collision (notable).** L8 is the first lesson where the **accent-stripping ASCII rule collides distinct lexemes**: `où`(where)→`ou` clashes with `ou`(or); `là`(there)→`la` clashes with the article `la`. The convention §11 already lists "Homographs / multiple meanings" as open. **Recommendation:** adopt a **sense-suffix disambiguation for homographs** (`word:ou-where`, `word:la-there`, vs `word:ou` / `word:la` if those lexemes are ever needed), and add this rule to convention §4/§11. This spec uses the disambiguated form.
- **Archetype #3 (Negation/Question/Social Choice)** could gain an L8 note: *"This archetype also covers 'Question/Location Control' — owning a single question word (`où`) through a fixed frame + spoken end-placement, while `est-ce que`/inversion/other question words stay recognition/deferred. Active-new sits at the low end; recycled runs high."* (Companion to the L7 "split-sense" note.)
- **AI Generation Contract v1 §15** should gain the **L8 row** proposed in §16.
- **Template note:** `ici` is the second case (after L7's `je vais + infinitive`) of an item **promoted from a frozen chunk** (`chunk:je-suis-ici`, L0) to a **standalone** item — worth a one-line template note on chunk→word promotion as a continuity move.

**Does L8 provide enough material for the AI Generation Contract?** **Yes — a strong third fixture.** L6 stressed "don't add a useful word"; L7 stressed "don't promote a recognised form to production"; **L8 stresses "don't escalate a question to a richer register the lesson doesn't own"** (the `est-ce que`/inversion temptation) and **"don't turn a question word into a preposition/location lesson."** All three are high-value contract test cases.

---

## 19. Open Decisions

> Unresolved — listed, not silently decided.

- **L9 confirmation** — `faire` vs `pouvoir` vs a second question layer (this spec recommends `faire`/`pouvoir`, defer the question layer).
- **Homograph ID rule** — adopt the sense-suffix disambiguation (`word:ou-where`, `word:la-there`) into canonical-ID convention §4/§11?
- **`ici` / `là` depth** — both active, or `là` supported until a deictic/location lesson? (this spec: `ici` active, `là` active/support).
- **Second question layer slot** — which later (likely paid) lesson owns `est-ce que` + inversion + the other question words.
- **`y` introduction** — when `j'y vais` / `on y va` graduates from recognition to a pronoun lesson.
- **Spoken vs written register weighting** — how much to lean on spoken end-`où` (`tu vas où ?`) vs the more written `où est … ?`.
- **Archetype #3 "Question/Location Control" note** — whether to adopt the §18 note.
- **AI contract §15 L8 row** — whether to add the proposed allowed/blocked row.

---

*End of L8 Où / Location & Movement Questions pilot spec. Planning canon only — authorizes no code, content, flag, or runtime change. Full question-formation (est-ce que, inversion, other question words) is deliberately deferred; this lesson owns `où` as a practical where-control only. The Dev APK smoke test remains the boundary before any runtime work derived from this spec.*
