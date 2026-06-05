# Founder Self-Learning Build — P5 (Local Privacy / Data-Rights) Checkpoint

**Date:** 2026-06-05
**`main` HEAD:** `786f5a0`
**Workstream:** Founder Self-Learning Build — P5 (Local Privacy / Data-Rights layer)
**Status:** P5.1–P5.4C **code-side complete** on `main`. Local-first remains the default; **remote / tester sync is not enabled**.

> Docs-only checkpoint. No code / schema / runtime / player / fixture / content change accompanies this note.
> It records that the **local-only** privacy/data-rights layer is complete, what landed across P5.1–P5.4C,
> the data-rights behavior the founder-local UI now supports, the safety boundaries that still hold, the
> known limitations, and the gates that must be cleared before any remote/tester work begins. It complements —
> and does not change — [`founder-self-learning-privacy-kvkk-gdpr-architecture-note.md`](./founder-self-learning-privacy-kvkk-gdpr-architecture-note.md)
> (P5.1) and the P3/P4 checkpoints.

---

## 1. Status summary

| Field | Value |
|---|---|
| Date | 2026-06-05 |
| `main` HEAD | `786f5a0` |
| P5 local privacy/data-rights | **code-side complete** (P5.1–P5.4C merged) |
| Local-first default | **YES** — learning events and privacy state live on device |
| Remote / tester sync | **NOT enabled** |
| Supabase / RemoteRepository / tester ingest / admin read model | **NOT implemented** |

- The P5 **local** privacy/data-rights layer is code-side complete on `main` @ `786f5a0`.
- Local-first remains the default: the event log is the on-device source of truth; mastery / Mon Lexique /
  Practice Pool stay recomputable projections.
- Remote / tester sync is still **not enabled** — there is no client path that uploads learner data.
- No Supabase / `RemoteRepository` / tester ingest / admin read model has been implemented. The privacy
  surfaces are entirely local.

A release is **not** "done" in cloud while physical/on-device founder smoke and legal review remain open
operator tasks (Master Pipeline Rule 11 — cloud declares "code-side ready", not "complete").

---

## 2. Completed P5 PR map

| Phase | PR | Summary |
|---|---|---|
| P5.1 | **#69** | Privacy / KVKK–GDPR architecture note + consent/data map |
| P5.2 | **#70** | Local privacy/consent model (pure, versioned `PrivacyState`) |
| P5.3 | **#71** | Local export / delete primitives (`exportLocalLearningData`, `clearLocalLearningData`) |
| P5.4A | **#72** | Persist `PrivacyState` under `lm_le_privacy_state` |
| P5.4B | **#73** | Founder-local one-time disclosure notice |
| P5.4C | **#74** | Local privacy & data controls surface (export summary + two-step reset) |

All six merged to `main`; current `main` HEAD `786f5a0`.

---

## 3. Architecture state

- **PrivacyState model exists and is versioned** (`PRIVACY_STATE_VERSION`); a stale/unknown version safely
  resets to `createEmptyPrivacyState()` rather than guessing (migration-free).
- **PrivacyState is persisted** under the dedicated key `lm_le_privacy_state` (P5.4A), distinct from the
  event/snapshot keys and from legacy keys.
- **Local disclosure is shown once and persisted** via `markAndPersistLocalDisclosureSeen` (records the
  disclosure-seen block only; touches no consent block).
- **Local export is available** through `exportLocalLearningData` — reads events via the
  `LearningRepository` interface and folds the deterministic `MasterySnapshot`.
- **Local reset is available** through `clearLocalLearningData` + `clearLocalPrivacyState` — narrow,
  key-scoped removals.
- **Learning events remain local-first** — the append loop and serialized controller are unchanged.
- **Export shows a learner-safe summary only** — no raw JSON / `userAnswer` UI dump.
- **Reset is two-step and narrow** — confirmation required; only the learning-engine + privacy keys cleared.
- **`lm7` / `lm7_srs` remain separate / untouched** by the P5 primitives.
- **Legacy Supabase schema remains separate** from the learning-engine; no learning data flows to it.

Key namespace (for reference):

```
lm_le_events          ← learning event log (source of truth)
lm_le_snapshot        ← optional cached MasterySnapshot projection
lm_le_privacy_state   ← versioned PrivacyState (P5.4A)
lm7 / lm7_srs         ← legacy app storage (separate, untouched)
```

---

## 4. Data-rights behavior summary

- The user can **see the local-first disclosure** once (founder-local notice, P5.4B).
- The user can **prepare a local export summary** (item count + whether a progress summary is included).
- The user can **reset local learning / privacy data** (two-step confirm → both clear primitives).
- **Remote sync is not enabled.**
- **Tester / account consent are not requested** by the founder-local UI.
- **No remote data-rights implementation exists yet** — because no remote path exists yet. Local data
  rights (access via export summary, erasure via reset) are satisfied entirely on-device.

---

## 5. Safety boundaries confirmed

- No public-nav exposure (the privacy surface renders only inside the sandbox/founder-gated, deep-link-only
  learner route).
- No Supabase / network / AI.
- No `RemoteRepository`.
- No tester sync.
- No admin dashboard.
- No `LearningEvent` shape changes.
- No session-controller changes for privacy.
- No raw privacy state / storage keys / raw event JSON / raw `userAnswer` rendered.
- No Share API / file download / clipboard (yet).
- No third-party analytics.

---

## 6. Known limitations / follow-ups

- **Export prepares a local summary, not a file download/share.** A learner-safe summary is shown; no file
  is written and nothing is shared/uploaded.
- **Reset may require a reload / remount** to visually reflect all cleared projections immediately.
- **Legal review still required** before public/tester launch (KVKK/GDPR).
- **Remote schema / RLS still only planned**, not implemented.
- **Consent wording / retention / cross-border transfer remain open legal questions.**
- **Branch cleanup remains operator-only** due to the cloud delete-push 403 constraint.

---

## 7. Gates before remote/tester work

Remote / tester work may **not** begin until:

- Founder smoke accepted, or explicitly accepted-pending.
- This checkpoint is merged.
- Legal review completed, or consciously deferred for non-public internal testing.
- Supabase / RLS draft accepted.
- Consent wording and retention policy accepted.
- No client-side `service_role`.
- No remote ingestion without `consent_version` / `consent_at`.

---

## 8. Recommended next workstreams

- **Option A — Founder smoke acceptance / device pass.** Run the on-device smoke for the local privacy
  surfaces; record acceptance.
- **Option B — P5.5 Remote schema / RLS draft (design-only, no deploy).** Draft the remote ingestion
  schema + RLS on paper; nothing deployed, no client path opened.
- **Option C — Local export file/share implementation (still local-only).** Add an actual file/share path
  for the already-prepared export, keeping it on-device.
- **Option D — Reset UX polish / reload state refresh.** Make cleared projections refresh visually without
  requiring a manual reload/remount.

---

## Pointer / cross-references

- P5.1 architecture note: [`founder-self-learning-privacy-kvkk-gdpr-architecture-note.md`](./founder-self-learning-privacy-kvkk-gdpr-architecture-note.md)
- P4 checkpoint: [`founder-self-learning-p4-mon-lexique-practice-pool-checkpoint.md`](./founder-self-learning-p4-mon-lexique-practice-pool-checkpoint.md)
- P3 checkpoint: [`founder-self-learning-p3-learner-renderer-checkpoint.md`](./founder-self-learning-p3-learner-renderer-checkpoint.md)
