# L12 — Est-ce que / Yes-No Question Wrapper (Compact Lesson Spec)

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/canonical-item-id-convention-v0.1.md` + `docs/syllabus/ai-generation-contract-v1.md` + `docs/syllabus/L10-L20-band-map-v0.md` + **`docs/syllabus/L12-question-expansion-gate-review.md`** (Step 18A — the scope this spec implements) + the L8/L10/L11 pilots.
> **Compact spec** (intentionally shorter than the full template — see §1) — planning/spec only. Authorizes **no** code, content, flag, or runtime change. Locked product canon wins on conflict. Dev APK runtime (L1–L5 only) is unaffected.

> **Gate applied (Step 18A).** L12 owns **`est-ce que` as a yes/no wrapper only**, over **already-owned statements**, and **graduates L11's `est-ce que je peux …?` from recognition to owned**. It does **not** open question words, inversion, `qu'est-ce que`, `y`/`en`, broad pouvoir/faire, or any past/future. Full question-formation ownership = **0**. New grammar systems = **exactly 1 narrow control layer**.

> **ID-naming note (reconciliation — read first).** The Step 18A gate review and the band map name the wrapper frame **`frame:est-ce-que-plus-clause`**. The Step 18B brief proposed `frame:est-ce-que-plus-known-sentence` and `trap:qu-est-ce-que-too-early`. To **avoid forking IDs** (gate review §8), this spec uses the **already-canon IDs**: `frame:est-ce-que-plus-clause` (= "est-ce que + known sentence"), and reuses `trap:inversion-too-early` (L8) and `trap:qu-est-ce-que-overload` (L9). The brief's names are treated as **descriptive aliases**, not new IDs.

---

## 1. Lesson Identity

