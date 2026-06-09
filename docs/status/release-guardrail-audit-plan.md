# Release Guardrail Audit Plan (PR-B)

**Date:** 2026-06-09
**`main` HEAD:** `32f1625` (or newer)
**Queue position:** PR-B of `docs/status/repo-audit-disposition-2026-06-09.md` §5
**Status:** Docs-only plan. No runtime / release-config / EAS / Supabase / DB / UI / route /
content / dependency change accompanies this file.

---

## 1. Purpose

This plan prepares the **release/DX guardrail sprint** that the audit disposition placed before
further engine acceleration. It specifies, file by file, what the next guardrail implementation
PR(s) will do for R1 (EAS env / silent cloud failure), R2 (dev route exposure), R3 (stage
fallback direction), the `supabaseReady` banner, and the G3 email-confirmation Operator gate.

This document **plans only**. It does **not** authorize:

- any implementation (the code PR needs its own approval)
- Home cutover (route contract unchanged)
- DB deployment or any Supabase project change
- APK build or smoke

## 2. Source findings

Accepted findings from the 2026-06-09 audit (disposition §3, all verified read-only against
current `main` during this plan's preparation):

- **R1 — EAS env / silent Supabase failure:** `eas.json` preview env sets **only**
  `EXPO_PUBLIC_PRODUCT_STAGE=dev-apk`; no Supabase URL/anon key reaches an EAS cloud build
  (`.env` is gitignored and no `.env*` file is committed) → `supabaseReady=false` → auth and AI
  silently disabled in a tester APK. Worst failure class: invisible.
- **R2 — dev routes reachable in tester APK:** `app/dev/learning-engine-player.tsx` and
  `app/dev/learning-engine-preview.tsx` contain **no stage gating at all** (verified: zero
  `PRODUCT_STAGE`/`FEATURES` references). With app scheme `lemot`, a tester can deep-link
  `lemot://dev/learning-engine-player`.
- **R3 — stage fallback fails open:** `resolveProductStage()` (`config/productStage.ts`) falls
  back to `"sandbox"` on missing/invalid env. Safe locally; in a build context a typo'd stage
  ships a tester APK with **every** flag on.
- **G3 — email confirmation:** disabled for Sprint 10 testing; P0 before the first external
  tester. Operator/Supabase Dashboard action, not app code (see §5).
- **Related:** dev-apk needs a **visible** warning when `supabaseReady=false`, so a cloud-disabled
  build can never masquerade as a working one (§8).

## 3. Current stage and route contract

**Stages** (`config/productStage.ts`, declarative `FEATURES_BY_STAGE`):

| Stage | Intent | Relevant flags today |
|---|---|---|
| `sandbox` | internal emulator / founder dev | everything on, `v1LessonEngine: true` |
| `dev-apk` | controlled external MVP testing | minimal surface; `aiChat: false`, `v1LessonEngine: false`, no paywall |
| `public-beta` | future monetized beta | paywall + RevenueCat on, `v1LessonEngine: false` |

**Route contract** (per `dev-apk-sandbox-route-contract.md`, unchanged by this plan):

- Dev APK first lesson **remains v1** (Home routes into the v1 lesson surface).
- learning-engine L2 remains **sandbox-only**; `/learn/[fixtureId]` is gated by
  `PRODUCT_STAGE === "sandbox" && FEATURES.v1LessonEngine` with a safe "unavailable" fallback
  (`app/learn/[fixtureId].tsx:34`).
- `/learn/l2` is **not Home-linked**; deep-link only.
- This plan does **not** change or authorize cutover (freeze checkpoint + matrix D4/DD1 stand).

## 4. R1 plan — EAS env / Supabase readiness

**Current observed behavior (read-only inspection):**

- `EXPO_PUBLIC_PRODUCT_STAGE` is set in exactly one build place: `eas.json` → `build.preview.env`
  (value `dev-apk`). Local dev gets no env → sandbox default.
- Supabase client config: `lib/supabase.ts` reads `EXPO_PUBLIC_SUPABASE_URL` and
  `EXPO_PUBLIC_SUPABASE_ANON_KEY` with `?? ""` defaults;
  `supabaseReady = url.length > 0 && anonKey.length > 0`.
- **No Supabase env reaches EAS builds today**: `eas.json` doesn't define them, `.env` is local
  only. An EAS preview build therefore ships with `supabaseReady=false`.
- Consumers degrade silently: `hooks/useAuth.ts` short-circuits, `lib/ai.ts` returns fallbacks.
  The APK runs, looks fine, and has auth+AI off. No crash, no signal.

**Options:**

- **A. EAS env on expo.dev** — define `EXPO_PUBLIC_SUPABASE_URL` / `..._ANON_KEY` as EAS
  environment variables for the preview profile. Pros: out of repo, per-profile, rotatable
  without commit. Cons: invisible dashboard state; a fresh clone or a second machine can't see
  whether it's configured; drift between dashboard and repo is exactly the doc↔code transition
  zone the audit warns about.
- **B. Commit public values to `eas.json` preview env** — the anon key is public by design
  (shipped inside every APK anyway; RLS is the security boundary, not key secrecy). Pros: visible,
  reviewable, diffable, survives machine changes; one source of truth next to the stage env that
  already lives there. Cons: key rotation needs a commit; looks alarming to anyone trained on
  "no keys in repo" without the anon-key context.
- **C. Keep local-only and explicitly block external builds** — defer entirely; add a build-time
  guard that fails any EAS build until env strategy is decided. Pros: zero risk now. Cons: kicks
  the can; the first tester build still needs A or B.

**Recommendation: Option B**, with a one-line comment in `eas.json` noting the anon key is
public-by-design and RLS is the boundary. Rationale: this repo's failure mode is *silent
dashboard/repo drift*, and B is the only option where the build input is reviewable in the same
PR discipline as everything else. Option A remains acceptable if the Operator prefers dashboard
management (decision DP1) — in that case PR-B's checklist gains an "Operator verifies EAS env"
step that cloud sessions cannot perform.

**Hard guardrails (whichever option wins):**

- **Never** put the service-role key in any client-reachable place. Only `EXPO_PUBLIC_*` URL +
  anon key are in scope here.
- No private secrets committed. The anon key + project URL are the only candidates and both are
  public-by-design; anything else stays in Edge Function `Deno.env` / Supabase secrets.
- Managed deliberately: whichever home is chosen, the *other* location gets a pointer comment so
  there is exactly one source of truth.
- If `supabaseReady=false` in dev-apk, the §8 banner makes it visible. A cloud-disabled tester
  build must never be silent.

## 5. G3 plan — email confirmation Operator gate

- Email confirmation was disabled in the Supabase Dashboard for Sprint 10 auth testing. It is a
  **Supabase Dashboard / Operator action, not normal app code** — no repo diff can close it.
- It is **P0 before the first external tester** (disposition §4).
- It must be **completed or explicitly waived by the Operator** before any external tester build
  ships.
- If external tester distribution is in scope, it **gates the return to engine build-out**
  (PR-G `fill_with_traps`) per the disposition's Operator Gate note (§5).

**Proposed release-gate checklist item** (for the future release checklist / Test Checklist):

```txt
[ ] G3 — Email confirmation re-enabled in Supabase Dashboard
    (Auth → Providers → Email → "Confirm email" ON), verified by creating a
    throwaway account and receiving the confirmation mail; or explicitly
    waived in writing for this build wave. Operator-only. Blocks any external
    tester APK.
```

## 6. R2 plan — dev route gating

**Dev routes found** (`app/dev/`):

| Route | Current guard | Classification |
|---|---|---|
| `dev/learning-engine-player` | **none** | sandbox-only developer route; should be blocked outside sandbox |
| `dev/learning-engine-preview` | **none** | sandbox-only developer route; should be blocked outside sandbox |

Neither is Home-linked, but both are reachable by deep link (`lemot://dev/...`) in any build,
including a tester APK. Neither is "safe in dev-apk": they are debug surfaces (raw fixture
players) and the locked debug-vs-learner boundary says debug surfaces never reach learners.

**Comparison — the existing good pattern** (`app/learn/[fixtureId].tsx:34`):

```ts
const LEARNER_RENDERER_ENABLED =
  PRODUCT_STAGE === "sandbox" && FEATURES.v1LessonEngine;
// + early-return "unavailable" view when false
```

**Recommended smallest implementation:** copy this guard pattern into both `app/dev/*` files
(constant + early-return fallback; the fallback can be the same calm "unavailable" view). Roughly
three lines per file plus the fallback render.

Explicitly out of scope for that change: `/learn/l2` behavior (already correctly gated, untouched),
Home routes, v1 surfaces.

## 7. R3 plan — fail-closed stage fallback

**Current behavior** (`config/productStage.ts`): `resolveProductStage(value)` returns the value
only if it is one of `sandbox | dev-apk | public-beta`; **anything else (including unset) returns
`"sandbox"`**.

**Why that direction is wrong in builds:** locally, sandbox-by-default is exactly right (emulator
sessions should never break on a typo). In an EAS build, the same fallback means a misspelled or
missing `EXPO_PUBLIC_PRODUCT_STAGE` ships a tester APK with sandbox's everything-on flag set —
dev player exposed, `v1LessonEngine` on, aiChat on. The failure opens the surface instead of
closing it.

**Timing constraint discovered during inspection:** `EXPO_PUBLIC_*` values are inlined at bundle
time, but `EAS_BUILD` (set by EAS during builds) is a **build-time** env not visible to app
runtime code. So a pure runtime check inside `resolveProductStage` cannot ask "am I in an EAS
build?". Fail-closed therefore needs a build-time component, a baked signal, or both.

**Options:**

- **A. Throw on invalid stage when `EAS_BUILD` is true** — must run at build/config evaluation
  time (e.g. `app.config.js` or an `eas-build-pre-install` hook), where `EAS_BUILD` is visible.
  Loud, immediate, nothing ships. Doesn't help if the value is valid-but-wrong.
- **B. Fall back to `dev-apk` when in a build** — runtime-side: since `EAS_BUILD` isn't visible
  at runtime, the practical proxy is `!__DEV__` (release bundles). Invalid/missing stage in a
  release build → `dev-apk` (most-closed real surface) instead of `sandbox`. Quiet but safe.
- **C. `validateProductStage` helper + explicit build guard** — one exported helper holding the
  valid-stage check, consumed in **two** places: (1) a build-time assert (option A's mechanism)
  that fails the EAS build on missing/invalid stage; (2) the runtime resolver flips its fallback
  to `dev-apk` when `!__DEV__` (option B's behavior). Local `__DEV__` keeps the sandbox default.

**Recommendation: Option C** — it is A and B as two layers of the same helper. A typo should be a
loud build failure (layer 1), and if anything slips past, the shipped bundle still fails closed
(layer 2). Local development behavior is unchanged. The helper also gives the future test suite a
pure function to pin.

## 8. supabaseReady banner spec

Plan only (no UI implementation in this PR):

- **Where:** dev-apk Home screen, a small static notice row at the top of the scroll content
  (above the lesson list). One line, no interaction, no dismissal state to store.
- **Trigger:** `PRODUCT_STAGE === "dev-apk" && !supabaseReady`. Both values exist today; no new
  state, storage, or event is needed.
- **Who sees it:** external testers and the Operator checking a fresh install. That is the point:
  the broken-cloud build identifies itself on the first screen.
- **Copy direction (short, factual, non-alarming):**
  > "Cloud services are not configured for this build. Sign-in and AI feedback are disabled."
  Calm declarative tone. No XP/streak/reward language. No em/en dash asides. No "error!" framing,
  since lessons still work offline.
- **Sandbox:** not shown. The founder environment frequently runs without cloud env on purpose;
  a `console.warn` from `lib/supabase.ts` is enough there (optional, cheap).
- **Public-beta:** not shown — deliberately. A public build with `supabaseReady=false` is not a
  banner situation; it is a build that must not ship. The §7 build-time guard is the right layer
  for that (it can additionally assert Supabase env presence when the stage is `public-beta`;
  noted as an option for the implementation PR, decision DP5).

## 9. Future implementation PR split

- **Option A — single code PR (disposition's PR-D):** dev route gating (§6) + fail-closed stage
  fallback (§7) + dev-apk `supabaseReady` banner (§8) in one PR.
- **Option B — two code PRs:** PR-D1 = stage/env guard + dev route gating (pure config/guard
  logic); PR-D2 = banner (the only UI-touching piece).

**Recommendation: Option A**, matching the disposition's PR-D row. All three pieces are small,
share the same review surface (`productStage.ts` + two dev routes + one Home notice row), and the
banner is data-driven off values the same PR hardens. Split to Option B only if the §7 build-time
guard turns out to need an `app.config.js` migration (stop condition below).

**PR-D (single, recommended):**

- **Likely files:** `config/productStage.ts` (helper + fallback), `app.config.js` or
  `eas-build-pre-install` hook (build-time assert — new small file),
  `app/dev/learning-engine-player.tsx`, `app/dev/learning-engine-preview.tsx` (guards),
  `app/(tabs)/index.tsx` or a tiny `components/CloudNotice.tsx` (banner), plus
  `eas.json` if DP1 chooses Option B for env (one env block addition),
  `scripts/tests/` (stage resolution unit tests).
- **Risk level:** medium-low. Stage resolution touches everything, but the change is
  fallback-direction only, pinned by new unit tests; route guards copy a proven pattern; banner
  is presentation-only.
- **Validation:** `validate:content` 0/0/0, `typecheck`, `test:learning-engine` (75 + new stage
  tests), grep audit that every `app/dev/*` file contains the guard constant, manual sandbox
  smoke of `/learn/l2` (must be unchanged), manual stage simulation (§10).
- **Manual checks:** run with `EXPO_PUBLIC_PRODUCT_STAGE=dev-apk` locally and confirm dev routes
  show the unavailable view + banner appears when Supabase env is absent; run unset (sandbox) and
  confirm dev routes work and no banner.
- **Stop conditions:** STOP and report if the build-time assert requires converting `app.json` →
  `app.config.js` and that conversion touches anything beyond adding the assert (then split per
  Option B); STOP if any existing test fails; STOP if `/learn/l2` behavior changes in any stage;
  STOP if banner work starts pulling in new state/storage.

## 10. Validation plan for implementation

For the future code PR (not this docs PR):

- `npm --prefix lemot-app run validate:content` → 0/0/0
- `npm --prefix lemot-app run typecheck` → clean
- `npm --prefix lemot-app run test:learning-engine` → all passing, plus new
  `resolveProductStage`/`validateProductStage` unit tests (pure function, trivially testable)
- **Route grep:** every file under `app/dev/` references the sandbox guard; CI-greppable
- **Stage simulation:** local runs with stage env set to each of the three stages + one invalid
  value, asserting resolved stage and dev-route availability per matrix
- **dev-apk config inspection:** read `eas.json` (and EAS env list if DP1 = Option A) and confirm
  exactly the intended `EXPO_PUBLIC_*` keys are present
- **No APK build** unless the Operator requests a build candidate
- **No Supabase Dashboard change** unless the Operator performs it (G3 toggle is theirs)

## 11. Non-goals

This plan does **not** authorize:

- Home cutover
- v1 expansion
- DB deployment
- Supabase project changes (G3 toggle is Operator-only, planned not performed)
- EAS secret writes (env values land only via the approved option in DP1, in the code PR)
- AI chat expansion (PR-E hardening is separate and unaffected)
- paywall implementation
- dependency upgrades
- APK build/smoke
- content production
- learning-engine route exposure in dev-apk (`/learn/*` stays sandbox-only)

## 12. Decision points

| # | Decision | Maker | Feeds |
|---|---|---|---|
| **DP1** | Supabase URL/anon key home: EAS env on expo.dev (A) or `eas.json` preview env (B)? Plan recommends **B** | User/Operator | PR-D `eas.json` change vs Operator checklist step |
| **DP2** | Is an external tester build **now in scope**? (Determines whether G3 + R1 are immediate blockers or staged) | User | Sprint sequencing; Operator Gate timing |
| **DP3** | Must email confirmation be re-enabled before **any** build artifact, or only before external distribution? | User/Operator | G3 gate strictness |
| **DP4** | Fail-closed shape: build-time throw (A), runtime dev-apk fallback (B), or both via helper (C)? Plan recommends **C** | User | PR-D §7 implementation |
| **DP5** | Where does the `supabaseReady` warning appear: dev-apk only (recommended), sandbox too, or both? And should the build-time guard additionally assert Supabase env for `public-beta`? | User | PR-D §8 implementation |
| **DP6** | Dev route gating scope: block **all** `app/dev/*` outside sandbox (recommended; currently both routes), or per-route allowlist? | User | PR-D §6 implementation |

## 13. Recommendation

1. **Land this docs plan PR** (PR-B of the disposition queue).
2. **Then one small implementation PR** (PR-D, Option A bundle): dev route gating + fail-closed
   stage fallback (helper, two layers) + dev-apk `supabaseReady` banner, plus the DP1-chosen env
   change. Operator performs the G3 Dashboard toggle on their own clock; it blocks external
   tester builds, not this PR.
3. **Then return to engine build-out:** PR-G `fill_with_traps`, PR-H `notice`, then the matrix's
   pedagogical-tags PR — with the tester-build surface now failing closed instead of open.

---

*End of plan. Implementation requires separate approval per PR; nothing in this document changes
runtime behavior.*
