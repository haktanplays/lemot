---
title: "L15 Devoir Falloir"
aliases: [L15, Devoir, Falloir, Il faut, Obligation, Lesson 15, v1-lesson-015]
type: lesson-spec
domain: syllabus
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
lesson_id: v1-lesson-015
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/syllabus/L15-*.compact-spec.md", "docs/syllabus/L15-*.gate-review.md"]
code_refs: ["lemot-app/content/lessons/v1/lesson-015.ts"]
test_refs: ["lemot-app/scripts/tests/v1LessonStructure.test.ts"]
related: ["[[Syllabus Overview]]", "[[00 Le Mot Holy Codex]]", "[[Grammar Progression]]", "[[L16 Integration and Small Moment]]"]
tags: [syllabus, lesson, devoir, falloir, split-sense]
---

# L15 — Devoir / Falloir-light / Obligation

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

> [!canon] Runtime status: **authored & registered but Home-GATED** (`v1-lesson-015`, son authored dosya). **compact-spec** (accepted, Step 21A Option B); applied `b04ab00`; gate 7 resolved (`L15-compact:237`). + **gate-review**.

## Lesson Identity
Split-sense obligation: **asimetrik** — `il faut + inf.` primary (invariable), `je dois + inf.` supported (tek form). `il faut que`+subjonctif deferred.

## Learner Job
"say what one must do (`Il faut…`) and what I have to do (`Je dois…`); feel can vs must" (`L15-compact:24`).

## Prerequisites
L11 pouvoir (can vs must kontrastı), L9 `faire une pause`, owned inf. havuzu.

## Spine Chips
`chunk:il-faut` (lexeme `word:falloir` yüzeyi); `je dois`.

## Active Chips
A 6 (`L15-compact:69-71`). `il faut + inf.` primary.

## Supported Chips
S 8 (`L15-compact:69-71`). `je dois + inf.` (tek form).

## Recognition Chips
R 10 (`L15-compact:69-71`).

## Ghost / Exposure Chips
`Il faut que`+subjonctif = trap-only leak guard (`audit:157`). devoir'in owe-sense'i (`word:devoir-owe`) açılmadı (homograph reserve, `convention:32`).

## Carryover Candidates
`il faut`/`je dois` → L16/L19 recycle; modal + inf. family.

## Pattern Chips
`Il faut + inf.` (invariable) · `Je dois + inf.`

## Model Sentences
> [!example]
> «Il faut faire une pause.» «Je dois aller à la maison.» — model/expected sentences over owned pieces (`audit:155`). **`Il faut m'aider` L15'te doğru şekilde kaçınıldı** — `m'` frozen kalır (R8).

## Exercise Sequence
10 canon section spine (split-sense). → [[Fill]], [[Build]].

## Evidence and Mastery
model-answer-only zone; deterministik. → [[Mastery Model]].

## Error Hooks
> [!warning] **R9:** infinitive-support family büyümesi (`verb-aider`+`verb-aller`) — kapalı, per-lesson-approved modal-inf. set; bulk-add yok. → [[Error Tracking System]].

## Mon Lexique Behavior
`il faut`/`je dois` added; `il faut que`/owe-sense hidden.

## Review Hooks
L16 integration; L19 repair; obligation sahneleri.

## Runtime Status
**REG** — görünmez. Son authored runtime dosyası (`lesson-015`).

## Spec-to-Runtime Status
Uyumlu; applied `b04ab00`, gate 7 resolved. Audit temiz.

## Tests
`v1LessonStructure.test.ts` (16-lesson/80-chip audit tabanı).

## Device Verification
UNVERIFIED — görünmez.

## Deferred Material
`il faut que`+subjonctif; devoir owe-sense; full devoir paradigması → paid-zone. → [[Grammar Progression]].

## Rejected Material
`il faut` variable form; `Il faut m'aider` (object-pronoun leak).

## Open Decisions
R9 modal-inf. set genişletme kararı. → [[05 Open Loops]].

## History
gate-review → compact-spec (Step 21A Option B); applied `b04ab00`; gate 7 resolved.
