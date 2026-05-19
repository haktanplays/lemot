# Sprint 12 SW10D-1 — Merge Progress Union + Latest DailyReview

## Workstream name
Sprint 12 SW10D-1 — Replace count-based cloud/local merge with progress union + latest-date dailyReview.

## Branch
`claude/sprint12-sw10d1-merge-union-and-latest` (branched from `origin/main` at `4c3e16f`).

## Tier
LM-3 — sync behavior fix. One file (`AppProvider.tsx`) + spec.

## Problem statement
SW10D Merge Policy Design Report confirmed H1: the existing merge effect in `lemot-app/providers/AppProvider.tsx:62-87` picks a winner by `Object.values(p).filter(Boolean).length` — a flat completed-section count. This produces three concrete data-loss / split-brain failure modes:

- **F1** — Cloud has more completed sections but a stale `dailyReview` (yesterday's count). On pull, cloud wins → today's local `dailyReview` is overwritten.
- **F2** — Local and cloud have the same count but different completed sections (e.g., learner did L1 on phone, L2 on tablet). Counts are equal → no merge fires → next save pushes only one device's progress → the other device's progress is permanently lost from cloud.
- **F6** — Equal-count split-brain combined with `saveWithSync` clobber: the no-op merge + immediate save sequence overwrites cloud with local-only state, losing the cloud-side sections.

The fix is **Option A** from the design report: progress becomes a set-union; dailyReview is whichever side has the later date (ties broken by higher count); errors stay local-only for now (the round-trip is SW10F's job, not SW10D-1's).

## Chosen strategy: Option A

```
mergeProgress(local, cloud) = union of completed keys
  — section completion is monotonic, so { ...cloud, ...local } is safe;
  — both sides only store `true`, so there's no false-tombstone risk;
  — neither side loses a completion.

mergeDailyReview(local, cloud):
  — if local.date  > cloud.date  → local
  — if cloud.date  > local.date  → cloud
  — if same date                 → side with higher count
  — fully equal                  → local (no-op picks either)
  — ISO YYYY-MM-DD lex-compare is safe for date ordering.

errors:
  — preserved as-is (s.errors) in the post-merge save call;
  — pullFromCloud still returns errors: [] (no round-trip in this PR).

push:
  — fires once only if mergedProgress or mergedDailyReview differs from
    cloud's pulled state; otherwise silent.
```

`hasPulled.current = true` is set **after** the async pull/merge resolves (both the no-cloud-data branch and the merged-and-pushed branch), so a future re-render with material dependency change can re-pull cleanly. Previously, the flag was set synchronously before the `await`, which could leave the gate in an inconsistent state if the effect's deps changed mid-pull.

## Rejected / deferred strategies

| Option | Verdict | Reason |
|---|---|---|
| B — Option A + errors pull-and-dedup | **Deferred to SW10F** | Errors need a separate idempotency design (composite-key or `client_id` column). Bundling here would smuggle scope. |
| C — Timestamped per-domain merge | Rejected | Requires breaking storage schema and either rewriting `progress jsonb` shape or adding a parallel `progress_meta` column. Over-engineering for current scale. |
| D — Cloud-wins or local-wins | Rejected | Destructive. Loses learner data on first sign-in. Unacceptable for a learning app. |
| E — Conflict modal / user choice | Rejected | Violates `docs/DEV_APK_MVP_CANON.md` §3 ("first 3 minutes") and the calm-premium tone canon. |

## Scope

Single product intention: replace the count-based merge winner logic with safe per-domain merge helpers. **No** schema change, **no** auth change, **no** storage shape change, **no** new dependency, **no** errors round-trip.

## Allowed files
- `lemot-app/providers/AppProvider.tsx` — replace merge effect + helpers.
- `docs/workstreams/Sprint12_SW10D1_merge_union_and_latest.md` — this spec.

## Forbidden scope
- `lemot-app/hooks/useProgressSync.ts` — untouched (SW10A's `.maybeSingle()` semantics preserved).
- `lemot-app/hooks/useAuth.ts` / `lemot-app/providers/AuthProvider.tsx` — anonymous auth is SW10E.
- `lemot-app/hooks/useStorage.ts`, `lemot-app/hooks/useErrors.ts`, `lemot-app/hooks/useLessonProgress.ts` — untouched.
- `lemot-app/lib/storage.ts`, `lemot-app/lib/supabase.ts`, `lemot-app/lib/types.ts` — untouched.
- `lemot-app/supabase/schema.sql` and `lemot-app/supabase/functions/**` — untouched. No deploy.
- `lemot-app/config/productStage.ts` — no flag flip.
- App routes (`lemot-app/app/**`), components (`lemot-app/components/**`), lesson content, pools, item registry — all untouched.
- `package.json`, `package-lock.json` — no dependency change.
- EAS files (`eas.json`, `app.json`) and secrets — untouched.
- `docs/CLOUD_SYNC_QUEUE.md` — follow-up row added in a future backfill round.
- Mon Lexique, Paywall, RevenueCat, Word Graph, V4-B, AI behavior, lesson engine internals — all untouched.

## Acceptance criteria
1. `countCompleted` helper deleted; no count-based winner logic remains anywhere in `AppProvider.tsx`.
2. Module-scope pure helpers added:
   - `mergeProgress(local, cloud)` returns `{ ...cloud, ...local }` (union).
   - `mergeDailyReview(local, cloud)` returns local on `local.date > cloud.date`, cloud on `cloud.date > local.date`, otherwise the side with higher `count` (local wins on full tie).
   - `progressEqual` and `dailyReviewEqual` shallow equality helpers (used to decide whether local/cloud changed enough to warrant a save/push).
3. Merge effect body:
   - Pulls cloud once per user-session.
   - If `cloud == null`, sets `hasPulled.current = true` and returns silently. No save, no push.
   - Otherwise computes `mergedProgress` + `mergedDailyReview`.
   - If merged differs from local → `setProg(mergedProgress)`, `setDailyRev(mergedDailyReview)`, `save(mergedProgress, s.errors, mergedDailyReview)`.
   - If merged differs from cloud → `pushToCloud({ progress: mergedProgress, errors: s.errors, dailyReview: mergedDailyReview })`.
   - `s.errors` (local) passed to save unchanged. `errors` field in the push payload is the same local array (consistent with today; the field is currently ignored by `pushToCloud`, see useProgressSync.ts:18-25 which only writes progress + daily_review).
   - One `console.log("[sync] merged progress/dailyReview")` emitted iff any of the four "differs" flags is true.
   - `hasPulled.current = true` set at the end of the success path (after potential save+push) AND in the no-cloud branch.
4. No change to `saveWithSync` (still pushes on every save).
5. No change to `logErrWithSync` (still pushes error via `pushError`).
6. No change to the `AppContextType` interface.
7. No change to the `useApp` hook export.
8. No new imports beyond what's already in the file. `DailyReview` import (line 8) covers the helper signatures.
9. `npm run typecheck` exits 0.
10. `npm run validate:pools` exits 0 with the same 6 pre-existing legacy warnings.
11. `git diff --check` clean.

## Verification commands
```bash
cd lemot-app
npm run typecheck
npm run validate:pools
```

Plus `git diff --check` and visual diff inspection.

## Manual QA simulations (Operator-only)

Cloud cannot run these. They require a real Supabase + Expo dev environment.

### F1 — Stale cloud dailyReview vs fresher local
Setup: pre-populate cloud `user_progress` row for a test user with `progress: {1-A: true, 1-B: true, ..., 1-J: true}` (10 sections) and `daily_review: { date: "2026-05-18", count: 5 }`. On local device, set `prog: {2-A..2-G: true}` (7 sections) and `dailyRev: { date: "2026-05-19", count: 3 }` (today's date, fewer sections).

Expected post-merge:
- `progress` = union of both = 17 keys (1-A..1-J ∪ 2-A..2-G).
- `dailyReview` = `{ date: "2026-05-19", count: 3 }` — local wins because date is newer.
- Local state updated to 17 keys + `{date: 2026-05-19, count: 3}`.
- Cloud pushed once with merged state.
- One `[sync] merged ...` log line.

### F2 — Equal count, different completed sections
Setup: cloud `progress: {1-A..1-E: true}` (count = 5). Local `prog: {2-A..2-E: true}` (count = 5). Same `dailyReview` shape.

Expected post-merge:
- `progress` = union = 10 keys (1-A..1-E ∪ 2-A..2-E).
- `dailyReview` = whichever (same date, same count).
- Local state updated to 10 keys.
- Cloud pushed once with the 10-key merged state.
- One `[sync] merged ...` log line.

Verify against today's behavior: before SW10D-1, both sides have count=5 → no-op → next save on local would push only `{2-A..2-E}` → cloud's `{1-A..1-E}` permanently lost. After SW10D-1, that loss is impossible.

### Additional sanity checks

- **New user, no cloud row:** `pullFromCloud` returns `null` (post-SW10A). Merge effect sets `hasPulled.current = true` and returns. No save, no push, no log line. Local state untouched.
- **No-op merge (cloud and local identical):** Pulls cloud, computes merged = identical → all four "differs" flags false → no save, no push, no log line. `hasPulled.current = true`.
- **Cloud has fewer sections than local, same date dailyReview:** Cloud is strictly a subset of local. Merge = local (unchanged). Local-differs is false. Cloud-differs is true → push fires. Daily review unchanged. One log line.
- **Errors:** `s.errors` reads the local-only array and writes it back unchanged. Cloud `user_errors` table is not queried (consistent with SW10A behavior). M3 deferred to SW10F.

## Risks
1. **The merge effect is the most behavior-critical block in AppProvider.** A bug here can silently corrupt many users' data. Operator must run F1 and F2 simulations on a real device before mass rollout.
2. **F5 (push-during-in-flight-pull) is NOT fully solved.** `saveWithSync` still fires on every save and does not wait for the pull/merge. The risk is reduced (merge no longer overwrites with a smaller set), but a concurrent save during the first-launch pull can still race the merge's push. Full queueing fix is SW10D-3 — deferred.
3. **F3 (errors not pulled on new device) is NOT solved.** Local errors persist as-is. New device starts with empty error history; weak-spot priority blank until SW10F lands. Operator should expect this.
4. **F4 (anonymous-to-real upgrade orphaning) is NOT solved.** SW10E territory.
5. **No automated unit test for the new merge helpers.** They are pure functions, ideal for testing in the future. Cloud cannot add test infra here. SW10D-2 (helper extraction into `lib/mergeSync.ts`) would unlock easy testing later — optional follow-up.
6. **`progressEqual` is O(n) in the number of keys.** For Le Mot's current scale (Sprint 12 = max 24 lessons × 11 sections = 264 keys plus a small v1 surface), this is trivially fast. If progress maps grow to thousands of keys later, the merge effect's three equality checks could become a perf hotspot — extract to a more efficient diff if needed. Not a Sprint 12 concern.
7. **The `console.log("[sync] merged ...")` line is intentionally minimal.** No structured payload, no key-count, no diff. Operator can extend later if observability needs deeper logging.
8. **The `hasPulled.current = true` move from synchronous-before-await to async-after-resolve** changes a subtle edge case: if the useEffect's dependencies (`user`, `storageHook.loaded`, `pullFromCloud`, `pushToCloud`) change mid-pull, the second invocation now sees `hasPulled = false` and could re-pull. This is the intended improvement (re-pull cleanly on material change), but operator should know the behavior shift.
9. **`docs/CLOUD_SYNC_QUEUE.md`** will need a follow-up row after SW10D-1 merges. Out of scope for this PR per task rules.

## Review status
- Spec: this file, applied to working tree, pending operator approval.
- Code edit: applied to `lemot-app/providers/AppProvider.tsx`, pending verification + operator approval.
- **Pre-commit stale-snapshot mitigation (applied):** the storage snapshot `const s = storageRef.current` is captured **after** `pullFromCloud()` resolves (and after the no-cloud early return), not before the `await`. This guarantees the merge reads the freshest local progress / dailyReview / errors, so an in-flight `mk()` or Daily Review tap during the pull window is not overwritten by stale-snapshot-derived merge outputs.
- Verification: `npm run typecheck`, `npm run validate:pools`, `git diff --check` to be run before reporting.
- PR: not yet opened.
- Commit: pending operator approval phrase.
