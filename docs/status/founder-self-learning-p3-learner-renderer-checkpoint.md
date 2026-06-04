# Founder Self-Learning Build — P3 Learner Renderer Checkpoint

**Date:** 2026-06-04
**`main` HEAD:** `8a37fca`
**Workstream:** Sprint13 SW.2 — Founder Self-Learning Build P3 (Learner Renderer)
**Status:** P3.2–P3.8 complete on `main`. P3.9 (this checkpoint + founder smoke) **documented; smoke pending operator**.
**Ready for smoke:** **YES.**

> Docs-only checkpoint. No code/schema/runtime/player/fixture/content change accompanies this note.
> It records what landed across P3.2–P3.8, defines the founder smoke checklist, and sets the gate
> before P4 (Mon Lexique / Practice Pool MVP). It complements — and does not change — the build
> snapshots in [`founder-self-learning-p0-p2-spine-audit-checkpoint.md`](./founder-self-learning-p0-p2-spine-audit-checkpoint.md)
> and the spec in [`../workstreams/Sprint13_SW2_founder-self-learning-p3-learner-renderer.md`](../workstreams/Sprint13_SW2_founder-self-learning-p3-learner-renderer.md).

---

## 1. Status summary

| Field | Value |
|---|---|
| Date | 2026-06-04 |
| `main` HEAD | `8a37fca` |
| Sprint13 SW.2 P3 status | P3.2–P3.8 **complete**; P3.9 checkpoint/smoke **documented (smoke pending operator)** |
| Ready for smoke | **YES** |

The P0–P2 deterministic spine (audited) now has a **calm, label-free, founder/sandbox-gated learner
renderer** over it, and the full local loop runs on device:

```
card → grade/reveal → LearningEvent → serialized append → readAllEvents → scoreEvents → MasterySnapshot
```

---

## 2. Completed P3 PR map

| Step | What landed | PR |
|---|---|---|
| **P3.2** | Learner-renderer **skeleton + sandbox/founder-gated route** (`app/learn/[fixtureId].tsx`, shell), no event writing | #51 |
| **P3.3** | **recognition + fill** cards over a fixture; fill uses `grade()` for local feedback | #52 |
| **P3.4** | **build + register_switch** cards (tile assembly; register ladder) | #53 |
| **P3.5** | **context_chain / "A Small Moment"** card (scene + sequential fixed-answer steps) | #54 |
| **P3.6** | **Serialized `LearningEvent` append** via `LearningSessionController` promise chain | #55 |
| **P3.7** | **`MasterySnapshot` derivation** from local events after append settles | #56 |
| **P3.8** | **Boundary "later form" soft card** + narrow classifier (`boundary.ts`) | #57 |

(P3.1 was the workstream spec itself. PR numbers are recorded for traceability; the merged-to-`main`
state is the source of truth.)

---

## 3. Current architecture state

- **Learner route is sandbox/founder gated** — `PRODUCT_STAGE === "sandbox" && FEATURES.v1LessonEngine`
  (`config/productStage.ts`); a disallowed stage gets a safe "unavailable" fallback.
- **No public-nav exposure** — no tab/Home link wired for public stages; deep-link only.
- **Cards render learner-facing UI** — calm prompts, French text, friendly feedback; never engine internals.
- **Card components do NOT import `LocalRepository`.**
- **Card components do NOT import `scoreEvents`/mastery.**
- **Event creation is owned by `LearningSessionController`** (`content/learning-engine/session-controller.ts`) —
  including the single `clientEventId`/`timestamp` impurity point.
- **`LocalRepository` is owned by `useLearningEngineSession`** (`components/learning-engine/`) — one repo + one
  controller per renderer lifetime; components never touch `appendEvent` directly.
- **Append writes are serialized** through the controller's internal promise chain
  (`this.tail = this.tail.then(() => repo.appendEvent(e))`), so rapid actions cannot clobber.
- **Mastery snapshot is derived from the event log after the append settles** — `deriveAndNotify` runs
  `readAllEvents()` → `scoreEvents()` on the same serialized tail, never before the write resolves; the hook
  mirrors the result into React state.
- **Boundary later-form uses a narrow classifier over existing contract fields** — `isBoundaryLaterForm`
  (`content/learning-engine/boundary.ts`): a `recognition` exercise whose every target id is in BOTH
  `items.recognitionOnly` and `production.blockedProduction`. No schema field; pure, RN-free, unit-testable.

---

## 4. Founder smoke checklist

Run in the **sandbox** stage on emulator (physical-device smoke is operator-only). Deep-link the
learner route; the route key (e.g. `l11`) is internal and never shown to the learner.

