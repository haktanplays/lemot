# Content Factory Contract — Faz 6A (v0.1, 2026-07-02)

> Operator-approved contract for producing the remaining Cairn lessons.
> Companion to spec §66 (Faz 5 decisions) and `docs/CAIRN_ROADMAP_202607.md`
> Faz 6. Precedence: `CLAUDE.md → STATUS.md → DEV_APK_MVP_CANON.md → Cairn
> v1.0 spec (§65/§66) → this contract`. This document also records the
> Telemetry v0 and event-compaction contracts (Faz 6A support work).

---

## 1. Content Factory Contract

### 1.1 Batch policy

```text
- Batch unit = a Unit slice, NEVER the whole syllabus.
- Default batch size: 3 lessons (pilot); up to ~6 once the loop is proven.
- One batch = one content-only PR = one Haktan pedagogical review.
- DO NOT generate the remaining ~174 lessons in one shot — ever.
```

### 1.2 Authoring loop (per batch)

```text
1. Agent reads: shipped v1 lessons + itemRegistry + lessonTypes +
   docs/syllabus specs for the batch + chip taxonomy + spec §65/§66.
2. Agent drafts VALIDATOR-FIRST: a draft that does not pass the full chain
   (typecheck / validate:content / validate:pools / test:learning-engine)
   never reaches review.
3. Agent opens a content-only PR with the per-lesson review sheet (§3).
4. Haktan pedagogical review → concerns fixed on the same branch (amend).
5. Merge → CI → next batch. Batches are sequential, never parallel.
```

### 1.3 Required agent inputs

```text
- The shipped lesson files of the previous unit (style source of truth).
- content/itemRegistry.ts (existing ids; ID convention = runtime kebab,
  e.g. chunk-je-vais — NOT prefix:slug).
- The accepted docs/syllabus spec for each lesson; where a compact spec
  supersedes a full spec (e.g. L07 compact doorway), the COMPACT spec wins.
- chip-taxonomy-and-lexique-lifecycle canon (piecesUsed rules).
```

### 1.4 Required agent outputs

```text
- lesson-XXX.ts files matching the EXISTING schema (no invented fields).
- itemRegistry additions for every new itemId referenced (structure tests
  enforce registry existence).
- V1_LESSONS registration (runtime-safe: Home caps visible lessons at L6).
- A per-lesson review sheet in the PR body (§3).
- Validation results in the PR body.
```

### 1.5 Content rules (hard, validator- or review-enforced)

```text
- No full-sentence chips in piecesUsed (CI-enforced lint).
- No sentence memorization: whole-first → use → notice → unpack → reuse.
- Recycle cannot steal the lesson: target load stays dominant
  (spec §65.6 budgets: visible carryover ≤ 3, recycled ≤ 2 per sentence,
  exposure ≤ 2 per unit, weak ≤ 1, target share ≥ 0.50).
- Passive/ghost exposure: capped (≤ 2 per Weave/model answer); exposure is
  never required for correctness; ghost items never appear in piecesUsed.
- Active-new chips per lesson: 1–2 for doorway/compact lessons; never more
  than the A0/A1 budget in spec §39.2; no broad grammar jumps.
- Micro-logic: at most 1–2 narrow insight cards per lesson; explanation
  attaches to something just seen; no grammar dumps before contact.
- Weave prompts: directive/intent-based preferred ("Say you are heading
  home"), not bare "translate this"; question-form expected answers carry a
  no-question-mark alternative (CI-enforced); mixed FR/EN attempts are
  legitimate.
- Model answers: natural French; full sentences allowed THERE and only
  there; a model-answer sentence is never automatically a chip.
- `oui` stays recognition/passive unless a lesson explicitly teaches it as
  active production.
- itemIds: stable, kebab-case, no silent renames; ambiguous identities
  (§55.2 debts) are not multiplied — reuse the existing id conservatively.
- TTS strings: complete spoken French, no placeholders (CI-enforced).
```

### 1.6 Gate before review

All four MUST be green before a batch PR is opened:

```text
npm run typecheck
npm run validate:content
npm run validate:pools
npm run test:learning-engine
```

## 2. First content pilot decision (LOCKED)

