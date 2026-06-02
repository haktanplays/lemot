# Sprint13 SW.1 — Founder Self-Learning Build P0–P2 (Local Deterministic Event Spine)

> Workstream spec. **Docs-only at creation** — no code/schema/runtime/player/fixture/content
> change accompanies this file. It is the implementation contract for the *first* block of
> the Founder Self-Learning Build.
>
> **Naming note:** this spec follows the repo workstream convention
> `Sprint{N}_SW{X}_{slug}.md` and is registered as **Sprint13 SW.1**. Although the Founder
> Self-Learning Build initiative spans multiple sprints, this file is its *first*
> implementation workstream spec, so it carries the convention name for discoverability and
> pipeline consistency.

## Goal

P0–P2 build the **local deterministic learning spine** for the Founder Self-Learning Build,
in strict dependency order:

```
P0  contract graph        (derived ownership / prerequisite / carry-in lineage + audit checks)
P1  event log             (LearningEvent types + LearningRepository + LocalRepository + offline queue)
P2  grading + mastery     (deterministic grade() → error taxonomy + scoreEvent() mastery reducer)
```

Outcome: a pure, testable, **AI-free, network-free, UI-free** core that can grade a typed
answer, emit an append-only event, and derive per-item mastery — entirely on-device. No
learner renderer, no Mon Lexique UI, no Practice Pool UI, no remote DB. Those come **after**
this spine exists and is audited clean (see Decision gates, §11).

## Tier

LM-4 (architecture). Implemented as a sequence of LM-3-sized PRs (§7).

## Canon Sources

- `docs/MASTER_PIPELINE_v1.2.1.md`
- `docs/status/founder-self-learning-build-architecture-review.md` (the approved direction note — §1–§21)
- `docs/status/boundary-recognition-ui-decision.md`
- `docs/status/learning-engine-l11-l12-l16-chain-smoke-baseline.md`
- `CLAUDE.md`

## Architecture rules (binding for this workstream)

- **Events are the source of truth; derived state comes from events.**
- **Do not build the learner renderer before the event spine + grade/reducer exist.**
- Do not touch the live v7 runtime (`content/lessons/v1`, `content/lessonTypes`, `components/lesson-v1`, `data/*`).
- Do not touch public navigation (tabs, Home links). The dev player stays as-is.
- **No DB migrations in P0–P2. No `supabase/schema.sql` edit. No Supabase remote ingestion.**
- Do not mix content authoring with engine work — no fixture/content edits in these PRs.
- **Deterministic first.** No AI, no network imports in any P0–P2 module. AI may *explain*
  later but never overrides the contract.
- Keep `npm run validate:content` at **0/0/0** and `npm run typecheck` clean on every PR.

---

## 1. Purpose / outcome

The contract engine already proves *content correctness* (`validate.ts`) and *deterministic
answer checking* (`answer-check.ts`). What is missing is the **learning spine**: a way to
remember what happened (events), grade it consistently (taxonomy), and derive what the
learner knows (mastery). P0–P2 deliver exactly that, and nothing more:

- **P0** turns the implicit ownership/carry relationships (already encoded across contracts +
  `SHARED_ITEMS` + `firstIntroducedIn`) into an explicit, queryable graph, and adds the two
  safety-critical audit checks that depend on it.
- **P1** defines the immutable `LearningEvent`, the storage-agnostic `LearningRepository`
  interface, a `LocalRepository` over `kvStorage`, and an offline append/replay queue under
  the `lm_le_*` namespace.
- **P2** defines the deterministic `grade()` (error taxonomy) and the pure `scoreEvent()`
  reducer that folds events into an `ItemMastery` snapshot.

After P2, a future renderer (P3) can be wired with confidence that grading and memory are
already correct and tested.

## 2. Current repo grounding

Real files this workstream reads or extends (none are *modified* by P0 except where a PR
explicitly says so):

