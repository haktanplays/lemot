---
title: Practice
aliases: [Practice, Practice Tab, Pratik Sekmesi, Scenarios UI]
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
source_of_truth: ["lemot-app/app/(tabs)/practice.tsx", "lemot-app/config/productStage.ts", "lemot-app/app/(tabs)/_layout.tsx"]
code_refs: ["lemot-app/app/(tabs)/practice.tsx", "lemot-app/config/productStage.ts:96-100", "lemot-app/app/(tabs)/_layout.tsx:53-65"]
related: ["[[00 Le Mot Holy Codex]]", "[[Navigation Model]]", "[[Progress]]", "[[Feature Flags Map]]", "[[Product Stages and Feature Flags]]", "[[Review and Recycling System]]"]
tags: [design, practice, legacy-active, dev-apk-hidden]
---

# Practice

> [!warning] impl_status: **legacy-active ama dev-apk'ta GİZLİ.** Practice sekmesinin kodu `app/(tabs)/practice.tsx`'te canlı, ama Round 1 tester yüzeyinde `FEATURES.practice=false` ile tab bar'dan kaldırılmıştır. Bu not "bugün var ama tester görmüyor" gerçeğini kayıt altına alır.

## Executive Summary

Practice sekmesi, senaryo kartları (scenario cards: "You walk into a bakery → what do you say?") + Leitner tarzı SRS üzerine kurulu legacy bir yüzeydir (Sprint 8B/8C dönemi). **Kod var, dev-apk'ta gizli.** Gizleme monetizasyon değil scope kontrolü: sekme "legacy scenario / flashcard material beyond the Dev APK path" sunar (`_layout.tsx:56-59`).

## Current Canon

- Görünürlük: `FEATURES.practice` — **sandbox: true, dev-apk: false, public-beta: true** (`productStage.ts` sandbox `practice:true` satır 79 / dev-apk `practice:false` satır 100 / public-beta `practice:true` satır 123).
- Tab gate: `href: FEATURES.practice ? undefined : null` (`_layout.tsx:60`).
- Round 1 checklist §4: "Chat/Practice/Progress hidden by flags (`FEATURES.aiChat/practice/progress = false`)."

## Why It Exists (tarihsel)

Sprint 8B'de flashcard bölümü senaryo kartlarıyla değiştirildi (meaning-first, ezber değil); Sprint 8C'de üstüne Leitner 5-box SRS eklendi (`lm7_srs`, aralıklar `[0,1,3,7,30]`). Bu legacy yüzey v1 Round 1 pedagojisinin parçası değil. Pedagojik/SRS içeriği: [[Review and Recycling System]] · [[Mastery Model]].

## How It Works (bugünkü, gizli)

- Route dosyası mount edilir (`practice.tsx`), sadece tab bar girişi `href: null` ile gizlenir. Deep-link `/practice` → Home'a düşer (checklist §9).
- SRS depolama: `lm7_srs` (legacy app storage dünyası; learning-engine `lm_le_*` dünyasından ayrı). Bkz. [[Storage Architecture]].

## Guardrails

- v1 Round 1'de Practice **genişletilmez** — "Hard no" listesinde: Practice/Chat genişletme yok (`docs/STATUS.md`, bkz. [[03 Current State]]).
- Sekme flag'le gizlenir, silinmez — sandbox'ta hâlâ erişilebilir.

## Known Gaps

- Practice'in v1 spine (chip + memory) ile hizalanması yapılmadı; şu an legacy senaryo/flashcard havuzuna dayanır.
- `practice.tsx` iç detayları bu pass'te satır-seviyesinde okunmadı → derinleşme gerekirse [[Needs Verification]].

## Related Notes

- [[Navigation Model]] · [[Progress]] · [[Daily Review UI]] · [[Feature Flags Map]] · [[Review and Recycling System]]