| Field | Value |
|---|---|
| **Lesson number** | L12 |
| **Lesson title** | Is It …? (Est-ce que / Yes-No Question Wrapper) |
| **Journey phase** | First Ascent (Core 150) · *(legacy bracket diverges — band map / v1 spine)* |
| **Primary archetype** | **Negation / Question / Social Choice (#3)**, as **"Question Expansion / Register-Upgrade Control"** (companion to L8's "Question/Location Control") |
| **Secondary archetype** | none as a budget; *light* Review/Integration flavor only (it recombines L2/L7/L11 statements) — must not add a second engine |
| **Estimated lesson time** | ~5 min |
| **Monolingual mode / explanation language** | `english-guided` |
| **Practice Pool expansion level** | Build + Stretch + Challenge (transformation-heavy: statement ↔ est-ce que question) |
| **Main can-do outcome** | "I can turn things I can already say into a **standard yes/no question** with `est-ce que` — `Est-ce que c'est ici ?`, `Est-ce que vous pouvez m'aider ?`, `Est-ce que je peux faire une pause ?`." |
| **Why a compact spec is sufficient** | L12 owns **one wrapper word + one frame** over **fully-owned** sentences (only genuinely new lexis is `est-ce que`). There is **no new vocabulary set, no new tense, no new verb engine** — so the full template's heavy item tables, sound-pattern section, and large continuity matrix would be padding. A compact spec captures everything that matters: the owned target, the deferred set, a small item table, the transformation flow, and the AI guardrail. (If review finds the wrapper needs more scaffolding than expected, promote to a full spec — see §12.) |

---

## 2. Owned Target

**Single owned target:** `est-ce que + [a statement the learner already owns]` → a standard-register **yes/no question**.

- The wrapper **does not change the known sentence core** — `c'est ici` stays `c'est ici`; `est-ce que` is simply prepended. This is the whole insight: *"put `est-ce que` in front of something you can already say, and it becomes a question."*
- It **lands the thrice-seeded hook** (`est-ce que` was recognition in L3, L8, L11) and **graduates `est-ce que je peux …?`** (L11 recognition → owned).

**Owned examples (all reuse owned engines):**
- `Est-ce que c'est ici ?` (L2 `c'est` + L8 `ici`)
- `Est-ce que tu vas à la maison ?` (L7 aller)
- `Est-ce que vous pouvez m'aider ?` (L11)
- `Est-ce que je peux faire une pause ?` (L11 — graduated from recognition)

**Deliberately avoided base (product-critical):** **`Est-ce que je ne fais pas ça ?`** — a **negative** yes/no question is pragmatically marked ("Am I not doing that?"), confusing as a beginner model, and risks blurring the clean "wrap an affirmative statement" mechanic. **Excluded.** (Negation stays inside the statement only when natural, e.g. answers, not as a wrapped question here.)

---

## 3. Not Owned / Deferred (explicit)

All of the following are **recognition-only or deferred** — never production targets in L12:

- **Inversion** — `Vas-tu à la maison ?`, `Allez-vous …?`, **`Puis-je …?`** (formal pouvoir inversion, carried from L11 recognition).
- **`qu'est-ce que`** — the object-question cousin (stays L9 recognition).
- **Question words** — `comment` · `pourquoi` · `quand` · `qui` · `que` · `combien` (the band map floated `comment`/`combien` at L12 — **this spec defers them** to a later "Question Expansion 2", per gate review §3/§9).
- **`où + est-ce que`** — `Où est-ce que tu vas ?` combines a question word *with* the wrapper → recognition only (keeps L12 to **yes/no**).
- **`quoi`** beyond the L9 in-chunk `tu fais quoi ?`.
- **`y` / `en`** (L14+).
- **broad pouvoir** (conditionnel `pourrais`, possibility `il se peut`, full paradigm) and **broad faire**.
- **past / future** (passé composé, imparfait, futur proche production).
- **the full question system** (embedded/indirect questions, the whole inversion + question-word machinery) — reserved post-Campfire ~L24.

---

## 4. Item Budget (planning targets, not validators)

| Tier | This lesson | Target band | Notes |
|---|---|---|---|
| **Active — new** | **5** | ~5–7 | `chunk:est-ce-que`, `frame:est-ce-que-plus-clause`, `phen:question-expansion-1`, graduated `frame:est-ce-que-je-peux-plus-infinitive` (L11→active), anchor `sent:l12-est-ce-que-vous-pouvez-m-aider` |
| **Supported — new** | **8** | ~7–9 | `est-ce que c'est …?`, `est-ce que tu vas …?`, `est-ce que vous pouvez …?`, `est-ce que je peux …?` (applications), `phen:question-register-upgrade`, intonation↔est-ce-que contrast, `chunk:est-ce-que-c-est`, `sound:est-ce-que-elision-reduction` (light) |
| **Recognition / ambient** | **10** | ~9–12 | inversion preview (`vas-tu`/`allez-vous`), `puis-je`, `qu'est-ce que`, `où est-ce que`, question-word family glimpse (`comment`/`pourquoi`…), casual `ne`-less / `tu vas à la maison ?` intonation, `qu'est-ce que tu fais ?` (L9) |
| **Recycled (L1–L11)** | **~18** | ~16–20 | c'est, ici, là, tu/vous, je vais à + place, tu vas où, vous pouvez m'aider, je peux faire une pause, je ne comprends pas, pouvez-vous répéter, c'est pas grave, bonjour, merci, oui/non/si, faire une pause, intonation yes/no |
| **Traps (option-only)** | **4** | — | `trap:full-question-system-overload`, `trap:inversion-too-early` *(reuse L8)*, `trap:question-word-dump`, `trap:qu-est-ce-que-overload` *(reuse L9)* |
| **Total exposure** | **~41** | ~35–45 | transformation-heavy: recycled high ⇒ active-new low (template §6) |
| **Production targets** | **6** | ~5–7 | Est-ce que c'est ici ? · Est-ce que tu vas à la maison ? · Est-ce que vous pouvez m'aider ? · Est-ce que je peux faire une pause ? · (intonation↔est-ce-que pair) · (recover) Je ne comprends pas. Vous pouvez répéter ? |

**Full-question ownership: 0. New grammar systems: 1 narrow control layer (`est-ce que` yes/no wrapper).**

---

## 5. Sentence Family (known engines only)

> Scene: continuing the after-class/help register (L10–L11). The learner now asks the **standard** yes/no question instead of relying on intonation alone.

| Role | Sentence | Note |
|---|---|---|
| **Statement base** | `C'est ici.` | L2/L8 (recycled) |
| **Wrap → question (anchor)** | `Est-ce que c'est ici ?` | **new core**: `est-ce que` + owned `c'est ici` |
| **Movement base** | `Tu vas à la maison.` | L7 (recycled) |
| **Wrap → question** | `Est-ce que tu vas à la maison ?` | est-ce que + owned aller statement |
| **Help (intonation, L11)** | `Vous pouvez m'aider ?` | L11 (recycled, rising intonation) |
| **Wrap → standard register** | `Est-ce que vous pouvez m'aider ?` | est-ce que upgrade of the L11 help chunk |
| **Permission (intonation, L11)** | `Je peux faire une pause ?` | L11 (recycled) |
| **Wrap → standard register** | `Est-ce que je peux faire une pause ?` | **graduates L11's recognition `est-ce que je peux …?`** |
| **Rescue (recycled)** | `Je ne comprends pas. Vous pouvez répéter ?` | L1/L11 recover |

- **Fixed frame:** `frame:est-ce-que-plus-clause` — `Est-ce que [owned statement] ?`
- **Replaceable slot:** the **whole owned statement** (closed set: `c'est ici`, `tu vas à la maison`, `vous pouvez m'aider`, `je peux faire une pause`).
- **Contrast:** `Vous pouvez m'aider ?` (intonation — owned, L11) vs `Est-ce que vous pouvez m'aider ?` (est-ce que — owned, L12) vs `Pouvez-vous m'aider ?` (**inversion — recognition only**).
- **Forbidden / not-yet-ready substitutions:** no inversion (`vas-tu`, `puis-je`); no question words (`comment`/`pourquoi`/…); no `qu'est-ce que`; no `où est-ce que` production; no negative wrapped question (`est-ce que je ne …?`); no `y`/`en`; no past/future.

---

## 6. Active / Supported / Recognition Table

| Label | Canonical ID | Meaning | Status | Note |
|---|---|---|---|---|
| est-ce que | `chunk:est-ce-que` | (question opener) | **active (new)** | the only genuinely new lexis |
| (est-ce que + statement) | `frame:est-ce-que-plus-clause` | "Is it that …?" / yes-no Q | **active (new)** | wraps an owned statement; core engine |
| question expansion 1 | `phen:question-expansion-1` | est-ce que = standard yes/no wrapper | **active (phenomenon)** | the owned phenomenon (`= est-ce-que yes/no question`) |
| Est-ce que c'est … ? | `chunk:est-ce-que-c-est` | "Is it …?" | supported | est-ce que over L2 `c'est` |
| Est-ce que tu vas … ? | (frame applied) | "Are you going …?" | supported | over L7 aller |
| Est-ce que vous pouvez … ? | (frame applied) | "Can you …?" | supported | over L11 help chunk |
| Est-ce que je peux … ? | `frame:est-ce-que-je-peux-plus-infinitive` | "Can I …?" | **active/supported (graduated)** | **L11 recognition → owned** via `status_by_lesson` (reuse L11 ID, no fork) |
| intonation ↔ est-ce que | `phen:question-register-upgrade` | same meaning, standard register | supported | both coexist; est-ce que is neutral standard |
| inversion (preview) | `phen:inversion-preview` *(reuse L8)* | `vas-tu ?` / `allez-vous ?` / `puis-je ?` | **recognition only** | trapped |
| qu'est-ce que (preview) | `phen:qu-est-ce-que-preview` | object question cousin | **recognition only** | stays L9 recognition |
| où + est-ce que (preview) | `frame:ou-est-ce-que-plus-clause` *(reuse L8)* | `Où est-ce que tu vas ?` | **recognition only** | word + wrapper combo deferred |
| **Traps** | `trap:full-question-system-overload` · `trap:inversion-too-early` *(L8)* · `trap:question-word-dump` · `trap:qu-est-ce-que-overload` *(L9)* | distractors / option-only | — | guard the leak |

> **Sound/writing:** at most **1 light note** — spoken `est-ce que` reduces (`/ɛs.kə/`, often `/ɛs.k/`); recognition only. L12 is **not** a sound lesson.

---

## 7. Continuity Map

| Field | Value |
|---|---|
| **Carry-in — L3** | yes/no **awareness** + intonation questions (the meaning est-ce que now upgrades) |
| **Carry-in — L8** | `où`/location question control + the **`est-ce que` recognition preview** (`où est-ce que tu vas ?`) + spoken end-placement |
| **Carry-in — L9** | frozen `tu fais quoi ?` — the **non-owned question-word precedent** (proof a Q-word can stay frozen-in-chunk); L12 must **not** promote `quoi`/`qu'est-ce que` |
| **Carry-in — L10** | after-class integration scene/register |
| **Carry-in — L11** | `vous pouvez m'aider ?` / `je peux …?` (the bases wrapped) + **`est-ce que je peux …?` recognition** (now graduated) |
| **New introduced** | `est-ce que`, `frame:est-ce-que-plus-clause`, `phen:question-expansion-1` |
| **Carry-out** | → later **question words** (`comment`/`pourquoi`/…, "Question Expansion 2") · → **`qu'est-ce que`** (object questions) · → **inversion / formal register** (`puis-je`, `vas-tu`) · → **`y`/`en`** (L14+) · → **A Small Moment** question/reading scenes (L16+) |
| **Transformation types used** | ☑ question (statement → est-ce que question) · ☑ register/naturalness (intonation → est-ce que → inversion ladder, recognition) · ☐ negation (recycled only) · ☐ tense doorway · ☐ pronoun insertion |
| **Fade plan** | `est-ce que + statement` moves supported → active → expected; inversion + question words stay recognition until their own (likely paid) lesson |

> **Principle check** (engine §8): introduces new (`est-ce que` wrapper) ✓ · grows old (re-questions L2/L7/L11 statements; upgrades L3 intonation; lands L8/L11 hooks) ✓ · prepares future (question words, qu'est-ce que, inversion, y/en) ✓.

---

## 8. Exercise Flow — Compact

> Focus: **transformation — statement → est-ce que question.** Negation/Question archetype weighting (Try It / Weave It / Shape It strong; no new vocabulary intake).

| Section | Purpose | Learner action | Feedback |
|---|---|---|---|
| **Meet It** | Meet "ask the standard way" | listen `Vous pouvez m'aider ? → Est-ce que vous pouvez m'aider ?` | passive mirror |
| **Notice the Pieces** | See `est-ce que` sit **in front of** an unchanged known sentence | tap `est-ce que` + the (unchanged) statement | neutral |
| **Try It** | Pick the est-ce que form; reject inversion/Q-word traps | choose `Est-ce que tu vas …?`; reject `Vas-tu …?` / `Qu'est-ce que …?` / `Comment …?` | reveal + reason |
| **Weave It** | Build an est-ce que question from given pieces | assemble `Est-ce que c'est ici ?` | model + alternatives |
| **Say It Your Way** | Ask a yes/no question in the help scene | "Ask politely if you can take a break / if they can help you." | model-answer-only (no AI) + natural alternatives |
| **Natural Reveal** | Why est-ce que is the neutral standard; intonation still fine; inversion is a *later* register | read reveal | natural upgrade + register note |
| **Lesson End** | Calm close, name the capability | read recap | passive mirror ("You can ask the standard way now.") |

> Sections trimmed from the full template (Why This Works folds into Notice/Natural Reveal; Shape It folds into Try It/Weave It; Stay With It → Daily Review) — justified by the single-mechanic scope (§1). No AI in L12 (`model-answer-only`). TTS reads French only, never placeholders/IDs.

---

## 9. Natural Reveal / Feedback

**Wrap a statement (signature):**
- **Expected:** `Est-ce que c'est ici ?` / `Est-ce que vous pouvez m'aider ?`
- **Acceptable alternatives:** the **intonation** form (`C'est ici ?`, `Vous pouvez m'aider ?`) stays valid — accept, note est-ce que is the neutral standard register (do not mark intonation "wrong").
- **Natural upgrade:** est-ce que for a clear, standard question; intonation for casual speech.

**Common mistakes (watch list):**
- **Overusing `est-ce que` everywhere** (stacking it on already-question forms, e.g. `Est-ce que tu vas où ?`) — hint: "`est-ce que` wraps a **statement**, not another question."
- **Inversion too early** (`Vas-tu …?`, `Puis-je …?`) — recognition only; "you'll own that more formal form later."
- **`qu'est-ce que` confusion** (`Qu'est-ce que c'est ?` for a yes/no) — that's an *object* question, a later lesson.
- **`est-ce que` + question-word stacking** (`Est-ce que comment …?` / `Où est-ce que …?` as production) — defer; ask yes/no only.
- **Broad pouvoir leak** via `est-ce que je peux` (reaching for `je pourrais` / `il se peut`) — stays help/permission (L11 guard).
- **Forgetting est-ce que does not change the core** (`Est-ce que es-tu …?` — double marking) — hint: "the sentence after `est-ce que` stays exactly as you'd say it normally."

**Feedback stays passive-mirror; no scores/reward language. Recognition forms (inversion/qu'est-ce que/où est-ce que) are redirected, never taught on the spot (contract §11).**

---

## 10. AI Generation Compatibility

> Binds to `docs/syllabus/ai-generation-contract-v1.md`. L12 runs `model-answer-only` (no live AI), so this governs the *next* stage.

- **AI may generate ONLY `est-ce que` yes/no questions** over the **allowed owned statements** (`c'est ici`, `tu vas à la maison`, `vous pouvez m'aider`, `je peux + owned infinitive`), via `frame:est-ce-que-plus-clause`.
- **AI must NOT generate** — even if the French is correct (prerequisite-safety overrides validity): **inversion** (`vas-tu`/`allez-vous`/`puis-je`), **`qu'est-ce que`**, **question words** (`comment`/`pourquoi`/`quand`/`qui`/`que`/`combien`), **`où est-ce que`** production, **`y`/`en`**, **broad pouvoir** (`pourrais`/`il se peut`/full paradigm) or **broad faire**, **past/future**, or a **negative wrapped question** (`est-ce que je ne …?`).
- **AI must NOT treat `est-ce que` as permission to generate full question formation** — it is a single yes/no wrapper, not the question system.
- **AI must NOT drift into generic chatbot conversation** — Say It Your Way stays a scoped production-and-mirror moment (contract §11).
- **Traps** come from `trap:full-question-system-overload` / `trap:inversion-too-early` / `trap:question-word-dump` / `trap:qu-est-ce-que-overload`; repair targets the lesson's `weak:` tags; Natural Reveal stays passive-mirror.

**Proposed AI-contract §15 L12 row (propose for review — do NOT auto-apply):**

| Lesson | ✅ Allowed | 🚫 Blocked | Why blocked |
|---|---|---|---|
| **L12** | `Est-ce que c'est ici ?` · `Est-ce que tu vas à la maison ?` · `Est-ce que vous pouvez m'aider ?` · `Est-ce que je peux faire une pause ?` | `Vas-tu à la maison ?` / `Puis-je …?` *(inversion)* · `Qu'est-ce que tu fais ?` · `Comment / Pourquoi / Quand … ?` *(question words)* · `Où est-ce que tu vas ?` *(word+wrapper, recognition)* · `Est-ce que je ne fais pas ça ?` *(negative wrap)* · `J'y vais.` · past/future | inversion + `puis-je` deferred ; `qu'est-ce que` + all question words deferred (question-word system) ; word+wrapper recognition-only ; negative wrapped Q pragmatically marked ; `y`/past/future deferred |

---

## 11. Mon Lexique Output

> Learner-facing stays simple (meaning · examples · where met · related · your sentences · confidence). No IDs/status codes shown. *(Mon Lexique is dev-apk out-of-scope — planning output per template §14.)*

| Entry | Canonical ID | Learner-facing meaning | Where-used | Related | Mastery event |
|---|---|---|---|---|---|
| **est-ce que** | `chunk:est-ce-que` | a question opener — put it in front of something you can say to ask "is it…? / can you…?" | "Est-ce que c'est ici ?" | (intonation question), pouvez-vous | new |
| **est-ce que + (a sentence)** | `frame:est-ce-que-plus-clause` | wrap a statement to make a yes/no question | "Est-ce que tu vas à la maison ?" | est-ce que, c'est, tu vas | new |
| **je peux** *(updated)* | `chunk:je-peux` | "I can" → now also `Est-ce que je peux …?` (graduated) | "Est-ce que je peux faire une pause ?" | est-ce que, faire une pause | strengthened (Q form) |
| **vous pouvez** *(updated)* | `chunk:vous-pouvez` | "you can (asking)" → now also `Est-ce que vous pouvez …?` | "Est-ce que vous pouvez m'aider ?" | est-ce que, m'aider | strengthened |
| **tu vas / je vais** *(updated)* | `chunk:je-vais` | movement → now also questionable with est-ce que | "Est-ce que tu vas à la maison ?" | est-ce que, à + place | strengthened |
| **c'est (ici)** *(updated)* | `chunk:c-est` | "it is" → now also `Est-ce que c'est …?` | "Est-ce que c'est ici ?" | est-ce que, ici | strengthened |

> Learner-facing framing: **"a question opener"** — *not* a grammar lecture on French interrogation. The intonation form they already use stays valid; est-ce que is "the clear, standard way to ask."

---

## 12. QA / Pilot Findings

- **Is a compact spec enough?** **Yes.** The lesson is one wrapper word + one frame over fully-owned statements; there is no new vocabulary, tense, or verb engine. The compact form captures the owned target, the deferred set, a small item table, the transformation flow, and the AI guardrail — everything reviewable. **If** implementation review finds the wrapper needs more scaffolding (e.g. learners struggle to keep the statement core unchanged), promote to a full spec; the compact form is the right default for a single-mechanic register-upgrade lesson.
- **Is L12 too broad?** **No, as scoped** — it owns exactly one mechanic and explicitly defers question words + inversion + `qu'est-ce que`. It would become too broad **only** if a question word or inversion were added (the band map's `comment`/`combien` temptation — deferred here).
- **Is `est-ce que` safe before Campfire ~L24?** **Yes.** It is a single high-frequency register-upgrade, seeded as recognition three times (L3/L8/L11); it does **not** unlock the deep system (inversion, the question-word family, embedded questions) — that stays the paid-zone reward.
- **Does L12 preserve paid-depth value?** **Yes** — full question formation is entirely reserved; L12 spends only the yes/no wrapper slice (the question-system analogue of L11's pouvoir help/permission slice).
- **Should L13 be Integration, as the band map says?** **Yes** — Option C cadence (L11–L12 → **L13 integration**) holds; L11+L12 are 2 consecutive new-engine/control lessons, so an integration beat at L13 respects the Integration Rhythm Rule and consolidates pouvoir + the est-ce que wrapper before L14 `y`.
- **Highest-risk leak:** the **full question system spilling out of `est-ce que`** (inversion + question-word dump) — guarded by §3/§9/§10 + four traps; AI is the most likely vector.

**Docs that need patching (propose for review — do NOT auto-apply in this step):**
- **`docs/syllabus/L10-L20-band-map-v0.md`** — trim the L12 row + decision gates 3/5 from "*`est-ce que` + `comment`/`combien` (light)*" → "**`est-ce que` yes/no wrapper only**"; route question words to a later **"Question Expansion 2"** lesson. (Band map is `v0`, expected to revise as specs land.)
- **`docs/syllabus/ai-generation-contract-v1.md` §15** — add the **L12 row** (§10 above), same pattern as L6–L11.
- **`docs/syllabus/lesson-archetype-templates-v1.md` #3** — optional one-line L12 note: *"also covers 'Question Expansion / Register-Upgrade Control' — owning the `est-ce que` yes/no wrapper over owned statements; question words + inversion stay deferred"* (companion to the L8 note).
- **`docs/syllabus/canonical-item-id-convention-v0.1.md`** — optional one-line note: L12 is the first lesson to **graduate a recognition frame to active via `status_by_lesson`** (`frame:est-ce-que-je-peux-plus-infinitive`), exercising convention §6.
- **No L11 patch needed** — L11 §7 already routes `est-ce que je peux …?` → L12.

---

*End of L12 Est-ce que / Yes-No Question Wrapper — compact lesson spec. Planning canon only — authorizes no code, content, flag, or runtime change. L12 owns `est-ce que` as a yes/no wrapper over owned statements (and graduates `est-ce que je peux …?`); question words, `qu'est-ce que`, inversion, `y`/`en`, broad pouvoir/faire, and past/future are deliberately deferred. The Dev APK smoke test remains the boundary before any runtime work derived from this spec.*
