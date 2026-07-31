---
title: Cairn L1-L10 Vertical Slice Charter v0.1
status: Draft — founder working agreement
canon_status: non-canonical
implementation_status: not-started
owner: founder + product/engineering review
created: 2026-07-31
last_updated: 2026-07-31
scope: L1-L10 final-system vertical slice
base_commit: f56e82e4d5d24a4ab055d04ab60fffe017535e04
related:
  - docs/bibles/curriculum/CURRICULUM_CHARTER_v1.0.md
  - docs/bibles/mastery-evidence/MASTERY_EVIDENCE_BIBLE_v1.0.md
  - docs/bibles/content/CONTENT_BIBLE_v1.0.md
  - docs/canon/LESSON_FLOW_CANON_v1.md
  - docs/EXERCISE_CANON_v0.4.md
  - docs/CONTENT_FACTORY_CONTRACT.md
  - docs/PAYLOAD_ECONOMY_v0.md
  - docs/syllabus/chip-taxonomy-and-lexique-lifecycle-v0.3.md
---

# Cairn L1-L10 Vertical Slice Charter v0.1

> [!warning]
> This document is a **workstream contract**, not new Canonical authority. It does not silently revise the Curriculum Charter, Content Bible, Mastery & Evidence Bible, Lesson Flow Canon, Exercise Canon, or Content Factory Contract. Conflicts must be surfaced and resolved through the owning authority before implementation.

## 1. Product thesis

The target is not a temporary ten-lesson mock-up and not a reduced legacy APK.

The target is:

> **The final Cairn learning system, fully connected and genuinely functional, limited to its first ten lessons.**

The slice must demonstrate that language introduced in lessons continues to live across Practice Hub, Flashcards, Mon Lexique, Progress/Stats, review, error repair, audio, and content production.

The slice is valuable only if the product loop is real:

```text
Lesson interaction
  → learning event
  → mastery / learner state
  → Practice selection and repair
  → Flashcard projection
  → Mon Lexique projection
  → Progress / Stats projection
  → later lesson carryover
```

No surface may be connected with fake hard-coded progress solely for presentation.

## 2. Founder intent

The founder will lead:

- UI/UX direction and interaction feel,
- lesson pacing and screen rhythm,
- V4-B visual revision,
- component hierarchy and visual review,
- final recorded-audio quality pass,
- presentation and tester observation.

Product/engineering review will lead or adversarially inspect:

- code flow and architecture,
- backend and storage boundaries,
- privacy and data safety,
- learning-event and mastery semantics,
- item/sentence identity and accumulation,
- Practice Hub selection and derivation,
- Mon Lexique projections and graph relationships,
- Flashcard projections,
- Progress/Stats truthfulness,
- Content Factory generation and validation,
- offline/sync behavior,
- migration and failure recovery,
- tests, invariants, and cross-surface wiring.

## 3. Scope boundary

### 3.1 In scope

- Ten complete learner-facing lessons: **L1-L10** under the currently ratified curriculum authority and any explicitly approved redesign decisions.
- The final-system lesson flow, not a disposable interim flow.
- Sentence ecosystems and A/R/G treatment for L1-L10.
- Exercise variations selected from the normalized Exercise Variation Inventory.
- Learning interstitials, including at minimum:
  - Faux Ami,
  - Cognate Bridge,
  - Sound Pattern,
  - Culture / social-use insight where justified,
  - Register / politeness contrast,
  - Why This Works,
  - Notice the Pieces,
  - Tiny Throwback,
  - Take Another Look,
  - progressive piece anatomy.
- Click/tap detail surfaces and pop-ups.
- Practice Hub.
- Flashcards derived from canonical learning entities.
- Mon Lexique.
- Progress / Stats.
- Daily/review resurfacing required by the final loop.
- Learning events, error interpretation, mastery projection, and selector wiring.
- Content Factory support for approved sentence and exercise generation.
- Audio identity, manifest, fallback, caching, deduplication, and QA contracts.
- Final V4-B-derived UI design and implementation before APK build.
- Real device smoke, performance audit, and build-size audit.

### 3.2 Explicitly out of scope for this slice

Unless separately approved because the slice cannot function without it:

- L11+ learner content,
- full public launch operations,
- full payment/paywall production,
- unrestricted AI chat,
- social/community system,
- complete post-beta Word Graph,
- unrestricted AI-generated learner grading,
- every possible exercise variation at full depth,
- a full dictionary covering language outside L1-L10,
- production-scale content delivery for the complete curriculum.

