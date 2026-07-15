---
title: Rejected Decisions
aliases: [Reddedilen Kararlar, Rejected Alternatives]
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
related: ["[[Decision Index]]", "[[Active Decisions]]", "[[00 Le Mot Holy Codex]]"]
tags: [index, decision, rejected]
---

# ⛔ Rejected Decisions

> [!warning] Değerlendirilip **reddedilen** yaklaşımlar. Bunlar bağımsız ADR değil; ilgili ACTIVE ADR'in içinde "Rejected Alternatives" olarak yaşarlar. Bir fikir buradaysa **tekrar önerme** — önce ilgili ADR'i oku. Ana dizin: [[Decision Index]].

## Ürün & ton
- Duolingo tarzı ödül mekanikleri, leaderboard, sosyal özellikler, XP/level ödül dili → [[ADR-0001 no-xp-streak-reward-language]].
- Coşkulu/övgü tonu ("Amazing!", "You got it!" rozeti), failure olarak sunulan boundary → [[ADR-0002 calm-passive-mirror-mentor-tone]], [[ADR-0016 boundary-recognition-later-form-ui]].
- "Franglais" adını korumak (trademark-distinctiveness için "Weave") → [[ADR-0003 weave-primary-production-mechanic]].

## Öğrenme sistemi
- Tam-cümle/tam-soru chip; cinsiyeti "kural" olarak öğretmek (paket yerine) → [[ADR-0004 no-full-sentence-chips]].
- Parçadan-bütüne inşa (whole-first yerine); Continue'yu sert gate yapmak → [[ADR-0005 whole-first-unpack-later]].
- Meaning-preserving near-miss'i tam failure saymak → [[ADR-0021 mastery-precision-near-miss-not-failure]].
- Elle yazılmış statik hub drill'leri (Option A, ölçeklenmez); evidence weight ile selection weight'i karıştırmak → [[ADR-0022 hub-derived-drills]].
- Açık (open) weave'leri notlamak → [[ADR-0003 weave-primary-production-mechanic]].

## Müfredat
- L0'ı Lesson 1 saymak / request sistemini öğreten mastery dersi yapmak → [[ADR-0006 l0-first-use-bridge-spine-at-l1]].

## Mimari & veri
- Engine progress'i legacy `lm7`'ye sahte marker ile bridge etmek (borcu gizler, çift doğruluk) → [[ADR-0020 progress-bridge-events-canonical]].
- Projeksiyonları migrate etmek / snapshot'ı source-of-truth yapmak → [[ADR-0009 events-source-of-truth]].
- Engine'de `Date.now()`/`Math.random()`; sessiz fail (fail-open) → [[ADR-0010 karpathy-engine-purity-contract]].
- Migration'sız şema değişikliği; "clean start" için kullanıcı verisini wipe etmek → [[ADR-0011 yasa1-schema-migration-same-pr]].
- Shipped itemId/error-tag rename-delete; tek yönlü validator → [[ADR-0012 yasa2-itemid-immutability]], [[ADR-0013 yasa3-error-tag-immutability]].
- **Fail-open sandbox stage fallback** (kaza sonucu tam-açık yüzey sızması) → [[ADR-0017 product-stage-fail-closed-dev-apk]] (bu aynı zamanda SUPERSEDED — bkz. [[Superseded Decisions]]).
- Consent'siz remote ingestion; client `service_role`; ham veri dump'ı; RLS'siz tablo → [[ADR-0023 privacy-local-first-consent-gated-remote]].
- AI'ı learner-critical grading kaynağı yapmak → [[ADR-0022 hub-derived-drills]], D-33 (AI dormant).

## Related
[[Superseded Decisions]] · [[Deferred Decisions]] · [[Decision Index]] · [[Non-Goals]]
