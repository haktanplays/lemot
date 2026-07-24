---
title: Glossary
aliases: [Glossary, Sözlük, Terimler]
type: index
domain: meta
status: canonical
canon_status: canonical
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
related: ["[[00 Le Mot Holy Codex]]", "[[Chip Taxonomy]]", "[[06 Canon and Status Legend]]"]
tags: [index, glossary, reference]
---

# Glossary — Le Mot / Cairn terimleri

<!-- gh-toc -->

## İçindekiler

- [Ürün / marka](#ürün-marka)
- [Chip terminolojisi → [[Chip Taxonomy]]](#chip-terminolojisi-chip-taxonomy)
- [Öğrenme sistemi](#öğrenme-sistemi)
- [Egzersiz / ekran tipleri → [[Exercise System Overview]]](#egzersiz-ekran-tipleri-exercise-system-overview)
- [Kod / mimari → [[Runtime Content Architecture]]](#kod-mimari-runtime-content-architecture)
- [Yasalar & kararlar](#yasalar-kararlar)
- [Süreç / roller](#süreç-roller)
- [Fransızca öğretim örnekleri](#fransızca-öğretim-örnekleri)

> Her terim, canonical ana notuna link verir. Kısaltmalar, chip tipleri, kod
> tanımlayıcıları ve Fransızca öğretim terimleri.

## Ürün / marka
- **Le Mot** — projenin eski (v7) adı; kod dizini hâlâ `lemot-app`.
- **Cairn** — ürünün yeni markası (patika taş yığını / trail-marker). → [[Cairn Brand Direction]]
- **Weave** — killer üretim mekaniği; sahiplenilen Fransızca engine'lerden iskelet, bilinmeyen parçalar İngilizce. Eskiden "Franglais". → [[Weave System]]
- **Campfire (Mode)** — ~L24'teki kapanış anı; paywall sınırı burada. → [[Monetization and Scope Boundaries]]

## Chip terminolojisi → [[Chip Taxonomy]]
- **Chip** — yeniden kullanılabilir yapı bloğu; cümle ezberi değil. "Whole first, unpack later".
- **Spine chip** — üretim iskeleti (ör. `je voudrais`, `pouvez-vous`).
- **Active** — dersin aktif olarak öğrettiği/ürettiği chip.
- **Supported** — desteklenen, tam sahiplik beklenmeyen.
- **Recognition / exposure** — yalnızca tanıma (kademe-3 exposure); cevap pozisyonunda yasak (V3).
- **Ghost / seed chip** — henüz aktif olmayan, ileriki derse ait tohum.
- **Carryover** — önceki dersten taşınan chip (sayısal L+0..L+6 penceresi **PROPOSED**, kanon değil).
- **Pattern** — üretken şablon (ör. `ne ___ pas`, `où + être + [lieu]`).
- **Formula chunk** — bütün kalan kalıp (ör. `s'il vous plaît`).
- **Noun / package** — isim paketi chip (ör. `un café`, `de l'eau`).
- **Accounting (itemId)** — registry'deki muhasebe kimliği; mastery event buna bağlanır.
- **UI chip / inline-highlight / model-answer** — yüzey/gösterim rolleri.
- **"Not a chip"** — composed production (ör. `je ne peux pas`, `est-ce que ...` soruları); primary UI chip olamaz.

## Öğrenme sistemi
- **Self-Producing Engine** — içerik/pratik türeten motor katmanı. → [[Self-Producing Engine]]
- **Mastery** — counter-derived `MasterySnapshot`; `WEAK_THRESHOLD=3`, Leitner `[0,1,3,7,30]`. → [[Mastery Model]]
- **Prompt-fade (PF0–PF3)** — ipucu azaltma kademeleri.
- **Near-miss / precision** — punctuation/accent/spelling near-miss; soft sinyal, failure değil.
- **Mon Lexique** — öğrenci defteri/toplanan öğeler; runtime deferred. → [[Mon Lexique]]
- **Daily Review** — günlük tekrar ritüeli; dev-apk'te `dailyReview=false`. → [[Daily Review]]
- **Natural Reveal** — üretimden *sonra* doğallığı/alternatifleri açan passive-mirror ekran. → [[Natural Reveal]]
- **Weak spot** — 3+ hata alan tag. → [[Error Tracking System]]

## Egzersiz / ekran tipleri → [[Exercise System Overview]]
- **Meet / MeetCard** — read & listen giriş kartı (şu an statik).
- **Insight / InsightCard** — "notice the pieces" kartı (statik).
- **Fill / FillWithTraps** — trap'li tek-seçim çoktan seçmeli.
- **Say It Your Way** — serbest üretim; **asla notlanmaz**.
- **Recap** — ders sonu özet kartı.

## Kod / mimari → [[Runtime Content Architecture]]
- **Surface A / B / C** — üç paralel ders runtime'ı (A legacy gizli / B sevkedilen v1 / C learning-engine sandbox).
- **`LessonRendererV1`** — surface B renderer; `screen.type`'a göre dispatch.
- **`V1_LESSONS`** — kayıtlı v1 ders dizisi (16 dosya, L0–L15).
- **`ITEM_REGISTRY`** — frozen item registry (`content/itemRegistry.ts`). → [[Registry Architecture]]
- **`lm7`** — legacy storage blob `{p, err, dr}`; Home/Progress bunu okur.
- **`lm_le_events`** — learning-engine append-only event log; motorun source of truth'u.
- **ProductStage** — `sandbox | dev-apk | public-beta`; fail-closed → dev-apk. → [[Product Stages and Feature Flags]]
- **`aiEnabled`** — AI master switch; dev-apk/public-beta'da false.

## Yasalar & kararlar
- **YASA 1** — schema değişikliği ⇒ aynı PR'da migration. → [[Decision Index]]
- **YASA 2** — itemId immutability (validate:content hard error).
- **YASA 3** — error-tag immutability (dondurulmuş manifest).
- **K1–K6** — operator kararları (K1 schemaVersion "absent=v1", K2 device-day order, K3 manifest rule, K5 squash-merge...).
- **Karpathy purity contract** — pure / deterministic / explicit `now` / explicit fail. → [[Learning Engine Architecture]]

## Süreç / roller
- **Operator (Jamo)** — manuel/hesap-bağımlı işleri yürütür (EAS, Supabase, cihaz smoke). → [[Incident and Blocker Handling]]
- **Sync Queue** — bulut oturumunun operatöre bıraktığı iş kuyruğu (`docs/CLOUD_SYNC_QUEUE.md`).
- **Sprint / SW / P.0–P.7** — pipeline fazları vs sprint workstream'leri. → [[Development Workflow]]
- **Round 1** — L0–L6 Dev APK dilimi; frozen. → [[03 Current State]]

## Fransızca öğretim örnekleri
- `je voudrais` (isterdim) — kibar istek spine'ı.
- `pouvez-vous` (yapabilir misiniz) — yardım/izin spine'ı.
- `ne ___ pas` — negasyon frame pattern'i (korumalı frame chip, PR #168).
- `est-ce que` — soru wrapper'ı (L12); ama `est-ce que ...` **bir chip değildir**.
- `y` (`j'y vais` / `on y va`) — yer zamiri (L14); composed, chip değil.
