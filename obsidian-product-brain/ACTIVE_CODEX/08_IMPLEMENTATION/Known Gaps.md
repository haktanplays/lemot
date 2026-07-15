---
title: Known Gaps
aliases: [Implementation Known Gaps, Kod Boşlukları]
type: architecture
domain: architecture
status: active
canon_status: canonical
implementation_status: partial
verification_status: reported-only
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/KNOWN_GAPS.md", "docs/audits/2026-07-09-loop-audit-v2.md", "docs/STATUS.md"]
code_refs: []
test_refs: []
related:
  - "[[00 Le Mot Holy Codex]]"
  - "[[Implementation Overview]]"
  - "[[Technical Debt]]"
  - "[[05 Open Loops]]"
  - "[[Spec Runtime Divergences]]"
tags: [implementation, gaps, open-loop]
---

# Known Gaps

Up: [[Implementation Overview]] · Borç: [[Technical Debt]] · Açık döngü: [[05 Open Loops]]

> [!open-loop] Bu not **kodlanmamış / bloke / eksik** işleri listeler. "Borç" (var ama
> kötü) ile "boşluk" (henüz yok) ayrımı için: kötü-ama-var → [[Technical Debt]]; yok →
> burada. Kaynak: `docs/KNOWN_GAPS.md` + loop-audit v2.

## Operator-only blocker'lar (cloud kapatamaz — Rule 11)

> [!warning] Release, bunlar açıkken "done" DEĞİL; en fazla "code-side ready".

| Gap | Not |
|---|---|
| Fiziksel cihaz founder/tester smoke | rebuilt Lesson Zero `91f1b04`; full from-scratch onboarding → [[Smoke Test Playbook]] |
| EAS preview build + `EXPO_PUBLIC_SUPABASE_*` env stratejisi | DP1/DD2: eas.json vs expo.dev → [[Release and Build Process]] |
| G3 Supabase email-confirmation re-enable | P0, env-taşıyan tester build'inden önce |
| Edge Function deploy + secrets verify; schema migration apply | schema-file ≠ deployed DB |
| Stale merged `claude/*` branch temizliği | cloud git proxy 403 on delete-push |
| CLOUD_SYNC_QUEUE PENDING satırları | Obsidian/mempalace sync (Payload Economy, Product Q&A, PR'lar) |

## Cloud-writable ama çözülmemiş (audit + KNOWN_GAPS)

| Gap | Kaynak / PR |
|---|---|
| Cloud data rights: DELETE RLS + client delete path | C1 / PR-I (operator DB gerekli) |
| Edge regression guard'ları (`aiEnabled` açılmadan önce) | C3/C7/C10/C13 / PR-J |
| Sync correctness + testler: merge helpers, `hasPulled` by user-id, versioning | C4/B5 / PR-K |
| B24 practice-reuse mastery inflation; `srsCore` extract; normalizer birleştir | B24/C11/C15 / PR-L |
| Telemetry quarantine + migrations/compaction wire | C9/C12/B10 / PR-M |
| Android backup opt-out, CI hardening, versionCode | C14/C16/C27 / PR-N |
| Dead code (ai-error/analyzeErrors), B13 legacy deep-link guard, B20 `lemot://` | PR-O |
| v1 pedagogy lint (piecesUsed ≠ sentence) implement edilmedi | KNOWN_GAPS #5 |

## Ürün / karar açık

| Gap | Kaynak |
|---|---|
| Paywall pozisyonu (Cairn için, Taş 5 sonrası) | [[Decision Index|D-30]] |
| AI activation package tamamen kodlanmadı | KNOWN_GAPS #6/#8/#9, [[Decision Index|D-33]] |
| Audio/listening layer (kayıtlı pipeline Faz 6'ya ertelendi) | KNOWN_GAPS #1 |
| Lexique Memory selector wiring + Mon Lexique 6-band UI + tuning | KNOWN_GAPS #2 |
| Content factory pilot (L7–L9) loop'u kanıtlama; Home L6-cap unlock PR | KNOWN_GAPS #3 |
| Deferred canon implementation | instruction-weave (Faz D), Readiness Gate (Faz C), hint ladder (Faz B), meet/insight/recap interactions (Faz B) |
| Progress-bridge açık soruları | completion-strictness tanımı; canonical completion birimi; Daily Review ne zaman açılır; Progress ne zaman legacy taksonomiyi bırakır |
| Deferred validator'lar V1/V2/V6/V7/V8/V9 | schema alanları / final layout gerektiriyor → [[Test Strategy]] |

## Frozen v1'de bilinen non-blocker'lar

> [!warning] Bunlar surface B'de **gerçek ama düzeltilmeyecek** — learning-engine
> adoption'ına ait, v1'de dokunulmuyor ([[Decision Index|D-08]]):

- **F5:** Home tamamlama sonrası hâlâ "Begin the first lesson" der.
- Daily Review **0/5** gösterir (dev-apk'te `dailyReview` kapalı).
- Progress legacy 24-lesson / 264-section taksonomisini gösterir.

## Related Notes

[[Technical Debt]] · [[Spec Runtime Divergences]] · [[05 Open Loops]] · [[Contradictions]] · [[Needs Verification]]
