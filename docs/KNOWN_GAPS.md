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
- **Status: DECISION RECORDED (Faz 5, 2026-07-02 — spec §66.1); implementation
  still deferred.** MVP keeps expo-speech/TTS as the functional placeholder;
  recorded native audio waits for Faz 6 content stabilization; listening
  comprehension is a documented future contract; pronunciation/speech input
  deferred; Faz 6 authoring is NOT blocked on audio.
- **Still open (implementation):** recorded-audio pipeline, listening exercise
  contract implementation, pronunciation input — all future, separately scoped.

### 2. Lexique Memory matrix has names but no formulas
- **Status: numeric contract DEFINED (Faz 4A) and pure implementation ADDED
  (Faz 4B, 2026-07-02):** `content/learning-engine/lexique-memory.ts` +
  `scripts/tests/lexiqueMemory.test.ts` implement spec §65 as a pure derived
  layer (`deriveLexiqueMemory(itemMastery, now)`), including the
  consolidation guard. Precision note: strength(P=3) ≈ 0.6988, marginally
  below `STRONG_THRESHOLD` 0.70 — Known needs P=3+R=1 or P=4 (pinned by
  test; tune the threshold if 3 spaced productions should suffice). With
  default constants `dormant` is unreachable (refreshDue supersedes it).
  Spec §65 records the operator-approved Option A decision
  (derived layer over the frozen `mastery-v0.2` reducer — no reducer change, no
  migration, no new events in v0.1), the 18-field contract, the v0.1 constants
  (exponential-saturation strength, weakness floor, two-bucket decay 5d/14d,
  refresh threshold 0.50, carryover caps 3/2/2/1 + target share ≥ 0.50), the
  intrinsic 8-state lifecycle (`recycled` = query-time carryover role, not a
  stored state), the Mon Lexique 6-band projection, the event-to-memory table,
  and the Faz 4B test plan.
- **Faz 4C landed (2026-07-02):** `content/learning-engine/carryover-selector.ts`
  + `carryoverSelector.test.ts` — pure selector over derived states per spec
  §65.6 (exclusion gates, priority, budget caps, target-share protection).
  v0 decisions: lesson `contextTags` are explicit caller input (no lesson/
  registry parsing); empty lesson tags and zero targets fail closed;
  sentence-level caps applied at unit level until the Sentence Builder
  exists; `clutterPenalty` = 0 (caps are the clutter control).
- **Still open (not solved by contract or implementation):**
  - Wiring the selector to lesson authoring/runtime (needs contextTags
    sourcing decision + smoke) and the Mon Lexique 6-band UI adoption
    (renderer-adjacent, needs smoke).
  - Most constants are provisional/tunable; `refreshDueScore` is the most
    provisional formula (expect tuning once telemetry exists).
  - Telemetry/event gaps remain open (gaps #8/#14): exposure/seen/repair/
    transfer events do not exist, so `ghost` is unreachable and
    transfer/recombination/repair counters stay 0 in v0.1.
  - Taxonomy-weighted weakness waits on Error Engine tags entering the event
    log.
- **Resolves in:** Faz 4C (carryover selector) + parameter tuning after telemetry.

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
- **Status: DECISIONS RECORDED (Faz 5, 2026-07-02 — spec §66.3 monetization,
  §66.4 sync); implementation deferred.** Monetization deferred for MVP
  learning validation; no Round 1 / early-beta paywall; legacy L14/$12.99
  decision SUPERSEDED-for-Cairn; paywall code stays quarantined; sync stays
  local-first with no mandatory login; phone-loss risk accepted for MVP.
- **Still open (implementation/decision):** post-validation monetization
  session (position/price/trial), manual export/backup (interim, when testers
  have real progress), the future event/snapshot sync contract.

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
- **Status: DECISION RECORDED (Faz 5, 2026-07-02 — spec §66.2); AI remains
  DORMANT until the activation package.** AI is not required for core MVP;
  deterministic engine stays the source of truth; the edge-function auth
  guard stays as the safety interlock; no unauthenticated endpoint; no AI in
  learner-critical grading. Activation requires the full §66.2 package
  (auth-light identity, quota, token ceiling, rate limit, routing decision,
  fallback verification, privacy/consent surface).
- **Still open (implementation):** the entire activation package; provider
  routing refresh (current chain has no Claude); wiring the 2 dormant
  ai_assisted Error Engine ids.

### 9. Zero rate limiting / cost control
- **Status: STILL OPEN — now a locked precondition.** Spec §66.2 makes
  server-side quota, daily token ceiling, and request rate limit items 2–4 of
  the mandatory AI activation package. Nothing is implemented; AI must not be
  enabled for users until they exist.
- **Resolves in:** the future AI activation PR-set (after §66.2 package).

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
- **Status: DECISION RECORDED (Faz 5, 2026-07-02 — spec §66.4); implementation
  deferred.** The legacy schema (`profiles`/`user_progress`/`user_errors`) is
  now EXPLICITLY declared incompatible with event-sourced Lexique Memory and
  must never be a sync target; local-first continues with no mandatory login;
  phone-loss risk is a written, accepted MVP decision; manual export/backup is
  the sanctioned interim candidate.
- **Still open (implementation):** the purpose-built event/snapshot sync
  contract (the `LearningEventSync` pending→drain seam), manual export UI,
  legacy-schema migration task (pre-public-beta).

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
