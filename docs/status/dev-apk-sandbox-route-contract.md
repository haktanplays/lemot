# Dev APK vs Sandbox Route Contract

**Date:** 2026-06-09
**Current `main` HEAD:** `6e18dba` (or newer)
**Status:** Docs-only note. No runtime change. Clarifies which lesson surface opens in
each product stage so the legacy/v1 first lesson is not mistaken for a routing bug.

This note follows a read-only routing audit and sits alongside
[`dev-apk-v1-freeze-checkpoint.md`](./dev-apk-v1-freeze-checkpoint.md),
[`v1-to-learning-engine-migration-notes.md`](./v1-to-learning-engine-migration-notes.md), and
[`learning-engine-progress-bridge-decision.md`](./learning-engine-progress-bridge-decision.md).

---

## 1. Decision

- **Current behavior is expected, not a bug.** Opening the legacy/v1 lesson from the built
  app or a simulator is the intended route contract under the current freeze.
- **The Dev APK first lesson stays on v1.** The Home first-lesson card routes into the v1
  renderer, which is the temporary Dev APK smoke surface.
- **learning-engine L2 stays sandbox-only.** `/learn/l2` is gated to the sandbox stage and is
  reachable only by deep link or the hidden dev player.
- **This note does not authorize a cutover.** It documents the existing contract. Moving the
  Dev APK first lesson onto the learning-engine path is a separate, flagged, reversible step
  that is not taken here.

## 2. Current route contract

Stage is resolved in `config/productStage.ts` from `process.env.EXPO_PUBLIC_PRODUCT_STAGE`,
defaulting to `sandbox` when unset. `EXPO_PUBLIC_*` is baked into the JS bundle at build/bundle
time, not read live at runtime. The Android preview profile sets the value in `eas.json`
(`preview.env.EXPO_PUBLIC_PRODUCT_STAGE = "dev-apk"`). There is no iOS build profile, so an iOS
run is Expo Go or a local/dev bundle and resolves to `sandbox`.

| Stage / runtime | First-run chain | Home first-lesson card route | Legacy v7 list route (if visible) | learning-engine `/learn/l2` access |
|---|---|---|---|---|
| **sandbox** (local `expo start`, Expo Go, iOS simulator) | Lesson Zero, then How Weave Works, then Home | `/v1-lesson/v1-lesson-001` (v1 renderer) | full `LESSONS` list visible, each card to `/lesson/{id}` (legacy v7) | gated `sandbox && v1LessonEngine`; not linked from Home; deep link or dev player only |
| **dev-apk** (Android preview APK) | Lesson Zero, then How Weave Works, then Home | `/v1-lesson/v1-lesson-001` (v1 renderer) | legacy list hidden (`visibleLessons = []`) | gate is false outside sandbox; deep link shows the unavailable fallback |
| **public-beta** (defined, no build profile yet) | same first-run chain | v1 smoke entry hidden; legacy list visible to `/lesson/{id}` | full `LESSONS` list visible | not available (non-sandbox) |

Notes:

- Three lesson systems exist in the route tree: `/lesson/[id]` (original v7, legacy
  `lm7`-backed), `/v1-lesson/[id]` (v1 founder renderer, the Dev APK smoke surface), and
  `/learn/[fixtureId]` (learning-engine, sandbox-gated). Home links only the first two.
- In sandbox, two legacy surfaces are visible at once: the full v7 `LESSONS` list and the v1
  "Lesson 1" smoke card. `/learn/l2` is not among them.

## 3. Why the app opens legacy/v1

The Home screen (`app/(tabs)/index.tsx`) is the only place a lesson is started, and it has no
learning-engine route:

- The "Lesson 1 / Je suis / Begin the first lesson" card calls
  `router.push("/v1-lesson/v1-lesson-001")`, which renders the v1 lesson via
  `LessonRendererV1`. It is shown in sandbox and dev-apk.
- The legacy curriculum cards call `router.push("/lesson/{id}")`, the original v7 renderer.
  This list is visible in sandbox and public-beta and hidden in dev-apk.
- `/learn/l2` is never pushed from Home, first-run, Lesson Zero, or How Weave Works.
- `app/learn/[fixtureId].tsx` is gated on `PRODUCT_STAGE === "sandbox" && FEATURES.v1LessonEngine`,
  so even a deep link outside sandbox renders the safe unavailable fallback.

So the lesson opening on v1 (or the legacy v7 list) is the route contract working as designed,
matching the freeze checkpoint.

## 4. What is expected today

- **Testing the Dev APK first-user path:** v1 is expected. The Home first-lesson card opens the
  v1 renderer. This is the sanctioned smoke surface.
- **Testing learning-engine L2:** use the sandbox stage and open `/learn/l2` directly by deep
  link, or use the dev player. Do not expect Home to route there.
- **Testing on an iOS simulator through Expo Go:** this is not an Android APK. It is a local
  bundle / Expo Go run and resolves to the sandbox stage, so it follows the sandbox row above
  (Home first-lesson card to v1; `/learn/l2` reachable only by deep link).

## 5. What a cutover would require (not implemented here)

To make the Dev APK first lesson open learning-engine L2 instead of v1, a future, explicitly
scoped change would need:

- An explicit, default-off, reversible feature flag.
- A change to the `app/learn` gate so the route renders outside sandbox under that flag.
- A Home route change so the first-lesson card points at `/learn/l2` under that flag.
- A Home projection bridge that reads `lm_le_events` through `selectLessonProgress` so Home
  reflects engine completion instead of legacy `lm7`.
- A Progress and Daily Review plan, since both still read legacy `lm7` and would otherwise drift
  from engine state.
- A sandbox smoke of the flagged path.
- A dev-apk build smoke of the flagged path.
- A physical APK smoke as an Operator gate.

Until those land, the two stores stay disjoint (engine writes `lm_le_events`; Home, Progress,
and Daily Review read `lm7`), which is why the bridge is deferred.

## 6. Non-goals

This note does not authorize and the route contract does not include:

- No cutover.
- No Home bridge.
- No `lm7` write from learning-engine.
- No v1 extension.
- No route changes.
- No config changes.
- No APK smoke.

## 7. Next recommended action

- Leave the Dev APK on v1 for now.
- Keep learning-engine L2 sandbox-only.
- Plan a later, flagged, reversible Home bridge when the engine path is ready, per
  [`learning-engine-progress-bridge-decision.md`](./learning-engine-progress-bridge-decision.md).
