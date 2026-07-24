---
title: Technical Debt
aliases: [Tech Debt, Teknik Borç]
type: architecture
domain: architecture
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/audits/2026-07-08-final-loop-audit.md", "docs/audits/2026-07-09-loop-audit-v2.md", "docs/KNOWN_GAPS.md"]
code_refs:
  - "lemot-app/content/learning-engine/repository/local.ts:14-38"
  - "lemot-app/hooks/useStorage.ts:14-16"
  - "lemot-app/scripts/shipped-item-ids.json"
test_refs: []
related:
  - "[[00 Le Mot Holy Codex]]"
  - "[[Implementation Overview]]"
  - "[[Known Gaps]]"
  - "[[Spec Runtime Divergences]]"
  - "[[Storage Architecture]]"
tags: [implementation, tech-debt, audit]
---

# Technical Debt

Up: [[Implementation Overview]] · Boşluklar: [[Known Gaps]] · Uçurumlar: [[Spec Runtime Divergences]]

> [!warning] "Borç" = kodda **var ama sorunlu/kırılgan/kopuk**. (Henüz olmayan işler →
> [[Known Gaps]].) İki loop-audit'ten (2026-07-08 B1–B24, 2026-07-09 C1–C30) çıkan
> saturated envanter. Genel mühendislik skoru: **B+** (loop-audit v2).

## Yapısal borç (en pahalı)

| Borç | Kanıt | Statü |
|---|---|---|
| **İki disjoint store** (`lm7` vs `lm_le_events`) | engine "never reads/writes `lm7`/`lm7_srs`" (`repository/local.ts:14-38`); Home/Progress/Daily Review hâlâ `lm7` okur | "**main integration blocker**" — [[Spec Runtime Divergences]], [[Decision Index|D-10]] |
| **Karar motoru sevkedilen yüzeye bağlı değil** | mastery/practice-selector/carryover/lexique-memory = tested-only | [[Module Ownership Map]] |
| **54-vs-56 item-id drift** | registry 54 anahtar, manifest 56 id | K3 çift-yön kontrolü yakalamak için var; `validate:content` yeşil mi UNKNOWN — [[Registry Map]] |
| **v1 = kalıcı ikinci sistem** | surface B "temporary smoke skin" ama şu an tek shipped yüzey; C hazır değil | [[Decision Index|D-08]] |

## Loop-audit borç kalemleri (açık kalanlar)

2026-07-09 reconciliation: **24 B-bulgusundan 15'i kapatıldı** (#188–#194). **Açık kalanlar:**
B5, B10, B13, B14, B17, B18, B20, B24 (+ B22 residual).

| ID | Borç | PR planı |
|---|---|---|
| B22 (residual) | shipped content ≈ unvalidated / canonRules kısmen ölü kod | mechanize edildi kısmen (#187 V3/V4/V5) |
| B24 | practice-reuse mastery inflation | PR-L |
| B5 | `hasPulled` user değişiminde reset edilmiyor | PR-K |
| B13 | legacy `/lesson/[id]` deep-link guard yok | PR-O |
| B10 | migrations/compaction unwired | PR-M |
| C15 | üç ıraksak normalizer (`normalize`/`answer-check`/`looksFrench`) | PR-L |

## C-series (net-new, loop-audit v2)

| ID | Borç |
|---|---|
| C2 | corrupt-quarantine `__corrupt` blob'ları reset+export'ta ham PII bırakabilir (B9 reopen) |
| C5/C6 | reset/export over-claim (`lm7` sağ kalıyor) — PR-H ile kısmen kapatıldı |
| C7 | `bump_ai_usage` row-bloat DoS |
| C8 | ücretsiz sınırsız anon kimlik |
| C9 | TelemetryStore destroy-on-corrupt |
| C11 | `useSRS` Leitner core untested |
| C13 | 519 LOC edge functions unchecked |
| C14 | Android Auto Backup opt-out yok |

## Doküman/veri borcu

- **`streak` sütunu:** `schema.sql`'den düşürüldü ama **deployed DB hâlâ taşıyabilir**;
  drop migration public beta'ya ertelendi. Bundan "streak UI'a döner" çıkarımı YASAK
  ([[Superseded Decisions]]).
- **Model-routing tablosu (Claude Haiku):** CLAUDE.md'deki tablo implemented provider'larla
  (gemini/groq/mistral) çelişir — D2 doc-sync borcu → [[Contradictions]].
- **Shallow clone:** #146 öncesi git objeleri yok; PR/hash'ler reported-only → [[PR Map]].

## Temiz/güçlü taraf (borç DEĞİL)

> [!implemented] Loop-audit'ler şunları **temiz** buldu: 3 tablonun tümünde RLS doğru,
> hiç `service_role` client-side yok, injection sink yok, fail-closed stage tasarımı,
> yüksek kaliteli v1 içerik verisi, atomik blob store, non-destructive corrupt quarantine.

## Related Notes

[[Known Gaps]] · [[Spec Runtime Divergences]] · [[Storage Architecture]] · [[Sync Architecture]] · [[Module Ownership Map]]