| File | Role today | Relationship to P0–P2 |
|---|---|---|
| `content/learning-engine/types.ts` | contract/exercise/item types, `Ownership`, `OperationId`, `PromptFadeLevel` PF0–PF3, `Finding`/`FindingCode` | P0 adds graph types; P1/P2 reuse `ItemId`, `OperationId`, `PromptFadeLevel`, `Ownership` |
| `content/learning-engine/items.ts` | `SHARED_ITEMS` + per-lesson item maps; `RawItem.firstIntroducedIn` | P0 graph source of carry-in lineage |
| `content/learning-engine/lessons/*.contract.ts` | per-lesson `LessonContract` (item buckets, production, supportFade, versions) | P0 graph folds these into ownership sets |
| `content/learning-engine/lessons/*.exercises.ts` | per-lesson `ExerciseBlueprint[]` | P0 audit checks read targets; P2 grading consumes these |
| `content/learning-engine/validate.ts` | pure validator (structural/referential) | P0.2 extends with graph-dependent checks |
| `content/learning-engine/answer-check.ts` | pure `normalizeAnswer` / `checkAnswer` | P2 `grade()` builds on `normalizeAnswer` |
| `content/learning-engine/registry.ts` | `mergeItemMapsStrict` (dup-id hard fail) | P0 graph builds over the merged registry |
| `content/learning-engine/index.ts` | fixtures (`*_CONTENT_FIXTURE`, `LEARNING_ENGINE_FIXTURE`) | P0 graph + P2 self-tests run against these |
| `lib/storage.ts` | `kvStorage` (`expo-sqlite/kv-store` native / `localStorage` web) | P1 `LocalRepository` backing store |
| `hooks/useErrors.ts` | live-v7 error log (`{w,s,g,c,l,t}`, weak = 3+ errors) | P2 generalizes the "3+ errors" idea to itemIds + tags (does **not** modify this hook) |
| `hooks/useSRS.ts` | live-v7 Leitner 5-box, intervals `[0,1,3,7,30]` | P2 reuses the interval curve for return scheduling (does **not** modify this hook) |
| `config/productStage.ts` | `sandbox`/`dev-apk`/`public-beta`, `v1LessonEngine` flag | future P3 gating only; P0–P2 add no flag |

The live-v7 hooks (`useErrors`, `useSRS`) are **reference patterns**, not dependencies — P0–P2
modules live under `content/learning-engine/` and do not import or alter them.

---

## 3. P0 — derived ownership / prerequisite / carry graph

**Pure derived module + the audit checks that depend on it. No runtime, no storage, no UI.**

### Graph module responsibilities

A pure function `buildItemGraph(input: ValidationInput): ItemGraph` that folds every contract
and the merged item registry into a queryable structure. No side effects; safe to call from
the validator script, a test, or (later) a debug screen.

### Derived ownership sets (per `ItemId`, computed — not authored)

- `ownedIn: string[]` — lessons whose contract lists the item in any ownership bucket.
- `supportedIn: string[]` — lessons listing it in `items.supported`.
- `recycledIn: string[]` — lessons listing it in `items.recycled`.
- `recognitionOnlyIn: string[]` — lessons listing it in `items.recognitionOnly`.
- `blockedProductionIn: string[]` — lessons listing it in `production.blockedProduction`.
- (also `activeNewIn` for completeness — lessons listing it in `items.activeNew`.)

### Lesson graph / prerequisite ordering

- `firstIntroducedIn` (already on `RawItem`) anchors where each item originates.
- A lesson-level partial order: lesson B *depends on* lesson A if B lists an item as
  `supported`/`recycled` whose `firstIntroducedIn` is A. This reproduces the L11→L12→L16
  chain as derived data.
- `prerequisites: ItemId[]` is an **optional, additive authored field** considered for a
  *later* PR — P0 does **not** add it to `RawItem`/`LessonContract` (that would be a schema
  touch). P0 derives ordering from existing data only.

### Carry-in / carry-out lineage

- `carryIn(lessonId)` = items the lesson uses (`supported`/`recycled`) that it does not
  first-introduce.
- `carryOut(lessonId)` = items first-introduced here that a later lesson reuses.
- This is pure derivation over `firstIntroducedIn` + bucket membership; no new authored data.

### Unseen-form guardrail (the safety reason P0 exists)

An exercise production target whose `itemId` is **not** owned/supported/recognized in its own
lesson — *nor in any lesson that precedes it in the derived order* — is a hard error. This
generalizes the existing `target_answer_contains_unowned_item` from "owned in this lesson" to
"reachable in the learner's history".

### Validator / audit additions (P0.2)

New `FindingCode`s added to `validate.ts` (driven by the graph):

- `unseen_form_used` — **error**: target item not reachable in lesson-or-prerequisite history.
- `unsafe_production_target` — **error**: production-op target that the graph shows is
  recognition-only / blocked anywhere it could be reached (defence-in-depth over the existing
  per-contract checks).
