---
title: Canonical Context Pack
aliases: [Canon Pack, Load-Bearing Facts, Kanon Paketi]
type: handoff
domain: meta
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["CLAUDE.md", "docs/STATUS.md", "docs/DEV_APK_MVP_CANON.md", "docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md"]
related: ["[[00 Le Mot Holy Codex]]", "[[Agent Start Here]]", "[[Agent Do Not Assume List]]", "[[06 Canon and Status Legend]]", "[[08 Source of Truth Map]]"]
tags: [agent, context, canon]
---

# Canonical Context Pack

<!-- gh-toc -->

## İçindekiler

- [Ürün (tek cümle)](#ürün-tek-cümle)
- [İki isim, tek ürün](#iki-isim-tek-ürün)
- [Üç runtime (kritik ayrım — asla karıştırma)](#üç-runtime-kritik-ayrım-asla-karıştırma)
- [Killer mekanik: Weave](#killer-mekanik-weave)
- [Yasaklı dil (kanon-geneli, kodda enforce)](#yasaklı-dil-kanon-geneli-kodda-enforce)
- [Precedence (çakışma çözümü)](#precedence-çakışma-çözümü)
- [Runtime dersler (sayı hijyeni)](#runtime-dersler-sayı-hijyeni)
- [7 donmuş v1 ekran tipi](#7-donmuş-v1-ekran-tipi)
- [Registry & sayı çelişkileri (her kaynağın sayısını ayrı belirt)](#registry-sayı-çelişkileri-her-kaynağın-sayısını-ayrı-belirt)
- [Product stage & flag'ler (fail-closed)](#product-stage-flagler-fail-closed)
- [Storage (iki ayrı dünya)](#storage-iki-ayrı-dünya)
- [Mastery (engine, tested-only)](#mastery-engine-tested-only)
- [YASA'lar (her PR ile biner)](#yasalar-her-pr-ile-biner)
- [Karpathy engine-purity sözleşmesi](#karpathy-engine-purity-sözleşmesi)
- [Paywall](#paywall)
- [Privacy](#privacy)
- [Round 1 durumu](#round-1-durumu)
- [L1 chip listesi](#l1-chip-listesi)
- [İlgili Notlar](#ilgili-notlar)

> [!canon] Bir ajanın **her zaman aklında tutması gereken load-bearing gerçekler**.
> Bu not bir **özet + yönlendiricidir**; her satırın kanonical bir ana evi vardır ve
> oraya link verir. Buradaki bir sayı ile başka bir yerdeki bir sayı çelişirse,
> **ana evi** doğrula — bu not onları kopyalar, üretmez.

## Ürün (tek cümle)
İngilizce konuşanlar için Fransızca üretim motoru. **Söz:** önce kullanılabilir chunk'lar öğret →
gerçek niyet içinde kullandır → mantığı temastan *sonra* aç → neyin geri döneceğine hafıza karar versin.
Ana evi: [[Product Promise]] · [[Learning Philosophy]].

## İki isim, tek ürün
"**Le Mot**" (eski v7) → "**Cairn**" (patika taş yığını) olarak yeniden çerçeveleniyor.
Kod tabanı hâlâ `lemot-app`. [[Cairn Brand Direction]].

## Üç runtime (kritik ayrım — asla karıştırma)

| Sistem | Ne | Statü | Kullanıcı görür mü? |
|---|---|---|---|
| **A. Legacy 24-lesson** | v7 akışı (`data/lessons` → `SECS`) | HISTORICAL, dev-apk gizli | Hayır |
| **B. Static authored v1** | `content/lessons/v1/*`, `LessonRendererV1`, 7 donmuş ekran tipi | **IMPLEMENTED — sevkedilen dev-apk yüzeyi** | **Evet, L0–L6** |
| **C. Learning-engine** | `content/learning-engine/*` saf modüller | Gerçek kod, sandbox/founder-gated | Hayır |
Ana evi: [[Runtime Content Architecture]]. Karar: [[Decision Index]] D-08/D-09.

## Killer mekanik: Weave
Öğrenci sahiplendiği Fransızca engine'lerden iskelet kurar, bilmediği parçalar İngilizce kalır
(`je voudrais but pas today`). **Açık Weave'ler GRADELENMEZ** → cevap → Natural Reveal.
Ana evi: [[Weave System]]. Karar D-03.

## Yasaklı dil (kanon-geneli, kodda enforce)
`XP`, `streak`, `level up`, `achievement`, `amazing / perfect score`, `goal complete`,
"come back tomorrow" baskısı **YASAK**. Ton: **passive-mirror** mentor ("You are on the path.").
Ana evi: [[ADR-0001 no-xp-streak-reward-language]] · [[ADR-0002 calm-passive-mirror-mentor-tone]] · [[Copy and Tone]].

## Precedence (çakışma çözümü)
`CLAUDE.md → docs/STATUS.md → docs/DEV_APK_MVP_CANON.md → Cairn v1.0 spec`.
Genel kural: **newer active > current codebase > older active > design ref > archive**.
Ana evi: [[08 Source of Truth Map]] · [[06 Canon and Status Legend]].

## Runtime dersler (sayı hijyeni)
`content/lessons/v1/` = **16 dosya lesson-000..015 (L0–L15)**, hepsi `V1_LESSONS`'da kayıtlı.
**L0–L6 learner-visible; L7–L15 kayıtlı ama Home-gated** (`index.tsx` `number<=6` ile kısıtlar).
STATUS.md'nin "7 ders" ifadesi **bayat `91f1b04` snapshot**. L16–L17 spec-only (dosya yok).
Ana evi: [[Runtime Lesson Map]] · [[Lesson Status Matrix]].

## 7 donmuş v1 ekran tipi
`content/lessonTypes.ts`: **MeetCard, InsightCard, FillWithTraps, Weave, SayItYourWay, NaturalReveal, Recap**.
Meet/Insight/Recap bugün statik Continue ekranı; per-screen etkileşim Faz B PLANNED. Tip seti ~10'da donuk (D-32).
Ana evi: [[Lesson Anatomy]] · [[Exercise System Overview]].

## Registry & sayı çelişkileri (her kaynağın sayısını ayrı belirt)
`content/itemRegistry.ts` = `ITEM_REGISTRY`, **54 item (frozen)**; `shipped-item-ids.json` **56 id** listeler
(**54-vs-56 drift gerçek**, K3 iki-yönlü validator yakalar). L1_L15 audit kendi anında **52 item / 41 used / 11 dormant** saydı.
**Tek bir sayıya zorlama — her kaynağı adıyla belirt.** Ana evi: [[Registry Architecture]] · [[Registry Usage Matrix]].

## Product stage & flag'ler (fail-closed)
`sandbox | dev-apk | public-beta`; unset/mistyped → **`dev-apk`** (en kısıtlı, asla sandbox).
dev-apk OFF: paywall / aiChat / aiEnabled / practice / progress / dailyReview / wordGraph / monLexique;
`aiLesson=true`. public-beta paywall+RevenueCat ekler, `aiEnabled` hâlâ false. **AI stack fiilen dormant.**
Ana evi: [[Product Stages and Feature Flags]] · [[Product Stage Architecture]]. Karar D-20.

## Storage (iki ayrı dünya)
Native `expo-sqlite/kv-store`, web `localStorage`. Legacy `lm7` ({p,err,dr}) + `lm7_srs`;
engine `lm_le_events` (**source of truth**) / `lm_le_snapshot` / `lm_le_privacy_state`.
**`lm_le_*` ve `lm7` disjoint** ("ana entegrasyon blokeri"): engine events yazıyor, Home/Progress/Daily Review hâlâ `lm7` okuyor.
Ana evi: [[Storage Architecture]] · [[Data Flow]]. Karar D-10/D-11.

## Mastery (engine, tested-only)
Saf `scoreEvents()` → counter-derived `MasterySnapshot`; `WEAK_THRESHOLD=3`; Leitner `[0,1,3,7,30]`;
prompt-fade PF0–PF3; `monLexiqueStatus` hidden/added/weak; **Challenge = weak-only**;
near-miss (punctuation/accent/spelling) = **soft signal, asla failure değil**.
Ana evi: [[Mastery Model]]. Karar D-23.

## YASA'lar (her PR ile biner)
- **YASA 1:** schema değişimi ⇒ migration **aynı PR'da**. (D-13)
- **YASA 2:** shipped `itemId` **değişmez** (rename yasak; validator HARD ERROR). (D-14)
- **YASA 3:** shipped error-tag **değişmez** (54/30 frozen, kaynağa göre). (D-15)
Ana evi: [[Technical Debt]] · [[Validation Gates]] · [[Registry Architecture]].

## Karpathy engine-purity sözleşmesi
Engine kodu: **PURE** (storage/network/React/AI yok) · **DETERMINISTIC** (tie'lar açık) ·
**EXPLICIT now** (clock parametre; `Date.now()`/`Math.random()` yok) · **FAIL-CLOSED** (null/"unsupported", veri kaybı yok).
Ana evi: [[Claude Code Workflow]] · `docs/engineering/karpathy.md`. Karar D-12.

## Paywall
Cairn için **Campfire ~L24** (L1–L20 free). Legacy "L14 / $12.99" **SUPERSEDED**.
(Hafif çözülmemiş gerilim: spec §66.3 pozisyonu validation-sonrası yeniden karar der.)
Ana evi: [[Monetization and Scope Boundaries]] · [[Future Features]]. Karar D-30.

## Privacy
Local-first; P5.1–P5.4C **IMPLEMENTED** (versioned PrivacyState, one-time disclosure, export summary,
two-step reset, PR-H reset epoch barrier). Cloud deletion **DEFERRED** (audit C1). Remote Supabase sync
consent-gated, `le_*` şeması **PROPOSED**, owner-scoped RLS, client'ta `service_role` **asla**.
Ana evi: [[Privacy and Data Deletion]] · [[Supabase]]. Karar D-21/D-40.

## Round 1 durumu
L0–L6 **ACCEPTED & FROZEN** (emülatör smoke #136 / `8cefe81`, P0–P3 sıfır). Fiziksel cihaz smoke +
EAS build = **operator-only, bekliyor**. HEAD `02f9f7a` (#196). PR #197 (privacy) = **paused, merged DEĞİL**,
17 unresolved thread (canlı GitHub'ı doğrula). Ana evi: [[03 Current State]] · [[05 Open Loops]].

## L1 chip listesi
**Bilinçli olarak FINALIZE EDİLMEDİ** — aktif açık tasarım kararı (~34–35 hedef obje, 31 aday, 3–4 eklenecek).
**Final listeyi icat etme.** Ana evi: [[L1 Survival Kit]] · [[Current Task Context]].

## İlgili Notlar
- [[Agent Start Here]] · [[Agent Do Not Assume List]] · [[06 Canon and Status Legend]]
- [[Product Context Pack]] · [[Learning Engine Context Pack]] · [[Syllabus Context Pack]] · [[Design Context Pack]] · [[Architecture Context Pack]]
