---
title: "ADR-0019 K5 — squash-merge convention stays"
aliases: ["ADR-0019", "K5", "squash-merge"]
type: decision
domain: ops
status: active
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
decision_date: 2026-07-05
source_of_truth: ["docs/STATUS.md"]
code_refs: []
related: ["[[PR Discipline]]", "[[ADR-0010 karpathy-engine-purity-contract]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, ops, git]
---

# ADR-0019 — K5: squash-merge convention stays

> [!decision] Status: **ACTIVE** (K5)

## Context
Operatör kararları turunda (K1–K6) merge stratejisinin sabitlenmesi gerekiyordu.

## Decision
**Squash-merge** konvansiyonu kalır. (Bağlam: K4 = karpathy import edildi; K6 = `deriveDrill` tone pass, Taş 2 / PR 14'e ertelendi — bkz. [[Deferred Decisions]].)

## Why
Tek-intent-tek-commit ([[PR Discipline]]) disipliniyle uyumlu; temiz, okunur main geçmişi.

## Alternatives Considered
- Merge-commit / rebase-merge — reddedildi (squash tercih edildi).

## Rejected Alternatives
Merge-commit tabanlı akış; gürültülü çoklu-commit main geçmişi.

## Consequences
Shallow local git penceresinde tüm PR'lar squash edilmiş görünür (#146→#196, `2bfc1b6`→`02f9f7a`).

## Implementation References
STATUS "Operator decisions" K4/K5/K6.

## Verification
Source-inspected (STATUS).

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-19.

## Related
[[PR Discipline]] · [[Development Workflow]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
