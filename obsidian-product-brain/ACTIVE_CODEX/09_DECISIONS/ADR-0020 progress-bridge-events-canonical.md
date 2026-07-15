---
title: "ADR-0020 Progress bridge — event spine is canonical; no fake lm7 markers"
aliases: ["ADR-0020", "Progress bridge", "no fake lm7 markers"]
type: decision
domain: architecture
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
decision_date: 2026-06-09
source_of_truth: ["docs/workstreams/learning-engine-progress-bridge-decision.md"]
code_refs: ["selectLessonProgress", "lm_le_events", "lm7"]
related: ["[[ADR-0009 events-source-of-truth]]", "[[ADR-0007 v1-temporary-dev-apk-skin-engine-foundation]]", "[[Storage Architecture]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, architecture, progress, storage]
---

# ADR-0020 — Progress bridge: `lm_le_events` is canonical; no fake `lm7` markers

> [!decision] Status: **ACTIVE** (recommendation adopted; bridging = later flagged step)

## Context
Engine `lm_le_events`'e yazar; Home/Progress/Daily Review legacy **`lm7`**'yi okur — iki **disjoint** store ("main integration blocker").

## Decision
Home/Progress/Daily Review, append-only `lm_le_events` log'undan türetilen learning-engine projeksiyonlarını (`selectLessonProgress`, mastery/review) okumalı. **Sahte legacy `lm7` marker'ları yazmaktan kaçınılır**; geçici bir shim yalnızca Dev APK test yolu için gerekirse, stage-guarded, açıkça geçici, non-canonical ve belgelenmiş bir kaldırma yoluyla izinlidir.

## Why
İki disjoint store'un tek doğruluk kaynağına yakınsaması gerekir. Sahte `lm7` marker'ları iki-sistem borcunu **gizler** ve **çift doğruluk** yaratır — [[ADR-0009 events-source-of-truth]] ilkesini ihlal eder.

## Alternatives Considered
- Engine ilerlemesini `lm7`'ye yazmak — **reddedildi** (borcu gizler, çift doğruluk).
- Home/Progress'i hemen engine projeksiyonlarına bağlamak — ertelendi (later flagged step).

## Rejected Alternatives
Engine progress'i legacy `lm7`'ye bridge etmek (sahte marker); iki-sistem borcunu görünmez kılmak.

## Consequences
`selectLessonProgress` (#87) üstüne kurulu. Açık sorular: completion-strictness tanımı; canonical completion birimi; Daily Review ne zaman açılır; Progress legacy 24-lesson/264-section taksonomisini ne zaman bırakır. Bilinen v1 non-blocker: Home tamamlanma sonrası hâlâ "Begin the first lesson" (F5).

## Implementation References
`learning-engine-progress-bridge-decision` §1/§3–§9; `selectLessonProgress` #87.

## Verification
Source-inspected; bridging PARTIAL (selector var, Home/Progress wiring later step).

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-10.

## Related
[[ADR-0009 events-source-of-truth]] · [[Storage Architecture]] · [[Sync Architecture]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
