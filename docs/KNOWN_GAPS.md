# KNOWN GAPS — Cairn open-gap inventory (2026-07)

> Source: `docs/CAIRN_ROADMAP_202607.md` ("Açık envanteri") + repo analysis at Round 1
> runtime freeze (2026-06-17, 262 green tests). Each gap has a decision question and a
> suggested default. **A suggested default is not a locked decision** — locks happen at
> the Faz 5 decision gate (operator) or in an explicit spec update.
>
> Agent rule: do not "fix" a gap opportunistically inside an unrelated PR. Each gap is
> resolved by the phase named in its row, or by an operator decision.

## Spec conceptual gaps (1–7)

### 1. No audio/listening layer
- **Gap:** Spec doctrine (elision, liaison) is sound-based, but all 10 exercise
  contracts are text-based. No dedicated listening contract, no pronunciation.
- **Decision question:** Recorded native audio or continue with expo-speech TTS? Which
  phase gets a listening-comprehension contract? What is the audio asset pipeline
  (recording, storage, bundle size)?
- **Suggested default:** Continue expo-speech TTS; no listening contract until the
  Faz 5.1 decision. Do not add audio assets speculatively.
- **Resolves in:** Faz 5.1 (operator decision).

### 2. Lexique Memory matrix has names but no formulas
- **Gap:** 25+ fields (strengthScore, decayScore, transferCount, contextFitScore…) are
  named but uncomputed. Two agents can both be "spec-compliant" and still build two
  different mastery systems. Biggest drift magnet in the spec.
- **Decision question:** What are the decay curve, state-machine transition thresholds
  (ghost → recognition → active → supported → recycled → dormant), and the transfer
  counter's effect on mastery — as numbers?
