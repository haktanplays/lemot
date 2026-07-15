---
title: Agent Do Not Assume List
aliases: [Do Not Assume, Varsayma Listesi, Stale Traps, Bayat Tuzaklar]
type: handoff
domain: meta
status: active
canon_status: canonical
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["CLAUDE.md", "docs/STATUS.md", "docs/MASTER_PIPELINE_v1.2.1.md", "docs/KNOWN_GAPS.md"]
related: ["[[Agent Start Here]]", "[[Canonical Context Pack]]", "[[06 Canon and Status Legend]]", "[[03 Current State]]", "[[05 Open Loops]]"]
tags: [agent, warning, crown-note]
---

# ⛔ Agent Do Not Assume List

<!-- gh-toc -->

## İçindekiler

- [1. v7 24-lesson müfredatını güncel sanma](#1-v7-24-lesson-müfredatını-güncel-sanma)
- [2. XP / streak / reward dilini geri sokma](#2-xp-streak-reward-dilini-geri-sokma)
- [3. v1'in event yaydığını varsayma](#3-v1in-event-yaydığını-varsayma)
- [4. Merged Canon 2026-05-11'i top-level kanon sayma](#4-merged-canon-2026-05-11i-top-level-kanon-sayma)
- [5. L1 chip listesini finalize etme](#5-l1-chip-listesini-finalize-etme)
- [6. Bulutun operator blocker'larını kapatabildiğini varsayma (Rule 11)](#6-bulutun-operator-blockerlarını-kapatabildiğini-varsayma-rule-11)
- [7. Üç runtime'ı birbirine karıştırma](#7-üç-runtimeı-birbirine-karıştırma)
- [8. Learning-engine modüllerini "sevkedilen yüzeye bağlı" varsayma](#8-learning-engine-modüllerini-sevkedilen-yüzeye-bağlı-varsayma)
- [9. 54-vs-56 (ve 52) id drift'ini tek sayıya indirgeme](#9-54-vs-56-ve-52-id-driftini-tek-sayıya-indirgeme)
- [10. STATUS.md "7 ders"ini güncel sanma](#10-statusmd-7-dersini-güncel-sanma)
- [Bonus tuzaklar (daha küçük ama gerçek)](#bonus-tuzaklar-daha-küçük-ama-gerçek)
- [Altın kural](#altın-kural)
- [İlgili Notlar](#ilgili-notlar)

> [!warning] **Taç not. Koda dokunmadan önce oku.** Aşağıdaki her satır, Le Mot / Cairn tarihinde
> gerçekten pahalıya patlamış veya patlamaya aday bir **bayat varsayımdır**. Bunların hiçbirini
> doğru sanma; her biri belgelenmiş bir tuzaktır. Kanon uydurmak yerine dur ve doğrula.

## 1. v7 24-lesson müfredatını güncel sanma
CLAUDE.md gövdesindeki **24 ders / 4 milestone (5-9-6-4) / 11-section flow / "L14'ten sonra paywall $12.99" /
"for English speakers"** = **HISTORICAL/legacy**, banner altında "referans için" tutuluyor. Üzerine inşa etme.
`data/lessons/*`, `flashcards.ts`, `milestones.ts`, practice/chat route'ları `LEGACY — DO NOT BUILD ON THIS` taşır.
Güncel spine: [[Syllabus Overview]] (L0–L24, Core 150). [SUPERSEDED]

## 2. XP / streak / reward dilini geri sokma
`streak` · `XP` · `level up` · `achievement` · `amazing` · `perfect score` · `goal complete` ·
"come back tomorrow" baskısı — **kanon-geneli YASAK** (kodda `theme.ts` MOTIV, MASTER_PIPELINE Rule 3,
agent constitution §4 ile enforce). "streak" → "days on the path". `streak` column schema'dan düştü ama
**bu, streak'in UI'a geri döndüğü anlamına GELMEZ** (migration debt ayrı). [REJECTED/FORBIDDEN] → [[ADR-0001 no-xp-streak-reward-language]]

## 3. v1'in event yaydığını varsayma
Sevkedilen yüzey **runtime B** (`content/lessons/v1/*`) legacy **`lm7`** store'una yazar; append-only
**`lm_le_events`** event spine'ı **runtime C** (learning-engine) tarafından yazılır. **İki store disjoint.**
Home/Progress/Daily Review hâlâ `lm7` okur. Bir v1 dersini oynamak, bir `MasterySnapshot`/Mon Lexique
projeksiyonu **üretmez**. [IMPLEMENTED, ama bağlı değil] → [[Data Flow]] · [[Storage Architecture]]

## 4. Merged Canon 2026-05-11'i top-level kanon sayma
"PARTIALLY HARVESTED" — MC.1/2/4/5/6 kabul; MC.3 revize; MC.7 re-homed; MC.8 re-mapped; MC.9 **cancelled**.
Aktif kararlar için **v1 Canon TOP / current User Journey** oku, bunu değil. Precedence:
`CLAUDE.md → STATUS.md → DEV_APK_MVP_CANON.md → Cairn v1.0 spec`. [SUPERSEDED-as-top] → [[06 Canon and Status Legend]]

## 5. L1 chip listesini finalize etme
L1 chip listesi **bilinçli olarak açık** — aktif tasarım kararı. ~34–35 hedef obje niyeti, **31 aday, 3–4 eklenecek**.
Final listeyi **icat etme**; audit'in R-A…R-E önerileri **Haktan onayı bekliyor**, kanon değil. [PROPOSED] → [[L1 Survival Kit]] · [[Current Task Context]]

## 6. Bulutun operator blocker'larını kapatabildiğini varsayma (Rule 11)
Bulut oturumu "**code-side ready**" diyebilir; **"complete/shipped/done" DİYEMEZ** açık Operator blocker varken:
fiziksel Android smoke, EAS build, EAS env push, Supabase Edge Function deploy, secrets doğrulama,
email-confirmation, build ID kaydı. Bulut vault'a yazmaz; `docs/CLOUD_SYNC_QUEUE.md`'ye kuyruklar. [CANONICAL] → [[05 Open Loops]]

## 7. Üç runtime'ı birbirine karıştırma
- **A. Legacy 24-lesson** (`data/lessons` → `SECS`) — HISTORICAL, dev-apk gizli.
- **B. Static authored v1** (`content/lessons/v1/*`, `LessonRendererV1`, 7 donmuş ekran tipi) — **sevkedilen dev-apk yüzeyi**.
- **C. Learning-engine** (`content/learning-engine/*`, saf modüller) — sandbox/founder-gated, public yüzeyde değil.
Bir iddianın hangi runtime hakkında olduğunu **her zaman** belirt. [CANONICAL] → [[Runtime Content Architecture]]

## 8. Learning-engine modüllerini "sevkedilen yüzeye bağlı" varsayma
Learning-engine gerçek, test edilmiş koddur — **ama live v1 renderer'a AÇIKÇA WIRE EDİLMEMİŞTİR** (chip taxonomy doc'u
bunu net söyler). Mastery / Mon Lexique / Practice Pool / deriveDrill / Lexique Memory: kod var, çoğu tested-only,
**runtime'a bağlı değil**. "Var" ≠ "bağlı" ≠ "kullanıcı görüyor". [IMPLEMENTED-not-wired] → [[Learning Engine Context Pack]]

## 9. 54-vs-56 (ve 52) id drift'ini tek sayıya indirgeme
`itemRegistry.ts` `ITEM_REGISTRY` = **54 item** (frozen); `shipped-item-ids.json` = **56 id**; L1_L15 audit kendi
anında **52 item / 41 used / 11 dormant** saydı. **Drift gerçek** (K3 iki-yönlü validator yakalamak için var).
Her kaynağın sayısını **adıyla** belirt; birini diğerine zorlama. [IMPLEMENTED, drift bilinen] → [[Registry Usage Matrix]]

## 10. STATUS.md "7 ders"ini güncel sanma
STATUS.md'nin `V1_LESSONS = [lesson000..006]` / "7 ders" ifadesi **bayat `91f1b04` snapshot**. Güncel working tree
`content/lessons/v1/`'de **16 dosya (L0–L15)** taşır, hepsi kayıtlı; **learner-visible yalnızca L0–L6** (Home `number<=6`).
L16–L17 spec-only. "authored" ≠ "visible". [HISTORICAL snapshot] → [[Runtime Lesson Map]] · [[Lesson Status Matrix]]

## Bonus tuzaklar (daha küçük ama gerçek)
- **Paywall "L14"** Cairn'e otomatik devretmez → **Campfire ~L24** (L1–L20 free); yeni pozisyon yine de DEFERRED. [[Monetization and Scope Boundaries]]
- **V4-B** seçili **ama DEFERRED**; kullanıcı açıkça reactivate demeden global redesign planlama; ilgisiz işe token refactor sızdırma. [[V4 Studies Disposition]]
- **Sprint 10/11/12** dili + `SPRINT_11_PLAN.md` bayat; tek sprint-state kaynağı `docs/STATUS.md`. CLAUDE.md "Sprint 10 IN PROGRESS" = D1 staleness trap.
- **Model-routing tablosu (Claude Haiku)** implement edilen provider'larla (gemini/groq/mistral) çelişir — bayat.
- **Fail-open sandbox fallback** superseded → **fail-closed → dev-apk** (#104).
- **AI dormant**: `ai_assisted` error id'leri v0'da asla fire etmez; AI learner-critical grading'de yok.
- **Schema-file ≠ deployed DB**: schema'dan column düşmesi, canlı DB'nin değiştiği anlamına gelmez (migration = ayrı, operator-only).
- **`ici` / `faim`** chip olarak üretiliyor ama **registry item'ı yok** (mastery event'i hiçbir şeye bağlanmıyor) — R3 identity gap, fix DEFERRED. Yeni chip'te bu deseni tekrarlama. [[Watchlist]]

## Altın kural
> [!warning] "Detaylı olması, güncel olduğu anlamına gelmez." Bir not/yorum çok ayrıntılı diye onu kanon sanma.
> Şüphedeysen: [[08 Source of Truth Map]] → hangi kaynak hangi katmanı kontrol ediyor, sonra o kaynağı oku.

## İlgili Notlar
- [[Agent Start Here]] · [[Canonical Context Pack]] · [[06 Canon and Status Legend]]
- [[03 Current State]] · [[05 Open Loops]] · [[Contradictions]] · [[Needs Verification]]
