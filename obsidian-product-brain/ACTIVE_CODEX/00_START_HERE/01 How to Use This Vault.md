---
title: How to Use This Vault
aliases: [How to Use, Nasıl Kullanılır, Vault Kılavuzu]
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
related: ["[[00 Le Mot Holy Codex]]", "[[06 Canon and Status Legend]]", "[[08 Source of Truth Map]]", "[[Obsidian to Git Promotion Rules]]"]
tags: [onboarding, meta]
---

# How to Use This Vault

> Bu vault Le Mot/Cairn'in **kalıcı özel hafızasıdır** — repoya commit edilmez.
> Kurulum: kökteki `README_INSTALL.md`.

## Üç kural (tekrar)
1. **Önce statüye bak.** Her not `canon_status` / `implementation_status` /
   `verification_status` taşır → [[06 Canon and Status Legend]].
2. **Tek ana ev.** Her sistemin bir canonical açıklaması var; diğerleri özet + link.
3. **Tarihi ezme.** Karar değişince eskisini `superseded` işaretle, silme → [[90 History Index]].

## Bir soruyu nasıl cevaplarım?

```mermaid
flowchart TD
  Q["Bir sorum var"] --> HC[00 Holy Codex'te konuyu bul]
  HC --> HOME[Konunun tek ana notuna git]
  HOME --> ST{Statü ne?}
  ST -->|canonical + implemented + verified| USE[Güven ve kullan]
  ST -->|proposed / spec-only / unknown| OL[05 Open Loops / 98 Gaps'e bak]
  HOME --> SRC[source_of_truth alanından repoyu doğrula]
```

## Not tipleri ve şablonlar
Yeni bir sistem/ders/egzersiz/karar için `99_TEMPLATES/` altındaki uygun şablonu
kopyala: [[System Spec Template]], [[Lesson Template]], [[Exercise Template]],
[[Decision Record Template]], [[Implementation Ledger Template]], [[Source Record Template]],
[[Open Loop Template]], [[Research Note Template]], [[Handoff Template]].

## Callout'lar
`[!canon]` `[!implemented]` `[!warning]` `[!historical]` `[!decision]` `[!open-loop]` `[!example]`
— anlamları [[06 Canon and Status Legend]]'da.

## Güncelleme disiplini
- Bir notu değiştirdin → `last_updated` güncelle; gözden geçirdin → `last_reviewed`.
- Her önemli iddiaya kaynak (dosya:satır / PR#) bağla; bilinmiyorsa UNKNOWN + [[Needs Verification]].
- Bir karar Obsidian'da kilitlendi → [[Obsidian to Git Promotion Rules]] akışıyla repoya taşı.

## Arama ipuçları (Obsidian)
- Graph view ile bir sistemin komşularını gör.
- Backlink paneli "bu nereye bağlı?" sorusunu cevaplar.
- Tag pane: `#matrix`, `#decision`, `#open-loop`, `#historical`.
- `08 Source of Truth Map` her zaman "hangi kaynak kazanır" sorusunun cevabı.
