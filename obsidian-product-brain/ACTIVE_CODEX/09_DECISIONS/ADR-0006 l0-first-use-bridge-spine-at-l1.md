---
title: "ADR-0006 L0 is a first-use bridge; spine begins at L1"
aliases: ["ADR-0006", "L0 bridge decision", "Lesson Zero not Lesson 1"]
type: decision
domain: syllabus
status: active
canon_status: canonical
implementation_status: implemented
verification_status: device-verified
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
decision_date: 2026-06-17
source_of_truth: ["docs/workstreams/round1-founder-learning-slice.md"]
code_refs: ["app/lesson-zero.tsx", "content/lessons/v1/v1-lesson-000"]
related: ["[[L0 The First Step]]", "[[L1 Survival Kit]]", "[[ADR-0007 v1-temporary-dev-apk-skin-engine-foundation]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, syllabus, l0]
---

# ADR-0006 — L0 is a first-use bridge; the spine begins at L1

> [!decision] Status: **ACTIVE** (LOCKED)

## Context
"Lesson Zero"nun numaralı müfredattaki rolü belirsizdi — ilk ders mi, yoksa bir köprü mü?

## Decision
L0 ("First French Moment") bir **first-use bridge, mastery değil** ve **Lesson 1 olarak sayılmaz**. Yalnızca köprü teması (bonjour / je voudrais un café / s'il vous plaît / merci); request sistemini **öğretiyormuş gibi yapmamalı** (onu L1 sahiplenir). Numaralı **spine L1 (Survival Kit)** ile başlar.

## Why
İlk temas anını düşük-yük bir "ilk Fransızca anı" olarak vermek; L1'in gerçek öğretim işini bulandırmamak.

## Alternatives Considered
- L0'ı Lesson 1 saymak — reddedildi (mastery beklentisi yaratır).
- L0'ı tamamen kaldırmak — reddedildi (ilk-temas köprüsü değerli).

## Rejected Alternatives
L0'ı request sistemini öğreten bir mastery dersi yapmak; L0'ı spine'a saymak.

## Consequences
L0 = hardcoded `app/lesson-zero.tsx`; yapısal ikizi `v1-lesson-000` kayıtlı ama **yalnızca deep-link**. #139 Lesson Zero'yu yeniden inşa etti ("How Weave Works" otomatik zincirden çıkarıldı).

## Implementation References
round1-founder-learning-slice §1/§3/§4-L0/§6; `app/lesson-zero.tsx`; #139 rebuilt Lesson Zero; #141 cap rebuild hints.

## Verification
Device-verified: Round 1 L0–L6 emülatör smoke ACCEPTED (#136/`8cefe81`, P0–P3 zero); rebuilt Lesson Zero `91f1b04` operator cihaz smoke'u BEKLİYOR.

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-06, D-39.

## Related
[[L0 The First Step]] · [[L1 Survival Kit]] · [[Syllabus Overview]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
