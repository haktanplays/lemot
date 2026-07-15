---
title: New Contributor First Day
aliases: [First Day, İlk Gün, Onboarding Day 1]
type: onboarding
domain: meta
status: canonical
canon_status: canonical
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
related: ["[[00 Le Mot Holy Codex]]", "[[09 Role-Based Onboarding Paths]]", "[[03 Current State]]", "[[Agent Do Not Assume List]]"]
tags: [onboarding]
---

# New Contributor First Day

> "Önce bunu oku." Yeni katılan biri (insan veya ajan) için ilk 60 dakika.

## İlk 20 dakika — büyük resim
1. [[00 Le Mot Holy Codex]] — ne inşa ediyoruz, isim (Le Mot → Cairn), söz.
2. [[03 Current State]] — bugün gerçekte ne çalışıyor (L0–L6 dev-apk, frozen).
3. [[06 Canon and Status Legend]] — statü modeli (canon/impl/verify ayrı).

## Sonraki 20 dakika — zihinsel model
4. [[Learning System Overview]] + [[Weave System]] — killer mekanik.
5. [[Chip Taxonomy]] — "chip nedir, cümle neden chip değildir".
6. [[Runtime Content Architecture]] — **üç paralel runtime** (A gizli / B sevkedilen / C sandbox). Bu en sık karıştırılan şey.

## Son 20 dakika — nasıl çalışıyoruz
7. [[09 Role-Based Onboarding Paths]] — rolüne özel derin okuma.
8. [[05 Open Loops]] — neyin açık olduğu (özellikle L1 chip listesi ve operator blocker'ları).
9. [[Agent Do Not Assume List]] — bilinen stale tuzaklar.

## 5 zihinsel model (bunları bugün içselleştir)

> [!canon]
> 1. **"Kabul edildi" ≠ "kodlandı" ≠ "cihazda doğrulandı".** Üç ayrı statü.
> 2. **Üç runtime var.** Bir iddianın hangi runtime hakkında olduğunu her zaman sor.
> 3. **v1 geçici bir smoke skini; learning-engine uzun vadeli temel.** v1'i genişletme.
> 4. **Yasak dil:** XP, streak, level up, "amazing", come-back-tomorrow baskısı. Sakin passive-mirror mentor tonu.
> 5. **Kanon önce, kod sonra.** Aktif kanon her zaman legacy'yi yener; tarihi ezme.

## İlk katkı kuralları
- Kod okumadan önce ürünü anla; sonra **tam olarak hangi kodu** okuyacağını bil ([[Code Source Index]]).
- Küçük PR = tek ürün niyeti ([[PR Discipline]]).
- Review-then-commit: onay almadan commit yok ([[Development Workflow]]).
- Bir karar verildiğinde: ilgili ana nota yaz → kabul edilince repo'ya promote → implementation olunca ledger'a bağla → doğrulanınca verify statüsünü yükselt ([[Obsidian to Git Promotion Rules]]).
