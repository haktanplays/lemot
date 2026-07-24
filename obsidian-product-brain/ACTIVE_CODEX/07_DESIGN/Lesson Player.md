---
title: Lesson Player
aliases: [Lesson Player, Ders Oynatıcı, LessonRendererV1, Ders Akışı UI]
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
source_of_truth: ["lemot-app/components/lesson-v1/LessonRendererV1.tsx", "lemot-app/content/lessonTypes.ts", "lemot-app/app/v1-lesson/[id].tsx", "lemot-app/app/lesson-zero.tsx", "lemot-app/app/how-weave-works.tsx"]
code_refs: ["lemot-app/components/lesson-v1/LessonRendererV1.tsx:10-47", "lemot-app/app/lesson-zero.tsx", "lemot-app/app/how-weave-works.tsx"]
test_refs: ["lemot-app/scripts/tests/componentCopyGuard.test.ts"]
related: ["[[00 Le Mot Holy Codex]]", "[[Home and Journey]]", "[[Interaction Patterns]]", "[[Copy and Tone]]", "[[Lesson Flow]]", "[[Weave]]", "[[Design System Overview]]"]
tags: [design, lesson, player, implemented]
---

# Lesson Player

> [!canon] Purpose — Bir dersin ekran-ekran nasıl oynatıldığı: v1 renderer, 7 donmuş ekran tipi, ilerleme, tamamlama ve giriş köprüleri (Lesson Zero, How Weave Works).

## Executive Summary

Sevkedilen ders oynatıcısı = **`LessonRendererV1`** (Runtime B, static-authored v1). Bir ders `screens[]` dizisidir; renderer `screenIndex` ile tek tek ilerletir ve son ekrandan sonra CompletionView gösterir. Yedi donmuş ekran tipi vardır (`content/lessonTypes.ts`): **MeetCard, InsightCard, FillWithTraps, Weave, SayItYourWay, NaturalReveal, Recap.** İki interstitial köprü ders akışını sarar: **Lesson Zero** (ilk açılış) ve **How Weave Works** (`/how-weave-works`, otomatik gösterilmez, erişilebilir).

> [!warning] Üç paralel runtime var — bu not **Runtime B** (sevkedilen v1) hakkındadır. Runtime A (legacy 24-lesson) dev-apk'ta gizli; Runtime C (learning-engine) sandbox-only. Karıştırma. Bkz. [[Runtime Content Architecture]].

## Current Canon

- Sevkedilen ekran akışı v1'dir; `LessonRendererV1` her ekranı `lesson.screens[screenIndex]` üzerinden render eder (`LessonRendererV1.tsx:27-33`).
- Round 1 mandatory run = L1 uçtan uca: tüm ekranlar sırayla; Fill trap'leri grade+lock; Weave input/check/reveal; ardışık Weave ekranları metin taşımaz; Say It Your Way model-cevap AI-network'süz; completion ekranı; "Back to Home" (checklist §6).

## How It Works

### 7 donmuş ekran tipi (IMPLEMENTED)

Kaynak `content/lessonTypes.ts`; renderer import'ları `LessonRendererV1.tsx:10-16`.

| Ekran | Rol | Bugünkü etkileşim |
|---|---|---|
| `MeetCard` | Yeni malzemeyle tanış | Statik "Continue" ekranı |
| `InsightCard` | Mikro-mantık / "notice" | Statik "Continue" ekranı |
| `FillWithTraps` | Tuzaklı boşluk doldurma | Grade + lock (etkileşimli) |
| `Weave` | Fransızca iskelet + İngilizce bilinmeyen | input / check / reveal |
| `SayItYourWay` | Serbest üretim | Model-cevap akışı (AI dev-apk'ta kapalı) |
| `NaturalReveal` | Doğallık açıklaması | Üretimden sonra "elevation" ekranı |
| `Recap` | Ders sonu özet | Statik "Continue" ekranı |

> [!warning] Meet/Insight/Recap bugün **statik Continue** ekranları; ekran-içi etkileşim (per-screen interaction) **Faz B PLANNED** — henüz canlı değil. Ekran tiplerinin ayrıntısı: [[Meet]], [[Insight and Notice]], [[Weave]], [[Natural Reveal]], [[Say It Your Way]], [[Review]].

### İlerleme + tamamlama

`screenIndex` state ile ilerler; `isComplete = screenIndex >= lesson.screens.length` (`LessonRendererV1.tsx:33`). Tamamlanınca CompletionView + tek tamamlama işareti (`{number}-read_listen = true`) — Home bunu okur (bkz. [[Home and Journey]]). **Puan/yüzde/streak yok**; renderer yorumu bunu açıkça söyler: "No XP, level, streak, score, or percent." (copy guard testinde alıntılı, `componentCopyGuard.test.ts:16-18`).

### Giriş köprüleri (interstitial)

- **Lesson Zero** (`app/lesson-zero.tsx`): ilk açılışta gelir (#139 rebuilt first-run), sonra tekrar tetiklenmez, doğrudan v1 L1'e götürür (checklist §5).
- **How Weave Works** (`app/how-weave-works.tsx`, `/how-weave-works`): otomatik gösterilmez, erişilebilir; içinde bilinçli anti-gamification string "No score." (copy guard allowlist, `componentCopyGuard.test.ts:20-22`).

Her iki köprünün öğrenci-metni copy guard testiyle taranır (banned kelimeler + em/en dash) — bkz. [[Copy and Tone]].

## Guardrails

- Ardışık Weave ekranları metin/state taşımaz (checklist §6) — `cI2` gibi paylaşılan state geçişlerde sıfırlanır.
- dev-apk'ta lesson AI fail-closed: Say It Your Way ağ çağrısı yapmaz, deterministik fallback verir (`FEATURES.aiEnabled=false`). Bkz. [[AI Role and Guardrails]].

## Known Gaps

- Meet/Insight/Recap per-screen etkileşimi Faz B PLANNED, henüz statik.
- TTS Fransızca-only olmalı, placeholder konuşmamalı (checklist §10); Weave Fill placeholder'ları seslendirmez.

## Related Notes

- [[Home and Journey]] · [[Interaction Patterns]] · [[Copy and Tone]] · [[Lesson Flow]] · [[Runtime Content Architecture]] · [[Weave]] · [[Natural Reveal]]
