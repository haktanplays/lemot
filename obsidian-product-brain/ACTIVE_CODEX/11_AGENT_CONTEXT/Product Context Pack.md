---
title: Product Context Pack
aliases: [Product Pack, Ürün Paketi]
type: handoff
domain: product
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["CLAUDE.md", "docs/DEV_APK_MVP_CANON.md", "docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md", "docs/KNOWN_GAPS.md"]
related: ["[[Canonical Context Pack]]", "[[Product Vision]]", "[[Monetization and Scope Boundaries]]", "[[Non-Goals]]", "[[Product Stages and Feature Flags]]"]
tags: [agent, context, product]
---

# Product Context Pack

<!-- gh-toc -->

## İçindekiler

- [Ne inşa ediyoruz](#ne-inşa-ediyoruz)
- [Öğrenci profili (D-37, LOCKED)](#öğrenci-profili-d-37-locked)
- [Dev APK scope KUTSALDIR (Rule 7)](#dev-apk-scope-kutsaldir-rule-7)
- [Product stage modeli (fail-closed)](#product-stage-modeli-fail-closed)
- [Monetization (D-30)](#monetization-d-30)
- [Non-goals (asla)](#non-goals-asla)
- [AI'ın rolü (D-33, DEFERRED)](#aiın-rolü-d-33-deferred)
- [Bir özelliğin "evi" olmalı (Rule 5)](#bir-özelliğin-evi-olmalı-rule-5)
- [Product riskleri](#product-riskleri)
- [İlgili Notlar](#ilgili-notlar)

> [!canon] **Ürün/scope/monetization/felsefe** işi yapan ajanın bağlam paketi.
> Karar verme değil, karar **hatırlama** notu. Her başlık ana evine link verir.

## Ne inşa ediyoruz
"Premium Fransızca üretim motoru — genel bir AI tutor değil." Yeniden kullanılabilir
**sentence engines** öğretir; AI müfredatı **sahiplenmez**, destekler. Killer trinity:
**Weave · Say It Your Way · Natural Reveal**. Ana evi: [[Product Vision]] · [[Learning Philosophy]].

## Öğrenci profili (D-37, LOCKED)
Öğrenci = **nerd hobbyist** (LearnCraft-esintili, mekanik-öncelikli). İlk testerlar aile/arkadaş.
Free-tier sözü: self-talk eşiği, ~L10'dan chip'siz kolay açık Say It. Natural Reveal tüm serbest
yazma egzersizlerinde; reveal look-ahead penceresi 3–4 ders (maks 5–6). Ana evi: [[User Journey]].

## Dev APK scope KUTSALDIR (Rule 7)
- Yalnızca **L0–L6** (aksini güncel kanon söylemedikçe).
- **Paywall yok**, RevenueCat yok.
- Chat tab gated; Practice/Progress/Daily Review/Mon Lexique/Word Graph **gizli**.
- UI'da public-beta vaadi yok.
Ana evi: [[Dev APK Scope]]. "Hard no" listesi: [[03 Current State]].

## Product stage modeli (fail-closed)
`sandbox` (hepsi açık) / `dev-apk` (minimal tester yüzeyi) / `public-beta` (paywall).
Unset → **dev-apk**. `aiEnabled` yalnızca sandbox'ta true. Ana evi: [[Product Stages and Feature Flags]].

## Monetization (D-30)
Cairn: **Campfire ~L24** soft gate, L1–L20 free. Legacy "**L14 / $12.99**" = **SUPERSEDED**;
otomatik devretmez. MVP learning-validation için para kazanma **ertelendi**; paywall kodu karantinada
(`FEATURES.paywall=false`). Yeni pozisyon = **DEFERRED/PROPOSED** (Taş 5 sonrası). Ana evi: [[Monetization and Scope Boundaries]].

## Non-goals (asla)
Duolingo ödül döngüleri, leaderboard, sosyal özellikler, streak/XP; restaurant-chatbot drill'i ana
özellik olarak; drag-drop-only ders omurgası; Anki klonu; ağır gramer-tablosu öğretimi; AI'ı çekirdek yapmak.
Ana evi: [[Non-Goals]] · [[Exercise Anti-Patterns]].

## AI'ın rolü (D-33, DEFERRED)
AI çekirdek değil; deterministik motor source of truth. AI, tam bir **activation package** gelene kadar
**dormant** (auth-light identity, server-side quota, günlük token tavanı, rate limit, routing,
fallback doğrulama, privacy/consent yüzeyi). Learner-critical grading'de AI yok. Ana evi: [[AI Role and Guardrails]] · [[AI Architecture]].

## Bir özelliğin "evi" olmalı (Rule 5)
Herhangi bir yeni özellikten önce cevapla: **Nerede yaşıyor?** Lesson / Daily Review / Practice Pool /
Mon Lexique / Post-beta / Archive? Evsiz özellik eklenmez. Aday özelliklerin evleri: [[Future Features]].

## Product riskleri
Aşırı erken unlock, dikkat bütçesi aşımı, generic engagement optimizasyonu, futur-proche free-tier
tuning (band map #1 riski, paywall pozisyonu DEĞİL). Ana evi: [[Product Risks]] · [[Difficulty and Cognitive Load]].

## İlgili Notlar
- [[Canonical Context Pack]] · [[Learning Engine Context Pack]] · [[Syllabus Context Pack]]
- [[Product Vision]] · [[Dev APK Scope]] · [[Monetization and Scope Boundaries]] · [[Non-Goals]]
