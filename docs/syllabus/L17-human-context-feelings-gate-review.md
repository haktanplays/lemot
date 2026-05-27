# L17 — Human Context / Feelings Gate Review / Pre-Spec Scope

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/lesson-archetype-templates-v1.md` + `docs/syllabus/canonical-item-id-convention-v0.1.md` + `docs/syllabus/ai-generation-contract-v1.md` + `docs/syllabus/L10-L20-band-map-v0.md` + the L4 (avoir-states) / L6 (human-context integration) / L10 / L13 / L15 / L16 specs.
> **Pre-spec planning/review only.** This is a **gate review**, NOT the L17 lesson spec. It authorizes **no** code, content, flag, or runtime change, and does **not** create `docs/syllabus/L17-*.lesson-spec.md` / `*.compact-spec.md`. Locked product canon wins on conflict. Dev APK runtime (L1–L5 only) is unaffected.

> **Why this gate exists.** The band map (Option C) pencils **L17 = "Human context / feelings / advice"** under the **Thematic Vocabulary / Context (#9)** archetype, with **active-new ~7–9** and the phrase **"feelings + light advice."** Both the number and the phrase are dangerous: #9's named QA risk is literally *"vocabulary dump · low production"*, and **"advice"** is the **conditionnel register (`tu devrais` / `il faudrait`) that L15 deliberately deferred to the paid zone**. After L16's integration beat, a feelings lesson can very easily become (a) an emotion-word list, (b) a therapy/coaching chat, (c) a `se sentir` reflexive-verb lesson, or (d) a past/future feeling narrative ("hier j'étais triste"). This review fixes the safest narrow scope **before** the spec is written — and pushes back on the band map where it over-reaches.

---

## 1. Executive Summary

- **Should L17 be Human Context / Feelings?** **Yes — but much narrower than the band map implies.** Broadening human/social language is the right next move (the L1–L5 retrospective flagged café/transactional-centricity; L6 began the fix; L16's reading seed continued it). But L17 must be a **near-integration thematic lesson** — feelings expressed in **already-owned frames**, with **a tiny freshness hook**, not a vocabulary lesson.
- **What exactly should L17 own?** feelings/states inside the **owned `je suis + state` / `j'ai + state` / `je ne suis pas + state` frames**, **plus the social-check chunk `ça va ?` / `ça va` / `ça ne va pas`** (genuinely new, high-utility, and explicitly *reserved for "a later social-check lesson"* by the L1 spec) **plus one positive feeling adjective** (`content`) so the learner can finally say something *positive* about how they feel. **0 new grammar systems, 0 new architecture verbs.**
- **What must remain deferred?** **advice / conditionnel** (`tu devrais` / `il faudrait` — the band map's "light advice" is **demoted**, it is paid-zone per L15); **`se sentir` / `je me sens`** (reflexive system); **broad emotional lexis** (more than ~1–2 new adjectives); **opinion verbs** (`je pense que`); **past/future feeling narrative**; **deep emotional AI personalization / coaching**; **object-pronoun production**; **futur proche ownership** (L18's job).
- **Is L17 safe after L16 Integration + A Small Moment seed?** **Yes**, on conditions: it owns **no** new system, adds **≤2 new lexical items** (`ça va` chunk-set + `content`), keeps "feelings" mostly **recycled** (fatigué/faim/peur/besoin/pas prêt), bans the advice register, and carries at most a **light** A Small Moment recurrence (the real recurrence is **L19**). Its danger is the inverse of an engine lesson: **over-vocabularizing** a lesson that should mostly recombine.

