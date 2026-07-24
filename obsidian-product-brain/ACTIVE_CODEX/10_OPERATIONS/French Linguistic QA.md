---
title: French Linguistic QA
aliases: [French QA, Linguistic QA, Native-Speaker QA, Fransızca QA, Dil Kalite Kontrolü, French Proofreading]
type: workflow
domain: ops
status: active
canon_status: provisional
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-17
last_updated: 2026-07-18
last_reviewed: 2026-07-18
source_of_truth: ["obsidian-product-brain/ACTIVE_CODEX/10_OPERATIONS/Content Production Workflow.md", "obsidian-product-brain/ACTIVE_CODEX/95_SOURCE_LEDGER/Missing Source Inputs.md"]
code_refs: []
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Content Production Workflow]]", "[[Copy and Tone]]", "[[Missing Source Inputs]]", "[[French Fill]]", "[[05 Open Loops]]"]
supersedes: []
superseded_by: []
tags: [ops, workflow, french, qa, linguistics, proofreading]
---

# French Linguistic QA

<!-- gh-toc -->

## İçindekiler

- [Purpose and Boundary](#purpose-and-boundary)
- [Review Surfaces](#review-surfaces)
- [QA Dimensions](#qa-dimensions)
- [Severity Model](#severity-model)
- [Native-Speaker Review Gate](#native-speaker-review-gate)
- [Linguistic QA Checklist](#linguistic-qa-checklist)
- [Handoff Artifact](#handoff-artifact)
- [Integration with Existing Workflow](#integration-with-existing-workflow)
- [Open Questions](#open-questions)
- [Policy Hardening — Stage-Aware Visibility Gate (2026-07-18)](#policy-hardening-stage-aware-visibility-gate-2026-07-18)
- [Related Notes](#related-notes)

> [!warning] Skeleton Banner
> - Bu bir **QA süreç iskeletidir** — Fransızca stil rehberi değil.
> - **Tam Fransızca stil rehberi YAZILMADI**; hiçbir dil kuralı burada uydurulmadı.
> - **Native-speaker incelemesinin gerçekleştiği İDDİA EDİLMEZ.** Gate **OPEN**.
> - Otoriter kaynak (`L1-L5 Proofreading.md`) **henüz ingest EDİLMEDİ** → [[Missing Source Inputs]].

## Purpose and Boundary

"Öğrenci-yüzü Fransızca dilsel olarak nasıl doğrulanır — kim, hangi standarda göre, boru hattının neresinde?" sorusunun **tek kanonik evi**. Stil kurallarını **tanımlamaz**; QA **sürecini** çerçeveler.

Ayrımı netleştir:

- **Fransızca stil rehberi** (bu notun kapsamı DEĞİL, henüz yok): doğal ifade kuralları, kayıt (register), tercih edilen yapılar. Otoriter kaynağı operator-vault'ta (`L1-L5 Proofreading.md`) — **ingest edilmedi**.
- **Dilsel QA süreci** (bu notun evi, henüz kararsız): inceleme yüzeyleri, boyutlar, şiddet modeli, native-speaker kapısı, checklist, handoff, mevcut akışa entegrasyon.

> [!canon] Kural: **doğal Fransızca, birebir çeviri değil.** Başlangıç çıktısı öğretilmemiş formu zorlamamalı; erken derste bilinmeyen kelime Weave'de İngilizce kalabilir (mevcut içerik kanonu — [[Content Production Workflow]]; burada genişletilmiyor).

## Review Surfaces

Dilsel QA'nın dokunduğu yüzeyler (nerede Fransızca öğrenciye görünür):

- Ders içeriği (`content/lessons/v1/*`) — prompt, hedef cümle, chip'ler.
- Weave prompt'ları ve beklenen iskelet çıktı.
- Natural Reveal açıklamaları ve alternatif ifadeler.
- Say It Your Way situation prompt'ları.
- TTS okunan Fransızca (doğallık; placeholder konuşmamalı).
- Mon Lexique öğe metinleri (kapsam açıldığında).

Yüzey önceliği/eşiği **OPEN**.

## QA Dimensions

Değerlendirme boyutları (yapı; kural seti değil):

- **Doğruluk** — gramer/çekim/anlaşma doğru mu.
- **Doğallık** — bir anadili böyle mi söyler (birebir çeviri değil).
- **Kayıt (register)** — ders bağlamına uygun ton/formalite.
- **Seviye-uygunluğu** — görülmemiş aktif form zorlanmıyor mu (Active/Supported/Recognition-only).
- **Tutarlılık** — terim/çeviri dersler arası tutarlı mı.
- **TTS okunabilirliği** — sesli okunduğunda doğal mı.

## Severity Model

Bulgular tam olarak dört şiddet düzeyinden biriyle etiketlenir:

| Şiddet | Kural |
|---|---|
| **BLOCKER** | Merge/release'i **engeller.** Düzeltilmeden ilerlenmez. |
| **MAJOR** | **Öğrenci teması öncesi** düzeltme gerektirir. |
| **POLISH** | Düzeltilebilir **veya** loglanır (bloke etmez). |
| **PREFERENCE** | Onaylı ürün sesini **sessizce ezemez** — tercih notu olarak kalır, dayatılmaz. |

> [!canon] PREFERENCE ≠ karar: bir inceleyici tercihi, [[Copy and Tone]]'da onaylı ürün sesini geçersiz kılamaz; ancak açık bir karar süreciyle değişebilir.

## Native-Speaker Review Gate

- Öğrenci-yüzü Fransızca'nın anadili incelemesinden geçmesi **hedeflenen kapıdır** — ama **henüz OPEN**.
- Şu an [[Current Priorities]] Five Hottest Open Gates'te **OPEN — founder-reported / provisional** (repo kaynağı kısmî).
- İnceleyici kimliği/tedariki **UNKNOWN**; standart kaynağı `L1-L5 Proofreading.md` ingest edilene dek boşluk.

> [!warning] Bu not, herhangi bir native-speaker incelemesinin **gerçekleştiğini iddia etmez.** Gate açıktır.

## Linguistic QA Checklist

İskelet kontrol listesi (yürütme kapısı OPEN; kalemler süreç, kural değil):

- [ ] Her hedef Fransızca cümle doğru mu (gramer/çekim/anlaşma)?
- [ ] Doğal mı, birebir çeviri değil mi?
- [ ] Görülmemiş aktif form zorlanıyor mu? (varsa Supported/chunk işaretli mi?)
- [ ] Kayıt ders bağlamına uygun mu?
- [ ] TTS sesli okunuşu doğal mı, placeholder konuşmuyor mu?
- [ ] Terim/çeviri dersler arası tutarlı mı?
- [ ] Her bulgu bir şiddetle (BLOCKER/MAJOR/POLISH/PREFERENCE) etiketli mi?

## Handoff Artifact

Bir QA turunun ürettiği **teslim çıktısı** (iskelet — alan sözleşmesi OPEN):

- Kapsanan ders/yüzey kimlikleri.
- Bulgular: konum + mevcut FR metin + önerilen FR + şiddet + gerekçe.
- BLOCKER/MAJOR özeti (merge/exposure kararı için).
- İnceleyici kimliği + tarih (native-speaker gate açıkken **provisional**).
- Karara dönen bulgular ADR/Watchlist'e; ürün sesi çatışmaları [[Copy and Tone]]'a.

## Integration with Existing Workflow

- Bu not içerik üretim akışının **dil-QA kapısıdır** → [[Content Production Workflow]] · [[Validation Gates]].
- Boru hattındaki tam yeri (üretim öncesi mi, `validate:pools` sonrası mı) **OPEN**.
- Otomatik kontroller (placeholder-TTS fail, full-sentence-chip lint) zaten CI'da; bu not **insan/anadili** katmanını ekler, onları değiştirmez.

## Open Questions

> [!open-loop] İçerik ölçeklenmeden önce cevaplanmalı; hiçbiri bu pass'te açılmadı.
> - Native-speaker Fransızca QA'yı kim yürütür? (Gate OPEN — founder-reported.)
> - Standart hangi kaynaktan gelir? (`L1-L5 Proofreading.md` ingest edilene dek boşluk → [[Missing Source Inputs]].)
> - QA boru hattının neresinde oturur? (üretim öncesi / `validate:pools` sonrası)
> - ~~Kabul edilen bölgesel varyant?~~ **KAPANDI (2026-07-18):** default = çağdaş metropolitan Fransızca (aşağıdaki Stage-Aware Visibility Gate).
>
> İzlenen yer: [[05 Open Loops]] · [[Missing Source Inputs]].

## Policy Hardening — Stage-Aware Visibility Gate (2026-07-18)

> [!canon] **PRIMARY POLICY HOME** for the **French QA visibility gate** (stages, verdicts, reviewer record, blocking). Bu, yukarıdaki iskeleti **operasyonel gate**'e derinleştirir. Ledger alanı [[Content Production Workflow]]'da. Sınıf: **[HARD INVARIANT] / [LOCKED DEFAULT]**.

### Dil varyetesi default'u [LOCKED DEFAULT]

- Varsayılan ürün varyetesi: **çağdaş metropolitan Fransızca.** Kasıtlı bölgesel/varyant kullanım **açıkça beyan edilmeli.**
- *(Bu, notun önceki "kabul edilen bölgesel varyant?" açık sorusunu kapatır. Çelişen bir kaynak bulunmadı; bulunursa çelişki rapor edilir, sessizce kanonlaşmaz.)*

### Visibility stages [LOCKED DEFAULT]

| Stage | Kapsam | QA gereksinimi |
|---|---|---|
| **A — Authoring draft** | yazım taslağı | otomatik kontroller + yazar self-review zorunlu; `FrenchQAStatus: PENDING` olabilir; **learner-görünür değil** |
| **B — Founder/operator device smoke** | yalnız founder/operator testi | PENDING **yalnız** founder/operator-only test için; build/session açıkça **non-release / QA-pending** işaretli; **davetli öğrenci teması yok** |
| **C — Invited human learner test** | davetli öğrenci | **nitelikli Fransızca dil incelemesi zorunlu**; **0 unresolved BLOCKER**; **0 unresolved MAJOR**; MINOR/POLISH yalnız kayıtlı + kabul edilmişse kalır |
| **D — Public/release** | herkese açık | **final French QA verdict zorunlu**; **0 unresolved BLOCKER/MAJOR**; ertelenen MINOR/POLISH **izlenebilir** olmalı |

### Verdict vocabulary (mevcut Severity Model ile uzlaşık)

Yukarıdaki "Severity Model" bölümünün dört şiddeti (BLOCKER/MAJOR/POLISH/PREFERENCE) korunur; gate için **MINOR** ve **PASS** eklenir:

- **BLOCKER** — yanlış/yanıltıcı, öğrenmeyi bozacak kadar doğal-olmayan, veya güvensiz hedef/model cevap.
- **MAJOR** — öğrenci testinden önce düzeltme gerektiren anlamlı gramer/kullanım/register sorunu.
- **MINOR** — öğrenme hedefini **bozmayan** yerel doğallık/tutarlılık sorunu.
- **PREFERENCE / POLISH** — birden fazla kabul edilebilir çözümü olan stilistik tercih.
- **PASS** — sorun yok.

### HARD INVARIANTS

- **Otomatik validasyon, nitelikli insan Fransızca QA'sının yerine geçmez.**
- **AI çıktısı dilsel doğruluğu self-certify EDEMEZ.**
- **Unresolved BLOCKER veya MAJOR**, davetli-öğrenci/public görünürlüğü **engeller.**
- QA **hedef cümleleri, model cevapları, distraktörleri, hint'leri, TTS metnini, çevirileri, register'ı ve chip segmentasyonunu** inceler — yalnız başlık içeriğini değil.
- **Bir dilsel sorun, öğrenci weakness/error kanıtına dönüştürülemez** ([[Error Tracking System]]).

### Reviewer requirement [LOCKED DEFAULT]

En azından **adlandırılmış nitelikli bir Fransızca inceleyici** ve **kayıtlı bir verdict** gerekir. Kalıcı bir kadro/staffing modeli **uydurulmaz** (staffing **OPEN** → [[05 Open Loops]]).

### Required lesson/batch QA record

reviewer · review date · French variety/register · reviewed files/lessons · BLOCKER count · MAJOR count · MINOR count · deferred POLISH count · final verdict · unresolved issues · **authorized visibility stage**.

### Non-claims

- **Hiçbir native French QA'nın gerçekleştiği iddia edilmez**; gate execution **OPEN**. `FrenchQAStatus: PASS` **kayıtlı nitelikli inceleme olmadan** (özellikle bir AI agent tarafından) **atanamaz** (anti-gaming, [[Content Production Workflow]]).

## Related Notes

[[Content Production Workflow]] · [[Copy and Tone]] · [[French Fill]] · [[Missing Source Inputs]] · [[Validation Gates]] · [[Error Tracking System]] · [[05 Open Loops]] · [[Current Priorities]] · [[00 Le Mot Holy Codex]]
