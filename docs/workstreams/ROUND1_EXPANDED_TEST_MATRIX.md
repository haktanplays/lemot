# Round 1 Expanded Test Matrix (L0-L6, stacked on PR #174)

> Tests/docs-only quality pass on branch `test/round1-expanded-contracts`
> (base: PR #174 head `38a8663`). Purpose: while Haktan screen review is
> pending, lock the learner-facing shape of the visible dev-APK slice as
> automated contracts, and name exactly what remains manual/operator smoke.

## Scope

Round 1 visible slice: L0-L6, in their PR #174 state. The new contracts run
inside the existing dependency-free harness (`scripts/tests/run.ts`) under
`npm run test:learning-engine`; no new framework, no new dependency, no new
package script.

## Automated contract tests added

File: `lemot-app/scripts/tests/round1ContentContracts.test.ts`
(14 tests; suite total 583 → 597).

| # | Invariant | How |
|---|---|---|
| 1 | V1 lessons include L0-L6, ordered ascending | data contract on `V1_LESSONS` |
| 2 | L1 prerequisites `[]`; L2-L6 chain sequentially | deep-equal on `prerequisites` |
| 3 | Home dev-apk cap stays L1-L6 | source-text contract on `app/(tabs)/index.tsx` (the cap is inline in the component; testable without rendering only as text — changing the window now breaks a test on purpose). FEATURES-level scope was already locked by `devApkScope.test.ts`. |
| 4 | Screen counts incl. goal card: L1=13, L2=11, L3=13, L4=12, L5=12, L6=12 | length contract |
| 5 | L6 payoff-only: the #174 reveal alternative exists; no Kademe 2 learningItems entered L6 | targeted screen + item-id checks |
| 6 | `je ne peux pas` / `vous pouvez m'aider ?` never chips, all lessons | scan of suggestedPieces + piecesUsed |
| 7 | L1 has no madame/monsieur in learner-facing strings | token scan of all screen string values |
| 8 | L5 has no restaurant/maison | substring scan |
| 9 | L4 has no `il y a` | substring scan |
| 10 | L3 `pas de problème` + `si` present as copy, absent from every production surface | dual presence/absence check |
| 11 | Ghost words (croissant, là, prêt, froid, chaud) present as examples, never in pieces/expected/accepted/options/hintCloze/piecesUsed | `assertGhostOnlyToken` |
| 12 | Ghost/seen words never inside expectedAnswers/acceptedAlternatives, L0-L6 | token scan over answers |
| 13 | Every recap piecesUsed chip is exercised by a fill/weave/say-it in its own lesson (ownership hygiene) | chip-substring-in-exercise-pool check |
| 14 | Survival formulas byte-exact in the L1 rescue area: chips `je ne comprends pas` + `vous pouvez répéter ?` (accent + spaced `?` preserved), model pair unchanged, recap chips intact | strict string equality |

Already covered by existing tests (not duplicated): PROTECTED_CHUNKS and
SURVIVAL_FORMULAS frozen at exactly two members each, and the forbidden
calibration list (chip-canon guard test in `v1LessonStructure.test.ts`);
dev-apk FEATURES scope (`devApkScope.test.ts`); banned learner copy
(`devApkCopyGuard.test.ts` / `componentCopyGuard.test.ts`); TTS placeholder
safety (`ttsPlaceholder.test.ts`).

### Not technically testable here (by design, no forced implementation)

- "Seen-only surfaces must not create expectedAnswers" in the GENERAL case:
  there is no machine-readable ghost/seen tier marker on content (ghost
  status lives in designNotes prose). Covered narrowly by tests 11-12 over
  the known ghost list; the general rule becomes mechanical only when a
  tier field exists (Lesson Skeleton v1 / lane metadata work).
- Anything visual: wrap, overflow, tap targets, crowding, TTS audio quality
  — operator device smoke below.

## Manual checks still required — Operator smoke additions

All on a SMALL Android viewport, added to the standard Round 1 checklist:

1. Clean install; Lesson Zero still routes correctly (rebuilt #139 flow).
2. Home shows only allowed dev-apk lessons (L1-L6, no L7+, no legacy list).
3. L1-L6 each open and complete end to end.
4. **L1 long formula chips wrap cleanly on small viewport** (`je ne
   comprends pas`, `vous pouvez répéter ?` in s07c weave suggestions and
   the s09 recap):
   - no horizontal overflow anywhere;
   - no clipped accents (é) or clipped/orphaned question marks;
   - tap targets remain usable after wrap (no sliver-height chips);
   - TTS controls not crowded by long text (s07b examples, s07c).
5. L1 recap with 9 piecesUsed chips does not crowd.
6. L2 s06 long insight paragraph readable (no wall-of-text overflow).
7. L3 s04 dense oui/non card readable (five ideas on one card).
8. L5 four-fill run not visually broken or repetitive-feeling.
9. L6 reveal alternative reads as payoff, not new teaching.
10. No XP/streak/paywall/reward copy appears anywhere.

## Merge blockers vs watch-only

Blockers (must pass before #174 merge):
- All automated suites green (typecheck, validate:content 0/0/0,
  test:learning-engine).
- Operator smoke items 1-4 (routing, scope, completability, formula wrap /
  overflow / tap targets).
- Haktan screen review verdict.

Watch-only (log, fix post-merge if cosmetic):
- Items 5-9 unless they block reading or tapping.
- TTS prosody quality on the rescue pair (interim synthesis; human
  recording pass is queued separately).

## What this pass does NOT authorize

No content edits, no runtime edits, no ES1, no seen-layer changes, no
L7-L24 implementation, no validator changes that alter product acceptance
(the new tests only ASSERT the current accepted state), no new
dependencies, no merges.
