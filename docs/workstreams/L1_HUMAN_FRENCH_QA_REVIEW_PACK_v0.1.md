# L1 Human French-QA Review Pack v0.1

**Status: Review Pack — awaiting named human French-QA sign-off**

Prepared 2026-08-01 from `L1_SENTENCE_ECOSYSTEM_v0.1.md` (the source of every surface, role
and treatment below), for the reviewer gate required before PR-07 payload registration.

---

## 0. Reviewer qualification

| Field | Entry |
|---|---|
| Reviewer full name | *(blank — to be completed by the reviewer)* |
| Reviewer role / qualification | *(blank)* |
| Native or near-native variety | *(blank)* |
| Target variety reviewed | Contemporary metropolitan French, neutral modern café/service context |
| Review date | *(blank)* |
| Assessed written naturalness? | *(yes/no)* |
| Assessed spoken café naturalness? | *(yes/no)* |
| Assessed register? | *(yes/no)* |
| Assessed punctuation/typography? | *(yes/no)* |
| Assessed pedagogical clarity of feedback framings? | *(yes/no)* |

Regional alternatives may be recorded in any decision cell, but the reviewer must still choose
**one recommended lead surface** per seed for this product.

**Decision vocabulary (use exactly these):**

- `PASS` — the current French and punctuation may ship as written.
- `REVISE` — replace with the reviewer's supplied exact surface.
- `HOLD` — cannot be approved without additional context or recorded audio
  (`HOLD — AUDIO` where the block is specifically intonation/contour).
- `NOT REVIEWED` — the starting state of every row.

Every `REVISE` must record: **(a)** the exact replacement French; **(b)** the reason;
**(c)** whether existing accepted alternatives remain; **(d)** what the change affects —
`identity` / `sentence surface only` / `punctuation only` / `feedback-copy only` /
`audio contour`. Vague comments ("make it more natural") are not decisions and do not
unblock anything.

---

## 1. Authority and release boundary

- This pack is **non-Canonical**. It overrides no governing document.
- It **changes no source file** and **registers no runtime content** — no item identity, no
  sentence ID, no EV ID, no payload, no audio ID.
- Completing it does **not** itself approve PR-07. A **named** reviewer's completed
  decisions in this pack are the *evidence* PR-07 requires (Content Bible §18.3: a named
  qualified human reviewer and a recorded verdict; AI may assist but may not self-certify a
  PASS).
- **Every `HOLD`, `REVISE` (until its replacement is recorded and re-confirmed), or
  `NOT REVIEWED` row in the §5 ledger blocks registration** of the affected surfaces.
  Sign-off is per this pool as a whole, not per origin — sourced surfaces need sign-off too.
- Audio-contour approval remains **separately gated**: where a judgment depends on hearing a
  recorded contour (flagged below), a text-level `HOLD — AUDIO` is the correct outcome and
  is resolved only by the later audio review, not by this pack.

---

## 2. Context supplied to the reviewer

You are reviewing French for an **absolute-beginner L1 learner** in one **modern
café/service moment** (ordering, small breakdowns, handover, leaving). What you need to
know, and nothing more:

- The register is **`vous`** throughout. No `tu` anywhere.
- Teaching is **whole-formula / chunk-first**: learners meet and produce complete formulas
  (`je voudrais`, `s'il vous plaît`, `je ne comprends pas`). No grammar-system inference is
  expected of them, so no surface needs to "teach conjugation."
- **Supported** formulas are always physically supplied on screen when produced (a visible
  piece, word bank or card). The learner never conjures them from memory.
- **Ghost** lines (`madame`, `monsieur`, `un croissant` and the server lines carrying them)
  are **heard or read only** — never demanded, never scored as missing.
- `je veux` is **valid French**. It appears only as a register contrast; the product frames
  it as understandable but contextually blunt with an unfamiliar café worker — never as an
  error.
- **Natural Reveal models** are comparison sentences shown *after* a learner's own free
  attempt. They are "one natural way to say it," never "the only correct answer."

---

## 3. Batch A — low-risk standard surfaces

These twenty rows are proposed for **batch approval**: simple and/or directly sourced
surfaces whose §20 ecosystem review flagged no more than a standard naturalness/typography
pass. The reviewer may approve the batch in one motion, **but each row keeps its own final
decision cell** — strike any row out of the batch by marking it individually.

