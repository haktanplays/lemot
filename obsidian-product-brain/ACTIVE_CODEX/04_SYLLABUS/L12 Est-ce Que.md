---
title: "L12 Est-ce Que"
aliases: [L12, Est-ce que, Yes-No Wrapper, Lesson 12, v1-lesson-012]
type: lesson-spec
domain: syllabus
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
lesson_id: v1-lesson-012
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/syllabus/L12-*.compact-spec.md", "docs/syllabus/L12-*.gate-review.md"]
code_refs: ["lemot-app/content/lessons/v1/lesson-012.ts"]
test_refs: ["lemot-app/scripts/tests/v1LessonStructure.test.ts"]
related: ["[[Syllabus Overview]]", "[[00 Le Mot Holy Codex]]", "[[L11 Pouvoir]]", "[[L13 Integration]]"]
tags: [syllabus, lesson, questions, wrapper]
---

# L12 — Est-ce que / Yes-No Question Wrapper

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

> [!canon] Runtime status: **authored & registered but Home-GATED** (`v1-lesson-012`). **compact-spec** (gate Step 18A), patches applied `728353d` (`L12-compact:187`). Öncesinde bir **gate-review** var.

## Lesson Identity
Question-expansion-1 (Option C). `est-ce que` wrapper over **owned clauses only**. Soru sözcükleri → sonraki "Question Expansion 2"'ye ertelenir.

## Learner Job
"turn things I can say into a yes/no question with `est-ce que`" (`L12-compact:24`).

## Prerequisites
L11 `je peux`/`vous pouvez` owned; owned clause havuzu.

## Spine Chips
`est-ce que` wrapper.

## Active Chips
A 5 (`L12-compact:66-68`). `frame:est-ce-que-je-peux-plus-infinitive` recognition L11 → **active L12** (`convention:107-114`).

## Supported Chips
S 8 (`L12-compact:66-68`).

## Recognition Chips
R 10 (`L12-compact:66-68`).

## Ghost / Exposure Chips
Soru sözcüklü est-ce que (`Qu'est-ce que` vb.) = trap-only leak guard, bu bantta chip/correct-option almaz (`audit:157,284`).

## Carryover Candidates
wrapped clauses → L13 integration; owned clause + wrapper deseni.

## Pattern Chips
`Est-ce que + [owned clause] ?`

## Model Sentences
> [!example]
> «Est-ce que je peux… / …vous pouvez m'aider / …c'est ici ?» — composed productions (`est-ce que` + owned clause), **chunk değil** (`audit:151`).

## Exercise Sequence
10 canon section spine; wrapper screens = **wrapper only** (R10 policy). → [[Fill]], [[Multiple Choice]].

## Evidence and Mastery
model-answer-only zone; deterministik. → [[Mastery Model]].

## Error Hooks
> [!warning] **R10 policy split (OK-documented):** wrapper screen = wrapper only; intonation `Je peux… ?` yalnız sayit comparison copy'de; #169 sonrası tutarlı (`audit:301`). → [[Error Tracking System]].

## Mon Lexique Behavior
`est-ce que` wrapper added; wrapped clause'lar recycle.

## Review Hooks
L13 fill wrapped-question frame'ini reuse eder (yes/no vs where cevabı, re-teach yok, R11, `audit:302`).

## Runtime Status
**REG** — görünmez.

## Spec-to-Runtime Status
Uyumlu; patches applied `728353d`. compact-spec, gate Step 18A implement eder.

## Tests
`v1LessonStructure.test.ts` (audit temiz).

## Device Verification
UNVERIFIED — görünmez.

## Deferred Material
Soru sözcüklü est-ce que, inversion, full question formation → paid-zone/Question Expansion 2.

## Rejected Material
wrapped question'ı chunk yapmak; wrapper screen'e intonation sızdırmak (`audit:152`).

## Open Decisions
Yok kritik (gate resolved).

## History
gate-review → compact-spec (Step 18A); patches `728353d`.
