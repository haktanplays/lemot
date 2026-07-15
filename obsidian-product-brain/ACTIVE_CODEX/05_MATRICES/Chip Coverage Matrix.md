---
title: Chip Coverage Matrix
aliases: [Chip Coverage Matrix]
type: architecture
domain: learning
status: canonical
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/audits/L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md", "docs/audits/l1_l15_chip_inventory/", "content/itemRegistry.ts"]
related: ["[[Chip Taxonomy]]", "[[Registry Usage Matrix]]", "[[L1 Survival Kit]]", "[[Error Tracking System]]"]
tags: [matrix, chip]
---

# Chip Coverage Matrix

> Chip × (ilk ders / rol / runtime yüzey / accounting itemId / mastery / error /
> lexique / review). Kaynak: L1_L15 chip inventory audit (16 ders / 80 chip) +
> CSV'ler (`docs/audits/l1_l15_chip_inventory/`). Taxonomy: [[Chip Taxonomy]].

> [!warning] Bu matris **tam chip-tablosu değildir** (80 chip); kanonik izleme
> deseni + kritik satırları verir. Tam envanter operatör CSV'lerinde
> (`actual_lesson_inventory.csv`, `candidate_inventory.csv`, `item_registry_usage.csv`,
> `not_chip_surfaces.csv`, `risk_review.csv`). L1 çalışan havuzu: [[L1 Survival Kit]].

## İzleme deseni (her chip için doldurulmalı)

| Alan | Kaynak |
|---|---|
| First lesson | actual_lesson_inventory.csv |
| Role (spine/active/supported/recognition/pattern/package/formula) | registry `status` + taxonomy |
| Runtime surface | hangi ekran tipinde görünür |
| Accounting itemId | itemRegistry.ts |
| Mastery | scoreEvents (engine, tested-only) |
| Error hook | ErrorTagCode |
| Lexique | monLexiqueStatus (deferred) |
| Review | Leitner box |

## Kritik satırlar (audit)

| Chip | Rol | itemId? | Not |
|---|---|---|---|
| `bonjour`/`merci`/`s'il vous plaît` | formula chunk | ✅ | whole olarak kalır |
| `je voudrais` | spine | ✅ | üretim iskeleti |
| `ne ___ pas` | pattern | ✅ (frame chip, PR #168 kanonu) | validator muaf |
| `un café`/`de l'eau` | noun-package | ✅ | package chip |
| **`ici`** | (produced chip) | ❌ **YOK** | R3 identity gap |
| **`faim`** | (produced chip) | ❌ **YOK** | R3 identity gap |
| `oui` | active | ✅ | R2 demotion adayı ([[Watchlist]]) |
| `je ne peux pas` / `est-ce que ...` | **NOT a chip** | n/a | composed production, lint pinli |

## Sağlık

- Audit verdict: **CLEAN_WITH_REVIEW_ITEMS** (0 ihlal).
- Dormant: 11 item (tu/vous ailesi vb.).
- Candidate inventory: 448 satır, hiçbiri registry'ye terfi etmedi (`add_to_registry_now=no`).

> [!open-loop] R3 identity gap (`ici`/`faim`) → mastery event hiçbir şeye
> bağlanmıyor → [[Technical Debt]] · [[05 Open Loops]].
