# Sprint 12 SW12 — Chat Route Gating

## Workstream name
Sprint 12 SW12 — Make AI Chat unreachable from dev-apk UI and add route-level defense-in-depth.

## Branch
`claude/sprint12-sw12-chat-route-gating` (branched from `origin/main` at `68cb7f3`).

## Tier
LM-2 / LM-3 — small frontend canon fix. Three files + spec.

## Problem statement
A focused Dev APK Chat Reachability Check confirmed that despite `FEATURES.aiChat = false` in `dev-apk` (per `productStage.ts:70`) and the bottom-tab being hidden via `href: FEATURES.aiChat ? undefined : null` in `(tabs)/_layout.tsx:47`, AI Chat remains user-reachable inside the tester APK through two visible CTAs:

- `lemot-app/app/(tabs)/practice.tsx:274-300` — "Chat with AI" card on the Practice tab, `onPress` calls `router.push("/(tabs)/chat")`.
- `lemot-app/app/lesson/[id].tsx:898-910` — "Chat in French" CTA on the lesson completion screen, `onPress` calls `router.replace("/(tabs)/chat")`.

Even if those two CTAs were hidden, the chat route itself (`lemot-app/app/(tabs)/chat.tsx`) has no runtime gate. A deep link, a saved navigation state, or any future surface that pushes to `/(tabs)/chat` would still render the standalone AI Chat UI.

This violates `docs/DEV_APK_MVP_CANON.md` §2 ("No standalone AI Chat surface in dev-apk") and `docs/MASTER_PIPELINE_v1.2.1.md` §9 Rule 7 (Dev APK scope is sacred).

## Confirmed reachability issue
| Surface | File:line | Pre-PR behavior |
|---|---|---|
| Practice tab CTA "Chat with AI" | `(tabs)/practice.tsx:274-300` | Always visible regardless of `FEATURES.aiChat`. Visible in dev-apk. Tap navigates to `/(tabs)/chat`. |
| Lesson completion CTA "Chat in French" | `lesson/[id].tsx:898-910` | Always visible regardless of `FEATURES.aiChat`. Visible in dev-apk on every lesson outro. Tap replaces stack to `/(tabs)/chat`. |
| Chat tab in bottom bar | `(tabs)/_layout.tsx:47` | Hidden in dev-apk via `href:null`. ✅ correct since PR #5 era. |
| Chat route runtime gate | `(tabs)/chat.tsx:62` | None. Direct route push renders full Chat UI regardless of stage. |

## Scope
Single product intention: ensure no visible UI in dev-apk leads to `/(tabs)/chat`, AND add a runtime defense at the route entry so even programmatic navigation can't expose the Chat UI when the flag says off.

## Allowed files
- `lemot-app/app/(tabs)/practice.tsx` — wrap "Chat with AI" Pressable in `{FEATURES.aiChat && (...)}`.
- `lemot-app/app/lesson/[id].tsx` — wrap "Chat in French" Pressable in `{FEATURES.aiChat && (...)}`.
- `lemot-app/app/(tabs)/chat.tsx` — add runtime gate via `<Redirect href={"/" as never} />` when `FEATURES.aiChat` is false.
- `docs/workstreams/Sprint12_SW12_chat_route_gating.md` — this spec.

## Forbidden scope
- `lemot-app/config/productStage.ts` — read/import only; do NOT flip `aiChat` in any stage.
- `lemot-app/supabase/**` — untouched.
- `lemot-app/hooks/**`, `lemot-app/providers/**`, `lemot-app/lib/**` — untouched.
- `lemot-app/supabase/schema.sql` — untouched.
- `package.json`, `package-lock.json` — untouched.
- EAS files (`eas.json`, `app.json`), secrets — untouched.
- Lesson content, pools, item registry — untouched.
- `productStage` flag values — read-only.
- Mon Lexique, Paywall, RevenueCat, Word Graph, V4-B redesign, AI behavior internals (Edge Functions, prompts, `useChat`), lesson engine internals (`lessonTypes`, `mk()`, `LessonRunner`, `SECS`) — untouched.
- `docs/CLOUD_SYNC_QUEUE.md` — intentionally not edited; follow-up backfill round will add the SW12 row.