> **Headline recommendation (product-critical, not flattering the band map).** Two sharpenings the band map needs: **(1) cut active-new from ~7–9 to ~3–5.** The learner already owns a rich state inventory (fatigué, faim, soif, peur, besoin, prêt, pas, c'est pas grave); a "feelings" lesson at the #9 band's *top* (7–9 new) would be the exact emotion-vocab dump #9 warns against. L17 should sit **near the integration band**, not the thematic top. **(2) Demote "light advice."** Advice = the conditionnel (`tu devrais`/`il faudrait`) L15 reserved for the paid zone; pairing it with the owned `il faut`/`je dois` invites a moralizing/therapy register. **L17 owns feeling-*statements* and a social check-in, not advice.** Framed this way, L17 is a safe, human, low-leak lesson; framed as "feelings + advice, ~7–9 new words," it is two leaks waiting to happen.

---

## 2. Prior Human Context Layers

| Layer | What it established (state/feeling material) | Relevance to L17 |
|---|---|---|
| **L2** être-state foundation | `je suis + state/identity` (`fatigué`, `étudiant`, `médecin`, `prêt`); `c'est` / `c'est pas grave` | the **owned frame** L17 fills with feelings; `je suis fatigué` is the anchor state |
| **L3** negation / register | `ne…pas`; `vous êtes prêt ?` (recognition) | `je ne suis pas + state` (negated feeling) reuses this |
| **L4** avoir-state / human states | `j'ai faim` · `j'ai soif` (active) · **`j'ai peur` (light-active)** · `j'ai besoin de + noun`; `froid`/`chaud` + `j'ai envie de` = **recognition/deferred** | the owned **avoir-state** feelings; L17 recycles, does **not** re-open the paradigm |
| **L6** human-context integration | recombination in human scenes; **`je ne suis pas prêt`**, `j'ai besoin d'aide`, `je voudrais comprendre`; **1–2 low-risk new words max** rule; café-decentering | the **template L17 inherits** (thematic restraint, "express yourself as a person," 0 systems) |
| **L10 / L13** after-class & can-do integration | recombination of movement/help/asking; passive-mirror human scenes | the human-scene host for feelings |
| **L15** il faut / je dois obligation-light | `il faut + inf.` / `je dois + inf.`; **advice/conditionnel (`devrais`/`faudrait`) deferred (paid-zone)** | **the advice line L17 must NOT cross** — obligation ≠ advice |
| **L16** A Small Moment seed | `model-answer-only`, present-only reading-response seed; recurs L19 | L17 may *lightly* reference it; must **not** become "A Small Moment 2" |

**Owned state/feeling inventory (recyclable in L17, no re-teaching):** `je suis fatigué` · `je suis prêt` / `je ne suis pas prêt` · `je suis étudiant` · `j'ai faim` · `j'ai soif` · `j'ai peur` (light) · `j'ai besoin de` / `j'ai besoin d'aide` · `je ne comprends pas` · `c'est pas grave` · `comprendre` (infinitive) · `mais` (recognition). **Recognition/deferred from L4:** `froid` / `chaud`, `j'ai envie de`.

**Critical observation (defines the scope).** The learner can **already express a wide band of human states** — tired, hungry, thirsty, afraid, not ready, needing help, not understanding, "it's okay." What is **missing** is: (1) a **social check-in** (`ça va ?` — how a real conversation opens/repairs), explicitly **deferred from L1** to "a later social-check lesson"; and (2) **a positive feeling** (every owned state is negative/neutral — the learner cannot yet say "I'm good/glad"). So L17's genuine new value is **tiny and specific**: `ça va ?` + one positive adjective. Everything else is recombination. **A 7–9-word feelings lesson would be inventing a need that doesn't exist.**

---

## 3. Candidate L17 Options

### Option A — Être-state feelings light
**Own:** `je suis + {2–3 human states}` (mostly recycled `fatigué`/`prêt` + 1 new `content`) + `je ne suis pas + state`.
- **Strengths:** rides the owned `je suis ___` frame; 0 new system; lets the learner state a feeling, incl. (newly) a positive one; clean carry from L2/L6.
- **Weaknesses:** the slot *invites* an adjective dump (`triste`, `content`, `heureux`, `inquiet`, `énervé`…) — must cap hard at ~1 new adjective; on its own it's a bit thin (the être-state frame is already well-owned).
- **Verdict:** **adopt the core, capped** — `je suis content` (new) + recycled states, **but pair with C** for a genuine human hook.

### Option B — Avoir-state / need-feeling bridge
**Own:** `j'ai besoin de` / `j'ai faim` / `j'ai peur` (all already owned from L4/L6).
- **Strengths:** zero new vocabulary; reinforces the être↔avoir boundary.
- **Weaknesses:** **nothing is actually new** — this is pure L4 review, not "broadening human language." It adds no freshness and re-opens the avoir-state paradigm risk for no gain.
- **Verdict:** **reject as a primary** — fold its items in as **recycled contrast**, not as the owned target.

### Option C — Social response / empathy chunks
**Own:** `ça va ?` / `ça va` / `ça ne va pas` (**new** social-check, deferred from L1) + `c'est pas grave` (recycled) + `je comprends` (light promotion of the affirmative, currently frozen in `je ne comprends pas`).
- **Strengths:** **the genuinely missing, high-utility, high-social-importance piece** — `ça va ?` is how real French conversations open, check in, and repair; it was **explicitly reserved** for a later social-check lesson (L1 spec §15). As **frozen chunks** these open no system (`ça va` is NOT productive `aller` and NOT futur proche). High emotional/social usefulness (engine §11) for almost no load.
- **Weaknesses:** `ça va` is a homograph of `aller` 3rd-person — must be owned as a **frozen chunk** with a guard so it never opens `aller`/futur; `je comprends` (affirmative) is a tiny promotion that must not imply a `comprendre` paradigm.
- **Verdict:** **adopt as the freshness core.**

### Option D — Pure integration (no new feeling items)
**Own:** recombine L11–L16 only; 0 new items.
- **Evaluation:** **too flat here.** **L16 was already an integration beat (+ A Small Moment); L13 was integration; L19 is the next one.** A third integration at L17 stalls the band and ignores the real gap (`ça va ?`, a positive feeling). Pure integration is L19's job, not L17's.
- **Verdict:** **reject** (but keep L17 *integration-disciplined* — recycle-heavy).

**Recommendation: a narrow hybrid of C (primary) + A (capped).** Own **`ça va ?` / `ça va` / `ça ne va pas`** (social check-in, new chunks) **+ `je suis content`** (one new positive adjective in the owned frame), with **`c'est pas grave`, `je comprends`/`je ne comprends pas`, fatigué/faim/peur/besoin/pas prêt all recycled**. Defer everything else. This gives L17 a real, human freshness hook (the social check) and a positive feeling, with **≤2 new lexical items** and **0 new systems**.

---

## 4. Recommended L17 Scope

| Field | Recommendation |
|---|---|
| **Primary archetype** | **Thematic Vocabulary / Context (#9)** — but run with **Review/Integration (#10) restraint** (recycle-dominant; far below #9's ~10–14 active-new band) |
| **Secondary archetype** | flavor only: **Chunk / Natural Speech (#1)** (`ça va ?` as a near-chunk) + **Review/Integration (#10)** discipline. Not a second budget. |
| **Owned target** | `phen:human-context-feelings-light` + `chunk:ca-va` (`ça va ?` / `ça va` / `ça ne va pas`) + `word:content` (in `je suis + state`); feelings expressed in **owned frames** |
| **Active-new estimate** | **~3–5** *(NOT the band map's 7–9)* — `chunk:ca-va`, `chunk:ca-va-question`, `word:content`, `phen:social-check-in`, `phen:human-context-feelings-light` |
| **Supported-new estimate** | **~4–6** — `chunk:ca-ne-va-pas`, `chunk:je-comprends` (affirmative promotion), `je suis content`/`je ne suis pas content`, the feeling-in-frame recombinations |
| **Recognition / ambient estimate** | **~6–8** — `triste` (recognition only), `se sentir`/`je me sens` (recognition/future-hook), `je vais + inf.` (L18 futur hook), `froid`/`chaud` (L4 recognition), advice register (blocked-recognition) |
| **Recycled estimate** | **~22–26** — fatigué, prêt/pas prêt, étudiant, faim, soif, peur, besoin de/d'aide, je ne comprends pas, c'est pas grave, il faut/je dois (light, not as advice), ça/mais, the after-class scene |
| **Production target estimate** | **~6–8** (retrieval volume; feelings in frames) |
| **New grammar systems** | **0** |
| **New architecture verbs** | **0** |

> **Forward hook (archetype #10 device).** L17 may carry **one recognition-only hook for L18** (`je vais + inf.`, recognition since L7) — but **not** tied to a future *feeling* narrative (`demain ça ira` is deferred). Keep the hook neutral and light; L17 does **not** own futur proche.

---

## 5. Allowed / Deferred Matrix

| Item | Classification | Note |
|---|---|---|
| **`je suis fatigué`** | **ACTIVE (recycled)** | L2/L6 owned state |
| **`je ne suis pas prêt`** | **ACTIVE (recycled)** | L6 negated state |
| **`j'ai besoin d'aide`** | **ACTIVE (recycled)** | L4/L6 |
| **`j'ai faim`** | **ACTIVE (recycled)** | L4 |
| **`j'ai peur`** | **SUPPORTED (recycled)** | L4 light-active — kept light |
| **`ça va ?`** | **ACTIVE (new chunk)** | social check-in — **frozen chunk**, opens no `aller`/futur |
| **`ça va` / `ça ne va pas`** | **ACTIVE / SUPPORTED (new chunks)** | the answers to the check-in |
| **`je comprends` / `je ne comprends pas`** | **SUPPORTED / ACTIVE (recycled)** | `je ne comprends pas` owned (L1); affirmative `je comprends` a light promotion |
| **`c'est pas grave`** | **ACTIVE (recycled)** | L2/L6 reassurance |
| **`je suis content`** | **ACTIVE (new — one positive adjective)** | the one new feeling adjective; in the owned `je suis ___` frame |
| **`je suis triste`** | **RECOGNITION only** | shown, not required — caps the adjective load (defer to avoid a dump) |
| **`se sentir` (as a system)** | **DEFERRED** | reflexive-verb system — not opened |
| **`je me sens …`** | **RECOGNITION / future-hook only** | shown at most; never produced (reflexive + pronoun) |
| **advice phrases** (`tu devrais` / `il faudrait`) | **DEFERRED (paid-zone)** | conditionnel/advice register — the band map's "light advice" is **demoted** |
| **therapy / coach tone** | **DEFERRED (banned)** | passive mirror only; no counseling register |
| **past/future feeling narrative** (`hier j'étais triste`, `demain ça ira`) | **DEFERRED** | no past/future; feelings stay present |
| **A Small Moment emotional personalization** | **DEFERRED (paid-zone)** | deep AI emotional ASM is paid; L17 at most a light `model-answer-only` recurrence |

---

## 6. Candidate L17 Scene

**Scene (in scope):** *"After class. You greet someone and ask how they are. They're tired and don't understand something; you reassure them and suggest a pause."* — pure human context, continuous with L6/L10/L16.

| Line | Verdict | Reason |
|---|---|---|
| `Ça va ?` | ✅ in scope (**new**, the hook) | social check-in (frozen chunk) |
| `Ça va.` / `Ça ne va pas.` | ✅ in scope (new) | the answers |
| `Je suis fatigué.` | ✅ in scope | L2/L6 |
| `Je suis content.` | ✅ in scope (**new** adjective) | one positive feeling in the owned frame |
| `Je ne comprends pas.` | ✅ in scope | L1 frozen repair |
| `C'est pas grave.` | ✅ in scope | L2/L6 reassurance |
| `Il faut faire une pause.` | ✅ in scope (recycled) | L15 — **as obligation, not advice** ("one must take a break," not "you should…") |

**Demote / avoid (per the brief + product judgment):**

| Candidate | Verdict | Reason |
|---|---|---|
| `Tu devrais faire une pause.` | 🚫 **avoid** | advice / conditionnel — paid-zone (L15); therapy-tone vector |
| `Je me sens triste.` | 🚫 **avoid** | `se sentir` reflexive system not owned |
| `Hier, j'étais triste.` / `Demain, ça ira.` | 🚫 **avoid** | past/future feeling narrative deferred |
| an emotion word-list (`triste, heureux, inquiet, énervé, déçu…`) | 🚫 **avoid** | vocabulary dump — cap at `content` active, `triste` recognition |
| a therapy-style reply ("it's important to take care of yourself…") | 🚫 **avoid** | coaching register banned |

**Within-scope verdict:** the scene works almost entirely from owned material + the two new hooks (`ça va ?`, `content`). The instructive line is `Il faut faire une pause.` — **kept as obligation, demoted from any advice framing** ("one must," not "you should"). The whole "you should / I feel that you…" register is dropped.

---

## 7. A Small Moment Interaction

**Recommendation: L17 includes at most a LIGHT A Small Moment recurrence — and must NOT become "A Small Moment 2."**

- **Not a feature expansion.** A Small Moment is a **seeded ritual (L16), recurs at L19** (band map). L17's job is **feelings**, not advancing the ritual.
- **A light, optional recurrence is acceptable** *if* it stays inside L16's bounds: a **`model-answer-only`, present-only, known-items-only ≤2–3 line read** built from the feelings scene (`Ça va ? / Je suis fatigué. / C'est pas grave.`) + one short scaffolded response. This reinforces the format without enlarging it.
- **Prepare L19**, don't pre-empt it: L19 is where A Small Moment recurs with weak-point repair across L11–L18. L17 should leave that headroom.
- **Default if in doubt: reference L16 (one line), no new ASM beat.** Adding a feelings ASM beat is *optional*; the lesson is complete without it. **Do not let L17 turn into A Small Moment 2.**

---

## 8. Paywall / Commercial Depth Check

- **Does simple feelings/human-context before Campfire ~L24 give away too much?** **No.** Basic feeling-*statements* (`je suis content`, `je suis fatigué`) and a social check-in (`ça va ?`) are **core A1 social language** — high-utility, low commercial value. They are the *form*, not the *intelligence*.
- **Does withholding human-state language make the free path too transactional?** **Yes** — this is the real risk on the other side. The L1–L5 retrospective flagged café/transactional-centricity as the **top content risk**; a free path that can order coffee but can't ask "how are you?" feels robotic. `ça va ?` + a positive feeling materially humanize the free tier.
- **Safest free-path compromise:** **own the basic feeling-statements + `ça va ?` social check as chunks/frames; defer the depth** — `se sentir` nuance, emotional reasoning, advice/coaching, free emotional conversation.
- **Which deeper emotional/social AI feedback stays paid-zone?** **Personalized emotional coaching, adaptive empathy responses, free emotional conversation, and the deep AI-driven A Small Moment** — consistent with band map §5 (deep ASM paid) and the AI Natural Reveal depth rule (`model-answer-only` L0–L20; live AI evaluation paid). L17 spends none of it.

---

## 9. AI Generation Risk (ties to `ai-generation-contract-v1.md`)

> L17 runs `model-answer-only` (no live AI). The *content* risks (vocab dump, advice tone, tense) apply now to whoever authors the lesson; the *generation* risks govern the paid-zone stage.

| Leak risk | Where it bites at L17 | Contract anchor / mitigation |
|---|---|---|
| **New emotion vocabulary dump** | the `je suis ___` slot invites many adjectives | §7 (0–2 low-risk words max, in frames) — cap at `content` active, `triste` recognition; `trap:emotion-vocab-dump` |
| **Therapy / advice tone** | feelings + `il faut`/`je dois` → "you should rest, take care…" | §10/§11 (no overcorrection, passive mirror); **advice deferred**; `trap:therapy-tone-too-early` |
| **`se sentir` system** | "how do you feel?" → `je me sens…` | reflexive system deferred; `trap:se-sentir-too-early` |
| **Past/future emotional narrative** | "yesterday I was sad / tomorrow it'll be fine" | §6 tense guardrail — feelings stay present; `trap:past-future-feeling-narrative` |
| **Personalized emotional coaching** | tailoring empathy to the learner | §11 + paid-zone reservation (§8) |
| **Moralizing via `il faut` / `je dois`** | obligation sliding into advice/preaching | L15 contract note; obligation ≠ advice; passive mirror |
| **Object-pronoun pressure from `aide`/`aider`** | `je peux vous aider` / `aidez-moi` in a help scene | L11/L15 frozen-chunk rule; keep `m'aider` frozen; `trap:object-pronoun-pressure-too-early` |
| **Generic chatbot drift** | a feelings scene → open emotional dialogue | §11 + §16; `model-answer-only`, scoped |

> **New contract row needed (when the spec is written):** §15 **L17 row** — **Allowed:** `Ça va ?` · `Ça va.` · `Ça ne va pas.` · `Je suis content.` · `Je suis fatigué.` · `Je ne comprends pas.` · `C'est pas grave.` · `Il faut faire une pause.` (obligation). **Blocked:** `Tu devrais…` / `Il faudrait…` (advice/conditionnel) · `Je me sens…` (se sentir) · `Hier j'étais…` / `Demain ça ira…` (past/future) · emotion word-lists / new adjectives beyond the cap · therapy/coaching tone · `Je peux vous aider.` (object pronoun) · personalized/free emotional chat.

---

## 10. Mon Lexique / Canonical ID Impact

| ID | Kind | Status (recommended) | Note |
|---|---|---|---|
| `phen:human-context-feelings-light` | phenomenon | **active (meta, new)** | feelings/states in owned frames, capped |
| `phen:social-check-in` | phenomenon | **active (meta, new)** | the `ça va ?` open/check/repair move |
| `chunk:ca-va` | chunk | **active (new)** | "it's going / I'm fine" — frozen, **not** productive `aller` |
| `chunk:ca-va-question` | chunk | **active (new)** | `Ça va ?` social check-in |
| `chunk:ca-ne-va-pas` | chunk | **supported (new)** | "it's not going (well)" |
| `word:content` | word (adj.) | **active (new — the one new adjective)** | positive feeling in `je suis + state` |
| `phen:etre-state-human-context` | phenomenon | **supported (recycled/applied)** | reuse of the owned `je suis + state` |
| `chunk:c-est-pas-grave` | chunk | **recycled** | L2/L6 |
| `chunk:je-ne-comprends-pas` | chunk | **recycled** | L1 |
| `chunk:je-comprends` | chunk | **supported (light promotion)** | affirmative — does **not** open a `comprendre` paradigm |
| `word:faim` / `word:peur` | word | **recycled** | L4 (peur light) |
| `word:triste` | word (adj.) | **recognition only** | shown, caps the dump; not produced |
| `phen:avoir-state-feeling-bridge` | phenomenon | **recognition (optional)** | only if the être↔avoir contrast is surfaced; else omit |
| `trap:emotion-vocab-dump` | trap | option-only | guards the #1 risk |
| `trap:se-sentir-too-early` | trap | option-only | guards reflexive leak |
| `trap:therapy-tone-too-early` | trap | option-only | **align with L15's `trap:conditionnel-advice-too-early`** (reuse where it overlaps) |
| `trap:past-future-feeling-narrative` | trap | option-only | guards tense drift |
| `trap:object-pronoun-pressure-too-early` | trap | option-only | reuse from L16 |

**ID-design flags:**
- **`chunk:ca-va` homograph guard.** `ça va` is the frozen social chunk; it must **not** be linked to a productive `aller` or futur-proche ID. If `aller` (movement) and `ça va` (social) ever need disambiguation, keep `ça va` as its own frozen `chunk:ca-va`, distinct from `word:aller` — same discipline as `il y a` vs place-`y`.
- **`word:se-sentir` is NOT coined** as an owned ID here — it stays a deferred future lexeme; only a `trap:se-sentir-too-early` is needed now.
- **Do not coin IDs for deferred emotion words** beyond `word:triste` (recognition) — no `word:heureux`/`inquiet`/etc. until a later lesson owns them.

---

## 11. Detailed Spec Recommendation

**Recommendation: write a COMPACT L17 spec next** (consistent with L13/L14/L15/L16). Do **not** write a full spec; do **not** make L17 pure integration (Option D); do **not** postpone feelings; do **not** split feelings into two lessons.

- **Compact, not full:** L17 owns **0 new systems / 0 architecture verbs** and **≤2 new lexical items** over owned frames — a compact spec fits. A full spec would invite the emotion-vocabulary tables and the advice register the gate forbids.
- **Not pure integration:** L16/L13 already did integration; L19 is the next integration beat. L17 must carry the small, real human hook (`ça va ?` + a positive feeling).
- **Not postponed / not split:** the gap (social check-in, a positive feeling) is real and small; one lesson covers it. Splitting feelings across two lessons would over-weight a thematic area and risk two vocab lists.

**Before writing the spec, lock five decisions:**
1. **Active-new capped at ~3–5** (not the band map's 7–9); feelings mostly recycled.
2. **Advice deferred** — L17 owns feeling-statements + `ça va ?`, **not** `tu devrais`/`il faudrait`; the band map's "light advice" is demoted to paid-zone.
3. **One new adjective** (`content` active; `triste` recognition); **no emotion word-list**.
4. **`ça va` is a frozen chunk** (no `aller`/futur opening); **`se sentir` recognition/future-hook only**.
5. **A Small Moment** = light optional recurrence at most; the real recurrence is **L19**.

**Existing docs that should be patched** (propose — **do NOT auto-apply now**):
- **`docs/syllabus/ai-generation-contract-v1.md` §15** — add the **L17 row** (§9) when the spec is written.
- **`docs/syllabus/lesson-archetype-templates-v1.md` #9** — note L17 as a thematic lesson run with **integration restraint** (recycle-dominant; feelings in owned frames; cap new adjectives; **advice is a separate later/paid register, not a thematic add-on**).
- **`docs/syllabus/L10-L20-band-map-v0.md`** — **annotate the L17 row**: active-new **~3–5 (not 7–9)**; **"feelings" = owned frames + `ça va ?` + 1 positive adjective**; **"advice" demoted/deferred to paid-zone**; resolve the L17 scope question.
- **`docs/syllabus/canonical-item-id-convention-v0.1.md`** — optional note: `chunk:ca-va` frozen-chunk / homograph guard vs `word:aller`.
- **No L16/L15 patch needed** — they already route their carry-outs to L17.

---

## 12. Final Verdict

- **Is L17 ready for detailed spec writing?** **Yes — ready for a *compact* spec**, once the five §11 gates are locked. The *direction* (human context / feelings) is right; the band map's **size (7–9) and "advice"** must be cut first.
- **What should L17 own?** feelings/states in the **owned `je suis + state` / `j'ai + state`** frames, **+ `ça va ?` / `ça va` / `ça ne va pas`** (new social check-in chunks), **+ `je suis content`** (one new positive adjective), with `c'est pas grave` / `je comprends` / fatigué / faim / peur / besoin recycled. **0 new grammar systems, 0 new architecture verbs.**
- **What should L17 absolutely NOT own?** **advice / conditionnel** (`tu devrais` / `il faudrait`); **`se sentir` / `je me sens`** as a system; **a broad emotion vocabulary** (beyond `content` active + `triste` recognition); **opinion verbs**; **past/future feeling narrative**; **therapy/coaching tone**; **futur proche** (L18's job); **object-pronoun production**; **a full A Small Moment feature**.
- **Single highest-risk leak:** **the emotion-vocabulary dump** — the band map's ~7–9 active-new + the Thematic-Vocabulary archetype together push toward a list of feeling words, which would overload a lesson that should mostly recombine and would burn the "feelings in frames" discipline. **Close second:** the **advice / therapy tone** (the band map's "light advice" + the owned `il faut`/`je dois`) — L17 owns feeling-statements and a social check-in, **not** counseling.

---

## Open Items / Notes

- This is a **gate review (v0)**, not a spec; revise if the five §11 gates resolve differently.
- **Key open call:** Option C+A hybrid (recommended) vs a leaner pure-`ça va ?` social-check lesson. Recommend the hybrid (one positive adjective adds real value cheaply); fall back to pure-`ça va ?` if review wants maximum caution on new adjectives.
- **The band map needs two edits** (size 7–9 → 3–5; demote "advice") — proposed in §11, not applied.
- **`ça va ?` provenance:** the L1 spec §15 cut "comme ci, comme ça" as *"a 'ça va ?' response — belongs to a later social-check lesson."* L17 is the intended home; this gate confirms it.
- **No runtime/code/content/flag/ID change is authorized.** `content/itemRegistry.ts` (at `lemot-app/content/`) was **not** read or modified — the ID convention + prior specs supplied the grounding. Dev APK scope (L1–L5 only) is unaffected; L17 is far out of dev-apk scope. The Dev APK smoke test remains the boundary before any runtime work.

*End of L17 Human Context / Feelings Gate Review. Planning/review only — no lesson spec, no code/content/flag/runtime change. Recommendation: L17 = a narrow, recycle-dominant human-context/feelings lesson — feelings in owned frames + the social check-in `ça va ?` + one positive adjective (`content`), active-new ~3–5 (not the band map's 7–9) — with advice/conditionnel, `se sentir`, broad emotion lexis, past/future feeling narrative, therapy tone, and the deep emotional A Small Moment all deferred (paid-zone or later). The band map's "feelings + light advice / ~7–9" is sharpened down, not flattered.*
