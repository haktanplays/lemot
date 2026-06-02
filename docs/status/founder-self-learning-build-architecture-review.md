# Founder Self-Learning Build — Architecture Review / Direction Note

**Date:** 2026-06-02
**Current `main` HEAD:** `c6d3028`
**Status:** Architecture review / **direction note only**. The macro architecture
direction below is **approved for documentation**, but **nothing here is implemented**.
No code, schema, runtime, player, fixture, or content change accompanies this note — it
records *where we are going*, not *what landed*. It sits alongside the build-status
snapshots ([`learning-engine-interactive-baseline.md`](./learning-engine-interactive-baseline.md),
[`learning-engine-v0.1-baseline.md`](./learning-engine-v0.1-baseline.md),
[`learning-engine-l11-l12-l16-chain-smoke-baseline.md`](./learning-engine-l11-l12-l16-chain-smoke-baseline.md))
and the [`boundary-recognition-ui-decision.md`](./boundary-recognition-ui-decision.md) decision,
none of which it changes.

> **North star (unchanged):** Components render. Engines decide. Contracts constrain.
> Events remember. AI explains but never overrides.

This note is **Tier LM-4** (canon / architecture). It is a direction note, not an
implementation commit. It explicitly does **not** add DB migrations, does **not** edit
`supabase/schema.sql`, and does **not** edit code. Any schema/runtime change it describes
is a *future, separately-reviewed* step.

## Grounding (what exists today on `main @ c6d3028`)

- **Contract engine** (`content/learning-engine/`): `types.ts` (ItemId, RawItem,
  LessonContract, ExerciseBlueprint discriminated union, `Ownership`
  active/supported/recognitionOnly/recycled, `OperationId`, `PromptFadeLevel` PF0–PF3,
  `Finding`/`FindingCode`), `answer-check.ts` (pure, AI-free `normalizeAnswer` /
  `checkAnswer`), `validate.ts` (pure structural/referential validator), `registry.ts`
  (`mergeItemMapsStrict`, hard-fails on duplicate ids), `index.ts` (fixtures).
- **Lesson fixtures:** L1, L11, L12, L14, L15, L16, L18. L16 is the first zero-new-item
  cross-lesson recombination fixture. L11→L12→L16 chain is smoke-verified.
- **Dev player** (`app/dev/learning-engine-player.tsx`): dev-only, deep-link,
  `__DEV__`-guarded, **no persistence / mastery / events / AI / network / TTS**. Shows
  technical IDs + operation badges (a debug surface, not a learner UI).
- **Existing local persistence** (live v7, separate system): `lib/storage.ts` (`kvStorage`
  = `expo-sqlite/kv-store` native / `localStorage` web), `hooks/useErrors.ts` (ErrorEntry
  `{w,s,g,c,l,t}`, weak = 3+ errors), `hooks/useSRS.ts` (Leitner 5-box, intervals
  `[0,1,3,7,30]`). Storage key `lm7` / `lm7_srs`.
- **Existing Supabase** (live v7 sync, separate): `profiles`, `user_progress` (jsonb blob),
  `user_errors`; RLS on; Edge Functions `ai-chat`/`ai-diag`/`ai-error`/`ai-evaluate`.
  **No** cohort / tester / event tables yet.
- **Stage/flags** (`config/productStage.ts`): `sandbox` / `dev-apk` / `public-beta`;
  `v1LessonEngine` flag (on in sandbox, off in dev-apk).

---

## 1. Executive recommendation

**Build the Founder Self-Learning Build as a thin runtime layer *on top of* the existing
deterministic contract engine — do not rewrite it, and do not migrate live v7.** The hard
parts (contract types, ownership buckets, deterministic `checkAnswer`, the strict
validator, the L1/L11/L12/L14/L15/L16/L18 fixtures) already exist and are clean. What is
missing is everything *around the answer check*: a learner renderer, an event spine,
derived state (mastery / Mon Lexique / queues), and remote ingestion.

Three load-bearing decisions (approved for documentation):

1. **Events are the source of truth; everything else is derived.** Mastery matrix, Mon
   Lexique, Practice Pool, Daily Review, and the dashboard are *projections* of an
   append-only `learning_event` log. A scoring-policy change re-derives rather than
   migrates.
2. **A `LearningRepository` interface sits between the app and storage**, with
   `LocalRepository` (kvStorage; founder solo / offline) and `RemoteRepository` (Supabase;
   tester cohorts). The dashboard reads the remote only. This satisfies "swap
   Supabase/Postgres later" without leaking Supabase types into the app.
3. **Sequence the work so nothing user-facing ships before the event spine and validator
   guardrails exist.** Renderer is worthless without logging; dashboard is worthless
   without ingestion; ingestion is dangerous without consent + RLS.

