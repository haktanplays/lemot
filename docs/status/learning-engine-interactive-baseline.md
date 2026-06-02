# Learning Engine — Interactive Baseline Status / Handoff

**Date:** 2026-06-02
**Current `main` HEAD:** `d1f5d93`
**Status:** Interactive baseline landed on `main`. Docs/handoff only — still parallel to live v7, no runtime adoption.

This note records the state of the contract-driven learning-engine after PRs **#18–#31**.
It extends [`learning-engine-v0.1-baseline.md`](./learning-engine-v0.1-baseline.md) (which
covered #18–#22). Everything here remains a **validateable, dev-only experiment** that runs
parallel to the live v7 lesson system and is **not** wired into any user-facing flow.

## Pipeline (now proven end-to-end in dev)

```
Item Registry → Lesson Contract → Discriminated Exercise Blueprints → Validator
              → Dev Read-only Preview → Dev Interactive Player (fixture-selectable)
```

Location: `lemot-app/content/learning-engine/` (+ dev-only `app/dev/learning-engine-preview.tsx`
and `app/dev/learning-engine-player.tsx`).

## Scope summary — what landed across #18–#31

| PR | Commit | Summary |
|----|--------|---------|
| #18 | `86fdc0e` | L1 fixture + pure validator (`validateContent`, `scripts/validateContent.ts`) |
| #19 | `e12b600` | Dev-only read-only preview screen (`__DEV__`-guarded, unlinked) |
| #20 | `94b8e34` | Fixture shape hardening — `ExerciseBlueprint` discriminated union, `ItemId`, `Finding.code` union |
| #21 | `35c54e6` | L14 y-light boundary fixture + `recognition_only_hook` preset |
| #22 | `86c10f4` | `defaultOwnership` rename + recognition `displayAnswer` cleanup |
| #23 | `e04f4be` | v0.1 baseline status note (docs-only) |
| #24 | `06cbcf4` | L15 devoir/falloir-light obligation boundary fixture |
| #25 | `f6fa569` | L18 futur-proche boundary fixture |
| #26 | `26fa0f9` | Shared carry-in item registry (`SHARED_ITEMS`) + duplicate-ID guard (`mergeItemMapsStrict`) |
| #27 | `0c386b9` | First interactive dev renderer slice (L1): recognition + fill |
| #28 | `95272e0` | Dev player: `context_chain` stepper + `register_switch` type/check interactive |
| #29 | `7637655` | `BuildTile` schema + 4 build-tile validator rules + interactive `BuildCard` (L1 tiles) |
| #30 | `d4c875f` | Build tiles for L14/L15/L18 (data-only; safe owned/producible distractors) |
| #31 | `d1f5d93` | Dev player fixture selector (L1/L14/L15/L18) — **current `main` HEAD** |

## What is now proven

- **Contract-driven fixture validation** — pure `validateContent` runs the aggregate fixture; `npm run validate:content` is the gate.
- **Strict item / production boundaries** — ownership buckets + `allowedProduction`/`blockedProduction`; recognition-only items can be shown but never required as production targets.
- **Shared carry-in registry + duplicate-ID guard** — `SHARED_ITEMS` defines reused items once; `mergeItemMapsStrict` hard-fails on cross-map duplicate IDs at import.
- **Build tile schema + validator** — `BuildTile { itemId, answerIndex? }`; hard-error rules for answer/target mismatch, non-contiguous `answerIndex`, reconstruction mismatch (build-normalized), and unsafe distractors.
- **Dev player operation coverage** — all 5 operation types interactive (see below).
- **Fixture selector** — one dev player can mount L1/L14/L15/L18 (default L1); switching re-keys cards so local state resets.
- **Emulator smoke** — real Android (Pixel_8 AVD / Android 15 / Expo Go 55) PASS across L1/L14/L15/L18 selection, including build correct/wrong paths, scroll/back, no red screen.

## Current supported fixtures

- **L1** — Survival Kit (greet + polite café request)
- **L14** — Y-light / Place Pronoun Doorway
- **L15** — Devoir/Falloir-light Obligation Doorway
- **L18** — Futur Proche Doorway / Strong Preview

## Current interactive operations (dev player)

| Operation | Interaction |
|-----------|-------------|
| `recognition` | tap-to-reveal (meaning / canonical answer), hide |
| `fill` | type → check against normalized `targetText` |
| `register_switch` | read the too-direct form, type the polite form, check |
| `context_chain` | per-step stepper (Step N / total), type/check each, completion |
| `build` | assemble item tiles in order; answer checked as a tile **sequence**; reset / remove; tiles-less builds render read-only |

## Current non-goals / still not done

- Live renderer migration (engine stays parallel to v7; nothing user-facing)
- Public navigation (dev routes remain unlinked + `__DEV__`-guarded)
- Persistence / mastery / events (everything is local component state)
- Practice Pool integration
- Mon Lexique integration
- AI / Natural Reveal
- TTS / audio
- Recognition-only distractor policy (still disallowed by the validator)
- Broader lesson authoring (only L1/L14/L15/L18 exist)

## Open decisions

- **Recognition-only distractor fork** — whether to ever allow recognition-only / boundary forms as build distractors (the most pedagogically tempting contrasts), which would require a deliberate validator relaxation + a new finding-code policy. Currently disallowed.
- **Next lesson fixture(s)** — which lesson(s) to author next, and whether to deepen existing boundary lessons.
- **Dev player's future** — keep it strictly debug-only, or evolve it into a renderer foundation for eventual live adoption.
- **`graphify-out/` artifacts** — `graphify-out/` and `lemot-app/graphify-out/` remain untracked working-tree artifacts (never staged); decide whether to `.gitignore` them or leave as-is.

## Recommended next steps

1. Keep the **recognition-only distractor fork** as a deliberate, separate policy review — do not loosen the validator quietly.
2. Consider authoring the **next executable lesson fixture** to widen coverage before any runtime work.
3. Consider a **content-engine / Practice Pool skeleton** later, once fixture coverage justifies it.
4. Plan **live renderer migration** only after enough fixture coverage and a deliberate go-ahead — not before.

## Guardrails (held across #18–#31; keep holding)

- No recognition-only item as a production target.
- No `blockedProduction` item as a production target.
- No `targetText` parsing for build — build correctness is an **item-ID sequence** match.
- **Item IDs over string parsing** — ownership and answers are verified via IDs, not by parsing French.
- **Validator-first workflow** — `npm run validate:content` must stay `0 / 0 / 0`.
- **Review → smoke → commit discipline** — one scoped PR per step; strict review, real-emulator smoke where a UI path changed, then commit.

## Current validation

| Check | Result |
|-------|--------|
| `validate:content` | 0 hard errors / 0 warnings / 0 info |
| `typecheck` (`tsc --noEmit`) | clean |
