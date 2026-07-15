---
title: Difficulty and Cognitive Load
aliases: [Cognitive Load, Difficulty, Screen Budget, Load Protection, Prompt Fade]
type: system-spec
domain: learning
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/canon/LESSON_FLOW_CANON_v1.md", "docs/syllabus/chip-taxonomy-and-lexique-lifecycle-v0.3.md", "docs/learning-engine-v1.md"]
code_refs: ["lemot-app/components/lesson-v1/screens/Weave.tsx", "lemot-app/content/learning-engine/mastery.ts:35-36", "lemot-app/scripts/canonRules.ts:158-165"]
test_refs: ["lemot-app/**/canonRules.test.ts"]
related: ["[[00 Le Mot Holy Codex]]", "[[Lesson Anatomy]]", "[[Chip Lifecycle]]", "[[Weave System]]", "[[Mastery Model]]", "[[Content Selection]]"]
supersedes: []
superseded_by: []
tags: [learning, difficulty, cognitive-load]
---

# Difficulty and Cognitive Load

<!-- gh-toc -->

## İçindekiler

- [Executive Summary](#executive-summary)
- [Why It Exists](#why-it-exists)
- [Current Canon](#current-canon)
- [How It Works](#how-it-works)
- [Failure Modes](#failure-modes)
- [Diagrams](#diagrams)
- [Runtime Implementation](#runtime-implementation)
- [Known Gaps](#known-gaps)
- [Open Questions](#open-questions)
- [Related Notes](#related-notes)

> [!canon] Purpose — Cairn zorluğu ve bilişsel yükü nasıl sınırlar? Ekran/chip bütçesi (invariant), recycle load protection, prompt-fade ve hint merdiveni — hepsi "yükü taşınabilir tut" ilkesinin araçları.

## Executive Summary

Cairn dersleri bilinçli olarak **küçüktür**. Bir invariant bütçe uygulanır: **11–14 ekran, 7–10 dakika, 1–4 yeni active chip, 3–5 üretim aksiyonu, ekran başına 1–3 micro-action (cap 4)** (`LESSON_FLOW_CANON_v1.md:36-44`). Yük üç mekanizmayla yönetilir: (1) **Recycle Load Protection** — "Recycle cannot steal the lesson"; her cümlenin bir yük bütçesi var (target baskın, recycle destek, exposure capped). (2) **Prompt-fade** (PF0–PF3) — desteğin kademeli çekilmesi. (3) **Hint merdiveni** — takılınca 0→1→2, ama asla kopyaya-hazır değil. Zorluk artar ama **her seferinde bir kenar**.

## Why It Exists

Bilişsel yük teorisi: çalışan bellek sınırlıdır; aynı anda çok yeni parça öğrenme başarısızlığı üretir. Cairn'in "calm premium journey" sözü de aynı yöne bakar — Duolingo tarzı yoğun döngü reddedilir. Bütçe invariantı bu ikisini birleştirir: her ders taşınabilir kalır, spine büyür ama patlamaz.

## Current Canon

### Ekran/chip bütçesi (CANONICAL, DEĞİŞMEZ, §1.1)
| Boyut | Sınır |
|---|---|
| Toplam ekran | 11–14 (9–11 aksiyon + 2–3 insight-card) |
| Micro-action | 15–25 toplam, ekran başına 1–3 (cap 4) |
| Süre | 7–10 dk |
| Yeni active chip | **1–4** |
| Üretim aksiyonu | 3–5 |

### Recycle Load Protection (CANONICAL, v0.3:388-390)
> "Recycle cannot steal the lesson." Her cümlenin bir yük bütçesi var: **target load baskın, recycle load destekleyici, exposure load opsiyonel ve capped.** Bkz. [[Chip Lifecycle]], [[Content Selection]].

### Prompt-fade (IMPLEMENTED engine, mastery.ts:35-36)
`PF_LEVELS = ["PF0","PF1","PF2","PF3"]`, `MAX_PF_INDEX = 3`. Başarı ile ilerler (destek çekilir), başarısızlık ile iner (destek geri gelir). Zorluğu mastery'ye göre otomatik ayarlar. Bkz. [[Mastery Model]].

### Hint merdiveni (IMPLEMENTED, Weave)
`hintLevel` 0→1→2: sessiz → ters-sıralı parçalar (asla kopyaya-hazır) → cloze şekli. "rebuild-the-thought, not copy" (EXERCISE_CANON §8). Bkz. [[Weave System]].

### Insight budget (CANONICAL + MECHANIZED)
L3 insight-card ≤3 (V5 validator, `canonRules.ts:158-165`, `INSIGHT_BUDGET_MAX=3`). Aşımı bilişsel yükü artırır → WARN.

### Integration Rhythm (CANONICAL heuristic)
~3 ardışık yeni-motor dersi review beat olmadan olmaz (`learning-engine-v1.md:130`) — yük dağıtımı için.

## How It Works

### State / Lifecycle
Prompt-fade item-başına mastery ile hareket eder; zorluk statik değil, kanıta uyarlanır. Hint merdiveni oturum içi, takılma anında devreye girer.

### Guardrails
- Yeni active chip ≤4/ders.
- Micro-action ≤4/ekran.
- Recycle target load'u çalamaz.
- Hint asla kopya sırası vermez (deterministik ters sıra).

## Failure Modes
- **Bütçe aşımı** → ders taşınamaz hale gelir; V1 (screen_action_count) ve V5 (insight_budget) yakalamak için var (V1 spec-only, V5 mekanize).
- **Recycle overload** → yeni öğrenme boğulur; load protection buna karşı.

## Diagrams
```mermaid
flowchart TD
  Budget["Ders bütçesi: 11–14 ekran · 1–4 yeni chip · 7–10 dk"]
  Budget --> Load["Yük bütçesi/cümle:<br/>target baskın > recycle destek > exposure capped"]
  Load --> PF["Prompt-fade PF0→PF3<br/>(mastery ile otomatik)"]
  PF --> Hint["Hint merdiveni 0→1→2<br/>(takılınca, kopya değil)"]
```
Yük dört kademede kontrol edilir: ders bütçesi, cümle-içi yük bütçesi, mastery-güdümlü prompt-fade ve takılma-anı hint merdiveni. Hepsi "her seferinde bir kenar" ilkesine hizmet eder.

## Runtime Implementation
### Code References
- `lemot-app/components/lesson-v1/screens/Weave.tsx` — hint ladder (IMPLEMENTED).
- `mastery.ts:35-36` — PF_LEVELS (engine, tested-only).
- `canonRules.ts:158-165` — V5 insight budget (MECHANIZED).
### Test References
`canonRules.test.ts` (V5).
### Product-Stage Availability
Hint ladder: dev-apk aktif. Prompt-fade: engine-only (v1 mastery çalıştırmaz). Bütçe: içerik-üretim kuralı (build-time).

## Known Gaps
- V1 (screen_action_count) mekanize değil (spec-only) — bütçe elle denetlenir.
- Prompt-fade canlı yüzeyde çalışmaz (event yok).

## Open Questions
> [!open-loop] Ekran-başına micro-action sınırı (V1) ne zaman mekanize edilecek? → [[05 Open Loops]]

## Related Notes
[[Lesson Anatomy]] · [[Chip Lifecycle]] · [[Weave System]] · [[Mastery Model]] · [[Content Selection]]
