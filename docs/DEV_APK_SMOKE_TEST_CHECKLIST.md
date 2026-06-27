# Dev APK Smoke Test Checklist (Round 1)

Authoritative operator checklist for the Round 1 Dev APK smoke pass.
Replaces the former placeholder (operator-authorized import, 2026-06-11).
The operator-vault Test Checklist may extend this file; if the two diverge,
this repo copy wins for Round 1.

Round 1 policy: Android internal APK, dev-apk stage only, no Supabase env,
AI closed (fallback-only). The smoke surface is the L0 Lesson Zero bridge plus
v1 lessons L1-L6; L1 is the mandatory end-to-end run, L2-L6 are sampled for
reachability and the L6 integration payoff.

Physical smoke is operator-only. Cloud sessions may run the pre-build
commands, but must not claim a smoke pass from this file alone.
`scripts/dev/android-smoke.sh` (PR #140) is an operator convenience for
emulator screenshots, not a required path and not a substitute for this
checklist.

---

## 1. Build metadata to record

- [ ] Commit hash of main at build time:
- [ ] PR range since last build (or "first Round 1 build"):
- [ ] EAS profile used: `preview`
- [ ] EAS build ID and link:
- [ ] Device model:
- [ ] Android version:
- [ ] Date and time of build and of smoke run:
- [ ] Tester / operator name:

## 2. Pre-build checks (run from `lemot-app/`)

- [ ] Local main clean and synced: `git status` clean, `git pull origin main`
- [ ] `npm run typecheck` clean
- [ ] `npm run test:learning-engine` all passing
- [ ] `npm run validate:pools` exits 0 (6 known legacy warnings are acceptable)
- [ ] `npm run validate:content` reports 0 hard errors, 0 warnings, 0 info
- [ ] `eas.json` build profile is `preview` (Android apk, internal)
- [ ] Profile env sets `EXPO_PUBLIC_PRODUCT_STAGE=dev-apk`
- [ ] No Supabase env attached to the profile or EAS environment for Round 1
      (`EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY` absent)
- [ ] AI master switch: dev-apk `aiEnabled` is false
- [ ] public-beta `aiEnabled` is false
- [ ] sandbox is the only stage with `aiEnabled` true

## 3. Build command

```bash
eas build --platform android --profile preview
```

Record the build ID and link in section 1.

## 4. Install and fresh start

- [ ] Install the APK on a clean device, or clear app data first
- [ ] Launch the app
- [ ] No sandbox or dev surface is visible anywhere
- [ ] Tab bar shows only the expected Dev APK tab: Journey
- [ ] Chat, Practice, and Progress are intentionally hidden by feature flags
      (dev-apk: FEATURES.aiChat / practice / progress = false)
- [ ] Progress/stats is the legacy 24-lesson surface, outside the Round 1 L0-L6 scope

## 5. First-run chain

- [ ] Lesson Zero opens on first launch
- [ ] Lesson Zero (rebuilt first-run flow, #139) completes from a clean install
- [ ] Lesson Zero rebuild nudge hints are capped (#141): hints do not repeat
      endlessly and do not keep firing after the expected number
- [ ] Lesson Zero does not re-trigger on later launches once onboarding is done
- [ ] Lesson Zero leads straight into Lesson 1 (v1 L1) on completion (#139)
- [ ] How Weave Works is NOT auto-shown in the first-run chain
- [ ] How Weave Works remains available as the standalone /how-weave-works route
- [ ] Home is reached after Lesson 1 (via "Back to Home"), not directly after L0
- [ ] Home shows no Sign In or Account entry (Supabase env absent)
- [ ] Home exposes the v1 L1-L6 path; L1 is open and L2-L6 are locked until
      their prerequisite lesson is complete (sequential unlock: L(n+1) opens
      after L(n) is done)
- [ ] No L7+ lesson, no legacy 24-lesson list, is visible
- [ ] No Practice, Chat, Paywall, Premium, Word Graph, or Mon Lexique
      surfaces are visible

## 6. Lesson 1 path (mandatory full run)

- [ ] Start v1 Lesson 1 from Home
- [ ] Complete all screens in order
- [ ] Fill with traps: options grade correctly, lock after selection
- [ ] Weave: input, check, and reveal states work
- [ ] Consecutive Weave screens do not carry over text or state
- [ ] Say It Your Way: model-answer flow works with no AI network use
- [ ] Completion screen appears
- [ ] Back to Home works and Home remains usable

## 6b. L2-L6 reachability sample

- [ ] After finishing L1, L2 unlocks on Home; open it
- [ ] Open L3, L4, L5 in sequence, each unlocking after its prerequisite
- [ ] Each opened lesson renders its first screen without crash or blank state
- [ ] L6 opens and reaches the "au revoir" integration close (the small-moment
      payoff that recombines L1-L5)
- [ ] A full sequential L2-L6 completion is optional pre-release QA, not a Round
      1 blocker (see STATUS.md coverage caveat); note anything that breaks

## 7. Restart and persistence

- [ ] Kill the app mid-lesson, relaunch: no crash, no broken state,
      no repeat of Lesson Zero or How Weave Works
- [ ] Restart after completing a lesson: no crash, Home usable, completed
      lesson stays done and the next lesson stays unlocked
- [ ] Onboarding flags persist across restarts

## 8. AI, offline, and fallback

- [ ] No part of the Round 1 path requires an AI network call
- [ ] AI-disabled fallback behavior does not crash anywhere
- [ ] Airplane mode: first-run chain and Lesson 1 still work
- [ ] Note any fallback copy that feels confusing to a tester:

## 9. Route and gating checks (manual deep links)

- [ ] `/auth` redirects to Home, no raw error shown
- [ ] `/chat` (or the Chat tab) is hidden and bounces to Home
- [ ] `/practice` (or the Practice tab) is hidden and bounces to Home
- [ ] `/dev/learning-engine-player` and `/dev/learning-engine-preview`
      bounce to Home
- [ ] `/learn` sandbox routes are unavailable
- [ ] Legacy lesson deep links are not part of the Round 1 path; if tried,
      note behavior but do not treat as a Round 1 blocker

## 10. Visual and device notes

- [ ] Keyboard does not block required inputs (Weave, Say It Your Way)
- [ ] Tap targets are usable on this device
- [ ] Small viewport: no clipped or overflowing text on key screens
- [ ] TTS / audio quality note (French only, no placeholder speech):
- [ ] Android back button behavior note (no dead ends, no crash):

## 11. Tester handoff notes

- Round 1 is AI closed. Nothing in the build needs a network.
- There is no account or sign-in in this build. Do not look for one.
- Ask the tester one core question and record the answer verbatim:
  "At which point did you feel bored, confused, or tempted to stop?"
- [ ] Did the tester finish Lesson 1? (yes / no, where they stopped)
- [ ] Did the tester reopen the app within 72 hours? (yes / no)
- [ ] Did the tester start Lesson 2, if available? (yes / no / not available)

## 12. Outcome

Result (circle one): PASS / PASS WITH NOTES / FAIL

- Blockers (anything that stops the Round 1 wave):
- Non-blocking notes:
- Smoke-bucket follow-ups (items needing another device or a later build):