Rows also appearing in a §4 decision card (004, 006, 007, 008, 014, 015, 025, 026, 030,
033) carry the batch's *typography/naturalness* pass here; the **card question for that row
must still be answered on the card**, and the card decision wins if the two differ.

| Seed ID | Exact French | Role | Treatment | Context | Decision | Replacement if any | Reviewer note |
|---|---|---|---|---|---|---|---|
| L1-SE-001 | Bonjour. | Learner production (opener) | Active | The polite door into any exchange; standalone with period. `Bonjour !` is an accepted alternative | NOT REVIEWED | | |
| L1-SE-002 | Je voudrais un café. | Learner production (request) | Active | Base polite request, opener already given | NOT REVIEWED | | |
| L1-SE-003 | Bonjour, je voudrais un café. | Learner production (opener + request) | Active | One turn; comma pause after the greeting | NOT REVIEWED | | |
| L1-SE-004 | Bonjour, je voudrais un café, s'il vous plaît. | Learner production (**anchor** — full polite arc) | Active | The central L1 sentence. Punctuation question routed to **Card 1** | NOT REVIEWED | | |
| L1-SE-005 | Je voudrais un café, s'il vous plaît. | Learner production (mid-exchange request) | Active | Request without the opener (already greeted) | NOT REVIEWED | | |
| L1-SE-006 | Un café, s'il vous plaît. | Learner production (casual counter order) | Active | Elliptical order at a counter. Politeness question routed to **Card 1** | NOT REVIEWED | | |
| L1-SE-007 | Je voudrais un thé, s'il vous plaît. | Learner production (Supported) | Supported — `un thé` supplied as a visible piece | Tea slot variation of the request. Comma rhythm routed to **Card 1** | NOT REVIEWED | | |
| L1-SE-008 | Un thé, s'il vous plaît. | Learner production (Supported, casual) | Supported — package supplied | Casual tea order. Routed to **Card 1** | NOT REVIEWED | | |
| L1-SE-009 | Merci. | Learner production (thanks) | Active (new) | Standalone thanks; `Merci !` is an accepted alternative | NOT REVIEWED | | |
| L1-SE-010 | Au revoir. | Learner production (close) | Active (new) | Standalone goodbye | NOT REVIEWED | | |
| L1-SE-012 | S'il vous plaît. | **Input/audio-span only** — display + Dictée; never demanded standalone | Active surface, span role | Formula display and writing/listening focus (elision + circumflex) | NOT REVIEWED | | |
| L1-SE-013 | Je ne comprends pas. | Learner production (Supported survival formula) | Supported — formula visible/prompted, used whole, never split | Breakdown signal, calm mid-exchange | NOT REVIEWED | | |
| L1-SE-014 | Vous pouvez répéter ? | Learner production (Supported survival formula) | Supported — formula visible/prompted | Repetition request, non-inverted locked surface. Typography routed to **Card 3** | NOT REVIEWED | | |
| L1-SE-015 | Je ne comprends pas. Vous pouvez répéter ? | Learner production (Supported, one turn) | Supported — both formulas supplied | Full recovery move as one speaker turn. Pacing routed to **Card 3** | NOT REVIEWED | | |
| L1-SE-019 | Bonjour, monsieur. | **Input only** (server greets) | Ghost-bearing (`monsieur`) | Server greeting the learner hears | NOT REVIEWED | | |
| L1-SE-020 | Bonjour, madame. | **Input only** (server greets) | Ghost-bearing (`madame`) | Pairs with 019 for address listening | NOT REVIEWED | | |
| L1-SE-025 | Voilà. | **Input only** (handover) | Recognition-only ambient | Neutral service handover beat. Meaning confirmation routed to **Card 6** | NOT REVIEWED | | |
| L1-SE-026 | Voilà, monsieur. | **Input only** (handover + address) | Ghost-bearing | Addressed handover, pairs with 025. Routed to **Card 6** | NOT REVIEWED | | |
| L1-SE-030 | Bonjour, je voudrais un café, s'il vous plaît. Merci ! | **Model answer only** (Natural Reveal) | Reveal model | Full polite order + thanks in one turn. Thanks timing routed to **Card 7** | NOT REVIEWED | | |
| L1-SE-033 | Merci beaucoup, au revoir ! | **Model answer only** (Natural Reveal) | Reveal model | Warm exit enrichment. Warmth check routed to **Card 8** | NOT REVIEWED | | |

