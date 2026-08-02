# L1 Connected Android Smoke — Operator Runbook v0.1 (PR-12)

Execution artifact for the **operator-run** half of PR-12. The automated
code-side half lives in `lemot-app/scripts/tests/l1ConnectedSmoke.test.ts` and
runs everywhere; THIS runbook requires a real Android emulator or physical
device and a human operator. **Cloud sessions must never mark any checkpoint
here as PASS.**

## Status vocabulary (use exactly these)

| Status | Meaning |
|---|---|
| `CODE-SIDE PASS` | all automated preflight commands exited 0 |
| `ANDROID OPERATOR SMOKE PENDING` | no device attached, or the manual path not yet executed — **not a failure, not a success** |
| `ANDROID SMOKE PASS` | every checkpoint below executed by an operator with zero P0/P1/P2 findings |
| `ANDROID SMOKE FAIL` | executed with at least one P0/P1/P2 finding (attach the finding list) |
| `BLOCKED — <reason>` | a checkpoint cannot be executed as written (record why; do not improvise a fix) |

## 1 · Preflight (operator machine, repo root)

```bash
./scripts/dev/l1-connected-smoke.sh
```

which runs, and requires green:

```bash
git status --short
git rev-parse HEAD
npm run typecheck            # from lemot-app
npm run test:learning-engine # from lemot-app
npm run validate:content     # from lemot-app
npm run validate:pools       # from lemot-app
./scripts/dev/android-smoke.sh devices
```

Build/launch uses the repo's existing dev workflow (Expo dev build / dev APK per
`docs/DEV_APK_MVP_CANON.md` and current EAS docs). This runbook adds no new
build command; if no build instruction fits, record `BLOCKED` rather than
inventing one. All device interaction goes through
`./scripts/dev/android-smoke.sh` (tap / text / key / screenshot / sleep) — no
ad-hoc adb.

## 2 · Manual path (checkpoints 1–13)

Record each row's status; screenshots go ONLY to `/tmp/lemot_final/` (the
existing smoke directory) and are **never committed**.

| # | Checkpoint | Screenshot | Status |
|---|---|---|---|
| 1 | Launch the current build; app reaches Home calmly | — | |
| 2 | Reach Lesson 1 through the real app route | — | |
| 3 | Progress Lesson 1 to the PM-009 screen (`s10-weave-merci-thanks`) | `pm009_before_check` | |
| 4 | PM-009: type an accepted `Merci` form → Check → calm correct feedback (no theatrical praise) → tap Continue **promptly** (settlement exercise) | `pm009_feedback` | |
| 5 | PM-011 (`s11-weave-the-order`): **whole `un thé` chip visible BEFORE any hint**, one package (never `un` + `thé`); complete the sentence; support boundary still visible after Check | `pm011_initial`, `pm011_feedback` | |
| 6 | Complete Lesson 1 to the completion view | `lesson_complete` | |
| 7 | Open Mon Lexique: `merci` = "Used independently"; `un thé` = "Growing with support"; **no separate `thé` row** | `mon_lexique` | |
| 8 | Open the learning summary: independent + Supported info plausible; **no XP/streak/accuracy/error-count copy anywhere** | `stats_before_hub` | |
| 9 | Open Practice Hub: ≥1 eligible real item returns; the ORIGINAL exercise renders; complete one returned attempt; close/Continue shows no stale set | `hub_returned_exercise` | |
| 10 | Return to the learning summary: Hub return / used-in-more-than-one-place updates after settlement | `stats_after_hub` | |
| 11 | Kill and relaunch the app: Mon Lexique / summary / Hub persist from the event log | — | |
| 12 | Learner-accessible privacy reset: **the shipped lesson path exposes no reset surface** (the local privacy controls live only in the gated sandbox learner route). Unless the build under test exposes that route, record: `BLOCKED — no operator-accessible reset surface`. Do NOT add a reset UI in PR-12. If reachable: reset → Mon Lexique, summary and Hub all empty → a new lesson attempt works **without restart** | `post_reset_empty` (if reachable) | |
| 13 | Enable airplane mode: repeat a bounded text path (one choice + PM-009); no network error blocks lesson/event/projection behavior. (Claims cover the TEXT spine only — not TTS availability, recorded audio, or cloud sync.) | — | |

## 3 · Severity rubric and decision

- **P0** — crash; data corruption; privacy reset recreates deleted history; wrong learner identity/history boundary.
- **P1** — Supported counted as independent; recognition/open exposure creates ownership; wrong item/payload/sentence identity; event lost during Continue/navigation settlement; duplicate mastery row/store; projection disagrees with event history.
- **P2** — route or core action broken; Hub cannot complete a returned item; Mon Lexique/summary fail to load; offline text flow blocked.
- **P3** — non-blocking layout; unclear but usable copy; minor visual inconsistency.

Decision:

- any **P0/P1** → STOP; separate correction branch before anything else.
- any **P2** → do not begin user testing.
- **P3 only** → user test may proceed with issues logged.
- **zero P0/P1/P2** → technically ready for the first 2–3-person observed L0–L1 test.

## 4 · Result record

```
Date/operator: ____________________
Build (commit): ____________________
Device: ____________________
CODE-SIDE SMOKE: PASS / FAIL
ANDROID OPERATOR SMOKE: PENDING / PASS / FAIL
Findings (id · severity · checkpoint · note):
  ____________________
```

Current state as committed: **CODE-SIDE PASS · ANDROID OPERATOR SMOKE
PENDING** (this branch was produced in a cloud session with no attached
Android target; nothing here claims a device result).
