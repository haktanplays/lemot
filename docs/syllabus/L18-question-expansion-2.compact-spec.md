# L18 — Question Expansion 2 (`comment`) (Compact Lesson Spec)

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/canonical-item-id-convention-v0.1.md` + `docs/syllabus/ai-generation-contract-v1.md` + `docs/syllabus/L10-L20-band-map-v0.md` + **`docs/syllabus/L18-L20-sequence-decision-v1.md`** (the ratified sequence) + **`docs/syllabus/L18-question-expansion-2-gate-review.md`** (the scope this spec implements) + the L8 (`où`) / L12 (`est-ce que`) / L17 (`ça va`) specs and the **shipped** L0–L17 corpus.
> **Compact spec** — intentionally shorter than the full template (see §1). Planning/spec only. Authorizes **no** code, lesson content, flag, or runtime change. Locked product canon wins on conflict. Dev APK runtime (L1–L5 only) is unaffected; L18 is far out of dev-apk scope.

> ## Founder-locked inputs (read first)
>
> Settled before this spec was written; these are **inputs, not proposals**:
>
> 1. **Job:** controlled Question Expansion 2 — one productive question-word slot, no new question mechanism.
> 2. **`journeyRole: "doorway"`**, chosen pedagogically. Band check recorded separately: 1–2, count 1, **PASS**.
> 3. **`acquisitionDemandItemIds: ["adverb-comment"]`** — exactly one demand. **Shipped in commit `b6013aa`.**
> 4. **Archetypes:** `primaryArchetype: "chunk-natural-speech"` · `secondaryArchetype: "thematic-context"`. Both are real current schema values.
> 5. **Exactly ONE Q-word.** A second is **not** taken even though the band map's free-tier allowance permits 1–2.
> 6. **`chunk-comment-ca-va` and `chunk-c-est-comment` are not created.** Both hosts are authored composition — no `acquisitionLink`, no `acquisitionComponents`.
> 7. **Bare `Comment ?` (repair sense) is blocked and deferred.** L18 does not half-solve the repair rail.
> 8. **No futur proche in L18**, not even recognition-only. FP-C belongs at the end of L20.

> ## ⚠️ Correction applied by this spec — the L8 premise
>
> The gate review argued for `C'est comment ?` on the claim that **L8 taught an end-placement *slot*** which "has held exactly one word ever since," and listed `Tu vas où ?` and `Où est … ?` as shipped L8 material. **Checked against shipped content, all three claims are false** — a fifth instance of the phantom-ownership class (after L10, L13, L16, and the band map's `faire` row).
>
> **What shipped L8 actually contains** — three French strings, total: `C'est où ?` · `C'est ici.` · `Le café, c'est où ?`
>
> - `acquisitionDemandItemIds: ["chunk-c-est-ou"]` — the **frozen question** is the demand.
> - `adverb-ou-where` is `status: "supported"`, and its own registry meaning says *"the question word inside `c'est où ?`, **owned as part of the frame first**."*
> - L8's own note: *"the owned unit is the frozen question `chunk-c-est-ou`; `adverb-ou-where` is supported inside the frame."*
> - **`tu vas où ?` and `où est … ?` have no identity and appear nowhere in the shipped lesson.** They were L8-planning-spec material the compact slice dropped.
>
> **`C'est comment ?` survives, and the honest argument is stronger.** It composes `chunk-c-est` (a genuine registered identity, `supported`, first worked in L3) + `adverb-comment`. **L18's architectural contribution is precisely that it turns a frozen formula into a slot** by putting a second word where `où` sits. That is exactly what the two-host requirement exists to prove: *the learner acquired `comment`, not merely one sentence containing it.* No substitution was made and no other host was silently swapped in.

---

## 1. Lesson Identity