**Batch A decision (all twenty rows, minus any individually struck):** NOT REVIEWED

---

## 4. Eight concentrated decision cards

Every medium-risk ecosystem question (§20) is routed to exactly one card below. Each card
ends in a decision; a card decision covering a Batch A row supersedes the batch for that
row's specific question.

---

### Card 1 — Café-request rhythm and punctuation

**Surfaces under review:**

- 004 `Bonjour, je voudrais un café, s'il vous plaît.`
- 006 `Un café, s'il vous plaît.`
- 007 `Je voudrais un thé, s'il vous plaît.`
- 008 `Un thé, s'il vous plaît.`
- 031 `Bonjour, un café, s'il vous plaît. Merci !`

**Exact use context:** 004 is the anchor learner production of the whole lesson; 006/008 are
casual elliptical counter orders the learner produces; 007 is the Supported tea variant; 031
is a model-answer-only casual reveal (its comma before `s'il vous plaît` was added in the
2026-07-31 convergence for pool consistency; the comma-less sourced form is currently an
accepted alternative).

**Why this decision matters:** the double-comma rhythm of 004 propagates to every request
surface, TTS reading, and Dictée span in L1. If the commas read as textbook punctuation
rather than natural spoken grouping, the whole request arc inherits the problem.

**Current recommendation (ecosystem §20):** keep all five as written; comma-less variants
subordinate as accepted alternatives.

**Questions:**

1. Do the commas in 004/007/031 reflect natural spoken grouping?
2. Should any lead surface omit a comma? (State exactly which.)
3. Should comma-less forms remain recorded as accepted alternatives?
4. Are 006 and 008 natural **and polite enough** at a counter, or do they read curt?

**The reviewer must choose the exact lead punctuation for each of the five surfaces.**

| Field | Entry |
|---|---|
| Reviewer decision (per surface: 004 / 006 / 007 / 008 / 031) | NOT REVIEWED |
| Exact replacement(s), if any | |
| Accepted-alternative decision (comma-less forms kept?) | |
| Downstream impact | request arc, TTS text, Dictée spans, PM-001/PM-006/PM-007/PM-011 payloads |
| Blocking status | Blocks PR-07 registration of every request-arc surface until resolved |

---

### Card 2 — Closing pair

**Surface under review:** 011 `Merci, au revoir.`

**Exact use context:** the learner's full polite exit at the counter, produced unscaffolded.
The convergence pass preferred the single-turn form and recorded the two-beat
`Merci ! Au revoir.` as an accepted alternative — with the explicit note that QA decides
which leads.

**Why this decision matters:** this is one of only three surfaces demanding the two
newly-Active items (`merci`, `au revoir`) together; its lead form sets the exit rhythm every
learner drills.

**Current recommendation:** single-turn `Merci, au revoir.` leads.

**Question:** which exact form should lead?

- `Merci, au revoir.`
- `Merci ! Au revoir.`
- another exact reviewer-supplied form.

| Field | Entry |
|---|---|
| Reviewer decision (one lead form, exact) | NOT REVIEWED |
| Exact replacement, if any | |
| Accepted-alternative decision (does the non-lead form remain accepted?) | |
| Downstream impact | closing-family payloads, PM-013 closing turn, flashcard back |
| Blocking status | Blocks PR-07 registration of 011 until one lead form is named |

---

### Card 3 — Repair and attention formulas

**Surfaces under review:**

- 014 `Vous pouvez répéter ?`
- 015 `Je ne comprends pas. Vous pouvez répéter ?`
- 016 `Excusez-moi, je ne comprends pas.`
- 017 `Excusez-moi.`

**Exact use context:** calm mid-exchange repair, all Supported (formulas supplied, used
whole). 016 is **newly authored**; 017 is the standalone attention-getter (not an apology).
The non-inverted `Vous pouvez répéter ?` is a locked surface; the inverted form appears
nowhere in the pool.

**Why this decision matters:** these are the learner's survival lines. If any reads
unnatural or ambiguous, the learner's first real breakdown moment teaches the wrong thing.

