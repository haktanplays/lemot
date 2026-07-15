---
title: "L6 Un Petit Moment"
aliases: [L6, Un Petit Moment, Foundation Integration, Lesson 6, v1-lesson-006]
type: lesson-spec
domain: syllabus
status: active
canon_status: canonical
implementation_status: implemented
verification_status: device-verified
lesson_id: v1-lesson-006
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/syllabus/ (L06 lesson-spec)", "docs/syllabus/lesson-archetype-templates-v1.md"]
code_refs: ["lemot-app/content/lessons/v1/lesson-006.ts"]
test_refs: ["lemot-app/scripts/tests/v1LessonStructure.test.ts"]
related: ["[[Syllabus Overview]]", "[[00 Le Mot Holy Codex]]", "[[Integration Lesson Logic]]", "[[L7 Je Vais]]"]
tags: [syllabus, lesson, integration]
---

# L6 — Foundation Integration ("Putting It Together")

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

> [!canon] Runtime status: **authored & registered & learner-VISIBLE** (`v1-lesson-006`). Full **PILOT** spec, Review/Integration archetype (#10) — primary #10 (`L06:8,29`). **Son learner-visible ders (dev-apk sınırı).**

## Lesson Identity
İlk **integration beat** (Foundation Integration / Human Context). **0 yeni gramer.** → [[Integration Lesson Logic]].

## Learner Job
"recombine my French to explain myself as a person — tired, not ready, need help, want to understand" (`L06:33`).

## Prerequisites
L1–L5 owned engines (être, avoir, ne…pas, un/une, je voudrais).

## Spine Chips
Yok yeni; owned engine'ler recombine edilir.

## Active Chips
A 4 (meta + `word:aide`) (`L06:97-99`). Tek yeni lexis: `word:aide` + `word:comprendre` (infinitive).

## Supported Chips
S 6 (`L06:97-99`).

## Recognition Chips
R 7 (`L06:97-99`).

## Ghost / Exposure Chips
L7 aller için **recognition-only preview hook** (integration preview-hook pattern, `lesson-archetype-templates-v1.md:301,305-308`).

## Carryover Candidates
`aide`/`comprendre` → L11 (`vous pouvez m'aider?`), repair-kit.

## Pattern Chips
Recombination frame'leri (owned engine'lerin insan-akışı birleşimi).

## Model Sentences
> [!example]
> «Je suis fatigué, je ne suis pas prêt, j'ai besoin d'aide, je voudrais comprendre.» — owned parçaların tek akışta birleşimi. Sentence-level fill options (R12 legacy style).

## Exercise Sequence
Integration spine — **quiz/test gibi hissettirmez**, capability framing (`lesson-archetype-templates-v1.md:288,296`). → [[Review]], [[Combine and Weave]].

## Evidence and Mastery
model-answer-only zone; 0 active-new (`audit:246`). → [[Mastery Model]].

## Error Hooks
Recombination'da engine seçimi hataları. → [[Error Tracking System]].

## Mon Lexique Behavior
`aide`/`comprendre` added; recycle vurgusu.

## Review Hooks
L1–L5'i toplu recycle; L7 aller'e köprü.

## Runtime Status
VIS. Round 1 L0–L6 FROZEN. **Dev-apk'te görünen son ders** (Home cap `number <= 6`).

## Spec-to-Runtime Status
Uyumlu.

## Tests
`v1LessonStructure.test.ts` structure gate.

## Device Verification
Emulator smoke #136 (8cefe81), P0–P3 zero.

## Deferred Material
aller (L7) — preview hook only, ownership değil.

## Rejected Material
Integration'a yeni gramer eklemek.

## Open Decisions
Yok kritik; retrospektif L6'yı "Review/Integration + human-context broadening" olarak öneriyordu, uygulandı (`retrospective:218`).

## History
Full PILOT spec; retrospektif önerisi (L6=integration, L7=aller) benimsendi.