Founder Self-Learning Build is **architecture-complete, not just a lesson renderer**:
lessons playable, attempts logged, errors tracked, mastery updated, Mon Lexique updated,
Practice Pool / Daily Review driven by weak items, tester data synced to a remote DB, admin
dashboard able to analyze learning behavior.

**Deliberately deferred:** AI evaluation (deterministic engine first, per canon), V4-B
global redesign, paywall, public-beta polish. **Operator-only blockers** (cannot close in
cloud): Supabase deploy, schema-migration apply, EAS env, physical-device smoke.

---

## 2. Architecture diagram (text)

```
┌────────────────────────────── DEVICE (Expo / RN) ──────────────────────────────┐
│                                                                                  │
│  CONTENT (static, validated)          RUNTIME                                    │
│  content/learning-engine/             components/learning-engine/  (NEW)         │
│   ├ types.ts  (contracts)        ┌──► LearnerRenderer ──► card components        │
│   ├ items.ts  (registry)         │     (recognition→reveal, fill→input,          │
│   ├ lessons/*.contract/.exercise │      build→tiles, context_chain→A Small       │
│   ├ answer-check.ts (det.)  ◄────┤      Moment, boundary→soft "later form")      │
│   ├ validate.ts  (audit)         │                                               │
│   └ graph.ts (NEW, derived)      │     ▲ reads contract+items   │ emits events    │
│                                  │     │                        ▼                 │
│                              ┌───┴─────────────────── ENGINE (NEW, pure) ───────┐ │
│                              │ grade() → ErrorTag    scoreEvent() → MasteryDelta │ │
│                              │ promptFade()          eligibility() (pool/review) │ │
│                              └──────────────┬───────────────────────────────────┘ │
│                                             ▼                                      │
│  LearningRepository (NEW interface)   ┌─────────────────────┐                      │
│    ├ LocalRepository  ───────────────►│ kvStorage (lm_le_*) │  append-only event   │
│    └ RemoteRepository ──┐             │ + OFFLINE EVENT QUEUE│  queue + snapshots   │
│                         │             └─────────────────────┘                      │
└─────────────────────────┼──────────────────────────────────────────────────────┘
                          │ batch sync (idempotent, clientEventId)
                          ▼
┌──────────────────────── REMOTE (Supabase / Postgres) ─ source of truth (cohorts) ─┐
│  Edge Function: ingest-events (validates, upserts on client_event_id)              │
│  RAW:   learning_events ─┐                                                          │
│  REF:   testers, cohorts, devices_builds, content_versions, error_tags             │
│  TXN:   sessions, lesson_attempts, exercise_attempts                               │
│  DERIVED (recomputable): item_mastery_snapshots, mon_lexique_entries,              │
│                          practice_pool_queue, daily_review_queue                   │
│  RLS: tester sees only own rows; admin role reads cohort-wide                       │
└───────────────────────────────┬────────────────────────────────────────────────┘
                                ▼
┌──────────────── ADMIN / FOUNDER DASHBOARD (web, reads remote only) ───────────────┐
│  cohort & tester overview · lesson progress · session timeline · weak-item / error │
│  heatmap · mastery matrix · Mon Lexique usage · Practice/Daily effectiveness ·     │
│  raw-event drilldown · CSV/JSON export                                             │
└───────────────────────────────────────────────────────────────────────────────────┘
```

Boundaries that must hold: components render; the engine decides; contracts constrain;
events remember; AI explains but never overrides. The dev player stays as-is, parallel and
debug-only.

---

## 3. Core learning loop

```
1. PRESENT     LearnerRenderer reads LessonContract + ExerciseBlueprint, picks a
               card by operation, applies promptFade level for the target items.
2. ATTEMPT     Learner produces (fill/build/context_chain) or recognizes.
3. CHECK       grade(input, exercise, contract):
                 • production → answer-check.normalizeAnswer + bank/alternatives
                 • returns { result, errorTags[], normalizedAnswer }   (deterministic)
4. FEEDBACK    Calm, passive-mirror copy ("Not a match yet." / soft success). No
               "Amazing/streak". Boundary cards never graded as failures.
5. EVENT       emit LearningEvent (append-only) with clientEventId, itemIds,
               promptLevel, result, errorTags, attemptNumber, contentVersion, build.
6. MASTERY     scoreEvent(event) → MasteryDelta per itemId (seen/recog/prod/wrong,
               lastProduced, weakTags, promptFadeLevel, status). Snapshot updated.
7. MON LEXIQUE activation rule fires: owned+first-produced → add entry; weak → flag.
8. POOL        eligibility(): item becomes Build/Stretch/Challenge candidate based on
               mastery + weakTags + ownership + dependency.
9. DAILY REV   return scheduler enqueues due items (decay) into Daily Review queue.
10. ANALYTICS  events sync to remote; dashboard projects cohort views from raw events.
```

