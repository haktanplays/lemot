---
title: "ADR-0012 YASA 2 — shipped itemId immutability"
aliases: ["ADR-0012", "YASA 2", "itemId immutability"]
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
source_of_truth: ["docs/ROADMAP.md", "docs/STATUS.md", "docs/engineering/karpathy.md"]
code_refs: ["content/itemRegistry.ts", "shipped-item-ids.json"]
related: ["[[ADR-0011 yasa1-schema-migration-same-pr]]", "[[ADR-0013 yasa3-error-tag-immutability]]", "[[ADR-0018 k3-manifest-rule]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, architecture, itemid, yasa]
---

# ADR-0012 — YASA 2: shipped itemId immutability

> [!decision] Status: **ACTIVE** (LOCKED, enforced #177)

## Context
Tüm mastery/SRS/lexique geçmişi **itemId referansıyla** anahtarlanır. Bir itemId'yi değiştirmek öğrenci kanıtını yetim bırakır.

## Decision
Bir itemId **ship edildiğinde sonsuza dek donar** — rename yok, delete-and-recreate yok. Rename = orphaned learner evidence. Yeni id'ler **aynı PR'da** kaydedilir. Validator: shipped-itemId değişikliği → **HARD ERROR**. 54-id manifest.

## Why
Öğrenci kanıtının anahtarı sabit kalmalı; aksi halde mastery/SRS/lexique geçmişi sessizce kopar.

## Alternatives Considered
- Serbest rename + geçmiş remap — reddedildi (kırılgan, sessiz kayıp).
- Sadece uyarı (hard error değil) — reddedildi (yeterince koruyucu değil).

## Rejected Alternatives
Shipped itemId rename/delete; id değişimini yalnızca uyarıyla geçirmek.

## Consequences
Enforced #177 (`fd3d29b`). 54-id manifest ile `shipped-item-ids.json`'daki 56 id arasında bilinen 54-vs-56 drift var; K3 çift yönlü kontrol bunu yakalamak için var ([[ADR-0018 k3-manifest-rule]]).

> [!note] **Clarification (2026-07-29, PRJ-015 Item-Counting Contract v1.0 / DOC-062 audit):**
> yukarıdaki "54-vs-56 drift" cümlesi **bayat bir sayım artefaktıdır** — `56`,
> hiçbir zaman gerçek bir manifest sayısı olmadı (`grep -c '"'` JSON'daki `note`
> ve `ids` anahtar satırlarını da saydı). Git geçmişi: manifest her iki commit'inde
> de tam **54** id içerdi. Güncel denetlenmiş gerçekler: **52** = hijyen-öncesi
> (`84a5b8e`) registry snapshot'ı · **54** = güncel v1 registry ≡ manifest (çift
> yönlü test-enforced) · **59** = ayrı learning-engine fixture registry'si
> (`content/learning-engine/items.ts`). Registry sayıları kaynak ve snapshot
> adı verilmeden karşılaştırılamaz. **YASA 2 immutability tam olarak bağlayıcı
> kalır — bu not karara dokunmaz.**

## Implementation References
ROADMAP YASA 2; STATUS #177/`fd3d29b`; karpathy §5; `itemRegistry.ts` (`ITEM_REGISTRY`), `shipped-item-ids.json`.

## Verification
Unit-tested (validator hard-error testi).

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-14.

## Related
[[ADR-0013 yasa3-error-tag-immutability]] · [[ADR-0018 k3-manifest-rule]] · [[Registry Architecture]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
