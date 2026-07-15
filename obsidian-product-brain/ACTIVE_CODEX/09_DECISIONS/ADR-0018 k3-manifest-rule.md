---
title: "ADR-0018 K3 — manifest rule is permanent"
aliases: ["ADR-0018", "K3", "manifest rule"]
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
source_of_truth: ["docs/STATUS.md"]
code_refs: ["content/itemRegistry.ts", "shipped-item-ids.json"]
related: ["[[ADR-0012 yasa2-itemid-immutability]]", "[[ADR-0013 yasa3-error-tag-immutability]]", "[[Registry Architecture]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, architecture, manifest]
---

# ADR-0018 — K3: manifest rule is permanent

> [!decision] Status: **ACTIVE** (K3, #183)

## Context
Registry'ye yeni itemId ekleyen bir PR, manifest güncellemesini unutabilir; merge sonrası manuel senkron güvenilmez.

## Decision
Her itemId-ekleyen PR **manifest güncellemesini kendisi taşır**. Merge-sonrası manuel sync **yok**; kaydedilmemiş bir registry id'si bir `validate:content` **HARD ERROR**'dur (#183).

## Why
İnsan hafızasına dayalı senkron kırılır; kontrol CI'a taşınır. YASA 2 ([[ADR-0012 yasa2-itemid-immutability]]) ve YASA 3 ([[ADR-0013 yasa3-error-tag-immutability]]) ile aynı disiplin.

## Alternatives Considered
- Merge sonrası manuel manifest sync — reddedildi (kaçar).
- Yalnızca uyarı — reddedildi (hard error tercih edildi).

## Rejected Alternatives
Post-merge manuel sync; kaydedilmemiş id'yi uyarıyla geçirmek.

## Consequences
54-id manifest ile 56 shipped-id arasındaki drift'i yakalar (bidirectional). #183 hard error mekanize etti.

## Implementation References
STATUS K3; #183.

## Verification
Unit-tested (`validate:content` hard-error).

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-18.

## Related
[[ADR-0012 yasa2-itemid-immutability]] · [[Registry Architecture]] · [[Validation Gates]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