Founder-solo mode runs steps 1–9 entirely locally (exportable). Tester mode adds step
5→remote ingestion and step 10. **Every step except 3–4 is a projection of the event log**,
so 6–9 can be recomputed from raw events at any time.

---

## 4. Data architecture

| Concern | Decision |
|---|---|
| **Local cache** | `kvStorage` namespaced `lm_le_*` (distinct from live-v7 `lm7`/`lm7_srs` so the two systems never collide). Stores: append-only event queue, latest derived snapshots (for instant UI), sync cursor. |
| **Offline queue** | Events are appended locally first, *always*. A `pending` flag + `clientEventId` (UUID) per event. Sync drains pending → remote, marks `synced`. Never block the learner on network. |
| **Source of truth** | **Founder solo:** local, exportable JSON. **Tester cohort:** remote Postgres is authoritative; device is a cache. This split is a `repository mode` flag, not two codebases. |
| **Sync/API layer** | One Edge Function `ingest-events` accepting a batch; upsert on `client_event_id` (idempotent — safe re-send). Pull side only needed for multi-device founder use; testers are push-mostly. |
| **Derived vs raw** | RAW = `learning_events` (+ session/attempt rollups), immutable. DERIVED = mastery snapshots, Mon Lexique, queues — recomputed by a pure reducer that runs both client-side (for UI) and server-side (for dashboard), guaranteeing the same projection. |
| **Admin reads** | Dashboard reads remote derived tables + raw drilldown via an **admin role**, never from devices, never with client-side `service_role`. |
| **Export/audit** | `export(testerId|cohortId)` → CSV/JSON of raw events + snapshots. Founder-solo export is a local file; cohort export is a dashboard action. |
| **Repository abstraction** | `interface LearningRepository { appendEvent, getPending, markSynced, readSnapshot, ... }` with `LocalRepository` / `RemoteRepository`. The reducer and renderer depend only on the interface. Swapping Supabase→raw Postgres later = one new impl. |

---

## 5. Remote DB schema proposal (Supabase / Postgres) — PROPOSAL ONLY

> **Not implemented. Not a migration. `supabase/schema.sql` is untouched.** This is a
> target shape for a future, separately-reviewed migration task (operator deploys).

New `learning-engine` tables, **additive** — do not touch the existing
`profiles`/`user_progress`/`user_errors` (those remain the live-v7 sync). Lowercase
identifiers, FK columns indexed, RLS on every table, idempotent setup-script style (matches
the existing convention).

```sql
-- REFERENCE
testers(id uuid pk, pseudonym text unique, email text null, consent_at timestamptz,
        consent_version text, created_at, deleted_at null)        -- pseudonymous
cohorts(id uuid pk, name text, stage text check in('dev','founder','tester'),
        starts_at, ends_at null, notes text)
cohort_members(cohort_id fk, tester_id fk, primary key(cohort_id,tester_id))
devices_builds(id uuid pk, tester_id fk, platform text, os_version text,
        app_build text, expo_runtime text, first_seen, last_seen)
content_versions(id uuid pk, content_version text, item_registry_version text,
        error_taxonomy_version text, captured_at)                 -- mirrors contract.versions

-- TRANSACTIONAL
sessions(id uuid pk, tester_id fk, device_build_id fk, started_at, ended_at null,
        app_build text, content_version_id fk)
lesson_attempts(id uuid pk, session_id fk, tester_id fk, lesson_id text,
        started_at, completed_at null, outcome text, content_version_id fk)
exercise_attempts(id uuid pk, lesson_attempt_id fk, exercise_id text,
        operation text, attempt_number int, result text, started_at, ended_at)

-- RAW (source of truth)
learning_events(
   id uuid pk default gen_random_uuid(),
   client_event_id uuid unique not null,        -- idempotency key
   tester_id fk, cohort_id fk null, session_id fk, lesson_id text, exercise_id text,
   operation text, item_ids text[],             -- canonical ItemIds
   prompt_level text,                            -- PF0..PF3
   user_answer text null, expected_answer text null, normalized_answer text null,
   result text not null,                         -- error taxonomy code
   error_tags text[] default '{}',
   attempt_number int default 1,
   occurred_at timestamptz not null,             -- device clock
   received_at timestamptz default now(),        -- server clock
   content_version_id fk, app_build text, device_info jsonb,
   sync_meta jsonb)                              -- {origin:'local', queued_at,...}
   -- indexes: (tester_id, occurred_at), (lesson_id), (item_ids gin), unique(client_event_id)

error_tags(code text pk, severity text, learner_label text, admin_category text,
        is_internal bool)                        -- taxonomy lookup (see §7)

-- DERIVED (recomputable projections; never hand-edited)
item_mastery_snapshots(tester_id fk, item_id text, seen_count int, recog_success int,
        recog_fail int, prod_success int, prod_fail int, wrong_count int,
        last_seen, last_produced null, weak_tags text[], status text,
        prompt_fade_level text, practice_eligible bool, mon_lexique_status text,
        next_return_at null, updated_at, primary key(tester_id,item_id))
mon_lexique_entries(tester_id fk, item_id text, added_at, source_lesson text,
        activation_reason text, last_practiced null, primary key(tester_id,item_id))
practice_pool_queue(tester_id fk, item_id text, path text check in('build','stretch','challenge'),
        priority numeric, reason text, enqueued_at, primary key(tester_id,item_id,path))
daily_review_queue(tester_id fk, item_id text, due_at, box int, last_result text,
        primary key(tester_id,item_id))

-- SYNC
sync_state(tester_id fk, device_build_id fk, last_client_event_id uuid,
        last_synced_at, primary key(tester_id,device_build_id))
```

