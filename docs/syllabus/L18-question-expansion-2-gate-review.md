# L18 — Question Expansion 2 (`comment`) Gate Review / Pre-Spec Scope

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/canonical-item-id-convention-v0.1.md` + `docs/syllabus/ai-generation-contract-v1.md` + `docs/syllabus/L10-L20-band-map-v0.md` + **`docs/syllabus/L18-L20-sequence-decision-v1.md`** (the sequence this gate implements) + the L8 (`où`) / L12 (`est-ce que`) / L13 / L17 specs and the shipped L0–L17 corpus.
> **Pre-spec planning/review only.** This is a **gate review**, NOT the L18 lesson spec. It authorizes **no** code, content, registry, flag, or runtime change, creates **no** canonical identity, and does **not** create `docs/syllabus/L18-*.compact-spec.md`. Locked product canon wins on conflict. Dev APK runtime (L1–L5 only) is unaffected.

> ## Founder decisions locked before this review (read first)
>
> Unlike L12/L14/L15/L16/L17, this gate is written **after** its founder decisions, not before them. The following were settled by founder direction on 2026-08-08 and are **inputs**, not recommendations:
>
> 1. **L18's job is controlled Question Expansion 2** — introduce one productive question-word slot without opening the full French question system.
> 2. **The Q-word is `comment`, and L18 owns exactly ONE Q-word.** A second is **not** taken merely because the band map's free-tier allowance permits 1–2.
> 3. **Journey role: `doorway`**, chosen **pedagogically**. Band check recorded separately (1–2, count 1, PASS).
> 4. **Acquisition: `["adverb-comment"]`** — one demand. The identity is **planned, not created**; no registry change is authorized here.
> 5. **`chunk-comment-ca-va` is explicitly rejected.** `Comment ça va ?` is authored **composition** of `adverb-comment` + `chunk-ca-va` — no composite identity, no `acquisitionLink`, no `acquisitionComponents`.
> 6. **The `Comment ?` repair sense is blocked and deferred.** L18 is not the vehicle for solving the repair rail.
> 7. **The standalone futur-proche preview lesson is retired** (sequence decision §2); its hook is re-homed to the end of L20 as FP-C (§3 there).
>
> This review's job is to **settle the remaining scope questions** — sense boundary, question-system boundary, continuity, archetype, canDo, prohibited scope, Factory readiness — and to state honestly where L18 is thin.
>
> **Status since (2026-08-08):** input 4's *"planned, not created"* was true when this review was written and is now **superseded** — `adverb-comment` shipped in commit `b6013aa`, and the implementation-level canon is **`docs/syllabus/L18-question-expansion-2.compact-spec.md`**. The secondary archetype, left open in §7 below, is now locked to **`thematic-context`**. §10's `generationReady = false` and its CF-001 blocker are likewise resolved.

> ## ⚠️ CORRECTION (2026-08-08) — the L8 premise. Read before §2, §3.2, §5, §9.
>
> Writing the compact spec required checking L8's shipped surface. **Three claims below are false**, and they are the ones this review leaned on to justify `C'est comment ?`. This is a fifth instance of the phantom-ownership class (after L10, L13, L16, and the band map's `faire` row) — inherited, once again, from an L8 *planning* spec rather than shipped content.
>
> **What shipped `lesson-008.ts` actually contains — three French strings, total:** `C'est où ?` · `C'est ici.` · `Le café, c'est où ?`
>
> | Claim below | Reality |
> |---|---|
> | *"L8 taught the slot, and it has held exactly one word ever since"* (§3.2) | **False.** L8's `acquisitionDemandItemIds` is `["chunk-c-est-ou"]` — a **frozen question**. `adverb-ou-where` is `status: "supported"`, and its own registry meaning reads *"the question word inside `c'est où ?`, **owned as part of the frame first**."* L8's lesson note says the same: *"the owned unit is the frozen question."* **There is no owned productive `C'est ___ ?` slot.** |
> | *"`Tu vas où ?`"* as shipped L8 material (§2, §5) | **False.** No identity exists; the string appears nowhere in the lesson. Planning-spec material the compact slice dropped. |
> | *"`Où est … ?`"* as shipped L8 material (§5) | **False.** Same — no identity, not in the lesson. L8's own note says *"no `où est-ce que`, no movement system, no new places: one frozen question and its answer."* |
>
> **`C'est comment ?` survives, and the honest argument is stronger than the false one.** It composes `chunk-c-est` — a genuine registered identity, `status: "supported"`, first worked in L3 — plus `adverb-comment`. And `Le café, c'est où ?` is L8's own shipped line, so the fronted-topic shape is already met. **L18's architectural contribution is precisely that it turns a frozen formula into a slot** by putting a second word where `où` sits. That is exactly what the two-host requirement exists to prove. **No host was substituted and nothing was silently swapped**; only the justification changed, and it improved.
>
> **One consequence worth stating plainly:** L18's ownership model (demand = the *word*, `active`) is a **deliberate departure** from L8's (demand = the *frozen question*, Q-word merely `supported`). That asymmetry is recorded on `adverb-comment` itself and in the compact spec §2. It is the decision, not an inconsistency.
>
> Everything else in this review — the founder-locked inputs, the `comment`-selection argument (§2.1), the sense boundary (§3), the thinness finding (§1, §4.2), the archetype ruling (§7), the leak analysis (§8) — **stands unchanged.**

