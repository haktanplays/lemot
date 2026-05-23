# L1–L5 Foundation Spine Retrospective

> **Scope**: Syllabus/canon QA pass over the first five lesson specs as a *connected foundation arc*, before L6. **Not** a new lesson spec. Planning/canon only — authorizes **no** code, content, flag, or runtime change. It modifies no lesson spec; where a change is warranted it is recorded as an **action item** (§15), not silently patched.

> **Stance**: objective and critical. Where L1–L5 are overloaded, repetitive, café-centric, or structurally thin, this says so. Reviewed against `docs/learning-engine-v1.md`, `docs/syllabus/lesson-spec-template-v1.1.md`, `docs/syllabus/lesson-archetype-templates-v1.md`, and the five committed specs (L01–L05).

---

## 1. Executive Summary

L1–L5 **do** form a coherent first foundation arc — and a genuinely *anticipatory* one (a lesson sets up a later lesson on purpose, e.g. L2 seeds L4's être↔avoir contrast; L4 defers `pas de` to L5, which lands it). The spine as built:

| Slot | Lesson | Owns |
|---|---|---|
| L0 | First taste | `Bonjour, je voudrais un café.` (onboarding) |
| L1 | Survival Kit | social doorway + polite request + rescue |
| L2 | Être | identity / state / `c'est` |
| L3 | Negation / Yes-No / Tu-Vous | `ne…pas` as control |
| L4 | Avoir-State | human states / need (être↔avoir) |
| L5 | Objects / Articles | object packages with `un`/`une` |

**Verdict in one line:** coherent and well-sequenced, but with two real weaknesses to address before/around L6 — a **difficulty spike at L2–L3** and **café/transactional-centricity** across the whole arc — plus one cross-cutting gap (**canonical-ID convention still unlocked**) that blocks runtime, not pedagogy.

---

## 2. Lesson-by-Lesson Snapshot

| Lesson | Primary archetype | Secondary | Owned target | A / S / R | Recycled (carry-in) | Production | Main carry-out | Main risk |
|---|---|---|---|---|---|---|---|---|
| **L1** | Chunk / Survival (#1) | — | social doorway + `je voudrais` + rescue | 13 / 8 / 12 | ~4 (L0) | 5–6 | `je voudrais` → être/avoir; rescue → negation | phrasebook; **2 full-cycle engines** |
| **L2** | Architecture-verb (#2) | french-contrast (flavor) | `je suis` identity + `c'est` | 10 / 11 / 13 | 8 | 6 | `je suis` → negation; `je suis fatigué` → `j'ai faim`; `c'est un` → articles | `c'est` vs `il/elle est`; latent gender agreement |
| **L3** | Negation/Question/Social (#3) | architecture-verb (light) | `ne…pas` | 10 / 10 / 11 | 11 | 6 | `ne…pas` → `je n'ai pas` → `pas de` | overload (3 bundled skills) — densest |
| **L4** | Avoir-State (#4) | architecture-verb + french-contrast | `j'ai faim/soif/besoin de` + `je n'ai pas faim` | 8 / 8 / 10 | 11 | 6 | `pas de`, `j'ai un` → L5 | avoir-chunk proliferation (was overloaded → lightened) |
| **L5** | Object/Article (#5) | thematic + french-contrast | `un/une` object packages | 8 / 9 / 8 | 13 | 6 | `un/une` → plural; `le/la` → pronouns; `pas de` → partitive | article taxonomy / gender lecture (was borderline → lightened) |

> A/S/R = active-new / supported-new / recognition counts (per each spec's §5). L1's "13 active" is **9 new + 4 recycled-from-L0**, several of which are *fixed social chunks* (see §5).

---

## 3. Foundation Arc Continuity

The intended growth chain holds at every link:

| Bridge | Status | Evidence |
|---|---|---|
| L1 `je voudrais` → L2 `je voudrais être médecin` | ✅ strong | L2 §4/§7 carry-in transform (infinitive chain) |
| L2 être/`c'est` → L3 negation/question | ✅ strong | L3 operates on `je suis`→`je ne suis pas`, `c'est`→`ce n'est pas`, `vous êtes ?` |
| L3 `ne…pas` → L4 `je n'ai pas …` | ✅ strong | L4 negation carry-in (supported) |
| L4 `j'ai` + object / `pas de` pressure → L5 articles | ✅ strong (designed handoff) | L4 dodged `pas de` with `ça`; L5 lands it + `un café` becomes active |
| L5 object slots → future plural / partitive / pronouns | ✅ seeded | L5 §7 carry-out table |
| **L2 `je suis fatigué` → L4 `j'ai faim` (être↔avoir)** | ✅ **anticipatory** | seeded in L2 §7 + `itemRegistry` `micro-je-suis-vs-j-ai`, cashed in L4 |

**No broken or missing bridges.** One soft spot: the **rescue chunk** (`je ne comprends pas` / `pouvez-vous répéter`) is carried in every lesson but never *grows* — it stays a frozen rescue. That is acceptable (it's a safety rail), but it should eventually be revealed as productive comprehension language, not stay frozen forever. Minor; not blocking.

---

## 4. Load / Cognitive Pressure Review

| Lesson | Total exposure | Active new | Supported new | Recognition | Recycled | Verdict |
|---|---|---|---|---|---|---|
| L1 | ~35 | 9 (+4 recycled-active) | 8 | 12 | ~4 | **healthy** (chunk-dense; active count inflated — needs watch) |
| L2 | ~42 | 10 | 11 | 13 | 8 | **slightly heavy** |
| L3 | ~42 | 10 | 10 | 11 | 11 | **slightly heavy / needs watch** (densest; 3 bundled skills) |
| L4 | ~37 | 8 | 8 | 10 | 11 | **healthy** (after lightening) |
| L5 | ~38 | 8 | 9 | 8 | 13 | **healthy** (after lightening) |

**The load curve is uneven.** It runs light → **heavy → heavy** → light → light. The **L2–L3 pair is the difficulty spike**: two consecutive ~42-item lessons, and L3 bundles three skills (negation + tu/vous + questions) even after demotions. L4 and L5 were each *lightened during review*, which pulled the back half down — good, but it means the spike sits early, right where a beginner is most fragile. This is the arc's main load problem.

Per-lesson notes:
- **L1 — chunk-dense but not a phrasebook?** *Mostly.* The `je voudrais ___` frame carries generativity, and the pronunciation/expression bloat from the legacy lesson was demoted. But several "active" items are fixed social chunks (bonjour, merci, au revoir) — generativity is lower than the count suggests (§5).
- **L2 — architecture-verb without a conjugation table?** *Yes.* Only `je suis` active; paradigm recognition. Clean.
- **L3 — transformation-heavy but controlled?** *Yes, barely.* It works only because tu/vous rides known être forms and questions are intonation-only. It is at the archetype's overload edge.
- **L4 — human-state focused after lightening?** *Yes.* Owned core = faim/soif/besoin de/`ne…pas faim`; paradigm + `envie de` recognition.
- **L5 — object-slot focused after lightening?** *Yes.* `un/une` packages; `le/la` identification-only; plural/partitive/agreement deferred.

---

## 5. Active / Supported / Recognition Integrity

Tiering is **largely sound**, with one honest caveat and a couple of watch-items:

- **Are recognition items secretly production targets?** No clear violations. `ne…plus` (L4), the avoir paradigm (L4), `des`/partitive (L5), agreement (L5), `est-ce que` (L3) are all genuinely recognition and never appear in a production target. ✅
- **Are supported items too important to be merely supported?** Borderline: **`je n'ai pas …` / `pas de`** is *supported* in L3→L4→L5 but is arguably core conversational equipment. It's deliberately kept supported to avoid overload, which is defensible, but it means negation never becomes a fully *owned active* skill in the foundation — flag for a later promotion check.
- **Are "active" items actually fixed chunks inflating the count?** **Yes, in L1.** `bonjour`, `merci`, `au revoir`, `pardon` are fixed social chunks counted as active. The chunk-dense archetype legitimately allows this, but the **L1 "active 13" overstates generativity** — the real generative core is `je voudrais ___`. This is the single most misleading number in the spine; honest to flag.
- **Hidden prerequisites?** One latent risk: **gender** is "shown not drilled" in L2 (`fatigué/fatiguée`), L4 (state nouns), L5 (`un/une` packages). By L5 the learner is choosing `un/une` correctly per noun without ever being *taught* gender — which is intended (package learning), but the prereq is *accumulated recognition*. If a later lesson assumes gender *rules*, that prereq was never taught. Track it.

---

## 6. Sentence Family / Engine Quality

| Lesson | Real sentence family? | Interchangeable-piece engine? | Avoids phrase-list? | Avoids grammar-table? | Usable production? |
|---|---|---|---|---|---|
| L1 | ✅ scene-flow | ✅ `je voudrais ___` | ⚠️ partly (social chunks) | ✅ | ✅ café order |
| L2 | ✅ | ✅ `je suis ___` / `c'est ___` | ✅ | ✅ (no table) | ✅ self-intro |
| L3 | ✅ | ✅ `ne ___ pas` / intonation | ✅ | ✅ | ✅ say no / ask |
| L4 | ✅ | ✅ `j'ai ___` / `besoin de ___` | ✅ | ✅ | ✅ states/needs |
| L5 | ✅ | ✅ `un/une + noun` slot | ✅ | ✅ (after lightening) | ✅ order objects |

**Engine quality is the spine's strongest dimension.** Every lesson has a genuine sentence family and at least one interchangeable-piece engine; none collapses into a passive phrase list or a conjugation grid. L1 is the weakest here (social-chunk pull), L2/L3/L4/L5 are clean.

---

## 7. Sound / Writing Pattern Coverage

| Layer | Coverage in L1–L5 | Status |
|---|---|---|
| Accents / special letters | `é` = "ay" (L1 recognition) | light, enough |
| Elision / apostrophe | `j'`, `c'`, `s'`, `n'`, `l'` across L2/L4/L5 (recognition) | **well covered** |
| Liaison | `vous-z-êtes` (L2), `vous-z-avez` (L4), `les-z-amis` (L5) — all recognition | adequate (recognition) |
| Silent final letters | L1 CaReFuL demoted to recognition | light |
| Nasal vowels | `sont`/`bon` touched only in legacy/L2 recognition | **thin** |
| French `u` /y/ | `tu` vs `tout` (L3 minor) | light |
| Rhythm groups | **not covered** | **gap (by design)** |
| Spelling-sound bridges | `é-→s-` (étudiant↔student, L2 recognition) | light |

**Verdict: enough for a foundation, as a recognition layer — with two notable absences** (nasal vowels barely touched; rhythm groups untouched). This is *intentional* (no pronunciation lesson exists yet, per the sound/writing guardrail of 0–1 note per lesson). **No new sound lesson should be added now.** Action: when a pronunciation/listening lesson is eventually scheduled, it should consolidate nasal vowels + rhythm groups, which the foundation only grazes.

---

## 8. French-Specific Contrast / Transfer Trap Coverage

The micro-contrast layer is **used well and consistently** — it is, in effect, the spine's pedagogical signature:

| Contrast | Where | Quality |
|---|---|---|
| `bonjour` as social doorway / contract | L1 | ✅ |
| `je voudrais` vs `je veux` (register) | L1/L2 | ✅ |
| `je suis` vs `j'ai` (être↔avoir) | L2 (seed) → L4 (core) | ✅ best in arc |
| `c'est` vs `il/elle est` (pointer vs attribution) | L2 (recognition) | ⚠️ held recognition; fine |
| `ne…pas` placement (wrap vs English single "not") | L3 | ✅ |
| tu/vous as social choice | L3 | ✅ |
| `un/une` noun package; gender stored with noun | L5 | ✅ |
| `pas de` bridge (negation changes article) | L4→L5 | ✅ |

**LearnCraft harvest principle (reaffirmed):** LearnCraft (and similar Spanish/contrast sources) may be used as a *source for which contrasts to harvest*, but **French-specific explanations always win** — do **not** port Spanish topics or sequencing directly. The contrasts above are French-grounded, not transplanted. This principle is already codified in template §7.10; the foundation honors it.

---

## 9. Tense / Aspect / Mood Doorway Review

Seeded so far (all by L5):

| Form | Status across L1–L5 |
|---|---|
| present (être, avoir) | active (one person-form each); other persons recognition |
| conditionnel | chunk-only via `je voudrais` (recognition) |
| infinitive chain | supported via `je voudrais être` (L2); `besoin de + noun` (L4) |
| negation transformation | active `ne…pas` (L3) on present verbs |
| past / future systems | **none** — no passé composé, imparfait, futur proche, futur simple |
| `être en train de` / `venir de` | **none** |

**This is correct for an A1 foundation** — the spine deliberately stays in the present and seeds the infinitive chain. But it means **L1–L5 have no time dimension at all.** L6–L10 should begin opening it. The natural first doorway is **`aller` + infinitive (futur proche)**: it reuses the infinitive-chain mechanic already seeded by `je voudrais être`, adds movement/destination (which also breaks café-centricity, §13), and is high-frequency. A *light* passé-composé doorway belongs later (L8–L10 range), after futur proche, and only as chunks first (engine §10).

---

## 10. Mon Lexique Compatibility Review

Mon Lexique output is **consistent and learner-safe across all five lessons**:
- **Entry types present**: word (faim, café), chunk (je voudrais, j'ai besoin de), frame (`frame-je-suis-slot`), updated entries (je suis → gains negation; je voudrais → gains être/need links), related pieces, where-used examples, review hooks, weak-point tags, Word-Graph-edge placeholders. ✅ all dimensions appear.
- **Learner-facing surface stays simple** (meaning + examples + related + mastery), with technical metadata internal — honored everywhere. L5 correctly stores nouns **as packages** (`un café`) with no exposed gender field. ✅
- **Consistency**: format is consistent; "updated entry" semantics are used the same way in L3/L4/L5 (an engine gains a negation/contrast/article form).

**The one real inconsistency is upstream, not in Mon Lexique itself: the canonical-ID convention is unlocked.** Every spec uses placeholder IDs (`chunk-je-suis`, `frame-ne-pas`, `article-un`, …) and explicitly flags the convention as open. Mon Lexique compatibility *depends* on stable shared IDs (engine §14), so this is the gap that most directly threatens Mon Lexique/Word-Graph integration. Not too technical, not too sparse — but **ID-fragile**. (Action §15.)

---

## 11. Practice Pool / Daily Review Readiness

| Seed type | Coverage across L1–L5 |
|---|---|
| Build | ✅ every lesson |
| Stretch | ✅ every lesson |
| Challenge | ✅ every lesson |
| Daily Review hooks (+1/+3/+7d) | ✅ every lesson |
| Listening traps | ✅ (un/une, suis/es/est, j'ai/je suis, oui/si) |
| Weak-point repair | ✅ (ne-placement, gender, etre-vs-avoir, de-after-negation) |
| Old-engine return hooks | ✅ explicit in each §14 |
| Weave review | ✅ each lesson supplies a mixed FR/EN Weave |

**Readiness is good.** The seeds are defined as *formats*, not generated pools (correct — engine §13). One gap: the seeds are **described**, not **enumerated with counts**, so a downstream generator has format guidance but not volume targets. That's acceptable at spec stage but is exactly what an AI-generation contract (§12) would pin down.

---

## 12. AI Generation Compatibility

The L1–L5 specs are **sufficient to constrain AI generation in principle** — each carries allowed frames, forbidden substitutions, active/supported/recognition boundaries, carry-in/carry-out, Natural Reveal tone, and Mon Lexique metadata. (Note: L1–L5 themselves use **no runtime AI** — Say It Your Way is `model-answer-only` throughout — so the immediate AI surface is small.)

**The binding rules a generator must follow (stated here for the record):**
> AI must generate **according to the lesson spec, its archetype, and its active/supported/recognition boundaries** — only the allowed frames, only the permitted fillers, honoring forbidden substitutions and carry-in/carry-out, emitting Mon Lexique-compatible metadata, and using the passive-mirror Natural Reveal tone. **AI must NOT introduce unseen grammar or advanced vocabulary just because the French is correct** — prerequisite-safety and the active/supported/recognition tiers override "it's valid French."

**These rules are currently scattered across five specs + the engine doc + the template.** There is no single binding document. **Recommendation: a `docs/syllabus/ai-generation-contract-v1.md` is needed** before any AI-generated examples/variations/Practice-Pool/Daily-Review/feedback features are switched on. It should consolidate the rules above + per-tier generation limits + enumerated seed-count targets. Flagged as an action item (§15), not created here.

---

## 13. Risks Before L6

1. **Café / transactional-centricity (top content risk).** `café` recurs in L0, L1, L4, L5; the dominant world is ordering/transactions. Human/relational/emotional language is thin (L4's faim/peur is the main exception). The learner can order coffee five ways but can't yet talk about people, feelings beyond hunger/fear, or relationships. **L6+ must broaden context.**
2. **Difficulty spike at L2–L3.** Two consecutive heavy lessons early; a beginner may stall there. L4/L5 lightening helped the back half but not the spike.
3. **`je n'ai pas` / negation stays supported**, never owned-active in the foundation — conversational gap to watch.
4. **Canonical-ID convention unlocked** across all five specs — the cross-cutting integration blocker (Mon Lexique/Word Graph).
5. **Runtime divergence.** Committed v1 runtime (`lesson-000` café, `lesson-001` "Je suis") does **not** match this spine (L1=Survival Kit, L2=Être). Post-smoke alignment + a `lesson-001`→L2 re-slot are owed (already logged in L1/L2 specs).
6. **L6 choice itself** could deepen the spike (another new system) or relieve it (review/broadening) — see §14.

---

## 14. Recommendations for L6–L10 (do not write L6 yet)

Candidates evaluated:

| Option | Pros | Cons |
|---|---|---|
| **Review / Integration** (#10) | consolidates the L2–L3 spike; grows all 5 engines; can broaden context (break café-centricity) via recombination | risks "feels like a test" if framed wrong; adds no new capability |
| **Aller / futur proche** (#7) | opens the *missing time dimension*; reuses seeded infinitive chain (`je vais + inf`); movement breaks café-centricity; high frequency | another architecture verb right after a system-heavy run |
| Object pronouns `le/la/les` (#6) | clean continuity from L5 articles | abstract; doesn't break café-centricity; pronoun-before-recognition risk |
| `faire` (#2) | high-frequency verb | yet another architecture verb; no new axis |
| Question expansion (#3) | finishes what L3 deferred | re-opens the L3 overload risk early |

**Recommended single next move: L6 = Review / Integration + human-context broadening (archetype #10).** Reasoning: the spine just introduced **five new systems in five lessons** with an early **L2–L3 density spike** and a **café-centric world**. The engine's own principle is "grow old engines"; a consolidation beat that *recombines* L1–L5 into **new human/relational scenes** (meeting people, simple reactions, small talk — using only known engines) both settles the spike and fixes the centricity, with **zero new grammar load**. Frame it as calm practice (passive mirror), never an exam, to avoid the archetype's "feels like a test" risk.

**Then L7 = Aller / futur proche** as the first tense doorway. This ordering (consolidate → open time) is more defensible for a fragile foundation than stacking a sixth system immediately.

> If the team prefers momentum over consolidation, **L6 = Aller / futur proche** is the acceptable alternative — but a Review/Integration lesson should then be non-negotiable by ~L7–L8.

---

## 15. Action Items

**Before the L6 spec**
- Decide L6 direction (recommendation: Review/Integration; alt: Aller). — *product decision*
- Note the L1 "active count" inflation so L6+ specs don't copy fixed-chunk-as-active accounting. — *doc hygiene*

**During L6–L10 planning**
- Open the **time dimension** (Aller/futur proche first; light passé-composé doorway later, chunks-first).
- Plan a **context-broadening** pass (people/relationships/feelings) to counter café-centricity.
- Decide when **negation** gets promoted from supported to owned-active.
- Schedule a **pronunciation/listening** lesson that consolidates nasal vowels + rhythm groups (the foundation's thin sound layers).
- Author **`docs/syllabus/ai-generation-contract-v1.md`** before any AI-generated content feature is enabled.

**After smoke test / runtime alignment**
- **Lock the canonical-ID naming convention** (highest cross-cutting priority) — required for Mon Lexique/Word Graph.
- **Re-slot committed v1 runtime**: `lesson-001` ("Je suis") → L2; new L1 = Survival Kit; align L0/L1 boundary.
- Reconcile the runtime lesson order/content with this L1–L5 spine.

**Later / post-beta**
- Word Graph (uses the locked IDs).
- Full Mon Lexique surfacing.
- Broader negation (`ne…plus/jamais/rien`), partitive (`du/de la/de l'`), plural (`les/des`), adjective-agreement systems — all deferred from L3–L5.

---

## 16. Final Verdict

- **Is the L1–L5 foundation spine coherent?** **Yes** — and anticipatory; the handoffs (être↔avoir seeded L2→L4; `pas de` deferred L4→L5) land on schedule. Engine quality (sentence families + interchangeable engines) is strong throughout.
- **Is it too heavy?** **In the middle, yes** — L2–L3 is a difficulty spike. The arc as a whole is acceptable after L4/L5 lightening, but the spike sits early.
- **Is it too light?** No — if anything the back half (L4/L5) is now appropriately lean; nothing is underloaded.
- **Is it ready to support L6?** **Yes**, structurally. The carry-out hooks for L6 (time, pronouns, plural, broadening) are all seeded.
- **Single highest-priority fix before continuing?** **Relieve the early difficulty spike and break café-centricity by making L6 a Review/Integration + human-context lesson, before opening the time dimension at L7.** (The canonical-ID lock is the highest *runtime* priority, but it's a post-smoke concern, not a blocker for continuing spec work.)

---

*End of L1–L5 Foundation Spine Retrospective. Planning canon only — authorizes no code, content, flag, or runtime change. Recommendations are action items, not applied patches.*
