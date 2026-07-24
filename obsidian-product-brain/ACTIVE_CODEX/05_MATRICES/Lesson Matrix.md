---
title: Lesson Matrix
aliases: [Lesson Matrix]
type: architecture
domain: syllabus
status: canonical
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/syllabus/", "content/lessons/v1/", "docs/STATUS.md"]
related: ["[[Lesson Status Matrix]]", "[[Runtime Lesson Map]]", "[[Syllabus Overview]]", "[[Device Verification Matrix]]"]
tags: [matrix, syllabus]
---

# Lesson Matrix

> Ders × zincir (Canon spec / Runtime dosya / Registry-kayıtlı / Test / Cihaz).
> Ders içeriği detayları [[Lesson Status Matrix]] ve tekil ders notlarında.

| L | id | Canon (doc) | Runtime dosya | V1_LESSONS? | Görünür? | Test | Device |
|---|---|---|---|---|---|---|---|
| L0 | v1-lesson-000 | build-matrix (locked) | lesson-000.ts | ✅ | ✅ VIS | validate:content | ✅ #136 smoke |
| L1 | v1-lesson-001 | full PILOT spec | lesson-001.ts | ✅ | ✅ VIS | validate:content | ✅ #136 smoke |
| L2 | v1-lesson-002 | full PILOT spec | lesson-002.ts | ✅ | ✅ VIS | validate:content | ⚠️ sampled |
| L3 | v1-lesson-003 | full PILOT spec | lesson-003.ts | ✅ | ✅ VIS | validate:content | ⚠️ sampled |
| L4 | v1-lesson-004 | full PILOT spec | lesson-004.ts | ✅ | ✅ VIS | validate:content | ⚠️ deep-link |
| L5 | v1-lesson-005 | full PILOT spec | lesson-005.ts | ✅ | ✅ VIS | validate:content | ⚠️ deep-link |
| L6 | v1-lesson-006 | full PILOT spec | lesson-006.ts | ✅ | ✅ VIS | validate:content | ⚠️ deep-link |
| L7 | v1-lesson-007 | full SUPERSEDED / compact ACCEPTED+BLOCKED | lesson-007.ts | ✅ | ❌ GATED | validate:content | ❌ |
| L8 | v1-lesson-008 | full PILOT spec | lesson-008.ts | ✅ | ❌ GATED | validate:content | ❌ |
| L9 | v1-lesson-009 | full PILOT spec | lesson-009.ts | ✅ | ❌ GATED | validate:content | ❌ |
| L10 | v1-lesson-010 | full PILOT (patches proposed) | lesson-010.ts | ✅ | ❌ GATED | validate:content | ❌ |
| L11 | v1-lesson-011 | full PILOT (patches applied) | lesson-011.ts | ✅ | ❌ GATED | validate:content | ❌ |
| L12 | v1-lesson-012 | compact-spec + gate-review | lesson-012.ts | ✅ | ❌ GATED | validate:content | ❌ |
| L13 | v1-lesson-013 | compact-spec | lesson-013.ts | ✅ | ❌ GATED | validate:content | ❌ |
| L14 | v1-lesson-014 | compact-spec + gate-review | lesson-014.ts | ✅ | ❌ GATED | validate:content | ❌ |
| L15 | v1-lesson-015 | compact-spec + gate-review | lesson-015.ts | ✅ | ❌ GATED | validate:content | ❌ |
| L16 | — | compact-spec + gate-review | **yok** | ❌ | ❌ | ❌ | ❌ |
| L17 | — | compact-spec + gate-review | **yok** | ❌ | ❌ | ❌ | ❌ |
| L18–L24 | — | roadmap intent | yok | ❌ | ❌ | ❌ | ❌ |

VIS = learner-visible; GATED = kayıtlı ama Home `number<=6` ile gizli.
⚠️ = kısmi/örneklem cihaz kapsaması ([[Device Verification Matrix]]).

> [!warning] STATUS.md "7 lessons (000–006)" der — bu `91f1b04` bayat
> snapshot'ıdır; çalışan ağaçta 16 dosya (L0–L15) var, hepsi `V1_LESSONS`'da
> kayıtlı. Çözülmüş sapma. [[Runtime Lesson Map]] · [[Needs Verification]].
