# Le Mot / Cairn — Loop Audit v2 (2026-07-09)

> Status: IN PROGRESS — round 1 fan-out running. This document is the durable
> record of the second full loop audit, run on `main @ 4b68f4c` (post PR-A…PR-E1).
> It builds on `docs/audits/2026-07-08-final-loop-audit.md` (B1–B24): previously
> known findings are reconciled below, and new findings get **C-series IDs**.

## Scope & method

Multi-round parallel deep-audit (8 lenses per round: security/privacy,
concurrency/leaks, engine correctness, dead code/drift, UI/screens, storage
lifecycle, config/supply-chain, tests/eng-quality), each round followed by a
hand-verification pass; looped until a round yields nothing material. Special
attention to code merged since the last audit (PRs #188–#193), which had never
itself been audited.

## B1–B24 reconciliation (as of main @ 4b68f4c)

| ID | Finding (short) | Status |
|----|-----------------|--------|
| B1 | BuildSentence double-count | **FIXED** #189 |
| B2 | lm7/lm7_srs corrupt → silent reset | **FIXED** #188 |
| B3 | event log corrupt → destroyed | **FIXED** #188 |
| B4 | AI edge: no rate limit / client-owned prompt | **FIXED** #191 |
| B5 | hasPulled never reset on user change | OPEN (PR-G) |
| B6 | shared-blob write race | **FIXED** #190 |
| B7 | near-miss mastery-positive | **FIXED** #193 |
| B8 | deriveFill in-word blanking | OPEN (PR-E2) |
| B9 | telemetry missing from reset/export | **FIXED** #192 |
| B10 | unbounded growth, O(n²) scoring | OPEN |
| B11 | Review weave >100% score | **FIXED** #189 |
| B12 | skip/near-miss pushed past due | **FIXED** #193 |
| B13 | /lesson/[id] deep link unguarded in dev-apk | OPEN |
| B14 | anon session blocks /auth, no upgrade path | OPEN |
| B15 | provider error leak / dead timeout | **FIXED** #191 |
| B16 | ai-diag unauth leak | **FIXED** #191 (source; remote delete = operator step) |
| B17 | errors sync one-way, unbounded server-side | OPEN (PR-G) |
| B18 | lm7/lm7_srs unversioned | OPEN (PR-G) |
| B19 | plaintext auth tokens | **FIXED** #192 |
| B20 | lemot:// scheme claimable | OPEN (info) |
| B21 | context_chain un-advanceable | **FIXED** #189 |
| B22 | shipped content ≈unvalidated; canonRules dead | OPEN (PR-F) |
| B23 | context_chain over-weights mastery | OPEN (PR-E2) |
| B24 | practice reuse inflates lesson mastery | OPEN (PR-E2) |

LOW/NIT cluster from v1 audit: status re-checked this round (see findings below).

## New findings (C-series)

_(populated after verification)_

## Dead-code inventory

_(populated after verification)_

## Storage-key lifecycle table

_(populated after verification)_

## Engineering-quality evaluation

_(populated after verification)_

## Severity-ranked remediation plan

_(populated after verification)_
