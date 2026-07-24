---
title: "ADR-0025 Paywall at Campfire ~L24; legacy L14 superseded"
aliases: ["ADR-0025", "Paywall Campfire", "L14 paywall superseded"]
type: decision
domain: product
status: deferred
canon_status: proposed
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
decision_date: 2026-07-05
source_of_truth: ["docs/ROADMAP.md", "docs/KNOWN_GAPS.md", "CLAUDE.md"]
code_refs: ["FEATURES.paywall"]
related: ["[[Monetization and Scope Boundaries]]", "[[ADR-0024 cairn-v1-precedence-chain]]", "[[Superseded Decisions]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, product, paywall, monetization]
---

# ADR-0025 — Paywall position: legacy L14 does NOT auto-carry to Cairn

<!-- gh-toc -->

## İçindekiler

- [Context](#context)
- [Decision](#decision)
- [Why](#why)
- [Alternatives Considered](#alternatives-considered)
- [Rejected Alternatives](#rejected-alternatives)
- [Consequences](#consequences)
- [Implementation References](#implementation-references)
- [Verification](#verification)
- [Supersedes / Superseded By](#supersedes-superseded-by)
- [Source Evidence](#source-evidence)
- [Related](#related)

> [!decision] Status: legacy L14 = **SUPERSEDED**; new position = **DEFERRED / PROPOSED**

## Context
Legacy "paywall after L14, $12.99/mo" 2026-04-23'te kilitlenmişti. Cairn reframe'inde bu sınır otomatik taşınmalı mı?

## Decision
Legacy **L14/$12.99** sınırı **Cairn için SUPERSEDED**; **açık beta ücretsiz başlar**; paywall yerleşimi ayrı, sonraki bir karar gate'i (Taş 5'ten sonra). MVP öğrenme-doğrulaması için monetization ertelenir; paywall kodu karantinada kalır; `FEATURES.paywall=false` (dev-apk).

> [!warning] Hafif çözülmemiş gerilim: Cairn founder Q&A (D-37) paywall'ı **Campfire @ L24** olarak konumlar (L1–L20 free) ve load-bearing fact bunu "settled" sayar; ancak §66.3 pozisyonun **post-validation yeniden karara bağlandığını** söyler. İki ifade tam uzlaşmadı — yerleşim resmen DEFERRED, çalışan yön Campfire ~L24.

## Why
Öğrenme döngüsü doğrulanmadan monetization sabitlenmemeli; erken paywall doğrulamayı bozar.

## Alternatives Considered
- Legacy L14/$12.99'u taşımak — reddedildi.
- Paywall'ı şimdi Campfire L24'te sabitlemek — ertelendi (post-validation gate).

## Rejected Alternatives
Legacy L14 sınırını Cairn'e taşımak; MVP'de paywall aktive etmek.

## Consequences
Paywall kodu quarantined (legacy `milestones.ts`/practice/chat banner'ları). public-beta stage paywall+revenueCat ekler ([[ADR-0017 product-stage-fail-closed-dev-apk]]), ama dev-apk'te erişilemez.

## Implementation References
ROADMAP "Not — paywall" + Açık Karar Kaydı; KNOWN_GAPS #4; CLAUDE.md legacy banner; Cairn Product Q&A (D-37, Campfire @ L24).

## Verification
Source-inspected. Yerleşim henüz karara/koda bağlanmadı.

## Supersedes / Superseded By
Supersedes: legacy "paywall after L14 / $12.99/mo" (2026-04-23) — **SUPERSEDED**. Superseded by: —

## Source Evidence
`06_decisions_history.md` D-30; D-37; load-bearing facts (§66.3 tension notu).

## Related
[[Monetization and Scope Boundaries]] · [[ADR-0024 cairn-v1-precedence-chain]] · [[Deferred Decisions]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
