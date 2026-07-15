---
title: Unknowns
aliases: [Bilinmeyenler, Unresolved Questions, Open Unknowns]
type: open-loop
domain: meta
status: active
canon_status: unknown
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/KNOWN_GAPS.md", "docs/STATUS.md", "docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md"]
related: ["[[Contradictions]]", "[[Needs Verification]]", "[[05 Open Loops]]", "[[Deferred Decisions]]", "[[Missing Source Inputs]]", "[[Known Gaps]]"]
tags: [gap, unknown, open-loop]
---

# Unknowns

<!-- gh-toc -->

## İçindekiler

- [U1 — Hangi roadmap sıradaki PR için authoritative?](#u1-hangi-roadmap-sıradaki-pr-için-authoritative)
- [U2 — Paywall'ın kesin konumu ve fiyatı](#u2-paywallın-kesin-konumu-ve-fiyatı)
- [U3 — Futur proche ownership noktası + free-tier tuning](#u3-futur-proche-ownership-noktası-free-tier-tuning)
- [U4 — L21-L23 içeriği (open decision D2)](#u4-l21-l23-içeriği-open-decision-d2)
- [U5 — Mon Lexique'in public'e ne zaman açılacağı](#u5-mon-lexiquein-publice-ne-zaman-açılacağı)
- [U6 — Canonical itemId migration timing (colon vs hyphen)](#u6-canonical-itemid-migration-timing-colon-vs-hyphen)
- [U7 — Completion strictness / canonical completion unit (D6)](#u7-completion-strictness-canonical-completion-unit-d6)
- [U8 — "9-state mastery" vs counter-derived snapshot uzlaşması](#u8-9-state-mastery-vs-counter-derived-snapshot-uzlaşması)
- [U9 — Repair-kit canon kararı (spine narrowness R-B)](#u9-repair-kit-canon-kararı-spine-narrowness-r-b)
- [U10 — L1 chip listesi (deliberately NOT finalized)](#u10-l1-chip-listesi-deliberately-not-finalized)
- [U11 — oui nihai statüsü (R2)](#u11-oui-nihai-statüsü-r2)
- [U12 — AI activation package (tamamen unbuilt)](#u12-ai-activation-package-tamamen-unbuilt)
- [U13 — Audio/listening layer](#u13-audiolistening-layer)
- [U14 — Cross-border data (Türkiye ⇄ Supabase) + retention period](#u14-cross-border-data-türkiye-supabase-retention-period)
- [U15 — Operator-vault TOP CANON içeriği](#u15-operator-vault-top-canon-içeriği)
- [Nasıl kapatılır](#nasıl-kapatılır)
- [İlgili notlar](#ilgili-notlar)

> [!open-loop] Hiçbir kaynağın **çözmediği** sorular. "Çelişki" değil (o [[Contradictions]]),
> "doğrulanmamış iddia" değil (o [[Needs Verification]]) — bunlar cevabı hiçbir okunabilir
> kaynakta olmayan açık kararlar/belirsizliklerdir. UNKNOWN etiketi = uydurma yok, boşluk var.

## U1 — Hangi roadmap sıradaki PR için authoritative?
`CAIRN_ROADMAP_202607.md` (engine-first) vs `ROADMAP.md` (deployment-first, Beş Taş) hangisi
kazanır belirsiz; ne doc supersede beyanı var ne README ikisini de active listeler. → [[Contradictions]] C5.

## U2 — Paywall'ın kesin konumu ve fiyatı
Campfire mekaniği ~L24 locked; ama **kesin sınır + fiyat + trial** post-validation kararı
(§66.3 / ROADMAP Taş 5 sonrası). Legacy $12.99 taşınmıyor. Karar gate'i açık. → [[Monetization and Scope Boundaries]].

## U3 — Futur proche ownership noktası + free-tier tuning
Band-map'in **#1 açık riski**: L18 preview ne kadar güçlü olmalı, futur proche ne zaman
"owned"a geçer (paid-zone owned). Paywall pozisyonu DEĞİL — o settled; bu tuning açık. → [[Grammar Progression]].

## U4 — L21-L23 içeriği (open decision D2)
`matrix` L21-L23 satırları provisional/unspecified: review / Time-light expansion /
human-context expansion / Campfire on-ramp adayları — hepsi TBD. → [[L18-L24 Roadmap]].

## U5 — Mon Lexique'in public'e ne zaman açılacağı
`learning-engine-v1.md:291` "when to expose it publicly is an OPEN DECISION". Tiered scope
var (dev-apk hidden → MVP notebook → post-beta Word Graph) ama açılış anı belirsiz. → [[Mon Lexique]].

## U6 — Canonical itemId migration timing (colon vs hyphen)
Runtime hyphen (`chunk-je-vais`); going-forward convention colon (`chunk:je-vais`). Migration
"open decision / post-smoke action" (`canonical-item-id-convention-v0.1.md:5,213`). Runtime
separator (colon/dot/hyphen) da açık. → [[Registry Architecture]].

## U7 — Completion strictness / canonical completion unit (D6)
Progress-bridge açık soruları: bir dersin "tamamlandı" tanımı ne (strictness)? Canonical
completion unit ne? Daily Review ne zaman available olur? Progress ne zaman legacy
24-ders/264-section taksonomisini göstermeyi bırakır? → [[Data Flow]], [[Progress]].

## U8 — "9-state mastery" vs counter-derived snapshot uzlaşması
9-state mastery dili conceptual/docs-drift; counter'lar kazanır ama "later docs pass"'te
uzlaştırılacak — ne zaman/nasıl belirsiz. → [[Mastery Model]].

## U9 — Repair-kit canon kararı (spine narrowness R-B)
Survival Kit'te repair pair (`je ne comprends pas` / `vous pouvez répéter?`) shipped değil
ama L13 owned varsayıyor — "live spec-vs-shipped inconsistency". Nereye/nasıl eklenecek
Haktan kararı bekliyor. → [[L1 Survival Kit]], [[Chip Coverage Matrix]].

## U10 — L1 chip listesi (deliberately NOT finalized)
Aktif açık tasarım kararı: ~34-35 hedef obje, 31 aday, 3-4 daha eklenecek. **Nihai liste
UYDURULAMAZ.** → [[L1 Survival Kit]].

## U11 — `oui` nihai statüsü (R2)
`chunk-oui` status=active vs post-L3 passive/trap canon; demotion adayı ama karar açık
(Payload Economy `oui` rehabilitation'ı ANSWER word olarak kısmen çözdü — ama registry
status'u için tam karar açık). → [[Chip Lifecycle]].

## U12 — AI activation package (tamamen unbuilt)
AI dormant; aktivasyon paketi (auth-light identity, server quota, token ceiling, routing
kararı, fallback verification, consent surface) **hiç inşa edilmemiş**; ne zaman/nasıl açılır
belirsiz (KNOWN_GAPS #6/#8/#9). → [[AI Architecture]], [[Deferred Decisions]].

## U13 — Audio/listening layer
Recorded audio pipeline Faz 6'ya ertelendi; TTS placeholder tutuluyor. Shadowing/hardcoded
human audio niyeti var (D-37) ama pipeline tanımsız. → [[Difficulty and Cognitive Load]].

## U14 — Cross-border data (Türkiye ⇄ Supabase) + retention period
Remote schema RLS draft §12 açık soruları: retention period, consent wording, `user_answer`
redaction, `device_info` gerekliliği, cross-border, auth model, Edge Function vs direct insert.
→ [[Privacy and Data Deletion]], [[Supabase]].

## U15 — Operator-vault TOP CANON içeriği
En yetkili pedagoji dokümanı cloud-okunamaz; içeriği bilinmiyor → [[Missing Source Inputs]].
Bu, birçok diğer unknown'ı zincirleme çözebilir (Q1-Q9 / D1-D6 locked decisions).

## Nasıl kapatılır
- Bir unknown çözülünce: resolving kaynağını göster, ilgili nota taşı, buradan çıkar.
- Çoğu unknown [[Deferred Decisions]] veya [[05 Open Loops]] ile örtüşür; çift kayıt tutma —
  burası "cevap yok" listesi, oralar "karar bekliyor" listesi.

## İlgili notlar
- [[Contradictions]] · [[Needs Verification]] · [[Missing Source Inputs]]
- [[05 Open Loops]] · [[Deferred Decisions]] · [[Known Gaps]]
