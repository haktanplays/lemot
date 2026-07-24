---
title: Active Decisions
aliases: [Aktif Kararlar, Locked Decisions]
type: index
domain: meta
status: active
canon_status: canonical
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
related: ["[[Decision Index]]", "[[Deferred Decisions]]", "[[00 Le Mot Holy Codex]]"]
tags: [index, decision, active]
---

# ✅ Active Decisions

> [!canon] Şu an **bağlayıcı** olan ADR'ler. Her satır tek cümlelik özet + link. Tam bağlam için ADR'e git. Ana dizin: [[Decision Index]].

## Ürün & ton
- [[ADR-0001 no-xp-streak-reward-language]] — `streak/XP/level up/achievement/amazing/perfect score/goal complete` ve "come back tomorrow" baskısı tüm kopyada YASAK; "streak" yerine "days on the path".
- [[ADR-0002 calm-passive-mirror-mentor-tone]] — geri bildirim bir "passive mirror": başarısızlık "Not a match yet.", Natural Reveal cezalandırmaz açıklar, boundary asla failure.
- [[ADR-0024 cairn-v1-precedence-chain]] — Cairn v1.0 spec import edildi; precedence `CLAUDE.md → STATUS.md → DEV_APK_MVP_CANON.md → Cairn v1.0`; legacy karantinada.

## Öğrenme sistemi
- [[ADR-0003 weave-primary-production-mechanic]] — Weave (eski "Franglais") çekirdek üretim mekaniği; açık weave'ler notlanmaz → Natural Reveal.
- [[ADR-0004 no-full-sentence-chips]] — tam-cümle/tam-soru chip yok; formula chunk (`je ne comprends pas`) ve noun package (`un café`) serbest; `PROTECTED_CHUNKS` 2'de donmuş.
- [[ADR-0005 whole-first-unpack-later]] — meet-card cümleyi bütün gösterir, öğrenci dokunarak decompose eder; Continue bir davet, kilit değil.
- [[ADR-0021 mastery-precision-near-miss-not-failure]] — aksan/noktalama/1-harf near-miss soft signal; wrongCount/isWeak/leitner box'ı düşürmez, item Build-eligible kalır.
- [[ADR-0022 hub-derived-drills]] — hub egzersizleri DERIVED (deriveDrill fail-closed + selector v0: SRS-due→weakest tag→integration need→variety); evidence weight ≠ selection weight.

## Müfredat
- [[ADR-0006 l0-first-use-bridge-spine-at-l1]] — L0 first-use bridge, Lesson 1 değil; numaralı spine L1 (Survival Kit) ile başlar.

## Mimari & veri
- [[ADR-0007 v1-temporary-dev-apk-skin-engine-foundation]] — v1 geçici Dev APK smoke skin (maintenance contract'a donmuş); learning-engine kalıcı temel.
- [[ADR-0008 dev-apk-route-contract]] — Home ilk dersi v1'e yönlendirir; `/learn/*` sandbox-only + deep-link; cutover yetkilendirilmedi.
- [[ADR-0009 events-source-of-truth]] — `lm_le_events` append-only log source-of-truth; mastery/lexique/pool/daily-review projeksiyon; policy değişimi re-derive, migrate değil.
- [[ADR-0010 karpathy-engine-purity-contract]] — engine modülleri PURE + DETERMINISTIC + EXPLICIT now (clock param) + FAIL-CLOSED; PR öncesi üçlü validation yeşil.
- [[ADR-0011 yasa1-schema-migration-same-pr]] — her şema değişikliği aynı PR'da pure test-locked migration ile; yazılamıyorsa değişiklik yasak; asla wipe yok.
- [[ADR-0012 yasa2-itemid-immutability]] — shipped itemId sonsuza dek donar; rename/delete yasak, validator HARD ERROR; 54-id manifest.
- [[ADR-0013 yasa3-error-tag-immutability]] — shipped error-tag rename/delete yasak; iki yönlü validator; ~54 tag donmuş.
- [[ADR-0014 k1-absent-reads-as-v1]] — eksik version alanı v1 okunur; in-place rewrite yok; `type` alanı ilk migration'da doğar.
- [[ADR-0015 k2-device-day-order]] — batch sırası #174→#180(natural-reveal)→seen-layer; reveal konumu canon-sabit; contract testleri final layout'a karşı bir kez.
- [[ADR-0016 boundary-recognition-later-form-ui]] — boundary/recognition öğeler yumuşak "later form" kartı; ID/rozet/jargon gizli, inline, üretim istenmez (schema marker DEFERRED).
- [[ADR-0017 product-stage-fail-closed-dev-apk]] — unset/mistyped stage → dev-apk (en kısıtlı), asla sandbox; aiEnabled yalnız sandbox.
- [[ADR-0018 k3-manifest-rule]] — her itemId-ekleyen PR manifest'i taşır; kaydedilmemiş id = `validate:content` HARD ERROR.
- [[ADR-0019 k5-squash-merge]] — squash-merge konvansiyonu kalır.
- [[ADR-0020 progress-bridge-events-canonical]] — Home/Progress/Daily Review engine projeksiyonlarını okumalı; sahte `lm7` marker yazmak yasak (yalnız stage-guarded geçici shim).
- [[ADR-0023 privacy-local-first-consent-gated-remote]] — local-first varsayılan; versiyonlu PrivacyState + one-time disclosure + export summary + two-step reset; remote consent-gated, RLS on, `service_role` yok (remote DEFERRED).

## Not
[[ADR-0025 paywall-campfire-l24]] ACTIVE değil → [[Deferred Decisions]] (legacy L14 SUPERSEDED, yeni konum ertelendi).
