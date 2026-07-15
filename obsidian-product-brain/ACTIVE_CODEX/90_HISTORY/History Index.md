---
title: History Index
aliases: [90 History Index, History MOC, Tarih Dizini]
type: index
domain: history
status: active
canon_status: canonical
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/STATUS.md", "CLAUDE.md", "docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md"]
related: ["[[00 Le Mot Holy Codex]]", "[[Product Timeline]]", "[[Sprint Timeline]]", "[[Superseded Specs]]", "[[Superseded Decisions]]"]
tags: [index, history, moc]
---

# History Index

> [!canon] Bu not `90_HISTORY/` klasörünün **MOC'udur** (harita/giriş kapısı).
> Buradaki notların çoğu **tarihsel/superseded** içerik taşır. Index'in kendisi
> güncel bir kılavuzdur; içindeki her tarihsel madde `[!historical]` veya
> `superseded_by` ile işaretlidir. **Buradaki hiçbir şeyi güncel kanon sanma.**

## Bu klasör neyi korur?

Le Mot / Cairn'in kurumsal hafızasında en pahalı hata, "bir zamanlar doğruydu"yu
"şu an doğru" ile karıştırmaktı. Bu klasör tam olarak bu ayrımı korur: eski
kararları **silmek yerine** `superseded` işaretleyip yeni kararın nereye
taşındığını (`superseded_by`) gösterir. Böylece bir ajan ya da yeni ekip üyesi
eski bir dokümana rastladığında onu diriltmez.

> [!warning] Altın kural: bu klasördeki bir madde ne kadar ayrıntılı olursa olsun,
> **aktif yön değildir**. Güncel durum için [[03 Current State]] ve
> [[00 Le Mot Holy Codex]]'e git. Statü modeli: [[06 Canon and Status Legend]].

## Klasör haritası

| Not | Ne için | Baskın statü |
|---|---|---|
| [[Product Timeline]] | Ürünün büyük dönüm noktaları: v7 → learning-engine → Founder Self-Learning → Round 1 → Cairn reframe → YASA/privacy | historical + current karışık |
| [[Sprint Timeline]] | PR/sprint bloklarının kronolojisi (#100–#196), shallow-clone uyarısı | historical |
| [[Historical Canon Map]] | Hangi kanon dokümanı hangisini gömdü; supersession zinciri | historical |
| [[Historical User Journeys]] | Eski kullanıcı yolculuğu / lesson-flow çerçeveleri | historical |
| [[Historical Syllabus]] | 24-ders M1–M4 milestone yapısı, L14 paywall | **superseded** |
| [[Historical Designs]] | Eski görsel dil, V4/V7 çalışmaları, "Franglais" markası | historical |
| [[Historical Architecture]] | Eski runtime (legacy 24-lesson), model-routing tablosu | historical |
| [[Historical Prompt Logs]] | Ham prompt/tartışma loglarının çoğu **operator vault'ta** (repoda değil) | source-record |
| [[Superseded Specs]] | Cairn v0.1 dokümanları, Merged Canon 2026-05-11, iki loop audit | **superseded** |

## En sık aranan "eski karar → yeni ev" eşlemeleri

> [!historical] Aşağıdakiler tarihsel kayıttır; her biri güncel bir nota taşındı.

- 24-ders / 11-section / L14 paywall / XP-streak dili → SUPERSEDED. Güncel:
  [[Syllabus Overview]], [[Lesson Flow]], [[Monetization and Scope Boundaries]],
  [[Copy and Tone]].
- "Le Mot" ismi → "Cairn" reframe (2026-07-02). Bkz. [[Product Vision]],
  [[Historical Canon Map]].
- Cairn v0.1 dokümanları → Cairn v1.0 spec. Bkz. [[Superseded Specs]].
- "Franglais" → "Weave". Bkz. [[Weave System]], [[Historical Designs]].
- İki loop audit (2026-07-08, 07-09) → bulgular [[Known Gaps]] ve
  [[Technical Debt]]'e reconcile edildi. Bkz. [[Superseded Specs]].

## Nasıl okunmalı?

1. Bir tarihsel dokümana rastladın → önce `superseded_by` alanına bak, güncel eve git.
2. "Bunu neden bıraktık?" sorusu → [[Superseded Decisions]] + [[Rejected Decisions]].
3. Ham konuşma/prompt arıyorsun → çoğu repoda yok: [[Missing Source Inputs]].

## Related Notes
- Yukarı: [[00 Le Mot Holy Codex]]
- Güncel karşılıklar: [[03 Current State]] · [[Decision Index]] · [[Superseded Decisions]]
- Kaynak zinciri: [[08 Source of Truth Map]] · [[Source Ledger]]

<!-- gh-nav -->

## 🧭 GitHub Navigation

[⬆ README](../../README.md) · [🪨 Holy Codex](../00_START_HERE/00%20Le%20Mot%20Holy%20Codex.md) · [Current State](../00_START_HERE/03%20Current%20State.md) · [Open Loops](../00_START_HERE/05%20Open%20Loops.md)

**Bu klasördeki notlar (90_HISTORY):**

- [Historical Architecture](./Historical%20Architecture.md)
- [Historical Canon Map](./Historical%20Canon%20Map.md)
- [Historical Designs](./Historical%20Designs.md)
- [Historical Prompt Logs](./Historical%20Prompt%20Logs.md)
- [Historical Syllabus](./Historical%20Syllabus.md)
- [Historical User Journeys](./Historical%20User%20Journeys.md)
- [History Index](./History%20Index.md) ⟵ *bu not*
- [Product Timeline](./Product%20Timeline.md)
- [Sprint Timeline](./Sprint%20Timeline.md)
- [Superseded Specs](./Superseded%20Specs.md)
