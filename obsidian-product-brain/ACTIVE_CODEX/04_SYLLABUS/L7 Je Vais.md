---
title: "L7 Je Vais"
aliases: [L7, Je Vais, Aller, Movement, Lesson 7, v1-lesson-007]
type: lesson-spec
domain: syllabus
status: active
canon_status: provisional
implementation_status: partial
verification_status: source-inspected
lesson_id: v1-lesson-007
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/syllabus/L07-compact-doorway.compact-spec.md", "docs/syllabus/ (L07-full lesson-spec, SUPERSEDED)"]
code_refs: ["lemot-app/content/lessons/v1/lesson-007.ts", "lemot-app/app/(tabs)/index.tsx"]
test_refs: ["lemot-app/scripts/tests/v1LessonStructure.test.ts"]
related: ["[[Syllabus Overview]]", "[[00 Le Mot Holy Codex]]", "[[Lesson Status Matrix]]", "[[L6 Un Petit Moment]]", "[[Grammar Progression]]"]
tags: [syllabus, lesson, aller, split-sense, blocked]
---

# L7 — Aller / Movement (full) **vs** Je Vais frozen-chunk doorway (compact)

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

> [!canon] Runtime status: **authored & registered but Home-GATED** (`v1-lesson-007`, `number <= 6` cap → görünmez). **İki spec var:** full spec **SUPERSEDED / DEFERRED** (`L07-full:3`); compact doorway **PLANNED — accepted next-PR direction, BLOCKED** (`L07-compact:6,8`). Runtime dosyası **compact** yöne göre yazıldı.

## Lesson Identity
Split-sense archetype: aller = movement (futur proche deferred). **İki tasarım yarıştı** — full aller engine vs iki-frozen-chunk doorway. Sevkedilen: compact.

## Learner Job
- **full:** "say where I'm going… without the full future" (`L07-full:45`).
- **compact:** "close a small moment, say you're heading off — *Je vais à la maison.*" (`L07-compact:48`).

## Prerequisites
L6 integration owned; aller preview hook L6'da recognition olarak verildi (ownership değildi).

## Spine Chips
compact: `chunk-je-vais` (frozen), `chunk-a-la-maison`.

## Active Chips
- full: A 8 (`L07-full:124-126`).
- **compact: A 1** (`chunk-je-vais`) (`L07-compact:54-55`).

## Supported Chips
- full: S 9. compact: **S 1** (`chunk-a-la-maison`).

## Recognition Chips
- full: R 12. compact: futur proche recognition-only.

## Ghost / Exposure Chips
compact: **exactly 2 frozen chunks, no paradigm** (`L07-compact:54-55`). `ça va`'daki `va` bir aller/futur sinyali değildir (homograph guard, `convention:32`).

## Carryover Candidates
`je vais` → L14 (`j'y vais` = `je vais` + `y`); L18 futur proche stronger preview.

## Pattern Chips
compact: donmuş `je vais à la maison` — paradigma yok.

## Model Sentences
> [!example]
> compact: «Je vais à la maison.» — frozen chunk. `je vais + à/au/à la` full engine **deferred**.

## Exercise Sequence
10 canon section spine (compact, de-scoped). → [[Exercise System Overview]].

## Evidence and Mastery
model-answer-only zone (pre-Campfire deterministik). → [[Mastery Model]].

## Error Hooks
Futur proche ile karışma (`je vais + inf.` "going to" — recognition-only). → [[Error Tracking System]].

## Mon Lexique Behavior
`je vais à la maison` frozen chunk added; paradigma hidden.

## Review Hooks
L10/L13 integration; L14 `y` doorway.

## Runtime Status
**REG** — görünmez (Home cap). L7 implementasyonu ve Home `<=6→<=7` filter değişikliği **operator-reviewed decision** (`L07-compact-doorway.compact-spec.md:8,94-104`). **[BLOCKED]**

## Spec-to-Runtime Status
> [!warning] **Sapma:** full spec ile shipped compact farklı. Full = SUPERSEDED as-next-PR / DEFERRED. Runtime = compact doorway. → [[Spec Runtime Divergences]].

## Tests
`v1LessonStructure.test.ts` (16 ders/80 chip audit içinde temiz).

## Device Verification
UNVERIFIED — görünmez, cihazda sürülmedi (dev-apk L0–L6). → [[Device Verification Matrix]].

## Deferred Material
Full aller movement engine + `à/au/à la`; futur proche ownership → L18/paid-zone. **[DEFERRED/SUPERSEDED]** → [[Superseded Specs]].

## Rejected Material
Full paradigma öğretimi (compact yön reddetti).

## Open Decisions
> [!open-loop] L7 görünürlük bump'ı = Round 1 tester wave sonrası operator kararı; Home cap `<=6→<=7` bekliyor (`L07-compact:94-104`). → [[05 Open Loops]].

## History
Full spec önce yazıldı → compact doorway'e SUPERSEDED. compact accepted-but-BLOCKED.