- *(optional, warnings)* `prerequisite_order_mismatch` / `carry_in_without_source` — surface a
  carry-in whose source lesson is not ordered before the consumer. Warnings, not blockers.

These must leave the current fixtures at **0/0/0** (the L11→L12→L16 chain already satisfies
them; if a check fires on existing content, the check is wrong, not the content — fix the
check).

### P0 non-goals

- No `RawItem`/`LessonContract` schema change (no new authored fields).
- No runtime, storage, event, or UI code.
- No new lesson content, no fixture edits.
- No change to `answer-check.ts` or to existing `FindingCode` semantics.

---

## 4. P1 — event types + repository + LocalRepository + offline queue

**Types + local persistence only. No remote DB, no Supabase, no UI.**

### `LearningEvent` type (immutable, append-only)

```ts
type LearningEvent = {
  clientEventId: string;       // UUID generated on device — idempotency key (spine)
  sessionId: string;           // groups events in one sitting
  lessonId: string;            // contract.id
  exerciseId: string;          // blueprint.id
  operation: OperationId;      // reuse types.ts union
  itemIds: ItemId[];           // canonical, colon-namespaced
  promptLevel: PromptFadeLevel;// PF0..PF3 (reuse types.ts)
  attemptNumber: number;
  userAnswer: string | null;
  expectedAnswer: string | null;
  normalizedAnswer: string | null;   // from answer-check.normalizeAnswer
  result: ErrorTagCode;        // single primary outcome (P2 taxonomy)
  errorTags: ErrorTagCode[];   // secondary/diagnostic tags
  timestamp: number;           // device epoch ms
  contentVersion: string;      // contract.versions.contentVersion
  appBuild: string;
  deviceInfo: { platform: string; osVersion?: string; expoRuntime?: string };
  sync: { status: "pending" | "synced"; origin: "local"; queuedAt: number };
};
```

Notes: `result`/`errorTags` reference `ErrorTagCode` defined in P2 — P1 may land the type with
`result: string` as a temporary bridge **only if** P2 immediately follows; preferred is to land
`ErrorTagCode` as a bare union in P1.1 so P1 and P2 share it. `sync` fields exist now so the
later remote phase needs no event-shape migration.

### `LearningRepository` interface (storage-agnostic)

```ts
interface LearningRepository {
  appendEvent(e: LearningEvent): Promise<void>;     // append-only
  getPending(): Promise<LearningEvent[]>;           // sync-status === "pending"
  markSynced(clientEventIds: string[]): Promise<void>;
  readAllEvents(): Promise<LearningEvent[]>;         // for local mastery derivation
  readSnapshot?(): Promise<MasterySnapshot | null>;  // optional cached projection (P2)
  writeSnapshot?(s: MasterySnapshot): Promise<void>;
}
```

The reducer (P2) and the future renderer (P3) depend only on this interface — never on
`kvStorage` or Supabase directly.

### `LocalRepository` (backed by `kvStorage`)

- Implements `LearningRepository` over `lib/storage.ts`'s `kvStorage`.
- **Namespace:** all keys prefixed `lm_le_` — e.g. `lm_le_events`, `lm_le_snapshot`,
  `lm_le_session`. **Must never collide** with live-v7 `lm7` / `lm7_srs`.
- Append is read-modify-write of the event list (JSON), or a chunked scheme if size warrants;
  start simple (single list) given founder/tester scale.

### Offline queue behavior

- Every event is appended locally first with `sync.status: "pending"` — the learner is never
  blocked on network (there is no network in P1 at all).
- `getPending()` / `markSynced()` are the drain API the *future* remote phase (P6/P7) will
  call. In P1 they are exercised only by self-tests.
- Replay: `readAllEvents()` returns events in append order so the reducer can fold them
  deterministically.

### P1 non-goals

