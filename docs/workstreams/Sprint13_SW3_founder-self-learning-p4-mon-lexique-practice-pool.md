# Sprint13 SW.3 — Founder Self-Learning Build P4 (Mon Lexique / Practice Pool MVP)

> Workstream spec. **Docs-only at creation** — no code/schema/runtime/player/fixture/content change
> accompanies this file. It is the implementation contract for **P4**, the first learner surfaces that
> read the local `MasterySnapshot` produced by the P3 spine.
>
> **Naming:** repo convention `Sprint{N}_SW{X}_{slug}.md` as **Sprint13 SW.3** (SW.1 = P0–P2 spine,
> SW.2 = P3 learner renderer). The Founder Self-Learning Build spans multiple sprints; this is its
> third implementation workstream.

## Goal

P4 builds the **Mon Lexique** and **Practice Pool** MVPs as **calm, label-free, founder/sandbox-only**
learner surfaces, both **derived from the local `MasterySnapshot`** that the P3 loop already produces:

```
card → grade/reveal → LearningEvent → serialized append → readAllEvents → scoreEvents → MasterySnapshot
   → [P4] Mon Lexique view (monLexiqueStatus)  +  Practice Pool selector (practiceEligibility / dueAt)
```

It does **not** introduce remote sync, Supabase, AI, public-nav, or live-v7 migration. It is a
projection layer over the audited spine + `mastery-v0.2` reducer — not a new data store.

## Tier

LM-4 (architecture/feature). Implemented as a sequence of LM-3-sized PRs (§7).

## Canon Sources

- `docs/MASTER_PIPELINE_v1.2.1.md`
- `docs/status/founder-self-learning-build-architecture-review.md` (architecture direction)
- `docs/workstreams/Sprint13_SW2_founder-self-learning-p3-learner-renderer.md` (the P3 surface this builds on)
- `docs/status/founder-self-learning-p3-learner-renderer-checkpoint.md` (P3 status + decision gate §7)
- `docs/status/founder-self-learning-mastery-precision-policy.md` (`mastery-v0.2`; precision = soft signal)
- `docs/status/boundary-recognition-ui-decision.md` (label-free learner UI; debug ≠ learner)
- `CLAUDE.md`

## Binding rules (carried from P0–P3 + precision policy)

