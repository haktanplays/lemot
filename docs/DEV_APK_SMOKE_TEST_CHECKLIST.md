# Dev APK Smoke Test Checklist (Round 1)

Authoritative operator checklist for the Round 1 Dev APK smoke pass.
Replaces the former placeholder (operator-authorized import, 2026-06-11).
The operator-vault Test Checklist may extend this file; if the two diverge,
this repo copy wins for Round 1.

Round 1 policy: Android internal APK, dev-apk stage only, no Supabase env,
AI closed (fallback-only), v1 Lesson 1 is the smoke surface.

Physical smoke is operator-only. Cloud sessions may run the pre-build
commands, but must not claim a smoke pass from this file alone.

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
- [ ] Tab bar shows only the expected Dev APK tabs: Journey and Progress

## 5. First-run chain

- [ ] Lesson Zero opens on first launch
- [ ] How Weave Works opens after Lesson Zero
- [ ] Home opens after How Weave Works
- [ ] Home shows no Sign In or Account entry (Supabase env absent)
- [ ] Home exposes the v1 Lesson 1 entry
- [ ] No Practice, Chat, Paywall, Premium, Word Graph, or Mon Lexique
      surfaces are visible

## 6. Lesson 1 path

- [ ] Start v1 Lesson 1 from Home
- [ ] Complete all screens in order
- [ ] Fill with traps: options grade correctly, lock after selection
- [ ] Weave: input, check, and reveal states work
- [ ] Consecutive Weave screens do not carry over text or state
- [ ] Say It Your Way: model-answer flow works with no AI network use
- [ ] Completion screen appears
- [ ] Back to Home works and Home remains usable

## 7. Restart and persistence

- [ ] Kill the app mid-lesson, relaunch: no crash, no broken state,
      no repeat of Lesson Zero or How Weave Works
- [ ] Restart after completing Lesson 1: no crash, Home usable
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
