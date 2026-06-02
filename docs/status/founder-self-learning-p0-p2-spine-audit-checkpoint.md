# Founder Self-Learning Build — P0–P2 Spine Audit Checkpoint

**Date:** 2026-06-02
**Current `main` HEAD:** `9d331d7`
**Status:** Status checkpoint (docs-only). Records the completion + Codex audit of the
Sprint13 SW.1 **P0–P2 spine** of the Founder Self-Learning Build. No code/schema/runtime/
player/fixture/content change accompanies this note. It sits alongside the architecture
direction note ([`founder-self-learning-build-architecture-review.md`](./founder-self-learning-build-architecture-review.md))
and the workstream spec
([`../workstreams/Sprint13_SW1_founder-self-learning-build-p0-p2.md`](../workstreams/Sprint13_SW1_founder-self-learning-build-p0-p2.md)).

## 1. Scope of this checkpoint

The **local deterministic learning spine** (contract graph → event log → deterministic
grading → mastery reducer) is implemented, merged to `main`, and audited. This note records
the audit verdict, decision-gate status, and the notes that P3 (learner renderer) must carry
forward. It does **not** authorize or begin P3.

## 2. P0–P2 completed modules (all merged to `main @ 9d331d7`)

| Step | Module | Role |
|---|---|---|
| P0.1 | `lemot-app/content/learning-engine/graph.ts` | Pure derived ownership / prerequisite / carry-in graph (`buildItemGraph`) |
| P0.2 | `lemot-app/content/learning-engine/validate.ts` (graph-audit block) | Graph-dependent validator checks `unseen_form_used` / `unsafe_production_target` (production-only, defense-in-depth) |
| P1.1 | `lemot-app/content/learning-engine/events.ts` | `LearningEvent` shape + `ErrorTagCode` grading vocabulary |
| P1.1 | `lemot-app/content/learning-engine/repository/types.ts` | Storage-agnostic `LearningRepository` interface |
| P1.2 | `lemot-app/content/learning-engine/repository/local.ts` | `LocalRepository` over `kvStorage` (`lm_le_*`), append/replay/pending-synced, idempotent by `clientEventId` |
| P2.1 | `lemot-app/content/learning-engine/grade.ts` | Deterministic, registry-free `grade()` → one `ErrorTagCode` |
| P2.2 | `lemot-app/content/learning-engine/mastery.ts` | Pure deterministic mastery reducer `scoreEvent()` / `scoreEvents()` → `MasterySnapshot` |

Verification at audit time: `npm run validate:content` → **0/0/0**; `npm run typecheck` → clean;
working tree clean. Cumulative P0–P2 diff (`8e8f8e2..9d331d7`) is confined entirely to
`content/learning-engine/` (8 files, +1025 / −1) — no leakage into `app/`, `supabase/`,
`components/`, `data/`, `config/`, `content/lessons`, or the dev player.

## 3. Audit verdict

**PASS WITH NOTES.** The spine is safe, coherent, deterministic, and ready for P3. Every
module is pure (no `Date.now` / storage / network / React / AI outside `LocalRepository`'s
lazily-imported `kvStorage`), input-non-mutating, and internally consistent. No P0/P1
blockers. The notes in §5 are scale/modeling refinements for **later** phases, not
corrections to P0–P2.

## 4. Gate assessment (workstream §11)

| Gate | Status |
|---|---|
| Gate 1 — graph + audit | **PASS** |
| Gate 2 — event type stable | **PASS** |
| Gate 3 — LocalRepository / offline queue | **PASS** |
| Gate 4 — grade() + scoreEvent() | **PASS** |
| Gate 5 — Codex audit | **PASS WITH NOTES** |
| **Ready for P3?** | **YES** (carry §5 notes) |

## 5. Top audit notes to carry into P3

1. **`LocalRepository` write atomicity (carry into P3).** `appendEvent` / `markSynced` are
   read-modify-write of the whole JSON array with no locking. P3 should **serialize event
   writes** (e.g. an internal promise chain/queue) to avoid concurrent read-modify-write
   clobbering once a real UI drives appends. **This is a P3 requirement.**
2. **`scoreEvents` `processedClientEventIds` array** uses `.includes()` per event — acceptable
   at founder scale, but may become **O(n²)** for large logs; consider a `Set`-based membership
   check / compaction later.
3. **`LocalRepository` whole-log JSON rewrite** per append is acceptable at founder scale but
   should be revisited (chunked/batched storage) **before larger logs**.
4. **Recognition and production currently share one Leitner box / prompt-fade track** per item;
   acceptable now (matches the P2.2 spec). Future tuning may split recognition vs production
   scheduling.
5. **`grade()` emits a safe deterministic subset of `ErrorTagCode`** (12 of 16). A registry-aware
   adapter (P3+) may later emit `wrong_item` / `overproduction_unseen_form` (and `meaning_shift`
   only if a safe trigger appears). `mastery` already handles any tag generically, so this is a
   superset relationship, not a gap.
6. **Empty-`itemIds` event** is processed as a no-op-to-mastery (records `clientEventId` +
   `updatedAt`, touches no items). Acceptable.

## 6. Blockers

**None.** No P0 or P1 blockers. The §5 items are notes/refinements, except note #1
(write serialization), which is an explicit **requirement for the P3 phase**, not a defect in
the merged P0–P2 spine.

## 7. Non-goals (this checkpoint)

- No P3 implementation yet.
- No learner renderer.
- No storage migration.
- No Supabase / remote sync.
- No admin dashboard.
- No AI grading.

## 8. Next recommended step

- Open a **P3 learner-renderer workstream / spec** (e.g. `docs/workstreams/Sprint13_SW2_...`),
  consuming the P0–P2 spine: render `recognition` / `fill` / `build` / `context_chain` /
  boundary cards over the contracts, grade via `grade()`, emit `LearningEvent`s through
  `LocalRepository`, derive UI from `scoreEvents()` — all behind `v1LessonEngine` + sandbox,
  hiding technical labels (per the boundary-recognition decision).
- **P3 must carry the `LocalRepository` write-serialization requirement** (§5 note #1) into its
  wiring.

## Status of this note

- Docs-only checkpoint. The P0–P2 spine is **code-side complete and audited**; P3 is **not**
  started.
- No `CLOUD_SYNC_QUEUE.md` row added (deferred). If/when the operator wants the audit
  checkpoint mirrored to the vault, a Sync Queue row can be added in a later docs-only step.
