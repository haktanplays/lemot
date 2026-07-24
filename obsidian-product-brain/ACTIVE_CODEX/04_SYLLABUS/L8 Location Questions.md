---
title: "L8 Location Questions"
aliases: [L8, Où, Location Questions, Lesson 8, v1-lesson-008]
type: lesson-spec
domain: syllabus
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
lesson_id: v1-lesson-008
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/syllabus/ (L08 lesson-spec)", "docs/syllabus/canonical-item-id-convention-v0.1.md"]
code_refs: ["lemot-app/content/lessons/v1/lesson-008.ts"]
test_refs: ["lemot-app/scripts/tests/v1LessonStructure.test.ts"]
related: ["[[Syllabus Overview]]", "[[00 Le Mot Holy Codex]]", "[[Phenomena Progression]]", "[[Grammar Progression]]"]
tags: [syllabus, lesson, questions, homograph]
---

# L8 — Où / Location & Movement Questions

<!-- gh-toc -->

## İçindekiler

- [Lesson Identity](#lesson-identity)
- [Learner Job](#learner-job)
- [Prerequisites](#prerequisites)
- [Spine Chips](#spine-chips)
- [Active Chips](#active-chips)
- [Supported Chips](#supported-chips)
- [Recognition Chips](#recognition-chips)
- [Ghost / Exposure Chips](#ghost-exposure-chips)
- [Carryover Candidates](#carryover-candidates)
- [Pattern Chips](#pattern-chips)
- [Model Sentences](#model-sentences)
- [Exercise Sequence](#exercise-sequence)
- [Evidence and Mastery](#evidence-and-mastery)
- [Error Hooks](#error-hooks)
- [Mon Lexique Behavior](#mon-lexique-behavior)
- [Review Hooks](#review-hooks)
- [Runtime Status](#runtime-status)
- [Spec-to-Runtime Status](#spec-to-runtime-status)
- [Tests](#tests)
- [Device Verification](#device-verification)
- [Deferred Material](#deferred-material)
- [Rejected Material](#rejected-material)
- [Open Decisions](#open-decisions)
- [History](#history)

> [!canon] Runtime status: **authored & registered but Home-GATED** (`v1-lesson-008`). Full **PILOT** spec; primary #3 as Question/Location Control (`L08:6,41`).

## Lesson Identity
Question/Location-Control ders. **Tek soru sözcüğü `où`**; safe shapes, no est-ce que/inversion.

## Learner Job
"ask/answer 'where?' — `Où est…?`, `C'est où?`, `Tu vas où?` — using known engines, recover politely" (`L08:45`).

## Prerequisites
L7 `je vais`/`tu vas` (movement), owned engines; repair kalıpları.

## Spine Chips
`où` (tek soru sözcüğü), `Où est…?` frame.

## Active Chips
A 7 (`L08:126-128`).

## Supported Chips
S 9 (`L08:126-128`).

## Recognition Chips
R 10 (`L08:126-128`).

## Ghost / Exposure Chips
est-ce que / inversion **yok** (L12'ye deferred). Full question formation deferred.

## Carryover Candidates
`où` → L12 (est-ce que'nun soru-sözcüklü genişlemesi "Question Expansion 2"'ye ertelenir), L13 integration.

## Pattern Chips
`Où est [X]?` · `C'est où?` · `Tu vas où?` — safe shapes.

## Model Sentences
> [!example]
> «Où est le café ?» «C'est où ?» «Tu vas où ?» — full question chip değil; owned engine + `où`.

## Exercise Sequence
10 canon section spine. → [[Multiple Choice]], [[Fill]].

## Evidence and Mastery
model-answer-only zone; deterministik. → [[Mastery Model]].

## Error Hooks
> [!warning] **Homograph IDs** (`convention:32`): `word:ou-where` vs `word:ou-or`; `word:la-there` vs `word:la-article`. Karışma error hook'u. → [[Phenomena Progression]], [[Error Tracking System]].

## Mon Lexique Behavior
`où` (where-sense) added; `la` (there-sense) ayrı ID.

## Review Hooks
L10/L13 integration; L14 "where are you going?" cevabı `y` ile.

## Runtime Status
**REG** — görünmez (Home cap `number <= 6`).

## Spec-to-Runtime Status
Uyumlu (audit'te temiz, homograph guard uygulanmış).

## Tests
`v1LessonStructure.test.ts` (16-lesson audit).

## Device Verification
UNVERIFIED — görünmez.

## Deferred Material
est-ce que wrapper (L12); diğer soru sözcükleri (Question Expansion 2); inversion.

## Rejected Material
Full question formation bu bantta.

## Open Decisions
Homograph runtime metadata-vs-suffix (convention open). → [[05 Open Loops]].

## History
Full PILOT spec.
