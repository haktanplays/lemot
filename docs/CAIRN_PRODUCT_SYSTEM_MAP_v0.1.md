# Cairn — Product System Map v0.1

> **Planning/system-map only.** This indexes Cairn product systems and known
> gaps. It authorizes no implementation, no runtime change, no lesson
> implementation, no Home-visibility change, and does not unblock L7. Current
> shippable scope remains the Round 1 Dev APK (L0-L6), governed by
> `docs/DEV_APK_MVP_CANON.md` and `docs/STATUS.md`; where this map and the Dev
> APK canon differ, the Dev APK canon wins for anything being built now.

> Status: v0.1 index. This is a **map**, not a spec. It links the long-term
> `docs/CAIRN_PRODUCT_DEFINITION_v0.1.md` vision to systems that already exist in
> the repo, names systems that are implied or absent, and records recommended
> homes. It does not claim any Android/device smoke has passed (still pending,
> operator-only).

---

## 1. Purpose and scope

The Product Definition captures the Cairn vision, promise, and boundaries. It is
not a system map. This document is the missing middle layer: a single index that
connects the vision to the engines, modules, matrices, surfaces, and data flows
that build it — pointing at where each already lives in the repo, or marking it
implied, deferred, or absent. It deliberately writes **no new specs**.

## 2. How to read this map

- **Product Definition** (`CAIRN_PRODUCT_DEFINITION_v0.1.md`) = vision, promise,
  learner, boundaries, philosophy.
- **Product System Map** (this doc) = engines, modules, matrices, surfaces, data
  flows — indexed, not specified.
- **Specialized specs** = written later, only when a system is actually being
  built, and only when current canon calls for it.

Status labels used below: **In repo** (spec/code exists) · **Implied**
(vision mentions it, no mechanics) · **Absent** · **Deferred** (parked by the
Dev APK canon) · **Round 1 only** (current runtime surface).

## 3. Current Round 1 boundary

- Round 1 shippable scope is **L0-L6 only**.
- **Android/device smoke is pending** (no device available yet); no smoke pass is
  claimed here.
- **L7 implementation and the Home visibility bump (`<=6 → <=7`) remain
  blocked** — see `docs/syllabus/L07-compact-doorway.compact-spec.md` and
  `docs/STATUS.md`.

Nothing in this map changes the Round 1 boundary.

## 4. Existing systems already in repo (under-indexed by the Product Definition)

These are specified or coded today, mostly in the learning-engine layer
(`lemot-app/content/learning-engine/*`), the founder-self-learning checkpoints
(`docs/status/founder-self-learning-*`), and the syllabus matrices
(`docs/syllabus/*`). The Product Definition references almost none of them; this
is the single highest-value gap to close.

| System | Where it lives (repo) | Status |
|---|---|---|
| Practice Pool | `content/learning-engine/practice-pool.ts`, `practice-reuse.ts`; `docs/status/founder-self-learning-p4-mon-lexique-practice-pool-checkpoint.md` | In repo |
| Mon Lexique | `content/learning-engine/mon-lexique.ts`; p4 checkpoint | In repo |
| Mastery model | `content/learning-engine/mastery.ts`; `docs/status/founder-self-learning-mastery-precision-policy.md` | In repo |
| Item / lesson graph | `content/learning-engine/graph.ts` | In repo |
| Grading / answer-check / accepted-answer policy | `content/learning-engine/grade.ts`, `answer-check.ts`; `components/lesson-v1/screens/normalizeAnswer.ts` | In repo |
| Boundary / known-item policy | `content/learning-engine/boundary.ts`; `docs/status/boundary-recognition-ui-decision.md` | In repo |
| Review scheduling presets | `content/learning-engine/presets.ts`, `session-controller.ts` | In repo |
| Privacy / data rights | `content/learning-engine/privacy*.ts`; `docs/status/founder-self-learning-p5-local-privacy-data-rights-checkpoint.md`, `founder-self-learning-privacy-kvkk-gdpr-architecture-note.md`, `founder-self-learning-remote-schema-rls-draft.md` | In repo |
| AI generation contract / AI boundary | `docs/syllabus/ai-generation-contract-v1.md` | In repo |
| Lesson archetypes | `docs/syllabus/lesson-archetype-templates-v1.md` | In repo |
| Exercise archetypes | `content/lessonTypes.ts` (screen types); v1 lessons | In repo |
| Canonical IDs | `docs/syllabus/canonical-item-id-convention-v0.1.md`; `content/itemRegistry.ts` | In repo (note: two conventions — see Open Questions) |
| Band map (L10-L20) | `docs/syllabus/L10-L20-band-map-v0.md` | In repo |
| L0-L24 build matrix | `docs/architecture/l0-l24-founder-build-matrix-v0.md` | In repo |
| Validation gates | `npm run validate:pools` / `validate:content`; `scripts/tests/v1LessonStructure.test.ts` | In repo |
| Event taxonomy | `content/learning-engine/events.ts` | In repo |
| Feature flags / product stage | `config/productStage.ts` | In repo |
| Home / path progression | `app/(tabs)/index.tsx` (Round 1) | Round 1 only |
| Offline behavior | lesson `offlineBehavior`; Round 1 fallback-only | In repo |
| Beta / release gates | `docs/workstreams/round1-test-plan.md`, `DEV_APK_SMOKE_TEST_CHECKLIST.md`, `docs/status/release-guardrail-audit-plan.md`, `docs/EAS_PREVIEW_BUILD.md` | In repo (partial) |

## 5. Implied but underdefined systems

Mentioned in the vision or runtime, but without a mapped mechanism.

