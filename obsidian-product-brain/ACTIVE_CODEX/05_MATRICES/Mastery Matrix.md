---
title: Mastery Matrix
aliases: [Mastery Matrix]
type: architecture
domain: learning
status: canonical
canon_status: canonical
implementation_status: fixture-only
verification_status: unit-tested
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["content/learning-engine/mastery", "docs/status/founder-self-learning-mastery-precision-policy.md"]
related: ["[[Mastery Model]]", "[[Review and Recycling System]]", "[[Error Tracking System]]"]
tags: [matrix, mastery]
---

# Mastery Matrix

> Mastery durumu × (kaynak / eşik / runtime). **Motor tarafı gerçek kod ama
> tested-only (sandbox), sevkedilen yüzeyde değil.** Anlatım: [[Mastery Model]].

| Mekanik | Değer | Kaynak | Runtime |
|---|---|---|---|
| Weak eşiği | `WEAK_THRESHOLD = 3` | mastery module | tested-only |
| Leitner kutuları | `[0, 1, 3, 7, 30]` gün | 5-box | tested-only |
| Prompt-fade | PF0 → PF3 | mastery | tested-only |
| monLexiqueStatus | hidden / added / weak | mon-lexique | deferred |
| Challenge | weak-only | practice-selector | tested-only |
| MasterySnapshot | counter-derived, pure `scoreEvents()` | mastery | tested-only |
| Near-miss precision | soft signal (`precisionCount`/`precisionTags`) — **asla failure/weak/Challenge değil** | precision policy | canonical |

| MasterySnapshot alanı | Anlam |
|---|---|
| seenCount / correctCount | ham sayaçlar |
| weakTags | 3+ hata → zayıf |
| precisionTags | punctuation/accent/spelling near-miss |
| box / due | Leitner |

> [!warning] Docs'ta geçen "9-state mastery machine" **runtime'da yok** —
> mastery counter-derived'dir (stored state machine değil). Bu bir docs-drift.
> [[Spec Runtime Divergences]].

> [!warning] v1 renderer (surface B) **event üretmediği** için bu mastery
> mekaniği sevkedilen APK'da **hiç çalışmaz.** [[Self-Producing Engine]].
