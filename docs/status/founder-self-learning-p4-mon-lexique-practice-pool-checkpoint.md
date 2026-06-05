# Founder Self-Learning Build — P4 (Mon Lexique / Practice Pool) Checkpoint

**Date:** 2026-06-04
**`main` HEAD:** `aa0aa37`
**Workstream:** Sprint13 SW.3 — Founder Self-Learning Build P4 (Mon Lexique / Practice Pool MVP)
**Status:** P4.1–P4.6 **code-side complete** on `main`. P4.7 (this checkpoint + founder smoke) **documented; smoke pending operator**.
**Ready for P5:** **only after** founder smoke is completed OR explicitly accepted as pending operator smoke.

> Docs-only checkpoint. No code/schema/runtime/player/fixture/content change accompanies this note.
> It records what landed across P4.1–P4.6, the founder smoke checklist, the Codex audit checklist,
> non-blocking follow-ups, and the gate before P5. It complements — and does not change — the spec in
> [`../workstreams/Sprint13_SW3_founder-self-learning-p4-mon-lexique-practice-pool.md`](../workstreams/Sprint13_SW3_founder-self-learning-p4-mon-lexique-practice-pool.md),
> the P3 checkpoint, and [`founder-self-learning-mastery-precision-policy.md`](./founder-self-learning-mastery-precision-policy.md).

---

## 1. Verdict / status

| Field | Value |
|---|---|
| Date | 2026-06-04 |
| `main` HEAD | `aa0aa37` |
| Sprint13 SW.3 P4 status | P4.1–P4.6 **code-side complete**; P4.7 checkpoint/smoke **documented (smoke pending operator)** |
| Ready for P5 | **YES, conditionally** — only after smoke is completed or explicitly accepted-pending |

P4 delivered the first two learner surfaces over the local `MasterySnapshot` — Mon Lexique and
Practice Pool — plus interactive practice that reuses existing fixture exercises. The full local loop
now extends to projections:

```
card → grade/reveal → LearningEvent → serialized append → readAllEvents → scoreEvents
   → MasterySnapshot → Mon Lexique view + Practice Pool buckets (+ reuse practice)
```

A release / P5 start is **not** "done" in cloud while physical/on-device founder smoke remains an
open operator task (Master Pipeline Rule 11 — cloud declares "code-side ready", not "complete").

---

## 2. Completed P4 PR map

| Step | What landed | PR |
|---|---|---|
| **P4.1** | P4 workstream spec (Sprint13 SW.3) — docs | #60 |
| **P4.2** | Mon Lexique **pure selector** (`content/learning-engine/mon-lexique.ts`) | #61 |
| **P4.4** | Practice Pool **pure selector** (`content/learning-engine/practice-pool.ts`) | #62 |
| **P4.3** | Mon Lexique **learner UI shell** (`MonLexiqueShell` / `MonLexiqueEntryCard`) | #63 |
| **P4.5** | Practice Pool **learner UI shell** (`PracticePoolShell` / `PracticePoolItemRow`) | #64 |
| **P4.6** | Practice Pool **card reuse / interaction** (`practice-reuse.ts` / `PracticePoolPracticePanel`) | #65 |

(Selectors P4.2/P4.4 intentionally landed before their UIs P4.3/P4.5, per the SW.3 gate that selector
contracts are defined before UI work. Merged-to-`main` state is the source of truth; PR numbers are for
traceability.)

---

## 3. Current architecture state

- **Mon Lexique is itemId-driven and selector-derived** from the item registry + `MasterySnapshot`
  (`selectMonLexiqueEntries`); it is a VIEW, not a separate wordbook/store.
- **Practice Pool is selector-derived** from `MasterySnapshot` (`selectPracticePoolBuckets`).
- **Build / Stretch / Challenge come from `practiceEligibility`** (reducer-derived).
- **Challenge is weak-only** (`practiceEligibility === "challenge"` AND `isWeak === true`).
- **Precision-only items are Build-only, never Challenge** (precision never sets `isWeak`;
  `precisionTags` / `precisionCount` are never read into pool/lexique output).
- **Mon Lexique and Practice Pool UIs are learner-safe projections, not debug views** — no ids, raw
  scheduling numbers, tags, counters, JSON, operation labels, bucket names, or validator language.
- **Practice Pool interaction reuses existing fixture exercises ONLY** (`selectReusablePracticeExercise`
  returns an existing `ExerciseBlueprint` by reference, by `targetItemIds` match + per-path operation
  preference) — **no generated exercises**.
- **Event writing still goes through the existing serialized session path** — reused practice cards use
  the same `renderCard` + `session.recordGradedAttempt` / `session.recordRecognitionReveal`; serialized
  append remains owned by `LearningSessionController`.
- **No direct `LocalRepository` append from UI components**; **no new event shape**; **no new store**.
- **No remote / Supabase / AI / public-nav / live-v7.** Surfaces stay sandbox/founder-gated; the dev
  player remains the untouched debug surface.

---

## 4. Founder smoke checklist

Run in the **sandbox** stage on emulator (physical-device smoke is operator-only). Deep-link the
learner route; the route key is internal and never shown.

