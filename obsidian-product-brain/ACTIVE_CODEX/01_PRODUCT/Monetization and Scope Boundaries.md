---
title: Monetization and Scope Boundaries
aliases: [Monetization, Paywall, Para Duvarı, Scope Boundaries]
type: product-canon
domain: product
status: active
canon_status: canonical
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md", "docs/CAIRN_PRODUCT_ANSWERS_2026_07.md", "docs/ROADMAP.md", "docs/KNOWN_GAPS.md"]
code_refs: ["lemot-app/config/productStage.ts:71-72", "lemot-app/config/productStage.ts:111-112"]
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Dev APK Scope]]", "[[Product Stages and Feature Flags]]", "[[Product Risks]]", "[[Superseded Decisions]]"]
supersedes: []
superseded_by: []
tags: [product, monetization, paywall, canon, decision]
---

# Monetization and Scope Boundaries

> [!canon] MVP için monetization **DEFERRED**. Round 1 / erken beta'da **aktif paywall
> yok**. Yerleşen Cairn niyeti: paywall **Campfire ~L24** sınırında, **L1–L20 ücretsiz**.
> Legacy "L14 sonrası / $12.99" kararı **SUPERSEDED**. — §66.3, founder Q&A, ROADMAP.

## Amaç

Bu not, paywall/monetization kararının canonical evidir: nereye yerleşti, neyin
yerini aldı ve hangi gerilim çözülmedi. Flag'lerin kod karşılığı
[[Product Stages and Feature Flags]]; kapsam sınırları [[Dev APK Scope]].

## Yerleşen stance — CANONICAL / DEFERRED

> [!decision] §66.3 (LOCKED, operator-approved 2026-07-02): "Monetization is DEFERRED
> for MVP learning validation. NO active paywall in Round 1 / early beta. NO L14 paywall
> revival. The legacy locked decision (paywall after L14, $12.99/mo) is
> **SUPERSEDED-FOR-CAIRN**: position and price are re-decided post-validation... Old
> paywall/subscription code remains QUARANTINED." — `...v1_0.md:5163-5187`.

- Dev APK: "No public monetization flow. No subscriptions, no trials, no pricing
  screens, no upgrade CTAs." (`DEV_APK_MVP_CANON.md:35`).
- Kodda: `paywall=false` ve `revenueCat=false` hem sandbox hem dev-apk'te; yalnızca
  `public-beta`'da `true` (`productStage.ts:71-72,111-112`).
- Agent guardrail: "any prompt or note that assumes the L14/$12.99 paywall is active
  direction is stale — surface it, do not implement it." (`...v1_0.md:5193-5194`).

## Yerleşen Cairn niyeti: Campfire ~L24 (L1–L20 free)

> [!canon] Founder Q&A: **"Campfire Mode @ L24 (paywall boundary). At L24 the paywall
> enters. A non-paying learner enters Campfire Mode: a practice loop... built from THEIR
> owned words and error tracking."** **C1 (locked): Campfire content is GENERATED, not
> hardcoded.** — `CAIRN_PRODUCT_ANSWERS_2026_07.md:59-67`.

Yani: ücretsiz katman L1–L20'yi kapsar, paywall Campfire (~L24) sınırında girer ve
ödemeyen öğrenci hardcoded değil **üretilen** bir practice loop'una geçer. Free-tier'ın
teslim etmesi zorunlu söz için bkz. [[Product Promise]] (C2: "I can build my own sentences").

## SUPERSEDED legacy paywall

> [!historical] **SUPERSEDED — aktif değil, tarihsel kayıt.**
> Legacy Le Mot v7: paywall **L14 sonrası**, **$12.99/mo**, L15–L24'ü açar
> (`CLAUDE.md:37,49,135`). Bu, 2026-04-23 tarihli eski bir "locked decision"'dı ama
> Cairn için §66.3 tarafından SUPERSEDED-FOR-CAIRN ilan edildi: eski sayı ve konum
> **default olarak taşınmaz**. Eski paywall/subscription kodu **QUARANTINED**
> (KNOWN_GAPS #4, `KNOWN_GAPS.md:70-78`; #12 quarantine banner'ları).
> v0.1 varsayımı da SUPERSEDED: "~first ~24 lessons... free, then a paywall... Position
> and price are assumptions for validation, not locked." (`CAIRN_PRODUCT_DEFINITION_v0.1.md:123-127`).

## Çözülmemiş gerilim (§66.3 vs Answers vs ROADMAP)

> [!open-loop] **Paywall konumu tam olarak reconcile edilmedi.**
> - Answers doc'u "L24 Campfire / paywall boundary"yi *kilitli* gibi ele alır
>   (`CAIRN_PRODUCT_ANSWERS_2026_07.md:59-67`).
> - §66.3 ise konum ve fiyatı *deferred / post-validation'da yeniden karar* olarak
>   ele alır (`...v1_0.md:5163-5187`).
> - ROADMAP (2026-07-05): "Eski kanonun L14 sınırı yeni müfredata OTOMATİK TAŞINMAZ;
>   açık beta ücretsiz başlar, paywall yeri ayrı bir karar kapısıdır (Taş 5 sonrası)."
>   (`ROADMAP.md:142-143,168`).
> Reconcilable okuma: **Campfire mekaniği kilitli**; **tam L24 sınırı + fiyat kilitli
> değil**. Bu gerilim [[Product Risks]] ve [[05 Open Loops]]'ta izleniyor;
> post-validation monetization oturumu (position/price/trial) hâlâ açık (KNOWN_GAPS #4).

## Statü

implementation_status **not-started**: monetization için hiçbir aktif akış kodlanmadı;
legacy kod quarantined. Public-beta stage'i `paywall=true` içerir ama o stage sevkedilmedi.

## İlgili Notlar

- Üst indeks: [[00 Le Mot Holy Codex]]
- [[Dev APK Scope]] — "no monetization flow" kural evi
- [[Product Stages and Feature Flags]] — paywall/revenueCat flag değerleri
- [[Superseded Decisions]] — L14/$12.99 kararının tarihsel kaydı
- [[Product Risks]] — legacy-revival ve paywall-belirsizlik riski
