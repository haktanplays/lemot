# L12 — Question Expansion Gate Review / Pre-Spec Remap

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/canonical-item-id-convention-v0.1.md` + `docs/syllabus/ai-generation-contract-v1.md` + the L1–L11 pilots + `docs/syllabus/L10-L20-band-map-v0.md`.
> **Pre-spec planning/review only.** This is a **gate review**, NOT the L12 lesson spec. It authorizes **no** code, content, flag, or runtime change, and it does **not** create `docs/syllabus/L12-*.lesson-spec.md`. Locked product canon wins on conflict. Dev APK runtime (L1–L5 only) is unaffected — planning canon ahead of runtime.

> **Why this gate exists.** The L10–L20 band map (Option C) pencils **L12 = "Question Expansion 1"**, but question formation is the single archetype-#3 surface most prone to ballooning into a grammar unit (the L3 pilot finding). Before writing the spec, this review fixes **the safest L12 scope** so L12 cannot become a full French question-formation lesson and cannot spend the paid-zone question system before Campfire ~L24.

---

## 1. Executive Summary

- **Should L12 be Question Expansion 1?** **Yes — but scoped *narrower* than the band map's first pass.** L12 should own **`est-ce que` as a yes/no question wrapper only** — `est-ce que + [a sentence the learner already owns]` → a standard-register yes/no question. It should **not** also open question words in the same lesson.
- **What exactly should it own?** One narrow control layer: **`frame:est-ce-que-plus-clause`** wrapping owned statements (`est-ce que c'est ici ?`, `est-ce que tu vas à la maison ?`, `est-ce que vous pouvez m'aider ?`, `est-ce que je peux faire une pause ?`). This **lands the `est-ce que` hook** that L3, L8, and L11 each seeded as recognition, and **graduates `est-ce que je peux …?` from L11 recognition to owned**.
- **What must remain deferred?** **Inversion** (`vas-tu ?`, `allez-vous ?`, `puis-je ?`); **every question word as production** (`qu'est-ce que`, `comment`, `pourquoi`, `quand`, `qui`, `que`, and `quoi` beyond the L9 in-chunk use); **`où + est-ce que`** combination; `y`/`en`; broad pouvoir/faire; any past/future. Full question-formation ownership = **0**. New grammar systems = **exactly 1 narrow control layer**.
- **Is L12 safe after L11?** **Yes**, on two conditions: **(a)** it owns *only* the `est-ce que` wrapper (no question words), and **(b)** it is followed by the **L13 integration beat** (Option C cadence: L11–L12 → L13). L11→L12 is **2 consecutive new-engine/control lessons** — within the Integration Rhythm Rule's ≤3 ceiling. The genuinely new load is **one wrapper word + one frame** over fully-owned sentences — cognitively light, like L8's `où` (active-new 7).

> **Headline recommendation (product-critical):** the band map's L12 = "*`est-ce que` + `comment`/`combien` (light)*" is **slightly too broad** — it bundles a new question *mechanism* (est-ce que) **with** new question-word *lexis*, re-creating the exact "own the system, not one target" overload the L3 pilot warns against. **Trim L12 to `est-ce que` yes/no wrapper only**; move the question words (`comment`/`combien`/…) to a **later "Question Expansion 2"** lesson. (Band-map patch proposed in §9; not applied here.)

---

## 2. Prior Question Layers (what the learner already has)

The learner reaches L12 having met the question doorway **four times**, each deliberately narrow:

