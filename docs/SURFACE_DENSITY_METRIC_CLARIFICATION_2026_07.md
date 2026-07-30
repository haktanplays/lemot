# Surface Density Metric — Clarification (2026-07-04)

> Canon/planning correction, issued by Haktan. Docs-only: this document
> changes NO lesson, registry, validator, or runtime code. It supersedes
> §9 of `docs/PAYLOAD_ECONOMY_v0.md` (the cumulative reading) and reframes
> how PR #174 relates to the 30-35 target. Precedence: this clarification >
> the superseded §9 block; everything else in Payload Economy v0 (layers,
> Kademe 2 ceiling, survival formulas, oui decision, families, execution
> order) stands unchanged.

## 1. What was misread

The 30-35 number in Payload Economy v0 §9 was implemented and reported (in
PR #174's metric table and in two lesson designNotes) as:

```text
WRONG:  cumulative L5-end recognizable count, carryover-inclusive
        (producible + recognition items + ghosts, summed across L1-L5)
```

Haktan's intended target is:

```text
RIGHT:  per lesson, EXCLUDING carryover, the learner should encounter
        roughly 30-35 fresh seen surfaces / chip candidates —
        of which only a small subset enters mastery/support production.
```

The two readings point in opposite directions. The cumulative reading made
~35 look like a ceiling to trim down to. The per-lesson reading is a
density FLOOR the current lessons sit far below: today a typical L1-L5
lesson introduces on the order of 5-10 fresh surfaces, not 30-35.

## 2. Corrected counting taxonomy (four buckets, per lesson)

```text
1. Mastery chips        active-new production items. 1-3 per lesson
   (active)             (Kademe 2, unchanged). The spine.

2. Supported payload    +2-3 per lesson (Kademe 2, unchanged). Produced
                        with scaffolding; appears at least twice.

3. Seen surfaces        everything ELSE the learner freshly encounters in
   (fresh, the 30-35)   the lesson: ghosts, example-copy sentences, reveal
                        alternatives, recognition-only look-ahead (W2),
                        heard-but-not-produced variants. Target: the whole
                        lesson exposes roughly 30-35 FRESH surfaces/chip
                        candidates, buckets 1+2 included in the count but
                        never inflated to reach it.

4. Carryover            recycled items from earlier lessons (retrieval,
                        integration, spaced reuse). Counted SEPARATELY.
                        Never counts toward the 30-35. Never capped by it.
```

Rules that fall out of this:

- **The 30-35 is a local, per-lesson density target for bucket 3's**
  **umbrella (fresh encounters), not a cumulative inventory metric.**
- **Carryover is excluded.** An integration lesson heavy on carryover
  (L6-style) can have low fresh density by design; that is not a failure.
- **Production stays small.** The Kademe 2 production ceiling (1-3 active,
  +2-3 supported) is untouched by the density target. Density is met with
  exposure, not with production requirements.
- **Do not inflate piecesUsed.** Recap chips remain the produced/owned set
  only. No "30 required chips." No fill/weave may require a seen-layer item.
- Cumulative counts (the old 18-22 producible L5-end line) remain useful as
  a secondary mastery-path metric, but they are no longer the target the
  30-35 refers to. Whether L15-end cumulative bands get restated is part of
  the #175 workstream below.

## 3. Status of PR #174 under the corrected metric

PR #174 (L1-L5 Kademe 2 enrichment) is hereby classified as
**mastery-path enrichment**: it fixes the four functional holes (rescue
pair, oui answer, excusez-moi, fatigue/soif), adds cargo to existing
engines, locks the SURVIVAL_FORMULAS lint class, and keeps the production
ceiling. All of that is correct and stands.

It is **NOT a surface-density solution**. Under the corrected metric,
L1-L5 remain far below ~30-35 fresh seen surfaces per lesson. #174 should
be reviewed and (after Haktan screen review + Operator smoke) merged on its
mastery-path merits; the density gap is the next workstream's job, not a
reason to widen this PR.

Two consequences inside #174's own text:

- The PR body's "Payload Economy metric check" table and the L1/L5
  designNote sentences that cite "the 30-35 band" use the superseded
  cumulative reading. The **ghost trim itself stands** — madame/monsieur
  and un restaurant/une maison were removed for lesson focus (address
  register deferred to its own slice; four real packages already carry the
  un/une pattern), and those items return naturally as seen-layer or
  Practice Pool material under #175. No lesson re-edit is required now.
- No further trimming or padding of #174 should be done in the name of the
  metric. The batch is frozen for screen review as-is.

## 4. Per-lesson local surface-density target (v0 definition)

For each TEACHING lesson (integrations exempt):

```text
fresh_seen(L) = count of distinct surfaces the learner encounters in L
                for the first time on the path, deduped by surface form,
                including buckets 1+2, excluding all carryover
target:         roughly 30-35 (soft band, pedagogy over arithmetic)
hard rules:     production ceiling unchanged (1-3 active, +2-3 supported)
                seen-layer items never required for correctness
                piecesUsed never inflated
```

Open definition questions #175 must settle before measuring:

1. Does a fresh example SENTENCE count as one surface, or do its
   novel items count individually? (Proposed: the sentence counts once,
   plus once per genuinely novel item inside it.)
2. Do near-variants (un cafe / le cafe; fatigue / fatiguee) count as one
   surface or two? (Proposed: one, keyed on the lexical item.)
3. Do W2 look-ahead reveals (3-4 lessons ahead, recognition-only) count
   toward the target lesson's density or the future lesson's? (Proposed:
   toward the lesson where they are SEEN.)
4. How do L15-end cumulative bands get restated, if at all?

## 5. Proposed workstream: #175 Surface Density / Seen Layer

Proposal only — not started, not authorized by this doc.

```text
Goal      Bring each L1-L5 (then L7+) teaching lesson to ~30-35 fresh seen
          surfaces per lesson WITHOUT touching the production ceiling,
          piecesUsed, chip canon, or lesson calm.

Step 0    Metric definition + measurement: settle §4's open questions,
          extend the audit extraction to report per-lesson fresh_seen and
          carryover columns. Docs/tooling only, not smoke-bearing.

Step 1    Seen-layer design canon: WHERE density lives per screen type —
          insight example copy, meet-card variant lines, reveal
          naturalAlternatives, W2 look-ahead reveal exposure, heard-only
          lines. Includes the "how much is too much per card" rule so
          density never becomes clutter. Docs only.

Step 2    L1-L5 seen-layer batches (smoke-bearing, own PR chain, after
          #174 merges): raise fresh_seen per lesson toward the band using
          Step 1's placements. Ghost re-entry candidates include the #174
          trimmed items (madame/monsieur, un restaurant/une maison) and
          the Practice Pool candidate quarry.

Step 3    L7+ application as the content line advances; Practice Pool
          packs pick up whatever the lesson band cannot hold.

Gates     Step 2+ requires Haktan pedagogical review + Operator device
          smoke (visible lessons). Every batch reports fresh_seen /
          carryover actual-vs-target from Step 0's tooling.

Non-goals No piecesUsed inflation, no new required chips, no new engines,
          no production-ceiling change, no runtime UI change, no Home cap
          change, no learning-engine change.
```

## 6. Immediate effect

- PR #174: paused for merge (already draft); review proceeds on
  mastery-path merits; body updated to point here.
- `docs/PAYLOAD_ECONOMY_v0.md` §9: superseded by this document (pointer
  added in place; the original block kept for history).
- No lesson, registry, validator, or runtime file changes under this
  clarification.
