---
title: Non-Goals
aliases: [Non-Goals, Yasaklar, Anti-Patterns, Do Not, Forbidden Language]
type: product-canon
domain: product
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/DEV_APK_MVP_CANON.md", "docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md", "docs/STATUS.md"]
code_refs: []
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Learner Experience Principles]]", "[[Product Vision]]", "[[AI Role and Guardrails]]", "[[Product Risks]]"]
supersedes: []
superseded_by: []
tags: [product, non-goals, forbidden, canon]
---

# Non-Goals

<!-- gh-toc -->

## İçindekiler

- [Amaç](#amaç)
- [1. Yasaklı dil (CANONICAL, cross-doc)](#1-yasaklı-dil-canonical-cross-doc)
- [2. Yasaklı mekanikler / oyunlaştırma (CANONICAL)](#2-yasaklı-mekanikler-oyunlaştırma-canonical)
- [3. AI merkez değildir (CANONICAL)](#3-ai-merkez-değildir-canonical)
- [4. Ürün anti-pattern'leri (CANONICAL — Cairn "değildir")](#4-ürün-anti-patternleri-canonical-cairn-değildir)
- [5. Semantic clustering yasağı (research-backed)](#5-semantic-clustering-yasağı-research-backed)
- [6. STATUS "Hard no" (CANONICAL, current)](#6-status-hard-no-canonical-current)
- [Nasıl korunuyor? (statü)](#nasıl-korunuyor-statü)
- [İlgili Notlar](#ilgili-notlar)

> [!canon] Cairn'in kimliği **neyi yapmadığıyla** da tanımlanır. Yasaklı dil ve
> yasaklı mekanikler "tercih değil, ürünün kimliğidir" (`DEV_APK_MVP_CANON.md:11-21`).
> Bir ajan bunları ihlal ederse ürünü bozmuş olur.

## Amaç

Bu not, tüm "do NOT / yasak / anti-pattern" kurallarının canonical evidir. UX
karşılığı [[Learner Experience Principles]]; ihlal riski [[Product Risks]].

## 1. Yasaklı dil (CANONICAL, cross-doc)

> [!canon] Dev APK canon §5 "Avoid" (`DEV_APK_MVP_CANON.md:72-89`):
> "XP gained", "streak", "level up", "goal complete", "premium unlock" ve ceza dili
> ("you failed", "wrong", "don't break your streak"). Ayrıca **teatral pozitiflik**
> yasak: "interesting attempt", "amazing!" = "patronizing".

Yerine (Prefer): "Used. Not memorized." / "This word is becoming yours." / "You used
French today." / "Take another look." / "Not quite — try X because Y." — pattern:
"passive mirror of what the user did." Bkz. [[Learner Experience Principles]].

> [!historical] Legacy CLAUDE.md §Do NOT: "Add social features, leaderboards, or
> gamification (XP/streak removed per locked decision 2026-04-23 — only milestone
> display remains)." (`CLAUDE.md:140-144`). Legacy body SUPERSEDED ama bu yasak yön
> olarak aktif kanonla uyumludur.

## 2. Yasaklı mekanikler / oyunlaştırma (CANONICAL)

Ürün kimliği (Dev APK canon §1, `DEV_APK_MVP_CANON.md:11-21`): **No XP / No streaks /
No lives / No punishment / No hard-block progression.** Retention "explicitly not XP,
streak, or loss-aversion pressure" (`CAIRN_PRODUCT_DEFINITION_v0.1.md:112`).

## 3. AI merkez değildir (CANONICAL)

> [!canon] "AI is supportive, not the core product." (`DEV_APK_MVP_CANON.md:19`).
> §66.2: "The deterministic engine remains the source of truth. No AI in learner-critical
> grading — AI may propose/refine, never decide. No unauthenticated open AI endpoint,
> ever." (`...v1_0.md:5136-5143`). Ana ev: [[AI Role and Guardrails]].

## 4. Ürün anti-pattern'leri (CANONICAL — Cairn "değildir")

v1.0 §2.1 (`...v1_0.md:96-107`) — Cairn **değildir**: phrasebook, translation-drill
engine, saf flashcard app, temastan önce gramer ders kitabı, cümle-ezberleme makinesi,
denetimsiz AI gramer açıklayıcısı, "more chips always better" sistemi, acemiden kusursuz
native üretim bekleyen app.

> [!historical] v0.1 §17 hard-no (SUPERSEDED doc, uyumlu niyet, `CAIRN_PRODUCT_DEFINITION_v0.1.md:158-165`):
> "No XP, streak, or loss-aversion addiction loops. No childish mascot tone. No excessive
> grammar lectures... No generic AI chatbot chaos. No rote memorization lists as the spine.
> No AI-as-core; no premium-walled basic feedback; no data selling."

## 5. Semantic clustering yasağı (research-backed)

> [!warning] Anlamsal olarak benzer kelimeleri birlikte gruplamak (semantic clustering)
> **interference risk** yüzünden kaçınılır; tematik kümeleme tercih edilir. (Legacy
> CLAUDE.md research foundation'da açıkça belirtildi; Cairn syllabus tasarımına taşınır.)
> Bkz. [[Syllabus Design Rules]].

## 6. STATUS "Hard no" (CANONICAL, current)

> [!canon] Şu an yapılMAyacaklar (`STATUS.md:282-296`): v1 feature expansion yok,
> v1 polish-only iş yok, smoke'suz Home görsel polish yok, V4-B implementation yok,
> Daily Review/Progress rewrite yok, Practice/Chat expansion yok, Mon Lexique runtime
> integration yok, yeni ders mekaniği yok, Round 1 L1-L6 ötesi çok-ders içerik yok,
> paywall işi yok.

## Nasıl korunuyor? (statü)

> [!implemented] Yasaklı dil ve legacy-revival, `componentCopyGuard` ve `devApkScope`
> testleriyle kısmen mekanik olarak korunuyor (bkz. [[Product Risks]], KNOWN_GAPS #12
> quarantine). implementation_status **partial**: her yasak otomatik teste bağlı değil;
> bir kısmı ajan disiplinine güvenir (`KNOWN_GAPS.md:8-9`: "do not fix a gap
> opportunistically inside an unrelated PR").

## İlgili Notlar

- Üst indeks: [[00 Le Mot Holy Codex]]
- [[Learner Experience Principles]] — yasak dilin UX pozitifi
- [[Product Vision]] — vizyonun "ne değil" negatifi
- [[AI Role and Guardrails]] — AI-not-core sınırının ana evi
- [[Product Risks]] — bu yasakların ihlal riski
