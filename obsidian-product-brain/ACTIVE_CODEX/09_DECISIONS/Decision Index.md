---
title: Decision Index
aliases: [ADR Index, Decisions MOC, Karar Dizini]
type: index
domain: meta
status: active
canon_status: canonical
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-18
last_reviewed: 2026-07-18
source_of_truth: ["docs/STATUS.md", "docs/ROADMAP.md", "docs/canon/LESSON_FLOW_CANON_v1.md", "docs/engineering/karpathy.md", "CLAUDE.md"]
related: ["[[Active Decisions]]", "[[Deferred Decisions]]", "[[Rejected Decisions]]", "[[Superseded Decisions]]", "[[Decision Templates]]", "[[00 Le Mot Holy Codex]]"]
tags: [index, moc, decision, adr]
---

# 🗂️ Decision Index

> [!canon] Bu, **Le Mot / Cairn** kalıcı karar hafızasının (ADR) ana dizinidir. Her ADR üç bağımsız statü taşır: **kabul** (canon_status), **implementation** (implementation_status), **verification** (verification_status). Buradaki "Status" kolonu kararın **yaşam-döngü durumudur** (ACTIVE / DEFERRED / REJECTED / SUPERSEDED). Kaynak: `06_decisions_history.md` (D-01…D-40) ve repo canon dokümanları.

## Nasıl okunur
- **ACTIVE** = şu an bağlayıcı canon.
- **DEFERRED** = karar/yön kabul, uygulama veya nihai konum ertelendi → [[Deferred Decisions]], [[05 Open Loops]].
- **REJECTED** = değerlendirilip reddedilen yaklaşımlar → [[Rejected Decisions]].
- **SUPERSEDED** = eski karar; yerini yenisi aldı, silinmedi → [[Superseded Decisions]].

## Master ADR tablosu