| System | Note | Status |
|---|---|---|
| Daily Review detailed engine | "1.5 layer" promise has no detailed engine spec | Implied |
| Progress model | Progress surface implied; model not mapped | Implied |
| Error intelligence / repair loops | Grading/boundary code exists; repair philosophy not operationalized | Implied / partial |
| B2 path matrix | Band map + build matrix cover L1-L20; B2-scale path absent | Implied |
| Monetization boundary mechanics | ~24-lesson free boundary stated; mechanics undefined | Implied |
| Consolidated AI guardrail matrix | Pieces in `ai-generation-contract-v1.md`; not one artifact (boundary + unseen-grammar + correction depth + fallback + cost/cap + hallucination + eval) | Implied / partial |

## 6. Absent or deferred systems

Not in the repo, or explicitly parked by the Dev APK canon. **Not specified here.**

| System | Status | Note |
|---|---|---|
| Passport / assessment levels | Absent | Core final product; later specialized doc |
| Learner-facing analytics | Implied/Absent | v1 |
| Technical observability / crash / TTS failure / AI failure | Absent | Operational; before wider beta |
| Admin / ops / support tools | Absent | Operational |
| Notifications / habit loop | Absent | Habit promise needs a non-streak mechanism |
| Accessibility standard | Absent | Operational |
| Store / acquisition funnel | Absent | v1/business |
| Multi-language transfer engine | Absent | Post-beta differentiator (expansion thesis) |
| Pronunciation feedback | Absent | Post-beta differentiator |
| Conjugation Hub | Absent | Post-beta reference surface |
| Word Graph UX | Deferred (Dev APK canon) | Data graph exists (`graph.ts`); learner surface deferred |
| Le Carnet / Dream Journal | Deferred (Dev APK canon) | Post-beta |
| Active Reading / micro-reading | Deferred (Dev APK canon) | Post-beta |
| AI Mini Conversation / scoped chat | Deferred / "later" | Post-beta; scope-creep risk toward generic chatbot |
| Local-first to cloud migration | Absent (schema draft only) | Core final; high-risk if late |
| Content authoring pipeline / release QA docs | Partial | Authoring contract exists (`round1-training-content-factory.md`); QA/rollback doc absent |

## 7. Recommended homes

| Home | Systems |
|---|---|
| **System Map index only** (link to existing repo homes) | Practice Pool, Mon Lexique, mastery, item/lesson graph, grading/answer policy, boundary, review presets, privacy/data rights, AI contract, lesson + exercise archetypes, canonical IDs, band map, build matrix, validation gates, event taxonomy, feature flags, Home/path, offline, beta gates |
| **Product Definition open question** | motivation-without-XP mechanism; future AI conversation mode; B2-as-public-claim; free/paid boundary |
| **Specialized doc later** | Daily Review engine, progress model, error/repair, B2 path matrix, consolidated AI guardrail matrix, Passport/assessment, paywall journey, account/cloud migration, observability, admin/ops, store funnel, audio/voice pipeline, design system, accessibility standard, content QA/release-rollback |
| **Post-smoke only** | Everything in "specialized doc later" — sequenced by the post-smoke framework, not started before the device smoke |
| **Current Round 1 excluded** | Le Carnet / Dream Journal, Word Graph UX, Conjugation Hub, Active/micro-reading, AI Mini Conversation, multi-language transfer, pronunciation feedback (all deferred/open) |

## 8. Do-not-build-now list

- **No specialized specs before smoke** unless explicitly approved per request.
- **No L7** implementation (blocked until device smoke passes **and** an explicit
  closeout decision).
- **No Home visibility bump** (`<=6 → <=7` stays a separate reviewed decision).
- **No runtime implementation** from this map.
- **No new feature work** triggered by this map.

## 9. Post-smoke prioritization rule

Follow `docs/workstreams/round1-post-smoke-decision-framework.md`:

- **Strong hook** may justify picking **one** next branch (e.g. compact-L7
  planning or AI bounded-feedback planning) — one small step, not a sprint.
- **Partial hook** fixes **one** common blocker, then re-tests the same slice.
- **Weak hook** investigates framing/Weave **before** any new feature.
- **Buggy sessions cannot judge the hook** — fix and re-test first.

Selecting a system from this map is **not** authorization to build it; each still
follows the normal review-then-commit flow.

## 10. Open questions

- The repo has **two item-ID conventions** — runtime kebab (`chunk-je-vais`) vs
  the syllabus `prefix:slug` (`chunk:je-vais`). Reconcile before any cross-doc
  system spec relies on IDs.
- Which systems are **v1-required** vs **post-beta differentiators** (the §6
  table is a first cut, not locked).
- How multi-dimensional mastery and progress are surfaced **without becoming a
  stats dashboard** (carried from the Product Definition).
- Where the **B2 path matrix** lives and when it is drafted.
- Whether the founder-self-learning engine layer becomes the v1 runtime, and how
  it reconciles with the current v1 lesson runtime (see
  `docs/status/v1-to-learning-engine-migration-notes.md`).

## 11. Next action recommendation

This map is the artifact. **No further system docs should be written before the
operator device smoke**, except where an approved request calls for one. After
smoke, use the post-smoke framework to pick the first specialized doc to draft.
Until then, this index simply keeps the vision and the existing systems from
drifting apart.

---

*End of Cairn Product System Map v0.1. Planning/index only — authorizes no code,
content, flag, or runtime change. Round 1 Dev APK L0-L6 scope and the pending
operator device smoke are unchanged by this document. L7 and the Home visibility
bump remain blocked.*
