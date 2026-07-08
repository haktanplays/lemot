# Le Mot / Cairn — Final 2-Round Loop Audit (2026-07-08)

> Status: audit complete (saturated). This document is the durable record of the
> 2-round loop audit. **Only PR-A (B2 + B3, data-loss hardening) is implemented in
> the accompanying change** — every other finding below remains open and is
> sequenced under "Recommended PR order".

## Scope & method

A 20-lens security + correctness + reliability review applied across the whole
`lemot-app` surface (286 files), run as **two rounds of parallel deep-audit
agents** (9 agent-audits total) plus a manual backend/security pass, with ~20 of
the highest-value findings hand-verified against the source. Findings were passed
through a false-positive filter (Pass 20) and reconciled against
`docs/KNOWN_GAPS.md`.

Verdicts:
- **CONFIRMED** — the exact failure was traced in the code.
- **PLAUSIBLE** — mechanism is clear; the trigger depends on data/config not fully visible.
- **NEEDS-CONTEXT** — depends on deployed DB / framework internals not in the repo.

Convergence signal: round 2's net-new findings concentrated in the two niches
round 1 under-covered (validator coverage; the learning-engine renderer cards),
while broad surfaces (security, injection, config/deep-link, content data, most
reducers/selectors, all screens, all components) returned CLEAN with explicit
exhaustion signals. The audit is treated as saturated.

Framing note: `dev-apk` (the shipping tester stage) has `aiEnabled:false`; several
AI findings are therefore **latent** — they bite when `aiEnabled` flips true, which
`config/productStage.ts` already gates behind "server-side hardening, rate limits".

## Severity roll-up (issue IDs B1–B24)

