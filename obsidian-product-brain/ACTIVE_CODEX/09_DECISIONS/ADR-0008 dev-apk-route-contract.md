---
title: "ADR-0008 Route contract: Dev APK first lesson stays v1; engine /learn/* sandbox-only"
aliases: ["ADR-0008", "Route contract", "sandbox route contract"]
type: decision
domain: architecture
status: active
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
decision_date: 2026-06-09
source_of_truth: ["docs/workstreams/dev-apk-sandbox-route-contract.md"]
code_refs: ["app/lesson/[id]", "app/v1-lesson/[id]", "app/learn/[fixtureId]"]
related: ["[[ADR-0007 v1-temporary-dev-apk-skin-engine-foundation]]", "[[ADR-0017 product-stage-fail-closed-dev-apk]]", "[[Route Architecture]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, architecture, routing]
---

# ADR-0008 — Dev APK first lesson stays v1; learning-engine `/learn/*` sandbox-only

> [!decision] Status: **ACTIVE** (LOCKED)

## Context
Üç ders route ağacı bir arada: `/lesson/[id]` (legacy v7), `/v1-lesson/[id]` (v1 smoke), `/learn/[fixtureId]` (engine).

## Decision
Home ilk dersi **v1'e** yönlendirir; `/learn/l2` şu gate ile korunur: `PRODUCT_STAGE === "sandbox" && FEATURES.v1LessonEngine`, yalnızca **deep-link**, asla Home'dan link verilmez. Legacy/v1 açılması sözleşmenin çalışması, bug değil. **Cutover yetkilendirilmedi.**

## Why
Tester'a doğru yüzeyi göstermek; engine'i gizli tutarken v1'i smoke yüzeyi olarak sabitlemek.

## Alternatives Considered
- Home'u doğrudan `/learn/*`'a bağlamak — reddedildi (engine henüz public değil).
- Legacy `/lesson/[id]`'i tamamen silmek — ertelendi (B13 deep-link guard açık loop).

## Rejected Alternatives
Yetkisiz cutover; engine route'unu Home'a bağlamak.

## Consequences
Cutover = gelecekteki flagged, reversible adım. B13: legacy `/lesson/[id]` deep-link guard hâlâ açık (PR-O).

## Implementation References
`dev-apk-sandbox-route-contract` §1–§5.

## Verification
Source-inspected. Route gate testleri; Round 1 smoke'ta Home→v1 doğrulandı.

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-09.

## Related
[[Route Architecture]] · [[ADR-0007 v1-temporary-dev-apk-skin-engine-foundation]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
