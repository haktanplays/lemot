---
title: "ADR-0017 Product-stage model fails closed to dev-apk"
aliases: ["ADR-0017", "Fail-closed stage", "product stage dev-apk fallback"]
type: decision
domain: architecture
status: active
canon_status: canonical
implementation_status: implemented
verification_status: unit-tested
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
decision_date: 2026-06-09
source_of_truth: ["docs/STATUS.md", "docs/workstreams/release-guardrail-audit-plan.md"]
code_refs: ["productStageResolution.test.ts", "EXPO_PUBLIC_PRODUCT_STAGE"]
related: ["[[Product Stages and Feature Flags]]", "[[ADR-0008 dev-apk-route-contract]]", "[[Product Stage Architecture]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, architecture, feature-flags, fail-closed]
---

# ADR-0017 — Product-stage model fails closed to dev-apk

> [!decision] Status: **ACTIVE** (LOCKED, fixed #104)

## Context
Yanlış yüzeyi tester'a gönderen bir build **görünmez bir başarısızlıktır**. Env değişkeni unutulur/yanlış yazılırsa ne olmalı?

## Decision
Üç stage: `sandbox` (all-on) / `dev-apk` (minimal tester yüzeyi) / `public-beta` (paywall). Unset/mistyped `EXPO_PUBLIC_PRODUCT_STAGE` artık **`dev-apk`** (en kısıtlı) olarak çözülür, asla `sandbox` değil. Local sandbox artık env'i **açıkça** set etmeyi gerektirir. `aiEnabled` yalnızca sandbox'ta true.

## Why
Fail-closed: kaza sonucu tam-açık bir yüzey sızmasın. En kötü durum en kısıtlı yüzeydir.

## Alternatives Considered
- Fail-open → sandbox (eski davranış) — **SUPERSEDED** (#104 ile).
- Build'i hata verip durdurmak — reddedildi (dev-apk fallback daha pratik).

## Rejected Alternatives
Fail-open sandbox fallback (kaza sonucu paywall/AI/practice sızması riski).

## Consequences
dev-apk bayrakları OFF: paywall/aiChat/aiEnabled/practice/progress/dailyReview/wordGraph/monLexique; aiLesson=true. public-beta paywall+revenueCat ekler, aiEnabled hâlâ false. Route contract ([[ADR-0008 dev-apk-route-contract]]) bu stage modeline dayanır.

## Implementation References
STATUS "Product stage note" + #104; `release-guardrail-audit-plan` §7; repo-audit R3; `productStageResolution.test.ts`.

## Verification
Unit-tested (`productStageResolution.test.ts`).

## Supersedes / Superseded By
Supersedes: fail-open sandbox fallback (SUPERSEDED). Superseded by: —

## Source Evidence
`06_decisions_history.md` D-20.

## Related
[[Product Stages and Feature Flags]] · [[Product Stage Architecture]] · [[ADR-0008 dev-apk-route-contract]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
