---
title: "L5 Un Une"
aliases: [L5, Un Une, Articles, Objects, Lesson 5, v1-lesson-005]
type: lesson-spec
domain: syllabus
status: active
canon_status: canonical
implementation_status: implemented
verification_status: device-verified
lesson_id: v1-lesson-005
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/syllabus/ (L05 lesson-spec)", "docs/architecture/l0-l24-founder-build-matrix-v0.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Le_Mot_Round1_Context_Handoff_2026-06-13.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Syllabus_Delta_Log.md"]
code_refs: ["lemot-app/content/lessons/v1/lesson-005.ts"]
test_refs: ["lemot-app/scripts/tests/v1LessonStructure.test.ts"]
related: ["[[Syllabus Overview]]", "[[00 Le Mot Holy Codex]]", "[[Vocabulary Progression]]", "[[Grammar Progression]]"]
tags: [syllabus, lesson, articles]
---

# L5 — Objects / Articles

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

> [!canon] Runtime status: **authored & registered & learner-VISIBLE** (`v1-lesson-005`). Full **PILOT** spec; lightened (`L05:8`). **M1 Foundation'ı kapatır.**

## Lesson Identity
Object/Article/Noun-System archetype (#5). M1 kapanışı.

## Learner Job
"ask for/name objects with `un`/`une`, recognize `le`/`la`, learn noun+article together" (`L05:40`).

## Prerequisites
L1 `je voudrais` (nesne isteme), L2–L4 owned engines.

## Spine Chips
`un`/`une` (object-package control).

## Active Chips
A 8 (`L05:106-108`). `un/une` aktif.

## Supported Chips
S 9 (`L05:106-108`). `le/la` supported.

## Recognition Chips
R 8 (`L05:106-108`).

## Ghost / Exposure Chips
Plural / partitive **deferred** (bu bantta owned değil).

## Carryover Candidates
noun+article paketi → tüm sonraki nesne sahneleri; `le/la` homograph guard L8'de `word:la-there` vs `word:la-article`.

## Pattern Chips
`je voudrais + un/une + [noun]`; noun her zaman artikeliyle birlikte öğrenilir (noun-package).

## Model Sentences
> [!example]
> «Je voudrais un café.» «Une idée.» — noun+article birlikte, ayrı chip değil (noun-package).

## Exercise Sequence
10 canon section spine. → [[Fill]], [[Build]].

## Evidence and Mastery
model-answer-only zone; deterministik. → [[Mastery Model]].

## Error Hooks
un/une gender karışması; le/la vs un/une. → [[Error Tracking System]].

## Mon Lexique Behavior
noun-package'lar added; `noun-idee` registry'de **dormant** (R4, `audit:254`).

## Review Hooks
L6/L10 integration; nesne sahneleri boyunca recycle.

## Runtime Status
VIS. Round 1 L0–L6 FROZEN. M1 milestone kapanışı.

## Spec-to-Runtime Status
Uyumlu.

## Tests
`v1LessonStructure.test.ts` structure gate.

## Device Verification
Emulator smoke #136 (8cefe81), P0–P3 zero.

## Deferred Material
Plural, partitive (`du/de la/des`) — paid-zone/deferred. → [[Grammar Progression]].

## Rejected Material
Full article sistemi (tüm formlar aktif) — lightened.

## Open Decisions
R4 dormant `noun-idee` triage. → [[05 Open Loops]].

## Kaynak içe aktarımı (Learning Engine Taxonomy, 2026-06-29 vault)

> [!info] Kaynak: `Le_Mot_Round1_Context_Handoff_2026-06-13.md` §6 (PR #131 anti-memorization pass) + `Syllabus_Delta_Log.md` #153 (L5 trap cleanup). **Zenginleştirir ama override ETMEZ** — runtime canon (HEAD `02f9f7a` / #196) üstün; L0–L6 FROZEN. Registry'ye dokunulmadı.

### Anti-memorization ekranı: `s04b-fill-choose-package`
Risk: `un`/`une` bir café/question çiftine çökebilir. Çözüm: yeni interaktif ekran (**Recognition** / `fill-with-traps`) — noun+article'ı **paket** olarak seçtirir.
- **Prompt:** "You have one question. Which French package fits?"
- **Correct:** `une question`
- **Trap 1:** `un café` — reason: "That is the coffee package, not the question package."
- **Trap 2:** `question` — reason: "In French, the noun travels with its little word here: `une question`."
- **Trap 3:** `un question` — reason: "This package is not the one we use here. Keep it as: `une question`."

> [!note] **`un question` = option-only corrective distractor** — geçerli form olarak **öğretilmez**, geniş gender kurallarını açmaz, yalnız package-choice'ı pekiştirir (kaynak §6 judgment). #153 ile eski `merci` trap'i **kaldırıldı** (`un`/`une` kontrastı için anlamsız distraktördü); trap scope aktif kontrata bağlı tutuldu. Bu, üstündeki "un/une gender karışması; le/la vs un/une" error hook'larıyla hizalıdır.

## History
Full PILOT spec; lightened; M1 kapanış dersi.
