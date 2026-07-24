---
title: Historical User Journeys
aliases: [Eski Kullanıcı Yolculukları, Historical Lesson Flow]
type: historical
domain: history
status: active
canon_status: historical
implementation_status: legacy-unreachable
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["CLAUDE.md", "docs/canon/LESSON_FLOW_CANON_v1.md"]
related: ["[[00 Le Mot Holy Codex]]", "[[History Index]]", "[[User Journey]]", "[[Lesson Flow]]", "[[Historical Syllabus]]"]
supersedes: []
superseded_by: ["[[User Journey]]", "[[Lesson Flow]]"]
tags: [history, user-journey, lesson-flow]
---

# Historical User Journeys

> [!historical] Bu not, ürünün **eski kullanıcı yolculuğu ve lesson-flow
> çerçevelerini** kaydeder. Hepsi SUPERSEDED. Güncel akış için [[Lesson Flow]] ve
> [[User Journey]]'e git; buradaki hiçbir yapı aktif değildir.

## 1. v7 11-section lesson flow — SUPERSEDED

> [!warning] superseded_by: [[Lesson Flow]], [[Lesson Anatomy]].

v7'de her ders **11 bölümden** oluşuyordu (input-first, reordered). Section
key'leri (SECS array) — kod kimlikleri olarak **aynen korunmuştur**:

```
read_listen → patterns → fill_fg → fill_fr → build → fill_write →
quiz → combine_fg → say_it → mini_conv → review
```

Okunur haliyle: Read & Listen → Patterns → Weave Fill → French Fill → Build →
Write → Quiz → Combine+Weave → Say It Your Way → Mini Conversation → Review.

- **Sprint 8B reorder:** "Build before Write" (kolay görev — tile dizme — önce,
  zor görev — hafızadan yazma — sonra; progressive difficulty).
- **Say It Your Way** (sec 8): free-write, AI eval, target word tracking.
- **Mini Conversation** (sec 9): 3–4 turn AI chat, konuya kilitli.
- **Sprint 11 reframe (pending, hiç uygulanmadı):** 11 section → 9 (Meet It /
  Notice the Pieces / Why This Works / Try It / Weave It / Shape It / Use It /
  Stay with It / Lesson End). Combine → Shape It'e; Say It + Mini Conversation →
  Mini Mission (Use It)'e; Review → Stay with It'e. **Bu reframe uygulanmadan
  ürün Cairn'e geçti.**

## 2. Lesson chunking (Sprint 8C) — SUPERSEDED

11 section, 3 parçaya bölünmüştü (Learn / Practice / Produce, ~7–8 dk her biri;
`CHUNKS` array). Parçalar arası "Take a Break". → superseded_by [[Lesson Flow]].

## 3. Home / Daily Review / Progress ritüeli — legacy

- **Daily Review:** Home kartı, 5-kelimelik günlük hedef, weak-spot önceliği,
  modal quiz overlay. (Streak tracking **kaldırıldı**, locked decision 2026-04-23;
  "streak" → "days on the path".)
- **Can-Do Milestones:** 4 milestone tier (Basic Communicator / Independent
  Speaker / Confident Conversationalist / Natural Expression).
- **Enhanced Progress Tab:** Mastered / Learning / Weak kelime kategorileri,
  milestone badge'leri.
- Bugün bu yüzeyler dev-apk'te **gizli** (scope control; legacy 24-lesson /
  flashcard materyali gösterdikleri için). Güncel: [[Product Stages and Feature Flags]],
  [[Home and Journey]], [[Daily Review UI]].

## 4. Güncel yolculuğa köprü

> [!canon] Güncel Cairn lesson-flow'u **Lesson Flow Canon v1.0** (`d16aa05`/#176)
> tarafından tanımlanır: whole-first meet-card, ~11–14 ekran bütçesi, 1–4 yeni
> aktif chip, insight kartları anlamla yerleştirilir. Runtime'da 7 donmuş v1 ekran
> tipi (MeetCard, InsightCard, FillWithTraps, Weave, SayItYourWay, NaturalReveal,
> Recap). Detay: [[Lesson Flow]], [[Lesson Anatomy]], [[Exercise System Overview]].

Karşılaştırma:

| Boyut | v7 (HISTORICAL) | Cairn v1 (CURRENT) |
|---|---|---|
| Section sayısı | 11 (→ 9 planlandı, uygulanmadı) | ekran-tipi seti ~10, 7 donmuş v1 tipi |
| Ekran bütçesi | tanımsız | 11–14 (her ekran sayılır) |
| Grading felsefesi | quiz + AI eval | passive mirror, open Weave gradelenmez |
| Gamification | milestone (XP/streak kaldırılmış) | milestone-only, XP/streak yasak |

## Related Notes
- Yukarı: [[00 Le Mot Holy Codex]] · [[History Index]]
- Güncel karşılıklar: [[User Journey]] · [[Lesson Flow]] · [[Lesson Anatomy]]
- Kardeş: [[Historical Syllabus]] · [[Historical Designs]]
