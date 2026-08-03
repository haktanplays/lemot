# L1–L10 Human French QA Pack — v0.1

> **Status: NOT REVIEWED.** Nothing in this pack carries French approval.
> Every verdict column is deliberately blank. This document is an *extraction*
> of what the pilot candidate currently shows a learner — it proposes no
> rewrite, no alternative, and no new syllabus.

| | |
|---|---|
| Source branch | `fix/polish-navigation-standing-surfaces` |
| Source commit | `45fb5f63d1bfaec6202c2db810b5c9fdde867da7` |
| Commit subject | fix(product): complete navigation and standing surfaces |
| Scope | L1–L10 (`v1-lesson-001` … `v1-lesson-010`) |
| Companion CSV | `L1_L10_FRENCH_QA_ROWS_v0.1.csv` — one row per reviewable surface |
| Extraction method | field-path walk over the shipped lesson data + registries (see *How this was built*) |

**Review order:** founder first (A/R/G/M on the founder queue), then a named
human French reviewer (APPROVE / REVISE / REJECT on every row).

---

## 1. Summary

| Metric | Count |
|---|---:|
| Total QA rows | 508 |
| Total unique French surfaces (distinct strings) | 135 |
| Distinct surfaces after answer-normalization | 100 |
| **A** Production surfaces (typed / freely produced) | 25 |
| **B** Model / reveal surfaces | 45 |
| **C** Recognition-only surfaces | 265 |
| **D** Preview-only French | 0 |
| **E** Accepted alternatives | 26 |
| **F** French inside explanatory copy | 147 |
| Unique production sentences (normalized) | 21 |
| Chunks / items actually used in L1–L10 | 35 |
| Registered sentences (sentenceRegistry) | 2 |
| Registered production sentences appearing in L1–L10 | 2 |
| Implemented-but-unregistered production sentences | 19 |
| Registered payloads (payloadRegistry) | 2 |
| Registry items **not** used in L1–L10 (appendix) | 24 |

### Rows per lesson

| Lesson | Title | Rows | Screens |
|---|---|---:|---:|
| L1 | Survival Kit | 50 | 12 |
| L2 | Être | 40 | 10 |
| L3 | Non | 58 | 12 |
| L4 | J'ai | 59 | 11 |
| L5 | Un, une | 39 | 11 |
| L6 | Un petit moment | 58 | 12 |
| L7 | Je vais | 47 | 11 |
| L8 | C'est où ? | 46 | 11 |
| L9 | Faire une pause | 48 | 11 |
| L10 | Une petite journée | 63 | 11 |

### Role distribution

| Usage role | Rows |
|---|---:|
| recognition | 333 |
| recycled | 52 |
| model-only | 45 |
| supported | 27 |
| accepted-alternative | 26 |
| active-new | 25 |

### Expected learner action

| Action | Rows |
|---|---:|
| read | 385 |
| choose | 53 |
| type | 47 |
| listen | 19 |
| free-produce | 4 |

### Unresolved identity or boundary conflicts

| Code | Conflict | Instances |
|---|---|---:|
| C1 | same French surface, conflicting English gloss | 7 |
| C2 | duplicate production sentences | 4 |
| C3 | punctuation / apostrophe-only identity variants | 28 |
| C4 | accepted alternatives that change nothing | 5 |
| C5 | accepted alternatives that contradict the apostrophe policy | 12 |
| C6 | accepted alternative broader than the shown instruction | 1 |
| C9 | chunk boundary differs between screen and registry | 5 |
| C11 | recap chip matching no registry surface | 1 |
| C12 | supported piece later produced independently | 1 |
| C14 | declared learning item never targeted by a screen | 9 |
| C15 | screen target not declared in learningItems | 6 |
| C19 | French shown before its own item's first contact | 6 |
| C20 | one surface resolving to two registry ids | 0 |
| | **Total unresolved** | **85** |