- [ ] Open `/learn/l11` (or another available fixture: `l12`, `l14`, `l15`, `l16`, `l18`) in sandbox/founder stage → renders.
- [ ] Route in a **disallowed stage** (dev-apk / public-beta) shows the safe "unavailable" fallback, not the shell.
- [ ] **Recognition** reveal works and **logs exactly once** (Show → Hide → Show does not re-log).
- [ ] **Fill — correct** answer → friendly positive feedback **and** one event appended.
- [ ] **Fill — wrong** answer → friendly (non-harsh) feedback **and** one event appended.
- [ ] **Build** card renders tiles; correct/wrong feedback works; event appended on Check.
- [ ] **Register_switch** card renders (direct → clearer); event appended on Check.
- [ ] **Context_chain** progresses through steps; event appended on each Check; calm completion state.
- [ ] **Boundary later-form** renders softly ("A form for later"); **no production ask**; acknowledge records **once**.
- [ ] **No event on typing** (only on Check / reveal / acknowledge).
- [ ] **No event on Next/Back/Finish navigation.**
- [ ] **Serialized append does not clobber** events under rapid submits (event count matches actions).
- [ ] **`readAllEvents` happens after the append settles** (snapshot reflects the just-written event).
- [ ] **`scoreEvents` derives a non-null snapshot** after the first recorded action.
- [ ] **Save hint stays learner-safe** — only "Saving…" / "Progress saved locally." / "Couldn't save just now.".
- [ ] **No technical leak** — no lesson/exercise IDs, operation labels, bucket names (`recognitionOnly`/
      `blockedProduction`/`activeNew`…), raw `ErrorTagCode`, validator language, or debug JSON visible.
- [ ] **Back / navigation** behaves (no stuck state) where applicable.
- [ ] **No red screen / no crash** across all card types and both correct/wrong paths.

---

## 5. Codex audit checklist

- [ ] No public-nav exposure (route sandbox/flag-gated; deep-link only).
- [ ] No live-v7 migration (`content/lessons/v1`, `content/lessonTypes`, `components/lesson-v1`, `data/*` untouched).
- [ ] No Supabase / network / AI in the P3 surface.
- [ ] No `RemoteRepository` / schema changes.
- [ ] No dev player changes (`app/dev/*` remains the untouched debug surface).
- [ ] No fixture/content/validator changes.
- [ ] No cards importing `LocalRepository`.
- [ ] No cards importing `scoreEvents`/mastery.
- [ ] No raw item-id fallback in any card (unresolved surface uses a learner-safe `"…"`).
- [ ] Boundary classifier remains **narrow** (recognition + `recognitionOnly` ∩ `blockedProduction`; no broad string parsing).
- [ ] No new event shape / operation.
- [ ] No Mon Lexique / Practice Pool / Daily Review UI yet (snapshot only *computes* statuses).
- [ ] No streak / XP / reward language ("Amazing!", "Level up!", "perfect score", come-back pressure).

---

## 6. Known follow-ups / not blockers

These are recorded so P4 planning has them in view. **None blocks the P3 checkpoint.**

1. **Remote branch cleanup is operator-only** — cloud git proxy returns HTTP 403 on delete-push, so the
   stale `claude/founder-self-learning-p3*` branches must be pruned via the GitHub UI / a local CLI.
2. **Near-miss mastery policy (review candidate)** — the mastery reducer currently counts
   `punctuation_only` / `accent_only` / `spelling_near_miss` outcomes as **failure**. This should be
   reviewed as a **scoped mastery-policy patch in a separate PR** (not folded into renderer work).
3. **Mastery docs drift** — the conceptual "9-state" mastery language elsewhere should be reconciled with
   the current **counter-derived** mastery projection (`scoreEvents` / `MasterySnapshot`). Docs-only reconcile.
4. **Future `presentationHint` / schema marker for boundary cards** — a deliberate, separately-reviewed
   schema field may eventually replace the current narrow contract-derived classifier (per
   [`boundary-recognition-ui-decision.md`](./boundary-recognition-ui-decision.md) §5/§7).
5. **Physical / on-device smoke is an operator task** — this note covers emulator/code-side readiness only.
6. **P4 begins only after** the smoke checklist is completed or explicitly accepted as pending operator smoke.

---

## 7. Decision gate before P4 (Mon Lexique / Practice Pool MVP)

P4 **should not begin** until **all** hold:

1. The P3 smoke checklist is **completed**, OR **explicitly accepted as pending operator smoke**.
2. **No P3 blocker remains** (the items in §6 are non-blocking follow-ups, not blockers).
3. The **P3 checkpoint is merged** to `main`.
4. The **near-miss policy** is either **logged as a follow-up** (done — §6.2) **or patched in a separate PR**.

This mirrors the spec's §16 decision gate; the renderer already satisfies the functional gates
(plays a fixture end-to-end, serialized append, grade recorded into events, snapshot from `scoreEvents`,
boundary cards render softly, no public-nav/live-v7 leak). The remaining gate is **smoke acceptance**.

---

## 8. Operator blockers (cloud)

- None for P3 itself (pure local renderer; no EAS/Supabase/APK step).
- **Operator-only:** physical-device smoke; stale remote-branch cleanup (§6.1). The first hard
  build/deploy operator blockers appear at P6+ (Supabase deploy).
