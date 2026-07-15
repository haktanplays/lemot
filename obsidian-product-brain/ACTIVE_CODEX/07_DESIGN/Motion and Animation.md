---
title: Motion and Animation
aliases: [Motion and Animation, Hareket, Animasyon, Transitions]
type: design-spec
domain: design
status: draft
canon_status: provisional
implementation_status: unknown
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/constants/theme.ts", "lemot-app/constants/journey.ts", "docs/obsidian/lemot-obsidian-customization-v0.md"]
code_refs: ["lemot-app/constants/theme.ts:17", "lemot-app/constants/journey.ts:15-30"]
related: ["[[00 Le Mot Holy Codex]]", "[[Interaction Patterns]]", "[[Visual Language]]", "[[Home and Journey]]", "[[Cairn Brand Direction]]", "[[Needs Verification]]"]
tags: [design, motion, animation, low-evidence]
---

# Motion and Animation

> [!warning] Bu not büyük ölçüde **UNKNOWN**. Repo'da özel bir hareket/animasyon tasarım-sistemi kanıtı (Reanimated worklet'leri, geçiş spec'i, timing token'ları) bu pass'te bulunmadı. Aşağıdaki az sayıda somut kanıt dışında, motion dili henüz kanonik olarak yazılmamıştır.

## Executive Summary

Cairn'in hareket dili **düşük-kanıtlı**. Somut olarak bilinen: (1) elevation neredeyse yok — tek yumuşak gölge token'ı `sh = 0 1px 4px rgba(44,40,37,0.06)` (`theme.ts:17`); (2) dağ-yolculuğu görselleri tamamlanan derse göre *değişir* (state-driven görsel geçişi, `journey.ts`), ama bu bir animasyon değil resim değişimidir; (3) marka hissi "kalp atışını yükseltmeyen" sakinlik ister (obsidian-customization §1) — yani agresif/oyunlaştırıcı animasyondan kaçınılır. Bunun ötesindeki timing/easing/geçiş kararları henüz belgelenmemiş.

## Current Canon

- Elevation minimal: tek `sh` token'ı, çok düşük (`theme.ts:17`). Kartlar düz, gölge neredeyse görünmez.
- His kuralı: "lower the heart rate, not raise it" (obsidian-customization §1) → ani/parlak/zıplayan hareket marka-dışı. Bkz. [[Cairn Brand Direction]].
- Journey görsel değişimi milestone/tamamlama tetiklidir (`journey.ts:8-12` yorum: "image transitions at 1→2, 2→3, 3→4, 6 (camp)"). Bu bir *state* geçişi, animasyon spec'i değil.

## How It Works (bilinen)

- Ders içi geçişler `screenIndex` state değişimiyle olur; özel animasyon katmanı doğrulanmadı → varsayılan Expo/RN geçişi olması muhtemel. [UNKNOWN]
- Doğru cevapta ödül-animasyonu **yok** (ceremony yok, [[Interaction Patterns]]).

## Guardrails

- Hiçbir animasyon oyunlaştırma (konfeti, zıplayan rozet, "level up" efekti) getiremez — [[Copy and Tone]] banned-language ile aynı ruh.
- Reduce-motion / erişilebilirlik açısından hareket zorunlu bilgi taşımamalı → [[Accessibility]] (bu da doğrulanmadı).

## Known Gaps / Open Questions

> [!open-loop] Motion tasarım dili yazılmamış: geçiş timing/easing token'ları, ekran-değişim animasyonu, reduce-motion desteği hepsi UNKNOWN. → [[05 Open Loops]] · [[Needs Verification]]

- Reanimated/worklet kullanımı repo'da doğrulanmadı (proje CLAUDE.md "Reanimated v4" önerir ama fiili kullanım bu pass'te taranmadı).
- V4-B "asymmetrical breath" yönü hareket/ritim de içerebilir ama DEFERRED → [[V4 Studies Disposition]].

## Related Notes

- [[Interaction Patterns]] · [[Visual Language]] · [[Home and Journey]] · [[Accessibility]] · [[V4 Studies Disposition]]
