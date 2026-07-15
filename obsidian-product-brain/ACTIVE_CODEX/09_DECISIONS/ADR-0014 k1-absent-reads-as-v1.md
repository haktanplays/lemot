---
title: "ADR-0014 K1 — schemaVersion absent reads as v1"
aliases: ["ADR-0014", "K1", "absent reads as v1"]
type: decision
domain: architecture
status: active
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
decision_date: 2026-07-05
source_of_truth: ["docs/STATUS.md"]
code_refs: ["content/learning-engine/migrations.ts"]
related: ["[[ADR-0011 yasa1-schema-migration-same-pr]]", "[[Storage Architecture]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, architecture, versioning]
---

# ADR-0014 — K1: schemaVersion "absent reads as v1"

> [!decision] Status: **ACTIVE** (K1 APPROVED)

## Context
Depolanan veriyi yeniden yazmadan nasıl versiyonlayacağız? Mevcut kayıtlarda version alanı yok.

## Decision
Eksik (absent) version alanı **v1 olarak okunur**; depolanan veri asla in-place yeniden yazılmaz. Opsiyonel `type` alanı **şimdi eklenmez** — ilk gerçek migration PR'ında, onu dolduran kodla **aynı commit'te** doğar.

## Why
Sıfır-dokunuş (zero-touch) versiyonlama; [[ADR-0011 yasa1-schema-migration-same-pr]] ile uyumlu — veri hiç dokunulmadan güvenle evrimleşir.

## Alternatives Considered
- Tüm mevcut kayıtları v1 damgasıyla yeniden yazmak — reddedildi (gereksiz yazma + risk).
- `type` alanını şimdiden eklemek — reddedildi (ilk migration'a bırakıldı).

## Rejected Alternatives
Depolanan veriyi in-place rewrite; kullanılmayan alanı erkenden eklemek.

## Consequences
`migrations.ts` header'ında kayıtlı. Migration rails ([[ADR-0011 yasa1-schema-migration-same-pr]], #178) bu okuma kuralı üzerine kurulu.

## Implementation References
STATUS "Operator decisions" K1; `migrations.ts` header.

## Verification
Source-inspected (migrations.ts header + STATUS K1).

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-16.

## Related
[[ADR-0011 yasa1-schema-migration-same-pr]] · [[Storage Architecture]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
