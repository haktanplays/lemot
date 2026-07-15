---
title: Product Vision
aliases: [Cairn Vision, Vizyon, Ürün Vizyonu]
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
source_of_truth: ["docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md", "docs/CAIRN_PRODUCT_ANSWERS_2026_07.md", "docs/DEV_APK_MVP_CANON.md"]
code_refs: []
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Product Promise]]", "[[Learning Philosophy]]", "[[Non-Goals]]", "[[Weave System]]"]
supersedes: []
superseded_by: []
tags: [product, vision, canon]
---

# Product Vision

<!-- gh-toc -->

## İçindekiler

- [Amaç (bu not neyi cevaplar?)](#amaç-bu-not-neyi-cevaplar)
- [Kuzey yıldızı (CANONICAL)](#kuzey-yıldızı-canonical)
- [Kime yapılıyor? (hedef öğrenci)](#kime-yapılıyor-hedef-öğrenci)
- [Ne değil? (vizyon negatifi)](#ne-değil-vizyon-negatifi)
- [Killer mekanik: Weave](#killer-mekanik-weave)
- [Vizyon nerede, gerçeklik nerede? (statü dürüstlüğü)](#vizyon-nerede-gerçeklik-nerede-statü-dürüstlüğü)
- [İlgili Notlar](#ilgili-notlar)
- [🧭 GitHub Navigation](#-github-navigation)

> [!canon] Cairn'in **kuzey yıldızı**: Fransızcayı *önce kullanılabilir dil parçaları*, *kişisel hafıza*, *bağlama gömülü minik dersler* ve *geciktirilmiş mikro-mantık* üzerinden öğretmek.
> — Cairn v1.0 spec (CANONICAL, intent katmanı, `CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md:55`)

## Amaç (bu not neyi cevaplar?)

Bu not, "Cairn / Le Mot **ne olmak istiyor**?" sorusunun tek canonical evidir.
Ürünün *sözünü* [[Product Promise]], *felsefesini* [[Learning Philosophy]],
*neyi reddettiğini* [[Non-Goals]] taşır; burada yalnızca **vizyon ve
kime yapıldığı** anlatılır.

> [!warning] İki isim, tek ürün. **"Le Mot"** eski (v7) isimdir; ürün **"Cairn"**
> (bir patika taş yığını / trail-marker) olarak yeniden çerçevelenmiştir. Kod
> tabanı hâlâ `lemot-app`. Reframe süreci için bkz. [[00 Le Mot Holy Codex]] ve
> [[Superseded Decisions]].

## Kuzey yıldızı (CANONICAL)

Ürünün en yüksek seviye ifadesi, v1.0 spec'inde dört satırlık bir manifesto olarak kilitlidir:

> "Cairn teaches usable chunks first, / lets the learner use them inside real intent, /
> reveals logic after contact, / and uses memory state to decide what returns, when, and why."
> — CANONICAL, `...v1_0.md:59-64`

En kritik kanon satırları (CANONICAL, `...v1_0.md:68-80`):

- **"Use first. Understand deeply. Return stronger."**
- **"No grammar dump before contact."**
- **"Whole first → use → notice → unpack → reuse."**

Bu sıra tesadüf değil: [[Learning Philosophy]]'deki temel döngünün
(Contact → Use → Compare → Notice → Unpack → Reuse) ürün-seviyesi özetidir.

## Kime yapılıyor? (hedef öğrenci)

> [!canon] En güncel founder niyeti (2026-07-04): hedef öğrenci **"nerdy hobbyists
> who want to learn the language INSIDE-OUT — people like Haktan himself."**
> Turist değil, deadline'lı sınav öğrencisi değil, streak-kovalayan gündelik
> kullanıcı değil. Mantığı ve mekaniği istiyorlar, ezber değil. İlham: LearnCraft
> Spanish podcast. — CANONICAL, `CAIRN_PRODUCT_ANSWERS_2026_07.md:7-20`

Bu hedefin **ürün sonuçları** (CANONICAL, `...ANSWERS...:14-20`):

- Insight kartları "bir çentik daha derine" gidebilir — *ama hâlâ konjugasyon
  tablosu yok*. Bkz. [[Insight and Notice]].
- Transaction-urgency (turistik aciliyet) item'ları önceliğini düşürür.
- Mekanik kapıları (zamirler, kip mantığı) önceliğini yükseltir.

> [!historical] Eski v0.1 hedef tanımı ("Duolingo-fatigued serious learners,
> zero-to-B2, culture/travel/self-improvement; non-target: çocuklar, oyunlaştırma
> tutkunları, deadline'lı sınav") SUPERSEDED'dir (`CAIRN_PRODUCT_DEFINITION_v0.1.md:39-53`).
> Yön olarak uyumlu ama artık bağlayıcı değil; en güncel founder Q&A hedefi geçerlidir.

## Ne değil? (vizyon negatifi)

Vizyon, ne *olmadığıyla* da tanımlanır (CANONICAL, v1.0 §2.1, `...v1_0.md:96-107`).
Cairn **değildir**: bir konuşma kılavuzu (phrasebook), çeviri-drill motoru, saf
flashcard uygulaması, temastan önce gramer ders kitabı, cümle-ezberleme makinesi,
denetimsiz AI gramer açıklayıcısı, "daha çok chip her zaman daha iyi" sistemi, ya
da acemiden kusursuz native üretim bekleyen bir app. Tam liste: [[Non-Goals]].

## Killer mekanik: Weave

Vizyonun somut farklılaştırıcısı **[[Weave System|Weave]]**'dir: öğrenci
sahiplendiği Fransızca "engine"lerden bir iskelet kurar, bilmediği parçaları
İngilizce bırakır.

> [!example] `je voudrais you to répéter this` · `je voudrais but pas today`
> — CANONICAL Weave register örnekleri, `CAIRN_PRODUCT_ANSWERS_2026_07.md:22-38`.
> Açık karışık Weave'ler **notlandırılmaz** (W1 LOCKED): cevap ver → [[Natural Reveal]]
> çalıştır → karşılaştır. "Passive mirror, never exact-match validation."

## Vizyon nerede, gerçeklik nerede? (statü dürüstlüğü)

> [!warning] Vizyon = **CANONICAL intent**, ama **implementation_status: partial**.
> Bugün gerçekten sevkedilen yüzey yalnızca **Round 1 Dev APK, L0–L6**, donduruldu.
> Tam ürün vizyonu (~150+ ders, self-producing engine, Mon Lexique, Campfire)
> büyük ölçüde spec/sandbox seviyesindedir. Ayrıntı: [[03 Current State]],
> [[Dev APK Scope]], [[Product Stages and Feature Flags]].

Precedence açısından v1.0 spec **build authority değildir**: "anything being built
now" için current-build canon (`DEV_APK_MVP_CANON.md` + `STATUS.md`) v1.0'ı yener
(CANONICAL, `README.md:20-42`; `...v1_0.md:4702-4710`).

## İlgili Notlar

- Üst indeks: [[00 Le Mot Holy Codex]]
- [[Product Promise]] — öğrenciye verilen somut söz
- [[Learning Philosophy]] — temel öğrenme döngüsü
- [[Non-Goals]] — vizyonun negatifi, yasaklı yön
- [[Weave System]] — killer mekanik

<!-- gh-nav -->

## 🧭 GitHub Navigation

[⬆ README](../../README.md) · [🪨 Holy Codex](../00_START_HERE/00%20Le%20Mot%20Holy%20Codex.md) · [Current State](../00_START_HERE/03%20Current%20State.md) · [Open Loops](../00_START_HERE/05%20Open%20Loops.md)

**Bu klasördeki notlar (01_PRODUCT):**

- [Dev APK Scope](./Dev%20APK%20Scope.md)
- [Learner Experience Principles](./Learner%20Experience%20Principles.md)
- [Learning Philosophy](./Learning%20Philosophy.md)
- [Monetization and Scope Boundaries](./Monetization%20and%20Scope%20Boundaries.md)
- [Non-Goals](./Non-Goals.md)
- [Product Promise](./Product%20Promise.md)
- [Product Risks](./Product%20Risks.md)
- [Product Stages and Feature Flags](./Product%20Stages%20and%20Feature%20Flags.md)
- [Product Vision](./Product%20Vision.md) ⟵ *bu not*
- [User Journey](./User%20Journey.md)
