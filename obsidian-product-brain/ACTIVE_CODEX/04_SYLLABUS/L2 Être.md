---
title: "L2 Être"
aliases: [L2, Être, Lesson 2, v1-lesson-002]
type: lesson-spec
domain: syllabus
status: active
canon_status: canonical
implementation_status: implemented
verification_status: device-verified
lesson_id: v1-lesson-002
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/syllabus/ (L02 lesson-spec)", "docs/architecture/l0-l24-founder-build-matrix-v0.md"]
code_refs: ["lemot-app/content/lessons/v1/lesson-002.ts"]
test_refs: ["lemot-app/scripts/tests/v1LessonStructure.test.ts"]
related: ["[[Syllabus Overview]]", "[[00 Le Mot Holy Codex]]", "[[Grammar Progression]]", "[[Syllabus Design Rules]]"]
tags: [syllabus, lesson, architecture-verb]
---

# L2 — Être / Identity

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

> [!canon] Runtime status: **authored & registered & learner-VISIBLE** (`v1-lesson-002`). Full **PILOT** spec, planning-only (`L02:4,7`). Archetype #2 (Architecture Verb) pilotu.

## Lesson Identity
İlk **mimari-fiil** dersi. Journey: M1 Foundation. Full-cycle engine = être; ama yalnız `je suis` aktif. Doc type: full PILOT spec (`L02:4,7`). Runtime dosyası `lesson-002.ts`, başlık "Your first engine" — shipped sıra L1=Survival / L2=Être omurgasıyla uyumlu (`evidence 04 §3`).

## Learner Job
"say who/what I am, describe another person, use `c'est` — my first reusable verb" (`L02:32`).

## Prerequisites
L0 café taste + L1 Survival Kit owned set (bonjour/merci/je voudrais). Prerequisite-safety: yalnız owned/supported'a dayanır. → [[Syllabus Design Rules]].

## Spine Chips
`je suis` (architecture engine, spine). `c'est` supported.

## Active Chips
A 10 (`L02:93-95`). Çekirdek: `je suis …` aktif üretim.

## Supported Chips
S 11 (`L02:93-95`). être paradigmasının diğer kişileri supported.

## Recognition Chips
R 13 (`L02:93-95`). Paradigma **yalnız recognition** — **no conjugation table** (architecture-verb guardrail, `lesson-spec-template-v1.1.md:77-83`).

## Ghost / Exposure Chips
Registry'de `verb-etre`, `chunk-tu-es`, `chunk-vous-etes`, `grammar-etre-identity` gibi pre-factory-loop item'ler **dormant** (hiç referans edilmemiş, R4, `audit:254`). **[HISTORICAL/harmless]**

## Carryover Candidates
L1'den bonjour/merci; L3'e `ne…pas` için `je suis` tabanı; L4'e être↔avoir kontrastı için.

## Pattern Chips
`je suis + [state/identity]` frame; `c'est + [noun]`.

## Model Sentences
> [!example]
> «Je suis …» · «C'est …» — tam cümleler model/reveal copy'sinde yaşar, chip olmaz (`audit:246`).

## Exercise Sequence
10 canon section spine: Meet It → Notice the Pieces → Why This Works → Try It → Weave It → Shape It → Say It Your Way → Natural Reveal → Stay With It → Lesson End. → [[Exercise System Overview]].

## Evidence and Mastery
`feedback_mode: model-answer-only` (L0–L6 zonu) → generative AI çalışmaz, feedback deterministik (`ai-generation-contract-v1.md:60`). Mastery counter-derived. → [[Mastery Model]].

## Error Hooks
Identity karışması, `c'est` vs `je suis`. → [[Error Tracking System]].

## Mon Lexique Behavior
`je suis` added; paradigma recognition item'leri hidden/recognition. → [[Mon Lexique]].

## Review Hooks
L3 (`je ne suis pas`), L4 (être↔avoir), L6 integration'da recycle.

## Runtime Status
VIS. Round 1 Dev APK L0–L6 ACCEPTED & FROZEN (emulator smoke #136/8cefe81, P0–P3 zero).

## Spec-to-Runtime Status
Uyumlu; retrospektifteki "L1=Je suis, L2'ye ait" fork'u runtime'da çözüldü — `lesson-002` = Être (`evidence 04 §3`). **[IMPLEMENTED — fork resolved]** → [[Spec Runtime Divergences]].

## Tests
`scripts/tests/v1LessonStructure.test.ts` — `PROTECTED_CHUNKS` `{je ne suis pas, ce n'est pas}` enforced (`:55`).

## Device Verification
Emulator smoke #136 (8cefe81), P0–P3 zero. Fiziksel cihaz smoke operator-only, pending.

## Deferred Material
Full être paradigması aktif üretim (deferred, architecture-verb guardrail).

## Rejected Material
Conjugation table öğretimi — reddedildi (`lesson-spec-template-v1.1.md:77-83`).

## Open Decisions
Dormant `verb-etre`/`grammar-etre-identity` registry hijyen pass'i (R4). → [[05 Open Loops]].

## History
Full PILOT spec; retrospektifte L1/L2 re-slot fork tartışıldı, runtime'da çözüldü.