**Current recommendation:** keep all four; house typography puts a space before `?`.

**Questions:**

1. Is each surface natural in a calm mid-exchange repair moment?
2. Does standalone `Excusez-moi.` work clearly as an **attention-getter** at L1, without
   apology ambiguity?
3. Is `Pardon` preferable enough to **require** a change? (`Pardon` is outside the current
   frozen scope — do not add it unless you explicitly require it, in which case say so as a
   `REVISE` with the exact surface.)
4. Is 015 natural as one learner turn (two sentences, one speaker)?
5. Confirm the French typography before `?` (espace before the question mark).

| Field | Entry |
|---|---|
| Reviewer decision (per surface: 014 / 015 / 016 / 017) | NOT REVIEWED |
| Exact replacement(s), if any | |
| Accepted-alternative decision | |
| Downstream impact | rescue-family payloads, PM-008 repair pairing, formula cards |
| Blocking status | Blocks PR-07 registration of the rescue family until resolved |

---

### Card 4 — Direct versus polite request

**Surfaces under review:**

- 018 `Je veux un café.` — compared against 002 `Je voudrais un café.`

**Exact use context:** 018 is **recognition-only** — a register-contrast display and trap
option. It is never an expected answer. Choosing it in an exercise produces a calm register
signal inviting the smallest upgrade (→ `je voudrais`), tagged internally as a register
miss, never as broad failure. The current learner-facing framing: *"It works, but it sounds
blunt with someone you don't know. Je voudrais stays polite."*

**Why this decision matters:** this is the product's one register-teaching moment at L1. A
framing that overstates (`je veux` = wrong) teaches false French; one that understates
loses the pedagogical point.

**Current recommendation:** keep the surface; keep the contextual feedback framing.

**Questions:**

1. Is describing `je veux` as *understandable but blunt with an unfamiliar café worker*
   fair?
2. Which contexts make `je veux` acceptable? (Recorded as reviewer guidance for later copy;
   this pack changes no copy.)
3. Does the current framing avoid presenting `je veux` as ungrammatical?
4. If the framing is misleading, supply the exact recommended French/English feedback
   meaning.

**The surface itself may PASS while the feedback framing requires revision — record the two
decisions separately.** A feedback-only revision is `REVISE (feedback-copy only)` and does
not change the sentence identity.

| Field | Entry |
|---|---|
| Reviewer decision — surface 018 | NOT REVIEWED |
| Reviewer decision — feedback framing | NOT REVIEWED |
| Exact replacement framing, if any | |
| Accepted-alternative decision | n/a (never an expected answer) |
| Downstream impact | register-contrast option in the shipped L1 choice screen; trap copy |
| Blocking status | Surface decision blocks 018's registration; a feedback-only revision blocks copy, not identity |

---

### Card 5 — Server offer and confirmation lines

**Surfaces under review:**

- 021 `Un café, madame ?`
- 023 `Un café.`
- 024 `Un croissant ?`

**Exact use context:** all three are **input/listening only** — the learner hears them and
never answers them with `oui/non` (not owned at L1). 021 is an elliptical addressed server
offer (rising contour); 023 is the server's flat order echo/confirmation at preparation or
handover; 024 is a ghost add-on offer (the learner never produces `croissant`; the natural
response is `merci` or a coffee order). The former text-identical rising twin of 023
(`Un café ?`) was retired to reserve precisely because contour, not text, carried the
difference.

**Why this decision matters:** these lines create the scene's realism. If a native ear says
a server wouldn't say them this way, the listening material teaches a false register — and
some of these judgments may genuinely depend on hearing the recorded contour, not reading
the text.

**Current recommendation:** keep all three pending QA; calibrate 023's need for framing.

**Questions:**

1. Is 021 natural as an elliptical server offer?
2. Is 023 natural as a server's order echo or handover confirmation?
3. Does 023 require a framed line (e.g. surrounding scene context) to make its function
   credible, or does the bare echo stand alone?
4. Is 024 natural as an add-on offer?
5. **Which of these judgments depend on recorded intonation rather than text?** For any
   such judgment, `HOLD — AUDIO` is the correct decision here.

