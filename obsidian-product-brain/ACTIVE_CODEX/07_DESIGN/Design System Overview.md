---
title: Design System Overview
aliases: [Design System Overview, Tasarım Sistemi, 07 Design MOC]
type: design-spec
domain: design
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/constants/theme.ts", "lemot-app/tailwind.config.js", "lemot-app/config/productStage.ts", "docs/obsidian/lemot-obsidian-customization-v0.md"]
code_refs: ["lemot-app/constants/theme.ts:1-47", "lemot-app/tailwind.config.js:9-35", "lemot-app/app/(tabs)/_layout.tsx"]
test_refs: ["lemot-app/scripts/tests/componentCopyGuard.test.ts"]
related: ["[[00 Le Mot Holy Codex]]", "[[Visual Language]]", "[[Cairn Brand Direction]]", "[[Copy and Tone]]", "[[V4 Studies Disposition]]", "[[Design Inventory]]"]
tags: [design, moc, index]
---

# Design System Overview

> [!canon] Purpose — 07_DESIGN klasörünün giriş kapısı: Cairn/Le Mot'un görsel dilinin, marka yönünün, ekran-ekran UI kararlarının ve tasarım-ops disiplininin haritası. Tek cümle: "Uygulama sakin, premium, dağ-yolculuğu hissi verir; ödül/oyunlaştırma dili yasaktır."

## Executive Summary

Cairn'in tasarım sistemi bugün **kısmen implemented, kısmen deferred**. IMPLEMENTED olan çekirdek: `constants/theme.ts` içindeki `P` renk paleti + `MOTIV` tonlama rotasyonu, `tailwind.config.js` içindeki `lm` renk namespace'i ve Newsreader/Outfit font çifti. PROPOSED/DEFERRED olan: V4-B "asymmetrical breath" görsel yön ([[V4 Studies Disposition]]) ve operatör-vault'taki "Tasarım Envanteri" ekran-durum kataloğu ([[Design Inventory]]). Ekran-seviyesi notların çoğu (Practice, Progress, Mon Lexique UI, Daily Review UI) **legacy-active ama dev-apk'ta FEATURES flag'leriyle GİZLİ** — yani kod var, tester yüzeyinde görünmüyor.

Bu klasördeki notların hepsi **tasarım/ops** düzeyindedir; hiçbiri repo kodunu değiştirmeye yetki vermez (Obsidian vault operatör-only, cloud yalnızca Sync Queue yazar).

## Why It Exists

Le Mot'un tek bir tasarım-sistemi dokümanı yoktu; görsel kararlar koda (`theme.ts`), canon dosyalarına (`CLAUDE.md`, `MASTER_PIPELINE`) ve operatör-vault'a (Tasarım Envanteri, V4 Studies) dağılmıştı. Bu MOC, "hangi görsel karar nerede yaşıyor + hangi statüde" sorusunu tek yerden cevaplar.

## Current Canon

- **Renk + font = IMPLEMENTED.** Kaynak: `constants/theme.ts` `P` objesi (`theme.ts:1-18`) ve `tailwind.config.js` `lm` namespace (`tailwind.config.js:12-33`). Detay: [[Visual Language]].
- **Ton = CANONICAL + kodla enforce ediliyor.** `MOTIV` rotasyonu (`theme.ts:20-47`) + banned-language copy guard testi (`componentCopyGuard.test.ts`). Detay: [[Copy and Tone]].
- **Marka = Le Mot → Cairn (dağ izi taşı).** Detay: [[Cairn Brand Direction]].
- **V4-B = SELECTED ama DEFERRED.** Detay: [[V4 Studies Disposition]].

## How It Works

### Katmanlar

| Katman | Nerede | Statü |
|---|---|---|
| Renk paleti (`P`) | `constants/theme.ts:1-18` | IMPLEMENTED |
| Tailwind mirror (`lm-*`) | `tailwind.config.js:12-29` | IMPLEMENTED |
| Fontlar (Newsreader/Outfit) | `tailwind.config.js:30-33`, `app/_layout.tsx` | IMPLEMENTED |
| Ton / MOTIV | `constants/theme.ts:20-47` | IMPLEMENTED + test-locked |
| Navigasyon (tab bar) | `app/(tabs)/_layout.tsx` | IMPLEMENTED (flag-gated) |
| Yolculuk görselleri | `constants/journey.ts` | IMPLEMENTED |
| V4-B görsel yön | operatör-vault V4 Studies | PROPOSED / DEFERRED |
| Ekran-durum envanteri | operatör-vault "Tasarım Envanteri" | PARTIAL (repo'da tam yok) |

### Guardrails

- Görsel cila **statüyü asla gizlemez** (obsidian-customization §10): şık bir arşiv notu hâlâ arşivdir.
- Hiçbir vault/tasarım notu repo kodu değiştiremez.
- Oyunlaştırma dili (XP/streak/level-up/"amazing") canon-wide FORBIDDEN — bkz. [[Copy and Tone]].

## Known Gaps

- Operatör-vault "Tasarım Envanteri" (ekran envanteri) repo'da tam commit'li değil → [[Missing Source Inputs]].
- V4 Studies spec / V4 standalone HTML / V4 source JSX repo'da otomatik-scope değil → [[V4 Studies Disposition]].

## Related Notes

- [[Visual Language]] · [[Cairn Brand Direction]] · [[Navigation Model]] · [[Home and Journey]] · [[Lesson Player]] · [[Copy and Tone]] · [[Accessibility]] · [[Design Inventory]] · [[V4 Studies Disposition]]
- Ana kod: [[Feature Flags Map]] · [[Product Stages and Feature Flags]]

<!-- gh-nav -->

## 🧭 GitHub Navigation

[⬆ README](../../README.md) · [🪨 Holy Codex](../00_START_HERE/00%20Le%20Mot%20Holy%20Codex.md) · [Current State](../00_START_HERE/03%20Current%20State.md) · [Open Loops](../00_START_HERE/05%20Open%20Loops.md)

**Bu klasördeki notlar (07_DESIGN):**

- [Accessibility](./Accessibility.md)
- [Cairn Brand Direction](./Cairn%20Brand%20Direction.md)
- [Copy and Tone](./Copy%20and%20Tone.md)
- [Daily Review UI](./Daily%20Review%20UI.md)
- [Design Inventory](./Design%20Inventory.md)
- [Design System Overview](./Design%20System%20Overview.md) ⟵ *bu not*
- [Home and Journey](./Home%20and%20Journey.md)
- [Interaction Patterns](./Interaction%20Patterns.md)
- [Lesson Player](./Lesson%20Player.md)
- [Mon Lexique UI](./Mon%20Lexique%20UI.md)
- [Motion and Animation](./Motion%20and%20Animation.md)
- [Navigation Model](./Navigation%20Model.md)
- [Practice](./Practice.md)
- [Progress](./Progress.md)
- [V4 Studies Disposition](./V4%20Studies%20Disposition.md)
- [Visual Language](./Visual%20Language.md)