## Acceptance criteria
1. `lemot-app/app/(tabs)/practice.tsx` imports `FEATURES` from `@/config/productStage` and wraps the entire "AI Chat redirect" Pressable block (the one with `onPress={() => router.push("/(tabs)/chat")}`) in `{FEATURES.aiChat && (...)}`.
2. `lemot-app/app/lesson/[id].tsx` imports `FEATURES` from `@/config/productStage` and wraps the entire "Chat in French" Pressable block (the one with `onPress={() => router.replace("/(tabs)/chat")}`) in `{FEATURES.aiChat && (...)}`.
3. `lemot-app/app/(tabs)/chat.tsx` imports both `Redirect` from `expo-router` and `FEATURES` from `@/config/productStage`. After the existing hook calls and before the `if (!loaded)` guard, an explicit `if (!FEATURES.aiChat) return <Redirect href={"/" as never} />;` gate is added.
4. No change to chat behavior when `FEATURES.aiChat === true`. Sandbox and public-beta stages render Chat exactly as today.
5. No change to `useChat`, Supabase Edge Functions, AI prompts, or any backend code.
6. No flag flip in `productStage.ts`. `aiChat: false` in `dev-apk` (line 70), `aiChat: true` in `sandbox` (line 59) and `public-beta` (line 83) all preserved.
7. `npm run typecheck` exits 0.
8. `npm run validate:pools` exits 0 with the same 6 pre-existing legacy warnings.
9. `git diff --check` clean.
10. Static grep `rg -n "router\.push\(\"/\(tabs\)/chat\"|router\.replace\(\"/\(tabs\)/chat\"|FEATURES\.aiChat|Chat with AI|Chat in French" lemot-app/app -S` returns the expected new gate references and existing route push calls (which are now wrapped in conditional rendering).

## Verification
```bash
cd lemot-app
npm run typecheck
npm run validate:pools
```

Plus `git diff --check` and the static grep above.

## Manual smoke checklist (Operator-only)

### Dev-apk stage (`EXPO_PUBLIC_PRODUCT_STAGE=dev-apk`)
- ✅ Practice tab opens. **"Chat with AI" card does NOT appear** between the Lesson Practice card and any Review Errors card. Confirm by scrolling the Practice tab; the row should be absent.
- ✅ Complete a lesson section that reaches the lesson outro screen. **"Chat in French" CTA does NOT appear** between "Practice This Lesson" and "Back to Journey" buttons.
- ✅ Manually deep-link or navigate to `/(tabs)/chat` (e.g., via Expo dev URL or restored navigation state). **Should redirect immediately to Home** (the Journey tab). Should NOT render the Chat UI.
- ✅ Bottom tab bar still hides the Chat tab (existing PR #5-era behavior unchanged).

### Sandbox stage (`EXPO_PUBLIC_PRODUCT_STAGE` unset or `sandbox`)
- ✅ Practice tab shows "Chat with AI" card normally.
- ✅ Lesson completion screen shows "Chat in French" CTA normally.
- ✅ Tapping either CTA navigates to `/(tabs)/chat` and renders full Chat UI.
- ✅ Bottom tab bar shows the Chat tab.
- ✅ Direct navigation to `/(tabs)/chat` renders Chat UI normally.

### Public-beta stage (`EXPO_PUBLIC_PRODUCT_STAGE=public-beta`)
- ✅ Same as sandbox — `aiChat: true` in `public-beta`, so all surfaces remain visible and reachable.

## Risks
1. **The Redirect from expo-router** runs at render time and may cause a brief flash before navigation. Acceptable for a defense-in-depth surface that should never be reached intentionally in dev-apk. If a flash is observed in operator smoke, a future polish could swap in a small "not available in this build" fallback view, but Redirect is the safest pure-redirect for SW12.
2. **`Redirect` requires the Rules of Hooks to be respected** — placed after all the hook calls in `ChatScreen`. Verified placement is between line 86 (end of `useEffect` block) and line 87 (existing `if (!loaded)` early return). Order of hooks unchanged across renders because `FEATURES.aiChat` is a module-level constant.
3. **The `as never` cast on the redirect target** mirrors the existing pattern at `(tabs)/index.tsx:75` (`router.replace("/lesson-zero" as never)`) and the WS9 v1 Lab tile. Temporary bridge until typed-route regeneration; same convention as recent SW10/WS9 work.
4. **No new dependency** added. `Redirect` comes from the existing `expo-router` import surface. `FEATURES` comes from the existing `@/config/productStage` module.
5. **No behavior change in sandbox or public-beta stages.** The conditional rendering and the redirect only short-circuit when `FEATURES.aiChat === false`.
6. **`useChat` hook is still called** in `ChatScreen` even when the gate fires (Rules of Hooks). The hook itself only does state setup; it does not auto-call any Edge Function. Calling `useChat()` once during the gate-redirect render is a no-op from the backend perspective.
7. **`docs/CLOUD_SYNC_QUEUE.md` will need a follow-up row** after SW12 merges. Out of scope for this PR per task rules.
8. **Future workstreams that add new chat-reachable surfaces** (e.g., a new tile or notification deep-link) must apply the same `FEATURES.aiChat` gate at every entry point. SW12 covers the two current visible CTAs + the route entry; the lint discipline going forward is "every navigation to `/(tabs)/chat` must be wrapped in `FEATURES.aiChat`".

## Review status
- Spec: this file, applied to working tree, pending operator approval.
- Code edits: applied to `practice.tsx`, `lesson/[id].tsx`, `chat.tsx`, pending verification + operator approval.
- Verification: `npm run typecheck`, `npm run validate:pools`, `git diff --check`, static grep to be run before reporting.
- PR: not yet opened.
- Commit: pending operator approval phrase.