Full detail in [§6 Consistency findings](#6-consistency-findings-reported-not-fixed).

**Group D is empty, and that is a finding rather than an omission.** No L1–L10
screen declares French as *preview* / future exposure: every French surface is
either produced, modelled, chosen, read as support, or named inside an
explanation. The closest thing the data contains is finding **C19** — six
surfaces shown before the registry item behind them is first targeted. Those
are classified by what the screen actually does with them, not moved into a
preview bucket the content never declares.

---

## 2. How to use this pack

### For the founder

Work the **[Founder review queue](#8-founder-review-queue)** only. Mark column
`founder_verdict` in the CSV with one of:

| Code | Meaning |
|---|---|
| **A** | Accept as-is |
| **R** | Reject — remove from the pilot surface |
| **G** | Good but needs a guard (register, context, instruction) |
| **M** | Must change — send to the French reviewer with a note |

### For the named French reviewer

Work the **[Human French-QA queue](#9-human-french-qa-queue)**. For every row fill:

| Column | What to put |
|---|---|
| `human_qa_verdict` | APPROVE / REVISE / REJECT |
| `reviewer_correction` | the corrected French, if any |
| `register_note` | tu/vous, formality, politeness fit |
| `natural_spoken_french_note` | would a native actually say this, here? |
| `reviewer_rationale` | why |
| `reviewer_name` | your name — required for any verdict to count |
| `review_date` | ISO date |

Per Content Bible §18.3, tag findings **BLOCKER / MAJOR / MINOR / POLISH /
PREFERENCE** inside `reviewer_rationale`. A named human reviewer and a
recorded verdict are required; **AI may assist but may not self-certify**.

### What this pack does not do

- It does not rewrite French, propose alternatives, or add curriculum.
- It does not mark anything approved, and no AI judgement is recorded as QA.
- It does not collapse two rows just because the French string is identical:
  the same surface in a different screen is a different review question.

---

## 3. Current registry truth (read before reviewing)

Three different things are easy to confuse. They are kept apart everywhere in
this pack.

**1. Registered production sentences — 2.**
`sentenceRegistry.ts` contains exactly two records, both from the connected
pilot slice in L1:

| Sentence ID | Preferred surface | Payload | EV | French-QA |
|---|---|---|---|---|
| `sent:l01-merci` | Merci. | `v1-lesson-001/s10-weave-merci-thanks` | EV-030 | `founder_waived_provisional` |
| `sent:l01-je-voudrais-un-the-sil-vous-plait` | Je voudrais un thé, s'il vous plaît. | `v1-lesson-001/s11-weave-the-order` | EV-040 | `founder_waived_provisional` |

`founder_waived_provisional` means: the founder explicitly deferred the
pre-registration human French-QA gate and accepted the risk. **It is not
approval.** No named human has reviewed these two sentences either.

**2. Implemented but unregistered learner-facing sentences — 19 production surfaces.**
Every other typed production target in L1–L10 carries no sentence identity:
events record `sentenceId: null` and `evId: null` for them. They are fully
live on the learner surface. They are listed in group **A** below and are the
bulk of the review.

**3. Documentation candidates not present in the app.**
Draft `L1-SE-###` handles and `L1-PM-###` pairings are documentation
provenance only. They are **not** promoted into production identity anywhere
in this pack, and none of them appear as a row.

---

## 4. How this was built (so a reviewer can trust the rows)

A surface is included because of **where it lives in the authored payload**,
never because of a language guess:

| Archetype | Fields treated as learner-facing French |
|---|---|
| meet-card | `payload.fr`, `payload.highlights[].text` |
| insight-card | `payload.examples[].fr`; French named inside `title` / `body` |
| fill-with-traps | `sentenceBefore`/`sentenceAfter` frame, `options[].text`, `reveal.natural`; French named inside `reveal.explanation` / `options[].trapReason` |
| weave | `expectedAnswers[]`, `acceptedAlternatives[]`, `hintCloze`, `suggestedPieces[].text`, `reveal.modelAnswer`, `reveal.naturalAlternatives[]`; French named inside the `if*` feedback lines |
| say-it-your-way | `modelAnswer`, `reveal.modelAnswer`, `reveal.naturalAlternatives[]`, `answerBands.*`, `suggestedPieces[].text` |
| natural-reveal | `modelAnswer`, `naturalAlternatives[]`; French named inside the explanation |
| recap | `piecesUsed[]`; French named inside `lines[]` / `title` |

Verified against the rendering components, so nothing invisible is reviewed
and nothing visible is missed:

- `options[].trapReason` **is** shown — only when the learner picks that wrong option (`FillWithTraps.tsx`).
- `suggestedPieces` are **hidden behind “Need a hint?”** unless `supportRole: "constitutive"`, which renders from first paint (`Weave.tsx`).
- `hintCloze` is the **second** hint rung and replaces the piece tray.
- The `"Write it in French:"` prefix is **stripped for display** (`weaveCopy.ts`), so the English column shows what the learner actually reads.
- Developer-only strings (`designNotes`, `qaChecks`, code comments) are **excluded** — they never reach a learner.

**Answer normalization** (`normalizeAnswer.ts`) folds, on the learner's typed
input: smart apostrophes → straight, accents stripped, commas and periods
dropped, whitespace collapsed, lower-cased. It deliberately keeps `?` and `!`
meaning-bearing and keeps the apostrophe significant. Several authored
`acceptedAlternatives` re-open exactly that apostrophe — see finding **C5**.

---

## 5. Lesson-by-lesson pack

### L1 — Survival Kit

*Greet, ask for something politely, and thank.*

`v1-lesson-001` · 12 screens · 50 rows · prerequisites: none

#### A. Production sentences — typed, assembled or freely produced (4)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L01-010 | `s04-weave-cafe-order` | **Bonjour, je voudrais un café.** | Hello, I would like a coffee. *(instruction)* | You step up to the counter and order simply. | active-new | type | chunk-bonjour chunk-je-voudrais noun-cafe | *(unregistered)* | — |
| QA-L01-019 | `s06-weave-cafe-order-please` | **Bonjour, je voudrais un café, s'il vous plaît.** | Hello, I would like a coffee, please. *(instruction)* | Add the soft close to your order. | active-new | type | chunk-bonjour chunk-je-voudrais noun-cafe chunk-sil-vous-plait | *(unregistered)* | — |
| QA-L01-027 | `s10-weave-merci-thanks` | **Merci.** | The coffee arrives. Thank them. *(instruction)* | The server sets it down and waits a moment. | active-new | type | chunk-merci | `sent:l01-merci` | Merci \| Merci ! |
| QA-L01-033 | `s11-weave-the-order` | **Je voudrais un thé, s'il vous plaît.** | Order a tea politely. *(instruction)* | The server looks over. This time it's a tea. | supported | type | chunk-un-the | `sent:l01-je-voudrais-un-the-sil-vous-plait` | — |

#### B. Model and reveal sentences (3)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L01-003 | `s03-fill-polite-verb` | **Bonjour, je voudrais un café.** | (no English gloss presented) | Which word keeps the request polite? | model-only | read | chunk-je-voudrais chunk-bonjour chunk-un-cafe | *(unregistered)* | — |
| QA-L01-038 | `s08-sayit-cafe-order` | **Bonjour, je voudrais un café, s'il vous plaît. Merci !** | Order politely, then close the exchange. *(instruction)* | The counter is quiet. You have been waiting a moment, and the person behind it turns to you. | model-only | read | chunk-bonjour chunk-je-voudrais noun-cafe chunk-sil-vous-plait chunk-merci | *(unregistered)* | — |
| QA-L01-039 | `s08-sayit-cafe-order` | **Bonjour, un café s'il vous plaît. Merci !** | Order politely, then close the exchange. *(instruction)* | The counter is quiet. You have been waiting a moment, and the person behind it turns to you. | model-only | read | chunk-bonjour chunk-je-voudrais noun-cafe chunk-sil-vous-plait chunk-merci | *(unregistered)* | — |

#### E. Accepted alternatives (2)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L01-028 | `s10-weave-merci-thanks` | **Merci** | The coffee arrives. Thank them. *(instruction)* | The server sets it down and waits a moment. | accepted-alternative | type | chunk-merci | `sent:l01-merci` | — |
| QA-L01-029 | `s10-weave-merci-thanks` | **Merci !** | The coffee arrives. Thank them. *(instruction)* | The server sets it down and waits a moment. | accepted-alternative | type | chunk-merci | *(unregistered)* | — |

#### C. Recognition-only surfaces (34)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L01-004 | `s03-fill-polite-verb` | Bonjour, je ___ un café. | (no English gloss presented) | recognition | read | chunk-je-voudrais | The French frame the blank sits in |
| QA-L01-005 | `s03-fill-polite-verb` | suis | (no English gloss presented) | recognition | choose | chunk-je-voudrais | Distractor — shown reason: Je suis means I am. It cannot ask for a coffee. |
| QA-L01-006 | `s03-fill-polite-verb` | veux | (no English gloss presented) | recognition | choose | chunk-je-voudrais | Distractor — shown reason: It works, but it sounds blunt with someone you don't know. Je voudrais stays polite. |
| QA-L01-007 | `s03-fill-polite-verb` | voudrais | (no English gloss presented) | recognition | choose | chunk-je-voudrais | The option that completes the frame |
| QA-L01-011 | `s04-weave-cafe-order` | Bonjour | Hello | recognition | read | chunk-bonjour | Start with bonjour, then the request. |
| QA-L01-012 | `s04-weave-cafe-order` | Bonjour, je voudrais ___. | Hello, I would like a coffee. | recognition | read | chunk-bonjour chunk-je-voudrais noun-cafe | Second hint rung — a shape to fill in |
| QA-L01-013 | `s04-weave-cafe-order` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Support piece shown as "polite request" (required) |
| QA-L01-014 | `s04-weave-cafe-order` | un café | coffee | recognition | read | noun-cafe | Support piece shown as "noun package" (required) |
| QA-L01-017 | `s05-meet-sil-vous-plait` | s'il vous plaît | please (formal) | recognition | read | chunk-sil-vous-plait | Highlighted chunk boundary inside the meet sentence |
| QA-L01-018 | `s05-meet-sil-vous-plait` | S'il vous plaît. | Please. | active-new | listen | chunk-sil-vous-plait | First contact / re-contact: The polite tail of a request. |
| QA-L01-020 | `s06-weave-cafe-order-please` | Bonjour | Hello | recognition | read | chunk-bonjour | Support piece shown as "greeting" (required) |
| QA-L01-021 | `s06-weave-cafe-order-please` | Bonjour, je voudrais ___, s'il vous plaît. | Hello, I would like a coffee, please. | recognition | read | chunk-bonjour chunk-je-voudrais noun-cafe chunk-sil-vous-plait | Second hint rung — a shape to fill in |
| QA-L01-022 | `s06-weave-cafe-order-please` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Support piece shown as "polite request" (required) |
| QA-L01-023 | `s06-weave-cafe-order-please` | s'il vous plaît | please (formal) | recognition | read | chunk-sil-vous-plait | Add s'il vous plaît to soften the close. It costs nothing and changes the tone. |
| QA-L01-024 | `s06-weave-cafe-order-please` | un café | coffee | recognition | read | noun-cafe | Support piece shown as "noun package" (required) |
| QA-L01-025 | `s07-meet-merci` | Merci | thank you | recognition | read | chunk-merci | Highlighted chunk boundary inside the meet sentence |
| QA-L01-026 | `s07-meet-merci` | Merci. | Thank you. | active-new | listen | chunk-merci | First contact / re-contact: Close with thanks. |
| QA-L01-031 | `s12-meet-un-the` | Je voudrais un thé. | I would like a tea. | supported | listen | chunk-un-the | First contact / re-contact: Same request, a different drink. |
| QA-L01-032 | `s12-meet-un-the` | un thé | a tea | supported | read | chunk-un-the | Highlighted chunk boundary inside the meet sentence |
| QA-L01-034 | `s11-weave-the-order` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Support piece shown as "polite request" |
| QA-L01-035 | `s11-weave-the-order` | Je voudrais ___, s'il vous plaît. | Order a tea politely. | recognition | read | chunk-un-the | Second hint rung — a shape to fill in |
| QA-L01-036 | `s11-weave-the-order` | s'il vous plaît | please (formal) | recognition | read | chunk-sil-vous-plait | Support piece shown as "polite close" |
| QA-L01-037 | `s11-weave-the-order` | un thé | a tea | supported | read | chunk-un-the | Your meaning lands. The drink keeps its little word: un thé. ⏐ The drink piece is right there: un thé. |
| QA-L01-040 | `s08-sayit-cafe-order` | Bonjour | Hello | recognition | read | chunk-bonjour | Support piece for the open task |
| QA-L01-041 | `s08-sayit-cafe-order` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Support piece for the open task |
| QA-L01-042 | `s08-sayit-cafe-order` | merci | thank you | recognition | read | chunk-merci | Support piece for the open task |
| QA-L01-043 | `s08-sayit-cafe-order` | s'il vous plaît | please (formal) | recognition | read | chunk-sil-vous-plait | Support piece for the open task |
| QA-L01-044 | `s08-sayit-cafe-order` | un café | coffee | recognition | read | noun-cafe | Support piece for the open task |
| QA-L01-045 | `s09-recap-survival-kit` | Bonjour | Hello | recycled | read | chunk-bonjour | Chip listed back as a piece the learner used |
| QA-L01-046 | `s09-recap-survival-kit` | je voudrais | I would like | recycled | read | chunk-je-voudrais | Chip listed back as a piece the learner used |
| QA-L01-047 | `s09-recap-survival-kit` | merci | thank you | recycled | read | chunk-merci | You softened it with s'il vous plaît, and closed with merci. |
| QA-L01-048 | `s09-recap-survival-kit` | s'il vous plaît | please (formal) | recycled | read | chunk-sil-vous-plait | You softened it with s'il vous plaît, and closed with merci. |
| QA-L01-049 | `s09-recap-survival-kit` | un café | a coffee | recycled | read | chunk-un-cafe | Chip listed back as a piece the learner used |
| QA-L01-050 | `s09-recap-survival-kit` | un thé | a tea | recycled | read | chunk-un-the | You ordered un thé too, with the piece in front of you. |

#### F. French inside explanatory copy (7)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L01-001 | `s00-goal-survival-kit` | merci | thank you | recognition | read | chunk-merci | Today: add the polite close, thank, and swap the drink. By the end: you can carry a whole small exchange in French. Main pieces: s'il vous plaît, merci. |
| QA-L01-002 | `s00-goal-survival-kit` | s'il vous plaît | please (formal) | recognition | read | chunk-sil-vous-plait | Today: add the polite close, thank, and swap the drink. By the end: you can carry a whole small exchange in French. Main pieces: s'il vous plaît, merci. |
| QA-L01-008 | `s03-fill-polite-verb` | je suis | I am | recognition | read | chunk-je-suis | Je suis means I am. It cannot ask for a coffee. |
| QA-L01-009 | `s03-fill-polite-verb` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Je voudrais softens any request. It is the polite way to ask a stranger for a coffee, or for anything else. ⏐ It works, but it sounds blunt with someone you don |
| QA-L01-015 | `s01-insight-survival-kit` | Bonjour. | Hello. | recognition | read | chunk-bonjour | Illustrative example inside "A small kit goes a long way." |
| QA-L01-016 | `s01-insight-survival-kit` | Merci. | Thank you. | recognition | read | chunk-merci | Illustrative example inside "A small kit goes a long way." |
| QA-L01-030 | `s10-weave-merci-thanks` | merci | thank you | recognition | read | chunk-merci | One word does it here: merci. |

#### Chunk inventory — L1 (8)

| Item ID | French | English | 1st seen | 1st targeted | 1st production | Role | Protected? | Evidence | Reused in | Treatment matches registry? | Founder | Human QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `chunk-bonjour` | Bonjour | Hello | L1 | L1 | L1 | active | protected (single-token chunk) | evidence-bearing | L1 L2 L3 L4 L6 L8 L10 | yes | | |
| `chunk-je-suis` | je suis | I am | L1 | L2 | L2 | active | protected (multi-word chunk) | evidence-bearing | L1 L2 L3 L4 L6 L7 L10 | not declared in this lesson | | |
| `chunk-je-voudrais` | je voudrais | I would like | L1 | L1 | L1 | active | protected (multi-word chunk) | evidence-bearing | L1 L2 L3 L4 L5 L7 L9 L10 | yes | | |
| `chunk-merci` | merci | thank you | L1 | L1 | L1 | active | protected (single-token chunk) | evidence-bearing | L1 L3 L6 L7 L9 L10 | yes | | |
| `chunk-sil-vous-plait` | s'il vous plaît | please (formal) | L1 | L1 | L1 | active | protected (multi-word chunk) | evidence-bearing | L1 L9 L10 | yes | | |
| `chunk-un-cafe` | un café | a coffee | L1 | L5 | L5 | active | protected (multi-word chunk) | evidence-bearing | L1 L5 L9 | not declared in this lesson | | |
| `chunk-un-the` | un thé | a tea | L1 | L1 | L1 | supported | protected (constitutive package) | evidence-bearing (primary of noun-the) | L1 | yes | | |
| `noun-cafe` | café | coffee | L1 | L1 | L1 | active | splittable / atomic | evidence-bearing | L1 L5 L8 | yes | | |

---

### L2 — Être

*Say where you are, in French.*

`v1-lesson-002` · 10 screens · 40 rows · prerequisites: `v1-lesson-001`

#### A. Production sentences — typed, assembled or freely produced (2)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L02-071 | `s04-weave-je-suis-ici` | **Je suis ici.** | I am here. *(instruction)* | Someone called your name. Let them know you've arrived. | active-new | type | chunk-je-suis-ici chunk-je-suis | *(unregistered)* | — |
| QA-L02-078 | `s05-weave-call-and-respond` | **Je suis ici.** | I am here. *(instruction)* | Someone in the next room calls out, looking for you. Let them know you're here. | active-new | type | chunk-je-suis-ici chunk-je-suis | *(unregistered)* | — |

#### B. Model and reveal sentences (3)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L02-062 | `s03-fill-je-suis-blank` | **Je suis ici.** | (no English gloss presented) | You want to tell them you have arrived. Which word fits? | model-only | read | chunk-je-suis-ici | *(unregistered)* | — |
| QA-L02-082 | `s07-sayit-arrive-locate` | **Bonjour, je suis ici.** | Signal you are here. *(instruction)* | You step into a small room. People look up. Let them know you've arrived. | model-only | read | chunk-je-suis chunk-je-suis-ici | *(unregistered)* | — |
| QA-L02-083 | `s07-sayit-arrive-locate` | **Je suis ici.** | Signal you are here. *(instruction)* | You step into a small room. People look up. Let them know you've arrived. | model-only | read | chunk-je-suis chunk-je-suis-ici | *(unregistered)* | — |

#### C. Recognition-only surfaces (21)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L02-053 | `s00-meet-je-suis-ici` | ici | here | supported | read | word-ici | Highlighted chunk boundary inside the meet sentence |
| QA-L02-054 | `s00-meet-je-suis-ici` | je suis | I am | recognition | read | chunk-je-suis | Highlighted chunk boundary inside the meet sentence |
| QA-L02-055 | `s00-meet-je-suis-ici` | Je suis ici. | I am here. | active-new | listen | chunk-je-suis-ici chunk-je-suis | First contact / re-contact: Two words. Where you are. |
| QA-L02-058 | `s02-meet-bonjour-je-suis-ici` | Bonjour | Hello | recognition | read | chunk-bonjour | Highlighted chunk boundary inside the meet sentence |
| QA-L02-059 | `s02-meet-bonjour-je-suis-ici` | Bonjour, je suis ici. | Hello, I am here. | recycled | listen | chunk-bonjour chunk-je-suis-ici | First contact / re-contact: Greet, then locate. |
| QA-L02-060 | `s02-meet-bonjour-je-suis-ici` | ici | here | supported | read | word-ici | Highlighted chunk boundary inside the meet sentence |
| QA-L02-061 | `s02-meet-bonjour-je-suis-ici` | je suis | I am | recognition | read | chunk-je-suis | Highlighted chunk boundary inside the meet sentence |
| QA-L02-063 | `s03-fill-je-suis-blank` | bonjour | Hello | recognition | choose | chunk-bonjour | Distractor — shown reason: Bonjour is a greeting. It cannot sit between Je and ici. |
| QA-L02-064 | `s03-fill-je-suis-blank` | Je ___ ici. | (no English gloss presented) | recognition | read | chunk-je-suis | The French frame the blank sits in |
| QA-L02-065 | `s03-fill-je-suis-blank` | suis | (no English gloss presented) | recognition | choose | chunk-je-suis | The option that completes the frame |
| QA-L02-066 | `s03-fill-je-suis-blank` | voudrais | (no English gloss presented) | recognition | choose | chunk-je-suis | Distractor — shown reason: You met je voudrais in the last lesson. It asks for something. It does not say where you are. |
| QA-L02-072 | `s04-weave-je-suis-ici` | ici | here | recognition | read | word-ici | Support piece shown as "place word" (required) |
| QA-L02-073 | `s04-weave-je-suis-ici` | je suis | I am | recognition | read | chunk-je-suis | Start with je suis. That is the shape that does the work. |
| QA-L02-079 | `s05-weave-call-and-respond` | ici | here | recognition | read | word-ici | The same two words as before: je suis, then ici. |
| QA-L02-080 | `s05-weave-call-and-respond` | je suis | I am | recognition | read | chunk-je-suis | The same two words as before: je suis, then ici. |
| QA-L02-084 | `s07-sayit-arrive-locate` | Bonjour | Hello | recognition | read | chunk-bonjour | Both are natural. Bonjour adds a greeting. Je suis ici is enough when the moment is already clear. |
| QA-L02-085 | `s07-sayit-arrive-locate` | ici | here | recognition | read | word-ici | Support piece for the open task |
| QA-L02-086 | `s07-sayit-arrive-locate` | je suis | I am | recognition | read | chunk-je-suis | Support piece for the open task |
| QA-L02-088 | `s08-recap-first-engine` | Bonjour | Hello | recycled | read | chunk-bonjour | Chip listed back as a piece the learner used |
| QA-L02-089 | `s08-recap-first-engine` | ici | here | recycled | read | word-ici | Chip listed back as a piece the learner used |
| QA-L02-090 | `s08-recap-first-engine` | je suis | I am | recycled | read | chunk-je-suis | Je suis stayed the same every time. That is the shape you'll use again. |

#### F. French inside explanatory copy (14)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L02-051 | `s00-goal-etre` | ici | here | recognition | read | word-ici | Today: your first French sentence engine, je suis. By the end: you can say where you are. Main pieces: je suis, ici. |
| QA-L02-052 | `s00-goal-etre` | je suis | I am | recognition | read | chunk-je-suis | Today: your first French sentence engine, je suis. By the end: you can say where you are. Main pieces: je suis, ici. |
| QA-L02-056 | `s01-insight-je-suis-engine` | je suis | I am | recognition | read | chunk-je-suis | Je suis = I am. This shape is small. You will use it again and again. |
| QA-L02-057 | `s01-insight-je-suis-engine` | Je suis ici. | I am here. | recognition | read | chunk-je-suis-ici | Illustrative example inside "Your first French sentence engine." |
| QA-L02-067 | `s03-fill-je-suis-blank` | Bonjour | Hello | recognition | read | chunk-bonjour | Bonjour is a greeting. It cannot sit between Je and ici. |
| QA-L02-068 | `s03-fill-je-suis-blank` | ici | here | recognition | read | word-ici | Bonjour is a greeting. It cannot sit between Je and ici. |
| QA-L02-069 | `s03-fill-je-suis-blank` | je suis | I am | recognition | read | chunk-je-suis | Je suis = I am. That is the shape that names your location. |
| QA-L02-070 | `s03-fill-je-suis-blank` | je voudrais | I would like | recognition | read | chunk-je-voudrais | You met je voudrais in the last lesson. It asks for something. It does not say where you are. |
| QA-L02-074 | `s04-weave-je-suis-ici` | je suis ici | I am here | recognition | read | chunk-je-suis-ici | Your meaning lands. Two words carry it: je suis ici. |
| QA-L02-075 | `s06-insight-shape-noticed` | je suis ici | I am here | recognition | read | chunk-je-suis-ici | You just wrote Je suis ici. The moment is about to change; the shape will not. That is what an engine does, and the same shape can say how you are, not just whe |
| QA-L02-076 | `s06-insight-shape-noticed` | Je suis ici. | I am here. | recognition | read | chunk-je-suis-ici | Illustrative example inside "Notice the shape." |
| QA-L02-077 | `s06-insight-shape-noticed` | Je suis prêt. | I am ready. | recognition | read | chunk-je-suis | Illustrative example inside "Notice the shape." |
| QA-L02-081 | `s05-weave-call-and-respond` | je suis ici | I am here | recognition | read | chunk-je-suis-ici | Your meaning lands. The same two words answer from anywhere: je suis ici. |
| QA-L02-087 | `s07-sayit-arrive-locate` | je suis ici | I am here | recognition | read | chunk-je-suis-ici | Both are natural. Bonjour adds a greeting. Je suis ici is enough when the moment is already clear. |

#### Chunk inventory — L2 (5)

| Item ID | French | English | 1st seen | 1st targeted | 1st production | Role | Protected? | Evidence | Reused in | Treatment matches registry? | Founder | Human QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `chunk-bonjour` | Bonjour | Hello | L1 | L1 | L1 | active | protected (single-token chunk) | evidence-bearing | L1 L2 L3 L4 L6 L8 L10 | yes | | |
| `chunk-je-suis` | je suis | I am | L1 | L2 | L2 | active | protected (multi-word chunk) | evidence-bearing | L1 L2 L3 L4 L6 L7 L10 | yes | | |
| `chunk-je-suis-ici` | je suis ici | I am here | L2 | L2 | L2 | active | protected (multi-word chunk) | evidence-bearing | L2 L3 L4 L6 L10 | yes | | |
| `chunk-je-voudrais` | je voudrais | I would like | L1 | L1 | L1 | active | protected (multi-word chunk) | evidence-bearing | L1 L2 L3 L4 L5 L7 L9 L10 | not declared in this lesson | | |
| `word-ici` | ici | here | L2 | never targeted | never | supported | splittable / atomic | not evidence-bearing | L2 L3 L4 L6 L8 | yes | | |

---

### L3 — Non

*Say no, and say what is not true.*

`v1-lesson-003` · 12 screens · 58 rows · prerequisites: `v1-lesson-002`

#### A. Production sentences — typed, assembled or freely produced (3)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L03-120 | `s06-weave-je-ne-suis-pas-ici` | **Je ne suis pas ici.** | I am not here. *(instruction)* | Someone is looking for you in the wrong room. Tell them you are not there. | active-new | type | chunk-je-ne-suis-pas chunk-je-suis | *(unregistered)* | — |
| QA-L03-125 | `s07-weave-ce-n-est-pas-ici` | **Ce n'est pas ici.** | It is not here. *(instruction)* | Someone points to the wrong place. Tell them it is not the spot. | active-new | type | chunk-ce-n-est-pas chunk-c-est | *(unregistered)* | Ce n est pas ici. \| Ce n est pas ici |
| QA-L03-131 | `s08-weave-non-je-ne-suis-pas-ici` | **Non, je ne suis pas ici.** | No, I am not here. *(instruction)* | Answer first, then say where you are not. | active-new | type | chunk-non chunk-je-ne-suis-pas | *(unregistered)* | — |

#### B. Model and reveal sentences (4)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L03-100 | `s02-fill-verb-in-sandwich` | **Je ne suis pas ici.** | (no English gloss presented) | You want to say you are not there. Which word sits between the two pieces? | model-only | read | chunk-je-ne-suis-pas word-ici | *(unregistered)* | — |
| QA-L03-113 | `s05-fill-refuse-politely` | **Non merci.** | (no English gloss presented) | Someone offers you something you don't want. Refuse politely. | model-only | read | chunk-non-merci | *(unregistered)* | — |
| QA-L03-137 | `s09-sayit-not-here` | **Je ne suis pas ici.** | Say no and state where you are not. *(instruction)* | You are at the wrong place. Someone is expecting you somewhere else. Say that you are not here. | model-only | read | chunk-non chunk-je-ne-suis-pas chunk-non-merci | *(unregistered)* | — |
| QA-L03-138 | `s09-sayit-not-here` | **Non, je ne suis pas ici.** | Say no and state where you are not. *(instruction)* | You are at the wrong place. Someone is expecting you somewhere else. Say that you are not here. | model-only | read | chunk-non chunk-je-ne-suis-pas chunk-non-merci | *(unregistered)* | — |

#### E. Accepted alternatives (2)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L03-126 | `s07-weave-ce-n-est-pas-ici` | **Ce n est pas ici** | It is not here. *(instruction)* | Someone points to the wrong place. Tell them it is not the spot. | accepted-alternative | type | chunk-ce-n-est-pas chunk-c-est | *(unregistered)* | — |
| QA-L03-127 | `s07-weave-ce-n-est-pas-ici` | **Ce n est pas ici.** | It is not here. *(instruction)* | Someone points to the wrong place. Tell them it is not the spot. | accepted-alternative | type | chunk-ce-n-est-pas chunk-c-est | *(unregistered)* | — |

#### C. Recognition-only surfaces (26)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L03-092 | `s00-meet-je-ne-suis-pas-ici` | je ne suis pas | I am not | recognition | read | chunk-je-ne-suis-pas | Highlighted chunk boundary inside the meet sentence |
| QA-L03-093 | `s00-meet-je-ne-suis-pas-ici` | Je ne suis pas ici. | I am not here. | active-new | listen | chunk-je-ne-suis-pas chunk-je-suis | First contact / re-contact: The same shape, turned negative. |
| QA-L03-101 | `s02-fill-verb-in-sandwich` | bonjour | Hello | recognition | choose | chunk-bonjour | Distractor — shown reason: Bonjour is a greeting. It cannot sit between ne and pas. |
| QA-L03-102 | `s02-fill-verb-in-sandwich` | Je ne ___ pas ici. | (no English gloss presented) | recognition | read | chunk-je-ne-suis-pas | The French frame the blank sits in |
| QA-L03-103 | `s02-fill-verb-in-sandwich` | suis | (no English gloss presented) | recognition | choose | chunk-je-ne-suis-pas | The option that completes the frame |
| QA-L03-104 | `s02-fill-verb-in-sandwich` | voudrais | (no English gloss presented) | recognition | choose | chunk-je-ne-suis-pas | Distractor — shown reason: Je voudrais asks for something. Here you are saying where you are not, so the verb is suis. |
| QA-L03-114 | `s05-fill-refuse-politely` | Merci | thank you | recognition | choose | chunk-merci | Distractor — shown reason: Merci alone can sound like yes please. Non merci makes the refusal clear. |
| QA-L03-115 | `s05-fill-refuse-politely` | Non merci | no thank you | recognition | choose | chunk-non-merci | The option that completes the frame |
| QA-L03-116 | `s05-fill-refuse-politely` | Oui merci | (no English gloss presented) | recognition | choose | chunk-non-merci chunk-non | Distractor — shown reason: Oui accepts the offer. To refuse, start with non. |
| QA-L03-121 | `s06-weave-je-ne-suis-pas-ici` | ici | here | recognition | read | word-ici | Support piece shown as "place word" (required) |
| QA-L03-122 | `s06-weave-je-ne-suis-pas-ici` | je ne suis pas | I am not | recognition | read | chunk-je-ne-suis-pas | Support piece shown as "negative frame" (required) |
| QA-L03-123 | `s03-meet-ce-n-est-pas-ici` | ce n'est pas | it is not / that is not | recognition | read | chunk-ce-n-est-pas | Highlighted chunk boundary inside the meet sentence |
| QA-L03-124 | `s03-meet-ce-n-est-pas-ici` | Ce n'est pas ici. | It is not here. | active-new | listen | chunk-ce-n-est-pas chunk-c-est | First contact / re-contact: The same two pieces work on c'est. |
| QA-L03-128 | `s07-weave-ce-n-est-pas-ici` | ce n'est pas | it is not / that is not | recognition | read | chunk-ce-n-est-pas | Same two pieces, new sentence: ce n'est pas. ⏐ Your meaning lands. The negative wraps c'est the same way: ce n'est pas. ⏐ Use the whole piece: ce n'est pas. |
| QA-L03-129 | `s07-weave-ce-n-est-pas-ici` | ici | here | recognition | read | word-ici | Support piece shown as "place word" (required) |
| QA-L03-132 | `s08-weave-non-je-ne-suis-pas-ici` | ici | here | recognition | read | word-ici | Your meaning lands. The answer comes first, then the sentence: Non, je ne suis pas ici. ⏐ Start with Non, then je ne suis pas ici. |
| QA-L03-133 | `s08-weave-non-je-ne-suis-pas-ici` | je ne suis pas | I am not | recognition | read | chunk-je-ne-suis-pas | Your meaning lands. The answer comes first, then the sentence: Non, je ne suis pas ici. ⏐ Start with Non, then je ne suis pas ici. |
| QA-L03-134 | `s08-weave-non-je-ne-suis-pas-ici` | Non | no | recognition | read | chunk-non | Support piece shown as "no" (required) |
| QA-L03-135 | `s08-weave-non-je-ne-suis-pas-ici` | Non, je ne suis pas ___. | No, I am not here. | recognition | read | chunk-non chunk-je-ne-suis-pas | Second hint rung — a shape to fill in |
| QA-L03-139 | `s09-sayit-not-here` | ici | here | recognition | read | word-ici | Both work. Non answers the call first; je ne suis pas ici states it plainly. |
| QA-L03-140 | `s09-sayit-not-here` | je ne suis pas | I am not | recognition | read | chunk-je-ne-suis-pas | Both work. Non answers the call first; je ne suis pas ici states it plainly. |
| QA-L03-141 | `s09-sayit-not-here` | Non | no | recognition | read | chunk-non | Support piece for the open task |
| QA-L03-143 | `s10-recap-negation` | ce n'est pas | it is not / that is not | recycled | read | chunk-ce-n-est-pas | You turned je suis into je ne suis pas, and c'est into ce n'est pas. |
| QA-L03-144 | `s10-recap-negation` | je ne suis pas | I am not | recycled | read | chunk-je-ne-suis-pas | You turned je suis into je ne suis pas, and c'est into ce n'est pas. |
| QA-L03-145 | `s10-recap-negation` | non | no | recycled | read | chunk-non | Chip listed back as a piece the learner used |
| QA-L03-146 | `s10-recap-negation` | non merci | no thank you | recycled | read | chunk-non-merci | You refused politely with non merci. |

#### F. French inside explanatory copy (23)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L03-091 | `s00-goal-non` | non merci | no thank you | recognition | read | chunk-non-merci | Today: how to say no, and how to make a sentence negative. By the end: you can turn a sentence around with ne ... pas. Main pieces: non, ne ... pas, non merci. |
| QA-L03-094 | `s01-insight-ne-pas-sandwich` | C'est ici. | It is here. | recognition | read | chunk-c-est word-ici | Illustrative example inside "Two pieces, one on each side." |
| QA-L03-095 | `s01-insight-ne-pas-sandwich` | Ce n'est pas ici. | It is not here. | recognition | read | chunk-ce-n-est-pas word-ici | Illustrative example inside "Two pieces, one on each side." |
| QA-L03-096 | `s01-insight-ne-pas-sandwich` | je ne suis pas | I am not | recognition | read | chunk-je-ne-suis-pas | To make a sentence negative, French wraps the action. ne goes in front, pas goes after, and the verb sits between them. Je suis becomes je ne suis pas. Two piec |
| QA-L03-097 | `s01-insight-ne-pas-sandwich` | Je ne suis pas ici. | I am not here. | recognition | read | chunk-je-ne-suis-pas word-ici | Illustrative example inside "Two pieces, one on each side." |
| QA-L03-098 | `s01-insight-ne-pas-sandwich` | je suis | I am | recognition | read | chunk-je-suis | To make a sentence negative, French wraps the action. ne goes in front, pas goes after, and the verb sits between them. Je suis becomes je ne suis pas. Two piec |
| QA-L03-099 | `s01-insight-ne-pas-sandwich` | Je suis ici. | I am here. | recognition | read | chunk-je-suis-ici | Illustrative example inside "Two pieces, one on each side." |
| QA-L03-105 | `s02-fill-verb-in-sandwich` | Bonjour | Hello | recognition | read | chunk-bonjour | Bonjour is a greeting. It cannot sit between ne and pas. |
| QA-L03-106 | `s02-fill-verb-in-sandwich` | je ne suis pas | I am not | recognition | read | chunk-je-ne-suis-pas | The verb goes between the two pieces: je ne suis pas. |
| QA-L03-107 | `s02-fill-verb-in-sandwich` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Je voudrais asks for something. Here you are saying where you are not, so the verb is suis. |
| QA-L03-108 | `s04-insight-oui-non` | non | no | recognition | read | chunk-non | Oui and non. |
| QA-L03-109 | `s04-insight-oui-non` | non merci | no thank you | recognition | read | chunk-non-merci | Oui opens the door: yes. Non closes it: no. They are the fastest answers in French. Non also begins a polite refusal: non merci. |
| QA-L03-110 | `s04-insight-oui-non` | Non, merci. | No, thank you. | recognition | read | chunk-merci chunk-non | Illustrative example inside "Oui and non." |
| QA-L03-111 | `s04-insight-oui-non` | oui | yes | recognition | read | chunk-oui | Oui and non. ⏐ Oui opens the door: yes. Non closes it: no. They are the fastest answers in French. Non also begins a polite refusal: non merci. |
| QA-L03-112 | `s04-insight-oui-non` | Oui. | Yes. | recognition | read | chunk-oui | Illustrative example inside "Oui and non." |
| QA-L03-117 | `s05-fill-refuse-politely` | non | no | recognition | read | chunk-non | Oui accepts the offer. To refuse, start with non. |
| QA-L03-118 | `s05-fill-refuse-politely` | non merci | no thank you | recognition | read | chunk-non-merci | Non merci is a soft, complete refusal. It says no without sounding sharp. ⏐ Merci alone can sound like yes please. Non merci makes the refusal clear. |
| QA-L03-119 | `s05-fill-refuse-politely` | oui | yes | recognition | read | chunk-oui | Oui accepts the offer. To refuse, start with non. |
| QA-L03-130 | `s07-weave-ce-n-est-pas-ici` | c'est | it is / that is | recognition | read | chunk-c-est | Your meaning lands. The negative wraps c'est the same way: ce n'est pas. |
| QA-L03-136 | `s08-weave-non-je-ne-suis-pas-ici` | non | no | recognition | read | chunk-non | Right. Non answers; ne and pas carry the rest. ⏐ Your meaning lands. The answer comes first, then the sentence: Non, je ne suis pas ici. ⏐ Start with Non, then  |
| QA-L03-142 | `s09-sayit-not-here` | non | no | recognition | read | chunk-non | Both work. Non answers the call first; je ne suis pas ici states it plainly. |
| QA-L03-147 | `s10-recap-negation` | c'est | it is / that is | recognition | read | chunk-c-est | You turned je suis into je ne suis pas, and c'est into ce n'est pas. |
| QA-L03-148 | `s10-recap-negation` | je suis | I am | recognition | read | chunk-je-suis | You turned je suis into je ne suis pas, and c'est into ce n'est pas. |

#### Chunk inventory — L3 (13)

| Item ID | French | English | 1st seen | 1st targeted | 1st production | Role | Protected? | Evidence | Reused in | Treatment matches registry? | Founder | Human QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `chunk-bonjour` | Bonjour | Hello | L1 | L1 | L1 | active | protected (single-token chunk) | evidence-bearing | L1 L2 L3 L4 L6 L8 L10 | not declared in this lesson | | |
| `chunk-c-est` | c'est | it is / that is | L3 | L3 | L3 | supported | protected (single-token chunk) | evidence-bearing | L3 L8 L10 | not declared in this lesson | | |
| `chunk-ce-n-est-pas` | ce n'est pas | it is not / that is not | L3 | L3 | L3 | active | protected (canon frame) | evidence-bearing | L3 | yes | | |
| `chunk-je-ne-suis-pas` | je ne suis pas | I am not | L3 | L3 | L3 | active | protected (canon frame) | evidence-bearing | L3 L6 | yes | | |
| `chunk-je-suis` | je suis | I am | L1 | L2 | L2 | active | protected (multi-word chunk) | evidence-bearing | L1 L2 L3 L4 L6 L7 L10 | not declared in this lesson | | |
| `chunk-je-suis-ici` | je suis ici | I am here | L2 | L2 | L2 | active | protected (multi-word chunk) | evidence-bearing | L2 L3 L4 L6 L10 | not declared in this lesson | | |
| `chunk-je-voudrais` | je voudrais | I would like | L1 | L1 | L1 | active | protected (multi-word chunk) | evidence-bearing | L1 L2 L3 L4 L5 L7 L9 L10 | not declared in this lesson | | |
| `chunk-merci` | merci | thank you | L1 | L1 | L1 | active | protected (single-token chunk) | evidence-bearing | L1 L3 L6 L7 L9 L10 | not declared in this lesson | | |
| `chunk-non` | non | no | L3 | L3 | L3 | active | protected (single-token chunk) | evidence-bearing | L3 L6 | yes | | |
| `chunk-non-merci` | non merci | no thank you | L3 | L3 | L3 | supported | protected (multi-word chunk) | evidence-bearing | L3 L6 | yes | | |
| `chunk-oui` | oui | yes | L3 | L3 | never | recognition (seen, never produced) | protected (single-token chunk) | not evidence-bearing | L3 L8 | yes | | |
| `grammar-ne-pas-sandwich` | ne ... pas wraps the action |  | L3 | L3 | never | recognition | splittable / atomic | not evidence-bearing | L3 | yes | | |
| `word-ici` | ici | here | L2 | never targeted | never | supported | splittable / atomic | not evidence-bearing | L2 L3 L4 L6 L8 | not declared in this lesson | | |

---

### L4 — J'ai

*Say how you feel and what you have.*

`v1-lesson-004` · 11 screens · 59 rows · prerequisites: `v1-lesson-003`

#### A. Production sentences — typed, assembled or freely produced (2)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L04-181 | `s05-weave-j-ai-faim` | **J'ai faim.** | I am hungry. *(instruction)* | It is past noon and you have not eaten. Say how you feel, the French way. | active-new | type | chunk-j-ai-faim chunk-j-ai | *(unregistered)* | J ai faim. \| J ai faim \| j ai faim |
| QA-L04-188 | `s06-weave-bonjour-j-ai-une-question` | **Bonjour, j'ai une question.** | Hello, I have a question. *(instruction)* | You step up to ask someone something. Greet first, then say you have a question. | active-new | type | chunk-bonjour chunk-j-ai-une-question chunk-j-ai | *(unregistered)* | Bonjour, j ai une question. \| Bonjour j ai une question |

#### B. Model and reveal sentences (4)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L04-163 | `s02-fill-have-not-be` | **J'ai faim.** | (no English gloss presented) | Which one fits a feeling you have? | model-only | read | chunk-j-ai-faim | *(unregistered)* | — |
| QA-L04-174 | `s03b-fill-where-feel-have` | **J'ai une question.** | (no English gloss presented) | You came with one small thing to ask. What do you say? | model-only | choose | chunk-j-ai-une-question chunk-je-suis-ici chunk-j-ai-faim | *(unregistered)* | — |
| QA-L04-196 | `s07-sayit-how-you-feel` | **Bonjour, j'ai faim.** | Say what you feel, using have. *(instruction)* | You have not eaten all morning and you want to let someone know how you feel. Say it the French way. | model-only | read | chunk-j-ai chunk-j-ai-faim | *(unregistered)* | — |
| QA-L04-197 | `s07-sayit-how-you-feel` | **J'ai faim.** | Say what you feel, using have. *(instruction)* | You have not eaten all morning and you want to let someone know how you feel. Say it the French way. | model-only | read | chunk-j-ai chunk-j-ai-faim | *(unregistered)* | — |

#### E. Accepted alternatives (5)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L04-182 | `s05-weave-j-ai-faim` | **j ai faim** | I am hungry. *(instruction)* | It is past noon and you have not eaten. Say how you feel, the French way. | accepted-alternative | type | chunk-j-ai-faim chunk-j-ai | *(unregistered)* | — |
| QA-L04-183 | `s05-weave-j-ai-faim` | **J ai faim** | I am hungry. *(instruction)* | It is past noon and you have not eaten. Say how you feel, the French way. | accepted-alternative | type | chunk-j-ai-faim chunk-j-ai | *(unregistered)* | — |
| QA-L04-184 | `s05-weave-j-ai-faim` | **J ai faim.** | I am hungry. *(instruction)* | It is past noon and you have not eaten. Say how you feel, the French way. | accepted-alternative | type | chunk-j-ai-faim chunk-j-ai | *(unregistered)* | — |
| QA-L04-189 | `s06-weave-bonjour-j-ai-une-question` | **Bonjour j ai une question** | Hello, I have a question. *(instruction)* | You step up to ask someone something. Greet first, then say you have a question. | accepted-alternative | type | chunk-bonjour chunk-j-ai-une-question chunk-j-ai | *(unregistered)* | — |
| QA-L04-190 | `s06-weave-bonjour-j-ai-une-question` | **Bonjour, j ai une question.** | Hello, I have a question. *(instruction)* | You step up to ask someone something. Greet first, then say you have a question. | accepted-alternative | type | chunk-bonjour chunk-j-ai-une-question chunk-j-ai | *(unregistered)* | — |

#### C. Recognition-only surfaces (25)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L04-154 | `s00-meet-j-ai-faim` | faim | hunger | supported | read | noun-faim | Highlighted chunk boundary inside the meet sentence |
| QA-L04-155 | `s00-meet-j-ai-faim` | J'ai | I have | recognition | read | chunk-j-ai | Highlighted chunk boundary inside the meet sentence |
| QA-L04-156 | `s00-meet-j-ai-faim` | J'ai faim. | I am hungry. | active-new | listen | chunk-j-ai-faim chunk-j-ai | First contact / re-contact: A different way to feel. |
| QA-L04-164 | `s02-fill-have-not-be` | ___ faim. | (no English gloss presented) | recognition | read | chunk-j-ai chunk-j-ai-faim | The French frame the blank sits in |
| QA-L04-165 | `s02-fill-have-not-be` | J'ai | I have | recognition | choose | chunk-j-ai | The option that completes the frame |
| QA-L04-166 | `s02-fill-have-not-be` | Je suis | I am | recognition | choose | chunk-je-suis | Distractor — shown reason: Je suis names who or where you are. For hunger, French uses have: j'ai faim. |
| QA-L04-167 | `s02-fill-have-not-be` | Je voudrais | I would like | recognition | choose | chunk-je-voudrais | Distractor — shown reason: Je voudrais asks for something. Hunger is a state you have, not a request. |
| QA-L04-171 | `s03-meet-j-ai-une-question` | J'ai | I have | recognition | read | chunk-j-ai | Highlighted chunk boundary inside the meet sentence |
| QA-L04-172 | `s03-meet-j-ai-une-question` | J'ai une question. | I have a question. | active-new | listen | chunk-j-ai-une-question chunk-j-ai | First contact / re-contact: Have works for things too. |
| QA-L04-173 | `s03-meet-j-ai-une-question` | une question | question | supported | read | noun-question | Highlighted chunk boundary inside the meet sentence |
| QA-L04-175 | `s03b-fill-where-feel-have` | J'ai faim. | (no English gloss presented) | recognition | choose | chunk-j-ai-une-question chunk-je-suis-ici chunk-j-ai-faim | Distractor — shown reason: That says how you feel, not that you have a question. |
| QA-L04-176 | `s03b-fill-where-feel-have` | Je suis ici. | (no English gloss presented) | recognition | choose | chunk-j-ai-une-question chunk-je-suis-ici chunk-j-ai-faim | Distractor — shown reason: That says where you are, not what you have to ask. |
| QA-L04-185 | `s05-weave-j-ai-faim` | faim | hunger | recognition | read | noun-faim | Start with j'ai, then faim. |
| QA-L04-186 | `s05-weave-j-ai-faim` | j'ai | I have | recognition | read | chunk-j-ai | Start with j'ai, then faim. |
| QA-L04-191 | `s06-weave-bonjour-j-ai-une-question` | Bonjour | Hello | recognition | read | chunk-bonjour | Greet with bonjour, then j'ai une question. |
| QA-L04-192 | `s06-weave-bonjour-j-ai-une-question` | Bonjour, j'ai une ___. | Hello, I have a question. | recognition | read | chunk-bonjour chunk-j-ai-une-question chunk-j-ai | Second hint rung — a shape to fill in |
| QA-L04-193 | `s06-weave-bonjour-j-ai-une-question` | j'ai | I have | recognition | read | chunk-j-ai | Support piece shown as "I have" (required) |
| QA-L04-194 | `s06-weave-bonjour-j-ai-une-question` | une question | question | recognition | read | noun-question | Support piece shown as "noun package" (required) |
| QA-L04-198 | `s07-sayit-how-you-feel` | Bonjour | Hello | recognition | read | chunk-bonjour | French puts hunger on have: j'ai faim. Add bonjour if you are greeting someone first. |
| QA-L04-199 | `s07-sayit-how-you-feel` | faim | hunger | recognition | read | noun-faim | Support piece for the open task |
| QA-L04-200 | `s07-sayit-how-you-feel` | j'ai | I have | recognition | read | chunk-j-ai | Support piece for the open task |
| QA-L04-202 | `s08-recap-jai` | Bonjour | Hello | recycled | read | chunk-bonjour | Chip listed back as a piece the learner used |
| QA-L04-203 | `s08-recap-jai` | faim | hunger | recycled | read | noun-faim | Chip listed back as a piece the learner used |
| QA-L04-204 | `s08-recap-jai` | j'ai | I have | recycled | read | chunk-j-ai | Chip listed back as a piece the learner used |
| QA-L04-205 | `s08-recap-jai` | une question | a question | recycled | read | chunk-une-question | Chip listed back as a piece the learner used |

#### F. French inside explanatory copy (23)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L04-149 | `s00-goal-jai` | faim | hunger | recognition | read | noun-faim | Today: your second engine, j'ai. By the end: you can choose between where you are, how you feel, and what you have to ask. Main pieces: je suis, ici, j'ai, faim |
| QA-L04-150 | `s00-goal-jai` | ici | here | recognition | read | word-ici | Today: your second engine, j'ai. By the end: you can choose between where you are, how you feel, and what you have to ask. Main pieces: je suis, ici, j'ai, faim |
| QA-L04-151 | `s00-goal-jai` | j'ai | I have | recognition | read | chunk-j-ai | Today: your second engine, j'ai. By the end: you can choose between where you are, how you feel, and what you have to ask. Main pieces: je suis, ici, j'ai, faim |
| QA-L04-152 | `s00-goal-jai` | je suis | I am | recognition | read | chunk-je-suis | Today: your second engine, j'ai. By the end: you can choose between where you are, how you feel, and what you have to ask. Main pieces: je suis, ici, j'ai, faim |
| QA-L04-153 | `s00-goal-jai` | une question | a question | recognition | read | chunk-une-question | Today: your second engine, j'ai. By the end: you can choose between where you are, how you feel, and what you have to ask. Main pieces: je suis, ici, j'ai, faim |
| QA-L04-157 | `s01-insight-have-for-feelings` | j'ai faim | I am hungry | recognition | read | chunk-j-ai-faim | In English you are hungry. In French you have hunger: j'ai faim. French puts some feelings on have, not on be. Je suis names who or where you are; j'ai names wh |
| QA-L04-158 | `s01-insight-have-for-feelings` | J'ai faim. | I am hungry. | recognition | read | chunk-j-ai-faim | Illustrative example inside "French has hunger." |
| QA-L04-159 | `s01-insight-have-for-feelings` | j'ai une question | I have a question | recognition | read | chunk-j-ai-une-question | In English you are hungry. In French you have hunger: j'ai faim. French puts some feelings on have, not on be. Je suis names who or where you are; j'ai names wh |
| QA-L04-160 | `s01-insight-have-for-feelings` | J'ai une question. | I have a question. | recognition | read | chunk-j-ai-une-question | Illustrative example inside "French has hunger." |
| QA-L04-161 | `s01-insight-have-for-feelings` | je suis | I am | recognition | read | chunk-je-suis | In English you are hungry. In French you have hunger: j'ai faim. French puts some feelings on have, not on be. Je suis names who or where you are; j'ai names wh |
| QA-L04-162 | `s01-insight-have-for-feelings` | Je suis ici. | I am here. | recognition | read | chunk-je-suis-ici | Illustrative example inside "French has hunger." |
| QA-L04-168 | `s02-fill-have-not-be` | j'ai faim | I am hungry | recognition | read | chunk-j-ai-faim | French has hunger: j'ai faim. ⏐ Je suis names who or where you are. For hunger, French uses have: j'ai faim. |
| QA-L04-169 | `s02-fill-have-not-be` | je suis | I am | recognition | read | chunk-je-suis | Je suis names who or where you are. For hunger, French uses have: j'ai faim. |
| QA-L04-170 | `s02-fill-have-not-be` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Je voudrais asks for something. Hunger is a state you have, not a request. |
| QA-L04-177 | `s03b-fill-where-feel-have` | j'ai faim | I am hungry | recognition | read | chunk-j-ai-faim | French uses j'ai for this: I have a question. Je suis ici says where you are. J'ai faim says how you feel. |
| QA-L04-178 | `s03b-fill-where-feel-have` | je suis ici | I am here | recognition | read | chunk-je-suis-ici | French uses j'ai for this: I have a question. Je suis ici says where you are. J'ai faim says how you feel. |
| QA-L04-179 | `s04-insight-jai-elision` | j'ai | I have | recognition | read | chunk-j-ai | je + ai becomes j'ai. ⏐ Before a vowel, je drops its e and joins the next word: je + ai becomes j'ai. You hear and write one smooth piece, j'ai. |
| QA-L04-180 | `s04-insight-jai-elision` | je + ai | I + have | recognition | read | — | Illustrative example inside "je + ai becomes j'ai." |
| QA-L04-187 | `s05-weave-j-ai-faim` | j'ai faim | I am hungry | recognition | read | chunk-j-ai-faim | Right. faim is hunger; j'ai faim is I am hungry. ⏐ Your meaning lands. French puts the feeling on have: j'ai faim. |
| QA-L04-195 | `s06-weave-bonjour-j-ai-une-question` | j'ai une question | I have a question | recognition | read | chunk-j-ai-une-question | Your meaning lands. French hands the question to have: j'ai une question. ⏐ Greet with bonjour, then j'ai une question. |
| QA-L04-201 | `s07-sayit-how-you-feel` | j'ai faim | I am hungry | recognition | read | chunk-j-ai-faim | French puts hunger on have: j'ai faim. Add bonjour if you are greeting someone first. |
| QA-L04-206 | `s08-recap-jai` | j'ai faim | I am hungry | recognition | read | chunk-j-ai-faim | You said j'ai faim for I am hungry. |
| QA-L04-207 | `s08-recap-jai` | j'ai une question | I have a question | recognition | read | chunk-j-ai-une-question | You used j'ai for a thing too: j'ai une question. |

#### Chunk inventory — L4 (13)

| Item ID | French | English | 1st seen | 1st targeted | 1st production | Role | Protected? | Evidence | Reused in | Treatment matches registry? | Founder | Human QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `chunk-bonjour` | Bonjour | Hello | L1 | L1 | L1 | active | protected (single-token chunk) | evidence-bearing | L1 L2 L3 L4 L6 L8 L10 | not declared in this lesson | | |
| `chunk-j-ai` | j'ai | I have | L4 | L4 | L4 | active | protected (single-token chunk) | evidence-bearing | L4 L5 L6 | yes | | |
| `chunk-j-ai-faim` | j'ai faim | I am hungry | L4 | L4 | L4 | active | protected (multi-word chunk) | evidence-bearing | L4 | yes | | |
| `chunk-j-ai-une-question` | j'ai une question | I have a question | L4 | L4 | L4 | active | protected (multi-word chunk) | evidence-bearing | L4 L5 L6 | yes | | |
| `chunk-je-suis` | je suis | I am | L1 | L2 | L2 | active | protected (multi-word chunk) | evidence-bearing | L1 L2 L3 L4 L6 L7 L10 | not declared in this lesson | | |
| `chunk-je-suis-ici` | je suis ici | I am here | L2 | L2 | L2 | active | protected (multi-word chunk) | evidence-bearing | L2 L3 L4 L6 L10 | not declared in this lesson | | |
| `chunk-je-voudrais` | je voudrais | I would like | L1 | L1 | L1 | active | protected (multi-word chunk) | evidence-bearing | L1 L2 L3 L4 L5 L7 L9 L10 | not declared in this lesson | | |
| `chunk-une-question` | une question | a question | L4 | L5 | L5 | active | protected (multi-word chunk) | evidence-bearing | L4 L5 L6 | not declared in this lesson | | |
| `micro-je-suis-vs-j-ai` | je suis vs j'ai |  | L4 | L4 | never | recognition | splittable / atomic | not evidence-bearing | L4 | yes | | |
| `noun-faim` | faim | hunger | L4 | never targeted | never | supported | splittable / atomic | not evidence-bearing | L4 | yes | | |
| `noun-question` | question | question | L4 | L5 | never | supported | splittable / atomic | not evidence-bearing | L4 L5 | yes | | |
| `sound-elision` | elision (j' / c' / l' / d' / s') |  | L4 | L4 | never | recognition | splittable / atomic | not evidence-bearing | L4 | yes | | |
| `word-ici` | ici | here | L2 | never targeted | never | supported | splittable / atomic | not evidence-bearing | L2 L3 L4 L6 L8 | not declared in this lesson | | |

---

### L5 — Un, une

*Ask for things with the right little word.*

`v1-lesson-005` · 11 screens · 39 rows · prerequisites: `v1-lesson-004`

#### A. Production sentences — typed, assembled or freely produced (2)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L05-230 | `s05-weave-je-voudrais-un-cafe` | **Je voudrais un café.** | I would like a coffee. *(instruction)* | Order at the counter, with the right little word. | active-new | type | chunk-je-voudrais chunk-un-cafe | *(unregistered)* | — |
| QA-L05-233 | `s06-weave-j-ai-une-question` | **J'ai une question.** | I have a question. *(instruction)* | You want to ask something. Use the right little word. | active-new | type | chunk-j-ai chunk-une-question | *(unregistered)* | J ai une question. \| J ai une question \| j ai une question |

#### B. Model and reveal sentences (5)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L05-212 | `s03-fill-package-cafe` | **un café** | a coffee | Which little word travels with café? | model-only | read | chunk-un-cafe | *(unregistered)* | — |
| QA-L05-217 | `s04-fill-package-question` | **une question** | a question | You have something to ask. Which little word travels with question? | model-only | read | chunk-une-question | *(unregistered)* | — |
| QA-L05-226 | `s04b-fill-choose-package` | **une question** | a question | You have a question. Which French package fits? | model-only | choose | chunk-une-question | *(unregistered)* | — |
| QA-L05-239 | `s07-sayit-ask-for-a-coffee` | **Je voudrais un café.** | Ask for an object, package included. *(instruction)* | You are at a counter and you want a coffee. Ask for it with the right little word in front. | model-only | read | chunk-je-voudrais chunk-un-cafe | *(unregistered)* | — |
| QA-L05-240 | `s07-sayit-ask-for-a-coffee` | **Un café, s'il vous plaît.** | Ask for an object, package included. *(instruction)* | You are at a counter and you want a coffee. Ask for it with the right little word in front. | model-only | read | chunk-je-voudrais chunk-un-cafe | *(unregistered)* | — |

#### E. Accepted alternatives (3)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L05-234 | `s06-weave-j-ai-une-question` | **j ai une question** | I have a question. *(instruction)* | You want to ask something. Use the right little word. | accepted-alternative | type | chunk-j-ai chunk-une-question | *(unregistered)* | — |
| QA-L05-235 | `s06-weave-j-ai-une-question` | **J ai une question** | I have a question. *(instruction)* | You want to ask something. Use the right little word. | accepted-alternative | type | chunk-j-ai chunk-une-question | *(unregistered)* | — |
| QA-L05-236 | `s06-weave-j-ai-une-question` | **J ai une question.** | I have a question. *(instruction)* | You want to ask something. Use the right little word. | accepted-alternative | type | chunk-j-ai chunk-une-question | *(unregistered)* | — |

#### C. Recognition-only surfaces (19)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L05-210 | `s00-meet-un-cafe` | un café | a coffee | active-new | listen | chunk-un-cafe noun-cafe | First contact / re-contact: Café comes with un. |
| QA-L05-211 | `s01-meet-une-question` | une question | a question | supported | listen | chunk-une-question noun-question | First contact / re-contact: Question comes with une. |
| QA-L05-213 | `s03-fill-package-cafe` | ___ café. | (no English gloss presented) | recognition | read | chunk-un-cafe | The French frame the blank sits in |
| QA-L05-214 | `s03-fill-package-cafe` | un | (no English gloss presented) | recognition | choose | chunk-un-cafe | The option that completes the frame |
| QA-L05-215 | `s03-fill-package-cafe` | une | (no English gloss presented) | recognition | choose | chunk-un-cafe | Distractor — shown reason: Café travels with un: un café. une goes with other words, like une question. |
| QA-L05-218 | `s04-fill-package-question` | ___ question. | (no English gloss presented) | recognition | read | chunk-une-question | The French frame the blank sits in |
| QA-L05-219 | `s04-fill-package-question` | un | (no English gloss presented) | recognition | choose | chunk-une-question | Distractor — shown reason: Question travels with une: une question. un goes with café: un café. |
| QA-L05-220 | `s04-fill-package-question` | une | (no English gloss presented) | recognition | choose | chunk-une-question | The option that completes the frame |
| QA-L05-227 | `s04b-fill-choose-package` | question | question | recognition | choose | noun-question | Distractor — shown reason: In French, the noun travels with its little word here: une question. |
| QA-L05-228 | `s04b-fill-choose-package` | un café | a coffee | recognition | choose | chunk-un-cafe | You are not choosing a loose word. You are choosing the package: une question. The same way, the coffee package is un café. |
| QA-L05-229 | `s04b-fill-choose-package` | un question | (no English gloss presented) | recognition | choose | chunk-une-question chunk-un-cafe grammar-un-une-package | Distractor — shown reason: This package is not the one we use here. Keep it as: une question. |
| QA-L05-231 | `s05-weave-je-voudrais-un-cafe` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Support piece shown as "polite request" (required) |
| QA-L05-232 | `s05-weave-je-voudrais-un-cafe` | un café | a coffee | recognition | read | chunk-un-cafe | The package stayed together: un café. ⏐ Right. un café is one piece, the little word included. ⏐ Your meaning lands. Keep the package whole: un café. ⏐ Add the  |
| QA-L05-237 | `s06-weave-j-ai-une-question` | j'ai | I have | recognition | read | chunk-j-ai | Support piece shown as "I have" (required) |
| QA-L05-238 | `s06-weave-j-ai-une-question` | une question | a question | recognition | read | chunk-une-question | The other package: une question. ⏐ Right. une question is one piece too. ⏐ Your meaning lands. The little word travels with it: une question. ⏐ Keep une with qu |
| QA-L05-241 | `s07-sayit-ask-for-a-coffee` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Support piece for the open task |
| QA-L05-242 | `s07-sayit-ask-for-a-coffee` | un café | a coffee | recognition | read | chunk-un-cafe | Both work. The little word un stays with café either way: un café. |
| QA-L05-243 | `s08-recap-packages` | un café | a coffee | recycled | read | chunk-un-cafe | You learned un café and une question. ⏐ You used them in real requests: je voudrais un café, j'ai une question. |
| QA-L05-244 | `s08-recap-packages` | une question | a question | recycled | read | chunk-une-question | You learned un café and une question. |

#### F. French inside explanatory copy (10)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L05-208 | `s00-goal-un-une` | un café | a coffee | recognition | read | chunk-un-cafe | Today: the little words that travel with a noun. By the end: you can ask for and name things with the right little word. Main pieces: un café, une question. |
| QA-L05-209 | `s00-goal-un-une` | une question | a question | recognition | read | chunk-une-question | Today: the little words that travel with a noun. By the end: you can ask for and name things with the right little word. Main pieces: un café, une question. |
| QA-L05-216 | `s03-fill-package-cafe` | une question | a question | recognition | read | chunk-une-question | Café travels with un: un café. une goes with other words, like une question. |
| QA-L05-221 | `s04-fill-package-question` | un café | a coffee | recognition | read | chunk-un-cafe | Question travels with une: une question. un goes with café: un café. |
| QA-L05-222 | `s02-insight-little-packages` | J'ai une question. | I have a question. | recognition | read | chunk-j-ai-une-question | Illustrative example inside "Words come in small packages." |
| QA-L05-223 | `s02-insight-little-packages` | Je voudrais un café. | I would like a coffee. | recognition | read | chunk-je-voudrais chunk-un-cafe | Illustrative example inside "Words come in small packages." |
| QA-L05-224 | `s02-insight-little-packages` | un café | a coffee | recognition | read | chunk-un-cafe | Many French words travel with a little word in front. Café comes as un café. Question comes as une question. Learn the package, not a rule: un café, une questio |
| QA-L05-225 | `s02-insight-little-packages` | une question | a question | recognition | read | chunk-une-question | Many French words travel with a little word in front. Café comes as un café. Question comes as une question. Learn the package, not a rule: un café, une questio |
| QA-L05-245 | `s08-recap-packages` | j'ai une question | I have a question | recognition | read | chunk-j-ai-une-question | You used them in real requests: je voudrais un café, j'ai une question. |
| QA-L05-246 | `s08-recap-packages` | je voudrais | I would like | recognition | read | chunk-je-voudrais | You used them in real requests: je voudrais un café, j'ai une question. |

#### Chunk inventory — L5 (8)

| Item ID | French | English | 1st seen | 1st targeted | 1st production | Role | Protected? | Evidence | Reused in | Treatment matches registry? | Founder | Human QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `chunk-j-ai` | j'ai | I have | L4 | L4 | L4 | active | protected (single-token chunk) | evidence-bearing | L4 L5 L6 | yes | | |
| `chunk-j-ai-une-question` | j'ai une question | I have a question | L4 | L4 | L4 | active | protected (multi-word chunk) | evidence-bearing | L4 L5 L6 | not declared in this lesson | | |
| `chunk-je-voudrais` | je voudrais | I would like | L1 | L1 | L1 | active | protected (multi-word chunk) | evidence-bearing | L1 L2 L3 L4 L5 L7 L9 L10 | yes | | |
| `chunk-un-cafe` | un café | a coffee | L1 | L5 | L5 | active | protected (multi-word chunk) | evidence-bearing | L1 L5 L9 | yes | | |
| `chunk-une-question` | une question | a question | L4 | L5 | L5 | active | protected (multi-word chunk) | evidence-bearing | L4 L5 L6 | yes | | |
| `grammar-un-une-package` | un and une are little packages |  | L5 | L5 | never | recognition | splittable / atomic | evidence-bearing | L5 | yes | | |
| `noun-cafe` | café | coffee | L1 | L1 | L1 | active | splittable / atomic | evidence-bearing | L1 L5 L8 | yes | | |
| `noun-question` | question | question | L4 | L5 | never | supported | splittable / atomic | not evidence-bearing | L4 L5 | yes | | |

---

### L6 — Un petit moment

*Carry a whole small moment, from greeting to goodbye.*

`v1-lesson-006` · 12 screens · 58 rows · prerequisites: `v1-lesson-005`

#### A. Production sentences — typed, assembled or freely produced (3)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L06-260 | `s03-weave-bonjour-je-suis-ici` | **Bonjour, je suis ici.** | Hello. I am here. *(instruction)* | You are at the door. Greet, then say you have arrived. | recycled | type | chunk-bonjour chunk-je-suis-ici chunk-je-suis | *(unregistered)* | — |
| QA-L06-276 | `s05-weave-j-ai-une-question` | **J'ai une question.** | I have a question. *(instruction)* | There is one small thing you came to ask. Open it. | recycled | type | chunk-j-ai chunk-j-ai-une-question chunk-une-question | *(unregistered)* | J ai une question. \| J ai une question |
| QA-L06-291 | `s08-weave-close-open` | **Merci, au revoir.** | Close the moment in French: thank them and say goodbye. *(instruction)* | You are about to leave. Thank them, then close. | active-new | type | chunk-merci chunk-au-revoir | *(unregistered)* | — |

#### B. Model and reveal sentences (3)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L06-256 | `s02-fill-right-place` | **Je suis ici.** | (no English gloss presented) | You reach the right door and step in. What do you say? | model-only | choose | chunk-je-suis-ici chunk-je-ne-suis-pas | *(unregistered)* | — |
| QA-L06-270 | `s04-fill-decline-offer` | **Non merci.** | (no English gloss presented) | Inside, someone offers you a coffee. You are fine without one. What do you say? | model-only | choose | chunk-non-merci | *(unregistered)* | — |
| QA-L06-296 | `s09-sayit-whole-moment` | **Bonjour. Je suis ici. J'ai une question. Merci, au revoir.** | Carry the whole moment, from the door to goodbye. *(instruction)* | You arrive for a small first meeting. Greet, say you are here, say you have one small thing to ask, thank them, and leave. Use the French pieces you already have. | model-only | read | chunk-bonjour chunk-je-suis-ici chunk-j-ai-une-question chunk-merci chunk-au-revoir | *(unregistered)* | — |

#### E. Accepted alternatives (6)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L06-277 | `s05-weave-j-ai-une-question` | **J ai une question** | I have a question. *(instruction)* | There is one small thing you came to ask. Open it. | accepted-alternative | type | chunk-j-ai chunk-j-ai-une-question chunk-une-question | *(unregistered)* | — |
| QA-L06-278 | `s05-weave-j-ai-une-question` | **J ai une question.** | I have a question. *(instruction)* | There is one small thing you came to ask. Open it. | accepted-alternative | type | chunk-j-ai chunk-j-ai-une-question chunk-une-question | *(unregistered)* | — |
| QA-L06-284 | `s07-sayit-step-in` | **Bonjour. J'ai une question.** | Greet, locate, and open your question. *(instruction)* | You have just stepped in. Greet them, say you are here, and open your one small question. | accepted-alternative | free-produce | chunk-bonjour chunk-je-suis-ici chunk-j-ai-une-question | *(unregistered)* | — |
| QA-L06-285 | `s07-sayit-step-in` | **Bonjour. Je suis ici. J'ai une question.** | Greet, locate, and open your question. *(instruction)* | You have just stepped in. Greet them, say you are here, and open your one small question. | accepted-alternative | free-produce | chunk-bonjour chunk-je-suis-ici chunk-j-ai-une-question | *(unregistered)* | — |
| QA-L06-294 | `s09-sayit-whole-moment` | **Bonjour. J'ai une question. Merci. Au revoir.** | Carry the whole moment, from the door to goodbye. *(instruction)* | You arrive for a small first meeting. Greet, say you are here, say you have one small thing to ask, thank them, and leave. Use the French pieces you already have. | accepted-alternative | free-produce | chunk-bonjour chunk-je-suis-ici chunk-j-ai-une-question chunk-merci chunk-au-revoir | *(unregistered)* | — |
| QA-L06-295 | `s09-sayit-whole-moment` | **Bonjour. Je suis ici. J'ai une question. Merci. Au revoir.** | Carry the whole moment, from the door to goodbye. *(instruction)* | You arrive for a small first meeting. Greet, say you are here, say you have one small thing to ask, thank them, and leave. Use the French pieces you already have. | accepted-alternative | free-produce | chunk-bonjour chunk-je-suis-ici chunk-j-ai-une-question chunk-merci chunk-au-revoir | *(unregistered)* | — |

#### C. Recognition-only surfaces (28)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L06-254 | `s01-meet-bonjour-at-the-door` | Bonjour | Hello | recognition | read | chunk-bonjour | Highlighted chunk boundary inside the meet sentence |
| QA-L06-255 | `s01-meet-bonjour-at-the-door` | Bonjour. | Hello. | recycled | listen | chunk-bonjour | First contact / re-contact: At the door. |
| QA-L06-257 | `s02-fill-right-place` | J'ai faim. | (no English gloss presented) | recognition | choose | chunk-je-suis-ici chunk-je-ne-suis-pas | Distractor — shown reason: That is a feeling, not where you are. |
| QA-L06-258 | `s02-fill-right-place` | Je ne suis pas ici. | (no English gloss presented) | recognition | choose | chunk-je-suis-ici chunk-je-ne-suis-pas | Distractor — shown reason: That says the opposite. You are here, so: Je suis ici. |
| QA-L06-261 | `s03-weave-bonjour-je-suis-ici` | Bonjour | Hello | recognition | read | chunk-bonjour | Your meaning lands. A native opens first, then lands: Bonjour. Je suis ici. ⏐ Start with bonjour, then je suis ici. |
| QA-L06-262 | `s03-weave-bonjour-je-suis-ici` | Bonjour, je suis ___. | Hello. I am here. | recognition | read | chunk-bonjour chunk-je-suis-ici chunk-je-suis | Second hint rung — a shape to fill in |
| QA-L06-263 | `s03-weave-bonjour-je-suis-ici` | ici | here | recognition | read | word-ici | Support piece shown as "place word" (required) |
| QA-L06-264 | `s03-weave-bonjour-je-suis-ici` | je suis | I am | recognition | read | chunk-je-suis | Support piece shown as "I am" (required) |
| QA-L06-271 | `s04-fill-decline-offer` | J'ai une question. | (no English gloss presented) | recognition | choose | chunk-non-merci | Distractor — shown reason: That does not answer the offer. |
| QA-L06-272 | `s04-fill-decline-offer` | Merci. | (no English gloss presented) | recognition | choose | chunk-non-merci | Distractor — shown reason: Merci alone can sound like yes please. Non merci makes the no clear. |
| QA-L06-279 | `s05-weave-j-ai-une-question` | j'ai | I have | recognition | read | chunk-j-ai | Right. j'ai carries the question, as one package. ⏐ Use j'ai, then une question. |
| QA-L06-280 | `s05-weave-j-ai-une-question` | une question | a question | recognition | read | chunk-une-question | Use j'ai, then une question. |
| QA-L06-282 | `s06-meet-au-revoir` | Au revoir | goodbye | recognition | read | chunk-au-revoir | Highlighted chunk boundary inside the meet sentence |
| QA-L06-283 | `s06-meet-au-revoir` | Au revoir. | Goodbye. | active-new | listen | chunk-au-revoir | First contact / re-contact: The close. |
| QA-L06-286 | `s07-sayit-step-in` | Bonjour | Hello | recognition | read | chunk-bonjour | Support piece for the open task |
| QA-L06-287 | `s07-sayit-step-in` | ici | here | recognition | read | word-ici | Support piece for the open task |
| QA-L06-288 | `s07-sayit-step-in` | j'ai | I have | recognition | read | chunk-j-ai | Support piece for the open task |
| QA-L06-289 | `s07-sayit-step-in` | je suis | I am | recognition | read | chunk-je-suis | Support piece for the open task |
| QA-L06-290 | `s07-sayit-step-in` | une question | a question | recognition | read | chunk-une-question | Support piece for the open task |
| QA-L06-292 | `s08-weave-close-open` | au revoir | goodbye | recognition | read | chunk-au-revoir | Right. merci then au revoir, and you are out the door. ⏐ Your meaning lands. Thanks comes first, then the goodbye: Merci. Au revoir. ⏐ Thank first with merci, t |
| QA-L06-293 | `s08-weave-close-open` | merci | thank you | recognition | read | chunk-merci | Right. merci then au revoir, and you are out the door. ⏐ Your meaning lands. Thanks comes first, then the goodbye: Merci. Au revoir. ⏐ Thank first with merci, t |
| QA-L06-297 | `s10-recap-a-small-moment` | Au revoir | goodbye | recycled | read | chunk-au-revoir | Chip listed back as a piece the learner used |
| QA-L06-298 | `s10-recap-a-small-moment` | Bonjour | Hello | recycled | read | chunk-bonjour | You carried it in French, from bonjour to au revoir. |
| QA-L06-299 | `s10-recap-a-small-moment` | ici | here | recycled | read | word-ici | Chip listed back as a piece the learner used |
| QA-L06-300 | `s10-recap-a-small-moment` | j'ai | I have | recycled | read | chunk-j-ai | Chip listed back as a piece the learner used |
| QA-L06-301 | `s10-recap-a-small-moment` | je suis | I am | recycled | read | chunk-je-suis | Chip listed back as a piece the learner used |
| QA-L06-302 | `s10-recap-a-small-moment` | Merci | thank you | recycled | read | chunk-merci | Chip listed back as a piece the learner used |
| QA-L06-303 | `s10-recap-a-small-moment` | une question | a question | recycled | read | chunk-une-question | Chip listed back as a piece the learner used |

#### F. French inside explanatory copy (18)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L06-247 | `s00-goal-petit-moment` | au revoir | goodbye | recognition | read | chunk-au-revoir | Today: no new rule. By the end: you can carry one small human moment with pieces you already built. Main pieces: bonjour, je suis, ici, j'ai, une question, merc |
| QA-L06-248 | `s00-goal-petit-moment` | Bonjour | Hello | recognition | read | chunk-bonjour | Today: no new rule. By the end: you can carry one small human moment with pieces you already built. Main pieces: bonjour, je suis, ici, j'ai, une question, merc |
| QA-L06-249 | `s00-goal-petit-moment` | ici | here | recognition | read | word-ici | Today: no new rule. By the end: you can carry one small human moment with pieces you already built. Main pieces: bonjour, je suis, ici, j'ai, une question, merc |
| QA-L06-250 | `s00-goal-petit-moment` | j'ai | I have | recognition | read | chunk-j-ai | Today: no new rule. By the end: you can carry one small human moment with pieces you already built. Main pieces: bonjour, je suis, ici, j'ai, une question, merc |
| QA-L06-251 | `s00-goal-petit-moment` | je suis | I am | recognition | read | chunk-je-suis | Today: no new rule. By the end: you can carry one small human moment with pieces you already built. Main pieces: bonjour, je suis, ici, j'ai, une question, merc |
| QA-L06-252 | `s00-goal-petit-moment` | merci | thank you | recognition | read | chunk-merci | Today: no new rule. By the end: you can carry one small human moment with pieces you already built. Main pieces: bonjour, je suis, ici, j'ai, une question, merc |
| QA-L06-253 | `s00-goal-petit-moment` | une question | a question | recognition | read | chunk-une-question | Today: no new rule. By the end: you can carry one small human moment with pieces you already built. Main pieces: bonjour, je suis, ici, j'ai, une question, merc |
| QA-L06-259 | `s02-fill-right-place` | je suis ici | I am here | recognition | read | chunk-je-suis-ici | That says the opposite. You are here, so: Je suis ici. |
| QA-L06-265 | `s03-weave-bonjour-je-suis-ici` | je suis ici | I am here | recognition | read | chunk-je-suis-ici | Your meaning lands. A native opens first, then lands: Bonjour. Je suis ici. ⏐ Start with bonjour, then je suis ici. |
| QA-L06-266 | `s00-insight-bonjour-to-au-revoir` | au revoir | goodbye | recognition | read | chunk-au-revoir | From bonjour to au revoir. ⏐ In France, a small moment opens with bonjour and closes with au revoir. Today you carry the whole arc, using only the pieces you al |
| QA-L06-267 | `s00-insight-bonjour-to-au-revoir` | Au revoir. | Goodbye. | recognition | read | chunk-au-revoir | Illustrative example inside "From bonjour to au revoir." |
| QA-L06-268 | `s00-insight-bonjour-to-au-revoir` | Bonjour | Hello | recognition | read | chunk-bonjour | From bonjour to au revoir. ⏐ In France, a small moment opens with bonjour and closes with au revoir. Today you carry the whole arc, using only the pieces you al |
| QA-L06-269 | `s00-insight-bonjour-to-au-revoir` | Bonjour. | Hello. | recognition | read | chunk-bonjour | Illustrative example inside "From bonjour to au revoir." |
| QA-L06-273 | `s04-fill-decline-offer` | merci | thank you | recognition | read | chunk-merci | A soft, clear refusal: non to decline, merci to stay polite. |
| QA-L06-274 | `s04-fill-decline-offer` | non | no | recognition | read | chunk-non | A soft, clear refusal: non to decline, merci to stay polite. |
| QA-L06-275 | `s04-fill-decline-offer` | non merci | no thank you | recognition | read | chunk-non-merci | Merci alone can sound like yes please. Non merci makes the no clear. |
| QA-L06-281 | `s05-weave-j-ai-une-question` | j'ai une question | I have a question | recognition | read | chunk-j-ai-une-question | Your meaning lands. The question rides on have: j'ai une question. |
| QA-L06-304 | `s10-recap-a-small-moment` | au revoir | goodbye | recognition | read | chunk-au-revoir | You carried it in French, from bonjour to au revoir. |

#### Chunk inventory — L6 (12)

| Item ID | French | English | 1st seen | 1st targeted | 1st production | Role | Protected? | Evidence | Reused in | Treatment matches registry? | Founder | Human QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `chunk-au-revoir` | au revoir | goodbye | L6 | L6 | L6 | active | protected (multi-word chunk) | evidence-bearing | L6 L7 L9 L10 | yes | | |
| `chunk-bonjour` | Bonjour | Hello | L1 | L1 | L1 | active | protected (single-token chunk) | evidence-bearing | L1 L2 L3 L4 L6 L8 L10 | yes | | |
| `chunk-j-ai` | j'ai | I have | L4 | L4 | L4 | active | protected (single-token chunk) | evidence-bearing | L4 L5 L6 | yes | | |
| `chunk-j-ai-une-question` | j'ai une question | I have a question | L4 | L4 | L4 | active | protected (multi-word chunk) | evidence-bearing | L4 L5 L6 | yes | | |
| `chunk-je-ne-suis-pas` | je ne suis pas | I am not | L3 | L3 | L3 | active | protected (canon frame) | evidence-bearing | L3 L6 | yes | | |
| `chunk-je-suis` | je suis | I am | L1 | L2 | L2 | active | protected (multi-word chunk) | evidence-bearing | L1 L2 L3 L4 L6 L7 L10 | yes | | |
| `chunk-je-suis-ici` | je suis ici | I am here | L2 | L2 | L2 | active | protected (multi-word chunk) | evidence-bearing | L2 L3 L4 L6 L10 | yes | | |
| `chunk-merci` | merci | thank you | L1 | L1 | L1 | active | protected (single-token chunk) | evidence-bearing | L1 L3 L6 L7 L9 L10 | yes | | |
| `chunk-non` | non | no | L3 | L3 | L3 | active | protected (single-token chunk) | evidence-bearing | L3 L6 | not declared in this lesson | | |
| `chunk-non-merci` | non merci | no thank you | L3 | L3 | L3 | supported | protected (multi-word chunk) | evidence-bearing | L3 L6 | yes | | |
| `chunk-une-question` | une question | a question | L4 | L5 | L5 | active | protected (multi-word chunk) | evidence-bearing | L4 L5 L6 | yes | | |
| `word-ici` | ici | here | L2 | never targeted | never | supported | splittable / atomic | not evidence-bearing | L2 L3 L4 L6 L8 | not declared in this lesson | | |

---

### L7 — Je vais

*Say you're heading home, and close the moment.*

`v1-lesson-007` · 11 screens · 47 rows · prerequisites: `v1-lesson-006`

#### A. Production sentences — typed, assembled or freely produced (2)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L07-323 | `s04-weave-heading-home` | **Je vais à la maison.** | Say you're going home. *(instruction)* | The evening is winding down. Let them know where you're heading. | supported | type | chunk-je-vais chunk-a-la-maison | *(unregistered)* | — |
| QA-L07-332 | `s05-weave-close-the-moment` | **Je vais à la maison. Au revoir.** | Say you're going home, then say goodbye. *(instruction)* | You're at the door. Close it the way you did before. | supported | type | chunk-je-vais chunk-a-la-maison | *(unregistered)* | Je vais à la maison, au revoir. |

#### B. Model and reveal sentences (6)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L07-315 | `s03-fill-je-vais-blank` | **Je vais à la maison.** | (no English gloss presented) | You are leaving for home. Which word moves you? | model-only | read | chunk-a-la-maison chunk-je-vais | *(unregistered)* | — |
| QA-L07-327 | `s08-fill-destination-package` | **Je vais à la maison.** | (no English gloss presented) | You are naming where you're heading. Which piece says home? | model-only | read | chunk-a-la-maison chunk-je-vais | *(unregistered)* | — |
| QA-L07-338 | `s09-reveal-the-close` | **Je vais à la maison, au revoir.** | (no English gloss presented) | Standalone natural-reveal screen | model-only | read | — | *(unregistered)* | — |
| QA-L07-339 | `s09-reveal-the-close` | **Je vais à la maison. Au revoir.** | (no English gloss presented) | Standalone natural-reveal screen | model-only | read | — | *(unregistered)* | — |
| QA-L07-342 | `s06-sayit-take-your-leave` | **Je vais à la maison. Au revoir.** | Close the moment and say where you're heading. *(instruction)* | The small gathering is ending. People are picking up their coats. Take your leave. | model-only | read | chunk-je-vais chunk-a-la-maison | *(unregistered)* | — |
| QA-L07-343 | `s06-sayit-take-your-leave` | **Merci. Je vais à la maison. Au revoir.** | Close the moment and say where you're heading. *(instruction)* | The small gathering is ending. People are picking up their coats. Take your leave. | model-only | read | chunk-je-vais chunk-a-la-maison | *(unregistered)* | — |

#### E. Accepted alternatives (1)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L07-333 | `s05-weave-close-the-moment` | **Je vais à la maison, au revoir.** | Say you're going home, then say goodbye. *(instruction)* | You're at the door. Close it the way you did before. | accepted-alternative | type | chunk-je-vais chunk-a-la-maison | *(unregistered)* | — |

#### C. Recognition-only surfaces (26)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L07-307 | `s01-meet-je-vais-a-la-maison` | à la maison | home | supported | read | chunk-a-la-maison | Highlighted chunk boundary inside the meet sentence |
| QA-L07-308 | `s01-meet-je-vais-a-la-maison` | je vais | I'm going | recognition | read | chunk-je-vais | Highlighted chunk boundary inside the meet sentence |
| QA-L07-309 | `s01-meet-je-vais-a-la-maison` | Je vais à la maison. | I'm going home. | supported | listen | chunk-je-vais chunk-a-la-maison | First contact / re-contact: Where you're heading. |
| QA-L07-316 | `s03-fill-je-vais-blank` | Je ___ à la maison. | (no English gloss presented) | recognition | read | chunk-je-vais | The French frame the blank sits in |
| QA-L07-317 | `s03-fill-je-vais-blank` | suis | (no English gloss presented) | recognition | choose | chunk-je-vais | Distractor — shown reason: Je suis says where you are. Je vais says where you're heading. |
| QA-L07-318 | `s03-fill-je-vais-blank` | vais | (no English gloss presented) | recognition | choose | chunk-je-vais | The option that completes the frame |
| QA-L07-319 | `s03-fill-je-vais-blank` | voudrais | (no English gloss presented) | recognition | choose | chunk-je-vais | Distractor — shown reason: Je voudrais asks for something. It doesn't take you anywhere. |
| QA-L07-324 | `s04-weave-heading-home` | à la maison | home | recognition | read | chunk-a-la-maison | Your meaning lands. The destination stays one piece: à la maison. |
| QA-L07-325 | `s04-weave-heading-home` | je vais | I'm going | recognition | read | chunk-je-vais | Start with je vais. That is the moving shape. |
| QA-L07-326 | `s04-weave-heading-home` | Je vais ___. | Say you're going home. | recognition | read | chunk-je-vais chunk-a-la-maison | Second hint rung — a shape to fill in |
| QA-L07-328 | `s08-fill-destination-package` | à la | (no English gloss presented) | recognition | choose | chunk-a-la-maison | Distractor — shown reason: À la opens the piece but never lands it. Keep it whole: à la maison. |
| QA-L07-329 | `s08-fill-destination-package` | à la maison | home | recognition | choose | chunk-a-la-maison | À la maison is one piece: home. Take it whole and it always fits. ⏐ Maison on its own is just the word for house. The piece travels with its little words: à la  |
| QA-L07-330 | `s08-fill-destination-package` | Je vais ___ . | (no English gloss presented) | recognition | read | chunk-a-la-maison | The French frame the blank sits in |
| QA-L07-331 | `s08-fill-destination-package` | maison | (no English gloss presented) | recognition | choose | chunk-a-la-maison | Distractor — shown reason: Maison on its own is just the word for house. The piece travels with its little words: à la maison. |
| QA-L07-334 | `s05-weave-close-the-moment` | à la maison | home | recognition | read | chunk-a-la-maison | Lead with je vais à la maison, then let au revoir close the door. |
| QA-L07-335 | `s05-weave-close-the-moment` | au revoir | goodbye | recognition | read | chunk-au-revoir | Lead with je vais à la maison, then let au revoir close the door. |
| QA-L07-336 | `s05-weave-close-the-moment` | je vais | I'm going | recognition | read | chunk-je-vais | Lead with je vais à la maison, then let au revoir close the door. |
| QA-L07-337 | `s05-weave-close-the-moment` | Je vais ___. Au revoir. | Say you're going home, then say goodbye. | recognition | read | chunk-je-vais chunk-a-la-maison | Second hint rung — a shape to fill in |
| QA-L07-344 | `s06-sayit-take-your-leave` | à la maison | home | recognition | read | chunk-a-la-maison | Both are natural. Merci thanks the moment; je vais à la maison says where you're off to; au revoir closes the door gently. |
| QA-L07-345 | `s06-sayit-take-your-leave` | au revoir | goodbye | recognition | read | chunk-au-revoir | Both are natural. Merci thanks the moment; je vais à la maison says where you're off to; au revoir closes the door gently. |
| QA-L07-346 | `s06-sayit-take-your-leave` | je vais | I'm going | recognition | read | chunk-je-vais | Both are natural. Merci thanks the moment; je vais à la maison says where you're off to; au revoir closes the door gently. |
| QA-L07-347 | `s06-sayit-take-your-leave` | merci | thank you | recognition | read | chunk-merci | Both are natural. Merci thanks the moment; je vais à la maison says where you're off to; au revoir closes the door gently. |
| QA-L07-348 | `s07-recap-heading-home` | à la maison | home | recycled | read | chunk-a-la-maison | Chip listed back as a piece the learner used |
| QA-L07-349 | `s07-recap-heading-home` | Au revoir | goodbye | recycled | read | chunk-au-revoir | Chip listed back as a piece the learner used |
| QA-L07-350 | `s07-recap-heading-home` | je vais | I'm going | recycled | read | chunk-je-vais | Je vais stayed one solid piece the whole way. |
| QA-L07-351 | `s07-recap-heading-home` | Merci | thank you | recycled | read | chunk-merci | Chip listed back as a piece the learner used |

#### F. French inside explanatory copy (12)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L07-305 | `s00-goal-je-vais` | à la maison | home | recognition | read | chunk-a-la-maison | Today: one new engine, je vais. By the end: you can close a moment and say you're heading home. Main pieces: je vais, à la maison. |
| QA-L07-306 | `s00-goal-je-vais` | je vais | I'm going | recognition | read | chunk-je-vais | Today: one new engine, je vais. By the end: you can close a moment and say you're heading home. Main pieces: je vais, à la maison. |
| QA-L07-310 | `s02-insight-je-vais-frozen` | à la maison | home | recognition | read | chunk-a-la-maison | Je vais = I'm going. Like je suis, it is one solid piece. À la maison is one piece too: home. No rules to learn yet. The pieces do the work. |
| QA-L07-311 | `s02-insight-je-vais-frozen` | je suis | I am | recognition | read | chunk-je-suis | Je vais = I'm going. Like je suis, it is one solid piece. À la maison is one piece too: home. No rules to learn yet. The pieces do the work. |
| QA-L07-312 | `s02-insight-je-vais-frozen` | je vais | I'm going | recognition | read | chunk-je-vais | Je vais = I'm going. Like je suis, it is one solid piece. À la maison is one piece too: home. No rules to learn yet. The pieces do the work. |
| QA-L07-313 | `s02-insight-je-vais-frozen` | Je vais à la maison. | I'm going home. | recognition | read | chunk-a-la-maison chunk-je-vais | Illustrative example inside "Take it whole." |
| QA-L07-314 | `s02-insight-je-vais-frozen` | Je vais. | I'm heading off. | recognition | read | chunk-je-vais | Illustrative example inside "Take it whole." |
| QA-L07-320 | `s03-fill-je-vais-blank` | je suis | I am | recognition | read | chunk-je-suis | Je suis says where you are. Je vais says where you're heading. |
| QA-L07-321 | `s03-fill-je-vais-blank` | je vais | I'm going | recognition | read | chunk-je-vais | Je vais = I'm going. The moving engine. ⏐ Je suis says where you are. Je vais says where you're heading. |
| QA-L07-322 | `s03-fill-je-vais-blank` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Je voudrais asks for something. It doesn't take you anywhere. |
| QA-L07-340 | `s10-insight-leaving-two-moves` | Au revoir. | Goodbye. | recognition | read | chunk-au-revoir | Illustrative example inside "Leaving is two small moves." |
| QA-L07-341 | `s10-insight-leaving-two-moves` | Je vais à la maison. | I'm going home. | recognition | read | chunk-a-la-maison chunk-je-vais | Illustrative example inside "Leaving is two small moves." |

#### Chunk inventory — L7 (6)

| Item ID | French | English | 1st seen | 1st targeted | 1st production | Role | Protected? | Evidence | Reused in | Treatment matches registry? | Founder | Human QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `chunk-a-la-maison` | à la maison | home | L7 | L7 | L7 | supported | protected (multi-word chunk) | evidence-bearing | L7 L10 | yes | | |
| `chunk-au-revoir` | au revoir | goodbye | L6 | L6 | L6 | active | protected (multi-word chunk) | evidence-bearing | L6 L7 L9 L10 | yes | | |
| `chunk-je-suis` | je suis | I am | L1 | L2 | L2 | active | protected (multi-word chunk) | evidence-bearing | L1 L2 L3 L4 L6 L7 L10 | not declared in this lesson | | |
| `chunk-je-vais` | je vais | I'm going | L7 | L7 | L7 | active | protected (multi-word chunk) | evidence-bearing | L7 L9 L10 | yes | | |
| `chunk-je-voudrais` | je voudrais | I would like | L1 | L1 | L1 | active | protected (multi-word chunk) | evidence-bearing | L1 L2 L3 L4 L5 L7 L9 L10 | not declared in this lesson | | |
| `chunk-merci` | merci | thank you | L1 | L1 | L1 | active | protected (single-token chunk) | evidence-bearing | L1 L3 L6 L7 L9 L10 | yes | | |

---

### L8 — C'est où ?

*Ask where something is, and answer it's here.*

`v1-lesson-008` · 11 screens · 46 rows · prerequisites: `v1-lesson-007`

#### A. Production sentences — typed, assembled or freely produced (2)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L08-363 | `s04-weave-ask-where` | **C'est où ?** | Ask where it is. *(instruction)* | You're looking for the room. Someone friendly is standing nearby. | supported | type | chunk-c-est-ou adverb-ou-where | *(unregistered)* | C'est où \| c'est où |
| QA-L08-381 | `s05-weave-answer-here` | **C'est ici.** | Tell them: it's here. *(instruction)* | Now you're the local. Someone asks you C'est où ? And you're standing right at the door. | supported | type | chunk-c-est | *(unregistered)* | — |

#### B. Model and reveal sentences (6)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L08-357 | `s03-fill-c-est-blank` | **C'est où ?** | (no English gloss presented) | You need a room and cannot see it. Which word asks? | model-only | read | chunk-c-est-ou | *(unregistered)* | — |
| QA-L08-376 | `s09-fill-which-side` | **C'est ici.** | (no English gloss presented) | Someone asks you where it is. You are standing at the door. Which word answers? | model-only | read | chunk-c-est word-ici | *(unregistered)* | — |
| QA-L08-385 | `s10-reveal-both-sides` | **C'est où ? C'est ici.** | (no English gloss presented) | Standalone natural-reveal screen | model-only | read | — | *(unregistered)* | — |
| QA-L08-386 | `s10-reveal-both-sides` | **Le café, c'est où ?** | (no English gloss presented) | Standalone natural-reveal screen | model-only | read | — | *(unregistered)* | — |
| QA-L08-388 | `s06-sayit-find-the-room` | **Bonjour, c'est où ?** | Open politely, then ask where it is. *(instruction)* | A hallway with three doors, no signs. Someone comes out of one of them. Find your room. | model-only | read | chunk-c-est-ou | *(unregistered)* | — |
| QA-L08-389 | `s06-sayit-find-the-room` | **C'est où ?** | Open politely, then ask where it is. *(instruction)* | A hallway with three doors, no signs. Someone comes out of one of them. Find your room. | model-only | read | chunk-c-est-ou | *(unregistered)* | — |

#### E. Accepted alternatives (2)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L08-364 | `s04-weave-ask-where` | **c'est où** | Ask where it is. *(instruction)* | You're looking for the room. Someone friendly is standing nearby. | accepted-alternative | type | chunk-c-est-ou adverb-ou-where | *(unregistered)* | — |
| QA-L08-365 | `s04-weave-ask-where` | **C'est où** | Ask where it is. *(instruction)* | You're looking for the room. Someone friendly is standing nearby. | accepted-alternative | type | chunk-c-est-ou adverb-ou-where | *(unregistered)* | — |

#### C. Recognition-only surfaces (27)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L08-354 | `s01-meet-c-est-ou` | c'est | it is / that is | supported | read | chunk-c-est | Highlighted chunk boundary inside the meet sentence |
| QA-L08-355 | `s01-meet-c-est-ou` | C'est où ? | Where is it? | supported | listen | chunk-c-est-ou adverb-ou-where | First contact / re-contact: Two words. One question. |
| QA-L08-356 | `s01-meet-c-est-ou` | où | where | supported | read | adverb-ou-where | Highlighted chunk boundary inside the meet sentence |
| QA-L08-358 | `s03-fill-c-est-blank` | C'est ___ ? | (no English gloss presented) | recognition | read | adverb-ou-where chunk-c-est-ou | The French frame the blank sits in |
| QA-L08-359 | `s03-fill-c-est-blank` | ici | here | recognition | choose | word-ici | Ici answers the question. It says here. It cannot ask where. |
| QA-L08-360 | `s03-fill-c-est-blank` | où | where | recognition | choose | adverb-ou-where | The option that completes the frame |
| QA-L08-361 | `s03-fill-c-est-blank` | oui | yes | recognition | choose | chunk-oui | Oui says yes. It cannot ask anything. |
| QA-L08-366 | `s04-weave-ask-where` | c'est | it is / that is | recognition | read | chunk-c-est | Où is the word that asks. Put it after c'est. |
| QA-L08-367 | `s04-weave-ask-where` | C'est ___ ? | Ask where it is. | recognition | read | chunk-c-est-ou adverb-ou-where | Second hint rung — a shape to fill in |
| QA-L08-368 | `s04-weave-ask-where` | où | where | recognition | read | adverb-ou-where | Support piece shown as "where" |
| QA-L08-373 | `s08-meet-c-est-ici` | c'est | it is / that is | supported | read | chunk-c-est | Highlighted chunk boundary inside the meet sentence |
| QA-L08-374 | `s08-meet-c-est-ici` | C'est ici. | It's here. | supported | listen | chunk-c-est | First contact / re-contact: The other side of the question. |
| QA-L08-375 | `s08-meet-c-est-ici` | ici | here | recognition | read | word-ici | Highlighted chunk boundary inside the meet sentence |
| QA-L08-377 | `s09-fill-which-side` | C'est ___ . | (no English gloss presented) | recognition | read | chunk-c-est | The French frame the blank sits in |
| QA-L08-378 | `s09-fill-which-side` | ici | here | recognition | choose | word-ici | Ici = here. It lands the answer where you are standing. |
| QA-L08-379 | `s09-fill-which-side` | où | where | recognition | choose | adverb-ou-where | Distractor — shown reason: Où asks the question. Using it here would hand the question back instead of answering it. |
| QA-L08-380 | `s09-fill-which-side` | oui | yes | recognition | choose | chunk-oui | Oui says yes. Nobody asked a yes or no question. |
| QA-L08-382 | `s05-weave-answer-here` | c'est | it is / that is | recognition | read | chunk-c-est | Your meaning lands. Spoken French answers just as short: C'est ici. ⏐ C'est carries the answer. Ici lands it. |
| QA-L08-383 | `s05-weave-answer-here` | C'est ___. | Tell them: it's here. | recognition | read | chunk-c-est | Second hint rung — a shape to fill in |
| QA-L08-384 | `s05-weave-answer-here` | ici | here | recognition | read | word-ici | Your meaning lands. Spoken French answers just as short: C'est ici. ⏐ C'est carries the answer. Ici lands it. |
| QA-L08-390 | `s06-sayit-find-the-room` | bonjour | Hello | recognition | read | chunk-bonjour | Support piece for the open task |
| QA-L08-391 | `s06-sayit-find-the-room` | c'est | it is / that is | recognition | read | chunk-c-est | Support piece for the open task |
| QA-L08-392 | `s06-sayit-find-the-room` | où | where | recognition | read | adverb-ou-where | Support piece for the open task |
| QA-L08-394 | `s07-recap-ou` | Bonjour | Hello | recycled | read | chunk-bonjour | Chip listed back as a piece the learner used |
| QA-L08-395 | `s07-recap-ou` | c'est | it is / that is | recycled | read | chunk-c-est | Chip listed back as a piece the learner used |
| QA-L08-396 | `s07-recap-ou` | ici | here | recycled | read | word-ici | Chip listed back as a piece the learner used |
| QA-L08-397 | `s07-recap-ou` | où | where | recycled | read | adverb-ou-where | Chip listed back as a piece the learner used |

#### F. French inside explanatory copy (9)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L08-352 | `s00-goal-ou` | c'est où ? | where is it? | recognition | read | chunk-c-est-ou | Today: the smallest useful question, c'est où ? By the end: you can ask where something is, and answer. Main pieces: où, c'est, ici. |
| QA-L08-353 | `s00-goal-ou` | ici | here | recognition | read | word-ici | Today: the smallest useful question, c'est où ? By the end: you can ask where something is, and answer. Main pieces: où, c'est, ici. |
| QA-L08-362 | `s03-fill-c-est-blank` | c'est | it is / that is | recognition | read | chunk-c-est | Où = where. It turns c'est into a question. |
| QA-L08-369 | `s04-weave-ask-where` | c'est où ? | where is it? | recognition | read | chunk-c-est-ou | Your meaning lands. Spoken French keeps it this short: C'est où ? |
| QA-L08-370 | `s02-insight-ou-frozen` | c'est où ? | where is it? | recognition | read | chunk-c-est-ou | Où = where. Spoken French loves this shape: C'est où ? Literally, "it's where?". You already own c'est. Take the question whole. |
| QA-L08-371 | `s02-insight-ou-frozen` | C'est où ? | Where is it? | recognition | read | chunk-c-est-ou | Illustrative example inside "It's... where?" |
| QA-L08-372 | `s02-insight-ou-frozen` | Le café, c'est où ? | The café, where is it? | recognition | read | chunk-c-est-ou noun-cafe | Illustrative example inside "It's... where?" |
| QA-L08-387 | `s10-reveal-both-sides` | ici | here | recognition | read | word-ici | The same two words do both jobs. Où turns it into a question; ici answers it. Put a name in front and you can ask about anything you can point at. |
| QA-L08-393 | `s06-sayit-find-the-room` | Bonjour | Hello | recognition | read | chunk-bonjour | Both work. Bonjour opens the moment first. The greeting habit, still carrying you. |

#### Chunk inventory — L8 (7)

| Item ID | French | English | 1st seen | 1st targeted | 1st production | Role | Protected? | Evidence | Reused in | Treatment matches registry? | Founder | Human QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `adverb-ou-where` | où | where | L8 | L8 | L8 | supported | splittable / atomic | evidence-bearing | L8 L10 | yes | | |
| `chunk-bonjour` | Bonjour | Hello | L1 | L1 | L1 | active | protected (single-token chunk) | evidence-bearing | L1 L2 L3 L4 L6 L8 L10 | yes | | |
| `chunk-c-est` | c'est | it is / that is | L3 | L3 | L3 | supported | protected (single-token chunk) | evidence-bearing | L3 L8 L10 | yes | | |
| `chunk-c-est-ou` | c'est où ? | where is it? | L8 | L8 | L8 | active | protected (multi-word chunk) | evidence-bearing | L8 L10 | yes | | |
| `chunk-oui` | oui | yes | L3 | L3 | never | recognition (seen, never produced) | protected (single-token chunk) | not evidence-bearing | L3 L8 | not declared in this lesson | | |
| `noun-cafe` | café | coffee | L1 | L1 | L1 | active | splittable / atomic | evidence-bearing | L1 L5 L8 | not declared in this lesson | | |
| `word-ici` | ici | here | L2 | never targeted | never | supported | splittable / atomic | not evidence-bearing | L2 L3 L4 L6 L8 | not declared in this lesson | | |

---

### L9 — Faire une pause

*Ask for a break, politely, in French.*

`v1-lesson-009` · 11 screens · 48 rows · prerequisites: `v1-lesson-008`

#### A. Production sentences — typed, assembled or freely produced (2)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L09-415 | `s04-weave-ask-for-a-break` | **Je voudrais faire une pause.** | Say you'd like to take a break. *(instruction)* | The afternoon has been long, and your head is getting heavy. | active-new | type | chunk-faire-une-pause chunk-je-voudrais | *(unregistered)* | — |
| QA-L09-427 | `s05-weave-break-politely` | **Je voudrais faire une pause, s'il vous plaît.** | Ask for a break politely: say you'd like to take a pause, please. *(instruction)* | You're working through something together. It's a good moment to ask. | active-new | type | chunk-faire-une-pause | *(unregistered)* | Je voudrais faire une pause s'il vous plaît. |

#### B. Model and reveal sentences (6)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L09-403 | `s03-fill-faire-blank` | **Je voudrais faire une pause.** | (no English gloss presented) | You want to ask for a break. Which word carries the action? | model-only | read | chunk-faire-une-pause chunk-je-voudrais | *(unregistered)* | — |
| QA-L09-419 | `s09-reveal-first-ask` | **Je voudrais faire une pause.** | (no English gloss presented) | Standalone natural-reveal screen | model-only | read | — | *(unregistered)* | — |
| QA-L09-420 | `s09-reveal-first-ask` | **Je voudrais une pause.** | (no English gloss presented) | Standalone natural-reveal screen | model-only | read | — | *(unregistered)* | — |
| QA-L09-422 | `s08-fill-softener` | **Je voudrais faire une pause, s'il vous plaît.** | (no English gloss presented) | You are asking for something, not thanking anyone. Which piece softens the ask? | model-only | read | chunk-sil-vous-plait chunk-faire-une-pause chunk-je-voudrais | *(unregistered)* | — |
| QA-L09-437 | `s06-sayit-long-afternoon` | **Je voudrais faire une pause, s'il vous plaît.** | Ask for a break, politely. *(instruction)* | The afternoon session has run long. Someone asks if you want to keep going. | model-only | read | chunk-faire-une-pause | *(unregistered)* | — |
| QA-L09-438 | `s06-sayit-long-afternoon` | **Je voudrais faire une pause.** | Ask for a break, politely. *(instruction)* | The afternoon session has run long. Someone asks if you want to keep going. | model-only | read | chunk-faire-une-pause | *(unregistered)* | — |

#### E. Accepted alternatives (1)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L09-428 | `s05-weave-break-politely` | **Je voudrais faire une pause s'il vous plaît.** | Ask for a break politely: say you'd like to take a pause, please. *(instruction)* | You're working through something together. It's a good moment to ask. | accepted-alternative | type | chunk-faire-une-pause | *(unregistered)* | — |

#### C. Recognition-only surfaces (25)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L09-400 | `s01-meet-faire-une-pause` | faire une pause | to take a break | recognition | read | chunk-faire-une-pause | Highlighted chunk boundary inside the meet sentence |
| QA-L09-401 | `s01-meet-faire-une-pause` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Highlighted chunk boundary inside the meet sentence |
| QA-L09-402 | `s01-meet-faire-une-pause` | Je voudrais faire une pause. | I'd like to take a break. | active-new | listen | chunk-faire-une-pause chunk-je-voudrais | First contact / re-contact: Rest, said politely. |
| QA-L09-404 | `s03-fill-faire-blank` | faire | (no English gloss presented) | recognition | choose | chunk-faire-une-pause | The option that completes the frame |
| QA-L09-405 | `s03-fill-faire-blank` | Je voudrais ___ une pause. | (no English gloss presented) | recognition | read | chunk-faire-une-pause | The French frame the blank sits in |
| QA-L09-406 | `s03-fill-faire-blank` | suis | (no English gloss presented) | recognition | choose | chunk-faire-une-pause | Distractor — shown reason: Suis says what you are. It cannot take a pause for you. |
| QA-L09-407 | `s03-fill-faire-blank` | vais | (no English gloss presented) | recognition | choose | chunk-faire-une-pause | Distractor — shown reason: Je vais moves you somewhere. After je voudrais, the action keeps its dictionary shape: faire. |
| QA-L09-416 | `s04-weave-ask-for-a-break` | faire une pause | to take a break | recognition | read | chunk-faire-une-pause | Your meaning lands. The action stays whole: faire une pause. ⏐ Start with je voudrais. Then hand it the action: faire une pause. |
| QA-L09-417 | `s04-weave-ask-for-a-break` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Start with je voudrais. Then hand it the action: faire une pause. |
| QA-L09-418 | `s04-weave-ask-for-a-break` | Je voudrais ___. | Say you'd like to take a break. | recognition | read | chunk-faire-une-pause chunk-je-voudrais | Second hint rung — a shape to fill in |
| QA-L09-423 | `s08-fill-softener` | au revoir | goodbye | recognition | choose | chunk-au-revoir | Au revoir closes the moment. Here you are still in it, asking. |
| QA-L09-424 | `s08-fill-softener` | Je voudrais faire une pause, ___ . | (no English gloss presented) | recognition | read | chunk-sil-vous-plait | The French frame the blank sits in |
| QA-L09-425 | `s08-fill-softener` | merci | thank you | recognition | choose | chunk-merci | Merci thanks someone after they help. It cannot soften the asking itself. |
| QA-L09-426 | `s08-fill-softener` | s'il vous plaît | please (formal) | recognition | choose | chunk-sil-vous-plait | S'il vous plaît softens a request. It costs nothing and changes the tone. |
| QA-L09-429 | `s05-weave-break-politely` | faire une pause | to take a break | recognition | read | chunk-faire-une-pause | Support piece shown as "to take a break" |
| QA-L09-430 | `s05-weave-break-politely` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Support piece shown as "I would like" |
| QA-L09-431 | `s05-weave-break-politely` | Je voudrais ___, s'il vous plaît. | Ask for a break politely: say you'd like to take a pause, please. | recognition | read | chunk-faire-une-pause | Second hint rung — a shape to fill in |
| QA-L09-432 | `s05-weave-break-politely` | s'il vous plaît | please (formal) | recognition | read | chunk-sil-vous-plait | Keep the sentence you had and let s'il vous plaît soften it. |
| QA-L09-439 | `s06-sayit-long-afternoon` | faire une pause | to take a break | recognition | read | chunk-faire-une-pause | Support piece for the open task |
| QA-L09-440 | `s06-sayit-long-afternoon` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Support piece for the open task |
| QA-L09-441 | `s06-sayit-long-afternoon` | s'il vous plaît | please (formal) | recognition | read | chunk-sil-vous-plait | Both are natural. S'il vous plaît softens the ask; the shorter form works when the moment is already gentle. |
| QA-L09-442 | `s07-recap-pause` | faire une pause | to take a break | recycled | read | chunk-faire-une-pause | Faire une pause stayed one piece. The rest of faire can wait. |
| QA-L09-443 | `s07-recap-pause` | je voudrais | I would like | recycled | read | chunk-je-voudrais | Je voudrais carried an action for the first time, not just a thing. |
| QA-L09-444 | `s07-recap-pause` | s'il vous plaît | please (formal) | recycled | read | chunk-sil-vous-plait | Chip listed back as a piece the learner used |
| QA-L09-445 | `s07-recap-pause` | une pause | (no English gloss presented) | recycled | read | — | Chip listed back as a piece the learner used |

#### F. French inside explanatory copy (14)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L09-398 | `s00-goal-pause` | faire une pause | to take a break | recognition | read | chunk-faire-une-pause | Today: one small action, faire une pause. By the end: you can ask for a break, politely. Main pieces: faire une pause, une pause, je voudrais. |
| QA-L09-399 | `s00-goal-pause` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Today: one small action, faire une pause. By the end: you can ask for a break, politely. Main pieces: faire une pause, une pause, je voudrais. |
| QA-L09-408 | `s03-fill-faire-blank` | faire une pause | to take a break | recognition | read | chunk-faire-une-pause | Faire une pause = take a break. One package, carried by je voudrais. |
| QA-L09-409 | `s03-fill-faire-blank` | je vais | I'm going | recognition | read | chunk-je-vais | Je vais moves you somewhere. After je voudrais, the action keeps its dictionary shape: faire. |
| QA-L09-410 | `s03-fill-faire-blank` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Faire une pause = take a break. One package, carried by je voudrais. ⏐ Je vais moves you somewhere. After je voudrais, the action keeps its dictionary shape: fa |
| QA-L09-411 | `s02-insight-voudrais-carries-actions` | faire une pause | to take a break | recognition | read | chunk-faire-une-pause | Until now, je voudrais asked for a thing. It can also carry a small action: faire une pause. Take faire une pause as one piece. The wider faire universe waits. |
| QA-L09-412 | `s02-insight-voudrais-carries-actions` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Until now, je voudrais asked for a thing. It can also carry a small action: faire une pause. Take faire une pause as one piece. The wider faire universe waits. |
| QA-L09-413 | `s02-insight-voudrais-carries-actions` | Je voudrais faire une pause. | I'd like to take a break. (an action) | recognition | read | chunk-faire-une-pause chunk-je-voudrais | Illustrative example inside "Same engine, a new job." |
| QA-L09-414 | `s02-insight-voudrais-carries-actions` | Je voudrais une pause. | I'd like a break. (a thing) | recognition | read | chunk-je-voudrais noun-pause | Illustrative example inside "Same engine, a new job." |
| QA-L09-421 | `s09-reveal-first-ask` | faire une pause | to take a break | recognition | read | chunk-faire-une-pause | Both are natural. Faire une pause names the act of taking a break; une pause names the break itself. The engine in front does not change. |
| QA-L09-433 | `s10-insight-what-you-can-ask` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Je voudrais now carries a thing or an action, and s'il vous plaît softens either one. That is enough to ask for most small things politely, without knowing a si |
| QA-L09-434 | `s10-insight-what-you-can-ask` | Je voudrais faire une pause. | I'd like to take a break. | recognition | read | chunk-faire-une-pause chunk-je-voudrais | Illustrative example inside "One engine, plenty to ask for." |
| QA-L09-435 | `s10-insight-what-you-can-ask` | Je voudrais un café. | I'd like a coffee. | recognition | read | chunk-je-voudrais chunk-un-cafe | Illustrative example inside "One engine, plenty to ask for." |
| QA-L09-436 | `s10-insight-what-you-can-ask` | s'il vous plaît | please (formal) | recognition | read | chunk-sil-vous-plait | Je voudrais now carries a thing or an action, and s'il vous plaît softens either one. That is enough to ask for most small things politely, without knowing a si |

#### Chunk inventory — L9 (8)

| Item ID | French | English | 1st seen | 1st targeted | 1st production | Role | Protected? | Evidence | Reused in | Treatment matches registry? | Founder | Human QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `chunk-au-revoir` | au revoir | goodbye | L6 | L6 | L6 | active | protected (multi-word chunk) | evidence-bearing | L6 L7 L9 L10 | not declared in this lesson | | |
| `chunk-faire-une-pause` | faire une pause | to take a break | L9 | L9 | L9 | active | protected (multi-word chunk) | evidence-bearing | L9 L10 | yes | | |
| `chunk-je-vais` | je vais | I'm going | L7 | L7 | L7 | active | protected (multi-word chunk) | evidence-bearing | L7 L9 L10 | not declared in this lesson | | |
| `chunk-je-voudrais` | je voudrais | I would like | L1 | L1 | L1 | active | protected (multi-word chunk) | evidence-bearing | L1 L2 L3 L4 L5 L7 L9 L10 | yes | | |
| `chunk-merci` | merci | thank you | L1 | L1 | L1 | active | protected (single-token chunk) | evidence-bearing | L1 L3 L6 L7 L9 L10 | not declared in this lesson | | |
| `chunk-sil-vous-plait` | s'il vous plaît | please (formal) | L1 | L1 | L1 | active | protected (multi-word chunk) | evidence-bearing | L1 L9 L10 | yes | | |
| `chunk-un-cafe` | un café | a coffee | L1 | L5 | L5 | active | protected (multi-word chunk) | evidence-bearing | L1 L5 L9 | not declared in this lesson | | |
| `noun-pause` | pause | a break | L9 | never targeted | never | supported | splittable / atomic | not evidence-bearing | L9 | yes | | |

---

### L10 — Une petite journée

*Arrive, ask where, take a break, and leave.*

`v1-lesson-010` · 11 screens · 63 rows · prerequisites: `v1-lesson-009`

#### A. Production sentences — typed, assembled or freely produced (3)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L10-453 | `s02-weave-arrive-ask-where` | **Bonjour. C'est où ?** | Open politely, then ask where it is. *(instruction)* | Morning. Your first time in this building, and the room you need is not where you expected. | supported | type | chunk-c-est-ou adverb-ou-where | *(unregistered)* | Bonjour, c'est où ? \| Bonjour, c'est où |
| QA-L10-477 | `s04-weave-midday-break` | **Je voudrais faire une pause.** | Say you'd like to take a break. *(instruction)* | Midday. You've been on your feet since you arrived, and someone asks how you're doing. | recycled | type | chunk-faire-une-pause chunk-je-voudrais | *(unregistered)* | Je voudrais faire une pause, s'il vous plaît. |
| QA-L10-488 | `s05-weave-close-the-day` | **Je vais à la maison. Au revoir.** | Evening. Say you're going home, then say goodbye. *(instruction)* | The day at the new place is done. People are still talking, but you're finished. | supported | type | chunk-je-vais chunk-a-la-maison | *(unregistered)* | Je vais à la maison, au revoir. |

#### B. Model and reveal sentences (5)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L10-462 | `s03-fill-engine-chooser` | **Je vais à la maison.** | (no English gloss presented) | You want to say you're going home. Which word moves you? | model-only | read | chunk-a-la-maison chunk-je-vais | *(unregistered)* | — |
| QA-L10-482 | `s10-reveal-midday-break` | **Je voudrais faire une pause, s'il vous plaît.** | (no English gloss presented) | Standalone natural-reveal screen | model-only | read | — | *(unregistered)* | — |
| QA-L10-483 | `s10-reveal-midday-break` | **Je voudrais faire une pause.** | (no English gloss presented) | Standalone natural-reveal screen | model-only | read | — | *(unregistered)* | — |
| QA-L10-495 | `s07-sayit-take-your-leave` | **Je vais à la maison. Au revoir.** | Take your leave warmly: thanks, direction, goodbye. *(instruction)* | The end of your first full day at the new place. Someone walks you to the door. | model-only | read | chunk-je-vais chunk-a-la-maison | *(unregistered)* | — |
| QA-L10-496 | `s07-sayit-take-your-leave` | **Merci. Je vais à la maison. Au revoir.** | Take your leave warmly: thanks, direction, goodbye. *(instruction)* | The end of your first full day at the new place. Someone walks you to the door. | model-only | read | chunk-je-vais chunk-a-la-maison | *(unregistered)* | — |

#### E. Accepted alternatives (4)

| Row | Screen | French | English shown | Scene | Role | Action | Items | Sentence ID | Accepted alternatives |
|---|---|---|---|---|---|---|---|---|---|
| QA-L10-454 | `s02-weave-arrive-ask-where` | **Bonjour, c'est où** | Open politely, then ask where it is. *(instruction)* | Morning. Your first time in this building, and the room you need is not where you expected. | accepted-alternative | type | chunk-c-est-ou adverb-ou-where | *(unregistered)* | — |
| QA-L10-455 | `s02-weave-arrive-ask-where` | **Bonjour, c'est où ?** | Open politely, then ask where it is. *(instruction)* | Morning. Your first time in this building, and the room you need is not where you expected. | accepted-alternative | type | chunk-c-est-ou adverb-ou-where | *(unregistered)* | — |
| QA-L10-478 | `s04-weave-midday-break` | **Je voudrais faire une pause, s'il vous plaît.** | Say you'd like to take a break. *(instruction)* | Midday. You've been on your feet since you arrived, and someone asks how you're doing. | accepted-alternative | type | chunk-faire-une-pause chunk-je-voudrais | *(unregistered)* | — |
| QA-L10-489 | `s05-weave-close-the-day` | **Je vais à la maison, au revoir.** | Evening. Say you're going home, then say goodbye. *(instruction)* | The day at the new place is done. People are still talking, but you're finished. | accepted-alternative | type | chunk-je-vais chunk-a-la-maison | *(unregistered)* | — |

#### C. Recognition-only surfaces (34)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L10-449 | `s09-meet-morning-arrival` | Bonjour | Hello | recognition | read | chunk-bonjour | Highlighted chunk boundary inside the meet sentence |
| QA-L10-450 | `s09-meet-morning-arrival` | Bonjour. C'est où ? | Hello. Where is it? | recycled | listen | chunk-bonjour chunk-c-est-ou | First contact / re-contact: The day starts at a door. |
| QA-L10-451 | `s09-meet-morning-arrival` | C'est | it is / that is | supported | read | chunk-c-est | Highlighted chunk boundary inside the meet sentence |
| QA-L10-452 | `s09-meet-morning-arrival` | où | where | supported | read | adverb-ou-where | Highlighted chunk boundary inside the meet sentence |
| QA-L10-456 | `s02-weave-arrive-ask-where` | bonjour | Hello | recognition | read | chunk-bonjour | Support piece shown as "hello" |
| QA-L10-457 | `s02-weave-arrive-ask-where` | Bonjour. ___ ? | Open politely, then ask where it is. | recognition | read | chunk-c-est-ou adverb-ou-where | Second hint rung — a shape to fill in |
| QA-L10-458 | `s02-weave-arrive-ask-where` | c'est | it is / that is | recognition | read | chunk-c-est | Start with bonjour, then let c'est où do the asking. |
| QA-L10-459 | `s02-weave-arrive-ask-where` | où | where | recognition | read | adverb-ou-where | Support piece shown as "where" |
| QA-L10-463 | `s03-fill-engine-chooser` | Je ___ à la maison. | (no English gloss presented) | recognition | read | chunk-je-vais | The French frame the blank sits in |
| QA-L10-464 | `s03-fill-engine-chooser` | suis | (no English gloss presented) | recognition | choose | chunk-je-vais | Distractor — shown reason: Je suis à la maison says you are already there. You want the moving engine: je vais. |
| QA-L10-465 | `s03-fill-engine-chooser` | vais | (no English gloss presented) | recognition | choose | chunk-je-vais | The option that completes the frame |
| QA-L10-466 | `s03-fill-engine-chooser` | voudrais | (no English gloss presented) | recognition | choose | chunk-je-vais | Distractor — shown reason: Je voudrais wishes for something. It cannot take you home by itself. |
| QA-L10-479 | `s04-weave-midday-break` | faire une pause | to take a break | recognition | read | chunk-faire-une-pause | Start with je voudrais. Then hand it the action: faire une pause. |
| QA-L10-480 | `s04-weave-midday-break` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Start with je voudrais. Then hand it the action: faire une pause. |
| QA-L10-481 | `s04-weave-midday-break` | Je voudrais ___. | Say you'd like to take a break. | recognition | read | chunk-faire-une-pause chunk-je-voudrais | Second hint rung — a shape to fill in |
| QA-L10-485 | `s06-meet-preview-help` | m'aider | to help me | supported | read | chunk-m-aider | Highlighted chunk boundary inside the meet sentence |
| QA-L10-486 | `s06-meet-preview-help` | vous pouvez | you can | supported | read | chunk-vous-pouvez | Highlighted chunk boundary inside the meet sentence |
| QA-L10-487 | `s06-meet-preview-help` | Vous pouvez m'aider ? | Can you help me? | supported | listen | chunk-vous-pouvez chunk-m-aider | First contact / re-contact: Just listen. This one arrives next. |
| QA-L10-490 | `s05-weave-close-the-day` | à la maison | home | recognition | read | chunk-a-la-maison | Lead with je vais à la maison, then let au revoir close the door. |
| QA-L10-491 | `s05-weave-close-the-day` | au revoir | goodbye | recognition | read | chunk-au-revoir | Lead with je vais à la maison, then let au revoir close the door. |
| QA-L10-492 | `s05-weave-close-the-day` | je vais | I'm going | recognition | read | chunk-je-vais | Lead with je vais à la maison, then let au revoir close the door. |
| QA-L10-493 | `s05-weave-close-the-day` | Je vais ___. Au revoir. | Evening. Say you're going home, then say goodbye. | recognition | read | chunk-je-vais chunk-a-la-maison | Second hint rung — a shape to fill in |
| QA-L10-497 | `s07-sayit-take-your-leave` | à la maison | home | recognition | read | chunk-a-la-maison | Both are natural. Merci thanks the day; je vais à la maison says where you're off to; au revoir closes it gently. |
| QA-L10-498 | `s07-sayit-take-your-leave` | au revoir | goodbye | recognition | read | chunk-au-revoir | Both are natural. Merci thanks the day; je vais à la maison says where you're off to; au revoir closes it gently. |
| QA-L10-499 | `s07-sayit-take-your-leave` | je vais | I'm going | recognition | read | chunk-je-vais | Both are natural. Merci thanks the day; je vais à la maison says where you're off to; au revoir closes it gently. |
| QA-L10-500 | `s07-sayit-take-your-leave` | merci | thank you | recognition | read | chunk-merci | Both are natural. Merci thanks the day; je vais à la maison says where you're off to; au revoir closes it gently. |
| QA-L10-501 | `s08-recap-full-day` | à la maison | home | recycled | read | chunk-a-la-maison | Chip listed back as a piece the learner used |
| QA-L10-502 | `s08-recap-full-day` | au revoir | goodbye | recycled | read | chunk-au-revoir | Chip listed back as a piece the learner used |
| QA-L10-503 | `s08-recap-full-day` | bonjour | Hello | recycled | read | chunk-bonjour | Chip listed back as a piece the learner used |
| QA-L10-504 | `s08-recap-full-day` | c'est | it is / that is | recycled | read | chunk-c-est | Chip listed back as a piece the learner used |
| QA-L10-505 | `s08-recap-full-day` | faire une pause | to take a break | recycled | read | chunk-faire-une-pause | Chip listed back as a piece the learner used |
| QA-L10-506 | `s08-recap-full-day` | je vais | I'm going | recycled | read | chunk-je-vais | Chip listed back as a piece the learner used |
| QA-L10-507 | `s08-recap-full-day` | je voudrais | I would like | recycled | read | chunk-je-voudrais | Chip listed back as a piece the learner used |
| QA-L10-508 | `s08-recap-full-day` | où | where | recycled | read | adverb-ou-where | Chip listed back as a piece the learner used |

#### F. French inside explanatory copy (17)

| Row | Screen | French | English shown | Role | Action | Items | Where it appears |
|---|---|---|---|---|---|---|---|
| QA-L10-446 | `s00-goal-integration` | c'est | it is / that is | recognition | read | chunk-c-est | Today: nothing new. By the end: you'll have lived a whole small day in French, from pieces you already own. Main pieces: c'est où, faire une pause, je vais. |
| QA-L10-447 | `s00-goal-integration` | faire une pause | to take a break | recognition | read | chunk-faire-une-pause | Today: nothing new. By the end: you'll have lived a whole small day in French, from pieces you already own. Main pieces: c'est où, faire une pause, je vais. |
| QA-L10-448 | `s00-goal-integration` | je vais | I'm going | recognition | read | chunk-je-vais | Today: nothing new. By the end: you'll have lived a whole small day in French, from pieces you already own. Main pieces: c'est où, faire une pause, je vais. |
| QA-L10-460 | `s02-weave-arrive-ask-where` | Bonjour | Hello | recognition | read | chunk-bonjour | Right. Bonjour first buys you the answer. ⏐ Your meaning lands. A native opens the moment first: Bonjour. C'est où ? ⏐ Start with bonjour, then let c'est où do  |
| QA-L10-461 | `s02-weave-arrive-ask-where` | c'est où ? | where is it? | recognition | read | chunk-c-est-ou | Your meaning lands. A native opens the moment first: Bonjour. C'est où ? |
| QA-L10-467 | `s03-fill-engine-chooser` | à la maison | home | recognition | read | chunk-a-la-maison | Je suis à la maison says you are already there. You want the moving engine: je vais. |
| QA-L10-468 | `s03-fill-engine-chooser` | je suis | I am | recognition | read | chunk-je-suis | Je suis à la maison says you are already there. You want the moving engine: je vais. |
| QA-L10-469 | `s03-fill-engine-chooser` | je vais | I'm going | recognition | read | chunk-je-vais | Three engines, one job each. Moving somewhere is je vais. ⏐ Je suis à la maison says you are already there. You want the moving engine: je vais. |
| QA-L10-470 | `s03-fill-engine-chooser` | je voudrais | I would like | recognition | read | chunk-je-voudrais | Je voudrais wishes for something. It cannot take you home by itself. |
| QA-L10-471 | `s01-insight-three-engines` | je suis | I am | recognition | read | chunk-je-suis | You now carry three small engines. Je suis says what or where you are. Je voudrais asks for things and actions. Je vais moves you. Today they take turns. |
| QA-L10-472 | `s01-insight-three-engines` | Je suis ici. | I'm here. (being) | recognition | read | chunk-je-suis-ici | Illustrative example inside "Three engines, three jobs." |
| QA-L10-473 | `s01-insight-three-engines` | je vais | I'm going | recognition | read | chunk-je-vais | You now carry three small engines. Je suis says what or where you are. Je voudrais asks for things and actions. Je vais moves you. Today they take turns. |
| QA-L10-474 | `s01-insight-three-engines` | Je vais à la maison. | I'm going home. (moving) | recognition | read | chunk-a-la-maison chunk-je-vais | Illustrative example inside "Three engines, three jobs." |
| QA-L10-475 | `s01-insight-three-engines` | je voudrais | I would like | recognition | read | chunk-je-voudrais | You now carry three small engines. Je suis says what or where you are. Je voudrais asks for things and actions. Je vais moves you. Today they take turns. |
| QA-L10-476 | `s01-insight-three-engines` | Je voudrais faire une pause. | I'd like to take a break. (asking) | recognition | read | chunk-faire-une-pause chunk-je-voudrais | Illustrative example inside "Three engines, three jobs." |
| QA-L10-484 | `s10-reveal-midday-break` | s'il vous plaît | please (formal) | recognition | read | chunk-sil-vous-plait | Both are natural. Among people you have been working with all morning, the short form is enough; s'il vous plaît adds a little distance when you want it. |
| QA-L10-494 | `s05-weave-close-the-day` | Bonjour | Hello | recognition | read | chunk-bonjour | You opened the day with bonjour. Now you can close it. |

#### Chunk inventory — L10 (15)

| Item ID | French | English | 1st seen | 1st targeted | 1st production | Role | Protected? | Evidence | Reused in | Treatment matches registry? | Founder | Human QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `adverb-ou-where` | où | where | L8 | L8 | L8 | supported | splittable / atomic | evidence-bearing | L8 L10 | yes | | |
| `chunk-a-la-maison` | à la maison | home | L7 | L7 | L7 | supported | protected (multi-word chunk) | evidence-bearing | L7 L10 | yes | | |
| `chunk-au-revoir` | au revoir | goodbye | L6 | L6 | L6 | active | protected (multi-word chunk) | evidence-bearing | L6 L7 L9 L10 | yes | | |
| `chunk-bonjour` | Bonjour | Hello | L1 | L1 | L1 | active | protected (single-token chunk) | evidence-bearing | L1 L2 L3 L4 L6 L8 L10 | yes | | |
| `chunk-c-est` | c'est | it is / that is | L3 | L3 | L3 | supported | protected (single-token chunk) | evidence-bearing | L3 L8 L10 | yes | | |
| `chunk-c-est-ou` | c'est où ? | where is it? | L8 | L8 | L8 | active | protected (multi-word chunk) | evidence-bearing | L8 L10 | yes | | |
| `chunk-faire-une-pause` | faire une pause | to take a break | L9 | L9 | L9 | active | protected (multi-word chunk) | evidence-bearing | L9 L10 | yes | | |
| `chunk-je-suis` | je suis | I am | L1 | L2 | L2 | active | protected (multi-word chunk) | evidence-bearing | L1 L2 L3 L4 L6 L7 L10 | not declared in this lesson | | |
| `chunk-je-suis-ici` | je suis ici | I am here | L2 | L2 | L2 | active | protected (multi-word chunk) | evidence-bearing | L2 L3 L4 L6 L10 | not declared in this lesson | | |
| `chunk-je-vais` | je vais | I'm going | L7 | L7 | L7 | active | protected (multi-word chunk) | evidence-bearing | L7 L9 L10 | yes | | |
| `chunk-je-voudrais` | je voudrais | I would like | L1 | L1 | L1 | active | protected (multi-word chunk) | evidence-bearing | L1 L2 L3 L4 L5 L7 L9 L10 | yes | | |
| `chunk-m-aider` | m'aider | to help me | L10 | L10 | never | supported | protected (single-token chunk) | not evidence-bearing | L10 | yes | | |
| `chunk-merci` | merci | thank you | L1 | L1 | L1 | active | protected (single-token chunk) | evidence-bearing | L1 L3 L6 L7 L9 L10 | not declared in this lesson | | |
| `chunk-sil-vous-plait` | s'il vous plaît | please (formal) | L1 | L1 | L1 | active | protected (multi-word chunk) | evidence-bearing | L1 L9 L10 | not declared in this lesson | | |
| `chunk-vous-pouvez` | vous pouvez | you can | L10 | L10 | never | supported | protected (multi-word chunk) | not evidence-bearing | L10 | yes | | |

---

## 6. Consistency findings (reported, not fixed)

Every finding below is a statement about the current implementation. None of
them has been changed, and none of them is a proposed rewrite.

### C1 conflicting-gloss  (7)
- "un café" is presented with 2 different English lines: "coffee" (L1/s04-weave-cafe-order, L1/s06-weave-cafe-order-please, L1/s08-sayit-cafe-order) — vs — "a coffee" (L1/s09-recap-survival-kit, L5/s00-goal-un-une, L5/s00-meet-un-cafe, L5/s03-fill-package-cafe, L5/s04-fill-package-question, L5/s02-insight-little-packages, L5/s04b-fill-choose-package, L5/s05-weave-je-voudrais-un-cafe, L5/s07-sayit-ask-for-a-coffee, L5/s08-recap-packages)
- "Je suis ici." is presented with 2 different English lines: "I am here." (L2/s00-meet-je-suis-ici, L2/s01-insight-je-suis-engine, L2/s06-insight-shape-noticed, L3/s01-insight-ne-pas-sandwich, L4/s01-insight-have-for-feelings) — vs — "I'm here. (being)" (L10/s01-insight-three-engines)
- "C'est ici." is presented with 2 different English lines: "It is here." (L3/s01-insight-ne-pas-sandwich) — vs — "It's here." (L8/s08-meet-c-est-ici)
- "une question" is presented with 2 different English lines: "a question" (L4/s00-goal-jai, L4/s08-recap-jai, L5/s00-goal-un-une, L5/s01-meet-une-question, L5/s03-fill-package-cafe, L5/s04-fill-package-question, L5/s02-insight-little-packages, L5/s04b-fill-choose-package, L5/s06-weave-j-ai-une-question, L5/s08-recap-packages, L6/s00-goal-petit-moment, L6/s05-weave-j-ai-une-question, L6/s07-sayit-step-in, L6/s10-recap-a-small-moment) — vs — "question" (L4/s03-meet-j-ai-une-question, L4/s06-weave-bonjour-j-ai-une-question)
- "Je voudrais un café." is presented with 2 different English lines: "I would like a coffee." (L5/s02-insight-little-packages) — vs — "I'd like a coffee." (L9/s10-insight-what-you-can-ask)
- "Je vais à la maison." is presented with 2 different English lines: "I'm going home." (L7/s01-meet-je-vais-a-la-maison, L7/s02-insight-je-vais-frozen, L7/s10-insight-leaving-two-moves) — vs — "I'm going home. (moving)" (L10/s01-insight-three-engines)
- "Je voudrais faire une pause." is presented with 3 different English lines: "I'd like to take a break." (L9/s01-meet-faire-une-pause, L9/s10-insight-what-you-can-ask) — vs — "I'd like to take a break. (an action)" (L9/s02-insight-voudrais-carries-actions) — vs — "I'd like to take a break. (asking)" (L10/s01-insight-three-engines)

### C11 recap-chip-unregistered  (1)
- L9/s07-recap-pause: recap chip "une pause" matches no registry item surface

### C12 supported-then-independent  (1)
- chunk-c-est is produced Supported at L8/s05-weave-answer-here and independently at L3/s07-weave-ce-n-est-pas-ici — confirm the intervening evidence

### C13 registered-unused  (1)
- 24 registry items are never visible/expected/accepted/evidenced in L1-L10: pronoun-je, pronoun-tu, pronoun-vous, verb-etre, chunk-tu-es, chunk-vous-etes, sound-liaison, grammar-etre-identity, chunk-tu-es-pret, chunk-vous-etes-pret, noun-idee, chunk-je-peux, verb-aider, chunk-est-ce-que, word-y-place, chunk-j-y-vais, chunk-on-y-va, chunk-il-faut, chunk-je-dois, verb-aller, chunk-excusez-moi, chunk-je-ne-comprends-pas, chunk-vous-pouvez-repeter, noun-the

### C14 declared-not-targeted  (9)
- L2 declares learningItem word-ici ("ici") but no screen targets it
- L4 declares learningItem noun-faim ("faim") but no screen targets it
- L4 declares learningItem noun-question ("question") but no screen targets it
- L7 declares learningItem chunk-au-revoir ("au revoir") but no screen targets it
- L7 declares learningItem chunk-merci ("merci") but no screen targets it
- L8 declares learningItem chunk-bonjour ("Bonjour") but no screen targets it
- L9 declares learningItem noun-pause ("pause") but no screen targets it
- L10 declares learningItem chunk-c-est ("c'est") but no screen targets it
- L10 declares learningItem chunk-au-revoir ("au revoir") but no screen targets it

### C15 targeted-not-declared  (6)
- L3 targets chunk-je-suis on a screen but does not declare it in learningItems — treatment resolution fails closed
- L3 targets chunk-c-est on a screen but does not declare it in learningItems — treatment resolution fails closed
- L4 targets chunk-je-suis on a screen but does not declare it in learningItems — treatment resolution fails closed
- L4 targets chunk-je-suis-ici on a screen but does not declare it in learningItems — treatment resolution fails closed
- L4 targets chunk-bonjour on a screen but does not declare it in learningItems — treatment resolution fails closed
- L10 targets chunk-je-suis on a screen but does not declare it in learningItems — treatment resolution fails closed

### C16 payload-registration  (1)
- 2 payloads registered (v1-lesson-001/s10-weave-merci-thanks, v1-lesson-001/s11-weave-the-order); 25 typed production surfaces exist in L1-L10

### C17 smart-apostrophes  (1)
- no authored French surface uses a smart apostrophe; all use the straight ' (normalizer folds smart → straight on learner input)

### C18 french-qa-state  (1)
- {"founder_waived_provisional":25,"(none on item)":473,"(none)":10}

### C19 shown-before-first-contact  (6)
- L1/s03-fill-polite-verb shows "je suis" but its item(s) chunk-je-suis (first targeted L2) are only introduced later
- L1/s09-recap-survival-kit shows "un café" but its item(s) chunk-un-cafe (first targeted L5) are only introduced later
- L4/s00-goal-jai shows "une question" but its item(s) chunk-une-question (first targeted L5) are only introduced later
- L4/s03-meet-j-ai-une-question shows "une question" but its item(s) noun-question (first targeted L5) are only introduced later
- L4/s06-weave-bonjour-j-ai-une-question shows "une question" but its item(s) noun-question (first targeted L5) are only introduced later
- L4/s08-recap-jai shows "une question" but its item(s) chunk-une-question (first targeted L5) are only introduced later

### C1b varying-instruction  (14)
- "Je voudrais ___, s'il vous plaît." is asked for with 2 different instructions: "Order a tea politely." (L1/s11-weave-the-order) — vs — "Ask for a break politely: say you'd like to take a pause, please." (L9/s05-weave-break-politely)
- "Je suis ici." is asked for with 2 different instructions: "I am here." (L2/s04-weave-je-suis-ici, L2/s05-weave-call-and-respond) — vs — "Signal you are here." (L2/s07-sayit-arrive-locate)
- "Bonjour, je suis ici." is asked for with 2 different instructions: "Signal you are here." (L2/s07-sayit-arrive-locate) — vs — "Hello. I am here." (L6/s03-weave-bonjour-je-suis-ici)
- "Je ne suis pas ici." is asked for with 2 different instructions: "I am not here." (L3/s06-weave-je-ne-suis-pas-ici) — vs — "Say no and state where you are not." (L3/s09-sayit-not-here)
- "Non, je ne suis pas ici." is asked for with 2 different instructions: "No, I am not here." (L3/s08-weave-non-je-ne-suis-pas-ici) — vs — "Say no and state where you are not." (L3/s09-sayit-not-here)
- "J'ai faim." is asked for with 2 different instructions: "I am hungry." (L4/s05-weave-j-ai-faim) — vs — "Say what you feel, using have." (L4/s07-sayit-how-you-feel)
- "Je voudrais un café." is asked for with 2 different instructions: "I would like a coffee." (L5/s05-weave-je-voudrais-un-cafe) — vs — "Ask for an object, package included." (L5/s07-sayit-ask-for-a-coffee)
- "Je vais à la maison. Au revoir." is asked for with 4 different instructions: "Say you're going home, then say goodbye." (L7/s05-weave-close-the-moment) — vs — "Close the moment and say where you're heading." (L7/s06-sayit-take-your-leave) — vs — "Evening. Say you're going home, then say goodbye." (L10/s05-weave-close-the-day) — vs — "Take your leave warmly: thanks, direction, goodbye." (L10/s07-sayit-take-your-leave)
- "Je vais à la maison, au revoir." is asked for with 2 different instructions: "Say you're going home, then say goodbye." (L7/s05-weave-close-the-moment) — vs — "Evening. Say you're going home, then say goodbye." (L10/s05-weave-close-the-day)
- "Je vais ___. Au revoir." is asked for with 2 different instructions: "Say you're going home, then say goodbye." (L7/s05-weave-close-the-moment) — vs — "Evening. Say you're going home, then say goodbye." (L10/s05-weave-close-the-day)
- "Merci. Je vais à la maison. Au revoir." is asked for with 2 different instructions: "Close the moment and say where you're heading." (L7/s06-sayit-take-your-leave) — vs — "Take your leave warmly: thanks, direction, goodbye." (L10/s07-sayit-take-your-leave)
- "C'est où ?" is asked for with 2 different instructions: "Ask where it is." (L8/s04-weave-ask-where) — vs — "Open politely, then ask where it is." (L8/s06-sayit-find-the-room)
- "Je voudrais faire une pause." is asked for with 2 different instructions: "Say you'd like to take a break." (L9/s04-weave-ask-for-a-break, L10/s04-weave-midday-break) — vs — "Ask for a break, politely." (L9/s06-sayit-long-afternoon)
- "Je voudrais faire une pause, s'il vous plaît." is asked for with 3 different instructions: "Ask for a break politely: say you'd like to take a pause, please." (L9/s05-weave-break-politely) — vs — "Ask for a break, politely." (L9/s06-sayit-long-afternoon) — vs — "Say you'd like to take a break." (L10/s04-weave-midday-break)

### C2 duplicate-production  (4)
- "Je suis ici." is a typed production target on 2 screens: L2/s04-weave-je-suis-ici [active-new], L2/s05-weave-call-and-respond [active-new]
- "J'ai une question." is a typed production target on 2 screens: L5/s06-weave-j-ai-une-question [active-new], L6/s05-weave-j-ai-une-question [recycled]
- "Je vais à la maison. Au revoir." is a typed production target on 2 screens: L7/s05-weave-close-the-moment [supported], L10/s05-weave-close-the-day [supported]
- "Je voudrais faire une pause." is a typed production target on 2 screens: L9/s04-weave-ask-for-a-break [active-new], L10/s04-weave-midday-break [recycled]

### C3 identity-variants  (28)
- these 3 surfaces are ONE identity after normalization: "merci" · "Merci." · "Merci"
- these 2 surfaces are ONE identity after normalization: "s'il vous plaît" · "S'il vous plaît."
- these 2 surfaces are ONE identity after normalization: "je suis" · "Je suis"
- these 2 surfaces are ONE identity after normalization: "je voudrais" · "Je voudrais"
- these 3 surfaces are ONE identity after normalization: "Bonjour" · "Bonjour." · "bonjour"
- these 2 surfaces are ONE identity after normalization: "Je suis ici." · "je suis ici"
- these 4 surfaces are ONE identity after normalization: "non merci" · "Non, merci." · "Non merci." · "Non merci"
- these 2 surfaces are ONE identity after normalization: "non" · "Non"
- these 2 surfaces are ONE identity after normalization: "oui" · "Oui."
- these 2 surfaces are ONE identity after normalization: "Ce n est pas ici" · "Ce n est pas ici."
- these 2 surfaces are ONE identity after normalization: "c'est" · "C'est"
- these 2 surfaces are ONE identity after normalization: "j'ai" · "J'ai"
- these 2 surfaces are ONE identity after normalization: "J'ai faim." · "j'ai faim"
- these 2 surfaces are ONE identity after normalization: "j'ai une question" · "J'ai une question."
- these 3 surfaces are ONE identity after normalization: "j ai faim" · "J ai faim" · "J ai faim."
- these 2 surfaces are ONE identity after normalization: "Bonjour, j'ai une question." · "Bonjour. J'ai une question."
- these 2 surfaces are ONE identity after normalization: "Bonjour j ai une question" · "Bonjour, j ai une question."
- these 3 surfaces are ONE identity after normalization: "j ai une question" · "J ai une question" · "J ai une question."
- these 3 surfaces are ONE identity after normalization: "au revoir" · "Au revoir." · "Au revoir"
- these 2 surfaces are ONE identity after normalization: "Bonjour. Je suis ici. J'ai une question. Merci. Au revoir." · "Bonjour. Je suis ici. J'ai une question. Merci, au revoir."
- these 2 surfaces are ONE identity after normalization: "je vais" · "Je vais."
- these 2 surfaces are ONE identity after normalization: "Je vais ___." · "Je vais ___ ."
- these 2 surfaces are ONE identity after normalization: "Je vais à la maison. Au revoir." · "Je vais à la maison, au revoir."
- these 2 surfaces are ONE identity after normalization: "c'est où ?" · "C'est où ?"
- these 2 surfaces are ONE identity after normalization: "c'est où" · "C'est où"
- these 2 surfaces are ONE identity after normalization: "C'est ___ ." · "C'est ___."
- these 2 surfaces are ONE identity after normalization: "Bonjour, c'est où ?" · "Bonjour. C'est où ?"
- these 2 surfaces are ONE identity after normalization: "Je voudrais faire une pause, s'il vous plaît." · "Je voudrais faire une pause s'il vous plaît."

### C4 no-op-alternative  (5)
- L1/s10-weave-merci-thanks: accepted alternative "Merci" already normalizes to the expected answer "Merci." — it changes nothing
- L7/s05-weave-close-the-moment: accepted alternative "Je vais à la maison, au revoir." already normalizes to the expected answer "Je vais à la maison. Au revoir." — it changes nothing
- L9/s05-weave-break-politely: accepted alternative "Je voudrais faire une pause s'il vous plaît." already normalizes to the expected answer "Je voudrais faire une pause, s'il vous plaît." — it changes nothing
- L10/s02-weave-arrive-ask-where: accepted alternative "Bonjour, c'est où ?" already normalizes to the expected answer "Bonjour. C'est où ?" — it changes nothing
- L10/s05-weave-close-the-day: accepted alternative "Je vais à la maison, au revoir." already normalizes to the expected answer "Je vais à la maison. Au revoir." — it changes nothing

### C5 apostrophe-policy-conflict  (12)
- L3/s07-weave-ce-n-est-pas-ici: "Ce n est pas ici." accepts a MISSING apostrophe, but normalizeAnswer.ts states the apostrophe stays significant ("a missing apostrophe is NOT silently accepted as correct"). Expected: "Ce n'est pas ici."
- L3/s07-weave-ce-n-est-pas-ici: "Ce n est pas ici" accepts a MISSING apostrophe, but normalizeAnswer.ts states the apostrophe stays significant ("a missing apostrophe is NOT silently accepted as correct"). Expected: "Ce n'est pas ici."
- L4/s05-weave-j-ai-faim: "J ai faim." accepts a MISSING apostrophe, but normalizeAnswer.ts states the apostrophe stays significant ("a missing apostrophe is NOT silently accepted as correct"). Expected: "J'ai faim."
- L4/s05-weave-j-ai-faim: "J ai faim" accepts a MISSING apostrophe, but normalizeAnswer.ts states the apostrophe stays significant ("a missing apostrophe is NOT silently accepted as correct"). Expected: "J'ai faim."
- L4/s05-weave-j-ai-faim: "j ai faim" accepts a MISSING apostrophe, but normalizeAnswer.ts states the apostrophe stays significant ("a missing apostrophe is NOT silently accepted as correct"). Expected: "J'ai faim."
- L4/s06-weave-bonjour-j-ai-une-question: "Bonjour, j ai une question." accepts a MISSING apostrophe, but normalizeAnswer.ts states the apostrophe stays significant ("a missing apostrophe is NOT silently accepted as correct"). Expected: "Bonjour, j'ai une question."
- L4/s06-weave-bonjour-j-ai-une-question: "Bonjour j ai une question" accepts a MISSING apostrophe, but normalizeAnswer.ts states the apostrophe stays significant ("a missing apostrophe is NOT silently accepted as correct"). Expected: "Bonjour, j'ai une question."
- L5/s06-weave-j-ai-une-question: "J ai une question." accepts a MISSING apostrophe, but normalizeAnswer.ts states the apostrophe stays significant ("a missing apostrophe is NOT silently accepted as correct"). Expected: "J'ai une question."
- L5/s06-weave-j-ai-une-question: "J ai une question" accepts a MISSING apostrophe, but normalizeAnswer.ts states the apostrophe stays significant ("a missing apostrophe is NOT silently accepted as correct"). Expected: "J'ai une question."
- L5/s06-weave-j-ai-une-question: "j ai une question" accepts a MISSING apostrophe, but normalizeAnswer.ts states the apostrophe stays significant ("a missing apostrophe is NOT silently accepted as correct"). Expected: "J'ai une question."
- L6/s05-weave-j-ai-une-question: "J ai une question." accepts a MISSING apostrophe, but normalizeAnswer.ts states the apostrophe stays significant ("a missing apostrophe is NOT silently accepted as correct"). Expected: "J'ai une question."
- L6/s05-weave-j-ai-une-question: "J ai une question" accepts a MISSING apostrophe, but normalizeAnswer.ts states the apostrophe stays significant ("a missing apostrophe is NOT silently accepted as correct"). Expected: "J'ai une question."

### C6 alternative-broader  (1)
- L10/s04-weave-midday-break: alternative "Je voudrais faire une pause, s'il vous plaît." adds material beyond the expected answer "Je voudrais faire une pause." while the shown instruction is "Say you'd like to take a break."

### C7 unregistered-production  (1)
- 23 of 25 typed production surfaces are NOT in sentenceRegistry: L1/s04-weave-cafe-order "Bonjour, je voudrais un café." · L1/s06-weave-cafe-order-please "Bonjour, je voudrais un café, s'il vous plaît." · L2/s04-weave-je-suis-ici "Je suis ici." · L2/s05-weave-call-and-respond "Je suis ici." · L3/s06-weave-je-ne-suis-pas-ici "Je ne suis pas ici." · L3/s07-weave-ce-n-est-pas-ici "Ce n'est pas ici." · L3/s08-weave-non-je-ne-suis-pas-ici "Non, je ne suis pas ici." · L4/s05-weave-j-ai-faim "J'ai faim." · L4/s06-weave-bonjour-j-ai-une-question "Bonjour, j'ai une question." · L5/s05-weave-je-voudrais-un-cafe "Je voudrais un café." · L5/s06-weave-j-ai-une-question "J'ai une question." · L6/s03-weave-bonjour-je-suis-ici "Bonjour, je suis ici." · L6/s05-weave-j-ai-une-question "J'ai une question." · L6/s08-weave-close-open "Merci, au revoir." · L7/s04-weave-heading-home "Je vais à la maison." · L7/s05-weave-close-the-moment "Je vais à la maison. Au revoir." · L8/s04-weave-ask-where "C'est où ?" · L8/s05-weave-answer-here "C'est ici." · L9/s04-weave-ask-for-a-break "Je voudrais faire une pause." · L9/s05-weave-break-politely "Je voudrais faire une pause, s'il vous plaît." · L10/s02-weave-arrive-ask-where "Bonjour. C'est où ?" · L10/s04-weave-midday-break "Je voudrais faire une pause." · L10/s05-weave-close-the-day "Je vais à la maison. Au revoir."

### C9 boundary-mismatch  (5)
- L1/s04-weave-cafe-order: piece "un café" is bound to noun-cafe whose registry surface is "café"
- L1/s06-weave-cafe-order-please: piece "un café" is bound to noun-cafe whose registry surface is "café"
- L1/s08-sayit-cafe-order: piece "un café" is bound to noun-cafe whose registry surface is "café"
- L4/s03-meet-j-ai-une-question: highlight "une question" is bound to noun-question whose registry surface is "question"
- L4/s06-weave-bonjour-j-ai-une-question: piece "une question" is bound to noun-question whose registry surface is "question"

---

## 7. Appendix — Registered but unused in L1–L10

24 registry items are never visible, expected, accepted,
evidenced or explicitly previewed anywhere in L1–L10. **They are not part of
this review.** They are listed so the reviewer can confirm the exclusion is
intentional rather than an extraction gap.

| Item ID | French | English | Registry status |
|---|---|---|---|
| `chunk-est-ce-que` | est-ce que | question wrapper (is it that...) | active |
| `chunk-excusez-moi` | excusez-moi | excuse me | supported |
| `chunk-il-faut` | il faut | one must / it's necessary to | active |
| `chunk-j-y-vais` | j'y vais | I'm off / I'm going there | active |
| `chunk-je-dois` | je dois | I have to | supported |
| `chunk-je-ne-comprends-pas` | je ne comprends pas | I don't understand | supported |
| `chunk-je-peux` | je peux | I can | active |
| `chunk-on-y-va` | on y va | let's go | active |
| `chunk-tu-es` | tu es | you are (informal) | active |
| `chunk-tu-es-pret` | tu es prêt | you are ready (informal) | supported |
| `chunk-vous-etes` | vous êtes | you are (formal/plural) | active |
| `chunk-vous-etes-pret` | vous êtes prêt | you are ready (formal) | supported |
| `chunk-vous-pouvez-repeter` | vous pouvez répéter ? | can you say that again? | supported |
| `grammar-etre-identity` | être = identity, state, location |  | recognition |
| `noun-idee` | idée | idea | supported |
| `noun-the` | thé | tea | supported |
| `pronoun-je` | je | I | active |
| `pronoun-tu` | tu | you (informal singular) | active |
| `pronoun-vous` | vous | you (formal or plural) | active |
| `sound-liaison` | liaison (vous_êtes, nous_avons) |  | recognition |
| `verb-aider` | aider | to help | supported |
| `verb-aller` | aller | to go | supported |
| `verb-etre` | être | to be | active |
| `word-y-place` | y | there (the place you named) | active |

---

## 8. Founder review queue

Rows that need an **A / R / G / M** decision before the French reviewer
spends time on them: everything the learner is asked to *produce*, everything
the app *accepts*, and the open-task model answers. Recognition surfaces and
explanatory French are not in this queue — they go straight to the French
reviewer. **70 rows.**

| Row | Lesson | Screen | French | Group | Role | Why it needs a founder call |
|---|---|---|---|---|---|---|
| QA-L01-010 | L1 | `s04-weave-cafe-order` | Bonjour, je voudrais un café. | A | active-new | unregistered production sentence — live, no identity |
| QA-L01-019 | L1 | `s06-weave-cafe-order-please` | Bonjour, je voudrais un café, s'il vous plaît. | A | active-new | unregistered production sentence — live, no identity |
| QA-L01-027 | L1 | `s10-weave-merci-thanks` | Merci. | A | active-new | registered production sentence |
| QA-L01-028 | L1 | `s10-weave-merci-thanks` | Merci | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L01-029 | L1 | `s10-weave-merci-thanks` | Merci ! | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L01-033 | L1 | `s11-weave-the-order` | Je voudrais un thé, s'il vous plaît. | A | supported | registered production sentence |
| QA-L01-038 | L1 | `s08-sayit-cafe-order` | Bonjour, je voudrais un café, s'il vous plaît. Merci ! | B | model-only | model answer for an open task |
| QA-L01-039 | L1 | `s08-sayit-cafe-order` | Bonjour, un café s'il vous plaît. Merci ! | B | model-only | model answer for an open task |
| QA-L02-071 | L2 | `s04-weave-je-suis-ici` | Je suis ici. | A | active-new | unregistered production sentence — live, no identity |
| QA-L02-078 | L2 | `s05-weave-call-and-respond` | Je suis ici. | A | active-new | unregistered production sentence — live, no identity |
| QA-L02-082 | L2 | `s07-sayit-arrive-locate` | Bonjour, je suis ici. | B | model-only | model answer for an open task |
| QA-L02-083 | L2 | `s07-sayit-arrive-locate` | Je suis ici. | B | model-only | model answer for an open task |
| QA-L03-120 | L3 | `s06-weave-je-ne-suis-pas-ici` | Je ne suis pas ici. | A | active-new | unregistered production sentence — live, no identity |
| QA-L03-125 | L3 | `s07-weave-ce-n-est-pas-ici` | Ce n'est pas ici. | A | active-new | unregistered production sentence — live, no identity |
| QA-L03-126 | L3 | `s07-weave-ce-n-est-pas-ici` | Ce n est pas ici | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L03-127 | L3 | `s07-weave-ce-n-est-pas-ici` | Ce n est pas ici. | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L03-131 | L3 | `s08-weave-non-je-ne-suis-pas-ici` | Non, je ne suis pas ici. | A | active-new | unregistered production sentence — live, no identity |
| QA-L03-137 | L3 | `s09-sayit-not-here` | Je ne suis pas ici. | B | model-only | model answer for an open task |
| QA-L03-138 | L3 | `s09-sayit-not-here` | Non, je ne suis pas ici. | B | model-only | model answer for an open task |
| QA-L04-181 | L4 | `s05-weave-j-ai-faim` | J'ai faim. | A | active-new | unregistered production sentence — live, no identity |
| QA-L04-182 | L4 | `s05-weave-j-ai-faim` | j ai faim | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L04-183 | L4 | `s05-weave-j-ai-faim` | J ai faim | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L04-184 | L4 | `s05-weave-j-ai-faim` | J ai faim. | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L04-188 | L4 | `s06-weave-bonjour-j-ai-une-question` | Bonjour, j'ai une question. | A | active-new | unregistered production sentence — live, no identity |
| QA-L04-189 | L4 | `s06-weave-bonjour-j-ai-une-question` | Bonjour j ai une question | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L04-190 | L4 | `s06-weave-bonjour-j-ai-une-question` | Bonjour, j ai une question. | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L04-196 | L4 | `s07-sayit-how-you-feel` | Bonjour, j'ai faim. | B | model-only | model answer for an open task |
| QA-L04-197 | L4 | `s07-sayit-how-you-feel` | J'ai faim. | B | model-only | model answer for an open task |
| QA-L05-230 | L5 | `s05-weave-je-voudrais-un-cafe` | Je voudrais un café. | A | active-new | unregistered production sentence — live, no identity |
| QA-L05-233 | L5 | `s06-weave-j-ai-une-question` | J'ai une question. | A | active-new | unregistered production sentence — live, no identity |
| QA-L05-234 | L5 | `s06-weave-j-ai-une-question` | j ai une question | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L05-235 | L5 | `s06-weave-j-ai-une-question` | J ai une question | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L05-236 | L5 | `s06-weave-j-ai-une-question` | J ai une question. | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L05-239 | L5 | `s07-sayit-ask-for-a-coffee` | Je voudrais un café. | B | model-only | model answer for an open task |
| QA-L05-240 | L5 | `s07-sayit-ask-for-a-coffee` | Un café, s'il vous plaît. | B | model-only | model answer for an open task |
| QA-L06-260 | L6 | `s03-weave-bonjour-je-suis-ici` | Bonjour, je suis ici. | A | recycled | unregistered production sentence — live, no identity |
| QA-L06-276 | L6 | `s05-weave-j-ai-une-question` | J'ai une question. | A | recycled | unregistered production sentence — live, no identity |
| QA-L06-277 | L6 | `s05-weave-j-ai-une-question` | J ai une question | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L06-278 | L6 | `s05-weave-j-ai-une-question` | J ai une question. | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L06-284 | L6 | `s07-sayit-step-in` | Bonjour. J'ai une question. | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L06-285 | L6 | `s07-sayit-step-in` | Bonjour. Je suis ici. J'ai une question. | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L06-291 | L6 | `s08-weave-close-open` | Merci, au revoir. | A | active-new | unregistered production sentence — live, no identity |
| QA-L06-294 | L6 | `s09-sayit-whole-moment` | Bonjour. J'ai une question. Merci. Au revoir. | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L06-295 | L6 | `s09-sayit-whole-moment` | Bonjour. Je suis ici. J'ai une question. Merci. Au revoir. | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L06-296 | L6 | `s09-sayit-whole-moment` | Bonjour. Je suis ici. J'ai une question. Merci, au revoir. | B | model-only | model answer for an open task |
| QA-L07-323 | L7 | `s04-weave-heading-home` | Je vais à la maison. | A | supported | unregistered production sentence — live, no identity |
| QA-L07-332 | L7 | `s05-weave-close-the-moment` | Je vais à la maison. Au revoir. | A | supported | unregistered production sentence — live, no identity |
| QA-L07-333 | L7 | `s05-weave-close-the-moment` | Je vais à la maison, au revoir. | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L07-342 | L7 | `s06-sayit-take-your-leave` | Je vais à la maison. Au revoir. | B | model-only | model answer for an open task |
| QA-L07-343 | L7 | `s06-sayit-take-your-leave` | Merci. Je vais à la maison. Au revoir. | B | model-only | model answer for an open task |
| QA-L08-363 | L8 | `s04-weave-ask-where` | C'est où ? | A | supported | unregistered production sentence — live, no identity |
| QA-L08-364 | L8 | `s04-weave-ask-where` | c'est où | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L08-365 | L8 | `s04-weave-ask-where` | C'est où | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L08-381 | L8 | `s05-weave-answer-here` | C'est ici. | A | supported | unregistered production sentence — live, no identity |
| QA-L08-388 | L8 | `s06-sayit-find-the-room` | Bonjour, c'est où ? | B | model-only | model answer for an open task |
| QA-L08-389 | L8 | `s06-sayit-find-the-room` | C'est où ? | B | model-only | model answer for an open task |
| QA-L09-415 | L9 | `s04-weave-ask-for-a-break` | Je voudrais faire une pause. | A | active-new | unregistered production sentence — live, no identity |
| QA-L09-427 | L9 | `s05-weave-break-politely` | Je voudrais faire une pause, s'il vous plaît. | A | active-new | unregistered production sentence — live, no identity |
| QA-L09-428 | L9 | `s05-weave-break-politely` | Je voudrais faire une pause s'il vous plaît. | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L09-437 | L9 | `s06-sayit-long-afternoon` | Je voudrais faire une pause, s'il vous plaît. | B | model-only | model answer for an open task |
| QA-L09-438 | L9 | `s06-sayit-long-afternoon` | Je voudrais faire une pause. | B | model-only | model answer for an open task |
| QA-L10-453 | L10 | `s02-weave-arrive-ask-where` | Bonjour. C'est où ? | A | supported | unregistered production sentence — live, no identity |
| QA-L10-454 | L10 | `s02-weave-arrive-ask-where` | Bonjour, c'est où | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L10-455 | L10 | `s02-weave-arrive-ask-where` | Bonjour, c'est où ? | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L10-477 | L10 | `s04-weave-midday-break` | Je voudrais faire une pause. | A | recycled | unregistered production sentence — live, no identity |
| QA-L10-478 | L10 | `s04-weave-midday-break` | Je voudrais faire une pause, s'il vous plaît. | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L10-488 | L10 | `s05-weave-close-the-day` | Je vais à la maison. Au revoir. | A | supported | unregistered production sentence — live, no identity |
| QA-L10-489 | L10 | `s05-weave-close-the-day` | Je vais à la maison, au revoir. | E | accepted-alternative | an accepted alternative decides what counts as right |
| QA-L10-495 | L10 | `s07-sayit-take-your-leave` | Je vais à la maison. Au revoir. | B | model-only | model answer for an open task |
| QA-L10-496 | L10 | `s07-sayit-take-your-leave` | Merci. Je vais à la maison. Au revoir. | B | model-only | model answer for an open task |

---

## 9. Human French-QA queue

**All 508 rows** in `L1_L10_FRENCH_QA_ROWS_v0.1.csv` go to the named
reviewer. The CSV is the working artifact — it is sortable, and the verdict
columns are blank and ready.

Suggested pass order:

| Pass | Filter | Rows | Why first |
|---|---|---:|---|
| 1 | `group = A` | 25 | what the learner is graded on |
| 2 | `group = E` | 26 | what the app silently accepts |
| 3 | `group = B` | 45 | what the learner is told is natural |
| 4 | `group = C` | 265 | what the learner reads and chooses |
| 5 | `group = F` | 147 | French inside explanations |

Register is the cross-cutting concern: the pilot is **vous** throughout, and
`je voudrais` vs `je veux` is taught as register rather than as an error
(L1 `s03-fill-polite-verb`). Any row that shifts that footing is a MAJOR
finding even when the French is grammatical.

---

## 10. High-risk first batch — L1–L3

**74 rows**, of which the first **23** (tiers 1–3) are the
minimum sitting that de-risks the pilot. Entry is by what the row *does*;
cross-lesson reuse is an ordering signal, not an entry rule — `bonjour`
appearing in seven lessons does not by itself make it risky.

| Tier | Entry rule | Why it is first | Rows |
|---|---|---|---:|
| 1 | `group = A` — production | the learner is graded on it | 9 |
| 2 | `group = E` — accepted alternative | the app silently marks it right | 4 |
| 3 | `group = B` — model / reveal | the app calls it natural | 10 |
| 4 | protected chunk | constitutive packages and canon frames that must never be split | 15 |
| 5 | politeness / register | `je voudrais` vs `je veux`, `s'il vous plaît`, the vous footing | 36 |

| Tier | Row | Lesson | Screen | French | Group | Role | Reused across lessons |
|---|---|---|---|---|---|---|---|
| 1 | QA-L01-010 | L1 | `s04-weave-cafe-order` | Bonjour, je voudrais un café. | A | active-new | no |
| 1 | QA-L01-019 | L1 | `s06-weave-cafe-order-please` | Bonjour, je voudrais un café, s'il vous plaît. | A | active-new | no |
| 1 | QA-L01-027 | L1 | `s10-weave-merci-thanks` | Merci. | A | active-new | yes |
| 1 | QA-L01-033 | L1 | `s11-weave-the-order` | Je voudrais un thé, s'il vous plaît. | A | supported | no |
| 1 | QA-L02-071 | L2 | `s04-weave-je-suis-ici` | Je suis ici. | A | active-new | yes |
| 1 | QA-L02-078 | L2 | `s05-weave-call-and-respond` | Je suis ici. | A | active-new | yes |
| 1 | QA-L03-120 | L3 | `s06-weave-je-ne-suis-pas-ici` | Je ne suis pas ici. | A | active-new | yes |
| 1 | QA-L03-125 | L3 | `s07-weave-ce-n-est-pas-ici` | Ce n'est pas ici. | A | active-new | no |
| 1 | QA-L03-131 | L3 | `s08-weave-non-je-ne-suis-pas-ici` | Non, je ne suis pas ici. | A | active-new | no |
| 2 | QA-L01-028 | L1 | `s10-weave-merci-thanks` | Merci | E | accepted-alternative | yes |
| 2 | QA-L01-029 | L1 | `s10-weave-merci-thanks` | Merci ! | E | accepted-alternative | no |
| 2 | QA-L03-126 | L3 | `s07-weave-ce-n-est-pas-ici` | Ce n est pas ici | E | accepted-alternative | no |
| 2 | QA-L03-127 | L3 | `s07-weave-ce-n-est-pas-ici` | Ce n est pas ici. | E | accepted-alternative | no |
| 3 | QA-L01-003 | L1 | `s03-fill-polite-verb` | Bonjour, je voudrais un café. | B | model-only | no |
| 3 | QA-L01-038 | L1 | `s08-sayit-cafe-order` | Bonjour, je voudrais un café, s'il vous plaît. Merci ! | B | model-only | no |
| 3 | QA-L01-039 | L1 | `s08-sayit-cafe-order` | Bonjour, un café s'il vous plaît. Merci ! | B | model-only | no |
| 3 | QA-L02-062 | L2 | `s03-fill-je-suis-blank` | Je suis ici. | B | model-only | yes |
| 3 | QA-L02-082 | L2 | `s07-sayit-arrive-locate` | Bonjour, je suis ici. | B | model-only | yes |
| 3 | QA-L02-083 | L2 | `s07-sayit-arrive-locate` | Je suis ici. | B | model-only | yes |
| 3 | QA-L03-100 | L3 | `s02-fill-verb-in-sandwich` | Je ne suis pas ici. | B | model-only | yes |
| 3 | QA-L03-113 | L3 | `s05-fill-refuse-politely` | Non merci. | B | model-only | yes |
| 3 | QA-L03-137 | L3 | `s09-sayit-not-here` | Je ne suis pas ici. | B | model-only | yes |
| 3 | QA-L03-138 | L3 | `s09-sayit-not-here` | Non, je ne suis pas ici. | B | model-only | no |
| 4 | QA-L03-092 | L3 | `s00-meet-je-ne-suis-pas-ici` | je ne suis pas | C | recognition | no |
| 4 | QA-L03-093 | L3 | `s00-meet-je-ne-suis-pas-ici` | Je ne suis pas ici. | C | active-new | yes |
| 4 | QA-L03-095 | L3 | `s01-insight-ne-pas-sandwich` | Ce n'est pas ici. | F | recognition | no |
| 4 | QA-L03-096 | L3 | `s01-insight-ne-pas-sandwich` | je ne suis pas | F | recognition | no |
| 4 | QA-L03-097 | L3 | `s01-insight-ne-pas-sandwich` | Je ne suis pas ici. | F | recognition | yes |
| 4 | QA-L03-106 | L3 | `s02-fill-verb-in-sandwich` | je ne suis pas | F | recognition | no |
| 4 | QA-L03-122 | L3 | `s06-weave-je-ne-suis-pas-ici` | je ne suis pas | C | recognition | no |
| 4 | QA-L03-123 | L3 | `s03-meet-ce-n-est-pas-ici` | ce n'est pas | C | recognition | no |
| 4 | QA-L03-124 | L3 | `s03-meet-ce-n-est-pas-ici` | Ce n'est pas ici. | C | active-new | no |
| 4 | QA-L03-128 | L3 | `s07-weave-ce-n-est-pas-ici` | ce n'est pas | C | recognition | no |
| 4 | QA-L03-133 | L3 | `s08-weave-non-je-ne-suis-pas-ici` | je ne suis pas | C | recognition | no |
| 4 | QA-L03-135 | L3 | `s08-weave-non-je-ne-suis-pas-ici` | Non, je ne suis pas ___. | C | recognition | no |
| 4 | QA-L03-140 | L3 | `s09-sayit-not-here` | je ne suis pas | C | recognition | no |
| 4 | QA-L03-143 | L3 | `s10-recap-negation` | ce n'est pas | C | recycled | no |
| 4 | QA-L03-144 | L3 | `s10-recap-negation` | je ne suis pas | C | recycled | no |
| 5 | QA-L01-001 | L1 | `s00-goal-survival-kit` | merci | F | recognition | yes |
| 5 | QA-L01-002 | L1 | `s00-goal-survival-kit` | s'il vous plaît | F | recognition | yes |
| 5 | QA-L01-004 | L1 | `s03-fill-polite-verb` | Bonjour, je ___ un café. | C | recognition | no |
| 5 | QA-L01-005 | L1 | `s03-fill-polite-verb` | suis | C | recognition | yes |
| 5 | QA-L01-006 | L1 | `s03-fill-polite-verb` | veux | C | recognition | no |
| 5 | QA-L01-007 | L1 | `s03-fill-polite-verb` | voudrais | C | recognition | yes |
| 5 | QA-L01-008 | L1 | `s03-fill-polite-verb` | je suis | F | recognition | yes |
| 5 | QA-L01-009 | L1 | `s03-fill-polite-verb` | je voudrais | F | recognition | yes |
| 5 | QA-L01-012 | L1 | `s04-weave-cafe-order` | Bonjour, je voudrais ___. | C | recognition | no |
| 5 | QA-L01-013 | L1 | `s04-weave-cafe-order` | je voudrais | C | recognition | yes |
| 5 | QA-L01-017 | L1 | `s05-meet-sil-vous-plait` | s'il vous plaît | C | recognition | yes |
| 5 | QA-L01-018 | L1 | `s05-meet-sil-vous-plait` | S'il vous plaît. | C | active-new | yes |
| 5 | QA-L01-021 | L1 | `s06-weave-cafe-order-please` | Bonjour, je voudrais ___, s'il vous plaît. | C | recognition | no |
| 5 | QA-L01-022 | L1 | `s06-weave-cafe-order-please` | je voudrais | C | recognition | yes |
| 5 | QA-L01-023 | L1 | `s06-weave-cafe-order-please` | s'il vous plaît | C | recognition | yes |
| 5 | QA-L01-031 | L1 | `s12-meet-un-the` | Je voudrais un thé. | C | supported | no |
| 5 | QA-L01-034 | L1 | `s11-weave-the-order` | je voudrais | C | recognition | yes |
| 5 | QA-L01-035 | L1 | `s11-weave-the-order` | Je voudrais ___, s'il vous plaît. | C | recognition | yes |
| 5 | QA-L01-036 | L1 | `s11-weave-the-order` | s'il vous plaît | C | recognition | yes |
| 5 | QA-L01-041 | L1 | `s08-sayit-cafe-order` | je voudrais | C | recognition | yes |
| 5 | QA-L01-043 | L1 | `s08-sayit-cafe-order` | s'il vous plaît | C | recognition | yes |
| 5 | QA-L01-046 | L1 | `s09-recap-survival-kit` | je voudrais | C | recycled | yes |
| 5 | QA-L01-048 | L1 | `s09-recap-survival-kit` | s'il vous plaît | C | recycled | yes |
| 5 | QA-L02-066 | L2 | `s03-fill-je-suis-blank` | voudrais | C | recognition | yes |
| 5 | QA-L02-070 | L2 | `s03-fill-je-suis-blank` | je voudrais | F | recognition | yes |
| 5 | QA-L03-104 | L3 | `s02-fill-verb-in-sandwich` | voudrais | C | recognition | yes |
| 5 | QA-L03-107 | L3 | `s02-fill-verb-in-sandwich` | je voudrais | F | recognition | yes |
| 5 | QA-L03-109 | L3 | `s04-insight-oui-non` | non merci | F | recognition | yes |
| 5 | QA-L03-111 | L3 | `s04-insight-oui-non` | oui | F | recognition | yes |
| 5 | QA-L03-114 | L3 | `s05-fill-refuse-politely` | Merci | C | recognition | yes |
| 5 | QA-L03-115 | L3 | `s05-fill-refuse-politely` | Non merci | C | recognition | yes |
| 5 | QA-L03-116 | L3 | `s05-fill-refuse-politely` | Oui merci | C | recognition | no |
| 5 | QA-L03-117 | L3 | `s05-fill-refuse-politely` | non | F | recognition | yes |
| 5 | QA-L03-118 | L3 | `s05-fill-refuse-politely` | non merci | F | recognition | yes |
| 5 | QA-L03-119 | L3 | `s05-fill-refuse-politely` | oui | F | recognition | yes |
| 5 | QA-L03-146 | L3 | `s10-recap-negation` | non merci | C | recycled | yes |

Within this batch, three items deserve the reviewer's attention first:

- **L1 `s11-weave-the-order`** — the only shipped constitutive package (`un thé`). If the package boundary is wrong, the Supported evidence claim is wrong too.
- **L1 `s03-fill-polite-verb`** — the register lesson. `je veux` is authored as a *register* miss, not a grammar error.
- **L3 `s07-weave-ce-n-est-pas-ici`** — accepted alternatives here drop the apostrophe in `n'est` (finding C5), and `ce n'est pas` is a canon protected frame.

---

## 11. Open questions for the founder

These cannot be resolved from the code, and are stated rather than guessed:

1. **Should the other 19 production sentences be registered?** Only the two pilot payloads carry sentence identity today (23 unregistered production *rows*, 19 distinct sentences). Registering the rest is a product decision, not a QA finding.
2. **Are the apostrophe-dropping alternatives intentional?** 12 accepted alternatives contradict the documented normalizer policy. Either the policy or the alternatives is wrong.
3. **Which of the 5 no-op alternatives should stay?** They are already accepted by normalization and add nothing but review surface.
4. **Is `un café` / `café` one chunk or two?** The screen piece says `un café`; the registry item `noun-cafe` says `café`. Same question for `une question` / `question`. This is the chunk-segmentation call the Content Bible §18.3 puts under French QA.
5. **Are the 9 declared-but-never-targeted items intentional ledger entries or dead declarations?**
6. **Is a named French reviewer engaged?** Content Bible §18.5 makes the gate a Stage-C prerequisite. Nothing in this pack can substitute for it.

---

*Generated from the shipped lesson data at commit `45fb5f6`. No learner content, registry, evaluator or runtime behaviour was changed to produce it.*
