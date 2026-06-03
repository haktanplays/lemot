# Sprint13 SW.2 — Founder Self-Learning Build P3 (Learner Renderer)

> Workstream spec. **Docs-only at creation** — no code/schema/runtime/player/fixture/content
> change accompanies this file. It is the implementation contract for **P3**, the first
> learner-facing renderer over the audited P0–P2 spine.
>
> **Naming:** follows the repo convention `Sprint{N}_SW{X}_{slug}.md` as **Sprint13 SW.2**
> (SW.1 was the P0–P2 spine). The Founder Self-Learning Build spans multiple sprints; this is
> its second implementation workstream.

## Goal

P3 builds the **first learner-facing renderer** over the learning-engine contracts, for
**founder/sandbox testing only**. It consumes the completed, audited P0–P2 spine end to end:

```
contract fixture → learner card render → grade() → LearningEvent → LocalRepository
   → readAllEvents() → scoreEvents() → MasterySnapshot → local UI feedback
```

It is a **calm, premium, label-free** surface — the opposite of the technical dev player.
It does **not** migrate live v7, does **not** touch public navigation, and does **not** add
remote sync / Mon Lexique / Practice Pool full UI. The dev player stays as the debug surface.

## Tier

LM-4 (architecture/feature). Implemented as a sequence of LM-3-sized PRs (§12).

## Canon Sources

- `docs/MASTER_PIPELINE_v1.2.1.md`
- `docs/status/founder-self-learning-build-architecture-review.md` (architecture direction)
- `docs/workstreams/Sprint13_SW1_founder-self-learning-build-p0-p2.md` (the spine this consumes)
- `docs/status/founder-self-learning-p0-p2-spine-audit-checkpoint.md` (audit + carry-forward notes)
- `docs/status/boundary-recognition-ui-decision.md` (soft "later form" cards)
- `CLAUDE.md`

## Binding rules (from canon + the P0–P2 audit)

