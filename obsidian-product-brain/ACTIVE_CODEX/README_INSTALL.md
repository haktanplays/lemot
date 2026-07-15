# CAIRN — Obsidian Product Brain v0.1 · Kurulum ve Kullanım

<!-- gh-toc -->

## İçindekiler

- [1. Nasıl açılır (extract)](#1-nasıl-açılır-extract)
- [2. Obsidian olarak açma](#2-obsidian-olarak-açma)
- [3. İlk okunacak not](#3-ilk-okunacak-not)
- [4. Statü alanları nasıl okunur](#4-statü-alanları-nasıl-okunur)
- [5. Not güncelleme](#5-not-güncelleme)
- [6. Özel hafızayı repo kanonuna "promote" etme](#6-özel-hafızayı-repo-kanonuna-promote-etme)
- [7. Ajanlar bu vault'u nasıl kullanmalı](#7-ajanlar-bu-vaultu-nasıl-kullanmalı)
- [8. Tarihsel bilgiyi ASLA ezme](#8-tarihsel-bilgiyi-asla-ezme)

Bu ZIP, **Le Mot / Cairn** French-learning app'inin özel kurumsal hafızasıdır:
onboarding elkitabı + ürün ansiklopedisi + sistem referansı + karar hafızası +
implementation defteri + tarihsel arşiv + ajan bağlam kaynağı. Bu bir
**Obsidian vault**'tur.

> [!UYARI] Bu vault **repoya commit edilmez.** Özel hafıza Obsidian'da yaşar;
> yalnızca "promote" edilen kararlar repoya taşınır (bkz.
> `10_OPERATIONS/Obsidian to Git Promotion Rules.md`).

## 1. Nasıl açılır (extract)

```bash
unzip CAIRN_OBSIDIAN_PRODUCT_BRAIN_v0.1.zip -d ~/CairnBrain
```

## 2. Obsidian olarak açma

1. [Obsidian](https://obsidian.md) indir (ücretsiz).
2. **Open folder as vault** → çıkarttığın `CAIRN_OBSIDIAN_PRODUCT_BRAIN_v0.1` klasörünü seç.
3. Hiçbir community/paid plugin gerekmez — sadece core plugin'ler (graph, backlink, search, templates) kullanılır.
4. Mermaid diyagramları ve callout'lar Obsidian'da yerel çalışır.

## 3. İlk okunacak not

`00_START_HERE/00 Le Mot Holy Codex.md` — her şeyin giriş kapısı.
Yeni katılan biri için: `00_START_HERE/10 New Contributor First Day.md` ve
`00_START_HERE/09 Role-Based Onboarding Paths.md`.

## 4. Statü alanları nasıl okunur

Her önemli not, üç bağımsız statü taşır:

- `canon_status` — karar/spec katmanı (canonical / proposed / superseded …)
- `implementation_status` — kod katmanı (implemented / partial / spec-only / fixture-only …)
- `verification_status` — kanıt katmanı (device-verified / tests-only / source-inspected …)

Tam sözlük: `00_START_HERE/06 Canon and Status Legend.md`.
**"Kabul edildi", "kodlandı" ve "cihazda doğrulandı" üç ayrı şeydir** — asla tek statüye indirgeme.

## 5. Not güncelleme

- Bir notu güncellerken `last_updated` (ve gözden geçirdiysen `last_reviewed`) alanını değiştir.
- Yeni sistem/ders/egzersiz/karar için `99_TEMPLATES/` altındaki şablonu kopyala.
- Her önemli iddiaya kaynak (dosya:satır / PR#) bağla.

## 6. Özel hafızayı repo kanonuna "promote" etme

Bir karar Obsidian'da kilitlendiğinde repoya taşımak için:
`10_OPERATIONS/Obsidian to Git Promotion Rules.md` akışını izle. Kısaca:
karar → ilgili ana nota yaz → kabul edilince → repo docs'a promote → implementation olunca ledger'a bağla → doğrulanınca `verification_status` yükselt.

## 7. Ajanlar bu vault'u nasıl kullanmalı

Bkz. `11_AGENT_CONTEXT/Agent Start Here.md`. Kısaca: **önce Holy Codex + Current State + Open Loops oku → sonra karar üret**. Ajanların asla varsaymaması gereken şeyler: `11_AGENT_CONTEXT/Agent Do Not Assume List.md`.

## 8. Tarihsel bilgiyi ASLA ezme

`90_HISTORY/` ve superseded notlar **silinmez**. Bir karar değişirse eskisini `superseded` işaretle ve `superseded_by` ile yeni karara bağla — üstüne yazma. Ham konuşma arşivi ile canonical bilgi bu vault'ta ayrı tutulur.

---

Build raporları: `00_START_HERE/_BUILD_REPORTS/`. Değişiklik günlüğü: `CHANGELOG.md`. Manifest: `BUILD_MANIFEST.md`.
