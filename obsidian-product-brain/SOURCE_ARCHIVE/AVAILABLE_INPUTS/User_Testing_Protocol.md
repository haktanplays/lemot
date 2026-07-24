---
status: active
type: workflow
owner: mixed
last_reviewed: 2026-06-29
related_notes:
  - "[[Tester Feedback Log]]"
  - "[[PR and Smoke Log]]"
  - "[[Test Checklist]]"
---

# User Testing Protocol

> [!gate] Purpose
> Minimal protocol for moving Round 1.1 from operator-verified to real-tester-validated. Operator pre-checks gate the build before it reaches any external tester. Keep this short; record actual sessions in [[Tester Feedback Log]].

## Stage 1 - Operator pre-checks (gate before testers)

| Pre-check | Status | Evidence |
|---|---|---|
| Build from required HEAD, installs, opens, no crash/redbox | Done | 2026-06-29 Claude loop + [[PR and Smoke Log]] |
| Round 1.1 fixes verified (#151-#154) | Done | 2026-06-29 loop, dev-client + APK |
| **Physical TTS pre-check on a real device** | **Done (OK, 2026-06-29, Haktan)** | [[Tester Feedback Log]] entry #1 |

## Stage 2 - Real tester observation (pending)

- **Status: still pending.** No external tester session has happened yet; only an operator self spot-check.
- Recruit 1-2 true beginners (no operator involvement in driving the app).
- Observe fresh first run: Lesson Zero onboarding -> L1 completion, with minimal prompting.
- Watch specifically: does the learner understand the Weave mechanic? (feeds the Round 1.2 Weave brand-restoration candidate in [[Backlog and Deferred]]).
- Capture confusion points, TTS reactions on their own device, and any drop-off.
- Log each session in [[Tester Feedback Log]]; route durable decisions to [[Backlog and Deferred]] / [[Open Questions]].

## Notes

- Operator spot-check is a gate, not tester validation. Round 1.1 is GO / tester-ready, but real-tester observation remains open.
- Build/APK links are private; never expose them to testers via repo-safe docs.
