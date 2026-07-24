---
title: "ADR-0011 YASA 1 — schema change ⇒ migration in the same PR"
aliases: ["ADR-0011", "YASA 1", "schemaVersion migration same PR"]
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
source_of_truth: ["docs/ROADMAP.md", "docs/engineering/karpathy.md", "docs/STATUS.md"]
code_refs: ["content/learning-engine/migrations.ts"]
related: ["[[ADR-0012 yasa2-itemid-immutability]]", "[[ADR-0013 yasa3-error-tag-immutability]]", "[[ADR-0014 k1-absent-reads-as-v1]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, architecture, migration, yasa]
---

# ADR-0011 — YASA 1: schema change ⇒ migration in the same PR

> [!decision] Status: **ACTIVE** (LOCKED, rails landed #178)

## Context
Local-first bir üründe ilerleme kaybı **geri döndürülemez** ("trust death"). Şema değişikliği eski depolanan veriyi bozabilir.

## Decision
Her şema değişikliği (snapshot/lexique/telemetry/event) **aynı PR içinde**, eski→yeni dönüştüren **pure, test-locked** bir migration ile gelir. Migration yazılamıyorsa şema değişikliği **yasaktır**. "Temiz başlangıç" için kullanıcı verisi asla silinmez. Ucuz yol: snapshot'ı at, event log'dan yeniden türet.

## Why
Öğrenci verisi kutsaldır; şema evrimi hiçbir koşulda öğrenilmiş kanıtı yok etmemeli.

## Alternatives Considered
- Migration'ı sonraki PR'a ertelemek — reddedildi (arada veri bozulur).
- Şema değişiminde depoyu wipe edip yeniden başlatmak — reddedildi.

## Rejected Alternatives
Migration'sız şema değişikliği; "clean start" için kullanıcı verisini silmek.

## Consequences
Rails #178'de indi (infrastructure-only, sıfır gerçek migration). [[ADR-0014 k1-absent-reads-as-v1]] ile birlikte: absent version = v1, in-place rewrite yok.

## Implementation References
ROADMAP "SİSTEM YASALARI" YASA 1; STATUS #178/`0513d19`; karpathy §5; `migrations.ts`.

## Verification
Unit-tested (migration rails testleri). Gerçek migration henüz yok (infrastructure-only).

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-13.

## Related
[[ADR-0012 yasa2-itemid-immutability]] · [[ADR-0014 k1-absent-reads-as-v1]] · [[Storage Architecture]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
