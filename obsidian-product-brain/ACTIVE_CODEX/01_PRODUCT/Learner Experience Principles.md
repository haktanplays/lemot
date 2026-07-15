---
title: Learner Experience Principles
aliases: [UX İlkeleri, Learner Experience, Öğrenci Deneyimi İlkeleri]
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
source_of_truth: ["docs/DEV_APK_MVP_CANON.md", "docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md", "docs/CAIRN_PRODUCT_ANSWERS_2026_07.md"]
code_refs: []
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Learning Philosophy]]", "[[Product Promise]]", "[[Non-Goals]]", "[[Natural Reveal]]"]
supersedes: []
superseded_by: []
tags: [product, ux, tone, canon]
---

# Learner Experience Principles

<!-- gh-toc -->

## İçindekiler

- [Amaç](#amaç)
- [İlke 1 — Passive mirror ton (CANONICAL)](#ilke-1-passive-mirror-ton-canonical)
- [İlke 2 — Kısmi denemeler cezalandırılmaz (CANONICAL)](#ilke-2-kısmi-denemeler-cezalandırılmaz-canonical)
- [İlke 3 — Bilinmeyeni İngilizce bırakabil (CANONICAL)](#ilke-3-bilinmeyeni-ingilizce-bırakabil-canonical)
- [İlke 4 — Sakin/premium, oyunlaştırılmamış](#ilke-4-sakinpremium-oyunlaştırılmamış)
- [İlke 5 — İlk 3 dakika kutsaldır](#ilke-5-ilk-3-dakika-kutsaldır)
- [İlke 6 — İstatistikleri yüzeye vurmadan mastery göster](#ilke-6-istatistikleri-yüzeye-vurmadan-mastery-göster)
- [Statü](#statü)
- [İlgili Notlar](#ilgili-notlar)

> [!canon] Cairn'in his hissi **sakin, premium, passive-mirror** bir mentördür:
> öğrenciyi ödül/ceza döngüsüne sokmadan, "ne yaptığını sana yansıtan" bir ton.
> Oyunlaştırma yok, mascot yok, streak baskısı yok.

## Amaç

Bu not, [[Learning Philosophy]]'nin öğrenci **deneyimine** nasıl indiğini toplar:
ton, geri bildirim dili, ilerleme hissi, cezasızlık. Yasaklı dilin ana evi
[[Non-Goals]]; buradaki liste onun UX karşılığıdır.

## İlke 1 — Passive mirror ton (CANONICAL)

Dev APK canon §5, geri bildirim dilini kelime kelime kilitler
(`DEV_APK_MVP_CANON.md:72-89`):

- **Prefer:** "Used. Not memorized." / "This word is becoming yours." /
  "You used French today." / "Take another look." / "Not quite — try X because Y."
- **Pattern:** "passive mirror of what the user did." (kullanıcının yaptığının
  sakin yansıması)

> [!warning] Sadece cezalandırıcı dil değil, **teatral pozitiflik de yasak**:
> "interesting attempt", "amazing!" gibi ifadeler "patronizing" (küçümseyici)
> sayılır ve banlıdır (`DEV_APK_MVP_CANON.md:72-89`). Tam yasak liste [[Non-Goals]].

## İlke 2 — Kısmi denemeler cezalandırılmaz (CANONICAL)

Öğrenci duygu hedeflerinden biri doğrudan bir UX yasasıdır: **"I am not punished
for partial attempts."** (`...v1_0.md:124-131`). Bunun somut karşılıkları:

- Hard-block ilerleme yok — yanlış cevap yolu tıkamaz (`DEV_APK_MVP_CANON.md:11-21`).
- Açık karışık Weave ve Say It: exact-match notlandırma yok; passive-mirror
  [[Natural Reveal]] (W1 LOCKED, `CAIRN_PRODUCT_ANSWERS_2026_07.md:29-38`).
- Near-miss (noktalama/aksan/yazım) sinyaldir, başarısızlık değil (bkz.
  [[Feedback and Scoring Philosophy]], [[Mastery Model]]).

## İlke 3 — Bilinmeyeni İngilizce bırakabil (CANONICAL)

Deneyimin güven-inşa eden çekirdeği: öğrenci bir cümleyi tamamlayamadığında
İngilizceye "swap" edebilir ve yine de öğrenir. Bu Weave'in UX vaadidir
([[Weave System]]); "leave unknown words in English and still learn"
(`...v1_0.md:124-131`).

## İlke 4 — Sakin/premium, oyunlaştırılmamış

> [!canon] Mentor "a steady guide, not a quizmaster and not a mascot."
> (`CAIRN_PRODUCT_DEFINITION_v0.1.md:56-63`, SUPERSEDED doc ama yön canonical ve
> Dev APK canon §1 ile pekiştirilmiş). Retention "explicitly not XP, streak, or
> loss-aversion pressure" (`CAIRN_PRODUCT_DEFINITION_v0.1.md:112`).

## İlke 5 — İlk 3 dakika kutsaldır

> [!canon] "The Dev APK lives or dies in the first 3 minutes."
> — CANONICAL, `DEV_APK_MVP_CANON.md:42-48`. Lesson Zero / ilk-temas kancası en
> yüksek önceliktir. Bkz. [[User Journey]], [[Dev APK Scope]].

## İlke 6 — İstatistikleri yüzeye vurmadan mastery göster

> [!warning] Çok boyutlu mastery, öğrenciye "stats dashboard'a dönüşmeden"
> gösterilmeli; Mon Lexique "must never show raw scores"
> (`CAIRN_PRODUCT_DEFINITION_v0.1.md:196-197`; §49.3 `...v1_0.md:3742-3753`).
> Bkz. [[Mon Lexique]], [[Mastery Model]].

## Statü

> [!warning] İlkeler **CANONICAL**; uygulama **partial**. Ton/dil guardrail'ları
> componentCopyGuard testleriyle korunuyor (bkz. [[Non-Goals]], KNOWN_GAPS #12
> quarantine), ama tam UX (Mon Lexique surfacing, Natural Reveal her production
> egzersizinde) çoğunlukla spec/sandbox seviyesinde. [[03 Current State]].

## İlgili Notlar

- Üst indeks: [[00 Le Mot Holy Codex]]
- [[Learning Philosophy]] — bu ilkelerin pedagojik kaynağı
- [[Product Promise]] — duygu hedefleri
- [[Non-Goals]] — yasaklı dil ve mekanikler
- [[Natural Reveal]] — cezasız karşılaştırma ekranı
