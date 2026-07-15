---
title: Progress
aliases: [Progress, Progress Tab, İlerleme Sekmesi, Stats, stats.tsx]
type: design-spec
domain: design
status: legacy-active
canon_status: provisional
implementation_status: legacy-active
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/app/(tabs)/stats.tsx", "lemot-app/config/productStage.ts", "lemot-app/app/(tabs)/_layout.tsx"]
code_refs: ["lemot-app/app/(tabs)/stats.tsx", "lemot-app/config/productStage.ts:101-107", "lemot-app/app/(tabs)/_layout.tsx:66-78"]
related: ["[[00 Le Mot Holy Codex]]", "[[Navigation Model]]", "[[Practice]]", "[[Feature Flags Map]]", "[[Mastery Model]]", "[[Copy and Tone]]"]
tags: [design, progress, legacy-active, dev-apk-hidden]
---

# Progress

> [!warning] impl_status: **legacy-active ama dev-apk'ta GİZLİ.** Progress ("Progress"/`stats.tsx`) sekmesi legacy 24-lesson syllabus'unu + milestone tier'larını render eder; Round 1 tester yüzeyinde `FEATURES.progress=false` ile kaldırılmıştır.

## Executive Summary

Progress sekmesi (route adı `stats`, başlık "Progress") mastered/learning/weak kelime kategorileri + milestone rozetleri gösteren legacy bir yüzeydir. **Kod var, dev-apk'ta gizli** çünkü içeriği legacy 24-lesson modeline dayanır — v1 Round 1 L0–L6 yüzeyinin dışında. Gizleme scope kontrolüdür, monetizasyon değil.

## Current Canon

- Görünürlük: `FEATURES.progress` — **sandbox: true, dev-apk: false, public-beta: true** (`productStage.ts` satır 82 / 106 / 126).
- Tab gate + gerekçe (`_layout.tsx:69-73`): "stats.tsx renders the legacy 24-lesson syllabus / milestone tiers, which are out of the Round 1 L0-L6 surface."
- Round 1 checklist §4: "Progress/stats is legacy 24-lesson surface, outside Round 1 scope."

## Why It Exists (tarihsel)

Sprint 8 "Enhanced Progress Tab": mastered/learning/weak kategorileri, günlük review durumu, milestone rozetleri. **Streak gösterimi locked-decision 2026-04-23 ile kaldırıldı** ("days on the path" ile değiştirilmesi UX.1 altında planlandı) — bkz. [[Copy and Tone]] banned-language.

## How It Works (bugünkü, gizli)

- Route mount edilir; tab bar girişi `href: null`. Deep-link → Home.
- Legacy `lm7` depolama dünyasından okur (`{p, err, dr}`); learning-engine `lm_le_*` dünyasından ayrıdır. İki depo disjoint ("main integration blocker"). Bkz. [[Storage Architecture]] · [[Mastery Model]].

> [!warning] Progress'in gösterdiği milestone/kelime kategorileri legacy 24-lesson modelinden türetilir; v1 spine'ın gerçek mastery'si learning-engine `MasterySnapshot`'ta yaşar ve bu ekranla **bağlı değildir**. Yani Progress bugün "gerçek" v1 ilerlemesini yansıtmaz. → [[Spec Runtime Divergences]].

## Guardrails

- v1 Round 1'de Progress rewrite yok ("Hard no" listesi, [[03 Current State]]).
- Streak/XP dili yasak; kaldırılan streak yerine yalnızca sakin milestone/gün dili.

## Known Gaps

- v1 mastery (engine) ile Progress UI arasında köprü yok — legacy store'a bağlı.
- `stats.tsx` iç bileşenleri satır-seviyesinde okunmadı → [[Needs Verification]].

## Related Notes

- [[Navigation Model]] · [[Practice]] · [[Mastery Model]] · [[Feature Flags Map]] · [[Copy and Tone]]