- **Suggested default:** Exponential decay with a half-life parameter; numeric
  thresholds written into the spec **before** implementation; pure functions +
  property-based tests ("decay never increases strength", "a single recognition event
  cannot grant production mastery", "Micro-Logic alone cannot raise production
  mastery").
- **Resolves in:** Faz 4 (Claude implements, operator reviews parameters).

### 3. Content factory undefined
- **Gap:** The 180-lesson syllabus is a topic map; ~174 lessons remain. The engine will
  finish long before the content. No authoring process is defined. This is the real
  bottleneck.
- **Decision question:** What is the batch unit, review loop, and validator gate for
  lesson authoring?
- **Suggested default:** Unit-based batches (~12 lessons); agent drafts are
  validator-first (must pass `validate:content` + `validate:pools` before review);
  operator does pedagogical review; merge → CI → next batch.
- **Resolves in:** Faz 6 (must not start before Faz 2 guardrails).

### 4. Monetization + auth/sync decisions are silent
- **Gap:** The Cairn spec has no money model; legacy canon has a locked L14 paywall at
  $12.99/mo and the paywall code is still in the repo — an agent could revive it by
  accident.
- **Decision question:** Does Cairn have a paywall — yes, no, or deferred?
- **Suggested default:** No paywall in Cairn until the Faz 5.3 decision is written into
  the spec; legacy paywall code stays quarantined (do not extend, do not delete without
  a decision).
- **Resolves in:** Faz 5.3 (operator decision).

### 5. No v1 pedagogy lint
- **Gap:** Root cause of the §29 regression — validators check learning-engine fixtures
  but not lesson-v1 content rules. The recap rule ("no full sentences in `piecesUsed`")
  exists only as prose.
- **Decision question:** None — direction is set; needs implementation.
- **Suggested default:** Add to `validate:content`: piecesUsed entries must not be
  sentences (heuristic: capitalized multi-chip entries containing subject+verb, minus a
  protected-chunk allowlist). Also widen the known-narrow TTS placeholder regex. Tests
  + CI.
- **Resolves in:** Faz 2. (Content precondition landed: L4/L6 atomized in `4aa4072`.)

### 6. Error Engine's AI boundary is unpinned
- **Status: RESOLVED 2026-07-02 (Faz 3, Error Engine v0).**
  `content/learning-engine/error-engine.ts` implements spec §13: the 7 feedback
  verdicts as a TS union, the 11-entry taxonomy as data + narrow deterministic
  detectors, and the migration mapping `ErrorTagCode → FeedbackVerdict` (one
  learner-facing feedback language; grading/event vocabulary unchanged). Every
  error id carries `deterministic | ai_assisted`; 9 are deterministic, 2
  (`overliteral_translation`, `register_mismatch`) are AI-assisted and never
  fire in v0. Fallback ladder: `availableErrorIds(aiAvailable)` — AI absent or
  rate-limited drops to the deterministic subset. Faz 5.2 does not block this.
- **Still open:** wiring `resolveFeedback` into the live renderer (UI PR with
  smoke), and the AI-assisted lane itself (blocked on Faz 5.2).

### 7. Hygiene debt
- **Status: mostly RESOLVED 2026-07-02.** Spec v1.0 imported to
  `docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md`; precedence chain updated
  (`CLAUDE.md → STATUS.md → DEV_APK_MVP_CANON.md → Cairn v1.0`); v0.1 Cairn docs
  marked SUPERSEDED. Superseded v0.3 material was NOT physically deleted — the spec
  was imported verbatim with a reading-guide banner instead (§48–64 win over §31–47;
  §47 superseded by §64), so the repo copy stays byte-comparable to the operator's
  master. If the operator prefers physical deletion, that is a follow-up docs-only PR.
- **Still open:** event compaction/snapshot policy for event-sourced mastery (what
  happens at ~10k events) — write before Faz 6 begins.
- **Resolves in:** compaction policy in Faz 6 support work.

## Repo operational gaps (8–14)

### 8. AI infrastructure is effectively dead
- **Gap:** Edge functions (`ai-chat`, `ai-evaluate`, `ai-error`) require
  `supabase.auth.getUser()`, but the product direction is no-auth/local-only
  (`noSupabaseAuthGuard.test.ts` protects this). So the AI stack cannot be called.
  Routing has also drifted: `providers.ts` reality is Gemini 2.5 Flash → Gemini 2.5
  Pro → Groq Llama 3.3 → Mistral; the planned Flash-Lite/Flash/Haiku chain has no
  Claude at all.
- **Decision question:** How are edge functions called in a no-auth world (anon device
  token + quota?), does routing get updated, what is the rate-limit policy?
- **Suggested default:** Keep the no-auth guard; do not call edge functions; no routing
  change until Faz 5.2.
- **Resolves in:** Faz 5.2 (operator decision).

### 9. Zero rate limiting / cost control
- **Gap:** No per-user quota, daily token ceiling, or request-frequency limit. The day
  auth turns on, cost risk is immediate.
- **Suggested default:** AI must not be enabled for users until server-side quotas
  exist. Hard precondition for any Faz 5.2 outcome that activates AI.
- **Resolves in:** Faz 5.2 decision → implementation before AI activation.

### 10. No release engineering
- **Gap:** `eas.json` has only a `preview` profile — no production profile, no iOS, no
  OTA (`expo-updates` not in package.json), no versioning strategy, no store prep.
- **Suggested default:** Do nothing until Faz 7; release engineering before external
  users is dead investment.
- **Resolves in:** Faz 7 (EAS/store steps are Operator-only).

### 11. Zero crash visibility
- **Gap:** Only expo-router's default ErrorBoundary. A crash on a tester's phone is
  invisible.
- **Suggested default:** Crash reporting (Sentry or similar) lands in Faz 7, before the
  tester wave — not before.
- **Resolves in:** Faz 7.

### 12. Legacy system live in active routes
- **Gap:** `app/(tabs)/practice.tsx` and `chat.tsx` still import legacy hooks
  (`useSRS`/`useChat`); hidden in dev-apk but the code is live — an agent trap.
- **Status:** **Quarantined 2026-07-02** — `LEGACY — DO NOT BUILD ON THIS` banners added
  to `data/lessons/*`, `data/flashcards.ts`, `data/milestones.ts`, and both routes.
  Physical removal/deletion is a separate explicit decision, not incidental cleanup.
- **Resolves in:** Faz 0 (banners done); deletion decision later.

### 13. Remote schema frozen in the legacy era
- **Gap:** Supabase schema has only `profiles`, `user_progress`, `user_errors`. The
  event-sourced learning-engine has no remote counterpart. Consistent with local-only,
  but "lose the phone, lose the progress" is not a written decision.
- **Decision question:** How long does local-only last? When is the repository
  abstraction's remote contract designed? Is manual export/backup enough as an interim?
- **Suggested default:** Local-only continues; manual export/backup as interim; no
  remote schema work until Faz 5.4.
- **Resolves in:** Faz 5.4 (operator decision).

### 14. Telemetry spec'd but not implemented
- **Gap:** Schema exists in the spec, no code. Writing 180 lessons without seeing where
  learners drop is blind flight.
- **Suggested default:** Telemetry v0 = local event log only (no remote), built as Faz 6
  support work before the content marathon scales.
- **Resolves in:** Faz 6 support work.

## Healthy — do not touch

`productStage.ts` fail-closed design; the 4-command CI chain
(`typecheck` → `validate:content` → `validate:pools` → `test:learning-engine`); RLS
policies; the `supabaseReady` guard; Mon Lexique's "never show raw scores" rule as
implemented; the repository abstraction's remote-ready interface.
