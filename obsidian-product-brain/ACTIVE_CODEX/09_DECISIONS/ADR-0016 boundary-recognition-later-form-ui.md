---
title: "ADR-0016 Boundary / recognition-only 'later form' soft-card UI"
aliases: ["ADR-0016", "Boundary UI", "later form card", "recognition-only presentation"]
type: decision
domain: design
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
decision_date: 2026-06-02
source_of_truth: ["docs/workstreams/boundary-recognition-ui-decision.md"]
code_refs: ["isBoundaryLaterForm"]
related: ["[[ADR-0002 calm-passive-mirror-mentor-tone]]", "[[Chip Taxonomy]]", "[[Interaction Patterns]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, design, boundary, recognition]
---

# ADR-0016 — Boundary / recognition-only UI presentation ("later form" soft card)

<!-- gh-toc -->

## İçindekiler

- [Context](#context)
- [Decision](#decision)
- [Why](#why)
- [Alternatives Considered](#alternatives-considered)
- [Rejected Alternatives](#rejected-alternatives)
- [Consequences](#consequences)
- [Implementation References](#implementation-references)
- [Verification](#verification)
- [Supersedes / Superseded By](#supersedes-superseded-by)
- [Source Evidence](#source-evidence)
- [Related](#related)

> [!decision] Status: **ACTIVE** (decision); schema marker **DEFERRED**

## Context
Recognition-only "boundary" öğeler (ör. L12 inversion / `qu'est-ce que`) dev player'da teknik olarak render oluyor ama öğrenciye nasıl gösterilecekleri belirsizdi.

## Decision
Boundary nesneleri geçerli engine nesneleridir, ama **öğrenci UI'ında yumuşak "later form" / "not yet" kartları** olarak render edilir — lesson/exercise ID'leri gizlenir, `recognition` rozeti gizlenir, `boundary`/`recognitionOnly`/`blockedProduction` sözcükleri kullanılmaz; modal değil inline; pedagojik sınır korunur (tanıyabilir, asla üretmesi istenmez). Copy: **"A form for later… we won't build this form yet."**

## Why
Sınır bir başarısızlık değil, nazik bir "sonrası" işaretidir ([[ADR-0002 calm-passive-mirror-mentor-tone]] ile uyumlu). Jargon ve ID sızıntısı premium tonu bozar.

## Alternatives Considered
- Boundary'yi failure kartı olarak göstermek — reddedildi.
- Modal uyarı — reddedildi (inline tercih edildi).
- `presentationHint`/`later_form` şema marker'ını şimdi eklemek — **DEFERRED** (ayrı incelenecek gelecek değişiklik).

## Rejected Alternatives
Failure sunumu; `recognition`/`boundary` jargonunu göstermek; ID sızdırmak; şema marker'ını erkenden eklemek.

## Consequences
P3 renderer `operation + bucket` üzerinden branch yapar (dar sınıflandırıcı `isBoundaryLaterForm`, PR #57). Şema marker'ı ayrı, ertelenmiş bir gelecek işi.

## Implementation References
`boundary-recognition-ui-decision` (tüm bölümler); p3 checkpoint §3; PR #57 `isBoundaryLaterForm`.

## Verification
Source-inspected; renderer PARTIAL (classifier landed, schema marker not).

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-22.

## Related
[[ADR-0002 calm-passive-mirror-mentor-tone]] · [[Chip Taxonomy]] · [[Interaction Patterns]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
