---
title: Home and Journey
aliases: [Home and Journey, Journey Screen, Ana Ekran, Mountain Map, Yolculuk]
type: design-spec
domain: design
status: active
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/app/(tabs)/index.tsx", "lemot-app/constants/journey.ts", "lemot-app/constants/theme.ts"]
code_refs: ["lemot-app/app/(tabs)/index.tsx:42-160", "lemot-app/constants/journey.ts:15-99", "lemot-app/constants/theme.ts:20-47"]
related: ["[[00 Le Mot Holy Codex]]", "[[Navigation Model]]", "[[Design System Overview]]", "[[Cairn Brand Direction]]", "[[Copy and Tone]]", "[[Lesson Player]]", "[[Daily Review UI]]"]
tags: [design, home, journey, implemented]
---

# Home and Journey

> [!canon] Purpose — "Journey" sekmesinin (Home) tasarımı: selamlama, motivasyon satırı, dağ-yolculuğu görseli ve L1–L6 ders kartlarının sıralı kilidi.

## Executive Summary

Home = **Journey sekmesi** (`app/(tabs)/index.tsx`), dev-apk'ta görünen tek sekme. IMPLEMENTED. Öğeleri: zamana duyarlı Fransızca selamlama (Bonjour./Bonsoir.), `MOTIV` rotasyonundan sakin bir motivasyon satırı, tamamlanan derse göre değişen dağ görseli, ve **L1–L6 ders kartları** (sıralı kilit: L(n+1), L(n) bitince açılır). Round 1'de Home L6 ile sınırlıdır — kart listesi `l.number >= 1 && l.number <= 6` ile filtrelenir (`index.tsx:160`).

## Current Canon

- Round 1 checklist §5: "Home exposes v1 L1–L6 with sequential unlock (L(n+1) after L(n)); no L7+, no legacy list, no Practice/Chat/Paywall/Premium/Word Graph/Mon Lexique."
- İlk açılışta Home değil **Lesson Zero** gelir; L1 bitince Home'a ulaşılır (`index.tsx:49-60`, checklist §5). Detay: [[Lesson Player]].

## How It Works

### Ekran öğeleri (IMPLEMENTED)

- **Selamlama:** `getHomeGreeting()` — 05:00–17:59 → `"Bonjour."`, 18:00–04:59 → `"Bonsoir."` (`index.tsx:37-40`). Cihaz yerel saatinden, kalıcı değil.
- **Motivasyon satırı:** `MOTIV` (`theme.ts:43-47`) — Fransız atasözü → yumuşak yansıma → yol yansıması, günlük indeksle döner. Ödül/baskı yok. Detay: [[Copy and Tone]].
- **Dağ görseli:** `getJourneyImage(highestLesson)` (`index.tsx:140`, `journey.ts:92-99`). Tamamlanan en yüksek derse göre 14 görselden biri.
- **Ders kartları:** `LessonCard`, `V1_LESSONS`'tan L1–L6 (`index.tsx:160`).
- **Daily Review overlay:** modal olarak mevcut (`DailyReviewOverlay`) ama dev-apk'ta `FEATURES.dailyReview=false` → yüzeye çıkmaz. Bkz. [[Daily Review UI]].

### Ders tamamlama işareti

Bir v1 ders bitince `prog["{number}-read_listen"] = true` yazılır; Home aynı anahtarı okuyup L1–L6 lineer kilidi sürer — "no scoring, no ceremony" (`index.tsx:29-32`). Sıralı kilit tek mekanizma; puan/yüzde yok.

### Yolculuk faz haritası (görsel anlatı)

`journey.ts:52-72` (JOURNEY_PHASES): tırmanış (A1) → dik tırmanış (A2) → **zirve (image 8) = "You think in French now" / Weave→tam Fransızca dönüşü** → iniş (yeşil geri döner) → varış → **rehber (image 14) = "Now you show the way"**. Bu, [[Cairn Brand Direction]] metaforunun somut hâli.

> [!warning] `journey.ts:53` yorumu "For the current 24 lessons (A1)" der; faz eşikleri (maxLesson 5/11/17/24…) legacy 24-lesson syllabus'una göre kalibre. v1 syllabus'ta (Core 150, Campfire ~L24) faz-eşik yeniden kalibrasyonu açık bir iş → [[Needs Verification]] · [[Spec Runtime Divergences]].

## Guardrails

- Home hiçbir oyunlaştırma göstermez: streak/XP/rozet yok, yalnızca sakin görsel + sıralı kilit.
- Round 1'de L7+ görünmez (`number <= 6` cap); L7–L15 dosyaları kayıtlı olsa da Home göstermez.

## Known Gaps

- Journey faz eşikleri legacy 24-lesson'a göre; v1 spine için yeniden haritalama gerekir.
- Sign In butonu Home'da mevcut ama Supabase env yoksa görünmez (Round 1: Supabase absent).

## Related Notes

- [[Navigation Model]] · [[Lesson Player]] · [[Daily Review UI]] · [[Copy and Tone]] · [[Cairn Brand Direction]]
