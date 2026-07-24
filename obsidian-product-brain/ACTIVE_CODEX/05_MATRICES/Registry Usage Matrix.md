---
title: Registry Usage Matrix
aliases: [Registry Usage Matrix]
type: architecture
domain: architecture
status: canonical
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["content/itemRegistry.ts", "lemot-app/scripts/shipped-item-ids.json", "docs/audits/L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md"]
related: ["[[Registry Architecture]]", "[[Chip Coverage Matrix]]", "[[Contradictions]]", "[[Technical Debt]]"]
tags: [matrix, registry]
---

# Registry Usage Matrix

> `ITEM_REGISTRY` (`content/itemRegistry.ts`) — frozen `as const satisfies
> Record<string, LearningItem>`. Aşağıdaki sayılar **kaynaklar arası tutarsızdır**;
> her biri kaynağıyla verilir (uydurma tek sayı yok).

## Sayım (kaynağa göre)

| Kaynak | Sayı | Not |
|---|---|---|
| `itemRegistry.ts` (mimari kanıtı) | **54 item** | 34 chunk / 5 noun / 4 pronoun / 3 verb / 3 grammar-nugget / 2 adverb / 2 sound-pattern / 1 micro-contrast |
| status dağılımı (itemRegistry) | 32 active / 16 supported / 6 recognition | |
| `shipped-item-ids.json` (manifest) | **56 id** | K3 çift yönlü validate:content bu 54-vs-56 drift'i yakalamak için var |
| L1_L15 audit (2026-07) | **52 item**, 41 kullanılıyor, 11 dormant | audit anındaki değer; 26 active / 11 supported / 4 recognition |

> [!warning] 54 vs 56 vs 52 — üç farklı kaynak, üç farklı sayı. Bu bir
> **çelişki/borç**tur, yok sayma. [[Contradictions]] · [[Registry Architecture]].

## Kullanım sınıfları (L1_L15 audit)

| Sınıf | İçerik | Aksiyon |
|---|---|---|
| Used (41) | 26 active / 11 supported / 4 recognition | — |
| Dormant (11) | tu/vous ailesi, `noun-idee` vb. (R4) | registry hygiene pass |
| Identity gap (R3) | `ici`, `faim` — chip üretiliyor, itemId **YOK** | mastery event hiçbir şeye bağlanmıyor → fix deferred |
| "Not a chip" (22) | `je ne peux pas`, `vous pouvez m'aider ?`, tüm `est-ce que` soruları, `j'y vais`/`on y va`, `il faut/je dois + inf.` | lint ile pinlenmiş composed production |

Detaylı chip izleme: [[Chip Coverage Matrix]].