| Field | Entry |
|---|---|
| Reviewer decision (per surface: 021 / 023 / 024) | NOT REVIEWED |
| Exact replacement(s), if any | |
| Accepted-alternative decision | |
| Downstream impact | listening/scene lines, Wave B audio manifest, contour recordings |
| Blocking status | Blocks registration of these input lines; `HOLD — AUDIO` defers to the audio gate without blocking text-only surfaces elsewhere |

---

### Card 6 — Address forms and handover frequency

**Surfaces under review:**

- 025 `Voilà.`
- 026 `Voilà, monsieur.`
- 027 `Merci, madame.`
- 028 `Au revoir, madame.`

**Exact use context:** 025/026 are handover input lines (025 is the preferred neutral
handover wherever address color is not pedagogically needed); 027/028 are **reveal-only
enrichment** showing native warmth. `madame`/`monsieur` are ghosts — heard/read, never
demanded.

**Why this decision matters:** address-form frequency is a register statement about the
whole product. Too much `madame`/`monsieur` reads marked or dated; too little loses the
service-register color the scene teaches.

**Current recommendation:** keep; 027/028 stay reveal-only; frequency calibrated by QA.

**Questions:**

1. Are these natural in a contemporary café?
2. Are `madame` and `monsieur` too frequent or too marked for the intended neutral
   experience?
3. Should 027/028 remain reveal-only enrichment?
4. Confirm the handover meaning of `voilà` (the gloss: "there you go").

**The reviewer may PASS a surface while recommending lower display frequency** — record the
frequency recommendation in the note; it is guidance, not a surface change.

| Field | Entry |
|---|---|
| Reviewer decision (per surface: 025 / 026 / 027 / 028) | NOT REVIEWED |
| Exact replacement(s), if any | |
| Accepted-alternative decision | |
| Frequency recommendation (if any) | |
| Downstream impact | scene color, reveal enrichment, address-listening pair |
| Blocking status | Blocks registration of these input/reveal lines until resolved |

---

### Card 7 — Timing of thanks in the model

**Surface under review:** 030 `Bonjour, je voudrais un café, s'il vous plaît. Merci !`

**Exact use context:** the model answer shown after the learner's own free "Say It Your
Way" attempt — one turn, two sentences, `Merci !` closing the order **before** the coffee
arrives (thanks-in-advance).

**Why this decision matters:** the model teaches scene pragmatics as much as words. If a
native speaker would hold the `merci` for the handover beat, the model quietly teaches an
off rhythm.

**Current recommendation:** keep as written (shipped model); ecosystem notes QA may prefer
moving `merci` to the handover.

**Question — require exactly one of:**

- keep as written;
- move `Merci` to the handover beat (state the resulting exact model);
- retain as an accepted model only (name the new lead model exactly);
- another exact alternative.

**Record whether the decision affects only scene timing or the sentence surface itself.**

| Field | Entry |
|---|---|
| Reviewer decision | NOT REVIEWED |
| Exact replacement / new lead model, if any | |
| Scene-timing-only or surface change? | |
| Accepted-alternative decision | |
| Downstream impact | Say It model answer, reveal copy, scene beat map |
| Blocking status | Blocks registration of 030 until resolved |

---

### Card 8 — Warm reveal close and overall register consistency

**Surfaces under review:** 033 `Merci beaucoup, au revoir !` — **and the complete 30-seed
set considered as one register system.**

**Exact use context:** 033 is the sole warm-close enrichment (the standalone
`Merci beaucoup.` was moved to reserve), model-answer/reveal only. This card is also the
holistic pass: the full pool read end-to-end as one product voice.

**Why this decision matters:** individual surfaces can each pass while the set as a whole
drifts — too textbook, too scripted, or inconsistent in warmth. This is the only card that
looks at the system, and it carries the reviewer's final holistic verdict.

**Current recommendation:** keep 033 reveal-only; the set is believed internally consistent
in contemporary `vous` register.

**Questions:**

1. Is 033 appropriately warm without theatrical excess?
2. Is the full 30-seed set internally consistent in contemporary `vous` register?
3. Does **any** surface feel unusually textbook, old-fashioned, service-scripted or
   regionally marked? (Name it and route it back to its row/card.)
4. Are there any hidden agreement, apostrophe, spacing or punctuation issues anywhere in
   the set?
5. Is any accepted alternative **required** for natural spoken variation that the pool
   currently lacks?