### 3.3 No legacy extension rule

Legacy Practice, Flashcards, Stats, or `lm7`-bound systems may be mined for lessons or UX insight, but must not become the foundation of the new slice merely because code already exists.

The long-term learning-engine identity/event/mastery path remains the target foundation.

## 4. Definition of done

The slice is not done merely because ten lessons can be opened.

It is done only when all of the following are true.

### 4.1 Lessons

- L1-L10 are authored, reviewed, and playable end to end.
- Every lesson has a communicative promise.
- Every tracked piece resolves to a canonical identity.
- Every lesson declares active, recognition/familiar, and controlled ghost treatment where applicable.
- Every lesson has a sentence ecosystem and carryover plan.
- Exercises generate the evidence they claim to generate.
- Interstitials do not silently create mastery evidence.
- Reveals and explanations never require unseen language for correctness.

### 4.2 Connected learner memory

- Lesson and Practice interactions write to the same event spine.
- Mastery/learner state is derived from events rather than duplicated UI state.
- Mon Lexique, Flashcards, Practice selectors, and Stats read compatible projections of the same learner state.
- A successful interaction can visibly affect a later surface.
- A confirmed weak point can return through bounded review/repair.
- A ghost-only exposure does not masquerade as learner ownership.

### 4.3 Practice Hub

- Practice is built from canonical items/sentences and learner state.
- Sentence selection respects known coverage and controlled ghost limits.
- Typed Weave supports the intended mixed-language bridge without punitive false grading.
- Post-response chips are tappable and resolve to real entity details.
- At least the selected must-have exercise variations are usable.
- Diagnostic or repair behavior activates only from valid evidence.

### 4.4 Flashcards

- Flashcards are projections, not a separate vocabulary truth source.
- Card direction is eligibility-aware.
- A recognition-stage item is not automatically demanded in open production.
- Audio, example, lesson source, and canonical identity remain shared.
- Flashcard outcomes can contribute only the evidence allowed by their contract.

### 4.5 Mon Lexique

- Mon Lexique remains learner-facing memory, not a second canonical database.
- Entries are derived from canonical identity + learner state.
- Learner-facing status copy is calm and non-technical.
- Entry detail includes meaning, examples, where met, related pieces, audio, and appropriate learner state.
- The slice includes a bounded prototype of:
  - **word / lemma → containing canonical pieces**, and
  - piece → related examples / lessons.
- Word/chip decomposition is French-aware; whitespace tokenization is forbidden as the linguistic model.

### 4.6 Progress / Stats

- Stats reflect actual event/mastery projections.
- No legacy 24-lesson or disconnected milestone data is presented as current truth.
- No XP/level/streak pressure framing.
- Metrics explain what they measure and what they do not measure.
- A learner can drill from a high-level metric into relevant lessons/items without exposing internal codes.

### 4.7 Content Factory

- AI may propose sentences, distractors, examples, and first-pass annotations.
- Deterministic contracts and validators remain the gate.
- AI cannot self-authorize curriculum promotion, French QA PASS, evidence semantics, or learner-critical grading.
- Approved sentences have stable IDs and span/entity links.
- Exercise derivation is eligibility-aware rather than “every sentence × every mechanic.”
- Duplicate and near-duplicate accumulation is controlled.
- Generated content remains traceable to source sentence, items, lesson, authoring method, and QA state.

### 4.8 Audio

- Canonical human-recorded audio is supported for approved core content.
- Dynamic/unrecorded content may use TTS fallback.
- Audio identity is shared across Lesson, Practice, Flashcards, Mon Lexique, and reveal surfaces.
- No duplicate recording per surface.
- Master WAV/source files are not bundled in the app and are not committed to the repository.
- Delivery assets are compressed, mono where appropriate, silence-trimmed, normalized, and quality-checked.
- Normal and slow playback should prefer one source recording plus playback-rate control; separate slow recordings are exceptional.
- Missing, duplicate, orphaned, oversized, transcript-mismatched, and unapproved audio assets are reported automatically.

### 4.9 UI/UX

- Interaction and data contracts are defined before final styling.
- Functional UI exists before the final design pass.
- Final APK uses a revised **V4-B v2** visual system, not an unmodified historical mock-up.
- The final design pass includes all new surfaces introduced by this slice.
- Keyboard, small-screen, long-text, accessibility, offline, loading, empty, and error states are tested.