RLS: testers `using (tester_id = auth.uid())` on all their rows; an `admin` role
(claim-based) gets cohort-wide read on derived + raw. **Deploy + migration apply are
operator-only.**

---

## 6. Event schema proposal (client-side type)

Mirrors the `learning_events` table; this is the in-app shape the reducer consumes.

```ts
type LearningEvent = {
  eventId?: string;            // server-assigned; absent until ingested
  clientEventId: string;       // UUID, generated on device — idempotency key
  testerId: string;            // pseudonymous
  cohortId?: string;
  sessionId: string;
  lessonId: string;            // contract.id, e.g. "L16"
  exerciseId: string;          // blueprint.id
  operation: OperationId;      // reuse existing union
  itemIds: ItemId[];           // canonical, colon-namespaced
  promptLevel: PromptFadeLevel;// PF0..PF3 (reuse existing)
  userAnswer: string | null;
  expectedAnswer: string | null;
  normalizedAnswer: string | null;  // from answer-check.normalizeAnswer
  result: ErrorTagCode;        // single primary outcome (see §7)
  errorTags: ErrorTagCode[];   // secondary/diagnostic tags
  attemptNumber: number;
  timestamp: number;           // device epoch ms (occurred_at)
  contentVersion: string;      // contract.versions.contentVersion
  appBuild: string;
  deviceInfo: { platform: string; osVersion?: string; expoRuntime?: string };
  sync: { origin: "local"; status: "pending" | "synced"; queuedAt: number };
};
```

`clientEventId` is the spine of idempotency and offline replay. `result` (one code) drives
mastery; `errorTags` (many) drives the heatmap. **Privacy:** `userAnswer` is raw learner
text — its storage must be disclosed in consent (§17) and excludable for founder-solo.

---

## 7. Error taxonomy (deterministic)

Versioned via the existing `contract.versions.errorTaxonomyVersion` (currently `null` —
this fills it). Three faces of every code: **internal diagnostic** (engine logic),
**learner-facing label** (calm copy), **admin analytics category** (dashboard grouping).

| Code | Internal meaning | Learner label (calm) | Admin category |
|---|---|---|---|
| `correct` | normalized exact / bank match | "That's it." | Correct |
| `accepted_variant` | matched an allowed alternative | "That works too." | Correct |
| `punctuation_only` | differs only by trailing punct | "Close — just punctuation." | Near-miss |
| `accent_only` | differs only by diacritics | "Almost — watch the accents." | Near-miss |
| `spelling_near_miss` | edit-distance ≤ threshold | "Almost — small spelling slip." | Near-miss |
| `wrong_item` | produced a different owned item | "Not the word we need here." | Substitution |
| `wrong_order` | right tiles, wrong sequence (build) | "Right pieces, different order." | Order |
| `missing_word` | omitted a required token | "Something's missing." | Omission |
| `extra_word` | added an unrequired token | "One word too many." | Insertion |
| `wrong_register` | direct where polite expected | "A softer way fits better." | Register |
| `meaning_shift` | parses but changes meaning | "That means something different." | Meaning |
| `blocked_form_used` | produced a `blockedProduction` form | "That form comes later." | Boundary |
| `recognition_only_form_used` | produced a recognition-only item | "You'll build that one later." | Boundary |
| `overproduction_unseen_form` | used a form never taught | "Let's stay with what we know." | Boundary |
| `incorrect_but_understandable` | wrong but communicative | "I understood — here's the natural way." | Soft-wrong |
| `empty_or_skip` | empty / skipped | (no judgment) | Skip |

Determinism: codes are computed by a pure `grade()` using `normalizeAnswer`, token diffing,
and contract lookups (ownership / blocked / recognitionOnly sets) — **no AI**.
`accepted_variant` requires an answer bank (§14). `meaning_shift` and
`incorrect_but_understandable` start as *coarse heuristics* and are the only place a future
AI layer may *refine* a label — never override the contract.

