---
title: "ADR-0015 K2 — device-day batch landing order"
aliases: ["ADR-0015", "K2", "device-day order"]
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
code_refs: []
related: ["[[ADR-0010 karpathy-engine-purity-contract]]", "[[Natural Reveal]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, architecture, sequencing]
---

# ADR-0015 — K2: device-day batch landing order

> [!decision] Status: **ACTIVE** (K2)

## Context
Tek-cihaz oturumunda birden çok PR'ın hangi sırayla ineceği, ekran-sayısı (screen-count) sözleşme testlerini etkiliyor.

## Decision
Tek-cihaz session batch sırası: **#174 → #180 (natural-reveal) → seen-layer**. Reveal'in konumu canon ile **SABİT** (üretimden hemen sonra); esnek **seen layer** onun etrafında dizilir. Screen-count contract testleri **bir kez**, nihai layout'a karşı güncellenir.

## Why
Natural Reveal'in pedagojik konumu (production'dan sonra) canon; onu batch sıralaması bozamaz. Contract testlerini tekrar tekrar değil, son layout'a göre tek seferde güncellemek gürültüyü azaltır.

## Alternatives Considered
- Reveal konumunu esnek bırakmak — reddedildi (canon-sabit).
- Contract testlerini her ara adımda güncellemek — reddedildi (gürültü).

## Rejected Alternatives
Reveal'i seen-layer'ın etrafında kaydırmak; testleri her adımda revize etmek.

## Consequences
#180 natural-reveal PR'ı device pass beklerken OPEN tutuldu (golden rule of screenless work). Device-day closing package #185.

## Implementation References
STATUS "K2 DEVICE-DAY ORDER"; #185 device-day closing package.

## Verification
Source-inspected (STATUS). Screen-count contract testleri final layout'a karşı.

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-17.

## Related
[[Natural Reveal]] · [[ADR-0010 karpathy-engine-purity-contract]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
