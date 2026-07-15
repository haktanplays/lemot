---
title: "L4 J'ai"
aliases: [L4, J'ai, Avoir, Human States, Lesson 4, v1-lesson-004]
type: lesson-spec
domain: syllabus
status: active
canon_status: canonical
implementation_status: implemented
verification_status: device-verified
lesson_id: v1-lesson-004
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/syllabus/ (L04 lesson-spec)", "docs/architecture/l0-l24-founder-build-matrix-v0.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Le_Mot_Round1_Context_Handoff_2026-06-13.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Syllabus_Delta_Log.md"]
code_refs: ["lemot-app/content/lessons/v1/lesson-004.ts"]
test_refs: ["lemot-app/scripts/tests/v1LessonStructure.test.ts"]
related: ["[[Syllabus Overview]]", "[[00 Le Mot Holy Codex]]", "[[Grammar Progression]]", "[[Vocabulary Progression]]"]
tags: [syllabus, lesson, avoir]
---

# L4 — Avoir / Human States

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

> [!canon] Runtime status: **authored & registered & learner-VISIBLE** (`v1-lesson-004`). Full **PILOT** spec; "Load note (revised)" — bilinçli **lightened** load (`L04:8`).

## Lesson Identity
Avoir-State/Human-State archetype (#4). M1 Foundation. être↔avoir kontrastının pilotu.

## Learner Job
"say how I feel and what I need with *avoir*, not a literal 'I am'" (`L04:42`).

## Prerequisites
L2 être (kontrast için), L3 negation (`je n'ai pas faim`).

## Spine Chips
`j'ai` engine.

## Active Chips
A 8 (`L04:106-108`). `j'ai faim/soif/besoin de`; `je n'ai pas faim`.

## Supported Chips
S 8 (`L04:106-108`).

## Recognition Chips
R 10 (`L04:106-108`).

## Ghost / Exposure Chips
Sentence-level fill options L4/L6 — recognition choice surfaces (legacy style, **R12 REVIEW-LOW**, `audit:303`).

## Carryover Candidates
`j'ai besoin de` → L11 (help), L15 (obligation/need); `j'ai faim` → state/feeling havuzu.

## Pattern Chips
`j'ai + [state]`; `je n'ai pas + [state]`.

## Model Sentences
> [!example]
> «J'ai faim.» «J'ai besoin de …» «Je n'ai pas faim.» — être ile literal "I am hungry" **değil**.

## Exercise Sequence
10 canon section spine; être↔avoir kontrast egzersizi. → [[Fill]], [[Multiple Choice]].

## Evidence and Mastery
model-answer-only zone; deterministik. → [[Mastery Model]].

## Error Hooks
être/avoir karışması ("je suis faim" hatası); negation. → [[Error Tracking System]].

## Mon Lexique Behavior
`j'ai faim/soif/besoin de` added. **R3 uyarısı:** `faim` chip'i registry item'sız — mastery event tutunmuyor (`audit:43`). **[DEFERRED fix]**

## Review Hooks
L6/L10 integration; state/feeling gap'i doldurma adayı.

## Runtime Status
VIS. Round 1 L0–L6 FROZEN.

## Spec-to-Runtime Status
Uyumlu.

## Tests
`v1LessonStructure.test.ts` structure gate.

## Device Verification
Emulator smoke #136 (8cefe81), P0–P3 zero.

## Deferred Material
Broad avoir kullanımları (possession vb.) — supported/recognition.

## Rejected Material
Full avoir paradigması aktif üretim.

## Open Decisions
> [!open-loop] R3 identity gap (`faim` → `noun-faim`); **state/feeling gap** (`fatigué`/`j'ai soif` birçok spec istiyor, hiçbiri ship etmiyor, `audit:473`). → [[05 Open Loops]], [[Vocabulary Progression]].

## Kaynak içe aktarımı (Learning Engine Taxonomy, 2026-06-29 vault)

> [!info] Kaynak: `Le_Mot_Round1_Context_Handoff_2026-06-13.md` §6 (PR #131 anti-memorization pass) + `Syllabus_Delta_Log.md` #153. **Zenginleştirir ama override ETMEZ** — runtime canon (HEAD `02f9f7a` / #196) üstün; L0–L6 FROZEN. PR #131 registry'ye dokunmadı (`itemRegistry.ts` untouched, sıfır yeni item).

### Anti-memorization ekranı: `s03b-fill-where-feel-have`
Risk: `j'ai` iki ezberlenmiş chunk'a çökebilir (`j'ai faim`, `j'ai une question`). Çözüm: yeni interaktif ekran (**Recognition** / `fill-with-traps`).
- **Prompt:** "You came with one small thing to ask. What do you say?"
- **Correct:** `J'ai une question.`
- **Trap 1:** `Je suis ici.` — reason: "That says **where** you are, not what you have to ask."
- **Trap 2:** `J'ai faim.` — reason: "That says **how you feel**, not that you have a question."

> [!note] Bu ekran **where / feel / have discrimination**'ı zorlar — pasif örnek okuma değil, **aktif retrieval** (kaynak §6). Trap'ler lesson-scoped kontrastı adlandırır (être-location vs avoir-state vs avoir-possession), gramer öğretmez. `faim` bu bantta **aktif reusable piece**tir (#153 chip coverage). Not: bu notun üstündeki **R3 uyarısı** hâlâ geçerli — `faim` chip'i registry item'sız, mastery event tutunmuyor [DEFERRED fix]; bu, `faim`'in aktif chip statüsüyle çelişmez, ayrı bir registry-hygiene borcudur.

## History
Full PILOT spec; load revised (lightened).