| Field | Entry |
|---|---|
| Reviewer decision — 033 | NOT REVIEWED |
| Reviewer decision — holistic set (PASS / HOLD) | NOT REVIEWED |
| Surfaces flagged by the holistic read, if any | |
| Exact replacement(s), if any | |
| Accepted alternatives added, if any | |
| Downstream impact | final gate — §8 cannot pass while this card is open |
| Blocking status | **Always blocking**: the holistic decision is required for the gate |

---

## 5. Complete 30-seed ledger

One row per core seed — 001–021, 023–028, 030, 031, 033. Retired 022/029/032 and reserves
R-1…R-7 are **not** review material and appear nowhere below. All roles, treatments,
scaffolds and risks are taken from the ecosystem (§5/§8/§20); nothing is invented here.
"PR-07 blocking?" is **Yes** on every row because sign-off is per pool: an unresolved row
anywhere holds registration of the pool.

| Seed ID | Exact French | Role | Treatment | Production demand? | Scaffold if demanded | QA risk | Decision | Approved lead surface | Accepted alternatives | Reviewer rationale | PR-07 blocking? |
|---|---|---|---|---|---|---|---|---|---|---|---|
| L1-SE-001 | Bonjour. | Learner opener | Active | Yes — unscaffolded | — | Low | NOT REVIEWED | | `Bonjour !` (recorded) | | Yes |
| L1-SE-002 | Je voudrais un café. | Learner request | Active | Yes — unscaffolded | — | Low | NOT REVIEWED | | | | Yes |
| L1-SE-003 | Bonjour, je voudrais un café. | Opener + request | Active | Yes — unscaffolded | — | Low | NOT REVIEWED | | | | Yes |
| L1-SE-004 | Bonjour, je voudrais un café, s'il vous plaît. | **Anchor** full polite arc | Active | Yes — unscaffolded | — | Low (Card 1) | NOT REVIEWED | | comma-less variant (Card 1 decides) | | Yes |
| L1-SE-005 | Je voudrais un café, s'il vous plaît. | Mid-exchange request | Active | Yes — unscaffolded | — | Low | NOT REVIEWED | | | | Yes |
| L1-SE-006 | Un café, s'il vous plaît. | Casual counter order | Active | Yes — unscaffolded | — | Low (Card 1) | NOT REVIEWED | | | | Yes |
| L1-SE-007 | Je voudrais un thé, s'il vous plaît. | Supported tea request | Supported | Yes — Supported only | `un thé` supplied as visible piece / word-bank entry | Low (Card 1) | NOT REVIEWED | | | | Yes |
| L1-SE-008 | Un thé, s'il vous plaît. | Supported casual tea order | Supported | Yes — Supported only | `un thé` package supplied; landing in tray | Low (Card 1) | NOT REVIEWED | | | | Yes |
| L1-SE-009 | Merci. | Learner thanks | Active (new) | Yes — unscaffolded | — | Low | NOT REVIEWED | | `Merci !` (recorded) | | Yes |
| L1-SE-010 | Au revoir. | Learner close | Active (new) | Yes — unscaffolded | — | Low | NOT REVIEWED | | | | Yes |
| L1-SE-011 | Merci, au revoir. | Full polite exit | Active (new ×2) | Yes — unscaffolded | — | **Medium (Card 2)** | NOT REVIEWED | | `Merci ! Au revoir.` (Card 2 decides lead) | | Yes |
| L1-SE-012 | S'il vous plaît. | Formula display + audio/Dictée span | Active surface, span role | No — never demanded standalone | n/a | Low | NOT REVIEWED | | | | Yes |
| L1-SE-013 | Je ne comprends pas. | Breakdown signal | Supported (survival formula, whole) | Yes — Supported only | Formula visible or just-prompted; whole-formula recall | Low | NOT REVIEWED | | | | Yes |
| L1-SE-014 | Vous pouvez répéter ? | Repetition request | Supported (survival formula, whole; locked non-inverted) | Yes — Supported only | Formula visible or just-prompted | Low (Card 3) | NOT REVIEWED | | | | Yes |
| L1-SE-015 | Je ne comprends pas. Vous pouvez répéter ? | Full recovery move (one turn) | Supported | Yes — Supported only | Both formulas available as whole chips/prompts | Low (Card 3) | NOT REVIEWED | | | | Yes |
| L1-SE-016 | Excusez-moi, je ne comprends pas. | Polite interruption + breakdown | Supported (newly authored) | Yes — Supported only | Both pieces supplied (`excusez-moi` + formula) | **Medium (Card 3)** | NOT REVIEWED | | | | Yes |
| L1-SE-017 | Excusez-moi. | Attention opener (not apology) | Supported | Yes — Supported only | `excusez-moi` in tray or cloze-given | **Medium (Card 3)** | NOT REVIEWED | | | | Yes |
| L1-SE-018 | Je veux un café. | Register contrast / trap display | Recognition-only | **No — never an expected answer** | n/a | Low (Card 4 — framing) | NOT REVIEWED | | n/a | | Yes |
| L1-SE-019 | Bonjour, monsieur. | Server greeting (input) | Ghost-bearing (`monsieur`) | No — input/reveal only | n/a | Low | NOT REVIEWED | | | | Yes |
| L1-SE-020 | Bonjour, madame. | Server greeting (input) | Ghost-bearing (`madame`) | No — input/reveal only | n/a | Low | NOT REVIEWED | | | | Yes |
| L1-SE-021 | Un café, madame ? | Server offer — **heard only** | Ghost-bearing; rising contour | No — input/listening only | n/a | **Medium (Card 5)** | NOT REVIEWED | | | | Yes |
| L1-SE-023 | Un café. | Order confirmation/echo (input) | Recognition-only; flat contour | No — input/listening only | n/a | **Medium (Card 5)** | NOT REVIEWED | | | | Yes |
| L1-SE-024 | Un croissant ? | Ghost add-on offer — heard only | Ghost-bearing (`croissant`) | No — input/reveal only | n/a | **Medium (Card 5)** | NOT REVIEWED | | | | Yes |
| L1-SE-025 | Voilà. | Service handover (input) | Recognition-only ambient | No — input only | n/a | Low (Card 6) | NOT REVIEWED | | | | Yes |
| L1-SE-026 | Voilà, monsieur. | Handover + address (input) | Ghost-bearing | No — input/reveal only | n/a | Low (Card 6) | NOT REVIEWED | | | | Yes |
| L1-SE-027 | Merci, madame. | Reveal enrichment of thanks | Ghost-bearing reveal-only | No — reveal only | n/a | **Medium (Card 6)** | NOT REVIEWED | | | | Yes |
| L1-SE-028 | Au revoir, madame. | Server close / reveal | Ghost-bearing reveal-only | No — reveal only | n/a | **Medium (Card 6)** | NOT REVIEWED | | | | Yes |
| L1-SE-030 | Bonjour, je voudrais un café, s'il vous plaît. Merci ! | Say-it model answer | Model-answer-only | No — model only | n/a | Low (Card 7) | NOT REVIEWED | | | | Yes |
| L1-SE-031 | Bonjour, un café, s'il vous plaît. Merci ! | Casual model alternative | Model-answer-only | No — model only | n/a | **Medium (Card 1)** | NOT REVIEWED | | comma-less sourced form (recorded) | | Yes |
| L1-SE-033 | Merci beaucoup, au revoir ! | Warm exit enrichment | Model-answer-only | No — model only | n/a | Low (Card 8) | NOT REVIEWED | | | | Yes |

