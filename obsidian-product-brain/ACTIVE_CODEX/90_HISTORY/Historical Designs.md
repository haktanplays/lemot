---
title: Historical Designs
aliases: [Eski Tasarımlar, V4 V7 Studies, Historical Design]
type: historical
domain: history
status: active
canon_status: historical
implementation_status: legacy-unreachable
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["CLAUDE.md", "docs/MASTER_PIPELINE_v1.2.1.md", "lemot-app/constants/theme.ts"]
related: ["[[00 Le Mot Holy Codex]]", "[[History Index]]", "[[Design System Overview]]", "[[Cairn Brand Direction]]", "[[V4 Studies Disposition]]"]
supersedes: []
superseded_by: ["[[Design System Overview]]", "[[Cairn Brand Direction]]"]
tags: [history, design, branding]
---

# Historical Designs

> [!historical] Bu not, eski **görsel dil, marka ve tasarım çalışmalarını**
> kaydeder. Güncel tasarım kanonu için [[Design System Overview]] ve
> [[Cairn Brand Direction]]'a git. Buradaki hiçbir yön otomatik aktif değildir.

## 1. Le Mot v7 görsel dili — HISTORICAL

- **Palet (`P` objesi):** red #C0392B, green #27AE60, amber #E67E22, purple
  #7C3AED. (Bu renk değerleri güncel `constants/theme.ts` paletinde de yaşıyor —
  brick #C0392B, green #27AE60, amber #E67E22, purple #7C3AED — yani renkler
  taşındı, ama "Le Mot" marka çerçevesi superseded.)
- **Fontlar:** Newsreader (serif, French text) + Outfit (sans-serif, UI). Bu font
  ikilisi **bugün de güncel** — bkz. [[Visual Language]].
- **Ürün olarak "React artifact":** v7 tek-dosya React artifact olarak da vardı
  (`le-mot-v7.jsx`). Standalone Expo/React Native migration Sprint 7'de tamamlandı.

## 2. "Franglais" → "Weave" marka değişikliği — HISTORICAL olay, güncel sonuç

> [!historical] "Franglais" adı trademark distinctiveness için "**Weave**"e
> çevrildi. Tipler `WeaveItem`/`WeaveBlank`, bileşenler `WeaveFill`/`CombineWeave`,
> lesson property `weave` **aynen korundu**. Weave mekaniğinin kendisi bugün de
> killer feature ([[Weave System]]); sadece isim tarihi tarihsel.

## 3. V4 Studies / V4-B "asymmetrical breath" — SELECTED ama DEFERRED

> [!warning] V4-B "asymmetrical breath" **tercih edilen yön olarak SEÇİLDİ**, ama
> global V4-B redesign **ertelendi** (Dev APK smoke / internal test feedback'e
> kadar; explicit reactivation olmadan açılmaz). Bu ne "tarihsel çöp" ne de "aktif
> iş" — seçili-ama-bekleyen. Bir sprint'e sızdırılmamalı. Güncel disposition:
> [[V4 Studies Disposition]].
- V4 Studies spec / V4 standalone HTML / V4 source JSX = tasarım kaynağı; otomatik
  implementation scope **değil**.
- Reactivation sinyali: kullanıcı açıkça "V4-B implementasyonunu aç/başlat" derse.

## 4. Cairn marka yönüne köprü

> [!canon] Güncel marka **Cairn** — patika taş yığını (trail-marker) metaforu.
> Palet parchment #FAF9F7 / ink #2C2825 tabanlı; Newsreader + Outfit fontları
> korunur. Sakin, premium mentor tonu; XP/streak/reward görsel dili yasak.
> Detay: [[Cairn Brand Direction]], [[Copy and Tone]], [[Design System Overview]].

Eski↔yeni:

| Boyut | v7 (HISTORICAL) | Cairn (CURRENT) |
|---|---|---|
| Marka | "Le Mot" (kelime) | "Cairn" (taş yığını / trail marker) |
| Killer mekanik adı | "Franglais" → "Weave" | "Weave" (sabit) |
| Görsel yön | v7 studies | V4-B seçili ama deferred |
| Ton | milestone + (kaldırılmış) XP/streak | sakin passive-mirror mentor |

## 5. Design Inventory / Tasarım Envanteri

> [!historical] Ekran sınıflandırması (VALID / REDESIGN / NEW / ARCHIVE) ve V4
> Studies materyali büyük ölçüde **operator vault'ta** (Tasarım Envanteri.md).
> Repoda tam yansımıyor → [[Missing Source Inputs]]. Güncel envanter işi:
> [[Design Inventory]].

## Related Notes
- Yukarı: [[00 Le Mot Holy Codex]] · [[History Index]]
- Güncel karşılıklar: [[Design System Overview]] · [[Cairn Brand Direction]] · [[V4 Studies Disposition]] · [[Visual Language]]
- Kardeş: [[Historical User Journeys]]