```text
- First pilot batch = L7–L9 ONLY, not full Unit 2, not 174 lessons.
- Reasons: enough to test the factory loop end-to-end; small enough for a
  real pedagogical review; avoids mass-producing a flawed rhythm.
- L7 follows the ACCEPTED compact doorway spec
  (docs/syllabus/L07-compact-doorway.compact-spec.md) — frozen-chunk
  doorway, exactly two new items — NOT the full aller/movement spec.
- L8/L9 are de-scoped against the SHIPPED registry the same way: their full
  syllabus specs are direction, not prerequisites-as-facts; anything the
  registry does not contain is not assumed.
- The pilot PR is NEVER merged without Haktan pedagogical review.
- Note: the pilot registers lessons in V1_LESSONS but the Home path caps
  visibility at L6, so the pilot is runtime-invisible until a separate,
  smoke-bearing unlock PR raises the cap.
```

## 3. Haktan pedagogical review checklist (per lesson)

Haktan reviews:

```text
- Lesson goal: one clear communicative promise?
- Active chips: right ones, right count, produce-worthy?
- Passive/ghost exposure: natural, optional, capped?
- Carryover load: supports the target without stealing it?
- Weave prompts: real intent, not translation drill?
- Model answers: natural French a native would say?
- Micro-logic cards: narrow, attached to contact, "aha" not lecture?
- Tone: calm premium, no gamified/punitive language?
- Cognitive load: fits the ~10-minute attention budget?
- Does it still feel like Cairn? (chips + memory + meaning, not phrasebook)
```

Haktan does NOT manually review (machine-checked):

```text
- TypeScript shape / compile errors (typecheck)
- validator compliance incl. sentence-chip lint (validate:content + tests)
- pool integrity (validate:pools)
- duplicate/unknown itemIds (v1 structure tests)
- CI mechanics
```

## 4. Telemetry v0 contract (local-only)

Purpose:

```text
Content debugging for the factory loop — where do learners drop, which
items are seen/produced — NOT analytics bloat, NOT engagement tracking.
```

Minimum v0 event types:

```text
lesson_started, screen_seen, item_seen, item_recognized, item_produced,
answer_submitted, answer_compared, weave_attempted, exposure_seen,
micro_logic_seen, sound_note_seen, chunk_unpack_seen, lesson_completed,
lexique_opened, mon_lexique_entry_opened
```

Named FUTURE events (not in v0 unless the repair loop ships first):

```text
repair_triggered, repair_completed
```

Rules (hard):

```text
- LOCAL-ONLY: no network, no Supabase, no remote drain, no sync.
- No personal data. No AI text export.
- NO RAW LEARNER FREE-TEXT is ever stored in telemetry — structured
  result/verdict/tag fields only.
- No learner-facing scoring labels derived from telemetry.
- Event versioning required (schema version field on every event).
- Telemetry events NEVER update mastery (they are observation, not the
  learning event log — the LearningEvent spine stays separate).
```

Status: contract defined here; pure/local implementation is Faz 6A Slice B
(`content/learning-engine/telemetry.ts` + tests).

## 5. Event compaction / snapshot policy (local-only)

```text
- The local event log can grow unbounded; compaction keeps it bounded.
- Snapshots are LOCAL-ONLY (sync-specific compaction is deferred with §66.4).
- A snapshot contains derived, progress-safe state (mastery snapshot /
  lesson progress summary / optional telemetry summary) — never raw UI
  behavior, never raw learner text.
- Threshold: compaction is RECOMMENDED at ~1000 local events (tunable).
- v0 NEVER deletes source events: it marks a compaction point (cursor);
  events remain replayable. Deletion requires a future explicit safe flag.
- Snapshots are versioned; an unknown snapshot version is rejected, never
  silently migrated.
- Invariant (test-locked): snapshot + remaining events replays to exactly
  the same derived mastery as replaying all events.
```

Status: policy defined here; pure implementation is Faz 6A Slice C
(`content/learning-engine/compaction.ts` + tests).

## 6. Out of scope for Faz 6A

```text
Audio assets/recording (§66.1), AI activation (§66.2), paywall (§66.3),
sync/remote schema (§66.4), runtime UI changes (incl. raising the Home L6
cap — separate smoke-bearing unlock PR), Carryover Selector runtime wiring,
Mon Lexique 6-band UI, release engineering, crash reporting.
```


## 7. Payload Economy (v0 pointer)

Item-layer decisions (engine vs payload vs ghost vs pool), the visible-lesson
surface ceiling, the survival-formula closed class, the oui answer-word
decision, payload families, and the L5/L15 breadth metrics are governed by
`docs/PAYLOAD_ECONOMY_v0.md` (locked 2026-07-04). When authoring content,
classify every candidate item into exactly one of the four layers before
adding it anywhere.
