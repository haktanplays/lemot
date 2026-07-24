---
title: Dev APK Scope
aliases: [Dev APK, Dev APK Kapsamı, MVP Scope, Round 1 Scope]
type: product-canon
domain: product
status: active
canon_status: canonical
implementation_status: implemented
verification_status: device-verified
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/DEV_APK_MVP_CANON.md", "docs/STATUS.md", "lemot-app/config/productStage.ts"]
code_refs: ["lemot-app/config/productStage.ts:86-108", "lemot-app/config/productStage.ts:133-139"]
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Product Stages and Feature Flags]]", "[[Monetization and Scope Boundaries]]", "[[Non-Goals]]", "[[03 Current State]]"]
supersedes: []
superseded_by: []
tags: [product, dev-apk, scope, canon, implemented]
---

# Dev APK Scope

<!-- gh-toc -->

## İçindekiler

- [Amaç](#amaç)
- [IN scope (CANONICAL)](#in-scope-canonical)
- [OUT of scope (CANONICAL, açık)](#out-of-scope-canonical-açık)
- [Divergence: L1–L5 (canon) vs L0–L6 (runtime)](#divergence-l1l5-canon-vs-l0l6-runtime)
- [L7 bloke (CANONICAL, her yerde tekrar)](#l7-bloke-canonical-her-yerde-tekrar)
- [Round 1 durumu — ACCEPTED & FROZEN](#round-1-durumu-accepted-frozen)
- [Statü](#statü)
- [İlgili Notlar](#ilgili-notlar)

> [!canon] Dev APK = **kontrollü dış MVP testi** yüzeyi. Kural: "If a feature is not
> on this list, default to not building it for the Dev APK." — `DEV_APK_MVP_CANON.md:37`.
> Bugün sevkedilen tek gerçek ürün yüzeyi budur.

## Amaç

Bu not, Dev APK'te **neyin içeride, neyin dışarıda** olduğunu canonical olarak
sabitler. Flag mekaniği [[Product Stages and Feature Flags]]; genel "ne yapma"
[[Non-Goals]]; canlı durum [[03 Current State]].

## IN scope (CANONICAL)

- **Dersler** — Dev APK canon der: "L1-L5 functional only" (`DEV_APK_MVP_CANON.md:29`).
  Ama runtime gerçeği **L0–L6** (Lesson Zero + L1–L6). Bkz. aşağıdaki divergence.
- **Lesson Zero / ilk-3-dakika kancası** — en üst öncelik: "The Dev APK lives or
  dies in the first 3 minutes." (`DEV_APK_MVP_CANON.md:42-48`).
- **Minimal kelime-listesi görünümü** kabul edilebilir (tam Mon Lexique değil)
  (`DEV_APK_MVP_CANON.md:34`).
- **Ders içi AI** (Say It Your Way + Mini Conversation) `aiLesson` ile kavramsal
  açık, ama AI network kapalı (`aiEnabled=false`) → deterministik fallback
  (`productStage.ts:86-93`). Bkz. [[AI Role and Guardrails]].

## OUT of scope (CANONICAL, açık)

> [!canon] "No paywall / No RevenueCat / No Word Graph / No Le Carnet / No full Mon
> Lexique / No public monetization flow." — `DEV_APK_MVP_CANON.md:31-35`.

"What Not To Build Yet" (§4, `DEV_APK_MVP_CANON.md:52-64`): AI Chat expansion yok,
Word Graph yok, Dream Journal yok, Active Reading yok, RevenueCat yok, L80 flows yok,
gelişmiş adaptif engine yok ("Pool 1 random selection is enough"). Genel liste [[Non-Goals]].

## Divergence: L1–L5 (canon) vs L0–L6 (runtime)

> [!warning] **SPEC-VS-REALITY divergence.**
> - Canon: "L1-L5 functional only" (`DEV_APK_MVP_CANON.md:29`) + `DEV_APK_LESSON_LIMIT = 5`
>   (`productStage.ts:139`).
> - Runtime: "Round 1 shippable scope is **L0-L6 only**" (Lesson Zero + `v1-lesson-000..006`,
>   `STATUS.md:167`).
> Çözüm: yeni kanon (STATUS + Round 1 içerik planı) L0–L6'ya genişledi; MVP canon §2
> ifadesi ve `LIMIT=5` sabiti geride kaldı. Sabit açıkça LEGACY işaretli. Ana ev:
> [[Spec Runtime Divergences]], [[Product Risks]].

## L7 bloke (CANONICAL, her yerde tekrar)

> [!warning] "No L7 implementation — blocked until the operator device smoke passes
> and an explicit closeout decision." (`README.md:135-137`, `STATUS.md:214-227`).
> Home görünürlük artışı (`<=6 → <=7`) ayrı, gözden geçirilmiş bir karardır.

## Round 1 durumu — ACCEPTED & FROZEN

> [!implemented] STATUS: "Round 1 L0-L6 runtime smoke is COMPLETE and ACCEPTED...
> Runtime code is FROZEN." Emulator smoke AVD `lemot_pixel5`, commit `8cefe81` / #136,
> P0–P3 tümü sıfır (`STATUS.md:109-140`). HEAD `02f9f7a` (#196).
> Dürüstlük notu (HISTORICAL): "L2 and L3 were not fully completed sequentially...
> L4-L6 were sampled by deep link." (`STATUS.md:128-133`).

> [!warning] **PENDING (operator-only):** fiziksel-cihaz tester-wave smoke + EAS
> preview build ayrıdır ve YAPILMADI. "code-side ready, awaiting operator."
> (`STATUS.md:139-140,204-235`). Cloud, bu blocker'lar açıkken "complete" diyemez.

## Statü

verification_status **device-verified** yalnızca emülatör smoke için geçerlidir;
fiziksel cihaz doğrulaması hâlâ bekliyor. Bkz. [[03 Current State]], [[Product Risks]].

## İlgili Notlar

- Üst indeks: [[00 Le Mot Holy Codex]]
- [[Product Stages and Feature Flags]] — dev-apk flag setinin kaynağı
- [[Monetization and Scope Boundaries]] — "no paywall" kararının evi
- [[Non-Goals]] — "what not to build yet" genel listesi
- [[03 Current State]] — canlı frozen durum
