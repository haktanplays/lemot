---
title: "ADR-0013 YASA 3 — shipped error-tag immutability"
aliases: ["ADR-0013", "YASA 3", "error-tag immutability"]
type: decision
domain: architecture
status: active
canon_status: canonical
implementation_status: implemented
verification_status: unit-tested
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
decision_date: 2026-07-05
source_of_truth: ["docs/ROADMAP.md", "docs/STATUS.md"]
code_refs: []
related: ["[[ADR-0012 yasa2-itemid-immutability]]", "[[Error Tracking System]]", "[[ADR-0022 hub-derived-drills]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, architecture, error-tag, yasa]
---

# ADR-0013 — YASA 3: shipped error-tag immutability (K3's twin)

> [!decision] Status: **ACTIVE** (LOCKED, mechanized #186)

## Context
Error tag'ler content factory'nin **sipariş dili** (error→tag→drill) ve öğrenci kanıtının referans anahtarıdır (`weakTags`/`precisionTags`/`resultTag`).

## Decision
Ship edilmiş bir tag **rename/delete edilemez**; yeni tag'ler **aynı PR'da** kaydedilir (`npm run manifest:add-tag`). İki yönlü validator: "shipped tag kullanımdan düştü → ERROR" ve "kaydedilmemiş yeni tag → ERROR". **54 tag donmuş** (bazı kaynaklar 30/54 sayısı verir — kaynağını belirt, tek sayıya zorlama).

## Why
Tag'ler hem drill türetmenin hem öğrenci kanıtının anahtarı; değişimleri sessiz kopmalar ve türetme kırılmaları yaratır.

## Alternatives Considered
- Tag'leri serbest evrimleştirmek — reddedildi.
- Tek yönlü validator (yalnızca yeni tag kontrolü) — reddedildi (drop'lar kaçar).

## Rejected Alternatives
Shipped tag rename/delete; tek yönlü kontrol.

## Consequences
Mechanized #186. 16-value `ErrorTagCode` union ve 27-value `WEAK_POINT_TAGS` ile birlikte error taksonomisini sabitler. Content factory ([[ADR-0022 hub-derived-drills]]) buna dayanır.

## Implementation References
ROADMAP YASA 3; STATUS "YASA 3" + #186.

## Verification
Unit-tested (iki yönlü validator).

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-15.

## Related
[[Error Tracking System]] · [[ADR-0012 yasa2-itemid-immutability]] · [[Error Matrix]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
