---
title: Naming and Brand Registry
aliases: [Naming Registry, Brand Registry, İsim ve Marka Kaydı, Candidate Graveyard]
type: decision
domain: design
status: active
canon_status: canonical
implementation_status: partial
verification_status: reported-only
owner: cairn-product-brain
created: 2026-07-16
last_updated: 2026-07-16
last_reviewed: 2026-07-16
source_of_truth: ["CLAUDE.md", "docs/ROADMAP.md", "founder-reported (2026-07-15)"]
related: ["[[Cairn Brand Direction]]", "[[Product Vision]]", "[[Historical Designs]]", "[[Decision Index]]"]
tags: [design, naming, brand, decision]
---

# Naming and Brand Registry

> [!canon] Amaç: **Cairn** isim kararının **kanıt zincirini** korumak — görsel/metaforik
> içeriği tekrarlamadan (o [[Cairn Brand Direction]]'ın malı). Bu not "neden bu isim,
> hangi adaylar neden elendi, gelecekte nasıl isim seçilir" sorularının tek evi.

> [!warning] **Kanıt statüsü ayrımı (önce bunu oku).** Aşağıdaki isim/rakip/hukuk
> gözlemleri büyük ölçüde **founder-reported** (kurucu hatırlatması, 2026-07-15).
> **Güncel yasal/trademark clearance YAPILMADI.** Repo-backed olanlar ayrıca işaretli.

## Decision Summary

- **Cairn = seçilen ürün adı.** [canon_status: canonical]
- **Le Mot = legacy** (eski proje/repo adı; kod klasörleri hâlâ `lemot` içerebilir). [repo-backed: `lemot-app`, CLAUDE.md]
- **Le Lexique = en güçlü runner-up ("gümüş madalya").** [founder-reported]

## Naming Criteria (kurucunun üç işletim disiplini)

1. **Owned namespace / bundle identifier kullan** — çıplak kelimeye değil, sahip olunan bir ad alanına/paket kimliğine dayan (ör. store bundle id).
2. **Çıplak "Cairn" kelimesine bağımlı olma** — marka, tek kelimenin küresel tekelini varsaymaz.
3. **Gerektiğinde tanımlayıcı store/display formu kullan** — mağaza/görünen adda ayırt edici, tanımlayıcı bir ek kullanılabilir.

## Known Adjacent Names

> [!warning] **Founder-reported research — legal clearance DEĞİL.** Aşağıdakiler
> kurucunun hatırladığı komşu isimlerdir; **güncel yasal uygunluk görüşü değildir**
> ve **public launch öncesi yeniden kontrol edilmelidir.**

- Hiking ile ilgili bir **Cairn** app/ürünü.
- **cairn.info** (domain/yayın).
- **Cairn University**.

Açıkça: (1) bu bir trademark clearance **değildir**; (2) güncel yasal uygunluk görüşü
**değildir**; (3) bulgular **public launch öncesi** yeniden denetlenmelidir (ROADMAP
Taş 4 PR 24: "Cairn için App Store/EUIPO/domain kontrolü — Le Mot dersi!").

## Candidate Graveyard

> [!warning] Reddedilme gerekçeleri **uydurulmadı.** Kesin tarihsel gerekçe yoksa:
> **UNKNOWN — founder recollection/source required.** Strengths/weaknesses satırları
> genel adlandırma gözlemidir (tarihsel gerekçe değil).

| Aday | Reddedilme gerekçesi | Güçlü yanları (genel gözlem) | Zayıf yanları (genel gözlem) | Yeniden kullanım? |
|---|---|---|---|---|
| **Encore** | UNKNOWN — founder recollection/source required | Fransızca çağrışım, "tekrar/bir daha" (SRS ile örtüşür) | Yaygın kullanım; müzik/uygulama adlarında kalabalık olabilir | Olası feature/content-series adı (ör. review/comeback modu) — founder onayı |
| **Voilà** | UNKNOWN — founder recollection/source required | Güçlü Fransızca kimlik, "işte oldu" reveal anıyla örtüşür | Aksan/diakritik store-form zorluğu; yaygın | Olası reveal/completion mikro-copy veya feature adı |
| **Lexis** | UNKNOWN — founder recollection/source required | "Kelime/sözlük" kökü, kısa | Jenerik; birçok dil/edtech üründe var | Olası içerik serisi / sözlük özelliği adı |
| **Echo** | UNKNOWN — founder recollection/source required | Kısa, akılda kalıcı, "geri dönen ses" (recall) çağrışımı | Çok yaygın (donanım/asistan markaları); ayırt edicilik düşük | Olası feature adı (recall/review), ürün adı olarak zayıf |
| **Le Lexique** | UNKNOWN — founder recollection/source required (silver medal olarak anıldı) | Fransızca, "sözlük/kelime dağarcığı", Mon Lexique ile doğal bağ | "Le Mot"a çok yakın (legacy ile karışma); metafor genişlemesi dar | **Mon Lexique** özelliği zaten bu kökü taşıyor; ürün-adı olarak park |

## Why Cairn Won

Yalnız mevcut notlar / founder bağlamıyla desteklenen kanıt:

- **Trail-marker anlamı** — patika taş yığını; "yolu işaretleyen taş". [repo-backed: CLAUDE.md "patika taş yığını"]
- **Dağ/yolculuk görsel sistemiyle hizalı** — uzak dağ + yakın cairn. [[Cairn Brand Direction]] · [[Visual Language]]
- **Pedagojik uyum** — öğrenilen parçalar yolu işaretleyen **taşlara** dönüşür (whole-first → biriken taşlar).
- **Premium / sakin karakter** — gösterişsiz, güven veren.
- **Metafor genişletir** — Campfire · Summit · Trail · Stone · Fog · River kelime ailesini destekler. [[Cairn Brand Direction]]

## Future Naming Reuse (tekrarlanabilir yöntem)

Gelecekteki dil ürünleri için (ör. olası bir **İspanyolca kardeş**) tekrar kullanılabilir yöntem:

1. **Category scan** — edtech/dil kategorisinde doygunluk taraması.
2. **Neighboring-name scan** — komşu/benzer isimler (app store + domain + üniversite/yayın).
3. **Namespace strategy** — sahip olunan bundle id / display-form disiplini (yukarıdaki 3 kriter).
4. **Pronunciation & international comprehension** — telaffuz kolaylığı + uluslararası anlaşılırlık.
5. **Metaphor extensibility** — isim, bir kelime ailesini (mekân/yolculuk) besleyebiliyor mu?
6. **Candidate graveyard reuse** — elenen adayları feature/içerik-serisi/gelecek-ürün için geri dönüştür.
7. **Legal/store verification gate** — App Store / EUIPO / domain kontrolü **launch öncesi zorunlu kapı**.

## Evidence Status

| Katman | Durum |
|---|---|
| Founder-reported historical | Adjacent names, candidate graveyard gerekçeleri (çoğu UNKNOWN), Le Lexique = silver medal |
| Repo-backed | `Le Mot → Cairn` reframe (CLAUDE.md), `lemot-app` kod adı, ROADMAP Taş 4 "Cairn marka taraması" |
| **Current legal verification** | **NOT DONE** — trademark/store/domain clearance yapılmadı; launch öncesi zorunlu |

## İlgili Notlar
- Görsel/metafor: [[Cairn Brand Direction]] (bu not onu tekrarlamaz)
- Ürün kimliği: [[Product Vision]]
- Tarihsel görsel/isim: [[Historical Designs]]
- Karar hafızası: [[Decision Index]]
