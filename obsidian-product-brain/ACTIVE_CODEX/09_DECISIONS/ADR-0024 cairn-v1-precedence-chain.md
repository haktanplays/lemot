---
title: "ADR-0024 Cairn spec v1.0 imported; precedence chain"
aliases: ["ADR-0024", "Cairn precedence", "precedence chain", "Cairn v1.0 import"]
type: decision
domain: product
status: active
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
decision_date: 2026-07-02
source_of_truth: ["docs/STATUS.md", "docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md", "CLAUDE.md"]
code_refs: ["data/lessons/", "flashcards.ts", "milestones.ts"]
related: ["[[Product Vision]]", "[[06 Canon and Status Legend]]", "[[ADR-0025 paywall-campfire-l24]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, product, canon, precedence]
---

# ADR-0024 — Cairn spec v1.0 imported; precedence chain

> [!decision] Status: **ACTIVE** (v0.1 Cairn + legacy = SUPERSEDED/quarantined)

## Context
Çok sayıda kanon katmanı (CLAUDE.md, STATUS, DEV_APK_MVP_CANON, Cairn spec'leri, legacy v7) çakışıyor. Hangisi kazanır?

## Decision
`CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md` verbatim import edildi (2026-07-02); v0.1 Cairn dokümanları (`CAIRN_PRODUCT_DEFINITION_v0.1`, `CAIRN_PRODUCT_SYSTEM_MAP_v0.1`) **SUPERSEDED reference-only** işaretlendi. Precedence: **`CLAUDE.md → STATUS.md → DEV_APK_MVP_CANON.md → Cairn v1.0 spec`**. Legacy `LEGACY — DO NOT BUILD ON THIS` banner'larıyla karantinaya alındı (`data/lessons/*`, `flashcards.ts`, `milestones.ts`, practice/chat routes). Superseded v0.3 materyali reading-guide banner arkasında tutulur (§48–64, §31–47'yi yener), fiziksel olarak silinmez.

## Why
Tek, net bir precedence zinciri olmadan ajanlar stale kanonu diriltir. "Newer active > current codebase > older active > design ref > archive."

## Alternatives Considered
- Legacy'yi fiziksel silmek — reddedildi (tarih ezilmez; karantina tercih edildi).
- Cairn v0.1'i aktif tutmak — reddedildi (v1.0 yener).

## Rejected Alternatives
Stale kanonu diriltmek; legacy dosyaları silmek; çakışmayı çözümsüz bırakmak.

## Consequences
Legacy v7 (24-lesson, 11-section flow, L14/$12.99 paywall, "for English speakers") HISTORICAL/quarantined. Merged Product Canon 2026-05-11 "PARTIALLY HARVESTED". Paywall pozisyonu için bkz. [[ADR-0025 paywall-campfire-l24]].

## Implementation References
STATUS header; CLOUD_SYNC_QUEUE 2026-07-02; KNOWN_GAPS #7/#12; `2bfc1b6` (#146), `60bfda3` (#147), `c5ccf06` (#148).

## Verification
Source-inspected (STATUS + banner'lar + import commit'leri).

## Supersedes / Superseded By
Supersedes: Cairn v0.1 docs; legacy v7 aktiflik iddiası (SUPERSEDED/quarantined). Superseded by: —

## Source Evidence
`06_decisions_history.md` D-34.

## Related
[[Product Vision]] · [[06 Canon and Status Legend]] · [[Historical Canon Map]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
