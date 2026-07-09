# Le Mot / Cairn — Loop Audit v2 (2026-07-09)

> Durable record of the second full loop audit, run on `main @ 4b68f4c`
> (post PR-A…PR-E1, i.e. after #188–#193). Builds on
> `docs/audits/2026-07-08-final-loop-audit.md` (findings B1–B24). Previously
> known findings are reconciled below; net-new findings carry **C-series IDs**.

## Scope & method

One deep round of **8 parallel audit lenses** — security/privacy, concurrency &
leaks, engine correctness, dead code/drift, UI/screens, storage lifecycle,
config/supply-chain, tests/eng-quality — each instructed to skip B1–B24 and
concentrate on code merged since the last audit (#188–#193), which had never
itself been audited. 5 lenses completed; 4 died on a mid-run session cap but
their topic areas were substantially covered by the completed lenses (strong
finding convergence — e.g. the corrupt-quarantine PII leak surfaced
independently from the security, storage, and dead-code passes). The highest-
value net-new findings were then hand-verified against source (traced to
file:line). Convergence + independent re-derivation ⇒ round treated as saturated
for HIGH/MED severity; a fresh fan-out after the session cap resets can sweep the
LOW tail.

Verdicts: **CONFIRMED** (traced in code) · **PLAUSIBLE** (mechanism clear,
trigger data/config-dependent) · **LATENT** (real but gated off today, e.g.
behind `aiEnabled:false` or an unwired code path).

Validation state at audit time: `npm run typecheck` clean · `validate:content`
0/0/0 (canon V3/V4/V5 now live over 16 lessons) · `test:learning-engine` 709/709.

## B1–B24 reconciliation (main @ 4b68f4c)

| ID | Finding (short) | Status |
|----|-----------------|--------|
| B1 | BuildSentence double-count | **FIXED** #189 |
| B2 | lm7/lm7_srs corrupt → silent reset | **FIXED** #188 |
| B3 | event log corrupt → destroyed | **FIXED** #188 |
| B4 | AI edge: no rate limit / client-owned prompt | **FIXED** #191 |
| B5 | hasPulled never reset on user change | **OPEN** → C4 |
| B6 | shared-blob write race | **FIXED** #190 |
| B7 | near-miss mastery-positive | **FIXED** #193 |
| B8 | deriveFill in-word blanking | **OPEN** (PR-E2) |
| B9 | telemetry missing from reset/export | **FIXED** #192 — but corruption path reopens it, see C2 |
| B10 | unbounded growth, O(n²) scoring | **OPEN**; compaction rails exist but unwired (C12) |
| B11 | Review weave >100% score | **FIXED** #189 |
| B12 | skip/near-miss pushed past due | **FIXED** #193 |
| B13 | /lesson/[id] deep link unguarded in dev-apk | **OPEN** |
| B14 | anon session blocks /auth, no upgrade path | **OPEN** → C8 |
| B15 | provider error leak / dead timeout | **FIXED** #191 |
| B16 | ai-diag unauth leak | **FIXED** in repo; remote prune = operator step (unrecorded, C-CFG-5) |
| B17 | errors sync one-way, unbounded server-side | **OPEN** (PR-G) |
| B18 | lm7/lm7_srs unversioned | **OPEN** (PR-G) |
| B19 | plaintext auth tokens | **FIXED** #192 — device only; backup transport gap C14 |
| B20 | lemot:// scheme claimable | **OPEN** (info) |
| B21 | context_chain un-advanceable | **FIXED** #189 |
| B22 | shipped content ≈unvalidated; canonRules dead | **MOSTLY FIXED** (#187 wired canonRules); residual C22 |
| B23 | context_chain over-weights mastery | **OPEN** (PR-E2) |
| B24 | practice reuse inflates lesson mastery | **OPEN** (PR-E2) |

**13 of 24 fixed.** Still open: B5, B8, B10, B13, B14, B17, B18, B20, B23, B24
(+ B22 residual). B5/B14 fold into C-series below.

## Net-new findings (C-series)

Severity uses effective risk (a LATENT-but-critical regression guard can still be
HIGH). "Latent" = gated off in the shipping dev-apk today.

### HIGH

- **C1 — No cloud-data deletion path exists; local "reset" is false erasure for
  synced users.** `supabase/schema.sql` defines only `on delete cascade` FK
  clauses (fire only if the `auth.users` row itself is deleted) and **no
  row-level DELETE policy** on `profiles`/`user_progress`/`user_errors`/
  `ai_usage`; there is **zero `.delete()`** anywhere in the client. So nothing
  in-product can erase cloud rows — `user_errors.given_answer` (raw learner free
  text) and synced progress persist server-side forever unless an operator
  manually deletes the auth user in the dashboard. The only data-rights UI
  (`PrivacyDataControls`) is local-only and says "can't be undone", implying
  finality it doesn't deliver for anon-synced/signed-in users. KVKK/GDPR
  erasure + portability. CONFIRMED.
- **C2 — Corrupt-quarantine backups orphan raw learner PII on BOTH reset and
  export** (reintroduces B9 for the corruption path). On any parse/validate
  failure, the raw blob is copied verbatim to `${key}__corrupt` —
  `lm7__corrupt`, `lm7_srs__corrupt`, `lm_le_events__corrupt` — which contain
  given-answers / `userAnswer` free text. **No code anywhere deletes any
  `__corrupt` key**, they are not in `LOCAL_LEARNING_DATA_KEYS`, and export reads
  through `readAllEvents()` (returns `[]` for a corrupt log) so it omits them.
  `safeStorage.ts:76-93`, `repository/local.ts:38`, `privacy-data.ts:71-128`,
  `events.ts:116`. CONFIRMED.
- **C3 — Edge request-validation + rate-limit wiring is unguarded by any test.**
  `_shared/contract.ts` is thoroughly unit-tested, and `ai-chat`/`ai-evaluate`
  `index.ts` do currently call `validate*Body` + `withinRateLimit` before
  `callWithFallback` — but nothing pins that. An edit to an `index.ts` that
  bypasses validation or the limiter leaves all 709 tests green and silently
  reopens B4 (open LLM relay / cost-DoS). `ai-error/index.ts` already has **no
  body validation at all** (imports only `ratelimit`). No test scans
  `supabase/functions/`. HIGH (guards a critical regression class). CONFIRMED.
- **C4 — Cloud-merge logic is module-private + untested, and `hasPulled` never
  resets on user change (B5).** `mergeProgress`/`mergeDailyReview`/
  `progressEqual`/`dailyReviewEqual` (`AppProvider.tsx:48-88`) decide whether
  cloud overwrites local progress — zero tests import them (same data-loss blast
  radius as B2/B3, in the sync path). Compounding: `hasPulled` (`:96,109`) is a
  bare ref never keyed by `user.id`, so a second account never pulls and the
  prior user's local progress is pushed under the new `user_id` (cross-account
  bleed). HIGH (test-gap) / MED (B5 latent until real accounts). CONFIRMED.

### MED

- **C5 — Reset UI over-claims: `lm7` (progress + typed given-answers) survives a
  "can't be undone" reset.** Copy: "This clears your local lesson progress, Mon
  Lexique, Practice Pool signals…" (`PrivacyDataControls.tsx:120-128`), but
  `clearLocalLearningData` touches only `lm_le_*`; v1 lesson completion, `err[].g`
  free-text answers, and daily review all live in `lm7` and are untouched.
  MED-HIGH. CONFIRMED. (Fix: either widen reset to `lm7`/`lm7_srs` or correct the
  copy to its true learning-engine scope.)
- **C6 — "Prepare local export" is not a real data-subject export.** Emits
  `lm_le_*` only; omits `lm7` (progress, given-answers, dailyReview), `lm7_srs`,
  every `__corrupt` blob, and all cloud rows. MED. CONFIRMED.
- **C7 — `bump_ai_usage(p_fn,…)` inserts an unvalidated, unbounded `p_fn` →
  ai_usage row-bloat DoS.** `SECURITY DEFINER`, granted to `authenticated`; the
  fn is NOT checked against the `RATE_LIMITS` allowlist and `p_fn` has no length
  cap. Anonymous sign-in is free, so any caller can `rpc('bump_ai_usage',
  {p_fn: random()})` in a loop and grow the table without bound (the "never anon"
  comment is wrong — anon users are `authenticated`). `schema.sql:145-169`. MED.
  CONFIRMED.
- **C8 — Free unlimited anonymous identities: orphaned cloud rows + toothless
  aggregate rate limit + server-side row proliferation.** `useAuth.ts:16-31`
  auto-mints anon users with no per-device/global cap. (a) Per-user AI limits
  (B4) don't bound aggregate provider cost across N anon accounts on shared
  provider keys; (b) any keychain hiccup / torn chunk → `null` session →
  `signInAnonymously` mints a NEW `user_id`, orphaning the prior user's
  `user_progress`/`user_errors`; (c) every fresh install creates an anon
  user+profile row with no reaper. MED, latent/architectural. CONFIRMED-mechanism.
- **C9 — `TelemetryStore` has the B3 destroy-on-corrupt bug + unbounded
  O(n²) growth.** `readRaw` maps unparseable/non-array → `[]`; `appendEvent`
  then writes `[event]` over the raw blob (no quarantine, no fail-closed). Every
  append does full parse + linear dup-scan + full rewrite with no cap/rotation.
  `telemetry.ts:175-194`. MED, LATENT (no production `appendEvent` caller yet) —
  must be fixed before telemetry is wired. CONFIRMED.
- **C10 — Edge functions buffer the whole body via `await req.json()` before any
  size check.** Caps in `contract.ts` apply post-parse; a multi-MB body is fully
  materialized first. The rate-limit check runs before the body read (bounds it
  per-identity), but C8 removes that bound in aggregate. `ai-chat:46` et al. MED,
  latent. CONFIRMED.
- **C11 — `useSRS` Leitner core is inline, untested, uses raw `Date.now()` +
  midnight math.** Box advance/reset, due-sort, day-boundary logic all live in
  the hook (`useSRS.ts:33-44,94-200`) with zero tests — the one stateful core not
  extracted (unlike blobStore/safeStorage/secureAuthStorage). Regressions in
  interval math or cross-midnight due-dates are unverifiable. MED-HIGH. CONFIRMED.
- **C12 — `migrations.ts` + `compaction.ts` are tested but UNWIRED; B10 growth
  stays live.** No production importer (grep → tests only); `session-controller`
  still re-reads all events and `scoreEvents(all)` per answer, `err[]` never
  pruned. MED. CONFIRMED.
- **C13 — 519 LOC of edge functions have zero static checking.** `tsconfig`
  excludes `supabase/functions` AND CI has no `deno check`/`deno lint` step; the
  security-critical `ratelimit.ts:16` param is `any` (deno-lint-ignore). A type
  error in the provider-fallback / rate-limit path ships silently. MED. CONFIRMED.
- **C14 — Android Auto Backup not opted out → plaintext KV to Google Drive.**
  `app.json` android block has no `allowBackup:false` / `dataExtractionRules` and
  no `expo-build-properties`; Expo default is `allowBackup=true`, so
  `lm7`/`lm7_srs`/`lm_le_events`/`lm_le_telemetry` (and, for pre-B19 installs, the
  plaintext session) back up to the cloud — undermining B9 deletion and B19
  token-at-rest via the backup transport. MED-LOW. CONFIRMED (default); token
  tail-case PLAUSIBLE.
- **C15 — Three divergent normalizers, one untested, no cross-pinning.**
  `lib/normalize.ts` (strips all punct incl. `?`/`!`/apostrophes; **0 tests**;
  used by 6 legacy components + Practice) vs `answer-check.ts` (keeps internal
  punct) vs `lesson-v1/screens/normalizeAnswer.ts` (keeps `?`/`!` significant).
  "Ça va?" grades differently per surface; a tweak to one silently shifts
  acceptance. MED. CONFIRMED.

### LOW / NIT

- **C16** — `scripts/dev/android-smoke.sh` `text)` passes only-space-escaped input
  to `adb shell input text` (device-shell injection: `text 'x; reboot'`); other
  subcommands regex-validate. Dev tooling, but it's the allowlisted one. MED-LOW.
- **C17** — SecureStore chunks orphan if the auth storage-key/project-ref ever
  changes (sweep only covers the current key; no enumeration; iOS keychain
  survives uninstall). `secureAuthStorage.ts`. LOW-MED.
- **C18** — Corrupt backup is a write-once dead-end: never pruned, a 2nd distinct
  corruption isn't backed up (`wrote:false`), and nothing ever reads `raw` back
  for recovery. `safeStorage.ts:85-89`. LOW-MED.
- **C19** — `secureAuthStorage` sizes chunks by UTF-16 length not bytes; a long
  multi-byte `display_name` could exceed SecureStore's 2048-byte cap → session
  persist fails. LOW, PLAUSIBLE.
- **C20** — `ai-error` caps error *count* (50) but not per-element/total size
  before `JSON.stringify` into the Claude prompt. LOW-MED, latent (also dead).
- **C21** — Edge functions return HTTP 200 + fallback text on provider failure;
  client can't distinguish success from failure for retry/metrics. LOW (design).
- **C22** — `validateContent` structural pass still runs over the L1+L14 fixture
  only, not `V1_LESSONS` (v1 structure is checked in the test suite, not the
  validator). Residual B22. LOW-MED.
- **C23** — `validatePools` blank regex `/\[_+\]|_{2,}/` still lets a single bare
  `_` placeholder slip. LOW.
- **C24 — Dead code.** `ai-error` edge fn + `analyzeErrors` (0 callers, still
  deployed-shaped & rate-limit-consuming); deps `@react-native-async-storage/
  async-storage` and `expo-web-browser` (0 imports); orphan key
  `lm7_seen_how_weave_works` (write-only, stale comment); `lm_le_snapshot`
  dormant (no production reader/writer). LOW.
- **C25 — setState-after-unmount (no alive-guard).** `PrivacyDataControls`
  export/reset handlers; `useLearningEngineSession.ts:57` `onUpdate`; plus the
  known MiniConversation/SayItYourWay/SayItYourWayV1/useChat set. LOW.
- **C26 — Complexity hotspots.** `LessonScreen` 808 / `LessonPractice` 773 /
  `PracticeScreen` 662 / `validateContent` 543 / `CombineWeave` 489; live dev-apk
  first-run `lesson-zero.tsx` 412 + `FrenchPieceText` 405. Maintainability. MED.
- **C27 — Config/CI hygiene cluster.** No `permissions:` block + mutable `@v4`
  action pins; no `deno.lock` (esm.sh zero integrity) and no `supabase/config.toml`
  (verify_jwt/ai-diag prune operator-memory-only); `versionCode` absent (every
  build ships 1); doc drift (CLAUDE.md/MASTER_PIPELINE list only
  typecheck+validate:pools vs CI's 4 checks); tailwind 3.3.2 stale;
  `fable5-stop-validate.sh` sed-JSON + unsanitized session_id in a path. LOW/INFO.
- **C28** — `LearnerRendererShell` renders MonLexique/Practice previews without a
  `FEATURES.monLexique`/`FEATURES.practice` check (relies solely on the single
  sandbox route gate). No live leak; defense-in-depth. LOW.
- **C29** — blobStore live-before-hydrate window (a write before hydrate is lost
  on next update); guarded today by `loaded` gates, regression risk only. LOW.
- **C30** — Post-corruption, an intentionally-empty account can never persist (the
  PR-A `corruptUnrecovered && !meaningful → return` guard); no repair/surfacing
  flow for the live corrupt blob or the backup. LOW.

## Storage-key lifecycle table

| Key | Written by | Cleared by reset? | In export? | Versioned? | Corrupt-safe? |
|-----|-----------|-------------------|-----------|-----------|---------------|
| `lm7` (progress, err[].g, dr) | useStorage | **NO** (C5) | **NO** (C6) | NO (B18) | YES (PR-A) |
| `lm7__corrupt` (raw PII) | safeStorage | **NO** (C2) | **NO** | n/a | is the quarantine |
| `lm7_srs` | useSRS | **NO** | **NO** | NO (B18) | YES (PR-A) |
| `lm7_srs__corrupt` (raw) | safeStorage | **NO** (C2) | **NO** | n/a | — |
| `lm7_seen_lesson_zero` | lesson-zero | NO (onboarding flag) | NO | NO | trivial |
| `lm7_seen_how_weave_works` | how-weave-works | NO | NO | NO | **orphan, no reader (C24)** |
| `lm_le_events` (raw userAnswer) | LocalRepository | **YES** | **YES** | per-event only | YES (B3) |
| `lm_le_events__corrupt` (raw) | safeStorage | **NO** (C2) | **NO** | n/a | — |
| `lm_le_snapshot` | (dormant, no prod caller) | YES | recomputed | NO | soft-null |
| `lm_le_telemetry` | (unwired write path) | **YES** (B9) | **YES** (B9) | per-event v1 | **NO** (C9) |
| `lm_le_privacy_state` | privacy-local | YES | NO | **YES** (only versioned key) | YES |
| `sb-<ref>-auth-token[.N]` | supabase / secureAuthStorage | sign-out sweep; reset untouched (correct); **account delete: none (C1)** | NO | manifest-prefixed | soft-null |

## Engineering-quality scorecard

Overall: **B+**. The learning-engine core, storage layer, guard-test culture, and
comment discipline are genuinely A-grade for a codebase this size; the grade is
pulled down by three-stack duplication, stateful hook logic that escapes the
(deliberately React-free) test harness, and dead code kept warm.

| Dimension | Grade | Basis |
|-----------|-------|-------|
| Typing discipline | **A** | `as any` in src: 0; `@ts-ignore`: 0; strict:true; 9 justified `!`, 11 documented `as never` route casts |
| Module boundaries / purity | **A-** | engine modules pure w/ injected `now`; storage cores extracted framework-free; only `session-controller` uses `Math.random`/`Date.now` (injectable) |
| Comment quality | **A** | comments state constraints + cite provenance (audit IDs, canon §, "fails CLOSED"), don't narrate |
| Error handling | **A-** | 33 catch sites, 0 empty `catch{}`; uniform warn+fallback+never-block-startup; deduct: edge 200-on-failure (C21) |
| Naming / consistency | **B** | new code descriptive; legacy terse (`mk`,`lp`,`p`,`err`) but documented; mixed across 3 stacks |
| Dependency hygiene | **B+** | lean, no test-framework bloat; dead deps (C24); esm.sh major-only pin |
| Dead abstraction layers | **B-** | analyzeErrors/ai-error dead; migrations/compaction unwired (honest rails); legacy `sections/` stack behind incomplete gate (B13) |
| Duplication | **C+** | 3 normalizers (C15); 3 renderer stacks; edge cors/json/auth ×3 |
| Function/file complexity | **C** | 808/773/662-line hotspots (C26) |

Three highest-leverage quality moves: (1) add a file-scan guard over
`supabase/functions/*/index.ts` and delete `ai-error`+`analyzeErrors` (closes C3,
~1h, protects the worst latent regression); (2) extract `lib/srsCore.ts` + export
AppProvider merge helpers keyed `hasPulled` by user id (closes C11 + C4/B5,
finishes the extraction pattern); (3) unify/pin the normalizer trio (C15).

## Severity-ranked remediation plan

Grouped into small, single-intention PRs, ordered by risk-reduction per effort.
Each PR: branch from main → fix only its findings → add/extend harness tests →
`typecheck` + `validate:content` + `test:learning-engine` → review → merge.

1. **PR-H — privacy completeness (HIGH).** C2 (clear + export all `__corrupt`
   siblings), C5 (fix reset scope or copy), C6 (export `lm7`/`lm7_srs` too). Local
   only. Highest user-facing + legal risk, cheap, self-contained.
2. **PR-I — cloud data rights (HIGH, needs operator DB).** C1: add DELETE RLS
   policies + a client "delete my account/data" path (or a documented operator
   runbook + in-app disclosure that sync data needs a request). C8(c) anon-row
   reaper. Cloud/operator-gated → Claude writes migration+client, operator
   deploys.
3. **PR-J — edge regression guards + AI-beta gate (HIGH/MED, latent).** C3
   (file-scan guard over edge index.ts wiring), C7 (`bump_ai_usage` fn allowlist +
   length cap), C10 (body size cap pre-parse), C13 (add `deno check`/`deno lint`
   to CI), C20. Do before `aiEnabled` ever flips.
4. **PR-K — sync correctness + tests (HIGH/MED).** C4 (export+test AppProvider
   merge; key `hasPulled` by user id = B5), then B17/B18 (versioning + real error
   pull). Guards the sync-path data-loss class.
5. **PR-L — engine correctness (MED).** B8, B23, B24 (the deferred PR-E2), plus
   C11 (extract+test `srsCore`) and C15 (pin/unify normalizers).
6. **PR-M — growth/lifecycle (MED, latent).** C9 (telemetry quarantine + cap
   before wiring), C12 (wire migrations/compaction; B10), C17/C18 lifecycle.
7. **PR-N — config/build hardening (MED-LOW).** C14 (Android backup opt-out),
   C16 (android-smoke escaping), C27 cluster (CI permissions/pins, deno.lock,
   config.toml, versionCode, doc drift), C19.
8. **PR-O — dead code + validator coverage (LOW).** C24 (delete ai-error/
   analyzeErrors/dead deps/orphan key), C22/C23 (residual B22), C28 defense-in-
   depth flags, C25 unmount guards. Plus still-open B13 (lesson route stage guard),
   B20 (lemot:// note).

## Notes

- No fix is applied in this change — this is the audit + plan deliverable only.
- Round-2 fresh fan-out (LOW-tail sweep + the 4 lenses cut short by the session
  cap) is deferred until the cap resets; HIGH/MED coverage is saturated via
  cross-lens convergence and hand-verification.
