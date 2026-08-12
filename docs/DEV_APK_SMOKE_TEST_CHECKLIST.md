# Dev APK Smoke Test Checklist — Internal Tester Wave (L0–L24)

Authoritative operator checklist for the internal tester APK smoke pass.
Refreshed 2026-08-12 for the completed L0–L24 pre-Campfire arc; supersedes the
Round 1 (L0–L6) version of this file. The operator-vault Test Checklist may
extend this file; if the two diverge, this repo copy wins.

Build policy (ratified pre-APK scope decisions): Android internal APK,
**dev-apk stage only**, **no Supabase env**, **AI closed** (deterministic
fallback only), **accountless local-first**. The smoke surface is Lesson Zero
plus the full v1 Journey L1–L24 under the linear unlock, with the three
permanent tabs: **Journey / Mon Lexique / Practice**.

Physical smoke is operator-only. Cloud sessions may run the pre-build
commands, but must not claim a smoke pass from this file alone.
`scripts/dev/android-smoke.sh` is an operator convenience for emulator
screenshots, not a required path and not a substitute for this checklist.

---

## 1. Build metadata to record

- [ ] Source branch and commit hash at build time:
- [ ] PR/commit range since last build (or "first internal-test build"):
- [ ] EAS profile used: `preview`
- [ ] APK / EAS build ID and link:
- [ ] Device model:
- [ ] Android version:
- [ ] Date and time of build and of smoke run:
- [ ] Tester / operator name:

## 2. Pre-build checks (run from `lemot-app/`)

Repo state:

- [ ] Working tree clean (`git status`), branch synced with its remote
- [ ] `npm run typecheck` clean
- [ ] `npm run test:learning-engine` all passing
- [ ] `npm run validate:pools` exits 0 (6 known legacy warnings are acceptable)
- [ ] `npm run validate:content` reports 0 hard errors, 0 warnings, 0 info
- [ ] Expected corpus counts confirmed by validate:content output:
      **25 lessons (L0–L24) · 27 acquisition demands · registry 65 frozen ·
      journey roles: doorway 9 / standard 7 / integration 6 / milestone 2 /
      unset 1**

Build assertion contract (MUST — the build is blocked until every line holds):

- [ ] STAGE: profile env sets `EXPO_PUBLIC_PRODUCT_STAGE=dev-apk`, or leaves it
      unset (stage resolution fails closed to `dev-apk`; see
      `config/productStage.ts`). **Building the tester APK in `sandbox` is
      explicitly blocked** — sandbox exposes the legacy lesson list, Daily
      Review, the Chat tab and live AI.
- [ ] AI: effective `FEATURES.aiEnabled` is **false** at dev-apk (and remains
      false at public-beta; sandbox is the only stage with it true)
- [ ] SUPABASE: no public Supabase configuration is attached to the profile or
      EAS environment (`EXPO_PUBLIC_SUPABASE_URL` and
      `EXPO_PUBLIC_SUPABASE_ANON_KEY` absent) → effective
      `supabaseReady = false`
- [ ] SUPABASE — EAS SERVER-SIDE ENVIRONMENT (blocking): inspect the actual
      EAS environment store the build resolves, not just `eas.json` —
      `eas.json` alone is NOT sufficient evidence of the effective build
      environment (an internal-distribution build pulls the server-side
      `preview` environment by default). Run
      `npx eas-cli env:list preview`
      and require that `EXPO_PUBLIC_SUPABASE_URL` and
      `EXPO_PUBLIC_SUPABASE_ANON_KEY` are ABSENT for this accountless tester
      artifact. If either is present, the build is blocked until it is removed
      (found present and deleted 2026-08-12; they were residue of the
      superseded legacy in-lesson-AI preview setup in
      `docs/EAS_PREVIEW_BUILD.md`).
- [ ] AUTH: with Supabase env absent, no Sign In / Account affordance renders
      in normal tester UI (verified again on-device in §4)
