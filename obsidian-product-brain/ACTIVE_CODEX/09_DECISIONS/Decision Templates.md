---
title: Decision Templates
aliases: [ADR Template Guide, Karar Şablonu, How to add an ADR]
type: workflow
domain: meta
status: active
canon_status: canonical
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["99_TEMPLATES/Decision Record Template.md"]
related: ["[[Decision Index]]", "[[06 Canon and Status Legend]]", "[[00 Le Mot Holy Codex]]"]
tags: [workflow, decision, template, how-to]
---

# 🧩 Decision Templates

> [!canon] Yeni bir ADR eklemenin canonical yolu. Ham şablon: `99_TEMPLATES/Decision Record Template.md`. Ana dizin: [[Decision Index]].

## Ne zaman ADR açılır?
Bir karar **kalıcı** (durable) ve **birden fazla notu/kodu etkiliyorsa** ADR olur:
- Yeni bir ürün/pedagoji ilkesi kilitlendiğinde (LOCKED).
- Eski bir karar değiştiğinde (yeni ADR + eskiyi `superseded` işaretle).
- Bir yaklaşım açıkça reddedildiğinde (ilgili ADR'in "Rejected Alternatives" bölümüne).
- Bir yön kabul ama uygulama ertelendiğinde (status: `deferred`).

Tek seferlik/önemsiz tercih ADR **değildir** — [[05 Open Loops]] veya ilgili sistem notuna yaz.

## Adımlar
1. **Numara al.** Bir sonraki boş sıra numarası (şu an en yüksek = **ADR-0025**; yeni = **ADR-0026**).
2. **Dosya adı** = `ADR-00NN <slug>.md` (ör. `ADR-0026 audio-listening-pipeline.md`). Slug kısa, tireli, İngilizce/canonical.
3. **Şablonu kopyala** (`99_TEMPLATES/Decision Record Template.md`), frontmatter'ı doldur:
   - `status`: active | deferred | rejected | superseded
   - `canon_status`: canonical | proposed | historical | superseded
   - `implementation_status`: implemented | partial | spec-only | not-started
   - `verification_status`: device-verified | integration-tested | unit-tested | source-inspected | reported-only | unverified
   - `decision_date`, `source_of_truth[]`, `code_refs[]`, `related[]`, `supersedes[]`, `superseded_by[]`
4. **`> [!decision]` callout** ile statüyü yaz (ACTIVE / DEFERRED / REJECTED / SUPERSEDED).
5. **Bölümleri doldur** (aşağıdaki iskelet): Context · Decision · Why · Alternatives Considered · Rejected Alternatives · Consequences · Implementation References · Verification · Supersedes/Superseded By · Source Evidence.
6. **Cross-link**: ilgili ADR'ler + up-link `[[Decision Index]]` ve `[[00 Le Mot Holy Codex]]`.
7. **[[Decision Index]]** master tablosuna satır ekle; statüye göre [[Active Decisions]] / [[Deferred Decisions]] / [[Rejected Decisions]] / [[Superseded Decisions]] listesine ekle.
8. Bir karar eskiyi aşıyorsa: eski ADR'in `superseded_by`'ını doldur, [[Superseded Decisions]] tablosuna taşı.

## İskelet (kopyala)
```md
---
title: "ADR-00NN <Başlık>"
type: decision
domain: <product|learning|syllabus|architecture|design|ops|meta>
status: <active|deferred|rejected|superseded>
canon_status: <canonical|proposed|historical|superseded>
implementation_status: <implemented|partial|spec-only|not-started>
verification_status: <device-verified|unit-tested|source-inspected|unverified>
owner: cairn-product-brain
decision_date: <YYYY-MM-DD>
source_of_truth: []
code_refs: []
related: []
supersedes: []
superseded_by: []
tags: [decision, adr]
---

# ADR-00NN — <Başlık>

> [!decision] Status: <ACTIVE / DEFERRED / REJECTED / SUPERSEDED>

## Context
## Decision
## Why
## Alternatives Considered
## Rejected Alternatives
## Consequences
## Implementation References
## Verification
## Supersedes / Superseded By
## Source Evidence
```

## Dil kuralı
Anlatım **Türkçe**; Fransızca (`je voudrais un café`), kod (`deriveDrill`, `lm_le_events`), dosya/şema/tip adları ve canonical İngilizce kopya **aynen** korunur (çevirme). Statü disiplini için: [[06 Canon and Status Legend]].

## Related
[[Decision Index]] · [[06 Canon and Status Legend]] · [[Documentation Workflow]] · [[00 Le Mot Holy Codex]]