---

## 6. Cross-surface consistency audit

One decision per line — these apply to the whole pool at once. Each starts NOT REVIEWED.

| # | Convention under review | Current pool convention | Decision |
|---|---|---|---|
| 1 | Apostrophe style | Typographic content uses `'` in source; smart quotes fold on input | NOT REVIEWED |
| 2 | Spacing before `?` and `!` | Espace before `?`/`!` per house convention (e.g. `répéter ?`, `Merci !`) | NOT REVIEWED |
| 3 | Comma conventions around vocatives | Comma before `madame`/`monsieur` (`Voilà, monsieur.`) | NOT REVIEWED |
| 4 | Capitalization | Sentence-initial capitals only; no mid-sentence caps | NOT REVIEWED |
| 5 | Terminal punctuation | Every seed ends `.` `?` or `!`; no bare surfaces | NOT REVIEWED |
| 6 | `café` / `thé` accent preservation | Accents always present in lead surfaces | NOT REVIEWED |
| 7 | `s'il vous plaît` spelling | Elision + circumflex, exactly as written | NOT REVIEWED |
| 8 | `au revoir` spelling | Two words, no hyphen | NOT REVIEWED |
| 9 | `Excusez-moi` hyphenation | Hyphenated | NOT REVIEWED |
| 10 | Consistent `vous` | `vous` register in every learner-facing and server line | NOT REVIEWED |
| 11 | No accidental `tu` | None present — confirm | NOT REVIEWED |
| 12 | No unnatural repetition of address forms | Address forms limited to 019/020/021/026/027/028 | NOT REVIEWED |
| 13 | No learner-facing form that is grammatical but pragmatically wrong for its assigned role | Each seed's role column (§5) | NOT REVIEWED |

