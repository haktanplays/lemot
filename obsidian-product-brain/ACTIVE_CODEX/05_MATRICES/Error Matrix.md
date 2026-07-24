---
title: Error Matrix
aliases: [Error Matrix]
type: architecture
domain: learning
status: canonical
canon_status: canonical
implementation_status: fixture-only
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["content/learning-engine/", "lemot-app/scripts/shipped-error-tags.json"]
related: ["[[Error Tracking System]]", "[[Exercise Matrix]]", "[[Review and Recycling System]]"]
tags: [matrix, error]
---

# Error Matrix

> Error tag → (üreten egzersiz / ders / recovery). **Error taxonomy motor
> yüzeyinde (C) yaşar; v1 renderer (B) event üretmez.** Anlatım: [[Error Tracking System]].

## Tag envanteri (kaynak)

| Küme | Sayı | Not (YASA 3 dondurulmuş) |
|---|---|---|
| `ErrorTagCode` union | 16 değer | learner-evidence anahtarı |
| `WEAK_POINT_TAGS` | 27 değer | zayıf-nokta etiketleri |
| `shipped-error-tags.json` | 54 tag | WEAK_POINT_TAGS + ERROR_TAG_CODES + ERROR_TAXONOMY id + içerik kullanımı |

> [!warning] 16 vs 27 vs 54 farklı kümelerdir (union / weak-points / dondurulmuş
> manifest birleşimi) — çelişki değil, farklı roller. [[Error Tracking System]].

## Tag → recovery deseni (spec)

| Kanıt anahtarı | Ne | Sonuç |
|---|---|---|
| `weakTags` | 3+ hata bir tag'de | Daily Review / Challenge önceliği |
| `precisionTags` | punctuation/accent/spelling near-miss | soft — failure değil |
| `resultTag` | tur sonucu | telemetri |

Recovery merdiveni (hint/struggle) = V9 `fill_without_recovery` — **DEFERRED**
(trapReason hammaddesi şemada kısmen var). [[Validation Gates]].

> [!open-loop] Tag → drill türetme (deriveDrill) motor tarafında tested-only;
> sevkedilen yüzeye bağlı değil. [[Content Production Workflow]].
