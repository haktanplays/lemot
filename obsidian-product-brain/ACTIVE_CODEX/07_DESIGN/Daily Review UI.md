---
title: Daily Review UI
aliases: [Daily Review UI, Günlük Tekrar UI, DailyReviewOverlay]
type: design-spec
domain: design
status: legacy-active
canon_status: provisional
implementation_status: legacy-active
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/components/DailyReviewOverlay.tsx", "lemot-app/app/(tabs)/index.tsx", "lemot-app/config/productStage.ts"]
code_refs: ["lemot-app/app/(tabs)/index.tsx:21-25", "lemot-app/config/productStage.ts:103-105", "lemot-app/config/productStage.ts:80"]
related: ["[[00 Le Mot Holy Codex]]", "[[Home and Journey]]", "[[Daily Review]]", "[[Feature Flags Map]]", "[[Review and Recycling System]]", "[[Copy and Tone]]"]
tags: [design, daily-review, legacy-active, dev-apk-hidden]
---

# Daily Review UI

> [!warning] impl_status: **legacy-active ama dev-apk'ta GİZLİ.** `DailyReviewOverlay` bileşeni Home'a import edilir ve mevcuttur, ama `FEATURES.dailyReview=false` olduğu için dev-apk tester yüzeyinde açılmaz.

## Executive Summary

Daily Review UI = Home ekranında 5-kelime günlük hedef kartı + weak-spot öncelikli, modal quiz overlay (`DailyReviewOverlay`). **Kod var, dev-apk'ta gizli.** Gizleme gerekçesi: overlay legacy flashcard havuzundan (öğretilmemiş kelime) çeker ve v1 Round 1'in review yüzeyi yok (`productStage.ts:103-105`). Streak takibi locked-decision 2026-04-23 ile kaldırılmıştır (streak dili canon-wide yasak — UX.1).

## Current Canon

- Görünürlük: `FEATURES.dailyReview` — **sandbox: true (satır 80), dev-apk: false (satır 105), public-beta: true (satır 125)**.
- Gerekçe (`productStage.ts:103-105`): "Daily Review hidden in dev-apk: it draws from the legacy flashcard pool (untaught vocabulary) and v1 Round 1 has no review surface."
- Round 1 checklist §4/§5: "no Practice/Chat/Paywall/Premium/Word Graph/Mon Lexique" ve dailyReview flag off.

## How It Works (bugünkü, gizli)

- Home `DailyReviewOverlay` + `genReviewItems` import eder (`index.tsx:21-25`); `updateDailyReview`/`dailyRev` state ile beslenir.
- Depolama: legacy `lm7` içinde `dr: {date, count}` (streak/`xp` alanları Sprint commit `a883b2a` ile kaldırıldı). Bkz. [[Storage Architecture]].
- dev-apk'ta flag kapalı → kart/modal render edilmez.

> [!warning] Streak KALDIRILDI. Eski Daily Review streak sayacı içeriyordu; locked-decision 2026-04-23 ile kaldırıldı, "days on the path" ile değiştirilmesi planlandı (UX.1). Streak/"come back tomorrow" baskı dili FORBIDDEN — bkz. [[Copy and Tone]].

## Guardrails

- Günlük tekrar yalnızca uygun ders havuzundan çekmeli (checklist smoke focus: "Daily Review only eligible lesson pool") — legacy havuz sorunlu, bu yüzden dev-apk'ta kapalı.
- Baskı dili yok: "5-word daily goal" sakin bir hedef, ceza/ödül değil.

## Known Gaps

- Daily Review'ın v1 spine + learning-engine mastery (weak-only Challenge, WEAK_THRESHOLD=3) ile hizalanması yapılmadı; şu an legacy havuza bağlı. Pedagojik hedef: [[Daily Review]] · [[Review and Recycling System]].
- Public-beta'da açık olacak ama içerik-hizalama önce çözülmeli → [[Needs Verification]].

## Related Notes

- [[Home and Journey]] · [[Daily Review]] · [[Review and Recycling System]] · [[Feature Flags Map]] · [[Copy and Tone]]
