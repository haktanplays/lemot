---
title: "L11 Pouvoir"
aliases: [L11, Pouvoir, Help, Permission, Lesson 11, v1-lesson-011]
type: lesson-spec
domain: syllabus
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
lesson_id: v1-lesson-011
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/syllabus/ (L11 lesson-spec)", "docs/audits/L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md"]
code_refs: ["lemot-app/content/lessons/v1/lesson-011.ts"]
test_refs: ["lemot-app/scripts/tests/v1LessonStructure.test.ts"]
related: ["[[Syllabus Overview]]", "[[00 Le Mot Holy Codex]]", "[[Grammar Progression]]", "[[L12 Est-ce Que]]"]
tags: [syllabus, lesson, pouvoir, split-sense]
---

# L11 — Pouvoir / Help & Permission

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

> [!canon] Runtime status: **authored & registered but Home-GATED** (`v1-lesson-011`). Full **PILOT** spec; cross-doc patches **applied `a198310`** (`L11:478-482`).

## Lesson Identity
Split-sense archetype: pouvoir = **help/permission only**. broad pouvoir/conditionnel/paradigm deferred. Band map "L11 Pouvoir-light".

## Learner Job
"ask for help (`Vous pouvez m'aider?`), ask if I can (`Je peux…?`), say I can't (`Je ne peux pas…`)" (`L11:48`).

## Prerequisites
L6 `aide`/`comprendre`; L3 `ne…pas` (composition); owned engines.

## Spine Chips
`je peux` engine (split-sense); `vous pouvez` help.

## Active Chips
A 8 (`L11:127-129`).

## Supported Chips
S 9 (`L11:127-129`).

## Recognition Chips
R 12 (`L11:127-129`). `frame:est-ce-que-je-peux-plus-infinitive` **recognition L11 → active L12** (status-by-lesson, `convention:107-114`).

## Ghost / Exposure Chips
broad pouvoir, conditionnel (`je pourrais`), paradigma → deferred.

## Carryover Candidates
`m'aider` = **object-pronoun seed (R8)** — gelecek doorway (`t'aider`/`l'aider`); `m'` frozen kalır (`Il faut m'aider` L15'te doğru şekilde kaçınıldı). `je peux` → L12 est-ce que wrapper.

## Pattern Chips
`Je peux + inf. ?` · `Vous pouvez + inf. ?` · `Je ne peux pas + inf.`

## Model Sentences
> [!example]
> «Vous pouvez m'aider ?» — **full question asla chunk değil**; splits `vous pouvez` + `m'aider` (`audit:151`). «Je ne peux pas.» — PR #168 composed negative; lint forbidden-list pins it (`audit:150`). «Je peux faire une pause ?» — intonation comparison copy only (`audit:152`).

## Exercise Sequence
10 canon section spine. → [[Fill]], [[Say It Your Way]].

## Evidence and Mastery
model-answer-only zone; deterministik. → [[Mastery Model]].

## Error Hooks
> [!warning] **Negative-composition debt (R7):** `je ne peux pas` composed (`ne ___ pas` frame). **`Vous pouvez m'aider ?` chunk yapılırsa** = ihlal (guard). → [[Error Tracking System]].

## Mon Lexique Behavior
`je peux`/`vous pouvez` added; `m'aider` seed (frozen).

## Review Hooks
L12 est-ce que wrapper (`je peux` → wrapped); L13 can-do integration; L15 obligation kontrastı.

## Runtime Status
**REG** — görünmez.

## Spec-to-Runtime Status
Uyumlu; patches applied `a198310`. Audit temiz (`Je ne peux pas.`, `Vous pouvez m'aider ?` not-a-chip listesinde, `audit:150-151`).

## Tests
`v1LessonStructure.test.ts`; lint forbidden-list `Je ne peux pas.`

## Device Verification
UNVERIFIED — görünmez.

## Deferred Material
broad pouvoir, conditionnel, paradigma → paid-zone. → [[Grammar Progression]].

## Rejected Material
Full pouvoir sistemi; `vous pouvez m'aider?`'i chunk yapmak (`audit:151`).

## Open Decisions
> [!open-loop] R8 `m'aider` doorway (object-pronoun family growth, R9 closed set guard). → [[05 Open Loops]].

## History
Full PILOT spec; patches applied `a198310`.
