# Learning Engine — L11 → L12 → L16 Chain Smoke Baseline

**Date:** 2026-06-02
**Current `main` HEAD:** `5b4470c`
**Status:** Docs-only checkpoint. No runtime adoption — the learning-engine remains a
validateable, dev-only experiment parallel to the live v7 lesson system, not wired into any
user-facing flow.

This note records the state of the first connected executable lesson **chain** —
**L11 (Pouvoir-light) → L12 (Est-ce que wrapper) → L16 (Integration + A Small Moment seed)** —
after PRs **#37** and **#38**, with all three lessons on-device smoke-verified. It sits alongside
the broader status notes ([`learning-engine-interactive-baseline.md`](./learning-engine-interactive-baseline.md),
[`learning-engine-v0.1-baseline.md`](./learning-engine-v0.1-baseline.md)) and the
[`boundary-recognition-ui-decision.md`](./boundary-recognition-ui-decision.md) decision.

## Chain summary

```
L11 Pouvoir-light        →  owns the base pouvoir-light clauses (active production)
        │  (SHARED carry-in)
        ▼
L12 Est-ce que wrapper   →  consumes those base clauses as supported carry-in
        │
        ▼
L16 Integration          →  recombines L11 / L12 / L15 / SHARED items — ZERO new items
```

- **L11** owns the base pouvoir-light clauses and first-teaches the SHARED carry-in chunks.
- **L12** consumes those base clauses as **supported** carry-in for its «est-ce que» wrapper.
- **L16** recombines items from **L11 / L12 / L15 / SHARED** into a small human situation,
  introducing **zero new items**.

## L11 — Pouvoir-light (PR #37, `6b03e7c`)

- Narrow modal doorway: fixed «je peux» / «vous pouvez» chunks for ability / permission /
  help-repeat requests. register_switch intentionally omitted (avoids a politeness ladder
  toward the conditional).
- **SHARED reconciliation retired the L12 proxy debt:** `chunk:je-peux-faire-ca` and
  `chunk:vous-pouvez-m-aider` are now defined **exactly once** in `SHARED_ITEMS`
  (`firstIntroducedIn: "L11"`). L11 owns them `activeNew`; L12 keeps them `supported`.
- Conditional (`je pourrais` / `vous pourriez`), full pouvoir paradigm, and possibility nuance
  are recognition-only + blocked.
- **On-device smoke: PASS.**

## L12 — Est-ce que / Yes-No Question Wrapper (PR #35, `cc58081`)

- Narrow "gateway grammar" wrapper: place «est-ce que» in front of an already-owned clause to
  make a yes/no question. No full question formation, no inversion, no `qu'est-ce que`, no
  question words, no y/en.
- Inversion / `qu'est-ce que` / question-word forms are recognition-only + blocked.
- **On-device smoke: PASS.**
- The learner-facing presentation of its boundary recognition cards is governed separately by
  [`boundary-recognition-ui-decision.md`](./boundary-recognition-ui-decision.md).

## L16 — Integration + A Small Moment Seed (PR #38, `5b4470c`)

- **First zero-new-item cross-lesson recombination fixture.** It has **no `L16_ITEMS` map** —
  it owns its items purely via contract buckets (`supported` / `recycled`); `items.ts` was not
  touched. `L16_CONTENT_FIXTURE` merges `[SHARED_ITEMS, L11_ITEMS, L12_ITEMS, L15_ITEMS]`
  (L14/L18 deliberately excluded).
- **A Small Moment seed uses the existing `context_chain` operation only** — a short situation
  prompt → recognize the need → produce a fixed model answer, step by step. **No new operation,
  no schema change, no AI scoring, no open chat, no Natural Reveal, no persistence.** Open output
  is blocked structurally (`blockedOperations: [open_production, free_conversation]`).
- **Fully smoke-verified PASS** (full smoke + a targeted follow-up that closed the two
  previously-unconfirmed items: ex08 help-seed completion and Back behavior).

## Smoke environment

- **Device:** Pixel_8 AVD (`sdk_gphone64_x86_64`)
- **OS:** Android 15 / SDK 35
- **Runtime:** Expo Go 55.0.5, Metro on `:8081`, `adb reverse tcp:8081`
- **Route:** `/dev/learning-engine-player` (cold deep-link; `__DEV__`-guarded, unlinked)

All three lessons were exercised through their interactive operations (recognition reveal/hide,
fill correct/wrong, build correct/wrong/reset, and — for L16 — both `context_chain` A Small
Moment seeds to completion).

## Product insight

The L16 `context_chain` / A Small Moment seed — a situation prompt followed by sequential,
fixed-answer steps that build toward one controlled response — **visually resembles the future
chained context-card / enriched-flashcard direction.** The current dev player is a **debug
surface only**: it exposes lesson/exercise IDs, the `context_chain` operation badge, and a bare
type-and-check stepper. A future **learner UI** should transform these into polished context
cards: hide the technical IDs/operation labels, present the situation as a calm scene, make step
progression smoother, and handle the keyboard better for bottom-of-list inputs. This is
consistent with the boundary-recognition learner-UI decision — **debug surface ≠ learner UI.**

## Known caveats

- **Punctuation normalization:** `normalizeAnswer` strips trailing punctuation, so casual
  intonation questions may accept a no-question-mark answer — e.g. `Je peux faire une pause` is
  accepted for target `Je peux faire une pause ?`. This is expected behavior, recorded as a
  caveat, not a failure.
- **Bottom-of-list keyboard friction:** in the dev player, the last card's input/Check button
  can sit behind the soft keyboard with little scroll headroom (the L16 ex08 follow-up worked
  around this by closing the keyboard via the IME action key after typing).
- **Back behavior:** the dev player's Back currently returns to the live Home route. Safe (no
  crash / red screen), but it is debug behavior, not a designed learner flow.

## Non-goals / still not done

- No live renderer migration.
- No public navigation adoption (routes stay unlinked + `__DEV__`-guarded).
- No mastery / events / persistence.
- No AI / Natural Reveal implementation.
- No Practice Pool / Mon Lexique integration.
- No final learner UI polish yet.

## Next candidates

- Recognition-only-distractor validator policy review.
- Next lesson fixture.
- A future learner-UI / context-card presentation pass.
- Eventual renderer migration — only after enough fixture coverage.