---

## 7. Accepted-alternative register

An accepted alternative is a tolerated learner rendering or recorded variant of ONE seed —
it never becomes a new sentence identity by itself. Decision slots below; the reviewer may
add rows (each addition needs the same columns filled).

| Seed ID | Lead surface | Accepted alternative | Why accepted | Equivalent identity? | Audio variant required? | Decision |
|---|---|---|---|---|---|---|
| L1-SE-011 | Merci, au revoir. | Merci ! Au revoir. | Two-beat spoken exit is natural; convergence kept both (Card 2 decides which leads) | Same identity — same speech act | reviewer to state | NOT REVIEWED |
| L1-SE-031 | Bonjour, un café, s'il vous plaît. Merci ! | Bonjour, un café s'il vous plaît. Merci ! | Comma-less sourced form retained at convergence (Card 1 decides typography) | Same identity — punctuation only | reviewer to state | NOT REVIEWED |
| L1-SE-001 | Bonjour. | Bonjour ! | Exclamative greeting is ordinary speech | Same identity — punctuation only | reviewer to state | NOT REVIEWED |
| L1-SE-009 | Merci. | Merci ! | Exclamative thanks is ordinary speech | Same identity — punctuation only | reviewer to state | NOT REVIEWED |
| *(reviewer-added)* | | | | | | NOT REVIEWED |

---

## 8. Blocking decision summary

To be completed after the reviewer finishes §3–§7. Counts must total 30.

| Measure | Count |
|---|---|
| Total PASS | 0 |
| Total REVISE | 0 |
| Total HOLD (incl. HOLD — AUDIO) | 0 |
| Total NOT REVIEWED | 30 |
| Unresolved blocking rows | 30 |
| Audio-dependent rows (`HOLD — AUDIO`) | — |
| Identity-affecting revisions | — |
| Punctuation-only revisions | — |
| Feedback-copy-only revisions | — |

**Gate result (exactly one):**

- [ ] `FRENCH QA PASSED — PR-07 MAY BEGIN`
- [ ] `FRENCH QA PARTIALLY PASSED — PR-07 BLOCKED`
- [x] `FRENCH QA NOT COMPLETED — PR-07 BLOCKED`

*(Current state: not completed. No decision has been made; every row is NOT REVIEWED.)*

---

## 9. Reviewer attestation

| Field | Entry |
|---|---|
| Reviewer name | *(blank)* |
| Date | *(blank)* |
| Signature / written confirmation | *(blank)* |

By signing, the reviewer confirms:

1. I evaluated the **exact French listed in this pack**, in the **use contexts supplied
   here** (beginner L1, modern café/service moment, `vous` register).
2. `PASS` means the surface is suitable for the target product variety — **contemporary
   metropolitan French in a neutral modern café/service context** — as written, including
   punctuation.
3. I acknowledge that judgments marked `HOLD — AUDIO` remain held and are resolved only by
   the separate audio-contour review; my sign-off here does not extend to them.

---

*End of L1 Human French-QA Review Pack v0.1 — non-Canonical review artifact. It registers
nothing and approves nothing by itself; a named reviewer's completed decisions here are the
evidence PR-07 requires. Sources: `L1_SENTENCE_ECOSYSTEM_v0.1.md` (seeds, roles, treatments,
risks, recommendations), `L1_AUTHORING_CONTRACT_v0.1.md` (frozen scope),
`CONTENT_BIBLE_v1.0.md` §18.3/§18.5 (named-reviewer gate).*
