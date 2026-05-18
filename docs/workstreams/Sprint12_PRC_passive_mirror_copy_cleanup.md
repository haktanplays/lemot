# Sprint 12 PR-C — Passive-Mirror Copy Cleanup

## Workstream name
Sprint 12 PR-C — Passive-mirror residue cleanup before APK rebuild.

## Branch
`claude/sprint12-prc-passive-mirror-copy-cleanup` (branched from `origin/main` at `ff35013`).

## Tier
LM-2 — small copy / UI cleanup. Two files, three string-level changes, zero logic change.

## Objective
Remove the three remaining user-facing reward-tone strings flagged by the read-only passive-mirror residue audit. After this PR, the dev-apk surface has no theatrical-positivity headlines on completion or feedback screens.

## Scope
Cloud-side, docs/code, ship-before-APK-rebuild. Single product intention: bring user-facing copy fully in line with `docs/DEV_APK_MVP_CANON.md` §5 and master pipeline §9 Rule 3.

## Audit source summary
Source: `Passive-Mirror Residue Audit` produced in the previous cloud session over `lemot-app/**`. Three user-facing residues identified:

1. `lemot-app/app/lesson-zero.tsx:121` — `<Badge label="You got it" />` in the correct MCQ-feedback branch. Redundant theatrical badge layered on top of already-specific feedback (`Correct answer: voudrais` + explanation).
2. `lemot-app/app/lesson/[id].tsx:763` — `Unlocked!` headline in the Sprint 8B unlockable-enrichment callout. Reward-tone exclamation paired with Sparkles icon + amber bold styling.
3. `lemot-app/app/lesson/[id].tsx:776` — `"Bonus content unlocked!"` fallback default string for the same callout. Combines "Bonus" + "unlocked" + `!`.

Comment-only residues (5) and false positives (6 categories) are out of scope.

## Allowed files
- `lemot-app/app/lesson-zero.tsx`
- `lemot-app/app/lesson/[id].tsx`
- `docs/workstreams/Sprint12_PRC_passive_mirror_copy_cleanup.md` (this file)

## Forbidden scope (verified untouched)
- Lesson content data files
- `lemot-app/content/itemRegistry.ts`
- `package.json` / `package-lock.json`
- Supabase, EAS, routes, AI behavior
- Mon Lexique, Paywall, RevenueCat, Word Graph, V4-B redesign
- Lesson engine internals (`lessonTypes`, `mk()`, `LessonRunner`, section transitions)
- `docs/CLOUD_SYNC_QUEUE.md` (intentionally not edited in this PR)
- Obsidian / mempalace (cloud-mode forbidden)
- Comment-only residues (deferred — informational, not user-facing)
- Legacy pool warnings (out of scope)
- `npm audit` findings (out of scope)

## Acceptance criteria
1. `lemot-app/app/lesson-zero.tsx` no longer contains `Badge label="You got it"`. The four other `Badge` usages in the same file (`label="Right"`, `label="Built"`, `label="You used it"`) remain untouched.
2. The MCQ feedback branch in `renderMcqFeedback` still renders the `Correct answer: voudrais` title, the `In French, politeness lives in the verb.` hint, and the Continue button. Only the celebratory badge disappears.
3. `lemot-app/app/lesson/[id].tsx` line 763 reads `Added.` (period, not `!`).
4. `lemot-app/app/lesson/[id].tsx` line 776 reads `"Extra piece added."` (period, not `!`).
5. No other user-facing string in either file changes.
6. `npm run typecheck` exits 0.
7. `npm run validate:pools` exits 0 (warnings unchanged from main: 6 pre-existing in legacy lessons 7/9/13/16).
8. No new file created or deleted other than this spec.

## Verification commands
```bash
cd lemot-app
npm run typecheck
npm run validate:pools
```

## Manual QA needed (Operator-only)
- Walk Lesson Zero on a physical device through the MCQ feedback for the correct pick. Confirm no badge appears, but the explanation text and Continue button still do.
- Walk a v1 lesson (or sandbox stage v1 surface) through an unlock event. Confirm the callout now reads `Added.` and, in the fallback case, `Extra piece added.` instead of the previous `Unlocked!` / `Bonus content unlocked!` strings.
- Optional regression: verify the other four Lesson Zero badges (`Right`, `Built`, `You used it`) still render in their respective branches.

## Risks
1. **Tonal mismatch in adjacent UI.** The unlocked callout still has a Sparkles icon and amber color theme; the copy change neutralizes the headline but the visual treatment is still celebratory. If the operator wants a deeper de-gamification, the Sparkles + amber palette is a follow-up scope (not PR-C). Documented but deferred.
2. **Lesson Zero correct/incorrect parity.** After removing the badge, the correct and incorrect MCQ branches render identically except for whether the pick was actually correct. This is consistent with passive-mirror philosophy ("specific guidance over generic encouragement") but is a visible behavior change relative to the previous build. Operator should sanity-check tone on device.
3. **`Badge` component left with 4 remaining call sites.** If future workstreams remove all four, the component itself becomes dead code. Out of scope here; left in place.
4. **No automated UI test.** As with WS8, no test covers these screens; reliance on `typecheck` + manual QA only.
5. **Sprint 8B unlockable-enrichment system as a whole is still gamification** (per `CLAUDE.md` "(gamification)" annotation). This PR neutralizes only the headline copy; the underlying mechanic is unchanged. A deeper review of the unlockable system is a separate Tier LM-3+ workstream.

## Review status
- Spec: this file, pending operator approval.
- Code edits: applied to working tree, pending operator approval.
- Verification: pending in this report.
- PR: not yet opened.
- Commit: pending operator approval phrase (`devam`, `onaylandı`, `commit`).
