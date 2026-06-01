# Learning Engine v0.1 — Baseline Status / Handoff

**Date:** 2026-06-01
**Status:** Baseline landed on `main`. Docs/handoff only — no runtime adoption yet.

The contract-driven learning-engine v0.1 baseline is now merged on `main`. It runs
**parallel** to the live v7 lesson system and is not yet wired into any user-facing
flow. This note records the landed scope, the validation state, the guardrails that
held, the modeling decisions locked in, and the recommended next step.

## Baseline summary

```
Item Registry → Lesson Contract → Discriminated Exercise Blueprints → Validator → Dev Preview
```

- **Item Registry** — canonical, colon-namespaced learning items.
- **Lesson Contract** — per-lesson ownership buckets that constrain what each lesson may ask.
- **Discriminated Exercise Blueprints** — `ExerciseBlueprint` as a discriminated union keyed by `operation`.
- **Validator** — pure `validateContent` / `formatReport`, run via `npm run validate:content`.
- **Dev Preview** — read-only fixture viewer at `/dev/learning-engine-preview`, `__DEV__`-guarded and unlinked.

Location: `lemot-app/content/learning-engine/` (+ dev-only `lemot-app/app/dev/learning-engine-preview.tsx`).

## Merged PRs / commits

| PR | Commit | Summary |
|----|--------|---------|
| #18 | `86fdc0e` | L1 fixture + pure validator (`validateContent`, `scripts/validateContent.ts`, `npm run validate:content`) |
| #19 | `e12b600` | Dev-only read-only preview screen (`__DEV__`-guarded, unlinked) |
| #20 | `94b8e34` | Fixture shape hardening — `ExerciseBlueprint` discriminated union, `ItemId` alias, `Finding.code` union |
| #21 | `35c54e6` | L14 y-light boundary fixture + `recognition_only_hook` preset |
| #22 | `86c10f4` | `defaultOwnership` rename + recognition `displayAnswer` cleanup |

`main` HEAD at time of writing: `86c10f4`.

## Current validation

| Check | Result |
|-------|--------|
| `npm run validate:content` | 0 hard errors / 0 warnings / 0 info |
| `npm run typecheck` | clean (`tsc --noEmit`, exit 0) |

## Guardrails (held across #18–#22)

- **Live lesson runtime untouched** — no changes to `content/lessons/v1`, `content/itemRegistry.ts`, or `components/lesson-v1`.
- **Public navigation untouched** — no changes to `app/(tabs)/`.
- **Dev preview remains `__DEV__`-guarded and unlinked** — not present in tabs or Home; reachable only via direct dev route.

## Modeling decisions

- **Colon item ids are canonical** in the learning-engine (`chunk:bonjour`, `noun_phrase:`, `grammar_piece:`, `error_pattern:`). Deliberately divergent from the live dash-id registry; reconciliation deferred.
- **Preset ownership is a default, not a strict truth** — the field is `defaultOwnership`, overridable per lesson (e.g. an active item carried in as supported is a normal lesson-level override, not a warning).
- **Recognition `displayAnswer` is not production `targetText`** — recognition / meaning answers (e.g. an English gloss) use `displayAnswer`; only production exercises use `targetText`.
- **Recognition-only in a production bucket stays a hard error** — a `recognitionOnly`-default item placed in `activeNew` / `supported` is a hard validation error.

## Open loose ends

- `graphify-out/` ignore decision (currently untracked at repo root and under `lemot-app/`; not added to `.gitignore` yet).
- Branch cleanup optional — `claude/learning-engine-model-cleanup` (PR #22) was kept after merge, can be deleted at will.
- EAS rebuild + physical-device smoke test are operator-side and outside this baseline.

## Next recommended step

Add **one more boundary fixture** — likely **L15 devoir/falloir-light** or **L18 futur proche** — before attempting any renderer migration. This widens the fixture coverage of boundary/recognition cases while the engine is still pure data + validator, keeping the eventual renderer migration honest against a broader contract surface.
