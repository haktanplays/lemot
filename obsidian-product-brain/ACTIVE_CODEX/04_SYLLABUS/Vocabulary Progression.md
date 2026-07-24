---
title: Vocabulary Progression
aliases: [Vocab Ladder, Kelime İlerlemesi, Owned Vocabulary]
type: system-spec
domain: syllabus
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/syllabus/L10-L20-band-map-v0.md", "docs/audits/L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md"]
related: ["[[00 Le Mot Holy Codex]]", "[[Syllabus Overview]]", "[[Grammar Progression]]", "[[Chip Taxonomy]]", "[[Mon Lexique]]"]
tags: [syllabus, vocabulary, progression]
---

# Vocabulary Progression

> [!canon] Purpose — L1→L15 boyunca **sahiplenilen (owned) kelime/chunk havuzunun** nasıl büyüdüğü. Fiil-motoru omurgası için → [[Grammar Progression]]; chip statü katmanları için → [[Chip Taxonomy]].

## Executive Summary

Vocab, tema kümesiyle değil **niyet (intent) fonksiyonuyla** büyür: selamla, kibarca iste, kurtar, kimliğini söyle, reddet, ihtiyaç belirt, nesne iste, hareket et, "nerede" sor, küçük eylem/pause. Spine dar; **narrowness payload'da yaşar, spine'da değil** — "engine başına ~1.5 payload item" (`audit:466`). **[IMPLEMENTED analysis]**

## Current Canon — owned-forms ladder (L1→L10 baseline)

`band-map:21-33` (CANONICAL owned-forms table):

| Fonksiyon | Owned form | İlk ders |
|---|---|---|
| Kibarca iste | `je voudrais`, `s'il vous plaît` | L1 |
| Selamla / kurtar | `bonjour` / `merci` / `je ne comprends pas` | L1–L2 |
| Kimlik | `je suis…` | L2 |
| Olumsuzla | `ne…pas` | L3 |
| İhtiyaç / durum | `j'ai besoin de` / `j'ai faim` | L4 |
| Artikel (hafif) | `un/une`, `c'est le/la` | L5 |
| Hareket | `je vais à`, `on va` | L7 |
| Kontrollü "nerede" | `où est…?`, `c'est où?` | L8 |
| Küçük eylem / pause | `faire une pause` | L9 |
| Yeniden birleştir | (recombine) | L10 |

## Payload counts (candidate quarry vs surfaced)

Per-lesson candidate inventory sayıları (`candidate_inventory.csv`, `audit:169`): L1 21 · L2 16 · L3 18 · L4 17 · L5 15 · L6 25 · L7 29 · L8 33 · L9 34 · L10 32 · L11 39 · L12 38 · L13 41 · L14 44 · L15 46.

> [!warning] **30-item floor** L1–L6 için fabrikasyon olmadan ulaşılamaz (L7 = 29); owned havuz o kadar erken küçük; sayı L8'den itibaren 30'u geçer (`audit:171`). Quarry disiplini: her satırda `add_to_registry_now = no/already-registered`; hiçbir candidate ders yüküne çevrilmez (`:173`).

## Four functional holes (Spine Narrowness Analysis)

> [!open-loop] Haktan spine'ı "çok dar" işaretledi; teşhis: darlık payload'da. Dört fonksiyonel boşluk (`audit:469-473`), hepsi Haktan'ı bekliyor (R-A…R-E, `:492-499`):
> 1. **Repair pair shipped değil** (`je ne comprends pas` / `vous pouvez répéter?`) ama L13 onları owned varsayıyor — canlı spec-vs-shipped tutarsızlığı.
> 2. **oui paradox** — yes/no sorabiliyor ama "evet" cevaplayamıyor.
> 3. **excusez-moi** Future'da park edilmiş, oysa her L8+ sahne istiyor.
> 4. **state/feeling gap** — `fatigué` / `j'ai soif` birçok spec istiyor, hiçbiri ship etmiyor.
> → [[05 Open Loops]].

## Known Gaps
- **R3 identity gap:** `ici`, `faim` registry item'sız chip → mastery event'i tutunacak yer yok (`audit:43`). Fix DEFERRED. → [[Mon Lexique]].
- **R4:** 11 dormant registry item (hiç referans edilmemiş; zararsız) → registry hijyen pass'i bekliyor.

## Related Notes
[[Syllabus Overview]] · [[Grammar Progression]] · [[Chip Taxonomy]] · [[Mon Lexique]] · [[Phenomena Progression]]
