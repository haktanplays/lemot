---
title: "ADR-0021 Mastery precision policy — near-miss ≠ failure"
aliases: ["ADR-0021", "Precision policy", "near-miss soft signal"]
type: decision
domain: learning
status: active
canon_status: canonical
implementation_status: implemented
verification_status: unit-tested
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
decision_date: 2026-06-05
source_of_truth: ["docs/workstreams/founder-self-learning-mastery-precision-policy.md"]
code_refs: ["MASTERY_SNAPSHOT_VERSION", "scoreEvents"]
related: ["[[Mastery Model]]", "[[ADR-0002 calm-passive-mirror-mentor-tone]]", "[[ADR-0022 hub-derived-drills]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, learning, mastery, precision]
---

# ADR-0021 — Mastery precision policy (near-miss ≠ failure)

> [!decision] Status: **ACTIVE** (foundation); staged strictness **DEFERRED**

## Context
Anlamı koruyan aksan/noktalama/1-harf kaymaları tam başarısızlık (failure) sayılıyordu — kelimeyi açıkça bilen öğrenciyi sessizce cezalandırıyordu.

## Decision
Dört bucket: **Success** / **Precision-near-miss** (`punctuation_only`, `accent_only`, `spelling_near_miss`) / **Skip** / **Failure**. Bir precision olayı **soft signal**tir: `precisionCount`/`precisionTags` kaydeder, ama **wrongCount'u artırmaz**, **isWeak set etmez**, leitner box'ı **düşürmez**, prompt-fade'i düşürmez, asla otomatik Mon Lexique'e eklemez, item'ı **Build-eligible** tutar (asla Challenge). Leitner box değişmez; `dueAt` mevcut box'ta yenilenir (skip gibi nötr).

## Why
Kelimeyi bilen öğrenciyi sessizce cezalandırmamak ([[ADR-0002 calm-passive-mirror-mentor-tone]]).

## Alternatives Considered
- Near-miss = tam failure (eski davranış) — reddedildi.
- Near-miss = tam success — reddedildi (yine de bir sinyal; soft kayıt tutulur).

## Rejected Alternatives
Meaning-preserving slip'i failure saymak; near-miss'i tamamen görmezden gelmek.

## Consequences
`MASTERY_SNAPSHOT_VERSION` `mastery-v0.1`→`v0.2`; snapshot her çalıştırmada yeniden hesaplanır (migration yok — [[ADR-0009 events-source-of-truth]] re-derive ilkesi). **Staged strictness DEFERRED**: sonraki bandlar (L60/L70+), monolingual faz, yüksek promptFade, item maturity, gelecekteki `accentCriticality` sıkılaştırabilir. PR-E1/#193 (B7/B12) ile rafine edildi.

## Implementation References
`founder-self-learning-mastery-precision-policy` (tümü); p4 checkpoint (Challenge = weak-only, precision items Build-only); `203f817`; #193.

## Verification
Unit-tested (scoreEvents precision buckets).

## Supersedes / Superseded By
Supersedes: near-miss = failure davranışı. Superseded by: —

## Source Evidence
`06_decisions_history.md` D-23.

## Related
[[Mastery Model]] · [[ADR-0022 hub-derived-drills]] · [[Error Tracking System]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