> **Why this gate exists.** "Question Expansion 2" has been a named, deferred lesson in this repo since L12 — L12's compact spec §3 and Carry-Out and L13's compact spec §3 and Carry-Out all route the question-word family to *"a later Question Expansion 2"*. It now has a number. But question formation is the single archetype-#3 surface most prone to ballooning into a grammar unit (the L3 pilot finding, restated by the L12 gate), and **a question word is a worse offender than a wrapper**: `est-ce que` operates on sentences the learner already owns, whereas a question word demands an **answer** the learner may not own. That asymmetry — not the question mechanism — is what this gate has to police.

---

## 1. Executive Summary

- **Should L18 be Question Expansion 2?** **Yes.** It is the only genuinely-seeded, in-band capability left. It is named as a deferred lesson twice in shipped canon, the band map's free-tier Q-word allowance is **unspent**, and the alternative (a standalone futur-proche preview) is structurally unbuildable under ratified journey-role canon (sequence decision §2).
- **What exactly should L18 own?** **`comment` in its manner/state sense, and nothing else.** One `adverb-comment` identity, dropped into **two hosts the learner already owns** — final position after L3's `c'est`, in the spot L8's frozen `C'est où ?` occupies, and front-placed before L17's social check-in (`Comment ça va ?`). **0 new question mechanisms, 0 new grammar systems, 0 new architecture verbs.**
- **What must remain deferred?** Every other question word (`pourquoi`, `quand`, `combien`, `qui`, `que`); `qu'est-ce que`; **`comment` + `est-ce que`**; inversion (`comment allez-vous ?`, `comment vas-tu ?`); embedded questions; the `Comment ?` repair sense; the procedural sense (`comment on fait ça ?`); the exclamative sense; and **futur proche** in every form.
- **Is L18 safe after L17?** **Yes**, with one honest caveat. The rhythm is fine (L17→L18 is two consecutive new-capability lessons before L19's beat, inside the ≤3 ceiling), the load is one adverb, and L17 shipped exactly the answers `comment` needs. **The caveat is surface thinness** — see the headline below. It is a spec problem, not a sequencing problem.

> **Headline finding (the thing this gate exists to say).** **L18's genuine risk is the opposite of L12's.** L12's risk was over-opening; L18's is **under-delivering**. One adverb into two host frames is a *very* small doorway, and the failure mode is that `Comment ça va ?` gets authored as a **second frozen social chunk** — at which point L18 has taught a greeting variant, not a productive question-word slot, and its `doorway` role becomes a misdescription. **The compact spec must demonstrate the slot in at least two structurally distinct host frames**, or the ownership claim collapses. §4 states this as a binding prerequisite, not a suggestion. This is also why the founder's "exactly one Q-word" cap is right rather than merely cautious: the answer to thinness is *depth in one slot*, not a second word.

---

## 2. Prior Question Layers (what the learner actually has)

Verified against the **shipped** corpus, not against planning specs — the phantom-ownership failure class that produced the L10, L13, and L16 blockers came from trusting specs over shipped content.

| Lesson | Shipped question capability | Deferred / recognition | Bridge to L18 |
|---|---|---|---|
| **L3** | yes/no by **intonation** (`C'est bon ?`, `Vous êtes prêt ?`) | `est-ce que` recognition; Q-words + inversion deferred | establishes the yes/no move |
| **L8** | ~~**one question word, `où`**, via a fixed frame (`Où est … ?`) **and spoken end-placement** (`C'est où ?`, `Tu vas où ?`)~~ → **CORRECTED:** **one frozen question**, `chunk-c-est-ou` (`C'est où ?`), plus `C'est ici.` and `Le café, c'est où ?`. `adverb-ou-where` is **supported inside the frame**, never productive. `Tu vas où ?` and `Où est … ?` **never shipped**. | `est-ce que`/inversion recognition; all other Q-words deferred | ~~the end-placement frame is a *slot*~~ → **the load-bearing precedent is the opposite one**: L8 proves the final slot after `c'est` has held **one frozen word** since L8, so putting a second word there is L18's actual contribution |
| **L9** | `tu fais quoi ?` as a **fixed supported chunk** | `quoi` **only** inside that chunk; `qu'est-ce que` recognition | proves a Q-word can live frozen-in-chunk before its system |
| **L11** | `je peux …?` / `vous pouvez …?` by rising intonation | `est-ce que je peux …?` recognition; `puis-je` deferred | — |
| **L12** | **`est-ce que` as a yes/no wrapper** over owned clauses | **all Q-words** → *"a later Question Expansion 2"*; inversion; `qu'est-ce que`; `où + est-ce que` | **routes here explicitly** |
| **L17** | `ça va` (frozen, asked and answered) · `ça ne va pas` (composed) · `je suis fatigué(e)` / `je suis content(e)` | consolation; advice; `se sentir`; broad emotion lexis | **supplies the answers `comment` needs** |

**Reading.** The learner owns **one** question word (`où`), **one** question wrapper (`est-ce que`), and **one** frozen Q-word chunk (`quoi` inside `tu fais quoi ?`). They have never owned a **second** productive question word. L18 is that second one — and the mechanism it uses is **already owned**, which is the whole reason it is a small, safe lesson.

### 2.1 Why `comment` and not another Q-word

The decisive test is **not** frequency; it is **whether the learner owns the answers**. A question word the learner can ask but cannot answer produces a dead exchange and pressures the AI into generating unowned language to fill the gap.

| Q-word | Answers require | Owned after L17? | Verdict |
|---|---|---|---|
| **`comment`** (manner/state) | `ça va` · `ça ne va pas` · `je suis fatigué(e)` · `je suis content(e)` | **yes — all four shipped in L17, one commit before this gate** | **selected** |
| `pourquoi` | `parce que` + a clause | no — `parce que` has no identity | deferred |
| `quand` | time expressions | no — no time lexis is owned | deferred |
| `combien` | numbers | no — **the registry contains zero number identities** | deferred |
| `qui` | person nouns | thin — no owned person-noun set | deferred |
| `que` / `qu'est-ce que` | an object-question mechanism | no — reserved (L9, L12) | deferred |

**`comment` is the only Q-word whose answer set the learner already owns.** L17 shipping when it did is what makes L18 buildable now; if L17 had shipped a different scope, this lesson would not be the right next one.

---

## 3. The `comment` sense boundary

`comment` carries four distinct senses. **L18 owns one.**

| # | Sense | Example | Ruling |
|---|---|---|---|
| **1** | **manner / state — "how is it / how are things"** | `Comment ça va ?` · `C'est comment ?` | **OWNED — the whole of L18's target** |
| **2** | **repair — "sorry, what?"** | `Comment ?` (bare, rising) | **BLOCKED / DEFERRED** — founder decision |
| **3** | **procedural — "how does one do X"** | `Comment on fait ça ?` | **DEFERRED** — requires `on fait`, unowned; `faire` has no identity (§6.3) |
| **4** | **exclamative** | `Comment c'est beau !` | **DEFERRED** — register/idiom, far out of band |

### 3.1 Why the repair sense is blocked — and why that is the right call

Bare `Comment ?` is one of the highest-frequency uses of the word in real speech, so blocking it needs a reason better than caution. It has one: **`Comment ?` is repair language**, and the repair rail in this repo is **orphaned**. `chunk-je-ne-comprends-pas` and `chunk-vous-pouvez-repeter` exist only as PR-07 L1-pilot registrations that **no shipped lesson works**, and `c'est pas grave` has **no identity at all**. L16 de-scoped its repair beat over this; L17 struck `c'est pas grave` and blocked consolation over this.

Teaching `Comment ?` at L18 would **half-solve** the rail — the learner could signal a breakdown but still could not say `je ne comprends pas` or `vous pouvez répéter ?`, and could not respond when someone signals one at them. That is worse than not opening it: it manufactures a conversational move with no owned follow-up, which is exactly the failure L17's canDo audit caught ("open", not "answer").

**Ruling: RR-A holds. L18 does not touch the repair rail.** When the rail is adjudicated as its own curriculum work, `Comment ?` is a natural member of it — and this gate deliberately leaves that door open rather than spending the sense here.

**Authoring consequence:** the learner must never be shown bare `Comment ?` as a usable move. It may appear at most as ambient French that is not glossed and not required.

### 3.2 What "one productive slot" means concretely

`comment` occupies a slot in **two frames the learner already owns**:

| Host frame | Owned since | With `comment` | Note |
|---|---|---|---|
| **final position, after `c'est`** | **L3** `chunk-c-est` (supported) + the shape met at **L8** (`C'est où ?`, `Le café, c'est où ?`) | `C'est comment ?` · `Le café, c'est comment ?` | the **structural** argument, *as corrected*: L8 shipped that spot as part of **one frozen question**, so putting a second word in it is exactly what turns a formula into a slot. Composes `chunk-c-est` + `adverb-comment`. |
| **front-placed + frozen social chunk** | **L17** (`chunk-ca-va`) | `Comment ça va ?` | the **natural-frequency** argument: this is how the check-in is actually opened |

**These two must both appear, and must be visibly different, or the doorway claim fails** (§1, §4). One is a slot the learner can generalize; the other is the high-frequency social use. Authoring only the second produces a frozen chunk wearing a doorway's label.

> **Composition, per founder decision 5 and the shipped L13/L17 precedent.** `Comment ça va ?` is **authored composition** — `adverb-comment` + `chunk-ca-va`, side by side in the payload. **No `chunk-comment-ca-va` identity is created**, no `acquisitionLink`, no `acquisitionComponents`. This follows `je ne peux pas` (`lesson-013.ts`: composed as model copy, *"never as a chip"*) and `Ça ne va pas.` (L17). Punctuation and adjacency do not mint identities.
>
> **Known authoring risk, left visible rather than solved by minting an id:** `Comment ça va ?` is idiomatic enough that a learner may take it whole regardless of how it is authored. That is precisely why `C'est comment ?` is not optional — it is the evidence that the slot is a slot.

---

## 4. Recommended L18 Scope

| Field | Ruling |
|---|---|
| **Job** | controlled **Question Expansion 2** — one productive question-word slot, no new question mechanism |
| **Journey role** | **`doorway`** — pedagogical: L18 opens one bounded productive question-word capability that did not exist before. *(Band check, recorded separately so it is not mistaken for the reason: doorway band 1–2, L18 count 1, **PASS**.)* |
| **Acquisition demands** | **`["adverb-comment"]`** — exactly 1 |
| **Planned identity** | `adverb-comment` · surface `comment` · type `adverb` · active-new |
| **Prerequisites** | `["v1-lesson-017"]` — L17 supplies the answer set (§2.1) |
| **Primary archetype (schema)** | **`chunk-natural-speech`**, following shipped L8 and L12 — see §7 |
| **Primary archetype (prose)** | **#3 Negation / Question / Social Choice** — the planning family; **no enum member exists for it** (§7) |
| **Secondary archetype** | **open — compact spec decides**, constrained to a real enum member (§7) |
| **New question mechanisms** | **0** — `comment` takes final position after the owned `chunk-c-est` (the spot L8's frozen `C'est où ?` occupies) and sits in front of the frozen L17 chunk |
| **New grammar systems** | **0** |
| **New architecture verbs** | **0** |
| **Q-words owned** | **1** |
| **Full question-formation ownership** | **0** |

### 4.1 canDo

> **"I can ask one simple 'how' question with `comment`, using language I already know."**

**Ruling: this scope is binding; the wording is not frozen.** The compact spec may substitute a more natural equivalent **provided it preserves all four constraints**: (a) **one** question word, (b) **`comment`** specifically, (c) **asking** — not answering an open question, not repairing, (d) **using owned language** — no promise of an ability the learner cannot exercise.

**This constraint is not pedantry.** L17's canDo had to be re-ratified from "answer" to "open" *after* the first generation run, because "answer a small human moment kindly" promised consolation the learner had no owned way to give. A canDo that overstates is a defect that surfaces late and expensively. The safe test: **can the learner do everything this sentence says, using only shipped material?**

### 4.2 Binding prerequisites for the compact spec

These are **gate conditions**, not recommendations. A compact spec that misses any of them has not implemented this gate.

1. **Two structurally distinct host frames** for `comment` — end-placement (`C'est comment ?`) and front-placed-with-`ça va` (`Comment ça va ?`). Authoring only the social one reduces L18 to a frozen chunk and invalidates the `doorway` role (§1, §3.2).
2. **Every answer in the lesson is drawn from shipped material.** The answer set is `ça va` · `ça ne va pas` · `je suis fatigué(e)` · `je suis content(e)`, plus other genuinely-shipped recyclables. **Nothing from a planning spec.**
3. **`comment` never combines with `est-ce que`.** `Comment est-ce que ça va ?` is the single most likely leak (§5, §8).
4. **No second Q-word appears as production**, even though the band allows two.
5. **The French QA posture for `adverb-comment` is stated explicitly**, and no reviewer, date, or `approved` status is recorded that the founder has not supplied (§10).

---

## 5. Allowed / Deferred Matrix

| Item | Classification | Note |
|---|---|---|
| **`comment`** (manner/state) | **ACTIVE (new — the one demand)** | `adverb-comment` |
| **`Comment ça va ?`** | **ACTIVE — composed** | `adverb-comment` + `chunk-ca-va`; **not** an identity |
| **`C'est comment ?`** | **ACTIVE** | `chunk-c-est` (L3, supported) + `adverb-comment`, in the spot L8's frozen question occupies — the evidence that turns a formula into a slot |
| **`ça va` / `ça ne va pas`** | **RECYCLED (active)** | L17 — the answers |
| **`je suis fatigué(e)` / `je suis content(e)`** | **RECYCLED (active)** | L17 — the answers |
| **`C'est où ?` / `Le café, c'est où ?` / `C'est ici.`** | **RECYCLED** | L8 — **the whole of its shipped French**. The contrast that makes the slot visible. ~~`Où est … ?` / `Tu vas où ?`~~ **struck — never shipped, no identity exists.** |
| **`c'est`** (`chunk-c-est`, supported) | **RECYCLED** | L3 — the actual carrier of `C'est comment ?` |
| **`est-ce que` + owned clause** | **RECYCLED (active)** | L12 — but see the next row |
| **`Comment est-ce que ça va ?`** | **BLOCKED** | Q-word + wrapper. L12 already holds `où + est-ce que` at **recognition only**; L18 does not graduate it. **The #1 leak.** |
| **`Comment ?`** (bare, repair) | **BLOCKED / DEFERRED** | founder decision; RR-A (§3.1) |
| **`Comment on fait ça ?`** | **DEFERRED** | procedural sense; `on fait` unowned, `faire` has no identity |
| **`Comment allez-vous ?` / `Comment vas-tu ?`** | **DEFERRED** | inversion — reuse `trap:inversion-too-early` (L8) |
| **`Comment tu vas ?`** | **DEFERRED** | needs productive `tu vas`; only `tu vas où ?` ships, as a supported chunk |
| **`pourquoi` · `quand` · `combien` · `qui` · `que`** | **DEFERRED** | answers unowned (§2.1); **not** taken even though the band permits a second Q-word |
| **`qu'est-ce que`** | **RECOGNITION only** | reuse `trap:qu-est-ce-que-overload` (L9) |
| **`quoi`** | **RECYCLED, stays L9 in-chunk** | `tu fais quoi ?` only; **not** promoted |
| **embedded / indirect questions** | **DEFERRED (post-Campfire)** | `je ne sais pas comment …` — needs `savoir`, unowned |
| **`faire` / a `faire` paradigm / a general infinitive slot** | **DEFERRED — not owned** | only `chunk-faire-une-pause` as a package (§6.3) |
| **futur proche** (`je vais + inf.`) | **DEFERRED** | not previewed here; the hook lives at the end of L20 (FP-C) |
| **past / future tense** | **DEFERRED** | present only |
| **object pronouns** | **DEFERRED** | `m'aider` stays frozen inside `vous pouvez m'aider` |
| **advice / conditionnel / consolation** | **DEFERRED** | L15 + L17 holds — `comment` invites "how are you → you should…" |
| **full question formation** | **DEFERRED (post-Campfire ~L24)** | the headline engine stays the paid-zone reward |

---

## 6. Corrections carried into this gate

Recorded in full in `docs/syllabus/L18-L20-sequence-decision-v1.md` §5; restated here because they change what L18 may build with. **No lesson is reopened by any of them.**

### 6.1 L18 does not "land" an L7 futur hook
Shipped `lesson-007.ts` carries `je vais` **only** as `Je vais à la maison.` — the frozen movement chunk, described in its own copy as *"the moving engine."* There is **no `je vais + infinitive`** in the lesson. The band map's *"futur proche … (L7 hook → L18 stronger preview)"* is stale: there is no L7 hook.

### 6.2 L17 carried no futur hook either
Shipped `lesson-017.ts` contains **zero** occurrences of `je vais`. L17's gate review permitted a hook (*"may carry"*); none was authored. **No shipped lesson has previewed futur proche at all.**

### 6.3 The `faire` carry-in is phantom ownership
The band map's L18 row lists *"aller, faire, infinitive"* as recycled engines. The registry has `verb-etre`, `verb-aider`, `verb-aller` — and **no `verb-faire`**. `faire` lives only inside `chunk-faire-une-pause`, a frozen package. **No infinitive slot is owned anywhere**; `verb-aller` is `status: "supported"` and reachable only after the frozen `il faut` / `je dois`.

**Consequence for L18:** it may recycle `chunk-faire-une-pause` **as a package** and must not treat `faire` or an infinitive slot as owned. This is the fourth appearance of the same failure class (L10, L13, L16, and now the L18 row) — recorded so the compact spec does not inherit it a fifth time.

---

## 7. Archetype — and the schema trap

The content archetype and the journey role are **independent axes** (archetype templates §12b). Neither implies the other.

**The trap:** prose archetype titles are **not** `LessonArchetype` enum values. L17's first implementation attempt failed typecheck on exactly this (`thematic-vocabulary` → the real value is `thematic-context`).

**L18's planning archetype is prose #3, "Negation / Question / Social Choice."** **There is no `negation-question` / `negation-question-social-choice` member of `LessonArchetype`.** The label appears in the L3, L8, and L13 planning specs, but **no shipped lesson declares it, because it cannot be declared.** Both shipped question lessons resolve it identically:

- `lesson-008.ts` (the `où` question-word doorway) → `primaryArchetype: "chunk-natural-speech"`
- `lesson-012.ts` (the `est-ce que` question doorway) → `primaryArchetype: "chunk-natural-speech"`

**Ruling: `primaryArchetype: "chunk-natural-speech"`**, following L8 and L12 — and L8 in particular, since it is the *same* lesson type (one question word into an owned frame).

**Secondary:** the founder direction named `chunk-natural-speech`; since that value must carry the primary slot, the **secondary is left open for the compact spec**, with `thematic-context` the candidate (human-context continuity from L17). **Whatever is chosen must be a real enum member.**

> `[OPEN]` The missing prose-#3 enum member is a **pre-existing schema gap**, surfaced here, not fixed. Adding an enum value is a schema change and out of scope for a gate review.

---

## 8. AI Generation Risk (ties to `ai-generation-contract-v1.md`)

> L18 runs `model-answer-only` (no live AI pre-paywall). The *content* risks apply **now**, to whoever authors the lesson; the *generation* risks govern the Factory run.

| Leak risk | Where it bites at L18 | Contract anchor / mitigation |
|---|---|---|
| **`comment` + `est-ce que`** | `Comment est-ce que ça va ?` — both halves are owned, and the combination is correct French | **the #1 leak.** §8 frame guardrail: only lesson-listed frames; L12 holds `Q-word + est-ce que` at recognition; `trap:question-word-dump` |
| **Q-word dump** | one Q-word "opens" the family → `pourquoi` / `quand` / `combien` | §8: only `comment`; blocked **even when correct**; `trap:question-word-dump` |
| **Inversion** | `Comment allez-vous ?` is the textbook phrasing and will be the model's first instinct | §6/§8; reuse `trap:inversion-too-early` (L8) |
| **`qu'est-ce que`** | "how/what" proximity | recognition only; reuse `trap:qu-est-ce-que-overload` (L9) |
| **Unowned answers** | `Comment ça va ?` invites `Je vais bien.` / `Ça va bien.` / `Pas mal.` — all natural, **none owned** | answers restricted to L17's shipped set; `Je vais bien` also leaks `aller` against `chunk-ca-va`'s explicit guard |
| **`aller` / futur leak via `va`** | `ça va` → `ça va aller` → `je vais + inf.` | `chunk-ca-va`'s registry meaning already carries the guard and `weakPointTags: ["aller-future"]`; keep it |
| **Repair-sense leak** | bare `Comment ?` glossed as a usable move | §3.1; RR-A; blocked |
| **Advice / consolation drift** | "how are you" → "not great" → "you should rest" | L15 + L17 holds; conditionnel deferred; **L17's canDo audit is the precedent** |
| **Procedural sense** | `Comment on fait ça ?` | `on fait` unowned; `faire` has no identity (§6.3) |
| **Generic chatbot drift** | a check-in question is the most natural open-dialogue vector in the band | §11: scoped production-and-mirror, not open dialogue |
| **Past / future** | "how was it?" | §6 tense guardrail — present only |

> **Drafted §15 L18 row (for the compact spec to apply — NOT applied by this task; see §11).**
> **Allowed:** `Comment ça va ?` *(composed from `adverb-comment` + `chunk-ca-va`)* · `C'est comment ?` · `Ça va.` · `Ça ne va pas.` · `Je suis fatigué.` / `Je suis fatiguée.` · `Je suis content.` / `Je suis contente.` · `C'est où ?` · `Bonjour.` / `Merci.` / `Au revoir.` · plus genuinely owned recycled material.
> **Blocked:** `Comment est-ce que ça va ?` *(Q-word + wrapper)* · `Comment allez-vous ?` / `Comment vas-tu ?` *(inversion)* · `Comment ?` *(repair sense — RR-A)* · `Comment on fait ça ?` *(procedural; `on fait` unowned)* · `Comment tu vas ?` *(productive `tu vas` unowned)* · `Pourquoi …?` / `Quand …?` / `Combien …?` / `Qui …?` *(second Q-word)* · `Qu'est-ce que tu fais ?` *(recognition only)* · `Je vais bien.` / `Ça va bien.` / `Ça va aller.` *(unowned answers; `aller`/futur leak)* · `Tu devrais …` / `Il faudrait …` *(advice)* · `Je ne comprends pas.` / `Vous pouvez répéter ?` / `C'est pas grave.` *(phantom repair)* · `Je vais faire une pause.` *(futur proche)* · past/future · object-pronoun production · open-ended AI chat.
> **Note:** L18 = Question Expansion 2, **one** Q-word (`comment`), manner/state sense only; **journeyRole doorway; active-new exactly 1**; 0 new question mechanisms; the second host composes the owned `chunk-c-est` with `comment` in the spot L8's frozen `C'est où ?` occupies, and **both** hosts are composition, not identities.

---

## 9. Mon Lexique / Canonical ID Impact

| ID | Kind | Status | Note |
|---|---|---|---|
| **`adverb-comment`** | adverb | **active (new — the one demand)** | **planned, NOT created by this task** |
| `chunk-ca-va` | chunk | **recycled (active)** | L17 — keep its `aller`/futur guard and `weakPointTags: ["aller-future"]` |
| `adj-fatigue` / `adj-content` | adjective | **recycled (active)** | L17 — the answers |
| `adverb-ou-where` | adverb | **recycled** | L8 — the slot's first occupant; the contrast partner |
| `chunk-c-est-ou` | chunk | **recycled** | L8 — the **frozen** question that supplies the contrast (not an owned slot) |
| `chunk-c-est` | chunk | **recycled (supported)** | L3 — the actual carrier of `C'est comment ?` |
| ~~`chunk-comment-ca-va`~~ | — | **NOT CREATED** | founder decision 5; composition, not an identity |
| ~~`adverb-comment-repair`~~ | — | **NOT CREATED** | the repair sense is not owned, so it needs no id |
| `trap:question-word-dump` | trap | **reuse** (L12) | do not fork |
| `trap:inversion-too-early` | trap | **reuse** (L8) | do not fork |
| `trap:qu-est-ce-que-overload` | trap | **reuse** (L9) | do not fork |

**ID-design notes:**

- **No sense suffix is needed.** The convention (§2) requires one only when ASCII/accent normalization **collides two meanings** into the same slug — `où`/`ou` → `adverb-ou-where`, `y` → `word-y-place`. **`comment` has no homograph and no collision**, so plain `adverb-comment` is correct. Adding a suffix would imply a second `comment` sense is planned; none is.
- **Type is `adverb`**, matching `adverb-ou-where` — the existing precedent for an interrogative in this registry.
- **No composite identity, no `acquisitionLink`, no `acquisitionComponents`** for `Comment ça va ?`. `acquisitionLink`'s `linked` role forbids being a target, and the composed surface **is** the targeted surface — the same reasoning that rejected `chunk-je-suis-fatigue` at L17.

---

## 10. Factory V0 readiness

**`generationReady` today: `false`.**

| Check | Status |
|---|---|
| Job, journey role, Q-word, sense boundary settled | ✅ this gate |
| Acquisition count and identity name/type settled | ✅ this gate |
| canDo scope settled | ✅ §4.1 |
| Archetype (primary) settled | ✅ §7 |
| `adverb-comment` exists in `itemRegistry.ts` | ❌ **CF-001 blocker** |
| L18 compact spec exists | ❌ not written (deliberately out of scope) |
| AI contract §15 L18 row applied | ❌ pending compact spec (§11) |
| Secondary archetype chosen | ❌ pending compact spec |
| French QA posture for `adverb-comment` decided | ❌ founder decision required |

- **Expected blocker: CF-001 — missing `adverb-comment`.** The preflight resolves each declared demand against the registry; the only `type: "adverb"` entries today are `word-ici` and `adverb-ou-where`. **This blocker is expected and correct** — the preflight working, not a defect.
- **Expected founder / open decisions blocking L18's purpose, journey role, or identity model: none** after this gate.
- **French QA.** No named-human French review exists anywhere in this repo; `docs/qa/french/` is explicitly *NOT REVIEWED* and scoped L1–L10. When `adverb-comment` is created it faces the same decision L17's three identities faced. **`founder_waived_provisional` is internally reachable under explicit founder risk acceptance and is NOT public-release ready. No reviewer name, review date, or `approved` status may be recorded that the founder has not supplied — AI linguistic review is never human attestation.** This applies with force to `C'est comment ?`, which is natural spoken French but has had no human check.

---

## 11. Detailed Spec Recommendation

**Recommendation: write a COMPACT L18 spec next** — consistent with L12/L13/L14/L15/L16/L17. **This task does not write it.**

- **Compact, not full:** L18 owns **one adverb, 0 new mechanisms, 0 new systems**. A full spec would invite the question-word tables and mechanism comparisons this gate forbids — the same reasoning that made L12 compact.
- **Not integration:** L19 is the integration beat. Making L18 integration would waste the twice-routed Question Expansion 2 hook and leave the band's last new capability unspent.
- **Not postponed:** the hook is routed from both L12 and L13, the answers shipped at L17, and the rhythm permits it now.
- **Not split:** one adverb cannot be split across two lessons.

**Doc patches to apply when the compact spec is written (proposed — NOT applied by this task):**

- **`docs/syllabus/ai-generation-contract-v1.md` §15** — add the **L18 row** (drafted in §8). Rows are added **at compact-spec stage**, per the explicit and consistent pattern in the L12 (§9), L16 (§11), and L17 (§11) gate reviews. **The §15 table correctly stops at L17 today.**
- **`docs/syllabus/lesson-archetype-templates-v1.md` #3** — optional one-line note that this archetype also covers *"Question Expansion 2 — owning one question word into an already-owned frame, while the remaining Q-words, inversion, and `Q-word + est-ce que` stay deferred"* (companion to the L8 and L12 notes).
- **`docs/syllabus/canonical-item-id-convention-v0.1.md`** — optional note that `comment` needs **no** sense suffix, and that the repair sense is unowned rather than separately identified.
- **`docs/syllabus/L10-L20-band-map-v0.md`** — **already reconciled** by this task for L18/L19/L20.
- **No L12/L13/L17 patch needed** — L12 and L13 already route their carry-outs to Question Expansion 2, and L17 supplies the answer set without claiming L18's scope.

---

## 12. Final Verdict

- **Is L18 ready for detailed spec writing?** **Yes — ready for a *compact* spec.** All founder decisions are locked and every scope question this gate opened is settled. The only implementation blocker is the `adverb-comment` identity, which is a **known, expected, mechanical** step (§10).
- **What should L18 own?** **`comment` in its manner/state sense — one identity, `adverb-comment`, in two already-owned hosts** (`C'est comment ?` = L3's `chunk-c-est` + `comment`, in the spot L8's frozen question occupies; `Comment ça va ?` = `comment` + L17's frozen chunk), answered entirely from L17's shipped set. **1 demand · 0 new question mechanisms · 0 new grammar systems · 0 new architecture verbs.**
- **What should L18 absolutely NOT own?** **Any second question word**; **`comment` + `est-ce que`**; **inversion**; **`qu'est-ce que`**; the **repair** sense (`Comment ?`); the **procedural** sense; **embedded questions**; **`faire` / an infinitive slot**; **futur proche**; **past/future**; **object pronouns**; **advice or consolation**; **open AI chat**.
- **Single highest-risk leak: `Comment est-ce que ça va ?`** Both halves are owned, the combination is perfectly correct French, and L12 deliberately held `Q-word + est-ce que` at recognition. It is a **prerequisite-safety** leak, not a correctness one — which makes it invisible to any check that only asks whether the French is right, and makes AI generation the likeliest vector.
- **Highest-risk *authoring* failure (distinct from the leak): thinness.** One adverb is a small doorway, and the easy way to fill a lesson is to lean on `Comment ça va ?` — at which point L18 has taught a **greeting variant** wearing a doorway's label. §4.2's two-frame requirement is the binding guard, and it is the thing to check first when the candidate arrives.

---

## Open Items / Notes

- This is a **gate review (v0)**, not a spec. Unlike its predecessors it is written **after** its founder decisions, so §§3–10 settle scope rather than recommend it.
- **`[OPEN]`** prose-#3 has **no `LessonArchetype` enum member** (§7) — surfaced, not fixed.
- **`[OPEN]`** the **secondary archetype** is left to the compact spec (§7).
- **`[OPEN]` RR-A** — the orphaned repair rail (§3.1). Acknowledged, unassigned, non-blocking, and **not** solved by L18.
- **`[OPEN]`** French QA for `adverb-comment` (§10) — founder decision required; no provenance may be fabricated.
- **No runtime, code, content, registry, flag, or ID change is authorized by this document.** `adverb-comment` is **planned, not created**. Dev APK scope (L1–L5 only, no paywall) is unaffected; L18 is far out of dev-apk scope. The Dev APK smoke test remains the boundary before any runtime work.

*End of L18 Question Expansion 2 Gate Review. Planning/review only — no lesson spec, no identity, no code/content/registry/runtime change. Ratified: L18 = **Question Expansion 2**, `journeyRole: doorway`, **active-new exactly 1** (`adverb-comment`), owning `comment` in its manner/state sense only — in final position after L3's owned `chunk-c-est` (the spot L8's frozen `C'est où ?` occupies) and in front of L17's frozen `chunk-ca-va` — with the repair sense, the procedural sense, every other question word, `Q-word + est-ce que`, inversion, `qu'est-ce que`, embedded questions, and futur proche all deferred. The standalone futur-proche preview lesson is retired; its hook lives at the end of L20 as FP-C.*