| Field | Value |
|---|---|
| **Lesson number** | L18 |
| **Lesson title** | How Is It? (Question Expansion 2 — `comment`) |
| **Journey phase** | First Ascent (Core 150) · pre-Campfire, free |
| **Journey role** | **`doorway`** — opens one bounded productive question-word capability that did not exist before *(band 1–2, count 1, PASS — recorded as a check, not the reason)* |
| **Primary archetype** | prose **Negation / Question / Social Choice (#3)** → schema value **`chunk-natural-speech`** |
| **Secondary archetype** | schema value **`thematic-context`** — situational variety across two different hosts. Not a second budget. |
| **Prerequisites** | `["v1-lesson-017"]` — L17 supplies the answer set |
| **Estimated lesson time** | ~5–6 min |
| **Monolingual mode / explanation language** | `english-guided` |
| **Feedback mode** | `model-answer-only` — no live AI (L0–L20) |
| **Practice Pool expansion level** | Build + Stretch + Challenge (Challenge stays lesson-scoped — asking with `comment`, never open Q&A) |
| **Main can-do outcome** | **"I can use `comment` to ask how someone is and what something is like, in French I already know."** |
| **Why a compact spec is sufficient** | L18 owns **one adverb, 0 new question mechanisms, 0 new grammar systems, 0 new architecture verbs**. Both hosts are already owned. A full spec would invite the question-word tables and mechanism comparisons the gate forbids — the same reasoning that made L12 compact. |

> **Archetype note (binding).** The prose template **"Negation / Question / Social Choice (#3)" has no `LessonArchetype` enum member.** The enum carries 8 values against the prose index's 11, and #3 is one of the unmapped ones. **No schema expansion is authorised here.** L18 declares `chunk-natural-speech`, following shipped `lesson-008.ts` and `lesson-012.ts`, which resolve the same gap the same way. The missing member is recorded as **deferred taxonomy debt**, not fixed.

---

## 2. Owned Target

**One question word, owned as a word, across two already-owned hosts.**

- **`adverb-comment`** (new, `active`) — `comment`, the manner/state interrogative. This is the entire novelty budget.
- **Host A — front-placed, before the frozen social chunk:** `Comment ça va ?` = `adverb-comment` + `chunk-ca-va` (L17). Authored composition; **not** an identity.
- **Host B — final position, after `c'est`:** `C'est comment ?` and `Le café, c'est comment ?` = `chunk-c-est` (L3, supported) + `adverb-comment`. Authored composition; **not** an identity. `Le café, c'est où ?` is L8's own shipped line, so the fronted-topic shape is already met.
- **Recycled (verified against shipped L0–L17 only):** `ça va` / `ça ne va pas` (L17) · `je suis fatigué(e)` / `je suis content(e)` (L17) · `c'est où ?` / `c'est ici` (L8) · `c'est` (L3) · `le café` / `un café` (L1) · `bonjour` / `merci` / `au revoir` (L0/L1/L6) · `est-ce que` (L12, as a **contrast**, never combined).

**The ownership model is a deliberate departure from L8, and it is the point.**

| | L8 | L18 |
|---|---|---|
| Acquisition demand | `chunk-c-est-ou` — a **frozen question** | **`adverb-comment`** — the **word** |
| The question word's status | `supported`, inside one frame | **`active`**, across two frames |
| What the learner ends up owning | one question | **a word they can place** |

L8 owned a question. L18 owns the interrogative — which is the only thing that makes this Question Expansion **2** rather than a second frozen question. **That claim is only honest if `comment` works in two structurally different hosts, which is why §5 treats the second host as non-optional.**

**Clarify:**
- The learner should feel: **"I can ask how — about a person and about a thing."**
- **0 new question mechanisms.** Front placement and final placement are both shapes the learner has already met; `comment` is what is new.

---

## 3. Not Owned / Deferred (explicit)

Never production targets in L18:

- **Every other question word** — `pourquoi` · `quand` · `combien` · `qui` · `que`. **Not taken even though the band permits a second.** None has an owned answer set: `parce que` has no identity, no time lexis is owned, **the registry contains zero number identities**, and no person-noun set exists.
- **`comment` + `est-ce que`** (`Comment est-ce que ça va ?`) — both halves are owned and the combination is correct French, which is exactly why it is the top leak. L12 holds `Q-word + est-ce que` at recognition; **L18 does not graduate it.**
- **Inversion** — `Comment allez-vous ?` · `Comment vas-tu ?`. The textbook phrasing, and the model's first instinct.
- **`Comment tu vas ?`** — needs productive `tu vas`, which is not owned (and `tu vas où ?` never shipped).
- **Bare `Comment ?` (repair sense)** — deferred with the orphaned repair rail (RR-A). The learner is **never shown it as a usable move** and it is **never glossed**. See §7.
- **`Comment on fait ça ?`** (procedural sense) — `on fait` is not owned; there is no `verb-faire` identity at all.
- **Exclamative `comment`** — out of band.
- **`qu'est-ce que`** — recognition only.
- **Embedded / indirect questions** — `je ne sais pas comment …` needs `savoir`.
- **New descriptive adjectives** — see §8. The answer inventory is narrow **by design**.
- **Futur proche** in any form, including recognition. **`je vais + inf.` does not appear in L18.**
- **Past / future tense · object pronouns · advice or consolation · open AI chat.**

---

## 4. Item Budget (planning targets, not validators)

| Tier | This lesson | Target band | Notes |
|---|---|---|---|
| **Active — new** | **1** | 1–2 (Doorway); IC-002 normal 1–3 | **`adverb-comment`**. No fourth-demand rationale needed. |
| **Supported — new** | **2** | — | The two authored compositions: `Comment ça va ?` and `C'est comment ?` — **surfaces, not ids** (the je-ne-peux-pas / ça-ne-va-pas canon). |
| **Recognition / ambient** | **2** | — | `est-ce que` shown as the **contrast** that must not be combined; `c'est où ?` re-met as the shape `comment` joins. **No identity is minted for either** — both are already registered. |
| **Recycled (verified against shipped L0–L17)** | **~11** | — | `ça va` · `ça ne va pas` · `je suis fatigué(e)` · `je suis content(e)` · `c'est` · `c'est où ?` · `c'est ici` · `le café` · `bonjour` · `merci` · `au revoir`. |
| **Traps (option-only)** | **4** | — | `trap:question-word-dump` *(reuse L12)* · `trap:inversion-too-early` *(reuse L8)* · `trap:qu-est-ce-que-overload` *(reuse L9)* · `trap:comment-repair-sense-too-early` *(new — the only one with no existing owner)* |
| **Production targets** | **4** | — | `Comment ça va ?` · `C'est comment ?` · `Le café, c'est comment ?` · one free-ish ask in Say It Your Way, still `comment`-scoped |

**New grammar systems: 0. New question mechanisms: 0. New architecture verbs: 0. Active-new: 1. Q-words owned: 1.**

> **Where does novelty come from?** From **placement**, not volume. The learner meets one word in two positions and discovers that the spot after `c'est` — which has held only `où` since L8 — is a slot. Active-new is **1** against **~11** verified recycled: the load is retrieval plus one genuine structural insight.
>
> **The known risk is thinness, not leakage** (gate review §1). **If smoke shows L18 feels thin, deepen the two hosts — more contexts for `C'est comment ?`, more natural exchanges — do NOT add a second Q-word and do NOT add descriptive adjectives.** Both of those are the failure, not the fix.

---

## 5. Two Host Frames — binding

**Non-optional.** A lesson that teaches only `Comment ça va ?` has produced **a second frozen greeting variant wearing a `doorway` label**, and its acquisition claim is false. Both hosts must appear as **productive families**, not as one sentence each.

| | **Host A — front-placed** | **Host B — final position** |
|---|---|---|
| Shape | `Comment` + owned frozen clause | `(Topic,) c'est` + `comment` |
| Line | `Comment ça va ?` | `C'est comment ?` · `Le café, c'est comment ?` |
| Composition | `adverb-comment` + `chunk-ca-va` | `chunk-c-est` + `adverb-comment` |
| Asks about | **a person** | **a thing** |
| Position of `comment` | **first** | **last** |
| Already-met evidence | `Ça va ?` (L17) | `C'est où ?` / `Le café, c'est où ?` (L8) |
| Answers (all owned) | `Ça va.` · `Ça ne va pas.` · `Je suis fatigué(e).` · `Je suis content(e).` | `Ça va.` · `Ça ne va pas.` |

**The two differ on three axes at once** — position of `comment` (first vs last), what is being asked about (person vs thing), and host type (frozen chunk vs supported chunk). That is what makes them structurally distinct rather than cosmetic variants.

**The `où` contrast is the teaching move.** The learner already produces `C'est où ?`. Putting `comment` in the same spot is the lesson's one insight, and it should be surfaced as *notice*, never as a rule:

> `C'est où ?` — where is it. `C'est comment ?` — what's it like. Same shape; the question word changes.

**No conjugation table, no question-word paradigm, no "French question formation" explanation.** One shape, two words.

---

## 6. Candidate Scene / Sentence Family

> Scene (one small moment, continuous with L17): *"You run into someone. You ask how they are. Then you ask about the café you're both heading to."* One human ask, one thing ask — the same word doing both jobs.

| Role | Sentence | Note |
|---|---|---|
| **Open (recycled)** | `Bonjour !` | L0/L1 |
| **Ask about the person (new — Host A)** | `Comment ça va ?` | composition: `adverb-comment` + `chunk-ca-va` |
| **Answer (recycled, L17)** | `Ça va.` / `Ça ne va pas. Je suis fatigué(e).` | the owned answer set |
| **Ask about a thing (new — Host B)** | `Le café, c'est comment ?` | composition: `chunk-c-est` + `adverb-comment`; fronted topic met at L8 |
| **Answer (recycled, L17)** | `Ça va.` | natural, owned; the same two answers serve both hosts |
| **Contrast (recycled, L8)** | `Le café, c'est où ?` | the `où`/`comment` contrast — **the insight**, shown not ruled |
| **Close (recycled)** | `Merci. Au revoir.` | L1/L6 |

- **Anchor:** `Comment ça va ?` · **Structural proof:** `C'est comment ?` · **Contrast:** `C'est où ?` (place) vs `C'est comment ?` (manner).
- **Interchangeable pieces:** the topic before `c'est` (`le café` / `un café`) · the answer (`ça va` / `ça ne va pas`) · the person answer (`je suis fatigué(e)` / `je suis content(e)`).
- **Avoid / forbidden:** `Comment est-ce que ça va ?` · `Comment allez-vous ?` / `Comment vas-tu ?` · `Comment tu vas ?` · bare `Comment ?` · `Comment on fait ça ?` · `Pourquoi …?` / `Quand …?` / `Combien …?` / `Qui …?` · `Qu'est-ce que tu fais ?` · `Je vais bien.` / `Ça va bien.` / `Ça va aller.` · `C'est bon.` / `C'est super.` / `C'est joli.` *(unowned adjectives — see §8)* · `Je vais faire une pause.` *(futur proche)* · any past/future.

---

## 7. The `comment` Sense Boundary

`comment` carries four senses. **L18 owns one.**

| Sense | Example | Ruling |
|---|---|---|
| **manner / state** — "how is it / how are things" | `Comment ça va ?` · `C'est comment ?` | **OWNED — all of L18** |
| **repair** — "sorry?" | bare `Comment ?` | **BLOCKED / DEFERRED** |
| **procedural** — "how does one do X" | `Comment on fait ça ?` | **DEFERRED** — `on fait` unowned; no `verb-faire` |
| **exclamative** | `Comment c'est beau !` | **DEFERRED** — out of band |

**Why the repair sense is blocked, restated where the author will see it.** Bare `Comment ?` is high-frequency real speech, so blocking it needs a reason better than caution. It has one: **`Comment ?` is repair language, and the repair rail in this repo is orphaned.** `chunk-je-ne-comprends-pas` and `chunk-vous-pouvez-repeter` exist only as PR-07 registrations no shipped lesson works, and `c'est pas grave` has no identity at all. Teaching `Comment ?` here would let the learner **signal** a breakdown with no owned way to say `je ne comprends pas`, no way to ask for a repeat, and no way to respond when someone signals one at them. That manufactures a conversational move with no follow-up — the exact failure L17's canDo audit caught when "answer" had to become "open".

**Authoring rule: bare `Comment ?` is never shown as a usable move and never glossed.** The registry meaning for `adverb-comment` states only that other everyday uses exist and are later doorways — following the `word-y-place` precedent — **without** teaching what they mean.

**Owning `adverb-comment` does NOT make every pragmatic sense of `comment` productive.** The lesson must not imply otherwise.

---

## 8. Answer-Inventory Realism

**The learner's answer inventory is narrow, and this spec does not pretend otherwise.**

The registry contains **no descriptive adjectives**. `adj-fatigue` and `adj-content` are person-state adjectives that live in `je suis + state`; there is no `bon`, `super`, `joli`, `grand`, `petit`, or any other quality word. **Do not manufacture adjective vocabulary to make `C'est comment ?` feel richer.** That would be the emotion-vocab-dump failure L17 was scoped to avoid, transplanted onto things.

**What actually answers `C'est comment ?` from owned material:**

- **`Ça va.`** — "it's fine / OK". Natural, idiomatic, owned (L17).
- **`Ça ne va pas.`** — "it's not good". Natural, composed (L17).

That is the whole set, and it is enough. `— Le café, c'est comment ? — Ça va.` is a real French exchange. **The same two answers serve both hosts**, which is precisely why L18 needs no new vocabulary — an elegance to preserve, not a gap to fill.

**Permitted supports** where the answer would otherwise strain (current canon): closed comprehension · `model-answer-only` reveal · contexts whose answer uses genuinely owned state language.

> **The canDo is about producing the QUESTION.** It does not claim a rich descriptive answer lexicon, and must not be written as though it does. A learner who can ask `Comment ça va ?` and `C'est comment ?` and understand the answers has met it.

---

## 9. Continuity Map

| Field | Value |
|---|---|
| **Carry-in — L3** | `c'est` (`chunk-c-est`, supported) — Host B's carrier |
| **Carry-in — L8** | `chunk-c-est-ou` (**frozen** question) + `adverb-ou-where` (**supported inside it**) + `Le café, c'est où ?` (the fronted-topic shape). **Not** an owned end-placement slot — see the correction banner. |
| **Carry-in — L9** | frozen `tu fais quoi ?` — the non-owned Q-word precedent. `quoi` stays in-chunk; L18 does not promote it. |
| **Carry-in — L12** | `est-ce que` (the mechanism) + its routing of question words to *"a later Question Expansion 2"*. **This lesson is that one.** The wrapper is a contrast, never a combination. |
| **Carry-in — L17** | `chunk-ca-va` (Host A's carrier) + `ça ne va pas` + `adj-fatigue` / `adj-content` — **the entire answer set**. L17 shipping when it did is what makes L18 buildable now. |
| **New introduced** | `adverb-comment` (active) — one question word, two owned hosts |
| **Carry-out** | → remaining **question words** (`pourquoi` / `quand` / `combien` / `qui`) once their answer sets exist · → **`qu'est-ce que`** (object questions) · → **inversion / formal register** · → **`Q-word + est-ce que`** · → **embedded questions** · → the **repair rail** (RR-A), which owns bare `Comment ?` when it is adjudicated |
| **Transformation types used** | ☑ question (owned frame + one new Q-word) · ☑ placement contrast (`où` → `comment` in the same spot) · ☐ new mechanism · ☐ negation · ☐ tense doorway · ☐ pronoun insertion |
| **Fade plan** | `comment` moves supported → active → expected **across both hosts**; every other Q-word, inversion, and `Q-word + est-ce que` stay deferred until their own lessons |

> **Principle check** (engine §8): introduces new (`comment` as an owned word) ✓ · grows old (re-questions the L8 shape; re-uses L17's whole answer set) ✓ · prepares future (the rest of the Q-word family, once their answers exist) ✓.

> **L17 continuity, bounded (gate-review ruling preserved):** *L17 supplies the first context; it is not the entirety of L18's architectural value.* Host A is where `comment` is **useful**; **Host B is where it is proved to generalise.** A lesson that leans only on Host A has implemented L17's ritual, not L18.

---

## 10. Exercise Flow — Compact

> Focus: **one word, two placements.** Question archetype weighting run through `chunk-natural-speech` (Meet It / Try It / Weave It strong; no new vocabulary intake; no grammar table).

| Section | Purpose | Learner action | Feedback |
|---|---|---|---|
| **Meet It** | meet `comment` in the useful host | hear/read `Comment ça va ?` in a human moment | reveal meaning |
| **Notice the Pieces** | show the word is separable | see `Comment` + `ça va` as two pieces | deterministic |
| **Why This Works** | the one insight | `C'est où ?` → `C'est comment ?` — same shape, different question word | one "why", passive mirror |
| **Try It** | produce Host A | ask `Comment ça va ?` | `model-answer-only` |
| **Weave It** | produce Host B | ask `C'est comment ?` / `Le café, c'est comment ?` | `model-answer-only` |
| **Shape It** | prove placement, not memory | choose/place `comment` in both positions against the `où` contrast | closed + reveal |
| **Use It** | one small real ask | ask about a person and about a thing, then read the owned answers | `model-answer-only` |
| **Stay with It** | recap | both hosts side by side | — |

**Screen count and production count are not prescribed here** — existing production-quality canon governs (PQ-2 retrieval floor, PQ-3 duplicate-demand advisory). **What is prescribed:** `adverb-comment` must receive **meaningful learner production in both hosts**. Presenting `comment` passively, or producing it only inside `Comment ça va ?`, does **not** satisfy this lesson — and repeating the same sentence twice is a PQ-3 duplicate, not a second host.

---

## 11. Natural Reveal / Feedback

- **`model-answer-only`** throughout — no live AI (L0–L20; live evaluation is paid-zone).
- **One "why", passive mirror.** The single explanation is the placement contrast (§5). Do not explain French question formation, do not compare `est-ce que` mechanically, do not introduce inversion "for completeness."
- **Do not teach a deferred form on the spot.** If a learner reaches for `Comment est-ce que …?` or `Comment allez-vous ?`, the reveal mirrors the owned form; it does not license the attempt.
- **No gamified or evaluative copy** — no XP, streak, level, score, "Perfect", "Amazing".

---

## 12. AI Generation Compatibility

Full allowed/blocked policy: `docs/syllabus/ai-generation-contract-v1.md` **§15, L18 row** (added alongside this spec).

| Leak risk | Mitigation |
|---|---|
| **`Comment est-ce que ça va ?`** — the #1 leak; both halves owned, French correct | only lesson-listed frames; L12 holds `Q-word + est-ce que` at recognition; `trap:question-word-dump` |
| **Q-word dump** (`pourquoi` / `quand` / `combien`) | blocked **even when correct**; one Q-word only |
| **Inversion** (`Comment allez-vous ?`) | reuse `trap:inversion-too-early` (L8) |
| **Unowned answers** (`Je vais bien.` / `Pas mal.` / `C'est super.`) | answers restricted to L17's shipped set; `Je vais bien` also leaks `aller` against `chunk-ca-va`'s explicit guard |
| **`aller` / futur via `va`** | `chunk-ca-va`'s registry meaning carries the guard and `weakPointTags: ["aller-future"]` — keep it |
| **Repair-sense leak** (bare `Comment ?` glossed) | `trap:comment-repair-sense-too-early`; never shown as a usable move |
| **Composite drift** (`chunk-comment-ca-va` treated as one unit) | both hosts are authored composition; no id, no link, no components |
| **Phantom `faire`** | no `verb-faire` exists; `faire` only inside `chunk-faire-une-pause`, as a package |
| **New descriptive vocabulary** | §8 — none is owned; do not manufacture any |
| **Generic chatbot drift** | a check-in question is the band's most natural open-dialogue vector; `model-answer-only`, scoped |

---

## 13. Mon Lexique Output

| Entry | Kind | Status | Note |
|---|---|---|---|
| **`adverb-comment`** | adverb | **active (new)** | shipped `b6013aa`; `frenchQa: "founder_waived_provisional"` |
| `chunk-ca-va` | chunk | recycled (active) | L17 — Host A carrier; keeps its `aller`/futur guard |
| `chunk-c-est` | chunk | recycled (supported) | L3 — Host B carrier |
| `chunk-c-est-ou` | chunk | recycled (active) | L8 — the contrast |
| `adverb-ou-where` | adverb | recycled (**supported**) | L8 — stays supported; the asymmetry with `comment` is deliberate |
| `adj-fatigue` / `adj-content` | adjective | recycled (active) | L17 — answers |
| ~~`chunk-comment-ca-va`~~ / ~~`chunk-c-est-comment`~~ / ~~`chunk-comment`~~ | — | **NOT CREATED** | authored composition |
| ~~repair-sense id~~ | — | **NOT CREATED** | RR-A |

**No new ID kind, no sense suffix** (unlike `où`/`ou`, `comment` has no accent-stripping homograph), **no new `LearningItemType`, no new `LessonArchetype` member.**

---

## 14. QA / Pilot Findings

- **French QA: `founder_waived_provisional`.** No named human has read `Comment ça va ?`, `C'est comment ?`, or `Le café, c'est comment ?`. Internally reachable under the founder's explicit risk acceptance for the tester APK; **not** named-human approved, **not** public/content-complete ready. `docs/qa/french/` remains explicitly *NOT REVIEWED* and scoped L1–L10. **No reviewer name, review date, or `approved` status may be recorded that the founder has not supplied.** The provisional inventory stands at **9 items**.
- **Highest-value smoke check: does Host B land?** If the learner comes out able to ask `Comment ça va ?` but not `C'est comment ?`, L18 has failed its own acquisition claim and its `doorway` role is a misdescription. **Check Host B first.**
- **Second check: the `où` → `comment` contrast.** It should read as *noticing*, not as a grammar rule. If it needs explaining, it is over-built.
- **Watch for:** a second Q-word creeping in "for completeness"; an unowned adjective appearing as an answer; bare `Comment ?` glossed anywhere; `Comment est-ce que …?` in any generated alternative.
- **Charter status unchanged:** `L18+ | Open / provisional`. This spec is implementation-level canon beneath the gate review; **it does not promote the Charter spine.**

---

*End of L18 Question Expansion 2 Compact Spec. Spec only — no lesson content, no code, no runtime change. L18 = `journeyRole: doorway`, active-new exactly **1** (`adverb-comment`), owning `comment` in its manner/state sense across **two** already-owned hosts — `Comment ça va ?` (front, L17 carrier) and `C'est comment ?` (final, L3/L8 carrier) — answered entirely from L17's shipped set. Bare `Comment ?`, every other question word, `Q-word + est-ce que`, inversion, `qu'est-ce que`, embedded questions, the procedural sense, and futur proche are all deferred. The two-host requirement is binding: one host proves a sentence, two prove a word.*
