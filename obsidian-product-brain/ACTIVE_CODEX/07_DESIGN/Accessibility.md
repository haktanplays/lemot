---
title: Accessibility
aliases: [Accessibility, Erişilebilirlik, a11y]
type: design-spec
domain: design
status: draft
canon_status: provisional
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/constants/theme.ts", "docs/DEV_APK_SMOKE_TEST_CHECKLIST.md", "docs/obsidian/lemot-obsidian-customization-v0.md"]
code_refs: ["lemot-app/constants/theme.ts:1-18"]
related: ["[[00 Le Mot Holy Codex]]", "[[Visual Language]]", "[[Interaction Patterns]]", "[[Motion and Animation]]", "[[Design Inventory]]", "[[Needs Verification]]"]
tags: [design, accessibility, a11y, partial, low-evidence]
---

# Accessibility

> [!warning] Erişilebilirlik büyük ölçüde **doğrulanmamış / kısmi**. Repo'da özel bir a11y tasarım-sistemi (kontrast denetimi, screen-reader label stratejisi, reduce-motion, dinamik tip) kanıtı bu pass'te sistematik olarak bulunmadı. Aşağıdakiler eldeki dolaylı kanıtlardır.

## Executive Summary

Cairn'de erişilebilirliği *dolaylı* olarak destekleyen tasarım kararları var (sıcak kontrastlı palet, "asla saf siyah" mürekkep, TTS/dinleme, klavye-input çakışması kontrolü smoke checklist'te), ama **kanonik bir a11y spec'i yazılmamış**. Round 1 smoke checklist §10 birkaç somut görsel/cihaz kontrolü içerir; bunun ötesi UNKNOWN.

## Bilinen somut kanıtlar

- **Kontrast/renk:** Ana mürekkep `#2C2825` (asla `#000`), zemin `#FAF9F7`, ikincil `#6B6560`, üçüncül `#A39E99` (`theme.ts:3-5`). Sıcak yüksek kontrast; ama WCAG AA/AAA oranları **hesaplanıp doğrulanmadı** → [[Needs Verification]].
- **TTS / dinleme:** Fransızca metin seslendirilir; checklist §10 "TTS French-only, no placeholder speech" ister. Weave Fill placeholder'ları seslendirmez. (İşitsel erişim değil, telaffuz desteği amaçlı.)
- **Dokunma hedefleri:** checklist §10 "tap targets", "small viewport no clipping", "keyboard doesn't block inputs", "Android back-button no dead ends" — bunlar operatör cihaz smoke'unda elle kontrol edilir (device-verified değil, checklist-level).
- **Karanlık mod (vault önerisi):** obsidian-customization §2 "dark = soft charcoal, never `#000`; accents desaturate ~15%" — ama bu **vault** için PROPOSED, uygulama karanlık modu doğrulanmadı.

## Guardrails

- Renk tek başına anlam taşımamalı (yeşil=doğru/kırmızı=hata semantik ama metin/ikon ile desteklenmeli) — bu ilke yazılı değil, [[Needs Verification]].
- Hareket zorunlu bilgi taşımamalı (reduce-motion) → [[Motion and Animation]] ile aynı açık uç.

## Known Gaps / Open Questions

> [!open-loop] Kanonik a11y spec'i yok: kontrast oranları hesaplanmadı, screen-reader label stratejisi doğrulanmadı, dinamik tip/font ölçekleme desteği bilinmiyor, reduce-motion yok. → [[05 Open Loops]] · [[Needs Verification]]

- Ekran-durum kataloğunda (empty/loading/error) erişilebilir durum tasarımı operatör-vault "Tasarım Envanteri"nde olabilir → [[Design Inventory]] · [[Missing Source Inputs]].

## Related Notes

- [[Visual Language]] · [[Interaction Patterns]] · [[Motion and Animation]] · [[Design Inventory]]