- [ ] V1 AI PAYLOAD: zero shipped L0–L24 say-it screens declare
      `ai-assisted-with-fallback` (or any live-AI validation mode) — e.g.
      `grep -rn "ai-assisted" content/lessons/v1/` returns nothing
- [ ] LEGACY: legacy tabs (`chat` / `practice` / `stats`) remain `href: null`,
      the legacy lesson list is not rendered at dev-apk, Daily Review remains
      flag-hidden at dev-apk, and dev-player routes remain gated behind
      `sandbox && __DEV__`

## 3. Build command

```bash
eas build --platform android --profile preview
```

Record the build ID and link in section 1. (Build execution is operator-only
and happens after the final hostile pre-APK audit — this file only defines
what that build must verify.)

## 4. Install and fresh start

- [ ] Install the APK on a clean device, or clear app data first
- [ ] Launch the app
- [ ] No sandbox or dev surface is visible anywhere
- [ ] The permanent tabs are exactly **Journey / Mon Lexique / Practice**
- [ ] No Sign In or Account entry anywhere (Supabase env absent)
- [ ] No unexpected auth interception at any point in the first-run flow

## 5. First-run chain

- [ ] Lesson Zero opens on first launch
- [ ] Lesson Zero completes from a clean install and leads straight into
      Lesson 1 (v1 L1)
- [ ] Lesson Zero does not re-trigger on later launches
- [ ] How Weave Works is NOT part of the first-run chain (its standalone route
      may exist; nothing links to it — not required in normal flow)
- [ ] Home is reached after Lesson 1 (via "Back to Home"), not directly after L0

## 6. Journey (L1–L24)

- [ ] Home shows the v1 Journey path with **all 24 rows, L1 through L24**
- [ ] Progression is linear: exactly one row shows "Start"; rows after it read
      "Not yet"; the lock reason appears once, under the first locked row
- [ ] Completing L(n) unlocks L(n+1); completed lessons stay "Done" and remain
      open for replay
- [ ] After finishing L10, **L11 unlocks and opens** (the old L10 cap is gone)
- [ ] A representative middle lesson (suggest L16 or L17) opens and renders
- [ ] **L20 (first milestone)** is reachable and renders
- [ ] **L24 (final milestone)** is the last row; no L25 / Campfire / "coming
      soon" row appears after it
- [ ] No legacy lesson card and no legacy 24-lesson list appears anywhere
- [ ] Progression works with no account and no network

Operator note: manually completing all 24 lessons is NOT required for smoke.
Verify L1 end-to-end (§7), the unlock mechanics on 2–3 consecutive lessons,
and representative reachability (middle lesson + L20 + L24 via progressed
state). If a safe operator mechanism exists to pre-seed progress (e.g. a
progressed emulator image carried forward from an earlier pass), targeted
smoke of L11+, L20 and L24 from that state is acceptable; note how the state
was produced.

## 7. Lesson rendering (representative screen families)

Mandatory full run — Lesson 1, every screen in order. Then confirm each screen
family below renders and grades correctly in at least one live lesson:

- [ ] Meet card incl. TTS Listen button (L1 or L21 s00 — French only, no
      placeholder speech)
- [ ] Fill with traps: options grade correctly, lock after selection, trap
      reasons show (L1/L21)
- [ ] Weave (context and open): input, check, reveal states; consecutive
      weaves do not carry over text or state (any lesson; L23/L24 for the
      no-pieces open weaves)
- [ ] Say It Your Way: confirm step, "Try again" preserves text, model-answer
      reveal with natural alternatives, **no AI network use** (L20/L23/L24
      exits)
- [ ] "Need a hint?" pieces path: pieces stay hidden until opted in, no piece
      is required (any say-it with suggested pieces)
- [ ] Insight card (lesson-goal and non-goal variants — L24 s00/s05)
- [ ] Natural reveal (L20/L23/L24)
- [ ] Recap + completion view: "Back to Home" primary, "Open Mon Lexique"
      shortcut works after settlement

