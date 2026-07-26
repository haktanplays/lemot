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
last_updated: 2026-07-26
last_reviewed: 2026-07-26
amended_by: ["docs/bibles/mastery-evidence/MASTERY_EVIDENCE_FOUNDER_RATIFICATION_v0.1.md"]
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
| Near-miss / precision tag'leri | **teknik tag** — polariteyi tek başına belirlemez (founder FQ-1). *Anlamı koruyan* kayma soft signal'dir (`precisionCount`/`precisionTags`, weak/Challenge değil); *anlamı değiştiren* ikame negatif kanıt olabilir; **anlamı bilinmeyen olay ne weakness ne de tam precision kredisi kurar** | founder FQ-1 (2026-07-26) | scope-amended |

| MasterySnapshot alanı | Anlam |
|---|---|
| seenCount / correctCount | ham sayaçlar |
| weakTags | 3+ hata → zayıf |
| precisionTags | punctuation/accent/spelling near-miss |
| box / due | Leitner |

> [!canon] **RESOLVED 2026-07-26 (founder FQ-5).** Docs'ta geçen "9-state mastery machine"
> **runtime'da yok** ve olmaması **artık kanondur**: sayaç-türevli projeksiyon semantik
> kaynak-of-truth'tur, **evrensel adlandırılmış mastery merdiveni yoktur** ve **"9-state mastery"
> `SUPERSEDED`**tir. Bu **artık açık bir docs-drift sorusu değildir.** Amaç-özel projeksiyonlar
> (Mon Lexique · Practice · Curriculum readiness · UX) yalnızca **amacını ve snapshot'tan eşlemesini
> belirtmek**, **evrensel mastery durumu olduğunu iddia etmemek** ve **başka bir projeksiyonun yerine
> geçmemek** koşuluyla serbesttir. **Bu matristeki hiçbir satır evrensel mastery gerçeği değildir.**
> [[Spec Runtime Divergences]]. Yetki: `MASTERY_EVIDENCE_FOUNDER_RATIFICATION_v0.1.md` §4d.

> [!warning] v1 renderer (surface B) **event üretmediği** için bu mastery
> mekaniği sevkedilen APK'da **hiç çalışmaz.** [[Self-Producing Engine]].
