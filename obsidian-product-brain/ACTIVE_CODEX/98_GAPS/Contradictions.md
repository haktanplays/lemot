---
title: Contradictions
aliases: [Çelişkiler, Cross-Source Conflicts, Conflict Register]
type: open-loop
domain: meta
status: active
canon_status: canonical
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/README.md", "docs/STATUS.md", "CLAUDE.md", "docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md"]
related: ["[[Source Ledger]]", "[[Unknowns]]", "[[Needs Verification]]", "[[05 Open Loops]]", "[[Superseded Decisions]]", "[[06 Canon and Status Legend]]"]
tags: [gap, contradiction, conflict]
---

# Contradictions

<!-- gh-toc -->

## İçindekiler

- [C1 (CROWN) — CLAUDE.md v7 banner vs body vs STATUS reality](#c1-crown-claudemd-v7-banner-vs-body-vs-status-reality)
- [C2 — Dev APK ders kapsamı: L1-L5 (canon) vs L0-L6 (runtime)](#c2-dev-apk-ders-kapsamı-l1-l5-canon-vs-l0-l6-runtime)
- [C3 (CROWN) — Paywall: Campfire-L24 (locked) vs §66.3 (re-decide) vs legacy L14](#c3-crown-paywall-campfire-l24-locked-vs-663-re-decide-vs-legacy-l14)
- [C4 (CROWN) — STATUS "7 lessons"/91f1b04 vs 16 v1 dosyası](#c4-crown-status-7-lessons91f1b04-vs-16-v1-dosyası)
- [C5 (CROWN) — İki roadmap: CAIRN_ROADMAP_202607 vs ROADMAP.md](#c5-crown-iki-roadmap-cairnroadmap202607-vs-roadmapmd)
- [C6 — Item sayısı: 54 (registry) vs 56 (manifest) vs 52 (audit)](#c6-item-sayısı-54-registry-vs-56-manifest-vs-52-audit)
- [C7 — AI model routing tablosu vs gerçek provider zinciri](#c7-ai-model-routing-tablosu-vs-gerçek-provider-zinciri)
- [C8 — Rich chip taxonomy (spec) vs runtime tek status enum](#c8-rich-chip-taxonomy-spec-vs-runtime-tek-status-enum)
- [C9 — İki disjoint store: lm7 (v1) vs lm_le_events (engine)](#c9-iki-disjoint-store-lm7-v1-vs-lmleevents-engine)
- [C10 — L7 spec: full aller vs compact doorway](#c10-l7-spec-full-aller-vs-compact-doorway)
- [Nasıl kullanılır](#nasıl-kullanılır)
- [İlgili notlar](#ilgili-notlar)
- [🧭 GitHub Navigation](#-github-navigation)

> [!warning] Kaynaklar arası **açık çelişkiler**. Her satır: *ne çelişiyor*, *hangi kaynak
> şu an kontrol ediyor*, *çözüm/açık mı*. Çatışma kuralı (CANONICAL, `README.md:40-42`):
> **"newer active canon > current codebase canon > older active canon > design reference
> > archive."** Bir çelişkiyi "çözülmüş" saymak için resolving kaynağı açıkça göstermelisin.

## C1 (CROWN) — CLAUDE.md v7 banner vs body vs STATUS reality

- **Çelişki:** `CLAUDE.md:12+` gövdesi 24 ders, 4 milestone (5-9-6-4), 11-bölüm akış,
  L14 paywall $12.99/mo, "Sprint 10 IN PROGRESS", Leitner SRS, scenario kartlarını
  **"current" gibi** anlatır. `CLAUDE.md:1-11` banner'ı ise tümünü **legacy v7** ilan eder
  ve "Do not use... unless explicitly reactivated" der.
- **Gerçeklik:** Şu anki reality (`STATUS.md`) Round 1 **L0-L6 v1 typed-content engine**,
  deterministik, dondurulmuş. Banner tek current parçadır.
- **Kim kontrol ediyor:** Banner (Tier 1). Body Tier 7 (superseded/historical).
- **Statü:** RESOLVED-by-precedence. Body kod olarak repo'da kalır (referans), pedagoji
  yönü DEĞİL. → [[Superseded Decisions]], [[Historical Syllabus]].

## C2 — Dev APK ders kapsamı: L1-L5 (canon) vs L0-L6 (runtime)

- **Çelişki:** `DEV_APK_MVP_CANON.md:29` "L1-L5 functional only"; `productStage.ts:139`
  `DEV_APK_LESSON_LIMIT = 5`. Ama `STATUS.md` + runtime = **L0-L6** (Lesson Zero + L1-L6),
  `index.tsx` Home filtresi `number>=1 && <=6`.
- **Kim kontrol ediyor:** Newer canon (STATUS + Round 1 içerik planı) → **L0-L6 ships**.
  MVP canon §2 ifadesi ve `LIMIT=5` sabiti geride kaldı; `LIMIT=5` zaten "LEGACY TEST BUILD"
  olarak işaretli (`productStage.ts:133-139`).
- **Statü:** RESOLVED (spec-vs-reality drift; sabit legacy). Doc-hijyen: MVP canon §2
  metnini L0-L6'ya güncellemek açık. → [[Dev APK Scope]], [[Feature Stage Matrix]].

## C3 (CROWN) — Paywall: Campfire-L24 (locked) vs §66.3 (re-decide) vs legacy L14

- **Çelişki:** Üç konum:
  1. `CAIRN_PRODUCT_ANSWERS_2026_07.md:59-67` — **"Campfire Mode @ L24 (paywall boundary)"**,
     Campfire içeriği GENERATED (C1 locked). L24'ü *locked* gibi anlatır.
  2. `...v1_0.md:5163-5187` §66.3 — monetization **DEFERRED**; pozisyon+fiyat post-validation
     *yeniden karar*; legacy L14/$12.99 **SUPERSEDED-for-Cairn**.
  3. `CLAUDE.md` body + eski docs — **paywall after L14, $12.99/mo** (legacy).
- **Kim kontrol ediyor:** Legacy L14 = kesin SUPERSEDED (banner + §66.3 + ROADMAP §142).
  Campfire *mekaniği* locked; **kesin L24 sınırı + fiyat DEFERRED**. Uzlaştırıcı okuma
  (Pack 01 §5.2): "Campfire mekanik locked, tam L24 boundary + price değil."
- **Statü:** PARTIAL — mild unreconciled tension (Answers "locked" vs §66.3 "deferred").
  → [[Monetization and Scope Boundaries]], [[Deferred Decisions]], [[05 Open Loops]].

## C4 (CROWN) — STATUS "7 lessons"/`91f1b04` vs 16 v1 dosyası

- **Çelişki:** `STATUS.md` "Current main `91f1b04`" snapshot'ı `V1_LESSONS = [lesson000…006]`
  ve "Round 1 L0-L6 slice COMPLETE" der (7 ders). Gerçek working tree = **16 dosya**
  (`lesson-000.ts`…`lesson-015.ts`), hepsi `V1_LESSONS`'a kayıtlı.
- **Kim kontrol ediyor:** Kod (current-codebase truth) → **L0-L15 authored+registered**;
  ama **L0-L6 learner-visible**, L7-L15 Home-gated (`number<=6`). STATUS snapshot'ı `91f1b04`
  bir eski andır; sonraki content factory PR'ları (L7-L15 compact) eklendi.
- **Statü:** RESOLVED (STATUS snapshot stale-tuzağı; "authored ≠ visible"). L7-L15'in gerçek
  kayıt durumu bu geçişte doğrudan koşulmadı → [[Needs Verification]]. → [[Lesson Status Matrix]].

## C5 (CROWN) — İki roadmap: CAIRN_ROADMAP_202607 vs ROADMAP.md

- **Çelişki:** İki canlı roadmap uzlaştırılmamış:
  - `CAIRN_ROADMAP_202607.md` — **engine-first** (Faz 0-7, motor önce wire).
  - `ROADMAP.md` — **deployment-first** "Beş Taş" (2026-07-05, önce lesson-experience skeleton
    ship). ~24 PR, ~2 ay.
- **Fark:** Sıralama farkı (engine wiring vs "ship experience first"). Hiçbir doc hangisinin
  supersede ettiğini açıkça söylemiyor; `README` `ROADMAP.md`'i aktif sprint spec listeler
  ama `CAIRN_ROADMAP_202607.md`'i listelemiyor.
- **Kim kontrol ediyor:** UNKNOWN — sıradaki PR için hangisi authoritative belirsiz.
  ROADMAP.md daha yeni (2026-07-05) ve README'de active; ama engine-first roadmap iptal
  edilmemiş.
- **Statü:** OPEN. → [[Unknowns]], [[Sprint Timeline]], [[05 Open Loops]].

## C6 — Item sayısı: 54 (registry) vs 56 (manifest) vs 52 (audit)

- **Çelişki:** Üç sayı, üç kaynak:
  - `ITEM_REGISTRY` canlı object = **54 key** (Pack 05 §4).
  - `shipped-item-ids.json` = **56 kayıtlı id**.
  - L1_L15 chip audit (`84a5b8e`) = **52 item / 41 used / 11 dormant**.
- **Kim kontrol ediyor:** Her kaynak kendi anındaki gerçeği söyler; **birine zorlama**. 54-vs-56
  drift gerçek ve K3 bidirectional check tam bunu yakalamak için var. 52 audit daha eski
  base'de.
- **Statü:** OPEN (gerçek drift). `validate:content`'in şu an geçip geçmediği doğrulanmadı →
  [[Needs Verification]]. → [[Registry Usage Matrix]], [[Test Source Index]].

## C7 — AI model routing tablosu vs gerçek provider zinciri

- **Çelişki:** `CLAUDE.md:89-94` legacy tablo: Gemini 2.5 Flash-Lite / Gemini Flash / **Claude
  Haiku**. Gerçek `_shared/providers.ts` zinciri: Gemini 2.5 Flash → Gemini 2.5 Pro → Groq
  Llama 3.3 → Mistral Small, **no Claude**.
- **Kim kontrol ediyor:** Kod (provider chain). Legacy tablo yanlış; ayrıca AI dormant
  (`aiEnabled=false` dev-apk + public-beta) olduğu için moot.
- **Statü:** RESOLVED (spec-vs-reality; D2 doc-sync fix). AI dormant olduğu sürece pratik
  etkisi yok. → [[AI Architecture]], [[Superseded Decisions]].

## C8 — Rich chip taxonomy (spec) vs runtime tek `status` enum

- **Çelişki:** chip-taxonomy v0.3 = 13 davranışsal chip tipi + 3-yönlü verdict; runtime
  `LearningItem.status` = tek alan (`active|supported|recognition|recycled`).
- **Kim kontrol ediyor:** Kod (runtime tek enum). v0.3 CANONICAL-ama-spec-only/revisable;
  yalnızca V3/V4 build-time validator `status`'ı okur.
- **Statü:** SPEC-VS-RUNTIME divergence (çelişki değil, katman farkı). → [[Chip Taxonomy]],
  [[Spec to Runtime Matrix]].

## C9 — İki disjoint store: `lm7` (v1) vs `lm_le_events` (engine)

- **Çelişki:** Home/Progress/Daily Review legacy `lm7`'i okur; engine `lm_le_events` yazar;
  ikisi kesişmez → "the main integration blocker".
- **Kim kontrol ediyor:** Her iki store da gerçek/IMPLEMENTED; **köprü henüz yok**. Karar
  (D-10): uzun vade `lm_le_events` canonical; sahte `lm7` marker yok.
- **Statü:** OPEN (bilinen entegrasyon bloğu). → [[Storage Architecture]], [[Data Flow]],
  [[Spec Runtime Divergences]].

## C10 — L7 spec: full aller vs compact doorway

- **Çelişki:** `L07-aller-movement-next-step.lesson-spec.md` full aller motoru anlatır;
  `L07-compact-doorway.compact-spec.md` **tam 2 frozen chunk** der; runtime `lesson-007.ts`
  compact yönde inşa edildi.
- **Kim kontrol ediyor:** Compact spec + runtime (full spec "SUPERSEDED as next PR"). L7
  implementation ayrıca **BLOCKED** (operator smoke + Home cap kararı).
- **Statü:** RESOLVED-by-precedence (compact kazanır); implementasyon BLOCKED.
  → [[L7 Je Vais]], [[Deferred Decisions]].

## Nasıl kullanılır
- Bir çelişki "çözüldü" demek için: resolving kaynağı + çatışma kuralını göster.
- OPEN olanları [[05 Open Loops]]'a yansıt; doğrulanmamış olanları [[Needs Verification]]'a.

## İlgili notlar
- [[Source Ledger]] · [[Unknowns]] · [[Needs Verification]]
- [[Superseded Decisions]] · [[06 Canon and Status Legend]] · [[05 Open Loops]]

<!-- gh-nav -->

## 🧭 GitHub Navigation

[⬆ README](../../README.md) · [🪨 Holy Codex](../00_START_HERE/00%20Le%20Mot%20Holy%20Codex.md) · [Current State](../00_START_HERE/03%20Current%20State.md) · [Open Loops](../00_START_HERE/05%20Open%20Loops.md)

**Bu klasördeki notlar (98_GAPS):**

- [Contradictions](./Contradictions.md) ⟵ *bu not*
- [Missing Documentation](./Missing%20Documentation.md)
- [Needs Verification](./Needs%20Verification.md)
- [Unknowns](./Unknowns.md)
- [Unmapped Ideas](./Unmapped%20Ideas.md)