---

## 8. Mastery matrix

Per `(testerId, itemId)`, a pure reducer over the event log:

```ts
type ItemMastery = {
  itemId: ItemId;
  seenCount: number;
  recognition: { success: number; fail: number };
  production:  { success: number; fail: number };
  wrongCount: number;
  lastSeen: number; lastProduced: number | null;
  weakTags: ErrorTagCode[];                  // recurring error categories
  status: Ownership;                          // active|supported|recognitionOnly|recycled
  promptFadeLevel: PromptFadeLevel;           // PF0..PF3 current scaffold
  practiceEligible: boolean;
  monLexiqueStatus: "none" | "added" | "weak" | "practiced";
  nextReturnAt: number | null;               // decay/return schedule
};
```

Rules (deterministic, tunable constants in one config):
- **Weak** = ≥3 production fails *or* ≥3 of the same `errorTag` (generalizes the existing
  `useErrors` "3+ errors" rule to itemIds + tags).
- **Prompt fade up** after N clean productions at the current level; **fade down** (more
  support) after a fail — bridges into §9.
- **Status** is seeded from the contract bucket and only *advances* via evidence
  (recognition→supported→active) — never silently downgrades canon ownership.
- **Decay/return** reuses the proven Leitner intervals already in `useSRS`
  (`[0,1,3,7,30]` days), keyed by itemId rather than flashcard id.

Snapshot is cached locally for instant UI and recomputable from raw events server-side
(identical reducer) for the dashboard.

---

## 9. Prompt fade / assistance matrix

Two orthogonal axes. **Axis A = prompt language** (maps to the existing `PF0–PF3` +
`supportFade.promptFadeMax`). **Axis B = answer scaffold** (maps to operations).

| Level | Axis A — prompt | Axis B — answer scaffold | Operation realization |
|---|---|---|---|
| PF0 | English prompt | scaffolded answer / model shown | recognition reveal, read-only build |
| PF1 | mixed (Weave) prompt | partial tiles given | `build` with extra tiles |
| PF2 | French-first prompt | minimal tiles / single blank | `fill`, tight `build` |
| PF3 | no prompt / context-only | full production | `context_chain`, open fill |

Engine rule: the renderer requests the *lowest* (most-supportive) of (a) the item's current
`promptFadeLevel` from mastery and (b) the contract's `promptFadeMax` ceiling. Success
advances the item toward PF3; a fail drops it one level for the next encounter.
`register_switch` is a dedicated rung (direct→polite), not a fade level. Support never
exceeds what the lesson contract allows.

---

## 10. Item ownership / prerequisite / carry graph

Most of this is **derivable today** from the contracts + `firstIntroducedIn` +
`SHARED_ITEMS`; the gap is making it explicit and queryable. Proposal: a build-time
`graph.ts` (pure, no item schema change) that scans all contracts:

```ts
type ItemGraphNode = {
  itemId: ItemId;
  firstIntroducedIn: string;            // already on RawItem
  ownedIn: string[]; supportedIn: string[]; recycledIn: string[];
  recognitionOnlyIn: string[]; blockedProductionIn: string[];   // derived from contracts
  prerequisites: ItemId[];              // NEW authored field (additive, optional)
  carryIn: ItemId[]; carryOut: ItemId[];// lineage across lessons
};
```

- `ownedIn/supportedIn/...` are **computed** by folding every `LessonContract.items.*` and
  `production.*` — no new authoring burden, and they directly power audit checks.
- `prerequisites` and explicit `carryIn/carryOut` are the only *new authored* data; introduce
  them additively (optional fields) so existing fixtures stay valid.
- **Unseen-form guardrail:** an exercise target whose itemId is not owned/supported/recognized
  in that lesson *or any prerequisite lesson* is a hard error (extends the existing
  `target_answer_contains_unowned_item`).