| ADR | Başlık | Status | Domain | Kaynak (D-#) | Link |
|---|---|---|---|---|---|
| ADR-0001 | No XP / streak / reward language | ACTIVE | product | D-01 | [[ADR-0001 no-xp-streak-reward-language]] |
| ADR-0002 | Calm passive-mirror mentor tone | ACTIVE | product | D-02 | [[ADR-0002 calm-passive-mirror-mentor-tone]] |
| ADR-0003 | Weave is the primary production mechanic | ACTIVE | learning | D-03 | [[ADR-0003 weave-primary-production-mechanic]] |
| ADR-0004 | No full-sentence chips; formula/noun packages OK | ACTIVE | learning | D-04 | [[ADR-0004 no-full-sentence-chips]] |
| ADR-0005 | Whole-first, unpack-later (meet-card) | ACTIVE | learning | D-05 | [[ADR-0005 whole-first-unpack-later]] |
| ADR-0006 | L0 first-use bridge; spine begins at L1 | ACTIVE | syllabus | D-06 | [[ADR-0006 l0-first-use-bridge-spine-at-l1]] |
| ADR-0007 | v1 temporary Dev APK skin; engine is foundation | ACTIVE | architecture | D-08 | [[ADR-0007 v1-temporary-dev-apk-skin-engine-foundation]] |
| ADR-0008 | Route contract: Dev APK v1; `/learn/*` sandbox-only | ACTIVE | architecture | D-09 | [[ADR-0008 dev-apk-route-contract]] |
| ADR-0009 | Events are the source of truth | ACTIVE | architecture | D-11 | [[ADR-0009 events-source-of-truth]] |
| ADR-0010 | Engine purity contract (karpathy) | ACTIVE | architecture | D-12 | [[ADR-0010 karpathy-engine-purity-contract]] |
| ADR-0011 | YASA 1 — schema change ⇒ migration same PR | ACTIVE | architecture | D-13 | [[ADR-0011 yasa1-schema-migration-same-pr]] |
| ADR-0012 | YASA 2 — shipped itemId immutability | ACTIVE | architecture | D-14 | [[ADR-0012 yasa2-itemid-immutability]] |
| ADR-0013 | YASA 3 — shipped error-tag immutability | ACTIVE | architecture | D-15 | [[ADR-0013 yasa3-error-tag-immutability]] |
| ADR-0014 | K1 — schemaVersion absent reads as v1 | ACTIVE | architecture | D-16 | [[ADR-0014 k1-absent-reads-as-v1]] |
| ADR-0015 | K2 — device-day batch landing order | ACTIVE | architecture | D-17 | [[ADR-0015 k2-device-day-order]] |
| ADR-0016 | Boundary / recognition 'later form' soft-card UI | ACTIVE | design | D-22 | [[ADR-0016 boundary-recognition-later-form-ui]] |
| ADR-0017 | Product-stage fails closed to dev-apk | ACTIVE | architecture | D-20 | [[ADR-0017 product-stage-fail-closed-dev-apk]] |
| ADR-0018 | K3 — manifest rule is permanent | ACTIVE | architecture | D-18 | [[ADR-0018 k3-manifest-rule]] |
| ADR-0019 | K5 — squash-merge convention stays | ACTIVE | ops | D-19 | [[ADR-0019 k5-squash-merge]] |
| ADR-0020 | Progress bridge — events canonical; no fake lm7 | ACTIVE | architecture | D-10 | [[ADR-0020 progress-bridge-events-canonical]] |
| ADR-0021 | Mastery precision policy — near-miss ≠ failure | ACTIVE | learning | D-23 | [[ADR-0021 mastery-precision-near-miss-not-failure]] |
| ADR-0022 | Hub exercises are derived (deriveDrill) | ACTIVE | learning | D-25 | [[ADR-0022 hub-derived-drills]] |
| ADR-0023 | Privacy local-first; consent-gated remote | ACTIVE | architecture | D-21 | [[ADR-0023 privacy-local-first-consent-gated-remote]] |
| ADR-0024 | Cairn spec v1.0 imported; precedence chain | ACTIVE | product | D-34 | [[ADR-0024 cairn-v1-precedence-chain]] |
| ADR-0025 | Paywall @ Campfire ~L24; legacy L14 superseded | DEFERRED | product | D-30 | [[ADR-0025 paywall-campfire-l24]] |

## Statüye göre bölünmüş görünümler
- ✅ [[Active Decisions]] — 24 ADR
- ⏸️ [[Deferred Decisions]] — ADR-0025 + ertelenmiş alt-bileşenler
- ⛔ [[Rejected Decisions]] — ADR'ler içindeki reddedilen alternatifler
- 🕰️ [[Superseded Decisions]] — yerini yeni ADR'lere bırakan eski kararlar
- 🧩 [[Decision Templates]] — yeni ADR nasıl eklenir

## Kapsanan ama henüz ADR'lenmemiş kararlar
`06_decisions_history.md`'de kayıtlı ama bu turda ayrı ADR açılmayan kararlar (ileride açılabilir): D-07 (Round 1 spine L1–L6), D-24 (Mon Lexique/Practice Pool selector-derived), D-26 (Instruction Weave thermostat, DEFERRED), D-27 (Readiness Gate, DEFERRED), D-28 (unified hint ladder, DEFERRED), D-29 (11–14 screen budget), D-31 (retrofit wave), D-32 (type-set freeze ~10), D-33 (deterministic engine first, AI dormant), D-35 (Lexique Memory numeric contract), D-36 (Payload Economy v0), D-37 (learner profile & free-tier), D-38 (golden rule of screenless work), D-39 (Round 1 runtime frozen), D-40 (additive remote schema PROPOSAL). Bkz. [[Deferred Decisions]] ve [[05 Open Loops]].

## ADR Promotion Rule (2026-07-18)

> [!canon] **PRIMARY POLICY HOME** for **hangi kararın ADR olacağı**. Her HARD INVARIANT için ADR açılmaz. Sınıf: **[LOCKED DEFAULT]**.

### Bir policy-hardening kararı ADR'ye hak kazanır — eğer:

- cross-system, · uzun-ömürlü, · geri döndürmesi maliyetli, · anlamlı bir alternatif seçime dayalı, · mimari- veya veri-kimliği-şekillendiren, · yalnız tek bir domain notundan okununca yanlış anlaşılması muhtemel.

### Otomatik yeni ADR gerektirmeyen örnekler

tekrarlanan numeric cap · kopya ifadesi · mevcut sentence-chip yasağı · küçük dokümantasyon hijyen kuralları.

### Bu pass'in ADR değerlendirmesi

ADR numaralandırması incelendi: **ADR-0001…ADR-0025 mevcut, sıradaki numara ADR-0026.** Konvansiyon: her ADR bir `decisions-history D-#` kaynağına bağlı (Master ADR tablosu "Kaynak (D-#)" kolonu).

**Nitelikli ADR adayları (bu pass'te OLUŞTURULMADI — deliberate ADR authoring adımına ertelendi):**

| Aday | Neden nitelikli | Not |
|---|---|---|
| Registry-backed tracked learning identity | cross-system + veri-kimliği-şekillendiren + geri-dönüşü maliyetli | [[Registry Architecture]]; YASA 2 (ADR-0012) ile bitişik ama daha geniş |
| Cross-stage French QA visibility architecture | cross-stage + uzun-ömürlü + release-gating | [[French Linguistic QA]] |
| Carryover horizon hybrid model | cross-system pedagoji + horizon | [[Chip Lifecycle]] (2026-07-18 pass) |
| Mon Lexique projection architecture | cross-system + veri-kimliği | [[Mon Lexique]] (2026-07-18 pass) |

> [!warning] **Neden oluşturulmadı:** ADR konvansiyonu her ADR'yi bir `decisions-history D-#` kaydına bağlar; bu policy-pass kararlarının henüz D-# karşılığı yok. Dosya sayısı için ADR **üretilmez**. Bu adaylar deliberate bir ADR authoring adımında (D-# atama + Decision Templates ile) açılabilir. Bu pass raporunda aday olarak listelendi.

## Related
[[00 Le Mot Holy Codex]] · [[06 Canon and Status Legend]] · [[Product Risks]] · [[Known Gaps]] · [[Registry Architecture]] · [[French Linguistic QA]]

<!-- gh-nav -->

## 🧭 GitHub Navigation

[⬆ README](../../README.md) · [🪨 Holy Codex](../00_START_HERE/00%20Le%20Mot%20Holy%20Codex.md) · [Current State](../00_START_HERE/03%20Current%20State.md) · [Open Loops](../00_START_HERE/05%20Open%20Loops.md)

**Bu klasördeki notlar (09_DECISIONS):**

- [ADR-0001 — No XP / streak / reward language](./ADR-0001%20no-xp-streak-reward-language.md)
- [ADR-0002 — Calm, passive-mirror mentor tone](./ADR-0002%20calm-passive-mirror-mentor-tone.md)
- [ADR-0003 — Weave is the primary production mechanic](./ADR-0003%20weave-primary-production-mechanic.md)
- [ADR-0004 — No full-sentence chips; formula chunks & noun packages allowed](./ADR-0004%20no-full-sentence-chips.md)
- [ADR-0005 — Whole-first, unpack-later (meet-card model)](./ADR-0005%20whole-first-unpack-later.md)
- [ADR-0006 — L0 is a first-use bridge; the spine begins at L1](./ADR-0006%20l0-first-use-bridge-spine-at-l1.md)
- [ADR-0007 — v1 is a temporary Dev APK smoke skin; learning-engine is the foundation](./ADR-0007%20v1-temporary-dev-apk-skin-engine-foundation.md)
- [ADR-0008 — Dev APK first lesson stays v1; learning-engine /learn/ sandbox-only](./ADR-0008%20dev-apk-route-contract.md)
- [ADR-0009 — Events are the source of truth; everything else is a projection](./ADR-0009%20events-source-of-truth.md)
- [ADR-0010 — Engine purity contract (karpathy house rules)](./ADR-0010%20karpathy-engine-purity-contract.md)
- [ADR-0011 — YASA 1: schema change ⇒ migration in the same PR](./ADR-0011%20yasa1-schema-migration-same-pr.md)
- [ADR-0012 — YASA 2: shipped itemId immutability](./ADR-0012%20yasa2-itemid-immutability.md)
- [ADR-0013 — YASA 3: shipped error-tag immutability (K3's twin)](./ADR-0013%20yasa3-error-tag-immutability.md)
- [ADR-0014 — K1: schemaVersion "absent reads as v1"](./ADR-0014%20k1-absent-reads-as-v1.md)
- [ADR-0015 — K2: device-day batch landing order](./ADR-0015%20k2-device-day-order.md)
- [ADR-0016 — Boundary / recognition-only UI presentation ("later form" soft card)](./ADR-0016%20boundary-recognition-later-form-ui.md)
- [ADR-0017 — Product-stage model fails closed to dev-apk](./ADR-0017%20product-stage-fail-closed-dev-apk.md)
- [ADR-0018 — K3: manifest rule is permanent](./ADR-0018%20k3-manifest-rule.md)
- [ADR-0019 — K5: squash-merge convention stays](./ADR-0019%20k5-squash-merge.md)
- [ADR-0020 — Progress bridge: lm_le_events is canonical; no fake lm7 markers](./ADR-0020%20progress-bridge-events-canonical.md)
- [ADR-0021 — Mastery precision policy (near-miss ≠ failure)](./ADR-0021%20mastery-precision-near-miss-not-failure.md)
- [ADR-0022 — Deterministic drill derivation + hub = derived](./ADR-0022%20hub-derived-drills.md)
- [ADR-0023 — Privacy / local-first data rights (P5); remote consent-gated](./ADR-0023%20privacy-local-first-consent-gated-remote.md)
- [ADR-0024 — Cairn spec v1.0 imported; precedence chain](./ADR-0024%20cairn-v1-precedence-chain.md)
- [ADR-0025 — Paywall position: legacy L14 does NOT auto-carry to Cairn](./ADR-0025%20paywall-campfire-l24.md)
- [✅ Active Decisions](./Active%20Decisions.md)
- [🗂️ Decision Index](./Decision%20Index.md) ⟵ *bu not*
- [🧩 Decision Templates](./Decision%20Templates.md)
- [⏸️ Deferred Decisions](./Deferred%20Decisions.md)
- [⛔ Rejected Decisions](./Rejected%20Decisions.md)
- [🕰️ Superseded Decisions](./Superseded%20Decisions.md)
