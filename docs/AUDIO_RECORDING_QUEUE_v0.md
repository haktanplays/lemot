# Audio Recording Queue v0

> **Status:** planning/docs only. No audio runtime work, no asset files, no player changes.
> **Purpose:** record the hardcoded human-audio needs introduced by the L1-L5 Kademe 2
> enrichment batch (PR #174) so the future recording pass does not have to re-scan
> lessons. Canon: hardcoded human audio + early shadowing is locked product direction
> (S1, `docs/CAIRN_PRODUCT_ANSWERS_2026_07.md`); this queue feeds that pass.
> Strings below reflect the post-trim state of the PR #174 branch (ghost trim of
> 2026-07-04 already applied).

## How to use this file

- Each row is a learner-facing French string that TTS currently reads and that the
  recording pass should replace with (or add as) human audio.
- "Recording note" is direction for the voice talent / session, not app copy.
- New lessons that add TTS-facing strings should append here in their own PR.
- Pre-#174 strings (L0-L15 baseline) are NOT enumerated here yet; importing that
  backlog is a separate task. This file starts the convention with the #174 delta.

## Special recording notes (read first)

| String | Note |
|---|---|
| `Vous pouvez répéter ?` | MUST be recorded with a **rising intonation**. The taught form is the non-inverted question; inversion (`Pouvez-vous... ?`) stays recognition-only and is not recorded. The rising contour *is* the grammar here — the model itself teaches that intonation asks the question. |
| `Je ne comprends pas.` | Calm, help-seeking, matter-of-fact. Not dramatic, not apologetic, not distressed. It is a tool the learner reaches for, not a confession. |
| `Excusez-moi.` | Soft and natural, as a polite attention opener toward a stranger. Not sharp, not an apology tone. |
| `fatigué` / `Je suis fatigué.` | Record **once**, masculine form. `fatiguée` is accepted in Weave answers where relevant; pronunciation is equivalent for current purposes, so no separate feminine recording is needed. |

## New strings from PR #174 (by lesson)

### L1 — Survival Kit (`v1-lesson-001`)

| String | Surface | Note |
|---|---|---|
| `Je voudrais un thé.` | s01 insight example | — |
| `Je voudrais un croissant.` | s01 insight example | croissant is ghost tier; the sentence is still read aloud |
| `Excusez-moi.` | s07b rescue-kit insight example | see special note above |
| `Je ne comprends pas.` | s07b insight example; s07c weave model | see special note above |
| `Vous pouvez répéter ?` | s07b insight example; s07c weave model | rising intonation — see special note above |
| `Je ne comprends pas. Vous pouvez répéter ?` | s07c weave model answer (pair, one breath apart) | flat statement then rising ask; the contrast is the lesson |
| `Bonjour, je voudrais un thé, s'il vous plaît.` | s08 say-it natural alternative | — |

### L2 — Être seed (`v1-lesson-002`)

| String | Surface | Note |
|---|---|---|
| `Je suis fatigué.` | s06 insight example; s06b weave model | masculine recording only — see special note |
| `Je suis là.` | s06 insight ghost example | — |

### L3 — Non (`v1-lesson-003`)

| String | Surface | Note |
|---|---|---|
| `Pas de problème.` | s04 insight ghost example | relaxed, reassuring |
| `Oui, merci.` | s05b weave model answer | warm acceptance; oui is an answer word here |

### L4 — J'ai (`v1-lesson-004`)

| String | Surface | Note |
|---|---|---|
| `J'ai soif.` | s01 insight example; s07 say-it alternative | — |
| `J'ai une idée.` | s01 insight example; s06b weave model | — |
| `J'ai froid. J'ai chaud.` | s01 insight ghost example | — |

### L5 — Un, une (`v1-lesson-005`)

| String | Surface | Note |
|---|---|---|
| `un thé` | s02 insight example; s05 weave chip | — |
| `une table` | s02 insight example; s04c fill | — |
| `Une table, s'il vous plaît.` | s04c fill reveal natural | — |
| `Je voudrais un thé.` | s05 weave accepted alternative | shared with L1; record once |

### L6 — Un petit moment (`v1-lesson-006`)

| String | Surface | Note |
|---|---|---|
| `Excusez-moi, j'ai une question. Merci. Au revoir.` | s09 reveal natural alternative | payoff recombination; unhurried, everyday pace |

## Trimmed (do NOT record)

Removed from lesson ghost surfaces in the 2026-07-04 Payload Economy review; they
live in the Practice Pool candidate quarry (`docs/audits/`) for later slices:

- `Excusez-moi, madame.` / madame / monsieur (address-register lands later as its own register/service slice)
- `un restaurant, une maison` (L5 package-pattern extra example)

## Seen-layer lines (SW175) — NOT queued

The seen-layer "you may hear" cards (branch `content/seen-layer-l1-l15`,
`docs/workstreams/SW175_seen_layer_v0.md`) add ~90 heard-French exposure
lines across L1-L15. They are TTS-synthesized exposure and are deliberately
NOT queued for human recording in the first pass: the mastery path records
first. Queueing seen lines (which, being "what the world says", arguably
benefit most from real voices) is a later, explicit decision.

## Out of scope for this queue

- Audio runtime, playback, or asset pipeline work.
- Recording logistics (talent, format, storage) — Operator-side decisions.
- The pre-#174 L0-L15 string backlog (separate import task).
