---
title: French Linguistic QA
aliases: [French QA, Linguistic QA, Native-Speaker QA, Fransızca QA, Dil Kalite Kontrolü, French Proofreading]
type: workflow
domain: ops
status: skeleton
canon_status: provisional
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-17
last_updated: 2026-07-17
last_reviewed: 2026-07-17
source_of_truth: ["obsidian-product-brain/ACTIVE_CODEX/10_OPERATIONS/Content Production Workflow.md", "obsidian-product-brain/ACTIVE_CODEX/95_SOURCE_LEDGER/Missing Source Inputs.md"]
code_refs: []
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Content Production Workflow]]", "[[Copy and Tone]]", "[[Missing Source Inputs]]", "[[French Fill]]", "[[05 Open Loops]]"]
supersedes: []
superseded_by: []
tags: [ops, workflow, french, qa, linguistics, proofreading, skeleton]
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
> - Kabul edilen bölgesel varyant (ör. metropolitan French)?
>
> İzlenen yer: [[05 Open Loops]] · [[Missing Source Inputs]].

## Related Notes

[[Content Production Workflow]] · [[Copy and Tone]] · [[French Fill]] · [[Missing Source Inputs]] · [[Validation Gates]] · [[05 Open Loops]] · [[Current Priorities]] · [[00 Le Mot Holy Codex]]
