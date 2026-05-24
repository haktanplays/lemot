# L15 — Devoir / Falloir-light (Obligation) Gate Review / Pre-Spec Scope

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/canonical-item-id-convention-v0.1.md` + `docs/syllabus/ai-generation-contract-v1.md` + `docs/syllabus/L10-L20-band-map-v0.md` + the L4/L6/L9/L11/L13/L14 specs.
> **Pre-spec planning/review only.** This is a **gate review**, NOT the L15 lesson spec. Authorizes **no** code, content, flag, or runtime change, and does **not** create `docs/syllabus/L15-*.lesson-spec.md` / `*.compact-spec.md`. Locked product canon wins on conflict. Dev APK runtime (L1–L5 only) is unaffected.

> **Why this gate exists.** The band map flags **L15 (Devoir/Falloir-light) as HIGH risk**: it may combine **two major obligation engines** (`devoir` + impersonal `falloir`/`il faut`) **right after L11 pouvoir** (modal density), and obligation leaks easily into **advice, conditionnel (`devrais`/`faudrait`), the subjunctive (`il faut que`), moral/abstract obligation, and broad modal grammar**. Before writing the spec, this review decides **whether to own one engine or two**, and fixes the safest scope.

---

## 1. Executive Summary

- **Should L15 be Devoir/Falloir-light?** **Yes** — obligation is core A1 and completes the **can ↔ must** pair the learner earned at L11 (`je peux`). But it must stay a **narrow, chunk-leaning doorway**, not a modal-grammar lesson.
- **Both `devoir` and `falloir`, or just one?** **Both — but strictly asymmetric and light** (Option B, below). Own **`il faut + inf.`** as the **primary** form (impersonal, **invariable / zero-paradigm**, lowest-load, highest-frequency) and **`je dois + inf.`** as a **supported single-person-form** (personal "I have to", the direct `je peux` parallel). **If smoke shows overload, fall back to `il faut + inf.` only** (Option C).
- **What exactly should it own?** `chunk:il-faut` + `frame:il-faut-plus-infinitive` (active) and `chunk:je-dois` + `frame:je-dois-plus-infinitive` (supported), filled only with **already-owned infinitives** (`aller`, `faire ça`/`faire une pause`, `comprendre`). Genuinely new lexis = **two modal forms**; infinitives are owned (same discipline as L11).
- **What must remain deferred?** the **full `devoir` paradigm** (`tu dois`/`on doit`/`il doit`/…); **conditionnel `je devrais` / `il faudrait`** ("should"); the **subjunctive `il faut que`**; **`il faut + noun`** (`il faut une pause`) and **`il me faut`** (need + pronoun); **`devoir` = "to owe"**; **obligation-vs-advice nuance**; the **negation-meaning nuance** (`il ne faut pas` = prohibition); past/future.
- **Is L15 safe after L14?** **Yes**, on conditions: asymmetric-light scope, infinitives owned, and it is the band's **second/last** architecture verb, **followed by L16 integration** (rhythm: L14 `y` + L15 devoir → L16 beat). The `je peux`↔`je dois` contrast is the bridge.

> **Headline recommendation (product-critical, not flattering the band map):** the band map says "own one light slice each"; this review **sharpens that to asymmetric** — `il faut + inf.` is the safe anchor because it is **invariable** (no paradigm to leak), and `je dois` is held to **one person-form**. The **single biggest danger is the subjunctive** (`il faut que + subj`): `il faut` naturally takes a `que`-clause, so the spec must **block the `que`-clause hard**. The whole "advice/should" register (`devrais`/`faudrait`) is a second strong leak and is **out of scope** — L15 owns **obligation, not advice**.

---

## 2. Prior Modal / Need Layers

| Lesson | What was owned | Relevance to obligation |
|---|---|---|
| **L4** | **`j'ai besoin de` (+ noun) = "need"** as a noun/chunk | the learner's **existing "need" expression** — `il faut`/`je dois` are the **verbal** obligation upgrade (need-to *do*, not need a *thing*) |
| **L6** | `je voudrais + infinitive` (the modal+infinitive **mechanic**) | the shape `modal + plain verb` that `il faut`/`je dois` reuse |
| **L9** | `faire ça` / `faire une pause` (small-action faire) | owned infinitives → `il faut faire une pause`, `je dois faire ça` |
| **L11** | **`je peux + inf.` (pouvoir)** | the **direct parallel**: `je peux` (can) ↔ `je dois` (must) — the learner owns one modal; `devoir` is the same shape, opposite modality |
| **L13** | can-do + asking integration | the after-class scene that hosts obligation |
| **L14** | place-`y` (`j'y vais`) | **unrelated pronoun/particle load** — `je dois y aller` stays recognition-only (don't stack `y`+devoir as production) |

**Critical gap (defines the risk):** the learner owns **one modal** (`pouvoir`) on **one person-form** (`je peux`), and "need" only as a **noun** (`j'ai besoin de`). L15 adds a **second modal** (`devoir`) + an **impersonal obligation** (`il faut`) — modal density, plus a paradigm temptation and a subjunctive doorway. Same mitigation as every architecture-verb lesson: **one dominant slice, infinitives owned, paradigm/subjunctive/conditionnel deferred.**

---

## 3. Candidate L15 Ownership Options

### Option A — Devoir-first only
**Own:** `je dois + [owned inf.]` (+ maybe `je ne dois pas + inf.` if safe). **Scope:** personal obligation ("I have to / I need to"). **Defer:** `il faut`, conditionnel `devrais`, falloir, advice.
- **Strengths:** personal + useful; clean `je peux`↔`je dois` parallel; one engine only.
- **Weaknesses:** opens the **`devoir` verb/paradigm** (the higher-paradigm-risk of the two), and **skips the cheapest, most French-natural necessity form** (`il faut`, invariable). `je ne dois pas` carries the **negation-meaning nuance** (ambiguous) — defer it.
- **Verdict:** viable but **not optimal** — it spends the paradigm-risky form and omits the free, zero-risk one.

### Option B — Devoir + Falloir-light (RECOMMENDED, asymmetric)
**Own:** `il faut + [owned inf.]` (active, primary) + `je dois + [owned inf.]` (supported, one person-form). **Scope:** general necessity (`il faut`) vs personal obligation (`je dois`), **very light contrast**. **Defer:** `il faut que`, `il me faut`, `il faudrait`, `je devrais`, subjunctive, broad advice, paradigm.
- **Is it too much?** **Only if symmetric.** Made **asymmetric** (`il faut` primary/invariable + `je dois` one-form), the genuinely-new load is **two modal forms over owned infinitives** — comparable to L11 (`je peux` active + `vous pouvez`/`je ne peux pas` supported). `il faut` adds **no paradigm**; `je dois` adds **one** form. The contrast (impersonal necessity vs personal must) is high-value and natural.
- **Strengths:** completes can↔must; `il faut` is the safe invariable anchor; both forms reuse owned infinitives; L16 integration consolidates immediately.
- **Risks:** modal density + subjunctive/paradigm/conditionnel temptation — all guarded.
- **Verdict:** **adopt (asymmetric).**

### Option C — Falloir chunk-first
**Own:** `il faut + [owned inf.]` only (+ maybe `il faut une pause` if natural). **Defer:** `devoir`, the full obligation contrast.
- **Is impersonal `falloir` more natural but too abstract?** It is **more French-natural for necessity** and **zero-paradigm (safest)**, but **impersonal/abstract** ("one must") and **misses personal "I have to"** + the `je peux`↔`je dois` bridge. **`il faut une pause`** (il faut + noun) is a **different sense** ("we need a break") and drags in partitive pressure — **defer it**, keep `il faut + infinitive` only.
- **Verdict:** **the safety fallback** — adopt **only if** Option B strains in smoke. Strong, but under-delivers the personal form.

### Option D — No new modal; integration only
- Delay obligation; make L15 integration.
- **Verdict:** **reject.** L16 is already the integration beat (+ A Small Moment seed); an L15 integration over-integrates and stalls a core A1 capability. Obligation is worth one narrow doorway here.

**Recommendation: Option B (asymmetric — `il faut + inf.` primary + `je dois + inf.` supported)**, with **Option C (il faut only) as the smoke-test fallback**.

---

## 4. Recommended L15 Scope

| Field | Recommendation |
|---|---|
| **Primary archetype** | **Architecture Verb (#2)**, as a **split-sense / light-slice obligation doorway** (4th split-sense instance after L7 aller, L9 faire, L11 pouvoir) |
| **Secondary archetype** | flavor only: **Chunk / Natural Speech (#1)** (`il faut`/`je dois` near-chunks). Not a second budget. |
| **Owned target** | `frame:il-faut-plus-infinitive` (active, impersonal) + `frame:je-dois-plus-infinitive` (supported, `je` only) + `phen:obligation-light` + `phen:devoir-vs-falloir-light` (personal vs impersonal, light) |
| **Active-new estimate** | **~6–8** (low end of archetype #2's ~10–14, split-sense): `chunk:il-faut`, `frame:il-faut-plus-infinitive`, `word:devoir`, `chunk:je-dois`, `frame:je-dois-plus-infinitive`, `phen:obligation-light` |
| **Supported-new estimate** | **~8–10** (`je dois` applications, `phen:devoir-vs-falloir-light`, `je peux`↔`je dois` contrast, `il faut` over each owned infinitive) |
| **Recognition / ambient estimate** | **~8–12** (devoir paradigm preview, `il faut que + subj` preview-blocked, `je devrais`/`il faudrait` conditionnel, `il faut + noun`/`il me faut`, `je ne dois pas` negation-meaning, `est-ce que je dois …?`) |
| **Recycled estimate** | **~14–18** (owned infinitives `aller`/`faire ça`/`faire une pause`/`comprendre`; `je peux` for contrast; `j'ai besoin de`; the after-class scene) |
| **Production target estimate** | **~5–7** (`il faut faire une pause`, `je dois aller à la maison`, `je dois faire ça`, the can↔must contrast) |
| **Full-obligation ownership** | **0** (no paradigm, no subjunctive, no conditionnel, no advice) |
| **New grammar systems** | **1 narrow doorway** (light obligation: invariable `il faut` + one-form `je dois`, infinitives owned) |

---

## 5. Allowed / Deferred Matrix

| Item | Classification | Note |
|---|---|---|
| **`il faut + infinitive`** | **ACTIVE (primary)** | impersonal, invariable; over owned infinitives |
| **`je dois + infinitive`** | **SUPPORTED** | personal obligation, **one person-form only** (parallels `je peux`) |
| **`pouvoir`/`devoir` contrast** (`je peux` ↔ `je dois`) | **SUPPORTED** | can ↔ must (Why This Works); the L11 bridge |
| **`je ne dois pas + infinitive`** | **RECOGNITION only** | the negation-**meaning** nuance (`je ne dois pas` ambiguous; `il ne faut pas` = prohibition) — shown, not owned |
| **`tu dois` / `vous devez`** | **RECOGNITION / DEFERRED** | devoir paradigm — architecture-verb guardrail |
| **`on doit`** | **RECOGNITION / DEFERRED** | paradigm |
| **`il faut une pause`** (`il faut + noun`) | **DEFERRED** | different sense ("we need X") + partitive pressure |
| **`il me faut`** | **DEFERRED** | `falloir` + indirect-object pronoun ("I need") — pronoun + sense |
| **`il faut que` (+ subjunctive)** | **DEFERRED (paid-zone)** | opens the **subjunctive** — the #1 leak |
| **`je devrais`** (conditionnel) | **DEFERRED** | "should" / advice — out of scope |
| **`il faudrait`** (impersonal conditionnel) | **DEFERRED** | "one should" / advice — out of scope |
| **`devoir` = "to owe"** | **DEFERRED** | different sense |
| **subjunctive (any)** | **DEFERRED** | paid-zone mood system |
| **obligation-vs-advice nuance** | **RECOGNITION only** | L15 owns **obligation**, not advice; don't open "should" |
| **past / future forms** (`j'ai dû`, `il a fallu`, `je devrai`) | **DEFERRED** | unchanged holds |

---

## 6. Paywall / Commercial Depth Check

- **Does owning Devoir/Falloir-light before Campfire ~L24 give away too much?** **No.** `il faut + inf.` and `je dois + inf.` are two high-frequency obligation forms — not the modal system. The deep surface — the **full `devoir` paradigm**, **`il faut que + subjonctif`** (the subjunctive doorway), **conditionnel `devrais`/`faudrait`** (the advice/softening register), and obligation/probability/moral nuances — stays **reserved** (band map §5: light slice early-free; `il faut que + subj` post-paywall).
- **Does withholding obligation language make the free path weaker?** **Yes** — "I have to / one must" is core A1, and the learner already says "I can." Owning the light slice completes the can/must pair (a satisfying capability) without spending the deep systems.
- **Safest commercial compromise:** **own `il faut + inf.` (primary) + `je dois + inf.` (supported); defer the paradigm, the subjunctive, the conditionnel/advice register, and the broad senses.** Strong free utility, intact paid depth (especially the subjunctive and the advice register).

---

## 7. AI Generation Risk (ties to `ai-generation-contract-v1.md`)

| Leak risk | Where it bites at L15 | Mitigation |
|---|---|---|
| **Conditionnel `devrais` / `faudrait`** ("should") | obligation → advice slide | §6 mood guardrail; out of scope; `trap:conditionnel-too-early` |
| **`il faut que` + subjunctive** | `il faut` naturally takes a `que`-clause | **the #1 leak** — block the clause hard; `trap:subjunctive-too-early`, `trap:falloir-que-too-early` |
| **Moral / advice chatbot tone** | "you should…", life-coaching register | obligation only, passive mirror; **no advice generation** (contract §10/§11) |
| **Broad `devoir`/`falloir` contrast** | over-explaining nuance / multiple senses | one light contrast only (personal vs impersonal); no nuance lecture |
| **`devoir` = owe** | `je dois 5 euros` | different sense; `trap:devoir-owe-too-early` |
| **Generic "life advice" generation** | open Say-It prompts → advice essays | scoped production-and-mirror (contract §11); no advice |
| **Piling `devoir` on `pouvoir` + `y`** | `je dois y aller`, `je peux/dois` stacking | `je dois y aller` recognition-only; don't stack modal+`y` as production |
| **Past/future** | `j'ai dû`, `je devrai` | deferred (contract §6) |
| **Devoir paradigm** | `tu dois`/`on doit`/… | one form active; `trap:devoir-full-paradigm` |

> **New contract row needed (when the spec is written):** §15 **L15 row** — Allowed: `Il faut faire une pause.` · `Je dois aller à la maison.` · `Je dois faire ça.` ; Blocked: `Il faut que tu fasses …` (subjonctif) · `Je devrais …` / `Il faudrait …` (conditionnel/advice) · `Tu dois …` / `On doit …` (paradigm) · `Il faut une pause.` / `Il me faut …` (noun/pronoun sense) · `Je dois 5 euros.` (owe) · `J'ai dû …` (past) · `Il ne faut pas …` (negation-meaning, recognition).

---

## 8. Mon Lexique / Canonical-ID Impact

Likely new/updated IDs (declared per-spec when L15 is written):

| ID | Kind | Note |
|---|---|---|
| `word:devoir` | word | the modal verb (one form owned) |
| `word:falloir` | word | the impersonal verb behind `il faut` (only `il faut` surfaces) |
| `chunk:il-faut` | chunk | impersonal obligation opener (invariable surface form of `falloir`) |
| `frame:il-faut-plus-infinitive` | frame | `il faut + [owned inf.]` (active) |
| `chunk:je-dois` | chunk | "I have to / I must" |
| `frame:je-dois-plus-infinitive` | frame | `je dois + [owned inf.]` (supported) |
| `phen:obligation-light` | phenomenon | impersonal `il faut` + personal `je dois`, infinitives owned |
| `phen:devoir-vs-falloir-light` | phenomenon | personal (`je dois`) vs impersonal (`il faut`) — light contrast |
| `trap:conditionnel-too-early` · `trap:subjunctive-too-early` · `trap:falloir-que-too-early` · `trap:devoir-owe-too-early` (+ `trap:devoir-full-paradigm`) | traps | guard the leaks |

**ID issues flagged:**
- **`devoir` = must vs owe** — both senses share `word:devoir` now (only "must" surfaces). **If the "owe" sense is ever opened, add a sense suffix** (`word:devoir-must` / `word:devoir-owe`), per the convention §2 homograph rule. Flag now, don't split yet.
- **`il faut` as chunk vs `falloir` verb** — keep `chunk:il-faut` (the frozen surface) **linked to but distinct from** `word:falloir` (the lexeme). The learner meets only `il faut`; `falloir` is the internal lexeme.
- **`fallu` / `faudrait` / `faut` relationship** — `falloir`'s other forms (past participle `fallu`, conditionnel `faudrait`) are **deferred**; when opened, relate them to `word:falloir` (and `faudrait` may need a conditionnel tag). Flag for later; not in L15.

---

## 9. Detailed Spec Recommendation

**Recommendation: write a COMPACT L15 spec next** (do **not** write the full spec now; do **not** split devoir/falloir into two lessons; do **not** turn L15 into integration; do **not** postpone).

- **Compact, not full:** one light obligation doorway (two modal forms, owned infinitives) — a compact spec fits. A full treatment invites the conjugation-table / subjunctive padding the archetype guardrail forbids.
- **Not split into two lessons:** the asymmetric pairing (`il faut` primary + `je dois` supported) is the *point* — the impersonal/personal contrast is high-value and cheap when infinitives are owned. Splitting wastes a slot; the band has only this one obligation lesson before L20.
- **Not integration / not postponed:** L16 is the integration beat; obligation is core A1 and bridges from L11.

**Before writing the spec, lock four decisions:** (1) **asymmetric scope** (`il faut` primary, `je dois` supported one-form; Option C fallback); (2) **paradigm deferred** (one `je dois` form); (3) **subjunctive + conditionnel deferred hard** (`il faut que`, `devrais`, `faudrait` — no `que`-clause, no advice); (4) **`il faut + noun`/`il me faut` + negation-meaning recognition-only**.

**Existing docs that should be patched** (propose — **do NOT auto-apply now**):
- **`docs/syllabus/ai-generation-contract-v1.md` §15** — add the **L15 row** (§7) when the spec is written.
- **`docs/syllabus/lesson-archetype-templates-v1.md` #2** — cite L15 as the **4th split-sense instance** (after L7/L9/L11); note `il faut` as the invariable/zero-paradigm anchor.
- **`docs/syllabus/L10-L20-band-map-v0.md`** — annotate L15 row "asymmetric: `il faut + inf.` primary, `je dois + inf.` supported; subjunctive/conditionnel deferred"; resolve decision-gate 7.
- **No L11/L14 patch needed.**

---

## 10. Final Verdict

- **Is L15 ready for detailed spec writing?** **Yes — ready for a *compact* spec**, once the four §9 gates are locked.
- **What should L15 own?** **`il faut + inf.` (primary, impersonal) + `je dois + inf.` (supported, one person-form)**, over **owned** infinitives, with the `je peux`↔`je dois` (can↔must) contrast.
- **What should L15 absolutely NOT own?** the **full `devoir` paradigm**; the **subjunctive `il faut que`**; **conditionnel `je devrais` / `il faudrait`** (advice register); **`il faut + noun` / `il me faut`**; **`devoir` = owe**; the **negation-meaning nuance** as production; past/future. Full-obligation ownership = 0; new systems = 1 narrow doorway.
- **Single highest-risk leak:** **`il faut que + subjonctif`** — `il faut` naturally takes a `que`-clause, so AI/learners will reach for the **subjunctive**, prematurely opening a deep paid-zone mood system. Close second: the **conditionnel/advice slide** (`devrais`/`faudrait`, moral "should" tone) and the **full `devoir` paradigm**. AI generation is the likely vector for all three.

---

## Open Items / Notes

- This is a **gate review (v0)**, not a spec; revise if the four §9 gates resolve differently.
- **Key open call:** Option B asymmetric (recommended) vs Option C (`il faut` only, safest). Confirm before the spec; B if the team accepts a one-form `je dois`, C if maximum caution is preferred (own `je dois` in a later lesson).
- **Proposed doc patches listed (§9), not applied.**
- **The subjunctive and the advice/conditionnel register are the explicit non-goals** — `il faut que`, `devrais`, `faudrait` stay deferred; do not let L15 take a `que`-clause or generate advice.
- No runtime/code/content/flag/ID change is authorized. Dev APK scope (L1–L5 only) is unaffected. The Dev APK smoke test remains the boundary before any runtime work.

*End of L15 Devoir / Falloir-light Gate Review. Planning/review only — no lesson spec, no code/content/flag/runtime change. Recommendation: L15 = light obligation doorway (Option B asymmetric), `il faut + inf.` primary + `je dois + inf.` supported (one person-form), infinitives owned; the full `devoir` paradigm, `il faut que + subjonctif`, conditionnel `devrais`/`faudrait`, `il faut + noun`/`il me faut`, `devoir`=owe, and the negation-meaning nuance stay deferred.*
