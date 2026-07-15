---
title: "ADR-0023 Privacy / local-first data rights; consent-gated remote"
aliases: ["ADR-0023", "Privacy local-first", "P5", "consent-gated remote sync"]
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
decision_date: 2026-06-05
source_of_truth: ["docs/workstreams/founder-self-learning-p5.md", "docs/KNOWN_GAPS.md"]
code_refs: ["lm_le_privacy_state"]
related: ["[[Privacy and Data Deletion]]", "[[ADR-0009 events-source-of-truth]]", "[[Supabase]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, architecture, privacy, kvkk, gdpr]
---

# ADR-0023 — Privacy / local-first data rights (P5); remote consent-gated

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

> [!decision] Status: **ACTIVE** (local layer P5.1–P5.4C code-side complete); remote **DEFERRED**

## Context
Öğrenci verisi (ham cevap metni dâhil) KVKK/GDPR'ı karşılamalı. Local-first ürün, veri haklarını cihazda tanımlamalı.

## Decision
**Local-first varsayılan**; event log cihazda source-of-truth. Versiyonlu `PrivacyState` (`lm_le_privacy_state`), bir kerelik yerel disclosure, yerel export summary (ham JSON dump değil), iki-adımlı dar reset. **Hiçbir remote/tester sync etkin değil**; herhangi bir remote ingestion öncesi consent gate + `consent_at`/`consent_version` zorunlu; client'ta `service_role` yok; RLS on; pseudonymous `testerId`. Public/tester launch öncesi **legal review zorunlu**.

## Why
Geri döndürülemez veri kaybı ve gizlilik ihlali "trust death". Local-first + consent-gate, veri haklarını mimariye gömer.

## Alternatives Considered
- Varsayılan remote sync — reddedildi (consent-gate şart).
- Ham JSON export — reddedildi (özet tercih edildi).
- Tek-adımlı toplu reset — reddedildi (iki-adımlı dar reset).

## Rejected Alternatives
Consent'siz remote ingestion; client `service_role`; ham veri dump'ı; RLS'siz tablo.

## Consequences
P5.1–P5.4C IMPLEMENTED (versiyonlu PrivacyState, one-time disclosure, export summary, two-step reset, PR-H local reset epoch barrier #196). **Remote DEFERRED** (audit C1: cloud deletion path yok; synced kullanıcı için local "reset" = sahte silme). Remote şema `le_*`/lowercase learning-engine tabloları PROPOSED (owner-scoped RLS, additive). Deploy = operator-only.

## Implementation References
`founder-self-learning-p5` checkpoint; privacy-kvkk-gdpr note (P5.1); architecture-review §17; KNOWN_GAPS #4/#13; #196 PR-H.

## Verification
Source-inspected; local layer code-side complete; remote PROPOSAL, cloud deletion unimplemented.

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-21; D-40 (additive remote schema PROPOSAL).

## Related
[[Privacy and Data Deletion]] · [[Supabase]] · [[Sync Architecture]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
