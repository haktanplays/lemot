---
title: Idea Inbox
aliases: [Fikir Kutusu, Inbox, Idea Intake]
type: research
domain: meta
status: idea
canon_status: proposed
implementation_status: not-started
verification_status: unverified
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: []
related: ["[[Idea Index]]", "[[Research Note Template]]", "[[05 Open Loops]]", "[[Unmapped Ideas]]"]
tags: [idea, inbox, research]
---

# Idea Inbox

> [!warning] Bu klasördeki **her şey FİKİRDİR — kanon değil.** Bir fikir, açıkça kabul edilip bir ADR'ye
> (`09_DECISIONS`) taşınana kadar `proposed`/`idea` kalır. Buradan hiçbir agent doğrudan implementation
> yetkisi çıkaramaz.

## Bir fikir buraya nasıl girer?

1. **Yakala.** Ham fikri kaybetmeden not al — mükemmel olması gerekmez.
2. **Şablonu kullan.** [[Research Note Template]] (kopyala): The Idea / Where It Would Live / Why It Might Matter / Open Questions / Decision Needed From / Related.
3. **Ev sor (Rule 5).** Her fikrin bir evi olmalı: **Lesson? Daily Review? Practice Pool? Mon Lexique? Post-beta? Archive?** Evsiz fikir olgunlaşmamıştır.
4. **Doğru nota koy:**
   - Ders mekaniği fikri → [[Lesson Mechanics Ideas]].
   - Planlanmış/ertelenmiş büyük özellik → [[Future Features]].
   - Açık pedagoji/mimari sorusu → [[Research Questions]].
   - Test edilecek hipotez → [[Experiments]].
   - Audit'ten çıkan izlenecek risk → [[Watchlist]].
5. **İndexle.** [[Idea Index]] tablosuna bir satır ekle (statüsüyle).

## Statü yaşam döngüsü

```mermaid
flowchart LR
  A[idea / proposed] --> B{Operator kararı}
  B -->|kabul| C[ADR'ye taşı — 09_DECISIONS]
  B -->|ertele| D[Future Features / Deferred Decisions]
  B -->|red| E[Rejected Decisions]
  B -->|izle| F[Watchlist]
```

## Sınırlar
- Fikir ≠ karar ≠ implementation. Üçünü ayrı tut ([[06 Canon and Status Legend]]).
- Bir fikri "kabul" yalnızca **Operator** yapar (`devam` / `onaylandı`).
- Bu vault operator-only yazılır; bulut ajanı fikri buraya değil, `docs/CLOUD_SYNC_QUEUE.md`'ye kuyruklar.
- Yasaklı dil fikirleri (XP/streak/reward) baştan **red** — tartışmaya girmeden [[Non-Goals]].

## İlgili Notlar
- [[Idea Index]] · [[Lesson Mechanics Ideas]] · [[Future Features]] · [[Research Questions]] · [[Experiments]] · [[Watchlist]]
- [[Unmapped Ideas]] · [[05 Open Loops]]