| ID | Finding | Sev | Verdict | Location |
|----|---------|-----|---------|----------|
| **B1** | BuildSentence double-counts the last correct item → reports `N+1/N`, corrupts `perfect` flag + mastery ratio | HIGH | CONFIRMED | `components/sections/BuildSentence.tsx:79,93` |
| **B2** | Corrupt/partial JSON in live `lm7`/`lm7_srs` → silent full reset, then next save clobbers the recoverable blob | HIGH | CONFIRMED | `hooks/useStorage.ts`, `hooks/useSRS.ts` |
| **B3** | v1 event log: corrupt/non-array blob reads as `[]`, next `appendEvent` writes `[event]` and destroys the raw value | HIGH | CONFIRMED (kv atomicity: NEEDS-CONTEXT) | `content/learning-engine/repository/local.ts` |
| **B4** | No server-side rate-limit/quota on AI Edge Functions + client controls `system`/`maxTokens` → cost-DoS / open LLM relay | HIGH (latent) | CONFIRMED | `supabase/functions/ai-chat/index.ts:42`, `_shared/providers.ts` |
| **B22** | Shipped v1 content has ≈zero executable validation; canonRules V3/V4/V5 are dead code vs the current registry | HIGH/MED | CONFIRMED (partly KNOWN #5) | `scripts/canonRules.ts:66`, `validateContent.ts`, `validatePools.ts` |
| **B21** | context_chain step is un-advanceable on an accent/punctuation slip (Next button gated on `positive`) | MED-HIGH | CONFIRMED | `components/learning-engine/ContextChainCard.tsx:55-73,121` |
| **B5** | `hasPulled` ref never reset on user change → 2nd account never pulls; prior user's progress pushed to new `user_id` | MED | CONFIRMED (latent) | `providers/AppProvider.tsx:97,110` |
| **B6** | Shared-blob multi-writer race: `mk`/`logErr`/dailyReview each pass a stale snapshot of the other slice to `save` | MED | CONFIRMED | `useLessonProgress.ts:29`, `useErrors.ts:41`, `app/(tabs)/index.tsx:115` |
| **B7** | `spelling_near_miss` classifier buckets meaning-distinct FR minimal pairs (un/on, le/la, et/est) as mastery-neutral | MED | CONFIRMED | `content/learning-engine/grade.ts:216` + `mastery.ts:139` |
| **B8** | `deriveFill` places the blank via word-boundary-free `indexOf` → in-word blanking (e.g. "on" → "B[___]jour") | MED | CONFIRMED-mechanism (data-dependent) | `content/learning-engine/derive-drill.ts:113` |
| **B9** | Reset does not clear `lm_le_telemetry`; export omits it → "delete my data" orphans a behavior trail (KVKK/GDPR) | MED | CONFIRMED | `content/learning-engine/privacy-data.ts:50-95`, `telemetry.ts:26` |
| **B10** | Unbounded growth + O(n²)/O(n³): every answer re-reads all events and `scoreEvents(all)`; `err[]` never pruned | MED | CONFIRMED (partly KNOWN #7/#8) | `session-controller.ts:252`, `useErrors.ts:41` |
| **B11** | Review weave item with N blanks adds N to score but 1 to the denominator → >100% | MED | CONFIRMED | `components/sections/Review.tsx:37,62-76` |
| **B12** | `dueAt` is pushed forward on skip/near-miss → a skipped SRS card disappears for a full box interval | MED | CONFIRMED (near-miss documented; skip questionable) | `content/learning-engine/mastery.ts:256` |
| **B13** | `/lesson/[id]` has no screen-level stage guard → legacy flow reachable by deep link in dev-apk | MED | CONFIRMED | `app/lesson/[id].tsx` |
| **B14** | Anonymous auto-session makes `/auth` + Sign-In unreachable; no anon→real upgrade path | MED | PLAUSIBLE (latent) | `hooks/useAuth.ts:16`, `app/auth.tsx:22` |
| **B15** | Upstream provider error returned to client; no provider-fetch timeout; client 15s timeout is dead (signal unwired) | MED | CONFIRMED | `ai-chat/index.ts:63`, `_shared/providers.ts:31`, `lib/ai.ts:22` |
| **B16** | `ai-diag` runs without auth and leaks token/email metadata | MED | CONFIRMED | `supabase/functions/ai-diag/index.ts` |
| **B17** | `errors` sync one-way (`pushError` insert-only, pull always `[]`) → weak-spots reset on new device; `user_errors` unbounded server-side | MED | CONFIRMED (KNOWN #4 "MVP accepted") | `hooks/useProgressSync.ts:56-79` |
| **B18** | `lm7`/`lm7_srs` are unversioned → no migration path for a future breaking change | MED | CONFIRMED | `hooks/useStorage.ts`, `hooks/useSRS.ts` |
| **B19** | Auth tokens stored at rest in plaintext (`expo-secure-store` declared but unused) | MED | CONFIRMED (corroborated 2×) | `lib/supabase.ts:12`, `app.json:35` |
| **B23** | context_chain records N events × the full `targetItemIds` set → over-weights mastery for chain items | MED | CONFIRMED | `ContextChainCard.tsx:59`, `session-controller.ts:209` |
| **B24** | Practice-Pool reuse re-records under the lesson's own `exerciseId` → practicing inflates parent lesson progress/mastery | LOW-MED | PLAUSIBLE | `components/learning-engine/LearnerRendererShell.tsx:341` |
| **B20** | Custom URL scheme `lemot://` is unverified/claimable — no exploitable sink found | LOW/info | CONFIRMED | `app.json:8` |

### LOW / NIT cluster
Mastery: duplicate `itemIds` double-count (PLAUSIBLE); permanent `isWeak`/Challenge with no recovery (documented monotone, routing consequence undocumented); `feedbackVerdictFromGrade` returns `undefined` on unknown tag (fail-open). Grader: `grade()` vs `checkAnswer()` disagree on accent+punctuation slips; **three** divergent normalizers (`lib/normalize.ts`, `content/learning-engine/answer-check.ts`, `components/lesson-v1/screens/normalizeAnswer.ts`). React: hooks after early return (×2), missing unmount-guard setState (MiniConversation/SayItYourWay/SayItYourWayV1/useChat), `setStage` during render (LessonPractice). UI/data: `GrammarRenderer.tsx:170` renders literal `≈`; `lesson/[id].tsx:876` `lessonId<16` hides Next for L16-24; `milestones.ts`/`MountainMap` milestone bracketing contradicts canon (legacy-quarantined); `exposureGlossary` includes taught words; Weave dead-ends if `modelAnswer` omitted; `graph.carryIn` mislabels dangling ids; FillWithTraps has two sources of truth. Validators: single-`_` placeholder slips `validatePools`; English-remnant detection is denylist-only. Backend: CORS `*`; esm.sh `supabase-js@2` major-only pin; unused `@react-native-async-storage/async-storage`; `analyzeErrors` + `ai-error` are dead code (KNOWN #8); inconsistent cross-function API shape.

## Clean / strong areas

- RLS correct on all 3 tables (`auth.uid()`); no `service_role` anywhere; no hardcoded secrets; no eval/exec/HTML-injection sinks; `.env`/`.env.edge` gitignored.
- Injection / deep-link / config surface clean: zero `Linking.openURL`/`WebBrowser`/`Share`/WebView; both `new RegExp` uses are escaped (no ReDoS); no PII in logs; no dangerous Android permissions/secrets in `app.json`/`eas.json`.
- `config/productStage.ts` fail-closed design (unconfigured build → most-restricted `dev-apk`; `aiEnabled` off outside sandbox).
- v1 content **data** is high quality (16 lessons + 54-item registry read: French accuracy, no unseen-forms, correct Weave targets, no banned language) — the risk is that this quality is unenforced (B22).
- Most reducers/selectors are pure and deterministic; the purity contract is largely honored. `session-controller` serialized tail chain is sound; telemetry allowlist correctly enforced (though unwired). CI (`learning-engine-ci.yml`) and `android-smoke.sh` are well-hardened. 31 test files.

## Known-gaps reconciliation (`docs/KNOWN_GAPS.md`)

- **Already known:** B4/AI rate-limit (#8), B10/compaction wiring (#7/#8), B17+B5/cross-device sync "accepted for MVP" (#4), B22 partially (#5 "no v1 pedagogy lint"), `analyzeErrors` dead code (#8), the `streak` migration debt.
- **Net-new (not in the known list):** B1, B2, B3, B21, B23, B24, B6, B7, B8, B9, B11, B16, B19, the three-normalizer inconsistency, the canonRules dead-code mechanism (the sharp part of B22), and the GrammarRenderer literal.

## Recommended PR order

1. **PR-A — data loss (most urgent):** B2 + B3. ← **implemented now (this change).**
2. **PR-B — live functional:** B1, B11, B21, B6, GrammarRenderer literal.
3. **PR-C — AI-beta server-side gate:** B4 (rate-limit + `maxTokens` clamp + server-owned `system`), B16 (remove `ai-diag`), B15.
4. **PR-D — privacy/security:** B9 (telemetry in reset/export), B19 (SecureStore adapter).
5. **PR-E — engine correctness:** B7, B8, B12, B23.
6. **PR-F — validator coverage:** B22 (wire v1 content into `validate:content`; fix the canonRules exposure-tier check).
7. **PR-G — sync:** B5, B17/B18.

## This change implements PR-A only

The accompanying commit hardens **B2** and **B3** only. It does **not** touch B1,
B4, B21, B22, AI behavior, validator scope, SecureStore, telemetry export, sync,
or any UI/lesson/content. No product behavior changes beyond non-destructive
handling of already-corrupt storage. Every other finding above stays open and is
sequenced under "Recommended PR order".
