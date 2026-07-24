---
title: "ADR-0009 Events are the source of truth; everything else is a projection"
aliases: ["ADR-0009", "Event sourcing decision", "Events remember"]
type: decision
domain: architecture
status: active
canon_status: canonical
implementation_status: partial
verification_status: unit-tested
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
decision_date: 2026-06-02
source_of_truth: ["docs/workstreams/founder-self-learning-build-architecture-review.md"]
code_refs: ["content/learning-engine/", "lm_le_events"]
related: ["[[ADR-0020 progress-bridge-events-canonical]]", "[[ADR-0010 karpathy-engine-purity-contract]]", "[[Learning Engine Architecture]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, architecture, event-sourcing]
---

# ADR-0009 — Events are the source of truth; everything else is a projection

> [!decision] Status: **ACTIVE** (LOCKED, documented direction)

## Context
Founder self-learning build'in makro mimarisi: öğrenci kanıtı nerede yaşar, scoring policy değişince ne olur?

## Decision
Mastery matrix, Mon Lexique, Practice Pool, Daily Review, dashboard **hepsi** append-only bir `learning_event` (`lm_le_events`) log'unun **projeksiyonlarıdır**. Bir scoring-policy değişikliği **yeniden türetir, migrate etmez** (re-derive, never migrate). `LearningRepository` arayüzü app ile storage arasında oturur (`LocalRepository` kvStorage / `RemoteRepository` Supabase). Deterministik engine önce; **AI açıklar ama asla override etmez**.

## Why
North star: "Components render. Engines decide. Contracts constrain. **Events remember.** AI explains but never overrides." Kanıtı tek, değişmez bir kaynağa bağlamak; policy değişimini güvenli kılmak.

## Alternatives Considered
- Türetilmiş durumları doğrudan mutate etmek — reddedildi.
- Snapshot'ı canonical yapmak — reddedildi (event log ucuz yeniden-türetme sağlar).

## Rejected Alternatives
Projeksiyonları migrate etmek; snapshot'ı source-of-truth yapmak; AI'ı grading kaynağı yapmak.

## Consequences
14 makro karar "architecture-complete" olarak onaylandı; not'un kendisinde hiçbir şey implement edilmedi (sonradan P0–P5 boyunca gerçeklendi). [[ADR-0020 progress-bridge-events-canonical]] bunun somut sonucu (sahte `lm7` marker yasağı).

## Implementation References
`founder-self-learning-build-architecture-review` §1–§21; `lm_le_events` log; `LearningRepository` (`LocalRepository`/`RemoteRepository`).

## Verification
Unit-tested (pure engine projeksiyonları test edilmiş); tam runtime wiring PARTIAL.

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-11.

## Related
[[Learning Engine Architecture]] · [[ADR-0020 progress-bridge-events-canonical]] · [[Self-Producing Engine]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
