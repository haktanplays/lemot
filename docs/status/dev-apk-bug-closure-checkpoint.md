# Dev APK Bug Closure Checkpoint

**Date:** 2026-06-10
**Current `main` HEAD:** `6a75c2c` (or newer)
**Status:** Docs-only checkpoint. No runtime change. Records what the Dev APK known bugs and
open-risk inventory closed, what remains open, and what must not be touched without emulator or
physical-device smoke.

This note sits alongside [`dev-apk-v1-freeze-checkpoint.md`](./dev-apk-v1-freeze-checkpoint.md)
and the founder-self-learning checkpoints in this folder. It is written against the
[`DEV_APK_MVP_CANON`](../DEV_APK_MVP_CANON.md) scope and Rule 7 (Dev APK scope is sacred) of
[`MASTER_PIPELINE_v1.2.1`](../MASTER_PIPELINE_v1.2.1.md).

---

## 1. Current status

- Current `main`: `6a75c2c` or newer.
- PR #100 merged: Dev APK feature-scope guard.
- PR #101 merged: v1 learner-facing copy guard.
- `npm run typecheck`: clean.
- `npm run validate:content`: clean (Hard errors 0, Warnings 0, Info 0).
- `npm run test:learning-engine`: clean at 79 passed or newer.

---

## 2. Closed findings

**F1 Validator gap:**
Partially closed by PR #101. Structured Lesson 1 v1 screen copy now has a conservative
learner-facing guard (em dash, en dash, and banned gamification or internal terms, walking
`lesson001.screens` only). Known remaining gap: TSX-embedded copy is not covered yet.

**F2 Dev APK feature scope:**
Closed by PR #100. Dev APK future-product flags are locked by test
(paywall, revenueCat, aiChat, wordGraph, monLexique, leCarnet, v1LessonEngine all false).

**F4 Flag-gated paywall and premium banner reachability:**
Covered by PR #100, because the paywall flag must remain false in dev-apk. The banner stays
unreachable in the Dev APK build while that assertion holds.

---

## 3. Still open

**F3 Home Auth and Account surface:**
Open. The unconditional Sign In and Account modal remains a Home dev-apk concern.
Do not fix without an explicit Home-gate task. Prefer emulator or device review before any
runtime change.

**F5 Home completion label:**
Open. The v1 smoke entry still says "Begin the first lesson." after completion.
This is minor. Do not fix unless a Home-gate task says it blocks or confuses testers.

---

## 4. Smoke bucket

**F6 SayIt AI and offline real behavior:**
Needs emulator or physical-device confirmation.

**F7 First-run, restart, and storage-reset:**
Needs emulator or physical-device confirmation.

**F8 Android viewport, keyboard, and tap targets:**
Needs emulator or physical-device confirmation.

---

## 5. Do not touch without smoke

- Home visual polish.
- Auth and Account hide implementation.
- Completion-state Home UI changes.
- PR2C visual pass.
- V4-B implementation.
- Daily Review rewrite.
- Progress rewrite.
- Practice or Chat expansion.
- Mon Lexique runtime integration.
- New lesson mechanics.

---

## 6. Future guardrail gap

CompletionView, Lesson Zero, How Weave Works, and Home copy are not yet guarded structurally.
Do not raw-grep them, because of comments and context-sensitive strings such as "No score."

Future safe approach:

- Extract copy constants, or
- Build a comment-aware or context-aware scanner.

This is not urgent unless those surfaces start changing often.

---

## 7. Next recommended cloud-safe work

- Pure learning-engine tests.
- normalizeAnswer and matchExpected coverage.
- Mon Lexique selector test expansion.
- A docs/status v1 freeze checkpoint update.
- v1 to learning-engine migration notes.

---

## 8. Next recommended smoke work

- Home post-completion inspection.
- SayIt offline and AI fallback confirmation.
- Cold restart and storage-reset.
- Android viewport and keyboard pass.

---

## 9. Addendum (2026-06-10, post-checkpoint closures)

Appended after #103 and #104 merged. The sections above are unchanged.

**Post-checkpoint closures:**

- #103 closed the validate:pools CI gap. `npm run validate:pools` now runs on every PR
  and push to main in `.github/workflows/learning-engine-ci.yml`.
- #104 closed the fail-open product stage fallback. A missing or invalid
  `EXPO_PUBLIC_PRODUCT_STAGE` now resolves to "dev-apk", never "sandbox".
  Covered by `scripts/tests/productStageResolution.test.ts`.

**Remaining PR-D residue:**

- `app/dev/*` route gating is still open. Both dev routes are deep-link reachable in any
  stage and are protected by comments only.
- The supabaseReady banner item from the release guardrail audit plan is still open.

**Decisions not settled here:**

- The Practice tab decision remains separate and is not settled in this checkpoint.
- Home Auth and Account (F3) remains held until a product decision or smoke.
