---
title: Repository Document Index
aliases: [Docs Index, docs/ Index, Repo Doküman Dizini]
type: source-record
domain: meta
status: active
canon_status: canonical
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/README.md"]
related: ["[[Source Ledger]]", "[[Code Source Index]]", "[[Missing Source Inputs]]", "[[08 Source of Truth Map]]"]
tags: [source, meta, index]
---

# Repository Document Index

<!-- gh-toc -->

## İçindekiler

- [Kök canon (docs/)](#kök-canon-docs)
- [docs/canon/](#docscanon)
- [docs/engineering/](#docsengineering)
- [docs/agents/](#docsagents)
- [docs/architecture/](#docsarchitecture)
- [docs/syllabus/ (30 dosya)](#docssyllabus-30-dosya)
- [docs/audits/](#docsaudits)
- [docs/status/ (18 checkpoint)](#docsstatus-18-checkpoint)
- [docs/runbooks/](#docsrunbooks)
- [docs/workstreams/ (30+)](#docsworkstreams-30)
- [docs/obsidian/](#docsobsidian)
- [İlgili notlar](#ilgili-notlar)

> [!canon] `/home/user/lemot/docs/**` altındaki **her committed dokümanın** tek-satır
> açıklaması + güncel/superseded durumu. Cloud oturumları için okunabilir olan tüm
> canon buradadır; operator-vault dosyaları için [[Missing Source Inputs]]'e bak.
> Yetki katmanları için [[Source Ledger]].

Repo HEAD = `02f9f7a` (#196). Statü: **CURRENT** (aktif) · **SUPERSEDED** · **STALE-tuzağı**
(güncel ama bir alt-iddiası eskimiş) · **PROPOSED** (öneri, yetki vermez).

## Kök canon (`docs/`)

| Dosya | Açıklama | Statü |
|---|---|---|
| `CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md` | Uzun vadeli ürün/build niyeti (5236 satır); §48-64 > §31-47; §66 kilitli kararlar | CURRENT (intent, build-authority değil) |
| `CAIRN_PRODUCT_ANSWERS_2026_07.md` | Founder Q&A (2026-07-04); learner profili, Weave true-form, Campfire L24 | CURRENT (content-binding) |
| `CAIRN_ROADMAP_202607.md` | Motor-öncelikli execution sırası (Faz 0-7), Turkish | CURRENT |
| `ROADMAP.md` | "Beş Taş" deployment roadmap (2026-07-05) + YASA 1-3 sistem anayasası | CURRENT |
| `KNOWN_GAPS.md` | 14 açık boşluk envanteri + "sağlıklı, dokunma" listesi | CURRENT |
| `STATUS.md` | Şu anki execution reality; Round 1 kapanışı | CURRENT (snapshot bazı yerlerde stale) |
| `DEV_APK_MVP_CANON.md` | Dev APK scope (IN/OUT), yasak dil, AI sınırı | CURRENT |
| `DEV_APK_SMOKE_TEST_CHECKLIST.md` | Round 1 operator smoke prosedürü (§1-§12) | CURRENT |
| `EAS_PREVIEW_BUILD.md` | In-lesson AI için EAS kurulumu (enabled gelecek) | STALE (PR-C öncesi; ai-diag artık yok) |
| `MASTER_PIPELINE_v1.2.1.md` | Süreç/pipeline kanonu; cloud addendum; Sync Queue | CURRENT |
| `README.md` | Docs haritası + precedence indeksi | CURRENT |
| `CONTENT_FACTORY_CONTRACT.md` | Kalan Cairn dersleri üretim kontratı (Faz 6A); pilot L7-L9 | CURRENT |
| `PAYLOAD_ECONOMY_v0.md` | Item ekonomisi + survival-formula sınıfı (locked 2026-07-04) | CURRENT |
| `EXERCISE_CANON_v0.4.md` | Egzersiz kanonu; §16 anti-pattern validator kuralları | CURRENT |
| `learning-engine-v1.md` | Pedagojik öğrenme-objesi spec'i; 7-aşama spiral (spec, kod değil) | CURRENT (spec-only) |
| `CLOUD_SYNC_QUEUE.md` | Operator'a devredilen durable kararlar kuyruğu | CURRENT (PENDING satırları var) |
| `CAIRN_PRODUCT_DEFINITION_v0.1.md` | Eski ürün tanımı | SUPERSEDED (v1.0 spec, 2026-07-02) |
| `CAIRN_PRODUCT_SYSTEM_MAP_v0.1.md` | Eski sistem-index'i | SUPERSEDED (v1.0 spec, 2026-07-02) |

## `docs/canon/`
| Dosya | Açıklama | Statü |
|---|---|---|
| `LESSON_FLOW_CANON_v1.md` | Ders akışı kapalı tasarım kanonu (3 katman, 11-14 ekran, 7 tip, V1-V9 validator) | CURRENT (kod yetkilendirmez) |

## `docs/engineering/`
| Dosya | Açıklama | Statü |
|---|---|---|
| `karpathy.md` | Engine-purity kontratı (pure/deterministic/explicit now/fail-closed) + YASA'lar | CURRENT |

## `docs/agents/`
| Dosya | Açıklama | Statü |
|---|---|---|
| `LE_MOT_AGENT_CONSTITUTION.md` | Away-agent rolleri (Hermes/Claude/Codex/Operator/ChatGPT) + sınırlar | CURRENT (v0) |
| `AWAY_AGENT_RUN_TEMPLATE.md` | Away rapor formatı | CURRENT |
| `AWAY_TASK_QUEUE.md` | Seed'lenmiş away kuyruğu (TASK-001..004) | CURRENT |

## `docs/architecture/`
| Dosya | Açıklama | Statü |
|---|---|---|
| `l0-l24-founder-build-matrix-v0.md` | L0-L24 build matrisi; 8 açık karar D1-D8 (docs-only) | CURRENT (PLANNED) |

## `docs/syllabus/` (30 dosya)
| Dosya | Açıklama | Statü |
|---|---|---|
| `lesson-spec-template-v1.1.md` | 17-bölüm zorunlu ders-spec şablonu; 10 canon bölüm | CURRENT (canon) |
| `lesson-archetype-templates-v1.md` | 11 arketip; 70/20/10 model; split-sense pattern | CURRENT (canon) |
| `chip-taxonomy-and-lexique-lifecycle-v0.3.md` | 13-tip chip taksonomisi + Mon Lexique lifecycle (revisable) | CURRENT (PLANNED, revisable) |
| `canonical-item-id-convention-v0.1.md` | `prefix:slug` colon ID convention (going-forward) | CURRENT (PLANNED; runtime hyphen kullanır) |
| `ai-generation-contract-v1.md` | "AI öğretmen değil"; prerequisite-safety > correctness | CURRENT (PLANNED, AI implement etmez) |
| `L01-survival-kit.lesson-spec.md` | L1 full spec (pilot) | CURRENT (planning) |
| `L02-etre-identity.lesson-spec.md` | L2 full spec (architecture-verb) | CURRENT (planning) |
| `L03-negation-you-questions.lesson-spec.md` | L3 full spec (ne…pas / tu-vous) | CURRENT (planning) |
| `L04-avoir-human-states.lesson-spec.md` | L4 full spec (avoir-state) | CURRENT (planning) |
| `L05-objects-articles.lesson-spec.md` | L5 full spec (un/une) | CURRENT (planning) |
| `L06-foundation-integration-human-context.lesson-spec.md` | L6 full spec (integration, 0 yeni gramer) | CURRENT (planning) |
| `L07-aller-movement-next-step.lesson-spec.md` | L7 full aller spec | SUPERSEDED-as-next-PR (compact kazanır) |
| `L07-compact-doorway.compact-spec.md` | L7 compact frozen-chunk doorway (2 item) | CURRENT (PLANNED, BLOCKED) |
| `L08-ou-location-movement-questions.lesson-spec.md` | L8 full spec (où) | CURRENT (planning) |
| `L09-faire-small-actions-pause.lesson-spec.md` | L9 full spec (split-sense faire) | CURRENT (planning) |
| `L10-after-class-integration.lesson-spec.md` | L10 full integration spec | CURRENT (planning) |
| `L11-pouvoir-help-permission.lesson-spec.md` | L11 full spec (split-sense pouvoir) | CURRENT (planning) |
| `L12-est-ce-que-question-wrapper.compact-spec.md` | L12 compact wrapper spec | CURRENT (planning) |
| `L12-question-expansion-gate-review.md` | L12 gate review | CURRENT (planning) |
| `L13-can-do-asking-integration.compact-spec.md` | L13 compact integration | CURRENT (planning) |
| `L14-y-light-place-pronoun.compact-spec.md` | L14 compact (place-y) | CURRENT (planning) |
| `L14-y-light-gate-review.md` | L14 gate review | CURRENT (planning) |
| `L15-devoir-falloir-light-obligation.compact-spec.md` | L15 compact (il faut / je dois) | CURRENT (planning) |
| `L15-devoir-falloir-light-gate-review.md` | L15 gate review | CURRENT (planning) |
| `L16-integration-small-moment-seed.compact-spec.md` | L16 compact (integration + A Small Moment seed) | CURRENT (planning; runtime dosyası yok) |
| `L16-integration-small-moment-gate-review.md` | L16 gate review (5 locked gates) | CURRENT (planning) |
| `L17-human-context-feelings-light.compact-spec.md` | L17 compact (feelings-light) | CURRENT (planning; runtime dosyası yok) |
| `L17-human-context-feelings-gate-review.md` | L17 gate review | CURRENT (planning) |
| `L10-L20-band-map-v0.md` | L10-L20 arc (Option C); Campfire ~L24; paywall settled | CURRENT (PLANNED arc) |
| `L01-L05-foundation-spine-retrospective.md` | L1-L5 retrospektif; L2-L3 zorluk spike | CURRENT (analiz) |

## `docs/audits/`
| Dosya | Açıklama | Statü |
|---|---|---|
| `L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md` | 52 item / 41 used / 11 dormant; R1-R12 risk; spine narrowness | CURRENT (audit) |
| `l1_l15_chip_inventory/` (5 CSV) | actual/candidate/registry/not_chip/risk envanterleri | CURRENT (veri) |
| `2026-07-08-final-loop-audit.md` | B1-B24 bulgular; PR-A…PR-G plan; sadece PR-A uygulandı | CURRENT (audit) |
| `2026-07-09-loop-audit-v2.md` | C1-C30 net-new; 15/24 B fixed; scorecard B+ | CURRENT (audit) |

## `docs/status/` (18 checkpoint)
| Dosya | Açıklama | Statü |
|---|---|---|
| `founder-self-learning-build-architecture-review.md` | 14 makro karar; events=source of truth | CURRENT (D-11) |
| `founder-self-learning-p0-p2-spine-audit-checkpoint.md` | Graph/events/grade/mastery spine | CURRENT (checkpoint) |
| `founder-self-learning-p3-learner-renderer-checkpoint.md` | Learner renderer (recognition/fill/build/boundary) | CURRENT (checkpoint) |
| `founder-self-learning-p4-mon-lexique-practice-pool-checkpoint.md` | Mon Lexique + Practice Pool selektörleri | CURRENT (checkpoint) |
| `founder-self-learning-p5-local-privacy-data-rights-checkpoint.md` | P5.1-P5.4C local privacy | CURRENT (checkpoint) |
| `founder-self-learning-privacy-kvkk-gdpr-architecture-note.md` | KVKK/GDPR mimari notu (design-only) | CURRENT (design) |
| `founder-self-learning-remote-schema-rls-draft.md` | `le_*`/`learning_*` remote şema taslağı (PROPOSED) | CURRENT (PROPOSED) |
| `founder-self-learning-mastery-precision-policy.md` | Near-miss ≠ failure; 4-bucket sınıflandırıcı | CURRENT (D-23) |
| `boundary-recognition-ui-decision.md` | "Later form" soft kart kararı | CURRENT (D-22) |
| `learning-engine-progress-bridge-decision.md` | `lm_le_events` canonical; sahte `lm7` yok | CURRENT (D-10) |
| `learning-engine-v0.1-baseline.md` | Contract engine baseline (#18-#22) | CURRENT (baseline) |
| `learning-engine-interactive-baseline.md` | İnteraktif fixture baseline (L1/L14/L15/L18) | STALE-tuzağı (L11/L12/L16 sonradan) |
| `learning-engine-l11-l12-l16-chain-smoke-baseline.md` | Chain smoke (L16 zero-new-item) | CURRENT (baseline) |
| `dev-apk-v1-freeze-checkpoint.md` | v1 dondurma kontratı (D-08) | CURRENT (checkpoint) |
| `dev-apk-sandbox-route-contract.md` | Route kontratı (v1/`/learn` gating) (D-09) | CURRENT (checkpoint) |
| `dev-apk-bug-closure-checkpoint.md` | Bug kapatma kontrol noktası | CURRENT (checkpoint) |
| `repo-audit-disposition-2026-06-09.md` | Repo denetimi + legacy quarantine dispozisyonu | CURRENT (checkpoint) |
| `release-guardrail-audit-plan.md` | Release guardrail #100-#116 planı | CURRENT (checkpoint) |
| `v1-to-learning-engine-migration-notes.md` | v1→engine geçiş notları | CURRENT (planning) |

## `docs/runbooks/`
| Dosya | Açıklama | Statü |
|---|---|---|
| `DEVICE_DAY.md` | Operator device-day + K2 landing sırası (#174→#180→seen) | CURRENT (dated 2026-07-05) |
| `ai-edge-hardening-pr-c.md` | AI edge sertleştirme (B4/B15/B16); deploy operator-only | CURRENT (deploy pending) |

## `docs/workstreams/` (30+)
| Grup | Açıklama | Statü |
|---|---|---|
| `README.md` | Workstream indeksi | CURRENT |
| `round1-*` (6 dosya) | Round 1 founder learning slice, L3-L6 content plan, test plan, factory, post-smoke framework | CURRENT |
| `Sprint12_*` (9 dosya) | Passive-mirror cleanup, storage/schema/merge, chat gating, L001 path, nav entry | CURRENT (Sprint 12) |
| `Sprint13_*` (3 dosya) | Founder self-learning P0-P2/P3/P4 workstream'leri | CURRENT (Sprint 13) |

## `docs/obsidian/`
| Dosya | Açıklama | Statü |
|---|---|---|
| `obsidian-note-tree-redesign-plan-v0.md` | Bu vault'un ön-sanatı: 5-klasör lean tree, 6-fazlı migration | PROPOSED (dosya taşımaz) |
| `lemot-obsidian-customization-v0.md` | Vault görsel dili: 10 callout, semantic token, dashboard | PROPOSED |
| `Home - Le Mot.dashboard-draft.md` | Önerilen landing note (pointer-only) | PROPOSED |

## İlgili notlar
- [[Source Ledger]] — yetki katmanları + çatışma notları
- [[Code Source Index]] — kod tarafı
- [[Missing Source Inputs]] — operator-vault'ta olup burada olmayanlar
- [[Superseded Decisions]] · [[Known Gaps]]