- **Content Builder dependency warnings** (§14) read this graph (e.g. "L16 reuses
  `est-ce-que-je-peux-faire-ca` first taught in L12 — confirm L12 precedes L16").

This formalizes exactly what the L11→L12→L16 chain note documents informally.

---

## 11. Mon Lexique MVP

**ItemId-driven, not a separate wordbook** (canon). An entry is a pointer into the item
registry + the learner's mastery, never a copy of vocabulary.

| Field | Visibility |
|---|---|
| `text.fr` / `text.en`, "Use it here" context card | learner-facing |
| pronunciation respelling (from `pronunciationProfile`) | learner-facing |
| `itemId`, `status`, `weakTags`, `firstSeen`, `lastProduced` | hidden/debug |

- **Activation rules:** an item enters Mon Lexique when it becomes `owned` **and** first
  successfully produced (`monLexiqueStatus: added`), or when it goes `weak` (`weak`).
  Recognition-only items do **not** auto-enter (they are "for later").
- **"Use it here" cards** reuse existing `context_chain` step content and the future A Small
  Moment cards — Mon Lexique surfaces context, never a bare flashcard.
- **Weak surfacing:** weak entries float to the top and are tagged for Practice Pool
  **Challenge** and Daily Review.
- **Relation:** Mon Lexique is a *view over mastery* and a *feeder* into Practice Pool /
  Daily Review — not a third store. Gated by the existing `monLexique` flag (off in dev-apk).

---

## 12. Practice Pool / Daily Review MVP

User-facing paths **Build / Stretch / Challenge** (canon naming), each a deterministic query
over mastery + graph:

| Path | Learner framing | Internal selection |
|---|---|---|
| **Build** | "Strengthen what you know" | owned + familiar items, recency decay due, low error rate — consolidation |
| **Stretch** | "Put pieces together" | supported items + cross-lesson recombination (reuse zero-new-item fixtures like L16) |
| **Challenge** | "Tackle the tricky ones" | weak items (≥3 fails / repeated `errorTag`), boundary soft-cards, due high-box items |

Internal connections: **mastery state** (status, prompt level), **weak tags**,
**recency/decay** (Leitner intervals from `useSRS`), **lesson dependency** (graph — never
surface an item before its prerequisites), **item ownership status** (never ask production of
recognition-only), **error history** (weakTags steer Challenge), **Mon Lexique activation**
(weak entries seed Challenge).

**Daily Review** = the *return scheduler*: due items from `daily_review_queue`, capped (calm,
e.g. 5–8), weak-first, **no streak / no "come back tomorrow" pressure** (banned). Reuses the
existing Daily Review home-card pattern but driven by itemId mastery instead of word counts.

---

## 13. Learner-facing renderer plan

A **new** `components/learning-engine/` layer that consumes the same fixtures the dev player
does, but renders learner cards and **hides all technical labels** (per the
boundary-recognition decision). The dev player stays untouched as the debug surface.

| Operation | Learner card | Notes |
|---|---|---|
| `recognition` | reveal card / soft insight | no `recognition` badge, no exercise id |
| `fill` | input card | calm result copy, prompt-fade aware |
| `build` | tile card | reuse tile-sequence logic; resolve surface from registry |
| `context_chain` | **chained context-card / "A Small Moment" / enriched-flashcard** | situation as a scene; sequential fixed-answer steps; polished, not a bare stepper |
| boundary recognition | **soft "later form" card** | inline, not modal; "A form for later"; never gradeable as wrong |
| `register_switch` | register-ladder card | direct→polite as a gentle shift, not a "fail" |

Mechanics: a `presentationHint` (e.g. `later_form`) is the deferred, *reviewed* schema
addition the boundary doc anticipates — until then the renderer branches on
`operation + bucket`. Hard rule: **debug surface ≠ learner UI**; no lesson/exercise IDs, no
`recognitionOnly`/`blockedProduction` vocabulary, no operation badges. Gated behind
`v1LessonEngine` + stage (sandbox / founder first).

---

## 14. Content Builder Engine plan

A **deterministic authoring assistant** (a dev-only script + optional dev screen), not an AI
generator — and a **must-have architecture component**, not a nice-to-have. It scaffolds a
new lesson from a short author spec and the item graph:

- emits a `LessonContract` skeleton (versions, goal.canDo/notGoal, item buckets) and
  `ExerciseBlueprint[]` stubs;
- proposes **BuildTiles** with `answerIndex` from a target string + registry lookup;
- suggests **carry-in/carry-out** from the graph (which prior items to recycle);
- raises **prerequisite warnings** (target item not yet owned upstream);
- inserts **Mon Lexique hooks** and **Practice Pool eligibility hooks**;
- generates an **answer bank / accepted alternatives** seed for `accepted_variant`;
- runs **validator preflight** (`validateContent`) before the author commits;
- prints a **content audit checklist** (§15).

AI is at most an optional suggestion source for alternatives/glosses — the contract and
validator remain authoritative (`aiMayExplain: true`, `aiMayOverride: false`).

---

## 15. Validator / content-audit expansion

The existing validator (`validate.ts`) is strong on structure / referential integrity. Add
**pedagogical** checks. Most are **warnings** (don't block) except the safety-critical ones:

| Proposed code | Severity | Catches |
|---|---|---|
| `too_many_active_new` | warning | `activeNew.length` over budget (cognitive load) |
| `unseen_form_used` | **error** | target item not owned in lesson or any prerequisite (graph) |
| `not_goal_violation` | warning | exercise exercises something in `goal.notGoal` |
| `unsafe_production_target` | **error** | production target outside allowed (extends existing checks across the graph) |
| `recognition_only_distractor_policy` | warning | distractor policy review (already flagged as a "next candidate" in the chain note) |
| `weak_recycle_density` | warning | too few / many recycled items vs prior lessons |
| `missing_practice_pool_hook` | info | owned active item with no pool eligibility |
| `missing_mon_lexique_hook` | info | active item that never activates Mon Lexique |
| `missing_answer_alternative` | warning | production target with no accepted-variant bank |
| `prompt_fade_mismatch` | warning | exercise scaffold exceeds `supportFade.promptFadeMax` |
| `source_hygiene` | (exists) | extend to flag `pending` review at ship gate |

These keep `validate:content` as the single gate, preserving the current 0/0/0 discipline
while adding pedagogical safety.

---

## 16. Admin / founder dashboard plan

Separate **web** surface reading the **remote** only (never devices, never client
`service_role`). Read-mostly.

- **Tester overview:** pseudonym, build, last active, lessons done, weak-item count.
- **Cohort overview:** aggregate progress, completion funnel, error category mix.
- **Lesson progress:** per-lesson attempt / pass rates, drop-off points.
- **Session timeline:** chronological event stream per session.
- **Weak items / error heatmap:** itemId × `errorTag` matrix across cohort.
- **Item mastery:** distribution per item (seen / produced / weak).
- **Mon Lexique usage** and **Practice Pool effectiveness** (does Challenge reduce weakness
  over time?).
- **Daily Review compliance** (return rate — *not* streaks).
- **Raw event drilldown** + **CSV/JSON export**.

Access via an `admin` role/claim with cohort-wide RLS read; founder solo can use a local
export viewer instead. Keep it functional, not polished — explicitly *not* a place to spend
UI budget yet.

---

## 17. Privacy / consent plan

Tester cohorts = DB-backed learning data, including **raw answer text** → consent is
mandatory.

- **Consent gate** before any tester sync; store `consent_at` + `consent_version`.
- **Pseudonymous `testerId`** (random UUID); **email optional** and separable.
- **Raw-answer disclosure:** consent text explicitly states typed answers are stored for
  learning analysis.
- **Delete/export:** per-tester data export and hard delete (`deleted_at` + purge job).
- **Admin role protection:** RLS; no `service_role` in client; admin claim server-verified.
- **Environment separation:** `dev` / `founder` / `tester` cohorts isolated; founder-solo can
  run with no email and local-only storage; dev/sandbox never writes to the tester cohort.
- GDPR-friendly by construction (data minimization, right to erasure, purpose limitation).

---

## 18. Claude smoke strategy (E2E)

Runnable on emulator (sandbox stage), one lesson end-to-end:

1. Open a lesson via the learner renderer (e.g. L16).
2. Submit a **correct** answer → assert `result: correct`, mastery `prod_success++`.
3. Submit a **wrong** answer → assert correct `errorTag` (e.g. `wrong_order` on a build).
4. Verify a `LearningEvent` is appended locally with `clientEventId`, itemIds, promptLevel.
5. Verify mastery snapshot updates; weak threshold trips after 3 fails.
6. Verify Mon Lexique activation on first clean production.
7. Verify Practice Pool eligibility (item appears in Build/Stretch/Challenge).
8. Verify Daily Review queue enqueues the item with a due date.
9. **Tester mode:** drain offline queue → `ingest-events` → row present remotely; **re-send
   same batch** → no duplicate (idempotency).
10. Dashboard query returns the event/mastery for that tester.
11. **Offline path:** airplane mode → attempt → event queued `pending` → reconnect → synced.

Boundary check: producing a `blockedProduction`/recognition-only form yields
`blocked_form_used`/`recognition_only_form_used`, **not** a generic failure, and boundary
cards are never gradeable. (Physical-device smoke = operator-only.)

---

## 19. Codex static / product audit strategy

- **Schema consistency:** event type ↔ `learning_events` columns ↔ reducer inputs agree.
- **Event integrity:** no event without `clientEventId`; `result` ∈ taxonomy; itemIds
  resolve in registry.
- **No silent skipped exercises:** every exercise either logs an attempt or an explicit
  `empty_or_skip` (the validator guards orphaned exercises — extend to runtime).
- **Item ownership correctness:** every production target owned per contract + graph.
- **Recognition-only / blocked-production safety:** never a production target or distractor
  (validator enforces; audit the renderer too).
- **Storage consistency:** `lm_le_*` namespace never collides with `lm7` / `lm7_srs`.
- **Sync idempotency:** `client_event_id` unique; re-send is a no-op.
- **Renderer boundaries:** learner UI imports only the engine + components, never live-v7
  runtime; no technical labels leak.
- **No public-nav leakage:** routes `__DEV__` / flag-guarded; dev player not linked.
- **No AI/network where forbidden:** `grade()` / reducer are pure; AI only in the explicitly
  bounded explain path.
- **Privacy/consent coverage:** no sync before consent; delete/export paths exist.
- **Admin access controls:** no client `service_role`; admin RLS verified.

---

## 20. PR-sized implementation roadmap

Each PR is one product intention, `validate:content` + `typecheck` green, reviewed before
commit. **Dependency order is strict.** None of these are started by this note.

| PR | Scope | Depends on | Do-not-start-before |
|---|---|---|---|
| **P0** | `graph.ts` (derived ownership/carry graph) + audit checks `unseen_form_used`/`unsafe_production_target` (validator-only, no runtime) | — | — |
| **P1** | Event types + `LearningRepository` interface + `LocalRepository` + offline queue (no UI) | P0 | P0 |
| **P2** | Pure engine: `grade()` (error taxonomy §7) + `scoreEvent()` reducer (mastery §8). Unit-tested, no UI. | P1 | **Do not build renderer before the engine exists** |
| **P3** | Learner renderer `components/learning-engine/` (fill/build/recognition/context_chain/boundary/register), wired to engine+events, sandbox/`v1LessonEngine`-gated. | P2 | P2 |
| **P4** | Mon Lexique MVP + Practice Pool/Daily Review eligibility (derived, local). | P2 | P3 (UI consumes it) |
| **P5** | Prompt-fade matrix wired into renderer (§9). | P3, P4 | — |
| **P6** | Remote schema file + `ingest-events` Edge Function + `RemoteRepository` + consent gate (§17). **Deploy = operator-only.** | P1 | **Do not write remote before consent model designed** |
| **P7** | Tester-mode sync (offline drain, idempotency) + sync_state. | P6 | P6 |
| **P8** | Content Builder Engine (authoring scaffold script). | P0, P2 | — |
| **P9** | Validator pedagogical audit expansion (warnings §15). | P0 | — |
| **P10** | Admin/founder dashboard (read-only, remote). | P6, P7 | **Do not build dashboard before ingestion is live** |
| **P11** | L0–L24 content band fill-in to fixtures (content-only PRs, batched). | P0, P9 | gated by audit checks existing |

Cross-cutting rules: **never** combine renderer + schema in one PR; **never** combine content
authoring with engine changes; the AI explain layer is a *separate, later* PR after the
deterministic engine is proven; the dev player is never deleted or migrated as part of this.

---

## 21. Risks / non-goals

**Risks**
- **Scope creep into live v7.** Mitigation: the engine stays parallel, gated by
  `v1LessonEngine` + stage; no live renderer migration in this band.
- **Raw answer privacy.** Mitigation: consent gate, pseudonymity, delete/export, founder-solo
  can opt out of remote.
- **Schema-file ≠ deployed DB** (known canon debt). Mitigation: migrations are explicit
  operator-only steps; cloud writes files, never deploys.
- **Derived-state drift** (client vs server projections diverge). Mitigation: one shared pure
  reducer; raw events are the truth and can re-derive both.
- **Heuristic error tags** (`meaning_shift`, `incorrect_but_understandable`) over-claiming.
  Mitigation: keep them coarse; AI may refine but never override.
- **Idempotency gaps** → duplicate cohort data. Mitigation: `client_event_id` unique +
  upsert.

**Non-goals (this band)**
- No AI-central evaluation, no open chat as the spine (deterministic first).
- No V4-B global redesign; no paywall; no public-beta polish.
- No streaks / XP / reward language (banned).
- No Word Graph, no full Mon Lexique advanced tier.
- No live v7 migration; no public-nav exposure of dev surfaces.
- No marking anything "shipped/complete" while operator blockers (Supabase deploy, schema
  apply, EAS env, physical smoke) are open.

---

## Status of this note

- **Direction note only.** The 14 approved macro decisions (events-as-truth, derived
  projections, local cache / offline queue, remote-DB source-of-truth for cohorts,
  dashboard-reads-remote, `LearningRepository` abstraction, deterministic-engine-first,
  itemId-driven Mon Lexique, mastery/weak/recency/ownership-driven pools, Content Builder as
  a must-have, label-hiding learner renderer with polished context-cards, soft later-form
  boundary cards, and the consent/privacy model) are recorded for documentation.
- **Nothing implemented.** No DB migration, no `supabase/schema.sql` edit, no code, no
  fixture/content change, no runtime/player change.
- **Operator-only blockers remain open** (Supabase deploy, schema-migration apply, EAS env,
  physical-device smoke) — this band is "architecture-documented", not "shipped".
- **Next step (only if approved):** create `docs/workstreams/Sprint{N}_SW{X}_founder-self-learning-build.md`
  for the chosen phase scope, and append a `CLOUD_SYNC_QUEUE.md` row marking the architecture
  decision LOCKED for operator sync. Neither is done here.
