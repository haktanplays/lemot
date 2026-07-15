---
title: "L3 Non"
aliases: [L3, Non, Negation, Tu Vous, Lesson 3, v1-lesson-003]
type: lesson-spec
domain: syllabus
status: active
canon_status: canonical
implementation_status: implemented
verification_status: device-verified
lesson_id: v1-lesson-003
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/syllabus/ (L03 lesson-spec)", "docs/architecture/l0-l24-founder-build-matrix-v0.md"]
code_refs: ["lemot-app/content/lessons/v1/lesson-003.ts"]
test_refs: ["lemot-app/scripts/tests/v1LessonStructure.test.ts"]
related: ["[[Syllabus Overview]]", "[[00 Le Mot Holy Codex]]", "[[Grammar Progression]]", "[[Vocabulary Progression]]"]
tags: [syllabus, lesson, negation]
---

# L3 — Yes, No & You (Negation / Tu-Vous)

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

> [!canon] Runtime status: **authored & registered & learner-VISIBLE** (`v1-lesson-003`). Full **PILOT** spec; primary archetype #3 + light #2 flavor (`L03:8,33`).

## Lesson Identity
Negation/Question/Social-Choice archetype (#3). M1 Foundation. Retrospektif not: L2–L3 bir **zorluk sıçraması** — iki ~42-item ders, L3 üç beceri paketler (`L01-L05…retrospective.md:22,67`).

## Learner Job
"say no, say what I'm not, ask a yes/no question, choose tu/vous, refuse politely" (`L03:37`).

## Prerequisites
L2 `je suis` owned (negation bunun üstüne biner). L1 kibar kalıplar.

## Spine Chips
`ne…pas` frame (owned fiiller üstünde üretken).

## Active Chips
A 10 (`L03:100-102`). `ne ___ pas` productive; `je ne suis pas` (protected chunk).

## Supported Chips
S 10 (`L03:100-102`). tu/vous sosyal seçim; yes/no intonation.

## Recognition Chips
R 11 (`L03:100-102`).

## Ghost / Exposure Chips
`chunk-oui` status=active ama post-L3 passive/trap canon ile gerilimde — **R2 demotion candidate** (`audit:293`). **[PROPOSED]**

## Carryover Candidates
`ne…pas` → L4 (`je n'ai pas faim`), L7/L11 negatif kompozisyon (`je ne peux pas`).

## Pattern Chips
`ne [verb] pas` skeleton; tu/vous register frame.

## Model Sentences
> [!example]
> «Je ne suis pas …» (protected chunk) · yes/no intonation soru. Full-sentence chip yok (`audit:41`).

## Exercise Sequence
10 canon section spine. Yes/no by intonation; tu/vous social choice. → [[Multiple Choice]], [[Fill]].

## Evidence and Mastery
model-answer-only zone; deterministik feedback. → [[Mastery Model]].

## Error Hooks
Double-negation bug guard; tu/vous yanlış register; `oui` overuse. → [[Error Tracking System]].

## Mon Lexique Behavior
`ne…pas` frame added; `oui` review-sensitive (R2). → [[Mon Lexique]].

## Review Hooks
L4/L7/L11'de negatif kompozisyon; L13 can-do "say what I can't do".

## Runtime Status
VIS. Round 1 L0–L6 FROZEN.

## Spec-to-Runtime Status
Uyumlu. `PROTECTED_CHUNKS` `je ne suis pas` enforced (`v1LessonStructure.test.ts:55`).

## Tests
`v1LessonStructure.test.ts` protected-chunk + structure gate.

## Device Verification
Emulator smoke #136 (8cefe81), P0–P3 zero.

## Deferred Material
Full question formation (est-ce que/inversion) — DEFERRED to L12+/paid-zone.

## Rejected Material
Negation'ı conjugation-table olarak öğretmek.

## Open Decisions
> [!open-loop] R2: `chunk-oui` active → recognition/passive demote; **oui paradox** (yes/no sorabiliyor, "evet" cevaplayamıyor, `audit:471`). → [[05 Open Loops]].

## History
Full PILOT spec. Retrospektifte difficulty-spike flag'i.
