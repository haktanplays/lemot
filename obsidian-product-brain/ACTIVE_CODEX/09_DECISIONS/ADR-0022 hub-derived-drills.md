---
title: "ADR-0022 Deterministic drill derivation — hub exercises are derived"
aliases: ["ADR-0022", "Hub derived drills", "deriveDrill", "content factory"]
type: decision
domain: learning
status: active
canon_status: canonical
implementation_status: implemented
verification_status: unit-tested
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-26
last_reviewed: 2026-07-26
amended_by: ["docs/bibles/mastery-evidence/MASTERY_EVIDENCE_FOUNDER_RATIFICATION_v0.1.md"]
decision_date: 2026-07-05
source_of_truth: ["docs/ROADMAP.md", "docs/canon/LESSON_FLOW_CANON_v1.md", "docs/STATUS.md"]
code_refs: ["deriveDrill"]
related: ["[[Self-Producing Engine]]", "[[ADR-0013 yasa3-error-tag-immutability]]", "[[ADR-0021 mastery-precision-near-miss-not-failure]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, learning, content-factory, drills]
---

# ADR-0022 — Deterministic drill derivation + hub = derived

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

> [!decision] Status: **ACTIVE** (Option B; shipped #179); **SCOPE-AMENDED 2026-07-26** (Mastery & Evidence FQ-2 — see the amendment block at the end)

## Context
Hub egzersizleri ~80 derse ölçeklenmeli. Her drill'i elle yazmak ölçeklenmez.

## Decision
Hub egzersizleri **DERIVED**tir (item + screen-type template → deterministik üretim, "bu chip'i bir fill formuna dök"), elle yazılmış statik değil. `deriveDrill` **fail-closed** + practice selector v0 (canon 5.2 sırası: **SRS-due → weakest tag → upcoming integration need → variety**). **Evidence weight** (mastery çarpanı) ve **selection weight** (bugün ne gösterilecek) ayrı modüllerdir, asla karışmaz.

## Why
Content factory ilk gerçek üründür; deterministik türetme, ~80 derse ölçeklenmenin tek yolu. Elle statik drill'ler ölçeklenmez.

## Alternatives Considered
- Option A: elle yazılmış statik hub drill'leri — reddedildi (ölçeklenmez).
- **Option B: deterministik türetme — SEÇİLDİ.**
- AI ile drill üretimi — reddedildi (AI dormant, [[ADR-0023 privacy-local-first-consent-gated-remote]] ve deterministik-önce ilkesi).

## Rejected Alternatives
Elle yazılan hub statikleri; evidence weight ile selection weight'i karıştırmak; AI-üretilen grading drill'leri.

## Consequences
`deriveDrill` + practice selector v0 #179'da indi (`691cde3`). Error tag'ler ([[ADR-0013 yasa3-error-tag-immutability]]) sipariş dili olduğundan immutability kritik.

## Implementation References
ROADMAP "HUB TÜRETME KARARI" + Açık Karar Kaydı; STATUS #179/`691cde3`; LESSON_FLOW_CANON §5.3.

## Verification
Unit-tested (deriveDrill fail-closed + selector v0).

## Supersedes / Superseded By
Supersedes: elle yazılmış hub drill yaklaşımı (Option A, REJECTED). Superseded by: —

## Source Evidence
`06_decisions_history.md` D-25.

## Scope amendment — Mastery & Evidence FQ-2 (2026-07-26)

> [!canon] **Scope amendment, not repeal.** Only the *implementation-exists* implication is withdrawn.
> **The separation principle is untouched and remains binding.**

**What still stands (unchanged):**
- **Evidence weight ve selection weight AYRI KAVRAMLARDIR ve asla karışmaz.** Founder FQ-2 kuralı 9 bunu
  açıkça korur. Bu ADR'nin merkezî katkısıdır.
- Hub egzersizleri **DERIVED**tir; elle yazılmış statik değildir.
- `deriveDrill` **fail-closed** davranışı.
- Practice selector v0 sırası: **SRS-due → weakest tag → upcoming integration need → variety**.
- AI ile drill üretiminin **reddi**.
- Orijinal Context / Why / Alternatives / Rejected Alternatives / Consequences.

**What is amended:**
- Yukarıdaki Decision'daki *"**Evidence weight** (mastery çarpanı) … **ayrı modüllerdir**"* ifadesi,
  evidence-weight çarpanının **halihazırda uygulanmış bir modül olarak var olduğunu** ima eder.
  **Bu ima geri çekilmiştir.**

**Binding rule after this amendment (founder FQ-2, 2026-07-26):**
1. **Farklılaşmış evidence strength semantik olarak ratified'dir**: production, bağımsız kullanım için
   recognition'dan güçlüdür; recognition geçerli kanıttır ama tek başına bağımsız üretimi veya sahipliği
   kanıtlamaz.
2. **Kavramsal yeri admission'dır** — kanıt kabul edilirken iliştirilen semantik bir özelliktir.
3. **Mevcut mastery reducer'da hiçbir weighting mekanizması yoktur.** (`EXERCISE_CANON_v0.4 §2` bunu
   zaten doğru ifade eder: sevkedilen `mastery-v0.2` **frozen**, evidence weights bir **v0.3 proposal**.)
4. **Hiçbir sayısal ağırlık, çarpan veya aralık founder tarafından ratified değildir.**
   `lexique-memory.ts` değerleri yalnızca **aday değerlerdir**.
5. **Recognition-only kanıt tek başına en uzun review aralığına veya en güçlü mastery iddiasına
   ulaşamaz.**
6. Kesin algoritma, alan ve uygulama **Engineering**'e aittir.

**This amendment authorizes no code, schema, threshold or runtime change.**

**Authority:** `docs/bibles/mastery-evidence/MASTERY_EVIDENCE_FOUNDER_RATIFICATION_v0.1.md` §4a.

## Related
[[Self-Producing Engine]] · [[Content Selection]] · [[ADR-0013 yasa3-error-tag-immutability]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