- **Debug surface ≠ learner UI** (see §3).
- **Events are the source of truth; UI state is derived** from `scoreEvents()` — never hand-mutated.
- **Serialize all `LocalRepository` writes** (audit note #1 — a hard P3 requirement, §7).
- **Deterministic feedback only** in P3 — no AI grading, no Natural Reveal, no open chat.
- Do not touch live v7 (`content/lessons/v1`, `content/lessonTypes`, `components/lesson-v1`, `data/*`), public nav, or the dev player.
- No Supabase/remote, no schema change, no fixture/content edits.
- Keep `npm run validate:content` 0/0/0 and `npm run typecheck` clean on every PR.

---

## 1. Purpose / outcome

The P0–P2 spine can grade an answer (`grade()`), remember it (`LearningEvent` + `LocalRepository`),
and derive mastery (`scoreEvents()`), but nothing *renders* it to a learner — the only surface
today is the technical dev player. P3 delivers a **founder-facing learner renderer**: it plays a
learning-engine fixture as calm learner cards, runs the deterministic event→mastery loop on
device, and shows friendly feedback — entirely behind sandbox/founder gating. Outcome: a founder
can play L11/L12/L16 (or any fixture) as a *learner*, with attempts logged and mastery derived,
proving the spine works behind a real UI before P4 (Mon Lexique / Practice Pool) builds on it.

## 2. Current repo grounding

| File | Role | Relationship to P3 |
|---|---|---|
| `content/learning-engine/index.ts` | public surface (fixtures, validator, helpers) | P3 imports fixtures (`L11_CONTENT_FIXTURE`, …, `LEARNING_ENGINE_FIXTURE`); P3 may add narrow exports for `grade`/`scoreEvents`/`LocalRepository` if a consumer needs them |
| `content/learning-engine/types.ts` | contract/exercise/item types, `OperationId`, `PromptFadeLevel` | renderer branches on `ExerciseBlueprint.operation`; reads `LessonContract` |
| `content/learning-engine/graph.ts` | `buildItemGraph` | resolve boundary/`blockedForms`/`recognitionOnlyForms` surface forms for `grade()` |
| `content/learning-engine/events.ts` | `LearningEvent` / `ErrorTagCode` | renderer constructs full `LearningEvent`s |
| `content/learning-engine/grade.ts` | deterministic `grade()` | called on fill/build/register_switch/context_chain submissions |
| `content/learning-engine/mastery.ts` | `scoreEvents()` / `MasterySnapshot` | derive UI state (mastery, monLexiqueStatus, practiceEligibility) |
| `content/learning-engine/repository/local.ts` | `LocalRepository` (`lm_le_*`) | append events + read back; **writes must be serialized** (§7) |
| `app/dev/learning-engine-player.tsx` | dev-only interactive debug surface | the **anti-pattern** P3 must not clone; stays untouched |
| `app/dev/learning-engine-preview.tsx` | dev-only read-only preview | untouched |
| `docs/status/boundary-recognition-ui-decision.md` | soft "later form" card decision | §5 |
| `docs/status/founder-self-learning-p0-p2-spine-audit-checkpoint.md` | audit + carry-forward notes | §7 requirement source |
| `config/productStage.ts` | `PRODUCT_STAGE` (`sandbox`/`dev-apk`/`public-beta`), `v1LessonEngine` flag | gating (§9) |

The dev player resolves only by deep link and is `__DEV__`-guarded; P3 reuses that gating
discipline but adds a learner UI, not a second debug screen.

## 3. Core P3 rule — Debug surface ≠ learner UI

The learner renderer must **hide**:

- lesson / exercise technical IDs (`L11`, `L11-ex07-…`)
- operation labels (`recognition`, `fill`, `build`, `context_chain`, `register_switch`)
- `recognitionOnly` / `blockedProduction` jargon
- contract / debug terminology (`activeNew`, `supported`, `carryIn`, buckets)
- raw validator language (`FindingCode`, `unseen_form_used`, etc.)

What the learner sees is calm prompts, French text, and friendly feedback — never the engine's
internals. (The dev player keeps showing all of the above; that's fine — it's a debug surface.)

## 4. Supported operations in P3 — learner-facing card mappings

| Operation | Learner card | Notes |
|---|---|---|
| `recognition` | soft reveal / insight card | tap-to-reveal meaning; no operation badge, no id |
| `fill` | input card with calm feedback | type answer → `grade()` → friendly result |
| `build` | tile build card | assemble tiles; surface text from registry; `grade()` with `operation:"build"` |
| `register_switch` | register ladder / "softer version" card | direct → polite as a gentle shift, not a "fail" |
| `context_chain` | chained context-card / **A Small Moment** | situation as a scene; sequential fixed-answer steps; polished, not a debug stepper |
| boundary recognition | soft **"later form"** card | inline, not modal; never gradeable (see §5) |

## 5. Boundary recognition UI

Carry the [`boundary-recognition-ui-decision.md`](../status/boundary-recognition-ui-decision.md)
decision unchanged: boundary objects are valid engine objects (recognition-only items the lesson
shows but never asks the learner to produce), but the **learner UI renders them as soft "later
form" cards** — inline, optional expand/reveal, never a blocking modal, **never gradeable as a
failure**. Preferred copy direction:

> "A form for later"
> "You may see 'peux-tu faire ça ?'."
> "We won't build this form yet."
> "Today, we ask with «est-ce que»…"

Implementation note: P3 may branch on `operation === "recognition"` + the item sitting in the
contract's `recognitionOnly` / `blockedProduction` sets (resolved via the graph) to choose the
soft-card treatment. A dedicated `presentationHint` field on the engine objects remains a
**future, separately-reviewed schema change** (per the boundary decision) — **not** part of P3.

## 6. Event flow

```
1. Learner submits an answer (fill/build/register_switch/context_chain) OR completes a reveal.
2. Renderer resolves grade inputs from the contract + graph:
     expectedAnswer (targetText), acceptedAnswers (bank, if any),
     blockedForms / recognitionOnlyForms (graph-resolved surface forms),
     support flags (lesson defaults).
3. Renderer calls grade(input) → { result, errorTags, normalizedAnswer, expectedAnswer }.
   (Recognition reveals: no grade() needed; emit a recognition event with result "correct"
    on reveal, or a recognition outcome per the controller's policy.)
4. Renderer constructs a FULL LearningEvent (clientEventId, sessionId, timestamp, sync, …).
5. Append via the serialized controller → LocalRepository.appendEvent(event).
6. Read back: LocalRepository.readAllEvents().
7. Derive: scoreEvents(events) → MasterySnapshot.
8. Update local UI state from the snapshot (mastery, monLexiqueStatus, practiceEligibility).
```

Repository API discipline (carry from P1.2 / audit): **`appendEvent` takes a full
`LearningEvent`.** P3 does **not** add `LearningEventDraft` stamping to the repository. If a
constructor helper is useful, define it as a **pure helper proposal** (e.g. `makeLearningEvent`
in the controller or a small `events-factory.ts`), owned by the controller/UI layer — **not** a
repository responsibility — and only after separate approval if it grows beyond a trivial pure
function.

`clientEventId` / `timestamp` generation: these are the one allowed impurity point and live in
the controller's event-construction step (§7), **not** in `grade()` / `mastery` / the repository.

## 7. `LocalRepository` write-serialization requirement (HARD)

The P0–P2 audit flagged that `appendEvent` / `markSynced` are read-modify-write of the whole
JSON array with no locking — concurrent calls can clobber. **P3 must serialize all repository
writes.** Likely solution:

- a small **`LearningSessionController`** (or `EventQueueController`) holding an **internal
  promise chain**: `this.tail = this.tail.then(() => repo.appendEvent(e))`.
- **all** `appendEvent` / `markSynced` calls route through this controller.
- **direct concurrent writes from UI components are disallowed** — components call the
  controller, never `LocalRepository` directly.

This keeps `LocalRepository` itself unchanged (still simple read-modify-write); serialization is
a layer above it. (A later phase could move serialization into the repository, but P3 does it in
the controller to avoid touching the audited P1.2 module.)

## 8. State / controller layer

A **lightweight** controller — not a global architecture rewrite. Likely future file:

- `content/learning-engine/session-controller.ts` (pure-ish, framework-agnostic core), **and/or**
- `hooks/useLearningEngineSession.ts` (the React binding the renderer consumes).

Responsibilities:

- hold the selected lesson fixture + current exercise index/state
- hold answer-input state per card
- construct `LearningEvent`s (the `clientEventId`/`timestamp` impurity point)
- **serialized** event append (the §7 promise chain) + `readAllEvents`
- derive `MasterySnapshot` via `scoreEvents()`
- expose calm result feedback to cards
- **no remote sync**, no Supabase, no AI

Keep the controller small and testable; the renderer components stay declarative and read
controller/snapshot state.

## 9. Route / sandbox gating

- **Sandbox/founder only.** Gate behind `PRODUCT_STAGE === "sandbox"` and/or the existing
  `v1LessonEngine` feature flag (`config/productStage.ts`). `dev-apk` / `public-beta` must not
  expose it.
- **No public-nav exposure** — no tab, no Home link wired for public stages (a sandbox-only
  entry, like the existing "v1 Lab", is acceptable).
- **No live v7 migration** — the live lesson flow is untouched.
- **Dev player remains untouched** as the debug surface.
- New route lives under a learner path (e.g. `app/learn/[fixtureId].tsx` or similar), guarded;
  exact path is a per-PR decision.

## 10. P3 non-goals (explicit)

- No Supabase / remote sync.
- No admin dashboard.
- No paywall.
- No public beta.
- No AI grading / Natural Reveal.
- No open chat / free conversation.
- No Practice Pool full implementation.
- No Mon Lexique full UI (the snapshot *computes* `monLexiqueStatus`; P3 does not build the Mon Lexique screen).
- No content expansion / new fixtures.
- No live v7 migration.

## 11. Learner UI principles

- **Premium / calm** — soft, unhurried, no gamey reward language (no streak/XP/"Amazing!").
- **No technical labels** (per §3).
- **Friendly feedback language** — e.g. "That's it.", "Almost — watch the accents.", "Not a match yet." (mapped from `ErrorTagCode` learner labels; deterministic).
- **Deterministic feedback only** for P3; deeper AI/Natural-Reveal feedback stays future.
- **Boundary cards feel like preview/recognition**, not failure.
- **`context_chain` feels like a small scene / chained context-card**, not a debug stepper.

## 12. P3 PR breakdown

Each PR: one intention, `validate:content` 0/0/0, `typecheck` clean, reviewed before commit.

| PR | Scope | Likely files | Non-goals | Validation / smoke |
|---|---|---|---|---|
| **P3.1** | This workstream spec / checkpoint only (docs) | `docs/workstreams/Sprint13_SW2_…md` | no code | validate:content + typecheck unchanged |
| **P3.2** | Learner renderer **skeleton + gated route**, no event writing | `app/learn/[fixtureId].tsx` (gated), a shell component | no grade/event/snapshot yet | route resolves only in sandbox; typecheck |
| **P3.3** | `recognition` + `fill` cards over a fixture (render + local input; grade for fill) | `components/learning-engine/*Card.tsx` | no events yet (or local-only) | render L11; fill grades via `grade()` |
| **P3.4** | `build` + `register_switch` cards | `components/learning-engine/*Card.tsx` | no events yet | build tiles assemble; register ladder |
| **P3.5** | `context_chain` / A Small Moment card | `components/learning-engine/ContextChainCard.tsx` | no events yet | L16 small-moment renders as a scene |
| **P3.6** | **Event creation + serialized `LocalRepository` append** (controller §7/§8) | `content/learning-engine/session-controller.ts`, `hooks/useLearningEngineSession.ts` | no snapshot UI yet; no remote | append serialized; events land in `lm_le_*` |
| **P3.7** | **Mastery snapshot derivation + local feedback state** | controller/hook + cards consume snapshot | no Mon Lexique/Practice screens | `scoreEvents()` updates UI; monLexique after production success |
| **P3.8** | **Boundary "later form" cards** polish (soft, inline, non-gradeable) | boundary card component | no schema `presentationHint` | boundary not gradeable; soft copy |
| **P3.9** | Smoke checklist / checkpoint docs | `docs/status/…` | no code | founder smoke (§13) recorded |

(Order is a guide; P3.3–P3.5 may merge if small. P3.6 depends on P3.2; P3.7 depends on P3.6.)

## 13. Smoke strategy (founder)

Runnable on emulator (sandbox stage):

1. Open the learner renderer route (sandbox-gated).
2. Select a fixture (L11 / L12 / L16).
3. Render each supported card type (recognition, fill, build, register_switch, context_chain, boundary).
4. Submit a **correct** and a **wrong** answer.
5. Verify `grade()` result drives friendly feedback (deterministic).
6. Verify a full `LearningEvent` is appended.
7. Verify `LocalRepository` writes are **serialized** (no lost events under rapid submits).
8. Verify `scoreEvents()` derives mastery and the UI reflects it.
9. Verify `monLexiqueStatus` changes **only after a production success** (not on recognition alone).
10. Verify the boundary "later form" card is **not gradeable**.
11. Verify **no technical labels** are visible to the learner.
12. Verify **no public-nav leak** (route hidden in dev-apk/public-beta).

(Physical-device smoke is Operator-only.)

## 14. Codex audit checklist (after P3)

- No dev/debug labels leak to the learner (ids, operation badges, bucket jargon).
- **No direct concurrent `LocalRepository` writes** — all writes go through the serialized controller.
- `LearningEvent` shape correct (full event, valid `ErrorTagCode`, itemIds resolve).
- No `Date.now` misuse — time only at the controller's explicit event-construction point; `grade()`/`mastery` stay pure.
- `grade()` used correctly (right `support` flags, graph-resolved boundary forms).
- Mastery is **derived from events** via `scoreEvents()`, never hand-mutated.
- No live-v7 collision (no import of `content/lessons/v1`, `lessonTypes`, `data/*`, live hooks into the renderer).
- No Supabase / network / AI in the P3 surface.
- No public-nav exposure; route sandbox/flag-gated; dev player untouched.
- Boundary recognition never treated as a production target / never gradeable.

## 15. Risks / blockers

- **`LocalRepository` write clobbering** if §7 serialization is skipped → lost events. (Mitigation: controller promise chain; smoke step 7.)
- **UI becoming a dev-player clone** — leaking labels/ids. (Mitigation: §3 rule + audit.)
- **Technical labels leaking** to learners. (Mitigation: §3 + smoke step 11.)
- **Doing Mon Lexique / Practice Pool too early** — scope creep. (Mitigation: §10 non-goals; snapshot only *computes* statuses.)
- **Mixing renderer with remote sync** — premature. (Mitigation: §10.)
- **Over-polishing visuals before the event loop works** — sequence P3.6/P3.7 before heavy design.

## 16. Decision gates before P4 (Mon Lexique / Practice Pool MVP)

P4 may begin only when all hold:

1. Learner renderer plays **at least one fixture end-to-end**.
2. Event append works.
3. Event append is **serialized**.
4. `grade()` result is recorded into events.
5. `MasterySnapshot` updates from `scoreEvents()`.
6. Boundary cards render softly (inline, non-gradeable).
7. No public-nav / live-v7 leak.
8. Founder smoke (§13) PASS.

## Out of scope (this workstream)

- P4 Mon Lexique / Practice Pool / Daily Review; P5 prompt-fade tuning; P6 remote schema +
  `RemoteRepository` + consent; P7 tester sync; P8 Content Builder Engine; P9 audit-warning
  expansion; P10 dashboard; P11 content fill-in.
- Any `supabase/schema.sql` change, DB migration, or Supabase deploy.
- Any live-v7 runtime, public-nav (beyond sandbox entry), or fixture/content change.

## Open blockers (Operator-only)

- None for P3 itself (pure local renderer; no EAS/Supabase/APK step). Physical-device smoke is
  Operator-only when it applies. The first hard operator blockers appear at P6+ (Supabase deploy).

## Sync Queue entries created

- None yet. A `docs/CLOUD_SYNC_QUEUE.md` row marking the P3 workstream / decisions LOCKED would
  be added only after review, if requested — not by this spec.