- **Debug surface ≠ learner UI** — no ids/operation labels/bucket names/validator language/raw tags/JSON.
- **Events are the source of truth; everything is a projection** of `scoreEvents()` — never hand-mutated.
- **No new gamification** — no streak/XP/reward/"Amazing!"/come-back pressure (locked canon, CLAUDE.md "Do NOT").
- **Selectors are pure & deterministic** — same snapshot in → same selection out; no `Date.now` inside
  selectors (pass a `now` if due-filtering is needed, mirroring the reducer's time discipline).
- Do not touch live v7 (`content/lessons/v1`, `content/lessonTypes`, `components/lesson-v1`, `data/*`),
  public nav, or the dev player.
- No Supabase/remote, no `RemoteRepository`, no schema change, no fixture/content edits.
- Keep `npm run validate:content` 0/0/0 and `npm run typecheck` clean on every PR.

---

## 1. Current grounding (what already exists)

The `mastery-v0.2` reducer (`content/learning-engine/mastery.ts`) already derives, **per item**, exactly
the projections P4 needs — P4 mostly *reads* them, it does not recompute mastery:

| Field | Type | P4 use |
|---|---|---|
| `monLexiqueStatus` | `"hidden" \| "added" \| "weak"` | Mon Lexique inclusion + status |
| `practiceEligibility` | `"none" \| "build" \| "stretch" \| "challenge"` | Practice Pool path bucketing |
| `isWeak` | `boolean` | weakness (drives `weak` / `challenge`) |
| `leitnerBox` / `dueAt` | `number` / `number \| null` | Practice/Daily due ordering |
| `precisionCount` / `precisionTags` | counters | internal only — **never** rendered; never used as weakness |
| `seenCount` / success / `recognitionSuccess` / `productionSuccess` | counters | internal only |

**Key consequence of the precision policy:** precision-only items are **not** `isWeak`, so the reducer
already gives them `monLexiqueStatus` `hidden`/`added` (never `weak`) and `practiceEligibility` `build`
(never `challenge`). P4 must **preserve** this — it must not re-introduce precision-as-weakness in a
selector. The learner registry surface (`items[id].text.fr` / `.text.en`) is the only learner-safe
display source; ids/tags/counters stay internal.

## 2. Mon Lexique MVP

- **itemId-driven, not a separate wordbook.** Mon Lexique is a **view** over the item registry +
  `MasterySnapshot` — there is **no separate vocabulary store**, no second source of truth.
- Inclusion + status come from **`monLexiqueStatus`**:
  - `hidden` → not shown in Mon Lexique;
  - `added` → shown as a known/collected word (reached via a production success);
  - `weak` → shown with a calm "needs another look" treatment (NOT a punishment / NOT "failed").
- Shows the **learner-safe item surface** (`text.fr`, and `text.en` meaning) and **simple context only
  if safely available** and leak-free (no raw `prompt`/`displayAnswer`/`text.en` that carries lesson ids
  or jargon — same caution as the boundary card; prefer a curated/clean field or omit).
- **Does NOT expose** raw item ids, `weakTags`, `precisionTags`, counters, `dueAt` numbers, JSON, or any
  debug data.
- **No Word Graph** (adjacency/connected knowledge) yet — post-beta per CLAUDE.md Mon Lexique tiering.
- **No advanced notebook / notes / SRS editing** yet — MVP is "gathered items + status", read-mostly.
- **Dev-APK scope reminder:** Mon Lexique stays **sandbox/founder-gated and hidden** in dev-apk/public-beta
  (CLAUDE.md anti-chaos Rule 8); P4 is the sandbox MVP, not a public surface.

## 3. Practice Pool MVP

- **Deterministic local selector over `MasterySnapshot`** → three paths, projected from
  `practiceEligibility` (which the reducer already computes):
  - **Build** — `practiceEligibility === "build"`: seen / recognized / **near-miss-only** / non-weak items.
  - **Stretch** — `practiceEligibility === "stretch"`: produced items / supported recombination candidates
    (if safely identifiable from the contract; otherwise produced-only for the MVP).
  - **Challenge** — `practiceEligibility === "challenge"`: **weak items only** (`isWeak === true`).
- **Precision-only items must NOT jump to Challenge** — guaranteed structurally because precision never
  sets `isWeak`; the selector must not add a separate precision→challenge path.
- Ordering within a path may use `dueAt` / `leitnerBox` (deterministic; pass `now` if due-filtering).
- **No remote analytics. No AI-generated exercises. No broad content generator.** The pool selects from
  **existing fixture exercises/items**; it does not synthesize new content.

## 4. Daily Review relationship — DECISION

**Decision: Daily Review is DEFERRED as a full UI in P4; P4 defines the hooks only.**

- P4 **defines** the deterministic queue/eligibility primitive (a pure "what is due / eligible now"
  selector over `MasterySnapshot` + a passed `now`, reusing `dueAt`/`practiceEligibility`).
- P4 does **NOT** build a full Daily Review screen/ritual unless it is trivially small and falls out of
  the Practice Pool selector for free.
- If any Daily Review surface is included, it stays **deterministic + local** and carries **no
  streak/XP/reward/come-back pressure** (streak language is canon-banned, CLAUDE.md UX.1).
- Rationale: Mon Lexique + Practice Pool must be stable first; a full Daily Review ritual before then is
  premature (see §10 risks).

## 5. Data source

- **`MasterySnapshot` is derived from the event log** via `scoreEvents()` over
  `LocalRepository.readAllEvents()` — the same loop P3.7 established.
- **No remote DB. No Supabase. No `RemoteRepository`.**
- **No new event shape** unless absolutely justified and separately approved (prefer none — P4 is read-side).
- **No `writeSnapshot` persistence** unless explicitly scoped + justified in its own PR. Default: keep
  deriving from events on read (cheap, deterministic, avoids a second source of truth / migration debt).
  If snapshot caching becomes a real performance need, it is a separate, reviewed decision.
- Prefer **deriving from `LocalRepository` events** through a small read hook/selector layer.

## 6. UI boundaries (learner-facing only)

P4 surfaces must **hide** (carried from P3 §3):

- raw item ids, exercise/lesson ids
- operation labels (`recognition`/`fill`/`build`/…)
- bucket / ownership jargon (`recognitionOnly`/`blockedProduction`/`activeNew`/`supported`)
- counters (`seenCount`, success/failure, `precisionCount`, `leitnerBox`, raw `dueAt`)
- raw tags (`weakTags`, `precisionTags`, `ErrorTagCode`), validator `FindingCode` language
- debug matrix / JSON / mastery-state labels
- streak / XP / reward language

What the learner sees: calm French surfaces, plain meanings, gentle "known / needs another look /
practice this" framing — **never** a "mastery matrix". **Mon Lexique is not a generic Anki clone**
(no SM-2 grading UI, no raw interval editing); it is a calm, meaning-first collected-words view.

## 7. Implementation PR breakdown

Each PR: one intention, `validate:content` 0/0/0, `typecheck` clean, reviewed before commit, no
auto-commit. Order is a guide; selectors land before their UIs.

| PR | Scope | Likely files | Non-goals | Validation / smoke |
|---|---|---|---|---|
| **P4.1** | This workstream spec / checkpoint (docs) | `docs/workstreams/Sprint13_SW3_…md` | no code | validate/typecheck unchanged |
| **P4.2** | **Mon Lexique derived selector/helper** (pure projection of snapshot → learner-safe entries) | `content/learning-engine/mon-lexique.ts` (pure) | no UI; no persistence | temp self-test; typecheck |
| **P4.3** | **Mon Lexique learner UI shell** (sandbox-gated; reads selector + registry) | `app/learn/…` or `components/learning-engine/MonLexique*` | no Word Graph; no notes | renders added/weak; no leak |
| **P4.4** | **Practice Pool selector/helper** (pure Build/Stretch/Challenge over `practiceEligibility`) | `content/learning-engine/practice-pool.ts` (pure) | no content generation | temp self-test; precision-not-challenge |
| **P4.5** | **Practice Pool learner UI shell** (sandbox-gated path picker) | `components/learning-engine/PracticePool*` | no AI; no remote | renders 3 paths; deterministic |
| **P4.6** | **Practice Pool card reuse** over existing renderer/cards if feasible (replay fixture exercises through the P3 cards) | shell wiring; no new card kinds | no new event shape (reuse P3 record path) | event loop still serialized |
| **P4.7** | **Local smoke / checkpoint docs** | `docs/status/…` | no code | founder smoke (§8 of P3-style checklist) |

(P4.2/P4.4 selectors are pure and `tsx`-testable like `boundary.ts`/`mastery.ts`; keep them RN-free so
self-tests don't load react-native. P4.3/P4.5/P4.6 are the UI/wiring layer.)

## 8. Gates before implementation

P4 implementation (P4.2+) **should not begin** until **all** hold:

1. **P3 smoke** is **completed**, OR **explicitly accepted as pending operator smoke** (P3 checkpoint §7).
2. **This P4 workstream spec is merged** to `main`.
3. **No P4 implementation starts before the selector contracts are defined** (P4.2 / P4.4 type + behavior
   signed off) — UIs (P4.3/P4.5) build on agreed selector outputs, not ad-hoc snapshot reads.
4. **Mon Lexique / Practice Pool must remain derived from `MasterySnapshot`** — no parallel store.
5. **No remote / AI / admin scope** enters P4.

(Physical/on-device smoke remains operator-only; cloud may prepare checklists, not run device smoke.)

## 9. Codex audit checklist (after each P4 PR)

- [ ] No Supabase / network / AI in the P4 surface.
- [ ] No `RemoteRepository` / schema changes.
- [ ] No public-nav exposure; no live-v7 migration; dev player untouched.
- [ ] No event shape changes (unless an explicitly scoped, separately-approved PR).
- [ ] No raw item id / tag / counter / JSON leak to learner UI.
- [ ] Cards still do not import the repository / mastery directly (unless a deliberately reviewed exception);
      UIs read through the selector/hook layer.
- [ ] **Selectors are pure / deterministic** (no `Date.now` inside; `now` passed when due-filtering).
- [ ] **Mon Lexique is itemId-driven** (a view over registry + snapshot; no separate vocabulary store).
- [ ] **Practice Pool Challenge uses weak items (`isWeak`), not precision-only items.**
- [ ] Precision-only items appear at most in **Build**, never Challenge; `precisionTags` never rendered.
- [ ] No streak / XP / reward language.
- [ ] `validate:content` 0/0/0; `typecheck` clean.

## 10. Known risks

- **Mon Lexique becoming a generic flashcard / Anki clone** — keep it a calm meaning-first *view*, not an
  SRS-grading UI. (CLAUDE.md "Do NOT add a separate vocabulary flashcard section".)
- **Practice Pool becoming an exercise generator too early** — MVP selects from existing fixtures; no
  synthesis, no AI.
- **Leaking debug mastery data to the learner UI** — counters/tags/ids/JSON must stay internal (§6).
- **Using `precisionTags` as harsh weakness too early** — precision is a soft signal; do not route it to
  Challenge or "weak" in any selector. Staged strictness stays a later, separate change.
- **Overbuilding Daily Review before Mon Lexique / Practice Pool are stable** — hooks only in P4 (§4).
- **Starting remote / admin / Supabase sync prematurely** — out of P4; first hard remote work is P6+.

## 11. Non-goals (this workstream)

- No remote sync, Supabase, `RemoteRepository`, schema, or DB migration.
- No AI grading / generation / Natural Reveal / open chat.
- No Word Graph; no advanced Mon Lexique notebook/notes.
- No full Daily Review ritual UI; no streak/XP/reward.
- No public-nav exposure (sandbox/founder entry only); no live-v7 migration; dev player untouched.
- No content expansion / new fixtures; no validator/type/schema change.
- No paywall / admin dashboard / public-beta scope.

## 12. Decision gate before P5

P5 (prompt-fade tuning / staged strictness, or whatever the next sprint scopes) may begin only when:

1. Mon Lexique MVP renders from `monLexiqueStatus` (added/weak) with no leak.
2. Practice Pool MVP selects Build/Stretch/Challenge deterministically from `practiceEligibility`.
3. Precision-only items are confirmed never routed to Challenge.
4. P4 selectors are pure + covered by self-tests.
5. Founder smoke (§7 P4.7) PASS, or explicitly accepted pending operator smoke.
6. No remote/AI/admin scope leaked in.

## Open blockers (Operator-only)

- None for P4 itself (pure local projection; no EAS/Supabase/APK step). Physical-device smoke is
  operator-only when it applies. The first hard build/deploy operator blockers appear at P6+ (Supabase).

## Sync Queue entries created

- None yet. A `docs/CLOUD_SYNC_QUEUE.md` row marking the P4 workstream LOCKED would be added only after
  review, if requested — not by this spec.