- No Supabase, no `RemoteRepository`, no network, no ingestion Edge Function.
- No UI, no hook wiring into screens.
- No mastery logic yet (P2) beyond the optional snapshot read/write stubs.
- No change to `lib/storage.ts` public surface (consume it, don't alter it).

---

## 5. P2 — deterministic grade() + scoreEvent() mastery reducer

**Pure functions + the mastery snapshot shape. No renderer, no Mon Lexique UI, no Practice
Pool UI, no remote sync.**

### `ErrorTagCode` taxonomy

```ts
type ErrorTagCode =
  | "correct" | "accepted_variant"
  | "punctuation_only" | "accent_only" | "spelling_near_miss"
  | "wrong_item" | "wrong_order" | "missing_word" | "extra_word"
  | "wrong_register" | "meaning_shift"
  | "blocked_form_used" | "recognition_only_form_used" | "overproduction_unseen_form"
  | "incorrect_but_understandable" | "empty_or_skip";
```

Each code carries three faces (per the direction note §7): internal diagnostic,
learner-facing label, admin analytics category. A small lookup table (`ERROR_TAGS`) holds the
labels/categories; `grade()` returns only the codes.

### `grade()` responsibilities

`grade(input: string, exercise: ExerciseBlueprint, contract: LessonContract, graph: ItemGraph):
{ result: ErrorTagCode; errorTags: ErrorTagCode[]; normalizedAnswer: string }` — **pure,
AI-free, no network**. Deterministic checks, in priority order:

- `empty_or_skip` — empty/whitespace input.
- `correct` — `normalizeAnswer(input) === normalizeAnswer(target)` (reuse `answer-check`).
- `accepted_variant` — matches an entry in the exercise's accepted-alternative bank
  (`answerPolicy.allowAlternatives`; bank seeding is a later content concern — P2 supports the
  check, tolerates an empty bank).
- `punctuation_only` — equal except trailing punctuation.
- `accent_only` — equal after diacritic strip but differed with accents.
- `spelling_near_miss` — edit distance ≤ small threshold (e.g. 1–2) on a single token.
- `wrong_order` — for `build`/multi-token: same token *set* as target, different sequence.
- `missing_word` / `extra_word` — token multiset diff shows omission / insertion.
- `wrong_item` — produced a different *owned* item than the target.
- `wrong_register` — for `register_switch`: produced the direct form where polite expected.
- `blocked_form_used` — input matches an item in `production.blockedProduction` (graph-aware).
- `recognition_only_form_used` — input matches a `recognitionOnly` item.
- `overproduction_unseen_form` — input contains a form not reachable in graph history.
- `meaning_shift` / `incorrect_but_understandable` — **coarse fallback heuristics only**:
  nonempty, parses, but unmatched → `incorrect_but_understandable`; reserve `meaning_shift`
  for a narrow, conservatively-detected case. These are the *only* codes a future AI layer may
  later refine — never override.

`grade()` returns one primary `result` (highest-priority match) plus any secondary
`errorTags` it can cheaply attach (e.g. `accent_only` + `punctuation_only`).

### `scoreEvent()` reducer

`scoreEvent(prev: ItemMastery | undefined, event: LearningEvent, itemId: ItemId): ItemMastery`
— pure fold. The full snapshot is `events.reduce(...)` per item; identical when run on-device
(for UI later) or server-side (for the dashboard later).

### `ItemMastery` shape

```ts
type ItemMastery = {
  itemId: ItemId;
  seenCount: number;
  recognition: { success: number; fail: number };
  production:  { success: number; fail: number };
  wrongCount: number;
  lastSeen: number; lastProduced: number | null;
  weakTags: ErrorTagCode[];
  status: Ownership;                  // seeded from contract bucket; advances only on evidence
  promptFadeLevel: PromptFadeLevel;   // PF0..PF3
  practiceEligible: boolean;
  monLexiqueStatus: "none" | "added" | "weak" | "practiced";
  nextReturnAt: number | null;
};
type MasterySnapshot = Record<ItemId, ItemMastery>;
```

### Weak threshold

- **Weak** = ≥3 production fails for the item **or** ≥3 occurrences of the same `errorTag`
  (generalizes `useErrors`' "3+ errors"). Tunable constant in one place.

### Prompt fade level update

- Up (less support) after N consecutive clean productions at the current level; down (more
  support) after a fail. Capped by the contract's `supportFade.promptFadeMax`. (Wiring into a
  renderer is P5 — P2 only computes the level.)

### Leitner / return schedule reuse

- `nextReturnAt` uses the existing `useSRS` interval curve `[0,1,3,7,30]` days, keyed by
  itemId. P2 imports the *curve as a constant* (or re-declares it locally) — it does **not**
  modify `useSRS` and does **not** share its `lm7_srs` store.

### P2 non-goals

- No renderer, no Mon Lexique UI, no Practice Pool / Daily Review UI.
- No remote sync, no Supabase.
- No AI scoring. `meaning_shift`/`incorrect_but_understandable` stay coarse heuristics.
- No change to `useErrors`/`useSRS`/live-v7 state.

---

## 6. Proposed file layout (suggested — do NOT create in this spec)

```
content/learning-engine/
  graph.ts                    # P0  buildItemGraph + ItemGraph types
  events.ts                   # P1  LearningEvent + ErrorTagCode union
  grade.ts                    # P2  grade() + ERROR_TAGS lookup
  mastery.ts                  # P2  scoreEvent() + ItemMastery/MasterySnapshot
  repository/
    types.ts                  # P1  LearningRepository interface
    local.ts                  # P1  LocalRepository (kvStorage, lm_le_*)
```

Alternative if repo prefers flatter modules: keep `repository.ts` single-file until it grows.
Tests/self-tests colocate as `*.test.ts` or as a `scripts/` self-test runner consistent with
`scripts/validateContent.ts`. Final placement is a per-PR decision; this layout is a
suggestion, not a mandate, and **nothing here is created by this spec.**

---

## 7. PR breakdown

Each PR: one intention, `validate:content` 0/0/0, `typecheck` clean, reviewed before commit.

### P0.1 — graph derivation only
- Files likely: `content/learning-engine/graph.ts` (new); `index.ts` (export); maybe `types.ts` (graph types).
- Validation: `typecheck`; `validate:content` unchanged 0/0/0.
- Self-test: `buildItemGraph(LEARNING_ENGINE_FIXTURE)` produces correct `ownedIn`/carry sets for the L11→L12→L16 chain; duplicate-source detection sanity.
- Non-goals: no validator change yet, no runtime/storage/UI.

### P0.2 — validator/audit graph checks
- Files likely: `validate.ts` (new `FindingCode`s + checks), `types.ts` (`FindingCode` additions).
- Validation: `validate:content` must stay 0/0/0 on existing fixtures.
- Self-test: a throwaway/fixture-local malformed case proves `unseen_form_used` / `unsafe_production_target` fire (not committed as content).
- Non-goals: no runtime/storage/UI; no content edits.

### P1.1 — event types + repository interface
- Files likely: `events.ts` (LearningEvent + ErrorTagCode union), `repository/types.ts`.
- Validation: `typecheck`.
- Self-test: type-level only (compiles; shapes match the spec).
- Non-goals: no implementation, no storage writes, no UI.

### P1.2 — LocalRepository + offline queue
- Files likely: `repository/local.ts`, `index.ts` export.
- Validation: `typecheck`.
- Self-test: append N events → `readAllEvents` returns them in order; `getPending`/`markSynced` round-trip; `lm_le_*` keys verified isolated from `lm7`.
- Non-goals: no remote, no UI, no mastery logic.

### P2.1 — error taxonomy + grade()
- Files likely: `grade.ts` (+ `ERROR_TAGS` lookup), reuse `answer-check.ts`.
- Validation: `typecheck`.
- Self-test: table-driven cases — each `ErrorTagCode` has at least one input/expected pair (correct, accent_only, punctuation_only, wrong_order on a build, missing/extra word, blocked_form_used, recognition_only_form_used, empty_or_skip, etc.).
- Non-goals: no AI; no reducer; no UI.

### P2.2 — mastery reducer + snapshot tests
- Files likely: `mastery.ts`, optional snapshot read/write in `repository/local.ts`.
- Validation: `typecheck`.
- Self-test: fold a synthetic event stream → weak state trips after 3 production fails; prompt-fade up after N clean; `nextReturnAt` advances on the Leitner curve.
- Non-goals: no renderer; no Mon Lexique/Practice UI; no remote.

---

## 8. Smoke / self-test strategy

No renderer is required for any P0–P2 self-test; all are pure-function or local-storage tests.

- **P0:** graph derived correctly from the existing L11/L12/L16 chain — `ownedIn`,
  `supportedIn`, `carryIn(L16)` include the L11/L12/L15/SHARED items the chain note documents;
  prerequisite order places L11 before L12 before L16. A deliberately malformed in-test
  contract triggers `unseen_form_used`.
- **P1:** event queue appends and replays locally; `getPending` returns only `pending`;
  `markSynced` flips status; `lm_le_*` keys never touch `lm7`/`lm7_srs`.
- **P2:** `grade()` returns expected tags across a representative table (incl. `wrong_order`,
  `accent_only`, `blocked_form_used`, `empty_or_skip`); `scoreEvent()`/full reduce updates
  weak-item state after repeated errors and advances prompt-fade/return schedule as specified.
- Determinism check: running the reducer twice over the same event list yields identical
  snapshots.

Self-tests should run in CI-friendly form (a `*.test.ts` or a `scripts/` runner mirroring
`scripts/validateContent.ts`), not require a device or Metro. (Physical-device smoke is not
applicable until P3+; it is Operator-only when it does apply.)

## 9. Codex audit checklist (after P0–P2)

- **Graph correctness:** derived sets match contracts; prerequisite order is acyclic and
  matches `firstIntroducedIn` lineage.
- **No silent skipped exercises:** every exercise is reachable by the graph/validator; orphan
  detection (existing) still holds.
- **Event idempotency:** `clientEventId` unique; re-append of the same id is a no-op or
  detected; `getPending`/`markSynced` cannot double-count.
- **Storage namespace isolation:** only `lm_le_*` keys written; `lm7`/`lm7_srs` untouched.
- **Deterministic grade purity:** `grade()`/`scoreEvent()` import no AI, no network, no React;
  same input → same output; no `Date.now()` inside `grade()` (time comes from the event).
- **No AI/network import** anywhere in `content/learning-engine/` P0–P2 modules.
- **No live v7 collision:** no import of `content/lessons/v1`, `lessonTypes`, `data/*`,
  `useErrors`, `useSRS` into the new modules.
- **No public nav exposure:** no route/tab/Home change; dev player untouched.

## 10. Risks / blockers

- **Overbuilding before renderer.** Mitigation: P0–P2 ship pure modules + tests only; resist
  adding screens "to see it work" — the self-tests are the proof.
- **Schema creep into Supabase too early.** Mitigation: P1 `sync` fields exist but no
  `RemoteRepository`, no migration, no `schema.sql` edit until P6 (out of this workstream).
- **Local storage collision with live v7.** Mitigation: hard `lm_le_*` namespace rule +
  Codex audit check.
- **Taxonomy overclaiming `meaning_shift`.** Mitigation: keep it a narrow, conservative
  heuristic; default ambiguous wrongs to `incorrect_but_understandable`.
- **Adding UI too early.** Mitigation: explicit P0–P2 non-goals; renderer gated behind §11.
- **Mixing content authoring with engine primitives.** Mitigation: no fixture/content edits
  in any P0–P2 PR; content fill-in (direction-note P11) is a separate workstream.

## 11. Decision gates (must be true before P3 learner renderer starts)

1. **Graph available** — `buildItemGraph` lands (P0.1) and the graph audit checks are green on
   all fixtures (P0.2), `validate:content` still 0/0/0.
2. **Event type stable enough** — `LearningEvent` + `ErrorTagCode` shipped (P1.1) and not
   expected to change shape for P3 (the `sync` fields are present so the remote phase needs no
   event migration).
3. **LocalRepository / offline queue working** — append + replay + pending/synced round-trip
   pass self-tests (P1.2).
4. **`grade()` and `scoreEvent()` working** — taxonomy table tests (P2.1) and mastery reducer
   tests (P2.2) pass; reducer is deterministic.
5. **P0–P2 Codex audit clean** — §9 checklist passes.

Only when gates 1–5 hold does P3 (learner renderer, `components/learning-engine/`,
`v1LessonEngine`-gated) begin. P3 is **not** part of this workstream.

## Out of scope (this workstream)

- P3 learner renderer; P4 Mon Lexique / Practice Pool / Daily Review; P5 prompt-fade wiring;
  P6 remote schema + `ingest-events` + `RemoteRepository` + consent; P7 tester sync; P8
  Content Builder Engine; P9 audit-warning expansion; P10 dashboard; P11 L0–L24 content fill-in.
- Any `supabase/schema.sql` change, DB migration, or Supabase deploy.
- Any live-v7 runtime, public-nav, or fixture/content change.

## Open blockers (Operator-only)

- None for P0–P2 (pure local engine; no EAS/Supabase/APK/device step). The first operator-only
  blockers appear at P6+ (Supabase deploy, schema-migration apply) — out of this workstream.

## Sync Queue entries created

- None yet. A `docs/CLOUD_SYNC_QUEUE.md` row marking the P0–P2 workstream / architecture
  decision LOCKED would be added only after review, if requested — not by this spec.
