---
title: "ADR-0010 Engine purity contract (karpathy house rules)"
aliases: ["ADR-0010", "Karpathy contract", "Engine purity"]
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
source_of_truth: ["docs/engineering/karpathy.md"]
code_refs: ["content/learning-engine/"]
related: ["[[ADR-0009 events-source-of-truth]]", "[[ADR-0011 yasa1-schema-migration-same-pr]]", "[[Learning Engine Architecture]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, architecture, purity, karpathy]
---

# ADR-0010 — Engine purity contract (karpathy house rules)

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

> [!decision] Status: **ACTIVE** (LOCKED, imported per K4)

## Context
Öğrenme motoru modüllerinin test edilebilir ve güvenli kalması gerekiyor; gizli durum ve non-determinizm hem testi hem local-first veriyi tehlikeye atar.

## Decision
Her learning-engine modülü:
- **PURE** — storage/network/React/AI/gizli state yok.
- **DETERMINISTIC** — eşitlikler (ties) explicit kırılır.
- **EXPLICIT now** — saat bir **parametredir**; engine mantığında `Date.now()` / `Math.random()` **yok**.
- **FAIL BEHAVIOR EXPLICIT** — varsayılan **fail-closed** → `null`/"unsupported" döndür, veri dokunulmaz, asla sessiz veri kaybı yok.

Her PR öncesi üçlü validation yeşil: `typecheck`, `validate:content`, `test:learning-engine`. Engine mantığı testleriyle birlikte gönderilir.

## Why
Deterministik saf motor, event-sourcing ([[ADR-0009 events-source-of-truth]]) ve local-first veri güvenliğinin ([[ADR-0011 yasa1-schema-migration-same-pr]]) ön koşuludur.

## Alternatives Considered
- Gömülü clock/`Date.now()` — reddedildi (non-deterministik test).
- Fail-open (hata durumunda tahmin) — reddedildi (sessiz veri kaybı riski).

## Rejected Alternatives
Engine içinde `Date.now()`/`Math.random()`; sessiz fail; storage/AI'a doğrudan bağlı engine.

## Consequences
K4 = karpathy import edildi (#182/`53c70b0`). Tüm founder-self-learning checkpoint'lerinde zorunlu. "Golden rule of screenless work" ([[ADR-0024 cairn-v1-precedence-chain]] timeline'ında D-38) bununla birlikte gelir.

## Implementation References
`docs/engineering/karpathy.md`; #182 karpathy import + K1–K6; triple validation CI gate.

## Verification
Unit-tested (`test:learning-engine`); source-inspected (karpathy doc).

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-12; D-19 (K4).

## Related
[[Learning Engine Architecture]] · [[ADR-0009 events-source-of-truth]] · [[Validation Gates]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