| Lesson | What was owned | What was deferred / recognition | Bridge to L12 |
|---|---|---|---|
| **L3** Negation/Yes-No/Tu-Vous | **yes/no questions by *intonation* only** (`C'est bon ?`, `Vous êtes prêt ?`); answers `oui`/`non`/`si` | `est-ce que` = **recognition**; question words + inversion deferred; pilot **explicitly recommends a dedicated later question-formation lesson** | establishes the yes/no *meaning*; L12 upgrades intonation → `est-ce que` register |
| **L8** Où / Location Questions | **one question word `où`** via fixed frame (`Où est … ?`) + **spoken end-placement** (`Tu vas où ?`) | `est-ce que` (`où est-ce que tu vas ?`) + inversion (`où vas-tu ?`) + other Q-words = **recognition / future-hook**; "second question layer deferred to later, likely paid" | proves "own one question target, not the system"; L12 is the deferred est-ce que half |
| **L9** Faire / Small Actions | **`tu fais quoi ?` as a *fixed supported chunk*** (spoken end-placement reused from L8) | `quoi` **only inside that chunk** (not the question-word system); `qu'est-ce que tu fais ?` = **recognition** | shows a question word can live frozen-in-chunk before its system; L12 must **not** promote `quoi`/`qu'est-ce que` |
| **L11** Pouvoir / Help & Permission | **`je peux …?` / `vous pouvez …?` by rising *intonation*** | **`est-ce que je peux …?` = recognition**; `puis-je …?` = recognition; inversion deferred | L11 §7 transformation plan literally routes **`est-ce que je peux …?` (recognition) → owned `est-ce que` questions → L12**; this is L12's marquee carry-out |

**Reading:** `est-ce que` has been a **recognition-only preview three times** (L3, L8, L11) and the spine has **never owned a question mechanism beyond intonation + one frame + one end-placed word**. L12 is the natural, well-seeded moment to land `est-ce que` — exactly as L11 landed the `vous pouvez m'aider ?` hook L10 seeded. The discipline is identical to every prior question lesson: **own one target, not the system.**

---

## 3. Candidate L12 Ownership Options

### Option A — `Est-ce que` yes/no wrapper (RECOMMENDED)
**Own:** `est-ce que + [owned statement]` → standard-register yes/no question.
**Examples (all reuse owned material):**
- `Est-ce que vous pouvez m'aider ?` (L11)
- `Est-ce que je peux faire une pause ?` (L11 — graduates from recognition)
- `Est-ce que tu vas à la maison ?` (L7 aller)
- `Est-ce que c'est ici ?` (L2 `c'est` + L8 `ici`)
**Defer:** inversion · all question words (`pourquoi`/`comment`/`quand`/`qui`/`que`) · `qu'est-ce que` · `où + est-ce que` · the full question system.
- **Strengths:** one clean control layer; lands a thrice-seeded hook; reuses L7/L8/L11 engines so the only new lexis is `est-ce que` itself; directly upgrades the learner's existing intonation/end-placement questions to the standard register they hear everywhere; preserves the entire question-word + inversion system for later/paid.
- **Risks:** AI/learner over-extends `est-ce que` into question words (`est-ce que` + `qu'est-ce que`/`comment`) or inversion — guarded by traps + the AI-contract row.
- **Pacing:** 1 new control layer; transformation-heavy (operates on owned statements) → low active-new, high recycled. Healthy after L11; L13 integration follows.
- **Verdict:** **adopt.** Safest, most coherent, best-seeded.

### Option B — Question-words expansion (`où` + one more, e.g. `comment`/`quoi`)
**Own:** `où` (recycled) + one new question word.
- **Strengths:** adds concrete asking power (how/what).
- **Risks — significant:** opening **any** new question word almost forces a *mechanism* decision (`comment tu fais ?` end-placement vs `comment est-ce que …` vs `comment fais-tu ?`), which **drags in `est-ce que` and/or inversion anyway** — i.e. it tends to collapse into "the question system," the L3 overload trap. It also competes with `quoi` (L9 in-chunk) and risks promoting it prematurely. **This is the band map's hidden over-reach** (its L12 = est-ce que **+** `comment`/`combien`).
- **Verdict:** **reject for L12.** Question words deserve their **own** later lesson ("Question Expansion 2"), *after* `est-ce que` is owned, so they can be taught *through* the owned wrapper rather than opening a second mechanism cold.

