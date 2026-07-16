---
title: L1 Survival Kit
aliases: [L1, Lesson 1, Survival Kit, v1-lesson-001]
type: lesson-spec
domain: syllabus
status: active-redesign
canon_status: provisional
implementation_status: partial
verification_status: source-inspected
lesson_id: v1-lesson-001
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-15
last_reviewed: 2026-07-15
source_of_truth: ["docs/syllabus/L01-survival-kit.lesson-spec.md", "docs/audits/L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md", "content/lessons/v1/lesson-001.ts"]
code_refs: ["lemot-app/content/lessons/v1/lesson-001.ts"]
related: ["[[L0 The First Step]]", "[[Chip Taxonomy]]", "[[Chip Coverage Matrix]]", "[[Syllabus Design Rules]]", "[[05 Open Loops]]", "[[Active Decisions]]"]
tags: [syllabus, lesson, l1, open-design]
---

# L1 — Survival Kit

<!-- gh-toc -->

## İçindekiler

- [L1 statü ayrımı (runtime vs redesign)](#l1-statü-ayrımı-runtime-vs-redesign)
- [Lesson Identity](#lesson-identity)
- [Learner Job](#learner-job)
- [L0 ≠ L1 (kilitli ontoloji)](#l0-l1-kilitli-ontoloji)
- [L1 Redesign — Working Memory (RECORD, DO NOT FINALIZE)](#l1-redesign-working-memory-record-do-not-finalize)
- [L1_L15 Chip Inventory Audit (2026-07) — L1 bulguları](#l1l15-chip-inventory-audit-2026-07-l1-bulguları)
- [Exercise Sequence (runtime, lesson-001.ts)](#exercise-sequence-runtime-lesson-001ts)
- [Evidence and Mastery](#evidence-and-mastery)
- [Open Decisions](#open-decisions)
- [Deferred / Rejected](#deferred-rejected)
- [History](#history)

> [!canon] **İki ayrı katman — KARIŞTIRMA.** Mevcut **runtime L1 dersi**
> (`v1-lesson-001`) authored & registered & learner-VISIBLE; **kendi baseline'ında**
> geçmişte device-verified (Round 1 #136 emülatör smoke; ayrıca `8cfdce75` fiziksel
> spot-check). **AMA** L1'in **chip envanteri redesign'ı ayrı bir katmandır** —
> implement edilmedi, device-verified değil, final değil. Bu not ikisini karıştırmadan kaydeder.

> [!open-loop] **L1 chip listesi bilinçli olarak KİLİTLENMEDİ.** Bu, açık bir
> tasarım kararıdır (bkz. [[05 Open Loops]] · [[Active Decisions]]). Aşağıdaki
> "current working selection" son karar değildir.

## L1 statü ayrımı (runtime vs redesign)

| Layer | Canon | Implementation | Verification | Meaning |
|---|---|---|---|---|
| Mevcut runtime L1 baseline | current-runtime / tarihsel baseline | implemented | **kendi kayıtlı baseline'ında** geçmişte device-verified; güncel-main smoke pending olabilir | Mevcut yazılmış ders (`v1-lesson-001`) |
| 31 + 3–4 chip redesign | provisional / open | **not implemented** | **unverified** | Güncel founder tasarım işi |
| Bu doküman notu | provisional sentez | documentation-only | source-inspected | İki katmanı **karıştırmadan** kaydeder |

Açıkça:
- Mevcut ders **runtime'ı** ve yeni **redesign** = **farklı katmanlar.**
- **31 + 3–4 redesign implement EDİLMEDİ.**
- Redesign **device-verified DEĞİL.**
- Redesign **final DEĞİL** (liste kilitli değil).
- **Tarihsel runtime pass'inden yeni bir device verification ÇIKARILAMAZ.** Runtime baseline'ın device-verified'liği yalnız o baseline'a aittir; redesign'a taşınmaz.

## Lesson Identity
İlk gerçek ders (spine'ın başı). "Survival Kit": bir öğrencinin Fransızca bir
ortamda ilk dakikada hayatta kalmasını sağlayan en küçük, en yüksek getirili
parça seti — nezaket formülleri + birkaç ihtiyaç ismi + ilk üretim iskeletleri.

## Learner Job

### Stable L1 communicative purpose
Öğrencinin bu derste **sabit** iletişim amacı (can-do, gramer etiketi değil) —
bu kısım kararlıdır, chip listesinden bağımsızdır:
- sosyal olarak **açılış** (open socially)
- **kibar bir istek** yapmak (make a polite request)
- bir **iletişim kopmasını yönetmek** (handle a communication breakdown)
- kibarca **kapatmak** (close politely)

### Working redesign capability candidates
Mevcut 31-nesne havuzu şu üretim yeteneklerini **keşfediyor** (henüz sabit
sahiplik DEĞİL — [PROPOSED / OPEN]):
- `je voudrais + [nom/action]`
- sınırlı `pouvez-vous + [infinitif]`
- `ne ___ pas`
- `où + être + [lieu]`
- `je suis`

Açıkça:
- Nihai **active / support / recognition / ghost** sınıflandırması **açık.**
- Her aday **aktif L1 üretim hedefi olmayacak.**
- Bazı adaylar sonraki dersler için **ghost / seed / support** kalabilir.
- Bu not, sınıflandırma yapılmadan **nihai learner ownership VAAT ETMEZ.**

> [!warning] Kanonik yer-sorma pattern'i **`où + être + [lieu]`**'dir — **`où + est` DEĞİL.**
> Örnekler (yüzey ayrımı):
> - `où | est | la gare`
> - `où | est | l'hôtel`
> - `où | sont | les toilettes`
>
> `est` ve `sont` **`être`'nin yüzey gerçekleşmeleridir** (surface realizations);
> otomatik olarak **ayrı lexical accounting chip DEĞİLDİR.** Bkz. [[Chip Taxonomy]].

## L0 ≠ L1 (kilitli ontoloji)

> [!canon] L0 bir **first-use / ilk-temas köprüsüdür**, Lesson 1 değildir.
> Formel spine/chip sistemi **L1'de başlar.** L0'da benzer bir dil görünmüş
> olması, L1 chip'lerini "L0 carryover" olarak sınıflamak için **gerekçe değildir.**
> Bu yeniden-tasarımda **L0 carryover sınıflandırması REDDEDİLDİ.** [CANONICAL]
> Detay: [[L0 The First Step]].

## L1 Redesign — Working Memory (RECORD, DO NOT FINALIZE)

> [!warning] Aşağıdaki her şey **açık tasarım durumudur.** Hedef kabaca **34–35
> öğrenme nesnesi/chip.** Mevcut çalışan seçim **31 nesne** içeriyor. Kurucu
> (founder), sonradan **3–4 chip daha** eklenmesi gerektiğini belirtti — bu vault
> build'i sırasında **bunlar kesinleştirilmez.** [PROPOSED / OPEN]

### Current selected pool (31 nesne)

**Social / formula chunks (10)** — bütün olarak kalabilir (formula chunk):
`bonjour` · `merci` · `s'il vous plaît` · `excusez-moi` · `pardon` ·
`au revoir` · `d'accord` · `bonsoir` · `salut` · `beaucoup`

**Functional / accounting (2):** `je` · `où`

**Noun / packages (12)** — noun-package chip olabilir:
`de l'eau` · `un café` · `un thé` · `le menu` · `l'addition` · `une table` ·
`une chambre` · `un billet` · `le Wi-Fi` · `les toilettes` · `la gare` · `l'hôtel`

**Spines (3):** `je voudrais` · `pouvez-vous` · `je suis`

**Patterns (4):** `ne ___ pas` · `où + être + [lieu]` ·
`je voudrais + [nom/action]` · `pouvez-vous + [infinitif]`

### Ontolojik notlar (kilitli ilkeler — [[Chip Taxonomy]])

> [!warning] Bunlar chip tasarımının doğruluk kurallarıdır; ihlal edilirse
> mastery kanıtı yanlış nesneye bağlanır.

- **Bir cümle tek bir chip DEĞİLDİR.** Bir cümle, chip'lerin bir *bileşkesidir*;
  yalnızca model answer olabilir, primary UI chip olamaz.
- **Yüzey formu otomatik olarak ayrı bir accounting chip değildir.** (ör. `est`
  yüzeyi `être`'den ayrı bir lexical chip olarak kanonlaştırılmaz.)
- `où est` **körlemesine lexical chip olarak kanonlaştırılmamalı.** `où`, `être`,
  yüzey `est/sont`, location-package ve location-question pattern **farklı
  katmanlardır.**
- `comprendre` lemma'dır; `comprends` bir yüzey gerçekleşmesidir.
- `ne ___ pas` **üretken bir pattern'dir.** `je ne comprends pas` otomatik olarak
  tek bir primary UI chip'e dönüşmemeli.
- `s'il vous plaît` bir formula chunk olarak **bütün kalabilir.**
- `de l'eau`, `un café` vb. **noun/package chip** olabilir.
- Seçilen bazı spine'lar mimari olarak **daha sonraki derslere** ait; L1'de
  **ghost/seed/support** olabilir, L1'in aktif sahipliği olmayabilir.

> Bu sınıflandırma **açık bir tasarım görevidir** — [[05 Open Loops]].

### Watchlist (onaylı ekleme DEĞİL)

Olası doldurucu adaylar — yalnızca izleme, henüz eklenmedi:
`comprendre` · `répéter`. Bkz. [[Watchlist]]. [PROPOSED, watch-only]

## L1_L15 Chip Inventory Audit (2026-07) — L1 bulguları

> [!implemented] Audit verdict: **`CLEAN_WITH_REVIEW_ITEMS`** — 16 ders / **80 chip**
> genelinde **sıfır ihlal** (full-sentence chip yok, full-question chip yok,
> protected-chunk suistimali yok). Kaynak:
> `docs/audits/L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md`.

- Registry: audit anında **52 item**, 41 kullanılıyor (26 active / 11 supported /
  4 recognition), **11 dormant**.
- Tek mekanik REVIEW sınıfı = **R3 identity gap**: `ici` ve `faim` chip olarak
  üretiliyor ama registry itemId'si **yok** → mastery event'leri hiçbir şeye
  bağlanmıyor. Fix bir "registry hygiene pass"e ertelendi. → [[Needs Verification]] · [[Technical Debt]]
- (Registry sayıları kaynaklar arasında farklı: audit 52 der, `itemRegistry.ts`
  54 der, `shipped-item-ids.json` 56 id — [[Contradictions]] · [[Registry Architecture]].)

## Exercise Sequence (runtime, `lesson-001.ts`)

Kanıta göre L1 ekran sırası:
`insight(goal) → meet → insight → meet → fill → weave → meet → weave → meet → say-it → recap`
— [[Lesson Flow]] canon spine ile örtüşüyor. Ekran tipleri: [[Meet]] · [[Insight and Notice]] ·
[[Fill]] · [[Weave]] · [[Say It Your Way]] · [[Review]].

## Evidence and Mastery
v1 renderer runtime'da **LearningEvent üretmiyor** (mastery/error yalnızca
learning-engine'de, sandbox). L1 tamamlanması `lm7` blob'unda tek monotonik
completion marker olarak yazılır. [[Mastery Model]] · [[Error Tracking System]].

## Open Decisions
- Nihai L1 chip listesi (31 → ~34–35): **OPEN.** → [[05 Open Loops]]
- Seçili spine'ların hangilerinin L1-aktif vs ghost/seed olduğu: **OPEN.**
- `ici`/`faim` identity gap (R3): registry hygiene pass bekliyor.
- Founder'ın "functional holes" analizi (repair pair eksik, "oui paradox",
  park edilmiş `excusez-moi`, state/feeling gap) → R-A…R-E önerileri operatör
  kararı bekliyor. Bkz. [[Watchlist]].

## Deferred / Rejected
- **Rejected:** L1 chip'lerini L0 carryover olarak sınıflamak.
- **Deferred:** nihai chip kilidi; registry itemId hygiene.

## History
L1 = Survival Kit, PR #121 ile `v1-lesson-001` olarak merge edildi; #131
anti-memorization variation pass. [[Sprint Timeline]].
