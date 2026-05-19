# Sprint 12 WS9 — V1 Lesson Visibility / Navigation Entry

## Workstream name
Sprint 12 WS9 — Add the first navigation entry to the v1 lesson surface (sandbox-only).

## Branch
`claude/sprint12-ws9-v1-lab-entry` (branched from `origin/main` at `bb9ce9c`).

## Tier
LM-3 — feature slice / PR-sized workstream.

## Problem statement
After Sprint 12 PR #2, `lesson-001` ("Je suis") data and the `/v1-lesson/[id]` route both exist on `main`. But the lesson is **unreachable from any tab, Home tile, or Lesson Zero outro** — there is zero `router.push` or `<Link href>` reference to `/v1-lesson/` anywhere outside the route file. The `FEATURES.v1LessonEngine` flag exists in `lemot-app/config/productStage.ts` but **has zero consumers** in the codebase; it is declarative scaffold only. The Sprint 12 readiness audit decided to ship the preview APK without exposing lesson-001 (Option C). WS9 picks up the deferred decision and adds **one safe navigation entry** so the v1 renderer can be exercised inside a compiled build — but only on the right stage.

## Recommended option
**Option A — Home sandbox-only "v1 Lab" tile section.** Gate a small section on Home with `FEATURES.v1LessonEngine && PRODUCT_STAGE === "sandbox"` (belt-and-braces). Place below the main Lessons list, with a non-celebratory header ("v1 Lab"), one tile linking to `/v1-lesson/v1-lesson-001` labeled "Je suis · 5 min". Tile uses neutral styling — no reward tone, no exclamations, no "experimental!" framing.

Rejected: Option B (Lesson Zero redirect — violates Dev APK §2), Option C (Practice tab card — wrong tab identity), Option D (hidden debug gesture — more code without making the flag a real consumer), Option E (do nothing — leaves dead code untested in compiled builds).

Why A wins: smallest safe surface change; mirrors existing `FEATURES.aiChat` and `PRODUCT_STAGE === "dev-apk"` precedents in the same file; makes `v1LessonEngine` a real consumer (ending the scaffold-flag debt); honors Dev APK MVP canon §2 ("L1-L5 functional only") in code, not promise.

## Allowed files
- `lemot-app/app/(tabs)/index.tsx` — add the conditional v1 Lab section.
- `lemot-app/components/V1LabCard.tsx` — optional, only if inline JSX becomes unmanageable. Spec recommends staying inline.
- `docs/workstreams/Sprint12_WS9_v1-navigation-entry.md` — this spec.

## Forbidden scope (verified untouched)
- `lemot-app/config/productStage.ts` — **do not flip `v1LessonEngine`** in any stage. Existing values (sandbox=true, dev-apk=false, public-beta=false) are exactly what WS9 needs.
- `lemot-app/content/lessons/v1/lesson-001.ts` — content untouched.
- `lemot-app/content/lessons/v1/index.ts` — registration untouched.
- `lemot-app/app/v1-lesson/[id].tsx` — route untouched (works as-is).
- `lemot-app/app/lesson-zero.tsx` — Option B was rejected.
- `lemot-app/app/(tabs)/practice.tsx` — Option C was rejected.
- `lemot-app/app/(tabs)/_layout.tsx` — no new tab.
- `package.json` / `package-lock.json` — no new dependencies.
- Supabase, EAS, AI behavior, Mon Lexique, Paywall, RevenueCat, Word Graph, V4-B redesign, lesson engine internals (`lessonTypes`, `mk()`, `LessonRunner`, `SECS`) — untouched.
- `docs/CLOUD_SYNC_QUEUE.md` — not edited in this PR.
- Comment-only residues elsewhere — not addressed in this PR.