## 8. Practice (derived)

- [ ] Practice tab reachable at any point
- [ ] Before any lesson evidence exists: the honest resting state renders
      ("Nothing needs your attention right now…") — an empty list is not an
      error
- [ ] After completing at least one lesson: derived entries can appear (fr/en
      + calm return line), opening one reuses a real authored lesson screen,
      answering it returns to the recomputed list
- [ ] No legacy SRS Scenario Card UI appears anywhere in the Practice tab

## 9. Mon Lexique + Learning summary

- [ ] Mon Lexique tab reachable; before progress it shows the honest empty
      state
- [ ] After lessons: entries derive from actual progress; the four bands
      render (Yours / Becoming yours / You've met this / Worth another look)
- [ ] "Learning summary" opens from the Mon Lexique header and renders
- [ ] No Word Graph, no error-engine surface, no edit/delete/search controls —
      read-only by design

## 10. Completion / L24

- [ ] L24 completes like any lesson: normal completion view, no gate
- [ ] No Campfire unlock, checkpoint, score, percentage, badge, level or
      "journey complete" UI anywhere
- [ ] After L24, Home simply shows the path with all rows Done; app remains
      fully usable

## 11. Legacy leakage (explicit negative checks)

- [ ] No legacy Chat tab or chat surface anywhere
- [ ] No legacy SRS practice tab (the visible Practice tab is the derived Hub
      only)
- [ ] No legacy 24-lesson syllabus/progress UI
- [ ] No Daily Review card or overlay on Home
- [ ] No dev-player / fixture UI (`/dev/*`, `/learn/*` bounce to Home)
- [ ] `/auth` deep link redirects cleanly to Home, no raw error
- [ ] `/how-weave-works` is not required by, or linked from, the normal flow

## 12. AI / network / offline

- [ ] No part of the L0–L24 path requires an AI call — completion is fully
      deterministic
- [ ] No AI error or fallback surface appears during normal lesson flow
- [ ] Airplane mode: first-run chain and Lesson 1 still work end to end
- [ ] No account or network dependency appears anywhere

## 13. Restart and persistence

- [ ] Kill the app mid-lesson, relaunch: no crash, no repeat of Lesson Zero
- [ ] Restart after completing a lesson: completed lesson stays done, next
      lesson stays unlocked
- [ ] Onboarding flags persist across restarts

## 14. Visual and device notes

- [ ] Keyboard does not block required inputs (Weave, Say It Your Way)
- [ ] Tap targets usable; small viewport: no clipped/overflowing text on key
      screens (long say-it situations in L23/L24 are the widest copy)
- [ ] TTS / audio note (French only, no placeholder speech):
- [ ] Android back button behavior note (no dead ends, no crash):

## 15. Tester feedback posture

First internal test feedback is gathered through:

- **direct observation** of the session,
- **learner comments**, recorded verbatim,
- the **Learning summary** screen (open it with the tester at the end),
- the existing **device-local learning-event state**, when operator inspection
  is needed for debugging.

Do NOT rely on `npm run telemetry:report` for tester data: runtime telemetry
writers are currently unwired, so the telemetry store is empty by design.
Privacy Export is not a tester-facing feedback path in this build. No new
analytics.

Ask each tester one core question and record the answer verbatim:
"At which point did you feel bored, confused, or tempted to stop?"

- [ ] Did the tester finish Lesson 1? (yes / no, where they stopped)
- [ ] How far did the tester get in one sitting? (highest lesson reached)
- [ ] Did the tester open Practice or Mon Lexique unprompted? (yes / no)
- [ ] Did the tester reopen the app within 72 hours? (yes / no)

## 16. Outcome

Result (circle one): PASS / PASS WITH NOTES / FAIL

- Blockers (anything that stops the internal tester wave):
- Non-blocking notes:
- Smoke-bucket follow-ups (items needing another device or a later build):
