---
title: Test Coverage Matrix
aliases: [Test Coverage Matrix]
type: architecture
domain: architecture
status: canonical
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/scripts/tests/", "lemot-app/package.json"]
related: ["[[Test Strategy]]", "[[Validation Gates]]", "[[Device Verification Matrix]]"]
tags: [matrix, test]
---

# Test Coverage Matrix

> Sistem × (unit / integration / wiring / content-validator / device-smoke). Anlatım: [[Test Strategy]].

| Sistem | Unit | Integration | Wiring | Validator | Device | Boşluk |
|---|---|---|---|---|---|---|
| learning-engine (grade/answer-check/scoreEvents/selectors) | ✅ 42-file runner | ⚠️ | — | — | ❌ | shipped yüzeyde değil |
| mastery / carryover / lexique-memory / derive-drill / error-engine | ✅ tested-only | ❌ | ❌ (importer yok) | — | ❌ | wiring yok |
| v1 renderer (surface B) | ⚠️ | ⚠️ | ✅ (shipped) | ✅ validate:content | ✅ L0–L6 #136 | event yok |
| itemId / error-tag immutability | — | — | — | ✅ HARD ERROR (YASA 2/3) | — | — |
| canon rules | — | — | — | ✅ V3/V4/V5 (canonRules.test.ts) | — | V1/V2/V6–V9 deferred |
| legacy pools | — | — | — | ✅ validate:pools (6 warn) | ❌ | legacy |
| lesson-zero | ✅ lessonZeroAnswers.test.ts | — | ✅ | — | ✅ #136 | — |
| privacy / local reset | ⚠️ | ⚠️ | ✅ (AppProvider) | — | ⚠️ | cloud delete DEFERRED |
| sync / merge | ❌ | ❌ (C4/B5 untested) | ✅ | — | ❌ | **test yok** |
| AI edge | ⚠️ | ❌ | ❌ (dormant) | — | ❌ | çağrılamıyor |

Son kayıtlı koşu (`66d7aa7`): typecheck temiz; test:learning-engine 246 passed;
validate:pools exit 0 (6 warn); validate:content 0/0. Runtime kapanış notu 262/613
der → **bayat, yeniden çalıştırılmalı** ([[05 Open Loops]] O8).

> [!warning] "42-file runner geçiyor" ≠ "sevkedilen APK'da çalışıyor". Motorların
> çoğu tested-only; kullanıcı yolunda değil. [[Module Ownership Map]].
