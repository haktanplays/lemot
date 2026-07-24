---
title: "L16 Integration and Small Moment"
aliases: [L16, Integration, A Small Moment, ASM seed, Lesson 16]
type: lesson-spec
domain: syllabus
status: active
canon_status: canonical
implementation_status: spec-only
verification_status: source-inspected
lesson_id: none (spec-only, no runtime file)
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/syllabus/L16-*.compact-spec.md", "docs/syllabus/L16-*.gate-review.md", "docs/syllabus/lesson-archetype-templates-v1.md"]
code_refs: []
related: ["[[Syllabus Overview]]", "[[00 Le Mot Holy Codex]]", "[[Integration Lesson Logic]]", "[[L17 Human Context and Feelings]]"]
tags: [syllabus, lesson, integration, spec-only]
---

# L16 — Integration + A Small Moment seed

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

> [!warning] Runtime status: **SPEC ONLY** — `content/lessons/v1/`'de **`lesson-016` dosyası YOK**. **compact-spec** (accepted, Step 22A Option B, **5 locked gates**); applied `f47d62f`; gate 8 resolved (`L16-compact:256`). + **gate-review**. Bu bir planning artifact'i; kod/flag/runtime yetkisi yok.

## Lesson Identity
Integration beat + **A Small Moment (ASM) seed**. Band map cadence L14–L15 → **L16**. Integration'a çok küçük bir **novelty device** eklenir (L13 sadece 3 ders önce olduğu için "too little novelty" flag'ini savuşturur, `lesson-archetype-templates-v1.md:310-316`). → [[Integration Lesson Logic]].

## Learner Job
"read a small human situation in French, understand it, respond simply" (`L16-compact:26`).

## Prerequisites
L11–L15 owned engines; owned item havuzu (ASM known-items-only kullanır).

## Spine Chips
Yok yeni sistem; `phen:a-small-moment-seed` ritüeli.

## Active Chips
A 3 (**hepsi meta, 0 lexis**) (`L16-compact:75-77`).

## Supported Chips
S 4 (`L16-compact:75-77`).

## Recognition Chips
R 7 (`L16-compact:75-77`).

## Ghost / Exposure Chips
ASM = **model-answer-only**, present-only, known-items-only, ≤2–3 satır. Yeni lexis yok.

## Carryover Candidates
ASM ritüeli → L19 recurrence; okuma-anla-yanıtla deseni.

## Pattern Chips
`phen:a-small-moment-seed` — reading passage şimdilik linked `sent:l16-small-moment-reading-*`'tan compose edilir; **`read:`/`passage:` prefix'i coin edilmez** (`convention:449`).

## Model Sentences
> [!example]
> Küçük insan durumu (≤2–3 satır), yalnız owned items, present tense. Model answer full sentence içerebilir ama sentence chip olmaz.

## Exercise Sequence
Integration spine + ASM reading device — quiz hissi yok. → [[Read and Listen]], [[Review]].

## Evidence and Mastery
**model-answer-only** (deterministik; live AI yok) — founder build matrix L16'yı locked model-answer-only sayar (`matrix:140-144`). → [[Mastery Model]].

## Error Hooks
Okuma-anlama; owned engine seçimi. → [[Error Tracking System]].

## Mon Lexique Behavior
Recycle; ASM ritüel item'i (`phen:a-small-moment-seed`).

## Review Hooks
L19 ASM recurrence + repair pool.

## Runtime Status
**SPEC** — runtime dosyası yok; yalnız spec + gate-review. → [[Lesson Status Matrix]].

## Spec-to-Runtime Status
> [!warning] **Boşluk:** spec accepted + patched (`f47d62f`) ama runtime file **yok**. Spec-to-runtime divergence. → [[Spec to Runtime Matrix]], [[Spec Runtime Divergences]].

## Tests
Runtime testi yok (dosya yok). Spec 5 locked gate taşır.

## Device Verification
N/A — runtime yok.

## Deferred Material
ASM'nin tam okuma-passage granularity'si (compose from linked sent: for now). → [[Phenomena Progression]].

## Rejected Material
ASM'ye yeni lexis eklemek; `read:`/`passage:` prefix coin etmek şimdilik.

## Open Decisions
> [!open-loop] A-Small-Moment reading-passage granularity (convention open, `:449`); runtime dosyası ne zaman yazılacak. → [[05 Open Loops]].

## History
gate-review → compact-spec (Step 22A Option B, 5 locked gates); applied `f47d62f`; gate 8 resolved. Runtime henüz yok.