- [ ] Sandbox/founder route opens (and the disallowed-stage fallback still shows outside sandbox).
- [ ] Lesson card flow still works (recognition / fill / build / register_switch / context_chain / boundary).
- [ ] Recognition reveal appends **exactly once** (Show → Hide → Show does not re-append).
- [ ] Fill / build / register_switch / context_chain Checks append through the session.
- [ ] Boundary "later form" acknowledge appends through the recognition path.
- [ ] Mon Lexique empty state shows before any added/weak item.
- [ ] Mon Lexique **added** entry appears after a production success ("Collected").
- [ ] Mon Lexique **weak** entry appears gently when an item is weak ("Needs another look").
- [ ] Practice Pool empty state shows when no eligible items.
- [ ] **Build** path appears for seen / recognized / precision-only / non-weak items.
- [ ] **Stretch** path appears for produced items.
- [ ] **Challenge** path appears **only** for weak items.
- [ ] A precision-only item does **not** appear in Challenge.
- [ ] Tapping a Practice Pool row opens the inline practice panel when a reusable exercise exists.
- [ ] A row with no reusable exercise shows calm "not ready to practice yet" copy — no crash, no id.
- [ ] A reused Practice Pool card records through the existing session path.
- [ ] **No event** on selecting a row.
- [ ] **No event** on closing the panel.
- [ ] **No event** on typing.
- [ ] After an append settles, the snapshot refresh updates Mon Lexique / Practice Pool.
- [ ] No raw `itemId` / `dueAt` / `weakTags` / `precisionTags` / counters / JSON visible.
- [ ] No operation labels / bucket names / validator `FindingCode` language visible.
- [ ] No crash through a short fixture run (L11 / L12 / L16 etc.).

---

## 5. Codex audit checklist

- [ ] No Supabase / network / AI.
- [ ] No `RemoteRepository` / schema changes.
- [ ] No public-nav / live-v7 exposure.
- [ ] No dev-player changes.
- [ ] No fixture / content / validator changes.
- [ ] No event shape changes.
- [ ] No new exercise shape.
- [ ] No generated exercises (reuse only).
- [ ] No card/component direct `LocalRepository` append.
- [ ] Cards/components do not construct `LearningEvent` directly (controller-owned).
- [ ] Selectors (`mon-lexique`, `practice-pool`, `practice-reuse`) remain pure / RN-free.
- [ ] Mon Lexique does not expose raw mastery/debug data.
- [ ] Practice Pool does not expose raw mastery/debug data.
- [ ] Challenge = weak only.
- [ ] `precisionTags` / `precisionCount` are not used as Challenge fuel.
- [ ] No streak / XP / reward language.

---

## 6. Known follow-ups / non-blockers

None of these blocks the P4 checkpoint.

1. **Physical / on-device founder smoke is operator-only** — this note covers emulator/code-side readiness.
2. **Remote stale branch cleanup is operator-only** — cloud delete-push returns HTTP 403; the merged
   `claude/founder-self-learning-*` / `claude/mastery-precision-policy*` branches prune via the GitHub UI.
3. **9-state vs counter-derived docs reconciliation** remains a later docs cleanup; the **counter-derived
   `MasterySnapshot` is the source of truth** for now.
4. **Future staged strictness for the precision policy** (lesson band, monolingual phase, promptFade,
   item maturity, future `accentCriticality`) remains a later, separately-reviewed change.
5. **Practice Pool reuses current-fixture exercises only** — broader/cross-fixture pool selection is later.
6. **UI polish** (visual refinement, ordering, scroll/overflow on small Android viewports) can happen later.
7. **No Daily Review full UI yet** — P4 defined only the eligibility/due hooks (deferred per SW.3 §4).
8. **No Word Graph / notes / notebook yet.**

---

## 7. P5 gate / next workstream recommendation

**Hard gate before any remote/tester sync (P6+):** create a **Privacy / KVKK–GDPR Architecture Note +
Consent / Data Map** documenting what learner data exists, where it would live, retention, and consent —
**before** any Supabase/tester remote database is wired.

> **Do NOT start Supabase / tester remote sync before the privacy/data map is documented.**

P5 may begin only when:

1. The P4 founder smoke checklist is **completed**, OR **explicitly accepted as pending operator smoke**.
2. **No P4 blocker remains** (the §6 items are non-blocking).
3. This P4 checkpoint is **merged** to `main`.

Next likely options (operator/product to choose):

- **A) P5 founder smoke acceptance / local issue-reporting surface** — a calm, local-only way for the
  founder to record bugs/notes during smoke (no remote).
- **B) Privacy / KVKK–GDPR Architecture Note + Consent / Data Map** — prerequisite before any remote/tester DB.
- **C) P5 polish / checkpoint workstream** — UI polish, ordering, small-viewport overflow, copy passes.

Recommendation: do **B** (privacy/data map) before any remote work regardless of which feature track is
picked next, since it gates P6 and beyond.

---

## 8. Operator blockers (cloud)

- None for P4 itself (pure local projections + local reuse; no EAS/Supabase/APK step).
- **Operator-only:** physical-device founder smoke; stale remote-branch cleanup (§6.2). The first hard
  build/deploy operator blockers appear at P6+ (Supabase deploy), gated by the §7 privacy note.

## Sync Queue entries created

- None. A `docs/CLOUD_SYNC_QUEUE.md` row marking the P4 workstream LOCKED would be added only after
  review, if requested — not by this checkpoint.