### 4.10 Build and device quality

- Android device smoke passes.
- No critical navigation dead ends.
- No destructive data loss on ordinary retry/reload/offline transitions.
- Bundle size is audited.
- Performance is acceptable on the target test device class.
- Audio starts reliably without obvious repeated-download or duplicate-cache defects.

## 5. Required product surfaces

The first-ten-lesson demo must include, at minimum:

1. Home / learning path
2. L1-L10 lesson player
3. Practice Hub
4. Flashcards
5. Mon Lexique list
6. Mon Lexique entry detail
7. Word/lemma → containing pieces prototype
8. Progress / Stats overview
9. Progress drill-down
10. Review / resurfacing entry point
11. Shared entity detail pop-ups/sheets
12. Offline/sync/error states
13. Internal founder/debug inspector

## 6. Pop-up and detail-surface contract

The product may expose many tap outcomes, but implementation should reuse a small number of stable primitives.

### 6.1 Reusable primitives

- Quick Peek Popover
- Entity Detail Bottom Sheet
- Insight Detail Sheet
- Full Entity Detail Screen
- Confirmation Dialog
- Toast / Banner
- Internal Inspector Sheet

### 6.2 Required tap destinations

At minimum, taps must be specified for:

- piece/chip,
- expandable parent piece,
- lexical word/lemma,
- sentence example,
- Faux Ami,
- Cognate Bridge,
- Sound Pattern,
- Grammar / Why This Works,
- Culture / social-use note,
- Natural Reveal alternative,
- selected trap explanation,
- hint ladder,
- Practice return reason,
- Flashcard detail,
- Mon Lexique status,
- containing pieces,
- where met,
- related pieces,
- Stats metric explanation,
- lesson/item drill-down,
- audio controls,
- report-content/audio issue,
- sync/offline state.

### 6.3 Evidence rule

Opening a pop-up, sheet, example, or audio player may create an engagement/exposure event, but does not by itself create mastery, ownership, or production evidence.

## 7. Exercise and interstitial inventory rule

Before broad content derivation, the project must create a normalized inventory containing:

- stable variation ID,
- learner-facing name,
- aliases / historical names,
- interaction class,
- learning purpose,
- renderer/surface,
- required input entities,
- evidence produced,
- error eligibility,
- A/R/G compatibility,
- sentence eligibility,
- runtime status,
- slice priority,
- accessibility/audio requirements,
- known failure modes.

Expected result: approximately 35–40 genuine exercise variations plus a separate interstitial/detail inventory. The final number is evidence-driven, not quota-driven.

## 8. Content depth strategy

The slice should be broad enough to demonstrate the whole product and deep enough at selected checkpoints to expose real strengths and defects.

Recommended showcase depth:

- **L1:** deep sentence ecosystem and first-use confidence
- **L5:** deep contrast/package or mid-slice structural checkpoint
- **L10:** cumulative integration payoff

Other lessons must still be complete and real, but do not require every variation at maximum density.

No rule requires every lesson to have sixty sentence seeds or every sentence to instantiate every exercise mechanic.

## 9. Data and architecture invariants

- Stable canonical IDs are required across all surfaces.
- Lessons, Practice, Flashcards, Mon Lexique, Stats, and audio must not silently fork identity.
- Event log is append-oriented; derived projections are rebuildable.
- UI projection state is not the evidence source of truth.
- Raw free text is not uploaded or persisted without an explicit necessity, privacy decision, and retention rule.
- Content, learner evidence, and operational telemetry remain distinguishable.
- Sync conflicts must fail safely and preserve recoverability.
- Schema changes require migrations and compatibility review.
- User deletion/export behavior must cover all persisted learner data in scope.
- Internal IDs, error codes, and raw weakness details do not leak into learner UI.

## 10. Audio size budget

The product must not become a 300–400 MB ten-lesson app because master recordings or duplicate assets were bundled.

### 10.1 Working budget

- Target first feedback build: **approximately 70–120 MB installed/download class**, subject to measured build output.
- Review threshold: **over 150 MB** requires explicit asset and bundle audit.
- 300–400 MB is unacceptable for the slice absent a separately approved exceptional reason.

These are project budgets, not platform-limit claims.

### 10.2 Controls

- no WAV masters in the bundle,
- no duplicate audio by screen,
- no default separate slow recording,
- canonical `entityId → audioId` mapping,
- compressed delivery format,
- automatic total-size report,
- duplicate-hash detection,
- orphan detection,
- lesson-pack-ready architecture even if L1-L10 audio is bundled for the feedback APK.

