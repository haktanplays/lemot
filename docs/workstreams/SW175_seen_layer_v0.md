# SW175 — Seen Layer v0 (L1-L15 surface-density pass)

> Step spec for the #175 Surface Density / Seen Layer workstream proposed in
> `docs/SURFACE_DENSITY_METRIC_CLARIFICATION_2026_07.md` §5. This file records
> what the first implementation batch actually did and the rules it locked.
> Branch: `content/seen-layer-l1-l15` (stacked on PR #174's branch).

## Goal

Raise each TEACHING lesson toward the corrected per-lesson density target
(~30-35 fresh seen surfaces, carryover excluded) using exposure only, without
touching the production ceiling, piecesUsed, chip canon, or lesson calm.

## What shipped in this batch

One "you may hear" insight-card (insightType `culture-bite`) per teaching
lesson, placed after the lesson's final production (say-it) and before the
recap, so exposure never competes with output. 12 lessons:

| Lesson | Card | Theme (scene-anchored) | Lines |
|---|---|---|---|
| L1 | s08b | The counter talks back (service lines, c'est combien seed, monsieur/madame as heard address) | 10 |
| L2 | s07b | Voices around the door (arrival + content/désolé/en retard state family) | 8 |
| L3 | s09b | The many shades of no (je ne sais pas / je ne veux pas / pas idioms / si) | 8 |
| L4 | s07b | The rest of the family (vous avez recognition, sommeil, besoin seed) | 7 |
| L5 | s07b | A tableful of packages (cognate packages + la carte / l'addition as heard le/la/l') | 7 |
| L7 | s06b | Leaving has its own music (goodbye family) | 8 |
| L8 | s06b | Answers you'll get back (direction answers to c'est où — functionally load-bearing) | 9 |
| L9 | s06b | Around the pause (break soundtrack; on fait heard-not-owned) | 8 |
| L11 | s08b | What permission sounds like back (answers to je peux; Allez-y seeds L14 y at W2 range) | 7 |
| L12 | s07b | Questions flying around you (wrapped questions; pourquoi/parce que wave) | 7 |
| L14 | s07b | Small words fly fast (doorway idioms; Vas-y/Allons-y as frozen y expressions) | 7 |
| L15 | s06b | Obligation, overheard (partir, on doit heard; no y, no il faut que) | 7 |

Integration lessons L0 (bridge), L6, L10, L13 are exempt per the
clarification (carryover-heavy by design; low fresh density is not a failure).

## Locked design rules (v0)

1. **Exposure only.** Seen lines are never produced, never chips, never in
   piecesUsed, never fill/weave requirements, never registry entries, never
   learningItems. The structural lint's chip rules are untouched.
2. **Not a phrasebook.** Every card is anchored to the lesson's scene and
   framed as what the WORLD says around the learner's owned move (answers to
   their question, the counter's replies, the room's soundtrack). Word-list
   feel is a defect.
3. **One card per lesson, capped at ~7-10 lines.** Density beyond the card
   goes to the Practice Pool, not to more cards.
4. **Placement: after the final production, before the recap.** Exposure is
   the wind-down; it never interrupts the input-to-output ladder.
5. **Per-lesson bans still bind.** L11 card has no est-ce que; L12 card has
   no qu'est-ce que and no inversion; L14/L15 cards respect the y / il y a /
   en / il faut que qaCheck bans. Deferred systems may appear only as frozen
   heard idioms, explicitly glossed.
6. **W2 look-ahead honored.** Seeds point 3-4 lessons ahead at most
   (Allez-y in L11 for L14's y; c'est combien in L1 for a future money slice
   is a named-slot exception recorded here).
7. **TTS is synthesis-only for seen lines.** They are NOT queued for human
   recording in the first pass (mastery path records first); see the note in
   `docs/AUDIO_RECORDING_QUEUE_v0.md`.
8. **Every enriched lesson carries a designNote** naming the card as seen
   layer v0 and pointing at the clarification doc.

## Estimated fresh_seen after this batch (manual, pre-Step-0 tooling)

Counting per the clarification §4 proposals (sentence = 1 + 1 per genuinely
novel item; variants keyed on lexical item; carryover excluded):

| Lesson | Before (approx) | After (approx) | Band (30-35) |
|---|---|---|---|
| L1 | ~14 | ~32 | in band |
| L2 | ~9 | ~26 | below, closer |
| L3 | ~11 | ~28 | below, closer |
| L4 | ~11 | ~26 | below, closer |
| L5 | ~10 | ~25 | below, closer |
| L7 | ~6 | ~22 | below |
| L8 | ~5 | ~23 | below |
| L9 | ~5 | ~21 | below |
| L11 | ~7 | ~22 | below |
| L12 | ~4 | ~19 | below |
| L14 | ~7 | ~21 | below |
| L15 | ~6 | ~20 | below |

These are honest manual estimates, not tool output. Two consequences:
- The v0 card gets every lesson roughly two-thirds of the way to the band.
  Closing the rest should come from richer insight examples and reveal
  alternatives (in-flow exposure), not from a second list card — deliberately
  left to the next pass so calm can be judged on-device first.
- #175 Step 0 (measurement tooling + counting-rule lock) remains open and
  should replace this table.

## Not in this batch

No second card per lesson, no runtime UI, no registry/learningItems changes,
no piecesUsed changes, no Practice Hub, no Exercise System v1, no L16, no
Home cap change, no human-audio queueing of seen lines, no L0/L6/L10/L13
changes.