## Acceptance criteria
1. `FEATURES.v1LessonEngine` has its first code-side consumer — read once in `lemot-app/app/(tabs)/index.tsx` to gate the new section. Paired with `PRODUCT_STAGE === "sandbox"` as defensive belt-and-braces.
2. v1 Lab section visible only on sandbox stage. In `dev-apk` and `public-beta`, the section does not render.
3. v1 Lab tile navigates to `/v1-lesson/v1-lesson-001` via `router.push`. Lesson plays end-to-end (9 screens).
4. Visual treatment clearly separates v1 Lab from the main Lessons list — distinct header ("v1 Lab"), placed below the main list, non-celebratory framing, neutral styling.
5. No new dependencies. `package.json` and `package-lock.json` byte-identical.
6. No new lesson, no new flag, no new stage, no new route.
7. `npm run typecheck` exits 0.
8. `npm run validate:pools` exits 0 with the same 6 pre-existing legacy warnings.
9. No regression to Lesson Zero first-launch redirect, Daily Review, milestones, lesson list filter, paywall banner, or account modal.
10. No new user-facing reward-tone copy. Forbidden tokens (`New!`, `Unlocked`, `Bonus`, `Amazing`, `Try it!`, exclamation-mark headlines) absent.

## Verification
```bash
cd lemot-app
npm run typecheck
npm run validate:pools
```

Plus: `git diff --check` must be clean.

## Manual QA (Operator-only)
### Sandbox stage (default when env unset)
- Launch app → first-launch → complete or skip Lesson Zero → land on Home.
- ✅ Main Lessons list visible (L1–L24).
- ✅ "v1 Lab" section appears below the main Lessons list.
- ✅ Header reads "v1 Lab" — no exclamation, no "Experimental!", no "New!".
- ✅ Tile reads "Je suis · 5 min".
- ✅ Tap tile → routes to `/v1-lesson/v1-lesson-001` → 9 screens play.
- ✅ Back-navigate from lesson to Home → no crash.

### Dev-apk stage
- Restart with `EXPO_PUBLIC_PRODUCT_STAGE=dev-apk`.
- ✅ Main Lessons list shows L1–L5 only.
- ✅ v1 Lab section **does NOT appear**.
- ✅ Manual deep-link `/v1-lesson/v1-lesson-001` still works (intentional — gating is about discoverability, not data access).

### Public-beta stage
- Restart with `EXPO_PUBLIC_PRODUCT_STAGE=public-beta`.
- ✅ v1 Lab section **does NOT appear**.
- ✅ Paywall banner between L11 and L12 still renders.

### Regression spot-checks (sandbox)
- ✅ Daily Review card → Start Review → 5-card flow works.
- ✅ Milestones strip renders after lesson completes.
- ✅ Account modal opens/closes.
- ✅ Journey image + day label display.
- ✅ Lesson Zero first-launch redirect still happens for a fresh install.

## Risks
1. **Gating depends entirely on `FEATURES.v1LessonEngine === false` in dev-apk and public-beta.** A future PR flipping either value without removing the v1 Lab gate would leak the section. Mitigation: short code comment above the block warning that the gate is coupled to `v1LessonEngine`; defensive pairing with `PRODUCT_STAGE === "sandbox"`.
2. **First-launch flow on a fresh sandbox device routes through Lesson Zero first.** A new sandbox session sees `/lesson-zero` before Home; v1 Lab is only visible after Lesson Zero completes. Sequencing fact, not a regression.
3. **Lesson-001 uses `chunk-je-voudrais` only as a fill-trap.** Lesson Zero teaches `je voudrais`. Operators who hop straight to lesson-001 without Lesson Zero may find the `s03` trap reason ("you met je voudrais in the last lesson") less impactful. Not a blocker; documented.
4. **No automated test.** As with WS8 and PR-C, reliance is on `typecheck` + manual smoke. Cloud cannot perform the latter.
5. **v1 Lab visual treatment requires judgment.** Tone must stay passive-mirror. Suggest neutral label with sub-label matching existing lesson-card pattern.
6. **Bundle size impact negligible** (~30 lines of JSX). v1 data already ships on all stages.
7. **`docs/CLOUD_SYNC_QUEUE.md` will need a follow-up row after WS9 merges**, recording the new flag consumer + sandbox smoke outcome. Out of scope for this PR.

## Review status
- Spec: this file, applied to working tree, pending operator approval.
- Code edit: applied to `lemot-app/app/(tabs)/index.tsx`, pending verification + operator approval.
- Verification: typecheck + validate:pools + `git diff --check` to be run.
- PR: not yet opened.
- Commit: pending operator approval phrase.