## 11. UI design timing

### Phase 1 — interaction contracts

Define navigation, surface responsibilities, tap behavior, data requirements, loading/empty/error/offline states, and component boundaries.

### Phase 2 — functional implementation UI

Build complete usable flows using real state and real data without requiring final visual polish.

### Phase 3 — V4-B v2 product-design pass

Immediately before final APK hardening:

- audit the historical V4-B direction,
- retain its valid visual DNA,
- replace stale/broken assumptions,
- add all new lesson/practice/lexique/stats/audio surfaces,
- finalize tokens/components/layouts,
- implement the visual system,
- run device visual QA.

The final pass is not superficial reskinning. It is the final design of the actual connected system.

## 12. Workstream sequence

0. Vertical Slice Charter
1. Exercise Variation Inventory
2. Interstitial + Popup/Detail Surface Inventory
3. UX/component contracts
4. Audio identity/manifest/size contract
5. L1-L10 acquisition and sentence ecosystems
6. Sentence × Exercise × Evidence matrix
7. Canonical item/sentence/lexical relationship model
8. Event/mastery/storage spine
9. Content Factory generation + validation path
10. Lesson runtime implementation
11. Practice Hub
12. Flashcards
13. Mon Lexique + containing-pieces prototype
14. Progress / Stats
15. Integration, sync, privacy, migration, and failure-mode tests
16. Functional device QA
17. V4-B v2 final UI design and implementation
18. Human-recorded audio export and quality pass
19. Build-size/performance audit
20. Final Android smoke and feedback APK

Sequence may be split into smaller PRs, but dependencies must not be bypassed merely to make a surface appear complete.

## 13. Testing obligations

The slice must include tests or explicit manual gates for:

- item/sentence/audio identity resolution,
- exercise eligibility,
- A/R/G enforcement,
- evidence admission and invalidation,
- ghost non-penalization,
- mixed-language Weave interpretation,
- selector determinism,
- duplicate content accumulation,
- Mon Lexique visibility,
- containing-piece indexing,
- flashcard direction eligibility,
- Stats projection correctness,
- offline event persistence,
- sync retry/idempotency,
- deletion/export coverage,
- migration safety,
- audio existence/hash/transcript/size checks,
- popup deep-link/back behavior,
- small-screen and keyboard behavior,
- performance and memory pressure.

## 14. Feedback objective

The feedback APK should answer:

1. Does the first-ten-lesson journey feel like one coherent product?
2. Does the learner understand and enjoy Weave’s mixed-language bridge?
3. Do interstitials add insight without breaking rhythm?
4. Do tappable pieces and pop-ups deepen understanding without causing clutter?
5. Does Practice feel generated from what the learner actually knows?
6. Does Mon Lexique feel like useful personal language memory rather than a generic dictionary?
7. Is the word → containing pieces view valuable or cognitively noisy?
8. Do Flashcards support memory without duplicating the lesson mechanically?
9. Do Stats communicate genuine progress without pressure or fake precision?
10. Does the system feel trustworthy when offline, retrying, or correcting mistakes?
11. Does recorded audio materially improve perceived quality enough to justify its delivery cost?
12. Where does the learner become bored, confused, stuck, or want to stop?

## 15. Stop conditions

Stop and resolve before scaling when any of the following is true:

- surfaces are reading different identity or mastery sources,
- Stats displays claims not supported by events,
- Mon Lexique requires a second truth database,
- Content Factory output cannot be traced or validated,
- mixed-language attempts are punished contrary to the Weave contract,
- ghost language becomes required for correctness,
- AI becomes the hidden final judge,
- duplicate content/audio grows without control,
- UI design requires breaking core data contracts,
- build size exceeds budget without a clear asset explanation,
- ten lessons are being expanded into near-full-curriculum production before feedback value is reached.

## 16. Immediate next deliverables

1. `EXERCISE_VARIATION_INVENTORY_v0.1.md`
2. `INTERSTITIAL_AND_DETAIL_SURFACE_INVENTORY_v0.1.md`
3. `AUDIO_ASSET_CONTRACT_v0.1.md`
4. L1 sentence ecosystem review and freeze candidate
5. L1 Sentence × Exercise × Evidence pilot matrix

These remain Draft workstream artifacts until reviewed and explicitly promoted or routed into their owning Canonical authorities.