### Option C — No new question system; integration only
**Use L12 as an L11-consolidation/integration beat (like L6/L10).**
- **Strengths:** zero overload risk.
- **Risks:** **over-integration.** The band map already has integration beats at L10, L13, L16, L19, L20; inserting *another* at L12 (its Option A) was explicitly judged "**too cautious… below the [rhythm] floor**," risking a slow, repetitive free band that hurts conversion. It also **wastes the thrice-seeded `est-ce que` hook**, leaving it dangling another lesson.
- **Verdict:** **reject as the L12 plan.** L13 is already the integration beat; L12 should carry the (narrow) new capability.

**Recommendation: Option A.** Own `est-ce que` as a yes/no wrapper only; defer question words to a later lesson; let L13 integrate.

---

## 4. Recommended L12 Scope

| Field | Recommendation |
|---|---|
| **Primary archetype** | **Negation / Question / Social Choice (#3)**, used as **"Question Expansion / Register-Upgrade Control"** (the est-ce que wrapper) — direct sibling of the L8 "Question/Location Control" framing |
| **Secondary archetype** | **none** as a budget; *light* Review/Integration flavor only (it recombines L7/L8/L11 statements). Do **not** let the flavor add a second engine. |
| **Owned target** | `frame:est-ce-que-plus-clause` — wrap an **owned** statement to make a standard yes/no question; **lands `est-ce que je peux …?`** (L11 recognition → active) |
| **Active-new estimate** | **~5–7** (low, by design — transformation-heavy, like L8's 7): `chunk:est-ce-que`, `frame:est-ce-que-plus-clause`, `phen:est-ce-que-yes-no-question`, `est-ce que je peux …?` (graduated), + 1–2 anchor sentences |
| **Supported-new estimate** | **~7–9** (est-ce que over each owned base: `est-ce que c'est …?`, `est-ce que tu vas …?`, `est-ce que vous pouvez …?`, register/intonation-vs-est-ce-que contrast, optional `est-ce que tu …?`) |
| **Recognition / ambient estimate** | **~9–12** (inversion preview, `puis-je`, `qu'est-ce que`, `où est-ce que`, the question-word family glimpsed, spoken `ne`-less casual questions) |
| **Recycled estimate** | **~16–20** (high — operates on L2 `c'est`, L3 yes/no + tu/vous, L7 aller, L8 `où`/end-placement, L11 pouvoir; politeness/rescue) |
| **Production target estimate** | **~5–7** (est-ce que yes/no questions over owned bases + recover) |
| **Full-question ownership** | **0** |
| **New grammar systems** | **exactly 1 narrow control layer** (`est-ce que` yes/no wrapper) |

> Active-new sits at the **low end** of the archetype-#3 band (~8–12) precisely because L12 is transformation-heavy and rides owned engines — the same profile as L8 (active-new 7). Total exposure ~38–45; per template §6, **the tiers are not all maxed at once** (recycled high ⇒ active-new low).

---

## 5. Allowed / Deferred Matrix

| Item | Classification | Note |
|---|---|---|
| **`est-ce que`** (yes/no wrapper) | **ACTIVE** | the one owned target; only as `est-ce que + [owned statement]` |
| **`est-ce que je peux …?`** | **ACTIVE / SUPPORTED** | graduates from L11 **recognition** → owned (the marquee carry-out) |
| **`est-ce que c'est …?` / `est-ce que tu vas …?` / `est-ce que vous pouvez …?`** | **SUPPORTED** | est-ce que over owned bases (L2/L7/L11) |
| **intonation yes/no** (`C'est bon ?`) | **RECYCLED (active)** | L3 — stays valid; est-ce que is the *register upgrade*, not a replacement |
| **`où`** | **RECYCLED (active)** | owned L8; reused as a base — but see `où + est-ce que` below |
| **`tu vas où`** (end-placement) | **RECYCLED (supported)** | owned L8; not expanded |
| **`où + est-ce que`** (`où est-ce que tu vas ?`) | **RECOGNITION only** | combines a question *word* with the wrapper — more advanced; show, never require (keeps L12 to **yes/no** est-ce que) |
| **`qu'est-ce que`** | **RECOGNITION only** | est-ce que's object-question cousin; opening it = the question-word system → defer |
| **`quoi`** | **RECOGNITION (stays L9 in-chunk)** | only inside `tu fais quoi ?`; **not** promoted in L12 |
| **`comment`** | **DEFERRED** (recognition at most) | band map floated owning it at L12 — **this review defers it** to "Question Expansion 2" |
| **`combien`** | **DEFERRED** | as `comment` |
| **`pourquoi`** | **DEFERRED** | question-word system; post-L12 (likely paid-zone) |
| **`quand`** | **DEFERRED** | as `pourquoi` |
| **inversion** (`vas-tu ?`, `allez-vous ?`) | **DEFERRED** (recognition preview only) | trapped (`trap:inversion-too-early`) |
| **`puis-je …?`** | **DEFERRED** (recognition) | formal inversion of pouvoir; carried from L11 recognition |
| **`y`** | **DEFERRED** | L14 (place sense) per band map; not this lesson |
| **full question formation** | **DEFERRED (post-Campfire ~L24)** | the headline question engine stays the paid-zone reward |

---

## 6. Paywall / Commercial Depth Check

- **Does owning `est-ce que` before Campfire ~L24 give away too much?** **No.** `est-ce que` is a single, high-frequency **register-upgrade** that the learner *already* meets constantly; it does not unlock the deep system. The genuinely deep, broadly-applicable surface — **inversion, the full question-word family (`qu'est-ce que`/`comment`/`pourquoi`/`quand`/`qui`/`que`), embedded/indirect questions, and `qu'est-ce que` object questions** — stays **entirely reserved**. Owning the yes/no wrapper is the question-system analogue of L11's "own pouvoir's help/permission slice, defer the broad senses."
- **Does withholding it make the free path feel weak?** **Withholding `est-ce que` entirely *would* weaken the free path** — a learner who can only ask by intonation/end-placement feels stuck below "real" French. Landing the standard yes/no wrapper gives a **real, confidence-building capability** without spending the system. (This is exactly the band map §5 line: "controlled questions are needed to function; the *full* system is deep and reservable.")
- **Safest commercial compromise:** **own the `est-ce que` yes/no wrapper; defer the question-word family + inversion + `qu'est-ce que`.** Strong free usefulness, intact paid depth. (Aligns with band map §5; this review only **tightens** it by also deferring `comment`/`combien` out of L12.)

---

## 7. AI Generation Risk (ties to `ai-generation-contract-v1.md`)

| Leak risk | Where it bites at L12 | Contract anchor / mitigation |
|---|---|---|
| **Inversion leak** | est-ce que "feels like" it opens all question forms → `vas-tu ?`, `allez-vous ?`, `puis-je ?` | §6/§8: only lesson-listed frames; inversion blocked even if correct; `trap:inversion-too-early`; new §15 L12 row |
| **Question-word dump** | `comment`/`pourquoi`/`quand`/`qui`/`que` produced alongside est-ce que | §8 frame guardrail: only `frame:est-ce-que-plus-clause`; question words blocked; `trap:question-word-dump` |
| **`qu'est-ce que` leak** | the wrapper's object-question cousin slips into production | §8: `qu'est-ce que` recognition-only; `trap:qu-est-ce-que-overload` (reuse L9) |
| **why/how/when expansion** | open-scene prompts invite `pourquoi …?` | §11: scoped production-and-mirror; redirect, don't teach the deferred form |
| **`y` / `en` pronoun leak** | `où est-ce que` reuse tempts `j'y vais` | §6/§8: `y`/`en` deferred to L14+; blocked |
| **Broad pouvoir leak** | `est-ce que je peux …?` reuses pouvoir → conditionnel/possibility creep | L11 row + L9/L11 notes: pouvoir help/permission slice only; conditionnel/possibility blocked |
| **Past/future leak** | "did you …?" / "are you going to …?" questions | §6: passé composé/imparfait/futur proche **production** blocked; reading uses present only |
| **Generic chatbot drift** | est-ce que enables open Q&A → free dialogue | §11: Say It Your Way stays scoped, not open conversation |

> **New contract row needed (when the spec is written, not now):** an `§15` **L12 row** — Allowed: `Est-ce que c'est ici ?` · `Est-ce que tu vas à la maison ?` · `Est-ce que vous pouvez m'aider ?` · `Est-ce que je peux faire une pause ?`; Blocked: `Vas-tu à la maison ?` (inversion) · `Puis-je …?` · `Qu'est-ce que tu fais ?` · `Comment tu fais ?` / `Pourquoi …?` (question words) · `Où est-ce que tu vas ?` (où+est-ce que, recognition) · `J'y vais.` · past/future.

---

## 8. Mon Lexique / Canonical-ID Impact

Likely new/updated IDs (v0.1 `prefix:slug`; declared per-spec when L12 is written):

| ID | Kind | Note |
|---|---|---|
| `chunk:est-ce-que` | chunk | the wrapper itself (ASCII-safe; no accent/homograph collision) |
| `frame:est-ce-que-plus-clause` | frame | **already named in the band map §9** — reuse this exact ID for consistency (do **not** coin `frame:est-ce-que-plus-known-sentence` as a separate ID) |
| `phen:est-ce-que-yes-no-question` | phenomenon | the owned phenomenon (yes/no register upgrade) |
| `phen:question-register-ladder` *(update)* | phenomenon | intonation (L3) → end-placement (L8) → **est-ce que (L12)** → inversion (later); L11 already references a request-register ladder — link, don't duplicate |
| `trap:full-question-system-overload` | trap | producing the full system off the back of est-ce que |
| `trap:inversion-too-early` | trap | **reuse** the existing L8 trap ID — do not coin a new one |
| `trap:question-word-dump` | trap | producing `comment`/`pourquoi`/… |
| `trap:qu-est-ce-que-overload` | trap | **reuse** the existing L9 trap ID |
| `chunk:est-ce-que-je-peux` / `frame:est-ce-que-je-peux-plus-infinitive` | chunk/frame | **status change**: L11 marked `frame:est-ce-que-je-peux-plus-infinitive` **recognition**; L12 graduates it to **active/supported** via `status_by_lesson` (no new ID — reuse L11's) |

**ID issues / flags:**
- **No homograph/accent collision** for `est-ce que` (`est-ce-que`), `qu'est-ce que` (`qu-est-ce-que`), `comment`, `pourquoi` — all ASCII-clean. The sense-suffix rule (convention §2) is **not** triggered here (unlike L8's `où`/`la`).
- **Reuse, don't fork IDs:** `frame:est-ce-que-plus-clause` (band map), `trap:inversion-too-early` (L8), `trap:qu-est-ce-que-overload` (L9), and L11's `frame:est-ce-que-je-peux-plus-infinitive` already exist — the L12 spec should **reuse** them with a `status_by_lesson` update, not coin parallel IDs. (This is the first lesson to *graduate* a recognition frame to active, exercising the convention §6 `status_by_lesson` mechanism — worth a one-line convention note when the spec is written.)

---

## 9. Detailed Spec Recommendation

**Recommendation: write a COMPACT L12 spec next** — scoped to the `est-ce que` yes/no wrapper only.

- **Not "full spec":** the lesson is deliberately narrow (one wrapper word + one frame over owned statements). A compact spec (same template sections, lighter item tables) fits the scope; a "full" treatment risks padding it into a question-system lesson.
- **Not "change to integration":** L13 is already the integration beat (Option C); making L12 integration over-integrates and wastes the est-ce que hook (§3 Option C).
- **Not "postpone":** the hook is seeded three times and the rhythm permits it now; postponing leaves it dangling and stalls the free band.

**Before writing the spec, lock two decisions (band-map gates 3 + 5):**
1. **L12 owns `est-ce que` *only*** (defer `comment`/`combien` to a later "Question Expansion 2"). — *This review recommends locking this.*
2. **`est-ce que je peux …?`** graduates from L11 recognition to **active/supported** in L12 (confirm).

**Existing docs that should be patched** (propose for review — **do NOT auto-apply now**):
- **`docs/syllabus/L10-L20-band-map-v0.md`** — L12 row + decision gates 3/5: trim "*`est-ce que` + `comment`/`combien` (light)*" → "**`est-ce que` yes/no wrapper only**"; route question words to a later **Question Expansion 2** lesson. (The band map is `v0`, explicitly "expected to revise as L11+ specs are written" — this is that revision.)
- **`docs/syllabus/ai-generation-contract-v1.md` §15** — add the **L12 row** (§7 above) **when the spec is written** (same pattern as L6–L11).
- **`docs/syllabus/lesson-archetype-templates-v1.md` #3** — optional one-line L12 note: *"This archetype also covers 'Question Expansion / Register-Upgrade Control' — owning the `est-ce que` yes/no wrapper over already-owned statements, while question words + inversion stay deferred"* (companion to the L8 "Question/Location Control" note). Apply when the spec is written.
- **No L11 patch needed** — L11 §7 already routes `est-ce que je peux …?` → L12.

---

## 10. Final Verdict

- **Is L12 ready for detailed spec writing?** **Yes — ready for a *compact* spec**, once the two gates above are locked (own est-ce que only; graduate `est-ce que je peux`).
- **What should L12 own?** **`est-ce que` as a yes/no question wrapper** over owned statements (`est-ce que c'est ici ?`, `est-ce que tu vas à la maison ?`, `est-ce que vous pouvez m'aider ?`, `est-ce que je peux faire une pause ?`), landing the thrice-seeded est-ce que hook and graduating `est-ce que je peux …?`.
- **What should L12 absolutely NOT own?** **Inversion**; **any question word as production** (`qu'est-ce que`, `comment`, `pourquoi`, `quand`, `qui`, `que`, `quoi` beyond L9 in-chunk); **`où + est-ce que`** as production; **`y`/`en`**; **broad pouvoir/faire**; **any past/future**. Full question-formation ownership = 0; new grammar systems = 1 narrow control layer.
- **Single highest-risk leak:** **the full question system spilling out of `est-ce que`** — specifically **inversion + a question-word dump** (`qu'est-ce que`/`comment`/`pourquoi`…), because est-ce que *feels* like it opens "all questions" and the forms are all valid French. This is a prerequisite-safety leak, not a correctness issue, and AI generation is the most likely vector (§7).

---

## Open Items / Notes

- This is a **gate review (v0)**, not a spec; revise if the two §9 gates resolve differently.
- **Proposed doc patches are listed (§9), not applied** — band-map trim, AI-contract L12 row, archetype #3 note. Operator/author decides; apply when the L12 compact spec is written.
- **Naming caution for the spec:** reuse existing IDs (`frame:est-ce-que-plus-clause`, `trap:inversion-too-early`, `trap:qu-est-ce-que-overload`, L11's `frame:est-ce-que-je-peux-plus-infinitive`) via `status_by_lesson`; do not fork parallel IDs.
- No runtime/code/content/flag/ID change is authorized by this document. Dev APK scope (L1–L5 only) is unaffected. The Dev APK smoke test remains the boundary before any runtime work.

*End of L12 Question Expansion Gate Review. Planning/review only — no lesson spec, no code/content/flag/runtime change. Recommendation: L12 = Question Expansion 1, owning the `est-ce que` yes/no wrapper only; question words + inversion + the full question system stay deferred (post-Campfire ~L24).*
